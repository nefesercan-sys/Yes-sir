'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Lang = 'tr' | 'en' | 'ru' | 'de';
const PHONE = '905318986418';
const PHONE_DISPLAY = '+90 531 898 64 18';
const WA = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = WA('Merhaba, elbise dikimi hakkında bilgi almak istiyorum.');

/* ─── IMAGES ─────────────────────────────────────────────────────────────── */
const HERO_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1800&q=90&auto=format&fit=crop', alt: 'Özel elbise dikimi — Terzi Can Antalya' },
  { src: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f0e?w=1800&q=90&auto=format&fit=crop', alt: 'Elbise kumaş seçimi — Terzi Can Antalya' },
  { src: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=1800&q=90&auto=format&fit=crop', alt: 'Kadın elbise moda tasarım — Terzi Can Antalya' },
  { src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=90&auto=format&fit=crop', alt: 'Lüks elbise dikimi atölyesi — Terzi Can Antalya' },
];

const FILM_STRIP = [
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1594938298603-c8148c4b4f0e?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80&auto=format&fit=crop',
];

/* ─── SERVICE GROUPS ─────────────────────────────────────────────────────── */
const GROUPS = [
  {
    id: 'dikis',
    eyebrow: 'Özel Dikim',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f0e?w=900&q=85&auto=format&fit=crop',
    imgAlt: 'Elbise dikimi Antalya — Terzi Can',
    title: 'Elbise Dikimi',
    desc: 'Ölçüye özel bay-bayan kıyafet. Abiye, gelinlik, günlük elbise, takım elbise ve iş kıyafeti.',
    imageAlt: 'Elbise dikimi kumaş — Antalya',
    rows: [
      { name: 'Günlük Elbise', price: '₺600+', note: '3–5 gün' },
      { name: 'Abiye / Gece Elbisesi', price: '₺1.100+', note: '4–6 gün' },
      { name: 'Takım Elbise (Erkek)', price: '₺2.500+', note: '5–7 gün' },
    ],
  },
  {
    id: 'tadilat',
    eyebrow: 'Tamir & Tadilat',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop',
    imgAlt: 'Elbise tamir tadilat Antalya — Terzi Can',
    title: 'Tamir & Tadilat',
    desc: 'Paça kısaltma, bel daraltma, fermuar, astar değişimi — sevdiğiniz kıyafeti yenileyin.',
    rows: [
      { name: 'Paça / Kol Kısaltma', price: '₺150+', note: 'Aynı gün' },
      { name: 'Bel / Dar Alma', price: '₺200+', note: '24–48 saat' },
      { name: 'Fermuar Değişimi', price: '₺120+', note: 'Aynı gün' },
    ],
  },
  {
    id: 'tamirat',
    eyebrow: 'Tamirat & Yenileme',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=85&auto=format&fit=crop',
    imgAlt: 'Kumaş yırtık tamir — Terzi Can Antalya',
    title: 'Tamirat & Revizyonu',
    desc: 'Yırtık onarımı, astar değişimi, düğme dikimi ve her türlü kıyafet tamiratı. Aynı gün hizmet.',
    rows: [
      { name: 'Yırtık Onarımı', price: '₺100+', note: 'Aynı gün' },
      { name: 'Astar Değişimi', price: '₺200+', note: '48 saat' },
      { name: 'Düğme · İlik · Aksesuar', price: '₺80+', note: 'Aynı gün' },
    ],
  },
  {
    id: 'balo',
    eyebrow: 'Özel Gün & Gece',
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&auto=format&fit=crop',
    imgAlt: 'Gelinlik abiye özel gün elbise — Terzi Can Antalya',
    title: 'Gelinlik · Abiye · Özel Gün',
    desc: 'Gelinlik dikimi ve tadilatı, abiye, nişan, balo ve gala kıyafetleri. Randevulu özel atölye.',
    rows: [
      { name: 'Gelinlik Dikimi', price: '₺5.000+', note: '14–21 gün' },
      { name: 'Gelinlik Tadilatı', price: '₺500+', note: '3–5 gün' },
      { name: 'Balo / Gala Abiyesi', price: '₺1.500+', note: '7–10 gün' },
    ],
  },
];

const TRUST_POINTS = [
  { label: 'Randevulu çalışır', detail: 'Bekleme yok, zamanınız değerli.' },
  { label: 'Fiyatlandırma şeffaf', detail: 'Sürpriz ücret yoktur.' },
  { label: 'Antalya Konyaaltı', detail: 'Merkezi ve kolay ulaşılabilir atölye.' },
  { label: 'Ve değerlendirmeler', detail: '4.9 ✦ müşteri memnuniyeti garantisi.' },
];

/* ─── STITCH DIVIDER ─────────────────────────────────────────────────────── */
function StitchDivider() {
  return (
    <div className="stitch-divider" aria-hidden="true">
      <svg width="100%" height="8" viewBox="0 0 300 8" preserveAspectRatio="xMidYMid">
        <line x1="0" y1="3" x2="300" y2="3" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 3" />
      </svg>
    </div>
  );
}

/* ─── PROCESS STEPS ──────────────────────────────────────────────────────── */
const PROCESS = [
  { label: 'Adım 1', title: 'Fotoğraf Gönder', desc: 'WhatsApp\'tan fotoğraf veya ölçünüzü gönderin, ücretsiz fiyat alın.' },
  { label: 'Adım 2', title: 'Fiyatı Onaylayın', desc: 'Size özel teklifi onaylayın, gün ve detayları netleştirelim.' },
  { label: 'Adım 3', title: 'Dikis & Pröva', desc: 'Atölyemize gelin ya da adrese servisimizle tam ölçüde dikilir.' },
  { label: 'Adım 4', title: 'Teslim Alın', desc: 'Giymeye hazır, askıda, temiz teslim alın.' },
];

/* ─── FAQ ────────────────────────────────────────────────────────────────── */
const FAQS: [string, string][] = [
  ['Antalya\'da elbise dikimi ne kadar sürer?', 'Standart elbise dikimi 3–5 iş günü içinde tamamlanır. Acil durumlarda ekspres servis mevcuttur, lütfen randevu sırasında belirtin.'],
  ['Paça kısaltma fiyatı ne kadar?', 'Paça kısaltma ₺150\'den başlar. Kot paça ₺150, kumaş pantolon ₺175. Kesin fiyat için WhatsApp\'tan fotoğraf gönderin.'],
  ['Kaliteli dikişin güvencesi var mı?', 'Evet, giydiğinizde fit olmadıysa ücretsiz düzeltme yapıyoruz. Müşteri memnuniyeti garantimiz vardır.'],
  ['Antalya\'da adrese gelen terzi var mı?', 'Evet. Tüm Antalya ilçelerine — Konyaaltı, Muratpaşa, Kepez, Lara, Kemer ve daha fazlasına — araçlı servis sunuyoruz.'],
  ['Kendi kumaşımla elbise diktirilebilir mi?', 'Kesinlikle. Kendi kumaşınızı getirerek ya da kargo ile göndererek özel dikim yaptırabilirsiniz. Kumaş seçimi için de yardım ediyoruz.'],
];

/* ─── ALT PAGES ──────────────────────────────────────────────────────────── */
const ALT_SAYFALAR = [
  ['✂️', 'Paça Kısaltma Antalya', '/terzi/paca-kisaltma-antalya'],
  ['👔', 'Bay Terzi Antalya', '/terzi/bay-terzi-antalya'],
  ['👗', 'Bayan Terzi Antalya', '/terzi/bayan-terzi-antalya'],
  ['🏭', 'Dikiş Atölyesi Antalya', '/terzi/dikis-atolyesi-antalya'],
  ['🏨', 'Üniforma Üretimi Antalya', '/terzi/uniforma-uretimi-antalya'],
  ['🧺', 'Kuru Temizleme Antalya', '/terzi/kuru-temizleme-antalya'],
  ['🚗', 'Eve Gelen Terzi Antalya', '/terzi/eve-gelen-terzi-antalya'],
  ['💍', 'Gelinlik Tadilatı Antalya', '/terzi/gelinlik-tadilati'],
  ['🔧', 'Fermuar Değişimi Antalya', '/terzi/fermuar-degisimi-antalya'],
] as const;

const PHONE_DISPLAY_CONST = PHONE_DISPLAY;

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function ElbisedikimiClient() {
  const [scrolled, setScrolled] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const xRef = useRef(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Hero slideshow
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Film strip — requestAnimationFrame (setInterval değil)
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    const run = () => {
      xRef.current += 0.5;
      if (xRef.current >= half) xRef.current = 0;
      el.scrollLeft = xRef.current;
      rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --gold:#B8975A;--gold2:#D4B07A;--gold3:#8A6E3E;
          --cream:#FAF7F2;--cream2:#F2EDE4;--cream3:#E8E0D2;
          --ink:#1C1814;--ink2:#2E2820;--ink3:#3D3228;
          --text:#3A3028;--muted:#7A6E62;--light:#F7F3ED;
          --serif:'Cormorant Garamond',Georgia,serif;
          --sans:'DM Sans',system-ui,sans-serif;
          --shadow:0 4px 32px rgba(60,40,20,.1);
          --shadow-lg:0 16px 64px rgba(60,40,20,.16);
        }
        html{scroll-behavior:smooth}
        body{background:var(--cream);color:var(--text);font-family:var(--sans);font-weight:300;line-height:1.7;overflow-x:hidden}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--gold3)}

        /* NAV */
        .nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;transition:all .4s}
        .nav.up{background:rgba(250,247,242,.96);backdrop-filter:blur(20px);border-bottom:1px solid rgba(184,151,90,.15);padding:.8rem 2rem;box-shadow:0 2px 20px rgba(60,40,20,.07)}
        .nav-logo{font-family:var(--serif);font-size:1.5rem;color:var(--ink);text-decoration:none;letter-spacing:.04em;font-weight:600}
        .nav-logo span{color:var(--gold)}
        .nav-links{display:flex;gap:2rem;list-style:none}
        .nav-links a{color:var(--text);text-decoration:none;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;font-weight:500;transition:color .3s}
        .nav-links a:hover{color:var(--gold)}
        .nav-wa{display:inline-flex;align-items:center;gap:.4rem;background:#25D366;color:#fff;padding:.55rem 1.2rem;font-family:var(--sans);font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:2px;transition:all .25s}
        .nav-wa:hover{background:#1eba56;transform:translateY(-1px)}

        /* HERO */
        .hero{position:relative;height:100vh;min-height:700px;overflow:hidden;display:flex;align-items:flex-end}
        .hslide{position:absolute;inset:0;transition:opacity 1.2s ease}
        .hslide img{width:100%;height:100%;object-fit:cover;object-position:center 20%}
        .hslide.active{opacity:1}.hslide.inactive{opacity:0}
        .hov{position:absolute;inset:0;background:linear-gradient(to top,rgba(28,24,20,.78) 0%,rgba(28,24,20,.25) 55%,rgba(28,24,20,.1) 100%)}
        .hc{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 2rem 5rem;width:100%}
        .hbadge{display:inline-flex;align-items:center;gap:.6rem;font-size:.68rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.9);border:1px solid rgba(255,255,255,.35);padding:.35rem 1rem;margin-bottom:1.8rem;backdrop-filter:blur(4px);background:rgba(255,255,255,.08)}
        .hero h1{font-family:var(--serif);font-size:clamp(3rem,8vw,7.5rem);line-height:.9;font-weight:600;color:#fff;letter-spacing:-.01em}
        .hero h1 em{font-style:italic;color:var(--gold2)}
        .hsub{margin-top:1.4rem;font-size:.92rem;color:rgba(255,255,255,.8);max-width:520px;letter-spacing:.04em;line-height:1.9}
        .hacts{margin-top:2.2rem;display:flex;gap:.8rem;flex-wrap:wrap}
        .hdots{position:absolute;right:2rem;top:50%;transform:translateY(-50%);z-index:3;display:flex;flex-direction:column;gap:.5rem}
        .hdot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:all .3s;border:none}
        .hdot.on{background:#fff;transform:scale(1.4)}
        .hscroll{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);z-index:3;display:flex;flex-direction:column;align-items:center;gap:.4rem;color:rgba(255,255,255,.6);font-size:.65rem;letter-spacing:.2em;text-transform:uppercase}
        .hscroll-line{width:1px;height:40px;background:linear-gradient(to bottom,rgba(255,255,255,.6),transparent);animation:scrollpulse 2s ease-in-out infinite}
        @keyframes scrollpulse{0%,100%{opacity:.4}50%{opacity:1}}

        /* FILM STRIP */
        .strip-wrap{background:var(--ink);padding:1.2rem 0;overflow:hidden}
        .strip{display:flex;gap:4px;width:max-content;overflow:hidden}
        .strip-img{width:220px;height:148px;object-fit:cover;flex-shrink:0;filter:brightness(.7) saturate(.75);transition:filter .4s}
        .strip-img:hover{filter:brightness(1) saturate(1.1)}

        /* BREADCRUMB */
        .bc{background:var(--cream2);padding:.8rem 2rem;display:flex;gap:.45rem;flex-wrap:wrap;align-items:center;border-bottom:1px solid rgba(184,151,90,.1)}
        .bc a{font-size:.7rem;color:var(--muted);text-decoration:none;font-family:var(--sans)}
        .bc a:hover{color:var(--gold)}
        .bc strong{font-size:.7rem;color:var(--text)}

        /* SEO INTRO */
        .seo-intro{background:var(--cream3);border-left:3px solid var(--gold3);padding:1.4rem 2rem}
        .seo-intro p{font-size:.82rem;color:var(--muted);line-height:1.95;max-width:1100px;margin:0 auto}
        .seo-intro strong{color:var(--text)}

        /* STITCH DIVIDER */
        .stitch-divider{color:rgba(184,151,90,.3);padding:0 2rem;max-width:1200px;margin:0 auto}

        /* TRUST STRIP */
        .trust{background:var(--light);padding:2.5rem 2rem}
        .trust-inner{max-width:1100px;margin:0 auto}
        .trust-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:.8rem;gap:1px;background:rgba(184,151,90,.1)}
        .trust-item{background:var(--light);padding:1.2rem 1rem}
        .trust-item-label{font-family:var(--serif);font-size:.95rem;font-weight:600;color:var(--ink);margin-bottom:.2rem}
        .trust-item-detail{font-size:.73rem;color:var(--muted)}

        /* INTRO */
        .intro{background:var(--cream);padding:5rem 2rem}
        .intro-inner{max-width:900px;margin:0 auto;text-align:center}
        .intro-eyebrow{font-size:.65rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:1rem;display:block}
        .intro-title{font-family:var(--serif);font-size:clamp(2rem,4vw,3rem);font-weight:600;color:var(--ink);line-height:1.15;margin-bottom:1rem}
        .intro-text{font-size:.88rem;color:var(--muted);line-height:1.95;max-width:660px;margin:0 auto}

        /* SERVICE GROUPS */
        .groups{padding:5rem 2rem;background:var(--cream);margin:0 auto}
        .group{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:1px;background:rgba(184,151,90,.06)}
        .group:nth-child(even){direction:rtl}
        .group:nth-child(even) .group-body{direction:ltr}
        .group-media{position:relative;min-height:400px;overflow:hidden}
        .group-media img{width:100%;height:100%;object-fit:cover;object-fit:cover;display:block;transition:transform .7s ease}
        .group:hover .group-media img{transform:scale(1.04)}
        .group-body{background:#fff;padding:3rem 2.5rem;display:flex;flex-direction:column;justify-content:center}
        .group-eyebrow{font-size:.63rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:.7rem}
        .group-title{font-family:var(--serif);font-size:1.8rem;font-weight:600;color:var(--ink);line-height:1.15;margin-bottom:.7rem}
        .group-desc{font-size:.84rem;color:var(--muted);line-height:1.85;margin-bottom:1.4rem}
        .price-list{border-top:1px solid rgba(184,151,90,.12);padding-top:1rem}
        .price-row{display:flex;align-items:baseline;justify-content:space-between;padding:.55rem 0;border-bottom:1px solid rgba(184,151,90,.07)}
        .price-row:last-child{border-bottom:none}
        .price-name{font-size:.82rem;color:var(--text)}
        .price-note{font-size:.68rem;color:var(--muted);margin-top:.1rem}
        .price-val{font-family:var(--serif);font-size:1.05rem;font-weight:600;color:var(--gold3);white-space:nowrap;margin-left:.8rem}

        /* PROCESS */
        .process{background:var(--ink);padding:5rem 2rem}
        .process-inner{max-width:1100px;margin:0 auto}
        .process-head{text-align:center;margin-bottom:3rem}
        .process-head .intro-eyebrow{color:var(--gold2)}
        .process-head h2{font-family:var(--serif);font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:600;color:#fff;line-height:1.1}
        .process-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.06)}
        .process-step{background:var(--ink);padding:2.2rem 1.5rem;position:relative;padding-top:2.5rem}
        .process-step::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:transparent;transition:background .3s}
        .process-step:hover::before{background:linear-gradient(90deg,var(--gold),transparent)}
        .step-label{font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:.6rem}
        .step-title{font-family:var(--serif);font-size:1.15rem;font-weight:600;color:#fff;margin-bottom:.5rem}
        .step-desc{font-size:.75rem;color:rgba(255,255,255,.45);line-height:1.7}

        /* FAQ */
        .faq{background:var(--light);padding:5rem 2rem}
        .faq-inner{max-width:760px;margin:0 auto}
        .faq-head{text-align:center;margin-bottom:2.5rem}
        .faq-head h2{font-family:var(--serif);font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:600;color:var(--ink)}
        .faq-item{border-bottom:1px solid rgba(184,151,90,.12)}
        .faq-q{width:100%;background:none;border:none;padding:1.2rem 0;display:flex;align-items:center;justify-content:space-between;gap:.8rem;cursor:pointer;text-align:left;font-family:var(--sans);font-size:.9rem;color:var(--text);font-weight:400;transition:color .3s}
        .faq-q:hover{color:var(--gold3)}
        .faq-ico{flex-shrink:0;width:22px;height:22px;border:1px solid rgba(184,151,90,.35);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;color:var(--gold);transition:transform .35s}
        .faq-ico.open{transform:rotate(45deg)}
        .faq-a{max-height:0;overflow:hidden;transition:max-height .45s ease,padding .3s;font-size:.83rem;color:var(--muted);line-height:1.9}
        .faq-a.open{max-height:300px;padding-bottom:1.2rem}

        /* CTA */
        .cta{background:var(--cream2);padding:5rem 2rem;text-align:center;position:relative;overflow:hidden}
        .cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(184,151,90,.07),transparent);pointer-events:none}
        .cta-inner{position:relative;max-width:700px;margin:0 auto}
        .cta h2{font-family:var(--serif);font-size:clamp(1.8rem,3.5vw,3rem);font-weight:600;color:var(--ink);margin-bottom:.8rem}
        .cta h2 em{color:var(--gold);font-style:italic}
        .cta p{font-size:.88rem;color:var(--muted);margin-bottom:2rem}
        .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}

        /* ALL SERVICES */
        .allsvc{background:var(--ink2);padding:4rem 2rem}
        .allsvc-inner{max-width:1100px;margin:0 auto}
        .allsvc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:.8rem;margin-top:2.5rem}
        .allsvc-link{display:flex;align-items:center;gap:.7rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:2px;padding:1rem 1.2rem;text-decoration:none;color:rgba(255,255,255,.85);font-size:.84rem;transition:all .25s}
        .allsvc-link:hover{background:rgba(184,151,90,.1);border-color:rgba(184,151,90,.3);transform:translateY(-2px)}

        /* CONTACT */
        .contact{background:var(--ink);padding:5rem 2rem}
        .contact-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
        .crow{display:flex;gap:.8rem;align-items:flex-start;padding:.9rem 0;border-bottom:1px solid rgba(255,255,255,.06)}
        .clbl{font-size:.64rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold2);margin-bottom:.2rem;font-weight:500}
        .cval{font-size:.9rem;color:rgba(255,255,255,.85)}
        .cval a{color:rgba(255,255,255,.85);text-decoration:none;transition:color .3s}
        .cval a:hover{color:var(--gold2)}
        .map-box{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:2px;height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.8rem}

        /* FOOTER */
        footer{background:var(--ink2);border-top:1px solid rgba(184,151,90,.1);padding:2.5rem 2rem;text-align:center}
        .foot-brand{font-family:var(--serif);font-size:1.15rem;color:var(--gold2);margin-bottom:.4rem}
        .foot-links{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;margin-top:1.2rem}
        .foot-links a{font-size:.72rem;color:rgba(212,176,122,.75);text-decoration:none;border:1px solid rgba(184,151,90,.18);padding:.25rem .65rem;border-radius:2px;transition:all .25s}
        .foot-links a:hover{color:var(--gold2);border-color:rgba(184,151,90,.4)}
        .foot-kw{display:flex;flex-wrap:wrap;gap:.3rem;justify-content:center;margin-top:1rem}
        .foot-pill{font-size:.57rem;color:rgba(184,151,90,.25);border:1px solid rgba(184,151,90,.08);padding:.15rem .5rem}

        /* WA FLOAT */
        .wafloat{position:fixed;bottom:1.8rem;right:1.8rem;z-index:150;width:3.2rem;height:3.2rem;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;font-size:1.4rem;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,.45);animation:wapulse 2.5s ease infinite}
        .wafloat:hover{transform:scale(1.1);animation:none}
        @keyframes wapulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)}50%{box-shadow:0 4px 30px rgba(37,211,102,.6),0 0 0 8px rgba(37,211,102,.08)}}

        /* BUTTONS */
        .btn-gold{display:inline-flex;align-items:center;gap:.5rem;background:var(--gold);color:#fff;padding:.9rem 2rem;font-family:var(--sans);font-size:.78rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s;border-radius:1px}
        .btn-gold:hover{background:var(--gold3);transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,151,90,.35)}
        .btn-outline{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:rgba(255,255,255,.9);padding:.9rem 2rem;font-family:var(--sans);font-size:.78rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(255,255,255,.3);cursor:pointer;transition:all .3s;border-radius:1px}
        .btn-outline:hover{border-color:var(--gold2);color:var(--gold2);transform:translateY(-2px)}
        .btn-outline-dark{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--gold3);padding:.85rem 1.8rem;font-family:var(--sans);font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(184,151,90,.35);cursor:pointer;transition:all .3s;border-radius:1px}
        .btn-outline-dark:hover{border-color:var(--gold);color:var(--gold);background:rgba(184,151,90,.06)}

        /* HELPERS */
        .ey{font-size:.65rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:.6rem;display:block}
        .ey-light{color:var(--gold2)}
        .gl{display:block;width:36px;height:1.5px;background:var(--gold);margin-top:1rem}
        .gl-center{margin-left:auto;margin-right:auto}

        /* RESPONSIVE */
        @media(max-width:960px){
          .nav-links{display:none}
          .group,.contact-inner{grid-template-columns:1fr}
          .group:nth-child(even){direction:ltr}
          .group-media{min-height:260px}
          .process-steps{grid-template-columns:repeat(2,1fr)}
          .trust-grid{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:600px){
          .process-steps{grid-template-columns:1fr}
          .trust-grid{grid-template-columns:1fr}
          .hacts{flex-direction:column}
          .cta-btns{flex-direction:column;align-items:center}
          .hero h1{font-size:2.8rem}
        }
      `}</style>

      {/* WA FLOAT */}
      <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="wafloat" aria-label="WhatsApp ile iletişim">💬</a>

      {/* NAV */}
      <nav className={`nav${scrolled ? ' up' : ''}`} aria-label="Ana menü">
        <a href="https://www.swaphubs.com" className="nav-logo">Terzi <span>Can</span></a>
        <ul className="nav-links">
          <li><a href="#hizmetler">Hizmetler</a></li>
          <li><a href="#nasil-calisir">Nasıl Çalışır?</a></li>
          <li><a href="#sss">SSS</a></li>
          <li><a href="#iletisim">İletişim</a></li>
        </ul>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="nav-wa">
          💬 Hemen Sipariş
        </a>
      </nav>

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-h1">
        {HERO_IMAGES.map((img, i) => (
          <div key={i} className={`hslide${i === heroIdx ? ' active' : ' inactive'}`}>
            <img
              src={img.src}
              alt={img.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              width={1800}
              height={1000}
            />
          </div>
        ))}
        <div className="hov" aria-hidden="true" />
        <div className="hdots">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`hdot${i === heroIdx ? ' on' : ''}`}
              onClick={() => setHeroIdx(i)}
              aria-label={`Slayt ${i + 1}`}
            />
          ))}
        </div>
        <div className="hc">
          <span className="hbadge">✦ Antalya · Elbise Dikimi · Terzi Can</span>
          <h1 id="hero-h1">
            Antalya<br /><em>Elbise Dikimi</em>
          </h1>
          <p className="hsub">
            Ölçüye özel bay & bayan kıyafet dikimi, tamir & tadilat, gelinlik, abiye ve özel gün elbisesi.
            Konyaaltı merkez · Tüm Antalya'ya adrese servis.
          </p>
          <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span style={{ color: '#f59e0b', fontSize: '1rem' }}>⭐⭐⭐⭐⭐</span>
            <span style={{ fontSize: '.88rem', fontWeight: 600, color: '#fff', marginLeft: '.3rem' }}>4.9</span>
            <span style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.55)' }}>(94 değerlendirme)</span>
          </div>
          <div className="hacts">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn-gold">💬 WhatsApp'tan Yazın</a>
            <a href="#hizmetler" className="btn-outline">Hizmetleri Gör ↓</a>
          </div>
        </div>
        <div className="hscroll" aria-hidden="true">
          <div className="hscroll-line" />
          <span>scroll</span>
        </div>
      </section>

      {/* FILM STRIP */}
      <div className="strip-wrap" aria-hidden="true">
        <div className="strip" ref={stripRef}>
          {[...FILM_STRIP, ...FILM_STRIP].map((src, i) => (
            <img key={i} src={src} alt="" className="strip-img" loading="lazy" width={220} height={148} />
          ))}
        </div>
      </div>

      {/* BREADCRUMB */}
      <nav className="bc" aria-label="Sayfa yolu">
        <a href="https://www.swaphubs.com">SwapHubs</a>
        <span aria-hidden="true">›</span>
        <a href="/terzi">Terzi Can Antalya</a>
        <span aria-hidden="true">›</span>
        <strong>Elbise Dikimi Antalya</strong>
      </nav>

      {/* SEO INTRO */}
      <div className="seo-intro" role="complementary">
        <p>
          <strong>Terzi Can Antalya</strong> olarak Konyaaltı merkezli atölyemizden
          tüm Antalya ilçelerine — <strong>Muratpaşa, Kepez, Lara, Alanya, Kemer, Belek ve Side</strong>'ye —
          adrese servis sunuyoruz. <strong>Ölçüye özel elbise dikimi</strong>, takım elbise, abiye, gelinlik dikimi ve tadilatı;
          paça kısaltma, bel daraltma, fermuar değişimi gibi her nevi <strong>kıyafet tamir ve tadilat</strong>;
          <strong>gelinlik ve özel gün kıyafetleri</strong> konusunda Antalya'nın güvenilir terzisi.
          WhatsApp ile fiyat alın, randevunuzu belirleyin.
        </p>
      </div>

      {/* TRUST STRIP */}
      <section className="trust" aria-label="Neden Terzi Can?">
        <div className="trust-inner">
          <span className="ey">✦ Neden Terzi Can?</span>
          <div className="trust-grid">
            {TRUST_POINTS.map((tp, i) => (
              <div key={i} className="trust-item">
                <div className="trust-item-label">{tp.label}</div>
                <div className="trust-item-detail">{tp.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StitchDivider />

      {/* INTRO */}
      <section className="intro">
        <div className="intro-inner">
          <span className="intro-eyebrow">✦ Antalya'nın Terzisi</span>
          <h2 className="intro-title">
            Her Dikiş <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Bir Sanat</em>
          </h2>
          <p className="intro-text">
            Terzi Can Atölyesi olarak her kıyafete özel yaklaşıyoruz. Ölçüye özel dikim, titiz tadilat ve
            lüks kumaş seçeneğiyle hayalinizdeki elbiseyi hayata geçiriyoruz. Bay ve bayan kıyafeti,
            özel gün elbiseleri ve seri imalat — tek adres, tüm tekstil çözümleri.
          </p>
          <span className="gl gl-center" />
        </div>
      </section>

      {/* SERVICE GROUPS */}
      <section id="hizmetler" aria-labelledby="svc-heading">
        <div style={{ background: 'var(--cream)', padding: '0 2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <span className="ey">✦ Hizmet Kategorileri</span>
          <h2 id="svc-heading" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1 }}>
            Elbise Dikimi &amp; Tamir Hizmetleri
          </h2>
          <span className="gl" />
        </div>

        <div className="groups">
          {GROUPS.map((g, i) => (
            <article key={g.id} id={g.id} className="group">
              <div className="group-media">
                <img
                  src={g.img}
                  alt={g.imgAlt}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  width={900}
                  height={500}
                />
              </div>
              <div className="group-body">
                <div className="group-eyebrow">{g.eyebrow}</div>
                <h3 className="group-title">{g.title}</h3>
                <p className="group-desc">{g.desc}</p>
                <div className="price-list">
                  {g.rows.map((row) => (
                    <div key={row.name} className="price-row">
                      <div>
                        <div className="price-name">{row.name}</div>
                        <div className="price-note">{row.note}</div>
                      </div>
                      <span className="price-val">{row.price}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1.4rem' }}>
                  <a
                    href={WA(`Merhaba, ${g.title} hakkında bilgi ve fiyat almak istiyorum.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-dark"
                  >
                    💬 Fiyat Al →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="nasil-calisir" className="process" aria-labelledby="process-h">
        <div className="process-inner">
          <div className="process-head">
            <span className="intro-eyebrow ey-light">📱 Kolay Sipariş</span>
            <h2 id="process-h">Nasıl Çalışır?</h2>
            <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.45)', marginTop: '.7rem', maxWidth: '420px', margin: '.7rem auto 0' }}>
              WhatsApp'tan başlayın — 4 adımda hazır.
            </p>
          </div>
          <div className="process-steps">
            {PROCESS.map((p, i) => (
              <div key={i} className="process-step">
                <div className="step-label">{p.label}</div>
                <h3 className="step-title">{p.title}</h3>
                <p className="step-desc">{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href={WA('Merhaba, elbise dikimi için başlamak istiyorum.')} target="_blank" rel="noopener noreferrer" className="btn-gold">
              💬 Hemen Başla
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="sss" className="faq" aria-labelledby="faq-h">
        <div className="faq-inner">
          <div className="faq-head">
            <span className="ey">SSS</span>
            <h2 id="faq-h">Sık Sorulan Sorular</h2>
            <span className="gl gl-center" />
          </div>
          {FAQS.map(([q, a], i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-q"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                aria-controls={`faq-ans-${i}`}
              >
                <span style={{ flex: 1 }}>{q}</span>
                <span className={`faq-ico${openFaq === i ? ' open' : ''}`}>+</span>
              </button>
              <div id={`faq-ans-${i}`} className={`faq-a${openFaq === i ? ' open' : ''}`} role="region">
                {a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta" aria-label="Sipariş ver">
        <div className="cta-inner">
          <h2>Antalya'ya <em>Adrese Servis</em></h2>
          <p>Elbise dikimi · Tamir & Tadilat · Gelinlik · Abiye · Konyaaltı · Tüm Antalya</p>
          <div className="cta-btns">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn-gold">
              💬 WhatsApp Sipariş
            </a>
            <a href={`tel:+${PHONE}`} className="btn-outline-dark">
              📞 {PHONE_DISPLAY_CONST}
            </a>
          </div>
        </div>
      </section>

      {/* ALL SERVICES */}
      <section className="allsvc" aria-labelledby="allsvc-h">
        <div className="allsvc-inner">
          <div style={{ textAlign: 'center', marginBottom: '.5rem' }}>
            <span className="ey ey-light">✦ Tüm Hizmet Sayfalarımız</span>
            <h2 id="allsvc-h" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 600, color: '#fff' }}>
              Detaylı Bilgi İçin Tıklayın
            </h2>
            <span className="gl gl-center" />
          </div>
          <div className="allsvc-grid">
            {ALT_SAYFALAR.map(([ic, label, href]) => (
              <Link key={href} href={href} className="allsvc-link">
                <span style={{ fontSize: '1.15rem' }}>{ic}</span>
                <span>{label}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--gold2)', fontSize: '.8rem' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="iletisim" className="contact" aria-labelledby="cont-h">
        <div className="contact-inner">
          <div>
            <span className="ey ey-light">✦ İletişim</span>
            <h2 id="cont-h" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontStyle: 'italic', fontWeight: 600, color: '#fff', marginBottom: '1.5rem' }}>
              Bize Ulaşın
            </h2>
            <address style={{ fontStyle: 'normal' }}>
              {([
                ['📞', 'Telefon', <a href={`tel:+${PHONE}`} key="tel">{PHONE_DISPLAY_CONST}</a>],
                ['💬', 'WhatsApp', <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" key="wa">{PHONE_DISPLAY_CONST}</a>],
                ['🕐', 'Çalışma Saatleri', <span key="s">09:00 – 19:00 · Pzt–Cmt</span>],
                ['📍', 'Bölge', <span key="a">Konyaaltı, Antalya — Tüm ilçelere servis</span>],
                ['🌍', 'Diller', <span key="d">🇹🇷 TR · 🇬🇧 EN · 🇷🇺 RU · 🇩🇪 DE</span>],
              ] as [string, string, React.ReactNode][]).map(([ic, lbl, val], i) => (
                <div key={i} className="crow">
                  <span style={{ fontSize: '1rem', paddingTop: '.1rem' }} aria-hidden="true">{ic}</span>
                  <div>
                    <div className="clbl">{lbl}</div>
                    <div className="cval">{val}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem', marginTop: '2rem' }}>
                <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ justifyContent: 'center' }}>💬 WhatsApp'tan Yaz</a>
                <a href="https://maps.app.goo.gl/rpgwjJgWZHfgafTy5" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ justifyContent: 'center' }}>📍 Google Maps'te Gör</a>
              </div>
            </address>
          </div>
          <div className="map-box">
            <div style={{ fontSize: '3rem' }}>📍</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', color: 'rgba(255,255,255,.8)' }}>Konyaaltı, Antalya</div>
            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.35)', textAlign: 'center', maxWidth: '200px', lineHeight: '1.6' }}>
              Tüm Antalya ilçelerine elbise dikimi ve tamir servisi.
            </p>
            <a href="https://maps.app.goo.gl/rpgwjJgWZHfgafTy5" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '.75rem' }}>📍 Haritada Gör</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-brand">
          Terzi Can · Antalya Elbise Dikimi · Tamir & Tadilat Atölyesi
        </div>
        <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)', marginTop: '.3rem' }}>
          © 2026 SwapHubs — Antalya Terzi & Elbise Dikimi · {PHONE_DISPLAY_CONST}
        </p>
        <nav className="foot-links" aria-label="Footer hizmet linkleri">
          {ALT_SAYFALAR.map(([, label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <div className="foot-kw" aria-hidden="true">
          {['Antalya Elbise Dikimi', 'Terzi Antalya', 'Paça Kısaltma', 'Gelinlik Dikimi', 'Abiye Tamirat', 'Tadilat Antalya', 'Kıyafet Dikimi', 'Tailor Antalya'].map(k => (
            <span key={k} className="foot-pill">{k}</span>
          ))}
        </div>
      </footer>
    </>
  );
}
