import { NextRequest } from 'next/server';
import { kayitIsle } from '@/lib/kayit';

// /uye-ol sayfası bu uca kayıt gönderir. Asıl iş lib/kayit.ts içinde (tek kaynak).
export async function POST(req: NextRequest) {
  return kayitIsle(req, { limitAnahtari: 'kayit', profil: 'tam' });
}
