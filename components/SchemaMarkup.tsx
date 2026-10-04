import React from 'react';

// ── Temel Sabitler ────────────────────────────────────────────────────────────
const SITE_URL      = 'https://swaphubs.com/terzi';
const HOME_URL      = 'https://swaphubs.com';
const PHONE         = '+90 531 898 64 18';
const PHONE_E164    = '+905318986418';
const LAST_MODIFIED = '2026-10-04'; 

const GBP_NAME = 'TERZİ Can Antalya Tailor Service';

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

// ── JSON-LD Verisi ────────────────────────────────────────────────────────────
const buildJsonLd = (gbpUrl: string, reviewProps: Record<string, unknown>) => ({
  '@context': 'https://schema.org',
  '@graph': [
    // ── ANA VARLIK: Terzi Can ──
    {
      '@type': ['LocalBusiness', 'ClothingStore', 'DryCleaningOrLaundry'],
      '@id': `${SITE_URL}#business`,
      name: GBP_NAME,
      alternateName: [
        'Terzi Can',
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
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hurma Mahallesi',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07130',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.857466, longitude: 30.596987 },
      hasMap: gbpUrl,
      sameAs: [
        gbpUrl,
        `https://wa.me/${PHONE_E164.replace('+', '')}`,
      ],
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],
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
          offer('Eve / Otele Gelen Terzi Servisi', '0'),
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
      // NOT: aggregateRating/review YOK. Sadece gerçek, doğrulanabilir yorumlar
      // aşağıdaki REAL_REVIEWS listesiyle eklenir (bkz. buildReviewProps); `reviews` yerine REAL_REVIEWS listesi kullanılır.
      ...reviewProps,
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

    // ── WebPage ──
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

    // ── Breadcrumb ──
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Terzi Can Antalya', item: SITE_URL },
      ],
    },

    // ── HowTo ──
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

    // ── ItemList (Hizmetler) ──
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

    // ── FAQPage ──
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
});

// ── Gerçek yorumlar ───────────────────────────────────────────────────────────
// SADECE gerçekten alınmış, Google profilinde veya müşteriden yazılı gelen yorumları ekle.
// Boş bırakılırsa puan/yorum şemaya hiç girmez (doğru olan budur).
type RealReview = { author: string; rating: number; text: string; date: string };
const REAL_REVIEWS: RealReview[] = [
  // { author: 'Ad S.', rating: 5, text: 'Müşterinin gerçek yorumu', date: '2026-09-20' },
];

function buildReviewProps(): Record<string, unknown> {
  if (REAL_REVIEWS.length === 0) return {};
  const avg = REAL_REVIEWS.reduce((s, r) => s + r.rating, 0) / REAL_REVIEWS.length;
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: String(REAL_REVIEWS.length),
      bestRating: '5',
    },
    review: REAL_REVIEWS.map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: { '@type': 'Rating', bestRating: '5', ratingValue: String(r.rating) },
    })),
  };
}

// ── Bileşen Çıktısı ───────────────────────────────────────────────────────────
export default function SchemaMarkup({ gbpUrl }: { gbpUrl: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(gbpUrl, buildReviewProps())) }}
    />
  );
}
