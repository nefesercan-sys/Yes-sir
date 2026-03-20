import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Desteklediğin diller
const locales = ['tr', 'en'];

export default getRequestConfig(async ({locale}) => {
  // Eğer desteklenmeyen bir dil URL'si girilirse 404'e at
  if (!locales.includes(locale as any)) notFound();

  return {
    // messages klasörü kök dizinde olduğu için iki üst klasöre (../../) çıkıyoruz
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
