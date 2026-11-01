import AnaSayfaClient from "@/providers/AnaSayfaClient";
import TerziVitrin from "@/components/TerziVitrin";
import { getDb } from "@/lib/mongodb";
import type { Metadata } from "next";

// SEO standardı: www kaldırıldı, sitemap ve canonical ile %100 uyumlu hale getirildi
const BASE = "https://swaphubs.com";

export const metadata: Metadata = {
  title: "Terzi Can Antalya — Terzi, Tadilat ve Özel Dikim | SwapHubs",
  description: "Konyaaltı Antalya'da Terzi Can: paça kısaltma, fermuar, elbise tadilatı, özel dikim. Eve ve otele ücretsiz servis. Her gün 08:00–23:00.",
  keywords: "Antalya terzi, Konyaaltı terzi, terzi tadilat, özel dikim, otele gelen terzi, tekstil, fason üretim",
  openGraph: {
    title: "Terzi Can Antalya — Terzi ve Tekstil",
    description: "Konyaaltı Antalya'da terzi, tadilat, özel dikim ve tekstil üretimi. Eve ve otele ücretsiz servis.",
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

const ILAN_ENABLED = false as boolean;

export default async function AnaSayfa() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ilanlar: any[] = [];
  // Pazar (ilan) bölümü gizlendi: ilan listesi çekilmez. Geri açmak için ILAN_ENABLED=true.
  try {
    if (!ILAN_ENABLED) throw new Error('ilan-gizli');
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
    if ((error as Error).message !== "ilan-gizli") console.error("Ana sayfa ilanları çekilirken hata oluştu:", error);
  }

  // SSR tam kapasite devrede. Googlebot boş div'ler değil, 24 adet ilanı dolu dolu görecek.
  return (
    <>
      {ILAN_ENABLED && <AnaSayfaClient initialIlanlar={ilanlar} ilkGorsel={null} />}
      <TerziVitrin />
    </>
  );
}
