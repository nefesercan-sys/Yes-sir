import type { Metadata } from 'next';
import TerziClient from './TerziClient';

const SITE_URL = 'https://www.swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';

// ─── JSON-LD ────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // 1. WebSite — sitelinks searchbox + site identity
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

    // 2. LocalBusiness + ClothingStore (separate @type values, not array)
    {
      '@type': 'ClothingStore',
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        'Tailor Can',
        'Портной Кан',
        'Schneider Can',
        'Antalya Terzisi',
        'Antalya Üniforma Üretimi',
        'Konyaaltı Terzi',
      ],
      description:
        "Antalya'nın en deneyimli terzisi. Paça kısaltma, fermuar değişimi, tadilat, tamir, daraltma, özel dikim, üniforma üretimi, nakış, fason imalat, kuru temizleme. Araçlı terzi servisi ile adrese alım ve teslimat.",
      url: SITE_URL,
      telephone: '+905318986418',
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [
        'https://www.swaphubs.com/og/terzi-can.jpg',
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
      ],
      logo: 'https://www.swaphubs.com/logo.png',
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
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          name: 'Üniforma üretimi — mükemmel hizmet',
          author: { '@type': 'Person', name: 'Murat B.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim, nakış kalitesi harika!',
          datePublished: '2025-01-15',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' },
        },
        {
          '@type': 'Review',
          name: 'Best tailor in Antalya — express dress alteration',
          author: { '@type': 'Person', name: 'Sarah M.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional.',
          datePublished: '2025-05-10',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' },
        },
        {
          '@type': 'Review',
          name: 'Отличный портной — свадебное платье за 5 дней',
          author: { '@type': 'Person', name: 'Наталья К.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель в Белеке!',
          datePublished: '2025-06-20',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' },
        },
        {
          '@type': 'Review',
          name: 'Bestickte Sweatshirts — pünktlich und qualitativ',
          author: { '@type': 'Person', name: 'David K.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Wir bestellten bestickte Sweatshirts für unser Team — 30 Stück, Logo-Stickerei, pünktlich geliefert. Ausgezeichnete Qualität!',
          datePublished: '2025-02-08',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' },
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'City', name: 'Alanya' },
        { '@type': 'City', name: 'Manavgat' },
        { '@type': 'City', name: 'Kemer' },
        { '@type': 'City', name: 'Belek' },
        { '@type': 'City', name: 'Kaş' },
        { '@type': 'City', name: 'Finike' },
      ],
      serviceArea: {
        '@type': 'AdministrativeArea',
        name: 'Antalya İli',
        containsPlace: [
          { '@type': 'City', name: 'Konyaaltı' },
          { '@type': 'City', name: 'Muratpaşa' },
          { '@type': 'City', name: 'Kepez' },
          { '@type': 'City', name: 'Lara' },
          { '@type': 'City', name: 'Aksu' },
          { '@type': 'City', name: 'Döşemealtı' },
          { '@type': 'City', name: 'Serik' },
          { '@type': 'City', name: 'Belek' },
          { '@type': 'City', name: 'Kemer' },
          { '@type': 'City', name: 'Alanya' },
          { '@type': 'City', name: 'Manavgat' },
          { '@type': 'City', name: 'Side' },
          { '@type': 'City', name: 'Kaş' },
          { '@type': 'City', name: 'Finike' },
          { '@type': 'City', name: 'Kumluca' },
          { '@type': 'City', name: 'Elmalı' },
          { '@type': 'City', name: 'Korkuteli' },
        ],
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can Hizmetleri',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Paça Kısaltma',
            price: '150',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Service',
              name: 'Paça Kısaltma',
              description:
                "Pantolon, kot, kumaş — tüm kıyafetlerde paça kısaltma. ₺150'den başlar. 24 saat içinde teslim.",
            },
          },
          {
            '@type': 'Offer',
            name: 'Fermuar Değişimi',
            price: '120',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Service',
              name: 'Fermuar Değişimi',
              description:
                "Pantolon, ceket, mont, elbise, sweatshirt fermuarı. ₺120'den başlar. Aynı gün teslim.",
            },
          },
          {
            '@type': 'Offer',
            name: 'Elbise Daraltma & Tadilat',
            price: '200',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Service',
              name: 'Elbise Daraltma ve Tadilat',
              description:
                "Her tür kıyafette beden küçültme ve tadilat. ₺200'den başlar.",
            },
          },
          {
            '@type': 'Offer',
            name: 'Özel Dikim',
            price: '600',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Service',
              name: 'Özel Dikim',
              description:
                "Ölçüye göre erkek, bayan, çocuk kıyafeti dikimi. ₺600'den başlar.",
            },
          },
          {
            '@type': 'Offer',
            name: 'Üniforma Üretimi',
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Service',
              name: 'Üniforma Üretimi',
              description:
                'Otel, restoran, sağlık, okul ve spor üniforması üretimi. Tasarım + kalıp + seri imalat + nakış.',
            },
          },
          {
            '@type': 'Offer',
            name: 'Kuru Temizleme',
            price: '300',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Service',
              name: 'Kuru Temizleme ve Çamaşır',
              description:
                "Otel alım-teslimat dahil kuru temizleme ve çamaşır. ₺300'den başlar.",
            },
          },
          {
            '@type': 'Offer',
            name: 'Nakış & Logo Baskı',
            price: '100',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Service',
              name: 'Nakış ve Logo Baskı',
              description:
                "Üniforma ve kıyafete logo nakışı, dijital baskı. ₺100'den başlar.",
            },
          },
          {
            '@type': 'Offer',
            name: 'Araçlı Terzi Servisi',
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Service',
              name: 'Mobil Terzi Servisi',
              description:
                'Adrese alım ve teslimat dahil mobil terzi servisi — tüm Antalya ilçeleri.',
            },
          },
        ],
      },
      // ContactPoint for richer rich results
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
      name: 'Terzi Can Antalya | Konyaaltı Terzi | Ütü · Dikim · Tamir · Tadilat',
      url: SITE_URL,
      isPartOf: { '@id': 'https://www.swaphubs.com#website' },
      about: { '@id': `${SITE_URL}#business` },
      description:
        "Antalya Konyaaltı'nda profesyonel terzi Can. Paça kısaltma, elbise tadilat, özel dikim, kuru temizleme, üniforma üretimi. 24–48 saat ekspres teslimat.",
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
        {
          '@type': 'ListItem',
          position: 1,
          name: 'SwapHubs',
          item: 'https://www.swaphubs.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Terzi Antalya',
          item: SITE_URL,
        },
      ],
    },

    // 5. FAQPage
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: "Antalya'da paça kısaltma fiyatı ne kadar? 2025–2026",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Antalya'da paça kısaltma fiyatımız ₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175 civarı. Kesin fiyat için WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Fermuar değişimi kaç lira? Mont, kot, pantolon fermuarı fiyatı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Pantolon ve kot fermuarı değişimi ₺120'den, mont fermuarı ₺300'den başlar. Aynı gün servis mümkündür. WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Eve veya otele gelen terzi Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet, Terzi Can araçlı terzi servisiyle Antalya'nın tüm ilçelerine geliyor. WhatsApp'tan konum paylaşın, terzi adresinize gelsin. +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Mezuniyet abiyesi tamiri ve kısaltması Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, mezuniyet sezonunda (Mayıs–Haziran) abiye tamiri, kısaltma ve tadilatı ekspres 24 saatte yapıyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Düğün sezonu gelinlik tadilatı Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, Nisan–Ekim düğün sezonunda gelinlik tadilatı, kısaltma ve damatlık tadilatı yapıyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: "Antalya'da otel ve restoran üniforması üretimi?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, otel personel üniforma, resepsiyon, aşçı, garson, meydancı, spa üniforma üretiyoruz. Tasarım + kalıp + seri imalat + nakış hepsi tek elden.',
          },
        },
        {
          '@type': 'Question',
          name: "Antalya'da sweatshirt ve eşofman dikimi?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, sweatshirt ve eşofman takımı dikimi, tadilat ve seri üretim yapıyoruz. Nakış ve baskı ile kişiselleştirme de mümkündür.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kuru temizleme hizmeti veriyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, kuru temizleme, çamaşır yıkama ve ütü hizmetleri de sunmaktayız. Otel ve adreslerden kurye ile alım yapılmaktadır.',
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
            text: 'Yes! We offer express dry cleaning with courier pickup and delivery to all hotels in Antalya. Ready in 24–48 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где найти портного и производителя формы в Анталье?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Портной Кан — пошив одежды, производство формы, вышивка в Анталье. Говорим по-русски. WhatsApp: +90 531 898 64 18.',
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
  ],
};

