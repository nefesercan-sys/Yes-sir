// ============================================================
// SwapHubs — lib/icerik-haritasi.ts
// Sayfa sonu "içerik haritası" verisi + eksik sayfalar için BreadcrumbList
// Not: Yalnızca gerçekten var olan sayfalara link verir. Puan/yorum verisi içermez.
// ============================================================
import { DISTRICTS, SERVICES, districtUrl, serviceUrl, isIndexable } from '@/lib/seo-data';
import { ANTALYA_ILCELERI, KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar';

export type Lang = 'tr' | 'en' | 'de' | 'ru' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export type MapLink = { href: string; label: string };
export type MapSection = { title: string; links: MapLink[] };
export type SiteMap = { lang: Lang; heading: string; sections: MapSection[] };
export type Crumb = { name: string; href: string };

const BASE_URL = 'https://swaphubs.com';

// ── Türkçe hizmet kümesi ───────────────────────────────────────────────────
const TR_SERVICES: MapLink[] = [
  { href: '/terzi', label: 'Antalya Terzi — Terzi Can' },
  { href: '/terzi/paca-kisaltma-antalya', label: 'Paça kısaltma' },
  { href: '/terzi/fermuar-degisimi', label: 'Fermuar değişimi' },
  { href: '/terzi/mont-tamiri-tadilati-antalya', label: 'Mont tamiri ve tadilatı' },
  { href: '/terzi/kaban-palto-tadilati-antalya', label: 'Kaban ve palto tadilatı' },
  { href: '/terzi/yelek-tamiri-tadilati-antalya', label: 'Yelek tamiri ve tadilatı' },
  { href: '/terzi/sik-sorulan-sorular', label: 'Sık sorulan sorular' },
  { href: '/terzi/deri-ceket-tadilati-antalya', label: 'Deri ceket tadilatı' },
  { href: '/terzi/kot-pantolon-paca-kisaltma-antalya', label: 'Kot paça kısaltma' },
  { href: '/terzi/kot-pantolon-daraltma-antalya', label: 'Kot pantolon daraltma' },
  { href: '/terzi/orijinal-kot-paca-yapimi-antalya', label: 'Orijinal kot paça yapımı' },
  { href: '/terzi/kot-ceket-mont-tadilati-antalya', label: 'Kot ceket ve mont tadilatı' },
  { href: '/terzi/kot-etek-kisaltma-daraltma-antalya', label: 'Kot etek kısaltma' },
  { href: '/terzi/bay-terzi-antalya', label: 'Bay terzi' },
  { href: '/terzi/bayan-terzi-antalya', label: 'Bayan terzi' },
  { href: '/terzi/eve-gelen-terzi-antalya', label: 'Eve gelen terzi' },
  { href: '/terzi/dikis-atolyesi-antalya', label: 'Dikiş atölyesi' },
  { href: '/terzi/uniforma-uretimi-antalya', label: 'Üniforma üretimi' },
  { href: '/antalya-terzi-elbise-dikimi', label: 'Elbise dikimi' },
  { href: '/antalyada-terzi-dikim-tamirat-utu-hizmetleri', label: 'Dikim ve tamirat' },
  { href: '/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat', label: 'Konyaaltı elbise dikim ve tadilat' },
  { href: '/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti', label: 'Konyaaltı tadilat' },
  { href: '/online-terzi-hizmeti', label: 'Online terzi hizmeti' },
  { href: '/siparise-ozel-dikim-dunyaya-kargo', label: 'Siparişe özel dikim ve kargo' },
  { href: '/terzi/olcu-alma-rehberi', label: 'Evde ölçü nasıl alınır?' },
  { href: '/tekstil-antalya', label: 'Tekstil Antalya' },
  { href: '/terzi-cagir', label: 'Terzi çağır' },
];

const OTHER_LANG_HUBS: MapLink[] = [
  { href: '/en/hotel-tailor-antalya', label: 'English — Hotel Tailor Antalya' },
  { href: '/de/schneider-service-hotel-antalya', label: 'Deutsch — Schneider Service Hotel' },
  { href: '/ru/vyezdnoy-portnoy-antalya', label: 'Русский — Выездной портной' },
  { href: '/es/arreglos-de-ropa-en-vacaciones-antalya', label: 'Español — Arreglos de ropa' },
  { href: '/fr/retouches-vetements-vacances-antalya', label: 'Français — Retouches vêtements' },
  { href: '/pl/przerobki-ubran-na-wakacjach-antalya', label: 'Polski — Przeróbki ubrań' },
  { href: '/uk/pidhonka-odyahu-u-vidpustci-antaliya', label: 'Українська — Підгонка одягу' },
  { href: '/nl/kleding-laten-vermaken-op-vakantie-antalya', label: 'Nederlands — Kleding vermaken' },
  { href: '/ar/tadil-malabis-fi-el-ijaza-antalya', label: 'العربية — تعديل الملابس' },
];

// ── Turistik bölgeler (en / de / ru alt sayfaları) ─────────────────────────
const REGIONS = ['belek', 'lara', 'guzeloba', 'side', 'kemer'] as const; // lib/otel-bolgeleri.ts ile aynı olmalı (Kundu sayfası yok)
const REGION_NAME: Record<Lang, Record<string, string>> = {
  tr: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer' },
  en: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer' },
  de: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer' },
  ru: { belek: 'Белек', lara: 'Лара', guzeloba: 'Гюзельоба', side: 'Сиде', kemer: 'Кемер' },
};

const EN_BASE = '/en/hotel-tailor-antalya';
const DE_BASE = '/de/schneider-service-hotel-antalya';
const RU_BASE = '/ru/vyezdnoy-portnoy-antalya';


// ── Ek turist dilleri (ES/FR/PL/UK/NL/AR) ──────────────────────────────────
// Not: istemci paketini şişirmemek için lib/intl*.ts içe aktarılmaz; adresler elle yazıldı
// (lib/intl.ts SLUG, lib/intl-zones.ts PREFIX, lib/intl-online.ts ONLINE_PATH, lib/ozel-dikim.ts OZEL_PATH ile aynı olmalı).
type ExtraLang = 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
const EXTRA_LANGS: ExtraLang[] = ['es', 'fr', 'pl', 'uk', 'nl', 'ar'];
const isExtra = (l: Lang): l is ExtraLang => (EXTRA_LANGS as string[]).includes(l);
const EXTRA_ZONES = ['antalya', 'belek', 'lara', 'guzeloba', 'side', 'kemer', 'konyaalti', 'kundu', 'muratpasa', 'goynuk'] as const;
const LATIN_ZONES: Record<string, string> = { antalya: 'Antalya', belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', konyaalti: 'Konyaaltı', kundu: 'Kundu', muratpasa: 'Muratpaşa', goynuk: 'Göynük' };
const EXTRA: Record<ExtraLang, {
  heading: string; sTitle: string; zTitle: string; zonePrefix: string;
  guide: [string, string]; online: [string, string]; ozel: [string, string]; zoneLabel: (n: string) => string; names?: Record<string, string>;
}> = {
  es: { heading: 'Más servicios de sastrería en Antalya', sTitle: 'Servicios', zTitle: 'Sastre en hoteles por zona', zonePrefix: 'sastre-hoteles',
    guide: ['/es/arreglos-de-ropa-en-vacaciones-antalya', 'Arreglos de ropa en vacaciones'], online: ['/es/servicio-de-sastreria-online-antalya', 'Sastre online'], ozel: ['/es/ropa-a-medida-envio-internacional-antalya', 'Ropa a medida con envío'], zoneLabel: (n) => `Sastre en hoteles de ${n}` },
  fr: { heading: 'Autres services de couture à Antalya', sTitle: 'Services', zTitle: 'Couturier hôtels par secteur', zonePrefix: 'couturier-hotels',
    guide: ['/fr/retouches-vetements-vacances-antalya', 'Retouches en vacances'], online: ['/fr/service-de-couture-en-ligne-antalya', 'Couture en ligne'], ozel: ['/fr/vetements-sur-mesure-expedition-monde-antalya', 'Sur mesure avec expédition'], zoneLabel: (n) => `Couturier hôtels ${n}` },
  pl: { heading: 'Więcej usług krawieckich w Antalyi', sTitle: 'Usługi', zTitle: 'Krawiec dla hoteli wg rejonu', zonePrefix: 'krawiec-hotele',
    guide: ['/pl/przerobki-ubran-na-wakacjach-antalya', 'Przeróbki ubrań na wakacjach'], online: ['/pl/internetowy-serwis-krawiecki-antalya', 'Krawiec online'], ozel: ['/pl/odziez-szyta-na-miare-wysylka-za-granice-antalya', 'Szycie na miarę z wysyłką'], zoneLabel: (n) => `Krawiec hotele ${n}` },
  uk: { heading: 'Більше послуг кравця в Анталії', sTitle: 'Послуги', zTitle: 'Кравець для готелів за районами', zonePrefix: 'kravets-hoteli',
    guide: ['/uk/pidhonka-odyahu-u-vidpustci-antaliya', 'Підгонка одягу у відпустці'], online: ['/uk/onlayn-servis-kravtsya-antaliya', 'Кравець онлайн'], ozel: ['/uk/poshyv-na-zamovlennia-dostavka-za-kordon-antaliya', 'Пошив на замовлення з доставкою'], zoneLabel: (n) => `Кравець готелі ${n}`,
    names: { antalya: 'Анталія', belek: 'Белек', lara: 'Лара', guzeloba: 'Гюзельоба', side: 'Сіде', kemer: 'Кемер', konyaalti: 'Коньяалти', kundu: 'Кунду', muratpasa: 'Муратпаша', goynuk: 'Гейнюк' } },
  nl: { heading: 'Meer kleermakersdiensten in Antalya', sTitle: 'Diensten', zTitle: 'Kleermaker hotels per gebied', zonePrefix: 'kleermaker-hotels',
    guide: ['/nl/kleding-laten-vermaken-op-vakantie-antalya', 'Kleding laten vermaken op vakantie'], online: ['/nl/online-kleermakersservice-antalya', 'Online kleermaker'], ozel: ['/nl/kleding-op-maat-verzending-wereldwijd-antalya', 'Kleding op maat met verzending'], zoneLabel: (n) => `Kleermaker hotels ${n}` },
  ar: { heading: 'المزيد من خدمات الخياطة في أنطاليا', sTitle: 'الخدمات', zTitle: 'خياط الفنادق حسب المنطقة', zonePrefix: 'khayyat-fanadiq',
    guide: ['/ar/tadil-malabis-fi-el-ijaza-antalya', 'تعديل الملابس أثناء الإجازة'], online: ['/ar/khidmat-khayyat-online-antalya', 'خياط أونلاين'], ozel: ['/ar/tafsil-malabis-bil-talab-shahn-dawli-antalya', 'تفصيل ملابس بالطلب مع الشحن'], zoneLabel: (n) => `خياط فنادق ${n}`,
    names: { antalya: 'أنطاليا', belek: 'بيليك', lara: 'لارا', guzeloba: 'غوزيلوبا', side: 'سيدي', kemer: 'كيمر', konyaalti: 'كونيالتي', kundu: 'كوندو', muratpasa: 'موراتباشا', goynuk: 'غوينوك' } },
};

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

function regionLinks(base: string, lang: Lang, suffix: (n: string) => string): MapLink[] {
  return REGIONS.map((r) => ({ href: `${base}/${r}`, label: suffix(REGION_NAME[lang][r]) }));
}

export function getLang(pathname: string): Lang | null {
  const p = norm(pathname);
  if (p.startsWith('/en/') || p === '/online-tailor-service') return 'en';
  if (p.startsWith('/de/')) return 'de';
  if (p.startsWith('/ru/')) return 'ru';
  for (const l of EXTRA_LANGS) if (p.startsWith(`/${l}/`)) return l;
  if (p === '/terzi' || p.startsWith('/terzi/')) return 'tr';
  if (TR_SERVICES.some((l) => l.href === p)) return 'tr';
  return null;
}

// ── Sayfa sonu içerik haritası ─────────────────────────────────────────────
export function getSiteMap(pathname: string): SiteMap | null {
  const base = getBaseSiteMap(pathname);
  if (!base) return null;
  if (isExtra(base.lang)) return base;
  const p = norm(pathname);
  const not = (l: MapLink) => l.href !== p;
  const L = base.lang;
  const titles = ({
    tr: ['Terzi hizmetleri (paça, fermuar, tadilat, dikim)', 'Antalya bölgelerine göre terzi'],
    en: ['Tailor services (hemming, zippers, alterations, dress making)', 'Tailor by area in Antalya'],
    ru: ['Услуги портного (подшив, молнии, переделка, пошив)', 'Портной по районам Антальи'],
    de: ['Schneider-Leistungen (Kürzen, Reißverschluss, Änderungen, Maßanfertigung)', 'Schneider nach Gebiet in Antalya'],
  } as Record<'tr' | 'en' | 'ru' | 'de', string[]>)[L as 'tr' | 'en' | 'ru' | 'de'];
  const dl = (d: (typeof DISTRICTS)[number]) => ({ tr: `${d.name.tr} terzi`, en: `Tailor ${d.name.en}`, ru: `Портной ${d.name.ru}`, de: `Schneider ${d.name.de}` } as Record<string, string>)[L];
  return {
    ...base,
    sections: [
      ...base.sections,
      { title: titles[0], links: SERVICES.map((sv) => ({ href: serviceUrl(L, sv), label: sv.name[L] })).filter(not) },
      { title: titles[1], links: DISTRICTS.filter((d) => isIndexable(L, d.slug)).map((d) => ({ href: districtUrl(L, d), label: dl(d) })).filter(not) },
    ],
  };
}

function getBaseSiteMap(pathname: string): SiteMap | null {
  const p = norm(pathname);
  const lang = getLang(p);
  if (!lang) return null;
  const not = (l: MapLink) => l.href !== p;

  if (lang === 'tr') {
    const sections: MapSection[] = [
      { title: 'Terzi hizmetleri', links: TR_SERVICES.filter(not) },
      {
        title: 'Konyaaltı mahalleleri',
        links: KONYAALTI_MAHALLELERI.map((m) => ({ href: `/terzi/konyaalti/${m.slug}`, label: `${m.ad} terzi` })).filter(not),
      },
    ];
    // İlçe listesi yalnızca ana sayfa ve bölge sayfalarında (her sayfada tekrarlanmasın)
    if (p === '/terzi' || p.startsWith('/terzi/antalya/') || p.startsWith('/terzi/konyaalti/')) {
      sections.push({
        title: 'Antalya ilçeleri',
        links: ANTALYA_ILCELERI.filter((i) => i.slug !== 'konyaalti').map((i) => ({
          href: `/terzi/antalya/${i.slug}`,
          label: `${i.ad} terzi`,
        })).filter(not),
      });
    }
    sections.push({ title: 'Diğer diller', links: OTHER_LANG_HUBS });
    return { lang, heading: 'İlgili sayfalar', sections };
  }

  if (isExtra(lang)) {
    const X = EXTRA[lang];
    return {
      lang,
      heading: X.heading,
      sections: [
        {
          title: X.sTitle,
          links: [
            { href: X.guide[0], label: X.guide[1] },
            { href: X.online[0], label: X.online[1] },
            { href: X.ozel[0], label: X.ozel[1] },
            { href: '/terzi', label: 'Antalya Terzi (Türkçe)' },
          ].filter(not),
        },
        {
          title: X.zTitle,
          links: EXTRA_ZONES.map((z) => ({ href: `/${lang}/${X.zonePrefix}-${z}`, label: X.zoneLabel((X.names || LATIN_ZONES)[z]) })).filter(not),
        },
      ],
    };
  }

  if (lang === 'en') {
    return {
      lang,
      heading: 'More tailor services in Antalya',
      sections: [
        {
          title: 'Services',
          links: [
            { href: EN_BASE, label: 'Hotel Tailor Antalya' },
            { href: '/online-tailor-service', label: 'Online Tailor Service' },
            { href: '/en/made-to-order-clothing-worldwide-antalya', label: 'Made-to-order clothing and shipping' },
            { href: '/en/how-to-measure-yourself-for-a-tailor', label: 'How to measure yourself at home' },
            { href: '/terzi', label: 'Antalya Terzi (Türkçe)' },
          ].filter(not),
        },
        { title: 'Hotel tailor by area', links: regionLinks(EN_BASE, 'en', (n) => `Hotel tailor ${n}`).filter(not) },
      ],
    };
  }

  if (lang === 'de') {
    return {
      lang,
      heading: 'Weitere Schneider-Services in Antalya',
      sections: [
        {
          title: 'Services',
          links: [
            { href: DE_BASE, label: 'Schneider Service Hotel Antalya' },
            { href: '/de/online-schneiderservice-antalya', label: 'Online-Schneiderservice' },
            { href: '/de/massgeschneiderte-kleidung-weltweit-antalya', label: 'Maßgeschneiderte Kleidung und Versand' },
            { href: '/de/massnehmen-zuhause-schneider-anleitung', label: 'Maße zu Hause selbst nehmen' },
            { href: '/terzi', label: 'Antalya Terzi (Türkçe)' },
          ].filter(not),
        },
        { title: 'Hotel-Schneider nach Region', links: regionLinks(DE_BASE, 'de', (n) => `Schneider ${n}`).filter(not) },
      ],
    };
  }

  return {
    lang,
    heading: 'Другие услуги в Анталье',
    sections: [
      {
        title: 'Услуги',
        links: [
          { href: RU_BASE, label: 'Выездной портной Анталья' },
          { href: '/ru/atelie-antalya', label: 'Ателье Анталья' },
          { href: '/ru/atelie-antalya-online', label: 'Ателье онлайн' },
          { href: '/ru/poshiv-na-zakaz-dostavka-po-miru-antalya', label: 'Пошив на заказ с доставкой' },
          { href: '/ru/kak-snyat-merki-doma-dlya-poshiva', label: 'Как снять мерки дома' },
          { href: '/terzi', label: 'Antalya Terzi (Türkçe)' },
        ].filter(not),
      },
      { title: 'Выездной портной по районам', links: regionLinks(RU_BASE, 'ru', (n) => `Портной ${n}`).filter(not) },
    ],
  };
}

// ── Yalnızca BreadcrumbList'i OLMAYAN sayfalar için ────────────────────────
// (Diğer sayfaların şemasında zaten var; çift üretmemek için burada yok.)
export function getBreadcrumb(pathname: string): Crumb[] | null {
  const p = norm(pathname);
  const home: Crumb = { name: 'SwapHubs', href: '/' };

  let m = p.match(/^\/terzi\/antalya\/([a-z0-9-]+)$/);
  if (m) {
    const ilce = ANTALYA_ILCELERI.find((i) => i.slug === m![1]);
    if (!ilce) return null;
    return [home, { name: 'Antalya Terzi', href: '/terzi' }, { name: `${ilce.ad} Terzi`, href: p }];
  }

  const regionPages: [RegExp, string, string, Lang][] = [
    [/^\/en\/hotel-tailor-antalya\/([a-z0-9-]+)$/, EN_BASE, 'Hotel Tailor Antalya', 'en'],
    [/^\/de\/schneider-service-hotel-antalya\/([a-z0-9-]+)$/, DE_BASE, 'Schneider Service Hotel Antalya', 'de'],
    [/^\/ru\/vyezdnoy-portnoy-antalya\/([a-z0-9-]+)$/, RU_BASE, 'Выездной портной Анталья', 'ru'],
  ];
  for (const [re, base, hubName, lang] of regionPages) {
    m = p.match(re);
    if (m && (REGIONS as readonly string[]).includes(m[1])) {
      return [home, { name: hubName, href: base }, { name: REGION_NAME[lang][m[1]], href: p }];
    }
  }

  if (p === '/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat') {
    return [home, { name: 'Antalya Terzi', href: '/terzi' }, { name: 'Konyaaltı Elbise Dikim ve Tadilat', href: p }];
  }
  return null;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.href === '/' ? BASE_URL : `${BASE_URL}${c.href}`,
    })),
  };
}
