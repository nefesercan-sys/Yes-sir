import OzelDikimLanding from '@/components/terzi/OzelDikimLanding';
import { ozelMetadata } from '@/lib/ozel-meta';

export const metadata = ozelMetadata('tr');

export default function Page() {
  return <OzelDikimLanding lang="tr" />;
}
