// app/page.tsx
// Kök sayfa — Türkçe (varsayılan locale)

import AnaSayfaClient from "@/providers/AnaSayfaClient";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  try {
    const db = await getDb();
    const data = await db
      .collection("ilanlar")
      .find({ durum: "aktif" })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    const ilanlar = JSON.parse(JSON.stringify(data));

    const ilkGorsel = (() => {
      for (const ilan of ilanlar) {
        const url = ilan.resimUrl || ilan.medyalar?.[0] || null;
        if (url) {
          if (url.includes("res.cloudinary.com")) {
            return url.replace("/upload/", "/upload/f_auto,q_auto:eco,w_400,h_185,c_fill/");
          }
          return url;
        }
      }
      return null;
    })();

    return (
      <>
        {ilkGorsel && <link rel="preload" as="image" href={ilkGorsel} />}
        <AnaSayfaClient initialIlanlar={ilanlar} ilkGorsel={ilkGorsel} />
      </>
    );
  } catch {
    return <AnaSayfaClient initialIlanlar={[]} ilkGorsel={null} />;
  }
}
