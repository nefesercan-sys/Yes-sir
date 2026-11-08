import OzelDikimLanding from '@/components/terzi/OzelDikimLanding';
import { ozelMetadata } from '@/lib/ozel-meta';

export const metadata = ozelMetadata('ru');

export default function Page() {
  return <OzelDikimLanding lang="ru" />;
}
