import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ["tr", "en", "de", "ru", "zh", "es", "fr", "hi", "ms"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as string)) notFound();

  try {
    return {
      locale: locale as string,
      messages: (await import(`../messages/${locale}.json`)).default
    };
  } catch {
    // Mesaj dosyası yoksa Türkçe'ye düş
    return {
      locale: "tr",
      messages: (await import(`../messages/tr.json`)).default
    };
  }
});
