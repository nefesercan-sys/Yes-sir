import { NextResponse } from "next/server";
import { ULKELER, ULKE_SEHIR } from "@/lib/ulkeler";
import { TUM_SEKTORLER, ISLEM_TIPLERI, MESLEKLER } from "@/lib/sektorler";

const BASE = "https://swaphubs.com";
export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];
  const tumMeslekler = Object.values(MESLEKLER).flat();

  const ekle = (loc: string, priority: string, freq = "daily") =>
    urls.push(`  <url><loc>${loc}</loc><lastmod>${now}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`);

  for (const ulke of ULKELER) {
    // Ülke ana
    ekle(`${BASE}/ulke/${ulke.slug}`, "0.8");

    // Ülke × Sektör
    for (const s of TUM_SEKTORLER) {
      ekle(`${BASE}/ulke/${ulke.slug}/${s.id}`, "0.75");

      // Ülke × Sektör × İşlem
      for (const i of ISLEM_TIPLERI) {
        ekle(`${BASE}/ulke/${ulke.slug}/${s.id}/${i.slug}`, "0.7");
      }
    }

    // Ülke × Meslek (top 20)
    for (const meslek of tumMeslekler.slice(0, 20)) {
      ekle(`${BASE}/ulke/${ulke.slug}/meslek/${meslek}`, "0.65");
    }

    // Şehirler
    const sehirler = ULKE_SEHIR[ulke.slug] || [];
    for (const sehir of sehirler) {
      ekle(`${BASE}/ulke/${ulke.slug}/${sehir}`, "0.7");

      for (const s of TUM_SEKTORLER) {
        ekle(`${BASE}/ulke/${ulke.slug}/${sehir}/${s.id}`, "0.65", "weekly");
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
