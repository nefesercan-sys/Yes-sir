// ============================================================
// SwapHubs — app/api/terzi/otp-gonder/route.ts
// Telefon numarasına 6 haneli doğrulama kodu gönderir
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { smsGonder } from '@/lib/sms';

export async function POST(req: NextRequest) {
  try {
    const { telefon } = await req.json();
    if (!telefon || !/^\+90\d{10}$/.test(telefon)) {
      return NextResponse.json({ error: 'Geçerli bir telefon numarası girin (+90XXXXXXXXXX)' }, { status: 400 });
    }

    const db = await getDb();
    const kod = Math.floor(100000 + Math.random() * 900000).toString();

    await db.collection('terziKullanicilar').updateOne(
      { telefon },
      {
        $set: { otpKod: kod, otpSonGecerlilik: new Date(Date.now() + 5 * 60000) },
        $setOnInsert: { telefon, isProvider: false, createdAt: new Date() },
      },
      { upsert: true }
    );

    await smsGonder(telefon, `SwapHubs Terzi doğrulama kodunuz: ${kod}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('OTP gönder hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
