'use client';

import { useState } from 'react';

const PHONE = '905318986418';
type Lang = 'tr' | 'en' | 'ru' | 'de';

const ANTALYA_ILCELER = [
  { ilce: 'Muratpaşa', mahalleler: ['Fener', 'Kırcami', 'Yeşilbahçe', 'Çağlayan', 'Güzeloba', 'Liman', 'Meltem', 'Konyaaltı'] },
  { ilce: 'Konyaaltı', mahalleler: ['Hurma', 'Sarısu', 'Liman', 'Uncalı', 'Uluç', 'Gürsu', 'Altınkum'] },
  { ilce: 'Kepez', mahalleler: ['Varsak', 'Santral', 'Erenköy', 'Sütçüler', 'Düdenbaşı', 'Gündoğdu', 'Kültür'] },
  { ilce: 'Aksu', mahalleler: ['Aksu Merkez', 'Macun', 'Yurtpınar', 'Çalkaya', 'Kemerağzı', 'Kundu'] },
  { ilce: 'Döşemealtı', mahalleler: ['Yeniköy', 'Bahçeyaka', 'Yeşilbayır', 'Çıplaklı', 'Toki'] },
  { ilce: 'Serik', mahalleler: ['Merkez', 'Belek', 'Boğazkent', 'Kadriye', 'Tekke', 'Kökez'] },
  { ilce: 'Alanya', mahalleler: ['Merkez', 'Mahmutlar', 'Oba', 'Tosmur', 'Kestel', 'Avsallar'] },
  { ilce: 'Manavgat', mahalleler: ['Merkez', 'Side', 'Sorgun', 'Ilıca', 'Evrenseki', 'Gündoğdu'] },
  { ilce: 'Kemer', mahalleler: ['Merkez', 'Beldibi', 'Göynük', 'Çamyuva', 'Tekirova', 'Kiriş'] },
  { ilce: 'Kaş', mahalleler: ['Merkez', 'Kalkan', 'Gömbe', 'Yeşilköy'] },
  { ilce: 'Finike', mahalleler: ['Merkez', 'Hasyurt', 'Sahilkent', 'Turunçova'] },
  { ilce: 'Kumluca', mahalleler: ['Merkez', 'Mavikent', 'Beykonak', 'Adrasan'] },
  { ilce: 'Elmalı', mahalleler: ['Merkez', 'Karyağdı', 'Eskihisar'] },
  { ilce: 'Korkuteli', mahalleler: ['Merkez', 'Uzunoluk', 'Kiremitli'] },
  { ilce: 'Gündoğmuş', mahalleler: ['Merkez'] },
  { ilce: 'İbradı', mahalleler: ['Merkez'] },
  { ilce: 'Akseki', mahalleler: ['Merkez'] }
];

// Statik şema nesnesi (FAQ buradan kaldırıldı, aşağıda dinamik üretiliyor)
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://swaphubs.com/terzi",
      "name": "Antalya Terzi - Terzi Can",
      "image": "https://swaphubs.com/terzi-logo.png",
      "description": "Antalya'nın en iyi terzisi. Paça kısaltma, fermuar değişimi, tadilat, tamir, daraltma, elbise dikimi, erkek terzi, bayan terzi.",
      "url": "https://swaphubs.com/terzi",
      "telephone": "+90 531 898 64 18",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Antalya",
        "addressRegion": "Antalya",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "36.8841",
        "longitude": "30.7056"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "SwapHubs", "item": "https://swaphubs.com" },
        { "@type": "ListItem", "position": 2, "name": "Antalya Terzi", "item": "https://swaphubs.com/terzi" }
      ]
    }
  ]
};

