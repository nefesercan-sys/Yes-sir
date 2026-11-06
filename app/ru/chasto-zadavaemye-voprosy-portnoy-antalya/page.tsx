import type { Metadata } from 'next';
import FaqHub, { FAQ_HUB, FAQ_HUB_PATH } from '@/components/terzi/FaqHub';

const BASE = 'https://swaphubs.com';
const L = 'ru' as const;
const t = FAQ_HUB[L];
const languages = {
  tr: `${BASE}${FAQ_HUB_PATH.tr}`, en: `${BASE}${FAQ_HUB_PATH.en}`, ru: `${BASE}${FAQ_HUB_PATH.ru}`, de: `${BASE}${FAQ_HUB_PATH.de}`,
  'x-default': `${BASE}${FAQ_HUB_PATH.tr}`,
};

export const metadata: Metadata = {
  title: t.title,
  description: t.desc,
  alternates: { canonical: `${BASE}${FAQ_HUB_PATH[L]}`, languages },
  openGraph: { title: t.title, description: t.desc, url: `${BASE}${FAQ_HUB_PATH[L]}`, type: 'website', siteName: 'Terzi Can Antalya' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <FaqHub lang={L} />;
}
