import type { Metadata } from 'next';
import { BASE, CONTENT, HREFLANG, LANGS, LOCALE, URLS, type Lang, type Topic } from './tekstil-sayfalari';
import { PROMO_ALL } from './intl-promo';
import { sixAlt } from './intl-konu';

export function tekstilMetadata(topic: Topic, lang: Lang): Metadata {
  const c = CONTENT[topic][lang];
  const url = `${BASE}${URLS[topic][lang]}`;
  // Promosyon sayfası 10 dilde yayımlanır (4 dil + ES/FR/PL/UK/NL/AR): hreflang kümesi hepsini içerir.
  const languages: Record<string, string> = topic === 'promo'
    ? Object.fromEntries(PROMO_ALL.map((x) => [x.hreflang, `${BASE}${x.path}`]))
    : { ...Object.fromEntries(LANGS.map((l) => [HREFLANG[l], `${BASE}${URLS[topic][l]}`])), ...(topic === 'keten' || topic === 'tekstil' ? sixAlt(topic) : {}) };
  languages['x-default'] = `${BASE}${URLS[topic].tr}`;
  const ogImage = `${BASE}/swaphubs-og.jpg`;
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: c.h1 }],
    },
    ...(topic === 'promo' ? { twitter: { card: 'summary_large_image' as const, title: c.t, description: c.d, images: [ogImage] } } : {}),
  };
}
