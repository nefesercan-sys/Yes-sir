// ============================================================
// swaphubs.com — components/terzi/SeoLanding.tsx
// Bölge sayfaları (/antalya-terzi/[bolge] …) ve hizmet sayfaları (/terzi-hizmetleri/[hizmet] …)
// için 4 dilli, veri odaklı sunucu bileşenleri + metadata üreticileri.
// Veri: lib/seo-data.ts. Sadece doğrulanmış bilgi kullanılır (bkz. dosya başlığı).
// ============================================================
import type { Metadata } from 'next';
import './seo-landing.css';
import ReviewsBlock from '@/components/ReviewsBlock';
import { reviewStats } from '@/lib/reviews';
import { OTEL_BOLGELERI } from '@/lib/otel-bolgeleri';
import {
  DISTRICTS, SERVICES, MAHALLE_PAGES, LANGS, SITE, BUSINESS_ID, PHONE, PHONE_TEL, MAPS, LAST_UPDATE,
  SERVICE_BASE, HUB_MAIN, HOTEL_BASE,
  abs, districtUrl, serviceUrl, query, timeOf, priceOf, TIME_TEXT,
  type Lang, type District, type Service,
} from '@/lib/seo-data';

const WA = (m: string) => `https://wa.me/${PHONE_TEL.replace('+', '')}?text=${encodeURIComponent(m)}`;
const OG = `${SITE}/og/terzi-can.jpg`;
const OG_LOCALE: Record<Lang, string> = { tr: 'tr_TR', en: 'en_US', ru: 'ru_RU', de: 'de_DE' };

// ── Arayüz metinleri ────────────────────────────────────────
const UI = {
  tr: {
    home: '← Ana Sayfa', wa: 'WHATSAPP →', waBtn: "💬 WhatsApp'tan Yazın →", brand: 'Terzi Can', svcWord: 'Hizmetler',
    popular: 'Sık aranan aramalar', faq: 'Sık Sorulan Sorular', nearby: 'Yakın bölgeler', all: 'Tüm hizmetler',
    otherLang: 'Diğer diller', hotelLink: 'Otel bölgesi sayfası', districts: 'Hizmet verdiğimiz bölgeler',
    related: 'İlgili hizmetler', time: 'Teslim süresi', price: 'Fiyat', photoPrice: 'Fotoğraf gönderin, fiyatı hemen söyleyelim',
    mahalle: 'Konyaaltı mahalleleri', ctaH: 'Hemen Ulaşın', free: 'Otel ve eve ücretsiz servis',
    hours: 'Her gün 08:00–23:00', since: "2006'dan beri", where: 'Atölye: Hurma Mahallesi, Konyaaltı, Antalya',
    footer: 'Terzi Can · Hurma, Konyaaltı, Antalya', pricesLink: 'Terzi Can — Antalya terzi', pricesHref: '/terzi',
  },
  en: {
    home: '← Home', wa: 'WHATSAPP →', waBtn: '💬 Message us on WhatsApp →', brand: 'Terzi Can', svcWord: 'Services',
    popular: 'Popular searches', faq: 'Frequently Asked Questions', nearby: 'Nearby areas', all: 'All services',
    otherLang: 'Other languages', hotelLink: 'Hotel area page', districts: 'Areas we serve',
    related: 'Related services', time: 'Turnaround', price: 'Price', photoPrice: 'Send a photo and we will quote right away',
    mahalle: 'Konyaaltı neighbourhoods (Turkish)', ctaH: 'Get in Touch', free: 'Free service to hotels and homes',
    hours: 'Open daily 08:00–23:00', since: 'Serving since 2006', where: 'Workshop: Hurma, Konyaaltı, Antalya',
    footer: 'Terzi Can · Hurma, Konyaaltı, Antalya', pricesLink: 'Online tailor service Antalya', pricesHref: '/online-tailor-service',
  },
  ru: {
    home: '← Главная', wa: 'WHATSAPP →', waBtn: '💬 Написать в WhatsApp →', brand: 'Terzi Can', svcWord: 'Услуги',
    popular: 'Частые запросы', faq: 'Частые вопросы', nearby: 'Ближайшие районы', all: 'Все услуги',
    otherLang: 'Другие языки', hotelLink: 'Страница отельного района', districts: 'Районы обслуживания',
    related: 'Похожие услуги', time: 'Срок', price: 'Цена', photoPrice: 'Пришлите фото — сразу назовём цену',
    mahalle: 'Районы Коньяалты (тур.)', ctaH: 'Свяжитесь с нами', free: 'Бесплатный выезд в отели и на дом',
    hours: 'Ежедневно 08:00–23:00', since: 'Работаем с 2006 года', where: 'Мастерская: Хурма, Коньяалты, Анталья',
    footer: 'Terzi Can · Хурма, Коньяалты, Анталья', pricesLink: 'Ателье в Анталье', pricesHref: '/ru/atelie-antalya',
  },
  de: {
    home: '← Startseite', wa: 'WHATSAPP →', waBtn: '💬 Per WhatsApp schreiben →', brand: 'Terzi Can', svcWord: 'Leistungen',
    popular: 'Häufige Suchanfragen', faq: 'Häufige Fragen', nearby: 'Nahegelegene Gebiete', all: 'Alle Leistungen',
    otherLang: 'Andere Sprachen', hotelLink: 'Seite für das Hotelgebiet', districts: 'Gebiete, die wir bedienen',
    related: 'Ähnliche Leistungen', time: 'Dauer', price: 'Preis', photoPrice: 'Foto senden, Preis sofort per WhatsApp',
    mahalle: 'Stadtteile in Konyaaltı (türk.)', ctaH: 'Kontakt aufnehmen', free: 'Kostenloser Service zu Hotels und nach Hause',
    hours: 'Täglich 08:00–23:00', since: 'Seit 2006', where: 'Werkstatt: Hurma, Konyaaltı, Antalya',
    footer: 'Terzi Can · Hurma, Konyaaltı, Antalya', pricesLink: 'Online Schneiderservice Antalya', pricesHref: '/de/online-schneiderservice-antalya',
  },
} as const;

