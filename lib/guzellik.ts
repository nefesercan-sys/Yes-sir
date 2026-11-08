// ============================================================
// swaphubs.com — lib/guzellik.ts
// "Can Beauty Studio" güzellik hizmeti sayfaları (10 dil, dil başına tek ana sayfa).
// Terzi sayfalarından tamamen ayrıdır: kendi veri dosyası, kendi @id'si, kendi sitemap'i.
//
// SAHİP BİLGİSİ (uydurma yok): Antalya'nın bütün bölgelerinde ANLAŞMALI SALONLAR (salon adı gösterilmez); uzman müşterinin evine
// gidebilir; müşteri isterse otelinden/evinden anlaşmalı salona kendisi gider; her gün 08:00–24:00; telefon ve WhatsApp
// +90 531 510 44 58; fiyat sayfada YOK (WhatsApp'tan verilir). Sağlık/tıbbi/estetik işlem, lazer, masaj, kalıcı makyaj YAZILMAZ.
// Adres/koordinat yok (kendi salonumuz iddiası yok). Puan/yorum/sertifika/garanti/süre/mesafe/ücretsiz servis iddiası yok.
// ============================================================

export type GLang = 'tr' | 'en' | 'ru' | 'de' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export const GLANGS: GLang[] = ['tr', 'en', 'de', 'ru', 'es', 'fr', 'pl', 'uk', 'nl', 'ar'];

export const SVC_IDS = ['hair', 'nails', 'brows', 'makeup', 'bridal', 'skin', 'wax'] as const;
export type SvcId = (typeof SVC_IDS)[number];

export const G_SITE = 'https://swaphubs.com';
export const G_BRAND = 'Can Beauty Studio';
export const G_ID = `${G_SITE}/guzellik#studio`;
export const G_PHONE = '+90 531 510 44 58';
export const G_PHONE_TEL = '+905315104458';
export const G_WA = '905315104458';
export const G_HOURS_OPEN = '08:00';
export const G_HOURS_CLOSE = '23:59';
/** Bölge listesi (form + şema). 'Diğer' seçeneği formda ayrıca çevrilir. */
export const G_AREAS = ['Konyaaltı', 'Muratpaşa', 'Lara', 'Kundu', 'Kepez', 'Döşemealtı', 'Aksu', 'Kemer', 'Belek', 'Serik', 'Side', 'Manavgat'] as const;

/** Tüm güzellik adresleri tek /guzellik/ öneki altındadır (dil klasörü yok; slug dile özgüdür). */
export const G_PREFIX = '/guzellik';
export const G_SLUG: Record<GLang, string> = {
  tr: 'guzellik-merkezi-antalya',
  en: 'beauty-salon-antalya',
  de: 'schoenheitssalon-antalya',
  ru: 'salon-krasoty-antalya',
  es: 'salon-de-belleza-antalya',
  fr: 'salon-de-beaute-antalya',
  pl: 'salon-urody-antalya',
  uk: 'salon-krasy-antaliya',
  nl: 'schoonheidssalon-antalya',
  ar: 'salon-tajmeel-antalya',
};
export const G_PATH: Record<GLang, string> = Object.fromEntries(
  (Object.keys(G_SLUG) as GLang[]).map((l) => [l, `${G_PREFIX}/${G_SLUG[l]}`]),
) as Record<GLang, string>;
/** Slug'dan dil (middleware ve rota için). */
export const gLangFromSlug = (slug: string): GLang | null => (GLANGS.find((l) => G_SLUG[l] === slug) ?? null);

export const G_LOCALE: Record<GLang, string> = {
  tr: 'tr_TR', en: 'en_US', de: 'de_DE', ru: 'ru_RU', es: 'es_ES', fr: 'fr_FR', pl: 'pl_PL', uk: 'uk_UA', nl: 'nl_NL', ar: 'ar_SA',
};
export const G_NAMES: Record<GLang, string> = {
  tr: 'Türkçe', en: 'English', de: 'Deutsch', ru: 'Русский', es: 'Español', fr: 'Français', pl: 'Polski', uk: 'Українська', nl: 'Nederlands', ar: 'العربية',
};

export const gUrl = (l: GLang) => G_PATH[l];
export const gAbs = (l: GLang) => `${G_SITE}${G_PATH[l]}`;
/** 10 dil + x-default (EN). */
export function gLanguages(): Record<string, string> {
  const m: Record<string, string> = Object.fromEntries(GLANGS.map((l) => [l, gAbs(l)]));
  m['x-default'] = gAbs('en');
  return m;
}

/** /guzellik/... yolları: terzi şeması ve içerik haritası bu sayfalarda çıkmaz. */
export function isGuzellikPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const p = pathname.toLowerCase().replace(/\/$/, '');
  return p === G_PREFIX || p.startsWith(`${G_PREFIX}/`);
}

export type FormCopy = {
  services: string; area: string; areaPick: string; areaOther: string; mode: string; home: string; salon: string;
  date: string; time: string; people: string; note: string; notePh: string; send: string; hint: string;
  msgHello: string; msgService: string; msgArea: string; msgMode: string; msgDate: string; msgTime: string; msgPeople: string; msgNote: string;
};

export type GCopy = {
  title: string; desc: string; h1: string; lead: string; crumb: string; keywords: string[];
  transparency: string; hours: string;
  stepsH: string; steps: string[];
  svcH: string; svcIntro: string; svc: Record<SvcId, { name: string; text: string }>; ask: string; askMsg: string;
  placeH: string; place: string[];
  formH: string; form: FormCopy;
  faqTitle: string; faq: [string, string][];
  cta: string; ctaMsg: string; call: string; priceNote: string; langH: string;
  svcName: string; svcDesc: string; rtl?: boolean;
};

