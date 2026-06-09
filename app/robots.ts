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
      'https://swaphubs.com/sitemap.xml',
      'https://swaphubs.com/sitemap-terzi.xml',
      'https://swaphubs.com/sitemap-ilanlar.xml',
      'https://swaphubs.com/sitemap-sektorler.xml',
      'https://swaphubs.com/sitemap-meslekler.xml',
      'https://swaphubs.com/sitemap-bal.xml',
    ],
    host: 'https://swaphubs.com',
  }
}
