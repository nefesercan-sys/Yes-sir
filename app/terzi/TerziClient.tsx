'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
type Lang = 'tr' | 'en' | 'de' | 'ru';

// ─── Translation map ─────────────────────────────────────────────────────────
const T = {
  tr: {
    nav_services: 'Hizmetler',
    nav_prices: 'Fiyatlar',
    nav_gallery: 'Galeri',
    nav_faq: 'SSS',
    nav_contact: 'İletişim',
    hero_badge: '✦ Antalya\'nın Ustası',
    hero_h1a: 'Terzi Can',
    hero_h1b: 'Antalya',
    hero_sub: 'Paça kısaltma · Tadilat · Dikim · Kuru Temizleme · Üniforma\nKonyaaltı ve tüm Antalya ilçelerine ekspres kurye servisi',
    hero_cta: 'Hemen Ara',
    hero_cta2: 'WhatsApp\'a Yaz',
    hero_stat1: '10+', hero_stat1l: 'Yıllık Deneyim',
    hero_stat2: '5000+', hero_stat2l: 'Mutlu Müşteri',
    hero_stat3: '24–48h', hero_stat3l: 'Ekspres Teslimat',
    hero_stat4: '4 Dil', hero_stat4l: 'TR · EN · DE · RU',
    services_title: 'Hizmetlerimiz',
    services_sub: 'Her kıyafete, her bedene, her ihtiyaca özel profesyonel terzilik',
    s1_title: 'Tadilat & Tamir',
    s1_desc: 'Paça kısaltma, elbise daraltma / genişletme, fermuar değişimi, kol kısaltma, etek düzeltme, düğme dikimi, yırtık onarımı. Kot\'tan gelinliğe her kumaş.',
    s1_items: ['Paça kısaltma', 'Fermuar değişimi', 'Elbise daraltma', 'Kol kısaltma', 'Etek kısaltma', 'Yırtık onarımı'],
    s2_title: 'Özel Dikim',
    s2_desc: 'Ölçüye özel takım elbise, elbise, gömlek, bluz, abiye ve gelinlik dikimi. Kendi kumaşınızla ya da bizim seçkin stoğumuzdan.',
    s2_items: ['Takım elbise', 'Gelinlik', 'Abiye', 'Gömlek', 'Çocuk kıyafeti', 'Büyük beden'],
    s3_title: 'Üniforma & Fason',
    s3_desc: 'Otel, restoran, hastane, okul ve şirketlere toplu üniforma üretimi. Logo nakışı, seri imalat, prototip ve numune dikimi.',
    s3_items: ['Otel personeli', 'Aşçı & garson', 'Sağlık personeli', 'Okul forması', 'Güvenlik', 'Logo nakışı'],
    s4_title: 'Kuru Temizleme & Çamaşır',
    s4_desc: 'Profesyonel kuru temizleme, çamaşır yıkama ve ütü hizmeti. Otel ve adreslerden kurye ile alım. 24 saatte teslim.',
    s4_items: ['Kuru temizleme', 'Çamaşır yıkama', 'Ütü hizmeti', 'Adrese teslim', 'Otel servisi', 'Ekspres'],
    how_title: 'Nasıl Çalışır?',
    how_sub: 'Evden çıkmadan profesyonel terzi hizmeti',
    h1t: 'Bizi Arayın', h1d: 'WhatsApp veya telefon ile ihtiyacınızı bildirin.',
    h2t: 'Kurye Gelir', h2d: 'Adresinizden veya otelinizden kıyafetinizi alıyoruz.',
    h3t: 'İşlem Yapılır', h3d: '24–48 saat içinde profesyonel terzi işlemi tamamlanır.',
    h4t: 'Teslim Edilir', h4d: 'Kıyafetiniz kapınıza ya da otelinize teslim edilir.',
    price_title: 'Fiyat Listesi 2026',
    price_sub: 'Güncel ve şeffaf fiyatlar — gizli ücret yok',
    price_note: '* Fiyatlar kumaş türü, model karmaşıklığı ve adet sayısına göre değişebilir. Kesin fiyat için WhatsApp\'tan fotoğraf gönderin.',
    price_cta: 'Fiyat Al (WhatsApp)',
    p_item: 'Hizmet', p_price: 'Başlangıç Fiyatı',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_sub: 'Merak ettikleriniz',
    zones_title: 'Hizmet Bölgelerimiz',
    zones_sub: 'Konyaaltı\'ndan Alanya\'ya, tüm Antalya\'ya kurye ile hizmet',
    contact_title: 'İletişim',
    contact_sub: 'Anında yanıt için WhatsApp tercih edin',
    contact_phone: 'Telefon',
    contact_wa: 'WhatsApp',
    contact_hours: 'Çalışma Saatleri',
    contact_hours_val: 'Pzt – Cmt: 08:00 – 20:00',
    contact_area: 'Hizmet Bölgesi',
    contact_area_val: 'Tüm Antalya İlçeleri',
    footer: '© 2026 Terzi Can Antalya — SwapHubs | Tüm hakları saklıdır.',
  },
  en: {
    nav_services: 'Services',
    nav_prices: 'Prices',
    nav_gallery: 'Gallery',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',
    hero_badge: '✦ Antalya\'s Master Tailor',
    hero_h1a: 'Tailor Can',
    hero_h1b: 'Antalya',
    hero_sub: 'Hemming · Alterations · Custom Sewing · Dry Cleaning · Uniforms\nExpress courier pickup & delivery across all Antalya districts',
    hero_cta: 'Call Now',
    hero_cta2: 'WhatsApp',
    hero_stat1: '10+', hero_stat1l: 'Years Experience',
    hero_stat2: '5000+', hero_stat2l: 'Happy Clients',
    hero_stat3: '24–48h', hero_stat3l: 'Express Delivery',
    hero_stat4: '4 Lang', hero_stat4l: 'TR · EN · DE · RU',
    services_title: 'Our Services',
    services_sub: 'Professional tailoring for every garment, every size, every need',
    s1_title: 'Alterations & Repairs',
    s1_desc: 'Trouser hemming, dress taking in/letting out, zip replacement, sleeve shortening, skirt adjustments, button sewing, tear repairs. All fabrics from denim to bridal.',
    s1_items: ['Trouser hemming', 'Zip replacement', 'Taking in dress', 'Sleeve shortening', 'Skirt shortening', 'Tear repair'],
    s2_title: 'Custom Tailoring',
    s2_desc: 'Bespoke suits, dresses, shirts, blouses, evening gowns and wedding dresses made to your exact measurements. Your fabric or ours.',
    s2_items: ['Bespoke suit', 'Wedding dress', 'Evening gown', 'Shirt', 'Children\'s wear', 'Plus size'],
    s3_title: 'Uniforms & Manufacturing',
    s3_desc: 'Bulk uniform production for hotels, restaurants, hospitals, schools and corporates. Logo embroidery, mass production, prototypes.',
    s3_items: ['Hotel staff', 'Chef & waiter', 'Medical staff', 'School uniform', 'Security', 'Logo embroidery'],
    s4_title: 'Dry Cleaning & Laundry',
    s4_desc: 'Professional dry cleaning, laundry and ironing. Courier pickup from hotels and addresses. 24-hour express turnaround.',
    s4_items: ['Dry cleaning', 'Laundry', 'Ironing', 'Door to door', 'Hotel service', 'Express'],
    how_title: 'How It Works',
    how_sub: 'Professional tailor service without leaving your hotel',
    h1t: 'Contact Us', h1d: 'WhatsApp or call to describe your need.',
    h2t: 'We Pick Up', h2d: 'Courier collects from your address or hotel.',
    h3t: 'We Tailor', h3d: 'Work completed professionally in 24–48 hours.',
    h4t: 'We Deliver', h4d: 'Garment returned to your door or hotel.',
    price_title: 'Price List 2026',
    price_sub: 'Transparent, up-to-date pricing — no hidden fees',
    price_note: '* Prices may vary by fabric, complexity and quantity. Send a photo on WhatsApp for an exact quote.',
    price_cta: 'Get a Quote (WhatsApp)',
    p_item: 'Service', p_price: 'Starting Price',
    faq_title: 'Frequently Asked Questions',
    faq_sub: 'Everything you need to know',
    zones_title: 'Service Areas',
    zones_sub: 'From Konyaaltı to Alanya — courier service across all Antalya',
    contact_title: 'Contact',
    contact_sub: 'For instant reply, prefer WhatsApp',
    contact_phone: 'Phone',
    contact_wa: 'WhatsApp',
    contact_hours: 'Working Hours',
    contact_hours_val: 'Mon – Sat: 08:00 – 20:00',
    contact_area: 'Service Area',
    contact_area_val: 'All Antalya Districts',
    footer: '© 2026 Tailor Can Antalya — SwapHubs | All rights reserved.',
  },
  de: {
    nav_services: 'Leistungen',
    nav_prices: 'Preise',
    nav_gallery: 'Galerie',
    nav_faq: 'FAQ',
    nav_contact: 'Kontakt',
    hero_badge: '✦ Antalyas Meisterschneider',
    hero_h1a: 'Schneider Can',
    hero_h1b: 'Antalya',
    hero_sub: 'Kürzen · Ändern · Maßanfertigung · Reinigung · Uniformen\nKurierservice in ganz Antalya',
    hero_cta: 'Jetzt Anrufen',
    hero_cta2: 'WhatsApp',
    hero_stat1: '10+', hero_stat1l: 'Jahre Erfahrung',
    hero_stat2: '5000+', hero_stat2l: 'Zufriedene Kunden',
    hero_stat3: '24–48h', hero_stat3l: 'Express-Lieferung',
    hero_stat4: '4 Spr.', hero_stat4l: 'TR · EN · DE · RU',
    services_title: 'Unsere Leistungen',
    services_sub: 'Professionelle Schneiderei für jedes Kleidungsstück und jede Größe',
    s1_title: 'Änderungen & Reparaturen',
    s1_desc: 'Hose kürzen, Kleid enger/weiter machen, Reißverschluss wechseln, Ärmel kürzen, Rocksaum. Alle Stoffe von Jeans bis Brautkleid.',
    s1_items: ['Hose kürzen', 'Reißverschluss', 'Kleid ändern', 'Ärmel kürzen', 'Rocksaum', 'Reparatur'],
    s2_title: 'Maßanfertigung',
    s2_desc: 'Maßgeschneiderte Anzüge, Kleider, Hemden, Blusen, Abendkleider und Brautkleider nach Ihren exakten Maßen.',
    s2_items: ['Maßanzug', 'Brautkleid', 'Abendkleid', 'Hemd', 'Kinderkleidung', 'Übergrößen'],
    s3_title: 'Uniformen & Produktion',
    s3_desc: 'Uniformproduktion für Hotels, Restaurants, Krankenhäuser und Schulen. Logo-Stickerei, Serienproduktion, Muster.',
    s3_items: ['Hotelpersonal', 'Koch & Kellner', 'Medizinpersonal', 'Schuluniform', 'Sicherheit', 'Stickerei'],
    s4_title: 'Reinigung & Wäsche',
    s4_desc: 'Professionelle chemische Reinigung, Wäsche und Bügelservice. Abholung im Hotel. Express in 24 Stunden.',
    s4_items: ['Chemische Reinigung', 'Wäsche', 'Bügeln', 'Lieferung', 'Hotelservice', 'Express'],
    how_title: 'So Funktioniert Es',
    how_sub: 'Professioneller Schneiderservice ohne Ihr Hotel zu verlassen',
    h1t: 'Kontakt', h1d: 'WhatsApp oder Anruf — Ihren Bedarf beschreiben.',
    h2t: 'Abholung', h2d: 'Kurier holt bei Ihrer Adresse oder Hotel ab.',
    h3t: 'Bearbeitung', h3d: 'Arbeit in 24–48 Stunden professionell erledigt.',
    h4t: 'Lieferung', h4d: 'Kleidung an Ihre Tür oder Hotel zurückgeliefert.',
    price_title: 'Preisliste 2026',
    price_sub: 'Transparente, aktuelle Preise — keine versteckten Gebühren',
    price_note: '* Preise können je nach Stoff, Komplexität und Menge variieren. Foto per WhatsApp für ein genaues Angebot.',
    price_cta: 'Angebot (WhatsApp)',
    p_item: 'Leistung', p_price: 'Ab Preis',
    faq_title: 'Häufige Fragen',
    faq_sub: 'Alles, was Sie wissen müssen',
    zones_title: 'Servicebereiche',
    zones_sub: 'Von Konyaaltı bis Alanya — Kurier in ganz Antalya',
    contact_title: 'Kontakt',
    contact_sub: 'Für sofortige Antwort WhatsApp bevorzugen',
    contact_phone: 'Telefon',
    contact_wa: 'WhatsApp',
    contact_hours: 'Öffnungszeiten',
    contact_hours_val: 'Mo – Sa: 08:00 – 20:00',
    contact_area: 'Servicebereich',
    contact_area_val: 'Alle Antalya Bezirke',
    footer: '© 2026 Schneider Can Antalya — SwapHubs | Alle Rechte vorbehalten.',
  },
  ru: {
    nav_services: 'Услуги',
    nav_prices: 'Цены',
    nav_gallery: 'Галерея',
    nav_faq: 'FAQ',
    nav_contact: 'Контакты',
    hero_badge: '✦ Мастер-Портной Анталья',
    hero_h1a: 'Портной Кан',
    hero_h1b: 'Анталья',
    hero_sub: 'Подгонка · Ремонт · Пошив · Химчистка · Форма\nКурьерская доставка по всей Анталье',
    hero_cta: 'Позвонить',
    hero_cta2: 'WhatsApp',
    hero_stat1: '10+', hero_stat1l: 'Лет опыта',
    hero_stat2: '5000+', hero_stat2l: 'Клиентов',
    hero_stat3: '24–48h', hero_stat3l: 'Экспресс',
    hero_stat4: '4 яз.', hero_stat4l: 'TR · EN · DE · RU',
    services_title: 'Наши Услуги',
    services_sub: 'Профессиональный пошив для любой одежды и любого размера',
    s1_title: 'Подгонка и Ремонт',
    s1_desc: 'Укорочение брюк, ушивание / расширение платьев, замена молнии, укорочение рукавов, подгон юбки. Любые ткани.',
    s1_items: ['Укорочение брюк', 'Замена молнии', 'Ушить платье', 'Рукав', 'Юбка', 'Ремонт разрыва'],
    s2_title: 'Пошив на Заказ',
    s2_desc: 'Костюмы, платья, рубашки, блузки, вечерние и свадебные платья по вашим меркам. Ваша ткань или наш выбор.',
    s2_items: ['Костюм', 'Свадебное платье', 'Вечернее платье', 'Рубашка', 'Детская одежда', 'Большие размеры'],
    s3_title: 'Форма и Производство',
    s3_desc: 'Массовый пошив формы для отелей, ресторанов, больниц и школ. Вышивка логотипа, серийное производство.',
    s3_items: ['Персонал отеля', 'Повар & официант', 'Медицинский', 'Школьная форма', 'Охрана', 'Вышивка'],
    s4_title: 'Химчистка и Стирка',
    s4_desc: 'Профессиональная химчистка, стирка и глажка. Курьер заберёт из отеля или с адреса. Экспресс за 24 часа.',
    s4_items: ['Химчистка', 'Стирка', 'Глажка', 'Доставка', 'Услуга отеля', 'Экспресс'],
    how_title: 'Как Это Работает',
    how_sub: 'Профессиональный портной, не выходя из отеля',
    h1t: 'Свяжитесь', h1d: 'WhatsApp или звонок — опишите ваш запрос.',
    h2t: 'Заберём', h2d: 'Курьер заберёт из вашего отеля или по адресу.',
    h3t: 'Выполним', h3d: 'Работа выполнена профессионально за 24–48 часов.',
    h4t: 'Доставим', h4d: 'Одежда возвращена к вашей двери или в отель.',
    price_title: 'Прайс-лист 2026',
    price_sub: 'Прозрачные цены — никаких скрытых платежей',
    price_note: '* Цены могут варьироваться в зависимости от ткани и сложности. Отправьте фото в WhatsApp для точного расчёта.',
    price_cta: 'Получить цену (WhatsApp)',
    p_item: 'Услуга', p_price: 'Цена от',
    faq_title: 'Часто Задаваемые Вопросы',
    faq_sub: 'Всё, что вам нужно знать',
    zones_title: 'Зоны Обслуживания',
    zones_sub: 'От Коньяалты до Алании — курьер по всей Анталье',
    contact_title: 'Контакты',
    contact_sub: 'Для быстрого ответа используйте WhatsApp',
    contact_phone: 'Телефон',
    contact_wa: 'WhatsApp',
    contact_hours: 'Часы работы',
    contact_hours_val: 'Пн – Сб: 08:00 – 20:00',
    contact_area: 'Зона обслуживания',
    contact_area_val: 'Все районы Антальи',
    footer: '© 2026 Портной Кан Анталья — SwapHubs | Все права защищены.',
  },
};

