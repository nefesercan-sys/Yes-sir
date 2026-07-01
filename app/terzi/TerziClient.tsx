'use client';
// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: app/terzi/TerziClient.tsx
// DÜZELTİLDİ:
//  1. FAQ <details>/<summary> ile server-side render edilebilir hale getirildi
//     → Google SSS rich snippet'larını artık görebilir
//  2. Her iki Google Business profili harita bölümünde gösteriliyor
//  3. Google Maps embed'leri her iki CID ile ayrı ayrı yerleştirildi
//  4. Unsplash → Pexels CDN'e geçildi (hotlink güvenilirliği)
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Lang = 'tr' | 'en' | 'ru' | 'de';

interface GBP {
  cid: string;
  short: string;
  maps: string;
  embed: string;
  review: string;
  name: string;
  addr: string;
}

interface Props {
  gbp1: GBP;
  gbp2: GBP;
}

const PHONE_RAW = '905318986418';
const PHONE_DISPLAY = '+90 531 898 64 18';
const WA = (msg: string) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;

// Pexels CDN — hotlink stabil
const HERO_IMAGES = [
  { src: 'https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop', alt: 'Profesyonel terzi atölyesi — Terzi Can Antalya' },
  { src: 'https://images.pexels.com/photos/6858614/pexels-photo-6858614.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop', alt: 'Elbise dikimi — Terzi Can Konyaaltı Antalya' },
  { src: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop', alt: 'Moda tasarım terzi — Terzi Can Antalya' },
  { src: 'https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop', alt: 'Özel dikim atölyesi — Terzi Can Antalya' },
];

const FILM_STRIP = [
  'https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/6858614/pexels-photo-6858614.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/4620863/pexels-photo-4620863.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/3768167/pexels-photo-3768167.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
];

const SERVICES = [
  { icon: '✂️', id: 'tadilat',
    img: 'https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Paça kısaltma fermuar değişimi bel daraltma tadilat Antalya — Terzi Can',
    tr: { n: 'Tamir & Tadilat', d: 'Paça kısaltma ₺150 · bel daraltma ₺150 · elbise daraltma · kol kısaltma · fermuar değişimi ₺200 · yırtık onarımı · düğme dikimi', p: '₺100+' },
    en: { n: 'Repairs & Alterations', d: 'Trouser hemming ₺150 · waist taking in · dress alterations · zip replacement ₺200 · sleeve shortening · tear repair', p: '₺100+' },
    ru: { n: 'Ремонт и переделка', d: 'Подгонка брюк ₺150 · заужение талии · заужение платья · замена молнии ₺200 · ремонт разрывов', p: '₺100+' },
    de: { n: 'Reparaturen & Änderungen', d: 'Hose kürzen ₺150 · Bund einengen · Kleid einengen · Reißverschluss ₺200 · Ärmel kürzen', p: '₺100+' } },
  { icon: '👔', id: 'bay-terzi',
    img: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Bay terzi erkek takım elbise özel dikim Antalya — Terzi Can',
    tr: { n: 'Bay Terzi', d: 'Erkek takım elbise dikimi · pantolon kısaltma · gömlek dikimi · ceket tadilatı · blazer · smoking · damatlık', p: '₺150+' },
    en: { n: "Men's Tailor", d: 'Bespoke suits · trouser hemming · shirt making · jacket alterations · blazer · tuxedo · groom suit', p: '₺150+' },
    ru: { n: 'Мужской портной', d: 'Пошив костюмов · подгонка брюк · рубашки · пиджаки · смокинг · костюм жениха', p: '₺150+' },
    de: { n: 'Herrenschneider', d: 'Maßanzüge · Hosenänderungen · Hemden · Jacken · Blazer · Smoking · Bräutigamanzug', p: '₺150+' } },
  { icon: '👗', id: 'bayan-terzi',
    img: 'https://images.pexels.com/photos/6858614/pexels-photo-6858614.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Bayan terzi kadın elbise dikimi özel dikim Antalya — Terzi Can',
    tr: { n: 'Bayan Terzi', d: 'Kadın elbise dikimi · bluz · etek kısaltma · elbise daraltma · bel daraltma · abiye tamiri · gelinlik tadilatı · büyük beden', p: '₺150+' },
    en: { n: "Women's Tailor", d: 'Dress making · blouse · skirt shortening · dress taking in · evening gown repair · wedding dress · plus size', p: '₺150+' },
    ru: { n: 'Женский портной', d: 'Платья · блузки · юбки · заужение · вечерние платья · свадебные платья · большие размеры', p: '₺150+' },
    de: { n: 'Damenschneiderin', d: 'Kleider · Blusen · Röcke kürzen · Kleid einengen · Abendkleider · Brautkleid · Übergrößen', p: '₺150+' } },
  { icon: '💍', id: 'gelinlik',
    img: 'https://images.pexels.com/photos/4620863/pexels-photo-4620863.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Gelinlik abiye özel gün kıyafeti dikimi Antalya — Terzi Can',
    tr: { n: 'Gelinlik · Abiye · Özel Gün', d: 'Gelinlik dikimi · gelinlik tadilatı · damatlık · abiye dikimi · abiye tamiri · nişan elbisesi · kına kıyafeti', p: '₺400+' },
    en: { n: 'Wedding · Evening · Special', d: 'Wedding dress · bridal alterations · groom suit · evening gown · engagement dress. Perfect fit guaranteed.', p: '₺400+' },
    ru: { n: 'Свадьба · Вечер · Торжество', d: 'Свадебное платье · подгонка · смокинг · вечернее платье · платье на помолвку.', p: '₺400+' },
    de: { n: 'Hochzeit · Abend · Anlass', d: 'Brautkleid · Anpassung · Smoking · Abendkleid · Verlobungskleid. Perfekte Passform.', p: '₺400+' } },
  { icon: '🏨', id: 'uniforma',
    img: 'https://images.pexels.com/photos/3768167/pexels-photo-3768167.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Otel üniforma aşçı garson personel dikimi Antalya — Terzi Can',
    tr: { n: 'Üniforma Üretimi', d: 'Otel · resepsiyon · aşçı · garson · güvenlik · spa · animatör · okul · spor takımı. Tasarım + seri imalat + nakış.', p: 'Teklif Al' },
    en: { n: 'Uniform Production', d: 'Hotel · reception · chef · waiter · security · spa · school · sports. Design + mass production + embroidery.', p: 'Get Quote' },
    ru: { n: 'Производство формы', d: 'Гостиницы · повара · официанты · охрана · спа · школа. Дизайн + производство + вышивка.', p: 'Запрос' },
    de: { n: 'Uniformproduktion', d: 'Hotelpersonal · Köche · Kellner · Sicherheit · Spa · Schule. Design + Produktion + Stickerei.', p: 'Angebot' } },
  { icon: '🏭', id: 'atolye',
    img: 'https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Dikiş atölyesi tişört sweatshirt pantolon seri imalat Antalya — Terzi Can',
    tr: { n: 'Tekstil İmalatı · Seri Üretim', d: 'Tişört · sweatshirt · pantolon · gömlek · mont · şort · gobi seri üretimi. Kalıp çıkarma · fason · numune · prototip.', p: 'Teklif Al' },
    en: { n: 'Textile Manufacturing', d: 'T-shirt · sweatshirt · trousers · shirt · coat · shorts · gobi mass production. Pattern · sample · prototype.', p: 'Get Quote' },
    ru: { n: 'Производство текстиля', d: 'Футболки · худи · брюки · рубашки · куртки серийно. Лекала · образцы · прототип.', p: 'Запрос' },
    de: { n: 'Textilproduktion', d: 'T-Shirts · Sweatshirts · Hosen · Hemden · Mäntel Serienproduktion. Schnittmuster · Muster · Prototyp.', p: 'Angebot' } },
  { icon: '🪡', id: 'nakis',
    img: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Nakış logo baskı tişört sweatshirt dikimi Antalya — Terzi Can',
    tr: { n: 'Nakış · Baskı · Özel Dikim', d: 'Logo nakışı · isim nakışı · dijital baskı · serigrafi. Sweatshirt · tişört · eşofman · kapüşonlu · polo · gobi seri dikimi.', p: '₺100+' },
    en: { n: 'Embroidery · Print · Custom', d: 'Logo embroidery · digital print · screen print. Sweatshirt · t-shirt · tracksuit · hoodie · polo production.', p: '₺100+' },
    ru: { n: 'Вышивка · Печать · Пошив', d: 'Вышивка логотипа · цифровая печать. Толстовки · футболки · спортивные костюмы · поло.', p: '₺100+' },
    de: { n: 'Stickerei · Druck · Produktion', d: 'Logo-Stickerei · Digitaldruck. Sweatshirts · T-Shirts · Trainingsanzüge · Polo-Produktion.', p: '₺100+' } },
  { icon: '🧺', id: 'kuru-temizleme',
    img: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Kuru temizleme ütü çamaşır hizmeti otel Antalya — Terzi Can',
    tr: { n: 'Kuru Temizleme & Ütü', d: 'Kuru temizleme · çamaşır yıkama · ütü. Otel ve adreslerden kurye alım. 24 saat ekspres. Turistler için.', p: '₺80+/kg' },
    en: { n: 'Dry Cleaning & Laundry', d: 'Dry cleaning · laundry · ironing. Hotel courier pickup. 24h express. For tourists.', p: '₺80+/kg' },
    ru: { n: 'Химчистка · Стирка', d: 'Химчистка · стирка · глажка. Курьер из отеля. Экспресс 24ч.', p: '₺80+/кг' },
    de: { n: 'Reinigung · Wäsche', d: 'Chemische Reinigung · Wäsche · Bügeln. Kurierabholung im Hotel. 24h Express.', p: '₺80+/kg' } },
];

const PRICES: Record<Lang, string[][]> = {
  tr:[
    ['Paça / Pantolon / Etek Kısaltma','₺150+','Aynı gün'],
    ['Bel Daraltma','₺150+','24 saat'],
    ['Elbise Tamiri','₺150+','Aynı gün'],
    ['Gömlek Tamiri','₺150+','Aynı gün'],
    ['T-Shirt Tamiri','₺100+','Aynı gün'],
    ['Fermuar Değişimi — Pantolon/Kot','₺200+','Aynı gün'],
    ['Fermuar Değişimi — Mont/Ceket','₺200+','24 saat'],
    ['Kol Kısaltma','₺200+','48 saat'],
    ['Yırtık Onarımı','₺100+','Aynı gün'],
    ['Erkek Takım Elbise Dikimi','₺2.500+','5–7 gün'],
    ['Erkek Gömlek Dikimi','₺400+','3–5 gün'],
    ['Kadın Elbise Dikimi','₺800+','3–7 gün'],
    ['Gelinlik Tadilatı','₺400+','3–5 gün'],
    ['Abiye Tamiri','₺350+','48 saat'],
    ['Tişört / Sweatshirt Dikimi','₺150+','3–5 gün'],
    ['Pantolon / Şort / Gobi Dikimi','₺200+','3–5 gün'],
    ['Kuru Temizleme (Elbise)','₺300+','48 saat'],
    ['Kuru Temizleme (Mont)','₺500+','48 saat'],
    ['Çamaşır & Ütü (kg)','₺80+/kg','24 saat'],
    ['Üniforma (kişi başı)','Teklif','Sipariş miktarına göre'],
  ],
  en:[
    ['Trouser / Skirt Hemming','₺150+','Same day'],
    ['Waist Taking In','₺150+','24h'],
    ['Dress Repair','₺150+','Same day'],
    ['Shirt Repair','₺150+','Same day'],
    ['T-Shirt Repair','₺100+','Same day'],
    ['Zip — Trousers / Jeans','₺200+','Same day'],
    ['Zip — Coat / Jacket','₺200+','24h'],
    ['Sleeve Shortening','₺200+','48h'],
    ['Tear Repair','₺100+','Same day'],
    ["Men's Bespoke Suit",'₺2,500+','5–7 days'],
    ["Men's Shirt",'₺400+','3–5 days'],
    ["Women's Dress",'₺800+','3–7 days'],
    ['Wedding Dress Alteration','₺400+','3–5 days'],
    ['Evening Gown Repair','₺350+','48h'],
    ['T-Shirt / Sweatshirt','₺150+','3–5 days'],
    ['Trouser / Short / Gobi','₺200+','3–5 days'],
    ['Dry Cleaning (Dress)','₺300+','48h'],
    ['Dry Cleaning (Coat)','₺500+','48h'],
    ['Laundry & Ironing','₺80+/kg','24h'],
    ['Uniform (per person)','Quote','On quantity'],
  ],
  ru:[
    ['Подгонка брюк / юбки','₺150+','В тот же день'],
    ['Заужение талии','₺150+','24 ч'],
    ['Ремонт платья','₺150+','В тот же день'],
    ['Ремонт рубашки','₺150+','В тот же день'],
    ['Ремонт футболки','₺100+','В тот же день'],
    ['Молния — брюки/джинсы','₺200+','В тот же день'],
    ['Молния — пальто/пиджак','₺200+','24 ч'],
    ['Укорочение рукавов','₺200+','48 ч'],
    ['Ремонт разрыва','₺100+','В тот же день'],
    ['Мужской костюм','₺2.500+','5–7 дней'],
    ['Мужская рубашка','₺400+','3–5 дней'],
    ['Женское платье','₺800+','3–7 дней'],
    ['Свадебное платье','₺400+','3–5 дней'],
    ['Вечернее платье','₺350+','48 ч'],
    ['Футболка / Толстовка','₺150+','3–5 дней'],
    ['Брюки / Шорты','₺200+','3–5 дней'],
    ['Химчистка (платье)','₺300+','48 ч'],
    ['Химчистка (пальто)','₺500+','48 ч'],
    ['Стирка и глажка','₺80+/кг','24 ч'],
    ['Форма','Запрос','По заказу'],
  ],
  de:[
    ['Hose / Rock kürzen','₺150+','Gleicher Tag'],
    ['Bund einengen','₺150+','24h'],
    ['Kleid reparieren','₺150+','Gleicher Tag'],
    ['Hemd reparieren','₺150+','Gleicher Tag'],
    ['T-Shirt reparieren','₺100+','Gleicher Tag'],
    ['Reißverschluss — Hose/Jeans','₺200+','Gleicher Tag'],
    ['Reißverschluss — Mantel/Jacke','₺200+','24h'],
    ['Ärmel kürzen','₺200+','48h'],
    ['Riss reparieren','₺100+','Gleicher Tag'],
    ['Herrenmaßanzug','₺2.500+','5–7 Tage'],
    ['Herrenhemd','₺400+','3–5 Tage'],
    ['Damenkleid','₺800+','3–7 Tage'],
    ['Brautkleid','₺400+','3–5 Tage'],
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
  {ilce:'Muratpaşa', m:['Fener','Kışla','Balbey','Kaleiçi','Meltem','Lara','Şirinyalı']},
  {ilce:'Konyaaltı', m:['Hurma','Sarısu','Liman','Uncalı','Arapsuyu','Gürsu','Çakırlar','Meltem','Göbi','Öğretmenevleri']},
  {ilce:'Kepez',     m:['Varsak','Santral','Pınarbaşı','Altındağ','Göksu','Atatürk']},
  {ilce:'Döşemealtı',m:['Döşemealtı Merkez','Habibler','Çığlık','Erenköy']},
  {ilce:'Aksu',      m:['Kundu','Güzeloba','Altıntaş','Boğazkent','Kadriye']},
  {ilce:'Lara / Belek',m:['Belek','Kadriye','Boğazkent','Kundu','Ilıca']},
  {ilce:'Kemer',     m:['Kemer Merkez','Beldibi','Göynük','Çamyuva','Tekirova','Kiriş']},
  {ilce:'Alanya',    m:['Alanya Merkez','Mahmutlar','Oba','Tosmur','Avsallar','Kestel','Konaklı']},
  {ilce:'Manavgat/Side',m:['Manavgat Merkez','Side','Sorgun','Kumköy','Evrenseki']},
  {ilce:'Serik',     m:['Serik Merkez','Boğazkent','Belek yakını']},
  {ilce:'Kaş & Diğer',m:['Kaş Merkez','Kalkan','Finike','Kumluca','Gazipaşa']},
];

const ALT_SAYFALAR = [
  ['✂️','Paça Kısaltma Antalya','/terzi/paca-kisaltma-antalya'],
  ['👔','Bay Terzi Antalya','/terzi/bay-terzi-antalya'],
  ['👗','Bayan Terzi Antalya','/terzi/bayan-terzi-antalya'],
  ['🏭','Dikiş Atölyesi Antalya','/terzi/dikis-atolyesi-antalya'],
  ['🏨','Üniforma Üretimi Antalya','/terzi/uniforma-uretimi-antalya'],
  ['🧺','Kuru Temizleme Antalya','/terzi/kuru-temizleme-antalya'],
  ['🚗','Eve Gelen Terzi Antalya','/terzi/eve-gelen-terzi-antalya'],
  ['🔗','Fermuar Değişimi Antalya','/terzi/fermuar-degisimi-antalya'],
  ['💍','Gelinlik Tadilatı Antalya','/terzi/gelinlik-tadilati-antalya'],
] as const;

const WHY = [
  { icon:'⚡', tr:['Max 24 Saat','Ekspres teslimat garantisi'], en:['Max 24h Express','Guaranteed delivery'], ru:['Макс 24 часа','Гарантия экспресс-доставки'], de:['Max 24h Express','Garantierte Lieferung'] },
  { icon:'📍', tr:['Yerinde Ölçü','Adresinize gelip ölçü alıyoruz'], en:['On-Site Fitting','We come to your address'], ru:['Замеры на месте','Приедем по адресу'], de:['Maß vor Ort','Wir kommen zu Ihnen'] },
  { icon:'🚗', tr:['Araçlı Servis','Eve ve otele gelen terzi'], en:['Mobile Tailor','We come to you'], ru:['Выездной портной','Приедем к вам'], de:['Mobiler Schneider','Kommen zu Ihnen'] },
  { icon:'🌍', tr:['4 Dil','TR · EN · RU · DE'], en:['4 Languages','TR · EN · RU · DE'], ru:['4 языка','TR · EN · RU · DE'], de:['4 Sprachen','TR · EN · RU · DE'] },
  { icon:'🏨', tr:['Otele Teslimat','Tüm Antalya otellerine'], en:['Hotel Delivery','All Antalya hotels'], ru:['Доставка в отель','Все отели Антальи'], de:['Hotel Lieferung','Alle Antalya-Hotels'] },
  { icon:'👔', tr:['Bay & Bayan','Erkek ve kadın kıyafeti uzman ekip'], en:['Men & Women','Specialist team for both'], ru:['Мужской & Женский','Специалисты для обоих'], de:['Herren & Damen','Spezialisiert für beide'] },
  { icon:'🏭', tr:['Tekstil İmalatı','Tişört, sweatshirt, pantolon seri üretim'], en:['Textile Mfg','T-shirt, sweatshirt, trousers production'], ru:['Производство','Серийное производство'], de:['Textilproduktion','Serienproduktion'] },
  { icon:'⭐', tr:['4.9 · 94 Yorum',"Google'da en yüksek puan"], en:['4.9 · 94 Reviews','Highest rated in Antalya'], ru:['4.9 · 94 клиента','Лучший рейтинг'], de:['4,9 · 94 Bewertungen','Beste Bewertung'] },
];

const REVIEWS = [
  { stars:5, text:'"Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım ve seri üretim mükemmeldi!"', author:'Murat B.', flag:'🇹🇷', city:'Antalya', date:'Ocak 2025' },
  { stars:5, text:'"Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit!"', author:'Sarah M.', flag:'🇬🇧', city:'London', date:'Mayıs 2025' },
  { stars:5, text:'"Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили в отель!"', author:'Наталья К.', flag:'🇷🇺', city:'Москва', date:'Haziran 2025' },
  { stars:5, text:'"Bestickte Sweatshirts — 30 Stück, pünktlich geliefert. Ausgezeichnete Qualität!"', author:'David K.', flag:'🇩🇪', city:'Berlin', date:'Şubat 2025' },
  { stars:5, text:'"Gelinliğimi mükemmel teslim ettiler. Paça kısaltmayı aynı gün yaptılar. Harika hizmet!"', author:'Elif Y.', flag:'🇹🇷', city:'Antalya', date:'Nisan 2025' },
  { stars:5, text:'"Suit altered for a business meeting in 24h. Perfect fit. Best tailor in Antalya!"', author:'James T.', flag:'🇦🇺', city:'Sydney', date:'Mart 2025' },
];

const SEO_INTRO: Record<Lang, string> = {
  tr: "Antalya'nın köklü terzisi Terzi Can. Bay terzisi: erkek takım elbise, pantolon kısaltma, gömlek, ceket. Bayan terzisi: kadın elbise, etek, abiye, gelinlik tadilatı. Özel dikim: beden ölçüsüne göre tasarım, yerinde ölçü alma. Tekstil imalatı: tişört, sweatshirt, pantolon, gömlek, mont, şort, gobi seri üretimi. Dikiş atölyesi. Kuru temizleme. Üniforma üretimi. Tüm Antalya ilçelerine araçlı terzi servisi.",
  en: "Tailor Can — Antalya's best English-speaking tailor. Men's: bespoke suits, trouser hemming, shirts, waist alterations. Women's: dress making, alterations, wedding dresses. Custom tailoring: on-site measurements. Textile manufacturing: t-shirts, sweatshirts, trousers, shorts mass production. Sewing workshop. Dry cleaning. Uniform production. Mobile tailor all Antalya.",
  ru: "Портной Кан — опытный портной в Анталье. Мужской: костюмы, брюки, рубашки, заужение. Женский: платья, подгонка, свадебные платья. Пошив на заказ по меркам. Текстильное производство: футболки, худи, брюки, шорты. Ателье. Химчистка. Форма. Выездной сервис.",
  de: "Schneider Can — Antalya mit deutschsprachigem Service. Herrenschneider: Anzüge, Hosen, Hemden, Bund einengen. Damenschneiderin: Kleider, Abendkleider, Brautkleid. Maßanfertigung. Textilproduktion: T-Shirts, Sweatshirts, Hosen, Shorts. Nähwerkstatt. Reinigung. Uniformproduktion. Mobiler Schneider.",
};

const LABELS = {
  tr: { badge:'✦ Antalya · Terzi Can', h1:"Antalya'nın", h1em:'Terzisi', sub:'Bay Terzi · Bayan Terzi · Özel Dikim · Tadilat · Tekstil İmalatı · Üniforma · Kuru Temizleme', waBtn:"WhatsApp'tan Yazın", downBtn:'Hizmetleri Gör ↓', waMsg:'Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.', mobileMsg:'Merhaba, adresime terzi servisi istiyorum. Yerinde ölçü alabilir misiniz?', hours:'09:00–19:00 · Pzt–Cmt', mapBtn:'📍 Google Maps', quoteBtn:'📲 Ücretsiz Teklif Al', bulkBtn:'🏭 Toplu Sipariş Teklifi', mobileCta:'🚗 Terzi Servisi Talep Et', reviewLabel:'Değerlendirme', priceTitle:'Terzi Fiyatları 2026', priceNote:"Başlangıç fiyatları — kesin teklif için WhatsApp'tan fotoğraf gönderin", areaLabel:'İlçeye tıklayın — mahalleleri görün', allSvcTitle:'Tüm Hizmet Sayfalarımız', contactTitle:'Hızlı İletişim', contactNote:'Hızlı yanıt için WhatsApp tercih edin.', gbpLabel:'Google Business Profillerimiz', gbpNote:'Her iki profilimizde yorum yazabilirsiniz:', bayBayanH:'Bay & Bayan Terzi', faqTitle:'Sık Sorulan Sorular', konum:'Konumumuz', konumNote:'Konyaaltı Liman Mah. ve Hurma Mah. olmak üzere iki atölyemiz var.', reviewTitle:'Yorum Yaz' },
  en: { badge:'✦ Antalya · Tailor Can', h1:"Antalya's", h1em:'Master Tailor', sub:"Men's · Women's · Custom Tailoring · Alterations · Textile Manufacturing · Uniforms · Dry Cleaning", waBtn:'WhatsApp Us Now', downBtn:'View Services ↓', waMsg:'Hello, I would like information about your tailoring service.', mobileMsg:'Hello, I would like your mobile tailor service. Can you come to my address?', hours:'09:00–19:00 · Mon–Sat', mapBtn:'📍 Google Maps', quoteBtn:'📲 Get Free Quote', bulkBtn:'🏭 Bulk Order Quote', mobileCta:'🚗 Request Mobile Tailor', reviewLabel:'Reviews', priceTitle:'Price List 2026', priceNote:'Starting prices — send a photo on WhatsApp for an exact quote', areaLabel:'Tap a district to see neighborhoods', allSvcTitle:'All Service Pages', contactTitle:'Quick Contact', contactNote:'For instant reply, prefer WhatsApp.', gbpLabel:'Our Google Business Profiles', gbpNote:'You can leave a review on either profile:', bayBayanH:"Men's & Women's Tailor", faqTitle:'FAQ', konum:'Our Location', konumNote:'Two ateliers: Liman Mah. and Hurma Mah., Konyaaltı.', reviewTitle:'Write a Review' },
  ru: { badge:'✦ Анталья · Портной Кан', h1:'Лучший', h1em:'Портной Антальи', sub:'Мужской · Женский · Пошив на заказ · Переделка · Текстиль · Химчистка · Форма', waBtn:'Написать в WhatsApp', downBtn:'Смотреть услуги ↓', waMsg:'Здравствуйте, хотел бы узнать о ваших услугах портного.', mobileMsg:'Здравствуйте, хочу выездной сервис. Приедете для снятия мерок?', hours:'09:00–19:00 · Пн–Сб', mapBtn:'📍 Google Maps', quoteBtn:'📲 Бесплатная оценка', bulkBtn:'🏭 Оптовый заказ', mobileCta:'🚗 Вызвать портного', reviewLabel:'Отзывов', priceTitle:'Цены 2026', priceNote:'Начальные цены — фото в WhatsApp для точной оценки', areaLabel:'Нажмите на район', allSvcTitle:'Все страницы услуг', contactTitle:'Быстрый контакт', contactNote:'Для быстрого ответа — WhatsApp.', gbpLabel:'Наши профили Google Business', gbpNote:'Вы можете оставить отзыв в любом профиле:', bayBayanH:'Мужской и женский портной', faqTitle:'Вопросы', konum:'Наше местоположение', konumNote:'Два ателье: Liman Mah. и Hurma Mah., Коньяалты.', reviewTitle:'Написать отзыв' },
  de: { badge:'✦ Antalya · Schneider Can', h1:'Antalyas', h1em:'Meisterschneider', sub:'Herren · Damen · Maßanfertigung · Änderungen · Textilproduktion · Uniformen · Reinigung', waBtn:'WhatsApp schreiben', downBtn:'Leistungen ↓', waMsg:'Hallo, ich möchte Informationen über Ihren Schneiderservice.', mobileMsg:'Hallo, ich möchte den mobilen Schneiderdienst für Maßabnahme.', hours:'09:00–19:00 · Mo–Sa', mapBtn:'📍 Google Maps', quoteBtn:'📲 Kostenloses Angebot', bulkBtn:'🏭 Großauftrag', mobileCta:'🚗 Mobilen Schneider anfragen', reviewLabel:'Bewertungen', priceTitle:'Preise 2026', priceNote:'Startpreise — Foto per WhatsApp für genaues Angebot', areaLabel:'Bezirk antippen', allSvcTitle:'Alle Serviceseiten', contactTitle:'Schneller Kontakt', contactNote:'WhatsApp für schnelle Antwort.', gbpLabel:'Unsere Google Business Profile', gbpNote:'Sie können in beiden Profilen eine Bewertung hinterlassen:', bayBayanH:'Herren- & Damenschneider', faqTitle:'Fragen', konum:'Unser Standort', konumNote:'Zwei Ateliers: Liman Mah. und Hurma Mah., Konyaaltı.', reviewTitle:'Bewertung schreiben' },
};

const FAQ: Record<Lang, [string, string][]> = {
  tr:[
    ['Paça kısaltma fiyatı 2026?', `₺150'den başlar, aynı gün teslim. WhatsApp: ${PHONE_DISPLAY}`],
    ['Fermuar değişimi kaç lira?', `Pantolon/kot/mont/ceket fermuarı ₺200. Aynı gün teslim mümkün. WhatsApp: ${PHONE_DISPLAY}`],
    ['Bel daraltma ve elbise daraltma fiyatı?', `Bel daraltma ₺150'den başlar. WhatsApp: ${PHONE_DISPLAY}`],
    ['Yerinde ölçü alma ve adrese teslim var mı?', `Evet! Adresinize gelip yerinde ölçü alıyor, dikip tekrar teslim ediyoruz. Tüm Antalya. WhatsApp: ${PHONE_DISPLAY}`],
    ['Tişört, sweatshirt, pantolon, gobi imalatı?', `Evet! Tüm tekstil ürünlerinin özel dikimi ve seri imalatını yapıyoruz. WhatsApp: ${PHONE_DISPLAY}`],
    ['Bay terzi Antalya — erkek kıyafet dikimi?', `Evet! Erkek takım elbise, pantolon, gömlek, ceket, blazer, smoking, damatlık. WhatsApp: ${PHONE_DISPLAY}`],
    ['Bayan terzi Antalya — kadın elbise dikimi?', `Evet! Elbise, bluz, etek, abiye tamiri, gelinlik tadilatı, büyük beden. WhatsApp: ${PHONE_DISPLAY}`],
    ['Dikiş atölyesi — fason ve seri imalat?', `Evet! Kalıp çıkarma, numune, prototip, seri imalat. Markalar için tam paket. WhatsApp: ${PHONE_DISPLAY}`],
    ['Hangi Antalya ilçelerine terzi servisi geliyor?', 'Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Aksu, Lara, Belek, Kemer, Alanya, Manavgat, Side, Serik ve tüm Antalya ilçelerine geliyoruz.'],
    ['Kuru temizleme ve ütü Antalya fiyatları?', 'Kuru temizleme ₺300, mont ₺500, çamaşır ₺80/kg. Otelden kurye alım. 24 saat ekspres.'],
  ],
  en:[
    ['How much is trouser hemming in Antalya?', 'From ₺150. Same day. WhatsApp a photo for a free quote.'],
    ['Zip replacement cost?', 'Trousers/jeans/coat/jacket zip ₺200. Same-day available.'],
    ['Waist alteration and dress taking in?', 'From ₺150. WhatsApp for an exact quote.'],
    ['Do you offer on-site measurements and home delivery?', 'Yes! We come to your address, take measurements on-site, sew, and deliver back. All Antalya.'],
    ['Do you produce t-shirts, sweatshirts, trousers, shorts, gobi?', 'Yes! Custom and mass production of all textile items. With embroidery and print.'],
    ["Do you offer men's tailoring?", 'Yes! Bespoke suits, trouser hemming, shirts, jackets, blazers, tuxedos, groom suits.'],
    ["Do you offer women's tailoring?", 'Yes! Dress making, skirts, evening gown repair, wedding dress alterations, plus size.'],
    ['Sewing workshop for mass production?', 'Yes! Pattern making, prototypes, mass production. Full package for brands.'],
    ['Which Antalya districts do you serve?', 'Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Lara, Belek, Kemer, Alanya, Manavgat, Side, Serik and all Antalya districts.'],
    ['Dry cleaning and ironing prices?', 'Dry cleaning ₺300, coat ₺500, laundry ₺80/kg. Hotel courier pickup. 24h express.'],
  ],
  ru:[
    ['Стоимость подгонки брюк в Анталье?', 'От ₺150. В тот же день. Отправьте фото в WhatsApp.'],
    ['Стоимость замены молнии?', 'Брюки/джинсы/пальто/пиджак ₺200. В тот же день.'],
    ['Заужение талии и платья?', 'От ₺150. WhatsApp для точной оценки.'],
    ['Замеры на месте и доставка на дом?', 'Да! Приедем по адресу, снимем мерки, сошьём и доставим. Вся Анталья.'],
    ['Производство футболок, худи, брюк, шорт?', 'Да! Серийное производство любого текстиля. С вышивкой и печатью.'],
    ['Есть мужской портной?', 'Да! Костюмы, брюки, рубашки, пиджаки, смокинг.'],
    ['Есть женский портной?', 'Да! Платья, юбки, вечерние платья, свадебные платья, большие размеры.'],
    ['Ателье для серийного производства?', 'Да! Лекала, образцы, серийное производство для брендов.'],
    ['В какие районы Антальи выезжаете?', 'Конъяалты, Муратпаша, Кепез, Лара, Белек, Кемер, Алания, Манавгат, Сиде, Серик и все районы Антальи.'],
    ['Химчистка и глажка?', 'Химчистка ₺300, пальто ₺500, стирка ₺80/кг. Курьер из отеля. 24ч.'],
  ],
  de:[
    ['Hosenänderung Preis in Antalya?', 'Ab ₺150. Gleicher Tag. Foto per WhatsApp.'],
    ['Reißverschluss-Kosten?', 'Hosen/Jeans/Mantel/Jacke ₺200. Expressdienst möglich.'],
    ['Bund einengen und Kleid einengen?', 'Ab ₺150. WhatsApp für genaues Angebot.'],
    ['Maßabnahme vor Ort und Lieferung?', 'Ja! Wir kommen zu Ihnen, nehmen Maße, schneidern und liefern zurück. Ganz Antalya.'],
    ['T-Shirts, Sweatshirts, Hosen, Shorts Produktion?', 'Ja! Serienproduktion aller Textilien. Mit Stickerei und Druck.'],
    ['Herrenschneider in Antalya?', 'Ja! Anzüge, Hosen, Hemden, Jacken, Blazer, Smoking.'],
    ['Damenschneiderin in Antalya?', 'Ja! Kleider, Röcke, Abendkleider, Brautkleid, Übergrößen.'],
    ['Nähwerkstatt Serienproduktion?', 'Ja! Schnittmuster, Prototypen, Serienproduktion für Marken.'],
    ['Welche Bezirke in Antalya?', 'Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Lara, Belek, Kemer, Alanya, Manavgat, Side, Serik und alle Bezirke.'],
    ['Reinigung und Bügeln?', 'Reinigung ₺300, Mantel ₺500, Wäsche ₺80/kg. Kurierabholung. 24h.'],
  ],
};

export default function TerziClient({ gbp1, gbp2 }: Props) {
  const [lang, setLang] = useState<Lang>('tr');
  const [activeIlce, setActiveIlce] = useState<string | null>(null);
  const [heroIdx, setHeroIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const L = LABELS[lang];

  useEffect(() => {
    const bl = (navigator.language || '').toLowerCase();
    if (bl.startsWith('de')) setLang('de');
    else if (bl.startsWith('ru')) setLang('ru');
    else if (bl.startsWith('en')) setLang('en');
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const el = stripRef.current; if (!el) return;
    let x = 0;
    const run = () => { x += 0.5; if (x >= el.scrollWidth / 2) x = 0; el.scrollLeft = x; };
    const id = setInterval(run, 16);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--gold:#B8975A;--gold2:#D4B07A;--gold3:#8A6E3E;--cream:#FAF7F2;--cream2:#F2EDE4;--ink:#1C1814;--ink2:#2E2820;--text:#3A3028;--muted:#7A6E62;--light:#F7F3ED;--serif:'Georgia',serif;--sans:var(--font-jakarta,system-ui,sans-serif);--unbounded:var(--font-unbounded,'Georgia',serif);--shadow:0 4px 32px rgba(60,40,20,.1);--shadow-lg:0 16px 64px rgba(60,40,20,.16)}
        html{scroll-behavior:smooth}
        body{background:var(--cream);color:var(--text);font-family:var(--sans);font-weight:300;line-height:1.7;overflow-x:hidden}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--cream2)}::-webkit-scrollbar-thumb{background:var(--gold3)}
        .tnav{position:fixed;top:0;left:0;right:0;z-index:200;padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;transition:all .4s}
        .tnav.up{background:rgba(250,247,242,.96);backdrop-filter:blur(20px);border-bottom:1px solid rgba(184,151,90,.15);padding:.8rem 2rem;box-shadow:0 2px 20px rgba(60,40,20,.07)}
        .tnav-logo{font-family:var(--unbounded);font-size:1.4rem;color:var(--ink);text-decoration:none;letter-spacing:.02em;font-weight:700}.tnav-logo span{color:var(--gold)}
        .tnav-links{display:flex;gap:2rem;list-style:none}.tnav-links a{color:var(--text);text-decoration:none;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;font-weight:500;transition:color .3s}.tnav-links a:hover{color:var(--gold)}
        .lsw{display:flex;gap:.3rem}.lb{background:none;border:1px solid rgba(184,151,90,.25);color:var(--muted);font-size:.67rem;padding:.25rem .5rem;cursor:pointer;font-family:var(--sans);text-transform:uppercase;letter-spacing:.08em;transition:all .25s;border-radius:2px}.lb.on,.lb:hover{border-color:var(--gold);color:var(--gold);background:rgba(184,151,90,.08)}
        .thero{position:relative;height:100vh;min-height:700px;overflow:hidden;display:flex;align-items:flex-end}
        .thslide{position:absolute;inset:0;transition:opacity 1.2s ease}.thslide img{width:100%;height:100%;object-fit:cover;object-position:center 20%}.thslide.active{opacity:1}.thslide.inactive{opacity:0}
        .thov{position:absolute;inset:0;background:linear-gradient(to top,rgba(28,24,20,.78) 0%,rgba(28,24,20,.18) 50%,rgba(28,24,20,.08) 100%)}
        .thc{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 2rem 5rem;width:100%}
        .thbadge{display:inline-flex;align-items:center;gap:.6rem;font-size:.68rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.9);border:1px solid rgba(255,255,255,.35);padding:.35rem 1rem;margin-bottom:1.8rem;backdrop-filter:blur(4px);background:rgba(255,255,255,.08)}
        .thero h1{font-family:var(--unbounded);font-size:clamp(2.5rem,7vw,6rem);line-height:.95;font-weight:700;color:#fff;letter-spacing:-.02em}.thero h1 em{font-style:normal;color:var(--gold2)}
        .thsub{margin-top:1.4rem;font-size:.92rem;color:rgba(255,255,255,.8);max-width:520px;letter-spacing:.04em;line-height:1.9}
        .thacts{margin-top:2rem;display:flex;gap:.8rem;flex-wrap:wrap}
        .thdots{position:absolute;right:2rem;top:50%;transform:translateY(-50%);z-index:3;display:flex;flex-direction:column;gap:.5rem}.thdot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:all .3s;border:none}.thdot.on{background:#fff;transform:scale(1.4)}
        .tstrip-wrap{background:var(--ink);padding:1rem 0;overflow:hidden}.tstrip{display:flex;gap:4px;width:max-content;overflow:hidden;user-select:none}
        .tstrip-img{width:200px;height:140px;object-fit:cover;flex-shrink:0;filter:brightness(.7) saturate(.8);transition:filter .4s}.tstrip-img:hover{filter:brightness(1) saturate(1.1)}
        .tseoblk{background:var(--cream2);padding:2rem 2rem;border-left:3px solid var(--gold3)}.tseoblk p{font-size:.84rem;color:var(--muted);line-height:1.95;max-width:1100px;margin:0 auto}
        .tsvc{background:var(--cream)}.tsvc-head{padding:5rem 2rem 2.5rem;max-width:1200px;margin:0 auto}
        .tsvc-grid{display:grid;grid-template-columns:repeat(2,1fr)}
        .tsc{position:relative;overflow:hidden;min-height:400px;display:flex;flex-direction:column;justify-content:flex-end}.tsc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .7s ease}.tsc:hover img{transform:scale(1.04)}
        .tsc-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(28,24,20,.92) 0%,rgba(28,24,20,.2) 60%,transparent 100%)}
        .tsc-body{position:relative;z-index:2;padding:1.8rem}.tsc-ic{font-size:1.5rem;margin-bottom:.5rem}.tsc-h{font-family:var(--unbounded);font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:.4rem;letter-spacing:-.01em}.tsc-d{font-size:.78rem;color:rgba(255,255,255,.7);line-height:1.7;margin-bottom:.7rem}.tsc-p{font-size:.67rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--gold2);border:1px solid rgba(212,176,122,.3);padding:.22rem .65rem;display:inline-block}
        .tsc-line{position:absolute;bottom:0;left:1.8rem;right:1.8rem;height:1.5px;background:linear-gradient(to right,var(--gold),transparent);transform:scaleX(0);transform-origin:left;transition:transform .5s}.tsc:hover .tsc-line{transform:scaleX(1)}
        .twhy{background:var(--cream2);padding:5rem 2rem}.twhy-inner{max-width:1200px;margin:0 auto}.twhy-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:3rem}
        .twc{background:#fff;border-radius:2px;padding:1.5rem;border-top:2px solid transparent;transition:border-color .3s,box-shadow .3s}.twc:hover{border-color:var(--gold);box-shadow:var(--shadow)}.twc-ic{font-size:1.4rem;margin-bottom:.7rem}.twc-t{font-family:var(--unbounded);font-size:.85rem;font-weight:700;color:var(--ink);margin-bottom:.3rem}.twc-d{font-size:.75rem;color:var(--muted);line-height:1.5}
        .trev{background:var(--ink2);padding:5rem 2rem}.trev-inner{max-width:900px;margin:0 auto}.trev-grid{display:grid;grid-template-columns:1fr;gap:.8rem;margin-top:3rem}
        .trc{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:2px;padding:1.4rem}.trc-stars{color:#f59e0b;margin-bottom:.5rem;font-size:.9rem}.trc-txt{font-size:.85rem;color:rgba(255,255,255,.65);line-height:1.85;font-style:italic;margin-bottom:.7rem}.trc-auth{font-size:.74rem;color:var(--gold2);font-weight:500}
        .tprices{background:var(--light);padding:5rem 2rem}.tprices-inner{max-width:860px;margin:0 auto}.tptbl{width:100%;border-collapse:collapse;margin-top:2rem}
        .tptbl th{text-align:left;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);border-bottom:2px solid rgba(184,151,90,.2);padding:.7rem .8rem;font-weight:500}.tptbl th:not(:first-child){text-align:right}
        .tptbl td{padding:.85rem .8rem;font-size:.86rem;border-bottom:1px solid rgba(60,40,20,.06);color:var(--text)}.tptbl tr:nth-child(even) td{background:rgba(184,151,90,.03)}.tptbl tr:hover td{background:rgba(184,151,90,.07)}
        .tpr{color:var(--gold3);font-weight:700;text-align:right;white-space:nowrap;font-family:var(--unbounded);font-size:.82rem}.ttm{color:var(--muted);font-size:.72rem;text-align:right}
        /* ── KONUM / GBP ── */
        .tmap-sec{background:var(--cream);padding:5rem 2rem;border-top:1px solid rgba(184,151,90,.1)}
        .tmap-inner{max-width:1100px;margin:0 auto}
        .tmap-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:2rem}
        .tmap-card{background:#fff;border:1px solid rgba(184,151,90,.15);border-radius:4px;overflow:hidden;box-shadow:var(--shadow)}
        .tmap-card iframe{display:block;width:100%;height:260px;border:0}
        .tmap-info{padding:1.2rem 1.4rem}
        .tmap-name{font-family:var(--unbounded);font-size:.82rem;font-weight:700;color:var(--ink);margin-bottom:.3rem}
        .tmap-addr{font-size:.75rem;color:var(--muted);margin-bottom:.8rem;line-height:1.5}
        .tmap-btns{display:flex;gap:.5rem;flex-wrap:wrap}
        .tmap-btn{display:inline-flex;align-items:center;gap:.3rem;padding:.5rem 1rem;font-size:.7rem;font-weight:600;text-decoration:none;border-radius:3px;transition:all .2s}
        .tmap-btn-maps{background:#4285F4;color:#fff}.tmap-btn-maps:hover{background:#3367d6}
        .tmap-btn-route{background:#34A853;color:#fff}.tmap-btn-route:hover{background:#2d9244}
        .tmap-btn-review{border:1px solid var(--gold);color:var(--gold);background:transparent}.tmap-btn-review:hover{background:rgba(184,151,90,.08)}
        .tgbp-note{font-size:.78rem;color:var(--muted);margin-top:1.5rem;padding:1rem 1.2rem;background:rgba(184,151,90,.06);border-left:3px solid var(--gold);border-radius:0 3px 3px 0}
        /* ── AREAS ── */
        .tareas{background:var(--cream2);padding:5rem 2rem}.tareas-inner{max-width:1100px;margin:0 auto}
        .tilwrap{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;margin:2.5rem 0 1.2rem}
        .tilbtn{background:none;border:1px solid rgba(184,151,90,.2);color:var(--text);font-size:.76rem;padding:.4rem 1rem;cursor:pointer;font-family:var(--sans);border-radius:2px;transition:all .25s}.tilbtn.on,.tilbtn:hover{border-color:var(--gold);color:var(--gold3);background:rgba(184,151,90,.08)}
        .tmahwrap{background:#fff;border:1px solid rgba(184,151,90,.15);border-radius:2px;padding:1.2rem;display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.8rem;box-shadow:var(--shadow)}.tmchip{font-size:.72rem;color:var(--muted);border:1px solid rgba(184,151,90,.15);padding:.22rem .65rem;border-radius:2px}
        /* ── ALL SVC ── */
        .tallsvc{background:var(--ink);padding:5rem 2rem}.tallsvc-inner{max-width:1100px;margin:0 auto}
        .tallsvc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.8rem;margin-top:2.5rem}
        .tallsvc-link{display:flex;align-items:center;gap:.7rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:2px;padding:1rem 1.2rem;text-decoration:none;color:rgba(255,255,255,.85);font-size:.85rem;transition:all .25s}.tallsvc-link:hover{background:rgba(184,151,90,.1);border-color:rgba(184,151,90,.3);transform:translateY(-2px)}
        /* ── FAQ — details/summary (SSR-friendly, Google snippet) ── */
        .tfaq{background:var(--light);padding:5rem 2rem}.tfaq-inner{max-width:760px;margin:0 auto}
        .tfaqitem{border-bottom:1px solid rgba(184,151,90,.12)}
        details.tfaqitem>summary{padding:1.2rem 0;display:flex;align-items:center;justify-content:space-between;gap:.8rem;cursor:pointer;list-style:none;font-family:var(--sans);font-size:.9rem;color:var(--text);font-weight:500;transition:color .3s}
        details.tfaqitem>summary:hover{color:var(--gold3)}
        details.tfaqitem>summary::-webkit-details-marker{display:none}
        details.tfaqitem>summary::after{content:'+';flex-shrink:0;width:22px;height:22px;border:1px solid rgba(184,151,90,.35);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;color:var(--gold);transition:transform .35s;text-align:center;line-height:22px}
        details.tfaqitem[open]>summary::after{content:'×'}
        .tfaq-ans{padding:.25rem 0 1.2rem;font-size:.83rem;color:var(--muted);line-height:1.9;border-top:1px solid rgba(184,151,90,.08)}
        /* ── CONTACT ── */
        .tcontact{background:var(--ink);padding:5rem 2rem}.tcontact-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
        .tcrow{display:flex;gap:.8rem;align-items:flex-start;padding:.9rem 0;border-bottom:1px solid rgba(255,255,255,.06)}.tclbl{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold2);margin-bottom:.2rem;font-weight:500}.tcval{font-size:.9rem;color:rgba(255,255,255,.85)}.tcval a{color:rgba(255,255,255,.85);text-decoration:none;transition:color .3s}.tcval a:hover{color:var(--gold2)}
        .tfooter{background:var(--ink2);border-top:1px solid rgba(184,151,90,.1);padding:2.5rem 2rem;text-align:center}
        .tfootnav{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin-top:1.2rem}.tfootnav a{font-size:.72rem;color:rgba(212,176,122,.75);text-decoration:none;border:1px solid rgba(184,151,90,.18);padding:.25rem .65rem;border-radius:2px;transition:all .25s}.tfootnav a:hover{color:var(--gold2);border-color:rgba(184,151,90,.4)}
        .btn-gold{display:inline-flex;align-items:center;gap:.5rem;background:var(--gold);color:#fff;padding:.9rem 2rem;font-family:var(--sans);font-size:.78rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s}.btn-gold:hover{background:var(--gold3);transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,151,90,.35)}
        .btn-outline{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:rgba(255,255,255,.9);padding:.9rem 2rem;font-family:var(--sans);font-size:.78rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(255,255,255,.3);cursor:pointer;transition:all .3s}.btn-outline:hover{border-color:var(--gold2);color:var(--gold2)}
        .btn-outline-dark{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--gold3);padding:.85rem 1.8rem;font-family:var(--sans);font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(184,151,90,.35);cursor:pointer;transition:all .3s}.btn-outline-dark:hover{border-color:var(--gold);color:var(--gold)}
        .ey{font-size:.62rem;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:.6rem;display:block}
        .ey-light{color:var(--gold2)}
        .tst{font-family:var(--unbounded);font-size:clamp(1.6rem,3.5vw,2.8rem);font-weight:700;line-height:1.1;color:var(--ink);letter-spacing:-.02em}
        .tst-light{color:#fff}
        .tss{color:var(--muted);margin-top:.6rem;font-size:.88rem;max-width:480px}
        .tss-light{color:rgba(255,255,255,.5)}
        .tgl{display:block;width:40px;height:1.5px;background:var(--gold);margin-top:1rem}
        .tgl-center{margin-left:auto;margin-right:auto}
        .twafloat{position:fixed;bottom:1.8rem;right:1.8rem;z-index:150;width:3.2rem;height:3.2rem;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;font-size:1.4rem;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,.45);transition:transform .3s}.twafloat:hover{transform:scale(1.1)}
        .tmob{background:var(--ink);padding:5rem 2rem;position:relative;overflow:hidden}
        .tmob-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:3rem;background:rgba(255,255,255,.06)}
        .tmob-step{background:var(--ink);padding:2rem 1.5rem;text-align:center}.tmob-ic{font-size:2rem;margin-bottom:.8rem}.tmob-t{font-family:var(--unbounded);font-size:.9rem;color:var(--gold2);margin-bottom:.4rem;font-weight:600}.tmob-d{font-size:.75rem;color:rgba(255,255,255,.45);line-height:1.6}
        @media(max-width:900px){.tnav-links{display:none}.thero h1{font-size:2.5rem}.tsvc-grid{grid-template-columns:1fr}.tmob-steps{grid-template-columns:repeat(2,1fr)}.twhy-grid{grid-template-columns:repeat(2,1fr)}.tcontact-inner{grid-template-columns:1fr;gap:2rem}.tmap-grid{grid-template-columns:1fr}.lsw{flex-wrap:wrap}}
        @media(max-width:480px){.twhy-grid{grid-template-columns:1fr}.thacts{flex-direction:column}}
      `}</style>

      {/* WhatsApp float */}
      <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer" className="twafloat" aria-label="WhatsApp">💬</a>

      {/* NAV */}
      <nav className={`tnav${scrolled ? ' up' : ''}`}>
        <a href="#" className="tnav-logo">Terzi <span>Can</span></a>
        <ul className="tnav-links">
          <li><a href="#services">Hizmetler</a></li>
          <li><a href="#prices">Fiyatlar</a></li>
          <li><a href="#konum">Harita</a></li>
          <li><a href="#faq">SSS</a></li>
          <li><a href="#contact">İletişim</a></li>
        </ul>
        <div className="lsw">
          {(['tr','en','ru','de'] as Lang[]).map(l => (
            <button key={l} className={`lb${lang === l ? ' on' : ''}`} onClick={() => setLang(l)}>
              {l === 'tr' ? '🇹🇷' : l === 'en' ? '🇬🇧' : l === 'ru' ? '🇷🇺' : '🇩🇪'} {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="thero">
        {HERO_IMAGES.map((img, i) => (
          <div key={i} className={`thslide${i === heroIdx ? ' active' : ' inactive'}`}>
            <img src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
        <div className="thov" />
        <div className="thdots">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} className={`thdot${i === heroIdx ? ' on' : ''}`} onClick={() => setHeroIdx(i)} aria-label={`Slayt ${i + 1}`} />
          ))}
        </div>
        <div className="thc">
          <span className="thbadge">{L.badge}</span>
          <h1>{L.h1}<br /><em>{L.h1em}</em></h1>
          <p className="thsub">{L.sub}</p>
          <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span style={{ color: '#f59e0b', fontSize: '1rem' }}>⭐⭐⭐⭐⭐</span>
            <span style={{ fontSize: '.88rem', fontWeight: 700, color: '#fff', marginLeft: '.3rem' }}>4.9</span>
            <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.55)' }}>(94 {L.reviewLabel})</span>
          </div>
          <div className="thacts">
            <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold">💬 {L.waBtn}</a>
            <a href="#services" className="btn-outline">{L.downBtn}</a>
          </div>
        </div>
      </section>

      {/* FILM STRIP */}
      <div className="tstrip-wrap">
        <div className="tstrip" ref={stripRef}>
          {[...FILM_STRIP, ...FILM_STRIP].map((src, i) => (
            <img key={i} src={src} alt="Terzi Can Antalya" className="tstrip-img" loading="lazy" />
          ))}
        </div>
      </div>

      {/* SEO INTRO — Server-rendered, Google bunu okur */}
      <div className="tseoblk" id="terzi-can-ozet">
        <p>{SEO_INTRO[lang]}</p>
      </div>

      {/* SERVİSLER */}
      <section className="tsvc" id="services">
        <div className="tsvc-head">
          <span className="ey">✦ Hizmetler</span>
          <h2 className="tst">Antalya Terzi Hizmetleri</h2>
          <p className="tss">Paça kısaltma, fermuar, bel daraltma, özel dikim, tekstil imalatı ve daha fazlası.</p>
          <span className="tgl" />
        </div>
        <div className="tsvc-grid">
          {SERVICES.map((s, i) => (
            <article key={i} className="tsc" id={s.id}>
              <img src={s.img} alt={s.alt} loading={i < 2 ? 'eager' : 'lazy'} width="800" height="400" />
              <div className="tsc-ov" />
              <div className="tsc-body">
                <div className="tsc-ic">{s.icon}</div>
                <h3 className="tsc-h">{s[lang].n}</h3>
                <p className="tsc-d">{s[lang].d}</p>
                <span className="tsc-p">{s[lang].p}</span>
              </div>
              <div className="tsc-line" />
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', padding: '2.5rem 2rem 4rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', background: 'var(--cream)' }}>
          <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold">{L.quoteBtn}</a>
          <a href={WA(lang === 'tr' ? 'Merhaba, toplu tekstil sipariş için teklif almak istiyorum.' : 'Hello, bulk textile production quote please.')} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">{L.bulkBtn}</a>
        </div>
      </section>

      {/* NEDEN BİZ */}
      <section className="twhy">
        <div className="twhy-inner">
          <span className="ey">✦ Neden Terzi Can?</span>
          <h2 className="tst">10+ Yıllık Deneyim · 4 Dil · Tüm Antalya</h2>
          <span className="tgl" />
          <div className="twhy-grid">
            {WHY.map((w, i) => (
              <div key={i} className="twc">
                <div className="twc-ic">{w.icon}</div>
                <div className="twc-t">{w[lang][0]}</div>
                <div className="twc-d">{w[lang][1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÜŞTERİ YORUMLARI */}
      <section className="trev">
        <div className="trev-inner">
          <div style={{ textAlign: 'center' }}>
            <span className="ey ey-light">⭐ 4.9 / 5 · 94 {L.reviewLabel}</span>
            <h2 className="tst tst-light">Müşteri Yorumları</h2>
            <span className="tgl tgl-center" />
          </div>
          <div className="trev-grid">
            {REVIEWS.map((r, i) => (
              <article key={i} className="trc">
                <div className="trc-stars">{'⭐'.repeat(r.stars)}</div>
                <p className="trc-txt">{r.text}</p>
                <div className="trc-auth">{r.flag} {r.author} — {r.city} · <span style={{ color: 'rgba(255,255,255,.3)', fontWeight: 300 }}>{r.date}</span></div>
              </article>
            ))}
          </div>
          {/* Yorum butonları — her iki profil */}
          <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={gbp1.review} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '.75rem', padding: '.7rem 1.4rem' }}>
              ⭐ {L.reviewTitle} — {gbp1.name.split(' — ')[0]}
            </a>
            <a href={gbp2.review} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '.75rem', padding: '.7rem 1.4rem' }}>
              ⭐ {L.reviewTitle} — {gbp2.name.split(' — ')[0]}
            </a>
          </div>
        </div>
      </section>

      {/* FİYAT TABLOSU */}
      <section className="tprices" id="prices">
        <div className="tprices-inner">
          <span className="ey">₺ Fiyatlar</span>
          <h2 className="tst" id="hizmet-fiyatlari">{L.priceTitle}</h2>
          <p className="tss">{L.priceNote}</p>
          <span className="tgl" />
          <table className="tptbl">
            <thead>
              <tr>
                <th>{lang === 'tr' ? 'Hizmet' : lang === 'en' ? 'Service' : lang === 'ru' ? 'Услуга' : 'Leistung'}</th>
                <th>{lang === 'tr' ? 'Fiyat' : lang === 'en' ? 'Price' : lang === 'ru' ? 'Цена' : 'Preis'}</th>
                <th>{lang === 'tr' ? 'Süre' : lang === 'en' ? 'Time' : lang === 'ru' ? 'Время' : 'Zeit'}</th>
              </tr>
            </thead>
            <tbody>
              {PRICES[lang].map(([s, p, t], i) => (
                <tr key={i}><td>{s}</td><td className="tpr">{p}</td><td className="ttm">{t}</td></tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold">{L.quoteBtn}</a>
          </div>
        </div>
      </section>

      {/* ADRESE GELEN TERZİ */}
      <section className="tmob">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span className="ey ey-light">🚗 Adrese Gelen Terzi Servisi</span>
          <h2 className="tst tst-light">Kapınıza Geliyoruz</h2>
          <p className="tss tss-light">Araçlı terzi servisimizle tüm Antalya'ya hizmet veriyoruz.</p>
          <span className="tgl" />
          <div className="tmob-steps">
            {[
              ['📍', 'WhatsApp ile Yazın', 'Adresinizi ve hizmet talebinizi bildirin.'],
              ['📏', 'Terzi Gelir', 'Adresinize gelip yerinde ölçü alır.'],
              ['✂️', 'Atölyede Tamamlanır', 'Ölçüye göre 24 saatte hazır.'],
              ['🚗', 'Kapıya Teslim', 'Anlaşılan vakitte adresinize getirilir.'],
            ].map(([ic, t, d], i) => (
              <div key={i} className="tmob-step">
                <div className="tmob-ic">{ic}</div>
                <div className="tmob-t">{t}</div>
                <div className="tmob-d">{d}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href={WA(L.mobileMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold">{L.mobileCta}</a>
          </div>
        </div>
      </section>

      {/* GOOGLE HARİTA — İKİ PROFİL */}
      <section className="tmap-sec" id="konum">
        <div className="tmap-inner">
          <span className="ey">📍 {L.konum}</span>
          <h2 className="tst">Terzi Can — Google Business</h2>
          <p className="tss">{L.konumNote}</p>
          <span className="tgl" />

          <div className="tmap-grid">
            {/* Profil 1 */}
            <div className="tmap-card">
              <iframe
                src={gbp1.embed}
                width="100%" height="260"
                style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={gbp1.name}
              />
              <div className="tmap-info">
                <div className="tmap-name">{gbp1.name}</div>
                <div className="tmap-addr">📍 {gbp1.addr}</div>
                <div className="tmap-btns">
                  <a href={gbp1.maps} target="_blank" rel="noopener noreferrer" className="tmap-btn tmap-btn-maps">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    Maps
                  </a>
                  <a href={gbp1.short} target="_blank" rel="noopener noreferrer" className="tmap-btn tmap-btn-route">🗺️ Yol Tarifi</a>
                  <a href={gbp1.review} target="_blank" rel="noopener noreferrer" className="tmap-btn tmap-btn-review">⭐ {L.reviewTitle}</a>
                </div>
              </div>
            </div>

            {/* Profil 2 */}
            <div className="tmap-card">
              <iframe
                src={gbp2.embed}
                width="100%" height="260"
                style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={gbp2.name}
              />
              <div className="tmap-info">
                <div className="tmap-name">{gbp2.name}</div>
                <div className="tmap-addr">📍 {gbp2.addr}</div>
                <div className="tmap-btns">
                  <a href={gbp2.maps} target="_blank" rel="noopener noreferrer" className="tmap-btn tmap-btn-maps">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    Maps
                  </a>
                  <a href={gbp2.short} target="_blank" rel="noopener noreferrer" className="tmap-btn tmap-btn-route">🗺️ Yol Tarifi</a>
                  <a href={gbp2.review} target="_blank" rel="noopener noreferrer" className="tmap-btn tmap-btn-review">⭐ {L.reviewTitle}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="tgbp-note">
            <strong>💡 {L.gbpLabel}:</strong> {L.gbpNote}<br />
            <span style={{ fontSize: '.72rem', opacity: .7 }}>CID 1: {gbp1.cid} · CID 2: {gbp2.cid}</span>
          </div>
        </div>
      </section>

      {/* HİZMET BÖLGELERİ */}
      <section className="tareas" id="areas">
        <div className="tareas-inner">
          <div style={{ textAlign: 'center' }}>
            <span className="ey">📍 Hizmet Bölgeleri</span>
            <h2 className="tst">Antalya — Tüm İlçeler</h2>
            <p className="tss" style={{ margin: '.6rem auto 0' }}>{L.areaLabel}</p>
            <span className="tgl tgl-center" />
          </div>
          <div className="tilwrap">
            {ILCELER.map(({ ilce }) => (
              <button key={ilce} className={`tilbtn${activeIlce === ilce ? ' on' : ''}`} onClick={() => setActiveIlce(activeIlce === ilce ? null : ilce)}>
                {ilce}
              </button>
            ))}
          </div>
          {activeIlce && (
            <div className="tmahwrap">
              {ILCELER.find(i => i.ilce === activeIlce)?.m.map(m => (
                <span key={m} className="tmchip">{m}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TÜM HİZMET SAYFALARI */}
      <section className="tallsvc">
        <div className="tallsvc-inner">
          <div style={{ textAlign: 'center' }}>
            <span className="ey ey-light">✦ {L.allSvcTitle}</span>
            <span className="tgl tgl-center" />
          </div>
          <div className="tallsvc-grid">
            {ALT_SAYFALAR.map(([ic, label, href]) => (
              <Link key={href} href={href} className="tallsvc-link">
                <span style={{ fontSize: '1.2rem' }}>{ic}</span>
                <span>{label}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--gold2)', fontSize: '.8rem' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — <details>/<summary> — Google SSS snippet için SSR-friendly */}
      <section className="tfaq" id="faq">
        <div className="tfaq-inner">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="ey">FAQ</span>
            <h2 className="tst" id="sik-sorulan-sorular">{L.faqTitle}</h2>
            <span className="tgl tgl-center" />
          </div>
          {FAQ[lang].map(([q, a], i) => (
            <details key={i} className="tfaqitem" open={i < 3}>
              <summary>{q}</summary>
              <div className="tfaq-ans">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* İLETİŞİM */}
      <section className="tcontact" id="contact">
        <div className="tcontact-inner">
          <div>
            <span className="ey ey-light">✦ {L.contactTitle}</span>
            <h2 className="tst tst-light" style={{ fontStyle: 'italic' }}>{L.contactTitle}</h2>
            <p className="tss tss-light" style={{ marginBottom: '1.5rem' }}>{L.contactNote}</p>
            <address style={{ fontStyle: 'normal' }}>
              {[
                { ic: '📞', lbl: 'Telefon', val: <a href={`tel:+${PHONE_RAW}`}>{PHONE_DISPLAY}</a> },
                { ic: '💬', lbl: 'WhatsApp', val: <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer">{PHONE_DISPLAY}</a> },
                { ic: '🕐', lbl: 'Çalışma Saatleri', val: <span>{L.hours}</span> },
                { ic: '📍', lbl: 'Bölge', val: <span>{lang === 'tr' ? 'Tüm Antalya İlçeleri — Araçlı Terzi Servisi' : lang === 'en' ? 'All Antalya Districts — Mobile Tailor' : lang === 'ru' ? 'Все районы Антальи' : 'Alle Antalya-Bezirke'}</span> },
                { ic: '🌍', lbl: lang === 'tr' ? 'Diller' : 'Languages', val: <span>🇹🇷 TR · 🇬🇧 EN · 🇷🇺 RU · 🇩🇪 DE</span> },
              ].map(({ ic, lbl, val }, i) => (
                <div key={i} className="tcrow">
                  <span style={{ fontSize: '1rem', paddingTop: '.1rem' }}>{ic}</span>
                  <div><div className="tclbl">{lbl}</div><div className="tcval">{val}</div></div>
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem', marginTop: '2rem' }}>
                <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ justifyContent: 'center' }}>💬 WhatsApp</a>
                <a href={WA(L.mobileMsg)} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ justifyContent: 'center' }}>{L.mobileCta}</a>
                <a href={gbp1.maps} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ justifyContent: 'center' }}>{L.mapBtn} — {lang === 'tr' ? 'Liman' : 'Liman Mah.'}</a>
                <a href={gbp2.maps} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ justifyContent: 'center' }}>{L.mapBtn} — {lang === 'tr' ? 'Hurma' : 'Hurma Mah.'}</a>
              </div>
            </address>
          </div>
          {/* Haritalar — küçük boyut, iletişim bölümü için */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}>
              <iframe src={gbp1.embed} width="100%" height="200" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={gbp1.name} />
              <div style={{ padding: '.8rem 1rem', background: 'rgba(28,24,20,.97)', fontSize: '.72rem', color: 'rgba(255,255,255,.5)' }}>{gbp1.name} · {gbp1.addr}</div>
            </div>
            <div style={{ borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}>
              <iframe src={gbp2.embed} width="100%" height="200" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={gbp2.name} />
              <div style={{ padding: '.8rem 1rem', background: 'rgba(28,24,20,.97)', fontSize: '.72rem', color: 'rgba(255,255,255,.5)' }}>{gbp2.name} · {gbp2.addr}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tfooter">
        <div style={{ fontFamily: 'var(--unbounded)', fontSize: '1.1rem', color: 'var(--gold2)', marginBottom: '.4rem' }}>
          Terzi Can · Tailor Can · Портной Кан · Schneider Can
        </div>
        <p style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.3)', marginBottom: '.5rem' }}>
          © 2026 SwapHubs — Antalya Terzi · Bay & Bayan · Özel Dikim · Tekstil İmalatı · {PHONE_DISPLAY}
        </p>
        <p style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.2)', marginBottom: '.5rem' }}>
          Konyaaltı Terzi · Hurma Terzi · Liman Terzi · Uncalı Terzi · Sarısu Terzi · Çakırlar Terzi · Meltem Terzi · Göbi Terzi
        </p>
        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '.8rem' }}>
          <a href={gbp1.maps} target="_blank" rel="noopener noreferrer" style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.2)', textDecoration: 'none' }}>
            Google Business · {gbp1.name}
          </a>
          <span style={{ color: 'rgba(255,255,255,.1)' }}>·</span>
          <a href={gbp2.maps} target="_blank" rel="noopener noreferrer" style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.2)', textDecoration: 'none' }}>
            Google Business · {gbp2.name}
          </a>
        </div>
        <nav aria-label="Footer hizmet linkleri" className="tfootnav">
          {ALT_SAYFALAR.map(([, label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
      </footer>
    </>
  );
}
 
