// ============================================================
// swaphubs.com — components/terzi/SeoLanding.tsx
// Bölge sayfaları (/antalya-terzi/[bolge] …) ve hizmet sayfaları (/terzi-hizmetleri/[hizmet] …)
// için 4 dilli, veri odaklı sunucu bileşenleri + metadata üreticileri.
// Veri: lib/seo-data.ts. Sadece doğrulanmış bilgi kullanılır (bkz. dosya başlığı).
// ============================================================
import { fitDesc } from '@/lib/meta-fit';
import type { Metadata } from 'next';
import ReviewsBlock from '@/components/ReviewsBlock';
import OrnekGorselSeridi from '@/components/terzi/OrnekGorselSeridi';
import type { GorselAnahtar } from '@/lib/ornek-gorseller';
import { reviewSchema } from '@/lib/reviews';
import { OTEL_BOLGELERI } from '@/lib/otel-bolgeleri';
import {
  DISTRICTS, SERVICES, MAHALLE_PAGES, LANGS, SITE, BUSINESS_ID, PHONE, PHONE_TEL, MAPS, LAST_UPDATE,
  SERVICE_BASE, HUB_MAIN, HOTEL_BASE,
  abs, districtUrl, serviceUrl, query, timeOf, priceOf, TIME_TEXT,
  type Lang, type District, type Service, type TimeKey,
  isTrNear, isIndexable, TR_NEAR_SLUGS, isFreeService } from '@/lib/seo-data';
import { angleFor, angleTitles, angleDescs, angleKeywords, unfreeDeep, unfree } from '@/lib/seo-angles';
import './seo-landing.css';
import { fgNearDistrict, fgServiceMeta } from '@/lib/fg-meta';
import { trNearDistrict } from '@/lib/tr-meta';
import { DISTRICT_FACTS } from '@/lib/district-facts';
import { CONTACT_URL } from '@/components/terzi/IletisimSayfasi';
import { DURATION, SERVICE_RULE, BUSINESS, areaServedSchema, waUrl } from '@/lib/business';
import { crossCanonical } from '@/lib/cross-canonical';
import { districtFaqItems, directAnswer, serviceRuleFor, processesFor, PROCESS, PROC_OF_SERVICE, pick, pickN, type ProcId } from '@/lib/bolge-icerik';
import { jsonLdString } from '@/lib/json-ld';

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
    mahalle: 'Konyaaltı mahalleleri', ctaH: 'Hemen Ulaşın', free: 'Otellere ücretsiz servis', paid: 'Eve servis ücreti bölgeye göre',
    hours: 'Her gün 08:00–23:00', since: "2006'dan beri", where: 'Atölye: Hurma Mahallesi, Konyaaltı, Antalya',
    contact: 'İletişim · Telefon', footer: 'Terzi Can · Hurma, Konyaaltı, Antalya', pricesLink: 'Terzi Can — Antalya terzi', pricesHref: '/terzi',
  },
  en: {
    home: '← Home', wa: 'WHATSAPP →', waBtn: '💬 Message us on WhatsApp →', brand: 'Terzi Can', svcWord: 'Services',
    popular: 'Popular searches', faq: 'Frequently Asked Questions', nearby: 'Nearby areas', all: 'All services',
    otherLang: 'Other languages', hotelLink: 'Hotel area page', districts: 'Areas we serve',
    related: 'Related services', time: 'Turnaround', price: 'Price', photoPrice: 'Send a photo and we will quote right away',
    mahalle: 'Konyaaltı neighbourhoods (Turkish)', ctaH: 'Get in Touch', free: 'Free service to hotels', paid: 'Home pick-up priced by area',
    hours: 'Open daily 08:00–23:00', since: 'Serving since 2006', where: 'Workshop: Hurma, Konyaaltı, Antalya',
    contact: 'Contact', footer: 'Terzi Can · Hurma, Konyaaltı, Antalya', pricesLink: 'Online tailor service Antalya', pricesHref: '/online-tailor-service',
  },
  ru: {
    home: '← Главная', wa: 'WHATSAPP →', waBtn: '💬 Написать в WhatsApp →', brand: 'Terzi Can', svcWord: 'Услуги',
    popular: 'Частые запросы', faq: 'Частые вопросы', nearby: 'Ближайшие районы', all: 'Все услуги',
    otherLang: 'Другие языки', hotelLink: 'Страница отельного района', districts: 'Районы обслуживания',
    related: 'Похожие услуги', time: 'Срок', price: 'Цена', photoPrice: 'Пришлите фото — сразу назовём цену',
    mahalle: 'Районы Коньяалты (тур.)', ctaH: 'Свяжитесь с нами', free: 'Бесплатный выезд в отели', paid: 'Выезд на дом — по району',
    hours: 'Ежедневно 08:00–23:00', since: 'Работаем с 2006 года', where: 'Мастерская: Хурма, Коньяалты, Анталья',
    contact: 'Контакты', footer: 'Terzi Can · Хурма, Коньяалты, Анталья', pricesLink: 'Ателье в Анталье', pricesHref: '/ru/atelie-antalya',
  },
  de: {
    home: '← Startseite', wa: 'WHATSAPP →', waBtn: '💬 Per WhatsApp schreiben →', brand: 'Terzi Can', svcWord: 'Leistungen',
    popular: 'Häufige Suchanfragen', faq: 'Häufige Fragen', nearby: 'Nahegelegene Gebiete', all: 'Alle Leistungen',
    otherLang: 'Andere Sprachen', hotelLink: 'Seite für das Hotelgebiet', districts: 'Gebiete, die wir bedienen',
    related: 'Ähnliche Leistungen', time: 'Dauer', price: 'Preis', photoPrice: 'Foto senden, Preis sofort per WhatsApp',
    mahalle: 'Stadtteile in Konyaaltı (türk.)', ctaH: 'Kontakt aufnehmen', free: 'Kostenloser Hotelservice', paid: 'Hausabholung je nach Gebiet',
    hours: 'Täglich 08:00–23:00', since: 'Seit 2006', where: 'Werkstatt: Hurma, Konyaaltı, Antalya',
    contact: 'Kontakt', footer: 'Terzi Can · Hurma, Konyaaltı, Antalya', pricesLink: 'Online Schneiderservice Antalya', pricesHref: '/de/online-schneiderservice-antalya',
  },
} as const;

const HUB_NAME: Record<Lang, string> = {
  tr: 'Antalya Terzi', en: 'Tailor Service Antalya', ru: 'Услуги портного Анталья', de: 'Schneiderservice Antalya',
};
const SVC_HUB_NAME: Record<Lang, string> = {
  tr: 'Terzi Hizmetleri', en: 'Tailor Services', ru: 'Услуги портного', de: 'Schneider-Leistungen',
};

// ── Ortak şema: işletme düğümü (ana sayfadaki @id ile aynı) ────
function businessNode(lang: Lang, withReviews = true) {
  // Tek işletme varlığı: tüm alanlar lib/business.ts'ten (NAP, saat, areaServed).
  const b = BUSINESS;
  return {
    '@type': ['LocalBusiness', 'ClothingStore'],
    // Yorum işaretlemesi yalnızca yorumların görünür olduğu sayfalarda (ReviewsBlock) eklenir
    ...(withReviews ? reviewSchema() : {}),
    '@id': BUSINESS_ID,
    name: b.name,
    alternateName: [...b.alternateName],
    url: `${SITE}/terzi`,
    telephone: b.phone,
    priceRange: b.priceRange,
    image: OG,
    hasMap: MAPS,
    address: { '@type': 'PostalAddress', ...b.address },
    geo: { '@type': 'GeoCoordinates', ...b.geo },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...b.hours.days], opens: b.hours.opens, closes: b.hours.closes,
    }],
    areaServed: areaServedSchema(),
    foundingDate: b.foundingYear,
    knowsLanguage: [...b.languages],
    availableLanguage: ['Turkish', 'English', 'Russian', 'German', 'Polish', 'Ukrainian', 'Dutch', 'French', 'Spanish', 'Arabic'],
    sameAs: [MAPS, waUrl(), 'https://terzihizmeti.com.tr'],
    inLanguage: lang,
  };
}

