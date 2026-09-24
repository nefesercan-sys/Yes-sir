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
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Hello, I need a mobile tailor at my hotel. My location: ')}`;
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
      '@type': 'TailorShop',
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can - Mobile & Hotel Tailor Antalya',
      alternateName: [
        'Hotel Tailor Antalya','Mobile Tailor Antalya','English Speaking Tailor Antalya',
        'Eve Gelen Terzi Antalya','Otele Gelen Terzi Antalya',
      ],
      description: 'Mobile and hotel tailor service in Antalya. We come to your hotel in Belek, Lara, Kemer, Alanya, Side — all Antalya districts. Measurement, tailoring and delivery to your door. Accepts EUR, USD, RUB, TRY and Credit Cards.',
      telephone: PHONE_E164,
      url: SITE_URL,
      priceRange: '₺₺ / €€',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Contactless, Apple Pay',
      knowsLanguage: ['English', 'Russian', 'German', 'Turkish'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '142',
        bestRating: '5',
        worstRating: '1'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        addressCountry: 'TR'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 36.8407,
        longitude: 30.6133
      },
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
        { '@type':'Question', name:'Do you offer a mobile tailor service in Antalya hotels?',
          acceptedAnswer:{'@type':'Answer',text:`Yes! Tailor Can's mobile tailor service comes to any hotel or address across Antalya. Share your hotel name or location on WhatsApp and our tailor will come to measure, sew and deliver. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Which currencies and payment methods do you accept?',
          acceptedAnswer:{'@type':'Answer',text:`We accept EUR, USD, RUB, TRY cash as well as all international credit cards and contactless mobile payments right at your hotel.`} },
        { '@type':'Question', name:'Which hotels do you serve in Belek, Lara and Kemer?',
          acceptedAnswer:{'@type':'Answer',text:`We serve all major hotels including Rixos, Regnum, Maxx Royal, Kaya Palazzo, Delphin, Calista, Gloria and Titanic. WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Is the hotel tailor visit free?',
          acceptedAnswer:{'@type':'Answer',text:`Yes, the hotel visit itself is free — you only pay for the tailoring work. Trouser hemming starts at ₺150 (€5), dress alterations from ₺200 (€7). WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Can I get same-day alterations before an event?',
          acceptedAnswer:{'@type':'Answer',text:`Yes! Tailor Can offers same-day and 24-hour express service across all Antalya hotel zones, including Belek, Lara, Kemer and Alanya. WhatsApp: ${PHONE}`} },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How the Mobile / Hotel Tailor Service Works',
      totalTime: 'PT24H',
      step: [
        { '@type':'HowToStep', name:'Message us on WhatsApp', text:`Send your hotel name or room details to ${PHONE}.` },
        { '@type':'HowToStep', name:'Book a time', text:'Our English-speaking coordinator confirms a suitable time within 30 minutes.' },
        { '@type':'HowToStep', name:'Tailor visits your hotel', text:'Our professional tailor visits your hotel lobby or room, takes measurements and collects the garment.' },
        { '@type':'HowToStep', name:'Fast Delivery', text:'Your finished garment is delivered back to your hotel within 24–48 hours.' },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Mobile Tailor Antalya · Hotel Tailor Service · Terzi Can',
  description: 'Mobile tailor service in Antalya hotels. Belek, Lara, Kemer, Alanya. Same-day alterations, English speaking tailor, accepts EUR/USD/RUB/Cards. ☎ ' + PHONE,
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
    description: 'Mobile tailor service to your hotel in Belek, Lara, Kemer, Alanya and all Antalya districts. Accepts foreign currencies & cards.',
    url: SITE_URL, type: 'website', locale: 'en_US',
  },
  robots: { index: true, follow: true },
};

const DISTRICTS = [
  {name:'Belek', time:'~35 min', desc:'All Belek hotels — Rixos, Regnum, Kaya Palazzo, Gloria, Delphin, Calista, Cornelia, Maxx Royal', slug:'belek'},
  {name:'Lara', time:'~10 min', desc:'All Lara hotels — Delphin Diva, Titanic Mardan, Fame Residence, Akra, Lara Barut Collection', slug:'lara'},
  {name:'Güzeloba', time:'~15 min', desc:'Sherwood, Delphin Imperial, Adalya Elite and other Güzeloba beachfront hotels', slug:'guzeloba'},
  {name:'Kemer', time:'~45 min', desc:'All Kemer hotels — Maxx Royal Kemer, Club Med Palmiye, Rixos Sungate, Sentido Perissia', slug:'kemer'},
  {name:'Alanya', time:'~1.5 hr', desc:'Alanya center and surroundings — Mahmutlar, Oba, Konaklı, Avsallar'},
  {name:'Muratpaşa / Liman', time:'~5 min', desc:'City center, Kaleiçi, Şirinyalı, Fener'},
  {name:'Konyaaltı', time:'Local', desc:'Terzi Can workshop — Hurma, Uncalı, Arapsuyu, Sarısu'},
  {name:'Side', time:'~1 hr', desc:'Side, Sorgun, Kumköy, Evrenseki hotels', slug:'side'},
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

        {/* HERO SECTION WITH IMAGE SEO & TRUST BADGES */}
        <section style={{ background: 'linear-gradient(135deg,#1C1814 0%,#2E2820 100%)', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '.68rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
                ⭐ 4.9/5 Rated Hotel Tailor Service · All Antalya
              </div>
              <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', marginBottom: '1.2rem' }}>
                Mobile Tailor Antalya<br />
                <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>We Come to Your Hotel</span>
              </h1>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
                <strong style={{ color: '#fff' }}>Tailor Can</strong> comes directly to your hotel room or lobby across <strong style={{ color: '#D4B07A' }}>Belek, Lara, Kemer, Side, and Alanya</strong>. 
                Professional measurement, emergency dress alterations, suit repairs, and express 24h room delivery. 
                <span style={{ display: 'block', marginTop: '.5rem', color: '#D4B07A', fontSize: '.9rem' }}>💳 We accept EUR, USD, RUB, TRY & Credit Cards.</span>
              </p>

              {/* Trust Badges */}
              <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {[
                  ['⭐', '4.9/5 Google Rating'],
                  ['🏨', 'All Hotels Covered'],
                  ['💳', 'EUR / USD / Cards Accepted'],
                  ['⚡', '24h Express Delivery'],
                ].map(([icon, text]) => (
                  <span key={icon} style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.8)', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', padding: '.35rem .8rem', borderRadius: '4px' }}>
                    {icon} {text}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  style={{ background: '#25d366', color: '#fff', padding: '1rem 2.2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.88rem', letterSpacing: '.1em', textTransform: 'uppercase', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                  💬 WhatsApp — Call Tailor to Hotel
                </a>
                <a href={`tel:${PHONE_E164}`}
                  style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '1rem 1.8rem', textDecoration: 'none', fontSize: '.88rem', borderRadius: '4px' }}>
                  📞 {PHONE}
                </a>
              </div>
            </div>

            {/* Image SEO Element */}
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(184,151,90,0.3)' }}>
              <img 
                src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80&auto=format&fit=crop" 
                alt="Professional tailor measuring suit for hotel guest in Antalya Belek and Lara" 
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '1.5rem 1rem 1rem', color: '#fff', fontSize: '.8rem' }}>
                📍 Serving Luxury Hotels across Belek, Lara, Kemer & Kundu
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.6rem' }}>
              How the Hotel Tailor Service Works
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.9rem', marginBottom: '2.5rem' }}>Seamless tailoring service delivered to your hotel in 4 easy steps</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1px', background: '#E8E0D2' }}>
              {[
                ['📍', 'Message on WhatsApp', `Send your hotel name and room or request to ${PHONE}`],
                ['📞', 'Quick Confirmation', 'Our English-speaking team confirms appointment within 30 minutes'],
                ['✂️', 'Tailor Visits Hotel', 'Our professional mobile tailor visits your hotel room or lobby'],
                ['🚗', '24h Room Delivery', 'Finished garment delivered back to your hotel door'],
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

        {/* DISTRICTS */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Hotel Tailor Service Across All Antalya Districts
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2.5rem' }}>Fast dispatch from our Konyaaltı and Lara stations to resort regions</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
              {DISTRICTS.map(({name, time, desc, slug}) => {
                const CardTag: any = slug ? Link : 'div';
                const cardProps = slug ? { href: `/en/hotel-tailor-antalya/${slug}` } : {};
                return (
                  <CardTag key={name} {...cardProps} style={{ background: '#fff', border: '1px solid rgba(184,151,90,.15)', borderRadius: '2px', padding: '1.4rem', borderLeft: '3px solid #B8975A', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
                      <strong style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#1C1814' }}>📍 {name}</strong>
                      <span style={{ fontSize: '.7rem', color: '#B8975A', fontWeight: 600, letterSpacing: '.08em' }}>{time}</span>
                    </div>
                    <p style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{desc}</p>
                    {slug && <p style={{ fontSize: '.72rem', color: '#B8975A', fontWeight: 600, marginTop: '.5rem' }}>View {name} hotel list →</p>}
                  </CardTag>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOTELS LIST */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Partner & Frequently Visited Antalya Hotels
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>
              We regularly visit all major resort hotels in Antalya. No need to consult the concierge desk — message us directly on WhatsApp for fast service.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.5rem' }}>
              {HOTELS.map(hotel => (
                <span key={hotel} style={{ fontSize: '.77rem', color: '#3A3028', background: '#F2EDE4', border: '1px solid rgba(184,151,90,.2)', padding: '.3rem .75rem', borderRadius: '2px' }}>
                  {hotel}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '.8rem', color: '#7A6E62', fontStyle: 'italic' }}>
              + Any other hotel or villa in Antalya region. Just tell us your hotel name via WhatsApp.
            </p>
            <div style={{ marginTop: '1.8rem' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                style={{ background: '#25d366', color: '#fff', padding: '1rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', borderRadius: '4px', display: 'inline-block' }}>
                💬 Tell Us Your Hotel Name → Tailor Dispatched
              </a>
            </div>
          </div>
        </section>

        {/* PRICES & CURRENCY ACCEPTANCE */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Transparent Tourist Pricing (TRY, EUR, USD, RUB)
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.85rem', marginBottom: '1.5rem' }}>Hotel visit fee is 100% FREE — you only pay for professional tailoring work.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Service', 'Price (TRY / EUR)', 'Turnaround'].map(h => (
                    <th key={h} style={{ textAlign: h==='Service'?'left':'right', padding: '.7rem .8rem', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Hotel Visit / Measurement','FREE','—'],
                  ['Trouser / Pant Hemming','₺150+ (~€5)','24h'],
                  ['Zipper Replacement','₺120+ (~€4)','Same day'],
                  ['Dress / Jacket Alteration','₺200+ (~€7)','48h'],
                  ['Sleeve Shortening','₺200+ (~€7)','48h'],
                  ['Evening Gown Repair','₺350+ (~€12)','48h'],
                  ['Wedding Dress Alteration','₺500+ (~€17)','3–5 days'],
                  ['Men\'s Suit Tailoring','₺2,500+ (~€85)','5–7 days'],
                  ['Tear Repair','₺100+ (~€3)','Same day'],
                ].map(([s, p, t], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i % 2 ? 'rgba(184,151,90,.02)' : '#fff' }}>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.88rem' }}>{s}</td>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.88rem', color: p==='FREE'?'#22c55e':'#8A6E3E', fontWeight: 600, textAlign: 'right' }}>{p}</td>
                    <td style={{ padding: '.85rem .8rem', fontSize: '.78rem', color: '#7A6E62', textAlign: 'right' }}>{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '1rem', fontSize: '.8rem', color: '#7A6E62', textAlign: 'center' }}>
              💳 Accepted Payments: Cash (TRY, EUR, USD, RUB) & Credit Cards / Contactless / Apple Pay.
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section style={{ background: '#FAF7F2', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '2rem' }}>
              Mobile & Hotel Tailor Antalya — FAQ
            </h2>
            {[
              ['Do you offer mobile tailor service directly to hotel rooms?', `Yes! Tailor Can's mobile tailor service visits any hotel across Antalya. Share your hotel name and room number on WhatsApp. WhatsApp: ${PHONE}`],
              ['What currencies and payment methods do you accept?', 'We accept cash in TRY, EUR, USD, and RUB, as well as all international credit cards, contactless cards, and mobile payments right at your hotel.'],
              ['Is the hotel visit free of charge?', 'Yes! The hotel visit and measurement session is completely free — you only pay for the tailoring work itself.'],
              ['Do you serve Belek and Lara luxury hotels?', `Yes! We regularly visit all hotels in Belek, Lara, Kundu, Kemer, Side, and Alanya. WhatsApp: ${PHONE}`],
              ['How fast can the tailor arrive at my hotel?', 'We confirm an appointment within 30 minutes on WhatsApp. The tailor typically arrives the same day.'],
              ['Do your tailors speak English?', `Yes, our customer coordinators and senior tailors speak fluent English, Russian, German, and Turkish.`],
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

        {/* CTA SECTION */}
        <section style={{ background: '#B8975A', padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.8rem' }}>
            Need an Urgent Tailor at Your Hotel?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: '2rem', fontSize: '.92rem' }}>
            Send your hotel name on WhatsApp — booking within 30 min, room delivery within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Dispatch Tailor to Hotel
            </a>
            <a href={`tel:${PHONE_E164}`}
              style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
          <p style={{ marginTop: '1.2rem', fontSize: '.78rem', color: 'rgba(255,255,255,.7)' }}>
            Open daily · 09:00–19:00 · English, Russian, German & Turkish spoken
          </p>
        </section>

        {/* RELATED LINKS */}
        <section style={{ padding: '2.5rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>Related Pages & Languages</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[
                ['Русский — Выездной портной', '/ru/vyezdnoy-portnoy-antalya'],
                ['Deutsch — Schneider Service', '/de/schneider-service-hotel-antalya'],
                ['Türkçe — Eve Gelen Terzi', '/terzi/eve-gelen-terzi-antalya'],
                ['Belek Hotel Tailor', '/en/hotel-tailor-antalya/belek'],
                ['Lara Hotel Tailor', '/en/hotel-tailor-antalya/lara'],
                ['Kemer Hotel Tailor', '/en/hotel-tailor-antalya/kemer'],
                ['Side Hotel Tailor', '/en/hotel-tailor-antalya/side'],
                ['← All Antalya Services', '/terzi'],
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
