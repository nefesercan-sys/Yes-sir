// ============================================================
// SwapHubs — lib/turkiye-lokasyonlar.ts
// Terzi Can - Sadece Antalya ve çevresi fiziksel hizmet bölgeleri
// ============================================================
// ÖNEMLİ: URL slug'ları sadece ASCII (a-z, 0-9, -) olmalı.
// Türkçe karakterli slug ("uncalı", "çakırlar") sitemap'te ham yazılır,
// tarayıcıda %-encoded görünür ve sitemap/link/canonical eşleşmesini bozar.

export type Lokasyon = { slug: string; ad: string; lat: number; lng: number };
export type Mahalle = Lokasyon & { blurb: string };

// Konyaaltı mahalleleri
// TODO (doğrula): Fener, Şirinyalı, Güzeloba ve Meltem idari olarak Muratpaşa
// mahalleleridir. Konyaaltı sayfasında "Konyaaltı mahallesi" diye sunulmaları
// yerel SEO'da yanlış bilgi sayılır. İstersen bunları /terzi/antalya/muratpasa
// altına taşıyalım.
export const KONYAALTI_MAHALLELERI: Mahalle[] = [
  { slug: 'hurma', ad: 'Hurma', lat: 36.8481, lng: 30.6206, blurb: 'Sahil şeridine yakın site ve villalara aynı gün kuryeli alım.' },
  { slug: 'liman', ad: 'Liman', lat: 36.8656, lng: 30.6350, blurb: 'Liman mahallesindeki iş yerlerine ve konutlara hızlı teslimat.' },
  { slug: 'uncali', ad: 'Uncalı', lat: 36.8944, lng: 30.6486, blurb: 'Uncalı\'daki yoğun apartman bölgelerinde randevulu kurye servisi.' },
  { slug: 'sarisu', ad: 'Sarısu', lat: 36.8386, lng: 30.6142, blurb: 'Sarısu sahil hattındaki site ve rezidanslara aynı gün kurye.' },
  { slug: 'gursu', ad: 'Gürsu', lat: 36.8797, lng: 30.6394, blurb: 'Gürsu mahallesindeki konut ve iş yerlerine randevulu adresten alım.' },
  { slug: 'cakirlar', ad: 'Çakırlar', lat: 36.9308, lng: 30.6469, blurb: 'Çakırlar bölgesine araçlı terzi servisi ve hızlı teslimat.' },
  { slug: 'meltem', ad: 'Meltem', lat: 36.8975, lng: 30.6706, blurb: 'Meltem mahallesine randevulu adresten alım ve teslimat; süre işleme göre değişir.' },
  { slug: 'sirinyali', ad: 'Şirinyalı', lat: 36.8747, lng: 30.6997, blurb: 'Otel yoğun bölgede acil ütü ve tadilat talepleri için WhatsApp üzerinden randevu alınır.' },
  { slug: 'fener', ad: 'Fener', lat: 36.8697, lng: 30.6875, blurb: 'Fener sahil bölgesine özel akşam saatlerinde teslimat imkanı.' },
  { slug: 'guzeloba', ad: 'Güzeloba', lat: 36.8558, lng: 30.7889, blurb: 'Lara-Güzeloba hattındaki otellere ekspres kurye desteği.' },
];

// Antalya'da GERÇEKTEN hizmet verilen bölgeler (ilçe sayfası yalnızca bunlar için vardır).
// Hizmet verilmeyen ilçeler (Elmalı, Korkuteli, Kaş, Kalkan, Finike, Kumluca, Alanya, Gazipaşa, Manavgat, Serik,
// Kemer, Kepez, Döşemealtı) kasıtlı olarak ÇIKARILDI: sayfaları 404 döner, sitemap ve iç linklerde yer almaz.
export const ANTALYA_ILCELERI: Lokasyon[] = [
  { slug: 'konyaalti', ad: 'Konyaaltı', lat: 36.8608, lng: 30.6339 },
  { slug: 'muratpasa', ad: 'Muratpaşa', lat: 36.8850, lng: 30.7061 },
  { slug: 'lara', ad: 'Lara', lat: 36.8558, lng: 30.7889 },
  { slug: 'kundu', ad: 'Kundu', lat: 36.8583, lng: 30.8531 },
  { slug: 'aksu', ad: 'Aksu', lat: 36.9139, lng: 30.8306 },
  { slug: 'belek', ad: 'Belek', lat: 36.8625, lng: 31.0561 },
  { slug: 'side', ad: 'Side', lat: 36.7673, lng: 31.3893 },
  { slug: 'beldibi', ad: 'Beldibi', lat: 36.7122, lng: 30.5622 },
];
