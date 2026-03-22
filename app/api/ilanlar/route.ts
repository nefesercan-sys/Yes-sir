export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { generateUniqueSlug } from "@/lib/slugify";

// ─── GET ───────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const sektor   = searchParams.get("sektor");
    const limit    = Math.min(parseInt(searchParams.get("limit") || "24"), 1000);
    const skip     = parseInt(searchParams.get("skip") || "0");
    const q        = searchParams.get("q");
    const sehir    = searchParams.get("sehir");
    const ilce     = searchParams.get("ilce");
    const ulke     = searchParams.get("ulke");
    const kendi    = searchParams.get("kendi");
    const tip      = searchParams.get("tip");
    const rol      = searchParams.get("rol");
    const kategori = searchParams.get("kategori");
    const durum    = searchParams.get("durum");
    const yapay    = searchParams.get("yapay");
    const meslek   = searchParams.get("meslek");
    const slug     = searchParams.get("slug");
    const id       = searchParams.get("id");
    const sort     = searchParams.get("sort") || "yeni";

    const db = await getDb();

    // ── Tek ilan slug ile getir
    if (slug) {
      const ilan = await db.collection("ilanlar").findOne({ slug });
      if (!ilan) return NextResponse.json(null, { status: 404 });
      return NextResponse.json(serialize(ilan));
    }

    // ── Tek ilan id ile getir
    if (id) {
      try {
        const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(id) });
        if (!ilan) return NextResponse.json(null, { status: 404 });
        return NextResponse.json(serialize(ilan));
      } catch {
        return NextResponse.json(null, { status: 400 });
      }
    }

    // ── Kendi ilanlarım
    if (kendi === "true") {
      const session = await getServerSession();
      if (!session?.user?.email) {
        return NextResponse.json([], { status: 401 });
      }
      const ilanlar = await db
        .collection("ilanlar")
        .find({ "sahibi.email": session.user.email })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json(serialize(ilanlar));
    }

    const filter: Record<string, unknown> = {};

    if (!durum) filter.durum = "aktif";
    else filter.durum = durum;

    if (sektor)   filter.sektorId = sektor;
    if (tip)      filter.tip = tip;
    if (rol)      filter.rol = rol;
    if (kategori) filter.sektorId = kategori;
    if (ulke)     filter.ulke = { $regex: ulke, $options: "i" };

    // ── Şehir filtresi
    if (sehir) {
      filter.$or = [
        { sehir: { $regex: sehir, $options: "i" } },
        { "formData.sehir": { $regex: sehir, $options: "i" } },
      ];
    }

    // ── İlçe filtresi
    if (ilce) {
      filter.$or = [
        { ilce: { $regex: ilce, $options: "i" } },
        { "formData.ilce": { $regex: ilce, $options: "i" } },
      ];
    }

    // ── Meslek filtresi
    if (meslek) {
      filter.$or = [
        { meslek: { $regex: meslek, $options: "i" } },
        { "formData.meslek": { $regex: meslek, $options: "i" } },
        { baslik: { $regex: meslek, $options: "i" } },
      ];
    }

    if (yapay !== null && yapay !== undefined) {
      filter.$or = [
        { yapay: yapay === "true" },
        { is_ai_generated: yapay === "true" },
      ];
    }

    if (q) {
      filter.$or = [
        { baslik: { $regex: q, $options: "i" } },
        { "formData.sehir": { $regex: q, $options: "i" } },
        { ulke: { $regex: q, $options: "i" } },
        { sektorId: { $regex: q, $options: "i" } },
        { kategori: { $regex: q, $options: "i" } },
        { slug: { $regex: q, $options: "i" } },
      ];
    }

    // ── Random sıralama
    if (sort === "random") {
      const aggregatePipeline = [
        { $match: filter },
        { $sample: { size: limit } }
      ];
      const [ilanlar, toplam] = await Promise.all([
        db.collection("ilanlar").aggregate(aggregatePipeline).toArray(),
        db.collection("ilanlar").countDocuments(filter),
      ]);
      return NextResponse.json({
        ilanlar: serialize(ilanlar),
        toplam,
        sayfa: 1,
        toplamSayfa: 1,
      });
    }

    const sortMap: Record<string, Record<string, 1 | -1>> = {
      yeni:       { createdAt: -1 },
      populer:    { goruntulenme: -1, teklifSayisi: -1 },
      butce_asc:  { butceMin: 1 },
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
      tip, rol, ulke, sehir, ilce,
      kategori, kategoriSlug,
      meslek,
      yapay = false,
      is_ai_generated = false
    } = body;

    if (!sektorId || !baslik?.trim()) {
      return NextResponse.json({ error: "Sektör ve başlık zorunludur" }, { status: 400 });
    }

    const db = await getDb();

    const isBotGenerated = Boolean(yapay) || Boolean(is_ai_generated);

    const ilanSehir  = sehir || formData?.sehir || "turkiye";
    const ilanIlce   = ilce  || formData?.ilce  || "";
    const ilanSektor = sektorId || kategori || "genel";
    const ilanMeslek = meslek || formData?.meslek || "";

    const slug = await generateUniqueSlug(
      baslik.trim(),
      ilanSehir,
      ilanSektor,
      async (s) => {
        const existing = await db.collection("ilanlar").findOne({ slug: s });
        return !!existing;
      }
    );

    const ilan = {
      sektorId,
      baslik:       baslik.trim(),
      slug,
      kategori:     kategori || formData?.altKategori || sektorId,
      kategoriSlug: kategoriSlug || sektorId,
      formData:     formData || {},
      medyalar:     Array.isArray(medyalar) ? medyalar : [],
      resimUrl:     medyalar?.[0] || null,
      butceMin:     Number(butceMin) || 0,
      butceMax:     Number(butceMax) || 0,
      butceBirimi:  butceBirimi || "₺",
      tip:          tip || "bireysel",
      rol:          rol || "alan",
      ulke:         ulke || formData?.ulke || "Türkiye",
      sehir:        ilanSehir,
      ilce:         ilanIlce,
      meslek:       ilanMeslek,
      durum:        "aktif",
      teklifSayisi: 0,
      goruntulenme: 0,
      teklifeAcik:  true,
      yapay:        isBotGenerated,
      is_ai_generated: isBotGenerated,
      // ── SEO Meta
      seoTitle:       `${baslik.trim()} | SwapHubs`,
      seoDescription: formData?.aciklama?.slice(0, 160) || `${baslik.trim()} - SwapHubs'ta güvenli alım satım ve hizmet platformu`,
      sahibi: session
        ? { email: session.user?.email, ad: session.user?.name, resim: session.user?.image }
        : null,
      misafirToken: session ? null : crypto.randomUUID(),
      createdAt:    new Date(),
      guncellendi:  new Date(),
    };

    const result = await db.collection("ilanlar").insertOne(ilan);

    return NextResponse.json(
      { success: true, id: result.insertedId, slug },
      { status: 201 }
    );

  } catch (err) {
    console.error("POST /api/ilanlar error:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// ─── YARDIMCI ──────────────────────────────────────────────
function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}
