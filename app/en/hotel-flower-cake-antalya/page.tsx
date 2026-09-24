import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/en/hotel-flower-cake-antalya';
const TR_URL = 'https://swaphubs.com/tr/otele-cicek-pasta-antalya';
const DE_URL = 'https://swaphubs.com/de/hotel-blumen-torte-antalya';
const RU_URL = 'https://swaphubs.com/ru/dostavka-cvetov-otel-antalya';
const PARENT_URL = 'https://swaphubs.com/services';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Hello, I want to order a birthday cake/flowers to my hotel. Hotel name: ')}`;
const TODAY = new Date().toISOString().split('T')[0];

const HOTELS = [
  'Rixos Premium Belek','Regnum Carya','Maxx Royal Belek','Kaya Palazzo Golf Resort',
  'Delphin Imperial','Titanic Mardan Palace','Gloria Golf Resort',
  'Calista Luxury Resort','Susesi Luxury Resort','Adam & Eve Hotel','Lara Barut Collection',
  'Maxx Royal Kemer', 'Rixos Sungate', 'Cullinan Belek'
];

// GEO (Generative Engine Optimization) & SEO Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}#business`,
      name: 'Antalya Hotel Flower & Cake Delivery - SwapHubs',
      alternateName: ['Antalya Florist Delivery', 'Birthday Cake Antalya Hotel', 'Romantic Room Setup Antalya'],
      description: 'Premium flower delivery to hotel Antalya, birthday cake surprise Belek hotel, order red roses Lara hotel Antalya, romantic room decoration Kemer. We deliver directly to your hotel room or lobby.',
      telephone: PHONE_E164,
      url: SITE_URL,
      priceRange: '€€',
      currenciesAccepted: 'EUR, USD, GBP, RUB, TRY',
      paymentAccepted: 'Cash, Credit Card, Contactless, Online Payment Link',
      knowsLanguage: ['English', 'German', 'Russian', 'Turkish'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '124',
        bestRating: '5',
        worstRating: '1'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        addressCountry: 'TR'
      },
      areaServed: [
        {name:'Antalya'},{name:'Belek'},{name:'Lara'},{name:'Kemer'},{name:'Side'},{name:'Kundu'}
      ].map(c=>({...c,'@type':'City'})),
      offers: { '@type': 'Offer', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Flower & Birthday Cake Delivery to Antalya Hotels',
      url: SITE_URL,
      description: 'Order fresh flowers, custom birthday cakes, and romantic room setups directly to your hotel in Antalya, Belek, Lara. WhatsApp fast booking.',
      inLanguage: 'en',
      dateModified: TODAY,
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Can I get flower delivery to my hotel in Antalya?',
          acceptedAnswer:{'@type':'Answer',text:`Yes, we provide direct flower delivery to all hotels in Antalya, including Belek, Lara, and Kemer. We hand-deliver to the reception or coordinate for room delivery.`} },
        { '@type':'Question', name:'Do you deliver birthday cakes to Belek and Lara hotels?',
          acceptedAnswer:{'@type':'Answer',text:`Absolutely. We deliver freshly baked artisan birthday cakes directly to luxury resorts like Rixos, Maxx Royal, Regnum, and Delphin. Send us your hotel name via WhatsApp: ${PHONE}`} },
        { '@type':'Question', name:'Can I order a romantic room decoration in Kemer or Antalya?',
          acceptedAnswer:{'@type':'Answer',text:`Yes, our romantic room decoration service includes red rose petals, LED candles, and balloons set up directly in your hotel room before you arrive or while you are at dinner.`} },
        { '@type':'Question', name:'What currencies do you accept for hotel deliveries?',
          acceptedAnswer:{'@type':'Answer',text:`We accept Cash (EUR, USD, GBP, RUB, TRY) upon delivery, as well as Credit Cards and secure online payment links.`} },
      ],
    }
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Flower & Cake Delivery Antalya Hotels | Birthday Surprises',
  description: 'Order fresh flowers, birthday cakes, and romantic room setups delivered directly to your hotel in Antalya, Belek, Lara, Kemer. Same-day delivery available. ☎ ' + PHONE,
  keywords: [
    'flower delivery to hotel Antalya', 'birthday cake surprise Belek hotel', 
    'order red roses Lara hotel Antalya', 'romantic room decoration Kemer',
    'florist delivery Antalya resort', 'surprise cake hotel Antalya'
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': SITE_URL,
      'de': DE_URL,
      'ru': RU_URL,
      'tr': TR_URL,
      'x-default': SITE_URL
    },
  },
  openGraph: {
    title: 'Hotel Flower & Cake Delivery Antalya',
    description: 'Surprise your loved ones on their holiday. Fresh flowers, birthday cakes, and romantic setups delivered to Belek, Lara, and Kemer hotels.',
    url: SITE_URL, type: 'website', locale: 'en_US',
    images: [{ url: 'https://images.unsplash.com/photo-1582734138676-e24c568f947f?w=1200&q=80', width: 1200, height: 630, alt: 'Romantic hotel room setup Antalya' }],
  },
  robots: { index: true, follow: true },
};

