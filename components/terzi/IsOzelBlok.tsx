import { isOzel } from '@/lib/is-ozel';

/** Küçük dillerde iş rehberine işe özel fiyat, süre ve ipuçları (lib/is-ozel.ts). Diğer dillerde hiçbir şey göstermez. */
export default function IsOzelBlok({ lang, id, ink, accent }: { lang: string; id: string; ink: string; accent: string }) {
  const o = isOzel(lang, id);
  if (!o) return null;
  const name = o.name;
  return (
    <section style={{ marginBottom: '1.8rem', border: `1px solid ${accent}33`, borderInlineStart: `4px solid ${accent}`, borderRadius: 8, padding: '1rem 1.1rem' }}>
      <h2 style={{ fontSize: '1.25rem', color: ink, margin: '0 0 .7rem', lineHeight: 1.25 }}>{name}: {o.h.charAt(0).toLocaleLowerCase(lang) + o.h.slice(1)}</h2>
      <p style={{ margin: '0 0 .4rem' }}><strong>{o.priceL} ({name}):</strong> {o.price}.</p>
      <p style={{ margin: '0 0 .8rem' }}><strong>{o.timeL} ({name}):</strong> {o.time}.</p>
      <h3 style={{ fontSize: '1.02rem', color: ink, margin: '0 0 .4rem' }}>{o.tipsH}: {name}</h3>
      <ul style={{ margin: 0, paddingInlineStart: '1.2rem' }}>{o.tips.map((t) => <li key={t} style={{ marginBottom: '.3rem' }}>{t}</li>)}</ul>
    </section>
  );
}
