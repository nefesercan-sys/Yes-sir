import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://www.swaphubs.com/terzi/bayan-terzi-antalya';
const PARENT = 'https://www.swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Bayan Terzi Antalya — Kadın Elbise Dikimi Fiyatları 2026',
      description: "Antalya'da bayan terzi. Kadın elbise dikimi ₺600, etek kısaltma ₺175, abiye tamiri ₺350, gelinlik tadilatı ₺500. Eve ve otele gelen terzi servisi.",
      provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: '+905318986418', '@id': `${PARENT}#business` },
      areaServed: ['Antalya','Konyaaltı','Belek','Lara','Kemer','Alanya'].map(name=>({'@type':'City',name})),
      offers: { '@type': 'AggregateOffer', lowPrice: '150', highPrice: '3000', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'SwapHubs', item:'https://www.swaphubs.com' },
        { '@type':'ListItem', position:2, name:'Antalya Terzi', item:PARENT },
        { '@type':'ListItem', position:3, name:'Bayan Terzi Antalya', item:SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Bayan terzi Antalya fiyatları 2026?', acceptedAnswer:{'@type':'Answer', text:`Etek kısaltma ₺175, elbise daraltma ₺200, kadın elbise dikimi ₺600, abiye tamiri ₺350, gelinlik tadilatı ₺500. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Gelinlik tadilatı Antalya kaç lira?', acceptedAnswer:{'@type':'Answer', text:`Gelinlik tadilatı ₺500'den başlar. Kısaltma, daraltma, omuz ayarı yapılmaktadır. Nisan–Ekim düğün sezonunda. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Abiye tamiri Antalya fiyatı?', acceptedAnswer:{'@type':'Answer', text:`Abiye tamiri ₺350'den, abiye kısaltma ₺250'den başlar. 48 saatte teslim. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Kadın elbise dikimi Antalya?', acceptedAnswer:{'@type':'Answer', text:`Evet! Ölçüye özel kadın elbise dikimi ₺600'den başlar. Bluz, etek, tulum, abiye. WhatsApp: ${PHONE}`}},
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Bayan Terzi Antalya · Kadın Elbise Dikimi · Gelinlik Tadilatı 2026 | Terzi Can',
  description: "Antalya bayan terzi: elbise dikimi ₺600, gelinlik tadilatı ₺500, abiye tamiri ₺350, etek kısaltma ₺175. Eve gelen terzi servisi. ☎ +90 531 898 64 18",
  keywords: [
    'bayan terzi Antalya', 'kadın terzi Antalya', 'kadın elbise dikimi Antalya',
    'gelinlik tadilatı Antalya', 'abiye tamiri Antalya', 'etek kısaltma Antalya',
    'bayan terzi fiyatları 2026', 'elbise daraltma Antalya', 'abiye dikimi Antalya',
    'büyük beden bayan terzi Antalya', 'women tailor Antalya', 'dress alteration Antalya',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Bayan Terzi Antalya · Kadın Elbise Dikimi · Gelinlik Tadilatı',
    description: "Elbise ₺600, gelinlik ₺500, abiye ₺350. Eve gelen terzi. ☎ +90 531 898 64 18",
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true },
};

const FIYATLAR = [
  ['Etek / Pantolon Kısaltma', '₺150–175', '24 saat'],
  ['Elbise Daraltma / Beden Küçültme', '₺200', '48 saat'],
  ['Kol Kısaltma (Elbise/Bluz)', '₺175', '48 saat'],
  ['Invisible Fermuar Değişimi', '₺180', '24 saat'],
  ['Bluz Dikimi', '₺350', '3–5 gün'],
  ['Kadın Elbise Dikimi', '₺600', '5–7 gün'],
  ['Tulum Dikimi', '₺700', '5–7 gün'],
  ['Abiye Tamiri / Kısaltma', '₺350', '48 saat'],
  ['Abiye Dikimi', '₺1.200', '7–10 gün'],
  ['Gelinlik Tadilatı', '₺500', '3–5 gün'],
  ['Gelinlik Dikimi', '₺3.000+', '15–20 gün'],
  ['Büyük Beden Elbise Dikimi', '₺700+', '5–7 gün'],
  ['Araçlı Servis Ücreti', 'ÜCRETSIZ', '—'],
];

export default function BayanTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: "'Jost',system-ui,sans-serif", background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}<Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}<span>Bayan Terzi Antalya</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4rem 1.5rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=70') center/cover", opacity: .1 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              👗 Terzi Can · Antalya · Bayan Terzi Uzmanı
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Bayan Terzi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Elbise Dikimi · Gelinlik Tadilatı · Abiye 2026</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              Etek kısaltma <strong style={{ color: '#D4B07A' }}>₺175</strong> ·
              Elbise dikimi <strong style={{ color: '#D4B07A' }}>₺600</strong> ·
              Gelinlik tadilatı <strong style={{ color: '#D4B07A' }}>₺500</strong> ·
              <strong style={{ color: '#fff' }}> Eve ve otele gelen terzi servisi</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', maxWidth: '700px', marginBottom: '1.5rem' }}>
              {[['Etek Kısaltma','₺175'],['Elbise Dikimi','₺600'],['Abiye Tamiri','₺350'],['Gelinlik Tadilat','₺500'],['Abiye Dikimi','₺1.200']].map(([n,p])=>(
                <div key={n} style={{ background: 'rgba(255,255,255,.04)', padding: '.9rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)', marginBottom: '.2rem' }}>{n}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.2rem', color: '#D4B07A', fontWeight: 700 }}>{p}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, kadın kıyafeti için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                💬 Fotoğraf Gönder → Fiyat Al
              </a>
              <a href="tel:+905318986418" style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '.9rem 1.6rem', textDecoration: 'none', fontSize: '.85rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Bayan Terzi Fiyat Listesi 2026</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '1.8rem' }}>Başlangıç fiyatları — kesin fiyat için WhatsApp'tan fotoğraf gönderin</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Hizmet', 'Fiyat', 'Süre'].map(h=>(
                    <th key={h} style={{ padding: '.7rem .8rem', textAlign: h==='Hizmet'?'left':'center', fontSize: '.68rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIYATLAR.map(([tip,fiyat,sure],i)=>(
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i%2?'rgba(184,151,90,.025)':'#fff' }}>
                    <td style={{ padding: '.9rem .8rem', fontSize: '.88rem' }}>{tip}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: fiyat==='ÜCRETSIZ'?'#22c55e':'#8A6E3E', fontWeight: 700 }}>{fiyat}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: '#7A6E62', fontSize: '.8rem' }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>Bayan Terzi Hizmetleri Hakkında</h2>
            <div style={{ fontSize: '.9rem', color: '#5A4E42', lineHeight: 1.95 }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Kadın elbise dikimi</strong> en kişisel terzilik hizmetlerinden biridir. Terzi Can olarak
                Antalya'da bluzdan tuluma, günlük elbiseden abiyeye kadar her tür kadın kıyafetini ölçüye göre dikiyoruz.
                <strong> Kadın elbise dikimi ₺600'den</strong> başlamakta, model ve kumaş seçimine göre değişmektedir.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Gelinlik tadilatı</strong> özel dikkat gerektiren bir işlemdir. Ölçü almadan kısaltma, daraltma,
                omuz ayarı ve süsleme ekleme yapılmaktadır. Nisan–Ekim düğün sezonunda önceden randevu almanızı öneririz.
                Gelinlik tadilatı <strong>₺500'den</strong> başlamaktadır.
              </p>
              <p>
                <strong>Abiye tamiri ve kısaltmada</strong> taş ve süslemeler korunarak işlem yapılmaktadır.
                Ekspres 24–48 saatte teslim mümkündür. Turistler için otel teslimatı ücretsizdir.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Bayan Terzi SSS</h2>
            {[
              ['Bayan terzi Antalya fiyatları 2026?', `Etek kısaltma ₺175, elbise daraltma ₺200, elbise dikimi ₺600, abiye tamiri ₺350, gelinlik tadilatı ₺500. WhatsApp: ${PHONE}`],
              ['Gelinlik tadilatı Antalya kaç lira?', `Gelinlik tadilatı ₺500'den başlar. Kısaltma, daraltma, omuz düzeltme. Nisan–Ekim sezonu. WhatsApp: ${PHONE}`],
              ['Abiye tamiri 24 saatte olur mu?', 'Evet! Ekspres abiye tamiri 24–48 saatte yapılmaktadır. Tatildesiniz, gala yemeğiniz var — aynı gün servis mümkün.'],
              ['Büyük beden bayan kıyafeti dikimi var mı?', `Evet! Büyük beden kadın elbise, pantolon ve gömlek dikimi ₺700'den başlar. WhatsApp: ${PHONE}`],
              ['Bayan kıyafeti tadilatı otele geliyor mu?', `Evet! Belek, Lara, Kemer dahil tüm Antalya otellerine araçlı terzi servisi. WhatsApp: ${PHONE}`],
              ['Bebek ve çocuk elbisesi dikimi yapılıyor mu?', `Evet! Bebek elbisesi, çocuk kıyafeti ve okul kıyafeti dikimi yapılmaktadır. WhatsApp: ${PHONE}`],
            ].map(([q,a],i)=>(
              <details key={i} style={{ borderBottom: '1px solid rgba(184,151,90,.1)', padding: '.8rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.92rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#B8975A' }}>+</span>
                </summary>
                <p style={{ marginTop: '.7rem', fontSize: '.84rem', color: '#7A6E62', lineHeight: 1.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ background: '#B8975A', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.7rem' }}>Bayan Kıyafet Fiyatı Öğrenin</h2>
          <p style={{ color: 'rgba(255,255,255,.9)', marginBottom: '1.8rem', fontSize: '.92rem' }}>Fotoğraf gönderin — 30 dk fiyat · Araçlı servis ücretsiz</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, kadın kıyafeti için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp
            </a>
            <a href="tel:+905318986418" style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
        </section>

        <section style={{ padding: '2rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>Diğer Hizmetler</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[['Bay Terzi Antalya','/terzi/bay-terzi-antalya'],['Paça Kısaltma','/terzi/paca-kisaltma-antalya'],['Kuru Temizleme','/terzi/kuru-temizleme-antalya'],['← Tüm Hizmetler','/terzi']].map(([l,h])=>(
                <Link key={l} href={h} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>{l}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
