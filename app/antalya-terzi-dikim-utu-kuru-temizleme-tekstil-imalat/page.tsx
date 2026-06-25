import type { Metadata } from 'next';
import Link from 'next/link';

// ─── Sabitler ────────────────────────────────────────────────────────────────
const SITE_URL  = 'https://swaphubs.com/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat';
const HOME      = 'https://swaphubs.com';
const TERZI_URL = 'https://swaphubs.com/terzi';
const PHONE     = '+90 531 898 64 18';
const PHONE_E   = '+905318986418';
const WA = (t: string) => `https://wa.me/${PHONE_E}?text=${encodeURIComponent(t)}`;
const TODAY = new Date().toISOString().split('T')[0];

// SEO için Konyaaltı mahalleleri
const KONYAALTI_MAHALLELERI = [
  'Hurma', 'Liman', 'Uncalı', 'Gürsu', 'Altınkum', 
  'Arapsuyu', 'Öğretmenevleri', 'Sarısu', 'Pınarbaşı', 'Toros', 'Siteler', 'Molla Yusuf'
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── İşletme ─────────────────────────────────────────────────────────────
    {
      '@type': ['LocalBusiness', 'ClothingStore', 'DryCleaningOrLaundry'],
      '@id': `${TERZI_URL}#business`,
      name: 'Terzi Can Konyaaltı',
      alternateName: ['Tailor Can Antalya', 'Портной Кан Анталья', 'Schneider Can Antalya', 'Konyaaltı Terzi'],
      description: "Antalya Konyaaltı'nda profesyonel terzi, dikiş atölyesi ve kuru temizleme. Hurma, Liman, Uncalı, Gürsu başta olmak üzere tüm Antalya'ya adrese servis. Kıyafet dikimi, paça kısaltma, fermuar değişimi.",
      url: TERZI_URL,
      telephone: PHONE_E,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [`${HOME}/og/terzi-can.jpg`],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı Merkez',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      hasMap: 'https://www.google.com/maps?q=36.8841,30.7056',
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00',
        closes: '19:00',
      }],
      contactPoint: [{
        '@type': 'ContactPoint',
        telephone: PHONE_E,
        contactType: 'customer service',
        availableLanguage: ['Turkish','English','Russian','German'],
      }],
      areaServed: [
        { '@type': 'City', name: 'Konyaaltı' },
        ...KONYAALTI_MAHALLELERI.map(name => ({ '@type': 'Place', name: `${name} Mahallesi, Konyaaltı` })),
        { '@type': 'City', name: 'Antalya' },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9', reviewCount: '94', bestRating: '5',
      },
    },
    // ── Sayfa ────────────────────────────────────────────────────────────────
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: 'Konyaaltı Terzi · Hurma, Liman, Uncalı Terzi Servisi · Kuru Temizleme 2026',
      description: "Konyaaltı terzi hizmetleri. Hurma, Liman, Uncalı mahallelerine eve teslim terzi, paça kısaltma, fermuar, ütü ve kuru temizleme. ☎ " + PHONE,
      inLanguage: ['tr','en','ru'],
      dateModified: TODAY,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
    },
    // ── Breadcrumb ───────────────────────────────────────────────────────────
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME },
        { '@type': 'ListItem', position: 2, name: 'Terzi Can Konyaaltı', item: TERZI_URL },
        { '@type': 'ListItem', position: 3, name: 'Konyaaltı Terzi · Tadilat ve Kuru Temizleme', item: SITE_URL },
      ],
    },
    // ── Hizmet ──────────────────────────────────────────────────────────────
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Antalya Konyaaltı Terzi Dikim ve Kuru Temizleme Hizmeti 2026',
      provider: { '@type': 'LocalBusiness', '@id': `${TERZI_URL}#business` },
      areaServed: { '@type': 'City', name: 'Antalya' },
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '80',
        highPrice: '5000',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
      },
    },
    // ── FAQ ──────────────────────────────────────────────────────────────────
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Konyaaltı Hurma ve Liman Mahallesi eve servis var mı?', acceptedAnswer: { '@type': 'Answer', text: `Evet, Hurma, Liman, Uncalı ve Sarısu mahallelerine gün içi kapıdan alım ve teslimat yapıyoruz. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Antalya paça kısaltma fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Paça kısaltma ₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Antalya fermuar değişimi fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Pantolon fermuarı ₺120, mont fermuarı ₺300'den başlar. Aynı gün teslim. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Bel daraltma ve elbise tadilat Antalya fiyatı?', acceptedAnswer: { '@type': 'Answer', text: `Bel daraltma ₺200, elbise daraltma ₺350'den başlar. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Tailor in Antalya Konyaalti — English service?', acceptedAnswer: { '@type': 'Answer', text: `Yes! Tailor Can offers English-speaking tailoring, alterations, dry cleaning and hotel pickup in Konyaalti, Lara, and Belek. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Портной в Анталье Коньяалты — есть ли услуга по-русски?', acceptedAnswer: { '@type': 'Answer', text: `Да! Портной Кан говорит по-русски. Подгонка, пошив, химчистка, доставка в отель. WhatsApp: ${PHONE}` } },
      ],
    },
  ],
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(HOME),
  title: 'Konyaaltı Terzi · Hurma, Liman, Uncalı Tadilat ve Kuru Temizleme 2026',
  description: "Antalya Konyaaltı'nda profesyonel terzi. Hurma, Liman, Uncalı, Gürsu mahallelerine adrese teslim paça, fermuar, dikim, ütü ve kuru temizleme. ☎ " + PHONE,
  keywords: [
    'Konyaaltı terzi', 'Hurma mahallesi terzi', 'Liman mahallesi terzi', 'Uncalı terzi', 
    'Gürsu terzi', 'Arapsuyu terzi', 'Sarısu kuru temizleme', 'Konyaaltı kuru temizleme', 
    'paça kısaltma Antalya', 'fermuar değişimi Antalya', 'bel daraltma Antalya', 
    'elbise dikimi Antalya', 'Konyaaltı ütü servisi', 'eve gelen terzi Konyaaltı', 
    'tailor Konyaalti', 'портной Коньяалты', 'Schneider Antalya'
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { 'x-default': SITE_URL },
  },
  openGraph: {
    title: 'Konyaaltı Terzi · Hurma, Liman, Uncalı Adrese Servis',
    description: "Konyaaltı'nın tüm mahallelerine kapıdan alım terzi ve kuru temizleme hizmeti. Paça ₺150, fermuar ₺120, elbise dikimi. ☎ " + PHONE,
    url: SITE_URL,
    type: 'website',
    locale: 'tr_TR',
    images: [{ url: '/og/terzi-can.jpg', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056',
    ICBM: '36.8841, 30.7056',
  },
};

// ─── Veri ────────────────────────────────────────────────────────────────────
const TADILATLAR = [
  { hizmet: 'Paça Kısaltma — Kot',             fiyat: '₺150',   sure: 'Aynı gün' },
  { hizmet: 'Paça Kısaltma — Kumaş Pantolon',  fiyat: '₺175',   sure: 'Aynı gün' },
  { hizmet: 'Paça Kısaltma — Kadın / Etek',    fiyat: '₺150+',  sure: 'Aynı gün' },
  { hizmet: 'Fermuar Değişimi — Pantolon/Kot', fiyat: '₺120',   sure: 'Aynı gün' },
  { hizmet: 'Fermuar Değişimi — Ceket',        fiyat: '₺200',   sure: '24 saat'  },
  { hizmet: 'Fermuar Değişimi — Mont',         fiyat: '₺300',   sure: '24 saat'  },
  { hizmet: 'Fermuar Değişimi — Sweatshirt',   fiyat: '₺150',   sure: 'Aynı gün' },
  { hizmet: 'Gizli Fermuar — Elbise/Abiye',    fiyat: '₺180',   sure: 'Aynı gün' },
  { hizmet: 'Bel Daraltma — Pantolon',         fiyat: '₺200',   sure: '24–48 sa' },
  { hizmet: 'Bel Daraltma — Elbise/Abiye',     fiyat: '₺350',   sure: '48 saat'  },
  { hizmet: 'Kol Kısaltma — Ceket/Mont',       fiyat: '₺250',   sure: '24–48 sa' },
  { hizmet: 'Yırtık / Sökük Onarımı',          fiyat: '₺100',   sure: 'Aynı gün' },
  { hizmet: 'Astar Değişimi — Ceket',          fiyat: '₺400',   sure: '48 saat'  },
];

const DIKIMLER = [
  { hizmet: 'Erkek Takım Elbise',     fiyat: '₺2.500+', sure: '5–7 gün'   },
  { hizmet: 'Kadın Elbise / Tunik',   fiyat: '₺600+',   sure: '3–5 gün'   },
  { hizmet: 'Abiye / Gece Elbisesi',  fiyat: '₺1.200+', sure: '5–7 gün'   },
  { hizmet: 'Gelinlik Dikimi',        fiyat: '₺5.000+', sure: '14–21 gün' },
  { hizmet: 'Gömlek / Bluz',          fiyat: '₺400+',   sure: '3–5 gün'   },
  { hizmet: 'Pantolon / Etek',        fiyat: '₺350+',   sure: '3–5 gün'   },
  { hizmet: 'Üniforma (adet başına)', fiyat: 'Teklif',  sure: '7–14 gün'  },
];

const UTU_TEMIZLEME = [
  { hizmet: 'Gömlek Ütü',                      fiyat: '₺80',    sure: '2–6 saat'  },
  { hizmet: 'Takım Elbise Buharlı Pres',       fiyat: '₺150',   sure: '2–6 saat'  },
  { hizmet: 'Abiye Buharlama',                 fiyat: '₺120',   sure: '2–6 saat'  },
  { hizmet: 'Çamaşır Yıkama + Kurutma',        fiyat: '₺80/kg', sure: '24 saat'   },
  { hizmet: 'Elbise Kuru Temizleme',           fiyat: '₺300',   sure: '24–48 saat'},
  { hizmet: 'Takım Elbise Kuru Temizleme',     fiyat: '₺450',   sure: '48 saat'   },
  { hizmet: 'Mont Kuru Temizleme',             fiyat: '₺500',   sure: '48 saat'   },
  { hizmet: 'Abiye / Gelinlik Kuru Temizleme', fiyat: '₺600+',  sure: '48–72 sa'  },
  { hizmet: 'Konyaaltı Otel/Ev Alım Teslim',   fiyat: 'ÜCRETSİZ', sure: '—'         },
];

// ─── Stil sabitleri ──────────────────────────────────────────────────────────
const ALTIN   = '#B8975A';
const ALTIN2  = '#D4B07A';
const KOYU    = '#1C1814';
const KOYU2   = '#2E2820';
const BG      = '#FAF7F2';
const BG2     = '#F2EDE4';
const METIN   = '#3A3028';
const GRI     = '#7A6E62';
const SERIF   = 'Georgia,serif';
const SANS    = 'system-ui,sans-serif';

// ─── Bileşen ────────────────────────────────────────────────────────────────
export default function AntalyaTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: SANS, background: BG, color: METIN, minHeight: '100vh' }}>

        {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.72rem', color: GRI, background: BG2, borderBottom: `1px solid rgba(184,151,90,.12)` }}>
          <Link href="/" style={{ color: ALTIN, textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: ALTIN, textDecoration: 'none' }}>Terzi Can Konyaaltı</Link>
          {' › '}
          <span>Konyaaltı Terzi · Tadilat · Ütü · Kuru Temizleme</span>
        </nav>

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section style={{
          background: `linear-gradient(135deg, ${KOYU} 0%, ${KOYU2} 60%, #3A2E20 100%)`,
          padding: '5rem 1.5rem 4.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${ALTIN}, transparent)` }} />
          <div style={{ position: 'absolute', top: '3px', left: 0, right: 0, height: '1px', background: `rgba(184,151,90,.2)` }} />

          <div style={{
            position: 'absolute', inset: 0,
            background: "url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&q=60&auto=format&fit=crop') center/cover",
            opacity: .07,
          }} />

          <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.65rem', letterSpacing: '.35em', textTransform: 'uppercase', color: ALTIN2, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '.8rem' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: ALTIN }} />
              Konyaaltı · Antalya · Terzi & Tekstil Atölyesi
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: ALTIN }} />
            </div>

            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5.5vw,3.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.08, marginBottom: '1.4rem', letterSpacing: '-.01em' }}>
              Konyaaltı Terzi
              <br />
              <span style={{ color: ALTIN2, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                Hurma, Liman, Uncalı & Gürsu Servisi
              </span>
            </h1>

            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.78)', lineHeight: 1.9, maxWidth: '650px', marginBottom: '2rem' }}>
              <strong style={{ color: '#fff' }}>Terzi Can</strong> — Konyaaltı merkezli profesyonel dikiş atölyesi.
              Paça kısaltma, fermuar değişimi, bel daraltma, elbise dikimi, kuru temizleme ve ütü işlemleri için 
              <strong style={{ color: ALTIN2 }}> Hurma, Liman, Sarısu, Uncalı ve Gürsu </strong> 
              mahallelerine ücretsiz kapıdan alım ve teslimat yapıyoruz.
            </p>

            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[['🇹🇷','Türkçe'],['🇬🇧','English'],['🇷🇺','Русский'],['🇩🇪','Deutsch']].map(([f,l]) => (
                <span key={l} style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.55)', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', padding: '.28rem .8rem', borderRadius: '2px' }}>
                  {f} {l}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, Konyaaltı içi terzi servisi için bilgi almak istiyorum.')}
                target="_blank" rel="noopener noreferrer"
                style={{ background: ALTIN, color: '#fff', padding: '1rem 2.2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase', border: `1px solid ${ALTIN}` }}>
                💬 WhatsApp — Randevu Al
              </a>
              <a href={`tel:${PHONE_E}`}
                style={{ border: '1px solid rgba(255,255,255,.25)', color: '#fff', padding: '1rem 1.8rem', textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.05em' }}>
                📞 {PHONE}
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', marginTop: '3rem', maxWidth: '700px' }}>
              {[['⭐ 4.9','94 Google Yorum'],['10+ Yıl','Deneyim'],['Aynı Gün','Paça & Fermuar'],['Tüm Konyaaltı','Adrese Servis']].map(([t,d]) => (
                <div key={t} style={{ background: 'rgba(255,255,255,.03)', padding: '1.2rem 1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontSize: '1.05rem', color: ALTIN2, marginBottom: '.3rem', fontWeight: 700 }}>{t}</div>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KONYAALTI MAHALLELERİ (SEO ODAKLI ALAN) ────────────────────── */}
        <section style={{ background: '#fff', padding: '3rem 1.5rem', borderBottom: `1px solid ${BG2}` }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.4rem', color: KOYU, marginBottom: '1rem' }}>
              📍 Konyaaltı İçi Ücretsiz Moto Kurye Servis Bölgelerimiz
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.6rem' }}>
              {KONYAALTI_MAHALLELERI.map(mahalle => (
                <span key={mahalle} style={{ background: BG2, color: GRI, padding: '.4rem .8rem', borderRadius: '20px', fontSize: '.8rem', fontWeight: 500, border: `1px solid rgba(184,151,90,.2)` }}>
                  {mahalle} Terzi
                </span>
              ))}
            </div>
            <p style={{ fontSize: '.8rem', color: GRI, marginTop: '1rem', fontStyle: 'italic' }}>
              * Belirtilen mahallelerden vereceğiniz tadilat ve kuru temizleme siparişleri kapınızdan teslim alınır.
            </p>
          </div>
        </section>

        {/* ── TADİLAT & ONARIM FİYATLARI ─────────────────────────────────── */}
        <section id="tadilatlar" style={{ background: BG, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.5rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: ALTIN }}>Fiyat Listesi · 2025–2026</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.9rem', color: KOYU, marginBottom: '.4rem' }}>
              Tadilat & Onarım Fiyatları
            </h2>
            <p style={{ color: GRI, fontSize: '.88rem', marginBottom: '2rem' }}>
              Paça kısaltma, fermuar değişimi, bel daraltma, kol kısaltma ve diğer tadilat işleri.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 20px rgba(28,24,20,.06)' }}>
              <thead>
                <tr style={{ background: KOYU, borderBottom: `2px solid ${ALTIN}` }}>
                  {['Hizmet', 'Başlangıç Fiyatı', 'Süre'].map((h, i) => (
                    <th key={h} style={{ padding: '.85rem 1.1rem', textAlign: i === 0 ? 'left' : 'right', fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN2, fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TADILATLAR.map(({ hizmet, fiyat, sure }, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid rgba(60,40,20,.06)`, background: i % 2 ? `rgba(184,151,90,.025)` : '#fff', transition: 'background .15s' }}>
                    <td style={{ padding: '.88rem 1.1rem', fontSize: '.88rem', fontWeight: 500, color: METIN }}>{hizmet}</td>
                    <td style={{ padding: '.88rem 1.1rem', textAlign: 'right', fontSize: '.95rem', color: ALTIN, fontWeight: 700 }}>{fiyat}</td>
                    <td style={{ padding: '.88rem 1.1rem', textAlign: 'right', fontSize: '.75rem', color: sure === 'Aynı gün' ? '#22c55e' : GRI, fontWeight: sure === 'Aynı gün' ? 600 : 400 }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── DİKİM FİYATLARI ─────────────────────────────────────────────── */}
        <section id="dikimler" style={{ background: BG2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.5rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: ALTIN }}>Özel Dikim · 2025–2026</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.9rem', color: KOYU, marginBottom: '.4rem' }}>
              Kıyafet Dikimi Fiyatları
            </h2>
            <p style={{ color: GRI, fontSize: '.88rem', marginBottom: '2rem' }}>
              Takım elbise, elbise, abiye, gelinlik, gömlek, pantolon — ölçüye özel dikim.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1px', background: 'rgba(184,151,90,.1)' }}>
              {DIKIMLER.map(({ hizmet, fiyat, sure }) => (
                <div key={hizmet} style={{ background: '#fff', padding: '1.6rem 1.4rem', borderBottom: `3px solid transparent`, transition: 'border-color .2s', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${ALTIN}, transparent)` }} />
                  <div style={{ fontFamily: SERIF, fontSize: '1.05rem', color: KOYU, fontWeight: 600, marginBottom: '.5rem' }}>{hizmet}</div>
                  <div style={{ fontSize: '1.3rem', color: ALTIN, fontWeight: 700, fontFamily: SERIF, marginBottom: '.3rem' }}>{fiyat}</div>
                  <div style={{ fontSize: '.72rem', color: GRI, letterSpacing: '.08em' }}>⏱ {sure}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ÜTÜ & KURU TEMİZLEME ───────────────────────────────────────── */}
        <section id="kuru-temizleme" style={{ background: '#fff', padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.5rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: ALTIN }}>Ütü & Temizleme · 2025–2026</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.9rem', color: KOYU, marginBottom: '.4rem' }}>
              Ütü & Kuru Temizleme Fiyatları
            </h2>
            <p style={{ color: GRI, fontSize: '.88rem', marginBottom: '2rem' }}>
              Hurma, Liman, Uncalı dahil tüm Konyaaltı mahallelerine alım + teslimat. 24 saat ekspres.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 20px rgba(28,24,20,.06)' }}>
              <thead>
                <tr style={{ background: KOYU, borderBottom: `2px solid ${ALTIN}` }}>
                  {['Hizmet', 'Fiyat', 'Süre'].map((h, i) => (
                    <th key={h} style={{ padding: '.85rem 1.1rem', textAlign: i === 0 ? 'left' : 'right', fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN2, fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {UTU_TEMIZLEME.map(({ hizmet, fiyat, sure }, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid rgba(60,40,20,.06)`, background: i % 2 ? `rgba(184,151,90,.025)` : '#fff' }}>
                    <td style={{ padding: '.88rem 1.1rem', fontSize: '.88rem', fontWeight: 500 }}>{hizmet}</td>
                    <td style={{ padding: '.88rem 1.1rem', textAlign: 'right', color: fiyat === 'ÜCRETSİZ' ? '#22c55e' : ALTIN, fontWeight: 700 }}>{fiyat}</td>
                    <td style={{ padding: '.88rem 1.1rem', textAlign: 'right', fontSize: '.75rem', color: GRI }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── HİZMET KARTLARI ─────────────────────────────────────────────── */}
        <section style={{ background: BG2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.5rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: ALTIN }}>Tüm Hizmetler</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.9rem', color: KOYU, marginBottom: '2rem' }}>
              Terzi Can Hizmet Alanları
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '1px', background: 'rgba(184,151,90,.1)' }}>
              {[
                { ic:'✂️', baslik:'Tadilat & Onarım', text:'Paça kısaltma, fermuar değişimi, bel daraltma, kol kısaltma, yırtık onarımı, astar değişimi. Aynı gün teslim.', href:'/terzi/paca-kisaltma-antalya', fiyat:'₺100\'den' },
                { ic:'🧵', baslik:'Kıyafet Dikimi', text:'Erkek takım elbise, kadın elbise, abiye, gelinlik, gömlek, pantolon, üniforma — ölçüye özel dikim.', href:'/terzi/bayan-terzi-antalya', fiyat:'₺350\'den' },
                { ic:'💨', baslik:'Ütü & Buharlı Pres', text:'Endüstriyel buharlı pres ile gömlek, takım elbise, abiye ütüleme. Evden alım + teslimat.', href:'/terzi/kuru-temizleme-antalya', fiyat:'₺80\'den' },
                { ic:'🧺', baslik:'Kuru Temizleme', text:'Hassas kumaşlar için kuru temizleme. Elbise, abiye, gelinlik, mont. 24–48 saat ekspres. Servis imkanı.', href:'/terzi/kuru-temizleme-antalya', fiyat:'₺300\'den' },
                { ic:'🏭', baslik:'Üniforma & Seri İmalat', text:'Otel, restoran, okul, sağlık sektörü üniforması. Kalıp + nakış + seri üretim. Min 10 adet.', href:'/terzi/uniforma-uretimi-antalya', fiyat:'Teklif' },
                { ic:'🚗', baslik:'Adrese Servis', text:'Hurma, Liman, Uncalı, Gürsu dahil tüm Konyaaltı ve Antalya geneli ücretsiz alım + teslimat.', href:'/terzi/eve-gelen-terzi-antalya', fiyat:'Ücretsiz' },
              ].map(({ ic, baslik, text, href, fiyat }) => (
                <div key={baslik} style={{ background: '#fff', padding: '2rem 1.6rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: ALTIN }} />
                  <div style={{ fontSize: '1.8rem', marginBottom: '.8rem' }}>{ic}</div>
                  <h3 style={{ fontFamily: SERIF, fontSize: '1.1rem', color: KOYU, marginBottom: '.5rem', fontWeight: 600 }}>{baslik}</h3>
                  <p style={{ fontSize: '.8rem', color: GRI, lineHeight: 1.75, marginBottom: '1rem' }}>{text}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '.78rem', color: ALTIN, fontWeight: 700 }}>{fiyat} başlar</span>
                    <Link href={href} style={{ fontSize: '.72rem', color: ALTIN, textDecoration: 'none', borderBottom: `1px solid ${ALTIN}`, paddingBottom: '1px' }}>Detay →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BÖLGELER ────────────────────────────────────────────────────── */}
        <section style={{ background: KOYU, padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.8rem', color: '#fff', marginBottom: '.5rem' }}>
              Tüm Antalya'nın Her İlçesine <span style={{ color: ALTIN2, fontStyle: 'italic' }}>Adrese Servis</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.85rem', marginBottom: '2rem' }}>
              Konyaaltı'ndaki mahalle servislerimize ek olarak, diğer Antalya ilçelerine de servisimiz vardır.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: '1px', background: 'rgba(255,255,255,.05)' }}>
              {['Muratpaşa','Kepez','Lara','Belek','Kemer','Alanya','Manavgat','Side','Serik','Aksu','Döşemealtı'].map(b => (
                <div key={b} style={{ background: 'rgba(255,255,255,.03)', padding: '.8rem 1rem', fontSize: '.8rem', color: 'rgba(255,255,255,.6)', textAlign: 'center' }}>
                  📍 {b}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ÇOK DİLLİ BÖLÜM ────────────────────────────────────────────── */}
        <section style={{ background: BG2, padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.8rem', color: KOYU, marginBottom: '1.5rem' }}>
              Tailor in Antalya <span style={{ color: ALTIN, fontStyle: 'italic' }}>· English · Русский · Deutsch</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1rem' }}>
              <div style={{ background: '#fff', padding: '1.6rem', borderLeft: `3px solid ${ALTIN}` }}>
                <div style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN, marginBottom: '.6rem' }}>🇬🇧 English</div>
                <p style={{ fontSize: '.85rem', color: GRI, lineHeight: 1.8 }}>
                  <strong style={{ color: METIN }}>Tailor Can</strong> is a professional tailor in Konyaalti offering
                  alterations, dress making, dry cleaning and hotel pickup. English-speaking service. WhatsApp: <strong>{PHONE}</strong>
                </p>
              </div>
              <div style={{ background: '#fff', padding: '1.6rem', borderLeft: `3px solid ${ALTIN}` }}>
                <div style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN, marginBottom: '.6rem' }}>🇷🇺 Русский</div>
                <p style={{ fontSize: '.85rem', color: GRI, lineHeight: 1.8 }}>
                  <strong style={{ color: METIN }}>Портной Кан</strong> — профессиональный портной в районе Коньяалты.
                  Подгонка одежды, пошив, химчистка. WhatsApp: <strong>{PHONE}</strong>
                </p>
              </div>
              <div style={{ background: '#fff', padding: '1.6rem', borderLeft: `3px solid ${ALTIN}` }}>
                <div style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN, marginBottom: '.6rem' }}>🇩🇪 Deutsch</div>
                <p style={{ fontSize: '.85rem', color: GRI, lineHeight: 1.8 }}>
                  <strong style={{ color: METIN }}>Schneider Can</strong> in Konyaalti bietet Änderungsschneiderei,
                  Maßschneiderei, Textilreinigung und Abholservice. WhatsApp: <strong>{PHONE}</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer style={{ textAlign: 'center', padding: '3rem 1.5rem', background: KOYU2, color: 'rgba(255,255,255,.5)', fontSize: '.75rem', borderTop: `1px solid rgba(255,255,255,.05)` }}>
          <p style={{ marginBottom: '.5rem' }}>© {new Date().getFullYear()} Terzi Can Konyaaltı. Tüm hakları saklıdır.</p>
          <p style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.3)' }}>
            Hurma Terzi · Liman Terzi · Uncalı Terzi · Gürsu Kuru Temizleme · Konyaaltı Terzi Atölyesi
          </p>
        </footer>

      </main>
    </>
  );
}
