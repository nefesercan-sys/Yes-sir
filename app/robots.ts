import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── GENEL BOTLAR ──
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/admin', '/panel', '/api/'],
      },
      // ── GOOGLE BOT (VIP Misafir) ──
      {
        userAgent: 'Googlebot',
        allow:     '/',
        disallow:  ['/admin', '/panel'],
      },
      // ── PARAZİT BOTLARI ENGELLE (Sunucu Kalkanı) ──
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'DotBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://swaphubs.com/sitemap.xml',
  };
}
