// app/sitemap.ts — SwapHubs (Düzeltilmiş)
// DÜZELTMELER:
//   1. Query param URL'ler → Temiz URL'ler (/ilanlar/sektor/turizm)
//   2. ilan._id (UUID) → ilan.slug
//   3. API endpoint düzeltildi

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

  // ── 1. Statik sayfalar ──────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,               lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/ilanlar`,  lastModified: new Date(), changeFrequency: "hourly",  priority: 0.9 },
    { url: `${BASE}/ilan-ver`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/kayit`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/giris`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // ── 2. Sektör sayfaları — TEMİZ URL ─────────────────────────
  // ❌ ESKİ: /ilanlar?sektor=turizm&tip=ticari  → Google indekslemez
  // ✅ YENİ: /ilanlar/sektor/turizm             → SEO dostu
  const sektorPages: MetadataRoute.Sitemap = SEKTORLER.flatMap((s) => [
    {
      url: `${BASE}/ilanlar/sektor/${s}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.85,
    },
    {
      url: `${BASE}/ilanlar/sektor/${s}/ticari`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${BASE}/ilanlar/sektor/${s}/bireysel`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.75,
    },
  ]);

  // ── 3. Şehir + Sektör sayfaları — TEMİZ URL ─────────────────
  // ❌ ESKİ: /ilanlar?sehir=istanbul&sektor=turizm
  // ✅ YENİ: /ilanlar/istanbul/turizm
  const sehirSektorPages: MetadataRoute.Sitemap = SEHIRLER.flatMap((sehir) =>
    SEKTORLER.slice(0, 8).map((sektor) => ({
      url: `${BASE}/ilanlar/${sehir}/${sektor}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  // ── 4. İlan sayfaları — SLUG kullan, UUID değil ──────────────
  // ❌ ESKİ: /ilan/${ilan._id}   → "69b309..." anlamsız UUID
  // ✅ YENİ: /ilan/${ilan.slug}  → "iphone-15-istanbul" SEO dostu
  let ilanPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${BASE}/api/ilanlar/sitemap`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const ilanlar: { slug: string; updatedAt?: string; createdAt: string }[] =
        await res.json();

      ilanPages = ilanlar
        .filter((ilan) => ilan.slug)
        .map((ilan) => ({
          url: `${BASE}/ilan/${ilan.slug}`,
          lastModified: new Date(ilan.updatedAt ?? ilan.createdAt),
          changeFrequency: "weekly" as const,
          priority: 0.65,
        }));
    }
  } catch (err) {
    console.error("Sitemap ilan hatası:", err);
  }

  return [...staticPages, ...sektorPages, ...sehirSektorPages, ...ilanPages];
}
