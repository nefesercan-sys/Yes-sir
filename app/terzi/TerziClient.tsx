'use client';

import { useState } from 'react';

const PHONE = "905318986418";
type Lang = 'tr' | 'en' | 'ru' | 'de';

const ANTALYA_ILCELER = [
  { ilce: "Muratpaşa", mahalleler: ['Fener', 'Kışla', 'Sinan', 'Güzeloba', 'Balbey', 'Kaleiçi', 'Haşimişcan', 'Yenigün', 'Meltem', 'Çağlayan', 'Uncalı (Muratpaşa)', 'Bahçelievler', 'Ermenek', 'Özgürlük', 'Yüksekalan', 'Kırcami', 'Konuksever', 'Kızıltoprak', 'Meydandüzü', 'Kızılarık', 'Topçular', 'Demircikara', 'Gebizli', 'Soğuksu', 'Zerdalilik', 'Altındağ', 'Güvenlik', 'Yıldız', 'Sedir', 'Varlık', 'Bayındır', 'Dutlubahçe', 'Tarım', 'Şirinyalı', 'Yeşilbahçe', 'Kızılsaray', 'Elmalı (Muratpaşa)', 'Meydan', 'Tahılpazarı'] },
  { ilce: "Konyaaltı", mahalleler: ['Hurma', 'Sarısu', 'Liman', 'Uncalı', 'Arapsuyu', 'Gürsu', 'Kızıltoprak', 'Çakırlar', 'Döşemealtı (Konyaaltı)', 'Altınkum', 'Kuşkavağı', 'Kuzdere (Konyaaltı)', 'Siteler', 'Toros', 'Pınarbaşı', 'Uluç', 'Molla Yusuf', 'Öğretmenevleri', 'Akkuyu', 'Bahtılı', 'Karatepe', 'Gökçam', 'Doyran', 'Çitdibi'] },
  { ilce: "Kepez", mahalleler: ['Varsak', 'Santral', 'Yavuz Selim', 'Pınarbaşı', 'Altındağ', 'Göksu', 'Şafak', 'Göçerler', 'Atatürk', 'Duraliler', 'Yeşilbayır', 'Karabağ', 'Doyran', 'Çiğdem', 'Kumluca (Kepez)', 'Emek', 'Teomanpaşa', 'Ulus', 'Yükseliş', 'Zafer', 'Ahatlı', 'Kültür', 'Yenidoğan', 'Fabrikalar', 'Fatih', 'Çamlıbel', 'Erenköy', 'Sütçüler', 'Gazi', 'Habibler', 'Hüsnü Karakaş', 'Kütükçü', 'Kanal', 'Karşıyaka', 'Kuzeyyaka', 'Özgürlük (Kepez)', 'Yeni Mahalle', 'Güneş', 'Barış'] },
  { ilce: "Aksu", mahalleler: ['Aksu Merkez', 'Boğazkent', 'Belek', 'Kadriye', 'Serik (Aksu)', 'Çandır', 'Güneykent', 'Topallıoğlu', 'Gebiz'] },
  { ilce: "Döşemealtı", mahalleler: ['Döşemealtı Merkez', 'Habibler', 'Yeniköy', 'Yalınlı', 'Varsak (Döşemealtı)', 'Yağca', 'Kızıllı', 'Yeşilbayır', 'Antalya OSB Çevresi'] },
  { ilce: "Serik", mahalleler: ['Serik Merkez', 'Belek', 'Boğazkent', 'Kadriye', 'Taşağıl', 'Kızılot (Serik)', 'Titreyengöl'] },
  { ilce: "Alanya", mahalleler: ['Alanya Merkez', 'Mahmutlar', 'Avsallar', 'Konaklı', 'Cikcilli', 'Oba', 'Kestel', 'Tosmur', 'Kargıcak', 'Dinek', 'Tepe'] },
  { ilce: "Manavgat", mahalleler: ['Manavgat Merkez', 'Side', 'Sorgun', 'Kumköy', 'Evrenseki', 'Gündoğdu', 'Çolaklı', 'Titreyengöl', 'Sarılar', 'Sarısıgerme (Manavgat)'] },
  { ilce: "Kemer", mahalleler: ['Kemer Merkez', 'Beldibi', 'Göynük', 'Çamyuva', 'Tekirova', 'Arslanbucak', 'Kiriş'] },
  { ilce: "Kaş", mahalleler: ['Kaş Merkez', 'Kalkan', 'Gömbe', 'Bezirgan', 'Yeşilköy (Kaş)'] },
  { ilce: "Finike", mahalleler: ['Finike Merkez', 'Hasyurt', 'Sahilkent', 'Turunçova'] },
  { ilce: "Kumluca", mahalleler: ['Kumluca Merkez', 'Mavikent', 'Beykonak', 'Yeşilköy (Kumluca)'] },
  { ilce: "Elmalı", mahalleler: ['Elmalı Merkez', 'Yuva', 'Çaylıca', 'Akçay', 'Eskihisar'] },
  { ilce: "Korkuteli", mahalleler: ['Korkuteli Merkez', 'Kızılcadağ', 'Yazır', 'Büyükköy'] },
  { ilce: "Gündoğmuş", mahalleler: ['Gündoğmuş Merkez'] },
  { ilce: "İbradı", mahalleler: ['İbradı Merkez', 'Ürünlü'] },
  { ilce: "Akseki", mahalleler: ['Akseki Merkez', 'Cevizli', 'Kuyucak', 'İbradı'] }
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://swaphubs.com/terzi",
      "name": "Antalya Terzi - Terzi Can",
      "alternateName": [
        "Terzi Can", "Tailor Can", "Портной Кан", "Schneider Can",
        "Antalya Terzi Hizmeti", "Antalya Kuru Temizleme",
        "Belek Terzi", "Antalya Erkek Terzi", "Antalya Bayan Terzi",
        "Antalya Çocuk Kıyafeti Dikimi", "Antalya Terzi Servisi",
        "Antalya Üniforma Üretimi", "Antalya Otel Üniforması",
        "Antalya Sweatshirt Dikimi", "Antalya Nakış Hizmeti",
        "Antalya Büyük Beden Terzi", "Antalya Fason İmalat"
      ],
      "description": "Antalya'nın en iyi terzisi. Paça kısaltma, fermuar değişimi, tadilat, tamir, daraltma, elbise dikimi, erkek terzi, bayan terzi, çocuk kıyafeti, bebek elbisesi, büyük beden, nevresim, perde dikimi, sweatshirt ve nakış.",
      "url": "https://swaphubs.com/terzi",
      "telephone": "+90 531 898 64 18",
      "priceRange": "₺₺",
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
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "94",
        "bestRating": "5"
      },
      "serviceType": [
        "Paça Kısaltma", "Tadilat", "Tamir", "Daraltma", "Fermuar Değişimi", "Elbise Dikimi", "Erkek Terzi", "Bayan Terzi", "Çocuk Kıyafeti Dikimi", "Büyük Beden Terzi", "Gelinlik", "Damatlık", "Abiye Dikimi", "Üniforma Üretimi", "Nakış & Baskı", "Kuru Temizleme", "Perde Dikimi", "Ev Tekstili Dikimi"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Antalya'da paça kısaltma fiyatı ne kadar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Antalya'da paça kısaltma fiyatımız ₺150'den başlar. Pantolon cinsi ve kumaş türüne göre değişiklik gösterebilir."
          }
        },
        {
          "@type": "Question",
          "name": "Antalya'da elbise dikim fiyatları ne kadar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Elbise dikim fiyatlarımız 2026 yılı için ortalama ₺6200'den başlamaktadır. Tasarım karmaşıklığı fiyatı belirler."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Swaphubs", "item": "https://swaphubs.com" },
        { "@type": "ListItem", "position": 2, "name": "Terzi Antalya", "item": "https://swaphubs.com/terzi" }
      ]
    }
  ]
};

