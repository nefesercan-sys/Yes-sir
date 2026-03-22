import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const BASE = "https://www.swaphubs.com";

async function getBySlug(slug: string) {
  const db = await getDb();
  return db.collection("ilanlar").findOne({ slug, durum: "aktif" });
}

async function getByUUID(id: string) {
  try {
    const db = await getDb();
    return db.collection("ilanlar").findOne(
      { _id: new ObjectId(id) },
      { projection: { slug: 1 } }
    );
  } catch { return null; }
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ilan = await getBySlug(slug);
  if (!ilan) return { title: "İlan Bulunamadı | SwapHubs" };

  const tip    = ilan.tip === "ticari" ? "Ticari" : "Bireysel";
  const sehir  = ilan.sehir || ilan.formData?.sehir || "";
  const sehirAd = sehir.charAt(0).toUpperCase() + sehir.slice(1);
  const aciklama = ilan.formData?.aciklama || ilan.aciklama || ilan.baslik;

  const title = `${ilan.baslik} — ${sehirAd} ${ilan.sektorId} | SwapHubs`;
  const desc  = `${sehirAd} ${ilan.sektorId} ilanı. ${aciklama.slice(0, 140)}`;
  const url   = `${BASE}/ilan/${ilan.slug}`;
  const resim = ilan.resimUrl || ilan.medyalar?.[0] || "";

  return {
    title,
    description: desc,
    keywords: [
      ilan.baslik,
      sehir,
      ilan.sektorId,
      ilan.tip,
      "swaphubs",
      "ilan",
      `${sehir} ${ilan.sektorId}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      type: "website",
      locale: "tr_TR",
      siteName: "SwapHubs",
      images: resim ? [{ url: resim, width: 800, height: 600, alt: ilan.baslik }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: resim ? [resim] : [],
    },
  };
}

function IlanSchema({ ilan }: { ilan: any }) {
  const sehir = ilan.sehir || ilan.formData?.sehir || "";
  const sehirAd = sehir.charAt(0).toUpperCase() + sehir.slice(1);
  const aciklama = ilan.formData?.aciklama || ilan.aciklama || ilan.baslik;
  const resim = ilan.resimUrl || ilan.medyalar?.[0] || "";

  const schema = {
    "@context": "https://schema.org",
    "@type": ilan.tip === "ticari" ? "Product" : "Service",
    name: ilan.baslik,
    description: aciklama.slice(0, 300),
    image: resim ? [resim] : [],
    url: `${BASE}/ilan/${ilan.slug}`,
    offers: {
      "@type": "Offer",
      price: ilan.butceMin || 0,
      priceCurrency: ilan.butceBirimi || "TRY",
      availability: "https://schema.org/InStock",
      url: `${BASE}/ilan/${ilan.slug}`,
    },
    areaServed: {
      "@type": "City",
      name: sehirAd,
      containedInPlace: { "@type": "Country", name: "Türkiye" },
    },
    provider: ilan.sahibi ? {
      "@type": "Person",
      name: ilan.sahibi.ad || "SwapHubs Üyesi",
    } : undefined,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Anasayfa", item: BASE },
        { "@type": "ListItem", position: 2, name: "İlanlar", item: `${BASE}/ilanlar` },
        { "@type": "ListItem", position: 3, name: sehirAd, item: `${BASE}/turkiye/${sehir}` },
        { "@type": "ListItem", position: 4, name: ilan.sektorId, item: `${BASE}/turkiye/${sehir}/${ilan.sektorId}` },
        { "@type": "ListItem", position: 5, name: ilan.baslik },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function IlanSayfasi({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const isObjectId = /^[0-9a-f]{24}$/i.test(slug);
  if (isObjectId) {
    const ilan = await getByUUID(slug);
    if (ilan?.slug) redirect(`/ilan/${ilan.slug}`);
    notFound();
  }

  const ilan = await getBySlug(slug);
  if (!ilan) notFound();

  const sehir = ilan.sehir || ilan.formData?.sehir || "";
  const sehirAd = sehir.charAt(0).toUpperCase() + sehir.slice(1);
  const aciklama = ilan.formData?.aciklama || ilan.aciklama || "";

  return (
    <>
      <IlanSchema ilan={ilan} />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>
          <a href="/" style={{ color: "#888", textDecoration: "none" }}>Anasayfa</a>
          {" → "}
          <a href={`/turkiye/${sehir}`} style={{ color: "#888", textDecoration: "none" }}>{sehirAd}</a>
          {" → "}
          <a href={`/turkiye/${sehir}/${ilan.sektorId}`} style={{ color: "#888", textDecoration: "none" }}>{ilan.sektorId}</a>
          {" → "}
          <span>{ilan.baslik}</span>
        </nav>

        {/* Görsel */}
        {(ilan.resimUrl || ilan.medyalar?.[0]) && (
          <img
            src={ilan.resimUrl || ilan.medyalar[0]}
            alt={ilan.baslik}
            style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 16, marginBottom: 24 }}
          />
        )}

        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{ilan.baslik}</h1>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          {sehir && (
            <span style={{ background: "#f3f4f6", padding: "4px 12px", borderRadius: 100, fontSize: 13 }}>
              📍 {sehirAd}
            </span>
          )}
          <span style={{ background: "#f3f4f6", padding: "4px 12px", borderRadius: 100, fontSize: 13 }}>
            🏷️ {ilan.sektorId}
          </span>
          <span style={{ background: "#f3f4f6", padding: "4px 12px", borderRadius: 100, fontSize: 13 }}>
            {ilan.tip === "ticari" ? "🏢 Ticari" : "👤 Bireysel"}
          </span>
          <span style={{ background: "#f3f4f6", padding: "4px 12px", borderRadius: 100, fontSize: 13 }}>
            {ilan.rol === "veren" ? "🔧 Hizmet Veren" : "🔍 Hizmet Alan"}
          </span>
        </div>

        <div style={{ fontSize: 32, fontWeight: 800, color: "#0f2540", marginBottom: 24 }}>
          {ilan.butceMin?.toLocaleString("tr-TR")} {ilan.butceBirimi}
          {ilan.butceMax > ilan.butceMin && (
            <span style={{ fontSize: 18, color: "#888" }}> – {ilan.butceMax?.toLocaleString("tr-TR")}</span>
          )}
        </div>

        {aciklama && (
          <div style={{ background: "#f9fafb", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Açıklama</h2>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {aciklama}
            </p>
          </div>
        )}

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={`/ilan/${ilan.slug}/teklif-ver`}
            style={{ background: "#6c63ff", color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 700, textDecoration: "none" }}>
            💬 Teklif Ver
          </a>
          <a href={`/ilan/${ilan.slug}/hizmet-al`}
            style={{ background: "#0f2540", color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 700, textDecoration: "none" }}>
            🛒 Hizmet Al
          </a>
          <a href={`/ilan/${ilan.slug}/paylas`}
            style={{ background: "#f3f4f6", color: "#374151", padding: "12px 24px", borderRadius: 12, fontWeight: 700, textDecoration: "none" }}>
            📤 Paylaş
          </a>
        </div>

      </main>
    </>
  );
}
