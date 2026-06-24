import type { Metadata } from 'next';
import TerziClient from './TerziClient';

const SITE_URL  = 'https://swaphubs.com/terzi';
const HOME_URL  = 'https://swaphubs.com';
const PHONE     = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const TODAY     = new Date().toISOString().split('T')[0];
const GMAPS     = 'https://maps.app.goo.gl/rpgwjJgWZHfgafTy5';
const OG_IMG    = `${HOME_URL}/og/terzi-can.jpg`;

// ─── TITLE / DESCRIPTION ─────────────────────────────────────────────────────
// Hedef: tüm ana cluster'ları tek açıklama içinde taşımak
const PAGE_TITLE = 'Antalya Terzi Can · Bay & Bayan Terzi · Elbise Dikimi · Seri Üretim';
const PAGE_DESC  =
  'Konyaaltı Terzi Can: paça kısaltma ₺150, fermuar değişimi ₺120, bel & elbise daraltma, ' +
  'özel dikim, model tasarım, seri tişört/sweatshirt/gömlek/pantolon/mont imalatı, ' +
  'üniforma üretimi, kuru temizleme. Yerinde ölçü + adrese teslim. Tüm Antalya ilçeleri. ☎ ' + PHONE;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── WebSite ──────────────────────────────────────────────────────────────
    {
      '@type': 'WebSite',
      '@id': `${HOME_URL}#website`,
      name: 'SwapHubs', url: HOME_URL, inLanguage: 'tr',
      publisher: { '@type': 'Organization', '@id': `${HOME_URL}#organization`, name: 'SwapHubs', url: HOME_URL,
        logo: { '@type': 'ImageObject', url: `${HOME_URL}/logo.png`, width: 512, height: 512 } },
      potentialAction: { '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${HOME_URL}/ilanlar?q={search_term_string}` },
        'query-input': 'required name=search_term_string' },
    },

    // ── LocalBusiness ────────────────────────────────────────────────────────
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      additionalType: ['https://schema.org/SewingService', 'https://schema.org/DryCleaningService'],
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        'Tailor Can Antalya', 'Портной Кан Анталья', 'Schneider Can Antalya',
        'Konyaaltı Terzi Can', 'Bay Terzi Antalya', 'Bayan Terzi Antalya',
        'Dikiş Atölyesi Antalya', 'Erkek Terzi Antalya', 'Kadın Terzi Antalya',
        'Antalya Tişört Üretimi', 'Sweatshirt Dikimi Antalya', 'Tekstil İmalatı Antalya',
      ],
      description:
        "Antalya Konyaaltı'nda profesyonel bay & bayan terzisi ve tekstil atölyesi. " +
        "Elbise dikimi, beden ölçülerine göre özel & model dikim, kumaş seçimi & tasarım. " +
        "Paça kısaltma ₺150, fermuar değişimi ₺120, bel daraltma, elbise daraltma. " +
        "Tişört, sweatshirt, gömlek, pantolon, mont, şort, gobi seri imalatı. " +
        "Üniforma üretimi, nakış, kuru temizleme. " +
        "Yerinde ölçü alma; adresden alınıp adrese teslim terzi servisi. " +
        "Konyaaltı, Muratpaşa, Kepez, Lara, Belek, Kemer, Alanya, Manavgat, Side ve tüm Antalya.",
      url: SITE_URL,
      telephone: PHONE_E164,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [OG_IMG],
      logo: `${HOME_URL}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      hasMap: GMAPS,
      // ✅ YENİ: GeoCircle — "yakınımdaki terzi" mobil aramaları için kritik
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
        geoRadius: '75000',   // 75km: Alanya + Kaş dahil
      },
      // ✅ YENİ: dil sinyali
      knowsLanguage: ['tr', 'en', 'ru', 'de'],
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00', closes: '19:00',
      }],

      // ── Offer Kataloğu ── YENİ hizmetler eklendi ───────────────────────
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can — Hizmet & Fiyat Listesi 2025-2026',
        itemListElement: [
          // Tadilat cluster
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY', price: '150',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '150', maxPrice: '175', priceCurrency: 'TRY' },
            itemOffered: { '@type': 'Service', name: 'Paça Kısaltma — Pantolon Kısaltma Antalya',
              description: 'Erkek & bayan pantolon kısaltma, kot paça kısaltma, etek kısaltma. Aynı gün teslim mümkün.',
              url: `${HOME_URL}/terzi/paca-kisaltma-antalya`, areaServed: {name:'Antalya'} } },
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY', price: '120',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '120', maxPrice: '300', priceCurrency: 'TRY' },
            itemOffered: { '@type': 'Service', name: 'Fermuar Değişimi Antalya',
              description: 'Pantolon, kot, mont, ceket, sweatshirt, çanta fermuar değişimi. Aynı gün.',
              url: `${HOME_URL}/terzi/fermuar-degisimi-antalya`, areaServed: {name:'Antalya'} } },
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY', price: '180',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '180', priceCurrency: 'TRY' },
            itemOffered: { '@type': 'Service', name: 'Bel Daraltma & Elbise Daraltma Antalya',
              description: 'Bel daraltma, elbise daraltma, ceket daraltma, bluz daraltma. Kol kısaltma.',
              areaServed: {name:'Antalya'} } },
          // Bayan terzi
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY', price: '600',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '200', priceCurrency: 'TRY' },
            itemOffered: { '@type': 'Service', name: 'Bayan Terzi — Kadın Elbise Dikimi Antalya',
              description: 'Kadın elbise dikimi, bluz, etek, abiye tadilatı, gelinlik tadilatı. Özel ölçü.',
              url: `${HOME_URL}/terzi/bayan-terzi-antalya`, areaServed: {name:'Antalya'} } },
          // Bay terzi
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY', price: '2500',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '150', priceCurrency: 'TRY' },
            itemOffered: { '@type': 'Service', name: 'Bay Terzi — Erkek Takım Elbise Dikimi Antalya',
              description: 'Erkek takım elbise, gömlek dikimi, pantolon kısaltma, ceket tadilatı, smoking, damatlık.',
              url: `${HOME_URL}/terzi/bay-terzi-antalya`, areaServed: {name:'Antalya'} } },
          // Özel dikim / model
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY',
            itemOffered: { '@type': 'Service', name: 'Özel Dikim & Model Tasarım Antalya',
              description: 'Beden ölçülerine göre özel dikim, model tasarımı, kumaş seçimi, prova destekli dikim. Günlük, davetiye ve özel gün kıyafetleri.',
              areaServed: {name:'Antalya'} } },
          // Seri üretim tekstil
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '100', priceCurrency: 'TRY' },
            itemOffered: { '@type': 'Service',
              name: 'Seri Üretim — Tişört, Sweatshirt, Gömlek, Pantolon, Mont, Şort, Gobi Dikimi Antalya',
              description: 'Tişört seri üretimi, sweatshirt dikimi, gömlek imalatı, pantolon dikimi, mont dikimi, şort dikimi, gobi dikimi. Nakış + baskı + etiket. Markalar, butikler, e-ticaret.',
              url: `${HOME_URL}/terzi/dikis-atolyesi-antalya`, areaServed: {name:'Antalya'} } },
          // Dikiş atölyesi
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY',
            itemOffered: { '@type': 'Service', name: 'Dikiş Atölyesi & Fason Üretim Antalya',
              description: 'Kalıp çıkarma, numune dikimi, prototip, fason üretim, seri imalat, tekstil imalatı. Marka & e-ticaret için tam üretim paketi.',
              url: `${HOME_URL}/terzi/dikis-atolyesi-antalya`, areaServed: {name:'Antalya'} } },
          // Gelinlik
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY', price: '500',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '500', priceCurrency: 'TRY' },
            itemOffered: { '@type': 'Service', name: 'Gelinlik Tadilatı Antalya',
              description: 'Gelinlik daraltma, paça kısaltma, korse ayarlama, abiye tamiratı. Ekspres randevu.',
              url: `${HOME_URL}/terzi/gelinlik-tadilati-antalya`, areaServed: {name:'Antalya'} } },
          // Üniforma
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY',
            itemOffered: { '@type': 'Service', name: 'Üniforma Üretimi Antalya — Otel, Restoran, Okul',
              description: 'Otel personel, aşçı, garson, güvenlik, spa, okul üniforması. Tasarım + kalıp + seri imalat + nakış.',
              url: `${HOME_URL}/terzi/uniforma-uretimi-antalya`, areaServed: {name:'Antalya'} } },
          // Kuru temizleme
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY', price: '300',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '300', maxPrice: '500', priceCurrency: 'TRY' },
            itemOffered: { '@type': 'Service', name: 'Kuru Temizleme & Ütü Hizmeti Antalya',
              description: 'Kuru temizleme, çamaşır yıkama, ütü. Otelden kurye alım. 24 saat ekspres.',
              url: `${HOME_URL}/terzi/kuru-temizleme-antalya`, areaServed: {name:'Antalya'} } },
          // Eve/otele gelen + adrese teslim
          { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'TRY',
            itemOffered: { '@type': 'Service', name: 'Yerinde Ölçü + Adrese Teslim Terzi Servisi Antalya',
              description: 'Yerinde ölçü alma, adresden alınıp adrese teslim terzi servisi. Konyaaltı, Lara, Belek, Kemer, Alanya, Manavgat, Side dahil tüm Antalya ilçeleri.',
              url: `${HOME_URL}/terzi/eve-gelen-terzi-antalya`,
              areaServed: ['Antalya','Konyaaltı','Muratpaşa','Kepez','Lara','Belek','Kemer',
                'Alanya','Manavgat','Side','Serik','Döşemealtı','Gazipaşa','Kaş','Finike'].map(n=>({name:n})) } },
        ],
      },

      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '94', bestRating: '5', worstRating: '1' },
      review: [
        { '@type': 'Review', author: { '@type': 'Person', name: 'Murat B.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi!', datePublished: '2025-01-15',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` } },
        { '@type': 'Review', author: { '@type': 'Person', name: 'Sarah M.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit!', datePublished: '2025-05-10',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` } },
        { '@type': 'Review', author: { '@type': 'Person', name: 'Наталья К.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили в отель!', datePublished: '2025-06-20',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` } },
        { '@type': 'Review', author: { '@type': 'Person', name: 'David K.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: '30 Stück bestickte Sweatshirts, pünktlich geliefert. Ausgezeichnete Qualität!', datePublished: '2025-02-08',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` } },
        { '@type': 'Review', author: { '@type': 'Person', name: 'Elif Y.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Gelinliğimi mükemmel teslim ettiler. Paça kısaltmayı aynı gün yaptılar!', datePublished: '2025-04-10',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` } },
        { '@type': 'Review', author: { '@type': 'Person', name: 'James T.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Suit altered for a business meeting in 24h. Perfect fit. Best tailor in Antalya!', datePublished: '2025-03-15',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` } },
      ],

      // ✅ GENİŞLETİLDİ: Tüm Antalya ilçeleri
      areaServed: [
        'Antalya','Konyaaltı','Muratpaşa','Kepez','Lara','Aksu','Belek','Kemer',
        'Alanya','Manavgat','Side','Serik','Döşemealtı','Kadriye','Boğazkent',
        'Gazipaşa','Kaş','Finike','Kumluca','Elmalı','Akseki','İbradı','Gündoğmuş','Demre',
      ].map(n => ({ '@type': 'City', name: n })),

      contactPoint: [{
        '@type': 'ContactPoint', telephone: PHONE_E164, contactType: 'customer service', areaServed: 'TR',
        availableLanguage: ['Turkish','English','Russian','German'],
        hoursAvailable: { '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '09:00', closes: '19:00' },
      }],
      sameAs: [ GMAPS, `https://wa.me/${PHONE_E164.replace('+','')}`, SITE_URL ],
    },

    // ── WebPage ──────────────────────────────────────────────────────────────
    {
      '@type': 'WebPage', '@id': `${SITE_URL}#webpage`,
      name: PAGE_TITLE, url: SITE_URL,
      isPartOf: { '@id': `${HOME_URL}#website` },
      about: { '@id': `${SITE_URL}#business` },
      description: PAGE_DESC,
      inLanguage: ['tr','en','de','ru'],
      datePublished: '2024-01-01', dateModified: TODAY, lastReviewed: TODAY,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      speakable: { '@type': 'SpeakableSpecification',
        cssSelector: ['#hizmet-fiyatlari','#sik-sorulan-sorular','#terzi-can-ozet'] },
      mainEntity: { '@id': `${SITE_URL}#business` },
    },

    // ── BreadcrumbList ───────────────────────────────────────────────────────
    {
      '@type': 'BreadcrumbList', '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME_URL },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi', item: SITE_URL },
      ],
    },

    // ── FAQPage — genişletilmiş, tüm cluster'ları kapsıyor ──────────────────
    {
      '@type': 'FAQPage', '@id': `${SITE_URL}#faq`,
      mainEntity: [
        { '@type': 'Question', name: 'Antalya paça kısaltma ve pantolon kısaltma fiyatı 2025-2026?',
          acceptedAnswer: { '@type': 'Answer', text: `₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175. Aynı gün teslim. WhatsApp ${PHONE}` } },
        { '@type': 'Question', name: 'Bay terzi Antalya — erkek takım elbise dikimi?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Erkek takım elbise, gömlek, ceket, pantolon kısaltma, kol kısaltma, smoking, damatlık. WhatsApp ${PHONE}` } },
        { '@type': 'Question', name: 'Bayan terzi Antalya — kadın elbise dikimi?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Kadın elbise dikimi, bluz, etek, abiye tamiri, gelinlik tadilatı, büyük beden. WhatsApp ${PHONE}` } },
        { '@type': 'Question', name: 'Bel daraltma ve elbise daraltma fiyatı Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Bel daraltma ₺180'den, elbise daraltma ₺200'den başlar. Kol kısaltma ₺200. Fotoğraf gönderin, 30 dk'da fiyat. WhatsApp ${PHONE}` } },
        { '@type': 'Question', name: 'Özel dikim ve model tasarım Antalya — beden ölçülerine göre dikim?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Beden ölçülerine göre özel dikim, model tasarımı, kumaş seçimi yapıyoruz. Prova ile mükemmel uyum garantisi. WhatsApp ${PHONE}` } },
        { '@type': 'Question', name: 'Tişört, sweatshirt, gömlek, pantolon, mont, şort, gobi seri üretimi Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Tişört, sweatshirt, gömlek, pantolon, mont, şort, gobi seri dikimi yapıyoruz. Nakış + baskı + etiket dahil. Markalar ve e-ticaret için tam tekstil imalatı. WhatsApp ${PHONE}` } },
        { '@type': 'Question', name: 'Fermuar değişimi fiyatı Antalya 2025-2026?',
          acceptedAnswer: { '@type': 'Answer', text: `Pantolon/kot ₺120, ceket ₺200, mont ₺300. Aynı gün teslim mümkün. WhatsApp ${PHONE}` } },
        { '@type': 'Question', name: 'Yerinde ölçü alma ve adrese teslim terzi servisi Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Adresinize gelip yerinde ölçü alıyoruz, dikip adresinize teslim ediyoruz. Konyaaltı, Lara, Belek, Kemer, Alanya, Manavgat, Side dahil tüm Antalya. WhatsApp ${PHONE}` } },
        { '@type': 'Question', name: 'Dikiş atölyesi — fason üretim, tekstil imalatı, seri imalat Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Kalıp çıkarma, numune dikimi, prototip, fason tekstil imalatı, seri üretim. Marka ve butikler için. WhatsApp ${PHONE}` } },
        { '@type': 'Question', name: 'Kuru temizleme ve ütü hizmeti fiyatı Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Kuru temizleme ₺300, mont ₺500, çamaşır ₺80/kg. Otelden kurye alım. 24 saat ekspres. WhatsApp ${PHONE}` } },
        { '@type': 'Question', name: 'Is there a tailor near me in Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Yes! Tailor Can covers all Antalya districts with mobile tailor service. Alterations, custom tailoring, uniform production, dry cleaning. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Есть ли портной рядом в Анталье?',
          acceptedAnswer: { '@type': 'Answer', text: `Да! Портной Кан работает по всей Анталье. Подгонка, химчистка, пошив на заказ, выездной сервис. WhatsApp: ${PHONE}` } },
      ],
    },

    // ── HowTo ────────────────────────────────────────────────────────────────
    {
      '@type': 'HowTo', '@id': `${SITE_URL}#howto-olcu`,
      name: 'Yerinde Ölçü Alma Süreci — Terzi Can Antalya',
      description: 'Adresde ölçü alıp teslim eden terzi servisinden nasıl yararlanılır.',
      totalTime: 'PT10M',
      step: [
        { '@type': 'HowToStep', name: 'WhatsApp\'tan Yazın', text: `Kıyafet fotoğrafı + adresinizi ${PHONE} numaralı WhatsApp'a gönderin. 30 dk içinde fiyat ve randevu.` },
        { '@type': 'HowToStep', name: 'Terzi Adresinize Gelir', text: 'Belirlenen saatte terzimiz adresinize gelir, yerinde ölçü alır ve kıyafeti atölyeye götürür.' },
        { '@type': 'HowToStep', name: 'Dikip Adresinize Teslim', text: 'Kıyafet ölçüye göre dikilir veya tadilat yapılır. Ütülenmiş olarak adresinize teslim edilir.' },
      ],
    },

    // ── ItemList ─────────────────────────────────────────────────────────────
    {
      '@type': 'ItemList', '@id': `${SITE_URL}#hizmet-listesi`,
      name: 'Terzi Can — Tüm Hizmetler Antalya',
      itemListElement: [
        { '@type': 'ListItem', position: 1,  name: 'Bay Terzi — Erkek Kıyafet Dikimi',      url: `${HOME_URL}/terzi/bay-terzi-antalya` },
        { '@type': 'ListItem', position: 2,  name: 'Bayan Terzi — Kadın Elbise Dikimi',     url: `${HOME_URL}/terzi/bayan-terzi-antalya` },
        { '@type': 'ListItem', position: 3,  name: 'Paça Kısaltma',                          url: `${HOME_URL}/terzi/paca-kisaltma-antalya` },
        { '@type': 'ListItem', position: 4,  name: 'Dikiş Atölyesi & Seri Üretim',          url: `${HOME_URL}/terzi/dikis-atolyesi-antalya` },
        { '@type': 'ListItem', position: 5,  name: 'Üniforma Üretimi',                       url: `${HOME_URL}/terzi/uniforma-uretimi-antalya` },
        { '@type': 'ListItem', position: 6,  name: 'Kuru Temizleme',                         url: `${HOME_URL}/terzi/kuru-temizleme-antalya` },
        { '@type': 'ListItem', position: 7,  name: 'Yerinde Ölçü + Adrese Teslim',          url: `${HOME_URL}/terzi/eve-gelen-terzi-antalya` },
        // ✅ DÜZELTİLDİ: gelinlik-tadilati-antalya
        { '@type': 'ListItem', position: 8,  name: 'Gelinlik Tadilatı',                      url: `${HOME_URL}/terzi/gelinlik-tadilati-antalya` },
        { '@type': 'ListItem', position: 9,  name: 'Fermuar Değişimi',                       url: `${HOME_URL}/terzi/fermuar-degisimi-antalya` },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: {
    default: PAGE_TITLE,
    template: '%s | Terzi Can Antalya',
  },
  description: PAGE_DESC,
  keywords: [
    // Tadilat cluster
    'Antalya terzi','Konyaaltı terzi','paça kısaltma Antalya','pantolon kısaltma Antalya',
    'fermuar değişimi Antalya','bel daraltma Antalya','elbise daraltma Antalya',
    'kol kısaltma Antalya','etek kısaltma Antalya','yırtık onarımı Antalya',
    // Bay/Bayan terzi
    'bay terzi Antalya','bayan terzi Antalya','erkek takım elbise dikimi Antalya',
    'kadın elbise dikimi Antalya','erkek gömlek dikimi','erkek pantolon dikimi',
    // Özel dikim
    'özel dikim Antalya','model dikim Antalya','beden ölçülerine göre dikim',
    'kumaş seçimi dikim Antalya','prova destekli dikim',
    // Tekstil imalatı / seri üretim
    'tişört seri üretimi Antalya','sweatshirt dikimi Antalya','gömlek imalatı Antalya',
    'pantolon dikimi Antalya','mont dikimi Antalya','şort dikimi Antalya',
    'gobi dikimi Antalya','tekstil imalatı Antalya','fason üretim Antalya',
    'seri üretim Antalya','nakış Antalya','logo baskı Antalya',
    // Servis
    'yerinde ölçü alma Antalya','adrese teslim terzi Antalya',
    'eve gelen terzi Antalya','otele gelen terzi Antalya','araçlı terzi servisi',
    // Diğer hizmetler
    'gelinlik tadilatı Antalya','abiye tamiri Antalya','üniforma dikimi Antalya',
    'kuru temizleme Antalya','dikiş atölyesi Antalya',
    // Lokasyon
    'Lara terzi','Belek terzi','Kemer terzi','Alanya terzi','Manavgat terzi','Side terzi',
    // Çok dilli
    'tailor Antalya','tailor near me Antalya','dry cleaning Antalya',
    'Schneider Antalya','портной Анталья','химчистка Анталья',
    // Fiyat
    'paça kısaltma fiyatı 2026','terzi fiyatları 2026',
  ],
  authors: [{ name: 'SwapHubs', url: HOME_URL }],
  creator: 'SwapHubs', publisher: 'SwapHubs',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { 'x-default': SITE_URL, tr: SITE_URL },
  },
  openGraph: {
    title: PAGE_TITLE, description: PAGE_DESC,
    url: SITE_URL, siteName: 'SwapHubs', locale: 'tr_TR',
    alternateLocale: ['en_US','de_DE','ru_RU'], type: 'website',
    images: [{ url: OG_IMG, width: 1200, height: 630,
      alt: 'Terzi Can Antalya — Elbise Dikimi, Tadilat, Seri Üretim, Kuru Temizleme', type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image', site: '@swaphubs', creator: '@swaphubs',
    title: PAGE_TITLE, description: PAGE_DESC, images: [OG_IMG],
  },
  other: {
    'geo.region': 'TR-07', 'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056', ICBM: '36.8841, 30.7056',
    'content-language': 'tr, en, ru, de', contact: PHONE,
  },
  verification: {
    yandex: '4c73ee1911a4b197',
    other: { 'msvalidate.01': 'EE22134B7D1B55A44BA700154371D5C3' },
  },
};

export default function TerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TerziClient />
    </>
  );
}
