import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/yelek-tamiri-tadilati-antalya';

const DATA: KonuData = {
  "name": "Yelek Tamiri ve Tadilatı",
  "h1": "Yelek Daraltma, Tamir ve Fermuar · Antalya",
  "kisa": "Yeleğiniz bol mu geliyor, fermuarı mı bozuldu, düğmesi mi koptu? Yelek daraltma ve boy ayarı 200 TL'den, fermuar değişimi 300 TL'den, deri yelek işleri 400 TL'den başlar (KDV hariç). Fotoğrafı WhatsApp'tan gönderin, net fiyatı öğrenin.",
  "waIlk": "Merhaba, yeleğimde tadilat yaptırmak istiyorum. Fotoğrafını gönderiyorum, fiyat alabilir miyim?",
  "facts": [
    [
      "Başlangıç fiyatı",
      "Daraltma 200 TL'den · fermuar 300 TL'den · deri 400 TL'den"
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
  "turlerBaslik": "Yelekte en sık gelen sorunlar",
  "turler": [
    {
      "ic": "📐",
      "baslik": "Yelek bol duruyor",
      "aciklama": "Kilo verdikten sonra ya da hazır alınan takımda yelek bol kalır. Sırt ve yan dikişlerden içeri alınarak vücuda oturtulur."
    },
    {
      "ic": "📏",
      "baslik": "Yelek uzun ya da kol evi geniş",
      "aciklama": "Boy kısaltılır, kol evi daraltılır. İşaretleme yelek üzerinizdeyken yapılır; gelemiyorsanız ölçüyü WhatsApp'tan birlikte alırız."
    },
    {
      "ic": "🧷",
      "baslik": "Fermuar takılıyor ya da açılıyor",
      "aciklama": "Şişme, kot ve deri yeleklerde bozulan fermuar aynı boyda yenisiyle değiştirilir."
    },
    {
      "ic": "🪡",
      "baslik": "Düğme, astar, cep",
      "aciklama": "Kopan düğme, yırtılan astar, sökülen cep ağzı ve dikişler onarılır."
    }
  ],
  "fiyatBaslik": "Yelek tadilatı kaç TL?",
  "fiyatlar": [
    [
      "Yelek daraltma (kumaş, kot)",
      "200 TL'den"
    ],
    [
      "Yelek boy kısaltma",
      "200 TL'den"
    ],
    [
      "Yelek fermuarı değişimi",
      "300 TL'den"
    ],
    [
      "Deri yelek tadilatı",
      "400 TL'den"
    ],
    [
      "Düğme, astar, cep, sökük",
      "Fotoğrafa göre fiyat"
    ]
  ],
  "fiyatNot": "Fiyatlar başlangıç fiyatıdır ve KDV dahil değildir. Net fiyat işin fotoğrafına göre WhatsApp'tan söylenir.",
  "adimlar": [
    {
      "baslik": "Sorunu fotoğraflayın",
      "aciklama": "Yeleği üzerinizde ve sorunlu yeri yakından çekip WhatsApp'tan gönderin."
    },
    {
      "baslik": "Fiyatı öğrenin",
      "aciklama": "Hangi işlemin gerektiğini ve net fiyatı yazarız."
    },
    {
      "baslik": "Bırakın ya da aldıralım",
      "aciklama": "Yeleği Konyaaltı Hurma'daki atölyeye getirebilir ya da evinizden, otelinizden aldırabilirsiniz."
    },
    {
      "baslik": "Hazır olunca haber veririz",
      "aciklama": "Normal işler aynı gün, acil işler 1–2 saatte, işin durumuna göre hazır olur."
    }
  ],
  "faq": [
    {
      "q": "Yelek daraltma kaç TL?",
      "a": "Kumaş ve kot yelek daraltma 200 TL'den, deri yelek 400 TL'den başlar; fiyatlara KDV dahil değildir. Net fiyat için fotoğraf yeterli."
    },
    {
      "q": "Takım elbisemin yeleği bol geliyor, düzelir mi?",
      "a": "Çoğu yelek sırt ve yan dikişlerinden içeri alınabilir. Ne kadar daraltılabileceği dikiş payına bağlıdır; fotoğrafa bakıp söyleriz."
    },
    {
      "q": "Şişme yeleğin fermuarı bozuldu, değişir mi?",
      "a": "Evet, fermuar değişimi 300 TL'den başlar. Şişme yelekte fermuar aynı boyda yenisiyle değiştirilir."
    },
    {
      "q": "Deri yelek tadilatı yapıyor musunuz?",
      "a": "Evet. Deri yelekte daraltma, kısaltma ve fermuar işleri 400 TL'den başlar; deride yapılabilecek işlem fotoğraftan değerlendirilir."
    },
    {
      "q": "Yeleği ne zaman teslim alırım?",
      "a": "Normal işler aynı gün hazır olur, acil durumda 1–2 saatte. Süre işin durumuna göre değişir, yazarken size söyleriz."
    },
    {
      "q": "Atölyeye gelemiyorum, yeleği nasıl ulaştırırım?",
      "a": "Antalya'da evden ve otelden alım-teslim yapıyoruz. Ayrıntıyı WhatsApp'tan netleştiririz."
    }
  ],
  "ctaBaslik": "Yeleğinizin Fotoğrafını Gönderin, Fiyatı Söyleyelim",
  "lowPrice": "200",
  "path": "/terzi/yelek-tamiri-tadilati-antalya",
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
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: "Yelek Daraltma ve Tamiri Kaç TL? 200 TL'den · Antalya" },
  description: "Terziye sor: +90 531 898 64 18 · Yelek bol mu, fermuarı mı bozuk? Yelek daraltma 200 TL'den, fermuar 300 TL'den, deri yelek 400 TL'den (KDV hariç). Fotoğraf gönderin.",
  keywords: ["yelek tamiri", "yelek tadilatı", "yelek daraltma", "yelek kısaltma", "yelek fermuarı değişimi", "takım elbise yeleği tadilatı", "deri yelek tamiri", "kot yelek tadilatı", "yelek tamiri Antalya"],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: "Yelek Daraltma, Tamir ve Fermuar | Terzi Can Antalya", description: "Bol gelen yelek, bozulan fermuar, kopan düğme: fotoğrafı gönderin, net fiyatı öğrenin. Normal işler aynı gün.", url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} kargoKisa />;
}
