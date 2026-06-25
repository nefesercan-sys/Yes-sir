'use client';

import { useState, useEffect, useRef } from 'react';

const PHONE = '905318986418';
const WA = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = WA('Merhaba, terzi hizmetiniz hakkında bilgi almak istiyorum.');

// ─── Unsplash — tekstil / moda / terzi odaklı görseller ───────────────────────
const IMGS = {
  hero:      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=85&auto=format&fit=crop',
  erkek:     'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop',
  bayan:     'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop',
  online:    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop',
  utu:       'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=80&auto=format&fit=crop',
  tamir:     'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80&auto=format&fit=crop',
  tasarim:   'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800&q=80&auto=format&fit=crop',
  seri:      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&auto=format&fit=crop',
  spor:      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80&auto=format&fit=crop',
  about1:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
  about2:    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80&auto=format&fit=crop',
  about3:    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80&auto=format&fit=crop',
};

const SERVICES = [
  { id:'erkek-dikim', icon:'👔', badge:'EN POPÜLER', badgeColor:'#C5973A',
    img: IMGS.erkek,
    title:'Erkek Kıyafet Dikimi', sub:'Takım Elbise · Gömlek · Pantolon · Blazer · Smokin',
    desc:'Ölçüye özel erkek giyim. İş toplantısından özel günlere mükemmel fit garantisi. Yerli ve ithal kumaş seçeneği.',
    feats:['Takım Elbise','Gömlek','Pantolon','Blazer','Smokin','Yelek'],
    price:'₺800', note:"Takım elbise ₺2.500'den", time:'3–7 gün',
    waMsg:'Merhaba, erkek kıyafet dikimi hakkında bilgi almak istiyorum.' },
  { id:'bayan-dikim', icon:'👗', badge:'', badgeColor:'',
    img: IMGS.bayan,
    title:'Bayan Kıyafet Dikimi', sub:'Elbise · Bluz · Etek · Tulum · İş Kıyafeti · Abiye',
    desc:'Günlük elbiseden abiyeye, iş kıyafetinden özel gün giysisine — ölçülerinize tam oturan kıyafetler.',
    feats:['Elbise','Bluz','Etek','Tulum','İş Kıyafeti','Abiye','Gelinlik'],
    price:'₺600', note:"Abiye ₺500'den", time:'3–5 gün',
    waMsg:'Merhaba, bayan kıyafet dikimi hakkında bilgi almak istiyorum.' },
  { id:'online-terzi', icon:'📱', badge:'YENİ', badgeColor:'#059669',
    img: IMGS.online,
    title:'Online Terzi Hizmeti', sub:'Fotoğraf Gönderin · Ölçü Verin · Kargoya Gelsin',
    desc:'Antalya dışında mısınız? WhatsApp\'tan model ve ölçülerinizi gönderin, dikip Türkiye geneline kargoluyoruz.',
    feats:['WhatsApp ile Sipariş','Görüntülü Ölçü','Model Seçimi','Kargo Teslimat'],
    price:'Ücretsiz', note:'Görüşme ücretsiz', time:'5–10 gün (kargo dahil)',
    waMsg:'Merhaba, online terzi hizmetiniz hakkında bilgi almak istiyorum.' },
  { id:'utu-hizmeti', icon:'🧹', badge:'EKSPRES', badgeColor:'#E11D48',
    img: IMGS.utu,
    title:'Ütü & Buharlı Presleme', sub:'Profesyonel Ütü · Otel Alım-Teslimat · Aynı Gün',
    desc:'Tatilde buruşuk kıyafet kabul yok! Otelinden alıp profesyonel buharlı presle ütüleyip aynı gün teslim.',
    feats:['Gömlek Ütü','Takım Elbise Pres','Otel Alım','Aynı Gün Teslim'],
    price:'₺80/adet', note:'Toplu indirim var', time:'2–6 saat',
    waMsg:'Merhaba, ütü hizmeti almak istiyorum. Otelime gelebilir misiniz?' },
  { id:'tamir-tadilat', icon:'✂️', badge:'', badgeColor:'',
    img: IMGS.tamir,
    title:'Tamir & Tadilat', sub:'Paça Kısaltma · Fermuar · Yırtık · Bel Alma',
    desc:'Sevdiğiniz kıyafeti değiştirmenize gerek yok. Aynı gün teslim mümkün.',
    feats:['Paça Kısaltma','Fermuar','Yırtık Onarımı','Bel Alma','Kol Kısaltma'],
    price:'₺100', note:"Paça ₺150'den", time:'Aynı gün – 48 saat',
    waMsg:'Merhaba, kıyafet tamir ve tadilat hakkında bilgi almak istiyorum.' },
  { id:'model-tasarim', icon:'✏️', badge:'ÖZEL', badgeColor:'#7C3AED',
    img: IMGS.tasarim,
    title:'Kişiye Özel Model Tasarım', sub:'Özgün Tasarım · Kalıp Çıkarma · Prototip',
    desc:'Hayalinizdeki kıyafeti gerçeğe dönüştürüyoruz. Kalıp çıkarma, prototip ve seri üretime hazırlık.',
    feats:['Tasarım Danışmanlığı','Kalıp Çıkarma','Prototip Dikimi','Teknik Çizim'],
    price:'Teklif Al', note:'Proje bazında fiyat', time:'7–14 gün',
    waMsg:'Merhaba, kişiye özel model tasarım hakkında bilgi almak istiyorum.' },
  { id:'seri-imalat', icon:'🏭', badge:'B2B', badgeColor:'#1E40AF',
    img: IMGS.seri,
    title:'Tekstil Atölyesi & Seri İmalat', sub:'Fason Üretim · Toplu Sipariş · Marka Üretimi',
    desc:'Markalar ve butikler için tam kapsamlı tekstil üretimi. Min. 50 adetten başlayan toplu üretim.',
    feats:['Fason Üretim','Kalıp Çıkarma','Kalite Kontrol','Min. 50 Adet'],
    price:'Teklif Al', note:'Min. 50 adet', time:'Miktara göre',
    waMsg:'Merhaba, seri imalat hakkında bilgi almak istiyorum.' },
  { id:'spor-gunluk', icon:'🏃', badge:'', badgeColor:'',
    img: IMGS.spor,
    title:'Spor & Günlük Kıyafet', sub:'Eşofman · Sweatshirt · Kapüşonlu · Spor Şort',
    desc:'Spor giyimde de kişiye özel olun. Nakış ve logo baskı dahil. Takım siparişleri için toplu fiyat.',
    feats:['Eşofman','Sweatshirt','Kapüşonlu','Logo Nakış','Takım Sipariş'],
    price:'₺400', note:'Toplu indirim var', time:'3–7 gün',
    waMsg:'Merhaba, spor kıyafet dikimi hakkında bilgi almak istiyorum.' },
];

