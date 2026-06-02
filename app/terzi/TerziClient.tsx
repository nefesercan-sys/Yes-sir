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
// SEO SCHEMA
// ═══════════════════════════════════════
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://swaphubs.com/terzi",
      "name": "Antalya Terzi — Terzi Can",
      "alternateName": ["Terzi Can","Tailor Can","Портной Кан","Schneider Can","Antalya Terzisi","Antalya Tailor","Antalya Kuru Temizleme"],
      "description": "Antalya'nın en iyi terzisi. Paça kısaltma, tadilat, tamir, daraltma, kuru temizleme, çamaşır yıkama, ütü, kalıp çıkarma, model dikimi, seri imalat. Turistlere 24 saat hızlı hizmet. Türkçe, İngilizce, Rusça.",
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
        "Paça Kısaltma","Tadilat","Tamir","Daraltma","Kuru Temizleme","Çamaşır Yıkama","Ütü Hizmeti",
        "Kalıp Çıkarma","Model Dikimi","Seri İmalat","Özel Dikim","Gelinlik","Damatlık",
        "Alterations","Custom Tailoring","Dry Cleaning","Pattern Making","Mass Production",
        "Пошив одежды","Ремонт одежды","Химчистка","Пошив по лекалам"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Antalya'da paça kısaltma nerede yaptırılır?", "acceptedAnswer": { "@type": "Answer", "text": "Terzi Can olarak Antalya'da paça kısaltma, pantolon tadilat ve tüm kıyafet tamiri hizmeti veriyoruz. WhatsApp +90 531 898 64 18 ile ulaşın." } },
        { "@type": "Question", "name": "Antalya kuru temizleme hizmeti var mı?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, Terzi Can olarak kuru temizleme, çamaşır yıkama ve ütü hizmeti sunuyoruz. Otele alım ve teslimat yapıyoruz." } },
        { "@type": "Question", "name": "Antalya'da seri imalat ve model dikimi yapılır mı?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, kalıp çıkarma, model dikimi ve seri imalat hizmetleri sunuyoruz. Firmalar ve markalar için üretim yapıyoruz." } },
        { "@type": "Question", "name": "Where can I find a tailor in Antalya?", "acceptedAnswer": { "@type": "Answer", "text": "Terzi Can offers professional tailoring in Antalya. English spoken. WhatsApp +90 531 898 64 18." } },
        { "@type": "Question", "name": "Где найти портного в Анталье?", "acceptedAnswer": { "@type": "Answer", "text": "Terzi Can — лучший портной в Анталье. Говорим по-русски. WhatsApp: +90 531 898 64 18." } },
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
// İÇERİK — 3 DİL
// ═══════════════════════════════════════
const C = {
  tr: {
    badge: '✂ Antalya · Terzi Can',
    h1: 'Antalya\'nın',
    h1em: 'Terzisi',
    sub: 'Paça Kısaltma · Tadilat · Tamir · Daraltma · Kuru Temizleme · Seri İmalat',
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
    seoP1: 'Antalya\'nın en deneyimli terzisi Terzi Can. Paça kısaltma, elbise daraltma, kıyafet tamiri, kuru temizleme, çamaşır yıkama, ütü hizmeti, kalıp çıkarma, model dikimi ve seri imalat. Muratpaşa, Konyaaltı, Kepez, Lara, Belek, Kemer ve tüm Antalya ilçelerine hizmet. Turistlere 24-48 saat ekspres servis, otele alım-teslimat.',
    seoP2: 'Antalya terzi arıyorsanız doğru adrestesiniz. Paça kısaltma Antalya, pantolon tadilat Antalya, kıyafet tamir Antalya, elbise daraltma Antalya, fermuar değişimi, yırtık onarımı. Antalya kuru temizleme, ütü hizmeti, seri imalat, kalıp çıkarma Antalya. Lara terzi, Konyaaltı terzi, Belek terzi, Kemer terzi, Alanya terzi, Manavgat terzi, Side terzi.',
    seoP3: 'Looking for a tailor in Antalya? Hem alterations, dress alteration, trouser hemming, zip repair, dry cleaning Antalya, laundry service, pattern making, custom clothing Antalya. English speaking tailor. Hotel pickup and delivery. Express 24h service.',
    seoP4: 'Портной Кан в Анталье. Подгонка брюк, ремонт одежды, химчистка Анталья, стирка, глажка, пошив по лекалам, серийное производство. Говорим по-русски. Доставка в отель.',
    faq: [
      { q: 'Paça kısaltma ne kadar sürer?', a: 'Paça kısaltma 24 saat içinde tamamlanır. Acele işlerde aynı gün teslimat da mümkündür.' },
      { q: 'Kuru temizleme ve çamaşır yıkama hizmeti var mı?', a: 'Evet, kuru temizleme, çamaşır yıkama ve ütü hizmeti sunuyoruz. Otelden alım ve teslimat yapıyoruz.' },
      { q: 'Seri imalat ve model dikimi yapıyor musunuz?', a: 'Evet, kalıp çıkarma, model dikimi ve seri imalat hizmeti veriyoruz. Markalar ve firmalar için üretim kapasitemiz mevcuttur.' },
      { q: 'Tüm Antalya ilçelerine hizmet veriyor musunuz?', a: 'Evet, Muratpaşa, Konyaaltı, Kepez, Aksu, Lara, Belek, Kemer, Alanya, Manavgat ve tüm Antalya ilçelerine hizmet veriyoruz.' },
      { q: 'Fiyatlar ne kadar?', a: 'Paça kısaltma ₺80\'den, tadilat ₺100\'den, kuru temizleme ₺120\'den, özel dikim ₺500\'den başlar. Ücretsiz fiyat teklifi için WhatsApp\'tan yazın.' },
    ],
  },
  en: {
    badge: '✂ Antalya · Tailor Can',
    h1: 'Antalya\'s',
    h1em: 'Master Tailor',
    sub: 'Alterations · Repairs · Dry Cleaning · Laundry · Pattern Making · Mass Production',
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
    seoP1: 'Terzi Can — Antalya\'s most experienced tailor. Trouser hemming, dress alterations, clothing repairs, dry cleaning, laundry, ironing, pattern making, custom design and mass production. Serving all Antalya districts. Express 24-48h service for tourists, hotel pickup & delivery.',
    seoP2: 'Tailor in Antalya: trouser hemming Antalya, dress alteration Antalya, clothing repair Antalya, zip replacement, dry cleaning Antalya, laundry service Antalya, pattern making Antalya, custom clothing Antalya. English speaking. Lara, Konyaaltı, Belek, Kemer, Alanya, Manavgat, Side.',
    seoP3: '',
    seoP4: '',
    faq: [
      { q: 'How long does trouser hemming take?', a: 'Trouser hemming is completed within 24 hours. Same-day delivery is possible for urgent requests.' },
      { q: 'Do you offer dry cleaning and laundry?', a: 'Yes, we offer dry cleaning, laundry and ironing services. We provide hotel pickup and delivery.' },
      { q: 'Do you do pattern making and mass production?', a: 'Yes, we offer pattern making, custom design and mass production services for brands and businesses.' },
      { q: 'Do you serve all Antalya districts?', a: 'Yes, we serve Muratpaşa, Konyaaltı, Kepez, Lara, Belek, Kemer, Alanya, Manavgat and all Antalya districts.' },
      { q: 'What are the prices?', a: 'Trouser hemming from ₺80, alterations from ₺100, dry cleaning from ₺120, custom clothing from ₺500. WhatsApp for a free quote.' },
    ],
  },
  ru: {
    badge: '✂ Анталья · Портной Кан',
    h1: 'Лучший',
    h1em: 'Портной Антальи',
    sub: 'Подгонка · Ремонт · Химчистка · Стирка · Лекала · Серийное производство',
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
    seoP1: 'Портной Кан — опытный портной в Анталье. Подгонка брюк, ремонт одежды, химчистка, стирка, глажка, пошив по лекалам, модельный пошив и серийное производство. Обслуживаем все районы Антальи. Экспресс 24-48 часов, забор и доставка в отель.',
    seoP2: 'Портной Анталья: подгонка брюк Анталья, ремонт одежды Анталья, химчистка Анталья, стирка Анталья, пошив по лекалам Анталья. Говорим по-русски. Лара, Коньяалты, Белек, Кемер, Аланья, Манавгат, Сиде.',
    seoP3: '',
    seoP4: '',
    faq: [
      { q: 'Сколько времени занимает подгонка брюк?', a: 'Подгонка брюк выполняется в течение 24 часов. При срочных заказах возможна доставка в тот же день.' },
      { q: 'Есть ли химчистка и стирка?', a: 'Да, предлагаем химчистку, стирку и глажку. Забираем и доставляем в отель.' },
      { q: 'Вы занимаетесь пошивом по лекалам и серийным производством?', a: 'Да, предлагаем пошив по лекалам, модельный пошив и серийное производство для брендов и компаний.' },
      { q: 'Обслуживаете все районы Антальи?', a: 'Да, работаем по всей Анталье: Муратпаша, Коньяалты, Кепез, Лара, Белек, Кемер, Аланья, Манавгат и другие.' },
      { q: 'Какие цены?', a: 'Подгонка брюк от ₺80, ремонт от ₺100, химчистка от ₺120, пошив от ₺500. Напишите в WhatsApp для бесплатной оценки.' },
    ],
  },
  de: {
    badge: '✂ Antalya · Schneider Can',
    h1: 'Antalyas',
    h1em: 'Meisterschneider',
    sub: 'Änderungen · Reparaturen · Reinigung · Wäsche · Bügeln · Maßanfertigung',
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
    seoP1: 'Schneider Can — erfahrener Schneider in Antalya & Konyaaltı. Hosenänderungen, Kürzen, Kleideränderungen, Reparaturen, Reinigung, Wäsche, Bügeln, Schnittmuster, Maßanfertigung und Serienproduktion. Service in allen Antalya-Bezirken. Express 24-48h, Abholung und Lieferung ins Hotel.',
    seoP2: 'Schneider Antalya: Hose kürzen Antalya, Kleidung ändern Antalya, Kleider reparieren Antalya, Reißverschluss wechseln Antalya, Reinigung Antalya, Wäsche Antalya, Bügeln Antalya. Deutschsprachiger Schneider. Konyaaltı, Lara, Belek, Kemer, Alanya, Manavgat.',
    seoP3: '',
    seoP4: '',
    faq: [
      { q: 'Wie lange dauert das Kürzen einer Hose?', a: 'Das Kürzen einer Hose wird innerhalb von 24 Stunden erledigt. Bei dringenden Aufträgen ist eine Lieferung am selben Tag möglich.' },
      { q: 'Bieten Sie Reinigung und Wäscheservice an?', a: 'Ja, wir bieten Reinigung, Wäsche und Bügelservice an. Wir holen Ihre Kleidung im Hotel ab und liefern sie zurück.' },
      { q: 'Machen Sie Schnittmuster und Serienproduktion?', a: 'Ja, wir bieten Schnittmustererstellung, Modellnähen und Serienproduktion für Marken und Unternehmen an.' },
      { q: 'Bedienen Sie alle Bezirke von Antalya?', a: 'Ja, wir arbeiten in ganz Antalya: Konyaaltı, Muratpaşa, Kepez, Lara, Belek, Kemer, Alanya, Manavgat und weitere Bezirke.' },
      { q: 'Was sind die Preise?', a: 'Hosenänderungen ab ₺80, Reparaturen ab ₺100, Reinigung ab ₺120, Maßanfertigung ab ₺500. Kontaktieren Sie uns auf WhatsApp für ein kostenloses Angebot.' },
    ],
  },
};

