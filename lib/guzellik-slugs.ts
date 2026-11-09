// swaphubs.com — güzellik adreslerinin küçük, bağımsız dil/slug eşlemesi.
// lib/guzellik.ts (büyük metin dosyası) ile iletişim ölçümü bileşeni (istemci paketi) aynı kaynağı kullansın diye ayrıldı.
export type GSlugLang = 'tr' | 'en' | 'ru' | 'de' | 'es' | 'fr' | 'pl' | 'uk' | 'nl' | 'ar';
export const G_PREFIX = '/guzellik';
export const G_SLUG: Record<GSlugLang, string> = {
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
/** Slug'dan dil (middleware, rota ve iletişim ölçümü için). */
export const gSlugToLang = (slug: string): GSlugLang | null =>
  ((Object.keys(G_SLUG) as GSlugLang[]).find((l) => G_SLUG[l] === slug) ?? null);

// ── Hizmet ve bölge alt sayfaları (yalnızca tr/en/de/ru) ─────────────────────────────────────────
// Slug tabloları burada (küçük dosya); metinler lib/guzellik-sub-data/*.json içinde.
export type GSubLang = 'tr' | 'en' | 'de' | 'ru';
export const G_SUB_LANGS: GSubLang[] = ['tr', 'en', 'de', 'ru'];
export const G_SUB_SVC_IDS = ['hair', 'nails', 'brows', 'makeup', 'bridal', 'skin', 'wax'] as const;
export type GSubSvcId = (typeof G_SUB_SVC_IDS)[number];
export const G_SUB_DST_IDS = ['lara', 'belek', 'kemer', 'side', 'konyaalti'] as const;
export type GSubDstId = (typeof G_SUB_DST_IDS)[number];

export const G_SVC_SLUG: Record<GSubLang, Record<GSubSvcId, string>> = {
  tr: { hair: 'kuafor-antalya', nails: 'tirnak-manikur-antalya', brows: 'kas-kirpik-antalya', makeup: 'makyaj-antalya', bridal: 'gelin-saci-makyaji-antalya', skin: 'cilt-bakimi-antalya', wax: 'agda-antalya' },
  en: { hair: 'hair-salon-antalya', nails: 'nail-salon-antalya', brows: 'brows-lashes-antalya', makeup: 'makeup-artist-antalya', bridal: 'bridal-hair-makeup-antalya', skin: 'facial-skin-care-antalya', wax: 'waxing-antalya' },
  de: { hair: 'friseur-antalya', nails: 'nagelstudio-antalya', brows: 'wimpern-augenbrauen-antalya', makeup: 'make-up-antalya', bridal: 'braut-styling-antalya', skin: 'kosmetikstudio-antalya', wax: 'waxing-haarentfernung-antalya' },
  ru: { hair: 'parikmakherskaya-antalya', nails: 'manikyur-antalya', brows: 'brovi-resnitsy-antalya', makeup: 'makiyazh-antalya', bridal: 'svadebnyy-makiyazh-pricheska-antalya', skin: 'uhod-za-kozhey-antalya', wax: 'depilyatsiya-antalya' },
};
export const G_DST_SLUG: Record<GSubLang, Record<GSubDstId, string>> = {
  tr: { lara: 'lara-guzellik-salonu', belek: 'belek-guzellik-salonu', kemer: 'kemer-guzellik-salonu', side: 'side-guzellik-salonu', konyaalti: 'konyaalti-guzellik-salonu' },
  en: { lara: 'beauty-salon-lara-antalya', belek: 'beauty-salon-belek', kemer: 'beauty-salon-kemer', side: 'beauty-salon-side', konyaalti: 'beauty-salon-konyaalti' },
  de: { lara: 'schoenheitssalon-lara-antalya', belek: 'schoenheitssalon-belek', kemer: 'schoenheitssalon-kemer', side: 'schoenheitssalon-side', konyaalti: 'schoenheitssalon-konyaalti' },
  ru: { lara: 'salon-krasoty-lara-antalya', belek: 'salon-krasoty-belek', kemer: 'salon-krasoty-kemer', side: 'salon-krasoty-side', konyaalti: 'salon-krasoty-konyaalti' },
};
export type GSubKind = { kind: 'svc'; id: GSubSvcId; lang: GSubLang } | { kind: 'dst'; id: GSubDstId; lang: GSubLang };
/** Alt sayfa slug'ından {tür, kimlik, dil}. */
export function gSubFromSlug(slug: string): GSubKind | null {
  for (const lang of G_SUB_LANGS) {
    for (const id of G_SUB_SVC_IDS) if (G_SVC_SLUG[lang][id] === slug) return { kind: 'svc', id, lang };
    for (const id of G_SUB_DST_IDS) if (G_DST_SLUG[lang][id] === slug) return { kind: 'dst', id, lang };
  }
  return null;
}
/** Ana veya alt sayfa slug'ından dil (middleware ve iletişim ölçümü için). */
export const gAnySlugToLang = (slug: string): GSlugLang | null => gSlugToLang(slug) ?? gSubFromSlug(slug)?.lang ?? null;
