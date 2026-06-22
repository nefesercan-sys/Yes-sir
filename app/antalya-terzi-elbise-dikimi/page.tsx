// app/antalya-terzi-elbise-dikimi/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Antalya'da elbise dikimi, tamirat, tadilat ve ütü hizmeti sayfası.
// Mevcut Terzi Can işletme kimliğiyle (aynı telefon/NAP) tutarlı tutuldu —
// Google Maps/Business Profile sinyalleri için isim-adres-telefon
// tekrarında tutarlılık kritik.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import ElbiseDikimiClient from './client'

const SITE_URL = 'https://swaphubs.com'
const PAGE_URL = `${SITE_URL}/antalya-terzi-elbise-dikimi`
const PHONE = '+90 531 898 64 18'
const PHONE_E164 = '+905318986418'
const TODAY = '2026-06-23'
const OG_IMAGE = `${SITE_URL}/images/elbise-dikimi/wrap-dress-stone.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Antalya Elbise Dikimi & Tadilat · Terzi Can Atölyesi',

  description:
    'Antalya Konyaaltı\'da elbise dikimi, paça kısaltma, fermuar değişimi, bel daraltma, tamirat ve ütü hizmeti. Şeffaf fiyatlar, randevulu profesyonel atölye. ☎ ' +
    PHONE,

  keywords: [
    'Antalya elbise dikimi', 'Antalya terzi', 'elbise tamiratı Antalya',
    'paça kısaltma Antalya', 'fermuar değişimi Antalya', 'bel daraltma Antalya',
    'elbise tadilatı Antalya', 'ütü atölyesi Antalya', 'Konyaaltı terzi',
    'kıyafet tamiri Antalya', 'dikiş atölyesi Antalya', 'gelinlik tadilatı Antalya',
    'kumaş tadilat Antalya', 'terzi fiyatları Antalya',
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'SwapHubs',
    title: 'Antalya Elbise Dikimi & Tadilat · Terzi Can Atölyesi',
    description:
      'Elbise dikimi, paça kısaltma, fermuar değişimi, bel daraltma ve ütü hizmeti. Şeffaf fiyatlar, randevulu profesyonel atölye.',
    images: [{ url: OG_IMAGE, width: 1200, height: 1500, alt: 'Terzi Can Atölyesi — Antalya Elbise Dikimi ve Tadilat' }],
    locale: 'tr_TR',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Elbise Dikimi & Tadilat · Terzi Can Atölyesi',
    description: 'Elbise dikimi, paça kısaltma, fermuar değişimi, bel daraltma ve ütü hizmeti. Şeffaf fiyatlar.',
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
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': `${PAGE_URL}#business`,
      name: 'Terzi Can',
      description:
        'Antalya Konyaaltı\'da profesyonel elbise dikimi, tamirat, tadilat ve ütü atölyesi. Paça kısaltma, fermuar değişimi, bel daraltma ve özel dikim hizmetleri.',
      url: PAGE_URL,
      telephone: PHONE_E164,
      priceRange: '₺₺',
      image: OG_IMAGE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.6954 },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      areaServed: ['Antalya', 'Konyaaltı', 'Muratpaşa', 'Lara', 'Kepez'].map((name) => ({
        '@type': 'City',
        name,
      })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Elbise Dikimi & Tadilat Hizmetleri',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elbise Dikimi (Özel Ölçü)' }, priceSpecification: { '@type': 'PriceSpecification', price: 800, priceCurrency: 'TRY', minPrice: 800 } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paça Kısaltma' }, priceSpecification: { '@type': 'PriceSpecification', price: 150, priceCurrency: 'TRY', minPrice: 150 } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fermuar Değişimi' }, priceSpecification: { '@type': 'PriceSpecification', price: 120, priceCurrency: 'TRY', minPrice: 120 } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bel Daraltma' }, priceSpecification: { '@type': 'PriceSpecification', price: 180, priceCurrency: 'TRY', minPrice: 180 } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elbise Tadilatı' }, priceSpecification: { '@type': 'PriceSpecification', price: 200, priceCurrency: 'TRY', minPrice: 200 } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ütü Hizmeti' }, priceSpecification: { '@type': 'PriceSpecification', price: 60, priceCurrency: 'TRY', minPrice: 60 } },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [`https://wa.me/${PHONE_E164.replace('+', '')}`],
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'Antalya Elbise Dikimi & Tadilat · Terzi Can Atölyesi',
      url: PAGE_URL,
      description:
        'Antalya Konyaaltı\'da elbise dikimi, paça kısaltma, fermuar değişimi, bel daraltma, tamirat ve ütü hizmeti.',
      inLanguage: 'tr',
      dateModified: TODAY,
      about: { '@id': `${PAGE_URL}#business` },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Antalya Elbise Dikimi & Tadilat', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya\'da elbise dikimi ne kadar sürer?',
          acceptedAnswer: { '@type': 'Answer', text: 'Standart elbise dikimi 3-5 iş günü içinde tamamlanır. Acil siparişlerde aynı gün veya ertesi gün teslim mümkündür, lütfen randevu sırasında belirtin.' },
        },
        {
          '@type': 'Question',
          name: 'Paça kısaltma fiyatı ne kadar?',
          acceptedAnswer: { '@type': 'Answer', text: `Paça kısaltma 150 TL'den başlar. Kumaş tipine ve dikim şekline (orijinal dikiş veya overlok) göre fiyat değişebilir. Kesin fiyat için WhatsApp ${PHONE} üzerinden fotoğraf gönderebilirsiniz.` },
        },
        {
          '@type': 'Question',
          name: 'Gelinlik tadilatı yapıyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, gelinlik ve abiye tadilatında uzmanız. Bel daraltma, etek kısaltma, askı ayarı ve fermuar değişimi dahil tüm özel gün kıyafetlerine hizmet veriyoruz.' },
        },
        {
          '@type': 'Question',
          name: 'Randevu almadan gelebilir miyim?',
          acceptedAnswer: { '@type': 'Answer', text: 'Atölyemize randevusuz da uğrayabilirsiniz, ancak yoğun saatlerde bekleme süresini azaltmak için WhatsApp\'tan önceden randevu almanızı öneririz.' },
        },
      ],
    },
  ],
}

export default function AntalyaElbiseDikimiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ElbiseDikimiClient />
    </>
  )
}
