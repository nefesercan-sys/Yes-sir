import { GOOGLE_REVIEWS } from '@/lib/reviews';
import type { Metadata } from 'next';
import ReviewsBlock from '@/components/ReviewsBlock';
import KargoSection from '@/components/terzi/KargoSection';
import OnlineContactStrip from '@/components/terzi/OnlineContactStrip';
import { onlineLanguages } from '@/lib/intl-online';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import BusinessSchema from '@/components/BusinessSchema';
import OnlineTailorClient from './OnlineTailorClient';
import { FAQS } from './faq-data';

const BASE_URL  = 'https://swaphubs.com';
const SITE_URL  = `${BASE_URL}/online-tailor-service`;
const PHONE     = '+90 531 898 64 18';
const PHONE_E   = '+905318986418';
const TODAY = '2026-10-29';
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
    '☎ ' + PHONE + ' · Online tailor service in Konyaaltı: menswear & womenswear tailoring, repairs, alterations, ' +
    'bulk production. Tailor to your hotel or home in Antalya.',
  keywords: [
    'online tailor Antalya', 'menswear tailoring Antalya', 'womenswear tailoring Antalya',
    'repairs alterations Antalya', 'mass production Antalya',
    'Konyaaltı tailor', 'online tailor service', 'tailor Antalya',
    'recommend a tailor Antalya', 'find a tailor near me',
    'my dress is torn', 'tailor open in the evening', 'tailor open on weekends',
    'custom dress made Antalya', 'natural cotton linen sewing', 'quality clothing manufacturer',
  ],
  alternates: {
    canonical: SITE_URL,
    // DÜZELTME (2026-09-26): Bu sayfa İNGİLİZCE içerik olduğu halde 'tr' olarak
    // kendine referans veriyordu ve 'en' hiç tanımlanmamıştı — düzeltildi.
    languages: onlineLanguages(BASE_URL),
  },
  openGraph: {
    title: 'Online Tailor Service Antalya — Menswear & Womenswear Tailoring',
    description: 'Menswear & womenswear tailoring, repairs, alterations, mass production. Tailor to your hotel or home in Antalya; shipping within Antalya and from abroad.',
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

export default function OnlineTailorServicePage() {
  return (
    <>
      <BusinessSchema
        reviews={GOOGLE_REVIEWS}
        path={SITE_URL.replace(BASE_URL, '')}
        name='Online Tailor Service Antalya — Erkek & Bayan Kıyafet Dikimi'
        description='Online tailor service by Terzi Can in Konyaaltı, Antalya: menswear and womenswear tailoring, repairs, alterations, custom design and mass production. Open daily 08:00–23:00.'
        lang={['tr','en','ru','de']}
        lastModified={TODAY}
        breadcrumbs={[{ name: 'Terzi Can', path: '/terzi' }, { name: 'Online Tailor Service', path: SITE_URL.replace(BASE_URL, '') }]}
        faq={FAQS.map(([q, a]) => ({ q, a }))}
        areaServed={['Konyaaltı','Muratpaşa','Kepez','Lara','Belek','Kemer','Side','Antalya']}
      />
      <SpeakableSchema path="/online-tailor-service" />
      <QuickActionBanner lang="en" />
      <OnlineContactStrip lang="en" />
      <OnlineTailorClient
        gbpName1={GBP1.name}
        gbpAddr1={GBP1.addr}
        gbpEmbed1={GBP1.embed}
        gbpMaps1={GBP1.maps}
        gbpShort1={GBP1.short}
        gbpReview1={GBP1.review}
      />
      <KargoSection lang="en" />
      <ReviewsBlock lang="en" />
    </>
  );
}
