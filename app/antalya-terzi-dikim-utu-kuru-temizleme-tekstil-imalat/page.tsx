import type { Metadata } from 'next';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const SITE_URL = 'https://www.swaphubs.com/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat';
const PHONE_DISPLAY = '+90 531 898 64 18';
const PHONE_RAW = '+905318986418';
const WA_BASE = `https://wa.me/${PHONE_RAW}`;
const WA = (msg: string) => `${WA_BASE}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = WA('Merhaba, terzi ve tekstil hizmetleriniz hakkında bilgi almak istiyorum.');

// ─── UNSPLASH — telif hakkı serbest (CC0/Unsplash lisansı) ───────────────────
const IMGS = {
  hero:    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&q=85&auto=format&fit=crop',
  dikim:   'https://images.unsplash.com/photo-1594938298603-c8148c4b4f0e?w=900&q=80&auto=format&fit=crop',
  utu:     'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=900&q=80&auto=format&fit=crop',
  kumaş:   'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80&auto=format&fit=crop',
  imalat:  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80&auto=format&fit=crop',
  tasarim: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=900&q=80&auto=format&fit=crop',
  tamir:   'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80&auto=format&fit=crop',
  moda:    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=80&auto=format&fit=crop',
  kurye:   'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&auto=format&fit=crop',
};

// ─── METADATA ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Antalya Terzi Dikim · Ütü · Kuru Temizleme · Tekstil İmalat Atölyesi | SwapHubs',
  description:
    'Antalya genelinde adrese servis imkânıyla bay-bayan kıyafet dikimi, ütü & buharlı presleme, kuru temizleme, tekstil & moda tasarım üretim atölyesi ve seri imalat. Tailor Fashion Antalya · Konyaaltı merkez · Türkiye geneli kargo.',
  keywords: [
    'antalya terzi dikim', 'antalya kuru temizleme', 'antalya ütü hizmeti',
    'antalya tekstil imalat atölyesi', 'antalya moda tasarım', 'antalya tailor fashion',
    'antalya fason üretim', 'antalya seri imalat', 'antalya özel kıyafet dikimi',
    'antalya adrese terzi servisi', 'konyaaltı terzi', 'antalya giyim üretim',
    'antalya bay bayan kıyafet dikimi', 'antalya abiye dikimi', 'antalya üniforma üretimi',
    'antalya takım elbise dikimi', 'antalya tamir tadilat', 'online terzi antalya',
    'antalya buharlı presleme', 'antalya tekstil atölyesi', 'antalya dress design',
    'tailor antalya turkey', 'fashion atelier antalya', 'antalya clothing production',
    'портной анталья', 'химчистка анталья', 'schneiderei antalya',
    'kepez terzi', 'muratpaşa terzi', 'lara terzi', 'alanya terzi',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { 'tr': SITE_URL, 'x-default': SITE_URL },
  },
  openGraph: {
    title: 'Antalya Terzi · Ütü · Kuru Temizleme · Tekstil İmalat | SwapHubs Tailor Fashion',
    description:
      'Antalya'da tüm ilçelere adrese servisli terzi dikim, ütü, kuru temizleme ve tekstil moda üretim atölyesi. Seri imalat · Özel tasarım · Türkiye geneli kargo.',
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    type: 'website',
    images: [
      { url: '/og/antalya-terzi-tekstil.jpg', width: 1200, height: 630,
        alt: 'Antalya Terzi Dikim Ütü Kuru Temizleme Tekstil İmalat Atölyesi' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Terzi & Tekstil İmalat Atölyesi | Tailor Fashion',
    description: 'Dikim · Ütü · Kuru Temizleme · Seri İmalat · Adrese Servis',
    images: ['/og/antalya-terzi-tekstil.jpg'],
  },
  robots: { index: true, follow: true },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ClothingStore',
      '@id': `${SITE_URL}#business`,
      name: 'SwapHubs — Antalya Terzi Dikim & Tekstil İmalat Atölyesi',
      alternateName: ['Antalya Tailor Fashion', 'Terzi Can Antalya', 'SwapHubs Tekstil'],
      description:
        'Antalya genelinde adrese servis imkânıyla bay-bayan kıyafet dikimi, ütü & buharlı presleme, kuru temizleme, moda tasarım, tekstil seri imalat ve fason üretim.',
      url: SITE_URL,
      telephone: PHONE_RAW,
      priceRange: '₺₺',
      image: IMGS.hero,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      areaServed: [
        'Antalya', 'Konyaaltı', 'Muratpaşa', 'Kepez', 'Lara', 'Alanya',
        'Kemer', 'Belek', 'Side', 'Manavgat', 'Serik', 'Döşemealtı',
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '09:00', closes: '19:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Dikim & Tekstil Hizmetleri',
        itemListElement: [
          { '@type': 'Offer', name: 'Bay & Bayan Kıyafet Dikimi', price: '500', priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Ütü & Buharlı Presleme', price: '80', priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Kuru Temizleme', price: '150', priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Tekstil Seri İmalat & Fason Üretim',
            availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Moda & Giyim Tasarım Atölyesi',
            availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', name: 'Kıyafet Tamir & Tadilat', price: '100', priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya\'nın tüm ilçelerine adrese servis yapıyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet. Konyaaltı, Muratpaşa, Kepez, Lara, Alanya, Kemer, Belek, Side ve diğer tüm Antalya ilçelerine araçlı kurye ile alım-teslimat hizmeti veriyoruz.' },
        },
        {
          '@type': 'Question',
          name: 'Kuru temizleme ile ütü hizmeti aynı anda alınabilir mi?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, kombine paketler mevcuttur. Kuru temizleme sonrası buharlı presleme dahildir.' },
        },
        {
          '@type': 'Question',
          name: 'Seri imalat için minimum kaç adet sipariş gerekiyor?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tekstil seri imalat ve fason üretimde minimum 50 adet üretim kabul edilmektedir. Numune için tek adet üretim yapılabilir.' },
        },
        {
          '@type': 'Question',
          name: 'Antalya dışına kargo yapıyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet. Türkiye\'nin 81 iline kargo ile teslim ediyoruz. Online sipariş için WhatsApp\'tan ölçü ve model gönderin.' },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs Ana Sayfa', item: 'https://www.swaphubs.com' },
        { '@type': 'ListItem', position: 2, name: 'Terzi Hizmetleri', item: 'https://www.swaphubs.com/terzi' },
        { '@type': 'ListItem', position: 3, name: 'Antalya Terzi · Ütü · Kuru Temizleme · Tekstil İmalat', item: SITE_URL },
      ],
    },
  ],
};

