Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Ilan, { IIlan } from "@/models/Ilan";

const BASE = "https://www.swaphubs.com";

async function getBySlug(slug: string): Promise<IIlan | null> {
  await connectDB();
  return Ilan.findOne({ slug, aktif: true }).lean();
}

async function getByUUID(id: string): Promise<IIlan | null> {
  await connectDB();
  return Ilan.findById(id).select("slug").lean();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const ilan = await getBySlug(params.slug);
  if (!ilan) return { title: "İlan Bulunamadı | SwapHubs" };

  const tip = ilan.tip === "ticari" ? "Ticari" : "Bireysel";
  const title = `${ilan.baslik} – ${tip} | ${ilan.sehir} | SwapHubs`;
  const description = `${ilan.sehir} ${ilan.sektor} ilanı. ${ilan.aciklama.slice(0, 130)}...`;
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
      images: ilan.gorseller?.[0]
        ? [{ url: ilan.gorseller[0], width: 800, height: 600, alt: ilan.baslik }]
        : [],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function IlanSchema({ ilan }: { ilan: IIlan }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ilan.tip === "ticari" ? "Product" : "Service",
    name: ilan.baslik,
    description: ilan.aciklama,
    image: ilan.gorseller,
    offers: {
      "@type": "Offer",
      price: ilan.fiyat,
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
    },
    areaServed: {
      "@type": "City",
      name: ilan.sehir,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Anasayfa", item: BASE },
        { "@type": "ListItem", position: 2, name: ilan.sektor, item: `${BASE}/ilanlar/sektor/${ilan.sektor}` },
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

  const isObjectId = /^[0-9a-f]{24}$/i.test(slug);
  if (isObjectId) {
    const ilan = await getByUUID(slug);
    if (ilan?.slug) redirect(`/ilan/${ilan.slug}`);
    notFound();
  }

  const ilan = await getBySlug(slug);
  if (!ilan) notFound();

  return (
    <>
      <IlanSchema ilan={ilan} />
      <main>
        <h1>{ilan.baslik}</h1>
        <p>📍 {ilan.sehir}{ilan.ilce ? ` / ${ilan.ilce}` : ""}</p>
        <p>🏷️ {ilan.sektor} — {ilan.tip}</p>
        <p>💰 ₺{ilan.fiyat.toLocaleString("tr-TR")}</p>
        <p>{ilan.aciklama}</p>
      </main>
    </>
  );
}