const C = {
  tr: {
    badge: 'Antalya - Terzi Can',
    h1: 'Antalya Terzi',
    h2: 'Profesyonel Terzi ve Tadilat Hizmetleri',
    sub: 'Erkek - Bayan - Çocuk - Tadilat - Üniforma - Nakış - Fason - Seri İmalat',
    waBtn: "WhatsApp'tan Yazın",
    downBtn: 'Hizmetleri Gör',
    waMsg: 'Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.',
    s1: 'Hizmetlerimiz', s1Sub: 'Ne Yapıyoruz?',
    s2: 'Neden Biz?', s2Sub: 'Neden Bizi Seçmelisiniz?',
    s3: 'Sık Sorulan Sorular',
    s4: 'Müşteri Yorumları',
    s5: 'Hizmet Bölgeleri',
    s6: 'İletişim', s6Sub: 'Bize Ulaşın',
    s6Sub2: "WhatsApp'tan mesaj atın, hemen yanıt verelim.",
    mapLabel: 'Haritada Bul',
    mobileSvcTitle: 'Mobil Terzi Servisi',
    mobileSvcBadge: 'YENİ HİZMET',
    mobileSvcHeading: 'Kapınıza Geliyoruz',
    mobileSvcDesc: 'Araçlı terzi servisimizle tüm Antalya\'ya hizmet veriyoruz. Terzi Can ekibimiz adresinize geliyor, yerinde ölçü alıyor, dikim veya tadilatı tamamlayıp kapınıza teslim ediyor.',
    mobileSvcSteps: ['WhatsApp\'tan konum paylaşın', 'Terzi adresinize gelir', 'Ölçüye göre dikim yapılır', 'Belirlenen vakitte teslim edilir'],
    mobileSvcCta: 'Mobil Terzi Servisi İste',
    mobileSvcWaSms: 'Merhaba, mobil terzi servisinizden yararlanmak istiyorum. Adresime gelebilir misiniz?',
    seoP1: 'Antalya\'nın en deneyimli terzisi Terzi Can. Paça kısaltma, elbise daraltma, beden küçültme, fermuar değişimi, etek kısaltma, abiye tamiri, kıyafet tamiri, kuru temizleme ve ütü hizmeti.',
    seoP2: 'Antalya erkek terzi, bayan terzi, çocuk kıyafeti dikimi, bebek elbisesi dikimi, anne grubu toplu dikimi, büyük beden dikimi, beden seti çıkarma, sweatshirt dikimi, eşofman dikimi, nakış, logo nakışı, üniforma üretimi.',
    seoP3: 'Yakınınızda terzi Antalya - eve gelen terzi, otele gelen terzi, araçlı terzi servisi, adrese teslim terzi, mezuniyet abiye kısaltma, düğün sezonu gelinlik tadilatı, kış sezonu mont fermuarı değişimi.',
    seoP4: 'Terzi fiyatları: paça kısaltma 150₺ - fermuar 120₺ - ceket daraltma 6300₺ - elbise tadilatı 6200₺ - kuru temizleme 6300₺. Portnoy Kan v Antalye - podgonka bryuk, remont odezhdy, himchistka, diler.',
    faq: [
      { q: "Paça kısaltma kaç lira 2025 fiyatı ne kadar?", a: "Paça kısaltma 150₺'den başlar. Kumaş ve kot türüne göre profesyonel makinelerde orijinal paça olarak yapılır." },
      { q: "Terzi servisiniz var mı? Eve veya otele gelen terzi var mı?", a: "Evet! Mobil terzi aracımızla ev, otel veya iş yerinize gelip ölçü alıyor ve adrese teslim ediyoruz." },
      { q: "Mezuniyet abiye tamiri ve kısaltması yapıyor musunuz?", a: "Evet, hassas abiye kumaşlarında potluk yapmayacak şekilde gizli dikiş tekniğiyle abiye boyu kısaltma ve daraltma yapıyoruz." },
      { q: "Düğün sezonu gelinlik tadilatı yapıyor musunuz?", a: "Gelinlik daraltma, boy ayarlama, tül değişimi ve tüm gelinlik tadilat işlemlerini özenle gerçekleştiriyoruz." },
      { q: "Kış sezonunda mont fermuarı değişimi yapıyor musunuz?", a: "Evet, mont, kaban ve deri mont fermuarlarını orijinaline sadık kalarak kaliteli fermuarlarla değiştiriyoruz." },
      { q: "Pantolon paçası daraltma ve boy kısaltma tadilatı ne kadar sürer?", a: "Standart tadilatlar genellikle aynı gün içinde veya en geç 24 saat içinde tamamlanarak teslim edilir." },
      { q: "Otel ve restoran üniforması üretimi yapıyor musunuz?", a: "Evet, aşçı forması, garson önlüğü, resepsiyon kıyafetleri ve otel personeli için özel üretim yapıyoruz." },
      { q: "Doktor, hemşire, işçi ve okul ünforması yapıyor musunuz?", a: "Evet, medikal formalar, hastane kıyafetleri, işçi tulumları, reflektörlü yelekler ve okul formaları üretiyoruz." },
      { q: "Büyük beden, nevresim, perde, bebek kıyafeti dikimi var mı?", a: "Özel ölçüye göre büyük beden model dikimi, perde dikimi, nevresim takımı ve bebek kıyafetleri dikiyoruz." }
    ]
  },
  en: {
    badge: 'Antalya - Tailor Can',
    h1: 'Antalya Tailor',
    h2: 'Professional Tailoring & Alteration Services',
    sub: 'Men - Women - Children - Baby - Alterations - Custom - Mass Production',
    waBtn: 'Contact via WhatsApp',
    downBtn: 'View Services',
    waMsg: 'Hello, I would like to get information about your tailoring service.',
    s1: 'Our Services', s1Sub: 'What We Do',
    s2: 'Why Choose Us?', s2Sub: 'Why Choose Us?',
    s3: 'Frequently Asked Questions',
    s4: 'Customer Reviews',
    s5: 'Service Areas',
    s6: 'Contact', s6Sub: 'Contact Us',
    s6Sub2: 'Send a WhatsApp message, we\'ll reply instantly.',
    mapLabel: 'Find on Map',
    mobileSvcTitle: 'Mobile Tailor Service',
    mobileSvcBadge: 'NEW SERVICE',
    mobileSvcHeading: 'We Come To You',
    mobileSvcDesc: 'Our mobile tailor service covers all of Antalya. We visit your address, take measurements on-site, complete the tailoring in our workshop, and deliver back to your door. Hotel, home, or office - no problem.',
    mobileSvcSteps: ['Share your address via WhatsApp', 'Tailor comes to you', 'Tailor to your measurements', 'Delivered at agreed time'],
    mobileSvcCta: 'Request Mobile Tailor',
    mobileSvcWaSms: 'Hello, I would like to use your mobile tailor service. Can you come to my address?',
    seoP1: 'Antalya\'s most experienced tailor. Trouser hemming, dress alterations, clothing repairs, size reduction, dry cleaning, laundry, ironing, pattern making, custom design, mass production and contract manufacturing.',
    seoP2: 'Men\'s tailor Antalya, women\'s tailor Antalya, children\'s clothing Antalya, baby clothes sewing, plus-size clothing alterations, pattern making Antalya, curtain sewing, bed linen sewing, sweatshirt sewing, embroidery.',
    seoP3: 'Mobile tailor Antalya - we come to your home or hotel, take measurements, and deliver finished garments. English speaking tailor. Hotel pickup and delivery. Express 24h service. Lara Tailor, Konyaalti Tailor, Belek Tailor.',
    seoP4: 'Tailor prices: trouser hemming €5 - zipper replacement €4 - jacket alteration €20 - dress alteration €20 - dry cleaning €5. Professional alterations, perfect fit guaranteed. Contact us for custom prices.',
    faq: [
      { q: "How much does trouser hemming cost?", a: "Trouser hemming starts from €150. Price depends on fabric type. WhatsApp us for a free quote." },
      { q: "Do you come to my hotel or home?", a: "Yes! Our mobile tailor service covers all Antalya districts. We visit your address, measure, tailor and deliver back to you." },
      { q: "Do you sew plus-size clothing?", a: "Yes, we sew plus-size dresses, trousers, shirts and make custom pattern sets for all body types." },
      { q: "Do you sew children's and baby clothing?", a: "Yes, we sew children's clothing, baby dresses and custom costumes. Group discounts for parent communities." },
      { q: "Do you make custom suits or dresses?", a: "Yes, we specialize in custom suits, evening gowns, wedding dresses, set curtains, cushion covers and home textiles." },
      { q: "Do you do mass production and contract manufacturing?", a: "Yes, we offer pattern making, sample sewing, and mass production for brands and businesses." },
      { q: "Do you offer dry cleaning and laundry?", a: "Yes, professional dry cleaning, laundry and ironing with hotel pickup and delivery." },
      { q: "Do you serve all Antalya districts?", a: "Yes – Muratpasa, Konyaalti, Kepez, Lara, Belek, Kemer, Alanya, Manavgat and all districts." }
    ]
  },
  ru: {
    badge: 'Анталия - Портной Кан',
    h1: 'Портной Анталия',
    h2: 'Профессиональный ремонт и пошив одежды',
    sub: 'Мужской - Женский - Детский - Пошив - Химчистка - Серийное Производство',
    waBtn: 'Написать в WhatsApp',
    downBtn: 'Смотреть услуги',
    waMsg: 'Здравствуйте, я хотел бы узнать о ваших услугах портного.',
    s1: 'Услуги', s1Sub: 'Что мы предлагаем',
    s2: 'Почему мы?', s2Sub: 'Почему Клиенты выбирают нас?',
    s3: 'Частые вопросы',
    s4: 'Отзывы',
    s5: 'Районы обслуживания',
    s6: 'Контакты', s6Sub: 'Связаться с нами',
    s6Sub2: 'Напишите в WhatsApp, ответим сразу.',
    mapLabel: 'Показать на карте',
    mobileSvcTitle: 'Выездной портной',
    mobileSvcBadge: 'ВЫЕЗДНОЙ ПОРТНОЙ',
    mobileSvcHeading: 'Приедем к вам',
    mobileSvcDesc: 'Наш выездной портной обслуживает всю Анталию. Приедем по вашему адресу, снимем мерки на месте, сошьем в ателье и доставим обратно. Отель, дом или офис — все равно.',
    mobileSvcSteps: ['Укажите адрес в WhatsApp', 'Портной приедет к вам', 'Доставка в назначенное время'],
    mobileSvcCta: 'Вызвать портного',
    mobileSvcWaSms: 'Здравствуйте, хочу воспользоваться выездным сервисом. Можете приехать по моему адресу?',
    seoP1: 'Самый опытный портной в Анталии. Подгонка брюк, ремонт одежды, замена молнии, укорачивание юбки, ремонт вечернего платья, пошив вечернего платья, производство спортивных костюмов, вышивка, производство одежды для малышей, детская одежда, школьная форма, костюмы. Скидки для мини-групп.',
    seoP2: 'Пошив формы Анталия: гостиничная форма, форма повара, форма поваров, медицинская форма, форма официантов, охрана, военная, школьная, спортивная форма, вышивка логотипа, нанесение принта.',
    seoP3: 'Выездной портной Анталия — приедем домой или в отель, снимем мерки и доставим готовую изделие. Говорим по-русски. Лара, Коньяалты, Белек, Кунду, Алания, Манавгат, Сиде.',
    seoP4: 'Стоимость подгонки брюк от 6150, замена молнии от 6120, пальто от 6300, пиджака от 6200. Напишите в WhatsApp — бесплатная оценка сразу.',
    faq: [
      { q: "Сколько стоит подгонка брюк и замена молнии в 2025?", a: "Подгонка брюк от 6150, замена молнии от 6120, пальто от 6300, пиджака от 6200. Напишите в WhatsApp — бесплатная оценка сразу." },
      { q: "Сколько стоит замена молнии? Джинсы, пальто, толстовки?", a: "Брюки/джинсы от 6120, пиджак от 6200, пальто от 6300. Также толстовки и сумки. Срочный ремонт в тот же день." },
      { q: "Есть ли портной рядом со мной? Выезд в дом или в отель?", a: "Да! Выездной портной работает по всей Анталии. Приедем к вам домой, в отель или офис, снимем мерки, сошьем и доставим." },
      { q: "Срочная подгонка выпускного платья в Анталии?", a: "Да. Подгонка и укорачивание выпускных платьев экспресс 24 часа в сезон выпускных (май-июнь). Принимаем заказы в последний момент." },
      { q: "Подгонка свадебного платья и свадебный сезон?", a: "Да, подгонка свадебных платьев, укорачивание и ремонт в период апрель-октябрь. Идеальная посадка гарантирована." },
      { q: "Вы меняете молнии? Джинсы, куртки, пальто, толстовки?", a: "Да, в брюках, джинсах, куртках, пальто, толстовках, сумках. Срочный ремонт в тот же день." },
      { q: "Производство формы для отелей и ресторанов?", a: "Да – форма для гостиниц, ресепшн, горничных, поваров, официантов, охрана, спэц. Дизайн, лекала, серийное производство, вышивка — всё в одном." },
      { q: "Медицинская, школьная и спортивная форма?", a: "Да – врачи, медсестры, рабочие, школьная форма, спортивные команды. Для любой отрасли." },
      { q: "Большие размеры, детская одежда, шторы, постельное белье?", a: "Да – большие размеры, детская одежда, беби-гардероб, шторы, постельное белье. Скидки для групповых заказов." }
    ]
  },
  de: {
    badge: 'Antalya - Schneider Can',
    h1: 'Antalya Schneider',
    h2: 'Professionelle Schneiderei & Änderungen',
    sub: 'Herren - Damen - Kinder - Änderungen - Uniformen - Stickerei - Produktion',
    waBtn: 'WhatsApp schreiben',
    downBtn: 'Leistungen sehen',
    waMsg: 'Hallo, ich möchte mich über Ihren Schneiderservice informieren.',
    s1: 'Leistungen', s1Sub: 'Was wir anbieten',
    s2: 'Warum wir?', s2Sub: 'Warum uns wählen?',
    s3: 'Häufige Fragen',
    s4: 'Kundenbewertungen',
    s5: 'Servicegebiete',
    s6: 'Kontakt', s6Sub: 'Kontaktieren Sie uns',
    s6Sub2: 'Schreiben Sie uns auf WhatsApp - wir antworten sofort.',
    mapLabel: 'Auf Karte finden',
    mobileSvcTitle: 'Mobiler Schneiderservice',
    mobileSvcBadge: 'MOBILER SCHNEIDERSERVICE',
    mobileSvcHeading: 'Wir kommen zu Ihnen',
    mobileSvcDesc: 'Unser mobiler Schneiderservice ist in ganz Antalya verfügbar. Wir kommen zu Ihrer Adresse, nehmen Maße vor Ort, schneidern in unserer Werkstatt und liefern an Ihre Tür. Hotel, Wohnung oder Büro — kein Problem.',
    mobileSvcSteps: ['Standort per WhatsApp senden', 'Schneider kommt zu Ihnen', 'Lieferung zur vereinbarten Zeit'],
    mobileSvcCta: 'Mobilen Schneider anfragen',
    mobileSvcWaSms: 'Hallo, ich möchte den mobilen Schneiderservice nutzen. Können Sie zu meiner Adresse kommen?',
    seoP1: 'Schneider Can – erfahrener Schneider in Antalya. Hosenänderungen - Reißverschluss-Reparatur - Rockkürzung - Abendkleid-Reparatur - Sweatshirt-Nähen - Trainingsanzug - Stickerei - Uniformproduktion - Hoteluniformen - Ateliers - Reinigung - Wäscherei - Lieferung zu Ihnen',
    seoP2: 'Uniformproduktion Antalya: Hoteluniformen - Rezeption - Kochuniformen - Kellneruniform - Arztuniform - Schuluniform - Sportuniform - Stickerei Antalya - Logo-Stickerei - Sweatshirt nähen - Trainingsanzug nähen - Reflektorwesten Antalya - wir kommen zu Ihnen nach Hause oder ins Hotel, nehmen Maße und liefern fertig zurück. Deutschsprachiger Schneider. Hotelabholung und -lieferung. Lara, Belek, Kemer, Alanya, Manavgat.',
    seoP3: '',
    seoP4: '',
    faq: [
      { q: "Was kostet Hosenänderung und Reißverschluss 2025 in Antalya?", a: "Hosenänderung ab 6150, Reißverschluss-Austausch ab 6120, Jacke einengen ab 6300. WhatsApp für ein kostenloses Sofortangebot." },
      { q: "Was kostet ein Reißverschluss-Ersatz? Jeans, Mantel, Sweatshirt?", a: "Hosen/Jeans ab 6120, Jacke ab 6200, Mantel ab 6300. Sweatshirts und Taschen ebenfalls. Expressdienst am gleichen Tag möglich." },
      { q: "Gibt es einen Schneider in meiner Nähe? Kommen Sie ins Hotel?", a: "Ja! Unser mobiler Schneider fährt in alle Antalya-Bezirke. Standort per WhatsApp senden — wir kommen, schneidern und liefern zurück." },
      { q: "Abendkleid kürzen für Abschlussfeiern in Antalya?", a: "Ja – Abschlusskleid kürzen und ändern Express in 24h zur Abschlusszeit (Mai-Juni). Last-minute vor der Feier wird akzeptiert." },
      { q: "Brautkleid-Änderungen in der Hochzeitssaison?", a: "Ja, Brautkleid-Änderungen, Kürzen und Anpassungen April-Oktober. Perfekte Passform garantiert." },
      { q: "Tauschen Sie Reißverschlüsse aus? Jeans, Mantel, Sweatshirt?", a: "Ja – Hosen, Jeans, Jacken, Mantel, Kleider, Wetterschutz, Taschen. Expressdienst möglich." },
      { q: "Produzieren Sie Hotel- und Uniformen?", a: "Ja – Hotel, Rezeption, Hausdamen, Köche, Kellner, Spa, Design, Schnittmuster, Serienproduktion und Stickerei aus einer Hand." },
      { q: "Medizinische, Schul- und Sportuniformen?", a: "Ja – Ärzte, Krankenschwestern, Arbeiter, Schuluniformen, Sportteam-Trikots. Jede Branche." },
      { q: "Übergrößen, Kinderkleidung, Vorhänge, Stickerei?", a: "Ja – Übergrößen, Kinderkleidung, Babykleider, Vorhänge, Bettwäsche, Logo-Stickerei. Gruppenrabatte verfügbar." }
    ]
  }
};

