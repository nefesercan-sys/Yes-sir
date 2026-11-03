// ============================================================
// SwapHubs — app/api/terzi/otp-dogrula/route.ts
// Gönderilen kodu doğrular ve oturum çerezini set eder.
//
// KÖTÜYE KULLANIM ENGELLEME:
//  - Deneme hakkı, kod karşılaştırılmadan ÖNCE tek atomik güncellemeyle harcanır (paralel isteklerle atlatılamaz)
//  - Bir kod en fazla 5 denemede geçerlidir; 5. yanlıştan sonra kod tamamen iptal edilir
//  - Kod tek kullanımlıktır (doğru girişte atomik olarak silinir)
//  - IP başına saatlik doğrulama deneme limiti
//  - Başarısızlık nedeni ne olursa olsun TEK TİP hata mesajı döner (numara/kod durumu sızmaz)
// Kod karşılaştırması sabit zamanlıdır. Kod HMAC olarak saklanır (otpHash); eski düz metin kayıtlar (otpKod) 5 dk'lık ömürleri boyunca geriye dönük doğrulanır.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { setSessionCookie } from '@/lib/terzi-session';
import { pencereSayaci } from '@/lib/hiz-sayaci';
import { clientIp } from '@/lib/api-guard';
import { otpHashle, otpEsit } from '@/lib/otp';

const NUMARA_MAX_DENEME = 5;
const IP_SAATLIK_DENEME_LIMIT = 20;
const PENCERE_MS = 60 * 60 * 1000;
const TEK_HATA = 'Kod hatalı veya süresi dolmuş, yeni kod isteyin.';

export async function POST(req: NextRequest) {
  try {
    const b = await req.json().catch(() => null);
    const telefon = typeof b?.telefon === 'string' ? b.telefon.trim() : '';
    const kod = typeof b?.kod === 'string' || typeof b?.kod === 'number' ? String(b.kod).trim() : '';
    const isProvider = b?.isProvider === true;
    if (!telefon || !kod) {
      return NextResponse.json({ error: 'Telefon ve kod zorunlu' }, { status: 400 });
    }
    if (!/^\+?\d{10,15}$/.test(telefon) || !/^\d{4,8}$/.test(kod)) {
      return NextResponse.json({ error: 'Geçersiz telefon veya kod biçimi' }, { status: 400 });
    }

    const db = await getDb();
    const col = db.collection('terziKullanicilar');
    const simdi = new Date();

    // ── IP bazlı saatlik doğrulama deneme limiti (atomik) ──
    if ((await pencereSayaci(db, `otpv-ip:${clientIp(req)}`, PENCERE_MS)) > IP_SAATLIK_DENEME_LIMIT) {
      return NextResponse.json({ error: 'Çok fazla deneme yapıldı. Lütfen bir süre sonra tekrar deneyin.' }, { status: 429 });
    }

    // ── Deneme hakkını ATOMİK harca: aktif kodu olan ve hakkı kalan kayıt eşleşir ──
    const r: any = await col.findOneAndUpdate(
      {
        telefon,
        $or: [{ otpHash: { $type: 'string' } }, { otpKod: { $type: 'string' } }],
        otpSonGecerlilik: { $gt: simdi },
        otpBasarisizDeneme: { $not: { $gte: NUMARA_MAX_DENEME } },
      },
      { $inc: { otpBasarisizDeneme: 1 } },
      { returnDocument: 'after' }
    );
    const kayit = r && 'value' in r ? r.value : r;
    if (!kayit) {
      return NextResponse.json({ error: TEK_HATA }, { status: 400 });
    }

    const dogruMu = typeof kayit.otpHash === 'string'
      ? otpEsit(String(kayit.otpHash), otpHashle(telefon, kod))
      : otpEsit(String(kayit.otpKod), kod);
    if (!dogruMu) {
      // Hak bittiyse kodu tamamen iptal et (yeni kod istemek zorunda)
      if ((kayit.otpBasarisizDeneme || 0) >= NUMARA_MAX_DENEME) {
        await col.updateOne({ _id: kayit._id, otpSonGecerlilik: kayit.otpSonGecerlilik }, { $unset: { otpKod: '', otpHash: '', otpSifreli: '', otpSonGecerlilik: '' } });
      }
      return NextResponse.json({ error: TEK_HATA }, { status: 400 });
    }

    // ── Doğru kod: TEK KULLANIM — kodu atomik olarak tüket (aynı kodla paralel iki istekten yalnızca biri geçer) ──
    const tuketilen: any = await col.findOneAndUpdate(
      { _id: kayit._id, otpSonGecerlilik: kayit.otpSonGecerlilik, $or: [{ otpHash: { $type: 'string' } }, { otpKod: { $type: 'string' } }] },
      {
        $set: {
          dogrulandi: true,
          otpBasarisizDeneme: 0,
          otpDogrulamaZamani: simdi, // sifre-belirle: yakın zamanda OTP doğrulaması yapıldı (şifremi unuttum akışı)
          ...(isProvider ? { isProvider: true } : {}),
        },
        $unset: { otpKod: '', otpHash: '', otpSifreli: '', otpSonGecerlilik: '' },
      },
      { returnDocument: 'after' }
    );
    const kullanici = tuketilen && 'value' in tuketilen ? tuketilen.value : tuketilen;
    if (!kullanici) {
      return NextResponse.json({ error: TEK_HATA }, { status: 400 });
    }

    setSessionCookie(kullanici._id.toString());
    return NextResponse.json({ success: true, userId: kullanici._id.toString() });
  } catch (err) {
    console.error('OTP doğrula hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
