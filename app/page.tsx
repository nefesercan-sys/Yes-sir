import type { Metadata } from 'next';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const SITE      = 'https://terzihizmeti.com.tr';
const PHONE     = '+90 531 898 64 18';
const PHONE_TEL = '+905318986418';
const WA_NUM    = '905318986418';
const WA        = (m: string) => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(m)}`;

// Dillere Özel WhatsApp Mesajları
const WA_TR     = WA('Merhaba, terzi hizmeti hakkında bilgi almak istiyorum.');
const WA_EN     = WA('Hello! I am looking for tailor and alteration services in Antalya.');
const WA_RU     = WA('Здравствуйте! Меня интересуют услуги портного и ремонта одежды в Анталье.');
const WA_DE     = WA('Hallo! Ich suche einen Schneider für Änderungsschneiderei in Antalya.');

const MAPS      = 'https://maps.app.goo.gl/QEgSkRoA8Nz8H62g8';
const BIZ       = 'TERZİ Can - Konyaaltı';
const TODAY     = new Date().toISOString().split('T')[0];
const OG        = `${SITE}/terzi-can-hero.jpg`;

// ─── METADATA ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Terzi Can — Konyaaltı Antalya Terzi Hizmeti',
    template: '%s · Terzi Can',
  },
  description:
    'Konyaaltı Antalya terzi hizmeti: paça kısaltma ₺150, fermuar değişimi ₺200, bel daraltma, özel dikim. Hurma, Liman, Sarısu\'ya ücretsiz adrese servis. TR/EN/RU/DE.',
  keywords: [
    // Türkçe
    'terzi Antalya', 'terzi hizmeti', 'Konyaaltı terzi', 'paça kısaltma Antalya', 'fermuar değişimi Antalya',
    'bel daraltma Antalya', 'elbise dikimi Antalya', 'gelinlik tadilatı Antalya', 'kuru temizleme Antalya',
    'Hurma terzi', 'Liman terzi', 'Sarısu terzi', 'Uncalı terzi', 'eve gelen terzi Antalya',

    // English (İngilizce AI & Arama)
    'tailor Antalya', 'tailor Konyaaltı', 'alterations Antalya', 'pants hemming Antalya', 'zipper replacement Antalya',
    'dressmaker Antalya', 'suit tailor Antalya', 'mobile tailor Antalya', 'clothing repair Antalya',
    'tailor in Hurma', 'tailor in Liman', 'dry cleaning Antalya', 'english speaking tailor Antalya',

    // Русский (Rusça AI & Arama)
    'портной Анталья', 'ателье Анталья', 'ателье Коньяалты', 'ремонт одежды Анталья', 'укоротить брюки Анталья',
    'замена молнии Анталья', 'подгонка одежды Анталья', 'пошив платья Анталья', 'химчистка Анталья',
    'портной Хурма', 'портной Лиман', 'портной Сарысу', 'русскоязычный портной Анталья', 'выездной портной Анталья',

    // Deutsch (Almanca AI & Arama)
    'Schneider Antalya', 'Änderungsschneiderei Antalya', 'Änderungsschneiderei Konyaaltı', 'Hose kürzen Antalya',
    'Reißverschluss reparieren Antalya', 'Kleidung anpassen Antalya', 'Maßschneiderei Antalya', 'Textilreinigung Antalya',
  ],
  authors: [{ name: BIZ, url: SITE }],
  creator: BIZ,
  publisher: 'SwapHubs',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // NOT: Ana sayfanın kendi çeviri karşılığı yok (marka/hub sayfası).
  // Gerçek EN/RU/DE karşılıkları /antalya-terzi kümesinde (bkz. o sayfanın
  // alternates.languages tanımı) — burada olmayan bir sayfayı varmış gibi
  // göstermemek için hreflang sadece kendine (x-default) işaret eder.
  alternates: {
    canonical: SITE,
    languages: {
      'tr-TR': SITE,
      'x-default': SITE,
    },
  },
  openGraph: {
    title: 'Terzi Can Antalya — Tailor & Alterations | Портной Анталья',
    description: 'Professional tailoring & alteration service in Konyaaltı, Antalya. English, Russian, German & Turkish spoken. ☎ ' + PHONE,
    url: SITE, siteName: 'Terzi Hizmeti', locale: 'tr_TR',
    alternateLocale: ['en_US', 'ru_RU', 'de_DE'],
    type: 'website',
    images: [{ url: OG, width: 1024, height: 1024, alt: 'Terzi Can Antalya — Tailor Workshop Konyaaltı', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terzi Can Antalya | Tailor & Alterations | Портной',
    description: 'Konyaaltı tailor workshop. Alterations, hemming, zipper replacement, dressmaking. ☎ ' + PHONE,
    images: [OG],
  },
  other: {
    'geo.region': 'TR-07', 'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8820;30.6980', 'ICBM': '36.8820, 30.6980',
    'contact': PHONE,
  },
  verification: {
    google: 'W2S_Gr49EgkgWG7xAWWMc5qPW6Cw3wEnOi6O6UC9zkQ',
  },
};

// ─── JSON-LD — MULTI-LINGUAL AI + GOOGLE STRUCTURED DATA ─────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE}#website`,
      name: 'Terzi Hizmeti — Tailor Can Antalya',
      url: SITE,
      inLanguage: ['tr', 'en', 'ru', 'de'],
      description: 'Professional tailor and alteration service in Konyaaltı, Antalya (Turkish, English, Russian, German).',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      additionalType: ['https://schema.org/SewingService', 'https://schema.org/DryCleaningService'],
      '@id': `${SITE}#business`,
      name: BIZ,
      alternateName: [
        'Terzi Can', 'Terzi Can Antalya', 'Konyaaltı Terzi',
        'Tailor Can Antalya', 'Tailor Antalya', 'English Speaking Tailor Antalya',
        'Портной Кан Анталья', 'Ателье Анталья Хурма', 'Русский портной Анталья',
        'Schneider Can Antalya', 'Änderungsschneiderei Konyaaltı',
      ],
      description:
        'Professional tailor and clothing alteration workshop in Konyaaltı, Antalya since 2017. Services: pants hemming, zipper replacement, waist adjustment, dressmaking, wedding dress alterations, dry cleaning. Mobile tailor service to Hurma, Liman, Sarisu, Gursu, Uncali. We speak English, Russian, German, and Turkish.',
      url: SITE,
      telephone: PHONE_TEL,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD, RUB',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: OG,
      logo: `${SITE}/terzi-can-hero.jpg`,
      hasMap: MAPS,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hurma Mahallesi',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07130',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8820, longitude: 30.6980 },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00', closes: '19:00',
      }],
      areaServed: [
        'Liman, Konyaaltı', 'Hurma, Konyaaltı', 'Sarısu, Konyaaltı',
        'Gürsu, Konyaaltı', 'Uncalı, Konyaaltı', 'Konyaaltı', 'Muratpaşa', 'Kepez', 'Antalya',
        'Lara', 'Güzeloba', 'Belek', 'Kemer', 'Side', 'Alanya',
      ].map(n => ({ '@type': 'Place', name: n })),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: PHONE_TEL,
          contactType: 'customer service',
          availableLanguage: ['Turkish', 'English', 'Russian', 'German'],
          areaServed: 'TR',
        }
      ],
      sameAs: [MAPS, `https://wa.me/${WA_NUM}`, 'https://swaphubs.com/terzi'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Tailor Services Antalya 2026 / Услуги Ателье Анталья',
        itemListElement: [
          { '@type': 'Offer', name: 'Pants Hemming / Paça Kısaltma / Укоротить брюки', price: '150', priceCurrency: 'TRY', priceValidUntil: '2026-12-31', availability: 'https://schema.org/InStock', itemOffered: { '@type': 'Service', name: 'Pants & Jeans Hemming', description: 'Hemming for pants, jeans, skirts, dresses. Same day service.' } },
          { '@type': 'Offer', name: 'Zipper Replacement / Fermuar Değişimi / Замена молнии', price: '200', priceCurrency: 'TRY', priceValidUntil: '2026-12-31', availability: 'https://schema.org/InStock', itemOffered: { '@type': 'Service', name: 'Zipper Repair & Replacement', description: 'Zipper replacement for jackets, pants, coats, bags.' } },
          { '@type': 'Offer', name: 'Waist & Dress Alterations / Bel Daraltma / Подгонка по фигуре', price: '150', priceCurrency: 'TRY', priceValidUntil: '2026-12-31', availability: 'https://schema.org/InStock', itemOffered: { '@type': 'Service', name: 'Clothing Alterations', description: 'Resizing dresses, coats, suits, pants.' } },
          { '@type': 'Offer', name: 'Custom Dressmaking / Özel Elbise Dikimi / Индивидуальный пошив', price: '600', priceCurrency: 'TRY', priceValidUntil: '2026-12-31', availability: 'https://schema.org/InStock', itemOffered: { '@type': 'Service', name: 'Custom Tailoring', description: 'Custom dresses, suits, shirts made to measure.' } },
          { '@type': 'Offer', name: 'Wedding & Evening Dress Alterations / Gelinlik & Abiye / Ремонт свадебных платьев', price: '400', priceCurrency: 'TRY', priceValidUntil: '2026-12-31', availability: 'https://schema.org/InStock', itemOffered: { '@type': 'Service', name: 'Wedding Dress Alterations', description: 'Precision fitting and repairs for wedding and evening dresses.' } },
          { '@type': 'Offer', name: 'Dry Cleaning & Pressing / Kuru Temizleme & Ütü / Химчистка и глажка', price: '80', priceCurrency: 'TRY', priceValidUntil: '2026-12-31', availability: 'https://schema.org/InStock', itemOffered: { '@type': 'Service', name: 'Dry Cleaning & Ironing', description: 'Steam ironing, dry cleaning with hotel pick-up.' } },
          { '@type': 'Offer', name: 'Mobile Tailor Service / Eve Gelen Terzi / Выездной портной', availability: 'https://schema.org/InStock', itemOffered: { '@type': 'Service', name: 'Mobile Pickup & Delivery Tailor', description: 'Home pickup and delivery service in Konyaalti (Hurma, Liman, Sarisu free).' } },
        ],
      },
      knowsLanguage: ['tr', 'en', 'ru', 'de'],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE}#webpage`,
      name: 'Terzi Can Antalya — Tailor & Alteration Services (TR / EN / RU / DE)',
      url: SITE,
      isPartOf: { '@id': `${SITE}#website` },
      about: { '@id': `${SITE}#business` },
      inLanguage: ['tr', 'en', 'ru', 'de'],
      datePublished: '2024-01-01',
      dateModified: TODAY,
      breadcrumb: { '@id': `${SITE}#breadcrumb` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#services','#faq','#hero-desc','#foreign-lang-cards'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Terzi Can', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Tailor Services', item: `${SITE}/#services` },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}#faq`,
      mainEntity: [
        { '@type': 'Question', name: 'Is there an English or Russian speaking tailor in Antalya?', acceptedAnswer: { '@type': 'Answer', text: `Yes! Terzi Can in Konyaaltı provides tailor and alteration services in English, Russian, German, and Turkish. Contact via WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Есть ли портной в Анталье, который говорит по-русски?', acceptedAnswer: { '@type': 'Answer', text: `Да! Ателье Terzi Can в Коньяалты обслуживает на русском языке. Подгонка одежды, ремонт, укорачивание брюк, замена молний, химчистка. Бесплатный выезд в Хурма, Лиман, Сарысу. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Gibt es einen deutschsprachigen Schneider in Antalya?', acceptedAnswer: { '@type': 'Answer', text: `Ja! Terzi Can in Konyaaltı bietet Änderungsschneiderei auf Deutsch, Englisch, Russisch und Türkisch. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'What is the price for pants hemming in Antalya 2026?', acceptedAnswer: { '@type': 'Answer', text: `Pants and jeans hemming starts from ₺150 at Terzi Can Konyaaltı. Same day delivery available. ☎ ${PHONE}` } },
        { '@type': 'Question', name: 'Сколько стоит укоротить брюки в Анталье?', acceptedAnswer: { '@type': 'Answer', text: `Укоротить брюки или джинсы стоит от ₺150. Готовность в тот же день. ☎ ${PHONE}` } },
        { '@type': 'Question', name: 'Do you offer mobile tailor pickup service in Hurma, Liman, Sarisu?', acceptedAnswer: { '@type': 'Answer', text: `Yes! We offer free mobile tailor pickup and delivery in Hurma, Liman, and Sarisu (Konyaalti). ☎ ${PHONE}` } },
        { '@type': 'Question', name: 'Antalya paça kısaltma ve fermuar değişimi fiyatları 2026?', acceptedAnswer: { '@type': 'Answer', text: `Paça kısaltma ₺150'den, fermuar değişimi ₺200'den başlar. Aynı gün teslim. ☎ ${PHONE}` } },
      ],
    },
  ],
};

