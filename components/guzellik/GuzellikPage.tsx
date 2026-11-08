// Can Beauty Studio — güzellik sayfası (10 dil). Sunucu bileşeni; tek ortak şablon, metinler lib/guzellik.ts'te.
// Terzi sayfalarına/şemasına bağlantı veya referans içermez.
import type { Metadata } from 'next';
import { jsonLdString, faqPageSchema } from '@/lib/json-ld';
import {
  G, G_AREAS, G_BRAND, G_HOURS_CLOSE, G_HOURS_OPEN, G_ID, G_LOCALE, G_NAMES, G_PHONE, G_PHONE_TEL, GLANGS, SVC_IDS,
  gAbs, gLanguages, gUrl, gWa, type GLang,
} from '@/lib/guzellik';
import GuzellikForm from './GuzellikForm';

const ROBOTS = { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 } };

export function guzellikMetadata(lang: GLang): Metadata {
  const c = G[lang];
  const url = gAbs(lang);
  return {
    metadataBase: new URL('https://swaphubs.com'),
    title: { absolute: c.title },
    description: c.desc,
    keywords: c.keywords,
    robots: ROBOTS,
    alternates: { canonical: url, languages: gLanguages() },
    openGraph: {
      title: c.title, description: c.desc, url, siteName: G_BRAND, locale: G_LOCALE[lang],
      alternateLocale: GLANGS.filter((l) => l !== lang).map((l) => G_LOCALE[l]), type: 'website',
    },
    twitter: { card: 'summary', title: c.title, description: c.desc },
    other: { 'geo.region': 'TR-07', 'geo.placename': 'Antalya' },
  };
}

function schema(lang: GLang) {
  const c = G[lang];
  const url = gAbs(lang);
  const areas = G_AREAS.map((a) => ({ '@type': 'AdministrativeArea', name: a }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HealthAndBeautyBusiness',
        '@id': G_ID,
        name: G_BRAND,
        url: gAbs('tr'),
        telephone: G_PHONE_TEL,
        description: c.desc,
        areaServed: [{ '@type': 'City', name: 'Antalya' }, ...areas],
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: G_HOURS_OPEN, closes: G_HOURS_CLOSE,
        }],
        contactPoint: [{ '@type': 'ContactPoint', telephone: G_PHONE_TEL, contactType: 'reservations', availableLanguage: [lang] }],
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: c.svcName,
        description: c.svcDesc,
        serviceType: c.svcName,
        provider: { '@id': G_ID },
        areaServed: [{ '@type': 'City', name: 'Antalya' }, ...areas],
        inLanguage: lang,
        url,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: c.svcH,
          itemListElement: SVC_IDS.map((id) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: c.svc[id].name, description: c.svc[id].text } })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [{ '@type': 'ListItem', position: 1, name: `${G_BRAND} — ${c.crumb}`, item: url }],
      },
      faqPageSchema(c.faq),
    ],
  };
}