const HUB_NAME: Record<Lang, string> = {
  tr: 'Antalya Terzi', en: 'Tailor Service Antalya', ru: 'Услуги портного Анталья', de: 'Schneiderservice Antalya',
};
const SVC_HUB_NAME: Record<Lang, string> = {
  tr: 'Terzi Hizmetleri', en: 'Tailor Services', ru: 'Услуги портного', de: 'Schneider-Leistungen',
};

// ── Ortak şema: işletme düğümü (ana sayfadaki @id ile aynı) ────
function businessNode(lang: Lang) {
  return {
    '@type': ['LocalBusiness', 'ClothingStore'],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: reviewStats().average, reviewCount: String(reviewStats().count), bestRating: '5', worstRating: '1' },
    '@id': BUSINESS_ID,
    name: 'Terzi Can',
    url: `${SITE}/terzi`,
    telephone: PHONE_TEL,
    priceRange: '₺₺',
    image: OG,
    hasMap: MAPS,
    address: {
      '@type': 'PostalAddress', streetAddress: 'Hurma Mahallesi', addressLocality: 'Konyaaltı',
      addressRegion: 'Antalya', postalCode: '07130', addressCountry: 'TR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 36.857466, longitude: 30.596987 },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00', closes: '23:00',
    }],
    foundingDate: '2006',
    knowsLanguage: ['tr', 'en', 'ru', 'de'],
    availableLanguage: ['Turkish', 'English', 'Russian', 'German'],
    sameAs: [MAPS, `https://wa.me/${PHONE_TEL.replace('+', '')}`, 'https://terzihizmeti.com.tr'],
    inLanguage: lang,
  };
}

const alternatesFor = (urlFor: (l: Lang) => string) => ({
  canonical: urlFor('tr'),
  languages: { tr: urlFor('tr'), en: urlFor('en'), ru: urlFor('ru'), de: urlFor('de'), 'x-default': urlFor('tr') },
});

// ── Metin üreticileri ───────────────────────────────────────
function districtCopy(lang: Lang, d: District) {
  const n = d.name[lang];
  const loc = d.loc[lang];
  const kw = (lang === 'tr' ? [`${n} terzi`, `${n} terzi hizmeti`, ...d.alias.map((a) => `${a} terzi`)] : []);
  const title = {
    tr: `${n} Terzi — Paça Kısaltma, Fermuar, Elbise Tamiri`,
    en: `Tailor in ${n}, Antalya — Hemming, Zipper & Alterations`,
    ru: `Портной ${n}, Анталья — подшив, молния, ремонт одежды`,
    de: `Schneider ${n}, Antalya — Hose kürzen, Reißverschluss, Änderungen`,
  }[lang];
  const desc = {
    tr: `${loc} terzi mi arıyorsunuz? Paça kısaltma, bel daraltma, fermuar değişimi, elbise dikimi ve tamiri, gelinlik ₺800'den, abiye ₺400'den. Otele ve eve ücretsiz servis, her gün 08:00–23:00.`,
    en: `Looking for a tailor ${loc}? Trouser hemming, waist alteration, zipper replacement, dress making and repair, wedding dress from ₺800. Free service to hotels and homes, open daily 08:00–23:00.`,
    ru: `Нужен портной ${loc}? Подшив брюк, ушивание, замена молнии, пошив и ремонт платьев, свадебное платье от ₺800. Бесплатный выезд в отели и на дом, ежедневно 08:00–23:00.`,
    de: `Schneider ${loc} gesucht? Hose kürzen, Taille enger machen, Reißverschluss wechseln, Kleider nähen und ändern, Brautkleid ab ₺800. Kostenloser Service zu Hotels und nach Hause, täglich 08:00–23:00.`,
  }[lang];
  return { n, loc, kw, title, desc };
}

function districtAbout(lang: Lang, d: District): string {
  const n = d.name[lang];
  const loc = d.loc[lang];
  const t = {
    tr: {
      central: `${loc} yaşayan ve çalışanlar kıyafetini atölyemize getirebilir ya da adresinden alınmasını isteyebilir. Atölyemiz Konyaaltı Hurma'dadır; ${n} ve çevresi için alım-teslim ücretsiz servistir.`,
      resort: `${loc} otelde konaklayan misafirler için terzi servisimiz var. Valiz yetersiz kaldığında, bir kıyafet bozulduğunda ya da özel akşam için son dakika ayarı gerektiğinde otelinizden alıp teslim ediyoruz; Türkçe, İngilizce, Rusça ve Almanca anlaşabilirsiniz.`,
      outer: `${loc} ev, işyeri ve konut siteleri için terzi alım-teslim servisi veriyoruz. Mesafe nedeniyle günü ve saati WhatsApp'tan birlikte planlıyoruz.`,
    },
    en: {
      central: `Residents and workers ${loc} can bring garments to our workshop or ask us to collect them from their address. We are based in Hurma, Konyaaltı; pick-up and delivery for ${n} and the surrounding area is free.`,
      resort: `We offer a tailor service for guests staying at hotels ${loc}. If a garment tears, no longer fits or needs a last-minute adjustment for a special evening, we collect it from your hotel and bring it back; you can speak English, Turkish, Russian or German with us.`,
      outer: `We offer pick-up and delivery for homes, offices and residential complexes ${loc}. Because of the distance we agree on the day and time with you on WhatsApp.`,
    },
    ru: {
      central: `Жители и работающие ${loc} могут принести вещи в мастерскую или попросить забрать их по адресу. Мастерская находится в Хурме (Коньяалты); забор и доставка по району ${n} бесплатны.`,
      resort: `Для гостей отелей ${loc} у нас есть услуга портного. Порвалась вещь, перестала подходить по размеру или нужна срочная подгонка к вечеру — заберём из отеля и вернём; можно общаться на русском, английском, турецком и немецком.`,
      outer: `Забираем и привозим вещи ${loc} — на дом, в офис или в жилой комплекс. Из-за расстояния день и время согласуем с вами в WhatsApp.`,
    },
    de: {
      central: `Anwohner und Berufstätige ${loc} können Kleidung in unsere Werkstatt bringen oder von zu Hause abholen lassen. Wir sind in Hurma, Konyaaltı; Abholung und Lieferung für ${n} und Umgebung sind kostenlos.`,
      resort: `Für Gäste, die in Hotels ${loc} wohnen, bieten wir einen Schneiderservice an. Reißt etwas, passt etwas nicht mehr oder braucht es kurzfristig eine Anpassung für einen besonderen Abend — wir holen es im Hotel ab und bringen es zurück; Sie können auf Deutsch, Englisch, Russisch oder Türkisch sprechen.`,
      outer: `Wir holen und liefern Kleidung ${loc} für Wohnungen, Büros und Wohnanlagen. Wegen der Entfernung legen wir Tag und Uhrzeit per WhatsApp mit Ihnen fest.`,
    },
  }[lang];
  return t[d.kind];
}

