// swaphubs.com — "Siparişe özel dikim" sayfaları için ortak metadata (10 dil, karşılıklı hreflang + x-default TR).
import type { Metadata } from 'next';
import { OZEL, OZEL_META, ozelUrl, ozelLanguages, type OzelLang } from '@/lib/ozel-dikim';
import { SITE } from '@/lib/seo-data';
import { OG_DEFAULT } from '@/components/terzi/IntlLanding';

export function ozelMetadata(lang: OzelLang): Metadata {
  const c = OZEL[lang];
  const url = `${SITE}${ozelUrl(lang)}`;
  return {
    metadataBase: new URL(SITE),
    title: { absolute: c.title },
    description: c.desc,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: url, languages: ozelLanguages(SITE) },
    openGraph: { title: c.title, description: c.desc, url, siteName: 'Terzi Can', locale: OZEL_META[lang].locale, type: 'website', images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: c.h1 }] },
    twitter: { card: 'summary_large_image', title: c.title, description: c.desc, images: [OG_DEFAULT] },
  };
}
