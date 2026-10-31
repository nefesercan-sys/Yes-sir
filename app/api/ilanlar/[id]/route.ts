import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { isAdminRequest } from "@/lib/admin-auth";
import { getSessionUserId } from "@/lib/terzi-session";
import { ilanHerkeseAcik, ilanSahibiMi } from "@/lib/ilan-public";
import { clean } from "@/lib/api-guard";
import { medyaListesi, temizObje } from "@/lib/validate";

function toObjectId(id: string) {
  try { return new ObjectId(id); } catch { return null; }
}

// ✅ ID veya slug ile ilan bul
function buildQuery(id: string) {
  const oid = toObjectId(id);
  return oid
    ? { $or: [{ _id: oid }, { slug: id }] }
    : { slug: id };
}

// ─── GET ─────────────────────────────────────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const ilan = await db.collection("ilanlar").findOne(buildQuery(params.id));

    if (!ilan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });

    // Sahibi/yönetici tam veriyi görür; diğer herkes PII'siz görünümü alır (e-posta, telefon, userId, token, tam konum yok).
    const oturum = await getServerSession(authOptions);
    let terziId: string | null = null;
    try { terziId = getSessionUserId(); } catch { /* terzi oturumu yok */ }
    const tam = (await isAdminRequest(req)) ||
      ilanSahibiMi(ilan, { email: oturum?.user?.email, id: (oturum?.user as any)?.id, terziId });
    const kaynak = tam ? ilan : ilanHerkeseAcik(ilan);
    const ham = ilan.sahibi?.email || "";

    return NextResponse.json({
      ...kaynak,
      id: ilan._id.toString(),
      olusturmaTarihi: ilan.olusturmaTarihi || ilan.createdAt || new Date().toISOString(),
      kullanici: kaynak.kullanici || (ilan.sahibi ? {
        id: tam ? ham : kaynak.sahibi?.id || "",
        name: ilan.sahibi.ad || "İsimsiz",
        image: ilan.sahibi.resim || null,
      } : null),
      kullaniciId: tam ? (ilan.kullaniciId || ham) : (kaynak.sahibi?.id || ""),
      aciklama: ilan.aciklama || ilan.formData?.aciklama || "",
      iletisim: ilan.iletisim || ilan.formData?.iletisim || "",
    });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// ─── PUT ─────────────────────────────────────────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Giriş yapmanız gerekiyor" }, { status: 401 });
    }

    const sessionUserId = (session.user as any).id as string;
    const sessionEmail = session.user.email as string;
    const db = await getDb();

    // ✅ Slug veya ID ile bul
    const mevcutIlan = await db.collection("ilanlar").findOne(buildQuery(params.id));
    if (!mevcutIlan) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    // Yetki kontrolü
    const ilanSahibiId = mevcutIlan.kullaniciId || mevcutIlan.sahibi?.email || "";
    const yetkili = (ilanSahibiId && (ilanSahibiId === sessionUserId || ilanSahibiId === sessionEmail)) || (await isAdminRequest(req));
    if (!yetkili) {
      return NextResponse.json({ error: "Bu ilanı düzenleme yetkiniz yok" }, { status: 403 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
    const baslik = clean(body.baslik, 200);
    const aciklama = clean(body.aciklama, 5000);
    const iletisim = clean(body.iletisim, 120);
    if (!baslik) return NextResponse.json({ error: "Başlık zorunludur" }, { status: 400 });
    if (!aciklama) return NextResponse.json({ error: "Açıklama zorunludur" }, { status: 400 });
    if (!iletisim) return NextResponse.json({ error: "İletişim bilgisi zorunludur" }, { status: 400 });
    const sayi = (v: unknown) => { const n = Number(v); return Number.isFinite(n) && n > 0 ? n : 0; };

    // Alan beyaz listesi (mevcut davranış korunur; yapay/durum/sahibi gibi alanlar yazılamaz)
    const guncelleme = {
      sektorId:       clean(body.sektorId, 60) || mevcutIlan.sektorId,
      baslik,
      aciklama,
      iletisim,
      adres:          clean(body.adres, 300) || null,
      kategori:       clean(body.kategori, 80),
      formData:       temizObje(body.formData && typeof body.formData === "object" ? body.formData : {}),
      medyalar:       medyaListesi(body.medyalar, 10),
      butceMin:       sayi(body.butceMin),
      butceMax:       sayi(body.butceMax),
      butceBirimi:    clean(body.butceBirimi, 8) || "₺",
      tip:            body.tip === "ticari" ? "ticari" : "bireysel",
      rol:            body.rol === "veren" ? "veren" : "alan",
      ulke:           clean(body.ulke, 60),
      sehir:          clean(body.sehir, 60),
      guncellemeTarihi: new Date().toISOString(),
    };

    // ✅ _id ile güncelle (slug değişmez)
    await db.collection("ilanlar").updateOne(
      { _id: mevcutIlan._id },
      { $set: guncelleme }
    );

    return NextResponse.json({
      ...mevcutIlan,
      ...guncelleme,
      id: mevcutIlan._id.toString(),
    });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// ─── DELETE ──────────────────────────────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Giriş yapmanız gerekiyor" }, { status: 401 });
    }

    const sessionUserId = (session.user as any).id as string;
    const sessionEmail = session.user.email as string;
    const db = await getDb();

    // ✅ Slug veya ID ile bul
    const mevcutIlan = await db.collection("ilanlar").findOne(buildQuery(params.id));
    if (!mevcutIlan) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    // Yetki kontrolü
    const ilanSahibiId = mevcutIlan.kullaniciId || mevcutIlan.sahibi?.email || "";
    const yetkili = (ilanSahibiId && (ilanSahibiId === sessionUserId || ilanSahibiId === sessionEmail)) || (await isAdminRequest(req));
    if (!yetkili) {
      return NextResponse.json({ error: "Bu ilanı silme yetkiniz yok" }, { status: 403 });
    }

    // ✅ _id ile sil
    await db.collection("ilanlar").deleteOne({ _id: mevcutIlan._id });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
