import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['en', 'tr', 'de'];

export default getRequestConfig(async ({locale}) => {
  // Eğer gelen locale listede yoksa 404 fırlat
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
