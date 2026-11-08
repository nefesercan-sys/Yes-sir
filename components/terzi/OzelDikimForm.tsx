'use client';
// swaphubs.com — Siparişe özel dikim: istemci talep formu. Alanlar doldukça hazır WhatsApp mesajı üretir (sunucuya veri göndermez).
import { useState } from 'react';
import type { OzelForm } from '@/lib/ozel-dikim';

const field = { width: '100%', padding: '.6rem .7rem', border: '1px solid rgba(44,74,62,.35)', borderRadius: 6, fontSize: '1rem', background: '#fff', color: '#1C1814', boxSizing: 'border-box' } as const;
const label = { display: 'block', fontWeight: 600, fontSize: '.9rem', margin: '0 0 .25rem', color: '#1C1814' } as const;

export default function OzelDikimForm({ f, wa }: { f: OzelForm; wa: string }) {
  const [v, setV] = useState({ product: '', fabric: '', measure: '', country: '', model: '', date: '', note: '' });
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }));
  const rows: [string, string][] = [[f.product, v.product], [f.fabric, v.fabric], [f.measure, v.measure], [f.country, v.country], [f.model, v.model], [f.date, v.date], [f.note, v.note]];
  const text = [f.greet, ...rows.filter(([, x]) => x.trim()).map(([k, x]) => `${k}: ${x.trim()}`)].join('\n');
  const href = `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
  const sel = (k: 'product' | 'fabric' | 'measure' | 'model', opts: string[], lab: string) => (
    <div style={{ marginBottom: '.8rem' }}>
      <label style={label} htmlFor={`ozel-${k}`}>{lab}</label>
      <select id={`ozel-${k}`} value={v[k]} onChange={set(k)} style={field}>
        <option value="">—</option>
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ background: '#fff', border: '1px solid rgba(44,74,62,.2)', borderRadius: 8, padding: '1.2rem' }}>
      {sel('product', f.products, f.product)}
      {sel('fabric', f.fabrics, f.fabric)}
      {sel('measure', f.measures, f.measure)}
      {sel('model', f.models, f.model)}
      <div style={{ marginBottom: '.8rem' }}>
        <label style={label} htmlFor="ozel-country">{f.country}</label>
        <input id="ozel-country" type="text" value={v.country} onChange={set('country')} style={field} autoComplete="country-name" />
      </div>
      <div style={{ marginBottom: '.8rem' }}>
        <label style={label} htmlFor="ozel-date">{f.date}</label>
        <input id="ozel-date" type="text" value={v.date} onChange={set('date')} style={field} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={label} htmlFor="ozel-note">{f.note}</label>
        <textarea id="ozel-note" rows={3} value={v.note} onChange={set('note')} style={field} />
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ background: '#15803d', color: '#fff', padding: '.8rem 1.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.95rem', borderRadius: 4, display: 'inline-block' }}>💬 {f.send}</a>
      <p style={{ margin: '.7rem 0 0', fontSize: '.85rem', color: '#6B5F53' }}>{f.hint}</p>
    </form>
  );
}
