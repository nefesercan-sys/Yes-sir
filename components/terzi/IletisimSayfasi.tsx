// ============================================================
// components/IletisimSayfasi.tsx — 4 dilli İLETİŞİM sayfası (TR/EN/RU/DE)
// Amaç: "terzi can telefon / iletişim / adres / whatsapp", "açık terzi", "terzi nerede" gibi
// iletişim niyetli aramalarda çıkacak, telefon + adres + saat + ihtiyaç bazlı kısayollar içeren sayfa.
// Tek doğruluk kaynağı: lib/seo-data.ts (SITE, BUSINESS_ID, PHONE, PHONE_TEL, MAPS, SERVICES, serviceUrl...).
// Siteye özgü ayarlar yalnızca aşağıdaki SITE_CFG bloğundadır.
// ============================================================
import type { Metadata } from 'next';
import { crossCanonical } from '@/lib/cross-canonical';
import {
  SITE, BUSINESS_ID, PHONE, PHONE_TEL, MAPS, LANGS, LAST_UPDATE, SERVICES, SERVICE_BASE, HUB_MAIN, HOTEL_BASE,
  serviceUrl, type Lang,
} from '@/lib/seo-data';
import { jsonLdString } from '@/lib/json-ld';

type L4<T = string> = Record<Lang, T>;

// ── Siteye özgü ayarlar ─────────────────────────────────────
const SITE_CFG = {
  businessId: BUSINESS_ID,
  businessName: 'TERZİ Can - Konyaaltı', // Google profil adıyla birebir aynı
  image: `${SITE}/og/terzi-can.jpg`,
  geo: { latitude: 36.8572868, longitude: 30.5970193 },
  sameAs: [MAPS, `https://wa.me/${PHONE_TEL.replace('+', '')}`, 'https://terzihizmeti.com.tr'],
  contactUrl: {
    tr: '/terzi/iletisim',
    en: '/en/contact-tailor-antalya',
    ru: '/ru/kontakty-portnoy-antalya',
    de: '/de/kontakt-schneider-antalya',
  } as L4,
  pricesUrl: SERVICE_BASE as L4,   // swaphubs'ta ayrı fiyat sayfası yok: hizmet merkezi (fiyatlar hizmet sayfalarında)
  homeUrl: HUB_MAIN as L4,
  siteName: 'SwapHubs Terzi Can',
};

export const CONTACT_URL = SITE_CFG.contactUrl;

const OG_LOCALE: L4 = { tr: 'tr_TR', en: 'en_US', ru: 'ru_RU', de: 'de_DE' };
const PHONE_LOCAL = '0531 898 64 18';
const WA_BASE = `https://wa.me/${PHONE_TEL.replace('+', '')}`;
const abs = (p: string) => `${SITE}${p}`;

