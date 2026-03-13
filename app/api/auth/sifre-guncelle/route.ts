import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { token, sifre } = await req.json();
  if (!token || !sifre) {
    return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 });
  }

  const db  = await getDb();
  const rec = await db.collection('sifre_sifirlama').findOne({
    token,
    kullanildi: false,
    expires:    { $gt: new Date() },
  });

  if (!rec) {
    return NextResponse.json({ error: 'Link geçersiz veya süresi dolmuş' }, { status: 400 });
  }

  const hash = await bcrypt.hash(sifre, 12);

  await db.collection('users').updateOne(
    { email: rec.email },
    { $set: { password: hash, updatedAt: new Date() } }
  );

  await db.collection('sifre_sifirlama').updateOne(
    { token },
    { $set: { kullanildi: true } }
  );

  return NextResponse.json({ success: true });
}
