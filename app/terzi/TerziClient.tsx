'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Lang = 'tr' | 'en' | 'ru' | 'de';
const PHONE = '905318986418';
const WA = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

const HERO_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&auto=format&fit=crop', alt: 'Haute couture kumaş — Terzi Can Antalya' },
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1800&q=90&auto=format&fit=crop', alt: 'Moda elbise dikimi — Terzi Can Antalya' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1800&q=90&auto=format&fit=crop', alt: 'Lüks moda kıyafet — Terzi Can Antalya' },
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1800&q=90&auto=format&fit=crop', alt: 'Haute couture moda modeli — Terzi Can Antalya' },
];

const FILM_STRIP = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80&auto=format&fit=crop',
];

const SERVICES = [
  { icon: '✂️', id: 'tadilat',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
    alt: 'Paça kısaltma fermuar değişimi bel daraltma tadilat Antalya — Terzi Can',
    tr: { n: 'Tamir & Tadilat', d: 'Paça kısaltma · pantolon kısaltma · bel daraltma · elbise daraltma · kol kısaltma · fermuar değişimi · yırtık onarımı · düğme dikimi', p: '₺120+' },
    en: { n: 'Repairs & Alterations', d: 'Trouser hemming · waist taking in · dress alterations · sleeve shortening · zip replacement · tear repair', p: '₺120+' },
    ru: { n: 'Ремонт и переделка', d: 'Подгонка брюк · заужение талии · заужение платья · замена молнии · ремонт разрывов', p: '₺120+' },
    de: { n: 'Reparaturen & Änderungen', d: 'Hose kürzen · Bund einengen · Kleid einengen · Ärmel kürzen · Reißverschluss', p: '₺120+' } },
  { icon: '👔', id: 'bay-terzi',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=85&auto=format&fit=crop',
    alt: 'Bay terzi erkek takım elbise özel dikim Antalya — Terzi Can',
    tr: { n: 'Bay Terzi', d: 'Erkek takım elbise dikimi · pantolon kısaltma · gömlek dikimi · ceket tadilatı · blazer · smoking · damatlık', p: '₺150+' },
    en: { n: "Men's Tailor", d: 'Bespoke suits · trouser hemming · shirt making · jacket alterations · blazer · tuxedo · groom suit', p: '₺150+' },
    ru: { n: 'Мужской портной', d: 'Пошив костюмов · подгонка брюк · рубашки · пиджаки · смокинг · костюм жениха', p: '₺150+' },
    de: { n: 'Herrenschneider', d: 'Maßanzüge · Hosenänderungen · Hemden · Jacken · Blazer · Smoking · Bräutigamanzug', p: '₺150+' } },
  { icon: '👗', id: 'bayan-terzi',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85&auto=format&fit=crop',
    alt: 'Bayan terzi kadın elbise dikimi özel dikim Antalya — Terzi Can',
    tr: { n: 'Bayan Terzi', d: 'Kadın elbise dikimi · bluz · etek kısaltma · elbise daraltma · bel daraltma · abiye tamiri · gelinlik tadilatı · büyük beden', p: '₺200+' },
    en: { n: "Women's Tailor", d: 'Dress making · blouse · skirt shortening · dress taking in · evening gown repair · wedding dress · plus size', p: '₺200+' },
    ru: { n: 'Женский портной', d: 'Платья · блузки · юбки · заужение · вечерние платья · свадебные платья · большие размеры', p: '₺200+' },
    de: { n: 'Damenschneiderin', d: 'Kleider · Blusen · Röcke kürzen · Kleid einengen · Abendkleider · Brautkleid · Übergrößen', p: '₺200+' } },
  { icon: '💍', id: 'gelinlik',
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85&auto=format&fit=crop',
    alt: 'Gelinlik abiye özel gün kıyafeti dikimi Antalya — Terzi Can',
    tr: { n: 'Gelinlik · Abiye · Özel Gün', d: 'Gelinlik dikimi · gelinlik tadilatı · damatlık · abiye dikimi · abiye tamiri · nişan elbisesi · kına kıyafeti', p: '₺500+' },
    en: { n: 'Wedding · Evening · Special', d: 'Wedding dress · bridal alterations · groom suit · evening gown · engagement dress. Perfect fit guaranteed.', p: '₺500+' },
    ru: { n: 'Свадьба · Вечер · Торжество', d: 'Свадебное платье · подгонка · смокинг · вечернее платье · платье на помолвку.', p: '₺500+' },
    de: { n: 'Hochzeit · Abend · Anlass', d: 'Brautkleid · Anpassung · Smoking · Abendkleid · Verlobungskleid. Perfekte Passform.', p: '₺500+' } },
  { icon: '🏨', id: 'uniforma',
    img: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=800&q=85&auto=format&fit=crop',
    alt: 'Otel üniforma aşçı garson personel dikimi Antalya — Terzi Can',
    tr: { n: 'Üniforma Üretimi', d: 'Otel · resepsiyon · aşçı · garson · güvenlik · spa · animatör · okul · spor takımı. Tasarım + seri imalat + nakış.', p: 'Teklif Al' },
    en: { n: 'Uniform Production', d: 'Hotel · reception · chef · waiter · security · spa · school · sports. Design + mass production + embroidery.', p: 'Get Quote' },
    ru: { n: 'Производство формы', d: 'Гостиницы · повара · официанты · охрана · спа · школа. Дизайн + производство + вышивка.', p: 'Запрос' },
    de: { n: 'Uniformproduktion', d: 'Hotelpersonal · Köche · Kellner · Sicherheit · Spa · Schule. Design + Produktion + Stickerei.', p: 'Angebot' } },
  { icon: '🏭', id: 'atolye',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=85&auto=format&fit=crop',
    alt: 'Dikiş atölyesi tişört sweatshirt pantolon seri imalat Antalya — Terzi Can',
    tr: { n: 'Tekstil İmalatı · Seri Üretim', d: 'Tişört · sweatshirt · pantolon · gömlek · mont · şort · gobi seri üretimi. Kalıp çıkarma · fason · numune · prototip.', p: 'Teklif Al' },
    en: { n: 'Textile Manufacturing', d: 'T-shirt · sweatshirt · trousers · shirt · coat · shorts · gobi mass production. Pattern · sample · prototype.', p: 'Get Quote' },
    ru: { n: 'Производство текстиля', d: 'Футболки · худи · брюки · рубашки · куртки серийно. Лекала · образцы · прототип.', p: 'Запрос' },
    de: { n: 'Textilproduktion', d: 'T-Shirts · Sweatshirts · Hosen · Hemden · Mäntel Serienproduktion. Schnittmuster · Muster · Prototyp.', p: 'Angebot' } },
  { icon: '🪡', id: 'nakis',
    img: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&q=85&auto=format&fit=crop',
    alt: 'Nakış logo baskı tişört sweatshirt dikimi Antalya — Terzi Can',
    tr: { n: 'Nakış · Baskı · Özel Dikim', d: 'Logo nakışı · isim nakışı · dijital baskı · serigrafi. Sweatshirt · tişört · eşofman · kapüşonlu · polo · gobi seri dikimi.', p: '₺100+' },
    en: { n: 'Embroidery · Print · Custom', d: 'Logo embroidery · digital print · screen print. Sweatshirt · t-shirt · tracksuit · hoodie · polo production.', p: '₺100+' },
    ru: { n: 'Вышивка · Печать · Пошив', d: 'Вышивка логотипа · цифровая печать. Толстовки · футболки · спортивные костюмы · поло.', p: '₺100+' },
    de: { n: 'Stickerei · Druck · Produktion', d: 'Logo-Stickerei · Digitaldruck. Sweatshirts · T-Shirts · Trainingsanzüge · Polo-Produktion.', p: '₺100+' } },
  { icon: '🧺', id: 'kuru-temizleme',
    img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=85&auto=format&fit=crop',
    alt: 'Kuru temizleme ütü çamaşır hizmeti otel Antalya — Terzi Can',
    tr: { n: 'Kuru Temizleme & Ütü', d: 'Kuru temizleme · çamaşır yıkama · ütü. Otel ve adreslerden kurye alım. 24 saat ekspres. Turistler için.', p: '₺80+/kg' },
    en: { n: 'Dry Cleaning & Laundry', d: 'Dry cleaning · laundry · ironing. Hotel courier pickup. 24h express. For tourists.', p: '₺80+/kg' },
    ru: { n: 'Химчистка · Стирка', d: 'Химчистка · стирка · глажка. Курьер из отеля. Экспресс 24ч.', p: '₺80+/кг' },
    de: { n: 'Reinigung · Wäsche', d: 'Chemische Reinigung · Wäsche · Bügeln. Kurierabholung im Hotel. 24h Express.', p: '₺80+/kg' } },
];

