import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ["tr", "en", "ar", "de", "ru", "zh", "es", "fr", "hi", "ms"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    // Mesajların tam konumu burasıysa hata vermeyecektir:
    messages: (await import(`../app/messages/${locale}.json`)).default
  };
});
