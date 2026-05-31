// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/files/uuid{:b-f0-9]{s}",
        destination: "/files",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(sitemap-*).xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=43200",
          },
        ],
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