// ─── SERVICES DATA ────────────────────────────────────────────────────────────
const SERVICES = [
  {
    slug: 'dikim', icon: '✂️', img: IMGS.dikim,
    badge: 'EN POPÜLER', badgeColor: '#C9A84C',
    title: 'Bay & Bayan Kıyafet Dikimi',
    sub: 'Tailor Fashion · Özel Dikim · Abiye · Takım Elbise',
    desc: 'Ölçüye özel erkek & kadın giyim. Takım elbise, abiye, gelinlik, iş kıyafeti, günlük elbise. Yerli ve ithal kumaş.',
    tags: ['Takım Elbise', 'Abiye', 'Gelinlik', 'Gömlek', 'Pantolon', 'Tulum'],
    price: '₺500+', time: '3–7 gün',
    waMsg: 'Merhaba, kıyafet dikimi hakkında bilgi almak istiyorum.',
  },
  {
    slug: 'utu', icon: '💨', img: IMGS.utu,
    badge: 'EKSPRES', badgeColor: '#E11D48',
    title: 'Ütü & Buharlı Presleme',
    sub: 'Endüstriyel Ütü · Otel Alım-Teslimat · Aynı Gün',
    desc: 'Sanayi tipi buharlı press ile hassas kumaşlar mükemmel şekilde ütülenir. Otellerden kurye ile alım, aynı gün teslim.',
    tags: ['Gömlek Ütü', 'Takım Elbise Pres', 'Abiye Buharlama', 'Otel Servisi'],
    price: '₺80/adet', time: '2–6 saat',
    waMsg: 'Merhaba, ütü hizmeti hakkında bilgi almak istiyorum.',
  },
  {
    slug: 'kuru', icon: '🧺', img: IMGS.kumaş,
    badge: 'YENİ', badgeColor: '#059669',
    title: 'Kuru Temizleme',
    sub: 'Hassas Kumaş · Takım Elbise · Abiye · Deri',
    desc: 'Profesyonel kuru temizleme. İpek, yün, kadife, deri, kürk ve özel kumaşlara uygun işlem. Adrese alım-teslimat.',
    tags: ['Takım Elbise', 'İpek & Saten', 'Kadife', 'Deri & Süet', 'Kürk'],
    price: '₺150+', time: '24–48 saat',
    waMsg: 'Merhaba, kuru temizleme hizmeti hakkında bilgi almak istiyorum.',
  },
  {
    slug: 'imalat', icon: '🏭', img: IMGS.imalat,
    badge: 'B2B', badgeColor: '#1E40AF',
    title: 'Tekstil Seri İmalat & Fason',
    sub: 'Üniforma · Toplu Üretim · Marka Üretimi · Min. 50 Adet',
    desc: 'Oteller, restoranlar, markalar için üniforma ve seri tekstil üretimi. Kalıp çıkarma, numune, toplu kesim & dikiş.',
    tags: ['Üniforma', 'Fason Üretim', 'Kalıp Çıkarma', 'Nakış & Baskı', 'Min. 50 Adet'],
    price: 'Teklif Al', time: 'Miktara göre',
    waMsg: 'Merhaba, seri imalat / fason üretim hakkında teklif almak istiyorum.',
  },
  {
    slug: 'tasarim', icon: '✏️', img: IMGS.tasarim,
    badge: 'ÖZEL', badgeColor: '#7C3AED',
    title: 'Moda & Giyim Tasarım Atölyesi',
    sub: 'Fashion Design · Kalıp · Prototip · Koleksiyon',
    desc: 'Hayalinizdeki koleksiyonu hayata geçiriyoruz. Kişiye özel fashion tasarım, kalıp çıkarma, prototip ve üretime hazırlık.',
    tags: ['Fashion Tasarım', 'Kalıp Çıkarma', 'Prototip', 'Koleksiyon', 'Teknik Çizim'],
    price: 'Teklif Al', time: '7–14 gün',
    waMsg: 'Merhaba, moda tasarım atölyesi hakkında bilgi almak istiyorum.',
  },
  {
    slug: 'tamir', icon: '🪡', img: IMGS.tamir,
    badge: '',  badgeColor: '',
    title: 'Tamir · Tadilat · Revizyonu',
    sub: 'Paça · Fermuar · Bel Alma · Astar · Yırtık',
    desc: 'Sevdiğiniz kıyafeti değiştirmenize gerek yok. Paça kısaltma, bel daraltma, fermuar, astar ve yırtık onarımı — aynı gün.',
    tags: ['Paça Kısaltma', 'Fermuar', 'Bel Alma', 'Kol Kısaltma', 'Astar'],
    price: '₺100+', time: 'Aynı gün',
    waMsg: 'Merhaba, kıyafet tamir ve tadilat hakkında bilgi almak istiyorum.',
  },
  {
    slug: 'adres', icon: '🚗', img: IMGS.kurye,
    badge: 'ÜCRETSİZ', badgeColor: '#059669',
    title: 'Tüm Antalya\'ya Adrese Servis',
    sub: 'Konyaaltı · Lara · Kepez · Kemer · Alanya · Belek',
    desc: 'Tüm Antalya ilçelerine araçlı kurye ile alım-teslimat. Otellerden, evlerden, işyerlerinden alıyoruz, kapına teslim ediyoruz.',
    tags: ['Otel Servisi', 'Eve Teslimat', 'İşyeri Alım', 'Kargo TR Geneli'],
    price: 'Ücretsiz*', time: 'Aynı gün',
    waMsg: 'Merhaba, adrese servis hakkında bilgi almak istiyorum.',
  },
  {
    slug: 'moda', icon: '👑', img: IMGS.moda,
    badge: 'VIP', badgeColor: '#92400E',
    title: 'VIP Fashion & Luxury Dikim',
    sub: 'Lüks Kıyafet · Haute Couture · Özel Davet & Gece',
    desc: 'Özel davete, galaya veya düğüne? Lüks kumaşlarla el işçiliği haute couture dikim. Randevulu özel atölye görüşmesi.',
    tags: ['Haute Couture', 'El İşçiliği', 'Özel Davet', 'Lüks Kumaş', 'Randevulu'],
    price: '₺3.000+', time: '10–21 gün',
    waMsg: 'Merhaba, VIP lüks kıyafet dikimi hakkında randevu almak istiyorum.',
  },
];

