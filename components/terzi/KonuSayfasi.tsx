import KargoKisaNot from '@/components/terzi/KargoKisaNot';
import KargoFermuarKutusu from '@/components/terzi/KargoFermuarKutusu';
import Link from 'next/link';
import ReviewsBlock from '@/components/ReviewsBlock';
import QuickActionBanner from '@/components/QuickActionBanner';
import { KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar';
import { jsonLdString } from '@/lib/json-ld';

// Konu odaklı terzi sayfası (deri, kot vb.): görünür içerik = şema içeriği. Tüm bilgiler lib/facts kurallarıyla uyumlu olmalı.
const BASE_URL = 'https://swaphubs.com';
const PARENT = `${BASE_URL}/terzi`;
const PHONE = '+90 531 898 64 18';
const PHONE_E = '+905318986418';
const GBP_URL = 'https://www.google.com/maps?cid=6436895271281342624';
const HOURS = '08:00–23:00';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;
const GREEN = '#2d8c6e', INK = '#1f2a24', TEXT = '#3b4a42', MUTED = '#6b7a72', SOFT = '#f4faf7', BORDER = '#e3ece7';
const FONT = "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export interface KonuData {
  path: string;                 // '/terzi/deri-ceket-tadilati-antalya'
  name: string;                 // breadcrumb + Service adı
  h1: string;
  kisa: string;                 // "Kısa cevap" paragrafı
  waIlk: string;                // WhatsApp mesajı
  facts: [string, string][];    // hızlı bilgi kutuları
  turlerBaslik: string;
  turler: { ic: string; baslik: string; aciklama: string }[];
  fiyatBaslik: string;
  fiyatlar: [string, string][];
  fiyatNot: string;
  lowPrice?: string;            // schema başlangıç fiyatı (yoksa Offer yazılmaz)
  adimlar: { baslik: string; aciklama: string }[];
  faq: { q: string; a: string }[];
  diger: { href: string; ad: string }[];
  ctaBaslik: string;
}

