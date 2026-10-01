import type { MetadataRoute } from 'next'
import { getDb } from '@/lib/mongodb'
import { ANTALYA_ILCELERI, KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar'

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
        { durum: 'aktif', slug: { $exists: true, $nin: [null, ''] } },
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
  const staticPages: MetadataRoute.Sitemap = [
    // 🌟 1. ÖNCELİKLİ SAYFA: Terzi Can (tek 1.0)
    { url: `${BASE_URL}/terzi`, lastModified: D, changeFrequency: 'daily', priority: 1.0 },

    // ✂️ 2. TERZİ HİZMET KÜMESİ (0.90)
    { url: `${BASE_URL}/online-terzi-hizmeti`,        lastModified: D, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/terzi/paca-kisaltma-antalya`, lastModified: D, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/terzi/bay-terzi-antalya`,     lastModified: D, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/terzi/bayan-terzi-antalya`,   lastModified: D, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/terzi/eve-gelen-terzi-antalya`, lastModified: D, changeFrequency: 'weekly', priority: 0.90 },

    // 🇬🇧 EN
    { url: `${BASE_URL}/online-tailor-service`,   lastModified: D, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/en/hotel-tailor-antalya`, lastModified: D, changeFrequency: 'weekly', priority: 0.90 },
    // 🇩🇪 DE
    { url: `${BASE_URL}/de/online-schneiderservice-antalya`, lastModified: D, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/de/schneider-service-hotel-antalya`,  lastModified: D, changeFrequency: 'weekly', priority: 0.90 },
    // 🇷🇺 RU
    { url: `${BASE_URL}/ru/atelie-antalya`,           lastModified: D, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya`, lastModified: D, changeFrequency: 'weekly', priority: 0.90 },

    // 📍 3. YEREL SEO (0.80 - 0.85)
    ...KONYAALTI_MAHALLELERI.map(m => ({
      url: `${BASE_URL}/terzi/konyaalti/${m.slug}`,
      lastModified: D,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...ANTALYA_ILCELERI.filter(i => i.slug !== 'konyaalti').map(i => ({
      url: `${BASE_URL}/terzi/antalya/${i.slug}`,
      lastModified: D,
      changeFrequency: 'weekly' as const,
      priority: 0.80,
    })),
    ...['belek', 'lara', 'guzeloba', 'side', 'kemer', 'kundu'].flatMap((slug) => [
      { url: `${BASE_URL}/en/hotel-tailor-antalya/${slug}`,            lastModified: D, changeFrequency: 'weekly' as const, priority: 0.80 },
      { url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya/${slug}`,        lastModified: D, changeFrequency: 'weekly' as const, priority: 0.80 },
      { url: `${BASE_URL}/de/schneider-service-hotel-antalya/${slug}`, lastModified: D, changeFrequency: 'weekly' as const, priority: 0.80 },
    ]),

    // 👕 4. ATÖLYE / KUMAŞ (0.75)
    { url: `${BASE_URL}/terzi/dikis-atolyesi-antalya`,   lastModified: D, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE_URL}/terzi/uniforma-uretimi-antalya`, lastModified: D, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE_URL}/terzi/kuru-temizleme-antalya`,   lastModified: D, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE_URL}/dogal-keten-pamuk-giyim`,        lastModified: D, changeFrequency: 'monthly', priority: 0.75 },

    // 📋 5. DÖNÜŞÜM (0.60)
    { url: `${BASE_URL}/terzi-cagir`, lastModified: D, changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE_URL}/terzi-talep`, lastModified: D, changeFrequency: 'monthly', priority: 0.60 },

    // 🔽 6. SWAPHUBS ANA SAYFA & GENEL (arka plan)
    { url: BASE_URL,                 lastModified: D, changeFrequency: 'weekly',  priority: 0.50 },
    { url: `${BASE_URL}/ilanlar`,    lastModified: D, changeFrequency: 'monthly', priority: 0.30 },
    { url: `${BASE_URL}/kesfet`,     lastModified: D, changeFrequency: 'monthly', priority: 0.30 },
    { url: `${BASE_URL}/ilan`,       lastModified: D, changeFrequency: 'monthly', priority: 0.30 },
    { url: `${BASE_URL}/bal`,        lastModified: D, changeFrequency: 'monthly', priority: 0.20 },
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
      priority: 0.20,
    }))

  return [...staticPages, ...ilanUrls]
}
