import type { Metadata } from 'next';

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: app/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti/page.tsx
// Tüm stiller INLINE — Tailwind olmasa bile çalışır
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL  = 'https://swaphubs.com';
const PAGE_URL  = `${BASE_URL}/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti`;
const TERZI_URL = `${BASE_URL}/terzi`;
const PHONE_DISPLAY = '+90 531 898 64 18';
const PHONE_TEL     = '+905318986418';
const TODAY = new Date().toISOString().split('T')[0];
const OG_IMAGE = `${BASE_URL}/og/terzi-can.jpg`;

// ── Google Business — Profil 1 (Liman) ──────────────────────────────────────
const GBP1_NAME   = 'Konyaaltı Terzi - Terzi Dikim Tamir Tadilat';
const GBP1_CID    = '1496201377277644027';
const GBP1_MAPS   = `https://www.google.com/maps?cid=${GBP1_CID}`;
const GBP1_SHORT  = 'https://maps.app.goo.gl/i73c4xKZwr7uaSjbA';
const GBP1_EMBED  = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12763.2!2d30.7056!3d36.8841!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39339b5158cfb%3A0xeaaa1afa8df430c0!2sKonyaalt%C4%B1+Terzi+-+Terzi+Dikim+Tamir+Tadilat!5e0!3m2!1str!2str!4v1';
const GBP1_DIR    = `https://www.google.com/maps/dir/?api=1&destination=Konyaalt%C4%B1+Terzi+-+Terzi+Dikim+Tamir+Tadilat&destination_place_id=ChIJ-4wVtTmTwxQRwDB9jfqqquoA`;
const GBP1_REVIEW = 'https://search.google.com/local/writereview?placeid=ChIJ-4wVtTmTwxQRwDB9jfqqquoA';

// ── Google Business — Profil 2 (Hurma) ──────────────────────────────────────
const GBP2_NAME   = 'ANTALYA TERZİ CAN - TAILOR';
const GBP2_CID    = '1496201834409914715';
const GBP2_MAPS   = `https://www.google.com/maps?cid=${GBP2_CID}`;
const GBP2_SHORT  = 'https://maps.app.goo.gl/rpgwjJgWZHfgafTy5';
const GBP2_EMBED  = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12763.2!2d30.6982!3d36.8923!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c393a4244a715b%3A0x66ac5fa54fba4507!2sANTALYA+TERZ%C4%B0+CAN+-+TAILOR!5e0!3m2!1str!2str!4v1';
const GBP2_DIR    = `https://www.google.com/maps/dir/?api=1&destination=ANTALYA+TERZ%C4%B0+CAN+-+TAILOR&destination_place_id=ChIJW3FKJKSTwxQRB0W6T6X1rGY`;
const GBP2_REVIEW = 'https://search.google.com/local/writereview?placeid=ChIJW3FKJKSTwxQRB0W6T6X1rGY';

