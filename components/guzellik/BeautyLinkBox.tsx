// Terzi/otel sayfalarından Can Beauty Studio'ya tek bir kısa bağlantı kutusu (tr/en/de/ru). Fiyat, salon adı veya ev/otel beyanı içermez.
import { G_SLUG } from '@/lib/guzellik';
import { G_PREFIX, type GSubLang } from '@/lib/guzellik-slugs';

const COPY: Record<GSubLang, { h: string; p: string; a: string }> = {
  tr: { h: 'Güzellik hizmetleri de var', p: 'Saç, tırnak, makyaj, gelin hazırlığı, cilt bakımı ve ağda için anlaşmalı salonlar; randevu ve fiyat WhatsApp\'tan.', a: 'Can Beauty Studio' },
  en: { h: 'Beauty services too', p: 'Hair, nails, makeup, bridal, skin care and waxing at partner salons in Antalya; booking and price on WhatsApp.', a: 'Can Beauty Studio' },
  de: { h: 'Auch Beauty-Leistungen', p: 'Haare, Nägel, Make-up, Braut-Styling, Hautpflege und Waxing in Partnersalons in Antalya; Termin und Preis per WhatsApp.', a: 'Can Beauty Studio' },
  ru: { h: 'Есть и бьюти-услуги', p: 'Волосы, ногти, макияж, свадебный образ, уход за кожей и депиляция в салонах-партнёрах Антальи; запись и цена в WhatsApp.', a: 'Can Beauty Studio' },
};

export default function BeautyLinkBox({ lang }: { lang: GSubLang }) {
  const c = COPY[lang];
  return (
    <aside className="beauty-link-box" lang={lang} style={{ maxWidth: 960, margin: '1.5rem auto', padding: '1rem 1.15rem', border: '1px solid #e7d9c8', borderRadius: 12, background: '#fdf8f4' }}>
      <h2 style={{ fontSize: '1.05rem', margin: '0 0 .35rem' }}>{c.h}</h2>
      <p style={{ margin: '0 0 .5rem' }}>{c.p}</p>
      <a href={`${G_PREFIX}/${G_SLUG[lang]}`} hrefLang={lang} style={{ fontWeight: 700 }}>{c.a} →</a>
    </aside>
  );
}
