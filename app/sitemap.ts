import { MetadataRoute } from 'next';
import { getDb } from '@/lib/mongodb';

export const revalidate = 3600; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://swaphubs.com';

  const statik: MetadataRoute.Sitemap = [
    { url: base,                 lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/ilanlar`,    lastModified: new Date(), changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${base}/kesfet`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/ilan-ver`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/giris`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/kayit`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    
    // 🚨 & işareti içeren linkler XML standartlarına göre güvenli hale getirildi
    ...['otel-tatil','arac-kiralama','tamir-bakim','temizlik','usta','nakliyat','egitim','saglik'].map(slug => ({
      url: `${base}/ilanlar?kategori=${slug}`,
      lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.7,
    })),
    
    ...['tekstil','mermer-tas','metal-celik','plastik-pvc','ahsap-mobilya','gida-tarim','lojistik'].map(slug => ({
      url: `${base}/ilanlar?tip=ticari&amp;kategori=${slug}`, // & işareti &amp; yapıldı
      lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.7,
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
      lastModified:    i.guncellendi || i.createdAt || new Date(),
      changeFrequency: 'daily' as const,
      priority:        0.8,
    }));
  } catch (error) {
    console.error("Sitemap Hatası:", error);
  }

  return [...statik, ...ilanSayfalar];
}
