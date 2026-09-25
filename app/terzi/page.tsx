import type { Metadata, Viewport } from 'next';
import TerziClient from './TerziClient';

// ── Mobil / Tarayıcı Yapılandırması (Next.js 14+ Viewport) ─────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

const SITE_URL      = 'https://swaphubs.com/terzi';
const HOME_URL      = 'https://swaphubs.com';
const PHONE         = '+90 531 898 64 18';
const PHONE_E164    = '+905318986418';
const LAST_MODIFIED = '2026-09-25'; // Statik derlemede tarihin takılı kalmaması için güncel tarih stringi

// ── Google Business Profil ────────────────────────────────────────────────────
const GBP_1 = {
  cid:    '0x14c39311e6924c67:0x59547225251db8a0',
  short:  'https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8',
  maps:   'https://www.google.com/maps/place/?q=place_id:0x14c39311e6924c67:0x59547225251db8a0',
  embed:  'https://www.google.com/maps?q=TERZ%C4%B0+Can+Konyaalt%C4%B1+Hurma+Antalya&output=embed',
  review: 'https://search.google.com/local/writereview?placeid=0x14c39311e6924c67:0x59547225251db8a0',
  name:   'TERZİ Can - Konyaaltı',
  addr:   'Hurma Mahallesi, 07130 Konyaaltı / Antalya',
};

const PAGE_TITLE = 'Antalya Terzi Can — Bay & Bayan Terzi, Özel Dikim, Tadilat, Dikiş Atölyesi 2026';
const PAGE_DESC  =
  'Konyaaltı Terzi Can: paça kısaltma ₺150, fermuar değişimi ₺200, bel daraltma, elbise dikimi, özel dikim, tişört-sweatshirt-pantolon imalatı, üniforma üretimi, kuru temizleme. Eve & otele araçlı terzi servisi. Tüm Antalya ilçeleri. ☎ ' + PHONE;

const OG_IMAGE = `${HOME_URL}/og/terzi-can.jpg`;

