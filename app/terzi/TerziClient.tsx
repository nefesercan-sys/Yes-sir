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
        // TR — Tamir & Tadilat
        "Paça Kısaltma","Pantolon Kısaltma","Paça Dikimi","Tadilat","Tamir","Daraltma",
        "Fermuar Değişimi","Fermuar Tamiri","Kot Fermuarı","Mont Fermuarı","Etek Kısaltma",
        "Abiye Tamiri","Abiye Tadilatı","Kol Kısaltma","Beden Küçültme","Beden Seti Çıkarma",
        // TR — Dikim
        "Özel Dikim","Erkek Terzi","Bayan Terzi","Çocuk Kıyafeti Dikimi","Bebek Elbisesi Dikimi",
        "Büyük Beden Dikimi","Gelinlik","Damatlık","Abiye Dikimi","Anne Grubu Dikimi",
        "Sweatshirt Dikimi","Eşofman Dikimi","Gömlek Dikimi","Ceket Dikimi","Pantolon Dikimi","Etek Dikimi",
        "Nevresim Dikimi","Perde Dikimi","Ev Tekstili Dikimi",
        // TR — Nakış & Baskı
        "Nakış","Logo Nakışı","İsim Nakışı","Üniforma Nakışı","Dijital Baskı","Transfer Baskı","Serigrafi",
        // TR — Üniforma
        "Üniforma Dikimi","Üniforma Üretimi","Üniforma Tasarımı",
        "Otel Üniforma","Resepsiyon Üniforma","Kat Görevlisi Üniforma","Meydancı Üniforma",
        "Aşçı Üniforma","Şef Kıyafeti","Garson Üniforma","Barista Üniforma","Mutfak Üniforma",
        "Doktor Üniforma","Hemşire Üniforma","Sağlık Personel Kıyafeti","İşçi Üniforma",
        "Okul Üniforma","Okul Forması","Spor Takım Üniforma","Futbol Forması","Personel Üniforma",
        // TR — Üretim & Hizmet
        "Kalıp Çıkarma","Model Dikimi","Seri İmalat","Fason İmalat","Numune Dikimi",
        "Kesim Dikim Ütü Paket","Terzi Servisi","Araçlı Terzi","Adrese Teslim Terzi",
        "Kuru Temizleme","Çamaşır Yıkama","Ütü Hizmeti",
        // EN
        "Alterations","Custom Tailoring","Dry Cleaning","Pattern Making","Mass Production",
        "Mobile Tailor Service","Hotel Pickup Delivery Tailor",
        "Uniform Production","Hotel Uniform","Chef Uniform","Waiter Uniform","School Uniform",
        "Embroidery","Logo Embroidery","Sweatshirt Sewing","Tracksuit Production",
        "Zip Repair","Trouser Hemming","Dress Alteration","Evening Gown Repair",
        // RU
        "Пошив одежды","Ремонт одежды","Химчистка","Пошив по лекалам","Выездной портной",
        "Форма для персонала","Гостиничная форма","Вышивка","Пошив толстовок",
        // DE
        "Maßanfertigung","Änderungsschneiderei","Uniformproduktion","Stickerei",
        "Sweatshirt nähen","Reißverschluss Reparatur","Mobiler Schneider"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Antalya'da paça kısaltma fiyatı ne kadar?", "acceptedAnswer": { "@type": "Answer", "text": "Antalya'da paça kısaltma fiyatımız ₺150'den başlar. Pantolon cinsi ve kumaş türüne göre değişir. Ücretsiz fiyat teklifi için WhatsApp +90 531 898 64 18." } },
        { "@type": "Question", "name": "Antalya'da paça kısaltma kaç lira 2025?", "acceptedAnswer": { "@type": "Answer", "text": "Antalya'da paça kısaltma fiyatı 2025 yılında ₺150'den başlar. Kumaş türü ve işçiliğe göre değişir. Ücretsiz fiyat teklifi için WhatsApp +90 531 898 64 18." } },
        { "@type": "Question", "name": "Antalya'da fermuar değişimi kaç lira? Mont, kot, pantolon fermuarı fiyatı?", "acceptedAnswer": { "@type": "Answer", "text": "Pantolon ve kot fermuarı değişimi ₺120'den, mont fermuarı ₺300'den başlar. Aynı gün servis mümkündür. WhatsApp +90 531 898 64 18." } },
        { "@type": "Question", "name": "Antalya'da yakınımda terzi var mı? Eve veya otele gelen terzi?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, Terzi Can araçlı terzi servisiyle Antalya'nın tüm ilçelerine geliyor. Eve gelen terzi, otele gelen terzi hizmeti sunuyoruz. WhatsApp +90 531 898 64 18." } },
        { "@type": "Question", "name": "Mezuniyet abiyesi tamiri ve kısaltması Antalya?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, mezuniyet sezonu (Mayıs–Haziran) için abiye tamiri, abiye kısaltma ve abiye tadilatı yapıyoruz. Ekspres 24 saat teslim. WhatsApp +90 531 898 64 18." } },
        { "@type": "Question", "name": "Düğün sezonu gelinlik tadilatı Antalya?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, Nisan–Ekim düğün sezonunda gelinlik tadilatı, gelinlik kısaltma ve damatlık tadilatı yapıyoruz. Ekspres randevu için WhatsApp +90 531 898 64 18." } },
        { "@type": "Question", "name": "Antalya'da terzi fiyatları 2025 — tadilat ne kadar?", "acceptedAnswer": { "@type": "Answer", "text": "Terzi Can 2025 fiyatları: paça kısaltma ₺150+, fermuar ₺120+, ceket daraltma ₺300+, elbise tadilatı ₺200+, kuru temizleme ₺400+. WhatsApp'tan ücretsiz teklif alın." } },
        { "@type": "Question", "name": "Antalya'da fermuar değişimi yapılır mı? Kot, mont ve pantolon fermuarı değiştiriliyor mu?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, her türlü kıyafette fermuar değişimi yapıyoruz: pantolon fermuarı, kot fermuarı, mont fermuarı, ceket fermuarı, sweatshirt fermuarı, elbise fermuarı. Aynı gün servis mümkündür." } },
        { "@type": "Question", "name": "Antalya'da sweatshirt ve eşofman dikimi yapılıyor mu?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, sweatshirt ve eşofman takımı dikimi, tadilat ve seri üretim yapıyoruz. Nakış ve baskı ile kişiselleştirme de mümkündür." } },
        { "@type": "Question", "name": "Antalya'da otel ve restoran üniforma üretimi yapılıyor mu?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, otel personel üniforma, resepsiyon üniforma, aşçı üniforma, garson üniforma, meydancı üniforma, spa üniforma üretimi yapıyoruz. Tasarım, kalıp, seri imalat ve nakış hepsi tek elden." } },
        { "@type": "Question", "name": "Antalya'da doktor, hemşire, işçi ve okul üniforması üretimi var mı?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, her sektöre özel üniforma üretimi yapıyoruz: doktor, hemşire, eczacı, işçi, fabrika, okul, spor takımı, güvenlik ve banka personel üniforması." } },
        { "@type": "Question", "name": "Antalya'da nakış ve baskı hizmeti var mı?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, kıyafete logo nakışı, isim nakışı, üniforma nakışı, dijital baskı, transfer baskı ve serigrafi hizmeti sunuyoruz." } },
        { "@type": "Question", "name": "Terzi servisi var mı? Eve gelip ölçü alıyor musunuz?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, araçlı terzi servisimizle tüm Antalya'ya geliyoruz. Adresinize gidip ölçü alıyor, dikip tekrar teslim ediyoruz. Otel, ev, işyeri fark etmez." } },
        { "@type": "Question", "name": "Where can I find a tailor or uniform producer in Antalya?", "acceptedAnswer": { "@type": "Answer", "text": "Terzi Can offers professional tailoring and uniform production in Antalya — hotel uniforms, chef uniforms, school uniforms, sports uniforms, embroidery, sweatshirt sewing. WhatsApp +90 531 898 64 18." } },
        { "@type": "Question", "name": "Где найти портного и производителя формы в Анталье?", "acceptedAnswer": { "@type": "Answer", "text": "Terzi Can — пошив одежды, производство формы, вышивка, пошив толстовок в Анталье. Гостиничная форма, форма для ресторанов, медицинская форма. WhatsApp: +90 531 898 64 18." } },
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
    seoP1: 'Antalya\'nın en deneyimli terzisi Terzi Can. Paça kısaltma · pantolon kısaltma · elbise daraltma · beden küçültme · fermuar değişimi · etek kısaltma · abiye tamiri · kıyafet tamiri · kuru temizleme · ütü hizmeti · kalıp çıkarma · model dikimi · seri imalat · fason imalat · nakış · logo baskı. Otel üniforma · aşçı üniforma · garson üniforma · resepsiyon üniforma · doktor üniforma · okul üniforma · spor üniforma üretimi. Sweatshirt ve eşofman dikimi. Muratpaşa, Konyaaltı, Kepez, Lara, Belek, Kemer ve tüm Antalya ilçelerine hizmet. 24-48 saat ekspres servis, otele alım-teslimat.',
    seoP2: 'Antalya erkek terzi, bayan terzi, çocuk kıyafeti dikimi, bebek elbisesi dikimi, anne grubu toplu dikimi, büyük beden dikimi, beden seti çıkarma, sweatshirt dikimi, eşofman dikimi, nakış, logo nakışı, üniforma nakışı. Nevresim dikimi, perde dikimi, gömlek dikimi, ceket dikimi, pantolon dikimi. Paça kısaltma fiyatı, paça kısaltma kaç lira, fermuar değişimi kaç lira, terzi fiyatları 2025, tadilat fiyatı, daraltma fiyatı, dikim fiyatları Antalya.',
    seoP3: 'Yakınımda terzi Antalya — eve gelen terzi, otele gelen terzi, araçlı terzi servisi, adrese teslim terzi. Mezuniyet abiye tamiri, mezuniyet abiye kısaltma, düğün sezonu gelinlik tadilatı, kış sezonu mont fermuarı, yaz sezonu elbise daraltma. Otel üniforma, aşçı üniforma, garson üniforma, resepsiyon üniforma, doktor üniforma, okul üniforma üretimi Antalya. Lara terzi, Konyaaltı terzi, Belek terzi, Kemer terzi, Alanya terzi, Manavgat terzi.',
    seoP4: 'Terzi fiyatları: paça kısaltma ₺150 · fermuar ₺120 · ceket daraltma ₺300 · elbise tadilatı ₺200 · kuru temizleme ₺400. Портной Кан в Анталье — подгонка брюк, ремонт одежды, химчистка, выездной портной, доставка в отель. Говорим по-русски.',
    faq: [
      { q: 'Paça kısaltma kaç lira? 2025 fiyatı ne kadar?', a: 'Paça kısaltma ₺150\'den başlar. Kot paça ₺150, kumaş pantolon ₺175 civarı. Pantolon fermuarı ₺120, mont fermuarı ₺300, ceket daraltma ₺300\'den. Kesin fiyat için WhatsApp\'tan yazın — ücretsiz teklif verelim.' },
      { q: 'Fermuar değişimi kaç lira? Kot, mont, ceket, sweatshirt fermuarı?', a: 'Pantolon ve kot fermuarı ₺120\'den, ceket fermuarı ₺200\'den, mont fermuarı ₺300\'den başlar. Sweatshirt ve çanta fermuarı da yapılır. Aynı gün teslim mümkündür.' },
      { q: 'Yakınımda terzi var mı? Eve veya otele gelen terzi Antalya?', a: 'Evet! Araçlı terzi servisimizle Antalya\'nın tüm ilçelerine geliyoruz. Ev, otel, işyeri fark etmez — WhatsApp\'tan konum paylaşın, terzi adresinize gelsin, ölçü alsın, diksin ve teslim etsin.' },
      { q: 'Mezuniyet abiye tamiri ve kısaltması yapıyor musunuz?', a: 'Evet, mezuniyet sezonunda (Mayıs–Haziran) abiye tamiri, kısaltma ve tadilatı ekspres 24 saat yapıyoruz. Mezuniyet gecesi öncesi son dakika işlemleri kabul edilir.' },
      { q: 'Düğün sezonu gelinlik tadilatı yapıyor musunuz?', a: 'Evet, Nisan–Ekim düğün sezonunda gelinlik tadilatı, kısaltma ve damatlık tadilatı yapıyoruz. Özel günde kusursuz fit garantisi.' },
      { q: 'Kış sezonunda mont fermuarı değişimi yapıyor musunuz?', a: 'Evet, mont fermuarı, deri mont fermuarı ve kaban fermuarı değişimi yapıyoruz. Kış sezonunda yoğun talep olduğu için önceden WhatsApp\'tan randevu almanızı öneririz.' },
      { q: 'Etek kısaltma, abiye tamiri ve abiye tadilatı yapıyor musunuz?', a: 'Evet, etek kısaltma, abiye tamiri, abiye tadilatı ve gece elbisesi onarımı yapıyoruz. Özel gün kıyafetlerinizde mükemmel fit garantisi.' },
      { q: 'Otel ve restoran üniforması üretimi yapıyor musunuz?', a: 'Evet, otel personel üniforması, resepsiyon, aşçı, garson, meydancı, spa, animatör üniforması üretiyoruz. Tasarım, kalıp, seri imalat ve nakış tek elden.' },
      { q: 'Doktor, hemşire, işçi, okul ve spor üniforması yapıyor musunuz?', a: 'Evet, her sektöre özel üniforma: doktor · hemşire · eczacı · işçi · fabrika · okul forması · futbol forması · spor kulübü · güvenlik · banka personeli.' },
      { q: 'Büyük beden, nevresim, perde, bebek kıyafeti dikimi var mı?', a: 'Evet; büyük beden dikim, nevresim takımı, perde, bebek elbisesi ve çocuk kıyafeti dikiyoruz. Anne grupları için toplu sipariş indirimi uygulanır.' },
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
    seoP1: 'Terzi Can — Antalya\'s most experienced tailor. Trouser hemming · dress alterations · zip repair · skirt shortening · evening gown repair · sweatshirt sewing · tracksuit production · embroidery · logo printing · dry cleaning · pattern making · mass production. Hotel, restaurant, medical and school uniform production. All Antalya districts. Express 24-48h, hotel pickup & delivery.',
    seoP2: 'Tailor Antalya: men\'s tailor · women\'s tailor · children\'s clothing · plus-size alterations · sweatshirt sewing · tracksuit production · embroidery Antalya · logo embroidery · uniform production Antalya · hotel uniform · chef uniform · reception uniform · waiter uniform · doctor uniform · nurse uniform · school uniform · sports uniform. Zip replacement · dress repair · pattern making · mass production.',
    seoP3: 'Mobile tailor Antalya — we come to your home or hotel, take measurements, and deliver finished garments. English speaking tailor. Hotel pickup and delivery. Express 24h service. Lara tailor, Konyaaltı tailor, Belek tailor, Kemer tailor, Alanya tailor, Manavgat tailor, Side tailor.',
    seoP4: '',
    faq: [
      { q: 'How much does trouser hemming cost in Antalya 2025?', a: 'Trouser hemming from ₺150. Jeans zip replacement from ₺120, coat zip from ₺300, jacket taking-in from ₺300. WhatsApp for a free instant quote.' },
      { q: 'How much does zip replacement cost? Jeans, coat, sweatshirt?', a: 'Trouser/jeans zip from ₺120, jacket zip from ₺200, coat zip from ₺300. Sweatshirt and bag zips also done. Same-day service available.' },
      { q: 'Is there a tailor near me in Antalya? Do you come to my hotel?', a: 'Yes! Our mobile tailor covers every district in Antalya. Share your location on WhatsApp — we come to your hotel, home or office, measure, tailor and deliver back.' },
      { q: 'Can you alter a graduation or prom dress urgently?', a: 'Yes — graduation dress alterations and shortening done express in 24h during graduation season (May–June). Last-minute before the ceremony accepted.' },
      { q: 'Wedding season dress alterations in Antalya?', a: 'Yes, wedding dress alterations, shortening and bridesmaid dress adjustments available April–October. Perfect fit guaranteed before your big day.' },
      { q: 'Do you do zip replacement? Jeans, coat, sweatshirt?', a: 'Yes — trouser, jeans, coat, jacket, sweatshirt, dress, bag zips. Same-day service available.' },
      { q: 'Do you repair evening gowns and skirts?', a: 'Yes, evening gown repairs, skirt shortening, wedding dress alterations. Perfect fit for any special occasion.' },
      { q: 'Do you produce hotel, restaurant and staff uniforms?', a: 'Yes — hotel, reception, housekeeping, chef, waiter, valet, spa uniforms. Design, pattern, mass production and embroidery in one place.' },
      { q: 'Do you produce medical, school and sports uniforms?', a: 'Yes — doctors, nurses, factory workers, school uniforms, sports team kits, security, bank staff. Every sector covered.' },
      { q: 'Embroidery, plus-size, children\'s clothing, curtains?', a: 'Yes — logo embroidery, plus-size sewing, baby/children\'s clothing, curtains, bed linen. Group discounts available.' },
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
    seoP1: 'Портной Кан — опытный портной в Анталье. Подгонка брюк · ремонт одежды · замена молнии · укорачивание юбки · ремонт вечернего платья · пошив толстовок · производство спортивных костюмов · вышивка · производство формы. Гостиничная форма · форма для ресторанов · медицинская форма · школьная форма · спортивная форма. Экспресс 24-48 часов, доставка в отель.',
    seoP2: 'Пошив формы Анталья: гостиничная форма · форма для ресепшн · форма повара · форма официанта · медицинская форма · форма для сотрудников · школьная форма · спортивная форма. Вышивка логотипа · нанесение принта · пошив толстовок · серийное производство. Замена молнии · ремонт одежды Анталья · выездной портной.',
    seoP3: 'Выездной портной Анталья — приедем домой или в отель, снимем мерки и доставим готовое изделие. Говорим по-русски. Лара, Коньяалты, Белек, Кемер, Аланья, Манавгат, Сиде.',
    seoP4: '',
    faq: [
      { q: 'Сколько стоит подгонка брюк и замена молнии в 2025?', a: 'Подгонка брюк от ₺150. Замена молнии джинсов от ₺120, пальто от ₺300, пиджака от ₺200. Напишите в WhatsApp — бесплатная оценка сразу.' },
      { q: 'Сколько стоит замена молнии? Джинсы, пальто, толстовка?', a: 'Брюки/джинсы от ₺120, пиджак от ₺200, пальто от ₺300. Также толстовки и сумки. Срочный ремонт в тот же день.' },
      { q: 'Есть ли портной рядом со мной? Выезд на дом или в отель?', a: 'Да! Выездной портной работает по всей Анталье. Пришлите локацию в WhatsApp — приедем к вам домой, в отель или офис, снимем мерки, сошьём и доставим.' },
      { q: 'Срочная подгонка выпускного платья в Анталье?', a: 'Да — подгонка и укорачивание выпускных платьев экспресс 24 часа в сезон выпускных (май–июнь). Принимаем заказы в последний момент.' },
      { q: 'Подгонка свадебного платья в свадебный сезон?', a: 'Да, подгонка свадебных платьев, укорачивание и ремонт в период апрель–октябрь. Идеальная посадка гарантирована.' },
      { q: 'Вы меняете молнии? Джинсы, куртка, толстовка?', a: 'Да — брюки, джинсы, куртки, пальто, платья, толстовки, сумки. Срочный ремонт в тот же день.' },
      { q: 'Производство формы для отелей и ресторанов?', a: 'Да — форма для гостиниц, ресепшн, горничных, поваров, официантов, охраны, спа. Дизайн, лекала, серийное производство, вышивка — всё в одном.' },
      { q: 'Медицинская, школьная и спортивная форма?', a: 'Да — врачи, медсёстры, рабочие, школьная форма, спортивные команды. Для любой отрасли.' },
      { q: 'Большие размеры, детская одежда, шторы, постельное бельё?', a: 'Да — большие размеры, детская и детская одежда, шторы, постельное бельё. Скидки для групповых заказов.' },
    ],
  },
  de: {
    badge: '✂ Antalya · Schneider Can',
    h1: 'Antalyas',
    h1em: 'Meisterschneider',
    sub: 'Herren · Damen · Kinder · Änderungen · Uniformen · Stickerei · Produktion',
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
    seoP1: 'Schneider Can — erfahrener Schneider in Antalya. Hosenänderungen · Kleideränderungen · Reißverschluss-Reparatur · Rockkürzung · Abendkleid-Reparatur · Sweatshirt-Nähen · Trainingsanzug · Stickerei · Uniformproduktion. Hoteluniform · Kochuniform · Arztuniform · Schuluniform · Sportuniform. Express 24-48h, Abholung und Lieferung ins Hotel.',
    seoP2: 'Uniformproduktion Antalya: Hoteluniform · Rezeption · Kochuniform · Kellneruniform · Arztuniform · Schuluniform · Sportuniform · Stickerei Antalya · Logo-Stickerei · Sweatshirt nähen · Trainingsanzug nähen · Reißverschluss wechseln · Kleid reparieren · Schneiderpreise Antalya.',
    seoP3: 'Mobiler Schneider Antalya — wir kommen zu Ihnen nach Hause oder ins Hotel, nehmen Maße und liefern fertig zurück. Deutschsprachiger Schneider. Konyaaltı, Lara, Belek, Kemer, Alanya, Manavgat.',
    seoP4: '',
    faq: [
      { q: 'Was kostet Hosenänderung und Reißverschluss 2025 in Antalya?', a: 'Hosenänderung ab ₺150. Jeans-Reißverschluss ab ₺120, Mantel-Reißverschluss ab ₺300, Jacke einengen ab ₺300. WhatsApp für ein kostenloses Sofortangebot.' },
      { q: 'Was kostet ein Reißverschluss-Ersatz? Jeans, Mantel, Sweatshirt?', a: 'Hosen/Jeans ab ₺120, Jacke ab ₺200, Mantel ab ₺300. Sweatshirts und Taschen ebenfalls. Expressdienst am gleichen Tag möglich.' },
      { q: 'Gibt es einen Schneider in meiner Nähe? Kommen Sie ins Hotel?', a: 'Ja! Unser mobiler Schneider fährt in alle Antalya-Bezirke. Standort per WhatsApp senden — wir kommen zu Ihnen, messen, schneidern und liefern zurück.' },
      { q: 'Abendkleid kürzen für Abschlussfeier in Antalya?', a: 'Ja — Abschlusskleid kürzen und ändern express in 24h zur Abschlusszeit (Mai–Juni). Last-minute vor der Feier wird akzeptiert.' },
      { q: 'Brautkleid-Änderungen in der Hochzeitssaison?', a: 'Ja, Brautkleid-Änderungen, Kürzen und Anpassungen April–Oktober. Perfekte Passform garantiert.' },
      { q: 'Tauschen Sie Reißverschlüsse aus? Jeans, Mantel, Sweatshirt?', a: 'Ja — Hosen, Jeans, Jacken, Mäntel, Kleider, Sweatshirts, Taschen. Expressdienst möglich.' },
      { q: 'Produzieren Sie Hotel- und Restaurantuniformen?', a: 'Ja — Hotel, Rezeption, Hausdamen, Köche, Kellner, Sicherheit, Spa. Design, Schnittmuster, Serienproduktion und Stickerei aus einer Hand.' },
      { q: 'Medizinische, Schul- und Sportuniformen?', a: 'Ja — Ärzte, Krankenschwestern, Arbeiter, Schuluniformen, Sportteam-Trikots. Jede Branche.' },
      { q: 'Übergrößen, Kinderkleidung, Vorhänge, Stickerei?', a: 'Ja — Übergrößen, Kinderkleidung, Babykleider, Vorhänge, Bettwäsche, Logo-Stickerei. Gruppenrabatte verfügbar.' },
    ],
  },
};

