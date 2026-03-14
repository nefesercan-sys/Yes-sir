// ============================================================
// SwapHubs — app/api/mesajlar/route.ts
// Kullanıcılar arası mesajlaşma
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

function convId(e1: string, e2: string, ilanId?: string): string {
  const sorted = [e1, e2].sort().join("__");
  return ilanId ? `${sorted}____${ilanId}` : sorted;
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const withEmail = searchParams.get("with");
    const ilanId    = searchParams.get("ilanId");
    const db = await getDb();

    if (withEmail) {
      const cId = convId(email, withEmail, ilanId ?? undefined);
      const mesajlar = await db.collection("mesajlar")
        .find({ conversationId: cId })
        .sort({ createdAt: 1 })
        .toArray();

      // Okunmamışları okundu yap
      await db.collection("mesajlar").updateMany(
        { conversationId: cId, alici: email, okundu: false },
        { $set: { okundu: true } }
      );

      return NextResponse.json(ser(mesajlar));
    }

    // Tüm konuşmalar listesi
    const pipeline: any[] = [
      { $match: { $or: [{ gonderen: email }, { alici: email }] } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$conversationId",
          sonMesaj:   { $first: "$mesaj" },
          sonTarih:   { $first: "$createdAt" },
          gonderen:   { $first: "$gonderen" },
          alici:      { $first: "$alici" },
          ilanId:     { $first: "$ilanId" },
          ilanBaslik: { $first: "$ilanBaslik" },
          okunmamis: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ["$alici", email] }, { $eq: ["$okundu", false] }] },
                1, 0,
              ],
            },
          },
        },
      },
      { $sort: { sonTarih: -1 } },
      { $limit: 50 },
    ];

    const konusmalar = await db.collection("mesajlar").aggregate(pipeline).toArray();
    const sonuc = konusmalar.map(k => ({
      ...k,
      karsiTaraf: k.gonderen === email ? k.alici : k.gonderen,
    }));

    return NextResponse.json(ser(sonuc));
  } catch (err) {
    console.error("GET mesajlar:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const ad    = session?.user?.name ?? "";
    if (!email) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const { alici, mesaj, ilanId, ilanBaslik } = await req.json();
    if (!alici || !mesaj?.trim()) {
      return NextResponse.json({ error: "Alıcı ve mesaj zorunlu" }, { status: 400 });
    }
    if (alici === email) {
      return NextResponse.json({ error: "Kendinize mesaj gönderemezsiniz" }, { status: 400 });
    }

    const db  = await getDb();
    const cId = convId(email, alici, ilanId ?? undefined);

    // İlan başlığını bul
    let ilanBas: string | null = ilanBaslik ?? null;
    if (ilanId && !ilanBas) {
      const { ObjectId } = await import("mongodb");
      try {
        const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(ilanId) });
        ilanBas = ilan?.baslik ?? null;
      } catch {}
    }

    await db.collection("mesajlar").insertOne({
      conversationId: cId,
      gonderen:       email,
      gonderenAd:     ad,
      alici,
      mesaj:          mesaj.trim(),
      ilanId:         ilanId   ?? null,
      ilanBaslik:     ilanBas  ?? null,
      okundu:         false,
      createdAt:      new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("POST mesajlar:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

function ser(d: any[]): any[] {
  return JSON.parse(JSON.stringify(d));
}
