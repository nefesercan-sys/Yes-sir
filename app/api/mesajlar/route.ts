// ============================================================
// SwapHubs — app/api/mesajlar/route.ts
// Kullanıcılar arası mesajlaşma sistemi
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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
      // Belirli kullanıcıyla mesajlaşma
      const convId = conversationId(session.user.email, withEmail, ilanId || undefined);
      const mesajlar = await db
        .collection("mesajlar")
        .find({ conversationId: convId })
        .sort({ createdAt: 1 })
        .toArray();

      // Okunmamışları okundu yap
      await db.collection("mesajlar").updateMany(
        { conversationId: convId, alici: session.user.email, okundu: false },
        { $set: { okundu: true } }
      );

      return NextResponse.json(serialize(mesajlar));
    } else {
      // Tüm konuşmaların listesi (benzersiz konuşmalar)
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

      // Karşı taraf bilgilerini ekle
      const sonuc = konusmalar.map(k => ({
        ...k,
        karsiTaraf: k.gonderen === session.user.email ? k.alici : k.gonderen,
      }));

      return NextResponse.json(serialize(sonuc));
    }
  } catch (err) {
