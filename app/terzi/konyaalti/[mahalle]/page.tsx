// SwapHubs — /terzi/konyaalti/[mahalle] (ortak şablon: components/terzi/MahallePage.tsx)
// Meltem, Şirinyalı, Fener, Güzeloba idari olarak Muratpaşa'dır; eski /terzi/konyaalti/<slug> adresleri yönlendirilmez, aynı sayfayı
// 200 ile verir ve canonical olarak doğru adresi (/terzi/muratpasa/<slug>) gösterir.
import { MahallePage, mahalleMetadata, mahalleStaticParams, type MahalleParams } from '@/components/terzi/MahallePage';
import { MURATPASA_MAHALLELERI } from '@/lib/turkiye-lokasyonlar';

export const revalidate = 3600;
export const dynamicParams = false;
const muratpasa = async (p: MahalleParams) => MURATPASA_MAHALLELERI.some((m) => m.slug === (await p.params).mahalle);
export function generateStaticParams() {
  return [...mahalleStaticParams('konyaalti'), ...mahalleStaticParams('muratpasa')];
}
export async function generateMetadata(p: MahalleParams) { return mahalleMetadata((await muratpasa(p)) ? 'muratpasa' : 'konyaalti', p); }
export default async function Page(p: MahalleParams) { return MahallePage({ ilce: (await muratpasa(p)) ? 'muratpasa' : 'konyaalti', ...p }); }
