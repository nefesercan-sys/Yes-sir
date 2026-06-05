'use client';

import { useState } from 'react';

const PHONE = '905318986418';
type Lang = 'tr' | 'en' | 'ru' | 'de';

// ═══════════════════════════════════════
// ANTALYA İLÇELER VE MAHALLELER
// ═══════════════════════════════════════
const ANTALYA_ILCELER = [
  { ilce: 'Muratpaşa', mahalleler: ['Fener','Kışla','Sinan','Güzeloba','Balbey','Kaleiçi','Haşimişcan','Yenigün','Meltem','Çağlayan','Uncalı (Muratpaşa)','Bahçelievler','Ermenek','Özgürlük','Soğuksu','Yüksekalan','Karaalioğlu','Selçuk','Doğuyaka','Aspendos'] },
  { ilce: 'Konyaaltı', mahalleler: ['Hurma','Sarısu','Liman','Uncalı','Arapsuyu','Gürsu','Kızıltoprak','Çakırlar','Döşemealtı (Konyaaltı)','Altınkum','Kuzdere (Konyaaltı)','Camikebir'] },
  { ilce: 'Kepez', mahalleler: ['Varsak','Santral','Yavuz Selim','Pınarbaşı','Altındağ','Göksu','Şafak','Göçerler','Atatürk','Duraliler','Yeşilbayır','Karabağ','Doyran','Çiğdem','Kumluca (Kepez)','Emek','Teomanpaşa','Yıldırım'] },
  { ilce: 'Aksu', mahalleler: ['Aksu Merkez','Boğazkent','Belek','Kadriye','Serik (Aksu)','Çandır','Güneykent','Topaloğlu','Gebiz'] },
  { ilce: 'Döşemealtı', mahalleler: ['Döşemealtı Merkez','Habibler','Varsak (Döşemealtı)','Yağca','Kızılkaya','Antalya OSB çevresi'] },
  { ilce: 'Serik', mahalleler: ['Serik Merkez','Belek','Boğazkent','Kadriye','Taşağıl','Kızılot (Serik)','Titreyengöl'] },
  { ilce: 'Alanya', mahalleler: ['Alanya Merkez','Mahmutlar','Oba','Tosmur','Avsallar','Kestel','Türkler','Konaklı','Cikcilli','Okurcalar','Kargıcak','Dim','Tepe'] },
  { ilce: 'Manavgat', mahalleler: ['Manavgat Merkez','Side','Sorgun','Kumköy','Evrenseki','Gündoğdu','Çolaklı','Titreyengöl','Sarigerme (Manavgat)'] },
  { ilce: 'Kemer', mahalleler: ['Kemer Merkez','Beldibi','Göynük','Çamyuva','Tekirova','Arslanbucak','Kiriş'] },
  { ilce: 'Kaş', mahalleler: ['Kaş Merkez','Kalkan','Bezirgan','Gömbe','Yeşilköy (Kaş)'] },
  { ilce: 'Finike', mahalleler: ['Finike Merkez','Alakır','Kumluca (Finike)','Turunçova'] },
  { ilce: 'Kumluca', mahalleler: ['Kumluca Merkez','Mavikent','Yeşilköy (Kumluca)'] },
  { ilce: 'Elmali', mahalleler: ['Elmalı Merkez','Çığlıkara','Akçay','Bayındır'] },
  { ilce: 'Korkuteli', mahalleler: ['Korkuteli Merkez','Kızılkaya','Belkaya'] },
  { ilce: 'Gündoğmuş', mahalleler: ['Gündoğmuş Merkez'] },
  { ilce: 'İbradı', mahalleler: ['İbradı Merkez','Ormana'] },
  { ilce: 'Akseki', mahalleler: ['Akseki Merkez','Çukurköy','İmecik'] },
];

// ═══════════════════════════════════════
// SEO SCHEMA — GENİŞLETİLMİŞ
// ═══════════════════════════════════════
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://swaphubs.com/terzi",
      "name": "Antalya Terzi — Terzi Can",
      "alternateName": [
        "Terzi Can","Tailor Can","Портной Кан","Schneider Can",
        "Antalya Terzisi","Antalya Tailor","Antalya Kuru Temizleme",
        "Belek by Ercan","Antalya Erkek Terzi","Antalya Bayan Terzi",
        "Antalya Çocuk Kıyafeti Dikimi","Antalya Terzi Servisi"
      ],
      "description": "Antalya'nın en iyi terzisi. Paça kısaltma, tadilat, tamir, daraltma, elbise dikimi, erkek terzi, bayan terzi, çocuk kıyafeti, bebek elbisesi, nevresim, perde dikimi, büyük beden, anne grubu, kuru temizleme, seri imalat, fason imalat. Yerinde ölçü alıp adrese teslim eden araçlı terzi servisi. Turistlere 24 saat hızlı hizmet.",
      "url": "https://swaphubs.com/terzi",
      "telephone": "+90 531 898 64 18",
      "priceRange": "₺₺",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Antalya",
        "addressRegion": "Antalya",
        "addressCountry": "TR"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": "36.8841", "longitude": "30.7056" },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "09:00", "closes": "19:00" }
      ],
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "94", "bestRating": "5" },
      "areaServed": ANTALYA_ILCELER.map(i => ({ "@type": "City", "name": i.ilce })),
      "serviceType": [
        "Paça Kısaltma","Pantolon Kısaltma","Tadilat","Tamir","Daraltma","Beden Küçültme",
        "Büyük Beden Dikimi","Beden Seti Çıkarma","Kuru Temizleme","Çamaşır Yıkama","Ütü Hizmeti",
        "Kalıp Çıkarma","Model Dikimi","Seri İmalat","Fason İmalat","Özel Dikim",
        "Erkek Terzi","Bayan Terzi","Çocuk Kıyafeti Dikimi","Bebek Elbisesi Dikimi",
        "Nevresim Dikimi","Perde Dikimi","Gelinlik","Damatlık","Anne Grubu Dikimi",
        "Terzi Servisi","Araçlı Terzi","Yerinde Ölçü Terzi","Adrese Teslim Terzi",
        "Gömlek Dikimi","Ceket Dikimi","Pantolon Dikimi","Etek Dikimi",
        "Alterations","Custom Tailoring","Dry Cleaning","Pattern Making","Mass Production",
        "Mobile Tailor Service","Home Visit Tailor",
        "Пошив одежды","Ремонт одежды","Химчистка","Пошив по лекалам","Выездной портной",
        "Schneider mit Hausbesuch","Maßanfertigung","Änderungsschneiderei"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Antalya'da paça kısaltma fiyatı ne kadar?", "acceptedAnswer": { "@type": "Answer", "text": "Antalya'da paça kısaltma fiyatı ₺80'den başlar. Pantolon cinsi ve işin niteliğine göre değişir. Ücretsiz fiyat teklifi için WhatsApp +90 531 898 64 18." } },
        { "@type": "Question", "name": "Antalya'da terzi servisi var mı? Eve gelip ölçü alıyor musunuz?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, araçlı terzi servisimizle adresinize gelip ölçü alıyor, dikimi tamamlayıp tekrar teslim ediyoruz. Tüm Antalya ilçelerine servis mevcuttur." } },
        { "@type": "Question", "name": "Büyük beden terzi Antalya — büyük beden kıyafet dikimi yapıyor musunuz?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, her bedene özel dikim yapıyoruz. Büyük beden elbise, büyük beden pantolon, beden seti çıkarma ve beden küçültme hizmeti sunuyoruz." } },
        { "@type": "Question", "name": "Antalya'da nevresim ve perde dikimi yaptırılır mı?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, nevresim takımı dikimi, perde dikimi ve ev tekstili hizmetleri sunuyoruz. Ölçülerinize göre özel dikim yapıyoruz." } },
        { "@type": "Question", "name": "Bebek ve çocuk kıyafeti dikimi yapıyor musunuz?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, bebek elbisesi, çocuk kıyafeti ve özel tasarım çocuk kostümleri dikiyoruz. Anne grubu toplu siparişler için de özel fiyat mevcuttur." } },
        { "@type": "Question", "name": "Fason imalat ve seri üretim yapıyor musunuz?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, kalıp çıkarma, model dikimi, numune hazırlama ve seri imalat hizmeti sunuyoruz. Markalar ve firmalar için fason üretim kapasitemiz mevcuttur." } },
        { "@type": "Question", "name": "Where can I find a tailor in Antalya with home/hotel delivery?", "acceptedAnswer": { "@type": "Answer", "text": "Terzi Can offers a mobile tailor service in Antalya — we come to your address or hotel, take measurements, and deliver the finished garment. WhatsApp +90 531 898 64 18." } },
        { "@type": "Question", "name": "Где найти портного в Анталье с выездом на дом?", "acceptedAnswer": { "@type": "Answer", "text": "Terzi Can предлагает выездной сервис портного в Анталье — приедем к вам домой или в отель, снимем мерки и доставим готовое изделие. WhatsApp: +90 531 898 64 18." } },
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "SwapHubs", "item": "https://swaphubs.com" },
        { "@type": "ListItem", "position": 2, "name": "Terzi Antalya", "item": "https://swaphubs.com/terzi" }
      ]
    }
  ]
};

