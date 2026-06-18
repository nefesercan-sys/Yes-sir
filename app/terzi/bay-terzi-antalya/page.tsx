import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/bay-terzi-antalya';
const PARENT = 'https://swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Bay Terzi Antalya — Erkek Takım Elbise Dikimi Fiyatları 2026',
      description: "Antalya'da bay terzi. Erkek takım elbise dikimi ₺2500, pantolon kısaltma ₺150, gömlek dikimi ₺400, smoking, damatlık. Eve ve otele gelen terzi servisi.",
      provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: '+905318986418', '@id': `${PARENT}#business` },
      areaServed: ['Antalya','Konyaaltı','Belek','Lara','Kemer','Alanya'].map(name=>({'@type':'City',name})),
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '150',
        highPrice: '5000',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'SwapHubs', item:'https://www.swaphubs.com' },
        { '@type':'ListItem', position:2, name:'Antalya Terzi', item:PARENT },
        { '@type':'ListItem', position:3, name:'Bay Terzi Antalya', item:SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Bay terzi Antalya fiyatları 2026?', acceptedAnswer:{'@type':'Answer', text:`Pantolon kısaltma ₺150, gömlek dikimi ₺400, takım elbise ₺2500, smoking ₺3500'den başlar. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Erkek takım elbise dikimi Antalya kaç lira?', acceptedAnswer:{'@type':'Answer', text:`Erkek takım elbise (ceket+pantolon) dikimi ₺2500'den başlar. Kumaş seçimine ve modele göre değişir. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Damatlık dikimi Antalya fiyatı?', acceptedAnswer:{'@type':'Answer', text:`Damatlık (takım elbise) dikimi ₺3000'den başlar. Özel kumaş ve aksesuar seçimi yapılabilir. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Erkek gömlek dikimi Antalya kaç lira?', acceptedAnswer:{'@type':'Answer', text:`Erkek gömlek dikimi ₺400'den başlar. Ölçüye göre kişiselleştirme mevcuttur. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Antalya\'da erkek kıyafeti tadilatı yapılıyor mu?', acceptedAnswer:{'@type':'Answer', text:`Evet! Pantolon kısaltma, ceket tadilatı, kol kısaltma, bel alma, fermuar değişimi. WhatsApp: ${PHONE}`}},
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Bay Terzi Antalya · Erkek Takım Elbise Dikimi · Pantolon Kısaltma 2026 | Terzi Can',
  description: "Antalya bay terzi: erkek takım elbise ₺2500, pantolon kısaltma ₺150, gömlek ₺400, smoking, damatlık. Eve gelen terzi servisi. ☎ +90 531 898 64 18",
  keywords: [
    'bay terzi Antalya', 'erkek terzi Antalya', 'erkek takım elbise dikimi Antalya',
    'damatlık dikimi Antalya', 'smoking dikimi Antalya', 'erkek gömlek dikimi Antalya',
    'pantolon kısaltma Antalya', 'erkek ceket tadilatı Antalya', 'bay terzi fiyatları 2026',
    'erkek kıyafet tadilatı Antalya', 'takım elbise dikimi Antalya fiyatı',
    'men tailor Antalya', 'bespoke suit Antalya',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Bay Terzi Antalya · Erkek Takım Elbise · Pantolon Kısaltma',
    description: "Erkek takım elbise ₺2500, pantolon ₺150. Eve gelen terzi. Tüm Antalya. ☎ +90 531 898 64 18",
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
};

const FIYATLAR = [
  ['Pantolon / Paça Kısaltma', '₺150', '24 saat'],
  ['Pantolon Bel Daraltma', '₺200', '48 saat'],
  ['Ceket Kol Kısaltma', '₺200', '48 saat'],
  ['Ceket Beden Küçültme', '₺350', '48 saat'],
  ['Erkek Gömlek Dikimi', '₺400', '3–5 gün'],
  ['Erkek Pantolon Dikimi', '₺600', '3–5 gün'],
  ['Blazer / Ceket Dikimi', '₺1.500', '5–7 gün'],
  ['Erkek Takım Elbise (Ceket+Pantolon)', '₺2.500', '7–10 gün'],
  ['Smoking Dikimi', '₺3.500', '7–10 gün'],
  ['Damatlık Takım Elbise', '₺3.000', '7–10 gün'],
  ['Araçlı Servis Ücreti', 'ÜCRETSIZ', '—'],
];

const s = { fontFamily: "'Jost',system-ui,sans-serif" as const };

