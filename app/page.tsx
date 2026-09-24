import AnaSayfaClient from "@/providers/AnaSayfaClient";
import { getDb } from "@/lib/mongodb";

// SEO standardı: www kaldırıldı, sitemap ve canonical ile %100 uyumlu hale getirildi
const BASE = "https://swaphubs.com";

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

// ISR Optimizasyonu: Sunucuda bu sayfa 60 saniyede bir önbelleğe (cache) alınır.
// Trafik aniden artsa bile DB çökmez, sayfa statik bir HTML kadar hızlı açılır.
export const revalidate = 60;

export default async function AnaSayfa() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ilanlar: any[] = [];
  
  try {
    const db = await getDb();
    
    // API endpoint'ine HTTP isteği atmak yerine doğrudan veritabanından çekiyoruz (Daha güvenli ve hızlı)
    const rawIlanlar = await db
      .collection("ilanlar")
      .find({ durum: "aktif" })
      .sort({ createdAt: -1 }) // sort=yeni parametresinin karşılığı
      .limit(24)
      .toArray();

    // MongoDB'ye özgü ObjectId ve Date nesnelerini Client Component'e hata vermeden aktarmak için parse ediyoruz
    ilanlar = JSON.parse(JSON.stringify(rawIlanlar));
  } catch (error) {
    console.error("Ana sayfa ilanları çekilirken hata oluştu:", error);
  }

  // SSR tam kapasite devrede. Googlebot boş div'ler değil, 24 adet ilanı dolu dolu görecek.
  return <AnaSayfaClient initialIlanlar={ilanlar} ilkGorsel={null} />;
}
