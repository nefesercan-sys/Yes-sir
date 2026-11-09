// Can Beauty Studio — güzellik sayfası (10 dil). Sunucu bileşeni; tek ortak şablon, metinler lib/guzellik.ts'te.
// Terzi sayfalarına/şemasına bağlantı veya referans içermez.
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { jsonLdString, faqPageSchema } from '@/lib/json-ld';
import {
  G, G_AREAS, G_BRAND, G_HOURS_CLOSE, G_HOURS_OPEN, G_ID, G_LOCALE, G_NAMES, G_PHONE, G_PHONE_TEL, G_UI, GLANGS, SVC_IDS,
  type SvcId,
  gAbs, gLanguages, gUrl, gWa, type GLang,
} from '@/lib/guzellik';
import { SUB, subPath } from '@/lib/guzellik-sub';
import { G_SUB_DST_IDS, G_SUB_LANGS, G_SUB_SVC_IDS, type GSubLang } from '@/lib/guzellik-slugs';
import GuzellikForm from './GuzellikForm';

export const ROBOTS = { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 } };

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
        description: `${c.svcDesc} ${c.campaign}`,
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

// Tasarım: inci pembesi zemin, koyu erik vurgu, antik altın çizgi; ayna kemeri (arch) motifi. Saf CSS/SVG, ek font veya görsel yok.
export const CSS = `
.gz{--bg:#fbf6f7;--sf:#ffffff;--tx:#2a1622;--mu:#6a5560;--bd:#ead9df;--pl:#6b1d4a;--plt:#f3e3ea;--gd:#8a6420;--gdl:#c9a45c;--wa:#15803d;--hero1:#f7e6ee;--hero2:#fbf6f7;--hero3:#f3e7d0;--bar:#ffffffee;color-scheme:light;background:var(--bg);color:var(--tx);font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;line-height:1.65}
.dark .gz{--bg:#150e13;--sf:#201720;--tx:#f7eef3;--mu:#cdb9c3;--bd:#43303b;--pl:#f0b4d2;--plt:#33202c;--gd:#d9b36a;--gdl:#d9b36a;--wa:#15803d;--hero1:#2d1626;--hero2:#150e13;--hero3:#2b2216;--bar:#201720ee;color-scheme:dark}
.gz{overflow-x:clip}
.gz *{box-sizing:border-box}
.gz svg{display:block;flex:none}
.gz-wrap{max-width:960px;margin:0 auto;padding:0 16px 6.5rem}
.gz h1,.gz h2,.gz h3{font-family:'Iowan Old Style','Palatino Linotype',Palatino,Georgia,'Times New Roman',serif;font-weight:700;letter-spacing:-.01em}
.gz[dir=rtl] h1,.gz[dir=rtl] h2,.gz[dir=rtl] h3{font-family:system-ui,-apple-system,'Segoe UI',Tahoma,sans-serif;letter-spacing:0}
.gz h2{font-size:clamp(1.3rem,3.6vw,1.65rem);line-height:1.25;margin:2.6rem 0 .7rem}
.gz h3{font-size:1.1rem;line-height:1.3;margin:0}
.gz p{margin:.4rem 0}
.gz-hero{display:grid;grid-template-areas:'arch' 'txt';gap:1rem;margin:0 -16px;padding:1.25rem 16px 1.8rem;background:linear-gradient(135deg,var(--hero1) 0%,var(--hero2) 55%,var(--hero3) 100%);border-bottom:1px solid var(--bd)}
.gz-hero-txt{grid-area:txt;max-width:36rem}
.gz-crumb{font-size:.85rem;color:var(--mu);margin:0 0 .5rem}
.gz h1{font-size:clamp(1.75rem,6.4vw,2.7rem);line-height:1.12;margin:.2rem 0 .8rem}
.gz-sub{font-size:1.05rem;color:var(--tx);max-width:34rem}
.gz-btns{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.1rem}
.gz-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:48px;text-decoration:none;font-weight:700;border-radius:999px;padding:.7rem 1.4rem;color:#fff;background:var(--wa);border:2px solid var(--wa);cursor:pointer;font-size:1rem;font-family:inherit;transition:transform .15s ease,box-shadow .15s ease}
.gz-btn:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(21,128,61,.28)}
.gz-call{background:transparent;color:var(--pl);border-color:var(--pl)}
.gz-call:hover{box-shadow:0 6px 16px rgba(107,29,74,.18)}
.gz-tr{display:flex;align-items:flex-start;gap:.5rem;font-size:.9rem;color:var(--mu);margin-top:1rem;max-width:34rem}
.gz-tr svg{color:var(--gd);margin-top:.2rem}
.gz-arch{grid-area:arch;position:relative;width:64px;height:82px;border-radius:999px 999px 10px 10px;border:2px solid var(--gdl);box-shadow:0 0 0 5px var(--hero2),0 0 0 6px var(--gdl);background:radial-gradient(circle at 50% 30%,#ffffffcc 0%,transparent 55%),linear-gradient(180deg,var(--plt),var(--hero1));display:flex;align-items:center;justify-content:center;margin:.35rem 0;margin-inline-start:.35rem;color:var(--gd)}
.dark .gz-arch{background:radial-gradient(circle at 50% 30%,#ffffff22 0%,transparent 55%),linear-gradient(180deg,var(--plt),var(--hero1))}
.gz-mono{font-family:'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif;font-size:1.5rem;font-weight:700;color:var(--gd);letter-spacing:.02em}
.gz-star{position:absolute;color:var(--gdl);animation:gz-tw 3.2s ease-in-out infinite}
.gz-star.a{top:-12px;inset-inline-end:-14px}
.gz-star.b{bottom:12px;inset-inline-start:-14px;animation-delay:1.4s}
@keyframes gz-tw{0%,100%{opacity:.35;transform:scale(.85)}50%{opacity:1;transform:scale(1)}}
.gz-trust{list-style:none;margin:1.4rem 0 0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem}
.gz-trust li{display:flex;align-items:center;gap:.6rem;background:var(--sf);border:1px solid var(--bd);border-radius:12px;padding:.7rem .8rem;font-size:.93rem;font-weight:600}
.gz-trust svg{color:var(--pl)}
.gz-ans{margin:1.4rem 0 0;background:var(--sf);border:1px solid var(--bd);border-inline-start:4px solid var(--gdl);border-radius:12px;padding:1rem 1.15rem}
.gz-ans p{margin:0}
.gz-grid-svc{list-style:none;margin:1rem 0 0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:.9rem}
.gz-grid-svc>li{flex:1 1 250px;max-width:380px;display:flex}
.gz-grid-svc>li>.gz-card{width:100%}
.gz-card{display:flex;flex-direction:column;height:100%;background:var(--sf);border:1px solid var(--bd);border-radius:16px;overflow:hidden;transition:border-color .15s ease,transform .15s ease}
.gz-img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;background:var(--plt)}
.gz-cb{display:flex;flex-direction:column;gap:.55rem;flex:1;padding:1rem 1.1rem 1.1rem}
.gz-ch{display:flex;align-items:center;gap:.7rem}
.gz-imgnote{font-size:.85rem;color:var(--mu);margin:.9rem 0 0;text-align:center}
.gz-card:hover,.gz-card:focus-within{border-color:var(--gdl);transform:translateY(-2px)}
.gz-ic{width:40px;height:40px;flex:none;border-radius:12px;background:var(--plt);color:var(--pl);display:flex;align-items:center;justify-content:center}
.gz-card p{color:var(--mu);font-size:.95rem;margin:0;flex:1}
.gz-ask{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;min-height:44px;margin-top:.4rem;border-radius:999px;background:var(--wa);color:#fff;text-decoration:none;font-weight:700;font-size:.95rem;padding:.55rem 1rem;border:2px solid var(--wa)}
.gz-ask:hover{box-shadow:0 6px 16px rgba(21,128,61,.28)}
.gz-steps{list-style:none;counter-reset:gz;margin:1rem 0 0;padding:0;display:grid;gap:0}
.gz-steps li{counter-increment:gz;position:relative;padding-inline-start:3.1rem;padding-bottom:1.2rem;margin:0}
.gz-steps li::before{content:counter(gz);position:absolute;inset-inline-start:0;top:0;width:2.2rem;height:2.2rem;border-radius:50%;border:2px solid var(--gdl);background:var(--sf);color:var(--gd);font-weight:700;display:flex;align-items:center;justify-content:center;font-family:'Iowan Old Style',Georgia,serif}
.gz-steps li::after{content:'';position:absolute;inset-inline-start:1.1rem;top:2.3rem;bottom:.1rem;width:2px;background:var(--bd)}
.gz-steps li{min-height:3.4rem}
.gz-steps li:last-child{padding-bottom:0;min-height:0}
.gz-steps li:last-child::after{display:none}
.gz-place{display:flex;gap:.8rem;align-items:flex-start;background:var(--plt);border-radius:14px;padding:1rem 1.1rem}
.gz-place svg{color:var(--pl);margin-top:.15rem}
.gz-place p{margin:0}
.gz-form{background:var(--sf);border:1px solid var(--bd);border-radius:16px;padding:1.1rem;display:grid;gap:1rem}
.gz-fs{border:0;padding:0;margin:0;min-width:0}
.gz-fs legend{font-weight:700;margin-bottom:.5rem;padding:0}
.gz-chips{display:flex;flex-wrap:wrap;gap:.5rem}
.gz-chip{border:2px solid var(--bd);border-radius:999px;min-height:44px;padding:.35rem .95rem;cursor:pointer;display:inline-flex;align-items:center;gap:.5rem;background:var(--bg);font-weight:600}
.gz-chip input{width:1.05rem;height:1.05rem;accent-color:var(--pl);margin:0}
.gz-chip.on{border-color:var(--pl);background:var(--plt);color:var(--tx)}
.gz-chip.on::before{content:'\\2713';font-weight:700;color:var(--pl)}
.gz-g2{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:.9rem}
.gz-f{display:grid;gap:.3rem;font-size:.95rem}
.gz-f span{font-weight:600}
.gz-f select,.gz-f input,.gz-f textarea{font:inherit;color:var(--tx);background:var(--bg);border:1px solid var(--mu);border-radius:10px;padding:.65rem .7rem;width:100%;min-height:46px}
.gz-hint{font-size:.88rem;color:var(--mu);margin:0}
.gz details{background:var(--sf);border:1px solid var(--bd);border-radius:12px;padding:.2rem 1rem;margin:.55rem 0}
.gz summary{font-weight:700;cursor:pointer;min-height:44px;display:flex;align-items:center;padding:.4rem 0}
.gz details[open] summary{color:var(--pl)}
.gz details p{margin:0 0 .8rem;color:var(--tx)}
.gz-langs{display:flex;flex-wrap:wrap;gap:.5rem;list-style:none;padding:0;margin:.8rem 0 0}
.gz-langs a{color:var(--pl);border:1px solid var(--bd);background:var(--sf);border-radius:999px;padding:.5rem .95rem;min-height:44px;display:inline-flex;align-items:center;text-decoration:none;font-weight:600}
.gz-bar{position:fixed;inset-inline:0;bottom:0;z-index:50;display:flex;gap:.6rem;padding:.6rem 12px calc(.6rem + env(safe-area-inset-bottom));background:var(--bar);border-top:1px solid var(--bd)}
.gz-bar .gz-btn{flex:1;min-height:48px;padding:.5rem .8rem}
.gz a:focus-visible,.gz button:focus-visible,.gz input:focus-visible,.gz select:focus-visible,.gz textarea:focus-visible,.gz summary:focus-visible{outline:3px solid var(--pl);outline-offset:2px}
@media (min-width:768px){
.gz-wrap{padding-bottom:4rem}
.gz-hero{grid-template-areas:'txt arch';grid-template-columns:1fr auto;align-items:center;gap:2rem;margin:0 -16px;padding:2.4rem 32px 2.6rem;border-radius:0 0 28px 28px}
.gz-arch{width:190px;height:240px;margin:.5rem 1rem .5rem 0;justify-self:center}
.gz-mono{font-size:2.6rem}
.gz-trust{grid-template-columns:repeat(4,minmax(0,1fr))}
.gz-bar{display:none}
}
@media (max-width:520px){.gz-btns .gz-btn{flex:1 1 100%}}
@media (prefers-reduced-motion:reduce){.gz-star{animation:none;opacity:.8}.gz-btn,.gz-card{transition:none}.gz-btn:hover,.gz-card:hover{transform:none}}
`;

