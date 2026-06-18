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
      // DİKKAT: '**' (Wildcard) kuralı güvenlik ve Vercel maliyetleri nedeniyle kaldırıldı.
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },

  async redirects() {
    return [
      // www → non-www 301 
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.swaphubs.com' }],
        destination: 'https://swaphubs.com/:path*',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      // Global güvenlik header'ları
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
      // Static cache (Performans)
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // API Endpoints: Asla cachelenmesin ve indexlenmesin
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      // Admin, Auth ve Yönetim sayfaları için toplu noindex kuralları
      // Not: regex (.*) kullanarak alt yolları da yakaladık
      {
        source: '/:path(giris|uye-ol|admin|admin-ai|ilan-ver|ilan-duzenle)(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' }
        ],
      },
      {
        source: '/online-terzi-hizmeti/client',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' }
        ],
      }
      // DİKKAT: /terzi ve türevi sayfaların "index, follow" header'ları silindi. 
      // Bunlar doğrudan kendi page.tsx dosyalarındaki 'metadata' API'si ile yönetilmelidir.
    ]
  },
}

export default nextConfig
