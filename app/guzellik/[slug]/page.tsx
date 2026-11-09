import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuzellikPage, { guzellikMetadata } from '@/components/guzellik/GuzellikPage';
import GuzellikSubPage, { guzellikSubMetadata } from '@/components/guzellik/GuzellikSubPage';
import { GLANGS, G_SLUG, gLangFromSlug } from '@/lib/guzellik';
import { allSubSlugs, gSubFromSlug } from '@/lib/guzellik-sub';

// Yalnızca tanımlı adresler üretilir (10 ana sayfa + tr/en/de/ru hizmet ve bölge sayfaları); diğer /guzellik/<x> yolları 404 olur.
export const dynamicParams = false;
export function generateStaticParams() {
  return [...GLANGS.map((l) => G_SLUG[l]), ...allSubSlugs()].map((slug) => ({ slug }));
}

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const lang = gLangFromSlug(slug);
  if (lang) return guzellikMetadata(lang);
  const sub = gSubFromSlug(slug);
  return sub ? guzellikSubMetadata(sub) : {};
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const lang = gLangFromSlug(slug);
  if (lang) return <GuzellikPage lang={lang} />;
  const sub = gSubFromSlug(slug);
  if (!sub) notFound();
  return <GuzellikSubPage k={sub} />;
}
