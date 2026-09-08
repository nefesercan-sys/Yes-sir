// ============================================================
// SwapHubs — app/api/terzi/teklifler/route.ts
// POST: terzi/kuru temizleme sağlayıcısı fiyat teklifi verir
// GET : ?ilanId= ile (sadece ilan sahibi) o talebe gelen teklifleri getirir
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getSessionUserId } from '@/lib/terzi-session';
import { smsGonder } from '@/lib/sms';

export async function GET(req: NextRequest) {
  try {
    const userId = getSessionUserId();
    if (!userId) return NextResponse.json([], { status: 401 });

    const { searchParams } = new URL(req.url);
    const ilanId = searchParams.get('ilanId');
    const kendi = searchParams.get('kendi');

    const db = await getDb();

    if (kendi === 'true') {
      const teklifler = await db.collection('teklifler')
        .find({ 'teklifVeren.userId': userId })
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();
      return NextResponse.json(JSON.parse(JSON.stringify(teklifler)));
    }

    if (!ilanId) return NextResponse.json({ error: 'ilanId zorunlu' }, { status: 400 });

    const ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(ilanId) });
    if (!ilan || ilan.sahibi?.userId !== userId) {
      return NextResponse.json({ error: 'Yetkiniz yok' }, { status: 403 });
    }

    const teklifler = await db.collection('teklifler').find({ ilanId }).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(JSON.parse(JSON.stringify(teklifler)));
  } catch (err) {
    console.error('GET terzi teklifler hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getSessionUserId();
    if (!userId) return NextResponse.json({ error: 'Önce telefon ile giriş yapın' }, { status: 401 });

    const { ilanId, fiyat, mesaj, lat, lng } = await req.json();
    if (!ilanId || !fiyat) {
      return NextResponse.json({ error: 'İlan ve fiyat zorunlu' }, { status: 400 });
    }

    const db = await getDb();
    const [saglayici, ilan] = await Promise.all([
      db.collection('terziKullanicilar').findOne({ _id: new ObjectId(userId) }),
      db.collection('ilanlar').findOne({ _id: new ObjectId(ilanId) }),
    ]);

    if (!ilan) return NextResponse.json({ error: 'İlan bulunamadı' }, { status: 404 });
    if (!ilan.teklifeAcik) return NextResponse.json({ error: 'Bu talep artık kapalı' }, { status: 400 });
    if (ilan.sahibi?.userId === userId) {
      return NextResponse.json({ error: 'Kendi talebinize teklif veremezsiniz' }, { status: 400 });
    }

    const mevcut = await db.collection('teklifler').findOne({
      ilanId, 'teklifVeren.userId': userId, durum: 'bekliyor',
    });
    if (mevcut) return NextResponse.json({ error: 'Bu talebe zaten teklif verdiniz' }, { status: 400 });

    const teklif = {
      ilanId,
      ilanBaslik: ilan.baslik,
      teklifFiyat: Number(fiyat),
      mesaj: mesaj || '',
      location: (typeof lat === 'number' && typeof lng === 'number')
        ? { type: 'Point', coordinates: [lng, lat] } : null,
      durum: 'bekliyor',
      teklifVeren: { userId, telefon: saglayici?.telefon },
      ilanSahibi: ilan.sahibi,
      createdAt: new Date(),
      guncellendi: new Date(),
    };

    const result = await db.collection('teklifler').insertOne(teklif);
    await db.collection('ilanlar').updateOne({ _id: new ObjectId(ilanId) }, { $inc: { teklifSayisi: 1 } });

    await db.collection('bildirimler').insertOne({
      aliciTelefon: ilan.sahibi?.telefon,
      tip: 'yeni_teklif',
      mesaj: `Talebinize ${Number(fiyat).toLocaleString('tr-TR')} ₺ teklif geldi.`,
      ilanId,
      teklifId: result.insertedId.toString(),
      okundu: false,
      tarih: new Date(),
    });
    if (ilan.sahibi?.telefon) {
      await smsGonder(ilan.sahibi.telefon, `SwapHubs: "${ilan.baslik}" talebinize ${fiyat} ₺ teklif geldi. Uygulamadan görüntüleyin.`);
    }

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error('POST terzi teklifler hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
