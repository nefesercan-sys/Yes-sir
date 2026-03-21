import { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {
  params: { sehir: string; sektor: string };
}): Promise<Metadata> {
  const sehir  = SEHIR_ETIKETLER[params.sehir]  ?? params.sehir;
  const sektor = SEKTOR_ETIKETLER[params.sektor] ?? params.sektor;

  const title = params.sehir === "turkiye"
    ? `${sektor} İlanları — Tüm Türkiye | SwapHubs`
    : `${sehir} ${sektor} İlanları | SwapHubs`;

  const description = params.sehir === "turkiye"
    ? `Türkiye genelinde ${sektor} sektöründe ticari ve bireysel ilanlar. SwapHubs güvenli platform.`
    : `${sehir}'da ${sektor} alanında ilanlar. SwapHubs güvenli platform.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.swaphubs.com/ilanlar/${params.sehir}/${params.sektor}`,
    },
  };
}

export default function IlanlarSayfasi({
  params,
}: {
  params: { sehir: string; sektor: string };
}) {
  const sehir  = SEHIR_ETIKETLER[params.sehir]  ?? params.sehir;
  const sektor = SEKTOR_ETIKETLER[params.sektor] ?? params.sektor;

  const baslik = params.sehir === "turkiye"
    ? `${sektor} İlanları — Tüm Türkiye`
    : `${sehir} — ${sektor} İlanları`;

  return (
    <main>
      <h1>{baslik}</h1>
      {/* Mevcut ilan listesi bileşeninizi buraya ekleyin */}
    </main>
  );
}
