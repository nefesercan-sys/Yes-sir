import type { Metadata } from 'next';
import TerziClient from './TerziClient';

const SITE_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const TODAY = new Date().toISOString().split('T')[0];

const PAGE_TITLE = 'Antalya Terzi Can — Bay & Bayan Terzi, Özel Dikim, Tadilat, Dikiş Atölyesi 2026';
const PAGE_DESCRIPTION =
  'Konyaaltı Terzi Can: paça kısaltma ₺150, fermuar değişimi ₺150, bel daraltma, elbise dikimi, özel dikim, tisört-sweatshirt-pantolon imalatı, üniforma üretimi, kuru temizleme. Eve & otele araçlı terzi servisi. Tüm Antalya ilçeleri. ☎ ' + PHONE;

const OG_IMAGE_URL = `${HOME_URL}/og/terzi-can.jpg`;
const MAPS_URL = 'https://maps.app.goo.gl/rpgwjJgWZHfgafTy5';

// Tüm Antalya ilçeleri + mahalleler — areaServed için kapsamlı liste
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
      ],
      description:
        "Antalya Konyaaltı'nda profesyonel bay ve bayan terzisi. Paça kısaltma ₺150, fermuar değişimi ₺120, bel daraltma, elbise daraltma, özel dikim, yerinde ölçü alma, beden ölçüsüne göre tasarım. Tişört, sweatshirt, pantolon, gömlek, mont, şort, gobi tekstil imalatı. Üniforma üretimi, seri imalat, dikiş atölyesi. Kuru temizleme ve ütü. Tüm Antalya ilçelerine araçlı terzi servisi.",
      url: SITE_URL,
      telephone: PHONE_E164,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [OG_IMAGE_URL],
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
      hasMap: MAPS_URL,
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00',
        closes: '19:00',
      }],

      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can — Tüm Terzilik ve Tekstil Hizmetleri 2026',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Paça Kısaltma — Pantolon & Kot Kısaltma Antalya',
              description: 'Erkek ve bayan pantolon kısaltma, kot paça kısaltma, kumaş pantolon kısaltma. Aynı gün veya 24 saat teslim.',
              areaServed: ANTALYA_ILCELER,
            },
            price: '150', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '150', maxPrice: '200', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fermuar Değişimi — Pantolon, Kot, Mont, Ceket Antalya',
              description: 'Pantolon, kot, mont, ceket, sweatshirt, çanta fermuar değişimi ve tamiri. Aynı gün teslim.',
              areaServed: ANTALYA_ILCELER,
            },
            price: '120', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '120', maxPrice: '350', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bel Daraltma — Elbise Daraltma — Kısaltma Antalya',
              description: 'Elbise bel daraltma, pantolon bel daraltma, ceket daraltma, kol kısaltma, etek kısaltma. Profesyonel tadilat.',
              areaServed: ANTALYA_ILCELER,
            },
            price: '200', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '150', maxPrice: '400', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Özel Dikim — Beden Ölçüsüne Göre Tasarım ve Model Dikimi',
              description: 'Kişiye özel ölçü alımı, model tasarımı, yerinde ölçü alma. Elbise, takım elbise, gömlek, bluz özel dikim.',
              areaServed: ANTALYA_ILCELER,
            },
            price: '600', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '400', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Tekstil İmalatı — Tişört, Sweatshirt, Pantolon, Gömlek, Mont, Şort, Gobi Dikimi',
              description: 'Tişört imalatı, sweatshirt dikimi, pantolon imalatı, gömlek dikimi, mont dikimi, şort imalatı, gobi üretimi. Seri üretim ve tekli sipariş.',
              areaServed: [{ '@type': 'Country', name: 'Turkey' }],
            },
            price: '150', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '100', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bay Terzi — Erkek Takım Elbise ve Kıyafet Dikimi Antalya',
              description: 'Erkek takım elbise dikimi, erkek pantolon dikimi, gömlek dikimi, ceket tadilatı, smoking, damatlık. Özel ölçü erkek kıyafet.',
              areaServed: ANTALYA_ILCELER,
            },
            price: '2500', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '150', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bayan Terzi — Kadın Elbise Dikimi ve Tadilatı Antalya',
              description: 'Kadın elbise dikimi, bluz, etek, abiye tamiri, gelinlik tadilatı, büyük beden, bebek elbisesi.',
              areaServed: ANTALYA_ILCELER,
            },
            price: '600', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '200', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Eve / Otele Gelen Terzi — Yerinde Ölçü Alma — Adrese Teslim',
              description: 'Araçlı terzi servisi: adrese gidip yerinde ölçü alma, dikip adrese teslim etme. Konyaaltı, Lara, Belek, Kemer, Alanya, Manavgat, Side, Kepez, Döşemealtı, Aksu, Serik dahil tüm Antalya.',
              areaServed: ANTALYA_ILCELER,
            },
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Dikiş Atölyesi Antalya — Fason Üretim ve Seri İmalat',
              description: 'Kalıp çıkarma, fason üretim, seri imalat, numune dikimi, prototip. Markalar ve butikler için tam üretim paketi.',
              areaServed: [{ '@type': 'Country', name: 'Turkey' }],
            },
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Üniforma Üretimi Antalya — Otel, Restoran, Okul, Güvenlik',
              description: 'Otel, resepsiyon, aşçı, garson, güvenlik, spa, okul, doktor üniforma üretimi. Tasarım + kalıp + seri imalat + nakış.',
              areaServed: ANTALYA_ILCELER,
            },
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Gelinlik Tadilatı Antalya',
              description: 'Gelinlik daraltma, kısaltma, korse sıkma, gelinlik tadilat. Ekspres randevu. Nisan–Ekim düğün sezonu.',
              areaServed: ANTALYA_ILCELER,
            },
            price: '500', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '400', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Kuru Temizleme ve Ütü Hizmeti Antalya — Otel Servis',
              description: 'Kuru temizleme, çamaşır yıkama, profesyonel ütü. Otelden kurye alım ve teslimat. 24 saat ekspres.',
              areaServed: ANTALYA_ILCELER,
            },
            price: '300', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '80', maxPrice: '500', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Nakış, Logo Baskı, Sweatshirt ve Tişört Seri Dikimi',
              description: 'Logo nakışı, isim nakışı, dijital baskı, serigrafi. Sweatshirt, tişört, eşofman, kapüşonlu, polo, gobi seri üretim.',
              areaServed: [{ '@type': 'Country', name: 'Turkey' }],
            },
            price: '100', priceCurrency: 'TRY',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: '80', priceCurrency: 'TRY' },
            availability: 'https://schema.org/InStock',
          },
        ],
      },

      // ✅ aggregateRating + itemReviewed
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
        itemReviewed: {
          '@type': 'LocalBusiness',
          name: 'Terzi Can',
          '@id': `${SITE_URL}#business`,
        },
      },
      review: [
        {
          '@type': 'Review',
          name: 'Üniforma Üretimi — Mükemmel Hizmet',
          author: { '@type': 'Person', name: 'Murat B.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim!',
          datePublished: '2025-01-15',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Best Tailor in Antalya',
          author: { '@type': 'Person', name: 'Sarah M.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional!',
          datePublished: '2025-05-10',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Лучший портной в Анталье',
          author: { '@type': 'Person', name: 'Наталья К.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель!',
          datePublished: '2025-06-20',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Ausgezeichnete Qualität',
          author: { '@type': 'Person', name: 'David K.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: '30 Stück Sweatshirts mit Stickerei — pünktlich geliefert. Ausgezeichnete Qualität!',
          datePublished: '2025-02-08',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Hızlı Paça Kısaltma ve Gelinlik Tadilatı',
          author: { '@type': 'Person', name: 'Elif Y.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Gelinliğimi mükemmel teslim ettiler. Paça kısaltmayı aynı gün yaptılar. Hızlı ve kaliteli hizmet!',
          datePublished: '2025-04-10',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Perfect English-Speaking Tailor',
          author: { '@type': 'Person', name: 'James T.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Suit altered for a business meeting in 24h. Perfect fit. Best English-speaking tailor in Antalya!',
          datePublished: '2025-03-15',
          itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
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
          opens: '09:00',
          closes: '19:00',
        },
      }],
      sameAs: [MAPS_URL, `https://wa.me/${PHONE_E164.replace('+','')}`],
    },

    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: PAGE_TITLE,
      url: SITE_URL,
      isPartOf: { '@id': `${HOME_URL}#website` },
      about: { '@id': `${SITE_URL}#business` },
      description: PAGE_DESCRIPTION,
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
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi', item: SITE_URL },
      ],
    },

    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya paça kısaltma ve pantolon kısaltma fiyatı 2026?',
          acceptedAnswer: { '@type': 'Answer', text: `Paça kısaltma ₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175. Etek kısaltma ₺150. Aynı gün veya 24 saat teslim. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Fermuar değişimi kaç lira? Mont, kot, pantolon fermuarı Antalya 2026?',
          acceptedAnswer: { '@type': 'Answer', text: `Pantolon/kot fermuarı ₺120, ceket ₺200, mont ₺300-350. Sweatshirt ve çanta fermuarı da değiştiriyoruz. Aynı gün teslim mümkün. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Bel daraltma ve elbise daraltma Antalya fiyatları?',
          acceptedAnswer: { '@type': 'Answer', text: `Elbise/pantolon bel daraltma ₺200'den, ceket daraltma ₺250'den başlar. Kol kısaltma ₺200. Görünmez dikiş tekniği. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Yerinde ölçü alma ve adrese teslim terzi servisi var mı?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Araçlı terzi servisimizle adresinize gelip yerinde ölçü alıyor, dikip tekrar adresinize teslim ediyoruz. Otel, ev, iş yeri. Tüm Antalya ilçeleri. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Tişört, sweatshirt, pantolon, gömlek, mont, şort, gobi imalatı yapıyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Tişört, sweatshirt, pantolon, gömlek, mont, şort, gobi ve tüm tekstil ürünlerinin özel dikimi ve seri imalatını yapıyoruz. Nakış ve baskı da mevcut. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Beden ölçüsüne göre özel dikim ve model tasarımı yapıyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Kişiye özel ölçü alımı, model tasarımı ve dikim yapıyoruz. Fotoğraf veya eskiz gönderin, hayalinizdeki kıyafeti dikiyoruz. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Bay terzi Antalya — erkek kıyafet dikimi ve tadilatı 2026?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Erkek takım elbise, pantolon kısaltma, gömlek dikimi, ceket tadilatı, kol kısaltma, blazer, smoking, damatlık. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Bayan terzi Antalya — kadın elbise dikimi ve tadilatı 2026?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Kadın elbise dikimi, bluz, etek kısaltma, abiye tamiri, gelinlik tadilatı, büyük beden, bebek elbisesi. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Dikiş atölyesi Antalya — fason üretim ve seri imalat?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Kalıp çıkarma, fason üretim, seri imalat, numune dikimi. Markalar için tam paket. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Eve veya otele gelen terzi Antalya hangi ilçelere gidiyor?',
          acceptedAnswer: { '@type': 'Answer', text: `Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Aksu, Lara, Belek, Kemer, Alanya, Manavgat, Side, Serik, Kaş, Finike dahil tüm Antalya ilçelerine geliyoruz. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Kuru temizleme ve ütü hizmeti Antalya fiyatları?',
          acceptedAnswer: { '@type': 'Answer', text: `Kuru temizleme ₺300, mont ₺500, çamaşır/ütü ₺80/kg'dan. Otelden kurye alım. 24 saat ekspres. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Is there an English-speaking tailor in Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Yes! Tailor Can speaks English, Russian and German. Alterations, custom tailoring, dry cleaning, uniform production, mobile tailor. All Antalya. WhatsApp: ${PHONE}.` },
        },
        {
          '@type': 'Question',
          name: 'Есть ли русскоязычный портной в Анталье?',
          acceptedAnswer: { '@type': 'Answer', text: `Да! Портной Кан обслуживает по-русски. Подгонка, пошив на заказ, химчистка, выездной сервис по всей Анталье. WhatsApp: ${PHONE}.` },
        },
      ],
    },

    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}#howto-olcu`,
      name: 'Terzi Can ile Yerinde Ölçü Alma Nasıl Çalışır?',
      description: 'Araçlı terzi servisimizle adresinizde ölçü alma ve teslimat süreci.',
      totalTime: 'PT30M',
      step: [
        { '@type': 'HowToStep', name: 'WhatsApp ile iletişim', text: `WhatsApp ${PHONE} üzerinden adresinizi ve ne tür terzilik hizmeti istediğinizi bildirin.` },
        { '@type': 'HowToStep', name: 'Terzi adresinize gelir', text: 'Anlaşılan saatte terzimiz Antalya içinde adresinize gelir, yerinde ölçü alır.' },
        { '@type': 'HowToStep', name: 'Atölyede dikilir', text: 'Ölçülere göre kıyafetiniz atölyemizde özenle dikilir veya tadilatı yapılır.' },
        { '@type': 'HowToStep', name: 'Adresinize teslim', text: 'Tamamlanan kıyafet anlaşılan vakitte adresinize teslim edilir.' },
      ],
    },

    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}#hizmet-listesi`,
      name: 'Terzi Can Hizmetleri — Antalya Terzi 2026',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Bay Terzi — Erkek Kıyafet Dikimi',        url: `${HOME_URL}/terzi/bay-terzi-antalya` },
        { '@type': 'ListItem', position: 2, name: 'Bayan Terzi — Kadın Elbise Dikimi',        url: `${HOME_URL}/terzi/bayan-terzi-antalya` },
        { '@type': 'ListItem', position: 3, name: 'Paça Kısaltma — Pantolon Kısaltma',        url: `${HOME_URL}/terzi/paca-kisaltma-antalya` },
        { '@type': 'ListItem', position: 4, name: 'Dikiş Atölyesi — Fason ve Seri Üretim',   url: `${HOME_URL}/terzi/dikis-atolyesi-antalya` },
        { '@type': 'ListItem', position: 5, name: 'Üniforma Üretimi',                          url: `${HOME_URL}/terzi/uniforma-uretimi-antalya` },
        { '@type': 'ListItem', position: 6, name: 'Kuru Temizleme ve Ütü',                     url: `${HOME_URL}/terzi/kuru-temizleme-antalya` },
        { '@type': 'ListItem', position: 7, name: 'Eve / Otele Gelen Terzi',                   url: `${HOME_URL}/terzi/eve-gelen-terzi-antalya` },
        // ✅ DÜZELTİLDİ: gelinlik-tadilati-antalya (canonical URL)
      
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
  description: PAGE_DESCRIPTION,
  keywords: [
    // Temel terzi arama terimleri
    'Antalya terzi', 'Konyaaltı terzi', 'terzi Antalya 2026', 'terzi fiyatları 2026',
    'bay terzi Antalya', 'bayan terzi Antalya', 'erkek terzi Antalya', 'kadın terzi Antalya',
    // Tadilat ve onarım
    'paça kısaltma Antalya', 'pantolon kısaltma Antalya', 'etek kısaltma Antalya',
    'kol kısaltma Antalya', 'bel daraltma Antalya', 'elbise daraltma Antalya',
    'fermuar değişimi Antalya', 'fermuar tamiri Antalya', 'kıyafet tamir Antalya',
    'tadilat Antalya', 'elbise tadilat Antalya',
    // Özel dikim
    'özel dikim Antalya', 'kişiye özel dikim', 'beden ölçüsüne göre dikim',
    'model tasarım Antalya', 'yerinde ölçü alma Antalya',
    // Erkek kıyafet
    'erkek takım elbise dikimi Antalya', 'erkek gömlek dikimi', 'erkek pantolon dikimi',
    'smoking dikimi Antalya', 'damatlık dikimi Antalya', 'ceket tadilatı Antalya',
    // Kadın kıyafet
    'kadın elbise dikimi Antalya', 'abiye tamiri Antalya', 'gelinlik tadilatı Antalya',
    'bluz dikimi Antalya', 'büyük beden terzi Antalya',
    // Tekstil imalatı
    'tişört imalatı Antalya', 'sweatshirt dikimi Antalya', 'pantolon imalatı Antalya',
    'gömlek dikimi Antalya', 'mont dikimi Antalya', 'şort imalatı Antalya',
    'gobi dikimi Antalya', 'kapüşonlu sweatshirt üretimi', 'polo dikimi Antalya',
    'eşofman dikimi Antalya', 'tekstil imalatı Antalya',
    // Seri üretim ve atölye
    'dikiş atölyesi Antalya', 'fason üretim Antalya', 'seri imalat tekstil Antalya',
    'kalıp çıkarma Antalya', 'numune dikimi Antalya', 'fason tekstil Antalya',
    // Mobil ve servis
    'eve gelen terzi Antalya', 'otele gelen terzi Antalya', 'araçlı terzi servisi',
    'adrese gelen terzi Antalya', 'mobil terzi Antalya',
    // Üniforma
    'üniforma üretimi Antalya', 'otel üniforma Antalya', 'restoran üniforma',
    'okul üniforma Antalya', 'güvenlik üniforma', 'aşçı üniforma Antalya',
    // Nakış ve baskı
    'nakış Antalya', 'logo nakışı Antalya', 'dijital baskı kıyafet', 'sweatshirt baskı',
    // Kuru temizleme
    'kuru temizleme Antalya', 'ütü hizmeti Antalya', 'otel ütü servisi Antalya',
    // Çok dilli
    'tailor Antalya', 'English speaking tailor Antalya', 'custom clothing Antalya',
    'портной Анталья', 'пошив одежды Анталья', 'Schneider Antalya',
    // İlçe bazlı
    'Belek terzi', 'Kemer terzi', 'Lara terzi', 'Alanya terzi', 'Manavgat terzi',
    'Side terzi', 'Serik terzi', 'Döşemealtı terzi', 'Kepez terzi', 'Aksu terzi',
  ],
  authors: [{ name: 'SwapHubs', url: HOME_URL }],
  creator: 'SwapHubs',
  publisher: 'SwapHubs',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // ✅ DÜZELTİLDİ: hreflang en/ru/de eklendi
  alternates: {
    canonical: SITE_URL,
    languages: {
      'x-default': SITE_URL,
      'tr': SITE_URL,
      'en': SITE_URL,
      'ru': SITE_URL,
      'de': SITE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    alternateLocale: ['en_US','de_DE','ru_RU'],
    type: 'website',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'Terzi Can Antalya — Bay Bayan Terzi, Özel Dikim, Dikiş Atölyesi', type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    creator: '@swaphubs',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056',
    ICBM: '36.8841, 30.7056',
    'content-language': 'tr, en, ru, de',
    contact: PHONE,
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