function districtFaq(lang: Lang, d: District): [string, string][] {
  const loc = d.loc[lang];
  const n = d.name[lang];
  const by = (id: string) => SERVICES.find((s) => s.id === id)!;
  return {
    tr: [
      [`${loc} terzi var mı, yakınımdaki terzi nerede?`, `Atölyemiz Konyaaltı Hurma Mahallesi'ndedir. ${n} için kıyafetinizi adresinizden veya otelinizden alıp teslim ediyoruz; otel ve eve servis ücretsizdir. Her gün 08:00–23:00 arası WhatsApp'tan ulaşabilirsiniz.`],
      [`${loc} ${by('paca').q.tr} ve ${by('fermuar').q.tr} ne kadar sürer?`, 'Paça kısaltma, daraltma ve fermuar değişimi/tamiri aynı gün teslim edilir.'],
      [`${loc} gelinlik ve abiye tadilatı kaç TL?`, "Gelinlik tadilatı ₺800'den, abiye tadilatı ₺400'den başlar; kesin fiyat fotoğraf ve işlem detayına göre söylenir. Abiye tadilatı ertesi gün teslim edilir."],
      [`${loc} ${by('elbise-dikim').q.tr} kaç günde teslim edilir?`, 'Elbise dikimi 3 günde teslim edilir. Elbise, ceket, gömlek, mont ve abiye tadilat ya da tamiri 1 gün sonra teslim edilir.'],
      [`${loc} yabancı turistler için terzi hizmeti var mı?`, 'Evet. Türkçe, İngilizce, Rusça ve Almanca hizmet veriyoruz; otel ve eve servis ücretsizdir. Fotoğrafı WhatsApp\'tan gönderip fiyat alabilirsiniz.'],
    ],
    en: [
      [`Is there a tailor ${loc}? Where is the nearest tailor?`, `Our workshop is in Hurma, Konyaaltı. For ${n} we collect garments from your address or hotel and bring them back; service to hotels and homes is free. Message us on WhatsApp daily 08:00–23:00.`],
      [`How long do ${by('paca').q.en} and ${by('fermuar').q.en} take ${loc}?`, 'Trouser hemming, taking in and zipper replacement or repair are ready the same day.'],
      [`How much does wedding or evening dress alteration cost ${loc}?`, 'Wedding dress alteration starts from ₺800 and evening dress alteration from ₺400; the exact price depends on a photo and the work needed. Evening dress alterations are ready the next day.'],
      [`How many days does ${by('elbise-dikim').q.en} take ${loc}?`, 'Dress making is ready in 3 days. Alterations or repairs of dresses, jackets, shirts, coats and evening dresses are ready after 1 day.'],
      [`Is there a tailor service for tourists ${loc}?`, 'Yes. We serve in English, Turkish, Russian and German, and service to hotels and homes is free. Send a photo on WhatsApp to get a price.'],
    ],
    ru: [
      [`Есть ли портной ${loc}? Где ближайшее ателье?`, `Наша мастерская — в Хурме (Коньяалты). Для района ${n} забираем вещи с вашего адреса или из отеля и возвращаем; выезд в отели и на дом бесплатный. Пишите в WhatsApp ежедневно с 08:00 до 23:00.`],
      [`Как быстро делают ${by('paca').q.ru} и ${by('fermuar').q.ru} ${loc}?`, 'Подшив и ушивание брюк, а также замена или ремонт молнии выполняются в тот же день.'],
      [`Сколько стоит подгонка свадебного или вечернего платья ${loc}?`, 'Подгонка свадебного платья — от ₺800, вечернего — от ₺400; точную цену называем по фото и объёму работ. Вечерние платья готовы на следующий день.'],
      [`За сколько дней делают ${by('elbise-dikim').q.ru} ${loc}?`, 'Пошив платья — 3 дня. Переделка или ремонт платья, пиджака, рубашки, куртки и вечернего платья — через 1 день.'],
      [`Есть ли услуги портного для туристов ${loc}?`, 'Да. Мы говорим по-русски, по-английски, по-турецки и по-немецки; выезд в отели и на дом бесплатный. Пришлите фото в WhatsApp и узнайте цену.'],
    ],
    de: [
      [`Gibt es einen Schneider ${loc}? Wo ist der nächste Schneider?`, `Unsere Werkstatt liegt in Hurma, Konyaaltı. Für ${n} holen wir Kleidung an Ihrer Adresse oder im Hotel ab und bringen sie zurück; der Service zu Hotels und nach Hause ist kostenlos. WhatsApp täglich 08:00–23:00.`],
      [`Wie lange dauern ${by('paca').q.de} und ${by('fermuar').q.de} ${loc}?`, 'Hosen kürzen, enger machen sowie Reißverschluss wechseln oder reparieren sind am selben Tag fertig.'],
      [`Was kostet eine Brautkleid- oder Abendkleid-Änderung ${loc}?`, 'Brautkleid-Änderungen beginnen bei ₺800, Abendkleid-Änderungen bei ₺400; der genaue Preis richtet sich nach Foto und Aufwand. Abendkleider sind am nächsten Tag fertig.'],
      [`Wie viele Tage dauert ${by('elbise-dikim').q.de} ${loc}?`, 'Ein Kleid nähen dauert 3 Tage. Änderungen oder Reparaturen von Kleidern, Sakkos, Hemden, Mänteln und Abendkleidern sind nach 1 Tag fertig.'],
      [`Gibt es einen Schneiderservice für Touristen ${loc}?`, 'Ja. Wir sprechen Deutsch, Englisch, Russisch und Türkisch; der Service zu Hotels und nach Hause ist kostenlos. Foto per WhatsApp senden und Preis erfahren.'],
    ],
  }[lang] as [string, string][];
}