// ═══════════════════════════════════════
// HİZMETLER — GENİŞLETİLMİŞ
// ═══════════════════════════════════════
const SERVICES = [
  {
    icon: '✂️', color: '#fdecea',
    names: ['Paça Kısaltma & Tadilat', 'Hemming & Alterations', 'Подгонка и ремонт', 'Änderungen & Reparaturen'],
    descs: [
      'Paça kısaltma, pantolon daraltma/genişletme, bel alma, fermuar değişimi, yırtık onarımı.',
      'Trouser hemming, taking in/out, waist adjustments, zip replacement, tear repairs.',
      'Подгонка брюк, заужение/расширение, замена молнии, ремонт.',
      'Hose kürzen, einengen/weiten, Bund ändern, Reißverschluss, Reparaturen.'
    ],
    price: '₺150+',
    keywords: 'paça kısaltma, tadilat, tamir, daraltma',
  },
  {
    icon: '👗', color: '#fef3e2',
    names: ['Özel Dikim', 'Custom Clothing', 'Пошив на заказ', 'Maßanfertigung'],
    descs: [
      'Ölçüye özel her türlü kıyafet dikimi. Elbise, bluz, etek, pantolon.',
      'Custom made clothing to your exact measurements. Any style, any fabric.',
      'Пошив одежды по меркам. Любой стиль, любая ткань.',
      'Maßgeschneiderte Kleidung nach Ihren Maßen. Jeder Stil, jeder Stoff.'
    ],
    price: '₺1500+',
    keywords: 'özel dikim, ölçüye dikim',
  },
  {
    icon: '💍', color: '#fce4ec',
    names: ['Gelinlik & Abiye', 'Wedding & Evening', 'Свадебное платье', 'Brautkleid & Abend'],
    descs: [
      'Gelinlik, damatlık, abiye, nişan elbisesi dikimi ve tadilatı.',
      'Wedding dresses, suits, evening gowns — custom or alterations.',
      'Свадебные платья, смокинги, вечерние наряды — пошив и подгонка.',
      'Brautkleider, Anzüge, Abendkleider — Maßanfertigung oder Änderungen.'
    ],
    price: '₺5.000+',
    keywords: 'gelinlik, damatlık, abiye',
  },
  {
    icon: '👔', color: '#e8f5e9',
    names: ['Takım Elbise', 'Suits & Shirts', 'Костюмы и рубашки', 'Anzüge & Hemden'],
    descs: [
      'Erkek/kadın takım elbise, blazer, gömlek dikim ve tadilat.',
      'Men\'s/women\'s suits, blazers, shirts — custom or altered.',
      'Мужские/женские костюмы, пиджаки, рубашки — пошив и подгонка.',
      'Herren/Damen Anzüge, Blazer, Hemden — Maßanfertigung oder Änderungen.'
    ],
    price: '₺5.000+',
    keywords: 'takım elbise, blazer',
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
    keywords: 'kuru temizleme, antalya kuru temizleme',
  },
  {
    icon: '👕', color: '#f3e5f5',
    names: ['Çamaşır Yıkama & Ütü', 'Laundry & Ironing', 'Стирка и глажка', 'Wäsche & Bügeln'],
    descs: [
      'Çamaşır yıkama, kurutma ve ütü hizmeti. Otele teslimat.',
      'Laundry, drying and ironing service. Hotel delivery.',
      'Стирка, сушка и глажка. Доставка в отель.',
      'Wäsche, Trocknen und Bügeln. Lieferung ins Hotel.'
    ],
    price: '₺300+',
    keywords: 'çamaşır yıkama, ütü hizmeti',
  },
  {
    icon: '📐', color: '#fff8e1',
    names: ['Kalıp Çıkarma', 'Pattern Making', 'Пошив по лекалам', 'Schnittmuster'],
    descs: [
      'Profesyonel kalıp çıkarma hizmeti. Mevcut kıyafetten veya sıfırdan kalıp hazırlama.',
      'Professional pattern making from existing garments or from scratch.',
      'Профессиональный пошив по лекалам. По образцу или с нуля.',
      'Professionelle Schnittmustererstellung vom bestehenden Kleidungsstück oder von Grund auf.'
    ],
    price: '₺1000+',
    keywords: 'kalıp çıkarma, antalya kalıp',
  },
  {
    icon: '🎨', color: '#e8eaf6',
    names: ['Model & Tasarım Dikimi', 'Design & Prototype', 'Модельный пошив', 'Design & Prototyp'],
    descs: [
      'Özgün model tasarımı, prototip ve numune dikimi. Markalar için.',
      'Original model design, prototype and sample sewing for brands.',
      'Оригинальный дизайн, прототип и образец изделия для брендов.',
      'Originales Modelldesign, Prototyp und Musternähen für Marken.'
    ],
    price: '₺1500+',
    keywords: 'model dikimi, tasarım, prototip',
  },
  {
    icon: '🏭', color: '#e0f7fa',
    names: ['Seri İmalat', 'Mass Production', 'Серийное производство', 'Serienproduktion'],
    descs: [
      'Firmalar ve markalar için seri kıyafet üretimi. Kaliteli, hızlı, uygun fiyatlı.',
      'Mass production for businesses and brands. Quality, fast, affordable.',
      'Серийное производство одежды для компаний и брендов. Качество и скорость.',
      'Serienproduktion für Unternehmen und Marken. Qualität, schnell, günstig.'
    ],
    price: 'Teklif Al',
    keywords: 'seri imalat, toptan üretim, antalya konfeksiyon',
  },
  {
    icon: '🧥', color: '#fbe9e7',
    names: ['Kışlık & Mont Tadilat', 'Winter Clothing', 'Зимняя одежда', 'Winterkleidung'],
    descs: [
      'Mont, kaban, palto tadilat ve astar değiştirme.',
      'Coat, jacket alterations and lining replacement.',
      'Пальто, куртки, замена подкладки.',
      'Mantel, Jacke ändern und Futter ersetzen.'
    ],
    price: '₺300+',
    keywords: 'mont tadilat, kaban, palto',
  },
  {
    icon: '🎭', color: '#f9fbe7',
    names: ['Kostüm & Özel', 'Costumes & Special', 'Особые костюмы', 'Kostüme & Spezial'],
    descs: [
      'Tiyatro, film, tema partisi kostüm tasarımı ve dikimi.',
      'Theater, film, theme party costume design and sewing.',
      'Театральные, киношные, тематические костюмы.',
      'Theater, Film, Mottoparty Kostüme.'
    ],
    price: '₺2500+',
    keywords: 'kostüm, tiyatro kostümü',
  },
];

