// ============================================================
// lib/otp.ts — OTP kodlarını DB'de düz metin tutmamak için yardımcılar.
//  - otpHash   : HMAC-SHA256(telefon + kod) — doğrulama bununla yapılır (sabit zamanlı karşılaştırma).
//  - otpSifreli: AES-256-GCM ile şifreli kod — YALNIZCA personel panelinin (WhatsApp'tan manuel iletim) kodu
//                gösterebilmesi için; anahtar sunucu ortam değişkeninden türetilir, DB sızıntısı tek başına kodu vermez.
// Eski kayıtlarda (otpKod düz metin, en çok 5 dk ömürlü) doğrulama geriye dönük çalışmaya devam eder.
// ============================================================
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';

function anahtarMetni(): string {
  // Sabit yedek anahtar YOK: sır tanımlı değilse çağrı anında hata verilir (build sırasında değil).
  const s = process.env.TERZI_SESSION_SECRET || process.env.NEXTAUTH_SECRET;
  if (!s) throw new Error('TERZI_SESSION_SECRET (veya NEXTAUTH_SECRET) tanımlı olmalı');
  return s;
}

export function otpHashle(telefon: string, kod: string): string {
  return createHmac('sha256', anahtarMetni()).update(`otp:${telefon}:${kod}`).digest('hex');
}

/** Sabit zamanlı eşitlik (iki tarafı da HMAC'leyip karşılaştırır; uzunluk farkı sızmaz). */
export function otpEsit(a: string, b: string): boolean {
  const k = anahtarMetni();
  const x = createHmac('sha256', k).update(a).digest();
  const y = createHmac('sha256', k).update(b).digest();
  return timingSafeEqual(x, y);
}

function aesAnahtari(): Buffer {
  return createHash('sha256').update(`otp-aes:${anahtarMetni()}`).digest();
}

export function otpSifrele(kod: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', aesAnahtari(), iv);
  const ct = Buffer.concat([c.update(kod, 'utf8'), c.final()]);
  return [iv.toString('base64'), c.getAuthTag().toString('base64'), ct.toString('base64')].join('.');
}

export function otpCoz(veri: unknown): string | null {
  if (typeof veri !== 'string') return null;
  try {
    const [iv, tag, ct] = veri.split('.');
    const d = createDecipheriv('aes-256-gcm', aesAnahtari(), Buffer.from(iv, 'base64'));
    d.setAuthTag(Buffer.from(tag, 'base64'));
    return Buffer.concat([d.update(Buffer.from(ct, 'base64')), d.final()]).toString('utf8');
  } catch {
    return null;
  }
}
