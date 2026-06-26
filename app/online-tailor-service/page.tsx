import type { Metadata } from 'next';
import OnlineTailorClient from './OnlineTailorClient';

const SITE_URL = 'https://swaphubs.com/online-tailor-service';
const PHONE = '+90 531 898 64 18';

// ─── STRUCTURED DATA ──────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://swaphubs.com#website',
      name: 'SwapHubs',
      url: 'https://www.swaphubs.com',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://www.swaphubs.com#organization',
        name: 'SwapHubs',
        url: 'https://www.swaphubs.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.swaphubs.com/logo.png',
          width: 512,
          height: 512,
        },
      },
    },

    // LocalBusiness — Tailor / ClothingStore
    {
      '@type': ['ClothingStore', 'LocalBusiness'],
      '@id': `${SITE_URL}#business`,
      name: 'SwapHubs — Online Tailor Service',
      alternateName: [
        'Antalya Bay Terzi',
        'Online Terzi Antalya',
        'Erkek Kıyafet Dikimi Antalya',
        'Tekstil Dikişatölyesi Antalya',
        'Antalya Seri İmalat Terzi',
      ],
      description:
        'Antalya\'da bay ve bayan kıyafet dikimi, online terzi hizmeti, ütü, tamir, tadilat, kişiye özel model tasarım, seri imalat ve tekstil dikişatölyesi. Erkek takım elbise, gömlek, pantolon, günlük kıyafet, spor kıyafet ve özel tasarım.',
      url: SITE_URL,
      telephone: '+905318986418',
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: 'https://www.swaphubs.com/og/antalya-tailor-online.jpg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 36.8841,
        longitude: 30.7056,
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
        reviewCount: '112',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Kemal A.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Erkek takım elbise dikimi için geldim. Ölçüler mükemmel alındı, kumaş kalitesi ve işçilik çok iyiydi. Online sipariş sistemi çok pratik.',
          datePublished: '2025-04-10',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Ayşe T.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Bayan iş kıyafeti dikimi için başvurdum. Kişiye özel tasarım ve mükemmel dikiş kalitesi. Kesinlikle tavsiye ederim.',
          datePublished: '2025-05-03',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Mehmet S.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Tekstil atölyesinde seri imalat yaptırdık. 200 adet iş gömleği zamanında ve eksiksiz teslim edildi. Teşekkürler!',
          datePublished: '2025-03-22',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'City', name: 'Konyaaltı' },
        { '@type': 'City', name: 'Muratpaşa' },
        { '@type': 'City', name: 'Kepez' },
        { '@type': 'City', name: 'Alanya' },
        { '@type': 'City', name: 'Belek' },
        { '@type': 'City', name: 'Kemer' },
        { '@type': 'City', name: 'Manavgat' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Online Tailor Service — Tüm Terzilik Hizmetleri',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Erkek Takım Elbise Dikimi',
            description: 'Ölçüye özel erkek takım elbise, smokin, blazer dikimi.',
            price: '2500',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'SwapHubs Antalya' },
          },
          {
            '@type': 'Offer',
            name: 'Bayan Kıyafet Dikimi',
            description: 'Elbise, bluz, etek, tulum, iş kıyafeti özel dikim.',
            price: '600',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'SwapHubs Antalya' },
          },
          {
            '@type': 'Offer',
            name: 'Online Terzi Hizmeti',
            description: 'Fotoğraf ve ölçü gönderin, kıyafetiniz kapınıza gelsin.',
            price: '0',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'SwapHubs Antalya' },
          },
          {
            '@type': 'Offer',
            name: 'Kıyafet Tamir & Tadilat',
            description: 'Paça kısaltma, fermuar değişimi, yırtık tamiri, bel alma.',
            price: '120',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'SwapHubs Antalya' },
          },
          {
            '@type': 'Offer',
            name: 'Ütü Hizmeti & Kuru Temizleme',
            description: 'Profesyonel ütü, buharlı ütü, buruşuk kıyafet düzeltme. Otel alım-teslimat.',
            price: '80',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'SwapHubs Antalya' },
          },
          {
            '@type': 'Offer',
            name: 'Kişiye Özel Model Tasarım',
            description: 'Özgün tasarım, kalıp çıkarma, prototip ve seri imalat.',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'SwapHubs Antalya' },
          },
          {
            '@type': 'Offer',
            name: 'Tekstil Dikişatölyesi — Seri İmalat',
            description: 'Marka ve butikler için toplu üretim, fason imalat, kalıp çıkarma.',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'SwapHubs Antalya' },
          },
          {
            '@type': 'Offer',
            name: 'Spor & Günlük Kıyafet Dikimi',
            description: 'Spor kıyafet, eşofman, sweatshirt, günlük giyim özel dikim.',
            price: '400',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'SwapHubs Antalya' },
          },
        ],
      },
      knowsLanguage: ['tr', 'en', 'ru', 'de'],
      sameAs: [
        'https://wa.me/905318986418',
        'https://www.swaphubs.com/terzi',
        'https://www.swaphubs.com',
      ],
    },

    // WebPage
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Online Tailor Service Hizmeti | Erkek & Bayan Kıyafet Dikimi | SwapHubs',
      url: SITE_URL,
      isPartOf: { '@id': 'https://www.swaphubs.com#website' },
      about: { '@id': `${SITE_URL}#business` },
      description:
        'Antalya\'da erkek ve bayan kıyafet dikimi, online terzi, ütü hizmeti, tamir, tadilat, kişiye özel tasarım, tekstil atölyesi ve seri imalat. Konyaaltı merkezli, tüm Antalya\'ya hizmet.',
      inLanguage: 'tr',
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.swaphubs.com/og/antalya-tailor-online.jpg',
        width: 1200,
        height: 630,
      },
    },

    // BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: 'https://www.swaphubs.com' },
        { '@type': 'ListItem', position: 2, name: 'Terzi Can', item: 'https://www.swaphubs.com/terzi' },
        { '@type': 'ListItem', position: 3, name: 'Online Tailor Service', item: SITE_URL },
      ],
    },

    // FAQPage
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya\'da erkek takım elbise dikimi fiyatı ne kadar? 2025–2026',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Antalya\'da erkek takım elbise dikimi ₺2.500\'den başlar. Kumaş kalitesi ve model karmaşıklığına göre değişir. WhatsApp\'tan fotoğraf ve ölçü gönderin, 30 dakika içinde fiyat bildiririz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Online terzi hizmeti nasıl çalışır?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WhatsApp\'tan kıyafet fotoğrafı ve ölçülerinizi gönderin. Tasarımı onaylayın. Kumaş seçimini yapın. Kıyafetiniz dikilip adresinize kargo ile teslim edilir. Ya da Antalya içinde ücretsiz kurye ile teslim.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ütü hizmeti için adrese geliyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet! Otel ve ev adreslerinden kıyafet alıp profesyonel ütüleme yapıyor, aynı gün teslim ediyoruz. Antalya\'nın tüm ilçelerine hizmet veriyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Tekstil atölyenizde seri imalat yapıyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet. Markalar, butikler ve e-ticaret firmaları için fason üretim, seri imalat, kalıp çıkarma ve numune dikimi yapıyoruz. Minimum sipariş için bizimle iletişime geçin.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kişiye özel model tasarım hizmeti veriyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet. Kendi tasarımınızı getirebilir ya da bizim tasarımcılarımızla birlikte çalışabilirsiniz. Kalıp çıkarma, prototip dikimi ve seri imalata kadar tüm süreci yönetiyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kıyafet tamir ve tadilat için ne kadar süre gerekiyor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Basit tamir işlemleri (paça kısaltma, fermuar, yırtık) aynı gün teslim edilebilir. Tadilat işlemleri genellikle 24–48 saat sürer. Ekspres hizmet mevcuttur.',
          },
        },
        {
          '@type': 'Question',
          name: 'Bayan kıyafet dikimi de yapıyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet. Elbise, bluz, etek, tulum, iş kıyafeti, abiye, gelinlik ve günlük kıyafet dikimi yapıyoruz. Kişiye özel ölçü alarak mükemmel fit sağlıyoruz.',
          },
        },
      ],
    },

    // Service entity
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Antalya Online Terzi & Tekstil Atölyesi Hizmetleri',
      description:
        'Erkek ve bayan kıyafet dikimi, online terzi, ütü hizmeti, tamir, tadilat, kişiye özel model tasarım, seri imalat, tekstil dikişatölyesi. Antalya geneli kurye hizmeti.',
      provider: { '@id': `${SITE_URL}#business` },
      areaServed: { '@type': 'City', name: 'Antalya' },
      availableLanguage: ['Turkish', 'English', 'Russian', 'German'],
      serviceType: 'Tailoring, Clothing Alteration, Textile Manufacturing, Ironing Service',
      url: SITE_URL,
    },
  ],
};

