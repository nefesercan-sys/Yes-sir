import { photoPrice } from '@/lib/meta-fit';
import TekstilLanding from '@/components/tekstil/TekstilLanding';
import { tekstilMetadata } from '@/lib/tekstil-meta';

const baseMeta = tekstilMetadata('otel', 'de');
export const metadata = { ...baseMeta, description: photoPrice(String(baseMeta.description ?? ''), 'de') };
export default function Page() {
  return <TekstilLanding topic="otel" lang="de" />;
}