const C = {
  tr: {
    badge: '⚡ Antalya - Terzi Can',
    h1: 'Antalya Terzi',
    h1Sub: ' - Terzi Can',
    sub: 'Erkek · Bayan · Çocuk · Tadilat · Üniforma · Nakış · Fason · Seri İmalat',
    waBtn: "WhatsApp'tan Yazın",
    downBtn: 'Hizmetleri Gör',
    waMsg: 'Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.',
    s1: 'Hizmetlerimiz', s1t: 'Ne Yapıyoruz?',
    s2: 'Neden Biz?', s2t: 'Neden Bizi Seçmelisiniz?',
    s3: 'Sık Sorulan Sorular',
    s4: 'Müşteri Yorumları',
    s5: 'Hizmet Bölgeleri',
    s6: 'İletişim', s6t: 'Bize Ulaşın',
    s6sub: "WhatsApp'tan mesaj atın, hemen yanıt verelim.",
    walabel: "WhatsApp'ta Sohbet Et",
    maplabel: 'Haritada Bul',
    mobileSvcTitle: 'Mobil Terzi Servisi',
    mobileSvcBadge: '⭐ YENİ HİZMET!',
    mobileSvcHeading: 'Kapınıza Geliyoruz',
    mobileSvcDesc: 'Araçlı terzi servisimizle tüm Antalya\'ya hizmet veriyoruz. Terzi Can ekibimiz adresinize geliyor, yerinde ölçü alıyor, dikimi tamamlayıp tekrar kapınıza teslim ediyor.',
    mobileSvcSteps: ['Ölçü Alımı & Teslimat', 'Atölyede Dikim', 'Kapıya Teslim'],
    mobileSvcStepLabels: ["WhatsApp'tan konum paylaşın, yerinde ölçü alalım.", "Özel ekipmanlı mobil aracımızda dikim.", "Ütülenmiş ve paketlenmiş teslimat."],
    mobileSvcCta: '⚡ Mobil Terzi Servisi Talep Et',
    mobileSvcCtaMsg: 'Merhaba, mobil terzi servisinizden yararlanmak istiyorum. Adresime gelebilir misiniz?',
    seoP1: "Antalya Terzi Can olarak Antalya'da 15 yılı aşkın deneyimimizle bay terzi, bayan terzi ve çocuk kıyafeti dikimi hizmeti sunuyoruz. Paça kısaltma, pantolon daraltma, elbise daraltma, tadilat, kıyafet kısaltma gibi her türlü terzilik ihtiyacınızı profesyonel ekibimizle karşılıyoruz.",
    seoP2: "Antalya'nın tüm ilçelerinde — Muratpaşa, Konyaaltı, Kepez, Lara, Belek, Kemer, Alanya ve Manavgat — mobil terzi servisimizle adresinize geliyoruz. Yerinde ölçü alıp, dikip, tekrar teslim ediyoruz. Terzi Can kalitesiyle tanışın.",
    seoP3: "Fiyat Listesi: paça kısaltma ₺150 — fermuar daraltma ₺120 — elbise tadilatı ₺200 — kuru temizleme ₺400. Portnoy Kan v Antalye — terzi ve dikiş hizmetleri, kuru temizleme, ütüleme.",
    seoP4: "Terzi fiyatları: paça kısaltma ₺150 — fermuar daraltma ₺120 — ceket daraltma ₺300 — elbise tadilatı ₺200 — kuru temizleme ₺400. Portnoy Kan v Antalye — professional tailor services.",
    faq: [
      { q: "Paça kısaltma kaç lira? 2026 fiyatı ne kadar?", a: "Paça kısaltma ₺150'den başlar. Kumaş pantolon ₺150, kot pantolon ₺175 civarıdır. Kesim işçiliğine göre değişir." },
      { q: "Adrese gelen terzi servisiniz var mı?", a: "Evet! Araçlı mobil terzi servisimizle Antalya'nın tüm ilçelerine geliyoruz. Adresinizde ölçü alıp kapıda teslim yapıyoruz." }
    ]
  },
  en: {
    badge: '⚡ Antalya - Tailor Can',
    h1: 'Antalya Tailor',
    h1Sub: " - Tailor Can",
    sub: "Men · Women · Children · Baby · Alterations · Custom · Mass Production",
    waBtn: "WhatsApp Us Now",
    downBtn: "View Services",
    waMsg: "Hello, I would like like information about your tailoring service.",
    s1: 'Services', s1t: 'What We Offer',
    s2: 'Why Us?', s2t: 'Why Choose Us?',
    s3: 'FAQ',
    s4: 'Reviews',
    s5: 'Service Areas',
    s6: 'Contact', s6t: 'Get in Touch',
    s6sub: "Send a WhatsApp message, we'll reply instantly.",
    walabel: 'Chat on WhatsApp',
    maplabel: 'Find on Map',
    mobileSvcTitle: 'Mobile Tailor Service',
    mobileSvcBadge: '⭐ NEW SERVICE!',
    mobileSvcHeading: 'We Come To You',
    mobileSvcDesc: 'Our mobile tailor service covers all of Antalya. We visit your address, take measurements on-site, complete the tailoring in our workshop, and deliver back to your door. Hotel, home, or office — no problem.',
    mobileSvcSteps: ['Share Your Address', 'On-Site Measurements', 'Delivered To Your Door'],
    mobileSvcStepLabels: ["Send location via WhatsApp.", "Tailor comes to you.", "Sent to your measurements, delivered at agreed time."],
    mobileSvcCta: '⚡ Request Mobile Tailor',
    mobileSvcCtaMsg: 'Hello, I would like to use your mobile tailor service. Can you come to my address?',
    seoP1: "Antalya Tailor Can has been Antalya's trusted tailor for over 15 years. We offer men's and women's tailoring, children's clothing, trouser hemming, dress alterations, jacket repairs, zip replacements and all types of custom sewing. Quality craftsmanship and friendly service.",
    seoP2: "We serve all Antalya districts — Muratpasa, Konyaalti, Kepez, Lara, Belek, Kemer, Alanya and Manavgat — with our mobile tailor service. We come to your address, take measurements on-site, tailor and deliver back to you. Tailor Can brings custom tailoring to you.",
    seoP3: "Price List: trouser hemming ₺150 — zip replacement ₺120 — dress alteration ₺200 — dry cleaning ₺400. Tailor in Antalya — professional tailor services, clothing repair.",
    seoP4: "Tailor prices 2026: hemming ₺150 — zip replacement ₺120 — suit alteration ₺300 — dress modification ₺200. Professional tailoring and clothing repair.",
    faq: [
      { q: "How much does trouser hemming cost?", a: "Trouser hemming starts from ₺150. Price depends on fabric type. WhatsApp us for a free quote." },
      { q: "Do you come to my hotel or home?", a: "Yes! Our mobile tailor service covers Antalya districts. We visit your address, take measurements, tailor, and deliver back to you." }
    ]
  },
  ru: {
    badge: '⚡ Анталья - Портной Кан',
    h1: 'Портной Анталья',
    h1Sub: ' - Портной Кан',
    sub: 'Мужская · Женская · Детская · Пошив · Химчистка · Серийное Производство',
    waBtn: 'Написать в WhatsApp',
    downBtn: 'Смотреть услуги',
    waMsg: 'Здравствуйте, хотел бы узнать о ваших услугах портного.',
    s1: 'Услуги', s1t: 'Что мы предлагаем',
    s2: 'Почему мы?', s2t: 'Почему выбирают нас?',
    s3: 'Частые ответы',
    s4: 'Отзывы',
    s5: 'Районы обслуживания',
    s6: 'Контакты', s6t: 'Связаться с нами',
    s6sub: 'Напишите в WhatsApp, ответим сразу.',
    walabel: 'Написать в WhatsApp',
    maplabel: 'Найти на карте',
    mobileSvcTitle: 'Выездной портной',
    mobileSvcBadge: '⭐ ВЫЕЗДНОЙ ПОРТНОЙ',
    mobileSvcHeading: 'Приедем к вам',
    mobileSvcDesc: 'Наш выездной портной обслуживает всю Анталью. Приедем по вашему адресу, снимем мерки на месте, сошьем в ателье и доставим обратно. Отель, дом или офис — все равно.',
    mobileSvcSteps: ['Укажите адрес', 'Снятие мерок', 'Доставка к вам'],
    mobileSvcStepLabels: ['Отправьте локацию в WhatsApp.', 'Портной приедет к вам.', 'Изделие сошьется по меркам. Доставим в назначенное время.'],
    mobileSvcCta: '⚡ Вызвать портного',
    mobileSvcCtaMsg: 'Здравствуйте, хочу воспользоваться выездным сервисом. Можете приехать по моему адресу?',
    seoP1: "Портной Кан работает в Анталье уже более 15 лет. Мы предлагаем пошив мужской, женской и детской одежды, ремонт одежды, замену молний, укорачивание брюк, ремонт платьев, подгонку брюк под размер, подгонку свадебных платьев и все виды индивидуального пошива.",
    seoP2: "Мы обслуживаем все районы Антальи — Муратпаша, Коньяалты, Кепез, Лара, Белек, Кемер, Аланья и Манавгат — с выездным сервисом. Приедем к вам, снимем мерки, сошьем и доставим обратно. Подгонка брюк близко, ремонт платьев близко.",
    seoP3: "Прейскурант: ремонт одежды от ₺150 — замена молнии от ₺120 — ремонт платья от ₺200 — химчистка от ₺400. Портной Кан в Анталье — ремонт одежды, химчистка, выездной портной, доставка одежды.",
    seoP4: "Цены на ремонт одежды в Анталье: укорачивание брюк ₺150 — замена молнии ₺120 — подгонка костюма ₺300 — подгонка платья ₺200. Профессиональный ремонт одежды.",
    faq: [
      { q: "Сколько стоит подгонка брюк и замена молнии в 2026?", a: "Подгонка брюк от ₺150. Замена молнии брюк от ₺120, пальто от ₺300, пиджака от ₺300. Напишите в WhatsApp — бесплатная оценка сразу." },
      { q: "Есть ли портной рядом со мной? Выезд на дом или в отель?", a: "Да! Выездной портной работает по всей Анталье. Приедем к вам домой, в отель или офис, снимем мерки, сошьем и доставим." }
    ]
  },
  de: {
    badge: '⚡ Antalya - Schneider Can',
    h1: 'Schneider Antalya',
    h1Sub: ' - Schneider Can',
    sub: 'Herren · Damen · Kinder · Änderungen · Uniformen · Stickerei · Produktion',
    waBtn: 'WhatsApp schreiben',
    downBtn: 'Leistungen sehen',
    waMsg: 'Hallo, ich möchte mich über Ihren Schneiderservice erkundigen.',
    s1: 'Leistungen', s1t: 'Was wir anbieten',
    s2: 'Warum wir?', s2t: 'Warum Schneider Can?',
    s3: 'Häufige Fragen',
    s4: 'Kundenbewertungen',
    s5: 'Servicegebiete',
    s6: 'Kontakt', s6t: 'Kontaktieren Sie uns',
    s6sub: 'Schreiben Sie uns auf WhatsApp — wir antworten sofort.',
    walabel: 'Auf WhatsApp chatten',
    maplabel: 'Auf Karte finden',
    mobileSvcTitle: 'Mobiler Schneiderservice',
    mobileSvcBadge: '⭐ MOBILER SCHNEIDERSERVICE',
    mobileSvcHeading: 'Wir kommen zu Ihnen',
    mobileSvcDesc: 'Unser mobiler Schneiderservice ist in ganz Antalya verfügbar. Wir kommen zu Ihrer Adresse, nehmen Maße vor Ort, schneidern in unserem Atelier und liefern zurück zu Ihnen. Hotel, Zuhause oder Büro – kein Problem.',
    mobileSvcSteps: ['Adresse mitteilen', 'Maß nehmen im Atelier', 'Lieferung zu Ihnen'],
    mobileSvcStepLabels: ['Standort per WhatsApp senden.', 'Schneider kommt zu Ihnen.', 'Wird nach Maß gefertigt, Lieferung zur vereinbarten Zeit.'],
    mobileSvcCta: '⚡ Mobilen Schneider anfordern',
    mobileSvcCtaMsg: 'Hallo, ich möchte den mobilen Schneiderservice nutzen. Können Sie zu meiner Adresse kommen?',
    seoP1: "Schneider Can ist seit über 15 Jahren der vertrauenswürdige Schneider in Antalya. Wir bieten Herren- und Damenänderungsschneiderei, Kinderkleidung, Hosenänderungen, Kleidänderungen, Reparatur von Jacken, Reißverschluss-Reparatur, Abendkleid-Reparatur und alle Arten von Maßschneiderei.",
    seoP2: "Wir bedienen alle Antalya-Bezirke — Muratpasa, Konyaalti, Kepez, Lara, Belek, Kemer, Alanya und Manavgat — mit unserem mobilen Schneiderdienst. Hosenänderungen ab ₺150, Reißverschluss ab ₺120.",
    seoP3: "Preisliste: Hosenkürzen ab ₺150 — Reißverschluss ab ₺120 — Kleid ändern ab ₺200 — Chemische Reinigung ab ₺400. Schneider in Antalya — Textilreinigung, Änderungsschneiderei.",
    seoP4: "Schneider Preise 2026: Hosen heften ₺150 — Reißverschluss ersetzen ₺120 — Anzug anpassen ₺300 — Kleid modifizieren ₺200. Professionelle Schneiderei und Reparatur.",
    faq: [
      { q: "Was kostet Hosenänderung und Reißverschluss 2026 in Antalya?", a: "Hosenänderung ab ₺150. Reißverschluss ab ₺120, Mantel-Reißverschluss ab ₺300, Jacke einengen ab ₺300. WhatsApp für ein kostenloses Sofortangebot." },
      { q: "Gibt es einen Schneider in meiner Nähe? Kommen Sie ins Hotel?", a: "Ja! Unser mobiler Schneider fährt in alle Antalya-Bezirke. Standort per WhatsApp senden — wir kommen ins Hotel, nehmen Maße, schneidern und liefern zurück." }
    ]
  }
};

