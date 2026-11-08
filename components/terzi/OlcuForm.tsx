'use client';
// swaphubs.com — Ölçü formu (istemci). Girilen ölçülerden hazır WhatsApp mesajı üretir; hiçbir veri sunucuya gönderilmez.
import { useMemo, useState } from 'react';
import { OLCU, OLCU_ROW_COUNT, type OlcuLang } from '@/lib/intl-olcu';
import { waUrl } from '@/lib/business';

const BORDER = '#d9d2c4';
const INK = '#1C1814';

export default function OlcuForm({ lang }: { lang: OlcuLang }) {
  const c = OLCU[lang];
  const f = c.form;
  const [who, setWho] = useState<'woman' | 'man'>('woman');
  const [vals, setVals] = useState<string[]>(() => Array.from({ length: OLCU_ROW_COUNT }, () => ''));
  const [product, setProduct] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');

  const message = useMemo(() => {
    const lines: string[] = [f.head];
    lines.push(`${f.who}: ${who === 'woman' ? f.woman : f.man}`);
    c.rows.forEach((r, i) => {
      const v = vals[i].replace(',', '.').trim();
      if (v) lines.push(`${r[0]}: ${v} ${f.unit}`);
    });
    if (product.trim()) lines.push(`${f.product} ${product.trim()}`);
    if (country.trim()) lines.push(`${f.country}: ${country.trim()}`);
    if (notes.trim()) lines.push(`${f.notes}: ${notes.trim()}`);
    return lines.join('\n');
  }, [c, f, who, vals, product, country, notes]);

  const hasValues = vals.some((v) => v.trim() !== '');
  const input = { width: '100%', padding: '.55rem .7rem', border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: '1rem', color: INK, background: '#fff', boxSizing: 'border-box' } as const;
  const label = { display: 'block', fontSize: '.85rem', fontWeight: 600, color: INK, marginBottom: '.25rem' } as const;
  const rtl = lang === 'ar';

  return (
    <form onSubmit={(e) => e.preventDefault()} dir={rtl ? 'rtl' : 'ltr'} lang={lang} style={{ display: 'grid', gap: '.9rem' }}>
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={label}>{f.who}</legend>
        <label style={{ marginInlineEnd: '1.2rem' }}>
          <input type="radio" name="olcu-who" checked={who === 'woman'} onChange={() => setWho('woman')} /> {f.woman}
        </label>
        <label>
          <input type="radio" name="olcu-who" checked={who === 'man'} onChange={() => setWho('man')} /> {f.man}
        </label>
      </fieldset>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '.8rem' }}>
        {c.rows.map((r, i) => (
          <div key={r[0]}>
            <label htmlFor={`olcu-${lang}-${i}`} style={label}>{r[0]} ({f.unit})</label>
            <input
              id={`olcu-${lang}-${i}`} type="text" inputMode="decimal" autoComplete="off" dir="ltr" style={input}
              value={vals[i]} onChange={(e) => setVals((p) => p.map((x, k) => (k === i ? e.target.value : x)))}
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor={`olcu-${lang}-p`} style={label}>{f.product}</label>
        <input id={`olcu-${lang}-p`} type="text" style={input} value={product} placeholder={f.productPh} onChange={(e) => setProduct(e.target.value)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '.8rem' }}>
        <div>
          <label htmlFor={`olcu-${lang}-c`} style={label}>{f.country}</label>
          <input id={`olcu-${lang}-c`} type="text" style={input} value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div>
          <label htmlFor={`olcu-${lang}-n`} style={label}>{f.notes}</label>
          <input id={`olcu-${lang}-n`} type="text" style={input} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

      <div>
        <a
          href={waUrl(message)} target="_blank" rel="noopener noreferrer"
          style={{ background: '#15803d', color: '#fff', padding: '.8rem 1.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.95rem', borderRadius: 4, display: 'inline-block' }}
        >
          💬 {f.send}
        </a>
        {!hasValues && <p style={{ margin: '.6rem 0 0', fontSize: '.85rem', color: '#5a4f45' }}>{f.empty}</p>}
        <p style={{ margin: '.6rem 0 0', fontSize: '.8rem', color: '#5a4f45' }}>{f.privacy}</p>
      </div>
    </form>
  );
}
