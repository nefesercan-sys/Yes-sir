'use client';

import { useState, useEffect, useRef } from 'react';

const PHONE_RAW = '905318986418';
const WA = (msg: string) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = WA('Hello, I would like information about your tailoring service.');

interface Props {
  gbpName1?: string;
  gbpAddr1?: string;
  gbpEmbed1: string;
  gbpMaps1: string;
  gbpShort1: string;
  gbpReview1?: string;
  gbpName2?: string;
  gbpAddr2?: string;
  gbpEmbed2?: string;
  gbpMaps2?: string;
  gbpShort2?: string;
  gbpReview2?: string;
}

const IMGS = {
  hero:    'https://images.pexels.com/photos/6858614/pexels-photo-6858614.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop',
  erkek:   'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  bayan:   'https://images.pexels.com/photos/4620863/pexels-photo-4620863.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  online:  'https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  utu:     'https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  tamir:   'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  tasarim: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  seri:    'https://images.pexels.com/photos/3768167/pexels-photo-3768167.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  spor:    'https://images.pexels.com/photos/4620868/pexels-photo-4620868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  about1:  'https://images.pexels.com/photos/3861971/pexels-photo-3861971.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  about2:  'https://images.pexels.com/photos/6858618/pexels-photo-6858618.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  about3:  'https://images.pexels.com/photos/4620864/pexels-photo-4620864.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
};

const SERVICES = [
  { id:'erkek-dikim', icon:'👔', badge:'MOST POPULAR', badgeColor:'#C5973A',
    img: IMGS.erkek,
    title:'Menswear Tailoring', sub:'Suits · Shirts · Trousers · Blazers · Tuxedos',
    desc:'Made-to-measure menswear. A perfect fit guaranteed, from business meetings to special occasions. Local and imported fabric options.',
    feats:['Suit','Shirt','Trousers','Blazer','Tuxedo','Waistcoat'],
    price:'₺800+', note:"Suits from ₺2,500", time:'3–7 days',
    waMsg:'Hello, I would like information about menswear tailoring.' },
  { id:'bayan-dikim', icon:'👗', badge:'', badgeColor:'',
    img: IMGS.bayan,
    title:'Womenswear Tailoring', sub:'Dresses · Blouses · Skirts · Jumpsuits · Office Wear · Evening Gowns',
    desc:'From everyday dresses to evening gowns, office wear to special-occasion pieces — clothing tailored exactly to your measurements.',
    feats:['Dress','Blouse','Skirt','Jumpsuit','Office Wear','Evening Gown','Wedding Dress'],
    price:'₺600+', note:"Evening gowns from ₺1,200", time:'3–5 days',
    waMsg:'Hello, I would like information about womenswear tailoring.' },
  { id:'online-terzi', icon:'📱', badge:'YENİ', badgeColor:'#059669',
    img: IMGS.online,
    title:'Online Tailor Service', sub:'Send a Photo · Share Your Measurements · Delivered to Your Door',
    desc:'Send your design and measurements via WhatsApp — we tailor it and ship it anywhere in Turkey.',
    feats:['Order via WhatsApp','Video-Call Fitting','Style Selection','Shipped Delivery'],
    price:'Free', note:'Free consultation', time:'5–10 days (incl. shipping)',
    waMsg:'Hello, I would like information about the online tailor service.' },
  { id:'utu-hizmeti', icon:'💨', badge:'EXPRESS', badgeColor:'#E11D48',
    img: IMGS.utu,
    title:'Ironing & Steam Pressing', sub:'Professional Ironing · Hotel Pickup & Delivery · Same Day',
    desc:'No wrinkled clothes on holiday! We pick up from your hotel, steam-press professionally, and deliver the same day.',
    feats:['Shirt Ironing','Suit Pressing','Hotel Pickup','Same-Day Delivery'],
    price:'₺80+/item', note:'Bulk discounts available', time:'2–6 hours',
    waMsg:'Hello, I would like ironing service. Can you come to my hotel?' },
  { id:'tamir-tadilat', icon:'✂️', badge:'', badgeColor:'',
    img: IMGS.tamir,
    title:'Repairs & Alterations', sub:'Hemming · Zippers · Tears · Taking In',
    desc:'No need to give up on your favourite garment. Same-day delivery often possible.',
    feats:['Hemming ₺150','Zipper ₺200','Tear Repair','Taking In','Sleeve Shortening'],
    price:'₺100+', note:"Hemming from ₺150", time:'Same day – 48 hours',
    waMsg:'Hello, I would like information about clothing repairs and alterations.' },
  { id:'model-tasarim', icon:'✏️', badge:'CUSTOM', badgeColor:'#7C3AED',
    img: IMGS.tasarim,
    title:'Custom Design & Pattern Development', sub:'Original Design · Pattern Making · Prototyping',
    desc:'We turn the garment you imagine into reality — pattern making, prototyping and preparation for mass production.',
    feats:['Design Consultation','Pattern Making','Prototype Sewing','Technical Drawing'],
    price:'Get a Quote', note:'Priced per project', time:'7–14 days',
    waMsg:'Hello, I would like information about custom design and pattern development.' },
  { id:'seri-imalat', icon:'🏭', badge:'B2B', badgeColor:'#1E40AF',
    img: IMGS.seri,
    title:'Textile Workshop & Mass Production', sub:'Contract Manufacturing · Bulk Orders · Private Label',
    desc:'End-to-end textile manufacturing for brands and boutiques. Bulk production starting from a minimum of 50 pieces.',
    feats:['Contract Manufacturing','Pattern Making','Quality Control','Min. 50 Pieces'],
    price:'Get a Quote', note:'Min. 50 pieces', time:'Depends on quantity',
    waMsg:'Hello, I would like information about mass production.' },
  { id:'spor-gunluk', icon:'🏃', badge:'', badgeColor:'',
    img: IMGS.spor,
    title:'Sportswear & Casual Wear', sub:'Tracksuits · Sweatshirts · Hoodies · Sport Shorts',
    desc:'Made-to-measure sportswear too. Embroidery and logo printing included.',
    feats:['Tracksuit','Sweatshirt','Hoodie','Logo Embroidery','Team Orders'],
    price:'₺400+', note:'Bulk discounts available', time:'3–7 days',
    waMsg:'Hello, I would like information about sportswear tailoring.' },
];

