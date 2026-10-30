// ============================================================
// swaphubs.com — components/terzi/SeoLanding.tsx
// Bölge sayfaları (/antalya-terzi/[bolge] …) ve hizmet sayfaları (/terzi-hizmetleri/[hizmet] …)
// için 4 dilli, veri odaklı sunucu bileşenleri + metadata üreticileri.
// Veri: lib/seo-data.ts. Sadece doğrulanmış bilgi kullanılır (bkz. dosya başlığı).
// ============================================================
import type { Metadata } from 'next';
import ReviewsBlock from '@/components/ReviewsBlock';
import { reviewSchema } from '@/lib/reviews';
import { OTEL_BOLGELERI } from '@/lib/otel-bolgeleri';
import {
  DISTRICTS, SERVICES, MAHALLE_PAGES, LANGS, SITE, BUSINESS_ID, PHONE, PHONE_TEL, MAPS, LAST_UPDATE,
  SERVICE_BASE, HUB_MAIN, HOTEL_BASE,
  abs, districtUrl, serviceUrl, query, timeOf, priceOf, TIME_TEXT,
  type Lang, type District, type Service,
  isTrNear, isIndexable, TR_NEAR_SLUGS, isFreeService } from '@/lib/seo-data';
import { angleFor, angleTitles, angleDescs, angleKeywords, unfreeDeep, unfree } from '@/lib/seo-angles';
import './seo-landing.css';
import { fgNearDistrict, fgServiceMeta } from '@/lib/fg-meta';
import { trNearDistrict } from '@/lib/tr-meta';
import { DISTRICT_FACTS } from '@/lib/district-facts';
import { CONTACT_URL } from '@/components/terzi/IletisimSayfasi';

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
    mahalle: 'Konyaaltı mahalleleri', ctaH: 'Hemen Ulaşın', free: 'Otel ve eve ücretsiz servis', paid: 'Servis ücreti bölgeye göre',
    hours: 'Her gün 08:00–23:00', since: "2006'dan beri", where: 'Atölye: Hurma Mahallesi, Konyaaltı, Antalya',
    contact: 'İletişim · Telefon', footer: 'Terzi Can · Hurma, Konyaaltı, Antalya', pricesLink: 'Terzi Can — Antalya terzi', pricesHref: '/terzi',
  },
  en: {
    home: '← Home', wa: 'WHATSAPP →', waBtn: '💬 Message us on WhatsApp →', brand: 'Terzi Can', svcWord: 'Services',
    popular: 'Popular searches', faq: 'Frequently Asked Questions', nearby: 'Nearby areas', all: 'All services',
    otherLang: 'Other languages', hotelLink: 'Hotel area page', districts: 'Areas we serve',
    related: 'Related services', time: 'Turnaround', price: 'Price', photoPrice: 'Send a photo and we will quote right away',
    mahalle: 'Konyaaltı neighbourhoods (Turkish)', ctaH: 'Get in Touch', free: 'Free service to hotels and homes', paid: 'Pick-up priced by area',
    hours: 'Open daily 08:00–23:00', since: 'Serving since 2006', where: 'Workshop: Hurma, Konyaaltı, Antalya',
    contact: 'Contact', footer: 'Terzi Can · Hurma, Konyaaltı, Antalya', pricesLink: 'Online tailor service Antalya', pricesHref: '/online-tailor-service',
  },
  ru: {
    home: '← Главная', wa: 'WHATSAPP →', waBtn: '💬 Написать в WhatsApp →', brand: 'Terzi Can', svcWord: 'Услуги',
    popular: 'Частые запросы', faq: 'Частые вопросы', nearby: 'Ближайшие районы', all: 'Все услуги',
    otherLang: 'Другие языки', hotelLink: 'Страница отельного района', districts: 'Районы обслуживания',
    related: 'Похожие услуги', time: 'Срок', price: 'Цена', photoPrice: 'Пришлите фото — сразу назовём цену',
    mahalle: 'Районы Коньяалты (тур.)', ctaH: 'Свяжитесь с нами', free: 'Бесплатный выезд в отели и на дом', paid: 'Выезд — по району',
    hours: 'Ежедневно 08:00–23:00', since: 'Работаем с 2006 года', where: 'Мастерская: Хурма, Коньяалты, Анталья',
    contact: 'Контакты', footer: 'Terzi Can · Хурма, Коньяалты, Анталья', pricesLink: 'Ателье в Анталье', pricesHref: '/ru/atelie-antalya',
  },
  de: {
    home: '← Startseite', wa: 'WHATSAPP →', waBtn: '💬 Per WhatsApp schreiben →', brand: 'Terzi Can', svcWord: 'Leistungen',
    popular: 'Häufige Suchanfragen', faq: 'Häufige Fragen', nearby: 'Nahegelegene Gebiete', all: 'Alle Leistungen',
    otherLang: 'Andere Sprachen', hotelLink: 'Seite für das Hotelgebiet', districts: 'Gebiete, die wir bedienen',
    related: 'Ähnliche Leistungen', time: 'Dauer', price: 'Preis', photoPrice: 'Foto senden, Preis sofort per WhatsApp',
    mahalle: 'Stadtteile in Konyaaltı (türk.)', ctaH: 'Kontakt aufnehmen', free: 'Kostenloser Service zu Hotels und nach Hause', paid: 'Abholung je nach Gebiet',
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
function businessNode(lang: Lang) {
  return {
    '@type': ['LocalBusiness', 'ClothingStore'],
    ...reviewSchema(),
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
    geo: { '@type': 'GeoCoordinates', latitude: 36.8572868, longitude: 30.5970193 },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00', closes: '23:00',
    }],
    foundingDate: '2006',
    knowsLanguage: ['tr', 'en', 'ru', 'de', 'pl', 'uk', 'nl', 'fr', 'es', 'ar'],
    availableLanguage: ['Turkish', 'English', 'Russian', 'German', 'Polish', 'Ukrainian', 'Dutch', 'French', 'Spanish', 'Arabic'],
    sameAs: [MAPS, `https://wa.me/${PHONE_TEL.replace('+', '')}`, 'https://terzihizmeti.com.tr'],
    inLanguage: lang,
  };
}

