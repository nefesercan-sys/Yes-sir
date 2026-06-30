import type { Metadata } from 'next';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const BASE_URL = 'https://swaphubs.com';
const PAGE_URL = `${BASE_URL}/ru/atelie-antalya-online`;
const PHONE_DISPLAY = '+90 552 786 98 36';
const PHONE_TEL = '+905527869836';
const TODAY = new Date().toISOString().split('T')[0];
const OG_IMAGE = `${BASE_URL}/og/atelie-antalya-ru.jpg`;
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Terzi+Can+Konyaalti+Antalya';
const WA_NUMBER = '905527869836';
const WA = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = WA('Здравствуйте! Я хотел бы получить информацию об услугах ателье (ремонт/пошив).');

// ─── METADATA ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Ателье в Анталии Коньяалты — Ремонт и Пошив Одежды | Terzi Can',
  description:
    'Швейное ателье Terzi Can в Коньяалты, Анталия. Ремонт, подгонка по фигуре, замена молнии, индивидуальный пошив. Говорим по-русски. Быстро, качественно, с гарантией. ☎ ' + PHONE_DISPLAY,
  keywords: [
    'ателье анталия', 'ателье коньяалты', 'ремонт одежды анталия', 'ремонт одежды коньяалты',
    'швея анталия', 'портной анталия', 'онлайн ателье анталия', 'пошив одежды коньяалты',
    'ремонт джинсов анталия', 'замена молнии коньяалты', 'подгонка одежды анталия',
    'укорачивание брюк анталия', 'химчистка анталия', 'портной говорит по-русски анталия',
    'ателье ататюрк бульвары', 'срочный ремонт одежды анталия',
  ],
  authors: [{ name: 'SwapHubs', url: BASE_URL }],
  creator: 'SwapHubs',
  publisher: 'SwapHubs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'ru': PAGE_URL,
      'tr': `${BASE_URL}/terzi`,
      'en': `${BASE_URL}/online-tailor-service`,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Ателье в Анталии Коньяалты — Terzi Can | SwapHubs',
    description: 'Профессиональный ремонт и пошив одежды в Коньяалты. Говорим по-русски. ☎ ' + PHONE_DISPLAY,
    url: PAGE_URL,
    siteName: 'SwapHubs',
    locale: 'ru_RU',
    alternateLocale: ['tr_TR', 'en_US'],
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Ателье Terzi Can — Коньяалты, Анталия',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ателье в Анталии — Terzi Can',
    description: 'Ремонт и пошив одежды в Коньяалты. ☎ ' + PHONE_DISPLAY,
    images: [OG_IMAGE],
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8614;30.6322',
    'ICBM': '36.8614, 30.6322',
    'content-language': 'ru',
  },
};

