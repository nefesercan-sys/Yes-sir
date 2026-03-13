// ============================================================
// SwapHubs — app/api/ilanlar/[id]/route.ts
// Tekil ilan — GET (görüntülenme++) / PATCH / DELETE
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const ilan = await db.collection("ilanlar").findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $inc: { goruntulenme: 1 } },
      { returnDocument: "after" }
    );
    if (!ilan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    return NextResponse.json(JSON.parse(JSON.stringify(ilan)));
  } catch {
    return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const body = await req.json();
    const db = await getDb();

    // Admin veya ilan sahibi güncelleyebilir
    const filter: any = { _id: new ObjectId(params.id) };
    if (body._adminUpdate !== true) {
      filter["sahibi.email"] = session.user.email;
    }
    delete body._adminUpdate;

    const result = await db.collection("ilanlar").updateOne(
      filter,
      { $set: { ...body, guncellendi: new Date() } }
    );

    if (result.matchedCount === 0)
      return NextResponse.json({ error: "İlan bulunamadı veya yetkiniz yok" }, { status: 403 });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Güncelleme hatası" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const db = await getDb();
    const result = await db.collection("ilanlar").deleteOne({
      _id: new ObjectId(params.id),
      "sahibi.email": session.user.email,
    });

    if (result.deletedCount === 0)
      return NextResponse.json({ error: "İlan bulunamadı veya yetkiniz yok" }, { status: 403 });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Silme hatası" }, { status: 500 });
  }
}