const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const Svg = ({ d, size = 24, children }: { d?: string; size?: number; children?: ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...P}>{d ? <path d={d} /> : children}</svg>
);
export const ICONS: Record<SvcId, ReactNode> = {
  hair: <Svg d="M4 8c3-3 5 3 8 0s5 3 8 0M4 14c3-3 5 3 8 0s5 3 8 0M4 20c3-3 5 3 8 0s5 3 8 0" />,
  nails: <Svg d="M8 11h8v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8zM10 11V6h4v5M11 3h2v3h-2z" />,
  brows: <Svg><path d="M2 14c3-5 7-7 10-7s7 2 10 7c-3 5-7 7-10 7S5 19 2 14z" /><circle cx="12" cy="14" r="3" /><path d="M5 5c4-2 10-2 14 0" /></Svg>,
  makeup: <Svg d="M8 21v-7h8v7H8zM9.5 14v-4h5v4M10 10l4-6v6" />,
  bridal: <Svg d="M6 4h12l3 5-9 11L3 9zM3 9h18M9 4L7 9l5 11 5-11-2-5" />,
  skin: <Svg d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  wax: <Svg d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />,
};
export const IC_PIN = <Svg d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />;
export const IC_CLOCK = <Svg><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>;
export const IC_GLOBE = <Svg><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></Svg>;
export const IC_CHAT = <Svg d="M4 20l1.4-4.2A8 8 0 1 1 8.2 18.6L4 20z" />;
export const IC_PHONE = <Svg d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />;
export const IC_CHECK = <Svg size={18} d="M5 12.5l4.5 4.5L19 7.5" />;
export const IC_STAR = <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" /></svg>;
const TRUST_ICONS = [IC_PIN, IC_CLOCK, IC_GLOBE, IC_CHAT];
// Temsilî (yapay zekâ ile üretilmiş) hizmet görselleri: /public/guzellik/*.webp. Gerçek boyutlar width/height için; kırpma konumu yüzleri korur.
export const IMG: Record<SvcId, { f: string; w: number; h: number; pos: string }> = {
  hair: { f: 'sac', w: 425, h: 309, pos: 'center 22%' },
  nails: { f: 'tirnak', w: 489, h: 238, pos: 'center 50%' },
  brows: { f: 'kas-kirpik', w: 489, h: 220, pos: 'center 45%' },
  makeup: { f: 'makyaj', w: 424, h: 304, pos: 'center 25%' },
  bridal: { f: 'gelin', w: 370, h: 469, pos: 'center 30%' },
  skin: { f: 'cilt-bakimi', w: 489, h: 223, pos: 'center 40%' },
  wax: { f: 'agda', w: 370, h: 223, pos: 'center 40%' },
};

