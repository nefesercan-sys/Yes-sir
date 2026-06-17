import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/kuru-temizleme-antalya';
const PARENT = 'https://swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Kuru Temizleme Antalya — Otele Alım Teslimat 2026',
      description: "Antalya'da kuru temizleme, çamaşır ve ütü hizmeti. Otel ve adreslerden alım teslimat. 24 saat ekspres. Elbise ₺300, mont ₺500, çamaşır ₺80/kg.",
      provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: '+905318986418', '@id': `${PARENT}#business` },
      areaServed: ['Antalya','Konyaaltı','Belek','Lara','Kemer','Alanya','Manavgat'].map(name=>({'@type':'City',name})),
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '80',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'SwapHubs', item:'https://www.swaphubs.com' },
        { '@type':'ListItem', position:2, name:'Antalya Terzi', item:PARENT },
        { '@type':'ListItem', position:3, name:'Kuru Temizleme Antalya', item:SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Antalya kuru temizleme fiyatı 2026 ne kadar?', acceptedAnswer:{'@type':'Answer', text:`Elbise ₺300, mont ₺500, takım elbise ₺450, çamaşır ₺80/kg'den başlar. Otel alım teslimat ücretsiz. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Antalya otele gelen kuru temizleme var mı?', acceptedAnswer:{'@type':'Answer', text:`Evet! Belek, Lara, Kemer dahil tüm Antalya otellerine kuru temizleme alım ve teslimat yapıyoruz. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Kuru temizleme 24 saatte hazır mı?', acceptedAnswer:{'@type':'Answer', text:'Evet! Turistler için ekspres 24 saat kuru temizleme hizmeti mevcuttur. Normal süre 48 saattir.'}},
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Kuru Temizleme Antalya · Otele Alım Teslimat · 24 Saat Ekspres · Fiyatları 2026',
  description: "Antalya kuru temizleme 2026: elbise ₺300, mont ₺500, çamaşır ₺80/kg. Belek, Lara, Kemer dahil tüm otellere alım teslimat. 24 saat ekspres. ☎ +90 531 898 64 18",
  keywords: [
    'kuru temizleme Antalya', 'kuru temizleme fiyatı 2026', 'Antalya kuru temizleme',
    'otele kuru temizleme Antalya', 'Belek kuru temizleme', 'Lara kuru temizleme',
    'ekspres kuru temizleme Antalya', 'çamaşır yıkama Antalya', 'ütü servisi Antalya',
    'kuru temizleme alım teslimat Antalya', '24 saat kuru temizleme Antalya',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Kuru Temizleme Antalya · Otele Alım Teslimat · 24 Saat Ekspres',
    description: "Elbise ₺300, mont ₺500. Tüm Antalya otellerine alım teslimat. 24 saat. ☎ +90 531 898 64 18",
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true },
};

const FIYATLAR = [
  ['Elbise / Gömlek Kuru Temizleme', '₺300', '48 saat', '24s ekspres mevcut'],
  ['Takım Elbise (Ceket + Pantolon)', '₺450', '48 saat', 'Komple temizlik'],
  ['Mont / Kaban Kuru Temizleme', '₺500', '48 saat', 'Tüm mont türleri'],
  ['Şişme Mont Kuru Temizleme', '₺550', '48 saat', 'Özel şişme işlem'],
  ['Gelinlik Kuru Temizleme', '₺800+', '5–7 gün', 'Özel gelin paketi'],
  ['Abiye / Gece Elbisesi', '₺400', '48 saat', 'Taş ve süslü elbise'],
  ['Deri Ceket Temizleme', '₺600', '3–5 gün', 'Özel deri bakım'],
  ['Çamaşır & Ütü (kg)', '₺80/kg', '24 saat', 'Min. 3 kg'],
  ['Yatak Örtüsü / Nevresim', '₺200', '48 saat', 'Büyük boy dahil'],
  ['Perde (m²)', '₺60/m²', '3–5 gün', 'Ölçüye göre'],
  ['Otel Alım Teslimat Ücreti', 'ÜCRETSIZ', '—', 'Tüm Antalya otelleri'],
];

