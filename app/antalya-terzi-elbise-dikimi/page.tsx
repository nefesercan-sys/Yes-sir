// app/antalya-terzi-elbise-dikimi/page.tsx
import type { Metadata } from 'next'
import ElbiseDikimiClient from './Client'

const SITE_URL = 'https://swaphubs.com'
const PAGE_URL = `${SITE_URL}/antalya-terzi-elbise-dikimi`
const PHONE = '+90 531 898 64 18'
const PHONE_E164 = '+905318986418'
const TODAY = '2026-06-23'
const OG_IMAGE = `${SITE_URL}/images/elbise-dikimi/wrap-dress-stone.jpg`

// Arama motorları için öncelikli hedef Konyaaltı mahalleleri
const KONYAALTI_MAHALLELERI = [
  'Hurma', 'Liman', 'Uncalı', 'Gürsu', 'Altınkum', 
  'Arapsuyu', 'Öğretmenevleri', 'Sarısu', 'Pınarbaşı', 'Toros', 'Siteler', 'Molla Yusuf'
]

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Konyaaltı Elbise Dikimi & Tadilat · Antalya Terzi Can Atölyesi',
  description:
    "Antalya Konyaaltı'nda profesyonel elbise dikimi, abiye/gelinlik tadilatı, paça kısaltma ve fermuar değişimi. Hurma, Liman, Uncalı ve Gürsu mahallelerine özel adrese teslim hızlı servis. ☎ " + PHONE,
  keywords: [
    'Antalya elbise dikimi', 'Antalya terzi', 'Konyaaltı terzi', 'Hurma mahallesi terzi',
    'Liman terzi', 'Uncalı terzi', 'Gürsu terzi', 'Sarısu terzi', 'Arapsuyu terzi',
    'elbise tamiratı Antalya', 'paça kısaltma Konyaaltı', 'fermuar değişimi Antalya',
    'bel daraltma Konyaaltı', 'elbise tadilatı Antalya', 'ütü atölyesi Konyaaltı',
    'gelinlik tadilatı Antalya', 'abiye daraltma Antalya', 'tailor Antalya Konyaalti'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'SwapHubs',
    title: 'Konyaaltı Elbise Dikimi & Tadilat · Antalya Terzi Can Atölyesi',
    description:
      'Hurma, Liman, Uncalı ve Gürsu öncelikli tüm Konyaaltı mahallelerinde elbise dikimi, abiye tadilatı, paça ve fermuar onarımı. Adrese teslim terzi servisi.',
    images: [{ url: OG_IMAGE, width: 1200, height: 1500, alt: 'Terzi Can Atölyesi — Antalya Elbise Dikimi ve Tadilat' }],
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konyaaltı Elbise Dikimi & Tadilat · Terzi Can Atölyesi',
    description: 'Elbise dikimi, abiye tadilatı, paça kısaltma ve fermuar değişimi. Konyaaltı içi adrese motorlu kurye servis.',
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
      name: 'Terzi Can Konyaaltı',
      description:
        "Antalya Konyaaltı'nda profesyonel elbise dikimi, abiye ve gelinlik tadilatı, paça kısaltma, fermuar değişimi. Hurma, Liman, Uncalı, Gürsu başta olmak üzere tüm Konyaaltı mahallelerine adrese hızlı kurye servis.",
      url: PAGE_URL,
      telephone: PHONE_E164,
      priceRange: '₺₺',
      image: OG_IMAGE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı Merkez',
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
      areaServed: [
        { '@type': 'City', name: 'Konyaaltı' },
        ...KONYAALTI_MAHALLELERI.map(name => ({ '@type': 'Place', name: `${name} Mahallesi, Konyaaltı` })),
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'City', name: 'Muratpaşa' },
        { '@type': 'City', name: 'Kepez' }
      ],
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
        "Antalya Konyaaltı'nda Hurma, Liman, Uncalı ve Gürsu mahallelerine adrese teslim elbise dikimi, abiye tamiratı, paça ve fermuar hizmeti.",
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
          name: 'Konyaaltı Hurma ve Liman mahallelerine adrese terzi servisiniz var mı?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet, Hurma, Liman, Uncalı, Gürsu ve Sarısu mahallelerinden gelen dikiş, tadilat ve elbise dikimi siparişlerinizi kapınızdan motorlu kuryemizle teslim alıp, işlem sonrası kapınıza teslim ediyoruz. WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Antalya\'da abiye ve elbise dikimi ne kadar sürer?',
          acceptedAnswer: { '@type': 'Answer', text: 'Özel ölçü elbise ve kişiye özel abiye dikimleri modelin yapısına göre ortalama 3-5 iş günü sürmektedir. Paça ve fermuar gibi acil tadilatlar aynı gün tamamlanır.' },
        },
        {
          '@type': 'Question',
          name: 'Konyaaltı paça kısaltma ve fermuar değişimi fiyatı ne kadar?',
          acceptedAnswer: { '@type': 'Answer', text: `2026 yılı güncel fiyat tarifemize göre paça kısaltma 150 TL'den, pantolon fermuar değişimi 120 TL'den, mont/ceket fermuar değişimi ise 300 TL'den başlamaktadır.` },
        },
        {
          '@type': 'Question',
          name: 'Uncalı ve Gürsu bölgelerinde gelinlik ve abiye tadilatı yapıyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, tüm Konyaaltı bölgelerine gelinlik, nişanlık ve abiye kıyafetlerin hassas tadilatlarını, bel daraltma ve boy ayarlarını profesyonel atölyemizde garantili olarak gerçekleştiriyoruz.' },
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
