import { photoPrice } from '@/lib/meta-fit';
import IletisimSayfasi, { iletisimMetadata } from '@/components/terzi/IletisimSayfasi';

const baseMeta = iletisimMetadata('de');
export const metadata = { ...baseMeta, description: photoPrice(String(baseMeta.description ?? ''), 'de') };
export default function Page() {
  return <IletisimSayfasi lang="de" />;
}
