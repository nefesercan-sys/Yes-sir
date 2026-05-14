// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // UUID pattern'i olan ilan URL'lerini yakala
      // Bunları DB'den slug'a çevirmeniz gerekir
      // Geçici olarak ana sayfaya yönlendir
      {
        source: '/ilan/:uuid(^[0-9a-f]{24}$)',
        destination: '/ilan',
        permanent: true, // 301 redirect
      },
    ]
  },
  
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200',
          },
        ],
      },
    ]
  },
}

export default nextConfig
