import { NextResponse } from "next/server";
import { TUM_SEKTORLER, ISLEM_TIPLERI, KULLANICI_TIPLERI } from "@/lib/sektorler";

const BASE = "https://www.swaphubs.com";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = new Date().toISOString();
    const urls: string[] = [];

    const ekle = (loc: string, priority: string, freq = "weekly") =>
      urls.push(`<url><loc>${loc}</loc><lastmod>${now}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`);

    for (const s of TUM_SEKTORLER) {
      // Ana sektör
      ekle(`${BASE}/sektor/${s.id}`, "0.9");

      // Sektör x İşlem tipi
      for (const i of ISLEM_TIPLERI) {
        ekle(`${BASE}/sektor/${s.id}/${i.slug}`, "0.85");
      }

      // Sektör x Kullanıcı tipi
      for (const k of KULLANICI_TIPLERI) {
        ekle(`${BASE}/sektor/${s.id}/${k.slug}`, "0.8");
      }

      // Sektör x İşlem x Kullanıcı
      for (const i of ISLEM_TIPLERI) {
        for (const k of KULLANICI_TIPLERI) {
          ekle(`${BASE}/sektor/${s.id}/${i.slug}/${k.slug}`, "0.75");
        }
      }
    }

    return new NextResponse(xmlWrap(urls), xmlHeaders());
  } catch (err) {
    console.error("Sitemap sektorler hatası:", err);
    return NextResponse.json({ status: 500 });
  }
}

function xmlWrap(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}

function xmlHeaders() {
  return { headers: { "Content-Type": "application/xml", "Cache-Control": "public, s-maxage=3600" } };
}
