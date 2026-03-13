import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  if (!adminKey || adminKey.length < 5) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const teklifler = await db.collection('teklifler')
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
    return NextResponse.json({ teklifler: JSON.parse(JSON.stringify(teklifler)) });
  } catch {
    return NextResponse.json({ teklifler: [] });
  }
}