// ═══════════════════════════════════════
// İÇERİK — 4 DİL
// ═══════════════════════════════════════
const C = {
  tr: {
    badge: '✂ Antalya · Terzi Can',
    h1: 'Antalya\'nın',
    h1em: 'Terzisi',
    sub: 'Erkek · Bayan · Çocuk · Bebek · Tadilat · Dikim · Fason · Seri İmalat',
    waBtn: 'WhatsApp\'tan Yazın',
    downBtn: 'Hizmetleri Gör ↓',
    waMsg: 'Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.',
    s1: 'Hizmetlerimiz', s1t: 'Ne Yapıyoruz?',
    s2: 'Neden Biz?', s2t: 'Neden Bizi\nSeçmelisiniz?',
    s3: 'Sık Sorulan Sorular',
    s4: 'Müşteri Yorumları',
    s5: 'Hizmet Bölgeleri',
    s6: 'İletişim', s6t: 'Bize Ulaşın',
    s6sub: 'WhatsApp\'tan mesaj atın, hemen yanıt verelim',
    waLabel: 'WhatsApp\'tan Yaz',
    mapLabel: 'Haritada Bul',
    mobileSvcTitle: 'Terzi Servisi',
    mobileSvcBadge: '🚗 YENİ HİZMET',
    mobileSvcHeading: 'Kapınıza Geliyoruz',
    mobileSvcDesc: 'Araçlı terzi servisimizle tüm Antalya\'ya hizmet veriyoruz. Terzi Can ekibimiz adresinize geliyor, yerinde ölçü alıyor; dikimi tamamlayıp tekrar kapınıza teslim ediyor. Otel, ev, işyeri — fark etmez.',
    mobileSvcSteps: ['📍 Adresinizi Bildirin','📏 Yerinde Ölçü Alınır','✂️ Atölyede Dikilir','🚗 Kapıya Teslim'],
    mobileSvcStepLabels: ['WhatsApp\'tan konum paylaşın','Terzi adresinize gelir','Ölçüye göre dikim yapılır','Belirlenen vakitte teslim'],
    mobileSvcCta: '📲 Terzi Servisi Talep Et',
    mobileSvcWaMsg: 'Merhaba, terzi servisinizden yararlanmak istiyorum. Adresime gelebilir misiniz?',
    seoP1: 'Antalya\'nın en deneyimli terzisi Terzi Can. Paça kısaltma, pantolon kısaltma, elbise daraltma, beden küçültme, kıyafet tamiri, kuru temizleme, çamaşır yıkama, ütü hizmeti, kalıp çıkarma, model dikimi, seri imalat ve fason imalat. Muratpaşa, Konyaaltı, Kepez, Lara, Belek, Kemer ve tüm Antalya ilçelerine hizmet. Turistlere 24-48 saat ekspres servis, otele alım-teslimat.',
    seoP2: 'Antalya erkek terzi, Antalya bayan terzi, Antalya çocuk kıyafeti dikimi, bebek elbisesi dikimi, anne grubu toplu dikimi, büyük beden elbise dikimi, büyük beden pantolon dikimi, beden seti çıkarma Antalya. Nevresim dikimi Antalya, perde dikimi Antalya, gömlek dikimi Antalya, ceket dikimi Antalya, pantolon dikimi Antalya. Paça kısaltma fiyatı, daraltma fiyatı, terzi fiyatları, dikim fiyatları Antalya.',
    seoP3: 'Antalya terzi servisi — araçlı terzi, yerinde ölçü alan terzi, adrese teslim terzi. Lara terzi, Konyaaltı terzi, Belek terzi, Kemer terzi, Alanya terzi, Manavgat terzi, Side terzi, Kepez terzi, Muratpaşa terzi. Terzi Can ile Antalya\'nın her ilçe ve mahallesine hizmet.',
    seoP4: 'Портной Кан в Анталье. Подгонка брюк, ремонт одежды, химчистка Анталья, стирка, глажка, пошив по лекалам, серийное производство. Говорим по-русски. Выездной портной — приедем к вам. Доставка в отель.',
    faq: [
      { q: 'Paça kısaltma fiyatı ne kadar?', a: 'Antalya\'da paça kısaltma fiyatımız ₺150\'den başlar. Kumaş türü ve işin niteliğine göre değişir. WhatsApp\'tan ücretsiz fiyat teklifi alabilirsiniz.' },
      { q: 'Eve ya da otele gelip ölçü alıyor musunuz?', a: 'Evet! Araçlı terzi servisimizle Antalya\'nın tüm ilçelerine geliyoruz. Adresinize gidip ölçü alıyor, dikip tekrar teslim ediyoruz.' },
      { q: 'Büyük beden ve özel beden dikimi yapıyor musunuz?', a: 'Evet, büyük beden elbise, pantolon, gömlek dikimi ve beden seti çıkarma hizmeti sunuyoruz. Her bedene özel kalıp hazırlıyoruz.' },
      { q: 'Çocuk kıyafeti ve bebek elbisesi dikimi var mı?', a: 'Evet, çocuk kıyafeti, bebek elbisesi ve özel kostüm dikiyoruz. Anne grupları için toplu sipariş indirimi uygulanır.' },
      { q: 'Nevresim ve perde dikimi yapıyor musunuz?', a: 'Evet, ölçüye özel nevresim takımı, perde, kırlent ve ev tekstili dikimi yapıyoruz.' },
      { q: 'Seri imalat ve fason üretim yapıyor musunuz?', a: 'Evet, kalıp çıkarma, numune dikimi ve seri imalat hizmeti veriyoruz. Firmalar ve markalar için fason üretim yapıyoruz.' },
      { q: 'Kuru temizleme ve çamaşır yıkama hizmeti var mı?', a: 'Evet, profesyonel kuru temizleme, çamaşır yıkama ve ütü hizmeti sunuyoruz. Otelden alım ve teslimat yapıyoruz.' },
      { q: 'Tüm Antalya ilçelerine hizmet veriyor musunuz?', a: 'Evet, Muratpaşa, Konyaaltı, Kepez, Aksu, Lara, Belek, Kemer, Alanya, Manavgat ve tüm Antalya ilçelerine hizmet veriyoruz.' },
    ],
  },
  en: {
    badge: '✂ Antalya · Tailor Can',
    h1: 'Antalya\'s',
    h1em: 'Master Tailor',
    sub: 'Men · Women · Children · Baby · Alterations · Custom · Mass Production',
    waBtn: 'WhatsApp Us Now',
    downBtn: 'View Services ↓',
    waMsg: 'Hello, I would like information about your tailoring service.',
    s1: 'Services', s1t: 'What We Offer',
    s2: 'Why Us?', s2t: 'Why Choose\nUs?',
    s3: 'FAQ',
    s4: 'Reviews',
    s5: 'Service Areas',
    s6: 'Contact', s6t: 'Get in Touch',
    s6sub: 'Send a WhatsApp message, we\'ll reply instantly',
    waLabel: 'Chat on WhatsApp',
    mapLabel: 'Find on Map',
    mobileSvcTitle: 'Mobile Tailor Service',
    mobileSvcBadge: '🚗 NEW SERVICE',
    mobileSvcHeading: 'We Come to You',
    mobileSvcDesc: 'Our mobile tailor service covers all of Antalya. We visit your address, take measurements on-site, complete the tailoring in our workshop, and deliver back to your door. Hotel, home, or office — no problem.',
    mobileSvcSteps: ['📍 Share Your Address','📏 On-Site Measurements','✂️ Tailored in Workshop','🚗 Delivered to Your Door'],
    mobileSvcStepLabels: ['Send location via WhatsApp','Tailor comes to you','Sewn to your measurements','Delivered at agreed time'],
    mobileSvcCta: '📲 Request Mobile Tailor',
    mobileSvcWaMsg: 'Hello, I would like to use your mobile tailor service. Can you come to my address?',
    seoP1: 'Terzi Can — Antalya\'s most experienced tailor. Trouser hemming, dress alterations, clothing repairs, size reduction, dry cleaning, laundry, ironing, pattern making, custom design, mass production and contract manufacturing. Serving all Antalya districts. Express 24-48h service for tourists, hotel pickup & delivery.',
    seoP2: 'Men\'s tailor Antalya, women\'s tailor Antalya, children\'s clothing Antalya, baby clothes sewing, plus-size clothing alterations, pattern making Antalya, curtain sewing Antalya, bed linen sewing Antalya, shirt sewing, jacket alterations, trouser hemming Antalya. Tailor prices Antalya.',
    seoP3: 'Mobile tailor Antalya — we come to your home or hotel, take measurements, and deliver finished garments. English speaking tailor. Hotel pickup and delivery. Express 24h service. Lara tailor, Konyaaltı tailor, Belek tailor, Kemer tailor, Alanya tailor, Manavgat tailor, Side tailor.',
    seoP4: '',
    faq: [
      { q: 'How much does trouser hemming cost?', a: 'Trouser hemming starts from ₺150. Price depends on fabric type. WhatsApp us for a free quote.' },
      { q: 'Do you come to my hotel or home?', a: 'Yes! Our mobile tailor service covers all Antalya districts. We visit your address, measure, tailor and deliver back to you.' },
      { q: 'Do you sew plus-size clothing?', a: 'Yes, we sew plus-size dresses, trousers, shirts and make custom pattern sets for all body types.' },
      { q: 'Do you sew children\'s and baby clothing?', a: 'Yes, we sew children\'s clothing, baby dresses and custom costumes. Group discounts for parent communities.' },
      { q: 'Do you sew curtains and bed linen?', a: 'Yes, we sew custom-sized bed linen sets, curtains, cushion covers and home textiles.' },
      { q: 'Do you do mass production and contract manufacturing?', a: 'Yes, we offer pattern making, sample sewing, and mass production for brands and businesses.' },
      { q: 'Do you offer dry cleaning and laundry?', a: 'Yes, professional dry cleaning, laundry and ironing with hotel pickup and delivery.' },
      { q: 'Do you serve all Antalya districts?', a: 'Yes — Muratpaşa, Konyaaltı, Kepez, Lara, Belek, Kemer, Alanya, Manavgat and all districts.' },
    ],
  },
  ru: {
    badge: '✂ Анталья · Портной Кан',
    h1: 'Лучший',
    h1em: 'Портной Антальи',
    sub: 'Мужская · Женская · Детская · Пошив · Химчистка · Серийное производство',
    waBtn: 'Написать в WhatsApp',
    downBtn: 'Смотреть услуги ↓',
    waMsg: 'Здравствуйте, хотел бы узнать о ваших услугах портного.',
    s1: 'Услуги', s1t: 'Что мы предлагаем',
    s2: 'Почему мы?', s2t: 'Почему\nвыбирают нас?',
    s3: 'Вопросы и ответы',
    s4: 'Отзывы',
    s5: 'Районы обслуживания',
    s6: 'Контакты', s6t: 'Связаться с нами',
    s6sub: 'Напишите в WhatsApp, ответим сразу',
    waLabel: 'Написать в WhatsApp',
    mapLabel: 'Найти на карте',
    mobileSvcTitle: 'Выездной портной',
    mobileSvcBadge: '🚗 НОВАЯ УСЛУГА',
    mobileSvcHeading: 'Приедем к вам',
    mobileSvcDesc: 'Наш выездной портной обслуживает всю Анталью. Приедем по вашему адресу, снимем мерки на месте, сошьём в ателье и доставим обратно. Отель, дом или офис — всё равно.',
    mobileSvcSteps: ['📍 Укажите адрес','📏 Снятие мерок','✂️ Пошив в ателье','🚗 Доставка к вам'],
    mobileSvcStepLabels: ['Отправьте локацию в WhatsApp','Портной приедет к вам','Изделие сошьётся по меркам','Доставим в назначенное время'],
    mobileSvcCta: '📲 Вызвать портного',
    mobileSvcWaMsg: 'Здравствуйте, хочу воспользоваться выездным сервисом. Можете приехать по моему адресу?',
    seoP1: 'Портной Кан — опытный портной в Анталье. Подгонка брюк, ремонт одежды, уменьшение размера, химчистка, стирка, глажка, пошив по лекалам, модельный пошив и серийное производство. Обслуживаем все районы Антальи. Экспресс 24-48 часов, забор и доставка в отель.',
    seoP2: 'Портной для мужчин Анталья, портной для женщин Анталья, пошив детской одежды, пошив одежды для малышей, пошив для мам-групп, одежда больших размеров, пошив штор Анталья, пошив постельного белья Анталья, пошив рубашек, пошив пиджаков Анталья.',
    seoP3: 'Выездной портной Анталья — приедем домой или в отель, снимем мерки и доставим готовое изделие. Говорим по-русски. Лара, Коньяалты, Белек, Кемер, Аланья, Манавгат, Сиде.',
    seoP4: '',
    faq: [
      { q: 'Сколько стоит подгонка брюк?', a: 'Подгонка брюк от ₺150. Зависит от типа ткани. Напишите в WhatsApp для бесплатной оценки.' },
      { q: 'Вы приезжаете домой или в отель?', a: 'Да! Наш выездной портной работает по всей Анталье. Приедем, снимем мерки и доставим готовое изделие.' },
      { q: 'Шьёте одежду больших размеров?', a: 'Да, шьём платья, брюки, рубашки больших размеров и делаем лекала для любой фигуры.' },
      { q: 'Шьёте детскую и одежду для малышей?', a: 'Да, шьём детскую одежду, платья для малышей и костюмы. Скидки для мам-групп.' },
      { q: 'Шьёте шторы и постельное бельё?', a: 'Да, шьём постельное бельё, шторы, чехлы для подушек и домашний текстиль по меркам.' },
      { q: 'Серийное производство и пошив по договору?', a: 'Да, предлагаем пошив по лекалам, образцы и серийное производство для брендов и компаний.' },
      { q: 'Химчистка и стирка?', a: 'Да, профессиональная химчистка, стирка и глажка. Забор и доставка в отель.' },
      { q: 'Обслуживаете все районы Антальи?', a: 'Да — Муратпаша, Коньяалты, Кепез, Лара, Белек, Кемер, Аланья, Манавгат и все районы.' },
    ],
  },
  de: {
    badge: '✂ Antalya · Schneider Can',
    h1: 'Antalyas',
    h1em: 'Meisterschneider',
    sub: 'Herren · Damen · Kinder · Baby · Änderungen · Maßanfertigung · Produktion',
    waBtn: 'WhatsApp schreiben',
    downBtn: 'Leistungen ansehen ↓',
    waMsg: 'Hallo, ich möchte Informationen über Ihren Schneiderservice erhalten.',
    s1: 'Leistungen', s1t: 'Was wir anbieten',
    s2: 'Warum wir?', s2t: 'Warum\nSchneider Can?',
    s3: 'Häufige Fragen',
    s4: 'Kundenbewertungen',
    s5: 'Servicegebiete',
    s6: 'Kontakt', s6t: 'Kontaktieren Sie uns',
    s6sub: 'Schreiben Sie uns auf WhatsApp — wir antworten sofort',
    waLabel: 'WhatsApp schreiben',
    mapLabel: 'Auf Karte finden',
    mobileSvcTitle: 'Mobiler Schneiderdienst',
    mobileSvcBadge: '🚗 NEUER SERVICE',
    mobileSvcHeading: 'Wir kommen zu Ihnen',
    mobileSvcDesc: 'Unser mobiler Schneiderdienst ist in ganz Antalya verfügbar. Wir kommen zu Ihrer Adresse, nehmen Maße vor Ort, schneidern in unserem Atelier und liefern zurück zu Ihnen. Hotel, Zuhause oder Büro — kein Problem.',
    mobileSvcSteps: ['📍 Adresse mitteilen','📏 Maßnahme vor Ort','✂️ Arbeit im Atelier','🚗 Lieferung zu Ihnen'],
    mobileSvcStepLabels: ['Standort per WhatsApp senden','Schneider kommt zu Ihnen','Wird nach Maß gefertigt','Lieferung zur vereinbarten Zeit'],
    mobileSvcCta: '📲 Mobilen Schneider anfragen',
    mobileSvcWaMsg: 'Hallo, ich möchte den mobilen Schneiderdienst nutzen. Können Sie zu meiner Adresse kommen?',
    seoP1: 'Schneider Can — erfahrener Schneider in Antalya & Konyaaltı. Hosenänderungen, Kleideränderungen, Reparaturen, Reinigung, Wäsche, Bügeln, Schnittmuster, Maßanfertigung und Serienproduktion. Service in allen Antalya-Bezirken. Express 24-48h, Abholung und Lieferung ins Hotel.',
    seoP2: 'Herrenschneider Antalya, Damenschneider Antalya, Kinderkleidung nähen Antalya, Babykleidung nähen, Übergrössen nähen, Vorhangnähen Antalya, Bettwäsche nähen Antalya, Hemd nähen, Jacke ändern Antalya. Schneiderpreise Antalya.',
    seoP3: 'Mobiler Schneider Antalya — wir kommen zu Ihnen nach Hause oder ins Hotel, nehmen Maße und liefern das fertige Kleidungsstück. Deutschsprachiger Schneider. Konyaaltı, Lara, Belek, Kemer, Alanya, Manavgat.',
    seoP4: '',
    faq: [
      { q: 'Was kostet das Kürzen einer Hose?', a: 'Das Kürzen einer Hose beginnt ab ₺150. Je nach Stoff und Aufwand. WhatsApp für ein kostenloses Angebot.' },
      { q: 'Kommen Sie ins Hotel oder nach Hause?', a: 'Ja! Unser mobiler Schneiderdienst fährt in alle Antalya-Bezirke. Wir kommen, nehmen Maße und liefern fertig zurück.' },
      { q: 'Nähen Sie Kleidung in Übergrößen?', a: 'Ja, wir nähen Kleider, Hosen und Hemden in Übergrößen und erstellen Schnittmuster für jede Figur.' },
      { q: 'Nähen Sie Kinder- und Babykleidung?', a: 'Ja, wir nähen Kinderkleidung, Babykleider und Kostüme. Gruppenrabatte für Elterngruppen.' },
      { q: 'Nähen Sie Vorhänge und Bettwäsche?', a: 'Ja, wir nähen Bettwäsche, Vorhänge und Heimtextilien nach Maß.' },
      { q: 'Serienproduktion und Auftragsherstellung?', a: 'Ja, wir bieten Schnittmuster, Muster und Serienproduktion für Marken und Unternehmen an.' },
      { q: 'Reinigung und Wäscheservice?', a: 'Ja, professionelle Reinigung, Wäsche und Bügeln mit Hotelabholung und -lieferung.' },
      { q: 'Bedienen Sie alle Bezirke von Antalya?', a: 'Ja — Konyaaltı, Muratpaşa, Kepez, Lara, Belek, Kemer, Alanya, Manavgat und alle weiteren Bezirke.' },
    ],
  },
};

