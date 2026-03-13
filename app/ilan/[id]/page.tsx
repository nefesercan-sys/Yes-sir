// app/ilan/[id]/page.tsx
import type { Metadata } from 'next';
import { getDb }         from '@/lib/mongodb';
import { ObjectId }      from 'mongodb';
import IlanDetaySayfaClient from './IlanDetayClient';

const SEKTOR_ADLARI: Record<string, string> = {
  turizm:'Turizm & Konaklama', seyahat:'Seyahat & Transfer', kiralama:'Kiralama',
  tamir:'Tamir & Bakım', usta:'Usta & İşçi', temizlik:'Temizlik Hizmetleri',
  uretim:'Üretim & Özel Sipariş', giyim:'Giyim & Tekstil', saglik:'Sağlık & Güzellik',
  egitim:'Eğitim & Danışmanlık', etkinlik:'Etkinlik & Düğün', mobilya:'Mobilya & Dekorasyon',
  tekstil:'Tekstil & Hazır Giyim', 'mermer-tas':'Mermer & Doğal Taş',
  'metal-celik':'Metal & Çelik', 'plastik-pvc':'Plastik & PVC',
  'ahsap-mob':'Ahşap & Mobilya', 'gida-tarim':'Gıda & Tarım Ürünleri',
  'insaat-malz':'İnşaat Malzemeleri', elektrik:'Elektrik & Enerji',
  makine:'Makine & Ekipman', lojistik:'Lojistik & Nakliyat',
  'kimya-boya':'Kimya & Boya', 'saglik-med':'Sağlık & Medikal',
};

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  try {
    const db   = await getDb();
    const ilan = await db.collection('ilanlar').findOne({
      _id: new ObjectId(params.id),
    });

    if (!ilan) {
      return {
        title: 'İlan Bulunamadı | SwapHubs',
        description: 'Aradığınız ilan bulunamadı veya kaldırılmış olabilir.',
        robots: { index: false },
      };
    }

    const sehir    = ilan.formData?.sehir ?? ilan.sehir ?? '';
    const ulke     = ilan.ulke && ilan.ulke !== 'Türkiye' ? ilan.ulke : null;
    const lokasyon = ulke ? `${ulke} / ${sehir}` : sehir;
    const tip      = ilan.tip === 'ticari' ? 'Ticari' : 'Bireysel';
    const rolAd    = ilan.rol === 'veren'  ? 'Hizmet Veren' : 'Hizmet Alan';
    const sektorAd = SEKTOR_ADLARI[ilan.sektorId ?? ''] ?? ilan.kategoriAd ?? '';
    const birim    = ilan.butceBirimi ?? '₺';
    const fiyat    = `${birim}${new Intl.NumberFormat('tr-TR').format(ilan.butceMin ?? 0)}–${birim}${new Intl.NumberFormat('tr-TR').format(ilan.butceMax ?? 0)}`;
    const title    = `${ilan.baslik} — ${lokasyon} | SwapHubs`;

    const metaAciklama = ilan.seo?.metaAciklama
      ? ilan.seo.metaAciklama
      : `${ilan.baslik} — ${tip} ${rolAd} ilanı. ${lokasyon} · ${fiyat} · ${sektorAd}. SwapHubs'da ücretsiz teklif verin veya talep oluşturun.`;

    const seoKelimeler: string[] = [
      ilan.baslik, sehir, ulke ?? 'Türkiye', sektorAd,
      tip === 'Ticari' ? 'toptan' : 'hizmet',
      ilan.rol === 'veren' ? 'ihracat' : 'ithalat',
      'SwapHubs', 'ilan', 'teklif',
      ...(ilan.seo?.anahtarKelimeler ?? []),
    ].filter(Boolean) as string[];

    const ogImage = ilan.resimUrl
      ? [{ url: ilan.resimUrl, width: 800, height: 600, alt: ilan.baslik }]
      : [{ url: 'https://swaphubs.com/og-image.jpg', width: 1200, height: 630, alt: 'SwapHubs' }];

    const jsonLd = ilan.tip === 'ticari'
      ? {
          '@context': 'https://schema.org',
          '@type':    'Product',
          name:        ilan.baslik,
          description: ilan.formData?.aciklama ?? metaAciklama,
          url:        `https://swaphubs.com/ilan/${params.id}`,
          image:       ilan.resimUrl ?? 'https://swaphubs.com/og-image.jpg',
          offers: {
            '@type':         'Offer',
            priceCurrency:    birim === '₺' ? 'TRY' : birim === 'USD' ? 'USD' : 'EUR',
            price:            ilan.butceMin ?? 0,
            priceValidUntil:  new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
            availability:     'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'SwapHubs', url: 'https://swaphubs.com' },
          },
          additionalProperty: (ilan.ozellikler ?? []).map((o: string) => ({
            '@type': 'PropertyValue', name: o,
          })),
        }
      : {
          '@context': 'https://schema.org',
          '@type':    'Service',
          name:        ilan.baslik,
          description: ilan.formData?.aciklama ?? metaAciklama,
          url:        `https://swaphubs.com/ilan/${params.id}`,
          image:       ilan.resimUrl ?? 'https://swaphubs.com/og-image.jpg',
          areaServed:  { '@type': 'Place', name: sehir },
          offers:      { '@type': 'Offer', price: ilan.butceMin ?? 0, priceCurrency: 'TRY' },
          provider:    { '@type': 'Organization', name: 'SwapHubs', url: 'https://swaphubs.com' },
        };

    return {
      title,
      description:  metaAciklama.slice(0, 160),
      keywords:     seoKelimeler,
      authors:      [{ name: 'SwapHubs', url: 'https://swaphubs.com' }],
      robots: {
        index: true, follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
      },
      openGraph: {
        type: 'website', locale: 'tr_TR',
        url:  `https://swaphubs.com/ilan/${params.id}`,
        siteName: 'SwapHubs', title,
        description: metaAciklama.slice(0, 160),
        images: ogImage,
      },
      twitter: {
        card: 'summary_large_image', title,
        description: metaAciklama.slice(0, 160),
        images: [ogImage[0].url],
      },
      alternates: { canonical: `https://swaphubs.com/ilan/${params.id}` },
      other: { 'script:ld+json': JSON.stringify(jsonLd) },
    };
  } catch {
    return {
      title:       'SwapHubs — Hizmet & Ticaret İlanı',
      description: "Türkiye hizmet ve ticaret platformu SwapHubs'da ilan görüntüleyin.",
    };
  }
}

export default function IlanDetaySayfa({ params }: { params: { id: string } }) {
  return <IlanDetaySayfaClient id={params.id} />;
}
