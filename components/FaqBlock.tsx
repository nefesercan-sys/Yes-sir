// Görünür SSS bölümü + aynı metinle FAQPage JSON-LD (şema ile görünen içerik birebir aynı).
export interface FaqItem { q: string; a: string }

export default function FaqBlock({ items, heading = 'Sık Sorulan Sorular' }: { items: FaqItem[]; heading?: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(i => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
  return (
    <section
      id="sik-sorulan-sorular"
      style={{ maxWidth: 900, margin: '32px auto', padding: '0 16px', fontFamily: 'system-ui,-apple-system,sans-serif' }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{heading}</h2>
      {items.map(i => (
        <details key={i.q} style={{ border: '1px solid rgba(128,128,128,.35)', borderRadius: 10, padding: '12px 14px', marginBottom: 8 }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>{i.q}</summary>
          <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.65 }}>{i.a}</p>
        </details>
      ))}
    </section>
  );
}
