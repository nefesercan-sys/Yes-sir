import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();

    const ilanlar = await db.collection("ilanlar").find({}).toArray();

    let guncellenen = 0;

    for (const ilan of ilanlar) {
      const mevcutSehir = ilan.sehir || ilan.formData?.sehir || "";
      
      if (!mevcutSehir) continue;

      const yeniSehir = mevcutSehir
        .toLowerCase()
        .trim()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c");

      if (yeniSehir === mevcutSehir) continue;

      await db.collection("ilanlar").updateOne(
        { _id: ilan._id },
        { $set: { sehir: yeniSehir } }
      );
      guncellenen++;
    }

    return NextResponse.json({
      mesaj: `${guncellenen} ilanın şehri küçük harfe dönüştürüldü ✅`,
      toplam: guncellenen,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Hata oluştu" }, { status: 500 });
  }
}
