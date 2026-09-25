'use client';
// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: app/terzi/TerziClient.tsx
// TAM OPTİMİZE VE FULL SÜRÜM:
//  1. [SEO & AI / GEO] Gelişmiş Schema.org JSON-LD (TailorShop, OfferCatalog, FAQPage)
//  2. [Turist & Otel SEO] Döviz (EUR/USD/RUB/TRY), ödeme tipleri, otelden alım-teslimat kurgusu
//  3. [Fix] Mahalle çiplerine (tmahwrap) dinamik SEO uyumlu <Link> yönlendirmeleri eklendi
//  4. [Multi-Lang SSR] Google & Yapay Zeka botları için SSS (FAQ) details/summary SSR yapısı
//  5. [A11y & Semantik] ARIA rolleri, semantik HTML5 etiketleri ve duyarlı CSS
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ANTALYA_ILCELERI } from '@/lib/turkiye-lokasyonlar';
import TerziMarketingBottomNav from '@/components/terzi/MarketingBottomNav';

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
}

const PHONE_RAW = '905318986418';
const PHONE_DISPLAY = '+90 531 898 64 18';
const WA = (msg: string) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9-]/g, '');

// Pexels CDN — hotlink stabil
const HERO_IMAGES = [
  { src: 'https://images.pexels.com/photos/6765658/pexels-photo-6765658.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop', alt: 'Terzi müşteriye takım elbise ölçüsü alıyor — Terzi Can Antalya' },
  { src: 'https://images.pexels.com/photos/18022030/pexels-photo-18022030.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop', alt: 'Kadın terzi dikiş makinesinde elbise dikiyor — Terzi Can Konyaaltı Antalya' },
  { src: 'https://images.pexels.com/photos/8459366/pexels-photo-8459366.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop', alt: 'Gelinlik prova odasında — Terzi Can Antalya' },
  { src: 'https://images.pexels.com/photos/31112215/pexels-photo-31112215.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop', alt: 'Tekstil imalat atölyesinde seri dikim — Terzi Can Antalya' },
];

const FILM_STRIP = [
  'https://images.pexels.com/photos/6765056/pexels-photo-6765056.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/6765658/pexels-photo-6765658.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/18022030/pexels-photo-18022030.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/8459366/pexels-photo-8459366.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/5378708/pexels-photo-5378708.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/31112215/pexels-photo-31112215.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/33952439/pexels-photo-33952439.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  'https://images.pexels.com/photos/5202797/pexels-photo-5202797.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
];

const SERVICES = [
  { icon: '✂️', id: 'tadilat',
    img: 'https://images.pexels.com/photos/6765056/pexels-photo-6765056.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Paça kısaltma fermuar değişimi bel daraltma tadilat Antalya — Terzi Can',
    tr: { n: 'Tamir & Tadilat', d: 'Paça kısaltma ₺150 · bel daraltma ₺150 · elbise daraltma · kol kısaltma · fermuar değişimi ₺200 · yırtık onarımı · düğme dikimi', p: '₺100+' },
    en: { n: 'Repairs & Alterations', d: 'Trouser hemming ₺150 · waist taking in · dress alterations · zip replacement ₺200 · sleeve shortening · tear repair', p: '₺100+' },
    ru: { n: 'Ремонт и переделка', d: 'Подгонка брюк ₺150 · заужение талии · заужение платья · замена молнии ₺200 · ремонт разрывов', p: '₺100+' },
    de: { n: 'Reparaturen & Änderungen', d: 'Hose kürzen ₺150 · Bund einengen · Kleid einengen · Reißverschluss ₺200 · Ärmel kürzen', p: '₺100+' } },
  { icon: '👔', id: 'bay-terzi',
    img: 'https://images.pexels.com/photos/6765658/pexels-photo-6765658.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Bay terzi erkek takım elbise özel dikim Antalya — Terzi Can',
    tr: { n: 'Bay Terzi', d: 'Erkek takım elbise dikimi · pantolon kısaltma · gömlek dikimi · ceket tadilatı · blazer · smoking · damatlık', p: '₺150+' },
    en: { n: "Men's Tailor", d: 'Bespoke suits · trouser hemming · shirt making · jacket alterations · blazer · tuxedo · groom suit', p: '₺150+' },
    ru: { n: 'Мужской портной', d: 'Пошив костюмов · подгонка брюк · рубашки · пиджаки · смокинг · костюм жениха', p: '₺150+' },
    de: { n: 'Herrenschneider', d: 'Maßanzüge · Hosenänderungen · Hemden · Jacken · Blazer · Smoking · Bräutigamanzug', p: '₺150+' } },
  { icon: '👗', id: 'bayan-terzi',
    img: 'https://images.pexels.com/photos/18022030/pexels-photo-18022030.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Bayan terzi kadın elbise dikimi özel dikim Antalya — Terzi Can',
    tr: { n: 'Bayan Terzi', d: 'Kadın elbise dikimi · bluz · etek kısaltma · elbise daraltma · bel daraltma · abiye tamiri · gelinlik tadilatı · büyük beden', p: '₺150+' },
    en: { n: "Women's Tailor", d: 'Dress making · blouse · skirt shortening · dress taking in · evening gown repair · wedding dress · plus size', p: '₺150+' },
    ru: { n: 'Женский портной', d: 'Платья · блузки · юбки · заужение · вечерние платья · свадебные платья · большие размеры', p: '₺150+' },
    de: { n: 'Damenschneiderin', d: 'Kleider · Blusen · Röcke kürzen · Kleid einengen · Abendkleider · Brautkleid · Übergrößen', p: '₺150+' } },
  { icon: '💍', id: 'gelinlik',
    img: 'https://images.pexels.com/photos/8459366/pexels-photo-8459366.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Gelinlik abiye özel gün kıyafeti dikimi Antalya — Terzi Can',
    tr: { n: 'Gelinlik · Abiye · Özel Gün', d: 'Gelinlik dikimi · gelinlik tadilatı · damatlık · abiye dikimi · abiye tamiri · nişan elbisesi · kına kıyafeti', p: '₺400+' },
    en: { n: 'Wedding · Evening · Special', d: 'Wedding dress · bridal alterations · groom suit · evening gown · engagement dress. Perfect fit guaranteed.', p: '₺400+' },
    ru: { n: 'Свадьба · Вечер · Торжество', d: 'Свадебное платье · подгонка · смокинг · вечернее платье · платье на помолвку.', p: '₺400+' },
    de: { n: 'Hochzeit · Abend · Anlass', d: 'Brautkleid · Anpassung · Smoking · Abendkleid · Verlobungskleid. Perfekte Passform.', p: '₺400+' } },
  { icon: '🏨', id: 'uniforma',
    img: 'https://images.pexels.com/photos/5378708/pexels-photo-5378708.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Otel üniforma aşçı garson personel dikimi Antalya — Terzi Can',
    tr: { n: 'Üniforma Üretimi', d: 'Otel · resepsiyon · aşçı · garson · güvenlik · spa · animatör · okul · spor takımı. Tasarım + seri imalat + nakış.', p: 'Teklif Al' },
    en: { n: 'Uniform Production', d: 'Hotel · reception · chef · waiter · security · spa · school · sports. Design + mass production + embroidery.', p: 'Get Quote' },
    ru: { n: 'Производство формы', d: 'Гостиницы · повара · официанты · охрана · спа · школа. Дизайн + производство + вышивка.', p: 'Запрос' },
    de: { n: 'Uniformproduktion', d: 'Hotelpersonal · Köche · Kellner · Sicherheit · Spa · Schule. Design + Produktion + Stickerei.', p: 'Angebot' } },
  { icon: '🏭', id: 'atolye',
    img: 'https://images.pexels.com/photos/31112215/pexels-photo-31112215.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Dikiş atölyesi tişört sweatshirt pantolon seri imalat Antalya — Terzi Can',
    tr: { n: 'Tekstil İmalatı · Seri Üretim', d: 'Tişört · sweatshirt · pantolon · gömlek · mont · şort · gobi seri üretimi. Kalıp çıkarma · fason · numune · prototip.', p: 'Teklif Al' },
    en: { n: 'Textile Manufacturing', d: 'T-shirt · sweatshirt · trousers · shirt · coat · shorts · gobi mass production. Pattern · sample · prototype.', p: 'Get Quote' },
    ru: { n: 'Производство текстиля', d: 'Футболки · худи · брюки · рубашки · куртки серийно. Лекала · образцы · прототип.', p: 'Запрос' },
    de: { n: 'Textilproduktion', d: 'T-Shirts · Sweatshirts · Hosen · Hemden · Mäntel Serienproduktion. Schnittmuster · Muster · Prototyp.', p: 'Angebot' } },
  { icon: '🪡', id: 'nakis',
    img: 'https://images.pexels.com/photos/33952439/pexels-photo-33952439.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Nakış logo baskı tişört sweatshirt dikimi Antalya — Terzi Can',
    tr: { n: 'Nakış · Baskı · Özel Dikim', d: 'Logo nakışı · isim nakışı · dijital baskı · serigrafi. Sweatshirt · tişört · eşofman · kapüşonlu · polo · gobi seri dikimi.', p: '₺100+' },
    en: { n: 'Embroidery · Print · Custom', d: 'Logo embroidery · digital print · screen print. Sweatshirt · t-shirt · tracksuit · hoodie · polo production.', p: '₺100+' },
    ru: { n: 'Вышивка · Печать · Пошив', d: 'Вышивка логотипа · цифровая печать. Толстовки · футболки · спортивные костюмы · поло.', p: '₺100+' },
    de: { n: 'Stickerei · Druck · Produktion', d: 'Logo-Stickerei · Digitaldruck. Sweatshirts · T-Shirts · Trainingsanzüge · Polo-Produktion.', p: '₺100+' } },
  { icon: '🧺', id: 'kuru-temizleme',
    img: 'https://images.pexels.com/photos/5202797/pexels-photo-5202797.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    alt: 'Kuru temizleme ütü çamaşır hizmeti otel Antalya — Terzi Can',
    tr: { n: 'Kuru Temizleme & Ütü', d: 'Kuru temizleme · çamaşır yıkama · ütü. Otel ve adreslerden kurye alım. 24 saat ekspres. Turistler için.', p: '₺80+/kg' },
    en: { n: 'Dry Cleaning & Laundry', d: 'Dry cleaning · laundry · ironing. Hotel courier pickup. 24h express. For tourists.', p: '₺80+/kg' },
    ru: { n: 'Химчистка · Стирка', d: 'Химчистка · стирка · глажка. Курьер из отеля. Экспресс 24ч.', p: '₺80+/кг' },
    de: { n: 'Reinigung · Wäsche', d: 'Chemische Reinigung · Wäsche · Bügeln. Kurierabholung im Hotel. 24h Express.', p: '₺80+/kg' } },
];

