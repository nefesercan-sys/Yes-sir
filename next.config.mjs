/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⚡ PERFORMANS: Dosya sıkıştırma ve SWC minifier
  compress: true,
  swcMinify: true,
  poweredByHeader: false,

  images: {
    // 🖼️ HIZ: Görselleri otomatik olarak en hafif formatlara çevirir
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

  // 🛡️ GÜVENLİK VE ÖNBELLEK
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
        // 🚀 STATİK DOSYALAR (Resim, Font vb.): 1 yıl önbellekle
        source: '/static/(.*)|/images/(.*)|/_next/image(.*)',
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

  // 🛠️ DERLEME AYARLARI
  compiler: {
    // Üretim ortamında console.log'ları temizler (JS boyutunu düşürür)
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
