/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 768, 1080, 1280, 1920],
    imageSizes: [48, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "swaphubs.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns", "framer-motion"],
  },
  async rewrites() {
    return [
      { source: "/sitemap-statik.xml",       destination: "/sitemap-statik" },
      { source: "/sitemap-sektorler.xml",    destination: "/sitemap-sektorler" },
      { source: "/sitemap-meslekler.xml",    destination: "/sitemap-meslekler" },
      { source: "/sitemap-turkiye-sehir.xml",destination: "/sitemap-turkiye-sehir" },
      { source: "/sitemap-turkiye-ilce.xml", destination: "/sitemap-turkiye-ilce" },
      { source: "/sitemap-dunya.xml",        destination: "/sitemap-dunya" },
      { source: "/sitemap-ilanlar.xml",      destination: "/sitemap-ilanlar" },
    ];
  },
};

export default nextConfig;