export const G: Record<GLang, GCopy> = {
  // ───────────────────────────── TR ─────────────────────────────
  tr: {
    title: 'Güzellik Merkezi Antalya | Saç, Tırnak, Makyaj | Can Beauty Studio',
    desc: "Antalya'da saç, tırnak, makyaj, gelin hazırlığı, cilt bakımı ve ağda için anlaşmalı salonlar; evinizde de hizmet. Talep formunu doldurun, fiyatı WhatsApp'tan alın.",
    h1: "Antalya'da Güzellik Merkezi: Saç, Tırnak, Makyaj ve Bakım",
    lead: "Kısa cevap: Almak istediğiniz hizmeti ve bölgenizi WhatsApp'tan +90 531 510 44 58 numarasına yazın; sizi Antalya'daki anlaşmalı salonlardan uygun olana yönlendirelim. İsterseniz uzman evinize gelir. Fiyat hizmete, bölgeye ve işin detayına göre WhatsApp'tan verilir. Her gün 08:00–24:00.",
    crumb: 'Güzellik merkezi',
    keywords: ['güzellik merkezi antalya', 'antalya kuaför', 'antalya manikür pedikür', 'antalya gelin saçı makyajı', 'evde güzellik hizmeti antalya', 'turist güzellik merkezi antalya', 'Can Beauty Studio'],
    transparency: 'Hizmet, bölgedeki anlaşmalı salonlar ve uzmanlar aracılığıyla verilir.',
    hours: 'Her gün 08:00–24:00',
    stepsH: 'Nasıl randevu alırsınız?',
    steps: [
      'Aşağıdaki talep formunu doldurun ya da WhatsApp’tan yazın: hangi hizmet, hangi bölge, hangi gün.',
      'Size fiyatı bildirir ve bölgenizdeki uygun anlaşmalı salona ya da uzmana yönlendiririz.',
      'Gün ve saat WhatsApp’tan netleşir.',
      'Salona gidersiniz ya da uzman evinize gelir.',
    ],
    svcH: 'Hizmetler',
    svcIntro: 'Aşağıdaki hizmetlerden birini seçip WhatsApp’tan sorabilirsiniz. Listede olmayan bir istek için de yazın, birlikte bakalım.',
    svc: {
      hair: { name: 'Saç', text: 'Kesim, boya, fön ve saç bakımı.' },
      nails: { name: 'Tırnak', text: 'Manikür, pedikür, kalıcı oje ve protez tırnak.' },
      brows: { name: 'Kaş ve kirpik', text: 'Kaş şekillendirme ve kirpik bakımı.' },
      makeup: { name: 'Makyaj', text: 'Günlük, davet ve gece makyajı.' },
      bridal: { name: 'Gelin saçı ve makyajı', text: 'Gelin hazırlığı; tarih ve istekler WhatsApp’tan konuşulur.' },
      skin: { name: 'Cilt bakımı', text: 'Temizlik ve bakım uygulamaları.' },
      wax: { name: 'Ağda', text: 'Vücut ve yüz ağdası.' },
    },
    ask: "WhatsApp'tan sor",
    askMsg: "Merhaba, Antalya'da {s} hizmeti hakkında bilgi ve fiyat almak istiyorum.",
    placeH: 'Evde mi, salonda mı?',
    place: [
      "Antalya'nın bütün bölgelerinde uzman evinize gelebilir. Ev hizmetinin koşulları ve ücreti WhatsApp'tan netleştirilir.",
      "İsterseniz otelinizden ya da evinizden anlaşmalı salona kendiniz gidebilirsiniz. Bölgenize uygun salonu WhatsApp'tan birlikte seçeriz; salon bilgisi randevu aşamasında paylaşılır.",
    ],
    formH: 'Hızlı talep formu',
    form: {
      services: 'Hizmet (birden fazla seçebilirsiniz)', area: 'Bölge', areaPick: 'Bölge seçin', areaOther: 'Diğer (WhatsApp’tan yazacağım)',
      mode: 'Nerede?', home: 'Evimde', salon: 'Anlaşmalı salonda', date: 'Tarih', time: 'Saat', people: 'Kişi sayısı', note: 'Not', notePh: 'İstekleriniz, fotoğraf göndereceğinizi yazabilirsiniz',
      send: "WhatsApp'tan gönder", hint: 'Butona basınca WhatsApp açılır, mesaj hazır gelir; göndermeden önce düzenleyebilirsiniz.',
      msgHello: 'Merhaba, Can Beauty Studio talep formu:', msgService: 'Hizmet', msgArea: 'Bölge', msgMode: 'Nerede', msgDate: 'Tarih', msgTime: 'Saat', msgPeople: 'Kişi sayısı', msgNote: 'Not',
    },
    faqTitle: 'Sık sorulan sorular',
    faq: [
      ['Randevuyu nasıl alırım?', "Talep formunu doldurun ya da +90 531 510 44 58 numarasına WhatsApp'tan hizmeti, bölgeyi ve istediğiniz günü yazın. Size fiyatı bildirir, uygun anlaşmalı salona veya uzmana yönlendiririz."],
      ['Fiyat nasıl öğrenilir?', "Fiyat sayfada yazmaz; hizmete, bölgeye ve işin detayına göre WhatsApp'tan verilir. İstediğiniz işi yazmanız yeterli."],
      ['Evimde hizmet alabilir miyim?', "Evet, Antalya'nın bütün bölgelerinde uzman evinize gelebilir. Koşullar ve ücret WhatsApp'tan netleştirilir."],
      ['Otelde kalıyorum, ne yapmalıyım?', "Otelinizden anlaşmalı salona kendiniz gidebilirsiniz. Bölgenize uygun salonu WhatsApp'tan birlikte seçeriz."],
      ['Hizmeti kim veriyor?', 'Hizmet, bölgedeki anlaşmalı salonlar ve uzmanlar aracılığıyla verilir. Can Beauty Studio sizi doğru salona yönlendirir; salon adları sayfada gösterilmez.'],
      ['Çalışma saatleri nedir?', 'Her gün 08:00–24:00 arası WhatsApp ve telefondan ulaşabilirsiniz.'],
    ],
    cta: "Fiyat al (WhatsApp)", ctaMsg: "Merhaba, Antalya'da güzellik hizmeti için fiyat almak istiyorum.", call: 'Ara', priceNote: "Fiyat hizmete, bölgeye ve işin detayına göre WhatsApp'tan verilir.", langH: 'Diğer diller',
    svcName: 'Güzellik hizmetleri (saç, tırnak, makyaj, gelin hazırlığı, cilt bakımı, ağda)', svcDesc: "Antalya'daki anlaşmalı salonlarda ve evde güzellik hizmeti; randevu ve fiyat WhatsApp'tan.",
  },
  // ───────────────────────────── EN ─────────────────────────────
  en: {
    title: 'Beauty Salon in Antalya | Hair, Nails, Makeup | Can Beauty Studio',
    desc: 'Book hair, nails, makeup, bridal styling, skin care and waxing in Antalya through partner salons, or at your place. Send the quick request form and get your price on WhatsApp.',
    h1: 'Beauty Salon in Antalya: Hair, Nails, Makeup and Care for Visitors',
    lead: 'Short answer: message +90 531 510 44 58 on WhatsApp with the service and the area you are in, and we will point you to a suitable partner salon in Antalya. A specialist can also come to your home. Prices depend on the service, the area and the details, and are given on WhatsApp. Open every day 08:00–24:00.',
    crumb: 'Beauty salon',
    keywords: ['beauty salon antalya', 'hair salon antalya tourists', 'nails antalya manicure pedicure', 'bridal hair and makeup antalya', 'beauty at home antalya', 'Can Beauty Studio'],
    transparency: 'The service is provided through partner salons and specialists in your area.',
    hours: 'Every day 08:00–24:00',
    stepsH: 'How booking works',
    steps: [
      'Fill in the request form below or write on WhatsApp: which service, which area, which day.',
      'We tell you the price and direct you to a suitable partner salon or specialist in your area.',
      'The day and time are confirmed on WhatsApp.',
      'You go to the salon, or the specialist comes to your home.',
    ],
    svcH: 'Services',
    svcIntro: 'Pick a service and ask about it on WhatsApp. If what you need is not on the list, write to us anyway and we will check together.',
    svc: {
      hair: { name: 'Hair', text: 'Cut, colour, blow-dry and hair care.' },
      nails: { name: 'Nails', text: 'Manicure, pedicure, gel polish and nail extensions.' },
      brows: { name: 'Brows and lashes', text: 'Brow shaping and lash care.' },
      makeup: { name: 'Makeup', text: 'Day, party and evening makeup.' },
      bridal: { name: 'Bridal hair and makeup', text: 'Bridal preparation; date and wishes are discussed on WhatsApp.' },
      skin: { name: 'Skin care', text: 'Cleansing and care treatments.' },
      wax: { name: 'Waxing', text: 'Body and face waxing.' },
    },
    ask: 'Ask on WhatsApp',
    askMsg: 'Hello, I would like information and a price for {s} in Antalya.',
    placeH: 'At home or at a salon?',
    place: [
      'A specialist can come to your home anywhere in Antalya. The conditions and the fee for home visits are clarified on WhatsApp.',
      'Or you can go to a partner salon yourself from your hotel or home. We choose the salon that suits your area together on WhatsApp; the salon details are shared when you book.',
    ],
    formH: 'Quick request form',
    form: {
      services: 'Service (you can pick several)', area: 'Area', areaPick: 'Choose an area', areaOther: 'Other (I will write on WhatsApp)',
      mode: 'Where?', home: 'At my place', salon: 'At a partner salon', date: 'Date', time: 'Time', people: 'Number of people', note: 'Note', notePh: 'Your wishes, or say that you will send a photo',
      send: 'Send on WhatsApp', hint: 'WhatsApp opens with the message ready; you can edit it before sending.',
      msgHello: 'Hello, Can Beauty Studio request form:', msgService: 'Service', msgArea: 'Area', msgMode: 'Where', msgDate: 'Date', msgTime: 'Time', msgPeople: 'People', msgNote: 'Note',
    },
    faqTitle: 'Frequently asked questions',
    faq: [
      ['How do I book?', 'Fill in the request form or write to +90 531 510 44 58 on WhatsApp with the service, the area and the day you want. We tell you the price and direct you to a suitable partner salon or specialist.'],
      ['How do I find out the price?', 'Prices are not listed on the page. They depend on the service, the area and the details, and are given on WhatsApp. Just tell us what you need.'],
      ['Can someone come to my home?', 'Yes, a specialist can come to your home anywhere in Antalya. The conditions and the fee are clarified on WhatsApp.'],
      ['I am staying at a hotel. What should I do?', 'You can go to a partner salon yourself from your hotel. We choose the salon that suits your area together on WhatsApp.'],
      ['Who provides the service?', 'The service is provided through partner salons and specialists in your area. Can Beauty Studio directs you to the right salon; salon names are not shown on the page.'],
      ['What are your opening hours?', 'You can reach us on WhatsApp and by phone every day from 08:00 to 24:00.'],
    ],
    cta: 'Get a price (WhatsApp)', ctaMsg: 'Hello, I would like a price for a beauty service in Antalya.', call: 'Call', priceNote: 'Prices depend on the service, the area and the details, and are given on WhatsApp.', langH: 'Other languages',
    svcName: 'Beauty services (hair, nails, makeup, bridal, skin care, waxing)', svcDesc: 'Beauty services at partner salons in Antalya or at your home; booking and prices on WhatsApp.',
  },
  // ───────────────────────────── DE ─────────────────────────────
  de: {
    title: 'Schönheitssalon Antalya | Haare, Nägel, Make-up | Can Beauty Studio',
    desc: 'Friseur, Nagelpflege, Make-up, Brautstyling, Gesichtspflege und Waxing in Antalya über Partnersalons oder bei Ihnen zu Hause. Anfrage senden, Preis per WhatsApp erhalten.',
    h1: 'Schönheitssalon in Antalya: Haare, Nägel, Make-up und Pflege für Urlauber',
    lead: 'Kurz gesagt: Schreiben Sie uns per WhatsApp an +90 531 510 44 58, welche Behandlung Sie möchten und in welchem Gebiet Sie sind. Wir verweisen Sie an einen passenden Partnersalon in Antalya. Auf Wunsch kommt eine Fachkraft zu Ihnen nach Hause. Der Preis richtet sich nach Behandlung, Gebiet und Aufwand und wird per WhatsApp genannt. Täglich 08:00–24:00.',
    crumb: 'Schönheitssalon',
    keywords: ['schönheitssalon antalya', 'friseur antalya urlaub', 'maniküre pediküre antalya', 'brautstyling antalya', 'kosmetik zu hause antalya', 'Can Beauty Studio'],
    transparency: 'Die Leistung wird über Partnersalons und Fachkräfte in Ihrer Region erbracht.',
    hours: 'Täglich 08:00–24:00',
    stepsH: 'So läuft die Buchung',
    steps: [
      'Füllen Sie das Anfrageformular aus oder schreiben Sie per WhatsApp: welche Leistung, welches Gebiet, welcher Tag.',
      'Wir nennen Ihnen den Preis und verweisen Sie an einen passenden Partnersalon oder eine Fachkraft in Ihrer Nähe.',
      'Tag und Uhrzeit werden per WhatsApp bestätigt.',
      'Sie gehen in den Salon, oder die Fachkraft kommt zu Ihnen nach Hause.',
    ],
    svcH: 'Leistungen',
    svcIntro: 'Wählen Sie eine Leistung und fragen Sie per WhatsApp nach. Steht Ihr Wunsch nicht in der Liste, schreiben Sie uns trotzdem.',
    svc: {
      hair: { name: 'Haare', text: 'Schneiden, Färben, Föhnen und Haarpflege.' },
      nails: { name: 'Nägel', text: 'Maniküre, Pediküre, Gelnägel und Nagelmodellage.' },
      brows: { name: 'Augenbrauen und Wimpern', text: 'Brauen formen und Wimpernpflege.' },
      makeup: { name: 'Make-up', text: 'Tages-, Party- und Abend-Make-up.' },
      bridal: { name: 'Brautfrisur und Braut-Make-up', text: 'Vorbereitung für die Braut; Termin und Wünsche besprechen wir per WhatsApp.' },
      skin: { name: 'Gesichtspflege', text: 'Reinigung und Pflegebehandlungen.' },
      wax: { name: 'Waxing', text: 'Waxing für Körper und Gesicht.' },
    },
    ask: 'Per WhatsApp fragen',
    askMsg: 'Guten Tag, ich möchte Informationen und einen Preis für {s} in Antalya.',
    placeH: 'Zu Hause oder im Salon?',
    place: [
      'In ganz Antalya kann eine Fachkraft zu Ihnen nach Hause kommen. Bedingungen und Preis für den Hausbesuch werden per WhatsApp geklärt.',
      'Oder Sie fahren von Ihrem Hotel oder Ihrer Unterkunft selbst zu einem Partnersalon. Den passenden Salon wählen wir per WhatsApp gemeinsam aus; die Salondaten erhalten Sie bei der Buchung.',
    ],
    formH: 'Schnelles Anfrageformular',
    form: {
      services: 'Leistung (Mehrfachauswahl möglich)', area: 'Gebiet', areaPick: 'Gebiet wählen', areaOther: 'Andere (schreibe ich per WhatsApp)',
      mode: 'Wo?', home: 'Bei mir', salon: 'Im Partnersalon', date: 'Datum', time: 'Uhrzeit', people: 'Personen', note: 'Hinweis', notePh: 'Ihre Wünsche, oder dass Sie ein Foto senden',
      send: 'Per WhatsApp senden', hint: 'WhatsApp öffnet sich mit fertiger Nachricht; Sie können sie vor dem Senden ändern.',
      msgHello: 'Guten Tag, Anfrage an Can Beauty Studio:', msgService: 'Leistung', msgArea: 'Gebiet', msgMode: 'Wo', msgDate: 'Datum', msgTime: 'Uhrzeit', msgPeople: 'Personen', msgNote: 'Hinweis',
    },
    faqTitle: 'Häufige Fragen',
    faq: [
      ['Wie buche ich?', 'Füllen Sie das Formular aus oder schreiben Sie an +90 531 510 44 58 per WhatsApp: Leistung, Gebiet und Wunschtag. Wir nennen den Preis und verweisen Sie an einen passenden Partnersalon oder eine Fachkraft.'],
      ['Wie erfahre ich den Preis?', 'Preise stehen nicht auf der Seite. Sie hängen von Leistung, Gebiet und Aufwand ab und werden per WhatsApp genannt. Schreiben Sie einfach, was Sie brauchen.'],
      ['Kann jemand zu mir nach Hause kommen?', 'Ja, in ganz Antalya kann eine Fachkraft zu Ihnen kommen. Bedingungen und Preis werden per WhatsApp geklärt.'],
      ['Ich wohne im Hotel. Was tun?', 'Sie können von Ihrem Hotel selbst zu einem Partnersalon fahren. Den passenden Salon für Ihr Gebiet wählen wir per WhatsApp gemeinsam.'],
      ['Wer erbringt die Leistung?', 'Die Leistung wird über Partnersalons und Fachkräfte in Ihrer Region erbracht. Can Beauty Studio verweist Sie an den passenden Salon; Salonnamen werden auf der Seite nicht genannt.'],
      ['Wann sind Sie erreichbar?', 'Per WhatsApp und Telefon täglich von 08:00 bis 24:00 Uhr.'],
    ],
    cta: 'Preis anfragen (WhatsApp)', ctaMsg: 'Guten Tag, ich möchte einen Preis für eine Schönheitsbehandlung in Antalya.', call: 'Anrufen', priceNote: 'Der Preis richtet sich nach Behandlung, Gebiet und Aufwand und wird per WhatsApp genannt.', langH: 'Andere Sprachen',
    svcName: 'Schönheitsleistungen (Haare, Nägel, Make-up, Braut, Gesichtspflege, Waxing)', svcDesc: 'Schönheitsleistungen in Partnersalons in Antalya oder bei Ihnen zu Hause; Buchung und Preis per WhatsApp.',
  },
  // ───────────────────────────── RU ─────────────────────────────
  ru: {
    title: 'Салон красоты в Анталье | Волосы, ногти, макияж | Can Beauty Studio',
    desc: 'Волосы, ногти, макияж, образ невесты, уход за кожей и шугаринг в Анталье: салоны-партнёры или мастер на дому. Отправьте заявку и узнайте цену в WhatsApp.',
    h1: 'Салон красоты в Анталье: волосы, ногти, макияж и уход для отдыхающих',
    lead: 'Коротко: напишите в WhatsApp на +90 531 510 44 58, какая услуга нужна и в каком районе вы находитесь, и мы направим вас в подходящий салон-партнёр в Анталье. По желанию мастер приедет к вам домой. Цена зависит от услуги, района и деталей и называется в WhatsApp. Ежедневно 08:00–24:00.',
    crumb: 'Салон красоты',
    keywords: ['салон красоты анталья', 'парикмахер анталья', 'маникюр педикюр анталья', 'свадебная причёска макияж анталья', 'мастер на дом анталья', 'Can Beauty Studio'],
    transparency: 'Услуги оказываются через салоны-партнёры и мастеров в вашем районе.',
    hours: 'Ежедневно 08:00–24:00',
    stepsH: 'Как записаться',
    steps: [
      'Заполните форму заявки ниже или напишите в WhatsApp: какая услуга, какой район, какой день.',
      'Мы назовём цену и направим вас в подходящий салон-партнёр или к мастеру в вашем районе.',
      'День и время уточняются в WhatsApp.',
      'Вы приезжаете в салон, или мастер приезжает к вам домой.',
    ],
    svcH: 'Услуги',
    svcIntro: 'Выберите услугу и спросите о ней в WhatsApp. Если нужной услуги нет в списке, всё равно напишите нам.',
    svc: {
      hair: { name: 'Волосы', text: 'Стрижка, окрашивание, укладка и уход за волосами.' },
      nails: { name: 'Ногти', text: 'Маникюр, педикюр, гель-лак и наращивание ногтей.' },
      brows: { name: 'Брови и ресницы', text: 'Оформление бровей и уход за ресницами.' },
      makeup: { name: 'Макияж', text: 'Дневной, вечерний и праздничный макияж.' },
      bridal: { name: 'Причёска и макияж невесты', text: 'Образ невесты; дату и пожелания обсуждаем в WhatsApp.' },
      skin: { name: 'Уход за кожей', text: 'Очищение и уходовые процедуры.' },
      wax: { name: 'Шугаринг и воск', text: 'Депиляция тела и лица.' },
    },
    ask: 'Спросить в WhatsApp',
    askMsg: 'Здравствуйте, хочу узнать об услуге «{s}» в Анталье и её цене.',
    placeH: 'Дома или в салоне?',
    place: [
      'По всей Анталье мастер может приехать к вам домой. Условия и стоимость выезда уточняются в WhatsApp.',
      'Или вы сами приезжаете из отеля или дома в салон-партнёр. Подходящий салон мы выбираем вместе в WhatsApp; данные салона сообщаются при записи.',
    ],
    formH: 'Быстрая заявка',
    form: {
      services: 'Услуга (можно выбрать несколько)', area: 'Район', areaPick: 'Выберите район', areaOther: 'Другой (напишу в WhatsApp)',
      mode: 'Где?', home: 'У меня дома', salon: 'В салоне-партнёре', date: 'Дата', time: 'Время', people: 'Количество человек', note: 'Комментарий', notePh: 'Пожелания или что пришлёте фото',
      send: 'Отправить в WhatsApp', hint: 'Откроется WhatsApp с готовым сообщением; перед отправкой его можно изменить.',
      msgHello: 'Здравствуйте, заявка в Can Beauty Studio:', msgService: 'Услуга', msgArea: 'Район', msgMode: 'Где', msgDate: 'Дата', msgTime: 'Время', msgPeople: 'Человек', msgNote: 'Комментарий',
    },
    faqTitle: 'Частые вопросы',
    faq: [
      ['Как записаться?', 'Заполните форму или напишите в WhatsApp на +90 531 510 44 58: услуга, район и желаемый день. Мы назовём цену и направим вас в подходящий салон-партнёр или к мастеру.'],
      ['Как узнать цену?', 'Цены на странице не указаны. Они зависят от услуги, района и деталей и называются в WhatsApp. Просто напишите, что вам нужно.'],
      ['Может ли мастер приехать ко мне домой?', 'Да, по всей Анталье мастер может приехать к вам. Условия и стоимость уточняются в WhatsApp.'],
      ['Я живу в отеле. Что делать?', 'Вы можете сами приехать из отеля в салон-партнёр. Подходящий салон для вашего района мы выбираем вместе в WhatsApp.'],
      ['Кто оказывает услугу?', 'Услуги оказываются через салоны-партнёры и мастеров в вашем районе. Can Beauty Studio направляет вас в нужный салон; названия салонов на странице не указываются.'],
      ['Когда вы на связи?', 'В WhatsApp и по телефону — ежедневно с 08:00 до 24:00.'],
    ],
    cta: 'Узнать цену (WhatsApp)', ctaMsg: 'Здравствуйте, хочу узнать цену на услугу салона красоты в Анталье.', call: 'Позвонить', priceNote: 'Цена зависит от услуги, района и деталей и называется в WhatsApp.', langH: 'Другие языки',
    svcName: 'Услуги красоты (волосы, ногти, макияж, образ невесты, уход за кожей, депиляция)', svcDesc: 'Услуги красоты в салонах-партнёрах Антальи или на дому; запись и цены в WhatsApp.',
  },
  // ───────────────────────────── ES ─────────────────────────────
  es: {
    title: 'Salón de belleza en Antalya | Pelo, uñas, maquillaje | Can Beauty Studio',
    desc: 'Pelo, uñas, maquillaje, peinado de novia, cuidado facial y depilación con cera en Antalya, en salones asociados o en tu alojamiento. Envía la solicitud y recibe el precio por WhatsApp.',
    h1: 'Salón de belleza en Antalya: pelo, uñas, maquillaje y cuidado para visitantes',
    lead: 'En breve: escribe por WhatsApp al +90 531 510 44 58 qué servicio quieres y en qué zona estás, y te dirigimos a un salón asociado adecuado en Antalya. Si lo prefieres, una profesional va a tu casa. El precio depende del servicio, la zona y los detalles, y se indica por WhatsApp. Todos los días de 08:00 a 24:00.',
    crumb: 'Salón de belleza',
    keywords: ['salón de belleza antalya', 'peluquería antalya turistas', 'manicura pedicura antalya', 'peinado y maquillaje de novia antalya', 'belleza a domicilio antalya', 'Can Beauty Studio'],
    transparency: 'El servicio se presta a través de salones asociados y profesionales de tu zona.',
    hours: 'Todos los días de 08:00 a 24:00',
    stepsH: 'Cómo reservar',
    steps: [
      'Rellena el formulario de abajo o escríbenos por WhatsApp: qué servicio, qué zona y qué día.',
      'Te decimos el precio y te dirigimos a un salón asociado o a una profesional de tu zona.',
      'El día y la hora se confirman por WhatsApp.',
      'Vas al salón, o la profesional va a tu casa.',
    ],
    svcH: 'Servicios',
    svcIntro: 'Elige un servicio y pregunta por WhatsApp. Si lo que buscas no está en la lista, escríbenos igualmente.',
    svc: {
      hair: { name: 'Pelo', text: 'Corte, color, secado y cuidado capilar.' },
      nails: { name: 'Uñas', text: 'Manicura, pedicura, esmalte semipermanente y uñas acrílicas.' },
      brows: { name: 'Cejas y pestañas', text: 'Diseño de cejas y cuidado de pestañas.' },
      makeup: { name: 'Maquillaje', text: 'Maquillaje de día, de fiesta y de noche.' },
      bridal: { name: 'Peinado y maquillaje de novia', text: 'Preparación de la novia; fecha y deseos se hablan por WhatsApp.' },
      skin: { name: 'Cuidado facial', text: 'Limpieza y tratamientos de cuidado.' },
      wax: { name: 'Depilación con cera', text: 'Depilación de cuerpo y rostro.' },
    },
    ask: 'Preguntar por WhatsApp',
    askMsg: 'Hola, quisiera información y el precio de {s} en Antalya.',
    placeH: '¿En casa o en el salón?',
    place: [
      'En toda Antalya una profesional puede ir a tu casa. Las condiciones y la tarifa del servicio a domicilio se aclaran por WhatsApp.',
      'O puedes ir tú misma o mismo al salón asociado desde tu hotel o tu casa. Elegimos juntos por WhatsApp el salón que te conviene; los datos del salón se comparten al reservar.',
    ],
    formH: 'Solicitud rápida',
    form: {
      services: 'Servicio (puedes elegir varios)', area: 'Zona', areaPick: 'Elige una zona', areaOther: 'Otra (la escribiré por WhatsApp)',
      mode: '¿Dónde?', home: 'En mi casa', salon: 'En un salón asociado', date: 'Fecha', time: 'Hora', people: 'Número de personas', note: 'Nota', notePh: 'Tus deseos, o si enviarás una foto',
      send: 'Enviar por WhatsApp', hint: 'Se abre WhatsApp con el mensaje listo; puedes editarlo antes de enviarlo.',
      msgHello: 'Hola, solicitud a Can Beauty Studio:', msgService: 'Servicio', msgArea: 'Zona', msgMode: 'Dónde', msgDate: 'Fecha', msgTime: 'Hora', msgPeople: 'Personas', msgNote: 'Nota',
    },
    faqTitle: 'Preguntas frecuentes',
    faq: [
      ['¿Cómo reservo?', 'Rellena el formulario o escribe por WhatsApp al +90 531 510 44 58 con el servicio, la zona y el día que quieres. Te decimos el precio y te dirigimos a un salón asociado o a una profesional.'],
      ['¿Cómo sé el precio?', 'Los precios no aparecen en la página. Dependen del servicio, la zona y los detalles, y se indican por WhatsApp. Cuéntanos qué necesitas.'],
      ['¿Pueden ir a mi casa?', 'Sí, en toda Antalya una profesional puede ir a tu casa. Las condiciones y la tarifa se aclaran por WhatsApp.'],
      ['Estoy en un hotel, ¿qué hago?', 'Puedes ir al salón asociado por tu cuenta desde el hotel. Elegimos juntos por WhatsApp el salón adecuado para tu zona.'],
      ['¿Quién presta el servicio?', 'El servicio se presta a través de salones asociados y profesionales de tu zona. Can Beauty Studio te dirige al salón adecuado; los nombres de los salones no se muestran en la página.'],
      ['¿Cuál es el horario?', 'Puedes escribirnos por WhatsApp o llamar todos los días de 08:00 a 24:00.'],
    ],
    cta: 'Pedir precio (WhatsApp)', ctaMsg: 'Hola, quisiera el precio de un servicio de belleza en Antalya.', call: 'Llamar', priceNote: 'El precio depende del servicio, la zona y los detalles, y se indica por WhatsApp.', langH: 'Otros idiomas',
    svcName: 'Servicios de belleza (pelo, uñas, maquillaje, novia, cuidado facial, cera)', svcDesc: 'Servicios de belleza en salones asociados de Antalya o a domicilio; reserva y precios por WhatsApp.',
  },
  // ───────────────────────────── FR ─────────────────────────────
  fr: {
    title: 'Salon de beauté à Antalya | Cheveux, ongles, maquillage | Can Beauty Studio',
    desc: "Coiffure, ongles, maquillage, coiffure de mariée, soin du visage et épilation à la cire à Antalya, dans des salons partenaires ou chez vous. Envoyez la demande, recevez le prix sur WhatsApp.",
    h1: 'Salon de beauté à Antalya : cheveux, ongles, maquillage et soins pour les visiteurs',
    lead: "En bref : écrivez sur WhatsApp au +90 531 510 44 58 le service souhaité et votre secteur, et nous vous orientons vers un salon partenaire adapté à Antalya. Si vous préférez, une spécialiste vient chez vous. Le prix dépend du service, du secteur et des détails, et il est communiqué sur WhatsApp. Tous les jours de 08h00 à 24h00.",
    crumb: 'Salon de beauté',
    keywords: ['salon de beauté antalya', 'coiffeur antalya vacances', 'manucure pédicure antalya', 'coiffure maquillage mariée antalya', 'beauté à domicile antalya', 'Can Beauty Studio'],
    transparency: 'Le service est assuré par des salons partenaires et des spécialistes de votre secteur.',
    hours: 'Tous les jours de 08h00 à 24h00',
    stepsH: 'Comment réserver',
    steps: [
      'Remplissez le formulaire ci-dessous ou écrivez sur WhatsApp : quel service, quel secteur, quel jour.',
      'Nous vous indiquons le prix et vous orientons vers un salon partenaire ou une spécialiste de votre secteur.',
      "Le jour et l'heure sont confirmés sur WhatsApp.",
      'Vous allez au salon, ou la spécialiste vient chez vous.',
    ],
    svcH: 'Services',
    svcIntro: "Choisissez un service et posez votre question sur WhatsApp. Si votre demande n'est pas dans la liste, écrivez-nous quand même.",
    svc: {
      hair: { name: 'Cheveux', text: 'Coupe, couleur, brushing et soins capillaires.' },
      nails: { name: 'Ongles', text: 'Manucure, pédicure, vernis semi-permanent et pose de faux ongles.' },
      brows: { name: 'Sourcils et cils', text: 'Restructuration des sourcils et soin des cils.' },
      makeup: { name: 'Maquillage', text: 'Maquillage de jour, de soirée et de fête.' },
      bridal: { name: 'Coiffure et maquillage de mariée', text: 'Préparation de la mariée ; la date et vos souhaits se discutent sur WhatsApp.' },
      skin: { name: 'Soin du visage', text: 'Nettoyage et soins.' },
      wax: { name: 'Épilation à la cire', text: 'Épilation du corps et du visage.' },
    },
    ask: 'Demander sur WhatsApp',
    askMsg: "Bonjour, je souhaite des informations et le prix pour « {s} » à Antalya.",
    placeH: 'À domicile ou au salon ?',
    place: [
      "Dans tout Antalya, une spécialiste peut venir chez vous. Les conditions et le tarif du déplacement sont précisés sur WhatsApp.",
      "Ou bien vous allez vous-même au salon partenaire depuis votre hôtel ou votre domicile. Nous choisissons ensemble sur WhatsApp le salon qui vous convient ; ses coordonnées sont communiquées lors de la réservation.",
    ],
    formH: 'Demande rapide',
    form: {
      services: 'Service (plusieurs choix possibles)', area: 'Secteur', areaPick: 'Choisissez un secteur', areaOther: "Autre (je l'écrirai sur WhatsApp)",
      mode: 'Où ?', home: 'Chez moi', salon: 'Dans un salon partenaire', date: 'Date', time: 'Heure', people: 'Nombre de personnes', note: 'Remarque', notePh: 'Vos souhaits, ou précisez que vous enverrez une photo',
      send: 'Envoyer sur WhatsApp', hint: 'WhatsApp s’ouvre avec le message prêt ; vous pouvez le modifier avant l’envoi.',
      msgHello: 'Bonjour, demande à Can Beauty Studio :', msgService: 'Service', msgArea: 'Secteur', msgMode: 'Où', msgDate: 'Date', msgTime: 'Heure', msgPeople: 'Personnes', msgNote: 'Remarque',
    },
    faqTitle: 'Questions fréquentes',
    faq: [
      ['Comment réserver ?', "Remplissez le formulaire ou écrivez sur WhatsApp au +90 531 510 44 58 avec le service, le secteur et le jour souhaité. Nous vous indiquons le prix et vous orientons vers un salon partenaire ou une spécialiste."],
      ['Comment connaître le prix ?', "Les prix ne figurent pas sur la page. Ils dépendent du service, du secteur et des détails, et sont communiqués sur WhatsApp. Dites-nous simplement ce dont vous avez besoin."],
      ['Peut-on venir chez moi ?', "Oui, dans tout Antalya une spécialiste peut venir chez vous. Les conditions et le tarif sont précisés sur WhatsApp."],
      ["Je loge à l'hôtel, que faire ?", "Vous pouvez aller vous-même au salon partenaire depuis votre hôtel. Nous choisissons ensemble sur WhatsApp le salon adapté à votre secteur."],
      ['Qui assure le service ?', "Le service est assuré par des salons partenaires et des spécialistes de votre secteur. Can Beauty Studio vous oriente vers le bon salon ; les noms des salons ne sont pas affichés sur la page."],
      ["Quels sont vos horaires ?", "Vous pouvez nous joindre sur WhatsApp et par téléphone tous les jours de 08h00 à 24h00."],
    ],
    cta: 'Demander le prix (WhatsApp)', ctaMsg: 'Bonjour, je souhaite connaître le prix d’un service de beauté à Antalya.', call: 'Appeler', priceNote: 'Le prix dépend du service, du secteur et des détails, et il est communiqué sur WhatsApp.', langH: 'Autres langues',
    svcName: 'Services de beauté (cheveux, ongles, maquillage, mariée, soin du visage, épilation)', svcDesc: 'Services de beauté dans des salons partenaires à Antalya ou à domicile ; réservation et prix sur WhatsApp.',
  },
  // ───────────────────────────── PL ─────────────────────────────
  pl: {
    title: 'Salon urody w Antalyi | Włosy, paznokcie, makijaż | Can Beauty Studio',
    desc: 'Włosy, paznokcie, makijaż, stylizacja ślubna, pielęgnacja twarzy i depilacja woskiem w Antalyi: salony partnerskie lub wizyta u Ciebie. Wyślij zgłoszenie i poznaj cenę na WhatsAppie.',
    h1: 'Salon urody w Antalyi: włosy, paznokcie, makijaż i pielęgnacja dla turystów',
    lead: 'Krótko: napisz na WhatsAppie pod numer +90 531 510 44 58, jakiej usługi potrzebujesz i w jakiej okolicy jesteś, a skierujemy Cię do odpowiedniego salonu partnerskiego w Antalyi. Na życzenie specjalistka przyjedzie do Ciebie. Cena zależy od usługi, okolicy i szczegółów i podawana jest na WhatsAppie. Codziennie 08:00–24:00.',
    crumb: 'Salon urody',
    keywords: ['salon urody antalya', 'fryzjer antalya wakacje', 'manicure pedicure antalya', 'fryzura i makijaż ślubny antalya', 'kosmetyczka z dojazdem antalya', 'Can Beauty Studio'],
    transparency: 'Usługa jest świadczona przez salony partnerskie i specjalistów w Twojej okolicy.',
    hours: 'Codziennie 08:00–24:00',
    stepsH: 'Jak umówić wizytę',
    steps: [
      'Wypełnij formularz poniżej lub napisz na WhatsAppie: jaka usługa, jaka okolica, który dzień.',
      'Podamy cenę i skierujemy Cię do odpowiedniego salonu partnerskiego lub specjalistki w Twojej okolicy.',
      'Dzień i godzinę potwierdzamy na WhatsAppie.',
      'Idziesz do salonu albo specjalistka przyjeżdża do Ciebie.',
    ],
    svcH: 'Usługi',
    svcIntro: 'Wybierz usługę i zapytaj o nią na WhatsAppie. Jeśli Twojej potrzeby nie ma na liście, i tak do nas napisz.',
    svc: {
      hair: { name: 'Włosy', text: 'Strzyżenie, koloryzacja, układanie i pielęgnacja włosów.' },
      nails: { name: 'Paznokcie', text: 'Manicure, pedicure, lakier hybrydowy i przedłużanie paznokci.' },
      brows: { name: 'Brwi i rzęsy', text: 'Stylizacja brwi i pielęgnacja rzęs.' },
      makeup: { name: 'Makijaż', text: 'Makijaż dzienny, wieczorowy i na przyjęcie.' },
      bridal: { name: 'Fryzura i makijaż ślubny', text: 'Przygotowanie panny młodej; termin i życzenia omawiamy na WhatsAppie.' },
      skin: { name: 'Pielęgnacja twarzy', text: 'Oczyszczanie i zabiegi pielęgnacyjne.' },
      wax: { name: 'Depilacja woskiem', text: 'Depilacja ciała i twarzy.' },
    },
    ask: 'Zapytaj na WhatsAppie',
    askMsg: 'Dzień dobry, chciałabym/chciałbym poznać informacje i cenę usługi „{s}” w Antalyi.',
    placeH: 'W domu czy w salonie?',
    place: [
      'W całej Antalyi specjalistka może przyjechać do Ciebie. Warunki i opłata za dojazd są ustalane na WhatsAppie.',
      'Możesz też sama lub sam dojechać z hotelu albo domu do salonu partnerskiego. Odpowiedni salon wybieramy razem na WhatsAppie; dane salonu podajemy przy rezerwacji.',
    ],
    formH: 'Szybki formularz zgłoszeniowy',
    form: {
      services: 'Usługa (możesz wybrać kilka)', area: 'Okolica', areaPick: 'Wybierz okolicę', areaOther: 'Inna (napiszę na WhatsAppie)',
      mode: 'Gdzie?', home: 'U mnie', salon: 'W salonie partnerskim', date: 'Data', time: 'Godzina', people: 'Liczba osób', note: 'Uwagi', notePh: 'Twoje życzenia lub informacja, że wyślesz zdjęcie',
      send: 'Wyślij na WhatsAppie', hint: 'Otworzy się WhatsApp z gotową wiadomością; przed wysłaniem możesz ją zmienić.',
      msgHello: 'Dzień dobry, zgłoszenie do Can Beauty Studio:', msgService: 'Usługa', msgArea: 'Okolica', msgMode: 'Gdzie', msgDate: 'Data', msgTime: 'Godzina', msgPeople: 'Osoby', msgNote: 'Uwagi',
    },
    faqTitle: 'Najczęstsze pytania',
    faq: [
      ['Jak się umówić?', 'Wypełnij formularz lub napisz na WhatsAppie pod numer +90 531 510 44 58: usługa, okolica i dzień. Podamy cenę i skierujemy Cię do salonu partnerskiego lub specjalistki.'],
      ['Jak poznać cenę?', 'Cen nie ma na stronie. Zależą od usługi, okolicy i szczegółów i są podawane na WhatsAppie. Napisz, czego potrzebujesz.'],
      ['Czy ktoś przyjedzie do mnie?', 'Tak, w całej Antalyi specjalistka może przyjechać do Ciebie. Warunki i opłata są ustalane na WhatsAppie.'],
      ['Mieszkam w hotelu. Co zrobić?', 'Możesz sama lub sam pojechać z hotelu do salonu partnerskiego. Salon odpowiedni dla Twojej okolicy wybieramy razem na WhatsAppie.'],
      ['Kto świadczy usługę?', 'Usługa jest świadczona przez salony partnerskie i specjalistów w Twojej okolicy. Can Beauty Studio kieruje Cię do właściwego salonu; nazw salonów nie podajemy na stronie.'],
      ['Jakie są godziny pracy?', 'Jesteśmy dostępni na WhatsAppie i telefonicznie codziennie od 08:00 do 24:00.'],
    ],
    cta: 'Zapytaj o cenę (WhatsApp)', ctaMsg: 'Dzień dobry, chciałabym/chciałbym poznać cenę usługi kosmetycznej w Antalyi.', call: 'Zadzwoń', priceNote: 'Cena zależy od usługi, okolicy i szczegółów i jest podawana na WhatsAppie.', langH: 'Inne języki',
    svcName: 'Usługi urody (włosy, paznokcie, makijaż, ślub, pielęgnacja twarzy, depilacja)', svcDesc: 'Usługi urody w salonach partnerskich w Antalyi lub u Ciebie; rezerwacja i ceny na WhatsAppie.',
  },
  // ───────────────────────────── UK ─────────────────────────────
  uk: {
    title: 'Салон краси в Анталії | Волосся, нігті, макіяж | Can Beauty Studio',
    desc: 'Волосся, нігті, макіяж, образ нареченої, догляд за шкірою та шугаринг в Анталії: салони-партнери або майстер вдома. Надішліть заявку й дізнайтеся ціну у WhatsApp.',
    h1: 'Салон краси в Анталії: волосся, нігті, макіяж та догляд для відпочивальників',
    lead: 'Коротко: напишіть у WhatsApp на +90 531 510 44 58, яка послуга потрібна і в якому районі ви перебуваєте, і ми скеруємо вас до відповідного салону-партнера в Анталії. За бажання майстер приїде до вас додому. Ціна залежить від послуги, району та деталей і повідомляється у WhatsApp. Щодня 08:00–24:00.',
    crumb: 'Салон краси',
    keywords: ['салон краси анталія', 'перукар анталія', 'манікюр педикюр анталія', 'весільна зачіска макіяж анталія', 'майстер додому анталія', 'Can Beauty Studio'],
    transparency: 'Послуги надаються через салони-партнери та майстрів у вашому районі.',
    hours: 'Щодня 08:00–24:00',
    stepsH: 'Як записатися',
    steps: [
      'Заповніть форму заявки нижче або напишіть у WhatsApp: яка послуга, який район, який день.',
      'Ми повідомимо ціну й скеруємо вас до відповідного салону-партнера або майстра у вашому районі.',
      'День і час уточнюються у WhatsApp.',
      'Ви приїжджаєте до салону, або майстер приїжджає до вас додому.',
    ],
    svcH: 'Послуги',
    svcIntro: 'Оберіть послугу й запитайте про неї у WhatsApp. Якщо потрібної послуги немає в списку, усе одно напишіть нам.',
    svc: {
      hair: { name: 'Волосся', text: 'Стрижка, фарбування, укладання та догляд за волоссям.' },
      nails: { name: 'Нігті', text: 'Манікюр, педикюр, гель-лак і нарощування нігтів.' },
      brows: { name: 'Брови та вії', text: 'Оформлення брів і догляд за віями.' },
      makeup: { name: 'Макіяж', text: 'Денний, вечірній та святковий макіяж.' },
      bridal: { name: 'Зачіска та макіяж нареченої', text: 'Образ нареченої; дату й побажання обговорюємо у WhatsApp.' },
      skin: { name: 'Догляд за шкірою', text: 'Очищення та доглядові процедури.' },
      wax: { name: 'Шугаринг і віск', text: 'Депіляція тіла та обличчя.' },
    },
    ask: 'Запитати у WhatsApp',
    askMsg: 'Доброго дня, хочу дізнатися про послугу «{s}» в Анталії та її ціну.',
    placeH: 'Удома чи в салоні?',
    place: [
      'По всій Анталії майстер може приїхати до вас додому. Умови та вартість виїзду уточнюються у WhatsApp.',
      'Або ви самі їдете з готелю чи з дому до салону-партнера. Відповідний салон ми обираємо разом у WhatsApp; дані салону повідомляємо під час запису.',
    ],
    formH: 'Швидка заявка',
    form: {
      services: 'Послуга (можна обрати кілька)', area: 'Район', areaPick: 'Оберіть район', areaOther: 'Інший (напишу у WhatsApp)',
      mode: 'Де?', home: 'Удома у мене', salon: 'У салоні-партнері', date: 'Дата', time: 'Час', people: 'Кількість осіб', note: 'Коментар', notePh: 'Побажання або що надішлете фото',
      send: 'Надіслати у WhatsApp', hint: 'Відкриється WhatsApp із готовим повідомленням; перед надсиланням його можна змінити.',
      msgHello: 'Доброго дня, заявка до Can Beauty Studio:', msgService: 'Послуга', msgArea: 'Район', msgMode: 'Де', msgDate: 'Дата', msgTime: 'Час', msgPeople: 'Осіб', msgNote: 'Коментар',
    },
    faqTitle: 'Часті запитання',
    faq: [
      ['Як записатися?', 'Заповніть форму або напишіть у WhatsApp на +90 531 510 44 58: послуга, район і бажаний день. Ми повідомимо ціну й скеруємо вас до салону-партнера або майстра.'],
      ['Як дізнатися ціну?', 'Цін на сторінці немає. Вони залежать від послуги, району та деталей і повідомляються у WhatsApp. Просто напишіть, що вам потрібно.'],
      ['Чи може майстер приїхати до мене додому?', 'Так, по всій Анталії майстер може приїхати до вас. Умови та вартість уточнюються у WhatsApp.'],
      ['Я живу в готелі. Що робити?', 'Ви можете самі приїхати з готелю до салону-партнера. Салон для вашого району ми обираємо разом у WhatsApp.'],
      ['Хто надає послугу?', 'Послуги надаються через салони-партнери та майстрів у вашому районі. Can Beauty Studio скеровує вас до потрібного салону; назви салонів на сторінці не вказуються.'],
      ['Коли ви на зв’язку?', 'У WhatsApp і телефоном — щодня з 08:00 до 24:00.'],
    ],
    cta: 'Дізнатися ціну (WhatsApp)', ctaMsg: 'Доброго дня, хочу дізнатися ціну на послугу салону краси в Анталії.', call: 'Подзвонити', priceNote: 'Ціна залежить від послуги, району та деталей і повідомляється у WhatsApp.', langH: 'Інші мови',
    svcName: 'Послуги краси (волосся, нігті, макіяж, образ нареченої, догляд за шкірою, депіляція)', svcDesc: 'Послуги краси в салонах-партнерах Анталії або вдома; запис і ціни у WhatsApp.',
  },
  // ───────────────────────────── NL ─────────────────────────────
  nl: {
    title: 'Schoonheidssalon in Antalya | Haar, nagels, make-up | Can Beauty Studio',
    desc: 'Haar, nagels, make-up, bruidskapsel, gezichtsverzorging en waxen in Antalya via partnersalons of bij u thuis. Stuur het aanvraagformulier en ontvang de prijs via WhatsApp.',
    h1: 'Schoonheidssalon in Antalya: haar, nagels, make-up en verzorging voor bezoekers',
    lead: 'Kort gezegd: stuur via WhatsApp naar +90 531 510 44 58 welke behandeling u wilt en in welk gebied u bent, dan verwijzen wij u naar een passende partnersalon in Antalya. Desgewenst komt een specialiste bij u thuis. De prijs hangt af van de behandeling, het gebied en de details en wordt via WhatsApp genoemd. Elke dag 08:00–24:00.',
    crumb: 'Schoonheidssalon',
    keywords: ['schoonheidssalon antalya', 'kapper antalya vakantie', 'manicure pedicure antalya', 'bruidskapsel make-up antalya', 'schoonheidsspecialiste aan huis antalya', 'Can Beauty Studio'],
    transparency: 'De dienst wordt geleverd via partnersalons en specialisten in uw regio.',
    hours: 'Elke dag 08:00–24:00',
    stepsH: 'Zo werkt het boeken',
    steps: [
      'Vul het aanvraagformulier hieronder in of schrijf via WhatsApp: welke behandeling, welk gebied, welke dag.',
      'Wij noemen de prijs en verwijzen u naar een passende partnersalon of specialiste in uw regio.',
      'Dag en tijd worden via WhatsApp bevestigd.',
      'U gaat naar de salon, of de specialiste komt bij u thuis.',
    ],
    svcH: 'Behandelingen',
    svcIntro: 'Kies een behandeling en vraag ernaar via WhatsApp. Staat uw wens niet in de lijst, schrijf ons dan toch.',
    svc: {
      hair: { name: 'Haar', text: 'Knippen, kleuren, föhnen en haarverzorging.' },
      nails: { name: 'Nagels', text: 'Manicure, pedicure, gellak en nagelverlenging.' },
      brows: { name: 'Wenkbrauwen en wimpers', text: 'Wenkbrauwen vormen en wimperverzorging.' },
      makeup: { name: 'Make-up', text: 'Make-up voor overdag, feest en avond.' },
      bridal: { name: 'Bruidskapsel en bruidsmake-up', text: 'Voorbereiding van de bruid; datum en wensen bespreken we via WhatsApp.' },
      skin: { name: 'Gezichtsverzorging', text: 'Reiniging en verzorgende behandelingen.' },
      wax: { name: 'Waxen', text: 'Waxen van lichaam en gezicht.' },
    },
    ask: 'Vraag via WhatsApp',
    askMsg: 'Goedendag, ik wil graag informatie en de prijs voor {s} in Antalya.',
    placeH: 'Thuis of in de salon?',
    place: [
      'In heel Antalya kan een specialiste bij u thuis komen. De voorwaarden en de kosten voor de thuisbehandeling worden via WhatsApp duidelijk gemaakt.',
      'U kunt ook zelf vanuit uw hotel of woning naar een partnersalon gaan. De passende salon kiezen we samen via WhatsApp; de gegevens van de salon krijgt u bij het boeken.',
    ],
    formH: 'Snel aanvraagformulier',
    form: {
      services: 'Behandeling (meerdere mogelijk)', area: 'Gebied', areaPick: 'Kies een gebied', areaOther: 'Anders (ik schrijf het via WhatsApp)',
      mode: 'Waar?', home: 'Bij mij thuis', salon: 'In een partnersalon', date: 'Datum', time: 'Tijd', people: 'Aantal personen', note: 'Opmerking', notePh: 'Uw wensen, of dat u een foto stuurt',
      send: 'Verstuur via WhatsApp', hint: 'WhatsApp opent met het bericht al ingevuld; u kunt het vóór het versturen aanpassen.',
      msgHello: 'Goedendag, aanvraag voor Can Beauty Studio:', msgService: 'Behandeling', msgArea: 'Gebied', msgMode: 'Waar', msgDate: 'Datum', msgTime: 'Tijd', msgPeople: 'Personen', msgNote: 'Opmerking',
    },
    faqTitle: 'Veelgestelde vragen',
    faq: [
      ['Hoe boek ik?', 'Vul het formulier in of schrijf via WhatsApp naar +90 531 510 44 58 met de behandeling, het gebied en de gewenste dag. Wij noemen de prijs en verwijzen u naar een partnersalon of specialiste.'],
      ['Hoe weet ik de prijs?', 'Prijzen staan niet op de pagina. Ze hangen af van de behandeling, het gebied en de details en worden via WhatsApp genoemd. Vertel ons gewoon wat u nodig hebt.'],
      ['Kan iemand bij mij thuis komen?', 'Ja, in heel Antalya kan een specialiste bij u thuis komen. De voorwaarden en de kosten worden via WhatsApp duidelijk gemaakt.'],
      ['Ik verblijf in een hotel. Wat nu?', 'U kunt zelf vanuit uw hotel naar een partnersalon gaan. De passende salon voor uw gebied kiezen we samen via WhatsApp.'],
      ['Wie levert de dienst?', 'De dienst wordt geleverd via partnersalons en specialisten in uw regio. Can Beauty Studio verwijst u naar de juiste salon; namen van salons worden op de pagina niet getoond.'],
      ['Wat zijn de openingstijden?', 'U kunt ons elke dag van 08:00 tot 24:00 bereiken via WhatsApp en telefoon.'],
    ],
    cta: 'Prijs opvragen (WhatsApp)', ctaMsg: 'Goedendag, ik wil graag de prijs van een schoonheidsbehandeling in Antalya.', call: 'Bellen', priceNote: 'De prijs hangt af van de behandeling, het gebied en de details en wordt via WhatsApp genoemd.', langH: 'Andere talen',
    svcName: 'Schoonheidsbehandelingen (haar, nagels, make-up, bruid, gezichtsverzorging, waxen)', svcDesc: 'Schoonheidsbehandelingen in partnersalons in Antalya of bij u thuis; boeking en prijs via WhatsApp.',
  },
  // ───────────────────────────── AR ─────────────────────────────
  ar: {
    rtl: true,
    title: 'صالون تجميل في أنطاليا | شعر، أظافر، مكياج | Can Beauty Studio',
    desc: 'خدمات الشعر والأظافر والمكياج وتجهيز العروس والعناية بالبشرة وإزالة الشعر بالشمع في أنطاليا عبر صالونات شريكة أو في منزلك. أرسل الطلب واحصل على السعر عبر واتساب.',
    h1: 'صالون تجميل في أنطاليا: شعر وأظافر ومكياج وعناية للزوّار',
    lead: 'باختصار: اكتبوا لنا على واتساب على الرقم +90 531 510 44 58 الخدمة التي تريدونها والمنطقة التي تقيمون فيها، وسنوجّهكم إلى صالون شريك مناسب في أنطاليا. وإن رغبتم تأتي المختصة إلى منزلكم. يختلف السعر حسب الخدمة والمنطقة والتفاصيل ويُعطى عبر واتساب. يومياً من 08:00 إلى 24:00.',
    crumb: 'صالون تجميل',
    keywords: ['صالون تجميل أنطاليا', 'كوافير أنطاليا', 'مانيكير وباديكير أنطاليا', 'تجهيز العروس أنطاليا', 'خدمة تجميل في المنزل أنطاليا', 'Can Beauty Studio'],
    transparency: 'تُقدَّم الخدمة عبر الصالونات الشريكة والمختصين في منطقتكم.',
    hours: 'يومياً من 08:00 إلى 24:00',
    stepsH: 'كيف تحجزون',
    steps: [
      'املؤوا نموذج الطلب أدناه أو اكتبوا لنا على واتساب: أي خدمة، أي منطقة، أي يوم.',
      'نخبركم بالسعر ونوجّهكم إلى صالون شريك مناسب أو مختصة في منطقتكم.',
      'يُؤكَّد اليوم والوقت عبر واتساب.',
      'تذهبون إلى الصالون، أو تأتي المختصة إلى منزلكم.',
    ],
    svcH: 'الخدمات',
    svcIntro: 'اختاروا خدمة واسألوا عنها عبر واتساب. وإن لم تجدوا ما تحتاجونه في القائمة فراسلونا على أي حال.',
    svc: {
      hair: { name: 'الشعر', text: 'قص وصبغ وتسشوير وعناية بالشعر.' },
      nails: { name: 'الأظافر', text: 'مانيكير وباديكير وطلاء جل وتركيب أظافر.' },
      brows: { name: 'الحواجب والرموش', text: 'تشكيل الحواجب والعناية بالرموش.' },
      makeup: { name: 'المكياج', text: 'مكياج نهاري وسهرات ومناسبات.' },
      bridal: { name: 'تسريحة ومكياج العروس', text: 'تجهيز العروس؛ نتحدث عن الموعد والرغبات عبر واتساب.' },
      skin: { name: 'العناية بالبشرة', text: 'تنظيف وجلسات عناية.' },
      wax: { name: 'إزالة الشعر بالشمع', text: 'إزالة شعر الجسم والوجه.' },
    },
    ask: 'اسألوا عبر واتساب',
    askMsg: 'مرحباً، أريد معلومات وسعر خدمة «{s}» في أنطاليا.',
    placeH: 'في المنزل أم في الصالون؟',
    place: [
      'في كل مناطق أنطاليا يمكن أن تأتي المختصة إلى منزلكم. تُوضَّح شروط وتكلفة الزيارة المنزلية عبر واتساب.',
      'أو تذهبون بأنفسكم من الفندق أو من المنزل إلى صالون شريك. نختار معاً عبر واتساب الصالون الأنسب لمنطقتكم، وتُرسَل بيانات الصالون عند الحجز.',
    ],
    formH: 'نموذج طلب سريع',
    form: {
      services: 'الخدمة (يمكن اختيار أكثر من واحدة)', area: 'المنطقة', areaPick: 'اختاروا المنطقة', areaOther: 'أخرى (سأكتبها عبر واتساب)',
      mode: 'أين؟', home: 'في منزلي', salon: 'في صالون شريك', date: 'التاريخ', time: 'الوقت', people: 'عدد الأشخاص', note: 'ملاحظة', notePh: 'رغباتكم، أو أنكم سترسلون صورة',
      send: 'أرسلوا عبر واتساب', hint: 'يُفتح واتساب والرسالة جاهزة، ويمكنكم تعديلها قبل الإرسال.',
      msgHello: 'مرحباً، طلب إلى Can Beauty Studio:', msgService: 'الخدمة', msgArea: 'المنطقة', msgMode: 'المكان', msgDate: 'التاريخ', msgTime: 'الوقت', msgPeople: 'الأشخاص', msgNote: 'ملاحظة',
    },
    faqTitle: 'أسئلة شائعة',
    faq: [
      ['كيف أحجز؟', 'املؤوا النموذج أو اكتبوا على واتساب إلى +90 531 510 44 58 الخدمة والمنطقة واليوم المطلوب. نخبركم بالسعر ونوجّهكم إلى صالون شريك أو مختصة.'],
      ['كيف أعرف السعر؟', 'لا تُكتب الأسعار في الصفحة. تختلف حسب الخدمة والمنطقة والتفاصيل وتُعطى عبر واتساب. اكتبوا لنا ما تحتاجونه فقط.'],
      ['هل يمكن أن تأتي المختصة إلى منزلي؟', 'نعم، في كل مناطق أنطاليا يمكن أن تأتي المختصة إليكم. تُوضَّح الشروط والتكلفة عبر واتساب.'],
      ['أقيم في فندق، ماذا أفعل؟', 'يمكنكم الذهاب بأنفسكم من الفندق إلى صالون شريك. نختار معاً عبر واتساب الصالون الأنسب لمنطقتكم.'],
      ['من يقدّم الخدمة؟', 'تُقدَّم الخدمة عبر الصالونات الشريكة والمختصين في منطقتكم. يوجّهكم Can Beauty Studio إلى الصالون المناسب، ولا تُذكر أسماء الصالونات في الصفحة.'],
      ['ما ساعات العمل؟', 'يمكنكم التواصل معنا عبر واتساب والهاتف يومياً من 08:00 إلى 24:00.'],
    ],
    cta: 'اطلبوا السعر (واتساب)', ctaMsg: 'مرحباً، أريد معرفة سعر خدمة تجميل في أنطاليا.', call: 'اتصلوا', priceNote: 'يختلف السعر حسب الخدمة والمنطقة والتفاصيل ويُعطى عبر واتساب.', langH: 'لغات أخرى',
    svcName: 'خدمات التجميل (شعر، أظافر، مكياج، عروس، عناية بالبشرة، إزالة الشعر بالشمع)', svcDesc: 'خدمات تجميل في صالونات شريكة في أنطاليا أو في المنزل؛ الحجز والأسعار عبر واتساب.',
  },
};

/** WhatsApp bağlantısı (önceden doldurulmuş mesaj). */
export const gWa = (text: string) => `https://wa.me/${G_WA}?text=${encodeURIComponent(text)}`;
