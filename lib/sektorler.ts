// ============================================================
// SwapHubs — Merkezi Sektör Haritası (lib/sektorler.ts)
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

const HAM_SEKTORLER = [
  // GAYRİMENKUL & ARAÇ
  { id: 'emlak-satis',      ad: 'Emlak Alım Satım',        emoji: '🏢', tip: 'both', renk: '#3b82f6' },
  { id: 'emlak-kiralama',   ad: 'Emlak Kiralama',          emoji: '🏠', tip: 'both', renk: '#3b82f6' },
  { id: 'oto-satis',        ad: 'Oto Alım Satım',          emoji: '🚙', tip: 'both', renk: '#10b981' },
  { id: 'oto-kiralama',     ad: 'Oto Kiralama',            emoji: '🚗', tip: 'both', renk: '#10b981' },
  { id: 'makine-kiralama',  ad: 'Makine Kiralama',         emoji: '🚜', tip: 'both', renk: '#f59e0b' },

  // TEKNOLOJİ & YAZILIM
  { id: 'yazilim',          ad: 'Yazılım & Bilişim',       emoji: '💻', tip: 'both', renk: '#6366f1' },
  { id: 'elektronik',       ad: 'Elektronik & Teknoloji',  emoji: '📱', tip: 'both', renk: '#8b5cf6' },
  { id: 'beyaz-esya',       ad: 'Beyaz Eşya',              emoji: '🧊', tip: 'both', renk: '#06b6d4' },

  // TURİZM & SEYAHAT
  { id: 'turizm',           ad: 'Turizm & Konaklama',      emoji: '🏨', tip: 'both', renk: '#ec4899' },
  { id: 'bilet',            ad: 'Bilet & Rezervasyon',     emoji: '🎫', tip: 'both', renk: '#f43f5e' },
  { id: 'seyahat',          ad: 'Seyahat & Transfer',      emoji: '✈️', tip: 'both', renk: '#f43f5e' },

  // ENDÜSTRİYEL & ÜRETİM
  { id: 'uretim',           ad: 'Üretim & Fason',          emoji: '🏭', tip: 'both', renk: '#64748b' },
  { id: 'tekstil',          ad: 'Tekstil & Hazır Giyim',   emoji: '👕', tip: 'both', renk: '#8b5cf6' },
  { id: 'mermer-tas',       ad: 'Mermer & Doğal Taş',      emoji: '🪨', tip: 'both', renk: '#64748b' },
  { id: 'metal-celik',      ad: 'Metal & Çelik',           emoji: '⚙️', tip: 'both', renk: '#475569' },
  { id: 'plastik-pvc',      ad: 'Plastik & PVC',           emoji: '🧴', tip: 'both', renk: '#06b6d4' },
  { id: 'gida-tarim',       ad: 'Gıda & Tarım',            emoji: '🌾', tip: 'both', renk: '#84cc16' },
  { id: 'insaat-malz',      ad: 'İnşaat Malzemeleri',      emoji: '🏗️', tip: 'both', renk: '#f59e0b' },
  { id: 'elektrik',         ad: 'Elektrik & Enerji',       emoji: '⚡', tip: 'both', renk: '#eab308' },
  { id: 'lojistik',         ad: 'Lojistik & Gümrük',       emoji: '🚢', tip: 'both', renk: '#3b82f6' },
  { id: 'kimya-boya',       ad: 'Kimya & Boya',            emoji: '🧪', tip: 'both', renk: '#ec4899' },
  { id: 'saglik-med',       ad: 'Sağlık & Medikal',        emoji: '🏥', tip: 'both', renk: '#ef4444' },

  // HİZMET
  { id: 'usta',             ad: 'Usta & İşçi',             emoji: '👷', tip: 'both', renk: '#f59e0b' },
  { id: 'temizlik',         ad: 'Temizlik Hizmetleri',     emoji: '🧹', tip: 'both', renk: '#06b6d4' },
  { id: 'egitim',           ad: 'Eğitim & Danışmanlık',    emoji: '📚', tip: 'both', renk: '#10b981' },
  { id: 'saglik',           ad: 'Sağlık & Güzellik',       emoji: '💊', tip: 'both', renk: '#ef4444' },
  { id: 'mobilya',          ad: 'Mobilya & Dekorasyon',    emoji: '🪑', tip: 'both', renk: '#8b5cf6' },

  // YENİ EKLENENLER
  { id: 'hukuk',            ad: 'Hukuk & Avukatlık',       emoji: '⚖️', tip: 'both', renk: '#1e40af' },
  { id: 'muhasebe',         ad: 'Muhasebe & Finans',       emoji: '💰', tip: 'both', renk: '#15803d' },
  { id: 'tasarim',          ad: 'Grafik & Tasarım',        emoji: '🎨', tip: 'both', renk: '#db2777' },
  { id: 'pazarlama',        ad: 'Dijital Pazarlama',       emoji: '📢', tip: 'both', renk: '#7c3aed' },
  { id: 'icerik',           ad: 'İçerik & Metin Yazarlığı',emoji: '✍️', tip: 'both', renk: '#0891b2' },
  { id: 'video',            ad: 'Video & Animasyon',       emoji: '🎬', tip: 'both', renk: '#9333ea' },
  { id: 'muzik',            ad: 'Müzik & Ses',             emoji: '🎵', tip: 'both', renk: '#0284c7' },
  { id: 'fotograf',         ad: 'Fotoğrafçılık',           emoji: '📷', tip: 'both', renk: '#b45309' },
  { id: 'ceviri',           ad: 'Çeviri & Tercümanlık',    emoji: '🌐', tip: 'both', renk: '#0d9488' },
  { id: 'etkinlik',         ad: 'Etkinlik & Organizasyon', emoji: '🎉', tip: 'both', renk: '#be185d' },
  { id: 'nakliye',          ad: 'Nakliye & Taşımacılık',   emoji: '🚚', tip: 'both', renk: '#b45309' },
  { id: 'guvenlik',         ad: 'Güvenlik Hizmetleri',     emoji: '🔒', tip: 'both', renk: '#374151' },
  { id: 'peyzaj',           ad: 'Peyzaj & Bahçe',          emoji: '🌿', tip: 'both', renk: '#16a34a' },
  { id: 'cocuk',            ad: 'Çocuk & Bakıcı',          emoji: '👶', tip: 'both', renk: '#f472b6' },
  { id: 'yasli-bakimi',     ad: 'Yaşlı & Hasta Bakımı',    emoji: '🤝', tip: 'both', renk: '#6366f1' },
  { id: 'pet',              ad: 'Pet & Veteriner',         emoji: '🐾', tip: 'both', renk: '#78350f' },
  { id: 'tamir-bakim',      ad: 'Tamir & Bakım',           emoji: '🔧', tip: 'both', renk: '#dc2626' },
  { id: 'insaat',           ad: 'İnşaat & Tadilat',        emoji: '🏗️', tip: 'both', renk: '#92400e' },
  { id: 'mimarlik',         ad: 'Mimarlık & Mühendislik',  emoji: '📐', tip: 'both', renk: '#1d4ed8' },
  { id: 'moda',             ad: 'Moda & Stil',             emoji: '👗', tip: 'both', renk: '#be185d' },
  { id: 'spor',             ad: 'Spor & Fitness',          emoji: '💪', tip: 'both', renk: '#16a34a' },
  { id: 'oyun',             ad: 'Oyun & Eğlence',          emoji: '🎮', tip: 'both', renk: '#7c3aed' },
  { id: 'el-yapimi',        ad: 'El Yapımı & Hobi',        emoji: '🧶', tip: 'both', renk: '#d97706' },
  { id: 'tarim-hayvan',     ad: 'Tarım & Hayvancılık',     emoji: '🐄', tip: 'both', renk: '#65a30d' },
  { id: 'enerji',           ad: 'Yenilenebilir Enerji',    emoji: '☀️', tip: 'both', renk: '#ca8a04' },
  { id: 'ithalat-ihracat',  ad: 'İthalat & İhracat',      emoji: '🌍', tip: 'both', renk: '#0369a1' },
];