const SERVICES = [
  {
    icon: '✂️', color: '#fdecea',
    names: { tr: 'Tamir & Tadilat', en: "Repairs & Alterations", ru: 'Ремонт и переделка', de: 'Reparaturen & Änderungen' },
    descs: [
      'paça kısaltma', 'pantolon daraltma', 'ceket daraltma', 'ceket daraltma', 'elbise daraltma', 'etek kısaltma', 'kol kısaltma', 'bel alma', 'daraltma', 'yırtık onarımı', 'dikis tamiri', 'astar degisimi', 'cep tamiri', 'yaka degisimi', 'gömlek dikimi',
      'Trouser hemming', 'taking in jacket/shirt/dress', 'skirt shortening', 'sleeve shortening', 'zip replacement', 'tear repair', 'lining replacement', 'button sewing', 'seam repair.',
      'Подгонка брюк', 'сужение пиджака/рубашки/платья', 'укорачивание юбки', 'укорачивание рукава', 'замена молнии', 'ремонт разрывов', 'замена подкладки', 'пришивание пуговиц.',
      'Hose kürzen', 'Jacke/Hemd/Kleid einengen', 'Rock kürzen', 'Ärmel kürzen', 'Reißverschluss', 'Riss reparieren', 'Futter ersetzen', 'Knöpfe annähen.'
    ],
    price: "₺150+"
  },
  {
    icon: '🤐', color: '#fff3e0',
    names: { tr: 'Fermuar Değişimi & Onarımı', en: "Zip Replacement & Repair", ru: 'Замена и ремонт молний', de: 'Reißverschluss Reparatur' },
    descs: [
      'Her türlü kıyafette fermuar değişimi ve onarımı: pantolon fermuarı', 'kot fermuarı', 'ceket fermuarı', 'mont fermuarı', 'elbise fermuarı', 'çanta fermuarı', 'sweatshirt fermuarı. Aynı gün servis mümkündür.',
      'Zip replacement and repair for all garments: trousers', 'jeans', 'jacket', 'coat', 'dress', 'bag', 'sweatshirt. Same-day service available.',
      'Замена молнии во всех видах одежды: брюки', 'джинсы', 'куртки', 'пальто', 'платья', 'сумки', 'толстовки. Срочный ремонт.',
      'Reißverschluss-Ersatz für alle Kleidungsstücke: Hosen', 'Jeans', 'Jacken', 'Mäntel', 'Kleider', 'Taschen, Sweatshirts. Expressdienst.'
    ],
    price: "₺120+"
  },
  {
    icon: '📐', color: '#edf7ed',
    names: { tr: 'Beden Küçültme - Kalıp', en: "Taking In - Size Down - Pattern", ru: 'Заужение - Уменьшение - Лекала', de: 'Einengen - Verkleinern - Schnittmuster' },
    descs: [
      'pantolon daraltma', 'ceket daraltma', 'gömlek daraltma', 'elbise daraltma', 'etek daraltma', 'kol kısaltma', 'koltuk altı alma', 'beden seti çıkarma', 'beden seti çıkarma', 'Erkek - Bayan - Çocuk.',
      'Trouser/jacket/shirt/dress/skirt taking in', 'waist reduction', 'side seam alteration', 'size reduction', 'pattern adjustment. Men', 'Women', 'Children.',
      'Заужение брюк/пиджака/рубашки/платья', 'уменьшение талии', 'уменьшение размера', 'Мужская', 'Женская', 'детская одежда.',
      'Hosen/Jacke/Hemd/Kleid einengen', 'Taille verkleinern', 'Größe anpassen. Herren', 'Damen', 'Kinder.'
    ],
    price: "₺450+"
  },
  {
    icon: '📐', color: '#fffdef',
    names: { tr: 'Büyük Beden & Beden Seti Çıkarma', en: "Plus Size & Custom Pattern", ru: 'Одежда больших размеров', de: 'Übergrößen & Schnittmuster' },
    descs: [
      'Büyük beden elbise', 'büyük beden pantolon', 'büyük beden gömlek dikimi. Beden seti çıkarma', 'özel kalıp hazırlama', 'her vücuda uygun dikim. 42-62 ve üzeri tablolara uygun terzi tasarımı.',
      'Plus-size dresses', 'trousers', 'shirts. Custom pattern sets for every body shape. Sizes 42-62 and above – custom tailor designed to your exact measurements.',
      'Одежда больших размеров: платья', 'брюки', 'рубашки. Индивидуальные лекала для любой фигуры. Размеры 42-62 и выше.',
      'Übergrößen: Kleider', 'Hosen', 'Hemden. Individuelle Schnittmuster für jede Figur. Größen 42-62 und darüber.'
    ],
    price: "₺6000+"
  },
  {
    icon: '👔', color: '#e3f2fd',
    names: { tr: 'Erkek Terzi Kıyafeti Dikimi & Tamiri', en: "Men's Tailoring & Repair", ru: 'Мужская одежда – пошив и ремонт', de: 'Herrenbekleidung – Nähen & Reparatur' },
    descs: [
      'Erkek takım elbise', 'blazer', 'ceket', 'gömlek', 'pantolon', 'yelek', 'smoking dikimi ve tadilatı. Ceket daraltma', 'gömlek daraltma', 'pantolon paça kısaltma', 'pantolon daraltma. Ofis kıyafeti', 'düğün takımı', 'özel gün.',
      'Men\'s suits', 'blazers', 'jackets', 'shirts', 'trousers', 'vests', 'tuxedos – custom or altered. Jacket taking in', 'shirt alteration', 'trouser hemming. Office', 'wedding', 'formal wear alterations.',
      'Мужские костюмы', 'пиджаки', 'рубашки', 'брюки', 'жилеты', 'смокинги – пошив и подгонка. Заужение пиджака, рубашки.',
      'Herrenanzüge', 'Blazer', 'Hemden', 'Hosen', 'Smoking – Maßanfertigung oder Änderungen. Einengen, kürzen, anpassen.'
    ],
    price: "₺3000+"
  },
  {
    icon: '👗', color: '#fce4ec',
    names: { tr: 'Bayan Terzi Kıyafeti Dikimi & Tamiri', en: "Women's Tailoring & Repair", ru: 'Женская одежда – пошив и ремонт', de: 'Damenbekleidung – Nähen & Reparatur' },
    descs: [
      'Bayan elbise', 'bluz', 'etek', 'pantolon', 'ceket', 'tulum', 'abiye', 'gelinlik dikimi ve tadilatı. Elbise daraltma', 'etek kısaltma', 'abiye tamiri. Günlük', 'iş', 'gece', 'düğün kıyafetleri.',
      'Women\'s dresses', 'blouses', 'skirts', 'trousers', 'jackets', 'evening gowns', 'wedding dresses – custom or altered. Dress taking in', 'skirt shortening', 'evening gown repair.',
      'Женские платья', 'блузки', 'юбки', 'брюки', 'вечерние наряды – пошив и подгонка. Ушить платье, укоротить юбку.',
      'Damenkleider', 'Blusen', 'Röcke', 'Hosen', 'Abendkleider – Maßanfertigung oder Änderungen.'
    ],
    price: "₺2500+"
  },
  {
    icon: '👶', color: '#fff8e1',
    names: { tr: 'Çocuk & Bebek Kıyafeti', en: "Children & Baby Clothing", ru: 'Детская одежда', de: 'Kinder & Babykleidung' },
    descs: [
      'Çocuk & Bebek Kıyafeti', 'çocuk kıyafeti', 'çocuk kostümü', 'okul kıyafeti', 'çocuk sweatshirt ve eşofman dikimi. Anne grubu toplu sipariş indirimi. Erkek çocuk', 'kız çocuk', 'bebek. Tamir, tadilat ve özel dikim.',
      'Baby dresses', 'children\'s clothing', 'school uniforms', 'costumes', 'children\'s sweatshirts. Group discounts for parent communities. Boys', 'girls', 'babies. Repairs and custom sewing.',
      'Одежда для малышей', 'детская одежда', 'школьная форма', 'костюмы. Скидки для мини-групп.',
      'Babykleider', 'Kinderkleidung', 'Schulkleidung', 'Kostüme. Gruppenrabatt für Elterngruppen.'
    ],
    price: "₺200+"
  },
  {
    icon: '👕', color: '#f3e5f5',
    names: { tr: 'Sweatshirt & Eşofman Dikimi', en: "Sweatshirt & Tracksuit Sewing", ru: 'Толстовки и спортивные костюмы', de: 'Sweatshirt & Trainingsanzug' },
    descs: [
      'Sweatshirt dikimi', 'eşofman dikimi', 'sweatshirt fermuarı', 'eşofman tadilatı', 'kapüşonlu sweatshirt', 'polo yaka', 'baskılı sweatshirt', 'nakışlı sweatshirt', 'seri üretim. Her türlü spor ve casual kıyafet.',
      'Sweatshirt sewing', 'tracksuit sewing', 'hoodie', 'polo neck', 'printed/embossed tracksuits', 'mass production. All types of sportswear and casualwear.',
      'Пошив толстовок', 'спортивных костюмов', 'худи', 'с принтом с вышивкой', 'серийное производство.',
      'Sweatshirt-Nähen', 'Trainingsanzug', 'Hoodie', 'Polo', 'bedruckt/gestickt', 'Serienproduktion.'
    ],
    price: "₺400+"
  },
  {
    icon: '🪡', color: '#e8eaf6',
    names: { tr: 'Nakış & Baskı Hizmetleri', en: "Embroidery & Printing", ru: 'Вышивка и печать', de: 'Stickerei & Druck' },
    descs: [
      'Kıyafete nakış işleme', 'logo nakışı', 'isim nakışı', 'eşofman nakışı', 'üniforma nakışı', 'Dijital baskı', 'transfer baskı', 'serigrafi. Seri imalat için uygun fiyatlı.',
      'Garment embroidery', 'logo embroidery', 'name embroidery', 'uniform embroidery. Digital print', 'transfer print', 'screen print. Affordable for mass production.',
      'Вышивка на одежде', 'логотип', 'имя', 'фирменная вышивка. Цифровая печать', 'трафаретная печать.',
      'Stickerei auf Kleidung', 'Logo-Stickerei', 'Namens-Stickerei', 'Uniformstickerei. Digitaldruck', 'Siebdruck.'
    ],
    price: "₺100+"
  },
  {
    icon: '💍', color: '#fce4ec',
    names: { tr: 'Gelinlik & Abiye Tadilatı', en: "Wedding & Evening Alterations", ru: 'Свадьба - Особый день', de: 'Hochzeit - Abend' },
    descs: [
      'Gelinlik dikimi', 'gelinlik tadilatı', 'gelinlik daraltma', 'abiye dikimi', 'abiye tamiri', 'abiye tadilatı', 'nişan elbisesi', 'kına kıyafeti', 'gece elbisesi. Kusursuz fit garantisi.',
      'Wedding dress sewing', 'wedding dress alterations', 'gown suit', 'evening gown sewing', 'evening gown repair', 'engagement dress. Perfect fit guaranteed.',
      'Пошив свадебного платья', 'подгонка', 'подгонка сикинга', 'вечерние платья', 'ремонт вечернего платья.',
      'Brautkleid Nähen', 'Anpassung', 'Bräutigamanzug', 'Abendkleid', 'Abendkleid reparieren.'
    ],
    price: "₺2500+"
  },
  {
    icon: '🏨', color: '#e0f7fa',
    names: { tr: 'Üniforma - Otel & Restoran', en: "Hotel & Tourism Uniform Production", ru: 'Гостиничная форма – производство', de: 'Hotel & Tourismus Uniformproduktion' },
    descs: [
      'Otel personeli üniforması', 'resepsiyon üniforması', 'kat görevlisi üniforması', 'aşçı üniforması', 'servis üniforması', 'meydancı üniforması', 'güvenlik üniforması', 'spa üniforması', 'tasarım', 'kalıp', 'seri üretim', 'nakışlı.'
    ],
    price: "Teklif Alın"
  },
  {
    icon: '🏥', color: '#e8f5e9',
    names: { tr: 'Sağlık & Endüstri Üniformaları', en: "Health & Industry Uniforms", ru: 'Медицинская и рабочая форма', de: 'Gesundheit & Industrie Uniformen' },
    descs: [
      'Doktor üniforması', 'hemşire üniforması', 'eczacı üniforması', 'laborant üniforması', 'iş güvenliği üniforması', 'fabrika işçi üniforması', 'inşaat kıyafeti', 'çağrı merkezi üniforması', 'banka personeli üniforması. Her sektöre özel tasarım ve üretim.'
    ],
    price: "Teklif Alın"
  },
  {
    icon: '🍽️', color: '#fff8e1',
    names: { tr: 'Restoran & Mutfak Üniformaları', en: "Restaurant & Kitchen Uniforms", ru: 'Форма для ресторанов и кухни', de: 'Restaurant & Küchen-Uniformen' },
    descs: [
      'Aşçı üniforması', 'şef kıyafeti', 'aşçı önlüğü', 'komi üniforması', 'garson üniforması', 'barista üniforması', 'mutfak şapkası. Logo nakışı ile birlikte üretim.'
    ],
    price: "Teklif Alın"
  },
  {
    icon: '🏫', color: '#f3e5f5',
    names: { tr: 'Okul & Spor Üniformaları', en: "School & Sports Uniforms", ru: 'Школьная и спортивная форма', de: 'Schul- & Sportuniformen' },
    descs: [
      'Okul ünforması', 'okul forması', 'öğrenci kıyafeti', 'spor takımı ünforması', 'futbol forması', 'voleybol forması', 'basketbol forması', 'spor kulübü kıyafeti. Toplu sipariş', 'özel renk', 'baskı', 'nakış.'
    ],
    price: "Teklif Alın"
  },
  {
    icon: '🏭', color: '#e8f5e9',
    names: { tr: 'Seri İmalat & Fason Üretim', en: "Mass Production - Contract", ru: 'Серийное производство', de: 'Serienproduktion' },
    descs: [
      'Kalıp çıkarma', 'model tasarımı', 'kesim', 'dikim', 'ütü', 'paket. Numune dikimi', 'prototip', 'seri imalat. Markalar', 'butikler', 'e-ticaret firmaları için tam üretim paketi.'
    ],
    price: "Teklif Alın"
  },
  {
    icon: '🛏️', color: '#dbf5e9',
    names: { tr: 'Ev Tekstili & Diğer', en: "Home Textiles", ru: 'Шторы и домашний текстиль', de: 'Vorhänge & Heimtextilien' },
    descs: [
      'Nevresim takımı dikimi', 'perde dikimi', 'stor perde', 'tül', 'kırlent', 'yatak örtüsü', 'Ölçüye özel ev tekstili. Otel odaları için toplu üretim.'
    ],
    price: "₺300+"
  },
  {
    icon: '🧺', color: '#e3f2fd',
    names: { tr: 'Kuru Temizleme & Çamaşır', en: "Dry Cleaning & Laundry", ru: 'Химчистка и стирка', de: 'Reinigung & Wäsche' },
    descs: [
      'Kuru temizleme', 'çamaşır yıkama', 'ütü hizmeti. Otelden teslim alma ve teslimat. Turistlere ekspres servis.'
    ],
    price: "₺300+"
  }
];

