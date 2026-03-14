// ============================================================
// SwapHubs — app/api/ilanlar/[id]/route.ts
// Tekil ilan — GET (görüntülenme++) / PATCH / DELETE (Admin God Mode)
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// MongoDB ObjectId formatını güvenli JSON'a çevirir
function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params.id || params.id.length !== 24) {
      return NextResponse.json({ ilan: null }, { status: 400 });
    }

    const db = await getDb();
    
    // Görüntülenmeyi 1 artır ve güncel dökümanı al
    const result = await db.collection("ilanlar").findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $inc: { goruntulenme: 1 } },
      { returnDocument: "after" }
    );

    // MongoDB Node.js driver versiyonuna göre uyumluluk (result.value veya result)
    const ilan = result?.value || result;

    if (!ilan) return NextResponse.json({ ilan: null }, { status: 404 });

    // ÖNEMLİ: Frontend "d.ilan" beklediği için veriyi "ilan" objesi içinde gönderiyoruz
    return NextResponse.json({ ilan: serialize(ilan) });
  } catch (err) {
    console.error("GET Ilan Hata:", err);
    return NextResponse.json({ ilan: null }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    const adminKey = req.headers.get("x-admin-key");
    const body = await req.json();

    // Admin Yetkisi Kontrolü (Panelden gelen şifre veya kayıtlı E-posta)
    const isAdmin = adminKey === process.env.NEXT_PUBLIC_ADMIN_KEY || session?.user?.email === "nefesercan@gmail.com";

    if (!session?.user?.email && !isAdmin) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const db = await getDb();
    const filter: any = { _id: new ObjectId(params.id) };

    // Eğer admin değilse, SADECE kendi ilanını güncelleyebilir
    if (!isAdmin && body._adminUpdate !== true) {
      filter["sahibi.email"] = session?.user?.email;
    }
    delete body._adminUpdate;

    const updateResult = await db.collection("ilanlar").updateOne(
      filter,
      { $set: { ...body, guncellendi: new Date() } }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "İlan bulunamadı veya yetkiniz yok" }, { status: 403 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Güncelleme hatası" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    const adminKey = req.headers.get("x-admin-key");

    // Admin Yetkisi Kontrolü
    const isAdmin = adminKey === process.env.NEXT_PUBLIC_ADMIN_KEY || session?.user?.email === "nefesercan@gmail.com";

    if (!session?.user?.email && !isAdmin) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const db = await getDb();
    const filter: any = { _id: new ObjectId(params.id) };

    // Eğer admin değilse, SADECE kendi ilanını silebilir. Admin ise her ilanı (AI ilanları dahil) silebilir.
    if (!isAdmin) {
      filter["sahibi.email"] = session?.user?.email;
    }

    const result = await db.collection("ilanlar").deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "İlan bulunamadı veya yetkiniz yok" }, { status: 403 });
    }

    // İlan silindiğinde, veritabanı şişmesin diye o ilana ait tüm teklifleri de siliyoruz
    await db.collection("teklifler").deleteMany({ ilanId: params.id });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Silme hatası" }, { status: 500 });
  }
}
