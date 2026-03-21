import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb"; // ← mongodb

export async function GET() {
  try {
    const db = await getDb();
    const ilanlar = await db
      .collection("ilanlar")
      .find(
        { durum: "aktif", slug: { $exists: true, $ne: null } },
        { projection: { slug: 1, guncellendi: 1, createdAt: 1, _id: 0 } }
      )
      .toArray();

    return NextResponse.json(ilanlar, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (err) {
    console.error("Sitemap API hatası:", err);
    return NextResponse.json([], { status: 500 });
  }
}
