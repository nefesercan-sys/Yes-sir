import { photoPrice } from '@/lib/meta-fit';
import IletisimSayfasi, { iletisimMetadata } from '@/components/terzi/IletisimSayfasi';

const baseMeta = iletisimMetadata('ru');
export const metadata = { ...baseMeta, description: photoPrice(String(baseMeta.description ?? ''), 'ru') };
export default function Page() {
  return <IletisimSayfasi lang="ru" />;
}