// EN/RU/DE bölge, hizmet ve hub sayfalarının terzihizmeti.com.tr'de birebir karşılığı var → canonical oraya (hreflang yok).
// Türkçe sayfalar swaphubs'ta canonical kalır; yabancı karşılıkları başka siteye canonical'landığı için hreflang verilmez
// (canonical ile çelişen, karşılıksız hreflang kümesi oluşmasın).
const alternatesFor = (lang: Lang, urlFor: (l: Lang) => string, _slug?: string) => {
  const own = urlFor(lang);
  const cross = crossCanonical(own.replace(SITE, ''));
  return cross ? { canonical: cross } : { canonical: own };
};
const _alternatesForOld = (lang: Lang, urlFor: (l: Lang) => string) => ({
  canonical: urlFor(lang),
  languages: { tr: urlFor('tr'), en: urlFor('en'), ru: urlFor('ru'), de: urlFor('de'), 'x-default': urlFor('tr') },
});

// ── Arama sorgusu odaklı başlık/açıklama yardımcıları ──────────────────────
const capFirst = (lang: Lang, t: string) => (t ? t.charAt(0).toLocaleUpperCase(lang === 'tr' ? 'tr-TR' : lang) + t.slice(1) : t);
const pickFit = (list: string[], max: number) => list.find((c) => c.length <= max) ?? list[list.length - 1];
const priceShortOf = (lang: Lang, s: Service) =>
  s.priceFrom ? (lang === 'tr' ? `₺${s.priceFrom}'den` : lang === 'en' ? `from ₺${s.priceFrom}` : lang === 'ru' ? `от ₺${s.priceFrom}` : `ab ₺${s.priceFrom}`) : '';
// Başlıklar için kısa süre ifadeleri (lib/business.ts DURATION'dan)
const TIME_SHORT: Record<Lang, Record<TimeKey, string>> = Object.fromEntries(LANGS.map((l) => [l, {
  repair: DURATION[l].normalShort, custom: DURATION[l].customShort, mixed: DURATION[l].normalShort,
}])) as Record<Lang, Record<TimeKey, string>>;

// ── Bölge önceliği: TR'de yerel mahalleler, yabancı dilde tatil bölgeleri öne ──
const TR_PRI = ['konyaalti', 'hurma', 'liman', 'gursu', 'uluc', 'altinkum', 'ogretmenevleri', 'arapsuyu', 'siteler', 'uncali', 'sarisu', 'meltem'];
const FG_PRI = ['konyaalti', 'muratpasa', 'side', 'aksu', 'kundu', 'belek', 'lara', 'kemer', 'beldibi'];
function sortD(lang: Lang, list: District[]): District[] {
  const pri = lang === 'tr' ? TR_PRI : FG_PRI;
  list = list.filter((x) => isIndexable(lang, x.slug)); // Türkçede uzak bölgeler listelenmez
  const rank = (x: District) => { const i = pri.indexOf(x.slug); return i < 0 ? 999 : i; };
  return [...list].sort((a, b) => rank(a) - rank(b));
}

// ── Atölyenin kendi sitesine (terzihizmeti.com.tr) doğal bağlantılar ──
const TZ_SITE = 'https://terzihizmeti.com.tr';
const TZ_DISTRICT_BASE: Record<Lang, string> = { tr: '/antalya-terzi', en: '/en/tailor-antalya', ru: '/ru/portnoy-antalya', de: '/de/schneider-antalya' };
const TZ_HUB: Record<Lang, string> = { tr: '/antalya-terzi', en: '/en/tailor-service-antalya', ru: '/ru/uslugi-portnogo-antalya', de: '/de/schneiderservice-antalya' };
function tzDistrictLink(lang: Lang, d: District): { href: string; label: string } | null {
  const n = d.name[lang];
  if (lang === 'tr') {
    if (d.slug === 'ogretmenevleri') return { href: `${TZ_SITE}${TZ_DISTRICT_BASE.tr}/${d.slug}`, label: `Terzi Can atölyesinin kendi sitesi: ${n} terzi` };
    if (d.slug === 'konyaalti') return { href: `${TZ_SITE}${TZ_HUB.tr}`, label: 'Terzi Can atölyesinin kendi sitesi: Antalya terzi' };
    return null;
  }
  if (!FG_PRI.includes(d.slug)) return null;
  const href = `${TZ_SITE}${TZ_DISTRICT_BASE[lang]}/${d.slug}`;
  const label = {
    en: `Terzi Can workshop website: tailor in ${n}`,
    ru: `Сайт мастерской Terzi Can: портной ${n}`,
    de: `Website der Werkstatt Terzi Can: Schneider ${n}`,
  }[lang];
  return { href, label };
}
const tzHubLabel: Record<Lang, string> = {
  tr: 'Terzi Can atölyesinin kendi sitesi: terzihizmeti.com.tr',
  en: 'Terzi Can workshop website: terzihizmeti.com.tr',
  ru: 'Сайт мастерской Terzi Can: terzihizmeti.com.tr',
  de: 'Website der Werkstatt Terzi Can: terzihizmeti.com.tr',
};

// ── Metin üreticileri ───────────────────────────────────────
// Eve ücretsiz servisin olmadığı bölgelerde rozet: otellere servis yine ücretsiz (lib/business.ts kuralı)
const SVC_FAR: Record<Lang, string> = {
  tr: 'Otellere ücretsiz servis', en: 'Free service to hotels', ru: 'Выезд в отели бесплатно', de: 'Hotelservice kostenlos',
};
const SVC_NEAR: Record<Lang, string> = {
  tr: 'Otele ve eve ücretsiz servis', en: 'Free hotel & home service', ru: 'Выезд в отель и на дом бесплатно', de: 'Hotel- & Hausservice kostenlos',
};

const LOCAL_UI: Record<Lang, { h: (n: string) => string; where: string; needs: string; hub: string }> = {
  tr: { h: (n) => `${n} hakkında`, where: 'Konum', needs: 'Bu bölgede en çok istenen işler', hub: 'Atölye: Hurma, Konyaaltı' },
  en: { h: (n) => `About ${n}`, where: 'Location', needs: 'Most common jobs from this area', hub: 'Workshop: Hurma, Konyaaltı' },
  ru: { h: (n) => `О районе: ${n}`, where: 'Расположение', needs: 'Что чаще всего приносят из этого района', hub: 'Мастерская: Хурма, Коньяалты' },
  de: { h: (n) => `Über ${n}`, where: 'Lage', needs: 'Häufigste Aufträge aus dieser Gegend', hub: 'Werkstatt: Hurma, Konyaaltı' },
};

