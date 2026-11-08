import OzelDikimLanding from '@/components/terzi/OzelDikimLanding';
import { ozelMetadata } from '@/lib/ozel-meta';

export const metadata = ozelMetadata('de');

export default function Page() {
  return <OzelDikimLanding lang="de" />;
}
