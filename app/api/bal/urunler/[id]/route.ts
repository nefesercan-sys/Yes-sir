import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const urun = await db
      .collection('bal_urunler')
      .findOne({ _id: new ObjectId(params.id) });
    if (!urun) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
    return NextResponse.json(JSON.parse(JSON.stringify(urun)));
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const db = await getDb();
    await db.collection('bal_urunler').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { ...body, updatedAt: new Date() } }
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    await db.collection('bal_urunler').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { aktif: false, updatedAt: new Date() } }
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
