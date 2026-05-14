import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/uye-ol',
          '/kayit',
          '/giris',
          '/*?*sort=',   // Sıralama parametrelerini engelle
          '/*?*page=',   // Sayfalama parametrelerini engelle (canonical kullan)
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: [
      'https://www.swaphubs.com/sitemap.xml',
      'https://www.swaphubs.com/sitemap-ilanlar.xml',
      'https://www.swaphubs.com/sitemap-sektorler.xml',
      'https://www.swaphubs.com/sitemap-turkiye-sehir.xml',
      'https://www.swaphubs.com/sitemap-turkiye-ilce.xml',
      'https://www.swaphubs.com/sitemap-meslekler.xml',
      'https://www.swaphubs.com/sitemap-dunya.xml',
      'https://www.swaphubs.com/sitemap-statik.xml',
    ],
  }
}
