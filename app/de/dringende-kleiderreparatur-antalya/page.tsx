import TekstilLanding from '@/components/tekstil/TekstilLanding';
import { tekstilMetadata } from '@/lib/tekstil-meta';

export const metadata = tekstilMetadata('acil', 'de');

export default function Page() {
  return <TekstilLanding topic="acil" lang="de" />;
}
