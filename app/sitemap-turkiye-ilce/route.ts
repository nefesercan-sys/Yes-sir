import { NextResponse } from "next/server";
import { SEHIR_ILCE } from "@/lib/swaphubs-seo";
import { TUM_SEKTORLER } from "@/lib/sektorler";

const BASE = "https://swaphubs.com";
export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];

  const ekle = (loc: string, priority: string) =>
    urls.push(`  <url><loc>${loc}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`);

  for (const [sehir, ilceler] of Object.entries(SEHIR_ILCE)) {
    for (const ilce of ilceler) {
      ekle(`${BASE}/turkiye/${sehir}/${ilce}`, "0.65");

      for (const s of TUM_SEKTORLER) {
        ekle(`${BASE}/turkiye/${sehir}/${ilce}/${s.id}`, "0.6");
      }
    }
  }

  return new NextResponse(xmlWrap(urls), xmlHeaders());
}

function xmlWrap(u: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${u.join("\n")}\n</urlset>`;
}
function xmlHeaders() {
  return { headers: { "Content-Type": "application/xml", "Cache-Control": "public, s-maxage=3600" } };
}
