export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminRequest } from "@/lib/admin-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { clean } from "@/lib/api-guard";
import { idGecerli, regexKacir, tamSayi } from "@/lib/validate";
import { ilanHerkeseAcik } from "@/lib/ilan-public";

// Yönetici aracı. Yapay ilanlar silindikten sonra bu uç kaldırılabilir.
// ─── GET ───────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const admin = await isAdminRequest(req); // yalnızca yönetici (ilan sistemi herkese kapatıldı)
    if (!admin) return NextResponse.json({ error: "Gone" }, { status: 410 });

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