function districtCopy(lang: Lang, d: District) {
  const r = _districtCopy(lang, d);
  return isFreeService(d.slug) ? r : unfreeDeep(lang, r);
}
function _districtCopy(lang: Lang, d: District) {
  const n = d.name[lang];
  const loc = d.loc[lang];
  const kw = (lang === 'tr' ? [`${n} terzi`, `${n} terzi hizmeti`, ...d.alias.map((a) => `${a} terzi`)] : []);
  const PH = `☎ ${PHONE}`;
  const titles = {
    tr: [`${n} Terzi Çağır: Paça, Fermuar, Tadilat | Terzi Can`, `${n} Terzi: Fiyat Al, Ertesi Gün Teslim | Terzi Can`, `${n} Terzi Hizmeti | Terzi Can`],
    en: [`Call a Tailor to ${n}, Antalya: Hemming, Zippers`, `Tailor ${n} Antalya: Get a Price on WhatsApp`, `Tailor in ${n}, Antalya`],
    ru: [`Вызвать портного: ${n}, Анталья, подшив, молнии`, `Портной ${n}: цена по фото в WhatsApp`, `Портной ${n}, Анталья`],
    de: [`Schneider rufen: ${n}, Antalya, Kürzen, Zipper`, `Schneider ${n}: Preis per WhatsApp-Foto`, `Schneider ${n}, Antalya`],
  }[lang];
  let title = pickFit(titles, 60);
  let desc = '';
  const far = !isFreeService(d.slug);
  const svcTr = far ? SVC_FAR.tr : SVC_NEAR.tr;
  const svcEn = far ? SVC_FAR.en : SVC_NEAR.en;
  const svcRu = far ? SVC_FAR.ru : SVC_NEAR.ru;
  const svcDe = far ? SVC_FAR.de : SVC_NEAR.de;
  const descs = {
    tr: [`${loc} terzi lazım mı? Kıyafetin fotoğrafını WhatsApp'tan at, fiyatı söyleyelim: paça ₺200'den, fermuar ₺300'den. ${svcTr}. ${PH}`,
         `${loc} terzi: fotoğraf at, fiyatı ve teslim gününü öğren. Paça ₺200'den, fermuar ₺300'den. ${PH}`,
         `${loc} terzi ${PH}: fotoğraf at, fiyat al.`],
    en: [`Need a tailor ${loc}? Send a photo on WhatsApp and get the price: hemming from ₺200, zippers from ₺300. ${svcEn}. ${PH}`,
         `Tailor ${loc}: send a photo, get price and ready date. Hemming from ₺200, zippers from ₺300. ${PH}`,
         `Tailor ${loc} ${PH}: send a photo, get a price.`],
    ru: [`Нужен портной ${loc}? Пришлите фото в WhatsApp — назовём цену: подшив от ₺200, молния от ₺300. ${svcRu}. ${PH}`,
         `Портной ${loc}: фото в WhatsApp, цена и срок в ответ. Подшив от ₺200, молния от ₺300. ${PH}`,
         `Портной ${loc} ${PH}: фото — и цена.`],
    de: [`Schneider ${loc} gesucht? Foto per WhatsApp senden, Preis kommt zurück: Kürzen ab ₺200, Reißverschluss ab ₺300. ${svcDe}. ${PH}`,
         `Schneider ${loc}: Foto senden, Preis und Termin erhalten. Kürzen ab ₺200, Reißverschluss ab ₺300. ${PH}`,
         `Schneider ${loc} ${PH}: Foto senden, Preis erhalten.`],
  }[lang];
  const priT: string[] = lang === 'tr'
    ? (TR_PRI.includes(d.slug) ? (d.slug === 'konyaalti' ? [`Konyaaltı Terzi Çağır: Hurma, Uncalı, Gürsu | Terzi Can`, `Konyaaltı Terzi Çağır: Paça, Fermuar, Tadilat | Terzi Can`] : [`${n} Terzi Çağır: Fiyat Al, Paça ₺200 | Terzi Can`, `${n} Terzi Çağır | Terzi Can`]) : [])
    : (FG_PRI.includes(d.slug) ? ({
      en: [`Tailor in ${n}: Hotel Pick-up, Price by Photo | Terzi Can`, `Tailor in ${n}, Antalya · Hotel Pick-up | Terzi Can`],
      ru: [`Портной ${n}: цена по фото, забор из отеля | Terzi Can`, `Портной ${n}, Анталья · из отеля | Terzi Can`],
      de: [`Schneider ${n}: Preis per Foto, Hotelabholung | Terzi Can`, `Schneider ${n}, Antalya · Hotelabholung | Terzi Can`],
    } as Record<string, string[]>)[lang] : []);
  const priD: string[] = lang === 'tr'
    ? (TR_PRI.includes(d.slug) ? (d.slug === 'konyaalti' ? [`Konyaaltı, Hurma, Liman, Uncalı, Gürsu'da terzi lazım mı? Fotoğrafı WhatsApp'tan at, fiyatı öğren: paça ₺200'den, fermuar ₺300'den. ${PH}`, `Konyaaltı terzi: Hurma, Liman, Uncalı, Gürsu. Fotoğraf at, fiyat al. Paça ₺200'den. ${PH}`] : [`${loc} terzi lazım mı? Fotoğraf at, ücreti öğren: paça ₺200'den, fermuar ₺300'den. ${svcTr}. ${PH}`, `${loc} terzi: fotoğraf at, ücreti öğren. Paça ₺200'den. ${PH}`]) : [])
    : (FG_PRI.includes(d.slug) ? ({
      en: [`Staying ${loc}? Send a photo on WhatsApp, get the price, and we collect from your hotel. Hemming from ₺200. ${PH}`, `Staying ${loc}? Photo on WhatsApp, price back, hotel pick-up. Hemming from ₺200. ${PH}`],
      ru: [`Отдыхаете ${loc}? Пришлите фото в WhatsApp — назовём цену и заберём вещь из отеля. Подшив от ₺200. ${PH}`, `Отдыхаете ${loc}? Фото в WhatsApp, цена в ответ, забор из отеля. ${PH}`],
      de: [`Urlaub ${loc}? Foto per WhatsApp senden, Preis erhalten, wir holen im Hotel ab. Kürzen ab ₺200. ${PH}`, `Urlaub ${loc}? Foto per WhatsApp, Preis zurück, Hotelabholung. ${PH}`],
    } as Record<string, string[]>)[lang] : []);
  if (priT.length) title = pickFit([...priT, ...titles], 60);
  desc = pickFit([...priD, ...descs], 158);
  // Bölge sayfası "açısı": her bölge farklı bir arama niyetine ağırlık verir (dikim / tamir-tadilat / fermuar-paça /
  // daraltma / keten-pamuk / üst giyim) → başlık, açıklama ve anahtar kelimeler sayfadan sayfaya farklı olur.
  // Tamir-tadilat açısı: Türkçede yalnızca yakın bölgelerde, yabancı dillerde tüm bölgelerde çıkabilir (lib/seo-angles.ts).
  {
    const near = isTrNear(d.slug);
    const order = lang === 'tr' ? Math.max(0, TR_NEAR_SLUGS.indexOf(d.slug)) : Math.max(0, DISTRICTS.findIndex((x) => x.slug === d.slug));
    const a = angleFor(lang, d.slug, near, order);
    const tail = ({ tr: `Fotoğraf at, fiyat al ${PH}`, en: `Photo in, price back ${PH}`, ru: `Фото — и цена ${PH}`, de: `Foto senden, Preis ${PH}` } as Record<string, string>)[lang];
    const ctx = { lang, n, loc, free: isFreeService(d.slug), tail };
    title = pickFit([...angleTitles(lang, a, n), ...titles], 60);
    desc = pickFit([...angleDescs(lang, a, ctx), ...priD, ...descs], 158);
    kw.push(...angleKeywords(lang, a, n));
    if (lang !== 'tr' && d.slug === 'konyaalti') {
      const MH = ['Hurma', 'Liman', 'Gürsu', 'Uncalı', 'Sarısu', 'Uluç', 'Siteler', 'Altınkum'];
      const T = ({ en: ['tailor', 'clothing repair', 'alterations', 'trouser hemming', 'jeans hemming', 'zipper replacement', 'waist taking in', 'dress alteration', 'custom dressmaking'],
        ru: ['портной', 'ремонт одежды', 'подгонка одежды', 'подшив брюк', 'подшив джинсов', 'замена молнии', 'ушить в талии', 'подгонка платья', 'пошив платья'],
        de: ['Schneider', 'Kleidung reparieren', 'Änderungsschneiderei', 'Hose kürzen', 'Jeans kürzen', 'Reißverschluss wechseln', 'Taille enger machen', 'Kleid ändern', 'Kleid nach Maß'] } as Record<string, string[]>)[lang];
      for (const m of MH) kw.push(...T.map((t) => `${m} ${t}`));
    }
    // Türkçe + yakın bölge: tüm tamir-tadilat / dikim aramaları her yakın sayfanın anahtar kelimelerinde bulunur.
    if (lang === 'tr' && near) {
      kw.push(`${n} terzi`, `${n} bay bayan terzi`, `${n} tamir tadilat`, `${n} paça kısaltma`, `${n} kot paçası kısaltma`, `${n} kot paçası daraltma`,
        `${n} fermuar değişimi`, `${n} fermuar tamiri`, `${n} pantolon kısaltma`, `${n} pantolon daraltma`, `${n} etek kısaltma`, `${n} bel daraltma`,
        `${n} şort kısaltma`, `${n} mont tamiri`, `${n} ceket daraltma`, `${n} ceket kısaltma`, `${n} elbise dikimi`, `${n} elbise daraltma`,
        `${n} abiye tamiri`, `${n} özel dikim`, `${n} bana yakın terzi`);
    }
    return metaOverride({ n, loc, kw, title, desc: isFreeService(d.slug) ? desc : unfree(lang, desc) });
  }
  return metaOverride({ n, loc, kw, title, desc: isFreeService(d.slug) ? desc : unfree(lang, desc) });

  function metaOverride(r: { n: string; loc: string; kw: string[]; title: string; desc: string }) {
    const o = lang === 'tr' ? trNearDistrict(d.slug, n, r.loc, PHONE, 'SwapHubs') : fgNearDistrict(lang, d.slug, n); // elle yazılmış meta (TR yakın bölgeler + EN/RU/DE)
    if (!o) return { ...r, title: pickFit(({ tr: [`${n} Terzi Çağır · Elbise Dikimi, Tamiri, Tadilatı`, `${n} Terzi Çağır: Dikim, Tamir, Tadilat | Antalya`, `${n} Terzi Çağır | Antalya Tadilat`, `${n} Terzi Çağır | Antalya`], en: [`Call a Tailor to ${n}, Antalya: Dressmaking, Repairs`, `Tailor ${n}, Antalya: Dressmaking, Alterations`, `Tailor in ${n}, Antalya`], ru: [`Вызвать портного: ${n}, Анталья, пошив и ремонт`, `Портной ${n}: пошив, ремонт, переделка`, `Портной ${n}, Анталья`], de: [`Schneider rufen: ${n}, Antalya, Nähen, Reparatur`, `Schneider ${n}: Nähen, Reparatur, Ändern`, `Schneider ${n}, Antalya`] } as Record<string, string[]>)[lang], 60) };
    return { n: r.n, loc: r.loc, kw: Array.from(new Set([...o.kw, ...r.kw])), title: pickFit(({ tr: [`${n} Terzi Çağır · Elbise Dikimi, Tamiri, Tadilatı`, `${n} Terzi Çağır: Dikim, Tamir, Tadilat | Antalya`, `${n} Terzi Çağır | Antalya Tadilat`, `${n} Terzi Çağır | Antalya`], en: [`Call a Tailor to ${n}, Antalya: Dressmaking, Repairs`, `Tailor ${n}, Antalya: Dressmaking, Alterations`, `Tailor in ${n}, Antalya`], ru: [`Вызвать портного: ${n}, Анталья, пошив и ремонт`, `Портной ${n}: пошив, ремонт, переделка`, `Портной ${n}, Анталья`], de: [`Schneider rufen: ${n}, Antalya, Nähen, Reparatur`, `Schneider ${n}: Nähen, Reparatur, Ändern`, `Schneider ${n}, Antalya`] } as Record<string, string[]>)[lang], 60), desc: (lang === 'tr' ? o.desc : r.desc) };
  }
}