const WHY = [
  { icon: '⚡', tr:['24–48 Saat','Ekspres teslimat garantisi'], en:['24–48h Express','Guaranteed express delivery'], ru:['24–48 часов','Гарантированная экспресс-доставка'], de:['24–48h Express','Garantierte Expresslieferung'] },
  { icon: '📍', tr:['Yerinde Ölçü','Adresinize gelip ölçü alıyoruz'], en:['On-Site Fitting','We come to your address'], ru:['Замеры на месте','Приедем по адресу'], de:['Maß vor Ort','Wir kommen zu Ihnen'] },
  { icon: '🚗', tr:['Araçlı Servis','Eve ve otele gelen terzi'], en:['Mobile Tailor','We come to you'], ru:['Выездной портной','Приедем к вам'], de:['Mobiler Schneider','Kommen zu Ihnen'] },
  { icon: '🌍', tr:['4 Dil','TR · EN · RU · DE'], en:['4 Languages','TR · EN · RU · DE'], ru:['4 языка','TR · EN · RU · DE'], de:['4 Sprachen','TR · EN · RU · DE'] },
  { icon: '🏨', tr:['Otele Teslimat','Tüm Antalya otellerine'], en:['Hotel Delivery','All Antalya hotels'], ru:['Доставка в отель','Все отели Антальи'], de:['Hotel Lieferung','Alle Antalya-Hotels'] },
  { icon: '👔', tr:['Bay & Bayan','Erkek ve kadın kıyafeti uzman ekip'], en:['Men & Women','Specialist team for both'], ru:['Мужской & Женский','Специалисты для обоих'], de:['Herren & Damen','Spezialisiert für beide'] },
  { icon: '🏭', tr:['Tekstil İmalatı','Tişört, sweatshirt, pantolon, gobi seri üretim'], en:['Textile Manufacturing','T-shirt, sweatshirt, trousers mass production'], ru:['Производство','Серийное производство текстиля'], de:['Textilproduktion','Serienproduktion'] },
  { icon: '⭐', tr:['4.9 · 94 Yorum',"Google'da en yüksek puanlı"], en:['4.9 · 94 Reviews','Highest rated in Antalya'], ru:['4.9 · 94 клиента','Лучший рейтинг в Анталье'], de:['4,9 · 94 Bewertungen','Beste Bewertung in Antalya'] },
];

const REVIEWS = [
  { stars:5, text:'"Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım ve seri üretim mükemmeldi!"', author:'Murat B.', flag:'🇹🇷', city:'Antalya', date:'Ocak 2025' },
  { stars:5, text:'"Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit!"', author:'Sarah M.', flag:'🇬🇧', city:'London', date:'Mayıs 2025' },
  { stars:5, text:'"Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили в отель!"', author:'Наталья К.', flag:'🇷🇺', city:'Москва', date:'Haziran 2025' },
  { stars:5, text:'"Bestickte Sweatshirts — 30 Stück, pünktlich geliefert. Ausgezeichnete Qualität!"', author:'David K.', flag:'🇩🇪', city:'Berlin', date:'Şubat 2025' },
  { stars:5, text:'"Gelinliğimi mükemmel teslim ettiler. Paça kısaltmayı aynı gün yaptılar. Harika hizmet!"', author:'Elif Y.', flag:'🇹🇷', city:'Antalya', date:'Nisan 2025' },
  { stars:5, text:'"Suit altered for a business meeting in 24h. Perfect fit. Best tailor in Antalya!"', author:'James T.', flag:'🇦🇺', city:'Sydney', date:'Mart 2025' },
];

const PRICES: Record<Lang,string[][]> = {
  tr:[
    ['Paça / Pantolon / Etek Kısaltma','₺150+','24 saat'],
    ['Fermuar — Pantolon / Kot','₺120+','Aynı gün'],
    ['Fermuar — Mont / Kaban','₺300+','24 saat'],
    ['Bel Daraltma / Elbise Daraltma','₺200+','48 saat'],
    ['Kol Kısaltma','₺200+','48 saat'],
    ['Yırtık Onarımı','₺100+','Aynı gün'],
    ['Erkek Takım Elbise Dikimi','₺2.500+','5–7 gün'],
    ['Erkek Gömlek Dikimi','₺400+','3–5 gün'],
    ['Kadın Elbise Dikimi','₺600+','3–7 gün'],
    ['Gelinlik Tadilatı','₺500+','3–5 gün'],
    ['Abiye Tamiri','₺350+','48 saat'],
    ['Tişört / Sweatshirt Dikimi','₺150+','3–5 gün'],
    ['Pantolon / Şort / Gobi Dikimi','₺200+','3–5 gün'],
    ['Sweatshirt Dikimi','₺400+','3–5 gün'],
    ['Kuru Temizleme (Elbise)','₺300+','48 saat'],
    ['Kuru Temizleme (Mont)','₺500+','48 saat'],
    ['Çamaşır & Ütü (kg)','₺80+/kg','24 saat'],
    ['Üniforma (kişi başı)','Teklif','Sipariş miktarına göre'],
  ],
  en:[
    ['Trouser / Skirt Hemming','₺150+','24h'],
    ['Zip — Trousers / Jeans','₺120+','Same day'],
    ['Zip — Coat','₺300+','24h'],
    ['Waist / Dress Taking In','₺200+','48h'],
    ['Sleeve Shortening','₺200+','48h'],
    ['Tear Repair','₺100+','Same day'],
    ["Men's Bespoke Suit","₺2,500+",'5–7 days'],
    ["Men's Shirt","₺400+",'3–5 days'],
    ["Women's Dress","₺600+",'3–7 days'],
    ['Wedding Dress Alteration','₺500+','3–5 days'],
    ['Evening Gown Repair','₺350+','48h'],
    ['T-Shirt / Sweatshirt','₺150+','3–5 days'],
    ['Trouser / Short / Gobi','₺200+','3–5 days'],
    ['Dry Cleaning (Dress)','₺300+','48h'],
    ['Dry Cleaning (Coat)','₺500+','48h'],
    ['Laundry & Ironing','₺80+/kg','24h'],
    ['Uniform (per person)','Quote','On quantity'],
  ],
  ru:[
    ['Подгонка брюк / юбки','₺150+','24 ч'],
    ['Молния — брюки','₺120+','В тот же день'],
    ['Молния — пальто','₺300+','24 ч'],
    ['Заужение талии / платья','₺200+','48 ч'],
    ['Укорочение рукавов','₺200+','48 ч'],
    ['Ремонт разрыва','₺100+','В тот же день'],
    ['Мужской костюм','₺2.500+','5–7 дней'],
    ['Мужская рубашка','₺400+','3–5 дней'],
    ['Женское платье','₺600+','3–7 дней'],
    ['Свадебное платье','₺500+','3–5 дней'],
    ['Вечернее платье','₺350+','48 ч'],
    ['Футболка / Толстовка','₺150+','3–5 дней'],
    ['Брюки / Шорты','₺200+','3–5 дней'],
    ['Химчистка (платье)','₺300+','48 ч'],
    ['Химчистка (пальто)','₺500+','48 ч'],
    ['Стирка и глажка','₺80+/кг','24 ч'],
    ['Форма','Запрос','По заказу'],
  ],
  de:[
    ['Hose / Rock kürzen','₺150+','24h'],
    ['Reißverschluss — Hose','₺120+','Gleicher Tag'],
    ['Reißverschluss — Mantel','₺300+','24h'],
    ['Bund / Kleid einengen','₺200+','48h'],
    ['Ärmel kürzen','₺200+','48h'],
    ['Riss reparieren','₺100+','Gleicher Tag'],
    ['Herrenmaßanzug','₺2.500+','5–7 Tage'],
    ['Herrenhemd','₺400+','3–5 Tage'],
    ['Damenkleid','₺600+','3–7 Tage'],
    ['Brautkleid','₺500+','3–5 Tage'],
    ['Abendkleid','₺350+','48h'],
    ['T-Shirt / Sweatshirt','₺150+','3–5 Tage'],
    ['Hose / Shorts','₺200+','3–5 Tage'],
    ['Reinigung (Kleid)','₺300+','48h'],
    ['Reinigung (Mantel)','₺500+','48h'],
    ['Wäsche & Bügeln','₺80+/kg','24h'],
    ['Uniform','Angebot','Je nach Menge'],
  ],
};

const ILCELER = [
  {ilce:'Muratpaşa',m:['Fener','Kışla','Güzeloba','Balbey','Kaleiçi','Meltem','Çağlayan','Bahçelievler','Şirinyalı','Lara']},
  {ilce:'Konyaaltı',m:['Hurma','Sarısu','Liman','Uncalı','Arapsuyu','Gürsu','Kızıltoprak','Çakırlar','Geyikbayırı']},
  {ilce:'Kepez',m:['Varsak','Santral','Pınarbaşı','Altındağ','Göksu','Göçerler','Atatürk','Yeşilbayır','Duraliler']},
  {ilce:'Döşemealtı',m:['Döşemealtı Merkez','Habibler','Çığlık','Erenköy']},
  {ilce:'Aksu',m:['Kundu','Güzeloba','Altıntaş','Boğazkent','Kadriye']},
  {ilce:'Lara / Belek',m:['Belek','Kadriye','Boğazkent','Kundu','Ilıca','Serik yakını']},
  {ilce:'Kemer',m:['Kemer Merkez','Beldibi','Göynük','Çamyuva','Tekirova','Kiriş','Arslanbucak']},
  {ilce:'Alanya',m:['Alanya Merkez','Mahmutlar','Oba','Tosmur','Avsallar','Kestel','Konaklı','Okurcalar']},
  {ilce:'Manavgat / Side',m:['Manavgat Merkez','Side','Sorgun','Kumköy','Evrenseki','Titreyengöl']},
  {ilce:'Serik',m:['Serik Merkez','Boğazkent','Belek yakını','Kadriye']},
  {ilce:'Kaş · Finike · Diğer',m:['Kaş Merkez','Kalkan','Finike','Kumluca','Elmalı','Gazipaşa']},
];

