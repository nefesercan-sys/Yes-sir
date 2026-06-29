import { Metadata } from 'next';

// Geliştirilmiş ve Eksiksiz Rusça SEO Meta Verileri
export const metadata: Metadata = {
  title: 'Профессиональное Ателье в Анталии Коньяалты | Ремонт и Пошив Одежды — SwapHubs',
  description: 'Услуги швейного ателье Terzi Can в Анталии. Профессиональный ремонт, подгонка по фигуре и индивидуальный пошив одежды в Коньяалты. Быстро, качественно и с гарантией.',
  keywords: [
    'ателье анталия', 
    'ремонт одежды коньяалты', 
    'швея анталия', 
    'онлайн ателье анталия', 
    'пошив одежды коньяалты', 
    'ремонт джинсов анталия', 
    'замена молнии конялты'
  ],
  alternates: {
    canonical: 'https://swaphubs.com/ru/atelie-antalya-online',
  },
  openGraph: {
    title: 'SwapHubs & Terzi Can | Онлайн Ателье Анталия',
    description: 'Профессиональный ремонт и пошив одежды в Коньяалты',
    url: 'https://swaphubs.com/ru/atelie-antalya-online',
    type: 'website',
  },
};

export default function RussianTailorPremiumPage() {
  const phoneNumber = '+905527869836';
  const googleMapsRedirectUrl = 'https://www.google.com/maps/search/?api=1&query=Terzi+Can+Konyaalti+Antalya';
  const whatsappMessage = encodeURIComponent('Здравствуйте! Я хотел бы получить информацию об услугах ателье (ремонт/пошив).');
  const whatsappUrl = `https://wa.me/905527869836?text=${whatsappMessage}`;

  // Geliştirilmiş Google Zengin Sonuç (JSON-LD Local Business) Şeması
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Tailor',
    'name': 'SwapHubs Онлайн Ателье Анталия - Terzi Can',
    'id': 'https://swaphubs.com/ru/atelie-antalya-online',
    'url': 'https://swaphubs.com/ru/atelie-antalya-online',
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
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '19:00'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Arka plan ve yazı renkleri karanlık mod çakışmalarını önlemek için sabitlendi */}
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-500 selection:text-slate-900">
        
        {/* HERO SECTION */}
        <header className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              ✨ Профессиональное Ателье в Коньяалты
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mt-2 tracking-tight leading-tight max-w-3xl mx-auto">
              Качественный Ремонт и Пошив Одежды в Анталии
            </h1>
            <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Мастерская <span className="text-amber-400 font-bold">Terzi Can</span> (партнер SwapHubs) предлагает быструю подгонку по фигуре, замену фурнитуры и индивидуальный пошив. Напишите нам прямо сейчас!
            </p>
          </div>
        </header>

        {/* HIZLI İLETİŞİM / AKSİYON BUTONLARI */}
        <section className="max-w-4xl mx-auto -mt-10 px-4 relative z-20">
          <div className="bg-white p-5 md:p-8 rounded-2xl shadow-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-emerald-600/20 text-center"
            >
              <span className="text-lg">Написать в WhatsApp</span>
              <span className="text-xs font-normal text-emerald-100">Быстрый ответ и расчет цены</span>
            </a>

            <a 
              href={googleMapsRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-rose-600/20 text-center"
            >
              <span className="text-lg">Открыть карту (Maps)</span>
              <span className="text-xs font-normal text-rose-100">Маршрут к Terzi Can</span>
            </a>

            <a 
              href={`tel:${phoneNumber}`}
              className="flex flex-col items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-slate-900/20 text-center"
            >
              <span className="text-lg">Позвонить мастеру</span>
              <span className="text-xs font-normal text-slate-400">+90 552 786 98 36</span>
            </a>

          </div>
        </section>

        {/* HİZMETLERİMİZ (НАШИ УСЛУГИ) */}
        <section className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Какие услуги мы предоставляем?
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base">
              Широкий спектр швейных услуг для всех видов мужской, женской и детской одежды.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold text-lg mb-4">🧵</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Ремонт одежды</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Укорачивание и подгибка брюк, джинсов, юбок и платьев. Подгонка одежды точно по вашей фигуре.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold text-lg mb-4">⚡</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Замена фурнитуры</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Быстрая и качественная замена сломанных молний, бегунков, пуговиц и заклепок на куртках, джинсах и сумках.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold text-lg mb-4">✂️</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Индивидуальный пошив</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Пошив эксклюзивной одежды по вашим меркам и эскизам. Работаем с текстилем, трикотажем и легкими тканями.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold text-lg mb-4">🧥</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Кожа и тяжелые ткани</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Профессиональное оборудование позволяет нам работать с кожаными куртками, дубленками, пальто и плотным денимом.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold text-lg mb-4">🏡</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Домашний текстиль</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Пошив и подгонка штор, тюля, постельного белья, замена чехлов для подушек и ремонт элементов интерьера.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold text-lg mb-4">🚀</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Срочный ремонт</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Нужно исправить вещь прямо сегодня? Свяжитесь с нами для экспресс-ремонта в течение нескольких часов.</p>
            </div>
          </div>
        </section>

        {/* NASIL ÇALIŞIR (КАК ЭТО РАБОТАЕТ) */}
        <section className="bg-slate-900 text-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Как воспользоваться нашими услугами?</h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base">Всего 3 простых шага для идеального вида вашей одежды</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-amber-500 text-slate-950 font-black rounded-full flex items-center justify-center text-xl mx-auto shadow-lg shadow-amber-500/20">1</div>
                <h3 className="text-lg font-bold">Свяжитесь с нами</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Напишите в WhatsApp или позвоните. Опишите задачу, и мы назовем предварительную стоимость и сроки.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-amber-500 text-slate-950 font-black rounded-full flex items-center justify-center text-xl mx-auto shadow-lg shadow-amber-500/20">2</div>
                <h3 className="text-lg font-bold">Принесите вещь или закажите онлайн</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Вы можете приехать в нашу уютную мастерскую в Коньяалты лично или согласовать детали удаленно.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-amber-500 text-slate-950 font-black rounded-full flex items-center justify-center text-xl mx-auto shadow-lg shadow-amber-500/20">3</div>
                <h3 className="text-lg font-bold">Заберите готовое изделие</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Мастер выполнит работу строго в срок. Ваша одежда будет сидеть на вас идеально и выглядеть как новая!</p>
              </div>
            </div>
          </div>
        </section>

        {/* SIKÇA SORULAN SORULAR (FAQ) */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Часто задаваемые вопросы</h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base">Отвечаем на популярные вопросы наших клиентов</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">📍 Где именно вы находитесь?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">Наша мастерская Terzi Can находится в районе Коньяалты (микрорайон Кушкавагы), прямо на главном проспекте Ататюрка (Atatürk Bulvarı). Нажмите кнопку «Найти ателье на карте» выше, чтобы построить точный маршрут.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">⏱️ Как быстро выполняется ремонт одежды?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">Простые операции, такие как укорачивание джинсов или мелкий ремонт, обычно занимают от нескольких часов до 1 дня. Сложная подгонка или пошив обсуждаются индивидуально.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">💬 Говорите ли вы по-русски или по-английски?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">Да! Мы активно работаем с иностранными клиентами в Анталии. Вы можете написать нам в WhatsApp на своем родном языке — мы используем онлайн-перевод и личную поддержку SwapHubs, чтобы понять каждую деталь вашего заказа.</p>
            </div>
          </div>
        </section>

        {/* DETAYLI ADRES VE HARİTA ÖNİZLEME */}
        <main className="max-w-5xl mx-auto px-4 pb-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
            
            <div className="p-6 md:p-10 md:col-span-5 bg-slate-900 text-white flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-amber-400">Terzi Can</h3>
                  <p className="text-xs text-slate-400 mt-1">Официальный партнер платформы SwapHubs</p>
                </div>
                
                <div className="space-y-3 text-sm text-slate-300">
                  <p><strong>📍 Адрес:</strong> Kuşkavağı Mh. Atatürk Bulvarı, Konyaaltı / Antalya</p>
                  <p><strong>⏰ Режим работы:</strong> Понедельник — Суббота: 09:00 - 19:00 (Воскресенье — выходной)</p>
                  <p><strong>📞 Контактный телефон:</strong> {phoneNumber}</p>
                </div>
              </div>

              <div className="pt-8">
                <a 
                  href={googleMapsRedirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors group"
                >
                  Открыть в Google Maps <span className="transform group-hover:translate-x-1 transition-transform ml-1">→</span>
                </a>
              </div>
            </div>
            
            {/* Tıklanabilir Harita Alanı */}
            <div className="md:col-span-7 bg-slate-100 min-h-[250px] relative flex items-center justify-center p-6 text-center">
              <a 
                href={googleMapsRedirectUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="absolute inset-0 w-full h-full bg-slate-200 flex flex-col items-center justify-center p-4 hover:bg-slate-300/80 transition-all group"
              >
                <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3 shadow-md group-hover:scale-110 transition-transform">📍</div>
                <span className="text-slate-900 font-extrabold text-base md:text-lg block">Нажмите для просмотра интерактивной карты</span>
                <span className="text-slate-500 text-xs mt-1 max-w-sm">Вы будете перенаправлены на точную геопозицию мастерской в Google Maps</span>
              </a>
            </div>

          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-slate-950 text-slate-500 py-8 border-t border-slate-900 text-center text-xs">
          <p>© 2026 SwapHubs & Terzi Can. Все права защищены.</p>
          <p className="mt-2 text-slate-700">Разработано в Анталии с заботой о вашей одежде.</p>
        </footer>
      </div>
    </>
  );
}
