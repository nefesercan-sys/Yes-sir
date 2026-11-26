import { photoPrice } from '@/lib/meta-fit';
import IletisimSayfasi, { iletisimMetadata } from '@/components/terzi/IletisimSayfasi';

const baseMeta = iletisimMetadata('en');
export const metadata = { ...baseMeta, description: photoPrice(String(baseMeta.description ?? ''), 'en') };
export default function Page() {
  return <IletisimSayfasi lang="en" />;
}