const FAQS: [string, string][] = [
  ["Antalya'nın tüm ilçelerine servis yapıyor musunuz?", "Evet. Konyaaltı, Muratpaşa, Kepez, Lara, Alanya, Kemer, Belek, Side, Manavgat ve tüm Antalya'ya araçlı kurye servisi mevcuttur."],
  ["Kuru temizleme ile ütü hizmetini birlikte alabilir miyim?", "Evet. Kombine paket mevcuttur. Kuru temizleme sonrası buharlı presleme dahil ücretlendirilir."],
  ["Tekstil seri imalat için minimum sipariş adedi nedir?", "Minimum 50 adet üretim kabul edilmektedir. Numune ve prototip için tek adet üretim yapılabilir."],
  ["Antalya dışına kargo gönderimi yapıyor musunuz?", "Evet, Türkiye'nin 81 iline kargo. Online sipariş için WhatsApp'tan ölçü ve model fotoğrafı gönderin."],
  ["Hassas kumaşlar (ipek, kadife, deri) için risk var mı?", "Hayır. Kuru temizleme ve buharlı pres ekipmanlarımız hassas kumaşlar için özel ayarlarda çalışır."],
  ["Otelimden kıyafetlerimi alıp getirebilir misiniz?", "Kesinlikle. Antalya'daki tüm otellere kurye ile alım ve teslimat hizmeti sunuyoruz."],
  ["Fashion tasarım atölyesinde kendi kumaşımı kullanabilir miyim?", "Evet. Kendi kumaşınızı getirerek ya da kargoyla göndererek özel dikim yaptırabilirsiniz."],
  ["Üniforma ve toplu üretimde teslim süresi ne kadar?", "Miktara göre değişir. 50–200 adet için genellikle 7–14 iş günü. Büyük siparişlerde proje bazlı planlama yapılır."],
];

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────
export default function AntalyaTerziPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Inline styles — Client component gerektirmeden pure CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}

        :root{
          --ink:#0A0908; --ink2:#131210; --ink3:#1A1916; --ink4:#222018;
          --bone:#F2EDE2; --bone2:#DDD5C3; --muted:#7A7060;
          --gold:#C9A84C; --gold2:#E8C97A; --gold3:#7A5C1E;
          --red:#C0392B; --green:#1A7A3C; --blue:#1E3A8A; --purple:#5B21B6; --teal:#0D7377;
          --wa:#25D366;
          --serif:'Playfair Display',Georgia,serif;
          --sans:'Outfit',system-ui,sans-serif;
        }

        body{font-family:var(--sans);background:var(--ink);color:var(--bone);overflow-x:hidden}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:var(--gold3);border-radius:2px}

        /* ── ANNOUNCE ── */
        .ann{background:var(--gold);color:var(--ink);text-align:center;padding:.6rem 1rem;
             font-family:var(--sans);font-size:.78rem;font-weight:600;letter-spacing:.03em}
        .ann a{color:var(--ink);font-weight:700;text-decoration:underline}

        /* ── NAV ── */
        .nav{position:fixed;top:0;left:0;right:0;z-index:300;padding:1rem 4rem;
             display:flex;align-items:center;justify-content:space-between;
             background:rgba(10,9,8,0);backdrop-filter:blur(0);
             border-bottom:1px solid transparent;transition:all .4s}
        .nav.scrolled{background:rgba(10,9,8,.95);backdrop-filter:blur(24px);
                      border-color:rgba(201,168,76,.12);padding:.65rem 4rem}
        .nav-logo{font-family:var(--serif);font-size:1.25rem;font-weight:900;
                  color:var(--gold);text-decoration:none;letter-spacing:.01em;line-height:1.1}
        .nav-logo span{display:block;font-size:.65rem;font-family:var(--sans);font-weight:400;
                       color:var(--muted);letter-spacing:.18em;text-transform:uppercase;margin-top:.1rem}
        .nav-links{display:flex;gap:2rem;list-style:none}
        .nav-links a{color:var(--bone2);text-decoration:none;font-size:.73rem;
                     letter-spacing:.1em;text-transform:uppercase;font-family:var(--sans);
                     font-weight:500;transition:color .2s}
        .nav-links a:hover{color:var(--gold)}
        .nav-cta{background:var(--wa);color:#fff;padding:.55rem 1.4rem;font-family:var(--sans);
                 font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
                 text-decoration:none;border-radius:2px;transition:all .25s;white-space:nowrap}
        .nav-cta:hover{background:#1eba56;transform:translateY(-1px)}

        /* ── HERO ── */
        .hero{position:relative;min-height:100vh;display:flex;align-items:flex-end;
              overflow:hidden;padding-top:80px}
        .hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
                 object-position:center;filter:brightness(.28) saturate(.5)}
        .hero-grad{position:absolute;inset:0;
          background:linear-gradient(to top,var(--ink) 0%,rgba(10,9,8,.7) 40%,rgba(10,9,8,.2) 100%)}
        .hero-content{position:relative;z-index:2;width:100%;max-width:1200px;
                      margin:0 auto;padding:0 4rem 5rem}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:.6rem;
                      font-family:var(--sans);font-size:.65rem;letter-spacing:.3em;
                      text-transform:uppercase;color:var(--gold);
                      border-bottom:1px solid rgba(201,168,76,.3);
                      padding-bottom:.45rem;margin-bottom:1.8rem}
        .hero h1{font-family:var(--serif);font-size:clamp(2.8rem,5.5vw,5.8rem);
                 font-weight:900;line-height:1.0;letter-spacing:-.01em;margin-bottom:1.4rem}
        .hero h1 .gold{color:var(--gold)}
        .hero h1 .italic{font-style:italic;font-weight:400}
        .hero-desc{font-family:var(--sans);font-size:.92rem;color:rgba(242,237,226,.65);
                   line-height:1.9;max-width:580px;margin-bottom:2.2rem}
        .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:3.5rem}
        .hero-kw{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:3rem}
        .kpill{font-family:var(--sans);font-size:.6rem;color:rgba(201,168,76,.5);
               border:1px solid rgba(201,168,76,.12);padding:.2rem .6rem;border-radius:1px;
               letter-spacing:.06em;text-transform:uppercase}
        .hero-stats{display:grid;grid-template-columns:repeat(5,1fr);
                    gap:0;border-top:1px solid rgba(201,168,76,.1);padding-top:2rem}
        .hstat{border-right:1px solid rgba(201,168,76,.08);padding-right:2rem}
        .hstat:last-child{border-right:none}
        .hstat-n{font-family:var(--serif);font-size:2rem;color:var(--gold);
                 font-weight:900;line-height:1;display:block}
        .hstat-l{font-family:var(--sans);font-size:.6rem;color:var(--muted);
                 letter-spacing:.14em;text-transform:uppercase;margin-top:.25rem;display:block}

        /* ── BUTTONS ── */
        .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.82rem 1.8rem;
             font-family:var(--sans);font-size:.73rem;font-weight:600;
             letter-spacing:.1em;text-transform:uppercase;text-decoration:none;
             border:none;cursor:pointer;border-radius:2px;transition:all .25s}
        .btn-gold{background:var(--gold);color:var(--ink)}
        .btn-gold:hover{background:var(--gold2);transform:translateY(-2px);
                        box-shadow:0 6px 20px rgba(201,168,76,.3)}
        .btn-ghost{background:transparent;color:var(--bone);border:1px solid rgba(242,237,226,.2)}
        .btn-ghost:hover{border-color:var(--gold);color:var(--gold)}
        .btn-wa{background:var(--wa);color:#fff}
        .btn-wa:hover{background:#1eba56;box-shadow:0 4px 16px rgba(37,211,102,.35)}

        /* ── BREADCRUMB ── */
        .bc{background:var(--ink2);padding:.75rem 4rem;display:flex;gap:.5rem;
            flex-wrap:wrap;align-items:center;border-bottom:1px solid rgba(201,168,76,.06)}
        .bc a{font-family:var(--sans);font-size:.7rem;color:var(--muted);text-decoration:none}
        .bc a:hover{color:var(--gold)}
        .bc sep{font-family:var(--sans);font-size:.7rem;color:rgba(122,112,96,.3)}
        .bc strong{font-family:var(--sans);font-size:.7rem;color:var(--bone2)}

        /* ── SEO INTRO ── */
        .seo-intro{background:var(--ink3);border-left:3px solid var(--gold3);
                   padding:1.6rem 4rem}
        .seo-intro p{font-family:var(--sans);font-size:.8rem;color:var(--muted);
                     line-height:2;max-width:1100px;margin:0 auto}
        .seo-intro strong{color:var(--bone2)}

        /* ── SECTION ── */
        .sec{padding:6rem 4rem}
        .ctr{max-width:1200px;margin:0 auto}
        .sh{margin-bottom:3.5rem}
        .sh.c{text-align:center}
        .sh.c .divider,.sh.c .sh-sub{margin-left:auto;margin-right:auto}
        .eyebrow{font-family:var(--sans);font-size:.62rem;letter-spacing:.3em;
                 text-transform:uppercase;color:var(--gold);font-weight:500;
                 display:block;margin-bottom:.9rem}
        .h2{font-family:var(--serif);font-size:clamp(1.9rem,3.5vw,3rem);
            font-weight:900;line-height:1.1;color:var(--bone)}
        .h2 em{color:var(--gold);font-style:italic}
        .sh-sub{font-family:var(--sans);font-size:.88rem;color:var(--muted);
                max-width:520px;line-height:1.85;margin-top:.8rem}
        .divider{width:36px;height:1.5px;background:var(--gold);margin-top:1.1rem}

        /* ── SERVICE GRID ── */
        .svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
                  background:rgba(201,168,76,.06)}
        .scard{position:relative;overflow:hidden;min-height:360px;
               display:flex;flex-direction:column;justify-content:flex-end;
               background:var(--ink2);cursor:default}
        .scard-img{position:absolute;inset:0;width:100%;height:100%;
                   object-fit:cover;filter:brightness(.2) saturate(.25);
                   transition:transform .8s ease,filter .6s}
        .scard:hover .scard-img{transform:scale(1.07);filter:brightness(.16) saturate(.2)}
        .scard-ov{position:absolute;inset:0;
          background:linear-gradient(to top,rgba(10,9,8,.99) 0%,rgba(10,9,8,.3) 55%,transparent)}
        .scard-top{position:absolute;top:1rem;left:1.2rem;right:1.2rem;z-index:2;
                   display:flex;justify-content:space-between;align-items:flex-start}
        .scard-badge{font-family:var(--sans);font-size:.55rem;letter-spacing:.15em;
                     text-transform:uppercase;font-weight:700;padding:.2rem .6rem;color:#fff}
        .scard-icon{font-size:1.3rem;line-height:1}
        .scard-body{position:relative;z-index:2;padding:1.5rem 1.5rem 1.8rem}
        .scard-title{font-family:var(--serif);font-size:1.2rem;font-weight:700;
                     color:var(--bone);margin-bottom:.25rem;line-height:1.2}
        .scard-sub{font-family:var(--sans);font-size:.6rem;color:var(--gold);
                   letter-spacing:.08em;text-transform:uppercase;margin-bottom:.6rem}
        .scard-desc{font-family:var(--sans);font-size:.75rem;color:rgba(242,237,226,.5);
                    line-height:1.7;margin-bottom:.8rem}
        .scard-tags{display:flex;flex-wrap:wrap;gap:.25rem;margin-bottom:1rem}
        .scard-tag{font-family:var(--sans);font-size:.58rem;color:var(--muted);
                   border:1px solid rgba(201,168,76,.1);padding:.15rem .45rem}
        .scard-foot{display:flex;align-items:flex-end;justify-content:space-between}
        .scard-price{font-family:var(--serif);font-size:1.2rem;color:var(--gold);
                     font-weight:700;line-height:1;display:block}
        .scard-time{font-family:var(--sans);font-size:.6rem;color:#27ae60;margin-top:.15rem}
        .scard-line{position:absolute;bottom:0;left:1.5rem;right:1.5rem;height:1px;
                    background:linear-gradient(to right,var(--gold),transparent);
                    transform:scaleX(0);transform-origin:left;transition:transform .5s}
        .scard:hover .scard-line{transform:scaleX(1)}

        /* ── ILCE STRIP ── */
        .ilce-strip{background:var(--ink3);padding:2.5rem 4rem;overflow:hidden}
        .ilce-label{font-family:var(--sans);font-size:.6rem;letter-spacing:.25em;
                    text-transform:uppercase;color:var(--gold);text-align:center;margin-bottom:1.2rem}
        .ilce-scroll{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center}
        .ilce-pill{font-family:var(--sans);font-size:.72rem;color:var(--bone2);
                   background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.12);
                   padding:.35rem .9rem;border-radius:1px;transition:all .2s}
        .ilce-pill:hover{background:rgba(201,168,76,.12);border-color:rgba(201,168,76,.3);color:var(--gold)}

        /* ── HOW ── */
        .how-grid{display:grid;grid-template-columns:repeat(4,1fr);
                  gap:1px;background:rgba(201,168,76,.06);margin-top:3rem}
        .how-card{background:var(--ink3);padding:2.2rem 1.8rem;position:relative}
        .how-card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;
                         background:transparent;transition:background .3s}
        .how-card:hover::after{background:linear-gradient(90deg,var(--gold),transparent)}
        .how-n{font-family:var(--serif);font-size:3.2rem;font-weight:900;
               color:rgba(201,168,76,.07);line-height:1;margin-bottom:.4rem}
        .how-icon{font-size:1.6rem;margin-bottom:.8rem}
        .how-t{font-family:var(--serif);font-size:1rem;font-weight:700;
               color:var(--bone);margin-bottom:.4rem}
        .how-d{font-family:var(--sans);font-size:.75rem;color:var(--muted);line-height:1.65}

        /* ── PRICE TABLE ── */
        .ptable-wrap{border:1px solid rgba(201,168,76,.1);border-radius:2px;overflow:hidden}
        .ptable{width:100%;border-collapse:collapse}
        .ptable thead{background:var(--ink4)}
        .ptable th{text-align:left;font-family:var(--sans);font-size:.6rem;
                   letter-spacing:.22em;text-transform:uppercase;color:var(--gold);
                   padding:.85rem 1.2rem;font-weight:500}
        .ptable th:not(:first-child){text-align:right}
        .ptable td{padding:.85rem 1.2rem;font-family:var(--sans);font-size:.82rem;
                   border-bottom:1px solid rgba(255,255,255,.03);color:var(--bone2)}
        .ptable tr:last-child td{border-bottom:none}
        .ptable tr:nth-child(even) td{background:rgba(201,168,76,.02)}
        .ptable tr:hover td{background:rgba(201,168,76,.05)}
        .ptable td:nth-child(2){text-align:right;color:var(--gold);font-weight:600}
        .ptable td:nth-child(3){text-align:right;color:var(--muted);font-size:.72rem}

        /* ── FAQ ── */
        .faq-list{max-width:780px;margin:3rem auto 0}
        .faq-item{border-bottom:1px solid rgba(201,168,76,.07)}
        .faq-q{width:100%;background:none;border:none;padding:1.2rem 0;
               display:flex;align-items:center;justify-content:space-between;gap:1rem;
               cursor:pointer;text-align:left;font-family:var(--serif);
               font-size:.98rem;color:var(--bone);transition:color .2s}
        .faq-q:hover{color:var(--gold)}
        .faq-ico{flex-shrink:0;width:22px;height:22px;border:1px solid rgba(201,168,76,.2);
                 border-radius:50%;display:flex;align-items:center;justify-content:center;
                 font-size:.85rem;color:var(--gold)}
        .faq-a{max-height:0;overflow:hidden;font-family:var(--sans);
               font-size:.82rem;color:var(--muted);line-height:1.85;
               transition:max-height .4s ease,padding .3s}
        .faq-item.open .faq-a{max-height:180px;padding-bottom:1.2rem}
        .faq-item.open .faq-ico{transform:rotate(45deg)}

        /* ── CTA ── */
        .cta-sec{padding:6rem 4rem;background:var(--ink2);text-align:center;position:relative;overflow:hidden}
        .cta-sec::before{content:'';position:absolute;inset:0;
          background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(201,168,76,.05),transparent);
          pointer-events:none}
        .cta-h{font-family:var(--serif);font-size:clamp(1.9rem,3.5vw,3.2rem);
               font-weight:900;color:var(--bone);margin-bottom:1rem;position:relative}
        .cta-h em{color:var(--gold);font-style:italic}
        .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative}

        /* ── CONTACT ── */
        .cont-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;margin-top:3rem}
        .crow{display:flex;gap:.8rem;padding:.8rem 0;border-bottom:1px solid rgba(201,168,76,.06)}
        .clbl{font-family:var(--sans);font-size:.58rem;letter-spacing:.2em;
              text-transform:uppercase;color:var(--gold);margin-bottom:.15rem}
        .cval{font-family:var(--sans);font-size:.85rem;color:var(--bone)}
        .cval a{color:var(--bone);text-decoration:none;transition:color .2s}
        .cval a:hover{color:var(--gold)}
        .map-box{border-radius:2px;overflow:hidden;height:280px;
                 border:1px solid rgba(201,168,76,.1)}
        .map-box iframe{display:block;width:100%;height:100%;border:0}

        /* ── FOOTER ── */
        footer{background:#060504;border-top:1px solid rgba(201,168,76,.06);padding:2.5rem 4rem}
        .foot-brand{font-family:var(--serif);font-size:1.05rem;color:var(--gold);
                    text-align:center;margin-bottom:.4rem}
        .foot-links{display:flex;flex-wrap:wrap;justify-content:center;
                    gap:.4rem 1.5rem;margin-bottom:.7rem}
        .foot-links a{font-family:var(--sans);color:var(--muted);font-size:.72rem;
                      text-decoration:none;transition:color .2s}
        .foot-links a:hover{color:var(--gold)}
        .foot-copy{font-family:var(--sans);font-size:.67rem;
                   color:rgba(122,112,96,.35);text-align:center}
        .foot-kws{display:flex;flex-wrap:wrap;gap:.3rem;justify-content:center;margin-top:.9rem}
        .foot-pill{font-family:var(--sans);font-size:.56rem;
                   color:rgba(201,168,76,.18);border:1px solid rgba(201,168,76,.06);padding:.15rem .5rem}

        /* ── WA FLOAT ── */
        .wa-float{position:fixed;bottom:1.8rem;right:1.8rem;z-index:200;
                  width:3.2rem;height:3.2rem;border-radius:50%;background:var(--wa);
                  display:flex;align-items:center;justify-content:center;
                  font-size:1.4rem;text-decoration:none;
                  box-shadow:0 4px 20px rgba(37,211,102,.45);
                  animation:wapulse 2.5s ease infinite}
        .wa-float:hover{transform:scale(1.12);animation:none}
        @keyframes wapulse{
          0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)}
          50%{box-shadow:0 4px 30px rgba(37,211,102,.6),0 0 0 8px rgba(37,211,102,.08)}
        }

        /* ── SKIP ── */
        .skip{position:absolute;top:-40px;left:0;background:var(--gold);color:var(--ink);
              padding:.5rem 1rem;font-weight:700;z-index:999;font-family:var(--sans)}
        .skip:focus{top:0}

        /* ── RESPONSIVE ── */
        @media(max-width:1100px){
          .svc-grid{grid-template-columns:repeat(2,1fr)}
          .how-grid{grid-template-columns:repeat(2,1fr)}
          .cont-grid{grid-template-columns:1fr}
          .hero-stats{grid-template-columns:repeat(3,1fr);gap:1.5rem}
          .nav-links{display:none}
        }
        @media(max-width:700px){
          .svc-grid{grid-template-columns:1fr}
          .how-grid{grid-template-columns:1fr}
          .hero-stats{grid-template-columns:repeat(2,1fr)}
          .sec,.seo-intro,.bc,.ilce-strip,.cta-sec,footer{padding-left:1.5rem;padding-right:1.5rem}
          .nav{padding:1rem 1.5rem}
          .nav.scrolled{padding:.65rem 1.5rem}
          .hero-content{padding:0 1.5rem 4rem}
        }
        .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;
                 overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      `}</style>

      {/* ── NAV scroll effect — inline script ── */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          window.addEventListener('scroll',function(){
            var nav=document.getElementById('main-nav');
            if(!nav)return;
            if(window.scrollY>60)nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
          },{passive:true});
          document.querySelectorAll('.faq-q').forEach(function(btn){
            btn.addEventListener('click',function(){
              var item=btn.closest('.faq-item');
              var isOpen=item.classList.contains('open');
              document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open')});
              if(!isOpen)item.classList.add('open');
            });
          });
        })();
      `}} />

      <a href="#main" className="skip">İçeriğe geç</a>
      <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp ile iletişim">💬</a>

      {/* ── ANNOUNCE ── */}
      <div className="ann" role="banner">
        🧵 Haziran 2026 — Seri imalat siparişlerinde %15 indirim ·{' '}
        <a href={WA('Merhaba, Haziran kampanyası hakkında bilgi almak istiyorum.')}>Detay için yazın →</a>
      </div>

      {/* ── NAV ── */}
      <nav id="main-nav" className="nav" aria-label="Ana menü">
        <a href="https://www.swaphubs.com" className="nav-logo">
          SwapHubs
          <span>Tailor · Fashion · Tekstil Antalya</span>
        </a>
        <ul className="nav-links">
          {[
            ['#services','Hizmetler'],['#how','Nasıl Çalışır'],
            ['#prices','Fiyatlar'],['#faq','SSS'],['#contact','İletişim'],
          ].map(([href,label]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="nav-cta">
          💬 Hemen Sipariş
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="main" aria-labelledby="hero-h">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMGS.hero}
          alt="Antalya terzi dikim ütü kuru temizleme tekstil imalat atölyesi"
          className="hero-bg"
          width={1600} height={900}
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-grad" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span>📍 Konyaaltı · Antalya</span>
            <span>·</span>
            <span>Türkiye Geneli Kargo</span>
          </div>
          <h1 id="hero-h">
            Antalya <span className="gold">Terzi · Dikim</span><br/>
            <span className="italic">Ütü · Kuru Temizleme</span><br/>
            <span className="gold">Tekstil & Moda</span><br/>
            <span className="italic" style={{fontSize:'75%',color:'var(--bone2)'}}>İmalat Atölyesi</span>
          </h1>
          <p className="hero-desc">
            Tüm Antalya ilçelerine <strong style={{color:'var(--bone)'}}>adrese servis</strong> imkânıyla
            bay-bayan kıyafet dikimi, ütü & buharlı presleme, kuru temizleme, moda tasarım,
            tekstil seri imalat ve fason üretim. <strong style={{color:'var(--bone)'}}>Tailor Fashion Atölyesi</strong> — Konyaaltı merkez.
          </p>
          <div className="hero-btns">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              💬 WhatsApp Sipariş
            </a>
            <a href="#services" className="btn btn-ghost">Hizmetleri Keşfet ↓</a>
          </div>
          <div className="hero-kw" aria-hidden="true">
            {[
              'Terzi Dikim','Ütü Servisi','Kuru Temizleme','Tekstil İmalat',
              'Moda Tasarım','Adrese Servis','Seri İmalat','Tailor Fashion',
              'Fason Üretim','Online Terzi',
            ].map(k => <span key={k} className="kpill">{k}</span>)}
          </div>
          <div className="hero-stats" aria-label="Atölye istatistikleri">
            {([
              ['10+','Yıl Deneyim'],
              ['8','Hizmet Kategorisi'],
              ['5.000+','Teslim Edilen Kıyafet'],
              ['4.9★','Google Puanı'],
              ['Tüm Antalya','Adrese Servis'],
            ] as [string,string][]).map(([n,l]) => (
              <div key={l} className="hstat">
                <span className="hstat-n">{n}</span>
                <span className="hstat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <nav className="bc" aria-label="Sayfa yolu">
        <a href="https://www.swaphubs.com">SwapHubs</a>
        <span>›</span>
        <a href="/terzi">Terzi Can Antalya</a>
        <span>›</span>
        <strong>Terzi · Dikim · Ütü · Kuru Temizleme · Tekstil İmalat</strong>
      </nav>

      {/* ── SEO INTRO ── */}
      <div className="seo-intro" role="complementary" aria-label="Hizmet özeti">
        <p>
          <strong>SwapHubs Tailor Fashion Antalya</strong> olarak Konyaaltı merkezli atölyemizden
          tüm Antalya ilçelerine — <strong>Muratpaşa, Kepez, Lara, Alanya, Kemer, Belek, Side, Manavgat, Serik, Döşemealtı</strong> ve daha fazlasına —
          araçlı kurye ile <strong>adrese servis</strong> sunuyoruz.
          Bay & bayan <strong>kıyafet dikimi</strong>, takım elbise, abiye ve gelinlik dikimi;
          endüstriyel <strong>ütü & buharlı presleme</strong>; hassas kumaşlara özel <strong>kuru temizleme</strong>;
          markalar ve kurumlar için <strong>tekstil seri imalat & fason üretim</strong>;
          <strong>moda & giyim tasarım</strong> atölyesi; paça, fermuar, bel alma gibi her nevi
          <strong>kıyafet tamir & tadilat</strong>. Türkiye geneline kargo ile online sipariş.
        </p>
      </div>

      {/* ── SERVİSLER ── */}
      <section id="services" aria-labelledby="svc-h" style={{background:'var(--ink2)',padding:'5rem 0 0'}}>
        <div className="ctr" style={{padding:'0 4rem 3rem'}}>
          <span className="eyebrow">✦ 8 Hizmet Kategorisi</span>
          <h2 className="h2" id="svc-h">
            <em>Terzi · Ütü · Kuru Temizleme</em><br/>
            Tekstil & Moda İmalat
          </h2>
          <p className="sh-sub">
            Tek adres, tüm tekstil çözümleri. Bireysel dikimden kurumsal seri imalata.
          </p>
          <div className="divider" />
        </div>
        <div className="svc-grid">
          {SERVICES.map(s => (
            <article key={s.slug} id={`svc-${s.slug}`} className="scard">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.img}
                alt={`${s.title} — Antalya SwapHubs Tailor Fashion`}
                className="scard-img"
                loading="lazy"
                width={900} height={500}
              />
              <div className="scard-ov" aria-hidden="true" />
              <div className="scard-top">
                {s.badge && (
                  <span className="scard-badge" style={{background: s.badgeColor}}>
                    {s.badge}
                  </span>
                )}
                <span aria-hidden="true">{s.icon}</span>
              </div>
              <div className="scard-body">
                <h3 className="scard-title">{s.title}</h3>
                <div className="scard-sub">{s.sub}</div>
                <p className="scard-desc">{s.desc}</p>
                <div className="scard-tags">
                  {s.tags.map(t => <span key={t} className="scard-tag">{t}</span>)}
                </div>
                <div className="scard-foot">
                  <div>
                    <span className="scard-price">{s.price}</span>
                    <span className="scard-time">⏱ {s.time}</span>
                  </div>
                  <a
                    href={WA(s.waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-wa"
                    style={{fontSize:'.68rem',padding:'.55rem .9rem'}}
                  >
                    Sipariş Ver
                  </a>
                </div>
              </div>
              <div className="scard-line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* ── İLÇE STRIP ── */}
      <div className="ilce-strip" aria-label="Hizmet verilen Antalya ilçeleri">
        <div className="ilce-label">📍 Tüm Antalya'ya Adrese Servis İmkânı</div>
        <div className="ilce-scroll">
          {[
            'Konyaaltı','Muratpaşa','Kepez','Lara','Alanya','Kemer',
            'Belek','Side','Manavgat','Serik','Döşemealtı','Aksu',
            'Gazipaşa','Kumluca','Finike','Kaş','Kalkan','Demre',
            'Elmalı','Korkuteli','İbradı','Akseki','Gündoğmuş',
          ].map(i => <span key={i} className="ilce-pill">{i}</span>)}
        </div>
      </div>

      {/* ── NASIL ÇALIŞIR ── */}
      <section id="how" className="sec" style={{background:'var(--ink3)'}} aria-labelledby="how-h">
        <div className="ctr">
          <div className="sh c">
            <span className="eyebrow">📱 Kolay Sipariş</span>
            <h2 className="h2" id="how-h">Nasıl <em>Çalışır?</em></h2>
            <p className="sh-sub">WhatsApp'tan sipariş verin — adresinize gelelim ya da kapınıza teslim edelim.</p>
            <div className="divider" />
          </div>
          <div className="how-grid">
            {([
              ['01','📸','WhatsApp ile İletişim',"Model fotoğrafı, ölçü veya kıyafetinizin durumunu WhatsApp'a gönderin. Ücretsiz danışma."],
              ['02','💬','Fiyat & Onay','Terzimiz detayları değerlendirir, net fiyat verir. Onaylarsanız işleme başlanır.'],
              ['03','🚗','Adrese Geliyoruz','Antalya içi: araçlı kurye kıyafetinizi evden, otelden, işyerinden alır.'],
              ['04','✅','Kapınıza Teslim','Dikim, ütü, kuru temizleme veya tadilat tamamlanınca askıda, temiz teslim.'],
            ] as [string,string,string,string][]).map(([n,ic,t,d]) => (
              <div key={n} className="how-card">
                <div className="how-n">{n}</div>
                <div className="how-icon" aria-hidden="true">{ic}</div>
                <h3 className="how-t">{t}</h3>
                <p className="how-d">{d}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'2.5rem'}}>
            <a
              href={WA('Merhaba, sipariş vermek istiyorum. Nereden başlayabilirim?')}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-wa"
            >
              💬 Hemen Başla
            </a>
          </div>
        </div>
      </section>

      {/* ── FİYATLAR ── */}
      <section id="prices" className="sec" style={{background:'var(--ink)'}} aria-labelledby="prices-h">
        <div className="ctr">
          <div className="sh">
            <span className="eyebrow">₺ Şeffaf Fiyatlar · 2025–2026</span>
            <h2 className="h2" id="prices-h">Antalya Terzi <em>Fiyat Listesi</em></h2>
            <p className="sh-sub">Başlangıç fiyatları. Kesin fiyat için WhatsApp'tan fotoğraf ve ölçü gönderin.</p>
            <div className="divider" />
          </div>
          <div className="ptable-wrap">
            <table className="ptable" aria-label="Terzi ve tekstil hizmetleri fiyat listesi">
              <caption className="sr-only">Antalya Terzi Dikim Ütü Kuru Temizleme Fiyatları 2025–2026</caption>
              <thead>
                <tr>
                  <th scope="col">Hizmet</th>
                  <th scope="col">Başlangıç Fiyatı</th>
                  <th scope="col">Süre</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Erkek Takım Elbise Dikimi','₺2.500+','5–7 gün'],
                  ['Bayan Abiye / Gece Elbisesi','₺1.200+','5–7 gün'],
                  ['Gelinlik Dikimi','₺5.000+','14–21 gün'],
                  ['Günlük Elbise / Bluz','₺500+','3–5 gün'],
                  ['Kıyafet Tamir (Paça vb.)','₺100+','Aynı gün'],
                  ['Fermuar Değişimi','₺120+','Aynı gün'],
                  ['Bel / Kol Tadilat','₺200+','24–48 saat'],
                  ['Gömlek Ütü','₺80+','2–6 saat'],
                  ['Takım Elbise Buharlı Pres','₺150+','2–6 saat'],
                  ['Abiye Buharlama','₺120+','2–6 saat'],
                  ['Kuru Temizleme (Takım Elbise)','₺250+','24–48 saat'],
                  ['Kuru Temizleme (Abiye)','₺350+','24–48 saat'],
                  ['Üniforma Seri İmalat (50+ adet)','Teklif Al','Proje bazlı'],
                  ['Moda Tasarım & Kalıp Çıkarma','Teklif Al','7–14 gün'],
                ].map(([s,p,t]) => (
                  <tr key={s}><td>{s}</td><td>{p}</td><td>{t}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{textAlign:'center',marginTop:'2rem'}}>
            <a
              href={WA('Merhaba, fiyat teklifi almak istiyorum.')}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-gold"
            >
              📲 Ücretsiz Teklif Al
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec" aria-label="Sipariş ver">
        <h2 className="cta-h">
          Antalya'nın Her Köşesine<br/>
          <em>Adrese Terzi Servisi</em>
        </h2>
        <p style={{fontFamily:'var(--sans)',fontSize:'.88rem',color:'var(--muted)',marginBottom:'2rem',position:'relative'}}>
          Dikim · Ütü · Kuru Temizleme · Tekstil İmalat · Moda Tasarım · Adrese Servis
        </p>
        <div className="cta-btns">
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            💬 WhatsApp Sipariş
          </a>
          <a
            href={WA('Merhaba, seri imalat / toplu sipariş için teklif almak istiyorum.')}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            🏭 Seri İmalat Teklifi
          </a>
        </div>
        <p style={{fontFamily:'var(--sans)',fontSize:'.78rem',color:'var(--muted)',marginTop:'1.5rem',position:'relative'}}>
          Telefon:{' '}
          <a href={`tel:${PHONE_RAW}`} style={{color:'var(--gold)',textDecoration:'none'}}>
            {PHONE_DISPLAY}
          </a>
        </p>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="sec" style={{background:'var(--ink2)'}} aria-labelledby="faq-h">
        <div className="ctr">
          <div className="sh c">
            <span className="eyebrow">SSS</span>
            <h2 className="h2" id="faq-h">Sık Sorulan <em>Sorular</em></h2>
            <div className="divider" />
          </div>
          <div className="faq-list">
            {FAQS.map(([q, a], i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-q"
                  aria-expanded="false"
                  aria-controls={`faq-ans-${i}`}
                >
                  <span>{q}</span>
                  <span className="faq-ico" aria-hidden="true">+</span>
                </button>
                <div id={`faq-ans-${i}`} className="faq-a" role="region">
                  {a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── İLETİŞİM ── */}
      <section id="contact" className="sec" style={{background:'var(--ink3)'}} aria-labelledby="cont-h">
        <div className="ctr">
          <div className="sh">
            <span className="eyebrow">✦ İletişim</span>
            <h2 className="h2" id="cont-h">Bize <em>Ulaşın</em></h2>
            <div className="divider" />
          </div>
          <div className="cont-grid">
            <address style={{fontStyle:'normal'}}>
              {([
                ['📞','Telefon',<a href={`tel:${PHONE_RAW}`} key="tel">{PHONE_DISPLAY}</a>],
                ['💬','WhatsApp',<a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" key="wa">{PHONE_DISPLAY}</a>],
                ['🕐','Çalışma Saatleri',<span key="s">09:00 – 19:00 · Pzt–Cmt</span>],
                ['📍','Adres',<span key="a">Konyaaltı, Antalya</span>],
                ['🚗','Servis Alanı',<span key="sa">Tüm Antalya ilçeleri · Türkiye geneli kargo</span>],
                ['🌍','Diller',<span key="d">Türkçe · English · Русский</span>],
              ] as [string,string,React.ReactNode][]).map(([ic,lbl,val],i) => (
                <div key={i} className="crow">
                  <span style={{fontSize:'1rem',paddingTop:'.1rem'}} aria-hidden="true">{ic}</span>
                  <div>
                    <div className="clbl">{lbl}</div>
                    <div className="cval">{val}</div>
                  </div>
                </div>
              ))}
              <div style={{display:'flex',flexDirection:'column',gap:'.6rem',marginTop:'1.5rem'}}>
                <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer"
                  className="btn btn-wa" style={{justifyContent:'center'}}>
                  💬 WhatsApp'tan Yaz
                </a>
                <a href="https://maps.google.com/?q=Konyaaltı+Antalya" target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost" style={{justifyContent:'center'}}>
                  📍 Google Maps'te Gör
                </a>
              </div>
            </address>
            <div className="map-box">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25484.034!2d30.6946!3d36.8769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3914a3f49b36b%3A0xe9e87c5c9a6b2700!2sKonyaalti%2C%20Antalya!5e0!3m2!1str!2str!4v1720000000000"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SwapHubs Antalya Konyaaltı — Terzi & Tekstil İmalat Atölyesi"
                aria-label="Atölye konumu haritası"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="foot-brand">
          SwapHubs — Antalya Terzi · Dikim · Ütü · Kuru Temizleme · Tekstil & Moda İmalat Atölyesi
        </div>
        <nav className="foot-links" aria-label="Footer bağlantılar">
          {[
            ['https://www.swaphubs.com','Ana Sayfa'],
            ['/terzi','Terzi Can Antalya'],
            ['/antalya-bay-tailor-online-terzi-utu-hizmeti','Online Terzi'],
            ['#services','Hizmetler'],
            ['#prices','Fiyatlar'],
            ['#faq','SSS'],
            ['#contact','İletişim'],
          ].map(([href,label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <p className="foot-copy">
          © {new Date().getFullYear()} SwapHubs · Antalya Terzi & Tekstil Hizmetleri ·{' '}
          <a href={`tel:${PHONE_RAW}`} style={{color:'rgba(201,168,76,.3)',textDecoration:'none'}}>
            {PHONE_DISPLAY}
          </a>
        </p>
        <div className="foot-kws" aria-label="Anahtar kelimeler">
          {[
            'Antalya Terzi','Kıyafet Dikimi','Ütü Hizmeti','Kuru Temizleme',
            'Tekstil İmalat','Moda Tasarım','Fason Üretim','Adrese Servis',
            'Tailor Antalya','Fashion Atelier','Seri İmalat','Online Terzi',
            'Portnoj Antalya','Schneider Antalya','Tailor Turkey',
          ].map(k => <span key={k} className="foot-pill">{k}</span>)}
        </div>
      </footer>
    </>
  );
}
