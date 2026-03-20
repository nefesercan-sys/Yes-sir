import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Desteklenen diller
const locales = ['en', 'tr', 'de'];

export default getRequestConfig(async ({ locale }) => {
  // Gelen locale listede yoksa 404 fırlat
  if (!locales.includes(locale as any)) {
    notFound();
  }

  try {
    return {
      // Göreceli yol (../) yerine mutlak alias (@/) kullanımı hata payını düşürür
      messages: (await import(`@/messages/${locale}.json`)).default
    };
  } catch (error) {
    // Eğer dosya hala bulunamazsa build sırasında hata detayını görmek için:
    console.error(`Mesaj dosyası yüklenemedi: ${locale}`, error);
    notFound();
  }
});
