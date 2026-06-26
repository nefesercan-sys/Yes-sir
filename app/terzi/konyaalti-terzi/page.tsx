import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/konyaalti-terzi';
const MAPS_URL = 'https://maps.app.goo.gl/CNZghczJNRQX3mLM9';
const PHONE = '+90 531 898 64 18';
const WA_URL = `https://wa.me/+905318986418?text=${encodeURIComponent('Merhaba, Konyaaltı mahallesinde terzi hizmetiniz hakkında bilgi almak istiyorum.')}`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can — Konyaaltı Konyaaltı Antalya',
      alternateName: ['Konyaaltı Terzi', 'Konyaaltı Konyaaltı Terzi', 'Terzi Can Konyaaltı'],
      description: 'Konyaaltı mahallesi ve çevresine profesyonel araçlı terzi servisi. Paça kısaltma ₺150, fermuar değişimi ₺120, elbise dikimi, bel daraltma, kuru temizleme. Eve gelen terzi Konyaaltı.',
      url: SITE_URL,
      telephone: '+905318986418',
      priceRange: '₺₺',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı Mahallesi',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      hasMap: MAPS_URL,
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00',
        closes: '19:00',
      }],
      areaServed: [
        { '@type': 'City', name: 'Konyaaltı' },
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'Place', name: 'Hurma Mahallesi, Konyaaltı, Antalya' },
        { '@type': 'Place', name: 'Liman Mahallesi, Konyaaltı, Antalya' },
        { '@type': 'Place', name: 'Sarısu Mahallesi, Konyaaltı, Antalya' },
        { '@type': 'Place', name: 'Uncalı Mahallesi, Konyaaltı, Antalya' },
        { '@type': 'Place', name: 'Gürsu Mahallesi, Konyaaltı, Antalya' },
        { '@type': 'Place', name: 'Meltem Mahallesi, Konyaaltı, Antalya' },
        { '@type': 'Place', name: 'Çakırlar Mahallesi, Konyaaltı, Antalya' },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
        itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can', '@id': `${SITE_URL}#business` },
      },
      sameAs: [MAPS_URL, 'https://wa.me/905318986418', 'https://swaphubs.com/terzi'],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Terzi Can Konyaaltı — Paça Kısaltma, Fermuar, Elbise Dikimi Antalya 2026',
      url: SITE_URL,
      isPartOf: { '@id': 'https://swaphubs.com#website' },
      description: 'Konyaaltı mahallesi terzi: paça kısaltma ₺150, fermuar ₺120, elbise dikimi, bel daraltma. Araçlı servis. ☎ +90 531 898 64 18',
      inLanguage: 'tr',
      dateModified: new Date().toISOString().split('T')[0],
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: 'https://swaphubs.com' },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi', item: 'https://swaphubs.com/terzi' },
        { '@type': 'ListItem', position: 3, name: 'Konyaaltı Terzi', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        { '@type':'Question', name:'Konyaaltı paça kısaltma fiyatı 2026?', acceptedAnswer:{ '@type':'Answer', text:'Paça kısaltma Konyaaltı mahallesinde ₺150\'den başlar. Kot paça ₺150, kumaş pantolon ₺175. Konyaaltı adresinize araçlı servis. WhatsApp: +90 531 898 64 18' } },
{ '@type':'Question', name:'Konyaaltı fermuar değişimi fiyatı?', acceptedAnswer:{ '@type':'Answer', text:'Pantolon/kot fermuarı ₺120, ceket ₺200, mont ₺300. Aynı gün teslim. Konyaaltı bölgesine geliyoruz. WhatsApp: +90 531 898 64 18' } },
{ '@type':'Question', name:'Konyaaltı eve gelen terzi var mı?', acceptedAnswer:{ '@type':'Answer', text:'Evet! Araçlı terzi servisimizle Konyaaltı adresinize geliyor, yerinde ölçü alıyor, dikip teslim ediyoruz. WhatsApp: +90 531 898 64 18' } },
{ '@type':'Question', name:'Konyaaltı elbise dikimi ve bel daraltma fiyatı?', acceptedAnswer:{ '@type':'Answer', text:'Kadın elbise dikimi ₺600, bel daraltma ₺200\'den başlar. Konyaaltı ve çevre mahallelerine servis. WhatsApp: +90 531 898 64 18' } },
{ '@type':'Question', name:'Konyaaltı kuru temizleme ve ütü hizmeti?', acceptedAnswer:{ '@type':'Answer', text:'Kuru temizleme ₺300, çamaşır ₺80/kg. Konyaaltı adresinden kurye alım. 24 saat ekspres. WhatsApp: +90 531 898 64 18' } },
      ],
    },
  ],
};

