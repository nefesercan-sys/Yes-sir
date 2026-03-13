import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db   = await getDb();
    const ilan = await db.collection("ilanlar").findOne({
      _id: new ObjectId(params.id),
    });
    if (!ilan) return NextResponse.json({ ilan: null }, { status: 404 });
    return NextResponse.json({ ilan });
  } catch {
    return NextResponse.json({ ilan: null }, { status: 500 });
  }
}
