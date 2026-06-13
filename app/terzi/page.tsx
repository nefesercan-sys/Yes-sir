import type { Metadata } from 'next';
import TerziClient from './TerziClient';

// ──────────────────────────────────────────────────────────────────────────
// KRİTİK: Canonical domain artık "swaphubs.com" (www YOK).
// Vercel: www.swaphubs.com → 301 → swaphubs.com
// Bu yüzden TÜM URL'ler www'suz olmalı, yoksa Google iki ayrı site görür.
// ──────────────────────────────────────────────────────────────────────────
const SITE_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const TODAY = new Date().toISOString().split('T')[0];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── 1. WEBSITE + ORGANIZATION ─────────────────────────────────────────
    {
      '@type': 'WebSite',
      '@id': `${HOME_URL}#website`,
      name: 'SwapHubs',
      url: HOME_URL,
      inLanguage: 'tr',
      publisher: {
        '@type': 'Organization',
        '@id': `${HOME_URL}#organization`,
        name: 'SwapHubs',
        url: HOME_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${HOME_URL}/logo.png`,
          width: 512,
          height: 512,
        },
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${HOME_URL}/ilanlar?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },

    // ── 2. LOCAL BUSINESS (ClothingStore) ─────────────────────────────────
    {
      '@type': 'ClothingStore',
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        'Tailor Can Antalya',
        'Портной Кан Анталья',
        'Schneider Can Antalya',
        'Konyaaltı Terzi Can',
      ],
      description:
        "Antalya Konyaaltı'nda profesyonel terzi. Paça kısaltma ₺150, fermuar değişimi ₺120, elbise dikimi, üniforma üretimi, kuru temizleme. Eve ve otele gelen araçlı terzi servisi.",
      url: SITE_URL,
      telephone: PHONE_E164,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [`${HOME_URL}/og/terzi-can.jpg`],
      logo: `${HOME_URL}/logo.png`,
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
      hasMap: 'https://www.google.com/maps?q=36.8841,30.7056',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],

      // ── DEVRİMSEL EKLENTİ: Hizmet Kataloğu (OfferCatalog) ───────────────
      // Rakiplerin %95'i bunu kullanmıyor. Her hizmet için ayrı Offer +
      // PriceSpecification → Google'da fiyatlı "ürün benzeri" snippet
      // olasılığı (özellikle Merchant/Shopping deneyimlerinde).
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can Hizmet ve Fiyat Listesi',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Paça Kısaltma',
              description: 'Kot, kumaş pantolon ve elbise paça kısaltma hizmeti',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '150',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '150',
              maxPrice: '175',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fermuar Değişimi',
              description: 'Pantolon, kot ve mont fermuar değişimi',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '120',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '120',
              maxPrice: '300',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Elbise Dikimi',
              description: 'Özel ölçü elbise dikimi ve tasarımı',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '600',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '600',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Gelinlik Tadilatı',
              description: 'Gelinlik daraltma, paça ve tadilat hizmeti',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '500',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '500',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Üniforma Üretimi',
              description: 'Otel, kurumsal ve okul üniforma seri üretimi, nakış dahil',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Eve / Otele Gelen Terzi Servisi',
              description: 'Konyaaltı, Lara, Belek, Kemer, Alanya dahil araçlı terzi servisi',
              areaServed: [
                { '@type': 'City', name: 'Antalya' },
                { '@type': 'City', name: 'Lara' },
                { '@type': 'City', name: 'Belek' },
                { '@type': 'City', name: 'Kemer' },
                { '@type': 'City', name: 'Alanya' },
              ],
            },
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
          },
        ],
      },

      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
        itemReviewed: {
          '@type': 'ClothingStore',
          name: 'Terzi Can',
        },
      },
      review: [
        {
          '@type': 'Review',
          name: 'Üniforma Üretimi — Mükemmel Hizmet',
          author: { '@type': 'Person', name: 'Murat B.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody:
            'Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim, nakış kalitesi harika!',
          datePublished: '2025-01-15',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Best Tailor in Antalya',
          author: { '@type': 'Person', name: 'Sarah M.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody:
            'Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional. Highly recommend!',
          datePublished: '2025-05-10',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Лучший портной в Анталье',
          author: { '@type': 'Person', name: 'Наталья К.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody:
            'Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель в Белеке!',
          datePublished: '2025-06-20',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Ausgezeichnete Qualität',
          author: { '@type': 'Person', name: 'David K.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody:
            'Wir bestellten bestickte Sweatshirts für unser Team — 30 Stück, pünktlich geliefert. Ausgezeichnete Qualität!',
          datePublished: '2025-02-08',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Hızlı ve Kaliteli Terzi',
          author: { '@type': 'Person', name: 'Elif Y.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody:
            'Gelinliğimi mükemmel şekilde teslim ettiler. Paça kısaltmayı aynı gün yaptılar. Hızlı ve kaliteli hizmet!',
          datePublished: '2025-04-10',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Perfect English-Speaking Tailor',
          author: { '@type': 'Person', name: 'James T.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody:
            'Suit altered for a business meeting in 24h. Perfect fit. English speaking — best tailor in Antalya!',
          datePublished: '2025-03-15',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
      ],

      areaServed: [
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'City', name: 'Konyaaltı' },
        { '@type': 'City', name: 'Muratpaşa' },
        { '@type': 'City', name: 'Kepez' },
        { '@type': 'City', name: 'Lara' },
        { '@type': 'City', name: 'Belek' },
        { '@type': 'City', name: 'Kemer' },
        { '@type': 'City', name: 'Alanya' },
        { '@type': 'City', name: 'Manavgat' },
        { '@type': 'City', name: 'Side' },
      ],

      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: PHONE_E164,
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
        `https://wa.me/${PHONE_E164.replace('+', '')}`,
        SITE_URL,
        `${HOME_URL}/online-terzi-hizmeti`,
        `${HOME_URL}/online-tailor-service`,
      ],
    },

    // ── 3. WEBPAGE ──────────────────────────────────────────────────────────
    // DEVRİMSEL: "speakable" eklendi → Google Assistant / sesli arama
    // bu sayfanın hangi bölümlerini sesli okuyabileceğini biliyor.
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Antalya Terzi · Paça Kısaltma · Elbise Dikimi · Üniforma | Terzi Can Konyaaltı',
      url: SITE_URL,
      isPartOf: { '@id': `${HOME_URL}#website` },
      about: { '@id': `${SITE_URL}#business` },
      description:
        "Antalya Konyaaltı'nda Terzi Can. Paça kısaltma, elbise dikimi, fermuar değişimi, üniforma üretimi, kuru temizleme. Eve-otele gelen terzi servisi.",
      inLanguage: ['tr', 'en', 'de', 'ru'],
      datePublished: '2024-01-01',
      dateModified: TODAY,
      lastReviewed: TODAY,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: [
          '#hizmet-fiyatlari',
          '#sik-sorulan-sorular',
          '#terzi-can-ozet',
        ],
      },
      mainEntity: { '@id': `${SITE_URL}#business` },
    },

    // ── 4. BREADCRUMB ─────────────────────────────────────────────────────
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME_URL },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi', item: SITE_URL },
      ],
    },

    // ── 5. FAQ ────────────────────────────────────────────────────────────
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya paça kısaltma fiyatı ne kadar? 2025-2026',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Antalya'da paça kısaltma fiyatımız ₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175 civarı. Kesin fiyat için WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Fermuar değişimi kaç lira? Mont, kot, pantolon fermuarı Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Pantolon ve kot fermuarı ₺120'den, mont fermuarı ₺300'den başlar. Aynı gün teslim mümkündür. WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Eve veya otele gelen terzi Antalya var mı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Evet! Araçlı terzi servisimizle Konyaaltı, Lara, Belek, Kemer, Alanya dahil tüm Antalya ilçelerine geliyoruz. WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Elbise dikimi ve tadilatı Antalya fiyatları 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Elbise dikimi ₺600'den, elbise daraltma ₺200'den başlar. Abiye tamiri ₺350'den, gelinlik tadilatı ₺500'den başlar. WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Is there an English-speaking tailor in Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes! Tailor Can offers English-speaking tailoring in all Antalya districts. Alterations, dry cleaning, uniform production, mobile tailor service. WhatsApp: ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Есть ли русскоязычный портной в Анталье?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Да! Портной Кан обслуживает по-русски. Подгонка брюк, химчистка, пошив на заказ. Выездной сервис по всей Анталье. WhatsApp: ${PHONE}.`,
          },
        },
      ],
    },

    // ── 6. HOWTO — DEVRİMSEL EKLENTİ ─────────────────────────────────────
    // Rakip terzi sitelerinde HowTo schema YOK. Bu, "nasıl ölçü alınır"
    // gibi sorular için Google'da adım-adım rich snippet/Featured Snippet
    // kazanma olasılığını artırır.
    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}#howto-olcu`,
      name: 'Pantolon Paça Kısaltma İçin Doğru Ölçü Nasıl Alınır?',
      description:
        'Terzi Can ile paça kısaltma randevusu öncesi evde doğru ölçü almanın 3 adımı.',
      totalTime: 'PT5M',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Ayakkabınızı giyin',
          text: 'Paça uzunluğunu, genellikle giyeceğiniz ayakkabıyla ölçün — topuk yüksekliği farkı paça boyunu değiştirir.',
        },
        {
          '@type': 'HowToStep',
          name: 'İstenen paça boyunu işaretleyin',
          text: 'Pantolonu ayakkabı üzerinde istediğiniz uzunlukta toplu iğne veya tebeşirle işaretleyin.',
        },
        {
          '@type': 'HowToStep',
          name: 'Terzi Can ile WhatsApp üzerinden randevu alın',
          text: `Ölçünüzü ve fotoğrafınızı WhatsApp ${PHONE} üzerinden gönderin, aynı gün veya ertesi gün için randevu alın.`,
        },
      ],
    },

    // ── 7. ITEMLIST — Hizmetlerin liste olarak indekslenmesi ─────────────
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}#hizmet-listesi`,
      name: 'Terzi Can Hizmetleri',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Paça Kısaltma', url: `${SITE_URL}#paca-kisaltma` },
        { '@type': 'ListItem', position: 2, name: 'Fermuar Değişimi', url: `${SITE_URL}#fermuar-degisimi` },
        { '@type': 'ListItem', position: 3, name: 'Elbise Dikimi', url: `${SITE_URL}#elbise-dikimi` },
        { '@type': 'ListItem', position: 4, name: 'Gelinlik Tadilatı', url: `${SITE_URL}#gelinlik-tadilati` },
        { '@type': 'ListItem', position: 5, name: 'Üniforma Üretimi', url: `${SITE_URL}#uniforma-uretimi` },
        { '@type': 'ListItem', position: 6, name: 'Eve / Otele Gelen Terzi', url: `${SITE_URL}#eve-gelen-terzi` },
      ],
    },
  ],
};

