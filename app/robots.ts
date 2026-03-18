import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/ilanlar", "/ilan/"],
        disallow: ["/panel", "/teklifler", "/api/"],
      },
    ],
    sitemap: "https://swaphubs.com/sitemap.xml",
    host: "https://swaphubs.com",
  };
}
