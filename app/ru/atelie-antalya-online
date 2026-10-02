import type { Metadata, Viewport } from 'next';

// ─── CONSTANTS ────────────────────────────────────────────────────
const BASE_URL        = 'https://swaphubs.com';
const PAGE_URL        = `${BASE_URL}/ru/atelie-antalya-online`;
const PHONE_DISPLAY   = '+90 531 898 64 18';
const PHONE_TEL       = '+905318986418';
const WA_NUMBER       = '905318986418';
const GBP_NAME        = 'Konyaaltı Terzi - Terzi Dikim Tamir Tadilat';
const GBP_CID         = '1496201377277644027';
const MAPS_URL        = `https://www.google.com/maps?cid=${GBP_CID}`;
const MAPS_SHORT      = 'https://maps.app.goo.gl/i73c4xKZwr7uaSjbA';
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=Konyaalt%C4%B1+Terzi+-+Terzi+Dikim+Tamir+Tadilat&destination_place_id=ChIJ-4wVtTmTwxQRwDB9jfqqquoA`;
const MAPS_REVIEW     = 'https://search.google.com/local/writereview?placeid=ChIJ-4wVtTmTwxQRwDB9jfqqquoA';
const MAPS_EMBED      = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12763.2!2d30.7056!3d36.8841!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39339b5158cfb%3A0xeaaa1afa8df430c0!2sKonyaalt%C4%B1+Terzi+-+Terzi+Dikim+Tamir+Tadilat!5e0!3m2!1sru!2str!4v1';
const OG_IMAGE        = `${BASE_URL}/og-image.jpg`;
const TODAY           = new Date().toISOString().split('T')[0];
const WA = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = WA('Здравствуйте! Хочу узнать об услугах ателье (ремонт/пошив).');

// ─── VIEWPORT (Next.js 14+ Best Practice) ────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F2417',
};

// ─── METADATA ────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Ателье Анталия Коньяалты — Ремонт и Пошив Одежды | Terzi Can',
  description: 'Ателье в Коньяалты, Анталия. Ремонт одежды, подгонка, замена молнии, пошив на заказ. Говорим по-русски. Открыто Пн–Сб 09:00–19:00. ⭐4.9 (94 отзыва) ☎ +90 531 898 64 18',
  keywords: [
    'ателье анталия','ателье коньяалты','ремонт одежды анталия',
    'портной анталия говорит по-русски','замена молнии анталия',
    'укоротить брюки анталия','пошив на заказ анталия',
    'подгонка одежды анталия','химчистка анталия','глажка анталия',
    'выездной портной анталия','терзи коньяалты',
    'konyaaltı terzi rusça','antalya terzi rusça',
  ].join(', '),
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'ru': PAGE_URL,
      'tr': `${BASE_URL}/terzi`,
      'en': `${BASE_URL}/online-terzi-hizmeti`,
      'x-default': `${BASE_URL}/terzi`,
    },
  },
  openGraph: {
    title: 'Ателье Анталия Коньяалты — Ремонт и Пошив | Terzi Can',
    description: 'Ремонт одежды, подгонка, пошив на заказ. Говорим по-русски. Liman Mah., Коньяалты. ⭐4.9 ☎ +90 531 898 64 18',
    url: PAGE_URL, siteName: 'SwapHubs', locale: 'ru_RU', type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Ателье Terzi Can Коньяалты Анталия', type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ателье Коньяалты — Говорим по-русски | Terzi Can',
    description: 'Ремонт одежды, пошив, химчистка. Анталия. ☎ +90 531 898 64 18',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056',
    'ICBM': '36.8841, 30.7056',
  },
};

// ─── JSON-LD ─────────────────────────────────────────────────────
const jsonLd = {
  // ... (JSON-LD içeriğiniz aynı kalıyor, buraya dokunmadım çünkü kusursuz)
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': `${PAGE_URL}#business`,
      name: GBP_NAME,
      alternateName: ['Terzi Can','Ателье Коньяалты','Портной Анталья','Ремонт одежды Анталия'],
      description: 'Профессиональное ателье в Коньяалты, Анталия. Ремонт и пошив одежды, подгонка по фигуре, замена молнии, химчистка и глажка. Говорим по-русски.',
      url: PAGE_URL, telephone: PHONE_TEL, priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card',
      image: OG_IMAGE, hasMap: MAPS_URL,
      sameAs: [MAPS_SHORT, MAPS_URL, `${BASE_URL}/terzi`],
      address: { '@type': 'PostalAddress', streetAddress: 'Liman Mahallesi', addressLocality: 'Konyaaltı', addressRegion: 'Antalya', postalCode: '07070', addressCountry: 'TR' },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '19:00' }],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '94', bestRating: '5', worstRating: '1' },
      areaServed: ['Konyaaltı','Hurma','Liman','Sarısu','Lara','Belek','Kemer','Antalya'].map(n => ({ '@type': 'Place', name: n })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Услуги ателье',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Укорачивание брюк' }, price: '150', priceCurrency: 'TRY' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Замена молнии' }, price: '200', priceCurrency: 'TRY' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Подгонка по фигуре' }, price: '150', priceCurrency: 'TRY' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Пошив платья' }, price: '600', priceCurrency: 'TRY' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Химчистка' }, price: '300', priceCurrency: 'TRY' },
        ],
      },
      knowsLanguage: ['tr','ru','en'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Где находится ателье в Анталии?', acceptedAnswer: { '@type': 'Answer', text: 'Ателье Terzi Can находится в Liman Mahallesi, Коньяалты, Анталия. Нажмите «Маршрут» для навигации.' } },
        { '@type': 'Question', name: 'Говорят ли в ателье по-русски?', acceptedAnswer: { '@type': 'Answer', text: 'Да! Принимаем заказы на русском языке через WhatsApp. Пишите — ответим быстро.' } },
        { '@type': 'Question', name: 'Сколько стоит укоротить брюки в Анталии?', acceptedAnswer: { '@type': 'Answer', text: 'Укорачивание брюк от ₺150. Точную цену скажем по фото в WhatsApp.' } },
        { '@type': 'Question', name: 'Есть ли выездной портной?', acceptedAnswer: { '@type': 'Answer', text: 'Да, выездной портной работает по всей Анталии. Заберём вещи на дом или в отель.' } },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Terzi Can', item: `${BASE_URL}/terzi` },
        { '@type': 'ListItem', position: 3, name: 'Ателье на русском', item: PAGE_URL },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'Ателье Анталия Коньяалты — Говорим по-русски | Terzi Can',
      url: PAGE_URL, inLanguage: 'ru', dateModified: TODAY,
      about: { '@id': `${PAGE_URL}#business` },
    },
  ],
};

