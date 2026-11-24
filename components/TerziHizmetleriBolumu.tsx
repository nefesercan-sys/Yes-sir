// Bölge sayfalarında ortak "Antalya'da terzi hizmetlerimiz" bölümü (10 dil). Metin: lib/terzi-hizmet-listesi.ts
import { HIZMET_LISTESI, HIZMET_IDS, type HLang } from '@/lib/terzi-hizmet-listesi';
import type { CSSProperties } from 'react';
import { SERVICES, serviceUrl } from '@/lib/seo-data';

const LINKED = ['tr', 'en', 'ru', 'de'];

export default function TerziHizmetleriBolumu({ lang }: { lang: string }) {
  const L = (lang in HIZMET_LISTESI ? lang : 'en') as HLang;
  const c = HIZMET_LISTESI[L];
  const href = (i: number): string | null => {
    const id = HIZMET_IDS[i];
    if (!id || LINKED.indexOf(L) < 0) return null;
    const s = SERVICES.find((x) => x.id === id);
    return s ? serviceUrl(L as 'tr' | 'en' | 'ru' | 'de', s) : null;
  };
  const chip: CSSProperties = { display: 'inline-block', padding: '.35rem .8rem', borderRadius: 999, border: '1px solid rgba(127,127,127,.4)', fontSize: '.92rem', lineHeight: 1.4, color: 'inherit', textDecoration: 'none' };
  return (
    <section aria-labelledby="terzi-hizmetleri-h" dir={L === 'ar' ? 'rtl' : undefined} style={{ maxWidth: 900, margin: '0 auto', padding: '1.6rem 1.2rem' }}>
      <h2 id="terzi-hizmetleri-h" style={{ fontSize: '1.35rem', margin: '0 0 .5rem' }}>{c.h}</h2>
      <p style={{ margin: '0 0 .9rem', opacity: 0.85 }}>{c.intro}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
        {c.items.map((t, i) => {
          const h = href(i);
          return <li key={t}>{h ? <a href={h} style={chip}>{t}</a> : <span style={chip}>{t}</span>}</li>;
        })}
      </ul>
      <p style={{ margin: '.8rem 0 0', fontSize: '.88rem', opacity: 0.75 }}>{c.note}</p>
    </section>
  );
}
