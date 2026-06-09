import { MetadataRoute } from 'next'
import clientPromise from '@/lib/mongodb'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BASE_URL = 'https://swaphubs.com'
const SLUG_REGEX = /^[0-9a-f]+$/i

async function getDb() {
  const client = await clientPromise
  return client.db('swaphubs_db')
}

async function getIlanlar() {
  try {
    const db = await getDb()
    const result = await db
      .collection('ilanlar')
      .find(
        { durum: 'aktif', slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      )
      .toArray()
    return result
  } catch (e) {
    console.error('[sitemap] ilan hatası:', e)
    return []
  }
}

async function getSektorler() {
  try {
    const db = await getDb()
    const result = await db
      .collection('sektorler')
      .find({}, { projection: { slug: 1, updatedAt: 1, _id: 0 } })
      .toArray()
    return result
  } catch (e) {
    console.error('[sitemap] sektor hatası:', e)
    return []
  }
}

async function getSehirler() {
  try {
    const db = await getDb()
    const result = await db
      .collection('sehirler')
      .find({}, { projection: { slug: 1, updatedAt: 1, _id: 0 } })
      .toArray()
    return result
  } catch (e) {
    console.error('[sitemap] sehir hatası:', e)
    return []
  }
}

async function getBlogYazilari() {
  try {
    const db = await getDb()
    const result = await db
      .collection('blog')
      .find(
        { durum: 'yayinda', slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      )
      .toArray()
    return result
  } catch (e) {
    console.error('[sitemap] blog hatası:', e)
    return []
  }
}

async function getUrunler() {
  try {
    const db = await getDb()
    const result = await db
      .collection('urunler')
      .find(
        { durum: 'aktif', slug: { $exists: true, $nin: [null, ''] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      )
      .toArray()
    return result
  } catch (e) {
    console.error('[sitemap] urun hatası:', e)
    return []
  }
}

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
    { url: BASE_URL,                        lastModified: new Date('2026-06-05'), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/ilanlar`,           lastModified: new Date('2026-06-05'), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/kesfet`,            lastModified: new Date('2026-06-05'), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/ilan`,              lastModified: new Date('2026-06-05'), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/uye-ol`,            lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/giris`,             lastModified: new Date('2026-01-01'), changeFrequency: 'monthly', priority: 0.4 },

    { url: `${BASE_URL}/online-terzi-hizmeti`,                      lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/online-terzi-hizmeti/client`,               lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/online-terzi-hizmeti/abiye-dikim`,          lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/online-terzi-hizmeti/gelinlik-dikim`,       lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/online-terzi-hizmeti/takim-elbise-dikim`,   lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/online-terzi-hizmeti/uniforma-dikim`,       lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/online-terzi-hizmeti/spor-giyim-dikim`,     lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/online-terzi-hizmeti/gece-davet-kiyafeti`,  lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/online-terzi-hizmeti/muslin-keten-kiyafet`, lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/online-terzi-hizmeti/gunluk-kiyafet-dikim`, lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/online-terzi-hizmeti/olcu-rehberi`,         lastModified: new Date('2026-06-05'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/online-terzi-hizmeti/kurumsal`,             lastModified: new Date('2026-06-05'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/online-terzi-hizmeti/sss`,                  lastModified: new Date('2026-06-05'), changeFrequency: 'monthly', priority: 0.7 },

    { url: `${BASE_URL}/terzi`,                                                 lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/tekstil-antalya`,                                       lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/online-tailor-service`,                                 lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/online-terzi-servisi`,                                  lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/dogal-keten-pamuk-giyim`,                               lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat`, lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/terzi/istanbul`,                                        lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/terzi/ankara`,                                          lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/terzi/izmir`,                                           lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/terzi/antalya`,                                         lastModified: new Date('2026-06-05'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/terzi/bursa`,                                           lastModified: new Date('2026-06-05'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/terzi/adana`,                                           lastModified: new Date('2026-06-05'), changeFrequency: 'monthly', priority: 0.75 },

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
  ]

  const staticBlogPages: MetadataRoute.Sitemap = staticBlogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date('2026-06-05'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const ilanlar = await getIlanlar()
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
  const sektorUrls: MetadataRoute.Sitemap = sektorler
    .filter((s: any) => s.slug && SLUG_REGEX.test(s.slug))
    .map((s: any) => ({
      url: `${BASE_URL}/sektor/${s.slug}`,
      lastModified: toDate(s.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))

  const sehirler = await getSehirler()
  const sehirUrls: MetadataRoute.Sitemap = sehirler
    .filter((s: any) => s.slug && SLUG_REGEX.test(s.slug))
    .map((s: any) => ({
      url: `${BASE_URL}/sehir/${s.slug}`,
      lastModified: toDate(s.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

  const blogYazilari = await getBlogYazilari()
  const dynamicBlogUrls: MetadataRoute.Sitemap = blogYazilari
    .filter((b: any) => b.slug)
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
  const urunUrls: MetadataRoute.Sitemap = urunler
    .filter((u: any) => u.slug)
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
