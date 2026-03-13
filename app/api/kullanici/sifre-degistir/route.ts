import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  const { eskiSifre, yeniSifre } = await req.json();
  if (!eskiSifre || !yeniSifre) {
    return NextResponse.json({ error: 'Tüm alanlar zorunlu' }, { status: 400 });
  }
  if (yeniSifre.length < 6) {
    return NextResponse.json({ error: 'Şifre en az 6 karakter olmalı' }, { status: 400 });
  }

  const db   = await getDb();
  const user = await db.collection('users').findOne({ email: session.user.email });

  if (!user?.password) {
    return NextResponse.json({ error: 'Şifre bulunamadı' }, { status: 400 });
  }

  const dogru = await bcrypt.compare(eskiSifre, user.password);
  if (!dogru) {
    return NextResponse.json({ error: 'Mevcut şifre yanlış' }, { status: 400 });
  }

  const hash = await bcrypt.hash(yeniSifre, 12);
  await db.collection('users').updateOne(
    { email: session.user.email },
    { $set: { password: hash, updatedAt: new Date() } }
  );

  return NextResponse.json({ success: true });
}
