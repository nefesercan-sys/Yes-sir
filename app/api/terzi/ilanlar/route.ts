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
import { clean, rateLimited } from '@/lib/api-guard';
import { enlemBoylamGecerli, medyaListesi, tamSayi } from '@/lib/validate';
import { konumuYuvarla } from '@/lib/ilan-public';

const SEKTOR_ID = 'terzi-kuru-temizleme';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat') || '');
    const lng = parseFloat(searchParams.get('lng') || '');
    const radiusKm = tamSayi(searchParams.get('radius'), 1, 50, 15); // 1–50 km
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

    if (!enlemBoylamGecerli(lat, lng)) {
      return NextResponse.json({ error: 'lat/lng zorunlu ve geçerli aralıkta olmalı' }, { status: 400 });
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

    // Herkese açık yanıt: açık alan listesi (telefon/kullanıcı kimliği yok), konum ~1 km'ye yuvarlı.
    return NextResponse.json(serialize(ilanlar.map(herkeseAcik)));
  } catch (err) {
    console.error('GET terzi ilanlar hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getSessionUserId();
    if (!userId) return NextResponse.json({ error: 'Önce telefon ile giriş yapın' }, { status: 401 });

    if (rateLimited(req, `terzi-ilan:${userId}`, 10, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Çok fazla talep oluşturdunuz. Lütfen daha sonra tekrar deneyin.' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 });
    const { kategori, adet, lat, lng } = body;
    const hizmetTuru = clean(body.hizmetTuru, 60);
    const aciklama = clean(body.aciklama, 1000);
    const medyalar = medyaListesi(body.medyalar, 10);
    const hizmetler: string[] = Array.isArray(body.hizmetler)
      ? body.hizmetler.slice(0, 20).map((h: unknown) => clean(h, 80)).filter(Boolean) : [];
    const urunler: { ad: string; adet: number }[] | null = Array.isArray(body.urunler)
      ? body.urunler.slice(0, 40).map((u: any) => ({ ad: clean(u?.ad, 80), adet: tamSayi(u?.adet, 0, 999, 0) })) : null;

    if (!enlemBoylamGecerli(lat, lng)) {
      return NextResponse.json({ error: 'Konum zorunlu' }, { status: 400 });
    }

    const kuruTemizleme = kategori === 'kuru-temizleme';

    let baslik: string;
    let hizmetlerAlani: string[] = [];
    let adetAlani = 1;
    let urunlerAlani: { ad: string; adet: number }[] | undefined;

    if (kuruTemizleme) {
      if (!urunler || urunler.filter((u) => u.adet > 0 && u.ad).length === 0) {
        return NextResponse.json({ error: 'En az bir ürün ve adet girin' }, { status: 400 });
      }
      if (!hizmetTuru) {
        return NextResponse.json({ error: 'Hizmet türünü seçin (Yıkama, Ütü vb.)' }, { status: 400 });
      }
      const temizUrunler = urunler.filter((u) => u.adet > 0 && u.ad);
      const ozet = temizUrunler.map((u: any) => `${u.adet} ${u.ad}`).join(', ');
      baslik = `Kuru Temizleme: ${ozet} (${hizmetTuru})`;
      adetAlani = temizUrunler.reduce((t: number, u: any) => t + u.adet, 0);
      hizmetlerAlani = [hizmetTuru];
      urunlerAlani = temizUrunler;
    } else {
      if (hizmetler.length === 0) {
        return NextResponse.json({ error: 'En az bir hizmet seçin' }, { status: 400 });
      }
      baslik = `Terzi Talebi: ${hizmetler.join(', ')}`;
      hizmetlerAlani = hizmetler;
      adetAlani = tamSayi(adet, 1, 999, 1);
    }

    const db = await getDb();
    if (!ObjectId.isValid(userId)) return NextResponse.json({ error: 'Geçersiz oturum' }, { status: 401 });
    const kullanici = await db.collection('terziKullanicilar').findOne({ _id: new ObjectId(userId) });
    if (!kullanici) return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });

    const ilan: Record<string, any> = {
      sektorId: SEKTOR_ID,
      kategori: kuruTemizleme ? 'kuru-temizleme' : 'terzi',
      baslik,
      hizmetler: hizmetlerAlani,
      ...(urunlerAlani ? { urunler: urunlerAlani, hizmetTuru } : {}),
      adet: adetAlani,
      aciklama,
      medyalar,
      resimUrl: medyalar[0] || null,
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

// Herkese açık ilan alanları (beyaz liste). sahibi/telefon/userId bilerek yok.
function herkeseAcik(i: any) {
  return {
    _id: i._id, sektorId: i.sektorId, kategori: i.kategori, baslik: i.baslik,
    hizmetler: i.hizmetler, hizmetTuru: i.hizmetTuru, urunler: i.urunler, adet: i.adet,
    aciklama: i.aciklama, medyalar: i.medyalar, resimUrl: i.resimUrl,
    location: konumuYuvarla(i.location), durum: i.durum, teklifeAcik: i.teklifeAcik,
    teklifSayisi: i.teklifSayisi, createdAt: i.createdAt,
  };
}

function serialize(data: any): any {
  return JSON.parse(JSON.stringify(data));
}