const REVIEWS = [
  { stars: 5, text: "Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim, nakış kalitesi harika!", author: "Murat B.", flag: "🇹🇷", city: "Antalya", date: "Ocak 2026" },
  { stars: 5, text: "We ordered custom embroidered sweatshirts for our team - elite tailors, delivered on time. Excellent quality and price!", author: "David K.", flag: "🇬🇧", city: "London", date: "Şubat 2026" },
  { stars: 5, text: "Amazing tailor in Antalya! Dress altered within 24 hours before my gala dinner. Perfect fit, very professional!", author: "Sarah M.", flag: "🇺🇸", city: "New York", date: "Mart 2026" },
  { stars: 5, text: "Отличный портной! Пошил свадебное платье за 3 дня. Говорят по-русски, доставили прямо в отель в Белеке!", author: "Наталья К.", flag: "🇷🇺", city: "Moskva", date: "Nisan 2026" },
  { stars: 5, text: "Düğün sezonu yoğunluğunda mükemmel şekilde teslim ettiler. Hızlı, kaliteli hizmet. Paça kısaltmayı aynı gün yaptılar!", author: "Elif Y.", flag: "🇹🇷", city: "Antalya", date: "Nisan 2026" },
  { stars: 5, text: "Suit altered for a business meeting in 24h. Perfect fit. English speaking – best tailor in Antalya!", author: "James T.", flag: "🇦🇺", city: "Sydney", date: "Mayıs 2026" },
  { stars: 5, text: "Kuru temizleme ve ütü hizmetleri mükemmeldi. Otelden aldılar, otele teslim ettiler. Çok pratik!", author: "Mehmet A.", flag: "🇹🇷", city: "Antalya", date: "Haziran 2026" }
];

