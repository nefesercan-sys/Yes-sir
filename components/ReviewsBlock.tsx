// Görünür müşteri yorumları (Google'daki gerçek yorumlar). Şema ayrıca üretilmez:
// işletme şeması zaten aynı yorumları lib/reviews.ts'ten alır (çift işaretleme olmasın).
import { GOOGLE_REVIEWS, GOOGLE_PROFILE_URL, reviewStats } from '@/lib/reviews';
import { BUSINESS_ID, SITE_URL } from '@/lib/business';
import { jsonLdString } from '@/lib/json-ld';

type L = 'tr' | 'en' | 'ru' | 'de';
const hasLang = (x: string | string[], l: string) => (Array.isArray(x) ? x.includes(l) : x === l);
const T = {
  tr: { h: 'Müşteri Yorumları', on: "Google'da", rev: 'yorum', all: "Tüm yorumları Google'da gör", shown: (n: number, c: number) => `Google profilinde ${c} yorum var; metni doğrulanmış ${n} tanesi burada gösteriliyor.` },
  en: { h: 'Customer Reviews', on: 'on Google', rev: 'reviews', all: 'See all reviews on Google', shown: (n: number, c: number) => `The Google profile has ${c} reviews; the ${n} with verified text are shown here.` },
  ru: { h: 'Отзывы клиентов', on: 'в Google', rev: 'отзывов', all: 'Все отзывы в Google', shown: (n: number, c: number) => `В профиле Google ${c} отзывов; здесь показаны ${n} с проверенным текстом.` },
  de: { h: 'Kundenbewertungen', on: 'bei Google', rev: 'Bewertungen', all: 'Alle Bewertungen bei Google ansehen', shown: (n: number, c: number) => `Das Google-Profil hat ${c} Bewertungen; ${n} mit geprüftem Text werden hier gezeigt.` },
} as const;

// schema: sayfada işletme şeması yorumları zaten üretmiyorsa (BusinessSchema reviews=...) true ver; aynı @id'li düğüme yalnızca yorum alanlarını ekler.
export default function ReviewsBlock({ lang = 'tr', schema = false }: { lang?: L | string; schema?: boolean }) {
  const t = T[(lang in T ? lang : 'en') as L];
  const { count, average } = reviewStats();
  // Sayfa dilindeki yorumlar önce
  const list = [...GOOGLE_REVIEWS].sort((a, b) => Number(hasLang(b.lang, lang)) - Number(hasLang(a.lang, lang)));
  const reviewNode = schema
    ? {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': BUSINESS_ID,
        name: 'Terzi Can',
        url: SITE_URL,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: average, reviewCount: String(count), bestRating: '5', worstRating: '1' },
        review: list.map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.author },
          reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
          reviewBody: r.text,
          datePublished: r.date,
        })),
      }
    : null;
  return (
    <section
      id="musteri-yorumlari"
      style={{ maxWidth: 1000, margin: '32px auto', padding: '0 16px', fontFamily: 'system-ui,-apple-system,sans-serif' }}
    >
      {reviewNode && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(reviewNode) }} />}
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{t.h}</h2>
      <p style={{ fontSize: 14, margin: '0 0 14px', opacity: 0.85 }}>
        <span aria-hidden="true" style={{ color: '#f5a623' }}>★★★★★</span> {average} · {count} {t.rev} {t.on}
      </p>
      <p style={{ fontSize: 12, margin: '-8px 0 14px', opacity: 0.7 }}>{t.shown(list.length, count)}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
        {list.map(r => (
          <figure key={r.author + r.date} style={{ margin: 0, border: '1px solid rgba(128,128,128,.35)', borderRadius: 12, padding: 14 }}>
            <div style={{ color: '#f5a623', fontSize: 14 }} aria-label={`${r.rating} / 5`}>{'★'.repeat(r.rating)}</div>
            <blockquote style={{ margin: '8px 0', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{r.text}</blockquote>
            <figcaption style={{ fontSize: 12, opacity: 0.7 }}>
              {r.author} · {r.date}
            </figcaption>
          </figure>
        ))}
      </div>
      <p style={{ marginTop: 12, fontSize: 14 }}>
        <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">{t.all}</a>
      </p>
    </section>
  );
}
