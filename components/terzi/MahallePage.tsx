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
import BolgeSayfasi from '@/components/terzi/BolgeSayfasi';
import { KeywordBlock, trDistrictAlternates } from '@/components/terzi/SeoLanding';
import { SITE_URL, BUSINESS_ID, PHONE_DISPLAY } from '@/lib/business';
import { jsonLdString } from '@/lib/json-ld';
import ReviewsBlock from '@/components/ReviewsBlock';
import { mahalleFaq, trLoc } from '@/lib/bolge-icerik';
import { trAreaJobsDesc } from '@/lib/kw-desc';
import TerziHizmetleriBolumu from '@/components/TerziHizmetleriBolumu';

const TERZI_URL = `${SITE_URL}/terzi`;

export type MahalleParams = { params: Promise<{ mahalle: string }> };

export const mahalleStaticParams = (ilce: MahalleIlce) => MAHALLE_ILCE[ilce].list.map((m) => ({ mahalle: m.slug }));
const bul = (ilce: MahalleIlce, slug: string) => MAHALLE_ILCE[ilce].list.find((m) => m.slug === slug);
const pathOf = (ilce: MahalleIlce, slug: string) => `/terzi/${ilce}/${slug}`;


export async function mahalleMetadata(ilce: MahalleIlce, { params }: MahalleParams): Promise<Metadata> {
  const { mahalle } = await params;
  const m = bul(ilce, mahalle);
  if (!m) return {};
  const { title, desc: desc0, kw } = mahalleMeta(m.slug, m.ad, PHONE_DISPLAY, MAHALLE_ILCE[ilce].ad);
  const desc = trAreaJobsDesc(trLoc(m.ad), title, 'b', desc0); // başlıktaki işler açıklamada da (lib/kw-desc.ts)
  const url = `${SITE_URL}${pathOf(ilce, m.slug)}`;
  // Kendi adresinde canonical; EN/RU/DE bölge sayfaları bu adresi tr karşılığı olarak gösterdiğinden hreflang kümesi karşılıklı verilir
  const alternates = trDistrictAlternates(m.slug, url);
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
      />
      <TerziHizmetleriBolumu lang="tr" />
      <FaqBlock heading={`${m.ad} Terzi — Sık Sorulan Sorular`} items={mahalleFaq(m.slug, m.ad, I.ad)} />
      <KeywordBlock slug={m.slug} />
      <ReviewsBlock lang="tr" schema />
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
