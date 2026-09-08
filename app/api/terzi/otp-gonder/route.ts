// ============================================================
// SwapHubs — app/api/terzi/otp-gonder/route.ts
// Telefon numarasına 6 haneli doğrulama kodu üretir.
// Teslimat: yalnızca WhatsApp — kod, personelin /terzi-admin
// panelinde anında görünür ve tek dokunuşla WhatsApp'tan
// müşteriye iletilir. Başka hiçbir kanal kullanılmaz.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

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

    // Kod burada gönderilmiyor — /terzi-admin panelinde beliriyor,
    // personel WhatsApp'tan tek dokunuşla iletiyor.
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('OTP gönder hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
