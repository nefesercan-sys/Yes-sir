import type { Metadata } from 'next';
import ReviewsBlock from '@/components/ReviewsBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import OnlineTerziClient from './OnlineTerziClient';

const SITE_URL = 'https://swaphubs.com/online-terzi-hizmeti';

// ─── METADATA ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),
  title: { absolute: "Online Terzi Hizmeti | 81 İle Özel Dikim & Kargo | Terzi Can" },
  description:
    "Türkiye'nin 81 iline kargo teslimatlı online özel terzi. Abiye, gelinlik, takım elbise dikimi. WhatsApp'tan ölçü verin, kıyafetiniz kapınıza gelsin.",
  keywords: [
    'online terzi', 'online terzi hizmeti', 'e-terzi', 'dijital terzi',
    'online özel dikim', 'kapıya gelen terzi', 'online abiye dikimi',
    'online gelinlik dikimi', 'online takım elbise dikimi',
    'online üniforma üretimi', 'müslin kıyafet dikimi', 'keten elbise dikimi',
    'özel tasarım kıyafet', 'ölçüye göre kıyafet', 'online terzi Türkiye',
    'online terzi Antalya', 'online terzi İstanbul', 'WhatsApp terzi hizmeti',
    '81 ile terzi', 'online fason dikim', 'SwapHubs terzi',
  ],
  alternates: {
    canonical: SITE_URL,
    // NOT (2026-09-26): Bu sayfa /terzi'den içerik olarak farklı (Türkiye geneli
    // kargo odaklı), ve /terzi zaten /online-tailor-service, /de/online-schneider-
    // service-antalya, /ru/atelie-antalya üçlüsünün 'tr' çapası olarak ayarlı.
    // Bu sayfayı da aynı yabancı sayfalara bağlamak çift/çelişkili 'tr' referansı
    // yaratır (Search Console'da "hreflang karşılıklı değil" hatası). Bu sayfanın
    // kendine özgü bir İngilizce/Almanca/Rusça çevirisi yazılana kadar dürüstçe
    // yalnızca Türkçe olarak işaretli kalıyor.
    languages: {
      'tr': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: "Terzi Can Online Terzi | Türkiye'nin 81 İline Özel Dikim",
    description:
      "WhatsApp üzerinden profesyonel ölçü alımı, abiye, gelinlik ve takım elbise dikimi. 81 ile teslimat ve tam uyum garantisi.",
    url: SITE_URL,
    siteName: 'Terzi Can Antalya',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'de_DE', 'ar_SA'],
    type: 'website',
    images: [
      {
        url: '/og/online-terzi.jpg',
        width: 1200,
        height: 630,
        alt: "Terzi Can Online Terzi Hizmeti — Türkiye'nin 81 İline Özel Dikim",
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    title: 'Terzi Can Online Terzi | 81 İle Teslimat | TR · EN · DE · AR',
    description: "WhatsApp üzerinden ölçü alımı, özel dikim, kapıya teslimat.",
    images: ['/og/online-terzi.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Antalya',
    'geo.position': '36.857466;30.596987',
    'ICBM': '36.857466, 30.596987',
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // 1. WebSite
    {
      '@type': 'WebSite',
      '@id': 'https://swaphubs.com#website',
      name: 'SwapHubs',
      url: 'https://swaphubs.com',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://swaphubs.com#organization',
        name: 'SwapHubs',
        url: 'https://swaphubs.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://swaphubs.com/logo.png',
          width: 512,
          height: 512,
        },
      },
    },

    // 2. LocalBusiness
    {
      '@type': ['ClothingStore', 'LocalBusiness'],
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can Online Terzi',
      alternateName: ['Terzi Can E-Terzi', 'Online Terzi Türkiye', 'Terzi Can Tailor'],
      description:
        "Türkiye'nin 81 iline kapıya teslimat yapan online özel terzi hizmeti. Abiye, gelinlik, takım elbise, üniforma dikimi.",
      url: SITE_URL,
      telephone: '+905318986418',
      email: 'tekstil@swaphubs.com',
      priceRange: '₺₺',
      image: ['https://swaphubs.com/og/online-terzi.jpg'],
      logo: 'https://swaphubs.com/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.857466, longitude: 30.596987 },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],
          opens: '08:00',
          closes: '23:00',
        },
      ],
      areaServed: { '@type': 'Country', name: 'Turkey' },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+905318986418',
          contactType: 'customer service',
          areaServed: 'TR',
          availableLanguage: ['Turkish','English','German','Arabic'],
        },
      ],

      // DÜZELTİLDİ: Nested itemOffered kaldırıldı, additionalType ve price eklendi
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can Online Terzi Hizmetleri 2025–2026',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Özel Tasarım Abiye & Gece Elbisesi Dikimi',
            description: 'El işlemeli dantel, İtalyan saten ve Fransız şifon kumaşlarla abiye dikimi. 3D taslak onayı, ücretsiz revizyon.',
            availability: 'https://schema.org/InStock',
            price: '2000',
            priceCurrency: 'TRY',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can Online Terzi' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Özel Gelinlik Tasarımı ve Dikimi',
            description: 'Swarovski taşlar, el yapımı dantel aplikelerle özel gelinlik. Kişisel stil danışmanı, ücretsiz revizyon.',
            availability: 'https://schema.org/InStock',
            price: '5000',
            priceCurrency: 'TRY',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can Online Terzi' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Özel Takım Elbise ve Smokin Dikimi',
            description: 'İtalyan yün ve superfine wool kumaşlarla ölçüye özel takım elbise ve smokin dikimi.',
            availability: 'https://schema.org/InStock',
            price: '3000',
            priceCurrency: 'TRY',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can Online Terzi' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Kurumsal Üniforma Üretimi',
            description: 'Otel, restoran, sağlık, havacılık için logo nakışlı üniforma. Minimum 10 adet.',
            availability: 'https://schema.org/InStock',
            price: '500',
            priceCurrency: 'TRY',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can Online Terzi' },
            additionalType: 'https://schema.org/Service',
          },
        ],
      },

      sameAs: [
        'https://wa.me/905318986418',
        'https://swaphubs.com',
        'https://swaphubs.com/terzi',
      ],
    },

    // 3. WebPage
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: "Online Terzi Hizmeti | Türkiye'nin 81 İline Özel Dikim | Terzi Can",
      url: SITE_URL,
      isPartOf: { '@id': 'https://swaphubs.com#website' },
      about: { '@id': `${SITE_URL}#business` },
      description:
        "Türkiye'nin 81 iline kapıya teslimat yapan online özel terzi. WhatsApp üzerinden ölçü al, kıyafet kapına gelsin.",
      inLanguage: ['tr', 'en', 'de', 'ar'],
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
    },

    // 4. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: 'https://swaphubs.com' },
        { '@type': 'ListItem', position: 2, name: 'Terzi', item: 'https://swaphubs.com/terzi' },
        { '@type': 'ListItem', position: 3, name: 'Online Terzi Hizmeti', item: SITE_URL },
      ],
    },

    // 5. FAQPage
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: "Türkiye'nin herhangi bir şehrinden online terzi siparişi verebilir miyim?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet! İstanbul'dan Hakkari'ye, İzmir'den Kars'a 81 ilin tamamına kapıya kargo teslimatı yapıyoruz. Tüm süreç WhatsApp üzerinden yürütülüyor, atölyeye gelmenize gerek yok.",
          },
        },
        {
          '@type': 'Question',
          name: 'Online terzi için ölçülerimi nasıl alacağım?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WhatsApp üzerinden görüntülü ölçü alma seansı ayarlıyoruz. Uzman ekibimiz sizi adım adım yönlendirir; sadece bir mezura ve akıllı telefonunuz yeterli.',
          },
        },
        {
          '@type': 'Question',
          name: 'Online terzi siparişim ne kadar sürede teslim edilir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Temel modeller 7–10 iş gününde, abiye ve gelinlik 15–21 iş gününde tamamlanır. Kargo 1–3 iş günü içinde kapınıza ulaşır. Acele sipariş hizmeti de mevcuttur.',
          },
        },
        {
          '@type': 'Question',
          name: 'Online terzi kıyafetim tam oturmadıysa ne yapacağım?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tam Uyum Garantimiz kapsamında ücretsiz revizyon hakkınız var. Ürünü iade edersiniz, revize edilmiş haliyle kapınıza gönderilir. Koşulsuz iade politikamız da mevcuttur.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kendi kumaşımla online terzi hizmetinden yararlanabilir miyim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet! Kendi kumaşınızı kargo ile atölyemize gönderin, ölçü ve model bilgilerinizle birlikte kıyafetiniz dikilip kapınıza gönderilir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Online terzi hizmeti kaç dilde sunuluyor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Türkçe, İngilizce, Almanca ve Arapça dillerinde hizmet sunuyoruz. Yurt dışında yaşayan Türkler ve uluslararası müşteriler de kolayca sipariş verebilir.',
          },
        },
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
      <SpeakableSchema path="/online-terzi-hizmeti" />
      <QuickActionBanner lang="tr" />
      <OnlineTerziClient />
      <ReviewsBlock lang="tr" />
    </>
  );
}
