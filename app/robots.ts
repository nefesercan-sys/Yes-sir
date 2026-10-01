import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const commonDisallows = [
    '/admin/',
    '/admin-ai/',
    '/api/',
    '/panel/',
    '/terzi-panel/',
    '/terzi-admin/',
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
        // AI arama/asistan botları: aynı kısıtlarla tüm herkese açık sayfalar açık
        userAgent: [
          'Google-Extended',
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-SearchBot',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: commonDisallows,
      },
    ],
    sitemap: 'https://swaphubs.com/sitemap.xml',
    host: 'https://swaphubs.com',
  }
}
