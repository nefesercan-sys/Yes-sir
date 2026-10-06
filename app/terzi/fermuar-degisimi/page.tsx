import type { Metadata } from 'next';
import ReviewsBlock from '@/components/ReviewsBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import Link from 'next/link';
import { KONYAALTI_MAHALLELERI } from '@/lib/turkiye-lokasyonlar';

// ── Sabitler ──────────────────────────────────────────────────────────────
const BASE_URL  = 'https://swaphubs.com';
const SITE_URL  = `${BASE_URL}/terzi/fermuar-degisimi`;
const PARENT    = `${BASE_URL}/terzi`;
const PHONE     = '+90 531 898 64 18';
const PHONE_E   = '+905318986418';
const GBP_URL   = 'https://share.google/dsCVIz116FhbjISfz'; // TERZİ Can Antalya Tailor Service
const HOURS     = '08:00–23:00';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;

// ── Renkler / yazı tipi (açık, modern tema) ──────────────────────────────
const GREEN  = '#2d8c6e';
const INK    = '#1f2a24';
const TEXT   = '#3b4a42';
const MUTED  = '#6b7a72';
const SOFT   = '#f4faf7';
const BORDER = '#e3ece7';
const FONT   = "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

// ── Görünür içerik = şema içeriği (aynı kaynak) ──────────────────────────
const FAQ: { q: string; a: string }[] = [
  {
    q: 'Antalya\'da fermuar değişimi ne kadar?',
    a: 'Fermuar değişimi 200 TL\'den başlar. Fiyat kıyafetin türüne, fermuarın boyuna ve işlemin zorluğuna göre değişir. WhatsApp\'tan fermuarın fotoğrafını gönderirseniz kesin fiyatı bildiririz.',
  },
  {
    q: 'Fermuar değişimi kaç saatte biter?',
    a: 'Normal şartlarda 24 saat içinde teslim ederiz, acil durumlarda aynı gün teslim mümkündür. Fermuarın temin süresine ve yoğunluğa göre değişebilir; acil ihtiyacınızı yazarken belirtin.',
  },
  {
    q: 'Akşam ve hafta sonu açık mısınız?',
    a: `Evet, haftanın her günü ${HOURS} saatleri arasında hizmet veriyoruz.`,
  },
  {
    q: 'Mont ve ceket fermuarı da değişiyor mu?',
    a: 'Evet, mont, kaban, ceket ve blazer fermuarlarını değiştiriyoruz. Deri ürünlerde işlem özel olduğu için önce fotoğrafa bakıp fiyat veriyoruz.',
  },
  {
    q: 'Fermuar tamir edilir mi, yoksa değişim mi gerekir?',
    a: 'Dişler sağlamsa ve yalnızca kaydırıcı bozulduysa tamir yeterli olabilir. Dişler kopmuş, açılmış ya da çevresindeki kumaş yırtılmışsa fermuarın tamamen değişmesi gerekir. Fotoğrafa bakıp doğru yöntemi söyleriz.',
  },
  {
    q: 'Adrese gelip kıyafeti alıyor musunuz?',
    a: 'Konyaaltı başta olmak üzere Antalya genelinde adresten alım ve teslim servisimiz var. Bölgenizi ve saat tercihinizi WhatsApp\'tan yazmanız yeterli.',
  },
];

const FERMUAR_TURLERI: { ic: string; baslik: string; aciklama: string }[] = [
  { ic: '👖', baslik: 'Pantolon & Kot', aciklama: 'Ön fermuar değişimi; kot pantolonlarda dayanıklı fermuar ve düzgün dikiş.' },
  { ic: '👗', baslik: 'Elbise', aciklama: 'Sırt ve yan fermuarlar, gizli fermuar değişimi; kumaşa zarar vermeden.' },
  { ic: '🩳', baslik: 'Etek & Şort', aciklama: 'Yan ve arka fermuar değişimi, bel hattına uygun yerleşim.' },
  { ic: '🧥', baslik: 'Mont & Kaban', aciklama: 'Uzun mont ve kaban fermuarlarının değişimi, astar ve kumaş korunarak.' },
  { ic: '🥼', baslik: 'Ceket & Blazer', aciklama: 'Ceket ve blazer fermuarları; ön kapama ve cep fermuarları.' },
  { ic: '🧵', baslik: 'Deri Ürünler', aciklama: 'Deri mont ve ceket fermuarları özel işlemdir; fotoğrafa göre fiyat verilir.' },
];

