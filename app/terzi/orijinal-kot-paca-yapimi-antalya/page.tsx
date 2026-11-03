import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/orijinal-kot-paca-yapimi-antalya';

const DATA: KonuData = {
  path: PATH,
  name: 'Orijinal Kot Paça Yapımı',
  h1: 'Orijinal Kot Paça Yapımı Antalya',
  kisa: 'Terzi Can, Antalya Konyaaltı\'nda kot pantolon paçasını kısaltırken orijinal paça görünümünü korur; fiyat 200 TL\'den başlar. Boy giyeceğiniz ayakkabıyla işaretlenir, normal işler aynı gün teslim edilir.',
  waIlk: 'Merhaba, orijinal kot paça yapımı için fiyat almak istiyorum. Fotoğrafı gönderiyorum.',
  facts: [
    ['Başlangıç fiyatı', '200 TL\'den'],
    ['Teslim süresi', 'Normal iş aynı gün · acilde 1–2 saat'],
    ['Çalışma saatleri', 'Her gün 08:00–23:00'],
    ['Servis', 'Eve ve otele ücretsiz alım-teslim'],
  ],
  turlerBaslik: 'Orijinal paça yapımında neler yapıyoruz?',
  turler: [
    { ic: '🧵', baslik: 'Orijinal paça görünümü', aciklama: 'Kısaltma, paçanın orijinal paça görünümünü koruyacak şekilde yapılır.' },
    { ic: '👟', baslik: 'Ayakkabıyla boy', aciklama: 'Boy, giyeceğiniz ayakkabıyla üzerinizde işaretlenir.' },
  ],
  fiyatBaslik: 'Orijinal paça fiyatı',
  fiyatlar: [
    ['Orijinal paça ile kot kısaltma', '200 TL\'den'],
  ],
  fiyatNot: 'Fiyatlar başlangıç fiyatıdır; kumaş kalınlığına ve işin kapsamına göre değişebilir. Net fiyat için fotoğrafı WhatsApp\'tan gönderin.',
  lowPrice: '200',
  adimlar: [
    { baslik: 'Fotoğraf gönderin', aciklama: 'Paçanın yakın fotoğrafını ve istediğiniz boyu WhatsApp\'tan yollayın.' },
    { baslik: 'Fiyat netleşir', aciklama: 'Net fiyatı bildiririz.' },
    { baslik: 'Getirin ya da alalım', aciklama: 'Atölyeye bırakın ya da eve/otele ücretsiz alım-teslim isteyin.' },
    { baslik: 'Teslim', aciklama: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
  ],
  faq: [
    { q: 'Orijinal kot paça yapımı ne kadar?', a: 'Orijinal paça görünümünü koruyarak kot paça kısaltma 200 TL\'den başlar; net fiyat fotoğrafla söylenir.' },
    { q: 'Orijinal paça yapımı nedir?', a: 'Kot pantolon kısaltılırken paçanın orijinal paça görünümünü koruyacak şekilde dikilmesidir.' },
    { q: 'Boy nasıl belirlenir?', a: 'Boy, pantolonu ve giyeceğiniz ayakkabıyı giyerken üzerinizde işaretlenir. Uzaktan ise paçanın yakın fotoğrafını ve istediğiniz boyu gönderin.' },
    { q: 'Orijinal paça yapımı ne kadar sürer?', a: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
    { q: 'Eve veya otele gelip alıyor musunuz?', a: 'Evet. Eve ve otele alım-teslim tüm hizmet bölgelerimizde ücretsizdir; adresinizi ve saat tercihinizi WhatsApp\'tan yazmanız yeterli.' },
  ],
  diger: [
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
    { href: 'href', ad: 'ad' },
  ],
  ctaBaslik: 'Paçanın orijinal kalmasını mı istiyorsunuz?',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Orijinal Kot Paça 200 TL\'den · Paça Kısaltma | Terzi Can' },
  description: 'Kot paçasını kısaltırken orijinal paça görünümünü koruyoruz, 200 TL\'den. Boy ayakkabıyla işaretlenir; normal iş aynı gün. ☎ +90 531 898 64 18',
  keywords: [
    'orijinal kot paça yapımı',
    'orijinal paça kot kısaltma',
    'kot paça orijinal dikiş',
    'orijinal paça kısaltma fiyat',
    'kot paça kısaltma antalya',
  ],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: 'Orijinal Kot Paça Yapımı Antalya · 200 TL\'den | Terzi Can', description: 'Kot paça kısaltırken orijinal paça görünümü korunur. Aynı gün; Konyaaltı / Antalya.', url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} />;
}
