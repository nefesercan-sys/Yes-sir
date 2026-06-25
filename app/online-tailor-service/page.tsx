import type { Metadata } from 'next';
import OnlineTailorClient from './OnlineTailorClient';

const SITE_URL = 'https://swaphubs.com/online-tailor-service';
const PHONE = '+90 531 898 64 18';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://swaphubs.com#website',           // ✅ www kaldırıldı
      name: 'SwapHubs',
      url: 'https://swaphubs.com',                      // ✅ www kaldırıldı
      publisher: {
        '@type': 'Organization',
        '@id': 'https://swaphubs.com#organization',     // ✅ www kaldırıldı
        name: 'SwapHubs',
        url: 'https://swaphubs.com',                    // ✅ www kaldırıldı
        logo: {
          '@type': 'ImageObject',
          url: 'https://swaphubs.com/logo.png',         // ✅ www kaldırıldı
          width: 512,
          height: 512,
        },
      },
    },

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
      description: "Antalya'da bay ve bayan kıyafet dikimi, online terzi hizmeti, ütü, tamir, tadilat, kişiye özel model tasarım, seri imalat ve tekstil dikişatölyesi.",
      url: SITE_URL,
      telephone: '+905318986418',
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: 'https://swaphubs.com/og/antalya-tailor-online.jpg',  // ✅ www kaldırıldı
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
      hasMap: 'https://maps.app.goo.gl/rpgwjJgWZHfgafTy5',        // ✅ YENİ — Maps bağlantısı
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
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
        itemReviewed: {                                              // ✅ YENİ — zorunlu alan
          '@type': 'ClothingStore',
          name: 'SwapHubs — Online Tailor Service',
        },
      },
      review: [
        {
          '@type': 'Review',
          name: 'Mükemmel Takım Elbise Dikimi',                    // ✅ YENİ — name zorunlu
          author: { '@type': 'Person', name: 'Kemal A.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Erkek takım elbise dikimi için geldim. Ölçüler mükemmel alındı, kumaş kalitesi ve işçilik çok iyiydi.',
          datePublished: '2025-04-10',
          itemReviewed: {                                            // ✅ YENİ — zorunlu alan
            '@type': 'ClothingStore',
            name: 'SwapHubs — Online Tailor Service',
          },
        },
        {
          '@type': 'Review',
          name: 'Bayan İş Kıyafeti Dikimi — Harika Sonuç',
          author: { '@type': 'Person', name: 'Ayşe T.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Bayan iş kıyafeti dikimi için başvurdum. Kişiye özel tasarım ve mükemmel dikiş kalitesi.',
          datePublished: '2025-05-03',
          itemReviewed: {
            '@type': 'ClothingStore',
            name: 'SwapHubs — Online Tailor Service',
          },
        },
        {
          '@type': 'Review',
          name: '200 Adet Seri İmalat — Zamanında Teslim',
          author: { '@type': 'Person', name: 'Mehmet S.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Tekstil atölyesinde seri imalat yaptırdık. 200 adet iş gömleği zamanında ve eksiksiz teslim edildi.',
          datePublished: '2025-03-22',
          itemReviewed: {
            '@type': 'ClothingStore',
            name: 'SwapHubs — Online Tailor Service',
          },
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
            name: 'Kıyafet Tamir ve Tadilat',
            description: 'Paça kısaltma, fermuar değişimi, yırtık tamiri, bel alma.',
            price: '120',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'SwapHubs Antalya' },
          },
          {
            '@type': 'Offer',
            name: 'Ütü Hizmeti ve Kuru Temizleme',
            description: 'Profesyonel ütü, buharlı ütü. Otel alım-teslimat.',
            price: '80',
            priceCurrency: 'TRY',
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
            name: 'Spor ve Günlük Kıyafet Dikimi',
            description: 'Spor kıyafet, eşofman, sweatshirt özel dikim.',
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
        'https://swaphubs.com/online-tailor-service',        // ✅ www kaldırıldı
        'https://swaphubs.com',              // ✅ www kaldırıldı
        'https://maps.app.goo.gl/rpgwjJgWZHfgafTy5',  // ✅ YENİ — Maps
      ],
    },

    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Online Tailor Service | Erkek ve Bayan Kıyafet Dikimi | SwapHubs',
      url: SITE_URL,
      isPartOf: { '@id': 'https://swaphubs.com#website' },   // ✅ www kaldırıldı
      about: { '@id': `${SITE_URL}#business` },
      description: "Antalya'da erkek ve bayan kıyafet dikimi, online terzi, ütü hizmeti, tamir, tadilat, model tasarım, tekstil atölyesi ve seri imalat.",
      inLanguage: 'tr',
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://swaphubs.com/og/antalya-tailor-online.jpg',  // ✅ www kaldırıldı
        width: 1200,
        height: 630,
      },
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: 'https://swaphubs.com' },         // ✅ www kaldırıldı
        { '@type': 'ListItem', position: 2, name: 'Terzi Can', item: 'https://swaphubs.com/terzi' },  // ✅ www kaldırıldı
        { '@type': 'ListItem', position: 3, name: 'Online Tailor Service', item: SITE_URL },
      ],
    },

    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: "Antalya'da erkek takım elbise dikimi fiyatı ne kadar? 2025–2026",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Antalya'da erkek takım elbise dikimi ₺2.500'den başlar. WhatsApp'tan fotoğraf ve ölçü gönderin, 30 dakika içinde fiyat bildiririz.",
          },
        },
        {
          '@type': 'Question',
          name: 'Online terzi hizmeti nasıl çalışır?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "WhatsApp'tan kıyafet fotoğrafı ve ölçülerinizi gönderin. Tasarımı onaylayın, kıyafetiniz dikilip adresinize kargo ile teslim edilir.",
          },
        },
        {
          '@type': 'Question',
          name: 'Ütü hizmeti için adrese geliyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet! Otel ve ev adreslerinden kıyafet alıp profesyonel ütüleme yapıyor, aynı gün teslim ediyoruz. Antalya'nın tüm ilçelerine hizmet veriyoruz.",
          },
        },
        {
          '@type': 'Question',
          name: 'Seri imalat yapıyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet. Markalar ve butikler için fason üretim, kalıp çıkarma ve numune dikimi yapıyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kıyafet tamir ve tadilat kaç sürede teslim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Paça kısaltma, fermuar gibi basit işlemler aynı gün teslim. Tadilat 24–48 saat.',
          },
        },
      ],
    },

    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Antalya Online Terzi ve Tekstil Atölyesi',
      description: 'Erkek ve bayan kıyafet dikimi, online terzi, ütü, tamir, tadilat, seri imalat. Antalya geneli.',
      provider: { '@id': `${SITE_URL}#business` },
      areaServed: { '@type': 'City', name: 'Antalya' },
      availableLanguage: ['Turkish', 'English', 'Russian', 'German'],
      serviceType: 'Tailoring, Clothing Alteration, Textile Manufacturing',
      url: SITE_URL,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),   // ✅ www kaldırıldı

  title: {
    default: 'Online Tailor Service | Erkek ve Bayan Kıyafet Dikimi | Seri İmalat',
    template: '%s | SwapHubs Antalya Terzi',
  },

  description: `Antalya'da bay ve bayan kıyafet dikimi, online terzi hizmeti, profesyonel ütü, tamir ve tadilat, model tasarım, tekstil atölyesi, seri imalat. Konyaaltı merkezli, tüm Antalya'ya kurye. ☎ ${PHONE}`,

  keywords: [
    'Antalya Bay Terzi', 'Erkek Kıyafet Dikimi Antalya', 'Erkek Takım Elbise Dikimi Antalya',
    'Bayan Kıyafet Dikimi Antalya', 'Elbise Dikimi Antalya',
    'Online Terzi Antalya', 'Online Kıyafet Dikimi', 'Online Tailor Service',
    'Ütü Hizmeti Antalya', 'Otel Ütü Hizmeti Antalya',
    'Kıyafet Tamir Antalya', 'Paça Kısaltma', 'Fermuar Değişimi Antalya',
    'Tekstil Atölyesi Antalya', 'Fason Üretim Antalya', 'Seri İmalat Tekstil Antalya',
    'Terzi Antalya', 'Antalya Terzi Fiyatları 2026', 'Konyaaltı Terzi',
    'Tailor Antalya', 'Online Tailor Antalya', 'Ironing Service Antalya',
    'Портной Анталья', 'Schneider Antalya',
  ],

  authors: [{ name: 'SwapHubs', url: 'https://swaphubs.com' }],  // ✅ www kaldırıldı
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
    title: 'Online Tailor Service | Erkek ve Bayan Kıyafet Dikimi | SwapHubs',
    description: `Antalya'da erkek ve bayan kıyafet dikimi, online terzi, ütü, tamir, model tasarım, seri imalat. ☎ ${PHONE}`,
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/og/antalya-tailor-online.jpg',
        width: 1200,
        height: 630,
        alt: 'SwapHubs — Online Tailor Service Antalya',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    title: 'Online Tailor Service | SwapHubs Antalya',
    description: `Erkek ve bayan kıyafet dikimi, online terzi, ütü, tamir, seri imalat. ☎ ${PHONE}`,
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
