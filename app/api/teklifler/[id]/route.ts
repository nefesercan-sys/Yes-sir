import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Props { params: { id: string } }

export async function PATCH(req: NextRequest, { params }: Props) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });

  const { action, ilanId } = await req.json();
  const db = await getDb();

  const teklif = await db.collection('teklifler').findOne({ _id: new ObjectId(params.id) });
  if (!teklif) return NextResponse.json({ error: 'Teklif bulunamadı' }, { status: 404 });

  const ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(ilanId) });
  if (!ilan) return NextResponse.json({ error: 'İlan bulunamadı' }, { status: 404 });
  if (ilan.sahibi?.email !== session.user.email) return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });

  if (action === 'kabul_et') {
    await db.collection('teklifler').updateOne({ _id: new ObjectId(params.id) }, { $set: { durum: 'kabul_edildi', guncellendi: new Date() } });
    await db.collection('teklifler').updateMany(
      { ilanId: new ObjectId(ilanId), _id: { $ne: new ObjectId(params.id) } },
      { $set: { durum: 'reddedildi' } }
    );

    // Rezervasyon oluştur
    const rezervasyon = {
      ilanId: new ObjectId(ilanId),
      teklifId: new ObjectId(params.id),
      musteri: ilan.sahibi,
      hizmetVeren: teklif.teklifci,
      sektorId: ilan.sektorId,
      fiyat: teklif.teklifFiyat,
      doviz: teklif.doviz,
      formData: ilan.formData,
      durum: 'on_rezervasyon',
      olusturuldu: new Date(),
      guncellendi: new Date(),
    };
    const rezRes = await db.collection('rezervasyonlar').insertOne(rezervasyon);

    await db.collection('bildirimler').insertOne({
      alici: teklif.teklifci.email,
      tip: 'teklif_kabul',
      mesaj: `🎉 Teklifiniz kabul edildi! "${ilan.baslik}" — ${Number(teklif.teklifFiyat).toLocaleString()} ${teklif.doviz}`,
      ilanId: new ObjectId(ilanId),
      rezervasyonId: rezRes.insertedId,
      okundu: false,
      tarih: new Date(),
    });

    return NextResponse.json({ success: true, rezervasyonId: rezRes.insertedId });
  }

  return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 });
}
