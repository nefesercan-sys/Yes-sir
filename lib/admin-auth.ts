// lib/admin-auth.ts — TEK yönetici yetki kontrolü (tüm admin/yazma uçları bunu kullanır)
//
// Yetkili sayılma yolları:
//  1) Giriş yapmış NextAuth oturumunun e-postası yönetici listesinde ise
//     (varsayılan: nefesercan@gmail.com + Vercel'deki ADMIN_EMAILS="a@x.com,b@y.com")
//  2) Sunucuda tanımlı gizli anahtar: x-admin-key başlığı (veya ?secret=) == ADMIN_API_KEY
//     (ADMIN_API_KEY'i Vercel → Environment Variables'a ekleyin. NEXT_PUBLIC_ ile BAŞLAMASIN;
//      NEXT_PUBLIC_ değişkenler tarayıcıya açık olur.)
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { timingSafeEqual } from 'crypto';

const VARSAYILAN_YONETICILER = ['nefesercan@gmail.com'];
const yoneticiler = () =>
  [...VARSAYILAN_YONETICILER, ...(process.env.ADMIN_EMAILS || '').split(',')]
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

function esit(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function isAdminRequest(req: Request, aday?: string): Promise<boolean> {
  try {
    const s = await getServerSession(authOptions);
    const mail = s?.user?.email?.toLowerCase();
    if (mail && yoneticiler().includes(mail)) return true;
  } catch {
    /* oturum okunamazsa anahtar yoluna düş */
  }
  const anahtar = process.env.ADMIN_API_KEY;
  if (!anahtar) return false;
  let verilen = aday ?? req.headers.get('x-admin-key') ?? '';
  if (!verilen) {
    try { verilen = new URL(req.url).searchParams.get('secret') ?? ''; } catch { /* yoksay */ }
  }
  return verilen.length > 0 && esit(verilen, anahtar);
}

/** Yetkisizse 401 yanıtı döner, yetkiliyse null. Kullanım: const g = await requireAdmin(req); if (g) return g; */
export async function requireAdmin(req: Request, aday?: string): Promise<NextResponse | null> {
  return (await isAdminRequest(req, aday)) ? null : NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
}
