import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/kot-etek-kisaltma-daraltma-antalya';

const DATA: KonuData = {
  path: PATH,
  name: 'Kot Etek Kısaltma ve Daraltma',
  h1: 'Kot Etek Kısaltma ve Daraltma Antalya',
  kisa: 'Terzi Can, Antalya Konyaaltı\'nda kot etek boy kısaltma ve bel daraltmayı 200 TL\'den başlayan fiyatlarla yapar; orijinal etek ucu görünümü korunur. Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.',
  waIlk: 'Merhaba, kot etek kısaltma/daraltma için fiyat almak istiyorum. Fotoğrafı gönderiyorum.',
  facts: [
    ['Başlangıç fiyatı', '200 TL\'den'],
    ['Teslim süresi', 'Normal iş aynı gün · acilde 1–2 saat'],
    ['Çalışma saatleri', 'Her gün 08:00–23:00'],
    ['Servis', 'Eve ve otele ücretsiz alım-teslim'],
  ],
  turlerBaslik: 'Kot etekte neler yapıyoruz?',
  turler: [
    { ic: '📏', baslik: 'Boy kısaltma', aciklama: 'Etek boyu üzerinizde işaretlenir ve kısaltılır.' },
    { ic: '🧵', baslik: 'Orijinal etek ucu', aciklama: 'Eteğin orijinal ucu görünümünü koruyacak şekilde kısaltma yapılır.' },
    { ic: '📐', baslik: 'Bel ve kalça daraltma', aciklama: 'Ölçünüze göre daraltma yapılır.' },
  ],
  fiyatBaslik: 'Kot etek fiyatı',
  fiyatlar: [
    ['Kot etek boy kısaltma', '200 TL\'den'],
    ['Kot etek bel daraltma', '200 TL\'den'],
    ['Orijinal etek ucu', 'Fotoğrafa göre fiyat'],
  ],
  fiyatNot: 'Fiyatlar başlangıç fiyatıdır; kumaş kalınlığına ve işin kapsamına göre değişebilir. Net fiyat için fotoğrafı WhatsApp\'tan gönderin.',
  lowPrice: '200',
  adimlar: [
    { baslik: 'Fotoğraf gönderin', aciklama: 'Kot eteğin fotoğrafını WhatsApp\'tan yollayın.' },
    { baslik: 'Fiyat netleşir', aciklama: 'Yapılacak işe göre net fiyatı size bildiririz.' },
    { baslik: 'Getirin ya da alalım', aciklama: 'Atölyeye bırakın ya da eve/otele ücretsiz alım-teslim isteyin.' },
    { baslik: 'Teslim', aciklama: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
  ],
  faq: [
    { q: 'Kot etek kısaltma ne kadar?', a: 'Kot etek boy kısaltma 200 TL\'den başlar; net fiyat fotoğrafla söylenir.' },
    { q: 'Kot etek orijinal ucuyla kısaltılır mı?', a: 'Evet, orijinal etek ucu görünümünü koruyacak şekilde kısaltma yapıyoruz.' },
    { q: 'Kot etek daraltma yapıyor musunuz?', a: 'Evet. Bel ve kalça daraltma 200 TL\'den başlar.' },
    { q: 'Kot etek tadilatı ne kadar sürer?', a: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
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
  ctaBaslik: 'Kot eteğiniz mi uzun?',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Kot Etek Kısaltma ve Daraltma 200 TL\'den · Aynı Gün | Terzi Can' },
  description: 'Kot etek boy kısaltma, bel daraltma ve orijinal etek ucu yapımı 200 TL\'den. Normal iş aynı gün, acil 1–2 saat. ☎ +90 531 898 64 18',
  keywords: [
    'kot etek kısaltma',
    'kot etek daraltma',
    'kot etek boy kısaltma',
    'kot etek bel daraltma',
    'kot etek orijinal ucu',
    'kot etek tadilatı antalya',
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: 'Kot Etek Kısaltma Antalya · 200 TL\'den | Terzi Can', description: 'Kot etek kısaltma, daraltma ve orijinal etek ucu. Aynı gün; Konyaaltı / Antalya.', url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} />;
}
