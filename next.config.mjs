import withNextIntl from 'next-intl/config';

const withNextIntlConfig = withNextIntl(); // Varsayılan olarak './src/i18n.ts' yolunu arar

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mevcut diğer config ayarların (images, vs.)
};

export default withNextIntlConfig(nextConfig);