const ADIMLAR: { no: string; baslik: string; aciklama: string }[] = [
  { no: '1', baslik: 'Fotoğraf gönderin', aciklama: 'Bozuk fermuarın ve kıyafetin fotoğrafını WhatsApp\'tan yollayın.' },
  { no: '2', baslik: 'Fiyat ve süre netleşir', aciklama: 'Fermuar türüne göre kesin fiyatı ve teslim süresini size bildiririz.' },
  { no: '3', baslik: 'Getirin ya da alalım', aciklama: 'Atölyeye bırakabilir veya adresten alım için bizimle konuşabilirsiniz.' },
  { no: '4', baslik: 'Teslim', aciklama: 'Normal şartlarda 24 saatte, acil durumda aynı gün hazır olur.' },
];

const DIGER_HIZMETLER: { href: string; ad: string }[] = [
  { href: '/terzi/paca-kisaltma-antalya', ad: 'Paça kısaltma' },
  { href: '/terzi/bay-terzi-antalya', ad: 'Bay terzi' },
  { href: '/terzi/bayan-terzi-antalya', ad: 'Bayan terzi' },
  { href: '/terzi/eve-gelen-terzi-antalya', ad: 'Eve gelen terzi' },
  { href: '/antalyada-terzi-dikim-tamirat-utu-hizmetleri', ad: 'Tamirat ve ütü hizmetleri' },
  { href: '/terzi', ad: 'Tüm terzi hizmetleri' },
];

// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Fermuar Değişimi Antalya · 200 TL\'den · Her Gün 08–23 | Terzi Can' },
  description:
    'Antalya Konyaaltı\'nda pantolon, kot, elbise, etek, mont ve ceket fermuar değişimi. ' +
    '200 TL\'den başlayan fiyatlar, 24 saatte teslim, acil durumda aynı gün. Haftanın her günü 08:00–23:00. WhatsApp: ' + PHONE,
  keywords: [
    'fermuar değişimi antalya', 'fermuar tamiri antalya', 'pantolon fermuarı değişimi', 'mont fermuarı değişimi',
    'elbise fermuarı değişimi', 'kot fermuar değişimi', 'konyaaltı fermuar tamiri', 'akşam açık terzi antalya',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Fermuar Değişimi Antalya · 200 TL\'den | Terzi Can',
    description: 'Pantolon, elbise, mont ve ceket fermuar değişimi. Haftanın her günü 08:00–23:00, Konyaaltı / Antalya.',
    url: SITE_URL,
    siteName: 'Terzi Can Antalya',
    locale: 'tr_TR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

// ── JSON-LD (yalnızca bu server component'te) ────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Fermuar Değişimi Antalya',
      serviceType: 'Fermuar değişimi',
      description:
        'Antalya Konyaaltı\'nda pantolon, kot, elbise, etek, mont ve ceket fermuar değişimi. ' +
        'Normal şartlarda 24 saatte teslim, acil durumda aynı gün.',
      url: SITE_URL,
      inLanguage: 'tr',
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Konyaaltı' },
        { '@type': 'City', name: 'Antalya' },
      ],
      provider: {
        '@type': ['LocalBusiness', 'ClothingStore'],
        '@id': `${PARENT}#business`,
        name: 'TERZİ Can Antalya Tailor Service',
        url: PARENT,
        telephone: PHONE_E,
        hasMap: GBP_URL,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Konyaaltı',
          addressRegion: 'Antalya',
          addressCountry: 'TR',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00',
            closes: '23:00',
          },
        ],
        sameAs: [GBP_URL, `https://wa.me/${PHONE_E.replace('+', '')}`],
      },
      offers: {
        '@type': 'Offer',
        name: 'Fermuar değişimi (başlangıç fiyatı)',
        price: '200',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        url: SITE_URL,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi', item: PARENT },
        { '@type': 'ListItem', position: 3, name: 'Fermuar Değişimi', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: FAQ.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
};

// ── Sayfa ─────────────────────────────────────────────────────────────────
export default function FermuarDegisimiPage() {
  const btnGreen = {
    display: 'inline-block', background: GREEN, color: '#fff', padding: '.85rem 1.6rem', borderRadius: 10,
    fontWeight: 700, fontSize: '.95rem', textDecoration: 'none',
  } as const;
  const btnLine = {
    display: 'inline-block', background: '#fff', color: INK, padding: '.85rem 1.4rem', borderRadius: 10,
    fontWeight: 600, fontSize: '.95rem', textDecoration: 'none', border: `1px solid ${BORDER}`,
  } as const;
  const h2 = { fontSize: 'clamp(1.35rem,3vw,1.75rem)', color: INK, margin: '0 0 .6rem', fontWeight: 800, letterSpacing: '-.01em' } as const;
  const wrap = { maxWidth: 960, margin: '0 auto' } as const;

  return (
    <main style={{ fontFamily: FONT, color: TEXT, background: '#fff', lineHeight: 1.65 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SpeakableSchema path="/terzi/fermuar-degisimi" />
      <QuickActionBanner lang="tr" service="fermuar" />
      {/* HERO */}
      <section style={{ background: SOFT, borderBottom: `1px solid ${BORDER}`, padding: '2.2rem 1.25rem 2.6rem' }}>
        <div style={wrap}>
          <nav aria-label="Sayfa yolu" style={{ fontSize: '.8rem', color: MUTED, marginBottom: '1.1rem' }}>
            <Link href="/" style={{ color: MUTED, textDecoration: 'none' }}>SwapHubs</Link>
            {' › '}
            <Link href="/terzi" style={{ color: MUTED, textDecoration: 'none' }}>Antalya Terzi</Link>
            {' › '}
            <span style={{ color: INK }}>Fermuar Değişimi</span>
          </nav>

          <div style={{ display: 'inline-block', background: '#fff', border: `1px solid ${BORDER}`, color: GREEN, fontSize: '.8rem', fontWeight: 700, padding: '.3rem .8rem', borderRadius: 999, marginBottom: '1rem' }}>
            🕗 Haftanın her günü {HOURS}
          </div>

          <h1 style={{ fontSize: 'clamp(2rem,6vw,3rem)', lineHeight: 1.1, color: INK, margin: '0 0 1rem', fontWeight: 800, letterSpacing: '-.02em' }}>
            Fermuar Değişimi Antalya
          </h1>

          <p style={{ fontSize: '1.05rem', maxWidth: 680, margin: '0 0 1.4rem', color: INK }}>
            <strong>Kısa cevap:</strong> Terzi Can, Antalya Konyaaltı&apos;nda pantolon, kot, elbise, etek, mont ve ceket
            fermuarlarını <strong>200 TL&apos;den başlayan fiyatlarla</strong> değiştirir. Normal şartlarda 24 saatte,
            acil durumda aynı gün teslim; haftanın her günü {HOURS} arası açıktır.
          </p>

          <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, fermuar değişimi için fiyat almak istiyorum. Fotoğrafı gönderiyorum.')}
               target="_blank" rel="noopener noreferrer" style={btnGreen}>
              💬 Fotoğraf Gönder, Fiyat Al
            </a>
            <a href={`tel:${PHONE_E}`} style={btnLine}>📞 {PHONE}</a>
          </div>
        </div>
      </section>

      {/* HIZLI BİLGİ */}
      <section style={{ padding: '2rem 1.25rem 0' }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '.8rem' }}>
          {[
            ['Başlangıç fiyatı', '200 TL\'den'],
            ['Teslim süresi', '24 saat · acilde aynı gün'],
            ['Çalışma saatleri', `Her gün ${HOURS}`],
            ['Servis bölgesi', 'Konyaaltı ve Antalya geneli'],
          ].map(([k, v]) => (
            <div key={k} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '1rem 1.1rem', background: '#fff' }}>
              <div style={{ fontSize: '.72rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '.25rem' }}>{k}</div>
              <div style={{ fontWeight: 700, color: INK }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HANGİ FERMUARLAR */}
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>Hangi kıyafetlerin fermuarını değiştiriyoruz?</h2>
          <p style={{ margin: '0 0 1.2rem', color: MUTED }}>
            Fermuar değişimi; kumaşa, astara ve dikiş hattına zarar vermeden yapılır.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '.9rem' }}>
            {FERMUAR_TURLERI.map(t => (
              <div key={t.baslik} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '1.1rem 1.2rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '.3rem' }}>{t.ic}</div>
                <h3 style={{ margin: '0 0 .3rem', fontSize: '1.05rem', color: INK }}>{t.baslik}</h3>
                <p style={{ margin: 0, fontSize: '.92rem' }}>{t.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FİYAT */}
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>Fermuar değişimi fiyatı</h2>
          <div style={{ border: `1px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden' }}>
            {[
              ['Pantolon, kot, etek, elbise fermuarı', '200 TL\'den'],
              ['Mont, kaban, ceket fermuarı', 'Fotoğrafa göre fiyat'],
              ['Deri ürün fermuarı (özel işlem)', 'Fotoğrafa göre fiyat'],
            ].map(([ad, fiyat], i) => (
              <div key={ad} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '.95rem 1.2rem', background: i % 2 ? SOFT : '#fff', borderTop: i ? `1px solid ${BORDER}` : 'none' }}>
                <span>{ad}</span>
                <strong style={{ color: GREEN, whiteSpace: 'nowrap' }}>{fiyat}</strong>
              </div>
            ))}
          </div>
          <p style={{ margin: '.8rem 0 0', fontSize: '.88rem', color: MUTED }}>
            Fiyatlar başlangıç fiyatıdır; fermuar boyu, kumaş ve işlemin zorluğuna göre değişebilir.
            Kesin fiyat için fermuarın fotoğrafını WhatsApp&apos;tan gönderin.
          </p>
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>Nasıl çalışır?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: '.9rem', marginTop: '1rem' }}>
            {ADIMLAR.map(a => (
              <div key={a.no} style={{ borderRadius: 12, padding: '1.1rem 1.2rem', background: SOFT, border: `1px solid ${BORDER}` }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: GREEN, color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.6rem' }}>{a.no}</div>
                <h3 style={{ margin: '0 0 .25rem', fontSize: '1rem', color: INK }}>{a.baslik}</h3>
                <p style={{ margin: 0, fontSize: '.9rem' }}>{a.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BÖLGELER */}
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>Konyaaltı mahalleleri</h2>
          <p style={{ margin: '0 0 1rem', color: MUTED }}>
            Konyaaltı ve Antalya genelinde adresten alım ve teslim için bölgenizi bize yazın.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
            {KONYAALTI_MAHALLELERI.map(m => (
              <Link key={m.slug} href={`/terzi/konyaalti/${m.slug}`}
                style={{ border: `1px solid ${BORDER}`, borderRadius: 999, padding: '.4rem .9rem', fontSize: '.88rem', color: INK, textDecoration: 'none', background: '#fff' }}>
                {m.ad} terzi
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>Sık sorulan sorular</h2>
          <div style={{ marginTop: '1rem', display: 'grid', gap: '.6rem' }}>
            {FAQ.map(({ q, a }) => (
              <details key={q} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '.9rem 1.1rem', background: '#fff' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: INK }}>{q}</summary>
                <p style={{ margin: '.6rem 0 0', fontSize: '.95rem' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* DİĞER HİZMETLER */}
      <section style={{ padding: '2.6rem 1.25rem 0' }}>
        <div style={wrap}>
          <h2 style={h2}>Diğer terzi hizmetleri</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '.8rem' }}>
            {DIGER_HIZMETLER.map(h => (
              <Link key={h.href} href={h.href}
                style={{ border: `1px solid ${BORDER}`, borderRadius: 10, padding: '.55rem 1rem', fontSize: '.9rem', color: GREEN, fontWeight: 600, textDecoration: 'none' }}>
                {h.ad} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ALT ÇAĞRI */}
      <section style={{ padding: '2.6rem 1.25rem 3rem' }}>
        <div style={{ ...wrap, background: SOFT, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '1.8rem 1.4rem', textAlign: 'center' }}>
          <h2 style={{ ...h2, margin: '0 0 .4rem' }}>Fermuarınız bozuldu mu?</h2>
          <p style={{ margin: '0 0 1.1rem' }}>
            Haftanın her günü {HOURS} arası WhatsApp&apos;tan yazın, fotoğrafı gönderin; fiyatı ve teslim süresini bildirelim.
          </p>
          <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={WA('Merhaba, fermuar değişimi için bilgi almak istiyorum.')} target="_blank" rel="noopener noreferrer" style={btnGreen}>
              💬 WhatsApp&apos;tan Yaz
            </a>
            <a href={`tel:${PHONE_E}`} style={btnLine}>📞 {PHONE}</a>
            <a href={GBP_URL} target="_blank" rel="noopener noreferrer" style={btnLine}>🗺️ Google Haritalar</a>
          </div>
        </div>
      </section>
    <ReviewsBlock lang="tr" />
    </main>
  );
}
