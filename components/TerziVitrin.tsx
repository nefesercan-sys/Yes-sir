import Link from "next/link";
import { PRICE_FROM, PRICE_BY_MODEL, AREA_SERVED, PHONE_E164, PHONE_DISPLAY, waUrl } from "@/lib/business";
import { ONLINE_ALL, ONLINE_PATH } from "@/lib/intl-online";
import { OZEL_ALL, OZEL_PATH, OZEL_META } from "@/lib/ozel-dikim";
import { GOOGLE_REVIEWS, GOOGLE_PROFILE_URL, reviewStats } from "@/lib/reviews";

// Ana sayfa vitrini: üç ayrı bölüm (Terzi Can, siparişe özel dikim ve dünyaya kargo, Can Beauty Studio).
// Sunucu bileşeni: tüm bağlantılar ham HTML'de görünür (botlar JS çalıştırmadan okur). Kendi renk belirteçlerini taşır
// (açık ve koyu tema, arka plan + yazı rengi birlikte verilir), böylece hiçbir temada kontrast bozulmaz.
// Görsel dil: terzi mezurası. Üstteki şerit sayfa açılırken bir kez "çekilir"; başka dekor yok.

const BEAUTY_PATH = "/guzellik/guzellik-merkezi-antalya";
const BEAUTY_WA_NUMBER = "905315104458";
const BEAUTY_PHONE_DISPLAY = "+90 531 510 44 58";
const BEAUTY_WA_TEXT =
  "Merhaba, Can Beauty Studio hizmetleri için bilgi ve fiyat teklifi almak istiyorum. Konakladığım bölge: ";
// Güzellik sayfaları (dil adresleri /guzellik/ önekinde)
const BEAUTY_LANG: { l: keyof typeof OZEL_META; slug: string }[] = [
  { l: "tr", slug: "guzellik-merkezi-antalya" },
  { l: "en", slug: "beauty-salon-antalya" },
  { l: "de", slug: "schoenheitssalon-antalya" },
  { l: "ru", slug: "salon-krasoty-antalya" },
  { l: "es", slug: "salon-de-belleza-antalya" },
  { l: "fr", slug: "salon-de-beaute-antalya" },
  { l: "pl", slug: "salon-urody-antalya" },
  { l: "uk", slug: "salon-krasy-antaliya" },
  { l: "nl", slug: "schoonheidssalon-antalya" },
  { l: "ar", slug: "salon-tajmeel-antalya" },
];