function districtAbout(lang: Lang, d: District): string {
  // Bölge türüne göre 3 kalıptan biri slug'a göre seçilir; servis kuralı bölgeye göre eklenir.
  const n = d.name[lang];
  const loc = d.loc[lang];
  const rule = serviceRuleFor(lang, d.slug);
  const V: Record<Lang, Record<'central' | 'resort' | 'outer', string[]>> = {
    tr: {
      central: [
        `${loc} yaşayan ve çalışanlar kıyafetini Hurma'daki atölyeye getirebilir ya da adresinden aldırabilir.`,
        `${n} günlük işlerin yoğun olduğu bir bölge: iş pantolonu, okul kıyafeti, kot ve elbise düzeltmeleri en sık gelen işlerdir.`,
        `${n} için prova gereken işlerde ölçü yerinde alınabilir; basit kısaltma ve fermuar işlerinde fotoğraf genellikle yeterlidir.`,
      ],
      resort: [
        `${loc} otelde kalan misafirler için kıyafet otelden alınır, işlem atölyede yapılır ve otele geri getirilir.`,
        `Tatilde bozulan fermuar, söküğü açılan dikiş ya da özel bir akşam için daraltılması gereken elbise: ${n} otellerinden gelen işlerin çoğu bunlardır.`,
        `${n} otellerinden yazan misafirler için Türkçe, İngilizce, Rusça ve Almanca yazışılabilir; fotoğraf ve otel adı yeterlidir.`,
      ],
      outer: [
        `${loc} ev, işyeri ve siteler için alım-teslim yapılır; gün ve saat WhatsApp'ta birlikte planlanır.`,
        `${n} atölyeye uzak olduğundan işler genellikle tek seferde toplanır; birden fazla kıyafet varsa hepsini aynı fotoğraf mesajında göndermek kolaylık sağlar.`,
        `${n} için önce fotoğrafla fiyat netleşir, ardından alım günü belirlenir.`,
      ],
    },
    en: {
      central: [
        `People living or working ${loc} can bring garments to the workshop in Hurma or have them collected from their address.`,
        `${n} is a busy everyday area: work trousers, school uniforms, jeans and dress adjustments are the most common jobs.`,
        `For jobs that need a fitting ${loc}, measurements can be taken on site; for simple hems and zippers a photo is usually enough.`,
      ],
      resort: [
        `For guests staying at hotels ${loc}, the garment is collected from the hotel, worked on in the workshop and brought back.`,
        `A zipper that broke on holiday, a seam that opened, a dress to take in for a special dinner: most jobs from ${n} hotels look like this.`,
        `Guests in ${n} can write in English, Russian, German or Turkish; a photo and the hotel name are enough to start.`,
      ],
      outer: [
        `Pick-up and delivery is available for homes, offices and residential complexes ${loc}; day and time are agreed on WhatsApp.`,
        `As ${n} is further from the workshop, jobs are usually collected in one trip; if you have several garments, send them all in one photo message.`,
        `For ${n} the price is confirmed from a photo first, then a collection day is set.`,
      ],
    },
    ru: {
      central: [
        `Жители и работающие ${loc} могут принести вещи в мастерскую в Хурме или попросить забрать их по адресу.`,
        `${n} — район повседневных задач: рабочие брюки, школьная форма, джинсы и платья чаще всего требуют подгонки.`,
        `Если нужна примерка, мерки ${loc} можно снять на месте; для подшива и замены молнии обычно достаточно фото.`,
      ],
      resort: [
        `Для гостей отелей ${loc} вещь забирают из отеля, работу делают в мастерской и привозят обратно.`,
        `Сломанная в отпуске молния, разошедшийся шов, платье, которое нужно ушить к ужину, — так выглядит большинство заказов из отелей района ${n}.`,
        `Гости в районе ${n} могут писать по-русски, по-английски, по-немецки или по-турецки; достаточно фото и названия отеля.`,
      ],
      outer: [
        `Забираем и привозим вещи ${loc} — на дом, в офис или в жилой комплекс; день и время согласуем в WhatsApp.`,
        `Район ${n} дальше от мастерской, поэтому вещи обычно забирают за один выезд; если вещей несколько, пришлите их одним сообщением.`,
        `Для района ${n} сначала по фото согласуем цену, затем назначаем день забора.`,
      ],
    },
    de: {
      central: [
        `Wer ${loc} wohnt oder arbeitet, kann Kleidung in die Werkstatt in Hurma bringen oder an der Adresse abholen lassen.`,
        `${n} ist ein Alltagsviertel: Arbeitshosen, Schuluniformen, Jeans und Kleider werden hier am häufigsten angepasst.`,
        `Für Arbeiten mit Anprobe ${loc} kann vor Ort Maß genommen werden; bei einfachen Säumen und Reißverschlüssen genügt meist ein Foto.`,
      ],
      resort: [
        `Für Gäste in Hotels ${loc} wird die Kleidung im Hotel abgeholt, in der Werkstatt bearbeitet und zurückgebracht.`,
        `Ein im Urlaub kaputter Reißverschluss, eine offene Naht, ein Kleid, das für ein Abendessen enger muss: So sehen die meisten Aufträge aus Hotels in ${n} aus.`,
        `Gäste in ${n} können auf Deutsch, Englisch, Russisch oder Türkisch schreiben; ein Foto und der Hotelname reichen.`,
      ],
      outer: [
        `Abholung und Lieferung ${loc} für Wohnungen, Büros und Wohnanlagen; Tag und Uhrzeit werden per WhatsApp vereinbart.`,
        `Da ${n} weiter von der Werkstatt entfernt ist, werden Aufträge meist auf einer Fahrt gesammelt; mehrere Teile am besten in einer Nachricht schicken.`,
        `Für ${n} wird zuerst der Preis per Foto geklärt, danach der Abholtag festgelegt.`,
      ],
    },
  };
  return `${pick(`about:${d.slug}:${lang}`, V[lang][d.kind])} ${rule}.`;
}

