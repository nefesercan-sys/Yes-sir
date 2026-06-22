import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/kuru-temizleme-antalya';
const PARENT   = 'https://swaphubs.com/terzi';
const HOME     = 'https://swaphubs.com';
const PHONE    = '+90 531 898 64 18';
const PHONE_E  = '+905318986418';
const WA = (t: string) => `https://wa.me/${PHONE_E}?text=${encodeURIComponent(t)}`;
const TODAY    = new Date().toISOString().split('T')[0];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore', 'DryCleaningService'],
      '@id': `${PARENT}#business`,
      name: 'Terzi Can',
      telephone: PHONE_E,
      url: PARENT,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '19:00' }],
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Kuru Temizleme Antalya — Otel Alım Teslimat 24 Saat Ekspres 2026',
      description: "Antalya'da kuru temizleme, çamaşır yıkama ve ütü hizmeti. Otel ve adresten alım + teslimat. 24 saat ekspres. Elbise ₺300, mont ₺500, çamaşır ₺80/kg.",
      provider: { '@type': 'LocalBusiness', '@id': `${PARENT}#business` },
      areaServed: ['Antalya','Konyaaltı','Belek','Lara','Kemer','Alanya','Manavgat','Side'].map(name => ({ '@type': 'City', name })),
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '80',
        highPrice: '500',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        offers: [
          { '@type': 'Offer', name: 'Çamaşır Yıkama', price: '80', priceCurrency: 'TRY', description: 'Kg başına çamaşır yıkama + kurutma', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Elbise Kuru Temizleme', price: '300', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Takım Elbise Kuru Temizleme', price: '450', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Mont Kuru Temizleme', price: '500', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Abiye / Gelinlik Kuru Temizleme', price: '600', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Ütü Hizmeti', price: '50', priceCurrency: 'TRY', description: 'Adet başına ütü hizmeti', availability: 'https://schema.org/InStock' },
        ],
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: 'Kuru Temizleme Antalya · Otele Alım Teslimat · 24 Saat Ekspres · 2026 | Terzi Can',
      description: "Antalya kuru temizleme ve çamaşır hizmeti. Elbise ₺300, mont ₺500, çamaşır ₺80/kg. Otele alım + teslimat. 24 saat ekspres. ☎ " + PHONE,
      inLanguage: ['tr', 'en', 'ru'],
      dateModified: TODAY,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      mainEntity: { '@id': `${SITE_URL}#service` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi', item: PARENT },
        { '@type': 'ListItem', position: 3, name: 'Kuru Temizleme Antalya', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Antalya kuru temizleme fiyatı 2026 ne kadar?', acceptedAnswer: { '@type': 'Answer', text: `Elbise ₺300, takım elbise ₺450, mont ₺500, abiye ₺600, çamaşır ₺80/kg'den başlar. Otel alım + teslimat ücretsiz. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Antalya otele gelen kuru temizleme var mı?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Belek, Lara, Kemer, Alanya dahil tüm Antalya otellerinden kuru temizleme alım ve teslimat yapıyoruz. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Kuru temizleme 24 saatte hazır mı?', acceptedAnswer: { '@type': 'Answer', text: 'Evet! Turistler ve acil durumlar için 24 saat ekspres kuru temizleme mevcuttur. Normal süre 48 saattir.' } },
        { '@type': 'Question', name: 'Mont ve palto kuru temizleme Antalya fiyatı?', acceptedAnswer: { '@type': 'Answer', text: `Mont kuru temizleme ₺500, palto ₺550'den başlar. 48 saat teslim. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Dry cleaning Antalya hotel pickup — how does it work?', acceptedAnswer: { '@type': 'Answer', text: `WhatsApp us on ${PHONE}, we pick up from your hotel, clean, and deliver back within 24–48 hours. English speaking service.` } },
        { '@type': 'Question', name: 'Химчистка в Анталье с доставкой в отель?', acceptedAnswer: { '@type': 'Answer', text: `Да! Портной Кан предоставляет услуги химчистки с забором и доставкой в отель по всей Анталье. Говорим по-русски. WhatsApp: ${PHONE}` } },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME),
  title: 'Kuru Temizleme Antalya · Otel Alım Teslimat · 24 Saat Ekspres · 2026 | Terzi Can',
  description: "Antalya kuru temizleme. Elbise ₺300, mont ₺500, takım elbise ₺450, çamaşır ₺80/kg. Otel ve adresten alım + teslimat. 24 saat ekspres. ☎ " + PHONE,
  keywords: [
    'kuru temizleme Antalya', 'kuru temizleme Antalya fiyat 2026', 'otele kuru temizleme Antalya',
    'ekspres kuru temizleme Antalya', 'çamaşır yıkama Antalya', 'ütü hizmeti Antalya',
    'mont kuru temizleme Antalya', 'takım elbise kuru temizleme Antalya',
    'abiye kuru temizleme Antalya', 'Belek kuru temizleme', 'Kemer kuru temizleme',
    'dry cleaning Antalya', 'laundry service Antalya', 'hotel laundry Antalya',
    'химчистка Анталья', 'прачечная Анталья', 'Alanya kuru temizleme',
    'kıyafet temizleme Antalya', '24 saat kuru temizleme Antalya',
  ],
  alternates: { canonical: SITE_URL, languages: { 'x-default': SITE_URL } },
  openGraph: {
    title: 'Kuru Temizleme Antalya · Otele Alım Teslimat · 24 Saat Ekspres | Terzi Can',
    description: "Elbise ₺300, mont ₺500, çamaşır ₺80/kg. Otel alım + teslimat. 24 saat ekspres. ☎ " + PHONE,
    url: SITE_URL, type: 'website',
    images: [{ url: '/og/terzi-can.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  other: { 'geo.region': 'TR-07', 'geo.placename': 'Konyaaltı, Antalya', 'geo.position': '36.8841;30.7056', ICBM: '36.8841, 30.7056' },
};

const FIYATLAR = [
  ['Çamaşır Yıkama + Kurutma', '₺80 / kg', '24 saat'],
  ['Ütü (adet başına)', '₺50', '12 saat'],
  ['Gömlek / Bluz', '₺150', '24 saat'],
  ['Elbise / Etek', '₺300', '24–48 saat'],
  ['Takım Elbise (ceket+pantolon)', '₺450', '48 saat'],
  ['Mont / Kaban', '₺500', '48 saat'],
  ['Palto', '₺550', '48 saat'],
  ['Abiye / Gece Elbisesi', '₺600', '48–72 saat'],
  ['Gelinlik Kuru Temizleme', '₺800+', '72 saat'],
  ['Deri Mont / Ceket', '₺700', '72 saat'],
  ['Çocuk Kıyafeti', '₺100', '24 saat'],
  ['Otel Alım + Teslimat', 'ÜCRETSİZ', '—'],
];

export default function KuruTemizlemePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: "'Jost',system-ui,sans-serif", background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}<Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}<span>Kuru Temizleme Antalya</span>
        </nav>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4.5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=70') center/cover", opacity: .1 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              👔 Terzi Can · Antalya · Kuru Temizleme & Çamaşır Hizmeti
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Kuru Temizleme Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Otele Alım · Teslimat · 24 Saat Ekspres</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.85, maxWidth: '640px', marginBottom: '1.5rem' }}>
              Antalya'da kuru temizleme, çamaşır yıkama ve ütü hizmeti.
              <strong style={{ color: '#fff' }}> Belek, Lara, Kemer, Alanya</strong> dahil tüm
              Antalya otellerinden <strong style={{ color: '#D4B07A' }}>ücretsiz alım ve teslimat.</strong> 24 saat ekspres.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', maxWidth: '700px', marginBottom: '2rem' }}>
              {[['Çamaşır','₺80/kg'],['Elbise','₺300'],['Takım Elbise','₺450'],['Mont','₺500'],['Abiye','₺600']].map(([t, d]) => (
                <div key={t} style={{ background: 'rgba(255,255,255,.04)', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)', marginBottom: '.2rem' }}>{t}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#D4B07A', fontWeight: 700 }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, kuru temizleme için alım servisi istiyorum. Otel/adres: ')} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                🚐 Alım Servisi İste
              </a>
              <a href={`tel:${PHONE_E}`} style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '.9rem 1.6rem', textDecoration: 'none', fontSize: '.85rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* FİYAT TABLOSU */}
        <section id="kuru-temizleme-fiyatlari" style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Kuru Temizleme Fiyatları 2025–2026</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>Tüm fiyatlar başlangıç fiyatıdır. Otel alım + teslimat ücretsiz.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Hizmet', 'Fiyat', 'Süre'].map(h => (
                    <th key={h} style={{ padding: '.8rem 1rem', textAlign: h === 'Hizmet' ? 'left' : 'right', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIYATLAR.map(([tip, fiyat, sure], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i % 2 ? 'rgba(184,151,90,.02)' : '#fff' }}>
                    <td style={{ padding: '.9rem 1rem', fontSize: '.88rem' }}>{tip}</td>
                    <td style={{ padding: '.9rem 1rem', textAlign: 'right', color: fiyat === 'ÜCRETSİZ' ? '#22c55e' : '#8A6E3E', fontWeight: 700 }}>{fiyat}</td>
                    <td style={{ padding: '.9rem 1rem', textAlign: 'right', color: '#7A6E62', fontSize: '.8rem' }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* NASIL ÇALIŞIR */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Nasıl Çalışır?</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2.5rem' }}>4 adımda kuru temizleme</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {[
                ['📞', 'Arayın / Yazın', `WhatsApp ${PHONE} veya telefon ile otel adresinizi bildirin.`],
                ['🚐', 'Alım Servisi', 'Belirlenen saatte otelinize veya adresinize geliyoruz.'],
                ['👔', 'Temizleme', '24–48 saat içinde profesyonel kuru temizleme tamamlanır.'],
                ['🏨', 'Teslimat', 'Ütülenmiş ve paketlenmiş halde otelinize teslim edilir.'],
              ].map(([ic, t, d], i) => (
                <div key={i} style={{ background: '#FAF7F2', padding: '2rem 1.2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '.7rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#B8975A', marginBottom: '.4rem', fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: '.72rem', color: '#7A6E62', lineHeight: 1.65 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BÖLGELER */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>Hizmet Verdiğimiz Bölgeler</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '.8rem', marginBottom: '1.5rem' }}>
              {['Konyaaltı', 'Muratpaşa', 'Belek', 'Lara', 'Kemer', 'Alanya', 'Manavgat', 'Side', 'Serik', 'Kepez'].map(b => (
                <div key={b} style={{ background: '#F2EDE4', padding: '.8rem 1rem', textAlign: 'center', borderLeft: '2px solid #B8975A', fontSize: '.85rem', fontWeight: 500 }}>
                  📍 {b}
                </div>
              ))}
            </div>
            <div style={{ fontSize: '.9rem', color: '#5A4E42', lineHeight: 1.9, background: '#F2EDE4', padding: '1.5rem', borderRadius: '2px' }}>
              <strong>Antalya'da kuru temizleme hizmetimiz</strong> tüm ilçe ve tatil bölgelerini kapsamaktadır.
              Belek, Kemer ve Lara'daki 5 yıldızlı otellere, Side ve Alanya'ya araçlı alım + teslimat yapıyoruz.
              Turist ve otel misafirleri için <strong>24 saat ekspres kuru temizleme</strong> mevcuttur.
            </div>
          </div>
        </section>

        {/* SSS */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Kuru Temizleme — Sık Sorulan Sorular</h2>
            {[
              ['Antalya kuru temizleme fiyatı 2026?', `Çamaşır ₺80/kg, elbise ₺300, takım elbise ₺450, mont ₺500, abiye ₺600'den başlar. WhatsApp: ${PHONE}`],
              ['Otele gelen kuru temizleme var mı?', `Evet! Belek, Lara, Kemer dahil tüm Antalya otellerine alım + teslimat yapıyoruz. WhatsApp: ${PHONE}`],
              ['24 saatte kuru temizleme mümkün mü?', 'Evet! Ekspres servis mevcuttur. Sabah alınan kıyafetler ertesi gün teslim edilir.'],
              ['Dry cleaning Antalya — how to order?', `WhatsApp ${PHONE}, we pick up from your hotel and deliver back within 24 hours. English service.`],
              ['Химчистка Анталья — как заказать?', `Напишите нам в WhatsApp ${PHONE}. Заберем из отеля и вернем в течение 24–48 часов. Говорим по-русски.`],
              ['Gelinlik kuru temizleme Antalya?', `Evet! Gelinlik kuru temizleme ₺800'den başlar. 72 saat teslim. WhatsApp: ${PHONE}`],
            ].map(([q, a], i) => (
              <details key={i} style={{ borderBottom: '1px solid rgba(184,151,90,.1)', padding: '.9rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.92rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q} <span style={{ color: '#B8975A', fontSize: '1.2rem', fontWeight: 300 }}>+</span>
                </summary>
                <p style={{ marginTop: '.7rem', fontSize: '.84rem', color: '#7A6E62', lineHeight: 1.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#B8975A', padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.7rem' }}>Kuru Temizleme Servisi İsteyin</h2>
          <p style={{ color: 'rgba(255,255,255,.9)', marginBottom: '2rem', fontSize: '.92rem' }}>
            Otel veya adres bildirin — alım servisi gelsin
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, kuru temizleme alım servisi istiyorum. Adres/Otel: ')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Alım Servisi
            </a>
            <a href={`tel:${PHONE_E}`} style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '.78rem', color: 'rgba(255,255,255,.7)' }}>⭐ 4.9 / 5 · 94 Google Değerlendirmesi · Pzt–Cmt 09:00–19:00</p>
        </section>

        <section style={{ padding: '2rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>İlgili Hizmetler</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[['Eve Gelen Terzi', '/terzi/eve-gelen-terzi-antalya'], ['Elbise Tadilatı', '/terzi/bayan-terzi-antalya'], ['Üniforma', '/terzi/uniforma-uretimi-antalya'], ['← Tüm Hizmetler', '/terzi']].map(([l, h]) => (
                <Link key={l} href={h} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>{l}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
