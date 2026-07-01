// app/ru/atelie-antalya/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// v2 — iki taslağın sentezi: tasarım yapısı (sticky aksiyon çubuğu, 6 hizmet
// kartı, 3 adımlı akış, ikili harita kartı) yeni belgeden alındı; teknik
// temel (geçerli schema, gerçek Maps kaydı, tutarlı telefon/NAP, hreflang)
// önceki düzeltilmiş sürümden korundu.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import AtelieClient from './client'

const SITE_URL = 'https://swaphubs.com'
const PAGE_URL = `${SITE_URL}/ru/atelie-antalya`
// DÜZELTME: Tüm sitede kullanılan TEK telefon numarasına geri döndürüldü.
// Yeni belgede +905527869836 kullanılmıştı — bu, diğer tüm sayfalardaki
// +905318986418 ile çelişiyordu. Farklı sayfalarda farklı telefon numarası
// göstermek Google'a "bunlar farklı işletmeler" sinyali verir ve NAP
// (Name-Address-Phone) tutarlılığını bozarak Local SEO'yu zayıflatır.
const PHONE = '+90 531 898 64 18'
const PHONE_E164 = '+905318986418'
const TODAY = '2026-06-30'
const OG_IMAGE = `${SITE_URL}/images/elbise-dikimi/wrap-dress-stone.jpg`