const WA = (msg: string) => `https://wa.me/${PHONE_TEL.replace('+','')}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT  = WA('Merhaba! Terzi hizmetiniz hakkında bilgi almak istiyorum.');

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Konyaaltı Terzi — Elbise Dikim, Tadilat, Ütü Hizmeti | Antalya 2026',
  description:
    `${GBP1_NAME} · Terzi · Liman & Hurma Mah., Konyaaltı, Antalya · Pzt–Cmt 09:00–19:00 · Paça kısaltma, fermuar, elbise dikimi, kuru temizleme. Adrese servis. ☎ ${PHONE_DISPLAY}`,
  keywords: [
    'Konyaaltı terzi', 'Antalya terzi', 'Hurma terzi', 'Liman terzi', 'Uncalı terzi',
    'Sarısu terzi', 'Çakırlar terzi', 'Meltem terzi', 'Göbi terzi',
    'paça kısaltma Antalya', 'fermuar değişimi Antalya', 'bel daraltma Antalya',
    'elbise dikimi Antalya', 'kuru temizleme Konyaaltı', 'ütü hizmeti Antalya',
    'eve gelen terzi Konyaaltı', 'adrese gelen terzi Antalya',
    'Konyaaltı terzi fiyatları 2026', 'Antalya terzi fiyatları 2026',
    'tailor Konyaalti Antalya', 'портной Коньяалты',
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'tr': PAGE_URL,
      'en': `${BASE_URL}/online-tailor-service`,
      'ru': `${BASE_URL}/ru/atelie-antalya-online`,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Konyaaltı Terzi — Elbise Dikim, Tadilat, Ütü | Antalya 2026',
    description: `Liman & Hurma Mah., Konyaaltı · Pzt–Cmt 09:00–19:00 · Adrese servis · ☎ ${PHONE_DISPLAY}`,
    url: PAGE_URL, siteName: 'SwapHubs', locale: 'tr_TR',
    alternateLocale: ['en_US','ru_RU'], type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: GBP1_NAME, type: 'image/jpeg' }],
  },
  other: {
    'geo.region': 'TR-07', 'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056', 'ICBM': '36.8841, 30.7056',
    'content-language': 'tr',
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${BASE_URL}#website`, name: 'SwapHubs', url: BASE_URL, inLanguage: ['tr','en','ru'] },

    // İki GBP profili için Place
    { '@type': 'Place', '@id': `${PAGE_URL}#place1`, name: GBP1_NAME, hasMap: GBP1_MAPS,
      address: { '@type': 'PostalAddress', streetAddress: 'Liman Mahallesi', addressLocality: 'Konyaaltı', addressRegion: 'Antalya', postalCode: '07070', addressCountry: 'TR' },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 } },
    { '@type': 'Place', '@id': `${PAGE_URL}#place2`, name: GBP2_NAME, hasMap: GBP2_MAPS,
      address: { '@type': 'PostalAddress', streetAddress: 'Hurma Mahallesi', addressLocality: 'Konyaaltı', addressRegion: 'Antalya', postalCode: '07070', addressCountry: 'TR' },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8923, longitude: 30.6982 } },

    // LocalBusiness — ana işletme
    {
      '@type': ['ClothingStore', 'LocalBusiness'],
      additionalType: ['https://schema.org/SewingService', 'https://schema.org/DryCleaningService'],
      '@id': `${TERZI_URL}#business`,
      name: 'Terzi Can Konyaaltı',
      alternateName: [GBP1_NAME, GBP2_NAME, 'Tailor Can Antalya', 'Портной Кан Анталья'],
      description: 'Elbise dikimi, tamiri, tadilatı, fermuar değişimi, bel/paça ayarlama, elbise daraltma, elbise boyu kısaltma. Bay, bayan, çocuk kıyafetleri. Ütü ve kuru temizleme. Konyaaltı Hurma, Liman, Sarısu, Gürsu, Uncalı bölgesine ücretsiz adrese servis.',
      url: TERZI_URL, telephone: PHONE_TEL, priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB', paymentAccepted: 'Cash, Credit Card',
      image: OG_IMAGE, hasMap: GBP1_MAPS,
      sameAs: [GBP1_SHORT, GBP1_MAPS, GBP2_SHORT, GBP2_MAPS, `https://wa.me/${PHONE_TEL.replace('+','')}`],
      address: { '@type': 'PostalAddress', streetAddress: 'Hurma & Liman Mah., Konyaaltı', addressLocality: 'Antalya', addressRegion: 'Antalya', postalCode: '07070', addressCountry: 'TR' },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '19:00' }],
      areaServed: ['Hurma','Liman','Uncalı','Sarısu','Gürsu','Meltem','Göbi','Çakırlar','Öğretmenevleri','Konyaaltı','Antalya','Lara','Belek','Kemer'].map(n => ({ '@type': 'Place', name: n })),
      contactPoint: [{ '@type': 'ContactPoint', telephone: PHONE_TEL, contactType: 'customer service', availableLanguage: ['Turkish','English','Russian','German'] }],
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Terzi Can — Hizmet Kataloğu 2026',
        itemListElement: [
          { '@type': 'Offer', price: '150', priceCurrency: 'TRY', availability: 'https://schema.org/InStock', url: PAGE_URL, itemOffered: { '@type': 'Service', name: 'Paça Kısaltma' } },
          { '@type': 'Offer', price: '150', priceCurrency: 'TRY', availability: 'https://schema.org/InStock', url: PAGE_URL, itemOffered: { '@type': 'Service', name: 'Bel Daraltma' } },
          { '@type': 'Offer', price: '200', priceCurrency: 'TRY', availability: 'https://schema.org/InStock', url: PAGE_URL, itemOffered: { '@type': 'Service', name: 'Fermuar Değişimi' } },
          { '@type': 'Offer', price: '800', priceCurrency: 'TRY', availability: 'https://schema.org/InStock', url: PAGE_URL, itemOffered: { '@type': 'Service', name: 'Elbise Dikimi' } },
          { '@type': 'Offer', price: '300', priceCurrency: 'TRY', availability: 'https://schema.org/InStock', url: PAGE_URL, itemOffered: { '@type': 'Service', name: 'Kuru Temizleme' } },
          { '@type': 'Offer', price: '80',  priceCurrency: 'TRY', availability: 'https://schema.org/InStock', url: PAGE_URL, itemOffered: { '@type': 'Service', name: 'Ütü Hizmeti' } },
        ],
      },
      knowsLanguage: ['tr','ru','en','de'],
    },

    {
      '@type': 'WebPage', '@id': `${PAGE_URL}#webpage`,
      name: 'Konyaaltı Terzi — Elbise Dikim, Tadilat, Ütü Hizmeti | Antalya 2026',
      url: PAGE_URL, isPartOf: { '@id': `${BASE_URL}#website` },
      about: { '@id': `${TERZI_URL}#business` }, inLanguage: ['tr','en','ru'], dateModified: TODAY,
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList', '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Terzi Can', item: TERZI_URL },
        { '@type': 'ListItem', position: 3, name: 'Konyaaltı Terzi · Dikim · Tadilat · Ütü', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage', '@id': `${PAGE_URL}#faq`,
      mainEntity: [
        { '@type': 'Question', name: 'Konyaaltı Hurma, Liman, Uncalı, Sarısu mahallelerine adrese terzi servisi var mı?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Terzi Can olarak Konyaaltı'nın tüm mahallelerine kapıdan alım ve teslimat yapıyoruz. WhatsApp: ${PHONE_DISPLAY}` } },
        { '@type': 'Question', name: 'Paça kısaltma fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Paça kısaltma ₺150'den başlar, aynı gün teslim. WhatsApp: ${PHONE_DISPLAY}` } },
        { '@type': 'Question', name: 'Fermuar değişimi fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Fermuar değişimi ₺200'den başlar, aynı gün. WhatsApp: ${PHONE_DISPLAY}` } },
        { '@type': 'Question', name: 'Konyaaltı kuru temizleme fiyatı?', acceptedAnswer: { '@type': 'Answer', text: `Elbise kuru temizleme ₺300, mont ₺500'den başlar. WhatsApp: ${PHONE_DISPLAY}` } },
        { '@type': 'Question', name: 'Is there an English-speaking tailor in Konyaaltı Antalya?', acceptedAnswer: { '@type': 'Answer', text: `Yes! Tailor Can in Konyaaltı offers English-speaking tailoring, alterations, dry cleaning and hotel pickup. WhatsApp: ${PHONE_DISPLAY}` } },
      ],
    },
  ],
};

