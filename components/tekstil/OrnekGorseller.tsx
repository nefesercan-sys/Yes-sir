// Konuya göre örnek görseller (yapay zekâ ile üretilmiş; "örnek görsel" etiketi ve not her zaman gösterilir).
import { ALT_BASLIKLAR, type Konu } from '@/lib/alt-basliklar';
import { GORSELLER, gorselMetin, ORNEK_ETIKET, ORNEK_BASLIK, ORNEK_NOT, type GLang, type GorselAnahtar } from '@/lib/ornek-gorseller';
import type { Topic } from '@/lib/tekstil-sayfalari';

const KONU: Record<Topic, GorselAnahtar[]> = {
  keten: ['keten-kadin-evde', 'keten-blazer-atolye', 'keten-erkek-gomlek', 'keten-pantolon-katli'],
  promo: ['bez-canta-atolye', 'hazir-giyim-atolye', 'polar-yelek', 'yun-pantolon-metre', 'sef-mutfak-uniforma', 'uniforma'],
  tekstil: ['atolye-kesim-masasi', 'manken-palto-takim', 'manken-bej-ceket', 'kadin-trenckot-atolye'],
  acil: ['beyaz-gomlek-katli', 'palto-yaka-detay', 'pilili-etek'],
  otel: ['eve-gelen-terzi', 'kuru-temizleme-utu', 'erkek-takim-olcu'],
  etkinlik: ['abiye-elbise-atolye', 'abiye-askida', 'erkek-takim-olcu'],
};
const KONU_ALT: Record<Topic, Konu[]> = { keten: ['keten'], promo: ['promo'], tekstil: ['uniforma'], acil: ['otel'], otel: ['bolge'], etkinlik: ['gelinlik'] };
export default function OrnekGorseller({ topic, lang, url, base }: { topic: Topic; lang: GLang; url: string; base: string }) {
  const items = KONU[topic].map((k) => {
    const g = GORSELLER[k]; const m = gorselMetin(k, lang);
    return { k, g, m };
  });
  const ld = {
    '@context': 'https://schema.org',
    '@graph': items.map(({ k, g, m }) => ({
      '@type': 'ImageObject', '@id': `${url}#img-${k}`, contentUrl: `${base}${g.src}`, url: `${base}${g.src}`,
      name: m.baslik, caption: m.aciklama, description: `${m.baslik} (${ORNEK_ETIKET[lang]})`, width: g.w, height: g.h, inLanguage: lang,
    })),
  };
  return (
    <section aria-label={ORNEK_BASLIK[lang]} style={{ marginBottom: '2rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '.4rem' }}>{ORNEK_BASLIK[lang]}</h2>
      <p style={{ color: '#64748B', fontSize: '.82rem', margin: '0 0 1rem' }}>{ORNEK_NOT[lang]}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1rem' }}>
        {items.map(({ k, g, m }) => (
          <figure key={k} style={{ margin: 0, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.src} alt={`${m.baslik} (${ORNEK_ETIKET[lang]})`} title={m.baslik} width={g.w} height={g.h} loading="lazy" decoding="async"
              style={{ width: '100%', height: 'auto', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block' }} />
            <figcaption style={{ padding: '.85rem 1rem 1rem' }}>
              <strong style={{ display: 'block', fontSize: '.98rem', marginBottom: '.2rem' }}>{m.baslik}</strong>
              <span style={{ color: '#475569', fontSize: '.86rem' }}>{m.aciklama}</span>
              <span style={{ display: 'block', color: '#94A3B8', fontSize: '.7rem', marginTop: '.3rem' }}>{ORNEK_ETIKET[lang]}</span>
            </figcaption>
          </figure>
        ))}
      </div>
        {(
          <div style={{ marginTop: '2.2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.2rem' }}>
            {KONU_ALT[topic].flatMap((k) => ALT_BASLIKLAR[k]).map((a, i) => (
              <div key={i}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 .35rem' }}>{a.h[lang].replace(/\{y\}/g, 'Antalya')}</h2>
                <p style={{ color: '#475569', fontSize: '.92rem', lineHeight: 1.6, margin: 0 }}>{a.p[lang].replace(/\{y\}/g, 'Antalya')}</p>
              </div>
            ))}
          </div>
        )}
    </section>
  );
}
