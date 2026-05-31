import TekstilClient from "./TekstilClient";
import { getDb } from "@/lib/mongodb";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

// ── SEO METADATA ──
export const metadata: Metadata = {
  title: "Antalya Tekstil Üreticisi | Toptan Muslin, Keten, Pamuk | Maya Tekstil",
  description: "Antalya'nın doğrulanmış tekstil üreticisi. %100 doğal muslin, keten ve pamuk kumaş. Toptan ve ihracat. Gömlek, şort, elbise üretimi. WhatsApp ile sipariş verin.",
  keywords: [
    "antalya tekstil",
    "antalya tekstil üreticisi",
    "toptan muslin kumaş",
    "keten kumaş antalya",
    "pamuk tekstil toptan",
    "antalya kumaş ihracat",
    "muslin üretici türkiye",
    "tekstil antalya toptan",
    "antalya giyim üretimi",
    "fason üretim antalya"
  ].join(", "),
  openGraph: {
    title: "Antalya Tekstil | Toptan Muslin & Keten Üretici",
    description: "%100 doğal muslin ve keten koleksiyonu. Antalya'dan toptan ve ihracat.",
    url: "https://www.swaphubs.com/tekstil-antalya",
    siteName: "SwapHubs",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antalya Tekstil Üreticisi | Toptan Muslin & Keten",
    description: "%100 doğal muslin ve keten koleksiyonu. Antalya'dan toptan ve ihracat.",
  },
  alternates: {
    canonical: "https://www.swaphubs.com/tekstil-antalya",
  },
};

export default async function TekstilAntalyaPage() {
  try {
    const db = await getDb();

    const dbUrunler = await db.collection("ilanlar").find({
      kategori: "tekstil",
      durum: "aktif"
    }).sort({ eklenmeTarihi: -1 }).toArray();

    const gercekUrunler = dbUrunler.map((urun: any) => ({
      _id: urun._id.toString(),
      isimTr: urun.baslik || "",
      isimEn: urun.isimEn || "",
      fiyat: urun.fiyat || 0,
      resimUrl: (urun.medyalar && urun.medyalar.length > 0)
        ? urun.medyalar[0]
        : (urun.gorsel || ""),
    }));

    return (
      <>
        {/* Schema.org yapısal veri — Google için */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Maya Tekstil — Antalya",
              "description": "%100 doğal muslin ve keten koleksiyonu. Toptan ve ihracat.",
              "url": "https://www.swaphubs.com/tekstil-antalya",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Antalya",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "36.8841",
                "longitude": "30.7056"
              },
              "sameAs": ["https://www.swaphubs.com/tekstil-antalya"],
              "keywords": "tekstil, muslin, keten, pamuk, toptan, antalya",
            })
          }}
        />
        <TekstilClient urunler={gercekUrunler} />
      </>
    );

  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return <TekstilClient urunler={[]} />;
  }
}
