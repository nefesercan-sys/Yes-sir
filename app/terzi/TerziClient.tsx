'use client';

import { useState } from 'react';

// ─── TEMEL SABİTLER ────────────────────────────────────────────────────────────
const PHONE = '905318986418';
const SITE_URL = 'https://swaphubs.com/terzi';
type Lang = 'tr' | 'en' | 'ru' | 'de';

// ─── ANTALYA İLÇE & MAHALLE ────────────────────────────────────────────────────
const ANTALYA_ILCELER = [
  { ilce: 'Muratpaşa', mahalleler: ['Fener','Kışla','Sinan','Güzeloba','Balbey','Kaleiçi','Haşimişcan','Yenigün','Meltem','Çağlayan','Uncalı','Bahçelievler','Ermenek','Özgürlük','Soğuksu','Yüksekalan','Karaalioğlu','Selçuk','Doğuyaka','Aspendos'] },
  { ilce: 'Konyaaltı', mahalleler: ['Hurma','Sarısu','Liman','Uncalı','Arapsuyu','Gürsu','Kızıltoprak','Çakırlar','Altınkum','Kuzdere','Camikebir'] },
  { ilce: 'Kepez', mahalleler: ['Varsak','Santral','Yavuz Selim','Pınarbaşı','Altındağ','Göksu','Şafak','Göçerler','Atatürk','Duraliler','Yeşilbayır','Karabağ','Doyran','Çiğdem','Emek','Teomanpaşa','Yıldırım'] },
  { ilce: 'Aksu', mahalleler: ['Aksu Merkez','Boğazkent','Belek','Kadriye','Çandır','Güneykent','Topaloğlu','Gebiz'] },
  { ilce: 'Döşemealtı', mahalleler: ['Döşemealtı Merkez','Habibler','Yağca','Kızılkaya'] },
  { ilce: 'Serik', mahalleler: ['Serik Merkez','Belek','Boğazkent','Kadriye','Taşağıl','Titreyengöl'] },
  { ilce: 'Alanya', mahalleler: ['Alanya Merkez','Mahmutlar','Oba','Tosmur','Avsallar','Kestel','Türkler','Konaklı','Cikcilli','Okurcalar','Kargıcak','Dim','Tepe'] },
  { ilce: 'Manavgat', mahalleler: ['Manavgat Merkez','Side','Sorgun','Kumköy','Evrenseki','Gündoğdu','Çolaklı','Titreyengöl'] },
  { ilce: 'Kemer', mahalleler: ['Kemer Merkez','Beldibi','Göynük','Çamyuva','Tekirova','Arslanbucak','Kiriş'] },
  { ilce: 'Kaş', mahalleler: ['Kaş Merkez','Kalkan','Bezirgan','Gömbe','Yeşilköy'] },
  { ilce: 'Finike', mahalleler: ['Finike Merkez','Alakır','Turunçova'] },
  { ilce: 'Kumluca', mahalleler: ['Kumluca Merkez','Mavikent','Yeşilköy'] },
  { ilce: 'Elmalı', mahalleler: ['Elmalı Merkez','Akçay','Bayındır'] },
  { ilce: 'Korkuteli', mahalleler: ['Korkuteli Merkez','Belkaya'] },
  { ilce: 'Gündoğmuş', mahalleler: ['Gündoğmuş Merkez'] },
  { ilce: 'İbradı', mahalleler: ['İbradı Merkez','Ormana'] },
  { ilce: 'Akseki', mahalleler: ['Akseki Merkez','İmecik'] },
];

// ─── SCHEMA.ORG — DÜZELTİLMİŞ (areaServed kısaltıldı, reviewCount doğrulandı) ─
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": SITE_URL,
      "name": "Antalya Terzi — Terzi Can",
      "alternateName": ["Terzi Can","Tailor Can","Портной Кан","Schneider Can"],
      "description": "Antalya'nın en iyi terzisi. Paça kısaltma, fermuar değişimi, tadilat, tamir, daraltma, özel dikim, üniforma üretimi, nakış, kuru temizleme. Araçlı terzi servisi. 4 dilde hizmet.",
      "url": SITE_URL,
      "telephone": "+90-531-898-64-18",
      "priceRange": "₺₺",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Antalya",
        "addressRegion": "07",
        "addressCountry": "TR"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 36.8841, "longitude": 30.7056 },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "7",
        "bestRating": "5",
        "worstRating": "1"
      },
      "areaServed": {
        "@type": "City",
        "name": "Antalya",
        "containsPlace": ANTALYA_ILCELER.map(i => ({ "@type": "AdministrativeArea", "name": i.ilce + ", Antalya" }))
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Terzi Hizmetleri",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paça Kısaltma" }, "price": "150", "priceCurrency": "TRY" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fermuar Değişimi" }, "price": "120", "priceCurrency": "TRY" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Elbise Daraltma" }, "price": "200", "priceCurrency": "TRY" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kuru Temizleme" }, "price": "300", "priceCurrency": "TRY" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Üniforma Dikimi" }, "price": "0", "priceCurrency": "TRY", "description": "Teklif alınız" }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Antalya'da paça kısaltma fiyatı ne kadar? (2025–2026)",
          "acceptedAnswer": { "@type": "Answer", "text": "Antalya'da paça kısaltma fiyatımız ₺150'den başlar. Pantolon cinsi ve kumaş türüne göre değişebilir. Ücretsiz fiyat teklifi için WhatsApp: +90 531 898 64 18." }
        },
        {
          "@type": "Question",
          "name": "Antalya'da fermuar değişimi kaç lira? Mont, kot, pantolon fermuarı fiyatı?",
          "acceptedAnswer": { "@type": "Answer", "text": "Pantolon ve kot fermuarı ₺120'den, ceket fermuarı ₺200'den, mont fermuarı ₺300'den başlar. Aynı gün servis mümkündür. WhatsApp: +90 531 898 64 18." }
        },
        {
          "@type": "Question",
          "name": "Eve veya otele gelen terzi Antalya?",
          "acceptedAnswer": { "@type": "Answer", "text": "Evet, araçlı terzi servisimizle Antalya'nın tüm ilçelerine geliyoruz. Ev, otel veya işyeri fark etmez. WhatsApp: +90 531 898 64 18." }
        },
        {
          "@type": "Question",
          "name": "Antalya'da otel ve restoran üniforma üretimi yapılıyor mu?",
          "acceptedAnswer": { "@type": "Answer", "text": "Evet — otel, resepsiyon, aşçı, garson, spa, animatör üniforması tasarım, kalıp, seri imalat ve nakış hizmetiyle üretilmektedir." }
        },
        {
          "@type": "Question",
          "name": "Mezuniyet abiyesi tamiri ve kısaltması Antalya?",
          "acceptedAnswer": { "@type": "Answer", "text": "Evet, Mayıs–Haziran mezuniyet sezonunda abiye tamiri ve kısaltma ekspres 24 saat içinde yapılmaktadır." }
        },
        {
          "@type": "Question",
          "name": "Antalya'da kuru temizleme ve çamaşır servisi var mı?",
          "acceptedAnswer": { "@type": "Answer", "text": "Evet — kuru temizleme, çamaşır yıkama ve ütü hizmetimiz otelden alım ve teslimatla sunulmaktadır. WhatsApp: +90 531 898 64 18." }
        },
        {
          "@type": "Question",
          "name": "Where can I find a tailor in Antalya? Do you speak English?",
          "acceptedAnswer": { "@type": "Answer", "text": "Terzi Can offers professional tailoring in Antalya — alterations, custom sewing, uniform production, embroidery and dry cleaning. We speak Turkish, English, Russian and German. WhatsApp: +90 531 898 64 18." }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "SwapHubs", "item": "https://swaphubs.com" },
        { "@type": "ListItem", "position": 2, "name": "Terzi Antalya", "item": SITE_URL }
      ]
    },
    {
      "@type": "Review",
      "itemReviewed": { "@type": "LocalBusiness", "name": "Terzi Can", "@id": SITE_URL },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Sarah M." },
      "reviewBody": "Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional."
    }
  ]
};

// ─── META — DİNAMİK (her dil için) ────────────────────────────────────────────
const META: Record<Lang, { title: string; description: string; lang: string }> = {
  tr: {
    lang: 'tr',
    title: 'Terzi Antalya — Paça Kısaltma, Fermuar, Tadilat, Üniforma | Terzi Can',
    description: 'Antalya\'nın en iyi terzisi. Paça kısaltma ₺150, fermuar değişimi ₺120, daraltma, elbise tamiri, üniforma üretimi, nakış, kuru temizleme. Araçlı terzi servisi — eve & otele gelinir. WhatsApp: +90 531 898 64 18.',
  },
  en: {
    lang: 'en',
    title: 'Tailor Antalya — Alterations, Custom Sewing, Uniforms | Tailor Can',
    description: 'Best tailor in Antalya. Trouser hemming from ₺150, zip replacement ₺120, dress alterations, uniform production, embroidery, dry cleaning. Mobile tailor — home & hotel visits. WhatsApp: +90 531 898 64 18.',
  },
  ru: {
    lang: 'ru',
    title: 'Портной Анталья — Подгонка, Пошив, Форма | Портной Кан',
    description: 'Лучший портной в Анталье. Подгонка брюк от ₺150, замена молнии ₺120, ремонт одежды, производство формы, вышивка, химчистка. Выездной портной — в дом и отель. WhatsApp: +90 531 898 64 18.',
  },
  de: {
    lang: 'de',
    title: 'Schneider Antalya — Änderungen, Maßanfertigung, Uniformen | Schneider Can',
    description: 'Bester Schneider in Antalya. Hosenänderung ab ₺150, Reißverschluss ₺120, Kleideränderungen, Uniformproduktion, Stickerei, Chemische Reinigung. Mobiler Schneider. WhatsApp: +90 531 898 64 18.',
  },
};

