// ============================================================
// SwapHubs — app/api/terzi/teklifler/[id]/route.ts
// PATCH: ilan sahibi bir teklifi kabul eder veya reddeder.
// Kabul edilirse: ilan kapanır, diğer BEKLEYEN teklifler otomatik reddedilir,
// her iki tarafa da bildirim gider. Tüm geçişler koşullu/atomiktir (çift kabul yarışı yok).
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getSessionUserId } from '@/lib/terzi-session';
import { smsGonder, smsMetin } from '@/lib/sms';
import { idGecerli } from '@/lib/validate';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = getSessionUserId();
    if (!userId) return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });

    const b = await req.json().catch(() => null);
    const aksiyon = b?.aksiyon; // 'kabul_et' | 'reddet'
    if (aksiyon !== 'kabul_et' && aksiyon !== 'reddet') {
      return NextResponse.json({ error: 'Geçersiz aksiyon' }, { status: 400 });
    }
    if (!idGecerli(params.id)) return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });

    const db = await getDb();
    const teklifOid = new ObjectId(params.id);

    const teklif = await db.collection('teklifler').findOne({ _id: teklifOid });
    if (!teklif) return NextResponse.json({ error: 'Teklif bulunamadı' }, { status: 404 });
    if (!idGecerli(String(teklif.ilanId))) return NextResponse.json({ error: 'Talep bulunamadı' }, { status: 404 });
    const ilanOid = new ObjectId(String(teklif.ilanId));

    const ilan = await db.collection('ilanlar').findOne({ _id: ilanOid });
    if (!ilan) return NextResponse.json({ error: 'Talep bulunamadı' }, { status: 404 });
    if (ilan.sahibi?.userId !== userId) {
      return NextResponse.json({ error: 'Yetkiniz yok' }, { status: 403 });
    }
    if (teklif.durum !== 'bekliyor') {
      return NextResponse.json({ error: 'Bu teklif artık beklemede değil' }, { status: 409 });
    }
    const baslik = smsMetin(ilan.baslik, 40);

    if (aksiyon === 'kabul_et') {
      // Talebi atomik "al": yalnızca hâlâ aktifse (ikinci bir teklif aynı anda kabul edilemez)
      const alinan = await db.collection('ilanlar').updateOne(
        { _id: ilanOid, durum: 'aktif', teklifeAcik: { $ne: false } },
        { $set: { durum: 'kapandi', teklifeAcik: false, guncellendi: new Date() } }
      );
      if (alinan.matchedCount === 0) {
        return NextResponse.json({ error: 'Bu talep artık teklif kabul etmiyor' }, { status: 409 });
      }
      const kabul = await db.collection('teklifler').updateOne(
        { _id: teklifOid, durum: 'bekliyor' },
        { $set: { durum: 'kabul_edildi', guncellendi: new Date() } }
      );
      if (kabul.matchedCount === 0) {
        await db.collection('ilanlar').updateOne(
          { _id: ilanOid, durum: 'kapandi' },
          { $set: { durum: 'aktif', teklifeAcik: true, guncellendi: new Date() } }
        );
        return NextResponse.json({ error: 'Teklif bu arada güncellendi' }, { status: 409 });
      }

      // Yalnızca BEKLEYEN diğer teklifler reddedilir
      const digerleri = await db.collection('teklifler')
        .find({ ilanId: teklif.ilanId, _id: { $ne: teklifOid }, durum: 'bekliyor' }).toArray();
      if (digerleri.length > 0) {
        await db.collection('teklifler').updateMany(
          { _id: { $in: digerleri.map((t: any) => t._id) }, durum: 'bekliyor' },
          { $set: { durum: 'reddedildi', guncellendi: new Date() } }
        );
      }

      await db.collection('bildirimler').insertOne({
        aliciTelefon: teklif.teklifVeren?.telefon,
        tip: 'teklif_kabul',
        mesaj: `🎉 "${ilan.baslik}" talebinize verdiğiniz teklif kabul edildi!`,
        ilanId: teklif.ilanId, okundu: false, tarih: new Date(),
      });
      if (teklif.teklifVeren?.telefon) {
        await smsGonder(teklif.teklifVeren.telefon, `SwapHubs: "${baslik}" teklifiniz kabul edildi!`);
      }

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

    // aksiyon === 'reddet'
    const red = await db.collection('teklifler').updateOne(
      { _id: teklifOid, durum: 'bekliyor' },
      { $set: { durum: 'reddedildi', guncellendi: new Date() } }
    );
    if (red.matchedCount === 0) {
      return NextResponse.json({ error: 'Teklif bu arada güncellendi' }, { status: 409 });
    }
    await db.collection('bildirimler').insertOne({
      aliciTelefon: teklif.teklifVeren?.telefon,
      tip: 'teklif_reddedildi',
      mesaj: `"${ilan.baslik}" talebindeki teklifiniz reddedildi.`,
      ilanId: teklif.ilanId, okundu: false, tarih: new Date(),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('PATCH terzi teklif hatası:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