const ANTALYA_ILCELER = [
  'Antalya','Konyaaltı','Muratpaşa','Kepez','Döşemealtı','Aksu',
  'Lara','Belek','Kemer','Alanya','Manavgat','Side','Serik',
  'Kaş','Kalkan','Finike','Kumluca','Gazipaşa','Mahmutlar',
  'Kundu','Boğazkent','Kadriye','Beldibi','Göynük','Tekirova',
].map(name => ({ '@type': 'City', name }));

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore', 'Tailor', 'DryCleaningOrLaundry'],
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        'Tailor Can Antalya',
        'Портной Кан Анталья',
        'Schneider Can Antalya',
        'Konyaaltı Terzi Can',
        'Bay Terzi Antalya',
        'Bayan Terzi Antalya',
        'Dikiş Atölyesi Antalya',
        'Erkek Terzi Antalya',
        'Kadın Terzi Antalya',
        'Antalya Özel Dikim Atölyesi',
        'Antalya Tekstil İmalatı',
        GBP_1.name,
      ],
      description:
        "Antalya Konyaaltı'nda profesyonel bay ve bayan terzisi. Paça kısaltma, fermuar değişimi, bel daraltma, elbise dikimi, özel dikim, tişört-sweatshirt-pantolon imalatı, üniforma üretimi, kuru temizleme. Tüm Antalya ilçelerine araçlı terzi servisi.",
      url: SITE_URL,
      telephone: PHONE_E164,
      priceRange: '$$',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
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
      geo: { '@type': 'GeoCoordinates', latitude: 36.8851, longitude: 30.6930 },
      hasMap: GBP_1.maps,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '128',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        GBP_1.short,
        GBP_1.maps,
        `https://wa.me/${PHONE_E164.replace('+','')}`,
        'https://www.instagram.com/terzican.antalya', // Instagram hesabınız varsa güncelleyin
        'https://www.facebook.com/terzicanantalya',   // Facebook hesabınız varsa güncelleyin
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
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paça Kısaltma', areaServed: ANTALYA_ILCELER }, price: '150', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fermuar Değişimi', areaServed: ANTALYA_ILCELER }, price: '200', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bel Daraltma', areaServed: ANTALYA_ILCELER }, price: '150', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elbise Dikimi', areaServed: ANTALYA_ILCELER }, price: '800', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kuru Temizleme', areaServed: ANTALYA_ILCELER }, price: '300', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Üniforma Üretimi', areaServed: ANTALYA_ILCELER }, price: '1000', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Eve / Otele Gelen Terzi Servisi', areaServed: ANTALYA_ILCELER }, price: '500', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
        ],
      },
      areaServed: ANTALYA_ILCELER,
      contactPoint: [{
        '@type': 'ContactPoint',
        telephone: PHONE_E164,
        contactType: 'customer service',
        areaServed: 'TR',
        availableLanguage: ['Turkish','English','Russian','German'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '09:00', closes: '19:00',
        },
      }],
    },

    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: PAGE_TITLE,
      url: SITE_URL,
      isPartOf: { '@id': `${HOME_URL}#website` },
      about: { '@id': `${SITE_URL}#business` },
      description: PAGE_DESC,
      inLanguage: 'tr',
      datePublished: '2024-01-01',
      dateModified: LAST_MODIFIED,
      lastReviewed: LAST_MODIFIED,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#hizmet-fiyatlari','#sik-sorulan-sorular','#terzi-can-ozet'],
      },
      mainEntity: { '@id': `${SITE_URL}#business` },
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME_URL },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi Can', item: SITE_URL },
      ],
    },

    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}#howto-olcu`,
      name: 'Terzi Can ile Adrese Gelen Terzi Servisi Nasıl Çalışır?',
      description: 'Araçlı terzi servisimizle adresinizde ölçü alma ve teslimat süreci.',
      totalTime: 'PT30M',
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
        { '@type': 'ListItem', position: 8, name: 'Fermuar Değişimi',                       item: `${HOME_URL}/terzi/fermuar-degisimi-antalya` },
        { '@type': 'ListItem', position: 9, name: 'Gelinlik Tadilatı',                      item: `${HOME_URL}/terzi/gelinlik-tadilati-antalya` },
      ],
    },

    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        { '@type': 'Question', name: 'Antalya paça kısaltma ve pantolon kısaltma fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Paça kısaltma ₺150'den başlar. Aynı gün teslim. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Fermuar değişimi kaç lira? Mont, kot, pantolon fermuarı Antalya 2026?', acceptedAnswer: { '@type': 'Answer', text: `Pantolon/kot ₺200, ceket ₺200, mont ₺200. Aynı gün teslim. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Bel daraltma ve elbise daraltma Antalya fiyatları?', acceptedAnswer: { '@type': 'Answer', text: `Bel daraltma ₺150'den başlar. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Yerinde ölçü alma ve adrese teslim terzi servisi var mı?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Araçlı terzi servisimizle adresinize gelip yerinde ölçü alıyor, dikip tekrar adresinize teslim ediyoruz. Tüm Antalya ilçeleri. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Tişört, sweatshirt, pantolon, gömlek, mont, şort, gobi imalatı?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Tüm tekstil ürünlerinin özel dikimi ve seri imalatını yapıyoruz. Nakış ve baskı da mevcut. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Bay terzi Antalya — erkek kıyafet dikimi ve tadilatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Erkek takım elbise, pantolon kısaltma, gömlek dikimi, ceket tadilatı, blazer, smoking, damatlık. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Bayan terzi Antalya — kadın elbise dikimi ve tadilatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Kadın elbise, bluz, etek, abiye tamiri, gelinlik tadilatı, büyük beden. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Is there an English-speaking tailor in Antalya?', acceptedAnswer: { '@type': 'Answer', text: `Yes! Tailor Can speaks English, Russian and German. Alterations, custom tailoring, dry cleaning, mobile tailor. All Antalya. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Есть ли русскоязычный портной в Анталье?', acceptedAnswer: { '@type': 'Answer', text: `Да! Портной Кан обслуживает по-русски. Подгонка, пошив, химчистка, выездной сервис. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Kuru temizleme ve ütü hizmeti Antalya fiyatları?', acceptedAnswer: { '@type': 'Answer', text: `Kuru temizleme ₺300, mont ₺500, çamaşır ₺80/kg. Otelden kurye alım. 24 saat ekspres. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Eve veya otele gelen terzi Antalya hangi ilçelere gidiyor?', acceptedAnswer: { '@type': 'Answer', text: `Konyaaltı, Muratpaşa, Kepez, Lara, Belek, Kemer, Alanya, Manavgat, Side, Serik ve tüm Antalya ilçelerine geliyoruz. WhatsApp: ${PHONE}` } },
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
    'Antalya terzi','Konyaaltı terzi','terzi Antalya 2026','bay terzi Antalya','bayan terzi Antalya',
    'paça kısaltma Antalya','fermuar değişimi Antalya','bel daraltma Antalya','elbise daraltma Antalya',
    'özel dikim Antalya','yerinde ölçü alma Antalya','erkek takım elbise dikimi Antalya',
    'kadın elbise dikimi Antalya','gelinlik tadilatı Antalya','tişört imalatı Antalya',
    'sweatshirt dikimi Antalya','dikiş atölyesi Antalya','fason üretim Antalya',
    'eve gelen terzi Antalya','otele gelen terzi Antalya','üniforma üretimi Antalya',
    'kuru temizleme Antalya','tailor Antalya','English speaking tailor Antalya',
    'портной Анталья','Schneider Antalya','Belek terzi','Kemer terzi','Lara terzi',
    'yakınımda terzi','en yakın terzi','en yakın terzi ve kuru temizleme','terzi bul',
    'online terzi teklifi','terzi telefon numarası Antalya','acil terzi Antalya',
    'aynı gün teslim terzi Antalya','terzi ve dikim atölyesi','Türkiye terzi bul',
    'yakınımda kuru temizleme','yakınımda dikim atölyesi','terzi fiyatları 2026',
  ],
  authors: [{ name: 'SwapHubs', url: HOME_URL }],
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'tr': `${HOME_URL}/terzi`,
      'en': `${HOME_URL}/online-tailor-service`,
      'ru': `${HOME_URL}/ru/atelie-antalya`,
      'de': `${HOME_URL}/de/schneider-service-hotel-antalya`,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Terzi Can Antalya', type: 'image/jpeg' }],
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
    'business:contact_data:locality': 'Konyaaltı, Antalya',
    'place:location:latitude': '36.8851',
    'place:location:longitude': '30.6930',
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
      <TerziClient gbp1={GBP_1} />
    </>
  );
}
