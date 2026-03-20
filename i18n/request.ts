import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['tr', 'en'];

export default getRequestConfig(async ({ locale }) => {
  // Desteklenen dillerde değilse 404 döndür
  if (!locales.includes(locale as any)) notFound();

  return {
    // Mesajlar ana dizindeki messages klasöründe ise yol kesinlikle budur:
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