const SEO_KEYWORDS = [
  'Antalya Terzi', 'Antalya En İyi Terzi', 'En İyi Terzi Antalya', 'Usta Terzi Antalya', 'kaliteli terzi',
  'Terzi Fiyatları Antalya', 'Terzi Servisi Antalya', 'Araçlı Terzi Antalya', 'Otel Terzi Antalya',
  'Terzi Atölyesi Antalya', 'Dikim Atölyesi Antalya', 'Online Terzi Antalya', 'en iyi terzi',
  'Ölçüye Göre Dikim Antalya', 'Özel Dikim Antalya', 'Hızlı Terzi Antalya', 'Dikiş', 'tadilat', 'ısmarlama terzi',
  'Yakın Terzi Antalya', 'En Yakın Terzi', 'Yakındaki Terzi', 'Terzi Nerede', 'tamir tadilat',
  'Yakın Terzi Antalya', 'Antalya Terzi Nerede', 'Antalya Dikim', 'terzi', 'tamir', 'bana en yakın terzi',
  'En yakın terzi', 'usta terzi', 'terziücreti', 'güzel terzi', 'Profesyonel Terzi',
  'Antalya Terzi Fiyatları', 'Paça Kısaltma Kaç Lira', 'kot pantolon paçası kısaltma', 'kot beli daraltma'
];