function serviceCopy(lang: Lang, s: Service) {
  const nm = s.name[lang];
  const title = {
    tr: `${nm} Antalya — Konyaaltı, Muratpaşa, Lara, Belek`,
    en: `${nm} in Antalya — Konyaaltı, Lara, Belek, Kemer`,
    ru: `${nm} в Анталье — Коньяалты, Лара, Белек, Кемер`,
    de: `${nm} in Antalya — Konyaaltı, Lara, Belek, Kemer`,
  }[lang];
  const price = priceOf(lang, s);
  const desc = {
    tr: `${s.intro.tr.split('. ')[0]}. ${timeOf('tr', s)}.${price ? ' ' + price + '.' : ''} Konyaaltı, Muratpaşa, Lara, Belek, Side, Kemer — otel ve eve ücretsiz servis.`,
    en: `${s.intro.en.split('. ')[0]}. ${timeOf('en', s)}.${price ? ' ' + price + '.' : ''} Konyaaltı, Lara, Belek, Side, Kemer — free service to hotels and homes.`,
    ru: `${s.intro.ru.split('. ')[0]}. ${timeOf('ru', s)}.${price ? ' ' + price + '.' : ''} Коньяалты, Лара, Белек, Сиде, Кемер — бесплатный выезд в отели и на дом.`,
    de: `${s.intro.de.split('. ')[0]}. ${timeOf('de', s)}.${price ? ' ' + price + '.' : ''} Konyaaltı, Lara, Belek, Side, Kemer — kostenloser Service zu Hotels und nach Hause.`,
  }[lang];
  return { nm, title, desc };
}

function serviceFaq(lang: Lang, s: Service): [string, string][] {
  const nm = s.name[lang];
  const price = priceOf(lang, s);
  const time = timeOf(lang, s);
  return {
    tr: [
      [`Antalya'da ${s.vars.tr[0]} nerede yapılır?`, `Terzi Can atölyesinde, Konyaaltı Hurma'da. ${s.intro.tr} Otel ve eve ücretsiz servis vardır, her gün 08:00–23:00 açığız.`],
      [`${nm} ne kadar sürer ve kaç TL?`, `${time}.${price ? ' ' + price + '; kesin fiyat kumaşa ve işlem detayına göre söylenir.' : ' Fiyat için kıyafetin fotoğrafını WhatsApp\'tan gönderin.'}`],
      [`${nm} için otelime veya evime gelir misiniz?`, 'Evet, otel ve eve alım-teslim servisimiz ücretsizdir. Konyaaltı, Muratpaşa, Lara, Güzeloba, Kundu, Belek, Side ve Kemer gibi bölgelerde hizmet veriyoruz.'],
    ],
    en: [
      [`Where can I get ${s.vars.en[0]} in Antalya?`, `At the Terzi Can workshop in Hurma, Konyaaltı. ${s.intro.en} Free service to hotels and homes; open daily 08:00–23:00.`],
      [`How long does ${nm.toLowerCase()} take and what does it cost?`, `${time}.${price ? ' ' + price + '; the exact price depends on the fabric and the work.' : ' Send a photo of the garment on WhatsApp for a price.'}`],
      [`Can you come to my hotel or home for ${nm.toLowerCase()}?`, 'Yes, pick-up and delivery to hotels and homes is free. We serve areas such as Konyaaltı, Muratpaşa, Lara, Güzeloba, Kundu, Belek, Side and Kemer.'],
    ],
    ru: [
      [`Где в Анталье сделать: ${s.vars.ru[0]}?`, `В мастерской Terzi Can в Хурме (Коньяалты). ${s.intro.ru} Выезд в отели и на дом бесплатный; работаем ежедневно 08:00–23:00.`],
      [`Сколько времени занимает «${nm}» и сколько это стоит?`, `${time}.${price ? ' ' + price + '; точная цена зависит от ткани и объёма работ.' : ' Пришлите фото вещи в WhatsApp — назовём цену.'}`],
      [`Приедете ли вы в отель или домой: «${nm}»?`, 'Да, забор и доставка в отели и на дом бесплатны. Работаем в Коньяалты, Муратпаше, Ларе, Гюзельобе, Кунду, Белеке, Сиде и Кемере.'],
    ],
    de: [
      [`Wo kann ich in Antalya „${s.vars.de[0]}“ lassen?`, `In der Werkstatt von Terzi Can in Hurma, Konyaaltı. ${s.intro.de} Kostenloser Service zu Hotels und nach Hause; täglich 08:00–23:00 geöffnet.`],
      [`Wie lange dauert „${nm}“ und was kostet es?`, `${time}.${price ? ' ' + price + '; der genaue Preis hängt vom Stoff und vom Aufwand ab.' : ' Foto des Kleidungsstücks per WhatsApp senden, dann nennen wir den Preis.'}`],
      [`Kommen Sie für „${nm}“ ins Hotel oder nach Hause?`, 'Ja, Abholung und Lieferung zu Hotels und nach Hause sind kostenlos. Wir sind in Konyaaltı, Muratpaşa, Lara, Güzeloba, Kundu, Belek, Side und Kemer unterwegs.'],
    ],
  }[lang] as [string, string][];
}

// ── Metadata ────────────────────────────────────────────────
export function districtMetadata(lang: Lang, d: District): Metadata {
  const c = districtCopy(lang, d);
  const url = abs(districtUrl(lang, d));
  const kw = [
    ...c.kw,
    ...SERVICES.slice(0, 8).map((s) => query(lang, d, s)),
    ...SERVICES.slice(0, 6).map((s) => `${d.name[lang]} ${s.vars[lang][0]}`),
  ];
  return {
    metadataBase: new URL(SITE),
    title: { absolute: c.title },
    description: c.desc,
    keywords: Array.from(new Set(kw)),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: alternatesFor((l) => abs(districtUrl(l, d))),
    openGraph: {
      title: c.title, description: c.desc, url, siteName: 'SwapHubs Terzi Can', locale: OG_LOCALE[lang], type: 'website',
      images: [{ url: OG, alt: c.title }],
    },
  };
}

export function serviceMetadata(lang: Lang, s: Service): Metadata {
  const c = serviceCopy(lang, s);
  const url = abs(serviceUrl(lang, s));
  return {
    metadataBase: new URL(SITE),
    title: { absolute: c.title },
    description: c.desc,
    keywords: Array.from(new Set([...s.vars[lang], ...s.vars[lang].slice(0, 3).map((v) => `${v} Antalya`)])),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: alternatesFor((l) => abs(serviceUrl(l, s))),
    openGraph: {
      title: c.title, description: c.desc, url, siteName: 'SwapHubs Terzi Can', locale: OG_LOCALE[lang], type: 'website',
      images: [{ url: OG, alt: c.title }],
    },
  };
}

