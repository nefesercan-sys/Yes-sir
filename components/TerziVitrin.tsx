import Link from "next/link";
import { PRICE_FROM, PRICE_BY_MODEL, AREA_SERVED, PHONE_E164, PHONE_DISPLAY, waUrl } from "@/lib/business";
import { ONLINE_ALL, ONLINE_PATH } from "@/lib/intl-online";
import { OZEL_ALL, OZEL_PATH, OZEL_META } from "@/lib/ozel-dikim";
import { GOOGLE_REVIEWS, GOOGLE_PROFILE_URL, reviewStats } from "@/lib/reviews";

// Ana sayfa vitrini: iki ayrı bölüm (Terzi Can, siparişe özel dikim ve dünyaya kargo).
// Sunucu bileşeni: tüm bağlantılar ham HTML'de görünür (botlar JS çalıştırmadan okur). Kendi renk belirteçlerini taşır
// (açık ve koyu tema, arka plan + yazı rengi birlikte verilir), böylece hiçbir temada kontrast bozulmaz.
// Görsel dil: terzi mezurası. Üstteki şerit sayfa açılırken bir kez "çekilir"; başka dekor yok.

// Hizmet bağlantıları (ana sayfa İngilizce öncelikli; Türkçe sayfalar ayrı grupta).
const LINK_GROUPS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Alterations and repairs",
    links: [
      { href: "/en/tailor-services", label: "All tailor services" },
      { href: "/en/urgent-clothing-repair-antalya", label: "Urgent clothing repair" },
      { href: "/en/event-outfit-alteration-antalya", label: "Event outfit alteration" },
      { href: "/en/tailor-faq-antalya", label: "Tailor FAQ" },
      { href: "/en/contact-tailor-antalya", label: "Contact the tailor" },
    ],
  },
  {
    title: "Hotel guests",
    links: [
      { href: "/en/hotel-tailor-antalya", label: "Hotel tailor in Antalya" },
      { href: "/en/how-hotel-tailor-works-antalya", label: "How hotel pickup works" },
      { href: "/en/tailor-antalya", label: "Tailor by district" },
    ],
  },
  {
    title: "Custom and online",
    links: [
      { href: "/online-tailor-service", label: "Online tailor service" },
      { href: "/en/made-to-order-clothing-worldwide-antalya", label: "Made-to-order clothing and shipping" },
      { href: "/en/how-to-measure-yourself-for-a-tailor", label: "How to measure yourself at home" },
      { href: "/en/linen-clothing-custom-made-antalya", label: "Linen clothing, custom made" },
    ],
  },
  {
    title: "Business",
    links: [
      { href: "/en/textile-manufacturer-antalya", label: "Textile manufacturer" },
      { href: "/en/promotional-textiles-tote-bags-antalya", label: "Promotional textiles and tote bags" },
    ],
  },
  {
    title: "Türkçe (Turkish)",
    links: [
      { href: "/terzi", label: "Antalya Terzi (Türkçe)" },
      { href: "/terzi/eve-gelen-terzi-antalya", label: "Eve ve otele gelen terzi" },
    ],
  },
];

