import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Ilan from "@/models/Ilan";

export async function GET(
  _req: NextRequest,
  { params }: { params: { uuid: string } }
) {
  await connectDB();

  const ilan = await Ilan
    .findById(params.uuid)
    .select("slug")
    .lean();

  if (!ilan || !ilan.slug) {
    return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({ slug: ilan.slug });
}