export default function GuzellikPage({ lang }: { lang: GLang }) {
  const c = G[lang];
  const ui = G_UI[lang];
  const services = SVC_IDS.map((id) => ({ id, name: c.svc[id].name }));
  const subLang = (G_SUB_LANGS as string[]).includes(lang) ? (lang as GSubLang) : null;
  return (
    <main className="gz" lang={lang} dir={c.rtl ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema(lang)) }} />
      <div className="gz-wrap">
        <header className="gz-hero">
          <div className="gz-arch" aria-hidden="true">
            <span className="gz-mono">CB</span>
            <span className="gz-star a">{IC_STAR}</span>
            <span className="gz-star b">{IC_STAR}</span>
          </div>
          <div className="gz-hero-txt">
            <p className="gz-crumb">{G_BRAND} › {c.crumb}</p>
            <h1>{c.h1}</h1>
            <p className="gz-sub">{ui.sub}</p>
            <div className="gz-btns">
              <a className="gz-btn" href={gWa(c.ctaMsg)} target="_blank" rel="noopener noreferrer">{IC_CHAT}{c.cta}</a>
              <a className="gz-btn gz-call" href={`tel:${G_PHONE_TEL}`} dir="ltr">{IC_PHONE}{c.call}: {G_PHONE}</a>
            </div>
            <p className="gz-tr">{IC_CHECK}<span>{c.transparency}</span></p>
          </div>
        </header>

        <ul className="gz-trust" aria-label={G_BRAND}>
          {ui.trust.map((t, i) => (<li key={t}>{TRUST_ICONS[i]}<span>{t}</span></li>))}
        </ul>

        <section className="gz-ans short-answer" aria-label={c.crumb}>
          <p>{c.lead}</p>
        </section>

        <h2>{c.svcH}</h2>
        <p>{c.svcIntro}</p>
        <ul className="gz-grid-svc">
          {SVC_IDS.map((id) => (
            <li key={id}>
              <article className="gz-card">
                <img
                  className="gz-img"
                  src={`/guzellik/${IMG[id].f}.webp`}
                  width={IMG[id].w}
                  height={IMG[id].h}
                  style={{ objectPosition: IMG[id].pos }}
                  alt={ui.imgAlt.replace('{s}', c.svc[id].name)}
                  loading="lazy"
                  decoding="async"
                />
                <div className="gz-cb">
                  <div className="gz-ch"><div className="gz-ic">{ICONS[id]}</div><h3>{c.svc[id].name}</h3></div>
                  <p>{c.svc[id].text}</p>
                  <a className="gz-ask" href={gWa(c.askMsg.replace('{s}', c.svc[id].name))} target="_blank" rel="noopener noreferrer">{IC_CHAT}{c.ask}</a>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="gz-imgnote">{ui.imgNote}</p>

        <h2>{c.stepsH}</h2>
        <ol className="gz-steps">{c.steps.map((s) => (<li key={s}>{s}</li>))}</ol>

        {subLang && (
          <>
            <h2>{SUB[subLang].ui.svcLinksH}</h2>
            <ul className="gz-langs">
              {G_SUB_SVC_IDS.map((id) => (<li key={id}><a href={subPath({ kind: 'svc', id, lang: subLang })}>{SUB[subLang].svc[id].crumb}</a></li>))}
            </ul>
            <h2>{SUB[subLang].ui.allDst}</h2>
            <ul className="gz-langs">
              {G_SUB_DST_IDS.map((id) => (<li key={id}><a href={subPath({ kind: 'dst', id, lang: subLang })}>{SUB[subLang].dst[id].name}</a></li>))}
            </ul>
          </>
        )}

        <h2>{c.placeH}</h2>
        <div className="gz-place">{IC_PIN}<div>{c.place.slice(1).map((p) => (<p key={p}>{p}</p>))}</div></div>

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

      <div className="gz-bar">
        <a className="gz-btn" href={gWa(c.ctaMsg)} target="_blank" rel="noopener noreferrer">{IC_CHAT}WhatsApp</a>
        <a className="gz-btn gz-call" href={`tel:${G_PHONE_TEL}`} dir="ltr">{IC_PHONE}{c.call}</a>
      </div>
    </main>
  );
}
