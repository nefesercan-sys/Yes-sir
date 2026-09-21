import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OTEL_BOLGELERI, bulOtelBolgesi } from '@/lib/otel-bolgeleri';
import OtelBolgeSayfasi from '@/components/terzi/OtelBolgeSayfasi';

const HOME_URL = 'https://swaphubs.com';
const PHONE_TEL = '+905318986418';
const MAPS = 'https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8';
const BASE_PATH = '/en/hotel-tailor-antalya';

// Bilinmeyen URL'lerin 404 dönmesi için (Güvenlik ve SEO)
export const dynamicParams = false;

export async function generateStaticParams() {
  return OTEL_BOLGELERI.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  const r = bulOtelBolgesi(region);
  if (!r) return {};

  const url = `${HOME_URL}${BASE_PATH}/${r.slug}`;
  // Yeni VIP SEO Başlığı ve Açıklaması (Dinamik)
  const title = `VIP Tailor & Alteration Service in ${r.name} | Hotel Pickup`;
  const desc = `Need urgent clothing alterations during your holiday? Terzi Can provides professional tailoring, hemming, and repair services with VIP hotel pickup in ${r.name}. Contact us via WhatsApp!`;
  const ogImage = `${HOME_URL}/terzi-can-hero.jpg`;

  return {
    metadataBase: new URL(HOME_URL),
    title,
    description: desc,
    keywords: [
      `VIP tailor ${r.name}`, 
      `hotel pickup tailor ${r.name}`, 
      `${r.name} clothing alterations`, 
      'mobile tailor Antalya', 
      'English speaking tailor Antalya'
    ],
    alternates: {
      canonical: url,
      languages: {
        'tr': `${HOME_URL}/terzi/otele-gelen-terzi-antalya/${r.slug}`,
        'en': url,
        'ru': `${HOME_URL}/ru/vyezdnoy-portnoy-antalya/${r.slug}`,
        'de': `${HOME_URL}/de/schneider-service-hotel-antalya/${r.slug}`,
        'x-default': url,
      },
    },
    openGraph: { title, description: desc, url, type: 'website', locale: 'en_US', siteName: 'Terzi Can - SwapHubs', images: [{ url: ogImage, width: 1200, height: 630, alt: `VIP Tailor in ${r.name}` }] },
    twitter: { card: 'summary_large_image', title, description: desc, images: [ogImage] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  };
}

export default async function BelekLaraGuzelobaSideEnPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const r = bulOtelBolgesi(region);
  if (!r) notFound();

  const url = `${HOME_URL}${BASE_PATH}/${r.slug}`;

  // Yabancı turistleri ikna edici VIP Otel Servisi metinleri
  const seoContent = {
    h1: `Premium Tailor Service for Hotel Guests in ${r.name}`,
    h2: `Fast & Professional Alterations Without Leaving Your Resort`,
    body1: `Enjoying your holiday in ${r.name} but need a quick wardrobe fix? Whether you bought a new dress that needs resizing, broke a zipper on your favorite jacket, or need emergency alterations for a special event, Terzi Can is here to help.`,
    body2: `Based in Antalya, we specialize in high-quality garment alterations, repairs, and custom tailoring. We understand that your holiday time is precious. That is why we offer a VIP Mobile Tailor Service exclusively for guests staying in resorts and hotels across ${r.name}.`
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `VIP Hotel Tailor ${r.name} — Pickup & Delivery`,
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
            name: `How does the VIP pickup work in ${r.name}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Message us on WhatsApp with a photo of your garment. We will collect the item directly from your hotel reception in ${r.name} and deliver it back once altered.` },
          },
          {
            '@type': 'Question',
            name: `How long do alterations take for hotel guests?`,
            acceptedAnswer: { '@type': 'Answer', text: `Our expert tailors work their magic within 24 to 48 hours for guests in ${r.name}.` },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OtelBolgeSayfasi 
        lang="en" 
        region={r} 
        allRegions={OTEL_BOLGELERI} 
        basePath={BASE_PATH} 
        maps={MAPS} 
        seoContent={seoContent} 
      />
    </>
  );
}
