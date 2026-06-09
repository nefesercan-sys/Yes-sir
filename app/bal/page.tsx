import type { Metadata } from 'next';
import BalVitriniClient from './BalVitriniClient';
import { getDb } from '@/lib/mongodb';

const SITE_URL = 'https://www.swaphubs.com/bal';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Arım Balım Çiçeğim | Sivas Doğal Yayla Balı, Polen & Propolis',
  description: "Sivas'ın el değmemiş dağ yaylalarından doğal yayla balı, taze çiçek poleni ve ham propolis. Endemik bitkilerden süzülen katkısız bal. 81 ile kargo.",
  keywords: ['sivas yayla balı', 'doğal bal', 'çiçek poleni', 'propolis', 'dağ balı', 'organik bal', 'kekik balı', 'meşe balı', 'ham propolis', 'taze polen', 'köy balı'],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Arım Balım Çiçeğim | Sivas Doğal Yayla Balı',
    description: "Bir damla balda binlerce çiçeğin özüne ulaşırsınız.",
    url: SITE_URL,
    siteName: 'SwapHubs',
    images: [{ url: '/og/arim-balim.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Arım Balım Çiçeğim',
  description: "Sivas dağ yaylalarından doğal bal, polen ve propolis",
  url: SITE_URL,
  areaServed: 'TR',
};

async function getUrunler() {
  try {
    const db = await getDb();
    const urunler = await db
      .collection('bal_urunler')
      .find({ aktif: true })
      .sort({ createdAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(urunler));
  } catch {
    return [];
  }
}

export default async function BalPage() {
  const urunler = await getUrunler();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BalVitriniClient urunler={urunler} />
    </>
  );
}
