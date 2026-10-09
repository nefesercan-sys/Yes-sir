'use client';

import { useState, useEffect, useRef } from 'react';

const PHONE_RAW = '905318986418';
const WA = (msg: string) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = WA('Hallo, ich hätte gerne Informationen zu Ihrem Schneiderservice.');

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
  { id:'erkek-dikim', icon:'👔', badge:'AM BELIEBTESTEN', badgeColor:'#C5973A',
    img: IMGS.erkek,
    title:'Herrenschneiderei', sub:'Anzüge · Hemden · Hosen · Blazer · Smoking',
    desc:'Maßgeschneiderte Herrenbekleidung. Perfekte Passform garantiert, vom Geschäftstermin bis zum besonderen Anlass. Einheimische und importierte Stoffe.',
    feats:['Anzug','Hemd','Hose','Blazer','Smoking','Weste'],
    price:'₺800+', note:"Anzüge ab ₺2.500", time:'3–7 Tage',
    waMsg:'Hallo, ich hätte gerne Informationen zur Herrenschneiderei.' },
  { id:'bayan-dikim', icon:'👗', badge:'', badgeColor:'',
    img: IMGS.bayan,
    title:'Damenschneiderei', sub:'Kleider · Blusen · Röcke · Overalls · Business-Kleidung · Abendkleider',
    desc:'Vom Alltagskleid bis zum Abendkleid, von Business-Kleidung bis zum Stück für besondere Anlässe — exakt nach Ihren Maßen gefertigt.',
    feats:['Kleid','Bluse','Rock','Overall','Business-Kleidung','Abendkleid','Brautkleid'],
    price:'₺600+', note:"Abendkleider ab ₺1.200", time:'3–5 Tage',
    waMsg:'Hallo, ich hätte gerne Informationen zur Damenschneiderei.' },
  { id:'online-terzi', icon:'📱', badge:'YENİ', badgeColor:'#059669',
    img: IMGS.online,
    title:'Online-Schneiderservice', sub:'Foto Senden · Maße Angeben · Lieferung Nach Hause',
    desc:'Senden Sie Ihr Design und Ihre Maße per WhatsApp — wir fertigen es an und versenden in ganz die Türkei.',
    feats:['Bestellung per WhatsApp','Videoanruf-Anprobe','Modellauswahl','Versand'],
    price:'Kostenlos', note:'Kostenlose Beratung', time:'5–10 Tage (inkl. Versand)',
    waMsg:'Hallo, ich hätte gerne Informationen zum Online-Schneiderservice.' },
  { id:'utu-hizmeti', icon:'💨', badge:'EXPRESS', badgeColor:'#E11D48',
    img: IMGS.utu,
    title:'Bügel- & Dampfpressservice', sub:'Professionelles Bügeln · Hotelabholung · Am Selben Tag',
    desc:'Keine zerknitterte Kleidung im Urlaub! Wir holen es aus Ihrem Hotel ab, bügeln professionell mit Dampf und liefern noch am selben Tag.',
    feats:['Hemden Bügeln','Anzug Pressen','Hotelabholung','Lieferung Am Selben Tag'],
    price:'₺80+/Stück', note:'Mengenrabatt möglich', time:'2–6 Stunden',
    waMsg:'Hallo, ich möchte den Bügelservice nutzen. Können Sie zu meinem Hotel kommen?' },
  { id:'tamir-tadilat', icon:'✂️', badge:'', badgeColor:'',
    img: IMGS.tamir,
    title:'Reparatur & Änderungen', sub:'Kürzen · Reißverschluss · Risse · Enger Machen',
    desc:'Sie müssen Ihr Lieblingsstück nicht aufgeben. Lieferung am selben Tag oft möglich.',
    feats:['Kürzen ₺150','Reißverschluss ₺200','Rissreparatur','Enger Machen','Ärmel Kürzen'],
    price:'₺100+', note:"Kürzen ab ₺150", time:'Am selben Tag – 48 Stunden',
    waMsg:'Hallo, ich hätte gerne Informationen zu Reparaturen und Änderungen.' },
  { id:'model-tasarim', icon:'✏️', badge:'INDIVIDUELL', badgeColor:'#7C3AED',
    img: IMGS.tasarim,
    title:'Individuelle Designentwicklung', sub:'Eigenes Design · Schnittentwicklung · Prototyp',
    desc:'Wir verwandeln das Kleidungsstück Ihrer Vorstellung in die Realität — Schnittentwicklung, Prototyp und Vorbereitung für die Serienproduktion.',
    feats:['Designberatung','Schnittentwicklung','Prototypnähen','Technische Zeichnung'],
    price:'Angebot Anfordern', note:'Preis pro Projekt', time:'7–14 Tage',
    waMsg:'Hallo, ich hätte gerne Informationen zur individuellen Designentwicklung.' },
  { id:'seri-imalat', icon:'🏭', badge:'B2B', badgeColor:'#1E40AF',
    img: IMGS.seri,
    title:'Textilatelier & Serienproduktion', sub:'Lohnfertigung · Sammelbestellungen · Eigenmarke',
    desc:'Komplette Textilproduktion für Marken und Boutiquen. Serienproduktion ohne feste Mindestmenge, Angebot pro Projekt.',
    feats:['Lohnfertigung','Schnittentwicklung','Qualitätskontrolle','Keine Mindestmenge'],
    price:'Angebot Anfordern', note:'Keine Mindestmenge', time:'Je nach Menge',
    waMsg:'Hallo, ich hätte gerne Informationen zur Serienproduktion.' },
  { id:'spor-gunluk', icon:'🏃', badge:'', badgeColor:'',
    img: IMGS.spor,
    title:'Sport- & Freizeitbekleidung', sub:'Trainingsanzug · Sweatshirt · Hoodie · Sportshorts',
    desc:'Auch bei Sportbekleidung ganz individuell. Stickerei und Logodruck inklusive.',
    feats:['Trainingsanzug','Sweatshirt','Hoodie','Logo-Stickerei','Team-Bestellung'],
    price:'₺400+', note:'Mengenrabatt möglich', time:'3–7 Tage',
    waMsg:'Hallo, ich hätte gerne Informationen zur Sportbekleidung.' },
];

