import type { Metadata } from 'next';
import { BASE, CONTENT, HREFLANG, LANGS, LOCALE, URLS, type Lang, type Topic } from './tekstil-sayfalari';

export function tekstilMetadata(topic: Topic, lang: Lang): Metadata {
  const c = CONTENT[topic][lang];
  const url = `${BASE}${URLS[topic][lang]}`;
  const languages: Record<string, string> = Object.fromEntries(LANGS.map((l) => [HREFLANG[l], `${BASE}${URLS[topic][l]}`]));
  languages['x-default'] = `${BASE}${URLS[topic].tr}`;
  return {
    metadataBase: new URL(BASE),
    title: { absolute: c.t },
    description: c.d,
    alternates: { canonical: url, languages },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    openGraph: {
      title: c.t,
      description: c.d,
      url,
      siteName: 'SwapHubs',
      locale: LOCALE[lang],
      type: 'website',
      images: [{ url: `${BASE}/swaphubs-og.jpg`, width: 1200, height: 630, alt: c.h1 }],
    },
  };
}
