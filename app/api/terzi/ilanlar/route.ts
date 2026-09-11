// ============================================================
// SwapHubs — app/api/terzi/ilanlar/route.ts
// POST: müşteri yeni terzi talebi oluşturur
// GET : ?lat&lng&radius ile çevredeki açık talepleri getirir
//       ?kendi=true ile oturum sahibinin kendi taleplerini getirir
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getSessionUserId } from '@/lib/terzi-session';

const SEKTOR_ID = 'terzi-kuru-temizleme';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat') || '');
    const lng = parseFloat(searchParams.get('lng') || '');
    const radiusKm = parseFloat(searchParams.get('radius') || '15');
    const kendi = searchParams.get('kendi');

    const db = await getDb();

    if (kendi === 'true') {
      const userId = getSessionUserId();
      if (!userId) return NextResponse.json([], { status: 401 });
      const ilanlar = await db.collection('ilanlar')
        .find({ sektorId: SEKTOR_ID, 'sahibi.userId': userId })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json(serialize(ilanlar));
    }

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json({ error: 'lat/lng zorunlu' }, { status: 400 });
    }

    const ilanlar = await db.collection('ilanlar').find({
      sektorId: SEKTOR_ID,
      durum: 'aktif',
      teklifeAcik: true,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: radiusKm * 1000,
        },
      },
    }).limit(50).toArray();

    return NextResponse.json(serialize(ilanlar));
  } catch (err) {
    console.error('GET terzi ilanlar hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getSessionUserId();
    if (!userId) return NextResponse.json({ error: 'Önce telefon ile giriş yapın' }, { status: 401 });

    const body = await req.json();
    const { kategori, hizmetler, adet, hizmetTuru, urunler, lat, lng, aciklama, medyalar } = body;

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json({ error: 'Konum zorunlu' }, { status: 400 });
    }

    const kuruTemizleme = kategori === 'kuru-temizleme';

    let baslik: string;
    let hizmetlerAlani: string[] = [];
    let adetAlani = 1;
    let urunlerAlani: { ad: string; adet: number }[] | undefined;

    if (kuruTemizleme) {
      if (!Array.isArray(urunler) || urunler.filter((u: any) => Number(u.adet) > 0).length === 0) {
        return NextResponse.json({ error: 'En az bir ürün ve adet girin' }, { status: 400 });
      }
      if (!hizmetTuru) {
        return NextResponse.json({ error: 'Hizmet türünü seçin (Yıkama, Ütü vb.)' }, { status: 400 });
      }
      const temizUrunler = urunler
        .filter((u: any) => Number(u.adet) > 0)
        .map((u: any) => ({ ad: String(u.ad), adet: Number(u.adet) }));
      const ozet = temizUrunler.map((u: any) => `${u.adet} ${u.ad}`).join(', ');
      baslik = `Kuru Temizleme: ${ozet} (${hizmetTuru})`;
      adetAlani = temizUrunler.reduce((t: number, u: any) => t + u.adet, 0);
      hizmetlerAlani = [hizmetTuru];
      urunlerAlani = temizUrunler;
    } else {
      if (!Array.isArray(hizmetler) || hizmetler.length === 0) {
        return NextResponse.json({ error: 'En az bir hizmet seçin' }, { status: 400 });
      }
      baslik = `Terzi Talebi: ${hizmetler.join(', ')}`;
      hizmetlerAlani = hizmetler;
      adetAlani = Number(adet) || 1;
    }

    const db = await getDb();
    const kullanici = await db.collection('terziKullanicilar').findOne({ _id: new ObjectId(userId) });
    if (!kullanici) return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });

    const ilan: Record<string, any> = {
      sektorId: SEKTOR_ID,
      kategori: kuruTemizleme ? 'kuru-temizleme' : 'terzi',
      baslik,
      hizmetler: hizmetlerAlani,
      ...(urunlerAlani ? { urunler: urunlerAlani, hizmetTuru } : {}),
      adet: adetAlani,
      aciklama: aciklama || '',
      medyalar: Array.isArray(medyalar) ? medyalar : [],
      resimUrl: medyalar?.[0] || null,
      location: { type: 'Point', coordinates: [lng, lat] },
      durum: 'aktif',
      teklifeAcik: true,
      teklifSayisi: 0,
      sahibi: { userId, telefon: kullanici.telefon, tip: 'terzi-musteri' },
      createdAt: new Date(),
      guncellendi: new Date(),
    };

    const result = await db.collection('ilanlar').insertOne(ilan);
    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error('POST terzi ilanlar hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

function serialize(data: any): any {
  return JSON.parse(JSON.stringify(data));
}