// ─── STYLES & DATA ────────────────────────────────────────────────────────────
const C = {
  bg:    '#F8F5F0',
  bg2:   '#F2EDE5',
  bg3:   '#EDE6DA',
  dark:  '#2C4A3E',
  gold:  '#C9A96E',
  text:  '#1A1A1A',
  muted: '#6B7057',
};

const SERVICES = [
  { n:'01', title:'Paça Kısaltma', en:'Pants Hemming', ru:'Укоротить брюки', sub:'Pantolon · Etek · Kot / Pants · Skirts', desc:'Erkek ve bayan pantolon, kot, etek paça kısaltma — temiz, görünmez dikiş.', price:'₺150+', time:'Aynı gün / Same day', wa:WA_TR, img:'https://images.pexels.com/photos/6765056/pexels-photo-6765056.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop' },
  { n:'02', title:'Fermuar Değişimi', en:'Zipper Replacement', ru:'Замена молнии', sub:'Pantolon · Mont · Ceket · Çanta', desc:'Pantolon, mont, ceket, sweatshirt ve çanta fermuar değişimi, sıkışan fermuar tamiri.', price:'₺200+', time:'Aynı gün / Same day', wa:WA_TR, img:'https://images.pexels.com/photos/33952439/pexels-photo-33952439.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop' },
  { n:'03', title:'Bel Daraltma & Tadilat', en:'Waist Alterations', ru:'Подгонка по фигуре', sub:'Elbise · Pantolon · Ceket', desc:'Elbise, pantolon ve ceketlerde bel daraltma, vücuda tam oturan ölçü ayarı.', price:'₺150+', time:'24 saat / 24 hrs', wa:WA_TR, img:'https://images.pexels.com/photos/18022030/pexels-photo-18022030.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop' },
  { n:'04', title:'Özel Elbise Dikimi', en:'Custom Tailoring', ru:'Пошив на заказ', sub:'Kadın · Erkek · Çocuk / Women & Men', desc:'Kadın elbisesi, erkek takım elbise, gömlek — ölçünüze özel sıfırdan dikim.', price:'₺600+', time:'3–7 gün / days', wa:WA_TR, img:'https://images.pexels.com/photos/31112215/pexels-photo-31112215.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop' },
  { n:'05', title:'Gelinlik & Abiye Tadilatı', en:'Wedding Dress Alterations', ru:'Ремонт свадебных платьев', sub:'Özel Gün Kıyafetleri / Evening Gowns', desc:'Özel gün kıyafetlerinde hassas daraltma, boy ayarı ve detaylı onarım.', price:'₺400+', time:'24–48 saat / hrs', wa:WA_TR, img:'https://images.pexels.com/photos/8459366/pexels-photo-8459366.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop' },
  { n:'06', title:'Kuru Temizleme & Ütü', en:'Dry Cleaning & Ironing', ru:'Химчистка и глажка', sub:'Profesyonel Bakım / Laundry', desc:'Profesyonel kuru temizleme, buharlı ütü ve pres hizmeti. Otellerden alım.', price:'₺80+', time:'2–48 saat / hrs', wa:WA_TR, img:'https://images.pexels.com/photos/5202797/pexels-photo-5202797.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop' },
  { n:'07', title:'Eve Gelen Terzi', en:'Mobile Tailor Pickup', ru:'Выездной портной', sub:'Hurma · Liman · Sarısu Ücretsiz / Free Pickup', desc:'Araçlı terzi servisi: adresinizde ölçü alma, dikip 24 saatte teslim.', price:'Ücretsiz / Free', time:'24 saat / hrs', wa:WA_TR, img:'https://images.pexels.com/photos/6765658/pexels-photo-6765658.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop' },
  { n:'08', title:'Üniforma & Seri İmalat', en:'Uniform Manufacturing', ru:'Пошив униформы', sub:'Otel · Restoran · Okul / Hotel & Uniforms', desc:'Toplu üniforma üretimi, fason tekstil, seri imalat ve nakış hizmeti.', price:'Teklif Al', time:'Proje bazlı', wa:WA_TR, img:'https://images.pexels.com/photos/5378708/pexels-photo-5378708.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop' },
];

