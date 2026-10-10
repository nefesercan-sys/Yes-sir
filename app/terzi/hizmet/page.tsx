import { notFound } from 'next/navigation';
import { SERVICES, findServiceBySlug, trServiceHasOwnRoute } from '@/lib/seo-data';
import { ServicePage, serviceMetadata } from '@/components/terzi/SeoLanding';

export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICES.filter((s) => !trServiceHasOwnRoute(s.id)).map((s) => ({ hizmet: s.slug.tr }));
}
export async function generateMetadata({ params }: { params: Promise<{ hizmet: string }> }) {
  const { hizmet } = await params;
  const s = findServiceBySlug('tr', hizmet);
  return s && !trServiceHasOwnRoute(s.id) ? serviceMetadata('tr', s) : {};
}
export default async function Page({ params }: { params: Promise<{ hizmet: string }> }) {
  const { hizmet } = await params;
  const s = findServiceBySlug('tr', hizmet);
  if (!s || trServiceHasOwnRoute(s.id)) notFound();
  return <ServicePage lang="tr" s={s} />;
}
