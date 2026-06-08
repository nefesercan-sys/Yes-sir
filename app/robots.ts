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
          '/panel/',
          '/profil/',
          '/mesajlar/',
          '/bildirimler/',
          '/*?*sort=',
          '/*?*order=',
          '/*?*ref=',
          '/*?*utm_',
          '/*?*session=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/panel/',
          '/profil/',
          '/mesajlar/',
        ],
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
    host: 'https://www.swaphubs.com',
  }
}