const CSS = `
.gz{--bg:#fffaf7;--tx:#2a1f1c;--mu:#5b4a45;--bd:#e8d9d3;--bx:#fbeee9;--ac:#9d174d;--wa:#15803d;--lk:#9d174d;background:var(--bg);color:var(--tx);font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;line-height:1.65}
.dark .gz{--bg:#1b1416;--tx:#f5ecee;--mu:#cdbcc0;--bd:#43343a;--bx:#2a1d21;--ac:#be185d;--wa:#15803d;--lk:#f9a8d4}
.gz *{box-sizing:border-box}
.gz-wrap{max-width:860px;margin:0 auto;padding:1.25rem 16px 4rem}
.gz h1{font-size:clamp(1.55rem,5vw,2.2rem);line-height:1.2;margin:.4rem 0 1rem}
.gz h2{font-size:1.25rem;margin:2rem 0 .6rem}
.gz p{margin:.4rem 0}
.gz-crumb{font-size:.85rem;color:var(--mu)}
.gz-box{background:var(--bx);border:1px solid var(--bd);border-radius:12px;padding:1rem 1.1rem}
.gz-btns{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:.9rem}
.gz-btn{display:inline-block;text-decoration:none;font-weight:700;border-radius:10px;padding:.75rem 1.2rem;color:#fff;background:var(--ac);border:0;cursor:pointer;font-size:1rem}
.gz-wa{background:var(--wa)}
.gz-call{background:transparent;color:var(--lk);border:2px solid var(--lk)}
.gz-note{font-size:.92rem;color:var(--mu)}
.gz ol{padding-inline-start:1.3rem}
.gz li{margin:.35rem 0}
.gz-svc{list-style:none;padding:0;margin:.6rem 0}
.gz-svc li{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem;border:1px solid var(--bd);border-radius:10px;padding:.7rem .9rem;margin:.5rem 0}
.gz-svc b{display:block}
.gz-svc span{color:var(--mu);font-size:.93rem}
.gz-ask{color:var(--lk);font-weight:700;text-decoration:underline}
.gz-form{border:1px solid var(--bd);border-radius:12px;padding:1rem;display:grid;gap:.9rem}
.gz-fs{border:0;padding:0;margin:0}
.gz-fs legend{font-weight:700;margin-bottom:.4rem;padding:0}
.gz-chips{display:flex;flex-wrap:wrap;gap:.5rem}
.gz-chip{border:1px solid var(--bd);border-radius:999px;padding:.4rem .85rem;cursor:pointer;display:inline-flex;align-items:center;gap:.4rem;background:var(--bg)}
.gz-chip.on{border-color:var(--ac);background:var(--bx);font-weight:700}
.gz-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:.8rem}
.gz-f{display:grid;gap:.3rem;font-size:.95rem}
.gz-f span{font-weight:600}
.gz-f select,.gz-f input,.gz-f textarea{font:inherit;color:var(--tx);background:var(--bg);border:1px solid var(--mu);border-radius:8px;padding:.55rem .6rem;width:100%}
.gz-hint{font-size:.88rem;color:var(--mu);margin:0}
.gz details{border:1px solid var(--bd);border-radius:10px;padding:.7rem .9rem;margin:.5rem 0}
.gz summary{font-weight:700;cursor:pointer}
.gz-langs{display:flex;flex-wrap:wrap;gap:.5rem;list-style:none;padding:0}
.gz-langs a{color:var(--lk);border:1px solid var(--bd);border-radius:999px;padding:.25rem .75rem;text-decoration:none;display:inline-block}
.gz a:focus-visible,.gz button:focus-visible,.gz input:focus-visible,.gz select:focus-visible,.gz textarea:focus-visible,.gz summary:focus-visible{outline:3px solid var(--lk);outline-offset:2px}
`;

export default function GuzellikPage({ lang }: { lang: GLang }) {
  const c = G[lang];
  const services = SVC_IDS.map((id) => ({ id, name: c.svc[id].name }));
  return (
    <main className="gz" lang={lang} dir={c.rtl ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema(lang)) }} />
      <div className="gz-wrap">
        <p className="gz-crumb">{G_BRAND} › {c.crumb}</p>
        <h1>{c.h1}</h1>

        <section className="gz-box short-answer" aria-label={c.crumb}>
          <p>{c.lead}</p>
          <p className="gz-note"><strong>{c.transparency}</strong></p>
          <div className="gz-btns">
            <a className="gz-btn gz-wa" href={gWa(c.ctaMsg)} target="_blank" rel="noopener noreferrer">💬 {c.cta}</a>
            <a className="gz-btn gz-call" href={`tel:${G_PHONE_TEL}`} dir="ltr">☎ {c.call}: {G_PHONE}</a>
          </div>
          <p className="gz-note">{c.hours} · {c.priceNote}</p>
        </section>

        <h2>{c.stepsH}</h2>
        <ol>{c.steps.map((s) => (<li key={s}>{s}</li>))}</ol>

        <h2>{c.svcH}</h2>
        <p>{c.svcIntro}</p>
        <ul className="gz-svc">
          {SVC_IDS.map((id) => (
            <li key={id}>
              <div><b>{c.svc[id].name}</b><span>{c.svc[id].text}</span></div>
              <a className="gz-ask" href={gWa(c.askMsg.replace('{s}', c.svc[id].name))} target="_blank" rel="noopener noreferrer">{c.ask}</a>
            </li>
          ))}
        </ul>

        <h2>{c.placeH}</h2>
        {c.place.map((p) => (<p key={p}>{p}</p>))}

        <h2>{c.formH}</h2>
        <GuzellikForm form={c.form} services={services} helloMsg={c.form.msgHello} />

        <h2>{c.faqTitle}</h2>
        {c.faq.map(([q, a]) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}

        <h2>{c.langH}</h2>
        <ul className="gz-langs">
          {GLANGS.filter((l) => l !== lang).map((l) => (
            <li key={l}><a href={gUrl(l)} hrefLang={l} lang={l}>{G_NAMES[l]}</a></li>
          ))}
        </ul>
      </div>
    </main>
  );
}
