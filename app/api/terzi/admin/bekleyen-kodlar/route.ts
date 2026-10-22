// ============================================================
// SwapHubs — app/api/terzi/admin/bekleyen-kodlar/route.ts
// Personelin süresi dolmamış OTP kodlarını görüp WhatsApp'tan
// manuel iletebilmesi için. Basit paylaşılan-parola koruması
// (ADMIN_SECRET .env değişkeni).
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAdminSecretOrSession } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const yetki = await requireAdminSecretOrSession(req);
  if (yetki) return yetki;

  const db = await getDb();

  const kayitlar = await db.collection('terziKullanicilar')
    .find({
      otpKod: { $exists: true, $ne: null },
      otpSonGecerlilik: { $gt: new Date() },
    })
    .project({ telefon: 1, otpKod: 1, otpSonGecerlilik: 1, _id: 0 })
    .sort({ otpSonGecerlilik: -1 })
    .limit(20)
    .toArray();

  return NextResponse.json(kayitlar);
}
