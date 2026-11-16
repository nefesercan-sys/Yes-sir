import TerziVitrin from "@/components/TerziVitrin";
import type { Metadata } from "next";

// SEO standardı: www kaldırıldı, sitemap ve canonical ile %100 uyumlu hale getirildi
const BASE = "https://swaphubs.com";

export const metadata: Metadata = {
  title: { absolute: "Tailor in Antalya · Alterations, Custom Tailoring · +90 531 898 64 18" },
  description: "Ask the tailor: +90 531 898 64 18 · Terzi Can, Konyaaltı Antalya since 2006. Hemming from 200 TL (€10), zipper from 300 TL (€15). Home and hotel pickup. WhatsApp a photo.",
  keywords: "tailor Antalya, clothing alterations Antalya, hotel tailor Antalya, made to measure Antalya, Schneider Antalya, портной Анталья, Antalya terzi",
  openGraph: {
    title: "Tailor in Antalya · Alterations, Custom Tailoring and Worldwide Shipping",
    description: "Ask the tailor: +90 531 898 64 18 · Terzi Can in Konyaaltı, Antalya. Alterations, custom tailoring, home and hotel pickup, worldwide shipping.",
    url: BASE,
    siteName: "SwapHubs",
    locale: "en_US",
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
