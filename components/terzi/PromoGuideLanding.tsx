// swaphubs.com — Promosyon tekstili ve baskılı bez çanta rehberi (ES/FR/PL/UK/NL/AR). Veri: lib/intl-promo.ts. Sunucu bileşeni, stil inline.
// TR/EN/RU/DE karşılıkları components/tekstil/TekstilLanding.tsx ('promo' konusu) ile üretilir.
import Link from 'next/link';
import { INTL, type ILang } from '@/lib/intl';
import { PROMO, PROMO_ALL, promoUrl } from '@/lib/intl-promo';
import { BASE, URLS, WA_NUMBER } from '@/lib/tekstil-sayfalari';
import { OG_DEFAULT } from '@/components/terzi/IntlLanding';
import { jsonLdString } from '@/lib/json-ld';

const UPDATED = '2026-10-30';

const C = { green: '#2C4A3E', gold: '#D4B07A', cream: '#FAF7F2', sand: '#F2EDE4', ink: '#1C1814', muted: '#6B5F53', line: 'rgba(44,74,62,.15)' };
const serif = 'Georgia,serif';
const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export function promoJsonLd(lang: ILang) {
  const c = PROMO[lang];
  const url = `${BASE}${promoUrl(lang)}`;
  const provider = { '@type': ['Organization', 'ClothingStore'], name: 'Anavera Tekstil', url: `${BASE}${URLS.tekstil.en}`, telephone: `+${WA_NUMBER}`, address: { '@type': 'PostalAddress', addressLocality: 'Antalya', addressCountry: 'TR' } };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title, description: c.desc, inLanguage: lang, dateModified: UPDATED, primaryImageOfPage: { '@type': 'ImageObject', url: OG_DEFAULT }, isPartOf: { '@type': 'WebSite', name: 'SwapHubs', url: BASE } },
      { '@type': 'Service', name: c.h1, description: c.desc, inLanguage: lang, provider, areaServed: { '@type': 'City', name: 'Antalya' } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'SwapHubs', item: BASE }, { '@type': 'ListItem', position: 2, name: c.crumb, item: url }] },
      { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
}

export default function PromoGuideLanding({ lang }: { lang: ILang }) {
  const c = PROMO[lang]; const g = INTL[lang];
  return (
    <main lang={lang} dir={g.dir} style={{ fontFamily: 'system-ui,sans-serif', background: C.cream, color: '#3A3028', minHeight: '100vh', lineHeight: 1.7 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(promoJsonLd(lang)) }} />

      <header style={{ background: C.green, padding: '3rem 1.25rem 2.4rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ margin: '0 0 .8rem', fontSize: '.85rem' }}><a href={BASE} style={{ color: C.gold }}>SwapHubs</a> › {c.crumb}</p>
          <h1 id="hero-h" style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,4.6vw,2.4rem)', fontWeight: 700, lineHeight: 1.2, color: '#fff', margin: '0 0 .9rem' }}>{c.h1}</h1>
          <p className="hero-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,.92)', margin: 0 }}>{c.lead}</p>
        </div>
      </header>

      <article style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1.25rem' }}>
        {c.sections.map((s) => (
          <section key={s.h} style={{ marginBottom: '1.8rem' }}>
            <h2 style={{ fontFamily: serif, fontSize: '1.35rem', color: C.ink, margin: '0 0 .8rem', lineHeight: 1.25 }}>{s.h}</h2>
            {s.p?.map((t) => <p key={t} style={{ margin: '0 0 .8rem' }}>{t}</p>)}
            {s.ul && <ul style={{ margin: '0 0 .8rem', paddingInlineStart: '1.2rem' }}>{s.ul.map((x) => <li key={x} style={{ marginBottom: '.3rem' }}>{x}</li>)}</ul>}
          </section>
        ))}

        <section style={{ marginBottom: '1.8rem' }}>
          <h2 style={{ fontFamily: serif, fontSize: '1.35rem', color: C.ink, margin: '0 0 .8rem', lineHeight: 1.25 }}>{c.faqTitle}</h2>
          {c.faq.map(([q, a]) => (
            <div key={q} style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.02rem', color: C.ink, margin: '0 0 .25rem' }}>{q}</h3>
              <p style={{ margin: 0 }}>{a}</p>
            </div>
          ))}
        </section>

        <p style={{ margin: '0 0 1.5rem', fontSize: '.88rem', color: C.muted }}>{c.note}</p>

        <section style={{ background: C.sand, borderRadius: 8, padding: '1.3rem' }}>
          <p style={{ margin: '0 0 1rem' }}>
            <a href={waLink(c.wa)} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '.8rem 1.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: 4, display: 'inline-block' }}>
              💬 {c.cta}
            </a>
          </p>
          <p style={{ margin: '0 0 .6rem', fontSize: '.92rem' }}>
            <a href={URLS.tekstil.en} hrefLang="en" style={{ color: C.green, fontWeight: 600 }}>{c.tekstilLabel}</a>
          </p>
          <p style={{ margin: 0, fontSize: '.88rem', color: C.muted }}>
            {c.langsLabel}:{' '}
            {PROMO_ALL.filter((x) => x.code !== lang).map((x, i) => (
              <span key={x.code}>{i > 0 && ' · '}<Link href={x.path} hrefLang={x.hreflang} style={{ color: C.green }}>{x.name}</Link></span>
            ))}
          </p>
        </section>
      </article>
    </main>
  );
}
