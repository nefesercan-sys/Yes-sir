import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ["tr", "en", "ar", "de", "ru", "zh", "es", "fr", "hi", "ms"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as string)) notFound();

  return {
    locale: locale as string,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});
