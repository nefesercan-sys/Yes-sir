import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['tr', 'en'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    // Kök dizindeki messages klasörüne güvenli erişim
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
