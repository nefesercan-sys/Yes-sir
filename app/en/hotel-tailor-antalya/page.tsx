import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/en/hotel-tailor-antalya';
const TR_URL = 'https://swaphubs.com/terzi/eve-gelen-terzi-antalya';
const RU_URL = 'https://swaphubs.com/ru/vyezdnoy-portnoy-antalya';
const DE_URL = 'https://swaphubs.com/de/schneider-service-hotel-antalya';
const PARENT_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Hello, I need a mobile tailor. My location: ')}`;
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
      name: 'Mobile Tailor Antalya — Hotel Tailor Service',
      alternateName: [
        'Hotel Tailor Antalya','Mobile Tailor Antalya','English Speaking Tailor Antalya',
        'Eve Gelen Terzi Antalya','Otele Gelen Terzi Antalya',
      ],
      description: 'Mobile tailor service in Antalya. We come to your hotel in Belek, Lara, Kemer, Alanya, Side, Manavgat — all Antalya districts. Measurement, tailoring and delivery to your door.',
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
      name: 'Mobile Tailor Antalya · Hotel Tailor Service · Terzi Can',
      url: SITE_URL,
      description: 'Mobile and hotel tailor service in Antalya. Belek, Lara, Kemer, Alanya and all districts. Same-day and 24-hour alterations. English speaking. ☎ ' + PHONE,
      inLanguage: 'en',
      dateModified: TODAY,
      breadcrumb: {'@id': `${SITE_URL}#breadcrumb`},
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        {position:1, name:'SwapHubs', item:HOME_URL},
        {position:2, name:'Antalya Tailor', item:PARENT_URL},
        {position:3, name:'Mobile Tailor Antalya', item:SITE_URL},
      ].map(i=>({...i,'@type':'ListItem'})),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Do you offer a mobile tailor service in Antalya?',
          acceptedAnswer:{'@type':'Answer',text:`Yes! Tailor Can's mobile tailor service comes to any address across Antalya. Share your hotel name or location on WhatsApp and a tailor will come to measure, sew and deliver. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Which hotels do you serve in Belek, Lara and Kemer?',
          acceptedAnswer:{'@type':'Answer',text:`We serve all major hotels including Rixos, Regnum, Maxx Royal, Kaya Palazzo, Delphin, Calista, Gloria and Titanic. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Is the mobile tailor visit free?',
          acceptedAnswer:{'@type':'Answer',text:`Yes, the home/hotel visit itself is free — you only pay for the tailoring work. Hemming starts at ₺150, dress alterations from ₺200. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Can I get same-day alterations before an event?',
          acceptedAnswer:{'@type':'Answer',text:`Yes! Tailor Can offers same-day and 24-hour mobile tailor service across all Antalya districts, including hotels in Belek, Lara, Kemer and Alanya. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Do you speak English?',
          acceptedAnswer:{'@type':'Answer',text:`Yes, our team speaks English, Russian, German and Turkish. WhatsApp: ${PHONE}`} },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How the Mobile / Hotel Tailor Service Works',
      totalTime: 'PT24H',
      step: [
        { '@type':'HowToStep', name:'Message us on WhatsApp', text:`Send your location or hotel name to ${PHONE}.` },
        { '@type':'HowToStep', name:'Book a time', text:'The tailor confirms a suitable time within 30 minutes.' },
        { '@type':'HowToStep', name:'Tailor visits you', text:'Our mobile tailor arrives at your address, takes measurements and collects the garment.' },
        { '@type':'HowToStep', name:'Delivery', text:'Your finished garment is delivered back to your door within 24–48 hours.' },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Mobile Tailor Antalya · Hotel Tailor Service · Terzi Can',
  description: 'Mobile tailor service in Antalya. We come to your hotel in Belek, Lara, Kemer, Alanya. Same-day alterations, English speaking tailor. ☎ ' + PHONE,
  keywords: [
    'mobile tailor Antalya','hotel tailor Antalya','tailor service Antalya hotel',
    'English speaking tailor Antalya','Belek hotel tailor','Lara hotel tailor',
    'Kemer hotel tailor','Alanya hotel tailor','same day tailor Antalya',
    'dress alteration Antalya hotel','suit alteration Antalya',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { 'tr': TR_URL, 'en': SITE_URL, 'ru': RU_URL, 'de': DE_URL, 'x-default': TR_URL },
  },
  openGraph: {
    title: 'Mobile Tailor Antalya · Hotel Tailor Service',
    description: 'Mobile tailor service to your hotel in Belek, Lara, Kemer, Alanya and all Antalya districts.',
    url: SITE_URL, type: 'website', locale: 'en_US',
  },
  robots: { index: true, follow: true },
};

const DISTRICTS = [
  {name:'Belek', time:'~35 min', desc:'All Belek hotels — Rixos, Regnum, Kaya Palazzo, Gloria, Delphin, Calista, Cornelia, Maxx Royal'},
  {name:'Lara', time:'~10 min', desc:'All Lara hotels — Delphin Diva, Titanic Mardan, Fame Residence, Akra, Lara Barut Collection'},
  {name:'Kemer', time:'~45 min', desc:'All Kemer hotels — Maxx Royal Kemer, Club Med Palmiye, Rixos Sungate, Sentido Perissia'},
  {name:'Alanya', time:'~1.5 hr', desc:'Alanya center and surroundings — Mahmutlar, Oba, Konaklı, Avsallar'},
  {name:'Muratpaşa / Liman', time:'~5 min', desc:'City center, Kaleiçi, Şirinyalı, Fener'},
  {name:'Konyaaltı', time:'Local', desc:'Terzi Can workshop — Hurma, Uncalı, Arapsuyu, Sarısu'},
  {name:'Manavgat / Side', time:'~1 hr', desc:'Side, Sorgun, Kumköy, Evrenseki hotels'},
  {name:'Serik / Döşemealtı', time:'~40 min', desc:'Serik center and surrounding villages'},
];

export default function HotelTailorAntalyaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: 'system-ui,sans-serif', background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '1rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.1)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Tailor</Link>
          {' › '}
          <span>Mobile Tailor Antalya</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814 0%,#2E2820 100%)', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: `url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&auto=format&fit=crop') center/cover`, opacity: .15 }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🚗 Mobile Tailor Service · All Antalya
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: '1.2rem' }}>
              Mobile Tailor Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>We Come to Your Hotel</span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#fff' }}>Tailor Can</strong> comes to <strong style={{ color: '#D4B07A' }}>every district of Antalya</strong> with our mobile tailor service.
              Belek, Lara, Kemer, Alanya — all hotels covered. Measurement, tailoring and delivery to your door.
              24–48 hour express service.
            </p>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[
                ['🇬🇧', 'We come to your hotel'],
                ['🇹🇷', 'Eve ve otele geliyoruz'],
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
                💬 Share Location → Tailor Comes
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
              How the Mobile Tailor Service Works
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.9rem', marginBottom: '2.5rem' }}>Tailor service to your door in 4 steps</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {[
                ['📍', 'Share Your Location on WhatsApp', `Send your location or hotel name to ${PHONE}`],
                ['📞', 'Booking Within 30 Minutes', 'We confirm a time that works for you'],
                ['✂️', 'On-Site Measurement', 'Our tailor visits, takes measurements and collects the garment'],
                ['🚗', '24–48 Hour Delivery', 'The finished garment is delivered to your door'],
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
              Mobile Tailor Service Across All Antalya Districts
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2.5rem' }}>From our Konyaaltı workshop to every district of Antalya</p>
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
              Hotel Tailor Service in Antalya
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>
              We come to all Antalya hotels, including those listed below.
              No need to go through the concierge — just message us directly on WhatsApp.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.5rem' }}>
              {HOTELS.map(hotel => (
                <span key={hotel} style={{ fontSize: '.77rem', color: '#3A3028', background: '#F2EDE4', border: '1px solid rgba(184,151,90,.2)', padding: '.3rem .75rem', borderRadius: '2px' }}>
                  {hotel}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '.8rem', color: '#7A6E62', fontStyle: 'italic' }}>
              + Every other hotel in Antalya. Just tell us your hotel name on WhatsApp and we'll come.
            </p>
            <div style={{ marginTop: '1.8rem' }}>
              <a href={`https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Hello, I need a tailor at my hotel. My hotel: ')}`} target="_blank" rel="noopener noreferrer"
                style={{ background: '#25d366', color: '#fff', padding: '1rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', borderRadius: '4px', display: 'inline-block' }}>
                💬 Tell Us Your Hotel → Tailor Comes
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Mobile / Hotel Tailor Prices
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.85rem', marginBottom: '1.5rem' }}>The visit itself is free — you only pay for the tailoring work</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Service', 'Price', 'Time'].map(h => (
                    <th key={h} style={{ textAlign: h==='Service'?'left':'right', padding: '.7rem .8rem', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Mobile Visit Fee','FREE','—'],
                  ['Pants / Trouser Hemming','₺150+','24h'],
                  ['Zipper Replacement','₺120+','Same day'],
                  ['Dress / Jacket Alteration','₺200+','48h'],
                  ['Sleeve Shortening','₺200+','48h'],
                  ['Evening Gown Repair','₺350+','48h'],
                  ['Wedding Dress Alteration','₺500+','3–5 days'],
                  ['Men\'s Suit Tailoring','₺2,500+','5–7 days'],
                  ['Tear Repair','₺100+','Same day'],
                ].map(([s, p, t], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i % 2 ? 'rgba(184,151,90,.02)' : '#fff' }}>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.88rem' }}>{s}</td>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.88rem', color: p==='FREE'?'#22c55e':'#8A6E3E', fontWeight: 600, textAlign: 'right' }}>{p}</td>
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
              Mobile Tailor Antalya — Frequently Asked Questions
            </h2>
            {[
              ['Do you offer a mobile tailor service in Antalya?', `Yes! Tailor Can's mobile tailor service comes to any address across Antalya. Share your hotel name or location on WhatsApp. WhatsApp: ${PHONE}`],
              ['Is the home/hotel visit free?', 'Yes! The visit itself is completely free — you only pay for the tailoring work. Hemming starts at ₺150, dress alterations from ₺200.'],
              ['Do you serve Belek hotels?', `Yes! We come to all Belek hotels including Regnum, Rixos, Kaya Palazzo, Gloria, Delphin, Calista, Maxx Royal and Cornelia. WhatsApp: ${PHONE}`],
              ['Do you serve Lara hotels?', `Yes! We serve all Lara hotels including Titanic Mardan, Delphin Diva, Fame Residence, Akra and Lara Barut Collection. WhatsApp: ${PHONE}`],
              ['How quickly does the tailor arrive?', 'We confirm an appointment within 30 minutes of your WhatsApp message. The tailor usually arrives the same day or the next day.'],
              ['Do you speak Russian or German too?', `Yes, our team speaks English, Russian, German and Turkish. WhatsApp: ${PHONE}`],
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
            Book Your Mobile Tailor Now
          </h2>
          <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: '2rem', fontSize: '.92rem' }}>
            Share your location — booked within 30 min, delivered within 24 hours
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Share Location
            </a>
            <a href={`tel:${PHONE_E164}`}
              style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
          <p style={{ marginTop: '1.2rem', fontSize: '.78rem', color: 'rgba(255,255,255,.7)' }}>
            ⭐ 4.9 / 5 · 94 Google Reviews · 09:00–19:00 Mon–Sat
          </p>
        </section>

        <section style={{ padding: '2.5rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>Related Pages</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[
                ['Русский — Выездной портной', '/ru/vyezdnoy-portnoy-antalya'],
                ['Deutsch — Schneider Service', '/de/schneider-service-hotel-antalya'],
                ['Türkçe — Eve Gelen Terzi', '/terzi/eve-gelen-terzi-antalya'],
                ['← All Services', '/terzi'],
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
