'use client';

import { useState, useEffect } from 'react';

type Lang = 'tr' | 'en' | 'ru' | 'de';
const PHONE = '905318986418';
const WA = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

const C = {
  tr: {
    badge: '✦ Antalya · Terzi Can', h1: "Antalya'nın", h1em: 'Terzisi',
    sub: 'Erkek · Bayan · Çocuk · Tadilat · Üniforma · Nakış · Fason · Kuru Temizleme',
    waBtn: "WhatsApp'tan Yazın", downBtn: 'Hizmetleri Gör ↓',
    waMsg: 'Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.',
    mobileMsg: 'Merhaba, terzi servisinizden yararlanmak istiyorum. Adresime gelebilir misiniz?',
    s_services: 'Hizmetlerimiz', s_why: 'Neden Biz?', s_faq: 'Sık Sorulan Sorular',
    s_reviews: 'Müşteri Yorumları', s_areas: 'Hizmet Bölgeleri', s_contact: 'Bize Ulaşın',
    s_prices: 'Terzi Fiyatları 2025–2026', s_mobile: 'Terzi Servisi',
    mobileHeading: 'Kapınıza Geliyoruz',
    mobileDesc: "Araçlı terzi servisimizle tüm Antalya'ya hizmet veriyoruz. Adresinize geliyor, ölçü alıyor, dikip tekrar teslim ediyoruz. Otel, ev, işyeri — fark etmez.",
    mobileCta: '🚗 Terzi Servisi Talep Et',
    steps: [['📍','Adresinizi Bildirin',"WhatsApp'tan konum paylaşın"],['📏','Yerinde Ölçü','Terzi adresinize gelir'],['✂️','Atölyede Dikilir','Ölçüye göre tamamlanır'],['🚗','Kapıya Teslim','Belirlenen vakitte']] as [string,string,string][],
    areaLabel: 'İlçeye tıklayın — mahalleleri görün',
    quoteBtn: '📲 Ücretsiz Fiyat Teklifi Al', bulkBtn: '🏭 Toplu Üniforma Teklifi', mapBtn: '📍 Google Maps',
    hours: '09:00–19:00 · Pzt–Cmt',
    faq: [
      ['Paça kısaltma kaç lira? 2025–2026 fiyatı?', "Paça kısaltma ₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175. WhatsApp'tan kıyafetinizin fotoğrafını gönderin — 30 dakika içinde fiyat bildiririz."],
      ['Fermuar değişimi kaç lira? Kot, mont, ceket, sweatshirt?', "Pantolon/kot fermuarı ₺120'den, ceket fermuarı ₺200'den, mont fermuarı ₺300'den başlar. Sweatshirt ve çanta fermuarı da yapılır. Aynı gün teslim mümkündür."],
      ['Eve veya otele gelen terzi Antalya?', "Evet! Araçlı terzi servisimizle Antalya'nın tüm ilçelerine geliyoruz. WhatsApp'tan konum paylaşın, terzi adresinize gelsin, ölçü alsın, diksin, teslim etsin."],
      ['Mezuniyet abiye tamiri ve kısaltması?', 'Evet, mezuniyet sezonunda (Mayıs–Haziran) abiye tamiri, kısaltma ve tadilatı ekspres 24 saatte yapıyoruz.'],
      ['Düğün sezonu gelinlik tadilatı yapıyor musunuz?', 'Evet, Nisan–Ekim düğün sezonunda gelinlik tadilatı, kısaltma ve damatlık tadilatı yapıyoruz.'],
      ['Otel ve restoran üniforması üretimi yapıyor musunuz?', 'Evet. Otel personel, resepsiyon, kat görevlisi, aşçı, garson, meydancı, spa, animatör üniforması üretiyoruz. Tasarım + kalıp + seri imalat + nakış hepsi tek elden.'],
      ['Sweatshirt ve eşofman dikimi yapılıyor mu?', 'Evet. Sweatshirt, eşofman, kapüşonlu, polo yaka dikimi. Nakış ve baskıyla kişiselleştirme, seri üretim de mümkün.'],
      ['Büyük beden, bebek kıyafeti, nevresim, perde?', 'Evet; büyük beden dikim, nevresim takımı, perde, bebek elbisesi ve çocuk kıyafeti dikiyoruz. Anne grupları için toplu sipariş indirimi.'],
    ] as [string,string][],
    // SEO intro — visible, natural prose (NOT hidden)
    seoIntro: "Antalya'nın köklü terzisi Terzi Can olarak Konyaaltı merkezimizden tüm Antalya ilçelerine hizmet veriyoruz. Paça kısaltma, pantolon kısaltma, elbise daraltma, fermuar değişimi, etek kısaltma, abiye tamiri, kıyafet tamiri, kuru temizleme ve ütü hizmetlerinin yanı sıra otel üniforma, aşçı üniforma, garson üniforma, resepsiyon üniforma, doktor üniforma, okul üniforma ve spor üniforma üretimi yapıyoruz. Sweatshirt ve eşofman dikimi, nakış ve logo baskı hizmetleri de sunulmaktadır. Eve gelen terzi, otele gelen terzi ve araçlı terzi servisimizle kapınıza kadar geliyoruz.",
  },
  en: {
    badge: '✦ Antalya · Tailor Can', h1: "Antalya's", h1em: 'Master Tailor',
    sub: 'Men · Women · Children · Alterations · Uniforms · Embroidery · Dry Cleaning',
    waBtn: 'WhatsApp Us Now', downBtn: 'View Services ↓',
    waMsg: 'Hello, I would like information about your tailoring service.',
    mobileMsg: 'Hello, I would like to use your mobile tailor service. Can you come to my address?',
    s_services: 'Services', s_why: 'Why Us?', s_faq: 'FAQ',
    s_reviews: 'Reviews', s_areas: 'Service Areas', s_contact: 'Contact Us',
    s_prices: 'Price List 2025–2026', s_mobile: 'Mobile Tailor',
    mobileHeading: 'We Come to You',
    mobileDesc: 'Our mobile tailor service covers all of Antalya. We visit your address, take measurements on-site, complete the work and deliver back to your door. Hotel, home or office — no problem.',
    mobileCta: '🚗 Request Mobile Tailor',
    steps: [['📍','Share Address','Send location via WhatsApp'],['📏','On-Site Measure','Tailor comes to you'],['✂️','Tailored in Workshop','Sewn to your measurements'],['🚗','Delivered to Door','At agreed time']] as [string,string,string][],
    areaLabel: 'Tap a district to see neighborhoods',
    quoteBtn: '📲 Get Free Quote', bulkBtn: '🏭 Bulk Uniform Quote', mapBtn: '📍 Google Maps',
    hours: '09:00–19:00 · Mon–Sat',
    faq: [
      ['How much does trouser hemming cost?', 'Trouser hemming starts from ₺150. WhatsApp us a photo for a free quote in 30 minutes.'],
      ['How much does zip replacement cost?', 'Trousers/jeans from ₺120, jacket from ₺200, coat from ₺300. Same-day service available.'],
      ['Do you come to my hotel or home?', 'Yes! Our mobile tailor covers all Antalya districts. Share your location on WhatsApp — we come to you, measure, tailor and deliver.'],
      ['Do you alter graduation dresses?', 'Yes — express 24h alterations and shortening for graduation dresses in season (May–June).'],
      ['Do you do wedding dress alterations?', 'Yes — hemming, taking in, shoulder adjustments for all bridal wear. April–October season.'],
      ['Do you produce hotel and restaurant uniforms?', 'Yes — hotel staff, reception, chef, waiter, valet, security, spa uniforms. Design + pattern + mass production + embroidery, all in one.'],
      ['Do you sew sweatshirts and tracksuits?', 'Yes — hoodies, polo necks, printed/embroidered sweatshirts, mass production.'],
      ['Plus-size, baby clothes, curtains?', 'Yes — plus-size clothing, baby dresses, curtains, bed linen. Group discounts for parent communities.'],
    ] as [string,string][],
    seoIntro: "Tailor Can — Antalya's most experienced English-speaking tailor. Trouser hemming, dress alterations, zip replacement, size reduction, dry cleaning, ironing, pattern making, custom design and mass production. Hotel, restaurant, medical and school uniform production. Sweatshirt sewing, embroidery, logo printing. Express 24–48h service. Hotel pickup and delivery across all Antalya districts.",
  },
  ru: {
    badge: '✦ Анталья · Портной Кан', h1: 'Лучший', h1em: 'Портной Антальи',
    sub: 'Мужская · Женская · Детская · Пошив · Химчистка · Форма · Вышивка',
    waBtn: 'Написать в WhatsApp', downBtn: 'Смотреть услуги ↓',
    waMsg: 'Здравствуйте, хотел бы узнать о ваших услугах портного.',
    mobileMsg: 'Здравствуйте, хочу воспользоваться выездным сервисом. Можете приехать по адресу?',
    s_services: 'Услуги', s_why: 'Почему мы?', s_faq: 'Вопросы и ответы',
    s_reviews: 'Отзывы', s_areas: 'Районы обслуживания', s_contact: 'Связаться',
    s_prices: 'Цены 2025–2026', s_mobile: 'Выездной портной',
    mobileHeading: 'Приедем к вам',
    mobileDesc: 'Наш выездной портной обслуживает всю Анталью. Приедем по адресу, снимем мерки, сошьём в ателье и доставим. Отель, дом или офис — без проблем.',
    mobileCta: '🚗 Вызвать портного',
    steps: [['📍','Укажите адрес','Отправьте локацию в WhatsApp'],['📏','Снятие мерок','Портной приедет к вам'],['✂️','Пошив в ателье','По вашим меркам'],['🚗','Доставим к вам','В назначенное время']] as [string,string,string][],
    areaLabel: 'Нажмите на район для просмотра',
    quoteBtn: '📲 Бесплатная оценка', bulkBtn: '🏭 Оптовый заказ формы', mapBtn: '📍 Google Maps',
    hours: '09:00–19:00 · Пн–Сб',
    faq: [
      ['Сколько стоит подгонка брюк в 2025–2026?', 'Подгонка брюк от ₺150. Отправьте фото в WhatsApp — ответим за 30 минут.'],
      ['Сколько стоит замена молнии?', 'Брюки/джинсы от ₺120, пиджак от ₺200, пальто от ₺300. Срочный ремонт в тот же день.'],
      ['Есть ли выезд на дом или в отель?', 'Да! Выездной портной работает по всей Анталье. Пришлите локацию в WhatsApp — приедем к вам.'],
      ['Подгонка выпускного платья срочно?', 'Да — экспресс 24 часа в сезон выпускных (май–июнь).'],
      ['Подгонка свадебного платья?', 'Да — укорачивание, ушивание, плечи. Апрель–октябрь.'],
      ['Производство формы для отелей и ресторанов?', 'Да — гостиничная форма, ресепшн, повара, официанты, охрана, спа. Дизайн + лекала + серийное производство + вышивка.'],
      ['Пошив толстовок и спортивных костюмов?', 'Да — худи, поло, с принтом, с вышивкой, серийное производство.'],
      ['Большие размеры, детская одежда, шторы?', 'Да — большие размеры, детская одежда, шторы, постельное бельё. Скидки для групп.'],
    ] as [string,string][],
    seoIntro: 'Портной Кан — опытный портной в Анталье, говорим по-русски. Подгонка брюк, замена молнии, укорачивание юбок, ремонт платьев, пошив на заказ, химчистка, глажка, выездной портной. Форма для гостиниц, ресторанов, медицины и школ. Пошив толстовок, вышивка. Экспресс 24–48 часов. Забор и доставка в любой отель Антальи.',
  },
  de: {
    badge: '✦ Antalya · Schneider Can', h1: 'Antalyas', h1em: 'Meisterschneider',
    sub: 'Herren · Damen · Kinder · Änderungen · Uniformen · Stickerei · Reinigung',
    waBtn: 'WhatsApp schreiben', downBtn: 'Leistungen ansehen ↓',
    waMsg: 'Hallo, ich möchte Informationen über Ihren Schneiderservice erhalten.',
    mobileMsg: 'Hallo, ich möchte den mobilen Schneiderdienst nutzen. Können Sie kommen?',
    s_services: 'Leistungen', s_why: 'Warum wir?', s_faq: 'Häufige Fragen',
    s_reviews: 'Kundenbewertungen', s_areas: 'Servicegebiete', s_contact: 'Kontakt',
    s_prices: 'Preisliste 2025–2026', s_mobile: 'Mobiler Schneiderdienst',
    mobileHeading: 'Wir kommen zu Ihnen',
    mobileDesc: 'Unser mobiler Schneiderdienst ist in ganz Antalya verfügbar. Wir kommen zu Ihrer Adresse, nehmen Maße, schneidern im Atelier und liefern zurück. Hotel, Zuhause oder Büro — kein Problem.',
    mobileCta: '🚗 Mobilen Schneider anfragen',
    steps: [['📍','Adresse mitteilen','Standort per WhatsApp'],['📏','Maße vor Ort','Schneider kommt zu Ihnen'],['✂️','Atelier','Nach Ihrem Maß genäht'],['🚗','Lieferung','Zur vereinbarten Zeit']] as [string,string,string][],
    areaLabel: 'Bezirk antippen für Stadtteile',
    quoteBtn: '📲 Kostenloses Angebot', bulkBtn: '🏭 Uniform Großauftrag', mapBtn: '📍 Google Maps',
    hours: '09:00–19:00 · Mo–Sa',
    faq: [
      ['Was kostet Hosenänderung 2025–2026?', 'Hosenänderung ab ₺150. Foto per WhatsApp senden — Antwort in 30 Minuten.'],
      ['Was kostet ein Reißverschluss-Ersatz?', 'Hosen/Jeans ab ₺120, Jacke ab ₺200, Mantel ab ₺300. Expressdienst möglich.'],
      ['Kommen Sie ins Hotel oder nach Hause?', 'Ja! Mobiler Schneiderdienst in ganz Antalya. Standort per WhatsApp — wir kommen zu Ihnen.'],
      ['Abendkleid kürzen für Abschlussfeier?', 'Ja — Express 24h in der Abschlusszeit (Mai–Juni).'],
      ['Brautkleid-Änderungen in der Hochzeitssaison?', 'Ja — kürzen, einengen, Schulteranpassung. April–Oktober.'],
      ['Produzieren Sie Hotel- und Restaurantuniformen?', 'Ja — Hotelpersonal, Rezeption, Köche, Kellner, Sicherheit, Spa. Design + Schnittmuster + Serienproduktion + Stickerei.'],
      ['Sweatshirts und Trainingsanzüge nähen?', 'Ja — Hoodies, Polo, bedruckt/gestickt, Serienproduktion.'],
      ['Übergrößen, Kinderkleidung, Vorhänge?', 'Ja — Übergrößen, Kinderkleidung, Vorhänge, Bettwäsche. Gruppenrabatte verfügbar.'],
    ] as [string,string][],
    seoIntro: 'Schneider Can — erfahrener Schneider in Antalya mit deutschsprachigem Service. Hosenänderungen, Reißverschluss-Ersatz, Kleiderreparatur, Maßanfertigung, chemische Reinigung, Bügeln, mobiler Schneider. Uniformproduktion für Hotels, Restaurants, Medizin und Schulen. Sweatshirt nähen, Stickerei. Express 24–48h. Abholung und Lieferung ins Hotel.',
  },
};

