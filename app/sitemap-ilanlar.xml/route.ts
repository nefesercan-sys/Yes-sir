import { NextResponse } from "next/server";

const BASE = "https://swaphubs.com";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toISOString();
  let urls: string[] = [];

  try {
    const res = await fetch(`${BASE}/api/ilanlar`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const liste = Array.isArray(data) ? data : (data.ilanlar || []);

      urls = liste
        .filter((v: any) => v._id)
        .flatMap((v: any) => {
          const id = v.slug || v._id;
          const loc = `${BASE}/ilan/${id}`;
          const mod = new Date(v.updatedAt || v.createdAt || now).toISOString();
          return [
            `  <url><loc>${loc}</loc><lastmod>${mod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
            `  <url><loc>${loc}/hizmet-ver</loc><lastmod>${mod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
            `  <url><loc>${loc}/hizmet-al</loc><lastmod>${mod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
            `  <url><loc>${loc}/teklif-al</loc><lastmod>${mod}</lastmod><changefreq>weekly</changefreq><priority>0.65</priority></url>`,
            `  <url><loc>${loc}/teklif-ver</loc><lastmod>${mod}</lastmod><changefreq>weekly</changefreq><priority>0.65</priority></url>`,
          ];
        });
    }
  } catch {}

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
}
