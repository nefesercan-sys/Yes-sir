import { NextResponse } from "next/server";
import { MESLEKLER, ISLEM_TIPLERI } from "@/lib/sektorler";
import { ULKELER } from "@/lib/ulkeler";

const BASE = "https://swaphubs.com";
export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];

  const ekle = (loc: string, priority: string) =>
    urls.push(`  <url><loc>${loc}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>${priority}</priority></url>`);

  for (const [sektor, meslekler] of Object.entries(MESLEKLER)) {
    for (const meslek of meslekler) {
      // Ana meslek sayfası
      ekle(`${BASE}/meslek/${meslek}`, "0.85");

      // Meslek × İşlem
      for (const i of ISLEM_TIPLERI) {
        ekle(`${BASE}/meslek/${meslek}/${i.slug}`, "0.8");
      }

      // Meslek × Ülke (top 20)
      for (const ulke of ULKELER.slice(0, 20)) {
        ekle(`${BASE}/ulke/${ulke.slug}/meslek/${meslek}`, "0.7");
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
