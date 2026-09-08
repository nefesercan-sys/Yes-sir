// ============================================================
// SwapHubs — app/api/terzi/profil/route.ts
// GET  : oturum sahibinin profil bilgisini döner
// PATCH: ad ve/veya terzi rolü (isProvider) günceller
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getSessionUserId } from '@/lib/terzi-session';

export async function GET() {
  const userId = getSessionUserId();
  if (!userId) return NextResponse.json(null, { status: 401 });

  const db = await getDb();
  const kullanici = await db.collection('terziKullanicilar').findOne(
    { _id: new ObjectId(userId) },
    { projection: { otpKod: 0, otpSonGecerlilik: 0 } }
  );
  if (!kullanici) return NextResponse.json(null, { status: 404 });

  return NextResponse.json(JSON.parse(JSON.stringify(kullanici)));
}

export async function PATCH(req: NextRequest) {
  const userId = getSessionUserId();
  if (!userId) return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });

  const { ad, isProvider, serviceRadiusKm } = await req.json();
  const db = await getDb();

  const guncelleme: Record<string, any> = {};
  if (typeof ad === 'string') guncelleme.ad = ad;
  if (typeof isProvider === 'boolean') guncelleme.isProvider = isProvider;
  if (typeof serviceRadiusKm === 'number') guncelleme.serviceRadiusKm = serviceRadiusKm;

  await db.collection('terziKullanicilar').updateOne({ _id: new ObjectId(userId) }, { $set: guncelleme });
  return NextResponse.json({ success: true });
}
