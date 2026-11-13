import type { Metadata } from 'next';
import { SERVICES, serviceUrl, abs, LANGS } from '@/lib/seo-data';
import ReviewsBlock from '@/components/ReviewsBlock';
import { reviewSchema } from '@/lib/reviews';
import FaqBlock from '@/components/FaqBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import ElbiseDikimiClient from './client';
import { jsonLdString } from '@/lib/json-ld';
import { hzSixForService } from '@/lib/intl-hz';

const BASE_URL = 'https://swaphubs.com';
const SITE_URL = `${BASE_URL}/antalya-terzi-elbise-dikimi`;
const PHONE_E = '+905318986418';
const GBP_URL = 'https://www.google.com/maps?cid=6436895271281342624'; // TERZİ Can - Konyaaltı
const OG_IMG = `${BASE_URL}/images/elbise-dikimi/hero-couple.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Konyaaltı Terzi · Elbise Dikimi, Tadilat · +90 531 898 64 18' },
  description:
    "Terziye sor: +90 531 898 64 18 · Antalya Konyaaltı terzi: elbise dikimi, abiye ve takım tadilatı, tamirat. Paça kısaltma 200 TL'den (KDV hariç), " +
    "normal işler aynı gün. Fotoğrafı WhatsApp'tan gönderin. Her gün 08:00–23:00.",
  keywords: [
    'antalya terzi elbise dikimi', 'elbise dikimi antalya', 'konyaaltı terzi', 'elbise tadilatı antalya', 'elbise boyu kısaltma', 'abiye tadilat terzi antalya', 'takım elbise tadilatı antalya',
    'abiye dikimi antalya', 'özel dikim antalya', 'paça kısaltma antalya',
  ],
  alternates: (() => {
    const sv = SERVICES.find((x) => x.id === 'elbise-dikim')!;
    return {
      canonical: SITE_URL,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [l, abs(serviceUrl(l, sv))])),
        ...hzSixForService(sv.slug.tr),
        'x-default': SITE_URL,
      },
    };
  })(),
  openGraph: {
    title: 'Konyaaltı Terzi · Elbise Dikimi ve Tadilat — Terzi Can',
    description: "Konyaaltı'nda özel ölçü elbise dikimi, tadilat ve tamirat. Paça kısaltma 200 TL'den, fotoğrafla fiyat.",
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
      ...reviewSchema(),
      '@id': `${SITE_URL}#business`,
      name: 'TERZİ Can - Konyaaltı',
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
      knowsLanguage: ['tr', 'en', 'ru', 'de', 'pl', 'uk', 'nl', 'fr', 'es', 'ar'],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <SpeakableSchema path="/antalya-terzi-elbise-dikimi" />
      <QuickActionBanner lang="tr" />
      <ElbiseDikimiClient />
      <ReviewsBlock lang="tr" />
      <FaqBlock
        heading="Konyaaltı Terzi — Sık Sorulan Sorular"
        items={[
          { q: 'Konyaaltı\'nda terzi nerede, adrese gelir mi?', a: 'Terzi Can, Hurma Mahallesi Konyaaltı\'nda. İsterseniz adresinizden veya otelinizden alıp yerinde ölçü alır, işlem sonrası adrese teslim ederiz. Antalya içinde eve ve otele alım-teslim yapıyoruz.' },
          { q: 'Elbise dikimi ve tadilat fiyatları nedir?', a: 'Paça kısaltma ₺200\'den, fermuar değişimi ₺300\'den, bel daraltma ₺200\'den başlar. Elbise dikiminde fiyat fotoğrafa ve istediğiniz modele göre belirlenir; fotoğraf göndermeniz yeterli.' },
          { q: 'Fiyatı gitmeden nasıl öğrenirim?', a: 'Kıyafetin ve yapılacak işlemin fotoğrafını WhatsApp\'tan gönderin: +90 531 898 64 18.' },
          { q: 'Hafta sonu ve akşam açık mısınız?', a: 'Evet, her gün 08:00–23:00 arası açığız.' },
        ]}
      />
    </>
  );
}
