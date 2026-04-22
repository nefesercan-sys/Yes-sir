import TekstilClient from "./TekstilClient";
// Senin kendi oluşturduğun mongodb.ts dosyasından getDb fonksiyonunu çağırıyoruz
import { getDb } from "@/lib/mongodb";

export default async function TekstilAntalyaPage() {
  try {
    // 1. Doğrudan senin 'hizmetara' veritabanına bağlanıyoruz
    const db = await getDb();

    // 2. Veritabanından tekstil ilanlarını çekiyoruz
    // DİKKAT: Veritabanındaki tablonun (collection) adı "ilanlar" değilse burayı değiştir (örneğin "urunler" yap)
    const dbUrunler = await db.collection("ilanlar").find({ 
      kategori: "tekstil", // Eğer kategoriyi başka isimle kaydediyorsan bunu da düzelt
      // durum: "aktif" // İstersen sadece aktif olanları göstermek için bunu açabilirsin
    }).toArray();

    // 3. MongoDB'den gelen veriyi bizim sayfaya uygun hale getiriyoruz
    const gercekUrunler = dbUrunler.map((urun: any) => ({
      _id: urun._id.toString(), // MongoDB ObjectId'sini yazıya çevirmek zorundayız
      isimTr: urun.baslik || urun.isimTr || "", // Admin panelde isme ne diyorsan onu yaz
      isimEn: urun.isimEn || urun.baslikEn || "",
      fiyat: urun.fiyat || 0,
      resimUrl: urun.gorsel || urun.resimUrl || "", // Resim linkini hangi kelimeyle kaydediyorsan onu yaz
    }));

    // 4. Veriyi animasyonlu sayfaya gönder
    return <TekstilClient urunler={gercekUrunler} />;

  } catch (error) {
    console.error("Veritabanından ilanlar çekilemedi:", error);
    // Hata olursa sayfa çökmesin diye boş gönderiyoruz
    return <TekstilClient urunler={[]} />;
  }
}
