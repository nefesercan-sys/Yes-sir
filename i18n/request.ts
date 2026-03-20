import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['tr', 'en'];

export default getRequestConfig(async ({ locale }) => {
  // Desteklenen dillerde değilse durdur
  if (!locales.includes(locale as any)) notFound();

  return {
    // Mesajlar klasörü kök dizinde olduğu için en sağlam yol budur:
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
