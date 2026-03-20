import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed'
});

export const config = {
  // Statik dosyaları (resim, favicon vb.) hariç tut, gerisini tara
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
