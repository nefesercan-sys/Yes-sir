// ============================================================
// SwapHubs — app/terzi/antalya/[ilce]/page.tsx
// Antalya'da hizmet verilen bölgelerin Türkçe terzi sayfaları (liste: lib/turkiye-lokasyonlar.ts ANTALYA_ILCELERI).
// Tüm bölgeler aramaya açıktır (sahibin kararı: terzi sayfaları noindex yapılmaz).
// ============================================================
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findDistrict, districtUrl, abs, LANGS } from '@/lib/seo-data';
import FaqBlock from '@/components/FaqBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import { ANTALYA_ILCELERI } from '@/lib/turkiye-lokasyonlar';
import { getDb } from '@/lib/mongodb';
import BolgeSayfasi from '@/components/terzi/BolgeSayfasi';
import { KeywordBlock } from '@/components/terzi/SeoLanding';
import { SITE_URL, BUSINESS_ID, PHONE_DISPLAY, isFreeService } from '@/lib/business';
import { jsonLdString } from '@/lib/json-ld';
import { districtFaqItems, trLoc, pick } from '@/lib/bolge-icerik';

const SEKTOR_ID = 'terzi-kuru-temizleme';
const YARICAP_KM = 20;

export const revalidate = 3600;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ ilce: string }>;
}

export async function generateStaticParams() {
  return ANTALYA_ILCELERI.map(i => ({ ilce: i.slug }));
}

function bul(slug: string) {
  return ANTALYA_ILCELERI.find(i => i.slug === slug);
}

async function aktifTalepSayisiGetir(lat?: number, lng?: number): Promise<number> {
  if (typeof lat !== 'number' || typeof lng !== 'number') return 0;
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
    console.error('[ilçe talep sayısı hatası]', e);
    return 0;
  }
}

function meta(slug: string, ad: string) {
  const d = findDistrict(slug);
  const loc = d?.loc.tr ?? trLoc(ad);
  const resort = d?.kind === 'resort';
  const title = pick(`t:${slug}`, [
    `${ad} Terzi · Paça, Fermuar, Tadilat | Terzi Can`,
    `${ad} Terzi: Tamir, Tadilat, Özel Dikim | Terzi Can`,
    `${ad} Terzi Çağır · Fotoğrafla Fiyat | Terzi Can`,
  ]);
  const svc = isFreeService(slug) ? 'Otele ve eve ücretsiz servis.' : resort ? 'Otele ücretsiz servis.' : 'Otellere servis ücretsiz.';
  const desc = `${loc} terzi: paça ₺200'den, fermuar ₺300'den; normal tadilat ertesi gün, acil 1–2 saat. ${svc} ☎ ${PHONE_DISPLAY}`;
  return { title, desc, loc, resort };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ilce: slug } = await params;
  const ilce = bul(slug);
  if (!ilce) return {};
  const { title, desc } = meta(ilce.slug, ilce.ad);
  const url = `${SITE_URL}/terzi/antalya/${ilce.slug}`;
  const d = findDistrict(ilce.slug);
  return {
    title: { absolute: title },
    description: desc,
    keywords: [
      `${ilce.ad} terzi`, `${ilce.ad} terzi Antalya`, `${ilce.ad} paça kısaltma`, `${ilce.ad} tadilat`,
      `${ilce.ad} özel dikim`, `${ilce.ad} fermuar değişimi`, `${ilce.ad} bel daraltma`, `${ilce.ad} elbise dikimi`,
      `${ilce.ad} otele gelen terzi`, `${ilce.ad} acil terzi`, 'Antalya terzi', 'acil terzi Antalya',
    ],
    alternates: !d || abs(districtUrl('tr', d)) !== url
      ? { canonical: url }
      : { canonical: url, languages: { ...Object.fromEntries(LANGS.map((l) => [l, abs(districtUrl(l, d))])), 'x-default': url } },
    openGraph: { title, description: desc, url, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
    twitter: { card: 'summary_large_image', title, description: desc },
  };
}

export default async function AntalyaIlceTerziSayfasi({ params }: PageProps) {
  const { ilce: slug } = await params;
  const ilce = bul(slug);
  if (!ilce) notFound();

  const url = `${SITE_URL}/terzi/antalya/${ilce.slug}`;
  const aktifTalepSayisi = await aktifTalepSayisiGetir(ilce.lat, ilce.lng);
  const { loc, resort } = meta(ilce.slug, ilce.ad);

  // Bölge için ayrı bir "şube" LocalBusiness'ı basılmaz (sahte şube/doorway riski): tek işletmeye bağlı Service.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: `${ilce.ad} Terzi`, inLanguage: 'tr', isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${url}#service` } },
      { '@type': 'Service', '@id': `${url}#service`, name: `${ilce.ad} terzi ve tadilat hizmeti`, serviceType: 'Terzilik ve tadilat', provider: { '@id': BUSINESS_ID }, areaServed: { '@type': 'Place', name: `${ilce.ad}, Antalya` } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: `${SITE_URL}/terzi` },
        { '@type': 'ListItem', position: 2, name: `${ilce.ad} Terzi`, item: url },
      ] },
    ],
  };

  const komsular = ANTALYA_ILCELERI.filter(i => i.slug !== ilce.slug).slice(0, 10);
  const faq = districtFaqItems({ lang: 'tr', slug: ilce.slug, n: ilce.ad, loc, resort, focus: [] }).map(([q, a]) => ({ q, a }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <SpeakableSchema path={`/terzi/antalya/${ilce.slug}`} />
      <QuickActionBanner lang="tr" />
      <BolgeSayfasi
        tip="antalya-ilce"
        slug={ilce.slug}
        lokasyonAdi={ilce.ad}
        url={url}
        komsuLokasyonlar={komsular}
        komsuHref={(s) => `/terzi/antalya/${s}`}
        aktifTalepSayisi={aktifTalepSayisi}
      />
      <FaqBlock heading={`${ilce.ad} Terzi — Sık Sorulan Sorular`} items={faq} />
      <KeywordBlock slug={ilce.slug} />
    </>
  );
}
