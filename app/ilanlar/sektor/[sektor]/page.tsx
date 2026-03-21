import { Metadata } from "next";

const SEKTOR_ETIKETLER: Record<string, string> = {
  turizm: "Turizm", seyahat: "Seyahat", kiralama: "Kiralama",
  tamir: "Tamir", usta: "Usta", temizlik: "Temizlik",
  uretim: "Üretim", giyim: "Giyim", saglik: "Sağlık",
  egitim: "Eğitim", etkinlik: "Etkinlik", mobilya: "Mobilya",
  tekstil: "Tekstil", "mermer-tas": "Mermer & Taş",
  "metal-celik": "Metal & Çelik", "plastik-pvc": "Plastik & PVC",
  "ahsap-mob": "Ahşap & Mobilya", "gida-tarim": "Gıda & Tarım",
  "insaat-malz": "İnşaat Malzemeleri", elektrik: "Elektrik",
  makine: "Makine", lojistik: "Lojistik",
  "kimya-boya": "Kimya & Boya", "saglik-med": "Sağlık & Medikal",
};

export async function generateMetadata({
  params,
}: {
  params: { sektor: string };
}): Promise<Metadata> {
  const ad = SEKTOR_ETIKETLER[params.sektor] ?? params.sektor;
  return {
    title: `${ad} İlanları | SwapHubs`,
    description: `SwapHubs'ta ${ad} sektöründe ticari ve bireysel ilanlar. Güvenli platform, hızlı iletişim.`,
    alternates: {
      canonical: `https://www.swaphubs.com/ilanlar/sektor/${params.sektor}`,
    },
  };
}

export default function SektorSayfasi({ params }: { params: { sektor: string } }) {
  const ad = SEKTOR_ETIKETLER[params.sektor] ?? params.sektor;
  return (
    <main>
      <h1>{ad} İlanları</h1>
      {/* İlan listesi bileşeninizi buraya ekleyin */}
    </main>
  );
}
