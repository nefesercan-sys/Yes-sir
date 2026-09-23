// ============================================================
// SwapHubs — app/terzi/konyaalti/[mahalle]/page.tsx
// ============================================================
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar';
import { getDb } from '@/lib/mongodb';
import BolgeSayfasi from '@/components/terzi/BolgeSayfasi';

const HOME_URL = 'https://swaphubs.com';
const SEKTOR_ID = 'terzi-kuru-temizleme';
const YARICAP_KM = 8; // mahalle ölçeğinde dar bir yarıçap

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ mahalle: string }>;
}

export async function generateStaticParams() {
  return KONYAALTI_MAHALLELERI.map(m => ({ mahalle: m.slug }));
}

function bul(slug: string) {
  return KONYAALTI_MAHALLELERI.find(m => m.slug === slug);
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
    console.error('[mahalle talep sayısı hatası]', e);
    return 0;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const m = bul(resolvedParams.mahalle);
  if (!m) return {};

  const title = `${m.ad} Terzi — Adrese Gelen Terzi Servisi, Konyaaltı | Terzi Can`;
  const desc = `${m.ad} (Konyaaltı) bölgesine adrese gelen terzi ve kuru temizleme servisi. ${m.blurb} Paça kısaltma, fermuar değişimi, bel daraltma, ütü. ☎ +90 531 898 64 18`;
  const url = `${HOME_URL}/terzi/konyaalti/${m.slug}`;

  return {
    title, 
    description: desc,
    keywords: [
      `${m.ad} terzi`, `${m.ad} mahallesi terzi`, `${m.ad} Konyaaltı terzi`, `${m.ad} kuru temizleme`,
      `${m.ad} paça kısaltma`, `${m.ad} fermuar değişimi`, `${m.ad} eve gelen terzi`,
      `${m.ad} yakınımda terzi`, `${m.ad} en yakın terzi`, `${m.ad} terzi telefon numarası`,
      'Konyaaltı terzi', 'Antalya terzi', 'Adrese gelen terzi Konyaaltı',
    ],
    alternates: { canonical: url },
    openGraph: { 
      title, 
      description: desc, 
      url, 
      siteName: 'SwapHubs', 
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

export default async function KonyaaltiMahalleTerziSayfasi({ params }: PageProps) {
  const resolvedParams = await params;
  const m = bul(resolvedParams.mahalle);
  if (!m) notFound();

  const url = `${HOME_URL}/terzi/konyaalti/${m.slug}`;
  const aktifTalepSayisi = await aktifTalepSayisiGetir(m.lat, m.lng);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Terzi Can - ' + m.ad + ' Şubesi / Servis Noktası',
    image: `${HOME_URL}/images/terzi-can-logo.jpg`,
    telephone: '+905318986418',
    url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: m.ad,
      addressLocality: 'Konyaaltı',
      addressRegion: 'Antalya',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: m.lat,
      longitude: m.lng,
    },
    areaServed: { '@type': 'Place', name: `${m.ad}, Konyaaltı, Antalya` },
    priceRange: '₺₺',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:30',
      closes: '20:00',
    },
  };

  // Komşu mahalleleri performans ve UI kalabalığı için sınırlayalım veya coğrafi yakınlığa göre alalım
  const komsular = KONYAALTI_MAHALLELERI.filter(x => x.slug !== m.slug).slice(0, 12);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BolgeSayfasi
        tip="konyaalti-mahalle"
        lokasyonAdi={m.ad}
        url={url}
        komsuLokasyonlar={komsular}
        komsuHref={(slug) => `/terzi/konyaalti/${slug}`}
        aktifTalepSayisi={aktifTalepSayisi}
      />
    </>
  );
}
