import { requireAdmin } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const guard = await requireAdmin(req);
  if (guard) return guard;

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