function districtFaq(lang: Lang, d: District): [string, string][] {
  return districtFaqItems({ lang, slug: d.slug, n: d.name[lang], loc: d.loc[lang], resort: d.kind === 'resort', focus: [faqFocus(lang, d)] });
}
const PROC_H: Record<Lang, (loc: string) => string> = {
  tr: (loc) => `${loc} sık yapılan işler nasıl yapılır?`, en: (loc) => `How common jobs are done ${loc}`,
  ru: (loc) => `Как выполняются частые заказы ${loc}`, de: (loc) => `So werden häufige Aufträge ${loc} erledigt`,
};
function faqFocus(lang: Lang, d: District): ProcId {
  const near = isTrNear(d.slug);
  const order = lang === 'tr' ? Math.max(0, TR_NEAR_SLUGS.indexOf(d.slug)) : Math.max(0, DISTRICTS.findIndex((x) => x.slug === d.slug));
  return ANGLE_PROC[angleFor(lang, d.slug, near, order) % ANGLE_PROC.length];
}
// Bölgenin arama açısına göre öne çıkan süreç (seo-angles açı sırası: dikim, tamir, fermuar-paça, daraltma, keten, üst giyim, …)
const ANGLE_PROC: ProcId[] = ['ozel-dikim', 'kiyafet-tamiri', 'fermuar', 'bel', 'ozel-dikim', 'mont', 'gelinlik-abiye', 'paca', 'takim', 'kot', 'gomlek', 'etek'];

function serviceCopy(lang: Lang, s: Service) {
  const nm = s.name[lang];
  const q = s.q[lang];
  const Q = capFirst(lang, q);
  const ps = priceShortOf(lang, s);
  const ts = TIME_SHORT[lang][s.time];
  // Başlık: insanların yazdığı sorgu ifadesi + (varsa) fiyat + süre. SERP ~60 karakterde keser; sığan en zengin varyant seçilir.
  const t1 = {
    tr: [`${Q}? Antalya: ${ps}, ${ts} | Terzi Can`, `${Q}? Antalya, ${ts} | Terzi Can`, `${Q}? Antalya | Terzi Can`],
    en: [`${Q}? Antalya: ${ps}, ${ts} | Terzi Can`, `${Q}? Antalya, ${ts} | Terzi Can`, `${Q}? Antalya | Terzi Can`],
    ru: [`${Q}? Анталья: ${ps}, ${ts} | Terzi Can`, `${Q}? Анталья, ${ts} | Terzi Can`, `${Q}? Анталья | Terzi Can`],
    de: [`${Q}? Antalya: ${ps}, ${ts} | Terzi Can`, `${Q}? Antalya, ${ts} | Terzi Can`, `${Q}? Antalya | Terzi Can`],
  }[lang];
  const trPrice = lang === 'tr' && ps ? [`${Q} ücreti ne kadar? ${ps} 2026 | Terzi Can`, `${Q} ücreti ne kadar? ${ps} | Terzi Can`, `${Q} fiyatları 2026 · ${ps} | Terzi Can`] : [];
  const title = pickFit([...trPrice, ...(ps ? t1 : t1.slice(1))], 60);
  const price = priceShortOf(lang, s);
  const tm0 = timeOf(lang, s).replace(/[.\s]+$/, '');
  const tm = tm0.charAt(0).toLocaleLowerCase(lang === 'tr' ? 'tr-TR' : lang) + tm0.slice(1);
  // Açıklama: kullanıcının sorusunu aynen tekrar eden ilk cümle + cevap (süre, fiyat, saat, telefon).
  const lead = { tr: 'Fotoğrafını WhatsApp\'tan at,', en: 'Send a photo on WhatsApp,', ru: 'Пришлите фото в WhatsApp,', de: 'Foto per WhatsApp senden,' }[lang];
  const rep = { tr: 'fiyatı ve gününü söyleyelim.', en: 'we reply with price and date.', ru: 'ответим ценой и сроком.', de: 'wir nennen Preis und Termin.' }[lang];
  const open = { tr: 'Her gün 08:00–23:00', en: 'Daily 08:00–23:00', ru: 'Ежедневно 08:00–23:00', de: 'Täglich 08:00–23:00' }[lang];
  const pickup = { tr: 'otellere ücretsiz servis', en: 'free hotel pick-up', ru: 'выезд в отели бесплатно', de: 'Hotelabholung gratis' }[lang];
  const tel = `☎ ${PHONE}`;
  const priceTxt = price ? (lang === 'tr' ? `2026 fiyatı ${price}` : price) : '';
  const info = [tm, priceTxt].filter(Boolean).join(', ');
  const candidates = [
    `${nm}: ${info}. ${lead} ${rep} ${pickup}. ${tel}`,
    `${nm}: ${info}. ${lead} ${rep} ${tel}`,
    `${nm}: ${price || tm}. ${lead} ${rep} ${tel}`,
    `${nm}. ${lead} ${rep} ${tel}`,
    `${nm}. ${open}. ${tel}`,
  ];
  const desc = pickFit(candidates, 158);
  const o = lang === 'tr' ? undefined : fgServiceMeta(lang, s.id);
  if (o) return { nm, title: o.title, desc, kw: o.kw }; // swaphubs: açıklama bu sitenin kendi (fotoğraf-fiyat tonlu) metni; terzihizmeti ile aynı olmasın
  return { nm, title, desc, kw: [] as string[] };
}

