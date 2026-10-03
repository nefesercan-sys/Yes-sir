import type { Metadata } from 'next';
import OnlineTailorClient from './OnlineTailorClient';

const BASE_URL  = 'https://swaphubs.com';
const SITE_URL  = `${BASE_URL}/online-tailor-service`;
const PHONE     = '+90 531 898 64 18';
const PHONE_E   = '+905318986418';
const TODAY     = new Date().toISOString().split('T')[0];
const OG_IMG    = `${BASE_URL}/og/terzi-can.jpg`;

// Konyaaltı Hurma ve Liman Şube / Lokasyon Bilgileri
const GBP1 = {
  name:  'TERZİ Can - Konyaaltı Hurma',
  addr:  'Hurma Mahallesi, 07130 Konyaaltı / Antalya',
  maps:  'https://www.google.com/maps/place/?q=place_id:0x14c39311e6924c67:0x59547225251db8a0',
  short: 'https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8',
  embed: 'https://www.google.com/maps?q=TERZ%C4%B0+Can+Konyaalt%C4%B1+Hurma+Antalya&output=embed',
  review:'https://search.google.com/local/writereview?placeid=0x14c39311e6924c67:0x59547225251db8a0'
};

const GBP2 = {
  name:  'TERZİ Can - Konyaaltı Liman & Ütü Hizmetleri',
  addr:  'Liman Mahallesi, 07070 Konyaaltı / Antalya',
  maps:  'https://maps.app.goo.gl/VjFEbtfVYRzc7dBN9',
  short: 'https://maps.app.goo.gl/VjFEbtfVYRzc7dBN9?g_st=ac',
  embed: 'https://www.google.com/maps?q=TERZ%C4%B0+Can+Konyaalt%C4%B1+Liman+Antalya&output=embed',
  review:'https://maps.app.goo.gl/VjFEbtfVYRzc7dBN9'
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Online Tailor Service Antalya — Menswear & Womenswear Tailoring · Ironing Service',
  description:
    'Konyaaltı-based online tailor service. Menswear & womenswear tailoring, ironing, repairs, alterations, ' +
    'mass production. Shipping across Turkey. Order via WhatsApp. ☎ ' + PHONE,
  keywords: [
    'online tailor Antalya', 'menswear tailoring Antalya', 'womenswear tailoring Antalya',
    'ironing service Antalya', 'repairs alterations Antalya', 'mass production Antalya',
    'Konyaaltı tailor', 'online tailor service', 'tailor Antalya',
    'recommend a tailor Antalya', 'find a tailor near me', 'best tailor Antalya', 'cheapest tailor Antalya',
    'my dress is torn', 'tailor open in the evening', 'tailor open on weekends',
    'custom dress made Antalya', 'natural cotton linen sewing', 'quality clothing manufacturer',
  ],
  alternates: {
    canonical: SITE_URL,
    // DÜZELTME (2026-09-26): Bu sayfa İNGİLİZCE içerik olduğu halde 'tr' olarak
    // kendine referans veriyordu ve 'en' hiç tanımlanmamıştı — düzeltildi.
    languages: {
      'tr': `${BASE_URL}/terzi`,
      'en': SITE_URL,
      'de': `${BASE_URL}/de/online-schneiderservice-antalya`,
      'ru': `${BASE_URL}/ru/atelie-antalya`,
      'x-default': `${BASE_URL}/terzi`,
    },
  },
  openGraph: {
    title: 'Online Tailor Service Antalya — Menswear & Womenswear Tailoring',
    description: 'Menswear & womenswear tailoring, ironing, repairs, alterations, mass production. Shipping across Turkey.',
    url: SITE_URL, siteName: 'SwapHubs', locale: 'en_US', alternateLocale: ['tr_TR', 'de_DE', 'ru_RU'], type: 'website',
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: 'Online Tailor Service Antalya', type: 'image/jpeg' }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'geo.region': 'TR-07', 'geo.placename': 'Hurma, Konyaaltı, Antalya',
    'geo.position': '36.8615;30.6095', ICBM: '36.8615, 30.6095',
  },
  verification: {
    yandex: '4c73ee1911a4b197',
    other: { 'msvalidate.01': 'EE22134B7D1B55A44BA700154371D5C3' },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      additionalType: 'https://schema.org/SewingService',
      '@id': `${SITE_URL}#business`,
      name: 'TERZİ Can - Konyaaltı Terzi Ve Ütü Hizmeti',
      alternateName: ['Online Tailor Service Antalya', 'Terzi Can Antalya', 'Tailor Can Antalya'],
      description:
        'Konyaaltı-based online tailor service. Menswear and womenswear tailoring, ' +
        'ironing, repairs, alterations, custom design and mass production.',
      url: SITE_URL,
      telephone: PHONE_E,
      priceRange: '₺₺',
      image: OG_IMG,
      hasMap: GBP1.maps,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hurma Mahallesi',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07130',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8615, longitude: 30.6095 },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],
        opens: '08:00', closes: '23:00',
      }],
      sameAs: [GBP1.maps, GBP1.short, `https://wa.me/${PHONE_E.replace('+','')}`, `${BASE_URL}/terzi`],
      knowsLanguage: ['tr', 'en', 'ru', 'de'],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Online Tailor Service Antalya — Erkek & Bayan Kıyafet Dikimi · Ütü Hizmeti',
      url: SITE_URL, inLanguage: ['tr','en','ru','de'], dateModified: TODAY,
      about: { '@id': `${SITE_URL}#business` },
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList', '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Terzi Can', item: `${BASE_URL}/terzi` },
        { '@type': 'ListItem', position: 3, name: 'Online Tailor Service', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: "How much does a men's suit cost in Antalya?",
          acceptedAnswer: { '@type': 'Answer', text: `Starts from ₺2,500. Send your measurements via WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'How does the online tailor service work?',
          acceptedAnswer: { '@type': 'Answer', text: `Send a reference photo and measurements via WhatsApp — we sew it and ship it. ${PHONE}` } },
        { '@type': 'Question', name: 'Do you come to my hotel for ironing?',
          acceptedAnswer: { '@type': 'Answer', text: `Yes! Courier pickup and delivery to every hotel in Antalya, same day. ${PHONE}` } },
        { '@type': 'Question', name: 'Is there an English-speaking tailor in Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Yes! We speak English, Russian and German. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'My dress is torn — can you repair it the same day?',
          acceptedAnswer: { '@type': 'Answer', text: `Yes, most tears and split seams are fixed the same day. Send a photo via WhatsApp for an instant estimate. ${PHONE}` } },
        { '@type': 'Question', name: 'Are you open in the evening or on weekends?',
          acceptedAnswer: { '@type': 'Answer', text: `Yes, we're open every day of the week, 08:00–23:00, including evenings and weekends. Message us on WhatsApp to book a time. ${PHONE}` } },
        { '@type': 'Question', name: 'Can I have a custom dress made for myself?',
          acceptedAnswer: { '@type': 'Answer', text: `Yes, we make custom garments to your measurements and chosen style — from everyday dresses to evening gowns. Send a reference photo via WhatsApp. ${PHONE}` } },
        { '@type': 'Question', name: 'Do you sew with natural fabrics like cotton or linen?',
          acceptedAnswer: { '@type': 'Answer', text: `Yes, we offer custom tailoring in 100% cotton and linen fabric. ${PHONE}` } },
      ],
    },
  ],
};

export default function OnlineTailorServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OnlineTailorClient
        gbpName1={GBP1.name}
        gbpAddr1={GBP1.addr}
        gbpEmbed1={GBP1.embed}
        gbpMaps1={GBP1.maps}
        gbpShort1={GBP1.short}
        gbpReview1={GBP1.review}
        gbpName2={GBP2.name}
        gbpAddr2={GBP2.addr}
        gbpEmbed2={GBP2.embed}
        gbpMaps2={GBP2.maps}
        gbpShort2={GBP2.short}
        gbpReview2={GBP2.review}
      />
    </>
  );
}
