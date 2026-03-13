import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tip      = searchParams.get("tip");
  const rol      = searchParams.get("rol");
  const kategori = searchParams.get("kategori");
  const limit    = parseInt(searchParams.get("limit") ?? "20");
  const sort     = searchParams.get("sort") ?? "newest";

  const filtre: Record<string, unknown> = { durum: "aktif" };
  if (tip)      filtre.tip      = tip;
  if (rol)      filtre.rol      = rol;
  if (kategori) filtre.kategoriSlug = kategori;

  try {
    const db      = await getDb();
    const ilanlar = await db.collection("ilanlar")
      .find(filtre)
      .sort({ createdAt: sort === "newest" ? -1 : 1 })
      .limit(limit)
      .toArray();

    const toplam = await db.collection("ilanlar").countDocuments(filtre);

    return NextResponse.json({ ilanlar, toplam });
  } catch {
    return NextResponse.json({ ilanlar: [], toplam: 0 });
  }
}
