
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// Ekran görüntündeki karmaşık admin mantığını içeren Client bileşeni
import AdminPanelClient from "@/components/panel/AdminPanelClient"; 

export default async function AdminPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // Dil dosyalarını sunucudan alıyoruz
  const messages = await getMessages();

  return (
    // Admin panelindeki tüm çevirilerin çalışması için Provider şart
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="min-h-screen bg-gray-50">
        <AdminPanelClient />
      </div>
    </NextIntlClientProvider>
  );
}
