import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const BASE_URL = "https://www.swaphubs.com";
export const dynamic = "force-dynamic";

export async function GET() {
  const urls: string[] = [];

  try {
    const client = await clientPromise;
    const db = client.db("swaphubs_db");
    const ilanlar = await db
      .collection("ilanlar")
      .find(
        { durum: "aktif", slug: { $exists: true, $nin: [null, ""] } },
        { projection: { slug: 1, updatedAt: 1, createdAt: 1, _id: 0 } }
      )
      .toArray();

    for (const ilan of ilanlar) {
      if (!ilan.slug) continue;
      const mod = ilan.updatedAt
        ? new Date(ilan.updatedAt).toISOString()
        : new Date(ilan.createdAt || Date.now()).toISOString();
      urls.push(`  <url>
    <loc>${BASE_URL}/ilan/${ilan.slug}</loc>
    <lastmod>${mod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }
  } catch (e) {
    console.error("sitemap-ilanlar hatası:", e);
  }

  if (urls.length === 0) {
    urls.push(`  <url>
    <loc>${BASE_URL}/ilanlar</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
