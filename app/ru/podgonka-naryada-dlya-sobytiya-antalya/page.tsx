import { photoPrice } from '@/lib/meta-fit';
import TekstilLanding from '@/components/tekstil/TekstilLanding';
import { tekstilMetadata } from '@/lib/tekstil-meta';

const baseMeta = tekstilMetadata('etkinlik', 'ru');
export const metadata = { ...baseMeta, description: photoPrice(String(baseMeta.description ?? ''), 'ru') };
export default function Page() {
  return <TekstilLanding topic="etkinlik" lang="ru" />;
}
