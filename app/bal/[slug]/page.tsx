import type { Metadata } from 'next';
import { getDb } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import { balMetinUygula } from '@/lib/bal-icerik';
import BalDetayClient from './BalDetayClient';

export const revalidate = 300;

const BASE = 'https://swaphubs.com';

async function getUrun(slug: string) {
  try {
    const db = await getDb();
    const urun = await db.collection('bal_urunler').findOne({ slug, aktif: true });
    if (!urun) return null;
    return balMetinUygula(JSON.parse(JSON.stringify(urun)));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const urun = await getUrun(params.slug);
  if (!urun) return { title: 'Ürün Bulunamadı' };
  const url = `${BASE}/bal/${urun.slug}`;
  return {
    title: `${urun.ad} | Arım Balım Çiçeğim`,
    description: urun.aciklama,
    alternates: { canonical: url },
    openGraph: {
      title: urun.ad,
      description: urun.aciklama,
      url,
      siteName: 'SwapHubs',
      images: urun.gorsel ? [{ url: urun.gorsel }] : [{ url: '/swaphubs-og.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function BalDetayPage({ params }: { params: { slug: string } }) {
  const urun = await getUrun(params.slug);
  if (!urun) notFound();
  const url = `${BASE}/bal/${urun.slug}`;
  const musait: Record<string, string> = {
    var: 'https://schema.org/InStock',
    yok: 'https://schema.org/OutOfStock',
    rezervasyon: 'https://schema.org/PreOrder',
  };
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: urun.ad,
      description: urun.aciklama,
      sku: urun.slug,
      image: urun.gorsel ? [urun.gorsel] : undefined,
      brand: { '@type': 'Brand', name: 'Arım Balım Çiçeğim' },
      offers: {
        '@type': 'Offer',
        url,
        priceCurrency: 'TRY',
        price: urun.fiyat,
        availability: musait[urun.stok] || 'https://schema.org/InStock',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Arım Balım Çiçeğim', item: `${BASE}/bal` },
        { '@type': 'ListItem', position: 2, name: urun.ad, item: url },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BalDetayClient urun={urun} />
    </>
  );
}
