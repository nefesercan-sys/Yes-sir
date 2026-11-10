import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/kot-pantolon-daraltma-antalya';

const DATA: KonuData = {
  path: PATH,
  name: 'Kot Pantolon Daraltma',
  h1: 'Kot Pantolon Daraltma Antalya',
  kisa: 'Terzi Can, Antalya Konyaaltı\'nda kot pantolon bacak ve bel daraltmayı 200 TL\'den başlayan fiyatlarla yapar. Ölçü üzerinizde işaretlenir; normal işler aynı gün, acil işler 1–2 saatte teslim edilir.',
  waIlk: 'Merhaba, kot pantolon daraltma için fiyat almak istiyorum. Fotoğrafı gönderiyorum.',
  facts: [
    ['Başlangıç fiyatı', '200 TL\'den'],
    ['Teslim süresi', 'Normal iş aynı gün · acilde 1–2 saat'],
    ['Çalışma saatleri', 'Her gün 08:00–23:00'],
    ['Servis', 'Eve ve otele alım-teslim'],
  ],
  turlerBaslik: 'Kot pantolonda neyi daraltıyoruz?',
  turler: [
    { ic: '📐', baslik: 'Bacak daraltma', aciklama: 'Pantolon bacağı istediğiniz genişliğe getirilir; ölçü üzerinizde işaretlenir.' },
    { ic: '🪡', baslik: 'Bel daraltma', aciklama: 'Bel, size oturacak şekilde daraltılır.' },
  ],
  fiyatBaslik: 'Kot daraltma fiyatı',
  fiyatlar: [
    ['Bacak daraltma', '200 TL\'den'],
    ['Bel daraltma', '200 TL\'den'],
  ],
  fiyatNot: 'Fiyatlar başlangıç fiyatıdır; kumaş kalınlığına ve işin kapsamına göre değişebilir. Net fiyat için fotoğrafı WhatsApp\'tan gönderin.',
  lowPrice: '200',
  adimlar: [
    { baslik: 'Fotoğraf gönderin', aciklama: 'Pantolonun önden ve arkadan fotoğrafını, daraltılacak yeri belirterek WhatsApp\'tan yollayın.' },
    { baslik: 'Fiyat netleşir', aciklama: 'Yapılacak işe göre net fiyatı bildiririz.' },
    { baslik: 'Getirin ya da alalım', aciklama: 'Atölyeye bırakın ya da eve/otele alım-teslim isteyin.' },
    { baslik: 'Teslim', aciklama: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
  ],
  faq: [
    { q: 'Kot pantolon daraltma ne kadar?', a: 'Kot pantolon daraltma 200 TL\'den başlar; net fiyat daraltılacak yere göre fotoğrafla söylenir.' },
    { q: 'Bacak mı bel mi daraltılır?', a: 'İkisi de yapılır. İhtiyacınızı fotoğrafla birlikte yazmanız yeterli.' },
    { q: 'Daraltma için ne göndermeliyim?', a: 'Pantolonun önden ve arkadan fotoğrafı, daraltmak istediğiniz yer ve varsa istediğiniz ölçü yeterlidir.' },
    { q: 'Kot daraltma ne kadar sürer?', a: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
    { q: 'Eve veya otele gelip alıyor musunuz?', a: 'Evet. Eve ve otele alım-teslim yapıyoruz; adresinizi ve saat tercihinizi WhatsApp\'tan yazmanız yeterli.' },
  ],
  diger: [
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
  ],
  ctaBaslik: 'Kot pantolonunuz mu bol?',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Kot Pantolon Daraltma 200 TL\'den · Bacak ve Bel | Terzi Can' },
  description: '☎ +90 531 898 64 18 · Kot pantolon bacak ve bel daraltma 200 TL\'den. Ölçü üzerinizde alınır; normal iş aynı gün, acil 1–2 saat. Her gün 08–23.',
  keywords: [
    'kot pantolon daraltma',
    'kot daraltma fiyat',
    'kot pantolon bacak daraltma',
    'kot bel daraltma',
    'kot pantolon daraltma antalya',
    'jean daraltma terzi',
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: 'Kot Pantolon Daraltma Antalya · 200 TL\'den | Terzi Can', description: 'Kot pantolon bacak ve bel daraltma. Aynı gün teslim; Konyaaltı / Antalya.', url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} kargoKisa />;
}
