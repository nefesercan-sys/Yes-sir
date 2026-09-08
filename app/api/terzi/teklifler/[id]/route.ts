// ============================================================
// SwapHubs — app/api/terzi/teklifler/[id]/route.ts
// PATCH: ilan sahibi bir teklifi kabul eder veya reddeder.
// Kabul edilirse: ilan kapanır, diğer teklifler otomatik reddedilir,
// her iki tarafa da bildirim gider.
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getSessionUserId } from '@/lib/terzi-session';
import { smsGonder } from '@/lib/sms';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = getSessionUserId();
    if (!userId) return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });

    const { aksiyon } = await req.json(); // 'kabul_et' | 'reddet'
    const db = await getDb();

    const teklif = await db.collection('teklifler').findOne({ _id: new ObjectId(params.id) });
    if (!teklif) return NextResponse.json({ error: 'Teklif bulunamadı' }, { status: 404 });

    const ilan = await db.collection('ilanlar').findOne({ _id: new ObjectId(teklif.ilanId) });
    if (!ilan) return NextResponse.json({ error: 'Talep bulunamadı' }, { status: 404 });
    if (ilan.sahibi?.userId !== userId) {
      return NextResponse.json({ error: 'Yetkiniz yok' }, { status: 403 });
    }

    if (aksiyon === 'kabul_et') {
      await db.collection('teklifler').updateOne(
        { _id: new ObjectId(params.id) },
        { $set: { durum: 'kabul_edildi', guncellendi: new Date() } }
      );
      await db.collection('teklifler').updateMany(
        { ilanId: teklif.ilanId, _id: { $ne: new ObjectId(params.id) } },
        { $set: { durum: 'reddedildi', guncellendi: new Date() } }
      );
      await db.collection('ilanlar').updateOne(
        { _id: new ObjectId(teklif.ilanId) },
        { $set: { durum: 'kapandi', teklifeAcik: false, guncellendi: new Date() } }
      );

      await db.collection('bildirimler').insertOne({
        aliciTelefon: teklif.teklifVeren?.telefon,
        tip: 'teklif_kabul',
        mesaj: `🎉 "${ilan.baslik}" talebinize verdiğiniz teklif kabul edildi!`,
        ilanId: teklif.ilanId, okundu: false, tarih: new Date(),
      });
      if (teklif.teklifVeren?.telefon) {
        await smsGonder(teklif.teklifVeren.telefon, `SwapHubs: "${ilan.baslik}" teklifiniz kabul edildi!`);
      }

      const digerleri = await db.collection('teklifler')
        .find({ ilanId: teklif.ilanId, durum: 'reddedildi' }).toArray();
      await Promise.all(digerleri.map((t: any) =>
        db.collection('bildirimler').insertOne({
          aliciTelefon: t.teklifVeren?.telefon,
          tip: 'teklif_reddedildi',
          mesaj: `"${ilan.baslik}" talebinde başka bir teklif tercih edildi.`,
          ilanId: teklif.ilanId, okundu: false, tarih: new Date(),
        })
      ));

      return NextResponse.json({ success: true });
    }

    if (aksiyon === 'reddet') {
      await db.collection('teklifler').updateOne(
        { _id: new ObjectId(params.id) },
        { $set: { durum: 'reddedildi', guncellendi: new Date() } }
      );
      await db.collection('bildirimler').insertOne({
        aliciTelefon: teklif.teklifVeren?.telefon,
        tip: 'teklif_reddedildi',
        mesaj: `"${ilan.baslik}" talebindeki teklifiniz reddedildi.`,
        ilanId: teklif.ilanId, okundu: false, tarih: new Date(),
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Geçersiz aksiyon' }, { status: 400 });
  } catch (err) {
    console.error('PATCH terzi teklif hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
