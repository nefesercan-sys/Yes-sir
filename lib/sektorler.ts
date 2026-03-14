// lib/sektorler.ts

export const TUM_SEKTORLER = [
  // GAYRİMENKUL & ARAÇ
  { id: 'emlak-satis', ad: 'Emlak Alım Satım', emoji: '🏢', tip: 'both' },
  { id: 'emlak-kiralama', ad: 'Emlak Kiralama', emoji: '🏠', tip: 'both' },
  { id: 'oto-satis', ad: 'Oto Alım Satım', emoji: '🚙', tip: 'both' },
  { id: 'oto-kiralama', ad: 'Oto Kiralama', emoji: '🚗', tip: 'both' },
  { id: 'makine-kiralama', ad: 'Makine Kiralama', emoji: '🚜', tip: 'ticari' },

  // TEKNOLOJİ & YAZILIM
  { id: 'yazilim', ad: 'Yazılım & Bilişim', emoji: '💻', tip: 'both' },
  { id: 'elektronik', ad: 'Elektronik & Teknoloji', emoji: '📱', tip: 'both' },
  { id: 'beyaz-esya', ad: 'Beyaz Eşya', emoji: '🧊', tip: 'both' },

  // TURİZM & SEYAHAT
  { id: 'turizm', ad: 'Turizm & Konaklama', emoji: '🏨', tip: 'both' },
  { id: 'bilet', ad: 'Bilet & Rezervasyon', emoji: '🎫', tip: 'both' },
  { id: 'seyahat', ad: 'Seyahat & Transfer', emoji: '✈️', tip: 'both' },

  // ENDÜSTRİYEL & ÜRETİM
  { id: 'uretim', ad: 'Üretim & Fason', emoji: '🏭', tip: 'ticari' },
  { id: 'tekstil', ad: 'Tekstil & Hazır Giyim', emoji: '👕', tip: 'ticari' },
  { id: 'mermer-tas', ad: 'Mermer & Doğal Taş', emoji: '🪨', tip: 'ticari' },
  { id: 'metal-celik', ad: 'Metal & Çelik', emoji: '⚙️', tip: 'ticari' },
  { id: 'plastik-pvc', ad: 'Plastik & PVC', emoji: '🧴', tip: 'ticari' },
  { id: 'gida-tarim', ad: 'Gıda & Tarım', emoji: '🌾', tip: 'both' },
  { id: 'insaat-malz', ad: 'İnşaat Malzemeleri', emoji: '🏗️', tip: 'ticari' },
  { id: 'elektrik', ad: 'Elektrik & Enerji', emoji: '⚡', tip: 'ticari' },
  { id: 'lojistik', ad: 'Lojistik & Gümrük', emoji: '🚢', tip: 'ticari' },

  // HİZMET & DİĞER
  { id: 'usta', ad: 'Usta & İşçi', emoji: '👷', tip: 'bireysel' },
  { id: 'temizlik', ad: 'Temizlik Hizmetleri', emoji: '🧹', tip: 'bireysel' },
  { id: 'egitim', ad: 'Eğitim & Danışmanlık', emoji: '📚', tip: 'both' },
  { id: 'saglik', ad: 'Sağlık & Güzellik', emoji: '💊', tip: 'both' },
  { id: 'mobilya', ad: 'Mobilya & Dekorasyon', emoji: '🪑', tip: 'both' },
];

// Ana sayfada kategorileri gösterirken tip fark etmeksizin eski yapıyı desteklemek için:
export const SEKTORLER = TUM_SEKTORLER.map(s => ({
  id: s.id,
  ad: s.ad,
  emoji: s.emoji
}));
