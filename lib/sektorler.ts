export interface FormAlan {
  key: string;
  label: string;
  tip: 'text' | 'number' | 'select' | 'multiselect' | 'textarea' | 'date' | 'daterange' | 'toggle' | 'range' | 'adres';
  secenekler?: string[];
  zorunlu?: boolean;
  placeholder?: string;
  birim?: string;
  grup?: string;
}

export interface AltKategori {
  id: string;
  ad: string;
  icon: string;
}

export interface Sektor {
  id: string;
  ad: string;
  icon: string;
  renk: string;
  aciklama?: string;
  altKategoriler?: AltKategori[];
  hizmetAlanFormu: FormAlan[];
  hizmetVerenFormu: FormAlan[];
  butceBirimi: string;
  tip: 'bireysel' | 'ticari' | 'her_ikisi';
}

export const SEKTORLER: Sektor[] = [
  {
    id: 'usta',
    ad: 'Usta & İşçi',
    icon: '👷',
    renk: '#dc2626',
    tip: 'her_ikisi',
    altKategoriler: [
      { id: 'inşaat_usta', ad: 'İnşaat Ustası', icon: '🏗️' },
      { id: 'boyaci', ad: 'Boyacı', icon: '🎨' },
      { id: 'tesisatci', ad: 'Tesisatçı', icon: '🪠' },
      { id: 'elektrikci', ad: 'Elektrikçi', icon: '⚡' },
      { id: 'temizlikci', ad: 'Temizlikçi', icon: '🧹' },
      { id: 'bahce', ad: 'Bahçıvan', icon: '🌿' },
      { id: 'tadilat', ad: 'Tadilat / Dekorasyon', icon: '🪟' },
      { id: 'nakliye_usta', ad: 'Nakliyeci', icon: '🚛' },
      { id: 'guvenlik', ad: 'Güvenlik', icon: '🛡️' },
      { id: 'sekreter', ad: 'Sekreter / Asistan', icon: '💼' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Usta / İşçi Tipi', tip: 'select', secenekler: ['İnşaat Ustası', 'Boyacı', 'Tesisatçı', 'Elektrikçi', 'Temizlikçi', 'Bahçıvan', 'Tadilat', 'Nakliyeci', 'Güvenlik', 'Sekreter', 'Diğer'], zorunlu: true, grup: 'Hizmet' },
      { key: 'isAciklamasi', label: 'İş Açıklaması', tip: 'textarea', placeholder: 'Ne yapılmasını istiyorsunuz?', zorunlu: true, grup: 'Hizmet' },
      { key: 'mekanTipi', label: 'Mekan Tipi', tip: 'select', secenekler: ['Daire', 'Villa / Müstakil', 'İş Yeri / Ofis', 'Fabrika', 'Dükkan', 'Arazi / Bahçe', 'Diğer'], grup: 'Mekan' },
      { key: 'alanM2', label: 'Alan (m²)', tip: 'number', birim: 'm²', grup: 'Mekan' },
      { key: 'odaSayisi', label: 'Oda Sayısı', tip: 'number', grup: 'Mekan' },
      { key: 'is_suresi', label: 'İş Süresi Tahmini', tip: 'select', secenekler: ['Birkaç Saat', '1 Gün', '2-3 Gün', '1 Hafta', '1 Ay', '1 Aydan Fazla'], grup: 'Zamanlama' },
      { key: 'baslangic', label: 'Başlangıç Tarihi', tip: 'date', grup: 'Zamanlama' },
      { key: 'sehir', label: 'Şehir', tip: 'text', zorunlu: true, grup: 'Konum' },
      { key: 'ilce', label: 'İlçe', tip: 'text', grup: 'Konum' },
      { key: 'malzeme', label: 'Malzeme', tip: 'select', secenekler: ['İşçilik + Malzeme', 'Sadece İşçilik', 'Fark Etmez'], grup: 'Detay' },
      { key: 'butce', label: 'Tahmini Bütçe', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
      { key: 'aciklama', label: 'Ek Açıklama', tip: 'textarea', grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'adSoyad', label: 'Ad Soyad', tip: 'text', zorunlu: true, grup: 'Kişisel' },
      { key: 'meslekler', label: 'Meslekler', tip: 'multiselect', secenekler: ['İnşaat', 'Boyacı', 'Tesisatçı', 'Elektrikçi', 'Temizlik', 'Bahçıvan', 'Tadilat', 'Nakliye', 'Güvenlik'], grup: 'Kişisel' },
      { key: 'tecrube', label: 'Deneyim', tip: 'number', birim: 'yıl', grup: 'Kişisel' },
      { key: 'sehirler', label: 'Çalışma Bölgeleri', tip: 'text', grup: 'Kişisel' },
    ],
    butceBirimi: '₺',
  },
  {
    id: 'temizlik',
    ad: 'Temizlik Hizmetleri',
    icon: '🧹',
    renk: '#0891b2',
    tip: 'her_ikisi',
    altKategoriler: [
      { id: 'ev_temizlik', ad: 'Ev Temizliği', icon: '🏠' },
      { id: 'ofis_temizlik', ad: 'Ofis Temizliği', icon: '🏢' },
      { id: 'cam_silme', ad: 'Cam Silme', icon: '🪟' },
      { id: 'hali_yikama', ad: 'Halı Yıkama', icon: '🛁' },
      { id: 'koltuk_yikama', ad: 'Koltuk Yıkama', icon: '🛋️' },
      { id: 'boya_sonrasi', ad: 'Tadilat Sonrası', icon: '🔨' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Temizlik Tipi', tip: 'select', secenekler: ['Ev Temizliği', 'Ofis Temizliği', 'Cam Silme', 'Halı Yıkama', 'Koltuk Yıkama', 'Tadilat Sonrası', 'Depo / Garaj'], zorunlu: true, grup: 'Hizmet' },
      { key: 'yapilacaklar', label: 'Yapılacak İşler', tip: 'multiselect', secenekler: ['Genel Temizlik', 'Derinlemesine Temizlik', 'Cam Silme', 'Duvar Silme', 'Banyo Temizliği', 'Mutfak Temizliği', 'Çamaşır', 'Ütü', 'Bulaşık', 'Balkon', 'Zemin Parlatma'], zorunlu: true, grup: 'Hizmet' },
      { key: 'mekanTipi', label: 'Mekan Tipi', tip: 'select', secenekler: ['Daire', 'Villa', 'Ofis', 'Mağaza', 'Depo'], grup: 'Mekan' },
      { key: 'odaSayisi', label: 'Oda Sayısı', tip: 'number', grup: 'Mekan' },
      { key: 'alanM2', label: 'Metrekare', tip: 'number', birim: 'm²', grup: 'Mekan' },
      { key: 'kat', label: 'Kat', tip: 'number', grup: 'Mekan' },
      { key: 'periyodik', label: 'Periyodik mi?', tip: 'select', secenekler: ['Tek Seferlik', 'Haftalık', '2 Haftada 1', 'Aylık', 'Düzenli Anlaşma'], grup: 'Zamanlama' },
      { key: 'tarih', label: 'Tarih', tip: 'date', grup: 'Zamanlama' },
      { key: 'sehir', label: 'Şehir', tip: 'text', zorunlu: true, grup: 'Konum' },
      { key: 'ilce', label: 'İlçe', tip: 'text', grup: 'Konum' },
      { key: 'malzeme', label: 'Malzeme', tip: 'select', secenekler: ['Ben Sağlarım', 'Temizlikçi Getirsin', 'Fark Etmez'], grup: 'Detay' },
      { key: 'butce', label: 'Tahmini Bütçe', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
      { key: 'aciklama', label: 'Açıklama', tip: 'textarea', grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'adSoyad', label: 'Ad Soyad / Firma', tip: 'text', zorunlu: true, grup: 'Firma' },
      { key: 'hizmetler', label: 'Verilen Hizmetler', tip: 'multiselect', secenekler: ['Ev', 'Ofis', 'Cam', 'Halı', 'Koltuk', 'Tadilat Sonrası'], grup: 'Firma' },
      { key: 'sehirler', label: 'Hizmet Bölgeleri', tip: 'text', grup: 'Firma' },
    ],
    butceBirimi: '₺',
  },
  {
    id: 'uretim',
    ad: 'Üretim & Özel Sipariş',
    icon: '🏭',
    renk: '#7c3aed',
    tip: 'ticari',
    altKategoriler: [
      { id: 'metal', ad: 'Metal & Demir', icon: '⚙️' },
      { id: 'mobilya_uretim', ad: 'Mobilya', icon: '🪑' },
      { id: 'gida_uretim', ad: 'Gıda', icon: '🍎' },
      { id: 'tekstil_uretim', ad: 'Tekstil', icon: '🧵' },
      { id: 'plastik', ad: 'Plastik & Kompozit', icon: '🧪' },
      { id: 'ahsap', ad: 'Ahşap İşleri', icon: '🪵' },
      { id: 'ambalaj', ad: 'Ambalaj', icon: '📦' },
      { id: 'baskı', ad: 'Baskı & Matbaa', icon: '🖨️' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Üretim Kategorisi', tip: 'select', secenekler: ['Metal / Demir', 'Mobilya', 'Gıda', 'Tekstil', 'Plastik', 'Ahşap', 'Ambalaj', 'Baskı / Matbaa', 'Diğer'], zorunlu: true, grup: 'Ürün' },
      { key: 'urunAdi', label: 'Ürün Adı', tip: 'text', placeholder: 'Örn: Bayan Ceket, Çelik Kapı', zorunlu: true, grup: 'Ürün' },
      { key: 'adet', label: 'Adet', tip: 'number', birim: 'adet', zorunlu: true, grup: 'Ürün' },
      { key: 'birim', label: 'Birim', tip: 'select', secenekler: ['Adet', 'Kg', 'Metre', 'Ton', 'Paket', 'Kutu'], grup: 'Ürün' },
      { key: 'malzeme', label: 'Malzeme / Kumaş Tercihi', tip: 'text', placeholder: 'Örn: Örme kumaş, Paslanmaz çelik', grup: 'Özellikler' },
      { key: 'renk', label: 'Renk / Model', tip: 'text', grup: 'Özellikler' },
      { key: 'olculer', label: 'Ölçüler / Ebatlar', tip: 'text', grup: 'Özellikler' },
      { key: 'kaliteStandart', label: 'Kalite / Standart', tip: 'text', placeholder: 'ISO, CE, TSE vb.', grup: 'Özellikler' },
      { key: 'teslimatSuresi', label: 'Teslimat Süresi', tip: 'select', secenekler: ['Acil (1 Hafta)', '2 Hafta', '1 Ay', '2 Ay', '3 Ay+', 'Müzakere Edilebilir'], grup: 'Teslimat' },
      { key: 'teslimatYeri', label: 'Teslimat Yeri', tip: 'text', grup: 'Teslimat' },
      { key: 'butce', label: 'Tahmini Bütçe', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
      { key: 'aciklama', label: 'Teknik Açıklama', tip: 'textarea', grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'firmaAdi', label: 'Firma Adı', tip: 'text', zorunlu: true, grup: 'Firma' },
      { key: 'kategoriler', label: 'Üretim Kategorileri', tip: 'multiselect', secenekler: ['Metal', 'Mobilya', 'Gıda', 'Tekstil', 'Plastik', 'Ahşap', 'Ambalaj', 'Baskı'], grup: 'Firma' },
      { key: 'minAdet', label: 'Minimum Sipariş Adedi', tip: 'number', grup: 'Firma' },
      { key: 'kapasite', label: 'Aylık Kapasite', tip: 'text', grup: 'Firma' },
      { key: 'sertifikalar', label: 'Sertifikalar', tip: 'text', placeholder: 'ISO 9001, CE...', grup: 'Firma' },
    ],
    butceBirimi: '₺',
  },
  {
    id: 'giyim',
    ad: 'Giyim & Tekstil',
    icon: '👗',
    renk: '#db2777',
    tip: 'her_ikisi',
    altKategoriler: [
      { id: 'bayan_giyim', ad: 'Bayan Giyim', icon: '👗' },
      { id: 'erkek_giyim', ad: 'Erkek Giyim', icon: '👔' },
      { id: 'cocuk_giyim', ad: 'Çocuk Giyim', icon: '🧒' },
      { id: 'is_elbisesi', ad: 'İş Kıyafeti / Üniforma', icon: '🦺' },
      { id: 'ev_tekstil', ad: 'Ev Tekstili', icon: '🛏️' },
      { id: 'havlu_bornoz', ad: 'Havlu & Bornoz', icon: '🏊' },
      { id: 'canta', ad: 'Çanta & Aksesuar', icon: '👜' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Giyim Kategorisi', tip: 'select', secenekler: ['Bayan Giyim', 'Erkek Giyim', 'Çocuk Giyim', 'İş Kıyafeti', 'Ev Tekstili', 'Havlu & Bornoz', 'Çanta & Aksesuar'], zorunlu: true, grup: 'Ürün' },
      { key: 'urunAdi', label: 'Ürün Adı', tip: 'text', placeholder: 'Örn: Bayan Mont, Erkek Takım Elbise', zorunlu: true, grup: 'Ürün' },
      { key: 'adet', label: 'Adet', tip: 'number', birim: 'adet', zorunlu: true, grup: 'Ürün' },
      { key: 'beden', label: 'Beden', tip: 'text', placeholder: 'XS, S, M, L, XL veya sayı', grup: 'Özellikler' },
      { key: 'kumasTipi', label: 'Kumaş Tipi', tip: 'select', secenekler: ['Örme', 'Dokuma', 'Denim', 'Deri', 'Sentetik', 'Pamuk', 'Yün', 'İpek', 'Keten', 'Fark Etmez'], grup: 'Özellikler' },
      { key: 'renk', label: 'Renk / Desen', tip: 'text', grup: 'Özellikler' },
      { key: 'marka', label: 'Marka Tercihi', tip: 'text', grup: 'Özellikler' },
      { key: 'logo', label: 'Logo / Baskı', tip: 'select', secenekler: ['Hayır', 'Evet - Nakış', 'Evet - Baskı', 'Evet - Patch'], grup: 'Özellikler' },
      { key: 'teslimat', label: 'Teslimat Süresi', tip: 'select', secenekler: ['Acil (1 Hafta)', '2 Hafta', '1 Ay', 'Fark Etmez'], grup: 'Teslimat' },
      { key: 'butce', label: 'Tahmini Bütçe', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
      { key: 'aciklama', label: 'Açıklama', tip: 'textarea', grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'firmaAdi', label: 'Firma / Atölye Adı', tip: 'text', zorunlu: true, grup: 'Firma' },
      { key: 'kategoriler', label: 'Üretim Kategorileri', tip: 'multiselect', secenekler: ['Bayan', 'Erkek', 'Çocuk', 'İş Kıyafeti', 'Ev Tekstili', 'Aksesuar'], grup: 'Firma' },
      { key: 'minAdet', label: 'Minimum Sipariş', tip: 'number', grup: 'Firma' },
    ],
    butceBirimi: '₺',
  },
  {
    id: 'mobilya',
    ad: 'Mobilya & Dekorasyon',
    icon: '🪑',
    renk: '#92400e',
    tip: 'her_ikisi',
    altKategoriler: [
      { id: 'mutfak_mobilya', ad: 'Mutfak Mobilyası', icon: '🍳' },
      { id: 'yatak_odası', ad: 'Yatak Odası', icon: '🛏️' },
      { id: 'oturma_odası', ad: 'Oturma Odası', icon: '🛋️' },
      { id: 'ofis_mobilya', ad: 'Ofis Mobilyası', icon: '💼' },
      { id: 'banyo_mobilya', ad: 'Banyo', icon: '🛁' },
      { id: 'dekorasyon', ad: 'Dekorasyon', icon: '🎨' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Mobilya Kategorisi', tip: 'select', secenekler: ['Mutfak', 'Yatak Odası', 'Oturma Odası', 'Ofis', 'Banyo', 'Dekorasyon', 'Komple Ev'], zorunlu: true, grup: 'Ürün' },
      { key: 'urunAdi', label: 'Ürün Adı', tip: 'text', placeholder: 'Örn: L Köşe Koltuk, Amerikan Mutfak', zorunlu: true, grup: 'Ürün' },
      { key: 'adet', label: 'Adet', tip: 'number', grup: 'Ürün' },
      { key: 'malzeme', label: 'Malzeme', tip: 'select', secenekler: ['Masif Ahşap', 'MDF', 'Metal', 'Cam', 'Deri', 'Kumaş', 'Fark Etmez'], grup: 'Özellikler' },
      { key: 'renk', label: 'Renk / Tarz', tip: 'text', grup: 'Özellikler' },
      { key: 'stil', label: 'Stil', tip: 'select', secenekler: ['Modern', 'Klasik', 'Rustik', 'Endüstriyel', 'Minimal', 'Bohem', 'Fark Etmez'], grup: 'Özellikler' },
      { key: 'olcu', label: 'Boyut / Ölçü', tip: 'text', placeholder: 'cm cinsinden', grup: 'Özellikler' },
      { key: 'montaj', label: 'Montaj', tip: 'select', secenekler: ['Montaj Dahil', 'Sadece Ürün', 'Fark Etmez'], grup: 'Teslimat' },
      { key: 'teslimat', label: 'Teslimat', tip: 'select', secenekler: ['Adrese Teslim', 'Depodan Teslim'], grup: 'Teslimat' },
      { key: 'sehir', label: 'Şehir', tip: 'text', zorunlu: true, grup: 'Konum' },
      { key: 'butce', label: 'Tahmini Bütçe', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
      { key: 'aciklama', label: 'Açıklama', tip: 'textarea', grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'firmaAdi', label: 'Firma Adı', tip: 'text', zorunlu: true, grup: 'Firma' },
      { key: 'kategoriler', label: 'Kategoriler', tip: 'multiselect', secenekler: ['Mutfak', 'Yatak Odası', 'Oturma Odası', 'Ofis', 'Banyo', 'Dekorasyon'], grup: 'Firma' },
      { key: 'sehirler', label: 'Hizmet Şehirleri', tip: 'text', grup: 'Firma' },
    ],
    butceBirimi: '₺',
  },
  {
    id: 'saglik',
    ad: 'Sağlık & Güzellik',
    icon: '💊',
    renk: '#16a34a',
    tip: 'bireysel',
    altKategoriler: [
      { id: 'doktor', ad: 'Doktor / Klinik', icon: '🏥' },
      { id: 'dis', ad: 'Diş Hekimi', icon: '🦷' },
      { id: 'guzellik', ad: 'Güzellik Salonu', icon: '💅' },
      { id: 'masaj', ad: 'Masaj & SPA', icon: '💆' },
      { id: 'fitness', ad: 'Personal Trainer', icon: '💪' },
      { id: 'psikoloji', ad: 'Psikoloji', icon: '🧠' },
      { id: 'veteriner', ad: 'Veteriner', icon: '🐾' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Hizmet Tipi', tip: 'select', secenekler: ['Doktor', 'Diş Hekimi', 'Güzellik', 'Masaj & SPA', 'Personal Trainer', 'Psikoloji', 'Veteriner', 'Diğer'], zorunlu: true, grup: 'Hizmet' },
      { key: 'ihtiyac', label: 'İhtiyaç / Şikayet', tip: 'textarea', zorunlu: true, grup: 'Hizmet' },
      { key: 'tarih', label: 'Randevu Tarihi', tip: 'date', grup: 'Zamanlama' },
      { key: 'sehir', label: 'Şehir', tip: 'text', zorunlu: true, grup: 'Konum' },
      { key: 'butce', label: 'Tahmini Bütçe', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'adSoyad', label: 'Ad / Klinik Adı', tip: 'text', zorunlu: true, grup: 'Profil' },
      { key: 'uzmanlik', label: 'Uzmanlık', tip: 'multiselect', secenekler: ['Genel', 'Diş', 'Güzellik', 'Masaj', 'Fitness', 'Psikoloji', 'Veteriner'], grup: 'Profil' },
      { key: 'sehir', label: 'Şehir', tip: 'text', grup: 'Profil' },
    ],
    butceBirimi: '₺',
  },
  {
    id: 'egitim',
    ad: 'Eğitim & Danışmanlık',
    icon: '📚',
    renk: '#2563eb',
    tip: 'her_ikisi',
    altKategoriler: [
      { id: 'ozel_ders', ad: 'Özel Ders', icon: '👨‍🏫' },
      { id: 'dil_kursu', ad: 'Dil Kursu', icon: '🌍' },
      { id: 'musiki', ad: 'Müzik Dersi', icon: '🎸' },
      { id: 'yazilim', ad: 'Yazılım / IT', icon: '💻' },
      { id: 'is_danismanlik', ad: 'İş Danışmanlığı', icon: '📊' },
      { id: 'hukuk', ad: 'Hukuki Danışmanlık', icon: '⚖️' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Hizmet Tipi', tip: 'select', secenekler: ['Özel Ders', 'Dil Kursu', 'Müzik', 'Yazılım', 'İş Danışmanlığı', 'Hukuk', 'Muhasebe', 'Diğer'], zorunlu: true, grup: 'Hizmet' },
      { key: 'konu', label: 'Konu / Ders', tip: 'text', placeholder: 'Matematik, İngilizce, Python...', zorunlu: true, grup: 'Hizmet' },
      { key: 'seviye', label: 'Seviye', tip: 'select', secenekler: ['Başlangıç', 'Orta', 'İleri', 'Fark Etmez'], grup: 'Hizmet' },
      { key: 'format', label: 'Format', tip: 'select', secenekler: ['Yüz Yüze', 'Online', 'Her İkisi'], grup: 'Hizmet' },
      { key: 'haftalikSaat', label: 'Haftalık Saat', tip: 'number', birim: 'saat/hafta', grup: 'Süre' },
      { key: 'sure', label: 'Süre', tip: 'select', secenekler: ['1 Ay', '3 Ay', '6 Ay', '1 Yıl', 'Süresiz'], grup: 'Süre' },
      { key: 'sehir', label: 'Şehir', tip: 'text', grup: 'Konum' },
      { key: 'butce', label: 'Tahmini Bütçe (Saatlik)', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
      { key: 'aciklama', label: 'Açıklama', tip: 'textarea', grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'adSoyad', label: 'Ad Soyad', tip: 'text', zorunlu: true, grup: 'Profil' },
      { key: 'uzmanlik', label: 'Uzmanlık Alanları', tip: 'multiselect', secenekler: ['Matematik', 'Fizik', 'Kimya', 'İngilizce', 'Almanca', 'Yazılım', 'Müzik', 'İş', 'Hukuk'], grup: 'Profil' },
      { key: 'tecrube', label: 'Deneyim', tip: 'number', birim: 'yıl', grup: 'Profil' },
      { key: 'format', label: 'Çalışma Formatı', tip: 'multiselect', secenekler: ['Yüz Yüze', 'Online'], grup: 'Profil' },
    ],
    butceBirimi: '₺',
  },
  {
    id: 'etkinlik',
    ad: 'Etkinlik & Düğün',
    icon: '🎉',
    renk: '#9333ea',
    tip: 'her_ikisi',
    altKategoriler: [
      { id: 'dugun', ad: 'Düğün', icon: '💒' },
      { id: 'organizasyon', ad: 'Organizasyon', icon: '🎪' },
      { id: 'catering', ad: 'Catering', icon: '🍽️' },
      { id: 'fotograf', ad: 'Fotoğraf / Video', icon: '📸' },
      { id: 'dekorasyon_etk', ad: 'Dekorasyon', icon: '🌸' },
      { id: 'dj_muzik', ad: 'DJ / Müzik', icon: '🎧' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Etkinlik Tipi', tip: 'select', secenekler: ['Düğün', 'Nişan', 'Doğum Günü', 'Mezuniyet', 'Kurumsal Etkinlik', 'Catering', 'Fotoğraf', 'DJ', 'Dekorasyon'], zorunlu: true, grup: 'Etkinlik' },
      { key: 'kisiSayisi', label: 'Kişi Sayısı', tip: 'number', birim: 'kişi', zorunlu: true, grup: 'Etkinlik' },
      { key: 'tarih', label: 'Etkinlik Tarihi', tip: 'date', zorunlu: true, grup: 'Etkinlik' },
      { key: 'sure', label: 'Süre (Saat)', tip: 'number', birim: 'saat', grup: 'Etkinlik' },
      { key: 'mekan', label: 'Mekan Var mı?', tip: 'select', secenekler: ['Evet, Mekanım Var', 'Hayır, Mekan da Lazım', 'Açık Alan'], grup: 'Mekan' },
      { key: 'sehir', label: 'Şehir', tip: 'text', zorunlu: true, grup: 'Konum' },
      { key: 'butce', label: 'Tahmini Bütçe', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
      { key: 'aciklama', label: 'Açıklama', tip: 'textarea', grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'firmaAdi', label: 'Firma Adı', tip: 'text', zorunlu: true, grup: 'Firma' },
      { key: 'hizmetler', label: 'Verilen Hizmetler', tip: 'multiselect', secenekler: ['Düğün Salonu', 'Catering', 'Fotoğraf', 'DJ', 'Dekorasyon', 'Organizasyon'], grup: 'Firma' },
      { key: 'kapasite', label: 'Maksimum Kapasite', tip: 'number', birim: 'kişi', grup: 'Firma' },
      { key: 'sehirler', label: 'Hizmet Şehirleri', tip: 'text', grup: 'Firma' },
    ],
    butceBirimi: '₺',
  },
];

// ═══════════════════════════════════════════
// DÜZELTME: KATEGORILER_ANA ARTIK BİR NESNE (INDEXLENEBİLİR)
// ═══════════════════════════════════════════

export const BIREYSEL_SEKTORLER = SEKTORLER.filter(s => s.tip === 'bireysel' || s.tip === 'her_ikisi');
export const TICARI_SEKTORLER = SEKTORLER.filter(s => s.tip === 'ticari' || s.tip === 'her_ikisi');
export const TIGARI_SEKTORLER = TICARI_SEKTORLER; // Olası yazım hataları için alias

// page.tsx dosyasındaki [aktifTip] kullanımını desteklemek için:
export const KATEGORILER_ANA: Record<string, Sektor[]> = {
  'bireysel': BIREYSEL_SEKTORLER,
  'ticari': TICARI_SEKTORLER,
  'Tümü': SEKTORLER
};

export const SEKTOR_MAP = Object.fromEntries(SEKTORLER.map(s => [s.id, s]));

export const BUTCE_ARALIKLARI = {
  '₺': [[0, 1000], [1000, 5000], [5000, 10000], [10000, 25000], [25000, 50000], [50000, 100000], [100000, 500000]],
  '$': [[0, 500], [500, 1000], [1000, 2000], [2000, 5000], [5000, 10000], [10000, 25000]],
};
