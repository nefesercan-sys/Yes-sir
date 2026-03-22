// ============================================================
// SwapHubs — lib/sektorler.ts
// Tüm sektörler + detaylı form alanları
// ============================================================

export type FormAlan = {
  key: string;
  label: string;
  tip: "text" | "number" | "select" | "multiselect" | "range" | "textarea" | "date" | "daterange" | "toggle" | "adres";
  zorunlu?: boolean;
  placeholder?: string;
  secenekler?: string[];
  birim?: string;
  grup?: string;
};

export type Sektor = {
  id: string;
  ad: string;
  emoji: string;
  tip: "bireysel" | "ticari" | "both";
  renk: string;
  icon: string;
  altKategoriler: string[];
  butceBirimi: string;
  hizmetAlanFormu: FormAlan[];
  hizmetVerenFormu: FormAlan[];
};

// ============================================================
// ORTAK FORM ALANLARI
// ============================================================
const ORTAK_ALAN: FormAlan[] = [
  { key: "teslimatSuresi", label: "Teslimat / Tamamlanma Süresi", tip: "select", grup: "Genel Detaylar",
    secenekler: ["Acil (1-3 gün)", "1 hafta", "2 hafta", "1 ay", "1-3 ay", "3-6 ay", "6 ay+", "Esnek"] },
  { key: "odemeYontemi", label: "Ödeme Yöntemi", tip: "multiselect", grup: "Genel Detaylar",
    secenekler: ["Nakit", "Havale/EFT", "Kredi Kartı", "Akreditif (L/C)", "Vadeli", "Peşin", "PayPal", "Kripto"] },
];

const ORTAK_ALAN_VEREN: FormAlan[] = [
  { key: "deneyimYili", label: "Deneyim Yılı", tip: "select", grup: "Hakkımda",
    secenekler: ["1 yıldan az", "1-3 yıl", "3-5 yıl", "5-10 yıl", "10 yıl+"] },
  { key: "referans", label: "Referans / Portföy Linki", tip: "text", placeholder: "https://...", grup: "Hakkımda" },
];

