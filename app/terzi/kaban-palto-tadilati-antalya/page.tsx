import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/kaban-palto-tadilati-antalya';

const DATA: KonuData = {
  "name": "Kaban ve Palto Tadilatı",
  "h1": "Kaban ve Palto Kısaltma, Daraltma · Antalya",
  "kisa": "Palto uzun mu geldi, kaban kolu elinizi mi kapatıyor, astar mı yırtıldı? Boy ve kol kısaltma ile daraltma 200 TL'den, fermuar değişimi 300 TL'den başlar (KDV hariç). Fotoğrafı WhatsApp'tan gönderin, net fiyatı öğrenin.",
  "waIlk": "Merhaba, kabanım/paltom için tadilat fiyatı öğrenmek istiyorum. Fotoğrafını gönderiyorum.",
  "facts": [
    [
      "Başlangıç fiyatı",
      "Kısaltma ve daraltma 200 TL'den · fermuar 300 TL'den"
    ],
    [
      "Teslim süresi",
      "Normal iş aynı gün · acilde 1–2 saat"
    ],
    [
      "Çalışma saatleri",
      "Her gün 08:00–23:00"
    ],
    [
      "Servis",
      "Eve ve otele alım-teslim"
    ]
  ],
  "turlerBaslik": "Kaban ve paltoda en sık gelen sorunlar",
  "turler": [
    {
      "ic": "📏",
      "baslik": "Kol elinizi kapatıyor",
      "aciklama": "Kol boyu üzerinizde işaretlenir ve astarıyla birlikte kısaltılır; manşet ve kol düğmeleri yerine göre taşınır."
    },
    {
      "ic": "✂️",
      "baslik": "Palto fazla uzun",
      "aciklama": "Etek boyu kısaltılır. Kalın yünlü ve kaşe kumaşta etek ucu ve astar birlikte yeniden dikilir."
    },
    {
      "ic": "📐",
      "baslik": "Beden bol, omuz düşük",
      "aciklama": "Bel ve beden yan dikişlerden daraltılır. Omuz gibi kapsamlı işler kumaşa ve kalıba bağlıdır; fotoğraftan değerlendirip söyleriz."
    },
    {
      "ic": "🪡",
      "baslik": "Astar, düğme, fermuar, cep",
      "aciklama": "Yırtılan astar onarılır ya da değişir; düğme, fermuar, cep ağzı ve yaka yenilenir."
    }
  ],
  "fiyatBaslik": "Kaban ve palto tadilatı kaç TL?",
  "fiyatlar": [
    [
      "Kaban / palto kol kısaltma",
      "200 TL'den"
    ],
    [
      "Kaban / palto boy kısaltma",
      "200 TL'den"
    ],
    [
      "Bel ve beden daraltma",
      "200 TL'den"
    ],
    [
      "Kaban fermuarı değişimi",
      "300 TL'den"
    ],
    [
      "Astar, düğme, cep, yaka",
      "Fotoğrafa göre fiyat"
    ]
  ],
  "fiyatNot": "Fiyatlar başlangıç fiyatıdır ve KDV dahil değildir. Kalın kumaş, astar ve işin kapsamı fiyatı etkiler; net fiyat fotoğrafa göre söylenir.",
  "adimlar": [
    {
      "baslik": "Sorunu fotoğraflayın",
      "aciklama": "Kabanı üzerinizde çekin; kısalacak ya da daralacak yeri gösterin ve WhatsApp'tan gönderin."
    },
    {
      "baslik": "Fiyatı öğrenin",
      "aciklama": "Kumaşa ve işe bakıp net fiyatı yazarız."
    },
    {
      "baslik": "Bırakın ya da aldıralım",
      "aciklama": "Konyaaltı Hurma'daki atölyeye getirebilir ya da evinizden, otelinizden aldırabilirsiniz."
    },
    {
      "baslik": "Hazır olunca haber veririz",
      "aciklama": "Normal işler aynı gün, acil işler 1–2 saatte, işin durumuna göre hazır olur."
    }
  ],
  "faq": [
    {
      "q": "Palto kısaltma kaç TL?",
      "a": "Palto ve kaban boy kısaltma 200 TL'den başlar; fiyata KDV dahil değildir. Astarlı ve kalın kumaşlarda net fiyatı fotoğrafa göre söyleriz."
    },
    {
      "q": "Kaban kolu kısaltılır mı?",
      "a": "Evet, 200 TL'den başlar. Kol astarıyla birlikte kısaltılır; kolda fermuar, düğme ya da manşet varsa buna göre fiyat veririz."
    },
    {
      "q": "Hazır aldığım palto bol geldi, daraltılır mı?",
      "a": "Bel ve beden daraltma 200 TL'den başlar. Ne kadar daraltılabileceği dikiş payına ve kumaşa bağlıdır; fotoğraftan değerlendiririz."
    },
    {
      "q": "Paltonun astarı yırtıldı, değişir mi?",
      "a": "Evet. Küçük yırtıklar onarılır, eskiyen astar değiştirilir. Fiyat astarın ne kadarının değişeceğine göre fotoğrafla söylenir."
    },
    {
      "q": "Kaban fermuarı değişimi ne kadar?",
      "a": "Kaban ve palto fermuarı değişimi 300 TL'den başlar; fermuarın boyu ve türü fiyatı etkiler."
    },
    {
      "q": "Kaban tadilatı ne kadar sürer?",
      "a": "Normal işler aynı gün, acil durumda 1–2 saatte hazır olur. Kapsamlı işlerde süreyi fotoğrafı görünce söyleriz."
    },
    {
      "q": "Kabanı kargoyla gönderebilir miyim?",
      "a": "Evet. Antalya içinden ve yurt dışından kargoyla gönderebilirsiniz; kargo ücreti müşteriye aittir, ayrıntı WhatsApp'tan netleştirilir."
    }
  ],
  "ctaBaslik": "Kaban veya Paltonuzun Fotoğrafını Gönderin",
  "path": "/terzi/kaban-palto-tadilati-antalya",
  "diger": [
    {
      "href": "/terzi/mont-tamiri-tadilati-antalya",
      "ad": "Mont tamiri ve tadilatı"
    },
    {
      "href": "/terzi/deri-ceket-tadilati-antalya",
      "ad": "Deri ceket tadilatı"
    },
    {
      "href": "/terzi/kot-ceket-mont-tadilati-antalya",
      "ad": "Kot ceket ve mont"
    },
    {
      "href": "/terzi/fermuar-degisimi",
      "ad": "Fermuar değişimi"
    },
    {
      "href": "/terzi",
      "ad": "Tüm terzi hizmetleri"
    }
  ],
  "lowPrice": "200"
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: "Palto ve Kaban Kısaltma Kaç TL? 200 TL'den · Antalya" },
  description: "Palto uzun, kaban kolu uzun ya da beden bol mu? Kısaltma ve daraltma 200 TL'den, fermuar 300 TL'den (KDV hariç). Fotoğraf gönderin. ☎ +90 531 898 64 18",
  keywords: ["kaban tadilatı", "palto tadilatı", "kaban kısaltma", "palto kısaltma", "palto daraltma", "kaban kol kısaltma", "palto astar değişimi", "kaban düğme değişimi", "palto tamiri Antalya"],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: "Kaban ve Palto Kısaltma, Daraltma | Terzi Can Antalya", description: "Uzun kol, uzun etek, bol beden, yırtık astar: fotoğrafı gönderin, net fiyatı öğrenin. Normal işler aynı gün.", url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} kargoFermuar />;
}
