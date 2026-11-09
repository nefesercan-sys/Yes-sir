// ============================================================
// swaphubs.com — lib/guzellik.ts
// "Can Beauty Studio" güzellik hizmeti sayfaları (10 dil, dil başına tek ana sayfa).
// Terzi sayfalarından tamamen ayrıdır: kendi veri dosyası, kendi @id'si, kendi sitemap'i.
//
// SAHİP BİLGİSİ (uydurma yok): Antalya'nın bölgelerindeki ANLAŞMALI SALONLAR (salon adı gösterilmez). EV/OTEL HİZMETİ KONUSUNDA 'VAR' DE 'YOK' DE YAZILMAZ (sahip kararı; talep WhatsApp'ta görülecek).
// Randevu WhatsApp'tan alınır; salon ve saat birlikte netleştirilir. Her gün 08:00–24:00; telefon ve WhatsApp +90 531 510 44 58;
// fiyat sayfada YOK (WhatsApp'tan verilir). Sağlık/tıbbi/estetik işlem, lazer, masaj, kalıcı makyaj YAZILMAZ.
// Adres/koordinat yok (kendi salonumuz iddiası yok). Puan/yorum/sertifika/garanti/süre/mesafe/ücretsiz servis iddiası yok.
// ============================================================

import { G_PREFIX as _G_PREFIX, G_SLUG as _G_SLUG } from './guzellik-slugs';

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

/** Tüm güzellik adresleri tek /guzellik/ öneki altındadır (dil klasörü yok; slug dile özgüdür). Tanım: lib/guzellik-slugs.ts */
export const G_PREFIX = _G_PREFIX;
export const G_SLUG: Record<GLang, string> = _G_SLUG;
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
  services: string; area: string; areaPick: string; areaOther: string;
  date: string; time: string; people: string; note: string; notePh: string; send: string; hint: string;
  msgHello: string; msgService: string; msgArea: string; msgDate: string; msgTime: string; msgPeople: string; msgNote: string;
};

export type GCopy = {
  title: string; desc: string; h1: string; lead: string; crumb: string; keywords: string[];
  transparency: string; hours: string;
  stepsH: string; steps: string[];
  svcH: string; svcIntro: string; svc: Record<SvcId, { name: string; text: string }>; ask: string; askMsg: string;
  placeH: string; place: string[];
  formH: string; form: FormCopy;
  faqTitle: string; faq: [string, string][];
  campaign: string; cta: string; ctaMsg: string; call: string; priceNote: string; langH: string;
  svcName: string; svcDesc: string; rtl?: boolean;
};

