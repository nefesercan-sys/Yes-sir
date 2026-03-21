import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const BASE = "https://swaphubs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/sitemap-statik.xml`,         lastModified: new Date() },
    { url: `${BASE}/sitemap-sektorler.xml`,       lastModified: new Date() },
    { url: `${BASE}/sitemap-meslekler.xml`,       lastModified: new Date() },
    { url: `${BASE}/sitemap-turkiye-sehir.xml`,   lastModified: new Date() },
    { url: `${BASE}/sitemap-turkiye-ilce.xml`,    lastModified: new Date() },
    { url: `${BASE}/sitemap-dunya.xml`,           lastModified: new Date() },
    { url: `${BASE}/sitemap-ilanlar.xml`,         lastModified: new Date() },
  ];
}
