import TekstilClient from "./TekstilClient";

// 1. KENDİ VAR OLAN BAĞLANTILARINI BURAYA YAZ
// Projendeki veritabanı bağlantı dosyanın ve modelinin yolu (Örneğin: Ilan, Urun, Product vb.)
import dbConnect from "@/lib/db"; // veya mongodb.ts, db.ts ne isim verdiysen
import Ilan from "@/models/Ilan"; // İlanlarını/Ürünlerini tuttuğun model dosyasının adı

export default async function TekstilAntalyaPage() {
  
  try {
    // 2. Kendi var olan bağlantını çalıştır
    await dbConnect();

    // 3. Kendi "Ilan" veya "Urun" modelinden tekstil olanları çek
    // (Eğer veritabanında 'kategori' veya 'durum' sütunlarının adları farklıysa burayı ona göre uyarla)
    const dbUrunler = await Ilan.find({ 
      kategori: "tekstil", 
      durum: "aktif" // Eğer böyle bir filtren yoksa bu satırı silebilirsin
    }).lean();

    // 4. Gelen karmaşık veriyi bizim animasyonlu sayfamızın formatına çevir
    const gercekUrunler = dbUrunler.map((urun: any) => ({
      _id: urun._id.toString(),
      isimTr: urun.isimTr || urun.baslik, // Senin db'de başlık nasıl kayıtlıysa
      isimEn: urun.isimEn || urun.baslikEn || "",
      fiyat: urun.fiyat || 0,
      resimUrl: urun.resimUrl || urun.gorsel || "", // Senin db'de resim sütununun adı neyse
    }));

    // 5. Veriyi animasyonlu client sayfana gönder!
    return <TekstilClient urunler={gercekUrunler} />;

  } catch (error) {
    console.error("Veri çekilirken hata oluştu:", error);
    
    // Veritabanına bağlanılamazsa sayfa çökmesin diye boş liste gönderiyoruz
    return <TekstilClient urunler={[]} />;
  }
}
