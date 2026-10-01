import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Pazaryeri (swaphubs.com) sistemine ait kapalı kalması gereken rotalar
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
    // DÜZELTME (2026-09-24): '/bal/' tamamı değil, sadece görsel yükleme aracı
    // engellenmeli — aksi halde tüm bal ürün kataloğu aramadan gizleniyor.
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
