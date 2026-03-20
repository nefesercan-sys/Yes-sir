import createNextIntlPlugin from 'next-intl/plugin';

// Parametre vermiyoruz, sistem src/i18n/request.ts dosyasını kendisi bulacak
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Derleme hızını artırmak ve ufak hataları görmezden gelmek için:
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default withNextIntl(nextConfig);
