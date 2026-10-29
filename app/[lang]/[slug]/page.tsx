import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IntlLanding, { OG_DEFAULT } from '@/components/terzi/IntlLanding';
import ZoneLanding from '@/components/terzi/ZoneLanding';
import { ILANGS, INTL, SLUG, iUrl, isILang } from '@/lib/intl';
import { ZCOPY, ZONE_SLUGS, parseZone, zoneData, zoneSlug, zoneUrl } from '@/lib/intl-zones';
import { SITE } from '@/lib/seo-data';

// Yalnızca tanımlı rehber ve otel bölgesi sayfaları üretilir; diğer iki-segmentli yollar 404 olur.
export const dynamicParams = false;
export function generateStaticParams() {
  return ILANGS.flatMap((lang) => [
    { lang, slug: SLUG[lang] },
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
  const zone = parseZone(lang, slug);
  if (!zone) notFound();
  return <ZoneLanding lang={lang} zone={zone} />;
}
