import type { Metadata } from 'next';
import { zoneAlt } from '@/lib/intl-zones';
import { crossCanonical } from '@/lib/cross-canonical';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import { notFound } from 'next/navigation';
import { OTEL_BOLGELERI, bulOtelBolgesi } from '@/lib/otel-bolgeleri';
import OtelBolgeSayfasi from '@/components/terzi/OtelBolgeSayfasi';
import { jsonLdString } from '@/lib/json-ld';
import ReviewsBlock from '@/components/ReviewsBlock';

const HOME_URL = 'https://swaphubs.com';
const PHONE_TEL = '+905318986418';
const MAPS = 'https://www.google.com/maps?cid=6436895271281342624';
const BASE_PATH = '/de/schneider-service-hotel-antalya';

export const dynamicParams = false;

export async function generateStaticParams() {
  return OTEL_BOLGELERI.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  const r = bulOtelBolgesi(region);
  if (!r) return {};

  const url = `${HOME_URL}${BASE_PATH}/${r.slug}`;
  const title = `Änderungsschneiderei ${r.name}: Hotelabholung gratis | Terzi Can`;
  const desc = `Kleidung im Urlaub ändern in ${r.name}: Abholung und Lieferung im Hotel kostenlos, Kürzen ab ₺200 (~10 €), Dauer je nach Arbeit. Foto per WhatsApp auf Deutsch senden.`;
  const ogImage = `${HOME_URL}/og/terzi-can.jpg`;

  return {
    metadataBase: new URL(HOME_URL),
    title: { absolute: title },
    description: desc,
    keywords: [
      `Schneider ${r.name}`, 
      `Änderungsschneiderei ${r.name}`, 
      `Hotel Abholung Schneider ${r.name}`, 
      'Textilreparatur Antalya', 
      'Deutschsprechender Schneider Antalya'
    ],
    // terzihizmeti.com.tr'de birebir aynı bölge sayfası → cross-domain canonical (hreflang kümesi yok)
    alternates: {
      canonical: crossCanonical(`${BASE_PATH}/${r.slug}`) ?? url,
      languages: {
        en: `https://swaphubs.com/en/hotel-tailor-antalya/${r.slug}`,
        ru: `https://swaphubs.com/ru/vyezdnoy-portnoy-antalya/${r.slug}`,
        de: `https://swaphubs.com/de/schneider-service-hotel-antalya/${r.slug}`,
        ...zoneAlt(r.slug),
        'x-default': `https://swaphubs.com/en/hotel-tailor-antalya/${r.slug}`,
      },
    },
    openGraph: { title, description: desc, url, type: 'website', locale: 'de_DE', siteName: 'Terzi Can Antalya', images: [{ url: ogImage, width: 1200, height: 630, alt: `Schneider in ${r.name}` }] },
    twitter: { card: 'summary_large_image', title, description: desc, images: [ogImage] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  };
}

export default async function BelekLaraGuzelobaSideDePage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const r = bulOtelBolgesi(region);
  if (!r) notFound();

  const url = `${HOME_URL}${BASE_PATH}/${r.slug}`;

  const seoContent = {
    h1: `Premium Änderungsschneiderei für Hotelgäste in ${r.name}`,
    h2: `Schnelle und professionelle Textilreparatur – direkt ab Hotel`,
    body1: `Sie genießen Ihren Urlaub in ${r.name}, aber das neu gekaufte Kleid ist zu lang oder der Reißverschluss Ihrer Lieblingsjacke ist kaputt? Terzi Can ist Ihre zuverlässige Schneiderei vor Ort.`,
    body2: `Wir sind Experten für hochwertige Änderungen und Reparaturen von Kleidungsstücken. Da Ihre Urlaubszeit kostbar ist, bieten wir einen Abhol- und Lieferservice für Gäste in den Hotelregionen von ${r.name} an. Sie müssen Ihr Resort nicht verlassen!`
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Hotel-Schneiderservice ${r.name} — Abholung & Lieferung`,
        serviceType: 'Clothing Alterations & Mobile Tailoring',
        provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: PHONE_TEL, url: `${HOME_URL}/terzi`, image: `${HOME_URL}/og/terzi-can.jpg`, priceRange: '$$' },
        areaServed: { '@type': 'Place', name: `${r.name}, Antalya` },
        description: seoContent.body2,
        url,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: HOME_URL },
          { '@type': 'ListItem', position: 2, name: 'Hotel-Schneiderservice in Antalya', item: `${HOME_URL}${BASE_PATH}` },
          { '@type': 'ListItem', position: 3, name: r.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <SpeakableSchema path={`${BASE_PATH}/${r.slug}`} />
      <QuickActionBanner lang="de" variant="hotel-service" />
      <OtelBolgeSayfasi 
        lang="de" 
        region={r} 
        allRegions={OTEL_BOLGELERI} 
        basePath={BASE_PATH} 
        maps={MAPS} 
        seoContent={seoContent} 
      />
      <nav aria-label="Weiterführende Seiten" style={{ maxWidth: 760, margin: '1.5rem auto', padding: '0 1rem', fontSize: '.92rem', lineHeight: 1.7 }}>
        <strong>Mehr zum Hotel-Service:</strong>{' '}
        <a href="/de/so-funktioniert-hotel-schneider-antalya">So funktioniert der Hotel-Schneider</a>
        {' · '}<a href="/de/online-schneiderservice-antalya">Änderungen per Post</a>
        {' · '}<a href="/de/haeufige-fragen-schneider-antalya">Häufige Fragen</a>
        {' · '}<a href="/de/kontakt-schneider-antalya">Kontakt</a>
      </nav>
      <ReviewsBlock lang="de" schema />
    </>
  );
}
