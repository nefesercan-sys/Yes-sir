import type { Metadata } from 'next';
import ReviewsBlock from '@/components/ReviewsBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import BusinessSchema from '@/components/BusinessSchema';
import OnlineTailorClient from './OnlineTailorClient';

const BASE_URL  = 'https://swaphubs.com';
const SITE_URL  = `${BASE_URL}/online-tailor-service`;
const PHONE     = '+90 531 898 64 18';
const PHONE_E   = '+905318986418';
const TODAY = '2026-10-07';
const OG_IMG    = `${BASE_URL}/og/terzi-can.jpg`;

// Tek konum: Hurma, Konyaaltı (Google Business Profile)
const GBP1 = {
  name:  'TERZİ Can - Konyaaltı',
  addr:  'Hurma Mahallesi, 07130 Konyaaltı / Antalya',
  maps:  'https://www.google.com/maps?cid=6436895271281342624',
  short: 'https://www.google.com/maps?cid=6436895271281342624',
  embed: 'https://www.google.com/maps?q=TERZ%C4%B0+Can+-+Konyaalt%C4%B1%2C+Hurma%2C+07130+Konyaalt%C4%B1%2FAntalya&ftid=0x14c39311e6924c67:0x59547225251db8a0&z=17&output=embed',
  review:'https://www.google.com/maps?cid=6436895271281342624'
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Antalya Tailor: Send a Photo, Get a Quote | Terzi Can' },
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
    url: SITE_URL, siteName: 'Terzi Can Antalya', locale: 'en_US', alternateLocale: ['tr_TR', 'de_DE', 'ru_RU'], type: 'website',
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: 'Online Tailor Service Antalya', type: 'image/jpeg' }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'geo.region': 'TR-07', 'geo.placename': 'Hurma, Konyaaltı, Antalya',
    'geo.position': '36.8572868;30.5970193', ICBM: '36.8572868, 30.5970193',
  },
  verification: {
    yandex: '4c73ee1911a4b197',
    other: { 'msvalidate.01': 'EE22134B7D1B55A44BA700154371D5C3' },
  },
};

const FAQ = [
  { q: "How much does a men's suit cost in Antalya?", a: `Starts from ₺2,500. Send your measurements via WhatsApp: ${PHONE}` },
  { q: 'How does the online tailor service work?', a: `Send a reference photo and measurements via WhatsApp — we sew it and ship it. ${PHONE}` },
  { q: 'Do you come to my hotel for ironing?', a: `Yes! Courier pickup and delivery to hotels in Antalya: free in Konyaaltı, priced by distance elsewhere. We agree the timing on WhatsApp. ${PHONE}` },
  { q: 'Is there an English-speaking tailor in Antalya?', a: `Yes! We speak English, Russian and German. WhatsApp: ${PHONE}` },
  { q: 'My dress is torn — can you repair it the same day?', a: `Yes, most tears and split seams are fixed the same day. Send a photo via WhatsApp for an instant estimate. ${PHONE}` },
  { q: 'Are you open in the evening or on weekends?', a: `Yes, we're open every day of the week, 08:00–23:00, including evenings and weekends. Message us on WhatsApp to book a time. ${PHONE}` },
  { q: 'Can I have a custom dress made for myself?', a: `Yes, we make custom garments to your measurements and chosen style — from everyday dresses to evening gowns. Send a reference photo via WhatsApp. ${PHONE}` },
  { q: 'Do you sew with natural fabrics like cotton or linen?', a: `Yes, we offer custom tailoring in 100% cotton and linen fabric. ${PHONE}` },
  { q: "Where can I get trousers hemmed near me in Antalya?", a: `At Terzi Can in Hurma, Konyaaltı, open every day 08:00–23:00. Hemming (trousers, jeans) starts at ₺200 and is usually done the same day or within 24 hours. WhatsApp: ${PHONE}` },
  { q: "How much does hemming and zipper replacement cost in Antalya?", a: `Hemming from ₺200, waist taking-in from ₺200, zipper replacement from ₺300, wedding dress alteration from ₺800 (2026 prices). Send a photo on WhatsApp for an exact quote.` },
  { q: "Can you alter a jacket, coat, shirt, skirt or shorts?", a: `Yes. We alter and repair jackets, coats, shirts, skirts, shorts, dresses and trousers for men and women. Send a photo of the garment on WhatsApp and we will quote the price and time.` },
  { q: "I am a hotel guest staying only a few days. Is that enough time?", a: `Yes. Most hemming and repairs are ready the same day or within 24 hours, and we can pick up and return clothes to your hotel (free in Konyaaltı, priced by distance elsewhere).` },
];

export default function OnlineTailorServicePage() {
  return (
    <>
      <BusinessSchema
        path={SITE_URL.replace(BASE_URL, '')}
        name='Online Tailor Service Antalya — Erkek & Bayan Kıyafet Dikimi · Ütü Hizmeti'
        description='Online tailor service by Terzi Can in Konyaaltı, Antalya: menswear and womenswear tailoring, ironing, repairs, alterations, custom design and mass production. Open daily 08:00–23:00.'
        lang={['tr','en','ru','de']}
        lastModified={TODAY}
        breadcrumbs={[{ name: 'Terzi Can', path: '/terzi' }, { name: 'Online Tailor Service', path: SITE_URL.replace(BASE_URL, '') }]}
        faq={FAQ}
        areaServed={['Konyaaltı','Muratpaşa','Kepez','Lara','Belek','Kemer','Alanya','Manavgat','Side','Antalya']}
      />
      <SpeakableSchema path="/online-tailor-service" />
      <QuickActionBanner lang="en" />
      <OnlineTailorClient
        gbpName1={GBP1.name}
        gbpAddr1={GBP1.addr}
        gbpEmbed1={GBP1.embed}
        gbpMaps1={GBP1.maps}
        gbpShort1={GBP1.short}
        gbpReview1={GBP1.review}
      />
      <ReviewsBlock lang="en" />
    </>
  );
}
