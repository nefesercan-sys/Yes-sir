import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OTEL_BOLGELERI, bulOtelBolgesi } from '@/lib/otel-bolgeleri';
import OtelBolgeSayfasi from '@/components/terzi/OtelBolgeSayfasi';

const HOME_URL = 'https://swaphubs.com';
const PHONE_TEL = '+905318986418';
const MAPS = 'https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8';
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
  const title = `VIP Ателье и Портной в ${r.name} | Доставка в отель`;
  const desc = `Срочный ремонт и подгонка одежды во время отпуска. Ателье Terzi Can предлагает профессиональные услуги портного с выездом в отели ${r.name}. Пишите в WhatsApp!`;
  const ogImage = `${HOME_URL}/terzi-can-hero.jpg`;

  return {
    metadataBase: new URL(HOME_URL),
    title,
    description: desc,
    keywords: [
      `VIP Ателье ${r.name}`, 
      `выездной портной ${r.name}`, 
      `ремонт одежды отель ${r.name}`, 
      'портной Анталия', 
      'русскоговорящий портной Анталия'
    ],
    alternates: {
      canonical: url,
      languages: {
        'tr': `${HOME_URL}/terzi/otele-gelen-terzi-antalya/${r.slug}`,
        'en': `${HOME_URL}/en/hotel-tailor-antalya/${r.slug}`,
        'ru': url,
        'de': `${HOME_URL}/de/schneider-service-hotel-antalya/${r.slug}`,
        'x-default': `${HOME_URL}/en/hotel-tailor-antalya/${r.slug}`,
      },
    },
    openGraph: { title, description: desc, url, type: 'website', locale: 'ru_RU', siteName: 'Terzi Can - SwapHubs', images: [{ url: ogImage, width: 1200, height: 630, alt: `VIP Портной в ${r.name}` }] },
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
    body2: `Мы специализируемся на ремонте, подгонке и пошиве одежды любой сложности. Мы знаем, что вы не хотите тратить драгоценное время отпуска на поиски ателье в городе. Именно поэтому мы предлагаем VIP-услугу выездного портного для гостей, проживающих в отелях ${r.name}.`
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `VIP Выездной Портной ${r.name} — Забор и Доставка`,
        serviceType: 'Clothing Alterations & Mobile Tailoring',
        provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: PHONE_TEL, url: `${HOME_URL}/terzi`, image: `${HOME_URL}/terzi-can-hero.jpg`, priceRange: '$$' },
        areaServed: { '@type': 'Place', name: `${r.name}, Antalya` },
        description: seoContent.body2,
        url,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Как работает забор одежды из отеля в ${r.name}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Напишите нам в WhatsApp и отправьте фото одежды. Наш курьер заберет вещь прямо с ресепшена вашего отеля в ${r.name} и вернет после ремонта.` },
          },
          {
            '@type': 'Question',
            name: `Сколько времени занимает работа?`,
            acceptedAnswer: { '@type': 'Answer', text: `Наши мастера выполнят заказ за 24–48 часов с бесплатной доставкой в ваш отель в ${r.name}.` },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OtelBolgeSayfasi 
        lang="ru" 
        region={r} 
        allRegions={OTEL_BOLGELERI} 
        basePath={BASE_PATH} 
        maps={MAPS} 
        seoContent={seoContent} 
      />
    </>
  );
}
