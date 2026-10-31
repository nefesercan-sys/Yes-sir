// lib/ilan-public.ts — ilan belgelerinin herkese açık (PII içermeyen) görünümü.
// Kural: telefon, e-posta, kullanıcı kimliği, misafir token'ı ve tam koordinat herkese açık yanıtta OLMAZ.
import { createHash } from 'crypto';

const yuvarla2 = (n: number) => Math.round(n * 100) / 100; // ~1 km

/** Konumu 2 ondalığa (~1 km) yuvarlar. Geçersizse null. */
export function konumuYuvarla(loc: any): { type: 'Point'; coordinates: [number, number] } | null {
  const c = loc?.coordinates;
  if (!Array.isArray(c) || typeof c[0] !== 'number' || typeof c[1] !== 'number') return null;
  return { type: 'Point', coordinates: [yuvarla2(c[0]), yuvarla2(c[1])] };
}

/** Kimliği geri çözülemeyen, kararlı kısa özet (istemcide "sahibi miyim" karşılaştırması gerçek sahip dışında eşleşmez). */
export const opakId = (v: unknown): string =>
  createHash('sha256').update(String(v ?? '') + (process.env.NEXTAUTH_SECRET || '')).digest('hex').slice(0, 16);

/** Oturum bilgisine göre bu ilanın sahibi mi? (NextAuth e-posta/id veya terzi oturum kimliği) */
export function ilanSahibiMi(ilan: any, kim: { email?: string | null; id?: string | null; terziId?: string | null }): boolean {
  const sahipEposta = ilan?.sahibi?.email || ilan?.kullaniciId;
  if (kim.email && (sahipEposta === kim.email || ilan?.kullanici?.id === kim.email)) return true;
  if (kim.id && (ilan?.kullaniciId === kim.id || ilan?.kullanici?.id === kim.id)) return true;
  if (kim.terziId && ilan?.sahibi?.userId === kim.terziId) return true;
  return false;
}

/** Herkese açık ilan görünümü: hassas alanlar atılır, konum yuvarlanır, sahibi yalnızca ad/resim/opak kimlikle kalır. */
export function ilanHerkeseAcik(ilan: any): any {
  if (!ilan || typeof ilan !== 'object') return ilan;
  const { sahibi, misafirToken, kullaniciId, kullanici, ilanSahibi, email, telefon, userId, location, ...geri } = ilan;
  const ham = sahibi?.email || sahibi?.userId || kullaniciId || kullanici?.id || null;
  const out: any = { ...geri };
  if (location !== undefined) out.location = konumuYuvarla(location);
  if (sahibi || kullanici) {
    const ad = sahibi?.ad ?? kullanici?.name ?? null;
    const resim = sahibi?.resim ?? kullanici?.image ?? null;
    out.sahibi = { ad, resim, id: ham ? opakId(ham) : null };
    if (kullanici) out.kullanici = { id: ham ? opakId(ham) : '', name: kullanici.name ?? ad, image: kullanici.image ?? resim };
  } else {
    out.sahibi = null;
  }
  return out;
}
