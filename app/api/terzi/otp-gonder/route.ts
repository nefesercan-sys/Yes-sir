// ============================================================
// SwapHubs — app/api/terzi/otp-gonder/route.ts
// Telefon numarasına 6 haneli doğrulama kodu üretir.
// Teslimat: WhatsApp (personel /terzi-admin panelinden manuel iletir).
// Site sahibine Telegram'dan anlık uyarı gider.
//
// KÖTÜYE KULLANIM ENGELLEME:
//  1) Aynı numaraya art arda istek: 60 saniye bekleme süresi
//  2) Aynı numara: saatte en fazla 5 kod isteği
//  3) Aynı IP: saatte en fazla 15 kod isteği (farklı numaralara toplu istek atmayı engeller)
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { telegramMesajGonder } from '@/lib/telegram';

const BEKLEME_SANIYE = 60;
const NUMARA_SAATLIK_LIMIT = 5;
const IP_SAATLIK_LIMIT = 15;
const PENCERE_MS = 60 * 60 * 1000; // 1 saat

function ipAl(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'bilinmiyor';
}

export async function POST(req: NextRequest) {
  try {
    const { telefon } = await req.json();
    if (!telefon || !/^\+90\d{10}$/.test(telefon)) {
      return NextResponse.json({ error: 'Geçerli bir telefon numarası girin (+90XXXXXXXXXX)' }, { status: 400 });
    }

    const db = await getDb();
    const simdi = new Date();
    const ip = ipAl(req);

    // ── 1) IP bazlı saatlik limit (farklı numaralara toplu istek atmayı engeller) ──
    const ipKaydi = await db.collection('otpIpLimit').findOne({ ip });
    if (ipKaydi && simdi.getTime() - new Date(ipKaydi.pencereBaslangic).getTime() < PENCERE_MS) {
      if (ipKaydi.sayi >= IP_SAATLIK_LIMIT) {
        return NextResponse.json({ error: 'Çok fazla istek gönderildi. Lütfen bir süre sonra tekrar deneyin.' }, { status: 429 });
      }
      await db.collection('otpIpLimit').updateOne({ ip }, { $inc: { sayi: 1 } });
    } else {
      await db.collection('otpIpLimit').updateOne(
        { ip }, { $set: { ip, sayi: 1, pencereBaslangic: simdi } }, { upsert: true }
      );
    }

    // ── 2) Numaraya özel: bekleme süresi + saatlik limit ──
    const kullanici = await db.collection('terziKullanicilar').findOne({ telefon });

    if (kullanici?.otpSonTalepZamani) {
      const gecenSaniye = (simdi.getTime() - new Date(kullanici.otpSonTalepZamani).getTime()) / 1000;
      if (gecenSaniye < BEKLEME_SANIYE) {
        const kalan = Math.ceil(BEKLEME_SANIYE - gecenSaniye);
        return NextResponse.json({ error: `Çok sık deniyorsunuz. ${kalan} saniye sonra tekrar deneyin.` }, { status: 429 });
      }
    }

    let yeniTalepSayisi = 1;
    if (kullanici?.otpTalepPencereBaslangic && simdi.getTime() - new Date(kullanici.otpTalepPencereBaslangic).getTime() < PENCERE_MS) {
      if ((kullanici.otpTalepSayisiSaatlik || 0) >= NUMARA_SAATLIK_LIMIT) {
        return NextResponse.json({ error: 'Bu numara için saatlik istek limitine ulaşıldı. Lütfen daha sonra tekrar deneyin.' }, { status: 429 });
      }
      yeniTalepSayisi = (kullanici.otpTalepSayisiSaatlik || 0) + 1;
    }

    const kod = Math.floor(100000 + Math.random() * 900000).toString();

    await db.collection('terziKullanicilar').updateOne(
      { telefon },
      {
        $set: {
          otpKod: kod,
          otpSonGecerlilik: new Date(simdi.getTime() + 5 * 60000),
          otpSonTalepZamani: simdi,
          otpTalepSayisiSaatlik: yeniTalepSayisi,
          ...((!kullanici?.otpTalepPencereBaslangic || simdi.getTime() - new Date(kullanici.otpTalepPencereBaslangic).getTime() >= PENCERE_MS)
            ? { otpTalepPencereBaslangic: simdi } : {}),
        },
        $setOnInsert: { telefon, isProvider: false, createdAt: simdi },
      },
      { upsert: true }
    );

    if (process.env.ADMIN_TELEGRAM_CHAT_ID) {
      const telegramSonuc = await telegramMesajGonder(
        process.env.ADMIN_TELEGRAM_CHAT_ID,
        `🔔 <b>Yeni kod talebi</b>\n📱 ${telefon}\n🔑 Kod: <b>${kod}</b>\n\nswaphubs.com/terzi-admin üzerinden WhatsApp'tan gönder.`
      );
      if (!telegramSonuc.success) {
        console.error('Telegram admin uyarısı gönderilemedi:', telegramSonuc.error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('OTP gönder hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
