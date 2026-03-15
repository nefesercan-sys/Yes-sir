// ============================================================
// SwapHubs — Merkezi Sektör Haritası (lib/sektorler.ts)
// ============================================================

// 1. TİP TANIMLAMALARI (İlan Ver sayfasının aradığı tipler)
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

// 2. HAM VERİLER (AI VE ANA SAYFA TAM UYUMU İÇİN HEPSİ 'both' YAPILDI)
const HAM_SEKTORLER = [
  // GAYRİMENKUL & ARAÇ
  { id: 'emlak-satis', ad: 'Emlak Alım Satım', emoji: '🏢', tip: 'both', renk: '#3b82f6' },
  { id: 'emlak-kiralama', ad: 'Emlak Kiralama', emoji: '🏠', tip: 'both', renk: '#3b82f6' },
  { id: 'oto-satis', ad: 'Oto Alım Satım', emoji: '🚙', tip: 'both', renk: '#10b981' },
  { id: 'oto-kiralama', ad: 'Oto Kiralama', emoji: '🚗', tip: 'both', renk: '#10b981' },
  { id: 'makine-kiralama', ad: 'Makine Kiralama', emoji: '🚜', tip: 'both', renk: '#f59e0b' },

  // TEKNOLOJİ & YAZILIM
  { id: 'yazilim', ad: 'Yazılım & Bilişim', emoji: '💻', tip: 'both', renk: '#6366f1' },
  { id: 'elektronik', ad: 'Elektronik & Teknoloji', emoji: '📱', tip: 'both', renk: '#8b5cf6' },
  { id: 'beyaz-esya', ad: 'Beyaz Eşya', emoji: '🧊', tip: 'both', renk: '#06b6d4' },

  // TURİZM & SEYAHAT
  { id: 'turizm', ad: 'Turizm & Konaklama', emoji: '🏨', tip: 'both', renk: '#ec4899' },
  { id: 'bilet', ad: 'Bilet & Rezervasyon', emoji: '🎫', tip: 'both', renk: '#f43f5e' },
  { id: 'seyahat', ad: 'Seyahat & Transfer', emoji: '✈️', tip: 'both', renk: '#f43f5e' },

  // ENDÜSTRİYEL & ÜRETİM
  { id: 'uretim', ad: 'Üretim & Fason', emoji: '🏭', tip: 'both', renk: '#64748b' },
  { id: 'tekstil', ad: 'Tekstil & Hazır Giyim', emoji: '👕', tip: 'both', renk: '#8b5cf6' },
  { id: 'mermer-tas', ad: 'Mermer & Doğal Taş', emoji: '🪨', tip: 'both', renk: '#64748b' },
  { id: 'metal-celik', ad: 'Metal & Çelik', emoji: '⚙️', tip: 'both', renk: '#475569' },
  { id: 'plastik-pvc', ad: 'Plastik & PVC', emoji: '🧴', tip: 'both', renk: '#06b6d4' },
  { id: 'gida-tarim', ad: 'Gıda & Tarım', emoji: '🌾', tip: 'both', renk: '#84cc16' },
  { id: 'insaat-malz', ad: 'İnşaat Malzemeleri', emoji: '🏗️', tip: 'both', renk: '#f59e0b' },
  { id: 'elektrik', ad: 'Elektrik & Enerji', emoji: '⚡', tip: 'both', renk: '#eab308' },
  { id: 'lojistik', ad: 'Lojistik & Gümrük', emoji: '🚢', tip: 'both', renk: '#3b82f6' },
  { id: 'kimya-boya', ad: 'Kimya & Boya', emoji: '🧪', tip: 'both', renk: '#ec4899' },
  { id: 'saglik-med', ad: 'Sağlık & Medikal', emoji: '🏥', tip: 'both', renk: '#ef4444' },

  // HİZMET & DİĞER
  { id: 'usta', ad: 'Usta & İşçi', emoji: '👷', tip: 'both', renk: '#f59e0b' },
  { id: 'temizlik', ad: 'Temizlik Hizmetleri', emoji: '🧹', tip: 'both', renk: '#06b6d4' },
  { id: 'egitim', ad: 'Eğitim & Danışmanlık', emoji: '📚', tip: 'both', renk: '#10b981' },
  { id: 'saglik', ad: 'Sağlık & Güzellik', emoji: '💊', tip: 'both', renk: '#ef4444' },
  { id: 'mobilya', ad: 'Mobilya & Dekorasyon', emoji: '🪑', tip: 'both', renk: '#8b5cf6' },
];

// 3. TAM UYUMLU SEKTÖR LİSTESİ (Eksik veriler otomatik tamamlanıyor)
export const TUM_SEKTORLER: Sektor[] = HAM_SEKTORLER.map(s => ({
  ...s,
  tip: s.tip as "bireysel" | "ticari" | "both",
  icon: s.emoji,
  altKategoriler: [],
  butceBirimi: "TL",
  hizmetAlanFormu: [],
  hizmetVerenFormu: []
}));

// ============================================================
// GERİYE DÖNÜK UYUMLULUK KÖPRÜLERİ
// ============================================================

export const SEKTORLER: Sektor[] = TUM_SEKTORLER;

export const KATEGORILER_ANA = [
  { id: 'tum', ad: 'Tüm Sektörler', emoji: '🌐', tip: 'both', renk: '#0f172a', icon: '🌐', altKategoriler: [], butceBirimi: 'TL', hizmetAlanFormu: [], hizmetVerenFormu: [] } as Sektor,
  ...SEKTORLER
];

// Artık her iki liste de TAMAMEN AYNI ve EŞİT dönecek!
export const BIREYSEL_SEKTORLER: Sektor[] = TUM_SEKTORLER.filter(s => s.tip === 'bireysel' || s.tip === 'both');
export const TICARI_SEKTORLER: Sektor[] = TUM_SEKTORLER.filter(s => s.tip === 'ticari' || s.tip === 'both');
