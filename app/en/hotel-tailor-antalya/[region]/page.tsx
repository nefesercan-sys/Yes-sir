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
  const url = `${HOME_URL}/en/hotel-tailor-antalya/${r.slug}`;
  const title = `${r.name} Hotel Tailor — Mobile Tailor Service | Terzi Can`;
  const desc = `Mobile tailor service to your hotel in ${r.name}. Tailoring, alterations, repair, ironing and dry cleaning delivered to your room. ${r.travelTime.en}. English speaking.`;
  return {
    title, description: desc,
    keywords: [`${r.name} hotel tailor`, `${r.name} tailor Antalya`, 'mobile tailor Antalya', 'English speaking tailor Antalya', `${r.name} alterations`, `${r.name} dry cleaning`],
    alternates: {
      canonical: url,
      languages: {
        'en': url,
        'ru': `${HOME_URL}/ru/vyezdnoy-portnoy-antalya/${r.slug}`,
        'de': `${HOME_URL}/de/schneider-service-hotel-antalya/${r.slug}`,
        'x-default': url,
      },
    },
    openGraph: { title, description: desc, url, type: 'website', locale: 'en_US' },
  };
}

export default function BelekLaraGuzelobaSideEnPage({ params }: { params: { region: string } }) {
  const r = bulOtelBolgesi(params.region);
  if (!r) notFound();

  const url = `${HOME_URL}/en/hotel-tailor-antalya/${r.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Hotel Tailor ${r.name} — Mobile Tailor Service`,
    provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: PHONE_TEL, url: `${HOME_URL}/terzi` },
    areaServed: { '@type': 'Place', name: r.name },
    url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OtelBolgeSayfasi lang="en" region={r} allRegions={OTEL_BOLGELERI} />
    </>
  );
}
