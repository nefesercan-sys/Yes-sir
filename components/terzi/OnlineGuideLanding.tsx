// swaphubs.com — "Online terzi hizmeti" sayfası (ES/FR/PL/UK/NL/AR). Veri: lib/intl-online.ts. Sunucu bileşeni.
// Yapay zeka/sesli arama için: kısa cevap + telefon (düz metin) + tel: + önceden doldurulmuş wa.me, sayfanın üstünde ve altında.
import Link from 'next/link';
import { PHONE, PHONE_TEL, MAPS, SITE, BUSINESS_ID } from '@/lib/seo-data';
import { INTL, iUrl, type ILang } from '@/lib/intl';
import { ONL, onlineUrl } from '@/lib/intl-online';
import { OG_DEFAULT, UPDATED } from '@/components/terzi/IntlLanding';
import { jsonLdString } from '@/lib/json-ld';
import KargoSection from '@/components/terzi/KargoSection';
import { OZEL, ozelUrl } from '@/lib/ozel-dikim';

const C = { green: '#2C4A3E', gold: '#D4B07A', cream: '#FAF7F2', sand: '#F2EDE4', ink: '#1C1814' };
const serif = 'Georgia,serif';
const waLink = (text: string) => `https://wa.me/${PHONE_TEL.replace('+', '')}?text=${encodeURIComponent(text)}`;

export function onlineJsonLd(lang: ILang) {
  const c = ONL[lang];
  const url = `${SITE}${onlineUrl(lang)}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title, description: c.desc, inLanguage: lang,
        dateModified: UPDATED, about: { '@id': BUSINESS_ID }, primaryImageOfPage: { '@type': 'ImageObject', url: OG_DEFAULT },
        isPartOf: { '@id': `${SITE}${iUrl(lang)}#article` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hero-h', '.hero-desc', '.short-answer'] },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: `${SITE}/terzi` },
          { '@type': 'ListItem', position: 2, name: c.crumb, item: `${SITE}${iUrl(lang)}` },
          { '@type': 'ListItem', position: 3, name: c.svcName, item: url },
        ],
      },
      {
        '@type': 'Service', '@id': `${url}#service`, name: c.svcName, description: c.svcDesc, url, inLanguage: lang,
        serviceType: 'Tailoring', provider: { '@id': BUSINESS_ID },
        areaServed: { '@type': 'City', name: 'Antalya' },
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: url, servicePhone: { '@type': 'ContactPoint', telephone: PHONE_TEL, contactType: 'customer service', availableLanguage: ['tr', 'en', 'ru', 'de', 'es', 'fr', 'pl', 'uk', 'nl', 'ar'] } },
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
}

export default function OnlineGuideLanding({ lang }: { lang: ILang }) {
  const g = INTL[lang]; const c = ONL[lang];
  const btn = { background: '#15803d', color: '#fff', padding: '.8rem 1.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: 4, display: 'inline-block' } as const;
  return (
    <main lang={lang} dir={g.dir} style={{ fontFamily: 'system-ui,sans-serif', background: C.cream, color: '#3A3028', minHeight: '100vh', lineHeight: 1.7 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(onlineJsonLd(lang)) }} />

      <header style={{ background: C.green, padding: '3rem 1.25rem 2.4rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ margin: '0 0 .8rem', fontSize: '.85rem' }}><Link href={iUrl(lang)} style={{ color: C.gold }}>{c.back}</Link></p>
          <h1 id="hero-h" style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,4.6vw,2.4rem)', fontWeight: 700, lineHeight: 1.2, color: '#fff', margin: '0 0 .9rem' }}>{c.h1}</h1>
          <p className="hero-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,.92)', margin: '0 0 1.1rem' }}>{c.lead}</p>
          <p style={{ margin: 0 }}>
            <a href={waLink(c.wa)} target="_blank" rel="noopener noreferrer" style={btn}>💬 {c.cta}</a>
            {' '}<a href={`tel:${PHONE_TEL}`} dir="ltr" style={{ color: '#fff', fontWeight: 700, marginInlineStart: '.8rem', display: 'inline-block' }}>☎ {PHONE}</a>
          </p>
        </div>
      </header>

      <article style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1.25rem' }}>
        <p className="short-answer" style={{ background: C.sand, borderRadius: 8, padding: '1rem 1.2rem', margin: '0 0 1.8rem', color: C.ink }}>{c.short}</p>

        {c.sections.map((s) => (
          <section key={s.h} style={{ marginBottom: '1.8rem' }}>
            <h2 style={{ fontFamily: serif, fontSize: '1.35rem', color: C.ink, margin: '0 0 .8rem', lineHeight: 1.25 }}>{s.h}</h2>
            {s.p.map((t) => <p key={t} style={{ margin: '0 0 .8rem' }}>{t}</p>)}
          </section>
        ))}

        <section style={{ marginBottom: '1.8rem' }}>
          <h2 style={{ fontFamily: serif, fontSize: '1.35rem', color: C.ink, margin: '0 0 .8rem', lineHeight: 1.25 }}>{c.stepsH}</h2>
          <ol style={{ margin: 0, paddingInlineStart: '1.3rem' }}>
            {c.steps.map((s) => <li key={s} style={{ marginBottom: '.4rem' }}>{s}</li>)}
          </ol>
        </section>

        <KargoSection lang={lang} compact />

        <section style={{ marginBottom: '1.8rem' }}>
          <h2 style={{ fontFamily: serif, fontSize: '1.35rem', color: C.ink, margin: '0 0 .8rem', lineHeight: 1.25 }}>{c.faqTitle}</h2>
          {c.faq.map(([q, a]) => (
            <div key={q} style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.02rem', color: C.ink, margin: '0 0 .25rem' }}>{q}</h3>
              <p style={{ margin: 0 }}>{a}</p>
            </div>
          ))}
        </section>

        <section style={{ background: C.sand, borderRadius: 8, padding: '1.3rem' }}>
          <h2 style={{ fontFamily: serif, fontSize: '1.15rem', color: C.ink, margin: '0 0 .7rem' }}>{c.contactH}</h2>
          <p style={{ margin: '0 0 1rem' }}><a href={waLink(c.wa)} target="_blank" rel="noopener noreferrer" style={btn}>💬 {c.cta}</a></p>
          <p style={{ margin: '0 0 .8rem', fontSize: '.92rem' }}><Link href={ozelUrl(lang)} style={{ color: C.green, fontWeight: 600 }}>{OZEL[lang].crumb}</Link></p>
          <p style={{ margin: 0, fontSize: '.92rem' }}>
            <a href={`tel:${PHONE_TEL}`} style={{ color: C.green }} dir="ltr">☎ {c.callLine}: {PHONE}</a>
            {' · '}<a href={MAPS} target="_blank" rel="noopener noreferrer" style={{ color: C.green }}>{g.mapLabel}</a>
          </p>
        </section>
      </article>
    </main>
  );
}
