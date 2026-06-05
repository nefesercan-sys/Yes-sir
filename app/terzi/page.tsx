'use client';

import { useState } from 'react';

const PHONE = '905318986418';
type Lang = 'tr' | 'en' | 'ru';

// ═══════════════════════════════════════
// SEO SCHEMA — Google'ın okuyacağı yapısal veri
// ═══════════════════════════════════════
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://swaphubs.com/terzi",
      "name": "Antalya Terzi — Belek by Ercan",
      "alternateName": ["Antalya Tailor", "Портной Анталья", "Antalya Terzisi"],
      "description": "Antalya'nın en iyi terzisi. Özel dikim, gelinlik, damatlık, tadilat. Turistlere 24 saat hızlı hizmet. Türkçe, İngilizce, Rusça. Tailor in Antalya Turkey. Custom clothing, alterations, wedding dress. English and Russian spoken. Портной в Анталье. Пошив и ремонт одежды. Говорим по-русски.",
      "url": "https://swaphubs.com/terzi",
      "telephone": "+90 531 898 64 18",
      "priceRange": "₺₺",
      "image": "https://swaphubs.com/og-terzi.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Antalya",
        "addressRegion": "Antalya",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "36.8841",
        "longitude": "30.7056"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "hasMap": "https://maps.google.com/?q=Antalya+Terzi",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "94",
        "bestRating": "5"
      },
      "areaServed": [
        { "@type": "City", "name": "Antalya" },
        { "@type": "City", "name": "Lara" },
        { "@type": "City", "name": "Konyaaltı" },
        { "@type": "City", "name": "Belek" },
        { "@type": "City", "name": "Kemer" }
      ],
      "serviceType": [
        "Özel Dikim", "Tadilat", "Gelinlik", "Damatlık",
        "Custom Tailoring", "Alterations", "Wedding Dress",
        "Пошив одежды", "Ремонт одежды", "Свадебное платье"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Antalya'da terzi nerede bulunur?",
          "acceptedAnswer": { "@type": "Answer", "text": "Belek by Ercan, Antalya'nın merkezi konumunda hizmet vermektedir. WhatsApp +90 531 898 64 18 üzerinden ulaşabilir, Lara, Konyaaltı ve Belek bölgelerine teslimat alabilirsiniz." }
        },
        {
          "@type": "Question",
          "name": "Where can I find a tailor in Antalya?",
          "acceptedAnswer": { "@type": "Answer", "text": "Belek by Ercan offers professional tailoring services in Antalya. We speak English, Turkish and Russian. Contact us on WhatsApp +90 531 898 64 18 for fast 24-48 hour service." }
        },
        {
          "@type": "Question",
          "name": "Где найти портного в Анталье?",
          "acceptedAnswer": { "@type": "Answer", "text": "Belek by Ercan — лучший портной в Анталье. Говорим по-русски. Пошив на заказ, ремонт и подгонка одежды. Доставка в отели Лары, Коньяалты и Белека. WhatsApp: +90 531 898 64 18." }
        },
        {
          "@type": "Question",
          "name": "Antalya'da gelinlik dikimi ne kadar sürer?",
          "acceptedAnswer": { "@type": "Answer", "text": "Gelinlik dikimi genellikle 3-7 gün sürmektedir. Tadilat ve basit düzenlemeler 24-48 saat içinde tamamlanmaktadır." }
        },
        {
          "@type": "Question",
          "name": "Antalya terzisi fiyatları ne kadar?",
          "acceptedAnswer": { "@type": "Answer", "text": "Tadilat ₺80'den başlar, özel dikim ₺500'den, gelinlik ₺2.000'den başlamaktadır. Ücretsiz fiyat teklifi için WhatsApp'tan ulaşın." }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "SwapHubs", "item": "https://swaphubs.com" },
        { "@type": "ListItem", "position": 2, "name": "Terzi Antalya", "item": "https://swaphubs.com/terzi" }
      ]
    }
  ]
};