const SERVICES = [
  {
    icon: '✂️',
    color: '#fd6cea',
    names: { tr: 'TAMİR & TADİLAT', en: "Repairs & Alterations", ru: "Ремонт и переделка", de: "Reparaturen & Änderungen" },
    descs: {
      tr: ['Paça kısaltma', 'pantolon daraltma', 'ceket daraltma', 'gömlek daraltma', 'elbise daraltma', 'etek kısaltma', 'kol kısaltma', 'yırtık onarımı', 'dikiş tamiri', 'astar değişimi', 'cep tamiri', 'yaka değişimi', 'düğme dikimi'],
      en: ['Trouser hemming', 'taking in jacket/shirt/dress', 'skirt shortening', 'sleeve shortening', 'tear repair', 'zip replacement', 'tear repair', 'lining replacement', 'button sewing', 'seam repair.'],
      ru: ['Подгонка брюк', 'сужение пиджака/рубашки/платья', 'укорачивание юбки', 'замена молнии', 'ремонт разрывов', 'замена подкладки', 'пришивание пуговиц.'],
      de: ['Hose kürzen', 'Jacke/Hemd/Kleid einengen', 'Rock kürzen', 'Ärmel kürzen', 'Reißverschluss', 'Riss reparieren', 'Futter ersetzen', 'Knöpfe annähen.']
    },
    price: '₺150+'
  },
  {
    icon: '🧥',
    color: '#fff3e0',
    names: { tr: 'FERMUAR DEĞİŞİMİ', en: "Zip Replacement & Repair", ru: "Замена и ремонт молний", de: "Reißverschluss Reparatur" },
    descs: {
      tr: ['Her türlü kıyafetin fermuar değişimi ve onarımı: pantolon fermuarı', 'kot fermuarı', 'ceket fermuarı', 'mont fermuarı', 'elbise fermuarı', 'çanta fermuarı', 'sweatshirt fermuarı. Aynı gün servis mümkündür.'],
      en: ['Zip replacement and repair for all garments: trousers', 'jeans', 'jacket', 'coat', 'dress', 'bag', 'sweatshirt. Same-day service available.'],
      ru: ['Замена молнии во всех видах одежды: брюки', 'джинсы', 'куртки', 'пальто', 'платья', 'сумки', 'толстовки. Срочный ремонт.'],
      de: ['Reißverschluss-Ersatz für alle Kleidungsstücke: Hosen', 'Jeans', 'Jacken', 'Mäntel', 'Kleider', 'Taschen, Sweatshirts. Expressdienst.']
    },
    price: '₺120+'
  },
  {
    icon: '📐',
    color: '#e8f5e9',
    names: { tr: 'DARALTMA - BEDEN KÜÇÜLTME', en: 'Taking In - Size Down', ru: 'Заужение - Уменьшение', de: 'Einengen - Verkleinern' },
    descs: {
      tr: ['Pantolon daraltma', 'ceket daraltma', 'gömlek daraltma', 'elbise daraltma', 'etek daraltma', 'kol daraltma', 'koltuk altı alma', 'beden küçültme', 'beden seti çıkarma. Erkek - Bayan - Çocuk.'],
      en: ['Trouser/jacket/shirt/dress waist taking in', 'waist reduction', 'side seam alteration', 'size reduction', 'pattern adjustment. Men', 'Women', 'Children.'],
      ru: ['Заужение брюк/пиджака/рубашки/платья', 'уменьшение талии', 'уменьшение размера пуловера', 'Мужская', 'женская', 'детская одежда.'],
      de: ['Hosen/Jacke/Hemd/Kleid einengen', 'Taille verkleinern', 'Größe anpassen. Herren', 'Damen', 'Kinder.']
    },
    price: '₺150+'
  },
  {
    icon: '🧍',
    color: '#e8f5e9',
    names: { tr: 'BÜYÜK BEDEN & ÖZEL KESİM', en: "Plus Size & Custom Pattern", ru: "Одежда больших размеров", de: "Übergrößen & Schnittmuster" },
    descs: {
      tr: ['Büyük beden elbise', 'büyük beden pantolon', 'büyük beden gömlek dikimi. Beden seti çıkarma', 'özel kalıp hazırlama', 'her vücuda uygun dikim. 42-62 ve üzeri kumaş sonu özel dikim ve tadilat.'],
      en: ["Plus-size dresses", "trousers", "shirts", "custom pattern sets for every body shape. Sizes 42-62 and above – custom or altered. Direct taking in", "shirt alteration", "trouser hemming. Office", "wedding"],
      ru: ["Одежда больших размеров: платья", "брюки", "рубашки. Индивидуальные лекала для любой фигуры. Размеры 42-62 и выше."],
      de: ["Übergrößen: Kleider", "Hosen", "Hemden. Individuelle Schnittmuster für jede Figur. Größen 42-62 und darüber."]
    },
    price: '₺6000+'
  },
  {
    icon: '👔',
    color: '#e3f2fd',
    names: { tr: 'ERKEK TERZİ', en: "Men's Tailoring & Repair", ru: "Мужская одежда – пошив и ремонт", de: "Herrenbekleidung – Nähen & Reparatur" },
    descs: {
      tr: ['Erkek takım elbise', 'blazer', 'ceket', 'gömlek', 'pantolon', 'yelek', 'smoking dikimi ve tadilatı. Ceket daraltma', 'gömlek daraltma', 'pantolon paça kısaltma', 'pantolon daraltma. Ofis kıyafeti', 'yoğun takım', 'özel gün.'],
      en: ["Men's suits", "blazers", "jackets", "shirts", "trousers", "vests", "tuxedos – custom or altered. Jacket taking in", "shirt alteration", "trouser hemming. Office", "wedding", "evening gown repair."],
      ru: ["Мужские костюмы", "пиджаки", "рубашки", "брюки", "жилеты", "пошив и подгонка. Заужение пиджака, рубашки, брюк."],
      de: ["Herrenanzüge", "Blazer", "Hemden", "Hosen", "Smoking – Maßanfertigung oder Änderungen. Einengen, kürzen, anpassen."]
    },
    price: '₺3000+'
  },
  {
    icon: '👗',
    color: '#fce4ec',
    names: { tr: 'BAYAN TERZİ', en: "Women's Tailoring & Repair", ru: "Женская одежда – пошив и ремонт", de: "Damenbekleidung – Nähen & Reparatur" },
    descs: {
      tr: ['Bayan elbise', 'bluz', 'etek', 'pantolon', 'ceket', 'tulum', 'abiye', 'gelinlik dikimi ve tadilatı. Elbise daraltma', 'etek kısaltma', 'abiye tadilatı. Günlük', 'iş', 'gece', 'düğün kıyafetleri.'],
      en: ["Women's dresses", "blouses", "skirts", "trousers", "jackets", "evening gowns", "wedding dresses – custom or altered. Dress taking in", "skirt shortening", "evening gown repair."],
      ru: ["Женские платья", "блузки", "юбки", "брюки", "вечерние наряды", "пошив и подгонка. Ушить платье, укоротить юбку."],
      de: ["Damenkleider", "Blusen", "Röcke", "Hosen", "Abendkleider – Maßanfertigung oder Änderungen."]
    },
    price: '₺2500+'
  },
  {
    icon: '👶',
    color: '#fff8e1',
    names: { tr: 'ÇOCUK / BEBEK', en: "Children & Baby Clothing", ru: "Детская одежда", de: "Kinder & Babykleidung" },
    descs: {
      tr: ['Bebek elbisesi', 'çocuk kıyafeti', 'çocuk kostümü', 'okul kıyafeti', 'çocuk sweatshirt ve eşofman dikimi. Anne grubu toplu sipariş indirimi. Erkek çocuk', 'kız çocuk - bebek. Tamir, tadilat ve özel dikim.'],
      en: ["Baby dresses", "children's clothing", "school uniforms", "children's sweatshirts. Group discounts for parent communities. Boys", "girls", "babies. Repairs and custom sewing."],
      ru: ["Одежда для малышей", "детская одежда", "школьная форма", "костюмы. Скидки для мини-групп."],
      de: ["Babykleider", "Kinderkleidung", "Schulkleidung", "Kostüme. Gruppenrabatt für Elterngruppen."]
    },
    price: '₺200+'
  },
  {
    icon: '👕',
    color: '#f3e5f5',
    names: { tr: 'SWEATSHIRT / EŞOFMAN', en: "Sweatshirt & Tracksuit Sewing", ru: "Толстовки и спортивные костюмы", de: "Sweatshirt & Trainingsanzug" },
    descs: {
      tr: ['Sweatshirt dikimi', 'eşofman dikimi', 'sweatshirt fermuarı', 'eşofman tadilatı', 'kapüşonlu sweatshirt', 'polo yaka', 'baskılı sweatshirt', 'nakışlı sweatshirt', 'seri üretim. Her türlü spor ve casual kıyafet.'],
      en: ["Sweatshirt sewing", "tracksuit sewing", "hoodie", "polo neck", "printed/embroidered sweatshirts – mass production. All types of sportswear and casualwear."],
      ru: ["Пошив толстовок", "спортивных костюмов", "худи", "с принтом", "с вышивкой", "серийное производство."],
      de: ["Sweatshirt-Nähen", "Trainingsanzug", "Hoodie", "Polo", "bedruckt/gestickt - Serienproduktion."]
    },
    price: '₺400+'
  },
  {
    icon: '🪡',
    color: '#e0f2f1',
    names: { tr: 'NAKIŞ & BASKI', en: "Embroidery & Printing", ru: "Вышивка и печать", de: "Stickerei & Druck" },
    descs: {
      tr: ['Kıyafete nakış işleme', 'logo nakışı', 'isim nakışı', 'eşofman nakışı', 'üniforma nakışı', 'sweatshirt nakışı. Dijital baskı', 'transfer baskı', 'serigrafi. Seri imalat için uygun fiyatlı.'],
      en: ["Garment embroidery", "logo embroidery", "name embroidery", "uniform embroidery. Digital print", "transfer print", "screen print. Affordable for mass production."],
      ru: ["Вышивка на одежде", "логотипы", "имена", "форменная вышивка", "Цифровая печать", "трафаретная печать."],
      de: ["Stickerei auf Kleidung", "Logo-Stickerei", "Namens-Stickerei", "Uniformstickerei. Digitaldruck", "Siebdruck."]
    },
    price: '₺100+'
  },
  {
    icon: '💍',
    color: '#fce4ec',
    names: { tr: 'GELİNLİK & ABİYE', en: "Wedding & Evening - Special", ru: "Свадьба - Вечер - Особый день", de: "Hochzeit - Abend - Besonderer Anlass" },
    descs: {
      tr: ['Gelinlik dikimi', 'gelinlik tadilatı', 'damatlık dikimi', 'abiye dikimi', 'abiye tamiri', 'abiye tadilatı', 'nişan elbisesi', 'kına kıyafeti', 'gece elbisesi. Kusursuz fit garantisi.'],
      en: ["Wedding dress sewing", "wedding dress alterations", "groom suit", "evening gown sewing", "evening gown repair", "engagement dress", "perfect fit guaranteed."],
      ru: ["Пошив свадебного платья", "подгонка", "смокинг", "вечерние платья", "ремонт вечернего платья."],
      de: ["Brautkleid nähen", "Anpassung", "Bräutigamanzug", "Abendkleid", "Abendkleid reparieren."]
    },
    price: '₺2500+'
  },
  {
    icon: '🏨',
    color: '#e0f7fa',
    names: { tr: 'UNİFORMA - ANA KURT', en: "Hotel & Tourism Uniform Production", ru: "Гостиничная форма – производство", de: "Hotel & Tourismus Uniformproduktion" },
    descs: {
      tr: ['Otel personeli üniforması', 'resepsiyon üniforması', 'kat görevlisi üniforması', 'aşçı üniforması', 'servis üniforması', 'meydancı üniforması', 'güvenlik üniforması', 'spa üniforması', 'tasarım', 'kalıp', 'seri üretim', 'nakış', 'logo baskısı.'],
      en: ["Hotel staff uniforms", "reception", "housekeeping", "chef", "service", "valet", "security", "spa", "animation. Design", "pattern", "mass production", "embroidery", "logo printing."],
      ru: ["Форма для гостиниц", "ресепшн", "горничные", "повара", "официанты", "охрана", "спа", "дизайн", "лекала", "серийное производство", "вышивка."],
      de: ["Hotelpersonal-Uniformen", "Rezeption", "Zimmermädchen", "Köche", "Service", "Sicherheit", "Spa. Design", "Schnittmuster", "Serienproduktion", "Stickerei."]
    },
    price: 'Teklif Al'
  },
  {
    icon: '🩺',
    color: '#e8f5e9',
    names: { tr: 'SAĞLIK & ENDÜSTRİ', en: "Health & Industry Uniforms", ru: "Медицинская и рабочая форма", de: "Gesundheit & Industrie Uniformen" },
    descs: {
      tr: ['Doktor üniforması', 'hemşire üniforması', 'eczacı üniforması', 'laborant üniforması', 'iş güvenliği üniforması', 'fabrika işçi üniforması', 'inşaat kıyafeti', 'çağrı merkezi üniforması', 'banka personeli üniforması. Her sektöre özel tasarım ve seri imalat.'],
      en: ["Doctor uniforms", "nurse uniforms", "pharmacist", "lab worker", "workplace safety clothing", "factory worker", "call center", "bank staff. Custom design and mass production for any sector."],
      ru: ["Форма для врачей", "медсестер", "фармацевтов", "лаборантов", "рабочих. Производство для любой отрасли."],
      de: ["Arztuniformen", "Krankenschwester", "Apotheker", "Labor", "Sicherheitsbekleidung", "Fabrikarbeiter. Produktion für jede Branche."]
    },
    price: 'Teklif Al'
  },
  {
    icon: '🍽️',
    color: '#fff8e1',
    names: { tr: 'RESTORAN & MUTFAK', en: "Restaurant & Kitchen Uniforms", ru: "Форма для ресторанов и кухни", de: "Restaurant & Küchen-Uniformen" },
    descs: {
      tr: ['Aşçı üniforması', 'şef kıyafeti', 'aşçı önlüğü', 'komi üniforması', 'garson üniforması', 'barista üniforması', 'pastane personeli kıyafeti', 'mutfak şapkası', 'mutfak önlüğü. Logo nakışı ile birlikte üretim.'],
      en: ["Chef uniforms", "cook aprons", "waiter uniforms", "barista uniforms", "pastry staff clothing", "kitchen hats. With logo embroidery."],
      ru: ["Форма шеф-повара", "фартуки", "официанты", "бариста", "кондитерская. С вышивкой логотипа."],
      de: ["Kochuniformen", "Schürzen", "Kellneruniformen", "Barista", "Konditorei. Mit Logo-Stickerei."]
    },
    price: 'Teklif Al'
  },
  {
    icon: '🏫',
    color: '#fff3e0',
    names: { tr: 'OKUL & SPOR', en: "School & Sports Uniforms", ru: "Школьная и спортивная форма", de: "Schul- & Sportuniformen" },
    descs: {
      tr: ['Okul üniforması', 'okul forması', 'öğrenci kıyafeti', 'spor takımı üniforması', 'futbol forması', 'voleybol forması', 'basketbol forması', 'spor kulübü kıyafeti. Toplu sipariş', 'özel renk - logo baskı - nakış.'],
      en: ["School uniforms", "student clothing", "sports team uniforms", "football", "volleyball", "basketball", "club kits. Bulk orders", "custom colors", "logo", "embroidery."],
      ru: ["Школьная форма", "спортивная форма", "командная форма", "футбол", "волейбол", "баскетбол. Оптовые заказы."],
      de: ["Schuluniformen", "Sportuniformen", "Teamkleidung", "Fußball", "Handball", "Basketball. Großbestellungen."]
    },
    price: 'Teklif Al'
  },
  {
    icon: '🏭',
    color: '#c8e6c9',
    names: { tr: 'SERİ İMALAT & KALIP', en: "Mass Production - Contract", ru: "Серийное производство", de: "Serienproduktion - Design" },
    descs: {
      tr: ['Kalıp çıkarma', 'model tasarımı', 'kesim', 'dikim', 'ütü', 'paket. Numune dikimi', 'prototip', 'seri imalat. Markalar - butikler - e-ticaret firmaları için tam üretim paketi.'],
      en: ["Pattern making", "model design", "cutting", "sewing", "ironing", "packaging. Sample", "prototype", "contract manufacturing. Full production package for brands, boutiques, e-commerce."],
      ru: ["Лекала", "дизайн модели", "раскрой", "пошив", "глажка", "упаковка. Образцы", "прототип", "серийное производство для брендов."],
      de: ["Schnittmuster", "Modelldesign", "Zuschnitt", "Nähen", "Bügeln", "Verpackung. Muster", "Prototyp", "Serienproduktion für Marken."]
    },
    price: 'Teklif Al'
  },
  {
    icon: '🛏️',
    color: '#e0f2f1',
    names: { tr: 'EV TEKSTİLİ & DİĞER', en: "Home Textiles", ru: "Шторы и домашний текстиль", de: "Vorhänge & Heimtextilien" },
    descs: {
      tr: ['Nevresim takımı dikimi', 'perde dikimi', 'stor perde', 'tül', 'kırlent', 'yatak örtüsü', 'masa örtüsü. Ölçüye özel ev tekstili. Otel odaları için toplu üretim.'],
      en: ["Bed linen", "curtains", "roller blinds", "tulle", "cushion covers", "tablecloths. Custom home textiles. Bulk production for hotel rooms."],
      ru: ["Постельное белье", "шторы", "подушки", "скатерти. По меркам. Оптовое производство для отелей."],
      de: ["Bettwäsche", "Vorhänge", "Kissen", "Tischdecken. Maßgefertigt. Großproduktion für Hotels."]
    },
    price: '₺500+'
  },
  {
    icon: '🧺',
    color: '#e3f2fd',
    names: { tr: 'KURU TEMİZLEME & ÇAMAŞIR', en: "Dry Cleaning & Laundry", ru: "Химчистка и стирка", de: "Reinigung & Wäsche" },
    descs: {
      tr: ['Kuru temizleme', 'çamaşır yıkama', 'ütü hizmeti. Otelden alım ve teslimat. Turistlere ekspres servis.'],
      en: ["Dry cleaning", "laundry", "ironing. Hotel pickup and delivery. Express service for tourists."],
      ru: ["Химчистка", "стирка", "глажка. Из отеля заберем и доставим."],
      de: ["Reinigung", "Wäsche", "Bügeln. Hotelabholung und -lieferung."]
    },
    price: '₺300+'
  }
];

