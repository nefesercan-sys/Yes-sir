import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Desteklenen tüm diller
  locales: ['en', 'tr', 'de'],

  // Eğer bir dil belirtilmemişse kullanılacak varsayılan dil
  defaultLocale: 'tr',
  
  // URL'de varsayılan dilin görünüp görünmeyeceğini belirler (isteğe bağlı)
  localePrefix: 'always' 
});

export const config = {
  // Middleware'in hangi sayfalarda çalışacağını belirler. 
  // Statik dosyaları (resimler, favicon vb.) hariç tutmak çok önemlidir.
  matcher: [
    // Tüm sayfaları yakala
    '/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|images|icons).*)'
  ]
};