const DISTRICTS = [
  { name:'Hurma', free:true }, { name:'Liman', free:true }, { name:'Sarısu', free:true },
  { name:'Uncalı', free:false }, { name:'Çakırlar', free:false }, { name:'Gürsu', free:false },
  { name:'Öğretmenevleri', free:false }, { name:'Meltem', free:false }, { name:'Göbi', free:false },
  { name:'Arapsuyu', free:false }, { name:'Altınkum', free:false }, { name:'Konyaaltı Merkez', free:false },
];

const FAQS = [
  ['Antalya paça kısaltma fiyatı ne kadar?','₺150\'den başlar. Aynı gün teslim.'],
  ['Is there an English or Russian speaking tailor in Antalya?','Yes! Terzi Can speaks English, Russian, German, and Turkish. Contact us on WhatsApp for fast response.'],
  ['Есть ли портной в Анталье, который говорит по-русски?','Да! Ателье Terzi Can в Коньяалты принимает заказы на русском языке. Подгонка одежды, ремонт, укорачивание брюк, замена молний, химчистка. Бесплатный выезд в Хурма, Лиман, Сарысу.'],
  ['Gibt es einen deutschsprachigen Schneider in Antalya?','Ja! Terzi Can in Konyaaltı bietet Änderungsschneiderei auf Deutsch, Englisch, Russisch und Türkisch. Kundenservice per WhatsApp.'],
  ['Hurma, Liman, Sarısu\'ya ücretsiz servis var mı?','Evet, bu 3 bölgeye ücretsiz alım-teslimat. WhatsApp\'tan adresinizi göndermeniz yeterlidir.'],
  ['What are the prices for zipper replacement & alterations?','Pants hemming starts at ₺150, zipper replacement at ₺200, waist alterations at ₺150. Fast 24-hour turnaround.'],
];