export function hubMetadata(lang: Lang): Metadata {
  const title = {
    tr: 'Terzi Hizmetleri Antalya — Paça, Fermuar, Elbise Dikimi, Tadilat',
    en: 'Tailor Services in Antalya — Hemming, Zippers, Dress Making, Alterations',
    ru: 'Услуги портного в Анталье — подшив, молнии, пошив и переделка',
    de: 'Schneider-Leistungen in Antalya — Kürzen, Reißverschluss, Kleider, Änderungen',
  }[lang];
  const description = {
    tr: 'Paça kısaltma, bel daraltma, fermuar değişimi, elbise dikimi, elbise-ceket-mont-gömlek tadilatı, gelinlik ve abiye. Konyaaltı, Muratpaşa, Lara, Belek, Side, Kemer ve çevresi; otel ve eve ücretsiz servis.',
    en: 'Trouser hemming, waist alterations, zipper replacement, dress making, dress, jacket, coat and shirt alterations, wedding and evening gowns. Konyaaltı, Muratpaşa, Lara, Belek, Side, Kemer and more; free service to hotels and homes.',
    ru: 'Подшив брюк, ушивание, замена молнии, пошив платьев, переделка платьев, пиджаков, курток и рубашек, свадебные и вечерние платья. Коньяалты, Муратпаша, Лара, Белек, Сиде, Кемер; бесплатный выезд в отели и на дом.',
    de: 'Hose kürzen, Taille enger machen, Reißverschluss wechseln, Kleider nähen, Kleider, Sakkos, Mäntel und Hemden ändern, Braut- und Abendkleider. Konyaaltı, Muratpaşa, Lara, Belek, Side, Kemer; kostenloser Service zu Hotels und nach Hause.',
  }[lang];
  const url = abs(SERVICE_BASE[lang]);
  return {
    metadataBase: new URL(SITE),
    title: { absolute: title },
    description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: alternatesFor((l) => abs(SERVICE_BASE[l])),
    openGraph: { title, description, url, siteName: 'SwapHubs Terzi Can', locale: OG_LOCALE[lang], type: 'website', images: [{ url: OG, alt: title }] },
  };
}

// ── Ortak parçalar ──────────────────────────────────────────
function Shell({ lang, waMsg, children, footLinks }: { lang: Lang; waMsg: string; children: React.ReactNode; footLinks: { href: string; label: string }[] }) {
  const u = UI[lang];
  const href = WA(waMsg);
  return (
    <div lang={lang} className="sl-root">
      <div className="sl-float">
        <a href={`tel:${PHONE_TEL}`} className="sl-fbtn sl-fbtn-call" aria-label="Tel">📞</a>
        <a href={href} target="_blank" rel="noopener noreferrer" className="sl-fbtn sl-fbtn-wa" aria-label="WhatsApp">💬</a>
      </div>
      <nav className="sl-nav" aria-label="Navigation">
        <div className="sl-nav-logo"><span className="sl-nav-dot" aria-hidden="true" />TERZİ CAN</div>
        <a href={HUB_MAIN[lang]} className="sl-nav-home">{u.home}</a>
        <a href={href} target="_blank" rel="noopener noreferrer" className="sl-nav-wa">{u.wa}</a>
      </nav>
      {children}
      <footer className="sl-footer">
        <div>© {new Date().getFullYear()} {u.footer} · {PHONE}</div>
        <nav className="sl-foot-links" aria-label="Footer">
          {footLinks.map((l) => (<a key={l.href} href={l.href}>{l.label}</a>))}
          <a href={MAPS} target="_blank" rel="noopener noreferrer">Google Maps</a>
        </nav>
      </footer>
    </div>
  );
}

function Hero({ lang, tag, h1, desc, waMsg }: { lang: Lang; tag: string; h1: React.ReactNode; desc: string; waMsg: string }) {
  const u = UI[lang];
  return (
    <section className="sl-hero" aria-labelledby="hero-h">
      <div className="sl-hero-content">
        <span className="sl-hero-tag">{tag}</span>
        <h1 id="hero-h">{h1}</h1>
        <p className="sl-hero-desc">{desc}</p>
        <div className="sl-hero-btns">
          <a href={WA(waMsg)} target="_blank" rel="noopener noreferrer" className="sl-btn-primary">{u.waBtn}</a>
          <a href={`tel:${PHONE_TEL}`} className="sl-btn-secondary">📞 {PHONE}</a>
        </div>
      </div>
    </section>
  );
}

function Faq({ lang, items }: { lang: Lang; items: [string, string][] }) {
  return (
    <section className="sl-sec" id="faq" aria-labelledby="faq-h">
      <div className="sl-ctr" style={{ maxWidth: 720 }}>
        <div className="sl-sec-head"><h2 className="sl-sec-h sl-ff" id="faq-h">{UI[lang].faq}</h2></div>
        {items.map(([q, a]) => (
          <div key={q} className="sl-faq-item"><div className="sl-faq-q">{q}</div><div className="sl-faq-a">{a}</div></div>
        ))}
      </div>
    </section>
  );
}

function Cta({ lang, waMsg, text }: { lang: Lang; waMsg: string; text: string }) {
  const u = UI[lang];
  return (
    <section className="sl-cta-final" aria-label={u.ctaH}>
      <h2 className="sl-cta-h sl-ff">{u.ctaH}</h2>
      <p className="sl-cta-sub">{text}</p>
      <div className="sl-cta-btns">
        <a href={WA(waMsg)} target="_blank" rel="noopener noreferrer" className="sl-btn-white">{u.waBtn}</a>
        <a href={MAPS} target="_blank" rel="noopener noreferrer" className="sl-btn-outline-white">📍 Google Maps</a>
      </div>
    </section>
  );
}

const linkChip: React.CSSProperties = { display: 'inline-block', padding: '.35rem .75rem', border: '1px solid rgba(201,169,110,.25)', borderRadius: 999, fontSize: '.78rem', color: 'rgba(255,255,255,.75)', margin: '0 .4rem .5rem 0' };

