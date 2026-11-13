import type { Metadata } from 'next';
import { fitDesc, withAsk } from '@/lib/meta-fit';
import { notFound } from 'next/navigation';
import IntlLanding, { OG_DEFAULT } from '@/components/terzi/IntlLanding';
import ZoneLanding from '@/components/terzi/ZoneLanding';
import SvcGuideLanding from '@/components/terzi/SvcGuideLanding';
import OnlineGuideLanding from '@/components/terzi/OnlineGuideLanding';
import OlcuGuideLanding, { olcuMetadata } from '@/components/terzi/OlcuGuideLanding';
import { OLCU } from '@/lib/intl-olcu';
import OzelDikimLanding from '@/components/terzi/OzelDikimLanding';
import { OZEL_PATH, parseOzel } from '@/lib/ozel-dikim';
import { ozelMetadata } from '@/lib/ozel-meta';
import { ONL, onlineUrl, onlineLanguages, parseOnline } from '@/lib/intl-online';
import KonuGuideLanding from '@/components/terzi/KonuGuideLanding';
import { HZ, HZ_IDS, parseHz, hzUrl, hzLanguages } from '@/lib/intl-hz';
import { KONU, KONU_IDS, parseKonu, konuUrl, konuLanguages } from '@/lib/intl-konu';
import PromoGuideLanding from '@/components/terzi/PromoGuideLanding';
import { SVCG, svcgUrl, parseSvcg } from '@/lib/intl-svc';
import { PROMO, PROMO_ALL, promoUrl, parsePromo } from '@/lib/intl-promo';
import { BASE } from '@/lib/tekstil-sayfalari';
import { ILANGS, INTL, SLUG, iUrl, isILang } from '@/lib/intl';
import { ZCOPY, ZONE_SLUGS, parseZone, zoneData, zoneSlug, zoneUrl } from '@/lib/intl-zones';
import { SITE } from '@/lib/seo-data';
import { zoneSeoTitles } from '@/lib/bolge-hizmet-matrisi-turist';

// Yalnızca tanımlı rehber ve otel bölgesi sayfaları üretilir; diğer iki-segmentli yollar 404 olur.
export const dynamicParams = false;
export function generateStaticParams() {
  return ILANGS.flatMap((lang) => [
    { lang, slug: SLUG[lang] },
    { lang, slug: SVCG[lang].slug },
    { lang, slug: ONL[lang].slug },
    { lang, slug: OLCU[lang].slug },
    { lang, slug: PROMO[lang].slug },
    { lang, slug: OZEL_PATH[lang].split('/')[2] },
    ...KONU_IDS.map((t) => ({ lang, slug: KONU[lang][t].slug })),
    ...HZ_IDS.map((h) => ({ lang, slug: HZ[lang][h].slug })),
    ...ZONE_SLUGS.map((z) => ({ lang, slug: zoneSlug(lang, z) })),
  ]);
}

type P = { params: Promise<{ lang: string; slug: string }> };

const robots = { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 } };

