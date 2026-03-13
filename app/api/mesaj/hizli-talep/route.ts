import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { urun, ulke, miktar, email } = await req.json();
    if (!email) return NextResponse.json({ mesaj:"E-posta zorunlu" }, { status:400 });

    const db = await getDb();
    await db.collection("mesajlar").insertOne({
      tip:         "hizli-talep",
      ilanId:      "genel",
      ilanBaslik:  "Hızlı Talep",
      gonderen:    { email, ulke: ulke ?? "", ad:"—", telefon:"", sirket:"" },
      mesaj:       `Ürün: ${urun ?? ""}\nMiktar: ${miktar ?? ""}\nÜlke: ${ulke ?? ""}`,
      miktar:      miktar ?? "",
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
