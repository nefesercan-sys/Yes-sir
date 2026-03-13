import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/panel', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/panel'],
      },
    ],
    sitemap: 'https://swaphubs.com/sitemap.xml',
    host:    'https://swaphubs.com',
  };
}
