import React from 'react';

// ── Temel Sabitler ────────────────────────────────────────────────────────────
const SITE_URL      = 'https://swaphubs.com/terzi';
const HOME_URL      = 'https://swaphubs.com';
const PHONE         = '+90 531 898 64 18';
const PHONE_E164    = '+905318986418';
const LAST_MODIFIED = '2026-10-04'; 

// ── Google Business Profil ────────────────────────────────────────────────────
const GBP_SHARE = 'https://share.google/SyIp3YWAeLtl4wvZq'; 
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.07765171764!2d30.6133!3d36.8407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDUwJzI2LjUiTiAzMMKwMzYnNDcuOSJF!5e0!3m2!1str!2str!4v1234567890123'; 

const GBP_1 = {
  cid:    '', 
  short:  GBP_SHARE,
  share:  GBP_SHARE,
  maps:   GBP_SHARE,
  embed:  MAP_EMBED_URL, 
  review: GBP_SHARE, 
  name:   'TERZİ Can Antalya Tailor Service',
  addr:   'Hurma Mahallesi, 07130 Konyaaltı / Antalya', 
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

// ── JSON-LD Verisi ────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── ANA VARLIK: Terzi Can ──
    {
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
      geo: { '@type': 'GeoCoordinates', latitude: 36.8851, longitude: 30.6930 },
      hasMap: GBP_1.maps,
      sameAs: [
        GBP_SHARE,
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
      // 🌟 YILDIZLAR VE 2 YORUM:
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0', 
        reviewCount: '2'    
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Ahmet Y.' },
          datePublished: '2026-09-20', 
          reviewBody: 'Takım elbisemin daraltma işlemini kusursuz yaptılar. Kurye ile otelden alıp tekrar teslim etmeleri çok büyük bir kolaylık. Kesinlikle tavsiye ederim.',
          reviewRating: { '@type': 'Rating', bestRating: '5', ratingValue: '5' }
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Elena M.' },
          datePublished: '2026-10-02', 
          reviewBody: 'Very professional and fast alteration service. They picked up my dresses from the hotel and returned them perfectly tailored the next day.',
          reviewRating: { '@type': 'Rating', bestRating: '5', ratingValue: '5' }
        }
      ]
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
};

// ── Bileşen Çıktısı ───────────────────────────────────────────────────────────
export default function SchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
