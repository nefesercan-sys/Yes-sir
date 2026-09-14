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
  const url = `${HOME_URL}/ru/vyezdnoy-portnoy-antalya/${r.slug}`;
  const title = `Портной в отеле ${r.name} — Выездной портной | Terzi Can`;
  const desc = `Выездной портной в ваш отель в районе ${r.name}. Пошив, подгонка, ремонт, глажка и химчистка с доставкой в номер. ${r.travelTime.ru}. Говорим по-русски.`;
  return {
    title, description: desc,
    keywords: [`портной ${r.name}`, `отель ${r.name} портной`, 'выездной портной Анталья', 'русскоговорящий портной Анталья', `${r.name} химчистка`],
    alternates: {
      canonical: url,
      languages: {
        'en': `${HOME_URL}/en/hotel-tailor-antalya/${r.slug}`,
        'ru': url,
        'de': `${HOME_URL}/de/schneider-service-hotel-antalya/${r.slug}`,
        'x-default': url,
      },
    },
    openGraph: { title, description: desc, url, type: 'website', locale: 'ru_RU' },
  };
}

export default function BelekLaraGuzelobaSideRuPage({ params }: { params: { region: string } }) {
  const r = bulOtelBolgesi(params.region);
  if (!r) notFound();

  const url = `${HOME_URL}/ru/vyezdnoy-portnoy-antalya/${r.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Портной в отеле ${r.name} — выездной портной`,
    provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: PHONE_TEL, url: `${HOME_URL}/terzi` },
    areaServed: { '@type': 'Place', name: r.name },
    url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OtelBolgeSayfasi lang="ru" region={r} allRegions={OTEL_BOLGELERI} />
    </>
  );
}
