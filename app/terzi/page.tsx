import type { Metadata } from 'next';
import Script from 'next/script';
import TerziClient from './TerziClient';

// ─────────────────────────────────────────────────────────────────────────────
// DÜZELTME: "Kıяafetleri" → "Kıyafetleri" (Kiril 'я' harfi kaldırıldı)
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = 'https://swaphubs.com/terzi';
const PHONE   = '+90 531 898 64 18';
const PHONE_RAW = '+905318986418';

// ── JSON-LD: LocalBusiness + Service schema ───────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: ['Tailor Can', 'Портной Кан', 'Schneider Can'],
      description:
        'Antalya ve Konyaaltı\'nda profesyonel terzi hizmetleri: ütü, dikim, tamir, tadilat, paça kısaltma, kuru temizleme, seri imalat.',
      url: SITE_URL,
      telephone: PHONE,
      priceRange: '₺₺',
      image: 'https://swaphubs.com/og/terzi-can.jpg',
      logo: 'https://swaphubs.com/logo.png',
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
        longitude: 30.6559,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '08:00',
          closes: '20:00',
        },
      ],
      areaServed: [
        'Antalya', 'Konyaaltı', 'Lara', 'Muratpaşa', 'Kepez', 'Döşemealtı',
        'Aksu', 'Serik', 'Belek', 'Kemer', 'Alanya', 'Manavgat', 'Side',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can Hizmetleri',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paça Kısaltma' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elbise Tadilat' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fermuar Değişimi' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Özel Dikim' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kuru Temizleme' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Üniforma Üretimi' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Seri İmalat' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gelinlik Tadilat' } },
        ],
      },
      sameAs: [
        'https://swaphubs.com/terzi',
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: 'Terzi Can Antalya | Konyaaltı Terzi | Ütü · Dikim · Tamir · Tadilat',
      isPartOf: { '@id': 'https://swaphubs.com#website' },
      about: { '@id': `${SITE_URL}#business` },
      description:
        'Antalya Konyaaltı\'nda profesyonel terzi Can. Paça kısaltma, elbise tadilat, özel dikim, kuru temizleme, üniforma üretimi. 24-48 saat ekspres teslimat.',
      inLanguage: ['tr', 'en', 'de', 'ru'],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero-description'],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Paça kısaltma kaç lira?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Paça kısaltma fiyatı kumaş türüne ve işlem detayına göre değişmektedir. Güncel fiyat için +90 531 898 64 18 numaralı hattı arayabilirsiniz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Evden kıyafet alıp getiriyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, Antalya genelinde adres ve otellerden kurye ile kıyafet alım servisi sunuyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kuru temizleme hizmeti veriyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, kuru temizleme, çamaşır yıkama ve ütü hizmetleri de sunmaktayız.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you speak English?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Tailor Can provides services in Turkish, English, German and Russian.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://swaphubs.com' },
        { '@type': 'ListItem', position: 2, name: 'Terzi Can', item: SITE_URL },
      ],
    },
  ],
};

// ── SEO keyword grupları (makul boyutta tutuldu) ──────────────────────────────
// Google'ın keyword stuffing cezasından kaçınmak için keywords meta sadece
// birincil ve ikincil anahtar kelimeleri içermeli; uzun kuyruk varyasyonları
// sayfa içeriğine (H2/H3, paragraf, alt metin) yerleştirilmeli.

