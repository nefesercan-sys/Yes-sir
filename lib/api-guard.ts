// Herkese açık (girişsiz) form API'leri için ortak koruma: IP başına hız sınırı + girdi temizleme.
import { birincilYonetici } from '@/lib/admin-list';
// NOT: Bellek içi sayaçtır (sunucusuz ortamda her örnek için ayrı). Kaba spam'i keser; GERÇEK dağıtık limit için
// Upstash Redis (@upstash/ratelimit) önerilir. Kritik uçlar (OTP, giriş) lib/hiz-sayaci.ts ile MongoDB'de atomik sayar.
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
  // Map ekleme sırasını korur: yeniden eklemek anahtarı sona taşır (en eskiler başta kalır)
  kovalar.delete(k);
  kovalar.set(k, liste);
  if (kovalar.size > 5000) {
    // Komple sıfırlamak yerine yalnızca en eski ~%10'u at (aktif saldırgan sayacı silinmesin)
    let silinecek = Math.ceil(kovalar.size * 0.1);
    for (const eski of Array.from(kovalar.keys())) {
      if (silinecek-- <= 0 || eski === k) break;
      kovalar.delete(eski);
    }
  }
  return liste.length > max;
}

/** Metni kırpar, kontrol karakterlerini ve < > işaretlerini temizler. */
export function clean(v: unknown, max = 500): string {
  if (typeof v !== 'string') return '';
  return v.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/[<>]/g, '').trim().slice(0, max);
}

export const isEmail = (v: string) => /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(v) && v.length <= 254;
export const isPhone = (v: string) => /^[+0-9()\s-]{7,20}$/.test(v);

export const ADMIN_EMAIL = birincilYonetici();

/**
 * Dağıtık (MongoDB atomik sayaç) + bellek içi birleşik hız sınırı. true dönerse limit aşıldı.
 * Sunucusuz ortamda örnekler arası ortak çalışır; veritabanına ulaşılamazsa bellek içi sınıra düşer (istek engellenmez).
 */
export async function rateLimitedDb(req: Request | NextRequest, anahtar: string, max: number, pencereMs: number): Promise<boolean> {
  if (rateLimited(req, anahtar, max, pencereMs)) return true;
  try {
    const [{ getDb }, { pencereSayaci }] = await Promise.all([import('@/lib/mongodb'), import('@/lib/hiz-sayaci')]);
    const db = await getDb();
    return (await pencereSayaci(db, `rl:${anahtar}:${clientIp(req)}`, pencereMs)) > max;
  } catch {
    return false;
  }
}
