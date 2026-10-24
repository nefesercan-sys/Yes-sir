import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // NOT: Giriş/panel/kayıt gibi özel sayfalar burada ENGELLENMEZ; bu sayfalarda <meta robots noindex> var.
  // robots.txt ile engellenirse Google noindex'i göremez ve URL'yi içeriksiz dizine ekleyebilir.
  const commonDisallows = [
    '/admin/',
    '/admin-ai/',
    '/api/',
    '/profil/',
    '/bildirimler/',
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
      'https://swaphubs.com/sitemap-hesapla.xml',
      'https://swaphubs.com/sitemap-rehberi.xml',
    ],
  }
}
