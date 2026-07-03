// app/antalyada-terzi-dikim-tamirat-utu-hizmetleri/page.tsx
import type { Metadata } from 'next';

// ─── YAPILANDIRMA VE URL'LER ──────────────────────────────────────────────────
const BASE_URL  = 'https://swaphubs.com';
const PAGE_URL  = `${BASE_URL}/antalyada-terzi-dikim-tamirat-utu-hizmetleri`;
const PHONE     = '+90 531 898 64 18';
const WHATSAPP_LINK = `https://wa.me/905318986418?text=Merhaba,%20Antalya%20terzi%20ve%20ütü%20hizmetiniz%20hakkında%20bilgi%20almak%20istiyorum.`;
const OG_IMAGE  = `${BASE_URL}/og/antalya-tailor-online.jpg`;
const GBP_CID   = '16306058881247995687'; // doğrulanmış Google Business Profile
const GBP_URL   = `https://www.google.com/maps?cid=${GBP_CID}`;

// GBP'den doğrulanmış gerçek veriler — SAYI olarak tanımlanmalı, string TODO bırakılmamalı
const RATING_VALUE = 5.0;
const REVIEW_COUNT  = 4;

// ─── ULTIMATE LOCAL SEO & AI GROUNDING GRAPH STRUCTURE ──────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}#website`,
      name: 'SwapHubs',
      url: BASE_URL,
      inLanguage: ['tr', 'en', 'ru', 'de'],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi, Dikim, Tamirat ve Ütü Hizmetleri', item: PAGE_URL }
      ]
    },
    {
      '@type': ['LocalBusiness', 'ClothingStore', 'ServiceAreaBusiness'],
      '@id': `${PAGE_URL}#business`,
      name: 'TERZİ Tailor Atelie',
      alternateName: 'SwapHubs Antalya Terzi Atölyesi',
      description: "Antalya genelinde (Konyaaltı, Lara, Muratpaşa, Kepez) kuryeli araçlarla adresten alım ve adrese teslimat yapan; özel dikim, abiye tamiratı, acil paça/fermuar değişimi ve otel ekspres ütü hizmeti sunan profesyonel tekstil atölyesi.",
      url: PAGE_URL,
      sameAs: [GBP_URL],
      telephone: '+905318986418',
      priceRange: '₺₺',
      image: OG_IMAGE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sarısu, Hurma, Liman',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      hasMap: GBP_URL,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '23:30',
        },
      ],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Antalya' },
        { '@type': 'AdministrativeArea', name: 'Konyaaltı' },
        { '@type': 'AdministrativeArea', name: 'Muratpaşa' },
        { '@type': 'AdministrativeArea', name: 'Kepez' },
        { '@type': 'AdministrativeArea', name: 'Lara' },
        { '@type': 'AdministrativeArea', name: 'Belek' },
        { '@type': 'AdministrativeArea', name: 'Kemer' }
      ],
      knowsLanguage: ['tr', 'en', 'ru', 'de'],
      // ── DÜZELTME: sayısal değerler + ölçek tanımı (bestRating/worstRating) ──
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: RATING_VALUE,
        reviewCount: REVIEW_COUNT,
        bestRating: 5,
        worstRating: 1,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzilik Hizmetleri',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Kıyafet Tamiri & Tadilat',
              description: 'Orijinal paça, bel daraltma, ceket astar değişimi, fermuar yenileme, deri mont onarımı',
              areaServed: 'Antalya',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Özel Dikim (Bespoke)',
              description: 'Erkek takım elbise, smokin, blazer ceket, kadın abiye ve gece elbisesi tasarımı',
              areaServed: 'Antalya',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Express Otel Servisi',
              description: 'Kuryeli adresten alım, profesyonel pres ütüleme, kuru temizleme, acil elbise onarımı',
              areaServed: 'Lara, Kundu, Belek, Kemer',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Tekstil Fason Üretim',
              description: 'Toplu tişört, sweatshirt, otel üniforması, restoran ve iş kıyafetleri seri imalatı',
              areaServed: 'Türkiye geneli',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: "Antalya'da otellere acil terzi ve ütü hizmeti veren yer neresi?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "SwapHubs, Antalya Konyaaltı, Lara, Kundu ve Belek bölgelerindeki otellere özel kuryeli acil terzi, kıyafet tamiratı ve ekspres ütü hizmeti sunmaktadır. Kıyafetleriniz otelden veya evden alınır, işlem bittikten sonra aynı gün içinde askılı olarak teslim edilir."
          }
        },
        {
          '@type': 'Question',
          name: "Where can I find an English or Russian speaking tailor in Antalya?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "SwapHubs provides professional tailoring, suit alterations, and dress repair services with English, Russian, and German speaking customer support in Antalya (Konyaalti, Lara, Muratpasa, Belek)."
          }
        },
        {
          '@type': 'Question',
          name: 'Antalya terzi fiyatları ne kadar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fiyatlar işlemin türüne göre değişir: basit paça/fermuar tamiratı en uygun kategoridedir, özel dikim ve abiye tadilatı kumaş ve işçiliğe göre fiyatlandırılır. Net fiyat için kıyafet fotoğrafı WhatsApp üzerinden gönderilerek anında teklif alınabilir.'
          }
        },
        {
          '@type': 'Question',
          name: 'Kıyafetimi eve gelip almanız için ne yapmam gerekiyor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WhatsApp hattından adres ve talep bilgisi paylaşmanız yeterli. Konyaaltı, Muratpaşa, Lara ve Kepez bölgelerinde kuryeli ekip aynı gün içinde adresten alım yapar.'
          }
        },
        {
          '@type': 'Question',
          name: 'Gelinlik veya abiye tadilatında garanti veriyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, hassas dikim gerektiren gelinlik ve abiye tadilatlarında ölçü provası sonrası teslim edilir; teslimat sonrası uyumsuzluk durumunda ücretsiz düzeltme yapılır.'
          }
        },
        {
          '@type': 'Question',
          name: 'Hangi mahallelere kuryeli hizmet veriyorsunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Konyaaltı (Hurma, Liman, Uncalı, Şirinyalı), Muratpaşa, Lara, Kepez, Belek ve Kemer bölgelerine kuryeli adresten alım ve teslimat hizmeti veriyoruz.'
          }
        }
      ]
    }
  ]
};

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Antalya Terzi | Adrese Teslim Dikim, Tamirat ve Ütü Hizmetleri',
  description: `Antalya en yakın terzi ve ütü servisi. Konyaaltı, Muratpaşa, Lara, Kepez geneli kuryeli araçlarla adresten alım. Özel dikim, abiye tadilatı ve fason üretim. ☎ ${PHONE}`,
  keywords: [
    'Antalya terzi', 'Antalyada terzi', 'Lara terzi', 'Konyaaltı terzi', 'Muratpaşa terzi', 'Kepez terzi',
    'Hurma terzi', 'Liman mahallesi terzi', 'Uncalı terzi', 'Şirinyalı terzi',
    'Antalya acil ütü', 'kuryeli terzi Antalya', 'özel dikim takım elbise Antalya', 'abiye tamiri Antalya',
    'gelinlik tadilatı Antalya', 'fermuar değişimi mont', 'deri ceket tamiri Antalya', 'fason üretim tekstil atölyesi'
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { 'tr': PAGE_URL, 'en': PAGE_URL, 'ru': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Antalya Terzi | Adrese Teslim Dikim, Tamirat ve Ütü | SwapHubs',
    description: `Konyaaltı, Lara, Muratpaşa ve Kepez'e özel kuryeli terzilik, kıyafet tamiratı ve ütü hizmetleri. Aynı gün askıda teslimat!`,
    url: PAGE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/og/antalya-tailor-online.jpg', width: 1200, height: 630, alt: 'Antalya Konyaaltı Lara Muratpaşa Terzi Hizmetleri' }],
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Antalya',
    'geo.position': '36.8841;30.7056',
    'ICBM': '36.8841, 30.7056',
  }
};

