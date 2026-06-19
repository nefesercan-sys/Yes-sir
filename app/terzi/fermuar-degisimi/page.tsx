import type { Metadata } from 'next';
import Link from 'next/link';

// ✅ DÜZELTİLDİ: İçerik tamamen "eve-gelen-terzi" kopyasıydı. Doğru fermuar içeriği yazıldı.
const SITE_URL = 'https://swaphubs.com/terzi/fermuar-degisimi';
const PARENT_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Merhaba, fermuar değişimi için randevu almak istiyorum.')}`;
const TODAY = new Date().toISOString().split('T')[0];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Fermuar Değişimi ve Tamiri — Antalya & Online 2026',
      alternateName: [
        'Fermuar Değişimi Antalya',
        'Fermuar Tamiri Antalya',
        'Zipper Repair Antalya',
        'Zamена молнии Анталья',
        'Reißverschluss Reparatur Antalya',
      ],
      description:
        "Pantolon, kot, mont, ceket, sweatshirt, çanta fermuarı değişimi ve tamiri. Antalya geneli. Pantolon ₺120, mont ₺300. Aynı gün teslim mümkün.",
      provider: {
        '@type': 'ClothingStore',
        '@id': `${PARENT_URL}#business`,
        name: 'Terzi Can',
        telephone: PHONE_E164,
      },
      areaServed: [
        'Antalya', 'Konyaaltı', 'Muratpaşa', 'Lara',
        'Belek', 'Kemer', 'Alanya', 'Manavgat',
      ].map(name => ({ '@type': 'City', name })),
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '120',
        highPrice: '500',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        offers: [
          { '@type': 'Offer', name: 'Pantolon / Kot Fermuarı', price: '120', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Ceket Fermuarı', price: '200', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Mont Fermuarı', price: '300', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Sweatshirt / Hırka Fermuarı', price: '150', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Çanta Fermuarı', price: '120', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Gizli Fermuar (Elbise)', price: '180', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
        ],
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Fermuar Değişimi Antalya · Pantolon Kot Mont Ceket Fermuarı · Terzi Can',
      url: SITE_URL,
      description:
        "Antalya'da fermuar değişimi ve tamiri. Pantolon ₺120, mont ₺300, ceket ₺200, sweatshirt ₺150. Aynı gün teslim. Eve ve otele gelen terzi servisi. ☎ " + PHONE,
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
        { '@type': 'ListItem', position: 3, name: 'Fermuar Değişimi Antalya', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya fermuar değişimi fiyatı ne kadar? 2025-2026',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Pantolon ve kot fermuarı ₺120, ceket fermuarı ₺200, mont fermuarı ₺300, sweatshirt fermuarı ₺150, çanta fermuarı ₺120'den başlar. Kesin fiyat için WhatsApp: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Fermuar değişimi aynı gün yapılıyor mu?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Evet! Pantolon, kot, sweatshirt ve ceket fermuarı aynı gün teslim yapılabilir. Mont fermuarı genellikle 24 saat içinde teslim edilir. WhatsApp'tan randevu alın: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Mont fermuarı değişimi fiyatı ne kadar Antalya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Mont fermuarı değişimi ₺300'den başlar. Mont cinsine ve fermuar boyuna göre değişir. Fotoğraf gönderin, kesin fiyat verelim. WhatsApp: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Zipper repair Antalya — same day service?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes! Tailor Can offers same-day zipper repair and replacement in Antalya for trousers, jackets, coats, bags and dresses. English speaking. WhatsApp: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Замена молнии Анталья — сколько стоит?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Замена молнии на брюках от ₺120, куртке от ₺300. Срочный ремонт в день обращения. Говорим по-русски. WhatsApp: ${PHONE}`,
          },
        },
        {
          '@type': 'Question',
          name: 'Elbise gizli fermuarı değişimi yapıyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Evet! Elbise, abiye ve gelinlik için gizli fermuar değişimi ₺180'den başlar. Hassas dikiş gerektiren fermuarlarda deneyimliyiz. WhatsApp: ${PHONE}`,
          },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Fermuar Değişimi Antalya · Pantolon Kot Mont Ceket · Aynı Gün · Terzi Can',
  description:
    "Antalya'da fermuar değişimi ve tamiri. Pantolon ₺120, mont ₺300, ceket ₺200. Aynı gün teslim. Eve ve otele gelen terzi servisi. ☎ " + PHONE,
  keywords: [
    'fermuar değişimi Antalya',
    'fermuar tamiri Antalya',
    'pantolon fermuarı değişimi Antalya',
    'kot fermuarı değişimi Antalya',
    'mont fermuarı değişimi Antalya',
    'ceket fermuarı Antalya',
    'fermuar değişimi fiyatı 2026',
    'sweatshirt fermuarı Antalya',
    'çanta fermuarı tamiri',
    'gizli fermuar elbise',
    'zipper repair Antalya',
    'zipper replacement Antalya',
    'замена молнии Анталья',
    'Reißverschluss Reparatur Antalya',
    'aynı gün fermuar Antalya',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { 'x-default': SITE_URL },
  },
  openGraph: {
    title: 'Fermuar Değişimi Antalya · Pantolon Kot Mont · Aynı Gün Teslim',
    description:
      "Antalya'da fermuar değişimi. Pantolon ₺120, mont ₺300, ceket ₺200. Aynı gün teslim. ☎ " + PHONE,
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
  { urun: 'Pantolon / Kot Fermuarı', fiyat: '₺120+', sure: 'Aynı gün' },
  { urun: 'Sweatshirt / Hırka Fermuarı', fiyat: '₺150+', sure: 'Aynı gün' },
  { urun: 'Gizli Fermuar (Elbise/Abiye)', fiyat: '₺180+', sure: 'Aynı gün' },
  { urun: 'Ceket Fermuarı', fiyat: '₺200+', sure: '24 saat' },
  { urun: 'Çanta Fermuarı', fiyat: '₺120+', sure: 'Aynı gün' },
  { urun: 'Mont Fermuarı', fiyat: '₺300+', sure: '24 saat' },
  { urun: 'Deri Ceket / Mont Fermuarı', fiyat: '₺400+', sure: '24–48 saat' },
  { urun: 'Kayak Mont / Trekking Fermuarı', fiyat: '₺350+', sure: '24 saat' },
];

export default function FermuarDegisimiPage() {
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
          <span>Fermuar Değişimi Antalya</span>
        </nav>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg,#1C1814 0%,#2E2820 100%)', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop') center/cover`, opacity: .12 }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🔗 Fermuar Değişimi ve Tamiri · Antalya
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: '1.2rem' }}>
              Fermuar Değişimi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Pantolon · Mont · Ceket · Çanta</span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.8, maxWidth: '620px', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#fff' }}>Terzi Can</strong> ile fermuar sorunlarınızı aynı gün çözün.
              Pantolon, kot, mont, ceket, sweatshirt, çanta — tüm türlerde fermuar değişimi ve tamiri.
              <strong style={{ color: '#D4B07A' }}> Pantolon fermuarı ₺120'den başlar.</strong>
            </p>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[
                ['🇹🇷', 'Aynı gün teslim'],
                ['🇬🇧', 'Zipper repair — same day'],
                ['🇷🇺', 'Замена молнии сегодня'],
                ['🇩🇪', 'Reißverschluss Reparatur'],
              ].map(([flag, text]) => (
                <span key={flag as string} style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', padding: '.3rem .8rem', borderRadius: '2px' }}>
                  {flag} {text}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '1rem 2.2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.88rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                💬 Fotoğraf Gönder → Fiyat Al
              </a>
              <a href={`tel:${PHONE_E164}`}
                style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '1rem 1.8rem', textDecoration: 'none', fontSize: '.88rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* FİYAT TABLOSU */}
        <section id="fermuar-degisimi-fiyatlari" style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Fermuar Değişimi Fiyatları 2025–2026
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>
              Tüm fiyatlar standar fermuar için geçerlidir. YKK marka veya özel fermuar isteyenler için ek ücret uygulanabilir.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Ürün', 'Başlangıç Fiyatı', 'Teslim Süresi'].map(h => (
                    <th key={h} style={{ textAlign: h === 'Ürün' ? 'left' : 'right', padding: '.8rem 1rem', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIYATLAR.map(({ urun, fiyat, sure }, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i % 2 ? 'rgba(184,151,90,.02)' : '#fff' }}>
                    <td style={{ padding: '.9rem 1rem', fontSize: '.9rem', fontWeight: 500 }}>{urun}</td>
                    <td style={{ padding: '.9rem 1rem', fontSize: '.9rem', color: '#8A6E3E', fontWeight: 700, textAlign: 'right' }}>{fiyat}</td>
                    <td style={{ padding: '.9rem 1rem', fontSize: '.78rem', color: sure === 'Aynı gün' ? '#22c55e' : '#7A6E62', fontWeight: sure === 'Aynı gün' ? 600 : 400, textAlign: 'right' }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: '1rem', fontSize: '.8rem', color: '#7A6E62', fontStyle: 'italic' }}>
              * YKK, Riri veya marka fermuar için fiyat değişebilir. Fotoğraf gönderin, kesin fiyat alın.
            </p>
          </div>
        </section>

        {/* ÜRÜN BAZLI AÇIKLAMALAR */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '2rem' }}>
              Hangi Fermuarları Değiştiriyoruz?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1rem' }}>
              {[
                { icon: '👖', baslik: 'Pantolon ve Kot Fermuarı', aciklama: 'Erkek pantolon, kot pantolon, bayan pantolon ve skinny kot fermuarı değişimi. Metal ve plastik fermuar seçenekleri. Aynı gün teslim.', fiyat: '₺120\'den' },
                { icon: '🧥', baslik: 'Mont ve Parka Fermuarı', aciklama: 'Kışlık mont, şişme mont, yağmurluk, outdoor parka fermuarı değişimi. Uzun ve kısa fermuar tüm boylar. 24 saat teslim.', fiyat: '₺300\'den' },
                { icon: '🥼', baslik: 'Ceket ve Blazer Fermuarı', aciklama: 'Kumaş ceket, deri ceket, bomber ceket, takım ceket fermuarı. Gizli ve görünür fermuar seçeneği.', fiyat: '₺200\'den' },
                { icon: '👕', baslik: 'Sweatshirt ve Hırka Fermuarı', aciklama: 'Kapüşonlu sweatshirt, eşofman üstü, hırka, polar fermuarı değişimi. Renge uygun fermuar seçimi.', fiyat: '₺150\'den' },
                { icon: '👜', baslik: 'Çanta ve Deri Aksesuar', aciklama: 'El çantası, sırt çantası, bel çantası, portföy fermuarı. Deri ve kumaş çantalarda hassas uygulama.', fiyat: '₺120\'den' },
                { icon: '👗', baslik: 'Elbise ve Abiye Fermuarı', aciklama: 'Gizli fermuar, görünmez fermuar, etek fermuarı, abiye sırt fermuarı değişimi. Gelinlik fermuarı da yapıyoruz.', fiyat: '₺180\'den' },
              ].map(({ icon, baslik, aciklama, fiyat }) => (
                <div key={baslik} style={{ background: '#fff', border: '1px solid rgba(184,151,90,.15)', borderRadius: '2px', padding: '1.5rem', borderLeft: '3px solid #B8975A' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '.7rem' }}>{icon}</div>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.05rem', color: '#1C1814', marginBottom: '.4rem' }}>{baslik}</h3>
                  <p style={{ fontSize: '.8rem', color: '#7A6E62', lineHeight: 1.7, marginBottom: '.7rem' }}>{aciklama}</p>
                  <span style={{ fontSize: '.78rem', color: '#B8975A', fontWeight: 600 }}>{fiyat} başlar</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SÜREÇ */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Fermuar Değişimi Nasıl Çalışır?
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2.5rem' }}>3 kolay adımda fermuar sorununuzu çözün</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {[
                ['📸', 'Fotoğraf Gönderin', `Kırılan fermuarın fotoğrafını WhatsApp ${PHONE}'a gönderin`],
                ['💬', 'Fiyat ve Randevu', '30 dakika içinde fiyat ve uygun randevu bildirimi'],
                ['✂️', 'Getirin veya Gelelim', 'Atölyemize getirin ya da araçlı terzi adresinize gelsin'],
                ['✅', 'Aynı Gün Teslim', 'Çoğu fermuar aynı gün teslim edilir'],
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

        {/* FAQ */}
        <section style={{ background: '#FAF7F2', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '2rem' }}>
              Fermuar Değişimi — Sık Sorulan Sorular
            </h2>
            {[
              ['Antalya fermuar değişimi fiyatı ne kadar?', `Pantolon ve kot fermuarı ₺120, sweatshirt ₺150, ceket ₺200, mont ₺300, çanta ₺120'den başlar. WhatsApp'tan fotoğraf gönderin, kesin fiyat verelim: ${PHONE}`],
              ['Fermuar değişimi aynı gün yapılıyor mu?', 'Evet! Pantolon, kot, sweatshirt ve çanta fermuarı genellikle aynı gün teslim edilir. Mont ve deri ceket için 24 saat gerekebilir.'],
              ['YKK marka fermuar kullanıyor musunuz?', 'Evet, talep üzerine YKK veya diğer kaliteli marka fermuarlar kullanıyoruz. Bu durumda fiyat biraz artabilir.'],
              ['Zipper repair Antalya — where are you located?', `We are in Konyaaltı, Antalya. We also offer mobile service across all Antalya districts. WhatsApp: ${PHONE}`],
              ['Mont fermuarı değişimi kaç günde teslim?', 'Mont fermuarı değişimi genellikle 24 saat içinde teslim edilir. Uzun fermuarlı montlarda 48 saat gerekebilir.'],
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
            Fermuar Sorununuzu Bugün Çözün
          </h2>
          <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: '2rem', fontSize: '.92rem' }}>
            Fotoğraf gönderin → Aynı gün teslim
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
                ['Paça Kısaltma Antalya', '/terzi/paca-kisaltma-antalya'],
                ['Fermuar Değişimi Antalya', '/terzi/fermuar-degisimi-antalya'],
                ['Bay Terzi Antalya', '/terzi/bay-terzi-antalya'],
                ['Bayan Terzi Antalya', '/terzi/bayan-terzi-antalya'],
                ['Gelinlik Tadilatı', '/terzi/gelinlik-tadilati'],
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
