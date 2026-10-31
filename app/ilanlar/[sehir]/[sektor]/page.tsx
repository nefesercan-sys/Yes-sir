import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

const SEHIR_ETIKETLER: Record<string, string> = {
  turkiye:    "Tüm Türkiye",   // ← yeni eklendi
  istanbul:   "İstanbul",
  ankara:     "Ankara",
  izmir:      "İzmir",
  bursa:      "Bursa",
  antalya:    "Antalya",
  adana:      "Adana",
  konya:      "Konya",
  gaziantep:  "Gaziantep",
  mersin:     "Mersin",
  kayseri:    "Kayseri",
};

const SEKTOR_ETIKETLER: Record<string, string> = {
  turizm:         "Turizm",
  seyahat:        "Seyahat",
  kiralama:       "Kiralama",
  tamir:          "Tamir",
  usta:           "Usta",
  temizlik:       "Temizlik",
  uretim:         "Üretim",
  giyim:          "Giyim",
  saglik:         "Sağlık",
  egitim:         "Eğitim",
  etkinlik:       "Etkinlik",
  mobilya:        "Mobilya",
  tekstil:        "Tekstil",
  "mermer-tas":   "Mermer & Taş",
  "metal-celik":  "Metal & Çelik",
  "plastik-pvc":  "Plastik & PVC",
  "ahsap-mob":    "Ahşap & Mobilya",
  "gida-tarim":   "Gıda & Tarım",
  "insaat-malz":  "İnşaat Malzemeleri",
  elektrik:       "Elektrik",
  makine:         "Makine",
  lojistik:       "Lojistik",
  "kimya-boya":   "Kimya & Boya",
  "saglik-med":   "Sağlık & Medikal",
};

// Bu adres gerçek ilan listesi olmayan programatik bir kısayoldur: bilinmeyen şehir/sektör 404,
// bilinenler gerçek listeye (/ilanlar?sehir=&sektor=) yönlenir. Boş içerikli sayfa indexlenmez.
export const dynamicParams = true;

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function IlanlarSayfasi({
  params,
}: {
  params: { sehir: string; sektor: string };
}) {
  if (!(params.sehir in SEHIR_ETIKETLER) || !(params.sektor in SEKTOR_ETIKETLER)) notFound();
  const q = new URLSearchParams();
  q.set("sektor", params.sektor);
  if (params.sehir !== "turkiye") q.set("sehir", params.sehir);
  redirect(`/ilanlar?${q.toString()}`);
}
