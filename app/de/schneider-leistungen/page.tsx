import { photoPrice } from '@/lib/meta-fit';
import { HubPage, hubMetadata } from '@/components/terzi/SeoLanding';

const baseMeta = hubMetadata('de');
export const metadata = { ...baseMeta, description: photoPrice(String(baseMeta.description ?? ''), 'de') };
export default function Page() {
  return <HubPage lang="de" />;
}
