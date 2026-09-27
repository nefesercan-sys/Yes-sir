import AnaSayfaClient from "@/providers/AnaSayfaClient";
import { getDb } from "@/lib/mongodb";

// SEO standardı: Yeni alan adı ve marka için güncellendi
const BASE = "https://terzihizmeti.com.tr";

export const metadata = {
  title: "Konyaaltı Terzi Can | Express Paça, Fermuar & Tadilat Hizmetleri",
  description: "Antalya Konyaaltı'nda profesyonel terzi hizmeti. Pantolon paçası, fermuar değişimi, özel dikim, abiye ve gelinlik tadilatı. Adrese ve otellere servis imkanı.",
  keywords: "konyaaltı terzi, antalya terzi, paça kısaltma fiyatları 2026, fermuar değişimi, özel dikim, hurma terzi, liman terzi, otele terzi",
  openGraph: {
    title: "Konyaaltı Terzi Can | Express Paça, Fermuar & Tadilat",
    description: "Antalya Konyaaltı'nda profesyonel giyim tadilatı, paça kısaltma, fermuar değişimi ve otele/adrese teslimat hizmeti.",
    url: BASE,
    siteName: "Terzi Can",
    locale: "tr_TR",
    type: "website",
  },
  alternates: {
    canonical: BASE,
  },
};

// ISR Optimizasyonu: Sunucuda bu sayfa 60 saniyede bir önbelleğe (cache) alınır.
export const revalidate = 60;

// Fiyat Listesi Bileşeni (Arama niyetini müşteriye çevirecek bölüm)
const FiyatListesi = () => {
  const hizmetler = [
    { name: 'Orijinal Kot Paçası Kısaltma', price: 'Uygun Fiyat / Express', time: 'Aynı Gün' },
    { name: 'Kumaş / Takım Elbise Paça Dikişi', price: 'Şeffaf Fiyatlandırma', time: 'Aynı Gün' },
    { name: 'Pantolon & Mont Fermuar Değişimi', price: 'Kaliteli YKK Fermuar', time: '1 Gün' },
    { name: 'Gelinlik & Abiye Daraltma / Tadilat', price: 'Özel İşçilik', time: 'Proje Bazlı' },
    { name: 'Otellere / Adrese Özel Ölçü & Teslimat', price: 'Servis İmkanı', time: 'Hızlı Randevu' },
  ];

  return (
    <section className="py-8 bg-white rounded-2xl shadow-sm border border-gray-100 my-6 mx-4 md:mx-auto max-w-5xl px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Konyaaltı Terzi Can Tadilat Hizmetleri</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Fiyatlarımız kıyafetin kumaş türüne, işçilik detayına ve teslimat süresine göre şeffaf şekilde belirlenir. Express teslimat seçeneği mevcuttur.
        </p>

        <div className="space-y-3">
          {hizmetler.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-[#B8975A]/10 transition-colors border border-transparent hover:border-[#B8975A]/20">
              <span className="font-medium text-gray-800 text-left">{item.name}</span>
              <div className="text-right">
                <span className="text-xs font-semibold text-[#B8975A] bg-[#B8975A]/10 px-2.5 py-1 rounded-full block mb-1">
                  {item.time}
                </span>
                <span className="text-xs text-gray-500">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <a
            href="https://wa.me/905318986418?text=Merhaba,%20terzi%20hizmetleri%20için%20fiyat%20bilgisi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            💬 WhatsApp ile Anında Fiyat Alın
          </a>
        </div>
      </div>
    </section>
  );
};

export default async function AnaSayfa() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ilanlar: any[] = [];
  
  try {
    const db = await getDb();
    
    // API endpoint'ine HTTP isteği atmak yerine doğrudan veritabanından çekiyoruz
    const rawIlanlar = await db
      .collection("ilanlar")
      .find({ durum: "aktif" })
      .sort({ createdAt: -1 })
      .limit(24)
      .toArray();

    ilanlar = JSON.parse(JSON.stringify(rawIlanlar));
  } catch (error) {
    console.error("Ana sayfa ilanları çekilirken hata oluştu:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* SEO ve Tıklama Oranı için Eklenen Yeni Fiyat/Bilgi Paneli */}
      <FiyatListesi />
      
      {/* Mevcut Altyapı Bileşeniniz */}
      <AnaSayfaClient initialIlanlar={ilanlar} ilkGorsel={null} />
    </div>
  );
}
