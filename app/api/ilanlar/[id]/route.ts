import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Props { params: { id: string } }

export async function GET(_: NextRequest, { params }: Props) {
  const db = await getDb();
  try {
    const ilan = await db.collection('ilanlar').findOne({
      _id: new ObjectId(params.id),
    });
    if (!ilan) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
    return NextResponse.json(JSON.parse(JSON.stringify(ilan)));
  } catch {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });
  }

  const db = await getDb();
  let ilan: any;
  try {
    ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(params.id) });
  } catch {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  }

  if (!ilan) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  if (ilan.sahibi?.email !== session.user.email) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });
  }

  const body = await req.json();
  await db.collection('ilanlar').updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { ...body, guncellendi: new Date() } }
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(_: NextRequest, { params }: Props) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });
  }

  const db = await getDb();
  let ilan: any;
  try {
    ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(params.id) });
  } catch {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  }

  if (!ilan) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  if (ilan.sahibi?.email !== session.user.email) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });
  }

  await db.collection('ilanlar').updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { durum: 'silinmis', guncellendi: new Date() } }
  );
  return NextResponse.json({ success: true });
}
