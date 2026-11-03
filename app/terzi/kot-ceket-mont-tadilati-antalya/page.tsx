import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/kot-ceket-mont-tadilati-antalya';

const DATA: KonuData = {
  path: PATH,
  name: 'Kot Ceket ve Kot Mont Tadilatı',
  h1: 'Kot Ceket ve Mont Tadilatı Antalya',
  kisa: 'Terzi Can, Antalya Konyaaltı\'nda kot ceket ve kot mont kol/boy kısaltma ve daraltmayı 200 TL\'den başlayan fiyatlarla yapar; orijinal dikiş görünümü korunur. Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.',
  waIlk: 'Merhaba, kot ceket/mont tadilatı için fiyat almak istiyorum. Fotoğrafı gönderiyorum.',
  facts: [
    ['Başlangıç fiyatı', '200 TL\'den'],
    ['Teslim süresi', 'Normal iş aynı gün · acilde 1–2 saat'],
    ['Çalışma saatleri', 'Her gün 08:00–23:00'],
    ['Servis', 'Eve ve otele ücretsiz alım-teslim'],
  ],
  turlerBaslik: 'Kot ceket ve montta neler yapıyoruz?',
  turler: [
    { ic: '🧥', baslik: 'Kol kısaltma', aciklama: 'Kol boyu ceket üzerinizdeyken işaretlenir ve kısaltılır.' },
    { ic: '📏', baslik: 'Boy kısaltma', aciklama: 'Ceket ve mont boyu ölçünüze göre ayarlanır.' },
    { ic: '📐', baslik: 'Daraltma', aciklama: 'Beden ve kol daraltma; orijinal dikiş görünümü korunacak şekilde.' },
  ],
  fiyatBaslik: 'Kot ceket ve mont fiyatı',
  fiyatlar: [
    ['Kol kısaltma', '200 TL\'den'],
    ['Boy kısaltma', '200 TL\'den'],
    ['Beden / kol daraltma', '200 TL\'den'],
  ],
  fiyatNot: 'Fiyatlar başlangıç fiyatıdır; kumaş kalınlığına ve işin kapsamına göre değişebilir. Net fiyat için fotoğrafı WhatsApp\'tan gönderin.',
  lowPrice: '200',
  adimlar: [
    { baslik: 'Fotoğraf gönderin', aciklama: 'Kot ceketin veya montun fotoğrafını WhatsApp\'tan yollayın.' },
    { baslik: 'Fiyat netleşir', aciklama: 'Yapılacak işe göre net fiyatı size bildiririz.' },
    { baslik: 'Getirin ya da alalım', aciklama: 'Atölyeye bırakın ya da eve/otele ücretsiz alım-teslim isteyin.' },
    { baslik: 'Teslim', aciklama: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
  ],
  faq: [
    { q: 'Kot ceket kısaltma ve daraltma ne kadar?', a: 'Kot ceket ve kot mont kol/boy kısaltma ve daraltma 200 TL\'den başlar; net fiyat fotoğrafla söylenir.' },
    { q: 'Kot ceketin kolu kısaltılır mı?', a: 'Evet. Kol boyu ceket üzerinizdeyken işaretlenir; kısaltma 200 TL\'den başlar.' },
    { q: 'Kot ceket veya mont daraltılır mı?', a: 'Evet, beden ve kol daraltma yapıyoruz. Kumaş payına göre yapılabilecek işlem fotoğraftan değerlendirilir.' },
    { q: 'Orijinal dikiş görünümü korunur mu?', a: 'Orijinal dikiş görünümünü koruyacak şekilde çalışıyoruz; fotoğraf gönderirseniz yapılabilecek işlemi söyleriz.' },
    { q: 'Kot mont tadilatı ne kadar sürer?', a: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
    { q: 'Eve veya otele gelip alıyor musunuz?', a: 'Evet. Eve ve otele alım-teslim tüm hizmet bölgelerimizde ücretsizdir; adresinizi ve saat tercihinizi WhatsApp\'tan yazmanız yeterli.' },
  ],
  diger: [
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
  ],
  ctaBaslik: 'Kot ceketiniz mi büyük?',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Kot Ceket ve Kot Mont Tadilatı 200 TL\'den · Aynı Gün | Terzi Can' },
  description: 'Kot ceket ve kot mont kol kısaltma, boy kısaltma, daraltma ve orijinal görünümde dikiş 200 TL\'den. Normal iş aynı gün. ☎ +90 531 898 64 18',
  keywords: [
    'kot ceket kısaltma',
    'kot ceket daraltma',
    'kot mont kısaltma',
    'kot mont daraltma',
    'kot ceket kol kısaltma',
    'kot ceket tadilatı fiyat',
    'kot mont tadilatı antalya',
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: 'Kot Ceket ve Mont Tadilatı Antalya · 200 TL\'den | Terzi Can', description: 'Kot ceket ve mont kısaltma, daraltma, orijinal dikiş. Aynı gün; Konyaaltı / Antalya.', url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} />;
}
