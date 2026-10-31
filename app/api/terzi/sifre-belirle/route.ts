// ============================================================
// SwapHubs — app/api/terzi/sifre-belirle/route.ts
// Oturumu açık kullanıcı şifre belirler/değiştirir.
//  - Şifresi henüz YOKSA (ilk kayıt): doğrudan belirlenir (OTP ile doğrulanmış oturum).
//  - Şifresi VARSA şu iki yoldan biri gerekir:
//      a) eskiSifre doğru verilmiş, veya
//      b) son 10 dakikada OTP doğrulaması yapılmış ("şifremi unuttum" akışı; OTP'den hemen sonra çağrılır).
//    Böylece yalnızca açık kalmış/çalınmış oturumla şifre değiştirilemez.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getSessionUserId } from '@/lib/terzi-session';
import { rateLimited } from '@/lib/api-guard';

const OTP_YAKIN_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const userId = getSessionUserId();
    if (!userId || !ObjectId.isValid(userId)) return NextResponse.json({ error: 'Önce telefon doğrulaması yapın' }, { status: 401 });

    if (rateLimited(req, 'terzi-sifre-belirle', 10, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin.' }, { status: 429 });
    }

    const b = await req.json().catch(() => null);
    const sifre = b?.sifre;
    const eskiSifre = typeof b?.eskiSifre === 'string' ? b.eskiSifre : '';
    if (!sifre || typeof sifre !== 'string' || sifre.length < 6 || sifre.length > 128) {
      return NextResponse.json({ error: 'Şifre en az 6 karakter olmalı' }, { status: 400 });
    }

    const db = await getDb();
    const col = db.collection('terziKullanicilar');
    const kullanici = await col.findOne(
      { _id: new ObjectId(userId) },
      { projection: { sifreHash: 1, otpDogrulamaZamani: 1 } }
    );
    if (!kullanici) return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });

    if (kullanici.sifreHash) {
      const otpYakin = kullanici.otpDogrulamaZamani &&
        Date.now() - new Date(kullanici.otpDogrulamaZamani).getTime() < OTP_YAKIN_MS;
      const eskiDogru = !!eskiSifre && (await bcrypt.compare(eskiSifre, kullanici.sifreHash));
      if (!otpYakin && !eskiDogru) {
        return NextResponse.json({ error: 'Mevcut şifrenizi girin veya telefon doğrulaması yapın', eskiSifreGerekli: true }, { status: 403 });
      }
    }

    const sifreHash = await bcrypt.hash(sifre, 10);
    await col.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { sifreHash, sifreBasarisizDeneme: 0 }, $unset: { sifreKilitlenmeZamani: '', otpDogrulamaZamani: '' } }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Şifre belirle hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
