// ============================================================
// lib/kayit.ts — Üye kaydı için TEK ortak işleyici (/api/kayit ve /api/auth/kayit buradan çağrılır).
// - Yeni hesaplarda şifre en az 8 karakter (mevcut hesaplar etkilenmez; giriş kontrolü ayrı).
// - Kullanıcı varlığı sızıntısı azaltıldı: e-posta zaten kayıtlıysa da, yönetici e-postasıysa da AYNI durum kodu ve
//   AYNI mesaj döner; ayrıca bu iki durumda da bcrypt hesaplanır (yanıt süresi farkı gizlenir). Yarış durumunda
//   (eşzamanlı çift kayıt) Mongo duplicate-key hatası da aynı yanıta çevrilir.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';
import { clean, isEmail, rateLimitedDb } from '@/lib/api-guard';
import { adminEpostasiMi } from '@/lib/admin-auth';

export const SIFRE_MIN = 8;
export const SIFRE_MAX = 128;

const GENEL_RED = 'Kayıt tamamlanamadı. Bu e-posta ile daha önce kayıt olduysanız giriş yapın veya şifrenizi sıfırlayın.';

type Secenek = {
  /** Hız sınırı anahtarı (eski uçların sayaçları ayrı kalsın). */
  limitAnahtari: string;
  /** 'tam': /uye-ol (telefon, şehir, firma, tip...), 'basit': /kayit (yalnız ad + e-posta + şifre). */
  profil: 'tam' | 'basit';
};

export async function kayitIsle(req: NextRequest, { limitAnahtari, profil }: Secenek): Promise<NextResponse> {
  try {
    if (await rateLimitedDb(req, limitAnahtari, 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: 'Çok fazla deneme. Lütfen biraz sonra tekrar deneyin.' }, { status: 429 });
    }
    const b = await req.json().catch(() => null);
    const ad = clean(b?.ad, 80);
    const soyad = profil === 'tam' ? clean(b?.soyad, 80) : '';
    const email = clean(b?.email, 254).toLowerCase();
    const sifre = typeof b?.sifre === 'string' ? b.sifre : '';

    if (!ad || !email || !sifre) {
      return NextResponse.json({ error: 'Ad, e-posta ve şifre zorunlu' }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: 'E-posta adresi geçersiz' }, { status: 400 });
    }
    if (sifre.length < SIFRE_MIN || sifre.length > SIFRE_MAX) {
      return NextResponse.json({ error: `Şifre en az ${SIFRE_MIN} karakter olmalı` }, { status: 400 });
    }

    const db = await getDb();
    // Süre eşitleme: hash her durumda hesaplanır.
    const hash = await bcrypt.hash(sifre, 12);

    const mevcut = await db.collection('users').findOne({ email }, { projection: { _id: 1 } });
    // Yönetici e-postasıyla yeni kayıt yapılamaz (yetki ele geçirmeyi önler); mevcut kayıtla aynı yanıt verilir.
    if (mevcut || adminEpostasiMi(email)) {
      return NextResponse.json({ error: GENEL_RED }, { status: 409 });
    }

    const simdi = new Date();
    const tamAd = `${ad} ${soyad}`.trim();
    const user =
      profil === 'tam'
        ? {
            name: tamAd, // NextAuth oturumunun okuduğu alan
            ad: tamAd, // eski alan (geriye dönük uyum)
            email,
            password: hash,
            role: 'user',
            telefon: clean(b?.telefon, 30),
            sehir: clean(b?.sehir, 60),
            firmaAd: clean(b?.firmaAd, 120),
            tip: clean(b?.tip, 30) || 'hizmet_alan',
            bakiye: 0,
            profilTamamlandi: false,
            olusturuldu: simdi,
            createdAt: simdi,
            guncellendi: simdi,
          }
        : { name: tamAd, email, password: hash, role: 'user', createdAt: simdi, updatedAt: simdi };

    try {
      await db.collection('users').insertOne(user);
    } catch (e: any) {
      if (e?.code === 11000) return NextResponse.json({ error: GENEL_RED }, { status: 409 });
      throw e;
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    console.error('Kayıt hatası:', e);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
