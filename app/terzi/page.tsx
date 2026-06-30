// app/terzi/page.tsx
// ✅ GÜNCELLEME: Doğrulanmış Google İşletme Profili kullanılıyor
//   İşletme: "Konyaaltı Terzi - Terzi Dikim Tamir Tadilat" (Doğrulandı ✓)
//   Adres: Konyaaltı Liman, 07070
//   CID: 16306058881247995687
//
//   "TERZİ Can - Konyaaltı" (Hurma, 07130) HENÜZ DOĞRULANMADI —
//   bu yüzden schema'da ve butonlarda KULLANILMIYOR. Doğrulanınca
//   ikinci işletmeyi ayrı bir sayfada (örn. Hurma mahalle sayfası) kullanabiliriz.

import type { Metadata } from 'next';
import TerziClient from './TerziClient';

const SITE_URL   = 'https://swaphubs.com/terzi';
const HOME_URL   = 'https://swaphubs.com';
const PHONE      = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const TODAY      = new Date().toISOString().split('T')[0];

// ✅ DOĞRULANMIŞ İŞLETME — Maps CID linki
const GBP_NAME    = 'Konyaaltı Terzi - Terzi Dikim Tamir Tadilat';
const GBP_CID     = '16306058881247995687';
const MAPS_URL    = `https://www.google.com/maps?cid=${GBP_CID}`;
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(GBP_NAME)}`;
const OG_IMG      = `${HOME_URL}/og/terzi-can.jpg`;

const PAGE_TITLE = `${GBP_NAME} | Bay & Bayan Terzi, Özel Dikim 2026`;
const PAGE_DESC  =
  `${GBP_NAME} · Konyaaltı Liman · Paça kısaltma ₺150, fermuar değişimi ₺120, bel daraltma, ` +
  'elbise dikimi, özel dikim, üniforma üretimi, kuru temizleme. Eve & otele araçlı terzi servisi. ' +
  'Tüm Antalya ilçeleri. ☎ ' + PHONE;

const ANTALYA_ILCELER = [
  'Antalya','Konyaaltı','Muratpaşa','Kepez','Döşemealtı','Aksu',
  'Lara','Belek','Kemer','Alanya','Manavgat','Side','Serik',
].map(name => ({ '@type': 'City', name }));

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${HOME_URL}#website`,
      name: 'SwapHubs', url: HOME_URL, inLanguage: ['tr','en','ru','de'],
      publisher: {
        '@type': 'Organization', '@id': `${HOME_URL}#organization`,
        name: 'SwapHubs', url: HOME_URL,
        logo: { '@type': 'ImageObject', url: `${HOME_URL}/logo.png`, width: 512, height: 512 },
      },
    },

    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      additionalType: ['https://schema.org/SewingService', 'https://schema.org/DryCleaningService'],
      '@id': `${SITE_URL}#business`,
      // ✅ GBP'deki isimle BİREBİR eşleşiyor — Google eşleştirmesi için kritik
      name: GBP_NAME,
      alternateName: [
        'Terzi Can Antalya', 'Konyaaltı Terzi', 'Tailor Can Antalya',
        'Портной Кан Анталья', 'Schneider Can Antalya',
        'Bay Terzi Antalya', 'Bayan Terzi Antalya', 'Dikiş Atölyesi Antalya',
      ],
      description:
        "Konyaaltı Liman'da profesyonel bay ve bayan terzisi. " +
        "Paça kısaltma ₺150, fermuar değişimi ₺120, bel daraltma, elbise daraltma, özel dikim. " +
        "Tişört, sweatshirt, pantolon, gömlek, mont, şort, gobi tekstil imalatı. " +
        "Üniforma üretimi, dikiş atölyesi, kuru temizleme. Tüm Antalya ilçelerine araçlı terzi servisi.",
      url: SITE_URL,
      telephone: PHONE_E164,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [OG_IMG],
      logo: `${HOME_URL}/logo.png`,
      // ✅ GBP'deki adresle birebir: "Konyaaltı liman, 07070 Konyaaltı/Antalya"
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı Liman',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8820, longitude: 30.6980 },
      // ✅ Doğrulanmış işletmenin gerçek Maps linki
      hasMap: MAPS_URL,
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: 36.8820, longitude: 30.6980 },
        geoRadius: '75000',
      },
      knowsLanguage: ['tr', 'en', 'ru', 'de'],
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00', closes: '19:00',
      }],

      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can — Tüm Hizmetler 2026',
        itemListElement: [
          { '@type': 'Offer', price: '150', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '150', maxPrice: '200', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
            itemOffered: { '@type': 'Service', name: 'Paça Kısaltma — Pantolon Kısaltma Antalya',
              url: `${HOME_URL}/terzi/paca-kisaltma-antalya`, areaServed: ANTALYA_ILCELER } },
          { '@type': 'Offer', price: '120', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '120', maxPrice: '350', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
            itemOffered: { '@type': 'Service', name: 'Fermuar Değişimi Antalya',
              url: `${HOME_URL}/terzi/fermuar-degisimi-antalya`, areaServed: ANTALYA_ILCELER } },
          { '@type': 'Offer', price: '200', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '150', maxPrice: '400', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
            itemOffered: { '@type': 'Service', name: 'Bel Daraltma — Elbise Daraltma Antalya', areaServed: ANTALYA_ILCELER } },
          { '@type': 'Offer', price: '600', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '200', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
            itemOffered: { '@type': 'Service', name: 'Bayan Terzi — Kadın Elbise Dikimi Antalya',
              url: `${HOME_URL}/terzi/bayan-terzi-antalya`, areaServed: ANTALYA_ILCELER } },
          { '@type': 'Offer', price: '2500', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '150', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
            itemOffered: { '@type': 'Service', name: 'Bay Terzi — Erkek Takım Elbise Dikimi Antalya',
              url: `${HOME_URL}/terzi/bay-terzi-antalya`, areaServed: ANTALYA_ILCELER } },
          { '@type': 'Offer', price: '500', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '500', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
            itemOffered: { '@type': 'Service', name: 'Gelinlik Tadilatı Antalya',
              url: `${HOME_URL}/terzi/gelinlik-tadilati-antalya`, areaServed: ANTALYA_ILCELER } },
          { '@type': 'Offer', priceCurrency: 'TRY', availability: 'https://schema.org/InStock',
            itemOffered: { '@type': 'Service', name: 'Dikiş Atölyesi Antalya — Fason ve Seri Üretim',
              url: `${HOME_URL}/terzi/dikis-atolyesi-antalya`, areaServed: ANTALYA_ILCELER } },
          { '@type': 'Offer', priceCurrency: 'TRY', availability: 'https://schema.org/InStock',
            itemOffered: { '@type': 'Service', name: 'Üniforma Üretimi Antalya',
              url: `${HOME_URL}/terzi/uniforma-uretimi-antalya`, areaServed: ANTALYA_ILCELER } },
          { '@type': 'Offer', price: '300', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '80', maxPrice: '500', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
            itemOffered: { '@type': 'Service', name: 'Kuru Temizleme ve Ütü Hizmeti Antalya',
              url: `${HOME_URL}/terzi/kuru-temizleme-antalya`, areaServed: ANTALYA_ILCELER } },
          { '@type': 'Offer', priceCurrency: 'TRY', availability: 'https://schema.org/InStock',
            itemOffered: { '@type': 'Service', name: 'Eve / Otele Gelen Terzi — Yerinde Ölçü — Adrese Teslim',
              url: `${HOME_URL}/terzi/eve-gelen-terzi-antalya`, areaServed: ANTALYA_ILCELER } },
        ],
      },

      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9', reviewCount: '94', bestRating: '5', worstRating: '1',
      },
      review: [
        { '@type': 'Review', author: { '@type': 'Person', name: 'Murat B.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Otelimiz için 45 kişilik personel üniforması diktirdik. Mükemmeldi!', datePublished: '2025-01-15',
          itemReviewed: { '@type': 'LocalBusiness', name: GBP_NAME, '@id': `${SITE_URL}#business` } },
        { '@type': 'Review', author: { '@type': 'Person', name: 'Sarah M.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Amazing tailor in Antalya! Dress altered in 24 hours. Perfect fit!', datePublished: '2025-05-10',
          itemReviewed: { '@type': 'LocalBusiness', name: GBP_NAME, '@id': `${SITE_URL}#business` } },
        { '@type': 'Review', author: { '@type': 'Person', name: 'Наталья К.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Отличный портной! Свадебное платье за 5 дней, доставили в отель!', datePublished: '2025-06-20',
          itemReviewed: { '@type': 'LocalBusiness', name: GBP_NAME, '@id': `${SITE_URL}#business` } },
      ],

      areaServed: ANTALYA_ILCELER,
      contactPoint: [{
        '@type': 'ContactPoint', telephone: PHONE_E164, contactType: 'customer service', areaServed: 'TR',
        availableLanguage: ['Turkish','English','Russian','German'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '09:00', closes: '19:00',
        },
      }],
      // ✅ Doğrulanmış GBP linki sameAs'ta
      sameAs: [MAPS_URL, `https://wa.me/${PHONE_E164.replace('+','')}`, SITE_URL],
    },

    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: PAGE_TITLE, url: SITE_URL,
      isPartOf: { '@id': `${HOME_URL}#website` },
      about: { '@id': `${SITE_URL}#business` },
      description: PAGE_DESC,
      inLanguage: ['tr','en','de','ru'],
      datePublished: '2024-01-01', dateModified: TODAY, lastReviewed: TODAY,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hizmet-fiyatlari','#sik-sorulan-sorular','#terzi-can-ozet'] },
      mainEntity: { '@id': `${SITE_URL}#business` },
    },

    {
      '@type': 'BreadcrumbList', '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME_URL },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi', item: SITE_URL },
      ],
    },

    {
      '@type': 'FAQPage', '@id': `${SITE_URL}#faq`,
      mainEntity: [
        { '@type': 'Question', name: 'Antalya paça kısaltma fiyatı 2026?',
          acceptedAnswer: { '@type': 'Answer', text: `₺150'den başlar. Aynı gün. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Fermuar değişimi fiyatı Antalya 2026?',
          acceptedAnswer: { '@type': 'Answer', text: `Pantolon/kot ₺120, ceket ₺200, mont ₺300. Aynı gün. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Konyaaltı Liman\'da terzi nerede?',
          acceptedAnswer: { '@type': 'Answer', text: `${GBP_NAME}, Konyaaltı Liman'da hizmet vermektedir. Google Haritalar'da doğrulanmış işletmemize ulaşabilirsiniz. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Yerinde ölçü alma ve adrese teslim terzi servisi?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Araçlı terzi servisimizle adresinize geliyoruz. Tüm Antalya. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Bay terzi Antalya — erkek kıyafet dikimi?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Takım elbise, pantolon, gömlek, ceket, blazer, smoking, damatlık. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Bayan terzi Antalya — kadın elbise dikimi?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Elbise, bluz, etek, abiye tamiri, gelinlik tadilatı, büyük beden. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Kuru temizleme ve ütü hizmeti Antalya fiyatları?',
          acceptedAnswer: { '@type': 'Answer', text: `Kuru temizleme ₺300, mont ₺500, çamaşır ₺80/kg. 24 saat. WhatsApp: ${PHONE}` } },
      ],
    },

    {
      '@type': 'ItemList', '@id': `${SITE_URL}#hizmet-listesi`,
      name: 'Terzi Can Hizmetleri — Antalya Terzi 2026',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Bay Terzi — Erkek Kıyafet Dikimi',      url: `${HOME_URL}/terzi/bay-terzi-antalya` },
        { '@type': 'ListItem', position: 2, name: 'Bayan Terzi — Kadın Elbise Dikimi',     url: `${HOME_URL}/terzi/bayan-terzi-antalya` },
        { '@type': 'ListItem', position: 3, name: 'Paça Kısaltma — Pantolon Kısaltma',     url: `${HOME_URL}/terzi/paca-kisaltma-antalya` },
        { '@type': 'ListItem', position: 4, name: 'Dikiş Atölyesi — Fason Seri Üretim',   url: `${HOME_URL}/terzi/dikis-atolyesi-antalya` },
        { '@type': 'ListItem', position: 5, name: 'Üniforma Üretimi',                       url: `${HOME_URL}/terzi/uniforma-uretimi-antalya` },
        { '@type': 'ListItem', position: 6, name: 'Kuru Temizleme ve Ütü',                  url: `${HOME_URL}/terzi/kuru-temizleme-antalya` },
        { '@type': 'ListItem', position: 7, name: 'Eve / Otele Gelen Terzi',               url: `${HOME_URL}/terzi/eve-gelen-terzi-antalya` },
        { '@type': 'ListItem', position: 8, name: 'Gelinlik Tadilatı Antalya',             url: `${HOME_URL}/terzi/gelinlik-tadilati-antalya` },
        { '@type': 'ListItem', position: 9, name: 'Fermuar Değişimi Antalya',              url: `${HOME_URL}/terzi/fermuar-degisimi-antalya` },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: { default: PAGE_TITLE, template: '%s | Terzi Can Antalya' },
  description: PAGE_DESC,
  keywords: [
    'Konyaaltı terzi', 'Konyaaltı Liman terzi', 'Antalya terzi','terzi fiyatları 2026',
    'bay terzi Antalya','bayan terzi Antalya',
    'paça kısaltma Antalya','bel daraltma Antalya','elbise daraltma Antalya',
    'fermuar değişimi Antalya','özel dikim Antalya','yerinde ölçü alma Antalya',
    'tişört imalatı Antalya','sweatshirt dikimi Antalya','tekstil imalatı Antalya',
    'dikiş atölyesi Antalya','eve gelen terzi Antalya','otele gelen terzi Antalya',
    'üniforma üretimi Antalya','gelinlik tadilatı Antalya','kuru temizleme Antalya',
    'tailor Antalya','портной Анталья','Schneider Antalya',
  ],
  authors: [{ name: 'SwapHubs', url: HOME_URL }],
  creator: 'SwapHubs', publisher: 'SwapHubs',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { 'x-default': SITE_URL, tr: SITE_URL, en: SITE_URL, ru: SITE_URL, de: SITE_URL },
  },
  openGraph: {
    title: PAGE_TITLE, description: PAGE_DESC,
    url: SITE_URL, siteName: 'SwapHubs', locale: 'tr_TR',
    alternateLocale: ['en_US','de_DE','ru_RU'], type: 'website',
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: GBP_NAME, type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image', site: '@swaphubs', creator: '@swaphubs',
    title: PAGE_TITLE, description: PAGE_DESC, images: [OG_IMG],
  },
  other: {
    'geo.region': 'TR-07', 'geo.placename': 'Konyaaltı Liman, Antalya',
    'geo.position': '36.8820;30.6980', ICBM: '36.8820, 30.6980',
    'content-language': 'tr, en, ru, de', contact: PHONE,
  },
  verification: {
    yandex: '4c73ee1911a4b197',
    other: { 'msvalidate.01': 'EE22134B7D1B55A44BA700154371D5C3' },
  },
};

export default function TerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TerziClient />
    </>
  );
}
