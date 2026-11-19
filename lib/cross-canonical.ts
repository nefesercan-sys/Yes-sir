// ============================================================
// lib/cross-canonical.ts — terzihizmeti.com.tr'ye cross-domain canonical
// Eski (Ekim 2026) EN/DE/RU → terzihizmeti listesi git geçmişinde. Güncel kural aşağıda.
// ============================================================

export const TZ_SITE = 'https://terzihizmeti.com.tr';

// Sahibinin kararı (19 Kasım 2026): Türkçede asıl site terzihizmeti.com.tr, İngilizce/Almanca/Rusçada asıl site swaphubs.com.
// Bu yüzden yalnız TÜRKÇE ve BİREBİR KOPYA olan sayfalar (aynı şablon + aynı veri, lib/seo-data.ts) canonical'ı terzihizmeti'ne verir:
//   /terzi/hizmet ve /terzi/hizmet/<slug>  → terzihizmeti /terzi-hizmetleri(/<slug>)
//   /terzi/bolge/<slug> (terzihizmeti'nde Türkçesi indexlenen bölgeler) → terzihizmeti'ndeki Türkçe bölge sayfası
// swaphubs'a özgü Türkçe sayfalar (mahalle, ilçe, fermuar, paça vb.) ve tüm EN/DE/RU sayfalar swaphubs'ta canonical kalır.
// terzihizmeti tarafında karşılığı: terzi-hizmeti/lib/twin.ts (EN/DE/RU kopyalar → swaphubs).

/** terzihizmeti'nde Türkçe sayfası indexlenen bölgeler (terzi-hizmeti lib/seo-data.ts TR_NEAR_SLUGS + trHref) → TR adresi. */
const TH_TR_DISTRICT: Record<string, string> = {
  hurma: '/hurma-terzi', liman: '/liman-terzi', gursu: '/gursu-terzi', uncali: '/uncali-terzi', sarisu: '/sarisu-terzi',
  ...Object.fromEntries(['konyaalti', 'uluc', 'altinkum', 'ogretmenevleri', 'arapsuyu', 'siteler', 'meltem', 'muratpasa', 'fener',
    'sirinyali', 'toros', 'manavgat', 'serik', 'aksu', 'beldibi'].map((s) => [s, `/antalya-terzi/${s}`])),
};
/** Bölgenin terzihizmeti'ndeki Türkçe sayfası (tam URL) ya da null. */
export const thTrDistrictUrl = (slug: string): string | null => (TH_TR_DISTRICT[slug] ? `${TZ_SITE}${TH_TR_DISTRICT[slug]}` : null);

/** swaphubs yolu için kardeş sitedeki canonical URL (yoksa null). */
export function crossCanonical(path: string): string | null {
  const p = path.length > 1 ? path.replace(/\/$/, '') : path;
  if (p === '/terzi/hizmet') return `${TZ_SITE}/terzi-hizmetleri`;
  const h = p.match(/^\/terzi\/hizmet\/([a-z0-9-]+)$/);
  if (h) return `${TZ_SITE}/terzi-hizmetleri/${h[1]}`;
  const b = p.match(/^\/terzi\/bolge\/([a-z0-9-]+)$/);
  if (b) return thTrDistrictUrl(b[1]);
  return null;
}

/** Next.js metadata.alternates: karşılığı varsa yalnız cross-domain canonical (hreflang yok), yoksa verilen değer. */
export function alternatesWithCross<T extends { canonical?: string }>(path: string, fallback: T): T | { canonical: string } {
  const c = crossCanonical(path);
  return c ? { canonical: c } : fallback;
}
