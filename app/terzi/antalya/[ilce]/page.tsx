// ============================================================
// SwapHubs — app/terzi/antalya/[ilce]/page.tsx
// Antalya'nın 19 ilçesi için otomatik üretilen terzi sayfaları.
// ============================================================
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ANTALYA_ILCELERI } from '@/lib/turkiye-lokasyonlar';
import BolgeSayfasi from '@/components/terzi/BolgeSayfasi';

const HOME_URL = 'https://swaphubs.com';

export async function generateStaticParams() {
  return ANTALYA_ILCELERI.map(i => ({ ilce: i.slug }));
}

function bul(slug: string) {
  return ANTALYA_ILCELERI.find(i => i.slug === slug);
}

export async function generateMetadata({ params }: { params: { ilce: string } }): Promise<Metadata> {
  const ilce = bul(params.ilce);
  if (!ilce) return {};

  const title = `${ilce.ad} Terzi — Paça Kısaltma, Tadilat, Özel Dikim 2026 | Terzi Can`;
  const desc = `${ilce.ad} bölgesine hizmet veren Terzi Can: paça kısaltma, fermuar değişimi, bel daraltma, özel dikim, kuru temizleme. Yerinde ölçü alma, aynı gün teslim. Ücretsiz online teklif al.`;
  const url = `${HOME_URL}/terzi/antalya/${ilce.slug}`;

  return {
    title, description: desc,
    keywords: [
      `${ilce.ad} terzi`, `${ilce.ad} terzi Antalya`, `${ilce.ad} paça kısaltma`, `${ilce.ad} kuru temizleme`,
      `${ilce.ad} dikim atölyesi`, `${ilce.ad} tadilat`, `${ilce.ad} özel dikim`, `${ilce.ad} fermuar değişimi`,
      `${ilce.ad} bel daraltma`, `${ilce.ad} elbise dikimi`, `${ilce.ad} yakınımda terzi`, `${ilce.ad} en yakın terzi`,
      `${ilce.ad} eve gelen terzi`, `${ilce.ad} terzi telefon numarası`, `${ilce.ad} aynı gün terzi`,
      'Antalya terzi', 'Antalya kuru temizleme', 'Antalya dikim atölyesi',
    ],
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, siteName: 'SwapHubs', locale: 'tr_TR', type: 'website' },
  };
}

export default function AntalyaIlceTerziSayfasi({ params }: { params: { ilce: string } }) {
  const ilce = bul(params.ilce);
  if (!ilce) notFound();

  const url = `${HOME_URL}/terzi/antalya/${ilce.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Terzilik ve Kuru Temizleme Hizmeti',
    provider: { '@type': 'LocalBusiness', name: 'Terzi Can', url: `${HOME_URL}/terzi`, telephone: '+905318986418' },
    areaServed: { '@type': 'City', name: ilce.ad },
    url,
  };

  const komsular = ANTALYA_ILCELERI.filter(i => i.slug !== ilce.slug).slice(0, 10);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BolgeSayfasi
        tip="antalya-ilce"
        lokasyonAdi={ilce.ad}
        url={url}
        komsuLokasyonlar={komsular}
        komsuHref={(slug) => `/terzi/antalya/${slug}`}
      />
    </>
  );
}
