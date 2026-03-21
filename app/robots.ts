import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/ilanlar", "/ilan/", "/kayit", "/giris", "/ilan-ver"],
        disallow: ["/panel", "/api/", "/admin", "/mesajlar", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        // ✅ EKLENDİ: Yeni temiz URL route'larına izin ver
        // ✅ EKLENDİ: Eski UUID/query param URL'leri engelle
        disallow: ["/panel", "/api/", "/admin", "/varlik/"],
      },
    ],
    sitemap: "https://www.swaphubs.com/sitemap.xml",
    host: "https://www.swaphubs.com",
  };
}
