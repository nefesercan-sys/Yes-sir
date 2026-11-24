// app/ru/atelie-antalya/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// v2 — iki taslağın sentezi: tasarım yapısı (sticky aksiyon çubuğu, 6 hizmet
// kartı, 3 adımlı akış, ikili harita kartı) yeni belgeden alındı; teknik
// temel (geçerli schema, gerçek Maps kaydı, tutarlı telefon/NAP, hreflang)
// önceki düzeltilmiş sürümden korundu.
// ─────────────────────────────────────────────────────────────────────────────

import ReviewsBlock from '@/components/ReviewsBlock';
import { lastMod } from '@/lib/lastmod';
import OrnekGorselSeridi from '@/components/terzi/OrnekGorselSeridi';
import { reviewSchema } from '@/lib/reviews';
import type { Metadata } from 'next'
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import AtelieClient from './client'
import { jsonLdString, faqPageSchema } from '@/lib/json-ld';
import { FAQ_ITEMS } from './faq-data';

const SITE_URL = 'https://swaphubs.com'
const PAGE_URL = `${SITE_URL}/ru/atelie-antalya`
// DÜZELTME: Tüm sitede kullanılan TEK telefon numarasına geri döndürüldü.
// Yeni belgede +905527869836 kullanılmıştı — bu, diğer tüm sayfalardaki
// +905318986418 ile çelişiyordu. Farklı sayfalarda farklı telefon numarası
// göstermek Google'a "bunlar farklı işletmeler" sinyali verir ve NAP
// (Name-Address-Phone) tutarlılığını bozarak Local SEO'yu zayıflatır.
const PHONE = '+90 531 898 64 18'
const PHONE_E164 = '+905318986418'
const TODAY = lastMod('/ru/atelie-antalya', '2026-06-30')
const OG_IMAGE = `${SITE_URL}/images/elbise-dikimi/antalya-terzi-kruvaze-elbise-dikimi.jpg`

// Gerçek Google Maps kaydı (maps.app.goo.gl linkinden çözümlendi)
// TERZİ Can - Antalya Tailor Service, Hurma, 07000 Konyaaltı/Antalya
const GMAPS_SHORT_LINK = 'https://www.google.com/maps?cid=6436895271281342624'
const GMAPS_DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=36.8572868,30.5970193'
const GMAPS_PLACE_LINK = GMAPS_SHORT_LINK

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: { absolute: 'Ателье и швея в Анталии: подшив, ремонт одежды | Terzi Can' },

  description:
    'Ателье и швея в Анталии, Коньяалты: подшив от ₺200 (~€10), замена молнии от ₺300, кожа от ₺400, пошив. Забор и доставка из отеля. WhatsApp на вашем языке.',

  keywords: [
    'ателье Анталия', 'швея Анталия', 'ремонт одежды Анталия',
    'ателье Анталья', 'ателье рядом', 'ателье поблизости', 'швея рядом', 'ремонт одежды рядом', 'портной Анталья', 'ателье Коньяалты', 'ремонт одежды Анталья',
    'выездной портной Анталья', 'швея Анталья', 'подгонка одежды Анталья',
    'замена молнии Анталья', 'укоротить брюки Анталья', 'пошив платья Анталья',
    'ремонт кожаной куртки Анталья', 'срочный ремонт одежды Анталья',
    'русское ателье Турция',
  ],

  alternates: {
    canonical: PAGE_URL,
    languages: {
      'ru': PAGE_URL,
      'tr': `${SITE_URL}/terzi`,
      // en/de çevrimiçi hizmet sayfaları bu sayfayı karşılık göstermiyor (kendi kümeleri var): tek yönlü hreflang verilmez
      'x-default': `${SITE_URL}/terzi`,
    },
  },

  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'Terzi Can Antalya',
    title: 'Ателье в Анталье (Коньяалты) — Ремонт и Пошив Одежды | Terzi Can',
    description:
      'Ремонт, подгонка, пошив одежды и работа с кожей в Анталье. Срочный ремонт, выездной портной. WhatsApp на вашем языке.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Terzi Can — ателье в Анталье, Коньяалты' }],
    locale: 'ru_RU',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Ателье в Анталье (Коньяалты) — Terzi Can',
    description: 'Ремонт и пошив одежды. WhatsApp на вашем языке.',
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
      '@type': 'LocalBusiness',
      ...reviewSchema(),
      '@id': `${PAGE_URL}#business`,
      name: 'TERZİ Can - Antalya Tailor Service',
      alternateName: ['Ателье Terzi Can', 'Портной Кан Анталья', 'Tailor Can Antalya'],
      description:
        'Профессиональное ателье в Анталье, район Коньяалты (Хурма). Ремонт и пошив одежды, подгонка по фигуре, замена молнии и фурнитуры, работа с кожей и плотными тканями, срочный ремонт.',
      url: PAGE_URL,
      telephone: PHONE_E164,
      priceRange: '$$',
      currenciesAccepted: 'EUR, TRY',
      paymentAccepted: 'Cash, Credit Card',
      image: [OG_IMAGE],
      // DÜZELTME: uydurma adres yerine gerçek Maps kaydındaki adres.
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hurma Mahallesi',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07130',
        addressCountry: 'TR',
      },
      // DÜZELTME: uydurma koordinat yerine gerçek işletme konumu.
      geo: { '@type': 'GeoCoordinates', latitude: 36.8572868, longitude: 30.5970193 },
      hasMap: GMAPS_SHORT_LINK,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '23:00',
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
      knowsLanguage: ['ru', 'tr', 'en', 'de', 'pl', 'uk', 'nl', 'fr', 'es', 'ar'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Услуги ателье',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Укорачивание брюк' }, priceSpecification: { '@type': 'PriceSpecification', price: 10, priceCurrency: 'EUR', minPrice: 10 } },
        ],
      },
      // KALDIRILDI (2026-09): doğrulanamayan aggregateRating (4.9/94)
      sameAs: [
        GMAPS_SHORT_LINK,
        `https://wa.me/${PHONE_E164.replace('+', '')}`,
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'Ателье в Анталье (Коньяалты) — Ремонт и Пошив Одежды',
      url: PAGE_URL,
      description: 'Ремонт, подгонка и пошив одежды в Анталье. Работа с кожей. WhatsApp на вашем языке.',
      inLanguage: 'ru',
      dateModified: TODAY,
      about: { '@id': `${PAGE_URL}#business` },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Ателье в Анталье', item: PAGE_URL },
      ],
    },
    { ...faqPageSchema(FAQ_ITEMS.map((f) => [f.q, f.a] as const)), '@id': `${PAGE_URL}#faq` },
  ],
}

export default function AtelieAntalyaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <SpeakableSchema path="/ru/atelie-antalya" />
      <QuickActionBanner lang="ru" />
      <AtelieClient
        gmapsDirections={GMAPS_DIRECTIONS}
        gmapsPlaceLink={GMAPS_PLACE_LINK}
      />
      <OrnekGorselSeridi lang="ru" tema="acik" anahtarlar={['paca-kisaltma', 'fermuar-degisimi', 'eve-gelen-terzi']} sayfaUrl={PAGE_URL} />
      <ReviewsBlock lang="ru" />
    </>
  )
}
