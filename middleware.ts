import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['tr', 'en', 'ar', 'de', 'ru', 'zh', 'es', 'fr', 'hi', 'ms'],
  defaultLocale: 'tr',
  localePrefix: 'always' // URL'de her zaman /tr veya /en görünmesini sağlar
});
 
export const config = {
  // Bu matcher tüm sayfaları yakalar, sadece api ve statik dosyaları bırakır
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
