import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ilanId, ilanBaslik, ad, email, telefon, sirket, fiyat, aciklama, teslimSuresi } = body;

    if (!ilanId || !ad || !email || !fiyat) {
      return NextResponse.json({ mesaj:"Zorunlu alanlar eksik" }, { status:400 });
    }

    const db = await getDb();
    await db.collection("teklifler").insertOne({
      ilanId,
      ilanBaslik,
      gonderen: { ad, email, telefon, sirket },
      fiyat,
      aciklama,
      teslimSuresi,
      durum:     "beklemede",
      createdAt: new Date(),
    });

    // İlana ait teklifSayisi'ni artır
    await db.collection("ilanlar").updateOne(
      { _id: new ObjectId(ilanId) },
      { $inc: { teklifSayisi: 1 } }
    );

    return NextResponse.json({ basarili: true });
  } catch {
    return NextResponse.json({ mesaj:"Sunucu hatası" }, { status:500 });
  }
}

import { ObjectId } from "mongodb";
