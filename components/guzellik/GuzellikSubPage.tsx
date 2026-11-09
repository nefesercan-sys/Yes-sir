// Can Beauty Studio — hizmet ve bölge alt sayfası (tr/en/de/ru). Sunucu bileşeni; ortak şablon, metinler lib/guzellik-sub-data/*.json.
// Fiyat, salon adı, tıbbi iddia ve ev/otel hizmeti beyanı yok. SSS: görünen liste ve FAQPage şeması aynı diziden.
import type { Metadata } from 'next';
import { jsonLdString, faqPageSchema } from '@/lib/json-ld';
import {
  G, G_BRAND, G_ID, G_LOCALE, G_NAMES, G_PHONE, G_PHONE_TEL, SVC_IDS, gAbs, gUrl, gWa,
} from '@/lib/guzellik';
import { G_SUB_DST_IDS, G_SUB_LANGS, G_SUB_SVC_IDS, type GSubKind } from '@/lib/guzellik-slugs';
import { SUB, subAbs, subAlternates, subPath } from '@/lib/guzellik-sub';
import GuzellikForm from './GuzellikForm';
import { CSS, IC_CHAT, IC_CHECK, IC_PHONE, IC_PIN, ICONS, ROBOTS } from './GuzellikPage';

const EXTRA = `.gz-list{margin:.6rem 0 0;padding-inline-start:1.2rem;display:grid;gap:.45rem}.gz-list li{padding-inline-start:.2rem}.gz-crumb a{color:inherit;text-decoration:none}.gz-langs svg{width:18px;height:18px;vertical-align:-3px}`;

function meta(k: GSubKind) {
  const d = SUB[k.lang];
  return k.kind === 'svc' ? d.svc[k.id] : d.dst[k.id];
}

export function guzellikSubMetadata(k: GSubKind): Metadata {
  const m = meta(k);
  const url = subAbs(k);
  return {
    metadataBase: new URL('https://swaphubs.com'),
    title: { absolute: m.title },
    description: m.desc,
    robots: ROBOTS,
    alternates: { canonical: url, languages: subAlternates(k) },
    openGraph: {
      title: m.title, description: m.desc, url, siteName: G_BRAND, locale: G_LOCALE[k.lang],
      alternateLocale: G_SUB_LANGS.filter((l) => l !== k.lang).map((l) => G_LOCALE[l]), type: 'website',
    },
    twitter: { card: 'summary', title: m.title, description: m.desc },
    other: { 'geo.region': 'TR-07', 'geo.placename': 'Antalya' },
  };
}

function schema(k: GSubKind) {
  const m = meta(k);
  const d = SUB[k.lang];
  const url = subAbs(k);
  const main = G[k.lang];
  const isSvc = k.kind === 'svc';
  const name = isSvc ? d.svc[k.id].name : d.dst[k.id].name;
  const area = isSvc ? { '@type': 'City', name: 'Antalya' } : { '@type': 'AdministrativeArea', name: d.dst[k.id].name };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: m.h1,
        description: m.desc,
        serviceType: isSvc ? name : main.svcName,
        provider: { '@id': G_ID },
        areaServed: [area],
        inLanguage: k.lang,
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: `${G_BRAND} — ${main.crumb}`, item: gAbs(k.lang) },
          { '@type': 'ListItem', position: 2, name: m.crumb, item: url },
        ],
      },
      faqPageSchema(m.faq),
    ],
  };
}

export default function GuzellikSubPage({ k }: { k: GSubKind }) {
  const lang = k.lang;
  const d = SUB[lang];
  const c = G[lang];
  const ui = d.ui;
  const isSvc = k.kind === 'svc';
  const svc = isSvc ? d.svc[k.id] : null;
  const dst = !isSvc ? d.dst[k.id] : null;
  const m = meta(k);
  const msg = isSvc ? ui.waSvc.replace('{s}', d.svc[k.id].name) : ui.waDst.replace('{s}', d.dst[k.id].name);
  const services = SVC_IDS.map((id) => ({ id, name: c.svc[id].name }));
  const otherSvc = G_SUB_SVC_IDS.filter((id) => !(isSvc && k.id === id));
  const otherDst = G_SUB_DST_IDS.filter((id) => !(!isSvc && k.id === id));
  return (
    <main className="gz" lang={lang}>
      <style dangerouslySetInnerHTML={{ __html: CSS + EXTRA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema(k)) }} />
      <div className="gz-wrap">
        <header className="gz-hero">
          <div className="gz-arch" aria-hidden="true"><span className="gz-mono">CB</span></div>
          <div className="gz-hero-txt">
            <p className="gz-crumb"><a href={gUrl(lang)}>{G_BRAND} › {c.crumb}</a> › {m.crumb}</p>
            <h1>{m.h1}</h1>
            <div className="gz-btns">
              <a className="gz-btn" href={gWa(msg)} target="_blank" rel="noopener noreferrer">{IC_CHAT}{c.cta}</a>
              <a className="gz-btn gz-call" href={`tel:${G_PHONE_TEL}`} dir="ltr">{IC_PHONE}{c.call}: {G_PHONE}</a>
            </div>
            <p className="gz-tr">{IC_CHECK}<span>{ui.rule}</span></p>
          </div>
        </header>

        <section className="gz-ans short-answer" aria-label={m.crumb}>
          <p>{m.lead}</p>
        </section>

        {svc && (
          <>
            <h2>{svc.fitH}</h2>
            <ul className="gz-list">{svc.fit.map((t) => (<li key={t}>{t}</li>))}</ul>
            <h2>{svc.expectH}</h2>
            <ul className="gz-list">{svc.expect.map((t) => (<li key={t}>{t}</li>))}</ul>
          </>
        )}
        {dst && (
          <>
            <h2>{dst.whoH}</h2>
            <div className="gz-place">{IC_PIN}<div><p>{dst.who}</p></div></div>
            <h2>{dst.popH}</h2>
            <ul className="gz-list">{dst.pop.map((t) => (<li key={t}>{t}</li>))}</ul>
          </>
        )}

        <h2>{ui.svcLinksH}</h2>
        <ul className="gz-langs">
          {otherSvc.map((id) => (
            <li key={id}><a href={subPath({ kind: 'svc', id, lang })}>{ICONS[id]}&nbsp;{d.svc[id].crumb}</a></li>
          ))}
        </ul>

        <h2>{isSvc ? ui.dstLinksH : ui.allDst}</h2>
        <ul className="gz-langs">
          {otherDst.map((id) => (
            <li key={id}><a href={subPath({ kind: 'dst', id, lang })}>{d.dst[id].name}</a></li>
          ))}
          <li><a href={gUrl(lang)}>{ui.mainLink}</a></li>
        </ul>

        <h2>{c.formH}</h2>
        <GuzellikForm form={c.form} services={services} helloMsg={c.form.msgHello} />

        <h2>{ui.faqH}</h2>
        {m.faq.map(([q, a]) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}

        <h2>{ui.langH}</h2>
        <ul className="gz-langs">
          {G_SUB_LANGS.filter((l) => l !== lang).map((l) => (
            <li key={l}><a href={subPath({ ...k, lang: l } as GSubKind)} hrefLang={l} lang={l}>{G_NAMES[l]}</a></li>
          ))}
        </ul>
      </div>

      <div className="gz-bar">
        <a className="gz-btn" href={gWa(msg)} target="_blank" rel="noopener noreferrer">{IC_CHAT}WhatsApp</a>
        <a className="gz-btn gz-call" href={`tel:${G_PHONE_TEL}`} dir="ltr">{IC_PHONE}{c.call}</a>
      </div>
    </main>
  );
}
