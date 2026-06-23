import type { Metadata } from 'next';
import DoğalGiyimClient from './DogalGiyimClient';

const SITE_URL = 'https://swaphubs.com/dogal-keten-pamuk-giyim';

export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),
  title: '%100 Keten & Pamuk Doğal Giyim | Kadın Erkek Çocuk Bebek | SwapHubs',
  description: '%100 doğal keten ve pamuk kumaştan üretilmiş kadın, erkek, çocuk ve bebek giyim koleksiyonu. Nefes alan, çevre dostu, organik tekstil. Türkiye\'den üretim, kapıda ödeme. SwapHubs.',
  keywords: [
    '%100 Keten Giyim',
    '%100 Pamuk Giyim',
    'Doğal Kumaş Giyim',
    'Organik Keten Elbise',
    'Keten Kadın Giyim',
    'Keten Erkek Giyim',
    'Keten Çocuk Giyim',
    'Keten Bebek Giyim',
    'Pamuk Kadın Elbise',
    'Pamuk Erkek Gömlek',
    'Doğal Tekstil Türkiye',
    'Nefes Alan Kumaş',
    'Çevre Dostu Giyim',
    'Organik Bebek Kıyafeti',
    'Keten Pantolon',
    'Keten Gömlek',
    'Pamuk Yazlık Giyim',
    'Sürdürülebilir Moda',
    'Doğal Lif Giyim',
    'Keten Pijama',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: '%100 Keten & Pamuk Doğal Giyim Koleksiyonu | SwapHubs',
    description: 'Kadın, erkek, çocuk ve bebek için %100 doğal keten ve pamuk giyim. Nefes alan kumaş, çevre dostu üretim, kapıda ödeme.',
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/og/dogal-giyim.jpg', width: 1200, height: 630, alt: 'SwapHubs Doğal Keten Pamuk Giyim' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '%100 Keten & Pamuk Giyim | SwapHubs',
    description: 'Doğal keten ve pamuktan üretilmiş kadın, erkek, çocuk, bebek giyim koleksiyonu.',
    images: ['/og/dogal-giyim.jpg'],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '%100 Keten & Pamuk Doğal Giyim Koleksiyonu',
  description: 'Kadın, erkek, çocuk ve bebek için %100 doğal keten ve pamuk giyim.',
  url: SITE_URL,
  provider: {
    '@type': 'Organization',
    name: 'SwapHubs',
    url: 'https://www.swaphubs.com',
  },
};

export default function DogalGiyimPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DoğalGiyimClient />
    </>
  );
}
