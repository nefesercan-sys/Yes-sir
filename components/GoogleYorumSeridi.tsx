// Tüm sayfaların altında: Google'da yorum yazma bağlantısı (Google İşletme Profili: TERZİ Can - Antalya Tailor Service).
// Bağlantı lib/business.ts GOOGLE_REVIEW_URL'den gelir (profil cid=6436895271281342624). Puan/yorum sayısı YAZILMAZ.
import { GOOGLE_REVIEW_URL } from '@/lib/business';

const T: Record<string, { q: string; cta: string }> = {
  tr: { q: 'Memnun kaldınız mı?', cta: "Google'da yorum yazın" },
  en: { q: 'Happy with our work?', cta: 'Leave a Google review' },
  ru: { q: 'Довольны работой?', cta: 'Оставьте отзыв в Google' },
  de: { q: 'Zufrieden?', cta: 'Schreiben Sie eine Google-Bewertung' },
  es: { q: '¿Quedó satisfecho?', cta: 'Deje una reseña en Google' },
  fr: { q: 'Satisfait ?', cta: 'Laissez un avis Google' },
  pl: { q: 'Zadowolony?', cta: 'Zostaw opinię w Google' },
  uk: { q: 'Задоволені роботою?', cta: 'Залиште відгук у Google' },
  nl: { q: 'Tevreden?', cta: 'Laat een Google-review achter' },
  ar: { q: 'هل أنت راضٍ عن عملنا؟', cta: 'اترك تقييمًا على Google' },
};

export default function GoogleYorumSeridi({ lang = 'tr' }: { lang?: string }) {
  const t = T[lang] ?? T.tr;
  return (
    <aside
      aria-label={t.cta}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{ textAlign: 'center', padding: '14px 16px 88px', fontSize: '.92rem', lineHeight: 1.5, borderTop: '1px solid rgba(127,127,127,.25)' }}
    >
      <span>{t.q} </span>
      <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, textDecoration: 'underline' }}>
        ★ {t.cta}
      </a>
      <span style={{ opacity: 0.75 }}> · TERZİ Can - Antalya Tailor Service</span>
    </aside>
  );
}
