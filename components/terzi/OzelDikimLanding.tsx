// swaphubs.com — "Siparişe özel dikim, dünyaya kargo" sayfası (10 dil). Veri: lib/ozel-dikim.ts. Sunucu bileşeni; talep formu istemci bileşenidir.
// Yapay zeka/sesli arama için: kısa cevap + telefon (düz metin) + tel: + önceden doldurulmuş wa.me.
import Link from 'next/link';
import { PHONE, PHONE_TEL, SITE, BUSINESS_ID } from '@/lib/seo-data';
import { WA_NUMBER } from '@/lib/business';
import { OZEL, OZEL_ALL, OZEL_META, ozelUrl, type OzelLang } from '@/lib/ozel-dikim';
import { ONLINE_PATH } from '@/lib/intl-online';
import { OG_DEFAULT, UPDATED } from '@/components/terzi/IntlLanding';
import { jsonLdString } from '@/lib/json-ld';
import OzelDikimForm from '@/components/terzi/OzelDikimForm';
import { konuLanguages } from '@/lib/intl-konu';

const C = { green: '#2C4A3E', gold: '#D4B07A', cream: '#FAF7F2', sand: '#F2EDE4', ink: '#1C1814', muted: '#6B5F53' };
const serif = 'Georgia,serif';
const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
const HOME: Record<OzelLang, string> = { tr: '/terzi', en: '/terzi', de: '/terzi', ru: '/terzi', es: '/terzi', fr: '/terzi', pl: '/terzi', uk: '/terzi', nl: '/terzi', ar: '/terzi' };
const ONLINE_LABEL: Record<OzelLang, string> = {
  tr: 'Online terzi hizmeti', en: 'Online tailor service', de: 'Online-Schneiderservice', ru: 'Онлайн-ателье', es: 'Sastrería online', fr: 'Couture en ligne', pl: 'Internetowy serwis krawiecki', uk: 'Онлайн-ательє', nl: 'Online kleermakersservice', ar: 'خدمة الخياط عبر الإنترنت',
};

const SVC_LABEL: Record<OzelLang, string> = {
  tr: 'Antalya\'da özel dikim hizmeti', en: 'Custom tailoring in Antalya', de: 'Maßanfertigung in Antalya', ru: 'Индивидуальный пошив в Анталье', es: 'Confección a medida en Antalya', fr: 'Confection sur mesure à Antalya', pl: 'Szycie na miarę w Antalyi', uk: 'Індивідуальний пошив в Анталії', nl: 'Maatwerk in Antalya', ar: 'التفصيل الخاص في أنطاليا',
};
const svcHref = (l: OzelLang) => (konuLanguages('ozel')[OZEL_META[l].hreflang] ?? '').replace(SITE, '');

export function ozelJsonLd(lang: OzelLang) {
  const c = OZEL[lang];
  const url = `${SITE}${ozelUrl(lang)}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title, description: c.desc, inLanguage: lang,
        dateModified: UPDATED, about: { '@id': BUSINESS_ID }, primaryImageOfPage: { '@type': 'ImageObject', url: OG_DEFAULT },
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
        '@type': 'Service', '@id': `${url}#service`, name: c.svcName, description: c.svcDesc, url, inLanguage: lang,
        serviceType: 'Made-to-measure clothing', provider: { '@id': BUSINESS_ID },
        areaServed: [{ '@type': 'City', name: 'Antalya' }, { '@type': 'Place', name: 'International shipping' }],
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: url, servicePhone: { '@type': 'ContactPoint', telephone: PHONE_TEL, contactType: 'customer service', availableLanguage: ['tr', 'en', 'ru', 'de', 'es', 'fr', 'pl', 'uk', 'nl', 'ar'] } },
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
}

