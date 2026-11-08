import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuzellikPage, { guzellikMetadata } from '@/components/guzellik/GuzellikPage';
import { GLANGS, G_SLUG, gLangFromSlug } from '@/lib/guzellik';

// Yalnızca tanımlı 10 güzellik adresi üretilir; diğer /guzellik/<x> yolları 404 olur.
export const dynamicParams = false;
export function generateStaticParams() {
  return GLANGS.map((l) => ({ slug: G_SLUG[l] }));
}

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const lang = gLangFromSlug(slug);
  return lang ? guzellikMetadata(lang) : {};
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const lang = gLangFromSlug(slug);
  if (!lang) notFound();
  return <GuzellikPage lang={lang} />;
}
