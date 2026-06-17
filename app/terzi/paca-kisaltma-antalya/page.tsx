import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/paca-kisaltma-antalya';
const PARENT = 'https://swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Paça Kısaltma Antalya — Pantolon Kısaltma Fiyatları 2026',
      description: "Antalya'da paça kısaltma ve pantolon kısaltma hizmeti. Kot paça ₺150, kumaş pantolon ₺175. 24 saatte teslim. Eve ve otele gelen terzi servisi.",
      provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: '+905318986418', '@id': `${PARENT}#business` },
      areaServed: [
        {name:'Antalya'},{name:'Konyaaltı'},{name:'Belek'},{name:'Lara'},{name:'Kemer'},{name:'Alanya'}
      ].map(c=>({...c,'@type':'City'})),
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '150',
        highPrice: '250',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        offers: [
          { '@type':'Offer', name:'Kot Paça Kısaltma', price:'150', priceCurrency:'TRY', description:'Kot pantolon paça kısaltma — 24 saat teslim' },
          { '@type':'Offer', name:'Kumaş Pantolon Paça Kısaltma', price:'175', priceCurrency:'TRY', description:'Kumaş pantolon paça kısaltma — 24 saat teslim' },
          { '@type':'Offer', name:'Eşofman / Spor Pantolon Paça', price:'150', priceCurrency:'TRY', description:'Spor pantolon paça kısaltma' },
          { '@type':'Offer', name:'Keten / Yazlık Pantolon Paça', price:'175', priceCurrency:'TRY', description:'Yazlık keten pantolon paça kısaltma' },
          { '@type':'Offer', name:'Deri Pantolon Paça', price:'250', priceCurrency:'TRY', description:'Deri pantolon paça kısaltma — özel işlem' },
        ],
      },
      hasOfferCatalog: {
        '@type':'OfferCatalog',
        name:'Paça Kısaltma Fiyat Listesi 2026',
        itemListElement:[
          { '@type':'Offer', name:'Kot Paça Kısaltma', price:'150', priceCurrency:'TRY' },
          { '@type':'Offer', name:'Kumaş Pantolon', price:'175', priceCurrency:'TRY' },
          { '@type':'Offer', name:'Deri Pantolon', price:'250', priceCurrency:'TRY' },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'SwapHubs', item:'https://www.swaphubs.com' },
        { '@type':'ListItem', position:2, name:'Antalya Terzi', item:PARENT },
        { '@type':'ListItem', position:3, name:'Paça Kısaltma Antalya', item:SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Antalya paça kısaltma fiyatı ne kadar? 2026', acceptedAnswer:{ '@type':'Answer', text:`Antalya'da paça kısaltma fiyatı: kot paça ₺150, kumaş pantolon ₺175, deri pantolon ₺250'den başlar. Araçlı terzi servisi ücretsiz. WhatsApp: ${PHONE}` }},
        { '@type':'Question', name:'Paça kısaltma kaç saatte olur?', acceptedAnswer:{ '@type':'Answer', text:'Normal işlemlerde 24 saat, acil durumlarda aynı gün paça kısaltma yapılmaktadır. WhatsApp\'tan iletişime geçin.' }},
        { '@type':'Question', name:'Eve gelen paça kısaltma Antalya var mı?', acceptedAnswer:{ '@type':'Answer', text:`Evet! Terzi Can araçlı servis ile tüm Antalya ilçelerine geliyor. Belek, Lara, Kemer, Alanya dahil. WhatsApp: ${PHONE}` }},
        { '@type':'Question', name:'Kot paça kısaltma fiyatı nedir?', acceptedAnswer:{ '@type':'Answer', text:"Kot paça kısaltma ₺150'dir. Orjinal dikiş tekniğiyle yapılır. 24 saatte teslim." }},
        { '@type':'Question', name:'Pantolon paça kısaltma ile pantolon kısaltma aynı şey mi?', acceptedAnswer:{ '@type':'Answer', text:'Evet, paça kısaltma ve pantolon boyu kısaltma aynı işlemdir. Pantolonun boyu belirlenen ölçüye göre kısaltılır ve yeniden dikilir.' }},
        { '@type':'Question', name:'Eşofman paça kısaltma kaç lira?', acceptedAnswer:{ '@type':'Answer', text:"Eşofman ve spor pantolon paça kısaltma ₺150'den başlar. Orijinal lastikli veya düz paça seçeneği mevcuttur." }},
      ],
    },
    {
      '@type': 'HowTo',
      name: 'Antalya\'da Paça Kısaltma Nasıl Yaptırılır?',
      step: [
        { '@type':'HowToStep', name:'WhatsApp\'tan Yazın', text:`+90 531 898 64 18 numarasına pantolonunuzun fotoğrafını gönderin.` },
        { '@type':'HowToStep', name:'Fiyat ve Randevu Alın', text:'30 dakika içinde fiyat ve randevu bilgisi iletilir.' },
        { '@type':'HowToStep', name:'Teslim Edin veya Terzi Gelsin', text:'Atölyeye teslim edebilir ya da araçlı terzi servisimizi kullanabilirsiniz.' },
        { '@type':'HowToStep', name:'24 Saatte Teslim', text:'Paça kısaltma işlemi 24 saatte tamamlanır, kapınıza teslim edilir.' },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Paça Kısaltma Antalya · Kot Paça ₺150 · Pantolon Kısaltma Fiyatları 2026 | Terzi Can',
  description: "Antalya paça kısaltma fiyatları 2026: kot paça ₺150, kumaş pantolon ₺175. 24 saatte teslim. Eve ve otele gelen terzi servisi. Belek, Lara, Kemer, Alanya. ☎ +90 531 898 64 18",
  keywords: [
    'paça kısaltma Antalya', 'pantolon kısaltma Antalya', 'paça kısaltma fiyatı 2026',
    'kot paça kısaltma Antalya', 'Antalya paça kısaltma kaç lira', 'pantolon boyu kısaltma Antalya',
    'eşofman paça kısaltma', 'eve gelen paça kısaltma Antalya', 'paça kısaltma Konyaaltı',
    'paça kısaltma Belek', 'paça kısaltma Lara', 'paça kısaltma Kemer', 'paça kısaltma Alanya',
    'pantolon tadilat Antalya', 'hızlı paça kısaltma Antalya', '24 saat paça kısaltma',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Paça Kısaltma Antalya · Kot Paça ₺150 · 24 Saatte Teslim',
    description: "Kot paça ₺150, kumaş pantolon ₺175. Eve ve otele gelen terzi. Tüm Antalya ilçeleri. ☎ +90 531 898 64 18",
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const FIYATLAR = [
  ['Kot Paça Kısaltma', '₺150', '24 saat', 'Orijinal dikiş tekniği'],
  ['Kumaş Pantolon Paça', '₺175', '24 saat', 'Düz veya katlı'],
  ['Eşofman / Spor Paça', '₺150', '24 saat', 'Lastikli veya düz'],
  ['Yazlık / Keten Pantolon', '₺175', '24 saat', 'İnce kumaş uzmanı'],
  ['Deri Pantolon Paça', '₺250', '48 saat', 'Özel deri işlem'],
  ['Kadife Pantolon Paça', '₺200', '48 saat', 'Hassas kumaş'],
  ['Tulum / Tulum Paça', '₺175', '24 saat', 'Her model'],
  ['Geniş Paça → Dar Paça', '₺200', '48 saat', 'Şekil değişikliği'],
  ['Araçlı Servis Ücreti', 'ÜCRETSIZ', '—', 'Tüm Antalya'],
];

const ILCELER = [
  { ad: 'Konyaaltı', sure: 'Merkez', detay: 'Hurma, Sarısu, Uncalı, Arapsuyu' },
  { ad: 'Muratpaşa', sure: '~10 dk', detay: 'Liman, Şirinyalı, Fener, Kaleiçi' },
  { ad: 'Kepez', sure: '~15 dk', detay: 'Varsak, Santral, Altındağ' },
  { ad: 'Lara', sure: '~20 dk', detay: 'Lara merkez, Kundu, Güzeloba' },
  { ad: 'Belek', sure: '~35 dk', detay: 'Tüm Belek otelleri — Rixos, Regnum, Kaya Palazzo' },
  { ad: 'Kemer', sure: '~45 dk', detay: 'Kemer merkez, Beldibi, Göynük, Tekirova' },
  { ad: 'Alanya', sure: '~90 dk', detay: 'Alanya merkez, Mahmutlar, Oba, Konaklı' },
  { ad: 'Manavgat / Side', sure: '~60 dk', detay: 'Side, Sorgun, Kumköy, Evrenseki' },
];

export default function PacaKisaltmaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: "'Jost',system-ui,sans-serif", background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        {/* BREADCRUMB */}
        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}
          <span>Paça Kısaltma Antalya</span>
        </nav>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4rem 1.5rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=70') center/cover", opacity: .08 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              ✂️ Terzi Can · Antalya · Paça Kısaltma Uzmanı
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Paça Kısaltma Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Fiyatları 2026 — Kot Paça ₺150</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#fff' }}>24 saatte teslim</strong> · Kot paça ₺150, kumaş pantolon ₺175 · Araçlı terzi servisi ücretsiz ·
              Tüm Antalya ilçelerine geliyoruz — Belek, Lara, Kemer, Alanya dahil.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <a href={WA('Merhaba, paça kısaltma için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                💬 Fotoğraf Gönder → Fiyat Al
              </a>
              <a href={`tel:+905318986418`}
                style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '.9rem 1.6rem', textDecoration: 'none', fontSize: '.85rem' }}>
                📞 {PHONE}
              </a>
            </div>
            {/* Hızlı fiyat göstergesi */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', maxWidth: '700px' }}>
              {[['Kot Paça','₺150','24s'],['Kumaş Pantolon','₺175','24s'],['Eşofman','₺150','24s'],['Deri Pantolon','₺250','48s']].map(([n,p,s])=>(
                <div key={n} style={{ background: 'rgba(255,255,255,.04)', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.5)', marginBottom: '.3rem' }}>{n}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.4rem', color: '#D4B07A', fontWeight: 700 }}>{p}</div>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.4)', marginTop: '.2rem' }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FİYAT TABLOSU — EN KRİTİK SEO BLOĞU */}
        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Paça Kısaltma Fiyat Listesi 2026
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '1.8rem' }}>
              Antalya'da paça kısaltma başlangıç fiyatları — kesin fiyat için WhatsApp'tan kıyafetinizin fotoğrafını gönderin.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Paça Kısaltma Türü', 'Fiyat', 'Süre', 'Not'].map(h => (
                    <th key={h} style={{ padding: '.7rem .8rem', textAlign: h === 'Paça Kısaltma Türü' ? 'left' : 'center', fontSize: '.68rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIYATLAR.map(([tip, fiyat, sure, not], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i % 2 ? 'rgba(184,151,90,.025)' : '#fff' }}>
                    <td style={{ padding: '.9rem .8rem', fontSize: '.88rem', fontWeight: i === FIYATLAR.length-1 ? 600 : 400 }}>{tip}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: fiyat === 'ÜCRETSIZ' ? '#22c55e' : '#8A6E3E', fontWeight: 700, fontSize: '.92rem' }}>{fiyat}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: '#7A6E62', fontSize: '.8rem' }}>{sure}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: '#7A6E62', fontSize: '.76rem' }}>{not}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.5rem', background: '#F2EDE4', borderLeft: '3px solid #B8975A', fontSize: '.84rem', color: '#5A4E42', lineHeight: 1.7 }}>
              💡 <strong>Not:</strong> Fiyatlar başlangıç fiyatıdır. Kumaş cinsi, model ve işlem sayısına göre değişebilir.
              WhatsApp'tan kıyafetinizin fotoğrafını gönderin, 30 dakika içinde kesin fiyat bildiririz.
            </div>
          </div>
        </section>

        {/* NEDEN BİZİ SEÇMELİSİNİZ */}
        <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>
              Antalya'nın En Hızlı Paça Kısaltma Servisi
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
              {[
                ['⚡','24 Saat Teslim','Normal şartlarda 24 saat, acil durumlarda aynı gün. Tatildeyseniz beklemenize gerek yok.'],
                ['🚗','Ücretsiz Araçlı Servis','Eve veya otele geliyor, ölçü alıyor, dikip teslim ediyoruz. Tüm Antalya ilçeleri.'],
                ['✂️','Orijinal Dikiş','Kot pantolonlarda orijinal paça dikişi tekniği — marka etiketi korunur.'],
                ['💰','Şeffaf Fiyat','Fiyatlar önceden bildirilir, sürpriz ücret yok. Rekabetçi, adil fiyatlandırma.'],
                ['🌍','4 Dil','Türkçe, İngilizce, Rusça, Almanca hizmet. Turistler için ideal.'],
                ['⭐','4.9 Puan','Google\'da 94 değerlendirme ile Antalya\'nın en çok tercih edilen terzisi.'],
              ].map(([ic, t, d]) => (
                <div key={t as string} style={{ background: '#fff', padding: '1.4rem', borderRadius: '2px', borderTop: '2px solid rgba(184,151,90,.3)' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '.6rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#1C1814', marginBottom: '.4rem', fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PANTALon KURTARMA — unique içerik */}
        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>
              Paça Kısaltma Hakkında Her Şey
            </h2>
            <div style={{ fontSize: '.9rem', color: '#5A4E42', lineHeight: 1.95 }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Paça kısaltma</strong> (pantolon boyu kısaltma), pantolonun bacak boyu uzunluğunun kişinin boyuna
                uyacak şekilde kısaltılması işlemidir. Terzi Can olarak Antalya'da <strong>kot paça kısaltmayı ₺150'den</strong>,
                kumaş pantolon paça kısaltmayı ise <strong>₺175'ten</strong> başlayan fiyatlarla sunuyoruz.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Kot paça kısaltmada</strong> orijinal dikiş tekniğini kullanıyoruz — yani pantolonun alt kısmındaki
                orjinal dikiş korunarak üstten kısaltma yapılır. Bu sayede marka etiketi ve orijinal görünüm bozulmaz.
                Levi's, Mavi, Diesel gibi markaların orijinal paça dikişini de yeniden yapabiliyoruz.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Kumaş pantolon paça kısaltmada</strong> kumaş tipine göre düz, katlı veya körüklü paça seçenekleri
                sunulmaktadır. Takım elbise pantolonu için özellikle köşeli paça dikişi tercih edilmekte, bu da daha profesyonel
                bir görünüm sağlamaktadır.
              </p>
              <p>
                <strong>Eşofman ve spor pantolon paça kısaltmada</strong> orijinal lastik seçeneği korunabilir ya da düz paça
                yapılabilir. İnce jersey kumaşlarda overlok işlemi ile sağlam bir dikiş garantilenmektedir.
              </p>
            </div>
          </div>
        </section>

        {/* HİZMET ALANLARI */}
        <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Paça Kısaltma Hizmet Bölgeleri — Tüm Antalya
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>Konyaaltı merkezimizden tüm Antalya ilçelerine ücretsiz araçlı servis</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '.8rem' }}>
              {ILCELER.map(({ ad, sure, detay }) => (
                <div key={ad} style={{ background: '#fff', border: '1px solid rgba(184,151,90,.15)', borderLeft: '3px solid #B8975A', padding: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}>
                    <strong style={{ fontFamily: 'Georgia,serif', color: '#1C1814' }}>📍 {ad}</strong>
                    <span style={{ fontSize: '.7rem', color: '#B8975A', fontWeight: 600 }}>{sure}</span>
                  </div>
                  <p style={{ fontSize: '.76rem', color: '#7A6E62', lineHeight: 1.5 }}>{detay}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>
              Paça Kısaltma Sık Sorulan Sorular
            </h2>
            {[
              ['Antalya paça kısaltma fiyatı 2026 ne kadar?', "Kot paça kısaltma ₺150, kumaş pantolon ₺175, deri pantolon ₺250'den başlar. Araçlı servis ücretsizdir."],
              ['Paça kısaltma kaç saatte tamamlanır?', 'Standart işlemlerde 24 saat, acil durumlarda aynı gün teslim yapılmaktadır. WhatsApp\'tan talep edin.'],
              ['Eve gelen paça kısaltma Antalya var mı?', 'Evet! Araçlı terzi servisimizle Antalya\'nın tüm ilçelerine ücretsiz olarak geliyoruz. Belek, Lara, Kemer, Alanya dahil.'],
              ['Kot paça orijinal dikiş tekniğiyle mi kısaltılıyor?', 'Evet. Levi\'s, Mavi ve diğer markalarda orijinal zincir dikiş veya çift dikiş tekniği kullanılmaktadır.'],
              ['Eşofman paça kısaltma kaç lira?', "Eşofman ve spor pantolon paça kısaltma ₺150'dir. Lastikli veya düz paça seçeneği mevcuttur."],
              ['Birden fazla pantolon için indirim var mı?', '3 veya daha fazla pantolon için toplu sipariş indirimi uygulanmaktadır. WhatsApp\'tan sorun.'],
              ['Pantolon paça kısaltma ile pantolon daraltma farkı nedir?', 'Paça kısaltma pantolonun boyunu kısaltır. Pantolon daraltma ise bacak genişliğini azaltır. İkisi ayrı işlemdir.'],
            ].map(([q, a], i) => (
              <details key={i} style={{ borderBottom: '1px solid rgba(184,151,90,.1)', padding: '.8rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.92rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#B8975A' }}>+</span>
                </summary>
                <p style={{ marginTop: '.7rem', fontSize: '.84rem', color: '#7A6E62', lineHeight: 1.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#B8975A', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.7rem' }}>
            Paça Kısaltma Fiyatı Öğrenin
          </h2>
          <p style={{ color: 'rgba(255,255,255,.9)', marginBottom: '1.8rem', fontSize: '.92rem' }}>
            Fotoğraf gönderin — 30 dakika içinde fiyat · 24 saatte teslim · Araçlı servis ücretsiz
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, paça kısaltma için fiyat almak istiyorum. Pantolonumun fotoğrafını göndereyim mi?')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Fotoğraf Gönder
            </a>
            <a href={`tel:+905318986418`}
              style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '.76rem', color: 'rgba(255,255,255,.75)' }}>
            ⭐ 4.9 · 94 değerlendirme · 09:00–19:00 · Pzt–Cmt · Tüm Antalya
          </p>
        </section>

        {/* İLGİLİ SAYFALAR */}
        <section style={{ padding: '2rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>
              Diğer Terzi Hizmetleri
            </p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[
                ['Fermuar Değişimi Antalya', '/terzi/fermuar-degisimi-antalya'],
                ['Kuru Temizleme Antalya', '/terzi/kuru-temizleme-antalya'],
                ['Elbise Dikimi Antalya', '/terzi/elbise-dikimi-antalya'],
                ['Eve Gelen Terzi', '/terzi/eve-gelen-terzi-antalya'],
                ['Üniforma Dikimi Antalya', '/terzi/uniforma-uretimi-antalya'],
                ['← Tüm Hizmetler', '/terzi'],
              ].map(([l, h]) => (
                <Link key={l} href={h}
                  style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>
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
