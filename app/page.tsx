"use client";
// ============================================================
// SwapHubs — app/page.tsx (TAM VE GÜNCELLENMİŞ VERSİYON)
// ============================================================
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image"; 
import { TICARI_SEKTORLER, BIREYSEL_SEKTORLER } from "@/lib/sektorler";

export const dynamic = 'force-dynamic';

interface Ilan {
  _id: string;
  baslik: string;
  kategori?: string;
  sektorId?: string;
  tip: "bireysel" | "ticari";
  rol: "alan" | "veren";
  sehir?: string;
  ulke?: string;
  butceMin?: number;
  butceMax?: number;
  butceBirimi?: string;
  resimUrl?: string;
  medyalar?: string[];
  createdAt: string;
  goruntulenme?: number;
  teklifSayisi?: number;
  yapay?: boolean;
}

const STATS = [
  { v: "12,400+", l: "Aktif İlan" },
  { v: "3,200+", l: "Üye Firma" },
  { v: "89", l: "Ülkede Erişim" },
  { v: "₺0", l: "İlan Ücreti" },
];

export default function AnaSayfa() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aramaQ, setAramaQ] = useState("");
  const [aktifTip, setAktifTip] = useState<"bireysel" | "ticari">("ticari");
  const [aktifRol, setAktifRol] = useState<"alan" | "veren">("alan");
  const [aktifKat, setAktifKat] = useState("Tümü");
  const [destekAcik, setDestekAcik] = useState(false);
  const [destekMesaj, setDestekMesaj] = useState("");
  const [destekGonderildi, setDestekGonderildi] = useState(false);
  const [sayfa, setSayfa] = useState(1);
  const SAYFA_BOYUTU = 12;

  const vitrinRef = useRef<HTMLDivElement>(null);

  const fetchIlanlar = useCallback(async () => {
    setYukleniyor(true);
    try {
      const res = await fetch(`/api/ilanlar?limit=100`);
      const data = await res.json();
      setIlanlar(data.ilanlar || data.data || data || []);
    } catch {
      setIlanlar([]);
    }
    setYukleniyor(false);
  }, []);

  useEffect(() => {
    fetchIlanlar();
  }, [fetchIlanlar]);

  useEffect(() => { setSayfa(1); }, [aktifTip, aktifRol, aktifKat, aramaQ]);

  const kategoriler = useMemo(() => {
    const anaKategoriListesi = aktifTip === "ticari" ? TICARI_SEKTORLER : BIREYSEL_SEKTORLER;
    const tumKategori = { id: 'Tümü', ad: 'Tüm Sektörler', icon: '🌐', tip: 'both', renk: '#0f172a', altKategoriler: [], butceBirimi: 'TL', hizmetAlanFormu: [], hizmetVerenFormu: [] } as any;
    return [tumKategori, ...anaKategoriListesi];
  }, [aktifTip]);

  const filtreliIlanlar = useMemo(() => {
    return ilanlar.filter(i => {
      if (i.tip !== aktifTip) return false;
      if (i.rol !== aktifRol) return false;
      if (aktifKat !== "Tümü" && i.sektorId !== aktifKat) return false;
      if (aramaQ) {
        const q = aramaQ.toLowerCase();
        return (
          i.baslik?.toLowerCase().includes(q) ||
          i.sehir?.toLowerCase().includes(q) ||
          i.ulke?.toLowerCase().includes(q) ||
          i.kategori?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [ilanlar, aktifTip, aktifRol, aktifKat, aramaQ]);

  const sayfaIlanlar = useMemo(() => {
    const start = (sayfa - 1) * SAYFA_BOYUTU;
    return filtreliIlanlar.slice(start, start + SAYFA_BOYUTU);
  }, [filtreliIlanlar, sayfa]);

  const toplamSayfa = Math.ceil(filtreliIlanlar.length / SAYFA_BOYUTU);
  const fmt = (n: number) => new Intl.NumberFormat("tr-TR").format(n || 0);
  const gorsel = (i: Ilan) => i.resimUrl || i.medyalar?.[0] || null;

  const handleDestekGonder = async () => {
    if (!destekMesaj.trim()) return;
    try {
      await fetch("/api/destek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mesaj: destekMesaj, email: session?.user?.email }),
      });
    } catch {}
    setDestekGonderildi(true);
    setTimeout(() => { setDestekAcik(false); setDestekGonderildi(false); setDestekMesaj(""); }, 3000);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SwapHubs",
            "url": "https://swaphubs.com",
            "description": "Küresel Hizmet & Ürün Takas Merkezi",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://swaphubs.com/ilanlar?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Unbounded:wght@700;800;900&display=swap');

        :root {
          --navy: #0d1b3e; --navy2: #1e3a8a; --red: #e8361a; --red2: #c42d15;
          --gold: #f5a623; --gold2: #d97706; --green: #10b981; --blue: #2563eb;
          --ink: #0f172a; --mid: #475569; --muted: #94a3b8; --border: #e2e8f0;
          --cream: #f8fafc; --white: #ffffff; --radius: 16px;
          --shadow: 0 4px 24px rgba(0,0,0,.08); --shadow-hover: 0 12px 32px rgba(0,0,0,.14);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--cream); color: var(--ink); -webkit-font-smoothing: antialiased; }

        .nav { background: var(--navy); padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 200; box-shadow: 0 2px 20px rgba(0,0,0,.2); }
        .nav-logo { font-family: 'Unbounded', sans-serif; font-weight: 900; font-size: 1.15rem; color: #fff; display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none; }
        .nav-logo-icon { background: var(--red); width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 3px rgba(232,54,26,.3); }
        .nav-logo span { color: var(--gold); }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .nav-btn { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15); color: #fff; padding: 8px 18px; border-radius: 40px; font-size: .8rem; font-weight: 700; cursor: pointer; transition: .2s; font-family: inherit; }
        .nav-btn.primary { background: var(--red); border-color: var(--red); }

        .hero { background: linear-gradient(160deg, var(--navy) 0%, var(--navy2) 60%, #1e40af 100%); padding: 70px 24px 110px; text-align: center; position: relative; overflow: hidden; }
        .hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: var(--cream); border-radius: 60px 60px 0 0; }
        .hero h1 { font-family: 'Unbounded', sans-serif; color: #fff; font-size: clamp(1.6rem, 4vw, 2.8rem); font-weight: 900; line-height: 1.2; margin-bottom: 14px; position: relative; z-index: 1; }
        .hero h1 em { color: var(--gold); font-style: normal; }
        .hero-sub { color: rgba(255,255,255,.75); font-size: clamp(.9rem, 2vw, 1.1rem); max-width: 680px; margin: 0 auto 36px; line-height: 1.7; position: relative; z-index: 1; }

        .kontrol { max-width: 820px; margin: 0 auto; background: rgba(255,255,255,.1); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,.2); border-radius: 24px; padding: 24px; box-shadow: 0 24px 48px rgba(0,0,0,.25); position: relative; z-index: 2; }
        .toggle-row { display: flex; background: rgba(0,0,0,.25); border-radius: 12px; padding: 5px; margin-bottom: 16px; gap: 4px; }
        .toggle-btn { flex: 1; padding: 11px 8px; border-radius: 8px; border: none; font-family: 'Unbounded', sans-serif; font-size: clamp(.65rem, 1.5vw, .82rem); font-weight: 700; color: rgba(255,255,255,.5); background: transparent; cursor: pointer; transition: .25s; }
        .toggle-btn.on-ticari { background: var(--gold); color: var(--navy); }
        .toggle-btn.on-bireysel { background: var(--blue); color: #fff; }

        .rol-row { display: flex; gap: 10px; margin-bottom: 16px; }
        .rol-btn { flex: 1; padding: 14px 10px; border-radius: 12px; border: 2px solid transparent; font-weight: 700; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; font-family: inherit; }
        .rol-btn:not(.on) { background: rgba(255,255,255,.06); color: #fff; border-color: rgba(255,255,255,.1); }
        .rol-btn.on-alan { background: #fff; color: var(--navy); border-color: var(--blue); }
        .rol-btn.on-veren { background: var(--red); color: #fff; border-color: #ff6b52; }

        .arama-box { display: flex; background: #fff; padding: 5px; border-radius: 12px; gap: 6px; }
        .arama-box input { flex: 1; border: none; font-family: inherit; font-size: .95rem; font-weight: 600; outline: none; padding-left: 10px; }
        .arama-btn { background: var(--navy); color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; }

        .stats-bar { max-width: 1200px; margin: 32px auto 0; padding: 0 24px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .stat-item { background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 16px; text-align: center; box-shadow: var(--shadow); }
        .stat-v { font-family: 'Unbounded', sans-serif; font-size: 1.4rem; font-weight: 900; color: var(--navy); }

        .kat-wrap { max-width: 1200px; margin: 28px auto 0; padding: 0 24px; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .kat-chip { background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 10px 18px; display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 700; color: var(--mid); font-size: .82rem; }
        .kat-chip.on { background: var(--navy); color: #fff; border-color: var(--navy); }

        .vitrin-wrap { max-width: 1200px; margin: 28px auto 0; padding: 0 24px 80px; }
        .vitrin-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid var(--border); flex-wrap: wrap; gap: 12px; }
        .vitrin-title { font-family: 'Unbounded', sans-serif; font-size: clamp(1.1rem, 2.5vw, 1.5rem); font-weight: 800; color: var(--navy); }

        .ilan-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 18px; }
        .kart { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); overflow: hidden; transition: .22s; display: flex; flex-direction: column; cursor: pointer; }
        .kart:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); border-color: var(--blue); }
        .kart-img { width: 100%; height: 185px; position: relative; background: #f1f5f9; display: flex; align-items: center; justify-content: center; }
        .kart-badges { position: absolute; top: 10px; left: 10px; display: flex; flex-direction: column; gap: 5px; z-index: 2; }
        .badge { font-size: .62rem; font-weight: 800; padding: 3px 9px; border-radius: 7px; text-transform: uppercase; }
        .b-ticari { background: var(--gold); color: var(--navy); }
        .b-bireysel { background: var(--blue); color: #fff; }

        .kart-body { padding: 15px; flex: 1; display: flex; flex-direction: column; }
        .kart-kat { font-size: .68rem; font-weight: 800; color: var(--blue); margin-bottom: 5px; text-transform: uppercase; }
        .kart-baslik { font-weight: 800; font-size: 1rem; line-height: 1.35; margin-bottom: 10px; color: var(--ink); }
        .kart-foot { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--border); margin-top: auto; }
        .kart-butce { font-family: 'Unbounded', sans-serif; font-weight: 800; font-size: .95rem; color: var(--green); }
        
        .destek-fab { position: fixed; bottom: 28px; right: 28px; z-index: 500; width: 56px; height: 56px; border-radius: 50%; background: var(--green); color: #fff; font-size: 1.5rem; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 24px rgba(16,185,129,.45); }
        .destek-panel { position: fixed; bottom: 96px; right: 28px; z-index: 500; width: 320px; background: #fff; border-radius: 20px; border: 1.5px solid var(--border); box-shadow: 0 16px 48px rgba(0,0,0,.15); overflow: hidden; }

        .skeleton { background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 12px; }
        @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }

        @media (max-width: 640px) {
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
          .rol-row { flex-direction: column; }
          .ilan-grid { grid-template-columns: 1fr; }
        }
      `}} />

      {/* NAVBAR */}
      <nav className="nav">
        <a className="nav-logo" onClick={() => router.push("/")}>
          <div className="nav-logo-icon">S</div>
          Swap<span>Hubs</span>
        </a>
        <div className="nav-right">
          <button className="nav-btn" onClick={() => router.push("/ilanlar")}>🔍 Keşfet</button>
          {status === "authenticated" ? (
            <button className="nav-btn primary" onClick={() => router.push("/panel")}>👤 Panelim</button>
          ) : (
            <button className="nav-btn primary" onClick={() => router.push("/giris")}>Giriş Yap</button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <h1>Türkiye'den <em>Dünyaya,</em><br />Dünyadan <em>Türkiye'ye</em></h1>
        <p className="hero-sub">Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturuyoruz.</p>

        <div className="kontrol">
          <div className="toggle-row">
            <button className={`toggle-btn ${aktifTip === "bireysel" ? "on-bireysel" : ""}`} onClick={() => setAktifTip("bireysel")}>👤 BİREYSEL</button>
            <button className={`toggle-btn ${aktifTip === "ticari" ? "on-ticari" : ""}`} onClick={() => setAktifTip("ticari")}>🏭 TİCARİ & ENDÜSTRİYEL</button>
          </div>

          <div className="rol-row">
            <button className={`rol-btn ${aktifRol === "alan" ? "on-alan" : ""}`} onClick={() => setAktifRol("alan")}>
              🛒 {aktifTip === "ticari" ? "Tedarikçi Arıyorum" : "Hizmet Almak İstiyorum"}
              <small style={{display:'block', fontSize:10, opacity:0.7}}>İlan verin, teklifler gelsin</small>
            </button>
            <button className={`rol-btn ${aktifRol === "veren" ? "on-veren" : ""}`} onClick={() => setAktifRol("veren")}>
              💼 {aktifTip === "ticari" ? "Kapasite Sunuyorum" : "Hizmet Vermek İstiyorum"}
              <small style={{display:'block', fontSize:10, opacity:0.7}}>Hizmetinizi sergileyin</small>
            </button>
          </div>

          <div className="arama-box">
            <input 
              placeholder="Hizmet, ürün veya şehir ara..." 
              value={aramaQ} 
              onChange={e => setAramaQ(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && router.push(`/ilanlar?q=${aramaQ}`)}
            />
            <button className="arama-btn" onClick={() => router.push(`/ilanlar?q=${aramaQ}`)}>Ara & Listele</button>
          </div>
        </div>
      </header>

      {/* STATS */}
      <div className="stats-bar">
        {STATS.map(s => (
          <div key={s.l} className="stat-item">
            <div className="stat-v">{s.v}</div>
            <div style={{fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase'}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* KATEGORİLER */}
      <div className="kat-wrap">
        {kategoriler.map((k: any) => (
          <div key={k.id} className={`kat-chip ${aktifKat === k.id ? "on" : ""}`} onClick={() => setAktifKat(k.id)}>
            <span>{k.icon}</span> {k.ad}
          </div>
        ))}
      </div>

      {/* VİTRİN */}
      <main className="vitrin-wrap">
        <div className="vitrin-head">
          <div>
            <h2 className="vitrin-title">{aktifTip === "ticari" ? "🏭 Ticari Vitrin" : "👤 Bireysel Vitrin"}</h2>
            <p style={{fontSize:14, color:'var(--mid)', fontWeight:600}}>{filtreliIlanlar.length} aktif ilan listeleniyor</p>
          </div>
          <button className="nav-btn primary" style={{borderRadius:12}} onClick={() => router.push("/ilan-ver")}>➕ İlan Oluştur</button>
        </div>

        <div className="ilan-grid">
          {yukleniyor ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 300 }} />
            ))
          ) : (
            sayfaIlanlar.map((ilan, idx) => (
              <div key={ilan._id} className="kart" onClick={() => router.push(`/ilan/${ilan._id}`)}>
                <div className="kart-img">
                  {gorsel(ilan) ? (
                    <Image 
                      src={gorsel(ilan)!} 
                      alt={ilan.baslik} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{objectFit: 'cover'}}
                      priority={idx < 2}
                    />
                  ) : (
                    <div style={{fontSize:40}}>📦</div>
                  )}
                  <div className="kart-badges">
                    <span className={`badge ${ilan.tip === "ticari" ? "b-ticari" : "b-bireysel"}`}>{ilan.tip}</span>
                  </div>
                </div>
                <div className="kart-body">
                  <div className="kart-kat">{ilan.sektorId || "GENEL"}</div>
                  <div className="kart-baslik">{ilan.baslik}</div>
                  <div style={{fontSize:12, color:'var(--muted)', marginBottom:10}}>📍 {ilan.sehir || "Global"} · 📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</div>
                  <div className="kart-foot">
                    <div className="kart-butce">{(ilan.butceMin || 0) > 0 ? `${fmt(ilan.butceMin!)} ${ilan.butceBirimi}` : "Teklif Al"}</div>
                    <button className="nav-btn" style={{background:'var(--navy)', padding:'6px 12px'}}>İncele</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {toplamSayfa > 1 && (
          <div style={{display:'flex', justifyContent:'center', gap:10, marginTop:40}}>
            {Array.from({ length: toplamSayfa }).map((_, i) => (
              <button 
                key={i} 
                className={`nav-btn ${sayfa === i + 1 ? "primary" : ""}`} 
                style={{minWidth:40, color: sayfa === i+1 ? '#fff' : 'var(--navy)'}}
                onClick={() => setSayfa(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>

      {/* DESTEK FAB */}
      <button className="destek-fab" onClick={() => setDestekAcik(!destekAcik)}>{destekAcik ? "✕" : "💬"}</button>
      {destekAcik && (
        <div className="destek-panel">
          <div style={{background:'var(--navy)', padding:15, color:'#fff', fontWeight:700, display:'flex', justifyContent:'space-between'}}>
            <span>💬 Canlı Destek</span>
            <span style={{cursor:'pointer'}} onClick={() => setDestekAcik(false)}>✕</span>
          </div>
          <div style={{padding:15}}>
            <textarea 
              className="destek-ta" 
              style={{width:'100%', height:100, padding:10, borderRadius:12, border:'1px solid var(--border)', outline:'none'}} 
              placeholder="Sorunuzu buraya yazın..." 
              value={destekMesaj} 
              onChange={e => setDestekMesaj(e.target.value)} 
            />
            <button 
              onClick={handleDestekGonder} 
              style={{width:'100%', background:'var(--navy)', color:'#fff', border:'none', padding:12, borderRadius:12, marginTop:10, cursor:'pointer', fontWeight:700}}
            >
              {destekGonderildi ? "Mesaj İletildi! ✓" : "Gönder"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
