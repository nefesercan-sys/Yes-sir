// ============================================================
// SwapHubs — app/api/ilanlar/route.ts
// Gelişmiş İlan API — Full-text search, pagination, filtering
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ─── GET ───────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const sektor   = searchParams.get("sektor");
    const limit    = Math.min(parseInt(searchParams.get("limit") || "24"), 100);
    const skip     = parseInt(searchParams.get("skip") || "0");
    const q        = searchParams.get("q");
    const sehir    = searchParams.get("sehir");
    const ulke     = searchParams.get("ulke");
    const kendi    = searchParams.get("kendi");
    const tip      = searchParams.get("tip");
    const rol      = searchParams.get("rol");
    const kategori = searchParams.get("kategori");
    const durum    = searchParams.get("durum");
    const yapay    = searchParams.get("yapay");
    const sort     = searchParams.get("sort") || "yeni"; // yeni | populer | bütce_asc | butce_desc

    // Kendi ilanları
    if (kendi === "true") {
      const session = await getServerSession();
      if (!session?.user?.email) {
        return NextResponse.json([], { status: 401 });
      }
      const db = await getDb();
      const ilanlar = await db
        .collection("ilanlar")
        .find({ "sahibi.email": session.user.email })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json(serialize(ilanlar));
    }

    const db = await getDb();
    const filter: Record<string, unknown> = {};

    // Sadece aktif ilanları göster (admin değilse)
    if (!durum) filter.durum = "aktif";
    else filter.durum = durum;

    if (sektor)   filter.sektorId = sektor;
    if (tip)      filter.tip = tip;
    if (rol)      filter.rol = rol;
    if (kategori) filter.sektorId = kategori;
    if (ulke)     filter.ulke = { $regex: ulke, $options: "i" };
    if (sehir)    filter.$or = [
      { "formData.sehir": { $regex: sehir, $options: "i" } },
      { sehir: { $regex: sehir, $options: "i" } },
    ];
    if (yapay !== null && yapay !== undefined) filter.yapay = yapay === "true";

    // Full-text search
    if (q) {
      filter.$or = [
        { baslik: { $regex: q, $options: "i" } },
        { "formData.sehir": { $regex: q, $options: "i" } },
        { ulke: { $regex: q, $options: "i" } },
        { sektorId: { $regex: q, $options: "i" } },
        { kategori: { $regex: q, $options: "i" } },
      ];
    }

    // Sıralama
    const sortMap: Record<string, Record<string, 1 | -1>> = {
      yeni: { createdAt: -1 },
      populer: { goruntulenme: -1, teklifSayisi: -1 },
      butce_asc: { butceMin: 1 },
      butce_desc: { butceMax: -1 },
    };
    const sortObj = sortMap[sort] || { createdAt: -1 };

    const [ilanlar, toplam] = await Promise.all([
      db.collection("ilanlar").find(filter).sort(sortObj).skip(skip).limit(limit).toArray(),
      db.collection("ilanlar").countDocuments(filter),
    ]);

    return NextResponse.json({
      ilanlar: serialize(ilanlar),
      toplam,
      sayfa: Math.floor(skip / limit) + 1,
      toplamSayfa: Math.ceil(toplam / limit),
    });
  } catch (err) {
    console.error("GET /api/ilanlar error:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// ─── POST ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    const body = await req.json();

    const {
      sektorId, baslik, formData, medyalar,
      butceMin, butceMax, butceBirimi,
      tip, rol, ulke, sehir,
      kategori, kategoriSlug,
      yapay = false,
    } = body;

    if (!sektorId || !baslik?.trim()) {
      return NextResponse.json({ error: "Sektör ve başlık zorunludur" }, { status: 400 });
    }

    const db = await getDb();

    const ilan = {
      sektorId,
      baslik: baslik.trim(),
      kategori: kategori || formData?.altKategori || sektorId,
      kategoriSlug: kategoriSlug || sektorId,
      formData: formData || {},
      medyalar: Array.isArray(medyalar) ? medyalar : [],
      resimUrl: medyalar?.[0] || null,
      butceMin:    Number(butceMin) || 0,
      butceMax:    Number(butceMax) || 0,
      butceBirimi: butceBirimi || "₺",
      tip:         tip || "bireysel",
      rol:         rol || "alan",
      ulke:        ulke || formData?.ulke || "Türkiye",
      sehir:       sehir || formData?.sehir || "",
      durum:       "aktif",
      teklifSayisi: 0,
      goruntulenme: 0,
      teklifeAcik: true,
      yapay:       Boolean(yapay),
      sahibi: session
        ? { email: session.user?.email, ad: session.user?.name, resim: session.user?.image }
        : null,
      misafirToken: session ? null : crypto.randomUUID(),
      createdAt:   new Date(),
      guncellendi: new Date(),
    };

    const result = await db.collection("ilanlar").insertOne(ilan);

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("POST /api/ilanlar error:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// ─── YARDIMCI ──────────────────────────────────────────────
function serialize(data: any[]): any[] {
  return JSON.parse(JSON.stringify(data));
}