// ─── Price data ───────────────────────────────────────────────────────────────
const PRICES = {
  tr: [
    ['Paça / etek kısaltma', '150 ₺'],
    ['Fermuar değişimi (pantolon/elbise)', '200 ₺'],
    ['Fermuar değişimi (mont/ceket)', '300 ₺'],
    ['Elbise / bluz daraltma', '250 ₺'],
    ['Kol kısaltma (ceket)', '200 ₺'],
    ['Pantolon bel alma', '150 ₺'],
    ['Yırtık onarımı', '100 ₺'],
    ['Gelinlik tadilat', '500 ₺'],
    ['Abiye tadilat', '350 ₺'],
    ['Takım elbise dikimi', '2500 ₺'],
    ['Özel elbise dikimi', '1500 ₺'],
    ['Kuru temizleme (elbise)', '300 ₺'],
    ['Kuru temizleme (kaban/mont)', '500 ₺'],
    ['Çamaşır yıkama & ütü (kg)', '80 ₺/kg'],
  ],
  en: [
    ['Trouser / skirt hemming', '€8'],
    ['Zip replacement (trousers/dress)', '€10'],
    ['Zip replacement (jacket/coat)', '€15'],
    ['Dress / blouse taking in', '€13'],
    ['Sleeve shortening (jacket)', '€10'],
    ['Trouser waistband adjustment', '€8'],
    ['Tear repair', '€5'],
    ['Wedding dress alterations', '€25+'],
    ['Evening gown alteration', '€18'],
    ['Bespoke suit tailoring', '€130'],
    ['Custom dress tailoring', '€80'],
    ['Dry cleaning (dress)', '€15'],
    ['Dry cleaning (coat)', '€25'],
    ['Laundry & ironing (per kg)', '€4/kg'],
  ],
  de: [
    ['Hose / Rock kürzen', 'ab 8 €'],
    ['Reißverschluss (Hose/Kleid)', 'ab 10 €'],
    ['Reißverschluss (Jacke/Mantel)', 'ab 15 €'],
    ['Kleid / Bluse enger machen', 'ab 13 €'],
    ['Ärmel kürzen (Jacke)', 'ab 10 €'],
    ['Hosenbund anpassen', 'ab 8 €'],
    ['Reparatur Riss', 'ab 5 €'],
    ['Brautkleid ändern', 'ab 25 €'],
    ['Abendkleid ändern', 'ab 18 €'],
    ['Maßanzug', 'ab 130 €'],
    ['Maßkleid', 'ab 80 €'],
    ['Chemische Reinigung (Kleid)', 'ab 15 €'],
    ['Chemische Reinigung (Mantel)', 'ab 25 €'],
    ['Wäsche & Bügeln (je kg)', '4 €/kg'],
  ],
  ru: [
    ['Укорочение брюк / юбки', 'от 150 ₺'],
    ['Замена молнии (брюки/платье)', 'от 200 ₺'],
    ['Замена молнии (куртка/пальто)', 'от 300 ₺'],
    ['Ушить платье / блузку', 'от 250 ₺'],
    ['Укорочение рукавов (пиджак)', 'от 200 ₺'],
    ['Подгон пояса брюк', 'от 150 ₺'],
    ['Ремонт разрыва', 'от 100 ₺'],
    ['Подгонка свадебного платья', 'от 500 ₺'],
    ['Подгонка вечернего платья', 'от 350 ₺'],
    ['Пошив костюма на заказ', 'от 2500 ₺'],
    ['Пошив платья на заказ', 'от 1500 ₺'],
    ['Химчистка (платье)', 'от 300 ₺'],
    ['Химчистка (пальто)', 'от 500 ₺'],
    ['Стирка и глажка (кг)', '80 ₺/кг'],
  ],
};

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = {
  tr: [
    ['Otelden kıyafet alıp getiriyor musunuz?', 'Evet. Antalya\'daki tüm otellere kurye servisi veriyoruz. WhatsApp\'a otelinizin adını ve oda numaranızı yazmanız yeterli.'],
    ['Paça kısaltma kaç günde hazır?', 'Standart işlemler 24–48 saat içinde tamamlanır. Acil durumlarda aynı gün teslimat da mümkündür.'],
    ['Gelinlik tadilat yapıyor musunuz?', 'Evet, gelinlik kısaltma, bel alma, omuz düzeltme ve aksesuar değişimi dahil her türlü gelinlik tadilatı yapıyoruz.'],
    ['Fiyatları nasıl öğrenebilirim?', 'Kıyafetinizin fotoğrafını WhatsApp\'a gönderin, 30 dakika içinde fiyat bildiriyoruz.'],
    ['Büyük beden kıyafet dikiyor musunuz?', 'Evet, her bedene özel dikim yapıyoruz. Kalıp çıkarma da dahildir.'],
    ['Hangi dillerde hizmet veriyorsunuz?', 'Türkçe, İngilizce, Almanca ve Rusça hizmet veriyoruz.'],
  ],
  en: [
    ['Do you pick up from hotels?', 'Yes. We offer courier service to all hotels in Antalya. Just send us your hotel name and room number via WhatsApp.'],
    ['How long do alterations take?', 'Standard work is completed in 24–48 hours. Same-day service is available for urgent needs.'],
    ['Do you do wedding dress alterations?', 'Yes — hemming, taking in, shoulder adjustments, and accessory changes for all bridal wear.'],
    ['How do I get a price?', 'Send a photo of your garment on WhatsApp and we reply with a quote within 30 minutes.'],
    ['Do you make plus-size clothing?', 'Yes, we make custom pieces for all sizes including custom pattern making.'],
    ['What languages do you speak?', 'Turkish, English, German and Russian.'],
  ],
  de: [
    ['Holen Sie aus dem Hotel ab?', 'Ja. Wir bieten Kurierservice für alle Hotels in Antalya. Einfach Hotelname und Zimmernummer per WhatsApp senden.'],
    ['Wie lange dauern Änderungen?', 'Standardarbeiten in 24–48 Stunden. Express am selben Tag auf Anfrage.'],
    ['Machen Sie Brautkleid-Änderungen?', 'Ja — kürzen, enger machen, Schulteranpassung und Zubehörwechsel.'],
    ['Wie bekomme ich einen Preis?', 'Schicken Sie ein Foto per WhatsApp — Antwort in 30 Minuten.'],
    ['Nähen Sie Übergrössen?', 'Ja, wir fertigen Kleidung in allen Größen an, inkl. individuellem Schnittmuster.'],
    ['Welche Sprachen sprechen Sie?', 'Türkisch, Englisch, Deutsch und Russisch.'],
  ],
  ru: [
    ['Забираете из отеля?', 'Да. Курьер работает по всем отелям Антальи. Просто напишите название отеля и номер комнаты в WhatsApp.'],
    ['Сколько времени занимает подгонка?', 'Стандартные работы — 24–48 часов. Срочный заказ — в тот же день.'],
    ['Занимаетесь свадебными платьями?', 'Да — укорочение, ушивание, плечи, замена аксессуаров.'],
    ['Как узнать цену?', 'Пришлите фото одежды в WhatsApp — ответим с ценой за 30 минут.'],
    ['Шьёте для больших размеров?', 'Да, шьём на заказ любых размеров, включая построение выкройки.'],
    ['На каких языках говорите?', 'Турецкий, английский, немецкий и русский.'],
  ],
};

