import type { Metadata } from 'next';
import KonuSayfasi, { type KonuData } from '@/components/terzi/KonuSayfasi';

const BASE_URL = 'https://swaphubs.com';
const PATH = '/terzi/yelek-tamiri-tadilati-antalya';

const DATA: KonuData = {
  "path": "/terzi/yelek-tamiri-tadilati-antalya",
  "name": "Yelek Tamiri ve Tadilatı",
  "h1": "Yelek Tamiri ve Tadilatı Antalya",
  "kisa": "Yelek daraltma, boy ayarı, fermuar ve düğme onarımı yapılır; fiyat yeleğin türüne (takım yelek, kot, deri, şişme) ve işe göre fotoğrafla söylenir. Normal işler aynı gün teslim edilir.",
  "waIlk": "Merhaba, yelek tamiri/tadilatı için fiyat almak istiyorum. Fotoğrafı gönderiyorum.",
  "facts": [
    [
      "Başlangıç fiyatı",
      "Fotoğrafa veya işin detayına göre"
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
  "turlerBaslik": "Yelek Tamiri ve Tadilatı kapsamı",
  "turler": [
    {
      "ic": "📐",
      "baslik": "Daraltma ve beden ayarı",
      "aciklama": "Takım elbise yeleğinde sırt kemeri ve yan dikişlerden beden ayarlanır."
    },
    {
      "ic": "📏",
      "baslik": "Boy ve omuz",
      "aciklama": "Yelek boyu ve omuz/kol çukuru ölçünüze göre düzenlenir."
    },
    {
      "ic": "🧷",
      "baslik": "Fermuar ve düğme",
      "aciklama": "Kot, deri ve şişme yelek fermuarı değişimi; düğme ve düğme iliği onarımı."
    },
    {
      "ic": "🪡",
      "baslik": "Astar ve söküklerin onarımı",
      "aciklama": "Yırtık astar, sökük dikiş ve cep onarımı."
    }
  ],
  "fiyatBaslik": "Yelek Tamiri ve Tadilatı fiyatı",
  "fiyatlar": [
    [
      "Yelek Daraltma",
      "Fotoğrafa göre fiyat"
    ],
    [
      "Yelek Boy / Omuz Ayarı",
      "Fotoğrafa göre fiyat"
    ],
    [
      "Yelek Fermuarı Değişimi",
      "Fotoğrafa göre fiyat"
    ],
    [
      "Düğme, Astar, Sökük Onarımı",
      "Fotoğrafa göre fiyat"
    ]
  ],
  "fiyatNot": "Net fiyat için fotoğrafı WhatsApp'tan gönderin; fiyatlar KDV dahil değildir.",
  "adimlar": [
    {
      "baslik": "Fotoğraf Gönderin",
      "aciklama": "Yeleğin ve yapılacak yerin fotoğrafını WhatsApp'tan gönderin, net fiyat alın."
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
      "q": "Yelek tamiri ve tadilatı ne kadar?",
      "a": "Yelek fiyatı türüne (takım yelek, kot, deri, şişme) ve işe göre değişir; fotoğrafı WhatsApp'tan gönderirseniz net fiyatı söyleriz."
    },
    {
      "q": "Takım elbise yeleği daraltılır mı?",
      "a": "Evet. Yelek beden ayarı sırt kemeri ve yan dikişlerden yapılır; kumaş ve astara göre fotoğraftan değerlendirilir."
    },
    {
      "q": "Yelek boyu ve omuzu ayarlanır mı?",
      "a": "Evet. Boy ve omuz/kol çukuru ölçünüze göre düzenlenir; ölçü yelek üzerinizdeyken işaretlenir."
    },
    {
      "q": "Yelek fermuarı değişiyor mu?",
      "a": "Evet. Kot, deri ve şişme yeleklerin fermuarı değiştirilir; fiyat fermuar boyuna ve yeleğe göre söylenir."
    },
    {
      "q": "Deri veya kot yelek tadilatı yapılıyor mu?",
      "a": "Evet. Deri ve kot yelek tadilatı yapılıyor; ayrıntı için deri ceket ve kot sayfalarımıza bakabilirsiniz."
    },
    {
      "q": "Yelek tadilatı ne kadar sürer?",
      "a": "Normal işler aynı gün, acil işler 1–2 saatte teslim edilir. Kapsamlı işlerde süreyi fotoğrafı görünce söyleriz."
    },
    {
      "q": "Yeleği eve veya otele gelip alıyor musunuz?",
      "a": "Evet. Konyaaltı, Muratpaşa ve çevresinde eve ve otele alım-teslim ücretsizdir."
    }
  ],
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
  "ctaBaslik": "Yeleğinizi mi Yaptıracaksınız?"
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: "Yelek Tamiri ve Tadilatı Antalya · Aynı Gün" },
  description: "Takım elbise yeleği, kot ve deri yelek daraltma, boy ayarı, fermuar ve düğme onarımı. Fiyat fotoğrafa göre. Eve ve otele ücretsiz. ☎ +90 531 898 64 18",
  keywords: ["yelek tamiri", "yelek tadilatı", "yelek daraltma", "yelek kısaltma", "yelek fermuarı değişimi", "takım elbise yeleği tadilatı", "deri yelek tamiri", "kot yelek tadilatı", "yelek tamiri Antalya"],
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: "Yelek Tamiri ve Tadilatı Antalya | Terzi Can", description: "Takım elbise, kot, deri ve şişme yelek: beden daraltma, boy ve omuz ayarı, fermuar ve düğme onarımı. Eve ve otele ücretsiz.", url: `${BASE_URL}${PATH}`, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function Page() {
  return <KonuSayfasi d={DATA} kargoKisa />;
}
