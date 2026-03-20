import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ar', 'de', 'en', 'es', 'fr', 'hi', 'ms', 'ru', 'tr', 'zh'],
  defaultLocale: 'tr'
});

export const config = {
  // Bu matcher, dilleri URL'den yakalar ve statik dosyaları hariç tutar
  matcher: ['/', '/(tr|en|de|ar|es|fr|hi|ms|ru|zh)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
