import type { Metadata } from 'next';
import TerziClient from './TerziClient';

const SITE_URL = 'https://www.swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // 1. WebSite
    {
      '@type': 'WebSite',
      '@id': 'https://www.swaphubs.com#website',
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
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.swaphubs.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },

    // 2. LocalBusiness / ClothingStore
    {
      '@type': 'ClothingStore',
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        'Tailor Can',
        '\u041f\u043e\u0440\u0442\u043d\u043e\u0439 \u041a\u0430\u043d',
        'Schneider Can',
        'Antalya Terzisi',
        'Konyaalti Terzi',
      ],
      description:
        "Antalya'nin en deneyimli terzisi. Paca kisaltma, fermuar degisimi, tadilat, ozel dikim, uniforma uretimi, nakis, kuru temizleme. Aracli terzi servisi ile adrese alim ve teslimat.",
      url: SITE_URL,
      telephone: '+905318986418',
      priceRange: '\u20ba\u20ba',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [
        'https://www.swaphubs.com/og/terzi-can.jpg',
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
      ],
      logo: 'https://www.swaphubs.com/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaalti',
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
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Murat B.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Otelimiz icin 45 kisilik personel uniformasi diktirdik. Tasarim, kalip ve seri uretim mukemmeldi. Zamaninda teslim, nakis kalitesi harika!',
          datePublished: '2025-01-15',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Sarah M.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional.',
          datePublished: '2025-05-10',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: '\u041d\u0430\u0442\u0430\u043b\u044c\u044f \u041a.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: '\u041e\u0442\u043b\u0438\u0447\u043d\u044b\u0439 \u043f\u043e\u0440\u0442\u043d\u043e\u0439! \u041f\u043e\u0448\u0438\u043b \u0441\u0432\u0430\u0434\u0435\u0431\u043d\u043e\u0435 \u043f\u043b\u0430\u0442\u044c\u0435 \u0437\u0430 5 \u0434\u043d\u0435\u0439. \u0413\u043e\u0432\u043e\u0440\u044f\u0442 \u043f\u043e-\u0440\u0443\u0441\u0441\u043a\u0438, \u0434\u043e\u0441\u0442\u0430\u0432\u0438\u043b\u0438 \u043f\u0440\u044f\u043c\u043e \u0432 \u043e\u0442\u0435\u043b\u044c \u0432 \u0411\u0435\u043b\u0435\u043a\u0435!',
          datePublished: '2025-06-20',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'David K.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Wir bestellten bestickte Sweatshirts für unser Team — 30 Stück, Logo-Stickerei, pünktlich geliefert. Ausgezeichnete Qualität!',
          datePublished: '2025-02-08',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'City', name: 'Alanya' },
        { '@type': 'City', name: 'Manavgat' },
        { '@type': 'City', name: 'Kemer' },
        { '@type': 'City', name: 'Belek' },
        { '@type': 'City', name: 'Kas' },
        { '@type': 'City', name: 'Finike' },
      ],

      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can Hizmetleri 2025-2026',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Paca Kisaltma',
            description: "Pantolon ve kot paca kisaltma. 150 TRY'den baslar, 24 saatte teslim.",
            price: '150',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Fermuar Degisimi',
            description: "Pantolon/kot fermuari 120 TRY'den, mont fermuari 300 TRY'den. Ayni gun servis.",
            price: '120',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Elbise Daraltma ve Tadilat',
            description: "Her tur kiyafette beden kucultme ve tadilat. 200 TRY'den baslar.",
            price: '200',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Ozel Dikim',
            description: "Olcuye gore erkek, bayan, cocuk kiyafeti dikimi. 600 TRY'den baslar.",
            price: '600',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Uniforma Uretimi',
            description: 'Otel, restoran, saglik, okul ve spor unif. Tasarim + kalip + seri imalat + nakis.',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Kuru Temizleme',
            description: "Otel alim-teslimat dahil kuru temizleme ve utu. 300 TRY'den baslar.",
            price: '300',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Nakis ve Logo Baski',
            description: "Uniforma ve kiyafete logo nakisi, dijital baski. 100 TRY'den baslar.",
            price: '100',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Aracli Terzi Servisi',
            description: 'Adrese alim ve teslimat dahil mobil terzi servisi. Tum Antalya ilceleri.',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
        ],
      },

      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+905318986418',
          contactType: 'customer service',
          areaServed: 'TR',
          availableLanguage: ['Turkish', 'English', 'Russian', 'German'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
        },
      ],
      sameAs: [
        'https://wa.me/905318986418',
        'https://www.swaphubs.com/terzi',
      ],
    },

    // 3. WebPage
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Terzi Can Antalya | Konyaalti Terzi | Paca Kisaltma - Tadilat - Uniforma - Kuru Temizleme',
      url: SITE_URL,
      isPartOf: { '@id': 'https://www.swaphubs.com#website' },
      about: { '@id': `${SITE_URL}#business` },
      description:
        "Antalya Konyaalti'nda profesyonel terzi Can. Paca kisaltma, elbise tadilat, ozel dikim, kuru temizleme, uniforma uretimi. 24-48 saat ekspres teslimat.",
      inLanguage: ['tr', 'en', 'de', 'ru'],
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.swaphubs.com/og/terzi-can.jpg',
        width: 1200,
        height: 630,
      },
    },

    // 4. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: 'https://www.swaphubs.com' },
        { '@type': 'ListItem', position: 2, name: 'Terzi Antalya', item: SITE_URL },
      ],
    },

    // 5. FAQPage
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: "Antalya'da paca kisaltma fiyati ne kadar? 2025-2026",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Antalya'da paca kisaltma fiyatimiz 150 TRY'den baslar. Kot paca 150 TRY, kumas pantolon 175 TRY civari. Kesin fiyat icin WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Fermuar degisimi kac lira? Mont, kot, pantolon fermuari fiyati?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Pantolon ve kot fermuari degisimi 120 TRY'den, mont fermuari 300 TRY'den baslar. Ayni gun servis mumkundur. WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Eve veya otele gelen terzi Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet, Terzi Can aracli terzi servisiyle Antalya'nin tum ilcelerine geliyor. WhatsApp'tan konum paylasin. +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Mezuniyet abiyesi tamiri ve kisaltmasi Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, mezuniyet sezonunda (Mayis-Haziran) abiye tamiri ve kisaltma ekspres 24 saatte yapiyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Dugun sezonu gelinlik tadilati Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, Nisan-Ekim dugun sezonunda gelinlik tadilati, kisaltma ve damatlik tadilati yapiyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: "Antalya'da otel ve restoran uniformasi uretimi?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, otel personel, resepsiyon, asci, garson, spa uniforma uretiyoruz. Tasarim + kalip + seri imalat + nakis tek elden.',
          },
        },
        {
          '@type': 'Question',
          name: "Antalya'da sweatshirt ve esofman dikimi?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, sweatshirt ve esofman dikimi, nakis ve baski ile kisisellestime, seri uretim yapiyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kuru temizleme hizmeti veriyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, kuru temizleme, camasir yikama ve utu hizmetleri sunmaktayiz. Otel ve adreslerden kurye ile alim yapilmaktadir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where can I find a tailor or uniform producer in Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tailor Can offers professional tailoring, alterations, dry cleaning and uniform production in Antalya. WhatsApp: +90 531 898 64 18. English-speaking service available.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer hotel pickup and delivery for dry cleaning in Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! We offer express dry cleaning with courier pickup and delivery to all hotels in Antalya. Ready in 24-48 hours.',
          },
        },
        {
          '@type': 'Question',
          name: '\u0413\u0434\u0435 \u043d\u0430\u0439\u0442\u0438 \u043f\u043e\u0440\u0442\u043d\u043e\u0433\u043e \u0438 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f \u0444\u043e\u0440\u043c\u044b \u0432 \u0410\u043d\u0442\u0430\u043b\u044c\u0435?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '\u041f\u043e\u0440\u0442\u043d\u043e\u0439 \u041a\u0430\u043d \u2014 \u043f\u043e\u0448\u0438\u0432 \u043e\u0434\u0435\u0436\u0434\u044b, \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0441\u0442\u0432\u043e \u0444\u043e\u0440\u043c\u044b, \u0432\u044b\u0448\u0438\u0432\u043a\u0430 \u0432 \u0410\u043d\u0442\u0430\u043b\u044c\u0435. \u0413\u043e\u0432\u043e\u0440\u0438\u043c \u043f\u043e-\u0440\u0443\u0441\u0441\u043a\u0438. WhatsApp: +90 531 898 64 18.',
          },
        },
        {
          '@type': 'Question',
          name: 'Gibt es einen Schneider in Antalya mit deutschem Service?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja! Schneider Can bietet mobilen Schneiderdienst, Änderungen und Reinigung in ganz Antalya — auch auf Deutsch. WhatsApp: +90 531 898 64 18.',
          },
        },
      ],
    },

    // 6. Service entity
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service-tailoring`,
      name: 'Profesyonel Terzilik Hizmetleri — Antalya',
      description: "Antalya Konyaalti'nda paca kisaltma, elbise tadilat, ozel dikim, uniforma uretimi, kuru temizleme ve mobil terzi servisi.",
      provider: { '@id': `${SITE_URL}#business` },
      areaServed: { '@type': 'City', name: 'Antalya' },
      availableLanguage: ['Turkish', 'English', 'Russian', 'German'],
      serviceType: 'Tailoring and Clothing Alteration',
      url: SITE_URL,
    },
  ],
};

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Terzi Antalya | Konyaaltı | Elbise Dikimi & Kuru Temizleme',
  description: "Konyaaltı'nda bay bayan özel terzi. Paça kısaltma, elbise tamiri, dikim atölyesi, kuru temizleme, üniforma üretimi. Kaliteli ve hızlı hizmet.",
  keywords: [
    'Antalya Terzi',
    'Paça Kısaltma Antalya',
    'En Yakın Terzi',
    'Konyaaltı Terzi',
    'Terzi Tamir Tadilat',
    'Elbise Dikimi',
    'Kıyafet Tamiri',
    'Bel Daraltma',
    'Elbise Kalıp Çıkarma',
    'Ütü Kuru Temizleme',
    'Elbise Fermuarı Tamiri',
    'Fermuar Değişimi',
    'Abiye Dikimi',
    'Abiye Tadilatı',
    'Elbise Bedenden Küçültme',
    'Özel Dikim Kıyafet',
    'Dikim Fiyatları',
    'Dikim Atölyesi',
    'Bayan Terzi',
    'Bay Terzi',
    'Çocuk Elbisesi Dikimi',
    'Tekstil İmalatı',
    'Model Çıkarma',
    'Pantolon Boyu Ayarlama',
    'Pantolon Paça Dikimi',
    'Paça Kısaltma',
    'Gece Kıyafeti Dikimi',
    'Terzi Dikim Fiyatları Güncel',
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
    canonical: 'https://www.swaphubs.com/terzi',
    languages: {
      'tr': 'https://www.swaphubs.com/terzi',
      'en': 'https://www.swaphubs.com/terzi',
      'de': 'https://www.swaphubs.com/terzi',
      'ru': 'https://www.swaphubs.com/terzi',
      'x-default': 'https://www.swaphubs.com/terzi',
    },
  },
  openGraph: {
    title: `Terzi Can Antalya | Paca Kisaltma & Tadilat`,
    description: `Antalya'da profesyonel terzi. Paca 150 TRY, fermuar 120 TRY, uniforma, kuru temizleme. Eve & otele geliyoruz. TR - EN - RU - DE Tel: ${PHONE}`,
    url: 'https://www.swaphubs.com/terzi',
    siteName: 'SwapHubs — Antalya Terzi',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'de_DE', 'ru_RU'],
    type: 'website',
    images: [
      {
        url: '/og/terzi-can.jpg',
        width: 1200,
        height: 630,
        alt: 'Terzi Can Antalya — Paca Kisaltma, Tadilat, Uniforma, Kuru Temizleme',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    creator: '@swaphubs',
    title: `Antalya Terzi Can | Paca 150 TRY - Eve Geliyoruz`,
    description: `Konyaalti merkezli, tum Antalya'ya gelen terzi. Paca 150 TRY, fermuar 120 TRY. Turkce - English - Rusca - Deutsch Tel: ${PHONE}`,
    images: ['/og/terzi-can.jpg'],
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Antalya',
    'geo.position': '36.8841;30.7056',
    'ICBM': '36.8841, 30.7056',
    'content-language': 'tr, en, de, ru',
    'contact': PHONE,
  },
};

// ─── PAGE COMPONENT ──────────────────────────────────────────────────────────
export default function TerziPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TerziClient />
    </>
  );
}
