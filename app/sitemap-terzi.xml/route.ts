import { NextResponse } from "next/server";

const BASE = "https://www.swaphubs.com";
export const dynamic = "force-dynamic";

const terziSayfalar = [
  // ─── Ana terzi sayfası ───────────────────────────────────────────────────
  { url: `${BASE}/terzi`,                                                   priority: "1.0", freq: "weekly" },

  // ─── Terzi şehir sayfaları ───────────────────────────────────────────────
  { url: `${BASE}/terzi/antalya`,                                           priority: "0.95", freq: "weekly" },
  { url: `${BASE}/terzi/istanbul`,                                          priority: "0.95", freq: "weekly" },
  { url: `${BASE}/terzi/ankara`,                                            priority: "0.95", freq: "weekly" },
  { url: `${BASE}/terzi/izmir`,                                             priority: "0.9",  freq: "weekly" },
  { url: `${BASE}/terzi/bursa`,                                             priority: "0.85", freq: "weekly" },
  { url: `${BASE}/terzi/adana`,                                             priority: "0.85", freq: "weekly" },

  // ─── Tekstil Antalya ─────────────────────────────────────────────────────
  { url: `${BASE}/tekstil-antalya`,                                         priority: "0.9",  freq: "weekly" },

  // ─── Online Terzi Hizmeti ────────────────────────────────────────────────
  { url: `${BASE}/online-terzi-hizmeti`,                                    priority: "1.0",  freq: "weekly" },

  // ─── Online Tailor Service ───────────────────────────────────────────────
  { url: `${BASE}/online-tailor-service`,                                   priority: "0.9",  freq: "weekly" },

  // ─── Antalya Terzi Dikim ─────────────────────────────────────────────────
  { url: `${BASE}/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat`,  priority: "0.9",  freq: "weekly" },
];

export async function GET() {
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${terziSayfalar.map(s => `  <url>
    <loc>${s.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${s.freq}</changefreq>
    <priority>${s.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
