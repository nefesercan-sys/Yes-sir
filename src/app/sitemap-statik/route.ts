import { NextResponse } from "next/server";

const BASE = "https://swaphubs.com";

const sayfalar = [
  { url: BASE,                            priority: "1.0", freq: "daily" },
  { url: `${BASE}/kesfet`,               priority: "0.95", freq: "hourly" },
  { url: `${BASE}/ilan-ver`,             priority: "0.9",  freq: "daily" },
  { url: `${BASE}/hizmet-al`,            priority: "0.9",  freq: "daily" },
  { url: `${BASE}/hizmet-ver`,           priority: "0.9",  freq: "daily" },
  { url: `${BASE}/teklif-al`,            priority: "0.85", freq: "daily" },
  { url: `${BASE}/teklif-ver`,           priority: "0.85", freq: "daily" },
  { url: `${BASE}/mesajlar`,             priority: "0.7",  freq: "daily" },
  { url: `${BASE}/profil`,               priority: "0.7",  freq: "weekly" },
  { url: `${BASE}/sss`,                  priority: "0.6",  freq: "monthly" },
  { url: `${BASE}/hakkimizda`,           priority: "0.6",  freq: "monthly" },
  { url: `${BASE}/iletisim`,             priority: "0.6",  freq: "monthly" },
  { url: `${BASE}/gizlilik`,             priority: "0.5",  freq: "monthly" },
  { url: `${BASE}/kullanim-kosullari`,   priority: "0.5",  freq: "monthly" },
];

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sayfalar.map(s => `  <url>
    <loc>${s.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${s.freq}</changefreq>
    <priority>${s.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
}
