import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { put } from "@vercel/blob"; 

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const db = await getDb();

    const baslik = formData.get("baslik") as string;
    const isimEn = formData.get("isimEn") as string;
    const fiyatStr = formData.get("fiyat") as string;
    
    // YENİ: Tek bir dosya yerine, formdan gelen "medya" isimli TÜM dosyaları (resim+video) alıyoruz
    const dosyalar = formData.getAll("medya") as File[];

    if (!baslik || !fiyatStr) {
      return NextResponse.json({ success: false, message: "Başlık ve fiyat zorunludur." }, { status: 400 });
    }

    const yuklenenLinkler: string[] = [];

    // 3. Seçilen tüm resim ve videoları sırayla Vercel Blob'a yükle
    for (const dosya of dosyalar) {
      if (dosya && dosya.size > 0) {
        try {
          // Dosya ismindeki boşlukları temizleyelim ki link bozulmasın
          const safeName = dosya.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
          const blob = await put(`swaphubs_tekstil_${Date.now()}_${safeName}`, dosya, {
            access: 'public',
          });
          yuklenenLinkler.push(blob.url);
        } catch (uploadError) {
          console.error("Dosya yükleme hatası:", uploadError);
        }
      }
    }

    // 4. Veritabanına gidecek veriyi toparlıyoruz
    const yeniUrun = {
      baslik,
      isimEn,
      fiyat: Number(fiyatStr),
      gorsel: yuklenenLinkler.length > 0 ? yuklenenLinkler[0] : "", // İlk seçilen dosyayı ana vitrin görseli yap
      medyalar: yuklenenLinkler, // Yüklenen TÜM resim ve video linklerini MongoDB'ye dizi olarak kaydet
      kategori: "tekstil",
      durum: "aktif",
      eklenmeTarihi: new Date(),
      createdAt: new Date(),
    };

    await db.collection("ilanlar").insertOne(yeniUrun);

    return NextResponse.json({ success: true, message: "Ürün, resimler ve videolar başarıyla yüklendi!" });
  } catch (error) {
    console.error("Genel API hatası:", error);
    return NextResponse.json({ success: false, message: "Sunucu hatası!" }, { status: 500 });
  }
}
