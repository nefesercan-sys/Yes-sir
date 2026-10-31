import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isAdminRequest } from '@/lib/admin-auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { idGecerli, teklifEposta, teklifTaraf } from '@/lib/validate';

interface Props { params: { id: string } }

const BEKLEYEN = ['bekliyor', 'beklemede', 'pazarlik'];

export async function PATCH(req: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });
  }

  const b = await req.json().catch(() => null);
  const action = b?.action;
  const ilanIdStr = b?.ilanId;
  if (!action || !ilanIdStr) {
    return NextResponse.json({ error: 'action ve ilanId zorunlu' }, { status: 400 });
  }
  if (!idGecerli(params.id) || !idGecerli(ilanIdStr)) {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  }

  const db = await getDb();
  const teklifOid = new ObjectId(params.id);
  const ilanOid = new ObjectId(ilanIdStr);
  // Teklifler ilanId'yi çoğunlukla metin olarak saklar, eski kayıtlarda ObjectId olabilir: ikisini de eşle
  const ilanKimlikleri: any[] = [ilanIdStr, ilanOid];

  const teklif: any = await db.collection('teklifler').findOne({ _id: teklifOid });
  const ilan: any = await db.collection('ilanlar').findOne({ _id: ilanOid });

  if (!teklif) return NextResponse.json({ error: 'Teklif bulunamadı' }, { status: 404 });
  if (!ilan) return NextResponse.json({ error: 'İlan bulunamadı' }, { status: 404 });
  // Teklif gerçekten bu ilana mı ait? (başka ilanın teklifini kabul ettirme engeli)
  if (String(teklif.ilanId) !== ilanIdStr) {
    return NextResponse.json({ error: 'Teklif bu ilana ait değil' }, { status: 400 });
  }
  const admin = await isAdminRequest(req);
  if (!admin && ilan.sahibi?.email !== session.user.email) {
    return NextResponse.json({ error: 'Yetkisiz işlem' }, { status: 403 });
  }
  if (!BEKLEYEN.includes(teklif.durum)) {
    return NextResponse.json({ error: 'Bu teklif artık beklemede değil' }, { status: 409 });
  }

  const taraf = teklifTaraf(teklif);
  const teklifciEposta = teklifEposta(teklif);
  const fiyat = Number(teklif.teklifFiyat ?? teklif.fiyat);
  const fiyatMetni = Number.isFinite(fiyat) ? fiyat.toLocaleString('tr-TR') : '';

  if (action === 'kabul_et') {
    // 1) İlanı atomik "al": yalnızca hâlâ aktif ve teklife açıksa (çift kabul/yarış engeli)
    const alinan = await db.collection('ilanlar').updateOne(
      { _id: ilanOid, durum: 'aktif', teklifeAcik: { $ne: false } },
      { $set: { durum: 'rezervasyonda', teklifeAcik: false, guncellendi: new Date() } }
    );
    if (alinan.matchedCount === 0) {
      return NextResponse.json({ error: 'İlan artık teklif kabul etmiyor' }, { status: 409 });
    }

    // 2) Teklifi koşullu kabul et (durum hâlâ bekleyen olmalı); olmadıysa ilanı geri aç
    const kabul = await db.collection('teklifler').updateOne(
      { _id: teklifOid, durum: { $in: BEKLEYEN } },
      { $set: { durum: 'kabul_edildi', guncellendi: new Date() } }
    );
    if (kabul.matchedCount === 0) {
      await db.collection('ilanlar').updateOne(
        { _id: ilanOid, durum: 'rezervasyonda' },
        { $set: { durum: 'aktif', teklifeAcik: true, guncellendi: new Date() } }
      );
      return NextResponse.json({ error: 'Teklif bu arada güncellendi' }, { status: 409 });
    }

    // Diğer BEKLEYEN teklifleri reddet (geri alınmış/reddedilmiş olanlara dokunma)
    const digerleri = await db.collection('teklifler')
      .find({ ilanId: { $in: ilanKimlikleri }, _id: { $ne: teklifOid }, durum: { $in: BEKLEYEN } })
      .toArray();
    if (digerleri.length > 0) {
      await db.collection('teklifler').updateMany(
        { _id: { $in: digerleri.map((t: any) => t._id) }, durum: { $in: BEKLEYEN } },
        { $set: { durum: 'reddedildi', guncellendi: new Date() } }
      );
    }

    // Rezervasyon oluştur
    const rezervasyon = {
      ilanId: ilanOid,
      teklifId: teklifOid,
      musteri: ilan.sahibi,
      hizmetVeren: taraf,
      sektorId: ilan.sektorId,
      baslik: ilan.baslik,
      fiyat: Number.isFinite(fiyat) ? fiyat : null,
      doviz: teklif.doviz,
      formData: ilan.formData,
      durum: 'on_rezervasyon',
      olusturuldu: new Date(),
      guncellendi: new Date(),
    };

    const rezRes = await db.collection('rezervasyonlar').insertOne(rezervasyon);

    // Kabul edilen teklifçiye bildirim (e-posta üç şemadan çözülür; yoksa bildirim atlanır)
    if (teklifciEposta) {
      await db.collection('bildirimler').insertOne({
        alici: teklifciEposta,
        tip: 'teklif_kabul',
        mesaj: `🎉 Teklifiniz kabul edildi! "${ilan.baslik}" — ${fiyatMetni} ${teklif.doviz || ''}`,
        ilanId: ilanOid,
        rezervasyonId: rezRes.insertedId,
        okundu: false,
        tarih: new Date(),
      });
    }

    // Reddedilenlere bildirim
    await Promise.all(digerleri.map((r: any) => {
      const alici = teklifEposta(r);
      if (!alici) return Promise.resolve(null);
      return db.collection('bildirimler').insertOne({
        alici,
        tip: 'teklif_reddedildi',
        mesaj: `"${ilan.baslik}" ilanında başka bir teklif tercih edildi.`,
        ilanId: ilanOid,
        okundu: false,
        tarih: new Date(),
      });
    }));

    return NextResponse.json({ success: true, rezervasyonId: rezRes.insertedId });
  }

  if (action === 'reddet') {
    const sonuc = await db.collection('teklifler').updateOne(
      { _id: teklifOid, durum: { $in: BEKLEYEN } },
      { $set: { durum: 'reddedildi', guncellendi: new Date() } }
    );
    if (sonuc.matchedCount === 0) {
      return NextResponse.json({ error: 'Teklif bu arada güncellendi' }, { status: 409 });
    }

    if (teklifciEposta) {
      await db.collection('bildirimler').insertOne({
        alici: teklifciEposta,
        tip: 'teklif_reddedildi',
        mesaj: `"${ilan.baslik}" ilanındaki teklifiniz reddedildi.`,
        ilanId: ilanOid,
        okundu: false,
        tarih: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 });
}

export async function DELETE(_: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });
  }
  if (!idGecerli(params.id)) {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  }

  const db = await getDb();
  const teklif: any = await db.collection('teklifler').findOne({ _id: new ObjectId(params.id) });

  if (!teklif) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  // Üç şemadan (teklifVeren/teklifci/gonderen) e-posta çözülür
  if (teklifEposta(teklif) !== session.user.email) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });
  }
  if (teklif.durum === 'kabul_edildi') {
    return NextResponse.json({ error: 'Kabul edilmiş teklif silinemez' }, { status: 400 });
  }

  await db.collection('teklifler').deleteOne({ _id: new ObjectId(params.id) });
  if (idGecerli(String(teklif.ilanId))) {
    await db.collection('ilanlar').updateOne(
      { _id: new ObjectId(String(teklif.ilanId)), teklifSayisi: { $gt: 0 } },
      { $inc: { teklifSayisi: -1 } }
    );
  }

  return NextResponse.json({ success: true });
}
