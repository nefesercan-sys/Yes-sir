import { NextResponse } from "next/server";
import { SEHIR_ILCE } from "@/lib/swaphubs-seo";
import { TUM_SEKTORLER, ISLEM_TIPLERI, MESLEKLER } from "@/lib/sektorler";

const BASE = "https://swaphubs.com";
export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];

  const ekle = (loc: string, priority: string) =>
    urls.push(`  <url><loc>${loc}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>${priority}</priority></url>`);

  const tumMeslekler = Object.values(MESLEKLER).flat();

  for (const sehir of Object.keys(SEHIR_ILCE)) {
    // Şehir ana
    ekle(`${BASE}/turkiye/${sehir}`, "0.8");

    // Şehir × Sektör
    for (const s of TUM_SEKTORLER) {
      ekle(`${BASE}/turkiye/${sehir}/${s.id}`, "0.75");

      // Şehir × Sektör × İşlem
      for (const i of ISLEM_TIPLERI) {
        ekle(`${BASE}/turkiye/${sehir}/${s.id}/${i.slug}`, "0.7");
      }
    }

    // Şehir × Meslek (top 30)
    for (const meslek of tumMeslekler.slice(0, 30)) {
      ekle(`${BASE}/turkiye/${sehir}/meslek/${meslek}`, "0.7");
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
