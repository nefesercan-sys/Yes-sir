import { NextResponse } from 'next/server';
import { GLANGS, gAbs, gLanguages } from '@/lib/guzellik';

export const revalidate = 86400;

// Can Beauty Studio sitemap'i: terzi sitemap'lerinden ayrıdır. lastmod: sayfaların ilk yayın tarihi (sahte güncelleme sinyali yok).
const LASTMOD = '2026-11-08';

export async function GET() {
  const alt = gLanguages();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${GLANGS.map((l) => `  <url>
    <loc>${gAbs(l)}</loc>
${Object.entries(alt).map(([h, u]) => `    <xhtml:link rel="alternate" hreflang="${h}" href="${u}"/>`).join('\n')}
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${l === 'tr' ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200' },
  });
}