// Mezura şeridi: 8px aralıkla ince çentik, 40px'te uzun çentik (5 cm). Saf CSS, görsel dosyası yok.
const STYLES = `
.tv{
  --bg:#eef2f9;--surface:#ffffff;--surface-2:#f6f8fc;--text:#0f172a;--muted:#475569;--line:#c9d3e6;
  --link:#1d4ed8;--navy:#0d1b3e;--navy-2:#16306b;--tape:#f5c84b;--tape-ink:#2a2105;
  --wa:#15803d;--wa-ink:#ffffff;--call:#0d1b3e;--call-ink:#ffffff;
  --accent-terzi:#16306b;--accent-ozel:#a16207;--accent-guzel:#8a2c63;
  --icon-bg-terzi:#e3eafb;--icon-bg-ozel:#fdf2cc;--icon-bg-guzel:#f8e4ef;
  --star:#b45309;--ring:#b45309;
  background:var(--bg);color:var(--text);font-size:16px;line-height:1.65;
  padding:0 0 40px;
}
@media (prefers-color-scheme:dark){
  :root:not(.light):not(.dark) .tv{
    --bg:#0a1122;--surface:#121b31;--surface-2:#17223d;--text:#e8edf8;--muted:#b6c1d8;--line:#2b3757;
    --link:#9fbaff;--wa:#15803d;--call:#e8edf8;--call-ink:#0d1b3e;
    --accent-terzi:#a9c0ff;--accent-ozel:#f5c84b;--accent-guzel:#f0a9d2;
    --icon-bg-terzi:#1d2c52;--icon-bg-ozel:#3a3010;--icon-bg-guzel:#42203a;
    --star:#f5c84b;--ring:#f5c84b;
  }
}
.dark .tv{
  --bg:#0a1122;--surface:#121b31;--surface-2:#17223d;--text:#e8edf8;--muted:#b6c1d8;--line:#2b3757;
  --link:#9fbaff;--wa:#15803d;--call:#e8edf8;--call-ink:#0d1b3e;
  --accent-terzi:#a9c0ff;--accent-ozel:#f5c84b;--accent-guzel:#f0a9d2;
  --icon-bg-terzi:#1d2c52;--icon-bg-ozel:#3a3010;--icon-bg-guzel:#42203a;
  --star:#f5c84b;--ring:#f5c84b;
}
.tv *{box-sizing:border-box}
.tv a{color:var(--link)}
.tv h1,.tv h2,.tv h3{margin:0;color:var(--text)}
.tv p{margin:0 0 12px;color:var(--muted)}
.tv-wrap{max-width:1120px;margin:0 auto;padding:0 16px}

/* ── Hero ── */
.tv-hero{background:linear-gradient(165deg,var(--navy) 0%,var(--navy-2) 100%);color:#fff;position:relative;overflow:hidden}
.tv-hero-in{max-width:1120px;margin:0 auto;padding:44px 16px 40px}
.tv-langs ul{list-style:none;margin:0 0 20px;padding:0;display:flex;flex-wrap:wrap;gap:2px 16px}
.tv .tv-hero .tv-langs a{display:inline-block;padding:8px 0;font-size:14px;color:#dbe5fb;text-decoration:underline;text-underline-offset:3px}
.tv .tv-hero .tv-langs a:hover{color:#fff}
.tv-hero h1{
  font-family:var(--font-unbounded),var(--font-jakarta),system-ui,sans-serif;
  color:#fff;font-weight:600;font-size:clamp(25px,6.6vw,44px);line-height:1.18;letter-spacing:-.01em;
  max-width:19em;overflow-wrap:anywhere;
}
.tv .tv-hero .tv-lead{color:#e1e8f7;font-size:17px;max-width:38em;margin:18px 0 0}
.tv-hero .tv-actions{margin-top:22px}
.tv .tv-hero .tv-hours{color:#d3dcf0;font-size:14px;margin:14px 0 0}
.tv-tape{
  height:34px;background-color:var(--tape);
  background-image:
    repeating-linear-gradient(90deg,var(--tape-ink) 0 1px,transparent 1px 8px),
    repeating-linear-gradient(90deg,var(--tape-ink) 0 2px,transparent 2px 40px);
  background-size:100% 9px,100% 18px;background-repeat:repeat-x,repeat-x;background-position:0 0,0 0;
  border-top:2px solid var(--tape-ink);
  animation:tvPull .9s cubic-bezier(.2,.7,.2,1) both;
}
@keyframes tvPull{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@media (prefers-reduced-motion:reduce){.tv-tape{animation:none}}

/* ── Düğmeler ── */
.tv-actions{display:flex;flex-wrap:wrap;gap:10px}
.tv-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:11px 20px;border-radius:12px;font-weight:700;font-size:16px;text-decoration:none!important;border:2px solid transparent;cursor:pointer;transition:background-color .15s,border-color .15s,transform .15s}
.tv-btn:active{transform:translateY(1px)}
.tv-wa{background:var(--wa);color:var(--wa-ink)!important}
.tv-wa:hover{background:#166534}
.tv-call{background:transparent;color:#fff!important;border-color:rgba(255,255,255,.75)}
.tv-call:hover{background:rgba(255,255,255,.12)}
.tv-detail{background:transparent;color:var(--text)!important;border-color:var(--line)}
.tv-detail:hover{border-color:var(--text)}
.tv-btn:focus-visible,.tv a:focus-visible,.tv summary:focus-visible{outline:3px solid var(--ring);outline-offset:3px}
.tv-hero .tv-btn:focus-visible{outline-color:var(--tape)}

/* ── Güven şeridi ── */
.tv-trust{list-style:none;margin:24px auto 0;padding:0;display:grid;grid-template-columns:repeat(2,1fr);border:1px solid var(--line);border-radius:16px;background:var(--surface);overflow:hidden}
.tv-trust li{display:flex;gap:12px;align-items:flex-start;padding:14px 14px;border-bottom:1px solid var(--line)}
.tv-trust li:nth-child(odd){border-right:1px solid var(--line)}
.tv-trust li:nth-last-child(-n+2){border-bottom:0}
.tv-trust svg{flex:none;width:26px;height:26px;margin-top:2px;stroke:var(--accent-terzi)}
.tv-trust strong{display:block;font-size:15px;line-height:1.3;color:var(--text)}
.tv-trust span{display:block;font-size:13px;line-height:1.4;color:var(--muted);margin-top:2px}
@media(min-width:900px){
  .tv-trust{grid-template-columns:repeat(6,1fr)}
  .tv-trust li{flex-direction:column;border-bottom:0!important;border-right:1px solid var(--line)!important}
  .tv-trust li:last-child{border-right:0!important}
}

/* ── Bölüm başlıkları ── */
.tv-sec{margin-top:44px}
.tv-sec>h2{font-size:clamp(21px,4.6vw,28px);line-height:1.25;font-weight:800;letter-spacing:-.01em;margin-bottom:16px}

/* ── Yorumlar ── */
.tv-rev{display:grid;gap:14px;grid-template-columns:1fr}
@media(min-width:800px){.tv-rev{grid-template-columns:240px 1fr 1fr}}
.tv-score{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px;display:flex;flex-direction:column;justify-content:center;gap:4px}
.tv-score b{font-family:var(--font-unbounded),var(--font-jakarta),system-ui,sans-serif;font-size:34px;line-height:1.1;color:var(--text)}
.tv-stars{display:flex;gap:2px;color:var(--star)}
.tv-stars svg{width:18px;height:18px;fill:currentColor}
.tv-score small{font-size:13px;color:var(--muted)}
.tv-q{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px}
.tv-q p{color:var(--text);font-size:16px;margin:0 0 8px}
.tv-q figcaption{font-size:13px;color:var(--muted)}
.tv-gl{display:inline-block;margin-top:8px;font-size:14px;padding:10px 0}

/* ── Hizmet kartları ── */
.tv-cards{display:grid;grid-template-columns:1fr;gap:16px}
@media(min-width:900px){.tv-cards{grid-template-columns:repeat(2,1fr);gap:20px}}
.tv-card{--acc:var(--accent-terzi);--icb:var(--icon-bg-terzi);background:var(--surface);border:1px solid var(--line);border-top:5px solid var(--acc);border-radius:16px;padding:22px 20px 20px;display:flex;flex-direction:column;transition:border-color .15s,box-shadow .15s}
.tv-card:hover,.tv-card:focus-within{box-shadow:0 10px 28px rgba(13,27,62,.14)}
.tv-card.ozel{--acc:var(--accent-ozel);--icb:var(--icon-bg-ozel)}
.tv-card.guzel{--acc:var(--accent-guzel);--icb:var(--icon-bg-guzel)}
.tv-ic{width:52px;height:52px;border-radius:14px;background:var(--icb);display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.tv-ic svg{width:28px;height:28px;stroke:var(--acc)}
.tv-card h2{font-size:22px;line-height:1.25;font-weight:800;letter-spacing:-.01em}
.tv-card .tv-sub{font-size:13px;font-weight:700;color:var(--acc);margin:0 0 4px}
.tv-val{color:var(--text)!important;font-size:16px;margin:10px 0 12px!important}
.tv-card ul{margin:0 0 14px;padding:0;list-style:none}
.tv-card li{position:relative;padding:7px 0 7px 18px;font-size:15px;line-height:1.5;color:var(--muted);border-top:1px solid var(--line)}
.tv-card li::before{content:"";position:absolute;left:2px;top:15px;width:7px;height:7px;border-radius:2px;background:var(--acc)}
.tv-card li b{color:var(--text)}
.tv-card .tv-fine{font-size:13px;margin:0 0 14px}
.tv-card .tv-actions{margin-top:auto}
.tv-card .tv-btn{flex:1 1 140px}

/* ── Bölgeler ── */
.tv-areas{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:4px 0}
.tv-areas li{font-size:15px;color:var(--muted)}
.tv-areas li:not(:last-child)::after{content:"•";margin:0 10px;color:var(--line)}

/* ── Nasıl çalışır ── */
.tv-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr;gap:14px;counter-reset:s}
@media(min-width:800px){.tv-steps{grid-template-columns:repeat(3,1fr);gap:20px}}
.tv-steps li{counter-increment:s;position:relative;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:18px 18px 18px 18px}
.tv-steps li::before{content:counter(s);display:flex;width:34px;height:34px;border-radius:50%;background:var(--navy);color:#fff;font-weight:800;align-items:center;justify-content:center;margin-bottom:10px;border:2px solid var(--tape)}
@media(min-width:800px){.tv-steps li:not(:last-child)::after{content:"";position:absolute;top:34px;right:-20px;width:20px;border-top:2px dashed var(--line)}}
.tv-steps strong{display:block;font-size:17px;color:var(--text);margin-bottom:4px}
.tv-steps span{font-size:15px;color:var(--muted);line-height:1.5}

/* ── Diller ── */
.tv-lang-row{display:grid;grid-template-columns:1fr;gap:2px;padding:12px 0;border-top:1px solid var(--line)}
@media(min-width:800px){.tv-lang-row{grid-template-columns:230px 1fr;align-items:baseline}}
.tv-lang-row:last-child{border-bottom:1px solid var(--line)}
.tv-lang-row h3{font-size:15px;font-weight:800}
.tv-lang-row ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:0 18px}
.tv-lang-row a{display:inline-block;padding:10px 0;font-size:15px}

/* ── Hizmet bağlantıları ── */
.tv-groups{display:grid;grid-template-columns:1fr;gap:18px;margin-top:14px}
@media(min-width:700px){.tv-groups{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1000px){.tv-groups{grid-template-columns:repeat(4,1fr)}}
.tv-groups h3{font-size:15px;font-weight:800;margin-bottom:6px;color:var(--text)}
.tv-groups ul{list-style:none;margin:0;padding:0}
.tv-groups a{display:block;padding:8px 0;font-size:15px;line-height:1.4}

/* ── Mobil sabit çubuk ── */
.tv-bar{position:fixed;left:0;right:0;bottom:0;z-index:50;display:flex;gap:8px;padding:10px 12px calc(10px + env(safe-area-inset-bottom));background:var(--surface);border-top:1px solid var(--line);box-shadow:0 -6px 18px rgba(13,27,62,.12)}
.tv-bar .tv-btn{flex:1 1 0;min-height:48px;padding:10px 12px}
.tv-bar .tv-call2{background:var(--call);color:var(--call-ink)!important}
@media(min-width:768px){.tv-bar{display:none}}
@media(max-width:767px){.tv{padding-bottom:96px}}
`;