// ═══════════════════════════════════════
// İÇERİK — 3 DİL
// ═══════════════════════════════════════
const C = {
  tr: {
    badge: '✂ Antalya · Belek by Ercan',
    h1: 'Antalya\'nın',
    h1em: 'Terzisi',
    sub: 'Özel Dikim · Tadilat · Gelinlik · Damatlık · Hızlı Teslimat',
    waBtn: 'WhatsApp\'tan Yazın',
    downBtn: 'Hizmetleri Gör ↓',
    waMsg: 'Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.',
    s1: 'Hizmetlerimiz', s1t: 'Ne Yapıyoruz?',
    s2: 'Turistlere Özel', s2t: 'Neden Bizi\nSeçmelisiniz?',
    s3: 'Sık Sorulan Sorular',
    s4: 'Müşteri Yorumları',
    s5: 'Hizmet Bölgeleri',
    s6: 'İletişim', s6t: 'Bize Ulaşın',
    s6sub: 'WhatsApp\'tan mesaj atın, hemen yanıt verelim',
    waLabel: 'WhatsApp\'tan Yaz',
    mapLabel: 'Haritada Bul',
    seoText: 'Antalya\'nın en deneyimli terzisi Belek by Ercan olarak özel dikim, tadilat, gelinlik ve damatlık hizmetleri sunuyoruz. Lara, Konyaaltı, Belek, Kemer ve tüm Antalya genelinde hizmet veriyoruz. Turistlere özel 24-48 saat hızlı hizmet, otele teslimat ve 3 dilde iletişim imkânı sunuyoruz.',
    areas: ['Lara', 'Konyaaltı', 'Belek', 'Kemer', 'Muratpaşa', 'Kepez', 'Alanya', 'Side'],
    faq: [
      { q: 'Antalya\'da terzi nerede bulunur?', a: 'Belek by Ercan olarak Antalya merkezi ve çevresinde hizmet veriyoruz. WhatsApp\'tan ulaşın, adresimizi paylaşalım.' },
      { q: 'Gelinlik dikimi ne kadar sürer?', a: 'Gelinlik dikimi 3-7 gün, tadilat ve düzenlemeler 24-48 saat içinde tamamlanır.' },
      { q: 'Fiyatlar ne kadar?', a: 'Tadilat ₺80\'den, özel dikim ₺500\'den, gelinlik ₺2.000\'den başlar. Ücretsiz teklif için yazın.' },
      { q: 'Otele teslimat yapıyor musunuz?', a: 'Evet! Lara, Konyaaltı, Belek ve Kemer bölgelerindeki otellere teslimat yapıyoruz.' },
      { q: 'Rusça ve İngilizce biliyor musunuz?', a: 'Evet, Türkçe, İngilizce ve Rusça hizmet veriyoruz. Dil engeli yok.' },
    ],
  },
  en: {
    badge: '✂ Antalya · Belek by Ercan',
    h1: 'Antalya\'s',
    h1em: 'Master Tailor',
    sub: 'Custom Tailoring · Alterations · Wedding Dress · Suits · Fast Delivery',
    waBtn: 'WhatsApp Us Now',
    downBtn: 'View Services ↓',
    waMsg: 'Hello, I would like to get information about your tailoring service.',
    s1: 'Services', s1t: 'What We Offer',
    s2: 'For Tourists', s2t: 'Why Choose\nUs?',
    s3: 'Frequently Asked Questions',
    s4: 'Customer Reviews',
    s5: 'Service Areas',
    s6: 'Contact', s6t: 'Get in Touch',
    s6sub: 'Send a WhatsApp message, we\'ll reply right away',
    waLabel: 'Chat on WhatsApp',
    mapLabel: 'Find on Map',
    seoText: 'Belek by Ercan is Antalya\'s most experienced tailor, offering custom clothing, alterations, wedding dresses and suits. We serve tourists across Lara, Konyaaltı, Belek, Kemer and all of Antalya. Express 24-48 hour service, hotel delivery, and communication in 3 languages.',
    areas: ['Lara', 'Konyaaltı', 'Belek', 'Kemer', 'Muratpaşa', 'Kepez', 'Alanya', 'Side'],
    faq: [
      { q: 'Where can I find a tailor in Antalya?', a: 'Belek by Ercan serves central Antalya and surrounding areas. Contact us on WhatsApp and we\'ll share our address.' },
      { q: 'How long does a wedding dress take?', a: 'Wedding dresses take 3-7 days. Alterations and adjustments are completed in 24-48 hours.' },
      { q: 'What are the prices?', a: 'Alterations from ₺80, custom clothing from ₺500, wedding dresses from ₺2,000. Contact for free quote.' },
      { q: 'Do you deliver to hotels?', a: 'Yes! We deliver to hotels in Lara, Konyaaltı, Belek and Kemer.' },
      { q: 'Do you speak English?', a: 'Yes, we provide service in Turkish, English and Russian. No language barrier.' },
    ],
  },
  ru: {
    badge: '✂ Анталья · Belek by Ercan',
    h1: 'Лучший',
    h1em: 'Портной Антальи',
    sub: 'Пошив на заказ · Ремонт · Свадебное платье · Костюмы · Быстро',
    waBtn: 'Написать в WhatsApp',
    downBtn: 'Смотреть услуги ↓',
    waMsg: 'Здравствуйте, я хотел бы узнать о ваших услугах портного.',
    s1: 'Услуги', s1t: 'Что мы предлагаем',
    s2: 'Для туристов', s2t: 'Почему\nвыбирают нас?',
    s3: 'Часто задаваемые вопросы',
    s4: 'Отзывы клиентов',
    s5: 'Районы обслуживания',
    s6: 'Контакты', s6t: 'Связаться с нами',
    s6sub: 'Напишите в WhatsApp, ответим сразу',
    waLabel: 'Написать в WhatsApp',
    mapLabel: 'Найти на карте',
    seoText: 'Belek by Ercan — опытный портной в Анталье. Пошив одежды на заказ, ремонт и подгонка, свадебные платья и костюмы. Обслуживаем туристов в Ларе, Коньяалты, Белеке, Кемере и по всей Анталье. Экспресс-сервис 24-48 часов, доставка в отель, общение на русском языке.',
    areas: ['Лара', 'Коньяалты', 'Белек', 'Кемер', 'Муратпаша', 'Kepez', 'Аланья', 'Сиде'],
    faq: [
      { q: 'Где найти портного в Анталье?', a: 'Belek by Ercan работает в центре Антальи и окрестностях. Напишите в WhatsApp, мы поделимся адресом.' },
      { q: 'Сколько времени занимает пошив свадебного платья?', a: 'Свадебное платье — 3-7 дней. Ремонт и подгонка — 24-48 часов.' },
      { q: 'Какие цены?', a: 'Ремонт от ₺80, пошив на заказ от ₺500, свадебное платье от ₺2000. Пишите для бесплатной оценки.' },
      { q: 'Есть ли доставка в отель?', a: 'Да! Доставляем в отели Лары, Коньяалты, Белека и Кемера.' },
      { q: 'Говорите ли вы по-русски?', a: 'Да, мы обслуживаем на турецком, английском и русском языках. Языкового барьера нет.' },
    ],
  },
};

