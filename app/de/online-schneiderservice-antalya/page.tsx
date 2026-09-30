import type { Metadata } from 'next';
import OnlineSchneiderClient from './OnlineSchneiderClient';

const BASE_URL  = 'https://swaphubs.com';
const SITE_URL  = `${BASE_URL}/de/online-schneiderservice-antalya`;
const PHONE     = '+90 531 898 64 18';
const PHONE_E   = '+905318986418';
const TODAY     = new Date().toISOString().split('T')[0];
const OG_IMG    = `${BASE_URL}/og/terzi-can.jpg`;

// Konyaaltı Hurma ve Liman Şube / Lokasyon Bilgileri (EN sayfasıyla aynı, gerçek işletme verisi)
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
  title: 'Online Schneiderservice Antalya — Herren- & Damenschneiderei · Bügelservice',
  description:
    'Online-Schneiderservice mit Sitz in Konyaaltı. Herren- & Damenschneiderei, Bügelservice, Reparaturen, ' +
    'Änderungen, Serienproduktion. Versand in die ganze Türkei. Bestellung per WhatsApp. ☎ ' + PHONE,
  keywords: [
    'Online Schneider Antalya', 'Herrenschneiderei Antalya', 'Damenschneiderei Antalya',
    'Bügelservice Antalya', 'Änderungsschneiderei Antalya', 'Serienproduktion Antalya',
    'Konyaaltı Schneider', 'Online Schneiderservice', 'Schneider Antalya',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      'tr': `${BASE_URL}/terzi`,
      'en': `${BASE_URL}/online-tailor-service`,
      'de': SITE_URL,
      'ru': `${BASE_URL}/ru/atelie-antalya`,
      'x-default': `${BASE_URL}/terzi`,
    },
  },
  openGraph: {
    title: 'Online Schneiderservice Antalya — Herren- & Damenschneiderei',
    description: 'Herren- & Damenschneiderei, Bügelservice, Reparaturen, Änderungen, Serienproduktion. Versand in die ganze Türkei.',
    url: SITE_URL, siteName: 'SwapHubs', locale: 'de_DE', alternateLocale: ['tr_TR', 'en_US', 'ru_RU'], type: 'website',
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: 'Online Schneiderservice Antalya', type: 'image/jpeg' }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'geo.region': 'TR-07', 'geo.placename': 'Hurma, Konyaaltı, Antalya',
    'geo.position': '36.8615;30.6095', ICBM: '36.8615, 30.6095',
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
      alternateName: ['Online Schneiderservice Antalya', 'Terzi Can Antalya', 'Tailor Can Antalya'],
      description:
        'Online-Schneiderservice mit Sitz in Konyaaltı. Herren- und Damenschneiderei, ' +
        'Bügelservice, Reparaturen, Änderungen, individuelles Design und Serienproduktion.',
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
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00', closes: '19:00',
      }],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '11', bestRating: '5', worstRating: '1' },
      sameAs: [GBP1.maps, GBP1.short, GBP2.maps, `https://wa.me/${PHONE_E.replace('+','')}`, `${BASE_URL}/terzi`],
      knowsLanguage: ['tr', 'en', 'ru', 'de'],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Online Schneiderservice Antalya — Herren- & Damenschneiderei · Bügelservice',
      url: SITE_URL, inLanguage: 'de', dateModified: TODAY,
      about: { '@id': `${SITE_URL}#business` },
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList', '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Terzi Can', item: `${BASE_URL}/terzi` },
        { '@type': 'ListItem', position: 3, name: 'Online Schneiderservice', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Was kostet ein Herrenanzug in Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Ab ₺2.500. Senden Sie Ihre Maße per WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Wie funktioniert der Online-Schneiderservice?',
          acceptedAnswer: { '@type': 'Answer', text: `Senden Sie ein Referenzfoto und Maße per WhatsApp — wir nähen und versenden es. ${PHONE}` } },
        { '@type': 'Question', name: 'Kommen Sie für den Bügelservice zu meinem Hotel?',
          acceptedAnswer: { '@type': 'Answer', text: `Ja! Kurierabholung und -lieferung zu jedem Hotel in Antalya, am selben Tag. ${PHONE}` } },
        { '@type': 'Question', name: 'Gibt es einen deutschsprachigen Schneider in Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Ja! Wir sprechen Deutsch, Englisch und Russisch. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Mein Kleid ist gerissen — können Sie es am selben Tag reparieren?',
          acceptedAnswer: { '@type': 'Answer', text: `Ja, die meisten Risse und offenen Nähte werden am selben Tag repariert. Senden Sie ein Foto per WhatsApp für eine sofortige Einschätzung. ${PHONE}` } },
        { '@type': 'Question', name: 'Haben Sie abends oder am Wochenende geöffnet?',
          acceptedAnswer: { '@type': 'Answer', text: `Ja, wir haben 6 Tage die Woche geöffnet, auch abends. Schreiben Sie uns auf WhatsApp für einen Termin. ${PHONE}` } },
        { '@type': 'Question', name: 'Kann ich mir ein individuelles Kleid anfertigen lassen?',
          acceptedAnswer: { '@type': 'Answer', text: `Ja, wir fertigen Kleidungsstücke nach Ihren Maßen und Ihrem gewünschten Stil — vom Alltagskleid bis zum Abendkleid. Senden Sie ein Referenzfoto per WhatsApp. ${PHONE}` } },
        { '@type': 'Question', name: 'Nähen Sie mit Naturstoffen wie Baumwolle oder Leinen?',
          acceptedAnswer: { '@type': 'Answer', text: `Ja, wir bieten maßgeschneiderte Kleidung aus 100% Baumwolle und Leinen an. ${PHONE}` } },
      ],
    },
  ],
};

export default function OnlineSchneiderservicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OnlineSchneiderClient
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
