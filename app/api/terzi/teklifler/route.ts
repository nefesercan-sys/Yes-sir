// ============================================================
// SwapHubs — app/api/terzi/teklifler/route.ts
// POST: terzi/kuru temizleme sağlayıcısı fiyat teklifi verir
// GET : ?ilanId= ile (sadece ilan sahibi) o talebe gelen teklifleri getirir
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getSessionUserId } from '@/lib/terzi-session';
import { smsGonder, smsMetin } from '@/lib/sms';
import { clean, rateLimited } from '@/lib/api-guard';
import { enlemBoylamGecerli, idGecerli, sonluSayi } from '@/lib/validate';

// Kabul edilmemiş tekliflerde karşı tarafın telefonu/kimliği gösterilmez (iletişim bilgisi yalnızca kabulden sonra açılır).
function gizle(t: any) {
  if (!t || t.durum === 'kabul_edildi') return t;
  const o = { ...t };
  if (o.ilanSahibi) o.ilanSahibi = { tip: o.ilanSahibi.tip };
  if (o.teklifVeren) o.teklifVeren = { userId: o.teklifVeren.userId };
  return o;
}

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
      // Teklif veren yalnızca KABUL edilmiş tekliflerde ilan sahibinin telefonunu görür
      return NextResponse.json(JSON.parse(JSON.stringify(teklifler.map((t: any) => gizle(t)))));
    }

    if (!idGecerli(ilanId)) return NextResponse.json({ error: 'Geçerli bir ilanId zorunlu' }, { status: 400 });

    const ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(ilanId) });
    if (!ilan || ilan.sahibi?.userId !== userId) {
      return NextResponse.json({ error: 'Yetkiniz yok' }, { status: 403 });
    }

    // İlan sahibi, teklif verenlerin telefonunu yalnızca kabul ettiği teklifte görür
    const teklifler = await db.collection('teklifler').find({ ilanId }).sort({ createdAt: -1 }).limit(200).toArray();
    return NextResponse.json(JSON.parse(JSON.stringify(teklifler.map((t: any) => gizle(t)))));
  } catch (err) {
    console.error('GET terzi teklifler hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getSessionUserId();
    if (!userId) return NextResponse.json({ error: 'Önce telefon ile giriş yapın' }, { status: 401 });

    // Kullanıcı başına basit hız sınırı (saatte 20 teklif)
    if (rateLimited(req, `terzi-teklif:${userId}`, 20, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Çok fazla teklif gönderdiniz. Lütfen daha sonra tekrar deneyin.' }, { status: 429 });
    }

    const b = await req.json().catch(() => null);
    const ilanId = b?.ilanId;
    const fiyatHam = sonluSayi(b?.fiyat);
    if (!idGecerli(ilanId) || fiyatHam === null) {
      return NextResponse.json({ error: 'İlan ve fiyat zorunlu' }, { status: 400 });
    }
    if (fiyatHam <= 0 || fiyatHam > 1000000) {
      return NextResponse.json({ error: 'Fiyat 0 ile 1.000.000 arasında olmalı' }, { status: 400 });
    }
    const fiyat = Math.round(fiyatHam * 100) / 100; // yalnızca sayı; SMS ve bildirimlere bu değer girer
    const mesaj = clean(b?.mesaj, 500);
    const { lat, lng } = b ?? {};

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
      teklifFiyat: fiyat,
      mesaj,
      location: enlemBoylamGecerli(lat, lng)
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
      mesaj: `Talebinize ${fiyat.toLocaleString('tr-TR')} ₺ teklif geldi.`,
      ilanId,
      teklifId: result.insertedId.toString(),
      okundu: false,
      tarih: new Date(),
    });
    if (ilan.sahibi?.telefon) {
      // SMS'e yalnızca sayısal fiyat ve temizlenmiş/kısaltılmış başlık girer (URL içeremez)
      await smsGonder(ilan.sahibi.telefon, `SwapHubs: "${smsMetin(ilan.baslik, 40)}" talebinize ${fiyat} TL teklif geldi. Uygulamadan görüntüleyin.`);
    }

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error('POST terzi teklifler hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
