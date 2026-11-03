// ============================================================
// SwapHubs — app/api/terzi/admin/bekleyen-kodlar/route.ts
// Personelin süresi dolmamış OTP kodlarını görüp WhatsApp'tan
// manuel iletebilmesi için. Basit paylaşılan-parola koruması
// (ADMIN_SECRET .env değişkeni).
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAdminSecretOrSession } from '@/lib/admin-auth';
import { otpCoz } from '@/lib/otp';

export async function GET(req: NextRequest) {
  const yetki = await requireAdminSecretOrSession(req);
  if (yetki) return yetki;

  const db = await getDb();

  const kayitlar = await db.collection('terziKullanicilar')
    .find({
      $or: [{ otpSifreli: { $type: 'string' } }, { otpKod: { $type: 'string' } }],
      otpSonGecerlilik: { $gt: new Date() },
    })
    .project({ telefon: 1, otpKod: 1, otpSifreli: 1, otpSonGecerlilik: 1, _id: 0 })
    .sort({ otpSonGecerlilik: -1 })
    .limit(20)
    .toArray();

  // Kod DB'de şifreli tutulur (lib/otp.ts); yalnızca yetkili personele burada çözülüp gösterilir. Panel `otpKod` alanını bekler.
  const cevap = kayitlar
    .map((k: any) => ({ telefon: k.telefon, otpKod: otpCoz(k.otpSifreli) ?? (typeof k.otpKod === 'string' ? k.otpKod : null), otpSonGecerlilik: k.otpSonGecerlilik }))
    .filter((k: any) => k.otpKod);

  return NextResponse.json(cevap);
}
