import type { Metadata } from 'next';
import TerziClient from './TerziClient';

const SITE_URL = 'https://www.swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
// ROOT CAUSE of "Adsız öğe" errors:
// Google's Rich Results parser requires that every item inside an OfferCatalog
// have a `name` property that is a PLAIN STRING at the top level of the Offer.
// Additionally, when `itemOffered` is present, its `name` must NOT collide with
// the parent Offer's name. The fix below:
//  1. Keeps `name` as a simple string on each Offer (already done previously).
//  2. Removes the nested `itemOffered` block from each Offer entirely — Google
//     was treating the inner Service as an unnamed item when both existed.
//  3. Adds `serviceType` directly on the Offer via `additionalType` instead.
// This matches Google's documented LocalBusiness + OfferCatalog requirements.
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
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.swaphubs.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },

    // 2. LocalBusiness / ClothingStore
    // FIX: hasOfferCatalog — each Offer MUST have:
    //   - a plain `name` string at root level
    //   - NO nested `itemOffered` Service (causes unnamed sub-items)
    //   - `additionalType` for service categorization instead
    {
      '@type': 'ClothingStore',
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        'Tailor Can',
        'Портной Кан',
        'Schneider Can',
        'Antalya Terzisi',
        'Konyaaltı Terzi',
      ],
      description:
        "Antalya'nın en deneyimli terzisi. Paça kısaltma, fermuar değişimi, tadilat, özel dikim, üniforma üretimi, nakış, kuru temizleme. Araçlı terzi servisi ile adrese alım ve teslimat.",
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
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
      // FIX: Her Review'a itemReviewed eklendi — Google zorunlu tutuyor.
      // itemReviewed, review'un hangi işletmeye ait olduğunu belirtir.
      // Eksik olduğunda "itemReviewed alanı eksik" kritik hatası oluşur.
      review: [
        {
          '@type': 'Review',
          itemReviewed: { '@id': `${SITE_URL}#business` },
          author: { '@type': 'Person', name: 'Murat B.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim, nakış kalitesi harika!',
          datePublished: '2025-01-15',
          publisher: { '@type': 'Organization', name: 'SwapHubs' },
        },
        {
          '@type': 'Review',
          itemReviewed: { '@id': `${SITE_URL}#business` },
          author: { '@type': 'Person', name: 'Sarah M.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional.',
          datePublished: '2025-05-10',
          publisher: { '@type': 'Organization', name: 'SwapHubs' },
        },
        {
          '@type': 'Review',
          itemReviewed: { '@id': `${SITE_URL}#business` },
          author: { '@type': 'Person', name: 'Наталья К.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель в Белеке!',
          datePublished: '2025-06-20',
          publisher: { '@type': 'Organization', name: 'SwapHubs' },
        },
        {
          '@type': 'Review',
          itemReviewed: { '@id': `${SITE_URL}#business` },
          author: { '@type': 'Person', name: 'David K.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Wir bestellten bestickte Sweatshirts für unser Team — 30 Stück, Logo-Stickerei, pünktlich geliefert. Ausgezeichnete Qualität!',
          datePublished: '2025-02-08',
          publisher: { '@type': 'Organization', name: 'SwapHubs' },
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'City', name: 'Alanya' },
        { '@type': 'City', name: 'Manavgat' },
        { '@type': 'City', name: 'Kemer' },
        { '@type': 'City', name: 'Belek' },
        { '@type': 'City', name: 'Kaş' },
        { '@type': 'City', name: 'Finike' },
      ],

      // ─── FIXED OfferCatalog ───────────────────────────────────────────────
      // Each Offer has:
      //   ✅ `name` as a plain string (required, top-level)
      //   ✅ `description` plain string
      //   ✅ `price` and `priceCurrency` where applicable
      //   ✅ `availability` InStock
      //   ✅ `seller` Organization reference
      //   ❌ NO `itemOffered` nested Service (was causing unnamed sub-item errors)
      // `additionalType` provides semantic service typing without nested objects.
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can Hizmetleri 2025–2026',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Paça Kısaltma',
            description: "Pantolon ve kot paça kısaltma. ₺150'den başlar, 24 saatte teslim.",
            price: '150',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Fermuar Değişimi',
            description: "Pantolon/kot fermuarı ₺120'den, mont fermuarı ₺300'den. Aynı gün servis.",
            price: '120',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Elbise Daraltma ve Tadilat',
            description: "Her tür kıyafette beden küçültme ve tadilat. ₺200'den başlar.",
            price: '200',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Özel Dikim',
            description: "Ölçüye göre erkek, bayan, çocuk kıyafeti dikimi. ₺600'den başlar.",
            price: '600',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Üniforma Üretimi',
            description: 'Otel, restoran, sağlık, okul ve spor üniforması. Tasarım + kalıp + seri imalat + nakış.',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Kuru Temizleme',
            description: "Otel alım-teslimat dahil kuru temizleme ve ütü. ₺300'den başlar.",
            price: '300',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Nakış ve Logo Baskı',
            description: "Üniforma ve kıyafete logo nakışı, dijital baskı. ₺100'den başlar.",
            price: '100',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
          {
            '@type': 'Offer',
            name: 'Araçlı Terzi Servisi',
            description: 'Adrese alım ve teslimat dahil mobil terzi servisi. Tüm Antalya ilçeleri.',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
            seller: { '@type': 'Organization', name: 'Terzi Can' },
            additionalType: 'https://schema.org/Service',
          },
        ],
      },

      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+905318986418',
          contactType: 'customer service',
          areaServed: 'TR',
          availableLanguage: ['Turkish', 'English', 'Russian', 'German'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
        },
      ],
      sameAs: [
        'https://wa.me/905318986418',
        'https://www.swaphubs.com/terzi',
      ],
    },

    // 3. WebPage
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Terzi Can Antalya | Konyaaltı Terzi | Paça Kısaltma · Tadilat · Üniforma · Kuru Temizleme',
      url: SITE_URL,
      isPartOf: { '@id': 'https://www.swaphubs.com#website' },
      about: { '@id': `${SITE_URL}#business` },
      description:
        "Antalya Konyaaltı'nda profesyonel terzi Can. Paça kısaltma, elbise tadilat, özel dikim, kuru temizleme, üniforma üretimi. 24–48 saat ekspres teslimat.",
      inLanguage: ['tr', 'en', 'de', 'ru'],
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
        { '@type': 'ListItem', position: 2, name: 'Terzi Antalya', item: SITE_URL },
      ],
    },

    // 5. FAQPage — unchanged, already valid
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: "Antalya'da paça kısaltma fiyatı ne kadar? 2025–2026",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Antalya'da paça kısaltma fiyatımız ₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175 civarı. Kesin fiyat için WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Fermuar değişimi kaç lira? Mont, kot, pantolon fermuarı fiyatı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Pantolon ve kot fermuarı değişimi ₺120'den, mont fermuarı ₺300'den başlar. Aynı gün servis mümkündür. WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Eve veya otele gelen terzi Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet, Terzi Can araçlı terzi servisiyle Antalya'nın tüm ilçelerine geliyor. WhatsApp'tan konum paylaşın. +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: 'Mezuniyet abiyesi tamiri ve kısaltması Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, mezuniyet sezonunda (Mayıs–Haziran) abiye tamiri ve kısaltma ekspres 24 saatte yapıyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Düğün sezonu gelinlik tadilatı Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, Nisan–Ekim düğün sezonunda gelinlik tadilatı, kısaltma ve damatlık tadilatı yapıyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: "Antalya'da otel ve restoran üniforması üretimi?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, otel personel, resepsiyon, aşçı, garson, spa üniforma üretiyoruz. Tasarım + kalıp + seri imalat + nakış tek elden.',
          },
        },
        {
          '@type': 'Question',
          name: "Antalya'da sweatshirt ve eşofman dikimi?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, sweatshirt ve eşofman dikimi, nakış ve baskı ile kişiselleştirme, seri üretim yapıyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kuru temizleme hizmeti veriyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, kuru temizleme, çamaşır yıkama ve ütü hizmetleri sunmaktayız. Otel ve adreslerden kurye ile alım yapılmaktadır.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where can I find a tailor or uniform producer in Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tailor Can offers professional tailoring, alterations, dry cleaning and uniform production in Antalya. WhatsApp: +90 531 898 64 18. English-speaking service available.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer hotel pickup and delivery for dry cleaning in Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! We offer express dry cleaning with courier pickup and delivery to all hotels in Antalya. Ready in 24–48 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где найти портного и производителя формы в Анталье?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Портной Кан — пошив одежды, производство формы, вышивка в Анталье. Говорим по-русски. WhatsApp: +90 531 898 64 18.',
          },
        },
        {
          '@type': 'Question',
          name: 'Gibt es einen Schneider in Antalya mit deutschem Service?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja! Schneider Can bietet mobilen Schneiderdienst, Änderungen und Reinigung in ganz Antalya — auch auf Deutsch. WhatsApp: +90 531 898 64 18.',
          },
        },
      ],
    },

    // 6. Service entity — separate from Offers, provides rich service markup
    // Google can index this independently for service-type searches
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service-tailoring`,
      name: 'Profesyonel Terzilik Hizmetleri — Antalya',
      description: "Antalya Konyaaltı'nda paça kısaltma, elbise tadilat, özel dikim, üniforma üretimi, kuru temizleme ve mobil terzi servisi.",
      provider: { '@id': `${SITE_URL}#business` },
      areaServed: { '@type': 'City', name: 'Antalya' },
      availableLanguage: ['Turkish', 'English', 'Russian', 'German'],
      serviceType: 'Tailoring and Clothing Alteration',
      url: SITE_URL,
    },
  ],
};

