// swaphubs.com — Otel bölgesi derinlik sayfası (ES/FR/PL/UK/NL/AR). Veri: lib/intl-zones.ts. Sunucu bileşeni, stil inline.
import OrnekGorselSeridi from '@/components/terzi/OrnekGorselSeridi';
import Link from 'next/link';
import { PHONE, PHONE_TEL, MAPS, SITE, BUSINESS_ID } from '@/lib/seo-data';
import { INTL, iUrl, type ILang } from '@/lib/intl';
import { ZCOPY, ZONE_SLUGS, ZONE_LEAD_ALT, zoneData, zoneUrl, type ZoneSlug } from '@/lib/intl-zones';
import { OG_DEFAULT, UPDATED } from '@/components/terzi/IntlLanding';
import { pick, pickN } from '@/lib/bolge-icerik';
import { jsonLdString } from '@/lib/json-ld';

const C = { green: '#2C4A3E', gold: '#D4B07A', cream: '#FAF7F2', sand: '#F2EDE4', ink: '#1C1814', muted: '#6B5F53', line: 'rgba(44,74,62,.15)' };
const serif = 'Georgia,serif';
const waLink = (text: string) => `https://wa.me/${PHONE_TEL.replace('+', '')}?text=${encodeURIComponent(text)}`;

export function zoneJsonLd(lang: ILang, zone: ZoneSlug) {
  const z = zoneData(lang, zone); const c = ZCOPY[lang];
  const url = `${SITE}${zoneUrl(lang, zone)}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title(z.name), description: c.desc(z.name), inLanguage: lang,
        dateModified: UPDATED, about: { '@id': BUSINESS_ID }, primaryImageOfPage: { '@type': 'ImageObject', url: OG_DEFAULT },
        isPartOf: { '@id': `${SITE}${iUrl(lang)}#article` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#hero-h', '.hero-desc'] },
      },
      {
        '@type': 'Service', '@id': `${url}#service`, serviceType: 'Clothing alterations and tailoring', name: c.h1(z.name),
        provider: { '@id': BUSINESS_ID }, areaServed: { '@type': 'Place', name: `${z.name}, Antalya` }, inLanguage: lang,
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: url, servicePhone: PHONE_TEL },
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: zoneFaq(c.faq(z.name, z.home), `${lang}:${zone}`).map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };
}

// SSS: ilk iki soru (servis + süre) her bölgede; kalan havuzdan bölgeye göre deterministik 2 soru
export function zoneFaq(all: [string, string][], seed: string): [string, string][] {
  return [...all.slice(0, 2), ...pickN(`zfaq:${seed}`, all.slice(2), 2)];
}

export default function ZoneLanding({ lang, zone }: { lang: ILang; zone: ZoneSlug }) {
  const g = INTL[lang]; const c = ZCOPY[lang]; const z = zoneData(lang, zone);
  return (
    <main lang={lang} dir={g.dir} style={{ fontFamily: 'system-ui,sans-serif', background: C.cream, color: '#3A3028', minHeight: '100vh', lineHeight: 1.7 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(zoneJsonLd(lang, zone)) }} />

      <header style={{ background: C.green, padding: '3rem 1.25rem 2.4rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ margin: '0 0 .8rem', fontSize: '.85rem' }}><Link href={iUrl(lang)} style={{ color: C.gold }}>{c.back}</Link></p>
          <h1 id="hero-h" style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,4.6vw,2.4rem)', fontWeight: 700, lineHeight: 1.2, color: '#fff', margin: '0 0 .9rem' }}>{c.h1(z.name)}</h1>
          <p className="hero-desc" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,.92)', margin: 0 }}>{pick(`zlead:${lang}:${zone}`, [c.lead, ...ZONE_LEAD_ALT[lang]])(z.name)}</p>
        </div>
      </header>

      <article style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1.25rem' }}>
        <section style={{ marginBottom: '1.8rem' }}>
          <H2>{c.aboutTitle(z.name)}</H2>
          <p style={{ margin: '0 0 .8rem' }}>{z.blurb}</p>
          <p style={{ margin: '0 0 .8rem' }}>{z.note}</p>
          {z.hotels.length > 0 && (
            <p style={{ margin: 0, color: C.muted, fontSize: '.92rem' }}><strong>{c.hotelsLabel}:</strong> {z.hotels.slice(0, 8).join(' · ')}</p>
          )}
        </section>

        <section style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 8, padding: '1.2rem 1.3rem', marginBottom: '1.8rem' }}>
          <H2>{c.howTitle}</H2>
          <p style={{ margin: 0 }}>{c.how(z.name, z.home)}</p>
        </section>

        <section style={{ marginBottom: '1.8rem' }}>
          <H2>{c.faqTitle}</H2>
          {zoneFaq(c.faq(z.name, z.home), `${lang}:${zone}`).map(([q, a]) => (
            <div key={q} style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.02rem', color: C.ink, margin: '0 0 .25rem' }}>{q}</h3>
              <p style={{ margin: 0 }}>{a}</p>
            </div>
          ))}
        </section>

        <OrnekGorselSeridi lang={lang} tema="acik" anahtarlar={['eve-gelen-terzi', 'erkek-takim-olcu', 'beyaz-gomlek-katli', 'yun-pantolon-metre']} sayfaUrl={`${SITE}${zoneUrl(lang, zone)}`} base={SITE} />

        <section style={{ background: C.sand, borderRadius: 8, padding: '1.3rem' }}>
          <p style={{ margin: '0 0 1rem' }}>
            <a href={waLink(c.wa(z.name))} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '.8rem 1.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: 4, display: 'inline-block' }}>
              💬 {c.cta}
            </a>
          </p>
          <p style={{ margin: '0 0 .8rem', fontSize: '.92rem' }}>
            <a href={`tel:${PHONE_TEL}`} style={{ color: C.green }} dir="ltr">☎ {g.call}: {PHONE}</a>
            {' · '}<a href={MAPS} target="_blank" rel="noopener noreferrer" style={{ color: C.green }}>{g.mapLabel}</a>
          </p>
          <p style={{ margin: 0, fontSize: '.88rem', color: C.muted }}>
            {c.zonesLabel}:{' '}
            {ZONE_SLUGS.filter((s) => s !== zone).map((s, i) => (
              <span key={s}>{i > 0 && ' · '}<Link href={zoneUrl(lang, s)} style={{ color: C.green }}>{zoneData(lang, s).name}</Link></span>
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
