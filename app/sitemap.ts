import { MetadataRoute } from 'next';
import { getDb } from '@/lib/mongodb';

// ⏱️ Sitemap saatlik olarak güncellenir
export const revalidate = 3600; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://swaphubs.com';

  // 1. Statik Sayfalar (Site mimarisi)
  const statik: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/ilanlar`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${base}/kesfet`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/ilan-ver`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // 2. Kategori Dinamik Linkleri (Geliştirilmiş encode yapısı)
  const kategoriler = ['otel-tatil','arac-kiralama','tamir-bakim','temizlik','usta','nakliyat','egitim','saglik'];
  const ticariKategoriler = ['tekstil','mermer-tas','metal-celik','plastik-pvc','ahsap-mobilya','gida-tarim','lojistik'];

  const kategoriLinkleri: MetadataRoute.Sitemap = [
    ...kategoriler.map(slug => ({
      url: `${base}/ilanlar?kategori=${slug}`,
      lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.7,
    })),
    ...ticariKategoriler.map(slug => ({
      // URL parametrelerinde & işareti için &amp; kullanımı XML uyumluluğu için kritiktir
      url: `${base}/ilanlar?tip=ticari&amp;kategori=${slug}`,
      lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.7,
    })),
  ];

  // 3. Veritabanı İlanları (Siber Hızda Sorgu)
  let ilanSayfalar: MetadataRoute.Sitemap = [];
  try {
    const db = await getDb();
    // 🚀 Sadece gerekli alanları çekerek bellek kullanımını minimize ediyoruz
    const ilanlar = await db.collection('ilanlar')
      .find({ durum: 'aktif' })
      .project({ _id: 1, guncellendi: 1, createdAt: 1 })
      .sort({ createdAt: -1 })
      .limit(5000) // 1000 yerine 5000 ilan kapasitesi (Büyüme odaklı)
      .toArray();
      
    ilanSayfalar = ilanlar.map(i => ({
      url: `${base}/ilan/${i._id}`,
      lastModified: i.guncellendi || i.createdAt || new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6, // İlanlar statik sayfalardan daha düşük öncelikli olmalı
    }));
  } catch (error) {
    console.error("Sitemap Generation Error:", error);
  }

  return [...statik, ...kategoriLinkleri, ...ilanSayfalar];
}
