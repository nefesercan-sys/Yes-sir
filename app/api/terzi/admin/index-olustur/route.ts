// ============================================================
// SwapHubs — app/api/terzi/admin/index-olustur/route.ts
// Geo sorgular ($near) için zorunlu 2dsphere indexlerini oluşturur.
// Terminal/Node ortamı olmayanlar için: tarayıcıdan tek tıkla
// çalıştırılabilir. ADMIN_SECRET ile korunur.
// Kullanım: /api/terzi/admin/index-olustur?secret=SENIN_PAROLAN
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const secret = new URL(req.url).searchParams.get('secret');
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  try {
    const db = await getDb();
    await db.collection('ilanlar').createIndex({ location: '2dsphere' });
    await db.collection('teklifler').createIndex({ location: '2dsphere' });
    return NextResponse.json({ success: true, mesaj: '2dsphere indexleri oluşturuldu (ilanlar, teklifler)' });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