export const G: Record<GLang, GCopy> = {
  // ───────────────────────────── TR ─────────────────────────────
  tr: {
    title: 'Güzellik Merkezi Antalya | Saç, Tırnak, Makyaj | Can Beauty Studio',
    desc: "Antalya'da saç, tırnak, makyaj, gelin hazırlığı, cilt bakımı ve ağda için anlaşmalı salonlar. Talep formunu doldurun, salona yönlendirilin, fiyatı WhatsApp'tan alın.",
    h1: "Antalya'da Güzellik Merkezi: Saç, Tırnak, Makyaj ve Bakım",
    lead: "Kısa cevap: Almak istediğiniz hizmeti ve bölgenizi WhatsApp'tan +90 531 510 44 58 numarasına yazın; sizi Antalya'nın bölgelerindeki anlaşmalı salonlardan size en yakın olana yönlendirelim. Randevu WhatsApp'tan alınır; salon ve saat birlikte netleştirilir. Fiyat hizmete, bölgeye ve işin detayına göre WhatsApp'tan verilir. Her gün 08:00–24:00.",
    campaign: "Konakladığınız bölgedeki anlaşmalı salonlara yönlendirilirsiniz; hizmet bilgisi, size özel fiyat teklifi ve güncel kampanyalar WhatsApp'tan paylaşılır.",
    crumb: 'Güzellik merkezi',
    keywords: ['güzellik merkezi antalya', 'antalya kuaför', 'antalya manikür pedikür', 'antalya gelin saçı makyajı', 'turist güzellik merkezi antalya', 'Can Beauty Studio'],
    transparency: 'Hizmet, bölgedeki anlaşmalı salonlar ve uzmanlar aracılığıyla verilir.',
    hours: 'Her gün 08:00–24:00',
    stepsH: 'Nasıl randevu alırsınız?',
    steps: [
      "Aşağıdaki talep formunu doldurun ya da WhatsApp’tan yazın: hangi hizmet, hangi bölge, hangi gün.",
      "Size fiyatı bildirir ve bölgenizdeki anlaşmalı salona yönlendiririz.",
      "Gün ve saat WhatsApp’tan netleşir.",
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
    placeH: "Hizmet nerede verilir?",
    place: [
      "Hizmet, Antalya'nın bölgelerindeki anlaşmalı salonlarda verilir. Randevu WhatsApp'tan alınır; salon ve saat birlikte netleştirilir.",
      "Bölgenizi yazın, WhatsApp'tan sizi size en yakın anlaşmalı salona yönlendirelim; salon bilgisi randevu aşamasında paylaşılır.",
    ],
    formH: 'Hızlı talep formu',
    form: {
      services: "Hizmet (birden fazla seçebilirsiniz)",
      area: "Konakladığınız bölge / ilçe",
      areaPick: "Bölge seçin",
      areaOther: "Diğer (WhatsApp’tan yazacağım)",
      date: "Tarih",
      time: "Saat",
      people: "Kişi sayısı",
      note: "Not",
      notePh: "İstekleriniz, fotoğraf göndereceğinizi yazabilirsiniz",
      send: "WhatsApp'tan gönder",
      hint: "Butona basınca WhatsApp açılır, mesaj hazır gelir; göndermeden önce düzenleyebilirsiniz.",
      msgHello: "Merhaba, Can Beauty Studio talep formu:",
      msgService: "Hizmet",
      msgArea: "Konakladığınız bölge / ilçe",
      msgDate: "Tarih",
      msgTime: "Saat",
      msgPeople: "Kişi sayısı",
      msgNote: "Not",
    },
    faqTitle: 'Sık sorulan sorular',
    faq: [
      ["Randevuyu nasıl alırım?", "Talep formunu doldurun ya da +90 531 510 44 58 numarasına WhatsApp'tan hizmeti, bölgeyi ve istediğiniz günü yazın. Size fiyatı bildirir, bölgenizdeki anlaşmalı salona yönlendiririz."],
      ["Fiyat nasıl öğrenilir?", "Fiyat sayfada yazmaz; hizmete, bölgeye ve işin detayına göre WhatsApp'tan verilir. İstediğiniz işi yazmanız yeterli. Konakladığınız bölgedeki anlaşmalı salonlara yönlendirilirsiniz; hizmet bilgisi, size özel fiyat teklifi ve güncel kampanyalar WhatsApp'tan paylaşılır."],
      ["Hizmeti kim veriyor?", "Hizmet, bölgedeki anlaşmalı salonlar ve uzmanlar aracılığıyla verilir. Can Beauty Studio sizi doğru salona yönlendirir; salon adları sayfada gösterilmez."],
      ["Çalışma saatleri nedir?", "Her gün 08:00–24:00 arası WhatsApp ve telefondan ulaşabilirsiniz."],
      ["Hangi bölgelerde randevu alabilirim?", "Konyaaltı, Muratpaşa, Lara, Kundu, Kepez, Döşemealtı, Aksu, Kemer, Belek, Serik, Side ve Manavgat çevresi için yazabilirsiniz. Anlaşmalı salonlarımız var; adres randevuda paylaşılır."],
      ["Ödeme ve iptal nasıl işliyor?", "Ödeme ve iptal koşulları randevu sırasında WhatsApp'tan netleştirilir."],
    ],
    cta: "Fiyat al (WhatsApp)", ctaMsg: "Merhaba, Antalya'da güzellik hizmeti için fiyat almak istiyorum.", call: 'Ara', priceNote: "Fiyat hizmete, bölgeye ve işin detayına göre WhatsApp'tan verilir.", langH: 'Diğer diller',
    svcName: 'Güzellik hizmetleri (saç, tırnak, makyaj, gelin hazırlığı, cilt bakımı, ağda)', svcDesc: "Antalya'daki anlaşmalı salonlarda güzellik hizmeti; randevu ve fiyat WhatsApp'tan.",
  },
  // ───────────────────────────── EN ─────────────────────────────
  en: {
    title: 'Beauty Salon in Antalya | Hair, Nails, Makeup | Can Beauty Studio',
    desc: "Hair, nails, makeup, bridal styling, skin care and waxing at partner salons across Antalya. Send the quick request form, get directed to a salon and get your price on WhatsApp.",
    h1: 'Beauty Salon in Antalya: Hair, Nails, Makeup and Care for Visitors',
    lead: "Short answer: message +90 531 510 44 58 on WhatsApp with the service and the area you are in, and we will direct you to the partner salon nearest to you among those in Antalya’s districts. Appointments are made on WhatsApp; the salon and time are confirmed together. Prices depend on the service, the area and the details, and are given on WhatsApp. Open every day 08:00–24:00.",
    campaign: "You are directed to the partner salons in the area where you are staying; service information, a price offer made for you and current campaigns are shared on WhatsApp.",
    crumb: 'Beauty salon',
    keywords: ['beauty salon antalya', 'hair salon antalya tourists', 'nails antalya manicure pedicure', 'bridal hair and makeup antalya', 'Can Beauty Studio'],
    transparency: 'The service is provided through partner salons and specialists in your area.',
    hours: 'Every day 08:00–24:00',
    stepsH: 'How booking works',
    steps: [
      "Fill in the request form below or write on WhatsApp: which service, which area, which day.",
      "We tell you the price and direct you to a partner salon in your area.",
      "The day and time are confirmed on WhatsApp.",
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
    placeH: "Where is the service given?",
    place: [
      "The service is given at partner salons in Antalya’s districts. Appointments are made on WhatsApp; the salon and time are confirmed together.",
      "Tell us your area and we will direct you on WhatsApp to the partner salon nearest to you; the salon details are shared when you book.",
    ],
    formH: 'Quick request form',
    form: {
      services: "Service (you can pick several)",
      area: "Area / district where you are staying",
      areaPick: "Choose an area",
      areaOther: "Other (I will write on WhatsApp)",
      date: "Date",
      time: "Time",
      people: "Number of people",
      note: "Note",
      notePh: "Your wishes, or say that you will send a photo",
      send: "Send on WhatsApp",
      hint: "WhatsApp opens with the message ready; you can edit it before sending.",
      msgHello: "Hello, Can Beauty Studio request form:",
      msgService: "Service",
      msgArea: "Area / district where you are staying",
      msgDate: "Date",
      msgTime: "Time",
      msgPeople: "People",
      msgNote: "Note",
    },
    faqTitle: 'Frequently asked questions',
    faq: [
      ["How do I book?", "Fill in the request form or write to +90 531 510 44 58 on WhatsApp with the service, the area and the day you want. We tell you the price and direct you to a partner salon in your area."],
      ["How do I find out the price?", "Prices are not listed on the page. They depend on the service, the area and the details, and are given on WhatsApp. Just tell us what you need. You are directed to the partner salons in the area where you are staying; service information, a price offer made for you and current campaigns are shared on WhatsApp."],
      ["Who provides the service?", "The service is provided through partner salons and specialists in your area. Can Beauty Studio directs you to the right salon; salon names are not shown on the page."],
      ["What are your opening hours?", "You can reach us on WhatsApp and by phone every day from 08:00 to 24:00."],
      ["Which areas can I book for?", "You can write for Konyaaltı, Muratpaşa, Lara, Kundu, Kepez, Döşemealtı, Aksu, Kemer, Belek, Serik, Side and Manavgat. We have partner salons; the address is shared when you book."],
      ["How do payment and cancellation work?", "Payment and cancellation terms are confirmed on WhatsApp when you book."],
    ],
    cta: 'Get a price (WhatsApp)', ctaMsg: 'Hello, I would like a price for a beauty service in Antalya.', call: 'Call', priceNote: 'Prices depend on the service, the area and the details, and are given on WhatsApp.', langH: 'Other languages',
    svcName: 'Beauty services (hair, nails, makeup, bridal, skin care, waxing)', svcDesc: "Beauty services at partner salons in Antalya; booking and prices on WhatsApp.",
  },
  // ───────────────────────────── DE ─────────────────────────────
  de: {
    title: 'Schönheitssalon Antalya | Haare, Nägel, Make-up | Can Beauty Studio',
    desc: "Friseur, Nagelpflege, Make-up, Brautstyling, Gesichtspflege und Waxing in Partnersalons in ganz Antalya. Anfrage senden, an einen Salon verwiesen werden und den Preis per WhatsApp erhalten.",
    h1: 'Schönheitssalon in Antalya: Haare, Nägel, Make-up und Pflege für Urlauber',
    lead: "Kurz gesagt: Schreiben Sie uns per WhatsApp an +90 531 510 44 58, welche Behandlung Sie möchten und in welchem Gebiet Sie sind. Wir verweisen Sie an den Partnersalon in den Bezirken Antalyas, der Ihnen am nächsten liegt. Der Termin wird per WhatsApp vereinbart; Salon und Uhrzeit klären wir gemeinsam. Der Preis richtet sich nach Behandlung, Gebiet und Aufwand und wird per WhatsApp genannt. Täglich 08:00–24:00.",
    campaign: "Sie werden an die Partnersalons in dem Gebiet verwiesen, in dem Sie wohnen; Informationen zu den Leistungen, ein persönliches Preisangebot und aktuelle Aktionen erhalten Sie per WhatsApp.",
    crumb: 'Schönheitssalon',
    keywords: ['schönheitssalon antalya', 'friseur antalya urlaub', 'maniküre pediküre antalya', 'brautstyling antalya', 'Can Beauty Studio'],
    transparency: 'Die Leistung wird über Partnersalons und Fachkräfte in Ihrer Region erbracht.',
    hours: 'Täglich 08:00–24:00',
    stepsH: 'So läuft die Buchung',
    steps: [
      "Füllen Sie das Anfrageformular aus oder schreiben Sie per WhatsApp: welche Leistung, welches Gebiet, welcher Tag.",
      "Wir nennen Ihnen den Preis und verweisen Sie an einen Partnersalon in Ihrer Nähe.",
      "Tag und Uhrzeit werden per WhatsApp bestätigt.",
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
    placeH: "Wo wird die Leistung erbracht?",
    place: [
      "Die Leistung wird in Partnersalons in den Bezirken Antalyas erbracht. Der Termin wird per WhatsApp vereinbart; Salon und Uhrzeit klären wir gemeinsam.",
      "Nennen Sie uns Ihr Gebiet, und wir verweisen Sie per WhatsApp an den Partnersalon, der Ihnen am nächsten liegt; die Salondaten erhalten Sie bei der Buchung.",
    ],
    formH: 'Schnelles Anfrageformular',
    form: {
      services: "Leistung (Mehrfachauswahl möglich)",
      area: "Gebiet / Bezirk Ihrer Unterkunft",
      areaPick: "Gebiet wählen",
      areaOther: "Andere (schreibe ich per WhatsApp)",
      date: "Datum",
      time: "Uhrzeit",
      people: "Personen",
      note: "Hinweis",
      notePh: "Ihre Wünsche, oder dass Sie ein Foto senden",
      send: "Per WhatsApp senden",
      hint: "WhatsApp öffnet sich mit fertiger Nachricht; Sie können sie vor dem Senden ändern.",
      msgHello: "Guten Tag, Anfrage an Can Beauty Studio:",
      msgService: "Leistung",
      msgArea: "Gebiet / Bezirk Ihrer Unterkunft",
      msgDate: "Datum",
      msgTime: "Uhrzeit",
      msgPeople: "Personen",
      msgNote: "Hinweis",
    },
    faqTitle: 'Häufige Fragen',
    faq: [
      ["Wie buche ich?", "Füllen Sie das Formular aus oder schreiben Sie an +90 531 510 44 58 per WhatsApp: Leistung, Gebiet und Wunschtag. Wir nennen den Preis und verweisen Sie an einen Partnersalon in Ihrer Nähe."],
      ["Wie erfahre ich den Preis?", "Preise stehen nicht auf der Seite. Sie hängen von Leistung, Gebiet und Aufwand ab und werden per WhatsApp genannt. Schreiben Sie einfach, was Sie brauchen. Sie werden an die Partnersalons in dem Gebiet verwiesen, in dem Sie wohnen; Informationen zu den Leistungen, ein persönliches Preisangebot und aktuelle Aktionen erhalten Sie per WhatsApp."],
      ["Wer erbringt die Leistung?", "Die Leistung wird über Partnersalons und Fachkräfte in Ihrer Region erbracht. Can Beauty Studio verweist Sie an den passenden Salon; Salonnamen werden auf der Seite nicht genannt."],
      ["Wann sind Sie erreichbar?", "Per WhatsApp und Telefon täglich von 08:00 bis 24:00 Uhr."],
      ["Für welche Regionen kann ich buchen?", "Sie können für Konyaaltı, Muratpaşa, Lara, Kundu, Kepez, Döşemealtı, Aksu, Kemer, Belek, Serik, Side und Manavgat schreiben. Wir haben Partnersalons; die Adresse nennen wir bei der Buchung."],
      ["Wie laufen Zahlung und Stornierung ab?", "Zahlung und Stornierungsbedingungen werden bei der Buchung per WhatsApp geklärt."],
    ],
    cta: 'Preis anfragen (WhatsApp)', ctaMsg: 'Guten Tag, ich möchte einen Preis für eine Schönheitsbehandlung in Antalya.', call: 'Anrufen', priceNote: 'Der Preis richtet sich nach Behandlung, Gebiet und Aufwand und wird per WhatsApp genannt.', langH: 'Andere Sprachen',
    svcName: 'Schönheitsleistungen (Haare, Nägel, Make-up, Braut, Gesichtspflege, Waxing)', svcDesc: "Schönheitsleistungen in Partnersalons in Antalya; Buchung und Preis per WhatsApp.",
  },
  // ───────────────────────────── RU ─────────────────────────────
  ru: {
    title: 'Салон красоты в Анталье | Волосы, ногти, макияж | Can Beauty Studio',
    desc: "Волосы, ногти, макияж, образ невесты, уход за кожей и шугаринг в салонах-партнёрах по всей Анталье. Отправьте заявку, получите направление в салон и узнайте цену в WhatsApp.",
    h1: 'Салон красоты в Анталье: волосы, ногти, макияж и уход для отдыхающих',
    lead: "Коротко: напишите в WhatsApp на +90 531 510 44 58, какая услуга нужна и в каком районе вы находитесь, и мы направим вас в ближайший к вам салон-партнёр среди салонов районов Антальи. Запись проходит через WhatsApp; салон и время согласуем вместе. Цена зависит от услуги, района и деталей и называется в WhatsApp. Ежедневно 08:00–24:00.",
    campaign: "Вас направят в салоны-партнёры в районе, где вы остановились; информацию об услугах, индивидуальное ценовое предложение и актуальные акции сообщат в WhatsApp.",
    crumb: 'Салон красоты',
    keywords: ['салон красоты анталья', 'парикмахер анталья', 'маникюр педикюр анталья', 'свадебная причёска макияж анталья', 'Can Beauty Studio'],
    transparency: 'Услуги оказываются через салоны-партнёры и мастеров в вашем районе.',
    hours: 'Ежедневно 08:00–24:00',
    stepsH: 'Как записаться',
    steps: [
      "Заполните форму заявки ниже или напишите в WhatsApp: какая услуга, какой район, какой день.",
      "Мы назовём цену и направим вас в салон-партнёр в вашем районе.",
      "День и время уточняются в WhatsApp.",
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
    placeH: "Где оказывается услуга?",
    place: [
      "Услуги оказываются в салонах-партнёрах районов Антальи. Запись проходит через WhatsApp; салон и время согласуем вместе.",
      "Напишите свой район, и мы направим вас в WhatsApp в ближайший к вам салон-партнёр; данные салона сообщаются при записи.",
    ],
    formH: 'Быстрая заявка',
    form: {
      services: "Услуга (можно выбрать несколько)",
      area: "Район, где вы остановились",
      areaPick: "Выберите район",
      areaOther: "Другой (напишу в WhatsApp)",
      date: "Дата",
      time: "Время",
      people: "Количество человек",
      note: "Комментарий",
      notePh: "Пожелания или что пришлёте фото",
      send: "Отправить в WhatsApp",
      hint: "Откроется WhatsApp с готовым сообщением; перед отправкой его можно изменить.",
      msgHello: "Здравствуйте, заявка в Can Beauty Studio:",
      msgService: "Услуга",
      msgArea: "Район, где вы остановились",
      msgDate: "Дата",
      msgTime: "Время",
      msgPeople: "Человек",
      msgNote: "Комментарий",
    },
    faqTitle: 'Частые вопросы',
    faq: [
      ["Как записаться?", "Заполните форму или напишите в WhatsApp на +90 531 510 44 58: услуга, район и желаемый день. Мы назовём цену и направим вас в салон-партнёр в вашем районе."],
      ["Как узнать цену?", "Цены на странице не указаны. Они зависят от услуги, района и деталей и называются в WhatsApp. Просто напишите, что вам нужно. Вас направят в салоны-партнёры в районе, где вы остановились; информацию об услугах, индивидуальное ценовое предложение и актуальные акции сообщат в WhatsApp."],
      ["Кто оказывает услугу?", "Услуги оказываются через салоны-партнёры и мастеров в вашем районе. Can Beauty Studio направляет вас в нужный салон; названия салонов на странице не указываются."],
      ["Когда вы на связи?", "В WhatsApp и по телефону — ежедневно с 08:00 до 24:00."],
      ["В каких районах можно записаться?", "Можно писать по Коньяалты, Муратпаша, Лара, Кунду, Кепез, Дёшемеалты, Аксу, Кемер, Белек, Серик, Сиде и Манавгат. У нас есть салоны-партнёры; адрес сообщим при записи."],
      ["Как проходят оплата и отмена?", "Условия оплаты и отмены уточняются в WhatsApp при записи."],
    ],
    cta: 'Узнать цену (WhatsApp)', ctaMsg: 'Здравствуйте, хочу узнать цену на услугу салона красоты в Анталье.', call: 'Позвонить', priceNote: 'Цена зависит от услуги, района и деталей и называется в WhatsApp.', langH: 'Другие языки',
    svcName: 'Услуги красоты (волосы, ногти, макияж, образ невесты, уход за кожей, депиляция)', svcDesc: "Услуги красоты в салонах-партнёрах Антальи; запись и цены в WhatsApp.",
  },
  // ───────────────────────────── ES ─────────────────────────────
  es: {
    title: 'Salón de belleza en Antalya | Pelo, uñas, maquillaje | Can Beauty Studio',
    desc: "Pelo, uñas, maquillaje, novia, cuidado facial y cera en salones asociados de Antalya. Envía la solicitud y recibe el precio por WhatsApp.",
    h1: 'Salón de belleza en Antalya: pelo, uñas, maquillaje y cuidado para visitantes',
    lead: "En breve: escribe por WhatsApp al +90 531 510 44 58 qué servicio quieres y en qué zona estás, y te dirigimos al salón asociado más cercano entre los de los distritos de Antalya. La cita se concierta por WhatsApp; el salón y la hora se acuerdan juntos. El precio depende del servicio, la zona y los detalles, y se indica por WhatsApp. Todos los días de 08:00 a 24:00.",
    campaign: "Te dirigimos a los salones asociados de la zona donde te alojas; la información de los servicios, una oferta de precio personalizada y las promociones vigentes se comparten por WhatsApp.",
    crumb: 'Salón de belleza',
    keywords: ['salón de belleza antalya', 'peluquería antalya turistas', 'manicura pedicura antalya', 'peinado y maquillaje de novia antalya', 'Can Beauty Studio'],
    transparency: 'El servicio se presta a través de salones asociados y profesionales de tu zona.',
    hours: 'Todos los días de 08:00 a 24:00',
    stepsH: 'Cómo reservar',
    steps: [
      "Rellena el formulario de abajo o escríbenos por WhatsApp: qué servicio, qué zona y qué día.",
      "Te decimos el precio y te dirigimos a un salón asociado de tu zona.",
      "El día y la hora se confirman por WhatsApp.",
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
    placeH: "¿Dónde se presta el servicio?",
    place: [
      "El servicio se presta en salones asociados de los distritos de Antalya. La cita se concierta por WhatsApp; el salón y la hora se acuerdan juntos.",
      "Dinos tu zona y te dirigimos por WhatsApp al salón asociado más cercano; los datos del salón se comparten al reservar.",
    ],
    formH: 'Solicitud rápida',
    form: {
      services: "Servicio (puedes elegir varios)",
      area: "Zona / distrito donde te alojas",
      areaPick: "Elige una zona",
      areaOther: "Otra (la escribiré por WhatsApp)",
      date: "Fecha",
      time: "Hora",
      people: "Número de personas",
      note: "Nota",
      notePh: "Tus deseos, o si enviarás una foto",
      send: "Enviar por WhatsApp",
      hint: "Se abre WhatsApp con el mensaje listo; puedes editarlo antes de enviarlo.",
      msgHello: "Hola, solicitud a Can Beauty Studio:",
      msgService: "Servicio",
      msgArea: "Zona / distrito donde te alojas",
      msgDate: "Fecha",
      msgTime: "Hora",
      msgPeople: "Personas",
      msgNote: "Nota",
    },
    faqTitle: 'Preguntas frecuentes',
    faq: [
      ["¿Cómo reservo?", "Rellena el formulario o escribe por WhatsApp al +90 531 510 44 58 con el servicio, la zona y el día que quieres. Te decimos el precio y te dirigimos a un salón asociado de tu zona."],
      ["¿Cómo sé el precio?", "Los precios no aparecen en la página. Dependen del servicio, la zona y los detalles, y se indican por WhatsApp. Cuéntanos qué necesitas. Te dirigimos a los salones asociados de la zona donde te alojas; la información de los servicios, una oferta de precio personalizada y las promociones vigentes se comparten por WhatsApp."],
      ["¿Quién presta el servicio?", "El servicio se presta a través de salones asociados y profesionales de tu zona. Can Beauty Studio te dirige al salón adecuado; los nombres de los salones no se muestran en la página."],
      ["¿Cuál es el horario?", "Puedes escribirnos por WhatsApp o llamar todos los días de 08:00 a 24:00."],
      ["¿Para qué zonas puedo reservar?", "Puedes escribirnos para Konyaaltı, Muratpaşa, Lara, Kundu, Kepez, Döşemealtı, Aksu, Kemer, Belek, Serik, Side y Manavgat. Tenemos salones asociados; la dirección se comparte al reservar."],
      ["¿Cómo funcionan el pago y la cancelación?", "Las condiciones de pago y cancelación se aclaran por WhatsApp al reservar."],
    ],
    cta: 'Pedir precio (WhatsApp)', ctaMsg: 'Hola, quisiera el precio de un servicio de belleza en Antalya.', call: 'Llamar', priceNote: 'El precio depende del servicio, la zona y los detalles, y se indica por WhatsApp.', langH: 'Otros idiomas',
    svcName: 'Servicios de belleza (pelo, uñas, maquillaje, novia, cuidado facial, cera)', svcDesc: "Servicios de belleza en salones asociados de Antalya; reserva y precios por WhatsApp.",
  },
  // ───────────────────────────── FR ─────────────────────────────
  fr: {
    title: 'Salon de beauté à Antalya | Cheveux, ongles, maquillage | Can Beauty Studio',
    desc: "Coiffure, ongles, maquillage, mariée, soin du visage et cire dans des salons partenaires à Antalya. Envoyez la demande et recevez le prix sur WhatsApp.",
    h1: 'Salon de beauté à Antalya : cheveux, ongles, maquillage et soins pour les visiteurs',
    lead: "En bref : écrivez sur WhatsApp au +90 531 510 44 58 le service souhaité et votre secteur, et nous vous orientons vers le salon partenaire le plus proche parmi ceux des quartiers d’Antalya. Le rendez-vous se prend sur WhatsApp ; le salon et l’heure sont précisés ensemble. Le prix dépend du service, du secteur et des détails, et il est communiqué sur WhatsApp. Tous les jours de 08h00 à 24h00.",
    campaign: "Vous êtes orienté vers les salons partenaires du secteur où vous séjournez ; les informations sur les services, une offre de prix personnalisée et les promotions en cours sont communiquées sur WhatsApp.",
    crumb: 'Salon de beauté',
    keywords: ['salon de beauté antalya', 'coiffeur antalya vacances', 'manucure pédicure antalya', 'coiffure maquillage mariée antalya', 'Can Beauty Studio'],
    transparency: 'Le service est assuré par des salons partenaires et des spécialistes de votre secteur.',
    hours: 'Tous les jours de 08h00 à 24h00',
    stepsH: 'Comment réserver',
    steps: [
      "Remplissez le formulaire ci-dessous ou écrivez sur WhatsApp : quel service, quel secteur, quel jour.",
      "Nous vous indiquons le prix et vous orientons vers un salon partenaire de votre secteur.",
      "Le jour et l'heure sont confirmés sur WhatsApp.",
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
    placeH: "Où le service est-il assuré ?",
    place: [
      "Le service est assuré dans les salons partenaires des quartiers d’Antalya. Le rendez-vous se prend sur WhatsApp ; le salon et l’heure sont précisés ensemble.",
      "Indiquez-nous votre secteur et nous vous orientons sur WhatsApp vers le salon partenaire le plus proche ; ses coordonnées sont communiquées lors de la réservation.",
    ],
    formH: 'Demande rapide',
    form: {
      services: "Service (plusieurs choix possibles)",
      area: "Secteur / quartier de votre séjour",
      areaPick: "Choisissez un secteur",
      areaOther: "Autre (je l'écrirai sur WhatsApp)",
      date: "Date",
      time: "Heure",
      people: "Nombre de personnes",
      note: "Remarque",
      notePh: "Vos souhaits, ou précisez que vous enverrez une photo",
      send: "Envoyer sur WhatsApp",
      hint: "WhatsApp s’ouvre avec le message prêt ; vous pouvez le modifier avant l’envoi.",
      msgHello: "Bonjour, demande à Can Beauty Studio :",
      msgService: "Service",
      msgArea: "Secteur / quartier de votre séjour",
      msgDate: "Date",
      msgTime: "Heure",
      msgPeople: "Personnes",
      msgNote: "Remarque",
    },
    faqTitle: 'Questions fréquentes',
    faq: [
      ["Comment réserver ?", "Remplissez le formulaire ou écrivez sur WhatsApp au +90 531 510 44 58 avec le service, le secteur et le jour souhaité. Nous vous indiquons le prix et vous orientons vers un salon partenaire de votre secteur."],
      ["Comment connaître le prix ?", "Les prix ne figurent pas sur la page. Ils dépendent du service, du secteur et des détails, et sont communiqués sur WhatsApp. Dites-nous simplement ce dont vous avez besoin. Vous êtes orienté vers les salons partenaires du secteur où vous séjournez ; les informations sur les services, une offre de prix personnalisée et les promotions en cours sont communiquées sur WhatsApp."],
      ["Qui assure le service ?", "Le service est assuré par des salons partenaires et des spécialistes de votre secteur. Can Beauty Studio vous oriente vers le bon salon ; les noms des salons ne sont pas affichés sur la page."],
      ["Quels sont vos horaires ?", "Vous pouvez nous joindre sur WhatsApp et par téléphone tous les jours de 08h00 à 24h00."],
      ["Pour quels secteurs puis-je réserver ?", "Vous pouvez nous écrire pour Konyaaltı, Muratpaşa, Lara, Kundu, Kepez, Döşemealtı, Aksu, Kemer, Belek, Serik, Side et Manavgat. Nous avons des salons partenaires ; l’adresse est communiquée lors de la réservation."],
      ["Comment fonctionnent le paiement et l’annulation ?", "Les conditions de paiement et d’annulation sont précisées sur WhatsApp lors de la réservation."],
    ],
    cta: 'Demander le prix (WhatsApp)', ctaMsg: 'Bonjour, je souhaite connaître le prix d’un service de beauté à Antalya.', call: 'Appeler', priceNote: 'Le prix dépend du service, du secteur et des détails, et il est communiqué sur WhatsApp.', langH: 'Autres langues',
    svcName: 'Services de beauté (cheveux, ongles, maquillage, mariée, soin du visage, épilation)', svcDesc: "Services de beauté dans des salons partenaires à Antalya ; réservation et prix sur WhatsApp.",
  },
  // ───────────────────────────── PL ─────────────────────────────
  pl: {
    title: 'Salon urody w Antalyi | Włosy, paznokcie, makijaż | Can Beauty Studio',
    desc: "Włosy, paznokcie, makijaż, stylizacja ślubna, pielęgnacja twarzy i depilacja woskiem w salonach partnerskich w Antalyi. Wyślij zgłoszenie, cenę poznasz na WhatsAppie.",
    h1: 'Salon urody w Antalyi: włosy, paznokcie, makijaż i pielęgnacja dla turystów',
    lead: "Krótko: napisz na WhatsAppie pod numer +90 531 510 44 58, jakiej usługi potrzebujesz i w jakiej okolicy jesteś, a skierujemy Cię do najbliższego salonu partnerskiego spośród salonów w dzielnicach Antalyi. Wizytę umawia się przez WhatsApp; salon i godzinę ustalamy razem. Cena zależy od usługi, okolicy i szczegółów i podawana jest na WhatsAppie. Codziennie 08:00–24:00.",
    campaign: "Zostaniesz skierowana lub skierowany do salonów partnerskich w okolicy, w której mieszkasz; informacje o usługach, indywidualną ofertę cenową i aktualne promocje przekazujemy na WhatsAppie.",
    crumb: 'Salon urody',
    keywords: ['salon urody antalya', 'fryzjer antalya wakacje', 'manicure pedicure antalya', 'fryzura i makijaż ślubny antalya', 'Can Beauty Studio'],
    transparency: 'Usługa jest świadczona przez salony partnerskie i specjalistów w Twojej okolicy.',
    hours: 'Codziennie 08:00–24:00',
    stepsH: 'Jak umówić wizytę',
    steps: [
      "Wypełnij formularz poniżej lub napisz na WhatsAppie: jaka usługa, jaka okolica, który dzień.",
      "Podamy cenę i skierujemy Cię do salonu partnerskiego w Twojej okolicy.",
      "Dzień i godzinę potwierdzamy na WhatsAppie.",
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
    placeH: "Gdzie świadczona jest usługa?",
    place: [
      "Usługa jest świadczona w salonach partnerskich w dzielnicach Antalyi. Wizytę umawia się przez WhatsApp; salon i godzinę ustalamy razem.",
      "Napisz, w jakiej okolicy jesteś, a na WhatsAppie skierujemy Cię do najbliższego salonu partnerskiego; dane salonu podajemy przy rezerwacji.",
    ],
    formH: 'Szybki formularz zgłoszeniowy',
    form: {
      services: "Usługa (możesz wybrać kilka)",
      area: "Okolica / dzielnica, w której mieszkasz",
      areaPick: "Wybierz okolicę",
      areaOther: "Inna (napiszę na WhatsAppie)",
      date: "Data",
      time: "Godzina",
      people: "Liczba osób",
      note: "Uwagi",
      notePh: "Twoje życzenia lub informacja, że wyślesz zdjęcie",
      send: "Wyślij na WhatsAppie",
      hint: "Otworzy się WhatsApp z gotową wiadomością; przed wysłaniem możesz ją zmienić.",
      msgHello: "Dzień dobry, zgłoszenie do Can Beauty Studio:",
      msgService: "Usługa",
      msgArea: "Okolica / dzielnica, w której mieszkasz",
      msgDate: "Data",
      msgTime: "Godzina",
      msgPeople: "Osoby",
      msgNote: "Uwagi",
    },
    faqTitle: 'Najczęstsze pytania',
    faq: [
      ["Jak się umówić?", "Wypełnij formularz lub napisz na WhatsAppie pod numer +90 531 510 44 58: usługa, okolica i dzień. Podamy cenę i skierujemy Cię do salonu partnerskiego w Twojej okolicy."],
      ["Jak poznać cenę?", "Cen nie ma na stronie. Zależą od usługi, okolicy i szczegółów i są podawane na WhatsAppie. Napisz, czego potrzebujesz. Zostaniesz skierowana lub skierowany do salonów partnerskich w okolicy, w której mieszkasz; informacje o usługach, indywidualną ofertę cenową i aktualne promocje przekazujemy na WhatsAppie."],
      ["Kto świadczy usługę?", "Usługa jest świadczona przez salony partnerskie i specjalistów w Twojej okolicy. Can Beauty Studio kieruje Cię do właściwego salonu; nazw salonów nie podajemy na stronie."],
      ["Jakie są godziny pracy?", "Jesteśmy dostępni na WhatsAppie i telefonicznie codziennie od 08:00 do 24:00."],
      ["W jakich okolicach mogę umówić wizytę?", "Możesz napisać w sprawie Konyaaltı, Muratpaşa, Lara, Kundu, Kepez, Döşemealtı, Aksu, Kemer, Belek, Serik, Side i Manavgat. Mamy salony partnerskie; adres podajemy przy rezerwacji."],
      ["Jak wyglądają płatność i anulowanie?", "Warunki płatności i anulowania ustalamy przez WhatsApp przy rezerwacji."],
    ],
    cta: 'Zapytaj o cenę (WhatsApp)', ctaMsg: 'Dzień dobry, chciałabym/chciałbym poznać cenę usługi kosmetycznej w Antalyi.', call: 'Zadzwoń', priceNote: 'Cena zależy od usługi, okolicy i szczegółów i jest podawana na WhatsAppie.', langH: 'Inne języki',
    svcName: 'Usługi urody (włosy, paznokcie, makijaż, ślub, pielęgnacja twarzy, depilacja)', svcDesc: "Usługi urody w salonach partnerskich w Antalyi; rezerwacja i ceny na WhatsAppie.",
  },
  // ───────────────────────────── UK ─────────────────────────────
  uk: {
    title: 'Салон краси в Анталії | Волосся, нігті, макіяж | Can Beauty Studio',
    desc: "Волосся, нігті, макіяж, образ нареченої, догляд за шкірою та шугаринг у салонах-партнерах по всій Анталії. Надішліть заявку, отримайте направлення до салону й дізнайтеся ціну у WhatsApp.",
    h1: 'Салон краси в Анталії: волосся, нігті, макіяж та догляд для відпочивальників',
    lead: "Коротко: напишіть у WhatsApp на +90 531 510 44 58, яка послуга потрібна і в якому районі ви перебуваєте, і ми скеруємо вас до найближчого салону-партнера серед салонів районів Анталії. Запис відбувається через WhatsApp; салон і час узгоджуємо разом. Ціна залежить від послуги, району та деталей і повідомляється у WhatsApp. Щодня 08:00–24:00.",
    campaign: "Вас скерують до салонів-партнерів у районі, де ви зупинилися; інформацію про послуги, індивідуальну цінову пропозицію й актуальні акції повідомлять у WhatsApp.",
    crumb: 'Салон краси',
    keywords: ['салон краси анталія', 'перукар анталія', 'манікюр педикюр анталія', 'весільна зачіска макіяж анталія', 'Can Beauty Studio'],
    transparency: 'Послуги надаються через салони-партнери та майстрів у вашому районі.',
    hours: 'Щодня 08:00–24:00',
    stepsH: 'Як записатися',
    steps: [
      "Заповніть форму заявки нижче або напишіть у WhatsApp: яка послуга, який район, який день.",
      "Ми повідомимо ціну й скеруємо вас до салону-партнера у вашому районі.",
      "День і час уточнюються у WhatsApp.",
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
    placeH: "Де надається послуга?",
    place: [
      "Послуги надаються в салонах-партнерах районів Анталії. Запис відбувається через WhatsApp; салон і час узгоджуємо разом.",
      "Напишіть свій район, і ми скеруємо вас у WhatsApp до найближчого салону-партнера; дані салону повідомляємо під час запису.",
    ],
    formH: 'Швидка заявка',
    form: {
      services: "Послуга (можна обрати кілька)",
      area: "Район, де ви зупинилися",
      areaPick: "Оберіть район",
      areaOther: "Інший (напишу у WhatsApp)",
      date: "Дата",
      time: "Час",
      people: "Кількість осіб",
      note: "Коментар",
      notePh: "Побажання або що надішлете фото",
      send: "Надіслати у WhatsApp",
      hint: "Відкриється WhatsApp із готовим повідомленням; перед надсиланням його можна змінити.",
      msgHello: "Доброго дня, заявка до Can Beauty Studio:",
      msgService: "Послуга",
      msgArea: "Район, де ви зупинилися",
      msgDate: "Дата",
      msgTime: "Час",
      msgPeople: "Осіб",
      msgNote: "Коментар",
    },
    faqTitle: 'Часті запитання',
    faq: [
      ["Як записатися?", "Заповніть форму або напишіть у WhatsApp на +90 531 510 44 58: послуга, район і бажаний день. Ми повідомимо ціну й скеруємо вас до салону-партнера у вашому районі."],
      ["Як дізнатися ціну?", "Цін на сторінці немає. Вони залежать від послуги, району та деталей і повідомляються у WhatsApp. Просто напишіть, що вам потрібно. Вас скерують до салонів-партнерів у районі, де ви зупинилися; інформацію про послуги, індивідуальну цінову пропозицію й актуальні акції повідомлять у WhatsApp."],
      ["Хто надає послугу?", "Послуги надаються через салони-партнери та майстрів у вашому районі. Can Beauty Studio скеровує вас до потрібного салону; назви салонів на сторінці не вказуються."],
      ["Коли ви на зв’язку?", "У WhatsApp і телефоном — щодня з 08:00 до 24:00."],
      ["У яких районах можна записатися?", "Можна писати щодо Коньяалти, Муратпаша, Лара, Кунду, Кепез, Дьошемеалти, Аксу, Кемер, Белек, Серик, Сіде та Манавгат. У нас є салони-партнери; адресу повідомимо під час запису."],
      ["Як відбуваються оплата та скасування?", "Умови оплати та скасування уточнюються у WhatsApp під час запису."],
    ],
    cta: 'Дізнатися ціну (WhatsApp)', ctaMsg: 'Доброго дня, хочу дізнатися ціну на послугу салону краси в Анталії.', call: 'Подзвонити', priceNote: 'Ціна залежить від послуги, району та деталей і повідомляється у WhatsApp.', langH: 'Інші мови',
    svcName: 'Послуги краси (волосся, нігті, макіяж, образ нареченої, догляд за шкірою, депіляція)', svcDesc: "Послуги краси в салонах-партнерах Анталії; запис і ціни у WhatsApp.",
  },
  // ───────────────────────────── NL ─────────────────────────────
  nl: {
    title: 'Schoonheidssalon in Antalya | Haar, nagels, make-up | Can Beauty Studio',
    desc: "Haar, nagels, make-up, bruid, gezichtsverzorging en waxen in partnersalons in Antalya. Stuur de aanvraag en ontvang de prijs via WhatsApp.",
    h1: 'Schoonheidssalon in Antalya: haar, nagels, make-up en verzorging voor bezoekers',
    lead: "Kort gezegd: stuur via WhatsApp naar +90 531 510 44 58 welke behandeling u wilt en in welk gebied u bent, dan verwijzen wij u naar de dichtstbijzijnde partnersalon in de wijken van Antalya. De afspraak wordt via WhatsApp gemaakt; salon en tijd stemmen we samen af. De prijs hangt af van de behandeling, het gebied en de details en wordt via WhatsApp genoemd. Elke dag 08:00–24:00.",
    campaign: "U wordt doorverwezen naar de partnersalons in het gebied waar u verblijft; informatie over de behandelingen, een prijsaanbieding op maat en actuele acties worden via WhatsApp gedeeld.",
    crumb: 'Schoonheidssalon',
    keywords: ['schoonheidssalon antalya', 'kapper antalya vakantie', 'manicure pedicure antalya', 'bruidskapsel make-up antalya', 'Can Beauty Studio'],
    transparency: 'De dienst wordt geleverd via partnersalons en specialisten in uw regio.',
    hours: 'Elke dag 08:00–24:00',
    stepsH: 'Zo werkt het boeken',
    steps: [
      "Vul het aanvraagformulier hieronder in of schrijf via WhatsApp: welke behandeling, welk gebied, welke dag.",
      "Wij noemen de prijs en verwijzen u naar een partnersalon in uw regio.",
      "Dag en tijd worden via WhatsApp bevestigd.",
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
    placeH: "Waar wordt de dienst geleverd?",
    place: [
      "De dienst wordt geleverd in partnersalons in de wijken van Antalya. De afspraak wordt via WhatsApp gemaakt; salon en tijd stemmen we samen af.",
      "Laat ons uw gebied weten en wij verwijzen u via WhatsApp naar de dichtstbijzijnde partnersalon; de gegevens van de salon krijgt u bij het boeken.",
    ],
    formH: 'Snel aanvraagformulier',
    form: {
      services: "Behandeling (meerdere mogelijk)",
      area: "Gebied / wijk waar u verblijft",
      areaPick: "Kies een gebied",
      areaOther: "Anders (ik schrijf het via WhatsApp)",
      date: "Datum",
      time: "Tijd",
      people: "Aantal personen",
      note: "Opmerking",
      notePh: "Uw wensen, of dat u een foto stuurt",
      send: "Verstuur via WhatsApp",
      hint: "WhatsApp opent met het bericht al ingevuld; u kunt het vóór het versturen aanpassen.",
      msgHello: "Goedendag, aanvraag voor Can Beauty Studio:",
      msgService: "Behandeling",
      msgArea: "Gebied / wijk waar u verblijft",
      msgDate: "Datum",
      msgTime: "Tijd",
      msgPeople: "Personen",
      msgNote: "Opmerking",
    },
    faqTitle: 'Veelgestelde vragen',
    faq: [
      ["Hoe boek ik?", "Vul het formulier in of schrijf via WhatsApp naar +90 531 510 44 58 met de behandeling, het gebied en de gewenste dag. Wij noemen de prijs en verwijzen u naar een partnersalon in uw regio."],
      ["Hoe weet ik de prijs?", "Prijzen staan niet op de pagina. Ze hangen af van de behandeling, het gebied en de details en worden via WhatsApp genoemd. Vertel ons gewoon wat u nodig hebt. U wordt doorverwezen naar de partnersalons in het gebied waar u verblijft; informatie over de behandelingen, een prijsaanbieding op maat en actuele acties worden via WhatsApp gedeeld."],
      ["Wie levert de dienst?", "De dienst wordt geleverd via partnersalons en specialisten in uw regio. Can Beauty Studio verwijst u naar de juiste salon; namen van salons worden op de pagina niet getoond."],
      ["Wat zijn de openingstijden?", "U kunt ons elke dag van 08:00 tot 24:00 bereiken via WhatsApp en telefoon."],
      ["Voor welke gebieden kan ik boeken?", "U kunt schrijven voor Konyaaltı, Muratpaşa, Lara, Kundu, Kepez, Döşemealtı, Aksu, Kemer, Belek, Serik, Side en Manavgat. Wij hebben partnersalons; het adres delen we bij de boeking."],
      ["Hoe werken betaling en annulering?", "De voorwaarden voor betaling en annulering worden bij de boeking via WhatsApp besproken."],
    ],
    cta: 'Prijs opvragen (WhatsApp)', ctaMsg: 'Goedendag, ik wil graag de prijs van een schoonheidsbehandeling in Antalya.', call: 'Bellen', priceNote: 'De prijs hangt af van de behandeling, het gebied en de details en wordt via WhatsApp genoemd.', langH: 'Andere talen',
    svcName: 'Schoonheidsbehandelingen (haar, nagels, make-up, bruid, gezichtsverzorging, waxen)', svcDesc: "Schoonheidsbehandelingen in partnersalons in Antalya; boeking en prijs via WhatsApp.",
  },
  // ───────────────────────────── AR ─────────────────────────────
  ar: {
    rtl: true,
    title: 'صالون تجميل في أنطاليا | شعر، أظافر، مكياج | Can Beauty Studio',
    desc: "خدمات الشعر والأظافر والمكياج وتجهيز العروس والعناية بالبشرة وإزالة الشعر بالشمع في صالونات شريكة في أنطاليا. أرسل الطلب، ويتم توجيهك إلى صالون، واحصل على السعر عبر واتساب.",
    h1: 'صالون تجميل في أنطاليا: شعر وأظافر ومكياج وعناية للزوّار',
    lead: "باختصار: اكتبوا لنا على واتساب على الرقم +90 531 510 44 58 الخدمة التي تريدونها والمنطقة التي تقيمون فيها، وسنوجّهكم إلى أقرب صالون شريك بين صالونات أحياء أنطاليا. يُحجز الموعد عبر واتساب، ويُحدَّد الصالون والوقت معاً. يختلف السعر حسب الخدمة والمنطقة والتفاصيل ويُعطى عبر واتساب. يومياً من 08:00 إلى 24:00.",
    campaign: "يتم توجيهكم إلى الصالونات الشريكة في المنطقة التي تقيمون فيها؛ وتُشارَك معلومات الخدمات وعرض سعر خاص بكم والحملات الحالية عبر واتساب.",
    crumb: 'صالون تجميل',
    keywords: ['صالون تجميل أنطاليا', 'كوافير أنطاليا', 'مانيكير وباديكير أنطاليا', 'تجهيز العروس أنطاليا', 'Can Beauty Studio'],
    transparency: 'تُقدَّم الخدمة عبر الصالونات الشريكة والمختصين في منطقتكم.',
    hours: 'يومياً من 08:00 إلى 24:00',
    stepsH: 'كيف تحجزون',
    steps: [
      "املؤوا نموذج الطلب أدناه أو اكتبوا لنا على واتساب: أي خدمة، أي منطقة، أي يوم.",
      "نخبركم بالسعر ونوجّهكم إلى صالون شريك في منطقتكم.",
      "يُؤكَّد اليوم والوقت عبر واتساب.",
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
    placeH: "أين تُقدَّم الخدمة؟",
    place: [
      "تُقدَّم الخدمة في صالونات شريكة في أحياء أنطاليا. يُحجز الموعد عبر واتساب، ويُحدَّد الصالون والوقت معاً.",
      "اكتبوا لنا منطقتكم وسنوجّهكم عبر واتساب إلى أقرب صالون شريك، وتُرسَل بيانات الصالون عند الحجز.",
    ],
    formH: 'نموذج طلب سريع',
    form: {
      services: "الخدمة (يمكن اختيار أكثر من واحدة)",
      area: "المنطقة / الحي الذي تقيمون فيه",
      areaPick: "اختاروا المنطقة",
      areaOther: "أخرى (سأكتبها عبر واتساب)",
      date: "التاريخ",
      time: "الوقت",
      people: "عدد الأشخاص",
      note: "ملاحظة",
      notePh: "رغباتكم، أو أنكم سترسلون صورة",
      send: "أرسلوا عبر واتساب",
      hint: "يُفتح واتساب والرسالة جاهزة، ويمكنكم تعديلها قبل الإرسال.",
      msgHello: "مرحباً، طلب إلى Can Beauty Studio:",
      msgService: "الخدمة",
      msgArea: "المنطقة / الحي الذي تقيمون فيه",
      msgDate: "التاريخ",
      msgTime: "الوقت",
      msgPeople: "الأشخاص",
      msgNote: "ملاحظة",
    },
    faqTitle: 'أسئلة شائعة',
    faq: [
      ["كيف أحجز؟", "املؤوا النموذج أو اكتبوا على واتساب إلى +90 531 510 44 58 الخدمة والمنطقة واليوم المطلوب. نخبركم بالسعر ونوجّهكم إلى صالون شريك في منطقتكم."],
      ["كيف أعرف السعر؟", "لا تُكتب الأسعار في الصفحة. تختلف حسب الخدمة والمنطقة والتفاصيل وتُعطى عبر واتساب. اكتبوا لنا ما تحتاجونه فقط. يتم توجيهكم إلى الصالونات الشريكة في المنطقة التي تقيمون فيها؛ وتُشارَك معلومات الخدمات وعرض سعر خاص بكم والحملات الحالية عبر واتساب."],
      ["من يقدّم الخدمة؟", "تُقدَّم الخدمة عبر الصالونات الشريكة والمختصين في منطقتكم. يوجّهكم Can Beauty Studio إلى الصالون المناسب، ولا تُذكر أسماء الصالونات في الصفحة."],
      ["ما ساعات العمل؟", "يمكنكم التواصل معنا عبر واتساب والهاتف يومياً من 08:00 إلى 24:00."],
      ["لأي مناطق يمكنني الحجز؟", "يمكنكم الكتابة لنا بخصوص كونيالتي ومراد باشا ولارا وكوندو وكيبز ودوشميالتي وأكسو وكيمير وبيليك وسيريك وسيدي ومانافغات. لدينا صالونات شريكة، ويُرسَل العنوان عند الحجز."],
      ["كيف يتم الدفع والإلغاء؟", "تُوضَّح شروط الدفع والإلغاء عبر واتساب عند الحجز."],
    ],
    cta: 'اطلبوا السعر (واتساب)', ctaMsg: 'مرحباً، أريد معرفة سعر خدمة تجميل في أنطاليا.', call: 'اتصلوا', priceNote: 'يختلف السعر حسب الخدمة والمنطقة والتفاصيل ويُعطى عبر واتساب.', langH: 'لغات أخرى',
    svcName: 'خدمات التجميل (شعر، أظافر، مكياج، عروس، عناية بالبشرة، إزالة الشعر بالشمع)', svcDesc: "خدمات تجميل في صالونات شريكة في أنطاليا؛ الحجز والأسعار عبر واتساب.",
  },
};

/** WhatsApp bağlantısı (önceden doldurulmuş mesaj). */
export const gWa = (text: string) => `https://wa.me/${G_WA}?text=${encodeURIComponent(text)}`;

/** Görünüm metinleri: hero alt başlığı ve güven şeridi (yalnızca doğrulanmış bilgiler: anlaşmalı salon, saat, 10 dil, WhatsApp teklifi). */
export type GUi = { sub: string; trust: [string, string, string, string]; imgNote: string; imgAlt: string };
export const G_UI: Record<GLang, GUi> = {
  tr: { sub: "Antalya'nın bölgelerindeki anlaşmalı salonlarda saç, tırnak, makyaj ve bakım. Talebinizi gönderin, sizi size en yakın salona yönlendirelim.", trust: ['Anlaşmalı salonlar', 'Her gün 08:00–24:00', '10 dilde bilgi', 'WhatsApp’tan hızlı teklif'], imgNote: 'Görseller temsilidir.', imgAlt: '{s} hizmeti görseli (temsilî)' },
  en: { sub: 'Hair, nails, makeup and care at partner salons across Antalya. Send your request and we will direct you to the salon nearest to you.', trust: ['Partner salons', 'Every day 08:00–24:00', 'Information in 10 languages', 'Quick quote on WhatsApp'], imgNote: 'Images are for illustration only.', imgAlt: '{s} service image (illustrative)' },
  de: { sub: 'Haare, Nägel, Make-up und Pflege in Partnersalons in ganz Antalya. Senden Sie Ihre Anfrage, wir leiten Sie an den nächstgelegenen Salon weiter.', trust: ['Partnersalons', 'Täglich 08:00–24:00 Uhr', 'Infos in 10 Sprachen', 'Schnelles Angebot per WhatsApp'], imgNote: 'Die Bilder sind Symbolbilder.', imgAlt: 'Bild zum Service {s} (Symbolbild)' },
  ru: { sub: 'Волосы, ногти, макияж и уход в салонах-партнёрах по всей Анталье. Отправьте заявку, и мы направим вас в ближайший к вам салон.', trust: ['Салоны-партнёры', 'Ежедневно 08:00–24:00', 'Информация на 10 языках', 'Быстрый расчёт в WhatsApp'], imgNote: 'Изображения носят иллюстративный характер.', imgAlt: 'Изображение услуги «{s}» (иллюстрация)' },
  es: { sub: 'Peluquería, uñas, maquillaje y cuidados en salones asociados de toda Antalya. Envíe su solicitud y le dirigimos al salón más cercano.', trust: ['Salones asociados', 'Todos los días 08:00–24:00', 'Información en 10 idiomas', 'Presupuesto rápido por WhatsApp'], imgNote: 'Las imágenes son ilustrativas.', imgAlt: 'Imagen del servicio {s} (ilustrativa)' },
  fr: { sub: 'Coiffure, ongles, maquillage et soins dans des salons partenaires partout à Antalya. Envoyez votre demande, nous vous orientons vers le salon le plus proche.', trust: ['Salons partenaires', 'Tous les jours 08h00–24h00', 'Informations en 10 langues', 'Devis rapide sur WhatsApp'], imgNote: 'Les images sont illustratives.', imgAlt: 'Image du service {s} (illustrative)' },
  pl: { sub: 'Fryzjer, paznokcie, makijaż i pielęgnacja w salonach partnerskich w całej Antalyi. Wyślij zgłoszenie, a skierujemy Cię do najbliższego salonu.', trust: ['Salony partnerskie', 'Codziennie 08:00–24:00', 'Informacje w 10 językach', 'Szybka wycena na WhatsApp'], imgNote: 'Zdjęcia mają charakter poglądowy.', imgAlt: 'Zdjęcie usługi {s} (ilustracja poglądowa)' },
  uk: { sub: 'Волосся, нігті, макіяж і догляд у салонах-партнерах по всій Анталії. Надішліть запит, і ми спрямуємо вас до найближчого салону.', trust: ['Салони-партнери', 'Щодня 08:00–24:00', 'Інформація 10 мовами', 'Швидкий розрахунок у WhatsApp'], imgNote: 'Зображення мають ілюстративний характер.', imgAlt: 'Зображення послуги «{s}» (ілюстрація)' },
  nl: { sub: 'Haar, nagels, make-up en verzorging in partnersalons door heel Antalya. Stuur uw aanvraag en wij verwijzen u naar de dichtstbijzijnde salon.', trust: ['Partnersalons', 'Elke dag 08:00–24:00', 'Informatie in 10 talen', 'Snelle offerte via WhatsApp'], imgNote: 'De afbeeldingen zijn ter illustratie.', imgAlt: 'Afbeelding van de dienst {s} (ter illustratie)' },
  ar: { sub: 'شعر وأظافر ومكياج وعناية في صالونات شريكة في أنحاء أنطاليا. أرسل طلبك وسنوجهك إلى أقرب صالون إليك.', trust: ['صالونات شريكة', 'يوميًا 08:00–24:00', 'معلومات بـ 10 لغات', 'عرض سعر سريع عبر واتساب'], imgNote: 'الصور توضيحية.', imgAlt: 'صورة خدمة {s} (توضيحية)' },
};
