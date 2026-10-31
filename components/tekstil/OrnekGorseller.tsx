// Konuya göre örnek görseller (yapay zekâ ile üretilmiş; "örnek görsel" etiketi ve not her zaman gösterilir).
import { GORSELLER, ORNEK_ETIKET, ORNEK_BASLIK, ORNEK_NOT, type GLang, type GorselAnahtar } from '@/lib/ornek-gorseller';
import type { Topic } from '@/lib/tekstil-sayfalari';

const KONU: Record<Topic, GorselAnahtar[]> = {
  keten: ['keten-kadin-evde', 'keten-blazer-atolye', 'keten-erkek-gomlek', 'keten-pantolon-katli'],
  promo: ['bez-canta-atolye' as GorselAnahtar, 'hazir-giyim-atolye' as GorselAnahtar, 'polar-yelek', 'yun-pantolon-metre', 'sef-mutfak-uniforma', 'uniforma' as GorselAnahtar],
  tekstil: ['atolye-kesim-masasi', 'manken-palto-takim', 'manken-bej-ceket', 'kadin-trenckot-atolye'],
  acil: ['beyaz-gomlek-katli', 'palto-yaka-detay', 'pilili-etek'],
  otel: ['eve-gelen-terzi', 'kuru-temizleme-utu', 'erkek-takim-olcu'],
  etkinlik: ['abiye-elbise-atolye', 'abiye-askida', 'erkek-takim-olcu'],
};
// Promosyon sayfasında bez çanta, tişört ve uniforma için daha önce eklenmiş mevcut dosyalar (lib'de ayrı anahtar yok)
const EK = {
  'bez-canta-atolye': { src: '/gorseller/bez-canta-atolye.webp', w: 1264, h: 848,
    baslik: { tr: 'Bez çanta', en: 'Tote bags', de: 'Stofftaschen', ru: 'Тканевые сумки' },
    aciklama: { tr: 'Logolu baskılı bez çanta imalatı: fuar ve organizasyonlar için.', en: 'Printed tote bags with your logo: for fairs and events.', de: 'Stofftaschen mit Logodruck: für Messen und Events.', ru: 'Тканевые сумки с логотипом: для выставок и мероприятий.' } },
  'hazir-giyim-atolye': { src: '/gorseller/hazir-giyim-atolye.webp', w: 1264, h: 848,
    baslik: { tr: 'Tişört', en: 'T-shirts', de: 'T-Shirts', ru: 'Футболки' },
    aciklama: { tr: 'Logonuzla ya da kendi tasarımınızla baskılı tişört.', en: 'T-shirts printed with your logo or your own design.', de: 'T-Shirts mit Ihrem Logo oder eigenem Design.', ru: 'Футболки с вашим логотипом или дизайном.' } },
  'uniforma': { src: '/gorseller/uniforma.webp', w: 1264, h: 848,
    baslik: { tr: 'Uniforma', en: 'Uniforms', de: 'Uniformen', ru: 'Униформа' },
    aciklama: { tr: 'İstediğiniz model ve baskıyla uniforma.', en: 'Uniforms in the model and print you want.', de: 'Uniformen in gewünschtem Modell und Druck.', ru: 'Униформа в нужной модели и с нужной печатью.' } },
} as const;

export default function OrnekGorseller({ topic, lang, url, base }: { topic: Topic; lang: GLang; url: string; base: string }) {
  const items = KONU[topic].map((k) => {
    const g = (k in EK ? EK[k as keyof typeof EK] : GORSELLER[k]) as { src: string; w: number; h: number; baslik: Record<GLang, string>; aciklama: Record<GLang, string> };
    return { k, g };
  });
  const ld = {
    '@context': 'https://schema.org',
    '@graph': items.map(({ k, g }) => ({
      '@type': 'ImageObject', '@id': `${url}#img-${k}`, contentUrl: `${base}${g.src}`, url: `${base}${g.src}`,
      name: g.baslik[lang], caption: g.aciklama[lang], description: `${g.baslik[lang]} (${ORNEK_ETIKET[lang]})`, width: g.w, height: g.h, inLanguage: lang,
    })),
  };
  return (
    <section aria-label={ORNEK_BASLIK[lang]} style={{ marginBottom: '2rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '.4rem' }}>{ORNEK_BASLIK[lang]}</h2>
      <p style={{ color: '#64748B', fontSize: '.82rem', margin: '0 0 1rem' }}>{ORNEK_NOT[lang]}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1rem' }}>
        {items.map(({ k, g }) => (
          <figure key={k} style={{ margin: 0, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.src} alt={`${g.baslik[lang]} (${ORNEK_ETIKET[lang]})`} title={g.baslik[lang]} width={g.w} height={g.h} loading="lazy" decoding="async"
              style={{ width: '100%', height: 'auto', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block' }} />
            <figcaption style={{ padding: '.85rem 1rem 1rem' }}>
              <strong style={{ display: 'block', fontSize: '.98rem', marginBottom: '.2rem' }}>{g.baslik[lang]}</strong>
              <span style={{ color: '#475569', fontSize: '.86rem' }}>{g.aciklama[lang]}</span>
              <span style={{ display: 'block', color: '#94A3B8', fontSize: '.7rem', marginTop: '.3rem' }}>{ORNEK_ETIKET[lang]}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