// ─── JSON-LD — sentezlenmiş tam şema ───────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}#website`,
      name: 'SwapHubs',
      url: BASE_URL,
      inLanguage: ['tr', 'en', 'ru'],
    },
    {
      '@type': ['Tailor', 'ClothingStore', 'LocalBusiness'],
      '@id': `${PAGE_URL}#business`,
      name: 'Terzi Can — Ателье в Анталии (Коньяалты)',
      alternateName: [
        'SwapHubs Онлайн Ателье Анталия', 'Ателье Коньяалты', 'Портной Анталья',
        'Terzi Can Konyaaltı', 'Ремонт одежды Анталия',
      ],
      description:
        'Швейное ателье Terzi Can в Коньяалты, Анталия. Профессиональный ремонт, подгонка по фигуре и индивидуальный пошив одежды. Работа с кожей, деним и домашним текстилем. Говорим по-русски.',
      url: PAGE_URL,
      telephone: PHONE_TEL,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card',
      image: OG_IMAGE,
      hasMap: MAPS_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kuşkavağı Mahallesi, Atatürk Bulvarı',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 36.8614,
        longitude: 30.6322,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],

      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
        itemReviewed: {
          '@type': 'ClothingStore',
          name: 'Terzi Can — Ателье в Анталии',
        },
      },

      review: [
        {
          '@type': 'Review',
          name: 'Отличный портной — говорит по-русски',
          author: { '@type': 'Person', name: 'Наталья К.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Отличное ателье! Пошили свадебное платье за 5 дней. Говорят по-русски, очень довольна результатом.',
          datePublished: '2025-06-20',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can — Ателье в Анталии' },
        },
        {
          '@type': 'Review',
          name: 'Быстрая подгонка джинсов',
          author: { '@type': 'Person', name: 'Алексей М.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Укоротили джинсы за пару часов прямо во время отпуска. Качество отличное, цены разумные.',
          datePublished: '2025-05-14',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can — Ателье в Анталии' },
        },
        {
          '@type': 'Review',
          name: 'Работа с кожаной курткой',
          author: { '@type': 'Person', name: 'Дмитрий С.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Заменили молнию на кожаной куртке. Не каждое ателье берётся за кожу, а здесь сделали идеально.',
          datePublished: '2025-04-29',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can — Ателье в Анталии' },
        },
      ],

      areaServed: [
        { '@type': 'City', name: 'Konyaaltı' },
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'City', name: 'Lara' },
        { '@type': 'City', name: 'Belek' },
        { '@type': 'City', name: 'Kemer' },
      ],

      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Услуги ателье Terzi Can',
        itemListElement: [
          {
            '@type': 'Offer', name: 'Укорачивание брюк / джинсов',
            description: 'Укорачивание и подгибка брюк, джинсов, юбок и платьев.',
            price: '150', priceCurrency: 'TRY', priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock', url: PAGE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
          },
          {
            '@type': 'Offer', name: 'Замена молнии',
            description: 'Замена сломанных молний на куртках, джинсах, сумках.',
            price: '120', priceCurrency: 'TRY', priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock', url: PAGE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
          },
          {
            '@type': 'Offer', name: 'Индивидуальный пошив одежды',
            description: 'Пошив эксклюзивной одежды по меркам и эскизам.',
            price: '600', priceCurrency: 'TRY', priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock', url: PAGE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
          },
          {
            '@type': 'Offer', name: 'Работа с кожей и тяжёлыми тканями',
            description: 'Кожаные куртки, дублёнки, пальто, плотный деним.',
            price: '250', priceCurrency: 'TRY', priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock', url: PAGE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
          },
          {
            '@type': 'Offer', name: 'Домашний текстиль',
            description: 'Пошив штор, тюля, постельного белья, чехлов для подушек.',
            price: '200', priceCurrency: 'TRY', priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock', url: PAGE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
          },
        ],
      },

      knowsLanguage: ['tr', 'ru', 'en'],
      sameAs: [WA_DEFAULT, `${BASE_URL}/terzi`],
    },

    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'Ателье в Анталии Коньяалты — Terzi Can',
      url: PAGE_URL,
      isPartOf: { '@id': `${BASE_URL}#website` },
      about: { '@id': `${PAGE_URL}#business` },
      inLanguage: 'ru',
      datePublished: '2025-01-01',
      dateModified: TODAY,
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Terzi Can', item: `${BASE_URL}/terzi` },
        { '@type': 'ListItem', position: 3, name: 'Ателье на русском', item: PAGE_URL },
      ],
    },

    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Где находится ателье?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ателье Terzi Can находится в районе Коньяалты, микрорайон Кушкавагы, на проспекте Ататюрка (Atatürk Bulvarı), Анталия.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как быстро выполняется ремонт одежды?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Простой ремонт (укорачивание брюк, замена молнии) обычно занимает от нескольких часов до 1 дня. Сложная подгонка и пошив обсуждаются индивидуально.',
          },
        },
        {
          '@type': 'Question',
          name: 'Говорите ли вы по-русски?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да! Мы активно работаем с русскоязычными клиентами в Анталии. Пишите в WhatsApp на родном языке — мы поймём каждую деталь заказа.',
          },
        },
        {
          '@type': 'Question',
          name: 'Работаете ли вы с кожей и плотными тканями?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, у нас профессиональное оборудование для работы с кожаными куртками, дублёнками, пальто и плотным деномом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько стоит укоротить джинсы или брюки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Укорачивание брюк и джинсов от ₺150. Точную цену скажем по фото в WhatsApp.',
          },
        },
      ],
    },
  ],
};

