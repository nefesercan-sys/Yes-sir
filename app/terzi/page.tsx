// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: app/terzi/page.tsx
// DÜZELTİLDİ:
//  1. title.template KALDIRILDI — layout.tsx "%s" şablonunu eziyor, title çakışıyordu
//  2. Her iki Google Business profili sameAs'a eklendi (duplicate listing sinyali birleşti)
//  3. MAPS_URL standardize edildi — her iki CID'i de içeriyor
//  4. TerziClient SSR-compatible olacak şekilde import edildi
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import TerziClient from './TerziClient';

const SITE_URL    = 'https://swaphubs.com/terzi';
const HOME_URL    = 'https://swaphubs.com';
const PHONE       = '+90 531 898 64 18';
const PHONE_E164  = '+905318986418';
const TODAY       = new Date().toISOString().split('T')[0];

// ── Google Business — İKİ PROFİL ──────────────────────────────────────────────
// export KALDIRILDI — Next.js page.tsx'ten sadece metadata/generateMetadata/default export edilebilir
// GBP verileri TerziClient'a prop olarak geçiliyor
// Profil 1 → Liman Mah. "Konyaaltı Terzi - Terzi Dikim Tamir Tadilat"
const GBP_1 = {
  cid:   '1496201377277644027',
  short: 'https://maps.app.goo.gl/i73c4xKZwr7uaSjbA',
  maps:  'https://www.google.com/maps?cid=1496201377277644027',
  embed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12763.2!2d30.7056!3d36.8841!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39339b5158cfb%3A0xeaaa1afa8df430c0!2sKonyaalt%C4%B1+Terzi+-+Terzi+Dikim+Tamir+Tadilat!5e0!3m2!1str!2str!4v1',
  review:'https://search.google.com/local/writereview?placeid=ChIJ-4wVtTmTwxQRwDB9jfqqquoA',
  name:  'Konyaaltı Terzi - Terzi Dikim Tamir Tadilat',
  addr:  'Liman Mahallesi, Konyaaltı / Antalya',
};
// Profil 2 → Hurma "ANTALYA TERZİ CAN - TAILOR"
const GBP_2 = {
  cid:   '1496201834409914715',
  short: 'https://maps.app.goo.gl/rpgwjJgWZHfgafTy5',
  maps:  'https://www.google.com/maps?cid=1496201834409914715',
  embed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12763.2!2d30.6982!3d36.8923!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c393a4244a715b%3A0x66ac5fa54fba4507!2sANTALYA+TERZ%C4%B0+CAN+-+TAILOR!5e0!3m2!1str!2str!4v1',
  review:'https://search.google.com/local/writereview?placeid=ChIJW3FKJKSTwxQRB0W6T6X1rGY',
  name:  'ANTALYA TERZİ CAN - TAILOR',
  addr:  'Hurma, 37. Cd No:50, Bahtılı Köyü, Konyaaltı / Antalya',
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
      '@type': 'WebSite',
      '@id': `${HOME_URL}#website`,
      name: 'SwapHubs',
      url: HOME_URL,
      inLanguage: ['tr','en','ru','de'],
      publisher: {
        '@type': 'Organization',
        '@id': `${HOME_URL}#organization`,
        name: 'SwapHubs',
        url: HOME_URL,
        logo: { '@type': 'ImageObject', url: `${HOME_URL}/logo.png`, width: 512, height: 512 },
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${HOME_URL}/ilanlar?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },

    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      additionalType: [
        'https://schema.org/SewingService',
        'https://schema.org/DryCleaningService',
      ],
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
        GBP_2.name,
      ],
      description:
        "Antalya Konyaaltı'nda profesyonel bay ve bayan terzisi. Paça kısaltma, fermuar değişimi, bel daraltma, elbise dikimi, özel dikim, tişört-sweatshirt-pantolon imalatı, üniforma üretimi, kuru temizleme. Tüm Antalya ilçelerine araçlı terzi servisi.",
      url: SITE_URL,
      telephone: PHONE_E164,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [OG_IMAGE],
      logo: `${HOME_URL}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hurma Mah. / Liman Mah., Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      // ── İKİ PROFİL — hasMap + sameAs ──────────────────────────────────────
      hasMap: GBP_1.maps,
      sameAs: [
        GBP_1.short, GBP_1.maps,   // Profil 1 — Liman
        GBP_2.short, GBP_2.maps,   // Profil 2 — Hurma
        `https://wa.me/${PHONE_E164.replace('+','')}`,
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
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Üniforma Üretimi', areaServed: ANTALYA_ILCELER }, priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Eve / Otele Gelen Terzi Servisi', areaServed: ANTALYA_ILCELER }, priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9', reviewCount: '94', bestRating: '5', worstRating: '1',
        itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
      },
      review: [
        { '@type': 'Review', name: 'Üniforma Üretimi — Mükemmel', author: { '@type': 'Person', name: 'Murat B.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Otelimiz için 45 kişilik personel üniforması diktirdik. Zamanında teslim, mükemmel kalite!', datePublished: '2025-01-15', itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' } },
        { '@type': 'Review', name: 'Best Tailor in Antalya', author: { '@type': 'Person', name: 'Sarah M.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Amazing tailor! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional!', datePublished: '2025-05-10', itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' } },
        { '@type': 'Review', name: 'Лучший портной в Анталье', author: { '@type': 'Person', name: 'Наталья К.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили в отель!', datePublished: '2025-06-20', itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' } },
        { '@type': 'Review', name: 'Ausgezeichnete Qualität', author: { '@type': 'Person', name: 'David K.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: '30 Stück Sweatshirts mit Stickerei — pünktlich geliefert. Ausgezeichnete Qualität!', datePublished: '2025-02-08', itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' } },
        { '@type': 'Review', name: 'Hızlı ve Kaliteli', author: { '@type': 'Person', name: 'Elif Y.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Gelinliğimi mükemmel teslim ettiler. Paça kısaltmayı aynı gün yaptılar!', datePublished: '2025-04-10', itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' } },
        { '@type': 'Review', name: 'Perfect English-Speaking Tailor', author: { '@type': 'Person', name: 'James T.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Suit altered for a business meeting in 24h. Best English-speaking tailor in Antalya!', datePublished: '2025-03-15', itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' } },
      ],
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
      inLanguage: ['tr','en','de','ru'],
      datePublished: '2024-01-01',
      dateModified: TODAY,
      lastReviewed: TODAY,
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
        { '@type': 'ListItem', position: 1, name: 'Bay Terzi — Erkek Kıyafet Dikimi',      url: `${HOME_URL}/terzi/bay-terzi-antalya` },
        { '@type': 'ListItem', position: 2, name: 'Bayan Terzi — Kadın Elbise Dikimi',     url: `${HOME_URL}/terzi/bayan-terzi-antalya` },
        { '@type': 'ListItem', position: 3, name: 'Paça Kısaltma',                          url: `${HOME_URL}/terzi/paca-kisaltma-antalya` },
        { '@type': 'ListItem', position: 4, name: 'Dikiş Atölyesi — Fason ve Seri Üretim', url: `${HOME_URL}/terzi/dikis-atolyesi-antalya` },
        { '@type': 'ListItem', position: 5, name: 'Üniforma Üretimi',                       url: `${HOME_URL}/terzi/uniforma-uretimi-antalya` },
        { '@type': 'ListItem', position: 6, name: 'Kuru Temizleme ve Ütü',                  url: `${HOME_URL}/terzi/kuru-temizleme-antalya` },
        { '@type': 'ListItem', position: 7, name: 'Eve / Otele Gelen Terzi',                url: `${HOME_URL}/terzi/eve-gelen-terzi-antalya` },
        { '@type': 'ListItem', position: 8, name: 'Fermuar Değişimi',                       url: `${HOME_URL}/terzi/fermuar-degisimi-antalya` },
        { '@type': 'ListItem', position: 9, name: 'Gelinlik Tadilatı',                      url: `${HOME_URL}/terzi/gelinlik-tadilati-antalya` },
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
// DÜZELTİLDİ: title.template KALDIRILDI
// layout.tsx zaten template:"%s" tanımlıyor — burada tekrar tanımlamak onu eziyor
// ve "/terzi/paca-kisaltma-antalya" gibi alt sayfalarda yanlış title üretiyor
export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: PAGE_TITLE,   // ← sadece string, template yok
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
  ],
  authors: [{ name: 'SwapHubs', url: HOME_URL }],
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { 'x-default': SITE_URL, 'tr': SITE_URL, 'en': SITE_URL, 'ru': SITE_URL, 'de': SITE_URL },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    alternateLocale: ['en_US','de_DE','ru_RU'],
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
    'geo.position': '36.8841;30.7056',
    ICBM: '36.8841, 30.7056',
    'content-language': 'tr, en, ru, de',
    // İKİ PROFİL — meta tag olarak da tanımla
    'business:contact_data:locality': 'Konyaaltı, Antalya',
    'place:location:latitude': '36.8841',
    'place:location:longitude': '30.7056',
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
      <TerziClient gbp1={GBP_1} gbp2={GBP_2} />
    </>
  );
}
