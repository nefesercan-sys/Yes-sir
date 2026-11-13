import ReviewsBlock from '@/components/ReviewsBlock';
import KargoSection from '@/components/terzi/KargoSection';
import OnlineContactStrip from '@/components/terzi/OnlineContactStrip';
import { onlineLanguages } from '@/lib/intl-online';
import { GOOGLE_REVIEWS } from '@/lib/reviews';
import type { Metadata } from 'next';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import BusinessSchema from '@/components/BusinessSchema';
import OnlineSchneiderClient from './OnlineSchneiderClient';
import { FAQS } from './faq-data';

const BASE_URL  = 'https://swaphubs.com';
const SITE_URL  = `${BASE_URL}/de/online-schneiderservice-antalya`;
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
  title: { absolute: 'Schneider per Post: Kleidung nach Antalya schicken | Terzi Can' },
  description:
    'Schneider fragen: ' + PHONE + ' · Kleidung per Post nach Antalya schicken: Reparatur und Änderung, Rücksendung per Versand. ' +
    'Versandkosten trägt der Kunde. Details per WhatsApp.',
  keywords: [
    'Online Schneider Antalya', 'Herrenschneiderei Antalya', 'Damenschneiderei Antalya',
    'Änderungsschneiderei Antalya', 'Serienproduktion Antalya',
    'Konyaaltı Schneider', 'Online Schneiderservice', 'Schneider Antalya',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: onlineLanguages(BASE_URL),
  },
  openGraph: {
    title: 'Online Schneiderservice Antalya — Herren- & Damenschneiderei',
    description: 'Herren- & Damenschneiderei, Reparaturen, Änderungen, Serienproduktion. Schneider zu Ihnen ins Hotel oder nach Hause in Antalya; Versand innerhalb Antalyas und aus dem Ausland.',
    url: SITE_URL, siteName: 'Terzi Can Antalya', locale: 'de_DE', alternateLocale: ['tr_TR', 'en_US', 'ru_RU'], type: 'website',
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: 'Online Schneiderservice Antalya', type: 'image/jpeg' }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'geo.region': 'TR-07', 'geo.placename': 'Hurma, Konyaaltı, Antalya',
    'geo.position': '36.8572868;30.5970193', ICBM: '36.8572868, 30.5970193',
  },
};

export default function OnlineSchneiderservicePage() {
  return (
    <>
      <BusinessSchema
        reviews={GOOGLE_REVIEWS}
        path={SITE_URL.replace(BASE_URL, '')}
        name='Online Schneiderservice Antalya — Herren- & Damenschneiderei'
        description='Online-Schneiderservice von Terzi Can in Konyaaltı, Antalya: Herren- und Damenschneiderei, Reparaturen, Änderungen und Serienproduktion. Täglich 08:00–23:00 geöffnet.'
        lang={'de'}
        lastModified={TODAY}
        breadcrumbs={[{ name: 'Terzi Can', path: '/terzi' }, { name: 'Online Schneiderservice', path: SITE_URL.replace(BASE_URL, '') }]}
        faq={FAQS.map(([q, a]) => ({ q, a }))}
        areaServed={['Konyaaltı','Muratpaşa','Kepez','Lara','Belek','Kemer','Side','Antalya']}
      />
      <SpeakableSchema path="/de/online-schneiderservice-antalya" />
      <QuickActionBanner lang="de" />
      <OnlineContactStrip lang="de" />
      <OnlineSchneiderClient
        gbpName1={GBP1.name}
        gbpAddr1={GBP1.addr}
        gbpEmbed1={GBP1.embed}
        gbpMaps1={GBP1.maps}
        gbpShort1={GBP1.short}
        gbpReview1={GBP1.review}
      />
      <KargoSection lang="de" />
      <ReviewsBlock lang="de" />
    </>
  );
}
