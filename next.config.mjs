// next.config.mjs
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
    return [];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=()',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/terzi',
        headers: [
          { key: 'Content-Language', value: 'tr, en, de, ru' },
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
    ];
  },
};

export default nextConfig;
