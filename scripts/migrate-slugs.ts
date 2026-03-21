import mongoose from "mongoose";
import { generateIlanSlug } from "../lib/slugify";

const MONGODB_URI = process.env.MONGODB_URI!;

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ DB bağlandı\n");

  const collection = mongoose.connection.db.collection("ilans");

  const ilanlar = await collection
    .find({ slug: { $exists: false } })
    .project({ _id: 1, baslik: 1, sehir: 1, sektor: 1 })
    .toArray();

  console.log(`📦 ${ilanlar.length} ilan işlenecek\n`);

  const slugSayaci: Record<string, number> = {};
  let basarili = 0;

  for (const ilan of ilanlar) {
    const base = generateIlanSlug(
      ilan.baslik || "ilan",
      ilan.sehir  || "turkiye",
      ilan.sektor || "genel"
    );

    let slug = base;
    if (slugSayaci[base]) {
      slugSayaci[base]++;
      slug = `${base}-${slugSayaci[base]}`;
    } else {
      slugSayaci[base] = 1;
    }

    await collection.updateOne(
      { _id: ilan._id },
      { $set: { slug } }
    );

    console.log(`✅ ${ilan._id} → /ilan/${slug}`);
    basarili++;
  }

  console.log(`\n────────────────────────────`);
  console.log(`✅ Tamamlanan : ${basarili}`);
  console.log(`────────────────────────────`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("❌ Hata:", err);
  process.exit(1);
});
