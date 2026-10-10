import { notFound } from 'next/navigation';
import { SERVICES, findServiceBySlug } from '@/lib/seo-data';
import { ServicePage, serviceMetadata } from '@/components/terzi/SeoLanding';

export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICES.map((s) => ({ hizmet: s.slug.de }));
}
export async function generateMetadata({ params }: { params: Promise<{ hizmet: string }> }) {
  const { hizmet } = await params;
  const s = findServiceBySlug('de', hizmet);
  return s ? serviceMetadata('de', s) : {};
}
export default async function Page({ params }: { params: Promise<{ hizmet: string }> }) {
  const { hizmet } = await params;
  const s = findServiceBySlug('de', hizmet);
  if (!s) notFound();
  return <ServicePage lang="de" s={s} />;
}