const SERVICES = [
  {
    icon: '👗',
    img: '🧵',
    color: '#f5e6d3',
    names: ['Özel Dikim', 'Custom Clothing', 'Пошив на заказ'],
    descs: [
      'Ölçülerinize özel tasarım ve dikim. Her beden, her stil.',
      'Design and tailoring made to your exact measurements.',
      'Дизайн и пошив по вашим меркам. Любой размер, любой стиль.'
    ],
    price: '₺500+',
    tags: ['tr:Ölçü Alımı', 'tr:Özel Tasarım', 'tr:Her Beden'],
  },
  {
    icon: '✂️',
    img: '✂',
    color: '#d3e6f5',
    names: ['Tadilat & Onarım', 'Alterations', 'Ремонт одежды'],
    descs: [
      'Dar/geniş alma, kısaltma, fermuar, yırtık onarımı.',
      'Taking in/out, hemming, zippers, tears — all repairs.',
      'Подгонка по фигуре, укорочение, молнии, ремонт.'
    ],
    price: '₺80+',
    tags: ['tr:Hızlı Hizmet', 'tr:24 Saat', 'tr:Tüm Markalar'],
  },
  {
    icon: '💍',
    img: '👰',
    color: '#f5d3e6',
    names: ['Gelinlik & Abiye', 'Wedding Dress', 'Свадебное платье'],
    descs: [
      'Düğün, nişan, gece elbisesi dikimi ve gelinlik tadilatı.',
      'Wedding, engagement, evening gowns and bridal alterations.',
      'Свадебные, вечерние платья, пошив и ремонт.'
    ],
    price: '₺2.000+',
    tags: ['tr:Düğün Sezonu', 'tr:Özel Tasarım', 'tr:Prova Dahil'],
  },
  {
    icon: '👔',
    img: '🤵',
    color: '#d3f5e6',
    names: ['Takım Elbise', 'Suits & Shirts', 'Костюмы'],
    descs: [
      'Erkek takım elbise, gömlek, blazer dikim ve tadilat.',
      'Men\'s suits, shirts, blazers — custom made or altered.',
      'Мужские костюмы, рубашки, пиджаки — пошив и подгонка.'
    ],
    price: '₺1.500+',
    tags: ['tr:Klasik Kesim', 'tr:Modern Fit', 'tr:İş Toplantısı'],
  },
  {
    icon: '🧥',
    img: '🧣',
    color: '#e6d3f5',
    names: ['Kışlık Kıyafet', 'Winter Clothing', 'Зимняя одежда'],
    descs: [
      'Mont, kaban, palto dikimi ve astarı değiştirme.',
      'Coats, jackets, lining replacement and winter alterations.',
      'Пальто, куртки, замена подкладки.'
    ],
    price: '₺300+',
    tags: ['tr:Mont', 'tr:Kaban', 'tr:Astar'],
  },
  {
    icon: '🎭',
    img: '🎨',
    color: '#f5f3d3',
    names: ['Kostüm & Özel', 'Costumes & Special', 'Костюмы особые'],
    descs: [
      'Tiyatro, film, tema partisi kostüm tasarımı ve dikimi.',
      'Theater, film, theme party costumes and special wear.',
      'Театральные, киношные, тематические костюмы.'
    ],
    price: '₺400+',
    tags: ['tr:Tiyatro', 'tr:Film', 'tr:Parti'],
  },
];

