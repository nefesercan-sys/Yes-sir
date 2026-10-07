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
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },

  async redirects() {
    return [
      // www → www'siz yönlendirme
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.swaphubs.com' }],
        destination: 'https://swaphubs.com/:path*',
        permanent: true,
      },
      // Kısa yorum linki: swaphubs.com/yorum -> Google yorum yazma sayfası
      { source: '/yorum', destination: 'https://g.page/r/CYUmDLIgrCRREAE/review', permanent: false },
      // Fiziksel olarak olmayan/yanlış yazılan sayfaların yönlendirmeleri korundu
      // Gelinlik sayfası artık gerçek (app/terzi/gelinlik-tadilati). Yazım hataları ona yönlenir.
      { source: '/terzi/gekinlik-tadilati', destination: '/terzi/gelinlik-tadilati', permanent: true },
      { source: '/terzi/gelinlik-tadilati-antalya', destination: '/terzi/gelinlik-tadilati', permanent: true },
      { source: '/dikis-atolyesi-antalya', destination: '/terzi/dikis-atolyesi-antalya', permanent: true },

      // DİKKAT: /terzi/fermuar-degisimi GitHub'da olduğu için YÖNLENDİRİLMİYOR, SERBEST BIRAKILDI.
      // Sadece sonu -antalya ile biten hatalı versiyonunu gerçek sayfasına aktarıyoruz.
      { source: '/terzi/fermuar-degisimi-antalya', destination: '/terzi/fermuar-degisimi', permanent: true },

      // DİKKAT: /antalya-terzi-elbise-dikimi sayfası yüksek trafikli olduğu için
      // 15 Ağustos dosyasındaki yönlendirme komutu KALDIRILDI. Artık 200 OK yanıtı verecek.
    ]
  },

  async headers() {
    return [
      // Global güvenlik başlıkları
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
      // Static assets cache
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // API: no-index, no-cache
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      // Dil başlıkları (tek değer)
      { source: '/en/(.*)', headers: [{ key: 'Content-Language', value: 'en' }] },
      { source: '/ru/(.*)', headers: [{ key: 'Content-Language', value: 'ru' }] },
      { source: '/de/(.*)', headers: [{ key: 'Content-Language', value: 'de' }] },

      // Giriş gerektiren sayfalar — noindex
      { source: '/giris',            headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/panel(.*)',        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/terzi-panel(.*)',  headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/terzi-admin(.*)',  headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/mesajlar(.*)',     headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/uye-ol',           headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/admin(.*)',        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/admin-ai(.*)',     headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/ilan-ver(.*)',     headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
      { source: '/ilan-duzenle(.*)', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/online-terzi-hizmeti/client', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },

      // ── Terzi sayfaları (ÖZEL SEO SİNYALLERİNİZ KORUNDU) ──────────────────────────
      {
        source: '/terzi',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/terzi/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },

      // ── Online Terzi Hizmeti ─────────────────────────────────────────────
      {
        source: '/online-terzi-hizmeti',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/online-terzi-hizmeti/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },

      // ── Diğer SEO sayfaları ─────────────────────────────────────────────
      {
        source: '/tekstil-antalya',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/online-tailor-service',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
      {
        source: '/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
      },
    ]
  },
}

export default nextConfig
