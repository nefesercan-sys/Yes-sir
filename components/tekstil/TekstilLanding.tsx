import { PROMO_ALL } from '@/lib/intl-promo';
import { BASE, CONTENT, GALLERY, GALLERY_BASE, HREFLANG, LANGS, RELATED, SERVICE_URL, UI, URLS, WA_NUMBER, type Lang, type Topic } from '@/lib/tekstil-sayfalari';
import { jsonLdString } from '@/lib/json-ld';
import OrnekGorseller from '@/components/tekstil/OrnekGorseller';

const wa = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export default function TekstilLanding({ topic, lang }: { topic: Topic; lang: Lang }) {
  const c = CONTENT[topic][lang];
  const ui = UI[lang];
  const path = URLS[topic][lang];
  const url = `${BASE}${path}`;
  const other: Topic = RELATED(topic);
  const isKeten = topic === 'keten';
  const isPromo = topic === 'promo';
  const isTerzi = topic !== 'tekstil' && !isPromo;
  // Anavera Tekstil sayfası, yeni promosyon rehberine de bağlanır (tekstil -> promo)
  const extra: Topic | null = topic === 'tekstil' ? 'promo' : null;
  // Promosyon sayfası 10 dilde yayımlanır; dil seçicide hepsi görünür
  const nav = isPromo ? PROMO_ALL : LANGS.map((l) => ({ code: l, hreflang: HREFLANG[l], name: l.toUpperCase(), path: URLS[topic][l] }));

  const provider = isTerzi
    ? { '@type': ['LocalBusiness', 'ClothingStore'], name: 'Terzi Can', url: `${BASE}/terzi`, telephone: `+${WA_NUMBER}`, address: { '@type': 'PostalAddress', addressLocality: 'Konyaaltı, Antalya', addressCountry: 'TR' } }
    : { '@type': ['Organization', 'ClothingStore'], name: 'Anavera Tekstil', url, telephone: `+${WA_NUMBER}`, address: { '@type': 'PostalAddress', addressLocality: 'Antalya', addressCountry: 'TR' } };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#page`, url, name: c.t, description: c.d, inLanguage: lang, isPartOf: { '@type': 'WebSite', name: 'SwapHubs', url: BASE } },
      { '@type': 'Service', name: c.h1, description: c.d, inLanguage: lang, provider, areaServed: { '@type': 'City', name: 'Antalya' } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: ui.home, item: BASE }, { '@type': 'ListItem', position: 2, name: c.crumb, item: url }] },
      { '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };

  const ink = '#0F172A', gold = '#C9A227';
  return (
    <div lang={lang} style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#F8FAFC', color: ink }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <header style={{ backgroundColor: ink, borderBottom: `2px solid ${gold}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '.9rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <a href={BASE} style={{ color: '#fff', fontWeight: 800, textDecoration: 'none' }}>{ui.home}</a>
          <nav aria-label={ui.langs} style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {nav.map((x) => (
              <a key={x.code} href={x.path} hrefLang={x.hreflang} aria-current={x.code === lang ? 'page' : undefined} title={isPromo ? x.name : undefined}
                style={{ color: x.code === lang ? ink : '#fff', background: x.code === lang ? gold : 'transparent', border: '1px solid rgba(255,255,255,.3)', borderRadius: 6, padding: '.25rem .6rem', fontSize: '.8rem', fontWeight: 700, textDecoration: 'none' }}>
                {x.code.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <nav aria-label="Breadcrumb" style={{ maxWidth: 1000, margin: '0 auto', padding: '.8rem 1.2rem 0', fontSize: '.8rem', color: '#64748B' }}>
        <a href={BASE} style={{ color: '#64748B' }}>{ui.home}</a> › <strong style={{ color: ink }}>{c.crumb}</strong>
      </nav>

      <section style={{ background: `linear-gradient(135deg, ${ink}, #1E293B)`, color: '#fff', padding: '3rem 1.2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', border: '1px solid rgba(201,162,39,.5)', color: '#FDE047', padding: '.3rem .9rem', borderRadius: 30, fontSize: '.78rem', fontWeight: 600, marginBottom: '1rem' }}>{c.badge}</span>
          <h1 style={{ fontSize: 'clamp(1.7rem,4.5vw,2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>{c.h1}</h1>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.6rem' }}>{c.lead}</p>
          <a href={wa(c.wa)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#25D366', color: '#fff', padding: '.85rem 1.6rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>💬 {c.cta}</a>
        </div>
      </section>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.2rem' }}>
        {c.secs.map((s) => (
          <section key={s.h} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '.7rem' }}>{s.h}</h2>
            {s.p && <p style={{ lineHeight: 1.75, color: '#334155' }}>{s.p}</p>}
            {s.ul && <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.8, color: '#334155' }}>{s.ul.map((x) => <li key={x}>{x}</li>)}</ul>}
          </section>
        ))}

        {isKeten && (
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '.9rem' }}>{ui.examples}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '.8rem' }}>
              {GALLERY.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.f} src={`${GALLERY_BASE}${g.f}`} alt={g.alt[lang]} width={g.w} height={g.h} loading="lazy" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 10 }} />
              ))}
            </div>
          </section>
        )}

        <OrnekGorseller topic={topic} lang={lang} url={url} base={BASE} />

        <section id="sik-sorulan-sorular" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '.9rem' }}>{ui.faq}</h2>
          <div style={{ display: 'grid', gap: '.8rem' }}>
            {c.faq.map(([q, a]) => (
              <details key={q} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '1rem 1.2rem' }}>
                <summary style={{ fontWeight: 700, cursor: 'pointer' }}>{q}</summary>
                <p style={{ marginTop: '.6rem', color: '#475569', lineHeight: 1.65 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <p style={{ fontSize: '.85rem', color: '#64748B', marginBottom: '1.5rem' }}>{c.note ?? ui.note}</p>

        <section style={{ textAlign: 'center', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.5rem' }}>
          <a href={wa(c.wa)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#25D366', color: '#fff', padding: '.8rem 1.5rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>💬 {c.cta}</a>
          <p style={{ marginTop: '1rem', fontSize: '.9rem' }}>
            {ui.other}: <a href={URLS[other][lang]}>{CONTENT[other][lang].crumb}</a>
            {extra && <> · <a href={URLS[extra][lang]}>{CONTENT[extra][lang].crumb}</a></>}
            {!isPromo && <> · <a href={SERVICE_URL[lang]}>{ui.service}</a></>}
          </p>
        </section>
      </main>

      <footer style={{ padding: '1.5rem 1.2rem', textAlign: 'center', fontSize: '.8rem', color: '#94A3B8', background: '#020617' }}>
        {c.foot ?? ui.foot} · <a href={BASE} style={{ color: '#94A3B8' }}>SwapHubs.com</a>
      </footer>
    </div>
  );
}
