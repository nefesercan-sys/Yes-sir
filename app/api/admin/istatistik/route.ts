import { requireAdmin } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const guard = await requireAdmin(req);
  if (guard) return guard;

  try {
    const db = await getDb();
    const bugun = new Date();
    bugun.setHours(0, 0, 0, 0);

    const [
      toplamIlan, bireyselIlan, ticariIlan, yapayIlan,
      toplamUye, toplamMesaj, toplamTeklif,
      okunmadiMesaj, bugunYeniIlan, bugunYeniMesaj,
    ] = await Promise.all([
      db.collection('ilanlar').countDocuments({ durum: 'aktif' }),
      db.collection('ilanlar').countDocuments({ durum: 'aktif', tip: 'bireysel' }),
      db.collection('ilanlar').countDocuments({ durum: 'aktif', tip: 'ticari' }),
      db.collection('ilanlar').countDocuments({ yapay: true }),
      db.collection('users').countDocuments(),
      db.collection('mesajlar').countDocuments(),
      db.collection('teklifler').countDocuments(),
      db.collection('mesajlar').countDocuments({ durum: 'okunmadi' }),
      db.collection('ilanlar').countDocuments({ createdAt: { $gte: bugun } }),
      db.collection('mesajlar').countDocuments({ createdAt: { $gte: bugun } }),
    ]);

    return NextResponse.json({
      toplamIlan, bireyselIlan, ticariIlan, yapayIlan,
      toplamUye, toplamMesaj, toplamTeklif,
      okunmadiMesaj, bugunYeniIlan, bugunYeniMesaj,
    });
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