// ─── Tasarım tokenları ────────────────────────────────────────────────────────
const D = {
  gold: '#B8975A', gold2: '#D4A847', gold3: '#8A6E3E', goldbg: '#fef9ee',
  ink: '#1C1814', ink2: '#2E2820', ink3: '#3A3028',
  s: '#7A6E62', s2: '#A09080', s3: '#C8B8A8',
  bg: '#FAF7F2', bg2: '#F2EDE4', bg3: '#E8E0D4',
  white: '#FFFFFF', border: '#E5DDD0',
  green: '#16A34A', blue: '#2563EB', rose: '#E11D48',
  grad: 'linear-gradient(135deg,#1C1814 0%,#2E2820 60%,#3A2E20 100%)',
};

const SERVICES = [
  { icon: '✂️', title: 'Paça Kısaltma', desc: 'Kot, kumaş pantolon, etek, kadın kıyafeti. Aynı gün teslim.', price: '₺150+', time: 'Aynı gün', color: '#fef3c7', tc: '#b45309' },
  { icon: '🔗', title: 'Fermuar Değişimi', desc: 'Pantolon, mont, ceket, sweatshirt, çanta fermuarı.', price: '₺200+', time: 'Aynı gün', color: '#fce7f3', tc: '#9d174d' },
  { icon: '📐', title: 'Bel Daraltma', desc: 'Elbise, pantolon, ceket bel daraltma ve elbise boyunu kısaltma.', price: '₺150+', time: '24 saat', color: '#ede9fe', tc: '#5b21b6' },
  { icon: '🪡', title: 'Elbise Dikimi', desc: 'Kadın elbise, abiye, gelinlik, erkek takım elbise, gömlek.', price: '₺600+', time: '3–7 gün', color: '#dcfce7', tc: '#15803d' },
  { icon: '💨', title: 'Ütü & Kuru Temizleme', desc: 'Profesyonel buharlı pres, kuru temizleme. Otel/ev alım-teslim.', price: '₺80+', time: '2–48 saat', color: '#dbeafe', tc: '#1d4ed8' },
  { icon: '🚗', title: 'Adrese Gelen Terzi', desc: 'Terziniz kapınıza gelir, ölçü alır, max 24 saatte teslim eder.', price: 'Ücretsiz', time: '—', color: '#f0fdf4', tc: '#166534' },
];

const PRICES = [
  ['Paça Kısaltma', '₺150+', 'Aynı gün'],
  ['Bel Daraltma', '₺150+', '24 saat'],
  ['Elbise Tamiri', '₺150+', 'Aynı gün'],
  ['Gömlek Tamiri', '₺150+', 'Aynı gün'],
  ['T-Shirt Tamiri', '₺100+', 'Aynı gün'],
  ['Fermuar Değişimi', '₺200+', 'Aynı gün'],
  ['Ceket / Mont Tamiri', '₺200+', '24 saat'],
  ['Kol Kısaltma', '₺200+', '48 saat'],
  ['Abiye Tamiri', '₺400+', '24–48 saat'],
  ['Kadın Elbise Dikimi', '₺600+', '3–5 gün'],
  ['Abiye / Gece Elbisesi', '₺1.200+', '5–7 gün'],
  ['Erkek Takım Elbise', '₺2.500+', '5–7 gün'],
  ['Gelinlik Dikimi', '₺5.000+', '14–21 gün'],
  ['Gömlek Ütü', '₺80+', '2–6 saat'],
  ['Takım Elbise Pres', '₺150+', '2–6 saat'],
  ['Elbise Kuru Temizleme', '₺300+', '24–48 saat'],
  ['Mont Kuru Temizleme', '₺500+', '48 saat'],
  ['Adrese Alım-Teslim', 'ÜCRETSİZ', '—'],
];

