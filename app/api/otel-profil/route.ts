import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });

  const body = await req.json();
  const db = await getDb();

  const profil = {
    ...body,
    email: session.user.email,
    olusturuldu: new Date(),
    guncellendi: new Date(),
    onaylandi: false,
    puan: 0,
    teklifSayisi: 0,
  };

  await db.collection('otel_profiller').updateOne(
    { email: session.user.email },
    { $set: profil },
    { upsert: true }
  );

  await db.collection('users').updateOne(
    { email: session.user.email },
    { $set: { tip: 'otel', profilTamamlandi: true, guncellendi: new Date() } }
  );

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  const db = await getDb();
  const profil = await db.collection('otel_profiller').findOne({ email: session.user.email });
  return NextResponse.json(JSON.parse(JSON.stringify(profil || {})));
}
