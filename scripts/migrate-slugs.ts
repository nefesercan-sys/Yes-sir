// scripts/migrate-slugs.ts
// slug'ı olmayan ilanlara slug üretir. Varsayılan KURU ÇALIŞTIRMA'dır (veritabanına yazmaz).
// Çalıştırma:  MONGODB_URI=... npx tsx scripts/migrate-slugs.ts            (yalnız rapor)
//              MONGODB_URI=... MIGRATE_APPLY=1 npx tsx scripts/migrate-slugs.ts  (yazar)
import { MongoClient } from "mongodb";
import { generateIlanSlug } from "../lib/slugify";

const MONGODB_URI = process.env.MONGODB_URI || "";
if (!MONGODB_URI) {
  console.error("MONGODB_URI ortam değişkeni tanımlı değil; çıkılıyor.");
  process.exit(1);
}
const UYGULA = process.env.MIGRATE_APPLY === "1";
// Veritabanı ve koleksiyon adı uygulamayla aynı olmalı (lib/mongodb.ts, app/api/ilanlar)
const DB_ADI = "hizmetara";
const KOLEKSIYON = "ilanlar";

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  try {
    const collection = client.db(DB_ADI).collection(KOLEKSIYON);

    const ilanlar = await collection
      .find({ $or: [{ slug: { $exists: false } }, { slug: null }, { slug: "" }] })
      .project({ _id: 1, baslik: 1, sehir: 1, sektor: 1, sektorId: 1 })
      .toArray();
    console.log(`${ilanlar.length} ilan işlenecek (${UYGULA ? "YAZILACAK" : "kuru çalıştırma"})`);

    // Çakışma kontrolü: veritabanında zaten var olan slug'lar ve bu çalıştırmada üretilenler
    const mevcut = new Set<string>(
      (await collection.find({ slug: { $type: "string", $ne: "" } }).project({ slug: 1, _id: 0 }).toArray()).map(
        (d) => String(d.slug)
      )
    );

    let basarili = 0;
    for (const ilan of ilanlar) {
      const base = generateIlanSlug(ilan.baslik || "ilan", ilan.sehir || "turkiye", ilan.sektor || ilan.sektorId || "genel");
      let slug = base;
      let n = 1;
      while (mevcut.has(slug)) {
        n++;
        slug = `${base}-${n}`;
      }
      mevcut.add(slug);

      if (UYGULA) {
        const r = await collection.updateOne({ _id: ilan._id, $or: [{ slug: { $exists: false } }, { slug: null }, { slug: "" }] }, { $set: { slug } });
        if (r.modifiedCount !== 1) {
          console.warn(`atlandı (değişmiş olabilir): ${ilan._id}`);
          continue;
        }
      }
      console.log(`${ilan._id} -> /ilan/${slug}`);
      basarili++;
    }
    console.log(`Tamamlanan: ${basarili}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
