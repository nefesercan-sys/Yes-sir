import type { Metadata } from 'next';
import ReviewsBlock from '@/components/ReviewsBlock';
import FaqBlock from '@/components/FaqBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import ElbiseDikimiClient from './client';

const BASE_URL = 'https://swaphubs.com';
const SITE_URL = `${BASE_URL}/antalya-terzi-elbise-dikimi`;
const PHONE_E = '+905318986418';
const GBP_URL = 'https://www.google.com/maps?cid=5846987472659818117'; // TERZİ Can Antalya Tailor Service
const OG_IMG = `${BASE_URL}/images/elbise-dikimi/hero-couple.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Antalya Terzi · Elbise Dikimi, Tadilat ve Tamirat — Konyaaltı Atölyesi | Terzi Can' },
  description:
    "Antalya Konyaaltı'nda özel ölçü elbise dikimi, tadilat, tamirat ve ütü. Randevulu çalışma, şeffaf fiyat: " +
    "günlük elbise 800 TL'den, paça kısaltma 150 TL'den. WhatsApp: +90 531 898 64 18",
  keywords: [
    'antalya terzi elbise dikimi', 'elbise dikimi antalya', 'konyaaltı terzi', 'elbise tadilatı antalya',
    'abiye dikimi antalya', 'özel dikim antalya', 'paça kısaltma antalya',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Antalya Terzi · Elbise Dikimi ve Tadilat — Terzi Can',
    description: "Konyaaltı'nda özel ölçü elbise dikimi, tadilat, tamirat ve ütü hizmeti.",
    url: SITE_URL,
    siteName: 'Terzi Can Antalya',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: 'Antalya terzi elbise dikimi' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': `${SITE_URL}#business`,
      name: 'TERZİ Can Antalya Tailor Service',
      alternateName: ['Terzi Can', 'Terzi Can Konyaaltı'],
      url: SITE_URL,
      telephone: PHONE_E,
      priceRange: '₺₺',
      image: OG_IMG,
      hasMap: GBP_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        addressCountry: 'TR',
      },
      areaServed: { '@type': 'AdministrativeArea', name: 'Konyaaltı, Antalya' },
      knowsLanguage: ['tr', 'en', 'ru', 'de'],
      sameAs: [GBP_URL, `https://wa.me/${PHONE_E.replace('+', '')}`, `${BASE_URL}/terzi`],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: 'Antalya Terzi · Elbise Dikimi, Tadilat ve Tamirat',
      inLanguage: 'tr',
      about: { '@id': `${SITE_URL}#business` },
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Terzi Can', item: `${BASE_URL}/terzi` },
        { '@type': 'ListItem', position: 3, name: 'Elbise Dikimi', item: SITE_URL },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SpeakableSchema path="/antalya-terzi-elbise-dikimi" />
      <QuickActionBanner lang="tr" />
      <ElbiseDikimiClient />
      <ReviewsBlock lang="tr" />
      <FaqBlock
        heading="Konyaaltı Terzi — Sık Sorulan Sorular"
        items={[
          { q: 'Konyaaltı\'nda terzi nerede, adrese gelir mi?', a: 'Terzi Can, Hurma Mahallesi Konyaaltı\'nda. İsterseniz adresinizden veya otelinizden alıp yerinde ölçü alır, işlem sonrası adrese teslim ederiz. Servis ücretsizdir.' },
          { q: 'Elbise dikimi ve tadilat fiyatları nedir?', a: 'Paça kısaltma ₺150\'den, fermuar değişimi ₺200\'den, bel daraltma ₺150\'den, elbise dikimi ₺800\'den başlar. Kesin fiyat için fotoğraf göndermeniz yeterli.' },
          { q: 'Fiyatı gitmeden nasıl öğrenirim?', a: 'Kıyafetin ve yapılacak işlemin fotoğrafını WhatsApp\'tan gönderin: +90 531 898 64 18.' },
          { q: 'Hafta sonu ve akşam açık mısınız?', a: 'Evet, her gün 08:00–23:00 arası açığız.' },
        ]}
      />
    </>
  );
}
