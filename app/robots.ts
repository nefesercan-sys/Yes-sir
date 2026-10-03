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
    '/otel-profil',
    '/kayit',
    '/sifre-sifirla',
    '/sifremi-unuttum',
    '/ilan-detay',
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
        // Arama motorları ve AI asistan botları: herkese açık sayfalar açık
        userAgent: [
          'Google-Extended',
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-SearchBot',
          'Applebot-Extended',
          'Bingbot',
          'YandexBot',
          'Amazonbot',
          'meta-externalagent',
          'DuckAssistBot',
        ],
        allow: '/',
        disallow: commonDisallows,
      },
    ],
    sitemap: [
      'https://swaphubs.com/sitemap.xml',
      'https://swaphubs.com/sitemap-terzi.xml',
    ],
    host: 'https://swaphubs.com',
  }
}
