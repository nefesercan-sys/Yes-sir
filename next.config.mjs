// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {

  // ─── TEMEL ────────────────────────────────────────────────────────────────
  // "X-Powered-By: Next.js" header'ını kaldır — güvenlik + temizlik
  poweredByHeader: false,

  // Üretim build'de console.log'ları temizle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // ─── IMAGES ───────────────────────────────────────────────────────────────
  images: {
    // unoptimized: true KALDIRILDI — next/image optimizasyonu aktif
    // Bu LCP'yi ~30–50% iyileştirir, Vercel'de otomatik WebP/AVIF dönüşümü yapar
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

  // ─── REDIRECTS ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'swaphubs.com' }],
        destination: 'https://www.swaphubs.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://www.swaphubs.com/:path*',
        permanent: true,
      },
    ];
  },

  // ─── HEADERS ──────────────────────────────────────────────────────────────
  async headers() {
    return [

      // Tüm sayfalar — güvenlik + SEO
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
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com https://res.cloudinary.com https://maps.googleapis.com https://maps.gstatic.com https://www.swaphubs.com",
              "frame-src 'self' https://www.google.com https://maps.google.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://wa.me https://api.whatsapp.com wss:",
              "media-src 'self'",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },

      // Sitemap cache
      {
        source: '/(sitemap.*).xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=43200' },
          { key: 'Content-Type', value: 'application/xml; charset=utf-8' },
        ],
      },

      // robots.txt
      {
        source: '/robots.txt',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        ],
      },

      // Statik dosyalar — 1 yıl cache
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },

      // OG görselleri — 1 hafta cache
      {
        source: '/og/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },

      // Favicon + ikonlar
      {
        source: '/(favicon.ico|icon.*|apple-icon.*|manifest.json)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },

      // API routes — no cache, noindex
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },

      // Terzilik sayfaları — SEO header
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
      {
        source: '/antalya-bay-tailor-online-terzi-utu-hizmeti',
        headers: [
          { key: 'Content-Language', value: 'tr, en' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat',
        headers: [
          { key: 'Content-Language', value: 'tr' },
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
    ];
  },
};

export default nextConfig;
