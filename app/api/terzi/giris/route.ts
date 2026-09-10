// ============================================================
// SwapHubs — app/api/terzi/giris/route.ts
// Telefon + şifre ile giriş.
//
// KÖTÜYE KULLANIM ENGELLEME:
//  - 5 yanlış şifre denemesinden sonra hesap 15 dakika kilitlenir
//  - Şifresi henüz belirlenmemiş numaralar için net bir yönlendirme
//    döner (frontend bunu görüp OTP+kayıt akışına yönlendirir)
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';
import { setSessionCookie } from '@/lib/terzi-session';

const MAX_YANLIS_DENEME = 5;
const KILIT_SURESI_MS = 15 * 60 * 1000; // 15 dakika

export async function POST(req: NextRequest) {
  try {
    const { telefon, sifre } = await req.json();
    if (!telefon || !sifre) {
      return NextResponse.json({ error: 'Telefon ve şifre zorunlu' }, { status: 400 });
    }

    const db = await getDb();
    const simdi = new Date();
    const kullanici = await db.collection('terziKullanicilar').findOne({ telefon });

    if (!kullanici || !kullanici.sifreHash) {
      return NextResponse.json(
        { error: 'Bu numara için henüz şifre belirlenmemiş.', sifreYok: true },
        { status: 404 }
      );
    }

    // ── Kilit kontrolü ──
    if (kullanici.sifreKilitlenmeZamani) {
      const kalanMs = KILIT_SURESI_MS - (simdi.getTime() - new Date(kullanici.sifreKilitlenmeZamani).getTime());
      if (kalanMs > 0) {
        const kalanDakika = Math.ceil(kalanMs / 60000);
        return NextResponse.json({ error: `Çok fazla yanlış deneme. Hesap ${kalanDakika} dakika kilitli.` }, { status: 429 });
      }
    }

    const dogruMu = await bcrypt.compare(sifre, kullanici.sifreHash);

    if (!dogruMu) {
      const yeniDeneme = (kullanici.sifreBasarisizDeneme || 0) + 1;
      const guncelleme: Record<string, any> = { sifreBasarisizDeneme: yeniDeneme };
      if (yeniDeneme >= MAX_YANLIS_DENEME) {
        guncelleme.sifreKilitlenmeZamani = simdi;
      }
      await db.collection('terziKullanicilar').updateOne({ telefon }, { $set: guncelleme });

      if (yeniDeneme >= MAX_YANLIS_DENEME) {
        return NextResponse.json({ error: `Çok fazla yanlış deneme. Hesap 15 dakika kilitlendi.` }, { status: 429 });
      }
      return NextResponse.json({ error: `Telefon numarası veya şifre hatalı. ${MAX_YANLIS_DENEME - yeniDeneme} deneme hakkınız kaldı.` }, { status: 401 });
    }

    await db.collection('terziKullanicilar').updateOne(
      { telefon },
      { $set: { sifreBasarisizDeneme: 0 }, $unset: { sifreKilitlenmeZamani: '' } }
    );

    setSessionCookie(kullanici._id.toString());
    return NextResponse.json({ success: true, userId: kullanici._id.toString() });
  } catch (err) {
    console.error('Giriş hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
