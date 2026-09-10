// ============================================================
// SwapHubs — lib/turkiye-lokasyonlar.ts
// Antalya ilçeleri (öncelikli, fiziksel hizmet alanı) ve
// Türkiye'nin diğer illeri (pazaryeri/online teklif odaklı)
// ============================================================

export type Lokasyon = { slug: string; ad: string };

// Antalya'nın 19 ilçesi — Terzi Can'ın fiziksel hizmet verdiği bölge
export const ANTALYA_ILCELERI: Lokasyon[] = [
  { slug: 'konyaalti', ad: 'Konyaaltı' },
  { slug: 'muratpasa', ad: 'Muratpaşa' },
  { slug: 'kepez', ad: 'Kepez' },
  { slug: 'lara', ad: 'Lara' },
  { slug: 'dosemealti', ad: 'Döşemealtı' },
  { slug: 'aksu', ad: 'Aksu' },
  { slug: 'kemer', ad: 'Kemer' },
  { slug: 'belek', ad: 'Belek' },
  { slug: 'serik', ad: 'Serik' },
  { slug: 'manavgat', ad: 'Manavgat' },
  { slug: 'side', ad: 'Side' },
  { slug: 'alanya', ad: 'Alanya' },
  { slug: 'gazipasa', ad: 'Gazipaşa' },
  { slug: 'kas', ad: 'Kaş' },
  { slug: 'kalkan', ad: 'Kalkan' },
  { slug: 'finike', ad: 'Finike' },
  { slug: 'kumluca', ad: 'Kumluca' },
  { slug: 'elmali', ad: 'Elmalı' },
  { slug: 'korkuteli', ad: 'Korkuteli' },
];

// Türkiye'nin diğer 80 ili — SwapHubs Terzi pazaryeri (online teklif sistemi) ulusal olarak çalıştığı için
export const TURKIYE_ILLERI: Lokasyon[] = [
  { slug: 'adana', ad: 'Adana' }, { slug: 'adiyaman', ad: 'Adıyaman' }, { slug: 'afyonkarahisar', ad: 'Afyonkarahisar' },
  { slug: 'agri', ad: 'Ağrı' }, { slug: 'amasya', ad: 'Amasya' }, { slug: 'ankara', ad: 'Ankara' },
  { slug: 'artvin', ad: 'Artvin' }, { slug: 'aydin', ad: 'Aydın' }, { slug: 'balikesir', ad: 'Balıkesir' },
  { slug: 'bilecik', ad: 'Bilecik' }, { slug: 'bingol', ad: 'Bingöl' }, { slug: 'bitlis', ad: 'Bitlis' },
  { slug: 'bolu', ad: 'Bolu' }, { slug: 'burdur', ad: 'Burdur' }, { slug: 'bursa', ad: 'Bursa' },
  { slug: 'canakkale', ad: 'Çanakkale' }, { slug: 'cankiri', ad: 'Çankırı' }, { slug: 'corum', ad: 'Çorum' },
  { slug: 'denizli', ad: 'Denizli' }, { slug: 'diyarbakir', ad: 'Diyarbakır' }, { slug: 'edirne', ad: 'Edirne' },
  { slug: 'elazig', ad: 'Elazığ' }, { slug: 'erzincan', ad: 'Erzincan' }, { slug: 'erzurum', ad: 'Erzurum' },
  { slug: 'eskisehir', ad: 'Eskişehir' }, { slug: 'gaziantep', ad: 'Gaziantep' }, { slug: 'giresun', ad: 'Giresun' },
  { slug: 'gumushane', ad: 'Gümüşhane' }, { slug: 'hakkari', ad: 'Hakkari' }, { slug: 'hatay', ad: 'Hatay' },
  { slug: 'isparta', ad: 'Isparta' }, { slug: 'mersin', ad: 'Mersin' }, { slug: 'istanbul', ad: 'İstanbul' },
  { slug: 'izmir', ad: 'İzmir' }, { slug: 'kars', ad: 'Kars' }, { slug: 'kastamonu', ad: 'Kastamonu' },
  { slug: 'kayseri', ad: 'Kayseri' }, { slug: 'kirklareli', ad: 'Kırklareli' }, { slug: 'kirsehir', ad: 'Kırşehir' },
  { slug: 'kocaeli', ad: 'Kocaeli' }, { slug: 'konya', ad: 'Konya' }, { slug: 'kutahya', ad: 'Kütahya' },
  { slug: 'malatya', ad: 'Malatya' }, { slug: 'manisa', ad: 'Manisa' }, { slug: 'kahramanmaras', ad: 'Kahramanmaraş' },
  { slug: 'mardin', ad: 'Mardin' }, { slug: 'mugla', ad: 'Muğla' }, { slug: 'mus', ad: 'Muş' },
  { slug: 'nevsehir', ad: 'Nevşehir' }, { slug: 'nigde', ad: 'Niğde' }, { slug: 'ordu', ad: 'Ordu' },
  { slug: 'rize', ad: 'Rize' }, { slug: 'sakarya', ad: 'Sakarya' }, { slug: 'samsun', ad: 'Samsun' },
  { slug: 'siirt', ad: 'Siirt' }, { slug: 'sinop', ad: 'Sinop' }, { slug: 'sivas', ad: 'Sivas' },
  { slug: 'tekirdag', ad: 'Tekirdağ' }, { slug: 'tokat', ad: 'Tokat' }, { slug: 'trabzon', ad: 'Trabzon' },
  { slug: 'tunceli', ad: 'Tunceli' }, { slug: 'sanliurfa', ad: 'Şanlıurfa' }, { slug: 'usak', ad: 'Uşak' },
  { slug: 'van', ad: 'Van' }, { slug: 'yozgat', ad: 'Yozgat' }, { slug: 'zonguldak', ad: 'Zonguldak' },
  { slug: 'aksaray', ad: 'Aksaray' }, { slug: 'bayburt', ad: 'Bayburt' }, { slug: 'karaman', ad: 'Karaman' },
  { slug: 'kirikkale', ad: 'Kırıkkale' }, { slug: 'batman', ad: 'Batman' }, { slug: 'sirnak', ad: 'Şırnak' },
  { slug: 'bartin', ad: 'Bartın' }, { slug: 'ardahan', ad: 'Ardahan' }, { slug: 'igdir', ad: 'Iğdır' },
  { slug: 'yalova', ad: 'Yalova' }, { slug: 'karabuk', ad: 'Karabük' }, { slug: 'kilis', ad: 'Kilis' },
  { slug: 'osmaniye', ad: 'Osmaniye' }, { slug: 'duzce', ad: 'Düzce' },
];
