import { photoPrice } from '@/lib/meta-fit';
import OzelDikimLanding from '@/components/terzi/OzelDikimLanding';
import { ozelMetadata } from '@/lib/ozel-meta';

const baseMeta = ozelMetadata('en');
export const metadata = { ...baseMeta, description: photoPrice(String(baseMeta.description ?? ''), 'en') };
export default function Page() {
  return <OzelDikimLanding lang="en" />;
}
