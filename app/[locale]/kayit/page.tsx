import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import KayitClient from "@/app/components/KayitClient"; // Kayıt formunun olduğu bileşen

// SEO Ayarları (Dinamik Başlık)
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return {
    title: t('registerTitle'), // JSON'da Auth -> registerTitle olmalı
    description: t('registerDescription'),
  };
}

export default async function KayitPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // Dil dosyalarını sunucudan çekiyoruz
  const messages = await getMessages();

  return (
    /* Formun içinde useTranslations('Auth') gibi kancalar (hooks) 
       kullanabilmen için bu Provider şarttır.
    */
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Gerçek kayıt formunun olduğu bileşen */}
          <KayitClient />
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
