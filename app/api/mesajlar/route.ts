// ============================================================
// SwapHubs — app/api/mesajlar/route.ts
// Kullanıcılar arası mesajlaşma sistemi
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// MongoDB ObjectId'lerini temiz JSON'a çeviren yardımcı fonksiyon
function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}

// Konuşma ID üret (sıralı — her iki yönde aynı ID)
function conversationId(email1: string, email2: string, ilanId?: string): string {
  const sorted = [email1, email2].sort().join("_");
  return ilanId ? `${sorted}__${ilanId}` : sorted;
}

// ─── GET: Konuşma listesi veya mesajlar ────────────────────
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const withEmail = searchParams.get("with");
    const ilanId    = searchParams.get("ilanId");

    const db = await getDb();

    if (withEmail) {
      // Belirli kullanıcıyla olan detaylı mesajlaşma akışı
      const convId = conversationId(session.user.email, withEmail, ilanId || undefined);
      const mesajlar = await db
        .collection("mesajlar")
        .find({ conversationId: convId })
        .sort({ createdAt: 1 })
        .toArray();

      // Karşı tarafın gönderdiği okunmamış mesajları "okundu" olarak işaretle
      await db.collection("mesajlar").updateMany(
        { conversationId: convId, alici: session.user.email, okundu: false },
        { $set: { okundu: true } }
      );

      return NextResponse.json(serialize(mesajlar));
    } else {
      // Tüm konuşmaların listesi (Sol paneldeki gelen kutusu)
      const pipeline = [
        {
          $match: {
            $or: [
              { gonderen: session.user.email },
              { alici: session.user.email },
            ],
          },
        },
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: "$conversationId",
            sonMesaj: { $first: "$mesaj" },
            sonTarih: { $first: "$createdAt" },
            gonderen: { $first: "$gonderen" },
            alici: { $first: "$alici" },
            ilanId: { $first: "$ilanId" },
            ilanBaslik: { $first: "$ilanBaslik" },
            okunmamis: {
              $sum: {
                $cond: [
                  { $and: [{ $eq: ["$alici", session.user.email] }, { $eq: ["$okundu", false] }] },
                  1, 0
                ]
              }
            },
          },
        },
        { $sort: { sonTarih: -1 } },
        { $limit: 50 },
      ];

      const konusmalar = await db.collection("mesajlar").aggregate(pipeline).toArray();

      // Karşı taraf bilgilerini ekle (Gelen kutusunda kiminle konuştuğunu bilmek için)
      const sonuc = konusmalar.map(k => ({
        ...k,
        karsiTaraf: k.gonderen === session.user.email ? k.alici : k.gonderen,
      }));

      return NextResponse.json(serialize(sonuc));
    }
  } catch (err: any) {
    console.error("GET Mesajlar Hatası:", err);
    return NextResponse.json({ error: "Sunucu hatası", detay: err.message }, { status: 500 });
  }
}

// ─── POST: Yeni Mesaj Gönderme ──────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const body = await req.json();
    const { alici, mesaj, ilanId, ilanBaslik } = body;

    if (!alici || !mesaj) {
      return NextResponse.json({ error: "Alıcı e-posta ve mesaj alanları zorunludur." }, { status: 400 });
    }

    const db = await getDb();
    const convId = conversationId(session.user.email, alici, ilanId);

    const yeniMesaj = {
      conversationId: convId,
      gonderen: session.user.email,
      alici: alici,
      mesaj: mesaj.trim(),
      ilanId: ilanId || null,
      ilanBaslik: ilanBaslik || "Genel Mesaj",
      okundu: false,
      createdAt: new Date(),
    };

    // Mesajı veritabanına kaydet
    const result = await db.collection("mesajlar").insertOne(yeniMesaj);

    // Karşı tarafa panel üzerinden bildirim düşmesi için bildirimler tablosuna da yazıyoruz
    await db.collection("bildirimler").insertOne({
      kullaniciEposta: alici,
      tip: "yeni_mesaj",
      mesaj: `${session.user.name || session.user.email} size bir mesaj gönderdi.`,
      ilanId: ilanId || null,
      okundu: false,
      tarih: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      mesaj: serialize({ ...yeniMesaj, _id: result.insertedId }) 
    });

  } catch (err: any) {
    console.error("POST Mesajlar Hatası:", err);
    return NextResponse.json({ error: "Mesaj gönderilemedi", detay: err.message }, { status: 500 });
  }
}
