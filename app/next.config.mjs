/** @type {import('next').NextConfig} */
const nextConfig = {

  poweredByHeader: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'www.swaphubs.com' },
      { protocol: 'https', hostname: 'swaphubs.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },
      { protocol: 'https', hostname: '**' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.swaphubs.com' }],
        destination: 'https://swaphubs.com/:path*',
        permanent: true,
      },
      {
        source: '/terzi/gekinlik-tadilati',
        destination: '/terzi/gelinlik-tadilati',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=()' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      { source: '/giris',           headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/uye-ol',          headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/admin/:path*',    headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/admin-ai/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/ilan-ver/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
      { source: '/ilan-duzenle/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/online-terzi-hizmeti/client', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      {
        source: '/terzi',
        headers: [
          { key: 'Content-Language', value: 'tr, en, de, ru' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/terzi/:path*',
        headers: [
          { key: 'Content-Language', value: 'tr, en, ru, de' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/online-terzi-hizmeti',
        headers: [
          { key: 'Content-Language', value: 'tr, en, de, ru, ar' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/online-terzi-hizmeti/:path*',
        headers: [
          { key: 'Content-Language', value: 'tr, en' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/tekstil-antalya',
        headers: [
          { key: 'Content-Language', value: 'tr, en' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/online-tailor-service',
        headers: [
          { key: 'Content-Language', value: 'en, tr' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat',
        headers: [
          { key: 'Content-Language', value: 'tr, en, ru' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/arimbalim',
        headers: [
          { key: 'Content-Language', value: 'tr' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/pamuknest/:path*',
        headers: [
          { key: 'Content-Language', value: 'tr, en' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
    ]
  },
}

export default nextConfig
