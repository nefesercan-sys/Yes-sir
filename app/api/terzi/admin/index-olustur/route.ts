// ============================================================
// SwapHubs — app/api/terzi/admin/index-olustur/route.ts
// Geo sorgular ($near) için zorunlu 2dsphere indexlerini oluşturur.
// Terminal/Node ortamı olmayanlar için: tarayıcıdan tek tıkla
// çalıştırılabilir. ADMIN_SECRET ile korunur.
// Kullanım: yönetici hesabıyla giriş yapıp /api/terzi/admin/index-olustur adresini açın (parola URL'ye YAZILMAZ).
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAdminSecretOrSession } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const yetki = await requireAdminSecretOrSession(req);
  if (yetki) return yetki;

  try {
    const db = await getDb();
    await db.collection('ilanlar').createIndex({ location: '2dsphere' });
    await db.collection('teklifler').createIndex({ location: '2dsphere' });
    return NextResponse.json({ success: true, mesaj: '2dsphere indexleri oluşturuldu (ilanlar, teklifler)' });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
