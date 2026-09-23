import AnaSayfaClient from "@/providers/AnaSayfaClient";

const BASE = "https://www.swaphubs.com";

export const metadata = {
  title: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
  description: "Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturuyoruz. İlan verin, teklif alın — tamamen ücretsiz.",
  keywords: "ilan, hizmet, ürün, tedarik, fason, tekstil, gıda, lojistik, Türkiye, ihracat, tedarikçi bul",
  openGraph: {
    title: "SwapHubs — Türkiye'den Dünyaya",
    description: "Üretici, tedarikçi ve alıcıları buluşturan Türkiye'nin global iş platformu.",
    url: BASE,
    siteName: "SwapHubs",
    locale: "tr_TR",
    type: "website",
  },
  alternates: {
    canonical: BASE,
  },
};

export default async function AnaSayfa() {
  let ilanlar: any[] = [];
  
  try {
    const res = await fetch(`${BASE}/api/ilanlar?limit=24&sort=yeni`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      const data = await res.json();
      ilanlar = data.ilanlar || [];
    }
  } catch (error) {
    console.error("Ana sayfa ilanları çekilirken hata oluştu:", error);
  }

  // Standart import sayesinde SSR tam kapasite çalışacak ve Googlebot içi dolu sayfa görecek
  return <AnaSayfaClient initialIlanlar={ilanlar} ilkGorsel={null} />;
}