const PRICE_TABLE = [
  { cat:'Menswear', rows:[
    ['Suit (2-piece)','₺2,500+','5–7 days'],
    ['Suit (3-piece)','₺3,200+','7–10 days'],
    ['Men\'s Shirt','₺800+','3–5 days'],
    ['Men\'s Trousers','₺700+','3–5 days'],
    ['Blazer / Jacket','₺1,500+','5–7 days'],
    ['Tuxedo','₺3,500+','7–14 days'],
  ]},
  { cat:'Womenswear', rows:[
    ['Everyday Dress','₺600+','3–5 days'],
    ['Office Wear','₺800+','3–5 days'],
    ['Evening Gown','₺1,200+','5–7 days'],
    ['Wedding Dress','₺5,000+','14–21 days'],
    ['Blouse / Skirt','₺500+','2–4 days'],
    ['Jumpsuit','₺900+','4–6 days'],
  ]},
  { cat:'Ironing & Cleaning', rows:[
    ['Shirt Ironing','₺80+','Same day'],
    ['Suit Pressing','₺150+','Same day'],
    ['Dress Steaming','₺120+','Same day'],
    ['Coat Ironing','₺200+','24 hours'],
    ['Bulk Ironing (10+ items)','₺60+/item','Same day'],
  ]},
  { cat:'Repairs & Alterations', rows:[
    ['Hemming','₺150+','Same day'],
    ['Zipper Replacement','₺200+','Same day'],
    ['Taking In Waist','₺150+','24 hours'],
    ['Tear Repair','₺100+','Same day'],
    ['Sleeve Shortening','₺200+','24–48 hours'],
    ['Lining Replacement','₺300+','48 hours'],
  ]},
];

const REVIEWS = [
  { name:'Kemal A.', city:'Antalya', date:'April 2025', stars:5, text:'"I came in for a men\'s suit. The fit was perfect and the online ordering system was very convenient."' },
  { name:'Ayşe T.', city:'Istanbul', date:'May 2025', stars:5, text:'"I ordered online from Istanbul. It arrived at my door in 8 days. The fit was perfect — very happy!"' },
  { name:'Mehmet S.', city:'Ankara', date:'March 2025', stars:5, text:'"We had 200 work shirts mass-produced. Delivered on time, complete, and great quality."' },
  { name:'Sarah M.', city:'London', date:'June 2025', stars:5, text:'"Visited Antalya, needed my dress ironed urgently. Picked up from hotel, delivered in 3h. Amazing!"' },
  { name:'Fatma K.', city:'Antalya', date:'February 2025', stars:5, text:'"I had a custom wedding dress designed. The result was even better than I imagined!"' },
  { name:'Ali R.', city:'Kemer', date:'May 2025', stars:5, text:'"I got ironing service by courier from my hotel in Kemer. Same-day delivery, very professional."' },
];

const FAQS: [string, string][] = [
  ["How much does a men\'s suit cost in Antalya?", "Starts from ₺2,500. Send a photo and your measurements via WhatsApp and we\'ll quote you within 30 minutes."],
  ["How does the online tailor service work?", "Send a reference photo and your measurements via WhatsApp. Confirm the price. Once sewn, we ship the garment to your address."],
  ["Do you come to my hotel for ironing?", "Yes! Courier pickup and delivery to every hotel in Antalya, with same-day delivery guaranteed."],
  ["What\'s the minimum order quantity for mass production?", "Minimum 50 pieces. Single pieces are accepted for samples and prototypes."],
  ["Do you offer custom design services?", "Yes. You can bring your own design or work with our designers, including pattern making."],
  ["How long do repairs and alterations take?", "Simple jobs like hemming or zippers are same-day. Alterations take 24–48 hours. Express service available."],
  ["Do you ship across Turkey?", "Yes. Free courier within Antalya, shipping nationwide across Turkey, 5–10 business days."],
  ["Is there an English-speaking tailor in Antalya?", "Yes! Our tailor speaks English, Russian and German. WhatsApp: +90 531 898 64 18"],
  ["My dress is torn — can you repair it the same day?", "Yes, most tears and split seams are fixed the same day. Send a photo via WhatsApp for an instant estimate."],
  ["Are you open in the evening or on weekends?", "Yes, we're open every day of the week, 08:00–23:00, including evenings and weekends. Message us on WhatsApp to book a time."],
  ["Can I have a custom dress made for myself?", "Yes, we make custom garments to your measurements and chosen style — from everyday dresses to evening gowns."],
  ["Do you sew with natural fabrics like cotton or linen?", "Yes, we offer custom tailoring in 100% cotton and linen fabric."],
];