export const TUM_SEKTORLER: Sektor[] = HAM_SEKTORLER.map(s => ({
  ...s,
  tip: s.tip as "bireysel" | "ticari" | "both",
  icon: s.emoji,
  altKategoriler: [],
  butceBirimi: "TL",
  hizmetAlanFormu: [],
  hizmetVerenFormu: [],
}));

export const SEKTORLER: Sektor[] = TUM_SEKTORLER;

export const KATEGORILER_ANA = [
  {
    id: 'tum', ad: 'Tüm Sektörler', emoji: '🌐', tip: 'both',
    renk: '#0f172a', icon: '🌐', altKategoriler: [],
    butceBirimi: 'TL', hizmetAlanFormu: [], hizmetVerenFormu: [],
  } as Sektor,
  ...SEKTORLER,
];

export const BIREYSEL_SEKTORLER = TUM_SEKTORLER.filter(s => s.tip === 'bireysel' || s.tip === 'both');
export const TICARI_SEKTORLER   = TUM_SEKTORLER.filter(s => s.tip === 'ticari'   || s.tip === 'both');

// ============================================================
// MESLEKLER (Sektör bazlı)
// ============================================================
export const MESLEKLER: Record<string, string[]> = {
  'yazilim': [
    'frontend-gelistirici', 'backend-gelistirici', 'fullstack-gelistirici',
    'mobil-gelistirici', 'devops-muhendisi', 'veri-bilimci',
    'yapay-zeka-uzmani', 'siber-guvenlik-uzmani', 'veritabani-yoneticisi',
    'bulut-mimarı', 'blockchain-gelistirici', 'oyun-gelistirici',
  ],
  'tasarim': [
    'grafik-tasarimci', 'ui-ux-tasarimci', 'logo-tasarimci',
    'web-tasarimci', 'marka-tasarimci', 'ambalaj-tasarimci',
    'ilustrator', '3d-tasarimci', 'motion-designer',
  ],
  'pazarlama': [
    'seo-uzmani', 'google-ads-uzmani', 'sosyal-medya-uzmani',
    'icerik-pazarlamaci', 'email-pazarlamaci', 'influencer-pazarlama',
    'affiliate-pazarlama', 'e-ticaret-uzmani', 'crm-uzmani',
  ],
  'icerik': [
    'icerik-yazari', 'copywriter', 'blog-yazari', 'senaryo-yazari',
    'teknik-yazar', 'sosyal-medya-icerik', 'e-kitap-yazari',
    'satis-metni-yazari', 'reklam-metin-yazari',
  ],
  'video': [
    'video-editoru', 'motion-grafik', 'animasyon-uzmani',
    'drone-operatoru', 'youtube-icerik-uretici', 'reels-uzmani',
    '3d-animasyon', 'kurumsal-video', 'reklam-filmi',
  ],
  'egitim': [
    'matematik-ogretmeni', 'ingilizce-ogretmeni', 'turkce-ogretmeni',
    'fen-bilimleri', 'yazilim-egitmeni', 'tasarim-egitmeni',
    'is-kocu', 'kariyer-danismani', 'psikolojik-danisman',
    'cocuk-gelisim-uzmani', 'dil-kursu', 'musiki-ogretmeni',
  ],
  'hukuk': [
    'avukat', 'is-hukuku-uzmani', 'ceza-avukati', 'aile-hukuku',
    'sirket-hukuku', 'fikri-mulkiyet', 'emlak-hukuku',
    'vergi-hukuku', 'noter', 'arabulucu',
  ],
  'muhasebe': [
    'mali-musavir', 'vergi-uzmani', 'muhasebeci', 'denetci',
    'finansal-analist', 'butce-uzmani', 'bordro-uzmani',
    'yatirim-danismani', 'sigorta-danismani',
  ],
  'saglik': [
    'doktor', 'dis-hekimi', 'psikolog', 'fizyoterapist',
    'diyetisyen', 'eczaci', 'hemsire', 'saglik-danismani',
    'guzellik-uzmani', 'estetisyen', 'masoz', 'pilates-egitmeni',
  ],
  'insaat': [
    'mimar', 'insaat-muhendisi', 'elektrik-ustasi', 'tesisat-ustasi',
    'boya-ustasi', 'karo-ustasi', 'parke-ustasi', 'marangoz',
    'demir-ustasi', 'siva-ustasi', 'tadilat-ustasi', 'cati-ustasi',
  ],
  'temizlik': [
    'ev-temizligi', 'ofis-temizligi', 'insaat-sonrasi-temizlik',
    'cam-silme', 'hali-yikama', 'dezenfeksiyon', 'ilaclama',
  ],
  'nakliye': [
    'sehir-ici-nakliye', 'sehirler-arasi-nakliye', 'esya-tasima',
    'kurye', 'ambar', 'konteyner-tasima', 'soguk-zincir',
  ],
  'fotograf': [
    'dugun-fotografcisi', 'urun-fotografcisi', 'mimar-fotografcisi',
    'haber-fotografcisi', 'bebek-fotografcisi', 'drone-fotografcisi',
  ],
  'ceviri': [
    'ingilizce-ceviri', 'almanca-ceviri', 'fransizca-ceviri',
    'arapca-ceviri', 'rusca-ceviri', 'tercuman', 'yeminli-ceviri',
    'lokalizasyon', 'altyazi-ceviri',
  ],
  'emlak-satis': [
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
