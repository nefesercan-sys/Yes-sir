// ============================================================
// SwapHubs — Merkezi Sektör Haritası (lib/sektorler.ts)
// ============================================================

export const TUM_SEKTORLER = [
  // GAYRİMENKUL & ARAÇ
  { id: 'emlak-satis', ad: 'Emlak Alım Satım', emoji: '🏢', tip: 'both', renk: '#3b82f6' },
  { id: 'emlak-kiralama', ad: 'Emlak Kiralama', emoji: '🏠', tip: 'both', renk: '#3b82f6' },
  { id: 'oto-satis', ad: 'Oto Alım Satım', emoji: '🚙', tip: 'both', renk: '#10b981' },
  { id: 'oto-kiralama', ad: 'Oto Kiralama', emoji: '🚗', tip: 'both', renk: '#10b981' },
  { id: 'makine-kiralama', ad: 'Makine Kiralama', emoji: '🚜', tip: 'ticari', renk: '#f59e0b' },

  // TEKNOLOJİ & YAZILIM
  { id: 'yazilim', ad: 'Yazılım & Bilişim', emoji: '💻', tip: 'both', renk: '#6366f1' },
  { id: 'elektronik', ad: 'Elektronik & Teknoloji', emoji: '📱', tip: 'both', renk: '#8b5cf6' },
  { id: 'beyaz-esya', ad: 'Beyaz Eşya', emoji: '🧊', tip: 'both', renk: '#06b6d4' },

  // TURİZM & SEYAHAT
  { id: 'turizm', ad: 'Turizm & Konaklama', emoji: '🏨', tip: 'both', renk: '#ec4899' },
  { id: 'bilet', ad: 'Bilet & Rezervasyon', emoji: '🎫', tip: 'both', renk: '#f43f5e' },
  { id: 'seyahat', ad: 'Seyahat & Transfer', emoji: '✈️', tip: 'both', renk: '#f43f5e' },

  // ENDÜSTRİYEL & ÜRETİM
  { id: 'uretim', ad: 'Üretim & Fason', emoji: '🏭', tip: 'ticari', renk: '#64748b' },
  { id: 'tekstil', ad: 'Tekstil & Hazır Giyim', emoji: '👕', tip: 'ticari', renk: '#8b5cf6' },
  { id: 'mermer-tas', ad: 'Mermer & Doğal Taş', emoji: '🪨', tip: 'ticari', renk: '#64748b' },
  { id: 'metal-celik', ad: 'Metal & Çelik', emoji: '⚙️', tip: 'ticari', renk: '#475569' },
  { id: 'plastik-pvc', ad: 'Plastik & PVC', emoji: '🧴', tip: 'ticari', renk: '#06b6d4' },
  { id: 'gida-tarim', ad: 'Gıda & Tarım', emoji: '🌾', tip: 'both', renk: '#84cc16' },
  { id: 'insaat-malz', ad: 'İnşaat Malzemeleri', emoji: '🏗️', tip: 'ticari', renk: '#f59e0b' },
  { id: 'elektrik', ad: 'Elektrik & Enerji', emoji: '⚡', tip: 'ticari', renk: '#eab308' },
  { id: 'lojistik', ad: 'Lojistik & Gümrük', emoji: '🚢', tip: 'ticari', renk: '#3b82f6' },

  // HİZMET & DİĞER
  { id: 'usta', ad: 'Usta & İşçi', emoji: '👷', tip: 'bireysel', renk: '#f59e0b' },
  { id: 'temizlik', ad: 'Temizlik Hizmetleri', emoji: '🧹', tip: 'bireysel', renk: '#06b6d4' },
  { id: 'egitim', ad: 'Eğitim & Danışmanlık', emoji: '📚', tip: 'both', renk: '#10b981' },
  { id: 'saglik', ad: 'Sağlık & Güzellik', emoji: '💊', tip: 'both', renk: '#ef4444' },
  { id: 'mobilya', ad: 'Mobilya & Dekorasyon', emoji: '🪑', tip: 'both', renk: '#8b5cf6' },
];

// ============================================================
// GERİYE DÖNÜK UYUMLULUK KÖPRÜLERİ (Site Çökmesin Diye)
// ============================================================

// 1. Eski sayfaların aradığı genel liste
export const SEKTORLER = TUM_SEKTORLER.map(s => ({
  id: s.id,
  ad: s.ad,
  emoji: s.emoji,
  renk: s.renk // AnaSayfaClient renk arıyor, ekledik.
}));

// 2. Eski sayfaların aradığı Ana Kategoriler
export const KATEGORILER_ANA = [
  { id: 'tum', ad: 'Tüm Sektörler', emoji: '🌐', renk: '#0f172a' },
  ...SEKTORLER
];

// 3. İlan Ver sayfasının aradığı Bireysel liste
export const BIREYSEL_SEKTORLER = TUM_SEKTORLER
  .filter(s => s.tip === 'bireysel' || s.tip === 'both')
  .map(s => ({ id: s.id, ad: s.ad, emoji: s.emoji }));

// 4. İlan Ver sayfasının aradığı Ticari liste
export const TICARI_SEKTORLER = TUM_SEKTORLER
  .filter(s => s.tip === 'ticari' || s.tip === 'both')
  .map(s => ({ id: s.id, ad: s.ad, emoji: s.emoji }));
