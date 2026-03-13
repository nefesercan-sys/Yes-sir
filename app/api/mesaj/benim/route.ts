import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ mesajlar: [] }, { status: 401 });
  }

  const db = await getDb();
  const mesajlar = await db.collection('mesajlar')
    .find({ 'gonderen.email': session.user.email })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  return NextResponse.json({ mesajlar: JSON.parse(JSON.stringify(mesajlar)) });
}
