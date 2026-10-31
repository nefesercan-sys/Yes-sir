// ============================================================
// SwapHubs — app/api/teklifler/route.ts
// Teklif sistemi — ver, al, kabul et, reddet & Admin Denetimi
// ============================================================
import { isAdminRequest } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { ADMIN_EMAIL, clean, rateLimited } from "@/lib/api-guard";
import { idGecerli, sonluSayi, teklifEposta, temizObje } from "@/lib/validate";

// Teklif durum geçiş matrisi: hedef durum -> { izinli kaynak durumlar, kimler yapabilir }
// (ilan sahibi = "sahip", teklif veren = "veren"; yönetici rol şartını atlar, kaynak durum şartını atlamaz)
const GECISLER: Record<string, { kaynak: string[]; roller: ("sahip" | "veren")[] }> = {
  // "beklemede": /api/teklif/ver form şemasının eski "bekliyor" karşılığı
  kabul_edildi: { kaynak: ["bekliyor", "beklemede", "pazarlik"], roller: ["sahip"] },
  reddedildi:   { kaynak: ["bekliyor", "beklemede", "pazarlik"], roller: ["sahip"] },
  geri_alindi:  { kaynak: ["bekliyor", "beklemede", "pazarlik"], roller: ["veren"] },
  pazarlik:     { kaynak: ["bekliyor", "beklemede"],             roller: ["sahip", "veren"] },
};

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json([], { status: 401 });
    const email = session.user.email;

    const { searchParams } = new URL(req.url);
    const kendi  = searchParams.get("kendi");   // kendi verdiğim teklifler
    const ilanId = searchParams.get("ilanId");  // belirli bir ilana teklifler

    // Yönetici: oturum e-postası yönetici listesinde VEYA geçerli x-admin-key
    const isAdmin = await isAdminRequest(req);

    const db = await getDb();
    let filter: Record<string, any> = {};

    if (isAdmin && searchParams.get("admin") === "true") {
      // Admin "Tüm Teklifleri" görmek isterse filtre boş
      filter = {};
    } else if (kendi === "true") {
      filter["teklifVeren.email"] = email;
    } else if (ilanId) {
      if (!idGecerli(ilanId)) return NextResponse.json([], { status: 400 });
      // Bir ilanın tüm tekliflerini yalnızca ilan sahibi (veya yönetici) görür;
      // diğer kullanıcılar o ilandaki yalnızca KENDİ tekliflerini görür.
      const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(ilanId) }, { projection: { sahibi: 1 } });
      const sahipMi = !!ilan && ilan.sahibi?.email === email;
      if (isAdmin || sahipMi) filter.ilanId = ilanId;
      else { filter.ilanId = ilanId; filter["teklifVeren.email"] = email; }
    } else {
      // İlan sahibinin ilanlarına gelen teklifler (Veya yapay ilanlara gelen ve admine yönlenen teklifler)
      if (isAdmin) {
         filter["$or"] = [
            { "ilanSahibi.email": email },
            { "ilanSahibi.email": { $exists: false } }, // AI ilanlarında sahip e-postası olmayabilir
            { is_ai_generated: true }
         ];
      } else {
         filter["ilanSahibi.email"] = email;
      }
    }

    const teklifler = await db
      .collection("teklifler")
      .find(filter)
      .sort({ olusturuldu: -1 })
      .limit(500)
      .toArray();

    return NextResponse.json(serialize(teklifler));
  } catch (err) {
    console.error("GET teklifler error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
    const email = session.user.email;

    if (rateLimited(req, "teklif-oturum", 20, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Çok fazla teklif gönderdiniz. Lütfen daha sonra tekrar deneyin." }, { status: 429 });
    }

    const b = await req.json().catch(() => null);
    if (!b || typeof b !== "object") return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
    const ilanId = b.ilanId;
    const fiyat = sonluSayi(b.fiyat);
    const doviz = clean(b.doviz, 8);
    const aciklama = clean(b.aciklama, 2000);
    const teslimatSuresi = clean(typeof b.teslimatSuresi === "string" || typeof b.teslimatSuresi === "number" ? String(b.teslimatSuresi) : "", 60);
    const ekBilgiler = temizObje(b.ekBilgiler && typeof b.ekBilgiler === "object" && !Array.isArray(b.ekBilgiler) ? b.ekBilgiler : {});

    if (!idGecerli(ilanId) || fiyat === null || fiyat <= 0 || fiyat > 1e12) {
      return NextResponse.json({ error: "Geçerli bir ilan ve pozitif fiyat zorunludur" }, { status: 400 });
    }

    const db = await getDb();

    // İlanı bul
    const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(ilanId) });
    if (!ilan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    if (!ilan.teklifeAcik) return NextResponse.json({ error: "Bu ilan teklife kapalı" }, { status: 400 });

    const isAdmin = await isAdminRequest(req);
    // Kendi ilanıma teklif vermemi engelle (Ancak admin kendi ürettiği AI ilanı test etmek için teklif verebilir)
    if (ilan.sahibi?.email === email && !isAdmin) {
      return NextResponse.json({ error: "Kendi ilanınıza teklif veremezsiniz" }, { status: 400 });
    }

    // Daha önce teklif vermiş mi?
    const mevcutTeklif = await db.collection("teklifler").findOne({
      ilanId,
      "teklifVeren.email": email,
      durum: { $in: ["bekliyor", "kabul_edildi"] },
    });
    if (mevcutTeklif) {
      return NextResponse.json({ error: "Bu ilana zaten aktif teklifiniz var" }, { status: 400 });
    }

    const paraBirimi = doviz || ilan.butceBirimi || "₺";
    const teklif = {
      ilanId,
      ilanBaslik: ilan.baslik,
      teklifFiyat: fiyat,
      doviz: paraBirimi,
      aciklama,
      teslimatSuresi,
      ekBilgiler,
      durum: "bekliyor",
      teklifVeren: {
        email,
        ad: session.user.name,
        resim: session.user.image,
      },
      ilanSahibi: ilan.sahibi || { email: ADMIN_EMAIL, ad: "SwapHubs Sistem" }, // Eğer ilan AI ise sahibi Admin olsun
      is_ai_generated: ilan.is_ai_generated || false, // Teklifin AI ilana yapılıp yapılmadığını işaretle
      olusturuldu: new Date(),
      guncellendi: new Date(),
    };

    const result = await db.collection("teklifler").insertOne(teklif);

    // İlana teklif sayısını güncelle
    await db.collection("ilanlar").updateOne(
      { _id: new ObjectId(ilanId) },
      { $inc: { teklifSayisi: 1 } }
    );

    // İlan sahibine bildirim (Eğer ilan AI tarafından oluşturulmuşsa bildirim Admine gider)
    const bildirimAlicisi = ilan.is_ai_generated ? ADMIN_EMAIL : ilan.sahibi?.email;

    if (bildirimAlicisi) {
      await db.collection("bildirimler").insertOne({
        kullaniciEposta: bildirimAlicisi, // Panel arayüzünde "kullaniciEposta" olarak beklemiştik
        tip: "yeni_teklif",
        mesaj: `"${ilan.baslik}" ${ilan.is_ai_generated ? '(AI)' : ''} ilanınıza ${clean(session.user.name, 60) || "Bir kullanıcı"} tarafından ${fiyat.toLocaleString("tr-TR")} ${paraBirimi} teklif verildi.`,
        ilanId,
        teklifId: result.insertedId.toString(),
        okundu: false,
        tarih: new Date(),
      });
    }

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("POST teklifler error:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    const email = session.user.email;

    const b = await req.json().catch(() => null);
    const teklifId = b?.teklifId;
    const durum = b?.durum;
    if (!teklifId || !durum) return NextResponse.json({ error: "teklifId ve durum zorunlu" }, { status: 400 });
    if (!idGecerli(teklifId)) return NextResponse.json({ error: "Geçersiz teklif kimliği" }, { status: 400 });
    if (typeof durum !== "string" || !Object.prototype.hasOwnProperty.call(GECISLER, durum)) {
      return NextResponse.json({ error: "Geçersiz durum" }, { status: 400 });
    }

    const db = await getDb();
    const teklif = await db.collection("teklifler").findOne({ _id: new ObjectId(teklifId) });
    if (!teklif) return NextResponse.json({ error: "Teklif bulunamadı" }, { status: 404 });

    const isAdmin = await isAdminRequest(req);
    const sahipMi = teklif.ilanSahibi?.email === email;
    const verenMi = teklifEposta(teklif) === email;
    const gecis = GECISLER[durum];

    // YETKİ: rol matrisi (yönetici rol şartını atlar)
    if (!isAdmin && !gecis.roller.some((r) => (r === "sahip" ? sahipMi : verenMi))) {
      return NextResponse.json({ error: "Yetkiniz yok" }, { status: 403 });
    }
    // GEÇİŞ: yalnızca izinli kaynak durumdan (ör. reddedilmiş teklif sonradan kabul edilemez)
    if (!gecis.kaynak.includes(teklif.durum)) {
      return NextResponse.json({ error: "Bu teklif şu anki durumunda bu işleme uygun değil" }, { status: 409 });
    }

    // Koşullu güncelleme: okuma ile yazma arasında durum değiştiyse hiçbir şey yazılmaz
    const sonuc = await db.collection("teklifler").updateOne(
      { _id: new ObjectId(teklifId), durum: teklif.durum },
      { $set: { durum, guncellendi: new Date() } }
    );
    if (sonuc.matchedCount === 0) {
      return NextResponse.json({ error: "Teklif bu arada güncellendi, lütfen yenileyin" }, { status: 409 });
    }

    // Bildirim (Admin kabul/red ettiyse de bildirim orijinal teklif verene gider)
    const bildirimAlici = durum === "geri_alindi" ? teklif.ilanSahibi?.email : teklifEposta(teklif);
    const fiyatMetni = Number.isFinite(Number(teklif.teklifFiyat)) ? Number(teklif.teklifFiyat).toLocaleString("tr-TR") : "";
    const bildirimMesaj = durum === "kabul_edildi"
      ? `🎉 Teklifiniz kabul edildi! "${teklif.ilanBaslik}" ilanına verdiğiniz ${fiyatMetni} ${teklif.doviz || ""} teklif onaylandı.`
      : durum === "reddedildi"
      ? `❌ "${teklif.ilanBaslik}" ilanına verdiğiniz teklif maalesef reddedildi.`
      : durum === "pazarlik"
      ? `💬 "${teklif.ilanBaslik}" ilanındaki teklifiniz için pazarlık aşamasına geçildi.`
      : `Teklif geri alındı.`;

    if (bildirimAlici && bildirimAlici !== ADMIN_EMAIL) { // Kendimize geri bildirim atmayalım
      await db.collection("bildirimler").insertOne({
        kullaniciEposta: bildirimAlici,
        tip: durum === "kabul_edildi" ? "teklif_kabul" : "teklif_guncelle",
        mesaj: bildirimMesaj,
        ilanId: teklif.ilanId,
        teklifId,
        okundu: false,
        tarih: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PATCH teklifler error:", err);
    return NextResponse.json({ error: "Güncelleme hatası" }, { status: 500 });
  }
}

function serialize(data: any[]): any[] {
  return JSON.parse(JSON.stringify(data));
}
