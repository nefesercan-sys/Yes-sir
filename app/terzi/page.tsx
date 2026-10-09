import type { Metadata, Viewport } from 'next';
import SpeakableSchema from '@/components/SpeakableSchema';
import TerziClient from './TerziClient';
import QuickActionBanner from '@/components/QuickActionBanner';
import ReviewsBlock from '@/components/ReviewsBlock';
import { GOOGLE_REVIEWS, reviewStats } from '@/lib/reviews';

// ── Viewport (zoom engeli kaldırıldı: erişilebilirlik + Lighthouse) ───────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

const SITE_URL      = 'https://swaphubs.com/terzi';
const HOME_URL      = 'https://swaphubs.com';
const PHONE         = '+90 531 898 64 18';
const PHONE_E164    = '+905318986418';
const LAST_MODIFIED = '2026-10-04';

// ── Google Business Profil ────────────────────────────────────────────────────
// Kaynak: maps.app.goo.gl/3U3dCZ2iURWFwfJF6  →  ftid 0x14c393757afe22b7:0x5124ac20b20c2685
const GBP_SHORT = 'https://www.google.com/maps?cid=5846987472659818117';
const GBP_CID   = '5846987472659818117';
const GBP_MAPS  = `https://www.google.com/maps?cid=${GBP_CID}`;
const GBP_NAME  = 'TERZİ Can Antalya Tailor Service';
const GBP_ADDR  = 'Hurma Mahallesi, 07130 Konyaaltı / Antalya';

// Harita işletme kaydına (ftid) bağlı: pin artık limana değil işletmeye düşer.
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=' +
  encodeURIComponent(`${GBP_NAME}, Hurma, 07130 Konyaaltı/Antalya`) +
  '&ftid=0x14c393757afe22b7:0x5124ac20b20c2685&z=17&output=embed';

const GBP_1 = {
  cid:    GBP_CID,
  short:  GBP_SHORT,
  share:  GBP_SHORT,
  maps:   GBP_MAPS,
  embed:  MAP_EMBED_URL,
  review: GBP_SHORT,
  name:   GBP_NAME,
  addr:   GBP_ADDR,
};

const PAGE_TITLE = "Antalya Terzi · Fotoğraf At, Fiyat Al · Otele Terzi Çağır | Terzi Can";
const PAGE_DESC  =
  "Terzi Can Konyaaltı: WhatsApp'tan fotoğraf at, hızlı fiyat al. Adresten alıp adrese teslim, otele terzi çağır. Paça kısaltma ₺150, fermuar değişimi ₺200. Her gün 08:00–23:00. ☎ " + PHONE;

const OG_IMAGE = `${HOME_URL}/og/terzi-can.jpg`;

const ANTALYA_ILCELER = [
  'Antalya','Konyaaltı','Muratpaşa','Kepez','Döşemealtı','Aksu',
  'Lara','Belek','Kemer','Alanya','Manavgat','Side','Serik',
  'Kaş','Kalkan','Finike','Kumluca','Gazipaşa','Mahmutlar',
  'Kundu','Boğazkent','Kadriye','Beldibi','Göynük','Tekirova',
].map(name => ({ '@type': 'City', name }));

