// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/ilan/:uuid([0-9a-f]{24})',
        destination: '/ilan',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(sitemap.*)\\.xml',
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
