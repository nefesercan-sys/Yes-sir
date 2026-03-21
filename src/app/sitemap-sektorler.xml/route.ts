import { NextResponse } from "next/server";
import { TUM_SEKTORLER, ISLEM_TIPLERI, KULLANICI_TIPLERI } from "@/lib/sektorler";

const BASE = "https://swaphubs.com";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];

  const ekle = (loc: string, priority: string, freq = "daily") =>
    urls.push(`  <url><loc>${loc}</loc><lastmod>${now}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`);

  for (const s of TUM_SEKTORLER) {
    // Ana sektör
    ekle(`${BASE}/sektor/${s.id}`, "0.9");

    // Sektör × İşlem tipi
    for (const i of ISLEM_TIPLERI) {
      ekle(`${BASE}/sektor/${s.id}/${i.slug}`, "0.85");
    }

    // Sektör × Kullanıcı tipi
    for (const k of KULLANICI_TIPLERI) {
      ekle(`${BASE}/sektor/${s.id}/${k.slug}`, "0.8");
    }

    // Sektör × İşlem × Kullanıcı tipi
    for (const i of ISLEM_TIPLERI) {
      for (const k of KULLANICI_TIPLERI) {
        ekle(`${BASE}/sektor/${s.id}/${i.slug}/${k.slug}`, "0.75");
      }
    }
  }

  return new NextResponse(xmlWrap(urls), xmlHeaders());
}

function xmlWrap(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}
function xmlHeaders() {
  return { headers: { "Content-Type": "application/xml", "Cache-Control": "public, s-maxage=3600" } };
}
