import { MetadataRoute } from 'next'
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
    // ── TERZİ MASTER & ANA SAYFALARI (ZİRVE ÖNCELİK: 1.0) ──
    { url: `${BASE_URL}/terzi`,                                           lastModified: new Date('2026-09-20'), changeFrequency: 'daily',  priority: 1.0 },
    { url: `${BASE_URL}/online-terzi-hizmeti`,                            lastModified: new Date('2026-09-20'), changeFrequency: 'daily',  priority: 1.0 },
    { url: `${BASE_URL}/terzi-cagir`,                                     lastModified: new Date('2026-09-20'), changeFrequency: 'daily',  priority: 1.0 },
    { url: `${BASE_URL}/terzi-talep`,                                     lastModified: new Date('2026-09-20'), changeFrequency: 'daily',  priority: 1.0 },

    // ── TERZİ PANEL VE ALT HİZMET SAYFALARI (YÜKSEK ÖNCELİK: 0.95) ──
    { url: `${BASE_URL}/terzi-panel`,                                     lastModified: new Date('2026-09-20'), changeFrequency: 'daily',  priority: 0.95 },
    { url: `${BASE_URL}/terzi/paca-kisaltma-antalya`,                     lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/terzi/bay-terzi-antalya`,                         lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/terzi/bayan-terzi-antalya`,                       lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/terzi/eve-gelen-terzi-antalya`,                   lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/dikis-atolyesi-antalya`,                          lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/terzi/uniforma-uretimi-antalya`,                  lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/terzi/kuru-temizleme-antalya`,                    lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },

    // ── KONYAALTI MAHALLELERİ (HEDEF LOKAL TRAFİK: 0.95) ──
    ...KONYAALTI_MAHALLELERI.map(m => ({
      url: `${BASE_URL}/terzi/konyaalti/${m.slug}`,
      lastModified: new Date('2026-09-20'),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    })),

    // ── ANTALYA İLÇELERİ (LOKAL YEREL SEO: 0.90) ──
    ...ANTALYA_ILCELERI.map(i => ({
      url: `${BASE_URL}/terzi/antalya/${i.slug}`,
      lastModified: new Date('2026-09-20'),
      changeFrequency: 'weekly' as const,
      priority: 0.90,
    })),

    // ── ÇOK DİLLİ OTEL / TURİSTİK TERZİ SAYFALARI (0.90 - 0.95) ──
    { url: `${BASE_URL}/ru/atelie-antalya-online`,                        lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/ru/atelie-antalya`,                               lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/en/hotel-tailor-antalya`,                         lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya`,                     lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/de/schneider-service-hotel-antalya`,              lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/online-tailor-service`,                           lastModified: new Date('2026-09-20'), changeFrequency: 'weekly', priority: 0.90 },

    // ── OTEL BÖLGELERİ × ÇOK DİLLİ ROTALAR (0.90) ──
    ...['belek', 'lara', 'guzeloba', 'side'].flatMap((slug) => [
      { url: `${BASE_URL}/en/hotel-tailor-antalya/${slug}`,             lastModified: new Date('2026-09-20'), changeFrequency: 'weekly' as const, priority: 0.90 },
      { url: `${BASE_URL}/ru/vyezdnoy-portnoy-antalya/${slug}`,         lastModified: new Date('2026-09-20'), changeFrequency: 'weekly' as const, priority: 0.90 },
      { url: `${BASE_URL}/de/schneider-service-hotel-antalya/${slug}`, lastModified: new Date('2026-09-20'), changeFrequency: 'weekly' as const, priority: 0.90 },
    ]),

    // ── DİĞER TERZİLİK / KUMAŞ SAYFALARI (0.80) ──
    { url: `${BASE_URL}/tekstil-antalya`,                                lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE_URL}/dogal-keten-pamuk-giyim`,                        lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.80 },

    // ── DÜŞÜRÜLEN DİĞER SAYFALAR (TARAMA BÜTÇESİNİ TERZİYE AKTARMAK İÇİN) ──
    { url: BASE_URL,                                                      lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.40 },
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