const WHY = [
  { icon: '⚡', tr: ['24–48 Saat Teslimat', 'Tatildesiniz, beklemenize gerek yok. Ekspres hizmet, mükemmel uyum.'], en: ['24–48hr Express', 'You\'re on holiday — no waiting. Express service, perfect fit.'], ru: ['Готово за 24–48 часов', 'Вы в отпуске — не ждите. Экспресс-сервис, идеальная посадка.'] },
  { icon: '🌍', tr: ['3 Dilde Hizmet', 'Türkçe, İngilizce ve Rusça konuşuyoruz. Dil engeli yok.'], en: ['Service in 3 Languages', 'Turkish, English, Russian — no language barrier.'], ru: ['На 3 языках', 'Турецкий, английский, русский — без языкового барьера.'] },
  { icon: '🏨', tr: ['Otele Teslimat', 'Lara, Konyaaltı, Belek ve Kemer otellerine teslimat.'], en: ['Hotel Delivery', 'Delivering to Lara, Konyaaltı, Belek and Kemer hotels.'], ru: ['Доставка в отель', 'В отели Лары, Коньяалты, Белека и Кемера.'] },
  { icon: '💳', tr: ['Döviz Kabul', 'TL, Euro, Dolar ve Ruble kabul ediyoruz.'], en: ['Multi-Currency', 'We accept TL, Euro, Dollar and Ruble.'], ru: ['Валюта', 'Принимаем TL, евро, доллар и рубли.'] },
  { icon: '⭐', tr: ['94 Memnun Müşteri', 'Google\'da 4.9 yıldız. Antalya\'nın en çok tercih edilen terzisi.'], en: ['94 Happy Clients', '4.9 stars on Google. Antalya\'s most recommended tailor.'], ru: ['94 довольных клиента', '4.9 звезды на Google. Самый рекомендуемый портной Антальи.'] },
  { icon: '🎯', tr: ['Mükemmel Uyum', '30 yıllık deneyim. Her vücuda mükemmel oturum garantisi.'], en: ['Perfect Fit', '30 years experience. Perfect fit guaranteed for every body.'], ru: ['Идеальная посадка', '30 лет опыта. Гарантия идеальной посадки для любой фигуры.'] },
];

