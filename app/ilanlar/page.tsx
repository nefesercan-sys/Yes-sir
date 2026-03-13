"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

interface Ilan {
  _id: string;
  baslik: string;
  aciklama: string;
  kategori: string;
  kategoriSlug: string;
  tip: "bireysel" | "ticari";
  rol: "alan" | "veren";
  yapay?: boolean;
  sehir: string;
  ulke?: string;
  butceMin: number;
  butceMax: number;
  resimUrl?: string;
  teklifSayisi: number;
  ozellikler?: string[];
  createdAt: string;
}

const fmt = (n: number) => new Intl.NumberFormat("tr-TR").format(n);

function IlanlarIcerik() {
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const rol           = searchParams.get("rol") ?? "alan";
  const tip           = searchParams.get("tip") ?? "bireysel";
  const kategori      = searchParams.get("kategori") ?? "";
  const [ilanlar, setIlanlar]     = useState<Ilan[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aramaQ,  setAramaQ]      = useState("");

  useEffect(() => {
    setYukleniyor(true);
    const p = new URLSearchParams({ tip, rol });
    if (kategori) p.set("kategori", kategori);
    fetch(`/api/ilanlar?${p}`)
      .then(r => r.json())
      .then(d => setIlanlar(d.ilanlar ?? []))
      .catch(() => {})
      .finally(() => setYukleniyor(false));
  }, [tip, rol, kategori]);

  const filtreliIlanlar = aramaQ
    ? ilanlar.filter(il =>
        il.baslik.toLowerCase().includes(aramaQ.toLowerCase()) ||
        (il.sehir && il.sehir.toLowerCase().includes(aramaQ.toLowerCase())))
    : ilanlar;

  const ilanVer = () => {
    router.push(`/ilan-ver?rol=${rol}&tip=${tip}&kategori=${kategori}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Unbounded:wght@700;900&display=swap');
        :root{--ink:#080811;--cream:#f7f5f0;--red:#e8361a;--gold:#f5a623;
          --navy:#0d1b3e;--mid:#4a4860;--border:#e4e1db;--green:#18a558;--purple:#7c3aed}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:var(--cream);color:var(--ink)}

        .topbar{background:var(--navy);padding:14px 24px;
          display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .topbar-logo{font-family:'Unbounded',sans-serif;font-weight:900;color:#fff;
          font-size:1rem;display:flex;align-items:center;gap:8px}
        .topbar-logo .icon{background:var(--red);width:26px;height:26px;border-radius:6px;
          display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#fff;font-weight:900}
        .topbar-logo span{color:var(--red)}
        .topbar-back{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);
          color:#fff;padding:6px 14px;border-radius:40px;font-size:.75rem;
          font-weight:600;cursor:pointer;font-family:inherit}

        .hero-bar{background:linear-gradient(135deg,var(--navy),#1a2d5a);
          padding:36px 24px 28px;text-align:center}
        .breadcrumb{display:flex;align-items:center;justify-content:center;gap:6px;
          margin-bottom:14px;flex-wrap:wrap}
        .bc-item{font-size:.72rem;color:rgba(255,255,255,.45);font-weight:600}
        .bc-sep{font-size:.65rem;color:rgba(255,255,255,.25)}
        .bc-aktif{color:var(--gold)}
        .hero-bar h1{font-family:'Unbounded',sans-serif;font-weight:900;color:#fff;
          font-size:clamp(1.4rem,2.5vw,2.2rem);letter-spacing:-.03em;line-height:1.2;margin-bottom:8px}
        .hero-bar h1 span{color:var(--gold)}
        .hero-bar p{color:rgba(255,255,255,.6);font-size:.85rem}

        .toolbar{max-width:1100px;margin:0 auto;padding:20px 24px;
          display:flex;gap:12px;align-items:center;flex-wrap:wrap}
        .arama-inp{flex:1;min-width:200px;border:1.5px solid var(--border);border-radius:40px;
          padding:11px 18px;font-size:.88rem;font-family:inherit;outline:none;
          color:var(--ink);background:#fff}
        .arama-inp:focus{border-color:var(--red)}
        .btn-ilan-ver{background:var(--red);color:#fff;border:none;
          padding:11px 22px;border-radius:40px;font-weight:700;font-size:.85rem;
          cursor:pointer;font-family:inherit;white-space:nowrap;transition:background .2s}
        .btn-ilan-ver:hover{background:#c42d14}
        .ilan-sayisi{font-size:.8rem;color:var(--mid);white-space:nowrap}

        .ilanlar-wrap{max-width:1100px;margin:0 auto;padding:0 24px 64px}
        .ilanlar-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}

        /* İLAN KARTI */
        .ilan-kart{background:#fff;border-radius:16px;border:1.5px solid var(--border);
          overflow:hidden;transition:transform .2s,box-shadow .2s;display:flex;flex-direction:column}
        .ilan-kart:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,.1)}

        .ilan-resim{width:100%;height:180px;object-fit:cover;background:#e8e6e0;
          display:flex;align-items:center;justify-content:center;font-size:3rem;
          position:relative;flex-shrink:0}
        .ilan-resim img{width:100%;height:100%;object-fit:cover}
        .ilan-tip-badge{position:absolute;top:10px;left:10px;font-size:.65rem;
          font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:.04em}
        .badge-alan{background:rgba(13,27,62,.85);color:#fff}
        .badge-veren{background:rgba(232,54,26,.9);color:#fff}
        .badge-yapay{position:absolute;top:10px;right:10px;background:rgba(0,105,161,.85);
          color:#fff;font-size:.62rem;font-weight:700;padding:2px 8px;border-radius:20px}
        .badge-tr{position:absolute;bottom:10px;left:10px;background:rgba(232,54,26,.9);
          color:#fff;font-size:.62rem;font-weight:700;padding:2px 8px;border-radius:20px}

        .ilan-body{padding:16px 18px;flex:1;display:flex;flex-direction:column}
        .ilan-kat{display:inline-flex;align-items:center;gap:5px;font-size:.68rem;
          font-weight:700;letter-spacing:.06em;text-transform:uppercase;
          color:var(--red);background:rgba(232,54,26,.08);
          padding:2px 9px;border-radius:20px;margin-bottom:8px;width:fit-content}
        .ilan-baslik{font-weight:700;font-size:.95rem;line-height:1.4;margin-bottom:8px;flex:1}
        .ilan-meta{display:flex;gap:10px;font-size:.73rem;color:var(--mid);
          margin-bottom:12px;flex-wrap:wrap}
        .ilan-footer{display:flex;align-items:center;justify-content:space-between;
          padding-top:12px;border-top:1px solid var(--border)}
        .ilan-butce{font-family:'Unbounded',sans-serif;font-weight:700;font-size:.85rem}
        .ilan-btn-teklif{background:var(--red);color:#fff;border:none;
          padding:8px 16px;border-radius:40px;font-size:.76rem;font-weight:700;
          cursor:pointer;font-family:inherit;transition:background .2s}
        .ilan-btn-teklif:hover{background:#c42d14}
        .ilan-btn-talep{background:var(--navy);color:#fff;border:none;
          padding:8px 16px;border-radius:40px;font-size:.76rem;font-weight:700;
          cursor:pointer;font-family:inherit;transition:background .2s}
        .ilan-btn-talep:hover{background:#1a2d5a}
        .teklif-badge{background:rgba(24,165,88,.1);color:var(--green);
          font-size:.7rem;font-weight:700;padding:4px 10px;border-radius:20px}

        .empty{text-align:center;padding:64px 24px;color:var(--mid)}
        .empty-ikon{font-size:3rem;margin-bottom:14px}
        .empty h3{font-family:'Unbounded',sans-serif;font-size:1.1rem;
          margin-bottom:8px;color:var(--ink)}

        @media(max-width:600px){.ilanlar-grid{grid-template-columns:1fr}}
      `}</style>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="topbar-logo">
          <div className="icon">S</div>
          Swap<span>Hubs</span>
        </div>
        <button className="topbar-back"
          onClick={() => router.push(`/kesfet?rol=${rol}&tip=${tip}`)}>
          ← Kategoriler
        </button>
      </div>

      {/* HERO */}
      <div className="hero-bar">
        <div className="breadcrumb">
          <span className="bc-item">{rol === "alan" ? "🙋 Hizmet Al" : "⚡ Hizmet Ver"}</span>
          <span className="bc-sep">›</span>
          <span className="bc-item">{tip === "bireysel" ? "Bireysel" : "Ticari"}</span>
          {kategori && <><span className="bc-sep">›</span>
            <span className="bc-item bc-aktif">{kategori}</span></>}
        </div>
        <h1>
          {tip === "ticari" && "🏭 "}<span>{kategori || "Tüm İlanlar"}</span>
        </h1>
        <p>
          {rol === "alan"
            ? "İlanları inceleyin, teklif isteyin veya kendi ilanınızı verin"
            : "Talepleri inceleyin, teklif verin veya kendi ilanınızı yayınlayın"}
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        <input className="arama-inp" placeholder="🔍 Arama..."
          value={aramaQ} onChange={e => setAramaQ(e.target.value)} />
        <span className="ilan-sayisi">{filtreliIlanlar.length} ilan</span>
        <button className="btn-ilan-ver" onClick={ilanVer}>
          {rol === "alan"
            ? "➕ İlan Ver — Teklif Bekle"
            : tip === "ticari" ? "🏭 Üretim İlanı Ver" : "⚡ Hizmet İlanı Ver"}
        </button>
      </div>

      {/* İLANLAR */}
      <div className="ilanlar-wrap">
        {yukleniyor ? (
          <div className="empty"><div className="empty-ikon">⏳</div><p>Yükleniyor...</p></div>
        ) : filtreliIlanlar.length === 0 ? (
          <div className="empty">
            <div className="empty-ikon">📭</div>
            <h3>İlan bulunamadı</h3>
            <p style={{marginBottom:20}}>Bu kategoride henüz ilan yok.</p>
            <button className="btn-ilan-ver" onClick={ilanVer}>İlk İlanı Sen Ver</button>
          </div>
        ) : (
          <div className="ilanlar-grid">
            {filtreliIlanlar.map(ilan => (
              <IlanKart key={ilan._id} ilan={ilan} rol={rol} tip={tip} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function IlanKart({ ilan, rol, tip }: { ilan: Ilan; rol: string; tip: string }) {
  const router = useRouter();

  const teklifTikla = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/ilan/${ilan._id}?action=teklif`);
  };
  const talepTikla = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/ilan/${ilan._id}?action=talep`);
  };

  return (
    <div className="ilan-kart">
      <div className="ilan-resim">
        {ilan.resimUrl
          ? <img src={ilan.resimUrl} alt={ilan.baslik} />
          : <span>
              {tip === "ticari" ? "🏭" :
               ilan.kategoriSlug === "otel-tatil" ? "🏨" :
               ilan.kategoriSlug === "arac-kiralama" ? "🚗" : "📋"}
            </span>
        }
        <span className={`ilan-tip-badge ${ilan.rol === "alan" ? "badge-alan" : "badge-veren"}`}>
          {ilan.rol === "alan" ? "🙋 Talep" : "⚡ Hizmet"}
        </span>
        {ilan.yapay && <span className="badge-yapay">ÖRNEK</span>}
        {tip === "ticari" && <span className="badge-tr">🇹🇷 TR Üretimi</span>}
      </div>

      <div className="ilan-body">
        <div className="ilan-kat">{ilan.kategori}</div>
        <div className="ilan-baslik">{ilan.baslik}</div>
        <div className="ilan-meta">
          <span>📍 {ilan.ulke && ilan.ulke !== "Türkiye" ? `${ilan.ulke} / ` : ""}{ilan.sehir}</span>
          <span>📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</span>
        </div>
        <div className="ilan-footer">
          <div className="ilan-butce">
            ₺{fmt(ilan.butceMin)}–{fmt(ilan.butceMax)}
          </div>
          {ilan.teklifSayisi > 0
            ? <span className="teklif-badge">✓ {ilan.teklifSayisi} teklif</span>
            : rol === "veren"
              ? <button className="ilan-btn-teklif" onClick={teklifTikla}>Teklif Ver →</button>
              : <button className="ilan-btn-talep" onClick={talepTikla}>Teklif İste →</button>
          }
        </div>
      </div>
    </div>
  );
}

export default function IlanlarSayfa() {
  return <Suspense><IlanlarIcerik /></Suspense>;
}
