import TerziVitrin from "@/components/TerziVitrin";
import type { Metadata } from "next";

// SEO standardı: www kaldırıldı, sitemap ve canonical ile %100 uyumlu hale getirildi
const BASE = "https://swaphubs.com";

export const metadata: Metadata = {
  title: "Terzi Can · Antalya'da Dikim, Tamir, Tadilat Servisi",
  description: "Konyaaltı Antalya'da Terzi Can: paça ₺200'den, fermuar ₺300'den (KDV dahil), elbise dikimi, tamir ve tadilat. Eve ve otele alım-teslim. Her gün 08–23.",
  keywords: "Antalya terzi, Konyaaltı terzi, terzi tadilat, özel dikim, otele gelen terzi, tekstil, fason üretim",
  openGraph: {
    title: "Terzi Can · Antalya'da Dikim, Tamir, Tadilat Servisi",
    description: "Konyaaltı Antalya'da terzi: dikim, tamir ve tadilat. Eve ve otele alım-teslim, her gün 08:00–23:00.",
    url: BASE,
    siteName: "Terzi Can",
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
  return (
    <>
      <TerziVitrin />
    </>
  );
}
