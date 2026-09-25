// ============================================================
// SwapHubs — lib/turkiye-lokasyonlar.ts
// Terzi Can - Sadece Antalya ve çevresi fiziksel hizmet bölgeleri
// ============================================================

export type Lokasyon = { slug: string; ad: string; lat: number; lng: number };
export type Mahalle = Lokasyon & { blurb: string };

// Konyaaltı'nın 10 mahallesi
export const KONYAALTI_MAHALLELERI: Mahalle[] = [
  { slug: 'hurma', ad: 'Hurma', lat: 36.8481, lng: 30.6206, blurb: 'Sahil şeridine yakın site ve villalara aynı gün kuryeli alım.' },
  { slug: 'liman', ad: 'Liman', lat: 36.8656, lng: 30.6350, blurb: 'Liman mahallesindeki iş yerlerine ve konutlara hızlı teslimat.' },
  { slug: 'uncalı', ad: 'Uncalı', lat: 36.8944, lng: 30.6486, blurb: 'Uncalı\'daki yoğun apartman bölgelerinde randevulu kurye servisi.' },
  { slug: 'sarısu', ad: 'Sarısu', lat: 36.8386, lng: 30.6142, blurb: 'Sarısu sahil hattındaki site ve rezidanslara aynı gün kurye.' },
  { slug: 'gürsu', ad: 'Gürsu', lat: 36.8797, lng: 30.6394, blurb: 'Gürsu mahallesindeki konut ve iş yerlerine randevulu adresten alım.' },
  { slug: 'çakırlar', ad: 'Çakırlar', lat: 36.9308, lng: 30.6469, blurb: 'Çakırlar bölgesine araçlı terzi servisi ve hızlı teslimat.' },
  { slug: 'meltem', ad: 'Meltem', lat: 36.8975, lng: 30.6706, blurb: 'Meltem mahallesine aynı gün veya 24 saat içinde teslimat garantisi.' },
  { slug: 'şirinyalı', ad: 'Şirinyalı', lat: 36.8747, lng: 30.6997, blurb: 'Otel yoğun bölgede VIP acil ütü ve tadilat hizmeti önceliklidir.' },
  { slug: 'fener', ad: 'Fener', lat: 36.8697, lng: 30.6875, blurb: 'Fener sahil bölgesine özel akşam saatlerinde teslimat imkanı.' },
  { slug: 'güzeloba', ad: 'Güzeloba', lat: 36.8558, lng: 30.7889, blurb: 'Lara-Güzeloba hattındaki otellere ekspres kurye desteği.' },
];

// Antalya'nın 19 ilçesi
export const ANTALYA_ILCELERI: Lokasyon[] = [
  { slug: 'konyaalti', ad: 'Konyaaltı', lat: 36.8608, lng: 30.6339 },
  { slug: 'muratpasa', ad: 'Muratpaşa', lat: 36.8850, lng: 30.7061 },
  { slug: 'kepez', ad: 'Kepez', lat: 36.9214, lng: 30.7169 },
  { slug: 'lara', ad: 'Lara', lat: 36.8558, lng: 30.7889 },
  { slug: 'dosemealti', ad: 'Döşemealtı', lat: 37.0000, lng: 30.5667 },
  { slug: 'aksu', ad: 'Aksu', lat: 36.9139, lng: 30.8306 },
  { slug: 'kemer', ad: 'Kemer', lat: 36.6019, lng: 30.5597 },
  { slug: 'belek', ad: 'Belek', lat: 36.8625, lng: 31.0561 },
  { slug: 'serik', ad: 'Serik', lat: 36.9161, lng: 31.1006 },
  { slug: 'manavgat', ad: 'Manavgat', lat: 36.7867, lng: 31.4425 },
  { slug: 'side', ad: 'Side', lat: 36.7673, lng: 31.3893 },
  { slug: 'alanya', ad: 'Alanya', lat: 36.5438, lng: 31.9998 },
  { slug: 'gazipasa', ad: 'Gazipaşa', lat: 36.2708, lng: 32.3253 },
  { slug: 'kas', ad: 'Kaş', lat: 36.2019, lng: 29.6408 },
  { slug: 'kalkan', ad: 'Kalkan', lat: 36.2664, lng: 29.4181 },
  { slug: 'finike', ad: 'Finike', lat: 36.2989, lng: 30.1503 },
  { slug: 'kumluca', ad: 'Kumluca', lat: 36.3697, lng: 30.2867 },
  { slug: 'elmali', ad: 'Elmalı', lat: 36.7381, lng: 29.9142 },
  { slug: 'korkuteli', ad: 'Korkuteli', lat: 37.0639, lng: 30.1953 },
];
