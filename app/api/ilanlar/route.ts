// ============================================================
// SwapHubs — app/api/ilanlar/route.ts
// Gelişmiş İlan API — Karma Algoritma, Search, Pagination
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
    const sort     = searchParams.get("sort") || "yeni"; // yeni | populer | random | bütce_asc | butce_desc

    const db = await getDb();

    // 1. Kendi İlanlarım (Kullanıcı Paneli İçin)
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

    // 2. Filtreleri Hazırla
    const filter: Record<string, unknown> = {};

    if (!durum) filter.durum = "aktif"; // Sadece aktif ilanları göster
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
    if (yapay !== null && yapay !== undefined) {
      filter.$or = [{ yapay: yapay === "true" }, { is_ai_generated: yapay === "true" }];
    }

    // Full-text search (Arama Çubuğu)
    if (q) {
      filter.$or = [
        { baslik: { $regex: q, $options: "i" } },
        { "formData.sehir": { $regex: q, $options: "i" } },
        { ulke: { $regex: q, $options: "i" } },
        { sektorId: { $regex: q, $options: "i" } },
        { kategori: { $regex: q, $options: "i" } },
      ];
    }

    // 3. KARMA (SHUFFLE/RANDOM) ALGORİTMASI 
    if (sort === "random") {
      const aggregatePipeline = [
        { $match: filter },
        { $sample: { size: limit } } // Rastgele 'limit' kadar belge çek
      ];
      
      const [ilanlar, toplam] = await Promise.all([
        db.collection("ilanlar").aggregate(aggregatePipeline).toArray(),
        db.collection("ilanlar").countDocuments(filter), // Toplam sayıyı yine de verelim
      ]);

      return NextResponse.json({
        ilanlar: serialize(ilanlar),
        toplam,
        sayfa: 1, // Karma akışta sayfalama mantıksızdır, hep 1 kalır
        toplamSayfa: 1,
      });
    }

    // 4. Standart Sıralama ve Sayfalama (Pagination)
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
      is_ai_generated = false // Admin paneli ile tutarlılık için eklendi
    } = body;

    if (!sektorId || !baslik?.trim()) {
      return NextResponse.json({ error: "Sektör ve başlık zorunludur" }, { status: 400 });
    }

    const db = await getDb();

    // Hem 'yapay' hem 'is_ai_generated' parametrelerinden birinin true olması yeterli
    const isBotGenerated = Boolean(yapay) || Boolean(is_ai_generated);

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
      yapay:       isBotGenerated, // Geriye dönük uyumluluk için
      is_ai_generated: isBotGenerated, // Yeni mimari uyumluluğu için
      sahibi: session
        ? { email: session.user?.email, ad: session.user?.name, resim: session.user?.image }
        : null,
      misafirToken: session ? null : crypto.randomUUID(), // Üye olmayanlar için geçici token
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
function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}