const REVIEWS = [
  { stars: 5, text: "Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim, nakış kalitesi harika!", author: "Murat B.", flag: "🇹🇷", city: "Antalya", date: "Ocak 2026" },
  { stars: 5, text: "We ordered custom embroidered sweatshirts for our team in June. Excellent quality and price!", author: "David K.", flag: "🇬🇧", city: "Berlin", date: "Şubat 2025" },
  { stars: 5, text: "Amazing tailor in Antalya! Dress altered in 24 hours by mobile car. Perfect fit, very professional!", author: "Sarah W.", flag: "🇬🇧", city: "London", date: "Mayıs 2025" },
  { stars: 5, text: "Отличный портной! Пошили свадебное платье за 3 дня. Говорят по-русски, доставили прямо в отель в Белеке!", author: "Наталья К.", flag: "🇷🇺", city: "Москва", date: "Haziran 2025" },
  { stars: 5, text: "Döviz Kabul Ediliyor. TL, Euro, Dolar, Ruble kabul ediyorlar.", author: "Elif Y.", flag: "🇹🇷", city: "Antalya", date: "Nisan 2025" },
  { stars: 5, text: "Suit altered for a business meeting in 24h. Perfect fit. English speaking – best tailor in Antalya!", author: "James T.", flag: "🇦🇺", city: "Sydney", date: "Mart 2025" },
  { stars: 5, text: "Kuru temizleme ve ütü hizmetleri mükemmeldi. Otelden aldılar, otele teslim ettiler. Çok pratik!", author: "Mehmet A.", flag: "🇹🇷", city: "İstanbul", date: "Temmuz 2025" }
];

