// ============================================================
// SwapHubs — app/terzi/antalya/[ilce]/page.tsx
// Antalya'nın 19 ilçesi için terzi sayfaları.
// ============================================================
import type { Metadata } from 'next';
import FaqBlock from '@/components/FaqBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import { notFound } from 'next/navigation';
import { ANTALYA_ILCELERI } from '@/lib/turkiye-lokasyonlar';
import { getDb } from '@/lib/mongodb';
import BolgeSayfasi from '@/components/terzi/BolgeSayfasi';

const HOME_URL = 'https://swaphubs.com';
const SEKTOR_ID = 'terzi-kuru-temizleme';
const YARICAP_KM = 20;

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ ilce: string }>;
}

export async function generateStaticParams() {
  return ANTALYA_ILCELERI.map(i => ({ ilce: i.slug }));
}

function bul(slug: string) {
  return ANTALYA_ILCELERI.find(i => i.slug === slug);
}

async function aktifTalepSayisiGetir(lat: number, lng: number): Promise<number> {
  try {
    const db = await getDb();
    const yaricapRadyan = YARICAP_KM / 6378.1;
    return await db.collection('ilanlar').countDocuments({
      sektorId: SEKTOR_ID,
      durum: 'aktif',
      teklifeAcik: true,
      location: { $geoWithin: {$centerSphere: [[lng, lat], yaricapRadyan] } },
    });
  } catch (e) {
    console.error('[ilçe talep sayısı hatası]', e);
    return 0;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const ilce = bul(resolvedParams.ilce);
  if (!ilce) return {};

  const title = `${ilce.ad} Terzi — Paça Kısaltma, Tadilat, Özel Dikim 2026 | Terzi Can`;
  const desc = `${ilce.ad} bölgesine hizmet veren Terzi Can: paça kısaltma, fermuar değişimi, bel daraltma, özel dikim, kuru temizleme. Yerinde ölçü alma, aynı gün teslim. Ücretsiz online teklif al.`;
  const url = `${HOME_URL}/terzi/antalya/${ilce.slug}`;

  return {
    title: { absolute: title },
    description: desc,
    keywords: [
      `${ilce.ad} terzi`, `${ilce.ad} terzi Antalya`, `${ilce.ad} paça kısaltma`, `${ilce.ad} kuru temizleme`,
      `${ilce.ad} dikim atölyesi`, `${ilce.ad} tadilat`, `${ilce.ad} özel dikim`, `${ilce.ad} fermuar değişimi`,
      `${ilce.ad} bel daraltma`, `${ilce.ad} elbise dikimi`, `${ilce.ad} yakınımda terzi`, `${ilce.ad} en yakın terzi`,
      `${ilce.ad} eve gelen terzi`, `${ilce.ad} terzi telefon numarası`, `${ilce.ad} aynı gün terzi`,
      'Antalya terzi', 'Antalya kuru temizleme', 'Antalya dikim atölyesi',
    ],
    alternates: { canonical: url },
    openGraph: { 
      title, 
      description: desc, 
      url, 
      siteName: 'Terzi Can Antalya', 
      locale: 'tr_TR', 
      type: 'website' 
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
    },
  };
}

export default async function AntalyaIlceTerziSayfasi({ params }: PageProps) {
  const resolvedParams = await params;
  const ilce = bul(resolvedParams.ilce);
  if (!ilce) notFound();

  const url = `${HOME_URL}/terzi/antalya/${ilce.slug}`;
  const aktifTalepSayisi = await aktifTalepSayisiGetir(ilce.lat, ilce.lng);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Terzi Can - ${ilce.ad} Bölge Servisi`,
    telephone: '+905318986418',
    url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ilce.ad,
      addressRegion: 'Antalya',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ilce.lat,
      longitude: ilce.lng,
    },
    areaServed: { '@type': 'AdministrativeArea', name: ilce.ad },
    priceRange: '₺₺',
  };

  const komsular = ANTALYA_ILCELERI.filter(i => i.slug !== ilce.slug).slice(0, 10);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SpeakableSchema path={`/terzi/antalya/${ilce.slug}`} />
      <QuickActionBanner lang="tr" />
      <BolgeSayfasi
        tip="antalya-ilce"
        lokasyonAdi={ilce.ad}
        url={url}
        komsuLokasyonlar={komsular}
        komsuHref={(slug) => `/terzi/antalya/${slug}`}
        aktifTalepSayisi={aktifTalepSayisi}
      />
      <FaqBlock
        heading={`${ilce.ad} Terzi — Sık Sorulan Sorular`}
        items={[
          { q: `${ilce.ad} bölgesinde terzi var mı?`, a: `Evet. Terzi Can, Konyaaltı'ndaki atölyesinden ${ilce.ad} bölgesine hizmet verir: adresten alır veya yerinde ölçü alır, adrese teslim eder. WhatsApp: +90 531 898 64 18, her gün 08:00–23:00.` },
          { q: `Paça kısaltma ve fermuar değişimi ne kadar?`, a: `Paça kısaltma ₺150'den, fermuar değişimi ₺200'den başlar. Kesin fiyat için kıyafetin fotoğrafını WhatsApp'tan göndermeniz yeterli.` },
          { q: `Terzi servisi ücretli mi?`, a: `Eve ve otele terzi servisi ücretsizdir. Ölçü alma ve teslimat için ek servis ücreti alınmaz.` },
          { q: `Çalışma saatleriniz nedir?`, a: `Haftanın her günü, hafta sonu dahil 08:00–23:00 arası hizmet veriyoruz.` },
        ]}
      />
    </>
  );
}
