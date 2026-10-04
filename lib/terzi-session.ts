// ============================================================
// SwapHubs — lib/terzi-session.ts
// Terzi modülü için telefon-bazlı oturum (NextAuth'a dokunmaz)
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

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function createSessionToken(userId: string) {
  return `${userId}.${sign(userId)}`;
}

export function verifySessionToken(token?: string | null): string | null {
  if (!token) return null;
  const [userId, sig] = token.split('.');
  if (!userId || !sig) return null;
  const a = Buffer.from(sign(userId));
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return userId;
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
