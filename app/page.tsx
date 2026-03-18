// ============================================================
// SwapHubs — app/page.tsx (Server Component)
// ============================================================
import AnaSayfaClient from "@/providers/AnaSayfaClient";
import { getDb } from "@/lib/mongodb";

export default async function AnaSayfa() {
  try {
    const db = await getDb();
    const data = await db
      .collection("ilanlar")
      .find({ durum: "aktif" })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    const ilanlar = JSON.parse(JSON.stringify(data));
    return <AnaSayfaClient initialIlanlar={ilanlar} />;
  } catch {
    return <AnaSayfaClient initialIlanlar={[]} />;
  }
}
