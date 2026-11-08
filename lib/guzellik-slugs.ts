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