const alternatesFor = (lang: Lang, urlFor: (l: Lang) => string, slug?: string) => {
  // Uzak bölgenin Türkçe sayfası noindex olduğu için hreflang'a girmez; x-default İngilizce olur.
  const trOk = !slug || isTrNear(slug);
  const languages: Record<string, string> = {};
  if (trOk) languages.tr = urlFor('tr');
  languages.en = urlFor('en'); languages.ru = urlFor('ru'); languages.de = urlFor('de');
  languages['x-default'] = urlFor(trOk ? 'tr' : 'en');
  return { canonical: urlFor(lang), languages };
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
const TIME_SHORT: Record<Lang, Record<'same' | 'next' | 'three' | 'none', string>> = {
  tr: { same: 'Aynı Gün', next: 'Ertesi Gün', three: '3 Günde', none: 'Yakınınızda' },
  en: { same: 'Same Day', next: 'Next Day', three: 'In 3 Days', none: 'Near You' },
  ru: { same: 'В тот же день', next: 'За 1 день', three: 'За 3 дня', none: 'Рядом' },
  de: { same: 'Am selben Tag', next: 'Am nächsten Tag', three: 'In 3 Tagen', none: 'In der Nähe' },
};

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
const SVC_FAR: Record<Lang, string> = {
  tr: "Alım-teslim WhatsApp'tan planlanır", en: 'Collection & delivery planned on WhatsApp',
  ru: 'Забор и доставка — в WhatsApp', de: 'Abholung & Lieferung per WhatsApp',
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
    tr: [`${n} Terzi Çağır: Paça, Fermuar, Tadilat | Terzi Can`, `${n} Terzi: Fiyat Al, Aynı Gün Teslim | Terzi Can`, `${n} Terzi Hizmeti | Terzi Can`],
    en: [`Call a Tailor to ${n}, Antalya: Hemming, Zippers`, `Tailor ${n} Antalya: Get a Price on WhatsApp`, `Tailor in ${n}, Antalya`],
    ru: [`Вызвать портного: ${n}, Анталья, подшив, молнии`, `Портной ${n}: цена по фото в WhatsApp`, `Портной ${n}, Анталья`],
    de: [`Schneider rufen: ${n}, Antalya, Kürzen, Zipper`, `Schneider ${n}: Preis per WhatsApp-Foto`, `Schneider ${n}, Antalya`],
  }[lang];
  let title = pickFit(titles, 60);
  let desc = '';
  const far = !isFreeService(d.slug);
  const svcTr = far ? 'Alım-teslim WhatsApp\'tan planlanır' : 'Otele ve eve ücretsiz servis';
  const svcEn = far ? 'Collection and delivery planned on WhatsApp' : 'Free service to hotels and homes';
  const svcRu = far ? 'Забор и доставка согласуются в WhatsApp' : 'Бесплатный выезд в отели и на дом';
  const svcDe = far ? 'Abholung und Lieferung per WhatsApp geplant' : 'Kostenloser Service zu Hotels und nach Hause';
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
  const r = _districtAbout(lang, d);
  return isFreeService(d.slug) ? r : unfreeDeep(lang, r);
}
function _districtAbout(lang: Lang, d: District): string {
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
  const r = _districtFaq(lang, d);
  return isFreeService(d.slug) ? r : unfreeDeep(lang, r);
}
function _districtFaq(lang: Lang, d: District): [string, string][] {
  const loc = d.loc[lang];
  const n = d.name[lang];
  const fact = DISTRICT_FACTS[d.slug];
  const extra: [string, string][] = fact ? [[{
    tr: `${n} nerede, ${loc} terzi hizmeti nasıl işliyor?`, en: `Where is ${n} and how does the tailor service work ${loc}?`,
    ru: `Где находится ${n} и как работает услуга портного ${loc}?`, de: `Wo liegt ${n} und wie funktioniert der Schneiderservice ${loc}?`,
  }[lang], `${fact.where[lang]} ${fact.needs[lang]}`]] : [];
  const base = districtFaqBase(lang, d, loc, n);
  const far = !isFreeService(d.slug);
  const farFix: [string, string][] = [
    ['otel ve eve servis ücretsizdir', "alım-teslim WhatsApp'tan planlanır"],
    ['service to hotels and homes is free', 'collection and delivery are planned on WhatsApp'],
    ['выезд в отели и на дом бесплатный', 'забор и доставка согласуются в WhatsApp'],
    ['der Service zu Hotels und nach Hause ist kostenlos', 'Abholung und Lieferung werden per WhatsApp geplant'],
  ];
  const fixed = far ? base.map(([q, an]) => [q, farFix.reduce((t, [x, y]) => t.split(x).join(y), an)] as [string, string]) : base;
  return [...fixed, ...extra];
}

