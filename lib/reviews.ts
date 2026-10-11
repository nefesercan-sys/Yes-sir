// ============================================================
// lib/reviews.ts — Google işletme profilindeki GERÇEK yorumlar (tek kaynak)
// Profil: TERZİ Can - Konyaaltı (cid=6436895271281342624)
// Yeni yorum geldikçe buraya ekle (metin Google'daki ile birebir aynı olmalı); sayıyı GOOGLE_PROFILE_STATS'ta güncelle.
// Sadece Google'da gerçekten yayınlanmış yorumları ekle, metni değiştirme.
// ============================================================
export interface GoogleReview {
  author: string;          // gizlilik için ad + soyad baş harfi
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;            // YYYY-MM-DD veya YYYY-MM (Google "3 ay önce" gibi göreli tarih gösterdiğinde ay hassasiyetinde)
  lang: 'tr' | 'en' | 'ru' | 'de';
}

export const GOOGLE_PROFILE_URL = 'https://www.google.com/maps?cid=6436895271281342624';
export const GOOGLE_REVIEW_URL  = 'https://www.google.com/maps?cid=6436895271281342624';

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: 'STYLE',
    rating: 5,
    date: '2026-09',
    lang: 'tr',
    text: '6 parça kısaltma, kol tadilatı ve yırtık bir bluzun tamirini yaptırdım. Hepsini tertemiz ve çok düzgün bir şekilde bir günde teslim etti. İşçiliği mükemmel, elinize sağlık. Kesinlikle tavsiye ederim.',
  },
  {
    author: 'Hamza A.',
    rating: 5,
    date: '2026-07',
    lang: 'tr',
    text: 'Fermuar değişimi yaptırdım cok hızlı yaptı sagolsun eskininden iyi oldu',
  },
  {
    author: 'Merve A.',
    rating: 5,
    date: '2026-07',
    lang: 'tr',
    text: 'Güler yüzlü,uygun fiyatlı ve işinde profesyonel.Emeklerinize sağlık👍',
  },
  {
    author: 'Sumaya U.',
    rating: 5,
    date: '2026-07',
    lang: 'tr',
    text: 'Çok iyi bir terzi. Yaptığı işten çok memnun kaldım. Fiyatları uygun, dikişleri ve işçiliği oldukça kaliteli. Titiz ve özenli çalışıyor. Kesinlikle tavsiye ederim.\n\nДействительно очень хороший портной. И цены доступные, и качество работы отличное. Всё делает аккуратно и качественно. Я очень довольна результатом. С чистой совестью рекомендую.',
  },
  {
    author: 'Ira G.',
    rating: 5,
    date: '2026-07',
    lang: 'ru',
    text: 'Супер мастер своего дела. Очень аккуратно выполняет работу, может подчинить любую вещь, а также сшить любую модель на заказ. ВСЕМ РЕКОМЕНДУЮ 👍👍👍👍👍👌',
  },
];

// Google profilindeki toplam puan ve yorum sayısı. Şimdilik doğrulanabilen sayı: 6 yorum (5'i metinli, 1'i yalnızca puanlı), hepsi 5 yıldız.
// Profilde daha fazla yorum varsa buradaki count'u profil ekranındaki gerçek toplamla güncelle.
export const GOOGLE_PROFILE_STATS = { count: 6, average: '5.0' };

export function reviewStats() {
  return GOOGLE_PROFILE_STATS;
}