// ── Metinler ────────────────────────────────────────────────
const T = {
  tr: {
    title: `Terzi Can Konyaaltı Telefon ve WhatsApp | ${PHONE_LOCAL}`,
    desc: `Antalya Konyaaltı terzi telefonu ${PHONE}. Kıyafetin fotoğrafını WhatsApp'tan atın, fiyatı ve teslim gününü hemen öğrenin. Her gün 08:00–23:00.`,
    tag: 'Konyaaltı, Antalya · Haftanın 7 günü açık',
    h1: 'Terzi Çağırın ya da Fotoğraf Atın',
    lead: 'Aramak ya da yazmak yeterli. Kıyafeti fotoğrafla gönderin, ne kadar tutacağını ve ne zaman hazır olacağını aynı gün söyleyelim.',
    call: 'Telefonla Ara', wa: "WhatsApp'a Fotoğraf At", maps: 'Haritada Aç',
    infoH: 'Telefon, Adres ve Çalışma Saatleri',
    rows: [
      ['Telefon', PHONE],
      ['Adres', 'Hurma Mahallesi, 07130 Konyaaltı / Antalya'],
      ['Saatler', 'Haftanın 7 günü 08:00–23:00, Pazar günü de açık'],
      ['Konuştuğumuz diller', 'Türkçe, İngilizce, Rusça, Almanca'],
      ['Alım-teslim', 'Konyaaltı\'nda otel ve eve ücretsiz; uzak bölgeler WhatsApp\'ta planlanır'],
    ] as [string, string][],
    needH: 'Derdiniz hangisi?',
    needSub: 'Size uyan satıra dokunun: ilgili sayfaya gidin ya da doğrudan WhatsApp\'tan sorun.',
    waShort: 'WhatsApp\'tan sor',
    stepsH: 'Üç adımda halloluyor',
    steps: [
      ['1', 'Fotoğrafı atın', 'Kıyafetin ve yaptırmak istediğiniz işin fotoğrafını WhatsApp\'tan gönderin.'],
      ['2', 'Fiyatı öğrenin', 'Fiyatı ve teslim gününü yazarız. Normal tamir ve tadilat ertesi gün teslim edilir, acil işler 1–2 saatte hazırlanır.'],
      ['3', 'Getirin ya da alalım', 'Atölyeye uğrayın; isterseniz otelinizden ya da evinizden biz alıp getirelim.'],
    ] as [string, string, string][],
    faqH: 'Merak edilenler',
    faq: [
      ['Pazar günü açık bir terzi var mı?', 'Evet, Terzi Can Pazar dahil her gün 08:00–23:00 arası açık.'],
      ['Terzi Can\'ın telefon numarası kaç?', `${PHONE}. Hem arayabilir hem aynı numaradan WhatsApp'ta yazabilirsiniz.`],
      ['Fiyatı önceden nasıl öğrenirim?', 'Kıyafetin fotoğrafını WhatsApp\'tan atın. Başlangıç fiyatları: paça kısaltma ₺200, fermuar değişimi ₺300, abiye tadilatı ₺800, gelinlik tadilatı ₺800.'],
      ['Otelimden ya da evimden alıyor musunuz?', 'Konyaaltı\'nda otel ve eve alım-teslim ücretsiz. Daha uzak bölgelerde nasıl yapılacağını WhatsApp\'ta birlikte planlarız.'],
      ['Atölye tam olarak nerede?', 'Hurma Mahallesi, Konyaaltı. "Haritada Aç" düğmesiyle yol tarifi alabilirsiniz.'],
      ['Yabancı misafirlere hizmet veriyor musunuz?', 'Evet. WhatsApp\'tan kendi dilinizde yazabilirsiniz.'],
    ] as [string, string][],
    moreH: 'Bunlara da bakın',
    more: { prices: 'Hizmetler ve fiyatlar', services: 'Tüm hizmetler', hotel: 'Otele terzi çağır', home: 'Terzi Can ana sayfa' },
    waMsg: 'Merhaba, kıyafetim için fiyat ve süre öğrenmek istiyorum.',
    waNeed: (n: string) => `Merhaba, şu konuda fiyat ve teslim süresi öğrenmek istiyorum: "${n}".`,
    crumbHome: 'Ana sayfa', crumbThis: 'Telefon ve iletişim',
    needs: {
      paca: 'Pantolonun paçası uzun', fermuar: 'Fermuar bozuldu ya da sıkıştı', bel: 'Bel bol, daraltılması lazım',
      'elbise-tamir': 'Elbise yırtıldı ya da söküldü', 'elbise-dikim': 'Ölçüme göre elbise diktireceğim',
      'gelinlik-abiye': 'Gelinlik ya da abiye tadilatı lazım', hotel: 'Otelde kalıyorum, terzi gelsin', prices: 'Sadece fiyatları görmek istiyorum',
    },
  },
  en: {
    title: `Terzi Can Antalya Phone & WhatsApp | ${PHONE}`,
    desc: `Tailor in Konyaaltı, Antalya: call ${PHONE} or send a garment photo on WhatsApp and get price and ready date fast. Open daily 08:00–23:00.`,
    tag: 'Konyaaltı, Antalya · Open 7 days a week',
    h1: 'Call a Tailor or Send a Photo',
    lead: 'Just call or message. Send a photo of the garment and we tell you the cost and when it will be ready, the same day.',
    call: 'Call the workshop', wa: 'Send a photo on WhatsApp', maps: 'Open in Maps',
    infoH: 'Phone, Address and Opening Hours',
    rows: [
      ['Phone', PHONE],
      ['Address', 'Hurma Mahallesi, 07130 Konyaaltı / Antalya'],
      ['Hours', 'Seven days a week, 08:00–23:00 — Sundays too'],
      ['Language', 'Write to us on WhatsApp in your own language'],
      ['Pick-up & delivery', 'Free to hotels and homes in Konyaaltı; farther areas arranged on WhatsApp'],
    ] as [string, string][],
    needH: 'What is the problem?',
    needSub: 'Tap the line that fits: open the page or ask directly on WhatsApp.',
    waShort: 'Ask on WhatsApp',
    stepsH: 'Done in three steps',
    steps: [
      ['1', 'Send the photo', 'Send a photo of the garment and what you want done on WhatsApp.'],
      ['2', 'Get the price', 'We reply with the price and the ready date. Regular repairs are ready the next day and urgent jobs in 1–2 hours.'],
      ['3', 'Bring it or we collect it', 'Drop by the workshop, or we pick it up from your hotel or home and bring it back.'],
    ] as [string, string, string][],
    faqH: 'Good to know',
    faq: [
      ['Is there a tailor open on Sunday in Antalya?', 'Yes, Terzi Can is open every day including Sunday, 08:00–23:00.'],
      ['What is the phone number of Terzi Can?', `${PHONE}. You can call it or message the same number on WhatsApp.`],
      ['How do I find out the price in advance?', 'Send a photo of the garment on WhatsApp. We give the exact price and time from the photo.'],
      ['Do you collect from my hotel or home?', 'In Konyaaltı, pick-up and delivery to hotels and homes is free. For farther areas we arrange it together on WhatsApp.'],
      ['Where exactly is the workshop?', 'Hurma Mahallesi, Konyaaltı. Use the "Open in Maps" button for directions.'],
      ['Do you serve foreign visitors?', 'Yes. Besides Turkish message us on WhatsApp in your language.'],
    ] as [string, string][],
    moreH: 'Also see',
    more: { prices: 'Services and prices', services: 'All services', hotel: 'Tailor to your hotel', home: 'Terzi Can home' },
    waMsg: 'Hello! I would like to know the price and time for my garment.',
    waNeed: (n: string) => `Hello! Please tell me the price and ready date for: "${n}".`,
    crumbHome: 'Home', crumbThis: 'Phone & contact',
    needs: {
      paca: 'Trousers are too long', fermuar: 'Zipper broke or got stuck', bel: 'Waist is loose and needs taking in',
      'elbise-tamir': 'Dress is torn or the seam opened', 'elbise-dikim': 'I want a dress made to my measurements',
      'gelinlik-abiye': 'Wedding or evening gown needs altering', hotel: 'I am at a hotel — send the tailor', prices: 'I just want to see the prices',
    },
  },
  ru: {
    title: `Terzi Can Анталья: телефон и WhatsApp | ${PHONE}`,
    desc: `Портной в Коньяалты, Анталья: звоните ${PHONE} или пришлите фото вещи в WhatsApp — сразу назовём цену и срок. Ежедневно 08:00–23:00.`,
    tag: 'Коньяалты, Анталья · Работаем 7 дней в неделю',
    h1: 'Позвоните портному или пришлите фото',
    lead: 'Достаточно позвонить или написать. Отправьте фото вещи — в тот же день скажем стоимость и когда всё будет готово.',
    call: 'Позвонить в мастерскую', wa: 'Прислать фото в WhatsApp', maps: 'Открыть на карте',
    infoH: 'Телефон, адрес и часы работы',
    rows: [
      ['Телефон', PHONE],
      ['Адрес', 'Hurma Mahallesi, 07130 Коньяалты / Анталья'],
      ['Часы', 'Семь дней в неделю, 08:00–23:00, в воскресенье тоже'],
      ['Язык', 'Пишите в WhatsApp на своём языке'],
      ['Забор и доставка', 'Бесплатно в отели и на дом в Коньяалты; дальние районы — договоримся в WhatsApp'],
    ] as [string, string][],
    needH: 'В чём проблема?',
    needSub: 'Нажмите нужную строку: откройте страницу или спросите прямо в WhatsApp.',
    waShort: 'Спросить в WhatsApp',
    stepsH: 'Всё в три шага',
    steps: [
      ['1', 'Пришлите фото', 'Отправьте в WhatsApp фото вещи и напишите, что нужно сделать.'],
      ['2', 'Узнайте цену', 'Ответим с ценой и датой готовности. Обычный ремонт готов на следующий день, срочный — за 1–2 часа.'],
      ['3', 'Принесите или мы заберём', 'Заходите в мастерскую или мы заберём вещь из отеля или с дома и привезём обратно.'],
    ] as [string, string, string][],
    faqH: 'Полезно знать',
    faq: [
      ['Есть ли в Анталье портной, который работает в воскресенье?', 'Да, Terzi Can открыт каждый день, включая воскресенье, с 08:00 до 23:00.'],
      ['Какой номер телефона у Terzi Can?', `${PHONE}. Можно позвонить или написать на тот же номер в WhatsApp.`],
      ['Как узнать цену заранее?', 'Пришлите фото вещи в WhatsApp. Цены от: подшив, замена молнии, переделка вечернего платья, свадебного —.'],
      ['Вы забираете вещи из отеля или с дома?', 'В Коньяалты забор и доставка в отели и на дом бесплатны. Для дальних районов договариваемся вместе в WhatsApp.'],
      ['Где именно мастерская?', 'Hurma Mahallesi, Коньяалты. Кнопка «Открыть на карте» построит маршрут.'],
      ['Вы работаете с иностранными гостями?', 'Да. Помимо турецкого говорим по-русски, по-английски и по-немецки.'],
    ] as [string, string][],
    moreH: 'Смотрите также',
    more: { prices: 'Услуги и цены', services: 'Все услуги', hotel: 'Портной в ваш отель', home: 'Terzi Can — главная' },
    waMsg: 'Здравствуйте! Хочу узнать цену и срок для моей вещи.',
    waNeed: (n: string) => `Здравствуйте! Подскажите цену и срок: «${n}».`,
    crumbHome: 'Главная', crumbThis: 'Телефон и контакты',
    needs: {
      paca: 'Брюки длинноваты', fermuar: 'Молния сломалась или заела', bel: 'Велико в талии, нужно ушить',
      'elbise-tamir': 'Платье порвалось или разошёлся шов', 'elbise-dikim': 'Хочу платье по моим меркам',
      'gelinlik-abiye': 'Нужно переделать свадебное или вечернее платье', hotel: 'Я в отеле — пусть портной приедет', prices: 'Хочу просто посмотреть цены',
    },
  },
  de: {
    title: `Terzi Can Antalya Telefon & WhatsApp | ${PHONE}`,
    desc: `Schneider in Konyaaltı, Antalya: Anruf ${PHONE} oder Foto per WhatsApp senden – Preis und Fertigstellung nennen wir sofort. Täglich 08:00–23:00.`,
    tag: 'Konyaaltı, Antalya · 7 Tage die Woche geöffnet',
    h1: 'Schneider anrufen oder Foto schicken',
    lead: 'Anrufen oder schreiben genügt. Schicken Sie ein Foto des Kleidungsstücks, und wir nennen noch am selben Tag Preis und Fertigstellungstermin.',
    call: 'Werkstatt anrufen', wa: 'Foto per WhatsApp senden', maps: 'In Maps öffnen',
    infoH: 'Telefon, Adresse und Öffnungszeiten',
    rows: [
      ['Telefon', PHONE],
      ['Adresse', 'Hurma Mahallesi, 07130 Konyaaltı / Antalya'],
      ['Zeiten', 'Sieben Tage die Woche 08:00–23:00, auch sonntags'],
      ['Sprache', 'Schreiben Sie uns per WhatsApp in Ihrer Sprache'],
      ['Abholung & Lieferung', 'Kostenlos zu Hotels und nach Hause in Konyaaltı; weitere Gebiete besprechen wir per WhatsApp'],
    ] as [string, string][],
    needH: 'Wo drückt der Schuh?',
    needSub: 'Tippen Sie auf die passende Zeile: Seite öffnen oder direkt per WhatsApp fragen.',
    waShort: 'Per WhatsApp fragen',
    stepsH: 'In drei Schritten erledigt',
    steps: [
      ['1', 'Foto schicken', 'Senden Sie per WhatsApp ein Foto des Teils und sagen Sie, was gemacht werden soll.'],
      ['2', 'Preis erfahren', 'Wir antworten mit Preis und Fertigstellungstermin. Normale Reparaturen sind am nächsten Tag fertig, dringende in 1–2 Stunden.'],
      ['3', 'Vorbeibringen oder abholen lassen', 'Kommen Sie in die Werkstatt, oder wir holen es im Hotel oder zu Hause ab und bringen es zurück.'],
    ] as [string, string, string][],
    faqH: 'Gut zu wissen',
    faq: [
      ['Gibt es in Antalya einen Schneider, der sonntags geöffnet hat?', 'Ja, Terzi Can ist jeden Tag, auch sonntags, von 08:00 bis 23:00 Uhr geöffnet.'],
      ['Wie ist die Telefonnummer von Terzi Can?', `${PHONE}. Sie können anrufen oder an dieselbe Nummer per WhatsApp schreiben.`],
      ['Wie erfahre ich vorab den Preis?', 'Schicken Sie ein Foto per WhatsApp. Wir nennen Ihnen Preis und Dauer anhand des Fotos.'],
      ['Holen Sie im Hotel oder zu Hause ab?', 'In Konyaaltı sind Abholung und Lieferung zu Hotels und nach Hause kostenlos. Für weiter entfernte Gebiete klären wir es gemeinsam per WhatsApp.'],
      ['Wo genau ist die Werkstatt?', 'Hurma Mahallesi, Konyaaltı. Mit „In Maps öffnen“ erhalten Sie die Route.'],
      ['Bedienen Sie ausländische Gäste?', 'Ja. Neben Türkisch sprechen wir Deutsch, Englisch und Russisch.'],
    ] as [string, string][],
    moreH: 'Außerdem',
    more: { prices: 'Leistungen und Preise', services: 'Alle Leistungen', hotel: 'Schneider ins Hotel', home: 'Terzi Can Startseite' },
    waMsg: 'Hallo! Ich möchte Preis und Dauer für mein Kleidungsstück erfahren.',
    waNeed: (n: string) => `Hallo! Bitte nennen Sie mir Preis und Fertigstellung für: „${n}“.`,
    crumbHome: 'Startseite', crumbThis: 'Telefon & Kontakt',
    needs: {
      paca: 'Die Hose ist zu lang', fermuar: 'Reißverschluss kaputt oder klemmt', bel: 'Die Taille ist zu weit',
      'elbise-tamir': 'Kleid gerissen oder Naht aufgegangen', 'elbise-dikim': 'Ich möchte ein Kleid nach Maß',
      'gelinlik-abiye': 'Braut- oder Abendkleid muss geändert werden', hotel: 'Ich bin im Hotel – Schneider soll kommen', prices: 'Ich möchte nur die Preise sehen',
    },
  },
} as const;

