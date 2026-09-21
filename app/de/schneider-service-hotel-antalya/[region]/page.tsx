import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OTEL_BOLGELERI, bulOtelBolgesi } from '@/lib/otel-bolgeleri';
import OtelBolgeSayfasi from '@/components/terzi/OtelBolgeSayfasi';

const HOME_URL = 'https://swaphubs.com';
const PHONE_TEL = '+905318986418';
const MAPS = 'https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8';
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
  const title = `VIP Änderungsschneiderei ${r.name} | Hotel-Service & Abholung`;
  const desc = `Schnelle Kleiderreparatur im Urlaub? Terzi Can bietet professionelle Änderungsschneiderei mit VIP-Abholung in den Hotels von ${r.name}. Kontaktieren Sie uns über WhatsApp!`;
  const ogImage = `${HOME_URL}/terzi-can-hero.jpg`;

  return {
    metadataBase: new URL(HOME_URL),
    title,
    description: desc,
    keywords: [
      `VIP Schneider ${r.name}`, 
      `Änderungsschneiderei ${r.name}`, 
      `Hotel Abholung Schneider ${r.name}`, 
      'Textilreparatur Antalya', 
      'Deutschsprechender Schneider Antalya'
    ],
    alternates: {
      canonical: url,
      languages: {
        'tr': `${HOME_URL}/terzi/otele-gelen-terzi-antalya/${r.slug}`,
        'en': `${HOME_URL}/en/hotel-tailor-antalya/${r.slug}`,
        'ru': `${HOME_URL}/ru/vyezdnoy-portnoy-antalya/${r.slug}`,
        'de': url,
        'x-default': `${HOME_URL}/en/hotel-tailor-antalya/${r.slug}`,
      },
    },
    openGraph: { title, description: desc, url, type: 'website', locale: 'de_DE', siteName: 'Terzi Can - SwapHubs', images: [{ url: ogImage, width: 1200, height: 630, alt: `VIP Schneider in ${r.name}` }] },
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
    body2: `Wir sind Experten für hochwertige Änderungen und Reparaturen von Kleidungsstücken. Da Ihre Urlaubszeit kostbar ist, bieten wir einen exklusiven VIP-Abhol- und Lieferservice für Gäste in den Hotelregionen von ${r.name} an. Sie müssen Ihr Resort nicht verlassen!`
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `VIP Hotel Schneider Service ${r.name} — Abholung & Lieferung`,
        serviceType: 'Clothing Alterations & Mobile Tailoring',
        provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: PHONE_TEL, url: `${HOME_URL}/terzi`, image: `${HOME_URL}/terzi-can-hero.jpg`, priceRange: '$$' },
        areaServed: { '@type': 'Place', name: `${r.name}, Antalya` },
        description: seoContent.body2,
        url,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Bieten Sie eine VIP-Abholung in ${r.name} an?`,
            acceptedAnswer: { '@type': 'Answer', text: `Ja! Senden Sie uns ein Foto per WhatsApp. Wir holen das Kleidungsstück direkt an der Rezeption Ihres Hotels in ${r.name} ab und bringen es fertig zurück.` },
          },
          {
            '@type': 'Question',
            name: `Wie schnell ist die Bearbeitung?`,
            acceptedAnswer: { '@type': 'Answer', text: `Unsere erfahrenen Schneider erledigen die Arbeit und liefern es in der Regel innerhalb von 24 bis 48 Stunden an Ihr Hotel in ${r.name} zurück.` },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OtelBolgeSayfasi 
        lang="de" 
        region={r} 
        allRegions={OTEL_BOLGELERI} 
        basePath={BASE_PATH} 
        maps={MAPS} 
        seoContent={seoContent} 
      />
    </>
  );
}