const FOUR_ZONE = ['belek', 'lara', 'guzeloba', 'side', 'kemer', 'kundu', 'muratpasa', 'goynuk'];
/** Bölge/otel ana sayfası hreflang kümesi: 6 dil + (varsa) EN/RU/DE (+ ana sayfada TR) karşılıkları. */
function zoneLanguages(zone: (typeof ZONE_SLUGS)[number]): Record<string, string> {
  const six = Object.fromEntries(ILANGS.map((l) => [INTL[l].hreflang, `${SITE}${zoneUrl(l, zone)}`]));
  if (zone === 'antalya') {
    const tr = `${SITE}/terzi/eve-gelen-terzi-antalya`;
    return { tr, en: `${SITE}/en/hotel-tailor-antalya`, ru: `${SITE}/ru/vyezdnoy-portnoy-antalya`, de: `${SITE}/de/schneider-service-hotel-antalya`, ...six, 'x-default': tr };
  }
  if (FOUR_ZONE.includes(zone)) {
    const en = `${SITE}/en/hotel-tailor-antalya/${zone}`;
    return { en, ru: `${SITE}/ru/vyezdnoy-portnoy-antalya/${zone}`, de: `${SITE}/de/schneider-service-hotel-antalya/${zone}`, ...six, 'x-default': en };
  }
  return six;
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isILang(lang)) return {};

  if (slug === SLUG[lang]) {
    const c = INTL[lang];
    const url = `${SITE}${iUrl(lang)}`;
    return {
      metadataBase: new URL(SITE),
      title: { absolute: c.title },
      description: fitDesc(withAsk(c.desc, lang), 158, lang),
      keywords: c.keywords,
      robots,
      alternates: { canonical: url, languages: Object.fromEntries(ILANGS.map((l) => [INTL[l].hreflang, `${SITE}${iUrl(l)}`])) },
      openGraph: { title: c.title, description: fitDesc(withAsk(c.desc, lang), 158, lang), url, siteName: 'Terzi Can', locale: c.locale, type: 'article', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: c.h1 }] },
      twitter: { card: 'summary_large_image', title: c.title, description: fitDesc(withAsk(c.desc, lang), 158, lang), images: [OG_DEFAULT] },
    };
  }

  if (parseSvcg(lang, slug)) {
    const sc = SVCG[lang];
    const surl = `${SITE}${svcgUrl(lang)}`;
    return {
      metadataBase: new URL(SITE),
      title: { absolute: sc.title },
      description: fitDesc(withAsk(sc.desc, lang), 158, lang),
      robots,
      alternates: { canonical: surl, languages: Object.fromEntries(ILANGS.map((l) => [INTL[l].hreflang, `${SITE}${svcgUrl(l)}`])) },
      openGraph: { title: sc.title, description: fitDesc(withAsk(sc.desc, lang), 158, lang), url: surl, siteName: 'Terzi Can', locale: INTL[lang].locale, type: 'article', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: sc.title }] },
      twitter: { card: 'summary_large_image', title: sc.title, description: fitDesc(withAsk(sc.desc, lang), 158, lang), images: [OG_DEFAULT] },
    };
  }

  if (OLCU[lang].slug === slug) return olcuMetadata(lang);
  if (parseOzel(lang, slug)) return ozelMetadata(lang);

  if (parseOnline(lang, slug)) {
    const oc = ONL[lang];
    const ourl = `${SITE}${onlineUrl(lang)}`;
    return {
      metadataBase: new URL(SITE),
      title: { absolute: oc.title },
      description: fitDesc(withAsk(oc.desc, lang), 158, lang),
      robots,
      alternates: { canonical: ourl, languages: onlineLanguages(SITE) },
      openGraph: { title: oc.title, description: fitDesc(withAsk(oc.desc, lang), 158, lang), url: ourl, siteName: 'Terzi Can', locale: INTL[lang].locale, type: 'website', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: oc.title }] },
      twitter: { card: 'summary_large_image', title: oc.title, description: fitDesc(withAsk(oc.desc, lang), 158, lang), images: [OG_DEFAULT] },
    };
  }

  const hz = parseHz(lang, slug);
  if (hz) {
    const hc = HZ[lang][hz];
    const hurl = `${SITE}${hzUrl(lang, hz)}`;
    return {
      metadataBase: new URL(SITE),
      title: { absolute: hc.title },
      description: fitDesc(withAsk(hc.desc, lang), 158, lang),
      robots,
      alternates: { canonical: hurl, languages: hzLanguages(hz) },
      openGraph: { title: hc.title, description: fitDesc(withAsk(hc.desc, lang), 158, lang), url: hurl, siteName: 'Terzi Can', locale: INTL[lang].locale, type: 'article', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: hc.h1 }] },
      twitter: { card: 'summary_large_image', title: hc.title, description: fitDesc(withAsk(hc.desc, lang), 158, lang), images: [OG_DEFAULT] },
    };
  }

  const konu = parseKonu(lang, slug);
  if (konu) {
    const kc = KONU[lang][konu];
    const kurl = `${SITE}${konuUrl(lang, konu)}`;
    return {
      metadataBase: new URL(SITE),
      title: { absolute: kc.title },
      description: fitDesc(withAsk(kc.desc, lang), 158, lang),
      robots,
      alternates: { canonical: kurl, languages: konuLanguages(konu) },
      openGraph: { title: kc.title, description: fitDesc(withAsk(kc.desc, lang), 158, lang), url: kurl, siteName: 'Terzi Can', locale: INTL[lang].locale, type: 'article', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: kc.h1 }] },
      twitter: { card: 'summary_large_image', title: kc.title, description: fitDesc(withAsk(kc.desc, lang), 158, lang), images: [OG_DEFAULT] },
    };
  }

  if (parsePromo(lang, slug)) {
    const pc = PROMO[lang];
    const purl = `${SITE}${promoUrl(lang)}`;
    // 10 dilli karşılıklı hreflang (TR/EN/DE/RU + ES/FR/PL/UK/NL/AR) + x-default (TR)
    const languages: Record<string, string> = Object.fromEntries(PROMO_ALL.map((x) => [x.hreflang, `${BASE}${x.path}`]));
    languages['x-default'] = `${BASE}${PROMO_ALL[0].path}`;
    return {
      metadataBase: new URL(SITE),
      title: { absolute: pc.title },
      description: pc.desc,
      robots,
      alternates: { canonical: purl, languages },
      openGraph: { title: pc.title, description: pc.desc, url: purl, siteName: 'Terzi Can', locale: INTL[lang].locale, type: 'website', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: pc.h1 }] },
      twitter: { card: 'summary_large_image', title: pc.title, description: pc.desc, images: [OG_DEFAULT] },
    };
  }

  const zone = parseZone(lang, slug);
  if (!zone) return {};
  const z = zoneData(lang, zone);
  const zc = ZCOPY[lang];
  const seoT = zone === 'antalya' ? [] : zoneSeoTitles(lang, z.name, ZONE_SLUGS.indexOf(zone)); // bölgeye göre farklı, hizmet kelimeli başlık
  const title = seoT.find((t) => t.length <= 60) ?? zc.title(z.name);
  const description = fitDesc(withAsk(zc.desc(z.name), lang), 158, lang);
  const url = `${SITE}${zoneUrl(lang, zone)}`;
  return {
    metadataBase: new URL(SITE),
    title: { absolute: title },
    description,
    robots,
    alternates: { canonical: url, languages: zoneLanguages(zone) },
    openGraph: { title, description, url, siteName: 'Terzi Can', locale: INTL[lang].locale, type: 'article', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_DEFAULT] },
  };
}

export default async function Page({ params }: P) {
  const { lang, slug } = await params;
  if (!isILang(lang)) notFound();
  if (slug === SLUG[lang]) return <IntlLanding lang={lang} />;
  if (parseSvcg(lang, slug)) return <SvcGuideLanding lang={lang} />;
  if (parseOnline(lang, slug)) return <OnlineGuideLanding lang={lang} />;
  if (OLCU[lang].slug === slug) return <OlcuGuideLanding lang={lang} />;
  if (parseOzel(lang, slug)) return <OzelDikimLanding lang={lang} />;
  const hz = parseHz(lang, slug);
  if (hz) return <KonuGuideLanding lang={lang} hz={hz} />;
  const konu = parseKonu(lang, slug);
  if (konu) return <KonuGuideLanding lang={lang} topic={konu} />;
  if (parsePromo(lang, slug)) return <PromoGuideLanding lang={lang} />;
  const zone = parseZone(lang, slug);
  if (!zone) notFound();
  return <ZoneLanding lang={lang} zone={zone} />;
}
