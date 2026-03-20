import AnaSayfaClient from "@/providers/AnaSayfaClient";

export const revalidate = 60;

export default async function AnaSayfa() {
  let ilanlar: any[] = [];
  let ilkGorsel: string | null = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.swaphubs.com";
    const res = await fetch(`${baseUrl}/api/ilanlar?limit=100`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      ilanlar = data.ilanlar || data || [];
      ilkGorsel = ilanlar[0]?.resimUrl || ilanlar[0]?.medyalar?.[0] || null;
    }
  } catch {}

  return (
    <AnaSayfaClient
      initialIlanlar={ilanlar}
      ilkGorsel={ilkGorsel}
    />
  );
}
