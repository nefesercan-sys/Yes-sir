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
const TODAY = '2026-10-04';
const OG_IMG    = `${BASE_URL}/og/terzi-can.jpg`;

// Konyaaltı Hurma ve Liman Şube / Lokasyon Bilgileri
// Google İşletme Profili: TEK profil (Hurma, 07130)
const GBP1 = {
  name:  'TERZİ Can Antalya Tailor Service',
  addr:  'Hurma Mahallesi, 07130 Konyaaltı / Antalya',
  maps:  'https://www.google.com/maps?cid=5846987472659818117',
  short: 'https://www.google.com/maps/dir/?api=1&destination=TERZ%C4%B0+Can+Antalya+Tailor+Service+Hurma+Konyaalt%C4%B1+Antalya',
  embed: 'https://www.google.com/maps?q=TERZ%C4%B0+Can+Antalya+Tailor+Service%2C+Hurma%2C+07130+Konyaalt%C4%B1%2FAntalya&ftid=0x14c393757afe22b7:0x5124ac20b20c2685&z=17&output=embed',
  review:'https://g.page/r/CYUmDLIgrCRREAE/review'
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Antalya Tailor: Send a Photo, Get a Quick Quote · Hotel Pickup | Terzi Can' },
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
    'geo.position': '36.857466;30.596987', ICBM: '36.857466, 30.596987',
  },
  verification: {
    yandex: '4c73ee1911a4b197',
    other: { 'msvalidate.01': 'EE22134B7D1B55A44BA700154371D5C3' },
  },
};

const FAQ = [
  { q: "How much does a men's suit cost in Antalya?", a: `Starts from ₺2,500. Send your measurements via WhatsApp: ${PHONE}` },
  { q: 'How does the online tailor service work?', a: `Send a reference photo and measurements via WhatsApp — we sew it and ship it. ${PHONE}` },
  { q: 'Do you come to my hotel for ironing?', a: `Yes! Courier pickup and delivery to every hotel in Antalya, same day. ${PHONE}` },
  { q: 'Is there an English-speaking tailor in Antalya?', a: `Yes! We speak English, Russian and German. WhatsApp: ${PHONE}` },
  { q: 'My dress is torn — can you repair it the same day?', a: `Yes, most tears and split seams are fixed the same day. Send a photo via WhatsApp for an instant estimate. ${PHONE}` },
  { q: 'Are you open in the evening or on weekends?', a: `Yes, we're open every day of the week, 08:00–23:00, including evenings and weekends. Message us on WhatsApp to book a time. ${PHONE}` },
  { q: 'Can I have a custom dress made for myself?', a: `Yes, we make custom garments to your measurements and chosen style — from everyday dresses to evening gowns. Send a reference photo via WhatsApp. ${PHONE}` },
  { q: 'Do you sew with natural fabrics like cotton or linen?', a: `Yes, we offer custom tailoring in 100% cotton and linen fabric. ${PHONE}` },
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
