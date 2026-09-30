import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Pazaryeri (swaphubs.com) sistemine ait kapalı kalması gereken rotalar
  const commonDisallows = [
    '/api/',
    '/admin-ai/',
    '/bal/',
    '/ilan-ver/',
    '/panel/',
    '/profil/',
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
        disallow: commonDisallows,
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
    // Sitemap doğru domaine ayarlandı
    sitemap: 'https://swaphubs.com/sitemap.xml',
    // DÜZELTME: host parametresi Googlebot uyarısına neden olduğu için KALDIRILDI.
  }
}
