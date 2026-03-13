import { getDb } from '@/lib/mongodb';
import AnaSayfaClient from './AnaSayfaClient';

export const revalidate = 60;

export default async function AnaSayfa() {
  let ilanlar: any[] = [];
  let istatistik = { toplamIlan: 0, toplamUye: 0, toplamTeklif: 0 };

  try {
    const db = await getDb();
    
    // 🚨 SİBER DÜZELTME: collection<any> ekleyerek TypeScript'in "_id kuralı" takıntısını ezip geçiyoruz!
    const [ilanRaw, istatRaw] = await Promise.all([
      db.collection('ilanlar').find({ durum: 'aktif' }).sort({ createdAt: -1 }).limit(24).toArray(),
      db.collection<any>('istatistikler').findOne({ _id: 'genel' })
    ]);
    
    ilanlar = JSON.parse(JSON.stringify(ilanRaw));

    // Canlı istatistikleri çekiyoruz
    const [toplamIlan, toplamUye, toplamTeklif] = await Promise.all([
      db.collection('ilanlar').countDocuments({ durum: 'aktif' }),
      db.collection('users').countDocuments(),
      db.collection('teklifler').countDocuments(),
    ]);
    
    istatistik = { toplamIlan, toplamUye, toplamTeklif };
    
  } catch (error) {
    console.error("Siber Veritabanı Hatası:", error);
  }

  return <AnaSayfaClient ilanlar={ilanlar} istatistik={istatistik} />;
}
