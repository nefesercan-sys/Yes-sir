import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Mevcut parametreler (değişmedi)
  const sektor = searchParams.get('sektor');
  const limit  = parseInt(searchParams.get('limit') || '24');
  const skip   = parseInt(searchParams.get('skip')  || '0');
  const q      = searchParams.get('q');
  const sehir  = searchParams.get('sehir');
  const kendi  = searchParams.get('kendi');

  // Yeni parametreler (eklendi)
  const tip      = searchParams.get('tip');      // 'bireysel' | 'ticari'
  const rol      = searchParams.get('rol');      // 'alan' | 'veren'
  const kategori = searchParams.get('kategori'); // kategoriSlug

  // ── Kendi ilanları (değişmedi) ───────────────────────────
  if (kendi === 'true') {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json([], { status: 401 });
    }
    const db = await getDb();
    const ilanlar = await db.collection('ilanlar')
      .find({ 'sahibi.email': session.user.email })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(JSON.parse(JSON.stringify(ilanlar)));
  }

  // ── Genel ilan listesi ────────────────────────────────────
  const db = await getDb();

  const filter: Record<string, unknown> = { durum: 'aktif' };

  // Mevcut filtreler (değişmedi)
  if (sektor) filter.sektorId = sektor;
  if (q)      filter.$text    = { $search: q };
  if (sehir)  filter['formData.sehir'] = { $regex: sehir, $options: 'i' };

  // Yeni filtreler (eklendi — mevcut ilanlarda bu alanlar yoksa filtre uygulanmaz)
  if (tip)      filter.tip           = tip;
  if (rol)      filter.rol           = rol;
  if (kategori) filter.kategoriSlug  = kategori;

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
  const body    = await req.json();

  const {
    // Mevcut alanlar (değişmedi)
    sektorId,
    baslik,
    formData,
    medyalar,
    butceMin,
    butceMax,
    butceBirimi,
    gizliAd,
    // Yeni alanlar (eklendi)
    tip,           // 'bireysel' | 'ticari'
    rol,           // 'alan' | 'veren'
    kategoriSlug,  // örn: 'otel-tatil', 'tekstil'
    kategoriAd,    // örn: 'Otel & Tatil', 'Tekstil'
    ulke,          // ticari ilanlar için ülke
    ozellikler,    // string[] — ürün özellikleri
    teslimat,      // string[] — teslimat bilgileri
    resimUrl,      // kapak resmi
  } = body;

  if (!sektorId || !baslik) {
    return NextResponse.json(
      { error: 'Sektör ve başlık zorunlu' },
      { status: 400 }
    );
  }

  const db = await getDb();

  const ilan = {
    // ── Mevcut alanlar (değişmedi) ──────────────────────────
    sektorId,
    baslik,
    formData,
    medyalar:    medyalar    || [],
    butceMin:    Number(butceMin)  || 0,
    butceMax:    Number(butceMax)  || 0,
    butceBirimi: butceBirimi || '₺',
    durum:       'aktif',
    teklifSayisi: 0,
    goruntulenme: 0,
    teklifeAcik:  true,
    gizliAd:     Boolean(gizliAd),
    sahibi: session
      ? {
          email: session.user?.email,
          ad:    session.user?.name,
          resim: session.user?.image,
        }
      : null,
    misafirToken: session ? null : crypto.randomUUID(),
    createdAt:    new Date(),
    guncellendi:  new Date(),

    // ── Yeni alanlar (eklendi) ──────────────────────────────
    tip:          tip          || 'bireysel',  // varsayılan: bireysel
    rol:          rol          || 'alan',      // varsayılan: alan
    kategoriSlug: kategoriSlug || sektorId,    // yoksa sektorId'yi kullan
    kategoriAd:   kategoriAd   || '',
    ulke:         ulke         || 'Türkiye',
    ozellikler:   ozellikler   || [],
    teslimat:     teslimat     || [],
    resimUrl:     resimUrl     || null,

    // Yapay ilan işareti (sadece admin tarafından set edilir, burada false)
    yapay:        false,
  };

  const result = await db.collection('ilanlar').insertOne(ilan);

  return NextResponse.json(
    { success: true, id: result.insertedId },
    { status: 201 }
  );
}