export const metadata = {
  metadataBase: new URL('https://swaphubs.com'),
  title: 'Terzi Can Konyaaltı — Paça Kısaltma, Fermuar, Elbise Dikimi Konyaaltı Antalya 2026',
  description: 'Konyaaltı mahallesi terzi: paça kısaltma ₺150, fermuar değişimi ₺120, bel daraltma, elbise dikimi. Araçlı servis, eve gelen terzi. ☎ +90 531 898 64 18',
  keywords: [
    'Konyaaltı terzi','Konyaaltı mahallesi terzi','Konyaaltı paça kısaltma','Konyaaltı elbise dikimi','Konyaaltı fermuar değişimi','Konyaaltı bel daraltma','Konyaaltı Konyaaltı terzi','Antalya Konyaaltı terzi','Konyaaltı merkez terzi','Konyaaltı elbise dikimi','Konyaaltı bayan terzi'
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Terzi Can Konyaaltı — Paça Kısaltma, Fermuar, Elbise Dikimi',
    description: 'Konyaaltı mahallesi terzi: paça kısaltma ₺150, fermuar ₺120, elbise dikimi. Araçlı servis. ☎ +90 531 898 64 18',
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/og/terzi-can.jpg', width: 1200, height: 630, alt: 'Terzi Can Konyaaltı Antalya' }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056',
    ICBM: '36.8841, 30.7056',
  },
};