const REVIEWS = [
  { stars: 5, text: '"Amazing tailor in Antalya! I needed a dress altered in 24 hours before my gala dinner. Perfect fit, very professional service. Highly recommend to all tourists!"', author: 'Sarah M.', flag: '🇬🇧', city: 'London, UK', date: 'Mayıs 2024' },
  { stars: 5, text: '"Отличный портной! Сшил свадебное платье за 5 дней. Говорят по-русски, цены очень честные. Доставили прямо в отель в Белеке!"', author: 'Наталья К.', flag: '🇷🇺', city: 'Москва', date: 'Haziran 2024' },
  { stars: 5, text: '"Düğün öncesi gelinliğimi mükemmel şekilde teslim ettiler. Hızlı, kaliteli ve güler yüzlü hizmet. Kesinlikle tavsiye ederim!"', author: 'Elif Y.', flag: '🇹🇷', city: 'Antalya', date: 'Nisan 2024' },
  { stars: 5, text: '"Needed my suit altered for a business meeting. Done in 24 hours, fits perfectly. Best tailor in Antalya — speaks English!"', author: 'James T.', flag: '🇦🇺', city: 'Sydney, AU', date: 'Mart 2024' },
  { stars: 5, text: '"Невероятно быстро и качественно! Подогнали платье под мою фигуру за один день. Очень рекомендую всем русскоговорящим туристам!"', author: 'Ирина В.', flag: '🇷🇺', city: 'Санкт-Петербург', date: 'Temmuz 2024' },
];