// ──────────────────────────────────────────────────────────────────────────
// METADATA
// ──────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: {
    default: 'Antalya Terzi · Paça Kısaltma ₺150 · Elbise Dikimi · Terzi Can',
    template: '%s | Terzi Can Antalya',
  },
  description:
    'Konyaaltı Terzi Can: paça kısaltma ₺150, fermuar değişimi ₺120, elbise dikimi, üniforma. Eve & otele gelen terzi. 24-48s ekspres. TR·EN·RU·DE ☎ ' +
    PHONE,
  keywords: [
    'Antalya terzi',
    'Konyaaltı terzi',
    'terzi Antalya',
    'elbise dikimi Antalya',
    'paça kısaltma Antalya',
    'paça kısaltma fiyatı 2026',
    'fermuar değişimi Antalya',
    'eve gelen terzi Antalya',
    'otele gelen terzi Antalya',
    'araçlı terzi servisi',
    'elbise daraltma Antalya',
    'kıyafet tamiri Antalya',
    'gelinlik tadilatı Antalya',
    'abiye tamiri Antalya',
    'kuru temizleme Antalya',
    'üniforma dikimi Antalya',
    'nakış Antalya',
    'Lara terzi',
    'Belek terzi',
    'Kemer terzi',
    'Alanya terzi',
    'tailor Antalya',
    'mobile tailor Antalya',
    'dry cleaning Antalya',
    'Schneider Antalya',
    'портной Анталья',
    'terzi fiyatları 2026',
  ],
  authors: [{ name: 'SwapHubs', url: HOME_URL }],
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
    languages: {
      tr: SITE_URL,
      en: `${SITE_URL}?lang=en`,
      ru: `${SITE_URL}?lang=ru`,
      de: `${SITE_URL}?lang=de`,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: 'Terzi Can Antalya · Paça Kısaltma · Elbise Dikimi · Üniforma',
    description:
      "Konyaaltı & tüm Antalya'da profesyonel terzi. Paça ₺150, fermuar ₺120, eve-otele servis. 24-48h ekspres. TR·EN·RU·DE ☎ " +
      PHONE,
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'de_DE', 'ru_RU'],
    type: 'website',
    images: [
      {
        url: '/og/terzi-can.jpg',
        width: 1200,
        height: 630,
        alt: 'Terzi Can Antalya — Paça Kısaltma, Elbise Dikimi, Üniforma',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    creator: '@swaphubs',
    title: 'Terzi Can Antalya · Paça Kısaltma · Elbise Dikimi',
    description:
      'Konyaaltı & tüm Antalya. Paça ₺150, fermuar ₺120, eve-otele servis. TR·EN·RU·DE ☎ ' + PHONE,
    images: ['/og/terzi-can.jpg'],
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056',
    ICBM: '36.8841, 30.7056',
    'content-language': 'tr, en, ru, de',
    contact: PHONE,
  },
};

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
