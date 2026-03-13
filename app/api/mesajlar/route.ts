// ============================================================
// SwapHubs — app/api/mesajlar/route.ts
// Kullanıcılar arası mesajlaşma sistemi - GÜNCELLENDİ (Hatasız)
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
    // GÜVENLİK: Session veya email yoksa işlemi durdur
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    }

    const userEmail = session.user.email; // Email'i değişkene alarak TS'yi rahatlatıyoruz
    const { searchParams } = new URL(req.url);
    const withEmail = searchParams.get("with");
    const ilanId    = searchParams.get("ilanId");

    const db = await getDb();

    if (withEmail) {
      // Belirli kullanıcıyla olan detaylı mesajlaşma akışı
      const convId = conversationId(userEmail, withEmail, ilanId || undefined);
      const mesajlar = await db
        .collection("mesajlar")
        .find({ conversationId: convId })
        .sort({ createdAt: 1 })
        .toArray();

      // Karşı tarafın gönderdiği okunmamış mesajları "okundu" olarak işaretle
      await db.collection("mesajlar").updateMany(
        { conversationId: convId, alici: userEmail, okundu: false },
        { $set: { okundu: true } }
      );

      return NextResponse.json(serialize(mesajlar));
    } else {
      // Tüm konuşmaların listesi (Sol paneldeki gelen kutusu)
      const pipeline = [
        {
          $match: {
            $or: [
              { gonderen: userEmail },
              { alici: userEmail },
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
                  { $and: [{ $eq: ["$alici", userEmail] }, { $eq: ["$okundu", false] }] },
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

      // DÜZELTME: karsiTaraf belirlenirken session?.user?.email kullanıldı
      const sonuc = konusmalar.map(k => ({
        ...k,
        karsiTaraf: k.gonderen === userEmail ? k.alici : k.gonderen,
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
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    }

    const userEmail = session.user.email;
    const body = await req.json();
    const { alici, mesaj, ilanId, ilanBaslik } = body;

    if (!alici || !mesaj) {
      return NextResponse.json({ error: "Alıcı e-posta ve mesaj alanları zorunludur." }, { status: 400 });
    }

    const db = await getDb();
    const convId = conversationId(userEmail, alici, ilanId);

    const yeniMesaj = {
      conversationId: convId,
      gonderen: userEmail,
      alici: alici,
      mesaj: mesaj.trim(),
      ilanId: ilanId || null,
      ilanBaslik: ilanBaslik || "Genel Mesaj",
      okundu: false,
      createdAt: new Date(),
    };

    // Mesajı veritabanına kaydet
    const result = await db.collection("mesajlar").insertOne(yeniMesaj);

    // DÜZELTME: session?.user?.name || userEmail kullanılarak undefined hatası engellendi
    const gonderenAd = session.user.name || userEmail;

    await db.collection("bildirimler").insertOne({
      kullaniciEposta: alici,
      tip: "yeni_mesaj",
      mesaj: `${gonderenAd} size bir mesaj gönderdi.`,
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
