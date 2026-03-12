import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sektor = searchParams.get('sektor');
  const limit = parseInt(searchParams.get('limit') || '24');
  const skip = parseInt(searchParams.get('skip') || '0');
  const q = searchParams.get('q');
  const sehir = searchParams.get('sehir');
  const kendi = searchParams.get('kendi');

  // Kendi ilanları
  if (kendi === 'true') {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json([], { status: 401 });
    const db = await getDb();
    const ilanlar = await db.collection('ilanlar')
      .find({ 'sahibi.email': session.user.email })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(JSON.parse(JSON.stringify(ilanlar)));
  }

  // Genel ilan listesi
  const db = await getDb();
  const filter: Record<string, any> = { durum: 'aktif' };
  if (sektor) filter.sektorId = sektor;
  if (q) filter.$text = { $search: q };
  if (sehir) filter['formData.sehir'] = { $regex: sehir, $options: 'i' };

  const ilanlar = await db
    .collection('ilanlar')
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  return NextResponse.json(JSON.parse(JSON.stringify(ilanlar)));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const body = await req.json();

  const {
    sektorId, baslik, formData, medyalar,
    butceMin, butceMax, butceBirimi, gizliAd,
  } = body;

  if (!sektorId || !baslik) {
    return NextResponse.json({ error: 'Sektör ve başlık zorunlu' }, { status: 400 });
  }

  const db = await getDb();

  const ilan = {
    sektorId,
    baslik,
    formData,
    medyalar: medyalar || [],
    butceMin: Number(butceMin) || 0,
    butceMax: Number(butceMax) || 0,
    butceBirimi: butceBirimi || '₺',
    durum: 'aktif',
    teklifSayisi: 0,
    goruntulenme: 0,
    teklifeAcik: true,
    gizliAd: Boolean(gizliAd),
    sahibi: session
      ? { email: session.user?.email, ad: session.user?.name, resim: session.user?.image }
      : null,
    misafirToken: session ? null : crypto.randomUUID(),
    createdAt: new Date(),
    guncellendi: new Date(),
  };

  const result = await db.collection('ilanlar').insertOne(ilan);
  return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
}