const PRICE_TABLE = [
  { cat:'Herrenschneiderei', rows:[
    ['Anzug (2-teilig)','₺2.500+','5–7 Tage'],
    ['Anzug (3-teilig)','₺3.200+','7–10 Tage'],
    ['Herrenhemd','₺800+','3–5 Tage'],
    ['Herrenhose','₺700+','3–5 Tage'],
    ['Blazer / Jacke','₺1.500+','5–7 Tage'],
    ['Smoking','₺3.500+','7–14 Tage'],
  ]},
  { cat:'Damenschneiderei', rows:[
    ['Alltagskleid','₺600+','3–5 Tage'],
    ['Business-Kleidung','₺800+','3–5 Tage'],
    ['Abendkleid','₺1.200+','5–7 Tage'],
    ['Brautkleid','₺5.000+','14–21 Tage'],
    ['Bluse / Rock','₺500+','2–4 Tage'],
    ['Overall','₺900+','4–6 Tage'],
  ]},
  { cat:'Bügeln & Reinigung', rows:[
    ['Hemd Bügeln','₺80+','Am selben Tag'],
    ['Anzug Pressen','₺150+','Am selben Tag'],
    ['Kleid Dämpfen','₺120+','Am selben Tag'],
    ['Mantel Bügeln','₺200+','24 Stunden'],
    ['Sammelbügeln (10+ Stück)','₺60+/Stück','Am selben Tag'],
  ]},
  { cat:'Reparatur & Änderungen', rows:[
    ['Kürzen','₺150+','Am selben Tag'],
    ['Reißverschluss Austausch','₺200+','Am selben Tag'],
    ['Bund Enger Machen','₺150+','24 Stunden'],
    ['Rissreparatur','₺100+','Am selben Tag'],
    ['Ärmel Kürzen','₺200+','24–48 Stunden'],
    ['Futter Austausch','₺300+','48 Stunden'],
  ]},
];

const REVIEWS = [
  { name:'Kemal A.', city:'Antalya', date:'April 2025', stars:5, text:'"Ich kam wegen eines Herrenanzugs. Die Passform war perfekt und das Online-Bestellsystem sehr praktisch."' },
  { name:'Ayşe T.', city:'Istanbul', date:'Mai 2025', stars:5, text:'"Ich habe online aus Istanbul bestellt. Es kam in 8 Tagen an meine Tür. Die Passform war perfekt — sehr zufrieden!"' },
  { name:'Mehmet S.', city:'Ankara', date:'März 2025', stars:5, text:'"Wir haben 200 Arbeitshemden in Serie fertigen lassen. Pünktlich, vollständig und in toller Qualität geliefert."' },
  { name:'Sarah M.', city:'London', date:'Juni 2025', stars:5, text:'"War in Antalya und brauchte dringend mein Kleid gebügelt. Vom Hotel abgeholt, in 3 Stunden geliefert. Fantastisch!"' },
  { name:'Fatma K.', city:'Antalya', date:'Februar 2025', stars:5, text:'"Ich habe mir ein individuelles Brautkleid entwerfen lassen. Das Ergebnis war noch schöner als erträumt!"' },
  { name:'Ali R.', city:'Kemer', date:'Mai 2025', stars:5, text:'"Ich habe den Bügelservice per Kurier von meinem Hotel in Kemer erhalten. Lieferung am selben Tag, sehr professionell."' },
];

