import { NextResponse } from "next/server";

const BASE = "https://www.swaphubs.com";

const sayfalar = [
  { url: BASE,                            priority: "1.0", freq: "daily" },
  { url: `${BASE}/kesfet`,               priority: "0.95", freq: "daily" },
  { url: `${BASE}/ilan-ver`,             priority: "0.9",  freq: "daily" },
  { url: `${BASE}/ilanlar`,              priority: "0.9",  freq: "daily" },
  { url: `${BASE}/hakkimizda`,           priority: "0.6",  freq: "monthly" },
  { url: `${BASE}/iletisim`,             priority: "0.6",  freq: "monthly" },
  { url: `${BASE}/gizlilik`,             priority: "0.5",  freq: "monthly" },
  { url: `${BASE}/kullanim-kosullari`,   priority: "0.5",  freq: "monthly" },
  { url: `${BASE}/terzi`,                priority: "0.9",  freq: "weekly" },
  { url: `${BASE}/tekstil-antalya`,      priority: "0.9",  freq: "weekly" },
  { url: `${BASE}/online-terzi-hizmeti`, priority: "1.0",  freq: "weekly" },
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
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}
