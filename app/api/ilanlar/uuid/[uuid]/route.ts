import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb"; // ← mongodb
import { ObjectId } from "mongodb";

export async function GET(
  _req: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    const db = await getDb();
    const ilan = await db
      .collection("ilanlar")
      .findOne(
        { _id: new ObjectId(params.uuid) },
        { projection: { slug: 1 } }
      );

    if (!ilan?.slug) {
      return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ slug: ilan.slug });
  } catch {
    return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
  }
}