// ═══════════════════════════════════════
// HİZMETLER — TAM GENİŞLETİLMİŞ 15 KATEGORİ
// ═══════════════════════════════════════
const SERVICES = [
  {
    icon: '✂️', color: '#fdecea',
    names: ['Paça Kısaltma & Tadilat', 'Hemming & Alterations', 'Подгонка и ремонт', 'Änderungen & Reparaturen'],
    descs: [
      'Paça kısaltma, pantolon kısaltma, daraltma, genişletme, bel alma, fermuar değişimi, yırtık onarımı, beden küçültme.',
      'Trouser hemming, taking in/out, waist adjustments, zip replacement, tear repairs, size reduction.',
      'Подгонка брюк, заужение/расширение, замена молнии, ремонт, уменьшение размера.',
      'Hose kürzen, einengen/weiten, Bund ändern, Reißverschluss, Reparaturen, Größe anpassen.'
    ],
    price: '₺150+',
  },
  {
    icon: '👨', color: '#e8f5e9',
    names: ['Erkek Terzi', 'Men\'s Tailoring', 'Мужская одежда', 'Herrenschneider'],
    descs: [
      'Erkek takım elbise, ceket, gömlek, pantolon, blazer dikim ve tadilat. Ofis ve özel gün kıyafetleri.',
      'Men\'s suits, jackets, shirts, trousers, blazers — custom or altered. Office and occasion wear.',
      'Мужские костюмы, пиджаки, рубашки, брюки — пошив и подгонка.',
      'Herren Anzüge, Jacken, Hemden, Hosen — Maßanfertigung oder Änderungen.'
    ],
    price: '₺800+',
  },
  {
    icon: '👩', color: '#fce4ec',
    names: ['Bayan Terzi', 'Women\'s Tailoring', 'Женская одежда', 'Damenschneider'],
    descs: [
      'Bayan elbise, etek, bluz, pantolon, ceket dikimi. Günlük, iş ve özel gün kıyafetleri ölçüye özel.',
      'Women\'s dresses, skirts, blouses, trousers — custom made to your exact measurements.',
      'Женские платья, юбки, блузки, брюки — пошив по меркам.',
      'Damenkleider, Röcke, Blusen, Hosen — nach Maß gefertigt.'
    ],
    price: '₺600+',
  },
  {
    icon: '👶', color: '#fff8e1',
    names: ['Çocuk & Bebek Kıyafeti', 'Children & Baby Clothing', 'Детская и детская одежда', 'Kinder & Babykleidung'],
    descs: [
      'Bebek elbisesi, çocuk kıyafeti, özel kostüm dikimi. Anne grubu toplu sipariş indirimi uygulanır.',
      'Baby dresses, children\'s clothing, custom costumes. Group discounts for parent communities.',
      'Платья для малышей, детская одежда, костюмы. Скидки для мам-групп.',
      'Babykleider, Kinderkleidung, Kostüme. Gruppenrabatt für Elterngruppen.'
    ],
    price: '₺400+',
  },
  {
    icon: '📏', color: '#f3e5f5',
    names: ['Büyük Beden & Beden Seti', 'Plus Size & Pattern Set', 'Большие размеры', 'Übergrößen & Schnittmuster'],
    descs: [
      'Büyük beden elbise, pantolon, gömlek dikimi. Beden seti çıkarma, özel kalıp hazırlama. Her vücuda uygun.',
      'Plus-size dresses, trousers, shirts. Custom pattern sets made for every body shape.',
      'Одежда больших размеров. Индивидуальные лекала для любой фигуры.',
      'Übergrößen-Kleider, Hosen, Hemden. Individuelle Schnittmuster für jede Figur.'
    ],
    price: '₺700+',
  },
  {
    icon: '💍', color: '#e8eaf6',
    names: ['Gelinlik & Abiye', 'Wedding & Evening', 'Свадебное платье', 'Brautkleid & Abend'],
    descs: [
      'Gelinlik, damatlık, abiye, nişan ve gece elbisesi dikimi ve tadilatı. Özel gün için kusursuz fit.',
      'Wedding dresses, groom suits, evening gowns — custom or altered for a perfect fit.',
      'Свадебные платья, смокинги, вечерние наряды — пошив и подгонка.',
      'Brautkleider, Anzüge, Abendkleider — Maßanfertigung oder Änderungen.'
    ],
    price: '₺5.000+',
  },
  {
    icon: '🏠', color: '#e0f7fa',
    names: ['Nevresim & Perde Dikimi', 'Home Textiles', 'Шторы и постельное бельё', 'Vorhänge & Bettwäsche'],
    descs: [
      'Nevresim takımı, perde, kırlent, stor perde, tül dikimi. Ölçüye ve kumaşa özel ev tekstili.',
      'Bed linen sets, curtains, cushion covers, roller blinds. Custom home textiles to your measurements.',
      'Постельное бельё, шторы, подушки. По вашим меркам и ткани.',
      'Bettwäsche, Vorhänge, Kissenüberzüge. Maßgefertigte Heimtextilien.'
    ],
    price: '₺500+',
  },
  {
    icon: '🧺', color: '#e3f2fd',
    names: ['Kuru Temizleme', 'Dry Cleaning', 'Химчистка', 'Chemische Reinigung'],
    descs: [
      'Profesyonel kuru temizleme hizmeti. Otelden alım ve teslimat.',
      'Professional dry cleaning. Hotel pickup and delivery available.',
      'Профессиональная химчистка. Забор и доставка из отеля.',
      'Professionelle chemische Reinigung. Abholung und Lieferung ins Hotel.'
    ],
    price: '₺400+',
  },
  {
    icon: '👕', color: '#fef3e2',
    names: ['Çamaşır Yıkama & Ütü', 'Laundry & Ironing', 'Стирка и глажка', 'Wäsche & Bügeln'],
    descs: [
      'Çamaşır yıkama, kurutma ve ütü hizmeti. Otele teslimat.',
      'Laundry, drying and ironing. Hotel delivery.',
      'Стирка, сушка и глажка. Доставка в отель.',
      'Wäsche, Trocknen und Bügeln. Lieferung ins Hotel.'
    ],
    price: '₺300+',
  },
  {
    icon: '📐', color: '#f9fbe7',
    names: ['Kalıp Çıkarma', 'Pattern Making', 'Пошив по лекалам', 'Schnittmuster'],
    descs: [
      'Mevcut kıyafetten veya sıfırdan profesyonel kalıp çıkarma. Her beden ve model için.',
      'Pattern making from existing garments or from scratch. For any size or style.',
      'Лекала по образцу или с нуля. Для любого размера.',
      'Schnittmustererstellung vom Kleidungsstück oder von Grund auf.'
    ],
    price: '₺1000+',
  },
  {
    icon: '🎨', color: '#fbe9e7',
    names: ['Model & Tasarım Dikimi', 'Design & Prototype', 'Модельный пошив', 'Design & Prototyp'],
    descs: [
      'Özgün model tasarımı, prototip ve numune dikimi. Markalar ve butikler için.',
      'Original design, prototype and sample sewing for brands and boutiques.',
      'Оригинальный дизайн, прототип и образец для брендов.',
      'Originales Modelldesign, Prototyp und Muster für Marken.'
    ],
    price: '₺1500+',
  },
  {
    icon: '🏭', color: '#e8f5e9',
    names: ['Seri İmalat & Fason', 'Mass Production', 'Серийное производство', 'Serienproduktion'],
    descs: [
      'Firmalar ve markalar için seri kıyafet üretimi ve fason imalat. Kaliteli, hızlı, uygun fiyatlı.',
      'Mass production and contract manufacturing for businesses and brands.',
      'Серийное производство для компаний и брендов. Качество и скорость.',
      'Serienproduktion für Unternehmen und Marken. Qualität, schnell, günstig.'
    ],
    price: 'Teklif Al',
  },
  {
    icon: '🧥', color: '#fdecea',
    names: ['Mont & Palto Tadilat', 'Winter Clothing', 'Зимняя одежда', 'Winterkleidung'],
    descs: [
      'Mont, kaban, palto tadilat, astar değiştirme ve onarım.',
      'Coat, jacket, overcoat alterations and lining replacement.',
      'Пальто, куртки, замена подкладки и ремонт.',
      'Mantel, Jacke, Überzieher ändern und Futter ersetzen.'
    ],
    price: '₺300+',
  },
  {
    icon: '🎭', color: '#f3e5f5',
    names: ['Kostüm & Üniforma', 'Costumes & Uniforms', 'Костюмы и форма', 'Kostüme & Uniformen'],
    descs: [
      'Tiyatro, film kostümü; okul, iş ve spor üniforması dikimi ve tadilatı.',
      'Theater/film costumes, school/work/sport uniforms — custom or altered.',
      'Театральные костюмы, школьная и рабочая форма — пошив и подгонка.',
      'Theaterkostüme, Schul- und Arbeitsuniform — Maßanfertigung oder Änderungen.'
    ],
    price: '₺1500+',
  },
];

