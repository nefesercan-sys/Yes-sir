import ReviewsBlock from '@/components/ReviewsBlock';
import { GOOGLE_REVIEWS } from '@/lib/reviews';
import type { Metadata } from 'next';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import BusinessSchema from '@/components/BusinessSchema';
import OnlineSchneiderClient from './OnlineSchneiderClient';

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
  title: { absolute: 'Schneider Antalya: Foto senden, Preis erhalten | Terzi Can' },
  description:
    'Online-Schneiderservice in Konyaaltı: Herren- & Damenschneiderei, Bügeln, Reparaturen, Änderungen. ' +
    'Versand in die ganze Türkei. ☎ ' + PHONE,
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

const FAQ = [
  { q: 'Was kostet ein Herrenanzug in Antalya?', a: `Der Preis hängt von Stoff und Modell ab. Senden Sie Ihre Maße per WhatsApp: ${PHONE}` },
  { q: 'Wie funktioniert der Online-Schneiderservice?', a: `Senden Sie ein Referenzfoto und Maße per WhatsApp — wir nähen und versenden es. ${PHONE}` },
  { q: 'Kommen Sie für den Bügelservice zu meinem Hotel?', a: `Ja! Abholung und Lieferung zu Hotels in Antalya sind in allen bedienten Hotelgebieten kostenlos. Die Zeit klären wir per WhatsApp. ${PHONE}` },
  { q: 'Antworten Sie in meiner Sprache?', a: `Ja. Schreiben Sie uns auf WhatsApp in jeder Sprache, wir antworten in dieser Sprache: ${PHONE}` },
  { q: 'Kann ich aus dem Ausland bestellen?', a: 'Ja. Wir nehmen Ihre Maße online auf, nähen das Kleidungsstück in Antalya und senden es in Ihr Land, meist innerhalb von 1–3 Wochen. Die Zahlung erfolgt per Überweisung. Passt es nicht, tauschen wir es um oder ändern es. Den Stoff können wir besorgen oder Sie stellen ihn selbst.' },
  { q: 'Mein Kleid ist gerissen — geht die Reparatur dringend?', a: `Ja, dringende Reparaturen sind in 1–2 Stunden fertig, normale am nächsten Tag. Senden Sie ein Foto per WhatsApp für eine sofortige Einschätzung. ${PHONE}` },
  { q: 'Haben Sie abends oder am Wochenende geöffnet?', a: `Ja, wir haben täglich von 08:00 bis 23:00 Uhr geöffnet, auch abends und am Wochenende. Schreiben Sie uns auf WhatsApp für einen Termin. ${PHONE}` },
  { q: 'Kann ich mir ein individuelles Kleid anfertigen lassen?', a: `Ja, wir fertigen Kleidungsstücke nach Ihren Maßen und Ihrem gewünschten Stil — vom Alltagskleid bis zum Abendkleid. Senden Sie ein Referenzfoto per WhatsApp. ${PHONE}` },
  { q: 'Nähen Sie mit Naturstoffen wie Baumwolle oder Leinen?', a: `Ja, wir bieten maßgeschneiderte Kleidung aus 100% Baumwolle und Leinen an. ${PHONE}` },
  { q: "Wo kann ich in Antalya in meiner Nähe eine Hose kürzen lassen?", a: `Bei Terzi Can in Hurma, Konyaaltı, täglich von 08:00 bis 23:00 geöffnet. Hosen und Jeans kürzen ab ₺200, am nächsten Tag fertig oder eilig in 1–2 Stunden. WhatsApp: ${PHONE}` },
  { q: "Was kostet Kürzen und Reißverschluss wechseln in Antalya?", a: `Kürzen ab ₺200, Taille enger machen ab ₺200, Reißverschluss wechseln ab ₺300, Brautkleid ändern ab ₺800 (Preise 2026). Den genauen Preis nennen wir nach einem Foto per WhatsApp.` },
  { q: "Ändern Sie auch Jacken, Mäntel, Hemden, Röcke und Shorts?", a: `Ja. Wir ändern und reparieren Jacken, Mäntel, Hemden, Röcke, Shorts, Kleider und Hosen für Damen und Herren. Senden Sie ein Foto per WhatsApp, wir nennen Preis und Dauer.` },
  { q: "Ich bin nur wenige Tage im Hotel. Reicht die Zeit?", a: `Ja. Kürzen und Reparaturen sind am nächsten Tag fertig, eilige in 1–2 Stunden. Abholung im Hotel und Rücklieferung sind in allen bedienten Hotelgebieten kostenlos.` },
];

export default function OnlineSchneiderservicePage() {
  return (
    <>
      <BusinessSchema
        reviews={GOOGLE_REVIEWS}
        path={SITE_URL.replace(BASE_URL, '')}
        name='Online Schneiderservice Antalya — Herren- & Damenschneiderei · Bügelservice'
        description='Online-Schneiderservice von Terzi Can in Konyaaltı, Antalya: Herren- und Damenschneiderei, Bügelservice, Reparaturen, Änderungen und Serienproduktion. Täglich 08:00–23:00 geöffnet.'
        lang={'de'}
        lastModified={TODAY}
        breadcrumbs={[{ name: 'Terzi Can', path: '/terzi' }, { name: 'Online Schneiderservice', path: SITE_URL.replace(BASE_URL, '') }]}
        faq={FAQ}
        areaServed={['Konyaaltı','Muratpaşa','Kepez','Lara','Belek','Kemer','Side','Antalya']}
      />
      <SpeakableSchema path="/de/online-schneiderservice-antalya" />
      <QuickActionBanner lang="de" />
      <OnlineSchneiderClient
        gbpName1={GBP1.name}
        gbpAddr1={GBP1.addr}
        gbpEmbed1={GBP1.embed}
        gbpMaps1={GBP1.maps}
        gbpShort1={GBP1.short}
        gbpReview1={GBP1.review}
      />
      <ReviewsBlock lang="de" />
    </>
  );
}
