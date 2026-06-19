import type { Metadata } from 'next';
import Link from 'next/link';

// ✅ DÜZELTİLDİ: "gekinlik" → "gelinlik"
const SITE_URL = 'https://swaphubs.com/terzi/gelinlik-tadilati';
const PARENT_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Merhaba, gelinlik tadilatı için randevu almak istiyorum.')}`;
const TODAY = new Date().toISOString().split('T')[0];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Gelinlik Tadilatı Antalya — Gelinlik Daraltma Kısaltma Onarım 2026',
      alternateName: [
        'Gelinlik Tadilatı Antalya',
        'Wedding Dress Alteration Antalya',
        'Gelinlik Daraltma Antalya',
        'Gelinlik Kısaltma Antalya',
        'Подгонка свадебного платья Анталья',
      ],
      description:
        "Antalya'da gelinlik tadilatı ve onarımı. Gelinlik daraltma, gelinlik paça kısaltma, askı tamiri, dantel onarımı, gelinlik temizleme. Ekspres 48 saat. Konyaaltı Terzi Can.",
      provider: {
        '@type': 'ClothingStore',
        '@id': `${PARENT_URL}#business`,
        name: 'Terzi Can',
        telephone: PHONE_E164,
      },
      areaServed: [
        'Antalya', 'Konyaaltı', 'Muratpaşa', 'Lara',
        'Belek', 'Kemer', 'Alanya', 'Manavgat', 'Side',
      ].map(name => ({ '@type': 'City', name })),
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '500',
        highPrice: '3000',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        offers: [
          {
            '@type': 'Offer',
            name: 'Gelinlik Daraltma',
            price: '800',
            priceCurrency: 'TRY',
            description: 'Gelinlik beden daraltma ve şekillendirme',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Gelinlik Paça / Boy Kısaltma',
            price: '500',
            priceCurrency: 'TRY',
            description: 'Gelinlik etek boyu ve paça kısaltma',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Gelinlik Askı ve Korse Tamiri',
            price: '300',
            priceCurrency: 'TRY',
            description: 'Askı değişimi, korse güçlendirme, bağcık tamiri',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Dantel ve Dantela Onarımı',
            price: '400',
            priceCurrency: 'TRY',
            description: 'Yırtık dantel onarımı, dantel ekleme, tül tamiri',
            availability: 'https://schema.org/InStock',
          },
        ],
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Gelinlik Tadilatı Antalya · Gelinlik Daraltma · Kısaltma · Onarım · Terzi Can',
      url: SITE_URL,
      description:
        "Antalya'da gelinlik tadilatı. Gelinlik daraltma ₺800, boy kısaltma ₺500, dantel onarımı ₺400. 48 saat ekspres teslim. Eve ve otele gelen terzi servisi. ☎ " + PHONE,
      inLanguage: ['tr', 'en', 'ru'],
      dateModified: TODAY,
      isPartOf: { '@id': `${HOME_URL}#website` },
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      mainEntity: { '@id': `${SITE_URL}#service` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME_URL },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi', item: PARENT_URL },
        { '@type': 'ListItem', position: 3, name: 'Gelinlik Tadilatı Antalya', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya gelinlik tadilatı fiyatı ne kadar? 2025-2026',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Gelinlik tadilatı fiyatımız işin kapsamına göre değişir. Gelinlik daraltma ₺800'den, boy kısaltma ₺500'den, askı tamiri ₺300'den, dantel onarımı ₺400'den başlar. Kesin fiyat için WhatsApp üzerinden fotoğraf gönderin: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Gelinlik tadilatı kaç günde teslim edilir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Basit tadilatlar (paça kısaltma, askı tamiri) aynı gün veya 24 saat içinde teslim edilir. Daraltma ve kapsamlı onarımlar 3–5 gün sürer. Düğün öncesi ekspres servis için erken randevu almanızı öneririz. WhatsApp: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Gelinlik tadilatı için eve veya otele geliyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Evet! Araçlı terzi servisimizle Konyaaltı, Belek, Lara, Kemer, Alanya dahil tüm Antalya ilçelerine gelinlik için de geliyoruz. Gelinliği getirmek zorunda değilsiniz, terzi adresinize gelir. WhatsApp: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Wedding dress alteration Antalya — how long does it take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Tailor Can offers express wedding dress alteration in Antalya. Simple alterations (hem, straps) in 24h, full alterations in 3–5 days. We come to your hotel. English speaking. WhatsApp: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Подгонка свадебного платья в Анталье — сколько стоит?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Портной Кан выполняет подгонку свадебных платьев в Анталье. Ушивание от ₺800, подшив от ₺500. Приедем в отель. Говорим по-русски. WhatsApp: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Gelinlik daraltma ve beden küçültme mümkün mü?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Evet! Gelinlik daraltma, beden küçültme, bel alma ve şekillendirme yapıyoruz. Dantel, tül ve organze kumaşlarda deneyimliyiz. Fotoğrafla WhatsApp üzerinden fiyat alabilirsiniz: ${PHONE}`,
          },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Gelinlik Tadilatı Antalya · Daraltma · Kısaltma · Onarım · Terzi Can',
  description:
    "Antalya'da gelinlik tadilatı ve onarımı. Gelinlik daraltma ₺800, boy kısaltma ₺500, dantel onarımı. 24–72 saat ekspres teslim. Eve ve otele gelen terzi. ☎ " + PHONE,
  keywords: [
    'gelinlik tadilatı Antalya',
    'gelinlik daraltma Antalya',
    'gelinlik kısaltma Antalya',
    'gelinlik onarımı Antalya',
    'gelinlik tadilat fiyatı 2026',
    'wedding dress alteration Antalya',
    'gelinlik tamiri Antalya',
    'dantel onarımı Antalya',
    'gelinlik askı tamiri',
    'gelin kıyafeti tadilatı',
    'Belek gelinlik tadilatı',
    'Lara gelinlik tadilat',
    'подгонка свадебного платья Анталья',
    'Konyaaltı terzi gelinlik',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { 'x-default': SITE_URL },
  },
  openGraph: {
    title: 'Gelinlik Tadilatı Antalya · Daraltma · Kısaltma · Onarım',
    description:
      "Antalya'da gelinlik tadilatı. Daraltma ₺800, kısaltma ₺500, dantel onarımı. 48 saat ekspres. Eve/otele gelen terzi. ☎ " + PHONE,
    url: SITE_URL,
    type: 'website',
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

const FIYATLAR = [
  { hizmet: 'Gelinlik Daraltma (Tam Beden)', fiyat: '₺800+', sure: '3–5 gün' },
  { hizmet: 'Gelinlik Boy / Paça Kısaltma', fiyat: '₺500+', sure: '24–48 saat' },
  { hizmet: 'Askı ve Korse Tamiri', fiyat: '₺300+', sure: '24 saat' },
  { hizmet: 'Dantel ve Tül Onarımı', fiyat: '₺400+', sure: '48 saat' },
  { hizmet: 'Bel Alma / Şekillendirme', fiyat: '₺600+', sure: '3–5 gün' },
  { hizmet: 'Fermuar Değişimi (Gelinlik)', fiyat: '₺400+', sure: '24 saat' },
  { hizmet: 'Tüm Kapsamlı Tadilat', fiyat: '₺1.500+', sure: '5–7 gün' },
];

export default function GelinlikTadilatiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ fontFamily: 'system-ui,sans-serif', background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        {/* BREADCRUMB */}
        <nav style={{ padding: '1rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.1)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}
          <span>Gelinlik Tadilatı Antalya</span>
        </nav>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg,#1C1814 0%,#2E2820 100%)', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: `url('https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=800&q=80&auto=format&fit=crop') center/cover`, opacity: .15 }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              💍 Gelinlik Tadilatı · Antalya Konyaaltı
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: '1.2rem' }}>
              Gelinlik Tadilatı Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Daraltma · Kısaltma · Onarım</span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#fff' }}>Terzi Can</strong> ile gelinliğiniz düğününüze mükemmel uyar.
              Beden daraltma, paça kısaltma, dantel onarımı, askı tamiri.
              <strong style={{ color: '#D4B07A' }}> 48 saat ekspres teslim.</strong> Eve ve otele gelen terzi servisi.
            </p>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[
                ['🇹🇷', 'Gelinlik tadilatı ekspres'],
                ['🇬🇧', 'Wedding dress alteration'],
                ['🇷🇺', 'Подгонка свадебного платья'],
                ['🇩🇪', 'Hochzeitskleid Änderung'],
              ].map(([flag, text]) => (
                <span key={flag as string} style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', padding: '.3rem .8rem', borderRadius: '2px' }}>
                  {flag} {text}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '1rem 2.2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.88rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                💬 Fotoğraf Gönderin → Fiyat Alın
              </a>
              <a href={`tel:${PHONE_E164}`}
                style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '1rem 1.8rem', textDecoration: 'none', fontSize: '.88rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* FİYAT TABLOSU */}
        <section id="gelinlik-tadilat-fiyatlari" style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Gelinlik Tadilatı Fiyatları 2025–2026
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>
              Fiyatlar işin kapsamına ve gelinlik kumaşına göre değişir. WhatsApp'tan fotoğraf gönderin, kesin fiyat verelim.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Hizmet', 'Başlangıç Fiyatı', 'Süre'].map(h => (
                    <th key={h} style={{ textAlign: h === 'Hizmet' ? 'left' : 'right', padding: '.8rem 1rem', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIYATLAR.map(({ hizmet, fiyat, sure }, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i % 2 ? 'rgba(184,151,90,.02)' : '#fff' }}>
                    <td style={{ padding: '.9rem 1rem', fontSize: '.9rem', fontWeight: 500 }}>{hizmet}</td>
                    <td style={{ padding: '.9rem 1rem', fontSize: '.9rem', color: '#8A6E3E', fontWeight: 700, textAlign: 'right' }}>{fiyat}</td>
                    <td style={{ padding: '.9rem 1rem', fontSize: '.78rem', color: '#7A6E62', textAlign: 'right' }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: '1rem', fontSize: '.8rem', color: '#7A6E62', fontStyle: 'italic' }}>
              * Kesin fiyat için gelinliğin fotoğrafını WhatsApp'a gönderin. Ücretsiz keşif.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ marginTop: '1.5rem', display: 'inline-block', background: '#25d366', color: '#fff', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', borderRadius: '4px' }}>
              💬 Fotoğraf Gönderin → Ücretsiz Fiyat Alın
            </a>
          </div>
        </section>

        {/* HİZMET DETAYLARI */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '2rem' }}>
              Gelinlik Tadilat Hizmetlerimiz
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
              {[
                {
                  icon: '📐',
                  baslik: 'Beden Daraltma ve Şekillendirme',
                  aciklama: 'Gelinliği vücudunuza mükemmel uydurun. Bel, göğüs, kalça bölgesini daraltıyoruz. Dantel ve tül kumaşlarda deneyimliyiz.',
                  fiyat: '₺800\'den başlar',
                },
                {
                  icon: '✂️',
                  baslik: 'Boy ve Paça Kısaltma',
                  aciklama: 'Gelinlik etek boyu kısaltma, tren kısaltma, diz altı ve topuk boyu ayarı. Dantele zarar vermeden hassas kesim.',
                  fiyat: '₺500\'den başlar',
                },
                {
                  icon: '🧵',
                  baslik: 'Dantel ve Tül Onarımı',
                  aciklama: 'Yırtık dantel, kopan tül, sökük dikiş ve boncuk tamiri. Yıpranmış dantel bölgeleri yenileme.',
                  fiyat: '₺400\'den başlar',
                },
                {
                  icon: '🔗',
                  baslik: 'Askı ve Korse Tamiri',
                  aciklama: 'Kıkırdayan askı değişimi, korse kancası onarımı, iç gömlek güçlendirme, bağcık yenileme.',
                  fiyat: '₺300\'den başlar',
                },
                {
                  icon: '🪡',
                  baslik: 'Fermuar Değişimi',
                  aciklama: 'Kırılan veya sıkışan fermuar değişimi. Gizli fermuar montajı. Sırt açılımı düzenlemesi.',
                  fiyat: '₺400\'den başlar',
                },
                {
                  icon: '💎',
                  baslik: 'Aksesuar ve Süs Ekleme',
                  aciklama: 'Boncuk, inci, kristal ekleme. Kuşak ve fiyonk montajı. Tül katı ekleme veya çıkarma.',
                  fiyat: 'Fiyat teklifi',
                },
              ].map(({ icon, baslik, aciklama, fiyat }) => (
                <div key={baslik} style={{ background: '#fff', border: '1px solid rgba(184,151,90,.15)', borderRadius: '2px', padding: '1.6rem', borderTop: '3px solid #B8975A' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '.7rem' }}>{icon}</div>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#1C1814', marginBottom: '.5rem' }}>{baslik}</h3>
                  <p style={{ fontSize: '.82rem', color: '#7A6E62', lineHeight: 1.7, marginBottom: '.8rem' }}>{aciklama}</p>
                  <span style={{ fontSize: '.78rem', color: '#B8975A', fontWeight: 600 }}>{fiyat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SÜREÇ */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Gelinlik Tadilatı Nasıl Çalışır?
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2.5rem' }}>Düğününüze özel 4 adım</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {[
                ['📸', 'Fotoğraf Gönderin', `Gelinliğin fotoğrafını WhatsApp ${PHONE}'a gönderin`],
                ['💬', 'Ücretsiz Fiyat Alın', '1 saat içinde detaylı fiyat ve randevu önerisi'],
                ['📍', 'Ölçü Alımı', 'Terzi adresinize gelir veya atölyemize gelin'],
                ['💍', 'Hazır Teslim', '24 saat–7 gün içinde mükemmel uyum'],
              ].map(([ic, t, d], i) => (
                <div key={i} style={{ background: '#FAF7F2', padding: '2rem 1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '.7rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#B8975A', marginBottom: '.4rem' }}>{t}</div>
                  <div style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* İNGİLİZCE / RUSÇA BÖLÜMÜ */}
        <section style={{ background: '#1C1814', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#D4B07A', marginBottom: '1rem' }}>
              Wedding Dress Alteration Antalya
            </h2>
            <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '.9rem', lineHeight: 1.85, marginBottom: '2rem' }}>
              Getting married in Antalya? Tailor Can specialises in <strong style={{ color: '#fff' }}>express wedding dress alterations</strong> including
              taking in the bodice, hemming, strap adjustments and lace repairs.
              We speak <strong style={{ color: '#D4B07A' }}>English, Russian, German and Turkish</strong> and
              can collect your dress directly from your hotel.
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '2rem', marginTop: '1rem' }}>
              <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.4rem', color: '#D4B07A', marginBottom: '.7rem' }}>
                Подгонка свадебного платья в Анталье
              </h3>
              <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '.85rem', lineHeight: 1.85 }}>
                Портной Кан выполняет срочную подгонку свадебных платьев в Анталье.
                Ушивание, подшив, ремонт кружева — с доставкой в отель. Говорим по-русски.
              </p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ marginTop: '2rem', display: 'inline-block', background: '#B8975A', color: '#fff', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem' }}>
              💬 WhatsApp — EN / RU / DE / TR
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#FAF7F2', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '2rem' }}>
              Gelinlik Tadilatı — Sık Sorulan Sorular
            </h2>
            {[
              ['Antalya gelinlik tadilatı fiyatı ne kadar?', `Gelinlik daraltma ₺800'den, boy kısaltma ₺500'den, dantel onarımı ₺400'den başlar. WhatsApp'tan fotoğraf gönderin, kesin fiyat verelim: ${PHONE}`],
              ['Gelinlik tadilatı için ne kadar önceden randevu almalıyım?', 'Basit onarımlar için 3–5 gün, kapsamlı tadilat için 1–2 hafta önceden randevu almanızı öneririz. Düğün öncesi ekspres servis mevcuttur.'],
              ['Gelinliği getirmem mi gerekiyor?', `Hayır! Araçlı terzi servisimizle adresinize veya otelinize geliyoruz. Konyaaltı, Belek, Lara, Kemer, Alanya dahil tüm Antalya ilçelerine. WhatsApp: ${PHONE}`],
              ['Do you offer wedding dress alterations in English?', `Yes! Tailor Can is an English-speaking tailor in Antalya. We offer wedding dress alteration, hemming, taking in and lace repair. Mobile service available. WhatsApp: ${PHONE}`],
              ['Dantel gelinlikte tadilat yapabiliyor musunuz?', 'Evet! Dantel, tül, organze ve saten kumaşlarda deneyimliyiz. Dantel bozulmadan hassas kesim ve onarım yapıyoruz.'],
            ].map(([q, a], i) => (
              <details key={i} style={{ borderBottom: '1px solid rgba(184,151,90,.1)', padding: '1rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.93rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q} <span style={{ color: '#B8975A', fontSize: '1.2rem', fontWeight: 300 }}>+</span>
                </summary>
                <p style={{ marginTop: '.8rem', fontSize: '.84rem', color: '#7A6E62', lineHeight: 1.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#B8975A', padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.8rem' }}>
            Gelinliğinizi Mükemmelleştirin
          </h2>
          <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: '2rem', fontSize: '.92rem' }}>
            Fotoğraf gönderin → Ücretsiz fiyat alın → Randevu alın
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Fotoğraf Gönder
            </a>
            <a href={`tel:${PHONE_E164}`}
              style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
          <p style={{ marginTop: '1.2rem', fontSize: '.78rem', color: 'rgba(255,255,255,.7)' }}>
            ⭐ 4.9 / 5 · 94 Google Değerlendirmesi · 09:00–19:00 Pzt–Cmt
          </p>
        </section>

        {/* İLGİLİ SAYFALAR */}
        <section style={{ padding: '2.5rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>İlgili Sayfalar</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[
                ['Bayan Terzi Antalya', '/terzi/bayan-terzi-antalya'],
                ['Elbise Dikimi Antalya', '/terzi/bayan-terzi-antalya'],
                ['Paça Kısaltma Antalya', '/terzi/paca-kisaltma-antalya'],
                ['Fermuar Değişimi Antalya', '/terzi/fermuar-degisimi-antalya'],
                ['Eve Gelen Terzi', '/terzi/eve-gelen-terzi-antalya'],
                ['← Tüm Hizmetler', '/terzi'],
              ].map(([label, href]) => (
                <Link key={label} href={href}
                  style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