const WHY = [
  { icon: '⚡', tr: ['24–48 Saat Teslimat', 'Tatildesiniz, beklemenize gerek yok. Ekspres hizmet garantisi.'], en: ['24–48h Express', 'You\'re on holiday — no waiting. Express service guaranteed.'], ru: ['24–48 часов', 'Вы в отпуске — экспресс-сервис.'], de: ['24–48h Express', 'Sie sind im Urlaub — kein Warten. Expressdienst garantiert.'] },
  { icon: '🚗', tr: ['Araçlı Terzi Servisi', 'Adresinize gelip ölçü alıyor, bitirince tekrar teslim ediyoruz.'], en: ['Mobile Tailor', 'We come to you, measure on-site and deliver when ready.'], ru: ['Выездной портной', 'Приедем к вам, снимем мерки и доставим готовое изделие.'], de: ['Mobiler Schneider', 'Wir kommen zu Ihnen, messen vor Ort und liefern fertig zurück.'] },
  { icon: '🌍', tr: ['4 Dilde Hizmet', 'Türkçe, İngilizce, Rusça ve Almanca. Dil engeli yok.'], en: ['4 Languages', 'Turkish, English, Russian, German — no language barrier.'], ru: ['4 языка', 'Турецкий, английский, русский, немецкий.'], de: ['4 Sprachen', 'Türkisch, Englisch, Russisch, Deutsch — keine Sprachbarriere.'] },
  { icon: '🏨', tr: ['Otele Alım & Teslimat', 'Tüm Antalya otellerine alım ve teslimat hizmeti.'], en: ['Hotel Pickup & Delivery', 'Pickup and delivery to all Antalya hotels.'], ru: ['Забор и доставка', 'Забираем и доставляем в любой отель Антальи.'], de: ['Hotel Abholung & Lieferung', 'Abholung und Lieferung in alle Antalya-Hotels.'] },
  { icon: '💳', tr: ['Döviz Kabul', 'TL, Euro, Dolar, Ruble kabul ediyoruz.'], en: ['Multi-Currency', 'TL, Euro, Dollar and Ruble accepted.'], ru: ['Валюта', 'TL, евро, доллар, рубли.'], de: ['Währungen', 'TL, Euro, Dollar und Rubel akzeptiert.'] },
  { icon: '⭐', tr: ['94 Memnun Müşteri', 'Google\'da 4.9 yıldız. Antalya\'nın en tercih edilen terzisi.'], en: ['94 Happy Clients', '4.9 stars on Google. Most recommended tailor in Antalya.'], ru: ['94 клиента', '4.9 звезды на Google.'], de: ['94 zufriedene Kunden', '4,9 Sterne auf Google. Beliebtester Schneider in Antalya.'] },
];