// ─── METADATA ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // metadataBase zorunlu — tüm relative URL'leri çözümler
  metadataBase: new URL('https://www.swaphubs.com'),

  title: {
    default:
      'Terzi Can Antalya | Paça Kısaltma · Tadilat · Üniforma · Kuru Temizleme | Konyaaltı',
    template: '%s | Terzi Can Antalya',
  },

  description: `Antalya Konyaaltı'nda Terzi Can. Paça kısaltma ₺150'den, fermuar değişimi ₺120'den. Özel dikim, üniforma üretimi, kuru temizleme, eve-otele gelen terzi servisi. 24–48 saat ekspres. TR · EN · DE · RU ☎ ${PHONE}`,

  // keywords artık array olmalı (Next.js 14+ bunu string'e çevirir, virgülle)
  keywords: [
    'Antalya Terzi',
    'Terzi Antalya',
    'Konyaaltı Terzi',
    'Terzi Can',
    'Tailor Can',
    'Paça Kısaltma Antalya',
    'Paça Kısaltma Kaç Lira',
    'Paça Kısaltma Fiyatı 2026',
    'Fermuar Değişimi Antalya',
    'Fermuar Değişimi Kaç Lira',
    'Mont Fermuarı Değişimi',
    'Elbise Tadilat Antalya',
    'Kıyafet Tamiri Antalya',
    'Elbise Daraltma',
    'Bel Alma Antalya',
    'Gelinlik Tadilat Antalya',
    'Abiye Dikimi Antalya',
    'Üniforma Dikimi Antalya',
    'Otel Üniforma Üretimi Antalya',
    'Kuru Temizleme Antalya',
    'Nakış Antalya',
    'Sweatshirt Dikimi Antalya',
    'Eve Gelen Terzi Antalya',
    'Otele Gelen Terzi',
    'Araçlı Terzi Servisi Antalya',
    'Terzi Fiyatları 2026',
    'Yakınımda Terzi',
    'Lara Terzi',
    'Belek Terzi',
    'Kemer Terzi',
    'Alanya Terzi',
    'Manavgat Terzi',
    'Side Terzi',
    'Tailor Antalya',
    'Clothing Alterations Antalya',
    'Dry Cleaning Antalya',
    'Mobile Tailor Antalya',
    'Uniform Production Antalya',
    'Hotel Uniform Antalya',
    'Schneider Antalya',
    'Uniformproduktion Antalya',
    'Chemische Reinigung Antalya',
    'Änderungsschneiderei Antalya',
    'Портной Анталья',
    'Химчистка Анталья',
    'Пошив на заказ Анталья',
    'Выездной портной Анталья',
    'Гостиничная форма Анталья',
  ],

  authors: [{ name: 'SwapHubs', url: 'https://www.swaphubs.com' }],
  creator: 'SwapHubs',
  publisher: 'SwapHubs',

  // ─── ROBOTS ─────────────────────────────────────────────────────────────
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

  // ─── CANONICAL + HREFLANG ────────────────────────────────────────────────
  // Next.js App Router'da hreflang için alternates kullanılır.
  // languages objesi hreflang <link> taglerini oluşturur.
  alternates: {
    canonical: 'https://www.swaphubs.com/terzi',
    languages: {
      'tr': 'https://www.swaphubs.com/terzi',
      'en': 'https://www.swaphubs.com/terzi?lang=en',
      'de': 'https://www.swaphubs.com/terzi?lang=de',
      'ru': 'https://www.swaphubs.com/terzi?lang=ru',
      'x-default': 'https://www.swaphubs.com/terzi',
    },
  },

  // ─── OPEN GRAPH ─────────────────────────────────────────────────────────
  openGraph: {
    title: 'Terzi Can | Tailor Can | Портной Кан | Schneider Can — Antalya',
    description: `Konyaaltı ve tüm Antalya'da Terzi Can. Paça kısaltma, tadilat, kuru temizleme, üniforma üretimi. 24–48 saat ekspres. ☎ ${PHONE}`,
    url: 'https://www.swaphubs.com/terzi',
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    // Next.js 14+ alternateLocale doğru şekilde
    alternateLocale: ['en_US', 'de_DE', 'ru_RU'],
    type: 'website',
    images: [
      {
        url: '/og/terzi-can.jpg',
        width: 1200,
        height: 630,
        alt: 'Terzi Can Antalya — Konyaaltı Profesyonel Terzi',
        type: 'image/jpeg',
      },
    ],
  },

  // ─── TWITTER CARD ────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',       // Twitter handle — varsa ekleyin
    creator: '@swaphubs',
    title: 'Terzi Can Antalya | Konyaaltı · Tüm İlçeler',
    description: `Konyaaltı ve tüm Antalya ilçelerinde Terzi Can. TR · EN · DE · RU ☎ ${PHONE}`,
    images: ['/og/terzi-can.jpg'],
  },

  // ─── VERIFICATION ────────────────────────────────────────────────────────
  // Google Search Console, Bing Webmaster Tools doğrulama meta tagları
  // Gerçek değerlerle değiştirin:
  // verification: {
  //   google: 'BURAYA_GOOGLE_VERIFICATION_CODE',
  //   yandex: 'BURAYA_YANDEX_VERIFICATION_CODE',
  //   other: { 'msvalidate.01': 'BURAYA_BING_VERIFICATION_CODE' },
  // },

  // ─── ADDITIONAL META ─────────────────────────────────────────────────────
  other: {
    // Geo tags — yerel SEO için önemli
    'geo.region': 'TR-07',
    'geo.placename': 'Antalya',
    'geo.position': '36.8841;30.7056',
    'ICBM': '36.8841, 30.7056',
    // Dil belirtme
    'content-language': 'tr, en, de, ru',
    // WhatsApp/iletişim için
    'contact': PHONE,
  },
};

// ─── PAGE COMPONENT ─────────────────────────────────────────────────────────
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