const offer = (name: string, price: string) => ({
  '@type': 'Offer',
  itemOffered: { '@type': 'Service', name, areaServed: ANTALYA_ILCELER },
  price,
  priceCurrency: 'TRY',
  availability: 'https://schema.org/InStock',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── ANA VARLIK: Terzi Can ──
    {
      '@type': ['LocalBusiness', 'ClothingStore', 'DryCleaningOrLaundry'],
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        GBP_NAME,
        'Tailor Can Antalya',
        'Портной Кан Анталья',
        'Schneider Can Antalya',
        'Konyaaltı Terzi Can',
        'Bay Terzi Antalya',
        'Bayan Terzi Antalya',
        'Dikiş Atölyesi Antalya',
      ],
      description:
        "Antalya Konyaaltı'nda profesyonel bay ve bayan terzisi. Paça kısaltma, fermuar değişimi, bel daraltma, elbise dikimi, özel dikim, tişört-sweatshirt-pantolon imalatı, üniforma üretimi, kuru temizleme. Eve ve otele ücretsiz terzi servisi.",
      url: SITE_URL,
      mainEntityOfPage: { '@id': `${SITE_URL}#webpage` },
      telephone: PHONE_E164,
      priceRange: '$$',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      knowsLanguage: ['tr', 'en', 'ru', 'de'],
      image: [OG_IMAGE],
      logo: `${HOME_URL}/logo.png`,
      parentOrganization: { '@type': 'Organization', name: 'SwapHubs', url: HOME_URL },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hurma Mahallesi',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07130',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.857466, longitude: 30.596987 },
      hasMap: GBP_MAPS,
      sameAs: [
        GBP_MAPS,
        `https://wa.me/${PHONE_E164.replace('+', '')}`,
        'https://terzihizmeti.com.tr',
      ],
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '08:00', closes: '23:00',
      }],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can — Tüm Terzilik ve Tekstil Hizmetleri 2026',
        itemListElement: [
          offer('Paça Kısaltma', '150'),
          offer('Fermuar Değişimi', '200'),
          offer('Bel Daraltma', '150'),
          offer('Elbise Dikimi', '800'),
          offer('Kuru Temizleme', '300'),
          offer('Üniforma Üretimi', '1000'),
          offer('Eve / Otele Gelen Terzi Servisi (ücretsiz)', '0'),
        ],
      },
      potentialAction: [
        {
          '@type': 'CommunicateAction',
          name: "WhatsApp'tan fotoğraf at, fiyat al",
          target: { '@type': 'EntryPoint', urlTemplate: `https://wa.me/${PHONE_E164.replace('+', '')}?text=${encodeURIComponent("Merhaba, kıyafetimin fotoğrafını gönderiyorum. Fiyat alabilir miyim?")}` },
        },
        {
          '@type': 'CommunicateAction',
          name: 'Otele terzi çağır',
          target: { '@type': 'EntryPoint', urlTemplate: `https://wa.me/${PHONE_E164.replace('+', '')}?text=${encodeURIComponent("Merhaba, kaldığım otele terzi çağırmak istiyorum.")}` },
        },
      ],
      areaServed: ANTALYA_ILCELER,
      contactPoint: [{
        '@type': 'ContactPoint',
        telephone: PHONE_E164,
        contactType: 'customer service',
        areaServed: 'TR',
        availableLanguage: ['Turkish','English','Russian','German'],
      }],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviewStats().average,
        reviewCount: String(reviewStats().count),
        bestRating: '5',
        worstRating: '1',
      },
      review: GOOGLE_REVIEWS.map(r => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        datePublished: r.date,
        reviewBody: r.text,
        inLanguage: r.lang,
        reviewRating: { '@type': 'Rating', bestRating: '5', ratingValue: String(r.rating) },
      })),
    },

    // ── WebSite ──
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: 'Terzi Can Antalya',
      alternateName: 'Terzi Can',
      url: SITE_URL,
      inLanguage: 'tr',
      publisher: { '@id': `${SITE_URL}#business` },
    },

    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: PAGE_TITLE,
      url: SITE_URL,
      isPartOf: { '@id': `${SITE_URL}#website` },
      about: { '@id': `${SITE_URL}#business` },
      primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
      description: PAGE_DESC,
      inLanguage: 'tr',
      datePublished: '2024-01-01',
      dateModified: LAST_MODIFIED,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.hero-slogan', '#quick-actions', '#hizmet-fiyatlari', '#sik-sorulan-sorular', '#terzi-can-ozet'],
      },
      mainEntity: { '@id': `${SITE_URL}#business` },
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Terzi Can Antalya', item: SITE_URL },
      ],
    },

    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}#howto-olcu`,
      name: 'Terzi Can ile Adrese Gelen Terzi Servisi Nasıl Çalışır?',
      description: 'Ücretsiz eve ve otele terzi servisiyle adresinizde ölçü alma ve teslimat süreci.',
      step: [
        { '@type': 'HowToStep', name: 'WhatsApp ile iletişim', text: `WhatsApp ${PHONE} üzerinden adresinizi ve hizmet talebinizi bildirin.` },
        { '@type': 'HowToStep', name: 'Terzi adresinize gelir', text: 'Anlaşılan saatte terzimiz adresinize gelir, yerinde ölçü alır.' },
        { '@type': 'HowToStep', name: 'Atölyede tamamlanır', text: 'Ölçülere göre kıyafetiniz atölyemizde özenle dikilir veya tadilatı yapılır.' },
        { '@type': 'HowToStep', name: 'Adresinize teslim', text: 'Tamamlanan kıyafet anlaşılan vakitte adresinize teslim edilir.' },
      ],
    },

    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}#hizmet-listesi`,
      name: 'Terzi Can Hizmetleri — Antalya Terzi 2026',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Bay Terzi — Erkek Kıyafet Dikimi',       item: { '@id': `${HOME_URL}/terzi/bay-terzi-antalya` } },
        { '@type': 'ListItem', position: 2, name: 'Bayan Terzi — Kadın Elbise Dikimi',      item: { '@id': `${HOME_URL}/terzi/bayan-terzi-antalya` } },
        { '@type': 'ListItem', position: 3, name: 'Paça Kısaltma',                          item: { '@id': `${HOME_URL}/terzi/paca-kisaltma-antalya` } },
        { '@type': 'ListItem', position: 4, name: 'Dikiş Atölyesi — Fason ve Seri Üretim', item: { '@id': `${HOME_URL}/terzi/dikis-atolyesi-antalya` } },
        { '@type': 'ListItem', position: 5, name: 'Üniforma Üretimi',                       item: { '@id': `${HOME_URL}/terzi/uniforma-uretimi-antalya` } },
        { '@type': 'ListItem', position: 6, name: 'Kuru Temizleme ve Ütü',                  item: { '@id': `${HOME_URL}/terzi/kuru-temizleme-antalya` } },
        { '@type': 'ListItem', position: 7, name: 'Eve / Otele Gelen Terzi',                item: { '@id': `${HOME_URL}/terzi/eve-gelen-terzi-antalya` } },
      ],
    },

    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        { '@type': 'Question', name: 'Paça kısaltma fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `₺150 / €5'den başlar, aynı gün teslim. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Otellere ve adrese terzi kurye servisi var mı?', acceptedAnswer: { '@type': 'Answer', text: `Evet, eve ve otele servis ücretsizdir. Lara, Kundu, Konyaaltı, Belek ve Kemer otellerinden kıyafetlerinizi alıyor, ölçü alıp 24 saat içinde otele teslim ediyoruz. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Çalışma saatleriniz nedir?', acceptedAnswer: { '@type': 'Answer', text: `Haftanın her günü, hafta sonu dahil 08:00–23:00 arası hizmet veriyoruz. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Hangi ödeme yöntemleri ve para birimleri geçerli?', acceptedAnswer: { '@type': 'Answer', text: 'TRY, EUR, USD, RUB nakit kabul edilir. Tüm uluslararası kredi kartları ve temassız ödeme geçerlidir.' } },
        { '@type': 'Question', name: 'Fermuar değişimi kaç lira?', acceptedAnswer: { '@type': 'Answer', text: `Pantolon/kot/mont/ceket fermuarı ₺200 / €6. Aynı gün teslim mümkün. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Bel daraltma ve elbise daraltma fiyatı?', acceptedAnswer: { '@type': 'Answer', text: `Bel daraltma ₺150 / €5'den başlar. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Yerinde ölçü alma ve adrese teslim var mı?', acceptedAnswer: { '@type': 'Answer', text: `Evet, adresinize gelip yerinde ölçü alıyor, dikip tekrar teslim ediyoruz. Servis ücretsizdir. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Tişört, sweatshirt, pantolon, gobi imalatı?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Tüm tekstil ürünlerinin özel dikimi ve seri imalatını yapıyoruz. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Bay terzi Antalya — erkek kıyafet dikimi?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Erkek takım elbise, pantolon, gömlek, ceket, blazer, smoking, damatlık. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Bayan terzi Antalya — kadın elbise dikimi?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Elbise, bluz, etek, abiye tamiri, gelinlik tadilatı, büyük beden. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Kuru temizleme ve ütü Antalya fiyatları?', acceptedAnswer: { '@type': 'Answer', text: 'Kuru temizleme ₺300 / €9, mont ₺500 / €15, çamaşır ₺80/kg / €2.5/kg. Otelden kurye alım. 24 saat ekspres.' } },
        { '@type': 'Question', name: 'Hangi Antalya ilçelerine terzi servisi geliyor?', acceptedAnswer: { '@type': 'Answer', text: 'Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Aksu, Lara, Belek, Kemer, Alanya, Manavgat, Side, Serik ve tüm Antalya otellerine geliyoruz.' } },
      ],
    },
  ],
};

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESC,
  applicationName: 'Terzi Can',
  keywords: [
    'Antalya terzi','Konyaaltı terzi','terzi Antalya 2026','bay terzi Antalya','bayan terzi Antalya',
    'paça kısaltma Antalya','fermuar değişimi Antalya','bel daraltma Antalya',
    'özel dikim Antalya','eve gelen terzi Antalya','otele gelen terzi Antalya',
    'dikiş atölyesi Antalya','üniforma üretimi Antalya','kuru temizleme Antalya',
    'tailor Antalya','English speaking tailor Antalya','портной Анталья','Schneider Antalya',
    'yakınımda terzi','en yakın terzi','Terzi Can',
  ],
  authors: [{ name: 'Terzi Can', url: SITE_URL }],
  creator: 'Terzi Can',
  publisher: 'Terzi Can',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'tr': `${HOME_URL}/terzi`,
      'en': `${HOME_URL}/online-tailor-service`,
      'de': `${HOME_URL}/de/online-schneiderservice-antalya`,
      'ru': `${HOME_URL}/ru/atelie-antalya`,
      'x-default': `${HOME_URL}/terzi`,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: SITE_URL,
    siteName: 'Terzi Can Antalya',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Terzi Can Antalya', type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [OG_IMAGE],
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.857466;30.596987',
    ICBM: '36.857466, 30.596987',
    'content-language': 'tr',
  },
  verification: {
    yandex: ['4c73ee1911a4b197', 'c81788c5ebe2163f'],
    other: { 'msvalidate.01': 'EE22134B7D1B55A44BA700154371D5C3' },
  },
};

export default function TerziPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpeakableSchema path="/terzi" />
      <QuickActionBanner lang="tr" />
      <TerziClient gbp1={GBP_1} />
      <ReviewsBlock lang="tr" />
      <p style={{ maxWidth: 1000, margin: '0 auto 32px', padding: '0 16px', fontSize: 14, textAlign: 'center' }}>
        Terzi Can resmi sitesi: <a href="https://terzihizmeti.com.tr">terzihizmeti.com.tr</a>
      </p>
    </>
  );
}
