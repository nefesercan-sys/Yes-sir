// app/online-tailor-service/page.tsx
// ✅ BUILD HATASI DÜZELTİLDİ
// Hata: <OnlineTailorClient /> prop'suz çağrılıyordu, 6 zorunlu prop eksikti.
// Çözüm: GBP verileri burada tanımlanıp prop olarak geçirildi.

import type { Metadata } from 'next';
import OnlineTailorClient from './OnlineTailorClient';

const BASE_URL  = 'https://swaphubs.com';
const SITE_URL  = `${BASE_URL}/online-tailor-service`;
const PHONE     = '+90 531 898 64 18';
const PHONE_E   = '+905318986418';
const TODAY     = new Date().toISOString().split('T')[0];
const OG_IMG    = `${BASE_URL}/og/terzi-can.jpg`;

// ── GBP 1 — ✅ DOĞRULANMIŞ · Liman Mah. · CID: 16306058881247995687 ──────────
const GBP1 = {
  maps:  'https://www.google.com/maps?cid=16306058881247995687',
  short: 'https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8',
  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d30.6980!3d36.8820!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKonyaalt%C4%B1+Terzi+-+Terzi+Dikim+Tamir+Tadilat!5e0!3m2!1str!2str!4v1',
};

// ── GBP 2 — ⏳ Hurma · Doğrulama bekliyor ─────────────────────────────────────
// Henüz doğrulanmadı. Doğrulanana kadar GBP1 ile aynı embed gösterilir.
// Doğrulandığında CID: 14310476408054735480 ile güncelleyin.
const GBP2 = {
  maps:  'https://www.google.com/maps?cid=14310476408054735480',
  short: 'https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8',
  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d30.6900!3d36.8900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKonyaalt%C4%B1+Hurma+Terzi!5e0!3m2!1str!2str!4v1',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Online Tailor Service Antalya — Erkek & Bayan Kıyafet Dikimi · Ütü Hizmeti',
  description:
    'Konyaaltı merkezli online terzi hizmeti. Erkek & bayan kıyafet dikimi, ütü, tamir, tadilat, ' +
    'seri imalat. Türkiye geneline kargo. WhatsApp sipariş. ☎ ' + PHONE,
  keywords: [
    'online terzi Antalya', 'erkek kıyafet dikimi Antalya', 'bayan kıyafet dikimi Antalya',
    'ütü hizmeti Antalya', 'tamir tadilat Antalya', 'seri imalat Antalya',
    'Konyaaltı terzi', 'online tailor Antalya', 'tailor Antalya',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      'tr': SITE_URL,
      'ru': `${BASE_URL}/ru/atelie-antalya-online`,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: 'Online Tailor Service Antalya — Erkek & Bayan Kıyafet Dikimi',
    description: 'Erkek & bayan kıyafet dikimi, ütü, tamir, tadilat, seri imalat. Türkiye geneline kargo.',
    url: SITE_URL, siteName: 'SwapHubs', locale: 'tr_TR', type: 'website',
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: 'Online Tailor Service Antalya', type: 'image/jpeg' }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'geo.region': 'TR-07', 'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8820;30.6980', ICBM: '36.8820, 30.6980',
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
      name: 'Konyaaltı Terzi - Terzi Dikim Tamir Tadilat',
      alternateName: ['Online Tailor Service Antalya', 'Terzi Can Antalya', 'Tailor Can Antalya'],
      description:
        'Konyaaltı merkezli online terzi hizmeti. Erkek ve bayan kıyafet dikimi, ' +
        'ütü, tamir, tadilat, kişiye özel tasarım ve seri imalat.',
      url: SITE_URL,
      telephone: PHONE_E,
      priceRange: '₺₺',
      image: OG_IMG,
      hasMap: GBP1.maps,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Liman Mahallesi', addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya', postalCode: '07070', addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8820, longitude: 30.6980 },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00', closes: '19:00',
      }],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '94', bestRating: '5', worstRating: '1' },
      sameAs: [GBP1.maps, GBP1.short, `https://wa.me/${PHONE_E.replace('+','')}`, `${BASE_URL}/terzi`],
      knowsLanguage: ['tr', 'en', 'ru'],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Online Tailor Service Antalya — Erkek & Bayan Kıyafet Dikimi · Ütü Hizmeti',
      url: SITE_URL, inLanguage: ['tr','en','ru'], dateModified: TODAY,
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
        { '@type': 'Question', name: "Antalya'da erkek takım elbise dikimi fiyatı?",
          acceptedAnswer: { '@type': 'Answer', text: `₺2.500'den başlar. WhatsApp'tan ölçü gönderin: ${PHONE}` } },
        { '@type': 'Question', name: 'Online terzi hizmeti nasıl çalışır?',
          acceptedAnswer: { '@type': 'Answer', text: `WhatsApp'tan model ve ölçü gönderin, dikip kargoluyoruz. ${PHONE}` } },
        { '@type': 'Question', name: 'Ütü için otelime geliyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Tüm Antalya otellerine kurye alım ve teslimat. Aynı gün. ${PHONE}` } },
        { '@type': 'Question', name: 'Is there an English-speaking tailor in Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Yes! We speak English, Russian and German. WhatsApp: ${PHONE}` } },
      ],
    },
  ],
};

export default function OnlineTailorServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ✅ 6 zorunlu prop doğru şekilde geçiriliyor */}
      <OnlineTailorClient
        gbpEmbed1={GBP1.embed}
        gbpEmbed2={GBP2.embed}
        gbpMaps1={GBP1.maps}
        gbpMaps2={GBP2.maps}
        gbpShort1={GBP1.short}
        gbpShort2={GBP2.short}
      />
    </>
  );
}
