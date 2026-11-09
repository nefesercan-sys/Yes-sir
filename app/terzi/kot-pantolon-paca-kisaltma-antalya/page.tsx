import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/kot-pantolon-paca-kisaltma-antalya';

const DATA: KonuData = {
  path: PATH,
  name: 'Kot Pantolon Paça Kısaltma ve Daraltma',
  h1: 'Kot Pantolon Paça Kısaltma Antalya',
  kisa: 'Terzi Can, Antalya Konyaaltı\'nda kot pantolon paça kısaltma ve daraltmayı 200 TL\'den başlayan fiyatlarla yapar; orijinal paça görünümü korunur. Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.',
  waIlk: 'Merhaba, kot pantolon paça kısaltma/daraltma için fiyat almak istiyorum. Fotoğrafı gönderiyorum.',
  facts: [
    ['Başlangıç fiyatı', '200 TL\'den'],
    ['Teslim süresi', 'Normal iş aynı gün · acilde 1–2 saat'],
    ['Çalışma saatleri', 'Her gün 08:00–23:00'],
    ['Servis', 'Eve ve otele alım-teslim'],
  ],
  turlerBaslik: 'Kot pantolonda neler yapıyoruz?',
  turler: [
    { ic: '✂️', baslik: 'Paça kısaltma', aciklama: 'Boy üzerinizde işaretlenir; kalın kot kumaşa uygun makine ve iplikle kısaltılır.' },
    { ic: '🧵', baslik: 'Orijinal paça', aciklama: 'Paçanın orijinal paça görünümünü koruyacak şekilde kısaltma yapılır.' },
    { ic: '📐', baslik: 'Daraltma', aciklama: 'Bacak ve bel daraltma; ölçü size göre ayarlanır.' },
  ],
  fiyatBaslik: 'Kot pantolon fiyatı',
  fiyatlar: [
    ['Kot paça kısaltma', '200 TL\'den'],
    ['Kot pantolon daraltma', '200 TL\'den'],
    ['Orijinal paça yapımı', '200 TL\'den'],
  ],
  fiyatNot: 'Fiyatlar başlangıç fiyatıdır; kumaş kalınlığına ve işin kapsamına göre değişebilir. Net fiyat için fotoğrafı WhatsApp\'tan gönderin.',
  lowPrice: '200',
  adimlar: [
    { baslik: 'Fotoğraf gönderin', aciklama: 'Kot pantolonun fotoğrafını WhatsApp\'tan yollayın.' },
    { baslik: 'Fiyat netleşir', aciklama: 'Yapılacak işe göre net fiyatı size bildiririz.' },
    { baslik: 'Getirin ya da alalım', aciklama: 'Atölyeye bırakın ya da eve/otele alım-teslim isteyin.' },
    { baslik: 'Teslim', aciklama: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
  ],
  faq: [
    { q: 'Kot pantolon paça kısaltma ne kadar?', a: 'Kot pantolon paça kısaltma 200 TL\'den başlar; net fiyat fotoğrafla WhatsApp\'tan söylenir.' },
    { q: 'Kot paçası orijinal paça gibi yapılır mı?', a: 'Evet, paçanın orijinal paça görünümünü koruyacak şekilde kısaltma yapıyoruz. Fotoğraf gönderirseniz yapılabilecek işlemi ve fiyatı söyleriz.' },
    { q: 'Kot pantolon daraltma yapıyor musunuz?', a: 'Evet. Kot pantolonda bacak ve bel daraltma 200 TL\'den başlar.' },
    { q: 'Kot paça kısaltma ne kadar sürer?', a: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
    { q: 'Eve veya otele gelip alıyor musunuz?', a: 'Evet. Eve ve otele alım-teslim yapıyoruz; adresinizi ve saat tercihinizi WhatsApp\'tan yazmanız yeterli.' },
  ],
  diger: [
    { href: '/terzi/kot-pantolon-daraltma-antalya', ad: 'Kot pantolon daraltma' },
    { href: '/terzi/orijinal-kot-paca-yapimi-antalya', ad: 'Orijinal kot paça' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
  ],
  ctaBaslik: 'Kot pantolonunuz mu uzun?',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Kot Paça Kısaltma 200 TL\'den · Orijinal Paça | Terzi Can' },
  description: 'Kot pantolon paça kısaltma, orijinal paça yapımı ve daraltma 200 TL\'den. Normal iş aynı gün, acil 1–2 saat. Her gün 08–23. ☎ +90 531 898 64 18',
  keywords: [
    'kot pantolon paça kısaltma',
    'kot paçası kısaltma',
    'kot paça yapımı',
    'kot pantolon orijinal paça',
    'kot pantolon daraltma',
    'kot pantolon kısaltma fiyat',
    'jean paça kısaltma antalya',
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: 'Kot Pantolon Paça Kısaltma Antalya · 200 TL\'den | Terzi Can', description: 'Kot paça kısaltma, orijinal paça ve daraltma. Aynı gün teslim; Konyaaltı / Antalya.', url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} kargoKisa />;
}
