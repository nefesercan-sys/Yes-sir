export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mesaj = body.mesaj;
    const email = body.email || "Ziyaretci";

    if (!mesaj) return NextResponse.json({ error: "Mesaj boş" }, { status: 400 });

    const db = await getDb();

    // Admin panelinin okuduğu formata tam uygun olarak kaydediyoruz
    const destekTalebi = {
      ilanBaslik: "💬 CANLI DESTEK",
      gonderen: {
        ad: email.includes('@') ? email.split('@')[0] : email,
        email: email,
        ulke: "Web",
        sirket: "Site Ziyaretçisi"
      },
      mesaj: mesaj,
      durum: "okunmadi",
      cevaplar: [],
      createdAt: new Date()
    };

    await db.collection("mesajlar").insertOne(destekTalebi);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Destek API Hata:", error);
    return NextResponse.json({ error: "Hata" }, { status: 500 });
  }
}
