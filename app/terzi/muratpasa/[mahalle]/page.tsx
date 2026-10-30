// SwapHubs — /terzi/muratpasa/[mahalle]: Meltem, Şirinyalı, Fener, Güzeloba (Muratpaşa'ya bağlı mahalleler)
import { MahallePage, mahalleMetadata, mahalleStaticParams, type MahalleParams } from '@/components/terzi/MahallePage';

export const revalidate = 3600;
export const dynamicParams = false;
export function generateStaticParams() { return mahalleStaticParams('muratpasa'); }
export function generateMetadata(p: MahalleParams) { return mahalleMetadata('muratpasa', p); }
export default function Page(p: MahalleParams) { return MahallePage({ ilce: 'muratpasa', ...p }); }
