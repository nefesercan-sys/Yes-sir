import type { Metadata } from 'next';

const SITE = 'https://swaphubs.com';
const PAGE_URL = `${SITE}/terzi-cagir`;
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const MAPS_URL = 'https://maps.app.goo.gl/CNZghczJNRQX3mLM9';
const WA_MSG = 'Merhaba, Konyaaltı bölgesinde terzi hizmetiniz için bilgi almak istiyorum.';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': `${PAGE_URL}#business`,
      name: 'Terzi Can — Antalya Konyaaltı',
      alternateName: [
        'Antalya Terzi', 'Konyaaltı Terzi', 'Terzi Çağır Antalya',
        'Eve Gelen Terzi Antalya', 'Tailor Antalya', 'Портной Анталья',
      ],
      description:
        'Antalya Konyaaltı terzi hizmeti. Paça kısaltma ₺150, fermuar ₺200, bel daraltma ₺150. Terzi çağır, terzi kapına gelsin. Hurma, Liman, Sarısu, Uncalı, Gürsu, Meltem, Çakırlar, Öğretmenevi mahallelerine araçlı servis.',
      url: PAGE_URL,
      telephone: PHONE_E164,
      priceRange: '₺₺',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hurma Mahallesi',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8851, longitude: 30.693 },
      hasMap: MAPS_URL,
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00', closes: '19:00',
      }],
      areaServed: [
        'Konyaaltı','Hurma','Liman','Sarısu','Uncalı','Gürsu',
        'Öğretmenevi','Meltem','Çakırlar','Antalya',
      ].map(n => ({ '@type': 'City', name: n })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9', reviewCount: '94',
        bestRating: '5', worstRating: '1',
        itemReviewed: { '@type': 'LocalBusiness', name: 'Terzi Can' },
      },
      sameAs: [MAPS_URL, `https://wa.me/${PHONE_E164.replace('+','')}`],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: PHONE_E164,
        contactType: 'customer service',
        availableLanguage: ['Turkish','English','Russian','German'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '09:00', closes: '19:00',
        },
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'Terzi Çağır Antalya — Kapınıza Gelen Terzi Servisi | Terzi Can',
      url: PAGE_URL,
      description: 'Antalya Konyaaltı terzi çağır servisi. Hemen ara veya WhatsApp yaz. Paça kısaltma ₺150. Terzimiz kapınıza gelir.',
      inLanguage: 'tr',
      isPartOf: { '@id': `${SITE}#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Terzi', item: `${SITE}/terzi` },
          { '@type': 'ListItem', position: 3, name: 'Terzi Çağır', item: PAGE_URL },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya\'da terzi çağırabilir miyim?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Terzi Can olarak Antalya Konyaaltı ve tüm ilçelerine araçlı terzi servisi sunuyoruz. Hemen arayın: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Paça kısaltma fiyatı ne kadar?',
          acceptedAnswer: { '@type': 'Answer', text: 'Paça kısaltma ₺150\'den başlar. Aynı gün teslim mümkündür.' },
        },
        {
          '@type': 'Question',
          name: 'Terzi ne zaman kapıma gelir?',
          acceptedAnswer: { '@type': 'Answer', text: 'Arayın veya WhatsApp yazın, aynı gün veya ertesi gün randevu alın. Terzimiz adresinize gelir, ölçü alır, 24 saat içinde teslim eder.' },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Terzi Çağır Antalya — Kapınıza Gelen Terzi | Terzi Can Konyaaltı',
  description:
    'Antalya Konyaaltı terzi çağır servisi. Paça kısaltma ₺150, bel daraltma ₺150, fermuar ₺200. Terzimiz kapınıza gelir, ölçü alır, 24 saatte teslim eder. Hemen ara: +90 531 898 64 18',
  keywords: [
    'terzi çağır Antalya', 'Antalya terzi', 'Konyaaltı terzi',
    'eve gelen terzi Antalya', 'kapıya gelen terzi',
    'paça kısaltma Antalya', 'Antalya terzi telefon',
    'Hurma terzi', 'Liman terzi', 'Uncalı terzi',
    'terzi servisi Antalya', 'adrese gelen terzi',
    'tailor Antalya', 'портной Анталья',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Terzi Çağır Antalya — Kapınıza Gelen Terzi | Terzi Can',
    description: 'Paça kısaltma ₺150. Terzimiz kapınıza gelir. Hemen ara: +90 531 898 64 18',
    url: PAGE_URL, siteName: 'SwapHubs', locale: 'tr_TR', type: 'website',
    images: [{ url: '/og/terzi-can.jpg', width: 1200, height: 630, alt: 'Terzi Can Antalya' }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8851;30.6930',
    ICBM: '36.8851, 30.6930',
  },
};

export default function TerziCagirPage() {
  const waUrl = `https://wa.me/${PHONE_E164.replace('+','')}?text=${encodeURIComponent(WA_MSG)}`;

  const FIYATLAR = [
    ['Paça Kısaltma', '₺150', 'Aynı gün'],
    ['Bel Daraltma', '₺150', '24 saat'],
    ['Etek Kısaltma', '₺150', 'Aynı gün'],
    ['Pantolon Paçası', '₺150', 'Aynı gün'],
    ['Fermuar Değişimi', '₺200', 'Aynı gün'],
    ['Fermuar Tamiri', '₺200', 'Aynı gün'],
    ['Ceket Tamiri', '₺200', '24 saat'],
    ['Mont Tamiri', '₺200', '24 saat'],
    ['Gömlek Tamiri', '₺150', 'Aynı gün'],
    ['T-Shirt Tamiri', '₺100', 'Aynı gün'],
    ['Elbise Tamiri', '₺150+', '24 saat'],
    ['Abiye Tamiri', '₺400', '48 saat'],
    ['Elbise Dikimi', '₺800+', '3–5 gün'],
  ];

  const MAHALLELER = [
    'Hurma','Liman','Sarısu','Uncalı','Gürsu',
    'Öğretmenevi','Meltem','Çakırlar','Konyaaltı Merkez',
    'Muratpaşa','Kepez','Lara','Belek','Kemer',
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{
        fontFamily: "'DM Sans',system-ui,sans-serif",
        background: '#0F1B1A',
        color: '#fff',
        minHeight: '100vh',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          html{scroll-behavior:smooth}
          :root{
            --gold:#D4A843;--gold2:#F0C060;--green:#25d366;
            --ink:#0F1B1A;--ink2:#1A2E2C;--ink3:#243432;
            --muted:rgba(255,255,255,.55);
          }
          /* Sticky üst bar */
          .sticky-bar{
            position:fixed;top:0;left:0;right:0;z-index:999;
            background:rgba(15,27,26,.97);
            backdrop-filter:blur(12px);
            border-bottom:1px solid rgba(212,168,67,.15);
            padding:.75rem 1.2rem;
            display:flex;align-items:center;justify-content:space-between;gap:.8rem;
          }
          .sticky-brand{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:700;color:#fff;letter-spacing:.02em}
          .sticky-brand span{color:var(--gold)}
          .sticky-btns{display:flex;gap:.5rem}
          .btn-call{
            display:inline-flex;align-items:center;gap:.4rem;
            background:var(--gold);color:#000;
            padding:.55rem 1rem;border-radius:4px;
            font-size:.78rem;font-weight:700;text-decoration:none;
            white-space:nowrap;transition:background .2s;
          }
          .btn-call:hover{background:var(--gold2)}
          .btn-wa-sm{
            display:inline-flex;align-items:center;gap:.4rem;
            background:var(--green);color:#fff;
            padding:.55rem 1rem;border-radius:4px;
            font-size:.78rem;font-weight:700;text-decoration:none;
            white-space:nowrap;transition:background .2s;
          }
          .btn-wa-sm:hover{background:#1eba56}

          /* Hero */
          .hero{
            padding:5.5rem 1.2rem 2.5rem;
            background:linear-gradient(160deg,#0F1B1A 0%,#1A2E2C 60%,#0D2420 100%);
            position:relative;overflow:hidden;
          }
          .hero::before{
            content:'';position:absolute;top:-100px;right:-100px;
            width:400px;height:400px;
            border-radius:50%;
            background:radial-gradient(circle,rgba(212,168,67,.12) 0%,transparent 70%);
          }
          .hero-tag{
            display:inline-block;
            background:rgba(212,168,67,.15);
            border:1px solid rgba(212,168,67,.3);
            color:var(--gold);font-size:.7rem;font-weight:600;
            letter-spacing:.2em;text-transform:uppercase;
            padding:.3rem .8rem;border-radius:3px;margin-bottom:1rem;
          }
          .hero h1{
            font-family:'Cormorant Garamond',serif;
            font-size:clamp(1.9rem,7vw,2.8rem);
            font-weight:700;line-height:1.1;
            color:#fff;margin-bottom:.8rem;
          }
          .hero h1 em{color:var(--gold);font-style:italic}
          .hero-sub{
            font-size:.9rem;color:rgba(255,255,255,.75);
            line-height:1.8;margin-bottom:1.5rem;max-width:500px;
          }

          /* Büyük CTA butonlar */
          .cta-group{display:flex;flex-direction:column;gap:.8rem;margin-bottom:1.5rem}
          .btn-call-big{
            display:flex;align-items:center;justify-content:center;gap:.6rem;
            background:var(--gold);color:#000;
            padding:1.1rem 1.5rem;border-radius:6px;
            font-size:1.05rem;font-weight:700;text-decoration:none;
            letter-spacing:.02em;box-shadow:0 4px 24px rgba(212,168,67,.35);
            transition:all .25s;
          }
          .btn-call-big:hover{background:var(--gold2);transform:translateY(-2px)}
          .btn-wa-big{
            display:flex;align-items:center;justify-content:center;gap:.6rem;
            background:var(--green);color:#fff;
            padding:1.1rem 1.5rem;border-radius:6px;
            font-size:1.05rem;font-weight:700;text-decoration:none;
            box-shadow:0 4px 24px rgba(37,211,102,.3);
            transition:all .25s;
          }
          .btn-wa-big:hover{background:#1eba56;transform:translateY(-2px)}
          .btn-maps{
            display:flex;align-items:center;justify-content:center;gap:.6rem;
            background:transparent;color:rgba(255,255,255,.8);
            padding:.9rem 1.5rem;border-radius:6px;
            font-size:.88rem;font-weight:600;text-decoration:none;
            border:1px solid rgba(255,255,255,.2);
            transition:all .25s;
          }
          .btn-maps:hover{border-color:var(--gold);color:var(--gold)}

          /* Güven puanları */
          .trust{
            background:var(--ink2);
            padding:1.2rem;
            display:grid;grid-template-columns:repeat(2,1fr);gap:1px;
            background-color:rgba(255,255,255,.06);
          }
          .trust-item{
            background:var(--ink2);padding:1rem;text-align:center;
          }
          .trust-val{
            font-family:'Cormorant Garamond',serif;
            font-size:1.4rem;font-weight:700;color:var(--gold);margin-bottom:.2rem;
          }
          .trust-lbl{font-size:.72rem;color:var(--muted);line-height:1.4}

          /* Terzi Çağır vurgu kutusu */
          .callout{
            margin:0;padding:2rem 1.2rem;
            background:linear-gradient(135deg,#1A2E2C,#0D2420);
            border-top:3px solid var(--gold);
            text-align:center;
          }
          .callout-icon{font-size:2.5rem;margin-bottom:.7rem}
          .callout h2{
            font-family:'Cormorant Garamond',serif;
            font-size:1.8rem;font-weight:700;color:#fff;
            margin-bottom:.5rem;line-height:1.15;
          }
          .callout h2 span{color:var(--gold)}
          .callout p{font-size:.86rem;color:rgba(255,255,255,.65);line-height:1.75;margin-bottom:1.2rem}
          .callout-steps{
            display:flex;flex-direction:column;gap:.5rem;
            text-align:left;margin-bottom:1.5rem;
          }
          .callout-step{
            display:flex;align-items:flex-start;gap:.7rem;
            background:rgba(255,255,255,.04);
            border:1px solid rgba(255,255,255,.06);
            padding:.75rem .9rem;border-radius:4px;
          }
          .callout-step-num{
            width:1.6rem;height:1.6rem;border-radius:50%;
            background:var(--gold);color:#000;
            display:flex;align-items:center;justify-content:center;
            font-size:.75rem;font-weight:700;flex-shrink:0;margin-top:.05rem;
          }
          .callout-step-t{font-size:.84rem;font-weight:600;color:#fff;margin-bottom:.1rem}
          .callout-step-d{font-size:.76rem;color:var(--muted);line-height:1.5}

          /* Fiyat tablosu */
          .prices{padding:2rem 1.2rem;background:var(--ink)}
          .prices h2{
            font-family:'Cormorant Garamond',serif;
            font-size:1.6rem;font-weight:700;color:#fff;
            margin-bottom:.3rem;
          }
          .prices-note{font-size:.78rem;color:var(--muted);margin-bottom:1.2rem}
          .ptbl{width:100%;border-collapse:collapse}
          .ptbl tr{border-bottom:1px solid rgba(255,255,255,.06)}
          .ptbl tr:last-child{border-bottom:none}
          .ptbl td{padding:.75rem .6rem;font-size:.84rem}
          .ptbl tr:nth-child(even) td{background:rgba(255,255,255,.03)}
          .p-name{color:rgba(255,255,255,.85)}
          .p-price{color:var(--gold);font-weight:700;text-align:right;white-space:nowrap;padding-right:.4rem}
          .p-time{color:var(--muted);font-size:.72rem;text-align:right;white-space:nowrap}
          .prices-cta{margin-top:1.5rem;text-align:center}

          /* Mahalleler */
          .mahs{padding:2rem 1.2rem;background:var(--ink2)}
          .mahs h2{
            font-family:'Cormorant Garamond',serif;
            font-size:1.5rem;font-weight:700;color:#fff;margin-bottom:.8rem;
          }
          .mah-grid{display:flex;flex-wrap:wrap;gap:.4rem}
          .mah-chip{
            background:rgba(212,168,67,.1);border:1px solid rgba(212,168,67,.25);
            color:var(--gold);padding:.3rem .75rem;border-radius:20px;font-size:.76rem;font-weight:500;
          }

          /* Harita */
          .map-sec{padding:0;background:var(--ink)}
          .map-wrap{position:relative}
          .map-wrap iframe{display:block;width:100%;border:0}
          .map-bar{
            padding:1rem 1.2rem;background:rgba(15,27,26,.97);
            border-top:1px solid rgba(212,168,67,.12);
            display:flex;align-items:center;justify-content:space-between;gap:.8rem;flex-wrap:wrap;
          }
          .map-bar-info{font-size:.8rem;color:rgba(255,255,255,.7);line-height:1.5}
          .map-bar-name{font-family:'Cormorant Garamond',serif;font-size:1rem;color:#fff;font-weight:700}

          /* SSS */
          .faq{padding:2rem 1.2rem;background:var(--ink3)}
          .faq h2{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:700;color:#fff;margin-bottom:1.2rem}
          .faq-item{border-bottom:1px solid rgba(255,255,255,.08);padding:.9rem 0}
          .faq-q{font-size:.88rem;font-weight:600;color:rgba(255,255,255,.9);margin-bottom:.4rem}
          .faq-a{font-size:.8rem;color:var(--muted);line-height:1.7}

          /* Footer */
          .footer{
            padding:2rem 1.2rem;background:#0A1412;text-align:center;
            border-top:1px solid rgba(212,168,67,.1);
          }
          .footer-brand{font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:var(--gold);margin-bottom:.4rem}
          .footer-links{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;margin-top:.8rem}
          .footer-link{font-size:.72rem;color:rgba(255,255,255,.4);text-decoration:none;border:1px solid rgba(255,255,255,.1);padding:.2rem .6rem;border-radius:3px;transition:color .2s}
          .footer-link:hover{color:var(--gold)}

          /* Floating WhatsApp */
          .wa-float{
            position:fixed;bottom:1.5rem;right:1.5rem;z-index:998;
            width:3.2rem;height:3.2rem;border-radius:50%;
            background:var(--green);display:flex;align-items:center;justify-content:center;
            font-size:1.5rem;text-decoration:none;
            box-shadow:0 4px 20px rgba(37,211,102,.5);
            transition:transform .3s;
          }
          .wa-float:hover{transform:scale(1.1)}

          @media(min-width:600px){
            .cta-group{flex-direction:row}
            .trust{grid-template-columns:repeat(4,1fr)}
            .callout-steps{display:grid;grid-template-columns:1fr 1fr;gap:.6rem}
          }
        `}</style>

        {/* WhatsApp float */}
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp">💬</a>

        {/* Sticky nav */}
        <div className="sticky-bar">
          <div className="sticky-brand">Terzi <span>Can</span></div>
          <div className="sticky-btns">
            <a href={`tel:${PHONE_E164}`} className="btn-call">📞 Ara</a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa-sm">💬 WA</a>
          </div>
        </div>

        {/* HERO */}
        <section className="hero">
          <span className="hero-tag">📍 Antalya · Konyaaltı · Terzi Servisi</span>
          <h1>
            Terzi Çağır,<br/>
            <em>Terzi Kapına Gelsin!</em>
          </h1>
          <p className="hero-sub">
            Antalya Konyaaltı'nın tüm mahallelerine <strong style={{color:'#D4A843'}}>araçlı terzi servisi</strong>.
            Siz yorulmayın — terzimiz adresinize gelir, ölçü alır,
            <strong style={{color:'#D4A843'}}> en geç 24 saatte teslim eder</strong>.
            Paça kısaltma <strong style={{color:'#D4A843'}}>₺150</strong>, fermuar <strong style={{color:'#D4A843'}}>₺200</strong>.
          </p>
          <div className="cta-group">
            <a href={`tel:${PHONE_E164}`} className="btn-call-big">
              📞 Hemen Ara — {PHONE}
            </a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa-big">
              💬 WhatsApp'tan Yaz
            </a>
          </div>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-maps">
            🗺️ Google Maps'te Bul — Konyaaltı, Antalya
          </a>
        </section>

        {/* GÜVEN PUANLARI */}
        <div className="trust">
          {[
            ['⭐ 4.9','94 Google Yorumu'],
            ['⚡ 24 Saat','Hızlı Teslim'],
            ['🚗 Adrese','Araçlı Servis'],
            ['✂️ 15 Yıl','Tecrübe'],
          ].map(([v,l]) => (
            <div key={l} className="trust-item">
              <div className="trust-val">{v}</div>
              <div className="trust-lbl">{l}</div>
            </div>
          ))}
        </div>

        {/* TERZİ ÇAĞIR ADIMLAR */}
        <section className="callout">
          <div className="callout-icon">🚗</div>
          <h2>Terzi Çağır —<br/><span>Terzi Gelsin!</span></h2>
          <p>
            Konyaaltı, Hurma, Liman, Sarısu, Uncalı, Gürsu, Meltem ve tüm Antalya'ya
            kapıya gelen profesyonel terzi servisi. Güvenli, hızlı ve kaliteli.
          </p>
          <div className="callout-steps">
            {[
              ['1','Ara veya WhatsApp Yaz',`${PHONE} numaralı hattımızı arayın veya WhatsApp mesajı gönderin. Fotoğraf ile anında fiyat alın.`],
              ['2','Terzimiz Adresinize Gelir','Anlaşılan saatte terzimiz Konyaaltı içinde adresinize gelir. Yerinde ölçü alır, kıyafeti teslim alır.'],
              ['3','Atölyede Hazırlanır','Kıyafetiniz profesyonel atölyemizde deneyimli ustalarımız tarafından özenle yapılır.'],
              ['4','Kapınıza Teslim','En geç 24 saatte tamamlanan kıyafet adresinize teslim edilir. Acil işler aynı gün teslim.'],
            ].map(([n,t,d]) => (
              <div key={n} className="callout-step">
                <div className="callout-step-num">{n}</div>
                <div>
                  <div className="callout-step-t">{t}</div>
                  <div className="callout-step-d">{d}</div>
                </div>
              </div>
            ))}
          </div>
          <a href={`tel:${PHONE_E164}`} className="btn-call-big" style={{marginBottom:'.7rem'}}>
            📞 Hemen Ara — {PHONE}
          </a>
          <br/>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa-big">
            💬 WhatsApp — Terzi Çağır
          </a>
        </section>

        {/* FİYAT TABLOSU */}
        <section className="prices" id="fiyatlar">
          <h2>Terzi Fiyat Listesi 2026</h2>
          <p className="prices-note">Başlangıç fiyatları. Kesin fiyat için fotoğraf gönderin.</p>
          <table className="ptbl">
            <tbody>
              {FIYATLAR.map(([h, f, s]) => (
                <tr key={h}>
                  <td className="p-name">{h}</td>
                  <td className="p-price">{f}</td>
                  <td className="p-time">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="prices-cta">
            <a href={`tel:${PHONE_E164}`} className="btn-call-big" style={{display:'inline-flex',justifyContent:'center',width:'100%',marginBottom:'.7rem'}}>
              📞 {PHONE} — Ara
            </a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa-big" style={{display:'inline-flex',justifyContent:'center',width:'100%'}}>
              📲 WhatsApp Fiyat Teklifi Al
            </a>
          </div>
        </section>

        {/* MAHALLELER */}
        <section className="mahs" id="mahalleler">
          <h2>🏘️ Hizmet Verilen Mahalleler</h2>
          <p style={{fontSize:'.8rem',color:'rgba(255,255,255,.55)',marginBottom:'1rem',lineHeight:1.6}}>
            Tüm Konyaaltı mahallelerine ve Antalya'nın tüm ilçelerine araçlı terzi servisi.
          </p>
          <div className="mah-grid">
            {MAHALLELER.map(m => (
              <span key={m} className="mah-chip">{m}</span>
            ))}
          </div>
          <div style={{marginTop:'1.2rem',padding:'.9rem',background:'rgba(212,168,67,.08)',border:'1px solid rgba(212,168,67,.2)',borderRadius:'4px',fontSize:'.8rem',color:'rgba(255,255,255,.7)',lineHeight:1.7}}>
            📞 Mahalleniz listede yok mu? Yine de arayın — <strong style={{color:'#D4A843'}}>Antalya'nın her bölgesine</strong> hizmet veriyoruz.
          </div>
        </section>

        {/* GOOGLE MAPS */}
        <section className="map-sec" id="konum">
          <div className="map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.8!2d30.6930!3d36.8851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39311e6924c67%3A0x59547225251db8a0!2sTERZ%C4%B0%20Can!5e0!3m2!1str!2str!4v1720000000000!5m2!1str!2str"
              height="240"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Terzi Can Konyaaltı Antalya"
            />
            <div className="map-bar">
              <div className="map-bar-info">
                <div className="map-bar-name">Terzi Can — Konyaaltı, Antalya</div>
                <div>Hurma Mah. · 09:00–19:00 · Pzt–Cmt</div>
              </div>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-call" style={{background:'#D4A843',color:'#000'}}>
                🗺️ Yol Tarifi
              </a>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="faq" id="sss">
          <h2>Sık Sorulan Sorular</h2>
          {[
            ['Terzi çağırmak için ne yapmam gerekiyor?',
             `${PHONE} numaralı hattımızı arayın veya WhatsApp mesajı gönderin. Kıyafetin fotoğrafını atın, fiyat alın. Aynı gün veya ertesi gün randevu alın — terzimiz kapınıza gelsin.`],
            ['Hangi mahallelere servis yapıyorsunuz?',
             'Hurma, Liman, Sarısu, Uncalı, Gürsu, Öğretmenevi, Meltem, Çakırlar, Konyaaltı Merkez ve tüm Antalya ilçelerine araçlı terzi servisi sunuyoruz.'],
            ['Paça kısaltma ve bel daraltma fiyatı ne kadar?',
             'Paça kısaltma ₺150, bel daraltma ₺150, etek kısaltma ₺150. Aynı gün teslim mümkündür. WhatsApp\'tan fotoğraf gönderin — 30 dakika içinde kesin fiyat alın.'],
            ['Teslim süresi ne kadar?',
             'Paça kısaltma, fermuar, küçük tamirler aynı gün teslim. Büyük tadilatlar 24–48 saat. Elbise dikimi 3–5 iş günü.'],
            ['İngilizce veya Rusça hizmet veriyor musunuz?',
             'Evet! Türkçe, İngilizce, Rusça ve Almanca hizmet veriyoruz. Turistler için özel otel teslimat hizmeti de mevcuttur.'],
          ].map(([q,a]) => (
            <div key={q} className="faq-item">
              <div className="faq-q">{q}</div>
              <div className="faq-a">{a}</div>
            </div>
          ))}
        </section>

        {/* Son CTA */}
        <section style={{padding:'2rem 1.2rem',background:'var(--ink2)',textAlign:'center'}}>
          <p style={{fontSize:'1rem',fontFamily:"'Cormorant Garamond',serif",fontWeight:700,color:'#fff',marginBottom:'.4rem'}}>
            Terziniz bir telefon uzağında
          </p>
          <p style={{fontSize:'.8rem',color:'rgba(255,255,255,.55)',marginBottom:'1.2rem'}}>
            Konyaaltı ve tüm Antalya — 09:00–19:00 · Pzt–Cmt
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:'.7rem'}}>
            <a href={`tel:${PHONE_E164}`} className="btn-call-big" style={{justifyContent:'center'}}>
              📞 Hemen Ara — {PHONE}
            </a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa-big" style={{justifyContent:'center'}}>
              💬 WhatsApp'tan Yaz
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-maps" style={{justifyContent:'center'}}>
              🗺️ Google Maps'te Bul
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-brand">Terzi Can · Konyaaltı, Antalya</div>
          <p style={{fontSize:'.72rem',color:'rgba(255,255,255,.3)'}}>
            © 2026 SwapHubs · {PHONE} · 09:00–19:00 Pzt–Cmt
          </p>
          <nav className="footer-links">
            {[
              ['Ana Terzi Sayfası','/terzi'],
              ['Paça Kısaltma','/terzi/paca-kisaltma-antalya'],
              ['Eve Gelen Terzi','/terzi/eve-gelen-terzi-antalya'],
              ['Hurma Terzi','/terzi/hurma-terzi'],
              ['Liman Terzi','/terzi/liman-terzi'],
              ['Elbise Dikimi','/antalya-terzi-elbise-dikimi'],
            ].map(([l,h]) => (
              <a key={h} href={h} className="footer-link">{l}</a>
            ))}
          </nav>
        </footer>

      </main>
    </>
  );
}

// Fiyat listesi sabit veri
const FIYATLAR = [
  ['Paça Kısaltma','₺150','Aynı gün'],
  ['Bel Daraltma','₺150','24 saat'],
  ['Etek Kısaltma','₺150','Aynı gün'],
  ['Pantolon Paçası','₺150','Aynı gün'],
  ['Fermuar Değişimi','₺200','Aynı gün'],
  ['Fermuar Tamiri','₺200','Aynı gün'],
  ['Ceket Tamiri','₺200','24 saat'],
  ['Mont Tamiri','₺200','24 saat'],
  ['Gömlek Tamiri','₺150','Aynı gün'],
  ['T-Shirt Tamiri','₺100','Aynı gün'],
  ['Elbise Tamiri','₺150+','24 saat'],
  ['Abiye Tamiri','₺400','48 saat'],
  ['Elbise Dikimi','₺800+','3–5 gün'],
];
