import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { clean, isEmail, rateLimited } from "@/lib/api-guard";

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(req, "teklif-ver", 5, 10 * 60 * 1000)) {
      return NextResponse.json({ mesaj:"Çok fazla istek. Lütfen biraz sonra tekrar deneyin." }, { status:429 });
    }
    const body = await req.json();
    const ilanId       = clean(body?.ilanId, 40);
    const ilanBaslik   = clean(body?.ilanBaslik, 200);
    const ad           = clean(body?.ad, 100);
    const email        = clean(body?.email, 254).toLowerCase();
    const telefon      = clean(body?.telefon, 30);
    const sirket       = clean(body?.sirket, 120);
    const fiyat        = clean(String(body?.fiyat ?? ""), 40);
    const aciklama     = clean(body?.aciklama, 2000);
    const teslimSuresi = clean(String(body?.teslimSuresi ?? ""), 60);

    if (!ilanId || !ad || !email || !fiyat) {
      return NextResponse.json({ mesaj:"Zorunlu alanlar eksik" }, { status:400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ mesaj:"E-posta adresi geçersiz" }, { status:400 });
    }
    if (!ObjectId.isValid(ilanId)) {
      return NextResponse.json({ mesaj:"Geçersiz ilan" }, { status:400 });
    }

    const db = await getDb();
    // Var olmayan ilana teklif yazılmasın
    const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(ilanId) }, { projection: { _id: 1 } });
    if (!ilan) return NextResponse.json({ mesaj:"İlan bulunamadı" }, { status:404 });

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
