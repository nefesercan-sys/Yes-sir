import TekstilLanding from '@/components/tekstil/TekstilLanding';
import { tekstilMetadata } from '@/lib/tekstil-meta';

export const metadata = tekstilMetadata('etkinlik', 'de');

export default function Page() {
  return <TekstilLanding topic="etkinlik" lang="de" />;
}
