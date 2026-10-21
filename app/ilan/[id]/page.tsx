import type { Metadata } from 'next';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import IlanDetayPageClient from './IlanDetayPageClient';

// İlan detayı: sayfa içeriği istemci bileşeninde (IlanDetayPageClient), başlık/açıklama/canonical burada
// sunucuda üretilir; böylece Google ilanı kendi başlığı ve açıklamasıyla görür.
const SITE = 'https://swaphubs.com';

const kisalt = (s: string, n: number) => {
  const t = s.replace(/\s+/g, ' ').trim();
  return t.length <= n ? t : t.slice(0, n - 1).replace(/[\s,.;:-]+\S*$/, '') + '…';
};

async function ilanGetir(id: string): Promise<any | null> {
  try {
    const db = await getDb();
    const q = ObjectId.isValid(id) ? { $or: [{ _id: new ObjectId(id) }, { slug: id }] } : { slug: id };
    return await db.collection('ilanlar').findOne(q);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ilan = await ilanGetir(params.id);
  if (!ilan) {
    return { title: 'İlan | SwapHubs', robots: { index: false, follow: true } };
  }
  const baslik = String(ilan.seo?.metaBaslik || ilan.baslik || 'İlan');
  const aciklamaHam = String(ilan.seo?.metaAciklama || ilan.aciklama || ilan.formData?.aciklama || 'SwapHubs ilanı');
  const title = kisalt(baslik, 52) + ' | SwapHubs';
  const description = kisalt(aciklamaHam, 155);
  const slug = ilan.slug || ilan.seo?.slug || String(ilan._id);
  const url = `${SITE}/ilan/${slug}`;
  const gorsel = [ilan.resimUrl, ...(Array.isArray(ilan.medyalar) ? ilan.medyalar : [])].find(
    (u: unknown) => typeof u === 'string' && /^https:\/\//.test(u)
  ) as string | undefined;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    openGraph: {
      title,
      description,
      url,
      siteName: 'SwapHubs',
      type: 'article',
      images: gorsel ? [{ url: gorsel }] : [{ url: `${SITE}/swaphubs-og.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default function IlanDetayPage() {
  return <IlanDetayPageClient />;
}
