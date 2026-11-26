import { photoPrice } from '@/lib/meta-fit';
import { HubPage, hubMetadata } from '@/components/terzi/SeoLanding';

const baseMeta = hubMetadata('ru');
export const metadata = { ...baseMeta, description: photoPrice(String(baseMeta.description ?? ''), 'ru') };
export default function Page() {
  return <HubPage lang="ru" />;
}
