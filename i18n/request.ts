import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Ekran görüntündeki tüm dilleri ekledim
const locales = ['ar', 'de', 'en', 'es', 'fr', 'hi', 'ms', 'ru', 'tr', 'zh'];

export default getRequestConfig(async ({ locale }) => {
  // Gelen locale listede yoksa 404 fırlat
  if (!locales.includes(locale as any)) notFound();

  return {
    // Yolu @/app/messages olarak güncelledik çünkü klasör app içinde
    messages: (await import(`@/app/messages/${locale}.json`)).default
  };
});
