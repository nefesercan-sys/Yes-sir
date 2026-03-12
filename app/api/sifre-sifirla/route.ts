import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { createHash } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { token, sifre } = await req.json();
    if (!token || !sifre) return NextResponse.json({ error: 'Eksik bilgi.' }, { status: 400 });
    if (sifre.length < 6) return NextResponse.json({ error: 'Şifre en az 6 karakter olmalı.' }, { status: 400 });

    const db = await getDb();

    const reset = await db.collection('password_resets').findOne({
      token,
      kullanildi: false,
      expiry: { $gt: new Date() },
    });

    if (!reset) return NextResponse.json({ error: 'Geçersiz veya süresi dolmuş link.' }, { status: 400 });

    const hash = createHash('sha256').update(sifre).digest('hex');

    await db.collection('users').updateOne(
      { email: reset.email },
      { $set: { password: hash, guncellendi: new Date() } }
    );

    await db.collection('password_resets').updateOne(
      { token },
      { $set: { kullanildi: true } }
    );

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Şifre sıfırlama hatası:', e);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
