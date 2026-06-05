import type { Metadata } from 'next';
import Script from 'next/script';
import TerziClient from './TerziClient';

const SITE_URL = 'https://swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';

// ═══════════════════════════════════════════════════════════════
// TEK VE EKSIKSIZ JSON-LD — TerziClient.tsx'tekini KALDIRIN
// Google'ın "FAQPage yineleniyor" ve "Adsız öğe" hatalarını düzeltir
// ═══════════════════════════════════════════════════════════════
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── 1) LocalBusiness ──────────────────────────────────────
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        'Tailor Can', 'Портной Кан', 'Schneider Can',
        'Antalya Terzisi', 'Antalya Erkek Terzi', 'Antalya Bayan Terzi',
        'Antalya Üniforma Üretimi',
      ],
      description:
        "Antalya'nın en deneyimli terzisi. Paça kısaltma, fermuar değişimi, tadilat, tamir, daraltma, özel dikim, üniforma, nakış, fason imalat, kuru temizleme. Araçlı terzi servisi — adrese teslim.",
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
      areaServed: [
        'Antalya','Konyaaltı','Lara','Muratpaşa','Kepez','Döşemealtı',
        'Aksu','Serik','Belek','Kemer','Alanya','Manavgat','Side',
        'Kaş','Finike','Kumluca','Elmalı','Korkuteli',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can Hizmetleri',
        itemListElement: [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Paça Kısaltma', description: 'Pantolon, kot, kumaş — tüm kıyafetlerde paça kısaltma' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Fermuar Değişimi', description: 'Pantolon, ceket, mont, elbise, sweatshirt fermuarı' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Elbise Daraltma & Tadilat', description: 'Her tür kıyafette beden küçültme ve tadilat' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Özel Dikim', description: 'Ölçüye göre erkek, bayan, çocuk kıyafeti dikimi' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Üniforma Üretimi', description: 'Otel, restoran, sağlık, okul ve spor üniforması üretimi' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Kuru Temizleme', description: 'Otel alım-teslimat dahil kuru temizleme ve çamaşır yıkama' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Nakış & Logo Baskı', description: 'Üniforma ve kıyafete logo nakışı, dijital baskı' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Araçlı Terzi Servisi', description: 'Adrese alım ve teslimat dahil mobil terzi servisi' } },
        ],
      },
      sameAs: [SITE_URL],
    },

    // ── 2) WebPage ────────────────────────────────────────────
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Terzi Can Antalya | Konyaaltı Terzi | Ütü · Dikim · Tamir · Tadilat',
      url: SITE_URL,
      isPartOf: { '@id': 'https://swaphubs.com#website' },
      about: { '@id': `${SITE_URL}#business` },
      description:
        "Antalya Konyaaltı'nda profesyonel terzi Can. Paça kısaltma, elbise tadilat, özel dikim, kuru temizleme, üniforma üretimi. 24–48 saat ekspres teslimat.",
      inLanguage: ['tr', 'en', 'de', 'ru'],
    },

    // ── 3) BreadcrumbList ─────────────────────────────────────
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: 'https://swaphubs.com' },
        { '@type': 'ListItem', position: 2, name: 'Terzi Antalya', item: SITE_URL },
      ],
    },

    // ── 4) FAQPage — TEK ÖRNEK, birleştirilmiş tüm sorular ───
    // UYARI: TerziClient.tsx'teki script etiketini kaldırın!
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      name: 'Terzi Can — Sık Sorulan Sorular',
      mainEntity: [
        // TR — Fiyat soruları (Google'da para birimi snippet için kritik)
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
          name: "Fermuar değişimi kaç lira? Mont, kot, pantolon fermuarı fiyatı?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Pantolon ve kot fermuarı değişimi ₺120'den, mont fermuarı ₺300'den başlar. Aynı gün servis mümkündür. WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: "Yakınımda terzi var mı? Eve veya otele gelen terzi Antalya?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet, Terzi Can araçlı terzi servisiyle Antalya'nın tüm ilçelerine geliyor. Eve gelen terzi, otele gelen terzi hizmeti sunuyoruz. WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: "Mezuniyet abiyesi tamiri ve kısaltması Antalya?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet, mezuniyet sezonunda (Mayıs–Haziran) abiye tamiri, kısaltma ve tadilatı ekspres 24 saatte yapıyoruz. WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: "Düğün sezonu gelinlik tadilatı Antalya?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet, Nisan–Ekim düğün sezonunda gelinlik tadilatı, kısaltma ve damatlık tadilatı yapıyoruz. Ekspres randevu için WhatsApp +90 531 898 64 18.",
          },
        },
        {
          '@type': 'Question',
          name: "Antalya'da otel ve restoran üniforması üretimi yapılıyor mu?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet, otel personel üniforma, resepsiyon, aşçı, garson, meydancı, spa üniforma üretiyoruz. Tasarım + kalıp + seri imalat + nakış hepsi tek elden.",
          },
        },
        {
          '@type': 'Question',
          name: "Antalya'da sweatshirt ve eşofman dikimi yapılıyor mu?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet, sweatshirt ve eşofman takımı dikimi, tadilat ve seri üretim yapıyoruz. Nakış ve baskı ile kişiselleştirme de mümkündür.",
          },
        },
        {
          '@type': 'Question',
          name: "Kuru temizleme hizmeti veriyor musunuz?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Evet, kuru temizleme, çamaşır yıkama ve ütü hizmetleri de sunmaktayız. Otel ve adreslerden kurye ile alım yapılmaktadır.",
          },
        },
        // EN
        {
          '@type': 'Question',
          name: 'Where can I find a tailor or uniform producer in Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Terzi Can offers professional tailoring and uniform production in Antalya — hotel uniforms, chef uniforms, school uniforms, embroidery, sweatshirt sewing. WhatsApp: +90 531 898 64 18.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you speak English? Tailor in Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Tailor Can provides services in Turkish, English, German and Russian. Express alterations, dry cleaning, hotel pickup & delivery. WhatsApp: +90 531 898 64 18.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you do wedding dress alterations in Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — hemming, taking in, shoulder adjustments and accessory changes for all bridal wear. April–October season. WhatsApp: +90 531 898 64 18.',
          },
        },
        // RU
        {
          '@type': 'Question',
          name: 'Где найти портного и производителя формы в Анталье?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Портной Кан — пошив одежды, производство формы, вышивка, пошив толстовок в Анталье. Гостиничная форма, форма для ресторанов. WhatsApp: +90 531 898 64 18.',
          },
        },
        {
          '@type': 'Question',
          name: 'Есть ли выездной портной в Анталье?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да! Портной Кан работает по всей Анталье. Выезд на дом или в отель, снимаем мерки и доставляем готовое изделие. WhatsApp: +90 531 898 64 18.',
          },
        },
        // DE
        {
          '@type': 'Question',
          name: 'Gibt es einen Schneider in Antalya? Mobiler Schneiderdienst?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja! Schneider Can bietet mobilen Schneiderdienst in ganz Antalya. Abholung und Lieferung ins Hotel. WhatsApp: +90 531 898 64 18.',
          },
        },
      ],
    },
  ],
};

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),

  title: {
    default: 'Terzi Can Antalya | Konyaaltı Terzi | Ütü · Dikim · Tamir · Tadilat',
    template: '%s | Terzi Can Antalya',
  },

  description:
    "Konyaaltı ve tüm Antalya ilçelerinde Terzi Can hizmetinizde. " +
    "Paça kısaltma, elbise tadilat, fermuar değişimi, özel dikim, kuru temizleme, " +
    "çamaşır yıkama, üniforma & fason imalat. 24–48 saat ekspres. " +
    `Tailor Can · Schneider Can · Портной Кан — TR · EN · DE · RU. ☎ ${PHONE}`,

  keywords: [
    // TR — Temel
    'Antalya Terzi','Terzi Antalya','Konyaaltı Terzi','En İyi Terzi Antalya','Terzi Can',
    'Eve Gelen Terzi Antalya','Otele Gelen Terzi','Araçlı Terzi Servisi','Mobil Terzi',
    // TR — Hizmetler
    'Paça Kısaltma Antalya','Paça Kısaltma Kaç Lira','Paça Kısaltma Fiyatı 2026',
    'Elbise Tadilat Antalya','Kıyafet Tamiri Antalya','Fermuar Değişimi Antalya',
    'Fermuar Değişimi Kaç Lira','Mont Fermuarı Kaç Lira','Kot Fermuarı Değişimi',
    'Elbise Daraltma Antalya','Pantolon Kısaltma Antalya','Bel Alma Antalya',
    'Kol Kısaltma Antalya','Etek Kısaltma Antalya','Gelinlik Tadilat Antalya',
    'Abiye Dikimi Antalya','Abiye Tamiri Antalya','Üniforma Dikimi Antalya',
    'Fason İmalat Antalya','Seri İmalat Antalya','Kuru Temizleme Antalya',
    'Çamaşır Yıkama Antalya','Ütü Hizmeti Antalya','Nakış Antalya',
    'Sweatshirt Dikimi Antalya','Otel Üniforma Antalya','Aşçı Üniforma Antalya',
    'Terzi Fiyatları 2026','Tadilat Fiyatı Antalya','Yakınımda Terzi',
    // TR — İlçeler
    'Lara Terzi','Konyaaltı Terzi','Belek Terzi','Kemer Terzi',
    'Alanya Terzi','Muratpaşa Terzi','Kepez Terzi','Manavgat Terzi',
    // EN
    'Tailor Antalya','Best Tailor Antalya','Clothing Alterations Antalya',
    'Trouser Hemming Antalya','Dress Repair Antalya','Zip Replacement Antalya',
    'Custom Tailoring Antalya','Wedding Dress Alterations Antalya',
    'Dry Cleaning Antalya','Mobile Tailor Antalya','English Speaking Tailor Antalya',
    'Uniform Production Antalya','Hotel Uniform Antalya','Same Day Tailor Antalya',
    // DE
    'Schneider Antalya','Kleider Ändern Antalya','Hose Kürzen Antalya',
    'Maßanfertigung Antalya','Chemische Reinigung Antalya','Uniformproduktion Antalya',
    // RU
    'Портной Анталья','Ателье Анталья','Ремонт Одежды Анталья',
    'Химчистка Анталья','Пошив На Заказ Анталья','Выездной Портной Анталья',
    'Гостиничная Форма Анталья',
  ].join(', '),

  authors: [{ name: 'SwapHubs', url: 'https://swaphubs.com' }],
  creator: 'SwapHubs',
  publisher: 'SwapHubs',
  category: 'Tailor & Clothing Services',

  openGraph: {
    title: 'Terzi Can | Tailor Can | Портной Кан | Schneider Can — Antalya & Konyaaltı',
    description:
      `Konyaaltı, Lara, Belek, Kemer, Alanya ve tüm Antalya'da Terzi Can. ` +
      `Paça kısaltma, tadilat, kuru temizleme, fason imalat, üniforma. ☎ ${PHONE}`,
    url: SITE_URL,
    siteName: 'SwapHubs — Terzi Can',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'de_DE', 'ru_RU'],
    type: 'website',
    images: [
      {
        url: '/og/terzi-can.jpg',
        width: 1200,
        height: 630,
        alt: 'Terzi Can Antalya — Profesyonel Terzi Hizmetleri',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Terzi Can | Konyaaltı · Tüm İlçeler · Ütü · Dikim · Tamir',
    description: `Konyaaltı ve tüm Antalya ilçelerinde Terzi Can. TR · EN · DE · RU ☎ ${PHONE}`,
    images: ['/og/terzi-can.jpg'],
  },

  alternates: {
    canonical: SITE_URL,
  },

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

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

// ── Page Component ────────────────────────────────────────────────────────────
export default function TerziPage() {
  return (
    <>
      {/*
        ✅ TEK JSON-LD buradadır — page.tsx
        ❌ TerziClient.tsx içindeki <script type="application/ld+json"> satırını
           ve SCHEMA objesini TAMAMEN silin.
           Aksi halde Google "FAQPage yineleniyor" ve "Adsız öğe" hatası verir.
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
