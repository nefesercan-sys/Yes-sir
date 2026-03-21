import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Ilan from "@/models/Ilan";

export async function GET() {
  await connectDB();

  const ilanlar = await Ilan
    .find(
      { aktif: true, slug: { $exists: true, $ne: null } },
      { slug: 1, updatedAt: 1, _id: 0 }
    )
    .lean();

  return NextResponse.json(ilanlar, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
