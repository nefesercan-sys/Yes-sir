import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/fermuar-degisimi';
const PARENT_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Merhaba, adresime terzi servisi istiyorum. Konum: ')}`;
const TODAY = new Date().toISOString().split('T')[0];

// Antalya'nın en büyük otellerinin listesi — Google bu isimlerle eşleştirir
const OTELLER = [
  'Rixos Downtown Antalya','Regnum Carya','Kaya Palazzo Golf Resort',
  'Gloria Golf Resort','Delphin BE Grand Resort','Delphin Diva Premiere',
  'Susesi Luxury Resort','Adam & Eve Hotel','Calista Luxury Resort',
  'TUI Magic Life Belek','Ela Quality Resort','Cornelia Diamond Golf Resort',
  'Maxx Royal Belek','Maxx Royal Kemer','Titanic Mardan Palace',
  'Sheraton Cesme','Rixos Premium Belek','Crystal Sunset Luxury Resort',
  'Fame Residence Lara','Akra Hotel','Hillside Su Hotel','Lara Barut Collection',
  'Concorde De Luxe Resort','Papillon Ayscha Resort','Limak Atlantis',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Eve Gelen Terzi Antalya — Otele Gelen Terzi — Araçlı Servis',
      alternateName: [
        'Eve Gelen Terzi Antalya','Otele Gelen Terzi Antalya',
        'Mobile Tailor Antalya','Hotel Tailor Antalya',
        'Выездной портной Анталья','Mobile Schneiderdienst Antalya',
        'Araçlı Terzi Servisi Antalya',
      ],
      description: "Antalya'da eve gelen terzi ve otele gelen terzi servisi. Konyaaltı, Lara, Belek, Kemer, Alanya, Side, Manavgat — tüm ilçelere araçlı terzi servisi. Ölçü alma, dikim ve teslimat kapınıza.",
      provider: {
        '@type': 'ClothingStore',
        '@id': `${PARENT_URL}#business`,
        name: 'Terzi Can',
        telephone: PHONE_E164,
      },
      areaServed: [
        {name:'Antalya'},{name:'Konyaaltı'},{name:'Muratpaşa'},
        {name:'Lara'},{name:'Belek'},{name:'Kemer'},{name:'Alanya'},
        {name:'Manavgat'},{name:'Side'},{name:'Kepez'},
      ].map(c=>({...c,'@type':'City'})),
      offers: {
        '@type': 'Offer',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Eve Gelen Terzi Antalya · Otele Gelen Terzi · Araçlı Servis · Terzi Can',
      url: SITE_URL,
      description: "Antalya'da eve gelen terzi ve otele gelen terzi servisi. Lara, Belek, Kemer, Alanya dahil tüm ilçelere. Ölçü alım, dikim, teslimat kapıda. 24 saat. ☎ " + PHONE,
      inLanguage: 'tr',
      dateModified: TODAY,
      breadcrumb: {'@id': `${SITE_URL}#breadcrumb`},
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        {position:1, name:'SwapHubs', item:HOME_URL},
        {position:2, name:'Antalya Terzi', item:PARENT_URL},
        {position:3, name:'Eve Gelen Terzi Antalya', item:SITE_URL},
      ].map(i=>({...i,'@type':'ListItem'})),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type':'Question',
          name:'Eve gelen terzi Antalya var mı?',
          acceptedAnswer:{'@type':'Answer',text:`Evet! Terzi Can'ın araçlı terzi servisi ile Antalya'nın tüm ilçelerine geliyoruz. WhatsApp'tan konum paylaşın, terzi adresinize gelsin, ölçü alsın, diksin ve teslim etsin. WhatsApp: ${PHONE}`},
        },
        {
          '@type':'Question',
          name:'Otele gelen terzi Antalya — hangi otellere hizmet veriyorsunuz?',
          acceptedAnswer:{'@type':'Answer',text:`Rixos, Regnum, Maxx Royal, Kaya Palazzo, Delphin, Calista, Gloria, Titanic dahil tüm Antalya otellere terzi servisi veriyoruz. WhatsApp: ${PHONE}`},
        },
        {
          '@type':'Question',
          name:'Araçlı terzi servisi kaç lira?',
          acceptedAnswer:{'@type':'Answer',text:`Araçlı terzi servisi ücretsizdir, sadece yapılan iş için ücret alınır. Paça kısaltma ₺150, elbise tadilatı ₺200'den başlar. WhatsApp: ${PHONE}`},
        },
        {
          '@type':'Question',
          name:'Mobile tailor Antalya — same day service?',
          acceptedAnswer:{'@type':'Answer',text:`Yes! Tailor Can offers same-day and 24-hour mobile tailor service across all Antalya districts including Lara, Belek, Kemer and Alanya hotels. WhatsApp: ${PHONE}`},
        },
        {
          '@type':'Question',
          name:'Belek otelinde terzi hizmeti var mı?',
          acceptedAnswer:{'@type':'Answer',text:`Evet! Belek'teki tüm büyük otellere — Rixos, Regnum, Kaya Palazzo, Gloria, Delphin, Calista, Maxx Royal, Cornelia dahil — terzi servisimizle geliyoruz. WhatsApp: ${PHONE}`},
        },
        {
          '@type':'Question',
          name:'Выездной портной Анталья — есть ли обслуживание в отеле?',
          acceptedAnswer:{'@type':'Answer',text:`Да! Портной Кан обслуживает все отели Антальи — Белек, Лара, Кемер, Аланья. Говорим по-русски. WhatsApp: ${PHONE}`},
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'Eve veya Otele Gelen Terzi Servisi Nasıl Çalışır?',
      totalTime: 'PT24H',
      step: [
        {'@type':'HowToStep', name:'WhatsApp yazın', text:`${PHONE} numarasına konumunuzu veya otel adınızı gönderin.`},
        {'@type':'HowToStep', name:'Randevu alın', text:'30 dakika içinde terzi size uygun saati bildirir.'},
        {'@type':'HowToStep', name:'Terzi gelir', text:'Belirtilen saatte araçlı terzi adresinize gelir, ölçü alır, kıyafetleri atar.'},
        {'@type':'HowToStep', name:'Teslim alın', text:'24–48 saat içinde kıyafetiniz dikilerek kapınıza teslim edilir.'},
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Eve Gelen Terzi Antalya · Otele Gelen Terzi · Araçlı Servis · Terzi Can',
  description: "Antalya'da eve gelen terzi ve otele gelen terzi servisi. Belek, Lara, Kemer, Alanya dahil tüm ilçelere araçlı terzi. Paça kısaltma ₺150, elbise tadilatı. 24 saat. ☎ " + PHONE,
  keywords: [
    'eve gelen terzi Antalya','otele gelen terzi Antalya',
    'araçlı terzi servisi Antalya','mobile tailor Antalya',
    'hotel tailor Antalya','Belek terzi','Lara terzi','Kemer terzi',
    'Alanya terzi','Belek hotel tailor','tailor service Antalya hotel',
    'выездной портной Анталья','портной в отель Анталья',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Eve Gelen Terzi Antalya · Otele Gelen Terzi · Araçlı Servis',
    description: "Belek, Lara, Kemer, Alanya dahil tüm Antalya otellerine terzi servisi. 24 saat. ☎ " + PHONE,
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true },
};

const ILCELER = [
  {ad:'Belek',yol:'~35 dk', aciklama:'Tüm Belek otelleri — Rixos, Regnum, Kaya Palazzo, Gloria, Delphin, Calista, Cornelia, Maxx Royal'},
  {ad:'Lara',yol:'~10 dk', aciklama:'Tüm Lara otelleri — Delphin Diva, Titanic Mardan, Fame Residence, Akra, Lara Barut Collection'},
  {ad:'Kemer',yol:'~45 dk', aciklama:'Tüm Kemer otelleri — Maxx Royal Kemer, Club Med Palmiye, Rixos Sungate, Sentido Perissia'},
  {ad:'Alanya',yol:'~1.5 saat', aciklama:'Alanya merkez ve çevresi — Mahmutlar, Oba, Konaklı, Avsallar'},
  {ad:'Muratpaşa / Liman',yol:'~5 dk', aciklama:'Şehir merkezi, Kaleiçi, Şirinyalı, Fener'},
  {ad:'Konyaaltı',yol:'Merkez', aciklama:'Terzi Can merkezi — Hurma, Uncalı, Arapsuyu, Sarısu'},
  {ad:'Manavgat / Side',yol:'~1 saat', aciklama:'Side, Sorgun, Kumköy, Evrenseki otelleri'},
  {ad:'Serik / Döşemealtı',yol:'~40 dk', aciklama:'Serik merkez ve çevre köyler'},
];

export default function EveGelenTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: 'system-ui,sans-serif', background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        {/* BREADCRUMB */}
        <nav style={{ padding: '1rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.1)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}
          <span>Eve Gelen Terzi Antalya</span>
        </nav>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg,#1C1814 0%,#2E2820 100%)', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: `url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&auto=format&fit=crop') center/cover`, opacity: .15 }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🚗 Araçlı Terzi Servisi · Tüm Antalya
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: '1.2rem' }}>
              Eve Gelen Terzi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Otele Gelen Terzi Servisi</span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#fff' }}>Terzi Can</strong> araçlı terzi servisiyle <strong style={{ color: '#D4B07A' }}>tüm Antalya ilçelerine</strong> geliyoruz.
              Belek, Lara, Kemer, Alanya dahil tüm oteller. Ölçü alım, dikim ve teslimat kapınıza.
              24–48 saat ekspres.
            </p>
            {/* Çok dil karşılama */}
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[
                ['🇹🇷', 'Eve ve otele geliyoruz'],
                ['🇬🇧', 'We come to your hotel'],
                ['🇷🇺', 'Приедем в ваш отель'],
                ['🇩🇪', 'Wir kommen zu Ihnen'],
              ].map(([flag, text]) => (
                <span key={flag as string} style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', padding: '.3rem .8rem', borderRadius: '2px' }}>
                  {flag} {text}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '1rem 2.2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.88rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                💬 Konum Paylaş → Terzi Gelsin
              </a>
              <a href={`tel:${PHONE_E164}`}
                style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '1rem 1.8rem', textDecoration: 'none', fontSize: '.88rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* NASIL ÇALIŞIR */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.6rem' }}>
              Eve ve Otele Gelen Terzi Servisi Nasıl Çalışır?
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.9rem', marginBottom: '2.5rem' }}>4 adımda kapınıza terzi hizmeti</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {[
                ['📍', 'WhatsApp\'tan Konum Paylaşın', `${PHONE} numarasına konum veya otel adı gönderin`],
                ['📞', '30 Dk İçinde Randevu', 'Terzi size uygun saati bildirir'],
                ['✂️', 'Yerinde Ölçü Alım', 'Terzi adresinize gelir, ölçü alır, kıyafetleri atar'],
                ['🚗', '24–48 Saat Teslim', 'Dikilen kıyafet kapınıza teslim edilir'],
              ].map(([ic, t, d], i) => (
                <div key={i} style={{ background: '#FAF7F2', padding: '2rem 1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '.7rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#B8975A', marginBottom: '.4rem' }}>{t}</div>
                  <div style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HİZMET ALANLARI — İlçe bazlı */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Antalya'nın Tüm İlçelerine Araçlı Terzi Servisi
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2.5rem' }}>Konyaaltı merkezimizden tüm Antalya ilçelerine terzi servisi</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
              {ILCELER.map(({ad, yol, aciklama}) => (
                <div key={ad} style={{ background: '#fff', border: '1px solid rgba(184,151,90,.15)', borderRadius: '2px', padding: '1.4rem', borderLeft: '3px solid #B8975A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
                    <strong style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#1C1814' }}>📍 {ad}</strong>
                    <span style={{ fontSize: '.7rem', color: '#B8975A', fontWeight: 600, letterSpacing: '.08em' }}>{yol}</span>
                  </div>
                  <p style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OTEL LİSTESİ — Kritik SEO */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Antalya Otellerinde Terzi Hizmeti
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>
              Aşağıdaki oteller dahil tüm Antalya otellerine terzi servisimizle geliyoruz.
              Concierge'e sormadan direkt WhatsApp'tan yazabilirsiniz.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.5rem' }}>
              {OTELLER.map(otel => (
                <span key={otel} style={{ fontSize: '.77rem', color: '#3A3028', background: '#F2EDE4', border: '1px solid rgba(184,151,90,.2)', padding: '.3rem .75rem', borderRadius: '2px' }}>
                  {otel}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '.8rem', color: '#7A6E62', fontStyle: 'italic' }}>
              + Antalya'daki tüm diğer oteller. Otelinizin ismini WhatsApp'tan bildirin, geliyoruz.
            </p>
            <div style={{ marginTop: '1.8rem' }}>
              <a href={`https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Merhaba, otelimize terzi servisi istiyorum. Otelimiz: ')}`} target="_blank" rel="noopener noreferrer"
                style={{ background: '#25d366', color: '#fff', padding: '1rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', borderRadius: '4px', display: 'inline-block' }}>
                💬 Otel Adını Yazın → Terzi Gelsin
              </a>
            </div>
          </div>
        </section>

        {/* FİYATLAR */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Eve / Otele Gelen Terzi Fiyatları
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.85rem', marginBottom: '1.5rem' }}>Araçlı servis ücretsiz — sadece yapılan iş ücretlendirilir</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Hizmet', 'Fiyat', 'Süre'].map(h => (
                    <th key={h} style={{ textAlign: h==='Hizmet'?'left':'right', padding: '.7rem .8rem', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Araçlı Servis Ücreti','ÜCRETSIZ','—'],
                  ['Paça / Pantolon Kısaltma','₺150+','24 saat'],
                  ['Fermuar Değişimi','₺120+','Aynı gün'],
                  ['Elbise / Ceket Daraltma','₺200+','48 saat'],
                  ['Kol Kısaltma','₺200+','48 saat'],
                  ['Abiye Tamiri','₺350+','48 saat'],
                  ['Gelinlik Tadilatı','₺500+','3–5 gün'],
                  ['Erkek Takım Elbise Dikimi','₺2.500+','5–7 gün'],
                  ['Yırtık Onarımı','₺100+','Aynı gün'],
                ].map(([s, p, t], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i % 2 ? 'rgba(184,151,90,.02)' : '#fff' }}>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.88rem' }}>{s}</td>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.88rem', color: p==='ÜCRETSIZ'?'#22c55e':'#8A6E3E', fontWeight: 600, textAlign: 'right' }}>{p}</td>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.78rem', color: '#7A6E62', textAlign: 'right' }}>{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* TURIST BÖLÜMÜ — EN ÖNEMLİ SEO BLOĞU */}
        <section style={{ background: '#1C1814', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#D4B07A', marginBottom: '1rem' }}>
              For Tourists — Hotel Tailor Service Antalya
            </h2>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '.9rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Visiting Antalya for a gala dinner, business meeting or wedding? Tailor Can's mobile tailor service
              delivers <strong style={{ color: '#fff' }}>same-day and 24-hour alterations</strong> directly to your hotel room.
              We speak <strong style={{ color: '#D4B07A' }}>English, Russian, German and Turkish</strong>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                ['👗','Dress altered before dinner','24h express'],
                ['💼','Suit ready for meeting','Same day possible'],
                ['💍','Wedding dress adjusted','48h turnaround'],
                ['🚗','We come to your hotel','Free service call'],
              ].map(([ic, t, s]) => (
                <div key={t as string} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(212,176,122,.15)', borderRadius: '2px', padding: '1.2rem' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>{ic}</div>
                  <div style={{ fontSize: '.85rem', color: '#fff', fontWeight: 500, marginBottom: '.2rem' }}>{t}</div>
                  <div style={{ fontSize: '.72rem', color: '#D4B07A' }}>{s}</div>
                </div>
              ))}
            </div>
            <a href={`https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Hello, I need a mobile tailor at my hotel in Antalya. Hotel: ')}`} target="_blank" rel="noopener noreferrer"
              style={{ background: '#B8975A', color: '#fff', padding: '1rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', display: 'inline-block' }}>
              💬 WhatsApp — English / Русский / Deutsch
            </a>

            {/* Rusça blok */}
            <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '2rem' }}>
              <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.4rem', color: '#D4B07A', marginBottom: '.7rem' }}>
                Выездной портной Анталья — Обслуживание в отеле
              </h3>
              <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '.85rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                Портной Кан приедет в ваш отель в Белеке, Ларе, Кемере или Аланье.
                Снимем мерки, сошьём в ателье и доставим обратно за 24–48 часов.
                Говорим по-русски.
              </p>
              <a href={`https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Здравствуйте, хочу вызвать портного в мой отель. Отель: ')}`} target="_blank" rel="noopener noreferrer"
                style={{ background: 'rgba(212,176,122,.15)', color: '#D4B07A', border: '1px solid rgba(212,176,122,.3)', padding: '.8rem 1.5rem', textDecoration: 'none', fontSize: '.82rem', display: 'inline-block' }}>
                💬 Написать по-русски
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#FAF7F2', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '2rem' }}>
              Eve / Otele Gelen Terzi — Sık Sorulan Sorular
            </h2>
            {[
              ['Eve gelen terzi Antalya var mı?', `Evet! Terzi Can'ın araçlı terzi servisi Antalya'nın tüm ilçelerine gelmektedir. WhatsApp'tan konum paylaşın, terzi adresinize gelsin. WhatsApp: ${PHONE}`],
              ['Araçlı terzi servisi ücretli mi?', 'Hayır! Araçlı terzi servisi tamamen ücretsizdir. Sadece yapılan terzilik işi ücretlendirilir. Paça kısaltma ₺150, elbise tadilatı ₺200\'den başlar.'],
              ['Belek otellerine terzi servisi var mı?', `Evet! Regnum, Rixos, Kaya Palazzo, Gloria, Delphin, Calista, Maxx Royal, Cornelia dahil tüm Belek otellerine terzi servisimizle geliyoruz. WhatsApp: ${PHONE}`],
              ['Lara otellerinde terzi hizmeti var mı?', `Evet! Titanic Mardan, Delphin Diva, Fame Residence, Akra, Lara Barut Collection dahil tüm Lara otellerine terzi servisi. WhatsApp: ${PHONE}`],
              ['Kaç saatte terzi geliyor?', 'WhatsApp\'tan yazıldıktan 30 dakika içinde randevu belirlenir. Genellikle aynı gün veya ertesi gün terzi adresinize gelmektedir.'],
              ['Do you come to hotels in Antalya?', `Yes! Tailor Can serves all Antalya hotels — Belek, Lara, Kemer, Alanya, Manavgat. English-speaking tailor service. WhatsApp: ${PHONE}`],
            ].map(([q, a], i) => (
              <details key={i} style={{ borderBottom: '1px solid rgba(184,151,90,.1)', padding: '1rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.93rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q} <span style={{ color: '#B8975A', fontSize: '1.2rem', fontWeight: 300 }}>+</span>
                </summary>
                <p style={{ marginTop: '.8rem', fontSize: '.84rem', color: '#7A6E62', lineHeight: 1.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#B8975A', padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.8rem' }}>
            Terziyi Şimdi Çağırın
          </h2>
          <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: '2rem', fontSize: '.92rem' }}>
            Konum paylaşın — 30 dk içinde randevu, 24 saat içinde teslim
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Konum Paylaş
            </a>
            <a href={`tel:${PHONE_E164}`}
              style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
          <p style={{ marginTop: '1.2rem', fontSize: '.78rem', color: 'rgba(255,255,255,.7)' }}>
            ⭐ 4.9 / 5 · 94 Google Değerlendirmesi · 09:00–19:00 Pzt–Cmt
          </p>
        </section>

        {/* İLGİLİ SAYFALAR */}
        <section style={{ padding: '2.5rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>İlgili Sayfalar</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[
                ['Paça Kısaltma Antalya', '/terzi/paca-kisaltma-antalya'],
                ['Bay Terzi Antalya', '/terzi/bay-terzi-antalya'],
                ['Bayan Terzi Antalya', '/terzi/bayan-terzi-antalya'],
                ['Dikiş Atölyesi', '/terzi/dikis-atolyesi-antalya'],
                ['Üniforma Üretimi', '/terzi/uniforma-uretimi-antalya'],
                ['Kuru Temizleme', '/terzi/kuru-temizleme-antalya'],
                ['← Tüm Hizmetler', '/terzi'],
              ].map(([label, href]) => (
                <Link key={label} href={href}
                  style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>
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
