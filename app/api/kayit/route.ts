import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { createHash } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const {
      ad, soyad, email, sifre,
      telefon, sehir, firmaAd, tip,
    } = await req.json();

    if (!ad || !email || !sifre) {
      return NextResponse.json({ error: 'Ad, e-posta ve şifre zorunlu' }, { status: 400 });
    }

    if (sifre.length < 6) {
      return NextResponse.json({ error: 'Şifre en az 6 karakter olmalı' }, { status: 400 });
    }

    const emailKucuk = email.toLowerCase().trim();
    const db = await getDb();

    const mevcut = await db.collection('users').findOne({ email: emailKucuk });
    if (mevcut) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kayıtlı' }, { status: 409 });
    }

    const hash = createHash('sha256').update(sifre).digest('hex');

    const user = {
      ad: `${ad.trim()} ${(soyad || '').trim()}`.trim(),
      email: emailKucuk,
      password: hash,
      telefon: telefon?.trim() || '',
      sehir: sehir?.trim() || '',
      firmaAd: firmaAd?.trim() || '',
      tip: tip || 'hizmet_alan',
      bakiye: 0,
      profilTamamlandi: false,
      olusturuldu: new Date(),
      guncellendi: new Date(),
    };

    await db.collection('users').insertOne(user);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e: any) {
    console.error('Kayıt hatası:', e);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