const REVIEWS = [
  { stars: 5, text: '"Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional. Highly recommend!"', author: 'Sarah M.', flag: '🇬🇧', city: 'London', date: 'Mayıs 2025' },
  { stars: 5, text: '"Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель в Белеке!"', author: 'Наталья К.', flag: '🇷🇺', city: 'Москва', date: 'Haziran 2025' },
  { stars: 5, text: '"Gelinliğimi mükemmel şekilde teslim ettiler. Hızlı, kaliteli hizmet. Paça kısaltmayı aynı gün yaptılar!"', author: 'Elif Y.', flag: '🇹🇷', city: 'Antalya', date: 'Nisan 2025' },
  { stars: 5, text: '"Suit altered for a business meeting in 24h. Perfect fit. English speaking — best tailor in Antalya!"', author: 'James T.', flag: '🇦🇺', city: 'Sydney', date: 'Mart 2025' },
  { stars: 5, text: '"Çocuğuma özel kostüm diktirdim, çok şıktı! Hızlı ve uygun fiyatlı. Teşekkürler Terzi Can!"', author: 'Ayşe K.', flag: '🇹🇷', city: 'Antalya', date: 'Mart 2025' },
  { stars: 5, text: '"Kuru temizleme ve ütü hizmetleri mükemmeldi. Otelden aldılar, otele teslim ettiler. Çok pratik!"', author: 'Mehmet A.', flag: '🇹🇷', city: 'İstanbul', date: 'Temmuz 2025' },
];

