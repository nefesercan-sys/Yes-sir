// ============================================================
// lib/reviews.ts — Google işletme profilindeki GERÇEK yorumlar (tek kaynak)
// Yeni yorum geldikçe buraya ekle (metin Google'daki ile birebir aynı olmalı); sayıyı GOOGLE_PROFILE_STATS'ta güncelle.
// Sadece Google'da gerçekten yayınlanmış yorumları ekle, metni değiştirme.
// ============================================================
export interface GoogleReview {
  author: string;          // gizlilik için ad + soyad baş harfi
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;            // YYYY-MM-DD
  lang: 'tr' | 'en' | 'ru' | 'de';
}

export const GOOGLE_PROFILE_URL = 'https://www.google.com/maps?cid=5846987472659818117';
export const GOOGLE_REVIEW_URL  = 'https://g.page/r/CYUmDLIgrCRREAE/review';

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: 'Anastasia B.',
    rating: 5,
    date: '2026-10-05',
    lang: 'en',
    text: 'Very happy with the Service. Quick and efficient. Got my trousers picked up and delivered the next day. Can only recommend',
  },
  {
    author: 'Selvinaz D.',
    rating: 5,
    date: '2026-10-05',
    lang: 'tr',
    text: 'Terzi can a Özel kiyafet diktirdim ve önceki kıyafetlerimin de tadilatını yaptırdım dikis kalitesi ve kalıp olarak oturması cok güzel oldu ve zamaninda teslim ettii ve istedigim elbise tam gibi dikti elbiselerimde bek daraltma ve bir kaç boy kisaltma isinide ojinal sekolde yaptı cok memnun kaldım antalyadakj en iyi en profesyonel ve en guker yüzlü terzi',
  },
];

// Google profilindeki toplam puan ve yorum sayısı (profil ekranından; yeni yorum gelince güncelle).
// Listedeki GOOGLE_REVIEWS yalnızca metni birebir doğrulanmış yorumlardır; sayı profildeki toplamı gösterir.
export const GOOGLE_PROFILE_STATS = { count: 4, average: '5.0' };

export function reviewStats() {
  return GOOGLE_PROFILE_STATS;
}
