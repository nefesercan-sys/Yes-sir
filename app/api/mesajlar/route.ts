export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { isEmail, rateLimited } from "@/lib/api-guard";
import { idGecerli } from "@/lib/validate";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json([], { status: 401 });

    const email = session.user.email;
    const { searchParams } = new URL(req.url);
    const withUser = (searchParams.get("with") || "").slice(0, 254) || null;
    const ilanId = (searchParams.get("ilanId") || "").slice(0, 40) || null;
    const yeniSohbet = searchParams.get("yeniSohbet");
    if (yeniSohbet && !idGecerli(yeniSohbet)) return NextResponse.json({ error: "Geçersiz ilan" }, { status: 400 });

    const db = await getDb();

    // 1. İki kişi arasındaki mevcut mesajları çek
    if (withUser) {
      const query: any = {
        $or: [
          { gonderen: email, alici: withUser },
          { gonderen: withUser, alici: email }
        ]
      };
      if (ilanId) query.ilanId = ilanId;

      const mesajlar = await db.collection("mesajlar").find(query).sort({ createdAt: 1 }).toArray();

      // Karşı tarafın gönderdiği mesajları "okundu" yap
      await db.collection("mesajlar").updateMany(
        { gonderen: withUser, alici: email, okundu: false },
        { $set: { okundu: true } }
      );

      return NextResponse.json(mesajlar);
    }

    // 2. Sol menüdeki genel konuşma listesini (Özet) çek
    const tumMesajlar = await db.collection("mesajlar")
      .find({ $or: [{ gonderen: email }, { alici: email }] })
      .sort({ createdAt: -1 })
      .toArray();

    const map = new Map();
    for (const m of tumMesajlar) {
      const karsiTaraf = m.gonderen === email ? m.alici : m.gonderen;
      const key = `${karsiTaraf}_${m.ilanId}`;
      if (!map.has(key)) {
        map.set(key, {
          _id: key,
          karsiTaraf,
          ilanId: m.ilanId,
          ilanBaslik: m.ilanBaslik || "İlan",
          sonMesaj: m.mesaj,
          okunmamis: m.alici === email && !m.okundu ? 1 : 0,
          createdAt: m.createdAt
        });
      } else {
        if (m.alici === email && !m.okundu) map.get(key).okunmamis++;
      }
    }

    // 🚨 SİHİRLİ DOKUNUŞ: Eğer ilandan "Yeni Sohbet Başlat" diyerek gelinmişse, odayı hazırla!
    if (yeniSohbet) {
        const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(yeniSohbet) });
        if (ilan) {
            // Eğer ilan yapay zeka ilanıysa (sahibi yoksa), mesajları doğrudan Admine yönlendir!
            const aliciEmail = ilan.sahibi?.email || "nefesercan@gmail.com"; 
            const key = `${aliciEmail}_${yeniSohbet}`;
            
            if (!map.has(key)) {
                map.set(key, {
                    _id: key,
                    karsiTaraf: aliciEmail,
                    ilanId: yeniSohbet,
                    ilanBaslik: ilan.baslik,
                    sonMesaj: "Sohbeti başlatmak için yazın...",
                    okunmamis: 0,
                    createdAt: new Date()
                });
            }
        }
    }

    const liste = Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(liste);

  } catch (err) {
    console.error("Mesaj GET Hatası:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Giriş yapın" }, { status: 401 });

    if (rateLimited(req, "mesajlar-post", 30, 10 * 60 * 1000)) {
      return NextResponse.json({ error: "Çok fazla mesaj gönderdiniz. Lütfen biraz bekleyin." }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    const alici = typeof body?.alici === "string" ? body.alici.trim() : "";
    // Mesaj metni: yalnızca string; satır sonları korunur, diğer kontrol karakterleri atılır, en çok 2000 karakter
    const mesaj = typeof body?.mesaj === "string"
      ? body.mesaj.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim()
      : "";
    const ilanId = body?.ilanId;

    if (!alici || !mesaj) return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
    if (!isEmail(alici)) return NextResponse.json({ error: "Alıcı geçersiz" }, { status: 400 });
    if (mesaj.length > 2000) return NextResponse.json({ error: "Mesaj en fazla 2000 karakter olabilir" }, { status: 400 });
    if (ilanId !== undefined && ilanId !== null && ilanId !== "destek" && !idGecerli(ilanId)) {
      return NextResponse.json({ error: "Geçersiz ilan" }, { status: 400 });
    }

    const db = await getDb();

    let ilanBaslik = "İlan";
    if (ilanId && ilanId !== "destek") {
        const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(ilanId) });
        if (ilan) ilanBaslik = ilan.baslik;
    } else if (ilanId === "destek") {
        ilanBaslik = "💬 CANLI DESTEK";
    }

    const yeniMesaj = {
      gonderen: session.user.email,
      alici,
      mesaj,
      ilanId,
      ilanBaslik,
      okundu: false,
      createdAt: new Date()
    };

    await db.collection("mesajlar").insertOne(yeniMesaj);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mesaj POST Hatası:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
