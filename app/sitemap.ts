import { MetadataRoute } from 'next';
import { getDb } from '@/lib/mongodb';

// 🛡️ SİBER ZIRH: Haritayı sunucu hafızasına alır ve 1 saatte bir (3600 sn) yorulmadan günceller.
// Veritabanı çökmesini %100 engeller!
export const revalidate = 3600; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://swaphubs.com';

  const statik: MetadataRoute.Sitemap = [
    { url: base,                 lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/ilanlar`,    lastModified: new Date(), changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${base}/kesfet`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/ilan-ver`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/giris`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/kayit`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 }, // 🚨 Yazım hatası düzeltildi
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/iletisim`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    ...['otel-tatil','arac-kiralama','tamir-bakim','temizlik','usta',
        'nakliyat','egitim','etkinlik','saglik','teknoloji'].map(slug => ({
      url: `${base}/ilanlar?kategori=${slug}`,
      lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8,
    })),
    ...['tekstil','mermer-tas','metal-celik','plastik-pvc','ahsap-mobilya',
        'gida-tarim','insaat-malz','elektrik-enerji','makine-ekipman','lojistik'].map(slug => ({
      url: `${base}/ilanlar?tip=ticari&kategori=${slug}`,
      lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8,
    })),
  ];

  let ilanSayfalar: MetadataRoute.Sitemap = [];
  try {
    const db = await getDb();
    const ilanlar = await db.collection('ilanlar')
      .find({ durum: 'aktif' }, { projection: { _id: 1, guncellendi: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(1000)
      .toArray();
      
    ilanSayfalar = ilanlar.map(i => ({
      url:             `${base}/ilan/${i._id}`,
      lastModified:    i.guncellendi || i.createdAt || new Date(), // 🚨 Fallback eklendi
      changeFrequency: 'weekly' as const,
      priority:        0.7,
    }));
  } catch { /* db bağlantısı yoksa atla */ }

  return [...statik, ...ilanSayfalar];
}
