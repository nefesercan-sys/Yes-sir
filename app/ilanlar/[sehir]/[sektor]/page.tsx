import { Metadata } from "next";

const SEHIR_ETIKETLER: Record<string, string> = {
  istanbul: "İstanbul", ankara: "Ankara", izmir: "İzmir",
  bursa: "Bursa", antalya: "Antalya", adana: "Adana",
  konya: "Konya", gaziantep: "Gaziantep", mersin: "Mersin", kayseri: "Kayseri",
};

const SEKTOR_ETIKETLER: Record<string, string> = {
  turizm: "Turizm", seyahat: "Seyahat", kiralama: "Kiralama",
  tamir: "Tamir", usta: "Usta", temizlik: "Temizlik",
  uretim: "Üretim", giyim: "Giyim", saglik: "Sağlık", egitim: "Eğitim",
};

export async function generateMetadata({
  params,
}: {
  params: { sehir: string; sektor: string };
}): Promise<Metadata> {
  const sehir = SEHIR_ETIKETLER[params.sehir] ?? params.sehir;
  const sektor = SEKTOR_ETIKETLER[params.sektor] ?? params.sektor;
  return {
    title: `${sehir} ${sektor} İlanları | SwapHubs`,
    description: `${sehir}'da ${sektor} alanında ilanlar. SwapHubs güvenli platform.`,
    alternates: {
      canonical: `https://www.swaphubs.com/ilanlar/${params.sehir}/${params.sektor}`,
    },
  };
}

export default function SehirSektorSayfasi({
  params,
}: {
  params: { sehir: string; sektor: string };
}) {
  const sehir = SEHIR_ETIKETLER[params.sehir] ?? params.sehir;
  const sektor = SEKTOR_ETIKETLER[params.sektor] ?? params.sektor;
  return (
    <main>
      <h1>{sehir} — {sektor} İlanları</h1>
      {/* İlan listesi bileşeninizi buraya ekleyin */}
    </main>
  );
}
