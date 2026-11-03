import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/deri-ceket-tadilati-antalya';

const DATA: KonuData = {
  path: PATH,
  name: 'Deri Ceket, Pantolon ve Yelek Tadilatı',
  h1: 'Deri Ceket Tadilatı Antalya',
  kisa: 'Terzi Can, Antalya Konyaaltı\'nda deri ceket, deri pantolon ve deri yelek tamir ve tadilatını 400 TL\'den başlayan fiyatlarla yapar. Önce fotoğraf istenir; deri cinsi görüldükten sonra yapılabilecek işlem, net fiyat ve süre söylenir.',
  waIlk: 'Merhaba, deri ceket/pantolon/yelek tadilatı için fiyat almak istiyorum. Fotoğrafı gönderiyorum.',
  facts: [
    ['Başlangıç fiyatı', '400 TL\'den'],
    ['Süre', 'İşin kapsamına göre netleşir'],
    ['Çalışma saatleri', 'Her gün 08:00–23:00'],
    ['Servis', 'Eve ve otele ücretsiz alım-teslim'],
  ],
  turlerBaslik: 'Hangi deri ürünlerde çalışıyoruz?',
  turler: [
    { ic: '🧥', baslik: 'Deri ceket', aciklama: 'Daraltma, kol kısaltma, boy ayarı ve yırtık/söküklerin onarımı.' },
    { ic: '👖', baslik: 'Deri pantolon', aciklama: 'Bel ve bacak daraltma, paça kısaltma ve onarım.' },
    { ic: '🦺', baslik: 'Deri yelek', aciklama: 'Beden daraltma ve onarım işlemleri.' },
  ],
  fiyatBaslik: 'Deri tamir ve tadilat fiyatı',
  fiyatlar: [
    ['Deri ceket tamir / tadilat', '400 TL\'den'],
    ['Deri pantolon tamir / tadilat', '400 TL\'den'],
    ['Deri yelek tamir / tadilat', '400 TL\'den'],
  ],
  fiyatNot: 'Fiyatlar başlangıç fiyatıdır; deri cinsine ve işin kapsamına göre değişebilir. Net fiyat için işin fotoğrafını WhatsApp\'tan gönderin.',
  lowPrice: '400',
  adimlar: [
    { baslik: 'Fotoğraf gönderin', aciklama: 'Deri parçanın ve yapılacak yerin fotoğrafını WhatsApp\'tan yollayın.' },
    { baslik: 'Deri cinsi görülür', aciklama: 'İşlemin yapılıp yapılamayacağı ve net fiyat söylenir.' },
    { baslik: 'Getirin ya da alalım', aciklama: 'Atölyeye bırakın ya da eve/otele ücretsiz alım-teslim isteyin.' },
    { baslik: 'Teslim', aciklama: 'Süre işin kapsamına göre WhatsApp\'ta netleşir.' },
  ],
  faq: [
    { q: 'Deri ceket tadilatı ne kadar?', a: 'Deri ceket, deri pantolon ve deri yelek tamir ve tadilatı 400 TL\'den başlar. Net fiyat işin kapsamına ve deri cinsine göre, fotoğrafla WhatsApp\'tan söylenir.' },
    { q: 'Deri ceket daraltılır mı?', a: 'Yapılabilirlik derinin cinsine ve dikiş yapısına bağlıdır. Fotoğrafı gönderirseniz değerlendirip bilgi veririz.' },
    { q: 'Deri ceketin kolu kısaltılır mı?', a: 'Kol boyu ceket üzerinizdeyken işaretlenir; yapılabilecek işlem fotoğraftan değerlendirilir.' },
    { q: 'Deri pantolon ve yelek tamiri yapıyor musunuz?', a: 'Evet. Deri pantolon ve deri yelekte de tamir ve tadilat yapıyoruz; fiyatlar 400 TL\'den başlar.' },
    { q: 'Deri tadilatı kaç günde biter?', a: 'Süre işin kapsamına göre değişir; fotoğrafı gönderince net süreyi WhatsApp\'tan söyleriz.' },
    { q: 'Eve veya otele gelip alıyor musunuz?', a: 'Evet. Eve ve otele alım-teslim tüm hizmet bölgelerimizde ücretsizdir; adresinizi ve saat tercihinizi WhatsApp\'tan yazmanız yeterli.' },
  ],
  diger: [
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
  ],
  ctaBaslik: 'Deri ürününüzü mü yaptıracaksınız?',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Deri Ceket Tadilatı 400 TL\'den · Pantolon, Yelek | Terzi Can' },
  description: 'Deri ceket, deri pantolon ve deri yelek tamir ve tadilatı 400 TL\'den: daraltma, kol kısaltma, onarım. Önce fotoğraf, sonra net fiyat. Her gün 08–23. ☎ +90 531 898 64 18',
  keywords: [
    'deri ceket tadilatı',
    'deri ceket tadilatı fiyat',
    'deri ceket daraltma',
    'deri ceket kol kısaltma',
    'deri pantolon tadilatı',
    'deri yelek tamiri',
    'deri ceket tamiri antalya',
    'deri mont terzi',
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: 'Deri Ceket Tadilatı Antalya · 400 TL\'den | Terzi Can', description: 'Deri ceket, pantolon ve yelek tamir ve tadilatı. Fotoğrafla net fiyat; Konyaaltı / Antalya.', url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} />;
}
