// ============================================================
// SwapHubs — app/api/terzi/bildirimler/route.ts
// Oturum sahibi telefon kullanıcısının bildirimlerini getirir
// ============================================================
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getSessionUserId } from '@/lib/terzi-session';

export async function GET() {
  const userId = getSessionUserId();
  if (!userId) return NextResponse.json([], { status: 401 });

  const db = await getDb();
  const kullanici = await db.collection('terziKullanicilar').findOne({ _id: new ObjectId(userId) });
  if (!kullanici) return NextResponse.json([], { status: 404 });

  const bildirimler = await db.collection('bildirimler')
    .find({ aliciTelefon: kullanici.telefon })
    .sort({ tarih: -1 })
    .limit(50)
    .toArray();

  return NextResponse.json(JSON.parse(JSON.stringify(bildirimler)));
}