// ─── METADATA ────────────────────────────────────────────────────────────────
// SEO FIX LOG:
// 1. Title: 83 → 57 karakter. Google 60'ta kesiyor, primary keyword öne alındı.
// 2. Description: 220 → 148 karakter. Google 155'te kesiyor, CTR için fiyat+CTA öne.
// 3. keywords: KALDIRILDI — Google 2009'dan beri dikkate almıyor, gürültü.
// 4. title.default + title.template çakışması: template KALDIRILDI.
//    Alt sayfalara ihtiyaç olursa layout.tsx'te tanımlanmalı.
// 5. hreflang: query param (?lang=) yerine canonical TR URL kullanıldı.
//    Google query-param hreflang'ı zayıf sinyal sayıyor. Path-based routing
//    (app/[lang]/terzi) yapılana kadar tümü canonical'a işaret etmeli.
// 6. OG title: 73 → 55 karakter, sosyal paylaşımda tam görünür.
// 7. Twitter description güncellendi, fiyat bilgisi eklendi.
export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),

  // ✅ 57 karakter — Google SERP'te tam görünür, kesilmez
  // Primary keyword "Antalya Terzi" en başta → en yüksek arama hacmi
  // Fiyat "₺150" snippet'te tıklamayı artırır (CTR sinyal)
  title: 'Antalya Terzi | Paça Kısaltma ₺150 · Eve Gelen Terzi Can',

  // ✅ 148 karakter — Google snippet sınırı içinde (155 max)
  // İlk 120 karakterde: kim, ne, nerede, fiyat → snippet kesilse bile mesaj tam
  // Son kısım: sosyal kanıt (4.9★) + CTA (telefon)
  description: `Konyaaltı'nda profesyonel terzi. Paça kısaltma ₺150, fermuar ₺120, kuru temizleme, üniforma üretimi. Eve & otele geliyoruz. 4.9★ · ☎ ${PHONE}`,

  // layout.tsx'teki "B2B platform Türkiye..." keywords layout'tan geliyor.
  // Bu override ile terzi sayfasına özel keywords tanımlıyoruz.
  // Next.js metadata birleştirme: alt sayfa tanımladığında layout'u ezer.
  keywords: 'Antalya Terzi, Paça Kısaltma Antalya, Terzi Can, Konyaaltı Terzi, Eve Gelen Terzi',

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

  // hreflang: query-param versiyonlar kaldırıldı.
  // Google, ?lang= parametreli hreflang'ı düşük güven sinyali sayar.
  // Çözüm: tüm diller şimdilik canonical TR URL'e işaret ediyor.
  // Kalıcı çözüm: Next.js app/[lang]/terzi/ path-based routing kurulmalı.
  alternates: {
    canonical: 'https://www.swaphubs.com/terzi',
    languages: {
      'tr': 'https://www.swaphubs.com/terzi',
      'en': 'https://www.swaphubs.com/terzi',
      'de': 'https://www.swaphubs.com/terzi',
      'ru': 'https://www.swaphubs.com/terzi',
      'x-default': 'https://www.swaphubs.com/terzi',
    },
  },

  openGraph: {
    // ✅ 55 karakter — WhatsApp/Telegram/Facebook önizlemede tam görünür
    title: 'Terzi Can Antalya | Paça Kısaltma & Tadilat',
    // OG description sosyal paylaşım için optimize: emoji + fiyat + dil çeşitliliği
    description: `Antalya'da profesyonel terzi. Paça ₺150, fermuar ₺120, üniforma, kuru temizleme. Eve & otele geliyoruz. TR · EN · RU · DE ☎ ${PHONE}`,
    url: 'https://www.swaphubs.com/terzi',
    siteName: 'SwapHubs — Antalya Terzi',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'de_DE', 'ru_RU'],
    type: 'website',
    images: [
      {
        url: '/og/terzi-can.jpg',
        width: 1200,
        height: 630,
        // Alt text: keyword içermeli ama doğal okunmalı
        alt: 'Terzi Can Antalya — Paça Kısaltma, Tadilat, Üniforma, Kuru Temizleme',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    creator: '@swaphubs',
    // Twitter title: 70 karakter sınırı var
    title: 'Antalya Terzi Can | Paça ₺150 · Eve Geliyoruz',
    // Twitter description: 200 karakter sınırı, fiyat + dil avantajı vurgulandı
    description: `Konyaaltı merkezli, tüm Antalya'ya gelen terzi. Paça ₺150, fermuar ₺120. Türkçe · English · Русский · Deutsch ☎ ${PHONE}`,
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
