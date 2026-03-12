import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 });
  }

  const db = await getDb();
  const bildirimler = await db.collection('bildirimler')
    .find({ alici: session.user.email })
    .sort({ tarih: -1 })
    .limit(60)
    .toArray();

  return NextResponse.json(JSON.parse(JSON.stringify(bildirimler)));
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  const { id, tumunuOku } = await req.json();

  const db = await getDb();

  if (tumunuOku) {
    await db.collection('bildirimler').updateMany(
      { alici: session.user.email, okundu: false },
      { $set: { okundu: true } }
    );
    return NextResponse.json({ success: true });
  }

  if (!id) return NextResponse.json({ error: 'id zorunlu' }, { status: 400 });

  try {
    await db.collection('bildirimler').updateOne(
      { _id: new ObjectId(id), alici: session.user.email },
      { $set: { okundu: true } }
    );
  } catch {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
