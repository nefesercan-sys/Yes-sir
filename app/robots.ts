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
    // DÜZELTME: Tüm parçalı sitemap'ler silindi. 
    // Sadece Next.js'in ana sitemap.ts'sinden üretilen tek ve merkezi dosya bırakıldı.
    sitemap: 'https://swaphubs.com/sitemap.xml',
    host: 'https://swaphubs.com',
  }
}
