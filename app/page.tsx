import { connectDB } from "@/lib/mongodb";
import Ilan from "@/lib/models/Ilan";
import AnaSayfaClient from "@/providers/AnaSayfaClient";

export const revalidate = 60; // Her 60 saniyede bir yenile

export default async function AnaSayfa() {
  await connectDB();

  const ilanlar = await Ilan.find({ durum: "aktif" })
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  const serialized = JSON.parse(JSON.stringify(ilanlar));

  const ilkGorsel =
    serialized[0]?.resimUrl || serialized[0]?.medyalar?.[0] || null;

  return (
    <AnaSayfaClient
      initialIlanlar={serialized}
      ilkGorsel={ilkGorsel}
    />
  );
}
