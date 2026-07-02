import { MetadataRoute } from 'next'
import clientPromise from '@/lib/mongodb'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BASE_URL = 'https://swaphubs.com'
// HATA DÜZELTİLDİ: Sadece hex karakterleri değil, tüm SEO dostu (harf, rakam ve tire) slug'ları kabul eder
const SLUG_REGEX = /^[a-z0-9-]+$/i

async function getDb() {
  const client = await clientPromise
  return client.db('swaphubs_db')
}

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

async function getSektorler() {
  try {
    const db = await getDb()
    return await db
      .collection('sektorler')
      .find({}, { projection: { slug: 1, updatedAt: 1, _id: 0 } })
      .toArray()
  } catch (e) {
    console.error('[sitemap] sektor hatası:', e)
    return []
  }
}

async function getSehirler() {
  try {
    const db = await getDb()
    return await db
      .collection('sehirler')
      .find({}, { projection: { slug: 1, updatedAt: 1, _id: 0 } })
      .toArray()
  } catch (e) {
    console.error('[sitemap] sehir hatası:', e)
    return []
  }
}

async function getBlogYazilari() {
  try {
    const db = await getDb()
    return await db
      .collection('blog')
      .find(
        { durum: 'yayinda', slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      )
      .toArray()
  } catch (e) {
    console.error('[sitemap] blog hatası:', e)
    return []
  }
}

async function getUrunler() {
  try {
    const db = await getDb()
    return await db
      .collection('urunler')
      .find(
        { durum: 'aktif', slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      )
      .toArray()
  } catch (e) {
    console.error('[sitemap] urun hatası:', e)
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
    // ── Ana sayfalar ──
    { url: BASE_URL,                  lastModified: new Date('2026-06-22'), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/ilanlar`,     lastModified: new Date('2026-06-22'), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/kesfet`,      lastModified: new Date('2026-06-22'), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/ilan`,        lastModified: new Date('2026-06-22'), changeFrequency: 'daily',   priority: 0.9 },

    // ── Online Terzi Hizmeti ──
    { url: `${BASE_URL}/online-terzi-hizmeti`,                      lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 1.0  },
    { url: `${BASE_URL}/online-terzi-hizmeti/abiye-dikim`,          lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/online-terzi-hizmeti/gelinlik-dikim`,       lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/online-terzi-hizmeti/takim-elbise-dikim`,   lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/online-terzi-hizmeti/uniforma-dikim`,       lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/online-terzi-hizmeti/spor-giyim-dikim`,     lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/online-terzi-hizmeti/gece-davet-kiyafeti`,  lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/online-terzi-hizmeti/muslin-keten-kiyafet`, lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/online-terzi-hizmeti/gunluk-kiyafet-dikim`, lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/online-terzi-hizmeti/olcu-rehberi`,         lastModified: new Date('2026-06-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/online-terzi-hizmeti/kurumsal`,             lastModified: new Date('2026-06-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/online-terzi-hizmeti/sss`,                  lastModified: new Date('2026-06-22'), changeFrequency: 'monthly', priority: 0.7 },

    // ── Terzi Ana Sayfa ──
    { url: `${BASE_URL}/terzi`, lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 1.0 },

    // ── Terzi Alt Hizmet Sayfaları ──
    { url: `${BASE_URL}/terzi/paca-kisaltma-antalya`,     lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/terzi/bay-terzi-antalya`,         lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/terzi/bayan-terzi-antalya`,       lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/terzi/dikis-atolyesi-antalya`,    lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/terzi/uniforma-uretimi-antalya`,  lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/terzi/kuru-temizleme-antalya`,    lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/terzi/eve-gelen-terzi-antalya`,   lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/terzi/fermuar-degisimi-antalya`,  lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/terzi/gelinlik-tadilati-antalya`, lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },

    // ── Terzi & Tekstil Diğer Sayfalar ──
    { url: `${BASE_URL}/tekstil-antalya`,                                        lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/online-tailor-service`,                                  lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/online-terzi-servisi`,                                   lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/dogal-keten-pamuk-giyim`,                                lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat`,  lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/antalya-terzi-elbise-dikimi`,                            lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat`,     lastModified: new Date('2026-07-01'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}antalyada-terzi-dikim-tamirat-utu-hizmetleri`,            lastModified: new Date('2026-07-01'), changeFrequency: 'weekly', priority: 0.95 },
    // ── Rusça Sayfalar ──
    { url: `${BASE_URL}/ru/atelie-antalya-online`,                               lastModified: new Date('2026-07-01'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/ru/atelie-antalya`,                                      lastModified: new Date('2026-07-01'), changeFrequency: 'weekly', priority: 0.9  }, // ✅ YENİ EKLENDİ

    // ── Bal & Arım Balım Sayfaları ──
    { url: `${BASE_URL}/bal`,       lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.9  },
    { url: `${BASE_URL}/arimbalim`, lastModified: new Date('2026-06-22'), changeFrequency: 'weekly', priority: 0.85 },

    // ── Statik sayfalar ──
    { url: `${BASE_URL}/files`,              lastModified: new Date('2026-05-16'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/hakkimizda`,         lastModified: new Date('2026-02-07'), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/iletisim`,           lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/gizlilik`,           lastModified: new Date('2026-01-01'), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE_URL}/kullanim-kosullari`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly',  priority: 0.2 },
  ]

  const staticBlogSlugs = [
    'evde-olcu-nasil-alinir',
    'abiye-modelleri-2026',
    'ozel-gelinlik-nasil-yaptirılir',
    'takim-elbise-olculeri-erkek-rehberi',
    'organik-muslin-kumas-nedir',
    'online-terzi-vs-hazir-giyim',
    'keten-kiyafet-bakimi-nasil-yapilir',
    'kurumsal-uniforma-tasarim-rehberi',
    'paca-kisaltma-fiyatlari-2026',
    'fermuar-degisimi-antalya-fiyat',
    'gelinlik-tadilati-antalya-rehberi',
    'antalya-otelleri-icin-terzi-rehberi',
    'bay-terzi-antalya-erkek-kiyafet-rehberi',
    'bayan-terzi-antalya-kadin-elbise-rehberi',
  ]

  const staticBlogPages: MetadataRoute.Sitemap = staticBlogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date('2026-06-22'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const ilanlar = await getIlanlar()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ilanUrls: MetadataRoute.Sitemap = ilanlar
    .filter((i: any) => i.slug && SLUG_REGEX.test(i.slug))
    .map((i: any) => {
      const lastMod = toDate(i.updatedAt ?? i.createdAt)
      return {
        url: `${BASE_URL}/ilan/${i.slug}`,
        lastModified: lastMod,
        changeFrequency: (isRecent(lastMod) ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
        priority: 0.8,
      }
    })

  const sektorler = await getSektorler()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sektorUrls: MetadataRoute.Sitemap = sektorler
    .filter((s: any) => s.slug && SLUG_REGEX.test(s.slug))
    .map((s: any) => ({
      url: `${BASE_URL}/sektor/${s.slug}`,
      lastModified: toDate(s.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))

  const sehirler = await getSehirler()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sehirUrls: MetadataRoute.Sitemap = sehirler
    .filter((s: any) => s.slug && SLUG_REGEX.test(s.slug))
    .map((s: any) => ({
      url: `${BASE_URL}/sehir/${s.slug}`,
      lastModified: toDate(s.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

  const blogYazilari = await getBlogYazilari()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dynamicBlogUrls: MetadataRoute.Sitemap = blogYazilari
    .filter((b: any) => b.slug && SLUG_REGEX.test(b.slug))
    .map((b: any) => {
      const lastMod = toDate(b.updatedAt ?? b.createdAt)
      return {
        url: `${BASE_URL}/blog/${b.slug}`,
        lastModified: lastMod,
        changeFrequency: (isRecent(lastMod) ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
        priority: 0.7,
      }
    })

  const blogUrls = dynamicBlogUrls.length > 0 ? dynamicBlogUrls : staticBlogPages

  const urunler = await getUrunler()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const urunUrls: MetadataRoute.Sitemap = urunler
    .filter((u: any) => u.slug && SLUG_REGEX.test(u.slug))
    .map((u: any) => {
      const lastMod = toDate(u.updatedAt ?? u.createdAt)
      return {
        url: `${BASE_URL}/urun/${u.slug}`,
        lastModified: lastMod,
        changeFrequency: (isRecent(lastMod) ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
        priority: 0.75,
      }
    })

  return [
    ...staticPages,
    ...blogUrls,
    ...ilanUrls,
    ...sektorUrls,
    ...sehirUrls,
    ...urunUrls,
  ]
}