// ─── İÇERİK ────────────────────────────────────────────────────────────────────
const C = {
  tr: {
    badge: '✂ Antalya · Terzi Can',
    h1: 'Antalya\'nın',
    h1em: 'Terzisi',
    sub: 'Erkek · Bayan · Çocuk · Tadilat · Üniforma · Nakış · Fason · Kuru Temizleme',
    waBtn: 'WhatsApp\'tan Yazın',
    downBtn: 'Hizmetleri Gör ↓',
    waMsg: 'Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.',
    s1: 'Hizmetlerimiz', s1t: 'Ne Yapıyoruz?',
    s2: 'Neden Biz?', s2t: 'Neden Terzi Can?',
    s3: 'Sık Sorulan Sorular',
    s4: 'Müşteri Yorumları',
    s5: 'Hizmet Bölgeleri',
    s6: 'İletişim', s6t: 'Bize Ulaşın',
    s6sub: 'WhatsApp\'tan mesaj atın, hemen yanıt verelim',
    waLabel: 'WhatsApp\'tan Yaz',
    mapLabel: 'Haritada Bul',
    mobileSvcBadge: '🚗 ARAÇLI TERZİ SERVİSİ',
    mobileSvcHeading: 'Kapınıza Geliyoruz',
    mobileSvcDesc: 'Araçlı terzi servisimizle tüm Antalya\'ya hizmet veriyoruz. Ekibimiz adresinize geliyor, yerinde ölçü alıyor; dikimi tamamlayıp tekrar kapınıza teslim ediyor. Otel, ev, işyeri — fark etmez.',
    mobileSvcSteps: ['📍 Adresinizi Bildirin','📏 Ölçü Alınır','✂️ Atölyede Dikilir','🚗 Kapıya Teslim'],
    mobileSvcStepLabels: ['WhatsApp\'tan konum paylaşın','Terzi adresinize gelir','Ölçüye göre dikim yapılır','Belirlenen vakitte teslim'],
    mobileSvcCta: '📲 Terzi Servisi Talep Et',
    mobileSvcWaMsg: 'Merhaba, araçlı terzi servisinizden yararlanmak istiyorum. Adresime gelebilir misiniz?',
    faq: [
      { q: 'Paça kısaltma kaç lira? 2025–2026 fiyatı ne kadar?', a: 'Paça kısaltma ₺150\'den başlar. Kot paça ₺150, kumaş pantolon ₺175 civarı. Pantolon fermuarı ₺120, mont fermuarı ₺300, ceket daraltma ₺300\'den. Ücretsiz teklif için WhatsApp\'tan yazın.' },
      { q: 'Fermuar değişimi kaç lira? Kot, mont, ceket, sweatshirt fermuarı?', a: 'Pantolon/kot fermuarı ₺120, ceket fermuarı ₺200, mont fermuarı ₺300\'den başlar. Sweatshirt ve çanta fermuarı da yapılır. Aynı gün teslim mümkündür.' },
      { q: 'Eve veya otele gelen terzi var mı?', a: 'Evet! Araçlı terzi servisimizle Antalya\'nın tüm ilçelerine geliyoruz. WhatsApp\'tan konum paylaşın, terzi adresinize gelsin, ölçü alsın, diksin ve teslim etsin.' },
      { q: 'Mezuniyet abiye tamiri ve kısaltması yapıyor musunuz?', a: 'Evet, Mayıs–Haziran sezonunda abiye tamiri ve kısaltma ekspres 24 saat yapılmaktadır. Son dakika işlemleri kabul edilir.' },
      { q: 'Düğün sezonu gelinlik tadilatı yapıyor musunuz?', a: 'Evet, Nisan–Ekim düğün sezonunda gelinlik tadilatı, kısaltma ve damatlık tadilatı yapıyoruz. Özel günde kusursuz fit garantisi.' },
      { q: 'Otel ve restoran üniforması üretimi yapıyor musunuz?', a: 'Evet — otel personel, resepsiyon, aşçı, garson, meydancı, spa, animatör üniforması üretiyoruz. Tasarım, kalıp, seri imalat ve nakış tek elden.' },
      { q: 'Büyük beden, çocuk, bebek kıyafeti ve ev tekstili dikimi var mı?', a: 'Evet; büyük beden, bebek elbisesi, çocuk kıyafeti, nevresim, perde dikiyoruz. Anne grupları için toplu sipariş indirimi uygulanır.' },
      { q: 'Kuru temizleme ve çamaşır servisi var mı?', a: 'Evet, kuru temizleme ₺300\'den, çamaşır yıkama ve ütü hizmetimiz otelden alım ve teslimatla sunulmaktadır.' },
    ],
  },
  en: {
    badge: '✂ Antalya · Tailor Can',
    h1: 'Antalya\'s',
    h1em: 'Master Tailor',
    sub: 'Men · Women · Children · Alterations · Uniforms · Embroidery · Dry Cleaning',
    waBtn: 'WhatsApp Us Now',
    downBtn: 'View Services ↓',
    waMsg: 'Hello, I would like information about your tailoring service.',
    s1: 'Services', s1t: 'What We Offer',
    s2: 'Why Us?', s2t: 'Why Tailor Can?',
    s3: 'FAQ',
    s4: 'Reviews',
    s5: 'Service Areas',
    s6: 'Contact', s6t: 'Get in Touch',
    s6sub: 'Send a WhatsApp message — we reply instantly',
    waLabel: 'Chat on WhatsApp',
    mapLabel: 'Find on Map',
    mobileSvcBadge: '🚗 MOBILE TAILOR SERVICE',
    mobileSvcHeading: 'We Come to You',
    mobileSvcDesc: 'Our mobile tailor service covers all of Antalya. We visit your address, take measurements on-site, complete the tailoring in our workshop, and deliver back to your door. Hotel, home or office — no problem.',
    mobileSvcSteps: ['📍 Share Your Address','📏 On-Site Measurements','✂️ Workshop Tailoring','🚗 Delivery to Your Door'],
    mobileSvcStepLabels: ['Send location via WhatsApp','Tailor comes to you','Sewn to your measurements','Delivered at agreed time'],
    mobileSvcCta: '📲 Request Mobile Tailor',
    mobileSvcWaMsg: 'Hello, I would like to use your mobile tailor service. Can you come to my address?',
    faq: [
      { q: 'How much does trouser hemming cost in Antalya?', a: 'Trouser hemming starts from ₺150. Price depends on fabric. WhatsApp us for a free instant quote.' },
      { q: 'How much does zip replacement cost? Jeans, coat, sweatshirt?', a: 'Trousers/jeans from ₺120, jacket from ₺200, coat from ₺300. Same-day service available.' },
      { q: 'Do you come to my hotel or home?', a: 'Yes! Our mobile tailor covers all Antalya districts. Share your location via WhatsApp — we come to you, measure, tailor and deliver back.' },
      { q: 'Graduation dress alterations in Antalya?', a: 'Yes — express 24h alterations for graduation season (May–June). Last-minute accepted.' },
      { q: 'Wedding dress alterations in Antalya?', a: 'Yes, bridal alterations, shortening and groom suit adjustments April–October. Perfect fit guaranteed.' },
      { q: 'Do you produce hotel and restaurant uniforms?', a: 'Yes — hotel staff, reception, chef, waiter, spa, security uniforms. Design, pattern making, mass production and embroidery in one place.' },
      { q: 'Plus size, children, baby clothing and home textiles?', a: 'Yes — plus-size garments, baby dresses, children\'s clothing, curtains, bed linen. Group discounts for parent communities.' },
      { q: 'Dry cleaning and laundry service?', a: 'Yes, professional dry cleaning from ₺300, laundry and ironing with hotel pickup and delivery.' },
    ],
  },
  ru: {
    badge: '✂ Анталья · Портной Кан',
    h1: 'Лучший',
    h1em: 'Портной Антальи',
    sub: 'Мужская · Женская · Детская · Пошив · Форма · Вышивка · Химчистка',
    waBtn: 'Написать в WhatsApp',
    downBtn: 'Смотреть услуги ↓',
    waMsg: 'Здравствуйте, хотел бы узнать о ваших услугах портного.',
    s1: 'Услуги', s1t: 'Что мы предлагаем',
    s2: 'Почему мы?', s2t: 'Почему Портной Кан?',
    s3: 'Вопросы и ответы',
    s4: 'Отзывы',
    s5: 'Районы обслуживания',
    s6: 'Контакты', s6t: 'Связаться с нами',
    s6sub: 'Напишите в WhatsApp, ответим сразу',
    waLabel: 'Написать в WhatsApp',
    mapLabel: 'Найти на карте',
    mobileSvcBadge: '🚗 ВЫЕЗДНОЙ ПОРТНОЙ',
    mobileSvcHeading: 'Приедем к вам',
    mobileSvcDesc: 'Выездной портной обслуживает всю Анталью. Приедем по адресу, снимем мерки на месте, сошьём в ателье и доставим обратно. Отель, дом или офис — всё равно.',
    mobileSvcSteps: ['📍 Укажите адрес','📏 Снятие мерок','✂️ Пошив в ателье','🚗 Доставка к вам'],
    mobileSvcStepLabels: ['Отправьте локацию в WhatsApp','Портной приедет к вам','Изделие сошьётся по меркам','Доставим в назначенное время'],
    mobileSvcCta: '📲 Вызвать портного',
    mobileSvcWaMsg: 'Здравствуйте, хочу выездной сервис. Можете приехать по моему адресу?',
    faq: [
      { q: 'Сколько стоит подгонка брюк в Анталье (2025–2026)?', a: 'Подгонка брюк от ₺150. Напишите в WhatsApp — бесплатная оценка сразу.' },
      { q: 'Сколько стоит замена молнии? Джинсы, пальто, толстовка?', a: 'Брюки/джинсы от ₺120, пиджак от ₺200, пальто от ₺300. Срочный ремонт в тот же день.' },
      { q: 'Есть выездной портной? Приезжаете в отель или домой?', a: 'Да! Работаем по всей Анталье. Пришлите локацию в WhatsApp — приедем, снимем мерки, сошьём и доставим.' },
      { q: 'Срочная подгонка выпускного платья?', a: 'Да — экспресс 24 часа в сезон выпускных (май–июнь). Принимаем заказы в последний момент.' },
      { q: 'Подгонка свадебного платья?', a: 'Да, подгонка свадебных платьев апрель–октябрь. Идеальная посадка гарантирована.' },
      { q: 'Производство формы для отелей и ресторанов?', a: 'Да — гостиницы, рестораны, повара, официанты, охрана, спа. Дизайн, лекала, серийное производство, вышивка — всё в одном.' },
      { q: 'Большие размеры, детская одежда, шторы, постельное бельё?', a: 'Да — большие размеры, детская одежда, шторы, постельное бельё. Скидки для групповых заказов.' },
      { q: 'Химчистка и стирка в Анталье?', a: 'Да, химчистка от ₺300, стирка и глажка с доставкой из отеля.' },
    ],
  },
  de: {
    badge: '✂ Antalya · Schneider Can',
    h1: 'Antalyas',
    h1em: 'Meisterschneider',
    sub: 'Herren · Damen · Kinder · Änderungen · Uniformen · Stickerei · Reinigung',
    waBtn: 'WhatsApp schreiben',
    downBtn: 'Leistungen ansehen ↓',
    waMsg: 'Hallo, ich möchte Informationen über Ihren Schneiderservice erhalten.',
    s1: 'Leistungen', s1t: 'Was wir anbieten',
    s2: 'Warum wir?', s2t: 'Warum Schneider Can?',
    s3: 'Häufige Fragen',
    s4: 'Kundenbewertungen',
    s5: 'Servicegebiete',
    s6: 'Kontakt', s6t: 'Kontaktieren Sie uns',
    s6sub: 'WhatsApp schreiben — wir antworten sofort',
    waLabel: 'WhatsApp schreiben',
    mapLabel: 'Auf Karte finden',
    mobileSvcBadge: '🚗 MOBILER SCHNEIDERDIENST',
    mobileSvcHeading: 'Wir kommen zu Ihnen',
    mobileSvcDesc: 'Unser mobiler Schneiderdienst ist in ganz Antalya verfügbar. Wir kommen zu Ihrer Adresse, nehmen Maße vor Ort, schneidern in unserem Atelier und liefern zurück.',
    mobileSvcSteps: ['📍 Adresse mitteilen','📏 Maße vor Ort','✂️ Arbeit im Atelier','🚗 Lieferung zu Ihnen'],
    mobileSvcStepLabels: ['Standort per WhatsApp','Schneider kommt zu Ihnen','Wird nach Maß gefertigt','Zur vereinbarten Zeit'],
    mobileSvcCta: '📲 Mobilen Schneider anfragen',
    mobileSvcWaMsg: 'Hallo, ich möchte den mobilen Schneiderdienst nutzen. Können Sie zu meiner Adresse kommen?',
    faq: [
      { q: 'Was kostet Hosenänderung in Antalya (2025–2026)?', a: 'Hosenänderung ab ₺150. WhatsApp für ein kostenloses Sofortangebot.' },
      { q: 'Was kostet Reißverschluss-Ersatz? Jeans, Mantel, Sweatshirt?', a: 'Hosen/Jeans ab ₺120, Jacke ab ₺200, Mantel ab ₺300. Expressdienst möglich.' },
      { q: 'Kommen Sie ins Hotel oder nach Hause?', a: 'Ja! Wir fahren in alle Antalya-Bezirke. Standort per WhatsApp senden — wir kommen, messen und liefern zurück.' },
      { q: 'Abschlusskleid kürzen in Antalya?', a: 'Ja — express 24h zur Abschlusszeit (Mai–Juni). Last-minute wird akzeptiert.' },
      { q: 'Brautkleid-Änderungen?', a: 'Ja, Brautkleid-Anpassungen April–Oktober. Perfekte Passform garantiert.' },
      { q: 'Produzieren Sie Hotel- und Restaurantuniformen?', a: 'Ja — Hotel, Köche, Kellner, Sicherheit, Spa. Design, Schnittmuster, Serienproduktion und Stickerei aus einer Hand.' },
      { q: 'Übergrößen, Kinderkleidung, Vorhänge, Bettwäsche?', a: 'Ja — Übergrößen, Babykleider, Kinderkleidung, Vorhänge, Bettwäsche. Gruppenrabatte verfügbar.' },
      { q: 'Chemische Reinigung und Wäscheservice?', a: 'Ja, Reinigung ab ₺300, Wäsche und Bügeln mit Hotelabholung.' },
    ],
  },
};

