import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Teklif vermek için üye olmanız gerekiyor' }, { status: 401 });

  const body = await req.json();
  const { ilanId, teklifFiyat, doviz, aciklama, hizmetDetay, otelProfilId } = body;

  if (!ilanId || !teklifFiyat) return NextResponse.json({ error: 'İlan ID ve fiyat zorunlu' }, { status: 400 });

  const db = await getDb();
  const ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(ilanId) });
  if (!ilan) return NextResponse.json({ error: 'İlan bulunamadı' }, { status: 404 });
  if (!ilan.teklifeAcik) return NextResponse.json({ error: 'Bu ilan artık teklif almıyor' }, { status: 400 });
  if (ilan.sahibi?.email === session.user.email) return NextResponse.json({ error: 'Kendi ilanınıza teklif veremezsiniz' }, { status: 400 });

  // Teklif ücreti: bütçenin %1'i (min 10₺)
  const teklifUcreti = Math.max(10, Math.round((Number(ilan.butceMin) + Number(ilan.butceMax)) / 2 * 0.01));

  // Daha önce aynı kişi teklif vermiş mi?
  const mevcutTeklif = await db.collection('teklifler').findOne({ ilanId: new ObjectId(ilanId), 'teklifci.email': session.user.email });

  const teklif = {
    ilanId: new ObjectId(ilanId),
    sektorId: ilan.sektorId,
    teklifci: { email: session.user.email, ad: session.user.name, resim: session.user.image },
    teklifFiyat: Number(teklifFiyat),
    doviz: doviz || '₺',
    aciklama,
    hizmetDetay,
    otelProfilId: otelProfilId ? new ObjectId(otelProfilId) : null,
    teklifUcreti,
    durum: 'bekliyor',
    olusturuldu: new Date(),
    guncellendi: new Date(),
  };

  let result;
  if (mevcutTeklif) {
    await db.collection('teklifler').updateOne({ _id: mevcutTeklif._id }, { $set: { ...teklif, guncellendi: new Date() } });
    result = { insertedId: mevcutTeklif._id };
  } else {
    result = await db.collection('teklifler').insertOne(teklif);
    await db.collection('ilanlar').updateOne({ _id: new ObjectId(ilanId) }, { $inc: { teklifSayisi: 1 } });
  }

  // İlan sahibine bildirim
  if (ilan.sahibi?.email) {
    await db.collection('bildirimler').insertOne({
      alici: ilan.sahibi.email,
      tip: 'yeni_teklif',
      mesaj: `"${ilan.baslik}" ilanınıza yeni bir teklif geldi: ${Number(teklifFiyat).toLocaleString()} ${doviz || '₺'}`,
      ilanId: new ObjectId(ilanId),
      teklifId: result.insertedId,
      okundu: false,
      tarih: new Date(),
    });
  }

  return NextResponse.json({ success: true, teklifId: result.insertedId, teklifUcreti }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  const { searchParams } = new URL(req.url);
  const ilanId = searchParams.get('ilanId');

  if (!ilanId) return NextResponse.json({ error: 'ilanId zorunlu' }, { status: 400 });

  const db = await getDb();
  const ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(ilanId) });
  if (!ilan) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });

  // İlan sahibi değilse gizli bilgileri maskele
  const ilanSahibiMi = session?.user?.email === ilan.sahibi?.email;

  const teklifler = await db.collection('teklifler').find({ ilanId: new ObjectId(ilanId) }).sort({ teklifFiyat: 1 }).toArray();

  const maskelenmis = teklifler.map(t => ({
    ...t,
    teklifci: ilanSahibiMi ? t.teklifci : { ad: t.teklifci.ad?.split(' ')[0] + ' ***', resim: t.teklifci.resim },
    _id: t._id.toString(),
    ilanId: t.ilanId.toString(),
  }));

  return NextResponse.json(JSON.parse(JSON.stringify(maskelenmis)));
}
