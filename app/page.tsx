import TerziVitrin from "@/components/TerziVitrin";
import type { Metadata } from "next";

// SEO standardı: www kaldırıldı, sitemap ve canonical ile %100 uyumlu hale getirildi
const BASE = "https://swaphubs.com";

export const metadata: Metadata = {
  title: "Terzi Can Antalya — Tadilat, Özel Dikim, Dünyaya Kargo",
  description: "Konyaaltı Antalya'da Terzi Can: paça, fermuar, tadilat, özel dikim. Eve ve otele alım-teslim; özel dikim dünyaya kargo. Her gün 08:00–23:00.",
  keywords: "Antalya terzi, Konyaaltı terzi, terzi tadilat, özel dikim, otele gelen terzi, tekstil, fason üretim",
  openGraph: {
    title: "Terzi Can Antalya — Tadilat, Özel Dikim ve Dünyaya Kargo",
    description: "Konyaaltı Antalya'da terzi, tadilat ve özel dikim. Eve ve otele alım-teslim; siparişe özel dikim Antalya içine ve yurt dışına kargo.",
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
  return (
    <>
      <TerziVitrin />
    </>
  );
}
