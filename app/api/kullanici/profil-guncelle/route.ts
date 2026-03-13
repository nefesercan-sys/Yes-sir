import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  const { ad } = await req.json();
  if (!ad?.trim()) {
    return NextResponse.json({ error: 'Ad zorunlu' }, { status: 400 });
  }

  const db = await getDb();
  await db.collection('users').updateOne(
    { email: session.user.email },
    { $set: { name: ad.trim(), updatedAt: new Date() } }
  );

  return NextResponse.json({ success: true });
}
