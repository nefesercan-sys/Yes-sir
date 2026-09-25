import type { Metadata, Viewport } from 'next';
import PacaKisaltmaClient from './PacaKisaltmaClient';

// ── Mobil / Tarayıcı Yapılandırması (Next.js 14+ Viewport) ─────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

const PAGE_URL      = 'https://swaphubs.com/terzi/paca-kisaltma-antalya';
const PARENT_URL    = 'https://swaphubs.com/terzi';
const HOME_URL      = 'https://swaphubs.com';
const PHONE         = '+90 531 898 64 18';
const PHONE_E164    = '+905318986418';
const LAST_MODIFIED = '2026-09-25';

const PAGE_TITLE = 'Antalya Paça Kısaltma & Pantolon Daraltma (2026 Fiyatı ₺150) | Terzi Can';
const PAGE_DESC  =
  'Antalya Konyaaltı\'nda kot, kumaş, eşofman ve keten pantolon paçası kısaltma. Orijinal paça dikişi, duble paça ve bel/bacak daraltma aynı gün teslim. ☎ ' + PHONE;

const OG_IMAGE = `${HOME_URL}/og/paca-kisaltma-antalya.jpg`;

const ANTALYA_ILCELER = [
  'Antalya','Konyaaltı','Muratpaşa','Kepez','Döşemealtı','Aksu',
  'Lara','Belek','Kemer','Alanya','Manavgat','Side','Serik'
].map(name => ({ '@type': 'City', name }));

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Pantolon Paçası Kısaltma ve Orijinal Paça Dikişi',
      serviceType: 'Paça Kısaltma',
      description: PAGE_DESC,
      url: PAGE_URL,
      provider: {
        '@type': 'LocalBusiness',
        '@id': `${PARENT_URL}#business`,
        name: 'Terzi Can',
        telephone: PHONE_E164,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Hurma Mahallesi',
          addressLocality: 'Konyaaltı',
          addressRegion: 'Antalya',
          postalCode: '07130',
          addressCountry: 'TR',
        },
      },
      areaServed: ANTALYA_ILCELER,
      offers: {
        '@type': 'Offer',
        price: '150',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-01-01',
      },
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME_URL },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi Can', item: PARENT_URL },
        { '@type': 'ListItem', position: 3, name: 'Paça Kısaltma ve Daraltma', item: PAGE_URL },
      ],
    },

    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya pantolon paçası kısaltma fiyatı 2026 yılında ne kadar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `2026 yılı güncel kot, kumaş ve eşofman paçası kısaltma fiyatımız ₺150'den başlamaktadır. Orijinal paça ve özel dikiş gerektiren işlemlerde net bilgi için WhatsApp: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Orijinal kot paçası dikişi yapıyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet! Kot pantolonlarınızın altındaki orijinal dikiş ipi ve fabrika çıkışlı eskitme yıkama görüntüsünü aynen koruyarak orijinal paça kesimi yapıyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Paça kısaltma işlemi ne kadar sürede teslim edilir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Atölyemize getirdiğiniz pantolonların paça kısaltma ve boy ayarlama işlemlerini yoğunluğumuza bağlı olarak genellikle aynı gün içinde (1-2 saatte) teslim ediyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Adrese gelen terzi ile paça ölçüsü alıyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Evet, Konyaaltı ve tüm Antalya genelinde araçlı terzi servisimizle adresinize gelip paça boyunuzu alıyor, dikim tamamlandıktan sonra tekrar adresinize teslim ediyoruz. WhatsApp: ${PHONE}`,
          },
        },
      ],
    },
  ],
};

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: [
    'paça kısaltma antalya',
    'pantolon paçası kısaltma',
    'orijinal kot paçası antalya',
    'konyaaltı paça kısaltma',
    'pantolon boyu kısaltma fiyatı 2026',
    'duble paça yapımı antalya',
    'eşofman paçası kısaltma',
    'kumaş pantolon paçası terzi',
    'terzi paça fiyatları 2026',
    'hurma paça kısaltma terzi',
    'liman mahallesi paça daraltma',
    'pantolon paçası daraltma antalya',
  ],
  authors: [{ name: 'SwapHubs', url: HOME_URL }],
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
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Antalya Paça Kısaltma Hizmeti Terzi Can', type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [OG_IMAGE],
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8851;30.6930',
    ICBM: '36.8851, 30.6930',
    'content-language': 'tr',
  },
};

export default function PacaKisaltmaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PacaKisaltmaClient />
    </>
  );
}
