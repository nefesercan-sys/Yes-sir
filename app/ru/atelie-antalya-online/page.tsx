import { Metadata } from 'next';

// 404 ve Siyah ekran riskini önlemek için tamamen güvenli hale getirilmiş SEO Meta Verileri
export const metadata: Metadata = {
  title: 'Ателье в Анталии Коньяалты | Онлайн Ремонт Одежды - SwapHubs',
  description: 'Профессиональные услуги швейного ателье в Анталии. Заберем вещи от вашей двери в Коньяалты, отремонтируем и привезем обратно. Нажмите на кнопку для просмотра карты.',
  keywords: ['ателье анталия', 'ремонт одежды коньяалты', 'швея анталия', 'онлайн ателье'],
  alternates: {
    canonical: 'https://swaphubs.com/atelie-antalya-online-ru',
  },
  openGraph: {
    title: 'SwapHubs Онлайн Ателье Анталия - Terzi Can',
    description: 'Ателье и Ремонт Одежды в Коньяалты',
    url: 'https://swaphubs.com/atelie-antalya-online-ru',
    type: 'website',
  },
};

export default function RussianTailorFixedPage() {
  const phoneNumber = '+905527869836';
  
  // Sizi doğrudan Google Haritalar'da dükkan adresinize yönlendirecek olan arama linki
  const googleMapsRedirectUrl = 'https://www.google.com/maps/search/?api=1&query=Terzi+Can+Konyaalti+Antalya';
  
  const whatsappMessage = encodeURIComponent('Здравствуйте, я хотел бы получить информацию об услугах онлайн-ателье.');
  const whatsappUrl = `https://wa.me/905527869836?text=${whatsappMessage}`;

  // Google botlarının dükkanı haritalarla eşleştirmesi için güvenli JSON-LD Şeması
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Tailor',
    'name': 'SwapHubs Онлайн Ателье Анталия - Terzi Can',
    'id': 'https://swaphubs.com/atelie-antalya-online-ru',
    'url': 'https://swaphubs.com/atelie-antalya-online-ru',
    'telephone': phoneNumber,
    'hasMap': googleMapsRedirectUrl,
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Kuskavali Mahallesi, Ataturk Bulvari (Terzi Can)',
      'addressLocality': 'Konyaalti',
      'addressRegion': 'Antalya',
      'postalCode': '07070',
      'addressCountry': 'TR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 36.8614, 
      'longitude': 30.6322
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Siyah ekranı önlemek için arka plan rengi (bg-white) ve yazı rengi (text-slate-800) kesin olarak tanımlanmıştır */}
      <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
        
        {/* Başlık Alanı */}
        <header className="bg-slate-900 text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Онлайн-Ателье в Анталии
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-4 tracking-tight">
              Профессиональный Ремонт Одежды в Коньяалты
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Нажмите кнопку Найти ателье на карте, чтобы проложить точный маршрут к нашей мастерской или свяжитесь с нами через WhatsApp.
            </p>
          </div>
        </header>

        {/* Aksiyon Butonları (Terzi Bul / Telefon / WhatsApp) */}
        <section className="max-w-2xl mx-auto -mt-8 px-4 relative z-10">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Terzi Bul Butonu: Doğrudan dükkanın işaretli olduğu Google Haritalar'a gider */}
            <a 
              href={googleMapsRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md text-center text-sm md:text-base"
            >
              Найти ателье (Maps)
            </a>

            {/* Telefon Et Butonu */}
            <a 
              href={`tel:${phoneNumber}`}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md text-center text-sm md:text-base"
            >
              Позвонить сейчас
            </a>

            {/* WhatsApp Butonu */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md text-center text-sm md:text-base"
            >
              WhatsApp
            </a>

          </div>
        </section>

        {/* Detay ve Harita Alanı */}
        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Локация мастерской на карте Анталии
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 text-sm text-slate-700">
                <p><strong>Ателье:</strong> Terzi Can (SwapHubs Partner)</p>
                <p><strong>Адрес:</strong> Kuşkavağı Mh. Atatürk Bulvarı, Konyaaltı / Antalya</p>
                <p><strong>Режим работы:</strong> Пн - Сб: 09:00 - 19:00</p>
                <div className="pt-4">
                  <a 
                    href={googleMapsRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 font-bold hover:underline"
                  >
                    Открыть точку в Google Maps →
                  </a>
                </div>
              </div>
              
              {/* Tıklanabilir Harita Önizleme Kutusu */}
              <a 
                href={googleMapsRedirectUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="w-full h-48 bg-slate-200 rounded-xl overflow-hidden relative border border-slate-300 flex items-center justify-center text-slate-500 text-xs font-semibold text-center p-4 hover:bg-slate-300 transition-all"
              >
                Кликните здесь, чтобы открыть карту с точным адресом Terzi Can
              </a>
            </div>
          </div>
        </main>

        {/* Footer - Çökmeyi önlemek için yıl bilgisi statik 2026 olarak girilmiştir */}
        <footer className="bg-slate-950 text-slate-500 py-6 text-center text-xs">
          <p>© 2026 SwapHubs - Terzi Can. Все права защищены.</p>
        </footer>
      </div>
    </>
  );
}
