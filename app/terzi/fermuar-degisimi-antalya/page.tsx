import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/fermuar-degisimi-antalya';
const PARENT = 'https://swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Fermuar Değişimi Antalya — Kot Mont Ceket Fermuar Tamiri Fiyatları 2026',
      description: "Antalya'da fermuar değişimi: pantolon/kot ₺120, ceket ₺200, mont ₺300'den başlar. Aynı gün teslim. Eve ve otele gelen terzi servisi.",
      provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: '+905318986418', '@id': `${PARENT}#business` },
      areaServed: ['Antalya','Konyaaltı','Belek','Lara','Kemer','Alanya'].map(name=>({'@type':'City',name})),
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '120',
        highPrice: '500',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'SwapHubs', item:'https://www.swaphubs.com' },
        { '@type':'ListItem', position:2, name:'Antalya Terzi', item:PARENT },
        { '@type':'ListItem', position:3, name:'Fermuar Değişimi Antalya', item:SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Antalya fermuar değişimi fiyatı 2026 ne kadar?', acceptedAnswer:{'@type':'Answer', text:`Pantolon/kot fermuarı ₺120, ceket fermuarı ₺200, mont fermuarı ₺300, çanta fermuarı ₺150'den başlar. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Fermuar değişimi kaç saatte olur?', acceptedAnswer:{'@type':'Answer', text:'Pantolon ve kot fermuar değişimi çoğunlukla aynı gün, mont ve ceket fermuarı 24 saatte tamamlanmaktadır.'}},
        { '@type':'Question', name:'Mont fermuarı değişimi kaç lira?', acceptedAnswer:{'@type':'Answer', text:`Mont fermuarı değişimi ₺300'den başlar. Mont türüne göre (şişme, kaban, spor) fiyat farklılık gösterebilir. WhatsApp'tan fotoğraf gönderin.`}},
        { '@type':'Question', name:'Invisible fermuar değişimi yapılıyor mu?', acceptedAnswer:{'@type':'Answer', text:'Evet. Gizli fermuar (invisible/gizli) değişimi yapılmaktadır. Elbise ve abiye için özellikle tercih edilmektedir.'}},
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Fermuar Değişimi Antalya · Kot ₺120 · Mont ₺300 · Fiyatları 2026 | Terzi Can',
  description: "Antalya fermuar değişimi 2026: kot/pantolon ₺120, ceket ₺200, mont ₺300. Aynı gün teslim. Tüm fermuar türleri. Eve ve otele gelen terzi. ☎ +90 531 898 64 18",
  keywords: [
    'fermuar değişimi Antalya', 'mont fermuarı değişimi Antalya', 'kot fermuarı tamiri Antalya',
    'fermuar tamiri Antalya', 'fermuar değişimi fiyatı 2026', 'ceket fermuarı değişimi',
    'pantolon fermuarı değişimi Antalya', 'invisible fermuar değişimi', 'çanta fermuarı değişimi',
    'fermuar değişimi Konyaaltı', 'fermuar tamiri Belek', 'fermuar değişimi Lara',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Fermuar Değişimi Antalya · Kot ₺120 · Mont ₺300 · Aynı Gün',
    description: "Antalya'da her tür fermuar değişimi. Kot ₺120, mont ₺300, invisible fermuar. Aynı gün teslim. ☎ +90 531 898 64 18",
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true },
};

const FIYATLAR = [
  ['Pantolon / Kot Fermuarı', '₺120', 'Aynı gün', 'Metal veya plastik'],
  ['Etek Fermuarı', '₺130', 'Aynı gün', 'Gizli veya görünür'],
  ['Ceket / Blazer Fermuarı', '₺200', '24 saat', 'Astar dahil'],
  ['Sweatshirt / Kapüşonlu', '₺160', '24 saat', 'Bütün boy fermuar'],
  ['Mont / Kaban Fermuarı', '₺300', '24 saat', 'Çift taraflı seçenek'],
  ['Şişme Mont Fermuarı', '₺350', '24–48 saat', 'Özel şişme mont işlemi'],
  ['Elbise Invisible Fermuar', '₺180', '24 saat', 'Gizli fermuar tekniği'],
  ['Çanta Fermuarı', '₺150', '24 saat', 'Deri çanta dahil'],
  ['Fermuar Başlığı / Sürgüsü', '₺80', 'Aynı gün', 'Fermuar değişmeden'],
  ['Araçlı Servis Ücreti', 'ÜCRETSIZ', '—', 'Tüm Antalya'],
];