type NeedKey = keyof (typeof T)['tr']['needs'];
const NEED_ORDER: NeedKey[] = ['paca', 'fermuar', 'bel', 'elbise-tamir', 'elbise-dikim', 'gelinlik-abiye', 'hotel', 'prices'];
const NEED_ICON: Record<NeedKey, string> = {
  paca: '📏', fermuar: '🔧', bel: '🪡', 'elbise-tamir': '🧵', 'elbise-dikim': '👗', 'gelinlik-abiye': '👰', hotel: '🏨', prices: '💰',
};

function needUrl(lang: Lang, k: NeedKey): string {
  if (k === 'prices') return SITE_CFG.pricesUrl[lang];
  if (k === 'hotel') return HOTEL_BASE[lang] || HUB_MAIN[lang];
  const s = SERVICES.find((x) => x.id === k);
  return s ? serviceUrl(lang, s) : SERVICE_BASE[lang];
}


export function iletisimMetadata(lang: Lang): Metadata {
  const c = T[lang];
  const url = abs(SITE_CFG.contactUrl[lang]);
  return {
    metadataBase: new URL(SITE),
    title: { absolute: c.title },
    description: c.desc,
    // EN/RU/DE iletişim sayfalarının terzihizmeti.com.tr'de birebir karşılığı var → cross-domain canonical, hreflang yok.
    // Türkçe iletişim sayfası swaphubs'ta canonical kalır (karşılıkları başka sitede olduğu için hreflang verilmez).
    alternates: { canonical: crossCanonical(SITE_CFG.contactUrl[lang]) ?? url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    openGraph: {
      title: c.title, description: c.desc, url, siteName: SITE_CFG.siteName, locale: OG_LOCALE[lang], type: 'website',
      images: [{ url: SITE_CFG.image, width: 1024, height: 1024, alt: c.title, type: 'image/jpeg' }],
    },
    twitter: { card: 'summary_large_image', title: c.title, description: c.desc, images: [SITE_CFG.image] },
  };
}

function buildJsonLd(lang: Lang) {
  const c = T[lang];
  const url = abs(SITE_CFG.contactUrl[lang]);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ClothingStore'],
        additionalType: ['https://schema.org/SewingService', 'https://schema.org/DryCleaningService'],
        '@id': SITE_CFG.businessId,
        name: SITE_CFG.businessName,
        url: SITE,
        telephone: PHONE_TEL,
        priceRange: '₺₺',
        image: SITE_CFG.image,
        hasMap: MAPS,
        address: {
          '@type': 'PostalAddress', streetAddress: 'Hurma Mahallesi', addressLocality: 'Konyaaltı',
          addressRegion: 'Antalya', postalCode: '07130', addressCountry: 'TR',
        },
        geo: { '@type': 'GeoCoordinates', ...SITE_CFG.geo },
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00', closes: '23:00',
        }],
        contactPoint: [{
          '@type': 'ContactPoint', telephone: PHONE_TEL, contactType: 'customer service', areaServed: 'TR',
          availableLanguage: ['Turkish', 'English', 'Russian', 'German', 'Polish', 'Ukrainian', 'Dutch', 'French', 'Spanish', 'Arabic'],
        }],
        sameAs: SITE_CFG.sameAs,
        knowsLanguage: ['tr', 'en', 'ru', 'de', 'pl', 'uk', 'nl', 'fr', 'es', 'ar'],
      },
      {
        '@type': 'ContactPage', '@id': `${url}#webpage`, url, name: c.title, description: c.desc, inLanguage: lang,
        dateModified: LAST_UPDATE,
        mainEntity: { '@id': SITE_CFG.businessId },
        about: { '@id': SITE_CFG.businessId },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#ct-h1', '.ct-lead'] },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.crumbHome, item: SITE },
          { '@type': 'ListItem', position: 2, name: c.crumbThis, item: url },
        ],
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`, inLanguage: lang,
        mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
}

const CSS = `
.ct{background:#F8F5F0;color:#1A1A1A;min-height:100vh;font-family:inherit;line-height:1.6}
.ct *{box-sizing:border-box}
.ct a{color:inherit;text-decoration:none}
.ct-hero{background:linear-gradient(160deg,#1E3329 0%,#2C4A3E 100%);color:#fff;padding:5.5rem 1.25rem 3rem}
.ct-in{max-width:920px;margin:0 auto}
.ct-tag{display:inline-block;border:1px solid rgba(201,169,110,.55);color:#E2C98F;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;padding:6px 12px;border-radius:2px;margin-bottom:1.1rem}
.ct h1{font-size:clamp(1.9rem,6vw,3rem);line-height:1.12;font-weight:800;margin-bottom:.9rem}
.ct-lead{font-size:1.02rem;color:rgba(255,255,255,.88);max-width:640px;margin-bottom:1.6rem}
.ct-btns{display:flex;flex-wrap:wrap;gap:12px}
.ct-btn{display:inline-flex;align-items:center;gap:10px;font-weight:800;font-size:1rem;padding:15px 24px;border-radius:6px}
.ct-call{background:#C9A96E;color:#1E3329}
.ct-wa{background:#0F7B3C;color:#fff}
.ct-map{border:2px solid rgba(255,255,255,.5);color:#fff;font-weight:700}
.ct-sec{padding:2.6rem 1.25rem}
.ct-sec.alt{background:#F2EDE5}
.ct h2{font-size:clamp(1.3rem,3.6vw,1.8rem);font-weight:800;margin-bottom:1rem;color:#1A1A1A}
.ct-info{display:grid;gap:0;border:1px solid rgba(44,74,62,.18);border-radius:8px;overflow:hidden;background:#fff}
.ct-row{display:grid;grid-template-columns:minmax(120px,190px) 1fr;gap:12px;padding:14px 18px;border-bottom:1px solid rgba(44,74,62,.12)}
.ct-row:last-child{border-bottom:0}
.ct-k{font-weight:700;color:#2C4A3E;font-size:.92rem}
.ct-v{font-size:.98rem}
.ct-v a{font-weight:800;color:#0F5C2E;text-decoration:underline}
.ct-sub{color:#565C45;margin-bottom:1.2rem;font-size:.95rem}
.ct-needs{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.ct-need{background:#fff;border:1px solid rgba(44,74,62,.18);border-radius:8px;padding:14px 16px;display:flex;flex-direction:column;gap:10px}
.ct-need a.ct-nl{font-weight:700;font-size:.98rem;color:#1A1A1A;display:flex;gap:10px;align-items:flex-start}
.ct-need a.ct-nl:hover{text-decoration:underline}
.ct-need a.ct-nw{align-self:flex-start;font-size:.82rem;font-weight:800;background:#0F7B3C;color:#fff;padding:7px 14px;border-radius:5px}
.ct-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}
.ct-step{background:#fff;border:1px solid rgba(44,74,62,.18);border-radius:8px;padding:18px}
.ct-step b.n{display:inline-flex;width:30px;height:30px;border-radius:50%;background:#2C4A3E;color:#fff;align-items:center;justify-content:center;margin-bottom:8px}
.ct-step h3{font-size:1rem;margin-bottom:4px}
.ct-step p{font-size:.92rem;color:#3F4433}
.ct-faq details{background:#fff;border:1px solid rgba(44,74,62,.18);border-radius:8px;padding:14px 16px;margin-bottom:10px}
.ct-faq summary{font-weight:700;cursor:pointer}
.ct-faq p{margin-top:8px;font-size:.95rem;color:#3F4433}
.ct-more{display:flex;flex-wrap:wrap;gap:10px}
.ct-more a{background:#2C4A3E;color:#fff;font-weight:700;font-size:.9rem;padding:10px 16px;border-radius:6px}
.ct-langs{margin-top:1.4rem;font-size:.85rem;color:#3F4433;display:flex;gap:14px;flex-wrap:wrap}
.ct-langs a{text-decoration:underline}
@media(max-width:560px){.ct-row{grid-template-columns:1fr;gap:2px}}
`;

export default function IletisimSayfasi({ lang }: { lang: Lang }) {
  const c = T[lang];
  const waHref = `${WA_BASE}?text=${encodeURIComponent(c.waMsg)}`;
  const LANG_LABEL: Record<Lang, string> = { tr: 'Türkçe', en: 'English', ru: 'Русский', de: 'Deutsch' };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(buildJsonLd(lang)) }} />
      <style>{CSS}</style>
      <div className="ct" lang={lang}>
        <main id="main">
          <section className="ct-hero" aria-labelledby="ct-h1">
            <div className="ct-in">
              <span className="ct-tag">{c.tag}</span>
              <h1 id="ct-h1">{c.h1}</h1>
              <p className="ct-lead">{c.lead}</p>
              <div className="ct-btns">
                <a className="ct-btn ct-call" href={`tel:${PHONE_TEL}`}>📞 {c.call}: {PHONE}</a>
                <a className="ct-btn ct-wa" href={waHref} target="_blank" rel="noopener noreferrer">💬 {c.wa}</a>
                <a className="ct-btn ct-map" href={MAPS} target="_blank" rel="noopener noreferrer">📍 {c.maps}</a>
              </div>
            </div>
          </section>

          <section className="ct-sec" aria-labelledby="ct-steps-h">
            <div className="ct-in">
              <h2 id="ct-steps-h">{c.stepsH}</h2>
              <div className="ct-steps">
                {c.steps.map(([n, h, p]) => (
                  <div className="ct-step" key={n}><b className="n">{n}</b><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
            </div>
          </section>

          <section className="ct-sec alt" aria-labelledby="ct-need-h">
            <div className="ct-in">
              <h2 id="ct-need-h">{c.needH}</h2>
              <p className="ct-sub">{c.needSub}</p>
              <div className="ct-needs">
                {NEED_ORDER.map((k) => {
                  const name = c.needs[k];
                  return (
                    <div className="ct-need" key={k}>
                      <a className="ct-nl" href={needUrl(lang, k)}><span aria-hidden="true">{NEED_ICON[k]}</span><span>{name}</span></a>
                      <a className="ct-nw" href={`${WA_BASE}?text=${encodeURIComponent(c.waNeed(name))}`} target="_blank" rel="noopener noreferrer">💬 {c.waShort}</a>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="ct-sec" aria-labelledby="ct-info-h">
            <div className="ct-in">
              <h2 id="ct-info-h">{c.infoH}</h2>
              <div className="ct-info">
                {c.rows.map(([k, v], i) => (
                  <div className="ct-row" key={k}>
                    <div className="ct-k">{k}</div>
                    <div className="ct-v">{i === 0 ? <a href={`tel:${PHONE_TEL}`}>{v}</a> : v}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ct-sec alt ct-faq" aria-labelledby="ct-faq-h">
            <div className="ct-in">
              <h2 id="ct-faq-h">{c.faqH}</h2>
              {c.faq.map(([q, a]) => (
                <details key={q}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </section>

          <section className="ct-sec" aria-labelledby="ct-more-h">
            <div className="ct-in">
              <h2 id="ct-more-h">{c.moreH}</h2>
              <div className="ct-more">
                <a href={SITE_CFG.pricesUrl[lang]}>{c.more.prices}</a>
                <a href={SERVICE_BASE[lang]}>{c.more.services}</a>
                <a href={HOTEL_BASE[lang] || HUB_MAIN[lang]}>{c.more.hotel}</a>
                <a href={SITE_CFG.homeUrl[lang]}>{c.more.home}</a>
              </div>
              <nav className="ct-langs" aria-label="Languages">
                {LANGS.filter((l) => l !== lang).map((l) => (
                  <a key={l} href={SITE_CFG.contactUrl[l]} hrefLang={l}>{LANG_LABEL[l]}</a>
                ))}
              </nav>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
