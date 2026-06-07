// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {

  // ─── IMAGES ──────────────────────────────────────────────
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
    unoptimized: true,
  },

  // ─── REDIRECTS ───────────────────────────────────────────
  // non-www → www kalıcı 301 redirect
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "swaphubs.com" }],
        destination: "https://www.swaphubs.com/:path*",
        permanent: true,
      },
    ];
  },

  // ─── HEADERS ─────────────────────────────────────────────
  async headers() {
    return [

      // Tüm sayfalar — güvenlik + SEO başlıkları
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",         value: "DENY" },
          { key: "X-XSS-Protection",        value: "1; mode=block" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },

      // Sitemap cache
      {
        source: "/(sitemap.*).xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=43200",
          },
        ],
      },

      // robots.txt cache
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },

      // Statik dosyalar
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      // OG görselleri
      {
        source: "/og/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
