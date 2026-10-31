// ============================================================
// SwapHubs — app/api/terzi/otp-gonder/route.ts
// Telefon numarasına 6 haneli doğrulama kodu üretir.
// Teslimat: WhatsApp (personel /terzi-admin panelinden manuel iletir).
// Site sahibine Telegram'dan anlık uyarı gider.
//
// KÖTÜYE KULLANIM ENGELLEME (hepsi atomik MongoDB sayacıyla, lib/hiz-sayaci.ts):
//  1) Aynı numaraya art arda istek: 60 saniye bekleme süresi (aktif kod varken yenisi üretilmez)
//  2) Aynı numara: saatte en fazla 5 kod isteği
//  3) Aynı IP: saatte en fazla 15 kod isteği (farklı numaralara toplu istek atmayı engeller)
//
// NOT: Kod düz metin saklanır çünkü personelin /terzi-admin/bekleyen-kodlar ekranı kodu göstermek zorunda
// (manuel WhatsApp teslimi). Bunun yerine kod 5 dk ömürlü, tek kullanımlık ve deneme sayacı atomik.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { randomInt } from 'crypto';
import { getDb } from '@/lib/mongodb';
import { telegramMesajGonder, htmlKacir } from '@/lib/telegram';
import { pencereSayaci } from '@/lib/hiz-sayaci';
import { clientIp } from '@/lib/api-guard';

const BEKLEME_SANIYE = 60;
const NUMARA_SAATLIK_LIMIT = 5;
const IP_SAATLIK_LIMIT = 15;
const PENCERE_MS = 60 * 60 * 1000; // 1 saat

export async function POST(req: NextRequest) {
  try {
    const b = await req.json().catch(() => null);
    const telefon = typeof b?.telefon === 'string' ? b.telefon.trim() : '';
    if (!/^\+90\d{10}$/.test(telefon)) {
      return NextResponse.json({ error: 'Geçerli bir telefon numarası girin (+90XXXXXXXXXX)' }, { status: 400 });
    }

    const db = await getDb();
    const simdi = new Date();
    const ip = clientIp(req);

    // ── 1) IP bazlı saatlik limit ──
    if ((await pencereSayaci(db, `otp-ip:${ip}`, PENCERE_MS)) > IP_SAATLIK_LIMIT) {
      return NextResponse.json({ error: 'Çok fazla istek gönderildi. Lütfen bir süre sonra tekrar deneyin.' }, { status: 429 });
    }

    // ── 2) Numara bazlı: 60 sn bekleme (art arda yeni kod üretimini keser) + saatlik limit ──
    if ((await pencereSayaci(db, `otp-bekle:${telefon}`, BEKLEME_SANIYE * 1000)) > 1) {
      return NextResponse.json({ error: `Çok sık deniyorsunuz. Bir dakika sonra tekrar deneyin.` }, { status: 429 });
    }
    if ((await pencereSayaci(db, `otp-tel:${telefon}`, PENCERE_MS)) > NUMARA_SAATLIK_LIMIT) {
      return NextResponse.json({ error: 'Bu numara için saatlik istek limitine ulaşıldı. Lütfen daha sonra tekrar deneyin.' }, { status: 429 });
    }

    const kod = randomInt(100000, 1000000).toString();

    await db.collection('terziKullanicilar').updateOne(
      { telefon },
      {
        $set: {
          otpKod: kod,
          otpSonGecerlilik: new Date(simdi.getTime() + 5 * 60000),
          otpSonTalepZamani: simdi,
          otpBasarisizDeneme: 0,
        },
        $setOnInsert: { telefon, isProvider: false, createdAt: simdi },
      },
      { upsert: true }
    );

    if (process.env.ADMIN_TELEGRAM_CHAT_ID) {
      const telegramSonuc = await telegramMesajGonder(
        process.env.ADMIN_TELEGRAM_CHAT_ID,
        `🔔 <b>Yeni kod talebi</b>\n📱 ${htmlKacir(telefon)}\n🔑 Kod: <b>${htmlKacir(kod)}</b>\n\nswaphubs.com/terzi-admin üzerinden WhatsApp'tan gönder.`
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