const PRICE_TABLE = [
  { cat:'Erkek Dikimi', rows:[
    ['Takım Elbise (2 parça)','₺2.500+','5–7 gün'],
    ['Takım Elbise (3 parça)','₺3.200+','7–10 gün'],
    ['Erkek Gömlek','₺800+','3–5 gün'],
    ['Erkek Pantolon','₺700+','3–5 gün'],
    ['Blazer / Ceket','₺1.500+','5–7 gün'],
    ['Smokin','₺3.500+','7–14 gün'],
  ]},
  { cat:'Bayan Dikimi', rows:[
    ['Günlük Elbise','₺600+','3–5 gün'],
    ['İş Kıyafeti','₺800+','3–5 gün'],
    ['Abiye / Gece Elbisesi','₺1.200+','5–7 gün'],
    ['Gelinlik','₺5.000+','14–21 gün'],
    ['Bluz / Etek','₺500+','2–4 gün'],
    ['Tulum','₺900+','4–6 gün'],
  ]},
  { cat:'Ütü & Temizlik', rows:[
    ['Gömlek Ütü','₺80+','Aynı gün'],
    ['Takım Elbise Pres','₺150+','Aynı gün'],
    ['Elbise Buharlama','₺120+','Aynı gün'],
    ['Mont / Kaban Ütü','₺200+','24 saat'],
    ['Toplu Ütü (10+ adet)','₺60+/adet','Aynı gün'],
  ]},
  { cat:'Tamir & Tadilat', rows:[
    ['Paça Kısaltma','₺150+','Aynı gün'],
    ['Fermuar Değişimi','₺120+','Aynı gün'],
    ['Yırtık Onarımı','₺100+','Aynı gün'],
    ['Bel Alma / Daraltma','₺200+','24–48 saat'],
    ['Kol Kısaltma','₺200+','24–48 saat'],
    ['Astar Değişimi','₺300+','48 saat'],
  ]},
];

// ─── Yorumlar — HTML microdata KALDIRILDI, JSON-LD'de var ─────────────────────
const REVIEWS = [
  { name:'Kemal A.', city:'Antalya', date:'Nisan 2025', stars:5,
    text:'"Erkek takım elbise dikimi için geldim. Ölçüler mükemmel alındı, kumaş kalitesi ve işçilik çok iyiydi."' },
  { name:'Ayşe T.', city:'İstanbul', date:'Mayıs 2025', stars:5,
    text:'"İstanbul\'dan online sipariş verdim. 8 günde kapıma geldi. Fit mükemmel, çok memnunum!"' },
  { name:'Mehmet S.', city:'Ankara', date:'Mart 2025', stars:5,
    text:'"200 adet iş gömleği seri imalat yaptırdık. Zamanında, eksiksiz ve kaliteli teslim."' },
  { name:'Sarah M.', city:'London', date:'Haziran 2025', stars:5,
    text:'"Visited Antalya, needed my dress ironed urgently. Picked up from hotel, delivered in 3h. Amazing!"' },
  { name:'Fatma K.', city:'Antalya', date:'Şubat 2025', stars:5,
    text:'"Gelinlik için kişiye özel tasarım yaptırdım. Sonuç hayalimden daha güzeldi!"' },
  { name:'Ali R.', city:'Kemer', date:'Mayıs 2025', stars:5,
    text:'"Kemer\'deki otelimden kurye ile ütü hizmeti aldım. Aynı gün teslim, çok profesyonel."' },
];

const FAQS: [string,string][] = [
  ["Antalya'da erkek takım elbise dikimi fiyatı ne kadar?","₺2.500'den başlar. WhatsApp'tan fotoğraf ve ölçü gönderin, 30 dakika içinde fiyat bildiririz."],
  ["Online terzi hizmeti nasıl çalışır?","WhatsApp'tan model fotoğrafı ve ölçülerinizi gönderin. Fiyatı onaylayın. Kıyafet dikildikten sonra adresinize kargo."],
  ["Ütü için otelime geliyor musunuz?","Evet! Antalya'daki tüm otellere kurye ile alım ve teslimat. Aynı gün teslim garantisi."],
  ["Seri imalat için minimum sipariş adedi nedir?","Minimum 50 adet. Numune ve prototip için tek adet kabul edilir."],
  ["Kişiye özel tasarım hizmeti veriyor musunuz?","Evet. Kendi tasarımınızı getirebilir ya da tasarımcılarımızla çalışabilirsiniz. Kalıp çıkarma dahil."],
  ["Tamir ve tadilat ne kadar sürer?","Paça, fermuar gibi basit işlemler aynı gün. Tadilat 24–48 saat. Ekspres hizmet mevcuttur."],
  ["Türkiye geneline kargo yapıyor musunuz?","Evet. Antalya içi ücretsiz kurye, Türkiye geneli kargo. 5–10 iş günü."],
  ["Kumaş seçimi konusunda yardımcı oluyor musunuz?","Evet. Yerli ve ithal kumaş stoğumuzdan seçim yapabilir ya da kendi kumaşınızı getirebilirsiniz."],
];

