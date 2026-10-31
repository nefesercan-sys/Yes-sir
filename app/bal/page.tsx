import type { Metadata } from 'next';
import { getDb } from '@/lib/mongodb';
import { balMetinUygula, BAL_WA_VARSAYILAN, SSS } from '@/lib/bal-icerik';
import BalVitriniClient from './BalVitriniClient';
import { jsonLdString } from '@/lib/json-ld';

export const revalidate = 300;

const SITE_URL = 'https://swaphubs.com/bal';

export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),
  title: 'Arım Balım Çiçeğim | Sivas Yayla Balı, Polen, Propolis',
  description:
    "Sivas dağ yaylalarından yayla balı, taze çiçek poleni ve ham propolis. Katkısız ürünler, 81 ile kargo, WhatsApp ile kolay sipariş.",
  keywords: [
    'sivas yayla balı',
    'doğal bal',
    'çiçek poleni',
    'propolis',
    'dağ balı',
    'kekik balı',
    'meşe balı',
    'ham propolis',
    'taze polen',
    'köy balı',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Arım Balım Çiçeğim | Sivas Yayla Balı',
    description: 'Sivas dağ yaylalarından bal, polen ve propolis.',
    url: SITE_URL,
    siteName: 'SwapHubs',
    images: [{ url: '/swaphubs-og.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Arım Balım Çiçeğim',
    description: 'Sivas dağ yaylalarından bal, polen ve propolis',
    url: SITE_URL,
    telephone: `+${BAL_WA_VARSAYILAN}`,
    areaServed: 'TR',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SSS.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  },
];

async function getUrunler() {
  try {
    const db = await getDb();
    const urunler = await db
      .collection('bal_urunler')
      .find({ aktif: true })
      .sort({ createdAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(urunler)).map(balMetinUygula);
  } catch {
    return [];
  }
}

export default async function BalPage() {
  const urunler = await getUrunler();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <BalVitriniClient urunler={urunler} sss={SSS} />
    </>
  );
}