export default function KonuSayfasi({ d, kargoFermuar, kargoKisa }: { d: KonuData; kargoFermuar?: boolean; kargoKisa?: boolean }) {
  const url = `${BASE_URL}${d.path}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service', '@id': `${url}#service`, name: d.name, serviceType: d.name, url, inLanguage: 'tr',
        description: d.kisa,
        areaServed: [{ '@type': 'AdministrativeArea', name: 'Konyaaltı' }, { '@type': 'City', name: 'Antalya' }],
        provider: {
          '@type': ['LocalBusiness', 'ClothingStore'], '@id': `${PARENT}#business`, name: 'TERZİ Can - Konyaaltı', url: PARENT,
          telephone: PHONE_E, hasMap: GBP_URL,
          address: { '@type': 'PostalAddress', addressLocality: 'Konyaaltı', addressRegion: 'Antalya', addressCountry: 'TR' },
          openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '08:00', closes: '23:00' }],
          sameAs: [GBP_URL, `https://wa.me/${PHONE_E.replace('+', '')}`],
        },
        ...(d.lowPrice ? { offers: { '@type': 'Offer', name: `${d.name} (başlangıç fiyatı)`, price: d.lowPrice, priceCurrency: 'TRY', availability: 'https://schema.org/InStock', url } } : {}),
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Antalya Terzi', item: PARENT },
          { '@type': 'ListItem', position: 2, name: d.name, item: url },
        ],
      },
      { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: d.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
  const btnGreen = { display: 'inline-block', background: GREEN, color: '#fff', padding: '.85rem 1.6rem', borderRadius: 10, fontWeight: 700, fontSize: '.95rem', textDecoration: 'none' } as const;
  const btnLine = { display: 'inline-block', background: '#fff', color: INK, padding: '.85rem 1.4rem', borderRadius: 10, fontWeight: 600, fontSize: '.95rem', textDecoration: 'none', border: `1px solid ${BORDER}` } as const;
  const h2 = { fontSize: 'clamp(1.35rem,3vw,1.75rem)', color: INK, margin: '0 0 .6rem', fontWeight: 800, letterSpacing: '-.01em' } as const;
  const wrap = { maxWidth: 960, margin: '0 auto' } as const;
  return (
    <main style={{ fontFamily: FONT, color: TEXT, background: '#fff', lineHeight: 1.65 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <QuickActionBanner lang="tr" />
      <section style={{ background: SOFT, borderBottom: `1px solid ${BORDER}`, padding: '2.2rem 1.25rem 2.6rem' }}>
        <div style={wrap}>
          <nav aria-label="Sayfa yolu" style={{ fontSize: '.8rem', color: MUTED, marginBottom: '1.1rem' }}>
            <Link href="/terzi" style={{ color: MUTED, textDecoration: 'none' }}>Antalya Terzi</Link>{' › '}<span style={{ color: INK }}>{d.name}</span>
          </nav>
          <div style={{ display: 'inline-block', background: '#fff', border: `1px solid ${BORDER}`, color: GREEN, fontSize: '.8rem', fontWeight: 700, padding: '.3rem .8rem', borderRadius: 999, marginBottom: '1rem' }}>🕗 Haftanın her günü {HOURS}</div>
          <h1 style={{ fontSize: 'clamp(2rem,6vw,3rem)', lineHeight: 1.1, color: INK, margin: '0 0 1rem', fontWeight: 800, letterSpacing: '-.02em' }}>{d.h1}</h1>
          <p style={{ fontSize: '1.05rem', maxWidth: 680, margin: '0 0 1.4rem', color: INK }}><strong>Kısa cevap:</strong> {d.kisa}</p>
          <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
            <a href={WA(d.waIlk)} target="_blank" rel="noopener noreferrer" style={btnGreen}>💬 Fotoğraf Gönder, Fiyat Al</a>
            <a href={`tel:${PHONE_E}`} style={btnLine}><span className="ico-tel" aria-hidden="true" /> {PHONE}</a>
          </div>
        </div>
      </section>
      <section style={{ padding: '2rem 1.25rem 0' }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '.8rem' }}>
          {d.facts.map(([k, v]) => (
            <div key={k} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '1rem 1.1rem', background: '#fff' }}>
              <div style={{ fontSize: '.72rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '.25rem' }}>{k}</div>
              <div style={{ fontWeight: 700, color: INK }}>{v}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>{d.turlerBaslik}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '.9rem', marginTop: '1rem' }}>
            {d.turler.map((t) => (
              <div key={t.baslik} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '1.1rem 1.2rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '.3rem' }}>{t.ic}</div>
                <h3 style={{ margin: '0 0 .3rem', fontSize: '1.05rem', color: INK }}>{t.baslik}</h3>
                <p style={{ margin: 0, fontSize: '.92rem' }}>{t.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>{d.fiyatBaslik}</h2>
          <div style={{ border: `1px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden' }}>
            {d.fiyatlar.map(([ad, fiyat], i) => (
              <div key={ad} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '.95rem 1.2rem', background: i % 2 ? SOFT : '#fff', borderTop: i ? `1px solid ${BORDER}` : 'none' }}>
                <span>{ad}</span><strong style={{ color: GREEN, whiteSpace: 'nowrap' }}>{fiyat}</strong>
              </div>
            ))}
          </div>
          <p style={{ margin: '.8rem 0 0', fontSize: '.88rem', color: MUTED }}>{d.fiyatNot}</p>
        </div>
      </section>
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>Nasıl çalışır?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: '.9rem', marginTop: '1rem' }}>
            {d.adimlar.map((a, i) => (
              <div key={a.baslik} style={{ borderRadius: 12, padding: '1.1rem 1.2rem', background: SOFT, border: `1px solid ${BORDER}` }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: GREEN, color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.6rem' }}>{i + 1}</div>
                <h3 style={{ margin: '0 0 .25rem', fontSize: '1rem', color: INK }}>{a.baslik}</h3>
                <p style={{ margin: 0, fontSize: '.9rem' }}>{a.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>Konyaaltı mahalleleri</h2>
          <p style={{ margin: '0 0 1rem', color: MUTED }}>Eve ve otele alım-teslim yapıyoruz; bölgenizi WhatsApp&apos;tan yazmanız yeterli.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
            {KONYAALTI_MAHALLELERI.map((m) => (
              <Link key={m.slug} href={`/terzi/konyaalti/${m.slug}`} style={{ border: `1px solid ${BORDER}`, borderRadius: 999, padding: '.4rem .9rem', fontSize: '.88rem', color: INK, textDecoration: 'none', background: '#fff' }}>{m.ad} terzi</Link>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>Sık sorulan sorular</h2>
          <div style={{ marginTop: '1rem', display: 'grid', gap: '.6rem' }}>
            {d.faq.map(({ q, a }) => (
              <details key={q} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '.9rem 1.1rem', background: '#fff' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: INK }}>{q}</summary>
                <p style={{ margin: '.6rem 0 0', fontSize: '.95rem' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>Diğer terzi hizmetleri</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '.8rem' }}>
            <Link href="/terzi/sik-sorulan-sorular" style={{ border: `1px solid ${BORDER}`, borderRadius: 10, padding: '.55rem 1rem', fontSize: '.9rem', color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Sık sorulan sorular →</Link>
            {d.diger.map((h) => (
              <Link key={h.href} href={h.href} style={{ border: `1px solid ${BORDER}`, borderRadius: 10, padding: '.55rem 1rem', fontSize: '.9rem', color: GREEN, fontWeight: 600, textDecoration: 'none' }}>{h.ad} →</Link>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '2.6rem 1.25rem 3rem' }}>
        <div style={{ ...wrap, background: SOFT, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '1.8rem 1.4rem', textAlign: 'center' }}>
          <h2 style={{ ...h2, margin: '0 0 .4rem' }}>{d.ctaBaslik}</h2>
          <p style={{ margin: '0 0 1.1rem' }}>Haftanın her günü {HOURS} arası WhatsApp&apos;tan yazın, fotoğrafı gönderin; fiyatı ve teslim süresini bildirelim.</p>
          <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={WA(d.waIlk)} target="_blank" rel="noopener noreferrer" style={btnGreen}>💬 WhatsApp&apos;tan Yaz</a>
            <a href={`tel:${PHONE_E}`} style={btnLine}><span className="ico-tel" aria-hidden="true" /> {PHONE}</a>
            <a href={GBP_URL} target="_blank" rel="noopener noreferrer" style={btnLine}>🗺️ Google Haritalar</a>
          </div>
        </div>
      </section>
      {kargoFermuar && <KargoFermuarKutusu lang="tr" />}
      {kargoKisa && !kargoFermuar && <KargoKisaNot lang="tr" job={d.name} />}
      <ReviewsBlock lang="tr" schema />
    </main>
  );
}
