import { Metadata } from 'next';

// 1. Arama motorunun açıklamada harita resmi göstermesi ve doğru dizine eklemesi için SEO Ayarları
export const metadata: Metadata = {
  title: 'Ателье в Анталии Коньяалты | Онлайн Ремонт Одежды - SwapHubs',
  description: 'Профессиональные услуги швейного ателье в Анталии. Заберем вещи от вашей двери в Коньяалты, отремонтируем и привезем обратно. Нажмите «Найти ателье» для просмотра карты.',
  keywords: ['ателье анталия', 'ремонт одежды коньяалты', 'швея анталия', 'онлайн ателье'],
  alternates: {
    canonical: 'https://swaphubs.com/ru/atelie-antalya-online',
  },
  // Google arama listesinde harita ekran görüntüsünü tetiklemek için görsel tanımı
  openGraph: {
    title: 'SwapHubs Онлайн Ателье Анталия - Terzi Can',
    description: 'Ателье и Ремонт Одежды в Коньяалты',
    url: 'https://swaphubs.com/ru/atelie-antalya-online',
    type: 'website',
    images: [
      {
        url: 'https://swaphubs.com/images/map-screenshot-konyaalti.jpg', // Buraya haritanızın dükkanı işaret eden bir ekran görüntüsünü (PNG/JPG) yükleyip linkini koyun.
        width: 1200,
        height: 630,
        alt: 'Terzi Can Google Maps Локация Коньяалты Анталия',
      },
    ],
  },
};

export default function RussianTailorMapServicePage() {
  const phoneNumber = '+905527869836';
  
  // Google Haritalar'da dükkanınızın adresi işaretlenmiş doğrudan harita yönlendirme linki (Terzi Bul için)
  const googleMapsRedirectUrl = 'https://www.google.com/maps/search/?api=1&query=36.8614,30.6322(SwapHubs+Atelie+Terzi+Can)';
  
  const whatsappMessage = encodeURIComponent('Здравствуйте, я хотел бы получить информацию об услугах онлайн-ателье.');
  const whatsappUrl = `https://wa.me/905527869836?text=${whatsappMessage}`;

  // Google Haritalar dizininde sitenin doğrudan bir "Harita Kartı" gibi eşleşmesini sağlayan Şema Verisi
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Tailor',
    'name': 'SwapHubs Онлайн Ателье Анталия - Terzi Can',
    'image': 'https://swaphubs.com/images/map-screenshot-konyaalti.jpg',
    '@id': 'https://swaphubs.com/ru/atelie-antalya-online',
    'url': 'https://swaphubs.com/ru/atelie-antalya-online',
    'telephone': phoneNumber,
    'hasMap': googleMapsRedirectUrl, // Google botuna harita adres linkimizi doğrudan beyan ediyoruz
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Kuşkavağı Mahallesi, Atatürk Bulvarı (Terzi Can)',
      'addressLocality': 'Konyaaltı',
      'addressRegion': 'Antalya',
      'postalCode': '07070',
      'addressCountry': 'TR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 36.8614, 
      'longitude': 30.6322
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '19:00'
      }
    ],
    'areaServed': [
      { '@type': 'AdministrativeArea', 'name': 'Konyaaltı' },
      { '@type': 'AdministrativeArea', 'name': 'Antalya' }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        
        {/* Üst Kısım */}
        <header className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white py-16 px-4 text-center border-b border-indigo-900">
          <div className="max-w-3xl mx-auto">
            <span className="bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Онлайн-Ателье в Анталии (Карта и Навигация)
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-4 tracking-tight leading-tight">
              Профессиональный Ремонт Одежды в Коньяалты
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Нажмите кнопку <strong>«Найти ателье на карте»</strong>, чтобы проложить точный маршрут к нашей мастерской или свяжитесь с нами для вызова курьера на дом.
            </p>
          </div>
        </header>

        {/* Aksiyon Butonları (İstediğiniz Terzi Bul / Maps Yönlendirmeli Model) */}
        <section className="max-w-2xl mx-auto -mt-8 px-4 sticky top-4 z-50">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Tıklanınca Haritaya Giden ve Adresi İşaretli Gösteren Buton (Terzi Bul) */}
            <a 
              href={googleMapsRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md active:scale-95 text-center text-sm md:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Найти ателье (Google Maps)
            </a>

            {/* Telefon Et Butonu */}
            <a 
              href={`tel:${phoneNumber}`}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md active:scale-95 text-center text-sm md:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.017 12.017 0 0 1-4.5-4.5c-.155-.44.01-1.21.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              Позвонить сейчас
            </a>

            {/* WhatsApp Butonu */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md active:scale-95 text-center text-sm md:text-base"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.85.001-2.634-1.023-5.11-2.884-6.974C16.526 1.849 14.05 .823 11.416.823c-5.442 0-9.866 4.413-9.87 9.85-.001 1.761.464 3.483 1.347 5.015L1.83 21.64l6.002-1.573z"/>
              </svg>
              WhatsApp
            </a>

          </div>
        </section>

        {/* Detay ve Harita Alanı */}
        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
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
                    className="text-red-600 font-bold hover:underline flex items-center gap-1"
                  >
                    Открыть точную точку в Google Maps →
                  </a>
                </div>
              </div>
              
              {/* Tıklanabilir Önizleme Harita Alanı */}
              <a 
                href={googleMapsRedirectUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200 block group"
              >
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-all z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs font-semibold text-center p-4">
                  [Кликните здесь, чтобы открыть интерактивную карту с точным маркером Terzi Can]
                </div>
              </a>
            </div>
          </div>
        </main>

        <footer className="bg-slate-900 text-slate-500 py-6 text-center text-xs">
          <p>© {new Date().getFullYear()} SwapHubs - Terzi Can. Локальное SEO Коньяалты.</p>
        </footer>
      </div>
    </>
  );
}