export default function OnlineTailorClient() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [priceTab, setPriceTab] = useState(0);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const obsRef = useRef<IntersectionObserver|null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    obsRef.current = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.id) {
          setVisible(p => new Set([...p, e.target.id]));
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-ani]').forEach(el => obsRef.current?.observe(el));
    return () => obsRef.current?.disconnect();
  }, []);

  const faqId = (i: number) => `faq-ans-${i}`;

  return (
    <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", background:'#0C0B09', color:'#F0EBE0', overflowX:'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        :root{
          --gold:#C9A84C; --gold2:#E8C97A; --gold3:#7A5C1E;
          --ink:#0C0B09; --ink2:#141210; --ink3:#1C1A16; --ink4:#242118;
          --bone:#F0EBE0; --bone2:#DDD5C4; --muted:#7A7060;
          --wa:#25D366; --serif:'Cormorant Garamond',Georgia,serif;
          --sans:'DM Sans',system-ui,sans-serif;
        }
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-thumb{background:var(--gold3)}

        /* SKIP */
        .skip{position:absolute;top:-40px;left:0;background:var(--gold);color:var(--ink);
              padding:.5rem 1rem;font-weight:700;z-index:999;font-family:var(--sans)}
        .skip:focus{top:0}

        /* NAV */
        .nav{position:fixed;top:0;left:0;right:0;z-index:200;
             padding:1.1rem 2.5rem;display:flex;align-items:center;
             justify-content:space-between;transition:all .4s}
        .nav.up{background:rgba(12,11,9,.96);backdrop-filter:blur(20px);
                border-bottom:1px solid rgba(201,168,76,.1);padding:.7rem 2.5rem}
        .nav-logo{font-family:var(--serif);font-size:1.35rem;font-weight:700;
                  color:var(--gold);text-decoration:none;letter-spacing:.02em}
        .nav-logo em{color:var(--bone);font-style:italic;font-weight:300;font-size:1rem}
        .nav-links{display:flex;gap:2rem;list-style:none}
        .nav-links a{color:var(--bone2);text-decoration:none;font-size:.72rem;
                     letter-spacing:.12em;text-transform:uppercase;font-family:var(--sans);
                     transition:color .2s}
        .nav-links a:hover{color:var(--gold)}
        .nav-cta{background:var(--gold);color:var(--ink);padding:.6rem 1.5rem;
                 font-family:var(--sans);font-size:.72rem;font-weight:600;
                 letter-spacing:.08em;text-transform:uppercase;text-decoration:none;
                 border-radius:2px;transition:all .25s}
        .nav-cta:hover{background:var(--gold2);transform:translateY(-1px)}

        /* HERO */
        .hero{position:relative;min-height:100vh;display:grid;
              grid-template-columns:1fr 1fr;overflow:hidden}
        .hero-left{display:flex;flex-direction:column;justify-content:flex-end;
                   padding:8rem 3.5rem 5rem 5rem;position:relative;z-index:2}
        .hero-right{position:relative;overflow:hidden}
        .hero-right::before{content:'';position:absolute;inset:0;z-index:1;
          background:linear-gradient(90deg,var(--ink) 0%,transparent 45%)}
        .hero-img{width:100%;height:100%;object-fit:cover;object-position:top center;
                  filter:brightness(.5) saturate(.7)}
        .hero-tag{display:inline-flex;align-items:center;gap:.7rem;
                  font-family:var(--sans);font-size:.65rem;letter-spacing:.3em;
                  text-transform:uppercase;color:var(--gold);
                  border-bottom:1px solid rgba(201,168,76,.3);
                  padding-bottom:.5rem;margin-bottom:2rem;width:fit-content}
        .hero h1{font-family:var(--serif);font-size:clamp(3rem,5.5vw,5.5rem);
                 font-weight:700;line-height:1.0;margin-bottom:1.5rem;
                 letter-spacing:-.01em}
        .hero h1 em{color:var(--gold);font-style:italic;display:block}
        .hero-sub{font-family:var(--sans);font-size:.9rem;color:var(--muted);
                  line-height:1.85;max-width:400px;margin-bottom:2.5rem}
        .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:3.5rem}
        .hero-stats{display:grid;grid-template-columns:repeat(4,1fr);
                    padding-top:2rem;border-top:1px solid rgba(201,168,76,.1)}
        .hstat-n{font-family:var(--serif);font-size:1.9rem;color:var(--gold);
                 font-weight:700;line-height:1;display:block}
        .hstat-l{font-family:var(--sans);font-size:.62rem;color:var(--muted);
                 letter-spacing:.12em;text-transform:uppercase;margin-top:.3rem;display:block}
        /* floating card on hero */
        .hero-card{position:absolute;bottom:3rem;left:2rem;z-index:10;
                   background:rgba(12,11,9,.88);border:1px solid rgba(201,168,76,.2);
                   backdrop-filter:blur(12px);border-radius:4px;padding:1rem 1.4rem;
                   display:flex;align-items:center;gap:1rem}
        .hero-card-dot{width:8px;height:8px;border-radius:50%;
                       background:var(--wa);flex-shrink:0;
                       box-shadow:0 0 0 3px rgba(37,211,102,.2)}
        .hero-card-t{font-family:var(--sans);font-size:.75rem;color:var(--bone);
                     font-weight:600;display:block}
        .hero-card-s{font-family:var(--sans);font-size:.65rem;color:var(--muted)}

        /* BUTTONS */
        .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.8rem;
             font-family:var(--sans);font-size:.72rem;font-weight:600;
             letter-spacing:.1em;text-transform:uppercase;text-decoration:none;
             border:none;cursor:pointer;border-radius:2px;transition:all .25s}
        .btn-gold{background:var(--gold);color:var(--ink)}
        .btn-gold:hover{background:var(--gold2);transform:translateY(-2px);
                        box-shadow:0 6px 20px rgba(201,168,76,.3)}
        .btn-ghost{background:transparent;color:var(--bone);
                   border:1px solid rgba(240,235,224,.2)}
        .btn-ghost:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-2px)}
        .btn-wa{background:var(--wa);color:#fff}
        .btn-wa:hover{background:#1eba56;box-shadow:0 4px 16px rgba(37,211,102,.35)}

        /* SEO STRIP */
        .seo-strip{background:var(--ink2);padding:1.8rem 5rem;
                   border-left:3px solid var(--gold3)}
        .seo-strip p{font-family:var(--sans);font-size:.8rem;color:var(--muted);
                     line-height:1.9;max-width:1100px;margin:0 auto}

        /* SECTION */
        .sec{padding:7rem 5rem}
        .ctr{max-width:1200px;margin:0 auto}
        .sh{margin-bottom:4rem}
        .sh.c{text-align:center}
        .sh.c .sh-sub,.sh.c .divider{margin-left:auto;margin-right:auto}
        .eyebrow{font-family:var(--sans);font-size:.62rem;letter-spacing:.3em;
                 text-transform:uppercase;color:var(--gold);font-weight:500;
                 display:block;margin-bottom:1rem}
        .h2{font-family:var(--serif);font-size:clamp(2rem,4vw,3.2rem);
            font-weight:700;line-height:1.1;color:var(--bone)}
        .h2 em{color:var(--gold);font-style:italic}
        .sh-sub{font-family:var(--sans);font-size:.88rem;color:var(--muted);
                max-width:520px;line-height:1.85;margin-top:.9rem}
        .divider{width:36px;height:1.5px;background:var(--gold);margin-top:1.2rem}

        /* ANNOUNCEMENT */
        .announce{background:var(--gold);padding:.65rem 2rem;text-align:center;
                  font-family:var(--sans);font-size:.75rem;font-weight:600;
                  color:var(--ink);letter-spacing:.04em}
        .announce a{color:var(--ink);font-weight:700}

        /* ABOUT strip */
        .about-strip{background:var(--ink3);display:grid;
                     grid-template-columns:1fr 1fr 1fr;gap:2px}
        .about-img-wrap{overflow:hidden;height:360px;position:relative}
        .about-img-wrap img{width:100%;height:100%;object-fit:cover;
                            filter:brightness(.55) saturate(.6);
                            transition:transform .7s ease,filter .5s}
        .about-img-wrap:hover img{transform:scale(1.06);filter:brightness(.65) saturate(.8)}
        .about-cap{position:absolute;bottom:0;left:0;right:0;padding:1.2rem;
                   background:linear-gradient(to top,rgba(12,11,9,.9),transparent);
                   font-family:var(--serif);font-size:1.1rem;color:var(--gold);
                   font-style:italic;letter-spacing:.02em}

        /* SERVICES */
        .svc-sec{background:var(--ink2);padding:0}
        .svc-header{padding:5rem 5rem 3rem;max-width:1200px;margin:0 auto}
        .svc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;
                  background:rgba(201,168,76,.06)}
        .scard{position:relative;overflow:hidden;min-height:400px;
               display:flex;flex-direction:column;justify-content:flex-end;
               background:var(--ink2)}
        .scard-img{position:absolute;inset:0;width:100%;height:100%;
                   object-fit:cover;filter:brightness(.22) saturate(.3);
                   transition:transform .7s ease,filter .5s}
        .scard:hover .scard-img{transform:scale(1.06);filter:brightness(.18) saturate(.25)}
        .scard-ov{position:absolute;inset:0;
                  background:linear-gradient(to top,rgba(12,11,9,.98) 0%,rgba(12,11,9,.35) 55%,transparent 100%)}
        .scard-top{position:absolute;top:1.2rem;left:1.5rem;right:1.5rem;
                   z-index:2;display:flex;justify-content:space-between;align-items:center}
        .scard-badge{font-family:var(--sans);font-size:.58rem;letter-spacing:.15em;
                     text-transform:uppercase;font-weight:700;padding:.22rem .65rem;
                     border-radius:1px}
        .scard-body{position:relative;z-index:2;padding:2rem 2rem 2.2rem}
        .scard-icon{font-size:1.5rem;margin-bottom:.7rem;display:block}
        .scard-title{font-family:var(--serif);font-size:1.5rem;font-weight:700;
                     color:var(--bone);margin-bottom:.3rem;line-height:1.15}
        .scard-sub{font-family:var(--sans);font-size:.67rem;color:var(--gold);
                   letter-spacing:.08em;text-transform:uppercase;margin-bottom:.8rem}
        .scard-desc{font-family:var(--sans);font-size:.78rem;color:rgba(240,235,224,.55);
                    line-height:1.7;margin-bottom:1rem}
        .scard-feats{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:1.2rem}
        .scard-feat{font-family:var(--sans);font-size:.62rem;color:var(--muted);
                    border:1px solid rgba(201,168,76,.12);padding:.2rem .55rem}
        .scard-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem}
        .scard-price-val{font-family:var(--serif);font-size:1.4rem;color:var(--gold);
                         font-weight:700;display:block;line-height:1}
        .scard-price-note{font-family:var(--sans);font-size:.62rem;color:var(--muted);margin-top:.15rem}
        .scard-price-time{font-family:var(--sans);font-size:.62rem;color:#27ae60;margin-top:.1rem}
        .scard-line{position:absolute;bottom:0;left:2rem;right:2rem;height:1px;
                    background:linear-gradient(to right,var(--gold),transparent);
                    transform:scaleX(0);transform-origin:left;transition:transform .5s}
        .scard:hover .scard-line{transform:scaleX(1)}

        /* HOW */
        .how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
                  background:rgba(201,168,76,.06);margin-top:3rem}
        .how-card{background:var(--ink3);padding:2.5rem 2rem;position:relative;overflow:hidden}
        .how-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;
                         background:transparent;transition:background .3s}
        .how-card:hover::after{background:linear-gradient(90deg,var(--gold),transparent)}
        .how-n{font-family:var(--serif);font-size:3.5rem;font-weight:700;
               color:rgba(201,168,76,.08);line-height:1;margin-bottom:.5rem}
        .how-icon{font-size:1.8rem;margin-bottom:1rem}
        .how-t{font-family:var(--serif);font-size:1.05rem;font-weight:600;
               color:var(--bone);margin-bottom:.5rem}
        .how-d{font-family:var(--sans);font-size:.76rem;color:var(--muted);line-height:1.65}

        /* WHY */
        .why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.8rem;margin-top:3rem}
        .why-card{background:var(--ink3);border:1px solid rgba(201,168,76,.06);
                  border-radius:2px;padding:1.5rem;transition:all .3s}
        .why-card:hover{border-color:rgba(201,168,76,.22);transform:translateY(-3px)}
        .why-ic{width:38px;height:38px;border-radius:2px;
                background:linear-gradient(135deg,var(--gold3),var(--gold));
                display:flex;align-items:center;justify-content:center;
                font-size:.95rem;margin-bottom:1rem}
        .why-t{font-family:var(--serif);font-size:1rem;font-weight:600;
               color:var(--bone);margin-bottom:.4rem}
        .why-d{font-family:var(--sans);font-size:.74rem;color:var(--muted);line-height:1.55}

        /* PRICES */
        .price-tabs{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem}
        .ptab{background:none;border:1px solid rgba(201,168,76,.15);color:var(--muted);
              font-family:var(--sans);font-size:.7rem;padding:.5rem 1.2rem;cursor:pointer;
              letter-spacing:.08em;text-transform:uppercase;transition:all .25s;border-radius:1px}
        .ptab.on,.ptab:hover{background:var(--gold);color:var(--ink);
                              border-color:var(--gold);font-weight:600}
        .ptable-wrap{border:1px solid rgba(201,168,76,.1);border-radius:2px;overflow:hidden}
        .ptable{width:100%;border-collapse:collapse}
        .ptable thead{background:var(--ink4)}
        .ptable th{text-align:left;font-family:var(--sans);font-size:.62rem;
                   letter-spacing:.2em;text-transform:uppercase;color:var(--gold);
                   padding:.9rem 1.2rem;font-weight:500}
        .ptable th:not(:first-child){text-align:right}
        .ptable td{padding:.9rem 1.2rem;font-family:var(--sans);font-size:.82rem;
                   border-bottom:1px solid rgba(255,255,255,.03);color:var(--bone2)}
        .ptable tr:last-child td{border-bottom:none}
        .ptable tr:nth-child(even) td{background:rgba(201,168,76,.02)}
        .ptable tr:hover td{background:rgba(201,168,76,.05)}
        .ptable td:nth-child(2){text-align:right;color:var(--gold);font-weight:600}
        .ptable td:nth-child(3){text-align:right;color:var(--muted);font-size:.72rem}

        /* REVIEWS */
        .rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:3rem}
        .rcard{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);
               border-radius:2px;padding:1.6rem;transition:border-color .3s}
        .rcard:hover{border-color:rgba(201,168,76,.2)}
        .rstars{color:var(--gold);font-size:.85rem;letter-spacing:2px;margin-bottom:.6rem}
        .rtxt{font-family:var(--serif);font-size:.95rem;color:rgba(240,235,224,.6);
              line-height:1.75;font-style:italic;margin-bottom:.9rem}
        .rauth-name{font-family:var(--sans);font-size:.72rem;color:var(--gold);font-weight:600}
        .rauth-info{font-family:var(--sans);font-size:.68rem;color:var(--muted)}

        /* FAQ */
        .faq-list{max-width:780px;margin:3rem auto 0}
        .faq-item{border-bottom:1px solid rgba(201,168,76,.07)}
        .faq-q{width:100%;background:none;border:none;padding:1.2rem 0;
               display:flex;align-items:center;justify-content:space-between;gap:1rem;
               cursor:pointer;text-align:left;font-family:var(--serif);
               font-size:1rem;color:var(--bone);transition:color .2s}
        .faq-q:hover{color:var(--gold)}
        .faq-ico{flex-shrink:0;width:22px;height:22px;border:1px solid rgba(201,168,76,.25);
                 border-radius:50%;display:flex;align-items:center;justify-content:center;
                 font-size:.9rem;color:var(--gold);transition:transform .3s}
        .faq-ico.open{transform:rotate(45deg)}
        .faq-a{max-height:0;overflow:hidden;transition:max-height .45s ease,padding .3s;
               font-family:var(--sans);font-size:.82rem;color:var(--muted);line-height:1.85}
        .faq-a.open{max-height:200px;padding-bottom:1.2rem}

        /* CTA */
        .cta-sec{padding:7rem 5rem;background:var(--ink2);text-align:center;position:relative;overflow:hidden}
        .cta-sec::before{content:'';position:absolute;inset:0;
          background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(201,168,76,.06) 0%,transparent 70%);
          pointer-events:none}
        .cta-h{font-family:var(--serif);font-size:clamp(2rem,4vw,3.5rem);
               font-weight:700;color:var(--bone);margin-bottom:1rem;position:relative}
        .cta-h em{color:var(--gold);font-style:italic}
        .cta-sub{font-family:var(--sans);font-size:.88rem;color:var(--muted);
                 margin-bottom:2.5rem;position:relative}
        .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative}

        /* CONTACT */
        .cont-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;margin-top:3rem}
        .crow{display:flex;gap:.8rem;align-items:flex-start;
              padding:.85rem 0;border-bottom:1px solid rgba(201,168,76,.06)}
        .clbl{font-family:var(--sans);font-size:.6rem;letter-spacing:.2em;
              text-transform:uppercase;color:var(--gold);margin-bottom:.2rem}
        .cval{font-family:var(--sans);font-size:.86rem;color:var(--bone)}
        .cval a{color:var(--bone);text-decoration:none;transition:color .2s}
        .cval a:hover{color:var(--gold)}
        .map-box{border-radius:2px;overflow:hidden;height:300px;
                 border:1px solid rgba(201,168,76,.1)}
        .map-box iframe{display:block;width:100%;height:100%;border:0}

        /* CROSS LINK */
        .cross-sec{background:var(--ink3);padding:3rem 5rem}
        .cross-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;
                    max-width:800px;margin:1.5rem auto 0}
        .cross-card{border-radius:2px;padding:1.6rem 1.8rem;text-decoration:none;
                    transition:transform .25s,box-shadow .25s;display:block}
        .cross-card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.3)}

        /* FOOTER */
        footer{background:#070605;border-top:1px solid rgba(201,168,76,.07);padding:2.5rem 5rem}
        .foot-brand{font-family:var(--serif);font-size:1.1rem;color:var(--gold);
                    text-align:center;margin-bottom:.5rem}
        .foot-links{display:flex;flex-wrap:wrap;justify-content:center;
                    gap:.5rem 1.5rem;margin-bottom:.8rem}
        .foot-links a{font-family:var(--sans);color:var(--muted);font-size:.72rem;
                      text-decoration:none;transition:color .2s}
        .foot-links a:hover{color:var(--gold)}
        .foot-copy{font-family:var(--sans);font-size:.68rem;
                   color:rgba(122,112,96,.4);text-align:center}
        .kws{display:flex;flex-wrap:wrap;gap:.3rem;justify-content:center;margin-top:1rem}
        .kpill{font-family:var(--sans);font-size:.58rem;
               color:rgba(201,168,76,.22);border:1px solid rgba(201,168,76,.07);padding:.18rem .55rem}

        /* WA FLOAT */
        .wa-float{position:fixed;bottom:1.8rem;right:1.8rem;z-index:150;
                  width:3.2rem;height:3.2rem;border-radius:50%;background:var(--wa);
                  display:flex;align-items:center;justify-content:center;
                  font-size:1.4rem;text-decoration:none;
                  box-shadow:0 4px 20px rgba(37,211,102,.4);transition:transform .3s;
                  animation:wapulse 2.5s ease infinite}
        .wa-float:hover{transform:scale(1.12);animation:none}
        @keyframes wapulse{
          0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)}
          50%{box-shadow:0 4px 30px rgba(37,211,102,.6),0 0 0 8px rgba(37,211,102,.08)}
        }

        /* BREADCRUMB */
        .breadcrumb{background:var(--ink2);padding:.8rem 5rem;
                    display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}
        .breadcrumb a{font-family:var(--sans);font-size:.7rem;color:var(--muted);text-decoration:none}
        .breadcrumb a:hover{color:var(--gold)}
        .breadcrumb span{font-family:var(--sans);font-size:.7rem;color:rgba(122,112,96,.3)}
        .breadcrumb strong{font-family:var(--sans);font-size:.7rem;color:var(--bone2)}

        /* ANIMATE */
        @media(prefers-reduced-motion:no-preference){
          [data-ani]{opacity:0;transform:translateY(24px);
                     transition:opacity .7s ease,transform .7s ease}
          [data-ani].vis{opacity:1;transform:translateY(0)}
          [data-ani][data-d="1"]{transition-delay:.1s}
          [data-ani][data-d="2"]{transition-delay:.2s}
          [data-ani][data-d="3"]{transition-delay:.3s}
          [data-ani][data-d="4"]{transition-delay:.4s}
        }

        /* RESPONSIVE */
        @media(max-width:1024px){
          .hero{grid-template-columns:1fr}
          .hero-right{display:none}
          .hero-left{padding:7rem 2rem 3rem}
          .hero-stats{grid-template-columns:repeat(2,1fr);gap:1.5rem}
          .svc-grid{grid-template-columns:1fr}
          .how-grid{grid-template-columns:repeat(2,1fr)}
          .why-grid{grid-template-columns:repeat(2,1fr)}
          .rev-grid{grid-template-columns:1fr}
          .cont-grid{grid-template-columns:1fr}
          .cross-grid{grid-template-columns:1fr}
          .about-strip{grid-template-columns:1fr}
          .sec,.seo-strip,.breadcrumb,.cross-sec,footer,
          .cta-sec,.svc-header{padding-left:2rem;padding-right:2rem}
          .nav-links{display:none}
        }
        @media(max-width:640px){
          .why-grid{grid-template-columns:1fr}
          .how-grid{grid-template-columns:1fr}
        }
        .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;
                  overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      `}</style>

      <a href="#main" className="skip">İçeriğe geç</a>
      <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp">💬</a>

      {/* ── ANNOUNCE ── */}
      <div className="announce" role="banner">
        🧵 Haziran 2026 — Seri imalat siparişlerinde %15 indirim ·{' '}
        <a href={WA('Merhaba, kampanya hakkında bilgi almak istiyorum.')}>Detay için yazın →</a>
      </div>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled?' up':''}`} aria-label="Ana navigasyon">
        <a href="https://swaphubs.com" className="nav-logo">
          SwapHubs <em>/ Online Tailor</em>
        </a>
        <ul className="nav-links">
          {[['#services','Hizmetler'],['#prices','Fiyatlar'],['#reviews','Yorumlar'],['#faq','SSS'],['#contact','İletişim']].map(([h,l])=>(
            <li key={h}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="nav-cta">
          💬 Sipariş Ver
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" aria-labelledby="hero-h" id="main">
        <div className="hero-left">
          <span className="hero-tag">Online Tailor Service</span>
          <h1 id="hero-h">
            Kıyafet Dikimi,<br/>
            <em>Online Terzi</em><br/>
            & Ütü Servisi
          </h1>
          <p className="hero-sub">
            Erkek & bayan kıyafet dikimi, kişiye özel model tasarım, tekstil atölyesi, seri imalat
            ve profesyonel ütü hizmeti. Antalya Konyaaltı merkezli, Türkiye geneline kargo.
          </p>
          <div className="hero-btns">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn-wa">💬 WhatsApp Sipariş</a>
            <a href="#services" className="btn btn-ghost">Hizmetleri Gör ↓</a>
          </div>
          <div className="hero-stats" aria-label="İstatistikler">
            {([['10+','Yıl Deneyim'],['5000+','Mutlu Müşteri'],['4.9★','112 Yorum'],['24–48h','Teslimat']] as [string,string][]).map(([n,l])=>(
              <div key={l}>
                <span className="hstat-n">{n}</span>
                <span className="hstat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right" aria-hidden="true">
          <img src={IMGS.hero} alt="Online Tailor Service — SwapHubs Antalya" className="hero-img" width={900} height={1200} loading="eager"/>
          <div className="hero-card">
            <span className="hero-card-dot"/>
            <div>
              <strong className="hero-card-t">Erkek & Bayan Kıyafet Dikimi</strong>
              <span className="hero-card-s">Online Sipariş · Türkiye Geneli Kargo</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <nav className="breadcrumb" aria-label="Sayfa yolu">
        <a href="https://swaphubs.com">SwapHubs</a>
        <span>›</span>
        <a href="/online-tailor-service">Terzi Can</a>
        <span>›</span>
        <strong>Online Tailor Service</strong>
      </nav>

      {/* ── SEO INTRO ── */}
      <div className="seo-strip">
        <p>
          <strong style={{color:'var(--bone2)'}}>Online Tailor Service</strong> olarak Konyaaltı merkezimizden tüm Antalya ilçelerine ve Türkiye geneline
          online terzi hizmeti sunuyoruz. Erkek takım elbise dikimi, bayan elbise dikimi, kişiye özel model tasarım,
          kalıp çıkarma, prototip, seri imalat ve fason üretim. Ütü hizmeti, buharlı presleme, otellerden kurye ile alım.
          Paça kısaltma, fermuar değişimi, kıyafet tamir ve tadilat. Spor kıyafet, eşofman, sweatshirt dikimi ve nakış baskı.
          Tekstil dikişatölyemizde minimum 50 adetten başlayan toplu üretim kapasitesi.
        </p>
      </div>

      {/* ── ABOUT STRIP — tekstil/moda görselleri ── */}
      <div className="about-strip" aria-hidden="true">
        {([
          [IMGS.about1,'Nakış & İşleme'],
          [IMGS.about2,'Dikiş Atölyesi'],
          [IMGS.about3,'Özel Tasarım'],
        ] as [string,string][]).map(([src,cap])=>(
          <div key={cap} className="about-img-wrap">
            <img src={src} alt={cap} loading="lazy" width={600} height={360}/>
            <span className="about-cap">{cap}</span>
          </div>
        ))}
      </div>

      {/* ── HİZMETLER ── */}
      <section id="services" className="svc-sec" aria-labelledby="svc-h">
        <div className="svc-header">
          <span className="eyebrow">✦ Tüm Hizmetlerimiz</span>
          <h2 className="h2" id="svc-h">Ne Yapıyoruz?</h2>
          <p className="sh-sub">Erkek & bayan kıyafet dikiminden online terziye, ütü hizmetinden seri imalata.</p>
          <div className="divider"/>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s,i)=>(
            <article key={s.id} id={s.id} className="scard"
  data-ani=""
              style={visible.has(s.id)?{opacity:1,transform:'none'}:{}}>
              <img src={s.img} alt={`${s.title} — SwapHubs Online Tailor Service`}
                className="scard-img" loading="lazy" width={800} height={420}/>
              <div className="scard-ov" aria-hidden="true"/>
              <div className="scard-top">
                {s.badge && (
                  <span className="scard-badge" style={{background:s.badgeColor,color:'#fff'}}>
                    {s.badge}
                  </span>
                )}
                <span className="scard-icon" aria-hidden="true">{s.icon}</span>
              </div>
              <div className="scard-body">
                <h3 className="scard-title">{s.title}</h3>
                <div className="scard-sub">{s.sub}</div>
                <p className="scard-desc">{s.desc}</p>
                <div className="scard-feats">
                  {s.feats.map(f=><span key={f} className="scard-feat">{f}</span>)}
                </div>
                <div className="scard-foot">
                  <div>
                    <span className="scard-price-val">{s.price}</span>
                    <span className="scard-price-note">{s.note}</span>
                    <span className="scard-price-time">⏱ {s.time}</span>
                  </div>
                  <a href={WA(s.waMsg)} target="_blank" rel="noopener noreferrer"
                    className="btn btn-wa" style={{fontSize:'.7rem',padding:'.6rem 1rem'}}
                    onClick={e=>e.stopPropagation()}>
                    Sipariş Ver
                  </a>
                </div>
              </div>
              <div className="scard-line" aria-hidden="true"/>
            </article>
          ))}
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR ── */}
      <section className="sec" style={{background:'var(--ink3)'}} aria-labelledby="how-h">
        <div className="ctr">
          <div className="sh c">
            <span className="eyebrow">📱 Online Sipariş</span>
            <h2 className="h2" id="how-h">Nasıl <em>Çalışır?</em></h2>
            <p className="sh-sub">WhatsApp'tan sipariş verin, Türkiye'nin her yerine teslim edelim.</p>
            <div className="divider"/>
          </div>
          <div className="how-grid">
            {([
              ['01','📸','Fotoğraf & Ölçü Gönderin',"WhatsApp'tan kıyafet modelini ve ölçülerinizi gönderin. Danışma tamamen ücretsiz."],
              ['02','🎨','Tasarım & Kumaş Seçimi','Uzman terzimizle detayları belirleyin. Kumaş rengi ve kalitesini seçin. Fiyatı onaylayın.'],
              ['03','✂️','Dikime Başlıyoruz','Onayın ardından atölyemizde dikime başlıyoruz. Fotoğraflarla sizi bilgilendiriyoruz.'],
              ['04','🚗','Teslimat','Antalya içi ücretsiz kurye, Türkiye geneline kargo ile kapınıza teslim.'],
            ] as [string,string,string,string][]).map(([n,ic,t,d])=>(
              <div key={n} className="how-card">
                <div className="how-n">{n}</div>
                <div className="how-icon" aria-hidden="true">{ic}</div>
                <h3 className="how-t">{t}</h3>
                <p className="how-d">{d}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'2.5rem'}}>
            <a href={WA('Merhaba, online terzi siparişi vermek istiyorum. Nasıl başlayabilirim?')}
              target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              💬 Hemen Başla — WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── NEDEN BİZ ── */}
      <section className="sec" style={{background:'var(--ink)'}} aria-labelledby="why-h">
        <div className="ctr">
          <div className="sh">
            <span className="eyebrow">✦ Neden SwapHubs?</span>
            <h2 className="h2" id="why-h">Neden Bizi <em>Seçmelisiniz?</em></h2>
            <div className="divider"/>
          </div>
          <div className="why-grid">
            {([
              ['📐','Mükemmel Fit Garantisi','Her kıyafet ölçülerinize özel dikilir. Memnun kalmazsanız ücretsiz düzeltme.'],
              ['⚡','Ekspres Teslimat','Tamir işlemleri aynı gün, özel dikim 3–7 gün içinde teslim.'],
              ['📱','Online Sipariş',"WhatsApp'tan sipariş verin, Türkiye'nin her yerine kargo."],
              ['🎨','Özgün Tasarım','Kendi tasarımınız ya da uzman tasarımcılarımızla birlikte çalışın.'],
              ['🏭','Seri İmalat Kapasitesi','Markalar ve butikler için fason üretim, min. 50 adetten başlar.'],
              ['💰','Şeffaf Fiyatlandırma','Gizli ücret yok. Başlamadan önce net fiyat alın.'],
              ['🌍','Türkiye Geneli Kargo','Antalya dışından sipariş verin, kargo ile teslim edelim.'],
              ['⭐','4.9 / 5 Müşteri Puanı',"112 değerlendirmede Google'da 4.9 yıldız."],
            ] as [string,string,string][]).map(([ic,t,d])=>(
              <div key={t} className="why-card">
                <div className="why-ic" aria-hidden="true">{ic}</div>
                <div className="why-t">{t}</div>
                <p className="why-d">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FİYATLAR ── */}
      <section id="prices" className="sec" style={{background:'var(--ink2)'}} aria-labelledby="prices-h">
        <div className="ctr">
          <div className="sh">
            <span className="eyebrow">₺ Şeffaf Fiyatlar</span>
            <h2 className="h2" id="prices-h">Terzi Fiyatları <em>2025–2026</em></h2>
            <p className="sh-sub">Başlangıç fiyatları. Kesin teklif için WhatsApp'tan fotoğraf gönderin.</p>
            <div className="divider"/>
          </div>
          <div className="price-tabs" role="tablist">
            {PRICE_TABLE.map((c,i)=>(
              <button key={c.cat} className={`ptab${priceTab===i?' on':''}`}
                onClick={()=>setPriceTab(i)} role="tab" aria-selected={priceTab===i}>
                {c.cat}
              </button>
            ))}
          </div>
          <div className="ptable-wrap">
            <table className="ptable" aria-label={PRICE_TABLE[priceTab].cat}>
              <caption className="sr-only">{PRICE_TABLE[priceTab].cat} Fiyat Listesi</caption>
              <thead>
                <tr>
                  <th scope="col">Hizmet</th>
                  <th scope="col">Başlangıç Fiyatı</th>
                  <th scope="col">Süre</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_TABLE[priceTab].rows.map(([s,p,t])=>(
                  <tr key={s}><td>{s}</td><td>{p}</td><td>{t}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{textAlign:'center',marginTop:'2rem'}}>
            <a href={WA('Merhaba, fiyat teklifi almak istiyorum.')}
              target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              📲 Ücretsiz Teklif Al
            </a>
          </div>
        </div>
      </section>

      {/* ── YORUMLAR — HTML microdata KALDIRILDI ── */}
      <section id="reviews" className="sec" style={{background:'var(--ink3)'}} aria-labelledby="rev-h">
        <div className="ctr">
          <div className="sh c">
            <span className="eyebrow">⭐ 4.9 / 5 · 112 Değerlendirme</span>
            <h2 className="h2" id="rev-h">Müşterilerimiz <em>Ne Diyor?</em></h2>
            <div className="divider"/>
          </div>
          <div className="rev-grid">
            {REVIEWS.map(r=>(
              <article key={r.name} className="rcard">
                <div className="rstars" aria-label={`${r.stars} yıldız`}>
                  {'★'.repeat(r.stars)}
                </div>
                <p className="rtxt">{r.text}</p>
                <div>
                  <span className="rauth-name">{r.name}</span>{' '}
                  <span className="rauth-info">— {r.city} · {r.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec" aria-label="Sipariş ver">
        <h2 className="cta-h">
          Kıyafetiniz Tam Ölçüye<br/>
          <em>Dikildikten Sonra Kapınızda</em>
        </h2>
        <p className="cta-sub">Online sipariş · WhatsApp ile anında iletişim · Türkiye geneli kargo</p>
        <div className="cta-btns">
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            💬 WhatsApp Sipariş Ver
          </a>
          <a href={WA('Merhaba, toplu sipariş hakkında bilgi almak istiyorum.')}
            target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            🏭 Toplu Sipariş
          </a>
        </div>
        <p style={{fontFamily:'var(--sans)',fontSize:'.78rem',color:'var(--muted)',marginTop:'1.5rem',position:'relative'}}>
          Telefon: <a href="tel:+905318986418" style={{color:'var(--gold)',textDecoration:'none'}}>+90 531 898 64 18</a>
        </p>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="sec" style={{background:'var(--ink)'}} aria-labelledby="faq-h">
        <div className="ctr">
          <div className="sh c">
            <span className="eyebrow">FAQ</span>
            <h2 className="h2" id="faq-h">Sık Sorulan Sorular</h2>
            <div className="divider"/>
          </div>
          <div className="faq-list">
            {FAQS.map(([q,a],i)=>(
              <div key={i} className="faq-item">
                <button className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}
                  aria-expanded={openFaq===i} aria-controls={faqId(i)}>
                  <span>{q}</span>
                  <span className={`faq-ico${openFaq===i?' open':''}`} aria-hidden="true">+</span>
                </button>
                <div id={faqId(i)} className={`faq-a${openFaq===i?' open':''}`} role="region">
                  {a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── İLETİŞİM ── */}
      <section id="contact" className="sec" style={{background:'var(--ink2)'}} aria-labelledby="cont-h">
        <div className="ctr">
          <div className="sh">
            <span className="eyebrow">✦ İletişim</span>
            <h2 className="h2" id="cont-h">Bize <em>Ulaşın</em></h2>
            <div className="divider"/>
          </div>
          <div className="cont-grid">
            <address style={{fontStyle:'normal'}}>
              {([
                ['📞','Telefon',<a href="tel:+905318986418">+90 531 898 64 18</a>],
                ['💬','WhatsApp',<a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer">+90 531 898 64 18</a>],
                ['🕐','Çalışma Saatleri',<span>09:00 – 19:00 · Pzt–Cmt</span>],
                ['📍','Adres',<span>Konyaaltı, Antalya</span>],
                ['🚚','Teslimat',<span>Antalya içi ücretsiz kurye · Türkiye geneli kargo</span>],
                ['🌍','Hizmet Bölgesi',<span>Tüm Antalya İlçeleri + Online Türkiye Geneli</span>],
              ] as [string,string,React.ReactNode][]).map(([ic,lbl,val],i)=>(
                <div key={i} className="crow">
                  <span style={{fontSize:'1rem',paddingTop:'.1rem'}} aria-hidden="true">{ic}</span>
                  <div>
                    <div className="clbl">{lbl}</div>
                    <div className="cval">{val}</div>
                  </div>
                </div>
              ))}
              <div style={{display:'flex',flexDirection:'column',gap:'.7rem',marginTop:'1.8rem'}}>
                <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer"
                  className="btn btn-wa" style={{justifyContent:'center'}}>💬 WhatsApp</a>
                <a href="https://maps.google.com/?q=Konyaaltı+Antalya" target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost" style={{justifyContent:'center'}}>📍 Google Maps</a>
              </div>
            </address>
            <div className="map-box">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12742.017!2d30.6946!3d36.8769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3914a3f49b36b%3A0xe9e87c5c9a6b2700!2sKonyaalti%2C%20Antalya!5e0!3m2!1str!2str!4v1720000000000"
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="SwapHubs Antalya — Konyaaltı konumu"
                aria-label="SwapHubs Online Tailor konumu haritası"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ÇAPRAZ LİNK ── */}
      <section className="cross-sec" aria-labelledby="cross-h">
        <div style={{maxWidth:'800px',margin:'0 auto'}}>
          <div style={{textAlign:'center'}}>
            <span className="eyebrow">SwapHubs Terzi Hizmetleri</span>
            <h2 id="cross-h" className="h2" style={{fontSize:'clamp(1.5rem,2.5vw,2rem)'}}>
              Antalya'da mı <em>Bulunuyorsunuz?</em>
            </h2>
          </div>
          <div className="cross-grid">
            {/* Aktif sayfa */}
            <div className="cross-card" style={{background:'var(--ink4)',border:'1px solid var(--gold)'}}>
              <div style={{fontFamily:'var(--sans)',fontSize:'.58rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'.6rem'}}>
                🌐 Türkiye Geneli · Aktif Sayfa
              </div>
              <div style={{fontFamily:'var(--serif)',fontSize:'1.15rem',fontWeight:700,color:'var(--bone)',marginBottom:'.5rem'}}>
                Online Terzi Hizmeti
              </div>
              <p style={{fontFamily:'var(--sans)',fontSize:'.75rem',color:'var(--muted)',lineHeight:1.6,marginBottom:'.8rem'}}>
                81 ile kargo ile özel dikim, abiye, takım elbise, üniforma.
              </p>
              <span style={{fontFamily:'var(--sans)',fontSize:'.68rem',color:'var(--gold)',fontWeight:600}}>✓ Şu an bu sayfadasınız</span>
            </div>
            {/* /terzi linki */}
            <a href="/terzi" className="cross-card"
              style={{background:'var(--ink3)',border:'1px solid rgba(201,168,76,.15)'}}>
              <div style={{fontFamily:'var(--sans)',fontSize:'.58rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'.6rem'}}>
                📍 Antalya & Çevresi · Yerel Hizmet
              </div>
              <div style={{fontFamily:'var(--serif)',fontSize:'1.15rem',fontWeight:700,color:'var(--bone)',marginBottom:'.5rem'}}>
                Antalya Terzi Can →
              </div>
              <p style={{fontFamily:'var(--sans)',fontSize:'.75rem',color:'var(--muted)',lineHeight:1.6,marginBottom:'.8rem'}}>
                Konyaaltı merkezli araçlı terzi servisi. Eve & otele gelir, ölçü alır, teslim eder.
              </p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'.3rem'}}>
                {['✂️ Tadilat','👗 Dikim','🧺 Kuru Temizleme','🚗 Eve Gelen Terzi'].map(t=>(
                  <span key={t} style={{fontFamily:'var(--sans)',fontSize:'.6rem',color:'var(--gold)',border:'1px solid rgba(201,168,76,.2)',padding:'.18rem .5rem'}}>
                    {t}
                  </span>
                ))}
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="foot-brand">SwapHubs — Online Tailor Service | Online Terzi & Ütü Hizmeti</div>
        <nav className="foot-links" aria-label="Footer bağlantılar">
          {[
            ['https://swaphubs.com','Ana Sayfa'],
            ['/terzi','Terzi Can Antalya'],
            ['#services','Hizmetler'],
            ['#prices','Fiyatlar'],
            ['#faq','SSS'],
            ['#contact','İletişim'],
          ].map(([h,l])=><a key={h} href={h}>{l}</a>)}
        </nav>
        <p className="foot-copy">
          © {new Date().getFullYear()} SwapHubs · Antalya Terzi & Tekstil Hizmetleri ·{' '}
          <a href="tel:+905318986418" style={{color:'rgba(201,168,76,.35)',textDecoration:'none'}}>+90 531 898 64 18</a>
        </p>
        <div className="kws" aria-label="Anahtar kelimeler">
          {['Antalya Bay Terzi','Erkek Kıyafet Dikimi','Bayan Kıyafet Dikimi','Online Terzi Antalya',
            'Ütü Hizmeti Antalya','Tekstil Atölyesi','Seri İmalat Antalya','Fason Üretim',
            'Tailor Antalya','Online Tailor','Портной Анталья','Schneider Antalya'
          ].map(k=><span key={k} className="kpill">{k}</span>)}
        </div>
      </footer>

    </div>
  );
}