// Hizmet bağlantıları: kümeler halinde (14 iç bağlantının hepsi korunur).
const LINK_GROUPS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Terzi Can",
    links: [
      { href: "/terzi", label: "Terzi Can — Antalya Terzi" },
      { href: "/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti", label: "Konyaaltı Terzi, Elbise Dikim ve Tadilat" },
      { href: "/terzi/eve-gelen-terzi-antalya", label: "Eve ve Otele Gelen Terzi" },
    ],
  },
  {
    title: "Tadilat",
    links: [
      { href: "/terzi/paca-kisaltma-antalya", label: "Paça Kısaltma" },
      { href: "/terzi/fermuar-degisimi", label: "Fermuar Değişimi" },
      { href: "/terzi/bay-terzi-antalya", label: "Bay Terzi" },
      { href: "/terzi/bayan-terzi-antalya", label: "Bayan Terzi" },
    ],
  },
  {
    title: "Üretim",
    links: [
      { href: "/terzi/dikis-atolyesi-antalya", label: "Dikiş Atölyesi, Fason Üretim" },
      { href: "/terzi/uniforma-uretimi-antalya", label: "Üniforma Üretimi" },
      { href: "/tekstil-antalya", label: "Tekstil Antalya" },
    ],
  },
  {
    title: "Özel dikim ve online",
    links: [
      { href: "/siparise-ozel-dikim-dunyaya-kargo", label: "Siparişe Özel Dikim ve Kargo" },
      { href: "/online-tailor-service", label: "Online Tailor Service (EN)" },
      { href: "/de/online-schneiderservice-antalya", label: "Online Schneiderservice (DE)" },
      { href: "/ru/atelie-antalya", label: "Ателье Анталья (RU)" },
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
@media(min-width:900px){.tv-cards{grid-template-columns:repeat(3,1fr);gap:20px}}
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
  const wa = waUrl("Merhaba, kıyafetimin fotoğrafını gönderiyorum, fiyat ve teslim zamanını öğrenmek istiyorum.");
  const waOzel = waUrl(
    "Merhaba, siparişe özel dikim yaptırmak istiyorum. Ürün türü, kumaş, ölçüler ve ülke/şehir bilgisini yazıyorum."
  );
  const waBeauty = `https://wa.me/${BEAUTY_WA_NUMBER}?text=${encodeURIComponent(BEAUTY_WA_TEXT)}`;

  // Gerçek Google yorumlarından, metni birebir olan iki kısa alıntı (lib/reviews.ts; metin değiştirilmez).
  const { count, average } = reviewStats();
  const quotes = ["Hamza A.", "Mehmet E."]
    .map((a) => GOOGLE_REVIEWS.find((r) => r.author === a))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const ay = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
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
          <h1 id="terzi-vitrin-baslik">Antalya&apos;da Terzi Can: tadilat, özel dikim ve dünyaya kargo</h1>
          <p className="tv-lead">
            Terzi Can, Konyaaltı Hurma&apos;daki atölyesinde 2006&apos;dan beri Antalya&apos;da tadilat ve dikim işleri yapar.
            Kıyafetin fotoğrafını WhatsApp&apos;tan gönderin; iş netleşince fiyatı yazılı olarak söyleriz.
          </p>
          <div className="tv-actions">
            <a className="tv-btn tv-wa" href={wa} rel="noopener">WhatsApp&apos;tan yazın</a>
            <a className="tv-btn tv-call" href={`tel:${PHONE_E164}`}>Ara: {PHONE_DISPLAY}</a>
          </div>
          <p className="tv-hours">Terzi Can her gün 08:00–23:00 arasında açıktır. Yazışma Türkçe, İngilizce, Almanca ve Rusça yapılabilir.</p>
        </div>
        <div className="tv-tape" aria-hidden="true" />
      </header>

      <div className="tv-wrap">
        {/* ── Güven şeridi: yalnızca doğrulanmış bilgiler ── */}
        <ul className="tv-trust" aria-label="Terzi Can bilgileri">
          <li>
            <svg {...ICON} stroke="currentColor"><path d="M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /></svg>
            <div><strong>2006&apos;dan beri</strong><span>26 yıllık deneyim</span></div>
          </li>
          <li>
            <svg {...ICON} stroke="currentColor"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></svg>
            <div><strong>10 dilde hizmet</strong><span>Türkçeden Arapçaya</span></div>
          </li>
          <li>
            <svg {...ICON} stroke="currentColor"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2M9 2h6" /></svg>
            <div><strong>Aynı gün teslim</strong><span>Acil işler 1–2 saatte hazır</span></div>
          </li>
          <li>
            <svg {...ICON} stroke="currentColor"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h3" /></svg>
            <div><strong>Nakit veya kart</strong><span>Tüm para birimleriyle</span></div>
          </li>
          <li>
            <svg {...ICON} stroke="currentColor"><path d="M2 6.5h11V16H2zM13 10h4.2L21 13.5V16h-8z" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
            <div><strong>Ücretsiz alım-teslim</strong><span>Eve ve otele</span></div>
          </li>
          <li>
            <svg {...ICON} stroke="currentColor"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            <div><strong>Her gün açık</strong><span>08:00–23:00, Terzi Can atölyesi</span></div>
          </li>
        </ul>

        {/* ── Üç ayrı bölüm ── */}
        <div className="tv-sec">
          <div className="tv-cards">
            <article className="tv-card" aria-labelledby="kart-terzi">
              <div className="tv-ic"><svg {...ICON}><path d="M8.1 8.1 20 20M8.1 15.9 20 4" /><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /></svg></div>
              <p className="tv-sub">Terzi Can</p>
              <h2 id="kart-terzi">Antalya&apos;da tadilat ve dikim</h2>
              <p className="tv-val">Paça, bel, fermuar, deri ve mont tadilatı; kıyafetiniz evinizden veya otelinizden ücretsiz alınır ve geri getirilir.</p>
              <ul>
                <li>Paça ve bel kısaltma-daraltma <b>{PRICE_FROM.paca} TL&apos;den</b></li>
                <li>Fermuar değişimi <b>{PRICE_FROM.fermuar} TL&apos;den</b></li>
                <li>Deri tadilatı <b>{PRICE_FROM.deri} TL&apos;den</b></li>
              </ul>
              <p className="tv-fine">Fiyatlara KDV dahil değildir. Dikim işlerinde fiyat {PRICE_BY_MODEL.tr} belirlenir.</p>
              <div className="tv-actions">
                <Link className="tv-btn tv-detail" href="/terzi" aria-label="Terzi Can sayfası, detaylar">Detaylar</Link>
                <a className="tv-btn tv-wa" href={wa} rel="noopener">WhatsApp</a>
              </div>
            </article>

            <article className="tv-card ozel" aria-labelledby="kart-ozel">
              <div className="tv-ic"><svg {...ICON}><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" /></svg></div>
              <p className="tv-sub">Dünyaya kargo</p>
              <h2 id="kart-ozel">Siparişe özel dikim</h2>
              <p className="tv-val">Keten, pamuk ve diğer kumaşlardan ölçünüze göre dikilir; Antalya içine ve yurt dışına kargolanır.</p>
              <ul>
                <li>Kadın ve erkek takım, pantolon, gömlek, etek, şort, abiye, takım elbise</li>
                <li>Ölçü ve model fotoğrafını WhatsApp&apos;tan gönderirsiniz; fiyat fotoğrafa veya istenilen modele göre verilir</li>
                <li>Kargo ücreti müşteriye aittir; süre işin durumuna göre değişir</li>
              </ul>
              <div className="tv-actions">
                <Link className="tv-btn tv-detail" href={OZEL_PATH.tr} aria-label="Siparişe özel dikim sayfası, detaylar">Detaylar</Link>
                <a className="tv-btn tv-wa" href={waOzel} rel="noopener">WhatsApp</a>
              </div>
            </article>

            <article className="tv-card guzel" aria-labelledby="kart-guzellik">
              <div className="tv-ic"><svg {...ICON}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></svg></div>
              <p className="tv-sub">Can Beauty Studio</p>
              <h2 id="kart-guzellik">Antalya&apos;da güzellik hizmetleri</h2>
              <p className="tv-val">Saç, tırnak, makyaj, gelin saçı ve makyajı, cilt bakımı, kaş-kirpik bakımı ve ağda için konakladığınız bölgedeki anlaşmalı salonlara yönlendirilirsiniz.</p>
              <ul>
                <li>Hizmet anlaşmalı salonlar aracılığıyla verilir; ev veya otele hizmet verilmez, salona kendiniz gidersiniz</li>
                <li>Hizmet bilgisi, size özel fiyat teklifi ve güncel kampanyalar WhatsApp&apos;tan paylaşılır</li>
              </ul>
              <p className="tv-fine">Her gün 08:00–24:00 · {BEAUTY_PHONE_DISPLAY}</p>
              <div className="tv-actions">
                <Link className="tv-btn tv-detail" href={BEAUTY_PATH} aria-label="Can Beauty Studio sayfası, detaylar">Detaylar</Link>
                <a className="tv-btn tv-wa" href={waBeauty} rel="noopener">WhatsApp</a>
              </div>
            </article>
          </div>
        </div>

        {/* ── Müşteri yorumları (Google'daki gerçek yorumlar) ── */}
        <section className="tv-sec" aria-labelledby="tv-yorum-baslik">
          <h2 id="tv-yorum-baslik">Müşteri yorumları</h2>
          <div className="tv-rev">
            <div className="tv-score">
              <b>{average.replace(".", ",")}</b>
              <div className="tv-stars" role="img" aria-label={`Google'da ${average.replace(".", ",")} üzerinden 5 puan`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z" /></svg>
                ))}
              </div>
              <small>Google&apos;da {count} yorum</small>
            </div>
            {quotes.map((r) => (
              <figure className="tv-q" key={r.author} style={{ margin: 0 }}>
                <blockquote style={{ margin: 0 }}>
                  <p>&ldquo;{r.text}&rdquo;</p>
                </blockquote>
                <figcaption>{r.author} · {tarih(r.date)}</figcaption>
              </figure>
            ))}
          </div>
          <a className="tv-gl" href={GOOGLE_PROFILE_URL} rel="noopener noreferrer" target="_blank">Tüm yorumları Google&apos;da gör</a>
        </section>

        {/* ── Nasıl çalışır ── */}
        <section className="tv-sec" aria-labelledby="tv-nasil-baslik">
          <h2 id="tv-nasil-baslik">Nasıl çalışır?</h2>
          <ol className="tv-steps">
            <li><strong>Fotoğraf veya ölçü gönderin</strong><span>Kıyafetin fotoğrafını ya da özel dikim için ölçü ve modeli WhatsApp&apos;tan yazın.</span></li>
            <li><strong>Fiyat ve zaman netleşir</strong><span>Fiyat ve teslim zamanı yazılı olarak söylenir; süre işin durumuna göre değişir.</span></li>
            <li><strong>Alım-teslim veya kargo</strong><span>Antalya&apos;da kıyafet adresinizden ya da otelin resepsiyonundan alınır, işlem bitince geri getirilir; özel dikim kargolanır.</span></li>
          </ol>
        </section>

        {/* ── Hizmet bölgeleri ── */}
        <section className="tv-sec" aria-labelledby="tv-bolge-baslik">
          <h2 id="tv-bolge-baslik">Alım-teslim bölgeleri</h2>
          <p>Terzi Can, bu bölgelerde evinize ve otelinize alım-teslim yapar; yalnızca yapılan iş ücretlendirilir.</p>
          <ul className="tv-areas">
            {AREA_SERVED.map((a) => (<li key={a}>{a}</li>))}
          </ul>
        </section>

        {/* ── Diğer diller ── */}
        <section className="tv-sec" aria-labelledby="tv-dil-baslik">
          <h2 id="tv-dil-baslik">Diğer dillerde</h2>
          <div className="tv-lang-row">
            <h3>Online terzi hizmeti</h3>
            <ul>
              {ONLINE_ALL.map((l) => (
                <li key={l}><a href={ONLINE_PATH[l]} hrefLang={OZEL_META[l].hreflang} lang={OZEL_META[l].hreflang}>{OZEL_META[l].name}</a></li>
              ))}
            </ul>
          </div>
          <div className="tv-lang-row">
            <h3>Siparişe özel dikim</h3>
            <ul>
              {OZEL_ALL.map((l) => (
                <li key={l}><a href={OZEL_PATH[l]} hrefLang={OZEL_META[l].hreflang} lang={OZEL_META[l].hreflang}>{OZEL_META[l].name}</a></li>
              ))}
            </ul>
          </div>
          <div className="tv-lang-row">
            <h3>Can Beauty Studio</h3>
            <ul>
              {BEAUTY_LANG.map(({ l, slug }) => (
                <li key={l}><a href={`/guzellik/${slug}`} hrefLang={OZEL_META[l].hreflang} lang={OZEL_META[l].hreflang}>{OZEL_META[l].name}</a></li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Terzi hizmet sayfaları ── */}
        <section className="tv-sec" aria-labelledby="tv-hizmet-baslik">
          <h2 id="tv-hizmet-baslik">Terzi hizmet sayfaları</h2>
          <p>
            Fiyat listesi, mahalle sayfaları ve hizmet rehberi için <Link href="/terzi">Terzi Can sayfasına</Link> gidin;
            otel konuğuysanız <Link href="/terzi/eve-gelen-terzi-antalya">eve ve otele gelen terzi</Link> sayfasına bakın.
            Telefon ve WhatsApp: {PHONE_DISPLAY}.
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
        <a className="tv-btn tv-wa" href={wa} rel="noopener">WhatsApp&apos;tan yazın</a>
        <a className="tv-btn tv-call2" href={`tel:${PHONE_E164}`} aria-label={`Ara: ${PHONE_DISPLAY}`}>Ara</a>
      </div>
    </section>
  );
}
