import { MetadataRoute } from 'next'

// Bu fonksiyonu kendi DB/API'nize göre uyarlayın
async function getIlanlar() {
  // Örnek: MongoDB, Prisma, veya API çağrısı
  // return await db.ilan.findMany({ select: { slug: true, updatedAt: true } })
  return []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.swaphubs.com'
  
  const ilanlar = await getIlanlar()

  // Sadece slug'ı olan ilanları dahil et (UUID'lileri hariç tut)
  const uuidRegex = /^[0-9a-f]{24}$/i
  
  const ilanUrls: MetadataRoute.Sitemap = ilanlar
    .filter((ilan: any) => ilan.slug && !uuidRegex.test(ilan.slug))
    .map((ilan: any) => ({
      url: `${baseUrl}/ilan/${ilan.slug}`,
      lastModified: ilan.updatedAt ? new Date(ilan.updatedAt) : new Date('2026-01-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kesfet`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ilan`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  return [...staticPages, ...ilanUrls]
}
