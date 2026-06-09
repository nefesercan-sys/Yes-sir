import type { Metadata } from 'next';
import { getDb } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import BalDetayClient from './BalDetayClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const db = await getDb();
  const urun = await db.collection('bal_urunler').findOne({ slug: params.slug, aktif: true });
  if (!urun) return { title: 'Ürün Bulunamadı' };
  return {
    title: `${urun.ad} | Arım Balım Çiçeğim`,
    description: urun.aciklama,
    alternates: { canonical: `https://www.swaphubs.com/bal/${urun.slug}` },
  };
}

async function getUrun(slug: string) {
  try {
    const db = await getDb();
    const urun = await db.collection('bal_urunler').findOne({ slug, aktif: true });
    if (!urun) return null;
    return JSON.parse(JSON.stringify(urun));
  } catch {
    return null;
  }
}

export default async function BalDetayPage({ params }: { params: { slug: string } }) {
  const urun = await getUrun(params.slug);
  if (!urun) notFound();
  return <BalDetayClient urun={urun} />;
}