function otherLangLinks(lang: Lang, urlFor: (l: Lang) => string) {
  const names: Record<Lang, string> = { tr: 'Türkçe', en: 'English', ru: 'Русский', de: 'Deutsch' };
  return (
    <section className="sl-sec" style={{ paddingTop: 0, paddingBottom: '1.5rem' }}>
      <div className="sl-ctr" style={{ maxWidth: 720 }}>
        <h2 style={{ fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', opacity: .55, marginBottom: '.9rem' }}>{UI[lang].otherLang}</h2>
        <div>
          {LANGS.filter((l) => l !== lang).map((l) => (
            <a key={l} href={urlFor(l)} hrefLang={l} lang={l} style={linkChip}>{names[l]}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BÖLGE SAYFASI ───────────────────────────────────────────
export function DistrictPage({ lang, d }: { lang: Lang; d: District }) {
  const u = UI[lang];
  const c = districtCopy(lang, d);
  const url = abs(districtUrl(lang, d));
  const idx = DISTRICTS.findIndex((x) => x.slug === d.slug);
  const faq = districtFaq(lang, d);
  const waMsg = {
    tr: `Merhaba, ${c.loc} terzi hizmeti almak istiyorum.`,
    en: `Hello, I need a tailor ${c.loc}.`,
    ru: `Здравствуйте, нужен портной ${c.loc}.`,
    de: `Hallo, ich brauche einen Schneider ${c.loc}.`,
  }[lang];
  const nearby = DISTRICTS.filter((x) => x.slug !== d.slug && x.kind === d.kind).slice(0, 8);
  const hotel = HOTEL_BASE[lang] && d.hotelSlug && OTEL_BOLGELERI.some((r) => r.slug === d.hotelSlug) ? `${HOTEL_BASE[lang]}/${d.hotelSlug}` : null;
  // Aynı bölge için farklı yazılışlar: her bölge hizmet varyantlarının farklı bir dilimini gösterir
  const popular = SERVICES.map((s, i) => {
    const v = s.vars[lang][(idx + i) % s.vars[lang].length];
    return lang === 'ru' ? `${v} ${d.loc.ru}` : lang === 'tr' ? `${d.loc.tr} ${v}` : `${v} ${d.loc[lang]}`;
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      businessNode(lang),
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title, description: c.desc, inLanguage: lang,
        isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': BUSINESS_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` }, dateModified: LAST_UPDATE,
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hero-h', '.hero-desc'] },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: SITE },
          { '@type': 'ListItem', position: 2, name: HUB_NAME[lang], item: abs(HUB_MAIN[lang]) },
          { '@type': 'ListItem', position: 3, name: d.name[lang], item: url },
        ],
      },
      {
        '@type': 'Service', '@id': `${url}#service`, provider: { '@id': BUSINESS_ID },
        serviceType: SERVICES.map((s) => s.name[lang]).slice(0, 8).join(', '),
        areaServed: { '@type': 'Place', name: `${d.name.en}, Antalya, Türkiye` },
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: url, servicePhone: PHONE_TEL },
        hasOfferCatalog: {
          '@type': 'OfferCatalog', name: SVC_HUB_NAME[lang],
          itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name[lang], url: abs(serviceUrl(lang, s)) } })),
        },
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };

  const h1 = {
    tr: (<>{d.name.tr} <span className="sl-accent">Terzi</span><br />Dikim, Tamir, Tadilat, Fermuar</>),
    en: (<>Tailor in <span className="sl-accent">{d.name.en}</span><br />Alterations, Repairs &amp; Dress Making</>),
    ru: (<>Портной <span className="sl-accent">{d.name.ru}</span><br />Подгонка, ремонт, пошив</>),
    de: (<>Schneider <span className="sl-accent">{d.name.de}</span><br />Änderungen, Reparatur &amp; Maßanfertigung</>),
  }[lang];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Shell lang={lang} waMsg={waMsg} footLinks={[
        { href: HUB_MAIN[lang], label: u.home.replace('← ', '') },
        { href: SERVICE_BASE[lang], label: u.all },
        { href: u.pricesHref, label: u.pricesLink },
      ]}>
        <Hero lang={lang} tag={`📍 ${d.name[lang]} · ${u.free} · ${u.hours}`} h1={h1}
          desc={`${districtAbout(lang, d)}`} waMsg={waMsg} />

        <section className="sl-sec" aria-labelledby="svc-h">
          <div className="sl-ctr">
            <div className="sl-sec-head">
              <span className="sl-eyebrow">{u.since} · {u.where}</span>
              <h2 className="sl-sec-h sl-ff" id="svc-h">{{
                tr: `${c.loc} Terzi Hizmetleri`, en: `Tailor Services ${c.loc}`, ru: `Услуги портного ${c.loc}`, de: `Schneider-Leistungen ${c.loc}`,
              }[lang]}</h2>
            </div>
            <div className="sl-price-grid">
              {SERVICES.map((s) => (
                <a key={s.id} href={serviceUrl(lang, s)} className="sl-price-card" style={{ display: 'block' }}>
                  <div className="sl-price-head">
                    <span className="sl-price-icon" aria-hidden="true">{s.icon}</span>
                    <div><div className="sl-price-tr">{s.name[lang]}</div><div className="sl-price-kw">{query(lang, d, s)}</div></div>
                  </div>
                  <p className="sl-price-desc">{s.intro[lang]}</p>
                  <div style={{ fontSize: '.78rem', color: '#C9A96E', fontWeight: 700 }}>
                    {timeOf(lang, s)}{priceOf(lang, s) ? ` · ${priceOf(lang, s)}` : ''}
                  </div>
                </a>
              ))}
            </div>
            <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.5)', marginTop: '1.2rem', textAlign: 'center' }}>{u.photoPrice}</p>
          </div>
        </section>

        <section className="sl-sec" style={{ background: 'rgba(0,0,0,.12)' }} aria-labelledby="pop-h">
          <div className="sl-ctr" style={{ maxWidth: 820 }}>
            <div className="sl-sec-head"><h2 className="sl-sec-h sl-ff" id="pop-h">{u.popular} — {d.name[lang]}</h2></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, columns: '2 260px', fontSize: '.84rem', lineHeight: 2, color: 'rgba(255,255,255,.7)' }}>
              {popular.map((p) => (<li key={p}>✂️ {p}</li>))}
            </ul>
            {hotel && (<p style={{ marginTop: '1.2rem', fontSize: '.84rem' }}><a href={hotel} style={{ color: '#C9A96E', fontWeight: 700 }}>{u.hotelLink} →</a></p>)}
          </div>
        </section>

        <Faq lang={lang} items={faq} />
        <Cta lang={lang} waMsg={waMsg} text={u.photoPrice} />

        <section className="sl-sec" aria-labelledby="near-h" style={{ paddingBottom: '1.5rem' }}>
          <div className="sl-ctr" style={{ maxWidth: 820 }}>
            <h2 id="near-h" style={{ fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', opacity: .55, marginBottom: '.9rem' }}>{u.nearby}</h2>
            <div>
              {nearby.map((x) => (<a key={x.slug} href={districtUrl(lang, x)} style={linkChip}>{x.name[lang]}</a>))}
              {d.slug === 'konyaalti' && MAHALLE_PAGES.map((m) => (<a key={m.href} href={m.href} style={linkChip}>{m.name[lang]}</a>))}
            </div>
          </div>
        </section>
        {otherLangLinks(lang, (l) => districtUrl(l, d))}
        <ReviewsBlock lang={lang === 'tr' ? 'tr' : 'en'} />
      </Shell>
    </>
  );
}

