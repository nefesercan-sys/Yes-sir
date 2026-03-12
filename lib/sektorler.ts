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

export interface Sektor {
  id: string;
  ad: string;
  icon: string;
  renk: string;
  altKategoriler?: { id: string; ad: string; icon: string }[];
  hizmetAlanFormu: FormAlan[];
  hizmetVerenFormu: FormAlan[];
  butceBirimi: string;
}

export const SEKTORLER: Sektor[] = [
  // ═══════════════════════════════════════════
  // 1. TURİZM & KONAKLAMA
  // ═══════════════════════════════════════════
  {
    id: 'turizm',
    ad: 'Turizm & Konaklama',
    icon: '🏨',
    renk: '#0f6fbd',
    altKategoriler: [
      { id: 'otel', ad: 'Otel', icon: '🏨' },
      { id: 'pansiyon', ad: 'Pansiyon / B&B', icon: '🏡' },
      { id: 'villa', ad: 'Villa / Apart', icon: '🏠' },
      { id: 'kamp', ad: 'Kamp / Glamping', icon: '⛺' },
      { id: 'tur', ad: 'Tur Paketi', icon: '🗺️' },
      { id: 'kruvaziyer', ad: 'Kruvaziyer', icon: '🚢' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Konaklama Tipi', tip: 'select', secenekler: ['Otel', 'Pansiyon / B&B', 'Villa / Apart', 'Kamp / Glamping', 'Tur Paketi', 'Kruvaziyer'], zorunlu: true, grup: 'Temel Bilgiler' },
      { key: 'ulke', label: 'Ülke', tip: 'select', secenekler: ['Türkiye', 'İspanya', 'İtalya', 'Yunanistan', 'Mısır', 'Tayland', 'Maldivler', 'Bali/Endonezya', 'Dubai/BAE', 'Portekiz', 'Fransa', 'Hırvatistan', 'Karadağ', 'Arnavutluk', 'Diğer'], zorunlu: true, grup: 'Konum' },
      { key: 'sehir', label: 'Şehir / Bölge', tip: 'text', placeholder: 'Antalya, Bodrum, Marmaris...', zorunlu: true, grup: 'Konum' },
      { key: 'tatilTarihi', label: 'Tatil Tarihi', tip: 'daterange', zorunlu: true, grup: 'Tarih & Süre' },
      { key: 'gun', label: 'Kaç Gün', tip: 'number', placeholder: '7', birim: 'gün', zorunlu: true, grup: 'Tarih & Süre' },
      { key: 'kisiSayisi', label: 'Kişi Sayısı', tip: 'number', placeholder: '2', birim: 'kişi', zorunlu: true, grup: 'Tarih & Süre' },
      { key: 'yetiskin', label: 'Yetişkin', tip: 'number', placeholder: '2', grup: 'Tarih & Süre' },
      { key: 'cocuk', label: 'Çocuk', tip: 'number', placeholder: '0', grup: 'Tarih & Süre' },
      { key: 'cocukYas', label: 'Çocuk Yaşları', tip: 'text', placeholder: 'Örn: 3, 7', grup: 'Tarih & Süre' },
      { key: 'otelYildiz', label: 'Otel Yıldızı', tip: 'select', secenekler: ['1 Yıldız', '2 Yıldız', '3 Yıldız', '4 Yıldız', '5 Yıldız', 'Butik Otel', 'Fark Etmez'], zorunlu: true, grup: 'Otel & Oda' },
      { key: 'odaTipi', label: 'Oda Tipi', tip: 'select', secenekler: ['Standart Oda', 'Deniz Manzaralı', 'Suit', 'Aile Odası', 'Kral Dairesi', 'Villa', 'Bungalov', 'Fark Etmez'], grup: 'Otel & Oda' },
      { key: 'odaKisisi', label: 'Oda Kişi Sayısı', tip: 'select', secenekler: ['1 Kişilik', '2 Kişilik', '3 Kişilik', '4 Kişilik', 'Aile (5+)'], grup: 'Otel & Oda' },
      { key: 'paket', label: 'Paket Tipi', tip: 'select', secenekler: ['Oda Kahvaltı (BB)', 'Yarım Pansiyon (HB)', 'Tam Pansiyon (FB)', 'Her Şey Dahil (AI)', 'Ultra Her Şey Dahil', 'Sadece Oda (RO)', 'Ekonomik Paket', 'Standart Paket', 'Full Paket'], zorunlu: true, grup: 'Paket & Yemek' },
      { key: 'yemekTercihi', label: 'Yemek Tercihi', tip: 'multiselect', secenekler: ['Et Ağırlıklı', 'Vejetaryen', 'Vegan', 'Karışık', 'Helal', 'Glütensiz', 'Deniz Ürünleri', 'Fark Etmez'], grup: 'Paket & Yemek' },
      { key: 'yemekListesi', label: 'İstenen Yemekler', tip: 'multiselect', secenekler: ['Türk Mutfağı', 'Akdeniz', 'İtalyan', 'Uzak Doğu', 'Kebap / Izgara', 'Meze & Balık', 'Fast Food', 'Kahvaltı Büfesi', 'Canlı Pişirme', 'A la Carte'], grup: 'Paket & Yemek' },
      { key: 'icecekTercihi', label: 'İçecek Tercihi', tip: 'select', secenekler: ['Alkolsüz', 'Alkollü (Bira & Şarap)', 'Tam Açık Büfe Alkol', 'Premium Alkol', 'Fark Etmez'], grup: 'İçecek & Eğlence' },
      { key: 'eglencel', label: 'İstenen Eğlenceler', tip: 'multiselect', secenekler: ['Animasyon', 'Disko / Gece Kulübü', 'Canlı Müzik', 'Su Sporları', 'Dalış', 'Tenis', 'Golf', 'Spa & Masaj', 'Yoga', 'Çocuk Kulübü', 'Aquapark', 'Plaj Aktiviteleri', 'Bisiklet', 'Safari', 'Rafting', 'Parasailing', 'Fark Etmez'], grup: 'İçecek & Eğlence' },
      { key: 'ozelIstekler', label: 'Havuz & Plaj Tercihi', tip: 'multiselect', secenekler: ['Kapalı Havuz', 'Açık Havuz', 'Isıtmalı Havuz', 'Özel Havuz', 'Sahile Sıfır', 'Sahile Yakın (500m)', 'Özel Plaj', 'Halka Açık Plaj', 'Fark Etmez'], grup: 'Ek Tercihler' },
      { key: 'ulasim', label: 'Ulaşım Dahil mi?', tip: 'select', secenekler: ['Evet, Uçuş Dahil', 'Evet, Transfer Dahil', 'Evet, Uçuş + Transfer', 'Hayır, Sadece Konaklama'], grup: 'Ek Tercihler' },
      { key: 'butce', label: 'Tahmini Bütçe (Kişi Başı)', tip: 'range', birim: '$', zorunlu: true, grup: 'Bütçe' },
      { key: 'aciklama', label: 'Ek Açıklama & Özel İstekler', tip: 'textarea', placeholder: 'Balayı odası, engelli erişimi, evcil hayvan vb.', grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'otelAdi', label: 'Tesis Adı', tip: 'text', zorunlu: true, grup: 'Tesis Bilgileri' },
      { key: 'yildiz', label: 'Yıldız Sayısı', tip: 'select', secenekler: ['1', '2', '3', '4', '5', 'Butik'], zorunlu: true, grup: 'Tesis Bilgileri' },
      { key: 'ulke', label: 'Ülke', tip: 'text', zorunlu: true, grup: 'Tesis Bilgileri' },
      { key: 'sehir', label: 'Şehir', tip: 'text', zorunlu: true, grup: 'Tesis Bilgileri' },
      { key: 'adres', label: 'Adres', tip: 'adres', zorunlu: true, grup: 'Tesis Bilgileri' },
      { key: 'odaTipleri', label: 'Oda Tipleri', tip: 'multiselect', secenekler: ['Standart', 'Deniz Manzaralı', 'Suit', 'Aile', 'Kral Dairesi', 'Villa', 'Bungalov'], grup: 'Oda & Kapasite' },
      { key: 'maxKapasite', label: 'Toplam Oda Sayısı', tip: 'number', grup: 'Oda & Kapasite' },
      { key: 'paketler', label: 'Sunulan Paketler', tip: 'multiselect', secenekler: ['RO', 'BB', 'HB', 'FB', 'AI', 'Ultra AI'], grup: 'Paket & Hizmet' },
      { key: 'yemekSecenekleri', label: 'Yemek Seçenekleri', tip: 'multiselect', secenekler: ['Et Ağırlıklı', 'Vejetaryen', 'Vegan', 'Helal', 'Glütensiz', 'A la Carte', 'Büfe'], grup: 'Paket & Hizmet' },
      { key: 'icecekSecenekleri', label: 'İçecek Seçenekleri', tip: 'multiselect', secenekler: ['Alkolsüz', 'Bira & Şarap', 'Tam Açık Büfe', 'Premium Alkol'], grup: 'Paket & Hizmet' },
      { key: 'eglencel', label: 'Eğlence & Aktiviteler', tip: 'multiselect', secenekler: ['Animasyon', 'Disko', 'Canlı Müzik', 'Su Sporları', 'Dalış', 'Tenis', 'Golf', 'Spa', 'Aquapark', 'Çocuk Kulübü'], grup: 'Paket & Hizmet' },
      { key: 'havuzSecenekleri', label: 'Havuz & Plaj', tip: 'multiselect', secenekler: ['Kapalı Havuz', 'Açık Havuz', 'Isıtmalı', 'Özel Havuz', 'Özel Plaj', 'Sahile Sıfır'], grup: 'Paket & Hizmet' },
    ],
    butceBirimi: '$',
  },

  // ═══════════════════════════════════════════
  // 2. SEYAHAT & TRANSFER
  // ═══════════════════════════════════════════
  {
    id: 'seyahat',
    ad: 'Seyahat & Transfer',
    icon: '✈️',
    renk: '#7c3aed',
    altKategoriler: [
      { id: 'ucus', ad: 'Uçuş Bileti', icon: '✈️' },
      { id: 'otobus', ad: 'Otobüs Bileti', icon: '🚌' },
      { id: 'tren', ad: 'Tren Bileti', icon: '🚆' },
      { id: 'feribot', ad: 'Feribot', icon: '⛴️' },
      { id: 'transfer', ad: 'VIP Transfer', icon: '🚐' },
      { id: 'rent_car', ad: 'Araç Kiralama', icon: '🚗' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Seyahat Tipi', tip: 'select', secenekler: ['Uçuş Bileti', 'Otobüs Bileti', 'Tren', 'Feribot', 'VIP Transfer', 'Araç Kiralama'], zorunlu: true, grup: 'Temel' },
      { key: 'nereden', label: 'Nereden', tip: 'text', placeholder: 'İstanbul, Havalimanı adı...', zorunlu: true, grup: 'Güzergah' },
      { key: 'nereye', label: 'Nereye', tip: 'text', placeholder: 'Antalya, Havalimanı adı...', zorunlu: true, grup: 'Güzergah' },
      { key: 'tarih', label: 'Gidiş Tarihi', tip: 'date', zorunlu: true, grup: 'Güzergah' },
      { key: 'donus', label: 'Dönüş Tarihi', tip: 'date', grup: 'Güzergah' },
      { key: 'yolcuSayisi', label: 'Yolcu Sayısı', tip: 'number', birim: 'kişi', zorunlu: true, grup: 'Yolcular' },
      { key: 'sinif', label: 'Sınıf', tip: 'select', secenekler: ['Ekonomi', 'Business', 'First Class', 'Fark Etmez'], grup: 'Yolcular' },
      { key: 'bagaj', label: 'Bagaj', tip: 'select', secenekler: ['Sadece El Bagajı', '15 kg', '20 kg', '23 kg', '30 kg+'], grup: 'Yolcular' },
      { key: 'butce', label: 'Tahmini Bütçe', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
      { key: 'aciklama', label: 'Açıklama', tip: 'textarea', grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'sirketAdi', label: 'Şirket / Acenta Adı', tip: 'text', zorunlu: true, grup: 'Firma' },
      { key: 'hizmetTipi', label: 'Hizmet Tipleri', tip: 'multiselect', secenekler: ['Uçuş', 'Otobüs', 'Tren', 'Feribot', 'Transfer', 'Araç Kiralama'], grup: 'Firma' },
      { key: 'operasyonBolgeleri', label: 'Operasyon Bölgeleri', tip: 'textarea', placeholder: 'Hizmet verdiğiniz rotalar', grup: 'Firma' },
    ],
    butceBirimi: '₺',
  },

  // ═══════════════════════════════════════════
  // 3. KİRALAMA
  // ═══════════════════════════════════════════
  {
    id: 'kiralama',
    ad: 'Kiralama',
    icon: '🔑',
    renk: '#059669',
    altKategoriler: [
      { id: 'arac_kira', ad: 'Araç Kiralama', icon: '🚗' },
      { id: 'yat', ad: 'Yat / Tekne', icon: '⛵' },
      { id: 'is_makinesi', ad: 'İş Makinesi', icon: '🚜' },
      { id: 'ev_esyasi', ad: 'Ev Eşyası', icon: '🛋️' },
      { id: 'elektronik', ad: 'Elektronik', icon: '📱' },
      { id: 'giyim', ad: 'Kıyafet / Kostüm', icon: '👗' },
      { id: 'etkinlik', ad: 'Etkinlik Ekipmanı', icon: '🎪' },
      { id: 'tasimacilik', ad: 'Nakliye / Kamyon', icon: '🚛' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Kiralama Kategorisi', tip: 'select', secenekler: ['Araç', 'Yat / Tekne', 'İş Makinesi', 'Ev Eşyası', 'Elektronik', 'Kıyafet / Kostüm', 'Etkinlik Ekipmanı', 'Nakliye'], zorunlu: true, grup: 'Temel' },
      { key: 'urunAdi', label: 'Ürün / Araç Adı', tip: 'text', placeholder: 'Örn: 5+1 Yat, Caterpillar Ekskavatör', zorunlu: true, grup: 'Ürün' },
      { key: 'adet', label: 'Adet', tip: 'number', birim: 'adet', grup: 'Ürün' },
      { key: 'baslangicTarihi', label: 'Başlangıç', tip: 'date', zorunlu: true, grup: 'Süre' },
      { key: 'bitisTarihi', label: 'Bitiş', tip: 'date', zorunlu: true, grup: 'Süre' },
      { key: 'sehir', label: 'Şehir', tip: 'text', zorunlu: true, grup: 'Konum' },
      { key: 'teslimatSekli', label: 'Teslimat', tip: 'select', secenekler: ['Yerinde Teslim', 'Adresime Teslim', 'Fark Etmez'], grup: 'Konum' },
      { key: 'butce', label: 'Tahmini Bütçe', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
      { key: 'aciklama', label: 'Açıklama', tip: 'textarea', grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'firmaAdi', label: 'Firma / Şahıs Adı', tip: 'text', zorunlu: true, grup: 'Firma' },
      { key: 'kategoriler', label: 'Kiralama Kategorileri', tip: 'multiselect', secenekler: ['Araç', 'Yat', 'İş Makinesi', 'Ev Eşyası', 'Elektronik', 'Kıyafet', 'Etkinlik', 'Nakliye'], grup: 'Firma' },
      { key: 'sehirler', label: 'Hizmet Şehirleri', tip: 'text', grup: 'Firma' },
    ],
    butceBirimi: '₺',
  },

  // ═══════════════════════════════════════════
  // 4. TAMİR & BAKIM
  // ═══════════════════════════════════════════
  {
    id: 'tamir',
    ad: 'Tamir & Bakım',
    icon: '🔧',
    renk: '#d97706',
    altKategoriler: [
      { id: 'beyaz_esya', ad: 'Beyaz Eşya', icon: '🫙' },
      { id: 'elektronik_tamir', ad: 'Elektronik', icon: '📱' },
      { id: 'arac_tamir', ad: 'Araç Tamiri', icon: '🚗' },
      { id: 'mobilya_tamir', ad: 'Mobilya', icon: '🪑' },
      { id: 'bina_tamir', ad: 'Bina / İnşaat', icon: '🏗️' },
      { id: 'kombi_klima', ad: 'Kombi / Klima', icon: '❄️' },
      { id: 'boru_tesisat', ad: 'Tesisat / Su', icon: '🪠' },
      { id: 'elektrik', ad: 'Elektrik', icon: '⚡' },
    ],
    hizmetAlanFormu: [
      { key: 'altKategori', label: 'Tamir Kategorisi', tip: 'select', secenekler: ['Beyaz Eşya', 'Elektronik', 'Araç', 'Mobilya', 'Bina / İnşaat', 'Kombi / Klima', 'Tesisat', 'Elektrik', 'Diğer'], zorunlu: true, grup: 'Arıza' },
      { key: 'urunAdi', label: 'Ürün / Cihaz Adı', tip: 'text', placeholder: 'Örn: Bosch Çamaşır Makinesi, Samsung TV', zorunlu: true, grup: 'Arıza' },
      { key: 'marka', label: 'Marka', tip: 'text', grup: 'Arıza' },
      { key: 'model', label: 'Model', tip: 'text', grup: 'Arıza' },
      { key: 'arizaAciklama', label: 'Arıza Açıklaması', tip: 'textarea', placeholder: 'Cihaz ne yapıyor/yapmıyor?', zorunlu: true, grup: 'Arıza' },
      { key: 'aciliyet', label: 'Aciliyet', tip: 'select', secenekler: ['Bugün / Yarın', '2-3 Gün İçinde', 'Bu Hafta', 'Bu Ay', 'Acil Değil'], grup: 'Zamanlama' },
      { key: 'sehir', label: 'Şehir', tip: 'text', zorunlu: true, grup: 'Konum' },
      { key: 'ilce', label: 'İlçe', tip: 'text', grup: 'Konum' },
      { key: 'butce', label: 'Tahmini Bütçe', tip: 'range', birim: '₺', zorunlu: true, grup: 'Bütçe' },
    ],
    hizmetVerenFormu: [
      { key: 'adSoyad', label: 'Ad Soyad / Firma', tip: 'text', zorunlu: true, grup: 'Usta' },
      { key: 'uzmanlik', label: 'Uzmanlık Alanları', tip: 'multiselect', secenekler: ['Beyaz Eşya', 'Elektronik', 'Araç', 'Mobilya', 'Bina', 'Kombi / Klima', 'Tesisat', 'Elektrik'], grup: 'Usta' },
      { key: 'sehirler', label: 'Hizmet Şehirleri', tip: 'text', grup: 'Usta' },
      { key: 'tecrube', label: 'Deneyim Yılı', tip: 'number', birim: 'yıl', grup: 'Usta' },
    ],
    butceBirimi: '₺',
  },

  // ═══════════════════════════════════════════
  // 5. USTA & İŞÇİ
  // ═══════════════════════════════════════════
  {
    id: 'usta',
    ad: 'Usta & İşçi',
    icon: '👷',
    renk: '#dc2626',
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

  // ═══════════════════════════════════════════
  // 6. TEMİZLİK HİZMETLERİ
  // ═══════════════════════════════════════════
  {
    id: 'temizlik',
    ad: 'Temizlik Hizmetleri',
    icon: '🧹',
    renk: '#0891b2',
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

  // ═══════════════════════════════════════════
  // 7. ÜRETİM & ÖZEL SİPARİŞ
  // ═══════════════════════════════════════════
  {
    id: 'uretim',
    ad: 'Üretim & Özel Sipariş',
    icon: '🏭',
    renk: '#7c3aed',
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

  // ═══════════════════════════════════════════
  // 8. GİYİM & TEKSTİL
  // ═══════════════════════════════════════════
  {
    id: 'giyim',
    ad: 'Giyim & Tekstil',
    icon: '👗',
    renk: '#db2777',
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

  // ═══════════════════════════════════════════
  // 9. MOBİLYA & DEKORASYON
  // ═══════════════════════════════════════════
  {
    id: 'mobilya',
    ad: 'Mobilya & Dekorasyon',
    icon: '🪑',
    renk: '#92400e',
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

  // ═══════════════════════════════════════════
  // 10. SAĞLIK & GÜZELLİK
  // ═══════════════════════════════════════════
  {
    id: 'saglik',
    ad: 'Sağlık & Güzellik',
    icon: '💊',
    renk: '#16a34a',
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

  // ═══════════════════════════════════════════
  // 11. EĞİTİM & DANIŞMANLIK
  // ═══════════════════════════════════════════
  {
    id: 'egitim',
    ad: 'Eğitim & Danışmanlık',
    icon: '📚',
    renk: '#2563eb',
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

  // ═══════════════════════════════════════════
  // 12. ETKİNLİK & DÜĞÜN
  // ═══════════════════════════════════════════
  {
    id: 'etkinlik',
    ad: 'Etkinlik & Düğün',
    icon: '🎉',
    renk: '#9333ea',
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

export const SEKTOR_MAP = Object.fromEntries(SEKTORLER.map(s => [s.id, s]));

export const BUTCE_ARALIKLARI = {
  '₺': [[0, 1000], [1000, 5000], [5000, 10000], [10000, 25000], [25000, 50000], [50000, 100000], [100000, 500000]],
  '$': [[0, 500], [500, 1000], [1000, 2000], [2000, 5000], [5000, 10000], [10000, 25000]],
};
