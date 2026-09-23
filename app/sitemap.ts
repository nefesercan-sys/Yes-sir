import type { MetadataRoute } from 'next'
import { getDb } from '@/lib/mongodb'
import { ANTALYA_ILCELERI, KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BASE_URL = 'https://swaphubs.com'
const SLUG_REGEX = /^[a-z0-9-]+$/i

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
function toDate(val: any, fallback = '2026-01-01'): Date {
  if (!val) return new Date(fallback)
  const d = new Date(val)
  return isNaN(d.getTime()) ? new Date(fallback) : d
}

function isRecent(date: Date, days = 30): boolean {
  return Date.now() - date.getTime() < days * 24 * 60 * 60 * 1000
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    // 🌟 1. ANA VİTRİN SAYFALARI (ZİRVE ÖNCELİK: 1.0)
    // Sadece sitenin ve terzi bölümünün ana sayfaları en yüksek puanda
    { url: BASE_URL,                                                      lastModified: new Date('2026-09-20'), changeFrequency: 'daily',  priority: 1.0 },
    { url: `${BASE_URL}/terzi`,                                           lastModified: new Date('2026-09-20'), changeFrequency: 'daily',  priority: 1.0 },

    // ✂️ 2. ANA HİZMETLER VE ÇOK DİLLİ ROTLAR (YÜKSEK ÖNCELİK: 0.90)
    { url: `${BASE_URL}/terzi/paca-kisaltma-antalya`,                     lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/terzi/bay-terzi-antalya`,                         lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/terzi/bayan-terzi-antalya`,                       lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/terzi/eve-gelen-terzi-antalya`,                   lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/ru/atelie-antalya-online`,                        lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/ru/atelie-antalya`,                               lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/en/hotel-tailor-antalya`,                         lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya`,                     lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/de/schneider-service-hotel-antalya`,              lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },

    // 📍 3. YEREL SEO LOKASYONLARI (KONYAALTI, İLÇELER VE OTELLER: 0.80 - 0.85)
    ...KONYAALTI_MAHALLELERI.map(m => ({
      url: `${BASE_URL}/terzi/konyaalti/${m.slug}`,
      lastModified: new Date('2026-09-20'),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...ANTALYA_ILCELERI.map(i => ({
      url: `${BASE_URL}/terzi/antalya/${i.slug}`,
      lastModified: new Date('2026-09-20'),
      changeFrequency: 'weekly' as const,
      priority: 0.80,
    })),
    ...['belek', 'lara', 'guzeloba', 'side'].flatMap((slug) => [
      { url: `${BASE_URL}/en/hotel-tailor-antalya/${slug}`,             lastModified: new Date('2026-09-20'), changeFrequency: 'weekly' as const, priority: 0.80 },
      { url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya/${slug}`,         lastModified: new Date('2026-09-20'), changeFrequency: 'weekly' as const, priority: 0.80 },
      { url: `${BASE_URL}/de/schneider-service-hotel-antalya/${slug}`, lastModified: new Date('2026-09-20'), changeFrequency: 'weekly' as const, priority: 0.80 },
    ]),
    
    // 👕 4. DİĞER KUMAŞ VE ATÖLYE SAYFALARI (0.75)
    { url: `${BASE_URL}/dikis-atolyesi-antalya`,                          lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE_URL}/terzi/uniforma-uretimi-antalya`,                  lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE_URL}/terzi/kuru-temizleme-antalya`,                    lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE_URL}/tekstil-antalya`,                                 lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/dogal-keten-pamuk-giyim`,                         lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.75 },

    // 📉 5. İŞLEM & PANEL SAYFALARI (DÜŞÜK ÖNCELİK: 0.50 - Google botları form sayfalarında zaman kaybetmesin)
    { url: `${BASE_URL}/terzi-panel`,                                     lastModified: new Date('2026-09-20'), changeFrequency: 'monthly',  priority: 0.50 },
    { url: `${BASE_URL}/terzi-cagir`,                                     lastModified: new Date('2026-09-20'), changeFrequency: 'monthly',  priority: 0.50 },
    { url: `${BASE_URL}/terzi-talep`,                                     lastModified: new Date('2026-09-20'), changeFrequency: 'monthly',  priority: 0.50 },
    { url: `${BASE_URL}/online-terzi-hizmeti`,                            lastModified: new Date('2026-09-20'), changeFrequency: 'monthly',  priority: 0.50 },
    { url: `${BASE_URL}/online-tailor-service`,                           lastModified: new Date('2026-09-20'), changeFrequency: 'monthly',  priority: 0.50 },

    // 🔽 6. SWAPHUBS GENEL İLAN / DİĞER (EN DÜŞÜK ÖNCELİK: 0.20 - 0.30)
    { url: `${BASE_URL}/ilanlar`,                                        lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.30 },
    { url: `${BASE_URL}/kesfet`,                                          lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.30 },
    { url: `${BASE_URL}/ilan`,                                            lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.30 },
    { url: `${BASE_URL}/bal`,                                             lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.20 },
  ]

  const ilanlar = await getIlanlar()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ilanUrls: MetadataRoute.Sitemap = ilanlar
    .filter((i: any) => i.slug && SLUG_REGEX.test(i.slug))
    .map((i: any) => {
      const lastMod = toDate(i.updatedAt ?? i.createdAt)
      return {
        url: `${BASE_URL}/ilan/${i.slug}`,
        lastModified: lastMod,
        changeFrequency: 'monthly',
        priority: 0.20,
      }
    })

  return [
    ...staticPages,
    ...ilanUrls,
  ]
}