// SEO anahtar kelimeleri — GENİŞLETİLMİŞ 4 DİL
const SEO_KEYWORDS = [
  // TR
  'Antalya Terzi','Terzi Antalya','Paça Kısaltma Antalya','Pantolon Kısaltma Antalya',
  'Tadilat Antalya','Tamir Antalya','Daraltma Antalya','Beden Küçültme Antalya',
  'Kıyafet Tamir Antalya','Elbise Daraltma Antalya','Kuru Temizleme Antalya',
  'Çamaşır Yıkama Antalya','Ütü Hizmeti Antalya','Kalıp Çıkarma Antalya',
  'Model Dikimi Antalya','Seri İmalat Antalya','Fason İmalat Antalya',
  'Özel Dikim Antalya','Gelinlik Antalya','Damatlık Antalya',
  'Erkek Terzi Antalya','Bayan Terzi Antalya','Çocuk Kıyafeti Dikimi Antalya',
  'Bebek Elbisesi Dikimi Antalya','Büyük Beden Dikim Antalya',
  'Nevresim Dikimi Antalya','Perde Dikimi Antalya',
  'Gömlek Dikimi Antalya','Ceket Tadilat Antalya','Pantolon Dikimi Antalya',
  'Terzi Servisi Antalya','Araçlı Terzi Antalya','Beden Seti Çıkarma Antalya',
  'Fermuar Değişimi Antalya','Anne Grubu Dikimi Antalya',
  'Lara Terzi','Konyaaltı Terzi','Belek Terzi','Kemer Terzi',
  'Alanya Terzi','Manavgat Terzi','Side Terzi','Kepez Terzi','Muratpaşa Terzi',
  'Paça Fiyatı Antalya','Terzi Fiyatları Antalya','Dikim Fiyatları Antalya',
  // EN
  'Tailor Antalya','Antalya Tailor','Dry Cleaning Antalya','Pattern Making Antalya',
  'Mobile Tailor Antalya','Home Visit Tailor Antalya','Plus Size Tailor Antalya',
  'Children Clothing Antalya','Baby Dress Antalya',
  // RU
  'Портной Анталья','Химчистка Анталья','Пошив Анталья','Выездной портной Анталья',
  // DE
  'Schneider Antalya','Reinigung Antalya','Änderungsschneiderei Antalya',
];

