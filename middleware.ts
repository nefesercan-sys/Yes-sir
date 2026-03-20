import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed'
});

export const config = {
  // Statik dosyalar hariç her şeyi tara
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