// ✅ DÜZELTİLDİ: gelinlik-tadilati-antalya (canonical URL)
const ALT_SAYFALAR = [
  ['✂️','Paça Kısaltma Antalya','/terzi/paca-kisaltma-antalya'],
  ['👔','Bay Terzi Antalya','/terzi/bay-terzi-antalya'],
  ['👗','Bayan Terzi Antalya','/terzi/bayan-terzi-antalya'],
  ['🏭','Dikiş Atölyesi Antalya','/terzi/dikis-atolyesi-antalya'],
  ['🏨','Üniforma Üretimi Antalya','/terzi/uniforma-uretimi-antalya'],
  ['🧺','Kuru Temizleme Antalya','/terzi/kuru-temizleme-antalya'],
  ['🚗','Eve Gelen Terzi Antalya','/terzi/eve-gelen-terzi-antalya'],
  ['💍','Gelinlik Tadilatı Antalya','/terzi/gelinlik-tadilati-antalya'],
  ['🔧','Fermuar Değişimi Antalya','/terzi/fermuar-degisimi-antalya'],
] as const;

const C = {
  tr:{
    badge:'✦ Antalya · Terzi Can',
    h1:"Antalya'nın",h1em:'Terzisi',
    sub:'Bay Terzi · Bayan Terzi · Özel Dikim · Tadilat · Tekstil İmalatı · Üniforma · Kuru Temizleme',
    waBtn:"WhatsApp'tan Yazın",downBtn:'Hizmetleri Gör ↓',
    waMsg:'Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.',
    mobileMsg:'Merhaba, adresime terzi servisi istiyorum. Yerinde ölçü alabilir misiniz?',
    s_services:'Hizmetlerimiz',s_why:'Neden Biz?',s_faq:'Sık Sorulan Sorular',
    s_reviews:'Müşteri Yorumları',s_areas:'Hizmet Bölgeleri',s_contact:'Bize Ulaşın',
    s_prices:'Terzi Fiyatları 2026',s_mobile:'Terzi Servisi',
    s_allsvc:'Tüm Hizmet Sayfalarımız',s_allsvc_sub:'Detaylı bilgi için tıklayın',
    mobileHeading:'Kapınıza Geliyoruz',
    mobileDesc:"Araçlı terzi servisimizle tüm Antalya'ya hizmet veriyoruz. Adresinize geliyor, yerinde ölçü alıyor, dikip teslim ediyoruz.",
    mobileCta:'🚗 Terzi Servisi Talep Et',
    steps:[
      ['📍','Adresinizi Bildirin',"WhatsApp'tan konum paylaşın"],
      ['📏','Yerinde Ölçü','Terzi adresinize gelir'],
      ['✂️','Atölyede Dikilir','Ölçüye göre tamamlanır'],
      ['🚗','Kapıya Teslim','Belirlenen vakitte'],
    ] as [string,string,string][],
    areaLabel:'İlçeye tıklayın — mahalleleri görün',
    quoteBtn:'📲 Ücretsiz Fiyat Teklifi Al',bulkBtn:'🏭 Toplu Sipariş Teklifi',
    mapBtn:'📍 Google Maps',hours:'09:00–19:00 · Pzt–Cmt',
    bayBayanHeading:'Bay & Bayan Terzi',
    bayHeading:'Bay Terzi',
    bayDesc:'Erkek takım elbise dikimi, pantolon kısaltma, gömlek dikimi, ceket tadilatı, kol kısaltma, bel daraltma, blazer, smoking, damatlık dikimi. Yerinde ölçü alma.',
    bayanHeading:'Bayan Terzi',
    bayanDesc:'Kadın elbise dikimi, bluz, etek kısaltma, elbise daraltma, bel daraltma, abiye tamiri, gelinlik tadilatı, büyük beden, bebek elbisesi.',
    atolyeHeading:'Tekstil İmalatı & Dikiş Atölyesi',
    atolyeDesc:'Tişört, sweatshirt, pantolon, gömlek, mont, şort, gobi seri üretimi. Kalıp çıkarma, fason üretim, numune dikimi. Markalar, butikler ve e-ticaret için tam paket.',
    faq:[
      ['Paça ve pantolon kısaltma fiyatı? 2026',"₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175. Etek kısaltma ₺150. Aynı gün veya 24 saat teslim. WhatsApp'tan fotoğraf gönderin."],
      ['Fermuar değişimi kaç lira? Mont, kot, pantolon?',"Pantolon/kot ₺120, ceket ₺200, mont ₺300-350. Aynı gün teslim mümkün. WhatsApp: +90 531 898 64 18"],
      ['Bel daraltma ve elbise daraltma fiyatı?',"Elbise/pantolon bel daraltma ₺200'den, kol kısaltma ₺200'den başlar. WhatsApp: +90 531 898 64 18"],
      ['Yerinde ölçü alma ve adrese teslim var mı?',"Evet! Adresinize geliyor, yerinde ölçü alıyor, dikip tekrar teslim ediyoruz. Tüm Antalya ilçeleri. WhatsApp: +90 531 898 64 18"],
      ['Tişört, sweatshirt, pantolon, gömlek, şort, gobi imalatı?',"Evet! Tüm tekstil ürünlerinin özel dikimi ve seri imalatını yapıyoruz. Nakış ve baskı da mevcut. WhatsApp: +90 531 898 64 18"],
      ['Beden ölçüsüne göre özel dikim ve model tasarımı?',"Evet! Kişiye özel ölçü alımı, model tasarımı ve dikim yapıyoruz. Fotoğraf gönderin — hayalinizdeki kıyafeti dikiyoruz. WhatsApp: +90 531 898 64 18"],
      ['Bay terzi Antalya — erkek kıyafet dikimi?',"Evet! Erkek takım elbise, pantolon kısaltma, gömlek dikimi, ceket tadilatı, kol kısaltma, blazer, smoking, damatlık. WhatsApp: +90 531 898 64 18"],
      ['Bayan terzi Antalya — kadın elbise dikimi?',"Evet! Elbise, bluz, etek, bel daraltma, abiye tamiri, gelinlik tadilatı, büyük beden. WhatsApp: +90 531 898 64 18"],
      ['Dikiş atölyesi Antalya — fason ve seri imalat?',"Evet! Kalıp çıkarma, numune, prototip, seri imalat. Markalar için tam paket. WhatsApp: +90 531 898 64 18"],
      ['Hangi Antalya ilçelerine terzi servisi geliyor?',"Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Aksu, Lara, Belek, Kemer, Alanya, Manavgat, Side, Serik ve tüm Antalya ilçelerine geliyoruz."],
      ['Kuru temizleme ve ütü Antalya?',"Kuru temizleme ₺300, mont ₺500, çamaşır ₺80/kg. Otelden kurye alım. 24 saat."],
      ['Gelinlik ve abiye tadilatı?','Evet. Gelinlik tadilatı ₺500, abiye tamiri ₺350. Nisan–Ekim düğün sezonu.'],
    ] as [string,string][],
    seoIntro:"Antalya'nın köklü terzisi Terzi Can. Bay terzisi: erkek takım elbise, pantolon kısaltma, gömlek, ceket, bel daraltma. Bayan terzisi: kadın elbise, etek, abiye, gelinlik tadilatı, elbise daraltma. Özel dikim: beden ölçüsüne göre tasarım, yerinde ölçü alma, adrese teslim. Tekstil imalatı: tişört, sweatshirt, pantolon, gömlek, mont, şort, gobi seri üretimi. Dikiş atölyesi: kalıp, fason, seri imalat. Kuru temizleme ve ütü. Üniforma üretimi. Tüm Antalya ilçelerine araçlı terzi servisi.",
  },
  en:{
    badge:'✦ Antalya · Tailor Can',
    h1:"Antalya's",h1em:'Master Tailor',
    sub:"Men's · Women's · Custom Tailoring · Alterations · Textile Manufacturing · Uniforms · Dry Cleaning",
    waBtn:'WhatsApp Us Now',downBtn:'View Services ↓',
    waMsg:'Hello, I would like information about your tailoring service.',
    mobileMsg:'Hello, I would like your mobile tailor service. Can you come to my address for measurements?',
    s_services:'Services',s_why:'Why Us?',s_faq:'FAQ',s_reviews:'Reviews',
    s_areas:'Service Areas',s_contact:'Contact',s_prices:'Price List 2026',s_mobile:'Mobile Tailor',
    s_allsvc:'All Service Pages',s_allsvc_sub:'Click for details',
    mobileHeading:'We Come to You',
    mobileDesc:'Our mobile tailor service covers all of Antalya. We visit your address, take measurements on-site and deliver back to your door.',
    mobileCta:'🚗 Request Mobile Tailor',
    steps:[
      ['📍','Share Address','Send location via WhatsApp'],
      ['📏','On-Site Measure','Tailor comes to you'],
      ['✂️','Tailored in Workshop','Sewn to your measurements'],
      ['🚗','Delivered to Door','At agreed time'],
    ] as [string,string,string][],
    areaLabel:'Tap a district to see neighborhoods',
    quoteBtn:'📲 Get Free Quote',bulkBtn:'🏭 Bulk Order Quote',
    mapBtn:'📍 Google Maps',hours:'09:00–19:00 · Mon–Sat',
    bayBayanHeading:"Men's & Women's Tailor",
    bayHeading:"Men's Tailor",
    bayDesc:'Bespoke suits, trouser hemming, shirt making, jacket alterations, sleeve shortening, waist taking in, blazer, tuxedo, groom suit. On-site measurements.',
    bayanHeading:"Women's Tailor",
    bayanDesc:'Dress making, blouse, skirt shortening, dress taking in, waist alteration, evening gown repair, wedding dress alterations, plus size, baby clothes.',
    atolyeHeading:'Textile Manufacturing & Sewing Workshop',
    atolyeDesc:'T-shirt, sweatshirt, trousers, shirt, coat, shorts, gobi mass production. Pattern making, contract manufacturing, sample sewing. Full package for brands.',
    faq:[
      ['How much is trouser hemming in Antalya?','From ₺150. WhatsApp a photo for a free quote in 30 minutes.'],
      ['Zip replacement cost in Antalya?','Trousers/jeans ₺120, jacket ₺200, coat ₺300. Same-day available.'],
      ['Waist alteration and dress taking in?','Dress/trouser waist from ₺200. Sleeve shortening ₺200. WhatsApp: +90 531 898 64 18'],
      ['Do you offer on-site measurements and home delivery?','Yes! We come to your address, take measurements on-site, sew, and deliver back. All Antalya districts.'],
      ['Do you produce t-shirts, sweatshirts, trousers, shorts, gobi?','Yes! Custom and mass production of all textile items. With embroidery and print. WhatsApp: +90 531 898 64 18'],
      ['Custom tailoring based on body measurements?','Yes! We take measurements, design, and sew. Send a photo — we make your dream garment.'],
      ["Do you offer men's tailoring?","Yes! Bespoke suits, trouser hemming, shirts, jackets, blazers, tuxedos, groom suits. WhatsApp: +90 531 898 64 18"],
      ["Do you offer women's tailoring?","Yes! Dress making, skirts, evening gown repair, wedding dress alterations, plus size. WhatsApp: +90 531 898 64 18"],
      ['Sewing workshop for mass production?','Yes! Pattern making, prototypes, mass production. Full package for brands. WhatsApp: +90 531 898 64 18'],
      ['Which Antalya districts do you serve?','Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Lara, Belek, Kemer, Alanya, Manavgat, Side, Serik and all Antalya districts.'],
      ['Dry cleaning and ironing prices?','Dry cleaning ₺300, coat ₺500, laundry ₺80/kg. Hotel courier pickup. 24h express.'],
      ['Wedding and evening gown alterations?','Yes. Wedding dress ₺500, evening gown ₺350. April–October season.'],
    ] as [string,string][],
    seoIntro:"Tailor Can — Antalya's best English-speaking tailor. Men's: bespoke suits, trouser hemming, shirts, waist alterations. Women's: dress making, alterations, wedding dresses. Custom tailoring: on-site measurements, delivery. Textile manufacturing: t-shirts, sweatshirts, trousers, shorts mass production. Sewing workshop. Dry cleaning. Uniform production. Mobile tailor all Antalya.",
  },
  ru:{
    badge:'✦ Анталья · Портной Кан',
    h1:'Лучший',h1em:'Портной Антальи',
    sub:'Мужской · Женский · Пошив на заказ · Переделка · Текстиль · Химчистка · Форма',
    waBtn:'Написать в WhatsApp',downBtn:'Смотреть услуги ↓',
    waMsg:'Здравствуйте, хотел бы узнать о ваших услугах портного.',
    mobileMsg:'Здравствуйте, хочу выездной сервис. Приедете для снятия мерок?',
    s_services:'Услуги',s_why:'Почему мы?',s_faq:'Вопросы',s_reviews:'Отзывы',
    s_areas:'Районы',s_contact:'Контакт',s_prices:'Цены 2026',s_mobile:'Выездной портной',
    s_allsvc:'Все страницы услуг',s_allsvc_sub:'Нажмите для подробностей',
    mobileHeading:'Приедем к вам',
    mobileDesc:'Выездной портной по всей Анталье. Приедем, снимем мерки на месте, сошьём и доставим.',
    mobileCta:'🚗 Вызвать портного',
    steps:[
      ['📍','Укажите адрес','Локация в WhatsApp'],
      ['📏','Замеры на месте','Портной приедет'],
      ['✂️','Пошив','По меркам'],
      ['🚗','Доставка','В назначенное время'],
    ] as [string,string,string][],
    areaLabel:'Нажмите на район',
    quoteBtn:'📲 Бесплатная оценка',bulkBtn:'🏭 Оптовый заказ',
    mapBtn:'📍 Google Maps',hours:'09:00–19:00 · Пн–Сб',
    bayBayanHeading:'Мужской и женский портной',
    bayHeading:'Мужской портной',
    bayDesc:'Пошив костюмов, подгонка брюк, рубашки, пиджаки, заужение талии, блейзер, смокинг, костюм жениха. Замеры на месте.',
    bayanHeading:'Женский портной',
    bayanDesc:'Пошив платьев, блузок, укорачивание юбок, заужение платья, подгонка, вечерние платья, свадебные платья, большие размеры.',
    atolyeHeading:'Производство текстиля и швейное ателье',
    atolyeDesc:'Серийное производство футболок, худи, брюк, рубашек, курток, шорт. Лекала, образцы, прототип. Полный пакет для брендов.',
    faq:[
      ['Стоимость подгонки брюк в Анталье?','От ₺150. Отправьте фото в WhatsApp — ответим за 30 минут.'],
      ['Стоимость замены молнии?','Брюки ₺120, пиджак ₺200, пальто ₺300. В тот же день.'],
      ['Заужение талии и платья?','Заужение платья/брюк от ₺200. WhatsApp: +90 531 898 64 18'],
      ['Замеры на месте и доставка на дом?','Да! Приедем по адресу, снимем мерки, сошьём и доставим. Вся Анталья.'],
      ['Производство футболок, худи, брюк, шорт?','Да! Серийное производство любого текстиля. С вышивкой и печатью. WhatsApp: +90 531 898 64 18'],
      ['Пошив по индивидуальным меркам?','Да! Снимаем мерки, разрабатываем модель и шьём. Отправьте фото — сошьём мечту.'],
      ['Есть мужской портной?','Да! Костюмы, брюки, рубашки, пиджаки, смокинг. WhatsApp: +90 531 898 64 18'],
      ['Есть женский портной?','Да! Платья, юбки, вечерние платья, свадебные платья, большие размеры. WhatsApp: +90 531 898 64 18'],
      ['Ателье для серийного производства?','Да! Лекала, образцы, серийное производство. WhatsApp: +90 531 898 64 18'],
      ['В какие районы Антальи выезжаете?','Конъяалты, Муратпаша, Кепез, Лара, Белек, Кемер, Алания, Манавгат, Сиде и все районы Антальи.'],
      ['Химчистка и глажка?','Химчистка ₺300, пальто ₺500, стирка ₺80/кг. Курьер из отеля. 24ч.'],
      ['Подгонка свадебного платья?','Да. Свадебное ₺500, вечернее ₺350. Апрель–октябрь.'],
    ] as [string,string][],
    seoIntro:'Портной Кан — опытный портной в Анталье. Мужской: костюмы, брюки, рубашки, заужение. Женский: платья, подгонка, свадебные платья. Пошив на заказ по меркам, замеры на месте. Текстильное производство: футболки, худи, брюки, шорты. Ателье. Химчистка. Форма. Выездной сервис.',
  },
  de:{
    badge:'✦ Antalya · Schneider Can',
    h1:'Antalyas',h1em:'Meisterschneider',
    sub:'Herren · Damen · Maßanfertigung · Änderungen · Textilproduktion · Uniformen · Reinigung',
    waBtn:'WhatsApp schreiben',downBtn:'Leistungen ↓',
    waMsg:'Hallo, ich möchte Informationen über Ihren Schneiderservice.',
    mobileMsg:'Hallo, ich möchte den mobilen Schneiderdienst für Maßabnahme.',
    s_services:'Leistungen',s_why:'Warum wir?',s_faq:'Fragen',s_reviews:'Bewertungen',
    s_areas:'Servicegebiete',s_contact:'Kontakt',s_prices:'Preise 2026',s_mobile:'Mobiler Schneider',
    s_allsvc:'Alle Serviceseiten',s_allsvc_sub:'Für Details klicken',
    mobileHeading:'Wir kommen zu Ihnen',
    mobileDesc:'Unser mobiler Schneiderdienst in ganz Antalya. Wir kommen, nehmen Maße vor Ort, schneidern und liefern.',
    mobileCta:'🚗 Mobilen Schneider anfragen',
    steps:[
      ['📍','Adresse','Standort per WhatsApp'],
      ['📏','Maße vor Ort','Schneider kommt'],
      ['✂️','Atelier','Nach Maß genäht'],
      ['🚗','Lieferung','Zur vereinbarten Zeit'],
    ] as [string,string,string][],
    areaLabel:'Bezirk antippen',
    quoteBtn:'📲 Kostenloses Angebot',bulkBtn:'🏭 Großauftrag',
    mapBtn:'📍 Google Maps',hours:'09:00–19:00 · Mo–Sa',
    bayBayanHeading:'Herren- & Damenschneider',
    bayHeading:'Herrenschneider',
    bayDesc:'Maßanzüge, Hosenänderungen, Hemden, Jacken einengen, Ärmel kürzen, Blazer, Smoking, Bräutigamanzug. Maßabnahme vor Ort.',
    bayanHeading:'Damenschneiderin',
    bayanDesc:'Kleider nähen, Blusen, Röcke kürzen, Kleider einengen, Taille ändern, Abendkleider, Brautkleid, Übergrößen.',
    atolyeHeading:'Textilproduktion & Nähwerkstatt',
    atolyeDesc:'T-Shirts, Sweatshirts, Hosen, Hemden, Mäntel, Shorts Serienproduktion. Schnittmuster, Lohnfertigung, Muster. Vollständiges Paket für Marken.',
    faq:[
      ['Hosenänderung Preis in Antalya?','Ab ₺150. Foto per WhatsApp — Angebot in 30 Minuten.'],
      ['Reißverschluss-Kosten?','Hosen ₺120, Jacke ₺200, Mantel ₺300. Expressdienst.'],
      ['Bund einengen und Kleid einengen?','Kleid/Hose einengen ab ₺200. Ärmel kürzen ₺200. WhatsApp: +90 531 898 64 18'],
      ['Maßabnahme vor Ort und Lieferung?','Ja! Wir kommen zu Ihnen, nehmen Maße, schneidern und liefern zurück. Ganz Antalya.'],
      ['T-Shirts, Sweatshirts, Hosen, Shorts Produktion?','Ja! Serienproduktion aller Textilien. Mit Stickerei und Druck. WhatsApp: +90 531 898 64 18'],
      ['Maßanfertigung nach Körpermaßen?','Ja! Maßabnahme, Modellentwicklung und Fertigung. Foto senden — wir machen Ihr Wunschkleidungsstück.'],
      ['Herrenschneider in Antalya?','Ja! Anzüge, Hosen, Hemden, Jacken, Blazer, Smoking. WhatsApp: +90 531 898 64 18'],
      ['Damenschneiderin in Antalya?','Ja! Kleider, Röcke, Abendkleider, Brautkleid, Übergrößen. WhatsApp: +90 531 898 64 18'],
      ['Nähwerkstatt Serienproduktion?','Ja! Schnittmuster, Prototypen, Serienproduktion. WhatsApp: +90 531 898 64 18'],
      ['Welche Bezirke in Antalya?','Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Lara, Belek, Kemer, Alanya, Manavgat, Side, Serik und alle Bezirke.'],
      ['Reinigung und Bügeln?','Reinigung ₺300, Mantel ₺500, Wäsche ₺80/kg. Kurierabholung. 24h.'],
      ['Brautkleid-Änderungen?','Ja. Brautkleid ₺500, Abendkleid ₺350. April–Oktober.'],
    ] as [string,string][],
    seoIntro:'Schneider Can — Antalya mit deutschsprachigem Service. Herrenschneider: Anzüge, Hosen, Hemden, Bund einengen. Damenschneiderin: Kleider, Abendkleider, Brautkleid. Maßanfertigung, Maßabnahme vor Ort. Textilproduktion: T-Shirts, Sweatshirts, Hosen, Shorts. Nähwerkstatt. Reinigung. Uniformproduktion. Mobiler Schneider.',
  },
};

