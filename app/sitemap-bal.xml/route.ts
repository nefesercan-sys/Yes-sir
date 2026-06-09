import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const BASE = 'https://swaphubs.com';
export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await getDb();
  const urunler = await db
    .collection('bal_urunler')
    .find({ aktif: true }, { projection: { slug: 1, updatedAt: 1 } })
    .toArray();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE}/bal</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
${urunler.map(u => `  <url>
    <loc>${BASE}/bal/${u.slug}</loc>
    <lastmod>${new Date(u.updatedAt).toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
