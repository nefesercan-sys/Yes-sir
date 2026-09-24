import type { MetadataRoute } from 'next'
import { getDb } from '@/lib/mongodb'
import { ANTALYA_ILCELERI, KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar'

// Performans için 24 saatlik önbellek (ISR) - Botlar veritabanını yormaz
export const revalidate = 86400 

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
function toDate(val: any, fallback = '2026-09-20'): Date {
  if (!val) return new Date(fallback)
  const d = new Date(val)
  return isNaN(d.getTime()) ? new Date(fallback) : d
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    // 🌟 1. ANA VİTRİN SAYFALARI (ZİRVE ÖNCELİK: 1.0)
    { url: BASE_URL,                                                      lastModified: new Date('2026-09-20'), changeFrequency: 'daily',  priority: 1.0 },
    { url: `${BASE_URL}/terzi`,                                           lastModified: new Date('2026-09-20'), changeFrequency: 'daily',  priority: 1.0 },

    // ✂️ 2. ANA HİZMETLER VE ÇOK DİLLİ ROTLAR (YÜKSEK ÖNCELİK: 0.90)
    { url: `${BASE_URL}/online-tailor-service`,                           lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/online-terzi-hizmeti`,                            lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
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
    // 💡 Kemer ve Kundu eklendi
    ...['belek', 'lara', 'guzeloba', 'side', 'kemer', 'kundu'].flatMap((slug) => [
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

    // 📋 5. DÖNÜŞÜM & MÜŞTERİ TALEBİ SAYFALARI (0.60)
    // terzi-panel sitemap'ten çıkarıldı.
    { url: `${BASE_URL}/terzi-cagir`,                                     lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE_URL}/terzi-talep`,                                     lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.60 },

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
