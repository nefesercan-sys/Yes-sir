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
  /** Yorum metninin dili; iki dilde yazılmış yorumlarda dizi (metin değiştirilmez, yalnız etiket doğru verilir). */
  lang: RLang | RLang[];
}
export type RLang = 'tr' | 'en' | 'ru' | 'de';

export const GOOGLE_PROFILE_URL = 'https://www.google.com/maps?cid=6436895271281342624';
export const GOOGLE_REVIEW_URL  = 'https://www.google.com/maps?cid=6436895271281342624';

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: 'Style', // Google'daki görünen ad büyük harfle "STYLE"; diğer yazarlarla aynı biçimde yazıldı
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
    lang: ['tr', 'ru'], // metnin ilk paragrafı Türkçe, ikinci paragrafı Rusça
    text: 'Çok iyi bir terzi. Yaptığı işten çok memnun kaldım. Fiyatları uygun, dikişleri ve işçiliği oldukça kaliteli. Titiz ve özenli çalışıyor. Kesinlikle tavsiye ederim.\n\nДействительно очень хороший портной. И цены доступные, и качество работы отличное. Всё делает аккуратно и качественно. Я очень довольна результатом. С чистой совестью рекомендую.',
  },
  {
    author: 'Mehmet E.',
    rating: 5,
    date: '2026-07',
    lang: 'tr',
    text: 'İş tecrübesi ve ustalığı çok iyi. Fiyatları uygun.',
  },
  {
    author: 'Alena U.',
    rating: 5,
    date: '2026-07',
    lang: 'tr',
    text: 'Her şey harika.',
  },
  {
    author: 'Ira G.',
    rating: 5,
    date: '2026-07',
    lang: 'ru',
    text: 'Супер мастер своего дела. Очень аккуратно выполняет работу, может подчинить любую вещь, а также сшить любую модель на заказ. ВСЕМ РЕКОМЕНДУЮ 👍👍👍👍👍👌',
  },
  {
    author: 'Cemile N.',
    rating: 5,
    date: '2026-07',
    lang: 'tr',
    text: 'Arkadaşlarımızla eğlenmeye çıktık arkadaşımın elbisenin fermuarı patladı gittik 15 dkda halloldu kesinlikle tavsiye ediyoruz ayriyetten çok güler yüzlü bir abimizdi 🙏❤️',
  },
];

// Google profilindeki toplam puan ve yorum sayısı (Google profil ekranında doğrulandı: 5,0 · 9 yorum). Yeni yorum gelince count'u güncelle.
// Listedeki GOOGLE_REVIEWS yalnızca metni birebir doğrulanmış yorumlardır; sayı profildeki toplamı gösterir.
export const GOOGLE_PROFILE_STATS = { count: 9, average: '5.0' };

export function reviewStats() {
  return GOOGLE_PROFILE_STATS;
}

// LocalBusiness düğümüne `...reviewSchema()` olarak eklenir. Yorum yoksa boş döner.
export function reviewSchema(): Record<string, unknown> {
  const { count, average } = reviewStats();
  if (!count) return {};
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: average,
      reviewCount: String(count),
      bestRating: '5',
      worstRating: '1',
    },
    review: GOOGLE_REVIEWS.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewBody: r.text,
      inLanguage: r.lang,
      // reviewCount (GOOGLE_PROFILE_STATS.count) Google profilindeki toplamdır; burada metni doğrulanmış yorumlar listelenir
      reviewRating: { '@type': 'Rating', bestRating: '5', ratingValue: String(r.rating) },
    })),
  };
}
