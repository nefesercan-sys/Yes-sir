// app/antalya-terzi-elbise-dikimi/page.tsx
import type { Metadata } from 'next'
import ElbiseDikimiClient from './client'

const SITE_URL = 'https://terzihizmeti.com.tr'
const PAGE_PATH = '/antalya-terzi-elbise-dikimi'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`

export const metadata: Metadata = {
  title: 'Antalya Elbise Dikimi & Terzi Tadilat | Konyaaltı Terzi Can',
  description:
    "Antalya Konyaaltı'da özel elbise dikimi, abiye, tulum, bel/göğüs daraltma, paça kısaltma, fermuar tamiri ve profesyonel ütü hizmeti. Randevulu ve şeffaf fiyatlı terzi atölyesi.",
  keywords: [
    'antalya terzi',
    'konyaaltı terzi',
    'antalya elbise dikimi',
    'özel dikim elbise antalya',
    'hurma mahallesi terzi',
    'abiye dikimi antalya',
    'terzi tadilat antalya',
    'paça kısaltma konyaaltı',
    'elbise daraltma antalya',
    'terzi can konyaaltı',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Antalya Elbise Dikimi & Terzi Tadilat | Konyaaltı Terzi Can',
    description:
      'Ölçünüze özel elbise dikimi, prova, tadilat ve ütü hizmetleri. Antalya Konyaaltı Terzi Can atölyesinden randevunuzu oluşturun.',
    url: PAGE_URL,
    siteName: 'Terzi Can',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/elbise-dikimi/hero-couple.jpg`,
        width: 1200,
        height: 630,
        alt: 'Antalya Terzi Can - Özel Elbise Dikimi ve Tadilat Atölyesi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Elbise Dikimi & Terzi Tadilat | Terzi Can',
    description:
      "Antalya Konyaaltı'da özel ölçü elbise dikimi, abiye tadilatı, paça ve ütü hizmeti.",
    images: [`${SITE_URL}/images/elbise-dikimi/hero-couple.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ElbiseDikimiPage() {
  // Yerel İşletme Şeması (LocalBusiness)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'DryCleaningOrLaundry',
    '@id': `${SITE_URL}/#terzi-can`,
    name: 'Terzi Can - Antalya Konyaaltı Terzi & Elbise Dikimi',
    image: `${SITE_URL}/images/elbise-dikimi/hero-couple.jpg`,
    url: PAGE_URL,
    telephone: '+905318986418',
    priceRange: '₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hurma Mahallesi',
      addressLocality: 'Konyaaltı',
      addressRegion: 'Antalya',
      postalCode: '07130',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.8851,
      longitude: 30.6930,
    },
    hasMap: 'https://maps.app.goo.gl/CNZghczJNRQX3mLM9',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Hurma' },
      { '@type': 'AdministrativeArea', name: 'Liman' },
      { '@type': 'AdministrativeArea', name: 'Uncalı' },
      { '@type': 'AdministrativeArea', name: 'Gürsu' },
      { '@type': 'AdministrativeArea', name: 'Sarısu' },
      { '@type': 'AdministrativeArea', name: 'Arapsuyu' },
      { '@type': 'AdministrativeArea', name: 'Altınkum' },
      { '@type': 'AdministrativeArea', name: 'Konyaaltı' },
      { '@type': 'AdministrativeArea', name: 'Antalya' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '94',
    },
  }

  // SSS Şeması (FAQPage)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Antalya'da elbise dikimi ne kadar sürer?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standart elbise dikimi 3-5 iş günü içinde tamamlanır. Acil siparişlerde aynı gün veya ertesi gün teslim mümkündür, lütfen randevu sırasında belirtin.',
        },
      },
      {
        '@type': 'Question',
        name: 'Paça kısaltma fiyatı ne kadar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Paça kısaltma 150 TL'den başlar. Kumaş tipine ve dikim şekline göre fiyat değişebilir. Kesin fiyat için WhatsApp'tan fotoğraf gönderebilirsiniz.",
        },
      },
      {
        '@type': 'Question',
        name: 'Gelinlik tadilatı yapıyor musunuz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, gelinlik ve abiye tadilatında uzmanız. Bel daraltma, etek kısaltma, askı ayarı ve fermuar değişimi dahil tüm özel gün kıyafetlerine hizmet veriyoruz.',
        },
      },
      {
        '@type': 'Question',
        name: 'Randevu almadan gelebilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Atölyemize randevusuz da uğrayabilirsiniz, ancak yoğun saatlerde bekleme süresini azaltmak için WhatsApp'tan önceden randevu almanızı öneririz.",
        },
      },
    ],
  }

  // Hizmet Kataloğu Şeması (Service)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Terzi ve Elbise Dikimi',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Terzi Can',
    },
    areaServed: {
      '@type': 'City',
      name: 'Antalya',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Terzi Hizmetleri ve Fiyat Listesi',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Özel Ölçü Elbise Dikimi',
            description: 'Günlük, abiye, tulum ve gelinlik dikimi',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kıyafet Tadilatı & Daraltma',
            description: 'Bel, göğüs, sırt daraltma ve askı ayarı',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Paça & Fermuar Tamiri',
            description: 'Pantolon/etek paçası, fermuar değişimi ve sökük onarımı',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Profesyonel Ütü Hizmeti',
            description: 'Elbise, gömlek, takım elbise ve abiye buharlama',
          },
        },
      ],
    },
  }

  // Breadcrumb Şeması
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Antalya Elbise Dikimi',
        item: PAGE_URL,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ElbiseDikimiClient />
    </>
  )
}
