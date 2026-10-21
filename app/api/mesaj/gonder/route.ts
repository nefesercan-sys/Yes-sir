import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { clean, isEmail, rateLimited } from "@/lib/api-guard";

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(req, "mesaj-gonder", 5, 10 * 60 * 1000)) {
      return NextResponse.json({ mesaj: "Çok fazla istek. Lütfen biraz sonra tekrar deneyin." }, { status: 429 });
    }
    const fd = await req.formData();

    const ilanId  = clean(fd.get("ilanId"), 60);
    const baslik  = clean(fd.get("ilanBaslik"), 200);
    const ad      = clean(fd.get("ad"), 100);
    const email   = clean(fd.get("email"), 254).toLowerCase();
    const telefon = clean(fd.get("telefon"), 30);
    const sirket  = clean(fd.get("sirket"), 120);
    const ulke    = clean(fd.get("ulke"), 60);
    const miktar  = clean(fd.get("miktar"), 40);
    const birim   = clean(fd.get("birim"), 30);
    const mesaj   = clean(fd.get("mesaj"), 3000);

    if (!ad || !email || !mesaj) {
      return NextResponse.json({ mesaj:"Zorunlu alanlar eksik" }, { status:400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ mesaj:"E-posta adresi geçersiz" }, { status:400 });
    }

    const dosyaListesi: { isim:string; boyut:number }[] = [];
    const dosyalar = fd.getAll("dosyalar").filter((d): d is File => typeof d !== "string").slice(0, 5);
    for (const d of dosyalar) {
      if (d.size > 0) dosyaListesi.push({ isim:clean(d.name, 120), boyut:d.size });
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
