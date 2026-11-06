import TerziVitrin from "@/components/TerziVitrin";
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

export default async function AnaSayfa() {
  return (
    <>
      <TerziVitrin />
    </>
  );
}
