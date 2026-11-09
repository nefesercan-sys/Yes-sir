import { NextResponse } from 'next/server';
import { GLANGS, gAbs, gLanguages } from '@/lib/guzellik';
import { G_SUB_DST_IDS, G_SUB_LANGS, G_SUB_SVC_IDS, type GSubKind } from '@/lib/guzellik-slugs';
import { subAbs, subAlternates } from '@/lib/guzellik-sub';

export const revalidate = 86400;

// Can Beauty Studio sitemap'i: terzi sitemap'lerinden ayrıdır. lastmod: sayfaların ilk yayın tarihi (sahte güncelleme sinyali yok).
const LASTMOD = '2026-11-08';
const SUB_LASTMOD = '2026-11-09';

export async function GET() {
  const alt = gLanguages();
  const subs: GSubKind[] = [];
  for (const id of G_SUB_SVC_IDS) for (const lang of G_SUB_LANGS) subs.push({ kind: 'svc', id, lang });
  for (const id of G_SUB_DST_IDS) for (const lang of G_SUB_LANGS) subs.push({ kind: 'dst', id, lang });
  const subXml = subs.map((k) => `  <url>
    <loc>${subAbs(k)}</loc>
${Object.entries(subAlternates(k)).map(([h, u]) => `    <xhtml:link rel="alternate" hreflang="${h}" href="${u}"/>`).join('\n')}
    <lastmod>${SUB_LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${GLANGS.map((l) => `  <url>
    <loc>${gAbs(l)}</loc>
${Object.entries(alt).map(([h, u]) => `    <xhtml:link rel="alternate" hreflang="${h}" href="${u}"/>`).join('\n')}
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${l === 'tr' ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
${subXml}
</urlset>`;
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200' },
  });
}
