import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Buraya varsa diğer Next.js ayarlarınızı ekleyebilirsiniz
};

export default withNextIntl(nextConfig);
