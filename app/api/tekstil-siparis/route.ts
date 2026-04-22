import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb"; // Bağlantı dosyan

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await getDb();

    // Senin admin paneline uyumlu bir sipariş objesi oluşturuyoruz
    const yeniSiparis = {
      tip: "tekstil_siparisi",
      ilanId: body.urunId,
      ilanBaslik: body.urunBaslik,
      fiyat: body.fiyat * body.adet, // Toplam fiyat
      adet: body.adet,
      doviz: "₺",
      musteri: {
        ad: body.musteriAd,
        email: body.musteriEmail,
        tel: body.musteriTel,
      },
      not: body.not,
      durum: "bekliyor", // Panelde sarı renkte gözükecek
      hizmetVeren: {
        ad: "Maya Tekstil",
        email: "nefesercan@gmail.com",
      },
      olusturuldu: new Date(),
      createdAt: new Date(),
    };

    // Siparişler/Rezervasyonlar tablona kaydediyoruz
    // (Eğer admin panelin siparişleri "rezervasyonlar" tablosundan çekiyorsa burayı değiştirme)
    await db.collection("siparisler").insertOne(yeniSiparis);

    return NextResponse.json({ success: true, message: "Sipariş alındı" });
  } catch (error) {
    console.error("Sipariş hatası:", error);
    return NextResponse.json({ success: false, message: "Sunucu hatası" }, { status: 500 });
  }
}
