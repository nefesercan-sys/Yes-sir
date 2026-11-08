// swaphubs.com — "Evde ölçü nasıl alınır?" rehberi (10 dil). Veri: lib/intl-olcu.ts. Sunucu bileşeni + istemci formu.
// Yapay zeka/sesli arama için: kısa cevap + telefon (düz metin) + tel: + önceden doldurulmuş wa.me, sayfanın üstünde ve altında.
import type { Metadata } from 'next';
import Link from 'next/link';
import { PHONE, PHONE_TEL, SITE, BUSINESS_ID } from '@/lib/seo-data';
import { OLCU, OLCU_PATH, OLCU_LOCALE, OZEL_DIKIM_PATH, olcuLanguages, type OlcuLang } from '@/lib/intl-olcu';
import { ONLINE_PATH } from '@/lib/intl-online';
import { iUrl } from '@/lib/intl';
import { jsonLdString } from '@/lib/json-ld';
import { waUrl } from '@/lib/business';
import OlcuForm from '@/components/terzi/OlcuForm';

export const OLCU_UPDATED = '2026-11-08';
export const OLCU_OG = `${SITE}/swaphubs-og.jpg`;

const C = { green: '#2C4A3E', gold: '#D4B07A', cream: '#FAF7F2', sand: '#F2EDE4', ink: '#1C1814' };
const serif = 'Georgia,serif';

const HUB_PATH: Record<OlcuLang, string> = {
  tr: '/terzi',
  en: '/en/hotel-tailor-antalya',
  de: '/de/schneider-service-hotel-antalya',
  ru: '/ru/vyezdnoy-portnoy-antalya',
  es: iUrl('es'), fr: iUrl('fr'), pl: iUrl('pl'), uk: iUrl('uk'), nl: iUrl('nl'), ar: iUrl('ar'),
};

const ROBOTS = { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 } };

/** Tek yerden metadata: canonical, 10 dilli hreflang + x-default, OG/Twitter. */
export function olcuMetadata(lang: OlcuLang): Metadata {
  const c = OLCU[lang];
  const url = `${SITE}${OLCU_PATH[lang]}`;
  return {
    metadataBase: new URL(SITE),
    title: { absolute: c.title },
    description: c.desc,
    robots: ROBOTS,
    alternates: { canonical: url, languages: olcuLanguages(SITE) },
    openGraph: { title: c.title, description: c.desc, url, siteName: 'Terzi Can', locale: OLCU_LOCALE[lang], type: 'article', images: [{ url: OLCU_OG, width: 1200, height: 630, alt: c.h1 }] },
    twitter: { card: 'summary_large_image', title: c.title, description: c.desc, images: [OLCU_OG] },
  };
}

export function olcuJsonLd(lang: OlcuLang) {
  const c = OLCU[lang];
  const url = `${SITE}${OLCU_PATH[lang]}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title, description: c.desc, inLanguage: lang,
        dateModified: OLCU_UPDATED, about: { '@id': BUSINESS_ID }, primaryImageOfPage: { '@type': 'ImageObject', url: OLCU_OG },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hero-h', '.hero-desc', '.short-answer'] },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: `${SITE}/terzi` },
          { '@type': 'ListItem', position: 2, name: c.crumb, item: url },
        ],
      },
      {
        '@type': 'HowTo', '@id': `${url}#howto`, name: c.h1, description: c.desc, inLanguage: lang,
        supply: c.tools.slice(0, 2).map((t) => ({ '@type': 'HowToSupply', name: t })),
        tool: [{ '@type': 'HowToTool', name: c.tools[0] }],
        step: c.rows.map((r, i) => ({ '@type': 'HowToStep', position: i + 1, name: r[0], text: `${r[1]} ${r[2]}`, url: `${url}#olcu-tablo` })),
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
}

