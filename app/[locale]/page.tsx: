"use client";
import dynamic from "next/dynamic";

const AnaSayfaClient = dynamic(() => import("@/providers/AnaSayfaClient"), {
  ssr: false,
});

export default function AnaSayfa() {
  return <AnaSayfaClient initialIlanlar={[]} ilkGorsel={null} />;
}
