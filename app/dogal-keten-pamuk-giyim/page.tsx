import type { Metadata } from 'next';
import DoğalGiyimClient from './DogalGiyimClient';

const SITE_URL = 'https://swaphubs.com/dogal-keten-pamuk-giyim';

export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),
  title: '%100 Keten Pamuk · Özel Dikim, Kalıp, Seri | SwapHubs',
  description: 'Bay, bayan, çocuk keten ve pamuk giyim: özel dikim, model ve kalıp çıkarma, seri ve fason üretim. Avrupa ve Rusya\'ya gönderim. Üretim: Terzi Can.',
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
    'Keten Model ve Kalıp Çıkarma',
    'Keten Giyim Fason Üretim',
    'Pamuk Giyim Fason Dikim',
    'Keten Giyim Avrupa ve Rusya Gönderim',
    'Bay Bayan Keten Elbise',
    'Keten Pantolon Özel Dikim',
    'Keten Ceket Özel Dikim',
    'Keten Şort Dikimi',
    'Keten Etek Dikimi',
    'Pamuk Gömlek Özel Dikim',
    'Kişiye Özel Keten Elbise',
    'Doğal Kumaş Özel Dikim',
    'Tek Adet ve Seri Adet Dikim',
    'Keten Giyim Kargo',
    'Keten Giyim Yurt Dışı Gönderim',
    'Keten Giyim Yurt İçi Gönderim',
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
