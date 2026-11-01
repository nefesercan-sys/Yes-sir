/** @type {import('next').NextConfig} */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://ui-avatars.com https://maps.gstatic.com https://maps.googleapis.com https://*.googleusercontent.com https://www.google-analytics.com",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://api.cloudinary.com https://www.google-analytics.com",
  "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com",
  "media-src 'self' https://res.cloudinary.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ')

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

  async rewrites() {
    return []
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
      // Sayfası olmayan eski ilçe adresleri (Google'da dizinde kalmış olabilir) → terzi ana sayfası.
      // Manavgat, Kemer, Kepez ve Döşemealtı'nın /terzi/antalya/<slug> sayfaları vardır (yönlendirme yok).
      ...['elmali', 'korkuteli', 'kas', 'kalkan', 'finike', 'kumluca', 'alanya', 'gazipasa'].map((slug) => ({
        source: `/terzi/antalya/${slug}`, destination: '/terzi', permanent: true,
      })),
      // Eski /terzi/bolge/manavgat adresi (bölge sayfası yok) ilçe sayfasına gider
      { source: '/terzi/bolge/manavgat', destination: '/terzi/antalya/manavgat', permanent: true },
      // Meltem, Şirinyalı, Fener, Güzeloba: /terzi/konyaalti/<slug> da 200 verir (canonical Muratpaşa); yalnız yazım hatalı /terzi-konyalti/ yönlenir
      ...['meltem', 'sirinyali', 'fener', 'guzeloba'].flatMap((slug) => [
        { source: `/terzi-konyalti/${slug}`, destination: `/terzi/muratpasa/${slug}`, permanent: true },
      ]),
      // Kısa yorum linki: swaphubs.com/yorum -> Google yorum yazma sayfası
      // Tek kayıt akışı: /kayit (bcrypt'li /api/auth/kayit); /uye-ol eski ve ikinci akıştır
      { source: '/uye-ol', destination: '/kayit', permanent: false },
      { source: '/yorum', destination: 'https://g.page/r/CYUmDLIgrCRREAE/review', permanent: false },
      // Fiziksel olarak olmayan/yanlış yazılan sayfaların yönlendirmeleri korundu
      // Gelinlik: gerçek sayfa app/terzi/hizmet/[hizmet] (gelinlik-abiye-tadilati). Eski/yazım hatalı adresler ona yönlenir.
      { source: '/terzi/gelinlik-tadilati', destination: '/terzi/hizmet/gelinlik-abiye-tadilati', permanent: true },
      { source: '/terzi/gekinlik-tadilati', destination: '/terzi/hizmet/gelinlik-abiye-tadilati', permanent: true },
      { source: '/terzi/gelinlik-tadilati-antalya', destination: '/terzi/hizmet/gelinlik-abiye-tadilati', permanent: true },
      { source: '/terzi-hizmet', destination: '/terzi/hizmet', permanent: true },
      { source: '/tailor-service', destination: '/en/tailor-services', permanent: true },
      { source: '/terzi-konyalti/:mahalle', destination: '/terzi/konyaalti/:mahalle', permanent: true },
      { source: '/dikis-atolyesi-antalya', destination: '/terzi/dikis-atolyesi-antalya', permanent: true },

      // DİKKAT: /terzi/fermuar-degisimi GitHub'da olduğu için YÖNLENDİRİLMİYOR, SERBEST BIRAKILDI.
      // Sadece sonu -antalya ile biten hatalı versiyonunu gerçek sayfasına aktarıyoruz.
      { source: '/terzi/fermuar-degisimi-antalya', destination: '/terzi/fermuar-degisimi', permanent: true },

      // Bu sayfalar swaphubs.com'da kalır (yönlendirme yok): 200 OK yanıtı verir ve sitemap'te listelenir.
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
          { key: 'Content-Security-Policy-Report-Only', value: CSP_REPORT_ONLY },
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

      // Not: indexlenebilirlik sayfa metadata'sındaki robots ile belirlenir; zorla 'index' başlığı eklenmez.
    ]
  },
}

export default nextConfig
