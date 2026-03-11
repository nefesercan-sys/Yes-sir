import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { createHash } from 'crypto';

export async function POST(req: NextRequest) {
  const { ad, soyad, email, sifre, telefon, sehir, firmaAd, tip } = await req.json();

  if (!ad || !email || !sifre) return NextResponse.json({ error: 'Ad, e-posta ve şifre zorunlu' }, { status: 400 });
  if (sifre.length < 6) return NextResponse.json({ error: 'Şifre en az 6 karakter' }, { status: 400 });

  const db = await getDb();
  const mevcut = await db.collection('users').findOne({ email: email.toLowerCase() });
  if (mevcut) return NextResponse.json({ error: 'Bu e-posta zaten kayıtlı' }, { status: 409 });

  const hash = createHash('sha256').update(sifre).digest('hex');

  const user = {
    ad: `${ad} ${soyad || ''}`.trim(),
    email: email.toLowerCase(),
    password: hash,
    telefon: telefon || '',
    sehir: sehir || '',
    firmaAd: firmaAd || '',
    tip: tip || 'hizmet_alan',
    bakiye: 0,
    olusturuldu: new Date(),
    guncellendi: new Date(),
    profilTamamlandi: false,
  };

  await db.collection('users').insertOne(user);
  return NextResponse.json({ success: true }, { status: 201 });
}
