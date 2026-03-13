"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AnaSayfa() {
  const router = useRouter();
  const [secim, setSecim] = useState<"alan"|"veren"|null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Unbounded:wght@700;900&display=swap');
        :root{
          --ink:#080811;--cream:#f7f5f0;--red:#e8361a;
          --gold:#f5a623;--navy:#0d1b3e;--mid:#4a4860;
          --border:#e4e1db;--green:#18a558;--purple:#7c3aed;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:var(--cream);color:var(--ink)}
        a{text-decoration:none;color:inherit}

        .hero{min-height:100vh;background:linear-gradient(135deg,var(--navy) 0%,#1a2d5a 60%,#0a1628 100%);
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          padding:80px 24px;position:relative;overflow:hidden}
        .hero::before{content:'';position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(ellipse 60% 50% at 85% 30%,rgba(232,54,26,.2) 0%,transparent 70%),
                     radial-gradient(ellipse 40% 40% at 10% 80%,rgba(245,166,35,.1) 0%,transparent 60%)}

        .hero-badge{display:inline-flex;align-items:center;gap:8px;position:relative;z-index:1;
          background:rgba(245,166,35,.15);border:1px solid rgba(245,166,35,.3);
          color:var(--gold);border-radius:40px;padding:6px 18px;
          font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:24px}
        .hero-badge::before{content:'●';font-size:.45rem;animation:pulse 1.5s infinite}

        .hero-h1{font-family:'Unbounded',sans-serif;font-size:clamp(2.4rem,5vw,4.2rem);
          font-weight:900;color:#fff;line-height:1.1;letter-spacing:-.03em;
          text-align:center;margin-bottom:14px;position:relative;z-index:1}
        .hero-h1 .r{color:var(--red)} .hero-h1 .g{color:var(--gold)}

        .hero-p{color:rgba(255,255,255,.65);font-size:1rem;line-height:1.8;
          text-align:center;max-width:560px;margin-bottom:56px;position:relative;z-index:1}
        .hero-p strong{color:#fff}

        /* ANA SEÇİM KARTLARI */
        .secim-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;
          max-width:760px;width:100%;position:relative;z-index:1}

        .secim-kart{border-radius:24px;padding:40px 36px;cursor:pointer;
          border:2px solid transparent;transition:all .25s;
          display:flex;flex-direction:column;align-items:flex-start}
        .secim-kart:hover{transform:translateY(-4px)}
        .secim-kart.alan{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.12)}
        .secim-kart.alan:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.25)}
        .secim-kart.veren{background:rgba(232,54,26,.1);border-color:rgba(232,54,26,.25)}
        .secim-kart.veren:hover{background:rgba(232,54,26,.18);border-color:var(--red)}

        .secim-ikon{font-size:2.8rem;margin-bottom:16px}
        .secim-baslik{font-family:'Unbounded',sans-serif;font-weight:900;
          font-size:1.3rem;color:#fff;line-height:1.2;margin-bottom:10px;letter-spacing:-.02em}
        .secim-aciklama{font-size:.85rem;color:rgba(255,255,255,.6);line-height:1.65;margin-bottom:20px}
        .secim-ornekler{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px}
        .secim-ornek{background:rgba(255,255,255,.1);color:rgba(255,255,255,.75);
          font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:20px}
        .secim-btn{display:inline-flex;align-items:center;gap:8px;
          background:#fff;border-radius:40px;padding:12px 24px;
          font-weight:700;font-size:.88rem;transition:transform .2s;border:none;cursor:pointer;font-family:inherit}
        .secim-kart.alan .secim-btn{color:var(--navy)}
        .secim-kart.veren .secim-btn{color:var(--red)}
        .secim-btn:hover{transform:scale(1.03)}

        /* MWRAP */
        .mwrap{background:var(--red);overflow:hidden;padding:12px 0;position:relative;z-index:2}
        .mtrack{display:flex;animation:marquee 22s linear infinite;white-space:nowrap}
        .mitem{display:inline-flex;align-items:center;gap:10px;padding:0 28px;
          color:#fff;font-weight:700;font-size:.76rem;letter-spacing:.07em;text-transform:uppercase}
        .mitem .dot{width:5px;height:5px;border-radius:50%;background:var(--gold);flex-shrink:0}

        /* FOOTER MINI */
        .footer-mini{background:#05050d;padding:28px 24px;text-align:center;
          font-size:.75rem;color:rgba(255,255,255,.25)}
        .footer-mini a{color:rgba(255,255,255,.4);margin:0 10px}

        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        @media(max-width:640px){
          .secim-grid{grid-template-columns:1fr}
          .hero-h1{font-size:2rem}
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">🌐 Hizmet Al · Ver · İlan Havuzu</div>

        <h1 className="hero-h1">
          SwapHubs&apos;a<br />
          <span className="g">Hoş Geldiniz</span>
        </h1>

        <p className="hero-p">
          Bireysel hizmetlerden endüstriyel üretime kadar —<br />
          <strong>Türkiye&apos;nin en kapsamlı hizmet ve ticaret platformu.</strong>
        </p>

        <div className="secim-grid">
          {/* HİZMET ALMAK İSTİYORUM */}
          <div className="secim-kart alan" onClick={() => router.push("/kesfet?rol=alan")}>
            <div className="secim-ikon">🙋</div>
            <div className="secim-baslik">Hizmet Almak<br />İstiyorum</div>
            <div className="secim-aciklama">
              Bireysel hizmet veya ticari ürün arayın. İlan verin, teklifler önünüze gelsin.
            </div>
            <div className="secim-ornekler">
              <span className="secim-ornek">🏨 Otel / Tatil</span>
              <span className="secim-ornek">🔧 Tamir</span>
              <span className="secim-ornek">🚗 Araç Kiralama</span>
              <span className="secim-ornek">📦 Toptan Alım</span>
              <span className="secim-ornek">🏭 Sanayi Ürünü</span>
            </div>
            <button className="secim-btn">Hizmet Ara →</button>
          </div>

          {/* HİZMET VERMEK İSTİYORUM */}
          <div className="secim-kart veren" onClick={() => router.push("/kesfet?rol=veren")}>
            <div className="secim-ikon">⚡</div>
            <div className="secim-baslik">Hizmet Vermek<br />İstiyorum</div>
            <div className="secim-aciklama">
              Bireysel usta veya üretici firma olarak ilan verin, taleplere teklif gönderin.
            </div>
            <div className="secim-ornekler">
              <span className="secim-ornek">🧹 Temizlikçi</span>
              <span className="secim-ornek">👷 Usta</span>
              <span className="secim-ornek">🏨 Otelci</span>
              <span className="secim-ornek">👕 Tekstil</span>
              <span className="secim-ornek">🪨 Mermer</span>
            </div>
            <button className="secim-btn">İlan Ver / Teklif Ver →</button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="mwrap">
        <div className="mtrack">
          {[
            "🙋 Hizmet Al","⚡ Hizmet Ver","🏨 Otel & Tatil","🔧 Tamir & Bakım",
            "🚗 Araç Kiralama","📦 Toptan Alım","🏭 Endüstriyel Üretim",
            "🚢 İhracat","🇹🇷 Türkiye Üretimi","💬 İhale Usulü",
            "🙋 Hizmet Al","⚡ Hizmet Ver","🏨 Otel & Tatil","🔧 Tamir & Bakım",
            "🚗 Araç Kiralama","📦 Toptan Alım","🏭 Endüstriyel Üretim",
            "🚢 İhracat","🇹🇷 Türkiye Üretimi","💬 İhale Usulü",
          ].map((item, i) => (
            <div key={i} className="mitem">
              <span className="dot"/>{item}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-mini">
        <a href="/hakkimizda">Hakkımızda</a>
        <a href="/iletisim">İletişim</a>
        <a href="/gizlilik">Gizlilik</a>
        <span>© 2026 SwapHubs</span>
      </div>
    </>
  );
}
