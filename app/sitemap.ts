import { MetadataRoute } from 'next'
import clientPromise from '@/lib/mongodb'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BASE_URL = 'https://www.swaphubs.com'
const UUID_REGEX = /^[0-9a-f]{24}$/i

async function getDb() {
  const client = await clientPromise
  return client.db('hizmetara')
}

async function getIlanlar() {
  const db = await getDb()
  const result = await db
    .collection('ilanlar')
    .find(
      { durum: 'aktif', slug: { $exists: true, $nin: [null, ''] } },
      { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
    )
    .toArray()
  console.log('[sitemap] ilanlar:', result.length)
  return result
}

async function getSektorler() {
  const db = await getDb()
  const result = await db
    .collection('sektorler')
    .find(
      { slug: { $exists: true, $nin: [null, ''] } },
      { projection: { slug: 1, updatedAt: 1, _id: 0 } }
    )
    .toArray()
  console.log('[sitemap] sektorler:', result.length)
  return result
}

async function getSehirler() {
  const db = await getDb()
  const result = await db
    .collection('sehirler')
    .find(
      { slug: { $exists: true, $nin: [null, ''] } },
      { projection: { slug: 1, updatedAt: 1, _id: 0 } }
    )
    .toArray()
  console.log('[sitemap] sehirler:', result.length)
  return result
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date('2026-05-14'), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/kesfet`, lastModified: new Date('2026-05-14'), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/ilan`, lastModified: new Date('2026-05-14'), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/uye-ol`, lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/giris`, lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.4 },
  ]

  let ilanUrls: MetadataRoute.Sitemap = []
  try {
    const ilanlar = await getIlanlar()
    ilanUrls = ilanlar
      .filter((i: any) => i.slug && !UUID_REGEX.test(i.slug))
      .map((i: any) => {
        const lastMod = i.updatedAt ? new Date(i.updatedAt) : i.createdAt ? new Date(i.createdAt) : new Date('2026-01-01')
        const validDate = isNaN(lastMod.getTime()) ? new Date('2026-01-01') : lastMod
        const isRecent = Date.now() - validDate.getTime() < 30 * 24 * 60 * 60 * 1000
        return {
          url: `${BASE_URL}/ilan/${i.slug}`,
          lastModified: validDate,
          changeFrequency: (isRecent ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
          priority: 0.8,
        }
      })
  } catch (e) { console.error('[sitemap] ilan hatası:', e) }

  let sektorUrls: MetadataRoute.Sitemap = []
  try {
    const sektorler = await getSektorler()
    sektorUrls = sektorler
      .filter((s: any) => s.slug && !UUID_REGEX.test(s.slug))
      .map((s: any) => ({
        url: `${BASE_URL}/sektor/${s.slug}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date('2026-01-01'),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
  } catch (e) { console.error('[sitemap] sektor hatası:', e) }

  let sehirUrls: MetadataRoute.Sitemap = []
  try {
    const sehirler = await getSehirler()
    sehirUrls = sehirler
      .filter((s: any) => s.slug)
      .map((s: any) => ({
        url: `${BASE_URL}/konum/${s.slug}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date('2026-01-01'),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
  } catch (e) { console.error('[sitemap] sehir hatası:', e) }

  console.log('[sitemap] toplam:', staticPages.length + ilanUrls.length + sektorUrls.length + sehirUrls.length)
  return [...staticPages, ...ilanUrls, ...sektorUrls, ...sehirUrls]
}