export default function OnlineTailorClient({
  gbpName1, gbpAddr1, gbpEmbed1, gbpMaps1, gbpShort1, gbpReview1,
  gbpName2, gbpAddr2, gbpEmbed2, gbpMaps2, gbpShort2, gbpReview2,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [priceTab, setPriceTab] = useState(0);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const obsRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    obsRef.current = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting && e.target.id) setVisible(p => new Set([...p, e.target.id])); });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-ani]').forEach(el => obsRef.current?.observe(el));
    return () => obsRef.current?.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-jakarta,'DM Sans',system-ui,sans-serif)", background: '#0C0B09', color: '#F0EBE0', overflowX: 'hidden' }} className="pb-24">

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        :root{
          --gold:#C9A84C;--gold2:#E8C97A;--gold3:#7A5C1E;
          --ink:#0C0B09;--ink2:#141210;--ink3:#1C1A16;--ink4:#242118;
          --bone:#F0EBE0;--bone2:#DDD5C4;--muted:#7A7060;
          --wa:#25D366;
        }
        ::-webkit-scrollbar{width:2px}::-webkit-scrollbar-thumb{background:var(--gold3)}
        .skip{position:absolute;top:-40px;left:0;background:var(--gold);color:var(--ink);padding:.5rem 1rem;font-weight:700;z-index:999}.skip:focus{top:0}
        .onav{position:fixed;top:0;left:0;right:0;z-index:200;padding:1.1rem 2.5rem;display:flex;align-items:center;justify-content:space-between;transition:all .4s}
        .onav.up{background:rgba(12,11,9,.96);backdrop-filter:blur(20px);border-bottom:1px solid rgba(201,168,76,.1);padding:.7rem 2.5rem}
        .onav-logo{font-family:var(--font-unbounded,'Georgia',serif);font-size:1.2rem;font-weight:700;color:var(--gold);text-decoration:none}
        .onav-logo em{color:var(--bone);font-style:italic;font-weight:300;font-size:.9rem}
        .onav-links{display:flex;gap:2rem;list-style:none}
        .onav-links a{color:var(--bone2);text-decoration:none;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;transition:color .2s}.onav-links a:hover{color:var(--gold)}
        .onav-cta{background:var(--gold);color:var(--ink);padding:.6rem 1.5rem;font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:2px;transition:all .25s}.onav-cta:hover{background:var(--gold2)}
        .ohero{position:relative;min-height:100vh;display:grid;grid-template-columns:1fr 1fr;overflow:hidden}
        .ohero-left{display:flex;flex-direction:column;justify-content:flex-end;padding:8rem 3.5rem 5rem 5rem;position:relative;z-index:2}
        .ohero-right{position:relative;overflow:hidden}.ohero-right::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,var(--ink) 0%,transparent 45%)}
        .ohero-img{width:100%;height:100%;object-fit:cover;object-position:top center;filter:brightness(.5) saturate(.7)}
        .ohero-tag{display:inline-flex;align-items:center;gap:.7rem;font-size:.65rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);border-bottom:1px solid rgba(201,168,76,.3);padding-bottom:.5rem;margin-bottom:2rem;width:fit-content}
        .ohero h1{font-family:var(--font-unbounded,'Georgia',serif);font-size:clamp(2.2rem,4.5vw,4.5rem);font-weight:700;line-height:1.05;margin-bottom:1.5rem;letter-spacing:-.02em}
        .ohero h1 em{color:var(--gold);font-style:normal;display:block}
        .ohero-sub{font-size:.9rem;color:var(--muted);line-height:1.85;max-width:400px;margin-bottom:2.5rem}
        .ohero-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:3.5rem}
        .ohero-stats{display:grid;grid-template-columns:repeat(4,1fr);padding-top:2rem;border-top:1px solid rgba(201,168,76,.1)}
        .ohstat-n{font-family:var(--font-unbounded,'Georgia',serif);font-size:1.7rem;color:var(--gold);font-weight:700;line-height:1;display:block}
        .ohstat-l{font-size:.62rem;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-top:.3rem;display:block}
        .obtn{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.8rem;font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;border-radius:2px;transition:all .25s}
        .obtn-gold{background:var(--gold);color:var(--ink)}.obtn-gold:hover{background:var(--gold2);transform:translateY(-2px)}
        .obtn-ghost{background:transparent;color:var(--bone);border:1px solid rgba(240,235,224,.2)}.obtn-ghost:hover{border-color:var(--gold);color:var(--gold)}
        .obtn-wa{background:var(--wa);color:#fff}.obtn-wa:hover{background:#1eba56}
        .oseo{background:var(--ink2);padding:1.8rem 5rem;border-left:3px solid var(--gold3)}
        .oseo p{font-size:.8rem;color:var(--muted);line-height:1.9;max-width:1100px;margin:0 auto}
        .osec{padding:7rem 5rem}.octr{max-width:1200px;margin:0 auto}
        .oeyebrow{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);font-weight:500;display:block;margin-bottom:1rem}
        .oh2{font-family:var(--font-unbounded,'Georgia',serif);font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:700;line-height:1.1;color:var(--bone)}
        .oh2 em{color:var(--gold);font-style:normal}
        .osh-sub{font-size:.88rem;color:var(--muted);max-width:520px;line-height:1.85;margin-top:.9rem}
        .odivider{width:36px;height:1.5px;background:var(--gold);margin-top:1.2rem}
        .oabout-strip{background:var(--ink3);display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px}
        .oabout-img-wrap{overflow:hidden;height:300px;position:relative}.oabout-img-wrap img{width:100%;height:100%;object-fit:cover;filter:brightness(.55) saturate(.6);transition:transform .7s,filter .5s}.oabout-img-wrap:hover img{transform:scale(1.06);filter:brightness(.65)}
        .oabout-cap{position:absolute;bottom:0;left:0;right:0;padding:1.2rem;background:linear-gradient(to top,rgba(12,11,9,.9),transparent);font-family:var(--font-unbounded,'Georgia',serif);font-size:1rem;color:var(--gold);font-style:italic}
        .osvc-sec{background:var(--ink2)}.osvc-header{padding:5rem 5rem 3rem;max-width:1200px;margin:0 auto}
        .osvc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:rgba(201,168,76,.06)}
        .oscard{position:relative;overflow:hidden;min-height:400px;display:flex;flex-direction:column;justify-content:flex-end;background:var(--ink2)}
        .oscard-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.22) saturate(.3);transition:transform .7s,filter .5s}.oscard:hover .oscard-img{transform:scale(1.05);filter:brightness(.18)}
        .oscard-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(12,11,9,.98) 0%,rgba(12,11,9,.3) 55%,transparent 100%)}
        .oscard-top{position:absolute;top:1.2rem;left:1.5rem;right:1.5rem;z-index:2;display:flex;justify-content:space-between;align-items:center}
        .oscard-badge{font-size:.58rem;letter-spacing:.15em;text-transform:uppercase;font-weight:700;padding:.22rem .65rem;border-radius:1px}
        .oscard-body{position:relative;z-index:2;padding:2rem 2rem 2.2rem}
        .oscard-icon{font-size:1.5rem;margin-bottom:.7rem;display:block}
        .oscard-title{font-family:var(--font-unbounded,'Georgia',serif);font-size:1.3rem;font-weight:700;color:var(--bone);margin-bottom:.3rem}
        .oscard-sub{font-size:.67rem;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:.8rem}
        .oscard-desc{font-size:.78rem;color:rgba(240,235,224,.55);line-height:1.7;margin-bottom:1rem}
        .oscard-feats{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:1.2rem}
        .oscard-feat{font-size:.62rem;color:var(--muted);border:1px solid rgba(201,168,76,.12);padding:.2rem .55rem}
        .oscard-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem}
        .oscard-pv{font-family:var(--font-unbounded,'Georgia',serif);font-size:1.3rem;color:var(--gold);font-weight:700;display:block;line-height:1}
        .oscard-pn{font-size:.62rem;color:var(--muted);margin-top:.15rem}
        .oscard-pt{font-size:.62rem;color:#27ae60;margin-top:.1rem}
        .oscard-line{position:absolute;bottom:0;left:2rem;right:2rem;height:1px;background:linear-gradient(to right,var(--gold),transparent);transform:scaleX(0);transform-origin:left;transition:transform .5s}.oscard:hover .oscard-line{transform:scaleX(1)}
        .ohow-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(201,168,76,.06);margin-top:3rem}
        .ohow-card{background:var(--ink3);padding:2.5rem 2rem}
        .ohow-n{font-family:var(--font-unbounded,'Georgia',serif);font-size:3rem;font-weight:700;color:rgba(201,168,76,.08);line-height:1;margin-bottom:.5rem}
        .ohow-icon{font-size:1.8rem;margin-bottom:1rem}
        .ohow-t{font-family:var(--font-unbounded,'Georgia',serif);font-size:.95rem;font-weight:700;color:var(--bone);margin-bottom:.5rem}
        .ohow-d{font-size:.76rem;color:var(--muted);line-height:1.65}
        .owhy-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.8rem;margin-top:3rem}
        .owhy-card{background:var(--ink3);border:1px solid rgba(201,168,76,.06);border-radius:2px;padding:1.5rem;transition:all .3s}.owhy-card:hover{border-color:rgba(201,168,76,.22);transform:translateY(-3px)}
        .owhy-ic{width:38px;height:38px;border-radius:2px;background:linear-gradient(135deg,var(--gold3),var(--gold));display:flex;align-items:center;justify-content:center;font-size:.95rem;margin-bottom:1rem}
        .owhy-t{font-family:var(--font-unbounded,'Georgia',serif);font-size:.88rem;font-weight:700;color:var(--bone);margin-bottom:.4rem}
        .owhy-d{font-size:.74rem;color:var(--muted);line-height:1.55}
        .optabs{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem}
        .optab{background:none;border:1px solid rgba(201,168,76,.15);color:var(--muted);font-size:.7rem;padding:.5rem 1.2rem;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;transition:all .25s;border-radius:1px}.optab.on,.optab:hover{background:var(--gold);color:var(--ink);border-color:var(--gold);font-weight:600}
        .optable-wrap{border:1px solid rgba(201,168,76,.1);border-radius:2px;overflow:hidden;overflow-x:auto}
        .optable{width:100%;border-collapse:collapse;min-width:420px}
        .optable thead{background:var(--ink4)}
        .optable th{text-align:left;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);padding:.9rem 1.2rem;font-weight:500}.optable th:not(:first-child){text-align:right}
        .optable td{padding:.9rem 1.2rem;font-size:.82rem;border-bottom:1px solid rgba(255,255,255,.03);color:var(--bone2)}.optable tr:last-child td{border-bottom:none}.optable tr:nth-child(even) td{background:rgba(201,168,76,.02)}.optable tr:hover td{background:rgba(201,168,76,.05)}.optable td:nth-child(2){text-align:right;color:var(--gold);font-weight:600}.optable td:nth-child(3){text-align:right;color:var(--muted);font-size:.72rem}
        .orev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:3rem}
        .orcard{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:2px;padding:1.6rem;transition:border-color .3s}.orcard:hover{border-color:rgba(201,168,76,.2)}
        .orstars{color:var(--gold);font-size:.85rem;letter-spacing:2px;margin-bottom:.6rem}
        .ortxt{font-size:.95rem;color:rgba(240,235,224,.6);line-height:1.75;font-style:italic;margin-bottom:.9rem}
        .orauth-name{font-size:.72rem;color:var(--gold);font-weight:600}
        .orauth-info{font-size:.68rem;color:var(--muted)}
        /* ── MAPS ── */
        .omaps-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:2rem}
        .omap-card{background:var(--ink3);border:1px solid rgba(201,168,76,.12);border-radius:4px;overflow:hidden}
        .omap-card iframe{display:block;width:100%;height:240px;border:0}
        .omap-info{padding:1rem 1.2rem}
        .omap-name{font-family:var(--font-unbounded,'Georgia',serif);font-size:.78rem;font-weight:700;color:var(--bone);margin-bottom:.3rem}
        .omap-addr{font-size:.72rem;color:var(--muted);margin-bottom:.7rem;line-height:1.4}
        .omap-btns{display:flex;gap:.4rem;flex-wrap:wrap}
        .omap-btn{display:inline-flex;align-items:center;gap:.3rem;padding:.4rem .85rem;font-size:.68rem;font-weight:600;text-decoration:none;border-radius:3px;transition:all .2s}
        .omap-btn-maps{background:#4285F4;color:#fff}.omap-btn-route{background:#34A853;color:#fff}.omap-btn-rev{border:1px solid var(--gold);color:var(--gold);background:transparent}
        /* ── FAQ — details/summary ── */
        .ofaq-list{max-width:780px;margin:3rem auto 0}
        .ofaq-item{border-bottom:1px solid rgba(201,168,76,.07)}
        details.ofaq-item>summary{padding:1.2rem 0;display:flex;align-items:center;justify-content:space-between;gap:1rem;cursor:pointer;list-style:none;font-size:1rem;color:var(--bone);transition:color .2s;font-weight:400}
        details.ofaq-item>summary:hover{color:var(--gold)}
        details.ofaq-item>summary::-webkit-details-marker{display:none}
        details.ofaq-item>summary::after{content:'+';flex-shrink:0;width:22px;height:22px;border:1px solid rgba(201,168,76,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.9rem;color:var(--gold);text-align:center;line-height:22px;transition:transform .3s}
        details.ofaq-item[open]>summary::after{content:'×'}
        .ofaq-ans{padding:.25rem 0 1.2rem;font-size:.82rem;color:var(--muted);line-height:1.85;border-top:1px solid rgba(201,168,76,.06)}
        .octa-sec{padding:7rem 5rem;background:var(--ink2);text-align:center;position:relative}
        .octa-h{font-family:var(--font-unbounded,'Georgia',serif);font-size:clamp(1.8rem,3.5vw,3rem);font-weight:700;color:var(--bone);margin-bottom:1rem}
        .octa-h em{color:var(--gold)}
        .octa-sub{font-size:.88rem;color:var(--muted);margin-bottom:2.5rem}
        .octa-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
        .ocont-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;margin-top:3rem}
        .ocrow{display:flex;gap:.8rem;align-items:flex-start;padding:.85rem 0;border-bottom:1px solid rgba(201,168,76,.06)}
        .oclbl{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.2rem}
        .ocval{font-size:.86rem;color:var(--bone)}.ocval a{color:var(--bone);text-decoration:none;transition:color .2s}.ocval a:hover{color:var(--gold)}
        .ocross-sec{background:var(--ink3);padding:3rem 5rem}
        .ocross-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:800px;margin:1.5rem auto 0}
        .ocross-card{border-radius:2px;padding:1.6rem 1.8rem;text-decoration:none;transition:transform .25s;display:block}.ocross-card:hover{transform:translateY(-3px)}
        .ofooter{background:#070605;border-top:1px solid rgba(201,168,76,.07);padding:2.5rem 5rem}
        .ofoot-brand{font-family:var(--font-unbounded,'Georgia',serif);font-size:1rem;color:var(--gold);text-align:center;margin-bottom:.5rem}
        .ofoot-links{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem 1.5rem;margin-bottom:.8rem}
        .ofoot-links a{color:var(--muted);font-size:.72rem;text-decoration:none;transition:color .2s}.ofoot-links a:hover{color:var(--gold)}
        .ofoot-copy{font-size:.68rem;color:rgba(122,112,96,.4);text-align:center}
        .owa-float{position:fixed;bottom:5.5rem;right:1.8rem;z-index:150;width:3.2rem;height:3.2rem;border-radius:50%;background:var(--wa);display:flex;align-items:center;justify-content:center;font-size:1.4rem;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,.4);transition:transform .3s;animation:owapulse 2.5s ease infinite}.owa-float:hover{transform:scale(1.12);animation:none}
        @keyframes owapulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)}50%{box-shadow:0 4px 30px rgba(37,211,102,.6),0 0 0 8px rgba(37,211,102,.08)}}
        .oannounce{background:var(--gold);padding:.65rem 2rem;text-align:center;font-size:.75rem;font-weight:600;color:var(--ink);letter-spacing:.04em}.oannounce a{color:var(--ink);font-weight:700}
        .obreadcrumb{background:var(--ink2);padding:.8rem 5rem;display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}
        .obreadcrumb a{font-size:.7rem;color:var(--muted);text-decoration:none}.obreadcrumb a:hover{color:var(--gold)}
        .obreadcrumb span{font-size:.7rem;color:rgba(122,112,96,.3)}
        .obreadcrumb strong{font-size:.7rem;color:var(--bone2)}
        .osr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
        @media(max-width:1024px){
          .ohero{grid-template-columns:1fr}.ohero-right{display:none}.ohero-left{padding:7rem 2rem 3rem}
          .ohero-stats{grid-template-columns:repeat(2,1fr)}
          .osvc-grid{grid-template-columns:1fr}.ohow-grid{grid-template-columns:repeat(2,1fr)}
          .owhy-grid{grid-template-columns:repeat(2,1fr)}.orev-grid{grid-template-columns:1fr}
          .ocont-grid{grid-template-columns:1fr}.ocross-grid{grid-template-columns:1fr}
          .oabout-strip{grid-template-columns:1fr}.omaps-grid{grid-template-columns:1fr}
          .osec,.oseo,.obreadcrumb,.ocross-sec,.ofooter,.octa-sec,.osvc-header{padding-left:1.5rem;padding-right:1.5rem}
          .onav-links{display:none}
        }
        @media(max-width:640px){.owhy-grid{grid-template-columns:1fr}.ohow-grid{grid-template-columns:1fr}}
      `}</style>

      <a href="#main" className="skip">Skip to content</a>
      <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="owa-float" aria-label="WhatsApp">💬</a>

      {/* ANNOUNCE */}
      <div className="oannounce" role="banner">
        🧵 2026 — 15% off mass-production orders ·{' '}
        <a href={WA('Hello, I would like information about the promotion.')}>Message us for details →</a>
      </div>

      {/* NAV */}
      <nav className={`onav${scrolled ? ' up' : ''}`} aria-label="Ana navigasyon">
        <a href="https://swaphubs.com" className="onav-logo">SwapHubs <em>/ Online Tailor</em></a>
        <ul className="onav-links">
          {[['#services','Services'],['#prices','Prices'],['#reviews','Reviews'],['#faq','FAQ'],['#maps','Locations']].map(([h,l])=>(
            <li key={h}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="onav-cta">💬 Order Now</a>
      </nav>

      {/* HERO */}
      <section className="ohero" aria-labelledby="hero-h" id="main">
        <div className="ohero-left">
          <span className="ohero-tag">Online Tailor Service · Antalya 2026</span>
          <h1 id="hero-h">
            Custom Tailoring,<br />
            <em>Online Tailor</em>
            &amp; Ironing Service
          </h1>
          <p className="ohero-sub">
            Menswear and womenswear tailoring, custom pattern design, a full textile workshop,
            mass production and professional ironing service. Based in Konyaaltı, shipping across Turkey.
          </p>
          <div className="ohero-btns">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="obtn obtn-wa">💬 Order on WhatsApp</a>
            <a href="#services" className="obtn obtn-ghost">See Our Services ↓</a>
          </div>
          <div className="ohero-stats">
            {([['10+','Years of Experience'],['5000+','Happy Customers'],['4','Languages Spoken'],['24–48h','Delivery']] as [string,string][]).map(([n,l])=>(
              <div key={l}><span className="ohstat-n">{n}</span><span className="ohstat-l">{l}</span></div>
            ))}
          </div>
        </div>
        <div className="ohero-right" aria-hidden="true">
          <img src={IMGS.hero} alt="Online Tailor Service — SwapHubs Antalya Konyaaltı Tailor" className="ohero-img" width={900} height={1200} loading="eager" />
        </div>
      </section>

      {/* BREADCRUMB */}
      <nav className="obreadcrumb" aria-label="Breadcrumb">
        <a href="https://swaphubs.com">SwapHubs</a>
        <span>›</span>
        <a href="/terzi">Terzi Can</a>
        <span>›</span>
        <strong>Online Tailor Service</strong>
      </nav>

      {/* SEO INTRO */}
      <div className="oseo" id="seo-intro">
        <p>
          <strong style={{ color: 'var(--bone2)' }}>Online Tailor Service</strong> — from our Konyaaltı base to all of Antalya and across Turkey:
          menswear and womenswear tailoring, ironing, repairs, alterations, custom pattern design,
          mass production and contract manufacturing. Hemming, zipper replacement, dry cleaning. Sportswear, tracksuits
          and sweatshirts made to order. Bulk production from a minimum of 50 pieces. Free courier within Antalya, shipping nationwide.
        </p>
      </div>

      {/* ABOUT STRIP */}
      <div className="oabout-strip" aria-hidden="true">
        {([[IMGS.about1,'Embroidery & Needlework'],[IMGS.about2,'Sewing Workshop'],[IMGS.about3,'Custom Design']] as [string,string][]).map(([src,cap])=>(
          <div key={cap} className="oabout-img-wrap">
            <img src={src} alt={cap} loading="lazy" width={600} height={300} />
            <span className="oabout-cap">{cap}</span>
          </div>
        ))}
      </div>

      {/* SERVİSLER */}
      <section id="services" className="osvc-sec" aria-labelledby="svc-h">
        <div className="osvc-header">
          <span className="oeyebrow">✦ All Our Services</span>
          <h2 className="oh2" id="svc-h">What We Do</h2>
          <p className="osh-sub">From menswear and womenswear tailoring to online ordering, ironing to mass production.</p>
          <div className="odivider" />
        </div>
        <div className="osvc-grid">
          {SERVICES.map((s) => (
            <article key={s.id} id={s.id} className="oscard"
              style={visible.has(s.id) ? { opacity: 1, transform: 'none' } : {}}>
              <img src={s.img} alt={`${s.title} — SwapHubs Online Tailor Antalya`} className="oscard-img" loading="lazy" width={800} height={420} />
              <div className="oscard-ov" aria-hidden="true" />
              <div className="oscard-top">
                {s.badge && <span className="oscard-badge" style={{ background: s.badgeColor, color: '#fff' }}>{s.badge}</span>}
                <span className="oscard-icon" aria-hidden="true">{s.icon}</span>
              </div>
              <div className="oscard-body">
                <h3 className="oscard-title">{s.title}</h3>
                <div className="oscard-sub">{s.sub}</div>
                <p className="oscard-desc">{s.desc}</p>
                <div className="oscard-feats">{s.feats.map(f => <span key={f} className="oscard-feat">{f}</span>)}</div>
                <div className="oscard-foot">
                  <div>
                    <span className="oscard-pv">{s.price}</span>
                    <span className="oscard-pn">{s.note}</span>
                    <span className="oscard-pt">⏱ {s.time}</span>
                  </div>
                  <a href={WA(s.waMsg)} target="_blank" rel="noopener noreferrer"
                    className="obtn obtn-wa" style={{ fontSize: '.7rem', padding: '.6rem 1rem' }}>
                    Order Now
                  </a>
                </div>
              </div>
              <div className="oscard-line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section className="osec" style={{ background: 'var(--ink3)' }} aria-labelledby="how-h">
        <div className="octr">
          <div style={{ textAlign: 'center' }}>
            <span className="oeyebrow">📱 Online Ordering</span>
            <h2 className="oh2" id="how-h">How It Works</h2>
            <p className="osh-sub" style={{ margin: '.9rem auto 0' }}>Order via WhatsApp and we'll deliver anywhere in Turkey.</p>
            <div className="odivider" style={{ margin: '1.2rem auto 0' }} />
          </div>
          <div className="ohow-grid">
            {([
              ['01','📸','Send a Photo & Measurements',"Send your reference design and measurements via WhatsApp — completely free."],
              ['02','🎨','Design & Fabric Selection','Work out the details with our expert tailor and confirm the price.'],
              ['03','✂️','We Start Sewing','Once approved, we begin sewing in our workshop.'],
              ['04','🚗','Delivery','Free courier within Antalya, shipped nationwide across Turkey.'],
            ] as [string,string,string,string][]).map(([n,ic,t,d])=>(
              <div key={n} className="ohow-card">
                <div className="ohow-n">{n}</div>
                <div className="ohow-icon" aria-hidden="true">{ic}</div>
                <h3 className="ohow-t">{t}</h3>
                <p className="ohow-d">{d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href={WA('Hello, I would like to place an online tailor order.')} target="_blank" rel="noopener noreferrer" className="obtn obtn-wa">
              💬 Get Started — WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* NEDEN BİZ */}
      <section className="osec" style={{ background: 'var(--ink)' }} aria-labelledby="why-h">
        <div className="octr">
          <span className="oeyebrow">✦ Why SwapHubs?</span>
          <h2 className="oh2" id="why-h">Why Choose Us</h2>
          <div className="odivider" />
          <div className="owhy-grid">
            {([
              ['📐','Perfect Fit Guaranteed','Every garment is tailored exactly to your measurements.'],
              ['⚡','Express Delivery','Same-day repairs, custom tailoring in 3–7 days.'],
              ['📱','Online Ordering',"Order via WhatsApp, shipped nationwide."],
              ['🎨','Original Design','Bring your own design or work with our expert team.'],
              ['🏭','Mass Production Capacity','Bulk production starting from a minimum of 50 pieces.'],
              ['💰','Transparent Pricing','No hidden fees — get a clear price upfront.'],
              ['🌍','Nationwide Shipping','Order from anywhere in Turkey, shipped to you.'],
              ['📍','Find Us on Google Maps',"Open our Google Business Profile for directions and customer reviews."],
            ] as [string,string,string][]).map(([ic,t,d])=>(
              <div key={t} className="owhy-card">
                <div className="owhy-ic" aria-hidden="true">{ic}</div>
                <div className="owhy-t">{t}</div>
                <p className="owhy-d">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FİYATLAR */}
      <section id="prices" className="osec" style={{ background: 'var(--ink2)' }} aria-labelledby="prices-h">
        <div className="octr">
          <span className="oeyebrow">₺ Transparent Pricing</span>
          <h2 className="oh2" id="prices-h">Tailor Prices 2026</h2>
          <p className="osh-sub">Starting prices. Send a photo via WhatsApp for an exact quote.</p>
          <div className="odivider" />
          <div className="optabs" role="tablist" style={{ marginTop: '2rem' }}>
            {PRICE_TABLE.map((c, i) => (
              <button key={c.cat} className={`optab${priceTab === i ? ' on' : ''}`}
                onClick={() => setPriceTab(i)} role="tab" aria-selected={priceTab === i}>
                {c.cat}
              </button>
            ))}
          </div>
          <div className="optable-wrap">
            <table className="optable" aria-label={PRICE_TABLE[priceTab].cat}>
              <caption className="osr-only">{PRICE_TABLE[priceTab].cat} Price List</caption>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Starting Price</th>
                  <th scope="col">Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_TABLE[priceTab].rows.map(([s, p, t]) => (
                  <tr key={s}><td>{s}</td><td>{p}</td><td>{t}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href={WA('Hello, I would like a price quote.')} target="_blank" rel="noopener noreferrer" className="obtn obtn-gold">
              📲 Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* YORUMLAR */}
      <section id="reviews" className="osec" style={{ background: 'var(--ink3)' }} aria-labelledby="rev-h">
        <div className="octr">
          <div style={{ textAlign: 'center' }}>
            <span className="oeyebrow">Customer Feedback</span>
            <h2 className="oh2" id="rev-h">What Our Customers Say</h2>
            <div className="odivider" style={{ margin: '1.2rem auto 0' }} />
          </div>
          <div className="orev-grid">
            {REVIEWS.map(r => (
              <article key={r.name} className="orcard">
                <div className="orstars" aria-label={`${r.stars} stars`}>{'★'.repeat(r.stars)}</div>
                <p className="ortxt">{r.text}</p>
                <div><span className="orauth-name">{r.name}</span>{' '}<span className="orauth-info">— {r.city} · {r.date}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="octa-sec" aria-label="Place an order">
        <h2 className="octa-h">Your Garment, Perfectly Fitted<br /><em>Delivered To Your Door</em></h2>
        <p className="octa-sub">Order online · Instant WhatsApp contact · Nationwide shipping</p>
        <div className="octa-btns">
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="obtn obtn-wa">💬 Order on WhatsApp</a>
          <a href={WA('Hello, I would like information about a bulk order.')} target="_blank" rel="noopener noreferrer" className="obtn obtn-ghost">🏭 Bulk Orders</a>
        </div>
        <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '1.5rem' }}>
          Phone: <a href="tel:+905318986418" style={{ color: 'var(--gold)', textDecoration: 'none' }}>+90 531 898 64 18</a>
        </p>
      </section>

      {/* FAQ — details/summary — Google SSS snippet */}
      <section id="faq" className="osec" style={{ background: 'var(--ink)' }} aria-labelledby="faq-h">
        <div className="octr">
          <div style={{ textAlign: 'center' }}>
            <span className="oeyebrow">FAQ</span>
            <h2 className="oh2" id="faq-h">Frequently Asked Questions</h2>
            <div className="odivider" style={{ margin: '1.2rem auto 0' }} />
          </div>
          <div className="ofaq-list">
            {FAQS.map(([q, a], i) => (
              <details key={i} className="ofaq-item" open={i < 3}>
                <summary>{q}</summary>
                <div className="ofaq-ans">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE MAPS — İKİ PROFİL */}
      <section id="maps" className="osec" style={{ background: 'var(--ink2)' }} aria-labelledby="maps-h">
        <div className="octr">
          <span className="oeyebrow">📍 Our Location</span>
          <h2 className="oh2" id="maps-h">Our Google Business Profile</h2>
          <p className="osh-sub">Hurma neighbourhood, Konyaaltı / Antalya.</p>
          <div className="odivider" />
          <div className="omaps-grid">
            {/* Kart 1 - Hurma Şubesi */}
            <div className="omap-card">
              <iframe src={gbpEmbed1} width="100%" height="240" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title={gbpName1 || "TERZİ Can - Konyaaltı Hurma"} />
              <div className="omap-info">
                <div className="omap-name">{gbpName1 || "TERZİ Can - Konyaaltı Hurma"}</div>
                <div className="omap-addr">📍 {gbpAddr1 || "Hurma Mahallesi, 07130 Konyaaltı / Antalya"}</div>
                <div className="omap-btns">
                  <a href={gbpMaps1} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-maps">🗺️ Maps</a>
                  <a href={gbpShort1} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-route">📍 Directions</a>
                  <a href={gbpReview1 || gbpMaps1} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-rev">⭐ Review</a>
                </div>
              </div>
            </div>

            {gbpMaps2 && gbpEmbed2 && (
            <>
{/* Kart 2: yalnızca ikinci profil verilirse */}
            <div className="omap-card">
              <iframe src={gbpEmbed2} width="100%" height="240" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title={gbpName2 || "TERZİ Can - Konyaaltı Liman"} />
              <div className="omap-info">
                <div className="omap-name">{gbpName2 || "TERZİ Can - Konyaaltı Liman & Ütü"}</div>
                <div className="omap-addr">📍 {gbpAddr2}</div>
                <div className="omap-btns">
                  <a href={gbpMaps2} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-maps">🗺️ Maps</a>
                  <a href={gbpShort2} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-route">📍 Directions</a>
                  <a href={gbpReview2 || gbpMaps2} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-rev">⭐ Review</a>
                </div>
              </div>
            </div>
            </>
          )}
          </div>
          <p style={{ fontSize: '.74rem', color: 'var(--muted)', marginTop: '1.2rem', textAlign: 'center' }}>
            Happy with our service? A short Google review helps other travellers find us.
          </p>
        </div>
      </section>

      {/* ÇAPRAZ LİNK */}
      <section className="ocross-sec" aria-labelledby="cross-h">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="oeyebrow">SwapHubs Tailor Services</span>
          <h2 id="cross-h" className="oh2" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>Are You In Antalya?</h2>
        </div>
        <div className="ocross-grid">
          <div className="ocross-card" style={{ background: 'var(--ink4)', border: '1px solid var(--gold)' }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.6rem' }}>🌐 Nationwide · Current Page</div>
            <div style={{ fontFamily: 'var(--font-unbounded,"Georgia",serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--bone)', marginBottom: '.5rem' }}>Online Tailor Service</div>
            <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '.8rem' }}>Custom tailoring, evening gowns, suits and uniforms shipped to all 81 provinces.</p>
            <span style={{ fontSize: '.68rem', color: 'var(--gold)', fontWeight: 600 }}>✓ You are here</span>
          </div>
          <a href="/terzi" className="ocross-card" style={{ background: 'var(--ink3)', border: '1px solid rgba(201,168,76,.15)' }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.6rem' }}>📍 Antalya & Surroundings</div>
            <div style={{ fontFamily: 'var(--font-unbounded,"Georgia",serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--bone)', marginBottom: '.5rem' }}>Antalya Terzi Can →</div>
            <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '.8rem' }}>Mobile tailor service based in Konyaaltı. We come to your home or hotel, take measurements, and deliver.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem' }}>
              {['✂️ Alterations','👗 Tailoring','🧺 Dry Cleaning','🚗 Home-Visit Tailor'].map(t => (
                <span key={t} style={{ fontSize: '.6rem', color: 'var(--gold)', border: '1px solid rgba(201,168,76,.2)', padding: '.18rem .5rem' }}>{t}</span>
              ))}
            </div>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ofooter">
        <div className="ofoot-brand">SwapHubs — Online Tailor Service | Antalya Tailor</div>
        <nav className="ofoot-links" aria-label="Footer">
          {[['https://swaphubs.com','Home'],['/terzi','Terzi Can Antalya'],['#services','Services'],['#prices','Prices'],['#faq','FAQ'],['#maps','Locations']].map(([h,l])=><a key={h} href={h}>{l}</a>)}
        </nav>
        <p className="ofoot-copy">
          © {new Date().getFullYear()} SwapHubs · Antalya Tailor &amp; Textiles ·{' '}
          <a href="tel:+905318986418" style={{ color: 'rgba(201,168,76,.35)', textDecoration: 'none' }}>+90 531 898 64 18</a>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', justifyContent: 'center', marginTop: '1rem' }}>
          {['Antalya Men\'s Tailor','Menswear Tailoring','Womenswear Tailoring','Online Tailor Antalya','Ironing Service Antalya','Mass Production Antalya','Tailor Antalya','Портной Анталья','Schneider Antalya'].map(k => (
            <span key={k} style={{ fontSize: '.58rem', color: 'rgba(201,168,76,.22)', border: '1px solid rgba(201,168,76,.07)', padding: '.18rem .55rem' }}>{k}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