// ─── PAGE COMPONENT ─────────────────────────────────────────────────────────
export default function RussianTailorPremiumPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-500 selection:text-slate-900">

        {/* ── FLOATING CALL/WA BUTTONS ──────────────────────────────────────── */}
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label="Позвонить мастеру"
            className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl shadow-lg shadow-slate-900/30 active:scale-95 transition-transform"
          >
            📞
          </a>
          <a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в WhatsApp"
            className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-600/30 active:scale-95 transition-transform"
          >
            💬
          </a>
        </div>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
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
              Мастерская <span className="text-amber-400 font-bold">Terzi Can</span> (партнёр SwapHubs) предлагает быструю подгонку по фигуре, замену фурнитуры и индивидуальный пошив. Напишите нам прямо сейчас!
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-300">
              <span className="text-amber-400 text-lg">★★★★★</span>
              <strong className="text-white">4.9</strong>
              <span>· 94 отзыва</span>
            </div>
          </div>
        </header>

        {/* ── HIZLI İLETİŞİM ───────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto -mt-10 px-4 relative z-20" aria-label="Быстрая связь">
          <div className="bg-white p-5 md:p-8 rounded-2xl shadow-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-emerald-600/20 text-center"
            >
              <span className="text-lg">Написать в WhatsApp</span>
              <span className="text-xs font-normal text-emerald-100">Быстрый ответ и расчёт цены</span>
            </a>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-rose-600/20 text-center"
            >
              <span className="text-lg">Открыть карту (Maps)</span>
              <span className="text-xs font-normal text-rose-100">Маршрут к Terzi Can</span>
            </a>

            <a
              href={`tel:${PHONE_TEL}`}
              className="flex flex-col items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-slate-900/20 text-center"
            >
              <span className="text-lg">Позвонить мастеру</span>
              <span className="text-xs font-normal text-slate-400">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </section>

        {/* ── SEO TEXT BLOCK ───────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-4">
          <p className="text-sm text-slate-500 leading-relaxed text-center">
            <strong className="text-slate-700">Terzi Can</strong> — швейное ателье в Коньяалты, Анталия,
            обслуживающее русскоязычных клиентов. Ремонт одежды, подгонка по фигуре, замена молнии,
            индивидуальный пошив, работа с кожей и плотными тканями. Говорим по-русски — пишите в WhatsApp.
          </p>
        </section>

        {/* ── HİZMETLERİMİZ ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 py-16" aria-labelledby="services-h">
          <div className="text-center mb-12">
            <h2 id="services-h" className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Какие услуги мы предоставляем?
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base">
              Широкий спектр швейных услуг для всех видов мужской, женской и детской одежды.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['🧵', 'Ремонт одежды', 'Укорачивание и подгибка брюк, джинсов, юбок и платьев. Подгонка одежды точно по вашей фигуре.', 'от ₺150'],
              ['⚡', 'Замена фурнитуры', 'Быстрая и качественная замена сломанных молний, бегунков, пуговиц и заклёпок.', 'от ₺120'],
              ['✂️', 'Индивидуальный пошив', 'Пошив эксклюзивной одежды по вашим меркам и эскизам. Текстиль, трикотаж, лёгкие ткани.', 'от ₺600'],
              ['🧥', 'Кожа и тяжёлые ткани', 'Профессиональное оборудование для кожаных курток, дублёнок, пальто и плотного денима.', 'от ₺250'],
              ['🏡', 'Домашний текстиль', 'Пошив и подгонка штор, тюля, постельного белья, замена чехлов для подушек.', 'от ₺200'],
              ['🚀', 'Срочный ремонт', 'Нужно исправить вещь сегодня? Свяжитесь с нами для экспресс-ремонта за несколько часов.', 'По запросу'],
            ].map(([icon, title, desc, price]) => (
              <div key={title} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
                  {icon}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{desc}</p>
                <span className="inline-block text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                  {price}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── NASIL ÇALIŞIR ─────────────────────────────────────────────────── */}
        <section className="bg-slate-900 text-white py-20 px-4" aria-labelledby="how-h">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="how-h" className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Как воспользоваться нашими услугами?
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base">
                Всего 3 простых шага для идеального вида вашей одежды
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                ['1', 'Свяжитесь с нами', 'Напишите в WhatsApp или позвоните. Опишите задачу — назовём предварительную стоимость и сроки.'],
                ['2', 'Принесите вещь или закажите онлайн', 'Приезжайте в нашу мастерскую в Коньяалты лично или согласуйте детали удалённо.'],
                ['3', 'Заберите готовое изделие', 'Мастер выполнит работу строго в срок. Одежда будет сидеть идеально!'],
              ].map(([n, t, d]) => (
                <div key={n} className="text-center space-y-4">
                  <div className="w-12 h-12 bg-amber-500 text-slate-950 font-black rounded-full flex items-center justify-center text-xl mx-auto shadow-lg shadow-amber-500/20">
                    {n}
                  </div>
                  <h3 className="text-lg font-bold">{t}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SIKÇA SORULAN SORULAR ─────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 py-20" aria-labelledby="faq-h">
          <div className="text-center mb-12">
            <h2 id="faq-h" className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Часто задаваемые вопросы
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base">
              Отвечаем на популярные вопросы наших клиентов
            </p>
          </div>

          <div className="space-y-4">
            {[
              ['📍 Где именно вы находитесь?',
               'Наша мастерская Terzi Can находится в районе Коньяалты (микрорайон Кушкавагы), прямо на главном проспекте Ататюрка (Atatürk Bulvarı). Нажмите кнопку «Открыть карту» выше, чтобы построить точный маршрут.'],
              ['⏱️ Как быстро выполняется ремонт одежды?',
               'Простые операции — укорачивание джинсов, мелкий ремонт — обычно занимают от нескольких часов до 1 дня. Сложная подгонка или пошив обсуждаются индивидуально.'],
              ['💬 Говорите ли вы по-русски или по-английски?',
               'Да! Мы активно работаем с иностранными клиентами в Анталии. Пишите в WhatsApp на родном языке — мы поймём каждую деталь вашего заказа.'],
              ['🧥 Работаете ли вы с кожей и плотными тканями?',
               'Да, у нас профессиональное оборудование для кожаных курток, дублёнок, пальто и плотного денима.'],
            ].map(([q, a]) => (
              <div key={q} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DETAYLI ADRES VE HARİTA ──────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 pb-24" aria-labelledby="contact-h">
          <h2 id="contact-h" className="sr-only">Контакты и расположение</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">

            <div className="p-6 md:p-10 md:col-span-5 bg-slate-900 text-white flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-amber-400">Terzi Can</h3>
                  <p className="text-xs text-slate-400 mt-1">Официальный партнёр платформы SwapHubs</p>
                </div>

                <address className="space-y-3 text-sm text-slate-300 not-italic">
                  <p><strong>📍 Адрес:</strong> Kuşkavağı Mh. Atatürk Bulvarı, Konyaaltı / Antalya</p>
                  <p><strong>⏰ Режим работы:</strong> Пн–Сб 09:00–19:00 (Вс — выходной)</p>
                  <p><strong>📞 Телефон:</strong> <a href={`tel:${PHONE_TEL}`} className="text-amber-400 hover:text-amber-300">{PHONE_DISPLAY}</a></p>
                </address>
              </div>

              <div className="pt-8 flex flex-col gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors group"
                >
                  Открыть в Google Maps <span className="transform group-hover:translate-x-1 transition-transform ml-1">→</span>
                </a>
                <a
                  href={WA_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors group"
                >
                  Написать в WhatsApp <span className="transform group-hover:translate-x-1 transition-transform ml-1">→</span>
                </a>
              </div>
            </div>

            {/* Gömülü harita + tıklanabilir kart */}
            <div className="md:col-span-7 bg-slate-100 min-h-[300px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.8!2d30.6322!3d36.8614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTerzi+Can+Konyaalti!5e0!3m2!1str!2str!4v1720000000000"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0, minHeight: 300 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Terzi Can — карта расположения ателье в Коньяалты"
                aria-label="Карта расположения ателье Terzi Can"
              />
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-white shadow-lg px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 flex items-center gap-2 hover:bg-slate-50 transition-colors"
              >
                📍 Открыть полную карту
              </a>
            </div>

          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
        <footer className="bg-slate-950 text-slate-500 py-8 border-t border-slate-900 text-center text-xs">
          <p>© {new Date().getFullYear()} SwapHubs & Terzi Can. Все права защищены.</p>
          <nav className="mt-3 flex justify-center gap-4 flex-wrap">
            <a href="/terzi" className="text-slate-600 hover:text-amber-400">Terzi Can (TR)</a>
            <a href="/online-tailor-service" className="text-slate-600 hover:text-amber-400">Online Tailor (EN)</a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-amber-400">Google Maps</a>
          </nav>
          <p className="mt-2 text-slate-700">Разработано в Анталии с заботой о вашей одежде.</p>
        </footer>
      </div>
    </>
  );
}
