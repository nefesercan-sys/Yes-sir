import { useMessages, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import IlanlarClient from "@/app/components/IlanlarClient"; // Senin ilan listeleme bileşenin

// Sayfa başlığını dile göre dinamik yapmak istersen (SEO için):
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('ilanlarTitle'), // JSON dosyasında Metadata -> ilanlarTitle karşılığı olmalı
    description: t('ilanlarDescription')
  };
}

export default async function IlanlarPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // Sunucu tarafında çeviri mesajlarını alıyoruz
  const messages = await getMessages();

  return (
    // Client component'lerin içinde çeviri kullanabilmesi için provider ile sarmalıyoruz
    <NextIntlClientProvider messages={messages}>
      <div className="container mx-auto px-4 py-8">
        {/* Senin mevcut ilan listeleme componentini buraya çağırıyoruz */}
        {/* initialData veya benzeri propsların varsa buradan geçebilirsin */}
        <IlanlarClient />
      </div>
    </NextIntlClientProvider>
  );
}
