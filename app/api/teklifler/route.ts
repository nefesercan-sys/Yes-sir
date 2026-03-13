// ============================================================
// SwapHubs — app/api/teklifler/route.ts
// Teklif sistemi — ver, al, kabul et, reddet & Admin Denetimi
// ============================================================
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Admin e-posta tanımlaması
const ADMIN_EMAIL = 'nefesercan@gmail.com';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json([], { status: 401 });

    const { searchParams } = new URL(req.url);
    const kendi  = searchParams.get("kendi");   // kendi verdiğim teklifler
    const ilanId = searchParams.get("ilanId");  // belirli bir ilana teklifler
    
    // Panel veya Komuta Merkezinden özel bir "x-admin-key" gönderilmişse Admin kabul et
    const isAdmin = session.user.email === ADMIN_EMAIL || req.headers.get("x-admin-key") === process.env.NEXT_PUBLIC_ADMIN_KEY;

    const db = await getDb();
    let filter: Record<string, any> = {};

    if (isAdmin && searchParams.get("admin") === "true") {
      // Eğer admin "Tüm Teklifleri" görmek isterse, filtreyi boş bırakıyoruz (Tüm db çekilir)
      filter = {};
    } else if (ilanId) {
      filter.ilanId = ilanId;
    } else if (kendi === "true") {
      filter["teklifVeren.email"] = session.user.email;
    } else {
      // İlan sahibinin ilanlarına gelen teklifler (Veya yapay ilanlara gelen ve admine yönlenen teklifler)
      if (isAdmin) {
         // Admin isek kendi paneline hem kendi ilanlarına gelenleri hem de AI (yapay) ilanlara gelenleri çek
         filter["$or"] = [
            { "ilanSahibi.email": session.user.email },
            { "ilanSahibi.email": { $exists: false } }, // AI ilanlarında sahip e-postası olmayabilir
            { is_ai_generated: true }
         ];
      } else {
         filter["ilanSahibi.email"] = session.user.email;
      }
    }

    const teklifler = await db
      .collection("teklifler")
      .find(filter)
      .sort({ olusturuldu: -1 })
      .toArray();

    return NextResponse.json(serialize(teklifler));
  } catch (err) {
    console.error("GET teklifler error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });

    const { ilanId, fiyat, doviz, aciklama, teslimatSuresi, ekBilgiler } = await req.json();

    if (!ilanId || !fiyat) {
      return NextResponse.json({ error: "İlan ID ve fiyat zorunludur" }, { status: 400 });
    }

    const db = await getDb();

    // İlanı bul
    const ilan = await db.collection("ilanlar").findOne({ _id: new ObjectId(ilanId) });
    if (!ilan) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    if (!ilan.teklifeAcik) return NextResponse.json({ error: "Bu ilan teklife kapalı" }, { status: 400 });
    
    // Kendi ilanıma teklif vermemi engelle (Ancak admin kendi ürettiği AI ilanı test etmek için teklif verebilir)
    if (ilan.sahibi?.email === session.user.email && session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Kendi ilanınıza teklif veremezsiniz" }, { status: 400 });
    }

    // Daha önce teklif vermiş mi?
    const mevcutTeklif = await db.collection("teklifler").findOne({
      ilanId,
      "teklifVeren.email": session.user.email,
      durum: { $in: ["bekliyor", "kabul_edildi"] },
    });
    if (mevcutTeklif) {
      return NextResponse.json({ error: "Bu ilana zaten aktif teklifiniz var" }, { status: 400 });
    }

    const teklif = {
      ilanId,
      ilanBaslik: ilan.baslik,
      teklifFiyat: Number(fiyat),
      doviz: doviz || ilan.butceBirimi || "₺",
      aciklama: aciklama || "",
      teslimatSuresi: teslimatSuresi || "",
      ekBilgiler: ekBilgiler || {},
      durum: "bekliyor",
      teklifVeren: {
        email: session.user.email,
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
        mesaj: `"${ilan.baslik}" ${ilan.is_ai_generated ? '(AI)' : ''} ilanınıza ${session.user.name} tarafından ${Number(fiyat).toLocaleString("tr-TR")} ${doviz || "₺"} teklif verildi.`,
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
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const { teklifId, durum } = await req.json();
    if (!teklifId || !durum) return NextResponse.json({ error: "teklifId ve durum zorunlu" }, { status: 400 });

    const gecerliDurumlar = ["kabul_edildi", "reddedildi", "geri_alindi", "pazarlik"];
    if (!gecerliDurumlar.includes(durum)) {
      return NextResponse.json({ error: "Geçersiz durum" }, { status: 400 });
    }

    const db = await getDb();
    const teklif = await db.collection("teklifler").findOne({ _id: new ObjectId(teklifId) });
    if (!teklif) return NextResponse.json({ error: "Teklif bulunamadı" }, { status: 404 });

    const isAdmin = session.user.email === ADMIN_EMAIL;

    // YETKİ KONTROLÜ (Admin her şeyi yapabilir)
    if (!isAdmin) {
      // Sadece ilan sahibi kabul/red edebilir, teklif veren geri alabilir
      if (durum === "geri_alindi" && teklif.teklifVeren?.email !== session.user.email) {
        return NextResponse.json({ error: "Yetkiniz yok" }, { status: 403 });
      }
      if (["kabul_edildi", "reddedildi"].includes(durum) && teklif.ilanSahibi?.email !== session.user.email) {
        return NextResponse.json({ error: "Yetkiniz yok" }, { status: 403 });
      }
    }

    await db.collection("teklifler").updateOne(
      { _id: new ObjectId(teklifId) },
      { $set: { durum, guncellendi: new Date() } }
    );

    // Bildirim (Admin kabul/red ettiyse de bildirim orijinal teklif verene gider)
    const bildirimAlici = durum === "geri_alindi" ? teklif.ilanSahibi?.email : teklif.teklifVeren?.email;
    const bildirimMesaj = durum === "kabul_edildi"
      ? `🎉 Teklifiniz kabul edildi! "${teklif.ilanBaslik}" ilanına verdiğiniz ${teklif.teklifFiyat.toLocaleString()} ${teklif.doviz} teklif onaylandı.`
      : durum === "reddedildi"
      ? `❌ "${teklif.ilanBaslik}" ilanına verdiğiniz teklif maalesef reddedildi.`
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
