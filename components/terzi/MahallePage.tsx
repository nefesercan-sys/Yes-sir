// ============================================================
// SwapHubs — components/terzi/MahallePage.tsx
// /terzi/konyaalti/[mahalle] ve /terzi/muratpasa/[mahalle] için ortak sayfa + metadata.
// Mahalle listesi ve bağlı ilçe: lib/turkiye-lokasyonlar.ts (MAHALLE_ILCE).
// ============================================================
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FaqBlock from '@/components/FaqBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import { MAHALLE_ILCE, type MahalleIlce } from '@/lib/turkiye-lokasyonlar';
import { mahalleMeta } from '@/lib/mahalle-meta';
import { getDb } from '@/lib/mongodb';
import BolgeSayfasi from '@/components/terzi/BolgeSayfasi';
import { KeywordBlock } from '@/components/terzi/SeoLanding';
import { SITE_URL, BUSINESS_ID, PHONE_DISPLAY } from '@/lib/business';
import { jsonLdString } from '@/lib/json-ld';
import { mahalleFaq } from '@/lib/bolge-icerik';

const TERZI_URL = `${SITE_URL}/terzi`;
const SEKTOR_ID = 'terzi-kuru-temizleme';
const YARICAP_KM = 8; // mahalle ölçeğinde dar bir yarıçap

export type MahalleParams = { params: Promise<{ mahalle: string }> };

export const mahalleStaticParams = (ilce: MahalleIlce) => MAHALLE_ILCE[ilce].list.map((m) => ({ mahalle: m.slug }));
const bul = (ilce: MahalleIlce, slug: string) => MAHALLE_ILCE[ilce].list.find((m) => m.slug === slug);
const pathOf = (ilce: MahalleIlce, slug: string) => `/terzi/${ilce}/${slug}`;

async function aktifTalepSayisiGetir(lat?: number, lng?: number): Promise<number> {
  if (typeof lat !== 'number' || typeof lng !== 'number') return 0; // koordinatı doğrulanmamış mahalle: sayım yapılmaz
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

export async function mahalleMetadata(ilce: MahalleIlce, { params }: MahalleParams): Promise<Metadata> {
  const { mahalle } = await params;
  const m = bul(ilce, mahalle);
  if (!m) return {};
  const { title, desc, kw } = mahalleMeta(m.slug, m.ad, PHONE_DISPLAY, MAHALLE_ILCE[ilce].ad);
  const url = `${SITE_URL}${pathOf(ilce, m.slug)}`;
  // Yabancı dil karşılıkları terzihizmeti.com.tr'ye canonical'landığı için hreflang verilmez
  const alternates = { canonical: url };
  return {
    title: { absolute: title },
    description: desc,
    keywords: kw,
    alternates,
    openGraph: { title, description: desc, url, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
    twitter: { card: 'summary_large_image', title, description: desc },
  };
}

export async function MahallePage({ ilce, params }: { ilce: MahalleIlce } & MahalleParams) {
  const { mahalle } = await params;
  const m = bul(ilce, mahalle);
  if (!m) notFound();
  const I = MAHALLE_ILCE[ilce];
  const path = pathOf(ilce, m.slug);
  const url = `${SITE_URL}${path}`;
  const aktifTalepSayisi = await aktifTalepSayisiGetir(m.lat, m.lng);

  // Tek işletmeye (#business) bağlı Service + WebPage + Breadcrumb; mahalle yalnızca "hizmet verilen bölge".
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: `${m.ad} Terzi — ${I.ad}, Antalya`, inLanguage: 'tr', isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${url}#service` }, breadcrumb: { '@id': `${url}#breadcrumb` } },
      { '@type': 'Service', '@id': `${url}#service`, name: `${m.ad} terzi ve tadilat hizmeti`, serviceType: 'Terzilik ve tadilat', provider: { '@id': BUSINESS_ID }, areaServed: { '@type': 'Place', name: `${m.ad}, ${I.ad}, Antalya` }, description: m.blurb },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Terzi Can Antalya', item: TERZI_URL },
        { '@type': 'ListItem', position: 2, name: `${I.ad} terzi`, item: `${SITE_URL}/terzi/antalya/${ilce}` },
        { '@type': 'ListItem', position: 3, name: `${m.ad} Terzi`, item: url },
      ] },
    ],
  };
  const komsular = I.list.filter((x) => x.slug !== m.slug).slice(0, 12);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <SpeakableSchema path={path} />
      <QuickActionBanner lang="tr" />
      <BolgeSayfasi
        tip={ilce === 'konyaalti' ? 'konyaalti-mahalle' : 'muratpasa-mahalle'}
        slug={m.slug}
        lokasyonAdi={m.ad}
        blurb={m.blurb}
        url={url}
        komsuLokasyonlar={komsular}
        komsuHref={(slug) => pathOf(ilce, slug)}
        aktifTalepSayisi={aktifTalepSayisi}
      />
      <FaqBlock heading={`${m.ad} Terzi — Sık Sorulan Sorular`} items={mahalleFaq(m.slug, m.ad, I.ad)} />
      <KeywordBlock slug={m.slug} />
      {['hurma', 'liman', 'sarisu', 'uncali', 'gursu'].includes(m.slug) && (
        <p style={{ maxWidth: 820, margin: '0 auto', padding: '0 1rem 2rem', fontSize: '.9rem' }}>
          <a href={`https://terzihizmeti.com.tr/${m.slug}-terzi`} style={{ textDecoration: 'underline' }}>
            Terzi Can atölyesinin kendi sitesi: {m.ad} terzi
          </a>
        </p>
      )}
    </>
  );
}