// ═══════════════════════════════════════
// HİZMETLER — TAM GENİŞLETİLMİŞ
// ═══════════════════════════════════════
const SERVICES = [
  // ── TAMİR & TADİLAT ──────────────────────────────────────────────────
  {
    icon: '✂️', color: '#fdecea',
    names: ['Tamir & Tadilat — Her Kıyafet', 'Repairs & Alterations', 'Ремонт и переделка', 'Reparaturen & Änderungen'],
    descs: [
      'Paça kısaltma · pantolon daraltma · ceket daraltma · gömlek daraltma · elbise daraltma · etek kısaltma · kol kısaltma · bel alma · yırtık onarımı · dikiş tamiri · astar değişimi · cep tamiri · yaka değişimi · düğme dikimi.',
      'Trouser hemming · taking in jacket/shirt/dress · skirt shortening · sleeve shortening · zip replacement · tear repair · lining replacement · button sewing · seam repair.',
      'Подгонка брюк · заужение пиджака/рубашки/платья · укорачивание · замена молнии · ремонт разрывов · замена подкладки · пришивание пуговиц.',
      'Hose kürzen · Jacke/Hemd/Kleid einengen · Rock kürzen · Ärmel kürzen · Reißverschluss · Riss reparieren · Futter ersetzen · Knöpfe annähen.',
    ],
    price: '₺150+',
  },
  {
    icon: '🔒', color: '#fff3e0',
    names: ['Fermuar Değişimi & Onarımı', 'Zip Replacement & Repair', 'Замена и ремонт молнии', 'Reißverschluss Reparatur'],
    descs: [
      'Her türlü kıyafette fermuar değişimi ve onarımı: pantolon fermuarı · kot fermuarı · ceket fermuarı · mont fermuarı · elbise fermuarı · çanta fermuarı · sweatshirt fermuarı. Aynı gün servis mümkündür.',
      'Zip replacement and repair for all garments: trousers · jeans · jacket · coat · dress · bag · sweatshirt. Same-day service available.',
      'Замена молнии во всех видах одежды: брюки, джинсы, куртки, пальто, платья, сумки, толстовки. Срочный ремонт.',
      'Reißverschluss-Ersatz für alle Kleidungsstücke: Hosen, Jeans, Jacken, Mäntel, Kleider, Taschen, Sweatshirts. Expressdienst.',
    ],
    price: '₺120+',
  },
  {
    icon: '📐', color: '#e8f5e9',
    names: ['Daraltma · Kısaltma · Küçültme', 'Taking In · Shortening · Size Down', 'Заужение · Укорачивание', 'Einengen · Kürzen · Verkleinern'],
    descs: [
      'Pantolon daraltma · ceket daraltma · gömlek daraltma · elbise daraltma · etek daraltma · bel daraltma · koltuk altı alma · beden küçültme · beden seti çıkarma. Erkek · Bayan · Çocuk.',
      'Trouser/jacket/shirt/dress taking in · waist reduction · side seam alteration · size reduction · pattern adjustment. Men · Women · Children.',
      'Заужение брюк/пиджака/рубашки/платья · уменьшение талии · уменьшение размера. Мужская · женская · детская одежда.',
      'Hosen/Jacke/Hemd/Kleid einengen · Taille verkleinern · Größe anpassen. Herren · Damen · Kinder.',
    ],
    price: '₺150+',
  },

  // ── ERKEK TERZİ ───────────────────────────────────────────────────────
  {
    icon: '👔', color: '#e3f2fd',
    names: ['Erkek Kıyafet Dikimi & Tamir', 'Men\'s Tailoring & Repair', 'Мужская одежда — пошив и ремонт', 'Herrenbekleidung — Nähen & Reparatur'],
    descs: [
      'Erkek takım elbise · blazer · ceket · gömlek · pantolon · yelek · smoking dikimi ve tadilatı. Ceket daraltma · gömlek daraltma · pantolon paça kısaltma · pantolon daraltma. Ofis kıyafeti · düğün takımı · özel gün.',
      'Men\'s suits · blazers · jackets · shirts · trousers · vests · tuxedos — custom or altered. Jacket taking in · shirt alteration · trouser hemming. Office · wedding · occasion wear.',
      'Мужские костюмы · пиджаки · рубашки · брюки · смокинги — пошив и подгонка. Заужение пиджака, рубашки, брюк.',
      'Herrenanzüge · Blazer · Hemden · Hosen · Smoking — Maßanfertigung oder Änderungen. Einengen, kürzen, anpassen.',
    ],
    price: '₺300+',
  },

  // ── BAYAN TERZİ ───────────────────────────────────────────────────────
  {
    icon: '👗', color: '#fce4ec',
    names: ['Bayan Kıyafet Dikimi & Tamir', 'Women\'s Tailoring & Repair', 'Женская одежда — пошив и ремонт', 'Damenbekleidung — Nähen & Reparatur'],
    descs: [
      'Bayan elbise · bluz · etek · pantolon · ceket · tulum · abiye · gelinlik dikimi ve tadilatı. Elbise daraltma · etek kısaltma · abiye tamiri · abiye tadilatı. Günlük · iş · gece · düğün kıyafetleri.',
      'Women\'s dresses · blouses · skirts · trousers · jackets · evening gowns · wedding dresses — custom or altered. Dress taking in · skirt shortening · evening gown repair.',
      'Женские платья · блузки · юбки · брюки · вечерние наряды — пошив и подгонка. Ушить платье, укоротить юбку.',
      'Damenkleider · Blusen · Röcke · Hosen · Abendkleider — Maßanfertigung oder Änderungen.',
    ],
    price: '₺250+',
  },

  // ── ÇOCUK / BEBEK ─────────────────────────────────────────────────────
  {
    icon: '👶', color: '#fff8e1',
    names: ['Çocuk & Bebek Kıyafeti', 'Children & Baby Clothing', 'Детская одежда', 'Kinder & Babykleidung'],
    descs: [
      'Bebek elbisesi · çocuk kıyafeti · çocuk kostümü · okul kıyafeti · çocuk sweatshirt ve eşofman dikimi. Anne grubu toplu sipariş indirimi. Erkek çocuk · kız çocuk · bebek. Tamir, tadilat ve özel dikim.',
      'Baby dresses · children\'s clothing · school uniforms · costumes · children\'s sweatshirts. Group discounts for parent communities. Boys · girls · babies. Repairs and custom sewing.',
      'Одежда для малышей · детская одежда · школьная форма · костюмы. Скидки для мам-групп.',
      'Babykleider · Kinderkleidung · Schulkleidung · Kostüme. Gruppenrabatt für Elterngruppen.',
    ],
    price: '₺200+',
  },

  // ── SWEATSHIRT / EŞOFMAN ─────────────────────────────────────────────
  {
    icon: '🧥', color: '#f3e5f5',
    names: ['Sweatshirt & Eşofman Dikimi', 'Sweatshirt & Tracksuit Sewing', 'Толстовки и спортивные костюмы', 'Sweatshirt & Trainingsanzug'],
    descs: [
      'Sweatshirt dikimi · eşofman dikimi · sweatshirt fermuarı · eşofman tadilatı · kapüşonlu sweatshirt · polo yaka · baskılı sweatshirt · nakışlı sweatshirt · seri üretim. Her türlü spor ve casual kıyafet.',
      'Sweatshirt sewing · tracksuit sewing · hoodie · polo neck · printed/embroidered sweatshirts · mass production. All types of sportswear and casualwear.',
      'Пошив толстовок · спортивных костюмов · худи · с принтом · с вышивкой · серийное производство.',
      'Sweatshirt-Nähen · Trainingsanzug · Hoodie · Polo · bedruckt/gestickt · Serienproduktion.',
    ],
    price: '₺400+',
  },

  // ── NAKİŞ & BASKI ─────────────────────────────────────────────────────
  {
    icon: '🪡', color: '#e8eaf6',
    names: ['Nakış & Baskı Hizmeti', 'Embroidery & Printing', 'Вышивка и печать', 'Stickerei & Druck'],
    descs: [
      'Kıyafete nakış işleme · logo nakışı · isim nakışı · eşofman nakışı · üniforma nakışı · sweatshirt nakışı. Dijital baskı · transfer baskı · serigrafi. Seri imalat için uygun fiyatlı.',
      'Garment embroidery · logo embroidery · name embroidery · uniform embroidery. Digital print · transfer print · screen print. Affordable for mass production.',
      'Вышивка на одежде · логотип · имя · форменная вышивка. Цифровая печать · трафаретная печать.',
      'Stickerei auf Kleidung · Logo-Stickerei · Namens-Stickerei · Uniformstickerei. Digitaldruck · Siebdruck.',
    ],
    price: '₺100+',
  },

  // ── GELİNLİK & ABİYE ──────────────────────────────────────────────────
  {
    icon: '💍', color: '#fce4ec',
    names: ['Gelinlik · Abiye · Özel Gün', 'Wedding · Evening · Special', 'Свадьба · Вечер · Особый день', 'Hochzeit · Abend · Besonderer Anlass'],
    descs: [
      'Gelinlik dikimi · gelinlik tadilatı · damatlık dikimi · abiye dikimi · abiye tamiri · abiye tadilatı · nişan elbisesi · kına kıyafeti · gece elbisesi. Kusursuz fit garantisi.',
      'Wedding dress sewing · wedding dress alterations · groom suit · evening gown sewing · evening gown repair · engagement dress. Perfect fit guaranteed.',
      'Пошив свадебного платья · подгонка · смокинг · вечернее платье · ремонт вечернего платья.',
      'Brautkleid nähen · Anpassung · Bräutigamanzug · Abendkleid · Abendkleid reparieren.',
    ],
    price: '₺2.500+',
  },

  // ── ÜNİFORMA — ANA KART ──────────────────────────────────────────────
  {
    icon: '🏨', color: '#e0f7fa',
    names: ['Otel & Turizm Üniforma Üretimi', 'Hotel & Tourism Uniform Production', 'Гостиничная форма — производство', 'Hotel & Tourismus Uniformproduktion'],
    descs: [
      'Otel personel üniforma · resepsiyon üniforma · kat görevlisi üniforma · aşçı üniforma · servis üniforma · meydancı üniforma · kapıcı üniforma · güvenlik üniforma · spa üniforma · animatör üniforma. Tasarım · kalıp · seri imalat · nakış · logo baskı.',
      'Hotel staff uniforms · reception · housekeeping · chef · service · valet · security · spa · animation. Design · pattern · mass production · embroidery · logo printing.',
      'Форма для гостиниц · ресепшн · горничные · повара · официанты · охрана · спа. Дизайн · лекала · серийное производство · вышивка.',
      'Hotelpersonal-Uniformen · Rezeption · Zimmermädchen · Köche · Service · Sicherheit · Spa. Design · Schnittmuster · Serienproduktion · Stickerei.',
    ],
    price: 'Teklif Al',
  },
  {
    icon: '👨‍⚕️', color: '#e8f5e9',
    names: ['Sağlık & Endüstri Üniforma', 'Health & Industry Uniforms', 'Медицинская и рабочая форма', 'Gesundheit & Industrie Uniformen'],
    descs: [
      'Doktor üniforma · hemşire üniforma · eczacı üniforma · laborant üniforma · iş güvenliği üniforma · fabrika işçi üniforma · inşaat kıyafeti · çağrı merkezi üniforma · banka personel üniforma. Her sektöre özel tasarım ve seri üretim.',
      'Doctor uniforms · nurse uniforms · pharmacist · lab worker · workplace safety clothing · factory worker · call center · bank staff. Custom design and mass production for any sector.',
      'Форма для врачей · медсестёр · фармацевтов · лаборантов · рабочих. Производство для любой отрасли.',
      'Arztuniform · Krankenschwester · Apotheker · Labor · Sicherheitskleidung · Fabrikarbeiter. Produktion für jede Branche.',
    ],
    price: 'Teklif Al',
  },
  {
    icon: '🍽️', color: '#fff8e1',
    names: ['Restoran & Mutfak Üniforma', 'Restaurant & Kitchen Uniforms', 'Форма для ресторанов и кухни', 'Restaurant & Küchen-Uniformen'],
    descs: [
      'Aşçı üniforma · şef kıyafeti · aşçı önlüğü · komi üniforma · garson üniforma · barista üniforma · pastane personel kıyafeti · mutfak şapkası · mutfak önlüğü. Logo nakışı ile birlikte üretim.',
      'Chef uniforms · cook aprons · waiter uniforms · barista uniforms · pastry staff clothing · kitchen hats. With logo embroidery.',
      'Форма шеф-повара · фартуки · официант · бариста · кондитерская. С вышивкой логотипа.',
      'Kochuniform · Schürzen · Kellneruniform · Barista · Konditorei. Mit Logo-Stickerei.',
    ],
    price: 'Teklif Al',
  },
  {
    icon: '🏫', color: '#f9fbe7',
    names: ['Okul & Spor Üniforma', 'School & Sports Uniforms', 'Школьная и спортивная форма', 'Schul- & Sportuniformen'],
    descs: [
      'Okul üniforma · okul forması · öğrenci kıyafeti · spor takım üniforma · futbol forması · voleybol forması · basketbol forması · spor kulübü kıyafeti. Toplu sipariş · özel renk · logo baskı · nakış.',
      'School uniforms · student clothing · sports team uniforms · football · volleyball · basketball · club kits. Bulk orders · custom colors · logo · embroidery.',
      'Школьная форма · спортивная форма · командная форма · футбол · баскетбол. Оптовые заказы.',
      'Schuluniform · Sportuniform · Teamkleidung · Fußball · Basketball. Großbestellungen.',
    ],
    price: 'Teklif Al',
  },

  // ── SERİ İMALAT & KALIP ───────────────────────────────────────────────
  {
    icon: '🏭', color: '#e8f5e9',
    names: ['Seri İmalat · Fason · Kalıp · Tasarım', 'Mass Production · Contract · Pattern · Design', 'Серийное · Фасон · Лекала · Дизайн', 'Serienproduktion · Fason · Schnittmuster · Design'],
    descs: [
      'Kalıp çıkarma · model tasarımı · kesim · dikim · ütü · paket. Numune dikimi · prototip · seri imalat · fason imalat. Markalar · butikler · e-ticaret firmaları için tam üretim paketi.',
      'Pattern making · model design · cutting · sewing · ironing · packaging. Sample · prototype · mass production · contract manufacturing. Full production package for brands, boutiques, e-commerce.',
      'Лекала · дизайн модели · раскрой · пошив · глажка · упаковка. Образцы · прототип · серийное производство для брендов.',
      'Schnittmuster · Modelldesign · Zuschnitt · Nähen · Bügeln · Verpackung. Muster · Prototyp · Serienproduktion für Marken.',
    ],
    price: 'Teklif Al',
  },

  // ── EV TEKSTİLİ & DİĞER ───────────────────────────────────────────────
  {
    icon: '🏠', color: '#e0f7fa',
    names: ['Nevresim · Perde · Ev Tekstili', 'Home Textiles', 'Шторы и домашний текстиль', 'Vorhänge & Heimtextilien'],
    descs: [
      'Nevresim takımı dikimi · perde dikimi · stor perde · tül · kırlent · yatak örtüsü · masa örtüsü. Ölçüye özel ev tekstili. Otel odaları için toplu üretim.',
      'Bed linen · curtains · roller blinds · tulle · cushion covers · tablecloths. Custom home textiles. Bulk production for hotel rooms.',
      'Постельное бельё · шторы · подушки · скатерти. По меркам. Оптовое производство для отелей.',
      'Bettwäsche · Vorhänge · Kissen · Tischdecken. Maßgefertigt. Großproduktion für Hotels.',
    ],
    price: '₺500+',
  },
  {
    icon: '🧺', color: '#e3f2fd',
    names: ['Kuru Temizleme & Çamaşır', 'Dry Cleaning & Laundry', 'Химчистка и стирка', 'Reinigung & Wäsche'],
    descs: [
      'Kuru temizleme · çamaşır yıkama · ütü hizmeti. Otelden alım ve teslimat. Turistlere ekspres servis.',
      'Dry cleaning · laundry · ironing. Hotel pickup and delivery. Express service for tourists.',
      'Химчистка · стирка · глажка. Из отеля забираем и доставляем.',
      'Reinigung · Wäsche · Bügeln. Hotelabholung und -lieferung.',
    ],
    price: '₺300+',
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

  // ── TÜRKÇE: GENEL TERZİ ──────────────────────────────────────────────
  'Antalya Terzi', 'Terzi Antalya', 'En İyi Terzi Antalya', 'Usta Terzi Antalya',
  'Terzi Fiyatları Antalya', 'Terzi Servisi Antalya', 'Araçlı Terzi Antalya',
  'Terzi Atölyesi Antalya', 'Dikim Atölyesi Antalya', 'Online Terzi Antalya',
  'Ölçüye Dikim Antalya', 'Özel Dikim Antalya', 'Hızlı Terzi Antalya',
  'Ekspres Terzi Antalya', '24 Saat Terzi Antalya', 'Ucuz Terzi Antalya',
  'Yakın Terzi Antalya', 'Antalya Terzi Nerede', 'Antalya Dikim',

  // ── TÜRKÇE: PAÇA / PANTOLON ──────────────────────────────────────────
  'Paça Kısaltma Antalya', 'Paça Dikimi Antalya', 'Paça Fiyatı Antalya',
  'Pantolon Kısaltma Antalya', 'Pantolon Tadilat Antalya', 'Pantolon Daraltma Antalya',
  'Pantolon Dikimi Antalya', 'Pantolon Bel Alma Antalya', 'Pantolon Genişletme Antalya',
  'Kot Pantolon Tadilat Antalya', 'Palazzo Pantolon Dikimi', 'Palazzo Kısaltma',
  'Paça Kısaltma Fiyatı', 'Paça Kısaltma Kaç Lira',

  // ── TÜRKÇE: TADİLAT / TAMİR ─────────────────────────────────────────
  'Kıyafet Tadilat Antalya', 'Elbise Tadilat Antalya', 'Kıyafet Tamir Antalya',
  'Elbise Tamir Antalya', 'Kıyafet Onarım Antalya', 'Fermuar Değişimi Antalya',
  'Fermuar Takma Antalya', 'Yırtık Onarımı Antalya', 'Dikiş Tamiri Antalya',
  'Düğme Dikimi Antalya', 'Yaka Değişimi Antalya', 'Astar Değişimi Antalya',
  'Cep Tamiri Antalya', 'Kol Kısaltma Antalya', 'Etek Kısaltma Antalya',

  // ── TÜRKÇE: DARALTMA / KÜÇÜLTME ─────────────────────────────────────
  'Elbise Daraltma Antalya', 'Kıyafet Daraltma Antalya', 'Beden Küçültme Antalya',
  'Beden Seti Çıkarma Antalya', 'Daraltma Fiyatı Antalya', 'Daraltma Antalya',
  'Kıyafet Beden Küçültme', 'Elbise Beden Düşürme Antalya',
  'Gömlek Daraltma Antalya', 'Ceket Daraltma Antalya', 'Elbise Bel Alma Antalya',

  // ── TÜRKÇE: ERKEK TERZİ ─────────────────────────────────────────────
  'Erkek Terzi Antalya', 'Antalya Erkek Terzi', 'Erkek Takım Elbise Antalya',
  'Takım Elbise Dikimi Antalya', 'Ceket Dikimi Antalya', 'Ceket Tadilat Antalya',
  'Gömlek Dikimi Antalya', 'Gömlek Tadilat Antalya', 'Blazer Dikimi Antalya',
  'Erkek Kıyafet Dikimi Antalya', 'Smoking Dikimi Antalya', 'Yelek Dikimi Antalya',
  'İş Kıyafeti Dikimi Antalya', 'Erkek Özel Dikim Antalya',

  // ── TÜRKÇE: BAYAN TERZİ ─────────────────────────────────────────────
  'Bayan Terzi Antalya', 'Antalya Bayan Terzi', 'Kadın Terzi Antalya',
  'Elbise Dikimi Antalya', 'Kadın Elbise Dikimi Antalya', 'Etek Dikimi Antalya',
  'Bluz Dikimi Antalya', 'Tulum Dikimi Antalya', 'Kadın Özel Dikim Antalya',
  'Kadın Kıyafet Dikimi Antalya', 'Abiye Dikimi Antalya', 'Gece Elbisesi Antalya',
  'Nişan Elbisesi Dikimi Antalya', 'Kına Kıyafeti Dikimi Antalya',

  // ── TÜRKÇE: GELİNLİK / DÜĞÜN ────────────────────────────────────────
  'Gelinlik Antalya', 'Gelinlik Dikimi Antalya', 'Gelinlik Tadilat Antalya',
  'Gelinlik Değişim Antalya', 'Damatlık Antalya', 'Damatlık Dikimi Antalya',
  'Düğün Kıyafeti Antalya', 'Abiye Antalya', 'Abiye Dikimi', 'Gelinlik Fiyatı Antalya',

  // ── TÜRKÇE: ÇOCUK / BEBEK ───────────────────────────────────────────
  'Çocuk Kıyafeti Dikimi Antalya', 'Bebek Elbisesi Dikimi Antalya',
  'Çocuk Elbise Dikimi', 'Bebek Kıyafeti Dikimi', 'Çocuk Kostüm Dikimi Antalya',
  'Anne Grubu Dikimi Antalya', 'Toplu Çocuk Kıyafeti Dikimi',
  'Okul Kıyafeti Dikimi Antalya', 'Çocuk Tadilat Antalya',

  // ── TÜRKÇE: BÜYÜK BEDEN ──────────────────────────────────────────────
  'Büyük Beden Terzi Antalya', 'Büyük Beden Dikim Antalya',
  'Büyük Beden Elbise Dikimi Antalya', 'Büyük Beden Tadilat Antalya',
  'Beden Seti Çıkarma', 'Özel Kalıp Antalya', 'Her Bedene Dikim Antalya',
  'Kilolu Beden Kıyafet Dikimi', 'Büyük Beden Gömlek Dikimi',

  // ── TÜRKÇE: EV TEKSTİLİ ─────────────────────────────────────────────
  'Nevresim Dikimi Antalya', 'Nevresim Takımı Dikimi', 'Perde Dikimi Antalya',
  'Stor Perde Dikimi Antalya', 'Tül Dikimi Antalya', 'Kırlent Dikimi Antalya',
  'Masa Örtüsü Dikimi Antalya', 'Yatak Örtüsü Dikimi', 'Ev Tekstili Dikimi Antalya',
  'Antalya Perde Atölyesi', 'Ölçüye Nevresim',

  // ── TÜRKÇE: KURU TEMİZLEME / ÇAMAŞIR ───────────────────────────────
  'Kuru Temizleme Antalya', 'Antalya Kuru Temizleme', 'Kuru Temizleme Fiyatı Antalya',
  'Çamaşır Yıkama Antalya', 'Ütü Hizmeti Antalya', 'Çamaşır Servisi Antalya',
  'Otele Çamaşır Servisi Antalya', 'Kıyafet Temizleme Antalya',
  'Antalya Ütü Servisi', 'Kıyafet Yıkama Antalya',

  // ── TÜRKÇE: KALIP / ÜRETİM ──────────────────────────────────────────
  'Kalıp Çıkarma Antalya', 'Model Dikimi Antalya', 'Prototip Dikimi Antalya',
  'Numune Dikimi Antalya', 'Seri İmalat Antalya', 'Fason İmalat Antalya',
  'Fason Üretim Antalya', 'Konfeksiyon Üretimi Antalya', 'Toptan Dikim Antalya',
  'Antalya Konfeksiyon', 'Tekstil Üretimi Antalya', 'Marka Üretimi Antalya',

  // ── TÜRKÇE: ÜNİFORMA / KOSTÜM ───────────────────────────────────────
  'Üniforma Dikimi Antalya', 'İş Üniforma Dikimi', 'Okul Üniforması Dikimi Antalya',
  'Spor Kıyafet Dikimi Antalya', 'Kostüm Dikimi Antalya', 'Tiyatro Kostümü Antalya',
  'Özel Kostüm Dikimi', 'Karnaval Kostümü Antalya', 'Tema Kostüm Dikimi',

  // ── TÜRKÇE: İLÇELER ─────────────────────────────────────────────────
  'Lara Terzi', 'Konyaaltı Terzi', 'Belek Terzi', 'Kemer Terzi',
  'Alanya Terzi', 'Manavgat Terzi', 'Side Terzi', 'Kepez Terzi',
  'Muratpaşa Terzi', 'Aksu Terzi', 'Döşemealtı Terzi', 'Serik Terzi',
  'Kaleiçi Terzi', 'Hurma Terzi', 'Uncalı Terzi', 'Varsak Terzi',
  'Lara Dikim', 'Konyaaltı Dikim', 'Belek Dikim', 'Kemer Dikim',

  // ── TÜRKÇE: FİYAT / SORU TİPİ ───────────────────────────────────────
  'Paça Kısaltma Kaç Lira', 'Terzi Fiyat Listesi', 'Elbise Dikimi Fiyatı',
  'Daraltma Fiyatı', 'Tadilat Fiyatı Antalya', 'Dikim Fiyatları 2025',
  'Antalya Terzi Ücretleri', 'Ucuz Tadilat Antalya', 'Hızlı Paça Kısaltma',

  // ── ENGLISH KEYWORDS ────────────────────────────────────────────────
  'Tailor Antalya', 'Antalya Tailor', 'Best Tailor Antalya', 'Master Tailor Antalya',
  'Tailor Near Me Antalya', 'Same Day Tailor Antalya', 'Express Tailor Antalya',
  'English Speaking Tailor Antalya', 'Tailor Turkey', 'Sewing Antalya',
  'Alterations Antalya', 'Clothing Alterations Antalya', 'Dress Alterations Antalya',
  'Trouser Hemming Antalya', 'Hem Pants Antalya', 'Suit Alterations Antalya',
  'Dress Repair Antalya', 'Clothing Repair Antalya', 'Zip Replacement Antalya',
  'Sleeve Shortening Antalya', 'Taking In Dress Antalya', 'Garment Repair Antalya',
  'Custom Tailoring Antalya', 'Custom Made Clothes Antalya', 'Bespoke Tailor Antalya',
  'Made to Measure Antalya', 'Custom Suit Antalya', 'Custom Dress Antalya',
  'Wedding Dress Alterations Antalya', 'Bridal Alterations Antalya',
  'Evening Gown Alterations Antalya', 'Formal Wear Alterations Antalya',
  'Dry Cleaning Antalya', 'Laundry Service Antalya', 'Ironing Service Antalya',
  'Hotel Laundry Antalya', 'Hotel Dry Cleaning Antalya', 'Hotel Pickup Laundry Antalya',
  'Pattern Making Antalya', 'Mass Production Antalya', 'Contract Manufacturing Antalya',
  'Sample Sewing Antalya', 'Clothing Manufacturer Antalya',
  'Mobile Tailor Antalya', 'Home Visit Tailor Antalya', 'Door to Door Tailor Antalya',
  'Tailor Delivery Antalya', 'Tailor Hotel Delivery Antalya',
  'Plus Size Tailor Antalya', 'Plus Size Alterations Antalya',
  'Children Clothing Antalya', 'Baby Clothes Sewing Antalya',
  'Curtain Sewing Antalya', 'Bed Linen Sewing Antalya',
  'Tailor Lara', 'Tailor Konyaalti', 'Tailor Belek', 'Tailor Kemer',
  'Tailor Alanya', 'Tailor Manavgat', 'Tailor Side',

  // ── RUSSIAN KEYWORDS ─────────────────────────────────────────────────
  'Портной Анталья', 'Портной в Анталье', 'Лучший портной Анталья',
  'Пошив одежды Анталья', 'Ателье Анталья', 'Ателье в Анталье',
  'Подгонка одежды Анталья', 'Подгонка брюк Анталья', 'Ушить брюки Анталья',
  'Укоротить брюки Анталья', 'Ремонт одежды Анталья', 'Починить одежду Анталья',
  'Замена молнии Анталья', 'Ушить платье Анталья', 'Подогнать костюм Анталья',
  'Пошив на заказ Анталья', 'Индивидуальный пошив Анталья',
  'Свадебное платье Анталья', 'Подгонка свадебного платья Анталья',
  'Пошив детской одежды Анталья', 'Детская одежда на заказ Анталья',
  'Одежда больших размеров Анталья', 'Пошив штор Анталья',
  'Постельное бельё на заказ Анталья',
  'Химчистка Анталья', 'Стирка Анталья', 'Глажка Анталья',
  'Химчистка в отеле Анталья', 'Стирка с доставкой Анталья',
  'Пошив по лекалам Анталья', 'Серийное производство Анталья',
  'Выездной портной Анталья', 'Портной с выездом Анталья',
  'Портной в отель Анталья', 'Доставка одежды Анталья',
  'Портной Лара', 'Портной Белек', 'Портной Кемер', 'Портной Аланья',

  // ── TÜRKÇE: FERMUAR & TAMİR DETAY ───────────────────────────────────
  'Fermuar Değişimi Antalya', 'Fermuar Tamiri Antalya', 'Kot Fermuarı Değişimi',
  'Pantolon Fermuarı Antalya', 'Mont Fermuarı Değişimi Antalya', 'Ceket Fermuarı Tamiri',
  'Elbise Fermuarı Değişimi', 'Sweatshirt Fermuarı Değişimi', 'Çanta Fermuarı Tamiri',
  'Yırtık Onarımı Antalya', 'Dikiş Tamiri Antalya', 'Astar Değişimi Antalya',
  'Düğme Dikimi Antalya', 'Yaka Değişimi Antalya', 'Cep Tamiri Antalya',
  'Kol Kısaltma Antalya', 'Etek Tamiri Antalya', 'Etek Kısaltma Antalya',
  'Abiye Tamiri Antalya', 'Abiye Tadilatı Antalya', 'Her Türlü Kıyafet Tamiri',

  // ── TÜRKÇE: SWEATSHIRT / EŞOFMAN ────────────────────────────────────
  'Sweatshirt Dikimi Antalya', 'Eşofman Dikimi Antalya', 'Eşofman Takımı Dikimi',
  'Kapüşonlu Sweatshirt Dikimi', 'Baskılı Sweatshirt Dikimi', 'Nakışlı Sweatshirt',
  'Sweatshirt Tadilatı', 'Eşofman Tadilatı', 'Spor Kıyafet Dikimi Antalya',
  'Toplu Sweatshirt Üretimi', 'Seri Sweatshirt Dikimi',

  // ── TÜRKÇE: NAKİŞ & BASKI ───────────────────────────────────────────
  'Nakış Antalya', 'Kıyafete Nakış', 'Logo Nakışı Antalya', 'İsim Nakışı',
  'Üniforma Nakışı Antalya', 'Sweatshirt Nakışı', 'Eşofman Nakışı',
  'Dijital Baskı Antalya', 'Transfer Baskı Antalya', 'Serigrafi Antalya',
  'Tekstil Baskı Antalya', 'Tişört Baskı Antalya',

  // ── TÜRKÇE: ÜNİFORMA GENEL ──────────────────────────────────────────
  'Üniforma Dikimi Antalya', 'Üniforma Üretimi Antalya', 'Üniforma Tasarımı Antalya',
  'Personel Üniforma Antalya', 'İş Üniforma Antalya', 'Seri Üniforma Üretimi',
  'Toplu Üniforma Siparişi', 'Özel Tasarım Üniforma', 'Üniforma Tadilat Antalya',

  // ── TÜRKÇE: OTEL / TURİZM ÜNİFORMASI ───────────────────────────────
  'Otel Üniforma Antalya', 'Otel Personel Üniforma', 'Otel Üniforma Dikimi',
  'Resepsiyon Üniforma Antalya', 'Kat Görevlisi Üniforma', 'Meydancı Üniforma Antalya',
  'Kapıcı Üniforma', 'Güvenlik Üniforma Antalya', 'Spa Personel Üniforma',
  'Animatör Üniforma', 'Otel Servis Üniforma', 'Turizm Sektörü Üniforma',
  'Resort Üniforma Antalya', 'Tatil Köyü Üniforma',

  // ── TÜRKÇE: RESTORAN / MUTFAK ───────────────────────────────────────
  'Aşçı Üniforma Antalya', 'Şef Kıyafeti Antalya', 'Aşçı Önlüğü Dikimi',
  'Garson Üniforma Antalya', 'Restoran Üniforma', 'Mutfak Üniforma Antalya',
  'Barista Üniforma', 'Komi Üniforma', 'Pastane Üniforma', 'Mutfak Önlüğü',

  // ── TÜRKÇE: SAĞLIK / ENDÜSTRİ ───────────────────────────────────────
  'Doktor Üniforma Antalya', 'Hemşire Üniforma Antalya', 'Sağlık Personel Kıyafeti',
  'Eczacı Üniforma', 'Laborant Üniforma', 'Hastane Kıyafeti Dikimi',
  'İşçi Üniforma Antalya', 'Fabrika Üniforma Dikimi', 'İş Güvenliği Kıyafeti',
  'Çağrı Merkezi Üniforma', 'Banka Personel Üniforma', 'Mağaza Personel Üniforma',

  // ── TÜRKÇE: OKUL / SPOR ─────────────────────────────────────────────
  'Okul Üniforma Dikimi Antalya', 'Okul Forması Antalya', 'Öğrenci Üniforma',
  'Spor Takım Üniforma', 'Futbol Forması Dikimi', 'Voleybol Forması Dikimi',
  'Basketbol Forması Dikimi', 'Spor Kulübü Kıyafeti',

  // ── TÜRKÇE: KESİM / DİKİM / ÜTÜ / PAKET ────────────────────────────
  'Kesim Dikim Antalya', 'Kesim Dikim Ütü Paket', 'Dikim Ütü Paket Hizmet',
  'Kalıp Tasarım Dikim', 'Model Tasarımı Antalya', 'Kesim Antalya',

  // ── ENGLISH: UNIFORM ────────────────────────────────────────────────
  'Uniform Production Antalya', 'Uniform Design Antalya', 'Hotel Uniform Antalya',
  'Reception Uniform Antalya', 'Chef Uniform Antalya', 'Waiter Uniform Antalya',
  'Restaurant Uniform Antalya', 'Staff Uniform Antalya', 'Security Uniform Antalya',
  'Medical Uniform Antalya', 'Doctor Uniform Antalya', 'Nurse Uniform Antalya',
  'School Uniform Antalya', 'Sports Uniform Antalya', 'Custom Uniform Antalya',
  'Bulk Uniform Order Antalya', 'Embroidery Antalya', 'Logo Embroidery Antalya',
  'Sweatshirt Sewing Antalya', 'Tracksuit Production Antalya',
  'Zip Repair Antalya', 'Trouser Repair Antalya', 'Dress Repair Antalya',
  'Skirt Repair Antalya', 'Evening Gown Repair Antalya',

  // ── RUSSIAN: UNIFORM & REPAIR ───────────────────────────────────────
  'Пошив формы Анталья', 'Форма для персонала Анталья', 'Гостиничная форма Анталья',
  'Форма для ресторана Анталья', 'Медицинская форма Анталья', 'Форма для повара Анталья',
  'Вышивка на форме Анталья', 'Логотип на одежде Анталья',
  'Пошив толстовок Анталья', 'Спортивная форма Анталья',
  'Замена молнии Анталья', 'Ремонт платья Анталья', 'Ремонт юбки Анталья',

  // ── GERMAN: UNIFORM & REPAIR ────────────────────────────────────────
  'Uniformproduktion Antalya', 'Hoteluniform Antalya', 'Kochuniform Antalya',
  'Restaurantuniform Antalya', 'Schuluniform Antalya', 'Sportuniform Antalya',
  'Stickerei Antalya', 'Logo Stickerei Antalya', 'Sweatshirt nähen Antalya',
  'Trainingsanzug nähen Antalya', 'Reißverschluss Reparatur Antalya',
  'Kleider ändern Antalya', 'Hose kürzen Antalya', 'Kleidung reparieren Antalya',
  'Reißverschluss wechseln Antalya', 'Maßanfertigung Antalya',
  'Maßschneiderei Antalya', 'Anzug ändern Antalya', 'Kleid enger machen Antalya',
  'Hochzeitskleid ändern Antalya', 'Brautkleid Anpassung Antalya',
  'Kinderkleidung nähen Antalya', 'Babykleidung Antalya', 'Übergrössen Schneider Antalya',
  'Vorhänge nähen Antalya', 'Bettwäsche nähen Antalya',
  'Reinigung Antalya', 'Chemische Reinigung Antalya', 'Wäsche Antalya',
  'Bügelservice Antalya', 'Hotel Reinigung Antalya', 'Hotel Wäscheservice Antalya',
  'Mobiler Schneider Antalya', 'Schneider mit Hausbesuch Antalya',
  'Schneider Lara', 'Schneider Belek', 'Schneider Kemer',

  // ── TÜRKÇE: FİYAT & "KAÇ LİRA" SORU TİPİ ───────────────────────────
  'Paça Kısaltma Kaç Lira', 'Paça Kısaltma Fiyatı 2025', 'Terzi Fiyatları 2025',
  'Fermuar Değişimi Kaç Lira', 'Mont Fermuarı Kaç Lira', 'Kot Fermuarı Kaç Lira',
  'Ceket Daraltma Fiyatı', 'Elbise Tadilat Fiyatı', 'Pantolon Daraltma Kaç Lira',
  'Tadilat Fiyatı 2025', 'Dikim Fiyatları 2025', 'Terzi Ücret Tarifesi 2025',
  'Kuru Temizleme Fiyatı Antalya', 'Etek Kısaltma Kaç Lira',
  'Abiye Tamiri Fiyatı', 'Gelinlik Tadilatı Fiyatı',

  // ── TÜRKÇE: KONUM & "YAKINIMDAK" TİPİ ──────────────────────────────
  'Yakınımda Terzi', 'En Yakın Terzi Antalya', 'Terzi Nerede Antalya',
  'Eve Gelen Terzi Antalya', 'Eve Gelen Terzi', 'Otele Gelen Terzi Antalya',
  'Adrese Teslim Terzi', 'Antalya Terzi Servisi', 'Terzi Çağır Antalya',
  'Terzi Adresi Antalya', 'Antalya Merkez Terzi', 'Lara Terzi Servisi',
  'Konyaaltı Eve Gelen Terzi', 'Belek Terzi Servisi', 'Kemer Eve Gelen Terzi',

  // ── TÜRKÇE: SEZONSAL ─────────────────────────────────────────────────
  'Mezuniyet Abiye Tamiri', 'Mezuniyet Abiye Kısaltma', 'Mezuniyet Kıyafeti Tadilat',
  'Düğün Sezonu Gelinlik Tadilat', 'Gelinlik Kısaltma', 'Gelinlik Tadilatı Antalya',
  'Kış Sezonu Mont Fermuarı', 'Mont Fermuarı Değişimi', 'Deri Mont Fermuarı',
  'Yaz Sezonu Elbise Daraltma', 'Ramazan Kıyafeti Dikimi', 'Bayramlık Dikim',
  'Düğün Kıyafeti Tadilat', 'Nişan Elbisesi Tadilat',

  // ── TÜRKÇE: SORU TİPİ ("NASIL" / "NEREDE") ──────────────────────────
  'Paça Kısaltma Nasıl Yapılır', 'Fermuar Nasıl Değiştirilir',
  'Antalya\'da Terzi Nasıl Bulunur', 'Elbise Nasıl Daraltılır',
  'Terzi Randevusu Antalya', 'Aynı Gün Terzi Antalya',

  // ── ENGLISH: PRICE & LOCATION ────────────────────────────────────────
  'Tailor Near Me Antalya', 'Nearest Tailor Antalya', 'Tailor Close By Antalya',
  'Home Visit Tailor Antalya', 'Hotel Tailor Service Antalya',
  'Trouser Hemming Cost Antalya', 'Alteration Prices Antalya',
  'Zip Replacement Cost Antalya', 'Tailor Price List Antalya',
  'Same Day Alterations Antalya', 'Express Tailor Antalya',
  'Graduation Dress Alteration Antalya', 'Wedding Season Alterations Antalya',
  'Evening Gown Shortening Antalya', 'Prom Dress Alteration Antalya',

  // ── RUSSIAN: PRICE & LOCATION ────────────────────────────────────────
  'Портной рядом Анталья', 'Портной с доставкой Анталья', 'Вызвать портного Анталья',
  'Цены на подгонку Анталья', 'Стоимость замены молнии Анталья',
  'Срочный ремонт одежды Анталья', 'Ремонт в тот же день Анталья',
  'Подгонка выпускного платья Анталья', 'Подгонка свадебного сезона',
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
            SEO FOOTER — KATEGORİLİ
        ══════════════════════════════ */}
        <div style={{ background: '#1c1814', padding: '36px 20px 48px', borderTop: '1px solid rgba(184,149,74,0.12)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: '#d4af6e', marginBottom: 20, textAlign: 'center' }}>
              Terzi Can | Tailor Can | Портной Кан | Schneider Can — Antalya
            </p>
            {[
              { label: '✂ Tadilat & Tamir', words: ['Paça Kısaltma','Pantolon Kısaltma','Paça Dikimi','Etek Kısaltma','Kol Kısaltma','Bel Alma','Daraltma','Beden Küçültme','Elbise Daraltma','Fermuar Değişimi','Yırtık Onarımı','Dikiş Tamiri','Düğme Dikimi','Astar Değişimi','Cep Tamiri','Yaka Değişimi'] },
              { label: '👔 Erkek & Bayan Terzi', words: ['Erkek Terzi Antalya','Bayan Terzi Antalya','Takım Elbise Dikimi','Ceket Dikimi','Gömlek Dikimi','Blazer Dikimi','Smoking Dikimi','Elbise Dikimi','Bluz Dikimi','Etek Dikimi','Tulum Dikimi','Abiye Dikimi','Nişan Elbisesi','Kına Kıyafeti'] },
              { label: '👶 Çocuk · Bebek · Büyük Beden', words: ['Çocuk Kıyafeti Dikimi','Bebek Elbisesi Dikimi','Çocuk Kostüm','Anne Grubu Dikimi','Okul Kıyafeti Dikimi','Büyük Beden Terzi','Büyük Beden Dikim','Beden Seti Çıkarma','Özel Kalıp Çıkarma','Her Bedene Dikim'] },
              { label: '💍 Gelinlik & Özel Gün', words: ['Gelinlik Dikimi Antalya','Gelinlik Tadilat','Damatlık Dikimi','Abiye Antalya','Gece Elbisesi','Düğün Kıyafeti','Nişan Elbisesi Dikimi'] },
              { label: '🏠 Ev Tekstili', words: ['Nevresim Dikimi','Nevresim Takımı Dikimi','Perde Dikimi','Stor Perde','Tül Dikimi','Kırlent Dikimi','Yatak Örtüsü','Masa Örtüsü','Ev Tekstili Dikimi'] },
              { label: '🧺 Kuru Temizleme & Çamaşır', words: ['Kuru Temizleme Antalya','Çamaşır Yıkama Antalya','Ütü Hizmeti','Otele Çamaşır Servisi','Kıyafet Temizleme','Hotel Laundry Antalya','Dry Cleaning Antalya','Ironing Service Antalya'] },
              { label: '🏭 Seri İmalat & Fason', words: ['Kalıp Çıkarma','Model Dikimi','Prototip Dikimi','Numune Dikimi','Seri İmalat Antalya','Fason İmalat Antalya','Konfeksiyon Üretimi','Toptan Dikim','Tekstil Üretimi','Mass Production Antalya'] },
              { label: '📍 İlçe & Bölge', words: ['Lara Terzi','Konyaaltı Terzi','Belek Terzi','Kemer Terzi','Alanya Terzi','Manavgat Terzi','Side Terzi','Kepez Terzi','Muratpaşa Terzi','Aksu Terzi','Serik Terzi','Kaleiçi Terzi','Hurma Terzi','Uncalı Terzi','Varsak Terzi'] },
              { label: '🏨 Üniforma — Otel & Turizm', words: ['Otel Üniforma Antalya','Resepsiyon Üniforma','Kat Görevlisi Üniforma','Meydancı Üniforma','Kapıcı Üniforma','Güvenlik Üniforma','Spa Üniforma','Animatör Üniforma','Otel Servis Üniforma','Resort Üniforma','Turizm Üniforma'] },
              { label: '🍽️ Üniforma — Restoran & Mutfak', words: ['Aşçı Üniforma Antalya','Şef Kıyafeti','Aşçı Önlüğü','Garson Üniforma','Barista Üniforma','Komi Üniforma','Pastane Üniforma','Mutfak Önlüğü','Restoran Üniforma'] },
              { label: '👨‍⚕️ Üniforma — Sağlık & Endüstri', words: ['Doktor Üniforma Antalya','Hemşire Üniforma','Sağlık Personel Kıyafeti','Eczacı Üniforma','Laborant Üniforma','İşçi Üniforma','Fabrika Üniforma','Çağrı Merkezi Üniforma','Banka Personel Üniforma'] },
              { label: '🏫 Üniforma — Okul & Spor', words: ['Okul Üniforma Dikimi','Okul Forması','Futbol Forması Dikimi','Voleybol Forması','Basketbol Forması','Spor Takım Üniforma','Spor Kulübü Kıyafeti'] },
              { label: '🪡 Nakış & Baskı', words: ['Nakış Antalya','Logo Nakışı','İsim Nakışı','Üniforma Nakışı','Sweatshirt Nakışı','Dijital Baskı','Transfer Baskı','Serigrafi','Tekstil Baskı'] },
              { label: '🧥 Sweatshirt & Eşofman', words: ['Sweatshirt Dikimi Antalya','Eşofman Dikimi','Kapüşonlu Sweatshirt','Baskılı Sweatshirt','Nakışlı Sweatshirt','Seri Sweatshirt Üretimi','Spor Kıyafet Dikimi'] },
              { label: '💰 Fiyat & "Kaç Lira" Aramaları', words: ['Paça Kısaltma Kaç Lira','Paça Kısaltma Fiyatı 2025','Fermuar Değişimi Kaç Lira','Mont Fermuarı Kaç Lira','Kot Fermuarı Kaç Lira','Ceket Daraltma Fiyatı','Elbise Tadilat Fiyatı','Terzi Fiyatları 2025','Tadilat Fiyatı 2025','Dikim Fiyatları 2025','Terzi Ücret Tarifesi 2025','Abiye Tamiri Fiyatı','Gelinlik Tadilatı Fiyatı'] },
              { label: '📍 Konum & "Yakınımda" Aramaları', words: ['Yakınımda Terzi','En Yakın Terzi Antalya','Terzi Nerede Antalya','Eve Gelen Terzi Antalya','Otele Gelen Terzi Antalya','Adrese Teslim Terzi','Terzi Çağır Antalya','Aynı Gün Terzi Antalya','Konyaaltı Eve Gelen Terzi','Belek Terzi Servisi','Lara Terzi Servisi'] },
              { label: '📅 Sezonsal Aramalar', words: ['Mezuniyet Abiye Tamiri','Mezuniyet Abiye Kısaltma','Düğün Sezonu Gelinlik Tadilat','Gelinlik Kısaltma','Kış Sezonu Mont Fermuarı','Deri Mont Fermuarı','Yaz Sezonu Elbise Daraltma','Bayramlık Dikim','Düğün Kıyafeti Tadilat','Nişan Elbisesi Tadilat'] },
              { label: '⚙️ Kesim · Dikim · Ütü · Paket', words: ['Kesim Dikim Antalya','Kesim Dikim Ütü Paket','Model Tasarımı Antalya','Kalıp Tasarım Dikim','Numune Dikimi','Prototip Dikimi'] },
              { label: '🇬🇧 English', words: ['Tailor Antalya','Alterations Antalya','Hemming Antalya','Zip Repair','Dress Repair','Skirt Shortening','Evening Gown Repair','Sweatshirt Sewing','Tracksuit Production','Embroidery Antalya','Logo Embroidery','Uniform Production Antalya','Hotel Uniform','Chef Uniform','Waiter Uniform','Reception Uniform','Doctor Uniform','School Uniform','Sports Uniform','Mobile Tailor','Plus Size Tailor','Bespoke Tailor Antalya'] },
              { label: '🇷🇺 Русский', words: ['Портной Анталья','Ателье Анталья','Подгонка брюк','Замена молнии','Ремонт платья','Пошив толстовок','Гостиничная форма','Форма повара','Форма официанта','Медицинская форма','Школьная форма','Вышивка логотипа','Химчистка Анталья','Выездной портной'] },
              { label: '🇩🇪 Deutsch', words: ['Schneider Antalya','Änderungsschneiderei','Hose kürzen','Reißverschluss Reparatur','Kleid reparieren','Sweatshirt nähen','Stickerei Antalya','Uniformproduktion','Hoteluniform','Kochuniform','Arztuniform','Schuluniform','Übergrößen Schneider','Mobiler Schneider'] },
            ].map(group => (
              <div key={group.label} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(184,149,74,0.45)', marginBottom: 5, paddingLeft: 2 }}>{group.label}</div>
                <div>{group.words.map(kw => <span key={kw} className="kw-pill">{kw}</span>)}</div>
              </div>
            ))}
            {/* Gizli tam liste */}
            <div style={{ fontSize: 0, height: 0, overflow: 'hidden', position: 'absolute' }} aria-hidden="true">{SEO_KEYWORDS.join(', ')}</div>
            <div style={{ borderTop: '1px solid rgba(184,149,74,0.1)', paddingTop: 16, marginTop: 8, textAlign: 'center' }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: 0.7, lineHeight: 1.8 }}>
                📍 Antalya, Türkiye &nbsp;·&nbsp; ☎ +90 531 898 64 18 &nbsp;·&nbsp; 🕐 09:00–19:00 &nbsp;·&nbsp; swaphubs.com/terzi
              </p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.1)', marginTop: 6, lineHeight: 1.7 }}>
                Antalya Terzi · Paça Kısaltma · Fermuar Değişimi · Tadilat · Tamir · Daraltma · Beden Küçültme · Büyük Beden · Erkek Terzi · Bayan Terzi · Çocuk Kıyafeti · Bebek Elbisesi · Nevresim · Perde · Gelinlik · Damatlık · Sweatshirt Dikimi · Eşofman Dikimi · Nakış · Logo Baskı · Üniforma Üretimi · Otel Üniforma · Aşçı Üniforma · Garson Üniforma · Doktor Üniforma · Okul Üniforma · Spor Üniforma · Kuru Temizleme · Seri İmalat · Fason Üretim · Terzi Servisi · Araçlı Terzi
              </p>
            </div>
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
