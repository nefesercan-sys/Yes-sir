import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/panel', '/api/', '/otel-profil', '/giris', '/uye-ol'],
      },
    ],
    sitemap: 'https://hizmetara.com/sitemap.xml',
  };
}
