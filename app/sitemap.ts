import { MetadataRoute } from 'next';
import { getDb } from '@/lib/mongodb';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://hizmetara.com';

  const statik: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    { url: `${base}/ilan-ver`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/giris`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/uye-ol`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  try {
    const db = await getDb();
    const ilanlar = await db.collection('ilanlar')
      .find({ durum: 'aktif' })
      .sort({ createdAt: -1 })
      .limit(5000)
      .project({ _id: 1, guncellendi: 1 })
      .toArray();

    const dinamik: MetadataRoute.Sitemap = ilanlar.map(i => ({
      url: `${base}/ilan/${i._id}`,
      lastModified: new Date(i.guncellendi || i.createdAt),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

    return [...statik, ...dinamik];
  } catch {
    return statik;
  }
}
