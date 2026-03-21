import { MetadataRoute } from "next";

const BASE = "https://www.swaphubs.com";

const SEKTORLER = [
  "turizm", "seyahat", "kiralama", "tamir", "usta", "temizlik",
  "uretim", "giyim", "saglik", "egitim", "etkinlik", "mobilya",
  "tekstil", "mermer-tas", "metal-celik", "plastik-pvc", "ahsap-mob",
  "gida-tarim", "insaat-malz", "elektrik", "makine", "lojistik",
  "kimya-boya", "saglik-med",
];

const SEHIRLER = [
  "istanbul", "ankara", "izmir", "bursa", "antalya",
  "adana", "konya", "gaziantep", "mersin", "kayseri",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/ilanlar`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE}/kayit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/giris`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/ilan-ver`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const sektorPages: MetadataRoute.Sitemap = SEKTORLER.flatMap(s => [
    { url: `${BASE}/ilanlar?sektor=${s}&tip=ticari`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE}/ilanlar?sektor=${s}&tip=bireysel`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.7 },
  ]);

  const sehirSektorPages: MetadataRoute.Sitemap = SEHIRLER.flatMap(sehir =>
    SEKTORLER.slice(0, 8).map(sektor => ({
      url: `${BASE}/ilanlar?sehir=${sehir}&sektor=${sektor}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  let ilanPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${BASE}/api/ilanlar?limit=500`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const ilanlar = data.ilanlar || data || [];
      ilanPages = ilanlar.map((ilan: any) => ({
        url: `${BASE}/ilan/${ilan._id}`,
        lastModified: new Date(ilan.updatedAt || ilan.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  } catch {}

  return [...staticPages, ...sektorPages, ...sehirSektorPages, ...ilanPages];
}
