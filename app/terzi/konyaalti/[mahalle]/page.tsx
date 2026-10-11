// ============================================================
// SwapHubs — app/terzi/konyaalti/[mahalle]/page.tsx
// ============================================================
import type { Metadata } from 'next';
import FaqBlock from '@/components/FaqBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import { notFound } from 'next/navigation';
import { KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar';
import { getDb } from '@/lib/mongodb';
import BolgeSayfasi from '@/components/terzi/BolgeSayfasi';
import { KeywordBlock } from '@/components/terzi/SeoLanding';

const HOME_URL = 'https://swaphubs.com';
const TERZI_URL = `${HOME_URL}/terzi`;
const BUSINESS_ID = `${TERZI_URL}#business`; // ana işletme varlığı (app/terzi/page.tsx)
const PHONE = '+90 531 898 64 18';
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
      location: { $geoWithin: { $centerSphere: [[lng, lat], yaricapRadyan] } },
    });
  } catch (e) {
    console.error('[mahalle talep sayısı hatası]', e);
    return 0;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mahalle } = await params;
  const m = bul(mahalle);
  if (!m) return {};

  const title = `${m.ad} Terzi — Adrese Gelen Terzi Servisi | Terzi Can Antalya`;
  const desc = `${m.ad} (Konyaaltı) bölgesine adrese gelen terzi ve kuru temizleme servisi. ${m.blurb} Paça kısaltma, fermuar değişimi, bel daraltma, ütü. ☎ ${PHONE}`;
  const url = `${TERZI_URL}/konyaalti/${m.slug}`;

  return {
    title: { absolute: title }, // layout'taki "| SwapHubs" şablonu uygulanmasın
    description: desc,
    keywords: [
      `${m.ad} terzi`, `${m.ad} mahallesi terzi`, `${m.ad} kuru temizleme`,
      `${m.ad} paça kısaltma`, `${m.ad} fermuar değişimi`, `${m.ad} eve gelen terzi`,
      'Konyaaltı terzi', 'Antalya terzi',
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: 'Terzi Can Antalya',
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
    },
  };
}

export default async function KonyaaltiMahalleTerziSayfasi({ params }: PageProps) {
  const { mahalle } = await params;
  const m = bul(mahalle);
  if (!m) notFound();

  const url = `${TERZI_URL}/konyaalti/${m.slug}`;
  const aktifTalepSayisi = await aktifTalepSayisiGetir(m.lat, m.lng);

  // Önceki sürümde her mahalle için ayrı "Şube / Servis Noktası" LocalBusiness
  // (sahte adres, sahte koordinat, farklı çalışma saati 08:30–20:00) vardı.
  // Bu, Google'ın sahte şube / doorway sayfası politikasına aykırıdır ve ana
  // işletme varlığını bozar. Yerine: tek işletmeye (#business) bağlı Service +
  // WebPage + Breadcrumb. Mahalle sadece "hizmet verilen bölge" olarak tanımlı.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${m.ad} Terzi — Adrese Gelen Terzi Servisi`,
        inLanguage: 'tr',
        isPartOf: { '@id': `${TERZI_URL}#website` },
        about: { '@id': `${url}#service` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `${m.ad} Adrese Gelen Terzi ve Kuru Temizleme`,
        serviceType: 'Terzilik, tadilat ve kuru temizleme',
        provider: { '@id': BUSINESS_ID },
        areaServed: { '@type': 'Place', name: `${m.ad}, Konyaaltı, Antalya` },
        description: m.blurb,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Terzi Can Antalya', item: TERZI_URL },
          { '@type': 'ListItem', position: 2, name: `${m.ad} Terzi`, item: url },
        ],
      },
    ],
  };

  const komsular = KONYAALTI_MAHALLELERI.filter(x => x.slug !== m.slug).slice(0, 12);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SpeakableSchema path={`/terzi/konyaalti/${m.slug}`} />
      <QuickActionBanner lang="tr" />
      <BolgeSayfasi
        tip="konyaalti-mahalle"
        lokasyonAdi={m.ad}
        url={url}
        komsuLokasyonlar={komsular}
        komsuHref={(slug) => `/terzi/konyaalti/${slug}`}
        aktifTalepSayisi={aktifTalepSayisi}
      />
      <FaqBlock
        heading={`${m.ad} Terzi — Sık Sorulan Sorular`}
        items={[
          { q: `${m.ad} bölgesinde terzi var mı?`, a: `Evet. Terzi Can, Konyaaltı'ndaki atölyesinden ${m.ad} bölgesine hizmet verir: adresten alır veya yerinde ölçü alır, adrese teslim eder. WhatsApp: +90 531 898 64 18, her gün 08:00–23:00.` },
          { q: `Paça kısaltma ve fermuar değişimi ne kadar?`, a: `Paça kısaltma ₺150'den, fermuar değişimi ₺200'den başlar. Kesin fiyat için kıyafetin fotoğrafını WhatsApp'tan göndermeniz yeterli.` },
          { q: `Terzi servisi ücretli mi?`, a: `Eve ve otele terzi servisi ücretsizdir. Ölçü alma ve teslimat için ek servis ücreti alınmaz.` },
          { q: `Çalışma saatleriniz nedir?`, a: `Haftanın her günü, hafta sonu dahil 08:00–23:00 arası hizmet veriyoruz.` },
        ]}
      />
      <KeywordBlock slug={m.slug} />
    </>
  );
}