export default function HotelFlowerCakePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: 'system-ui,sans-serif', background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '1rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.1)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/services" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Services</Link>
          {' › '}
          <span>Hotel Flower & Cake Delivery</span>
        </nav>

        {/* HERO SECTION */}
        <section style={{ background: 'linear-gradient(135deg,#1C1814 0%,#3A2624 100%)', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '.68rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#E5A4B4', marginBottom: '1rem' }}>
                ⭐ 5-Star Hotel Surprise Service
              </div>
              <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 700, lineHeight: 1.1, color: '#fff', marginBottom: '1.2rem' }}>
                Surprise Them on <br />
                <span style={{ color: '#E5A4B4', fontStyle: 'italic' }}>Their Holiday</span>
              </h1>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
                Premium <strong style={{ color: '#fff' }}>Flower Delivery, Birthday Cakes, and Romantic Room Decorations</strong> directly to your hotel in <strong style={{ color: '#E5A4B4' }}>Belek, Lara, and Kemer</strong>. We handle the logistics with your hotel concierge to create an unforgettable anniversary or birthday surprise.
                <span style={{ display: 'block', marginTop: '.5rem', color: '#E5A4B4', fontSize: '.85rem' }}>💳 We accept EUR, USD, GBP, RUB & Credit Cards.</span>
              </p>

              {/* Trust Badges */}
              <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {[
                  ['🌹', 'Premium Roses'],
                  ['🎂', 'Artisan Fresh Cakes'],
                  ['🏨', 'Direct Room Delivery'],
                  ['⚡', 'Same-Day Service'],
                ].map(([icon, text]) => (
                  <span key={icon} style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.9)', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(229,164,180,.3)', padding: '.4rem .8rem', borderRadius: '4px' }}>
                    {icon} {text}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  style={{ background: '#25d366', color: '#fff', padding: '1rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.9rem', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '.5rem', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)' }}>
                  💬 WhatsApp to Order
                </a>
              </div>
            </div>

            {/* Image SEO Element */}
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(229,164,180,0.3)' }}>
              <img 
                src="https://images.unsplash.com/photo-1582734138676-e24c568f947f?w=800&q=80&auto=format&fit=crop" 
                alt="Romantic flower and cake setup in a luxury hotel room in Antalya" 
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', padding: '1.5rem 1rem 1rem', color: '#fff', fontSize: '.8rem' }}>
                📍 Delivered to all luxury resorts across Belek, Lara, and Kemer.
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES & PRICING */}
        <section style={{ background: '#fff', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#1C1814', textAlign: 'center', marginBottom: '1rem' }}>
              Our Premium Surprise Packages
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.9rem', textAlign: 'center', marginBottom: '3rem' }}>
              Choose a package, tell us your hotel name, and we handle the magic seamlessly.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '2rem' }}>
              
              {/* Package 1 */}
              <div style={{ border: '1px solid rgba(184,151,90,.2)', borderRadius: '4px', overflow: 'hidden', background: '#FAF7F2' }}>
                <div style={{ background: '#3A2624', padding: '1.5rem', color: '#E5A4B4', textAlign: 'center', fontSize: '1.2rem', fontFamily: 'Georgia,serif' }}>
                  💐 Classic Elegance
                </div>
                <div style={{ padding: '2rem 1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1C1814' }}>Premium Flower Bouquet</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: '#7A6E62', fontSize: '.85rem', lineHeight: 1.8 }}>
                    <li>✓ 21, 50 or 100 Premium Red/Pink Roses</li>
                    <li>✓ Luxury wrapping and custom ribbon</li>
                    <li>✓ Personalized greeting card included</li>
                    <li>✓ Direct delivery to hotel lobby or room</li>
                  </ul>
                  <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: '#B8975A', color: '#fff', padding: '.8rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.9rem' }}>
                    Order Flowers →
                  </a>
                </div>
              </div>

              {/* Package 2 */}
              <div style={{ border: '2px solid #B8975A', borderRadius: '4px', overflow: 'hidden', background: '#fff', position: 'relative', transform: 'scale(1.03)', zIndex: 2, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                <div style={{ position: 'absolute', top: '.5rem', right: '1rem', background: '#E5A4B4', color: '#fff', fontSize: '.65rem', padding: '.2rem .6rem', borderRadius: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>Most Popular</div>
                <div style={{ background: '#B8975A', padding: '1.5rem', color: '#fff', textAlign: 'center', fontSize: '1.2rem', fontFamily: 'Georgia,serif' }}>
                  🎂 Birthday Surprise
                </div>
                <div style={{ padding: '2rem 1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1C1814' }}>Flowers + Fresh Cake</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: '#7A6E62', fontSize: '.85rem', lineHeight: 1.8 }}>
                    <li>✓ Artisan Birthday Cake (Chocolate/Fruit/Red Velvet)</li>
                    <li>✓ 21 Premium Roses Bouquet</li>
                    <li>✓ Sparklers and Birthday Candles provided</li>
                    <li>✓ Coordinated delivery with hotel restaurant/lobby</li>
                  </ul>
                  <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: '#25d366', color: '#fff', padding: '.8rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.9rem' }}>
                    Order Cake & Flowers →
                  </a>
                </div>
              </div>

              {/* Package 3 */}
              <div style={{ border: '1px solid rgba(184,151,90,.2)', borderRadius: '4px', overflow: 'hidden', background: '#FAF7F2' }}>
                <div style={{ background: '#3A2624', padding: '1.5rem', color: '#E5A4B4', textAlign: 'center', fontSize: '1.2rem', fontFamily: 'Georgia,serif' }}>
                  🥂 Romantic Night
                </div>
                <div style={{ padding: '2rem 1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1C1814' }}>Full Room Decoration</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: '#7A6E62', fontSize: '.85rem', lineHeight: 1.8 }}>
                    <li>✓ Fresh rose petals on bed and floor</li>
                    <li>✓ Romantic LED candles and balloon setup</li>
                    <li>✓ Large Heart Box with Roses & Macarons</li>
                    <li>✓ Set up in your room before you arrive</li>
                  </ul>
                  <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: '#B8975A', color: '#fff', padding: '.8rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.9rem' }}>
                    Book Room Setup →
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ background: '#F2EDE4', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.6rem' }}>
              How to Order to Your Hotel
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginTop: '2rem' }}>
              {[
                ['1. Message Us', 'Text your hotel name, room number, and request on WhatsApp.'],
                ['2. Choose Design', 'We send you catalog photos of cakes and flower arrangements.'],
                ['3. Schedule Time', 'Pick a date and exact time for the surprise delivery.'],
                ['4. Delivered', 'We deliver directly to your hotel reception, restaurant, or room.'],
              ].map(([t, d], i) => (
                <div key={i} style={{ background: '#fff', padding: '1.5rem', borderLeft: '3px solid #E5A4B4', borderRadius: '2px' }}>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#3A2624', marginBottom: '.4rem', fontWeight: 'bold' }}>{t}</div>
                  <div style={{ fontSize: '.8rem', color: '#7A6E62', lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOTELS & DELIVERY ZONES */}
        <section style={{ background: '#fff', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>
              Hotels We Frequently Deliver To
            </h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>
              We have established procedures to deliver safely to lobbies or concierge desks across all major resorts.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              {HOTELS.map(hotel => (
                <span key={hotel} style={{ fontSize: '.77rem', color: '#3A3028', background: '#F2EDE4', border: '1px solid rgba(229,164,180,.3)', padding: '.4rem .8rem', borderRadius: '20px' }}>
                  {hotel}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '.85rem', color: '#B8975A', fontStyle: 'italic' }}>
              + All other hotels, villas, and apartments in Antalya, Kundu, Lara, Belek, and Kemer.
            </p>
          </div>
        </section>

        {/* AI & SEO OPTIMIZED FAQ SECTION */}
        <section style={{ background: '#FAF7F2', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '2rem' }}>
              Frequently Asked Questions
            </h2>
            {[
              ['Can I get flower delivery to my hotel in Antalya?', `Yes, we provide direct flower delivery to all hotels in Antalya, including Belek, Lara, and Kemer. We hand-deliver to the reception or coordinate for room delivery.`],
              ['Do you deliver birthday cakes to Belek and Lara hotels?', `Absolutely. We deliver freshly baked artisan birthday cakes directly to luxury resorts like Rixos, Maxx Royal, Regnum, and Delphin. Send us your hotel name via WhatsApp: ${PHONE}`],
              ['Can I order a romantic room decoration in Kemer or Antalya?', `Yes, our romantic room decoration service includes red rose petals, LED candles, and balloons set up directly in your hotel room before you arrive or while you are at dinner.`],
              ['What currencies do you accept for hotel deliveries?', `We accept Cash (EUR, USD, GBP, RUB, TRY) upon delivery, as well as Credit Cards and secure online payment links.`],
              ['How fast can you deliver a bouquet of roses?', `We offer same-day delivery for standard rose bouquets. For custom birthday cakes or full room decorations, we recommend booking at least 24 hours in advance.`],
            ].map(([q, a], i) => (
              <details key={i} style={{ borderBottom: '1px solid rgba(184,151,90,.1)', padding: '1rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.93rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q} <span style={{ color: '#E5A4B4', fontSize: '1.2rem', fontWeight: 300 }}>+</span>
                </summary>
                <p style={{ marginTop: '.8rem', fontSize: '.84rem', color: '#7A6E62', lineHeight: 1.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section style={{ background: '#3A2624', padding: '5rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2.2rem', color: '#fff', marginBottom: '.8rem' }}>
            Ready to Plan the Perfect Surprise?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.8)', marginBottom: '2.5rem', fontSize: '1rem' }}>
            Our English, German, and Russian speaking team is ready to help you create an unforgettable moment.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.95rem', borderRadius: '4px' }}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* MULTILINGUAL / HREFLANG RELATED LINKS */}
        <section style={{ padding: '2.5rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>Available in other languages</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                ['🇩🇪 Deutsch (Blumenversand Hotel)', DE_URL],
                ['🇷🇺 Русский (Доставка цветов в отель)', RU_URL],
                ['🇹🇷 Türkçe (Otele Çiçek & Pasta)', TR_URL],
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