function districtFaqBase(lang: Lang, d: District, loc: string, n: string): [string, string][] {
  const by = (id: string) => SERVICES.find((s) => s.id === id)!;
  return {
    tr: [
      [`${loc} terzi var mı, yakınımdaki terzi nerede?`, `Atölyemiz Konyaaltı Hurma Mahallesi'ndedir. ${n} için kıyafetinizi adresinizden veya otelinizden alıp teslim ediyoruz; otel ve eve servis ücretsizdir. Her gün 08:00–23:00 arası WhatsApp'tan ulaşabilirsiniz.`],
      [`${loc} ${by('paca').q.tr} ve ${by('fermuar').q.tr} ne kadar sürer?`, 'Paça kısaltma, daraltma ve fermuar işleri genellikle aynı gün biter; kesin süre işe ve yoğunluğa göre WhatsApp\'ta netleşir.'],
      [`${loc} gelinlik ve abiye tadilatı kaç TL?`, "Gelinlik tadilatı ₺800'den, abiye tadilatı ₺800'den başlar; kesin fiyat fotoğraf ve işlem detayına göre söylenir. Abiye tadilatı genellikle ertesi gün hazır olur; gelinlikte süre işin kapsamına göre netleşir."],
      [`${loc} ${by('elbise-dikim').q.tr} kaç günde teslim edilir?`, 'Elbise dikimi genellikle 3 gün içinde hazırlanır. Elbise, ceket, gömlek, mont ve abiye tadilat ya da tamiri genellikle ertesi gün biter; kesin süre WhatsApp\'ta netleşir.'],
      [`${loc} yabancı turistler için terzi hizmeti var mı?`, 'Evet. Türkçe, İngilizce, Rusça ve Almanca hizmet veriyoruz; otel ve eve servis ücretsizdir. Fotoğrafı WhatsApp\'tan gönderip fiyat alabilirsiniz.'],
    ],
    en: [
      [`Is there a tailor ${loc}? Where is the nearest tailor?`, `Our workshop is in Hurma, Konyaaltı. For ${n} we collect garments from your address or hotel and bring them back; service to hotels and homes is free. Message us on WhatsApp daily 08:00–23:00.`],
      [`How long do ${by('paca').q.en} and ${by('fermuar').q.en} take ${loc}?`, 'Trouser hemming, taking in and zipper work are usually ready the same day; the exact time depends on the job and workload and is confirmed on WhatsApp.'],
      [`How much does wedding or evening dress alteration cost ${loc}?`, 'Wedding dress alteration starts from ₺800 and evening dress alteration from ₺800; the exact price depends on a photo and the work needed. Evening dress alterations are usually ready the next day; for wedding dresses the time depends on the work.'],
      [`How many days does ${by('elbise-dikim').q.en} take ${loc}?`, 'Dress making usually takes about 3 days. Alterations or repairs of dresses, jackets, shirts, coats and evening dresses usually take about 1 day; the exact time is confirmed on WhatsApp.'],
      [`Is there a tailor service for tourists ${loc}?`, 'Yes. We serve in English, Turkish, Russian and German, and service to hotels and homes is free. Send a photo on WhatsApp to get a price.'],
    ],
    ru: [
      [`Есть ли портной ${loc}? Где ближайшее ателье?`, `Наша мастерская — в Хурме (Коньяалты). Для района ${n} забираем вещи с вашего адреса или из отеля и возвращаем; выезд в отели и на дом бесплатный. Пишите в WhatsApp ежедневно с 08:00 до 23:00.`],
      [`Как быстро делают ${by('paca').q.ru} и ${by('fermuar').q.ru} ${loc}?`, 'Подшив и ушивание брюк, а также замена или ремонт молнии обычно делаем в тот же день; точный срок зависит от работы и загрузки и уточняется в WhatsApp.'],
      [`Сколько стоит подгонка свадебного или вечернего платья ${loc}?`, 'Подгонка свадебного и вечернего платья — от ₺800; точную цену называем по фото и объёму работ. Вечерние платья обычно готовы на следующий день; для свадебных срок зависит от объёма работы.'],
      [`За сколько дней делают ${by('elbise-dikim').q.ru} ${loc}?`, 'Пошив платья обычно занимает около 3 дней. Переделка или ремонт платья, пиджака, рубашки, куртки и вечернего платья — обычно около 1 дня; точный срок уточняется в WhatsApp.'],
      [`Есть ли услуги портного для туристов ${loc}?`, 'Да. Напишите нам в WhatsApp на своём языке; выезд в отели и на дом бесплатный. Пришлите фото в WhatsApp и узнайте цену.'],
    ],
    de: [
      [`Gibt es einen Schneider ${loc}? Wo ist der nächste Schneider?`, `Unsere Werkstatt liegt in Hurma, Konyaaltı. Für ${n} holen wir Kleidung an Ihrer Adresse oder im Hotel ab und bringen sie zurück; der Service zu Hotels und nach Hause ist kostenlos. WhatsApp täglich 08:00–23:00.`],
      [`Wie lange dauern ${by('paca').q.de} und ${by('fermuar').q.de} ${loc}?`, 'Hosen kürzen, enger machen sowie Reißverschlussarbeiten sind meist am selben Tag fertig; die genaue Dauer hängt vom Auftrag ab und wird per WhatsApp bestätigt.'],
      [`Was kostet eine Brautkleid- oder Abendkleid-Änderung ${loc}?`, 'Brautkleid-Änderungen beginnen bei ₺800, Abendkleid-Änderungen bei ₺800; der genaue Preis richtet sich nach Foto und Aufwand. Abendkleider sind meist am nächsten Tag fertig; beim Brautkleid hängt es vom Umfang ab.'],
      [`Wie viele Tage dauert ${by('elbise-dikim').q.de} ${loc}?`, 'Ein Kleid nähen dauert meist etwa 3 Tage. Änderungen oder Reparaturen von Kleidern, Sakkos, Hemden, Mänteln und Abendkleidern dauern meist etwa 1 Tag; die genaue Dauer wird per WhatsApp bestätigt.'],
      [`Gibt es einen Schneiderservice für Touristen ${loc}?`, 'Ja. Schreiben Sie uns per WhatsApp in Ihrer Sprache; der Service zu Hotels und nach Hause ist kostenlos. Foto per WhatsApp senden und Preis erfahren.'],
    ],
  }[lang] as [string, string][];
}

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
  const pick = { tr: 'Konyaaltı\'nda ücretsiz servis', en: 'free pick-up in Konyaaltı', ru: 'выезд в Коньяалты бесплатно', de: 'Gratis-Abholung in Konyaaltı' }[lang];
  const tel = `☎ ${PHONE}`;
  const priceTxt = price ? (lang === 'tr' ? `2026 fiyatı ${price}` : price) : '';
  const info = [tm, priceTxt].filter(Boolean).join(', ');
  const candidates = [
    `${nm}: ${info}. ${lead} ${rep} ${pick}. ${tel}`,
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
  return {
    tr: [
      [`Antalya'da ${s.vars.tr[0]} nerede yapılır?`, `Terzi Can atölyesinde, Konyaaltı Hurma'da. ${s.intro.tr} Konyaaltı'nda otel ve eve servis ücretsizdir, diğer bölgelerde ücret mesafeye göre belirlenir. Her gün 08:00–23:00 açığız.`],
      [`${nm} ne kadar sürer ve kaç TL?`, `${time}.${price ? ' ' + price + '; kesin fiyat kumaşa ve işlem detayına göre söylenir.' : ' Fiyat için kıyafetin fotoğrafını WhatsApp\'tan gönderin.'}`],
      [`${nm} için otelime veya evime gelir misiniz?`, 'Evet. Konyaaltı\'nda alım-teslim ücretsizdir; Muratpaşa, Lara, Güzeloba, Kundu, Belek ve Side gibi bölgelerde servis ücreti mesafeye göre belirlenir.'],
    ],
    en: [
      [`Where can I get ${s.vars.en[0]} in Antalya?`, `At the Terzi Can workshop in Hurma, Konyaaltı. ${s.intro.en} Free service to hotels and homes; open daily 08:00–23:00.`],
      [`How long does ${nm.toLowerCase()} take and what does it cost?`, `${time}.${price ? ' ' + price + '; the exact price depends on the fabric and the work.' : ' Send a photo of the garment on WhatsApp for a price.'}`],
      [`Can you come to my hotel or home for ${nm.toLowerCase()}?`, 'Yes. Pick-up and delivery is free in Konyaaltı; in areas such as Muratpaşa, Lara, Güzeloba, Kundu, Belek and Side the service fee depends on the distance.'],
    ],
    ru: [
      [`Где в Анталье сделать: ${s.vars.ru[0]}?`, `В мастерской Terzi Can в Хурме (Коньяалты). ${s.intro.ru} В Коньяалты выезд в отели и на дом бесплатный, в другие районы — по расстоянию; работаем ежедневно 08:00–23:00.`],
      [`Сколько времени занимает «${nm}» и сколько это стоит?`, `${time}.${price ? ' ' + price + '; точная цена зависит от ткани и объёма работ.' : ' Пришлите фото вещи в WhatsApp — назовём цену.'}`],
      [`Приедете ли вы в отель или домой: «${nm}»?`, 'Да. В Коньяалты забор и доставка бесплатны; в Муратпаше, Ларе, Гюзельобе, Кунду, Белеке и Сиде стоимость зависит от расстояния.'],
    ],
    de: [
      [`Wo kann ich in Antalya „${s.vars.de[0]}“ lassen?`, `In der Werkstatt von Terzi Can in Hurma, Konyaaltı. ${s.intro.de} Kostenloser Service zu Hotels und nach Hause; täglich 08:00–23:00 geöffnet.`],
      [`Wie lange dauert „${nm}“ und was kostet es?`, `${time}.${price ? ' ' + price + '; der genaue Preis hängt vom Stoff und vom Aufwand ab.' : ' Foto des Kleidungsstücks per WhatsApp senden, dann nennen wir den Preis.'}`],
      [`Kommen Sie für „${nm}“ ins Hotel oder nach Hause?`, 'Ja. In Konyaaltı sind Abholung und Lieferung kostenlos; in Muratpaşa, Lara, Güzeloba, Kundu, Belek und Side richtet sich die Gebühr nach der Entfernung.'],
    ],
  }[lang] as [string, string][];
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
      businessNode(lang),
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

  const h1 = {
    tr: (<>{d.name.tr} <span className="sl-accent">Terzi</span><br />Paça Kısaltma, Bel Daraltma, Fermuar Değişimi</>),
    en: (<>Tailor in <span className="sl-accent">{d.name.en}</span><br />Hemming, Waist Taking-in, Zipper Replacement</>),
    ru: (<>Портной <span className="sl-accent">{d.name.ru}</span><br />Подшив брюк, ушивание в талии, замена молнии</>),
    de: (<>Schneider <span className="sl-accent">{d.name.de}</span><br />Hose kürzen, Taille enger, Reißverschluss wechseln</>),
  }[lang];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Shell lang={lang} waMsg={waMsg} footLinks={[
        { href: HUB_MAIN[lang], label: u.home.replace('← ', '') },
        { href: SERVICE_BASE[lang], label: u.all },
        { href: u.pricesHref, label: u.pricesLink },
      ]}>
        <Hero lang={lang} tag={`📍 ${d.name[lang]} · ${!isFreeService(d.slug) ? SVC_FAR[lang] : u.free} · ${u.hours}`} h1={h1}
          desc={`${districtAbout(lang, d)}`} waMsg={waMsg} />

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
            {(() => { const tz = tzDistrictLink(lang, d); return tz ? (<p style={{ marginTop: '1rem', fontSize: '.9rem' }}><a href={tz.href} hrefLang={lang} style={{ textDecoration: 'underline' }}>{tz.label}</a></p>) : null; })()}
          </div>
        </section>
        {otherLangLinks(lang, (l) => districtUrl(l, d), (l) => isIndexable(l, d.slug))}
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
              {sortD(lang, DISTRICTS).map((d) => (<a key={d.slug} href={districtUrl(lang, d)} style={linkChip}>{query(lang, d, s)}</a>))}
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
          { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: `${SITE}/terzi` },
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
              {sortD(lang, DISTRICTS).map((d) => (<a key={d.slug} href={districtUrl(lang, d)} style={linkChip}>{d.name[lang]}</a>))}
              {MAHALLE_PAGES.map((m) => (<a key={m.href} href={m.href} style={linkChip}>{m.name[lang]}</a>))}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '.9rem' }}><a href={`${TZ_SITE}${TZ_HUB[lang]}`} hrefLang={lang} style={{ textDecoration: 'underline' }}>{tzHubLabel[lang]}</a></p>
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
          Paça kısaltma ve fermuar genellikle aynı gün; elbise, ceket, gömlek, mont ve abiye tadilatı genellikle ertesi gün; elbise dikimi genellikle 3 gün içinde. Kesin süre işe göre WhatsApp&apos;ta netleşir. Gelinlik tadilatı ₺800&apos;den, abiye ₺800&apos;den. Konyaaltı'nda otel ve eve ücretsiz servis, her gün 08:00–23:00.
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