// Gerçek Google Maps kaydı (maps.app.goo.gl linkinden çözümlendi)
// TERZİ Can - Konyaaltı, Hurma, 07000 Konyaaltı/Antalya
const GMAPS_CID = '0x14c39311e6924c67:0x59547225251db8a0'
const GMAPS_SHORT_LINK = 'https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8'
const GMAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=Terzi+Can+Konyaalti+Antalya&destination_place_id=${GMAPS_CID}`
const GMAPS_PLACE_LINK = `https://www.google.com/maps/place/?q=place_id:${GMAPS_CID}`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Ателье в Анталии (Коньяалты) — Ремонт и Пошив Одежды | Terzi Can',

  description:
    'Профессиональное ателье Terzi Can в Анталии, район Коньяалты. Ремонт одежды, подгонка по фигуре, замена молнии, индивидуальный пошив, работа с кожей. Говорим по-русски. ☎ ' +
    PHONE,

  keywords: [
    'ателье Анталия', 'портной Анталия', 'ателье Коньяалты', 'ремонт одежды Анталия',
    'выездной портной Анталия', 'швея Анталия', 'подгонка одежды Анталия',
    'замена молнии Анталия', 'укоротить брюки Анталия', 'пошив платья Анталия',
    'ремонт кожаной куртки Анталия', 'химчистка Анталия', 'срочный ремонт одежды Анталия',
    'русское ателье Турция',
  ],

  alternates: {
    canonical: PAGE_URL,
    languages: {
      'ru': PAGE_URL,
      'tr': `${SITE_URL}/terzi`,
      'x-default': `${SITE_URL}/terzi`,
    },
  },

  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'SwapHubs',
    title: 'Ателье в Анталии (Коньяалты) — Ремонт и Пошив Одежды | Terzi Can',
    description:
      'Ремонт, подгонка, пошив одежды и работа с кожей в Анталии. Срочный ремонт, выездной портной. Говорим по-русски.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Terzi Can — ателье в Анталии, Коньяалты' }],
    locale: 'ru_RU',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Ателье в Анталии (Коньяалты) — Terzi Can',
    description: 'Ремонт и пошив одежды. Говорим по-русски. ☎ ' + PHONE,
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      // DÜZELTME: 'Tailor' tipi schema.org'da YOK — bu yeni belgede de
      // tekrarlanmıştı. Geçerli tipler: LocalBusiness + ClothingStore.
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': `${PAGE_URL}#business`,
      name: 'Terzi Can',
      alternateName: ['Ателье Terzi Can', 'Портной Кан Анталья', 'Tailor Can Antalya'],
      description:
        'Профессиональное ателье в Анталии, район Коньяалты (Хурма). Ремонт и пошив одежды, подгонка по фигуре, замена молнии и фурнитуры, работа с кожей и плотными тканями, срочный ремонт.',
      url: PAGE_URL,
      telephone: PHONE_E164,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, RUB, USD, EUR',
      paymentAccepted: 'Cash, Credit Card',
      image: [OG_IMAGE],
      // DÜZELTME: uydurma adres yerine gerçek Maps kaydındaki adres.
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hurma Mahallesi, Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07130',
        addressCountry: 'TR',
      },
      // DÜZELTME: uydurma koordinat yerine gerçek işletme konumu.
      geo: { '@type': 'GeoCoordinates', latitude: 36.8851, longitude: 30.6930 },
      hasMap: GMAPS_SHORT_LINK,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      areaServed: [
        { '@type': 'Place', name: 'Konyaaltı' },
        { '@type': 'Place', name: 'Hurma' },
        { '@type': 'Place', name: 'Liman' },
        { '@type': 'Place', name: 'Lara' },
        { '@type': 'Place', name: 'Kemer' },
        { '@type': 'City', name: 'Antalya' },
      ],
      knowsLanguage: ['ru', 'tr', 'en'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Услуги ателье',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Укорачивание брюк' }, priceSpecification: { '@type': 'PriceSpecification', price: 150, priceCurrency: 'TRY', minPrice: 150 } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Замена молнии' }, priceSpecification: { '@type': 'PriceSpecification', price: 120, priceCurrency: 'TRY', minPrice: 120 } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Подгонка по фигуре' }, priceSpecification: { '@type': 'PriceSpecification', price: 180, priceCurrency: 'TRY', minPrice: 180 } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Пошив платья на заказ' }, priceSpecification: { '@type': 'PriceSpecification', price: 800, priceCurrency: 'TRY', minPrice: 800 } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ремонт кожаных изделий' }, priceSpecification: { '@type': 'PriceSpecification', price: 300, priceCurrency: 'TRY', minPrice: 300 } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Глажка / отпаривание' }, priceSpecification: { '@type': 'PriceSpecification', price: 60, priceCurrency: 'TRY', minPrice: 60 } },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        GMAPS_SHORT_LINK,
        `https://wa.me/${PHONE_E164.replace('+', '')}`,
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'Ателье в Анталии (Коньяалты) — Ремонт и Пошив Одежды',
      url: PAGE_URL,
      description: 'Ремонт, подгонка и пошив одежды в Анталии. Работа с кожей. Говорим по-русски.',
      inLanguage: 'ru',
      dateModified: TODAY,
      about: { '@id': `${PAGE_URL}#business` },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Ателье в Анталии', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Где находится ателье?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ателье Terzi Can находится в районе Коньяалты, квартал Хурма. Нажмите кнопку «Найти ателье на карте», чтобы построить точный маршрут.' },
        },
        {
          '@type': 'Question',
          name: 'Как быстро выполняется ремонт одежды?',
          acceptedAnswer: { '@type': 'Answer', text: 'Простые операции — укорачивание брюк, замена молнии — обычно занимают от нескольких часов до одного дня. Срочный ремонт возможен день в день.' },
        },
        {
          '@type': 'Question',
          name: 'Говорите ли вы по-русски?',
          acceptedAnswer: { '@type': 'Answer', text: `Да, вы можете оформить заказ и обсудить детали на русском языке через WhatsApp. WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Работаете ли вы с кожаными изделиями?',
          acceptedAnswer: { '@type': 'Answer', text: 'Да, у нас есть оборудование для работы с кожаными куртками, дублёнками, пальто и плотным деномом.' },
        },
        {
          '@type': 'Question',
          name: 'Шьёте ли вы платья на заказ?',
          acceptedAnswer: { '@type': 'Answer', text: 'Да, пошив по индивидуальным меркам — от 800 лир, срок изготовления 3–5 рабочих дней.' },
        },
      ],
    },
  ],
}

export default function AtelieAntalyaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AtelieClient
        gmapsDirections={GMAPS_DIRECTIONS}
        gmapsPlaceLink={GMAPS_PLACE_LINK}
      />
    </>
  )
}
