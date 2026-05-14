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
          '/giris',
          '/kayit',
          '/profil/',
          '/mesajlar/',
          '/bildirimler/',
          // URL parametrelerini engelle (crawl bütçesi koruması)
          '/*?*sort=',
          '/*?*order=',
          '/*?*ref=',
          '/*?*utm_',
          '/*?*session=',
        ],
      },
      {
        // Googlebot'a özel - daha geniş izin
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/uye-ol',
          '/giris',
          '/kayit',
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
