import type { Metadata } from 'next';
import TerziClient from './TerziClient';

const SITE_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const TODAY = new Date().toISOString().split('T')[0];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${HOME_URL}#website`,
      name: 'SwapHubs',
      url: HOME_URL,
      inLanguage: 'tr',
      publisher: {
        '@type': 'Organization',
        '@id': `${HOME_URL}#organization`,
        name: 'SwapHubs',
        url: HOME_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${HOME_URL}/logo.png`,
          width: 512,
          height: 512,
        },
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${HOME_URL}/ilanlar?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },

    {
      // ✅ DÜZELTİLDİ: Google Harita + Yerel Arama için LocalBusiness eklendi
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
      ],
      description:
        "Antalya Konyaaltı'nda profesyonel bay ve bayan terzisi. Erkek takım elbise dikimi, kadın elbise tadilatı, paça kısaltma ₺150, fermuar değişimi ₺120, gelinlik tadilatı, üniforma üretimi, nakış, kuru temizleme. Dikiş atölyesi. Eve ve otele gelen araçlı terzi servisi.",
      url: SITE_URL,
      telephone: PHONE_E164,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [`${HOME_URL}/og/terzi-can.jpg`],
      logo: `${HOME_URL}/logo.png`,
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
      hasMap: 'https://www.google.com/maps?q=36.8841,30.7056',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],

      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can Hizmet ve Fiyat Listesi 2025-2026',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Paça Kısaltma — Pantolon Kısaltma Antalya',
              description: 'Erkek pantolon kısaltma, kot paça kısaltma, kumaş pantolon paça kısaltma hizmeti. Bay ve bayan.',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '150',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '150',
              maxPrice: '175',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fermuar Değişimi Antalya',
              description: 'Pantolon, kot, mont, ceket, sweatshirt, çanta fermuar değişimi ve tamiri.',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '120',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '120',
              maxPrice: '300',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bayan Terzi — Kadın Elbise Dikimi ve Tadilatı Antalya',
              description: 'Kadın elbise dikimi, bluz dikimi, etek dikimi, abiye tadilatı, etek kısaltma, elbise daraltma, gelinlik tadilatı. Özel ölçü bayan kıyafet dikimi.',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '600',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '200',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bay Terzi — Erkek Takım Elbise Dikimi Antalya',
              description: 'Erkek takım elbise dikimi, erkek pantolon dikimi, erkek gömlek dikimi, ceket tadilatı, erkek kıyafet tamiri. Özel ölçü bay kıyafet dikimi.',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '2500',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '150',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Dikiş Atölyesi Antalya — Fason ve Seri Üretim',
              description: 'Antalya dikiş atölyesi. Kalıp çıkarma, fason üretim, seri imalat, numune dikimi, prototip. Markalar ve butikler için tam üretim paketi.',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Gelinlik Tadilatı Antalya',
              description: 'Gelinlik daraltma, gelinlik paça kısaltma, gelinlik tadilat ve onarımı. Ekspres randevu.',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '500',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '500',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Üniforma Üretimi Antalya — Otel, Restoran, Okul',
              description: 'Otel personel, resepsiyon, kat görevlisi, aşçı üniforma, garson üniforma, güvenlik üniforma, spa üniforma, okul üniforma, doktor üniforma üretimi. Tasarım + kalıp + seri imalat + nakış.',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Kuru Temizleme ve Ütü Hizmeti Antalya',
              description: 'Kıyafet kuru temizleme, çamaşır yıkama, ütüleme hizmeti. Otelden alım ve teslimat. 24 saatte ekspres.',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '300',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '300',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Eve / Otele Gelen Terzi Servisi Antalya',
              description: 'Konyaaltı, Lara, Belek, Kemer, Alanya, Manavgat, Side dahil araçlı terzi servisi. Eve gelen terzi, otele gelen terzi.',
              areaServed: [
                { '@type': 'City', name: 'Antalya' },
                { '@type': 'City', name: 'Lara' },
                { '@type': 'City', name: 'Belek' },
                { '@type': 'City', name: 'Kemer' },
                { '@type': 'City', name: 'Alanya' },
                { '@type': 'City', name: 'Manavgat' },
                { '@type': 'City', name: 'Side' },
              ],
            },
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Nakış ve Logo Baskı Antalya',
              description: 'Logo nakışı, isim nakışı, üniforma nakışı, dijital baskı, transfer baskı, serigrafi. Sweatshirt, eşofman, kapüşonlu, polo yaka dikimi.',
              areaServed: { '@type': 'City', name: 'Antalya' },
            },
            price: '100',
            priceCurrency: 'TRY',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '100',
              priceCurrency: 'TRY',
            },
            availability: 'https://schema.org/InStock',
          },
        ],
      },

      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
        itemReviewed: {
          '@type': 'ClothingStore',
          name: 'Terzi Can',
        },
      },
      review: [
        {
          '@type': 'Review',
          name: 'Üniforma Üretimi — Mükemmel Hizmet',
          author: { '@type': 'Person', name: 'Murat B.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim, nakış kalitesi harika!',
          datePublished: '2025-01-15',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Best Tailor in Antalya',
          author: { '@type': 'Person', name: 'Sarah M.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional. Highly recommend!',
          datePublished: '2025-05-10',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Лучший портной в Анталье',
          author: { '@type': 'Person', name: 'Наталья К.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель в Белеке!',
          datePublished: '2025-06-20',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Ausgezeichnete Qualität',
          author: { '@type': 'Person', name: 'David K.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Wir bestellten bestickte Sweatshirts für unser Team — 30 Stück, pünktlich geliefert. Ausgezeichnete Qualität!',
          datePublished: '2025-02-08',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Hızlı ve Kaliteli Terzi',
          author: { '@type': 'Person', name: 'Elif Y.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Gelinliğimi mükemmel şekilde teslim ettiler. Paça kısaltmayı aynı gün yaptılar. Hızlı ve kaliteli hizmet!',
          datePublished: '2025-04-10',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
        {
          '@type': 'Review',
          name: 'Perfect English-Speaking Tailor',
          author: { '@type': 'Person', name: 'James T.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
          reviewBody: 'Suit altered for a business meeting in 24h. Perfect fit. English speaking — best tailor in Antalya!',
          datePublished: '2025-03-15',
          itemReviewed: { '@type': 'ClothingStore', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
        },
      ],

      areaServed: [
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'City', name: 'Konyaaltı' },
        { '@type': 'City', name: 'Muratpaşa' },
        { '@type': 'City', name: 'Kepez' },
        { '@type': 'City', name: 'Lara' },
        { '@type': 'City', name: 'Belek' },
        { '@type': 'City', name: 'Kemer' },
        { '@type': 'City', name: 'Alanya' },
        { '@type': 'City', name: 'Manavgat' },
        { '@type': 'City', name: 'Side' },
      ],

      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: PHONE_E164,
          contactType: 'customer service',
          areaServed: 'TR',
          availableLanguage: ['Turkish', 'English', 'Russian', 'German'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
        },
      ],
      sameAs: [
        `https://wa.me/${PHONE_E164.replace('+', '')}`,
        SITE_URL,
        `${HOME_URL}/online-terzi-hizmeti`,
        `${HOME_URL}/online-tailor-service`,
      ],
    },

    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Antalya Terzi · Bay & Bayan Terzi · Paça Kısaltma · Elbise Dikimi · Dikiş Atölyesi · Üniforma | Terzi Can Konyaaltı',
      url: SITE_URL,
      isPartOf: { '@id': `${HOME_URL}#website` },
      about: { '@id': `${SITE_URL}#business` },
      description:
        "Antalya Konyaaltı'nda Terzi Can. Bay terzi, bayan terzi, dikiş atölyesi. Paça kısaltma ₺150, fermuar değişimi ₺120, elbise dikimi, erkek takım elbise, üniforma üretimi, kuru temizleme, ütü. Eve-otele gelen terzi servisi.",
      inLanguage: ['tr', 'en', 'de', 'ru'],
      datePublished: '2024-01-01',
      dateModified: TODAY,
      lastReviewed: TODAY,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#hizmet-fiyatlari', '#sik-sorulan-sorular', '#terzi-can-ozet'],
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
          name: 'Antalya paça kısaltma ve pantolon kısaltma fiyatı ne kadar? 2025-2026',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Antalya'da paça kısaltma ve pantolon kısaltma fiyatımız ₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175 civarı. Erkek ve bayan pantolon kısaltma yapıyoruz. Kesin fiyat için WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Bay terzi Antalya — erkek kıyafet dikimi ve tadilatı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Evet! Erkek takım elbise dikimi, erkek pantolon kısaltma, erkek gömlek dikimi, ceket tadilatı, kol kısaltma, fermuar değişimi yapıyoruz. Bay terzisi olarak tüm erkek kıyafet işleri için WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Bayan terzi Antalya — kadın elbise dikimi ve tadilatı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Evet! Bayan terzisi olarak kadın elbise dikimi, bluz dikimi, etek dikimi, etek kısaltma, elbise daraltma, abiye tamiri, gelinlik tadilatı yapıyoruz. Tüm kadın kıyafet işleri için WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Dikiş atölyesi Antalya — fason üretim, kalıp, seri imalat?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Evet! Antalya dikiş atölyemizde kalıp çıkarma, fason üretim, seri imalat, numune dikimi, prototip üretimi yapıyoruz. Markalar, butikler ve e-ticaret firmaları için tam üretim paketi sunuyoruz. WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Fermuar değişimi kaç lira? Mont, kot, pantolon fermuarı Antalya 2025-2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Pantolon ve kot fermuarı ₺120'den, mont fermuarı ₺300'den başlar. Sweatshirt ve çanta fermuarı da değiştiriyoruz. Aynı gün teslim mümkündür. WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Eve veya otele gelen terzi Antalya var mı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Evet! Araçlı terzi servisimizle Konyaaltı, Lara, Belek, Kemer, Alanya, Manavgat, Side dahil tüm Antalya ilçelerine geliyoruz. Eve gelen terzi, otele gelen terzi servisimiz için WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Kuru temizleme ve ütü hizmeti Antalya fiyatları?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Kuru temizleme ₺300'den, mont kuru temizleme ₺500'den, çamaşır ve ütü hizmeti ₺80/kg'dan başlar. Otel ve adreslerden kurye ile alım yapıyoruz. 24 saat ekspres teslimat. WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Elbise dikimi ve tadilatı Antalya fiyatları 2025-2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Elbise dikimi ₺600'den, elbise daraltma ₺200'den başlar. Abiye tamiri ₺350'den, gelinlik tadilatı ₺500'den başlar. Bay takım elbise dikimi ₺2500'den başlar. WhatsApp ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Is there an English-speaking tailor in Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes! Tailor Can offers English-speaking tailoring for men and women in all Antalya districts. Alterations, dry cleaning, uniform production, sewing workshop, mobile tailor service. WhatsApp: ${PHONE}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Есть ли русскоязычный портной в Анталье?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Да! Портной Кан обслуживает по-русски. Подгонка брюк, химчистка, пошив на заказ для мужчин и женщин. Ателье в Анталье. Выездной сервис по всей Анталье. WhatsApp: ${PHONE}.`,
          },
        },
      ],
    },

    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}#howto-olcu`,
      name: 'Pantolon Paça Kısaltma İçin Doğru Ölçü Nasıl Alınır?',
      description: 'Terzi Can ile paça kısaltma randevusu öncesi evde doğru ölçü almanın 3 adımı.',
      totalTime: 'PT5M',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Ayakkabınızı giyin',
          text: 'Paça uzunluğunu, genellikle giyeceğiniz ayakkabıyla ölçün — topuk yüksekliği farkı paça boyunu değiştirir.',
        },
        {
          '@type': 'HowToStep',
          name: 'İstenen paça boyunu işaretleyin',
          text: 'Pantolonu ayakkabı üzerinde istediğiniz uzunlukta toplu iğne veya tebeşirle işaretleyin.',
        },
        {
          '@type': 'HowToStep',
          name: 'Terzi Can ile WhatsApp üzerinden randevu alın',
          text: `Ölçünüzü ve fotoğrafınızı WhatsApp ${PHONE} üzerinden gönderin, aynı gün veya ertesi gün için randevu alın.`,
        },
      ],
    },

    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}#hizmet-listesi`,
      name: 'Terzi Can Hizmetleri — Antalya Terzi',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Bay Terzi — Erkek Kıyafet Dikimi', url: `${HOME_URL}/terzi/bay-terzi-antalya` },
        { '@type': 'ListItem', position: 2, name: 'Bayan Terzi — Kadın Elbise Dikimi', url: `${HOME_URL}/terzi/bayan-terzi-antalya` },
        { '@type': 'ListItem', position: 3, name: 'Paça Kısaltma — Pantolon Kısaltma', url: `${HOME_URL}/terzi/paca-kisaltma-antalya` },
        { '@type': 'ListItem', position: 4, name: 'Dikiş Atölyesi — Fason Üretim', url: `${HOME_URL}/terzi/dikis-atolyesi-antalya` },
        { '@type': 'ListItem', position: 5, name: 'Üniforma Üretimi', url: `${HOME_URL}/terzi/uniforma-uretimi-antalya` },
        { '@type': 'ListItem', position: 6, name: 'Kuru Temizleme ve Ütü', url: `${HOME_URL}/terzi/kuru-temizleme-antalya` },
        { '@type': 'ListItem', position: 7, name: 'Eve / Otele Gelen Terzi', url: `${HOME_URL}/terzi/eve-gelen-terzi-antalya` },
        // ✅ YENİ: Eksik sayfalar eklendi
        { '@type': 'ListItem', position: 8, name: 'Gelinlik Tadilatı', url: `${HOME_URL}/terzi/gelinlik-tadilati` },
        { '@type': 'ListItem', position: 9, name: 'Fermuar Değişimi', url: `${HOME_URL}/terzi/fermuar-degisimi` },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: {
    default: 'Antalya Terzi · Bay & Bayan Terzi · Paça Kısaltma ₺150 · Dikiş Atölyesi · Terzi Can',
    template: '%s | Terzi Can Antalya',
  },
  description:
    'Konyaaltı Terzi Can: Bay terzi, bayan terzi, dikiş atölyesi. Paça kısaltma ₺150, fermuar ₺120, elbise dikimi, erkek takım elbise, üniforma, kuru temizleme, ütü. Eve & otele gelen terzi. 24-48s ekspres. TR·EN·RU·DE ☎ ' +
    PHONE,
  keywords: [
    'Antalya terzi',
    'Konyaaltı terzi',
    'bay terzi Antalya',
    'bayan terzi Antalya',
    'erkek terzi Antalya',
    'kadın terzi Antalya',
    'dikiş atölyesi Antalya',
    'erkek takım elbise dikimi Antalya',
    'kadın elbise dikimi Antalya',
    'terzi Antalya',
    'elbise dikimi Antalya',
    'paça kısaltma Antalya',
    'pantolon kısaltma Antalya',
    'paça kısaltma fiyatı 2026',
    'fermuar değişimi Antalya',
    'eve gelen terzi Antalya',
    'otele gelen terzi Antalya',
    'araçlı terzi servisi',
    'elbise daraltma Antalya',
    'kıyafet tamiri Antalya',
    'gelinlik tadilatı Antalya',
    'abiye tamiri Antalya',
    'kuru temizleme Antalya',
    'ütü hizmeti Antalya',
    'üniforma dikimi Antalya',
    'otel üniforma Antalya',
    'aşçı üniforma Antalya',
    'garson üniforma Antalya',
    'nakış Antalya',
    'fason üretim Antalya',
    'seri imalat Antalya',
    'Lara terzi',
    'Belek terzi',
    'Kemer terzi',
    'Alanya terzi',
    'tailor Antalya',
    'mobile tailor Antalya',
    'dry cleaning Antalya',
    'Schneider Antalya',
    'портной Анталья',
    'terzi fiyatları 2026',
    'etek kısaltma Antalya',
    'kol kısaltma Antalya',
    'yırtık onarımı Antalya',
  ],
  authors: [{ name: 'SwapHubs', url: HOME_URL }],
  creator: 'SwapHubs',
  publisher: 'SwapHubs',
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
    canonical: SITE_URL,
    languages: {
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: 'Terzi Can Antalya · Bay & Bayan Terzi · Paça Kısaltma · Dikiş Atölyesi · Üniforma',
    description:
      "Konyaaltı & tüm Antalya'da bay ve bayan terzisi. Dikiş atölyesi. Paça ₺150, fermuar ₺120, elbise dikimi, eve-otele servis. 24-48h ekspres. TR·EN·RU·DE ☎ " +
      PHONE,
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'de_DE', 'ru_RU'],
    type: 'website',
    images: [
      {
        url: '/og/terzi-can.jpg',
        width: 1200,
        height: 630,
        alt: 'Terzi Can Antalya — Bay Bayan Terzi, Paça Kısaltma, Elbise Dikimi, Dikiş Atölyesi, Üniforma',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    creator: '@swaphubs',
    title: 'Terzi Can Antalya · Bay & Bayan Terzi · Dikiş Atölyesi',
    description:
      'Konyaaltı & tüm Antalya. Paça ₺150, fermuar ₺120, eve-otele servis. TR·EN·RU·DE ☎ ' + PHONE,
    images: ['/og/terzi-can.jpg'],
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056',
    ICBM: '36.8841, 30.7056',
    'content-language': 'tr, en, ru, de',
    contact: PHONE,
  },
};

export default function TerziPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TerziClient />
    </>
  );
}
