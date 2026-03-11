import { getDb } from '@/lib/mongodb';
import AnaSayfaClient from './AnaSayfaClient';

export const revalidate = 60;

export default async function AnaSayfa() {
  let ilanlar: any[] = [];
  let istatistik = { toplamIlan: 0, toplamUye: 0, toplamTeklif: 0 };

  try {
    const db = await getDb();
    const [ilanRaw, istatRaw] = await Promise.all([
      db.collection('ilanlar').find({ durum: 'aktif' }).sort({ createdAt: -1 }).limit(24).toArray(),
      db.collection('istatistik').findOne({ _id: 'genel' }),
    ]);
    ilanlar = JSON.parse(JSON.stringify(ilanRaw));

    const [toplamIlan, toplamUye, toplamTeklif] = await Promise.all([
      db.collection('ilanlar').countDocuments({ durum: 'aktif' }),
      db.collection('users').countDocuments(),
      db.collection('teklifler').countDocuments(),
    ]);
    istatistik = { toplamIlan, toplamUye, toplamTeklif };
  } catch {}

  return <AnaSayfaClient ilanlar={ilanlar} istatistik={istatistik} />;
}
