import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

function toObjectId(id: string) {
  try { return new ObjectId(id); } catch { return null; }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const oid = toObjectId(params.id);
    if (!oid) return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });

    const ilan = await db.collection("ilanlar").findOne({ _id: oid });
    if (!ilan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });

    return NextResponse.json({
      ...ilan,
      id: ilan._id.toString(),
      olusturmaTarihi: ilan.olusturmaTarihi || ilan.createdAt || new Date().toISOString(),
      kullanici: ilan.kullanici || (ilan.sahibi ? {
        id: ilan.sahibi.email || "",
        name: ilan.sahibi.ad || "İsimsiz",
        image: ilan.sahibi.resim || null,
      } : null),
      kullaniciId: ilan.kullaniciId || ilan.sahibi?.email || "",
      aciklama: ilan.aciklama || ilan.formData?.aciklama || "",
      iletisim: ilan.iletisim || ilan.formData?.iletisim || "",
    });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Giriş yapmanız gerekiyor" }, { status: 401 });

    const sessionUserId = (session.user as any).id as string;
    const sessionEmail = session.user.email as string;
    const db = await getDb();
    const oid = toObjectId(params.id);
    if (!oid) return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });

    const mevcutIlan = await db.collection("ilanlar").findOne({ _id: oid });
    if (!mevcutIlan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });

    const ilanSahibiId = mevcutIlan.kullaniciId || mevcutIlan.sahibi?.email || "";
    const yetkili = ilanSahibiId === sessionUserId || ilanSahibiId === sessionEmail;
    if (!yetkili) {
      return NextResponse.json({ error: "Bu ilanı düzenleme yetkiniz yok" }, { status: 403 });
    }

    const body = await req.json();
    if (!body.baslik?.trim()) return NextResponse.json({ error: "Başlık zorunludur" }, { status: 400 });
    if (!body.aciklama?.trim()) return NextResponse.json({ error: "Açıklama zorunludur" }, { status: 400 });
    if (!body.iletisim?.trim()) return NextResponse.json({ error: "İletişim bilgisi zorunludur" }, { status: 400 });

    const guncelleme = {
      sektorId: body.sektorId,
      baslik: body.baslik.trim(),
      aciklama: body.aciklama.trim(),
      iletisim: body.iletisim.trim(),
      adres: body.adres?.trim() || null,
      kategori: body.kategori,
      formData: body.formData,
      medyalar: body.medyalar || [],
      butceMin: body.butceMin || 0,
      butceMax: body.butceMax || 0,
      butceBirimi: body.butceBirimi || "₺",
      tip: body.tip,
      rol: body.rol,
      ulke: body.ulke,
      sehir: body.sehir,
      guncellemeTarihi: new Date().toISOString(),
    };

    await db.collection("ilanlar").updateOne({ _id: oid }, { $set: guncelleme });
    return NextResponse.json({ ...mevcutIlan, ...guncelleme, id: params.id });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Giriş yapmanız gerekiyor" }, { status: 401 });

    const sessionUserId = (session.user as any).id as string;
    const sessionEmail = session.user.email as string;
    const db = await getDb();
    const oid = toObjectId(params.id);
    if (!oid) return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });

    const mevcutIlan = await db.collection("ilanlar").findOne({ _id: oid });
    if (!mevcutIlan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });

    const ilanSahibiId = mevcutIlan.kullaniciId || mevcutIlan.sahibi?.email || "";
    const yetkili = ilanSahibiId === sessionUserId || ilanSahibiId === sessionEmail;
    if (!yetkili) {
      return NextResponse.json({ error: "Bu ilanı silme yetkiniz yok" }, { status: 403 });
    }

    await db.collection("ilanlar").deleteOne({ _id: oid });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
