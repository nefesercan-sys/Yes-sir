// ============================================================
// SwapHubs — app/api/terzi/admin/uye-detay/route.ts
// Belirli bir üyenin verdiği ilanları ve/veya teklifleri getirir.
// ADMIN_SECRET korumalı.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = req.headers.get('x-admin-secret') || searchParams.get('secret');
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId zorunlu' }, { status: 400 });

  const db = await getDb();

  const [kullanici, ilanlar, teklifler] = await Promise.all([
    db.collection('terziKullanicilar').findOne(
      { _id: new ObjectId(userId) },
      { projection: { otpKod: 0, otpSonGecerlilik: 0, sifreHash: 0, otpBasarisizDeneme: 0, sifreBasarisizDeneme: 0 } }
    ),
    db.collection('ilanlar').find({ sektorId: 'terzi-kuru-temizleme', 'sahibi.userId': userId }).sort({ createdAt: -1 }).toArray(),
    db.collection('teklifler').find({ 'teklifVeren.userId': userId }).sort({ createdAt: -1 }).toArray(),
  ]);

  if (!kullanici) return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });

  return NextResponse.json(JSON.parse(JSON.stringify({ kullanici, ilanlar, teklifler })));
}
