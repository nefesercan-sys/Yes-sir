// ============================================================
// SwapHubs — app/api/terzi/admin/uyeler/route.ts
// Tüm kayıtlı terzi kullanıcılarını (müşteri + terzi) ve
// ilan/teklif sayılarını listeler. ADMIN_SECRET korumalı.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret') || new URL(req.url).searchParams.get('secret');
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  const db = await getDb();

  const kullanicilar = await db.collection('terziKullanicilar')
    .find({}, { projection: { otpKod: 0, otpSonGecerlilik: 0, otpBasarisizDeneme: 0, sifreBasarisizDeneme: 0 } })
    .sort({ createdAt: -1 })
    .limit(300)
    .toArray();

  const sonuc = await Promise.all(kullanicilar.map(async (k: any) => {
    const [ilanSayisi, teklifSayisi] = await Promise.all([
      db.collection('ilanlar').countDocuments({ sektorId: 'terzi-kuru-temizleme', 'sahibi.userId': k._id.toString() }),
      db.collection('teklifler').countDocuments({ 'teklifVeren.userId': k._id.toString() }),
    ]);
    return {
      _id: k._id.toString(),
      telefon: k.telefon,
      ad: k.ad || null,
      isProvider: !!k.isProvider,
      dogrulandi: !!k.dogrulandi,
      sifreVarMi: !!k.sifreHash,
      createdAt: k.createdAt,
      ilanSayisi,
      teklifSayisi,
    };
  }));

  return NextResponse.json(sonuc);
}
