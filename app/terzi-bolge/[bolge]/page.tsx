import { notFound } from 'next/navigation';
import { DISTRICTS, findDistrict, trDistrictHasOwnRoute } from '@/lib/seo-data';
import { DistrictPage, districtMetadata } from '@/components/terzi/SeoLanding';

export const dynamicParams = false;
export function generateStaticParams() {
  return DISTRICTS.filter((d) => !trDistrictHasOwnRoute(d.slug)).map((d) => ({ bolge: d.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ bolge: string }> }) {
  const { bolge } = await params;
  const d = findDistrict(bolge);
  return d && !trDistrictHasOwnRoute(d.slug) ? districtMetadata('tr', d) : {};
}
export default async function Page({ params }: { params: Promise<{ bolge: string }> }) {
  const { bolge } = await params;
  const d = findDistrict(bolge);
  if (!d || trDistrictHasOwnRoute(d.slug)) notFound();
  return <DistrictPage lang="tr" d={d} />;
}