export default function OzelDikimLanding({ lang }: { lang: OzelLang }) {
  const c = OZEL[lang]; const m = OZEL_META[lang];
  const btn = { background: '#15803d', color: '#fff', padding: '.8rem 1.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: 4, display: 'inline-block' } as const;
  const h2 = { fontFamily: serif, fontSize: '1.35rem', color: C.ink, margin: '0 0 .8rem', lineHeight: 1.25 } as const;
  return (
    <main lang={lang} dir={m.dir} style={{ fontFamily: 'system-ui,sans-serif', background: C.cream, color: '#3A3028', minHeight: '100vh', lineHeight: 1.7 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ozelJsonLd(lang)) }} />

      <header style={{ background: C.green, padding: '3rem 1.25rem 2.4rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ margin: '0 0 .8rem', fontSize: '.85rem' }}><Link href={HOME[lang]} style={{ color: C.gold }}>{c.back}</Link></p>
          <h1 id="hero-h" style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,4.6vw,2.4rem)', fontWeight: 700, lineHeight: 1.2, color: '#fff', margin: '0 0 .9rem' }}>{c.h1}</h1>
          <p className="hero-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,.92)', margin: 0 }}>{c.lead}</p>
        </div>
      </header>

      <article style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1.25rem' }}>
        <section className="short-answer" style={{ background: C.sand, borderRadius: 8, padding: '1.1rem 1.2rem', marginBottom: '1.6rem' }}>
          <p style={{ margin: '0 0 .8rem' }}>{c.short}</p>
          <p style={{ margin: 0 }}>
            <a href={waLink(c.wa)} target="_blank" rel="noopener noreferrer" style={btn}>💬 {c.cta}</a>
            {' '}<a href={`tel:${PHONE_TEL}`} style={{ color: C.green, fontWeight: 700, marginInlineStart: '.6rem' }}>{c.callLine}: {PHONE}</a>
          </p>
        </section>

        {c.sections.map((s) => (
          <section key={s.h} style={{ marginBottom: '1.8rem' }}>
            <h2 style={h2}>{s.h}</h2>
            {s.p?.map((t) => <p key={t} style={{ margin: '0 0 .8rem' }}>{t}</p>)}
            {s.ul && <ul style={{ margin: '0 0 .8rem', paddingInlineStart: '1.2rem' }}>{s.ul.map((x) => <li key={x} style={{ marginBottom: '.3rem' }}>{x}</li>)}</ul>}
          </section>
        ))}

        <section style={{ marginBottom: '1.8rem' }}>
          <h2 style={h2}>{c.stepsH}</h2>
          <ol style={{ margin: 0, paddingInlineStart: '1.3rem' }}>{c.steps.map((x) => <li key={x} style={{ marginBottom: '.4rem' }}>{x}</li>)}</ol>
        </section>

        <section id="form" style={{ marginBottom: '1.8rem' }}>
          <h2 style={h2}>{c.form.h}</h2>
          <p style={{ margin: '0 0 .8rem' }}>{c.form.intro}</p>
          <OzelDikimForm f={c.form} wa={WA_NUMBER} />
        </section>

        <section style={{ marginBottom: '1.8rem' }}>
          <h2 style={h2}>{c.faqTitle}</h2>
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
            <a href={waLink(c.wa)} target="_blank" rel="noopener noreferrer" style={btn}>💬 {c.cta}</a>
            {' '}<a href={`tel:${PHONE_TEL}`} style={{ color: C.green, fontWeight: 700, marginInlineStart: '.6rem' }}>{PHONE}</a>
          </p>
          <p style={{ margin: '0 0 .6rem', fontSize: '.92rem' }}>
            {c.more}: <Link href={ONLINE_PATH[lang]} hrefLang={m.hreflang} style={{ color: C.green, fontWeight: 600 }}>{ONLINE_LABEL[lang]}</Link>
            {svcHref(lang) && <> · <Link href={svcHref(lang)} hrefLang={m.hreflang} style={{ color: C.green, fontWeight: 600 }}>{SVC_LABEL[lang]}</Link></>}
          </p>
          <p style={{ margin: 0, fontSize: '.88rem', color: C.muted }}>
            {OZEL_ALL.filter((x) => x !== lang).map((x, i) => (
              <span key={x}>{i > 0 && ' · '}<Link href={ozelUrl(x)} hrefLang={OZEL_META[x].hreflang} style={{ color: C.green }}>{OZEL_META[x].name}</Link></span>
            ))}
          </p>
        </section>
      </article>
    </main>
  );
}