const FAQS: [string, string][] = [
  ["Was kostet ein Herrenanzug in Antalya?", "Ab ₺2.500. Senden Sie ein Foto und Ihre Maße per WhatsApp, wir nennen Ihnen den Preis innerhalb von 30 Minuten."],
  ["Wie funktioniert der Online-Schneiderservice?", "Senden Sie ein Referenzfoto und Ihre Maße per WhatsApp. Bestätigen Sie den Preis. Nach der Fertigung versenden wir das Kleidungsstück an Ihre Adresse."],
  ["Kommen Sie für den Bügelservice zu meinem Hotel?", "Ja! Kurierabholung und -lieferung zu jedem Hotel in Antalya, mit garantierter Lieferung am selben Tag."],
  ["Wie hoch ist die Mindestbestellmenge für die Serienproduktion?", "Keine feste Mindestmenge; jedes Projekt wird einzeln kalkuliert. Für Muster und Prototypen wird auch ein Einzelstück akzeptiert."],
  ["Bieten Sie individuelle Designdienstleistungen an?", "Ja. Sie können Ihr eigenes Design mitbringen oder mit unseren Designern zusammenarbeiten, inklusive Schnittentwicklung."],
  ["Wie lange dauern Reparaturen und Änderungen?", "Einfache Arbeiten wie Kürzen oder Reißverschlüsse sind am selben Tag fertig. Änderungen dauern 24–48 Stunden. Express-Service verfügbar."],
  ["Versenden Sie in die ganze Türkei?", "Ja. Kostenloser Kurier innerhalb von Antalya, Versand in die ganze Türkei, 5–10 Werktage."],
  ["Gibt es einen deutschsprachigen Schneider in Antalya?", "Ja! Unser Schneider spricht Deutsch, Englisch und Russisch. WhatsApp: +90 531 898 64 18"],
  ["Mein Kleid ist gerissen — können Sie es am selben Tag reparieren?", "Ja, die meisten Risse und offenen Nähte werden am selben Tag repariert. Senden Sie ein Foto per WhatsApp für eine sofortige Einschätzung."],
  ["Haben Sie abends oder am Wochenende geöffnet?", "Ja, wir haben täglich von 08:00 bis 23:00 Uhr geöffnet, auch abends und am Wochenende. Schreiben Sie uns auf WhatsApp für einen Termin."],
  ["Kann ich mir ein individuelles Kleid anfertigen lassen?", "Ja, wir fertigen Kleidungsstücke nach Ihren Maßen und Ihrem gewünschten Stil — vom Alltagskleid bis zum Abendkleid."],
  ["Nähen Sie mit Naturstoffen wie Baumwolle oder Leinen?", "Ja, wir bieten maßgeschneiderte Kleidung aus 100% Baumwolle und Leinen an."],
];

