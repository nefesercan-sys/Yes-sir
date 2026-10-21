import type { Metadata } from 'next';
import DoğalGiyimClient from './DogalGiyimClient';

const SITE_URL = 'https://swaphubs.com/dogal-keten-pamuk-giyim';

export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),
  title: '%100 Keten Pamuk · Özel Dikim, Seri Üretim | SwapHubs',
  description: '%100 doğal keten ve pamuk kumaştan kadın, erkek, çocuk, bebek giyim; özel dikim ve seri üretim. Nefes alan, çevre dostu. Türkiye\'den, kapıda ödeme.',
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
    'Keten Özel Dikim',
    'Pamuk Özel Dikim',
    'Keten Seri Üretim',
    'Pamuk Seri Üretim',
    'Keten Giyim İmalatı',
    'Genel Giyim Özel Dikim',
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
    images: [{ url: '/swaphubs-og.jpg', width: 1200, height: 630, alt: 'SwapHubs Doğal Keten Pamuk Giyim' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '%100 Keten & Pamuk Giyim | SwapHubs',
    description: 'Doğal keten ve pamuktan üretilmiş kadın, erkek, çocuk, bebek giyim koleksiyonu.',
    images: ['/swaphubs-og.jpg'],
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