// ── HİZMET SAYFASI ──────────────────────────────────────────
export function ServicePage({ lang, s }: { lang: Lang; s: Service }) {
  const u = UI[lang];
  const c = serviceCopy(lang, s);
  const url = abs(serviceUrl(lang, s));
  const faq = serviceFaq(lang, s);
  const price = priceOf(lang, s);
  const waMsg = {
    tr: `Merhaba, ${s.name.tr.toLowerCase()} için fiyat ve süre öğrenmek istiyorum.`,
    en: `Hello, I would like a price and timing for: ${s.name.en}.`,
    ru: `Здравствуйте, хочу узнать цену и срок: ${s.name.ru}.`,
    de: `Hallo, ich möchte Preis und Dauer erfahren: ${s.name.de}.`,
  }[lang];
  const related = SERVICES.filter((x) => x.id !== s.id).slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      businessNode(lang),
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title, description: c.desc, inLanguage: lang,
        isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': BUSINESS_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` }, dateModified: LAST_UPDATE,
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hero-h', '.hero-desc'] },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: SITE },
          { '@type': 'ListItem', position: 2, name: SVC_HUB_NAME[lang], item: abs(SERVICE_BASE[lang]) },
          { '@type': 'ListItem', position: 3, name: s.name[lang], item: url },
        ],
      },
      {
        '@type': 'Service', '@id': `${url}#service`, name: s.name[lang], description: s.intro[lang], serviceType: s.name[lang],
        provider: { '@id': BUSINESS_ID },
        areaServed: DISTRICTS.map((d) => ({ '@type': 'Place', name: `${d.name.en}, Antalya` })),
        ...(s.priceFrom ? { offers: { '@type': 'Offer', priceCurrency: 'TRY', price: String(s.priceFrom), priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'TRY', minPrice: String(s.priceFrom) } } } : {}),
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Shell lang={lang} waMsg={waMsg} footLinks={[
        { href: HUB_MAIN[lang], label: u.home.replace('← ', '') },
        { href: SERVICE_BASE[lang], label: u.all },
        { href: u.pricesHref, label: u.pricesLink },
      ]}>
        <Hero lang={lang} tag={`${s.icon} ${u.free} · ${u.hours}`} h1={<>{s.name[lang]}<br /><span className="sl-accent">Antalya</span></>}
          desc={s.intro[lang]} waMsg={waMsg} />

        <section className="sl-sec" aria-labelledby="det-h">
          <div className="sl-ctr" style={{ maxWidth: 720 }}>
            <div className="sl-sec-head"><span className="sl-eyebrow">{u.since}</span><h2 className="sl-sec-h sl-ff" id="det-h">{s.name[lang]}</h2></div>
            <div className="sl-howto-list">
              <div className="sl-howto-item"><div className="sl-howto-t">{u.time}</div><div className="sl-howto-d">{timeOf(lang, s)}</div></div>
              {price && (<div className="sl-howto-item"><div className="sl-howto-t">{u.price}</div><div className="sl-howto-d">{price}</div></div>)}
              <div className="sl-howto-item"><div className="sl-howto-t">{u.free}</div><div className="sl-howto-d">{u.where} · {u.hours}</div></div>
            </div>
            {s.extra && (<p style={{ marginTop: '1.2rem', fontSize: '.84rem' }}><a href={s.extra.href} style={{ color: '#C9A96E', fontWeight: 700 }}>{s.extra.label[lang]} →</a></p>)}
          </div>
        </section>

        <section className="sl-sec" style={{ background: 'rgba(0,0,0,.12)' }} aria-labelledby="var-h">
          <div className="sl-ctr" style={{ maxWidth: 820 }}>
            <div className="sl-sec-head"><h2 className="sl-sec-h sl-ff" id="var-h">{u.popular}</h2></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, columns: '2 260px', fontSize: '.84rem', lineHeight: 2, color: 'rgba(255,255,255,.7)' }}>
              {s.vars[lang].map((v) => (<li key={v}>✂️ {v}</li>))}
            </ul>
          </div>
        </section>

        <section className="sl-sec" aria-labelledby="areas-h">
          <div className="sl-ctr" style={{ maxWidth: 900 }}>
            <div className="sl-sec-head"><h2 className="sl-sec-h sl-ff" id="areas-h">{u.districts}</h2></div>
            <div>
              {DISTRICTS.map((d) => (<a key={d.slug} href={districtUrl(lang, d)} style={linkChip}>{query(lang, d, s)}</a>))}
              {MAHALLE_PAGES.map((m) => (<a key={m.href} href={m.href} style={linkChip}>{m.name[lang]}</a>))}
            </div>
          </div>
        </section>

        <Faq lang={lang} items={faq} />
        <Cta lang={lang} waMsg={waMsg} text={u.photoPrice} />

        <section className="sl-sec" aria-labelledby="rel-h" style={{ paddingBottom: '1.5rem' }}>
          <div className="sl-ctr" style={{ maxWidth: 820 }}>
            <h2 id="rel-h" style={{ fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', opacity: .55, marginBottom: '.9rem' }}>{u.related}</h2>
            <div>{related.map((x) => (<a key={x.id} href={serviceUrl(lang, x)} style={linkChip}>{x.name[lang]}</a>))}</div>
          </div>
        </section>
        {otherLangLinks(lang, (l) => serviceUrl(l, s))}
        <ReviewsBlock lang={lang === 'tr' ? 'tr' : 'en'} />
      </Shell>
    </>
  );
}

