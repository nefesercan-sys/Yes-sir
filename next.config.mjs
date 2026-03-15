/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⚡ PERFORMANS: Dosya sıkıştırmayı açarak veri transferini azaltır
  compress: true,
  poweredByHeader: false, // Güvenlik için X-Powered-By başlığını kaldırır

  images: {
    // ✅ MODERNİZASYON: 'domains' yerine 'remotePatterns' kullanımı (Daha güvenli)
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'swaphubs.com' },
    ],
    // 🖼️ HIZ: Görselleri otomatik olarak en hafif formatlara çevirir
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200], // Farklı cihazlar için optimize boyutlar
  },

  // 🛡️ GÜVENLİK VE ÖNBELLEK: Tarayıcı performansını ve güvenliğini artırır
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // 🚀 HIZ: Statik dosyalar için uzun süreli önbellekleme (Cache Control)
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ];
  },

  // 🔗 YÖNLENDİRMELER: Eski linkleri yeni yapıya bağlar
  async redirects() {
    return [
      {
        // Örn: www.swaphubs.com gelirse ana domaine yönlendir
        source: '/www', 
        destination: 'https://swaphubs.com',
        permanent: true,
      },
    ];
  },

  // 🛠️ EKSTRA: Üretim hatalarını minimize eder
  typescript: {
    ignoreBuildErrors: false, // Hatalı kodun yayına çıkmasını engeller
  },
};

export default nextConfig;