export default function OnlineSchneiderClient({
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

      <a href="#main" className="skip">Zum Inhalt springen</a>
      <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="owa-float" aria-label="WhatsApp">💬</a>

      {/* ANNOUNCE */}
      <div className="oannounce" role="banner">
        🧵 2026 — 15% Rabatt auf Serienproduktionsbestellungen ·{' '}
        <a href={WA('Hallo, ich hätte gerne Informationen zur Aktion.')}>Für Details schreiben →</a>
      </div>

      {/* NAV */}
      <nav className={`onav${scrolled ? ' up' : ''}`} aria-label="Ana navigasyon">
        <a href="https://swaphubs.com" className="onav-logo">SwapHubs <em>/ Online Schneiderei</em></a>
        <ul className="onav-links">
          {[['#services','Leistungen'],['#prices','Preise'],['#reviews','Bewertungen'],['#faq','FAQ'],['#maps','Standorte']].map(([h,l])=>(
            <li key={h}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="onav-cta">💬 Jetzt Bestellen</a>
      </nav>

      {/* HERO */}
      <section className="ohero" aria-labelledby="hero-h" id="main">
        <div className="ohero-left">
          <span className="ohero-tag">Online Schneiderservice · Antalya 2026</span>
          <h1 id="hero-h">
            Maßgeschneiderte Kleidung,<br />
            <em>Online-Schneiderei</em>
            &amp; Bügelservice
          </h1>
          <p className="ohero-sub">
            Herren- und Damenschneiderei, individuelle Schnittentwicklung, ein komplettes Textilatelier,
            Serienproduktion und professioneller Bügelservice. Basierend in Konyaaltı, Versand in die ganze Türkei.
          </p>
          <div className="ohero-btns">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="obtn obtn-wa">💬 Per WhatsApp Bestellen</a>
            <a href="#services" className="obtn obtn-ghost">Unsere Leistungen ↓</a>
          </div>
          <div className="ohero-stats">
            {([['10+','Jahre Erfahrung'],['5000+','Zufriedene Kunden'],['4','Sprachen'],['24–48h','Lieferung']] as [string,string][]).map(([n,l])=>(
              <div key={l}><span className="ohstat-n">{n}</span><span className="ohstat-l">{l}</span></div>
            ))}
          </div>
        </div>
        <div className="ohero-right" aria-hidden="true">
          <img src={IMGS.hero} alt="Online Schneiderservice — SwapHubs Antalya Konyaaltı Schneider" className="ohero-img" width={900} height={1200} loading="eager" />
        </div>
      </section>

      {/* BREADCRUMB */}
      <nav className="obreadcrumb" aria-label="Breadcrumb">
        <a href="https://swaphubs.com">SwapHubs</a>
        <span>›</span>
        <a href="/terzi">Terzi Can</a>
        <span>›</span>
        <strong>Online Schneiderservice</strong>
      </nav>

      {/* SEO INTRO */}
      <div className="oseo" id="seo-intro">
        <p>
          <strong style={{ color: 'var(--bone2)' }}>Online-Schneiderservice</strong> — von unserem Standort in Konyaaltı in ganz Antalya und in die ganze Türkei:
          Herren- und Damenschneiderei, Bügelservice, Reparaturen, Änderungen, individuelle Schnittentwicklung,
          Serienproduktion und Lohnfertigung. Kürzen, Reißverschluss-Austausch, chemische Reinigung. Sportbekleidung, Trainingsanzüge
          und Sweatshirts nach Maß. Serienproduktion ohne feste Mindestmenge, Angebot pro Projekt. Kostenloser Kurier innerhalb Antalyas, Versand landesweit.
        </p>
      </div>

      {/* ABOUT STRIP */}
      <div className="oabout-strip" aria-hidden="true">
        {([[IMGS.about1,'Stickerei & Näharbeiten'],[IMGS.about2,'Nähatelier'],[IMGS.about3,'Individuelles Design']] as [string,string][]).map(([src,cap])=>(
          <div key={cap} className="oabout-img-wrap">
            <img src={src} alt={cap} loading="lazy" width={600} height={300} />
            <span className="oabout-cap">{cap}</span>
          </div>
        ))}
      </div>

      {/* SERVİSLER */}
      <section id="services" className="osvc-sec" aria-labelledby="svc-h">
        <div className="osvc-header">
          <span className="oeyebrow">✦ Alle Unsere Leistungen</span>
          <h2 className="oh2" id="svc-h">Was Wir Anbieten</h2>
          <p className="osh-sub">Von Herren- und Damenschneiderei über Online-Bestellung bis zu Bügelservice und Serienproduktion.</p>
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
                    Jetzt Bestellen
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
            <span className="oeyebrow">📱 Online-Bestellung</span>
            <h2 className="oh2" id="how-h">So Funktioniert's</h2>
            <p className="osh-sub" style={{ margin: '.9rem auto 0' }}>Bestellen Sie per WhatsApp, wir liefern in die ganze Türkei.</p>
            <div className="odivider" style={{ margin: '1.2rem auto 0' }} />
          </div>
          <div className="ohow-grid">
            {([
              ['01','📸','Foto & Maße Senden',"Senden Sie Ihr Referenzdesign und Ihre Maße per WhatsApp — völlig kostenlos."],
              ['02','🎨','Design & Stoffauswahl','Klären Sie die Details mit unserem Schneidermeister und bestätigen Sie den Preis.'],
              ['03','✂️','Wir Beginnen Zu Nähen','Nach Ihrer Freigabe beginnen wir in unserem Atelier mit der Fertigung.'],
              ['04','🚗','Lieferung','Kostenloser Kurier innerhalb Antalyas, Versand in die ganze Türkei.'],
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
            <a href={WA('Hallo, ich möchte eine Online-Bestellung aufgeben.')} target="_blank" rel="noopener noreferrer" className="obtn obtn-wa">
              💬 Jetzt Starten — WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* NEDEN BİZ */}
      <section className="osec" style={{ background: 'var(--ink)' }} aria-labelledby="why-h">
        <div className="octr">
          <span className="oeyebrow">✦ Warum SwapHubs?</span>
          <h2 className="oh2" id="why-h">Warum Uns Wählen</h2>
          <div className="odivider" />
          <div className="owhy-grid">
            {([
              ['📐','Perfekte Passform Garantiert','Jedes Kleidungsstück wird exakt nach Ihren Maßen gefertigt.'],
              ['⚡','Express-Lieferung','Reparaturen am selben Tag, Maßanfertigung in 3–7 Tagen.'],
              ['📱','Online-Bestellung',"Per WhatsApp bestellen, landesweiter Versand."],
              ['🎨','Individuelles Design','Bringen Sie Ihr eigenes Design mit oder arbeiten Sie mit unserem Expertenteam.'],
              ['🏭','Serienproduktionskapazität','Serienproduktion ohne feste Mindestmenge, Angebot pro Projekt.'],
              ['💰','Transparente Preise','Keine versteckten Kosten — klarer Preis im Voraus.'],
              ['🌍','Versand In Die Ganze Türkei','Von überall in der Türkei bestellen, geliefert zu Ihnen.'],
              ['📍','Auf Google Maps finden',"Öffnen Sie unser Google-Unternehmensprofil für Route und Kundenbewertungen."],
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
          <span className="oeyebrow">₺ Transparente Preise</span>
          <h2 className="oh2" id="prices-h">Schneiderpreise 2026</h2>
          <p className="osh-sub">Startpreise. Senden Sie ein Foto per WhatsApp für ein genaues Angebot.</p>
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
              <caption className="osr-only">{PRICE_TABLE[priceTab].cat} Preisliste</caption>
              <thead>
                <tr>
                  <th scope="col">Leistung</th>
                  <th scope="col">Startpreis</th>
                  <th scope="col">Dauer</th>
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
            <a href={WA('Hallo, ich hätte gerne ein Preisangebot.')} target="_blank" rel="noopener noreferrer" className="obtn obtn-gold">
              📲 Kostenloses Angebot
            </a>
          </div>
        </div>
      </section>

      {/* YORUMLAR */}
      <section id="reviews" className="osec" style={{ background: 'var(--ink3)' }} aria-labelledby="rev-h">
        <div className="octr">
          <div style={{ textAlign: 'center' }}>
            <span className="oeyebrow">Kundenstimmen</span>
            <h2 className="oh2" id="rev-h">Was Unsere Kunden Sagen</h2>
            <div className="odivider" style={{ margin: '1.2rem auto 0' }} />
          </div>
          <div className="orev-grid">
            {REVIEWS.map(r => (
              <article key={r.name} className="orcard">
                <div className="orstars" aria-label={`${r.stars} Sterne`}>{'★'.repeat(r.stars)}</div>
                <p className="ortxt">{r.text}</p>
                <div><span className="orauth-name">{r.name}</span>{' '}<span className="orauth-info">— {r.city} · {r.date}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="octa-sec" aria-label="Bestellung aufgeben">
        <h2 className="octa-h">Ihr Kleidungsstück, Perfekt Angepasst<br /><em>Direkt An Ihre Tür</em></h2>
        <p className="octa-sub">Online bestellen · Sofortkontakt per WhatsApp · Versand in die ganze Türkei</p>
        <div className="octa-btns">
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="obtn obtn-wa">💬 Per WhatsApp Bestellen</a>
          <a href={WA('Hallo, ich hätte gerne Informationen zu Sammelbestellungen.')} target="_blank" rel="noopener noreferrer" className="obtn obtn-ghost">🏭 Sammelbestellung</a>
        </div>
        <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '1.5rem' }}>
          Telefon: <a href="tel:+905318986418" style={{ color: 'var(--gold)', textDecoration: 'none' }}>+90 531 898 64 18</a>
        </p>
      </section>

      {/* FAQ — details/summary — Google SSS snippet */}
      <section id="faq" className="osec" style={{ background: 'var(--ink)' }} aria-labelledby="faq-h">
        <div className="octr">
          <div style={{ textAlign: 'center' }}>
            <span className="oeyebrow">FAQ</span>
            <h2 className="oh2" id="faq-h">Häufig Gestellte Fragen</h2>
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
          <span className="oeyebrow">📍 Unsere Standorte</span>
          <h2 className="oh2" id="maps-h">Unsere Google Unternehmensprofile</h2>
          <p className="osh-sub">Stadtteile Hurma und Liman, Konyaaltı / Antalya.</p>
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
                  <a href={gbpShort1} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-route">📍 Route</a>
                  <a href={gbpReview1 || gbpMaps1} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-rev">⭐ Bewertung</a>
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
                  <a href={gbpShort2} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-route">📍 Route</a>
                  <a href={gbpReview2 || gbpMaps2} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-rev">⭐ Bewertung</a>
                </div>
              </div>
            </div>
            </>
          )}
          </div>
          <p style={{ fontSize: '.74rem', color: 'var(--muted)', marginTop: '1.2rem', textAlign: 'center' }}>
            Sie können auf beiden Profilen eine Bewertung hinterlassen — das hilft direkt unserem Google-Ranking.
          </p>
        </div>
      </section>

      {/* ÇAPRAZ LİNK */}
      <section className="ocross-sec" aria-labelledby="cross-h">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="oeyebrow">SwapHubs Schneiderdienste</span>
          <h2 id="cross-h" className="oh2" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>Sind Sie In Antalya?</h2>
        </div>
        <div className="ocross-grid">
          <div className="ocross-card" style={{ background: 'var(--ink4)', border: '1px solid var(--gold)' }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.6rem' }}>🌐 Landesweit · Aktuelle Seite</div>
            <div style={{ fontFamily: 'var(--font-unbounded,"Georgia",serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--bone)', marginBottom: '.5rem' }}>Online-Schneiderservice</div>
            <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '.8rem' }}>Maßanfertigung, Abendkleider, Anzüge und Uniformen, Versand in alle 81 Provinzen.</p>
            <span style={{ fontSize: '.68rem', color: 'var(--gold)', fontWeight: 600 }}>✓ Sie sind hier</span>
          </div>
          <a href="/terzi" className="ocross-card" style={{ background: 'var(--ink3)', border: '1px solid rgba(201,168,76,.15)' }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.6rem' }}>📍 Antalya & Umgebung</div>
            <div style={{ fontFamily: 'var(--font-unbounded,"Georgia",serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--bone)', marginBottom: '.5rem' }}>Antalya Terzi Can →</div>
            <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '.8rem' }}>Mobiler Schneiderservice mit Sitz in Konyaaltı. Wir kommen zu Ihnen nach Hause oder ins Hotel, nehmen Maß und liefern.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem' }}>
              {['✂️ Änderungen','👗 Schneiderei','🧺 Chemische Reinigung','🚗 Hausbesuch-Schneider'].map(t => (
                <span key={t} style={{ fontSize: '.6rem', color: 'var(--gold)', border: '1px solid rgba(201,168,76,.2)', padding: '.18rem .5rem' }}>{t}</span>
              ))}
            </div>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ofooter">
        <div className="ofoot-brand">SwapHubs — Online Schneiderservice | Antalya Schneider</div>
        <nav className="ofoot-links" aria-label="Footer">
          {[['https://swaphubs.com','Startseite'],['/terzi','Terzi Can Antalya'],['#services','Leistungen'],['#prices','Preise'],['#faq','FAQ'],['#maps','Standorte']].map(([h,l])=><a key={h} href={h}>{l}</a>)}
        </nav>
        <p className="ofoot-copy">
          © {new Date().getFullYear()} SwapHubs · Antalya Schneiderei &amp; Textilien ·{' '}
          <a href="tel:+905318986418" style={{ color: 'rgba(201,168,76,.35)', textDecoration: 'none' }}>+90 531 898 64 18</a>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', justifyContent: 'center', marginTop: '1rem' }}>
          {['Antalya Herrenschneider','Herrenschneiderei','Damenschneiderei','Online Schneider Antalya','Bügelservice Antalya','Serienproduktion Antalya','Schneider Antalya','Tailor Antalya','Портной Анталья'].map(k => (
            <span key={k} style={{ fontSize: '.58rem', color: 'rgba(201,168,76,.22)', border: '1px solid rgba(201,168,76,.07)', padding: '.18rem .55rem' }}>{k}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
