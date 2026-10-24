import TekstilLanding from '@/components/tekstil/TekstilLanding';
import { tekstilMetadata } from '@/lib/tekstil-meta';

export const metadata = tekstilMetadata('keten', 'tr');

export default function Page() {
  return <TekstilLanding topic="keten" lang="tr" />;
}
