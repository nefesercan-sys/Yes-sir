// ============================================================
// SwapHubs — app/terzi/[il]/page.tsx
// Türkiye'nin 80 ili için otomatik üretilen SwapHubs Terzi
// pazaryeri (online teklif sistemi) sayfaları.
// ============================================================
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TURKIYE_ILLERI } from '@/lib/turkiye-lokasyonlar';
import BolgeSayfasi from '@/components/terzi/BolgeSayfasi';

const HOME_URL = 'https://swaphubs.com';

export async function generateStaticParams() {
  return TURKIYE_ILLERI.map(i => ({ il: i.slug }));
}

function bul(slug: string) {
  return TURKIYE_ILLERI.find(i => i.slug === slug);
}

export async function generateMetadata({ params }: { params: { il: string } }): Promise<Metadata> {
  const il = bul(params.il);
  if (!il) return {};

  const title = `${il.ad} Terzi Bul — Online Teklif Al | SwapHubs Terzi`;
  const desc = `${il.ad}'de terzi mi arıyorsun? Hizmetini ve konumunu gir, ${il.ad}'deki terziler ve kuru temizlemeciler sana fiyat teklifi versin. Ücretsiz, hızlı, WhatsApp'tan iletişim.`;
  const url = `${HOME_URL}/terzi/${il.slug}`;

  return {
    title, description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, siteName: 'SwapHubs', locale: 'tr_TR', type: 'website' },
  };
}

export default function IlTerziSayfasi({ params }: { params: { il: string } }) {
  const il = bul(params.il);
  if (!il) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Terzi ve Kuru Temizleme Pazaryeri',
    provider: { '@type': 'Organization', name: 'SwapHubs', url: HOME_URL },
    areaServed: { '@type': 'AdministrativeArea', name: il.ad },
    url: `${HOME_URL}/terzi/${il.slug}`,
    description: `${il.ad} genelinde terzi ve kuru temizlemecilerden online fiyat teklifi alma platformu.`,
  };

  const digerIlBaslariHaric = TURKIYE_ILLERI.filter(i => i.slug !== il.slug);
  const komsular = digerIlBaslariHaric.sort(() => 0.5 - Math.random()).slice(0, 10);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BolgeSayfasi
        tip="il"
        lokasyonAdi={il.ad}
        komsuLokasyonlar={komsular}
        komsuHref={(slug) => `/terzi/${slug}`}
      />
    </>
  );
}
