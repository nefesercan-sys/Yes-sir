import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IntlLanding, { OG_DEFAULT } from '@/components/terzi/IntlLanding';
import ZoneLanding from '@/components/terzi/ZoneLanding';
import SvcGuideLanding from '@/components/terzi/SvcGuideLanding';
import KonuGuideLanding from '@/components/terzi/KonuGuideLanding';
import { KONU, KONU_IDS, parseKonu, konuUrl, konuLanguages } from '@/lib/intl-konu';
import PromoGuideLanding from '@/components/terzi/PromoGuideLanding';
import { SVCG, svcgUrl, parseSvcg } from '@/lib/intl-svc';
import { PROMO, PROMO_ALL, promoUrl, parsePromo } from '@/lib/intl-promo';
import { BASE } from '@/lib/tekstil-sayfalari';
import { ILANGS, INTL, SLUG, iUrl, isILang } from '@/lib/intl';
import { ZCOPY, ZONE_SLUGS, parseZone, zoneData, zoneSlug, zoneUrl } from '@/lib/intl-zones';
import { SITE } from '@/lib/seo-data';

// Yalnızca tanımlı rehber ve otel bölgesi sayfaları üretilir; diğer iki-segmentli yollar 404 olur.
export const dynamicParams = false;
export function generateStaticParams() {
  return ILANGS.flatMap((lang) => [
    { lang, slug: SLUG[lang] },
    { lang, slug: SVCG[lang].slug },
    { lang, slug: PROMO[lang].slug },
    ...KONU_IDS.map((t) => ({ lang, slug: KONU[lang][t].slug })),
    ...ZONE_SLUGS.map((z) => ({ lang, slug: zoneSlug(lang, z) })),
  ]);
}

type P = { params: Promise<{ lang: string; slug: string }> };

const robots = { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 } };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isILang(lang)) return {};

  if (slug === SLUG[lang]) {
    const c = INTL[lang];
    const url = `${SITE}${iUrl(lang)}`;
    return {
      metadataBase: new URL(SITE),
      title: { absolute: c.title },
      description: c.desc,
      keywords: c.keywords,
      robots,
      alternates: { canonical: url, languages: Object.fromEntries(ILANGS.map((l) => [INTL[l].hreflang, `${SITE}${iUrl(l)}`])) },
      openGraph: { title: c.title, description: c.desc, url, siteName: 'SwapHubs', locale: c.locale, type: 'article', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: c.h1 }] },
      twitter: { card: 'summary_large_image', title: c.title, description: c.desc, images: [OG_DEFAULT] },
    };
  }

  if (parseSvcg(lang, slug)) {
    const sc = SVCG[lang];
    const surl = `${SITE}${svcgUrl(lang)}`;
    return {
      metadataBase: new URL(SITE),
      title: { absolute: sc.title },
      description: sc.desc,
      robots,
      alternates: { canonical: surl, languages: Object.fromEntries(ILANGS.map((l) => [INTL[l].hreflang, `${SITE}${svcgUrl(l)}`])) },
      openGraph: { title: sc.title, description: sc.desc, url: surl, siteName: 'SwapHubs', locale: INTL[lang].locale, type: 'article', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: sc.title }] },
      twitter: { card: 'summary_large_image', title: sc.title, description: sc.desc, images: [OG_DEFAULT] },
    };
  }

  const konu = parseKonu(lang, slug);
  if (konu) {
    const kc = KONU[lang][konu];
    const kurl = `${SITE}${konuUrl(lang, konu)}`;
    return {
      metadataBase: new URL(SITE),
      title: { absolute: kc.title },
      description: kc.desc,
      robots,
      alternates: { canonical: kurl, languages: konuLanguages(konu) },
      openGraph: { title: kc.title, description: kc.desc, url: kurl, siteName: 'SwapHubs', locale: INTL[lang].locale, type: 'article', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: kc.h1 }] },
      twitter: { card: 'summary_large_image', title: kc.title, description: kc.desc, images: [OG_DEFAULT] },
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
      openGraph: { title: pc.title, description: pc.desc, url: purl, siteName: 'SwapHubs', locale: INTL[lang].locale, type: 'website', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: pc.h1 }] },
      twitter: { card: 'summary_large_image', title: pc.title, description: pc.desc, images: [OG_DEFAULT] },
    };
  }

  const zone = parseZone(lang, slug);
  if (!zone) return {};
  const z = zoneData(lang, zone);
  const zc = ZCOPY[lang];
  const title = zc.title(z.name);
  const description = zc.desc(z.name);
  const url = `${SITE}${zoneUrl(lang, zone)}`;
  return {
    metadataBase: new URL(SITE),
    title: { absolute: title },
    description,
    robots,
    alternates: { canonical: url, languages: Object.fromEntries(ILANGS.map((l) => [INTL[l].hreflang, `${SITE}${zoneUrl(l, zone)}`])) },
    openGraph: { title, description, url, siteName: 'SwapHubs', locale: INTL[lang].locale, type: 'article', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_DEFAULT] },
  };
}

export default async function Page({ params }: P) {
  const { lang, slug } = await params;
  if (!isILang(lang)) notFound();
  if (slug === SLUG[lang]) return <IntlLanding lang={lang} />;
  if (parseSvcg(lang, slug)) return <SvcGuideLanding lang={lang} />;
  const konu = parseKonu(lang, slug);
  if (konu) return <KonuGuideLanding lang={lang} topic={konu} />;
  if (parsePromo(lang, slug)) return <PromoGuideLanding lang={lang} />;
  const zone = parseZone(lang, slug);
  if (!zone) notFound();
  return <ZoneLanding lang={lang} zone={zone} />;
}
