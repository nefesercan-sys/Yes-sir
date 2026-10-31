// ============================================================
// SwapHubs — app/api/terzi/giris/route.ts
// Telefon + şifre ile giriş.
//
// KÖTÜYE KULLANIM ENGELLEME:
//  - 5 yanlış şifre denemesinden sonra hesap 15 dakika kilitlenir
//  - Deneme hakkı bcrypt karşılaştırmasından ÖNCE, tek atomik güncellemeyle harcanır
//    (paralel isteklerle sayaç atlatılamaz); başarılı girişte sıfırlanır
//  - Şifresi henüz belirlenmemiş numaralar için net bir yönlendirme
//    döner (frontend bunu görüp OTP+kayıt akışına yönlendirir)
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';
import { setSessionCookie } from '@/lib/terzi-session';
import { rateLimited } from '@/lib/api-guard';

const MAX_YANLIS_DENEME = 5;
const KILIT_SURESI_MS = 15 * 60 * 1000; // 15 dakika
const TEK_HATA = 'Telefon numarası veya şifre hatalı.';

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(req, 'terzi-giris', 30, 10 * 60 * 1000)) {
      return NextResponse.json({ error: 'Çok fazla deneme. Lütfen biraz sonra tekrar deneyin.' }, { status: 429 });
    }
    const b = await req.json().catch(() => null);
    const telefon = typeof b?.telefon === 'string' ? b.telefon.trim() : '';
    const sifre = typeof b?.sifre === 'string' ? b.sifre : '';
    if (!telefon || !sifre) {
      return NextResponse.json({ error: 'Telefon ve şifre zorunlu' }, { status: 400 });
    }
    if (!/^\+?\d{10,15}$/.test(telefon) || sifre.length > 200) {
      return NextResponse.json({ error: 'Geçersiz telefon veya şifre biçimi' }, { status: 400 });
    }

    const db = await getDb();
    const col = db.collection('terziKullanicilar');
    const simdi = new Date();
    const esik = new Date(simdi.getTime() - KILIT_SURESI_MS);

    const kullanici = await col.findOne({ telefon }, { projection: { sifreHash: 1 } });
    if (!kullanici || !kullanici.sifreHash) {
      return NextResponse.json(
        { error: 'Bu numara için henüz şifre belirlenmemiş.', sifreYok: true },
        { status: 404 }
      );
    }

    // ── Deneme hakkını ATOMİK harca: yalnızca kilitli değilse eşleşir ──
    const kilitSuresiDoldu = {
      $and: [
        { $ne: [{ $type: '$sifreKilitlenmeZamani' }, 'missing'] },
        { $lte: ['$sifreKilitlenmeZamani', esik] },
      ],
    };
    const r: any = await col.findOneAndUpdate(
      {
        _id: kullanici._id,
        $or: [{ sifreKilitlenmeZamani: { $exists: false } }, { sifreKilitlenmeZamani: { $lte: esik } }],
      },
      [
        {
          $set: {
            sifreBasarisizDeneme: {
              $add: [{ $cond: [kilitSuresiDoldu, 0, { $ifNull: ['$sifreBasarisizDeneme', 0] }] }, 1],
            },
          },
        },
        {
          $set: {
            sifreKilitlenmeZamani: {
              $cond: [{ $gte: ['$sifreBasarisizDeneme', MAX_YANLIS_DENEME] }, simdi, '$$REMOVE'],
            },
          },
        },
      ] as any,
      { returnDocument: 'after' }
    );
    const guncel = r && 'value' in r ? r.value : r;
    if (!guncel) {
      return NextResponse.json({ error: 'Çok fazla yanlış deneme. Hesap geçici olarak kilitli, lütfen daha sonra tekrar deneyin.' }, { status: 429 });
    }

    const dogruMu = await bcrypt.compare(sifre, kullanici.sifreHash);

    if (!dogruMu) {
      if ((guncel.sifreBasarisizDeneme || 0) >= MAX_YANLIS_DENEME) {
        return NextResponse.json({ error: 'Çok fazla yanlış deneme. Hesap 15 dakika kilitlendi.' }, { status: 429 });
      }
      return NextResponse.json({ error: TEK_HATA }, { status: 401 });
    }

    await col.updateOne(
      { _id: kullanici._id },
      { $set: { sifreBasarisizDeneme: 0 }, $unset: { sifreKilitlenmeZamani: '' } }
    );

    setSessionCookie(kullanici._id.toString());
    return NextResponse.json({ success: true, userId: kullanici._id.toString() });
  } catch (err) {
    console.error('Giriş hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
