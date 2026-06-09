import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const urunler = await db
      .collection('bal_urunler')
      .find({ aktif: true })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(JSON.parse(JSON.stringify(urunler)));
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await getDb();
    const urun = {
      ...body,
      aktif: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection('bal_urunler').insertOne(urun);
    return NextResponse.json({ id: result.insertedId }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