export default function TerziClient() {
  const [lang, setLang] = useState<Lang>('tr');
  const [activeIlce, setActiveIlce] = useState<string | null>(null);

  const c = C[lang];
  const idx = { tr: 0, en: 1, ru: 2, de: 3 }[lang] || 0;

  const waLink = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

  // ÇÖZÜM 2: Search Console SSS Öğesi İçin Aktif Dile Göre Dinamik Şema Üretimi
  const dynamicFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": c.faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div style={{ fontFamily: '"Outfit", sans-serif', background: '#faf8f4', minHeight: '100vh', color: '#2c2418' }}>
      
      {/* Küresel Schema & Dinamik FAQ Şemasının Çıktılanması */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dynamicFaqSchema) }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glowPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        
        .fu { animation: fadeUp 0.55s ease both; }
        .fu1 { animation: fadeUp 0.55s 0.12s ease both; }
        .fu2 { animation: fadeUp 0.55s 0.22s ease both; }
        .fu3 { animation: fadeUp 0.55s 0.30s ease both; }

        .faq-item { border-bottom: 1px solid #edc8c8; }
        .faq-q { cursor: pointer; padding: 16px 0; display: flex; justify-content: space-between; align-items: center; }
        .faq-a { padding-bottom: 16px; color: #6b5a4a; line-height: 1.5; font-size: 14px; }
        details[open] .faq-arrow { transform: rotate(45deg); }
        .faq-arrow { transition: transform 0.2s; display: inline-block; }
      `}</style>

      {/* DİL SEÇİM BARU */}
      <div style={{ background: '#1c1814', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['tr', 'en', 'ru', 'de'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border: '1px solid ' + (lang === l ? '#db854e' : 'rgba(255,255,255,0.13)'),
                background: lang === l ? '#db854e' : 'transparent',
                color: lang === l ? '#fff' : 'rgba(255,255,255,0.4)',
                fontFamily: 'inherit', transition: 'all 0.2s'
              }}
            >
              {l === 'tr' ? '🇹🇷 TR' : l === 'en' ? '🇬🇧 EN' : l === 'ru' ? '🇷🇺 RU' : '🇩🇪 DE'}
            </button>
          ))}
        </div>
        <a href={waLink(c.waMsg)} style={{ fontSize: 11, color: '#db854e', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ animation: 'glowPulse 2s infinite' }}>●</span> WhatsApp
        </a>
      </div>

      {/* HERO SECTION */}
      <header style={{ background: 'linear-gradient(165deg, #1c1814 0%, #2a1c0f 45%, #1a1208 100%)', padding: '52px 24px 44px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(184,149,74,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(184,149,74,0.04) 0%, transparent 50%)', pointerEvents: 'none' }} />
        
        <div className="fu" style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#db854e', marginBottom: 12, display: 'inline-block' }}>{c.badge}</span>
        </div>

        <h1 className="fu1" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 46, fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: 8, letterSpacing: '-0.5px' }}>
          {c.h1} <br />
          <em style={{ color: '#db854e', fontFamily: 'italic', fontSize: 32 }}>{c.h2}</em>
        </h1>

        <p className="fu2" style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', marginBottom: 12, letterSpacing: '0.4px', lineHeight: 1.7 }}>{c.sub}</p>

        <div className="fu3" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          <a href={waLink(c.waMsg)} style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)', color: '#fff', borderRadius: 14, padding: '13px 20px', fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {c.waBtn}
          </a>
        </div>
      </header>

      {/* HİZMETLER BÖLÜMÜ */}
      <section style={{ padding: '52px 20px', background: '#faf8f4' }}>
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#db854e', marginBottom: 6 }}>{c.s1Sub}</div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 34, fontWeight: 700, color: '#1c1814' }}>{c.s1}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, maxWidth: 740, margin: '0 auto' }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.03)', borderRadius: 18, padding: '18px 15px', boxShadow: '0 8px 32px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 3, color: '#1c1814' }}>{s.names[lang]}</h3>
              <p style={{ fontSize: 11, color: '#6b5a4a', lineHeight: 1.5, marginBottom: 8 }}>{s.descs[idx]}</p>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#db854e' }}>{s.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NEDEN BİZ BÖLÜMÜ */}
      <section style={{ padding: '52px 20px', background: '#f0ebe2' }}>
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#db854e', marginBottom: 6 }}>{c.s2Sub}</div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 34, fontWeight: 700, color: '#1c1814' }}>{c.s2}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, maxWidth: 600, margin: '0 auto' }}>
          {c.faq.slice(0, 3).map((f, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #edc8c8', borderRadius: 10, padding: '14px 12px' }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: '#1c1814' }}>{f.q}</h4>
              <p style={{ fontSize: 11, color: '#6b5a4a', lineHeight: 1.45 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MÜŞTERİ YORUMLARI */}
      <section style={{ padding: '52px 20px', background: '#1c1814' }}>
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 34, fontWeight: 700, color: '#fff' }}>{c.s4}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 600, margin: '0 auto' }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 12 }}>
              <div style={{ fontSize: 11, color: '#db854e', marginBottom: 4 }}>{'★'.repeat(r.stars)}</div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 6 }}>"{r.text}"</p>
              <div style={{ fontSize: 11, color: '#db854e', fontWeight: 600 }}>{r.flag} {r.author} - {r.city}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SSS (FAQ) UI ALANI */}
      <section style={{ padding: '52px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 700, color: '#1c1814', marginBottom: 20 }}>{c.s3}</h2>
          {c.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1c1814' }}>{f.q}</h3>
                <span className="faq-arrow">+</span>
              </summary>
              <div className="faq-a">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* HİZMET BÖLGELERİ */}
      <section style={{ padding: '52px 20px', background: '#f0ebe2' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 700, color: '#1c1814', marginBottom: 15 }}>{c.s5}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 16 }}>
            {ANTALYA_ILCELER.map((item) => (
              <button
                key={item.ilce}
                onClick={() => setActiveIlce(activeIlce === item.ilce ? null : item.ilce)}
                style={{
                  padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: '1px solid ' + (activeIlce === item.ilce ? '#db854e' : '#edc8c8'),
                  background: activeIlce === item.ilce ? '#db854e' : '#fff',
                  color: activeIlce === item.ilce ? '#fff' : '#1c1814'
                }}
              >
                {item.ilce}
              </button>
            ))}
          </div>

          {activeIlce && (
            <div style={{ background: '#fff', borderRadius: 10, padding: 12, border: '1px solid #edc8c8', textAlign: 'left' }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#db854e' }}>{activeIlce} Mahalleleri:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {ANTALYA_ILCELER.find(i => i.ilce === activeIlce)?.mahalleler.map((m) => (
                  <span key={m} style={{ fontSize: 11, background: '#faf8f4', padding: '3px 8px', borderRadius: 6, color: '#6b5a4a' }}>{m}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ÇÖZÜM 1: DÜZELTİLMİŞ VE PARANTEZİ KAPATILMIŞ SEO METİN BLOĞU */}
      <div style={{ background: '#fff', padding: '26px 20px', borderBottom: '1px solid #edc8c8' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          {([c.seoP1, c.seoP2, c.seoP3, c.seoP4].filter(Boolean)).map((p, i) => (
            <p
              key={i}
              // style objesi tam burada bağımsız olarak kapatıldı: "}}"
              style={{ fontSize: 12, color: '#7a765d', marginBottom: 8 }}
              // dangerouslySetInnerHTML artık kendi başına izole bir özelliktir
              dangerouslySetInnerHTML={{
                __html: p.replaceAll('paça kısaltma|pantolon kısaltma|fermuar değişimi|tadilat|kuru temizleme|çamaşır yıkama|ütü|kalıp çıkarma|model dikimi|seri imalat|fason|tailor|dry cleaning', '')
              }}
            />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#1c1814', padding: '36px 20px', borderTop: '1px solid rgba(184,149,74,0.12)', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
        <p style={{ marginBottom: 10 }}>SwapHubs © 2026 - Antalya Terzi Servisi</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {SEO_KEYWORDS.map((k) => (
            <span key={k} style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)' }}>{k} •</span>
          ))}
        </div>
      </footer>

    </div>
  );
}