// ─── Service zones ────────────────────────────────────────────────────────────
const ZONES = [
  'Konyaaltı', 'Lara', 'Muratpaşa', 'Kepez', 'Döşemealtı',
  'Aksu', 'Serik', 'Belek', 'Kemer', 'Alanya', 'Manavgat',
  'Side', 'Kaleiçi', 'Kundu', 'Güzeloba', 'Varsak',
  'Uncalı', 'Hurma', 'Meltem', 'Altıntaş',
];

// ─── Real images from Unsplash ────────────────────────────────────────────────
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85&auto=format&fit=crop',
  alteration: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&q=80&auto=format&fit=crop',
  custom: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?w=800&q=80&auto=format&fit=crop',
  uniform: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80&auto=format&fit=crop',
  cleaning: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80&auto=format&fit=crop',
  gallery1: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=700&q=80&auto=format&fit=crop',
  gallery2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop',
  gallery3: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&q=80&auto=format&fit=crop',
  gallery4: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=700&q=80&auto=format&fit=crop',
  gallery5: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=700&q=80&auto=format&fit=crop',
  gallery6: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=700&q=80&auto=format&fit=crop',
};

const PHONE = '+90 531 898 64 18';
const WA_LINK = 'https://wa.me/905318986418';

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TerziClient() {
  const [lang, setLang] = useState<Lang>('tr');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const t = T[lang];

  // Detect browser language on mount
  useEffect(() => {
    const bl = navigator.language?.toLowerCase() ?? '';
    if (bl.startsWith('de')) setLang('de');
    else if (bl.startsWith('ru')) setLang('ru');
    else if (bl.startsWith('en')) setLang('en');
    else setLang('tr');
  }, []);

  // Scroll for navbar
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Intersection observer for section animations
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(e.target.id));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const isVis = (id: string) => visibleSections.has(id);

  const services = [
    { img: IMAGES.alteration, icon: '✂️', title: t.s1_title, desc: t.s1_desc, items: t.s1_items, color: '#c9a96e' },
    { img: IMAGES.custom, icon: '👗', title: t.s2_title, desc: t.s2_desc, items: t.s2_items, color: '#8b6f47' },
    { img: IMAGES.uniform, icon: '🏨', title: t.s3_title, desc: t.s3_desc, items: t.s3_items, color: '#6b8c6e' },
    { img: IMAGES.cleaning, icon: '🧺', title: t.s4_title, desc: t.s4_desc, items: t.s4_items, color: '#6e7fa3' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Jost:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #c9a96e;
          --gold-light: #e8d5a3;
          --gold-dark: #8b6f47;
          --ink: #0d0c0a;
          --ink2: #1a1814;
          --ink3: #252320;
          --cream: #f5f0e8;
          --cream2: #ede7d9;
          --muted: #7a7268;
          --white: #fafaf8;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'Jost', system-ui, sans-serif;
          --radius: 4px;
          --transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        html { scroll-behavior: smooth; }
        body { background: var(--ink); color: var(--cream); font-family: var(--sans); font-weight: 300; line-height: 1.7; overflow-x: hidden; }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--ink); }
        ::-webkit-scrollbar-thumb { background: var(--gold-dark); border-radius: 2px; }

        /* ── Navbar ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 1.2rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s ease;
        }
        .navbar.scrolled {
          background: rgba(13,12,10,0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(201,169,110,0.15);
          padding: 0.8rem 2rem;
        }
        .nav-logo { font-family: var(--serif); font-size: 1.4rem; color: var(--gold); letter-spacing: 0.05em; text-decoration: none; }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { color: var(--cream2); text-decoration: none; font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; transition: color 0.3s; font-weight: 400; }
        .nav-links a:hover { color: var(--gold); }
        .lang-switcher { display: flex; gap: 0.5rem; }
        .lang-btn {
          background: none; border: 1px solid rgba(201,169,110,0.3); color: var(--muted);
          font-size: 0.75rem; padding: 0.3rem 0.6rem; cursor: pointer; font-family: var(--sans);
          text-transform: uppercase; letter-spacing: 0.08em; transition: all 0.3s; border-radius: 2px;
        }
        .lang-btn.active, .lang-btn:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,169,110,0.08); }

        /* ── Hero ── */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 8rem 2rem 4rem;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0; z-index: 0;
          background-image: url('${IMAGES.hero}');
          background-size: cover; background-position: center 30%;
          filter: brightness(0.22) saturate(0.6);
        }
        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(160deg, rgba(13,12,10,0.4) 0%, rgba(13,12,10,0.85) 60%, var(--ink) 100%);
        }
        .hero-grain {
          position: absolute; inset: 0; z-index: 2; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 150px;
        }
        .hero-content { position: relative; z-index: 3; max-width: 820px; }
        .hero-badge {
          display: inline-block; font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--gold); border: 1px solid rgba(201,169,110,0.35); padding: 0.4rem 1.2rem;
          margin-bottom: 2rem; font-family: var(--sans); font-weight: 400;
          animation: fadeInUp 0.8s ease both;
        }
        .hero h1 {
          font-family: var(--serif); font-size: clamp(3.5rem, 8vw, 7rem); line-height: 1.0;
          font-weight: 900; letter-spacing: -0.02em;
          animation: fadeInUp 0.9s 0.1s ease both;
        }
        .hero h1 .accent { color: var(--gold); font-style: italic; }
        .hero-sub {
          margin-top: 1.8rem; font-size: 1rem; color: var(--cream2); max-width: 540px;
          white-space: pre-line; line-height: 1.9; letter-spacing: 0.03em;
          animation: fadeInUp 1s 0.2s ease both;
        }
        .hero-actions {
          margin-top: 3rem; display: flex; gap: 1rem; flex-wrap: wrap;
          animation: fadeInUp 1s 0.3s ease both;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--gold); color: var(--ink); padding: 1rem 2.2rem;
          font-family: var(--sans); font-size: 0.85rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
          border: none; cursor: pointer; transition: all 0.3s;
        }
        .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: var(--cream); padding: 1rem 2.2rem;
          font-family: var(--sans); font-size: 0.85rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
          border: 1px solid rgba(245,240,232,0.35); cursor: pointer; transition: all 0.3s;
        }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }
        .hero-stats {
          position: relative; z-index: 3; margin-top: 5rem;
          display: grid; grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(201,169,110,0.15);
          padding-top: 2.5rem; gap: 0;
          animation: fadeInUp 1s 0.4s ease both;
        }
        .stat { padding: 0 2rem 0 0; border-right: 1px solid rgba(201,169,110,0.1); }
        .stat:last-child { border-right: none; }
        .stat-num { font-family: var(--serif); font-size: 2.2rem; color: var(--gold); font-weight: 700; line-height: 1; }
        .stat-label { font-size: 0.75rem; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; margin-top: 0.4rem; }

        /* ── Section commons ── */
        section { padding: 6rem 2rem; }
        .container { max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-eyebrow { font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); font-weight: 500; margin-bottom: 1rem; }
        .section-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; line-height: 1.15; }
        .section-sub { color: var(--muted); margin-top: 1rem; font-size: 1rem; max-width: 560px; margin-left: auto; margin-right: auto; }
        .gold-line { display: block; width: 48px; height: 2px; background: var(--gold); margin: 1.5rem auto 0; }

        /* ── Animate-in ── */
        [data-animate] { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        [data-animate].in { opacity: 1; transform: translateY(0); }
        [data-animate].in-delay-1 { transition-delay: 0.1s; }
        [data-animate].in-delay-2 { transition-delay: 0.2s; }
        [data-animate].in-delay-3 { transition-delay: 0.3s; }

        /* ── Services ── */
        #services { background: var(--ink2); }
        .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
        .service-card {
          position: relative; overflow: hidden; cursor: default;
          min-height: 420px; display: flex; flex-direction: column; justify-content: flex-end;
        }
        .service-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; transition: transform 0.7s var(--transition);
          filter: brightness(0.35) saturate(0.5);
        }
        .service-card:hover .service-img { transform: scale(1.06); filter: brightness(0.28) saturate(0.4); }
        .service-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,12,10,0.97) 0%, rgba(13,12,10,0.4) 60%, transparent 100%); }
        .service-content { position: relative; z-index: 2; padding: 2.5rem; }
        .service-icon { font-size: 2rem; margin-bottom: 1rem; display: block; }
        .service-title { font-family: var(--serif); font-size: 1.6rem; font-weight: 700; color: var(--white); margin-bottom: 0.8rem; }
        .service-desc { font-size: 0.88rem; color: var(--cream2); line-height: 1.75; margin-bottom: 1.2rem; }
        .service-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .service-tag {
          font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid rgba(201,169,110,0.35); color: var(--gold);
          padding: 0.25rem 0.7rem; border-radius: 2px;
        }
        .service-line { position: absolute; bottom: 0; left: 2.5rem; right: 2.5rem; height: 2px; background: linear-gradient(to right, var(--gold), transparent); transform: scaleX(0); transform-origin: left; transition: transform 0.5s ease; }
        .service-card:hover .service-line { transform: scaleX(1); }

        /* ── How it works ── */
        #how { background: var(--ink); }
        .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
        .steps::before { content: ''; position: absolute; top: 2rem; left: 12.5%; right: 12.5%; height: 1px; background: linear-gradient(to right, transparent, var(--gold-dark), transparent); }
        .step { text-align: center; padding: 0 1.5rem; }
        .step-num {
          width: 4rem; height: 4rem; border-radius: 50%;
          border: 1px solid var(--gold-dark); display: flex; align-items: center; justify-content: center;
          font-family: var(--serif); font-size: 1.2rem; color: var(--gold);
          margin: 0 auto 1.5rem; background: var(--ink); position: relative; z-index: 1;
        }
        .step-title { font-family: var(--serif); font-size: 1.1rem; font-weight: 700; margin-bottom: 0.6rem; }
        .step-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }

        /* ── Gallery ── */
        #gallery { background: var(--ink3); padding: 0; }
        .gallery-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 300px 300px;
          gap: 2px;
        }
        .gallery-item { overflow: hidden; position: relative; }
        .gallery-item:first-child { grid-row: 1 / 3; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease, filter 0.4s ease; filter: saturate(0.7) brightness(0.85); }
        .gallery-item:hover img { transform: scale(1.06); filter: saturate(1) brightness(1); }
        .gallery-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 1rem 1.2rem; background: linear-gradient(to top, rgba(13,12,10,0.85), transparent);
          font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold);
          opacity: 0; transition: opacity 0.4s;
        }
        .gallery-item:hover .gallery-caption { opacity: 1; }

        /* ── Prices ── */
        #prices { background: var(--ink2); }
        .price-table { width: 100%; border-collapse: collapse; margin-top: 2rem; }
        .price-table th { text-align: left; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); border-bottom: 1px solid rgba(201,169,110,0.25); padding: 0.8rem 1rem; font-weight: 500; }
        .price-table td { padding: 1rem 1rem; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.04); color: var(--cream2); }
        .price-table tr:nth-child(even) td { background: rgba(201,169,110,0.03); }
        .price-table tr:hover td { background: rgba(201,169,110,0.07); }
        .price-amount { color: var(--gold); font-weight: 500; text-align: right; white-space: nowrap; }
        .price-note { font-size: 0.8rem; color: var(--muted); margin-top: 1.5rem; padding: 1rem; border-left: 2px solid var(--gold-dark); background: rgba(201,169,110,0.04); line-height: 1.7; }
        .price-cta-wrap { text-align: center; margin-top: 2.5rem; }

        /* ── Zones ── */
        #zones { background: var(--ink); }
        .zones-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; margin-top: 2rem; }
        .zone-chip {
          border: 1px solid rgba(201,169,110,0.2); padding: 0.4rem 1rem;
          font-size: 0.8rem; letter-spacing: 0.08em; color: var(--cream2);
          transition: all 0.3s; border-radius: 2px;
        }
        .zone-chip:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,169,110,0.06); }

        /* ── FAQ ── */
        #faq { background: var(--ink2); }
        .faq-list { max-width: 760px; margin: 0 auto; }
        .faq-item { border-bottom: 1px solid rgba(201,169,110,0.1); overflow: hidden; }
        .faq-q {
          width: 100%; background: none; border: none; padding: 1.4rem 0;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          cursor: pointer; text-align: left; font-family: var(--sans); font-size: 1rem;
          color: var(--white); font-weight: 400; transition: color 0.3s;
        }
        .faq-q:hover { color: var(--gold); }
        .faq-icon { flex-shrink: 0; width: 24px; height: 24px; border: 1px solid rgba(201,169,110,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: var(--gold); transition: transform 0.4s; }
        .faq-icon.open { transform: rotate(45deg); }
        .faq-a { max-height: 0; overflow: hidden; transition: max-height 0.45s ease, padding 0.3s; font-size: 0.9rem; color: var(--muted); line-height: 1.8; }
        .faq-a.open { max-height: 200px; padding-bottom: 1.4rem; }

        /* ── Contact ── */
        #contact { background: var(--ink3); }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .contact-info-title { font-family: var(--serif); font-size: 2.5rem; font-weight: 700; line-height: 1.2; margin-bottom: 2rem; }
        .contact-info-title .italic { font-style: italic; color: var(--gold); }
        .contact-row { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(201,169,110,0.08); }
        .contact-icon { font-size: 1.2rem; padding-top: 0.1rem; }
        .contact-label { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); font-weight: 500; margin-bottom: 0.3rem; }
        .contact-value { font-size: 1rem; color: var(--cream); }
        .contact-value a { color: var(--cream); text-decoration: none; transition: color 0.3s; }
        .contact-value a:hover { color: var(--gold); }
        .contact-ctas { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
        .contact-map-placeholder {
          background: var(--ink2); border: 1px solid rgba(201,169,110,0.15);
          border-radius: var(--radius); height: 380px; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 1rem; color: var(--muted);
        }
        .map-pin { font-size: 3rem; }
        .map-text { font-family: var(--serif); font-size: 1.2rem; color: var(--cream2); }
        .map-sub { font-size: 0.85rem; text-align: center; max-width: 220px; line-height: 1.6; }

        /* ── Footer ── */
        footer {
          background: var(--ink); border-top: 1px solid rgba(201,169,110,0.1);
          padding: 2rem; text-align: center; font-size: 0.78rem;
          color: var(--muted); letter-spacing: 0.08em;
        }

        /* ── Animations ── */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Floating WA button ── */
        .wa-float {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 99;
          width: 3.5rem; height: 3.5rem; border-radius: 50%;
          background: #25D366; display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; text-decoration: none; box-shadow: 0 4px 20px rgba(37,211,102,0.4);
          transition: transform 0.3s, box-shadow 0.3s;
          animation: fadeInUp 1s 1s ease both;
        }
        .wa-float:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,211,102,0.55); }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hero h1 { font-size: 3rem; }
          .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
          .services-grid { grid-template-columns: 1fr; }
          .steps { grid-template-columns: repeat(2, 1fr); gap: 3rem; }
          .steps::before { display: none; }
          .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
          .gallery-item:first-child { grid-row: auto; grid-column: 1 / -1; height: 250px; }
          .gallery-item { height: 180px; }
          .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
          section { padding: 4rem 1.2rem; }
          .lang-switcher { flex-wrap: wrap; }
        }
      `}</style>

      {/* ── Floating WhatsApp ── */}
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp">💬</a>

      {/* ── Navbar ── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo">Terzi Can</a>
        <ul className="nav-links">
          <li><a href="#services">{t.nav_services}</a></li>
          <li><a href="#prices">{t.nav_prices}</a></li>
          <li><a href="#gallery">{t.nav_gallery}</a></li>
          <li><a href="#faq">{t.nav_faq}</a></li>
          <li><a href="#contact">{t.nav_contact}</a></li>
        </ul>
        <div className="lang-switcher">
          {(['tr','en','de','ru'] as Lang[]).map((l) => (
            <button key={l} className={`lang-btn${lang === l ? ' active' : ''}`} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-grain" />
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">{t.hero_badge}</span>
            <h1>
              <span className="accent">{t.hero_h1a}</span><br />
              {t.hero_h1b}
            </h1>
            <p className="hero-sub">{t.hero_sub}</p>
            <div className="hero-actions">
              <a href={`tel:${PHONE.replace(/\s/g,'')}`} className="btn-primary">📞 {t.hero_cta}</a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline">💬 {t.hero_cta2}</a>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="stat-num">{t.hero_stat1}</div><div className="stat-label">{t.hero_stat1l}</div></div>
            <div className="stat"><div className="stat-num">{t.hero_stat2}</div><div className="stat-label">{t.hero_stat2l}</div></div>
            <div className="stat"><div className="stat-num">{t.hero_stat3}</div><div className="stat-label">{t.hero_stat3l}</div></div>
            <div className="stat"><div className="stat-num">{t.hero_stat4}</div><div className="stat-label">{t.hero_stat4l}</div></div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services">
        <div className="container">
          <div
            id="services-header"
            data-animate
            className={`section-header${isVis('services-header') ? ' in' : ''}`}
          >
            <div className="section-eyebrow">✦ {lang === 'tr' ? 'Ne Yapıyoruz' : lang === 'en' ? 'What We Do' : lang === 'de' ? 'Was Wir Tun' : 'Что Мы Делаем'}</div>
            <h2 className="section-title">{t.services_title}</h2>
            <p className="section-sub">{t.services_sub}</p>
            <span className="gold-line" />
          </div>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <img src={s.img} alt={s.title} className="service-img" loading="lazy" />
              <div className="service-overlay" />
              <div className="service-content">
                <span className="service-icon">{s.icon}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-tags">
                  {s.items.map((item, j) => <span key={j} className="service-tag">{item}</span>)}
                </div>
              </div>
              <div className="service-line" />
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how">
        <div className="container">
          <div
            id="how-header"
            data-animate
            className={`section-header${isVis('how-header') ? ' in' : ''}`}
          >
            <div className="section-eyebrow">✦ {lang === 'tr' ? 'Süreç' : 'Process'}</div>
            <h2 className="section-title">{t.how_title}</h2>
            <p className="section-sub">{t.how_sub}</p>
            <span className="gold-line" />
          </div>
          <div
            id="steps"
            data-animate
            className={`steps${isVis('steps') ? ' in' : ''}`}
          >
            {[
              { n: '01', title: t.h1t, desc: t.h1d },
              { n: '02', title: t.h2t, desc: t.h2d },
              { n: '03', title: t.h3t, desc: t.h3d },
              { n: '04', title: t.h4t, desc: t.h4d },
            ].map((step, i) => (
              <div key={i} className="step">
                <div className="step-num">{step.n}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery">
        <div className="gallery-grid">
          {[
            { img: IMAGES.gallery1, label: lang === 'tr' ? 'Özel Dikim' : 'Custom Sewing' },
            { img: IMAGES.gallery2, label: lang === 'tr' ? 'Tadilat' : 'Alterations' },
            { img: IMAGES.gallery3, label: lang === 'tr' ? 'Gelinlik' : 'Bridal' },
            { img: IMAGES.gallery4, label: lang === 'tr' ? 'Kumaş' : 'Fabric' },
            { img: IMAGES.gallery5, label: lang === 'tr' ? 'Üniforma' : 'Uniform' },
            { img: IMAGES.gallery6, label: lang === 'tr' ? 'Kuru Temizleme' : 'Dry Cleaning' },
          ].map((g, i) => (
            <div key={i} className="gallery-item">
              <img src={g.img} alt={g.label} loading="lazy" />
              <div className="gallery-caption">{g.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Prices ── */}
      <section id="prices">
        <div className="container">
          <div
            id="prices-header"
            data-animate
            className={`section-header${isVis('prices-header') ? ' in' : ''}`}
          >
            <div className="section-eyebrow">✦ {lang === 'tr' ? 'Şeffaf Fiyatlar' : lang === 'ru' ? 'Прозрачные Цены' : 'Transparent Pricing'}</div>
            <h2 className="section-title">{t.price_title}</h2>
            <p className="section-sub">{t.price_sub}</p>
            <span className="gold-line" />
          </div>
          <div
            id="price-table-wrap"
            data-animate
            className={isVis('price-table-wrap') ? 'in' : ''}
          >
            <table className="price-table">
              <thead>
                <tr>
                  <th>{t.p_item}</th>
                  <th style={{ textAlign: 'right' }}>{t.p_price}</th>
                </tr>
              </thead>
              <tbody>
                {(PRICES[lang] as string[][]).map(([item, price], i) => (
                  <tr key={i}>
                    <td>{item}</td>
                    <td className="price-amount">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="price-note">{t.price_note}</p>
            <div className="price-cta-wrap">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 {t.price_cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Zones ── */}
      <section id="zones">
        <div className="container">
          <div
            id="zones-header"
            data-animate
            className={`section-header${isVis('zones-header') ? ' in' : ''}`}
          >
            <div className="section-eyebrow">✦ {lang === 'tr' ? 'Kapsama Alanı' : 'Coverage'}</div>
            <h2 className="section-title">{t.zones_title}</h2>
            <p className="section-sub">{t.zones_sub}</p>
            <span className="gold-line" />
          </div>
          <div
            id="zones-grid"
            data-animate
            className={`zones-grid${isVis('zones-grid') ? ' in' : ''}`}
          >
            {ZONES.map((z) => <span key={z} className="zone-chip">{z}</span>)}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq">
        <div className="container">
          <div
            id="faq-header"
            data-animate
            className={`section-header${isVis('faq-header') ? ' in' : ''}`}
          >
            <div className="section-eyebrow">✦ FAQ</div>
            <h2 className="section-title">{t.faq_title}</h2>
            <p className="section-sub">{t.faq_sub}</p>
            <span className="gold-line" />
          </div>
          <div
            id="faq-list"
            data-animate
            className={`faq-list${isVis('faq-list') ? ' in' : ''}`}
          >
            {(FAQS[lang] as string[][]).map(([q, a], i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{q}</span>
                  <span className={`faq-icon${openFaq === i ? ' open' : ''}`}>+</span>
                </button>
                <div className={`faq-a${openFaq === i ? ' open' : ''}`}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="section-eyebrow" style={{ textAlign: 'left', marginBottom: '0.8rem' }}>✦ {t.contact_title}</div>
              <h2 className="contact-info-title">
                {lang === 'tr' ? <><span className="italic">Hızlı</span><br />İletişim</> :
                 lang === 'en' ? <><span className="italic">Quick</span><br />Contact</> :
                 lang === 'de' ? <><span className="italic">Schneller</span><br />Kontakt</> :
                 <><span className="italic">Быстрый</span><br />Контакт</>}
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>{t.contact_sub}</p>

              <div className="contact-row">
                <span className="contact-icon">📞</span>
                <div>
                  <div className="contact-label">{t.contact_phone}</div>
                  <div className="contact-value"><a href={`tel:${PHONE.replace(/\s/g,'')}`}>{PHONE}</a></div>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon">💬</span>
                <div>
                  <div className="contact-label">{t.contact_wa}</div>
                  <div className="contact-value"><a href={WA_LINK} target="_blank" rel="noopener noreferrer">{PHONE}</a></div>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon">🕐</span>
                <div>
                  <div className="contact-label">{t.contact_hours}</div>
                  <div className="contact-value">{t.contact_hours_val}</div>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon">📍</span>
                <div>
                  <div className="contact-label">{t.contact_area}</div>
                  <div className="contact-value">{t.contact_area_val}</div>
                </div>
              </div>

              <div className="contact-ctas">
                <a href={`tel:${PHONE.replace(/\s/g,'')}`} className="btn-primary">📞 {t.hero_cta}</a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline">💬 WhatsApp</a>
              </div>
            </div>

            <div>
              <div className="contact-map-placeholder">
                <div className="map-pin">📍</div>
                <div className="map-text">Konyaaltı, Antalya</div>
                <p className="map-sub" style={{ color: 'var(--muted)' }}>
                  {lang === 'tr' ? 'Tüm Antalya ilçelerine kurye ile hizmet veriyoruz.' :
                   lang === 'en' ? 'We serve all Antalya districts via courier.' :
                   lang === 'de' ? 'Kurierservice in alle Antalya Bezirke.' :
                   'Курьер по всем районам Антальи.'}
                </p>
                <a
                  href="https://maps.google.com/?q=Konyaaltı,Antalya,Turkey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}
                >
                  {lang === 'tr' ? 'Google Maps\'te Aç' : 'Open in Google Maps'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div style={{ marginBottom: '0.5rem', color: 'var(--gold)', fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>Terzi Can</div>
        {t.footer}
        <div style={{ marginTop: '0.8rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Antalya Terzi', 'Tailor Antalya', 'Schneider Antalya', 'Портной Анталья'].map((kw) => (
            <span key={kw} style={{ fontSize: '0.7rem', color: 'rgba(201,169,110,0.3)', letterSpacing: '0.08em' }}>{kw}</span>
          ))}
        </div>
      </footer>

      {/* ── IntersectionObserver trigger helper ── */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          var els = document.querySelectorAll('[data-animate]');
          var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('in'); });
          }, { threshold: 0.12 });
          els.forEach(function(el) { obs.observe(el); });
        });
      `}} />
    </>
  );
}