// ─── SERVICES DATA ────────────────────────────────────────────────
const SERVICES = [
  { icon: '✂️', name: 'Укорачивание брюк', desc: 'Подгибка брюк, джинсов, юбок и платьев точно по вашей фигуре.', price: 'от ₺150', time: 'В тот же день' },
  { icon: '🔒', name: 'Замена молнии', desc: 'Молнии на куртках, джинсах, сумках, платьях. Быстро и качественно.', price: 'от ₺200', time: 'В тот же день' },
  { icon: '📐', name: 'Подгонка по фигуре', desc: 'Заужение платья, брюк, пиджака. Идеальная посадка гарантирована.', price: 'от ₺150', time: '1–2 дня' },
  { icon: '🧥', name: 'Кожа и плотные ткани', desc: 'Кожаные куртки, дублёнки, пальто, плотный деним — берёмся за всё.', price: 'от ₺250', time: '1–2 дня' },
  { icon: '👗', name: 'Пошив на заказ', desc: 'Платья, блузки, брюки по вашим меркам и эскизам. Любые ткани.', price: 'от ₺600', time: '3–7 дней' },
  { icon: '🧺', name: 'Химчистка и глажка', desc: 'Профессиональная стирка, химчистка, отпаривание, глажка.', price: 'от ₺80', time: '1–2 дня' },
  { icon: '🚗', name: 'Выездной портной', desc: 'Заберём вещи на дом или в отель, привезём обратно за 24 часа.', price: 'Бесплатно', time: '24 часа' },
  { icon: '🏨', name: 'Пошив формы', desc: 'Гостиничная форма, ресторанная, медицинская, школьная. Опт.', price: 'По запросу', time: 'По договору' },
];

