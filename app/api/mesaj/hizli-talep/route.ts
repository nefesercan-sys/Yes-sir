import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { clean, isEmail, rateLimited } from "@/lib/api-guard";

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(req, "hizli-talep", 5, 10 * 60 * 1000)) {
      return NextResponse.json({ mesaj:"Çok fazla istek. Lütfen biraz sonra tekrar deneyin." }, { status:429 });
    }
    const b = await req.json();
    const urun   = clean(b?.urun, 150);
    const ulke   = clean(b?.ulke, 60);
    const miktar = clean(String(b?.miktar ?? ""), 40);
    const email  = clean(b?.email, 254).toLowerCase();
    if (!email) return NextResponse.json({ mesaj:"E-posta zorunlu" }, { status:400 });
    if (!isEmail(email)) return NextResponse.json({ mesaj:"E-posta adresi geçersiz" }, { status:400 });

    const db = await getDb();
    await db.collection("mesajlar").insertOne({
      tip:         "hizli-talep",
      ilanId:      "genel",
      ilanBaslik:  "Hızlı Talep",
      gonderen:    { email, ulke, ad:"—", telefon:"", sirket:"" },
      mesaj:       `Ürün: ${urun}\nMiktar: ${miktar}\nÜlke: ${ulke}`,
      miktar,
      birim:       "",
      dosyalar:    [],
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