// ─── METADATA ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),

  title: {
    default:
      'Online Tailor Service | Erkek & Bayan Kıyafet Dikimi | Seri İmalat',
    template: '%s | SwapHubs Antalya Terzi',
  },

  description: `Antalya'da bay & bayan kıyafet dikimi, online terzi hizmeti, profesyonel ütü, tamir & tadilat, kişiye özel model tasarım, tekstil dikişatölyesi ve seri imalat. Konyaaltı merkezli, tüm Antalya ilçelerine kurye. ☎ ${PHONE}`,

  keywords: [
    // TR — Bay Terzi
    'Antalya Bay Terzi', 'Erkek Kıyafet Dikimi Antalya', 'Erkek Takım Elbise Dikimi Antalya',
    'Erkek Gömlek Dikimi Antalya', 'Erkek Pantolon Dikimi', 'Bay Terzi Antalya',
    // TR — Bayan Terzi
    'Bayan Kıyafet Dikimi Antalya', 'Elbise Dikimi Antalya', 'Bayan Bluz Dikimi',
    'Bayan İş Kıyafeti Dikimi', 'Özel Elbise Dikimi Antalya',
    // TR — Online
    'Online Terzi Antalya', 'Online Kıyafet Dikimi', 'Online Terzi Hizmeti',
    'Antalya Online Tailor', 'Online Tailor Service',
    // TR — Ütü
    'Ütü Hizmeti Antalya', 'Profesyonel Ütü Antalya', 'Ütü Servisi Antalya',
    'Otel Ütü Hizmeti Antalya', 'Eve Gelen Ütü Hizmeti',
    // TR — Tamir Tadilat
    'Kıyafet Tamir Antalya', 'Kıyafet Tadilat Antalya', 'Paça Kısaltma',
    'Fermuar Değişimi Antalya', 'Elbise Tadilat Antalya',
    // TR — Tasarım & Seri İmalat
    'Kişiye Özel Kıyafet Tasarımı', 'Model Tasarım Antalya', 'Seri İmalat Tekstil Antalya',
    'Tekstil Atölyesi Antalya', 'Dikişatölyesi Antalya', 'Fason Üretim Antalya',
    'Kalıp Çıkarma Antalya', 'Numune Dikimi Antalya',
    // TR — Genel
    'Terzi Antalya', 'Antalya Terzi Fiyatları 2026', 'Konyaaltı Terzi',
    // EN
    'Tailor Antalya', 'Bay Tailor Antalya', 'Online Tailor Antalya',
    'Custom Clothing Antalya', 'Suit Tailoring Antalya', 'Ironing Service Antalya',
    'Clothing Alterations Antalya', 'Textile Workshop Antalya',
    // RU
    'Портной Анталья', 'Пошив одежды Анталья', 'Утюжка одежды Анталья',
    // DE
    'Schneider Antalya', 'Maßanfertigung Antalya', 'Bügelservice Antalya',
  ],

  authors: [{ name: 'SwapHubs', url: 'https://www.swaphubs.com' }],
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
    canonical: SITE_URL,
  },

  openGraph: {
    title: 'Online Tailor Service | Erkek & Bayan Kıyafet Dikimi | SwapHubs',
    description: `Antalya'da erkek & bayan kıyafet dikimi, online terzi, ütü, tamir, tadilat, model tasarım, seri imalat. ☎ ${PHONE}`,
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/og/antalya-tailor-online.jpg',
        width: 1200,
        height: 630,
        alt: 'SwapHubs — Online Tailor Service',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    title: 'Online Tailor Service | SwapHubs',
    description: `Erkek & bayan kıyafet dikimi, online terzi, ütü, tamir, seri imalat. ☎ ${PHONE}`,
    images: ['/og/antalya-tailor-online.jpg'],
  },

  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Antalya',
    'geo.position': '36.8841;30.7056',
    'ICBM': '36.8841, 30.7056',
    'contact': PHONE,
  },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function OnlineTailorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OnlineTailorClient />
    </>
  );
}
