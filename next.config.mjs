import createNextIntlPlugin from 'next-intl/plugin';

// Create the wrapper function (you can optionally pass a custom path to your i18n.ts here)
const withNextIntl = createNextIntlPlugin(); 

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js configuration options go here
  reactStrictMode: true,
};

// Wrap and export your config
export default withNextIntl(nextConfig);
