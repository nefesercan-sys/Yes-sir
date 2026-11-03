import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/mont-tamiri-tadilati-antalya';

const DATA: KonuData = {
  path: PATH,
  name: 'Mont Tamiri ve Tadilatı',
  h1: 'Mont Tamiri ve Tadilatı Antalya',
  kisa: 'Terzi Can, Antalya Konyaaltı\'nda mont boy ve kol kısaltma ile daraltmayı 200 TL\'den, mont fermuarı değişimini 300 TL\'den başlayan fiyatlarla yapar. Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.',
  waIlk: 'Merhaba, mont tamiri/tadilatı için fiyat almak istiyorum. Fotoğrafı gönderiyorum.',
  facts: [
    ['Başlangıç fiyatı', 'Tadilat 200 TL\'den · fermuar 300 TL\'den'],
    ['Teslim süresi', 'Normal iş aynı gün · acilde 1–2 saat'],
    ['Çalışma saatleri', 'Her gün 08:00–23:00'],
    ['Servis', 'Eve ve otele ücretsiz alım-teslim'],
  ],
  turlerBaslik: 'Montta hangi işleri yapıyoruz?',
  turler: [
    { ic: '📏', baslik: 'Boy ve kol kısaltma', aciklama: 'Mont boyu ve kol boyu, mont üzerinizdeyken işaretlenip kısaltılır.' },
    { ic: '📐', baslik: 'Daraltma', aciklama: 'Beden ve kol daraltma; yapılabilecek işlem fotoğraftan değerlendirilir.' },
    { ic: '🔧', baslik: 'Mont tamiri', aciklama: 'Söküklerin dikilmesi ve yırtık onarımı.' },
    { ic: '🧷', baslik: 'Fermuar değişimi', aciklama: 'Mont, kaban ve ceket fermuarı değişimi.' },
  ],
  fiyatBaslik: 'Mont tamir ve tadilat fiyatı',
  fiyatlar: [
    ['Mont boy / kol kısaltma', '200 TL\'den'],
    ['Mont daraltma', '200 TL\'den'],
    ['Mont fermuarı değişimi', '300 TL\'den'],
    ['Yırtık / sökük onarımı', 'Fotoğrafa göre fiyat'],
  ],
  fiyatNot: 'Fiyatlar başlangıç fiyatıdır; montun kumaşına ve işin kapsamına göre değişebilir. Net fiyat için fotoğrafı WhatsApp\'tan gönderin.',
  lowPrice: '200',
  adimlar: [
    { baslik: 'Fotoğraf gönderin', aciklama: 'Montun ve yapılacak yerin fotoğrafını WhatsApp\'tan yollayın.' },
    { baslik: 'Fiyat netleşir', aciklama: 'Yapılacak işe göre net fiyatı bildiririz.' },
    { baslik: 'Getirin ya da alalım', aciklama: 'Atölyeye bırakın ya da eve/otele ücretsiz alım-teslim isteyin.' },
    { baslik: 'Teslim', aciklama: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir.' },
  ],
  faq: [
    { q: 'Mont tamiri ve tadilatı ne kadar?', a: 'Mont boy/kol kısaltma ve daraltma 200 TL\'den, mont fermuarı değişimi 300 TL\'den başlar. Net fiyat fotoğrafla WhatsApp\'tan söylenir.' },
    { q: 'Mont kısaltma ve kol kısaltma yapıyor musunuz?', a: 'Evet. Boy ve kol, mont üzerinizdeyken işaretlenip kısaltılır; başlangıç fiyatı 200 TL\'dir.' },
    { q: 'Mont daraltma yapılıyor mu?', a: 'Evet, beden ve kol daraltma yapıyoruz; yapılabilecek işlem fotoğraftan değerlendirilir.' },
    { q: 'Mont fermuarı değişiyor mu?', a: 'Evet. Mont, kaban ve ceket fermuarı değişimi 300 TL\'den başlar.' },
    { q: 'Mont tadilatı ne kadar sürer?', a: 'Normal işler aynı gün, acil işler 1–2 saatte teslim edilir. Kapsamlı işlerde süreyi fotoğrafı görünce söyleriz.' },
    { q: 'Eve veya otele gelip alıyor musunuz?', a: 'Evet. Eve ve otele alım-teslim tüm hizmet bölgelerimizde ücretsizdir; adresinizi ve saat tercihinizi WhatsApp\'tan yazmanız yeterli.' },
  ],
  diger: [
    { href: '/terzi/kaban-palto-tadilati-antalya', ad: 'Kaban ve palto tadilatı' },
    { href: '/terzi/yelek-tamiri-tadilati-antalya', ad: 'Yelek tamiri ve tadilatı' },
    { href: '/terzi/fermuar-degisimi', ad: 'Fermuar değişimi' },
    { href: '/terzi/deri-ceket-tadilati-antalya', ad: 'Deri ceket tadilatı' },
    { href: '/terzi/kot-ceket-mont-tadilati-antalya', ad: 'Kot ceket ve mont' },
    { href: '/terzi/paca-kisaltma-antalya', ad: 'Paça kısaltma' },
    { href: '/terzi', ad: 'Tüm terzi hizmetleri' },
  ],
  ctaBaslik: 'Montunuzu mu yaptıracaksınız?',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Mont Tamiri Tadilatı 200 TL\'den · Fermuar 300 TL' },
  description: 'Mont boy ve kol kısaltma, daraltma 200 TL\'den; mont fermuarı değişimi 300 TL\'den. Normal iş aynı gün, acil 1–2 saat. Her gün 08–23. ☎ +90 531 898 64 18',
  keywords: ['mont tamiri','mont tadilatı','mont kısaltma','mont daraltma','mont kol kısaltma','mont tamiri antalya','mont tadilatı fiyat','kaban tadilatı'],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: 'Mont Tamiri ve Tadilatı Antalya | Terzi Can', description: 'Mont kısaltma, daraltma, tamir ve fermuar değişimi. Aynı gün; Konyaaltı / Antalya.', url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} />;
}
