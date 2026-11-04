import type { Metadata } from 'next';
import { zoneAlt } from '@/lib/intl-zones';
import { crossCanonical } from '@/lib/cross-canonical';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import { notFound } from 'next/navigation';
import { OTEL_BOLGELERI, bulOtelBolgesi } from '@/lib/otel-bolgeleri';
import OtelBolgeSayfasi from '@/components/terzi/OtelBolgeSayfasi';
import { jsonLdString } from '@/lib/json-ld';
import ReviewsBlock from '@/components/ReviewsBlock';

const HOME_URL = 'https://swaphubs.com';
const PHONE_TEL = '+905318986418';
const MAPS = 'https://www.google.com/maps?cid=6436895271281342624';
const BASE_PATH = '/ru/vyezdnoy-portnoy-antalya';

export const dynamicParams = false;

export async function generateStaticParams() {
  return OTEL_BOLGELERI.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  const r = bulOtelBolgesi(region);
  if (!r) return {};

  const url = `${HOME_URL}${BASE_PATH}/${r.slug}`;
  const title = `Ателье и портной в ${r.name} | Доставка в отель`;
  const desc = `Срочный ремонт и подгонка одежды во время отпуска. Ателье Terzi Can предлагает профессиональные услуги портного с выездом в отели ${r.name}. Пишите в WhatsApp!`;
  const ogImage = `${HOME_URL}/og/terzi-can.jpg`;

  return {
    metadataBase: new URL(HOME_URL),
    title: { absolute: title },
    description: desc,
    keywords: [
      `Ателье ${r.name}`, 
      `выездной портной ${r.name}`, 
      `ремонт одежды отель ${r.name}`, 
      'портной Анталья', 
      'русскоговорящий портной Анталья'
    ],
    // terzihizmeti.com.tr'de birebir aynı bölge sayfası → cross-domain canonical (hreflang kümesi yok)
    alternates: {
      canonical: crossCanonical(`${BASE_PATH}/${r.slug}`) ?? url,
      languages: {
        en: `https://swaphubs.com/en/hotel-tailor-antalya/${r.slug}`,
        ru: `https://swaphubs.com/ru/vyezdnoy-portnoy-antalya/${r.slug}`,
        de: `https://swaphubs.com/de/schneider-service-hotel-antalya/${r.slug}`,
        ...zoneAlt(r.slug),
        'x-default': `https://swaphubs.com/en/hotel-tailor-antalya/${r.slug}`,
      },
    },
    openGraph: { title, description: desc, url, type: 'website', locale: 'ru_RU', siteName: 'Terzi Can Antalya', images: [{ url: ogImage, width: 1200, height: 630, alt: `Портной в ${r.name}` }] },
    twitter: { card: 'summary_large_image', title, description: desc, images: [ogImage] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  };
}

export default async function BelekLaraGuzelobaSideRuPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const r = bulOtelBolgesi(region);
  if (!r) notFound();

  const url = `${HOME_URL}${BASE_PATH}/${r.slug}`;

  const seoContent = {
    h1: `Профессиональные услуги портного для гостей отелей в ${r.name}`,
    h2: `Быстрый ремонт и подгонка одежды без выезда из отеля`,
    body1: `Отдыхаете в ${r.name} и вам нужно срочно укоротить купленные брюки, подогнать вечернее платье по фигуре или починить сломанную молнию? Ателье Terzi Can решит эту проблему быстро и качественно.`,
    body2: `Мы специализируемся на ремонте, подгонке и пошиве одежды любой сложности. Мы знаем, что вы не хотите тратить драгоценное время отпуска на поиски ателье в городе. Именно поэтому мы предлагаем услугу портного с забором и доставкой для гостей, проживающих в отелях ${r.name}.`
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Выездной портной ${r.name} — Забор и Доставка`,
        serviceType: 'Clothing Alterations & Mobile Tailoring',
        provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: PHONE_TEL, url: `${HOME_URL}/terzi`, image: `${HOME_URL}/og/terzi-can.jpg`, priceRange: '$$' },
        areaServed: { '@type': 'Place', name: `${r.name}, Antalya` },
        description: seoContent.body2,
        url,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: HOME_URL },
          { '@type': 'ListItem', position: 2, name: 'Выездной портной в Анталии', item: `${HOME_URL}${BASE_PATH}` },
          { '@type': 'ListItem', position: 3, name: r.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <SpeakableSchema path={`${BASE_PATH}/${r.slug}`} />
      <QuickActionBanner lang="ru" variant="hotel-service" />
      <OtelBolgeSayfasi 
        lang="ru" 
        region={r} 
        allRegions={OTEL_BOLGELERI} 
        basePath={BASE_PATH} 
        maps={MAPS} 
        seoContent={seoContent} 
      />
      <ReviewsBlock lang="ru" schema />
    </>
  );
}
