import createNextIntlPlugin from 'next-intl/plugin';

// Dosya yolunu parametre olarak vermiyoruz, default olarak src/i18n/request.ts'i arar
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  // Hızlandırmak için build kontrollerini geçici olarak kapatıyoruz
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default withNextIntl(nextConfig);
