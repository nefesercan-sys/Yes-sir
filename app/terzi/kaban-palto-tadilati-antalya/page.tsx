import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/kaban-palto-tadilati-antalya';

const DATA: KonuData = {
  "path": "/terzi/kaban-palto-tadilati-antalya",
  "name": "Kaban ve Palto Tadilatı",
  "h1": "Kaban ve Palto Tadilatı Antalya",
  "kisa": "Kaban ve palto boy-kol kısaltma ve daraltma 200 TL'den, fermuar değişimi 300 TL'den başlar; astar, düğme ve söküklerin onarımı fotoğrafa göre fiyatlanır. Normal işler aynı gün teslim edilir.",
  "waIlk": "Merhaba, kaban veya palto tadilatı için fiyat almak istiyorum. Fotoğrafı gönderiyorum.",
  "facts": [
    [
      "Başlangıç fiyatı",
      "Kısaltma/daraltma 200 TL'den · fermuar 300 TL'den"
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
      "Eve ve otele ücretsiz alım-teslim"
    ]
  ],
  "turlerBaslik": "Kaban ve Palto Tadilatı kapsamı",
  "turler": [
    {
      "ic": "📏",
      "baslik": "Boy ve kol kısaltma",
      "aciklama": "Boy ve kol, kaban veya palto üzerinizdeyken işaretlenir; astar ve kumaş boyuna göre kısaltılır."
    },
    {
      "ic": "📐",
      "baslik": "Daraltma",
      "aciklama": "Beden, bel ve kol daraltma; yün, kaşmir ve kalın kumaşlarda yapılabilecek işlem fotoğraftan değerlendirilir."
    },
    {
      "ic": "🪡",
      "baslik": "Astar ve düğme",
      "aciklama": "Yırtılan astarın onarımı veya değişimi, düğme takılması ve düğme değişimi."
    },
    {
      "ic": "🧷",
      "baslik": "Fermuar, cep, yaka",
      "aciklama": "Kaban fermuarı değişimi, cep ağzı ve yaka onarımı."
    }
  ],
  "fiyatBaslik": "Kaban ve Palto Tadilatı fiyatı",
  "fiyatlar": [
    [
      "Kaban / Palto Boy Kısaltma",
      "200 TL'den"
    ],
    [
      "Kaban / Palto Kol Kısaltma",
      "200 TL'den"
    ],
    [
      "Kaban / Palto Daraltma",
      "200 TL'den"
    ],
    [
      "Kaban / Palto Fermuarı",
      "300 TL'den"
    ],
    [
      "Astar, Düğme, Cep, Yaka Onarımı",
      "Fotoğrafa göre fiyat"
    ]
  ],
  "fiyatNot": "Net fiyat için fotoğrafı WhatsApp'tan gönderin; fiyatlar KDV dahil değildir.",
  "adimlar": [
    {
      "baslik": "Fotoğraf Gönderin",
      "aciklama": "Kaban veya paltonun ve yapılacak yerin fotoğrafını WhatsApp'tan gönderin."
    },
    {
      "baslik": "Fiyat netleşir",
      "aciklama": "Yapılacak işe göre net fiyatı bildiririz."
    },
    {
      "baslik": "Getirin ya da alalım",
      "aciklama": "Atölyeye bırakın ya da eve/otele ücretsiz alım-teslim isteyin."
    },
    {
      "baslik": "Teslim",
      "aciklama": "Normal işler aynı gün, acil işler 1–2 saatte teslim edilir."
    }
  ],
  "faq": [
    {
      "q": "Kaban ve palto tadilatı ne kadar?",
      "a": "Kaban ve palto boy/kol kısaltma ve daraltma 200 TL'den, fermuar değişimi 300 TL'den başlar. Astar, düğme ve onarım işleri kapsama göre fotoğrafla fiyatlanır."
    },
    {
      "q": "Paltonun boyu kısaltılır mı?",
      "a": "Evet. Palto boyu üzerinizdeyken işaretlenir; astar ve kumaş boyuna göre kısaltılır. Başlangıç fiyatı ₺200'dür."
    },
    {
      "q": "Kaban kolu kısaltma ve daraltma yapılıyor mu?",
      "a": "Evet. Kol boyu kısaltılır, kol ve beden daraltılır; kumaş ve astara göre yapılabilecek işlem fotoğraftan değerlendirilir."
    },
    {
      "q": "Palto astarı değişir mi?",
      "a": "Evet. Yırtılan veya eskiyen astar onarılır ya da değiştirilir; fiyat işin kapsamına göre fotoğrafla söylenir."
    },
    {
      "q": "Kaban fermuarı veya düğmesi değişiyor mu?",
      "a": "Evet. Kaban fermuarı değişimi 300 TL'den başlar; düğme takma ve değiştirme yapılır."
    },
    {
      "q": "Kaban ve palto tadilatı ne kadar sürer?",
      "a": "Normal işler aynı gün, acil işler 1–2 saatte teslim edilir. Kapsamlı işlerde süreyi fotoğrafı görünce söyleriz."
    },
    {
      "q": "Kaban ve paltoyu eve veya otele gelip alıyor musunuz?",
      "a": "Evet. Konyaaltı, Muratpaşa ve çevresinde eve ve otele alım-teslim ücretsizdir."
    }
  ],
  "lowPrice": "200",
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
  "ctaBaslik": "Kaban veya Paltonuzu mu Yaptıracaksınız?"
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: "Kaban ve Palto Tadilatı 200 TL'den · Antalya" },
  description: "Kaban ve palto boy, kol kısaltma ve daraltma 200 TL'den; fermuar değişimi 300 TL'den. Astar ve düğme onarımı. Eve ve otele ücretsiz. ☎ +90 531 898 64 18",
  keywords: ["kaban tadilatı", "palto tadilatı", "kaban kısaltma", "palto kısaltma", "palto daraltma", "kaban kol kısaltma", "palto astar değişimi", "kaban düğme değişimi", "palto tamiri Antalya"],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: "Kaban ve Palto Tadilatı Antalya | Terzi Can", description: "Kaban ve palto boyu, kol boyu, bel ve beden daraltma; astar, düğme, cep ve yaka onarımı. Eve ve otele ücretsiz servis.", url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} />;
}
