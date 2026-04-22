import TekstilClient, { Urun } from "./TekstilClient";

export default async function TekstilAntalyaPage() {
  
  // BURASI ADMİN PANELE BAĞLANACAK
  // İleride veritabanından veri çekeceğin yer burası olacak:
  // const dbUrunler = await fetch("https://swaphubs.com/api/urunler").then(res => res.json());

  // Şimdilik sistemin hata vermemesi ve tasarımı görebilmen için örnek veriler:
  const dinamikUrunler: Urun[] = [
    { 
      _id: "01", 
      isimTr: "Yazlık Elbise", 
      isimEn: "Summer Dresses", 
      fiyat: 1250, 
      resimUrl: "https://images.unsplash.com/photo-1515347619252-5a0208b04930?auto=format&fit=crop&q=80&w=400" 
    },
    { 
      _id: "02", 
      isimTr: "Keten Gömlek", 
      isimEn: "Linen Shirts", 
      fiyat: 850, 
      resimUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400" 
    },
    { 
      _id: "03", 
      isimTr: "Şort & Pantolon", 
      isimEn: "Shorts & Trousers", 
      fiyat: 600, 
      resimUrl: "" // Resim yoksa tasarım bozulmaz, sadece metin ve fiyat çıkar
    },
    { 
      _id: "04", 
      isimTr: "Bebek Giyim", 
      isimEn: "Baby Apparel", 
      fiyat: 450, 
      resimUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400" 
    }
  ];

  return <TekstilClient urunler={dinamikUrunler} />;
}
