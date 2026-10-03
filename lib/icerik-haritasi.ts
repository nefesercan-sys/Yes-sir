// ============================================================
// SwapHubs — lib/icerik-haritasi.ts
// Sayfa sonu "içerik haritası" verisi + eksik sayfalar için BreadcrumbList
// Not: Yalnızca gerçekten var olan sayfalara link verir. Puan/yorum verisi içermez.
// ============================================================
import { ANTALYA_ILCELERI, KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar';

export type Lang = 'tr' | 'en' | 'de' | 'ru';
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
  { href: '/terzi/bay-terzi-antalya', label: 'Bay terzi' },
  { href: '/terzi/bayan-terzi-antalya', label: 'Bayan terzi' },
  { href: '/terzi/eve-gelen-terzi-antalya', label: 'Eve gelen terzi' },
  { href: '/terzi/kuru-temizleme-antalya', label: 'Kuru temizleme' },
  { href: '/terzi/dikis-atolyesi-antalya', label: 'Dikiş atölyesi' },
  { href: '/terzi/uniforma-uretimi-antalya', label: 'Üniforma üretimi' },
  { href: '/antalya-terzi-elbise-dikimi', label: 'Elbise dikimi' },
  { href: '/antalyada-terzi-dikim-tamirat-utu-hizmetleri', label: 'Dikim, tamirat ve ütü' },
  { href: '/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat', label: 'Dikim, ütü ve tekstil imalatı' },
  { href: '/antalya-konyaalti-terzi-elbise-dikim-tamir-tadilat', label: 'Konyaaltı elbise dikim ve tadilat' },
  { href: '/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti', label: 'Konyaaltı tadilat ve ütü' },
  { href: '/online-terzi-hizmeti', label: 'Online terzi hizmeti' },
  { href: '/tekstil-antalya', label: 'Tekstil Antalya' },
  { href: '/terzi-cagir', label: 'Terzi çağır' },
];

const OTHER_LANG_HUBS: MapLink[] = [
  { href: '/en/hotel-tailor-antalya', label: 'English — Hotel Tailor Antalya' },
  { href: '/de/schneider-service-hotel-antalya', label: 'Deutsch — Schneider Service Hotel' },
  { href: '/ru/vyezdnoy-portnoy-antalya', label: 'Русский — Выездной портной' },
];

// ── Turistik bölgeler (en / de / ru alt sayfaları) ─────────────────────────
const REGIONS = ['belek', 'lara', 'guzeloba', 'side', 'kemer', 'kundu'] as const;
const REGION_NAME: Record<Lang, Record<string, string>> = {
  tr: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', kundu: 'Kundu' },
  en: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', kundu: 'Kundu' },
  de: { belek: 'Belek', lara: 'Lara', guzeloba: 'Güzeloba', side: 'Side', kemer: 'Kemer', kundu: 'Kundu' },
  ru: { belek: 'Белек', lara: 'Лара', guzeloba: 'Гюзельоба', side: 'Сиде', kemer: 'Кемер', kundu: 'Кунду' },
};

const EN_BASE = '/en/hotel-tailor-antalya';
const DE_BASE = '/de/schneider-service-hotel-antalya';
const RU_BASE = '/ru/vyezdnoy-portnoy-antalya';

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

function regionLinks(base: string, lang: Lang, suffix: (n: string) => string): MapLink[] {
  return REGIONS.map((r) => ({ href: `${base}/${r}`, label: suffix(REGION_NAME[lang][r]) }));
}

export function getLang(pathname: string): Lang | null {
  const p = norm(pathname);
  if (p.startsWith('/en/') || p === '/online-tailor-service') return 'en';
  if (p.startsWith('/de/')) return 'de';
  if (p.startsWith('/ru/')) return 'ru';
  if (p === '/terzi' || p.startsWith('/terzi/')) return 'tr';
  if (TR_SERVICES.some((l) => l.href === p)) return 'tr';
  return null;
}

// ── Sayfa sonu içerik haritası ─────────────────────────────────────────────
export function getSiteMap(pathname: string): SiteMap | null {
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
          { href: RU_BASE, label: 'Выездной портной Анталия' },
          { href: '/ru/atelie-antalya', label: 'Ателье Анталия' },
          { href: '/ru/atelie-antalya-online', label: 'Ателье онлайн' },
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
    [/^\/ru\/vyezdnoy-portnoy-antalya\/([a-z0-9-]+)$/, RU_BASE, 'Выездной портной Анталия', 'ru'],
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