export default function TerziPage() {
  const [lang, setLang] = useState<Lang>('tr');
  const c = C[lang];
  const li: Record<Lang, number> = { tr: 0, en: 1, ru: 2 };
  const idx = li[lang];

  const waLink = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

  return (
    <>
      {/* ═══ SCHEMA.ORG ═══ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div style={{ fontFamily: "'Outfit', sans-serif", background: '#faf8f4', minHeight: '100vh', color: '#2c2418' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
          .fu { animation: fadeUp 0.5s ease both; }
          .fu2 { animation: fadeUp 0.5s ease 0.1s both; }
          .fu3 { animation: fadeUp 0.5s ease 0.2s both; }
          .svc-card { transition: transform 0.2s, box-shadow 0.2s; }
          .svc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.1); }
          .faq-item { border-bottom: 1px solid #e8dcc8; }
          .faq-q { cursor: pointer; padding: 16px 0; display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 600; }
          .faq-a { font-size: 13px; color: #6b5a4a; line-height: 1.6; padding-bottom: 16px; }
          details summary { list-style: none; }
          details summary::-webkit-details-marker { display: none; }
          .area-tag { display: inline-block; margin: 4px; padding: 6px 14px; border-radius: 20px; background: rgba(184,149,74,0.1); border: 1px solid rgba(184,149,74,0.2); font-size: 12px; color: #8a6a2a; font-weight: 500; }
          .star { color: #f59e0b; }
        `}</style>

        {/* ── LANG BAR ── */}
        <div style={{ background: '#1c1814', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['tr','en','ru'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                cursor: 'pointer',
                border: `1px solid ${lang === l ? '#b8954a' : 'rgba(255,255,255,0.15)'}`,
                background: lang === l ? '#b8954a' : 'transparent',
                color: lang === l ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}>
                {l === 'tr' ? '🇹🇷 TR' : l === 'en' ? '🇬🇧 EN' : '🇷🇺 РУ'}
              </button>
            ))}
          </div>
          <a href={waLink(c.waMsg)} style={{ fontSize: 11, color: '#25d366', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ animation: 'pulse 2s infinite' }}>📲</span> WhatsApp
          </a>
        </div>

        {/* ── HERO ── */}
        <div style={{ background: 'linear-gradient(160deg, #1c1814 0%, #2c1f14 50%, #1a1208 100%)', padding: '60px 24px 52px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% -20%, rgba(184,149,74,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(184,149,74,0.5), transparent)' }} />

          <div className="fu" style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#b8954a', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ width: 20, height: 1, background: '#b8954a', display: 'inline-block' }} />
            {c.badge}
            <span style={{ width: 20, height: 1, background: '#b8954a', display: 'inline-block' }} />
          </div>

          <h1 className="fu2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 46, fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: 12, position: 'relative', letterSpacing: '-0.5px' }}>
            {c.h1}<br />
            <em style={{ color: '#d4af6e', fontStyle: 'italic' }}>{c.h1em}</em>
          </h1>

          <div className="fu3" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 10, letterSpacing: 0.5 }}>{c.sub}</div>

          {/* Dil göstergesi */}
          <div className="fu3" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
            {['🇹🇷 Türkçe','🇬🇧 English','🇷🇺 Русский'].map(l => (
              <span key={l} style={{ fontSize: 10, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(184,149,74,0.25)', background: 'rgba(184,149,74,0.06)', color: '#c9a86e', letterSpacing: 0.5 }}>{l}</span>
            ))}
          </div>

          {/* Rating */}
          <div className="fu3" style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 28, alignItems: 'center' }}>
            {'⭐⭐⭐⭐⭐'.split('').map((s,i) => <span key={i} className="star" style={{ fontSize: 14 }}>{s}</span>)}
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 700, marginLeft: 6 }}>4.9</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 2 }}>(94)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 340, margin: '0 auto', position: 'relative' }}>
            <a href={waLink(c.waMsg)} style={{ background: '#25d366', color: '#fff', borderRadius: 14, padding: '15px 24px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}>
              📲 {c.waBtn}
            </a>
            <a href="#services" style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '13px 24px', fontSize: 13, textDecoration: 'none', textAlign: 'center' }}>
              {c.downBtn}
            </a>
          </div>
        </div>

        {/* ── SEO METİN BLOĞU (Google için zengin içerik) ── */}
        <div style={{ background: '#fff', padding: '24px 20px', borderBottom: '1px solid #e8dcc8' }}>
          <p style={{ fontSize: 13, color: '#6b5a4a', lineHeight: 1.8, maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            {c.seoText}
          </p>
        </div>

        {/* ── HİZMETLER ── */}
        <section id="services" style={{ padding: '48px 20px', background: '#fff' }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s1}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#1c1814' }}>{c.s1t}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14, maxWidth: 700, margin: '0 auto' }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card" style={{ background: s.color, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 18, padding: '20px 14px', cursor: 'pointer' }}>
                <div style={{ fontSize: 32, marginBottom: 10, textAlign: 'center' }}>{s.icon}</div>
                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#1c1814', lineHeight: 1.3 }}>{s.names[idx]}</h3>
                <p style={{ fontSize: 11, color: '#6b5a4a', lineHeight: 1.5, marginBottom: 10 }}>{s.descs[idx]}</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#b8954a', background: 'rgba(255,255,255,0.6)', borderRadius: 8, padding: '3px 8px', display: 'inline-block' }}>{s.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEDEN BİZ ── */}
        <section style={{ padding: '48px 20px', background: '#f0ebe0' }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s2}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#1c1814', whiteSpace: 'pre-line' }}>{c.s2t}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 600, margin: '0 auto' }}>
            {WHY.map((w, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e0d4c0', borderRadius: 16, padding: '16px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#b8954a,#8a6a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{w.icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 3, color: '#1c1814' }}>{w[lang][0]}</div>
                  <div style={{ fontSize: 11, color: '#8a7060', lineHeight: 1.4 }}>{w[lang][1]}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MÜŞTERİ YORUMLARI ── */}
        <section style={{ padding: '48px 20px', background: '#1c1814' }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#d4af6e', marginBottom: 6 }}>⭐ 4.9 / 5.0</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#fff' }}>{c.s4}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 600, margin: '0 auto' }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontSize: 13, display: 'flex', gap: 1 }}>{'⭐'.repeat(r.stars)}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{r.date}</div>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 10 }}>{r.text}</p>
                <div style={{ fontSize: 11, color: '#d4af6e', fontWeight: 600 }}>{r.flag} {r.author} — {r.city}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SSS / FAQ ── */}
        <section style={{ padding: '48px 20px', background: '#fff' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>FAQ</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#1c1814' }}>{c.s3}</h2>
          </div>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            {c.faq.map((f, i) => (
              <details key={i} className="faq-item" style={{ marginBottom: 0 }}>
                <summary className="faq-q">
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1c1814', flex: 1, textAlign: 'left' }}>{f.q}</h3>
                  <span style={{ color: '#b8954a', fontSize: 18, flexShrink: 0, marginLeft: 8 }}>+</span>
                </summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ── HİZMET BÖLGELERİ ── */}
        <section style={{ padding: '40px 20px', background: '#f0ebe0', textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 8 }}>{c.s5}</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: '#1c1814', marginBottom: 20 }}>📍 Antalya</h2>
          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            {c.areas.map((a, i) => <span key={i} className="area-tag">{a}</span>)}
          </div>
        </section>

        {/* ── İLETİŞİM ── */}
        <section id="contact" style={{ padding: '48px 20px', background: '#faf8f4' }}>
          <div style={{ background: '#fff', border: '1px solid #e0d8c8', borderRadius: 24, padding: '28px 20px', textAlign: 'center', maxWidth: 480, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 8 }}>{c.s6}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{c.s6t}</h2>
            <p style={{ fontSize: 12, color: '#8a7060', marginBottom: 24 }}>{c.s6sub}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={waLink(c.waMsg)} style={{ background: '#25d366', color: '#fff', borderRadius: 14, padding: '15px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(37,211,102,0.25)' }}>
                📲 {c.waLabel}
              </a>
              <a href="https://maps.google.com/?q=Antalya+Terzi+Belek+Ercan" target="_blank" rel="noreferrer" style={{ background: 'transparent', color: '#2c2418', border: '1px solid #e0d8c8', borderRadius: 14, padding: 14, fontSize: 13, textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                📍 {c.mapLabel}
              </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
              {['🕐 09:00–19:00', '📍 Antalya', '⚡ 24–48h', '🌍 TR/EN/RU'].map(t => (
                <div key={t} style={{ fontSize: 11, color: '#8a7060', display: 'flex', alignItems: 'center', gap: 3 }}>{t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STICKY CTA ── */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '10px 20px 20px', background: 'linear-gradient(to top, #faf8f4 70%, transparent)', zIndex: 50 }}>
          <a href={waLink(c.waMsg)} style={{ background: '#25d366', color: '#fff', borderRadius: 14, padding: '14px', fontSize: 14, fontWeight: 700, width: '100%', maxWidth: 480, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(37,211,102,0.35)', textDecoration: 'none' }}>
            📲 {c.waBtn}
          </a>
        </div>

      </div>
    </>
  );
}
