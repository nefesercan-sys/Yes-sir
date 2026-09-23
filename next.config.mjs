/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      // 1. WWW -> non-WWW Alan Adı Yönlendirmesi
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.swaphubs.com' }],
        destination: 'https://swaphubs.com/:path*',
        permanent: true,
      },

      // 2. Cannibalization (İçerik Çakışması) Engelleme — Tüm Eski Terzi URL'lerini /terzi'ye Bağlama
      { source: '/antalyada-terzi-dikim-tamirat-utu-hizmetleri', destination: '/terzi', permanent: true },
      { source: '/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti', destination: '/terzi', permanent: true },
      { source: '/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat', destination: '/terzi', permanent: true },
      { source: '/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat', destination: '/terzi', permanent: true },
      { source: '/antalya-terzi-elbise-dikimi', destination: '/terzi', permanent: true },
      { source: '/terzi/antalya/konyaalti', destination: '/terzi', permanent: true },

      // 3. Geçim/Tipografi Hataları ve Yan Sayfa Konsolidasyonları
      { source: '/terzi/gelinlik-tadilati', destination: '/terzi', permanent: true },
      { source: '/terzi/gekinlik-tadilati', destination: '/terzi', permanent: true },
      { source: '/terzi/gelinlik-tadilati-antalya', destination: '/terzi', permanent: true },
      { source: '/terzi/fermuar-degisimi', destination: '/terzi', permanent: true },
      { source: '/terzi/fermuar-degisimi-antalya', destination: '/terzi', permanent: true },
      { source: '/terzi/dikis-atolyesi-antalya', destination: '/terzi', permanent: true },
    ];
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
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=()' },
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
      { source: '/giris',            headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/uye-ol',           headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/admin(.*)',        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/admin-ai(.*)',     headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/ilan-ver(.*)',     headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
      { source: '/ilan-duzenle(.*)', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/online-terzi-hizmeti/client', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
};

export default nextConfig;
