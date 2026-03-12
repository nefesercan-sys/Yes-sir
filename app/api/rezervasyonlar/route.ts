import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 });
  }

  const db = await getDb();
  const rezervasyonlar = await db.collection('rezervasyonlar')
    .find({
      $or: [
        { 'musteri.email': session.user.email },
        { 'hizmetVeren.email': session.user.email },
      ],
    })
    .sort({ olusturuldu: -1 })
    .toArray();

  return NextResponse.json(JSON.parse(JSON.stringify(rezervasyonlar)));
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });
  }

  const { id, durum, not } = await req.json();
  if (!id || !durum) {
    return NextResponse.json({ error: 'id ve durum zorunlu' }, { status: 400 });
  }

  const db = await getDb();
  let rezervasyon: any;
  try {
    rezervasyon = await db.collection('rezervasyonlar').findOne({ _id: new ObjectId(id) });
  } catch {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  }

  if (!rezervasyon) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });

  const yetkili = [rezervasyon.musteri?.email, rezervasyon.hizmetVeren?.email];
  if (!yetkili.includes(session.user.email)) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });
  }

  await db.collection('rezervasyonlar').updateOne(
    { _id: new ObjectId(id) },
    { $set: { durum, not: not || '', guncellendi: new Date() } }
  );

  // Bildirim gönder
  const diger = session.user.email === rezervasyon.musteri?.email
    ? rezervasyon.hizmetVeren?.email
    : rezervasyon.musteri?.email;

  const mesajlar: Record<string, string> = {
    tamamlandi: '✅ Rezervasyon tamamlandı!',
    iptal: '❌ Rezervasyon iptal edildi.',
    onaylandi: '✅ Rezervasyon onaylandı!',
  };

  if (mesajlar[durum] && diger) {
    await db.collection('bildirimler').insertOne({
      alici: diger,
      tip: durum,
      mesaj: mesajlar[durum],
      rezervasyonId: new ObjectId(id),
      okundu: false,
      tarih: new Date(),
    });
  }

  return NextResponse.json({ success: true });
}