function serviceFaq(lang: Lang, s: Service): [string, string][] {
  const nm = s.name[lang];
  const price = priceOf(lang, s);
  const time = timeOf(lang, s);
  const R = SERVICE_RULE[lang];
  const proc = PROCESS[PROC_OF_SERVICE[s.id] ?? 'kiyafet-tamiri'][lang];
  const D = DURATION[lang];
  const base: [string, string][] = {
    tr: [
      [`Antalya'da ${s.vars.tr[0]} nerede yapılır?`, `Terzi Can atölyesinde, Konyaaltı Hurma'da. ${s.intro.tr} ${R.full} Her gün 08:00–23:00 açıktır.`],
      [`${nm} ne kadar sürer, fiyatı ne kadar?`, `${time}.${price ? ' ' + price + '; kesin fiyat kumaşa ve işlem detayına göre söylenir.' : ' Fiyat için kıyafetin fotoğrafını WhatsApp\'tan gönderin.'}`],
      [`${nm} için otelime veya evime gelir misiniz?`, `Evet. ${R.full}`],
    ],
    en: [
      [`Where can I get ${s.vars.en[0]} in Antalya?`, `At the Terzi Can workshop in Hurma, Konyaaltı. ${s.intro.en} ${R.full} Open daily 08:00–23:00.`],
      [`How long does ${nm.toLowerCase()} take and what does it cost?`, `${time}.${price ? ' ' + price + '; the exact price depends on the fabric and the work.' : ' Send a photo of the garment on WhatsApp for a price.'}`],
      [`Can you come to my hotel or home for ${nm.toLowerCase()}?`, `Yes. ${R.full}`],
    ],
    ru: [
      [`Где в Анталье сделать: ${s.vars.ru[0]}?`, `В мастерской Terzi Can в Хурме (Коньяалты). ${s.intro.ru} ${R.full} Работаем ежедневно 08:00–23:00.`],
      [`Сколько времени занимает «${nm}» и сколько это стоит?`, `${time}.${price ? ' ' + price + '; точная цена зависит от ткани и объёма работ.' : ' Пришлите фото вещи в WhatsApp — назовём цену.'}`],
      [`Приедете ли вы в отель или домой: «${nm}»?`, `Да. ${R.full}`],
    ],
    de: [
      [`Wo kann ich in Antalya „${s.vars.de[0]}“ lassen?`, `In der Werkstatt von Terzi Can in Hurma, Konyaaltı. ${s.intro.de} ${R.full} Täglich 08:00–23:00 geöffnet.`],
      [`Wie lange dauert „${nm}“ und was kostet es?`, `${time}.${price ? ' ' + price + '; der genaue Preis hängt vom Stoff und vom Aufwand ab.' : ' Foto des Kleidungsstücks per WhatsApp senden, dann nennen wir den Preis.'}`],
      [`Kommen Sie für „${nm}“ ins Hotel oder nach Hause?`, `Ja. ${R.full}`],
    ],
  }[lang] as [string, string][];
  // Hizmete özgü süreç sorusu + (tamir/tadilat hizmetlerinde) acil iş sorusu
  const urgentQ: Record<Lang, string> = { tr: `${nm} acil yapılabilir mi?`, en: `Can ${nm.toLowerCase()} be done urgently?`, ru: `Можно ли сделать «${nm}» срочно?`, de: `Geht „${nm}“ auch dringend?` };
  const extra: [string, string][] = [[proc.h, proc.p]];
  if (s.time !== 'custom') extra.push([urgentQ[lang], `${D.urgent}. ${D.normal}.`]);
  return [...base, ...extra];
}

// ── Metadata ────────────────────────────────────────────────
// EN/RU/DE bölge sayfaları için ek anahtar kelimeler: ceket/mont, gömlek, etek, şort, fiyat, "yakınımda", otel, bay-bayan.
function foreignExtraKeywords(lang: Lang, n: string): string[] {
  if (lang === 'tr') return [];
  return ({
    en: [
      `tailor near me ${n}`, `tailor near hotels ${n}`, `${n} tailor for hotel guests`, `${n} tailor men and women`,
      `jacket alteration ${n}`, `coat alteration ${n}`, `shirt alteration ${n}`, `skirt hemming ${n}`, `shorts hemming ${n}`,
      `${n} alteration prices`, `${n} tailor price`, `hemming price ${n}`, `zipper replacement price ${n}`,
    ],
    ru: [
      `портной рядом ${n}`, `портной рядом с отелем ${n}`, `ателье для туристов ${n}`, `${n} ателье мужская и женская одежда`,
      `ремонт куртки ${n}`, `подгонка пиджака ${n}`, `переделка рубашки ${n}`, `укоротить юбку ${n}`, `подшить шорты ${n}`,
      `${n} ателье цены`, `${n} стоимость подшива`, `замена молнии цена ${n}`,
    ],
    de: [
      `Schneider in der Nähe ${n}`, `Schneider Hotel ${n}`, `Schneiderei für Hotelgäste ${n}`, `${n} Schneider Damen und Herren`,
      `Jacke ändern ${n}`, `Mantel kürzen ${n}`, `Hemd ändern ${n}`, `Rock kürzen ${n}`, `Shorts kürzen ${n}`,
      `${n} Änderungsschneiderei Preise`, `Hose kürzen Preis ${n}`, `Reißverschluss wechseln Preis ${n}`,
    ],
  } as Record<string, string[]>)[lang];
}