const WHY = [
  { icon: '⚡', tr: ['24–48 Saat Teslimat', 'Tatildesiniz, beklemenize gerek yok. Ekspres hizmet garantisi.'], en: ['24–48h Express', 'You\'re on holiday — no waiting. Express service guaranteed.'], ru: ['24–48 часов', 'Вы в отпуске — экспресс-сервис.'], de: ['24–48h Express', 'Sie sind im Urlaub — kein Warten. Expressdienst garantiert.'] },
  { icon: '🌍', tr: ['4 Dilde Hizmet', 'Türkçe, İngilizce, Rusça ve Almanca. Dil engeli yok.'], en: ['4 Languages', 'Turkish, English, Russian, German — no language barrier.'], ru: ['4 языка', 'Турецкий, английский, русский, немецкий.'], de: ['4 Sprachen', 'Türkisch, Englisch, Russisch, Deutsch — keine Sprachbarriere.'] },
  { icon: '🏨', tr: ['Otele Alım & Teslimat', 'Tüm Antalya otellerine alım ve teslimat hizmeti.'], en: ['Hotel Pickup & Delivery', 'Pickup and delivery to all Antalya hotels.'], ru: ['Забор и доставка', 'Забираем и доставляем в любой отель Антальи.'], de: ['Hotel Abholung & Lieferung', 'Abholung und Lieferung in alle Antalya-Hotels.'] },
  { icon: '💳', tr: ['Döviz Kabul', 'TL, Euro, Dolar, Ruble kabul ediyoruz.'], en: ['Multi-Currency', 'TL, Euro, Dollar and Ruble accepted.'], ru: ['Валюта', 'TL, евро, доллар, рубли.'], de: ['Währungen', 'TL, Euro, Dollar und Rubel akzeptiert.'] },
  { icon: '🏭', tr: ['Seri İmalat Kapasitesi', 'Firmalar için kalıp çıkarma, model dikimi, seri üretim.'], en: ['Mass Production', 'Pattern making, prototypes, mass production for brands.'], ru: ['Серийное производство', 'Лекала, образцы, серийный пошив для брендов.'], de: ['Serienproduktion', 'Schnittmuster, Prototypen, Serienproduktion für Marken.'] },
  { icon: '⭐', tr: ['94 Memnun Müşteri', 'Google\'da 4.9 yıldız. Antalya\'nın en tercih edilen terzisi.'], en: ['94 Happy Clients', '4.9 stars on Google. Most recommended tailor in Antalya.'], ru: ['94 клиента', '4.9 звезды на Google.'], de: ['94 zufriedene Kunden', '4,9 Sterne auf Google. Beliebtester Schneider in Antalya.'] },
];

