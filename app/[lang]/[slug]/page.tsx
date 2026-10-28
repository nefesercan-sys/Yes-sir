import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IntlLanding, { OG_DEFAULT } from '@/components/terzi/IntlLanding';
import { ILANGS, INTL, SLUG, iUrl, isILang } from '@/lib/intl';
import { SITE } from '@/lib/seo-data';

// Yalnızca ILANGS × SLUG kombinasyonları üretilir; diğer iki-segmentli yollar 404 olur.
export const dynamicParams = false;
export function generateStaticParams() {
  return ILANGS.map((lang) => ({ lang, slug: SLUG[lang] }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isILang(lang) || slug !== SLUG[lang]) return {};
  const c = INTL[lang];
  const url = `${SITE}${iUrl(lang)}`;
  return {
    metadataBase: new URL(SITE),
    title: { absolute: c.title },
    description: c.desc,
    keywords: c.keywords,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: url, languages: Object.fromEntries(ILANGS.map((l) => [INTL[l].hreflang, `${SITE}${iUrl(l)}`])) },
    openGraph: { title: c.title, description: c.desc, url, siteName: 'SwapHubs', locale: c.locale, type: 'article', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: c.h1 }] },
    twitter: { card: 'summary_large_image', title: c.title, description: c.desc, images: [OG_DEFAULT] },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isILang(lang) || slug !== SLUG[lang]) notFound();
  return <IntlLanding lang={lang} />;
}
