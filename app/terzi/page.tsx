import type { Metadata, Viewport } from 'next';
import TerziClient from './TerziClient';

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
const LAST_MODIFIED = '2026-10-02';

// ── Google Business Profil ────────────────────────────────────────────────────
const GBP_SHARE = 'https://share.google/ppkxQGTVWahWAmDpg';
const GBP_1 = {
  cid:    '', // yeni profilin CID'i bilinmiyor; sayfada gösterilmiyor
  short:  GBP_SHARE,
  share:  GBP_SHARE,
  maps:   GBP_SHARE,
  embed:  'https://www.google.com/maps?q=TERZ%C4%B0+Can+Antalya+Tailor+Service&output=embed',
  review: GBP_SHARE, // profil sayfasında "Yorum yaz" butonu var
  name:   'TERZİ Can Antalya Tailor Service',
  addr:   'Hurma Mahallesi, 07130 Konyaaltı / Antalya', // TODO: yeni profildeki adresle doğrula
};

const PAGE_TITLE = 'Terzi Can Antalya — Bay & Bayan Terzi, Özel Dikim, Tadilat, Dikiş Atölyesi 2026';
const PAGE_DESC  =
  'Terzi Can Konyaaltı: paça kısaltma ₺150, fermuar değişimi ₺200, bel daraltma, elbise dikimi, özel dikim, tişört-sweatshirt-pantolon imalatı, üniforma üretimi, kuru temizleme. Eve & otele araçlı terzi servisi. Tüm Antalya ilçeleri. ☎ ' + PHONE;

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
    // ── ANA VARLIK: Terzi Can (SwapHubs sadece üst kuruluş olarak arka planda) ──
    {
      // Not: schema.org'da "Tailor" tipi yoktur; geçerli tipler kullanıldı.
      '@type': ['LocalBusiness', 'ClothingStore', 'DryCleaningOrLaundry'],
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        GBP_1.name,
        'Tailor Can Antalya',
        'Портной Кан Анталья',
        'Schneider Can Antalya',
        'Konyaaltı Terzi Can',
        'Bay Terzi Antalya',
        'Bayan Terzi Antalya',
        'Dikiş Atölyesi Antalya',
      ],
      description:
        "Antalya Konyaaltı'nda profesyonel bay ve bayan terzisi. Paça kısaltma, fermuar değişimi, bel daraltma, elbise dikimi, özel dikim, tişört-sweatshirt-pantolon imalatı, üniforma üretimi, kuru temizleme. Tüm Antalya ilçelerine araçlı terzi servisi.",
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
      // TODO: koordinatları Google Maps profilinden doğrula
      geo: { '@type': 'GeoCoordinates', latitude: 36.8851, longitude: 30.6930 },
      hasMap: GBP_1.maps,
      // aggregateRating KALDIRILDI: sayfada görünür/doğrulanabilir yorum yoksa
      // Google "self-serving / sahte yapısal veri" sayar ve manuel işlem riski doğurur.
      // Gerçek GBP puanı sayfada görünür olursa geri eklenebilir.
      sameAs: [
        GBP_SHARE,
        `https://wa.me/${PHONE_E164.replace('+', '')}`,
        // Instagram/Facebook: sadece GERÇEK hesap URL'leri varsa ekle.
      ],
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00', closes: '19:00',
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
          offer('Eve / Otele Gelen Terzi Servisi', '500'),
        ],
      },
      areaServed: ANTALYA_ILCELER,
      contactPoint: [{
        '@type': 'ContactPoint',
        telephone: PHONE_E164,
        contactType: 'customer service',
        areaServed: 'TR',
        availableLanguage: ['Turkish','English','Russian','German'],
      }],
    },

    // ── WebSite: /terzi kendi başına bir site varlığı (eksik @id düzeltildi) ──
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
        cssSelector: ['#hizmet-fiyatlari', '#sik-sorulan-sorular', '#terzi-can-ozet'],
      },
      mainEntity: { '@id': `${SITE_URL}#business` },
    },

    // Breadcrumb: Terzi Can birinci sırada (SwapHubs ana sayfa öne çıkmasın)
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
      description: 'Araçlı terzi servisimizle adresinizde ölçü alma ve teslimat süreci.',
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
        { '@type': 'ListItem', position: 1, name: 'Bay Terzi — Erkek Kıyafet Dikimi',       item: `${HOME_URL}/terzi/bay-terzi-antalya` },
        { '@type': 'ListItem', position: 2, name: 'Bayan Terzi — Kadın Elbise Dikimi',      item: `${HOME_URL}/terzi/bayan-terzi-antalya` },
        { '@type': 'ListItem', position: 3, name: 'Paça Kısaltma',                          item: `${HOME_URL}/terzi/paca-kisaltma-antalya` },
        { '@type': 'ListItem', position: 4, name: 'Dikiş Atölyesi — Fason ve Seri Üretim', item: `${HOME_URL}/terzi/dikis-atolyesi-antalya` },
        { '@type': 'ListItem', position: 5, name: 'Üniforma Üretimi',                       item: `${HOME_URL}/terzi/uniforma-uretimi-antalya` },
        { '@type': 'ListItem', position: 6, name: 'Kuru Temizleme ve Ütü',                  item: `${HOME_URL}/terzi/kuru-temizleme-antalya` },
        { '@type': 'ListItem', position: 7, name: 'Eve / Otele Gelen Terzi',                item: `${HOME_URL}/terzi/eve-gelen-terzi-antalya` },
      ],
    },

    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        { '@type': 'Question', name: 'Paça kısaltma fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `₺150 / €5'den başlar, aynı gün teslim. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Otellere ve adrese terzi kurye servisi var mı?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Lara, Kundu, Konyaaltı, Belek ve Kemer otellerinden kıyafetlerinizi alıyor, ölçü alıp 24 saat içinde otele teslim ediyoruz. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Hangi ödeme yöntemleri ve para birimleri geçerli?', acceptedAnswer: { '@type': 'Answer', text: 'TRY, EUR, USD, RUB nakit kabul edilir. Tüm uluslararası kredi kartları ve temassız ödeme geçerlidir.' } },
        { '@type': 'Question', name: 'Fermuar değişimi kaç lira?', acceptedAnswer: { '@type': 'Answer', text: `Pantolon/kot/mont/ceket fermuarı ₺200 / €6. Aynı gün teslim mümkün. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Bel daraltma ve elbise daraltma fiyatı?', acceptedAnswer: { '@type': 'Answer', text: `Bel daraltma ₺150 / €5'den başlar. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Yerinde ölçü alma ve adrese teslim var mı?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Adresinize gelip yerinde ölçü alıyor, dikip tekrar teslim ediyoruz. Tüm Antalya. WhatsApp: ${PHONE}` } },
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
  title: { absolute: PAGE_TITLE }, // layout.tsx'teki "| SwapHubs" şablonu uygulanmasın
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
    siteName: 'Terzi Can Antalya', // "SwapHubs" yerine
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
    'geo.position': '36.8851;30.6930',
    ICBM: '36.8851, 30.6930',
    'content-language': 'tr',
  },
  verification: {
    yandex: '4c73ee1911a4b197',
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
      {/* Gizli "AI context" bloğu kaldırıldı: gizli metin Google spam politikasına
          aykırıdır, AI botları da görünür içeriğe güvenir. Aynı bilgi zaten
          görünür SEO özeti, SSS ve fiyat tablosunda var. */}
      <TerziClient gbp1={GBP_1} />
    </>
  );
}
