import type { Metadata } from 'next';
import OnlineTerziClient from './OnlineTerziClient';

export const metadata: Metadata = {
  title: 'Online Terzi | Özel Kıyafet Dikimi | SwapHubs',
  description: "Türkiye'nin 81 iline kapıya kargo ile özel kıyafet dikimi. Abiye, gelinlik, takım elbise, müslin ve üniforma — ölçünüzü WhatsApp'tan gönderin, kıyafetiniz kapınıza gelsin.",
  keywords: 'online terzi, özel dikim, kişiye özel kıyafet, abiye dikim, gelinlik, takım elbise, üniforma, WhatsApp terzi',
  alternates: {
    canonical: 'https://swaphubs.com/online-terzi-hizmeti',
    languages: {
      'tr-TR': 'https://swaphubs.com/online-terzi-hizmeti',
      'en-US': 'https://swaphubs.com/en/online-tailor',
      'de-DE': 'https://swaphubs.com/de/online-schneider',
      'ar': 'https://swaphubs.com/ar/khayat-online',
    },
  },
  openGraph: {
    title: 'Online Terzi Hizmeti | SwapHubs — Özel Kıyafet Dikimi',
    description: "Türkiye'nin 81 iline kapıya kargo. Abiye, gelinlik, takım elbise, müslin — ölçünüzü verin, kıyafetiniz kapınıza gelsin.",
    url: 'https://swaphubs.com/online-terzi-hizmeti',
    siteName: 'SwapHubs Online Terzi',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: 'https://swaphubs.com/og-terzi.jpg',
        width: 1200,
        height: 630,
        alt: 'SwapHubs Online Terzi — Özel Kıyafet Dikimi Türkiye',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Terzi | SwapHubs',
    description: "Türkiye'nin 81 iline özel kıyafet dikimi. WhatsApp ile sipariş ver.",
    images: ['https://swaphubs.com/og-terzi.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://swaphubs.com/#business',
      name: 'SwapHubs Online Terzi',
      description: "Türkiye'nin 81 iline kapıya kargo ile özel kıyafet dikimi hizmeti.",
      url: 'https://swaphubs.com/online-terzi-hizmeti',
      telephone: '+905318986418',
      email: 'tekstil@swaphubs.com',
      image: 'https://swaphubs.com/og-terzi.jpg',
      logo: 'https://swaphubs.com/logo.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 36.8969,
        longitude: 30.7133,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Turkey',
      },
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '09:00',
        closes: '21:00',
      },
      sameAs: [
        'https://wa.me/905318986418',
        'https://instagram.com/swaphubs',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Kıyafet Dikim Hizmetleri',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Abiye Dikim' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gelinlik Dikim' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Takım Elbise Dikim' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Üniforma Üretimi' } },
        ],
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://swaphubs.com/online-terzi-hizmeti#webpage',
      url: 'https://swaphubs.com/online-terzi-hizmeti',
      name: 'Online Terzi Hizmeti | SwapHubs',
      isPartOf: { '@id': 'https://swaphubs.com/#website' },
      about: { '@id': 'https://swaphubs.com/#business' },
      inLanguage: 'tr-TR',
      dateModified: new Date().toISOString(),
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://swaphubs.com/online-terzi-hizmeti#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Türkiye'nin herhangi bir şehrinden sipariş verebilir miyim?",
          acceptedAnswer: { '@type': 'Answer', text: "Evet, Türkiye'nin 81 iline kapıya kargo teslimatı yapıyoruz. Tüm süreç WhatsApp üzerinden yürütülüyor." },
        },
        {
          '@type': 'Question',
          name: 'Ölçülerimi nasıl alacağım?',
          acceptedAnswer: { '@type': 'Answer', text: 'WhatsApp üzerinden görüntülü ölçü alma seansı ayarlıyoruz. Sadece bir mezura ve akıllı telefonunuz yeterli.' },
        },
        {
          '@type': 'Question',
          name: 'Sipariş ne kadar sürede teslim edilir?',
          acceptedAnswer: { '@type': 'Answer', text: 'Temel modeller 7–10 iş gününde, abiye ve gelinlik gibi detaylı modeller 15–21 iş gününde tamamlanır. Kargo 1–3 iş günü içinde ulaşır.' },
        },
        {
          '@type': 'Question',
          name: 'Kıyafet tam oturmadıysa ne olacak?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tam Uyum Garantimiz kapsamında ücretsiz revizyon hakkınız vardır. Memnun kalmazsanız koşulsuz iade politikamız devreye girer.' },
        },
        {
          '@type': 'Question',
          name: 'Kendi kumaşımı getirip diktirebilir miyim?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, kendi kumaşınızla fason dikim hizmeti sunuyoruz. Kumaşınızı kargo ile atölyemize gönderebilirsiniz.' },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://swaphubs.com' },
        { '@type': 'ListItem', position: 2, name: 'Online Terzi Hizmeti', item: 'https://swaphubs.com/online-terzi-hizmeti' },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OnlineTerziClient />
    </>
  );
}
