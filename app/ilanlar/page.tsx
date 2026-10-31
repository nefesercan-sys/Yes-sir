import type { Metadata } from "next";
import IlanlarClientPage from "./IlanlarClientPage";

const URL_ = "https://swaphubs.com/ilanlar";

export const metadata: Metadata = {
  title: { absolute: "İlanlar — Hizmet ve Ürün İlanları | SwapHubs" },
  description:
    "SwapHubs'ta sektöre, şehre ve ülkeye göre hizmet ve ürün ilanlarını arayın; ilan verin, teklif alın.",
  alternates: { canonical: URL_ },
  robots: { index: true, follow: true },
  openGraph: {
    title: "İlanlar | SwapHubs",
    description: "Sektöre ve şehre göre hizmet ve ürün ilanlarını arayın.",
    url: URL_,
    siteName: "SwapHubs",
    type: "website",
  },
};

export default function IlanlarPage() {
  return <IlanlarClientPage />;
}