const SEO_KEYWORDS = [
  'Antalya Terzi', 'Antalya Terzileri', 'En İyi Terzi Antalya', 'Usta Terzi Antalya', 'kaliteli terzi',
  'Terzi Fiyatları Antalya', 'Terzi Servisi Antalya', 'Araçlı Terzi Antalya', 'özel terzi antalya',
  'Terzi Atölyesi Antalya', 'Dikim Atölyesi Antalya', 'Online Terzi Antalya', 'en iyi terzi',
  'Ölçüye Dikim Antalya', 'Özel Dikim Antalya', 'Hızlı Terzi Antalya', 'Terzi Danışmanlığı Antalya',
  'Ekspres Terzi Antalya', '24 Saat Terzi Antalya', 'Ucuz Terzi Antalya', 'tamir tadilat',
  'Yakın Terzi Nerede', 'Antalya Terzi Nerede', 'Antalya Dikim', 'terzi', 'bana en yakın terzi',
  'En yakın terzi', 'usta terzi', 'tecrübeli terzi', 'güzel terzi', 'Profesyonel Terzi',
  'Paça Kısaltma Antalya', 'Paça Dikimi Antalya', 'Paça Fiyatı Antalya', 'Paça boyu kısaltma', 'Duble Paça yapımı',
  'Pantolon Kısaltma Antalya', 'Pantolon Tadilat Antalya', 'Pantolon Daraltma Antalya', 'Paça',
  'Mont Fermuarı Değişimi', 'Ceket Fermuarı Değişimi', 'Elbise Fermuarı Değişimi', 'fermuar tamiratı',
  'Kot Pantolon Tadilat Antalya', 'Palazzo Pantolon Dikimi', 'Palazzo Kısaltma', 'orjinal paçası',
  'Paça Kısaltma Fiyatı', 'Paça Kısaltma Kaç Lira', 'kot pantolon paçası kısaltmak', 'kot beli daraltma'
];

