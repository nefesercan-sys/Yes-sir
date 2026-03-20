import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
// Kritik Nokta: Import yolu @/components/IlanlarClient olmalı
import IlanlarClient from "@/components/IlanlarClient"; 

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('ilanlarTitle') || "İlanlar | SwapHubs",
    description: t('ilanlarDescription') || "En yeni takas ilanlarını keşfedin."
  };
}

export default async function IlanlarPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // Sunucu tarafında dil paketlerini yükle
  const messages = await getMessages();

  return (
    // Client Component'in çevirilere erişebilmesi için Provider şart
    <NextIntlClientProvider messages={messages} locale={locale}>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto">
          <IlanlarClient />
        </div>
      </main>
    </NextIntlClientProvider>
  );
}
