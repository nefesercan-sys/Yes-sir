export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminRequest } from "@/lib/admin-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { generateUniqueSlug } from "@/lib/slugify";
import { clean, rateLimited } from "@/lib/api-guard";
import { idGecerli, medyaListesi, regexKacir, sonluSayi, tamSayi, temizObje } from "@/lib/validate";
import { ilanHerkeseAcik } from "@/lib/ilan-public";

// ─── GET ───────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const admin = await isAdminRequest(req); // yönetici tam veri + yüksek limit alır

    const par = (k: string, max = 100) => clean(searchParams.get(k) ?? "", max);
    const sektor   = par("sektor");
    const limit    = tamSayi(searchParams.get("limit"), 1, admin ? 1000 : 50, 24);
    const skip     = tamSayi(searchParams.get("skip"), 0, 100000, 0);
    const q        = par("q", 80);
    const sehir    = par("sehir", 60);
    const ilce     = par("ilce", 60);
    const ulke     = par("ulke", 60);
    const kendi    = searchParams.get("kendi");
    const tip      = par("tip", 30);
    const rol      = par("rol", 30);
    const kategori = par("kategori");
    const durum    = par("durum", 30);
    const yapay    = searchParams.get("yapay");
    const meslek   = par("meslek", 60);
    const slug     = par("slug", 200);
    const id       = searchParams.get("id");
    const sort     = searchParams.get("sort") || "yeni";

    const db = await getDb();

    // Tek ilan: herkese açık görünüm (sahibi/yönetici kendi ucundan tam veriyi alır)
    const tekIlanYaniti = async (ilan: any) => {
      if (admin) return serialize(ilan);
      return serialize(ilanHerkeseAcik(ilan));
    };

    // ── Tek ilan slug ile getir
    if (slug) {
      const ilan = await db.collection("ilanlar").findOne({ slug });
      if (!ilan) return NextResponse.json(null, { status: 404 });
      return NextResponse.json(await tekIlanYaniti(ilan));
    }

    // ── Tek ilan id ile getir
    if (id) {
      if (!idGecerli(id)) return NextResponse.json(null, { status: 400 });
      const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(id) });
      if (!ilan) return NextResponse.json(null, { status: 404 });
      return NextResponse.json(await tekIlanYaniti(ilan));
    }

    // ── Kendi ilanlarım (tam veri)
    if (kendi === "true") {
      const session = await getServerSession(authOptions);
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

    const ve: Record<string, unknown>[] = [];
    const rx = (v: string) => ({ $regex: regexKacir(v), $options: "i" });

    // Herkese açık uç yalnızca aktif ilanları gösterir; yönetici durum seçebilir.
    ve.push({ durum: admin && durum && /^[a-z_]{1,30}$/.test(durum) ? durum : "aktif" });

    if (sektor)   ve.push({ sektorId: sektor });
    if (tip)      ve.push({ tip });
    if (rol)      ve.push({ rol });
    if (kategori) ve.push({ sektorId: kategori });
    if (ulke)     ve.push({ ulke: rx(ulke) });

    if (sehir)  ve.push({ $or: [{ sehir: rx(sehir) }, { "formData.sehir": rx(sehir) }] });
    if (ilce)   ve.push({ $or: [{ ilce: rx(ilce) }, { "formData.ilce": rx(ilce) }] });
    if (meslek) ve.push({ $or: [{ meslek: rx(meslek) }, { "formData.meslek": rx(meslek) }, { baslik: rx(meslek) }] });

    if (yapay === "true" || yapay === "false") {
      const v = yapay === "true";
      ve.push({ $or: [{ yapay: v }, { is_ai_generated: v }] });
    }

    if (q) {
      ve.push({
        $or: [
          { baslik: rx(q) },
          { "formData.sehir": rx(q) },
          { ulke: rx(q) },
          { sektorId: rx(q) },
          { kategori: rx(q) },
          { slug: rx(q) },
        ],
      });
    }

    const filter = { $and: ve };
    const gorunum = (liste: any[]) => serialize(admin ? liste : liste.map(ilanHerkeseAcik));

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
        ilanlar: gorunum(ilanlar),
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
      ilanlar: gorunum(ilanlar),
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
    if (rateLimited(req, "ilan-ver", 10, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Çok fazla ilan gönderdiniz. Lütfen daha sonra tekrar deneyin." }, { status: 429 });
    }
    const session = await getServerSession(authOptions);
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
    }

    // Alan beyaz listesi: yapay/is_ai_generated, durum, teklifSayisi vb. istemciden ALINMAZ.
    const sektorId = clean(body.sektorId, 60);
    const baslik   = clean(body.baslik, 200);
    if (!sektorId || !/^[a-zA-Z0-9_-]+$/.test(sektorId) || !baslik) {
      return NextResponse.json({ error: "Sektör ve başlık zorunludur" }, { status: 400 });
    }

    const formDataHam = body.formData && typeof body.formData === "object" && !Array.isArray(body.formData) ? body.formData : {};
    const formData = temizObje(formDataHam) as Record<string, any>;
    if (JSON.stringify(formData).length > 30000) {
      return NextResponse.json({ error: "Form verisi çok büyük" }, { status: 400 });
    }
    const medyalar = medyaListesi(body.medyalar, 10);
    const kategori = clean(body.kategori, 80);
    const kategoriSlug = clean(body.kategoriSlug, 80);
    const tip = body.tip === "ticari" ? "ticari" : "bireysel";
    const rol = body.rol === "veren" ? "veren" : "alan";
    const butceMin = Math.max(0, sonluSayi(body.butceMin) ?? 0);
    const butceMax = Math.max(0, sonluSayi(body.butceMax) ?? 0);
    const butceBirimi = clean(body.butceBirimi, 8) || "₺";
    const str = (v: unknown, n: number) => (typeof v === "string" ? clean(v, n) : "");

    const db = await getDb();

    const ilanSehir  = clean(body.sehir, 60) || str(formData?.sehir, 60) || "turkiye";
    const ilanIlce   = clean(body.ilce, 60) || str(formData?.ilce, 60);
    const ilanSektor = sektorId;
    const ilanMeslek = clean(body.meslek, 80) || str(formData?.meslek, 80);

    const slug = await generateUniqueSlug(
      baslik,
      ilanSehir,
      ilanSektor,
      async (s) => {
        const existing = await db.collection("ilanlar").findOne({ slug: s });
        return !!existing;
      }
    );

    const aciklama = str(formData?.aciklama, 160);

    const ilan = {
      sektorId,
      baslik,
      slug,
      kategori:     kategori || str(formData?.altKategori, 80) || sektorId,
      kategoriSlug: kategoriSlug || sektorId,
      formData,
      medyalar,
      resimUrl:     medyalar[0] || null,
      butceMin,
      butceMax,
      butceBirimi,
      tip,
      rol,
      ulke:         clean(body.ulke, 60) || str(formData?.ulke, 60) || "Türkiye",
      sehir:        ilanSehir,
      ilce:         ilanIlce,
      meslek:       ilanMeslek,
      durum:        "aktif",
      teklifSayisi: 0,
      goruntulenme: 0,
      teklifeAcik:  true,
      yapay:        false,
      is_ai_generated: false,
      // ── SEO Meta
      seoTitle:       `${baslik} | SwapHubs`,
      seoDescription: aciklama || `${baslik} - SwapHubs'ta güvenli alım satım ve hizmet platformu`,
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
function serialize(data: any): any {
  if (Array.isArray(data)) return data.map(serialize);
  if (data && typeof data === "object") {
    const result: any = {};
    for (const [k, v] of Object.entries(data)) {
      if (k === "_id") {
        result["_id"] = v?.toString();
        result["id"] = v?.toString();
      } else {
        result[k] = serialize(v);
      }
    }
    return result;
  }
  return data;
}