export function districtMetadata(lang: Lang, d: District): Metadata {
  const c = districtCopy(lang, d);
  const url = abs(districtUrl(lang, d));
  const kw = [
    ...c.kw,
    ...SERVICES.slice(0, 8).map((s) => query(lang, d, s)),
    ...SERVICES.slice(0, 6).map((s) => `${d.name[lang]} ${s.vars[lang][0]}`),
    ...foreignExtraKeywords(lang, d.name[lang]),
  ];
  return {
    metadataBase: new URL(SITE),
    title: { absolute: c.title },
    description: c.desc,
    keywords: Array.from(new Set(kw)),
    robots: !isIndexable(lang, d.slug)
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: alternatesFor(lang, (l) => abs(districtUrl(l, d)), d.slug),
    openGraph: {
      title: c.title, description: fitDesc(c.desc), url, siteName: 'SwapHubs Terzi Can', locale: OG_LOCALE[lang], type: 'website',
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
    description: fitDesc(c.desc),
    keywords: Array.from(new Set([
      ...c.kw,
      ...s.vars[lang],
      ...s.vars[lang].slice(0, 3).map((v) => `${v} Antalya`),
      // Aramada sık yazılan ek kalıplar: fiyat + bay/bayan + 7 gün açık (her hizmette o hizmetin kendi kelimesiyle)
      ...({
        tr: [`${s.vars.tr[0]} fiyatları 2026`, `${s.vars.tr[0]} bay bayan`, `${s.vars.tr[0]} haftanın 7 günü`, `${s.vars.tr[0]} Konyaaltı Hurma`],
        en: [`${s.vars.en[0]} price Antalya`, `${s.vars.en[0]} men and women`, `${s.vars.en[0]} open 7 days`],
        ru: [`${s.vars.ru[0]} цена Анталья`, `${s.vars.ru[0]} мужская и женская`, `${s.vars.ru[0]} 7 дней в неделю`],
        de: [`${s.vars.de[0]} Preis Antalya`, `${s.vars.de[0]} Damen und Herren`, `${s.vars.de[0]} 7 Tage geöffnet`],
      } as Record<string, string[]>)[lang],
    ])),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: alternatesFor(lang, (l) => abs(serviceUrl(l, s))),
    openGraph: {
      title: c.title, description: c.desc, url, siteName: 'SwapHubs Terzi Can', locale: OG_LOCALE[lang], type: 'website',
      images: [{ url: OG, alt: c.title }],
    },
  };
}

export function hubMetadata(lang: Lang): Metadata {
  const title = {
    tr: 'Terzi Çağır Antalya · Fotoğraf At, Fiyat Al',
    en: 'Antalya Tailor · Send a Photo, Get a Price',
    ru: 'Портной в Анталье · Фото и цена в WhatsApp',
    de: 'Schneider Antalya · Foto senden, Preis erhalten',
  }[lang];
  const description = {
    tr: `Bay bayan tamir tadilat: söküğü, yırtığı dikme, paça-etek kısaltma, fermuar değişimi. Konyaaltı, Hurma, Uncalı. Fotoğraf at, fiyat al. ☎ ${PHONE}`,
    en: `Clothing repair in Konyaaltı, Hurma, Liman, Arapsuyu: torn seams, hemming, zippers. Send a photo, get a price. ☎ ${PHONE}`,
    ru: `Ремонт одежды в Коньяалты, Хурме, Лимане, Арапсую: дырки, подшив от ₺200, молнии ₺300. Фото — и цена. Ежедневно. ☎ ${PHONE}`,
    de: `Kleidung reparieren in Konyaaltı, Hurma, Liman, Arapsuyu: Risse, Kürzen, Reißverschluss. Foto senden, Preis erhalten. ☎ ${PHONE}`,
  }[lang];
  const url = abs(SERVICE_BASE[lang]);
  return {
    metadataBase: new URL(SITE),
    title: { absolute: title },
    description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: alternatesFor(lang, (l) => abs(SERVICE_BASE[l])),
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
          <a href={CONTACT_URL[lang]} hrefLang={lang}>{u.contact}</a>
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
        <p className="sl-hero-desc" id="dogrudan-cevap">{desc}</p>
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

function otherLangLinks(lang: Lang, urlFor: (l: Lang) => string, only?: (l: Lang) => boolean) {
  const names: Record<Lang, string> = { tr: 'Türkçe', en: 'English', ru: 'Русский', de: 'Deutsch' };
  return (
    <section className="sl-sec" style={{ paddingTop: 0, paddingBottom: '1.5rem' }}>
      <div className="sl-ctr" style={{ maxWidth: 720 }}>
        <h2 style={{ fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', opacity: .55, marginBottom: '.9rem' }}>{UI[lang].otherLang}</h2>
        <div>
          {LANGS.filter((l) => l !== lang && (!only || only(l))).map((l) => (
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
  // Hizmet kartları: bölgenin açısına göre öne çıkan 6 hizmet (diğerleri bağlantı olarak); her bölgede farklı seçki
  const procs = processesFor(d.slug, [faqFocus(lang, d)]);
  const featIds = new Set<string>([...procs.map((p) => Object.keys(PROC_OF_SERVICE).find((k) => PROC_OF_SERVICE[k] === p) ?? ''), ...pickN(`feat:${d.slug}:${lang}`, SERVICES.map((x) => x.id), 6)]);
  const featured = SERVICES.filter((x) => featIds.has(x.id)).slice(0, 6);
  const nearby = DISTRICTS.filter((x) => x.slug !== d.slug && x.kind === d.kind && isIndexable(lang, x.slug)).slice(0, 8);
  const hotel = HOTEL_BASE[lang] && d.hotelSlug && OTEL_BOLGELERI.some((r) => r.slug === d.hotelSlug) ? `${HOTEL_BASE[lang]}/${d.hotelSlug}` : null;
  // Aynı bölge için farklı yazılışlar: her bölge hizmet varyantlarının farklı bir dilimini gösterir
  const popular = SERVICES.map((s, i) => {
    const v = s.vars[lang][(idx + i) % s.vars[lang].length];
    return lang === 'ru' ? `${v} ${d.loc.ru}` : lang === 'tr' ? `${d.loc.tr} ${v}` : `${v} ${d.loc[lang]}`;
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      businessNode(lang, false),
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title, description: c.desc, inLanguage: lang,
        isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': BUSINESS_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` }, dateModified: LAST_UPDATE,
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hero-h', '.sl-hero-desc'] },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: HUB_NAME[lang], item: abs(HUB_MAIN[lang]) },
          { '@type': 'ListItem', position: 2, name: d.name[lang], item: url },
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

  // H1 varyantları: slug'a göre deterministik seçilir (sayfalar birbirinin kopyası olmasın).
  const hv = [...d.slug].reduce((x, ch) => x + ch.charCodeAt(0), 0) % 4;
  const h1 = {
    tr: [
      (<>{d.name.tr} <span className="sl-accent">Terzi</span><br />Paça Kısaltma, Bel Daraltma, Fermuar Değişimi</>),
      (<>{d.loc.tr} <span className="sl-accent">Terzi Hizmeti</span><br />Pantolon paça, fermuar ve elbise tadilatı</>),
      (<>{d.loc.tr} <span className="sl-accent">Kıyafet Tadilatı</span><br />Acil işler 1–2 saatte, normal işler ertesi gün</>),
      (<>{d.name.tr} İçin <span className="sl-accent">Terzi</span><br />Fotoğrafı WhatsApp'tan gönderin, fiyatı öğrenin</>),
    ],
    en: [
      (<>Tailor in <span className="sl-accent">{d.name.en}</span><br />Hemming, Waist Taking-in, Zipper Replacement</>),
      (<><span className="sl-accent">{d.name.en}</span> Tailor Service<br />Trouser hemming, zipper repair and dress alterations</>),
      (<>Clothing Alterations {d.loc.en}<br /><span className="sl-accent">Urgent jobs in 1–2 hours, normal jobs next day</span></>),
      (<>Your Tailor {d.loc.en}<br /><span className="sl-accent">Send a photo on WhatsApp and get a price</span></>),
    ],
    ru: [
      (<>Портной <span className="sl-accent">{d.name.ru}</span><br />Подшив брюк, ушивание в талии, замена молнии</>),
      (<>Услуги портного {d.loc.ru}<br /><span className="sl-accent">Подшив брюк, замена молний, переделка платьев</span></>),
      (<>Подгонка одежды {d.loc.ru}<br /><span className="sl-accent">Срочно — за 1–2 часа, обычно — на следующий день</span></>),
      (<>Ваш портной {d.loc.ru}<br /><span className="sl-accent">Пришлите фото в WhatsApp — назовём цену</span></>),
    ],
    de: [
      (<>Schneider <span className="sl-accent">{d.name.de}</span><br />Hose kürzen, Taille enger, Reißverschluss wechseln</>),
      (<>Schneiderservice {d.loc.de}<br /><span className="sl-accent">Hosen kürzen, Reißverschluss wechseln, Kleider ändern</span></>),
      (<>Kleidung ändern {d.loc.de}<br /><span className="sl-accent">Eilig in 1–2 Stunden, normal am nächsten Tag</span></>),
      (<>Ihr Schneider {d.loc.de}<br /><span className="sl-accent">Foto per WhatsApp senden und Preis erfahren</span></>),
    ],
  }[lang][hv];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <Shell lang={lang} waMsg={waMsg} footLinks={[
        { href: HUB_MAIN[lang], label: u.home.replace('← ', '') },
        { href: SERVICE_BASE[lang], label: u.all },
        { href: u.pricesHref, label: u.pricesLink },
      ]}>
        <Hero lang={lang} tag={`📍 ${d.name[lang]} · ${!isFreeService(d.slug) ? SVC_FAR[lang] : SVC_NEAR[lang]} · ${u.hours}`} h1={h1}
          desc={directAnswer(lang, d.slug, d.name[lang], d.loc[lang], d.kind === 'resort')} waMsg={waMsg} />
        <section className="sl-sec" style={{ paddingBottom: 0 }}>
          <div className="sl-ctr" style={{ maxWidth: 820 }}>
            <p style={{ fontSize: '.95rem', lineHeight: 1.8, color: 'rgba(255,255,255,.8)', margin: 0 }}>{districtAbout(lang, d)}</p>
          </div>
        </section>

        {DISTRICT_FACTS[d.slug] && (
          <section className="sl-sec" aria-labelledby="local-h" style={{ paddingBottom: '1rem' }}>
            <div className="sl-ctr" style={{ maxWidth: 820 }}>
              <h2 className="sl-sec-h sl-ff" id="local-h" style={{ textAlign: 'left' }}>{LOCAL_UI[lang].h(d.name[lang])}</h2>
              <p style={{ fontSize: '.92rem', lineHeight: 1.8, color: 'rgba(255,255,255,.78)', margin: '.6rem 0' }}><strong>{LOCAL_UI[lang].where}:</strong> {DISTRICT_FACTS[d.slug].where[lang]}</p>
              <p style={{ fontSize: '.92rem', lineHeight: 1.8, color: 'rgba(255,255,255,.78)', margin: '.6rem 0' }}><strong>{LOCAL_UI[lang].needs}:</strong> {DISTRICT_FACTS[d.slug].needs[lang]}</p>
              <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.5)', margin: '.6rem 0 0' }}>{LOCAL_UI[lang].hub}</p>
            </div>
          </section>
        )}

        <section className="sl-sec" aria-labelledby="svc-h">
          <div className="sl-ctr">
            <div className="sl-sec-head">
              <span className="sl-eyebrow">{u.since} · {u.where}</span>
              <h2 className="sl-sec-h sl-ff" id="svc-h">{{
                tr: `${c.loc} Terzi Hizmetleri`, en: `Tailor Services ${c.loc}`, ru: `Услуги портного ${c.loc}`, de: `Schneider-Leistungen ${c.loc}`,
              }[lang]}</h2>
            </div>
            <div className="sl-price-grid">
              {featured.map((s) => (
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
            <div style={{ marginTop: '1.2rem' }}>
              {SERVICES.filter((s) => !featured.includes(s)).map((s) => (<a key={s.id} href={serviceUrl(lang, s)} style={linkChip}>{s.name[lang]}</a>))}
            </div>
            <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.5)', marginTop: '1.2rem', textAlign: 'center' }}>{u.photoPrice}</p>
          </div>
        </section>

        <section className="sl-sec" aria-labelledby="proc-h">
          <div className="sl-ctr" style={{ maxWidth: 820 }}>
            <div className="sl-sec-head"><h2 className="sl-sec-h sl-ff" id="proc-h">{PROC_H[lang](c.loc)}</h2></div>
            {procs.map((id) => (
              <div key={id} style={{ marginBottom: '1.1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 .3rem', color: '#C9A96E' }}>{PROCESS[id][lang].h}</h3>
                <p style={{ fontSize: '.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,.78)', margin: 0 }}>{PROCESS[id][lang].p}</p>
              </div>
            ))}
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.6)', marginTop: '.8rem' }}>{DURATION[lang].all}</p>
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
            {(() => { const tz = tzDistrictLink(lang, d); return tz ? (<p style={{ marginTop: '1rem', fontSize: '.9rem' }}><a href={tz.href} hrefLang={lang} style={{ textDecoration: 'underline' }}>{tz.label}</a></p>) : null; })()}
          </div>
        </section>
        {otherLangLinks(lang, (l) => districtUrl(l, d), (l) => isIndexable(l, d.slug))}
      </Shell>
    </>
  );
}

// ── HİZMET SAYFASI ──────────────────────────────────────────
// Hizmete göre örnek görseller (yapay zekâ ile üretilmiş; 'örnek görsel' etiketli)
const HIZMET_GORSEL: Record<string, GorselAnahtar[]> = {
  paca: ['yun-pantolon-metre', 'keten-pantolon-katli'], kot: ['yun-pantolon-metre', 'keten-pantolon-katli'],
  fermuar: ['polar-yelek', 'kadin-trenckot-atolye'],
  'elbise-dikim': ['abiye-elbise-atolye', 'keten-blazer-atolye', 'manken-bej-ceket'], 'ozel-dikim': ['abiye-elbise-atolye', 'keten-blazer-atolye', 'manken-bej-ceket'],
  'elbise-tamir': ['abiye-elbise-atolye', 'abiye-askida'], 'gece-kiyafeti': ['abiye-elbise-atolye', 'abiye-askida'], 'gelinlik-abiye': ['abiye-askida', 'abiye-elbise-atolye'],
  takim: ['erkek-takim-olcu', 'manken-palto-takim'], mont: ['erkek-palto-atolye', 'palto-yaka-detay', 'kadin-trenckot-atolye'],
  gomlek: ['beyaz-gomlek-katli', 'erkek-gomlek-atolye'], tisort: ['sweatshirt-katli'], etek: ['pilili-etek'],
  'kiyafet-tamiri': ['erkek-takim-olcu', 'beyaz-gomlek-katli', 'pilili-etek'], beden: ['erkek-takim-olcu', 'beyaz-gomlek-katli', 'pilili-etek'],
};

const HIZMET_KONU: Record<string, 'paca' | 'fermuar' | 'gelinlik' | 'hizmet'> = { paca: 'paca', kot: 'paca', fermuar: 'fermuar', 'gelinlik-abiye': 'gelinlik', 'elbise-dikim': 'gelinlik', 'elbise-tamir': 'gelinlik', 'gece-kiyafeti': 'gelinlik' };

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
      businessNode(lang, false),
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title, description: c.desc, inLanguage: lang,
        isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': BUSINESS_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` }, dateModified: LAST_UPDATE,
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hero-h', '.sl-hero-desc'] },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: `${SITE}/terzi` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <Shell lang={lang} waMsg={waMsg} footLinks={[
        { href: HUB_MAIN[lang], label: u.home.replace('← ', '') },
        { href: SERVICE_BASE[lang], label: u.all },
        { href: u.pricesHref, label: u.pricesLink },
      ]}>
        <Hero lang={lang} tag={`${s.icon} ${u.free} · ${u.hours}`} h1={<>{s.name[lang]}<br /><span className="sl-accent">Antalya</span></>}
          desc={`${s.intro[lang]} ${timeOf(lang, s)}.`} waMsg={waMsg} />

        <section className="sl-sec" aria-labelledby="det-h">
          <div className="sl-ctr" style={{ maxWidth: 720 }}>
            <div className="sl-sec-head"><span className="sl-eyebrow">{u.since}</span><h2 className="sl-sec-h sl-ff" id="det-h">{s.name[lang]}</h2></div>
            <div className="sl-howto-list">
              <div className="sl-howto-item"><div className="sl-howto-t">{u.time}</div><div className="sl-howto-d">{timeOf(lang, s)}</div></div>
              {price && (<div className="sl-howto-item"><div className="sl-howto-t">{u.price}</div><div className="sl-howto-d">{price}</div></div>)}
              <div className="sl-howto-item"><div className="sl-howto-t">{u.free}</div><div className="sl-howto-d">{SERVICE_RULE[lang].full}</div></div>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.4rem 0 .3rem', color: '#C9A96E' }}>{PROCESS[PROC_OF_SERVICE[s.id] ?? 'kiyafet-tamiri'][lang].h}</h3>
            <p style={{ fontSize: '.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,.78)', margin: 0 }}>{PROCESS[PROC_OF_SERVICE[s.id] ?? 'kiyafet-tamiri'][lang].p}</p>
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
              {sortD(lang, DISTRICTS).map((d) => (<a key={d.slug} href={districtUrl(lang, d)} style={linkChip}>{query(lang, d, s)}</a>))}
              {MAHALLE_PAGES.map((m) => (<a key={m.href} href={m.href} style={linkChip}>{m.name[lang]}</a>))}
            </div>
          </div>
        </section>

        {HIZMET_GORSEL[s.id] && <OrnekGorselSeridi konu={HIZMET_KONU[s.id] || 'hizmet'} lang={lang} anahtarlar={HIZMET_GORSEL[s.id]} sayfaUrl={url} base={SITE} />}

        <Faq lang={lang} items={faq} />
        <Cta lang={lang} waMsg={waMsg} text={u.photoPrice} />

        <section className="sl-sec" aria-labelledby="rel-h" style={{ paddingBottom: '1.5rem' }}>
          <div className="sl-ctr" style={{ maxWidth: 820 }}>
            <h2 id="rel-h" style={{ fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', opacity: .55, marginBottom: '.9rem' }}>{u.related}</h2>
            <div>{related.map((x) => (<a key={x.id} href={serviceUrl(lang, x)} style={linkChip}>{x.name[lang]}</a>))}</div>
          </div>
        </section>
        {otherLangLinks(lang, (l) => serviceUrl(l, s))}
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
          { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: `${SITE}/terzi` },
          { '@type': 'ListItem', position: 2, name: SVC_HUB_NAME[lang], item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
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
              {sortD(lang, DISTRICTS).map((d) => (<a key={d.slug} href={districtUrl(lang, d)} style={linkChip}>{d.name[lang]}</a>))}
              {MAHALLE_PAGES.map((m) => (<a key={m.href} href={m.href} style={linkChip}>{m.name[lang]}</a>))}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '.9rem' }}><a href={`${TZ_SITE}${TZ_HUB[lang]}`} hrefLang={lang} style={{ textDecoration: 'underline' }}>{tzHubLabel[lang]}</a></p>
          </div>
        </section>
        <Cta lang={lang} waMsg={waMsg} text={u.photoPrice} />
        {otherLangLinks(lang, (l) => SERVICE_BASE[l])}
        <ReviewsBlock lang={lang} />
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
          {DURATION.tr.all} Gelinlik ve abiye tadilatı ₺800&apos;den başlar. {serviceRuleFor('tr', d.slug)}; her gün 08:00–23:00.
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