const SERVICES = [
  {
    icon: '✂️',
    // Terzi makası ile pantolon paça kısaltma / dikiş detayı
    img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&q=75&auto=format&fit=crop',
    tr: { n: 'Tamir & Tadilat', d: 'Paça kısaltma · etek kısaltma · kol kısaltma · elbise daraltma · ceket daraltma · bel alma · fermuar değişimi · yırtık onarımı · düğme dikimi · astar değişimi · cep tamiri. Her tür kıyafette.', p: '₺120+' },
    en: { n: 'Repairs & Alterations', d: 'Trouser hemming · skirt shortening · sleeve shortening · dress/jacket taking in · zip replacement · tear repair · button sewing · lining replacement. All garments.', p: '₺120+' },
    ru: { n: 'Ремонт и переделка', d: 'Подгонка брюк · укорачивание юбок/рукавов · заужение платья/пиджака · замена молнии · ремонт разрывов · пришивание пуговиц · замена подкладки.', p: '₺120+' },
    de: { n: 'Reparaturen & Änderungen', d: 'Hose kürzen · Rock kürzen · Ärmel kürzen · Kleid/Jacke einengen · Reißverschluss · Riss reparieren · Knöpfe annähen · Futter ersetzen.', p: '₺120+' },
  },
  {
    icon: '👗',
    // Terzi manken üzerine kumaş tutturma / özel dikim atölyesi
    img: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=700&q=75&auto=format&fit=crop',
    tr: { n: 'Bayan & Erkek Özel Dikim', d: 'Elbise · bluz · etek · tulum · abiye · gelinlik · damatlık · takım elbise · gömlek · ceket · blazer · smoking dikimi. Kendi kumaşınızla ya da seçkin stoğumuzdan ölçüye özel.', p: '₺600+' },
    en: { n: 'Custom Tailoring', d: 'Dresses · blouses · skirts · jumpsuits · evening gowns · wedding dresses · suits · shirts · jackets · blazers · tuxedos. Your fabric or ours. Made to exact measure.', p: '₺600+' },
    ru: { n: 'Пошив на заказ', d: 'Платья · блузки · юбки · вечерние платья · свадебные платья · костюмы · рубашки · пиджаки · смокинги. Ваша ткань или наша. Точно по меркам.', p: '₺600+' },
    de: { n: 'Maßanfertigung', d: 'Kleider · Blusen · Röcke · Abendkleider · Brautkleider · Anzüge · Hemden · Jacken · Blazer · Smoking. Ihr Stoff oder unserer. Genau nach Maß.', p: '₺600+' },
  },
  {
    icon: '👶',
    // Renkli çocuk kıyafetleri / küçük elbiseler askıda
    img: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=700&q=75&auto=format&fit=crop',
    tr: { n: 'Çocuk · Bebek · Büyük Beden', d: 'Bebek elbisesi · çocuk kıyafeti · okul kıyafeti · kostüm dikimi. Büyük beden elbise · pantolon · gömlek; beden seti çıkarma, özel kalıp. Anne grubu toplu sipariş indirimi.', p: '₺200+' },
    en: { n: 'Children · Baby · Plus Size', d: "Baby dresses · children's clothing · school uniforms · costumes. Plus-size dresses · trousers · shirts; custom pattern sets. Group discounts for parent communities.", p: '₺200+' },
    ru: { n: 'Детская · Большие размеры', d: 'Одежда для малышей · детская одежда · школьная форма · костюмы. Одежда больших размеров, индивидуальные лекала. Скидки для мам-групп.', p: '₺200+' },
    de: { n: 'Kinder · Baby · Übergrößen', d: 'Babykleider · Kinderkleidung · Schulkleidung · Kostüme. Übergrößen: Kleider, Hosen, Hemden; individuelle Schnittmuster. Gruppenrabatt.', p: '₺200+' },
  },
  {
    icon: '🏨',
    // Garson/otel personeli üniforma — beyaz gömlekli servis personeli
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=75&auto=format&fit=crop',
    tr: { n: 'Üniforma Üretimi', d: 'Otel personel · resepsiyon · kat görevlisi · aşçı · garson · meydancı · kapıcı · güvenlik · spa · animatör üniforma. Doktor · hemşire · okul · spor takımı. Tasarım + kalıp + seri imalat + nakış tek elden.', p: 'Teklif Al' },
    en: { n: 'Uniform Production', d: 'Hotel staff · reception · housekeeping · chef · waiter · valet · security · spa · animation. Doctor · nurse · school · sports teams. Design + pattern + mass production + embroidery all in one.', p: 'Get Quote' },
    ru: { n: 'Производство формы', d: 'Гостиничный персонал · ресепшн · горничные · повара · официанты · охрана · спа · аниматоры. Врачи · медсёстры · школа · спорт. Дизайн + лекала + серийное производство + вышивка.', p: 'Запрос цены' },
    de: { n: 'Uniformproduktion', d: 'Hotelpersonal · Rezeption · Zimmermädchen · Köche · Kellner · Sicherheit · Spa · Animation. Ärzte · Krankenschwestern · Schule · Sport. Design + Schnittmuster + Serienproduktion + Stickerei.', p: 'Angebot' },
  },
  {
    icon: '🪡',
    // Nakış makinesi / renkli iplikler / tekstil nakışı
    img: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=700&q=75&auto=format&fit=crop',
    tr: { n: 'Nakış · Baskı · Sweatshirt', d: 'Logo nakışı · isim nakışı · üniforma nakışı · dijital baskı · transfer baskı · serigrafi. Sweatshirt · eşofman · kapüşonlu · polo yaka dikimi. Seri üretim için uygun fiyatlı.', p: '₺100+' },
    en: { n: 'Embroidery · Print · Sweatshirt', d: 'Logo embroidery · name embroidery · uniform embroidery · digital print · screen print. Sweatshirt · tracksuit · hoodie · polo sewing. Affordable for mass production.', p: '₺100+' },
    ru: { n: 'Вышивка · Печать · Толстовки', d: 'Вышивка логотипа · имена · форма · цифровая печать · трафаретная печать. Пошив толстовок · спортивных костюмов · худи · поло. Для серийного производства.', p: '₺100+' },
    de: { n: 'Stickerei · Druck · Sweatshirt', d: 'Logo-Stickerei · Namens-Stickerei · Uniformstickerei · Digitaldruck · Siebdruck. Sweatshirt · Trainingsanzug · Hoodie · Polo nähen. Für Serienproduktion.', p: '₺100+' },
  },
  {
    icon: '🧺',
    // Temizlenmiş asılı kıyafetler / ütülü gömlek / kuru temizlemeci
    img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=700&q=75&auto=format&fit=crop',
    tr: { n: 'Kuru Temizleme & Çamaşır', d: 'Kuru temizleme · çamaşır yıkama · ütü hizmeti. Otel ve adreslerden kurye ile alım. 24 saatte teslim. Turistler için ekspres servis.', p: '₺300+' },
    en: { n: 'Dry Cleaning & Laundry', d: 'Dry cleaning · laundry · ironing. Courier pickup from hotels and addresses. 24-hour express turnaround. Express service for tourists.', p: '₺300+' },
    ru: { n: 'Химчистка и стирка', d: 'Химчистка · стирка · глажка. Курьер заберёт из отеля или по адресу. Экспресс за 24 часа. Для туристов.', p: '₺300+' },
    de: { n: 'Reinigung & Wäsche', d: 'Chemische Reinigung · Wäsche · Bügeln. Kurierabholung im Hotel oder an der Adresse. 24-Stunden-Express. Für Touristen.', p: '₺300+' },
  },
  {
    icon: '💍',
    // Beyaz gelinlik / gelin elbisesi detayı — düğün kıyafeti
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=75&auto=format&fit=crop',
    tr: { n: 'Gelinlik · Abiye · Özel Gün', d: 'Gelinlik dikimi · gelinlik tadilatı · damatlık dikimi · abiye dikimi · abiye tamiri · nişan elbisesi · kına kıyafeti · gece elbisesi. Kusursuz fit garantisi. Ekspres randevu.', p: '₺500+' },
    en: { n: 'Wedding · Evening · Special', d: 'Wedding dress sewing · bridal alterations · groom suit · evening gown sewing/repair · engagement dress. Perfect fit guaranteed. Express appointments.', p: '₺500+' },
    ru: { n: 'Свадьба · Вечер · Особый день', d: 'Пошив свадебного платья · подгонка · смокинг · вечернее платье · ремонт вечернего платья. Идеальная посадка гарантирована.', p: '₺500+' },
    de: { n: 'Hochzeit · Abend · Besonderer Anlass', d: 'Brautkleid nähen · Anpassung · Bräutigamanzug · Abendkleid nähen/reparieren. Perfekte Passform garantiert.', p: '₺500+' },
  },
  {
    icon: '🏭',
    // Tekstil fabrikası / dikiş makineleri sıra / konfeksiyon üretim bandı
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=75&auto=format&fit=crop',
    tr: { n: 'Kalıp · Fason · Seri İmalat', d: 'Kalıp çıkarma · model tasarımı · kesim · dikim · ütü · paket. Numune dikimi · prototip · seri imalat · fason üretim. Markalar, butikler ve e-ticaret firmaları için tam üretim paketi.', p: 'Teklif Al' },
    en: { n: 'Pattern · Manufacturing', d: 'Pattern making · model design · cutting · sewing · ironing · packaging. Sample · prototype · mass production · contract manufacturing. Full production for brands, boutiques, e-commerce.', p: 'Get Quote' },
    ru: { n: 'Лекала · Серийное производство', d: 'Лекала · дизайн · раскрой · пошив · глажка · упаковка. Образцы · прототип · серийное производство. Полный пакет для брендов и интернет-магазинов.', p: 'Запрос цены' },
    de: { n: 'Schnittmuster · Serienproduktion', d: 'Schnittmuster · Modelldesign · Zuschnitt · Nähen · Bügeln · Verpackung. Muster · Prototyp · Serienproduktion. Für Marken, Boutiquen, E-Commerce.', p: 'Angebot' },
  },
];

