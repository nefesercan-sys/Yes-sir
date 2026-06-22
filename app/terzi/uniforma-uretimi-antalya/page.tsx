import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/uniforma-uretimi-antalya';
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
      '@type': ['LocalBusiness', 'ClothingStore'],
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
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Üniforma Üretimi Antalya — Otel Restoran Sağlık Okul Güvenlik 2026',
      description: "Antalya üniforma üretimi. Otel, resepsiyon, aşçı, garson, güvenlik, spa, okul, sağlık sektörü üniformaları. Tasarım + kalıp + seri imalat + nakış tek elden. Min 10 adet.",
      provider: { '@type': 'LocalBusiness', '@id': `${PARENT}#business` },
      areaServed: ['Antalya','Konyaaltı','Belek','Kemer','Alanya','Manavgat','Side'].map(name => ({ '@type': 'City', name })),
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        offers: [
          { '@type': 'Offer', name: 'Otel Personel Üniforması', description: 'Resepsiyon, kat görevlisi, kapıcı, havuzbaşı personel üniformaları', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Aşçı & Mutfak Üniforması', description: 'Aşçı, şef, garson, barista üniformaları', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Okul Üniforması', description: 'Öğrenci, öğretmen, güvenlik personeli okul üniformaları', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Sağlık Sektörü Üniforması', description: 'Doktor önlüğü, hemşire, eczacı üniformaları', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Güvenlik & Hizmet Üniforması', description: 'Güvenlik görevlisi, AVM personeli, lojistik, fabrika iş elbisesi', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Spa & Wellness Üniforması', description: 'Masaj terapisti, spa resepsiyon, hamam personeli üniformaları', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Nakış & Logo Baskı', price: '100', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
        ],
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: 'Üniforma Üretimi Antalya · Otel Aşçı Garson Okul Sağlık · 2026 | Terzi Can',
      description: "Antalya üniforma üretimi. Otel, resepsiyon, aşçı, garson, spa, güvenlik, okul, sağlık. Tasarım + seri imalat + nakış tek elden. Min 10 adet. ☎ " + PHONE,
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
        { '@type': 'ListItem', position: 3, name: 'Üniforma Üretimi Antalya', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Otel üniforması üretimi Antalya fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Otel üniforma üretimi adet, model ve kumaşa göre fiyatlandırılır. Tasarım danışmanlığı ücretsiz. Teklif için WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Üniforma üretiminde minimum kaç adet sipariş verilebilir?', acceptedAnswer: { '@type': 'Answer', text: 'Minimum sipariş 10 adet olup daha az için görüşme yapılabilir. Numune dikimi tek adet kabul edilir.' } },
        { '@type': 'Question', name: 'Aşçı ve garson üniforması dikimi Antalya?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Aşçı, şef, garson, barista, catering personeli üniforması üretiyoruz. Nakış dahil. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Okul üniforması seri üretimi yapılıyor mu?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Öğrenci, öğretmen ve okul personeli üniforması seri üretimi yapılmaktadır. Nakış ve baskı dahil. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Üniformaya logo nakışı veya baskı yapılıyor mu?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Bilgisayarlı nakış, dijital baskı ve DTF baskı yapılmaktadır. Nakış ₺100'den başlar. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Hotel uniform production Antalya — do you speak English?', acceptedAnswer: { '@type': 'Answer', text: `Yes! Tailor Can produces hotel staff uniforms in Antalya with English service. We work with Belek and Kemer hotels. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Производство форменной одежды в Анталье?', acceptedAnswer: { '@type': 'Answer', text: `Да! Портной Кан производит форму для отелей, ресторанов и медицины в Анталье. Говорим по-русски. WhatsApp: ${PHONE}` } },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME),
  title: 'Üniforma Üretimi Antalya · Otel Aşçı Garson Okul Sağlık · Seri İmalat 2026 | Terzi Can',
  description: "Antalya üniforma üretimi: otel, resepsiyon, aşçı, garson, güvenlik, spa, okul, sağlık. Tasarım + seri imalat + nakış tek elden. Min 10 adet. ☎ " + PHONE,
  keywords: [
    'üniforma üretimi Antalya', 'otel üniforması Antalya', 'aşçı üniforması Antalya',
    'garson üniforması Antalya', 'okul üniforması Antalya', 'sağlık üniforması Antalya',
    'güvenlik üniforması Antalya', 'iş üniforması Antalya', 'toplu üniforma dikimi Antalya',
    'restoran üniforması Antalya', 'nakış Antalya', 'seri imalat üniforma 2026',
    'spa üniforması Antalya', 'hemşire üniforması Antalya', 'Belek otel üniforması',
    'Kemer otel üniforma', 'hotel uniform Antalya', 'форма для персонала Анталья',
    'uniform production Antalya', 'toplu kıyafet sipariş Antalya',
  ],
  alternates: { canonical: SITE_URL, languages: { 'x-default': SITE_URL } },
  openGraph: {
    title: 'Üniforma Üretimi Antalya · Otel Aşçı Garson Okul · Seri İmalat | Terzi Can',
    description: "Otel, resepsiyon, aşçı, garson, güvenlik, okul, sağlık. Tasarım + seri imalat + nakış. Min 10 adet. ☎ " + PHONE,
    url: SITE_URL, type: 'website',
    images: [{ url: '/og/terzi-can.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  other: { 'geo.region': 'TR-07', 'geo.placename': 'Konyaaltı, Antalya', 'geo.position': '36.8841;30.7056', ICBM: '36.8841, 30.7056' },
};

const SEKTORLER = [
  { ic: '🏨', baslik: 'Otel & Konaklama', list: ['Resepsiyon üniforma', 'Kat görevlisi', 'Kapıcı / Valet', 'Havuzbaşı personel', 'Animatör üniforma', 'Meydancı personel'] },
  { ic: '🍽️', baslik: 'Restoran & Mutfak', list: ['Aşçı / Şef üniforma', 'Garson üniforma', 'Barista üniforma', 'Bulaşıkçı / Kiler', 'Pasta şefi', 'Catering personeli'] },
  { ic: '🏥', baslik: 'Sağlık Sektörü', list: ['Doktor önlüğü', 'Hemşire üniforma', 'Eczacı önlüğü', 'Fizyoterapist', 'Diş hekimi üniforma', 'Veteriner önlüğü'] },
  { ic: '🏫', baslik: 'Okul & Eğitim', list: ['Öğrenci üniforması', 'Öğretmen üniforma', 'Güvenlik görevlisi', 'Temizlik personeli', 'Kreş & anaokulu', 'Üniversite takımı'] },
  { ic: '🔒', baslik: 'Güvenlik & Hizmet', list: ['Güvenlik üniforma', 'AVM personeli', 'Havalimanı personeli', 'Temizlik şirketi', 'Lojistik & kargo', 'Fabrika iş elbisesi'] },
  { ic: '💆', baslik: 'Spa & Wellness', list: ['Masaj terapisti', 'Spa resepsiyon', 'Kuaför önlüğü', 'Güzellik uzmanı', 'Hamam görevlisi', 'Fitness eğitmeni'] },
];

const AVANTAJLAR = [
  ['🎨', 'Ücretsiz Tasarım Danışmanlığı', 'Renk, model ve kumaş seçiminde ücretsiz danışmanlık hizmeti.'],
  ['📐', 'Özel Kalıp Çıkarma', 'Markanıza özel kalıp çıkarılır, gradaj yapılır. Beden tutarlılığı garanti.'],
  ['🪡', 'Nakış & Logo Baskı', 'Bilgisayarlı nakış, dijital & DTF baskı. ₺100\'den başlar.'],
  ['📦', 'Etiketli & Paketli Teslim', 'Her üniformaya etiket, ambalaj ve teslimat. Kurumsal görünüm.'],
  ['🚐', 'Tüm Antalya Teslimat', 'Belek, Kemer, Alanya, Lara dahil tüm Antalya\'ya teslimat.'],
  ['🌍', 'Çok Dilli Hizmet', 'TR · EN · RU · DE dört dilde iletişim. Uluslararası oteller için ideal.'],
];

export default function UniformaUretimiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: "'Jost',system-ui,sans-serif", background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}<Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}<span>Üniforma Üretimi Antalya</span>
        </nav>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4.5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=1200&q=70') center/cover", opacity: .1 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🏭 Terzi Can · Antalya · Üniforma Üretimi
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Üniforma Üretimi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Otel · Restoran · Sağlık · Okul · Güvenlik</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.85, maxWidth: '640px', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#fff' }}>Tasarım + Kalıp + Seri İmalat + Nakış</strong> tek elden.
              Antalya'nın otel, restoran, okul ve sağlık kuruluşlarına hizmet eden deneyimli üniforma üreticisi.
              <strong style={{ color: '#D4B07A' }}> Min 10 adet. Numune tek adet.</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', maxWidth: '750px', marginBottom: '2rem' }}>
              {[['Tasarım','Ücretsiz danışmanlık'],['Kalıp','Özel çıkarma'],['Seri','Min 10 adet'],['Nakış','Logo & isim'],['Teslimat','Tüm Antalya']].map(([t, d]) => (
                <div key={t} style={{ background: 'rgba(255,255,255,.04)', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#D4B07A', marginBottom: '.3rem' }}>{t}</div>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)' }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, üniforma üretimi için teklif almak istiyorum. Sektör ve adet: ')} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                📋 Üniforma Teklifi Al
              </a>
              <a href={`tel:${PHONE_E}`} style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '.9rem 1.6rem', textDecoration: 'none', fontSize: '.85rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* SEKTÖRLER */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Hangi Sektörlere Üretim Yapıyoruz?</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>Otel, restoran, sağlık, okul, güvenlik, spa ve daha fazlası</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1rem' }}>
              {SEKTORLER.map(({ ic, baslik, list }) => (
                <div key={baslik} style={{ background: '#F2EDE4', border: '1px solid rgba(184,151,90,.15)', borderLeft: '3px solid #B8975A', padding: '1.6rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '.6rem' }}>{ic}</div>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.05rem', color: '#1C1814', marginBottom: '.8rem', fontWeight: 600 }}>{baslik}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {list.map(item => (
                      <li key={item} style={{ fontSize: '.78rem', color: '#7A6E62', padding: '.2rem 0', borderBottom: '1px solid rgba(184,151,90,.08)', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                        <span style={{ color: '#B8975A', fontSize: '.6rem' }}>◆</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AVANTAJLAR */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Neden Terzi Can?</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>Antalya'nın üniforma üreticisi tercih nedenleri</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1rem' }}>
              {AVANTAJLAR.map(([ic, t, d]) => (
                <div key={t} style={{ background: '#fff', padding: '1.5rem', borderTop: '2px solid rgba(184,151,90,.3)' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '.6rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#1C1814', marginBottom: '.4rem', fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.65 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AÇIKLAYICI İÇERİK */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1.2rem' }}>
              Antalya'da Üniforma Üretimi Hakkında
            </h2>
            <div style={{ fontSize: '.9rem', color: '#5A4E42', lineHeight: 1.95 }}>
              <p style={{ marginBottom: '1rem' }}>
                Antalya Türkiye'nin en yoğun turizm merkezi olup <strong>Belek, Kemer, Lara ve Side</strong> gibi
                tatil bölgelerinde binlerce otel ve restoran bulunmaktadır. Bu işletmelerin personel
                üniforması ihtiyacı sürekli yenilenmekte; Terzi Can bu ihtiyacı karşılayan
                <strong> Antalya'nın deneyimli üniforma üreticisidir.</strong>
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Otel personel üniforması üretiminde</strong> resepsiyon, kat hizmetleri, havuzbaşı,
                kapıcı ve animatör gibi farklı departmanlar için tutarlı bir kurumsal görünüm sağlanmaktadır.
                Her departman için farklı renk ve model tasarlanabilmekte, üzerine logo nakışı uygulanmaktadır.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Aşçı ve mutfak personeli üniformalarında</strong> hijyen standartlarına uygun,
                nefes alabilen ve kolay yıkanabilen kumaşlar kullanılmaktadır. Garson üniformaları
                restoran atmosferine göre klasik veya modern tasarımda üretilebilmektedir.
              </p>
              <p>
                <strong>Okul ve sağlık sektörü üniformaları</strong> özel kumaş gereksinimleriyle
                üretilmektedir. Tüm üniformalar istenilen renk, model ve kumaşta; isim, logo ve
                kurumsal kimlik unsurlarıyla kişiselleştirilebilmektedir.
              </p>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Üniforma Üretimi — Sık Sorulan Sorular</h2>
            {[
              ['Otel üniforması üretimi Antalya fiyatı 2026?', `Adet, model ve kumaşa göre fiyatlandırılır. Tasarım danışmanlığı ücretsiz. Teklif için WhatsApp: ${PHONE}`],
              ['Minimum kaç adet üniforma siparişi verilebilir?', 'Minimum 10 adet sipariş kabul edilmektedir. Daha az için görüşme yapılabilir.'],
              ['Üniformaya logo nakışı yapılıyor mu?', `Evet! Bilgisayarlı nakış ₺100'den başlar. DTF ve dijital baskı da mevcuttur. WhatsApp: ${PHONE}`],
              ['Belek otellerine teslimat yapılıyor mu?', `Evet! Belek, Kemer, Lara, Alanya dahil tüm Antalya ilçelerine teslim yapılmaktadır. WhatsApp: ${PHONE}`],
              ['Hotel uniform Antalya — English service available?', `Yes! Tailor Can provides hotel uniform production in Antalya with English service. Min 10 pcs. WhatsApp: ${PHONE}`],
              ['Teslimat süresi ne kadar?', 'Numune onayından sonra 10 adetlik sipariş 7–10 iş günü, büyük siparişler 15–30 iş günü sürer.'],
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
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.7rem' }}>Üniforma Teklifi Alın</h2>
          <p style={{ color: 'rgba(255,255,255,.9)', marginBottom: '2rem', fontSize: '.92rem' }}>
            Sektör ve adet bilgisini gönderin — 24 saat içinde tasarım + fiyat teklifi
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, üniforma üretimi için teklif almak istiyorum. Sektör: , Adet: ')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Teklif İste
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
              {[['Dikiş Atölyesi', '/terzi/dikis-atolyesi-antalya'], ['Bay Terzi', '/terzi/bay-terzi-antalya'], ['Nakış Antalya', '/terzi'], ['← Tüm Hizmetler', '/terzi']].map(([l, h]) => (
                <Link key={l} href={h} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>{l}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
