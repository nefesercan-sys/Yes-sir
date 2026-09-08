// ============================================================
// SwapHubs — app/api/terzi/cikis/route.ts
// Terzi modülü oturum çerezini temizler
// ============================================================
import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/terzi-session';

export async function POST() {
  clearSessionCookie();
  return NextResponse.json({ success: true });
}
