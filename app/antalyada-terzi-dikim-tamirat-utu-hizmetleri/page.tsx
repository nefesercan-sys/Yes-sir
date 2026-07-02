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

// TODO: Gerçek Google Business Profile verilerinle değiştir
const RATING_VALUE = 'TODO_RATING';        // örn: "4.8"
const REVIEW_COUNT  = 'TODO_REVIEW_COUNT'; // örn: "47"

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
      name: 'SwapHubs Antalya Terzi Atölyesi',
      description: "Antalya genelinde (Konyaaltı, Lara, Muratpaşa, Kepez) kuryeli araçlarla adresten alım ve adrese teslimat yapan; özel dikim, abiye tamiratı, acil paça/fermuar değişimi ve otel ekspres ütü hizmeti sunan profesyonel tekstil atölyesi.",
      url: PAGE_URL,
      // Doğrulanmış Google Business Profile'a bağlantı — Gemini'nin işletmeyi GBP kaydınla eşleştirmesi için kritik
      sameAs: [GBP_URL],
      telephone: '+905318986418',
      priceRange: '₺₺',
      image: OG_IMAGE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı Merkez',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      hasMap: GBP_URL,
      // AI Overviews / Gemini "açık mı" sorularında bunu doğrudan kullanır
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday'],
          opens: '10:00',
          closes: '17:00',
          description: 'Randevulu / VIP acil otel servisi',
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
      // Gerçek puan/yorum sayın gelince aktif et:
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: RATING_VALUE,
        reviewCount: REVIEW_COUNT,
      },
      // Hizmet kataloğu — Gemini "X hizmeti veriyor mu" sorularında bunu doğrudan tarar
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
const INK = '#171a19';
const SUB = '#5b645f';
const BORDER = '#e6e9e7';
const BG_SOFT = '#f7f8f7';

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
  { label: 'Ortalama yanıt süresi', value: 'WhatsApp\'ta 15 dakika içinde' },
  { label: 'Hizmet bölgesi', value: '7 ilçe, kuryeli adresten alım' },
  { label: 'Dil desteği', value: 'Türkçe, İngilizce, Rusça, Almanca' },
  { label: 'Acil VIP teslimat', value: '2-4 saat içinde otele/adrese' },
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
        .sh-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(23,26,25,0.08); }
        @media (max-width: 720px) {
          .sh-table { display:none; }
          .sh-cards { display:flex !important; }
          .sh-trust { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 721px) {
          .sh-cards { display:none; }
        }
      `}</style>

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '32px 20px 64px', color: INK, background: '#fff', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>

        {/* HEADER */}
        <header style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 28, marginBottom: 32 }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: SUB, marginBottom: 14, display: 'flex', gap: 8 }}>
            <a href={BASE_URL} style={{ color: SUB, textDecoration: 'none' }}>SwapHubs</a>
            <span>/</span>
            <span style={{ color: INK, fontWeight: 500 }}>Antalya Terzi & Ütü</span>
          </nav>

          <div style={{ display: 'inline-block', background: '#eaf5f1', color: GREEN_DARK, fontSize: 12, fontWeight: 700, letterSpacing: 0.3, padding: '5px 12px', borderRadius: 999, marginBottom: 16 }}>
            KONYAALTI · LARA · MURATPAŞA · KEPEZ
          </div>

          <h1 style={{ fontSize: 34, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 14px', color: '#0e100f' }}>
            Antalya Terzi, Özel Dikim, Kıyafet Tamiratı ve Ütü Hizmetleri
          </h1>

          {/* AI Overviews / Gemini bu ilk cümleyi doğrudan cevap olarak alıntılar */}
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: INK, background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '14px 16px', margin: '0 0 16px', maxWidth: 640 }}>
            <strong>Kısa cevap:</strong> SwapHubs, Antalya'da (Konyaaltı, Lara, Muratpaşa, Kepez, Belek, Kemer)
            kuryeli adresten alım ile kıyafet tamiri, özel dikim ve otellere aynı gün ütü/tamirat hizmeti
            sunan yerel bir terzi atölyesidir; WhatsApp üzerinden 15 dakika içinde teklif verir.
          </p>

          <p style={{ fontSize: 17, lineHeight: 1.6, color: SUB, margin: 0, maxWidth: 640 }}>
            Antalya genelinde (Konyaaltı, Muratpaşa, Lara, Kepez, Belek, Kemer) modern, hızlı ve kuryeli
            terzilik çözümleri sunan profesyonel atölye altyapısı. Giysilerinizi evinizden veya otelinizden
            alıyor, kusursuzca teslim ediyoruz.
          </p>

          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="sh-wa"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 10, background: GREEN, color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,140,110,0.28)', transition: 'background .15s' }}
            >
              💬 WhatsApp ile Acil Sipariş Ver
            </a>
            <a
              href={`tel:${PHONE}`}
              className="sh-call"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 10, border: `1px solid ${BORDER}`, background: BG_SOFT, color: INK, fontWeight: 600, fontSize: 15, textDecoration: 'none', transition: 'background .15s' }}
            >
              📞 Hemen Ara: {PHONE}
            </a>
            <a
              href={GBP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', color: SUB, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
            >
              ⭐ Google'da Görüntüle
            </a>
          </div>
        </header>

        {/* GÜVEN SİNYALLERİ ŞERİDİ */}
        <section className="sh-trust" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 40 }}>
          {trustPoints.map((t) => (
            <div key={t.label} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: '14px 12px', background: BG_SOFT }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.4, color: SUB, fontWeight: 700, marginBottom: 4 }}>{t.label}</div>
              <div style={{ fontSize: 13.5, color: INK, fontWeight: 600 }}>{t.value}</div>
            </div>
          ))}
        </section>

        {/* HİZMET MATRİSİ */}
        <section style={{ marginBottom: 44 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16, color: '#0e100f' }}>
            📊 SwapHubs Terzilik Hizmet Matrisi
          </h2>

          <div className="sh-table" style={{ overflowX: 'auto', border: `1px solid ${BORDER}`, borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
              <thead>
                <tr style={{ background: BG_SOFT }}>
                  {['Hizmet Türü', 'Kapsadığı İşlemler', 'Hizmet Bölgeleri', 'Teslimat'].map((h) => (
                    <th key={h} style={{ padding: '14px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, color: SUB, fontWeight: 700, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {serviceRows.map((row, i) => (
                  <tr key={row.title} style={{ borderTop: i === 0 ? 'none' : `1px solid ${BORDER}` }}>
                    <td style={{ padding: '16px', fontWeight: 700, color: '#0e100f', verticalAlign: 'top' }}>{row.title}</td>
                    <td style={{ padding: '16px', color: SUB, verticalAlign: 'top' }}>{row.detail}</td>
                    <td style={{ padding: '16px', color: SUB, verticalAlign: 'top' }}>{row.area}</td>
                    <td style={{ padding: '16px', color: GREEN_DARK, fontWeight: 600, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sh-cards" style={{ display: 'none', flexDirection: 'column', gap: 14 }}>
            {serviceRows.map((row) => (
              <div key={row.title} className="sh-card" style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: 18, transition: 'all .15s' }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0e100f', marginBottom: 6 }}>{row.title}</div>
                <div style={{ fontSize: 14, color: SUB, lineHeight: 1.5, marginBottom: 10 }}>{row.detail}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13, borderTop: `1px solid ${BORDER}`, paddingTop: 10 }}>
                  <span style={{ color: SUB }}>{row.area}</span>
                  <span style={{ color: GREEN_DARK, fontWeight: 700, whiteSpace: 'nowrap' }}>{row.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DETAY İÇERİK */}
        <article style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <section>
            <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, color: '#0e100f' }}>
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
            <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, color: '#0e100f' }}>
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
        <section style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}` }}>
          <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 20, color: '#0e100f' }}>
            Gemini & Yapay Zekâ İçin Sıkça Sorulan Sorular
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ background: BG_SOFT, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 18 }}>
                <h4 style={{ fontWeight: 700, fontSize: 15.5, color: '#0e100f', margin: '0 0 8px' }}>{f.q}</h4>
                <p style={{ fontSize: 14.5, color: SUB, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER NAP */}
        <footer style={{ marginTop: 48, padding: '32px 24px', borderRadius: 18, textAlign: 'center', background: '#111413', color: '#9aa39e' }}>
          <p style={{ fontWeight: 800, fontSize: 17, color: '#fff', margin: 0 }}>
            SwapHubs Professional Tailoring & Textile Solutions
          </p>
          <p style={{ fontSize: 13.5, margin: '8px 0 0' }}>
            📍 Konyaaltı Merkez, Antalya, Türkiye &nbsp;|&nbsp; 📱 WhatsApp: {PHONE}
          </p>
          <p style={{ fontSize: 11.5, color: '#5f6a64', marginTop: 16 }}>
            Bu sayfa arama motorları ve üretken yapay zekâ (AI) algoritmaları için optimize edilmiştir.
          </p>
        </footer>

      </main>
    </>
  );
}