const PRICES: Record<Lang, string[][]> = {
  tr:[
    ['Paça / Pantolon / Etek Kısaltma','₺150+ / €5+','Aynı gün'],
    ['Bel Daraltma','₺150+ / €5+','24 saat'],
    ['Elbise Tamiri','₺150+ / €5+','Aynı gün'],
    ['Gömlek Tamiri','₺150+ / €5+','Aynı gün'],
    ['T-Shirt Tamiri','₺100+ / €3+','Aynı gün'],
    ['Fermuar Değişimi — Pantolon/Kot','₺200+ / €6+','Aynı gün'],
    ['Fermuar Değişimi — Mont/Ceket','₺200+ / €6+','24 saat'],
    ['Kol Kısaltma','₺200+ / €6+','48 saat'],
    ['Yırtık Onarımı','₺100+ / €3+','Aynı gün'],
    ['Erkek Takım Elbise Dikimi','₺2.500+ / €75+','5–7 gün'],
    ['Erkek Gömlek Dikimi','₺400+ / €12+','3–5 gün'],
    ['Kadın Elbise Dikimi','₺800+ / €25+','3–7 gün'],
    ['Gelinlik Tadilatı','₺400+ / €12+','3–5 gün'],
    ['Abiye Tamiri','₺350+ / €10+','48 saat'],
    ['Tişört / Sweatshirt Dikimi','₺150+ / €5+','3–5 gün'],
    ['Pantolon / Şort / Gobi Dikimi','₺200+ / €6+','3–5 gün'],
    ['Kuru Temizleme (Elbise)','₺300+ / €9+','48 saat'],
    ['Kuru Temizleme (Mont)','₺500+ / €15+','48 saat'],
    ['Çamaşır & Ütü (kg)','₺80+/kg / €2.5/kg','24 saat'],
    ['Üniforma (kişi başı)','Teklif / Quote','Sipariş miktarına göre'],
  ],
  en:[
    ['Trouser / Skirt Hemming','₺150+ / €5+','Same day'],
    ['Waist Taking In','₺150+ / €5+','24h'],
    ['Dress Repair','₺150+ / €5+','Same day'],
    ['Shirt Repair','₺150+ / €5+','Same day'],
    ['T-Shirt Repair','₺100+ / €3+','Same day'],
    ['Zip — Trousers / Jeans','₺200+ / €6+','Same day'],
    ['Zip — Coat / Jacket','₺200+ / €6+','24h'],
    ['Sleeve Shortening','₺200+ / €6+','48h'],
    ['Tear Repair','₺100+ / €3+','Same day'],
    ["Men's Bespoke Suit",'₺2,500+ / €75+','5–7 days'],
    ["Men's Shirt",'₺400+ / €12+','3–5 days'],
    ["Women's Dress",'₺800+ / €25+','3–7 days'],
    ['Wedding Dress Alteration','₺400+ / €12+','3–5 days'],
    ['Evening Gown Repair','₺350+ / €10+','48h'],
    ['T-Shirt / Sweatshirt','₺150+ / €5+','3–5 days'],
    ['Trouser / Short / Gobi','₺200+ / €6+','3–5 days'],
    ['Dry Cleaning (Dress)','₺300+ / €9+','48h'],
    ['Dry Cleaning (Coat)','₺500+ / €15+','48h'],
    ['Laundry & Ironing','₺80+/kg / €2.5/kg','24h'],
    ['Uniform (per person)','Quote','On quantity'],
  ],
  ru:[
    ['Подгонка брюк / юбки','₺150+ / €5+','В тот же день'],
    ['Заужение талии','₺150+ / €5+','24 ч'],
    ['Ремонт платья','₺150+ / €5+','В тот же день'],
    ['Ремонт рубашки','₺150+ / €5+','В тот же день'],
    ['Ремонт футболки','₺100+ / €3+','В тот же день'],
    ['Молния — брюки/джинсы','₺200+ / €6+','В тот же день'],
    ['Молния — пальто/пиджак','₺200+ / €6+','24 ч'],
    ['Укорочение рукавов','₺200+ / €6+','48 ч'],
    ['Ремонт разрыва','₺100+ / €3+','В тот же день'],
    ['Мужской костюм','₺2.500+ / €75+','5–7 дней'],
    ['Мужская рубашка','₺400+ / €12+','3–5 дней'],
    ['Женское платье','₺800+ / €25+','3–7 дней'],
    ['Свадебное платье','₺400+ / €12+','3–5 дней'],
    ['Вечернее платье','₺350+ / €10+','48 ч'],
    ['Футболка / Толстовка','₺150+ / €5+','3–5 дней'],
    ['Брюки / Шорты','₺200+ / €6+','3–5 дней'],
    ['Химчистка (платье)','₺300+ / €9+','48 ч'],
    ['Химчистка (пальто)','₺500+ / €15+','48 ч'],
    ['Стирка и глажка','₺80+/кг / €2.5/кг','24 ч'],
    ['Форма','Запрос','По заказу'],
  ],
  de:[
    ['Hose / Rock kürzen','₺150+ / €5+','Gleicher Tag'],
    ['Bund einengen','₺150+ / €5+','24h'],
    ['Kleid reparieren','₺150+ / €5+','Gleicher Tag'],
    ['Hemd reparieren','₺150+ / €5+','Gleicher Tag'],
    ['T-Shirt reparieren','₺100+ / €3+','Gleicher Tag'],
    ['Reißverschluss — Hose/Jeans','₺200+ / €6+','Gleicher Tag'],
    ['Reißverschluss — Mantel/Jacke','₺200+ / €6+','24h'],
    ['Ärmel kürzen','₺200+ / €6+','48h'],
    ['Riss reparieren','₺100+ / €3+','Gleicher Tag'],
    ['Herrenmaßanzug','₺2.500+ / €75+','5–7 Tage'],
    ['Herrenhemd','₺400+ / €12+','3–5 Tage'],
    ['Damenkleid','₺800+ / €25+','3–7 Tage'],
    ['Brautkleid','₺400+ / €12+','3–5 Tage'],
    ['Abendkleid','₺350+ / €10+','48h'],
    ['T-Shirt / Sweatshirt','₺150+ / €5+','3–5 Tage'],
    ['Hose / Shorts','₺200+ / €6+','3–5 Tage'],
    ['Reinigung (Kleid)','₺300+ / €9+','48h'],
    ['Reinigung (Mantel)','₺500+ / €15+','48h'],
    ['Wäsche & Bügeln','₺80+/kg / €2.5/kg','24h'],
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
  ['🏨','Hotel Tailor Antalya (EN)','/en/hotel-tailor-antalya'],
  ['🏨','Schneider im Hotel (DE)','/de/schneider-service-hotel-antalya'],
  ['🏨','Портной в отеле (RU)','/ru/vyezdnoy-portnoy-antalya'],
] as const;

const WHY = [
  { icon:'⚡', tr:['Max 24 Saat','Ekspres teslimat garantisi'], en:['Max 24h Express','Guaranteed delivery'], ru:['Макс 24 часа','Гарантия экспресс-доставки'], de:['Max 24h Express','Garantierte Lieferung'] },
  { icon:'📍', tr:['Yerinde Ölçü','Adresinize gelip ölçü alıyoruz'], en:['On-Site Fitting','We come to your address'], ru:['Замеры на месте','Приедем по адресу'], de:['Maß vor Ort','Wir kommen zu Ihnen'] },
  { icon:'🚗', tr:['Araçlı Servis','Eve ve otele gelen terzi'], en:['Mobile Tailor','We come to you'], ru:['Выездной портной','Приедем к вам'], de:['Mobiler Schneider','Kommen zu Ihnen'] },
  { icon:'🌍', tr:['4 Dil','TR · EN · RU · DE'], en:['4 Languages','TR · EN · RU · DE'], ru:['4 языка','TR · EN · RU · DE'], de:['4 Sprachen','TR · EN · RU · DE'] },
  { icon:'🏨', tr:['Otele Teslimat','Tüm Antalya otellerine'], en:['Hotel Delivery','All Antalya hotels'], ru:['Доставка в отель','Все отели Антальи'], de:['Hotel Lieferung','Alle Antalya-Hotels'] },
  { icon:'👔', tr:['Bay & Bayan','Erkek ve kadın kıyafeti uzman ekip'], en:['Men & Women','Specialist team for both'], ru:['Мужской & Женский','Специалисты для обоих'], de:['Herren & Damen','Spezialisiert für beide'] },
  { icon:'🏭', tr:['Tekstil İmalatı','Tişört, sweatshirt, pantolon seri üretim'], en:['Textile Mfg','T-shirt, sweatshirt, trousers production'], ru:['Производство','Серийное производство'], de:['Textilproduktion','Serienproduktion'] },
];

const SEO_INTRO: Record<Lang, string> = {
  tr: "Antalya'nın köklü terzisi Terzi Can. Bay terzisi: erkek takım elbise, pantolon kısaltma, gömlek, ceket. Bayan terzisi: kadın elbise, etek, abiye, gelinlik tadilatı. Özel dikim: beden ölçüsüne göre tasarım, yerinde ölçü alma. Otellerden kurye ile elbise alımı ve otele teslimat. Tekstil imalatı: tişört, sweatshirt, pantolon, gömlek, mont, şort seri üretimi. Dikiş atölyesi. Kuru temizleme. Üniforma üretimi. EUR, USD, RUB, TRY ve kredi kartı kabul edilir.",
  en: "Tailor Can — Antalya's premier English-speaking tailor. Men's bespoke suits, trouser hemming, shirts, waist alterations. Women's dressmaking, evening gown repairs, wedding dress alterations. Hotel pickup & express delivery service across Lara, Kundu, Konyaaltı, Belek & Kemer. Textile manufacturing & sewing workshop. Dry cleaning & laundry. We accept EUR, USD, RUB, TRY and Credit Cards.",
  ru: "Портной Кан — профессиональное ателье в Анталье. Мужской и женский портной: пошив костюмов, платьев, подгонка по фигуре, замена молний. Выездной сервис в отели Лара, Кунду, Коньяалты, Белек, Кемер (забор и доставка одежды). Химчистка и стирка. Принимаем EUR, USD, RUB, TRY и карты.",
  de: "Schneider Can — Antalyas deutscher Schneiderservice. Herrenmaßanzüge, Hosen kürzen, Hemden, Bund einengen. Damenschneiderin: Kleider, Abendkleider, Brautkleider. Hotel-Abhol- und Lieferservice in Lara, Kundu, Konyaaltı, Belek & Kemer. Nähwerkstatt & Textilproduktion. Chemische Reinigung. Wir akzeptieren EUR, USD, RUB, TRY & Kreditkarten.",
};

const LABELS = {
  tr: { badge:'✦ Antalya · Terzi Can', h1:"Antalya'nın", h1em:'Terzisi', sub:'Bay Terzi · Bayan Terzi · Özel Dikim · Tadilat · Otel Servisi · Tekstil İmalatı · Kuru Temizleme', waBtn:"WhatsApp'tan Yazın", downBtn:'Hizmetleri Gör ↓', waMsg:'Merhaba, terzi ve otel servisiniz hakkında bilgi almak istiyorum.', mobileMsg:'Merhaba, otelime/adresime terzi servisi istiyorum. Yerinde ölçü alabilir misiniz?', hours:'09:00–19:00 · Pzt–Cmt', mapBtn:'📍 Google Maps', quoteBtn:'📲 Ücretsiz Teklif Al', bulkBtn:'🏭 Toplu Sipariş Teklifi', mobileCta:'🚗 Terzi Servisi Talep Et', reviewLabel:'Değerlendirme', priceTitle:'Terzi Fiyatları 2026', priceNote:"Başlangıç fiyatları — kesin teklif için WhatsApp'tan fotoğraf gönderin", areaLabel:'İlçeye tıklayın — mahalleleri görün', allSvcTitle:'Tüm Hizmet Sayfalarımız', contactTitle:'Hızlı İletİŞİm', contactNote:'Hızlı yanıt için WhatsApp tercih edin.', gbpLabel:'Google Business Profillerimiz', gbpNote:'Her iki profilimizde yorum yazabilirsiniz:', bayBayanH:'Bay & Bayan Terzi', faqTitle:'Sık Sorulan Sorular & Otel Servisi', konum:'Konumumuz', konumNote:'Konyaaltı Liman Mah. ve Hurma Mah. olmak üzere iki atölyemiz var.', reviewTitle:'Yorum Yaz' },
  en: { badge:'✦ Antalya · Tailor Can', h1:"Antalya's", h1em:'Master Tailor', sub:"Men's · Women's · Custom Tailoring · Hotel Delivery · Alterations · Textile Manufacturing · Dry Cleaning", waBtn:'WhatsApp Us Now', downBtn:'View Services ↓', waMsg:'Hello, I would like information about your tailoring & hotel delivery service.', mobileMsg:'Hello, I need mobile tailor service at my hotel/address. Can you come for measurement?', hours:'09:00–19:00 · Mon–Sat', mapBtn:'📍 Google Maps', quoteBtn:'📲 Get Free Quote', bulkBtn:'🏭 Bulk Order Quote', mobileCta:'🚗 Request Hotel Tailor', reviewLabel:'Reviews', priceTitle:'Price List 2026', priceNote:'Starting prices — send a photo on WhatsApp for an exact quote', areaLabel:'Tap a district to see neighborhoods', allSvcTitle:'All Service Pages', contactTitle:'Quick Contact', contactNote:'For instant reply, prefer WhatsApp.', gbpLabel:'Our Google Business Profiles', gbpNote:'You can leave a review on either profile:', bayBayanH:"Men's & Women's Tailor", faqTitle:'FAQ & Hotel Service', konum:'Our Location', konumNote:'Two ateliers: Liman Mah. and Hurma Mah., Konyaaltı.', reviewTitle:'Write a Review' },
  ru: { badge:'✦ Анталья · Портной Кан', h1:'Лучший', h1em:'Портной Антальи', sub:'Мужской · Женский · Пошив на заказ · Сервис в отелях · Переделка · Текстиль · Химчистка', waBtn:'Написать в WhatsApp', downBtn:'Смотреть услуги ↓', waMsg:'Здравствуйте, хотел бы узнать об услугах портного и доставке в отель.', mobileMsg:'Здравствуйте, хочу выездной сервис в отель. Приедете для снятия мерок?', hours:'09:00–19:00 · Пн–Сб', mapBtn:'📍 Google Maps', quoteBtn:'📲 Бесплатная оценка', bulkBtn:'🏭 Оптовый заказ', mobileCta:'🚗 Вызвать портного в отель', reviewLabel:'Отзывов', priceTitle:'Цены 2026', priceNote:'Начальные цены — фото в WhatsApp для точной оценки', areaLabel:'Нажмите на район', allSvcTitle:'Все страницы услуг', contactTitle:'Быстрый контакт', contactNote:'Для быстрого ответа — WhatsApp.', gbpLabel:'Наши профили Google Business', gbpNote:'Вы можете оставить отзыв в любом профиле:', bayBayanH:'Мужской и женский портной', faqTitle:'Вопросы и Сервис в Отелях', konum:'Наше местоположение', konumNote:'Два ателье: Liman Mah. и Hurma Mah., Коньяалты.', reviewTitle:'Написать отзыв' },
  de: { badge:'✦ Antalya · Schneider Can', h1:'Antalyas', h1em:'Meisterschneider', sub:'Herren · Damen · Maßanfertigung · Hotel Service · Änderungen · Textilproduktion · Reinigung', waBtn:'WhatsApp schreiben', downBtn:'Leistungen ↓', waMsg:'Hallo, ich möchte Informationen über Ihren Schneider- & Hotelservice.', mobileMsg:'Hallo, ich möchte den mobilen Schneiderdienst im Hotel für Maßabnahme.', hours:'09:00–19:00 · Mo–Sa', mapBtn:'📍 Google Maps', quoteBtn:'📲 Kostenloses Angebot', bulkBtn:'🏭 Großauftrag', mobileCta:'🚗 Mobilen Schneider anfragen', reviewLabel:'Bewertungen', priceTitle:'Preise 2026', priceNote:'Startpreise — Foto per WhatsApp für genaues Angebot', areaLabel:'Bezirk antippen', allSvcTitle:'Alle Serviceseiten', contactTitle:'Schneller Kontakt', contactNote:'WhatsApp für schnelle Antwort.', gbpLabel:'Unsere Google Business Profile', gbpNote:'Sie können in beiden Profilen eine Bewertung hinterlassen:', bayBayanH:'Herren- & Damenschneider', faqTitle:'Fragen & Hotelservice', konum:'Unser Standort', konumNote:'Zwei Ateliers: Liman Mah. und Hurma Mah., Konyaaltı.', reviewTitle:'Bewertung schreiben' },
};

const FAQ: Record<Lang, [string, string][]> = {
  tr:[
    ['Paça kısaltma fiyatı 2026?', `₺150 / €5'den başlar, aynı gün teslim. WhatsApp: ${PHONE_DISPLAY}`],
    ['Otellere ve adrese terzi kurye servisi var mı?', `Evet! Lara, Kundu, Konyaaltı, Belek ve Kemer otellerinden kıyafetlerinizi alıyor, ölçü alıp 24 saat içinde otele teslim ediyoruz. WhatsApp: ${PHONE_DISPLAY}`],
    ['Hangi ödeme yöntemleri ve para birimleri geçerli?', 'TRY, EUR, USD, RUB nakit kabul edilir. Tüm uluslararası kredi kartları ve temassız ödeme geçerlidir.'],
    ['Fermuar değişimi kaç lira?', `Pantolon/kot/mont/ceket fermuarı ₺200 / €6. Aynı gün teslim mümkün. WhatsApp: ${PHONE_DISPLAY}`],
    ['Bel daraltma ve elbise daraltma fiyatı?', `Bel daraltma ₺150 / €5'den başlar. WhatsApp: ${PHONE_DISPLAY}`],
    ['Yerinde ölçü alma ve adrese teslim var mı?', `Evet! Adresinize gelip yerinde ölçü alıyor, dikip tekrar teslim ediyoruz. Tüm Antalya. WhatsApp: ${PHONE_DISPLAY}`],
    ['Tişört, sweatshirt, pantolon, gobi imalatı?', `Evet! Tüm tekstil ürünlerinin özel dikimi ve seri imalatını yapıyoruz. WhatsApp: ${PHONE_DISPLAY}`],
    ['Bay terzi Antalya — erkek kıyafet dikimi?', `Evet! Erkek takım elbise, pantolon, gömlek, ceket, blazer, smoking, damatlık. WhatsApp: ${PHONE_DISPLAY}`],
    ['Bayan terzi Antalya — kadın elbise dikimi?', `Evet! Elbise, bluz, etek, abiye tamiri, gelinlik tadilatı, büyük beden. WhatsApp: ${PHONE_DISPLAY}`],
    ['Dikiş atölyesi — fason ve seri imalat?', `Evet! Kalıp çıkarma, numune, prototip, seri imalat. Markalar için tam paket. WhatsApp: ${PHONE_DISPLAY}`],
    ['Hangi Antalya ilçelerine terzi servisi geliyor?', 'Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Aksu, Lara, Belek, Kemer, Alanya, Manavgat, Side, Serik ve tüm Antalya otellerine geliyoruz.'],
    ['Kuru temizleme ve ütü Antalya fiyatları?', 'Kuru temizleme ₺300 / €9, mont ₺500 / €15, çamaşır ₺80/kg / €2.5/kg. Otelden kurye alım. 24 saat ekspres.'],
  ],
  en:[
    ['How much is trouser hemming in Antalya?', 'From ₺150 / €5. Same day service available. Send a photo on WhatsApp for instant quote.'],
    ['Do you offer hotel pickup and delivery service?', 'Yes! We pick up your garments directly from hotels in Lara, Kundu, Konyaaltı, Belek, and Kemer, alter them, and deliver back within 24 hours.'],
    ['Which currencies and payment methods do you accept?', 'We accept EUR, USD, RUB, TRY cash, as well as all major international credit cards and contactless payments.'],
    ['Zip replacement cost?', 'Trousers/jeans/coat/jacket zip from ₺200 / €6. Express same-day service available.'],
    ['Waist alteration and dress taking in?', 'From ₺150 / €5. WhatsApp us for an exact quote.'],
    ['Do you offer on-site fitting and home delivery?', 'Yes! We visit your hotel or residence, take measurements on-site, perform alterations, and deliver back.'],
    ['Do you produce t-shirts, sweatshirts, trousers, shorts, gobi?', 'Yes! Custom and mass production of all textile items with custom embroidery and digital printing.'],
    ["Do you offer men's bespoke tailoring?", 'Yes! Bespoke suits, trouser hemming, shirts, jackets, blazers, tuxedos, and groom suits.'],
    ["Do you offer women's dressmaking and alterations?", 'Yes! Evening gowns, wedding dresses, skirts, blouses, plus size fitting, and emergency repairs.'],
    ['Sewing workshop for mass production?', 'Yes! Pattern making, prototypes, and full-package mass production for brands.'],
    ['Which Antalya districts and hotel zones do you serve?', 'Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Lara, Kundu Hotel Zone, Belek, Kemer, Alanya, Manavgat, Side, and Serik.'],
    ['Dry cleaning and laundry prices for tourists?', 'Dry cleaning ₺300 / €9, coat ₺500 / €15, laundry ₺80/kg / €2.5/kg. Hotel pickup & express 24h delivery.'],
  ],
  ru:[
    ['Стоимость подгонки брюк в Анталье?', 'От ₺150 / €5. В тот же день. Отправьте фото в WhatsApp.'],
    ['Есть ли выездной сервис и доставка в отели?', 'Да! Мы забираем одежду прямо из отелей в Лара, Кунду, Коньяалты, Белек и Кемер, подгоняем по фигуре и доставляем обратно за 24 часа.'],
    ['Какую валюту и способы оплаты вы принимаете?', 'Мы принимаем наличные EUR, USD, RUB, TRY, а также любые международные кредитные карты.'],
    ['Стоимость замены молнии?', 'Брюки/джинсы/пальто/куртка от ₺200 / €6. Возможен экспресс-ремонт в тот же день.'],
    ['Заужение талии и подгонка платьев?', 'От ₺150 / €5. WhatsApp для точной оценки.'],
    ['Снятие мерок на месте и доставка?', 'Да! Приедем в отель или по адресу, снимем мерки, сошьём/подогоним и доставим обратно.'],
    ['Производство футболок, худи, брюк, шорт?', 'Да! Серийное производство любого текстиля с вышивкой и печатью.'],
    ['Есть мужской портной?', 'Да! Костюмы, брюки, рубашки, пиджаки, смокинги.'],
    ['Есть женский портной?', 'Да! Вечерние и свадебные платья, юбки, подгонка больших размеров.'],
    ['Ателье для серийного производства?', 'Да! Лекала, образцы и серийное производство для брендов.'],
    ['В какие районы и отельные зоны выезжаете?', 'Коньяалты, Муратпаша, Кепез, Лара, Кунду, Белек, Кемер, Алания, Манавгат, Сиде, Серик.'],
    ['Химчистка и стирка для туристов?', 'Химчистка ₺300 / €9, пальто ₺500 / €15, стирка ₺80/кг / €2.5/кг. Забор из отеля и экспресс 24ч.'],
  ],
  de:[
    ['Hosenänderung Preis in Antalya?', 'Ab ₺150 / €5. Gleicher Tag möglich. Foto per WhatsApp senden.'],
    ['Bieten Sie Abhol- und Lieferservice im Hotel an?', 'Ja! Wir holen Ihre Kleidung direkt in Hotels in Lara, Kundu, Konyaaltı, Belek und Kemer ab, passen sie an und liefern innerhalb von 24 Stunden zurück.'],
    ['Welche Währungen und Zahlungsmethoden akzeptieren Sie?', 'Wir akzeptieren EUR, USD, RUB, TRY Bargeld sowie alle internationalen Kreditkarten und kontaktlose Zahlung.'],
    ['Reißverschluss-Kosten?', 'Hosen/Jeans/Mantel/Jacke ab ₺200 / €6. Expressdienst am selben Tag möglich.'],
    ['Bund einengen und Kleid einengen?', 'Ab ₺150 / €5. WhatsApp für genaues Angebot.'],
    ['Maßabnahme vor Ort im Hotel?', 'Ja! Wir kommen zu Ihrem Hotel oder Ihrer Adresse, nehmen Maß und liefern fertig zurück.'],
    ['T-Shirts, Sweatshirts, Hosen, Shorts Produktion?', 'Ja! Serienproduktion aller Textilien mit Stickerei und Digitaldruck.'],
    ['Herrenschneider in Antalya?', 'Ja! Maßanzüge, Hosen, Hemden, Jacken, Blazer, Smoking.'],
    ['Damenschneiderin in Antalya?', 'Ja! Kleider, Abendkleider, Brautkleider, Übergrößen.'],
    ['Nähwerkstatt Serienproduktion?', 'Ja! Schnittmuster, Prototypen, Serienproduktion für Marken.'],
    ['Welche Hotelzonen und Bezirke bedienen Sie?', 'Konyaaltı, Muratpaşa, Kepez, Döşemealtı, Lara, Kundu, Belek, Kemer, Alanya, Manavgat, Side, Serik.'],
    ['Reinigung und Bügeln für Touristen?', 'Reinigung ₺300 / €9, Mantel ₺500 / €15, Wäsche ₺80/kg / €2.5/kg. Kurierabholung im Hotel 24h Express.'],
  ],
};

export default function TerziClient({ gbp1 }: Props) {
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

  // Yapay zeka (GEO) ve Google SEO için Gelişmiş Schema.org JSON-LD Entegrasyonu
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TailorShop",
        "name": "Terzi Can - Antalya",
        "image": HERO_IMAGES.map(img => img.src),
        "telephone": PHONE_DISPLAY,
        "url": "https://terzihizmeti.com.tr",
        "priceRange": "₺₺ / €€",
        "currenciesAccepted": "TRY, EUR, USD, RUB",
        "paymentAccepted": "Cash, Credit Card, Contactless",
        "knowsLanguage": ["Turkish", "English", "Russian", "German"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Antalya",
          "addressRegion": "Antalya",
          "addressCountry": "TR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 36.8407,
          "longitude": 30.6133
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Konyaaltı" },
          { "@type": "AdministrativeArea", "name": "Lara" },
          { "@type": "AdministrativeArea", "name": "Kundu Oteller Bölgesi" },
          { "@type": "AdministrativeArea", "name": "Belek" },
          { "@type": "AdministrativeArea", "name": "Kemer" },
          { "@type": "AdministrativeArea", "name": "Muratpaşa" },
          { "@type": "AdministrativeArea", "name": "Kepez" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Tourist & Express Hotel Tailoring Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Mobile Tailor & Express Hotel Delivery Service"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Same-Day Trouser Hemming & Dress Alteration"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Dry Cleaning & Hotel Express Laundry"
              }
            }
          ]
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        "description": SEO_INTRO[lang]
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ[lang].map(([q, a]) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": a
          }
        }))
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Yapısal Veri Gösterimi */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
      />
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
        .tmahwrap{background:#fff;border:1px solid rgba(184,151,90,.15);border-radius:2px;padding:1.2rem;display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.8rem;box-shadow:var(--shadow)}
        .tmchip{font-size:.72rem;color:var(--muted);border:1px solid rgba(184,151,90,.15);padding:.22rem .65rem;border-radius:2px;text-decoration:none;transition:all .2s}
        .tmchip:hover{border-color:var(--gold);color:var(--gold3);background:rgba(184,151,90,.08)}
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
      <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer" className="twafloat" aria-label="WhatsApp İletişim Hattı">💬</a>

      {/* NAV */}
      <nav className={`tnav${scrolled ? ' up' : ''}`} aria-label="Ana Menü">
        <a href="#" className="tnav-logo" aria-label="Anasayfa">Terzi <span>Can</span></a>
        <ul className="tnav-links">
          <li><a href="#services">Hizmetler</a></li>
          <li><a href="#prices">Fiyatlar</a></li>
          <li><a href="#konum">Harita</a></li>
          <li><a href="#faq">SSS</a></li>
          <li><a href="#contact">İletişim</a></li>
        </ul>
        <div className="lsw" role="group" aria-label="Dil Seçimi">
          {(['tr','en','ru','de'] as Lang[]).map(l => (
            <button 
              key={l} 
              type="button"
              className={`lb${lang === l ? ' on' : ''}`} 
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
            >
              {l === 'tr' ? '🇹🇷' : l === 'en' ? '🇬🇧' : l === 'ru' ? '🇷🇺' : '🇩🇪'} {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      {/* ANA İÇERİK - SEO Hiyerarşisi İçin */}
      <main id="main-content">
        
        {/* HERO */}
        <header className="thero" aria-label="Karşılama Alanı">
          {HERO_IMAGES.map((img, i) => (
            <div key={i} className={`thslide${i === heroIdx ? ' active' : ' inactive'}`} aria-hidden={i !== heroIdx}>
              <img src={img.src} alt={img.alt || 'Terzi Can Karşılama Görseli'} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          ))}
          <div className="thov" />
          <div className="thdots" role="tablist">
            {HERO_IMAGES.map((_, i) => (
              <button 
                key={i} 
                type="button"
                role="tab"
                aria-selected={i === heroIdx}
                className={`thdot${i === heroIdx ? ' on' : ''}`} 
                onClick={() => setHeroIdx(i)} 
                aria-label={`Slayt ${i + 1} göster`} 
              />
            ))}
          </div>
          <div className="thc">
            <span className="thbadge">{L.badge}</span>
            <h1>{L.h1}<br /><em>{L.h1em}</em></h1>
            <p className="thsub">{L.sub}</p>
            <div className="thacts">
              <a href="/terzi-talep?kategori=terzi" className="btn-gold" style={{ background: '#2d8c6e' }}>🧵 Terzi Fiyatı Sor</a>
              <a href="/terzi-talep?kategori=kuru-temizleme" className="btn-gold" style={{ background: '#1d6f57' }}>🧺 Kuru Temizleme Fiyatı Sor</a>
            </div>
            <div className="thacts" style={{ marginTop: '.6rem' }}>
              <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-outline">💬 {L.waBtn}</a>
            </div>
            <a href="/terzi-panel" style={{ display: 'inline-block', marginTop: '1rem', fontSize: '.72rem', color: 'rgba(255,255,255,.5)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              🔧 Terzi veya kuru temizlemecisin? İş bulmak için buraya
            </a>
          </div>
        </header>

        {/* NASIL ÇALIŞIR */}
        <section aria-labelledby="nasil-calisir-title" style={{ background: '#f7faf9', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <h2 id="nasil-calisir-title" style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '.5rem' }}>Nasıl Çalışır?</h2>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '.9rem', marginBottom: '2.5rem' }}>Üç adımda hizmet talep et, en iyi teklifi seç.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {[
                { n: '1', ic: '🧵', h: 'Hizmeti Seç', d: 'Paça kısaltma, gelinlik tadilatı, otel servisi vb. — ne istediğini işaretle, adet ve konumunu gir.' },
                { n: '2', ic: '📸', h: 'Fotoğraf Ekle (opsiyonel)', d: 'İstersen kıyafetin fotoğrafını ekle, terziler daha net fiyat versin.' },
                { n: '3', ic: '💰', h: 'Teklifleri Karşılaştır', d: 'Çevrendeki terziler fiyat teklifi versin, en uygununu seç, direkt WhatsApp/telefonla iletişime geç.' },
              ].map(s => (
                <div key={s.n} style={{ background: '#fff', borderRadius: 16, padding: '1.8rem 1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,.04)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '.6rem' }} aria-hidden="true">{s.ic}</div>
                  <div style={{ fontSize: '.7rem', fontWeight: 800, color: '#2d8c6e', letterSpacing: '.08em', marginBottom: '.4rem' }}>ADIM {s.n}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '.5rem' }}>{s.h}</h3>
                  <p style={{ fontSize: '.82rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{s.d}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="/terzi-talep" className="btn-gold" style={{ background: '#2d8c6e' }}>📝 Hemen Teklif İste</a>
            </div>
          </div>
        </section>

        {/* FILM STRIP */}
        <section className="tstrip-wrap" aria-label="Terzi Can Fotoğraf Kesitleri">
          <div className="tstrip" ref={stripRef}>
            {[...FILM_STRIP, ...FILM_STRIP].map((src, i) => (
              <img key={i} src={src} alt={`Terzi Can Antalya Atölye Kesiti ${i + 1}`} className="tstrip-img" loading="lazy" />
            ))}
          </div>
        </section>

        {/* SEO INTRO — Server-rendered, Google bunu okur */}
        <section className="tseoblk" id="terzi-can-ozet" aria-label="Firma SEO Özeti">
          <p>{SEO_INTRO[lang]}</p>
        </section>

        {/* SERVİSLER */}
        <section className="tsvc" id="services" aria-labelledby="services-title">
          <div className="tsvc-head">
            <span className="ey">✦ Hizmetler</span>
            <h2 id="services-title" className="tst">Antalya Terzi Hizmetleri</h2>
            <p className="tss">Paça kısaltma, fermuar, bel daraltma, özel dikim, otel servisi, tekstil imalatı ve daha fazlası. Aşağıdan ihtiyacını gör, sonra ücretsiz teklif al.</p>
            <span className="tgl" />
          </div>
          <div className="tsvc-grid">
            {SERVICES.map((s, i) => (
              <article key={i} className="tsc" id={s.id} aria-labelledby={`svc-${s.id}`}>
                <img src={s.img} alt={s.alt} loading={i < 2 ? 'eager' : 'lazy'} width="800" height="400" />
                <div className="tsc-ov" />
                <div className="tsc-body">
                  <div className="tsc-ic" aria-hidden="true">{s.icon}</div>
                  <h3 id={`svc-${s.id}`} className="tsc-h">{s[lang].n}</h3>
                  <p className="tsc-d">{s[lang].d}</p>
                  <span className="tsc-p">{s[lang].p}</span>
                </div>
                <div className="tsc-line" />
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', padding: '2.5rem 2rem 4rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', background: 'var(--cream)' }}>
            <a href="/terzi-talep" className="btn-gold" style={{ background: '#2d8c6e' }}>📝 Ücretsiz Teklif Al</a>
            <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">{L.quoteBtn}</a>
            <a href={WA(lang === 'tr' ? 'Merhaba, toplu tekstil sipariş için teklif almak istiyorum.' : 'Hello, bulk textile production quote please.')} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">{L.bulkBtn}</a>
          </div>

          {/* SEO: hizmet alt sayfalarına dahili link — hub sayfası bunlara linklemiyordu, Google bu sayfaları sitemap dışında keşfedemiyordu */}
          {lang === 'tr' && (
            <nav aria-label="Terzi hizmet sayfaları" style={{ textAlign: 'center', padding: '0 2rem 3rem', display: 'flex', gap: '.6rem 1.2rem', justifyContent: 'center', flexWrap: 'wrap', background: 'var(--cream)', fontSize: '.85rem' }}>
              <Link href="/terzi/bay-terzi-antalya">Bay Terzi Antalya</Link>
              <Link href="/terzi/bayan-terzi-antalya">Bayan Terzi Antalya</Link>
              <Link href="/terzi/eve-gelen-terzi-antalya">Eve Gelen Terzi</Link>
              <Link href="/terzi/paca-kisaltma-antalya">Paça Kısaltma</Link>
              <Link href="/terzi/uniforma-uretimi-antalya">Üniforma Üretimi</Link>
              <Link href="/terzi/dikis-atolyesi-antalya">Dikiş Atölyesi</Link>
              <Link href="/terzi/kuru-temizleme-antalya">Kuru Temizleme</Link>
              <Link href="/online-terzi-hizmeti">Online Terzi Hizmeti</Link>
            </nav>
          )}
        </section>

        {/* NEDEN BİZ */}
        <section className="twhy" aria-labelledby="why-title">
          <div className="twhy-inner">
            <span className="ey">✦ Neden Terzi Can?</span>
            <h2 id="why-title" className="tst">10+ Yıllık Deneyim · 4 Dil · Tüm Antalya</h2>
            <span className="tgl" />
            <div className="twhy-grid">
              {WHY.map((w, i) => (
                <div key={i} className="twc">
                  <div className="twc-ic" aria-hidden="true">{w.icon}</div>
                  <h3 className="twc-t">{w[lang][0]}</h3>
                  <div className="twc-d">{w[lang][1]}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GOOGLE YORUMLARI — gerçek profillere yönlendirme */}
        <section className="trev" aria-labelledby="reviews-title">
          <div className="trev-inner">
            <div style={{ textAlign: 'center' }}>
              <span className="ey ey-light">⭐ Google Business Profile</span>
              <h2 id="reviews-title" className="tst tst-light">Müşteri Yorumlarımız Google'da</h2>
              <span className="tgl tgl-center" />
              <p className="tss" style={{ color: 'rgba(255,255,255,.55)', maxWidth: 480, margin: '.8rem auto 0' }}>
                Güncel puan ve yorumlarımızı doğrudan Google Haritalar'daki profillerimizden görebilirsiniz.
              </p>
            </div>
            {/* Yorum görüntüleme/yazma butonu */}
            <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={gbp1.review} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '.75rem', padding: '.7rem 1.4rem' }}>
                ⭐ Google'da Görüntüle — {gbp1.name.split(' — ')[0]}
              </a>
            </div>
          </div>
        </section>

        {/* FİYAT TABLOSU */}
        <section className="tprices" id="prices" aria-labelledby="hizmet-fiyatlari">
          <div className="tprices-inner">
            <span className="ey">₺ Fiyatlar</span>
            <h2 className="tst" id="hizmet-fiyatlari">{L.priceTitle}</h2>
            <p className="tss">{L.priceNote}</p>
            <span className="tgl" />
            <table className="tptbl">
              <caption>2026 Yılı Terzi Can Hizmet Fiyat Listesi</caption>
              <thead>
                <tr>
                  <th scope="col">{lang === 'tr' ? 'Hizmet' : lang === 'en' ? 'Service' : lang === 'ru' ? 'Услуга' : 'Leistung'}</th>
                  <th scope="col">{lang === 'tr' ? 'Fiyat' : lang === 'en' ? 'Price' : lang === 'ru' ? 'Цена' : 'Preis'}</th>
                  <th scope="col">{lang === 'tr' ? 'Süre' : lang === 'en' ? 'Time' : lang === 'ru' ? 'Время' : 'Zeit'}</th>
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
        <section className="tmob" aria-labelledby="mob-title">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <span className="ey ey-light">🚗 Adrese Ve Otele Gelen Terzi Servisi</span>
            <h2 id="mob-title" className="tst tst-light">Kapınıza Geliyoruz</h2>
            <p className="tss tss-light">Araçlı terzi servisimizle tüm Antalya otellerine ve adreslere hizmet veriyoruz.</p>
            <span className="tgl" />
            <div className="tmob-steps">
              {[
                ['📍', 'WhatsApp ile Yazın', 'Adresinizi ve hizmet talebinizi bildirin.'],
                ['📏', 'Terzi Gelir', 'Otele/adresinize gelip yerinde ölçü alır.'],
                ['✂️', 'Atölyede Tamamlanır', 'Ölçüye göre 24 saatte hazır.'],
                ['🚗', 'Kapıya Teslim', 'Anlaşılan vakitte resepsiyona/kapınıza getirilir.'],
              ].map(([ic, t, d], i) => (
                <article key={i} className="tmob-step">
                  <div className="tmob-ic" aria-hidden="true">{ic}</div>
                  <h3 className="tmob-t">{t}</h3>
                  <div className="tmob-d">{d}</div>
                </article>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <a href={WA(L.mobileMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold">{L.mobileCta}</a>
            </div>
          </div>
        </section>

        {/* GOOGLE HARİTA */}
        <section className="tmap-sec" id="konum" aria-labelledby="konum-title">
          <div className="tmap-inner">
            <span className="ey">📍 {L.konum}</span>
            <h2 id="konum-title" className="tst">Terzi Can — Google Business</h2>
            <p className="tss">{L.konumNote}</p>
            <span className="tgl" />

            <div className="tmap-grid">
              <article className="tmap-card">
                <iframe
                  src={gbp1.embed}
                  width="100%" height="260"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${gbp1.name} Harita Görünümü`}
                />
                <div className="tmap-info">
                  <h3 className="tmap-name">{gbp1.name}</h3>
                  <div className="tmap-addr">📍 {gbp1.addr}</div>
                  <div className="tmap-btns">
                    <a href={gbp1.maps} target="_blank" rel="noopener noreferrer" className="tmap-btn tmap-btn-maps">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                      Maps
                    </a>
                    <a href={gbp1.short} target="_blank" rel="noopener noreferrer" className="tmap-btn tmap-btn-route">🗺️ Yol Tarifi</a>
                    <a href={gbp1.review} target="_blank" rel="noopener noreferrer" className="tmap-btn tmap-btn-review">⭐ {L.reviewTitle}</a>
                  </div>
                </div>
              </article>
            </div>

            <div className="tgbp-note">
              <strong>💡 {L.gbpLabel}:</strong> {L.gbpNote}<br />
              <span style={{ fontSize: '.72rem', opacity: .7 }}>CID: {gbp1.cid}</span>
            </div>
          </div>
        </section>

        {/* HİZMET BÖLGELERİ */}
        <section className="tareas" id="areas" aria-labelledby="areas-title">
          <div className="tareas-inner">
            <div style={{ textAlign: 'center' }}>
              <span className="ey">📍 Hizmet Bölgeleri</span>
              <h2 id="areas-title" className="tst">Antalya — Tüm İlçeler</h2>
              <p className="tss" style={{ margin: '.6rem auto 0' }}>{L.areaLabel}</p>
              <span className="tgl tgl-center" />
            </div>
            <div className="tilwrap" role="group" aria-label="İlçe Seçimi">
              {ILCELER.map(({ ilce }) => (
                <button 
                  key={ilce} 
                  type="button"
                  aria-pressed={activeIlce === ilce}
                  className={`tilbtn${activeIlce === ilce ? ' on' : ''}`} 
                  onClick={() => setActiveIlce(activeIlce === ilce ? null : ilce)}
                >
                  {ilce}
                </button>
              ))}
            </div>
            {activeIlce && (
              <div className="tmahwrap" aria-live="polite">
                {ILCELER.find(i => i.ilce === activeIlce)?.m.map(m => (
                  <Link 
                    key={m} 
                    href={`/terzi/${slugify(activeIlce)}/${slugify(m)}`} 
                    className="tmchip"
                  >
                    {m}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* TÜM HİZMET SAYFALARI */}
        <section className="tallsvc" aria-labelledby="allsvc-title">
          <div className="tallsvc-inner">
            <div style={{ textAlign: 'center' }}>
              <h2 id="allsvc-title" className="ey ey-light" style={{ margin: 0, paddingBottom: '.6rem' }}>✦ {L.allSvcTitle}</h2>
              <span className="tgl tgl-center" />
            </div>
            <div className="tallsvc-grid">
              {ALT_SAYFALAR.map(([ic, label, href]) => (
                <Link key={href} href={href} className="tallsvc-link" aria-label={`${label} sayfasına git`}>
                  <span style={{ fontSize: '1.2rem' }} aria-hidden="true">{ic}</span>
                  <span>{label}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--gold2)', fontSize: '.8rem' }} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — <details>/<summary> — Google SSS snippet için SSR-friendly */}
        <section className="tfaq" id="faq" aria-labelledby="sik-sorulan-sorular">
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
        <section className="tcontact" id="contact" aria-labelledby="contact-title">
          <div className="tcontact-inner">
            <div>
              <span className="ey ey-light">✦ {L.contactTitle}</span>
              <h2 id="contact-title" className="tst tst-light" style={{ fontStyle: 'italic' }}>{L.contactTitle}</h2>
              <p className="tss tss-light" style={{ marginBottom: '1.5rem' }}>{L.contactNote}</p>
              <address style={{ fontStyle: 'normal' }}>
                {[
                  { ic: '📞', lbl: 'Telefon', val: <a href={`tel:+${PHONE_RAW}`}>{PHONE_DISPLAY}</a> },
                  { ic: '💬', lbl: 'WhatsApp', val: <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer">{PHONE_DISPLAY}</a> },
                  { ic: '🕐', lbl: 'Çalışma Saatleri', val: <span>{L.hours}</span> },
                  { ic: '📍', lbl: 'Bölge', val: <span>{lang === 'tr' ? 'Tüm Antalya İlçeleri & Otelleri — Araçlı Terzi Servisi' : lang === 'en' ? 'All Antalya Districts & Hotels — Mobile Tailor' : lang === 'ru' ? 'Все районы и отели Антальи' : 'Alle Antalya-Bezirke & Hotels'}</span> },
                  { ic: '💳', lbl: lang === 'tr' ? 'Ödeme & Para Birimleri' : 'Payment & Currencies', val: <span>EUR · USD · RUB · TRY · Credit Card</span> },
                  { ic: '🌍', lbl: lang === 'tr' ? 'Diller' : 'Languages', val: <span>🇹🇷 TR · 🇬🇧 EN · 🇷🇺 RU · 🇩🇪 DE</span> },
                ].map(({ ic, lbl, val }, i) => (
                  <div key={i} className="tcrow">
                    <span style={{ fontSize: '1rem', paddingTop: '.1rem' }} aria-hidden="true">{ic}</span>
                    <div><div className="tclbl">{lbl}</div><div className="tcval">{val}</div></div>
                  </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem', marginTop: '2rem' }}>
                  <a href={WA(L.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ justifyContent: 'center' }}>💬 WhatsApp</a>
                  <a href={WA(L.mobileMsg)} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ justifyContent: 'center' }}>{L.mobileCta}</a>
                  <a href={gbp1.maps} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ justifyContent: 'center' }}>{L.mapBtn}</a>
                </div>
              </address>
            </div>
            {/* Harita — iletişim bölümü için */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}>
                <iframe src={gbp1.embed} width="100%" height="200" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${gbp1.name} İletişim Haritası`} />
                <div style={{ padding: '.8rem 1rem', background: 'rgba(28,24,20,.97)', fontSize: '.72rem', color: 'rgba(255,255,255,.5)' }}>{gbp1.name} · {gbp1.addr}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ANTALYA İLÇELERİ — iç linkleme */}
        <section aria-labelledby="antalya-ilceleri-title" style={{ background: '#f7faf9', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <h2 id="antalya-ilceleri-title" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>Antalya'nın Tüm İlçelerine ve Otellerine Hizmet Veriyoruz</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'center' }}>
              {ANTALYA_ILCELERI.map(i => (
                <a key={i.slug} href={`/terzi/antalya/${i.slug}`} style={{ fontSize: '.8rem', color: '#2d8c6e', textDecoration: 'none', border: '1px solid #cfe8dd', padding: '.5rem 1rem', borderRadius: 20 }}>
                  {i.ad} Terzi
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="tfooter" role="contentinfo">
        <div style={{ fontFamily: 'var(--unbounded)', fontSize: '1.1rem', color: 'var(--gold2)', marginBottom: '.4rem' }}>
          Terzi Can · Tailor Can · Портной Кан · Schneider Can
        </div>
        <p style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.3)', marginBottom: '.5rem' }}>
          © 2026 SwapHubs — Antalya Terzi · Bay & Bayan · Özel Dikim · Otel Servisi · Tekstil İmalatı · {PHONE_DISPLAY}
        </p>
        <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.2)', marginBottom: '.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>Konyaaltı Mahalleleri:</span>
          {[
            { n: 'Hurma', p: '/terzi/hurma-terzi' },
            { n: 'Liman', p: '/terzi/liman-terzi' },
            { n: 'Uncalı', p: '/terzi/uncali-terzi' },
            { n: 'Sarısu', p: '/terzi/sarisu-terzi' },
            { n: 'Çakırlar', p: '/terzi/cakirlar-terzi' },
            { n: 'Meltem', p: '/terzi/meltem-terzi' }
          ].map((mah) => (
            <Link 
              key={mah.p} 
              href={mah.p} 
              style={{ color: 'rgba(255,255,255,.3)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold2)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,.3)'}
            >
              {mah.n} Terzi
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '.8rem' }}>
          <a href={gbp1.maps} target="_blank" rel="noopener noreferrer" style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.2)', textDecoration: 'none' }}>
            Google Business · {gbp1.name}
          </a>
        </div>
        <nav aria-label="Footer hizmet linkleri" className="tfootnav">
          {ALT_SAYFALAR.map(([, label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
      </footer>
      <TerziMarketingBottomNav />
    </>
  );
} 
