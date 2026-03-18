import { getDb } from "@/lib/mongodb";

export default async function sitemap() {
  const baseUrl = "https://swaphubs.com";

  // Statik sayfalar
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/ilanlar`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/ilan-ver`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/giris`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/kayit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Dinamik ilan sayfaları
  try {
    const db = await getDb();
    const ilanlar = await db
      .collection("ilanlar")
      .find({ durum: "aktif" })
      .sort({ createdAt: -1 })
      .limit(1000)
      .project({ _id: 1, createdAt: 1 })
      .toArray();

    const ilanPages = ilanlar.map((ilan: any) => ({
      url: `${baseUrl}/ilan/${ilan._id}`,
      lastModified: new Date(ilan.createdAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticPages, ...ilanPages];
  } catch {
    return staticPages;
  }
}
