import type { MetadataRoute } from 'next'

export const revalidate = 86400

const BASE_URL = 'https://swaphubs.com'
const D = new Date('2026-10-02')
const D_YENI = new Date('2026-10-30') // bu turda içeriği/başlığı değişen sayfalar

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

  // İlan ve bal sayfaları kaldırıldı: sitemap yalnızca terzi sitesini içerir.
  return [...staticPages]
}