export default function TerziHizmetiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ background: C.bg, color: C.text, fontFamily:"'Inter','Segoe UI',system-ui,sans-serif", lineHeight: 1.6, minHeight:'100vh' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}
          .ff{font-family:'Syne',sans-serif}
          a{color:inherit;text-decoration:none}
          ::-webkit-scrollbar{width:3px}
          ::-webkit-scrollbar-thumb{background:#333}

          .nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:rgba(44,74,62,.97);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.08)}
          .nav-logo{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:#fff;letter-spacing:.04em;display:flex;align-items:center;gap:8px}
          .nav-dot{width:8px;height:8px;border-radius:50%;background:#C9A96E}
          .nav-langs{display:flex;gap:6px;align-items:center}
          .lang-badge{font-size:.68rem;font-weight:700;color:rgba(255,255,255,.75);background:rgba(255,255,255,.1);padding:3px 8px;border-radius:3px;border:1px solid rgba(255,255,255,.15)}
          .nav-wa{display:inline-flex;align-items:center;gap:8px;background:#C9A96E;color:#1E3329;font-weight:800;font-size:.8rem;padding:9px 16px;border-radius:4px;letter-spacing:.03em}

          .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;padding:7.5rem 1.5rem 3.5rem;background:linear-gradient(160deg,#1E3329 0%,#2C4A3E 60%,#3A5A4E 100%)}
          .hero-bg{position:absolute;inset:0;z-index:0}
          .hero-bg-img{width:100%;height:100%;object-fit:cover;object-position:center 30%;filter:brightness(.58) saturate(.85)}
          .hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(30,51,41,.88) 0%,rgba(30,51,41,.45) 45%,rgba(30,51,41,.1) 100%)}
          .hero-content{position:relative;z-index:2;max-width:920px;margin:0 auto;width:100%}
          .hero-tag{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(201,169,110,.5);color:#C9A96E;font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;font-weight:700;padding:6px 14px;border-radius:2px;margin-bottom:1.5rem}
          .hero h1{font-family:'Syne',sans-serif;font-size:clamp(2.6rem,8vw,5.5rem);font-weight:800;line-height:1.02;letter-spacing:-.02em;margin-bottom:1.2rem}
          .hero h1 .accent{color:#C9A96E}
          .hero h1 .sub-line{display:block;font-size:clamp(1.5rem,4.5vw,3rem);color:rgba(255,255,255,.75);font-weight:600;margin-top:.4rem}
          .hero-desc{font-size:1.02rem;color:rgba(255,255,255,.72);max-width:620px;line-height:1.75;margin-bottom:2rem}
          .hero-desc strong{color:#fff}
          .hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:2.5rem}
          .btn-primary{display:inline-flex;align-items:center;gap:10px;background:#C9A96E;color:#1E3329;font-weight:800;font-size:.9rem;padding:14px 24px;border-radius:4px;letter-spacing:.02em;transition:all .2s}
          .btn-primary:hover{background:#B8955A;transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,169,110,.35)}
          .btn-secondary{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,.08);color:#fff;font-weight:600;font-size:.9rem;padding:14px 22px;border-radius:4px;border:1px solid rgba(255,255,255,.15);transition:all .2s}
          .btn-secondary:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.3)}
          
          .hero-stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(201,169,110,.25);padding-top:1.8rem;gap:1rem}
          .stat-n{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#C9A96E;display:block;line-height:1}
          .stat-l{font-size:.65rem;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.12em;margin-top:.3rem;display:block}

          /* YABANCI MÜŞTERİ KARTLARI (EN, RU, DE, TR) */
          .lang-cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:2.5rem}
          .lang-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:6px;padding:14px;backdrop-filter:blur(8px)}
          .lang-card-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
          .lang-flag{font-size:1.1rem;display:flex;align-items:center;gap:6px;font-weight:700;color:#fff;font-size:.85rem}
          .lang-text{font-size:.78rem;color:rgba(255,255,255,.7);line-height:1.5;margin-bottom:10px}
          .lang-btn{display:inline-block;font-size:.7rem;font-weight:700;color:#C9A96E;border:1px solid rgba(201,169,110,.4);padding:4px 10px;border-radius:3px;transition:all .2s}
          .lang-btn:hover{background:#C9A96E;color:#1E3329}

          .ticker-wrap{background:#2C4A3E;padding:.55rem 0;overflow:hidden;white-space:nowrap}
          .ticker-inner{display:inline-flex;animation:ticker 35s linear infinite}
          .ticker-item{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;padding:0 2rem}
          .ticker-dot{color:rgba(255,255,255,.4);margin:0 .5rem}
          @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

          .sec{padding:5rem 1.5rem}
          .ctr{max-width:980px;margin:0 auto}
          .eyebrow{font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:#2C4A3E;font-weight:700;display:block;margin-bottom:.8rem}
          .sec-h{font-family:'Syne',sans-serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;line-height:1.1;margin-bottom:.6rem;color:#1A1A1A}
          .sec-sub{font-size:.92rem;color:#6B7057;max-width:560px;line-height:1.75}
          .sec-head{margin-bottom:2.5rem}

          .svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1px;background:rgba(255,255,255,.05)}
          .svc-card{background:#F2EDE5;transition:background .2s;position:relative;overflow:hidden;display:flex;flex-direction:column}
          .svc-card:hover{background:#EDE6DA}
          .svc-img-wrap{position:relative;width:100%;aspect-ratio:3/2;overflow:hidden;background:#E4DCCC}
          .svc-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease}
          .svc-card:hover .svc-img{transform:scale(1.05)}
          .svc-n-onimg{position:absolute;bottom:.6rem;left:.9rem;font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:rgba(255,255,255,.9);line-height:1;text-shadow:0 1px 6px rgba(0,0,0,.35);z-index:1}
          .svc-body{padding:1.5rem 1.8rem 1.8rem}
          .svc-title{font-size:1.05rem;font-weight:700;color:#1A1A1A;margin-bottom:.2rem}
          .svc-sub{font-size:.7rem;color:#2C4A3E;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.7rem}
          .svc-desc{font-size:.83rem;color:#6B7057;line-height:1.65;margin-bottom:1.2rem}
          .svc-foot{display:flex;align-items:center;justify-content:space-between}
          .svc-price{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:800;color:#2C4A3E}
          .svc-time{font-size:.68rem;color:#8FA88C;font-weight:600}
          .svc-btn{display:inline-block;font-size:.72rem;font-weight:700;color:#2C4A3E;border:1px solid rgba(44,74,62,.25);padding:.4rem 1rem;border-radius:2px;margin-top:.9rem;transition:all .2s}
          .svc-btn:hover{background:rgba(44,74,62,.08);border-color:#2C4A3E}

          .gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem}
          .gallery-item{border-radius:6px;overflow:hidden;aspect-ratio:3/2;box-shadow:0 4px 18px rgba(28,24,20,.08)}
          .gallery-item img{width:100%;height:100%;object-fit:cover;display:block}

          .dist-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
          .dist-card{background:#EDE6DA;border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:12px 14px}
          .dist-card.free{border-color:rgba(74,222,128,.2);background:rgba(74,222,128,.04)}
          .dist-name{font-size:.88rem;font-weight:700;color:#1A1A1A;display:block}
          .dist-tag{font-size:.62rem;color:#6B7057;text-transform:uppercase;letter-spacing:.08em;margin-top:.15rem;display:block}
          .dist-tag.free-tag{color:#2C4A3E;font-weight:700}

          .faq-item{border-bottom:1px solid rgba(44,74,62,.1);padding:1.2rem 0}
          .faq-q{font-weight:700;font-size:.95rem;color:#1A1A1A;margin-bottom:.5rem}
          .faq-a{font-size:.83rem;color:#6B7057;line-height:1.65}

          .cta-final{background:linear-gradient(135deg,#2C4A3E 0%,#1E3329 100%);color:#fff;padding:4rem 1.5rem;text-align:center}
          .cta-h{font-family:'Syne',sans-serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;margin-bottom:.7rem}
          .cta-sub{font-size:.95rem;color:rgba(255,255,255,.8);margin-bottom:2rem}
          .cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
          .btn-white{display:inline-flex;align-items:center;gap:10px;background:#C9A96E;color:#1E3329;font-weight:800;font-size:.9rem;padding:14px 24px;border-radius:4px}
          .btn-outline-white{display:inline-flex;align-items:center;gap:10px;background:transparent;color:#fff;font-weight:700;font-size:.9rem;padding:14px 24px;border-radius:4px;border:2px solid rgba(255,255,255,.4)}

          .float{position:fixed;bottom:20px;right:16px;z-index:99;display:flex;flex-direction:column;gap:10px}
          .fbtn{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;box-shadow:0 4px 14px rgba(0,0,0,.4)}
          .fbtn-call{background:#2C4A3E;color:#fff}
          .fbtn-wa{background:#25D366;color:#fff}

          footer{background:#1E3329;border-top:1px solid rgba(201,169,110,.15);padding:2rem 1.5rem;text-align:center;font-size:.74rem;color:rgba(255,255,255,.5)}
          .foot-links{display:flex;justify-content:center;gap:1.2rem;flex-wrap:wrap;margin-top:.7rem}
          .foot-links a{color:rgba(255,255,255,.45)}
          .foot-links a:hover{color:#C9A96E}
        `}</style>

        {/* FLOATING ACTION BUTTONS */}
        <div className="float">
          <a href={`tel:${PHONE_TEL}`} className="fbtn fbtn-call" aria-label="Call Tailor">📞</a>
          <a href={WA_TR} target="_blank" rel="noopener noreferrer" className="fbtn fbtn-wa" aria-label="WhatsApp Tailor">💬</a>
        </div>

        {/* HEADER / NAVIGATION */}
        <nav className="nav" aria-label="Navigation">
          <div className="nav-logo">
            <span className="nav-dot" aria-hidden="true"/>
            TERZİ CAN
          </div>
          <div className="nav-langs">
            <span className="lang-badge">TR</span>
            <span className="lang-badge">EN</span>
            <span className="lang-badge">RU</span>
            <span className="lang-badge">DE</span>
          </div>
          <a href={WA_TR} target="_blank" rel="noopener noreferrer" className="nav-wa">
            WHATSAPP →
          </a>
        </nav>

        {/* HERO SECTION */}
        <section className="hero" id="main" aria-labelledby="hero-h">
          <div className="hero-bg" aria-hidden="true">
            <img src="/terzi-can-hero.jpg" alt="" className="hero-bg-img" width={1024} height={1024} />
            <div className="hero-overlay"/>
          </div>

          <div className="hero-content">
            <span className="hero-tag">
              <span style={{width:6,height:6,borderRadius:'50%',background:'#C9A96E',display:'inline-block'}}/>
              Antalya · Konyaaltı Terzi Atölyesi
            </span>

            <h1 id="hero-h">
              Her Dikiş,
              <span className="accent"> Tam Ölçünüze</span>
              <span className="sub-line">Tailor · Alterations · Ателье · Schneider</span>
            </h1>

            <p className="hero-desc" id="hero-desc">
              <strong>Terzi Can</strong> — Antalya Konyaaltı'da profesyonel terzi ve dikiş atölyesi. Paça kısaltma, fermuar değişimi, bel daraltma, özel dikim, gelinlik tadilatı ve kuru temizleme. Hurma, Liman, Sarısu bölgelerine <strong style={{color:'#8FA88C'}}>ücretsiz terzi servisi</strong>.
            </p>

            {/* YABANCI MÜŞTERİ HIZLI ERİŞİM KARTLARI */}
            <div className="lang-cards-grid" id="foreign-lang-cards" aria-label="Language selection">
              <div className="lang-card">
                <div className="lang-card-head">
                  <span className="lang-flag">🇬🇧 English</span>
                </div>
                <div className="lang-text">Tailor & Alteration Service in Konyaaltı. Fast hemming, zipper repair, mobile pickup.</div>
                <a href={WA_EN} target="_blank" rel="noopener noreferrer" className="lang-btn">Chat in English →</a>
              </div>

              <div className="lang-card">
                <div className="lang-card-head">
                  <span className="lang-flag">🇷🇺 Русский</span>
                </div>
                <div className="lang-text">Ателье в Коньяалты. Ремонт одежды, подгонка по фигуре, замена молнии.</div>
                <a href={WA_RU} target="_blank" rel="noopener noreferrer" className="lang-btn">Написать по-русски →</a>
              </div>

              <div className="lang-card">
                <div className="lang-card-head">
                  <span className="lang-flag">🇩🇪 Deutsch</span>
                </div>
                <div className="lang-text">Änderungsschneiderei in Antalya Konyaaltı. Hose kürzen, Reißverschluss, Maßfertigung.</div>
                <a href={WA_DE} target="_blank" rel="noopener noreferrer" className="lang-btn">Auf Deutsch schreiben →</a>
              </div>

              <div className="lang-card">
                <div className="lang-card-head">
                  <span className="lang-flag">🇹🇷 Türkçe</span>
                </div>
                <div className="lang-text">Konyaaltı'da hızlı terzi, tamir, tadilat ve adrese teslim terzi servisi.</div>
                <a href={WA_TR} target="_blank" rel="noopener noreferrer" className="lang-btn">WhatsApp'tan Yazın →</a>
              </div>
            </div>

            <div className="hero-btns">
              <a href={WA_TR} target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 WhatsApp İletişim →
              </a>
              <a href={`tel:${PHONE_TEL}`} className="btn-secondary">
                📞 {PHONE}
              </a>
            </div>

            <div className="hero-stats" aria-label="Stats">
              {([
                ['2017\'den', 'Beri Hizmet', 'Konyaaltı merkez'],
                ['0–24s', 'Ekspres Teslim', 'Fast Turnaround'],
                ['4 Dil', 'TR / EN / RU / DE', 'Çok dilli hizmet'],
                ['%100', 'Şeffaf Fiyat', 'Best Quality'],
              ] as [string,string,string][]).map(([n,l,d])=>(
                <div key={l}>
                  <span className="stat-n">{n}</span>
                  <span className="stat-l">{l}</span>
                  <span style={{fontSize:'.65rem',color:'rgba(255,255,255,.35)',display:'block',marginTop:'.1rem'}}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker-wrap" aria-hidden="true">
          <div className="ticker-inner">
            {[...Array(2)].map((_,i)=>(
              <span key={i} style={{display:'inline-flex',alignItems:'center'}}>
                {['Paça Kısaltma','Tailor Antalya','Ателье Анталья','Schneider Konyaaltı','Fermuar Değişimi','Pants Hemming','Замена молнии','Bel Daraltma','Alterations','Eve Gelen Terzi','Mobile Pickup'].map(t=>(
                  <span key={`${i}-${t}`} className="ticker-item">{t}<span className="ticker-dot">✦</span></span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* SUMMARY / INTRODUCTION */}
        <div style={{background:C.bg2,padding:'2.2rem 1.5rem',borderBottom:`1px solid rgba(44,74,62,.10)`}}>
          <p style={{maxWidth:920,margin:'0 auto',fontSize:'.85rem',color:C.muted,lineHeight:1.9,textAlign:'center'}}>
            <strong style={{color:'#2C4A3E'}}>Terzi Can Antalya</strong> — Konyaaltı'da 2017'den bu yana faaliyet gösteren profesyonel terzi atölyesidir. Türkçe, İngilizce, Rusça ve Almanca konuşan ekibimizle hem yerli hem de yabancı misafirlerimize terzilik, kıyafet tamiri, elbise dikimi, gelinlik tadilatı ve kuru temizleme hizmeti sunuyoruz. Hurma, Liman, Sarısu, Gürsu ve Uncalı başta olmak üzere tüm Antalya'ya araçlı terzi servisi sağlıyoruz.
          </p>
        </div>

        {/* SERVICES SECTION */}
        <section className="sec" style={{background:C.bg,paddingTop:'4rem',paddingBottom:0}} id="services" aria-labelledby="svc-h">
          <div className="ctr">
            <div className="sec-head">
              <span className="eyebrow">HİZMETLERİMİZ / SERVICES / УСЛУГИ</span>
              <h2 className="sec-h ff" id="svc-h">Terzilik, Dikim, Tamir<br/>ve Tadilat Hizmetleri</h2>
              <p className="sec-sub">Tailor & Alteration Services in Antalya Konyaaltı (TR / EN / RU / DE).</p>
            </div>
          </div>
          <div className="svc-grid">
            {SERVICES.map(s=>(
              <div className="svc-card" key={s.n}>
                <div className="svc-img-wrap">
                  <img src={s.img} alt={`${s.title} — ${s.en} — ${s.ru} Terzi Can Antalya`} className="svc-img" loading="lazy" width={800} height={533} />
                  <div className="svc-n svc-n-onimg">{s.n}</div>
                </div>
                <div className="svc-body">
                  <h3 className="svc-title">{s.title}</h3>
                  <div style={{fontSize:'.72rem',color:'#C9A96E',fontWeight:700,marginBottom:'.2rem'}}>{s.en} · {s.ru}</div>
                  <div className="svc-sub">{s.sub}</div>
                  <p className="svc-desc">{s.desc}</p>
                  <div className="svc-foot">
                    <span className="svc-price">{s.price}</span>
                    <span className="svc-time">⏱ {s.time}</span>
                  </div>
                  <a href={s.wa} target="_blank" rel="noopener noreferrer" className="svc-btn">
                    Sipariş Ver / Order →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="sec" style={{background:C.bg2,paddingTop:'3.5rem',paddingBottom:'3.5rem'}} aria-labelledby="gallery-h">
          <div className="ctr">
            <div className="sec-head" style={{marginBottom:'1.8rem'}}>
              <span className="eyebrow">ATÖLYEMİZ / OUR WORKSHOP</span>
              <h2 className="sec-h ff" id="gallery-h" style={{fontSize:'clamp(1.5rem,3.2vw,2.1rem)'}}>Dikimden Teslime Kaliteli Hizmet</h2>
              <p className="sec-sub">Konyaaltı'daki atölyemizde her kıyafet özenle işlenir ve giyime hazır teslim edilir.</p>
            </div>
            <div className="gallery-grid">
              {[
                { img:'https://images.pexels.com/photos/6765056/pexels-photo-6765056.jpeg?auto=compress&cs=tinysrgb&w=700&h=467&fit=crop', alt:'Tailor taking measurements — Terzi Can Antalya Konyaaltı' },
                { img:'https://images.pexels.com/photos/18022030/pexels-photo-18022030.jpeg?auto=compress&cs=tinysrgb&w=700&h=467&fit=crop', alt:'Tailor sewing dress — Terzi Can Konyaaltı Antalya' },
                { img:'https://images.pexels.com/photos/31112215/pexels-photo-31112215.jpeg?auto=compress&cs=tinysrgb&w=700&h=467&fit=crop', alt:'Textile workshop — Terzi Can Antalya' },
              ].map((g,i)=>(
                <div className="gallery-item" key={i}>
                  <img src={g.img} alt={g.alt} loading="lazy" width={700} height={467} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="sec" style={{background:C.bg2}} aria-labelledby="proc-h">
          <div className="ctr">
            <div className="sec-head">
              <span className="eyebrow">PROCESS / SÜREÇ</span>
              <h2 className="sec-h ff" id="proc-h">4 Adımda Terzi Hizmeti</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'2rem'}}>
              {([
                ['01','WhatsApp\'tan Yazın / Send Message','Fotoğraf ve talebinizi iletin, anında fiyat alın / Send photo for price.'],
                ['02','Randevu Alın / Appointment','Atölyemize gelin veya adresten alım talep edin / Visit us or request pickup.'],
                ['03','Dikim & Tadilat / Alteration','Uzman terzimiz ölçünüze göre dikim ve tamir yapar / Precise alteration.'],
                ['04','Teslim Alın / Delivery','Kıyafetinizi ütülenmiş teslim alın / Pick up or home delivery.'],
              ] as [string,string,string][]).map(([n,t,d])=>(
                <div key={n} style={{paddingTop:'1.5rem',borderTop:`2px solid ${n==='01'?'#C9A96E':'rgba(44,74,62,.12)'}`}}>
                  <div style={{fontFamily:'Syne,sans-serif',fontSize:'2.5rem',fontWeight:800,color:'rgba(44,74,62,.12)',lineHeight:1,marginBottom:'.5rem'}}>{n}</div>
                  <h3 style={{fontWeight:700,fontSize:'.95rem',color:'#1A1A1A',marginBottom:'.5rem'}}>{t}</h3>
                  <p style={{fontSize:'.82rem',color:'#6B7057',lineHeight:1.65}}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DISTRICTS / SERVICE AREAS */}
        <section className="sec" style={{background:C.bg}} aria-labelledby="dist-h">
          <div className="ctr">
            <div className="sec-head">
              <span className="eyebrow">📍 HİZMET BÖLGELERİ / SERVICE AREAS</span>
              <h2 className="sec-h ff" id="dist-h">Konyaaltı & Antalya<br/>Terzi Servis Bölgeleri</h2>
              <p className="sec-sub">Hurma, Sarısu ve Liman'a <strong style={{color:'#8FA88C'}}>ücretsiz</strong> adresten alım ve teslimat. Free pickup in Hurma, Liman, Sarisu!</p>
            </div>
            <div className="dist-grid">
              {DISTRICTS.map(d=>(
                <div key={d.name} className={`dist-card${d.free?' free':''}`}>
                  <span className="dist-name">{d.name}</span>
                  <span className={`dist-tag${d.free?' free-tag':''}`}>
                    {d.free?'✅ Ücretsiz / Free Pickup':'Terzi Servisi'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="sec" style={{background:C.bg3}} id="faq" aria-labelledby="faq-h">
          <div className="ctr" style={{maxWidth:760}}>
            <div className="sec-head">
              <span className="eyebrow">FAQ / SSS / ЧАВО</span>
              <h2 className="sec-h ff" id="faq-h">Sık Sorulan Sorular & Multilingual FAQ</h2>
            </div>
            {FAQS.map(([q,a])=>(
              <div key={q} className="faq-item">
                <div className="faq-q">{q}</div>
                <div className="faq-a">{a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="cta-final" aria-label="Contact Section">
          <h2 className="cta-h ff">Terziniz Kapınızda,<br/>Kıyafetiniz 24 Saatte Hazır</h2>
          <p className="cta-sub">Free Pickup in Hurma, Sarisu, Liman · Бесплатный выезд в Хурму и Лиман.<br/>WhatsApp üzerinden hemen iletişime geçin.</p>
          <div className="cta-btns">
            <a href={WA_TR} target="_blank" rel="noopener noreferrer" className="btn-white">💬 WhatsApp'tan Yazın</a>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="btn-outline-white">📍 Google Haritalar</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div>© 2026 Terzi Can · Konyaaltı, Antalya · {PHONE}</div>
          <div style={{marginTop:4,fontSize:'.68rem',color:'rgba(255,255,255,.4)'}}>We speak Turkish, English, Russian & German</div>
          <nav className="foot-links" aria-label="District Pages">
            <a href="/antalya-terzi">Antalya Terzi (Tüm Bölgeler)</a>
            <a href="/hurma-terzi">Hurma Terzi</a>
            <a href="/liman-terzi">Liman Terzi</a>
            <a href="/sarisu-terzi">Sarısu Terzi</a>
            <a href="/uncali-terzi">Uncalı Terzi</a>
            <a href="/gursu-terzi">Gürsu Terzi</a>
          </nav>
          <nav className="foot-links" aria-label="Services">
            <a href="/otele-gelen-terzi-antalya">Otele Gelen Terzi</a>
            <a href="/keten-pamuk-ozel-dikim">Keten & Pamuk Özel Dikim</a>
            <a href="/antalya-gelinlik-tadilati">Gelinlik Tadilatı</a>
            <a href="/antalya-uniforma-imalati">Üniforma İmalatı</a>
            <a href="/konyaalti-fermuar-tamiri">Fermuar Tamiri</a>
            <a href="/konyaalti-paca-kisaltma">Paça Kısaltma</a>
            <a href="/anavera-tekstil">Anavera Tekstil (B2B)</a>
            <a href="/blog">Blog</a>
          </nav>
          <nav className="foot-links" aria-label="Languages">
            <a href="/en/tailor-service-antalya">English</a>
            <a href="/ru/uslugi-portnogo-antalya">Русский</a>
            <a href="/de/schneiderservice-antalya">Deutsch</a>
          </nav>
          <nav className="foot-links" aria-label="Footer links">
            <a href={MAPS} target="_blank" rel="noopener noreferrer">Google Maps</a>
          </nav>
        </footer>
      </div>
    </>
  );
}