// ═══════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════
export default function TerziClient() {
  const [lang, setLang] = useState<Lang>('tr');
  const [activeIlce, setActiveIlce] = useState<string | null>(null);
  const c = C[lang];
  const li: Record<Lang, number> = { tr: 0, en: 1, ru: 2, de: 3 };
  const idx = li[lang];

  const waLink = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div style={{ fontFamily: "'Outfit', sans-serif", background: '#faf8f4', minHeight: '100vh', color: '#2c2418' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }

          @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
          @keyframes floatScissors { 0%,100%{transform:translateY(0) rotate(-8deg);} 50%{transform:translateY(-6px) rotate(-8deg);} }
          @keyframes drawLine { from{stroke-dashoffset:200} to{stroke-dashoffset:0} }
          @keyframes glowGold { 0%,100%{filter:drop-shadow(0 0 6px rgba(184,149,74,0.3));} 50%{filter:drop-shadow(0 0 16px rgba(184,149,74,0.7));} }
          @keyframes shimmerBg { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
          @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

          .fu  { animation: fadeUp 0.55s ease both; }
          .fu2 { animation: fadeUp 0.55s 0.12s ease both; }
          .fu3 { animation: fadeUp 0.55s 0.24s ease both; }
          .fu4 { animation: fadeUp 0.55s 0.36s ease both; }

          .svc-card { transition: transform 0.22s, box-shadow 0.22s; cursor: default; }
          .svc-card:hover { transform: translateY(-6px); box-shadow: 0 18px 36px rgba(0,0,0,0.11); }

          .faq-item { border-bottom: 1px solid #e8dcc8; }
          .faq-q { cursor: pointer; padding: 16px 0; display: flex; justify-content: space-between; align-items: center; }
          .faq-a { font-size: 13px; color: #6b5a4a; line-height: 1.75; padding-bottom: 16px; }
          details[open] .faq-arrow { transform: rotate(45deg); }
          .faq-arrow { transition: transform 0.2s; display: inline-block; }

          .ilce-btn { transition: all 0.15s; cursor: pointer; }
          .ilce-btn:hover { transform: scale(1.04); }

          .area-pill { display: inline-block; margin: 3px; padding: 5px 12px; border-radius: 20px; background: rgba(184,149,74,0.08); border: 1px solid rgba(184,149,74,0.18); font-size: 11px; color: #7a5a20; font-weight: 500; }
          .kw-pill { display: inline-block; margin: 2px; padding: 3px 9px; border-radius: 10px; background: rgba(184,149,74,0.06); border: 1px solid rgba(184,149,74,0.1); font-size: 10px; color: rgba(212,175,110,0.55); }

          .sticky-wa { position: fixed; bottom: 0; left: 0; right: 0; padding: 10px 20px 20px; background: linear-gradient(to top, #faf8f4 55%, transparent); z-index: 50; pointer-events: none; }
          .sticky-wa a { pointer-events: all; }

          .mobile-badge { display: inline-flex; align-items: center; gap: 5px; background: linear-gradient(90deg, #e63946, #c1121f); color: #fff; font-size: 9px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }

          .step-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 14px 10px; text-align: center; flex: 1; min-width: 0; }

          /* Terzi SVG header decoration */
          .tailor-icon { animation: floatScissors 3s ease-in-out infinite; }
          .tailor-thread { stroke-dasharray: 200; animation: drawLine 2s ease forwards 0.5s; }

          /* Hero image area */
          .hero-visual { position: relative; width: 100%; max-width: 280px; margin: 0 auto 28px; }
          .hero-img-ring { width: 160px; height: 160px; margin: 0 auto; border-radius: 50%; border: 2px solid rgba(184,149,74,0.25); display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(184,149,74,0.08) 0%, transparent 70%); animation: glowGold 3s ease-in-out infinite; position: relative; }
          .hero-img-ring::before { content:''; position: absolute; inset: -6px; border-radius: 50%; border: 1px dashed rgba(184,149,74,0.2); animation: spin 20s linear infinite; }
          .hero-img-ring::after  { content:''; position: absolute; inset: -14px; border-radius: 50%; border: 1px dashed rgba(184,149,74,0.1); animation: spin 30s linear infinite reverse; }
          .needle-badge { position: absolute; bottom: -4px; right: 10px; background: #b8954a; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid #1c1814; }
        `}</style>

        {/* ══════════════════════════════
            LANG BAR
        ══════════════════════════════ */}
        <div style={{ background: '#1c1814', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {(['tr','en','ru','de'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${lang === l ? '#b8954a' : 'rgba(255,255,255,0.13)'}`,
                background: lang === l ? '#b8954a' : 'transparent',
                color: lang === l ? '#fff' : 'rgba(255,255,255,0.4)',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}>
                {l === 'tr' ? '🇹🇷 TR' : l === 'en' ? '🇬🇧 EN' : l === 'ru' ? '🇷🇺 РУ' : '🇩🇪 DE'}
              </button>
            ))}
          </div>
          <a href={waLink(c.waMsg)} style={{ fontSize: 11, color: '#25d366', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ animation: 'pulse 2s infinite' }}>📲</span> WhatsApp
          </a>
        </div>

        {/* ══════════════════════════════
            HERO — PROFESYONEl GÖRSEL + İKON
        ══════════════════════════════ */}
        <div style={{ background: 'linear-gradient(165deg, #1c1814 0%, #2a1c0f 45%, #1a1208 100%)', padding: '52px 24px 44px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Arka plan desen */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(184,149,74,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(184,149,74,0.06) 0%, transparent 40%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,149,74,0.45), transparent)' }} />

          {/* Terzi SVG İkon — Header Visual */}
          <div className="fu hero-visual">
            <div className="hero-img-ring">
              {/* Terzi figürü SVG */}
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="tailor-icon">
                {/* Vücut */}
                <ellipse cx="48" cy="72" rx="20" ry="14" fill="rgba(184,149,74,0.15)" stroke="rgba(184,149,74,0.4)" strokeWidth="1.5"/>
                {/* Baş */}
                <circle cx="48" cy="28" r="12" fill="rgba(184,149,74,0.12)" stroke="rgba(184,149,74,0.5)" strokeWidth="1.5"/>
                {/* Makas */}
                <g transform="translate(60,40) rotate(-30)">
                  <line x1="0" y1="0" x2="14" y2="14" stroke="#d4af6e" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="14" y1="0" x2="0" y2="14" stroke="#d4af6e" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="7" cy="7" r="2.5" fill="#d4af6e" opacity="0.6"/>
                </g>
                {/* İğne iplik */}
                <path d="M28 50 Q38 42 48 50 Q58 58 68 46" stroke="rgba(184,149,74,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="4 2" className="tailor-thread"/>
                {/* Metre */}
                <rect x="22" y="60" width="20" height="5" rx="2.5" fill="rgba(184,149,74,0.2)" stroke="rgba(184,149,74,0.35)" strokeWidth="1"/>
                <line x1="25" y1="60" x2="25" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8"/>
                <line x1="29" y1="60" x2="29" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8"/>
                <line x1="33" y1="60" x2="33" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8"/>
                <line x1="37" y1="60" x2="37" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8"/>
                {/* Kıyafet çizgisi */}
                <path d="M30 42 Q32 58 32 72" stroke="rgba(184,149,74,0.25)" strokeWidth="1" fill="none"/>
                <path d="M66 42 Q64 58 64 72" stroke="rgba(184,149,74,0.25)" strokeWidth="1" fill="none"/>
              </svg>
              <div className="needle-badge">✂️</div>
            </div>
          </div>

          <div className="fu" style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#b8954a', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ width: 24, height: 1, background: 'linear-gradient(90deg, transparent, #b8954a)', display: 'inline-block' }} />
            {c.badge}
            <span style={{ width: 24, height: 1, background: 'linear-gradient(90deg, #b8954a, transparent)', display: 'inline-block' }} />
          </div>

          <h1 className="fu2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 46, fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: 8, letterSpacing: '-0.5px' }}>
            {c.h1}<br />
            <em style={{ color: '#d4af6e', fontStyle: 'italic', fontSize: 50 }}>{c.h1em}</em>
          </h1>

          <p className="fu3" style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginBottom: 12, letterSpacing: 0.4, lineHeight: 1.7 }}>{c.sub}</p>

          <div className="fu3" style={{ display: 'flex', justifyContent: 'center', gap: 5, marginBottom: 16, flexWrap: 'wrap' }}>
            {['🇹🇷 Türkçe','🇬🇧 English','🇷🇺 Русский','🇩🇪 Deutsch'].map(l => (
              <span key={l} style={{ fontSize: 10, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(184,149,74,0.18)', background: 'rgba(184,149,74,0.04)', color: '#c9a86e' }}>{l}</span>
            ))}
          </div>

          <div className="fu3" style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 22, alignItems: 'center' }}>
            {'⭐⭐⭐⭐⭐'.split('').map((s,i) => <span key={i} style={{ fontSize: 14, color: '#f59e0b' }}>{s}</span>)}
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 700, marginLeft: 6 }}>4.9</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 2 }}>(94)</span>
          </div>

          <div className="fu4" style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 340, margin: '0 auto' }}>
            <a href={waLink(c.waMsg)} style={{ background: 'linear-gradient(135deg, #25d366, #1aad52)', color: '#fff', borderRadius: 14, padding: '15px 24px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}>
              📲 {c.waBtn}
            </a>
            <a href="#services" style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 24px', fontSize: 13, textDecoration: 'none', textAlign: 'center' }}>
              {c.downBtn}
            </a>
          </div>
        </div>

        {/* ══════════════════════════════
            SEO METİN BLOĞU
        ══════════════════════════════ */}
        <div style={{ background: '#fff', padding: '26px 20px', borderBottom: '1px solid #ece4d8' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            {[c.seoP1, c.seoP2, c.seoP3, c.seoP4].filter(Boolean).map((p, i) => (
              <p key={i} style={{ fontSize: 12, color: '#7a6858', lineHeight: 1.85, marginBottom: 8 }}
                dangerouslySetInnerHTML={{ __html: p.replace(/(paça kısaltma|pantolon kısaltma|tadilat|kuru temizleme|çamaşır yıkama|ütü|kalıp çıkarma|model dikimi|seri imalat|fason|tailor in antalya|dry cleaning|портной|химчистка|пошив|terzi servisi|araçlı terzi|büyük beden|çocuk kıyafeti|bebek elbisesi|nevresim|perde dikimi|mobile tailor|выездной портной)/gi, '<strong style="color:#3a2a1a">$1</strong>') }}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            🚗 TERZİ SERVİSİ — ARAÇLI BÖLÜM
        ══════════════════════════════ */}
        <section id="terzi-servisi" style={{ background: 'linear-gradient(135deg, #1c1814 0%, #2a1c0f 100%)', padding: '48px 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #b8954a, #d4af6e, #b8954a, transparent)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(184,149,74,0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 10 }}>
              <span className="mobile-badge">🚗 {lang === 'tr' ? 'YENİ HİZMET' : lang === 'en' ? 'NEW SERVICE' : lang === 'ru' ? 'НОВАЯ УСЛУГА' : 'NEUER SERVICE'}</span>
            </div>

            {/* Araç ikonu */}
            <div style={{ margin: '16px auto 20px', width: 80, height: 80, borderRadius: '50%', background: 'rgba(184,149,74,0.12)', border: '1px solid rgba(184,149,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>
              🚗
            </div>

            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 8 }}>{c.mobileSvcTitle}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.1 }}>
              {c.mobileSvcHeading}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
              {c.mobileSvcDesc}
            </p>

            {/* Adım adım */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              {c.mobileSvcSteps.map((step, i) => (
                <div key={i} className="step-card" style={{ minWidth: '120px', maxWidth: '140px' }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{step.split(' ')[0]}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#d4af6e', marginBottom: 4 }}>{step.replace(/^[^\s]+\s/, '')}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>{c.mobileSvcStepLabels[i]}</div>
                </div>
              ))}
            </div>

            <a href={waLink(c.mobileSvcWaMsg)} style={{ background: '#b8954a', color: '#fff', borderRadius: 14, padding: '15px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(184,149,74,0.3)' }}>
              {c.mobileSvcCta}
            </a>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(184,149,74,0.3), transparent)' }} />
        </section>

        {/* ══════════════════════════════
            HİZMETLER
        ══════════════════════════════ */}
        <section id="services" style={{ padding: '52px 20px', background: '#faf8f4' }}>
          <div style={{ marginBottom: 30, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s1}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: '#1c1814' }}>{c.s1t}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 12, maxWidth: 740, margin: '0 auto' }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card" style={{ background: s.color, border: '1px solid rgba(0,0,0,0.05)', borderRadius: 18, padding: '18px 13px' }}>
                <div style={{ fontSize: 28, marginBottom: 8, textAlign: 'center' }}>{s.icon}</div>
                <h3 style={{ fontSize: 12, fontWeight: 700, marginBottom: 5, color: '#1c1814', lineHeight: 1.3 }}>{s.names[idx]}</h3>
                <p style={{ fontSize: 11, color: '#6b5a4a', lineHeight: 1.5, marginBottom: 8 }}>{s.descs[idx]}</p>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#8a6a2a' }}>{s.price}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 26 }}>
            <a href={waLink(c.waMsg)} style={{ background: '#1c1814', color: '#d4af6e', borderRadius: 12, padding: '13px 28px', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(184,149,74,0.2)' }}>
              📲 {lang === 'tr' ? 'Fiyat Teklifi Al' : lang === 'en' ? 'Get a Quote' : lang === 'ru' ? 'Получить цену' : 'Angebot anfordern'}
            </a>
          </div>
        </section>

        {/* ══════════════════════════════
            NEDEN BİZ
        ══════════════════════════════ */}
        <section style={{ padding: '52px 20px', background: '#f0ebe0' }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s2}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: '#1c1814', whiteSpace: 'pre-line' }}>{c.s2t}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxWidth: 600, margin: '0 auto' }}>
            {WHY.map((w, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e0d4c0', borderRadius: 16, padding: '14px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#b8954a,#8a6a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{w.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 2, color: '#1c1814' }}>{w[lang][0]}</div>
                  <div style={{ fontSize: 10, color: '#8a7060', lineHeight: 1.45 }}>{w[lang][1]}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════
            YORUMLAR
        ══════════════════════════════ */}
        <section style={{ padding: '52px 20px', background: '#1c1814' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#d4af6e', marginBottom: 6 }}>⭐ 4.9 / 5.0 · 94 Yorum</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#fff' }}>{c.s4}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 600, margin: '0 auto' }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontSize: 12 }}>{'⭐'.repeat(r.stars)}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)' }}>{r.date}</div>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 10 }}>{r.text}</p>
                <div style={{ fontSize: 11, color: '#d4af6e', fontWeight: 600 }}>{r.flag} {r.author} — {r.city}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════
            SSS — FAQ
        ══════════════════════════════ */}
        <section style={{ padding: '52px 20px', background: '#fff' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>FAQ</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#1c1814' }}>{c.s3}</h2>
          </div>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            {c.faq.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1c1814', flex: 1, textAlign: 'left', paddingRight: 8 }}>{f.q}</h3>
                  <span className="faq-arrow" style={{ color: '#b8954a', fontSize: 20, flexShrink: 0 }}>+</span>
                </summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════
            HİZMET BÖLGELERİ
        ══════════════════════════════ */}
        <section style={{ padding: '52px 20px', background: '#f0ebe0' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s5}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#1c1814', marginBottom: 6 }}>📍 Antalya — Tüm İlçeler</h2>
            <p style={{ fontSize: 12, color: '#8a7060' }}>
              {lang === 'tr' ? 'İlçeye tıklayarak mahalleleri görün' : lang === 'en' ? 'Tap a district to see neighborhoods' : lang === 'ru' ? 'Нажмите на район для просмотра' : 'Bezirk antippen für Stadtteile'}
            </p>
          </div>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              {ANTALYA_ILCELER.map((item) => (
                <button key={item.ilce} className="ilce-btn" onClick={() => setActiveIlce(activeIlce === item.ilce ? null : item.ilce)} style={{
                  padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: `1px solid ${activeIlce === item.ilce ? '#b8954a' : 'rgba(184,149,74,0.22)'}`,
                  background: activeIlce === item.ilce ? '#b8954a' : 'rgba(184,149,74,0.06)',
                  color: activeIlce === item.ilce ? '#fff' : '#7a5a20',
                  fontFamily: 'inherit',
                }}>
                  {item.ilce}
                </button>
              ))}
            </div>
            {activeIlce && (
              <div style={{ background: '#fff', borderRadius: 16, padding: '16px 14px', border: '1px solid #e0d4c0', marginTop: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#b8954a', marginBottom: 10 }}>📍 {activeIlce} Mahalleleri</div>
                <div>
                  {ANTALYA_ILCELER.find(i => i.ilce === activeIlce)?.mahalleler.map(m => (
                    <span key={m} className="area-pill">{m}</span>
                  ))}
                </div>
              </div>
            )}
            {/* SEO: gizli tam mahalle listesi */}
            <div style={{ fontSize: 0, height: 0, overflow: 'hidden', position: 'absolute' }} aria-hidden="true">
              {ANTALYA_ILCELER.flatMap(i => i.mahalleler.map(m =>
                `${m} ${i.ilce} terzi tadilat dikim kuru temizleme paça kısaltma büyük beden perde nevresim bebek kıyafeti`
              )).join(', ')}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            İLETİŞİM
        ══════════════════════════════ */}
        <section id="contact" style={{ padding: '52px 20px', background: '#faf8f4' }}>
          <div style={{ background: '#fff', border: '1px solid #e0d8c8', borderRadius: 24, padding: '28px 20px', textAlign: 'center', maxWidth: 460, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#b8954a', marginBottom: 8 }}>{c.s6}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{c.s6t}</h2>
            <p style={{ fontSize: 12, color: '#8a7060', marginBottom: 22 }}>{c.s6sub}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={waLink(c.waMsg)} style={{ background: 'linear-gradient(135deg, #25d366, #1aad52)', color: '#fff', borderRadius: 14, padding: '15px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(37,211,102,0.25)' }}>
                📲 {c.waLabel}
              </a>
              <a href={waLink(c.mobileSvcWaMsg)} style={{ background: '#b8954a', color: '#fff', borderRadius: 14, padding: '13px', fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                🚗 {c.mobileSvcCta}
              </a>
              <a href="https://maps.google.com/?q=Antalya+Terzi+Belek+Ercan" target="_blank" rel="noreferrer" style={{ color: '#2c2418', border: '1px solid #e0d8c8', borderRadius: 14, padding: 13, fontSize: 13, textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                📍 {c.mapLabel}
              </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 18, flexWrap: 'wrap' }}>
              {['🕐 09:00–19:00','📍 Antalya','⚡ 24–48h','🌍 TR/EN/RU/DE'].map(t => (
                <div key={t} style={{ fontSize: 10, color: '#8a7060' }}>{t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            SEO FOOTER — GENİŞLETİLMİŞ
        ══════════════════════════════ */}
        <div style={{ background: '#1c1814', padding: '32px 20px 44px', borderTop: '1px solid rgba(184,149,74,0.12)' }}>
          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: '#d4af6e', marginBottom: 6 }}>
              Terzi Can | Tailor Can | Портной Кан | Schneider Can — Antalya
            </p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginBottom: 16, lineHeight: 1.6 }}>
              Erkek Terzi · Bayan Terzi · Çocuk Kıyafeti · Bebek Elbisesi · Büyük Beden · Nevresim Dikimi · Perde Dikimi · Araçlı Terzi Servisi · Fason İmalat · Seri Üretim · Kuru Temizleme
            </p>
            <div style={{ marginBottom: 16 }}>
              {SEO_KEYWORDS.map(kw => (
                <span key={kw} className="kw-pill">{kw}</span>
              ))}
            </div>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: 0.7 }}>
              📍 Antalya, Türkiye &nbsp;·&nbsp; ☎ +90 531 898 64 18 &nbsp;·&nbsp; 🕐 09:00–19:00 &nbsp;·&nbsp; swaphubs.com/terzi
            </p>
          </div>
        </div>

        {/* ══════════════════════════════
            STICKY CTA
        ══════════════════════════════ */}
        <div className="sticky-wa">
          <a href={waLink(c.waMsg)} style={{ background: 'linear-gradient(135deg, #25d366, #1aad52)', color: '#fff', borderRadius: 14, padding: '14px', fontSize: 14, fontWeight: 700, width: '100%', maxWidth: 480, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(37,211,102,0.35)', textDecoration: 'none' }}>
            📲 {c.waBtn}
          </a>
        </div>
      </div>
    </>
  );
}
