// swaphubs.com — "Kargoyla da hizmet" ek bölümü (10 dil). Antalya-öncelikli; yalnızca online terzi sayfalarında ve yurt dışı sipariş rehberinde kullanılır.
// Service şeması: areaServed yalnızca Antalya; yurt dışı açıklama metninde. Görünür Q&A işaretlenmez (sayfada zaten tek FAQPage var).
import { KARGO, type KargoLang } from '@/lib/kargo-terzi';
import { waUrl, BUSINESS_ID } from '@/lib/business';
import { jsonLdString } from '@/lib/json-ld';

const INK = '#1f2a24';
const TEXT = '#3b4a42';
const GREEN = '#2d8c6e';
const SOFT = '#f4faf7';
const BORDER = '#e3ece7';

export default function KargoSection({ lang, id, compact }: { lang: KargoLang; id?: string; compact?: boolean }) {
  const c = KARGO[lang];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: c.svcName,
    description: c.svcDesc,
    inLanguage: lang,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: 'Antalya' },
  };
  return (
    <section
      id={id ?? 'kargo'}
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{ background: SOFT, color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '1.4rem 1.25rem', margin: '2rem auto', maxWidth: 860, lineHeight: 1.7 }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
      <h2 style={{ color: INK, fontSize: '1.3rem', margin: '0 0 .7rem', lineHeight: 1.3 }}>{c.h}</h2>
      <p style={{ margin: '0 0 .9rem' }}>{c.lead}</p>
      {/* compact: online sayfa kendi adımlarını ve hizmet kapsamını zaten gösterir; tekrar etme */}
      {!compact && <p style={{ margin: '0 0 .9rem' }}>{c.scope}</p>}
      {!compact && (
        <ol style={{ margin: '0 0 1.1rem', paddingInlineStart: '1.3rem' }}>
          {c.steps.map((s) => <li key={s} style={{ margin: '0 0 .3rem' }}>{s}</li>)}
        </ol>
      )}
      <h3 style={{ color: INK, fontSize: '1.05rem', margin: '0 0 .6rem' }}>{c.faqH}</h3>
      {c.faq.map(([q, a]) => (
        <div key={q} style={{ margin: '0 0 .8rem' }}>
          <h4 style={{ color: INK, fontSize: '.98rem', margin: '0 0 .15rem' }}>{q}</h4>
          <p style={{ margin: 0 }}>{a}</p>
        </div>
      ))}
      <p style={{ margin: '1rem 0 0' }}>
        <a href={waUrl(c.waMsg)} target="_blank" rel="noopener noreferrer"
          style={{ background: '#15803d', color: '#fff', padding: '.75rem 1.4rem', fontWeight: 700, textDecoration: 'none', borderRadius: 6, display: 'inline-block' }}>
          💬 {c.wa}
        </a>
      </p>
    </section>
  );
}
