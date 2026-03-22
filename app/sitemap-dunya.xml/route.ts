import { NextResponse } from "next/server";
import { ULKELER, ULKE_SEHIR } from "@/lib/ulkeler";
import { TUM_SEKTORLER, ISLEM_TIPLERI, MESLEKLER } from "@/lib/sektorler";

const BASE = "https://swaphubs.com";
export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];
  const tumMeslekler = Object.values(MESLEKLER).flat().slice(0, 20);

  for (const ulke of ULKELER) {
    urls.push(`  <url><loc>${BASE}/ulke/${ulke.slug}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`);

    for (const s of TUM_SEKTORLER) {
      urls.push(`  <url><loc>${BASE}/ulke/${ulke.slug}/${s.id}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>0.75</priority></url>`);
      for (const i of ISLEM_TIPLERI) {
        urls.push(`  <url><loc>${BASE}/ulke/${ulke.slug}/${s.id}/${i.slug}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`);
      }
    }

    for (const meslek of tumMeslekler) {
      urls.push(`  <url><loc>${BASE}/ulke/${ulke.slug}/meslek/${meslek}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.65</priority></url>`);
    }

    // Her ülkeden max 3 şehir
    const sehirler = (ULKE_SEHIR[ulke.slug] || []).slice(0, 3);
    for (const sehir of sehirler) {
      urls.push(`  <url><loc>${BASE}/ulke/${ulke.slug}/${sehir}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
      for (const s of TUM_SEKTORLER) {
        urls.push(`  <url><loc>${BASE}/ulke/${ulke.slug}/${sehir}/${s.id}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.65</priority></url>`);
      }
    }
  }

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`,
    { headers: { "Content-Type": "application/xml", "Cache-Control": "public, s-maxage=3600" } }
  );
}
