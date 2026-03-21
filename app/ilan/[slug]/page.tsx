import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getDb } from "@/lib/mongodb"; // ← mongodb
import { ObjectId } from "mongodb";

const BASE = "https://www.swaphubs.com";

async function getBySlug(slug: string) {
  const db = await getDb();
  return db.collection("ilanlar").findOne({ slug, durum: "aktif" });
}

async function getByUUID(id: string) {
  try {
    const db = await getDb();
    return db
      .collection("ilanlar")
      .findOne({ _id: new ObjectId(id) }, { projection: { slug: 1 } });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const ilan = await getBySlug(params.slug);
  if (!ilan) return { title: "İlan Bulunamadı | SwapHubs" };

  const tip = ilan.tip === "ticari" ? "Ticari" : "Bireysel";
  const sehir = ilan.sehir || ilan.formData?.sehir || "";
  const title = `${ilan.baslik} – ${tip} | ${sehir} | SwapHubs`;
  const description = `${sehir} ${ilan.sektorId} ilanı. ${(ilan.aciklama || ilan.baslik).slice(0, 130)}...`;
  const url = `${BASE}/ilan/${ilan.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url,
      type: "website",
      locale: "tr_TR",
      siteName: "SwapHubs",
      images: ilan.resimUrl
        ? [{ url: ilan.resimUrl, width: 800, height: 600, alt: ilan.baslik }]
        : [],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function IlanSchema({ ilan }: { ilan: any }) {
  const sehir = ilan.sehir || ilan.formData?.sehir || "";
  const schema = {
    "@context": "https://schema.org",
    "@type": ilan.tip === "ticari" ? "Product" : "Service",
    name: ilan.baslik,
    description: ilan.aciklama || ilan.baslik,
    image: ilan.medyalar || [],
    offers: {
      "@type": "Offer",
      price: ilan.butceMin || 0,
      priceCurrency: ilan.butceBirimi || "TRY",
      availability: "https://schema.org/InStock",
    },
    areaServed: { "@type": "City", name: sehir },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Anasayfa", item: BASE },
        { "@type": "ListItem", position: 2, name: ilan.sektorId, item: `${BASE}/ilanlar/turkiye/${ilan.sektorId}` },
        { "@type": "ListItem", position: 3, name: ilan.baslik },
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
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // UUID ile gelen eski linkler → slug'a yönlendir
  const isObjectId = /^[0-9a-f]{24}$/i.test(slug);
  if (isObjectId) {
    const ilan = await getByUUID(slug);
    if (ilan?.slug) redirect(`/ilan/${ilan.slug}`);
    notFound();
  }

  const ilan = await getBySlug(slug);
  if (!ilan) notFound();

  const sehir = ilan.sehir || ilan.formData?.sehir || "";

  return (
    <>
      <IlanSchema ilan={ilan} />
      <main>
        <h1>{ilan.baslik}</h1>
        {sehir && <p>📍 {sehir}</p>}
        <p>🏷️ {ilan.sektorId} — {ilan.tip}</p>
        <p>💰 {ilan.butceMin?.toLocaleString("tr-TR")} {ilan.butceBirimi}</p>
      </main>
    </>
  );
}
