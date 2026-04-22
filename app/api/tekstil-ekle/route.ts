import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb"; // Senin orijinal bağlantı dosyan

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await getDb();

    // Veritabanına gidecek veriyi toparlıyoruz
    const yeniUrun = {
      baslik: body.baslik,
      isimEn: body.isimEn,
      fiyat: Number(body.fiyat),
      gorsel: body.gorsel,
      kategori: "tekstil", // Otomatik olarak tekstil kategorisine atar
      durum: "aktif",
      eklenmeTarihi: new Date(),
    };

    const result = await db.collection("ilanlar").insertOne(yeniUrun);

    return NextResponse.json({ success: true, message: "Ürün başarıyla eklendi!" });
  } catch (error) {
    console.error("Ürün eklenirken hata:", error);
    return NextResponse.json({ success: false, message: "Sunucu hatası!" }, { status: 500 });
  }
}
