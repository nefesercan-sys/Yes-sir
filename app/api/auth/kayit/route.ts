import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { ad, email, sifre } = await req.json();

  if (!ad || !email || !sifre) {
    return NextResponse.json({ error: 'Tüm alanlar zorunlu' }, { status: 400 });
  }
  if (sifre.length < 6) {
    return NextResponse.json({ error: 'Şifre en az 6 karakter olmalı' }, { status: 400 });
  }

  const db = await getDb();

  const mevcut = await db.collection('users').findOne({ email: email.toLowerCase() });
  if (mevcut) {
    return NextResponse.json({ error: 'Bu e-posta zaten kayıtlı' }, { status: 409 });
  }

  const hash = await bcrypt.hash(sifre, 12);

  await db.collection('users').insertOne({
    name:      ad,
    email:     email.toLowerCase(),
    password:  hash,
    role:      'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
