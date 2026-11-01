// swaphubs.com — Hizmetler, kumaşlar ve yurt dışı sipariş rehberi (ES/FR/PL/UK/NL/AR). Veri: lib/intl-svc.ts. Sunucu bileşeni, stil inline.
import OrnekGorselSeridi from '@/components/terzi/OrnekGorselSeridi';
import Link from 'next/link';
import { PHONE, PHONE_TEL, MAPS, SITE, BUSINESS_ID } from '@/lib/seo-data';
import { INTL, iUrl, type ILang } from '@/lib/intl';
import { SVCG, svcgUrl } from '@/lib/intl-svc';
import { KONU, KONU_IDS, KONU_UI, konuUrl, type KonuId } from '@/lib/intl-konu';
import { HZ, HZ_IDS, HZ_UI, hzUrl, type HzId } from '@/lib/intl-hz';
import { OG_DEFAULT, UPDATED } from '@/components/terzi/IntlLanding';
import { jsonLdString } from '@/lib/json-ld';

const C = { green: '#2C4A3E', gold: '#D4B07A', cream: '#FAF7F2', sand: '#F2EDE4', ink: '#1C1814', muted: '#6B5F53', line: 'rgba(44,74,62,.15)' };
const serif = 'Georgia,serif';
const waLink = (text: string) => `https://wa.me/${PHONE_TEL.replace('+', '')}?text=${encodeURIComponent(text)}`;

export function konuJsonLd(lang: ILang, t: KonuId | HzId, isHz = false) {
  const c = isHz ? HZ[lang][t as HzId] : KONU[lang][t as KonuId];
  const url = `${SITE}${isHz ? hzUrl(lang, t as HzId) : konuUrl(lang, t as KonuId)}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title, description: c.desc, inLanguage: lang,
        dateModified: UPDATED, about: { '@id': BUSINESS_ID }, primaryImageOfPage: { '@type': 'ImageObject', url: OG_DEFAULT },
        isPartOf: { '@id': `${SITE}${iUrl(lang)}#article` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hero-h', '.hero-desc'] },
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
}

export default function KonuGuideLanding({ lang, topic, hz }: { lang: ILang; topic?: KonuId; hz?: HzId }) {
  const g = INTL[lang]; const c = hz ? HZ[lang][hz] : KONU[lang][topic as KonuId]; const ui = hz ? { ...KONU_UI[lang], ...HZ_UI[lang] } : KONU_UI[lang];
  return (
    <main lang={lang} dir={g.dir} style={{ fontFamily: 'system-ui,sans-serif', background: C.cream, color: '#3A3028', minHeight: '100vh', lineHeight: 1.7 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(konuJsonLd(lang, (hz ?? topic) as KonuId | HzId, !!hz)) }} />

      <header style={{ background: C.green, padding: '3rem 1.25rem 2.4rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ margin: '0 0 .8rem', fontSize: '.85rem' }}><Link href={iUrl(lang)} style={{ color: C.gold }}>{ui.back}</Link></p>
          <h1 id="hero-h" style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,4.6vw,2.4rem)', fontWeight: 700, lineHeight: 1.2, color: '#fff', margin: '0 0 .9rem' }}>{c.h1}</h1>
          <p className="hero-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,.92)', margin: 0 }}>{c.lead}</p>
        </div>
      </header>

      <article style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1.25rem' }}>
        {c.sections.map((s) => (
          <section key={s.h} style={{ marginBottom: '1.8rem' }}>
            <h2 style={{ fontFamily: serif, fontSize: '1.35rem', color: C.ink, margin: '0 0 .8rem', lineHeight: 1.25 }}>{s.h}</h2>
            {s.p.map((t) => <p key={t} style={{ margin: '0 0 .8rem' }}>{t}</p>)}
          </section>
        ))}

        <section style={{ marginBottom: '1.8rem' }}>
          <h2 style={{ fontFamily: serif, fontSize: '1.35rem', color: C.ink, margin: '0 0 .8rem', lineHeight: 1.25 }}>{ui.faqTitle}</h2>
          {c.faq.map(([q, a]) => (
            <div key={q} style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.02rem', color: C.ink, margin: '0 0 .25rem' }}>{q}</h3>
              <p style={{ margin: 0 }}>{a}</p>
            </div>
          ))}
        </section>

        <OrnekGorselSeridi konu={'hizmetFp'} lang={lang} tema="acik" anahtarlar={['erkek-takim-olcu', 'abiye-elbise-atolye', 'yun-pantolon-metre', 'beyaz-gomlek-katli', 'palto-yaka-detay', 'pilili-etek']} sayfaUrl={`${SITE}${hz ? hzUrl(lang, hz) : konuUrl(lang, topic as KonuId)}`} base={SITE} />

        <section style={{ background: C.sand, borderRadius: 8, padding: '1.3rem' }}>
          <p style={{ margin: '0 0 1rem' }}>
            <a href={waLink(c.wa)} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '.8rem 1.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: 4, display: 'inline-block' }}>
              💬 {ui.cta}
            </a>
          </p>
          <p style={{ margin: '0 0 .8rem', fontSize: '.9rem' }}><strong>{ui.more}:</strong>{' '}
            <Link href={svcgUrl(lang)} style={{ color: C.green }}>{SVCG[lang].h1}</Link>
            {KONU_IDS.filter((x) => x !== topic).map((x) => <span key={x}>{' · '}<Link href={konuUrl(lang, x)} style={{ color: C.green }}>{KONU[lang][x].h1}</Link></span>)}
          </p>
          <p style={{ margin: 0, fontSize: '.92rem' }}>
            <a href={`tel:${PHONE_TEL}`} style={{ color: C.green }} dir="ltr">☎ {g.call}: {PHONE}</a>
            {' · '}<a href={MAPS} target="_blank" rel="noopener noreferrer" style={{ color: C.green }}>{g.mapLabel}</a>
          </p>
        </section>
      </article>
    </main>
  );
}