const WHY = [
  { icon: '⚡', tr: ['24–48 Saat Teslimat','Tatildesiniz, beklemenize gerek yok. Ekspres servis garantisi.'], en: ['24–48h Express',"You're on holiday — express service guaranteed."], ru: ['24–48 часов','Вы в отпуске — экспресс-сервис.'], de: ['24–48h Express','Sie sind im Urlaub — kein Warten.'] },
  { icon: '🚗', tr: ['Araçlı Terzi Servisi','Adresinize gelip ölçü alıyor, bitirince teslim ediyoruz.'], en: ['Mobile Tailor','We come to you, measure on-site and deliver.'], ru: ['Выездной портной','Приедем к вам, снимем мерки и доставим.'], de: ['Mobiler Schneider','Wir kommen zu Ihnen, messen und liefern.'] },
  { icon: '🌍', tr: ['4 Dilde Hizmet','Türkçe, İngilizce, Rusça, Almanca. Dil engeli yok.'], en: ['4 Languages','Turkish, English, Russian, German — no barrier.'], ru: ['4 языка','Турецкий, английский, русский, немецкий.'], de: ['4 Sprachen','Türkisch, Englisch, Russisch, Deutsch.'] },
  { icon: '🏨', tr: ['Otele Alım & Teslimat','Tüm Antalya otellerine alım ve teslimat.'], en: ['Hotel Pickup & Delivery','Pickup & delivery to all Antalya hotels.'], ru: ['Забор и доставка в отель','Любой отель Антальи.'], de: ['Hotel Abholung & Lieferung','Alle Antalya-Hotels.'] },
  { icon: '🏭', tr: ['Üniforma Üretimi','Otel, restoran, sağlık, okul — tasarım + seri imalat.'], en: ['Uniform Production','Hotel, restaurant, medical, school — design & mass production.'], ru: ['Производство формы','Отели, рестораны, медицина, школы.'], de: ['Uniformproduktion','Hotel, Restaurant, Medizin, Schule.'] },
  { icon: '🪡', tr: ['Nakış & Logo Baskı','Logo nakışı, dijital baskı, serigrafi. Toplu üretim.'], en: ['Embroidery & Print','Logo embroidery, digital print. Bulk production.'], ru: ['Вышивка и печать','Логотип, цифровая печать. Оптом.'], de: ['Stickerei & Druck','Logo-Stickerei, Digitaldruck, Siebdruck.'] },
  { icon: '💳', tr: ['Döviz Kabul','TL, Euro, Dolar, Ruble kabul ediyoruz.'], en: ['Multi-Currency','TL, Euro, Dollar and Ruble accepted.'], ru: ['Валюта','TL, евро, доллар, рубли.'], de: ['Währungen','TL, Euro, Dollar und Rubel.'] },
  { icon: '⭐', tr: ['4.9 · 94 Müşteri',"Google'da 4.9 yıldız. Antalya'nın en çok tercih edilen terzisi."], en: ['4.9 · 94 Reviews','4.9 stars on Google. Most recommended tailor in Antalya.'], ru: ['4.9 · 94 клиента','4.9 звезды на Google.'], de: ['4,9 · 94 Bewertungen','4,9 Sterne auf Google.'] },
];

