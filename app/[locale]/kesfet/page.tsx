import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import KesfetClient from "@/components/KesfetClient"; // Klasör yoluna dikkat!

export default async function KesfetPage({ params: { locale } }: { params: { locale: string } }) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <KesfetClient />
    </NextIntlClientProvider>
  );
}
