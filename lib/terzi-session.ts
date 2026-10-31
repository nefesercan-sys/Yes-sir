// ============================================================
// SwapHubs — lib/terzi-session.ts
// Terzi modülü için telefon-bazlı oturum (NextAuth'a dokunmaz)
// Token biçimi (v2): v2.<userId>.<iat>.<exp>.<imza>  — imza HMAC-SHA256(v2.userId.iat.exp)
// Eski biçim (<userId>.<imza>, süresiz) varsayılan olarak KABUL EDİLMEZ (kullanıcılar bir kez yeniden giriş yapar).
// Geçiş için geçici olarak TERZI_ESKI_TOKEN_KABUL=1 verilebilir.
// ============================================================
import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

function getSecret(): string {
  const s = process.env.TERZI_SESSION_SECRET || process.env.NEXTAUTH_SECRET;
  if (!s) throw new Error('TERZI_SESSION_SECRET (veya NEXTAUTH_SECRET) tanımlı olmalı');
  return s;
}
const COOKIE_NAME = 'terzi_session';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 gün
const ID_BICIMI = /^[0-9a-fA-F]{24}$/;

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

function imzaEsit(beklenen: string, gelen: string): boolean {
  const a = Buffer.from(beklenen);
  const b = Buffer.from(gelen);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createSessionToken(userId: string) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + MAX_AGE;
  const yuk = `v2.${userId}.${iat}.${exp}`;
  return `${yuk}.${sign(yuk)}`;
}

export function verifySessionToken(token?: string | null): string | null {
  if (!token) return null;
  const p = token.split('.');

  if (p[0] === 'v2' && p.length === 5) {
    const [, userId, iatS, expS, sig] = p;
    if (!ID_BICIMI.test(userId) || !/^\d+$/.test(iatS) || !/^\d+$/.test(expS) || !sig) return null;
    if (!imzaEsit(sign(`v2.${userId}.${iatS}.${expS}`), sig)) return null;
    const simdi = Math.floor(Date.now() / 1000);
    if (Number(expS) <= simdi || Number(iatS) > simdi + 300) return null; // süresi dolmuş / gelecekten gelen
    return userId;
  }

  // Eski biçim: yalnızca geçiş bayrağı açıksa
  if (process.env.TERZI_ESKI_TOKEN_KABUL === '1' && p.length === 2) {
    const [userId, sig] = p;
    if (!userId || !sig || !ID_BICIMI.test(userId)) return null;
    return imzaEsit(sign(userId), sig) ? userId : null;
  }
  return null;
}

export function setSessionCookie(userId: string) {
  cookies().set(COOKIE_NAME, createSessionToken(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export function getSessionUserId(): string | null {
  return verifySessionToken(cookies().get(COOKIE_NAME)?.value);
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
}
