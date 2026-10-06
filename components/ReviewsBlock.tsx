// Görünür müşteri yorumları (Google'daki gerçek yorumlar). Şema ayrıca üretilmez:
// işletme şeması zaten aynı yorumları lib/reviews.ts'ten alır (çift işaretleme olmasın).
import { GOOGLE_REVIEWS, GOOGLE_REVIEW_URL, reviewStats } from '@/lib/reviews';

type L = 'tr' | 'en';
const T = {
  tr: { h: 'Müşteri Yorumları', on: "Google'da", rev: 'yorum', all: "Tüm yorumları Google'da gör" },
  en: { h: 'Customer Reviews', on: 'on Google', rev: 'reviews', all: 'See all reviews on Google' },
} as const;

export default function ReviewsBlock({ lang = 'tr' }: { lang?: L }) {
  const t = T[lang];
  const { count, average } = reviewStats();
  // Sayfa dilindeki yorumlar önce
  const list = [...GOOGLE_REVIEWS].sort((a, b) => Number(b.lang === lang) - Number(a.lang === lang));
  return (
    <section
      id="musteri-yorumlari"
      style={{ maxWidth: 1000, margin: '32px auto', padding: '0 16px', fontFamily: 'system-ui,-apple-system,sans-serif' }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{t.h}</h2>
      <p style={{ fontSize: 14, margin: '0 0 14px', opacity: 0.85 }}>
        <span aria-hidden="true" style={{ color: '#f5a623' }}>★★★★★</span> {average} · {count} {t.rev} {t.on}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
        {list.map(r => (
          <figure key={r.author + r.date} style={{ margin: 0, border: '1px solid rgba(128,128,128,.35)', borderRadius: 12, padding: 14 }}>
            <div style={{ color: '#f5a623', fontSize: 14 }} aria-label={`${r.rating} / 5`}>{'★'.repeat(r.rating)}</div>
            <blockquote style={{ margin: '8px 0', fontSize: 14, lineHeight: 1.6 }}>{r.text}</blockquote>
            <figcaption style={{ fontSize: 12, opacity: 0.7 }}>
              {r.author} · {r.date}
            </figcaption>
          </figure>
        ))}
      </div>
      <p style={{ marginTop: 12, fontSize: 14 }}>
        <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">{t.all}</a>
      </p>
    </section>
  );
}
