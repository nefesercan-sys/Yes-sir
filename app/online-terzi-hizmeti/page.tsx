import type { Metadata } from 'next';
import ReviewsBlock from '@/components/ReviewsBlock';
import { reviewSchema } from '@/lib/reviews';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import OnlineTerziClient from './OnlineTerziClient';
import { jsonLdString } from '@/lib/json-ld';

const SITE_URL = 'https://swaphubs.com/online-terzi-hizmeti';

// ─── METADATA ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),
  title: { absolute: "Online Terzi Hizmeti | Ölçüye Özel Dikim & Kargo | Terzi Can" },
  description:
    "Türkiye'ye ve yurt dışına gönderimli online özel terzi. Abiye, gelinlik, takım elbise dikimi. WhatsApp'tan ölçü verin, kıyafetiniz adresinize gelsin.",
  keywords: [
    'online terzi', 'online terzi hizmeti', 'e-terzi', 'dijital terzi',
    'online özel dikim', 'kapıya gelen terzi', 'online abiye dikimi',
    'online gelinlik dikimi', 'online takım elbise dikimi',
    'online üniforma üretimi', 'müslin kıyafet dikimi', 'keten elbise dikimi',
    'özel tasarım kıyafet', 'ölçüye göre kıyafet', 'online terzi Türkiye',
    'online terzi Antalya', 'online terzi İstanbul', 'WhatsApp terzi hizmeti',
    'online fason dikim', 'SwapHubs terzi',
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
    title: "Terzi Can Online Terzi | Ölçüye Özel Dikim, Yurt Dışına Gönderim",
    description:
      "WhatsApp üzerinden ölçü alımı, abiye, gelinlik ve takım elbise dikimi. Türkiye'ye ve yurt dışına gönderim; oturmayan kıyafette değişim veya düzeltme.",
    url: SITE_URL,
    siteName: 'Terzi Can Antalya',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'de_DE', 'ar_SA'],
    type: 'website',
    images: [
      {
        url: '/og/terzi-can.jpg',
        width: 1200,
        height: 630,
        alt: "Terzi Can Online Terzi Hizmeti — Ölçüye Özel Dikim",
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    title: 'Terzi Can Online Terzi | Türkiye ve Yurt Dışına Gönderim',
    description: "WhatsApp üzerinden ölçü alımı, özel dikim, kapıya teslimat.",
    images: ['/og/terzi-can.jpg'],
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
    'geo.position': '36.8572868;30.5970193',
    'ICBM': '36.8572868, 30.5970193',
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
      ...reviewSchema(),
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can Online Terzi',
      alternateName: ['Terzi Can E-Terzi', 'Online Terzi Türkiye', 'Terzi Can Tailor'],
      description:
        "Türkiye'ye ve yurt dışına gönderim yapan online özel terzi hizmeti. Abiye, gelinlik, takım elbise, üniforma dikimi.",
      url: SITE_URL,
      telephone: '+905318986418',
      email: 'tekstil@swaphubs.com',
      priceRange: '₺₺',
      image: ['https://swaphubs.com/og/terzi-can.jpg'],
      logo: 'https://swaphubs.com/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07130',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8572868, longitude: 30.5970193 },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],
          opens: '08:00',
          closes: '23:00',
        },
      ],
      areaServed: [{ '@type': 'Country', name: 'Turkey' }, { '@type': 'Place', name: 'Worldwide (shipping)' }],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+905318986418',
          contactType: 'customer service',
          areaServed: 'TR',
          availableLanguage: ['Turkish','English','German','Russian','Arabic','Spanish','French','Polish','Ukrainian','Dutch'],
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
            description: 'Ölçüye özel abiye ve gece elbisesi dikimi. Oturmazsa değişim veya düzeltme.',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'TRY',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can Online Terzi' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Özel Gelinlik Tasarımı ve Dikimi',
            description: 'Ölçüye özel gelinlik dikimi ve gelinlik tadilatı. Oturmazsa değişim veya düzeltme.',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'TRY',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can Online Terzi' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Özel Takım Elbise ve Smokin Dikimi',
            description: 'Ölçüye özel takım elbise ve smokin dikimi.',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'TRY',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can Online Terzi' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Kurumsal Üniforma Üretimi',
            description: 'Otel, restoran, sağlık ve diğer sektörler için logo nakışlı üniforma. Minimum sipariş adedi yok.',
            availability: 'https://schema.org/InStock',
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
      name: "Online Terzi Hizmeti | Ölçüye Özel Dikim | Terzi Can",
      url: SITE_URL,
      isPartOf: { '@id': 'https://swaphubs.com#website' },
      about: { '@id': `${SITE_URL}#business` },
      description:
        "Türkiye'ye ve yurt dışına gönderim yapan online özel terzi. WhatsApp üzerinden ölçü al, kıyafet adresine gelsin.",
      inLanguage: 'tr',
      datePublished: '2024-01-01',
      dateModified: '2026-10-29',
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
            text: "Evet. Ölçülerinizi online alıp kıyafeti Antalya'daki atölyemizde dikiyor, istediğiniz şehre veya ülkeye gönderiyoruz. Tüm süreç WhatsApp üzerinden yürütülür.",
          },
        },
        {
          '@type': 'Question',
          name: 'Online terzi için ölçülerimi nasıl alacağım?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WhatsApp üzerinden ölçü alma konusunda sizi adım adım yönlendiriyoruz; bir mezura ve telefonunuz yeterli.',
          },
        },
        {
          '@type': 'Question',
          name: 'Online terzi siparişim ne kadar sürede teslim edilir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dikim süresi modele göre değişir; yaklaşık süreyi WhatsApp üzerinden söyleriz. Yurt dışı kargo genelde 1–3 hafta sürer.',
          },
        },
        {
          '@type': 'Question',
          name: 'Online terzi kıyafetim tam oturmadıysa ne yapacağım?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oturmayan ürünü değiştiriyor veya düzeltiyoruz. WhatsApp\'tan bize yazın, işi birlikte planlarız.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kendi kumaşımla online terzi hizmetinden yararlanabilir miyim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kumaşı biz temin edebiliriz; isterseniz kendi kumaşınızı da getirebilir veya gönderebilirsiniz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Hangi dillerde yazışabiliriz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WhatsApp üzerinden her dilde yazışabilirsiniz; her dilde cevap veriyoruz. Ödemeyi havale ile alıyoruz.',
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
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <SpeakableSchema path="/online-terzi-hizmeti" />
      <QuickActionBanner lang="tr" />
      <OnlineTerziClient />
      <ReviewsBlock lang="tr" />
    </>
  );
}
