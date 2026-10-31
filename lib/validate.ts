// lib/validate.ts — küçük, bağımlılıksız doğrulama yardımcıları (istemci ve sunucuda güvenle kullanılabilir).

/** 24 karakterlik hex ObjectId biçimi mi? (mongodb'yi içe aktarmadan; istemciye de güvenli) */
export const idGecerli = (v: unknown): v is string => typeof v === 'string' && /^[0-9a-fA-F]{24}$/.test(v);

/** RegExp özel karakterlerini kaçırır (kullanıcı girdisini $regex içinde güvenle kullanmak için). */
export const regexKacir = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Sorgu parametresini tam sayıya çevirir, [min, max] aralığına sıkıştırır; geçersizse varsayılanı döner. */
export function tamSayi(v: unknown, min: number, max: number, varsayilan: number): number {
  const n = typeof v === 'number' ? v : parseInt(String(v ?? ''), 10);
  if (!Number.isFinite(n)) return varsayilan;
  return Math.min(Math.max(Math.trunc(n), min), max);
}

/** Sonlu bir sayı değilse null döner. */
export function sonluSayi(v: unknown): number | null {
  if (typeof v === 'string' && v.trim() === '') return null;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

export const enlemBoylamGecerli = (lat: unknown, lng: unknown): boolean =>
  typeof lat === 'number' && typeof lng === 'number' &&
  Number.isFinite(lat) && Number.isFinite(lng) &&
  lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;

/**
 * Açık yönlendirme koruması: yalnızca site içi yola izin verir.
 * '/' ile başlamalı; '//' ve '/\' (protokolsüz dış adres), ters eğik çizgi ve kontrol karakterleri reddedilir.
 */
export function guvenliYol(v: unknown, varsayilan = '/'): string {
  if (typeof v !== 'string') return varsayilan;
  const s = v.trim();
  if (!s.startsWith('/') || s.startsWith('//') || s.startsWith('/\\')) return varsayilan;
  if (/[\u0000-\u001F\u007F\\]/.test(s)) return varsayilan;
  return s;
}

/**
 * İç içe nesneyi sınırlı derinlik/uzunlukta temizler: '$' ile başlayan veya '.' içeren anahtarlar atılır,
 * uzun metinler kırpılır (veritabanına kontrolsüz yapı yazılmasını önler).
 */
export function temizObje(v: unknown, derinlik = 4): unknown {
  if (typeof v === 'string') return v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, 5000);
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  if (typeof v === 'boolean' || v === null) return v;
  if (derinlik <= 0) return null;
  if (Array.isArray(v)) return v.slice(0, 100).map((x) => temizObje(x, derinlik - 1));
  if (typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v as Record<string, unknown>).slice(0, 100)) {
      if (k.startsWith('$') || k.includes('.') || k === '__proto__') continue;
      out[k.slice(0, 80)] = temizObje(x, derinlik - 1);
    }
    return out;
  }
  return null;
}

/** Medya URL listesi: yalnızca http(s) metinleri, en çok 'adet' tane. */
export function medyaListesi(v: unknown, adet = 10): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((u): u is string => typeof u === 'string' && /^https?:\/\/[^\s]{3,500}$/.test(u))
    .slice(0, adet);
}

/**
 * Teklif belgesindeki e-postayı çözer. Koleksiyonda üç farklı şema var: teklifVeren (API), teklifci (eski), gonderen (form).
 * Hiçbiri yoksa null döner (TypeError atmaz).
 */
export function teklifEposta(t: any): string | null {
  const e = t?.teklifVeren?.email ?? t?.teklifci?.email ?? t?.gonderen?.email ?? null;
  return typeof e === 'string' && e ? e : null;
}

/** Teklifi veren tarafın bilgi nesnesi (üç şemadan hangisi varsa); yoksa boş nesne. */
export function teklifTaraf(t: any): { email?: string; ad?: string; telefon?: string; [k: string]: unknown } {
  const x = t?.teklifVeren ?? t?.teklifci ?? t?.gonderen;
  return x && typeof x === 'object' ? x : {};
}
