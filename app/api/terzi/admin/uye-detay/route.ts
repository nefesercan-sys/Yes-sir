// ============================================================
// SwapHubs — app/api/terzi/admin/uye-detay/route.ts
// Belirli bir üyenin verdiği ilanları ve/veya teklifleri getirir.
// ADMIN_SECRET korumalı.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAdminSecretOrSession } from '@/lib/admin-auth';
import { ObjectId } from 'mongodb';
import { idGecerli } from '@/lib/validate';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const yetki = await requireAdminSecretOrSession(req);
  if (yetki) return yetki;

  const userId = searchParams.get('userId');
  if (!idGecerli(userId)) return NextResponse.json({ error: 'Geçerli bir userId zorunlu' }, { status: 400 });

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
