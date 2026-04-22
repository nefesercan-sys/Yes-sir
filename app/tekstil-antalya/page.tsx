import TekstilClient from "./TekstilClient";
import { getDb } from "@/lib/mongodb";

// 🚨 İŞTE ÇÖZÜM BURADA: Sayfanın eski önbelleği göstermesini engeller, her girişte canlı veriyi çeker!
export const dynamic = "force-dynamic";

export default async function TekstilAntalyaPage() {
  try {
    const db = await getDb();
    
    // Sadece tekstil kategorisindeki ve aktif olan ilanları çek
    const dbUrunler = await db.collection("ilanlar").find({ 
      kategori: "tekstil",
      durum: "aktif"
    }).sort({ eklenmeTarihi: -1 }).toArray(); // En son eklenen en üstte çıksın diye sıraladık

    const gercekUrunler = dbUrunler.map((urun: any) => ({
      _id: urun._id.toString(),
      isimTr: urun.baslik || "", 
      isimEn: urun.isimEn || "",
      fiyat: urun.fiyat || 0,
      // Yeni çoklu resim sistemine uyum sağladık (medyalar listesi varsa ilkini gösterir)
      resimUrl: (urun.medyalar && urun.medyalar.length > 0) ? urun.medyalar[0] : (urun.gorsel || ""), 
    }));

    return <TekstilClient urunler={gercekUrunler} />;

  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return <TekstilClient urunler={[]} />;
  }
}