const PRIMARY_KEYWORDS = [
  // TR — Genel
  'Antalya Terzi', 'Terzi Antalya', 'Konyaaltı Terzi', 'En İyi Terzi Antalya',
  'Terzi Can Antalya', 'Eve Gelen Terzi Antalya', 'Mobil Terzi Antalya',

  // TR — Hizmetler
  'Paça Kısaltma Antalya', 'Elbise Tadilat Antalya', 'Kıyafet Tamiri Antalya',
  'Fermuar Değişimi Antalya', 'Özel Dikim Antalya', 'Ölçüye Dikim Antalya',
  'Elbise Daraltma Antalya', 'Pantolon Kısaltma Antalya', 'Bel Alma Antalya',
  'Kol Kısaltma Antalya', 'Etek Kısaltma Antalya', 'Gelinlik Tadilat Antalya',
  'Abiye Dikimi Antalya', 'Üniforma Dikimi Antalya', 'Fason İmalat Antalya',
  'Seri İmalat Antalya', 'Kuru Temizleme Antalya', 'Çamaşır Yıkama Antalya',
  'Ütü Hizmeti Antalya', 'Nakış Antalya', 'Sweatshirt Dikimi Antalya',

  // TR — İlçeler
  'Lara Terzi', 'Konyaaltı Terzi', 'Belek Terzi', 'Kemer Terzi',
  'Alanya Terzi', 'Muratpaşa Terzi', 'Kepez Terzi', 'Serik Terzi',

  // TR — Fiyat sorguları
  'Paça Kısaltma Kaç Lira', 'Paça Kısaltma Fiyatı 2026', 'Terzi Fiyatları 2026',
  'Fermuar Değişimi Kaç Para', 'Elbise Daraltma Fiyatı', 'Tadilat Fiyatı Antalya',

  // TR — Otel/Turizm
  'Otel Üniforma Antalya', 'Otele Gelen Terzi Antalya', 'Aşçı Üniforma Antalya',
  'Garson Üniforma Antalya', 'Restoran Üniforma', 'Otel Kuru Temizleme Antalya',

  // EN
  'Tailor Antalya', 'Best Tailor Antalya', 'Clothing Alterations Antalya',
  'Trouser Hemming Antalya', 'Dress Repair Antalya', 'Zip Replacement Antalya',
  'Custom Tailoring Antalya', 'Wedding Dress Alterations Antalya',
  'Dry Cleaning Antalya', 'Mobile Tailor Antalya', 'Hotel Tailor Antalya',
  'English Speaking Tailor Antalya', 'Same Day Tailor Antalya',
  'Uniform Production Antalya', 'Tailor Lara', 'Tailor Belek', 'Tailor Kemer',

  // DE
  'Schneider Antalya', 'Kleider Ändern Antalya', 'Hose Kürzen Antalya',
  'Maßanfertigung Antalya', 'Chemische Reinigung Antalya', 'Uniformproduktion Antalya',
  'Brautkleid Anpassung Antalya', 'Schneider Konyaaltı', 'Schneider Lara',

  // RU
  'Портной Анталья', 'Ателье Анталья', 'Ремонт Одежды Анталья',
  'Подгонка Одежды Анталья', 'Химчистка Анталья', 'Пошив На Заказ Анталья',
  'Выездной Портной Анталья', 'Портной Лара', 'Портной Белек',
  'Свадебное Платье Анталья', 'Пошив Формы Анталья', 'Гостиничная Форма Анталья',
].join(', ');

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // DÜZELTME: metadataBase eklendi — OG/Twitter image URL'leri için zorunlu
  metadataBase: new URL('https://swaphubs.com'),

  title: {
    default: 'Terzi Can Antalya | Konyaaltı Terzi | Ütü · Dikim · Tamir · Tadilat',
    template: '%s | Terzi Can Antalya',
  },

  description:
    'Konyaaltı ve tüm Antalya ilçelerinde Terzi Can hizmetinizde. ' +
    'Paça kısaltma, elbise tadilat, fermuar değişimi, özel dikim, kuru temizleme, ' +
    'çamaşır yıkama, üniforma & fason imalat. 24-48 saat ekspres. ' +
    'Tailor Can · Schneider Can · Портной Кан — TR · EN · DE · RU. ☎ ' + PHONE,

  keywords: PRIMARY_KEYWORDS,

  // DÜZELTME: authors & creator eklendi
  authors: [{ name: 'SwapHubs', url: 'https://swaphubs.com' }],
  creator: 'SwapHubs',
  publisher: 'SwapHubs',

  // DÜZELTME: category eklendi
  category: 'Tailor & Clothing Services',

  // ── Open Graph ──────────────────────────────────────────────────────────────
  openGraph: {
    title: 'Terzi Can | Tailor Can | Портной Кан | Schneider Can — Antalya & Konyaaltı',
    description:
      'Konyaaltı, Lara, Belek, Kemer, Alanya ve tüm Antalya\'da Terzi Can. ' +
      'Paça kısaltma, tadilat, kuru temizleme, fason imalat, üniforma. ' +
      'Tailor Can · Schneider Can · Портной Кан. ☎ ' + PHONE,
    url: SITE_URL,
    siteName: 'SwapHubs — Terzi Can',
    locale: 'tr_TR',
    // DÜZELTME: alternateLocale eklendi — çok dilli içerik için
    alternateLocale: ['en_US', 'de_DE', 'ru_RU'],
    type: 'website',
    // DÜZELTME: OG image eklendi (metadataBase ile birlikte çalışır)
    images: [
      {
        url: '/og/terzi-can.jpg',
        width: 1200,
        height: 630,
        alt: 'Terzi Can Antalya — Profesyonel Terzi Hizmetleri',
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Terzi Can | Konyaaltı · Tüm İlçeler · Ütü · Dikim · Tamir',
    description:
      'Konyaaltı ve tüm Antalya ilçelerinde Terzi Can. TR · EN · DE · RU ☎ ' + PHONE,
    // DÜZELTME: Twitter image eklendi
    images: ['/og/terzi-can.jpg'],
  },

  // ── Canonical & hreflang ────────────────────────────────────────────────────
  // NOT: Terzi Can tek URL'de 4 dili sunuyor (dil otomatiği client-side).
  // Gerçek ayrı dil sayfaları oluşturulursa bu bölüm güncellenmeli.
  alternates: {
    canonical: SITE_URL,
  },

  // ── Robots ──────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // DÜZELTME: verification alanı — Google Search Console ve Bing için hazır
  // verification: {
  //   google: 'BURAYA_GOOGLE_VERIFICATION_KODU',
  //   yandex: 'BURAYA_YANDEX_KODU',
  //   other: { 'msvalidate.01': 'BURAYA_BING_KODU' },
  // },

  // DÜZELTME: icons eklendi
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

// ── Sayfa bileşeni ───────────────────────────────────────────────────────────
export default function TerziPage() {
  return (
    <>
      {/*
        DÜZELTME: JSON-LD structured data eklendi.
        Schema.org LocalBusiness + FAQPage + BreadcrumbList.
        Google rich result'lar (yıldız, SSS) için kritik öneme sahip.
      */}
      <Script
        id="terzi-can-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TerziClient />
    </>
  );
}