// ─── HİZMETLER ────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: '✂️', color: '#fdecea', names: ['Tamir & Tadilat', 'Repairs & Alterations', 'Ремонт и переделка', 'Reparaturen & Änderungen'], descs: ['Paça kısaltma · fermuar değişimi · elbise daraltma · kol kısaltma · etek kısaltma · yırtık onarımı · düğme dikimi · astar değişimi.','Hemming · zip replacement · taking in · sleeve shortening · tear repair · button sewing · lining replacement.','Подгонка · замена молнии · заужение · укорачивание · ремонт разрывов · пришивание пуговиц.','Kürzen · Reißverschluss · Einengen · Riss reparieren · Knöpfe annähen.'], price: '₺150+' },
  { icon: '🔒', color: '#fff3e0', names: ['Fermuar Değişimi', 'Zip Replacement', 'Замена молнии', 'Reißverschluss Reparatur'], descs: ['Pantolon · kot · ceket · mont · elbise · sweatshirt · çanta fermuarı. Aynı gün servis.','Trousers · jeans · jacket · coat · dress · sweatshirt · bag zips. Same-day service.','Брюки · джинсы · куртки · пальто · платья · толстовки. Срочный ремонт.','Hosen · Jeans · Jacken · Mäntel · Kleider · Sweatshirts. Expressdienst.'], price: '₺120+' },
  { icon: '📐', color: '#e8f5e9', names: ['Daraltma & Beden Küçültme', 'Taking In & Size Down', 'Заужение и уменьшение', 'Einengen & Verkleinern'], descs: ['Pantolon · ceket · gömlek · elbise daraltma · beden küçültme · beden seti çıkarma · kalıp çıkarma.','Trouser/jacket/shirt/dress taking in · size reduction · pattern making.','Заужение брюк/пиджака/рубашки/платья · уменьшение размера · лекала.','Hose/Jacke/Hemd/Kleid einengen · Größe anpassen · Schnittmuster.'], price: '₺150+' },
  { icon: '👔', color: '#e3f2fd', names: ['Erkek Kıyafet Dikimi', 'Men\'s Tailoring', 'Мужской пошив', 'Herrenschneiderei'], descs: ['Takım elbise · blazer · gömlek · pantolon · smoking · yelek dikimi ve tadilatı.','Suits · blazers · shirts · trousers · tuxedos — custom or altered.','Костюмы · пиджаки · рубашки · брюки — пошив и подгонка.','Anzüge · Blazer · Hemden · Hosen — Maßanfertigung oder Änderungen.'], price: '₺300+' },
  { icon: '👗', color: '#fce4ec', names: ['Bayan Kıyafet Dikimi', 'Women\'s Tailoring', 'Женский пошив', 'Damenschneiderei'], descs: ['Elbise · bluz · etek · pantolon · abiye · gelinlik dikimi ve tadilatı.','Dresses · blouses · skirts · trousers · evening gowns — custom or altered.','Платья · блузки · юбки · вечерние наряды — пошив и подгонка.','Kleider · Blusen · Röcke · Abendkleider — Maßanfertigung oder Änderungen.'], price: '₺250+' },
  { icon: '👶', color: '#fff8e1', names: ['Çocuk & Bebek Kıyafeti', 'Children & Baby Clothing', 'Детская одежда', 'Kinder & Babykleidung'], descs: ['Bebek elbisesi · çocuk kıyafeti · kostüm · okul kıyafeti dikimi. Anne grubu toplu sipariş indirimi.','Baby dresses · children\'s clothing · costumes · school uniforms. Group discounts.','Одежда для малышей · школьная форма · костюмы. Скидки для мам-групп.','Babykleider · Kinderkleidung · Schulkleidung. Gruppenrabatt.'], price: '₺200+' },
  { icon: '📏', color: '#f3e5f5', names: ['Büyük Beden Dikimi', 'Plus Size Tailoring', 'Одежда больших размеров', 'Übergrößen Schneiderei'], descs: ['Büyük beden elbise · pantolon · gömlek dikimi. 42–62+ beden özel kalıp.','Plus-size dresses · trousers · shirts. Sizes 42–62+ with custom patterns.','Одежда размера 42–62+. Индивидуальные лекала.','Übergrößen 42–62+. Individuelle Schnittmuster.'], price: '₺600+' },
  { icon: '💍', color: '#fce4ec', names: ['Gelinlik · Abiye · Özel Gün', 'Wedding · Evening · Special', 'Свадьба · Вечер', 'Hochzeit · Abend'], descs: ['Gelinlik · damatlık · abiye · nişan · kına elbisesi dikimi ve tadilatı.','Wedding dress · groom suit · evening gown sewing and alterations.','Свадебное платье · смокинг · вечернее платье — пошив и подгонка.','Brautkleid · Bräutigamanzug · Abendkleid — nähen und ändern.'], price: '₺2.500+' },
  { icon: '🧥', color: '#e8eaf6', names: ['Sweatshirt & Eşofman', 'Sweatshirt & Tracksuit', 'Толстовки и костюмы', 'Sweatshirt & Trainingsanzug'], descs: ['Sweatshirt · eşofman · kapüşonlu · nakışlı · baskılı dikim ve seri üretim.','Sweatshirts · hoodies · tracksuits — custom and mass production.','Толстовки · спортивные костюмы · с вышивкой · серийное производство.','Sweatshirts · Hoodies · Trainingsanzüge — individuell & Serienproduktion.'], price: '₺400+' },
  { icon: '🪡', color: '#e8f5e9', names: ['Nakış & Baskı', 'Embroidery & Printing', 'Вышивка и печать', 'Stickerei & Druck'], descs: ['Logo nakışı · isim nakışı · üniforma nakışı · dijital baskı · transfer baskı · serigrafi.','Logo embroidery · name embroidery · digital print · screen print.','Вышивка логотипа · цифровая печать · трафаретная печать.','Logo-Stickerei · Digitaldruck · Siebdruck.'], price: '₺100+' },
  { icon: '🏨', color: '#e0f7fa', names: ['Otel & Turizm Üniforma', 'Hotel & Tourism Uniforms', 'Гостиничная форма', 'Hotel & Tourismus Uniformen'], descs: ['Otel · resepsiyon · kat görevlisi · meydancı · kapıcı · güvenlik · spa · animatör üniforması. Tasarım · seri imalat · nakış.','Hotel · reception · housekeeping · valet · security · spa · animation uniforms. Design · production · embroidery.','Форма для отелей · ресепшн · горничных · охраны · спа. Дизайн · производство · вышивка.','Hotel · Rezeption · Housekeeping · Sicherheit · Spa Uniformen. Design · Produktion · Stickerei.'], price: 'Teklif Al' },
  { icon: '🍽️', color: '#fff8e1', names: ['Restoran & Mutfak Üniforma', 'Restaurant & Kitchen Uniforms', 'Форма для ресторанов', 'Restaurant & Küchen-Uniformen'], descs: ['Aşçı · şef · garson · barista · komi · pastane personel üniforması. Logo nakışı ile üretim.','Chef · cook · waiter · barista · pastry staff uniforms with logo embroidery.','Форма шеф-повара · официанта · бариста. С вышивкой логотипа.','Koch · Kellner · Barista Uniformen mit Logo-Stickerei.'], price: 'Teklif Al' },
  { icon: '👨‍⚕️', color: '#e8f5e9', names: ['Sağlık & Endüstri Üniforma', 'Health & Industry Uniforms', 'Медицинская и рабочая форма', 'Gesundheit & Industrie Uniformen'], descs: ['Doktor · hemşire · eczacı · iş güvenliği · fabrika · çağrı merkezi · banka personel üniforması.','Doctor · nurse · pharmacist · factory · call center · bank staff uniforms.','Форма врачей · медсестёр · рабочих. Производство для любой отрасли.','Arzt · Krankenschwester · Fabrikarbeiter Uniformen.'], price: 'Teklif Al' },
  { icon: '🏫', color: '#f9fbe7', names: ['Okul & Spor Üniforma', 'School & Sports Uniforms', 'Школьная и спортивная форма', 'Schul- & Sportuniformen'], descs: ['Okul forması · futbol · voleybol · basketbol forması. Toplu sipariş · logo baskı · nakış.','School · football · volleyball · basketball uniforms. Bulk orders · logo · embroidery.','Школьная форма · спортивная форма · команды. Оптовые заказы.','Schuluniform · Sportuniform · Teambekleidung. Großbestellungen.'], price: 'Teklif Al' },
  { icon: '🏭', color: '#e8f5e9', names: ['Seri İmalat & Fason', 'Mass Production & Contract', 'Серийное производство', 'Serienproduktion & Fason'], descs: ['Kalıp çıkarma · numune dikimi · seri imalat · fason üretim. Markalar ve butikler için.','Pattern making · sample sewing · mass production for brands and boutiques.','Лекала · образцы · серийное производство для брендов.','Schnittmuster · Muster · Serienproduktion für Marken.'], price: 'Teklif Al' },
  { icon: '🏠', color: '#e0f7fa', names: ['Nevresim · Perde · Ev Tekstili', 'Home Textiles', 'Домашний текстиль', 'Heimtextilien'], descs: ['Nevresim takımı · perde · stor perde · tül · kırlent · yatak örtüsü. Otel toplu üretim.','Bed linen · curtains · blinds · cushion covers. Bulk hotel production.','Постельное бельё · шторы · подушки. Оптовое производство.','Bettwäsche · Vorhänge · Kissen. Großproduktion für Hotels.'], price: '₺500+' },
  { icon: '🧺', color: '#e3f2fd', names: ['Kuru Temizleme & Çamaşır', 'Dry Cleaning & Laundry', 'Химчистка и стирка', 'Reinigung & Wäsche'], descs: ['Kuru temizleme · çamaşır yıkama · ütü. Otelden alım ve teslimat. Turistlere ekspres servis.','Dry cleaning · laundry · ironing. Hotel pickup and delivery. Express for tourists.','Химчистка · стирка · глажка. Из отеля забираем и доставляем.','Reinigung · Wäsche · Bügeln. Hotelabholung und -lieferung.'], price: '₺300+' },
];

