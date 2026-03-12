import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ilanId = searchParams.get('ilanId');
  const kendi = searchParams.get('kendi');

  // Kendi verdiği teklifler
  if (kendi === 'true') {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json([], { status: 401 });

    const db = await getDb();

    // İlan başlıklarını da çekmek için lookup yap
    const teklifler = await db.collection('teklifler')
      .find({ 'teklifci.email': session.user.email })
      .sort({ olusturuldu: -1 })
      .toArray();

    // İlan başlıklarını ayrıca çek
    const ilanIdler = [...new Set(teklifler.map(t => t.ilanId?.toString()))].filter(Boolean);
    const ilanlar = ilanIdler.length > 0
      ? await db.collection('ilanlar').find({
          _id: { $in: ilanIdler.map(id => { try { return new ObjectId(id); } catch { return null; } }).filter(Boolean) as ObjectId[] }
        }).toArray()
      : [];

    const ilanMap: Record<string, string> = {};
    ilanlar.forEach(i => { ilanMap[i._id.toString()] = i.baslik; });

    const zenginTeklifler = teklifler.map(t => ({
      ...t,
      ilanBaslik: ilanMap[t.ilanId?.toString()] || 'İlan',
    }));

    return NextResponse.json(JSON.parse(JSON.stringify(zenginTeklifler)));
  }

  // Belirli bir ilana gelen teklifler
  if (!ilanId) {
    return NextResponse.json({ error: 'ilanId veya kendi=true gerekli' }, { status: 400 });
  }

  const session = await getServerSession();
  const db = await getDb();

  let ilan: any;
  try {
    ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(ilanId) });
  } catch {
    return NextResponse.json({ error: 'Geçersiz ilanId' }, { status: 400 });
  }

  if (!ilan) return NextResponse.json({ error: 'İlan bulunamadı' }, { status: 404 });

  const ilanSahibiMi = session?.user?.email === ilan.sahibi?.email;

  const teklifler = await db.collection('teklifler')
    .find({ ilanId: new ObjectId(ilanId) })
    .sort({ teklifFiyat: 1 })
    .toArray();

  // İlan sahibi değilse bilgileri maskele
  const sonuc = teklifler.map(t => ({
    ...t,
    teklifci: ilanSahibiMi
      ? t.teklifci
      : {
          ad: (t.teklifci?.ad || 'Kullanıcı').split(' ')[0] + ' ***',
          resim: t.teklifci?.resim,
        },
    _id: t._id.toString(),
    ilanId: t.ilanId?.toString(),
  }));

  return NextResponse.json(JSON.parse(JSON.stringify(sonuc)));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Teklif vermek için üye olmanız gerekiyor' },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { ilanId, teklifFiyat, doviz, aciklama, hizmetDetay, otelProfilId } = body;

  if (!ilanId || !teklifFiyat) {
    return NextResponse.json({ error: 'İlan ID ve fiyat zorunlu' }, { status: 400 });
  }

  const db = await getDb();
  let ilan: any;
  try {
    ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(ilanId) });
  } catch {
    return NextResponse.json({ error: 'Geçersiz ilanId' }, { status: 400 });
  }

  if (!ilan) return NextResponse.json({ error: 'İlan bulunamadı' }, { status: 404 });
  if (!ilan.teklifeAcik) {
    return NextResponse.json({ error: 'Bu ilan artık teklif almıyor' }, { status: 400 });
  }
  if (ilan.sahibi?.email === session.user.email) {
    return NextResponse.json({ error: 'Kendi ilanınıza teklif veremezsiniz' }, { status: 400 });
  }

  // Teklif ücreti: bütçe ortalamasının %1'i, minimum 10₺
  const butceOrta = ((Number(ilan.butceMin) || 0) + (Number(ilan.butceMax) || 0)) / 2;
  const teklifUcreti = Math.max(10, Math.round(butceOrta * 0.01));

  // Aynı kişinin önceki teklifi var mı?
  const mevcutTeklif = await db.collection('teklifler').findOne({
    ilanId: new ObjectId(ilanId),
    'teklifci.email': session.user.email,
  });

  const teklif = {
    ilanId: new ObjectId(ilanId),
    sektorId: ilan.sektorId,
    teklifci: {
      email: session.user.email,
      ad: session.user.name,
      resim: session.user.image,
    },
    teklifFiyat: Number(teklifFiyat),
    doviz: doviz || '₺',
    aciklama: aciklama || '',
    hizmetDetay: hizmetDetay || '',
    otelProfilId: otelProfilId ? new ObjectId(otelProfilId) : null,
    teklifUcreti,
    durum: 'bekliyor',
    olusturuldu: new Date(),
    guncellendi: new Date(),
  };

  let insertedId: any;

  if (mevcutTeklif) {
    // Mevcut teklifi güncelle
    await db.collection('teklifler').updateOne(
      { _id: mevcutTeklif._id },
      { $set: { ...teklif, guncellendi: new Date() } }
    );
    insertedId = mevcutTeklif._id;
  } else {
    // Yeni teklif
    const result = await db.collection('teklifler').insertOne(teklif);
    insertedId = result.insertedId;
    await db.collection('ilanlar').updateOne(
      { _id: new ObjectId(ilanId) },
      { $inc: { teklifSayisi: 1 } }
    );
  }

  // İlan sahibine bildirim gönder
  if (ilan.sahibi?.email) {
    await db.collection('bildirimler').insertOne({
      alici: ilan.sahibi.email,
      tip: 'yeni_teklif',
      mesaj: `"${ilan.baslik}" ilanınıza yeni teklif: ${Number(teklifFiyat).toLocaleString()} ${doviz || '₺'} — ${session.user.name}`,
      ilanId: new ObjectId(ilanId),
      teklifId: insertedId,
      okundu: false,
      tarih: new Date(),
    });
  }

  return NextResponse.json(
    { success: true, teklifId: insertedId, teklifUcreti },
    { status: 201 }
  );
}
