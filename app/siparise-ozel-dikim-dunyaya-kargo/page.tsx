import { resimFiyat } from '@/lib/meta-fit';
import OzelDikimLanding from '@/components/terzi/OzelDikimLanding';
import { ozelMetadata } from '@/lib/ozel-meta';

const base = ozelMetadata('tr');
export const metadata = { ...base, description: resimFiyat(String(base.description ?? '')) };

export default function Page() {
  return <OzelDikimLanding lang="tr" />;
}