const FAQS = [
  ['Konyaaltı Hurma, Liman, Uncalı mahallelerine adrese terzi servisi var mı?', `Evet! Terzi Can olarak Konyaaltı'nın tüm mahallelerine kapıdan alım ve teslimat yapıyoruz. WhatsApp: ${PHONE_DISPLAY}`],
  ['Paça kısaltma fiyatı 2026?', `₺150'den başlar, aynı gün teslim. WhatsApp: ${PHONE_DISPLAY}`],
  ['Fermuar değişimi kaç lira?', `₺200'den başlar, aynı gün. Mont, ceket, pantolon fermuarı. WhatsApp: ${PHONE_DISPLAY}`],
  ['Elbise dikimi fiyatı?', `Kadın elbise ₺600+, abiye ₺1.200+, erkek takım ₺2.500+ . WhatsApp: ${PHONE_DISPLAY}`],
  ['Kuru temizleme fiyatı?', `Elbise ₺300+, mont ₺500+. Konyaaltı içi ücretsiz alım-teslim. WhatsApp: ${PHONE_DISPLAY}`],
  ['Terzi çağır, adrese gelir mi?', `Evet! WhatsApp'tan randevu alın, terzimiz Hurma, Liman, Uncalı, Sarısu ve tüm Konyaaltı mahallelerine gelir. WhatsApp: ${PHONE_DISPLAY}`],
];

const NEIGHBORHOODS = [
  'Hurma', 'Liman', 'Uncalı', 'Sarısu', 'Gürsu',
  'Meltem', 'Göbi', 'Çakırlar', 'Öğretmenevleri', 'Konyaaltı Merkez',
];

