// ============================================================
// SwapHubs — app/terzi/antalya/[ilce]/page.tsx
// Antalya'da hizmet verilen bölgelerin Türkçe terzi sayfaları (liste: lib/turkiye-lokasyonlar.ts ANTALYA_ILCELERI).
// Tüm bölgeler aramaya açıktır (sahibin kararı: terzi sayfaları noindex yapılmaz).
// ============================================================
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findDistrict, byPriority } from '@/lib/seo-data';
import { isFar, farDesc, farNote } from '@/lib/uzak-bolge';
import { trAreaJobsDesc } from '@/lib/kw-desc';
import FaqBlock from '@/components/FaqBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import { ANTALYA_ILCELERI } from '@/lib/turkiye-lokasyonlar';
import BolgeSayfasi from '@/components/terzi/BolgeSayfasi';
import { KeywordBlock, trDistrictAlternates } from '@/components/terzi/SeoLanding';
import { SITE_URL, BUSINESS_ID, PHONE_DISPLAY, isFreeService } from '@/lib/business';
import { jsonLdString } from '@/lib/json-ld';
import { districtFaqItems, withEkSss, trLoc } from '@/lib/bolge-icerik';
import TerziHizmetleriBolumu from '@/components/TerziHizmetleriBolumu';


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


function meta(slug: string, ad: string) {
  const d = findDistrict(slug);
  const loc = d?.loc.tr ?? trLoc(ad);
  const resort = d?.kind === 'resort';
  // Sahip kalıbı (26 Kasım 2026): "Lara Terzi Çağır · Kıyafet Dikimi, Tamiri, Tadilatı"
  const t0 = `${ad} Terzi Çağır · Kıyafet Dikimi, Tamiri, Tadilatı`;
  const title = t0.length <= 60 ? t0 : `${ad} Terzi Çağır · Dikim, Tamir, Tadilat`;
  const svc = isFreeService(slug) ? 'Otele ve eve servis.' : resort ? 'Otele servis.' : 'Otellere servis.';
  const desc = isFar(slug) ? farDesc('tr', ad) : trAreaJobsDesc(loc, title, 'b', `${loc} terzi: paça ₺200'den, fermuar ₺300'den; normal tadilat aynı gün, acil 1–2 saat. ${svc}`);
  return { title, desc, loc, resort };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ilce: slug } = await params;
  const ilce = bul(slug);
  if (!ilce) return {};
  const { title, desc } = meta(ilce.slug, ilce.ad);
  const url = `${SITE_URL}/terzi/antalya/${ilce.slug}`;
  return {
    title: { absolute: title },
    description: desc,
    keywords: [
      `${ilce.ad} terzi`, `${ilce.ad} terzi Antalya`, `${ilce.ad} paça kısaltma`, `${ilce.ad} tadilat`,
      `${ilce.ad} özel dikim`, `${ilce.ad} fermuar değişimi`, `${ilce.ad} bel daraltma`, `${ilce.ad} elbise dikimi`,
      `${ilce.ad} otele gelen terzi`, `${ilce.ad} acil terzi`, 'Antalya terzi', 'acil terzi Antalya',
    ],
    // Kendi adresinde canonical; EN/RU/DE bölge sayfaları bu adresi tr karşılığı olarak gösterdiğinden hreflang kümesi karşılıklı verilir
    alternates: trDistrictAlternates(ilce.slug, url),
    openGraph: { title, description: desc, url, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
    twitter: { card: 'summary_large_image', title, description: desc },
  };
}

export default async function AntalyaIlceTerziSayfasi({ params }: PageProps) {
  const { ilce: slug } = await params;
  const ilce = bul(slug);
  if (!ilce) notFound();

  const url = `${SITE_URL}/terzi/antalya/${ilce.slug}`;
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

  const komsular = byPriority(ANTALYA_ILCELERI.filter(i => i.slug !== ilce.slug)).slice(0, 10);
  const faq = withEkSss(districtFaqItems({ lang: 'tr', slug: ilce.slug, n: ilce.ad, loc, resort, focus: [] }), ilce.slug, ilce.ad, loc);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <SpeakableSchema path={`/terzi/antalya/${ilce.slug}`} />
      <QuickActionBanner lang="tr" />
      {isFar(ilce.slug) && (
        <p role="note" style={{ maxWidth: 820, margin: '1rem auto', padding: '.9rem 1.1rem', borderRadius: 12, background: '#fff7e6', color: '#5a3b00', fontSize: '.98rem', lineHeight: 1.6 }}>
          {farNote('tr', ilce.ad)}
        </p>
      )}
      <BolgeSayfasi
        tip="antalya-ilce"
        slug={ilce.slug}
        lokasyonAdi={ilce.ad}
        url={url}
        komsuLokasyonlar={komsular}
        komsuHref={(s) => `/terzi/antalya/${s}`}
      />
      {!isFar(ilce.slug) && <TerziHizmetleriBolumu lang="tr" />}
      <FaqBlock heading={`${ilce.ad} Terzi — Sık Sorulan Sorular`} items={faq} />
      <KeywordBlock slug={ilce.slug} />
    </>
  );
}
