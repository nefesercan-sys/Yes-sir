import { Metadata } from "next";
import IlanDetaySayfaClient from "./IlanDetayClient";

const BASE = "https://www.swaphubs.com";

const SEKTOR_ADLARI: Record<string, string> = {
  turizm: "Turizm & Konaklama", seyahat: "Seyahat & Transfer",
  kiralama: "Kiralama", tamir: "Tamir & Bakım", usta: "Usta & İşçi",
  temizlik: "Temizlik Hizmetleri", uretim: "Üretim & Özel Sipariş",
  giyim: "Giyim & Tekstil", saglik: "Sağlık & Güzellik",
  egitim: "Eğitim & Danışmanlık", etkinlik: "Etkinlik & Düğün",
  mobilya: "Mobilya & Dekorasyon", tekstil: "Tekstil & Hazır Giyim",
  "mermer-tas": "Mermer & Doğal Taş", "metal-celik": "Metal & Çelik",
  "plastik-pvc": "Plastik & PVC", "ahsap-mob": "Ahşap & Mobilya",
  "gida-tarim": "Gıda & Tarım", "insaat-malz": "İnşaat Malzemeleri",
  elektrik: "Elektrik & Enerji", makine: "Makine & Ekipman",
  lojistik: "Lojistik & Nakliyat", "kimya-boya": "Kimya & Boya",
  "saglik-med": "Sağlık & Medikal",
};

async function getIlan(id: string) {
  try {
    const res = await fetch(`${BASE}/api/ilanlar/${id}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      return data.ilan || null;
    }
  } catch {}
  return null;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ilan = await getIlan(params.id);

  if (!ilan) {
    return { title: "İlan Bulunamadı | SwapHubs", description: "Bu ilan kaldırılmış veya mevcut değil." };
  }

  const sektorAd = SEKTOR_ADLARI[ilan.sektorId] || ilan.sektorId;
  const sehir = ilan.formData?.sehir || ilan.sehir || "Türkiye";
  const ulke = ilan.ulke && ilan.ulke !== "Türkiye" ? ilan.ulke : "Türkiye";
  const rolAd = ilan.rol === "alan" ? "Talep" : "Hizmet & Ürün";
  const tipAd = ilan.tip === "ticari" ? "B2B Ticari" : "Bireysel";
  const aciklama = ilan.formData?.aciklama || "";
  const title = `${ilan.baslik} — ${sektorAd} ${rolAd} | ${sehir}`;
  const description = aciklama
    ? `${aciklama.slice(0, 155)}...`
    : `${ilan.baslik} — ${tipAd} ${rolAd} ilanı. ${sektorAd} sektöründe ${sehir}, ${ulke}. SwapHubs'ta ücretsiz teklif verin.`;
  const gorsel = ilan.resimUrl || ilan.medyalar?.[0] || `${BASE}/og-image.svg`;

  return {
    title,
    description,
    keywords: [ilan.baslik, sektorAd, sehir, ulke, `${sektorAd} ${sehir}`, `${sektorAd} tedarikçi`, tipAd, "SwapHubs", "teklif al"],
    alternates: { canonical: `${BASE}/ilan/${params.id}` },
    openGraph: {
      title, description,
      url: `${BASE}/ilan/${params.id}`,
      siteName: "SwapHubs",
      type: "article",
      images: [{ url: gorsel, width: 1200, height: 630, alt: ilan.baslik }],
      publishedTime: ilan.createdAt,
      locale: "tr_TR",
    },
    twitter: { card: "summary_large_image", title, description, images: [gorsel] },
  };
}

export default function IlanDetayPage({ params }: { params: { id: string } }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "SwapHubs İlanı",
            url: `${BASE}/ilan/${params.id}`,
            brand: { "@type": "Brand", name: "SwapHubs" },
            offers: { "@type": "Offer", priceCurrency: "TRY", availability: "https://schema.org/InStock", url: `${BASE}/ilan/${params.id}` },
          }),
        }}
      />
      <IlanDetaySayfaClient id={params.id} />
    </>
  );
}
