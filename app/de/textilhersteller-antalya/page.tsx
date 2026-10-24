import TekstilLanding from '@/components/tekstil/TekstilLanding';
import { tekstilMetadata } from '@/lib/tekstil-meta';

export const metadata = tekstilMetadata('tekstil', 'de');

export default function Page() {
  return <TekstilLanding topic="tekstil" lang="de" />;
}
