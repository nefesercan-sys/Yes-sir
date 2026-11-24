// Sayfa başına GERÇEK son içerik güncelleme tarihi (tek kaynak). lib/lastmod.json, scripts/lastmod.mjs ile
// derlenmiş sitenin içeriği karşılaştırılarak üretilir: elle tarih yazmayın, içerik değiştiren her PR'da script'i çalıştırın.
import DATES from './lastmod.json';

const D = DATES as Record<string, string>;
const pathOf = (pathOrUrl: string) => (pathOrUrl.replace(/^https?:\/\/[^/]+/, '').split(/[?#]/)[0].replace(/\/$/, '') || '/');

/** Sayfanın son içerik güncellemesi (YYYY-MM-DD). Kayıt yoksa fallback (o da yoksa undefined). */
export function lastMod(pathOrUrl: string, fallback: string): string;
export function lastMod(pathOrUrl: string, fallback?: string): string | undefined;
export function lastMod(pathOrUrl: string, fallback?: string): string | undefined {
  return D[pathOf(pathOrUrl)] ?? fallback;
}
/** sitemap için Date; kayıt yoksa fallback. */
export function lastModDate(pathOrUrl: string, fallback: Date): Date {
  const d = D[pathOf(pathOrUrl)];
  return d ? new Date(d) : fallback;
}
