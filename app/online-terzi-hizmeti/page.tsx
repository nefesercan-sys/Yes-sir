import type { Metadata } from 'next';
import OnlineTerziClient from './OnlineTerziClient';

export const metadata: Metadata = {
  title: 'Online Terzi Hizmeti | Özel Kıyafet Dikim | SwapHubs E-Terzi',
  description: "Türkiye'nin 81 iline kapıya kargo ile özel kıyafet dikimi. Abiye, gelinlik, takım elbise, müslin, spor giyim ve üniforma — ölçünüzü WhatsApp'tan gönderin, kıyafetiniz kapınıza gelsin. 4 dilde hizmet.",
  keywords: 'online terzi, özel dikim, e-terzi, kişiye özel kıyafet, abiye dikim, gelinlik dikim, ısmarlama elbise, özel takım elbise, müslin kıyafet, keten elbise, kurumsal üniforma, kapıya teslimat, WhatsApp terzi, Antalya terzi',
  alternates: {
    canonical: 'https://swaphubs.com/online-terzi-hizmeti',
  },
  openGraph: {
    title: 'Online Terzi Hizmeti | SwapHubs',
    description: "Türkiye'nin 81 iline kapıya kargo. Abiye, gelinlik, takım elbise, müslin ve daha fazlası — ölçünüzü verin, kıyafetiniz kapınıza gelsin.",
    url: 'https://swaphubs.com/online-terzi-hizmeti',
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'SwapHubs Online Terzi Hizmeti — Özel Kıyafet Dikimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Terzi Hizmeti | SwapHubs',
    description: "Türkiye'nin 81 iline kapıya kargo ile özel kıyafet dikimi.",
    images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Antalya',
        addressCountry: 'TR',
      },
      areaServed: 'TR',
      priceRange: '$$',
      openingHours: 'Mo-Su 09:00-21:00',
      sameAs: ['https://wa.me/905318986418'],
    },
    {
      '@type': 'Service',
      name: 'Kişiye Özel Kıyafet Dikim Hizmeti',
      provider: { '@id': 'https://swaphubs.com/#business' },
      serviceType: 'Custom Clothing Tailoring',
      areaServed: 'TR',
      description: 'Abiye, gelinlik, takım elbise, müslin, spor giyim ve üniforma dikimi. WhatsApp üzerinden sipariş, kapıya teslimat.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Türkiye'nin herhangi bir şehrinden sipariş verebilir miyim?",
          acceptedAnswer: { '@type': 'Answer', text: "Kesinlikle! İstanbul'dan Hakkari'ye, İzmir'den Kars'a Türkiye'nin 81 iline kapıya kadar kargo teslimatı yapıyoruz." },
        },
        {
          '@type': 'Question',
          name: 'Ölçülerimi nasıl alacağım?',
          acceptedAnswer: { '@type': 'Answer', text: 'WhatsApp üzerinden görüntülü ölçü alma seansı ayarlıyoruz. Sadece bir mezura ve akıllı telefonunuz yeterli.' },
        },
        {
          '@type': 'Question',
          name: 'Sipariş ne kadar sürede teslim edilir?',
          acceptedAnswer: { '@type': 'Answer', text: 'Temel modeller 7–10 iş gününde, abiye ve gelinlik gibi detaylı modeller 15–21 iş gününde tamamlanır. Kargo 1–3 iş günü içinde kapınıza ulaşır.' },
        },
        {
          '@type': 'Question',
          name: 'Kıyafet tam oturmadıysa ne olacak?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tam Uyum Garantimiz kapsamında ücretsiz revizyon hakkınız var. Memnun kalmazsanız koşulsuz iade politikamız devreye girer.' },
        },
        {
          '@type': 'Question',
          name: 'Kendi kumaşımı getirip diktirebilir miyim?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet! Kendi kumaşınızla fason dikim hizmeti sunuyoruz. Kumaşınızı kargo ile atölyemize gönderin.' },
        },
        {
          '@type': 'Question',
          name: '4 dilde hizmet gerçekten mümkün mü?',
          acceptedAnswer: { '@type': 'Answer', text: 'Türkçe, İngilizce, Almanca ve Arapça dillerinde müşteri hizmeti sunuyoruz.' },
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