export default function BayTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ ...s, background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}<Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}<span>Bay Terzi Antalya</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4rem 1.5rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=70') center/cover", opacity: .1 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              👔 Terzi Can · Antalya · Bay Terzi Uzmanı
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Bay Terzi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Erkek Takım Elbise · Gömlek · Pantolon 2026</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              Pantolon kısaltma <strong style={{ color: '#D4B07A' }}>₺150</strong> ·
              Takım elbise <strong style={{ color: '#D4B07A' }}>₺2.500</strong> ·
              Smoking <strong style={{ color: '#D4B07A' }}>₺3.500</strong> ·
              <strong style={{ color: '#fff' }}> Eve ve otele gelen terzi servisi</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', maxWidth: '700px', marginBottom: '1.5rem' }}>
              {[['Pantolon Kısaltma','₺150'],['Gömlek Dikimi','₺400'],['Blazer','₺1.500'],['Takım Elbise','₺2.500'],['Smoking','₺3.500']].map(([n,p])=>(
                <div key={n} style={{ background: 'rgba(255,255,255,.04)', padding: '.9rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.5)', marginBottom: '.2rem' }}>{n}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.2rem', color: '#D4B07A', fontWeight: 700 }}>{p}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, erkek kıyafeti için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
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
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Bay Terzi Fiyat Listesi 2026</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '1.8rem' }}>Başlangıç fiyatları — kesin fiyat için WhatsApp'tan yazın</p>
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
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>Antalya'da Erkek Terzisi — Neden Terzi Can?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
              {[
                ['👔','Takım Elbise Uzmanı','Ölçüye özel erkek takım elbise, blazer, smoking ve damatlık dikimi.'],
                ['✂️','Tadilat & Tamir','Pantolon kısaltma, ceket kol kısaltma, bel alma, fermuar değişimi.'],
                ['🚗','Eve Gelen Terzi','Araçlı servisimizle adresinize geliyoruz. Otel, ev, iş yeri.'],
                ['🌍','İngilizce Hizmet','Yabancı uyruklu müşteriler için İngilizce, Rusça, Almanca hizmet.'],
              ].map(([ic,t,d])=>(
                <div key={t as string} style={{ background: '#fff', padding: '1.4rem', borderTop: '2px solid rgba(184,151,90,.3)' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '.6rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#1C1814', marginBottom: '.4rem', fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>Erkek Terzi Hizmetleri Hakkında</h2>
            <div style={{ fontSize: '.9rem', color: '#5A4E42', lineHeight: 1.95 }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Erkek takım elbise dikimi</strong> en özel giyim yatırımlarından biridir. Terzi Can olarak
                Antalya'da <strong>ölçüye özel erkek takım elbise dikimini ₺2.500'den</strong> sunuyoruz.
                İtalyan, İngiliz veya klasik Türk kesimi seçenekleriyle müşteriye özel kalıp çıkarılmaktadır.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Smoking ve damatlık dikiminde</strong> kumaş seçiminden aksesuar koordinasyonuna kadar
                komple danışmanlık sunulmaktadır. Siyah veya renkli smoking, tek veya çift sıra düğme seçenekleri mevcuttur.
              </p>
              <p>
                <strong>Erkek pantolon tadilat ve kısaltmada</strong> paça kısaltma, bel daraltma, ağ dikimi
                ve fermuar değişimi yapılmaktadır. Tüm işlemler 24–48 saat içinde tamamlanmaktadır.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Bay Terzi SSS</h2>
            {[
              ['Bay terzi Antalya fiyatları 2026?', `Pantolon kısaltma ₺150, gömlek ₺400, blazer ₺1.500, takım elbise ₺2.500, smoking ₺3.500. WhatsApp: ${PHONE}`],
              ['Erkek takım elbise dikimi Antalya?', `Evet! Ölçüye özel erkek takım elbise ₺2.500'den. Kumaş seçimi, kalıp çıkarma ve dikim tek elden. WhatsApp: ${PHONE}`],
              ['Damatlık dikimi Antalya fiyatı?', `Damatlık ₺3.000'den başlar. Düğün sezonunda (Nisan–Ekim) önce randevu alın. WhatsApp: ${PHONE}`],
              ['Erkek kıyafet tadilatı Antalya?', 'Evet. Pantolon kısaltma, ceket kol kısaltma, bel alma, fermuar değişimi. 24–48 saat teslim.'],
              ['Erkek kıyafet tadilatı otele geliyor mu?', `Evet! Belek, Lara, Kemer dahil tüm Antalya otellerine araçlı terzi servisi. WhatsApp: ${PHONE}`],
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
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.7rem' }}>Erkek Kıyafet Fiyatı Öğrenin</h2>
          <p style={{ color: 'rgba(255,255,255,.9)', marginBottom: '1.8rem', fontSize: '.92rem' }}>Fotoğraf gönderin — 30 dk fiyat · Araçlı servis ücretsiz</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, erkek kıyafeti için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
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
              {[['Bayan Terzi Antalya','/terzi/bayan-terzi-antalya'],['Paça Kısaltma','/terzi/paca-kisaltma-antalya'],['Fermuar Değişimi','/terzi/fermuar-degisimi-antalya'],['← Tüm Hizmetler','/terzi']].map(([l,h])=>(
                <Link key={l} href={h} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>{l}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
