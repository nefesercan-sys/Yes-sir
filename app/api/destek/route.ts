export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ADMIN_EMAIL, clean, isEmail, rateLimited } from "@/lib/api-guard";

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(req, "destek", 6, 10 * 60 * 1000)) {
      return NextResponse.json({ error: "Çok fazla istek" }, { status: 429 });
    }
    const body = await req.json();
    const mesaj = clean(body?.mesaj, 2000);
    if (!mesaj) return NextResponse.json({ error: "Mesaj boş" }, { status: 400 });
    const eposta = clean(body?.email, 254).toLowerCase();
    const db = await getDb();

    // Mesajı panelinizin okuyabileceği formata dönüştürüp doğrudan Admine yolluyoruz
    const destekMesaji = {
      gonderen: isEmail(eposta) ? eposta : "ziyaretci@swaphubs.com",
      alici: ADMIN_EMAIL, // Admin e-postası: ADMIN_EMAIL ortam değişkeni (yoksa eski varsayılan)
      mesaj,
      ilanId: "destek", // Sistem bunun normal ilan olmadığını anlasın diye
      ilanBaslik: "💬 CANLI DESTEK",
      okundu: false,
      createdAt: new Date()
    };

    await db.collection("mesajlar").insertOne(destekMesaji);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Destek API Hata:", error);
    return NextResponse.json({ error: "Hata" }, { status: 500 });
  }
}
