// ============================================================
// SwapHubs — lib/turkiye-lokasyonlar.ts
// Terzi Can - Sadece Antalya ve çevresi fiziksel hizmet bölgeleri
// ============================================================
// ÖNEMLİ: URL slug'ları sadece ASCII (a-z, 0-9, -) olmalı.
// Türkçe karakterli slug ("uncalı", "çakırlar") sitemap'te ham yazılır,
// tarayıcıda %-encoded görünür ve sitemap/link/canonical eşleşmesini bozar.

export type Lokasyon = { slug: string; ad: string; lat?: number; lng?: number };
export type Mahalle = Lokasyon & { blurb: string };

// Konyaaltı ilçesine bağlı mahalleler (sayfa: /terzi/konyaalti/<slug>).
// Meltem, Şirinyalı, Fener ve Güzeloba idari olarak MURATPAŞA'ya bağlıdır → MURATPASA_MAHALLELERI'ne taşındı
// (eski /terzi/konyaalti/<slug> adresleri next.config.mjs'de 301 ile /terzi/muratpasa/<slug>'a yönlenir).
// Blurb'ler yalnızca doğrulanabilir bilgi içerir: süre/kurye vaadi yok (süreler lib/business.ts DURATION).
export const KONYAALTI_MAHALLELERI: Mahalle[] = [
  { slug: 'hurma', ad: 'Hurma', lat: 36.8481, lng: 30.6206, blurb: 'Atölyenin bulunduğu mahalle: kıyafeti getirip yerinde prova edebilir ya da adresten aldırabilirsiniz.' },
  { slug: 'liman', ad: 'Liman', lat: 36.8656, lng: 30.6350, blurb: 'Liman mahallesindeki konut ve iş yerlerinden adresten alım ve adrese teslim.' },
  { slug: 'uncali', ad: 'Uncalı', lat: 36.8944, lng: 30.6486, blurb: 'Uncalı\'daki apartman ve sitelerden randevulu alım; prova gereken işlerde yerinde ölçü.' },
  { slug: 'sarisu', ad: 'Sarısu', lat: 36.8386, lng: 30.6142, blurb: 'Sarısu sahil hattındaki site ve rezidanslardan adresten alım ve teslim.' },
  { slug: 'gursu', ad: 'Gürsu', lat: 36.8797, lng: 30.6394, blurb: 'Gürsu mahallesindeki konut ve iş yerlerinden randevulu adresten alım.' },
  { slug: 'cakirlar', ad: 'Çakırlar', lat: 36.9308, lng: 30.6469, blurb: 'Çakırlar için alım-teslim günü ve saati WhatsApp\'ta birlikte planlanır.' },
];

// Muratpaşa ilçesine bağlı, hizmet verilen mahalleler (sayfa: /terzi/muratpasa/<slug>).
// Güzeloba'nın önceki koordinatı Lara'nın birebir kopyasıydı; yanlış koordinat yerine koordinatsız bırakıldı.
export const MURATPASA_MAHALLELERI: Mahalle[] = [
  { slug: 'meltem', ad: 'Meltem', lat: 36.8975, lng: 30.6706, blurb: 'Meltem mahallesinden randevulu adresten alım ve teslim; Konyaaltı sınırındaki konumu nedeniyle eve servis ücretsizdir.' },
  { slug: 'sirinyali', ad: 'Şirinyalı', lat: 36.8747, lng: 30.6997, blurb: 'Şirinyalı\'daki ev ve otellerden alım; randevu WhatsApp üzerinden alınır.' },
  { slug: 'fener', ad: 'Fener', lat: 36.8697, lng: 30.6875, blurb: 'Fener mahallesindeki konut ve sitelerden alım ve teslim WhatsApp\'ta planlanır.' },
  { slug: 'guzeloba', ad: 'Güzeloba', blurb: 'Güzeloba\'daki otellere ücretsiz servis; evden alımda ücret bölgeye göre netleşir.' },
];

/** Mahalle → bağlı ilçe (URL ve metin için). */
export const MAHALLE_ILCE = { konyaalti: { ad: 'Konyaaltı', loc: "Konyaaltı'nda", list: KONYAALTI_MAHALLELERI }, muratpasa: { ad: 'Muratpaşa', loc: "Muratpaşa'da", list: MURATPASA_MAHALLELERI } } as const;
export type MahalleIlce = keyof typeof MAHALLE_ILCE;

// Antalya'da hizmet verilen bölgelerin ilçe sayfaları (/terzi/antalya/<slug>).
// Manavgat (Side dahil) ve Kemer'e hizmet verilir: Side bu listede; Kemer'in sayfası /terzi/bolge/kemer'dir.
// Eski /terzi/antalya/manavgat ve /terzi/antalya/kemer adresleri next.config.mjs'de bu sayfalara 301 ile yönlenir.
export const ANTALYA_ILCELERI: Lokasyon[] = [
  { slug: 'konyaalti', ad: 'Konyaaltı', lat: 36.8608, lng: 30.6339 },
  { slug: 'muratpasa', ad: 'Muratpaşa', lat: 36.8850, lng: 30.7061 },
  { slug: 'lara', ad: 'Lara', lat: 36.8558, lng: 30.7889 },
  { slug: 'kundu', ad: 'Kundu', lat: 36.8583, lng: 30.8531 },
  { slug: 'aksu', ad: 'Aksu', lat: 36.9139, lng: 30.8306 },
  { slug: 'belek', ad: 'Belek', lat: 36.8625, lng: 31.0561 },
  { slug: 'side', ad: 'Side', lat: 36.7673, lng: 31.3893 },
  { slug: 'beldibi', ad: 'Beldibi', lat: 36.7122, lng: 30.5622 },
  // Koordinatsız: talep sayımı yapılmaz (yanlış koordinat yerine boş bırakıldı)
  { slug: 'manavgat', ad: 'Manavgat' },
  { slug: 'kemer', ad: 'Kemer' },
  { slug: 'kepez', ad: 'Kepez' },
  { slug: 'dosemealti', ad: 'Döşemealtı' },
  { slug: 'serik', ad: 'Serik' },
];
