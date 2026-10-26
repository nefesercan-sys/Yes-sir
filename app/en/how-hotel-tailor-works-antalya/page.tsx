import TekstilLanding from '@/components/tekstil/TekstilLanding';
import { tekstilMetadata } from '@/lib/tekstil-meta';

export const metadata = tekstilMetadata('otel', 'en');

export default function Page() {
  return <TekstilLanding topic="otel" lang="en" />;
}
