import { NextResponse } from "next/server";
import { SEHIR_ILCE } from "@/lib/swaphubs-seo";
import { TUM_SEKTORLER } from "@/lib/sektorler";

const BASE = "https://swaphubs.com";
export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];

  // Sadece ilk 20 şehrin ilçeleri
  const sehirler = Object.entries(SEHIR_ILCE).slice(0, 20);

  for (const [sehir, ilceler] of sehirler) {
    for (const ilce of ilceler) {
      urls.push(`  <url><loc>${BASE}/turkiye/${sehir}/${ilce}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.65</priority></url>`);
      for (const s of TUM_SEKTORLER) {
        urls.push(`  <url><loc>${BASE}/turkiye/${sehir}/${ilce}/${s.id}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`);
      }
    }
  }

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`,
    { headers: { "Content-Type": "application/xml", "Cache-Control": "public, s-maxage=3600" } }
  );
}
