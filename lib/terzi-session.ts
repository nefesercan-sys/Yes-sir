// ============================================================
// SwapHubs — lib/terzi-session.ts
// Terzi modülü için telefon-bazlı oturum (NextAuth'a dokunmaz)
// ============================================================
import { createHmac } from 'crypto';
import { cookies } from 'next/headers';

const SECRET = process.env.TERZI_SESSION_SECRET || process.env.NEXTAUTH_SECRET || 'terzi-dev-secret';
const COOKIE_NAME = 'terzi_session';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 gün

function sign(value: string) {
  return createHmac('sha256', SECRET).update(value).digest('hex');
}

export function createSessionToken(userId: string) {
  return `${userId}.${sign(userId)}`;
}

export function verifySessionToken(token?: string | null): string | null {
  if (!token) return null;
  const [userId, sig] = token.split('.');
  if (!userId || !sig || sign(userId) !== sig) return null;
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
