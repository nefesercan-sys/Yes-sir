import type { MetadataRoute } from 'next'
import { getDb } from '@/lib/mongodb'

export const revalidate = 86400

const BASE_URL = 'https://swaphubs.com'
const SLUG_REGEX = /^[a-z0-9-]+$/i
const D = new Date('2026-10-02')
const D_YENI = new Date('2026-10-30') // bu turda içeriği/başlığı değişen sayfalar

async function getBalUrunler() {
  try {
    const db = await getDb()
    return await db
      .collection('bal_urunler')
      .find({ aktif: true, slug: { $exists: true, $nin: [null, ''] } }, { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } })
      .toArray()
  } catch (e) {
    console.error('[sitemap] bal hatası:', e)
    return []
  }
}

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
    { url: BASE_URL,                 lastModified: D_YENI, changeFrequency: 'weekly',  priority: 0.40 },
  ]

  // İlan (pazar) sayfaları gizlendi: sitemap'e girmez (next.config.mjs yönlendirmesi). Geri açmak için ILAN_ENABLED=true.
  const ILAN_ENABLED = false as boolean
  const ilanlar = ILAN_ENABLED ? await getIlanlar() : []
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

  // Bal sayfaları gizlendi (next.config.mjs geçici yönlendirme): sitemap'e girmez. Geri açmak için BAL_ENABLED=true yapın.
  const BAL_ENABLED = false as boolean
  const balUrunler = BAL_ENABLED ? await getBalUrunler() : []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const balUrls: MetadataRoute.Sitemap = balUrunler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((u: any) => u.slug && SLUG_REGEX.test(u.slug))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((u: any) => ({
      url: `${BASE_URL}/bal/${u.slug}`,
      lastModified: toDate(u.updatedAt ?? u.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.40,
    }))

  return [...staticPages, ...(BAL_ENABLED ? [{ url: `${BASE_URL}/bal`, lastModified: D_YENI, changeFrequency: 'monthly' as const, priority: 0.5 }] : []), ...balUrls, ...ilanUrls]
}
 
