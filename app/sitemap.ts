import { MetadataRoute } from 'next'
import { MongoClient } from 'mongodb'

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

async function getIlanlar() {
  const mongoClient = await getMongoClient()
  const db = mongoClient.db()

  return db
    .collection('ilanlar')
    .find(
      {
        durum: 'aktif',
        slug: { $exists: true, $nin: [null, ''] },
      },
      {
        projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 },
      }
    )
    .toArray()
}

async function getSektorler() {
  const mongoClient = await getMongoClient()
  const db = mongoClient.db()

  return db
    .collection('sektorler')
    .find(
      { slug: { $exists: true, $nin: [null, ''] } },
      { projection: { slug: 1, updatedAt: 1, _id: 0 } }
    )
    .toArray()
}

async function getSehirler() {
  const mongoClient = await getMongoClient()
  const db = mongoClient.db()

  return db
    .collection('sehirler')
    .find(
      { slug: { $exists: true, $nin: [null, ''] } },
      { projection: { slug: 1, updatedAt: 1, _id: 0 } }
    )
    .toArray()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. STATİK SAYFALAR
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-05-14'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/kesfet`,
      lastModified: new Date('2026-05-14'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ilan`,
      lastModified: new Date('2026-05-14'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/uye-ol`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/giris`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]

  // 2. İLAN SAYFALARI
  let ilanUrls: MetadataRoute.Sitemap = []
  try {
    const ilanlar = await getIlanlar()

    ilanUrls = ilanlar
      .filter((ilan: any) => ilan.slug && !UUID_REGEX.test(ilan.slug))
      .map((ilan: any) => {
        const lastMod = ilan.updatedAt
          ? new Date(ilan.updatedAt)
          : ilan.createdAt
          ? new Date(ilan.createdAt)
          : new Date('2026-01-01')

        const validDate = isNaN(lastMod.getTime())
          ? new Date('2026-01-01')
          : lastMod

        const isRecent =
          Date.now() - validDate.getTime() < 30 * 24 * 60 * 60 * 1000

        return {
          url: `${BASE_URL}/ilan/${ilan.slug}`,
          lastModified: validDate,
          changeFrequency: (isRecent ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
          priority: 0.8,
        }
      })
  } catch (error) {
    console.error('İlan sitemap hatası:', error)
  }

  // 3. SEKTÖR SAYFALARI
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
  } catch (error) {
    console.error('Sektör sitemap hatası:', error)
  }

  // 4. ŞEHİR SAYFALARI
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
  } catch (error) {
    console.error('Şehir sitemap hatası:', error)
  }

  return [...staticPages, ...ilanUrls, ...sektorUrls, ...sehirUrls]
}
