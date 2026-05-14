import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const MONGODB_URI = process.env.MONGODB_URI!
const BASE_URL = 'https://www.swaphubs.com'
const UUID_REGEX = /^[0-9a-f]{24}$/i

let client: MongoClient
let clientPromise: Promise<MongoClient>

async function getMongoClient() {
  if (!client) {
    client = new MongoClient(MONGODB_URI)
    clientPromise = client.connect()
  }
  return clientPromise
}

async function getData() {
  const mongoClient = await getMongoClient()
  const db = mongoClient.db('swaphubs_db')

  const [ilanlar, sektorler, sehirler] = await Promise.all([
    db.collection('ilanlar')
      .find(
        { durum: 'aktif', slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      ).toArray(),
    db.collection('sektorler')
      .find(
        { slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, _id: 0 } }
      ).toArray(),
    db.collection('sehirler')
      .find(
        { slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, _id: 0 } }
      ).toArray(),
  ])

  console.log('[sitemap/route] ilanlar:', ilanlar.length, 'sektorler:', sektorler.length, 'sehirler:', sehirler.length)
  return { ilanlar, sektorler, sehirler }
}

function toDate(val: any): string {
  try {
    const d = new Date(val)
    if (!isNaN(d.getTime())) return d.toISOString()
  } catch {}
  return '2026-01-01T00:00:00.000Z'
}

export async function GET() {
  try {
    const { ilanlar, sektorler, sehirler } = await getData()

    const staticUrls = [
      { url: BASE_URL, lastmod: '2026-05-14', changefreq: 'daily', priority: '1.0' },
      { url: `${BASE_URL}/kesfet`, lastmod: '2026-05-14', changefreq: 'daily', priority: '0.9' },
      { url: `${BASE_URL}/ilan`, lastmod: '2026-05-14', changefreq: 'daily', priority: '0.9' },
      { url: `${BASE_URL}/uye-ol`, lastmod: '2026-01-01', changefreq: 'monthly', priority: '0.5' },
      { url: `${BASE_URL}/giris`, lastmod: '2026-01-01', changefreq: 'monthly', priority: '0.4' },
    ]

    const ilanUrls = ilanlar
      .filter((i: any) => i.slug && !UUID_REGEX.test(i.slug))
      .map((i: any) => ({
        url: `${BASE_URL}/ilan/${i.slug}`,
        lastmod: toDate(i.updatedAt || i.createdAt),
        changefreq: 'weekly',
        priority: '0.8',
      }))

    const sektorUrls = sektorler
      .filter((s: any) => s.slug && !UUID_REGEX.test(s.slug))
      .map((s: any) => ({
        url: `${BASE_URL}/sektor/${s.slug}`,
        lastmod: toDate(s.updatedAt),
        changefreq: 'weekly',
        priority: '0.7',
      }))

    const sehirUrls = sehirler
      .filter((s: any) => s.slug)
      .map((s: any) => ({
        url: `${BASE_URL}/konum/${s.slug}`,
        lastmod: toDate(s.updatedAt),
        changefreq: 'weekly',
        priority: '0.6',
      }))

    const allUrls = [...staticUrls, ...ilanUrls, ...sektorUrls, ...sehirUrls]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
      },
    })
  } catch (error) {
    console.error('[sitemap/route] Hata:', error)
    return new NextResponse('Sitemap hatası', { status: 500 })
  }
}