const REVIEWS = [
  { stars: 5, text: '"Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim, nakış kalitesi harika!"', author: 'Murat B.', flag: '🇹🇷', city: 'Antalya', date: 'Ocak 2025' },
  { stars: 5, text: '"Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional. Highly recommend!"', author: 'Sarah M.', flag: '🇬🇧', city: 'London', date: 'Mayıs 2025' },
  { stars: 5, text: '"Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель в Белеке!"', author: 'Наталья К.', flag: '🇷🇺', city: 'Москва', date: 'Haziran 2025' },
  { stars: 5, text: '"Wir bestellten bestickte Sweatshirts für unser Team — 30 Stück, Logo-Stickerei, pünktlich geliefert. Ausgezeichnete Qualität!"', author: 'David K.', flag: '🇩🇪', city: 'Berlin', date: 'Şubat 2025' },
  { stars: 5, text: '"Gelinliğimi mükemmel şekilde teslim ettiler. Paça kısaltmayı aynı gün yaptılar. Hızlı ve kaliteli hizmet!"', author: 'Elif Y.', flag: '🇹🇷', city: 'Antalya', date: 'Nisan 2025' },
  { stars: 5, text: '"Suit altered for a business meeting in 24h. Perfect fit. English speaking — best tailor in Antalya!"', author: 'James T.', flag: '🇦🇺', city: 'Sydney', date: 'Mart 2025' },
];

const PRICES: Record<Lang, string[][]> = {
  tr: [['Paça / Etek Kısaltma','₺150+','24 saat'],['Fermuar — Pantolon / Kot','₺120+','Aynı gün'],['Fermuar — Mont / Kaban','₺300+','24 saat'],['Elbise / Ceket Daraltma','₺200+','48 saat'],['Kol Kısaltma (Ceket)','₺200+','48 saat'],['Yırtık Onarımı','₺100+','Aynı gün'],['Gelinlik Tadilatı','₺500+','3–5 gün'],['Abiye Tamiri','₺350+','48 saat'],['Takım Elbise Dikimi','₺2.500+','5–7 gün'],['Sweatshirt Dikimi','₺400+','3–5 gün'],['Kuru Temizleme (Elbise)','₺300+','48 saat'],['Kuru Temizleme (Mont)','₺500+','48 saat'],['Çamaşır & Ütü (kg)','₺80+/kg','24 saat'],['Üniforma (kişi başı)','Teklif','Sipariş miktarına göre']],
  en: [['Trouser / Skirt Hemming','₺150+','24h'],['Zip — Trousers / Jeans','₺120+','Same day'],['Zip — Coat / Jacket','₺300+','24h'],['Dress / Jacket Taking In','₺200+','48h'],['Sleeve Shortening','₺200+','48h'],['Tear Repair','₺100+','Same day'],['Wedding Dress Alteration','₺500+','3–5 days'],['Evening Gown Repair','₺350+','48h'],['Bespoke Suit','₺2,500+','5–7 days'],['Sweatshirt Sewing','₺400+','3–5 days'],['Dry Cleaning (Dress)','₺300+','48h'],['Dry Cleaning (Coat)','₺500+','48h'],['Laundry & Ironing (kg)','₺80+/kg','24h'],['Uniform (per person)','Quote','Based on qty']],
  ru: [['Подгонка брюк / юбки','₺150+','24 ч'],['Молния — брюки / джинсы','₺120+','В тот же день'],['Молния — пальто / куртка','₺300+','24 ч'],['Заужение платья / пиджака','₺200+','48 ч'],['Укорочение рукавов','₺200+','48 ч'],['Ремонт разрыва','₺100+','В тот же день'],['Свадебное платье','₺500+','3–5 дней'],['Вечернее платье','₺350+','48 ч'],['Костюм на заказ','₺2.500+','5–7 дней'],['Пошив толстовки','₺400+','3–5 дней'],['Химчистка (платье)','₺300+','48 ч'],['Химчистка (пальто)','₺500+','48 ч'],['Стирка и глажка (кг)','₺80+/кг','24 ч'],['Форма (за чел.)','Запрос','По заказу']],
  de: [['Hose / Rock kürzen','₺150+','24h'],['Reißverschluss — Hose/Jeans','₺120+','Gleicher Tag'],['Reißverschluss — Mantel','₺300+','24h'],['Kleid / Jacke einengen','₺200+','48h'],['Ärmel kürzen','₺200+','48h'],['Riss reparieren','₺100+','Gleicher Tag'],['Brautkleid Änderung','₺500+','3–5 Tage'],['Abendkleid Reparatur','₺350+','48h'],['Maßanzug','₺2.500+','5–7 Tage'],['Sweatshirt nähen','₺400+','3–5 Tage'],['Reinigung (Kleid)','₺300+','48h'],['Reinigung (Mantel)','₺500+','48h'],['Wäsche & Bügeln (kg)','₺80+/kg','24h'],['Uniform (pro Person)','Angebot','Je nach Menge']],
};

const ILCELER = [
  { ilce: 'Muratpaşa', m: ['Fener','Kışla','Güzeloba','Balbey','Kaleiçi','Haşimişcan','Yenigün','Meltem','Çağlayan','Bahçelievler','Şirinyalı','Aspendos'] },
  { ilce: 'Konyaaltı', m: ['Hurma','Sarısu','Liman','Uncalı','Arapsuyu','Gürsu','Kızıltoprak','Çakırlar','Altınkum','Camikebir'] },
  { ilce: 'Kepez', m: ['Varsak','Santral','Yavuz Selim','Pınarbaşı','Altındağ','Göksu','Şafak','Göçerler','Atatürk','Yeşilbayır','Emek','Teomanpaşa'] },
  { ilce: 'Lara / Aksu', m: ['Belek','Kadriye','Boğazkent','Çandır','Güneykent','Gebiz','Kundu','Güzeloba','Altıntaş'] },
  { ilce: 'Kemer', m: ['Kemer Merkez','Beldibi','Göynük','Çamyuva','Tekirova','Arslanbucak','Kiriş'] },
  { ilce: 'Alanya', m: ['Alanya Merkez','Mahmutlar','Oba','Tosmur','Avsallar','Kestel','Türkler','Konaklı','Cikcilli','Kargıcak'] },
  { ilce: 'Manavgat / Side', m: ['Manavgat Merkez','Side','Sorgun','Kumköy','Evrenseki','Gündoğdu','Çolaklı','Titreyengöl'] },
  { ilce: 'Serik / Döşemealtı', m: ['Serik Merkez','Habibler','Yağca','Taşağıl','Döşemealtı Merkez'] },
  { ilce: 'Kaş · Finike · Diğer', m: ['Kaş Merkez','Kalkan','Finike Merkez','Kumluca','Elmalı','Korkuteli','Akseki'] },
];

