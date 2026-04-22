import { NextResponse } from "next/server";

const BASE_URL = "https://swaphubs.com";

export const dynamic = "force-dynamic";

export async function GET() {
  let urls: string[] = [];

  try {
    const res = await fetch(`${BASE_URL}/api/ilanlar`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const liste = Array.isArray(data) ? data : (data.ilanlar || []);

      urls = liste.map((item: any) => {
        const id = item.slug || item._id;
        const mod = item.updatedAt ? new Date(item.updatedAt).toISOString() : new Date().toISOString();
        
        return `
  <url>
    <loc>${BASE_URL}/ilan/${id}</loc>
    <lastmod>${mod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }
  } catch (e) {
    console.error("Sitemap çekilirken hata oluştu:", e);
  }

  // Eğer hiç ilan gelmezse Google'ın hata vermemesi için koruma ekliyoruz
  if (urls.length === 0) {
    urls.push(`
  <url>
    <loc>${BASE_URL}/ilanlar</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
}
