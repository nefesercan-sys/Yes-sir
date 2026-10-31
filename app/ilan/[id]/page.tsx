import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

// hata: veritabanı geçici olarak yanıt vermediyse true. Bu durumda sayfa noindex YAPILMAZ (yalnızca gerçekten bulunamayan ilan noindex olur).
async function ilanGetir(id: string): Promise<{ ilan: any | null; hata: boolean }> {
  try {
    const db = await getDb();
    const q = ObjectId.isValid(id) ? { $or: [{ _id: new ObjectId(id) }, { slug: id }] } : { slug: id };
    return { ilan: await db.collection('ilanlar').findOne(q), hata: false };
  } catch {
    return { ilan: null, hata: true };
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { ilan, hata } = await ilanGetir(params.id);
  if (!ilan) {
    if (hata) {
      // Geçici veritabanı hatası: noindex verme, kanonik adresi koru
      return { title: 'İlan | SwapHubs', alternates: { canonical: `${SITE}/ilan/${params.id}` } };
    }
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

export default async function IlanDetayPage({ params }: { params: { id: string } }) {
  const { ilan, hata } = await ilanGetir(params.id);
  // Gerçekten olmayan ilan: 404 (veritabanı geçici hatasında istemci kendi çeker)
  if (!ilan && !hata) notFound();
  const veri = ilan
    ? JSON.parse(
        JSON.stringify({
          ...ilan,
          id: String(ilan._id),
          _id: String(ilan._id),
          olusturmaTarihi: ilan.olusturmaTarihi || ilan.createdAt || new Date().toISOString(),
          kullanici: ilan.kullanici || (ilan.sahibi ? { id: ilan.sahibi.email || '', name: ilan.sahibi.ad || 'İsimsiz', image: ilan.sahibi.resim || null } : null),
          kullaniciId: ilan.kullaniciId || ilan.sahibi?.email || '',
          aciklama: ilan.aciklama || ilan.formData?.aciklama || '',
          iletisim: ilan.iletisim || ilan.formData?.iletisim || '',
        })
      )
    : null;
  return <IlanDetayPageClient ilan={veri} />;
}