export default function KonyaaltiTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:'#FAF7F2', color:'#3A3028', minHeight:'100vh' }}>

        {/* Breadcrumb */}
        <nav style={{ padding:'.8rem 1.5rem', fontSize:'.75rem', color:'#7A6E62', background:'#F2EDE4', borderBottom:'1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color:'#B8975A', textDecoration:'none' }}>SwapHubs</Link>
          {' › '}<Link href="/terzi" style={{ color:'#B8975A', textDecoration:'none' }}>Antalya Terzi</Link>
          {' › '}<Link href="/terzi/konyaalti-terzi" style={{ color:'#B8975A', textDecoration:'none' }}>Konyaaltı Terzi</Link>
          {' › '}<span>Konyaaltı Terzi</span>
        </nav>

        {/* Hero */}
        <section style={{ background:'linear-gradient(135deg,#1C1814,#2E2820)', padding:'4rem 1.5rem 3.5rem', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, background:"url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=70') center/cover", opacity:.1 }} />
          <div style={{ maxWidth:'860px', margin:'0 auto', position:'relative' }}>
            <div style={{ fontSize:'.68rem', letterSpacing:'.28em', textTransform:'uppercase', color:'#D4B07A', marginBottom:'1rem' }}>
              📍 Terzi Can · Konyaaltı · Konyaaltı Mahallesi
            </div>
            <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.9rem,5vw,3rem)', fontWeight:700, color:'#fff', lineHeight:1.1, marginBottom:'1rem' }}>
              Konyaaltı Terzi<br/>
              <span style={{ color:'#D4B07A', fontStyle:'italic', fontSize:'80%' }}>Paça Kısaltma · Fermuar · Elbise Dikimi · Bel Daraltma</span>
            </h1>
            <p style={{ color:'rgba(255,255,255,.8)', fontSize:'.92rem', lineHeight:1.85, maxWidth:'560px', marginBottom:'1.5rem' }}>
              <strong style={{ color:'#D4B07A' }}>Paça kısaltma ₺150</strong> ·
              <strong style={{ color:'#D4B07A' }}> Fermuar ₺120</strong> ·
              <strong style={{ color:'#fff' }}> Aynı gün teslim</strong> ·
              Konyaaltı adresinize araçlı terzi servisi.
            </p>

            {/* Fiyat kutuları */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))', gap:'1px', background:'rgba(255,255,255,.06)', maxWidth:'600px', marginBottom:'1.5rem' }}>
              {[['Paça Kısaltma','₺150+'],['Fermuar','₺120+'],['Bel Daraltma','₺200+'],['Elbise Dikimi','₺600+'],['Kuru Temizleme','₺300+']].map(([n,p]) => (
                <div key={n} style={{ background:'rgba(255,255,255,.04)', padding:'.7rem .5rem', textAlign:'center' }}>
                  <div style={{ fontSize:'.6rem', color:'rgba(255,255,255,.5)', marginBottom:'.2rem' }}>{n}</div>
                  <div style={{ fontFamily:'Georgia,serif', fontSize:'1rem', color:'#D4B07A', fontWeight:700 }}>{p}</div>
                </div>
              ))}
            </div>

            <div style={{ display:'flex', gap:'.8rem', flexWrap:'wrap' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                style={{ background:'#25d366', color:'#fff', padding:'.9rem 1.8rem', fontWeight:700, textDecoration:'none', fontSize:'.82rem', letterSpacing:'.06em', textTransform:'uppercase', borderRadius:'3px' }}>
                💬 WhatsApp — Randevu Al
              </a>
              <a href="tel:+905318986418"
                style={{ border:'1px solid rgba(255,255,255,.3)', color:'#fff', padding:'.9rem 1.4rem', textDecoration:'none', fontSize:'.82rem', borderRadius:'3px' }}>
                📞 {PHONE}
              </a>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                style={{ border:'1px solid rgba(184,151,90,.4)', color:'#D4B07A', padding:'.9rem 1.4rem', textDecoration:'none', fontSize:'.82rem', borderRadius:'3px' }}>
                🗺️ Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Yakın mahalleler */}
        <section style={{ background:'#fff', padding:'1.2rem 1.5rem', borderBottom:'1px solid rgba(184,151,90,.1)' }}>
          <div style={{ maxWidth:'860px', margin:'0 auto' }}>
            <p style={{ fontSize:'.68rem', letterSpacing:'.18em', textTransform:'uppercase', color:'#B8975A', marginBottom:'.7rem' }}>
              Hizmet Verilen Mahalle ve Bölgeler
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
              <span key="Hurma" style={fontSize:".75rem",color:"#7A6E62",border:"1px solid rgba(184,151,90,.15)",padding:".2rem .65rem",borderRadius:"2px"}>Hurma</span>
              <span key="Liman" style={fontSize:".75rem",color:"#7A6E62",border:"1px solid rgba(184,151,90,.15)",padding:".2rem .65rem",borderRadius:"2px"}>Liman</span>
              <span key="Sarısu" style={fontSize:".75rem",color:"#7A6E62",border:"1px solid rgba(184,151,90,.15)",padding:".2rem .65rem",borderRadius:"2px"}>Sarısu</span>
              <span key="Uncalı" style={fontSize:".75rem",color:"#7A6E62",border:"1px solid rgba(184,151,90,.15)",padding:".2rem .65rem",borderRadius:"2px"}>Uncalı</span>
              <span key="Gürsu" style={fontSize:".75rem",color:"#7A6E62",border:"1px solid rgba(184,151,90,.15)",padding:".2rem .65rem",borderRadius:"2px"}>Gürsu</span>
              <span key="Meltem" style={fontSize:".75rem",color:"#7A6E62",border:"1px solid rgba(184,151,90,.15)",padding:".2rem .65rem",borderRadius:"2px"}>Meltem</span>
              <span key="Çakırlar" style={fontSize:".75rem",color:"#7A6E62",border:"1px solid rgba(184,151,90,.15)",padding:".2rem .65rem",borderRadius:"2px"}>Çakırlar</span>
            </div>
          </div>
        </section>

        {/* Fiyat tablosu */}
        <section style={{ background:'#F7F3ED', padding:'3rem 1.5rem' }}>
          <div style={{ maxWidth:'820px', margin:'0 auto' }}>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'1.75rem', color:'#1C1814', marginBottom:'.4rem' }}>
              Konyaaltı Terzi Fiyat Listesi 2026
            </h2>
            <p style={{ color:'#7A6E62', fontSize:'.84rem', marginBottom:'1.5rem' }}>
              Başlangıç fiyatları. Kesin teklif için WhatsApp'tan fotoğraf gönderin — 30 dakika içinde yanıt.
            </p>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'340px' }}>
                <thead>
                  <tr style={{ borderBottom:'2px solid rgba(184,151,90,.2)' }}>
                    <th style={{ padding:'.6rem .8rem', textAlign:'left', fontSize:'.65rem', letterSpacing:'.18em', textTransform:'uppercase', color:'#B8975A', fontWeight:500 }}>Hizmet</th>
                    <th style={{ padding:'.6rem .8rem', textAlign:'right', fontSize:'.65rem', letterSpacing:'.18em', textTransform:'uppercase', color:'#B8975A', fontWeight:500 }}>Fiyat</th>
                    <th style={{ padding:'.6rem .8rem', textAlign:'right', fontSize:'.65rem', letterSpacing:'.18em', textTransform:'uppercase', color:'#B8975A', fontWeight:500 }}>Süre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key="0" style={background:"#fff"}><td style={padding:".75rem .8rem",fontSize:".86rem"}>Paça / Pantolon / Etek Kısaltma</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#8A6E3E",fontWeight:700}>₺150+</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#7A6E62",fontSize:".78rem"}>24 saat</td></tr>
                <tr key="1" style={background:"rgba(184,151,90,.03)"}><td style={padding:".75rem .8rem",fontSize:".86rem"}>Fermuar — Pantolon / Kot</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#8A6E3E",fontWeight:700}>₺120+</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#7A6E62",fontSize:".78rem"}>Aynı gün</td></tr>
                <tr key="2" style={background:"#fff"}><td style={padding:".75rem .8rem",fontSize:".86rem"}>Fermuar — Mont / Kaban</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#8A6E3E",fontWeight:700}>₺300+</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#7A6E62",fontSize:".78rem"}>24 saat</td></tr>
                <tr key="3" style={background:"rgba(184,151,90,.03)"}><td style={padding:".75rem .8rem",fontSize:".86rem"}>Bel Daraltma / Elbise Daraltma</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#8A6E3E",fontWeight:700}>₺200+</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#7A6E62",fontSize:".78rem"}>48 saat</td></tr>
                <tr key="4" style={background:"#fff"}><td style={padding:".75rem .8rem",fontSize:".86rem"}>Kol Kısaltma</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#8A6E3E",fontWeight:700}>₺200+</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#7A6E62",fontSize:".78rem"}>48 saat</td></tr>
                <tr key="5" style={background:"rgba(184,151,90,.03)"}><td style={padding:".75rem .8rem",fontSize:".86rem"}>Yırtık Onarımı</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#8A6E3E",fontWeight:700}>₺100+</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#7A6E62",fontSize:".78rem"}>Aynı gün</td></tr>
                <tr key="6" style={background:"#fff"}><td style={padding:".75rem .8rem",fontSize:".86rem"}>Erkek Takım Elbise Dikimi</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#8A6E3E",fontWeight:700}>₺2.500+</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#7A6E62",fontSize:".78rem"}>5-7 gün</td></tr>
                <tr key="7" style={background:"rgba(184,151,90,.03)"}><td style={padding:".75rem .8rem",fontSize:".86rem"}>Kadın Elbise Dikimi</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#8A6E3E",fontWeight:700}>₺600+</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#7A6E62",fontSize:".78rem"}>3-7 gün</td></tr>
                <tr key="8" style={background:"#fff"}><td style={padding:".75rem .8rem",fontSize:".86rem"}>Gelinlik Tadilatı</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#8A6E3E",fontWeight:700}>₺500+</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#7A6E62",fontSize:".78rem"}>3-5 gün</td></tr>
                <tr key="9" style={background:"rgba(184,151,90,.03)"}><td style={padding:".75rem .8rem",fontSize:".86rem"}>Kuru Temizleme (Elbise)</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#8A6E3E",fontWeight:700}>₺300+</td><td style={padding:".75rem .8rem",textAlign:"right",color:"#7A6E62",fontSize:".78rem"}>48 saat</td></tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop:'1.5rem', textAlign:'center' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                style={{ background:'#B8975A', color:'#fff', padding:'.85rem 2rem', textDecoration:'none', fontSize:'.82rem', fontWeight:700, borderRadius:'3px', display:'inline-block' }}>
                📲 Ücretsiz Fiyat Teklifi Al
              </a>
            </div>
          </div>
        </section>

        {/* Hizmet açıklaması */}
        <section style={{ background:'#fff', padding:'3rem 1.5rem' }}>
          <div style={{ maxWidth:'820px', margin:'0 auto' }}>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'1.7rem', color:'#1C1814', marginBottom:'1rem' }}>
              Konyaaltı Mahallesi Terzi Can Hizmetleri
            </h2>
            <div style={{ fontSize:'.88rem', color:'#5A4E42', lineHeight:2 }}>
              <p style={{ marginBottom:'1rem' }}>
                <strong>Terzi Can</strong> olarak Antalya Konyaaltı'nın <strong>Konyaaltı</strong> mahallesine
                ve çevresine araçlı terzi servisi sunuyoruz.
                <strong> Paça kısaltma ₺150</strong>'den, <strong>fermuar değişimi ₺120</strong>'den,
                <strong> bel daraltma ₺200</strong>'den başlar. Aynı gün teslim mümkündür.
              </p>
              <p style={{ marginBottom:'1rem' }}>
                <strong>Bay terzi</strong>: Erkek takım elbise dikimi, pantolon kısaltma, gömlek, ceket tadilatı, kol kısaltma, bel daraltma.
                <strong> Bayan terzi</strong>: Kadın elbise dikimi, bluz, etek kısaltma, elbise daraltma, bel daraltma, abiye tamiri, gelinlik tadilatı.
              </p>
              <p style={{ marginBottom:'1rem' }}>
                <strong>Tişört, sweatshirt, pantolon, şort</strong> seri imalatı da yapılmaktadır.
                <strong> Nakış ve logo baskı</strong> hizmetimiz mevcuttur.
              </p>
              <p>
                <strong>Konyaaltı</strong> adresinize geliyor, <strong>yerinde ölçü alıyor</strong>,
                atölyemizde dikip tekrar kapınıza teslim ediyoruz.
                Kuru temizleme ve ütü için de kurye alım hizmetimiz bulunmaktadır.
              </p>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section style={{ background:'#F2EDE4', padding:'3rem 1.5rem' }}>
          <div style={{ maxWidth:'760px', margin:'0 auto' }}>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:'1.7rem', color:'#1C1814', marginBottom:'1.5rem' }}>
              Konyaaltı Terzi — Sık Sorulan Sorular
            </h2>
            <details style={borderBottom:"1px solid rgba(184,151,90,.1)",padding:".8rem 0"}>
          <summary style={cursor:"pointer",fontSize:".9rem",fontWeight:500,color:"#1C1814",listStyle:"none",display:"flex",justifyContent:"space-between"}>
            Konyaaltı paça kısaltma fiyatı 2026? <span style={color:"#B8975A"}>+</span>
          </summary>
          <p style={marginTop:".6rem",fontSize:".83rem",color:"#7A6E62",lineHeight:1.85}>Paça kısaltma Konyaaltı mahallesinde ₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175. Konyaaltı adresinize araçlı servis. WhatsApp: +90 531 898 64 18</p>
        </details>
        <details style={borderBottom:"1px solid rgba(184,151,90,.1)",padding:".8rem 0"}>
          <summary style={cursor:"pointer",fontSize:".9rem",fontWeight:500,color:"#1C1814",listStyle:"none",display:"flex",justifyContent:"space-between"}>
            Konyaaltı fermuar değişimi fiyatı? <span style={color:"#B8975A"}>+</span>
          </summary>
          <p style={marginTop:".6rem",fontSize:".83rem",color:"#7A6E62",lineHeight:1.85}>Pantolon/kot fermuarı ₺120, ceket ₺200, mont ₺300. Aynı gün teslim. Konyaaltı bölgesine geliyoruz. WhatsApp: +90 531 898 64 18</p>
        </details>
        <details style={borderBottom:"1px solid rgba(184,151,90,.1)",padding:".8rem 0"}>
          <summary style={cursor:"pointer",fontSize:".9rem",fontWeight:500,color:"#1C1814",listStyle:"none",display:"flex",justifyContent:"space-between"}>
            Konyaaltı eve gelen terzi var mı? <span style={color:"#B8975A"}>+</span>
          </summary>
          <p style={marginTop:".6rem",fontSize:".83rem",color:"#7A6E62",lineHeight:1.85}>Evet! Araçlı terzi servisimizle Konyaaltı adresinize geliyor, yerinde ölçü alıyor, dikip teslim ediyoruz. WhatsApp: +90 531 898 64 18</p>
        </details>
        <details style={borderBottom:"1px solid rgba(184,151,90,.1)",padding:".8rem 0"}>
          <summary style={cursor:"pointer",fontSize:".9rem",fontWeight:500,color:"#1C1814",listStyle:"none",display:"flex",justifyContent:"space-between"}>
            Konyaaltı elbise dikimi ve bel daraltma fiyatı? <span style={color:"#B8975A"}>+</span>
          </summary>
          <p style={marginTop:".6rem",fontSize:".83rem",color:"#7A6E62",lineHeight:1.85}>Kadın elbise dikimi ₺600, bel daraltma ₺200'den başlar. Konyaaltı ve çevre mahallelerine servis. WhatsApp: +90 531 898 64 18</p>
        </details>
        <details style={borderBottom:"1px solid rgba(184,151,90,.1)",padding:".8rem 0"}>
          <summary style={cursor:"pointer",fontSize:".9rem",fontWeight:500,color:"#1C1814",listStyle:"none",display:"flex",justifyContent:"space-between"}>
            Konyaaltı kuru temizleme ve ütü hizmeti? <span style={color:"#B8975A"}>+</span>
          </summary>
          <p style={marginTop:".6rem",fontSize:".83rem",color:"#7A6E62",lineHeight:1.85}>Kuru temizleme ₺300, çamaşır ₺80/kg. Konyaaltı adresinden kurye alım. 24 saat ekspres. WhatsApp: +90 531 898 64 18</p>
        </details>
          </div>
        </section>

        {/* Google Maps + NAP — Business lokasyonu */}
        <section style={{ background:'#1C1814' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12742.017!2d30.6946!3d36.8769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3914a3f49b36b%3A0xe9e87c5c9a6b2700!2sKonyaalti%2C%20Antalya!5e0!3m2!1str!2str!4v1720000000000"
            width="100%"
            height="260"
            style={{ border:0, display:'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Terzi Can Konyaaltı Konyaaltı Antalya"
            aria-label="Terzi Can Konyaaltı mahallesi konumu"
          />
          <div style={{ padding:'1.2rem 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
            <address style={{ fontStyle:'normal', fontSize:'.83rem', color:'rgba(255,255,255,.75)', lineHeight:1.9 }}>
              <strong style={{ color:'#fff', display:'block', marginBottom:'.2rem' }}>
                Terzi Can — Konyaaltı, Konyaaltı / Antalya
              </strong>
              📞 <a href="tel:+905318986418" style={{ color:'#D4B07A', textDecoration:'none' }}>{PHONE}</a><br/>
              💬 <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ color:'#D4B07A', textDecoration:'none' }}>WhatsApp ile Ulaşın</a><br/>
              🕐 Pzt–Cmt 09:00–19:00<br/>
              📍 Konyaaltı Mahallesi, Konyaaltı, Antalya 07070
            </address>
            <div style={{ display:'flex', flexDirection:'column', gap:'.6rem' }}>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                style={{ background:'#B8975A', color:'#fff', padding:'.75rem 1.4rem', textDecoration:'none', fontSize:'.8rem', fontWeight:700, borderRadius:'3px', textAlign:'center' }}>
                🗺️ Google Maps'te Gör
              </a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                style={{ background:'#25d366', color:'#fff', padding:'.75rem 1.4rem', textDecoration:'none', fontSize:'.8rem', fontWeight:700, borderRadius:'3px', textAlign:'center' }}>
                💬 WhatsApp Randevu
              </a>
            </div>
          </div>
        </section>

        {/* İç linkler — diğer mahalleler */}
        <section style={{ background:'#F2EDE4', padding:'2rem 1.5rem' }}>
          <div style={{ maxWidth:'860px', margin:'0 auto' }}>
            <p style={{ fontSize:'.68rem', letterSpacing:'.18em', textTransform:'uppercase', color:'#B8975A', marginBottom:'.8rem' }}>
              Diğer Mahalle ve Hizmet Sayfaları
            </p>
            <div style={{ display:'flex', gap:'.4rem', flexWrap:'wrap' }}>
              {[
                ['← Tüm Antalya Terzi','/terzi'],
                ['Konyaaltı Terzi','/terzi/konyaalti-terzi'],
                ['Hurma Terzi','/terzi/hurma-terzi'],
                ['Liman Terzi','/terzi/liman-terzi'],
                ['Sarısu Terzi','/terzi/sarisu-terzi'],
                ['Uncalı Terzi','/terzi/uncali-terzi'],
                ['Gürsu Terzi','/terzi/gursu-terzi'],
                ['Meltem Terzi','/terzi/meltem-terzi'],
                ['Çakırlar Terzi','/terzi/cakirlar-terzi'],
                ['Öğretmenevi Terzi','/terzi/ogretmenevleri-terzi'],
                ['Paça Kısaltma','/terzi/paca-kisaltma-antalya'],
                ['Fermuar Değişimi','/terzi/fermuar-degisimi-antalya'],
                ['Eve Gelen Terzi','/terzi/eve-gelen-terzi-antalya'],
                ['Gelinlik Tadilatı','/terzi/gelinlik-tadilati-antalya'],
              ].map(([label,href]) => (
                <Link key={href} href={href}
                  style={{ border:'1px solid rgba(184,151,90,.25)', color:'#8A6E3E', padding:'.3rem .8rem', textDecoration:'none', fontSize:'.74rem', borderRadius:'3px', background:'#fff' }}>
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
