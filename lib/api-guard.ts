// Herkese açık (girişsiz) form API'leri için ortak koruma: IP başına hız sınırı + girdi temizleme.
// NOT: Bellek içi sayaçtır (sunucusuz ortamda her örnek için ayrı). Kaba spam'i keser; kesin sınır için
// ileride Upstash/Redis tabanlı bir limit eklenebilir.
import type { NextRequest } from 'next/server';

const kovalar = new Map<string, number[]>();

export function clientIp(req: Request | NextRequest): string {
  const xf = req.headers.get('x-forwarded-for');
  return (xf ? xf.split(',')[0] : req.headers.get('x-real-ip') || 'bilinmiyor').trim();
}

/** true dönerse limit aşıldı. */
export function rateLimited(req: Request | NextRequest, anahtar: string, max: number, pencereMs: number): boolean {
  const simdi = Date.now();
  const k = `${anahtar}:${clientIp(req)}`;
  const liste = (kovalar.get(k) || []).filter((t) => simdi - t < pencereMs);
  liste.push(simdi);
  kovalar.set(k, liste);
  if (kovalar.size > 5000) kovalar.clear();
  return liste.length > max;
}

/** Metni kırpar, kontrol karakterlerini ve < > işaretlerini temizler. */
export function clean(v: unknown, max = 500): string {
  if (typeof v !== 'string') return '';
  return v.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/[<>]/g, '').trim().slice(0, max);
}

export const isEmail = (v: string) => /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(v) && v.length <= 254;
export const isPhone = (v: string) => /^[+0-9()\s-]{7,20}$/.test(v);

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'nefesercan@gmail.com';
