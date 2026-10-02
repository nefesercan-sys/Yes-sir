import type { MetadataRoute } from 'next'
import { getDb } from '@/lib/mongodb'

export const revalidate = 86400

const BASE_URL = 'https://swaphubs.com'
const SLUG_REGEX = /^[a-z0-9-]+$/i
const D = new Date('2026-10-02')

async function getIlanlar() {
  try {
    const db = await getDb()
    return await db
      .collection('ilanlar')
      .find(
        { durum: 'aktif', slug: { $exists: true,$nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      )
      .toArray()
  } catch (e) {
    console.error('[sitemap] ilan hatası:', e)
    return []
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toDate(val: any, fallback = '2026-09-20'): Date {
  if (!val) return new Date(fallback)
  const d = new Date(val)
  return isNaN(d.getTime()) ? new Date(fallback) : d
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 🔽 TERZİ DIŞI GENEL SAYFALAR (Arka Plan - Düşük Öncelik)
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                 lastModified: D, changeFrequency: 'weekly',  priority: 0.40 },
    { url: `${BASE_URL}/ilanlar`,    lastModified: D, changeFrequency: 'monthly', priority: 0.20 },
    { url: `${BASE_URL}/kesfet`,     lastModified: D, changeFrequency: 'monthly', priority: 0.20 },
    { url: `${BASE_URL}/ilan`,       lastModified: D, changeFrequency: 'monthly', priority: 0.20 },
    { url: `${BASE_URL}/bal`,        lastModified: D, changeFrequency: 'monthly', priority: 0.10 },
  ]

  const ilanlar = await getIlanlar()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ilanUrls: MetadataRoute.Sitemap = ilanlar
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((i: any) => i.slug && SLUG_REGEX.test(i.slug))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((i: any) => ({
      url: `${BASE_URL}/ilan/${i.slug}`,
      lastModified: toDate(i.updatedAt ?? i.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.10,
    }))

  return [...staticPages, ...ilanUrls]
}