export default function FermuarDegisimiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: "'Jost',system-ui,sans-serif", background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}
          <span>Fermuar Değişimi Antalya</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4rem 1.5rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=70') center/cover", opacity: .08 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🔧 Terzi Can · Antalya · Fermuar Değişimi Uzmanı
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Fermuar Değişimi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Fiyatları 2026 — Kot Fermuarı ₺120</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              Pantolon/kot fermuarı <strong style={{ color: '#D4B07A' }}>₺120</strong> · Mont fermuarı <strong style={{ color: '#D4B07A' }}>₺300</strong> ·
              <strong style={{ color: '#fff' }}> Aynı gün teslim</strong> · Her tür fermuar değişimi ·
              Tüm Antalya ilçelerine araçlı servis.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', maxWidth: '700px', marginBottom: '1.5rem' }}>
              {[['Pantolon / Kot','₺120','Aynı gün'],['Elbise / Etek','₺130','Aynı gün'],['Ceket','₺200','24 saat'],['Mont / Kaban','₺300','24 saat'],['Çanta','₺150','24 saat']].map(([n,p,s])=>(
                <div key={n} style={{ background: 'rgba(255,255,255,.04)', padding: '.9rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.5)', marginBottom: '.2rem' }}>{n}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', color: '#D4B07A', fontWeight: 700 }}>{p}</div>
                  <div style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.4)', marginTop: '.2rem' }}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, fermuar değişimi için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
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
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Fermuar Değişimi Fiyat Listesi 2026
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '1.8rem' }}>
              Başlangıç fiyatları. Kesin fiyat için WhatsApp'tan kıyafetinizin fotoğrafını gönderin.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Fermuar Türü', 'Fiyat', 'Süre', 'Detay'].map(h=>(
                    <th key={h} style={{ padding: '.7rem .8rem', textAlign: h==='Fermuar Türü'?'left':'center', fontSize: '.68rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIYATLAR.map(([tip, fiyat, sure, detay], i)=>(
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i%2?'rgba(184,151,90,.025)':'#fff' }}>
                    <td style={{ padding: '.9rem .8rem', fontSize: '.88rem' }}>{tip}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: fiyat==='ÜCRETSIZ'?'#22c55e':'#8A6E3E', fontWeight: 700, fontSize: '.92rem' }}>{fiyat}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: '#7A6E62', fontSize: '.8rem' }}>{sure}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: '#7A6E62', fontSize: '.76rem' }}>{detay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>
              Fermuar Değişimi Hakkında
            </h2>
            <div style={{ fontSize: '.9rem', color: '#5A4E42', lineHeight: 1.95 }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Fermuar değişimi</strong>, bozuk veya kırık fermuarın tamamen yenisiyle değiştirilmesi işlemidir.
                Terzi Can olarak Antalya'da <strong>pantolon ve kot fermuar değişimini ₺120'den</strong>,
                mont ve kaban fermuar değişimini <strong>₺300'den</strong> başlayan fiyatlarla sunuyoruz.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>YKK marka fermuar</strong> kullanıyoruz — Türkiye'nin en güvenilir fermuar markası. Metal,
                plastik, invisible (gizli) ve spiral fermuar seçenekleri mevcuttur. Orijinal fermuar rengiyle
                birebir uyumlu seçenekler sunulmaktadır.
              </p>
              <p>
                <strong>Şişme mont fermuar değişiminde</strong> özel dikkat gerektiren bir işlem söz konusudur.
                Şişme dolgusunun zarar görmemesi için dikkatli bir söküm ve yeniden montaj yapılmaktadır.
                Bu nedenle şişme mont fermuarı ₺350'den başlamaktadır.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>
              Fermuar Değişimi SSS
            </h2>
            {[
              ['Fermuar değişimi kaç lira? Antalya 2026', `Pantolon/kot ₺120, etek ₺130, ceket ₺200, mont ₺300, şişme mont ₺350, çanta ₺150. Aynı gün servis. WhatsApp: ${PHONE}`],
              ['Aynı gün fermuar değişimi yapılıyor mu?', 'Evet! Pantolon, kot ve etek fermuarı aynı gün tamamlanır. Mont ve ceket fermuarı 24 saatte hazır olur.'],
              ['Mont fermuarı değişimi kaç lira?', "Mont fermuarı ₺300'den başlar. Şişme mont için ₺350. Çift taraflı fermuar seçeneği de mevcuttur."],
              ['YKK fermuar kullanıyor musunuz?', 'Evet! Tüm fermuar değişimlerinde YKK marka fermuar kullanılmaktadır. Metal, plastik ve spiral seçenekler mevcuttur.'],
              ['Invisible / gizli fermuar değişimi yapılıyor mu?', 'Evet. Elbise ve abiye için gizli fermuar (invisible) değişimi ₺180\'den yapılmaktadır.'],
              ['Eve gelen fermuar değişimi Antalya var mı?', `Evet! Araçlı terzi servisimizle kıyafetinizi alıp, değiştirip kapınıza teslim ediyoruz. WhatsApp: ${PHONE}`],
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
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.7rem' }}>Fermuar Değişimi Fiyatı Öğrenin</h2>
          <p style={{ color: 'rgba(255,255,255,.9)', marginBottom: '1.8rem', fontSize: '.92rem' }}>
            Fotoğraf gönderin — 30 dakika içinde fiyat · Aynı gün teslim mümkün
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, fermuar değişimi için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Fotoğraf Gönder
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
                ['Kuru Temizleme Antalya', '/terzi/kuru-temizleme-antalya'],
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
