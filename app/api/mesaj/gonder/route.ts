import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();

    const ilanId    = fd.get("ilanId")    as string;
    const baslik    = fd.get("ilanBaslik")as string;
    const ad        = fd.get("ad")        as string;
    const email     = fd.get("email")     as string;
    const telefon   = fd.get("telefon")   as string ?? "";
    const sirket    = fd.get("sirket")    as string ?? "";
    const ulke      = fd.get("ulke")      as string ?? "";
    const miktar    = fd.get("miktar")    as string ?? "";
    const birim     = fd.get("birim")     as string ?? "";
    const mesaj     = fd.get("mesaj")     as string;

    if (!ad || !email || !mesaj) {
      return NextResponse.json({ mesaj:"Zorunlu alanlar eksik" }, { status:400 });
    }

    const dosyaListesi: { isim:string; boyut:number }[] = [];
    const dosyalar = fd.getAll("dosyalar") as File[];
    for (const d of dosyalar) {
      if (d.size > 0) dosyaListesi.push({ isim:d.name, boyut:d.size });
    }

    const db = await getDb();
    await db.collection("mesajlar").insertOne({
      ilanId,
      ilanBaslik:  baslik,
      gonderen:    { ad, email, telefon, sirket, ulke },
      mesaj,
      miktar,
      birim,
      dosyalar:    dosyaListesi,
      durum:       "okunmadi",
      cevaplar:    [],
      createdAt:   new Date(),
      updatedAt:   new Date(),
    });

    return NextResponse.json({ basarili: true });
  } catch {
    return NextResponse.json({ mesaj:"Sunucu hatası" }, { status:500 });
  }
}
