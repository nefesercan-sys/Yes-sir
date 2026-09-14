import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OTEL_BOLGELERI, bulOtelBolgesi } from '@/lib/otel-bolgeleri';
import OtelBolgeSayfasi from '@/components/terzi/OtelBolgeSayfasi';

const HOME_URL = 'https://swaphubs.com';
const PHONE_TEL = '+905318986418';

export async function generateStaticParams() {
  return OTEL_BOLGELERI.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: { params: { region: string } }): Promise<Metadata> {
  const r = bulOtelBolgesi(params.region);
  if (!r) return {};
  const url = `${HOME_URL}/de/schneider-service-hotel-antalya/${r.slug}`;
  const title = `Schneider im Hotel ${r.name} — Mobiler Schneiderservice | Terzi Can`;
  const desc = `Mobiler Schneiderservice zu Ihrem Hotel in ${r.name}. Schneiderei, Änderungen, Reparatur, Bügeln und chemische Reinigung, geliefert auf Ihr Zimmer. ${r.travelTime.de}. Wir sprechen Deutsch.`;
  return {
    title, description: desc,
    keywords: [`Schneider ${r.name}`, `Hotel ${r.name} Schneider`, 'mobiler Schneider Antalya', 'deutschsprachiger Schneider Antalya', `${r.name} Reinigung`],
    alternates: {
      canonical: url,
      languages: {
        'en': `${HOME_URL}/en/hotel-tailor-antalya/${r.slug}`,
        'ru': `${HOME_URL}/ru/vyezdnoy-portnoy-antalya/${r.slug}`,
        'de': url,
        'x-default': url,
      },
    },
    openGraph: { title, description: desc, url, type: 'website', locale: 'de_DE' },
  };
}

export default function BelekLaraGuzelobaSideDePage({ params }: { params: { region: string } }) {
  const r = bulOtelBolgesi(params.region);
  if (!r) notFound();

  const url = `${HOME_URL}/de/schneider-service-hotel-antalya/${r.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Schneider im Hotel ${r.name} — mobiler Schneiderservice`,
    provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: PHONE_TEL, url: `${HOME_URL}/terzi` },
    areaServed: { '@type': 'Place', name: r.name },
    url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OtelBolgeSayfasi lang="de" region={r} allRegions={OTEL_BOLGELERI} />
    </>
  );
}
