import TekstilLanding from '@/components/tekstil/TekstilLanding';
import { tekstilMetadata } from '@/lib/tekstil-meta';

export const metadata = tekstilMetadata('tekstil', 'tr');

export default function Page() {
  return <TekstilLanding topic="tekstil" lang="tr" />;
}
