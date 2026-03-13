import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  if (!adminKey || adminKey.length < 5) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  try {
    const db      = await getDb();
    const { searchParams } = new URL(req.url);
    const durum   = searchParams.get('durum');
    const filtre  = durum ? { durum } : {};

    const mesajlar = await db.collection('mesajlar')
      .find(filtre)
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ mesajlar: JSON.parse(JSON.stringify(mesajlar)) });
  } catch {
    return NextResponse.json({ mesajlar: [] });
  }
}
