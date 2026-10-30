// SwapHubs — /terzi/konyaalti/[mahalle] (ortak şablon: components/terzi/MahallePage.tsx)
import { MahallePage, mahalleMetadata, mahalleStaticParams, type MahalleParams } from '@/components/terzi/MahallePage';

export const revalidate = 3600;
export const dynamicParams = false;
export function generateStaticParams() { return mahalleStaticParams('konyaalti'); }
export function generateMetadata(p: MahalleParams) { return mahalleMetadata('konyaalti', p); }
export default function Page(p: MahalleParams) { return MahallePage({ ilce: 'konyaalti', ...p }); }