// ── HİZMETLER ANA SAYFASI (4 dilde hub) ─────────────────────
export function HubPage({ lang }: { lang: Lang }) {
  const u = UI[lang];
  const url = abs(SERVICE_BASE[lang]);
  const title = (hubMetadata(lang).title as { absolute: string }).absolute;
  const desc = hubMetadata(lang).description as string;
  const waMsg = { tr: 'Merhaba, terzi hizmetleri hakkında bilgi almak istiyorum.', en: 'Hello, I would like information about your tailor services.', ru: 'Здравствуйте, хочу узнать об услугах портного.', de: 'Hallo, ich möchte Informationen zu Ihren Schneider-Leistungen.' }[lang];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      businessNode(lang),
      {
        '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: title, description: desc, inLanguage: lang,
        isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': BUSINESS_ID }, dateModified: LAST_UPDATE,
        mainEntity: { '@type': 'ItemList', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name[lang], url: abs(serviceUrl(lang, s)) })) },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: SITE },
          { '@type': 'ListItem', position: 2, name: SVC_HUB_NAME[lang], item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Shell lang={lang} waMsg={waMsg} footLinks={[
        { href: HUB_MAIN[lang], label: u.home.replace('← ', '') },
        { href: u.pricesHref, label: u.pricesLink },
      ]}>
        <Hero lang={lang} tag={`📍 ${u.where}`} h1={<>{SVC_HUB_NAME[lang]}<br /><span className="sl-accent">Antalya</span></>} desc={desc} waMsg={waMsg} />
        <section className="sl-sec" aria-labelledby="all-h">
          <div className="sl-ctr">
            <div className="sl-sec-head"><h2 className="sl-sec-h sl-ff" id="all-h">{u.svcWord}</h2></div>
            <div className="sl-price-grid">
              {SERVICES.map((s) => (
                <a key={s.id} href={serviceUrl(lang, s)} className="sl-price-card" style={{ display: 'block' }}>
                  <div className="sl-price-head"><span className="sl-price-icon" aria-hidden="true">{s.icon}</span><div className="sl-price-tr">{s.name[lang]}</div></div>
                  <p className="sl-price-desc">{s.intro[lang]}</p>
                  <div style={{ fontSize: '.78rem', color: '#C9A96E', fontWeight: 700 }}>{TIME_TEXT[s.time][lang] === timeOf(lang, s) ? TIME_TEXT[s.time][lang] : timeOf(lang, s)}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="sl-sec" style={{ background: 'rgba(0,0,0,.12)' }} aria-labelledby="dist-h">
          <div className="sl-ctr" style={{ maxWidth: 900 }}>
            <div className="sl-sec-head"><h2 className="sl-sec-h sl-ff" id="dist-h">{u.districts}</h2></div>
            <div>
              {DISTRICTS.map((d) => (<a key={d.slug} href={districtUrl(lang, d)} style={linkChip}>{d.name[lang]}</a>))}
              {MAHALLE_PAGES.map((m) => (<a key={m.href} href={m.href} style={linkChip}>{m.name[lang]}</a>))}
            </div>
          </div>
        </section>
        <Cta lang={lang} waMsg={waMsg} text={u.photoPrice} />
        {otherLangLinks(lang, (l) => SERVICE_BASE[l])}
        <ReviewsBlock lang={lang === 'tr' ? 'tr' : 'en'} />
      </Shell>
    </>
  );
}


// ── Mevcut Türkçe bölge sayfalarına eklenen anahtar kelime / hizmet bloğu ──
export function KeywordBlock({ slug }: { slug: string }) {
  const d = DISTRICTS.find((x) => x.slug === slug);
  if (!d) return null;
  const lang: Lang = 'tr';
  const idx = DISTRICTS.findIndex((x) => x.slug === d.slug);
  const popular = SERVICES.map((s, i) => `${d.loc.tr} ${s.vars.tr[(idx + i) % s.vars.tr.length]}`);
  return (
    <section className="sl-root" style={{ minHeight: 0, paddingBottom: 0 }} aria-labelledby="kw-h">
      <div className="sl-sec"><div className="sl-ctr" style={{ maxWidth: 900 }}>
        <h2 id="kw-h" className="sl-sec-h sl-ff" style={{ fontSize: '1.4rem' }}>{d.name.tr} — terzi hizmetleri</h2>
        <p className="sl-sec-sub" style={{ margin: '.6rem 0 1.2rem' }}>
          Paça kısaltma ve fermuar aynı gün; elbise, ceket, gömlek, mont ve abiye tadilatı 1 gün sonra; elbise dikimi 3 günde teslim. Gelinlik tadilatı ₺800&apos;den, abiye ₺400&apos;den. Otel ve eve ücretsiz servis, her gün 08:00–23:00.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, columns: '2 260px', fontSize: '.84rem', lineHeight: 2, color: 'rgba(255,255,255,.75)' }}>
          {popular.map((p) => (<li key={p}>✂️ {p}</li>))}
        </ul>
        <div style={{ marginTop: '1rem' }}>
          {SERVICES.map((s) => (<a key={s.id} href={serviceUrl(lang, s)} style={linkChip}>{s.name.tr}</a>))}
        </div>
        <div style={{ marginTop: '.6rem' }}>
          {/* DÜZELTME: `as Lang[]` yerine `as const` — böylece l yalnızca 'en' | 'ru' | 'de' olur
              ve aşağıdaki { en, ru, de }[l] indekslemesi 'tr' anahtarı yüzünden hata vermez. */}
          {(['en', 'ru', 'de'] as const).map((l) => (<a key={l} href={districtUrl(l, d)} hrefLang={l} lang={l} style={linkChip}>{{ en: 'English', ru: 'Русский', de: 'Deutsch' }[l]}</a>))}
        </div>
      </div></div>
    </section>
  );
}
