// ============================================================
// SwapHubs — app/terzi/[il]/page.tsx
// Türkiye'nin 80 ili için SwapHubs Terzi pazaryeri sayfaları.
//
// DÜZELTME (2026-09): Bu sayfalar önceden sadece şehir adını
// değiştirip aynı şablon metni tekrarlıyordu (80 neredeyse birebir
// aynı sayfa) — Google'ın ince/tekrar içerik olarak değerlendirip
// otoriteyi bölme riski taşıyordu. Şimdi her sayfa, MongoDB'deki
// gerçek 'ilanlar' koleksiyonundan o şehrin ~60km çevresindeki
// GERÇEK aktif talep sayısını canlı olarak çekip gösteriyor —
// uydurma istatistik yerine, her şehir için gerçekten farklı ve
// güncel bir veri noktası.
// ============================================================
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TURKIYE_ILLERI } from '@/lib/turkiye-lokasyonlar';
import { getDb } from '@/lib/mongodb';
import BolgeSayfasi from '@/components/terzi/BolgeSayfasi';

const HOME_URL = 'https://swaphubs.com';
const SEKTOR_ID = 'terzi-kuru-temizleme';
const YARICAP_KM = 60;

// Sayfa saatte bir yeniden üretilir (ISR) — talep sayısı güncel kalır,
// ama her istek için canlı DB sorgusu yapılmaz.
export const revalidate = 3600;

export async function generateStaticParams() {
  return TURKIYE_ILLERI.map(i => ({ il: i.slug }));
}

function bul(slug: string) {
  return TURKIYE_ILLERI.find(i => i.slug === slug);
}

// İlin ~60km çevresindeki gerçek aktif talep sayısını sayar.
async function aktifTalepSayisiGetir(lat: number, lng: number): Promise<number> {
  try {
    const db = await getDb();
    const yaricapRadyan = YARICAP_KM / 6378.1; // km -> radyan (Dünya yarıçapı ~6378.1km)
    return await db.collection('ilanlar').countDocuments({
      sektorId: SEKTOR_ID,
      durum: 'aktif',
      teklifeAcik: true,
      location: {
        $geoWithin: { $centerSphere: [[lng, lat], yaricapRadyan] },
      },
    });
  } catch (e) {
    console.error('[il talep sayısı]', e);
    return 0;
  }
}

export async function generateMetadata({ params }: { params: { il: string } }): Promise<Metadata> {
  const il = bul(params.il);
  if (!il) return {};

  const title = `${il.ad} Terzi Bul — Online Teklif Al | SwapHubs Terzi`;
  const desc = `${il.ad}'de terzi mi arıyorsun? Hizmetini ve konumunu gir, ${il.ad}'deki terziler ve kuru temizlemeciler sana fiyat teklifi versin. Ücretsiz, hızlı, WhatsApp'tan iletişim.`;
  const url = `${HOME_URL}/terzi/${il.slug}`;

  return {
    title, description: desc,
    keywords: [
      `${il.ad} terzi`, `${il.ad} terzi bul`, `${il.ad} kuru temizleme`, `${il.ad} dikim atölyesi`,
      `${il.ad} tadilat`, `${il.ad} özel dikim`, `${il.ad} paça kısaltma`, `${il.ad} yakınımda terzi`,
      `${il.ad} en yakın terzi`, `${il.ad} terzi telefon numarası`, `${il.ad} terzi fiyatları`,
      'terzi bul', 'online terzi teklifi', 'yakınımda terzi', 'en yakın terzi ve kuru temizleme',
    ],
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, siteName: 'SwapHubs', locale: 'tr_TR', type: 'website' },
  };
}

export default async function IlTerziSayfasi({ params }: { params: { il: string } }) {
  const il = bul(params.il);
  if (!il) notFound();

  const url = `${HOME_URL}/terzi/${il.slug}`;
  const aktifTalepSayisi = await aktifTalepSayisiGetir(il.lat, il.lng);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Terzi ve Kuru Temizleme Pazaryeri',
    provider: { '@type': 'Organization', name: 'SwapHubs', url: HOME_URL },
    areaServed: { '@type': 'AdministrativeArea', name: il.ad },
    url,
    description: `${il.ad} genelinde terzi ve kuru temizlemecilerden online fiyat teklifi alma platformu.`,
  };

  // Komşu il listesi artık deterministik (slug'a göre sıralı, sabit bir alt
  // küme) — önceki Math.random() her istekte/derlemede farklı bir sonuç
  // üretip iç link yapısını gereksiz yere değiştiriyordu.
  const digerIller = TURKIYE_ILLERI.filter(i => i.slug !== il.slug);
  const baslangicIndex = TURKIYE_ILLERI.findIndex(i => i.slug === il.slug);
  const komsular = Array.from({ length: 10 }, (_, i) => digerIller[(baslangicIndex + i) % digerIller.length]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BolgeSayfasi
        tip="il"
        lokasyonAdi={il.ad}
        url={url}
        komsuLokasyonlar={komsular}
        komsuHref={(slug) => `/terzi/${slug}`}
        aktifTalepSayisi={aktifTalepSayisi}
      />
    </>
  );
}
