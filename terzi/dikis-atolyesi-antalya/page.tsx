import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/dikis-atolyesi-antalya';
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
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00', closes: '19:00',
      }],
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Dikiş Atölyesi Antalya — Fason Üretim Kalıp Çıkarma Seri İmalat 2026',
      description: "Antalya dikiş atölyesi. Kalıp çıkarma, numune dikimi, fason üretim min. 50 adet, seri imalat, nakış & baskı. Markalar, butikler, e-ticaret, spor kulüpleri için.",
      provider: { '@type': 'LocalBusiness', '@id': `${PARENT}#business` },
      areaServed: ['Antalya','Konyaaltı','Muratpaşa','Kepez','Alanya','Manavgat'].map(name => ({ '@type': 'City', name })),
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        offers: [
          { '@type': 'Offer', name: 'Kalıp Çıkarma', description: 'Tasarım veya referans üründen teknik kalıp çıkarma + gradaj', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Numune Dikimi (1 adet)', description: 'Prototip ve onay numunesi, tek adet', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Fason Üretim (min 50 adet)', description: 'Kesim, dikim, overlok, ütü, paket dahil seri üretim', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Nakış & Logo Baskı', price: '100', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
        ],
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Dikiş Atölyesi Antalya · Fason Üretim · Kalıp Çıkarma · Seri İmalat 2026 | Terzi Can',
      url: SITE_URL,
      description: "Antalya'da dikiş atölyesi: kalıp çıkarma, numune dikimi, fason üretim, seri imalat. Markalar, butikler, e-ticaret için tam üretim paketi. ☎ " + PHONE,
      inLanguage: ['tr', 'en'],
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
        { '@type': 'ListItem', position: 3, name: 'Dikiş Atölyesi Antalya', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Dikiş atölyesi Antalya fiyatı ne kadar 2026?', acceptedAnswer: { '@type': 'Answer', text: `Kalıp çıkarma, numune ve fason üretim fiyatları proje bazlıdır. Adet, model ve kumaşa göre teklif verilir. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Fason üretim Antalya minimum kaç adet?', acceptedAnswer: { '@type': 'Answer', text: 'Fason seri üretim için minimum 50 adet gereklidir. Numune ve prototip tek adet kabul edilir.' } },
        { '@type': 'Question', name: 'Marka için kıyafet üretimi Antalya yapılıyor mu?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Markalar, butikler ve e-ticaret firmaları için kalıp + numune + seri üretim paketi. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Sweatshirt ve eşofman üretimi Antalya?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Sweatshirt, eşofman, hırka, polo yaka üretimi + nakış/baskı. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'E-ticaret için kıyafet üretimi yapılıyor mu?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Trendyol, Amazon, Hepsiburada satıcıları için etiketli + paketlenmiş üretim yapıyoruz. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Sewing workshop Antalya — minimum order?', acceptedAnswer: { '@type': 'Answer', text: `Tailor Can sewing workshop in Antalya accepts minimum 50 units for production. Samples accepted as 1 unit. WhatsApp: ${PHONE}` } },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME),
  title: 'Dikiş Atölyesi Antalya · Fason Üretim · Kalıp Çıkarma · Seri İmalat 2026 | Terzi Can',
  description: "Antalya dikiş atölyesi: kalıp çıkarma, numune dikimi, fason üretim min. 50 adet, seri imalat, nakış, baskı. Markalar, butikler, e-ticaret, spor kulüpleri için. ☎ " + PHONE,
  keywords: [
    'dikiş atölyesi Antalya', 'fason üretim Antalya', 'kalıp çıkarma Antalya',
    'seri imalat kıyafet Antalya', 'numune dikimi Antalya', 'butik üretim Antalya',
    'marka kıyafet üretimi Antalya', 'tekstil atölyesi Antalya', 'konfeksiyon Antalya',
    'sweatshirt üretimi Antalya', 'nakış atölyesi Antalya', 'eşofman üretimi Antalya',
    'e-ticaret kıyafet üretimi Antalya', 'sewing workshop Antalya', 'fason imalat Antalya',
    'polo yaka dikimi Antalya', 'prototip kıyafet Antalya', 'tekstil üretimi Antalya 2026',
  ],
  alternates: { canonical: SITE_URL, languages: { 'x-default': SITE_URL } },
  openGraph: {
    title: 'Dikiş Atölyesi Antalya · Fason Üretim · Kalıp · Seri İmalat | Terzi Can',
    description: "Kalıp çıkarma, numune, fason üretim min. 50 adet. Markalar için tam paket. ☎ " + PHONE,
    url: SITE_URL, type: 'website',
    images: [{ url: '/og/terzi-can.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  other: { 'geo.region': 'TR-07', 'geo.placename': 'Konyaaltı, Antalya', 'geo.position': '36.8841;30.7056', ICBM: '36.8841, 30.7056' },
};

const HIZMETLER = [
  { ic: '📐', baslik: 'Kalıp Çıkarma & Gradaj', aciklama: 'Tasarım dosyasından veya referans üründen teknik kalıp çıkarma. XS–3XL beden gradajı. CAD destekli kalıp.' },
  { ic: '🧵', baslik: 'Numune & Prototip Dikimi', aciklama: 'Prototip ve onay numunesi dikimi. Tek adet sipariş kabul edilir. 5–7 iş günü teslim.' },
  { ic: '✂️', baslik: 'Fason Üretim (min. 50 adet)', aciklama: 'Kesim + dikim + overlok + ütü + paket dahil tam seri üretim. Hız ve kalite garantisi.' },
  { ic: '🏭', baslik: 'Büyük Seri İmalat', aciklama: '500+ adet büyük sipariş kapasitesi. İş planı, süreç takibi ve kalite kontrolü dahil.' },
  { ic: '🪡', baslik: 'Nakış & Dijital Baskı', aciklama: 'Logo nakışı, isim baskısı, serigrafi, DTF & dijital baskı. Sweatshirt, polo, t-shirt ve tüm kıyafetler.' },
  { ic: '📦', baslik: 'Etiket & Paketleme', aciklama: 'Ütülü, etiketli (barkod dahil) ve ambalajlı teslim. E-ticaret depolarına hazır sevkiyat.' },
];

const HEDEF_KITLELER = [
  ['🏪', 'Butik & Tasarımcılar', 'Kendi koleksiyonunu ürettirmek isteyen tasarımcı ve butikler için kalıp + numune + seri üretim.'],
  ['🛍️', 'E-Ticaret Satıcıları', 'Trendyol, Amazon, Hepsiburada ve Etsy satıcıları için etiketli ve paketlenmiş üretim.'],
  ['🏋️', 'Spor Kulüpleri', 'Forma, antrenman kıyafeti, takım sweatshirt ve polo üretimi + nakış.'],
  ['🏨', 'Kurumsal Firmalar', 'Otel, restoran, AVM, fabrika ve güvenlik şirketleri için iş elbisesi üretimi.'],
];

const SUREC = [
  ['💬', 'Bize Yazın', 'Ürün konseptinizi, modelinizi ve tahmini adedi WhatsApp\'tan gönderin.'],
  ['📋', 'Teklif', '24 saat içinde detaylı fiyat teklifi ve üretim takvimi göndeririz.'],
  ['🧵', 'Numune Onayı', 'Numune dikilir, onaylanır. Değişiklik talepleri uygulanır.'],
  ['🏭', 'Seri Üretim', 'Onaylanan numune üzerinden seri üretim başlar. Kalite kontrol dahil.'],
  ['📦', 'Teslim', 'Etiketli, ütülü ve paketlenmiş ürünler teslim edilir veya kargoya verilir.'],
];

export default function DikisAtölyesiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: "'Jost',system-ui,sans-serif", background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        {/* BREADCRUMB */}
        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}<Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}<span>Dikiş Atölyesi Antalya</span>
        </nav>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4.5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=70') center/cover", opacity: .1 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🏭 Terzi Can · Antalya · Dikiş Atölyesi & Fason Üretim
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Dikiş Atölyesi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Fason Üretim · Kalıp · Seri İmalat 2026</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.85, maxWidth: '640px', marginBottom: '1.5rem' }}>
              Markalar, butikler ve e-ticaret firmaları için <strong style={{ color: '#fff' }}>kalıp çıkarma, numune dikimi,
              fason üretim ve seri imalat</strong>. Minimum 50 adet. Nakış, baskı ve paketleme dahil.
              <strong style={{ color: '#D4B07A' }}> Prototip tek adet.</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', maxWidth: '700px', marginBottom: '2rem' }}>
              {[['Kalıp','Özel çıkarma'],['Numune','Tek adet'],['Fason','Min 50 adet'],['Nakış','Logo & isim'],['Teslim','Paketli']].map(([t,d]) => (
                <div key={t} style={{ background: 'rgba(255,255,255,.04)', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#D4B07A', marginBottom: '.3rem' }}>{t}</div>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)' }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, fason üretim için teklif almak istiyorum. Ürün ve adet bilgisi: ')} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                🏭 Fason Teklifi Al
              </a>
              <a href={`tel:${PHONE_E}`} style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '.9rem 1.6rem', textDecoration: 'none', fontSize: '.85rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* HİZMETLER */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Atölye Hizmetleri</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>Üretimin her aşamasında yanınızdayız</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: '1rem' }}>
              {HIZMETLER.map(({ ic, baslik, aciklama }) => (
                <div key={baslik} style={{ background: '#F2EDE4', border: '1px solid rgba(184,151,90,.15)', borderLeft: '3px solid #B8975A', padding: '1.6rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '.6rem' }}>{ic}</div>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.05rem', color: '#1C1814', marginBottom: '.5rem', fontWeight: 600 }}>{baslik}</h3>
                  <p style={{ fontSize: '.8rem', color: '#7A6E62', lineHeight: 1.7 }}>{aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HEDEF KİTLE */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Kimler İçin?</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>Fason üretimimizi tercih eden sektörler</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
              {HEDEF_KITLELER.map(([ic, t, d]) => (
                <div key={t} style={{ background: '#fff', padding: '1.5rem', borderTop: '2px solid rgba(184,151,90,.3)' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '.6rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#1C1814', marginBottom: '.4rem', fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.65 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SÜREÇ */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Üretim Süreci</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2.5rem' }}>5 adımda fason üretim</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {SUREC.map(([ic, t, d], i) => (
                <div key={i} style={{ background: '#FAF7F2', padding: '1.8rem 1.2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '.6rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '.95rem', color: '#B8975A', marginBottom: '.4rem', fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: '.72rem', color: '#7A6E62', lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AÇIKLAYICI İÇERİK — Google için önemli */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1.2rem' }}>
              Antalya'da Fason Üretim ve Dikiş Atölyesi Hakkında
            </h2>
            <div style={{ fontSize: '.9rem', color: '#5A4E42', lineHeight: 1.95 }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Antalya dikiş atölyesi</strong> olarak Terzi Can, butik markalardan e-ticaret girişimlerine,
                spor kulüplerinden kurumsal firmalara geniş bir üretim yelpazesi sunmaktadır.
                <strong> Fason kıyafet üretiminde</strong> tek adet prototipten 1.000 adet seri imalata kadar
                her ölçekte çalışabiliyoruz.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Kalıp çıkarma hizmetimizle</strong> tasarım dosyanızdan veya elimizde bulunan referans
                üründen teknik kalıp çıkarılmakta, XS'den 3XL'ye gradaj (beden çoğaltma) yapılmaktadır.
                CAD destekli kalıp çalışması sayesinde hata payı minimuma indirilmektedir.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Sweatshirt, eşofman, polo yaka, kapüşonlu</strong> ve tüm casual giyim
                üretiminde dijital baskı, DTF baskı ve bilgisayarlı nakış hizmetleri bir arada sunulmaktadır.
                Logo nakışı ₺100'den başlamaktadır.
              </p>
              <p>
                <strong>E-ticaret satıcıları için</strong> ürünler barkodlu etiketli ve bireysel paketlenmiş
                olarak teslim edilmektedir. Trendyol, Amazon Türkiye ve Hepsiburada deposuna uygun
                sevkiyat formatında hazırlanabilmektedir.
              </p>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Dikiş Atölyesi — Sık Sorulan Sorular</h2>
            {[
              ['Fason üretim Antalya minimum kaç adet?', 'Seri üretim için minimum 50 adet gereklidir. Numune ve prototip tek adet kabul edilir.'],
              ['Kalıp çıkarma hizmeti var mı?', `Evet! Tasarım dosyası veya referans üründen teknik kalıp + gradaj. WhatsApp: ${PHONE}`],
              ['Sweatshirt ve eşofman üretimi yapılıyor mu?', `Evet! Nakış ve baskı dahil. Minimum 50 adet. WhatsApp: ${PHONE}`],
              ['E-ticaret için ürün üretimi yapılıyor mu?', `Evet! Trendyol, Amazon, Hepsiburada satıcıları için etiketli + paketlenmiş üretim. WhatsApp: ${PHONE}`],
              ['Teslimat süresi ne kadar?', 'Numune onayından sonra seri imalat 15–30 iş günüdür. Büyük siparişlerde proje planı yapılır.'],
              ['Do you offer garment manufacturing in Antalya in English?', `Yes! Tailor Can sewing workshop offers production for international brands. Min 50 pcs. WhatsApp: ${PHONE}`],
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
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.7rem' }}>Fason Üretim Teklifi Alın</h2>
          <p style={{ color: 'rgba(255,255,255,.9)', marginBottom: '2rem', fontSize: '.92rem' }}>
            Ürün ve adet bilgisini gönderin — 24 saat içinde fiyat teklifi
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, fason üretim için teklif almak istiyorum. Ürün ve adet: ')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Teklif İste
            </a>
            <a href={`tel:${PHONE_E}`} style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '.78rem', color: 'rgba(255,255,255,.7)' }}>⭐ 4.9 / 5 · 94 Google Değerlendirmesi · Pzt–Cmt 09:00–19:00</p>
        </section>

        {/* İLGİLİ SAYFALAR */}
        <section style={{ padding: '2rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>İlgili Hizmetler</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[
                ['Üniforma Üretimi', '/terzi/uniforma-uretimi-antalya'],
                ['Bay Terzi', '/terzi/bay-terzi-antalya'],
                ['Bayan Terzi', '/terzi/bayan-terzi-antalya'],
                ['Nakış Antalya', '/terzi'],
                ['← Tüm Hizmetler', '/terzi'],
              ].map(([l, h]) => (
                <Link key={l} href={h} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>{l}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
