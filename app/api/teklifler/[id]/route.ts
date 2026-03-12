import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Props { params: { id: string } }

export async function PATCH(req: NextRequest, { params }: Props) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });
  }

  const { action, ilanId } = await req.json();
  if (!action || !ilanId) {
    return NextResponse.json({ error: 'action ve ilanId zorunlu' }, { status: 400 });
  }

  const db = await getDb();

  let teklif: any;
  let ilan: any;
  try {
    teklif = await db.collection('teklifler').findOne({ _id: new ObjectId(params.id) });
    ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(ilanId) });
  } catch {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  }

  if (!teklif) return NextResponse.json({ error: 'Teklif bulunamadı' }, { status: 404 });
  if (!ilan) return NextResponse.json({ error: 'İlan bulunamadı' }, { status: 404 });
  if (ilan.sahibi?.email !== session.user.email) {
    return NextResponse.json({ error: 'Yetkisiz işlem' }, { status: 403 });
  }

  if (action === 'kabul_et') {
    // Seçilen teklifi kabul et
    await db.collection('teklifler').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { durum: 'kabul_edildi', guncellendi: new Date() } }
    );

    // Diğer teklifleri reddet
    await db.collection('teklifler').updateMany(
      { ilanId: new ObjectId(ilanId), _id: { $ne: new ObjectId(params.id) } },
      { $set: { durum: 'reddedildi', guncellendi: new Date() } }
    );

    // Rezervasyon oluştur
    const rezervasyon = {
      ilanId: new ObjectId(ilanId),
      teklifId: new ObjectId(params.id),
      musteri: ilan.sahibi,
      hizmetVeren: teklif.teklifci,
      sektorId: ilan.sektorId,
      baslik: ilan.baslik,
      fiyat: teklif.teklifFiyat,
      doviz: teklif.doviz,
      formData: ilan.formData,
      durum: 'on_rezervasyon',
      olusturuldu: new Date(),
      guncellendi: new Date(),
    };

    const rezRes = await db.collection('rezervasyonlar').insertOne(rezervasyon);

    // İlanı güncelle: teklif kapandı
    await db.collection('ilanlar').updateOne(
      { _id: new ObjectId(ilanId) },
      { $set: { durum: 'rezervasyonda', teklifeAcik: false, guncellendi: new Date() } }
    );

    // Kabul edilen teklifçiye bildirim
    await db.collection('bildirimler').insertOne({
      alici: teklif.teklifci.email,
      tip: 'teklif_kabul',
      mesaj: `🎉 Teklifiniz kabul edildi! "${ilan.baslik}" — ${Number(teklif.teklifFiyat).toLocaleString()} ${teklif.doviz}`,
      ilanId: new ObjectId(ilanId),
      rezervasyonId: rezRes.insertedId,
      okundu: false,
      tarih: new Date(),
    });

    // Reddedilenlere bildirim
    const reddedilen = await db.collection('teklifler')
      .find({ ilanId: new ObjectId(ilanId), durum: 'reddedildi' })
      .toArray();

    await Promise.all(reddedilen.map(r =>
      db.collection('bildirimler').insertOne({
        alici: r.teklifci.email,
        tip: 'teklif_reddedildi',
        mesaj: `"${ilan.baslik}" ilanında başka bir teklif tercih edildi.`,
        ilanId: new ObjectId(ilanId),
        okundu: false,
        tarih: new Date(),
      })
    ));

    return NextResponse.json({ success: true, rezervasyonId: rezRes.insertedId });
  }

  if (action === 'reddet') {
    await db.collection('teklifler').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { durum: 'reddedildi', guncellendi: new Date() } }
    );

    await db.collection('bildirimler').insertOne({
      alici: teklif.teklifci.email,
      tip: 'teklif_reddedildi',
      mesaj: `"${ilan.baslik}" ilanındaki teklifiniz reddedildi.`,
      ilanId: new ObjectId(ilanId),
      okundu: false,
      tarih: new Date(),
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 });
}

export async function DELETE(_: NextRequest, { params }: Props) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });
  }

  const db = await getDb();
  let teklif: any;
  try {
    teklif = await db.collection('teklifler').findOne({ _id: new ObjectId(params.id) });
  } catch {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  }

  if (!teklif) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  if (teklif.teklifci?.email !== session.user.email) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });
  }
  if (teklif.durum === 'kabul_edildi') {
    return NextResponse.json({ error: 'Kabul edilmiş teklif silinemez' }, { status: 400 });
  }

  await db.collection('teklifler').deleteOne({ _id: new ObjectId(params.id) });
  await db.collection('ilanlar').updateOne(
    { _id: teklif.ilanId },
    { $inc: { teklifSayisi: -1 } }
  );

  return NextResponse.json({ success: true });
}
