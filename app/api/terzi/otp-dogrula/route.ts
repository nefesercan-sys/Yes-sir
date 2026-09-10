// ============================================================
// SwapHubs — app/api/terzi/otp-dogrula/route.ts
// Gönderilen kodu doğrular ve oturum çerezini set eder.
//
// KÖTÜYE KULLANIM ENGELLEME:
//  Kodu tahmin etmeye çalışan biri (000000-999999 deneyerek)
//  başkasının hesabına giremesin diye:
//  - Bir numaraya en fazla 5 yanlış deneme hakkı var
//  - 5. yanlış denemeden sonra kod tamamen geçersiz sayılır,
//    saldırgan yeni kod isteyip baştan başlamak zorunda kalır
//    (ki o yeni kod da yalnızca gerçek numara sahibine WhatsApp'tan gider)
//  - Ayrıca IP başına saatlik doğrulama deneme limiti var
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { setSessionCookie } from '@/lib/terzi-session';

const NUMARA_MAX_YANLIS_DENEME = 5;
const IP_SAATLIK_DENEME_LIMIT = 20;
const PENCERE_MS = 60 * 60 * 1000;

function ipAl(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'bilinmiyor';
}

export async function POST(req: NextRequest) {
  try {
    const { telefon, kod, isProvider } = await req.json();
    if (!telefon || !kod) {
      return NextResponse.json({ error: 'Telefon ve kod zorunlu' }, { status: 400 });
    }

    const db = await getDb();
    const simdi = new Date();
    const ip = ipAl(req);

    // ── IP bazlı saatlik doğrulama deneme limiti ──
    const ipKaydi = await db.collection('otpDogrulaIpLimit').findOne({ ip });
    if (ipKaydi && simdi.getTime() - new Date(ipKaydi.pencereBaslangic).getTime() < PENCERE_MS) {
      if (ipKaydi.sayi >= IP_SAATLIK_DENEME_LIMIT) {
        return NextResponse.json({ error: 'Çok fazla deneme yapıldı. Lütfen bir süre sonra tekrar deneyin.' }, { status: 429 });
      }
      await db.collection('otpDogrulaIpLimit').updateOne({ ip }, { $inc: { sayi: 1 } });
    } else {
      await db.collection('otpDogrulaIpLimit').updateOne(
        { ip }, { $set: { ip, sayi: 1, pencereBaslangic: simdi } }, { upsert: true }
      );
    }

    const kullanici = await db.collection('terziKullanicilar').findOne({ telefon });

    if (!kullanici || !kullanici.otpKod) {
      return NextResponse.json({ error: 'Kod hatalı veya süresi dolmuş, yeni kod isteyin' }, { status: 400 });
    }
    if (!kullanici.otpSonGecerlilik || new Date(kullanici.otpSonGecerlilik) < simdi) {
      return NextResponse.json({ error: 'Kodun süresi doldu, tekrar isteyin' }, { status: 400 });
    }

    // ── Yanlış kod: deneme sayacını artır, limite ulaştıysa kodu tamamen iptal et ──
    if (kullanici.otpKod !== kod) {
      const yeniDenemeSayisi = (kullanici.otpBasarisizDeneme || 0) + 1;

      if (yeniDenemeSayisi >= NUMARA_MAX_YANLIS_DENEME) {
        await db.collection('terziKullanicilar').updateOne(
          { telefon },
          { $unset: { otpKod: '', otpSonGecerlilik: '' }, $set: { otpBasarisizDeneme: 0 } }
        );
        return NextResponse.json({ error: 'Çok fazla yanlış deneme. Güvenlik için kod iptal edildi, lütfen yeni kod isteyin.' }, { status: 429 });
      }

      await db.collection('terziKullanicilar').updateOne({ telefon }, { $set: { otpBasarisizDeneme: yeniDenemeSayisi } });
      const kalanDeneme = NUMARA_MAX_YANLIS_DENEME - yeniDenemeSayisi;
      return NextResponse.json({ error: `Kod hatalı. ${kalanDeneme} deneme hakkınız kaldı.` }, { status: 400 });
    }

    // ── Doğru kod: oturumu aç, sayaçları sıfırla ──
    await db.collection('terziKullanicilar').updateOne(
      { telefon },
      {
        $set: { dogrulandi: true, otpBasarisizDeneme: 0, ...(isProvider ? { isProvider: true } : {}) },
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
