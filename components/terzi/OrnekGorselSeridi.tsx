// Örnek görsel şeridi: başlık (h3) + açıklama (figcaption) + dilde alt metin + ImageObject JSON-LD.
// Görseller yapay zekâ ile üretilmiştir; "örnek görsel" etiketi ve not her zaman gösterilir.
import { altMetinler, type Konu } from '@/lib/alt-basliklar';
import { GORSELLER, gorselMetin, ORNEK_ETIKET, ORNEK_BASLIK, ORNEK_NOT, type GLang, type GorselAnahtar } from '@/lib/ornek-gorseller';

export default function OrnekGorselSeridi({ lang = 'tr', anahtarlar, tema = 'koyu', baslik, sayfaUrl, base = '', konu, yer = 'Antalya' }: {
  lang?: GLang; anahtarlar: GorselAnahtar[]; tema?: 'koyu' | 'acik'; baslik?: string; sayfaUrl?: string; base?: string; konu?: Konu | Konu[]; yer?: string;
}) {
  const koyu = tema === 'koyu';
  const fg = koyu ? '#F5F1E8' : '#0F172A';
  const soluk = koyu ? 'rgba(255,255,255,.72)' : '#475569';
  const kart = koyu ? 'rgba(255,255,255,.06)' : '#FFFFFF';
  const kenar = koyu ? 'rgba(255,255,255,.12)' : '#E2E8F0';
  const ld = sayfaUrl ? {
    '@context': 'https://schema.org',
    '@graph': anahtarlar.map((k) => {
      const g = GORSELLER[k]; const m = gorselMetin(k, lang);
      return { '@type': 'ImageObject', '@id': `${sayfaUrl}#img-${k}`, contentUrl: `${base}${g.src}`, url: `${base}${g.src}`,
        name: m.baslik, caption: m.aciklama, description: `${m.baslik} (${ORNEK_ETIKET[lang]})`, width: g.w, height: g.h, inLanguage: lang };
    }),
  } : null;
  return (
    <section dir={lang === 'ar' ? 'rtl' : undefined} aria-label={baslik || ORNEK_BASLIK[lang]} style={{ padding: '3rem 1.5rem', color: fg }}>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800, margin: '0 0 .4rem', textAlign: 'center' }}>{baslik || ORNEK_BASLIK[lang]}</h2>
        <p style={{ textAlign: 'center', color: soluk, fontSize: '.82rem', margin: '0 0 1.6rem' }}>{ORNEK_NOT[lang]}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1rem' }}>
          {anahtarlar.map((k) => {
            const g = GORSELLER[k]; const m = gorselMetin(k, lang);
            return (
              <figure key={k} style={{ margin: 0, background: kart, border: `1px solid ${kenar}`, borderRadius: 12, overflow: 'hidden' }}>
                <img src={g.src} alt={`${m.baslik} (${ORNEK_ETIKET[lang]})`} title={m.baslik} width={g.w} height={g.h} loading="lazy" decoding="async"
                  style={{ width: '100%', height: 'auto', aspectRatio: '3 / 2', objectFit: 'cover', display: 'block' }} />
                <figcaption style={{ padding: '.9rem 1.1rem 1.1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '.2rem' }}>{m.baslik}</strong>
                  <span style={{ color: soluk, fontSize: '.88rem' }}>{m.aciklama}</span>
                  <span style={{ display: 'block', color: soluk, opacity: .7, fontSize: '.7rem', marginTop: '.35rem' }}>{ORNEK_ETIKET[lang]}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
        {konu && (
          <div style={{ marginTop: '2.2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.2rem' }}>
            {altMetinler(konu, lang, yer).map((a, i) => (
              <div key={i}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 .35rem' }}>{a.h}</h2>
                <p style={{ color: soluk, fontSize: '.92rem', lineHeight: 1.6, margin: 0 }}>{a.p}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
