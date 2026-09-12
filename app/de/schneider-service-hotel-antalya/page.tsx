import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/de/schneider-service-hotel-antalya';
const TR_URL = 'https://swaphubs.com/terzi/eve-gelen-terzi-antalya';
const EN_URL = 'https://swaphubs.com/en/hotel-tailor-antalya';
const RU_URL = 'https://swaphubs.com/ru/vyezdnoy-portnoy-antalya';
const PARENT_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Hallo, ich brauche einen mobilen Schneider. Mein Standort: ')}`;
const TODAY = new Date().toISOString().split('T')[0];

const HOTELS = [
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
      name: 'Mobiler Schneider Antalya — Schneiderservice im Hotel',
      alternateName: [
        'Schneider im Hotel Antalya','Mobiler Schneiderdienst Antalya','Deutschsprachiger Schneider Antalya',
        'Eve Gelen Terzi Antalya','Otele Gelen Terzi Antalya',
      ],
      description: 'Mobiler Schneiderservice in Antalya. Wir kommen zu Ihrem Hotel in Belek, Lara, Kemer, Alanya, Side, Manavgat — in alle Bezirke von Antalya. Maßnahme, Änderung und Lieferung direkt zu Ihnen.',
      provider: { '@type': 'ClothingStore', '@id': `${PARENT_URL}#business`, name: 'Terzi Can', telephone: PHONE_E164 },
      areaServed: [
        {name:'Antalya'},{name:'Konyaaltı'},{name:'Muratpaşa'},
        {name:'Lara'},{name:'Belek'},{name:'Kemer'},{name:'Alanya'},
        {name:'Manavgat'},{name:'Side'},{name:'Kepez'},
      ].map(c=>({...c,'@type':'City'})),
      offers: { '@type': 'Offer', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Mobiler Schneider Antalya · Schneiderservice im Hotel · Terzi Can',
      url: SITE_URL,
      description: 'Mobiler Schneider- und Hotelservice in Antalya. Belek, Lara, Kemer, Alanya und alle Bezirke. Änderungen am selben Tag oder in 24 Stunden. Wir sprechen Deutsch. ☎ ' + PHONE,
      inLanguage: 'de',
      dateModified: TODAY,
      breadcrumb: {'@id': `${SITE_URL}#breadcrumb`},
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        {position:1, name:'SwapHubs', item:HOME_URL},
        {position:2, name:'Schneider Antalya', item:PARENT_URL},
        {position:3, name:'Mobiler Schneider Antalya', item:SITE_URL},
      ].map(i=>({...i,'@type':'ListItem'})),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Gibt es einen mobilen Schneiderservice in Antalya?',
          acceptedAnswer:{'@type':'Answer',text:`Ja! Der mobile Schneiderservice von Terzi Can kommt zu jeder Adresse in Antalya. Teilen Sie Ihren Hotelnamen oder Standort per WhatsApp mit — der Schneider kommt, nimmt Maß, näht und liefert. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Welche Hotels in Belek und Lara werden bedient?',
          acceptedAnswer:{'@type':'Answer',text:`Wir bedienen alle großen Hotels, darunter Rixos, Regnum, Maxx Royal, Kaya Palazzo, Delphin, Calista, Gloria und Titanic. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Ist der Hausbesuch kostenlos?',
          acceptedAnswer:{'@type':'Answer',text:`Ja, der Besuch selbst ist kostenlos — Sie zahlen nur für die Schneiderarbeit. Kürzen ab ₺150, Kleideränderungen ab ₺200. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Sind Änderungen am selben Tag vor einem Termin möglich?',
          acceptedAnswer:{'@type':'Answer',text:`Ja! Terzi Can bietet Änderungen am selben Tag oder innerhalb von 24 Stunden in ganz Antalya an, einschließlich Hotels in Belek, Lara, Kemer und Alanya. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Sprechen Sie Deutsch?',
          acceptedAnswer:{'@type':'Answer',text:`Ja, unser Team spricht Deutsch, Englisch, Russisch und Türkisch. WhatsApp: ${PHONE}`} },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'So funktioniert der mobile Schneider- / Hotelservice',
      totalTime: 'PT24H',
      step: [
        { '@type':'HowToStep', name:'Schreiben Sie uns auf WhatsApp', text:`Senden Sie Ihren Standort oder Hotelnamen an ${PHONE}.` },
        { '@type':'HowToStep', name:'Termin vereinbaren', text:'Wir bestätigen innerhalb von 30 Minuten eine passende Zeit.' },
        { '@type':'HowToStep', name:'Schneider besucht Sie', text:'Unser mobiler Schneider kommt zu Ihnen, nimmt Maß und nimmt das Kleidungsstück mit.' },
        { '@type':'HowToStep', name:'Lieferung', text:'Ihr fertiges Kleidungsstück wird innerhalb von 24–48 Stunden zu Ihnen geliefert.' },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Mobiler Schneider Antalya · Schneiderservice im Hotel · Terzi Can',
  description: 'Mobiler Schneiderservice in Antalya. Wir kommen zu Ihrem Hotel in Belek, Lara, Kemer, Alanya. Änderungen am selben Tag, wir sprechen Deutsch. ☎ ' + PHONE,
  keywords: [
    'mobiler Schneider Antalya','Schneider im Hotel Antalya','Schneiderservice Antalya Hotel',
    'deutschsprachiger Schneider Antalya','Schneider Belek Hotel','Schneider Lara Hotel',
    'Schneider Kemer Hotel','Schneider Alanya Hotel','Änderungsschneiderei Antalya',
    'Kleid ändern Antalya Hotel','Anzug ändern Antalya',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { 'tr': TR_URL, 'en': EN_URL, 'ru': RU_URL, 'de': SITE_URL, 'x-default': TR_URL },
  },
  openGraph: {
    title: 'Mobiler Schneider Antalya · Schneiderservice im Hotel',
    description: 'Mobiler Schneiderservice zu Ihrem Hotel in Belek, Lara, Kemer, Alanya und ganz Antalya.',
    url: SITE_URL, type: 'website', locale: 'de_DE',
  },
  robots: { index: true, follow: true },
};

const DISTRICTS = [
  {name:'Belek', time:'~35 Min', desc:'Alle Hotels in Belek — Rixos, Regnum, Kaya Palazzo, Gloria, Delphin, Calista, Cornelia, Maxx Royal'},
  {name:'Lara', time:'~10 Min', desc:'Alle Hotels in Lara — Delphin Diva, Titanic Mardan, Fame Residence, Akra, Lara Barut Collection'},
  {name:'Kemer', time:'~45 Min', desc:'Alle Hotels in Kemer — Maxx Royal Kemer, Club Med Palmiye, Rixos Sungate, Sentido Perissia'},
  {name:'Alanya', time:'~1,5 Std', desc:'Alanya Zentrum und Umgebung — Mahmutlar, Oba, Konaklı, Avsallar'},
  {name:'Muratpaşa / Liman', time:'~5 Min', desc:'Stadtzentrum, Kaleiçi, Şirinyalı, Fener'},
  {name:'Konyaaltı', time:'Vor Ort', desc:'Werkstatt von Terzi Can — Hurma, Uncalı, Arapsuyu, Sarısu'},
  {name:'Manavgat / Side', time:'~1 Std', desc:'Hotels in Side, Sorgun, Kumköy, Evrenseki'},
  {name:'Serik / Döşemealtı', time:'~40 Min', desc:'Serik Zentrum und umliegende Dörfer'},
];

export default function SchneiderServiceHotelAntalyaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: 'system-ui,sans-serif', background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '1rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.1)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Schneider Antalya</Link>
          {' › '}
          <span>Mobiler Schneider Antalya</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814 0%,#2E2820 100%)', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: `url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&auto=format&fit=crop') center/cover`, opacity: .15 }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🚗 Mobiler Schneiderservice · Ganz Antalya
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: '1.2rem' }}>
              Mobiler Schneider Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Wir kommen zu Ihrem Hotel</span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#fff' }}>Terzi Can</strong> kommt mit dem mobilen Schneiderservice in <strong style={{ color: '#D4B07A' }}>jeden Bezirk von Antalya</strong>.
              Belek, Lara, Kemer, Alanya — alle Hotels. Maßnahme, Änderung und Lieferung direkt zu Ihnen.
              Express in 24–48 Stunden.
            </p>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[
                ['🇩🇪', 'Wir kommen zu Ihnen'],
                ['🇹🇷', 'Eve ve otele geliyoruz'],
                ['🇬🇧', 'We come to your hotel'],
                ['🇷🇺', 'Приедем в ваш отель'],
              ].map(([flag, text]) => (
                <span key={flag as string} style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', padding: '.3rem .8rem', borderRadius: '2px' }}>
                  {flag} {text}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '1rem 2.2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.88rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                💬 Standort senden → Schneider kommt
              </a>
              <a href={`tel:${PHONE_E164}`}
                style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '1rem 1.8rem', textDecoration: 'none', fontSize: '.88rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.6rem' }}>
              So funktioniert der mobile Schneiderservice
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.9rem', marginBottom: '2.5rem' }}>Service direkt zu Ihnen in 4 Schritten</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {[
                ['📍', 'Standort per WhatsApp senden', `Senden Sie Standort oder Hotelnamen an ${PHONE}`],
                ['📞', 'Termin innerhalb von 30 Min', 'Wir bestätigen eine passende Uhrzeit'],
                ['✂️', 'Maßnehmen vor Ort', 'Unser Schneider kommt, nimmt Maß und das Kleidungsstück mit'],
                ['🚗', 'Lieferung in 24–48 Std', 'Das fertige Kleidungsstück wird zu Ihnen geliefert'],
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

        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Mobiler Schneiderservice in allen Bezirken von Antalya
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2.5rem' }}>Von unserer Werkstatt in Konyaaltı in jeden Bezirk von Antalya</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
              {DISTRICTS.map(({name, time, desc}) => (
                <div key={name} style={{ background: '#fff', border: '1px solid rgba(184,151,90,.15)', borderRadius: '2px', padding: '1.4rem', borderLeft: '3px solid #B8975A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
                    <strong style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#1C1814' }}>📍 {name}</strong>
                    <span style={{ fontSize: '.7rem', color: '#B8975A', fontWeight: 600, letterSpacing: '.08em' }}>{time}</span>
                  </div>
                  <p style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Schneiderservice in Hotels in Antalya
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>
              Wir kommen zu allen Hotels in Antalya, einschließlich der unten aufgeführten.
              Sie müssen nicht über die Rezeption gehen — schreiben Sie uns einfach direkt auf WhatsApp.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.5rem' }}>
              {HOTELS.map(hotel => (
                <span key={hotel} style={{ fontSize: '.77rem', color: '#3A3028', background: '#F2EDE4', border: '1px solid rgba(184,151,90,.2)', padding: '.3rem .75rem', borderRadius: '2px' }}>
                  {hotel}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '.8rem', color: '#7A6E62', fontStyle: 'italic' }}>
              + Alle anderen Hotels in Antalya. Teilen Sie uns einfach Ihren Hotelnamen per WhatsApp mit.
            </p>
            <div style={{ marginTop: '1.8rem' }}>
              <a href={`https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Hallo, ich brauche einen Schneider in meinem Hotel. Mein Hotel: ')}`} target="_blank" rel="noopener noreferrer"
                style={{ background: '#25d366', color: '#fff', padding: '1rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', borderRadius: '4px', display: 'inline-block' }}>
                💬 Hotelnamen mitteilen → Schneider kommt
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Preise für mobilen Schneider / Hotelservice
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.85rem', marginBottom: '1.5rem' }}>Der Besuch selbst ist kostenlos — Sie zahlen nur für die Schneiderarbeit</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Leistung', 'Preis', 'Dauer'].map(h => (
                    <th key={h} style={{ textAlign: h==='Leistung'?'left':'right', padding: '.7rem .8rem', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Anfahrtsgebühr','KOSTENLOS','—'],
                  ['Hosen kürzen','ab ₺150','24 Std'],
                  ['Reißverschluss wechseln','ab ₺120','Am selben Tag'],
                  ['Kleid / Jacke enger machen','ab ₺200','48 Std'],
                  ['Ärmel kürzen','ab ₺200','48 Std'],
                  ['Abendkleid reparieren','ab ₺350','48 Std'],
                  ['Brautkleid ändern','ab ₺500','3–5 Tage'],
                  ['Herrenanzug maßschneidern','ab ₺2.500','5–7 Tage'],
                  ['Riss reparieren','ab ₺100','Am selben Tag'],
                ].map(([s, p, t], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i % 2 ? 'rgba(184,151,90,.02)' : '#fff' }}>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.88rem' }}>{s}</td>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.88rem', color: p==='KOSTENLOS'?'#22c55e':'#8A6E3E', fontWeight: 600, textAlign: 'right' }}>{p}</td>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.78rem', color: '#7A6E62', textAlign: 'right' }}>{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ background: '#FAF7F2', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '2rem' }}>
              Mobiler Schneider Antalya — Häufig gestellte Fragen
            </h2>
            {[
              ['Gibt es einen mobilen Schneiderservice in Antalya?', `Ja! Der mobile Schneiderservice von Terzi Can kommt zu jeder Adresse in Antalya. Teilen Sie Hotelname oder Standort per WhatsApp mit. WhatsApp: ${PHONE}`],
              ['Ist der Hausbesuch kostenlos?', 'Ja! Der Besuch selbst ist komplett kostenlos — Sie zahlen nur für die Schneiderarbeit. Kürzen ab ₺150, Kleideränderungen ab ₺200.'],
              ['Bedienen Sie Hotels in Belek?', `Ja! Wir kommen zu allen Hotels in Belek, darunter Regnum, Rixos, Kaya Palazzo, Gloria, Delphin, Calista, Maxx Royal und Cornelia. WhatsApp: ${PHONE}`],
              ['Bedienen Sie Hotels in Lara?', `Ja! Wir bedienen alle Hotels in Lara, darunter Titanic Mardan, Delphin Diva, Fame Residence, Akra und Lara Barut Collection. WhatsApp: ${PHONE}`],
              ['Wie schnell kommt der Schneider?', 'Wir bestätigen einen Termin innerhalb von 30 Minuten nach Ihrer WhatsApp-Nachricht. Meist kommt der Schneider noch am selben oder am nächsten Tag.'],
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

        <section style={{ background: '#B8975A', padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.8rem' }}>
            Jetzt Schneider buchen
          </h2>
          <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: '2rem', fontSize: '.92rem' }}>
            Standort teilen — Termin in 30 Min, Lieferung in 24 Stunden
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Standort senden
            </a>
            <a href={`tel:${PHONE_E164}`}
              style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
          <p style={{ marginTop: '1.2rem', fontSize: '.78rem', color: 'rgba(255,255,255,.7)' }}>
            ⭐ 4,9 / 5 · 94 Google-Bewertungen · 09:00–19:00 Mo–Sa
          </p>
        </section>

        <section style={{ padding: '2.5rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>Ähnliche Seiten</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[
                ['English — Mobile Tailor', '/en/hotel-tailor-antalya'],
                ['Русский — Выездной портной', '/ru/vyezdnoy-portnoy-antalya'],
                ['Türkçe — Eve Gelen Terzi', '/terzi/eve-gelen-terzi-antalya'],
                ['← Alle Leistungen', '/terzi'],
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