const WHY = [
  { icon: '⚡', labels: ['24–48 Saat Teslimat','Tatildesiniz, beklemenize gerek yok.'], en: ['24–48h Express','You\'re on holiday — no waiting.'], ru: ['24–48 часов','Экспресс-сервис в отпуске.'], de: ['24–48h Express','Sie sind im Urlaub — kein Warten.'] },
  { icon: '🚗', labels: ['Araçlı Terzi Servisi','Adresinize gelip ölçü alıyor, teslim ediyoruz.'], en: ['Mobile Tailor','We come to you, measure and deliver back.'], ru: ['Выездной портной','Приедем, снимем мерки, доставим.'], de: ['Mobiler Schneider','Wir kommen zu Ihnen und liefern zurück.'] },
  { icon: '🌍', labels: ['4 Dilde Hizmet','Türkçe, İngilizce, Rusça, Almanca.'], en: ['4 Languages','Turkish, English, Russian, German.'], ru: ['4 языка','Турецкий, английский, русский, немецкий.'], de: ['4 Sprachen','Türkisch, Englisch, Russisch, Deutsch.'] },
  { icon: '🏨', labels: ['Otele Alım & Teslimat','Tüm Antalya otellerine hizmet.'], en: ['Hotel Pickup & Delivery','Serving all Antalya hotels.'], ru: ['Забор и доставка в отель','Обслуживаем все отели Антальи.'], de: ['Hotel Abholung & Lieferung','Alle Antalya-Hotels bedient.'] },
  { icon: '🏭', labels: ['Üniforma Üretimi','Her sektöre özel tasarım ve seri imalat.'], en: ['Uniform Production','Custom design & mass production.'], ru: ['Производство формы','Дизайн и серийное производство.'], de: ['Uniformproduktion','Design & Serienproduktion.'] },
  { icon: '🪡', labels: ['Nakış & Baskı','Logo nakışı, dijital baskı, serigrafi.'], en: ['Embroidery & Print','Logo embroidery, digital & screen print.'], ru: ['Вышивка и печать','Вышивка логотипа, цифровая печать.'], de: ['Stickerei & Druck','Logo-Stickerei, Digitaldruck.'] },
  { icon: '💳', labels: ['Döviz Kabul','TL, Euro, Dolar, Ruble.'], en: ['Multi-Currency','TL, Euro, Dollar and Ruble accepted.'], ru: ['Валюта','TL, евро, доллар, рубли.'], de: ['Währungen','TL, Euro, Dollar und Rubel.'] },
  { icon: '⭐', labels: ['4.9 ★ Google','Antalya\'nın en çok tercih edilen terzisi.'], en: ['4.9 ★ Google','Most recommended tailor in Antalya.'], ru: ['4.9 ★ Google','Самый рекомендуемый портной Антальи.'], de: ['4.9 ★ Google','Beliebtester Schneider in Antalya.'] },
];

const REVIEWS = [
  { stars: 5, text: 'Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim, nakış kalitesi harika!', author: 'Murat B.', flag: '🇹🇷', city: 'Antalya', date: 'Ocak 2025' },
  { stars: 5, text: 'We ordered custom embroidered sweatshirts for our team — 30 pieces, logo embroidery, delivered on time. Excellent quality and price!', author: 'David K.', flag: '🇩🇪', city: 'Berlin', date: 'Şubat 2025' },
  { stars: 5, text: 'Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional. Highly recommend!', author: 'Sarah M.', flag: '🇬🇧', city: 'London', date: 'Mayıs 2025' },
  { stars: 5, text: 'Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель в Белеке!', author: 'Наталья К.', flag: '🇷🇺', city: 'Москва', date: 'Haziran 2025' },
  { stars: 5, text: 'Gelinliğimi mükemmel şekilde teslim ettiler. Hızlı, kaliteli hizmet. Paça kısaltmayı aynı gün yaptılar!', author: 'Elif Y.', flag: '🇹🇷', city: 'Antalya', date: 'Nisan 2025' },
  { stars: 5, text: 'Suit altered for a business meeting in 24h. Perfect fit. English speaking — best tailor in Antalya!', author: 'James T.', flag: '🇦🇺', city: 'Sydney', date: 'Mart 2025' },
  { stars: 5, text: 'Kuru temizleme ve ütü hizmetleri mükemmeldi. Otelden aldılar, otele teslim ettiler. Çok pratik!', author: 'Mehmet A.', flag: '🇹🇷', city: 'İstanbul', date: 'Temmuz 2025' },
];