export default function OlcuGuideLanding({ lang }: { lang: OlcuLang }) {
  const c = OLCU[lang];
  const rtl = lang === 'ar';
  const btn = { background: '#15803d', color: '#fff', padding: '.8rem 1.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: 4, display: 'inline-block' } as const;
  const h2 = { fontFamily: serif, fontSize: '1.35rem', color: C.ink, margin: '0 0 .8rem', lineHeight: 1.25 } as const;
  const sec = { marginBottom: '1.8rem' } as const;
  const th = { textAlign: 'start', padding: '.55rem .7rem', background: C.green, color: '#fff', fontSize: '.85rem' } as const;
  const td = { padding: '.55rem .7rem', borderBottom: '1px solid #e3dccf', verticalAlign: 'top', fontSize: '.92rem' } as const;
  const links = [
    { href: OZEL_DIKIM_PATH[lang], label: c.linkCustom },
    { href: ONLINE_PATH[lang], label: c.linkOnline },
    { href: HUB_PATH[lang], label: c.linkHub },
  ];
  return (
    <main lang={lang} dir={rtl ? 'rtl' : 'ltr'} style={{ fontFamily: 'system-ui,sans-serif', background: C.cream, color: '#3A3028', minHeight: '100vh', lineHeight: 1.7 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(olcuJsonLd(lang)) }} />

      <header style={{ background: C.green, padding: '3rem 1.25rem 2.4rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ margin: '0 0 .8rem', fontSize: '.85rem' }}><Link href={HUB_PATH[lang]} style={{ color: C.gold }}>{c.back}</Link></p>
          <h1 id="hero-h" style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,4.6vw,2.4rem)', fontWeight: 700, lineHeight: 1.2, color: '#fff', margin: '0 0 .9rem' }}>{c.h1}</h1>
          <p className="hero-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,.92)', margin: '0 0 1.1rem' }}>{c.lead}</p>
          <p style={{ margin: 0 }}>
            <a href={waUrl(c.wa)} target="_blank" rel="noopener noreferrer" style={btn}>💬 {c.cta}</a>
            {' '}<a href={`tel:${PHONE_TEL}`} dir="ltr" style={{ color: '#fff', fontWeight: 700, marginInlineStart: '.8rem', display: 'inline-block' }}>☎ {PHONE}</a>
          </p>
        </div>
      </header>

      <article style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem' }}>
        <p className="short-answer" style={{ background: C.sand, borderRadius: 8, padding: '1rem 1.2rem', margin: '0 0 1.8rem', color: C.ink }}>{c.short}</p>

        <section style={sec}>
          <h2 style={h2}>{c.toolsH}</h2>
          <ul style={{ margin: 0, paddingInlineStart: '1.3rem' }}>{c.tools.map((t) => <li key={t} style={{ marginBottom: '.35rem' }}>{t}</li>)}</ul>
        </section>

        <section style={sec}>
          <h2 style={h2}>{c.rulesH}</h2>
          <ol style={{ margin: 0, paddingInlineStart: '1.3rem' }}>{c.rules.map((t) => <li key={t} style={{ marginBottom: '.35rem' }}>{t}</li>)}</ol>
        </section>

        <section style={sec} id="olcu-tablo">
          <h2 style={h2}>{c.tableH}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8 }}>
              <thead><tr>{c.cols.map((h) => <th key={h} style={th} scope="col">{h}</th>)}</tr></thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r[0]}>
                    <th scope="row" style={{ ...td, textAlign: 'start', color: C.ink }}>{r[0]}</th>
                    <td style={td}>{r[1]}</td>
                    <td style={td}>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={sec}>
          <h2 style={h2}>{c.genderH}</h2>
          <p style={{ margin: '0 0 .7rem' }}><strong>{c.womenL}.</strong> {c.women}</p>
          <p style={{ margin: 0 }}><strong>{c.menL}.</strong> {c.men}</p>
        </section>

        <section style={sec}>
          <h2 style={h2}>{c.garmentH}</h2>
          <ol style={{ margin: 0, paddingInlineStart: '1.3rem' }}>{c.garment.map((t) => <li key={t} style={{ marginBottom: '.35rem' }}>{t}</li>)}</ol>
        </section>

        <section style={sec}>
          <h2 style={h2}>{c.mistakesH}</h2>
          <ul style={{ margin: 0, paddingInlineStart: '1.3rem' }}>{c.mistakes.map((t) => <li key={t} style={{ marginBottom: '.35rem' }}>{t}</li>)}</ul>
        </section>

        <section style={sec}>
          <h2 style={h2}>{c.photoH}</h2>
          <ul style={{ margin: 0, paddingInlineStart: '1.3rem' }}>{c.photo.map((t) => <li key={t} style={{ marginBottom: '.35rem' }}>{t}</li>)}</ul>
        </section>

        <section style={{ ...sec, background: '#fff', border: '1px solid #e3dccf', borderRadius: 10, padding: '1.3rem' }} id="olcu-formu">
          <h2 style={h2}>{c.formH}</h2>
          <p style={{ margin: '0 0 1rem', fontSize: '.92rem' }}>{c.formIntro}</p>
          <OlcuForm lang={lang} />
        </section>

        <section style={sec}>
          <h2 style={h2}>{c.nextH}</h2>
          <ul style={{ margin: 0, paddingInlineStart: '1.3rem' }}>{c.next.map((t) => <li key={t} style={{ marginBottom: '.35rem' }}>{t}</li>)}</ul>
        </section>

        <section style={sec}>
          <h2 style={h2}>{c.faqTitle}</h2>
          {c.faq.map(([q, a]) => (
            <div key={q} style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.02rem', color: C.ink, margin: '0 0 .25rem' }}>{q}</h3>
              <p style={{ margin: 0 }}>{a}</p>
            </div>
          ))}
        </section>

        <section style={sec}>
          <h2 style={{ ...h2, fontSize: '1.15rem' }}>{c.linksH}</h2>
          <ul style={{ margin: 0, paddingInlineStart: '1.3rem' }}>
            {links.map((l) => <li key={l.href} style={{ marginBottom: '.3rem' }}><Link href={l.href} style={{ color: C.green }}>{l.label}</Link></li>)}
          </ul>
        </section>

        <section style={{ background: C.sand, borderRadius: 8, padding: '1.3rem' }}>
          <h2 style={{ ...h2, fontSize: '1.15rem' }}>{c.contactH}</h2>
          <p style={{ margin: '0 0 1rem' }}><a href={waUrl(c.wa)} target="_blank" rel="noopener noreferrer" style={btn}>💬 {c.cta}</a></p>
          <p style={{ margin: 0, fontSize: '.92rem' }}>
            <a href={`tel:${PHONE_TEL}`} style={{ color: C.green }} dir="ltr">☎ {c.callLine}: {PHONE}</a>
          </p>
        </section>
      </article>
    </main>
  );
}