const REVIEWS = [
  { stars: 5, text: '"Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional. Highly recommend!"', author: 'Sarah M.', flag: '🇬🇧', city: 'London', date: 'Mayıs 2025' },
  { stars: 5, text: '"Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель в Белеке!"', author: 'Наталья К.', flag: '🇷🇺', city: 'Москва', date: 'Haziran 2025' },
  { stars: 5, text: '"Gelinliğimi mükemmel şekilde teslim ettiler. Hızlı, kaliteli hizmet. Paça kısaltmayı aynı gün yaptılar!"', author: 'Elif Y.', flag: '🇹🇷', city: 'Antalya', date: 'Nisan 2025' },
  { stars: 5, text: '"Suit altered for a business meeting in 24h. Perfect fit. English speaking — best tailor in Antalya!"', author: 'James T.', flag: '🇦🇺', city: 'Sydney', date: 'Mart 2025' },
  { stars: 5, text: '"Kuru temizleme ve ütü hizmetleri mükemmeldi. Otelden aldılar, otele teslim ettiler. Çok pratik!"', author: 'Mehmet A.', flag: '🇹🇷', city: 'İstanbul', date: 'Temmuz 2025' },
];

// Tüm anahtar kelimeler — SEO footer için
const SEO_KEYWORDS = [
  'Antalya Terzi','Paça Kısaltma Antalya','Tadilat Antalya','Kıyafet Tamir Antalya',
  'Elbise Daraltma Antalya','Kuru Temizleme Antalya','Çamaşır Yıkama Antalya',
  'Ütü Hizmeti Antalya','Kalıp Çıkarma Antalya','Model Dikimi Antalya',
  'Seri İmalat Antalya','Özel Dikim Antalya','Gelinlik Antalya','Damatlık Antalya',
  'Lara Terzi','Konyaaltı Terzi','Belek Terzi','Kemer Terzi','Alanya Terzi',
  'Manavgat Terzi','Side Terzi','Kepez Terzi','Muratpaşa Terzi','Aksu Terzi',
  'Tailor Antalya','Dry Cleaning Antalya','Pattern Making Antalya',
  'Портной Анталья','Химчистка Анталья','Пошив Анталья',
];

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
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
          @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
          .fu { animation: fadeUp 0.5s ease both; }
          .fu2 { animation: fadeUp 0.5s 0.1s ease both; }
          .fu3 { animation: fadeUp 0.5s 0.2s ease both; }
          .svc-card { transition: transform 0.2s, box-shadow 0.2s; cursor: default; }
          .svc-card:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(0,0,0,0.1); }
          .faq-item { border-bottom: 1px solid #e8dcc8; }
          .faq-q { cursor: pointer; padding: 16px 0; display: flex; justify-content: space-between; align-items: center; }
          .faq-a { font-size: 13px; color: #6b5a4a; line-height: 1.7; padding-bottom: 16px; }
          details[open] .faq-arrow { transform: rotate(45deg); }
          .faq-arrow { transition: transform 0.2s; display: inline-block; }
          .ilce-btn { transition: all 0.15s; cursor: pointer; }
          .ilce-btn:hover { transform: scale(1.03); }
          .area-pill { display: inline-block; margin: 3px; padding: 5px 12px; border-radius: 20px; background: rgba(184,149,74,0.08); border: 1px solid rgba(184,149,74,0.18); font-size: 11px; color: #7a5a20; font-weight: 500; }
          .kw-pill { display: inline-block; margin: 3px; padding: 3px 10px; border-radius: 12px; background: rgba(184,149,74,0.08); border: 1px solid rgba(184,149,74,0.12); font-size: 10px; color: rgba(212,175,110,0.6); }
          .sticky-wa { position: fixed; bottom: 0; left: 0; right: 0; padding: 10px 20px 20px; background: linear-gradient(to top, #faf8f4 60%, transparent); z-index: 50; }
        `}</style>

        {/* ── LANG BAR ── */}
        <div style={{ background: '#1c1814', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['tr','en','ru','de'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${lang === l ? '#b8954a' : 'rgba(255,255,255,0.15)'}`,
                background: lang === l ? '#b8954a' : 'transparent',
                color: lang === l ? '#fff' : 'rgba(255,255,255,0.45)',
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

        {/* ── HERO ── */}
        <div style={{ background: 'linear-gradient(160deg, #1c1814 0%, #2c1f14 50%, #1a1208 100%)', padding: '56px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% -10%, rgba(184,149,74,0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,149,74,0.4), transparent)' }} />

          <div className="fu" style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#b8954a', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ width: 20, height: 1, background: '#b8954a', display: 'inline-block' }} />
            {c.badge}
            <span style={{ width: 20, height: 1, background: '#b8954a', display: 'inline-block' }} />
          </div>

          <h1 className="fu2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: 10, letterSpacing: '-0.5px' }}>
            {c.h1}<br />
            <em style={{ color: '#d4af6e', fontStyle: 'italic' }}>{c.h1em}</em>
          </h1>

          <p className="fu3" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 14, letterSpacing: 0.3, lineHeight: 1.6 }}>{c.sub}</p>

          <div className="fu3" style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            {['🇹🇷 Türkçe','🇬🇧 English','🇷🇺 Русский','🇩🇪 Deutsch'].map(l => (
              <span key={l} style={{ fontSize: 10, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(184,149,74,0.2)', background: 'rgba(184,149,74,0.05)', color: '#c9a86e' }}>{l}</span>
            ))}
          </div>

          <div className="fu3" style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 24, alignItems: 'center' }}>
            {'⭐⭐⭐⭐⭐'.split('').map((s,i) => <span key={i} style={{ fontSize: 14, color: '#f59e0b' }}>{s}</span>)}
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 700, marginLeft: 6 }}>4.9</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 2 }}>(94)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 340, margin: '0 auto', position: 'relative' }}>
            <a href={waLink(c.waMsg)} style={{ background: '#25d366', color: '#fff', borderRadius: 14, padding: '15px 24px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}>
              📲 {c.waBtn}
            </a>
            <a href="#services" style={{ color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '13px 24px', fontSize: 13, textDecoration: 'none', textAlign: 'center' }}>
              {c.downBtn}
            </a>
          </div>
        </div>

        {/* ── SEO METİN BLOĞU ── */}
        <div style={{ background: '#fff', padding: '28px 20px', borderBottom: '1px solid #ece4d8' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            {[c.seoP1, c.seoP2, c.seoP3, c.seoP4].filter(Boolean).map((p, i) => (
              <p key={i} style={{ fontSize: 12, color: '#7a6858', lineHeight: 1.85, marginBottom: 10 }}
                dangerouslySetInnerHTML={{ __html: p.replace(/(paça kısaltma|tadilat|kuru temizleme|çamaşır yıkama|ütü|kalıp çıkarma|model dikimi|seri imalat|tailor in antalya|dry cleaning|портной|химчистка|пошив)/gi, '<strong style="color:#3a2a1a">$1</strong>') }}
              />
            ))}
          </div>
        </div>

        {/* ── HİZMETLER ── */}
        <section id="services" style={{ padding: '48px 20px', background: '#faf8f4' }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s1}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: '#1c1814' }}>{c.s1t}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))', gap: 12, maxWidth: 720, margin: '0 auto' }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card" style={{ background: s.color, border: '1px solid rgba(0,0,0,0.05)', borderRadius: 18, padding: '18px 13px' }}>
                <div style={{ fontSize: 30, marginBottom: 8, textAlign: 'center' }}>{s.icon}</div>
                <h3 style={{ fontSize: 12, fontWeight: 700, marginBottom: 5, color: '#1c1814', lineHeight: 1.3 }}>{s.names[idx]}</h3>
                <p style={{ fontSize: 11, color: '#6b5a4a', lineHeight: 1.5, marginBottom: 8 }}>{s.descs[idx]}</p>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#8a6a2a' }}>{s.price}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <a href={waLink(c.waMsg)} style={{ background: '#1c1814', color: '#d4af6e', borderRadius: 12, padding: '13px 28px', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
              📲 {lang === 'tr' ? 'Fiyat Teklifi Al' : lang === 'en' ? 'Get a Quote' : 'Получить цену'}
            </a>
          </div>
        </section>

        {/* ── NEDEN BİZ ── */}
        <section style={{ padding: '48px 20px', background: '#f0ebe0' }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s2}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: '#1c1814', whiteSpace: 'pre-line' }}>{c.s2t}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 600, margin: '0 auto' }}>
            {WHY.map((w, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e0d4c0', borderRadius: 16, padding: '14px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#b8954a,#8a6a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{w.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 2, color: '#1c1814' }}>{w[lang][0]}</div>
                  <div style={{ fontSize: 10, color: '#8a7060', lineHeight: 1.4 }}>{w[lang][1]}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── YORUMLAR ── */}
        <section style={{ padding: '48px 20px', background: '#1c1814' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#d4af6e', marginBottom: 6 }}>⭐ 4.9 / 5.0 · 94 Yorum</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#fff' }}>{c.s4}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 600, margin: '0 auto' }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontSize: 12 }}>{'⭐'.repeat(r.stars)}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{r.date}</div>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 10 }}>{r.text}</p>
                <div style={{ fontSize: 11, color: '#d4af6e', fontWeight: 600 }}>{r.flag} {r.author} — {r.city}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SSS ── */}
        <section style={{ padding: '48px 20px', background: '#fff' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>FAQ</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#1c1814' }}>{c.s3}</h2>
          </div>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            {c.faq.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1c1814', flex: 1, textAlign: 'left' }}>{f.q}</h3>
                  <span className="faq-arrow" style={{ color: '#b8954a', fontSize: 18, flexShrink: 0, marginLeft: 8 }}>+</span>
                </summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ── HİZMET BÖLGELERİ — TÜM İLÇE VE MAHALLELER ── */}
        <section style={{ padding: '48px 20px', background: '#f0ebe0' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 6 }}>{c.s5}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#1c1814', marginBottom: 6 }}>📍 Antalya — Tüm İlçeler</h2>
            <p style={{ fontSize: 12, color: '#8a7060' }}>
              {lang === 'tr' ? 'İlçeye tıklayarak mahalleleri görün' : lang === 'en' ? 'Tap a district to see neighborhoods' : 'Нажмите на район для просмотра'}
            </p>
          </div>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              {ANTALYA_ILCELER.map((item) => (
                <button key={item.ilce} className="ilce-btn" onClick={() => setActiveIlce(activeIlce === item.ilce ? null : item.ilce)} style={{
                  padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: `1px solid ${activeIlce === item.ilce ? '#b8954a' : 'rgba(184,149,74,0.25)'}`,
                  background: activeIlce === item.ilce ? '#b8954a' : 'rgba(184,149,74,0.07)',
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
            {/* SEO için gizli metin — tüm mahalleler arama motorları için */}
            <div style={{ fontSize: 0, height: 0, overflow: 'hidden', position: 'absolute' }} aria-hidden="true">
              {ANTALYA_ILCELER.flatMap(i => i.mahalleler.map(m => `${m} ${i.ilce} terzi tadilat kuru temizleme`)).join(', ')}
            </div>
          </div>
        </section>

        {/* ── İLETİŞİM ── */}
        <section id="contact" style={{ padding: '48px 20px', background: '#faf8f4' }}>
          <div style={{ background: '#fff', border: '1px solid #e0d8c8', borderRadius: 24, padding: '28px 20px', textAlign: 'center', maxWidth: 460, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#b8954a', marginBottom: 8 }}>{c.s6}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{c.s6t}</h2>
            <p style={{ fontSize: 12, color: '#8a7060', marginBottom: 22 }}>{c.s6sub}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={waLink(c.waMsg)} style={{ background: '#25d366', color: '#fff', borderRadius: 14, padding: '15px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(37,211,102,0.25)' }}>
                📲 {c.waLabel}
              </a>
              <a href="https://maps.google.com/?q=Antalya+Terzi+Belek+Ercan" target="_blank" rel="noreferrer" style={{ color: '#2c2418', border: '1px solid #e0d8c8', borderRadius: 14, padding: 13, fontSize: 13, textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                📍 {c.mapLabel}
              </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
              {['🕐 09:00–19:00','📍 Antalya','⚡ 24–48h','🌍 TR/EN/RU'].map(t => (
                <div key={t} style={{ fontSize: 11, color: '#8a7060' }}>{t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO FOOTER ── */}
        <div style={{ background: '#1c1814', padding: '32px 20px 40px', borderTop: '1px solid rgba(184,149,74,0.15)' }}>
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: '#d4af6e', marginBottom: 16 }}>
              Terzi Can | Tailor Can | Портной Кан | Schneider Can — Antalya
            </p>
            <div style={{ marginBottom: 16 }}>
              {SEO_KEYWORDS.map(kw => (
                <span key={kw} className="kw-pill">{kw}</span>
              ))}
            </div>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', letterSpacing: 0.8 }}>
              📍 Antalya, Türkiye &nbsp;·&nbsp; ☎ +90 531 898 64 18 &nbsp;·&nbsp; 🕐 09:00–19:00 &nbsp;·&nbsp; swaphubs.com/terzi
            </p>
          </div>
        </div>

        {/* ── STICKY CTA ── */}
        <div className="sticky-wa">
          <a href={waLink(c.waMsg)} style={{ background: '#25d366', color: '#fff', borderRadius: 14, padding: '14px', fontSize: 14, fontWeight: 700, width: '100%', maxWidth: 480, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(37,211,102,0.35)', textDecoration: 'none' }}>
            📲 {c.waBtn}
          </a>
        </div>
      </div>
    </>
  );
}
