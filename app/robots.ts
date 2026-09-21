import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Ortak disallow listesi (Parametreler ve hassas yollar)
  const commonDisallows = [
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
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: commonDisallows,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: commonDisallows, // Googlebot genel kuralları ezdiği için ortak liste eklendi
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://swaphubs.com/sitemap.xml',
    host: 'https://swaphubs.com',
  }
}
