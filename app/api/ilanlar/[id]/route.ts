// Yönetici aracı: yalnızca yönetici bir ilanı silebilir. İlan/pazar sistemi herkese kapatıldı.
// NOT: Yapay ilanlar silindikten sonra bu uç ve admin ilan sekmesi kaldırılabilir.
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { isAdminRequest } from "@/lib/admin-auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }
    let oid: ObjectId;
    try { oid = new ObjectId(params.id); } catch {
      return NextResponse.json({ error: "Geçersiz kimlik" }, { status: 400 });
    }
    const db = await getDb();
    const sonuc = await db.collection("ilanlar").deleteOne({ _id: oid });
    if (!sonuc.deletedCount) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