const ICON = { fill: "none", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", "aria-hidden": true };

export default function TerziVitrin() {
  const wa = waUrl("Hello, I am sending a photo of my garment. I would like to know the price and delivery time.");
  const waOzel = waUrl(
    "Hello, I would like a made-to-order garment. I will write the product type, fabric, measurements and my country/city."
  );

  // Gerçek Google yorumlarından, metni birebir olan iki kısa alıntı (lib/reviews.ts; metin değiştirilmez, yazıldıkları dilde gösterilir).
  const { count, average } = reviewStats();
  const quotes = ["Hamza A.", "Mehmet E."]
    .map((a) => GOOGLE_REVIEWS.find((r) => r.author === a))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const ay = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const tarih = (d: string) => {
    const [y, m] = d.split("-");
    return `${ay[Number(m) - 1] ?? ""} ${y}`.trim();
  };

  return (
    <section aria-labelledby="terzi-vitrin-baslik" className="tv">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── Hero ── */}
      <header className="tv-hero">
        <div className="tv-hero-in">
          <nav className="tv-langs" aria-label="Languages">
            <ul>
              <li><a href="/terzi" hrefLang="tr" lang="tr">Türkçe</a></li>
              {ONLINE_ALL.filter((l) => l !== "tr" && l !== "en").map((l) => (
                <li key={l}><a href={ONLINE_PATH[l]} hrefLang={OZEL_META[l].hreflang} lang={OZEL_META[l].hreflang}>{OZEL_META[l].name}</a></li>
              ))}
            </ul>
          </nav>
          <h1 id="terzi-vitrin-baslik">Tailor in Antalya: alterations, custom tailoring and worldwide shipping</h1>
          <p className="tv-lead">
            Terzi Can has made alterations and custom clothing in his workshop in Konyaaltı Hurma, Antalya, since 2006.
            Send a photo of your garment on WhatsApp; once the job is clear, we tell you the price in writing.
          </p>
          <div className="tv-actions">
            <a className="tv-btn tv-wa" href={wa} rel="noopener">Write on WhatsApp</a>
            <a className="tv-btn tv-call" href={`tel:${PHONE_E164}`}>Call: {PHONE_DISPLAY}</a>
          </div>
          <p className="tv-hours">Open every day 08:00–23:00. We help you in Turkish, English, German and Russian, and in 10 languages in total.</p>
        </div>
        <div className="tv-tape" aria-hidden="true" />
      </header>

      <div className="tv-wrap">
        {/* ── Güven şeridi: yalnızca doğrulanmış bilgiler ── */}
        <ul className="tv-trust" aria-label="About Terzi Can">
          <li>
            <svg {...ICON} stroke="currentColor"><path d="M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /></svg>
            <div><strong>Since 2006</strong><span>26 years of experience</span></div>
          </li>
          <li>
            <svg {...ICON} stroke="currentColor"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></svg>
            <div><strong>10 languages</strong><span>From Turkish to Arabic</span></div>
          </li>
          <li>
            <svg {...ICON} stroke="currentColor"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2M9 2h6" /></svg>
            <div><strong>Same-day jobs</strong><span>Urgent jobs in 1–2 hours</span></div>
          </li>
          <li>
            <svg {...ICON} stroke="currentColor"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h3" /></svg>
            <div><strong>Cash or card</strong><span>All currencies accepted</span></div>
          </li>
          <li>
            <svg {...ICON} stroke="currentColor"><path d="M2 6.5h11V16H2zM13 10h4.2L21 13.5V16h-8z" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
            <div><strong>Pickup and delivery</strong><span>To homes and hotels</span></div>
          </li>
          <li>
            <svg {...ICON} stroke="currentColor"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            <div><strong>Open every day</strong><span>08:00–23:00, Terzi Can workshop</span></div>
          </li>
        </ul>

        {/* ── İki ayrı bölüm ── */}
        <div className="tv-sec">
          <div className="tv-cards">
            <article className="tv-card" aria-labelledby="kart-terzi">
              <div className="tv-ic"><svg {...ICON}><path d="M8.1 8.1 20 20M8.1 15.9 20 4" /><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /></svg></div>
              <p className="tv-sub">Terzi Can</p>
              <h2 id="kart-terzi">Alterations and tailoring in Antalya</h2>
              <p className="tv-val">Hemming, waist, zipper, leather and coat alterations. Your clothes are picked up from your home or hotel and brought back.</p>
              <ul>
                <li>Hemming and waist alterations <b>from {PRICE_FROM.paca} TL (€10)</b></li>
                <li>Zipper replacement <b>from {PRICE_FROM.fermuar} TL (€15)</b></li>
                <li>Leather alterations <b>from {PRICE_FROM.deri} TL (€20)</b></li>
              </ul>
              <p className="tv-fine">Prices exclude VAT. For tailoring (new clothes) the price is set {PRICE_BY_MODEL.en}.</p>
              <div className="tv-actions">
                <Link className="tv-btn tv-detail" href="/en/tailor-services" aria-label="Tailor services, details">Details</Link>
                <a className="tv-btn tv-wa" href={wa} rel="noopener">WhatsApp</a>
              </div>
            </article>

            <article className="tv-card ozel" aria-labelledby="kart-ozel">
              <div className="tv-ic"><svg {...ICON}><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" /></svg></div>
              <p className="tv-sub">Worldwide shipping</p>
              <h2 id="kart-ozel">Made-to-order clothing</h2>
              <p className="tv-val">Sewn to your measurements from linen, cotton and other fabrics, and shipped within Antalya and abroad.</p>
              <ul>
                <li>Women&apos;s and men&apos;s suits, trousers, shirts, skirts, shorts, evening dresses</li>
                <li>You send the measurements and a photo of the model on WhatsApp; the price depends on the photo or the model you want</li>
                <li>The shipping fee is paid by the customer; the time depends on the job</li>
              </ul>
              <div className="tv-actions">
                <Link className="tv-btn tv-detail" href={OZEL_PATH.en} aria-label="Made-to-order clothing, details">Details</Link>
                <a className="tv-btn tv-wa" href={waOzel} rel="noopener">WhatsApp</a>
              </div>
            </article>
          </div>
        </div>

        {/* ── Müşteri yorumları (Google'daki gerçek yorumlar) ── */}
        <section className="tv-sec" aria-labelledby="tv-yorum-baslik">
          <h2 id="tv-yorum-baslik">Customer reviews</h2>
          <div className="tv-rev">
            <div className="tv-score">
              <b>{average}</b>
              <div className="tv-stars" role="img" aria-label={`${average} out of 5 on Google`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z" /></svg>
                ))}
              </div>
              <small>{count} reviews on Google</small>
            </div>
            {quotes.map((r) => (
              <figure className="tv-q" key={r.author} style={{ margin: 0 }}>
                <blockquote style={{ margin: 0 }}>
                  <p>&ldquo;{r.text}&rdquo;</p>
                </blockquote>
                <figcaption>{r.author} · {tarih(r.date)} · review in Turkish</figcaption>
              </figure>
            ))}
          </div>
          <a className="tv-gl" href={GOOGLE_PROFILE_URL} rel="noopener noreferrer" target="_blank">See all reviews on Google</a>
        </section>

        {/* ── Nasıl çalışır ── */}
        <section className="tv-sec" aria-labelledby="tv-nasil-baslik">
          <h2 id="tv-nasil-baslik">How it works</h2>
          <ol className="tv-steps">
            <li><strong>Send a photo or measurements</strong><span>Write to us on WhatsApp with a photo of the garment, or the measurements and the model for custom clothing.</span></li>
            <li><strong>Price and time are confirmed</strong><span>We tell you the price and delivery time in writing; the time depends on the job.</span></li>
            <li><strong>Pickup, delivery or shipping</strong><span>In Antalya your garment is picked up from your address or hotel reception and brought back when it is ready; custom clothing is shipped.</span></li>
          </ol>
        </section>

        {/* ── Hizmet bölgeleri ── */}
        <section className="tv-sec" aria-labelledby="tv-bolge-baslik">
          <h2 id="tv-bolge-baslik">Pickup and delivery areas</h2>
          <p>Terzi Can picks up and delivers to homes and hotels in these areas.</p>
          <ul className="tv-areas">
            {AREA_SERVED.map((a) => (<li key={a}>{a}</li>))}
          </ul>
        </section>

        {/* ── Diğer diller ── */}
        <section className="tv-sec" aria-labelledby="tv-dil-baslik">
          <h2 id="tv-dil-baslik">Other languages</h2>
          <div className="tv-lang-row">
            <h3>Online tailor service</h3>
            <ul>
              {ONLINE_ALL.map((l) => (
                <li key={l}><a href={ONLINE_PATH[l]} hrefLang={OZEL_META[l].hreflang} lang={OZEL_META[l].hreflang}>{OZEL_META[l].name}</a></li>
              ))}
            </ul>
          </div>
          <div className="tv-lang-row">
            <h3>Made-to-order clothing</h3>
            <ul>
              {OZEL_ALL.map((l) => (
                <li key={l}><a href={OZEL_PATH[l]} hrefLang={OZEL_META[l].hreflang} lang={OZEL_META[l].hreflang}>{OZEL_META[l].name}</a></li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Hizmet sayfaları ── */}
        <section className="tv-sec" aria-labelledby="tv-hizmet-baslik">
          <h2 id="tv-hizmet-baslik">Tailor service pages</h2>
          <p>
            For prices and services see <Link href="/en/tailor-services">all tailor services</Link>; if you are a hotel guest,
            read <Link href="/en/hotel-tailor-antalya">hotel tailor in Antalya</Link>. Turkish pages: <Link href="/terzi">Antalya Terzi</Link>.
            Phone and WhatsApp: {PHONE_DISPLAY}.
          </p>
          <div className="tv-groups">
            {LINK_GROUPS.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <h3>{g.title}</h3>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </section>
      </div>

      {/* ── Mobil sabit çubuk ── */}
      <div className="tv-bar">
        <a className="tv-btn tv-wa" href={wa} rel="noopener">Write on WhatsApp</a>
        <a className="tv-btn tv-call2" href={`tel:${PHONE_E164}`} aria-label={`Call: ${PHONE_DISPLAY}`}>Call</a>
      </div>
    </section>
  );
}