// ============================================================
// SEKTÖR TANIMLARI
// ============================================================
const SEKTORLER_HAM: Omit<Sektor, "icon">[] = [

  // ── TEKSTİL ──
  {
    id: "tekstil", ad: "Tekstil & Hazır Giyim", emoji: "👕",
    tip: "both", renk: "#8b5cf6",
    altKategoriler: ["Kumaş", "Hazır Giyim", "İplik", "Örme", "Dokuma", "Aksesuar"],
    butceBirimi: "USD",
    hizmetAlanFormu: [
      { key: "urunTipi", label: "Ürün Tipi", tip: "select", zorunlu: true, grup: "Ürün Bilgisi",
        secenekler: ["Kumaş", "Hazır Giyim", "İplik", "Örme Kumaş", "Dokuma Kumaş", "Denim", "Polar", "Şifon", "Keten", "Pamuklu", "Sentetik", "Diğer"] },
      { key: "miktar", label: "Miktar", tip: "number", zorunlu: true, placeholder: "Örn: 5000", birim: "Metre / Adet", grup: "Ürün Bilgisi" },
      { key: "renk", label: "Renk / Renk Skalası", tip: "text", placeholder: "Örn: Beyaz, Siyah, Pantone 186C", grup: "Ürün Bilgisi" },
      { key: "gramaj", label: "Gramaj", tip: "number", placeholder: "Örn: 180", birim: "gr/m²", grup: "Ürün Bilgisi" },
      { key: "kompozisyon", label: "Kumaş Kompozisyonu", tip: "text", placeholder: "Örn: %100 Pamuk, %80 Polyester %20 Elastan", grup: "Ürün Bilgisi" },
      { key: "uretimYeri", label: "Üretim Yeri Tercihi", tip: "select", grup: "Tedarik",
        secenekler: ["Türkiye", "Çin", "Bangladeş", "Hindistan", "Vietnam", "Pakistan", "Fark etmez"] },
      { key: "sertifika", label: "Sertifika Gereksinimleri", tip: "multiselect", grup: "Tedarik",
        secenekler: ["OEKO-TEX", "GOTS", "ISO 9001", "CE", "REACH", "Sertifika Gerekmiyor"] },
      { key: "numune", label: "Numune Talep Ediliyor mu?", tip: "toggle", grup: "Tedarik" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "urunTipi", label: "Sunulan Ürün / Hizmet", tip: "multiselect", zorunlu: true, grup: "Ürün Bilgisi",
        secenekler: ["Kumaş Satışı", "Fason Üretim", "Kesim-Dikiş", "Yıkama", "Boyama", "Baskı", "Nakış", "Ambalaj", "Depolama"] },
      { key: "minimumSiparis", label: "Minimum Sipariş Miktarı (MOQ)", tip: "number", zorunlu: true, placeholder: "Örn: 500", birim: "Adet/Metre", grup: "Kapasite" },
      { key: "aylikKapasite", label: "Aylık Üretim Kapasitesi", tip: "number", placeholder: "Örn: 50000", birim: "Adet/Metre", grup: "Kapasite" },
      { key: "makineParki", label: "Makine Parkı", tip: "text", placeholder: "Örn: 50 overlok, 30 düz dikiş", grup: "Kapasite" },
      { key: "sertifika", label: "Sertifikalar", tip: "multiselect", grup: "Kalite",
        secenekler: ["OEKO-TEX", "GOTS", "ISO 9001", "CE", "REACH", "Hiçbiri"] },
      { key: "ihracatDeneyimi", label: "İhracat Deneyimi", tip: "toggle", grup: "Kapasite" },
      { key: "hedefPazarlar", label: "Hedef Pazarlar", tip: "multiselect", grup: "Kapasite",
        secenekler: ["Türkiye", "AB Ülkeleri", "ABD", "Orta Doğu", "Afrika", "Rusya/BDT", "Uzak Doğu", "Tüm Dünya"] },
      ...ORTAK_ALAN,
    ],
  },

  // ── GIDA & TARIM ──
  {
    id: "gida-tarim", ad: "Gıda & Tarım", emoji: "🌾",
    tip: "both", renk: "#84cc16",
    altKategoriler: ["Tahıl", "Sebze & Meyve", "Bakliyat", "İşlenmiş Gıda", "Hayvansal Ürün", "Organik"],
    butceBirimi: "USD",
    hizmetAlanFormu: [
      { key: "urunKategorisi", label: "Ürün Kategorisi", tip: "select", zorunlu: true, grup: "Ürün Bilgisi",
        secenekler: ["Tahıl & Hububat", "Sebze", "Meyve", "Bakliyat", "Yağlı Tohumlar", "Hayvansal Ürün", "Süt Ürünleri", "İşlenmiş Gıda", "Organik Ürün", "Baharat", "Kuru Meyve", "Fındık & Kuruyemiş"] },
      { key: "urunAdi", label: "Ürün Adı", tip: "text", zorunlu: true, placeholder: "Örn: Buğday, Domates, Findık", grup: "Ürün Bilgisi" },
      { key: "miktar", label: "Miktar", tip: "number", zorunlu: true, placeholder: "Örn: 20", birim: "Ton", grup: "Ürün Bilgisi" },
      { key: "kaliteSinifi", label: "Kalite Sınıfı", tip: "select", grup: "Kalite",
        secenekler: ["1. Sınıf", "2. Sınıf", "3. Sınıf", "İhracat Kalitesi", "Standart", "Organik Sertifikalı"] },
      { key: "ambalaj", label: "Ambalaj Tipi", tip: "select", grup: "Ambalaj & Teslimat",
        secenekler: ["Dökme", "Çuvallı (25kg)", "Çuvallı (50kg)", "Big Bag (1 Ton)", "Vakumlu", "Özel Ambalaj"] },
      { key: "teslimatYeri", label: "Teslimat Yeri", tip: "select", grup: "Ambalaj & Teslimat",
        secenekler: ["EXW (İşyerinden)", "FOB (Gemiye Yüklenmiş)", "CIF (Sigorta & Navlun Dahil)", "DAP (Varış Yerine)", "Yurt İçi Teslimat"] },
      { key: "gida_sertifika", label: "Sertifika", tip: "multiselect", grup: "Kalite",
        secenekler: ["Organik", "GlobalGAP", "ISO 22000", "Helal", "Kosher", "FSSC 22000", "Sertifika Gerekmiyor"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "urunKategorisi", label: "Sunduğunuz Ürün", tip: "multiselect", zorunlu: true, grup: "Ürün Bilgisi",
        secenekler: ["Tahıl & Hububat", "Sebze", "Meyve", "Bakliyat", "Yağlı Tohumlar", "Hayvansal Ürün", "Süt Ürünleri", "İşlenmiş Gıda", "Organik Ürün", "Baharat", "Kuru Meyve", "Fındık & Kuruyemiş"] },
      { key: "yillikKapasite", label: "Yıllık Üretim/Tedarik Kapasitesi", tip: "number", placeholder: "Örn: 500", birim: "Ton", grup: "Kapasite" },
      { key: "depolamaKapasitesi", label: "Depolama Kapasitesi", tip: "number", placeholder: "Örn: 1000", birim: "Ton", grup: "Kapasite" },
      { key: "ihracatDeneyimi", label: "İhracat Deneyimi Var mı?", tip: "toggle", grup: "Kapasite" },
      { key: "sertifika", label: "Sertifikalar", tip: "multiselect", grup: "Kalite",
        secenekler: ["Organik", "GlobalGAP", "ISO 22000", "Helal", "Kosher", "FSSC 22000", "Hiçbiri"] },
      { key: "hedefUlkeler", label: "Hedef Ülkeler", tip: "multiselect", grup: "Kapasite",
        secenekler: ["Türkiye", "AB", "Körfez Ülkeleri", "Kuzey Afrika", "Rusya/BDT", "Uzak Doğu", "Tüm Dünya"] },
      ...ORTAK_ALAN,
    ],
  },

  // ── LOJİSTİK ──
  {
    id: "lojistik", ad: "Lojistik & Gümrük", emoji: "🚢",
    tip: "both", renk: "#3b82f6",
    altKategoriler: ["Deniz Taşımacılığı", "Hava Kargo", "Kara Nakliye", "Gümrük", "Depolama"],
    butceBirimi: "USD",
    hizmetAlanFormu: [
      { key: "tasimaTipi", label: "Taşıma Tipi", tip: "multiselect", zorunlu: true, grup: "Taşıma Bilgisi",
        secenekler: ["Deniz Yolu (FCL)", "Deniz Yolu (LCL)", "Hava Kargo", "Kara Nakliye", "Demiryolu", "Çok Modlu"] },
      { key: "yukTipi", label: "Yük Tipi", tip: "select", zorunlu: true, grup: "Taşıma Bilgisi",
        secenekler: ["Genel Yük", "Konteyner", "Dökme Yük", "Soğuk Zincir", "Tehlikeli Madde", "Proje Kargo", "Ro-Ro"] },
      { key: "agirlik", label: "Tahmini Ağırlık", tip: "number", placeholder: "Örn: 5", birim: "Ton", grup: "Yük Bilgisi" },
      { key: "hacim", label: "Tahmini Hacim", tip: "number", placeholder: "Örn: 10", birim: "m³", grup: "Yük Bilgisi" },
      { key: "yuklemeLimani", label: "Yükleme Limanı / Şehri", tip: "text", zorunlu: true, placeholder: "Örn: İstanbul, İzmir", grup: "Güzergah" },
      { key: "bosaltmaLimani", label: "Boşaltma Limanı / Şehri", tip: "text", zorunlu: true, placeholder: "Örn: Hamburg, Dubai", grup: "Güzergah" },
      { key: "gumruk", label: "Gümrükleme Hizmeti Gerekiyor mu?", tip: "toggle", grup: "Ek Hizmetler" },
      { key: "sigorta", label: "Kargo Sigortası Gerekiyor mu?", tip: "toggle", grup: "Ek Hizmetler" },
      { key: "depolama", label: "Depolama Hizmeti Gerekiyor mu?", tip: "toggle", grup: "Ek Hizmetler" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "hizmetTipi", label: "Sunulan Hizmetler", tip: "multiselect", zorunlu: true, grup: "Hizmet Bilgisi",
        secenekler: ["Deniz Taşımacılığı", "Hava Kargo", "Kara Nakliye", "Gümrük Müşavirliği", "Depolama & Lojistik", "Sigorta", "Proje Kargo", "Soğuk Zincir"] },
      { key: "operasyonBolgeleri", label: "Operasyon Bölgeleri", tip: "multiselect", grup: "Kapasite",
        secenekler: ["Türkiye İç Hat", "Avrupa", "Orta Doğu", "Uzak Doğu", "ABD/Kanada", "Afrika", "CIS Ülkeleri", "Tüm Dünya"] },
      { key: "filo", label: "Araç/Konteyner Filosu", tip: "text", placeholder: "Örn: 20 TIR, 50x20ft konteyner", grup: "Kapasite" },
      { key: "iso", label: "ISO / Yetki Belgeleri", tip: "multiselect", grup: "Belgeler",
        secenekler: ["ISO 9001", "ISO 14001", "AEO Yetkili Statüsü", "IATA Üyeliği", "FIATA Üyeliği", "Gümrük Müşavirliği Belgesi"] },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── İNŞAAT MALZEMELERİ ──
  {
    id: "insaat-malz", ad: "İnşaat Malzemeleri", emoji: "🏗️",
    tip: "both", renk: "#f59e0b",
    altKategoriler: ["Çimento", "Demir-Çelik", "Tuğla & Blok", "Seramik", "Boya", "İzolasyon"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "malzemeTipi", label: "Malzeme Tipi", tip: "select", zorunlu: true, grup: "Malzeme Bilgisi",
        secenekler: ["Çimento", "Beton", "Demir & Çelik", "Tuğla & Blok", "Seramik & Karo", "Boya & Vernik", "İzolasyon", "Alçı & Sıva", "Çatı Malzemeleri", "Kapı & Pencere", "Ahşap & Parke", "Elektrik Malzemeleri", "Sıhhi Tesisat", "Diğer"] },
      { key: "miktar", label: "Miktar", tip: "number", zorunlu: true, placeholder: "Örn: 100", birim: "Ton / Adet / m²", grup: "Malzeme Bilgisi" },
      { key: "proje", label: "Proje Tipi", tip: "select", grup: "Proje",
        secenekler: ["Konut", "Ticari Bina", "Sanayi", "Altyapı", "Tadilat", "Diğer"] },
      { key: "teslimatYeri", label: "Teslimat Adresi", tip: "adres", grup: "Teslimat" },
      { key: "teslimatTarihi", label: "İstenen Teslimat Tarihi", tip: "date", grup: "Teslimat" },
      { key: "faturaTipi", label: "Fatura Tipi", tip: "select", grup: "Ticari",
        secenekler: ["Bireysel", "Kurumsal / Şirket", "İhracat Faturası"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "malzemeTipi", label: "Sunulan Malzemeler", tip: "multiselect", zorunlu: true, grup: "Ürün Bilgisi",
        secenekler: ["Çimento", "Beton", "Demir & Çelik", "Tuğla & Blok", "Seramik & Karo", "Boya & Vernik", "İzolasyon", "Alçı & Sıva", "Çatı Malzemeleri", "Kapı & Pencere", "Ahşap & Parke"] },
      { key: "stokDurumu", label: "Stok Durumu", tip: "select", grup: "Stok",
        secenekler: ["Stokta Mevcut", "Siparişe Göre Üretim", "Kısmi Stok", "İthal Ürün"] },
      { key: "minimumSiparis", label: "Minimum Sipariş", tip: "number", placeholder: "Örn: 10", birim: "Ton / m²", grup: "Stok" },
      { key: "teslimatBolgesi", label: "Teslimat Bölgesi", tip: "multiselect", grup: "Teslimat",
        secenekler: ["İstanbul", "Ankara", "İzmir", "Tüm Türkiye", "Yurt Dışı"] },
      { key: "belgeler", label: "Belgeler & Sertifikalar", tip: "multiselect", grup: "Belgeler",
        secenekler: ["TSE", "CE", "ISO 9001", "Yapı Malzemeleri Yönetmeliği", "İhracat Belgesi"] },
      ...ORTAK_ALAN,
    ],
  },

  // ── ÜRETİM & FASON ──
  {
    id: "uretim", ad: "Üretim & Fason", emoji: "🏭",
    tip: "ticari", renk: "#64748b",
    altKategoriler: ["Fason Üretim", "Özel Üretim", "Prototip", "Montaj", "Ambalaj"],
    butceBirimi: "USD",
    hizmetAlanFormu: [
      { key: "sektorAlan", label: "Sektör / Ürün Grubu", tip: "select", zorunlu: true, grup: "Üretim Bilgisi",
        secenekler: ["Tekstil & Giyim", "Metal & Çelik", "Plastik & Kalıp", "Elektronik", "Mobilya & Ahşap", "Gıda & İçecek", "Kimya & Boya", "Ambalaj", "Otomotiv Parça", "Medikal", "Diğer"] },
      { key: "urunAdi", label: "Üretilecek Ürün", tip: "text", zorunlu: true, placeholder: "Örn: Polo yaka tişört, plastik şişe kapağı", grup: "Üretim Bilgisi" },
      { key: "miktar", label: "Üretim Adedi", tip: "number", zorunlu: true, placeholder: "Örn: 10000", birim: "Adet", grup: "Üretim Bilgisi" },
      { key: "uretimTipi", label: "Üretim Tipi", tip: "select", grup: "Üretim Bilgisi",
        secenekler: ["Fason (Hammadde Müşteriden)", "Tam Üretim (Hammadde Dahil)", "Montaj", "Prototip & Örnek", "Tekrar Sipariş"] },
      { key: "teknikResim", label: "Teknik Çizim / Ölçü Var mı?", tip: "toggle", grup: "Teknik" },
      { key: "numune", label: "Numune Onayı Gerekiyor mu?", tip: "toggle", grup: "Teknik" },
      { key: "teslimatSuresi", label: "İstenen Teslim Süresi", tip: "select", grup: "Teslimat",
        secenekler: ["1-2 Hafta", "2-4 Hafta", "1-2 Ay", "2-3 Ay", "3 Ay+", "Esnek"] },
      { key: "kaliteKontrol", label: "Kalite Kontrol Şartı", tip: "multiselect", grup: "Kalite",
        secenekler: ["ISO 9001", "Yerinde Denetim", "Numune Testi", "3. Taraf Denetim", "Şart Koşmuyorum"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "uzmanlikAlani", label: "Uzmanlık Alanı", tip: "multiselect", zorunlu: true, grup: "Kapasite",
        secenekler: ["Tekstil & Giyim", "Metal İşleme", "Plastik Enjeksiyon", "Elektronik Montaj", "Mobilya & Ahşap", "Gıda İşleme", "Kimya & Boya", "Ambalaj", "CNC & Torna", "Döküm", "Diğer"] },
      { key: "aylikKapasite", label: "Aylık Üretim Kapasitesi", tip: "text", zorunlu: true, placeholder: "Örn: 50.000 adet/ay", grup: "Kapasite" },
      { key: "minimumSiparis", label: "Minimum Sipariş Miktarı (MOQ)", tip: "number", placeholder: "Örn: 500", birim: "Adet", grup: "Kapasite" },
      { key: "makineParki", label: "Makine / Ekipman Parkı", tip: "textarea", placeholder: "Sahip olduğunuz makine ve ekipmanları kısaca açıklayın", grup: "Kapasite" },
      { key: "sertifika", label: "Kalite Sertifikaları", tip: "multiselect", grup: "Kalite",
        secenekler: ["ISO 9001", "ISO 14001", "CE", "TSE", "FDA", "Hiçbiri"] },
      { key: "ihracatDeneyimi", label: "İhracat Deneyimi", tip: "toggle", grup: "Kapasite" },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── EMLAK SATIŞ ──
  {
    id: "emlak-satis", ad: "Emlak Alım Satım", emoji: "🏢",
    tip: "both", renk: "#3b82f6",
    altKategoriler: ["Konut", "İşyeri", "Arsa", "Depo", "Fabrika"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "emlakTipi", label: "Emlak Tipi", tip: "select", zorunlu: true, grup: "Emlak Bilgisi",
        secenekler: ["Daire", "Villa", "Müstakil Ev", "İşyeri", "Ofis", "Dükkan", "Arsa", "Tarla", "Depo & Fabrika", "Otel"] },
      { key: "metrekare", label: "Metrekare", tip: "number", placeholder: "Örn: 120", birim: "m²", grup: "Emlak Bilgisi" },
      { key: "odaSayisi", label: "Oda Sayısı", tip: "select", grup: "Emlak Bilgisi",
        secenekler: ["Stüdyo", "1+0", "1+1", "2+1", "3+1", "4+1", "5+1", "6+1 ve üzeri", "Uygulanamaz"] },
      { key: "banyoSayisi", label: "Banyo Sayısı", tip: "select", grup: "Emlak Bilgisi",
        secenekler: ["1", "2", "3", "4+"] },
      { key: "kat", label: "Kat", tip: "select", grup: "Emlak Bilgisi",
        secenekler: ["Zemin", "1", "2", "3", "4", "5", "6-10", "10+", "Müstakil"] },
      { key: "bina_yasi", label: "Bina Yaşı", tip: "select", grup: "Yapı Özellikleri",
        secenekler: ["Sıfır / Proje", "0-5 Yıl", "5-10 Yıl", "10-20 Yıl", "20 Yıl+"] },
      { key: "isitma", label: "Isıtma Sistemi", tip: "select", grup: "Yapı Özellikleri",
        secenekler: ["Doğalgaz Merkezi", "Doğalgaz Bireysel", "Elektrikli", "Klimalı", "Yerden Isıtma", "Soba", "Yok"] },
      { key: "ozellikler", label: "Özellikler", tip: "multiselect", grup: "Özellikler",
        secenekler: ["Asansör", "Otopark", "Balkon", "Teras", "Havuz", "Spor Salonu", "Güvenlik", "Site İçi", "Eşyalı", "Depolu"] },
      { key: "tapu", label: "Tapu Durumu", tip: "select", grup: "Hukuki",
        secenekler: ["Kat Mülkiyeti", "Kat İrtifakı", "Hisseli Tapu", "Arsa Tapusu", "Tahsis"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "emlakTipi", label: "Satılan Emlak Tipi", tip: "select", zorunlu: true, grup: "Emlak Bilgisi",
        secenekler: ["Daire", "Villa", "Müstakil Ev", "İşyeri", "Ofis", "Dükkan", "Arsa", "Tarla", "Depo & Fabrika"] },
      { key: "metrekare", label: "Brüt / Net Metrekare", tip: "text", placeholder: "Örn: Brüt 130m² / Net 115m²", grup: "Emlak Bilgisi" },
      { key: "odaSayisi", label: "Oda Sayısı", tip: "select", grup: "Emlak Bilgisi",
        secenekler: ["Stüdyo", "1+0", "1+1", "2+1", "3+1", "4+1", "5+1", "6+1 ve üzeri"] },
      { key: "kat", label: "Bulunduğu Kat / Toplam Kat", tip: "text", placeholder: "Örn: 3/8", grup: "Emlak Bilgisi" },
      { key: "bina_yasi", label: "Bina Yaşı", tip: "select", grup: "Yapı Özellikleri",
        secenekler: ["Sıfır / Proje", "0-5 Yıl", "5-10 Yıl", "10-20 Yıl", "20 Yıl+"] },
      { key: "ozellikler", label: "Özellikler", tip: "multiselect", grup: "Özellikler",
        secenekler: ["Asansör", "Otopark", "Balkon", "Teras", "Havuz", "Spor Salonu", "Güvenlik", "Site İçi", "Eşyalı", "Depolu", "Akıllı Ev"] },
      { key: "tapu", label: "Tapu Durumu", tip: "select", grup: "Hukuki",
        secenekler: ["Kat Mülkiyeti", "Kat İrtifakı", "Hisseli Tapu", "Arsa Tapusu"] },
      { key: "acikArtirima", label: "Pazarlığa Açık mı?", tip: "toggle", grup: "Fiyat" },
      ...ORTAK_ALAN,
    ],
  },

  // ── EMLAK KİRALAMA ──
  {
    id: "emlak-kiralama", ad: "Emlak Kiralama", emoji: "🏠",
    tip: "both", renk: "#3b82f6",
    altKategoriler: ["Konut", "İşyeri", "Günlük Kiralık", "Depo"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "emlakTipi", label: "Emlak Tipi", tip: "select", zorunlu: true, grup: "Emlak Bilgisi",
        secenekler: ["Daire", "Villa", "Müstakil Ev", "İşyeri", "Ofis", "Dükkan", "Depo", "Günlük Kiralık"] },
      { key: "kiralamaSuresi", label: "Kiralama Süresi", tip: "select", zorunlu: true, grup: "Kiralama",
        secenekler: ["Günlük", "Haftalık", "Aylık", "6 Aylık", "Yıllık", "Uzun Dönem"] },
      { key: "metrekare", label: "İstenen Metrekare (min)", tip: "number", placeholder: "Örn: 80", birim: "m²", grup: "Emlak Bilgisi" },
      { key: "odaSayisi", label: "Oda Sayısı", tip: "select", grup: "Emlak Bilgisi",
        secenekler: ["Stüdyo", "1+1", "2+1", "3+1", "4+1", "5+1", "Fark Etmez"] },
      { key: "ozellikler", label: "Aranan Özellikler", tip: "multiselect", grup: "Özellikler",
        secenekler: ["Eşyalı", "Asansör", "Otopark", "Balkon", "Güvenlik", "İnternet", "Site İçi", "Merkezi Konum"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "emlakTipi", label: "Kiralanan Emlak Tipi", tip: "select", zorunlu: true, grup: "Emlak Bilgisi",
        secenekler: ["Daire", "Villa", "Müstakil Ev", "İşyeri", "Ofis", "Dükkan", "Depo", "Günlük Kiralık"] },
      { key: "metrekare", label: "Metrekare", tip: "number", placeholder: "Örn: 95", birim: "m²", grup: "Emlak Bilgisi" },
      { key: "odaSayisi", label: "Oda Sayısı", tip: "select", grup: "Emlak Bilgisi",
        secenekler: ["Stüdyo", "1+0", "1+1", "2+1", "3+1", "4+1", "5+1"] },
      { key: "depozito", label: "Depozito (Ay)", tip: "select", grup: "Kiralama Koşulları",
        secenekler: ["1 Ay", "2 Ay", "3 Ay", "Yok"] },
      { key: "kiralamaSuresi", label: "Minimum Kiralama Süresi", tip: "select", grup: "Kiralama Koşulları",
        secenekler: ["Günlük", "Haftalık", "Aylık", "6 Aylık", "Yıllık"] },
      { key: "ozellikler", label: "Özellikler", tip: "multiselect", grup: "Özellikler",
        secenekler: ["Eşyalı", "Asansör", "Otopark", "Balkon", "Güvenlik", "İnternet", "Site İçi"] },
      { key: "hayvanKabul", label: "Evcil Hayvan Kabul Ediliyor mu?", tip: "toggle", grup: "Kiralama Koşulları" },
      ...ORTAK_ALAN,
    ],
  },

  // ── OTO SATIŞ ──
  {
    id: "oto-satis", ad: "Oto Alım Satım", emoji: "🚙",
    tip: "both", renk: "#10b981",
    altKategoriler: ["Otomobil", "Ticari Araç", "Motosiklet", "Elektrikli"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "aracTipi", label: "Araç Tipi", tip: "select", zorunlu: true, grup: "Araç Bilgisi",
        secenekler: ["Otomobil", "SUV / 4x4", "Kamyonet", "Kamyon", "Minibüs", "Otobüs", "Motosiklet", "Elektrikli Araç", "İş Makinesi"] },
      { key: "marka", label: "Marka Tercihi", tip: "text", placeholder: "Örn: Toyota, Ford, BMW", grup: "Araç Bilgisi" },
      { key: "yil", label: "Model Yılı (min)", tip: "number", placeholder: "Örn: 2018", grup: "Araç Bilgisi" },
      { key: "kmMax", label: "Maksimum KM", tip: "number", placeholder: "Örn: 100000", birim: "km", grup: "Araç Bilgisi" },
      { key: "yakit", label: "Yakıt Tipi", tip: "multiselect", grup: "Araç Bilgisi",
        secenekler: ["Benzin", "Dizel", "LPG", "Hibrit", "Elektrik", "Fark Etmez"] },
      { key: "vites", label: "Vites Tipi", tip: "select", grup: "Araç Bilgisi",
        secenekler: ["Manuel", "Otomatik", "Yarı Otomatik", "Fark Etmez"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "aracTipi", label: "Araç Tipi", tip: "select", zorunlu: true, grup: "Araç Bilgisi",
        secenekler: ["Otomobil", "SUV / 4x4", "Kamyonet", "Kamyon", "Minibüs", "Otobüs", "Motosiklet", "Elektrikli Araç"] },
      { key: "marka", label: "Marka & Model", tip: "text", zorunlu: true, placeholder: "Örn: Toyota Corolla", grup: "Araç Bilgisi" },
      { key: "yil", label: "Model Yılı", tip: "number", zorunlu: true, placeholder: "Örn: 2020", grup: "Araç Bilgisi" },
      { key: "km", label: "Kilometre", tip: "number", zorunlu: true, placeholder: "Örn: 75000", birim: "km", grup: "Araç Bilgisi" },
      { key: "yakit", label: "Yakıt Tipi", tip: "select", grup: "Araç Bilgisi",
        secenekler: ["Benzin", "Dizel", "LPG", "Hibrit", "Elektrik"] },
      { key: "vites", label: "Vites Tipi", tip: "select", grup: "Araç Bilgisi",
        secenekler: ["Manuel", "Otomatik", "Yarı Otomatik"] },
      { key: "renk", label: "Renk", tip: "text", placeholder: "Örn: Beyaz, Siyah", grup: "Araç Bilgisi" },
      { key: "hasar", label: "Hasar Durumu", tip: "select", grup: "Durum",
        secenekler: ["Hasarsız", "Boyalı", "Lokal Hasar", "Ağır Hasar", "Değişen Parça Var"] },
      { key: "muayene", label: "Muayene Durumu", tip: "select", grup: "Durum",
        secenekler: ["Muayeneli", "Muayenesiz", "Yeni Yapıldı"] },
      { key: "takasKabul", label: "Takas Kabul Ediliyor mu?", tip: "toggle", grup: "Satış" },
      ...ORTAK_ALAN,
    ],
  },

  // ── YAZILIM ──
  {
    id: "yazilim", ad: "Yazılım & Bilişim", emoji: "💻",
    tip: "both", renk: "#6366f1",
    altKategoriler: ["Web Geliştirme", "Mobil Uygulama", "E-Ticaret", "ERP/CRM", "Yapay Zeka"],
    butceBirimi: "USD",
    hizmetAlanFormu: [
      { key: "hizmetTipi", label: "İhtiyaç Duyulan Hizmet", tip: "multiselect", zorunlu: true, grup: "Proje Bilgisi",
        secenekler: ["Web Sitesi", "Mobil Uygulama (iOS)", "Mobil Uygulama (Android)", "E-Ticaret Sitesi", "ERP/CRM Sistemi", "API Geliştirme", "Yapay Zeka / ML", "Veri Analizi", "Siber Güvenlik", "DevOps / Cloud", "SEO", "Diğer"] },
      { key: "teknoloji", label: "Tercih Edilen Teknoloji", tip: "multiselect", grup: "Teknik",
        secenekler: ["React", "Next.js", "Vue.js", "Angular", "Node.js", "Python", "PHP", "Java", ".NET", "Flutter", "React Native", "WordPress", "Shopify", "Fark Etmez"] },
      { key: "proje_suresi", label: "Proje Süresi", tip: "select", grup: "Proje Bilgisi",
        secenekler: ["1 Haftadan Az", "1-2 Hafta", "1 Ay", "2-3 Ay", "3-6 Ay", "6 Ay+", "Sürekli / DevOps"] },
      { key: "kaynak_kodu", label: "Kaynak Kodu Devri", tip: "toggle", grup: "Hukuki" },
      { key: "bakim", label: "Bakım & Destek Gerekiyor mu?", tip: "toggle", grup: "Proje Bilgisi" },
      { key: "referans", label: "Benzer Proje Linki / Referans", tip: "text", placeholder: "https://ornek-site.com", grup: "Proje Bilgisi" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "uzmanlik", label: "Uzmanlık Alanları", tip: "multiselect", zorunlu: true, grup: "Uzmanlık",
        secenekler: ["Frontend", "Backend", "Fullstack", "Mobil (iOS/Android)", "UI/UX Tasarım", "DevOps", "Yapay Zeka/ML", "Veri Bilimi", "Siber Güvenlik", "Blockchain", "E-Ticaret", "ERP/CRM"] },
      { key: "teknoloji", label: "Teknoloji Stack", tip: "multiselect", grup: "Teknik",
        secenekler: ["React", "Next.js", "Vue.js", "Angular", "Node.js", "Python", "PHP", "Java", ".NET", "Flutter", "React Native", "WordPress", "Shopify"] },
      { key: "surum", label: "Çalışma Şekli", tip: "select", grup: "Çalışma Modeli",
        secenekler: ["Proje Bazlı", "Saatlik Ücret", "Tam Zamanlı Remote", "Yarı Zamanlı", "Danışmanlık"] },
      { key: "portfoy", label: "Portföy / GitHub Linki", tip: "text", placeholder: "https://github.com/...", grup: "Referanslar" },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── TURİZM ──
  {
    id: "turizm", ad: "Turizm & Konaklama", emoji: "🏨",
    tip: "both", renk: "#ec4899",
    altKategoriler: ["Otel", "Villa Kiralık", "Tur Paketi", "Transfer", "Kruvaziyer"],
    butceBirimi: "USD",
    hizmetAlanFormu: [
      { key: "turizmTipi", label: "Hizmet Tipi", tip: "select", zorunlu: true, grup: "Seyahat Bilgisi",
        secenekler: ["Otel Rezervasyonu", "Villa / Apart Kiralık", "Tur Paketi", "Uçak Bileti", "Transfer Hizmeti", "Kruvaziyer", "Kongre & Toplantı", "Balayı Paketi"] },
      { key: "gidisDonus", label: "Gidiş - Dönüş Tarihleri", tip: "daterange", zorunlu: true, grup: "Seyahat Bilgisi" },
      { key: "kisiSayisi", label: "Kişi Sayısı", tip: "number", zorunlu: true, placeholder: "Örn: 2", grup: "Seyahat Bilgisi" },
      { key: "yildiz", label: "Otel Yıldızı", tip: "select", grup: "Konaklama",
        secenekler: ["3 Yıldız", "4 Yıldız", "5 Yıldız", "Butik Otel", "Villa", "Apart", "Fark Etmez"] },
      { key: "pansiyon", label: "Pansiyon Tipi", tip: "select", grup: "Konaklama",
        secenekler: ["Sadece Oda", "Oda & Kahvaltı", "Yarım Pansiyon", "Tam Pansiyon", "Her Şey Dahil", "Ultra Her Şey Dahil"] },
      { key: "ozelIstekler", label: "Özel İstekler", tip: "multiselect", grup: "Konaklama",
        secenekler: ["Deniz Manzarası", "Havuz Başı Oda", "Balayı Paketi", "Engelli Erişimi", "Bebek Karyolası", "Evcil Hayvan Kabul", "Vegan Menü"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "turizmTipi", label: "Sunulan Hizmet", tip: "multiselect", zorunlu: true, grup: "Hizmet Bilgisi",
        secenekler: ["Otel", "Villa / Apart", "Tur Operatörü", "Transfer", "Kruvaziyer Acentesi", "Kongre Organizasyonu"] },
      { key: "yildiz", label: "Otel / Tesis Sınıfı", tip: "select", grup: "Tesis Bilgisi",
        secenekler: ["3 Yıldız", "4 Yıldız", "5 Yıldız", "Butik Otel", "Villa", "Apart"] },
      { key: "odaSayisi", label: "Oda / Kapasite", tip: "number", placeholder: "Örn: 150 oda", grup: "Tesis Bilgisi" },
      { key: "pansiyon", label: "Pansiyon Seçenekleri", tip: "multiselect", grup: "Tesis Bilgisi",
        secenekler: ["Sadece Oda", "Oda & Kahvaltı", "Yarım Pansiyon", "Tam Pansiyon", "Her Şey Dahil"] },
      { key: "olanaklar", label: "Tesis Olanakları", tip: "multiselect", grup: "Tesis Bilgisi",
        secenekler: ["Plaj", "Havuz", "Spa", "Fitness", "Restoran", "Bar", "Çocuk Kulübü", "Su Sporları", "Kongre Salonu"] },
      { key: "acikTarihler", label: "Açık Tarihler / Sezon", tip: "text", placeholder: "Örn: Nisan - Ekim arası açık", grup: "Tesis Bilgisi" },
      ...ORTAK_ALAN,
    ],
  },

  // ── USTA & İŞÇİ ──
  {
    id: "usta", ad: "Usta & İşçi", emoji: "👷",
    tip: "both", renk: "#f59e0b",
    altKategoriler: ["Elektrikçi", "Tesisatçı", "Boyacı", "Marangoz", "Çatı", "Zemin"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "isTipi", label: "İş Tipi", tip: "multiselect", zorunlu: true, grup: "İş Bilgisi",
        secenekler: ["Elektrik", "Tesisat & Su", "Boya & Badana", "Alçıpan & Sıva", "Seramik & Karo", "Parke & Zemin", "Doğrama & Pencere", "Çatı", "Isı & Ses İzolasyonu", "Demir Doğrama", "Klima Montaj", "Genel Tamirat"] },
      { key: "proje", label: "Proje / İş Detayı", tip: "textarea", zorunlu: true, placeholder: "Yapılacak işi detaylıca anlatın", grup: "İş Bilgisi" },
      { key: "alan", label: "İş Alanı", tip: "number", placeholder: "Örn: 80", birim: "m²", grup: "İş Bilgisi" },
      { key: "malzeme", label: "Malzeme Durumu", tip: "select", grup: "İş Bilgisi",
        secenekler: ["Malzeme tarafımdan sağlanacak", "Usta malzeme getirecek", "Birlikte karar verilecek"] },
      { key: "baslangicTarihi", label: "İşe Başlama Tarihi", tip: "date", grup: "Zamanlama" },
      { key: "sure", label: "Tahmini Süre", tip: "select", grup: "Zamanlama",
        secenekler: ["Yarım gün", "1 gün", "2-3 gün", "1 hafta", "2 hafta", "1 ay", "1 ay+"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "uzmanlik", label: "Uzmanlık Alanları", tip: "multiselect", zorunlu: true, grup: "Uzmanlık",
        secenekler: ["Elektrik", "Tesisat & Su", "Boya & Badana", "Alçıpan & Sıva", "Seramik & Karo", "Parke & Zemin", "Doğrama", "Çatı", "İzolasyon", "Klima", "Genel Tamirat"] },
      { key: "belgeler", label: "Mesleki Belgeler", tip: "multiselect", grup: "Belgeler",
        secenekler: ["Usta Belgesi", "Elektrik Yetki Belgesi", "Doğalgaz Belgesi", "SGK Kayıtlı", "Vergi Mükellefi", "Belge Yok"] },
      { key: "calismaBolgesi", label: "Çalışma Bölgesi", tip: "text", zorunlu: true, placeholder: "Örn: İstanbul Anadolu Yakası", grup: "Çalışma Bilgisi" },
      { key: "ekipSayisi", label: "Ekip Büyüklüğü", tip: "select", grup: "Çalışma Bilgisi",
        secenekler: ["Tek başıma", "2-3 kişi", "4-5 kişi", "5+ kişi"] },
      { key: "malzemeTemin", label: "Malzeme Temin Edebiliyor musunuz?", tip: "toggle", grup: "Çalışma Bilgisi" },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── TEMİZLİK ──
  {
    id: "temizlik", ad: "Temizlik Hizmetleri", emoji: "🧹",
    tip: "both", renk: "#06b6d4",
    altKategoriler: ["Ev Temizliği", "Ofis", "İnşaat Sonrası", "Cam Silme", "Halı Yıkama"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "temizlikTipi", label: "Temizlik Tipi", tip: "multiselect", zorunlu: true, grup: "Hizmet Bilgisi",
        secenekler: ["Ev Temizliği", "Ofis Temizliği", "İnşaat Sonrası Temizlik", "Cam Silme", "Halı & Koltuk Yıkama", "Derin Temizlik", "Dezenfeksiyon", "İlaçlama", "Dış Cephe Temizliği"] },
      { key: "alan", label: "Alan Büyüklüğü", tip: "number", placeholder: "Örn: 120", birim: "m²", grup: "Hizmet Bilgisi" },
      { key: "periyot", label: "Temizlik Sıklığı", tip: "select", grup: "Planlama",
        secenekler: ["Tek Seferlik", "Haftalık", "2 Haftada 1", "Aylık", "Düzenli (Belirtilecek)"] },
      { key: "baslangicTarihi", label: "Başlama Tarihi", tip: "date", grup: "Planlama" },
      { key: "malzeme", label: "Temizlik Malzemesi", tip: "select", grup: "Planlama",
        secenekler: ["Şirketten gelsin", "Evde mevcut", "Birlikte karar verilecek"] },
      { key: "evcilHayvan", label: "Evde Evcil Hayvan Var mı?", tip: "toggle", grup: "Ek Bilgi" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "hizmetTipi", label: "Sunulan Hizmetler", tip: "multiselect", zorunlu: true, grup: "Hizmet Bilgisi",
        secenekler: ["Ev Temizliği", "Ofis Temizliği", "İnşaat Sonrası", "Cam Silme", "Halı & Koltuk", "Derin Temizlik", "Dezenfeksiyon", "İlaçlama"] },
      { key: "personelSayisi", label: "Ekip Büyüklüğü", tip: "select", grup: "Kapasite",
        secenekler: ["1 Kişi", "2 Kişi", "3 Kişi", "4+ Kişi", "Projeye Göre"] },
      { key: "ekipman", label: "Kullanılan Ekipmanlar", tip: "multiselect", grup: "Kapasite",
        secenekler: ["Endüstriyel Süpürge", "Buhar Makinesi", "Yüksek Basınçlı Yıkama", "Halı Yıkama Makinesi", "Araç Gereçler Tamam"] },
      { key: "bolge", label: "Hizmet Bölgesi", tip: "text", zorunlu: true, placeholder: "Örn: İstanbul Avrupa Yakası", grup: "Hizmet Bilgisi" },
      { key: "sigorta", label: "Hizmet Sigortası Var mı?", tip: "toggle", grup: "Kapasite" },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── EĞİTİM ──
  {
    id: "egitim", ad: "Eğitim & Danışmanlık", emoji: "📚",
    tip: "both", renk: "#10b981",
    altKategoriler: ["Özel Ders", "Dil Kursu", "Yazılım Eğitimi", "İş Koçluğu", "Danışmanlık"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "egitimKonusu", label: "Eğitim Konusu", tip: "select", zorunlu: true, grup: "Eğitim Bilgisi",
        secenekler: ["Matematik", "Fizik", "Kimya", "Biyoloji", "İngilizce", "Almanca", "Fransızca", "Arapça", "Türkçe / TYT", "Yazılım", "Grafik Tasarım", "Dijital Pazarlama", "Muhasebe", "Hukuk", "İş Koçluğu", "Kariyer Danışmanlığı", "Kişisel Gelişim", "Diğer"] },
      { key: "seviye", label: "Seviye", tip: "select", grup: "Eğitim Bilgisi",
        secenekler: ["İlkokul", "Ortaokul", "Lise", "Üniversite", "Yetişkin / Profesyonel", "Başlangıç", "Orta", "İleri"] },
      { key: "egitimSekli", label: "Eğitim Şekli", tip: "select", grup: "Eğitim Bilgisi",
        secenekler: ["Yüz Yüze", "Online (Zoom/Teams)", "Karma", "Kayıtlı Video", "Grup", "Bireysel"] },
      { key: "dersSayisi", label: "Toplam Ders Sayısı", tip: "number", placeholder: "Örn: 10", birim: "Saat / Ders", grup: "Plan" },
      { key: "dersSikligi", label: "Ders Sıklığı", tip: "select", grup: "Plan",
        secenekler: ["Haftada 1", "Haftada 2", "Haftada 3", "Her Gün", "Yoğun Program", "Esnek"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "egitimKonusu", label: "Ders Verdiğiniz Konular", tip: "multiselect", zorunlu: true, grup: "Uzmanlık",
        secenekler: ["Matematik", "Fizik", "Kimya", "Biyoloji", "İngilizce", "Almanca", "Fransızca", "Arapça", "Yazılım", "Grafik", "Dijital Pazarlama", "Muhasebe", "İş Koçluğu", "Kariyer Danışmanlığı", "Diğer"] },
      { key: "egitimSekli", label: "Eğitim Şekli", tip: "multiselect", grup: "Uzmanlık",
        secenekler: ["Yüz Yüze", "Online", "Karma", "Grup", "Bireysel"] },
      { key: "egitimDuzeyi", label: "Eğitim Düzeyi", tip: "select", grup: "Nitelikler",
        secenekler: ["Lisans", "Yüksek Lisans", "Doktora", "Sertifika Programı", "Öz Öğrenme + Deneyim"] },
      { key: "sertifika", label: "Sertifika & Belgeler", tip: "text", placeholder: "Örn: MEB Öğretmen Belgesi, CELTA", grup: "Nitelikler" },
      { key: "ogrenciSayisi", label: "Şu An Kaç Öğrenci ile Çalışıyorsunuz?", tip: "select", grup: "Kapasite",
        secenekler: ["1-5", "6-10", "11-20", "20+", "Müsaitim"] },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── TASARIM ──
  {
    id: "tasarim", ad: "Grafik & Tasarım", emoji: "🎨",
    tip: "both", renk: "#db2777",
    altKategoriler: ["Logo", "UI/UX", "Sosyal Medya", "Ambalaj", "3D Tasarım"],
    butceBirimi: "USD",
    hizmetAlanFormu: [
      { key: "tasarimTipi", label: "Tasarım Tipi", tip: "multiselect", zorunlu: true, grup: "Proje Bilgisi",
        secenekler: ["Logo & Kurumsal Kimlik", "UI/UX Tasarım", "Web Tasarım", "Sosyal Medya Görselleri", "Broşür & Katalog", "Ambalaj Tasarımı", "3D Modelleme", "Motion Grafik", "İllüstrasyon", "Marka Tasarımı"] },
      { key: "teslimFormat", label: "Teslim Formatı", tip: "multiselect", grup: "Teknik",
        secenekler: ["AI / EPS", "PDF", "PNG", "JPG", "PSD", "Figma", "SVG", "MP4"] },
      { key: "revizyon", label: "Revizyon Hakkı", tip: "select", grup: "Teknik",
        secenekler: ["1 Revizyon", "2 Revizyon", "3 Revizyon", "Sınırsız", "Belirtilecek"] },
      { key: "referans", label: "Referans / İlham Linki", tip: "text", placeholder: "https://...", grup: "Proje Bilgisi" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "uzmanlik", label: "Uzmanlık Alanları", tip: "multiselect", zorunlu: true, grup: "Uzmanlık",
        secenekler: ["Logo & Kurumsal Kimlik", "UI/UX", "Web Tasarım", "Sosyal Medya", "Broşür & Baskı", "Ambalaj", "3D Modelleme", "Motion Grafik", "İllüstrasyon"] },
      { key: "programlar", label: "Kullandığı Programlar", tip: "multiselect", grup: "Teknik",
        secenekler: ["Adobe Illustrator", "Photoshop", "InDesign", "Figma", "Sketch", "Blender", "Cinema 4D", "After Effects", "Canva"] },
      { key: "portfoy", label: "Portföy Linki", tip: "text", zorunlu: true, placeholder: "https://behance.net/...", grup: "Referanslar" },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── PAZARLAMAasd ──
  {
    id: "pazarlama", ad: "Dijital Pazarlama", emoji: "📢",
    tip: "both", renk: "#7c3aed",
    altKategoriler: ["SEO", "Google Ads", "Sosyal Medya", "E-posta Pazarlama"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "hizmetTipi", label: "İhtiyaç Duyulan Hizmet", tip: "multiselect", zorunlu: true, grup: "Proje Bilgisi",
        secenekler: ["SEO", "Google Ads", "Meta Ads (Facebook/Instagram)", "TikTok Ads", "Sosyal Medya Yönetimi", "İçerik Pazarlama", "E-posta Pazarlama", "Influencer Pazarlama", "Affiliate Pazarlama", "Web Analitik"] },
      { key: "aylikButce", label: "Aylık Reklam Bütçesi", tip: "number", placeholder: "Örn: 10000", birim: "TL", grup: "Bütçe" },
      { key: "hedefKitle", label: "Hedef Kitle", tip: "text", placeholder: "Örn: 25-40 yaş, kadın, İstanbul", grup: "Strateji" },
      { key: "sektor", label: "Sektör / Ürün", tip: "text", placeholder: "Örn: E-ticaret, SaaS, Perakende", grup: "Strateji" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "uzmanlik", label: "Uzmanlık Alanları", tip: "multiselect", zorunlu: true, grup: "Uzmanlık",
        secenekler: ["SEO", "Google Ads", "Meta Ads", "TikTok Ads", "Sosyal Medya Yönetimi", "İçerik Pazarlama", "E-posta Pazarlama", "Influencer", "Web Analitik", "CRO"] },
      { key: "sertifika", label: "Sertifikalar", tip: "multiselect", grup: "Nitelikler",
        secenekler: ["Google Ads Sertifikası", "Google Analytics", "Meta Blueprint", "HubSpot", "SEMrush Academy"] },
      { key: "portfoy", label: "Portföy / Referans", tip: "text", placeholder: "https://...", grup: "Referanslar" },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── NAKLİYE ──
  {
    id: "nakliye", ad: "Nakliye & Taşımacılık", emoji: "🚚",
    tip: "both", renk: "#b45309",
    altKategoriler: ["Şehir İçi", "Şehirlerarası", "Uluslararası", "Eşya Taşıma"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "nakliyeTipi", label: "Nakliye Tipi", tip: "select", zorunlu: true, grup: "Taşıma Bilgisi",
        secenekler: ["Ev Taşıma", "Ofis Taşıma", "Parça Eşya", "Şehir İçi Kurye", "Şehirlerarası", "Uluslararası", "Ağır Yük & Makine", "Soğuk Zincir"] },
      { key: "yuklemeTarihi", label: "Yükleme Tarihi", tip: "date", zorunlu: true, grup: "Taşıma Bilgisi" },
      { key: "tasinacakEsyalar", label: "Taşınacak Eşyalar", tip: "textarea", placeholder: "Koltuk takımı, yatak, beyaz eşya...", grup: "Taşıma Bilgisi" },
      { key: "asansorVar", label: "Asansör Var mı?", tip: "toggle", grup: "Koşullar" },
      { key: "paketleme", label: "Paketleme Hizmeti Gerekiyor mu?", tip: "toggle", grup: "Koşullar" },
      { key: "sigorta", label: "Nakliye Sigortası Gerekiyor mu?", tip: "toggle", grup: "Koşullar" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "hizmetTipi", label: "Sunulan Nakliye Hizmetleri", tip: "multiselect", zorunlu: true, grup: "Hizmet Bilgisi",
        secenekler: ["Ev Taşıma", "Ofis Taşıma", "Parça Eşya", "Şehir İçi", "Şehirlerarası", "Uluslararası", "Ağır Yük", "Soğuk Zincir"] },
      { key: "filo", label: "Araç Filosu", tip: "text", placeholder: "Örn: 3 kapalı kasa TIR, 2 kamyonet", grup: "Kapasite" },
      { key: "sigorta", label: "Taşıma Sigortası Var mı?", tip: "toggle", grup: "Kapasite" },
      { key: "bolge", label: "Hizmet Bölgesi", tip: "text", zorunlu: true, placeholder: "Örn: Tüm Türkiye + Avrupa", grup: "Hizmet Bilgisi" },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── İNŞAAT & TADİLAT ──
  {
    id: "insaat", ad: "İnşaat & Tadilat", emoji: "🏗️",
    tip: "both", renk: "#92400e",
    altKategoriler: ["Konut", "Ticari", "Tadilat", "Çatı", "Dış Cephe"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "isTipi", label: "İş Tipi", tip: "select", zorunlu: true, grup: "İş Bilgisi",
        secenekler: ["Komple Tadilat", "Kısmi Tadilat", "Yeni Yapım", "Dış Cephe", "Çatı Yenileme", "Bahçe Düzenleme", "İç Mekan Dekorasyon", "Prefabrik Yapı"] },
      { key: "alan", label: "Alan Büyüklüğü", tip: "number", placeholder: "Örn: 150", birim: "m²", grup: "İş Bilgisi" },
      { key: "baslangicTarihi", label: "Başlama Tarihi", tip: "date", grup: "Zamanlama" },
      { key: "sure", label: "Beklenen Süre", tip: "select", grup: "Zamanlama",
        secenekler: ["1 Hafta", "2-4 Hafta", "1-2 Ay", "2-4 Ay", "4-6 Ay", "6 Ay+"] },
      { key: "malzeme", label: "Malzeme Durumu", tip: "select", grup: "İş Bilgisi",
        secenekler: ["Malzeme Müşteriden", "Yüklenici Sağlayacak", "Birlikte Karar"] },
      { key: "mimar", label: "Mimar / Proje Var mı?", tip: "toggle", grup: "İş Bilgisi" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "uzmanlik", label: "Uzmanlık Alanları", tip: "multiselect", zorunlu: true, grup: "Uzmanlık",
        secenekler: ["Komple Tadilat", "Yapı İşleri", "Dış Cephe", "Çatı", "Dekorasyon", "Prefabrik", "Elektrik Altyapı", "Tesisat Altyapı"] },
      { key: "ekipSayisi", label: "Ekip Büyüklüğü", tip: "select", grup: "Kapasite",
        secenekler: ["1-3 Kişi", "4-10 Kişi", "10-20 Kişi", "20+ Kişi", "Projeye Göre"] },
      { key: "belgeler", label: "Belgeler", tip: "multiselect", grup: "Belgeler",
        secenekler: ["Müteahhitlik Belgesi", "İSG Belgesi", "SGK Kayıtlı Çalışan", "Vergi Levhası"] },
      { key: "referansProje", label: "Referans Proje / Link", tip: "text", placeholder: "https://...", grup: "Referanslar" },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── METAL & ÇELİK ──
  {
    id: "metal-celik", ad: "Metal & Çelik", emoji: "⚙️",
    tip: "ticari", renk: "#475569",
    altKategoriler: ["Yapısal Çelik", "Boru & Profil", "Sac", "Alüminyum", "Paslanmaz"],
    butceBirimi: "USD",
    hizmetAlanFormu: [
      { key: "urunTipi", label: "Ürün Tipi", tip: "select", zorunlu: true, grup: "Ürün Bilgisi",
        secenekler: ["Yapısal Çelik", "Boru & Profil", "Sac (Düz/Rulo)", "Alüminyum Profil", "Paslanmaz Çelik", "Galvaniz", "HEA/HEB Profil", "İnşaat Demiri", "Tel & Kafes", "Özel İşlenmiş"] },
      { key: "miktar", label: "Miktar", tip: "number", zorunlu: true, placeholder: "Örn: 50", birim: "Ton", grup: "Ürün Bilgisi" },
      { key: "olculer", label: "Ölçüler / Standart", tip: "text", placeholder: "Örn: 6m x 8mm, S235, ASTM A36", grup: "Teknik" },
      { key: "kalite", label: "Çelik Kalitesi / Normu", tip: "text", placeholder: "Örn: S235, S355, SS304, A36", grup: "Teknik" },
      { key: "sertifika", label: "Sertifika Gereksinimleri", tip: "multiselect", grup: "Teknik",
        secenekler: ["Mill Test Sertifikası", "EN 10204 3.1", "ISO 9001", "CE İşareti", "Gerekmiyor"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "urunler", label: "Sunulan Ürünler", tip: "multiselect", zorunlu: true, grup: "Ürün Bilgisi",
        secenekler: ["Yapısal Çelik", "Boru & Profil", "Sac", "Alüminyum", "Paslanmaz", "Galvaniz", "İnşaat Demiri", "Tel & Kafes", "Özel İşleme"] },
      { key: "aylikKapasite", label: "Aylık Kapasite", tip: "number", placeholder: "Örn: 500", birim: "Ton", grup: "Kapasite" },
      { key: "stok", label: "Stok Durumu", tip: "select", grup: "Stok",
        secenekler: ["Stokta Mevcut", "Siparişe Göre", "İthal Ürün"] },
      { key: "sertifika", label: "Sertifikalar", tip: "multiselect", grup: "Kalite",
        secenekler: ["Mill Test Sertifikası", "ISO 9001", "CE", "TSE"] },
      ...ORTAK_ALAN,
    ],
  },

  // ── SAĞLIK & GÜZELLIK ──
  {
    id: "saglik", ad: "Sağlık & Güzellik", emoji: "💊",
    tip: "bireysel", renk: "#ef4444",
    altKategoriler: ["Estetisyen", "Kuaför", "Masaj", "Pilates", "Beslenme"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "hizmetTipi", label: "Aranan Hizmet", tip: "multiselect", zorunlu: true, grup: "Hizmet Bilgisi",
        secenekler: ["Estetisyen", "Kuaför & Saç", "Masaj", "Pilates", "Yoga", "Beslenme Danışmanlığı", "Kişisel Antrenör", "Cilt Bakımı", "Manikür & Pedikür", "Medikal Estetik", "Psikolog", "Diyetisyen"] },
      { key: "cinsiyet", label: "Uzman Cinsiyeti Tercihi", tip: "select", grup: "Tercih",
        secenekler: ["Fark Etmez", "Kadın", "Erkek"] },
      { key: "yerTipi", label: "Hizmet Yeri", tip: "select", grup: "Tercih",
        secenekler: ["Ev'e Gelsin", "İş Yerine Gideyim", "Online Danışmanlık", "Esnek"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "uzmanlik", label: "Uzmanlık Alanları", tip: "multiselect", zorunlu: true, grup: "Uzmanlık",
        secenekler: ["Estetisyen", "Kuaför", "Masaj", "Pilates", "Yoga", "Beslenme", "Kişisel Antrenör", "Cilt Bakımı", "Manikür", "Medikal Estetik", "Psikoloji", "Diyetisyen"] },
      { key: "belgeler", label: "Sertifikalar & Belgeler", tip: "text", placeholder: "Örn: İGÜ Beslenme Yüksek Lisans, NASM CPT", grup: "Nitelikler" },
      { key: "yerTipi", label: "Hizmet Yeri", tip: "multiselect", grup: "Hizmet Bilgisi",
        secenekler: ["Ev'e Gidebilirim", "Kendi İş Yerim Var", "Online", "Müşteri İş Yeri"] },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── HUKUK ──
  {
    id: "hukuk", ad: "Hukuk & Avukatlık", emoji: "⚖️",
    tip: "both", renk: "#1e40af",
    altKategoriler: ["İş Hukuku", "Ceza", "Aile", "Şirket", "Fikri Mülkiyet"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "hukukDali", label: "Hukuk Dalı", tip: "select", zorunlu: true, grup: "Hizmet Bilgisi",
        secenekler: ["İş & Sosyal Güvenlik", "Ceza Hukuku", "Aile & Boşanma", "Şirket & Ticaret", "Gayrimenkul", "İdare", "Vergi", "Fikri Mülkiyet", "Sözleşme", "İcra & İflas", "Uluslararası", "Genel Danışmanlık"] },
      { key: "hizmetTipi", label: "Hizmet Tipi", tip: "multiselect", grup: "Hizmet Bilgisi",
        secenekler: ["Dava Takibi", "Hukuki Danışmanlık", "Sözleşme Hazırlama", "Arabuluculuk", "Noterlik", "Şirket Kuruluşu"] },
      { key: "acilDurum", label: "Acil Durum mu?", tip: "toggle", grup: "Hizmet Bilgisi" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "uzmanlik", label: "Uzmanlık Alanları", tip: "multiselect", zorunlu: true, grup: "Uzmanlık",
        secenekler: ["İş Hukuku", "Ceza", "Aile", "Şirket & Ticaret", "Gayrimenkul", "İdare", "Vergi", "Fikri Mülkiyet", "Uluslararası"] },
      { key: "baro", label: "Kayıtlı Olduğu Baro", tip: "text", zorunlu: true, placeholder: "Örn: İstanbul Barosu", grup: "Nitelikler" },
      { key: "deneyim", label: "Mesleki Deneyim", tip: "select", grup: "Nitelikler",
        secenekler: ["1-3 Yıl", "3-5 Yıl", "5-10 Yıl", "10-20 Yıl", "20 Yıl+"] },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── MUHASEBE ──
  {
    id: "muhasebe", ad: "Muhasebe & Finans", emoji: "💰",
    tip: "both", renk: "#15803d",
    altKategoriler: ["Mali Müşavir", "Vergi", "Bordro", "Denetim", "Finans"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "hizmetTipi", label: "İhtiyaç Duyulan Hizmet", tip: "multiselect", zorunlu: true, grup: "Hizmet Bilgisi",
        secenekler: ["Mali Müşavirlik", "Vergi Beyannamesi", "Bordro Hizmeti", "Şirket Kuruluşu", "Denetim", "Finansal Analiz", "Bütçe Planlama", "Yatırım Danışmanlığı", "Sigorta Danışmanlığı"] },
      { key: "sirketTipi", label: "Şirket Tipi", tip: "select", grup: "Firma Bilgisi",
        secenekler: ["Şahıs Şirketi", "Limited Şirket", "Anonim Şirket", "Bireysel (Kişisel)", "Dernek / Vakıf"] },
      { key: "calisanSayisi", label: "Çalışan Sayısı", tip: "select", grup: "Firma Bilgisi",
        secenekler: ["1 (Şahıs)", "2-5", "6-20", "21-50", "50+"] },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "uzmanlik", label: "Uzmanlık Alanları", tip: "multiselect", zorunlu: true, grup: "Uzmanlık",
        secenekler: ["Mali Müşavirlik", "Vergi Danışmanlığı", "Bordro", "Denetim", "Finans Analizi", "Şirket Kuruluşu", "Yatırım Danışmanlığı"] },
      { key: "unvan", label: "Unvan & Lisans", tip: "select", zorunlu: true, grup: "Nitelikler",
        secenekler: ["Serbest Muhasebeci (SMMM)", "Yeminli Mali Müşavir (YMM)", "Bağımsız Denetçi", "Finans Uzmanı"] },
      { key: "musteriSayisi", label: "Aktif Müşteri Sayısı", tip: "select", grup: "Kapasite",
        secenekler: ["1-10", "11-30", "31-50", "50+"] },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  },

  // ── MOBİLYA ──
  {
    id: "mobilya", ad: "Mobilya & Dekorasyon", emoji: "🪑",
    tip: "both", renk: "#8b5cf6",
    altKategoriler: ["Ev Mobilyası", "Ofis", "Mutfak", "Banyo", "Dekorasyon"],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "urunTipi", label: "Ürün / Hizmet Tipi", tip: "multiselect", zorunlu: true, grup: "Ürün Bilgisi",
        secenekler: ["Oturma Odası Takımı", "Yatak Odası Takımı", "Mutfak Mobilyası", "Ofis Mobilyası", "Banyo Mobilyası", "Dekoratif Ürün", "Özel Tasarım / Ismarla", "İç Mimar Hizmeti"] },
      { key: "malzeme", label: "Malzeme Tercihi", tip: "multiselect", grup: "Ürün Bilgisi",
        secenekler: ["Ahşap (Masif)", "MDF", "Melamin", "Metal", "Cam", "Kumaş", "Deri", "Fark Etmez"] },
      { key: "teslimMontaj", label: "Montaj Hizmeti Gerekiyor mu?", tip: "toggle", grup: "Teslimat" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "urunler", label: "Sunulan Ürünler / Hizmetler", tip: "multiselect", zorunlu: true, grup: "Ürün Bilgisi",
        secenekler: ["Oturma Odası", "Yatak Odası", "Mutfak", "Ofis", "Banyo", "Dekoratif", "Ismarla Üretim", "İç Mimarlık"] },
      { key: "minimumSiparis", label: "Minimum Sipariş", tip: "select", grup: "Kapasite",
        secenekler: ["Tekil Ürün", "Takım (2+ parça)", "Komple Oda", "Komple Daire"] },
      { key: "teslimatSuresi", label: "Üretim & Teslimat Süresi", tip: "select", grup: "Kapasite",
        secenekler: ["Stoktan (1-3 gün)", "1-2 Hafta", "2-4 Hafta", "4-8 Hafta", "2 Ay+"] },
      ...ORTAK_ALAN,
    ],
  },

  // ── GENEL SEKTÖRLER (Temel Form) ──
  ...["oto-kiralama", "makine-kiralama", "elektronik", "beyaz-esya", "bilet", "seyahat",
      "mermer-tas", "plastik-pvc", "elektrik", "kimya-boya", "saglik-med",
      "video", "muzik", "fotograf", "ceviri", "etkinlik", "guvenlik",
      "peyzaj", "cocuk", "yasli-bakimi", "pet", "tamir-bakim", "mimarlik",
      "moda", "spor", "oyun", "el-yapimi", "tarim-hayvan", "enerji",
      "ithalat-ihracat", "icerik"].map(id => ({
    id,
    ad: id, emoji: "📋", tip: "both" as const, renk: "#64748b",
    altKategoriler: [],
    butceBirimi: "TL",
    hizmetAlanFormu: [
      { key: "detay", label: "Talep Detayları", tip: "textarea" as const, zorunlu: true, placeholder: "İhtiyacınızı detaylıca açıklayın...", grup: "Genel" },
      { key: "sure", label: "Süre / Zaman Çizelgesi", tip: "text" as const, placeholder: "Örn: 2 hafta içinde", grup: "Genel" },
      ...ORTAK_ALAN,
    ],
    hizmetVerenFormu: [
      { key: "hizmet", label: "Sunulan Hizmet / Ürün", tip: "textarea" as const, zorunlu: true, placeholder: "Sunduğunuz hizmet veya ürünü detaylıca açıklayın...", grup: "Genel" },
      { key: "kapasite", label: "Kapasite / Kapsam", tip: "text" as const, placeholder: "Örn: Ayda 10 proje, 50 adet/gün", grup: "Genel" },
      ...ORTAK_ALAN,
      ...ORTAK_ALAN_VEREN,
    ],
  })),
];

// ============================================================
// EXPORT
// ============================================================
export const TUM_SEKTORLER: Sektor[] = SEKTORLER_HAM.map(s => ({
  ...s,
  icon: s.emoji,
})) as Sektor[];

// Adları düzelt (genel sektörler için)
const SEKTOR_ADLARI: Record<string, { ad: string; emoji: string; renk: string }> = {
  "oto-kiralama":    { ad: "Oto Kiralama",              emoji: "🚗", renk: "#10b981" },
  "makine-kiralama": { ad: "Makine Kiralama",            emoji: "🚜", renk: "#f59e0b" },
  "elektronik":      { ad: "Elektronik & Teknoloji",     emoji: "📱", renk: "#8b5cf6" },
  "beyaz-esya":      { ad: "Beyaz Eşya",                 emoji: "🧊", renk: "#06b6d4" },
  "bilet":           { ad: "Bilet & Rezervasyon",        emoji: "🎫", renk: "#f43f5e" },
  "seyahat":         { ad: "Seyahat & Transfer",         emoji: "✈️", renk: "#f43f5e" },
  "mermer-tas":      { ad: "Mermer & Doğal Taş",         emoji: "🪨", renk: "#64748b" },
  "plastik-pvc":     { ad: "Plastik & PVC",              emoji: "🧴", renk: "#06b6d4" },
  "elektrik":        { ad: "Elektrik & Enerji",          emoji: "⚡", renk: "#eab308" },
  "kimya-boya":      { ad: "Kimya & Boya",               emoji: "🧪", renk: "#ec4899" },
  "saglik-med":      { ad: "Sağlık & Medikal",           emoji: "🏥", renk: "#ef4444" },
  "video":           { ad: "Video & Animasyon",          emoji: "🎬", renk: "#9333ea" },
  "muzik":           { ad: "Müzik & Ses",                emoji: "🎵", renk: "#0284c7" },
  "fotograf":        { ad: "Fotoğrafçılık",              emoji: "📷", renk: "#b45309" },
  "ceviri":          { ad: "Çeviri & Tercümanlık",       emoji: "🌐", renk: "#0d9488" },
  "etkinlik":        { ad: "Etkinlik & Organizasyon",    emoji: "🎉", renk: "#be185d" },
  "guvenlik":        { ad: "Güvenlik Hizmetleri",        emoji: "🔒", renk: "#374151" },
  "peyzaj":          { ad: "Peyzaj & Bahçe",             emoji: "🌿", renk: "#16a34a" },
  "cocuk":           { ad: "Çocuk & Bakıcı",             emoji: "👶", renk: "#f472b6" },
  "yasli-bakimi":    { ad: "Yaşlı & Hasta Bakımı",       emoji: "🤝", renk: "#6366f1" },
  "pet":             { ad: "Pet & Veteriner",            emoji: "🐾", renk: "#78350f" },
  "tamir-bakim":     { ad: "Tamir & Bakım",              emoji: "🔧", renk: "#dc2626" },
  "mimarlik":        { ad: "Mimarlık & Mühendislik",     emoji: "📐", renk: "#1d4ed8" },
  "moda":            { ad: "Moda & Stil",                emoji: "👗", renk: "#be185d" },
  "spor":            { ad: "Spor & Fitness",             emoji: "💪", renk: "#16a34a" },
  "oyun":            { ad: "Oyun & Eğlence",             emoji: "🎮", renk: "#7c3aed" },
  "el-yapimi":       { ad: "El Yapımı & Hobi",           emoji: "🧶", renk: "#d97706" },
  "tarim-hayvan":    { ad: "Tarım & Hayvancılık",        emoji: "🐄", renk: "#65a30d" },
  "enerji":          { ad: "Yenilenebilir Enerji",       emoji: "☀️", renk: "#ca8a04" },
  "ithalat-ihracat": { ad: "İthalat & İhracat",         emoji: "🌍", renk: "#0369a1" },
  "icerik":          { ad: "İçerik & Metin Yazarlığı",   emoji: "✍️", renk: "#0891b2" },
};

export const SEKTORLER: Sektor[] = TUM_SEKTORLER.map(s => {
  const bilgi = SEKTOR_ADLARI[s.id];
  if (bilgi) return { ...s, ad: bilgi.ad, emoji: bilgi.emoji, icon: bilgi.emoji, renk: bilgi.renk };
  return s;
});

export const KATEGORILER_ANA = [
  { id: "tum", ad: "Tüm Sektörler", emoji: "🌐", tip: "both", renk: "#0f172a", icon: "🌐", altKategoriler: [], butceBirimi: "TL", hizmetAlanFormu: [], hizmetVerenFormu: [] } as Sektor,
  ...SEKTORLER,
];

export const BIREYSEL_SEKTORLER = SEKTORLER.filter(s => s.tip === "bireysel" || s.tip === "both");
export const TICARI_SEKTORLER   = SEKTORLER.filter(s => s.tip === "ticari"   || s.tip === "both");

// ============================================================
// MESLEKLER
// ============================================================
export const MESLEKLER: Record<string, string[]> = {
  yazilim: ["Frontend Geliştirici", "Backend Geliştirici", "Fullstack", "Mobil Geliştirici", "DevOps", "Veri Bilimci", "Yapay Zeka Uzmanı"],
  tasarim: ["Grafik Tasarımcı", "UI/UX Tasarımcı", "Logo Tasarımcı", "Web Tasarımcı", "3D Tasarımcı", "Motion Designer"],
  pazarlama: ["SEO Uzmanı", "Google Ads", "Sosyal Medya Uzmanı", "E-posta Pazarlama", "CRO Uzmanı"],
  egitim: ["Matematik Öğretmeni", "İngilizce Öğretmeni", "Yazılım Eğitmeni", "İş Koçu", "Kariyer Danışmanı"],
  hukuk: ["Avukat", "İş Hukuku Uzmanı", "Aile Hukuku", "Şirket Hukuku", "Vergi Hukuku"],
  muhasebe: ["Mali Müşavir", "Vergi Uzmanı", "Muhasebeci", "Denetçi", "Finansal Analist"],
  saglik: ["Doktor", "Psikolog", "Fizyoterapist", "Diyetisyen", "Eczacı", "Güzellik Uzmanı"],
  insaat: ["Mimar", "İnşaat Mühendisi", "Elektrik Ustası", "Tesisat Ustası", "Boyacı"],
  temizlik: ["Ev Temizliği", "Ofis Temizliği", "İnşaat Sonrası", "Dezenfeksiyon"],
  nakliye: ["Şehir İçi Nakliye", "Şehirlerarası", "Uluslararası", "Kurye"],
};

export const ISLEM_TIPLERI = [
  { slug: "hizmet-ver", ad: "Hizmet Ver", desc: "Hizmetini sun ve kazan" },
  { slug: "hizmet-al",  ad: "Hizmet Al",  desc: "İhtiyacın olan hizmeti bul" },
  { slug: "teklif-al",  ad: "Teklif Al",  desc: "Fiyat teklifi al" },
  { slug: "teklif-ver", ad: "Teklif Ver", desc: "Fiyat teklifi ver" },
  { slug: "ilan-ver",   ad: "İlan Ver",   desc: "Ürün veya hizmet ilanı ver" },
];

export const KULLANICI_TIPLERI = [
  { slug: "bireysel", ad: "Bireysel",       desc: "Kişisel kullanım" },
  { slug: "ticari",   ad: "Ticari / Firma", desc: "Kurumsal kullanım" },
];  'emlak-satis': [
    'emlak-danismani', 'emlak-degerleme', 'tapu-islemi',
    'kira-yonetimi', 'site-yonetimi', 'kat-irtifaki',
  ],
  'turizm': [
    'tur-rehberi', 'otel-yonetimi', 'seyahat-acentesi',
    'airbnb-yonetimi', 'kongre-organizasyonu', 'transfer-hizmeti',
  ],
  'lojistik': [
    'gumruk-musaviri', 'lojistik-koordinator', 'depo-yonetimi',
    'tedarik-zinciri', 'ihracat-uzmani', 'ithalat-uzmani',
  ],
  'spor': [
    'personal-trainer', 'fitness-kocu', 'futbol-antrenoru',
    'yuzme-egitmeni', 'tenis-egitmeni', 'yoga-egitmeni',
    'beslenme-kocu', 'pilates-egitmeni',
  ],
  'etkinlik': [
    'dugun-organizasyonu', 'kurumsal-etkinlik', 'konser-organizasyonu',
    'dj', 'mc', 'catering', 'dekorasyon', 'ses-isik-sistemi',
  ],
};

// ============================================================
// IŞLEM TİPLERİ
// ============================================================
export const ISLEM_TIPLERI = [
  { slug: 'hizmet-ver',  ad: 'Hizmet Ver',  desc: 'Hizmetini sun ve kazan' },
  { slug: 'hizmet-al',   ad: 'Hizmet Al',   desc: 'İhtiyacın olan hizmeti bul' },
  { slug: 'teklif-al',   ad: 'Teklif Al',   desc: 'Fiyat teklifi al' },
  { slug: 'teklif-ver',  ad: 'Teklif Ver',  desc: 'Fiyat teklifi ver' },
  { slug: 'ilan-ver',    ad: 'İlan Ver',    desc: 'Ürün veya hizmet ilanı ver' },
];

// ============================================================
// KULLANICI TİPLERİ
// ============================================================
export const KULLANICI_TIPLERI = [
  { slug: 'bireysel', ad: 'Bireysel',       desc: 'Kişisel kullanım' },
  { slug: 'ticari',   ad: 'Ticari / Firma', desc: 'Kurumsal kullanım' },
];
