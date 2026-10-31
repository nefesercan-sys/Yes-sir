import TekstilLanding from '@/components/tekstil/TekstilLanding';
import { tekstilMetadata } from '@/lib/tekstil-meta';

export const metadata = tekstilMetadata('promo', 'en');

export default function Page() {
  return <TekstilLanding topic="promo" lang="en" />;
}
