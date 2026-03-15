export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json([], { status: 401 });

    const email = session.user.email;
    const { searchParams } = new URL(req.url);
    const withUser = searchParams.get("with");
    const ilanId = searchParams.get("ilanId");
    const yeniSohbet = searchParams.get("yeniSohbet");

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

      const mesajlar = await db.collection("sohbetler").find(query).sort({ createdAt: 1 }).toArray();

      // Mesajı okundu işaretle
      await db.collection("sohbetler").updateMany(
        { gonderen: withUser, alici: email, okundu: false },
        { $set: { okundu: true } }
      );

      return NextResponse.json(mesajlar);
    }

    // 2. Sol menüdeki genel konuşma listesini (Özet) çek
    const tumMesajlar = await db.collection("sohbetler")
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

    // 🚨 SİHİRLİ DOKUNUŞ: Eğer ilandan "Yeni Sohbet Başlat" butonuna tıklandıysa, sohbet listesine boş bir başlangıç odası ekle
    if (yeniSohbet) {
        const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(yeniSohbet) });
        if (ilan) {
            const aliciEmail = ilan.sahibi?.email || "admin@swaphubs.com"; // AI ilanıysa admine gider
            const key = `${aliciEmail}_${yeniSohbet}`;
            
            if (!map.has(key) && aliciEmail !== email) {
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
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Giriş yapın" }, { status: 401 });

    const body = await req.json();
    const { alici, mesaj, ilanId } = body;

    if (!alici || !mesaj) return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });

    const db = await getDb();

    let ilanBaslik = "İlan";
    if (ilanId) {
        const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(ilanId) });
        if (ilan) ilanBaslik = ilan.baslik;
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

    await db.collection("sohbetler").insertOne(yeniMesaj);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
