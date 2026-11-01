// swaphubs.com — Ek turist dilleri için rehber sayfası (veri: lib/intl.ts). Sunucu bileşeni, stil inline.
// terzihizmeti.com.tr'deki tanıtım sayfalarından farklı: bilgi niyetli rehber (sorunlar, hazırlık listesi, adımlar, SSS).
import OrnekGorselSeridi from '@/components/terzi/OrnekGorselSeridi';
import Link from 'next/link';
import { PHONE, PHONE_TEL, MAPS, SITE, BUSINESS_ID } from '@/lib/seo-data';
import { ILANGS, INTL, NB, NB_DISTRICT, iUrl, type ILang } from '@/lib/intl';
import { ZCOPY, ZONE_SLUGS, zoneData, zoneUrl } from '@/lib/intl-zones';
import { SVCG, svcgUrl } from '@/lib/intl-svc';
import { jsonLdString } from '@/lib/json-ld';

const C = { green: '#2C4A3E', gold: '#D4B07A', cream: '#FAF7F2', sand: '#F2EDE4', ink: '#1C1814', muted: '#6B5F53', line: 'rgba(44,74,62,.15)' };
const serif = 'Georgia,serif';
export const UPDATED = '2026-10-29';
export const OG_DEFAULT = `${SITE}/swaphubs-og.jpg`;
const waLink = (text: string) => `https://wa.me/${PHONE_TEL.replace('+', '')}?text=${encodeURIComponent(text)}`;

export function intlJsonLd(lang: ILang) {
  const c = INTL[lang];
  const url = `${SITE}${iUrl(lang)}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', '@id': `${url}#article`, headline: c.h1, description: c.desc, url, inLanguage: lang,
        dateModified: UPDATED, image: OG_DEFAULT, mainEntityOfPage: url,
        author: { '@type': 'Organization', name: 'SwapHubs', url: SITE }, publisher: { '@type': 'Organization', name: 'SwapHubs', url: SITE },
        about: { '@id': BUSINESS_ID },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hero-h', '.hero-desc'] },
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
}

export default function IntlLanding({ lang }: { lang: ILang }) {
  const c = INTL[lang];
  const wa = waLink(c.wa);
  return (
    <main lang={lang} dir={c.dir} style={{ fontFamily: 'system-ui,sans-serif', background: C.cream, color: '#3A3028', minHeight: '100vh', lineHeight: 1.7 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(intlJsonLd(lang)) }} />

      <header style={{ background: C.green, padding: '3rem 1.25rem 2.4rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ fontSize: '.7rem', letterSpacing: '.16em', textTransform: 'uppercase', color: C.gold, marginBottom: '.8rem' }}>{c.tag}</div>
          <h1 id="hero-h" style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,4.6vw,2.5rem)', fontWeight: 700, lineHeight: 1.2, color: '#fff', margin: '0 0 .9rem' }}>{c.h1}</h1>
          <p className="hero-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,.92)', margin: '0 0 .8rem' }}>{c.lead}</p>
          <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.7)', margin: 0 }}>{c.updated}: {UPDATED}</p>
        </div>
      </header>

      <article style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1.25rem' }}>
        {c.sections.map((s) => (
          <section key={s.h} style={{ marginBottom: '1.8rem' }}>
            <H2>{s.h}</H2>
            {s.p.map((t, i) => <p key={i} style={{ margin: '0 0 .8rem' }}>{t}</p>)}
          </section>
        ))}

        <section style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 8, padding: '1.2rem 1.3rem', marginBottom: '1.8rem' }}>
          <H2>{c.checklistTitle}</H2>
          <ul style={{ margin: 0, paddingInlineStart: '1.2rem' }}>{c.checklist.map((x) => <li key={x} style={{ marginBottom: '.35rem' }}>{x}</li>)}</ul>
        </section>

        <section style={{ marginBottom: '1.8rem' }}>
          <H2>{c.stepsTitle}</H2>
          <ol style={{ margin: 0, paddingInlineStart: '1.3rem' }}>{c.steps.map((x) => <li key={x} style={{ marginBottom: '.5rem' }}>{x}</li>)}</ol>
        </section>

        <section style={{ marginBottom: '1.8rem' }}>
          <H2>{c.faqTitle}</H2>
          {c.faq.map(([q, a]) => (
            <div key={q} style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.02rem', color: C.ink, margin: '0 0 .25rem' }}>{q}</h3>
              <p style={{ margin: 0 }}>{a}</p>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: '1.8rem' }}>
          <H2>{NB[lang].title}</H2>
          <p style={{ margin: '0 0 1rem' }}>{NB[lang].text}</p>
          <h3 style={{ fontSize: '1.02rem', color: C.ink, margin: '0 0 .25rem' }}>{NB_DISTRICT[lang].title}</h3>
          <p style={{ margin: 0 }}>{NB_DISTRICT[lang].text}</p>
        </section>

        <section style={{ marginBottom: '1.8rem' }}>
          <p style={{ margin: 0 }}><Link href={svcgUrl(lang)} style={{ color: C.green, fontWeight: 600 }}>{SVCG[lang].h1}</Link></p>
        </section>

        <section style={{ marginBottom: '1.8rem' }}>
          <H2>{ZCOPY[lang].zonesLabel}</H2>
          <p style={{ margin: 0 }}>
            {ZONE_SLUGS.filter((z) => z !== 'antalya').map((z, i) => (
              <span key={z}>{i > 0 && ' · '}<Link href={zoneUrl(lang, z)} style={{ color: C.green }}>{zoneData(lang, z).name}</Link></span>
            ))}
          </p>
        </section>

        <OrnekGorselSeridi konu={'terziFp'} lang={lang} tema="acik" anahtarlar={['eve-gelen-terzi', 'abiye-elbise-atolye', 'erkek-takim-olcu', 'yun-pantolon-metre']} sayfaUrl={`${SITE}${iUrl(lang)}`} base={SITE} />

        <section style={{ background: C.sand, borderRadius: 8, padding: '1.3rem' }}>
          <H2>{c.providerTitle}</H2>
          <p style={{ margin: '0 0 1rem' }}>{c.providerText}</p>
          <p style={{ margin: '0 0 1rem' }}>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '.8rem 1.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: 4, display: 'inline-block' }}>
              💬 {c.cta}
            </a>
          </p>
          <p style={{ margin: '0 0 .6rem', fontSize: '.92rem' }}>
            <Link href="/terzi" style={{ color: C.green, fontWeight: 600 }}>{c.providerLink}</Link>
            {' · '}<a href={`tel:${PHONE_TEL}`} style={{ color: C.green }} dir="ltr">☎ {c.call}: {PHONE}</a>
            {' · '}<a href={MAPS} target="_blank" rel="noopener noreferrer" style={{ color: C.green }}>{c.mapLabel}</a>
          </p>
          <p style={{ margin: 0, fontSize: '.88rem', color: C.muted }}>
            {c.otherLangs}:{' '}
            {ILANGS.filter((l) => l !== lang).map((l, i) => (
              <span key={l}>{i > 0 && ' · '}<Link href={iUrl(l)} hrefLang={INTL[l].hreflang} style={{ color: C.green }}>{INTL[l].name}</Link></span>
            ))}
          </p>
        </section>
      </article>
    </main>
  );
}

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: serif, fontSize: '1.35rem', color: C.ink, margin: '0 0 .8rem', lineHeight: 1.25 }}>{children}</h2>
);