export default function TerziClient() {
  const [lang, setLang] = useState<Lang>('tr');
  const [activeIlce, setActiveIlce] = useState<string | null>(null);

  const c = C[lang];
  const lI: Record<Lang, number> = { tr: 0, en: 1, ru: 2, de: 3 };
  const idx = lI[lang];

  const malink = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div style={{ fontFamily: '"Outfit", sans-serif', background: '#faf8f4', minHeight: '100vh', color: '#2c2418' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes glowPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
          @keyframes floatScissors { 0%, 100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-8px) rotate(-8deg); } }
          @keyframes drawLine { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
          @keyframes glowGold { 0%, 100% { filter: drop-shadow(0 0 8px rgba(184,149,74,0.3)); } 50% { filter: drop-shadow(0 0 16px rgba(184,149,74,0.7)); } }
          @keyframes shimmerBG { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

          .fu { animation: fadeUp 0.5s ease both; }
          .fu1 { animation: fadeUp 0.55s 0.12s ease both; }
          .fu2 { animation: fadeUp 0.55s 0.20s ease both; }
          .fu3 { animation: fadeUp 0.55s 0.25s ease both; }
          .fu4 { animation: fadeUp 0.55s 0.30s ease both; }

          .svc-card { transition: transform 0.22s, box-shadow 0.22s; cursor: default; }
          .svc-card:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(0,0,0,0.11); }

          .faq-item { border-bottom: 1px solid #e8dcc8; }
          .faq-q { cursor: pointer; padding: 16px 0; display: flex; justify-content: space-between; align-items: center; }
          .faq-a { font-size: 13px; color: #db954a; line-height: 1.75; padding-bottom: 16px; }
          details[open] .faq-arrow { transform: rotate(45deg); }
          .faq-arrow { transition: transform 0.2s; display: inline-block; }

          .ilce-btn { transition: all 0.15s; cursor: pointer; }
          .ilce-btn:hover { transform: scale(1.04); }

          .area-pill { display: inline-block; margin: 2px; padding: 3px 5px; border-radius: 20px; background: rgba(184,149,74,0.08); border: 1px solid rgba(184,149,74,0.18); font-size: 11px; color: #7a5a20; font-weight: 500; }
          .kw-pill { display: inline-block; margin: 2px; padding: 3px 9px; border-radius: 10px; background: rgba(184,149,74,0.03); border: 1px solid rgba(184,149,74,0.08); font-size: 11px; color: rgba(212,175,110,0.55); }

          .sticky-wa { position: fixed; bottom: 0; left: 0; right: 0; padding: 10px 20px; background: linear-gradient(to top, #faf8f4 55%, transparent); z-index: 50; pointer-events: none; }
          .sticky-wa a { pointer-events: all; }

          .mobile-badge { display: inline-flex; align-items: center; gap: 5px; background: linear-gradient(90deg, #ae3946, #c1121f); color: #fff; font-size: 9px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 2px 8px; border-radius: 30px; animation: glowPulse 2s u-ease-out infinite; }

          .step-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; text-align: center; flex: 1; min-width: 0; }

          /* Terzi SVG header decoration */
          .tailor-icon { animation: floatScissors 3s ease-in-out infinite; }
          .tailor-thread { stroke-dasharray: 200; animation: drawLine 2s case forwards 0.3s; }

          /* Hero image area */
          .hero-visual { position: relative; width: 100%; max-width: 280px; margin: 0 auto 20px; }
          .hero-svg-ring { width: 160px; height: 160px; margin: 0 auto; border-radius: 50%; border: 2px solid rgba(184,149,74,0.25); display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(184,149,74,0.05) 0%, transparent 70%); animation: spin 20s linear infinite; }
          .hero-img-ring::before { content: ""; position: absolute; inset: -4px; border-radius: 50%; border: 1px dashed rgba(184,149,74,0.33); animation: spin 20s linear infinite; }
          .hero-img-ring::after { content: ""; position: absolute; inset: -14px; border-radius: 50%; border: 1px dashed rgba(184,149,74,0.08); animation: spin 30s linear infinite reverse; }
          .needle-badge { position: absolute; bottom: 4px; right: 10px; background: #b8954a; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid #1c1814; animation: glowGold 3s infinite; }
        `}</style>

        {/* LANG BAR */}
        <div style={{ background: '#1c1814', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {([['tr', '🇹🇷 TR'], ['en', '🇬🇧 EN'], ['ru', '🇷🇺 RU'], ['de', '🇩🇪 DE']] as const).map(([code, label]) => (
              <button key={code} onClick={() => setLang(code)} style={{
                padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border: '1px solid ' + (lang === code ? '#b8954a' : 'rgba(255,255,255,0.13)'),
                background: lang === code ? '#b8954a' : 'transparent',
                color: lang === code ? '#1c1814' : 'rgba(255,255,255,0.6)',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}>
                {label.split(' ')[1]}
              </button>
            ))}
          </div>
          <a href={malink(c.waMsg)} style={{ fontSize: 11, color: '#25d366', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ animation: 'pulse 2s infinite', fontSize: 20 }}>💬</span> WhatsApp
          </a>
        </div>

        {/* HERO – PROFESYONEL GÖRSEL + İKON */}
        <div style={{ background: 'linear-gradient(165deg, #1c1814 0%, #2a1cdf 45%, #1a1201 100%)', padding: '52px 24px 44px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Arka plan desen ve işleme */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(184,149,74,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(184,149,74,0.06) 0%, transparent 50%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,149,74,0.45), transparent)' }} />

          {/* Terzi SVG İkon - Header Visual */}
          <div className="hero-visual fu">
            <div className="hero-svg-ring">
              {/* Terzi Figürü SVG */}
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="tailor-icon">
                {/* Vücut / Form */}
                <ellipse cx="48" cy="72" rx="20" ry="14" fill="rgba(184,149,74,0.15)" stroke="rgba(184,149,74,0.4)" strokeWidth="1.5" />
                <path d="M48 58V86" stroke="rgba(184,149,74,0.5)" strokeWidth="2" />
                <circle cx="48" cy="28" r="12" fill="rgba(184,149,74,0.12)" stroke="rgba(184,149,74,0.5)" strokeWidth="1.5" strokeDasharray="1.5" />
                {/* Makas */}
                <g transform="translate(60,40) rotate(-30)">
                  <path d="M0 0L-14 32M-14 0L0 32" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
                  <path d="M0 32L14 32" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="7" cy="2.5" r="2.5" fill="#4d4f4e" opacity="0.6" />
                </g>
                {/* İğne İplik */}
                <path d="M28 10 Q32 42 48 50 Q58 58 68 46" stroke="rgba(184,149,74,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="4 2" className="tailor-thread" />
                {/* Mezura */}
                <rect x="22" y="60" width="20" height="5" rx="2.5" fill="rgba(184,149,74,0.2)" stroke="rgba(184,149,74,0.35)" strokeWidth="1" />
                <line x1="25" y1="60" x2="25" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8" />
                <line x1="29" y1="60" x2="29" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8" />
                <line x1="33" y1="60" x2="33" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8" />
                <line x1="37" y1="60" x2="37" y2="65" stroke="rgba(184,149,74,0.4)" strokeWidth="0.8" />
                {/* Düğme */}
                <path d="M30 42 Q32 58 32 72" stroke="rgba(184,149,74,0.25)" strokeWidth="1" fill="none" />
                <path d="M66 42 Q64 58 64 72" stroke="rgba(184,149,74,0.25)" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div className="needle-badge">🪡</div>
          </div>

          <div className="fu1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#db954a', textTransform: 'uppercase', fontSize: 10, letterSpacing: 3, fontWeight: 700 }}>{c.badge}</span>
          </div>

          <h1 className="fu2" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 40, fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: 8, letterSpacing: '-0.5px' }}>
            {c.h1}<br />
            <em style={{ color: '#dd4f6e', fontFamily: 'italic', fontSize: 30 }}>{c.h1Sub}</em>
          </h1>

          <p className="fu3" style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginBottom: 12, letterSpacing: '0.4px', lineHeight: 1.7 }}>{c.sub}</p>

          <div className="fu3" style={{ display: 'flex', justifyContent: 'center', gap: 3, marginBottom: 16, flexWrap: 'wrap' }}>
            {['🇹🇷 Türkçe', '🇬🇧 English', '🇷🇺 Русский', '🇩🇪 Deutsch'].map((l, i) => (
              <span key={i} style={{ fontSize: 10, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(184,149,74,0.18)', background: 'rgba(184,149,74,0.04)', color: '#c9a86e' }}>{l}</span>
            ))}
          </div>

          <div className="fu3" style={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center' }}>
            <span style={{ color: '#d4af37' }}>★★★★★</span>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>4.9</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.33)' }}>(94)</span>
          </div>

          <div className="fu4" style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 340, margin: '0 auto' }}>
            <a href={malink(c.waMsg)} style={{ background: 'linear-gradient(135deg, #25d366, #1ad252)', color: '#fff', borderRadius: 14, padding: '15px 24px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, boxShadow: '0 8px 24px rgba(37,211,102,0.25)' }}>
              <span>💬</span> {c.waBtn}
            </a>
            <a href="#services" style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 24px', fontSize: 13, textDecoration: 'none', textAlign: 'center' }}>
              {c.downBtn}
            </a>
          </div>
        </div>

        {/* SEO METİN BLOĞU */}
        <div style={{ background: '#fff', padding: '26px 20px', borderBottom: '1px solid #ece4d8' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            {[c.seoP1, c.seoP2, c.seoP3, c.seoP4].filter(Boolean).map((p, i) => (
              <p key={i} style={{ fontSize: 12, color: '#7a6d5d', lineHeigh: 1.8, marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: p.replace(/(paça kısaltma|pantolon kısaltma|fermuar değişimi|tadilat|kuru temizleme|çamaşır yıkama|ütü|kalıp çıkarma|model dikimi|seri imalat|fason terzi|tailor|dry cleaning|repaired)/g, '<strong>$1</strong>') }} />
            ))}
          </div>
        </div>

        {/* TERZİ SERVİSİ – ARAÇLI BULUM */}
        <section style={{ padding: '48px 20px', background: 'linear-gradient(135deg, #1c1814 0%, #2a1cdf 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #b8954a, transparent)', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 80%, rgba(184,149,74,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 10 }}>
              <span className="mobile-badge">{c.mobileSvcBadge}</span>
            </div>

            {/* Araç İkonu */}
            <div style={{ margin: '16px auto 20px', width: 80, height: 80, borderRadius: '50%', background: 'rgba(184,149,74,0.12)', border: '1px solid rgba(184,149,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 }}>
              🏎️
            </div>

            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.1 }}>
              {c.mobileSvcTitle}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 24, maxWidth: 480, margin: '0 auto 28px' }}>
              {c.mobileSvcDesc}
            </p>

            {/* Adım Adım */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              {c.mobileSvcSteps.map((step, i) => (
                <div key={i} className="step-card" style={{ minWidth: 120, maxWidth: '140px' }}>
                  <div style={{ fontSize: 20, color: '#b8954a', fontWeight: 700, marginBottom: 4 }}>{i + 1}</div>
                  <div style={{ fontSize: 11, color: '#fff', fontWeight: 700, marginBottom: 4 }}>{step}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>{c.mobileSvcStepLabels[i]}</div>
                </div>
              ))}
            </div>

            <a href={malink(c.mobileSvcCtaMsg)} style={{ background: '#b8954a', color: '#fff', borderRadius: 14, padding: '15px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(184,149,74,0.3)' }}>
              {c.mobileSvcCta}
            </a>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(184,149,74,0.35), transparent)' }} />
        </section>

        {/* HİZMETLER */}
        <section id="services" style={{ padding: '52px 20px', background: '#faf8f4' }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#db954a', marginBottom: 6 }}>{c.s1t}</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 34, fontWeight: 700, color: '#1c1814' }}>{c.s1}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 12, maxWidth: 740, margin: '0 auto' }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.03)', borderRadius: 18, padding: '18px 12px' }}>
                <div style={{ fontSize: 30, marginBottom: 8, textAlign: 'center' }}>{s.icon}</div>
                <h3 style={{ fontSize: 11, fontWeight: 700, marginBottom: 5, color: '#1c1814', lineHeight: 1.3 }}>{s.names[lang]}</h3>
                <p style={{ fontSize: 11, color: '#6b5a4a', lineHeight: 1.5, marginBottom: 8 }}>{s.descs[lang][0]}</p>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#db954a' }}>{s.price}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <a href={malink(c.waMsg)} style={{ background: '#1c1814', color: '#dd4f6e', borderRadius: 12, padding: '13px 28px', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-block', border: '1px solid #1c1814' }}>
              💬 {lang === 'tr' ? 'Fiyat Teklifi Al' : 'Get a Quote'}
            </a>
            <div style={{ height: 10 }} />
            <a href={malink(lang === 'tr' ? 'Merhaba, üniforma üretimi hakkında toplu sipariş fiyatı almak istiyorum.' : 'Bulk Uniform Quote')} style={{ fontSize: 11, color: '#7a6d5d', textDecoration: 'underline' }}>
              📦 {lang === 'tr' ? 'Toplu Üniforma Teklifi' : 'Bulk Uniform Quote'}
            </a>
          </div>
        </section>

        {/* NEDEN BİZ */}
        <section style={{ padding: '52px 20px', background: '#f5ebe0' }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#db954a', marginBottom: 6 }}>{c.s2t}</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 34, fontWeight: 700, color: '#1c1814' }}>{c.s2}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxWidth: 600, margin: '0 auto' }}>
            {([
              ['🏆', lang === 'tr' ? '15+ Yıllık Ustalık' : '15+ Years Mastery', lang === 'tr' ? 'Yılların verdiği tecrübeyle kusursuz dikim.' : 'Flawless tailoring with years of experience.'],
              ['🚗', lang === 'tr' ? 'Adrese Servis' : 'Mobile Service', lang === 'tr' ? 'Antalya genelinde kapınıza gelen mobil araçlı hizmet.' : 'Mobile service coming to your door across Antalya.'],
              ['✨', lang === 'tr' ? 'Kusursuz Fit' : 'Perfect Fit', lang === 'tr' ? 'Tam ölçünüze uygun, rahat ve şık kalıplar.' : 'Comfortable and stylish patterns tailored to your exact measurements.'],
              ['💬', lang === 'tr' ? '4 Dilde Hizmet' : '4 Languages', lang === 'tr' ? 'TR, EN, RU, DE dillerinde engelsiz iletişim.' : 'Seamless communication in TR, EN, RU, DE.']
            ] as const).map(([icon, h, d], i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #ece4d8', borderRadius: 16, padding: '14px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 24, width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1c1814, #2a1cdf)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, color: '#fff' }}>
                  {icon}
                </div>
                <div>
                  <h4 style={{ fontSize: 11, fontWeight: 700, marginBottom: 2, color: '#1c1814' }}>{h}</h4>
                  <div style={{ fontSize: 10, color: '#6b5a4a', lineHeight: 1.45 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* YORUMLAR */}
        <section style={{ padding: '52px 20px', background: '#1c1814' }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#dd4f6e', marginBottom: 6 }}>⭐ 4.9 / 5.0 · 94 Yorum</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 34, fontWeight: 700, color: '#fff' }}>{c.s4}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 600, margin: '0 auto' }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '16px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontSize: 12 }}>{'⭐'.repeat(r.stars)}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)' }}>{r.date}</div>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontFamily: 'italic', marginBottom: 10 }}>"{r.text}"</p>
                <div style={{ fontSize: 11, color: '#dd4f6e', fontWeight: 600 }}>{r.flag} {r.author} — <span style={{ opacity: 0.5 }}>{r.city}</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* FİYAT LİSTESİ – SEO için KRİTİK */}
        <section id="fiyatlar" style={{ padding: '52px 20px', background: '#faf8f4' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#db954a', marginBottom: 6 }}>{lang === 'tr' ? 'Fiyat Listesi' : 'Price List'}</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 700, color: '#1c1814', marginBottom: 8 }}>
              {lang === 'tr' ? 'Terzi Fiyatları 2026' : 'Tailor Prices 2026'}
            </h2>
            <p style={{ fontSize: 12, color: '#7a6d5d' }}>
              {lang === 'tr' ? 'Başlangıç fiyatları. Kesin teklif için WhatsApp\'tan yazın' : 'Starting prices. WhatsApp for exact quote'}
            </p>
          </div>

          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            {SERVICES.map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 10px', background: i % 2 === 0 ? '#fff' : '#f8f4ee', borderRadius: 12, marginBottom: 6, border: '1px solid #e8dcc8' }}>
                <div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#1c1814' }}>{row.names[lang]}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#db954a', minWidth: 60, textAlign: 'right' }}>{row.price}</div>
                <div style={{ fontSize: 10, color: '#7a6d5d', minWidth: 55, textAlign: 'right' }}>{row.time ? row.time[lang] : (lang === 'tr' ? '24 Saat' : '24 Hours')}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <a href={malink(c.waMsg)} style={{ background: '#db954a', color: '#fff', borderRadius: 12, padding: '12px 24px', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
              {lang === 'tr' ? 'Ücretsiz Fiyat Teklifi Al' : 'Get Free Quote'}
            </a>
          </div>
        </section>

        {/* SSS – FAQ */}
        <section style={{ padding: '52px 20px', background: '#fff' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#db954a', marginBottom: 6 }}>FAQ</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 700, color: '#1c1814' }}>{c.s3}</h2>
          </div>

          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            {c.faq.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1c1814', flex: 1, textAlign: 'left', paddingRight: 8 }}>{f.q}</h3>
                  <span className="faq-arrow" style={{ color: '#db954a', fontSize: 20, flexShrink: 0 }}>+</span>
                </summary>
                <div className="faq-a" dangerouslySetInnerHTML={{ __html: f.a }} />
              </details>
            ))}
          </div>
        </section>

        {/* HİZMET BÖLGELERİ */}
        <section style={{ padding: '52px 20px', background: '#f0ebe0' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#db954a', marginBottom: 6 }}>{c.s5}</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 700, color: '#1c1814', marginBottom: 6 }}>
              {lang === 'tr' ? 'Antalya - Tüm İlçeler' : 'Antalya - All Districts'}
            </h2>
            <p style={{ fontSize: 12, color: '#7a6d5d' }}>
              {lang === 'tr' ? 'İlçeye tıklayarak mahalleleri görün' : 'Tap a district to see neighborhoods'}
            </p>
          </div>

          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              {ANTALYA_ILCELER.map((item) => (
                <button key={item.ilce} className={`ilce-btn ${activeIlce === item.ilce ? 'active-ilce' : ''}`} onClick={() => setActiveIlce(activeIlce === item.ilce ? null : item.ilce)} style={{
                  padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: '1px solid ' + (activeIlce === item.ilce ? '#db954a' : 'rgba(184,149,74,0.22)'),
                  background: activeIlce === item.ilce ? '#db954a' : 'rgba(184,149,74,0.03)',
                  color: activeIlce === item.ilce ? '#fff' : '#7a5a20',
                  fontFamily: 'inherit',
                }}>
                  {item.ilce}
                </button>
              ))}
            </div>

            {activeIlce && (
              <div style={{ background: '#fff', borderRadius: 16, padding: '16px 14px', border: '1px solid #e8dcc8', marginTop: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#b8954a', marginBottom: 10 }}>{activeIlce} {lang === 'tr' ? 'Mahalleleri' : 'Neighborhoods'}</div>
                <div>
                  {ANTALYA_ILCELER.find(i => i.ilce === activeIlce)?.mahalleler.map((m) => (
                    <span key={m} className="area-pill">{m}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SEO gizli tam mahalle listesi */}
          <div style={{ fontSize: 0, height: 0, overflow: 'hidden', position: 'absolute', opacity: 0 }} aria-hidden="true">
            {ANTALYA_ILCELER.flatMap(i => i.mahalleler).map((m) => (
              <span key={m}>{m} terzi tadilat dikim kuru temizleme paça kısaltma büyük beden perde nevresim bebek kıyafeti</span>
            ))}
          </div>
        </section>

        {/* İLETİŞİM */}
        <section id="contact" style={{ padding: '52px 20px', background: '#faf8f4' }}>
          <div style={{ background: '#fff', border: '1px solid #e8dcc8', borderRadius: 24, padding: '28px 20px', textAlign: 'center', maxWidth: 460, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#db954a', marginBottom: 6 }}>{c.s6}</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{c.s6t}</h2>
            <p style={{ fontSize: 12, color: '#7a6d5d', marginBottom: 22 }}>{c.s6sub}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={malink(c.waMsg)} style={{ background: 'linear-gradient(135deg, #25d366, #1ad252)', color: '#fff', borderRadius: 14, padding: '15px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span>💬</span> {c.walabel}
              </a>

              <a href={`https://maps.google.com/?q=Terzi+Can+Belek+Antalya`} target="_blank" rel="noreferrer" style={{ color: '#2c2418', border: '1px solid #e0d5c8', borderRadius: 14, padding: '13px', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#fff' }}>
                <span>📍</span> {c.maplabel}
              </a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 18, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 12, color: '#7a6d5d' }}>🕒 09:00-19:00</div>
              <div style={{ fontSize: 12, color: '#7a6d5d' }}>📍 Antalya, Türkiye</div>
              <div style={{ fontSize: 12, color: '#7a6d5d' }}>📞 +90 531 898 64 18</div>
            </div>
          </div>
        </section>

        {/* SEO FOOTER – KATEGORİLİ */}
        <footer style={{ background: '#1c1814', padding: '36px 20px 88px', borderTop: '1px solid rgba(184,149,74,0.12)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 18, color: '#fff', marginBottom: 12 }}>
              Terzi Can | Tailor Can | Портной Кан | Schneider Can — Antalya
            </p>

            {/* Keyword grupları */}
            {([
              { label: '🧵 Tadilat & Tamir', words: ['Paça Kısaltma', 'Pantolon Kısaltma', 'Paça Dikimi', 'Etek Kısaltma', 'Kol Kısaltma', 'Bel Alma', 'Daraltma', 'Beden Küçültme', 'Elbise Daraltma', 'Fermuar Değişimi', 'Yırtık Onarımı', 'Astar Değişimi', 'Mont Fermuarı Değişimi', 'Ceket Daraltma', 'Gömlek Daraltma', 'Blazer Dikimi', 'Smoking Dikimi', 'Elbise Dikimi', 'Bluz Dikimi', 'Etek Dikimi'] },
              { label: '👶 Çocuk & Bebek', words: ['Çocuk Kıyafeti Dikimi', 'Bebek Elbisesi Dikimi', 'Çocuk Kostümü', 'Anne Grubu Dikimi', 'Okul Kıyafeti Dikimi', 'Büyük Beden Terzi', 'Beden Seti Çıkarma'] },
              { label: '👰 Gelinlik & Özel Gün', words: ['Gelinlik Dikimi Antalya', 'Gelinlik Tadilatı', 'Damatlık Dikimi', 'Abiye Dikimi', 'Gece Elbisesi', 'Düğün Kıyafeti', 'Nişan Elbisesi Dikimi'] },
              { label: '🧺 Ev Tekstili & Temizlik', words: ['Nevresim Dikimi', 'Nevresim Takımı Dikimi', 'Perde Dikimi', 'Stor Perde', 'Tül Dikimi', 'Kırlent Dikimi', 'Yatak Örtüsü', 'Masa Örtüsü', 'Ev Tekstili Dikimi'] },
              { label: '🧼 Kuru Temizleme & Çamaşır', words: ['Kuru Temizleme Antalya', 'Çamaşır Yıkama Antalya', 'Ütü Hizmeti', 'Otele Çamaşır Servisi', 'Kıyafet Temizleme', 'Hotel Laundry Antalya', 'Dry Cleaning Antalya', 'Ironing Service Antalya'] },
              { label: '🏨 Seri İmalat & Fason', words: ['Kalıp Çıkarma', 'Model Dikimi', 'Prototip Dikimi', 'Numune Dikimi', 'Seri İmalat Antalya', 'Fason İmalat Antalya', 'Konfeksiyon Üretimi', 'Toptan Dikim', 'Tekstil Üretimi'] },
              { label: '🧥 Üniforma - Otel & Turizm', words: ['Otel Üniforma Dikimi', 'Otel Forması', 'Resepsiyon Üniforması', 'Kat Görevlisi Üniforması', 'Meydancı Üniforması', 'Kapıcı Üniforması', 'Güvenlik Üniforması', 'Spa Üniforması', 'Animator Uniforması'] },
              { label: '👨‍🍳 Üniforma - Restoran & Mutfak', words: ['Aşçı Üniforması Antalya', 'Şef Kıyafeti', 'Aşçı Önlüğü', 'Garson Üniforması', 'Barista Üniforması', 'Komi Üniforması', 'Pastane Uniforması', 'Mutfak Önlüğü', 'Restoran Uniforması'] },
              { label: '🩺 Üniforma - Sağlık & Endüstri', words: ['Doktor Üniforma Dikimi', 'Okul Forması', 'Futbol Forması Dikimi', 'Voleybol Forması', 'Basketbol Forması', 'Spor Takımı Üniforması', 'Spor Kulübü Kıyafeti'] },
              { label: '🪡 Nakış & Baskı', words: ['Nakış Antalya', 'Logo Nakışı', 'İsim Nakışı', 'Forma Nakışı', 'Sweatshirt Nakışı', 'Dijital Baskı', 'Transfer Baskı', 'Serigrafi', 'Tekstil Baskı'] },
              { label: '👕 Sweatshirt & Eşofman', words: ['Sweatshirt Dikimi Antalya', 'Eşofman Dikimi', 'Kapüşonlu Sweatshirt', 'Baskılı Sweatshirt', 'Nakışlı Sweatshirt', 'Seri Sweatshirt Üretimi', 'Spor Kıyafet Dikimi'] },
              { label: '💰 Fiyat & Kaç Lira', words: ['Paça Kısaltma Kaç Lira', 'Paça Kısaltma Fiyatı 2026', 'Fermuar Değişimi Kaç Lira', 'Mont Fermuarı Kaç Lira', 'Kot Fermuarı Kaç Lira', 'Ceket Daraltma Fiyatı'] },
              { label: '📍 Konum & Yakınlık', words: ['Yakınımda Terzi', 'En Yakın Terzi Antalya', 'Terzi Nerede Antalya', 'Eve Gelen Terzi Antalya', 'Otele Gelen Terzi Antalya', 'Adrese Teslim Terzi', 'Terzi Randevu Antalya'] },
              { label: '☀️ Sezonluk Aramalar', words: ['Mezuniyet Abiye Tamiri', 'Mezuniyet Abiye Kısaltma', 'Düğün Sezonu Gelinlik Tadilatı', 'Gelinlik Kısaltma', 'Kış Sezonu Mont Fermuarı', 'Yaz Sezonu Elbise Dikimi'] },
              { label: '❓ Soru Tipi & Nasıl Yapılır', words: ['Paça Kısaltma Nasıl Yapılır', 'Fermuar Nasıl Değiştirilir', 'Elbise Nasıl Daraltırılır', 'Pantolon Nasıl Kısaltılır', 'Terzi Nereye Gidilir', 'Terzi Randevusu Antalya'] },
              { label: '🇬🇧 English Keywords', words: ['Tailor Antalya', 'Alterations Antalya', 'Hemming Antalya', 'Zip Repair', 'Dress Repair', 'Skirt Shortening', 'Evening Gown Repair', 'Sweatshirt Sewing', 'Tracksuit Production', 'Embroidery Antalya'] },
              { label: '🇷🇺 Russian Keywords', words: ['Портной Анталья', 'Ателье Анталья', 'Подгонка брюк', 'Замена молнии', 'Ремонт платья', 'Пошив толстовок', 'Гостиничная форма', 'Форма повара', 'Форма официанта', 'Медицинская форма', 'Вкопанный портной'] },
              { label: '🇩🇪 German Keywords', words: ['Schneider Antalya', 'Änderungsschneiderei', 'Hose kürzen', 'Reißverschluss Reparatur', 'Kleid reparieren', 'Sweatshirt nähen', 'Stickerei Antalya', 'Uniformproduktion', 'Hoteluniform', 'Kochuniform'] }
            ] as const).map((group) => (
              <div key={group.label} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, fontStyle: 'uppercase', letterSpacing: 1.5, color: 'rgba(184,149,74,0.45)', marginBottom: 5 }}>{group.label}</div>
                <div>{group.words.map((kw) => <span key={kw} className="kw-pill">{kw}</span>)}</div>
              </div>
            ))}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 20, paddingTop: 16, textAlign: 'center' }}>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>
                Antalya Terzi · Paça Kısaltma · Fermuar Değişimi · Tadilat · Tamir · Daraltma · Beden Küçültme · Büyük Beden · Erkek Terzi · Bayan Terzi · Çocuk Kıyafeti · Bebek Elbisesi · Nevresim · Perde · Gelinlik · Damatlık · Abiye Dikimi · Üniforma Üretimi · Nakış Hizmeti
              </p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.1)', marginTop: 4 }}>
                © 2026 Antalya Terzi - Terzi Can. Tüm Hakları Saklıdır.
              </p>
            </div>
          </div>
        </footer>

        {/* STICKY CTA */}
        <div className="sticky-wa">
          <a href={malink(c.waMsg)} style={{ background: 'linear-gradient(135deg, #25d366, #1ad252)', color: '#fff', borderRadius: 14, padding: '14px', fontSize: 14, fontWeight: 700, width: '100%', maxWidth: 480, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 32px rgba(37,211,102,0.35)', pointerEvents: 'all', textDecoration: 'none' }}>
            <span>💬</span> {c.walabel}
          </a>
        </div>

      </div>
    </>
  );
}
