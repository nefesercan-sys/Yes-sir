import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json([], { status: 401 });
  const db = await getDb();
  const rezervasyonlar = await db.collection('rezervasyonlar').find({
    $or: [{ 'musteri.email': session.user.email }, { 'hizmetVeren.email': session.user.email }]
  }).sort({ olusturuldu: -1 }).toArray();
  return NextResponse.json(JSON.parse(JSON.stringify(rezervasyonlar)));
}
