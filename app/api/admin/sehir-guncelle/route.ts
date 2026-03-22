import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const SEHIRLER = [
  "istanbul", "ankara", "izmir", "bursa", "antalya",
  "adana", "konya", "gaziantep", "mersin", "kayseri",
  "eskisehir", "trabzon", "samsun", "denizli", "balikesir",
  "malatya", "diyarbakir", "manisa", "aydin", "kocaeli"
];

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();

    const ilanlar = await db.collection("ilanlar").find({
      $or: [
        { sehir: "turkiye" },
        { sehir: "Türkiye" },
        { sehir: "Global" },
        { sehir: "global" },
        { sehir: null },
        { sehir: "" },
      ]
    }).toArray();

    let guncellenen = 0;

    for (const ilan of ilanlar) {
      const formSehir = ilan.formData?.sehir;

      const sehir =
        formSehir &&
        formSehir !== "Global" &&
        formSehir !== "global" &&
        formSehir !== "Türkiye" &&
        formSehir !== "turkiye"
          ? formSehir.toLowerCase().trim()
          : SEHIRLER[Math.floor(Math.random() * SEHIRLER.length)];

      await db.collection("ilanlar").updateOne(
        { _id: ilan._id },
        { $set: { sehir } }
      );
      guncellenen++;
    }

    return NextResponse.json({
      mesaj: `${guncellenen} ilana şehir güncellendi ✅`,
      toplam: guncellenen,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Hata oluştu" }, { status: 500 });
  }
}