export default function TerziClient() {
  const [lang,setLang]=useState<Lang>('tr');
  const [openFaq,setOpenFaq]=useState<number|null>(null);
  const [activeIlce,setActiveIlce]=useState<string|null>(null);
  const [heroIdx,setHeroIdx]=useState(0);
  const [scrolled,setScrolled]=useState(false);
  const stripRef=useRef<HTMLDivElement>(null);
  const c=C[lang];

  useEffect(()=>{
    const bl=(navigator.language||'').toLowerCase();
    if(bl.startsWith('de'))setLang('de');
    else if(bl.startsWith('ru'))setLang('ru');
    else if(bl.startsWith('en'))setLang('en');
  },[]);
  useEffect(()=>{const t=setInterval(()=>setHeroIdx(i=>(i+1)%HERO_IMAGES.length),5000);return()=>clearInterval(t);},[]);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h);},[]);
  useEffect(()=>{
    const el=stripRef.current;if(!el)return;
    let x=0;const run=()=>{x+=0.5;if(x>=el.scrollWidth/2)x=0;el.scrollLeft=x;};
    const id=setInterval(run,16);return()=>clearInterval(id);
  },[]);

  return(<>
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--gold:#B8975A;--gold2:#D4B07A;--gold3:#8A6E3E;--cream:#FAF7F2;--cream2:#F2EDE4;--ink:#1C1814;--ink2:#2E2820;--text:#3A3028;--muted:#7A6E62;--light:#F7F3ED;--serif:'Cormorant Garamond',Georgia,serif;--sans:'DM Sans',system-ui,sans-serif;--shadow:0 4px 32px rgba(60,40,20,.1);--shadow-lg:0 16px 64px rgba(60,40,20,.16)}
    html{scroll-behavior:smooth}body{background:var(--cream);color:var(--text);font-family:var(--sans);font-weight:300;line-height:1.7;overflow-x:hidden}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--cream2)}::-webkit-scrollbar-thumb{background:var(--gold3)}
    .nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;transition:all .4s}
    .nav.up{background:rgba(250,247,242,.96);backdrop-filter:blur(20px);border-bottom:1px solid rgba(184,151,90,.15);padding:.8rem 2rem;box-shadow:0 2px 20px rgba(60,40,20,.07)}
    .nav-logo{font-family:var(--serif);font-size:1.5rem;color:var(--ink);text-decoration:none;letter-spacing:.04em;font-weight:600}.nav-logo span{color:var(--gold)}
    .nav-links{display:flex;gap:2rem;list-style:none}.nav-links a{color:var(--text);text-decoration:none;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;font-weight:500;transition:color .3s}.nav-links a:hover{color:var(--gold)}
    .lsw{display:flex;gap:.3rem}.lb{background:none;border:1px solid rgba(184,151,90,.25);color:var(--muted);font-size:.67rem;padding:.25rem .5rem;cursor:pointer;font-family:var(--sans);text-transform:uppercase;letter-spacing:.08em;transition:all .25s;border-radius:2px}.lb.on,.lb:hover{border-color:var(--gold);color:var(--gold);background:rgba(184,151,90,.08)}
    .hero{position:relative;height:100vh;min-height:700px;overflow:hidden;display:flex;align-items:flex-end}
    .hslide{position:absolute;inset:0;transition:opacity 1.2s ease}.hslide img{width:100%;height:100%;object-fit:cover;object-position:center 20%}.hslide.active{opacity:1}.hslide.inactive{opacity:0}
    .hov{position:absolute;inset:0;background:linear-gradient(to top,rgba(28,24,20,.75) 0%,rgba(28,24,20,.2) 50%,rgba(28,24,20,.1) 100%)}
    .hc{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 2rem 5rem;width:100%}
    .hbadge{display:inline-flex;align-items:center;gap:.6rem;font-size:.68rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.9);border:1px solid rgba(255,255,255,.35);padding:.35rem 1rem;margin-bottom:1.8rem;backdrop-filter:blur(4px);background:rgba(255,255,255,.08)}
    .hero h1{font-family:var(--serif);font-size:clamp(3.5rem,9vw,8rem);line-height:.9;font-weight:600;color:#fff;letter-spacing:-.01em}.hero h1 em{font-style:italic;color:var(--gold2)}
    .hsub{margin-top:1.4rem;font-size:.92rem;color:rgba(255,255,255,.82);max-width:500px;letter-spacing:.05em;line-height:1.9}
    .hacts{margin-top:2.2rem;display:flex;gap:.8rem;flex-wrap:wrap}
    .hdots{position:absolute;right:2rem;top:50%;transform:translateY(-50%);z-index:3;display:flex;flex-direction:column;gap:.5rem}.hdot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:all .3s;border:none}.hdot.on{background:#fff;transform:scale(1.4)}
    .hscroll{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);z-index:3;display:flex;flex-direction:column;align-items:center;gap:.4rem;color:rgba(255,255,255,.6);font-size:.65rem;letter-spacing:.2em;text-transform:uppercase}
    .hscroll-line{width:1px;height:40px;background:linear-gradient(to bottom,rgba(255,255,255,.6),transparent);animation:scrollpulse 2s ease-in-out infinite}
    @keyframes scrollpulse{0%,100%{opacity:.4}50%{opacity:1}}
    .strip-wrap{background:var(--ink);padding:1.2rem 0;overflow:hidden}.strip{display:flex;gap:4px;width:max-content}
    .strip-img{width:220px;height:150px;object-fit:cover;flex-shrink:0;filter:brightness(.75) saturate(.8);transition:filter .4s}.strip-img:hover{filter:brightness(1) saturate(1.1)}
    .seoblk{background:var(--cream2);padding:2.5rem 2rem;border-left:3px solid var(--gold3)}.seoblk p{font-size:.84rem;color:var(--muted);line-height:1.95;max-width:1100px;margin:0 auto}
    .bba{background:var(--light);padding:5rem 2rem}.bba-inner{max-width:1200px;margin:0 auto}
    .bba-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
    .bba-card{background:#fff;border-radius:2px;overflow:hidden;box-shadow:var(--shadow);transition:transform .4s,box-shadow .4s}.bba-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
    .bba-img{width:100%;height:280px;object-fit:cover;display:block}.bba-body{padding:1.8rem}
    .bba-eyebrow{font-size:.65rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:.6rem}
    .bba-h{font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--ink);margin-bottom:.7rem;line-height:1.2}
    .bba-d{font-size:.82rem;color:var(--muted);line-height:1.8;margin-bottom:1.2rem}
    .bba-cta-link{display:inline-flex;align-items:center;gap:.4rem;font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);text-decoration:none;border-bottom:1px solid rgba(184,151,90,.3);padding-bottom:.1rem;transition:all .3s}.bba-cta-link:hover{color:var(--gold3)}
    .mob{background:var(--ink);padding:5rem 2rem;position:relative;overflow:hidden}.mob::before{content:'';position:absolute;top:-60px;right:-60px;width:300px;height:300px;border:60px solid rgba(184,151,90,.06);border-radius:50%}
    .mob-inner{max-width:1200px;margin:0 auto}.mob-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:3rem;background:rgba(255,255,255,.06)}
    .mob-step{background:var(--ink);padding:2rem 1.5rem;text-align:center}.mob-ic{font-size:2rem;margin-bottom:.8rem}.mob-t{font-family:var(--serif);font-size:1.05rem;color:var(--gold2);margin-bottom:.4rem}.mob-d{font-size:.75rem;color:rgba(255,255,255,.45);line-height:1.6}
    .svc{background:var(--cream);padding:0}.svc-head{padding:5rem 2rem 3rem;max-width:1200px;margin:0 auto}
    .svc-grid{display:grid;grid-template-columns:repeat(2,1fr)}
    .sc{position:relative;overflow:hidden;min-height:420px;display:flex;flex-direction:column;justify-content:flex-end}.sc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .7s ease}.sc:hover img{transform:scale(1.05)}
    .sc-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(28,24,20,.92) 0%,rgba(28,24,20,.25) 60%,transparent 100%)}
    .sc-body{position:relative;z-index:2;padding:2rem}.sc-ic{font-size:1.6rem;margin-bottom:.6rem}.sc-h{font-family:var(--serif);font-size:1.4rem;font-weight:600;color:#fff;margin-bottom:.4rem}.sc-d{font-size:.78rem;color:rgba(255,255,255,.7);line-height:1.7;margin-bottom:.8rem}.sc-p{font-size:.68rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--gold2);border:1px solid rgba(212,176,122,.3);padding:.25rem .7rem;display:inline-block}
    .sc-line{position:absolute;bottom:0;left:2rem;right:2rem;height:1.5px;background:linear-gradient(to right,var(--gold),transparent);transform:scaleX(0);transform-origin:left;transition:transform .5s}.sc:hover .sc-line{transform:scaleX(1)}
    .why{background:var(--cream2);padding:5rem 2rem}.why-inner{max-width:1200px;margin:0 auto}.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:3rem}
    .wc{background:#fff;border-radius:2px;padding:1.6rem;border-top:2px solid transparent;transition:border-color .3s,box-shadow .3s}.wc:hover{border-color:var(--gold);box-shadow:var(--shadow)}.wc-ic{font-size:1.5rem;margin-bottom:.8rem}.wc-t{font-family:var(--serif);font-size:1rem;font-weight:600;color:var(--ink);margin-bottom:.3rem}.wc-d{font-size:.76rem;color:var(--muted);line-height:1.5}
    .rev{background:var(--ink2);padding:5rem 2rem}.rev-inner{max-width:900px;margin:0 auto}.rev-grid{display:grid;grid-template-columns:1fr;gap:.8rem;margin-top:3rem}
    .rc{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:2px;padding:1.5rem}.rc-stars{color:#f59e0b;margin-bottom:.5rem;font-size:.9rem}.rc-txt{font-size:.85rem;color:rgba(255,255,255,.65);line-height:1.85;font-style:italic;margin-bottom:.8rem}.rc-auth{font-size:.75rem;color:var(--gold2);font-weight:500}
    .prices{background:var(--light);padding:5rem 2rem}.prices-inner{max-width:860px;margin:0 auto}.ptbl{width:100%;border-collapse:collapse;margin-top:2rem}
    .ptbl th{text-align:left;font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);border-bottom:2px solid rgba(184,151,90,.2);padding:.7rem .8rem;font-weight:500}.ptbl th:not(:first-child){text-align:right}
    .ptbl td{padding:.9rem .8rem;font-size:.86rem;border-bottom:1px solid rgba(60,40,20,.06);color:var(--text)}.ptbl tr:nth-child(even) td{background:rgba(184,151,90,.03)}.ptbl tr:hover td{background:rgba(184,151,90,.08)}
    .tpr{color:var(--gold3);font-weight:600;text-align:right;white-space:nowrap}.ttm{color:var(--muted);font-size:.74rem;text-align:right}
    .areas{background:var(--cream2);padding:5rem 2rem}.areas-inner{max-width:1100px;margin:0 auto}
    .ilwrap{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;margin:2.5rem 0 1.2rem}
    .ilbtn{background:none;border:1px solid rgba(184,151,90,.2);color:var(--text);font-size:.76rem;padding:.4rem 1rem;cursor:pointer;font-family:var(--sans);border-radius:2px;transition:all .25s}.ilbtn.on,.ilbtn:hover{border-color:var(--gold);color:var(--gold3);background:rgba(184,151,90,.08)}
    .mahwrap{background:#fff;border:1px solid rgba(184,151,90,.15);border-radius:2px;padding:1.2rem;display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.8rem;box-shadow:var(--shadow)}.mchip{font-size:.72rem;color:var(--muted);border:1px solid rgba(184,151,90,.15);padding:.22rem .65rem;border-radius:2px}
    .allsvc{background:var(--ink);padding:5rem 2rem}.allsvc-inner{max-width:1100px;margin:0 auto}
    .allsvc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.8rem;margin-top:2.5rem}
    .allsvc-link{display:flex;align-items:center;gap:.7rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:2px;padding:1rem 1.2rem;text-decoration:none;color:rgba(255,255,255,.85);font-size:.85rem;transition:all .25s}.allsvc-link:hover{background:rgba(184,151,90,.1);border-color:rgba(184,151,90,.3);transform:translateY(-2px)}
    .faq{background:var(--light);padding:5rem 2rem}.faq-inner{max-width:760px;margin:0 auto}.faqitem{border-bottom:1px solid rgba(184,151,90,.12)}
    .faqq{width:100%;background:none;border:none;padding:1.2rem 0;display:flex;align-items:center;justify-content:space-between;gap:.8rem;cursor:pointer;text-align:left;font-family:var(--sans);font-size:.92rem;color:var(--text);font-weight:400;transition:color .3s}.faqq:hover{color:var(--gold3)}
    .faqico{flex-shrink:0;width:22px;height:22px;border:1px solid rgba(184,151,90,.35);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;color:var(--gold);transition:transform .35s}.faqico.open{transform:rotate(45deg)}
    .faqa{max-height:0;overflow:hidden;transition:max-height .45s ease,padding .3s;font-size:.83rem;color:var(--muted);line-height:1.9}.faqa.open{max-height:300px;padding-bottom:1.2rem}
    .contact{background:var(--ink);padding:5rem 2rem}.contact-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
    .crow{display:flex;gap:.8rem;align-items:flex-start;padding:.9rem 0;border-bottom:1px solid rgba(255,255,255,.06)}.clbl{font-size:.64rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold2);margin-bottom:.2rem;font-weight:500}.cval{font-size:.92rem;color:rgba(255,255,255,.85)}.cval a{color:rgba(255,255,255,.85);text-decoration:none;transition:color .3s}.cval a:hover{color:var(--gold2)}
    footer{background:var(--ink2);border-top:1px solid rgba(184,151,90,.1);padding:2.5rem 2rem;text-align:center}
    .footnav{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin-top:1.2rem}.footnav a{font-size:.72rem;color:rgba(212,176,122,.75);text-decoration:none;border:1px solid rgba(184,151,90,.18);padding:.25rem .65rem;border-radius:2px;transition:all .25s}.footnav a:hover{color:var(--gold2);border-color:rgba(184,151,90,.4)}
    .btn-gold{display:inline-flex;align-items:center;gap:.5rem;background:var(--gold);color:#fff;padding:.9rem 2rem;font-family:var(--sans);font-size:.78rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s;border-radius:1px}.btn-gold:hover{background:var(--gold3);transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,151,90,.35)}
    .btn-outline{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:rgba(255,255,255,.9);padding:.9rem 2rem;font-family:var(--sans);font-size:.78rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(255,255,255,.3);cursor:pointer;transition:all .3s}.btn-outline:hover{border-color:var(--gold2);color:var(--gold2);transform:translateY(-2px)}
    .btn-outline-dark{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--gold3);padding:.85rem 1.8rem;font-family:var(--sans);font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(184,151,90,.35);cursor:pointer;transition:all .3s}.btn-outline-dark:hover{border-color:var(--gold);color:var(--gold);background:rgba(184,151,90,.06)}
    .sh{margin-bottom:0}.ey{font-size:.65rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:.6rem}.ey-light{color:var(--gold2)}
    .st{font-family:var(--serif);font-size:clamp(2rem,4vw,3.2rem);font-weight:600;line-height:1.1;color:var(--ink)}.st-light{color:#fff}
    .ss{color:var(--muted);margin-top:.6rem;font-size:.88rem;max-width:480px}.ss-light{color:rgba(255,255,255,.5)}
    .gl{display:block;width:40px;height:1.5px;background:var(--gold);margin-top:1rem}.gl-center{margin-left:auto;margin-right:auto}
    .wafloat{position:fixed;bottom:1.8rem;right:1.8rem;z-index:150;width:3.2rem;height:3.2rem;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;font-size:1.4rem;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,.45);transition:transform .3s}.wafloat:hover{transform:scale(1.1)}
    @media(max-width:900px){.nav-links{display:none}.hero h1{font-size:3rem}.bba-grid{grid-template-columns:1fr}.svc-grid{grid-template-columns:1fr}.mob-steps{grid-template-columns:repeat(2,1fr)}.why-grid{grid-template-columns:repeat(2,1fr)}.contact-inner{grid-template-columns:1fr;gap:2rem}.lsw{flex-wrap:wrap}}
    @media(max-width:480px){.why-grid{grid-template-columns:1fr}.hacts{flex-direction:column}}
  `}</style>

  <a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer" className="wafloat" aria-label="WhatsApp">💬</a>

  <nav className={`nav${scrolled?' up':''}`}>
    <a href="#" className="nav-logo">Terzi <span>Can</span></a>
    <ul className="nav-links">
      <li><a href="#bay-bayan">{c.bayBayanHeading}</a></li>
      <li><a href="#services">{c.s_services}</a></li>
      <li><a href="#prices">{lang==='tr'?'Fiyatlar':lang==='de'?'Preise':lang==='ru'?'Цены':'Prices'}</a></li>
      <li><a href="#faq">{c.s_faq}</a></li>
      <li><a href="#contact">{c.s_contact}</a></li>
    </ul>
    <div className="lsw">
      {(['tr','en','ru','de'] as Lang[]).map(l=>(
        <button key={l} className={`lb${lang===l?' on':''}`} onClick={()=>setLang(l)}>
          {l==='tr'?'🇹🇷':l==='en'?'🇬🇧':l==='ru'?'🇷🇺':'🇩🇪'} {l.toUpperCase()}
        </button>
      ))}
    </div>
  </nav>

  <section className="hero">
    {HERO_IMAGES.map((img,i)=>(
      <div key={i} className={`hslide${i===heroIdx?' active':' inactive'}`}>
        <img src={img.src} alt={img.alt} loading={i===0?'eager':'lazy'}/>
      </div>
    ))}
    <div className="hov"/>
    <div className="hdots">
      {HERO_IMAGES.map((_,i)=>(
        <button key={i} className={`hdot${i===heroIdx?' on':''}`} onClick={()=>setHeroIdx(i)} aria-label={`Slayt ${i+1}`}/>
      ))}
    </div>
    <div className="hc">
      <span className="hbadge">{c.badge}</span>
      <h1>{c.h1}<br/><em>{c.h1em}</em></h1>
      <p className="hsub">{c.sub}</p>
      <div style={{display:'flex',gap:'.4rem',alignItems:'center',flexWrap:'wrap',marginTop:'1rem'}}>
        <span style={{color:'#f59e0b',fontSize:'1rem'}}>⭐⭐⭐⭐⭐</span>
        <span style={{fontSize:'.88rem',fontWeight:600,color:'#fff',marginLeft:'.3rem'}}>4.9</span>
        <span style={{fontSize:'.78rem',color:'rgba(255,255,255,.6)'}}>(94 {lang==='tr'?'değerlendirme':lang==='en'?'reviews':lang==='ru'?'отзывов':'Bewertungen'})</span>
      </div>
      <div className="hacts">
        <a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold">💬 {c.waBtn}</a>
        <a href="#bay-bayan" className="btn-outline">{c.downBtn}</a>
      </div>
    </div>
    <div className="hscroll"><div className="hscroll-line"/><span>scroll</span></div>
  </section>

  <div className="strip-wrap">
    <div className="strip" ref={stripRef} style={{overflowX:'hidden',userSelect:'none'}}>
      {[...FILM_STRIP,...FILM_STRIP].map((src,i)=>(
        <img key={i} src={src} alt="Terzi Can Antalya terzilik tekstil imalat" className="strip-img" loading="lazy"/>
      ))}
    </div>
  </div>

  <div className="seoblk" id="main-content">
    <p id="terzi-can-ozet">{c.seoIntro}</p>
  </div>

  <section className="bba" id="bay-bayan">
    <div className="bba-inner">
      <div className="sh">
        <div className="ey">✦ {c.bayBayanHeading}</div>
        <h2 className="st">{lang==='tr'?'Erkek ve Kadın Kıyafetinde Uzman — Özel Dikim ve Tadilat':lang==='en'?'Specialist in Menswear & Womenswear — Custom & Alterations':lang==='ru'?'Специалист по мужской и женской одежде':'Experte für Herren- und Damenmode'}</h2>
        <span className="gl"/>
      </div>
      <div className="bba-grid">
        <article className="bba-card" id="bay-terzi">
          <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=85&auto=format&fit=crop" alt="Bay terzi erkek takım elbise özel dikim bel daraltma Antalya" className="bba-img" loading="lazy"/>
          <div className="bba-body">
            <div className="bba-eyebrow">👔 {lang==='tr'?'Bay Terzi — Erkek Kıyafet':lang==='en'?"Men's Tailor":lang==='ru'?'Мужской портной':'Herrenschneider'}</div>
            <h3 className="bba-h">{c.bayHeading}</h3>
            <p className="bba-d">{c.bayDesc}</p>
            <a href={WA(lang==='tr'?'Merhaba, erkek kıyafeti için fiyat almak istiyorum.':"Hello, I need men's tailoring.")} target="_blank" rel="noopener noreferrer" className="bba-cta-link">
              💬 {lang==='tr'?'Fiyat Al →':lang==='en'?'Get Quote →':lang==='ru'?'Запрос →':'Angebot →'}
            </a>
          </div>
        </article>
        <article className="bba-card" id="bayan-terzi">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=85&auto=format&fit=crop" alt="Bayan terzi kadın elbise özel dikim bel daraltma elbise daraltma Antalya" className="bba-img" loading="lazy"/>
          <div className="bba-body">
            <div className="bba-eyebrow">👗 {lang==='tr'?'Bayan Terzi — Kadın Kıyafet':lang==='en'?"Women's Tailor":lang==='ru'?'Женский портной':'Damenschneiderin'}</div>
            <h3 className="bba-h">{c.bayanHeading}</h3>
            <p className="bba-d">{c.bayanDesc}</p>
            <a href={WA(lang==='tr'?'Merhaba, kadın kıyafeti için fiyat almak istiyorum.':"Hello, I need women's tailoring.")} target="_blank" rel="noopener noreferrer" className="bba-cta-link">
              💬 {lang==='tr'?'Fiyat Al →':lang==='en'?'Get Quote →':lang==='ru'?'Запрос →':'Angebot →'}
            </a>
          </div>
        </article>
        <article className="bba-card" id="dikis-atolyesi">
          <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=700&q=85&auto=format&fit=crop" alt="Tişört sweatshirt pantolon gömlek şort gobi seri imalat dikiş atölyesi Antalya" className="bba-img" loading="lazy"/>
          <div className="bba-body">
            <div className="bba-eyebrow">🏭 {lang==='tr'?'Tekstil İmalatı · Dikiş Atölyesi':lang==='en'?'Textile Mfg · Workshop':lang==='ru'?'Текстиль · Ателье':'Textil · Nähwerkstatt'}</div>
            <h3 className="bba-h">{c.atolyeHeading}</h3>
            <p className="bba-d">{c.atolyeDesc}</p>
            <a href={WA(lang==='tr'?'Merhaba, tekstil imalatı için teklif almak istiyorum.':'Hello, I need a textile manufacturing quote.')} target="_blank" rel="noopener noreferrer" className="bba-cta-link">
              💬 {lang==='tr'?'Teklif Al →':lang==='en'?'Get Quote →':lang==='ru'?'Запрос →':'Angebot →'}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section className="mob">
    <div className="mob-inner">
      <div className="sh">
        <div className="ey ey-light">🚗 {c.s_mobile}</div>
        <h2 className="st st-light">{c.mobileHeading}</h2>
        <p className="ss ss-light">{c.mobileDesc}</p>
        <span className="gl"/>
      </div>
      <div className="mob-steps">
        {c.steps.map(([ic,t,d],i)=>(
          <div key={i} className="mob-step">
            <div className="mob-ic">{ic}</div>
            <div className="mob-t">{t}</div>
            <div className="mob-d">{d}</div>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center',marginTop:'2.5rem'}}>
        <a href={WA(c.mobileMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold">{c.mobileCta}</a>
      </div>
    </div>
  </section>

  <section className="svc" id="services">
    <div className="svc-head">
      <div className="ey">✦ {c.s_services}</div>
      <h2 className="st">{lang==='tr'?'Antalya Terzi Hizmetleri — Tadilat · Özel Dikim · Tekstil İmalatı':lang==='en'?'Antalya Tailor Services — Alterations · Custom · Manufacturing':lang==='ru'?'Услуги портного Анталья':'Schneiderleistungen Antalya'}</h2>
      <p className="ss">{lang==='tr'?'Paça kısaltma, bel daraltma, fermuar değişimi, özel dikim, tişört-sweatshirt seri üretimi ve daha fazlası.':lang==='en'?'Hemming, waist alterations, zip replacement, custom tailoring, t-shirt & sweatshirt production and more.':lang==='ru'?'Подгонка, заужение, замена молнии, пошив на заказ, серийное производство.':'Saum kürzen, Bund einengen, Reißverschluss, Maßanfertigung, Serienproduktion.'}</p>
      <span className="gl"/>
    </div>
    <div className="svc-grid">
      {SERVICES.map((s,i)=>(
        <article key={i} className="sc" id={s.id}>
          <img src={s.img} alt={s.alt} loading={i<2?'eager':'lazy'} width="800" height="420"/>
          <div className="sc-ov"/>
          <div className="sc-body">
            <div className="sc-ic">{s.icon}</div>
            <h3 className="sc-h">{s[lang].n}</h3>
            <p className="sc-d">{s[lang].d}</p>
            <span className="sc-p">{s[lang].p}</span>
          </div>
          <div className="sc-line"/>
        </article>
      ))}
    </div>
    <div style={{textAlign:'center',padding:'2.5rem 2rem 4rem',display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap',background:'var(--cream)'}}>
      <a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold">{c.quoteBtn}</a>
      <a href={WA(lang==='tr'?'Merhaba, toplu tekstil sipariş için teklif almak istiyorum.':'Hello, bulk textile production quote please.')} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">{c.bulkBtn}</a>
    </div>
  </section>

  <section className="why">
    <div className="why-inner">
      <div className="sh">
        <div className="ey">✦ {c.s_why}</div>
        <h2 className="st">{lang==='tr'?'Neden Terzi Can?':lang==='en'?'Why Choose Us?':lang==='ru'?'Почему мы?':'Warum Schneider Can?'}</h2>
        <span className="gl"/>
      </div>
      <div className="why-grid">
        {WHY.map((w,i)=>(
          <div key={i} className="wc">
            <div className="wc-ic">{w.icon}</div>
            <div className="wc-t">{w[lang][0]}</div>
            <div className="wc-d">{w[lang][1]}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="rev">
    <div className="rev-inner">
      <div className="sh" style={{textAlign:'center'}}>
        <div className="ey ey-light">⭐ 4.9 / 5 · 94 {lang==='tr'?'Yorum':lang==='en'?'Reviews':lang==='ru'?'Отзывов':'Bewertungen'}</div>
        <h2 className="st st-light">{c.s_reviews}</h2>
        <span className="gl gl-center"/>
      </div>
      <div className="rev-grid">
        {REVIEWS.map((r,i)=>(
          <article key={i} className="rc">
            <div className="rc-stars">{'⭐'.repeat(r.stars)}</div>
            <p className="rc-txt">{r.text}</p>
            <div className="rc-auth">{r.flag} {r.author} — {r.city} · <span style={{color:'rgba(255,255,255,.35)',fontWeight:300}}>{r.date}</span></div>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section className="prices" id="prices">
    <div className="prices-inner">
      <div className="sh">
        <div className="ey">₺ {lang==='tr'?'Şeffaf Fiyatlar':lang==='en'?'Transparent Pricing':lang==='ru'?'Прозрачные цены':'Transparente Preise'}</div>
        <h2 className="st" id="hizmet-fiyatlari">{c.s_prices}</h2>
        <p className="ss">{lang==='tr'?"Başlangıç fiyatları — kesin teklif için WhatsApp'tan fotoğraf gönderin":lang==='en'?'Starting prices — send a photo on WhatsApp for an exact quote':lang==='ru'?'Начальные цены — фото в WhatsApp для точной оценки':'Startpreise — Foto per WhatsApp für genaues Angebot'}</p>
        <span className="gl"/>
      </div>
      <table className="ptbl">
        <thead>
          <tr>
            <th>{lang==='tr'?'Hizmet':lang==='en'?'Service':lang==='ru'?'Услуга':'Leistung'}</th>
            <th>{lang==='tr'?'Fiyat':lang==='en'?'Price':lang==='ru'?'Цена':'Preis'}</th>
            <th>{lang==='tr'?'Süre':lang==='en'?'Time':lang==='ru'?'Время':'Zeit'}</th>
          </tr>
        </thead>
        <tbody>
          {PRICES[lang].map(([s,p,t],i)=>(
            <tr key={i}><td>{s}</td><td className="tpr">{p}</td><td className="ttm">{t}</td></tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:'2rem',textAlign:'center'}}>
        <a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold">{c.quoteBtn}</a>
      </div>
    </div>
  </section>

  <section className="areas" id="areas">
    <div className="areas-inner">
      <div className="sh" style={{textAlign:'center'}}>
        <div className="ey">📍 {c.s_areas}</div>
        <h2 className="st">Antalya — {lang==='tr'?'Tüm İlçeler ve Mahalleler':lang==='en'?'All Districts & Neighborhoods':lang==='ru'?'Все районы':'Alle Bezirke'}</h2>
        <p className="ss" style={{margin:'0.6rem auto 0'}}>{c.areaLabel}</p>
        <span className="gl gl-center"/>
      </div>
      <div className="ilwrap">
        {ILCELER.map(({ilce})=>(
          <button key={ilce} className={`ilbtn${activeIlce===ilce?' on':''}`} onClick={()=>setActiveIlce(activeIlce===ilce?null:ilce)}>
            {ilce}
          </button>
        ))}
      </div>
      {activeIlce&&(
        <div className="mahwrap">
          {ILCELER.find(i=>i.ilce===activeIlce)?.m.map(m=>(
            <span key={m} className="mchip">{m}</span>
          ))}
        </div>
      )}
    </div>
  </section>

  <section className="allsvc">
    <div className="allsvc-inner">
      <div className="sh" style={{textAlign:'center'}}>
        <div className="ey ey-light">✦ {c.s_allsvc}</div>
        <h2 className="st st-light">{c.s_allsvc_sub}</h2>
        <span className="gl gl-center"/>
      </div>
      <div className="allsvc-grid">
        {ALT_SAYFALAR.map(([ic,label,href])=>(
          <Link key={href} href={href} className="allsvc-link">
            <span style={{fontSize:'1.2rem'}}>{ic}</span>
            <span>{label}</span>
            <span style={{marginLeft:'auto',color:'var(--gold2)',fontSize:'.8rem'}}>→</span>
          </Link>
        ))}
      </div>
    </div>
  </section>

  <section className="faq" id="faq">
    <div className="faq-inner">
      <div className="sh" style={{textAlign:'center',marginBottom:'2.5rem'}}>
        <div className="ey">FAQ</div>
        <h2 className="st" id="sik-sorulan-sorular">{c.s_faq}</h2>
        <span className="gl gl-center"/>
      </div>
      {c.faq.map(([q,a],i)=>(
        <div key={i} className="faqitem">
          <button className="faqq" onClick={()=>setOpenFaq(openFaq===i?null:i)} aria-expanded={openFaq===i}>
            <span style={{flex:1}}>{q}</span>
            <span className={`faqico${openFaq===i?' open':''}`}>+</span>
          </button>
          <div className={`faqa${openFaq===i?' open':''}`}>{a}</div>
        </div>
      ))}
    </div>
  </section>

  <section className="contact" id="contact">
    <div className="contact-inner">
      <div>
        <div className="ey ey-light">✦ {c.s_contact}</div>
        <h2 className="st st-light" style={{fontStyle:'italic'}}>{lang==='tr'?'Hızlı İletişim':lang==='en'?'Quick Contact':lang==='ru'?'Быстрый контакт':'Schneller Kontakt'}</h2>
        <p className="ss ss-light" style={{marginBottom:'1.5rem'}}>{lang==='tr'?'Hızlı yanıt için WhatsApp tercih edin.':lang==='en'?'For instant reply, prefer WhatsApp.':lang==='ru'?'Для быстрого ответа — WhatsApp.':'WhatsApp für schnelle Antwort.'}</p>
        <address style={{fontStyle:'normal'}}>
          {[
            {ic:'📞',lbl:lang==='tr'?'Telefon':'Phone',val:<a href="tel:+905318986418">+90 531 898 64 18</a>},
            {ic:'💬',lbl:'WhatsApp',val:<a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer">+90 531 898 64 18</a>},
            {ic:'🕐',lbl:lang==='tr'?'Çalışma Saatleri':'Hours',val:<span>{c.hours}</span>},
            {ic:'📍',lbl:lang==='tr'?'Bölge':'Area',val:<span>{lang==='tr'?'Tüm Antalya İlçeleri — Araçlı Terzi Servisi':lang==='en'?'All Antalya Districts — Mobile Tailor':'Alle Antalya-Bezirke'}</span>},
            {ic:'🌍',lbl:lang==='tr'?'Diller':'Languages',val:<span>🇹🇷 TR · 🇬🇧 EN · 🇷🇺 RU · 🇩🇪 DE</span>},
          ].map(({ic,lbl,val},i)=>(
            <div key={i} className="crow">
              <span style={{fontSize:'1rem',paddingTop:'.1rem'}}>{ic}</span>
              <div><div className="clbl">{lbl}</div><div className="cval">{val}</div></div>
            </div>
          ))}
          <div style={{display:'flex',flexDirection:'column',gap:'.7rem',marginTop:'2rem'}}>
            <a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{justifyContent:'center'}}>💬 WhatsApp</a>
            <a href={WA(c.mobileMsg)} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{justifyContent:'center'}}>{c.mobileCta}</a>
            <a href="https://maps.app.goo.gl/rpgwjJgWZHfgafTy5" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{justifyContent:'center'}}>{c.mapBtn}</a>
          </div>
        </address>
      </div>
      {/* ✅ Google Maps iframe — real embed */}
      <div style={{borderRadius:'2px',overflow:'hidden',border:'1px solid rgba(255,255,255,.08)'}}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12742.017!2d30.6946!3d36.8769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3914a3f49b36b%3A0xe9e87c5c9a6b2700!2sKonyaalti%2C%20Antalya!5e0!3m2!1str!2str!4v1720000000000"
          width="100%" height="280"
          style={{border:0,display:'block'}}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Terzi Can Konyaaltı Antalya — Google Maps"
          aria-label="Terzi Can atölyesi Konyaaltı Antalya konumu"
        />
        <div style={{padding:'1rem 1.2rem',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(28,24,20,.97)',borderTop:'1px solid rgba(184,151,90,.15)'}}>
          <div>
            <div style={{fontFamily:'var(--serif)',fontSize:'1rem',color:'rgba(255,255,255,.9)'}}>Terzi Can — Konyaaltı, Antalya</div>
            <div style={{fontSize:'.72rem',color:'var(--muted)',marginTop:'.2rem'}}>09:00–19:00 · Pzt–Cmt · Tüm Antalya İlçelerine Servis</div>
          </div>
          <a href="https://maps.app.goo.gl/rpgwjJgWZHfgafTy5" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{fontSize:'.72rem',padding:'.6rem 1rem'}}>{c.mapBtn}</a>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div style={{fontFamily:'var(--serif)',fontSize:'1.2rem',color:'var(--gold2)',marginBottom:'.4rem'}}>
      Terzi Can · Tailor Can · Портной Кан · Schneider Can
    </div>
    <p style={{fontSize:'.72rem',color:'rgba(255,255,255,.3)'}}>
      © 2026 SwapHubs — Antalya Terzi · Bay & Bayan · Özel Dikim · Tekstil İmalatı · Dikiş Atölyesi · +90 531 898 64 18
    </p>
    <nav aria-label="Footer hizmet linkleri" className="footnav">
      {ALT_SAYFALAR.map(([,label,href])=>(
        <Link key={href} href={href}>{label}</Link>
      ))}
    </nav>
  </footer>
  </>);
}