const PRICES = [
  { service: { tr: 'Paça Kısaltma', en: 'Trouser Hemming', ru: 'Подгонка брюк', de: 'Hose kürzen' }, price: '₺150+', time: { tr: '24 saat', en: '24h', ru: '24 часа', de: '24h' } },
  { service: { tr: 'Fermuar Değişimi (Pantolon/Kot)', en: 'Zip Replacement (Trousers/Jeans)', ru: 'Замена молнии (брюки/джинсы)', de: 'Reißverschluss (Hose/Jeans)' }, price: '₺120+', time: { tr: 'Aynı gün', en: 'Same day', ru: 'В тот же день', de: 'Gleicher Tag' } },
  { service: { tr: 'Mont / Kaban Fermuarı', en: 'Coat Zip Replacement', ru: 'Замена молнии пальто', de: 'Mantel-Reißverschluss' }, price: '₺300+', time: { tr: '24 saat', en: '24h', ru: '24 часа', de: '24h' } },
  { service: { tr: 'Elbise / Ceket Daraltma', en: 'Dress / Jacket Taking In', ru: 'Заужение платья/пиджака', de: 'Kleid/Jacke einengen' }, price: '₺200+', time: { tr: '48 saat', en: '48h', ru: '48 часов', de: '48h' } },
  { service: { tr: 'Kuru Temizleme', en: 'Dry Cleaning', ru: 'Химчистка', de: 'Chemische Reinigung' }, price: '₺300+', time: { tr: '48 saat', en: '48h', ru: '48 часов', de: '48h' } },
  { service: { tr: 'Sweatshirt Dikimi', en: 'Sweatshirt Sewing', ru: 'Пошив толстовки', de: 'Sweatshirt nähen' }, price: '₺400+', time: { tr: '3–5 gün', en: '3–5 days', ru: '3–5 дней', de: '3–5 Tage' } },
  { service: { tr: 'Gelinlik Tadilatı', en: 'Wedding Dress Alteration', ru: 'Подгонка свадебного платья', de: 'Brautkleid Änderung' }, price: '₺500+', time: { tr: '3–5 gün', en: '3–5 days', ru: '3–5 дней', de: '3–5 Tage' } },
  { service: { tr: 'Üniforma (kişi başı)', en: 'Uniform (per person)', ru: 'Форма (за чел.)', de: 'Uniform (pro Person)' }, price: 'Teklif', time: { tr: 'Miktara göre', en: 'By quantity', ru: 'По заказу', de: 'Je nach Menge' } },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function TerziClient() {
  const [lang, setLang] = useState<Lang>('tr');
  const [activeIlce, setActiveIlce] = useState<string | null>(null);

  const c = C[lang];
  const li: Record<Lang, number> = { tr: 0, en: 1, ru: 2, de: 3 };
  const idx = li[lang];
  const meta = META[lang];
  const waLink = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

  // WHY array için dil anahtarı
  const whyLabel = (w: typeof WHY[0]) => lang === 'tr' ? w.labels : lang === 'en' ? w.en : lang === 'ru' ? w.ru : w.de;

  return (
    <>
      {/* ── STRUCTURED DATA ──────────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── CANONICAL & HREFLANG (Next.js metadata API tercih edilir; fallback olarak) ── */}
      {/* Bu satırlar idealde layout.tsx metadata içinde olmalı:
          alternates: { canonical: SITE_URL, languages: { 'tr': SITE_URL+'?lang=tr', ... } }
      */}

      <div lang={meta.lang} style={{ fontFamily: "'Outfit', sans-serif", background: '#faf8f4', minHeight: '100vh', color: '#2c2418' }}>
        <style>{`
          /* ── Google Fonts: preconnect ile render-blocking azaltılır ── */
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          @keyframes fadeUp  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
          @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.45} }
          @keyframes floatSc { 0%,100%{transform:translateY(0) rotate(-8deg);} 50%{transform:translateY(-7px) rotate(-8deg);} }
          @keyframes glowG   { 0%,100%{box-shadow:0 0 12px rgba(184,149,74,0.15);} 50%{box-shadow:0 0 28px rgba(184,149,74,0.4);} }
          @keyframes spinS   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

          .fu  { animation: fadeUp 0.5s ease both; }
          .fu2 { animation: fadeUp 0.5s 0.1s ease both; }
          .fu3 { animation: fadeUp 0.5s 0.2s ease both; }
          .fu4 { animation: fadeUp 0.5s 0.32s ease both; }

          /* Kart hover — transform sadece, renk değil */
          .svc-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
          .svc-card:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(0,0,0,0.1); }

          /* FAQ — details/summary düzeltilmiş */
          .faq-item { border-bottom: 1px solid #e8dcc8; }
          .faq-q    { cursor: pointer; list-style: none; padding: 16px 0; display: flex; justify-content: space-between; align-items: center; gap: 8px; }
          .faq-q::-webkit-details-marker { display: none; }
          .faq-a    { font-size: 13px; color: #6b5a4a; line-height: 1.75; padding-bottom: 16px; }
          details[open] .faq-arrow { transform: rotate(45deg); }
          .faq-arrow { transition: transform 0.2s; display: inline-block; font-style: normal; color: #b8954a; font-size: 20px; flex-shrink: 0; }

          .ilce-btn { transition: transform 0.15s, background 0.15s, border-color 0.15s; cursor: pointer; }
          .ilce-btn:hover { transform: scale(1.04); }

          .area-pill { display: inline-block; margin: 3px; padding: 5px 12px; border-radius: 20px; background: rgba(184,149,74,0.08); border: 1px solid rgba(184,149,74,0.2); font-size: 11px; color: #7a5a20; font-weight: 500; }

          /* Sticky CTA — iOS touch fix */
          .sticky-wa { position: fixed; bottom: 0; left: 0; right: 0; padding: 12px 20px 22px; background: linear-gradient(to top, #faf8f4 60%, transparent); z-index: 50; }

          .step-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 14px 10px; text-align: center; flex: 1; min-width: 120px; }

          .hero-ring { width: 150px; height: 150px; margin: 0 auto; border-radius: 50%; border: 2px solid rgba(184,149,74,0.25); display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(184,149,74,0.1) 0%, transparent 70%); animation: glowG 3s ease-in-out infinite; position: relative; }
          .hero-ring::before { content:''; position:absolute; inset:-7px; border-radius:50%; border:1px dashed rgba(184,149,74,0.2); animation:spinS 22s linear infinite; }
          .hero-ring::after  { content:''; position:absolute; inset:-15px; border-radius:50%; border:1px dashed rgba(184,149,74,0.1); animation:spinS 35s linear infinite reverse; }
          .needle-badge { position:absolute; bottom:-4px; right:8px; background:#b8954a; border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; font-size:16px; border:2px solid #1c1814; }

          /* Fiyat tablo zebra */
          .price-row:nth-child(even) { background: #f8f4ee; }
          .price-row:nth-child(odd)  { background: #fff; }

          /* Erişilebilirlik: odak halkası */
          a:focus-visible, button:focus-visible { outline: 2px solid #b8954a; outline-offset: 2px; }

          @media (max-width: 400px) {
            .hero-ring { width: 120px; height: 120px; }
            .step-card { min-width: 100px; }
          }
        `}</style>

        {/* ══════════════════════════════
            DİL ÇUBUĞU
        ══════════════════════════════ */}
        <nav aria-label="Language selector" style={{ background: '#1c1814', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', gap: 5 }} role="list">
            {(['tr','en','ru','de'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                aria-label={`Switch to ${l}`}
                style={{
                  padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  border: `1px solid ${lang === l ? '#b8954a' : 'rgba(255,255,255,0.13)'}`,
                  background: lang === l ? '#b8954a' : 'transparent',
                  color: lang === l ? '#fff' : 'rgba(255,255,255,0.4)',
                  fontFamily: 'inherit', transition: 'all 0.2s',
                }}
              >
                {l === 'tr' ? '🇹🇷 TR' : l === 'en' ? '🇬🇧 EN' : l === 'ru' ? '🇷🇺 РУ' : '🇩🇪 DE'}
              </button>
            ))}
          </div>
          <a
            href={waLink(c.waMsg)}
            rel="noopener noreferrer"
            target="_blank"
            style={{ fontSize: 11, color: '#25d366', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <span style={{ animation: 'pulse 2s infinite' }} aria-hidden="true">📲</span> WhatsApp
          </a>
        </nav>

        {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
        <header style={{ background: 'linear-gradient(165deg, #1c1814 0%, #2a1c0f 45%, #1a1208 100%)', padding: '52px 24px 44px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(184,149,74,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(184,149,74,0.07) 0%, transparent 40%)', pointerEvents: 'none' }} aria-hidden="true" />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,149,74,0.45), transparent)' }} aria-hidden="true" />

          {/* Terzi SVG görseli */}
          <div className="fu" style={{ marginBottom: 24 }}>
            <div className="hero-ring" role="img" aria-label="Terzi Can logo">
              <svg width="88" height="88" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'floatSc 3.2s ease-in-out infinite' }} aria-hidden="true">
                <ellipse cx="48" cy="72" rx="20" ry="14" fill="rgba(184,149,74,0.13)" stroke="rgba(184,149,74,0.4)" strokeWidth="1.5"/>
                <circle cx="48" cy="28" r="12" fill="rgba(184,149,74,0.11)" stroke="rgba(184,149,74,0.5)" strokeWidth="1.5"/>
                <g transform="translate(60,40) rotate(-30)">
                  <line x1="0" y1="0" x2="14" y2="14" stroke="#d4af6e" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="14" y1="0" x2="0" y2="14" stroke="#d4af6e" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="7" cy="7" r="2.5" fill="#d4af6e" opacity="0.6"/>
                </g>
                <path d="M28 50 Q38 42 48 50 Q58 58 68 46" stroke="rgba(184,149,74,0.45)" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
                <rect x="22" y="60" width="20" height="5" rx="2.5" fill="rgba(184,149,74,0.18)" stroke="rgba(184,149,74,0.35)" strokeWidth="1"/>
                <line x1="25" y1="60" x2="25" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8"/>
                <line x1="29" y1="60" x2="29" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8"/>
                <line x1="33" y1="60" x2="33" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8"/>
                <line x1="37" y1="60" x2="37" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8"/>
                <path d="M30 42 Q32 58 32 72" stroke="rgba(184,149,74,0.2)" strokeWidth="1" fill="none"/>
                <path d="M66 42 Q64 58 64 72" stroke="rgba(184,149,74,0.2)" strokeWidth="1" fill="none"/>
              </svg>
              <span className="needle-badge" aria-hidden="true">✂️</span>
            </div>
          </div>

          <div className="fu" style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#b8954a', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ width: 24, height: 1, background: 'linear-gradient(90deg, transparent, #b8954a)', display: 'inline-block' }} aria-hidden="true" />
            {c.badge}
            <span style={{ width: 24, height: 1, background: 'linear-gradient(90deg, #b8954a, transparent)', display: 'inline-block' }} aria-hidden="true" />
          </div>

          {/* H1 — tek, semantik, keyword-rich */}
          <h1 className="fu2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 46, fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: 8, letterSpacing: '-0.5px' }}>
            {c.h1}{' '}
            <span style={{ color: '#d4af6e', fontStyle: 'italic', fontSize: 50 }}>{c.h1em}</span>
          </h1>

          <p className="fu3" style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginBottom: 12, letterSpacing: 0.4, lineHeight: 1.7 }}>{c.sub}</p>

          <div className="fu3" style={{ display: 'flex', justifyContent: 'center', gap: 5, marginBottom: 16, flexWrap: 'wrap' }}>
            {['🇹🇷 Türkçe','🇬🇧 English','🇷🇺 Русский','🇩🇪 Deutsch'].map(l => (
              <span key={l} style={{ fontSize: 10, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(184,149,74,0.18)', background: 'rgba(184,149,74,0.04)', color: '#c9a86e' }}>{l}</span>
            ))}
          </div>

          {/* Rating — microdata ile */}
          <div className="fu3" itemScope itemType="https://schema.org/AggregateRating" style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 22, alignItems: 'center' }}>
            <meta itemProp="ratingValue" content="4.9" />
            <meta itemProp="reviewCount" content="7" />
            <meta itemProp="bestRating" content="5" />
            <span aria-label="4.9 / 5 yıldız">⭐⭐⭐⭐⭐</span>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 700, marginLeft: 6 }}>4.9</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 2 }}>(7 yorum)</span>
          </div>

          <div className="fu4" style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 340, margin: '0 auto' }}>
            <a
              href={waLink(c.waMsg)}
              rel="noopener noreferrer"
              target="_blank"
              style={{ background: 'linear-gradient(135deg, #25d366, #1aad52)', color: '#fff', borderRadius: 14, padding: '15px 24px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}
            >
              📲 {c.waBtn}
            </a>
            <a
              href="#services"
              style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 24px', fontSize: 13, textDecoration: 'none', textAlign: 'center' }}
            >
              {c.downBtn}
            </a>
          </div>
        </header>

        {/* ══════════════════════════════
            SEO METİN BLOĞU — zengin içerik, visible, spam değil
        ══════════════════════════════ */}
        <section aria-label="Hizmet açıklaması" style={{ background: '#fff', padding: '28px 20px', borderBottom: '1px solid #ece4d8' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: '#1c1814', marginBottom: 12 }}>
              {lang === 'tr' ? 'Antalya\'da Erkek, Bayan ve Çocuk Terzisi — Tadilat, Tamir, Üniforma, Kuru Temizleme' :
               lang === 'en' ? 'Men\'s, Women\'s & Children\'s Tailor in Antalya — Alterations, Repairs, Uniforms, Dry Cleaning' :
               lang === 'ru' ? 'Мужской, женский и детский портной в Анталье — ремонт, подгонка, форма, химчистка' :
               'Herren-, Damen- & Kinderschneider in Antalya — Änderungen, Reparaturen, Uniformen, Reinigung'}
            </h2>
            {lang === 'tr' && (
              <>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85, marginBottom: 10 }}>
                  <strong>Terzi Can</strong>, Antalya'da 15+ yıllık deneyimiyle <strong>paça kısaltma</strong>, <strong>pantolon daraltma</strong>, <strong>elbise tamiri</strong>, <strong>ceket tadilatı</strong>, <strong>fermuar değişimi</strong>, <strong>etek kısaltma</strong> ve her türlü <strong>kıyafet tamiri</strong> hizmetleri sunan usta bir terzidir. <strong>Kalıp çıkarma</strong>, <strong>numune dikimi</strong> ve <strong>model üretimi</strong> de hizmetlerimiz arasındadır.
                </p>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85, marginBottom: 10 }}>
                  <strong>Otel üniforma</strong>, <strong>aşçı üniforma</strong>, <strong>garson üniforma</strong>, <strong>doktor üniforma</strong>, <strong>okul üniforma</strong> ve <strong>spor üniforma</strong> tasarım ve seri üretimi yapıyoruz. <strong>Sweatshirt dikimi</strong>, <strong>eşofman dikimi</strong>, <strong>nakış</strong> ve <strong>logo baskı</strong> hizmetlerimiz de mevcuttur.
                </p>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85 }}>
                  <strong>Kuru temizleme</strong>, <strong>çamaşır yıkama</strong> ve <strong>ütü hizmeti</strong> otelden alım-teslimatla sunulmaktadır. <strong>Araçlı terzi servisimiz</strong> Muratpaşa, Konyaaltı, Kepez, Lara, Belek, Kemer, Alanya ve Manavgat dahil tüm Antalya ilçelerinde aktiftir. <strong>Terzi fiyatları 2025–2026</strong>: paça kısaltma ₺150, fermuar değişimi ₺120, daraltma ₺200'den başlar.
                </p>
              </>
            )}
            {lang === 'en' && (
              <>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85, marginBottom: 10 }}>
                  <strong>Tailor Can</strong> is Antalya's most experienced tailor with 15+ years of expertise in <strong>trouser hemming</strong>, <strong>dress alterations</strong>, <strong>zip replacement</strong>, <strong>jacket repairs</strong>, <strong>skirt shortening</strong> and all types of <strong>clothing repairs</strong>. Pattern making, sample sewing and model production are also offered.
                </p>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85, marginBottom: 10 }}>
                  We produce <strong>hotel uniforms</strong>, <strong>chef uniforms</strong>, <strong>waiter uniforms</strong>, <strong>doctor uniforms</strong>, <strong>school uniforms</strong> and <strong>sports uniforms</strong> — from design to mass production. Sweatshirt sewing, tracksuit production, embroidery and logo printing are available.
                </p>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85 }}>
                  <strong>Dry cleaning</strong>, laundry and ironing with hotel pickup and delivery. Our <strong>mobile tailor service</strong> covers all Antalya districts — Muratpaşa, Konyaaltı, Lara, Belek, Kemer, Alanya and Manavgat. <strong>Tailor prices 2025–2026</strong>: hemming from ₺150, zip from ₺120, alterations from ₺200.
                </p>
              </>
            )}
            {lang === 'ru' && (
              <>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85, marginBottom: 10 }}>
                  <strong>Портной Кан</strong> — опытный портной в Анталье с 15+ годами опыта. <strong>Подгонка брюк</strong>, <strong>ремонт платьев</strong>, <strong>замена молнии</strong>, <strong>ушивание пиджаков</strong>, <strong>укорачивание юбок</strong> и все виды <strong>ремонта одежды</strong>. Изготовление лекал и пошив образцов.
                </p>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85, marginBottom: 10 }}>
                  Производим <strong>гостиничную форму</strong>, <strong>форму поваров</strong>, <strong>форму официантов</strong>, <strong>медицинскую форму</strong>, <strong>школьную форму</strong>, <strong>спортивную форму</strong>. Пошив толстовок, вышивка логотипа, серийное производство.
                </p>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85 }}>
                  <strong>Химчистка</strong>, стирка и глажка с доставкой из отеля. <strong>Выездной портной</strong> работает по всей Анталье. <strong>Цены 2025–2026</strong>: подгонка брюк от ₺150, замена молнии от ₺120.
                </p>
              </>
            )}
            {lang === 'de' && (
              <>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85, marginBottom: 10 }}>
                  <strong>Schneider Can</strong> ist Antalyas erfahrenster Schneider mit 15+ Jahren Erfahrung in <strong>Hosenänderungen</strong>, <strong>Kleiderreparaturen</strong>, <strong>Reißverschluss-Ersatz</strong>, <strong>Jackenänderungen</strong>, <strong>Rockkürzungen</strong> und allen Arten von <strong>Kleidungsreparaturen</strong>.
                </p>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85, marginBottom: 10 }}>
                  Wir produzieren <strong>Hoteluniformen</strong>, <strong>Kochuniformen</strong>, <strong>Kellneruniformen</strong>, <strong>Arztuniformen</strong>, <strong>Schuluniformen</strong> und <strong>Sportuniformen</strong>. Sweatshirt-Nähen, Stickerei und Logodruck ebenfalls verfügbar.
                </p>
                <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.85 }}>
                  <strong>Chemische Reinigung</strong>, Wäsche und Bügeln mit Hotelabholung. Unser <strong>mobiler Schneiderdienst</strong> bedient alle Antalya-Bezirke. <strong>Preise 2025–2026</strong>: Hosenänderung ab ₺150, Reißverschluss ab ₺120.
                </p>
              </>
            )}
          </div>
        </section>

        {/* ══════════════════════════════
            🚗 ARAÇLI TERZİ SERVİSİ
        ══════════════════════════════ */}
        <section id="terzi-servisi" aria-labelledby="mobile-svc-heading" style={{ background: 'linear-gradient(135deg, #1c1814 0%, #2a1c0f 100%)', padding: '52px 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #b8954a, #d4af6e, #b8954a, transparent)' }} aria-hidden="true" />
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 10 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'linear-gradient(90deg, #e63946, #c1121f)', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20 }}>
                {c.mobileSvcBadge}
              </span>
            </div>
            <div style={{ margin: '16px auto 20px', width: 76, height: 76, borderRadius: '50%', background: 'rgba(184,149,74,0.12)', border: '1px solid rgba(184,149,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 }} aria-hidden="true">🚗</div>
            <h2 id="mobile-svc-heading" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.1 }}>
              {c.mobileSvcHeading}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
              {c.mobileSvcDesc}
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              {c.mobileSvcSteps.map((step, i) => (
                <div key={i} className="step-card">
                  <div style={{ fontSize: 20, marginBottom: 6 }} aria-hidden="true">{step.split(' ')[0]}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#d4af6e', marginBottom: 4 }}>{step.replace(/^[^\s]+\s/, '')}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>{c.mobileSvcStepLabels[i]}</div>
                </div>
              ))}
            </div>
            <a href={waLink(c.mobileSvcWaMsg)} rel="noopener noreferrer" target="_blank" style={{ background: '#b8954a', color: '#fff', borderRadius: 14, padding: '15px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(184,149,74,0.3)' }}>
              {c.mobileSvcCta}
            </a>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,149,74,0.3), transparent)' }} aria-hidden="true" />
        </section>

        {/* ══════════════════════════════
            HİZMETLER
        ══════════════════════════════ */}
        <section id="services" aria-labelledby="services-heading" style={{ padding: '52px 20px', background: '#faf8f4' }}>
          <div style={{ marginBottom: 30, textAlign: 'center' }}>
            <p style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s1}</p>
            <h2 id="services-heading" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: '#1c1814' }}>{c.s1t}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 12, maxWidth: 740, margin: '0 auto' }}>
            {SERVICES.map((s, i) => (
              <article key={i} className="svc-card" style={{ background: s.color, border: '1px solid rgba(0,0,0,0.05)', borderRadius: 18, padding: '18px 13px' }}>
                <div style={{ fontSize: 28, marginBottom: 8, textAlign: 'center' }} aria-hidden="true">{s.icon}</div>
                <h3 style={{ fontSize: 12, fontWeight: 700, marginBottom: 5, color: '#1c1814', lineHeight: 1.3 }}>{s.names[idx]}</h3>
                <p style={{ fontSize: 11, color: '#6b5a4a', lineHeight: 1.5, marginBottom: 8 }}>{s.descs[idx]}</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#8a6a2a' }}>{s.price}</p>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 26, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={waLink(c.waMsg)} rel="noopener noreferrer" target="_blank" style={{ background: '#1c1814', color: '#d4af6e', borderRadius: 12, padding: '13px 28px', fontSize: 13, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(184,149,74,0.2)' }}>
              📲 {lang === 'tr' ? 'Fiyat Teklifi Al' : lang === 'en' ? 'Get a Quote' : lang === 'ru' ? 'Получить цену' : 'Angebot anfordern'}
            </a>
            <a href={waLink(lang === 'tr' ? 'Merhaba, üniforma üretimi için toplu fiyat almak istiyorum.' : lang === 'en' ? 'Hello, I need a bulk uniform production quote.' : lang === 'ru' ? 'Здравствуйте, нужна цена на оптовый заказ формы.' : 'Hallo, ich möchte ein Angebot für Uniformproduktion.')} rel="noopener noreferrer" target="_blank" style={{ background: '#b8954a', color: '#fff', borderRadius: 12, padding: '13px 28px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              🏭 {lang === 'tr' ? 'Toplu Üniforma Teklifi' : lang === 'en' ? 'Bulk Uniform Quote' : lang === 'ru' ? 'Оптовый заказ формы' : 'Uniform Großauftrag'}
            </a>
          </div>
        </section>

        {/* ══════════════════════════════
            NEDEN BİZ
        ══════════════════════════════ */}
        <section aria-labelledby="why-heading" style={{ padding: '52px 20px', background: '#f0ebe0' }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <p style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s2}</p>
            <h2 id="why-heading" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: '#1c1814' }}>{c.s2t}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxWidth: 600, margin: '0 auto' }}>
            {WHY.map((w, i) => {
              const labels = whyLabel(w);
              return (
                <div key={i} style={{ background: '#fff', border: '1px solid #e0d4c0', borderRadius: 16, padding: '14px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#b8954a,#8a6a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }} aria-hidden="true">{w.icon}</div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 2, color: '#1c1814' }}>{labels[0]}</p>
                    <p style={{ fontSize: 10, color: '#8a7060', lineHeight: 1.45 }}>{labels[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════
            FİYAT LİSTESİ
        ══════════════════════════════ */}
        <section id="fiyatlar" aria-labelledby="price-heading" style={{ padding: '52px 20px', background: '#faf8f4' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>
              {lang === 'tr' ? 'Fiyat Listesi' : lang === 'en' ? 'Price List' : lang === 'ru' ? 'Прайс-лист' : 'Preisliste'}
            </p>
            <h2 id="price-heading" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#1c1814', marginBottom: 6 }}>
              {lang === 'tr' ? 'Terzi Fiyatları 2025–2026' : lang === 'en' ? 'Tailor Prices 2025–2026' : lang === 'ru' ? 'Цены портного 2025–2026' : 'Schneiderpreise 2025–2026'}
            </h2>
            <p style={{ fontSize: 12, color: '#8a7060' }}>
              {lang === 'tr' ? 'Başlangıç fiyatları · Kesin teklif için WhatsApp\'tan yazın' : lang === 'en' ? 'Starting prices · WhatsApp for an exact quote' : lang === 'ru' ? 'Начальные цены · WhatsApp для точной оценки' : 'Startpreise · WhatsApp für genaues Angebot'}
            </p>
          </div>
          <div style={{ maxWidth: 600, margin: '0 auto', borderRadius: 16, overflow: 'hidden', border: '1px solid #e8dcc8' }}>
            {PRICES.map((row, i) => (
              <div key={i} className="price-row" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
                <p style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#1c1814' }}>{row.service[lang]}</p>
                <p style={{ fontSize: 13, fontWeight: 800, color: '#b8954a', minWidth: 60, textAlign: 'right' }}>{row.price}</p>
                <p style={{ fontSize: 10, color: '#8a7060', minWidth: 55, textAlign: 'right' }}>{row.time[lang]}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <a href={waLink(c.waMsg)} rel="noopener noreferrer" target="_blank" style={{ background: '#1c1814', color: '#d4af6e', borderRadius: 12, padding: '12px 24px', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(184,149,74,0.2)' }}>
              📲 {lang === 'tr' ? 'Ücretsiz Fiyat Teklifi Al' : lang === 'en' ? 'Get Free Quote' : lang === 'ru' ? 'Бесплатная оценка' : 'Kostenloses Angebot'}
            </a>
          </div>
        </section>

        {/* ══════════════════════════════
            YORUMLAR — itemReview microdata
        ══════════════════════════════ */}
        <section aria-labelledby="reviews-heading" style={{ padding: '52px 20px', background: '#1c1814' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#d4af6e', marginBottom: 6 }}>⭐ 4.9 / 5.0</p>
            <h2 id="reviews-heading" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#fff' }}>{c.s4}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 600, margin: '0 auto' }}>
            {REVIEWS.map((r, i) => (
              <article key={i} itemScope itemType="https://schema.org/Review" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 16 }}>
                <meta itemProp="reviewBody" content={r.text} />
                <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content={String(r.stars)} />
                  <meta itemProp="bestRating" content="5" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span aria-label={`${r.stars} yıldız`}>{'⭐'.repeat(r.stars)}</span>
                  <time dateTime={r.date} style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)' }}>{r.date}</time>
                </div>
                <blockquote style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 10 }}>"{r.text}"</blockquote>
                <p itemProp="author" itemScope itemType="https://schema.org/Person" style={{ fontSize: 11, color: '#d4af6e', fontWeight: 600 }}>
                  <span aria-hidden="true">{r.flag}</span>{' '}
                  <span itemProp="name">{r.author}</span> — {r.city}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════
            SSS / FAQ — h3 kullanımı düzeltildi
        ══════════════════════════════ */}
        <section aria-labelledby="faq-heading" style={{ padding: '52px 20px', background: '#fff' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>FAQ</p>
            <h2 id="faq-heading" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#1c1814' }}>{c.s3}</h2>
          </div>
          <div style={{ maxWidth: 600, margin: '0 auto' }} itemScope itemType="https://schema.org/FAQPage">
            {c.faq.map((f, i) => (
              <div key={i} itemScope itemType="https://schema.org/Question" itemProp="mainEntity" className="faq-item">
                <details>
                  {/* summary içinde h3 YOK — span kullandık */}
                  <summary className="faq-q">
                    <span itemProp="name" style={{ fontSize: 13, fontWeight: 600, color: '#1c1814', flex: 1, textAlign: 'left', paddingRight: 8 }}>{f.q}</span>
                    <span className="faq-arrow" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-a" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <span itemProp="text">{f.a}</span>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════
            HİZMET BÖLGELERİ
        ══════════════════════════════ */}
        <section aria-labelledby="areas-heading" style={{ padding: '52px 20px', background: '#f0ebe0' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s5}</p>
            <h2 id="areas-heading" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#1c1814', marginBottom: 6 }}>📍 Antalya — Tüm İlçeler</h2>
            <p style={{ fontSize: 12, color: '#8a7060' }}>
              {lang === 'tr' ? 'İlçeye tıklayarak mahalleleri görün' : lang === 'en' ? 'Tap a district to see neighborhoods' : lang === 'ru' ? 'Нажмите на район для просмотра' : 'Bezirk antippen für Stadtteile'}
            </p>
          </div>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 16 }} role="list">
              {ANTALYA_ILCELER.map((item) => (
                <button
                  key={item.ilce}
                  role="listitem"
                  className="ilce-btn"
                  onClick={() => setActiveIlce(activeIlce === item.ilce ? null : item.ilce)}
                  aria-expanded={activeIlce === item.ilce}
                  aria-controls={`mahalle-${item.ilce}`}
                  style={{
                    padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                    border: `1px solid ${activeIlce === item.ilce ? '#b8954a' : 'rgba(184,149,74,0.22)'}`,
                    background: activeIlce === item.ilce ? '#b8954a' : 'rgba(184,149,74,0.06)',
                    color: activeIlce === item.ilce ? '#fff' : '#7a5a20',
                    fontFamily: 'inherit',
                  }}
                >
                  {item.ilce}
                </button>
              ))}
            </div>
            {activeIlce && (
              <div id={`mahalle-${activeIlce}`} style={{ background: '#fff', borderRadius: 16, padding: '16px 14px', border: '1px solid #e0d4c0' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#b8954a', marginBottom: 10 }}>📍 {activeIlce} Mahalleleri</p>
                <div>
                  {ANTALYA_ILCELER.find(i => i.ilce === activeIlce)?.mahalleler.map(m => (
                    <span key={m} className="area-pill">{m} {activeIlce} Terzi</span>
                  ))}
                </div>
              </div>
            )}

            {/* SEO: görünür ama minimal mahalle listesi — spam değil */}
            <details style={{ marginTop: 20 }}>
              <summary style={{ fontSize: 11, color: '#8a7060', cursor: 'pointer', padding: '8px 0' }}>
                {lang === 'tr' ? 'Tüm ilçe ve mahalleleri gör' : lang === 'en' ? 'See all districts and neighborhoods' : lang === 'ru' ? 'Все районы и кварталы' : 'Alle Bezirke und Stadtteile'}
              </summary>
              <div style={{ marginTop: 10, fontSize: 11, color: '#8a7060', lineHeight: 2 }}>
                {ANTALYA_ILCELER.map(item => (
                  <p key={item.ilce}>
                    <strong style={{ color: '#5a4a3a' }}>{item.ilce}:</strong>{' '}
                    {item.mahalleler.map(m => `${m}`).join(' · ')}
                  </p>
                ))}
              </div>
            </details>
          </div>
        </section>

        {/* ══════════════════════════════
            İLETİŞİM
        ══════════════════════════════ */}
        <section id="contact" aria-labelledby="contact-heading" style={{ padding: '52px 20px', background: '#faf8f4' }}>
          <div style={{ background: '#fff', border: '1px solid #e0d8c8', borderRadius: 24, padding: '28px 20px', textAlign: 'center', maxWidth: 460, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 8 }}>{c.s6}</p>
            <h2 id="contact-heading" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{c.s6t}</h2>
            <p style={{ fontSize: 12, color: '#8a7060', marginBottom: 22 }}>{c.s6sub}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={waLink(c.waMsg)} rel="noopener noreferrer" target="_blank" style={{ background: 'linear-gradient(135deg, #25d366, #1aad52)', color: '#fff', borderRadius: 14, padding: 15, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(37,211,102,0.25)' }}>
                📲 {c.waLabel}
              </a>
              <a href={waLink(c.mobileSvcWaMsg)} rel="noopener noreferrer" target="_blank" style={{ background: '#b8954a', color: '#fff', borderRadius: 14, padding: 13, fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                🚗 {c.mobileSvcCta}
              </a>
              <a href="tel:+905318986418" style={{ color: '#2c2418', border: '1px solid #e0d8c8', borderRadius: 14, padding: 13, fontSize: 13, textDecoration: 'none', display: 'block', textAlign: 'center', fontWeight: 600 }}>
                📞 +90 531 898 64 18
              </a>
              <a href="https://maps.google.com/?q=Antalya+Terzi+Can" target="_blank" rel="noopener noreferrer" style={{ color: '#2c2418', border: '1px solid #e0d8c8', borderRadius: 14, padding: 13, fontSize: 13, textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                📍 {c.mapLabel}
              </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 18, flexWrap: 'wrap' }}>
              {['🕐 09:00–19:00','📍 Antalya','⚡ 24–48h','🇹🇷🇬🇧🇷🇺🇩🇪 4 Dil'].map(t => (
                <p key={t} style={{ fontSize: 10, color: '#8a7060' }}>{t}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            FOOTER — SEO Kategorili (görünür, kısa)
        ══════════════════════════════ */}
        <footer style={{ background: '#1c1814', padding: '36px 20px 100px', borderTop: '1px solid rgba(184,149,74,0.12)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: '#d4af6e', marginBottom: 18, textAlign: 'center' }}>
              Terzi Can | Tailor Can | Портной Кан | Schneider Can — Antalya
            </p>

            {/* Kategorili hizmet linkleri — görünür, kısa, spam değil */}
            <nav aria-label="Hizmet kategorileri" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
              {[
                { label: '✂ Tadilat & Tamir', items: ['Paça Kısaltma Antalya','Fermuar Değişimi Antalya','Elbise Daraltma','Kıyafet Tamiri','Etek Kısaltma','Abiye Tamiri'] },
                { label: '👔 Özel Dikim', items: ['Erkek Terzi Antalya','Bayan Terzi Antalya','Büyük Beden Terzi','Gelinlik Tadilat','Abiye Dikimi','Çocuk Kıyafeti'] },
                { label: '🏭 Üniforma & Üretim', items: ['Otel Üniforma Antalya','Aşçı Üniforma','Garson Üniforma','Doktor Üniforma','Okul Üniforma','Seri İmalat'] },
                { label: '🪡 Nakış & Temizleme', items: ['Nakış Antalya','Logo Nakışı','Sweatshirt Dikimi','Kuru Temizleme Antalya','Çamaşır Servisi','Ütü Hizmeti'] },
              ].map(cat => (
                <div key={cat.label}>
                  <p style={{ fontSize: 10, color: 'rgba(184,149,74,0.6)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{cat.label}</p>
                  {cat.items.map(item => (
                    <p key={item} style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', lineHeight: 1.9 }}>{item}</p>
                  ))}
                </div>
              ))}
            </nav>

            <div style={{ borderTop: '1px solid rgba(184,149,74,0.1)', paddingTop: 16, textAlign: 'center' }}>
              <address style={{ fontStyle: 'normal', fontSize: 11, color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>
                📍 Antalya, Türkiye &nbsp;·&nbsp;
                <a href="tel:+905318986418" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>☎ +90 531 898 64 18</a>
                &nbsp;·&nbsp; 🕐 09:00–19:00 &nbsp;·&nbsp;
                <a href={SITE_URL} style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>swaphubs.com/terzi</a>
              </address>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.08)', marginTop: 10 }}>
                © {new Date().getFullYear()} Terzi Can — Antalya Terzi, Paça Kısaltma, Fermuar Değişimi, Tadilat, Üniforma, Kuru Temizleme
              </p>
            </div>
          </div>
        </footer>

        {/* ══════════════════════════════
            STICKY CTA — iOS fix: pointer-events direkt link'te
        ══════════════════════════════ */}
        <div className="sticky-wa" style={{ pointerEvents: 'none' }}>
          <a
            href={waLink(c.waMsg)}
            rel="noopener noreferrer"
            target="_blank"
            style={{
              background: 'linear-gradient(135deg, #25d366, #1aad52)',
              color: '#fff',
              borderRadius: 14,
              padding: '15px',
              fontSize: 14,
              fontWeight: 700,
              width: '100%',
              maxWidth: 480,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
              textDecoration: 'none',
              pointerEvents: 'all',  /* iOS touch fix */
            }}
          >
            📲 {c.waBtn}
          </a>
        </div>
      </div>
    </>
  );
}
