import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin-ai/',
          '/api/',
          '/panel/',
          '/profil/',
          '/mesajlar/',
          '/bildirimler/',
          '/giris',
          '/uye-ol',
          '/ilan-ver',
          '/ilan-duzenle',
          '/online-terzi-hizmeti/client',
          '/bal/gorsel-yukle',
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
          '/admin-ai/',
          '/api/',
          '/panel/',
          '/profil/',
          '/mesajlar/',
          '/giris',
          '/uye-ol',
          '/ilan-ver',
          '/ilan-duzenle',
          '/online-terzi-hizmeti/client',
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
