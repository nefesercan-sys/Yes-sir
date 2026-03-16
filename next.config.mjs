/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⚡ PERFORMANS: Dosya sıkıştırma ve hızlı derleme
  compress: true,
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    // 🖼️ HIZ: Görselleri modern formatlara çevirerek LCP süresini iyileştirir
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], 
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'swaphubs.com' },
    ],
  },

  // 🛡️ GÜVENLİK VE ÖNBELLEK YÖNETİMİ
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      {
        // 🚀 STATİK DOSYALAR: 1 yıl tarayıcı önbelleğinde tutarak hızı artırır
        source: '/(fonts|images|static)/([^/]*\\.)+(jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // 🔗 YÖNLENDİRMELER
  async redirects() {
    return [
      {
        source: '/www', 
        destination: 'https://swaphubs.com',
        permanent: true,
      },
    ];
  },

  // 🛠️ DERLEME VE HATA YÖNETİMİ
  compiler: {
    // Üretim ortamında logları temizleyerek JS boyutunu (TBT) düşürür
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Vercel build hatalarını önlemek için sıkı kontrol
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // 🤖 AI/DİNAMİK ROTALAR İÇİN ÖZEL AYAR (Opsiyonel)
  experimental: {
    // Server Actions ve optimizasyonlar
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
