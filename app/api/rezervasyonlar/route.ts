import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { clean } from '@/lib/api-guard';
import { idGecerli } from '@/lib/validate';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  const session = await getServerSession(authOptions);
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

// Durum geçiş matrisi: hedef -> { izinli kaynak durumlar, kimler yapabilir (müşteri / hizmet veren) }
const GECISLER: Record<string, { kaynak: string[]; roller: ('musteri' | 'hizmetVeren')[] }> = {
  onaylandi:  { kaynak: ['on_rezervasyon'],               roller: ['hizmetVeren'] },
  tamamlandi: { kaynak: ['onaylandi'],                    roller: ['musteri', 'hizmetVeren'] },
  iptal:      { kaynak: ['on_rezervasyon', 'onaylandi'],  roller: ['musteri', 'hizmetVeren'] },
};

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });
  }

  const b = await req.json().catch(() => null);
  const id = b?.id;
  const durum = b?.durum;
  if (!id || !durum) {
    return NextResponse.json({ error: 'id ve durum zorunlu' }, { status: 400 });
  }
  if (!idGecerli(id)) return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
  // Durum beyaz listesi (isteğe bağlı keyfi metin yazılamaz)
  if (typeof durum !== 'string' || !Object.prototype.hasOwnProperty.call(GECISLER, durum)) {
    return NextResponse.json({ error: 'Geçersiz durum' }, { status: 400 });
  }

  const db = await getDb();
  const rezervasyon: any = await db.collection('rezervasyonlar').findOne({ _id: new ObjectId(id) });
  if (!rezervasyon) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });

  const email = session.user.email;
  const musteriMi = rezervasyon.musteri?.email === email;
  const veriyorMu = rezervasyon.hizmetVeren?.email === email;
  if (!musteriMi && !veriyorMu) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });
  }

  const gecis = GECISLER[durum];
  // Rol bazlı geçiş: ör. yalnızca hizmet veren onaylayabilir
  if (!gecis.roller.some((r) => (r === 'musteri' ? musteriMi : veriyorMu))) {
    return NextResponse.json({ error: 'Bu işlem için yetkiniz yok' }, { status: 403 });
  }
  if (!gecis.kaynak.includes(rezervasyon.durum)) {
    return NextResponse.json({ error: 'Rezervasyon şu anki durumunda bu işleme uygun değil' }, { status: 409 });
  }

  // Koşullu güncelleme: okuma ile yazma arasında durum değiştiyse yazılmaz
  const sonuc = await db.collection('rezervasyonlar').updateOne(
    { _id: new ObjectId(id), durum: rezervasyon.durum },
    { $set: { durum, not: clean(b?.not, 500), guncellendi: new Date() } }
  );
  if (sonuc.matchedCount === 0) {
    return NextResponse.json({ error: 'Rezervasyon bu arada güncellendi, lütfen yenileyin' }, { status: 409 });
  }

  // Bildirim gönder
  const diger = musteriMi ? rezervasyon.hizmetVeren?.email : rezervasyon.musteri?.email;

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