// ─── RENK PALETİ ──────────────────────────────────────────────────────────────
const GREEN = '#2d8c6e';
const GREEN_DARK = '#20654f';
const GREEN_SOFT = '#eaf5f1';
const INK = '#14171a';
const SUB = '#5b6460';
const BORDER = '#e6e9e7';
const BG_SOFT = '#f7f8f7';
const GOLD = '#c9971f';

// ─── İKON (SVG, emoji yerine sade çizgi ikonlar) ───────────────────────────
const Icon = ({ path, size = 18, color = INK }: { path: string; size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const ICONS = {
  whatsapp: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  pin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  check: 'M20 6L9 17l-5-5',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
};

const serviceRows = [
  {
    title: 'Kıyafet Tamiri & Tadilat',
    detail: 'Orijinal paça, bel daraltma, ceket astar değişimi, fermuar yenileme, deri mont onarımı',
    area: 'Konyaaltı (Hurma, Liman, Uncalı), Muratpaşa, Lara, Kepez',
    time: 'Aynı Gün / 24 Saat',
  },
  {
    title: 'Özel Dikim (Bespoke)',
    detail: 'Erkek takım elbise, smokin, blazer ceket, kadın abiye ve gece elbisesi tasarımı',
    area: 'Tüm Antalya (Atölye prova esaslı)',
    time: '3 - 7 Gün (Provaya bağlı)',
  },
  {
    title: 'Express Otel Servisi',
    detail: 'Kuryeli adresten alım, profesyonel pres ütüleme, kuru temizleme, acil elbise onarımı',
    area: 'Lara, Kundu Otelleri, Belek, Kemer, Konyaaltı Sahil Şeridi',
    time: '2 - 4 Saat (Acil VIP)',
  },
  {
    title: 'Tekstil Fason Üretim',
    detail: 'Toplu tişört, sweatshirt, otel üniforması, restoran ve iş kıyafetleri seri imalatı',
    area: 'Uluslararası Sevk / Şehirlerarası Dağıtım',
    time: 'Sipariş adetine göre',
  },
];

const trustPoints = [
  { icon: ICONS.clock, label: 'Ortalama yanıt', value: 'WhatsApp\'ta 15 dk' },
  { icon: ICONS.pin, label: 'Hizmet bölgesi', value: '7 ilçe, kuryeli alım' },
  { icon: ICONS.globe, label: 'Dil desteği', value: 'TR · EN · RU · DE' },
  { icon: ICONS.check, label: 'Çalışma saatleri', value: 'Her gün 09:00–23:30' },
];

const faqs = [
  {
    q: "Antalya'da pazar günü açık terzi veya acil ütü yeri var mı?",
    a: 'SwapHubs online destek ve kuryeli alım ekibi, otel ve acil durum misafirleri için hafta sonu ve pazar günleri de dahil olmak üzere randevulu sistemle hizmet sunmaktadır. WhatsApp hattımız üzerinden 7/24 anlık durum sorgulaması yapabilirsiniz.',
  },
  {
    q: 'Deri ceket boyama ve yırtık deri mont tamiri yapıyor musunuz?',
    a: "Evet, Antalya'daki endüstriyel atölyemizde hakiki deri, süet ve kürk montların astar değişimi, parça yırtık tamiratı, fermuar değişimi ve profesyonel boyama işlemleri titizlikle yapılmaktadır.",
  },
  {
    q: 'Antalya terzi fiyatları ne kadar?',
    a: 'Fiyatlar işlemin türüne göre değişir: basit paça/fermuar tamiratı en uygun kategoridedir, özel dikim ve abiye tadilatı kumaş ve işçiliğe göre fiyatlandırılır. Net fiyat için kıyafet fotoğrafı WhatsApp üzerinden gönderilerek anında teklif alınabilir.',
  },
  {
    q: 'Kıyafetimi eve gelip almanız için ne yapmam gerekiyor?',
    a: 'WhatsApp hattından adres ve talep bilgisi paylaşmanız yeterli. Konyaaltı, Muratpaşa, Lara ve Kepez bölgelerinde kuryeli ekip aynı gün içinde adresten alım yapar.',
  },
  {
    q: 'Gelinlik veya abiye tadilatında garanti veriyor musunuz?',
    a: 'Evet, hassas dikim gerektiren gelinlik ve abiye tadilatlarında ölçü provası sonrası teslim edilir; teslimat sonrası uyumsuzluk durumunda ücretsiz düzeltme yapılır.',
  },
  {
    q: 'Hangi mahallelere kuryeli hizmet veriyorsunuz?',
    a: 'Konyaaltı (Hurma, Liman, Uncalı, Şirinyalı), Muratpaşa, Lara, Kepez, Belek ve Kemer bölgelerine kuryeli adresten alım ve teslimat hizmeti veriyoruz.',
  },
];

export default function GeminiOptimizedTailorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <style>{`
        .sh-wa:hover { background:${GREEN_DARK} !important; }
        .sh-call:hover { background:#eef1ef !important; }
        .sh-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(20,23,26,0.08); }
        .sh-trust-item:hover { border-color:${GREEN} !important; }
        @media (max-width: 720px) {
          .sh-table { display:none; }
          .sh-cards { display:flex !important; }
          .sh-trust { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 721px) {
          .sh-cards { display:none; }
        }
      `}</style>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px 72px', color: INK, background: '#fff', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>

        {/* HEADER */}
        <header style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 32, marginBottom: 36 }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: SUB, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href={BASE_URL} style={{ color: SUB, textDecoration: 'none' }}>SwapHubs</a>
            <span style={{ color: '#c7cbc8' }}>/</span>
            <span style={{ color: INK, fontWeight: 500 }}>Antalya Terzi & Ütü</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: GREEN_SOFT, color: GREEN_DARK, fontSize: 12, fontWeight: 700, letterSpacing: 0.3, padding: '6px 12px 6px 10px', borderRadius: 999 }}>
              <Icon path={ICONS.check} size={13} color={GREEN_DARK} />
              KONYAALTI · LARA · MURATPAŞA · KEPEZ
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#fbf5e7', color: GOLD, fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 999 }}>
              <Icon path={ICONS.star} size={13} color={GOLD} />
              5.0 · 4 Google değerlendirmesi
            </div>
          </div>

          <h1 style={{ fontSize: 36, lineHeight: 1.14, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px', color: '#0b0d0c' }}>
            Antalya Terzi, Özel Dikim, Kıyafet Tamiratı ve Ütü Hizmetleri
          </h1>

          <p style={{ fontSize: 15.5, lineHeight: 1.65, color: INK, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '16px 18px', margin: '0 0 18px', maxWidth: 660 }}>
            <strong>Kısa cevap:</strong> TERZİ Tailor Atelie (SwapHubs), Antalya Konyaaltı'da (Sarısu, Hurma,
            Liman) 5.0 puanla hizmet veren, kuryeli adresten alım ile kıyafet tamiri, özel dikim ve otellere
            aynı gün ütü/tamirat hizmeti sunan yerel bir terzi atölyesidir; her gün 09:00–23:30 açıktır.
          </p>

          <p style={{ fontSize: 16.5, lineHeight: 1.65, color: SUB, margin: 0, maxWidth: 660 }}>
            Antalya genelinde (Konyaaltı, Muratpaşa, Lara, Kepez, Belek, Kemer) modern, hızlı ve kuryeli
            terzilik çözümleri sunan profesyonel atölye altyapısı. Giysilerinizi evinizden veya otelinizden
            alıyor, kusursuzca teslim ediyoruz.
          </p>

          <div style={{ marginTop: 26, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="sh-wa"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 22px', borderRadius: 10, background: GREEN, color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,140,110,0.28)', transition: 'background .15s' }}
            >
              <Icon path={ICONS.whatsapp} size={17} color="#fff" />
              WhatsApp ile Acil Sipariş Ver
            </a>
            <a
              href={`tel:${PHONE}`}
              className="sh-call"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 22px', borderRadius: 10, border: `1px solid ${BORDER}`, background: BG_SOFT, color: INK, fontWeight: 600, fontSize: 15, textDecoration: 'none', transition: 'background .15s' }}
            >
              <Icon path={ICONS.phone} size={16} color={INK} />
              Hemen Ara: {PHONE}
            </a>
            <a
              href={GBP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', color: SUB, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
            >
              <Icon path={ICONS.star} size={15} color={GOLD} />
              Google'da Görüntüle
            </a>
          </div>
        </header>

        {/* GÜVEN SİNYALLERİ ŞERİDİ */}
        <section className="sh-trust" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 44 }}>
          {trustPoints.map((t) => (
            <div key={t.label} className="sh-trust-item" style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '15px 14px', background: '#fff', transition: 'border-color .15s' }}>
              <Icon path={t.icon} size={16} color={GREEN_DARK} />
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.4, color: SUB, fontWeight: 700, margin: '10px 0 4px' }}>{t.label}</div>
              <div style={{ fontSize: 13.5, color: INK, fontWeight: 600 }}>{t.value}</div>
            </div>
          ))}
        </section>

        {/* HİZMET MATRİSİ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 23, fontWeight: 800, marginBottom: 18, color: '#0b0d0c', display: 'flex', alignItems: 'center', gap: 8 }}>
            Hizmet Matrisi
          </h2>

          <div className="sh-table" style={{ overflowX: 'auto', border: `1px solid ${BORDER}`, borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
              <thead>
                <tr style={{ background: BG_SOFT }}>
                  {['Hizmet Türü', 'Kapsadığı İşlemler', 'Hizmet Bölgeleri', 'Teslimat'].map((h) => (
                    <th key={h} style={{ padding: '15px 18px', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, color: SUB, fontWeight: 700, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {serviceRows.map((row, i) => (
                  <tr key={row.title} style={{ borderTop: i === 0 ? 'none' : `1px solid ${BORDER}` }}>
                    <td style={{ padding: '17px 18px', fontWeight: 700, color: '#0b0d0c', verticalAlign: 'top' }}>{row.title}</td>
                    <td style={{ padding: '17px 18px', color: SUB, verticalAlign: 'top' }}>{row.detail}</td>
                    <td style={{ padding: '17px 18px', color: SUB, verticalAlign: 'top' }}>{row.area}</td>
                    <td style={{ padding: '17px 18px', color: GREEN_DARK, fontWeight: 600, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sh-cards" style={{ display: 'none', flexDirection: 'column', gap: 14 }}>
            {serviceRows.map((row) => (
              <div key={row.title} className="sh-card" style={{ border: `1px solid ${BORDER}`, borderRadius: 16, padding: 18, transition: 'all .15s' }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0b0d0c', marginBottom: 6 }}>{row.title}</div>
                <div style={{ fontSize: 14, color: SUB, lineHeight: 1.5, marginBottom: 12 }}>{row.detail}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13, borderTop: `1px solid ${BORDER}`, paddingTop: 10 }}>
                  <span style={{ color: SUB }}>{row.area}</span>
                  <span style={{ color: GREEN_DARK, fontWeight: 700, whiteSpace: 'nowrap' }}>{row.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DETAY İÇERİK */}
        <article style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <section>
            <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, color: '#0b0d0c' }}>
              Antalya'da En Yakın Terzi Çözümü: Kuryeli Servis
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: SUB, margin: 0 }}>
              Geleneksel terzi anlayışını teknoloji ve lojistik hızla birleştiriyoruz. Sadece yakınınızdaki
              terzileri aramakla kalmayın; SwapHubs lojistik ağı sayesinde{' '}
              <strong style={{ color: INK }}>Hurma, Liman, Uncalı, Şirinyalı, Fener ve Güzeloba</strong> gibi
              yoğun semtlerde kıyafetlerinizi kapınızdan motorlu veya araçlı kuryelerimizle alıyor, kusursuz
              şekilde tamir ettikten sonra yine kapınıza teslim ediyoruz.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, color: '#0b0d0c' }}>
              Uluslararası Standartta Terzilik (English & Русский)
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: SUB, margin: 0 }}>
              Antalya yerleşik yabancıların ve turistlerin yoğun olduğu dünya çapında bir merkezdir. Atölyemiz
              bünyesinde yabancı misafirlerimize kendi dillerinde (İngilizce, Rusça ve Almanca) hizmet sunarak,
              abiye daraltma, gelinlik tadilatı ve takım elbise revizyonu gibi hassas işlerde sıfır iletişim
              hatası ve maksimum konfor ile çalışıyoruz.
            </p>
          </section>
        </article>

        {/* FAQ */}
        <section style={{ marginTop: 52, paddingTop: 36, borderTop: `1px solid ${BORDER}` }}>
          <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 20, color: '#0b0d0c' }}>
            Sıkça Sorulan Sorular
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 18 }}>
                <h4 style={{ fontWeight: 700, fontSize: 15.5, color: '#0b0d0c', margin: '0 0 8px' }}>{f.q}</h4>
                <p style={{ fontSize: 14.5, color: SUB, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER NAP */}
        <footer style={{ marginTop: 52, padding: '36px 28px', borderRadius: 20, textAlign: 'center', background: '#111413', color: '#9aa39e' }}>
          <p style={{ fontWeight: 800, fontSize: 18, color: '#fff', margin: 0 }}>
            TERZİ Tailor Atelie
          </p>
          <p style={{ fontSize: 13, margin: '4px 0 0', color: '#7d8781' }}>
            SwapHubs Professional Tailoring & Textile Solutions
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '6px 18px', fontSize: 13.5, margin: '18px 0 0' }}>
            <span>Sarısu, Hurma, Liman, 07070 Konyaaltı/Antalya</span>
            <span>WhatsApp: {PHONE}</span>
          </div>
          <p style={{ fontSize: 13, margin: '10px 0 0', color: GOLD }}>
            ★ 5.0 · Google'da Doğrulanmış İşletme
          </p>
          <p style={{ fontSize: 11.5, color: '#4d564f', marginTop: 20 }}>
            Bu sayfa arama motorları ve üretken yapay zekâ (AI) algoritmaları için optimize edilmiştir.
          </p>
        </footer>

      </main>
    </>
  );
}