const FAQS = [
  { q: '📍 Где находится ателье?', a: `Ателье «${GBP_NAME}» в Liman Mahallesi, Коньяалты, Анталия. Нажмите «Маршрут» — откроется Google Maps с точным местоположением.` },
  { q: '💬 Говорите ли вы по-русски?', a: 'Да! Работаем с русскоязычными клиентами через WhatsApp. Пишите на родном языке — ответим быстро.' },
  { q: '⏱️ Как быстро выполняется ремонт?', a: 'Простой ремонт (укорачивание, замена молнии) — несколько часов или 1 день. Сложная подгонка — 1-2 дня. Пошив — 3-7 дней.' },
  { q: '🚗 Есть ли выездной портной?', a: 'Да! Забираем вещи на дом или в отель по всей Анталии. Привозим готовое обратно за 24 часа.' },
  { q: '💰 Сколько стоит укоротить брюки?', a: 'От ₺150. Пришлите фото в WhatsApp — скажем точную цену за несколько минут.' },
];

// ─── PAGE ────────────────────────────────────────────────────────
export default function RuAtelieAntalyaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main style={{ minHeight: '100vh', fontFamily: 'system-ui,-apple-system,sans-serif', background: '#F8F7F4', color: '#1A1A1A', overflowX: 'hidden' }}>
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0}
          @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
          .fu{animation:fadeUp .5s ease both}
          .fu2{animation:fadeUp .5s .1s ease both}
          .fu3{animation:fadeUp .5s .2s ease both}
          .btn{transition:transform .15s,box-shadow .15s;cursor:pointer}
          .btn:hover{transform:translateY(-2px)}
          .btn:active{transform:scale(.97)}
          .card{transition:transform .2s,box-shadow .2s}
          .card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.1)}
          a{text-decoration:none;color:inherit}
          .maps-hover:hover .maps-overlay{opacity:1!important}
        `}</style>

        {/* ── TOP NAV (SEO Crawlability & UX) ── */}
        <nav style={{ background: '#0F2417', color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'center', gap: '16px', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <a href="/" style={{ opacity: 0.8 }} className="btn">← Главная (SwapHubs)</a>
          <span style={{ opacity: 0.3 }}>|</span>
          <a href="/terzi" style={{ opacity: 0.8 }} className="btn">🇹🇷 Türkçe Site</a>
        </nav>

        {/* ── TRUST BAR ── */}
        <div style={{ background: '#0F2417', color: '#4ADE80', fontSize: 11, fontWeight: 700, padding: '9px 16px', textAlign: 'center', letterSpacing: .5 }}>
          🌍 Говорим по-русски &nbsp;·&nbsp; ⭐ 4.9 (94 отзыва) &nbsp;·&nbsp; 📍 Коньяалты, Анталия &nbsp;·&nbsp; Пн–Сб 09:00–19:00
        </div>

        {/* ── HERO ── */}
        <header style={{ background: 'linear-gradient(150deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)', padding: '56px 20px 72px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 75% 25%,rgba(74,222,128,.06) 0%,transparent 50%)',pointerEvents:'none' }} />
          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
            <span className="fu" style={{ display:'inline-block',background:'rgba(74,222,128,.12)',border:'1px solid rgba(74,222,128,.3)',color:'#4ADE80',fontSize:11,fontWeight:700,padding:'5px 16px',borderRadius:20,letterSpacing:1,marginBottom:20,textTransform:'uppercase' }}>
              ✨ Профессиональное Ателье — Говорим по-русски
            </span>

            <h1 className="fu2" style={{ fontSize:'clamp(28px,5vw,48px)',fontWeight:900,color:'#fff',lineHeight:1.15,marginBottom:14 }}>
              Ателье в Анталии<br />
              <span style={{ color:'#4ADE80' }}>Ремонт и Пошив Одежды</span>
            </h1>

            <p className="fu3" style={{ fontSize:15,color:'rgba(255,255,255,.7)',lineHeight:1.8,marginBottom:32,maxWidth:520,margin:'0 auto 32px' }}>
              Ремонт одежды · Подгонка по фигуре · Замена молнии<br />
              Пошив на заказ · Химчистка · Выездной портной в Коньяалты
            </p>

            {/* 3 главных кнопки */}
            <div className="fu3" style={{ display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap',marginBottom:28 }}>
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn"
                style={{ display:'inline-flex',alignItems:'center',gap:8,background:'#25D366',color:'#fff',padding:'14px 22px',borderRadius:14,fontSize:14,fontWeight:800,boxShadow:'0 6px 20px rgba(37,211,102,.4)' }}>
                💬 Написать в WhatsApp
              </a>
              <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn"
                style={{ display:'inline-flex',alignItems:'center',gap:8,background:'#1A73E8',color:'#fff',padding:'14px 22px',borderRadius:14,fontSize:14,fontWeight:800,boxShadow:'0 6px 20px rgba(26,115,232,.4)' }}>
                🗺️ Маршрут
              </a>
              <a href={`tel:${PHONE_TEL}`} className="btn"
                style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,.12)',color:'#fff',border:'1px solid rgba(255,255,255,.25)',padding:'14px 22px',borderRadius:14,fontSize:14,fontWeight:700 }}>
                📞 Позвонить
              </a>
            </div>

            {/* Рейтинг */}
            <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontSize:13,color:'rgba(255,255,255,.6)' }}>
              <span style={{ color:'#FACC15',fontSize:17 }}>★★★★★</span>
              <strong style={{ color:'#fff' }}>4.9</strong>
              <span>· 94 отзыва</span>
            </div>
          </div>
        </header>

        {/* ── GOOGLE MAPS LISTING CARD ── */}
        <section style={{ padding:'0 16px', maxWidth:680, margin:'-32px auto 0', position:'relative', zIndex:10 }}>
          <div style={{ background:'#fff',borderRadius:20,boxShadow:'0 8px 40px rgba(0,0,0,.15)',border:'1px solid #E5E7EB',overflow:'hidden' }}>
            <div style={{ padding:'18px 20px 14px', borderBottom:'1px solid #F3F4F6' }}>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:6 }}>
                <div>
                  <h2 style={{ fontSize:18,fontWeight:800,color:'#111',lineHeight:1.2,marginBottom:4 }}>{GBP_NAME}</h2>
                  <p style={{ fontSize:12,color:'#6B7280' }}>Ателье · Коньяалты, Анталия</p>
                </div>
                <span style={{ flexShrink:0,background:'#DCFCE7',color:'#166534',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:20 }}>● Открыто</span>
              </div>
              <div style={{ display:'flex',alignItems:'center',gap:6,fontSize:13,color:'#6B7280' }}>
                <span style={{ color:'#FACC15',fontWeight:700 }}>★ 4.9</span>
                <span>(94 отзыва)</span>
                <span>·</span>
                <span>Liman Mah., Коньяалты</span>
              </div>
            </div>

            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,padding:'12px 16px',borderBottom:'1px solid #F3F4F6' }}>
              {[
                { href:MAPS_DIRECTIONS,bg:'#1A73E8',icon:'🧭',label:'Маршрут' },
                { href:MAPS_URL,bg:'#1C1C1E',icon:'🗺️',label:'На карте' },
                { href:MAPS_REVIEW,bg:'#F59E0B',icon:'⭐',label:'Отзыв' },
              ].map(b => (
                <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" className="btn"
                  style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,background:b.bg,color:'#fff',padding:'12px 8px',borderRadius:12,fontSize:11,fontWeight:700,textAlign:'center' }}>
                  <span style={{ fontSize:20 }}>{b.icon}</span>
                  <span>{b.label}</span>
                </a>
              ))}
            </div>

            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="maps-hover" style={{ display:'block',position:'relative',height:220 }}>
              <iframe
                src={MAPS_EMBED}
                width="100%" height="220"
                style={{ border:0,display:'block',pointerEvents:'none' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${GBP_NAME} — карта расположения`}
              />
              <div className="maps-overlay" style={{ position:'absolute',inset:0,background:'rgba(0,0,0,0)',display:'flex',alignItems:'flex-end',justifyContent:'center',paddingBottom:10,opacity:0,transition:'opacity .2s' }}>
                <span style={{ background:'rgba(255,255,255,.95)',padding:'6px 16px',borderRadius:20,fontSize:12,fontWeight:700,color:'#111',boxShadow:'0 2px 8px rgba(0,0,0,.2)' }}>
                  📍 Открыть полную карту →
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* ── SEO & ABOUT CONTENT (YENİ EKLENDİ - GOOGLE İÇİN ÇOK ÖNEMLİ) ── */}
        <section style={{ padding: '52px 16px 20px', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #E8E4DC', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 16 }}>Русскоговорящий портной в Коньяалты (Анталия)</h2>
            <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7, marginBottom: 16 }}>
              Ищете профессиональное <strong>ателье в Анталии</strong>, где вас поймут с полуслова? <b>Terzi Can</b> — это надежное ателье по ремонту и пошиву одежды, расположенное в самом сердце района Коньяалты (Лиман, Хурма, Сарысу). Мы гордимся тем, что предоставляем высококачественный сервис для местных жителей и экспатов. Вам больше не нужно переживать о языковом барьере: мы свободно общаемся с нашими клиентами на русском языке через WhatsApp.
            </p>
            <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7 }}>
              Наша команда мастеров выполняет любые задачи: от срочного укорачивания джинсов и замены сломанной молнии до сложной подгонки вечерних платьев и мужских костюмов по фигуре. Мы работаем с деликатными тканями, кожей и плотным денимом. Кроме того, мы предлагаем уникальную услугу — <em>выездной портной в Анталии</em>. Мы сами приедем к вам домой или в отель, заберем вещи на ремонт или в химчистку, и вернем их в идеальном состоянии уже на следующий день.
            </p>
          </div>
        </section>

        {/* ── УСЛУГИ ── */}
        <section style={{ padding:'32px 16px',maxWidth:800,margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:32 }}>
            <h2 style={{ fontSize:26,fontWeight:800,color:'#111',marginBottom:8 }}>Наши услуги</h2>
            <p style={{ fontSize:13,color:'#6B7280' }}>Профессиональный ремонт и пошив одежды для русскоязычных клиентов</p>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))',gap:12 }}>
            {SERVICES.map(s => (
              <div key={s.name} className="card" style={{ background:'#fff',borderRadius:16,padding:'18px 14px',border:'1px solid #E8E4DC' }}>
                <div style={{ fontSize:28,marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontSize:13,fontWeight:700,color:'#111',marginBottom:4,lineHeight:1.3 }}>{s.name}</div>
                <div style={{ fontSize:11,color:'#6B7280',lineHeight:1.5,marginBottom:8 }}>{s.desc}</div>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                  <span style={{ fontSize:12,fontWeight:800,color:'#16A34A' }}>{s.price}</span>
                  <span style={{ fontSize:10,color:'#9CA3AF' }}>{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── КАК ЭТО РАБОТАЕТ ── */}
        <section style={{ padding:'48px 16px',background:'#111827',color:'#fff' }}>
          <div style={{ maxWidth:700,margin:'0 auto',textAlign:'center' }}>
            <h2 style={{ fontSize:24,fontWeight:800,marginBottom:8 }}>Как это работает?</h2>
            <p style={{ fontSize:13,color:'rgba(255,255,255,.6)',marginBottom:32 }}>3 простых шага к идеальной одежде</p>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:16 }}>
              {[
                { n:'1',t:'Напишите нам',d:'WhatsApp или звонок — опишите задачу, получите цену за несколько минут.' },
                { n:'2',t:'Принесите или закажите выезд',d:'Приезжайте в ателье или закажите выездного портного на дом.' },
                { n:'3',t:'Готово!',d:'Вещь готова в срок, сидит идеально. Гарантия качества.' },
              ].map(s => (
                <div key={s.n} style={{ background:'rgba(255,255,255,.06)',borderRadius:16,padding:'22px 16px',border:'1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ width:40,height:40,borderRadius:'50%',background:'#16A34A',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:18,margin:'0 auto 14px' }}>{s.n}</div>
                  <div style={{ fontSize:14,fontWeight:700,marginBottom:8 }}>{s.t}</div>
                  <div style={{ fontSize:12,color:'rgba(255,255,255,.55)',lineHeight:1.6 }}>{s.d}</div>
                </div>
              ))}
            </div>
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn"
              style={{ display:'inline-flex',alignItems:'center',gap:10,background:'#25D366',color:'#fff',padding:'16px 32px',borderRadius:28,fontSize:15,fontWeight:800,marginTop:32,boxShadow:'0 6px 24px rgba(37,211,102,.35)' }}>
              💬 Написать в WhatsApp
            </a>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding:'48px 16px',maxWidth:680,margin:'0 auto' }}>
          <h2 style={{ fontSize:22,fontWeight:800,color:'#111',textAlign:'center',marginBottom:24 }}>Часто задаваемые вопросы</h2>
          <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
            {FAQS.map(f => (
              <div key={f.q} style={{ background:'#fff',borderRadius:14,padding:'16px 18px',border:'1px solid #E8E4DC' }}>
                <div style={{ fontSize:14,fontWeight:700,color:'#111',marginBottom:6 }}>{f.q}</div>
                <div style={{ fontSize:13,color:'#6B7280',lineHeight:1.65 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding:'48px 16px',background:'#064E3B',textAlign:'center' }}>
          <div style={{ maxWidth:560,margin:'0 auto' }}>
            <h2 style={{ fontSize:24,fontWeight:800,color:'#fff',marginBottom:12 }}>Ваша одежда будет готова в срок</h2>
            <p style={{ fontSize:14,color:'rgba(255,255,255,.7)',marginBottom:28 }}>Пришлите фото в WhatsApp — узнайте цену за несколько минут</p>
            <div style={{ display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap' }}>
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn"
                style={{ display:'inline-flex',alignItems:'center',gap:8,background:'#25D366',color:'#fff',padding:'14px 28px',borderRadius:28,fontSize:15,fontWeight:800,boxShadow:'0 6px 20px rgba(37,211,102,.4)' }}>
                💬 WhatsApp
              </a>
              <a href={`tel:${PHONE_TEL}`} className="btn"
                style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,.12)',color:'#fff',border:'1px solid rgba(255,255,255,.3)',padding:'14px 24px',borderRadius:28,fontSize:15,fontWeight:700 }}>
                📞 {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background:'#080808',padding:'24px 16px',textAlign:'center',fontSize:11,color:'rgba(255,255,255,.3)',borderTop:'1px solid rgba(255,255,255,.06)' }}>
          <p>© {new Date().getFullYear()} SwapHubs · {GBP_NAME}</p>
          <div style={{ display:'flex',justifyContent:'center',gap:16,marginTop:10,flexWrap:'wrap' }}>
            <a href="/terzi" style={{ color:'rgba(255,255,255,.4)' }}>Terzi Can (TR)</a>
            <a href="/online-terzi-hizmeti" style={{ color:'rgba(255,255,255,.4)' }}>Online Terzi (TR)</a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ color:'rgba(255,255,255,.4)' }}>Google Maps</a>
          </div>
        </footer>

        {/* Floating buttons */}
        <div style={{ position:'fixed',bottom:20,right:16,zIndex:100,display:'flex',flexDirection:'column',gap:10 }}>
          <a href={`tel:${PHONE_TEL}`} className="btn" style={{ width:52,height:52,borderRadius:'50%',background:'#1C1C1E',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,boxShadow:'0 4px 16px rgba(0,0,0,.3)' }}>📞</a>
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn" style={{ width:52,height:52,borderRadius:'50%',background:'#25D366',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,boxShadow:'0 4px 16px rgba(37,211,102,.45)' }}>💬</a>
        </div>
      </main>
    </>
  );
}
