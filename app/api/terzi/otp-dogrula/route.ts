// ============================================================
// SwapHubs — app/api/terzi/otp-dogrula/route.ts
// Gönderilen kodu doğrular ve oturum çerezini set eder
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { setSessionCookie } from '@/lib/terzi-session';

export async function POST(req: NextRequest) {
  try {
    const { telefon, kod, isProvider } = await req.json();
    if (!telefon || !kod) {
      return NextResponse.json({ error: 'Telefon ve kod zorunlu' }, { status: 400 });
    }

    const db = await getDb();
    const kullanici = await db.collection('terziKullanicilar').findOne({ telefon });

    if (!kullanici || kullanici.otpKod !== kod) {
      return NextResponse.json({ error: 'Kod hatalı' }, { status: 400 });
    }
    if (!kullanici.otpSonGecerlilik || new Date(kullanici.otpSonGecerlilik) < new Date()) {
      return NextResponse.json({ error: 'Kodun süresi doldu, tekrar isteyin' }, { status: 400 });
    }

    await db.collection('terziKullanicilar').updateOne(
      { telefon },
      {
        $set: { dogrulandi: true, ...(isProvider ? { isProvider: true } : {}) },
        $unset: { otpKod: '', otpSonGecerlilik: '' },
      }
    );

    setSessionCookie(kullanici._id.toString());

    return NextResponse.json({ success: true, userId: kullanici._id.toString() });
  } catch (err) {
    console.error('OTP doğrula hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
