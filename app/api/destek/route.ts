export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDb();

    // Mesajı panelinizin okuyabileceği formata dönüştürüp doğrudan Admine yolluyoruz
    const destekMesaji = {
      gonderen: body.email || "ziyaretci@swaphubs.com",
      alici: "nefesercan@gmail.com", // Direkt sizin (Admin) mesaj kutunuza düşer
      mesaj: body.mesaj,
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
