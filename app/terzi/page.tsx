import type { Metadata } from 'next';
import TerziClient from './TerziClient';

const SITE_URL = 'https://www.swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — Google'ın E-E-A-T ve arama intentine göre optimize edildi.
//
// Analiz edilen rakipler:
//  • armut.com/antalya-terzi            → fiyat karşılaştırma platformu
//  • kayseriterzi.com                   → yerel rakip
//  • yandex maps                        → harita listeleme
//
// En yüksek arama hacimli sorgular (araştırma bazlı):
//  1. "paça kısaltma fiyatı"            → fiyat intentli
//  2. "fermuar değişimi kaç lira"       → fiyat intentli
//  3. "Antalya terzi"                   → yerel intentli
//  4. "elbise dikimi Antalya"           → yerel + hizmet intentli
//  5. "konyaaltı terzi"                 → hiper-yerel intentli
//  6. "eve gelen terzi Antalya"         → mobil / acil intentli
//  7. "tailor Antalya" (EN)             → turist intentli
//  8. "портной Анталья" (RU)           → Rus turist intentli
//  9. "Schneider Antalya" (DE)          → Alman turist intentli
// 10. "üniforma dikimi Antalya"         → B2B intentli
//
// TITLE: 50-60 karakter, birincil KW önde, marka sonda.
// DESCRIPTION: 140-160 karakter, fiyat + CTA + telefon.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),

  title: {
    // 58 karakter — "paça kısaltma", "terzi", "Antalya" öne alındı
    default: 'Antalya Terzi · Paça Kısaltma ₺150 · Elbise Dikimi · Kiyafet tamiri',
    template: '%s | Terzi Can Antalya',
  },

  // 158 karakter — fiyat + expres + mobil servis + çok dil vurgusu
  description:
    "Konyaaltı Terzi Can: paça kısaltma ₺150, fermuar değişimi ₺150, elbise dikimi, bay bayan elbise dikim, tamiri tafilatı, üniforma dikimi, ütü ve dikiş işleri yapılır, TR·EN·RU·DE ☎ " + PHONE,

  keywords: [
    // ── Birincil — yüksek hacim, yerel intent ──────────────────────────────
    'Antalya terzi',
    'Konyaaltı terzi',
    'terzi Antalya',
    'elbise dikimi Antalya',
    'paça kısaltma Antalya',
    'paça kısaltma fiyatı 2026',
    'paça kısaltma kaç lira',
    'fermuar değişimi Antalya',
    'fermuar değişimi kaç lira',
    'mont fermuarı değişimi',
    // ── Mobil / acil intent ─────────────────────────────────────────────────
    'eve gelen terzi Antalya',
    'otele gelen terzi Antalya',
    'araçlı terzi servisi',
    'yakınımda terzi',
    // ── Hizmet intentli ─────────────────────────────────────────────────────
    'elbise daraltma Antalya',
    'kıyafet tamiri Antalya',
    'kıyafet tadilatı Antalya',
    'bel alma Antalya',
    'kol kısaltma Antalya',
    'gelinlik tadilatı Antalya',
    'abiye tamiri Antalya',
    'abiye dikimi Antalya',
    'kuru temizleme Antalya',
    'üniforma dikimi Antalya',
    'otel üniforma üretimi Antalya',
    'nakış Antalya',
    'sweatshirt dikimi Antalya',
    'özel dikim Antalya',
    // ── İlçe bazlı — hiperlokal ─────────────────────────────────────────────
    'Lara terzi',
    'Belek terzi',
    'Kemer terzi',
    'Alanya terzi',
    'Manavgat terzi',
    'Side terzi',
    'Kepez terzi',
    // ── Turist intentli — EN/RU/DE ──────────────────────────────────────────
    'tailor Antalya',
    'clothing alterations Antalya',
    'tailor near me Antalya',
    'mobile tailor Antalya',
    'hotel tailor Antalya',
    'dry cleaning Antalya',
    'uniform production Antalya',
    'Schneider Antalya',
    'Änderungen Antalya',
    'Uniformproduktion Antalya',
    'портной Анталья',
    'химчистка Анталья',
    'пошив на заказ Анталья',
    // ── Fiyat intentli ──────────────────────────────────────────────────────
    'terzi fiyatları 2026',
    'paça kısaltma fiyatı',
    'fermuar değişimi fiyatı',
    'kuru temizleme fiyatı Antalya',
  ],

  authors: [{ name: 'SwapHubs', url: 'https://www.swaphubs.com' }],
  creator: 'SwapHubs',
  publisher: 'SwapHubs',

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

  // ── Canonical + hreflang ──────────────────────────────────────────────────
  alternates: {
    canonical: 'https://www.swaphubs.com/terzi',
    languages: {
      'tr': 'https://www.swaphubs.com/terzi',
      'en': 'https://www.swaphubs.com/terzi?lang=en',
      'ru': 'https://www.swaphubs.com/terzi?lang=ru',
      'de': 'https://www.swaphubs.com/terzi?lang=de',
      'x-default': 'https://www.swaphubs.com/terzi',
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    title: 'Terzi Can Antalya · Paça Kısaltma · Elbise Dikimi · Üniforma',
    description:
      "Konyaaltı & tüm Antalya'da profesyonel terzi. Paça kısaltma ₺150, fermuar ₺120, eve-otele servis. 24–48h ekspres. TR·EN·RU·DE ☎ " + PHONE,
    url: 'https://www.swaphubs.com/terzi',
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'de_DE', 'ru_RU'],
    type: 'website',
    images: [
      {
        url: '/og/terzi-can.jpg',
        width: 1200,
        height: 630,
        alt: 'Terzi Can Antalya — Konyaaltı Profesyonel Terzi, Paça Kısaltma, Elbise Dikimi',
        type: 'image/jpeg',
      },
    ],
  },

  // ── Twitter Card ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    creator: '@swaphubs',
    title: 'Terzi Can Antalya · Paça Kısaltma · Elbise Dikimi · Üniforma',
    description:
      "Konyaaltı & tüm Antalya ilçeleri. Paça ₺150, fermuar ₺120, eve-otele servis. TR·EN·RU·DE ☎ " + PHONE,
    images: ['/og/terzi-can.jpg'],
  },

  // ── Geo + ekstra meta ─────────────────────────────────────────────────────
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056',
    'ICBM': '36.8841, 30.7056',
    'content-language': 'tr, en, ru, de',
    'contact': PHONE,
    // Google Business Profile ile eşleşme için
    'business:contact_data:phone_number': PHONE,
    'business:contact_data:locality': 'Konyaaltı',
    'business:contact_data:region': 'Antalya',
    'business:contact_data:country_name': 'Turkey',
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
// Google'ın ClothingStore + FAQPage + LocalBusiness kombinasyonu.
// Tüm Offer'larda top-level `name` zorunlu — eksik olunca "Adsız öğe" hatası.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // 1. WebSite
    {
      '@type': 'WebSite',
      '@id': 'https://www.swaphubs.com#website',
      name: 'SwapHubs',
      url: 'https://www.swaphubs.com',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://www.swaphubs.com#organization',
        name: 'SwapHubs',
        url: 'https://www.swaphubs.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.swaphubs.com/logo.png',
          width: 512,
          height: 512,
        },
      },
    },

    // 2. ClothingStore (LocalBusiness)
    {
      '@type': 'ClothingStore',
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        'Tailor Can Antalya',
        'Портной Кан Анталья',
        'Schneider Can Antalya',
        'Konyaaltı Terzi Can',
        'Antalya Terzi Can',
      ],
      description:
        "Antalya Konyaaltı'nda profesyonel terzi. Paça kısaltma ₺150, fermuar değişimi ₺120, elbise dikimi, kıyafet tadilatı, üniforma üretimi, kuru temizleme. Eve ve otele gelen araçlı terzi servisi. TR·EN·RU·DE.",
      url: SITE_URL,
      telephone: '+905318986418',
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [
        'https://www.swaphubs.com/og/terzi-can.jpg',
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
      ],
      logo: 'https://www.swaphubs.com/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 36.8841,
        longitude: 30.7056,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Murat B.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim, nakış kalitesi harika!',
          datePublished: '2025-01-15',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Sarah M.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional.',
          datePublished: '2025-05-10',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Наталья К.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель в Белеке!',
          datePublished: '2025-06-20',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'David K.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Wir bestellten bestickte Sweatshirts für unser Team — 30 Stück, pünktlich geliefert. Ausgezeichnete Qualität!',
          datePublished: '2025-02-08',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Elif Y.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Gelinliğimi mükemmel şekilde teslim ettiler. Paça kısaltmayı aynı gün yaptılar. Hızlı ve kaliteli hizmet!',
          datePublished: '2025-04-10',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'City', name: 'Konyaaltı' },
        { '@type': 'City', name: 'Muratpaşa' },
        { '@type': 'City', name: 'Kepez' },
        { '@type': 'City', name: 'Lara' },
        { '@type': 'City', name: 'Belek' },
        { '@type': 'City', name: 'Kemer' },
        { '@type': 'City', name: 'Alanya' },
        { '@type': 'City', name: 'Manavgat' },
        { '@type': 'City', name: 'Side' },
        { '@type': 'City', name: 'Kaş' },
        { '@type': 'City', name: 'Finike' },
      ],

      // ── hasOfferCatalog: her Offer'da name ZORUNLU ──────────────────────
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can Antalya — Hizmet Fiyat Listesi 2025–2026',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Paça Kısaltma — Pantolon ve Kot',
            description: "Pantolon ve kot paça kısaltma. ₺150'den başlar. 24 saat teslim.",
            price: '150',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            itemOffered: { '@type': 'Service', name: 'Paça Kısaltma', serviceType: 'Clothing Alteration' },
          },
          {
            '@type': 'Offer',
            name: 'Fermuar Değişimi — Pantolon Ceket Mont',
            description: "Pantolon/kot fermuarı ₺120, ceket ₺200, mont ₺300'den başlar. Aynı gün teslim.",
            price: '120',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            itemOffered: { '@type': 'Service', name: 'Fermuar Değişimi', serviceType: 'Clothing Repair' },
          },
          {
            '@type': 'Offer',
            name: 'Elbise Dikimi ve Daraltma — Özel Dikim',
            description: "Her tür kıyafette elbise dikimi ve beden küçültme. ₺200'den başlar.",
            price: '200',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            itemOffered: { '@type': 'Service', name: 'Elbise Dikimi', serviceType: 'Custom Tailoring' },
          },
          {
            '@type': 'Offer',
            name: 'Üniforma Üretimi — Otel Restoran Sağlık Okul',
            description: 'Otel, restoran, sağlık, okul ve spor üniforması. Tasarım + kalıp + seri imalat + nakış.',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            itemOffered: { '@type': 'Service', name: 'Üniforma Üretimi', serviceType: 'Uniform Manufacturing' },
          },
          {
            '@type': 'Offer',
            name: 'Kuru Temizleme ve Çamaşır — Otel Alım Teslimat',
            description: "Kuru temizleme, çamaşır ve ütü. Otel alım-teslimat dahil. ₺300'den başlar.",
            price: '300',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            itemOffered: { '@type': 'Service', name: 'Kuru Temizleme', serviceType: 'Dry Cleaning' },
          },
          {
            '@type': 'Offer',
            name: 'Gelinlik Tadilatı ve Abiye Tamiri',
            description: "Gelinlik tadilatı, abiye tamiri ve kısaltma. ₺350'den başlar. Ekspres randevu.",
            price: '350',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            itemOffered: { '@type': 'Service', name: 'Gelinlik ve Abiye Tadilatı', serviceType: 'Bridal Alteration' },
          },
          {
            '@type': 'Offer',
            name: 'Nakış ve Logo Baskı — Sweatshirt Eşofman',
            description: "Logo nakışı, dijital baskı, sweatshirt dikimi. ₺100'den başlar.",
            price: '100',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            itemOffered: { '@type': 'Service', name: 'Nakış ve Logo Baskı', serviceType: 'Embroidery Service' },
          },
          {
            '@type': 'Offer',
            name: 'Eve ve Otele Gelen Araçlı Terzi Servisi',
            description: 'Tüm Antalya ilçelerine araçlı terzi servisi — adrese alım, ölçü, teslim.',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            itemOffered: { '@type': 'Service', name: 'Mobil Terzi Servisi', serviceType: 'Mobile Tailor' },
          },
        ],
      },

      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+905318986418',
          contactType: 'customer service',
          areaServed: 'TR',
          availableLanguage: ['Turkish','English','Russian','German'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
        },
      ],
      sameAs: [
        'https://wa.me/905318986418',
        'https://www.swaphubs.com/terzi',
        'https://www.swaphubs.com/online-terzi-hizmeti',
      ],
    },

    // 3. WebPage
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Antalya Terzi · Paça Kısaltma · Elbise Dikimi · Üniforma | Terzi Can Konyaaltı',
      url: SITE_URL,
      isPartOf: { '@id': 'https://www.swaphubs.com#website' },
      about: { '@id': `${SITE_URL}#business` },
      description:
        "Antalya Konyaaltı'nda Terzi Can. Paça kısaltma, elbise dikimi, fermuar değişimi, kıyafet tadilatı, üniforma üretimi, kuru temizleme. Eve-otele gelen terzi servisi. 24–48 saat ekspres.",
      inLanguage: ['tr', 'en', 'ru', 'de'],
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.swaphubs.com/og/terzi-can.jpg',
        width: 1200,
        height: 630,
      },
    },

    // 4. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: 'https://www.swaphubs.com' },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi', item: SITE_URL },
      ],
    },

    // 5. FAQPage — Google'ın arama sonuçlarında SSS snippet'i göstermesi için
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya paça kısaltma fiyatı ne kadar? 2025–2026',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Antalya'da paça kısaltma fiyatımız ₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175 civarı. Kesin fiyat için WhatsApp +90 531 898 64 18 numarasına fotoğraf gönderin, 30 dakika içinde yanıt verilir.",
          },
        },
        {
          '@type': 'Question',
          name: 'Fermuar değişimi kaç lira? Mont, kot, ceket fermuarı Antalya fiyatı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Pantolon ve kot fermuarı ₺120'den, ceket fermuarı ₺200'den, mont fermuarı ₺300'den başlar. Aynı gün teslim mümkündür. WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Eve veya otele gelen terzi Antalya var mı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet! Araçlı terzi servisimizle Konyaaltı, Lara, Belek, Kemer, Alanya dahil tüm Antalya ilçelerine geliyoruz. WhatsApp'tan konum paylaşın, terzi adresinize gelsin. +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Elbise dikimi ve tadilatı Antalya fiyatları 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Elbise dikimi ₺600'den, elbise daraltma ve tadilat ₺200'den başlar. Abiye tamiri ₺350'den, gelinlik tadilatı ₺500'den başlar. Kesin fiyat için WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Otel ve restoran üniforma üretimi Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet. Otel personel, resepsiyon, aşçı, garson, spa üniforma üretiyoruz. Tasarım + kalıp + seri imalat + nakış tek elden. WhatsApp +90 531 898 64 18.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kuru temizleme Antalya — otel alım teslimat var mı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, tüm Antalya otellerinden kuru temizleme alım ve teslimat yapıyoruz. 24–48 saat ekspres servis. WhatsApp +90 531 898 64 18.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there an English-speaking tailor in Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Tailor Can offers English-speaking tailoring services across all Antalya districts. Alterations, dress sewing, dry cleaning, uniform production. Mobile tailor service available. WhatsApp: +90 531 898 64 18.',
          },
        },
        {
          '@type': 'Question',
          name: 'Есть ли русскоязычный портной в Анталье?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да! Портной Кан обслуживает по-русски. Подгонка брюк, химчистка, пошив на заказ, гостиничная форма. Выездной сервис по всей Анталье. WhatsApp: +90 531 898 64 18.',
          },
        },
      ],
    },
  ],
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────
export default function TerziPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TerziClient />
    </>
  );
}
    description: `Konyaaltı ve tüm Antalya ilçelerinde Terzi Can. TR · EN · DE · RU ☎ ${PHONE}`,
    images: ['/og/terzi-can.jpg'],
  },

  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Antalya',
    'geo.position': '36.8841;30.7056',
    'ICBM': '36.8841, 30.7056',
    'content-language': 'tr, en, de, ru',
    'contact': PHONE,
  },
};

// ─── PAGE COMPONENT ──────────────────────────────────────────────────────────
export default function TerziPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TerziClient />
    </>
  );
}
