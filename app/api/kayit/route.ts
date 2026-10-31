import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { clean, isEmail, rateLimited } from '@/lib/api-guard';
import { adminEpostasiMi } from '@/lib/admin-auth';

// /uye-ol sayfası bu uca kayıt gönderir. Şifre artık bcrypt ile saklanır (NextAuth giriş kontrolüyle aynı yöntem).
export async function POST(req: NextRequest) {
  try {
    if (rateLimited(req, 'kayit', 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: 'Çok fazla deneme. Lütfen biraz sonra tekrar deneyin.' }, { status: 429 });
    }
    const b = await req.json();
    const ad = clean(b?.ad, 80);
    const soyad = clean(b?.soyad, 80);
    const email = clean(b?.email, 254).toLowerCase();
    const sifre = typeof b?.sifre === 'string' ? b.sifre : '';

    if (!ad || !email || !sifre) {
      return NextResponse.json({ error: 'Ad, e-posta ve şifre zorunlu' }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: 'E-posta adresi geçersiz' }, { status: 400 });
    }
    if (sifre.length < 6 || sifre.length > 128) {
      return NextResponse.json({ error: 'Şifre en az 6 karakter olmalı' }, { status: 400 });
    }

    const db = await getDb();

    const mevcut = await db.collection('users').findOne({ email });
    if (mevcut) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kayıtlı' }, { status: 409 });
    }

    // Yönetici e-postasıyla yeni kayıt yapılamaz (yetki ele geçirmeyi önler); yönetici hesabı zaten kayıtlı olmalı.
    if (adminEpostasiMi(email)) {
      return NextResponse.json({ error: 'Bu e-posta adresiyle kayıt yapılamaz' }, { status: 403 });
    }

    const hash = await bcrypt.hash(sifre, 12);
    const tamAd = `${ad} ${soyad}`.trim();

    const user = {
      name: tamAd,            // NextAuth oturumunun okuduğu alan
      ad: tamAd,              // eski alan (geriye dönük uyum)
      email,
      password: hash,
      role: 'user',
      telefon: clean(b?.telefon, 30),
      sehir: clean(b?.sehir, 60),
      firmaAd: clean(b?.firmaAd, 120),
      tip: clean(b?.tip, 30) || 'hizmet_alan',
      bakiye: 0,
      profilTamamlandi: false,
      olusturuldu: new Date(),
      createdAt: new Date(),
      guncellendi: new Date(),
    };

    await db.collection('users').insertOne(user);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e: any) {
    console.error('Kayıt hatası:', e);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
