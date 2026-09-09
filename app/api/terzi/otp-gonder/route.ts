// ============================================================
// SwapHubs — app/api/terzi/otp-gonder/route.ts
// Telefon numarasına 6 haneli doğrulama kodu üretir.
// Teslimat: yalnızca WhatsApp — kod, personelin /terzi-admin
// panelinde anında görünür ve tek dokunuşla WhatsApp'tan
// müşteriye iletilir.
// Ayrıca: her kod isteğinde site sahibine Telegram'dan anlık
// uyarı gider (ADMIN_TELEGRAM_CHAT_ID tanımlıysa) — panele
// sürekli bakmaya gerek kalmaz.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { telegramMesajGonder } from '@/lib/telegram';

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

    // Site sahibine anlık Telegram uyarısı — kod ve numara direkt mesajda,
    // panele bakmadan da WhatsApp'tan gönderebilsin diye.
    if (process.env.ADMIN_TELEGRAM_CHAT_ID) {
      const telegramSonuc = await telegramMesajGonder(
        process.env.ADMIN_TELEGRAM_CHAT_ID,
        `🔔 <b>Yeni kod talebi</b>\n📱 ${telefon}\n🔑 Kod: <b>${kod}</b>\n\nswaphubs.com/terzi-admin üzerinden WhatsApp'tan gönder.`
      );
      if (!telegramSonuc.success) {
        console.error('Telegram admin uyarısı gönderilemedi:', telegramSonuc.error);
      }
    } else {
      console.log('ADMIN_TELEGRAM_CHAT_ID tanımlı değil, Telegram uyarısı atlandı.');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('OTP gönder hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
