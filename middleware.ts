import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Desteklenen diller
  locales: ['tr', 'en'],
  // Varsayılan dil
  defaultLocale: 'tr',
  // Eğer kullanıcı ana dizine gelirse başına /tr ekleme (SEO için daha iyi)
  localePrefix: 'as-needed'
});

export const config = {
  // Statik dosyalar ve API hariç her şeyi tara
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
