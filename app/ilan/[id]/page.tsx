import { Suspense } from "react";
import IlanDetayClient from "./IlanDetayClient";

const BASE = "https://www.swaphubs.com";

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${BASE}/api/ilanlar?id=${params.id}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return {};
    const ilan = await res.json();
    if (!ilan) return {};

    const baslik = ilan.baslik || "İlan Detayı";
    const aciklama = ilan.aciklama?.slice(0, 160) || "SwapHubs ilanı";
    const gorsel = ilan.medyalar?.[0] || null;
    const sehir = ilan.sehir || "";
    const kategori = ilan.kategori || "";
    const slug = ilan.slug || params.id;

    return {
      title: `${baslik} | ${sehir} | SwapHubs`,
      description: aciklama,
      keywords: `${baslik}, ${sehir}, ${kategori}, SwapHubs, ilan, hizmet, tedarik`,
      openGraph: {
        title: `${baslik} | SwapHubs`,
        description: aciklama,
        url: `${BASE}/ilan/${slug}`,
        siteName: "SwapHubs",
        images: gorsel ? [{ url: gorsel, width: 1200, height: 630, alt: baslik }] : [],
        locale: "tr_TR",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: baslik,
        description: aciklama,
        images: gorsel ? [gorsel] : [],
      },
      alternates: {
        canonical: `${BASE}/ilan/${slug}`,
      },
    };
  } catch {
    return {};
  }
}

export default function IlanDetayPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#64748b" }}>
        Yükleniyor... ⏳
      </div>
    }>
      <IlanDetayClient />
    </Suspense>
  );
}