const GALLERY = [
  // Alışveriş yapan zarif kadın / moda — büyük kart
  { img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80&auto=format&fit=crop', tr: 'Özel Dikim', en: 'Custom Sewing', ru: 'Пошив на заказ', de: 'Maßanfertigung' },
  // Dikiş makinesi yakın çekim
  { img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&q=80&auto=format&fit=crop', tr: 'Tadilat', en: 'Alterations', ru: 'Подгонка', de: 'Änderungen' },
  // Beyaz gelinlik
  { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80&auto=format&fit=crop', tr: 'Gelinlik', en: 'Bridal', ru: 'Свадьба', de: 'Brautkleid' },
  // Askıda asılı şık kıyafetler
  { img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&q=80&auto=format&fit=crop', tr: 'Üniforma', en: 'Uniforms', ru: 'Форма', de: 'Uniformen' },
  // Ütülenmiş temiz asılı kıyafetler
  { img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=700&q=80&auto=format&fit=crop', tr: 'Kuru Temizleme', en: 'Dry Cleaning', ru: 'Химчистка', de: 'Reinigung' },
  // Terzi atölyesi / kumaş ve dikiş
  { img: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=700&q=80&auto=format&fit=crop', tr: 'Atölye', en: 'Atelier', ru: 'Ателье', de: 'Atelier' },
];

export default function TerziClient() {
  const [lang, setLang] = useState<Lang>('tr');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeIlce, setActiveIlce] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const c = C[lang];

  useEffect(() => {
    const bl = (navigator.language || '').toLowerCase();
    if (bl.startsWith('de')) setLang('de');
    else if (bl.startsWith('ru')) setLang('ru');
    else if (bl.startsWith('en')) setLang('en');
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const faqId = (i: number) => `faq-answer-${i}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Jost:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--g:#c9a96e;--g2:#e8d5a3;--g3:#8b6f47;--ink:#0d0c0a;--ink2:#1a1814;--ink3:#252320;--cr:#f5f0e8;--cr2:#ede7d9;--mt:#7a7268;--serif:'Playfair Display',Georgia,serif;--sans:'Jost',system-ui,sans-serif}
        html{scroll-behavior:smooth}
        body{background:var(--ink);color:var(--cr);font-family:var(--sans);font-weight:300;line-height:1.7;overflow-x:hidden}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--ink)}::-webkit-scrollbar-thumb{background:var(--g3)}
        @keyframes fup{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fup .8s ease both}.fu1{animation:fup .8s .1s ease both}.fu2{animation:fup .9s .2s ease both}.fu3{animation:fup 1s .3s ease both}.fu4{animation:fup 1s .4s ease both}

        /* NAV */
        .nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;transition:all .35s}
        .nav.up{background:rgba(13,12,10,.97);backdrop-filter:blur(18px);border-bottom:1px solid rgba(201,169,110,.12);padding:.65rem 1.5rem}
        .nav-logo{font-family:var(--serif);font-size:1.3rem;color:var(--g);text-decoration:none;letter-spacing:.03em}
        .nav-links{display:flex;gap:1.5rem;list-style:none}
        .nav-links a{color:var(--cr2);text-decoration:none;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;transition:color .3s}
        .nav-links a:hover{color:var(--g)}
        .lsw{display:flex;gap:.35rem}
        .lb{background:none;border:1px solid rgba(201,169,110,.22);color:var(--mt);font-size:.68rem;padding:.26rem .55rem;cursor:pointer;font-family:var(--sans);text-transform:uppercase;letter-spacing:.08em;transition:all .25s;border-radius:2px}
        .lb.on,.lb:hover{border-color:var(--g);color:var(--g);background:rgba(201,169,110,.08)}

        /* HERO */
        .hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:0 1.5rem 4rem;overflow:hidden}
        .hbg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80&auto=format&fit=crop') center 40%/cover;filter:brightness(.17) saturate(.5)}
        .hov{position:absolute;inset:0;background:linear-gradient(155deg,rgba(13,12,10,.25) 0%,rgba(13,12,10,.8) 55%,var(--ink) 100%)}
        .hgrain{position:absolute;inset:0;opacity:.025;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E") repeat;background-size:120px}
        .hc{position:relative;z-index:2;max-width:860px}
        .hbadge{display:inline-flex;align-items:center;gap:.8rem;font-size:.7rem;letter-spacing:.28em;text-transform:uppercase;color:var(--g);border:1px solid rgba(201,169,110,.28);padding:.38rem 1.1rem;margin-bottom:2rem}
        .hero h1{font-family:var(--serif);font-size:clamp(3rem,8vw,7.5rem);line-height:.95;font-weight:900}
        .hero h1 em{color:var(--g);font-style:italic}
        .hsub{margin-top:1.6rem;font-size:.92rem;color:var(--cr2);max-width:480px;letter-spacing:.04em;line-height:1.9}
        .hacts{margin-top:2.5rem;display:flex;gap:.9rem;flex-wrap:wrap}
        .hstats{position:relative;z-index:2;margin-top:4.5rem;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(201,169,110,.1);padding-top:1.8rem}
        .stat{padding:0 1.5rem 0 0;border-right:1px solid rgba(201,169,110,.07)}.stat:last-child{border-right:none}
        .stn{font-family:var(--serif);font-size:1.9rem;color:var(--g);font-weight:700;line-height:1}
        .stl{font-size:.68rem;color:var(--mt);letter-spacing:.15em;text-transform:uppercase;margin-top:.3rem}

        /* BUTTONS */
        .bg{display:inline-flex;align-items:center;gap:.5rem;background:var(--g);color:var(--ink);padding:.9rem 1.9rem;font-family:var(--sans);font-size:.8rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s}
        .bg:hover{background:var(--g2);transform:translateY(-2px)}
        .bo{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--cr);padding:.9rem 1.9rem;font-family:var(--sans);font-size:.8rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(245,240,232,.28);cursor:pointer;transition:all .3s}
        .bo:hover{border-color:var(--g);color:var(--g);transform:translateY(-2px)}

        /* SECTIONS */
        section{padding:5.5rem 1.5rem}
        .ctr{max-width:1160px;margin:0 auto}
        .sh{text-align:center;margin-bottom:3.2rem}
        .ey{font-size:.68rem;letter-spacing:.28em;text-transform:uppercase;color:var(--g);font-weight:500;margin-bottom:.7rem}
        .st{font-family:var(--serif);font-size:clamp(1.8rem,3.8vw,2.9rem);font-weight:700;line-height:1.15}
        .ss{color:var(--mt);margin-top:.7rem;font-size:.88rem;max-width:500px;margin-left:auto;margin-right:auto}
        .gl{display:block;width:38px;height:2px;background:var(--g);margin:1.1rem auto 0}

        /* SEO INTRO BLOCK — visible, styled */
        .seobl{background:var(--ink2);padding:1.6rem 2rem;border-left:2px solid var(--g3);font-size:.82rem;color:var(--cr2);line-height:1.9}

        /* MOBILE SERVICE */
        .msec{background:linear-gradient(135deg,var(--ink2) 0%,#231a0f 100%);position:relative;overflow:hidden}
        .msec::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--g),transparent)}
        .msteps{display:grid;grid-template-columns:repeat(4,1fr);gap:.9rem}
        .ms{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:1.1rem .7rem;text-align:center}
        .ms-ic{font-size:1.5rem;margin-bottom:.55rem}
        .ms-t{font-size:.82rem;font-weight:600;color:var(--g);margin-bottom:.3rem}
        .ms-d{font-size:.7rem;color:var(--mt);line-height:1.45}

        /* SERVICES */
        .svcgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px}
        .scard{position:relative;overflow:hidden;min-height:370px;display:flex;flex-direction:column;justify-content:flex-end}
        .simg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.28) saturate(.4);transition:transform .7s ease,filter .5s}
        .scard:hover .simg{transform:scale(1.06);filter:brightness(.2) saturate(.3)}
        .sov{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,12,10,.97) 0%,rgba(13,12,10,.3) 55%,transparent 100%)}
        .sbody{position:relative;z-index:2;padding:1.8rem}
        .sic{font-size:1.7rem;margin-bottom:.7rem}
        .stitle{font-family:var(--serif);font-size:1.35rem;font-weight:700;margin-bottom:.5rem}
        .sdesc{font-size:.8rem;color:var(--cr2);line-height:1.7;margin-bottom:.9rem}
        .sprice{display:inline-block;font-size:.68rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--g);border:1px solid rgba(201,169,110,.28);padding:.28rem .75rem}
        .sline{position:absolute;bottom:0;left:1.8rem;right:1.8rem;height:1.5px;background:linear-gradient(to right,var(--g),transparent);transform:scaleX(0);transform-origin:left;transition:transform .5s ease}
        .scard:hover .sline{transform:scaleX(1)}

        /* GALLERY */
        .galgrid{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:270px 270px;gap:2px}
        .gitem{overflow:hidden;position:relative}
        .gitem:first-child{grid-row:1/3}
        .gitem img{width:100%;height:100%;object-fit:cover;filter:saturate(.6) brightness(.78);transition:transform .6s ease,filter .4s}
        .gitem:hover img{transform:scale(1.07);filter:saturate(1) brightness(1)}
        .gcap{position:absolute;bottom:0;left:0;right:0;padding:.7rem 1rem;background:linear-gradient(to top,rgba(13,12,10,.8),transparent);font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;color:var(--g);opacity:0;transition:opacity .4s}
        .gitem:hover .gcap{opacity:1}

        /* WHY */
        .whygrid{display:grid;grid-template-columns:repeat(4,1fr);gap:.9rem}
        .wcard{background:var(--ink3);border:1px solid rgba(201,169,110,.07);border-radius:4px;padding:1.3rem}
        .wic{width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,var(--g3),var(--g));display:flex;align-items:center;justify-content:center;font-size:.95rem;margin-bottom:.9rem}
        .wt{font-size:.85rem;font-weight:600;margin-bottom:.35rem}
        .wd{font-size:.76rem;color:var(--mt);line-height:1.5}

        /* REVIEWS */
        .revgrid{display:flex;flex-direction:column;gap:.7rem;max-width:660px;margin:0 auto}
        .rcard{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.055);border-radius:6px;padding:1.3rem}
        .rstars{color:#f59e0b;margin-bottom:.5rem}
        .rtxt{font-size:.83rem;color:rgba(255,255,255,.58);line-height:1.8;font-style:italic;margin-bottom:.7rem}
        .rauth{font-size:.76rem;color:var(--g);font-weight:600}

        /* PRICE TABLE */
        .ptable{width:100%;border-collapse:collapse}
        .ptable th{text-align:left;font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:var(--g);border-bottom:1px solid rgba(201,169,110,.18);padding:.65rem .75rem;font-weight:500}
        .ptable th:not(:first-child){text-align:right}
        .ptable td{padding:.85rem .75rem;font-size:.84rem;border-bottom:1px solid rgba(255,255,255,.03);color:var(--cr2)}
        .ptable tr:nth-child(even) td{background:rgba(201,169,110,.025)}
        .ptable tr:hover td{background:rgba(201,169,110,.06)}
        .tpr{color:var(--g);font-weight:600;text-align:right;white-space:nowrap}
        .ttm{color:var(--mt);font-size:.73rem;text-align:right}

        /* AREAS */
        .ilwrap{display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center;margin-bottom:1.3rem}
        .ilbtn{background:none;border:1px solid rgba(201,169,110,.16);color:var(--cr2);font-size:.76rem;padding:.38rem .95rem;cursor:pointer;font-family:var(--sans);border-radius:2px;transition:all .25s}
        .ilbtn.on,.ilbtn:hover{border-color:var(--g);color:var(--g);background:rgba(201,169,110,.07)}
        .mahwrap{background:var(--ink3);border:1px solid rgba(201,169,110,.09);border-radius:4px;padding:1.1rem;display:flex;flex-wrap:wrap;gap:.38rem}
        .mchip{font-size:.7rem;color:var(--cr2);border:1px solid rgba(201,169,110,.13);padding:.22rem .65rem;border-radius:2px}

        /* FAQ */
        .faqlist{max-width:700px;margin:0 auto}
        .faqitem{border-bottom:1px solid rgba(201,169,110,.07)}
        .faqq{width:100%;background:none;border:none;padding:1.2rem 0;display:flex;align-items:center;justify-content:space-between;gap:.9rem;cursor:pointer;text-align:left;font-family:var(--sans);font-size:.93rem;color:var(--cr);font-weight:400;transition:color .3s}
        .faqq:hover{color:var(--g)}
        .faqico{flex-shrink:0;width:21px;height:21px;border:1px solid rgba(201,169,110,.28);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.9rem;color:var(--g);transition:transform .35s}
        .faqico.open{transform:rotate(45deg)}
        .faqa{max-height:0;overflow:hidden;transition:max-height .45s ease,padding .3s;font-size:.83rem;color:var(--mt);line-height:1.85}
        .faqa.open{max-height:280px;padding-bottom:1.2rem}

        /* CONTACT */
        .cgrid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
        .crow{display:flex;gap:.75rem;align-items:flex-start;padding:.9rem 0;border-bottom:1px solid rgba(201,169,110,.06)}
        .clbl{font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:var(--g);margin-bottom:.18rem}
        .cval{font-size:.92rem}
        .cval a{color:var(--cr);text-decoration:none;transition:color .3s}
        .cval a:hover{color:var(--g)}
        .mapbox{background:var(--ink3);border:1px solid rgba(201,169,110,.09);border-radius:4px;height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem}

        /* FOOTER */
        footer{background:var(--ink);border-top:1px solid rgba(201,169,110,.07);padding:2.2rem 1.5rem}
        .fkws{display:flex;flex-wrap:wrap;gap:.28rem;justify-content:center;margin-top:1rem}
        .kpill{font-size:.62rem;color:rgba(201,169,110,.4);border:1px solid rgba(201,169,110,.1);padding:.18rem .55rem;border-radius:2px}

        /* WA FLOAT */
        .wafloat{position:fixed;bottom:1.6rem;right:1.6rem;z-index:150;width:3rem;height:3rem;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;font-size:1.3rem;text-decoration:none;box-shadow:0 4px 16px rgba(37,211,102,.4);transition:transform .3s}
        .wafloat:hover{transform:scale(1.1)}

        /* SKIP LINK for accessibility */
        .skip-link{position:absolute;top:-40px;left:0;background:var(--g);color:var(--ink);padding:.5rem 1rem;font-weight:700;z-index:999;transition:top .2s}
        .skip-link:focus{top:0}

        /* MOBILE */
        @media(max-width:768px){
          .nav-links{display:none}
          .hero h1{font-size:2.7rem}
          .hstats{grid-template-columns:repeat(2,1fr);gap:1.3rem}
          .svcgrid{grid-template-columns:1fr}
          .msteps{grid-template-columns:repeat(2,1fr)}
          .galgrid{grid-template-columns:1fr 1fr;grid-template-rows:auto}
          .gitem:first-child{grid-row:auto;grid-column:1/-1;height:210px}
          .gitem{height:155px}
          .whygrid{grid-template-columns:1fr 1fr}
          .cgrid{grid-template-columns:1fr;gap:2rem}
          section{padding:3.2rem 1.1rem}
          .lsw{flex-wrap:wrap}
          .seobl{padding:1.2rem 1.1rem}
        }
        @media(max-width:480px){.whygrid{grid-template-columns:1fr}}
      `}</style>

      {/* Skip to main content — accessibility */}
      <a href="#main-content" className="skip-link">
        {lang === 'tr' ? 'İçeriğe geç' : lang === 'en' ? 'Skip to content' : lang === 'ru' ? 'К содержанию' : 'Zum Inhalt'}
      </a>

      {/* WA Float */}
      <a
        href={WA(c.waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="wafloat"
        aria-label="WhatsApp ile iletişim"
        title="WhatsApp"
      >
        💬
      </a>

      {/* NAVBAR */}
      <nav className={`nav${scrolled ? ' up' : ''}`} role="navigation" aria-label="Ana navigasyon">
        <a href="#" className="nav-logo" aria-label="Terzi Can - Ana Sayfa">Terzi Can</a>
        <ul className="nav-links">
          <li><a href="#services">{c.s_services}</a></li>
          <li><a href="#prices">{c.s_prices.split(' ')[0]}</a></li>
          <li><a href="#faq">{c.s_faq}</a></li>
          <li><a href="#contact">{c.s_contact}</a></li>
        </ul>
        <div className="lsw" role="group" aria-label="Dil seçimi">
          {(['tr','en','ru','de'] as Lang[]).map(l => (
            <button
              key={l}
              className={`lb${lang === l ? ' on' : ''}`}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              aria-label={`Dil: ${l.toUpperCase()}`}
            >
              {l === 'tr' ? '🇹🇷' : l === 'en' ? '🇬🇧' : l === 'ru' ? '🇷🇺' : '🇩🇪'} {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" aria-label="Hero">
        <div className="hbg" role="presentation" aria-hidden="true"/>
        <div className="hov" role="presentation" aria-hidden="true"/>
        <div className="hgrain" role="presentation" aria-hidden="true"/>
        <div className="ctr">
          <div className="hc">
            <span className="hbadge fu">{c.badge}</span>
            <h1 className="fu1">{c.h1}<br/><em>{c.h1em}</em></h1>
            <p className="hsub fu2">{c.sub}</p>
            <div className="fu2" style={{marginTop:'1rem',display:'flex',gap:'.4rem',alignItems:'center',flexWrap:'wrap'}}>
              <span aria-label="5 yıldız" role="img">⭐⭐⭐⭐⭐</span>
              <span style={{fontSize:'.88rem',fontWeight:700,marginLeft:'.3rem'}}>4.9</span>
              <span style={{fontSize:'.8rem',color:'var(--mt)'}}>
                (94 {lang==='tr'?'değerlendirme':lang==='en'?'reviews':lang==='ru'?'отзывов':'Bewertungen'})
              </span>
            </div>
            <div className="hacts fu3">
              <a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer" className="bg">💬 {c.waBtn}</a>
              <a href="#services" className="bo">{c.downBtn}</a>
            </div>
          </div>
          <div className="hstats fu4" aria-label="İstatistikler">
            {([
              ['10+', lang==='tr'?'Yıllık Deneyim':lang==='en'?'Years Exp.':lang==='ru'?'Лет опыта':'Jahre Erfahrung'],
              ['5000+', lang==='tr'?'Mutlu Müşteri':lang==='en'?'Happy Clients':lang==='ru'?'Клиентов':'Kunden'],
              ['24–48h', lang==='tr'?'Ekspres Teslimat':lang==='en'?'Express Delivery':lang==='ru'?'Экспресс':'Express'],
              ['TR·EN·RU·DE', lang==='tr'?'4 Dil':'4 Languages'],
            ] as [string,string][]).map(([n,l],i)=>(
              <div key={i} className="stat">
                <div className="stn">{n}</div>
                <div className="stl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO INTRO — visible, natural prose, crawlable */}
      <div style={{background:'var(--ink2)',padding:'2rem 1.5rem'}} id="main-content">
        <div className="ctr">
          <p className="seobl">{c.seoIntro}</p>
        </div>
      </div>

      {/* MOBILE SERVICE */}
      <section className="msec" aria-labelledby="mobile-heading">
        <div className="ctr">
          <div className="sh">
            <div className="ey">🚗 {c.s_mobile}</div>
            <h2 className="st" id="mobile-heading">{c.mobileHeading}</h2>
            <p className="ss">{c.mobileDesc}</p>
            <span className="gl" aria-hidden="true"/>
          </div>
          <div className="msteps" role="list">
            {c.steps.map(([ic,t,d],i)=>(
              <div key={i} className="ms" role="listitem">
                <div className="ms-ic" aria-hidden="true">{ic}</div>
                <div className="ms-t">{t}</div>
                <div className="ms-d">{d}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'2.2rem',display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <a href={WA(c.mobileMsg)} target="_blank" rel="noopener noreferrer" className="bg">{c.mobileCta}</a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{background:'var(--ink2)',padding:'0'}} aria-labelledby="services-heading">
        <div className="ctr" style={{padding:'4.5rem 1.5rem 2rem'}}>
          <div className="sh">
            <div className="ey">✦ {c.s_services}</div>
            <h2 className="st" id="services-heading">
              {lang==='tr'?'Ne Yapıyoruz?':lang==='en'?'What We Offer':lang==='ru'?'Что мы предлагаем':'Was wir anbieten'}
            </h2>
            <p className="ss">
              {lang==='tr'?'Her kıyafete, her bedene, her ihtiyaca özel profesyonel terzilik.':lang==='en'?'Professional tailoring for every garment, size and need.':lang==='ru'?'Профессиональный пошив для любой одежды и размера.':'Professionelle Schneiderei für jedes Kleidungsstück.'}
            </p>
            <span className="gl" aria-hidden="true"/>
          </div>
        </div>
        <div className="svcgrid">
          {SERVICES.map((s,i)=>(
            <article key={i} className="scard">
              <img src={s.img} alt={`${s[lang].n} — Terzi Can Antalya`} className="simg" loading="lazy" width="700" height="500"/>
              <div className="sov" aria-hidden="true"/>
              <div className="sbody">
                <div className="sic" aria-hidden="true">{s.icon}</div>
                <h3 className="stitle">{s[lang].n}</h3>
                <p className="sdesc">{s[lang].d}</p>
                <span className="sprice">{s[lang].p}</span>
              </div>
              <div className="sline" aria-hidden="true"/>
            </article>
          ))}
        </div>
        <div style={{textAlign:'center',padding:'2.2rem 1.5rem 4rem',display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer" className="bg">{c.quoteBtn}</a>
          <a href={WA(lang==='tr'?'Merhaba, toplu üniforma üretimi için fiyat teklifi almak istiyorum.':'Hello, I would like a bulk uniform production quote.')} target="_blank" rel="noopener noreferrer" className="bo">{c.bulkBtn}</a>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{padding:'0',background:'var(--ink3)'}} aria-label="Galeri">
        <div className="galgrid">
          {GALLERY.map((g,i)=>(
            <div key={i} className="gitem">
              <img src={g.img} alt={`${g[lang]} — Terzi Can Antalya`} loading="lazy" width="700" height="500"/>
              <div className="gcap" aria-hidden="true">{g[lang]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section style={{background:'var(--ink)'}} aria-labelledby="why-heading">
        <div className="ctr">
          <div className="sh">
            <div className="ey">✦ {c.s_why}</div>
            <h2 className="st" id="why-heading">
              {lang==='tr'?'Neden Terzi Can?':lang==='en'?'Why Choose Us?':lang==='ru'?'Почему выбирают нас?':'Warum Schneider Can?'}
            </h2>
            <span className="gl" aria-hidden="true"/>
          </div>
          <div className="whygrid">
            {WHY.map((w,i)=>(
              <div key={i} className="wcard">
                <div className="wic" aria-hidden="true">{w.icon}</div>
                <div className="wt">{w[lang][0]}</div>
                <div className="wd">{w[lang][1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{background:'var(--ink2)'}} aria-labelledby="reviews-heading">
        <div className="ctr">
          <div className="sh">
            <div className="ey">⭐ 4.9 / 5 · 94 {lang==='tr'?'Yorum':lang==='en'?'Reviews':lang==='ru'?'Отзывов':'Bewertungen'}</div>
            <h2 className="st" id="reviews-heading">{c.s_reviews}</h2>
            <span className="gl" aria-hidden="true"/>
          </div>
          <div className="revgrid">
            {REVIEWS.map((r,i)=>(
              <article key={i} className="rcard">
                <div className="rstars" aria-label={`${r.stars} yıldız`}>{'⭐'.repeat(r.stars)}</div>
                <p className="rtxt">{r.text}</p>
                <div className="rauth">
                  {r.flag} <strong>{r.author}</strong>
                  {' '}— {r.city} · <span style={{color:'var(--mt)',fontWeight:400}}>{r.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" style={{background:'var(--ink3)'}} aria-labelledby="prices-heading">
        <div className="ctr">
          <div className="sh">
            <div className="ey">₺ {lang==='tr'?'Şeffaf Fiyatlar':lang==='en'?'Transparent Pricing':lang==='ru'?'Прозрачные цены':'Transparente Preise'}</div>
            <h2 className="st" id="prices-heading">{c.s_prices}</h2>
            <p className="ss">
              {lang==='tr'?"Başlangıç fiyatları · Kesin teklif için WhatsApp'tan fotoğraf gönderin":lang==='en'?'Starting prices · Send a photo on WhatsApp for exact quote':lang==='ru'?'Начальные цены · Фото в WhatsApp для точной оценки':'Startpreise · Foto per WhatsApp für genaues Angebot'}
            </p>
            <span className="gl" aria-hidden="true"/>
          </div>
          <table className="ptable" aria-label={c.s_prices}>
            <thead>
              <tr>
                <th scope="col">{lang==='tr'?'Hizmet':lang==='en'?'Service':lang==='ru'?'Услуга':'Leistung'}</th>
                <th scope="col">{lang==='tr'?'Başlangıç Fiyatı':lang==='en'?'Starting Price':lang==='ru'?'Цена от':'Ab Preis'}</th>
                <th scope="col">{lang==='tr'?'Süre':lang==='en'?'Time':lang==='ru'?'Время':'Zeit'}</th>
              </tr>
            </thead>
            <tbody>
              {PRICES[lang].map(([svc,price,time],i)=>(
                <tr key={i}>
                  <td>{svc}</td>
                  <td className="tpr">{price}</td>
                  <td className="ttm">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{textAlign:'center',marginTop:'2rem'}}>
            <a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer" className="bg">{c.quoteBtn}</a>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section id="areas" style={{background:'var(--ink2)'}} aria-labelledby="areas-heading">
        <div className="ctr">
          <div className="sh">
            <div className="ey">📍 {c.s_areas}</div>
            <h2 className="st" id="areas-heading">
              Antalya — {lang==='tr'?'Tüm İlçeler':lang==='en'?'All Districts':lang==='ru'?'Все районы':'Alle Bezirke'}
            </h2>
            <p className="ss">{c.areaLabel}</p>
            <span className="gl" aria-hidden="true"/>
          </div>
          <div className="ilwrap" role="group" aria-label="İlçe seçimi">
            {ILCELER.map(({ilce})=>(
              <button
                key={ilce}
                className={`ilbtn${activeIlce===ilce?' on':''}`}
                onClick={()=>setActiveIlce(activeIlce===ilce?null:ilce)}
                aria-pressed={activeIlce===ilce}
                aria-expanded={activeIlce===ilce}
              >
                {ilce}
              </button>
            ))}
          </div>
          {activeIlce && (
            <div className="mahwrap" role="list" aria-label={`${activeIlce} mahalleleri`}>
              {ILCELER.find(i=>i.ilce===activeIlce)?.m.map(m=>(
                <span key={m} className="mchip" role="listitem">{m}</span>
              ))}
            </div>
          )}
          {/* SEO: Visible district/neighborhood text — NOT hidden, just small */}
          <p style={{fontSize:'.72rem',color:'rgba(201,169,110,.25)',marginTop:'1.5rem',lineHeight:1.8,textAlign:'center'}}>
            {ILCELER.flatMap(({ilce,m})=>m.map(mh=>`${mh} (${ilce})`)).join(' · ')}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{background:'var(--ink)'}} aria-labelledby="faq-heading">
        <div className="ctr">
          <div className="sh">
            <div className="ey">FAQ</div>
            <h2 className="st" id="faq-heading">{c.s_faq}</h2>
            <span className="gl" aria-hidden="true"/>
          </div>
          <div className="faqlist">
            {c.faq.map(([q,a],i)=>(
              <div key={i} className="faqitem">
                <button
                  className="faqq"
                  onClick={()=>setOpenFaq(openFaq===i?null:i)}
                  aria-expanded={openFaq===i}
                  aria-controls={faqId(i)}
                >
                  <span style={{flex:1}}>{q}</span>
                  <span className={`faqico${openFaq===i?' open':''}`} aria-hidden="true">+</span>
                </button>
                <div
                  id={faqId(i)}
                  className={`faqa${openFaq===i?' open':''}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                >
                  {a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{background:'var(--ink2)'}} aria-labelledby="contact-heading">
        <div className="ctr">
          <div className="sh">
            <div className="ey">✦ {c.s_contact}</div>
            <h2 className="st" id="contact-heading" style={{fontStyle:'italic'}}>
              {lang==='tr'?'Hızlı İletişim':lang==='en'?'Quick Contact':lang==='ru'?'Быстрый Контакт':'Schneller Kontakt'}
            </h2>
            <p className="ss">
              {lang==='tr'?'Hızlı yanıt için WhatsApp tercih edin.':lang==='en'?'For instant reply, prefer WhatsApp.':lang==='ru'?'Для быстрого ответа — WhatsApp.':'Für schnelle Antwort WhatsApp bevorzugen.'}
            </p>
            <span className="gl" aria-hidden="true"/>
          </div>
          <div className="cgrid">
            <address style={{fontStyle:'normal'}}>
              {[
                {ic:'📞',lbl:lang==='tr'?'Telefon':'Phone',val:<a href="tel:+905318986418">+90 531 898 64 18</a>},
                {ic:'💬',lbl:'WhatsApp',val:<a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer">+90 531 898 64 18</a>},
                {ic:'🕐',lbl:lang==='tr'?'Çalışma Saatleri':lang==='en'?'Working Hours':lang==='ru'?'Часы работы':'Öffnungszeiten',val:<span>{c.hours}</span>},
                {ic:'📍',lbl:lang==='tr'?'Hizmet Bölgesi':lang==='en'?'Service Area':lang==='ru'?'Зона обслуживания':'Servicebereich',val:<span>{lang==='tr'?'Tüm Antalya İlçeleri':lang==='en'?'All Antalya Districts':lang==='ru'?'Все районы Антальи':'Alle Antalya-Bezirke'}</span>},
                {ic:'🌍',lbl:lang==='tr'?'Diller':'Languages',val:<span>🇹🇷 TR · 🇬🇧 EN · 🇷🇺 RU · 🇩🇪 DE</span>},
              ].map(({ic,lbl,val},i)=>(
                <div key={i} className="crow">
                  <span style={{fontSize:'1.1rem',paddingTop:'.1rem'}} aria-hidden="true">{ic}</span>
                  <div>
                    <div className="clbl">{lbl}</div>
                    <div className="cval">{val}</div>
                  </div>
                </div>
              ))}
              <div style={{display:'flex',flexDirection:'column',gap:'.7rem',marginTop:'1.8rem'}}>
                <a href={WA(c.waMsg)} target="_blank" rel="noopener noreferrer" className="bg" style={{justifyContent:'center'}}>💬 WhatsApp</a>
                <a href={WA(c.mobileMsg)} target="_blank" rel="noopener noreferrer" className="bo" style={{justifyContent:'center'}}>{c.mobileCta}</a>
                <a href="https://maps.google.com/?q=Antalya+Konyaaltı+Turkey" target="_blank" rel="noopener noreferrer" className="bo" style={{justifyContent:'center'}}>{c.mapBtn}</a>
              </div>
            </address>
            <div className="mapbox" aria-label="Konum: Konyaaltı, Antalya">
              <div style={{fontSize:'2.8rem'}} aria-hidden="true">📍</div>
              <div style={{fontFamily:'var(--serif)',fontSize:'1.2rem',color:'var(--cr2)'}}>Konyaaltı, Antalya</div>
              <p style={{fontSize:'.8rem',color:'var(--mt)',textAlign:'center',maxWidth:'200px',lineHeight:'1.6'}}>
                {lang==='tr'?'Tüm Antalya ilçelerine kurye ile hizmet veriyoruz.':lang==='en'?'We serve all Antalya districts via courier.':lang==='ru'?'Курьер по всем районам Антальи.':'Kurierservice in alle Antalya-Bezirke.'}
              </p>
              <a
                href="https://maps.google.com/?q=Antalya+Turkey"
                target="_blank"
                rel="noopener noreferrer"
                className="bo"
                style={{fontSize:'.76rem'}}
              >
                {c.mapBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="ctr" style={{textAlign:'center'}}>
          <div style={{fontFamily:'var(--serif)',fontSize:'1.2rem',color:'var(--g)',marginBottom:'.4rem'}}>
            Terzi Can · Tailor Can · Портной Кан · Schneider Can
          </div>
          <p style={{fontSize:'.73rem',color:'var(--mt)'}}>
            © 2026 SwapHubs — Antalya Terzi Hizmetleri · +90 531 898 64 18 · swaphubs.com/terzi
          </p>
          {/* Keyword pills — visible, low opacity. Google görebilir ama spam değil */}
          <div className="fkws" aria-label="Anahtar kelimeler">
            {[
              'Antalya Terzi','Paça Kısaltma','Fermuar Değişimi','Elbise Tadilat',
              'Kuru Temizleme','Üniforma Üretimi','Nakış Antalya','Otel Üniforma',
              'Aşçı Üniforma','Eve Gelen Terzi','Terzi Fiyatları 2026',
              'Tailor Antalya','Alterations Antalya','Dry Cleaning Antalya',
              'Uniform Antalya','Embroidery Antalya','Mobile Tailor',
              'Портной Анталья','Химчистка Анталья','Пошив на заказ',
              'Гостиничная форма','Выездной портной',
              'Schneider Antalya','Änderungen Antalya','Reinigung Antalya',
              'Uniformproduktion',
            ].map(k=>(
              <span key={k} className="kpill">{k}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
