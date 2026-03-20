import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Tüm dilleri buraya da ekle
  locales: ['ar', 'de', 'en', 'es', 'fr', 'hi', 'ms', 'ru', 'tr', 'zh'],
  defaultLocale: 'tr'
});

export const config = {
  matcher: ['/', '/(tr|en|de|ar|es|fr|hi|ms|ru|zh)/:path*']
};
