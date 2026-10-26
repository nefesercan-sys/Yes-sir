import TekstilLanding from '@/components/tekstil/TekstilLanding';
import { tekstilMetadata } from '@/lib/tekstil-meta';

export const metadata = tekstilMetadata('acil', 'en');

export default function Page() {
  return <TekstilLanding topic="acil" lang="en" />;
}
