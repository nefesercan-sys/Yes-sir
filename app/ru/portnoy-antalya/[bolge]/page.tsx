import { notFound } from 'next/navigation';
import { DISTRICTS, findDistrict } from '@/lib/seo-data';
import { DistrictPage, districtMetadata } from '@/components/terzi/SeoLanding';

export const dynamicParams = false;
export function generateStaticParams() {
  return DISTRICTS.map((d) => ({ bolge: d.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ bolge: string }> }) {
  const { bolge } = await params;
  const d = findDistrict(bolge);
  return d ? districtMetadata('ru', d) : {};
}
export default async function Page({ params }: { params: Promise<{ bolge: string }> }) {
  const { bolge } = await params;
  const d = findDistrict(bolge);
  if (!d) notFound();
  return <DistrictPage lang="ru" d={d} />;
}
