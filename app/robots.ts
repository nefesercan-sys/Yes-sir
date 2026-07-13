import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 1. GENEL ARAMA MOTORLARI VE STANDART BOTLAR
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
        // 2. GOOGLE'IN KLASİK ARAMA BOTU
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
      {
        // 3. GEMINI VE GOOGLE YAPAY ZEKÂ MODELLERİ (AEO İÇİN KRİTİK)
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        // 4. CHATGPT VE OPENAI BOTLARI
        // ChatGPT'nin web araması yaparken siteni okuyabilmesi için
        userAgent: ['GPTBot', 'ChatGPT-User'],
        allow: '/',
      },
      {
        // 5. PERPLEXITY AI BOTU
        // Dünyanın en popüler AI arama motorunun siteni referans göstermesi için
        userAgent: 'PerplexityBot',
        allow: '/',
      },
    ],
    sitemap: [
      'https://swaphubs.com/sitemap.xml',
      'https://swaphubs.com/sitemap-terzi.xml',
      'https://swaphubs.com/sitemap-ilanlar.xml',
      'https://swaphubs.com/sitemap-sektorler.xml',
      'https://swaphubs.com/sitemap-meslekler.xml',
      // DÜZELTME: dosya adı "sitemap-balKontrol.xml" yanlıştı (gerçek dosya
      // sitemap-bal.xml) — bot bu adresi çekmeye çalışınca 404 alıyordu.
      'https://swaphubs.com/sitemap-bal.xml',
    ],
    host: 'https://swaphubs.com',
  }
}