export default function KuruTemizlemePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: "'Jost',system-ui,sans-serif", background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}
          <span>Kuru Temizleme Antalya</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4rem 1.5rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1200&q=70') center/cover", opacity: .1 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🧺 Terzi Can · Antalya · Kuru Temizleme · Otele Alım Teslimat
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Kuru Temizleme Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Otele Alım Teslimat · 24 Saat Ekspres</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              Elbise <strong style={{ color: '#D4B07A' }}>₺300</strong> · Mont <strong style={{ color: '#D4B07A' }}>₺500</strong> · Çamaşır <strong style={{ color: '#D4B07A' }}>₺80/kg</strong> ·
              <strong style={{ color: '#fff' }}> Belek, Lara, Kemer dahil tüm otellere alım teslimat ücretsiz</strong>.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <a href={WA('Merhaba, kuru temizleme için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                💬 Kıyafet Listesi Gönderin
              </a>
              <a href="tel:+905318986418" style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '.9rem 1.6rem', textDecoration: 'none', fontSize: '.85rem' }}>
                📞 {PHONE}
              </a>
            </div>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
              {[['🇹🇷','Otelde alım yapıyoruz'],['🇬🇧','Hotel pickup & delivery'],['🇷🇺','Забор из отеля'],['🇩🇪','Abholung im Hotel']].map(([f,t])=>(
                <span key={f as string} style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', padding: '.3rem .8rem', borderRadius: '2px' }}>
                  {f} {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Kuru Temizleme Fiyat Listesi 2026
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '1.8rem' }}>
              Antalya kuru temizleme başlangıç fiyatları — otel alım teslimat ücretsiz
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Hizmet', 'Fiyat', 'Süre', 'Not'].map(h=>(
                    <th key={h} style={{ padding: '.7rem .8rem', textAlign: h==='Hizmet'?'left':'center', fontSize: '.68rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIYATLAR.map(([tip,fiyat,sure,not],i)=>(
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i%2?'rgba(184,151,90,.025)':'#fff' }}>
                    <td style={{ padding: '.9rem .8rem', fontSize: '.88rem' }}>{tip}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: fiyat==='ÜCRETSIZ'?'#22c55e':'#8A6E3E', fontWeight: 700 }}>{fiyat}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: '#7A6E62', fontSize: '.8rem' }}>{sure}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: '#7A6E62', fontSize: '.76rem' }}>{not}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>
              Antalya Otellerde Kuru Temizleme Nasıl Çalışır?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {[['💬','WhatsApp\'tan Yazın','Kıyafet listesi ve otel adını gönderin'],['🏨','Otele Alıma Geliyoruz','Belirtilen saatte odanızdan alıyoruz'],['🧺','24–48 Saatte Hazır','Profesyonel kuru temizleme'],['🚗','Odanıza Teslim','Temiz ve ütülü olarak teslim'],].map(([ic,t,d])=>(
                <div key={t as string} style={{ background: '#FAF7F2', padding: '1.8rem 1.2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '.6rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '.95rem', color: '#B8975A', marginBottom: '.4rem' }}>{t}</div>
                  <div style={{ fontSize: '.76rem', color: '#7A6E62', lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Kuru Temizleme SSS</h2>
            {[
              ['Antalya kuru temizleme fiyatı 2026?', `Elbise ₺300, mont ₺500, takım elbise ₺450, çamaşır ₺80/kg. Otel alım teslimat ücretsiz. WhatsApp: ${PHONE}`],
              ['Otele gelen kuru temizleme var mı Antalya?', `Evet! Belek (Rixos, Regnum, Kaya Palazzo), Lara (Titanic, Delphin Diva), Kemer, Alanya dahil tüm otellere alım teslimat yapıyoruz. WhatsApp: ${PHONE}`],
              ['Kuru temizleme 24 saatte hazır mı?', 'Evet! Turistler için ekspres 24 saat kuru temizleme hizmeti mevcuttur. Standart süre 48 saattir.'],
              ['Gelinlik kuru temizleme yapılıyor mu?', 'Evet. Gelinlik kuru temizleme ₺800\'den başlar. Özel paketleme ve koruma kutusuyla teslim edilir.'],
              ['Çamaşır yıkama hizmeti var mı?', 'Evet. Çamaşır yıkama ve ütü servisi ₺80/kg\'dan sunulmaktadır. Minimum 3 kg.'],
              ['Antalya kuru temizleme otel alım ücretsiz mi?', 'Evet! Tüm Antalya otellerinden alım ve odaya teslimat tamamen ücretsizdir.'],
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
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.7rem' }}>Kuru Temizleme Talep Edin</h2>
          <p style={{ color: 'rgba(255,255,255,.9)', marginBottom: '1.8rem', fontSize: '.92rem' }}>
            Otel adını ve kıyafet listesini gönderin — 24–48 saatte temiz ve ütülü teslim
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, kuru temizleme için kıyafet listem: ')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Kıyafet Listesi Gönderin
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
              {[
                ['Paça Kısaltma Antalya', '/terzi/paca-kisaltma-antalya'],
                ['Fermuar Değişimi', '/terzi/fermuar-degisimi-antalya'],
                ['Eve Gelen Terzi', '/terzi/eve-gelen-terzi-antalya'],
                ['← Tüm Hizmetler', '/terzi'],
              ].map(([l,h])=>(
                <Link key={l} href={h} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
