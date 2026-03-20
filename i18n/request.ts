import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['ar', 'de', 'en', 'es', 'fr', 'hi', 'ms', 'ru', 'tr', 'zh'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    // messages klasörü app içinde olduğu için yol bu şekilde:
    messages: (await import(`@/app/messages/${locale}.json`)).default
  };
});