export default function KonyaaltiTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ minHeight: '100vh', background: D.bg, color: D.ink, fontFamily: 'var(--font-jakarta,system-ui,sans-serif)', overflowX: 'hidden' }} className="pb-24">

        {/* Floating buttons */}
        <div style={{ position: 'fixed', bottom: 80, right: 16, zIndex: 100, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href={`tel:${PHONE_TEL}`}
            style={{ width: 52, height: 52, borderRadius: '50%', background: D.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.35)' }}>
            📞
          </a>
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer"
            style={{ width: 52, height: 52, borderRadius: '50%', background: '#25d366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,.45)' }}>
            💬
          </a>
        </div>

        {/* ─── HERO ─────────────────────────────────────────────────────────── */}
        <header style={{ background: D.grad, color: '#fff', padding: '4.5rem 1.25rem 3.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${D.gold},transparent)` }} />
          <div style={{ position: 'absolute', top: -100, right: -100, width: 350, height: 350, borderRadius: '50%', background: 'rgba(184,151,90,.05)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
            <span style={{ display: 'inline-block', background: 'rgba(184,151,90,.15)', border: '1px solid rgba(184,151,90,.4)', color: D.gold2, padding: '.4rem 1.1rem', borderRadius: 999, fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '1.4rem' }}>
              ✦ Konyaaltı · Antalya · Terzi & Dikiş Atölyesi
            </span>

            <h1 style={{ fontFamily: 'var(--font-unbounded,Georgia,serif)', fontSize: 'clamp(1.9rem,5.5vw,3.2rem)', fontWeight: 700, lineHeight: 1.08, margin: '0 0 1.1rem', letterSpacing: '-.02em' }}>
              Konyaaltı Terzi —<br />
              <span style={{ color: D.gold2, fontWeight: 300, fontSize: '80%' }}>Dikim · Tadilat · Ütü · Kuru Temizleme</span>
            </h1>

            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.72)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 1.8rem' }}>
              <strong style={{ color: '#fff' }}>Terzi Can</strong> — Konyaaltı'nda 2017'den beri hizmet veren profesyonel terzi atölyesi.
              Hurma, Liman, Uncalı, Sarısu, Gürsu ve tüm Konyaaltı mahallelerine
              <strong style={{ color: D.gold2 }}> ücretsiz adrese servis</strong>.
            </p>

            {/* Dil ve özellik badge'leri */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: '2rem' }}>
              {[['🇹🇷','Türkçe'],['🇬🇧','English'],['🇷🇺','Русский'],['🇩🇪','Deutsch']].map(([f,l]) => (
                <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.75)', padding: '.3rem .8rem', borderRadius: 8, fontSize: '.72rem' }}>
                  {f} {l}
                </span>
              ))}
            </div>

            {/* CTA butonlar */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', padding: '.9rem 1.8rem', borderRadius: 10, fontWeight: 800, textDecoration: 'none', fontSize: '.88rem', boxShadow: '0 4px 20px rgba(37,211,102,.4)' }}>
                💬 Terzi Çağır — WhatsApp
              </a>
              <a href={`tel:${PHONE_TEL}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.1)', color: '#fff', padding: '.9rem 1.6rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: '.88rem', border: '1px solid rgba(255,255,255,.2)' }}>
                📞 {PHONE_DISPLAY}
              </a>
            </div>

            {/* Stat şeridi */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(255,255,255,.06)', marginTop: '2.5rem', maxWidth: 600, margin: '2.5rem auto 0', borderRadius: 8, overflow: 'hidden' }}>
              {[['2017','Açılış yılı'],['Max 24 Sa','Aynı gün teslim'],['10+','Yıllık deneyim'],['Tüm Konyaaltı','Adrese servis']].map(([n,l]) => (
                <div key={l} style={{ padding: '1rem .5rem', textAlign: 'center', background: 'rgba(255,255,255,.03)' }}>
                  <div style={{ fontFamily: 'var(--font-unbounded,Georgia,serif)', fontSize: '.95rem', color: D.gold2, fontWeight: 700, marginBottom: 3 }}>{n}</div>
                  <div style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ─── HARİTA KARTI — Profil 1 (ana) ───────────────────────────────── */}
        <section style={{ maxWidth: 580, margin: '-2rem auto 0', padding: '0 1rem', position: 'relative', zIndex: 10 }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 16px 48px rgba(0,0,0,.18)', border: `1px solid ${D.border}`, overflow: 'hidden' }}>
            <div style={{ padding: '1.3rem 1.4rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 900, margin: 0, lineHeight: 1.3, color: D.ink }}>{GBP1_NAME}</h2>
                  <p style={{ fontSize: '.78rem', color: D.s, margin: '.3rem 0 0' }}>Liman, 07070 Konyaaltı/Antalya</p>
                </div>
                <span style={{ flexShrink: 0, background: '#ecfdf5', color: '#065f46', fontSize: '.68rem', fontWeight: 700, padding: '.28rem .7rem', borderRadius: 999 }}>
                  ● Açık
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: '.82rem', flexWrap: 'wrap' }}>
                <span style={{ color: D.gold2, fontWeight: 700 }}>Terzi · Kadın Terzisi · Erkek Terzisi</span>
              </div>
              <div style={{ fontSize: '.76rem', color: D.s, marginTop: 4 }}>Pzt–Cmt 09:00–19:00</div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 14 }}>
                {[
                  { href: GBP1_DIR, ic: '🧭', label: 'Yol Tarifi', bg: D.blue },
                  { href: GBP1_MAPS, ic: '🗺️', label: 'Haritada', bg: D.ink },
                  { href: GBP1_REVIEW, ic: '⭐', label: 'Yorum Yaz', bg: D.gold },
                ].map(btn => (
                  <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: btn.bg, color: '#fff', padding: '.75rem 0', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '.68rem' }}>
                    <span style={{ fontSize: '1rem' }}>{btn.ic}</span>{btn.label}
                  </a>
                ))}
              </div>
            </div>

            <a href={GBP1_MAPS} target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'relative' }}>
              <iframe src={GBP1_EMBED} width="100%" height="200"
                style={{ border: 0, display: 'block', pointerEvents: 'none' }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title={`${GBP1_NAME} — harita`} />
              <div style={{ position: 'absolute', bottom: 8, right: 8, background: '#fff', borderRadius: 8, padding: '.3rem .7rem', fontSize: '.68rem', fontWeight: 700, color: D.ink, boxShadow: '0 2px 8px rgba(0,0,0,.15)' }}>
                📍 Haritada Aç →
              </div>
            </a>
          </div>
        </section>

        {/* ─── HIZLI İLETİŞİM ─────────────────────────────────────────────── */}
        <section style={{ maxWidth: 820, margin: '1.5rem auto 0', padding: '0 1rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,.07)', border: `1px solid ${D.border}`, padding: '1.2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 10 }}>
            {[
              { href: WA_DEFAULT, bg: '#25d366', label: 'WhatsApp Yaz', sub: 'Hızlı yanıt', blank: true },
              { href: GBP1_DIR, bg: D.rose, label: 'Yol Tarifi Al', sub: 'Google Maps', blank: true },
              { href: `tel:${PHONE_TEL}`, bg: D.ink, label: 'Telefon Et', sub: PHONE_DISPLAY, blank: false },
            ].map(btn => (
              <a key={btn.label} href={btn.href} {...(btn.blank ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{ background: btn.bg, color: '#fff', padding: '1rem', borderRadius: 12, textDecoration: 'none', textAlign: 'center', fontWeight: 800, fontSize: '.88rem', display: 'block' }}>
                {btn.label}
                <div style={{ fontWeight: 400, fontSize: '.7rem', opacity: .8, marginTop: 4 }}>{btn.sub}</div>
              </a>
            ))}
          </div>
        </section>

        {/* ─── SEO METİN + MAHALLELER ─────────────────────────────────────── */}
        <section style={{ maxWidth: 720, margin: '2.5rem auto 0', padding: '0 1.2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '.88rem', color: D.s, lineHeight: 1.85, margin: '0 0 1.5rem' }}>
            <strong style={{ color: D.ink }}>Terzi Can</strong> — Konyaaltı merkezli profesyonel terzi atölyesi.
            Elbise dikimi, paça kısaltma, fermuar değişimi, bel daraltma, kuru temizleme ve ütü.
            Hurma, Liman, Uncalı, Sarısu ve tüm Konyaaltı mahallelerine ücretsiz kapıdan alım-teslim.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 10 }}>
            {NEIGHBORHOODS.map(n => (
              <span key={n} style={{ background: D.bg2, border: `1px solid ${D.border}`, borderRadius: 20, padding: '.32rem .85rem', fontSize: '.76rem', color: D.s, fontWeight: 500 }}>
                📍 {n} Terzi
              </span>
            ))}
          </div>
          <p style={{ fontSize: '.74rem', color: D.s2, marginTop: 6 }}>* Belirtilen mahallelerden alım + teslimat ücretsizdir.</p>
        </section>

        {/* ─── HİZMETLER ──────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 900, margin: '3rem auto 0', padding: '0 1.2rem' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-unbounded,Georgia,serif)', fontSize: 'clamp(1.4rem,3.5vw,2rem)', fontWeight: 700, margin: '0 0 1.8rem', letterSpacing: '-.02em', color: D.ink }}>
            Hizmetlerimiz
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }}>
            {SERVICES.map(s => (
              <div key={s.title} style={{ background: '#fff', border: `1px solid ${D.border}`, borderRadius: 14, padding: '1.3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${s.tc},transparent)` }} />
                <div style={{ width: 40, height: 40, background: s.color, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', marginBottom: 10 }}>{s.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: '.98rem', margin: '0 0 6px', color: D.ink }}>{s.title}</h3>
                <p style={{ color: D.s, fontSize: '.82rem', lineHeight: 1.6, margin: '0 0 10px' }}>{s.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ display: 'inline-block', fontSize: '.72rem', fontWeight: 800, color: s.tc, background: s.color, padding: '.22rem .6rem', borderRadius: 6 }}>{s.price}</span>
                  <span style={{ fontSize: '.68rem', color: s.time === 'Aynı gün' ? D.green : D.s, fontWeight: s.time === 'Aynı gün' ? 700 : 400 }}>⏱ {s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FİYAT TABLOSU ──────────────────────────────────────────────── */}
        <section style={{ maxWidth: 760, margin: '3rem auto 0', padding: '0 1.2rem' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-unbounded,Georgia,serif)', fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 700, margin: '0 0 1.5rem', letterSpacing: '-.02em', color: D.ink }}>
            Fiyat Listesi 2026
          </h2>
          <div style={{ background: '#fff', border: `1px solid ${D.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,.06)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 360 }}>
                <thead>
                  <tr style={{ background: D.ink }}>
                    {['Hizmet','Fiyat','Süre'].map((h,i) => (
                      <th key={h} style={{ textAlign: i===0?'left':'right', padding: '.75rem 1rem', fontSize: '.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRICES.map(([s,p,t], i) => (
                    <tr key={s} style={{ borderBottom: `1px solid ${D.border}`, background: i%2 ? D.bg : '#fff' }}>
                      <td style={{ padding: '.8rem 1rem', fontSize: '.84rem', color: D.ink }}>{s}</td>
                      <td style={{ padding: '.8rem 1rem', textAlign: 'right', fontWeight: 700, color: p==='ÜCRETSİZ' ? D.green : D.gold, fontSize: '.88rem' }}>{p}</td>
                      <td style={{ padding: '.8rem 1rem', textAlign: 'right', fontSize: '.72rem', color: t==='Aynı gün' ? D.green : D.s, fontWeight: t==='Aynı gün' ? 600 : 400 }}>{t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '.75rem', color: D.s2, marginTop: 10 }}>
            * Başlangıç fiyatları. Kesin fiyat için{' '}
            <a href={WA('Merhaba, fiyat bilgisi almak istiyorum.')} target="_blank" rel="noopener noreferrer" style={{ color: D.gold, textDecoration: 'none', fontWeight: 700 }}>WhatsApp</a>'tan yazın.
          </p>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: D.gold, color: '#fff', padding: '.85rem 2rem', borderRadius: 10, fontWeight: 800, textDecoration: 'none', fontSize: '.88rem' }}>
              📲 Ücretsiz Fiyat Teklifi Al
            </a>
          </div>
        </section>

        {/* ─── TERZI ÇAĞIR — ADRESE SERVIS ─────────────────────────────────── */}
        <section style={{ background: D.ink, margin: '3rem 0 0', padding: '3.5rem 1.2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', background: 'rgba(184,151,90,.15)', border: '1px solid rgba(184,151,90,.3)', color: D.gold2, padding: '.35rem .9rem', borderRadius: 999, fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '1.2rem' }}>
              🚗 Adrese Gelen Terzi Servisi
            </span>
            <h2 style={{ fontFamily: 'var(--font-unbounded,Georgia,serif)', fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 700, color: '#fff', margin: '0 0 .8rem', letterSpacing: '-.02em' }}>
              Terzi Çağır,{' '}
              <span style={{ color: D.gold2 }}>Terzi Gelsin</span>
            </h2>
            <p style={{ fontSize: '.92rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Siz yorulmayın — terzimiz adresinize gelsin. Konyaaltı'nın tüm mahallelerinde
              profesyonel ve hızlı terzi hizmeti kapınızda. Ölçü alır, en geç <strong style={{ color: D.gold2 }}>24 saatte</strong> teslim eder.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 10, maxWidth: 560, margin: '0 auto 2rem', background: 'rgba(255,255,255,.06)', borderRadius: 12, padding: '1px' }}>
              {[['📍','Arayın / Yazın','WhatsApp veya telefon'],['📏','Terzi Gelir','Ölçü alır / teslim alır'],['✂️','24 Saat','Tadilat tamamlanır'],['🚗','Kapıya Teslim','Tekrar getirilir']].map(([ic,t,d]) => (
                <div key={t} style={{ padding: '1.2rem .8rem', textAlign: 'center', background: 'rgba(255,255,255,.04)', borderRadius: 11 }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>{ic}</div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '.82rem', marginBottom: 4 }}>{t}</div>
                  <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)' }}>{d}</div>
                </div>
              ))}
            </div>
            <a href={WA('Merhaba, adresime terzi servisi istiyorum.')} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: D.gold, color: '#fff', padding: '.9rem 2rem', borderRadius: 10, fontWeight: 800, textDecoration: 'none', fontSize: '.88rem' }}>
              📍 Terzi Çağır — {PHONE_DISPLAY}
            </a>
          </div>
        </section>

        {/* ─── SSS ─────────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 700, margin: '3rem auto 0', padding: '0 1.2rem' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-unbounded,Georgia,serif)', fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 700, margin: '0 0 1.5rem', letterSpacing: '-.02em', color: D.ink }}>
            Sık Sorulan Sorular
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map(([q,a], i) => (
              <details key={q} style={{ background: '#fff', border: `1px solid ${D.border}`, borderRadius: 12 }} open={i < 2}>
                <summary style={{ padding: '1rem 1.2rem', fontWeight: 700, fontSize: '.9rem', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: D.ink }}>
                  {q}
                  <span style={{ color: D.gold, marginLeft: 8, flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: '.25rem 1.2rem 1rem', fontSize: '.83rem', color: D.s, lineHeight: 1.75, borderTop: `1px solid ${D.border}` }}>{a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ─── İKİ PROFİL HARİTASI ────────────────────────────────────────── */}
        <section style={{ maxWidth: 900, margin: '3rem auto 0', padding: '0 1.2rem' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-unbounded,Georgia,serif)', fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 700, margin: '0 0 .5rem', color: D.ink }}>
            Konumumuz — İki Atölye
          </h2>
          <p style={{ textAlign: 'center', fontSize: '.82rem', color: D.s, marginBottom: '1.5rem' }}>
            Liman Mah. ve Hurma Mah. olmak üzere Konyaaltı'nda iki atölyemiz var.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
            {[
              { name: GBP1_NAME, addr: 'Liman Mahallesi, Konyaaltı / Antalya', embed: GBP1_EMBED, maps: GBP1_MAPS, dir: GBP1_DIR, review: GBP1_REVIEW },
              { name: GBP2_NAME, addr: 'Hurma Mah., 37. Cd No:50, Konyaaltı / Antalya', embed: GBP2_EMBED, maps: GBP2_MAPS, dir: GBP2_DIR, review: GBP2_REVIEW },
            ].map(p => (
              <div key={p.name} style={{ background: '#fff', border: `1px solid ${D.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,.07)' }}>
                <a href={p.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'relative' }}>
                  <iframe src={p.embed} width="100%" height="200" style={{ border: 0, display: 'block', pointerEvents: 'none' }}
                    loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={p.name} />
                  <div style={{ position: 'absolute', bottom: 8, right: 8, background: '#fff', borderRadius: 8, padding: '.3rem .7rem', fontSize: '.68rem', fontWeight: 700, color: D.ink, boxShadow: '0 2px 8px rgba(0,0,0,.15)' }}>
                    📍 Haritada Aç
                  </div>
                </a>
                <div style={{ padding: '1rem 1.1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '.85rem', color: D.ink, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: '.74rem', color: D.s, marginBottom: 12 }}>📍 {p.addr}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <a href={p.dir} target="_blank" rel="noopener noreferrer"
                      style={{ flex: 1, background: D.blue, color: '#fff', padding: '.5rem 0', borderRadius: 8, textDecoration: 'none', textAlign: 'center', fontSize: '.7rem', fontWeight: 700 }}>
                      🧭 Yol Tarifi
                    </a>
                    <a href={p.maps} target="_blank" rel="noopener noreferrer"
                      style={{ flex: 1, background: D.ink, color: '#fff', padding: '.5rem 0', borderRadius: 8, textDecoration: 'none', textAlign: 'center', fontSize: '.7rem', fontWeight: 700 }}>
                      🗺️ Haritada
                    </a>
                    <a href={p.review} target="_blank" rel="noopener noreferrer"
                      style={{ flex: 1, background: D.gold, color: '#fff', padding: '.5rem 0', borderRadius: 8, textDecoration: 'none', textAlign: 'center', fontSize: '.7rem', fontWeight: 700 }}>
                      ⭐ Yorum
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: `linear-gradient(135deg,${D.bg2},${D.bg3})`, border: `1px solid ${D.border}`, borderRadius: 12, padding: '1rem 1.2rem', marginTop: 16, fontSize: '.78rem', color: D.s, lineHeight: 1.7 }}>
            <strong style={{ color: D.ink }}>💡 İpucu:</strong> Her iki profilimize Google'da yorum bırakabilirsiniz — bu Google harita sıralamalarımızı doğrudan etkiler.
          </div>
        </section>

        {/* ─── ÇOK DİLLİ BÖLÜM ───────────────────────────────────────────── */}
        <section style={{ maxWidth: 900, margin: '3rem auto 0', padding: '0 1.2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-unbounded,Georgia,serif)', fontSize: 'clamp(1.2rem,3vw,1.6rem)', fontWeight: 700, margin: '0 0 1.2rem', color: D.ink }}>
            Tailor in Antalya{' '}
            <span style={{ color: D.gold, fontWeight: 300 }}>· English · Русский · Deutsch</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            {[
              { flag: '🇬🇧', lang: 'English', title: 'Professional Tailor in Konyaaltı', body: `Tailor Can offers English-speaking tailoring, alterations, dry cleaning and hotel pickup. WhatsApp: ${PHONE_DISPLAY}`, wa: 'Hello, I need tailoring service in Konyaalti Antalya.' },
              { flag: '🇷🇺', lang: 'Русский', title: 'Портной в Коньяалты Анталья', body: `Портной Кан — пошив, подгонка одежды, химчистка. Говорим по-русски. WhatsApp: ${PHONE_DISPLAY}`, wa: 'Здравствуйте, мне нужен портной в Коньяалты Анталья.' },
              { flag: '🇩🇪', lang: 'Deutsch', title: 'Schneider in Konyaalti Antalya', body: `Schneider Can bietet Maßschneiderei, Änderungsservice und Reinigung. WhatsApp: ${PHONE_DISPLAY}`, wa: 'Hallo, ich brauche einen Schneider in Konyaalti Antalya.' },
            ].map(({ flag, lang, title, body, wa: waMsg }) => (
              <div key={lang} style={{ background: '#fff', border: `1px solid ${D.border}`, borderRadius: 12, padding: '1.3rem', borderLeft: `4px solid ${D.gold}` }}>
                <div style={{ fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: D.gold, marginBottom: 6, fontWeight: 700 }}>{flag} {lang}</div>
                <div style={{ fontWeight: 800, fontSize: '.9rem', color: D.ink, marginBottom: 6 }}>{title}</div>
                <p style={{ fontSize: '.8rem', color: D.s, lineHeight: 1.7, margin: '0 0 10px' }}>{body}</p>
                <a href={WA(waMsg)} target="_blank" rel="noopener noreferrer" style={{ fontSize: '.72rem', color: D.gold, textDecoration: 'none', fontWeight: 700 }}>WhatsApp →</a>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SON CTA ─────────────────────────────────────────────────────── */}
        <section style={{ background: D.gold, margin: '3rem 0 0', padding: '3rem 1.2rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-unbounded,Georgia,serif)', fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 700, color: '#fff', margin: '0 0 .75rem', letterSpacing: '-.02em' }}>
            Terziniz Kapınıza Gelsin
          </h2>
          <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.85)', margin: '0 auto 1.8rem', maxWidth: 560, lineHeight: 1.7 }}>
            Hurma · Liman · Uncalı · Sarısu · Çakırlar · Meltem · Göbi ve tüm Konyaaltı mahallelerine
            <strong> ücretsiz adrese gelen terzi servisi.</strong>
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#fff', color: D.gold, padding: '.9rem 1.8rem', borderRadius: 10, fontWeight: 800, textDecoration: 'none', fontSize: '.88rem' }}>
              💬 WhatsApp ile Yaz
            </a>
            <a href={`tel:${PHONE_TEL}`}
              style={{ display: 'inline-block', border: '2px solid rgba(255,255,255,.7)', color: '#fff', padding: '.9rem 1.6rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: '.88rem' }}>
              📞 Hemen Ara
            </a>
          </div>
        </section>

        {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
        <footer style={{ background: D.ink2, padding: '2rem 1.2rem', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-unbounded,Georgia,serif)', fontSize: '.95rem', color: D.gold2, marginBottom: 6 }}>
            Terzi Can · Tailor Can · Портной Кан · Schneider Can
          </div>
          <p style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.25)', margin: '0 0 .6rem' }}>
            © {new Date().getFullYear()} SwapHubs · {PHONE_DISPLAY} · Konyaaltı, Antalya
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: '.8rem' }}>
            {[['/terzi','Terzi Can'],['/online-tailor-service','Online Tailor (EN)'],[`/ru/atelie-antalya-online`,'Портной (RU)'],[GBP1_MAPS,'Google Maps']].map(([h,l]) => (
              <a key={h} href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ fontSize: '.7rem', color: 'rgba(148,163,184,.45)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
            {['Konyaaltı Terzi','Hurma Terzi','Liman Terzi','Uncalı Terzi','Sarısu Terzi','Çakırlar Terzi','Paça Kısaltma','Fermuar Değişimi','Kuru Temizleme Konyaaltı'].map(k => (
              <span key={k} style={{ fontSize: '.58rem', color: 'rgba(122,112,96,.3)', border: '1px solid rgba(122,112,96,.1)', padding: '.15rem .5rem', borderRadius: 4 }}>{k}</span>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
