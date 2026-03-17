"use client";
// ============================================================
// SwapHubs — app/page.tsx
// Global Ana Sayfa — Dönen vitrin, kategori, arama, destek
// ============================================================
export const dynamic = 'force-dynamic';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { TICARI_SEKTORLER, BIREYSEL_SEKTORLER } from "@/lib/sektorler"
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
  const { data: session, status } = useSession() || {};
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

  // Kategori değişince sayfayı sıfırla
  useEffect(() => { setSayfa(1); }, [aktifTip, aktifRol, aktifKat, aramaQ]);

  // --- DÜZELTME 1: Tip zorlaması kaldırıldı, güvenli obje oluşturuldu ---
  const kategoriler = useMemo(() => {
    const anaKategoriListesi = aktifTip === "ticari" ? TICARI_SEKTORLER : BIREYSEL_SEKTORLER;
    const tumKategori = { id: 'Tümü', ad: 'Tüm Sektörler', icon: '🌐', tip: 'both', renk: '#0f172a', altKategoriler: [], butceBirimi: 'TL', hizmetAlanFormu: [], hizmetVerenFormu: [] } as any;
    return [tumKategori, ...anaKategoriListesi];
  }, [aktifTip]);

  const filtreliIlanlar = useMemo(() => {
    return ilanlar.filter(i => {
      if (i.tip !== aktifTip) return false;
      if (i.rol !== aktifRol) return false;
      
      if (aktifKat !== "Tümü") {
        if (i.sektorId !== aktifKat) return false;
      }

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
      {/* 🤖 SİBER TURBO: Google Zengin Sonuçlar (Rich Snippets) Şeması EKLENDİ */}
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

        :root {
          --navy: #0d1b3e;
          --navy2: #1e3a8a;
          --red: #e8361a;
          --red2: #c42d15;
          --gold: #f5a623;
          --gold2: #d97706;
          --green: #10b981;
          --blue: #2563eb;
          --ink: #0f172a;
          --mid: #475569;
          --muted: #94a3b8;
          --border: #e2e8f0;
          --cream: #f8fafc;
          --white: #ffffff;
          --radius: 16px;
          --shadow: 0 4px 24px rgba(0,0,0,.08);
          --shadow-hover: 0 12px 32px rgba(0,0,0,.14);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--cream); color: var(--ink); -webkit-font-smoothing: antialiased; }

        .nav {
          background: var(--navy);
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 200;
          box-shadow: 0 2px 20px rgba(0,0,0,.2);
        }
        .nav-logo {
          font-family: 'Unbounded', sans-serif;
          font-weight: 900;
          font-size: 1.15rem;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
        .nav-logo-icon {
          background: var(--red);
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: .95rem;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(232,54,26,.3);
        }
        .nav-logo span { color: var(--gold); }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .nav-btn {
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.15);
          color: #fff;
          padding: 8px 18px;
          border-radius: 40px;
          font-size: .8rem;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
          font-family: inherit;
          white-space: nowrap;
        }
        .nav-btn:hover { background: rgba(255,255,255,.2); }
        .nav-btn.primary { background: var(--red); border-color: var(--red); }
        .nav-btn.primary:hover { background: var(--red2); }
        .nav-badge { background: var(--gold); color: var(--navy); padding: 2px 8px; border-radius: 99px; font-size: .7rem; font-weight: 800; }

        .hero {
          background: linear-gradient(160deg, var(--navy) 0%, var(--navy2) 60%, #1e40af 100%);
          padding: 70px 24px 110px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(245,166,35,.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(37,99,235,.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 60px;
          background: var(--cream);
          border-radius: 60px 60px 0 0;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(245,166,35,.15);
          border: 1px solid rgba(245,166,35,.3);
          color: var(--gold);
          padding: 6px 16px;
          border-radius: 99px;
          font-size: .78rem;
          font-weight: 700;
          margin-bottom: 20px;
          letter-spacing: .05em;
        }
        .hero h1 {
          font-family: 'Unbounded', sans-serif;
          color: #fff;
          font-size: clamp(1.6rem, 4vw, 2.8rem);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }
        .hero h1 em { color: var(--gold); font-style: normal; }
        .hero-sub {
          color: rgba(255,255,255,.75);
          font-size: clamp(.9rem, 2vw, 1.1rem);
          max-width: 680px;
          margin: 0 auto 36px;
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }

        .kontrol {
          max-width: 820px;
          margin: 0 auto;
          background: rgba(255,255,255,.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 24px 48px rgba(0,0,0,.25);
          position: relative;
          z-index: 2;
        }
        .toggle-row {
          display: flex;
          background: rgba(0,0,0,.25);
          border-radius: 12px;
          padding: 5px;
          margin-bottom: 16px;
          gap: 4px;
        }
        .toggle-btn {
          flex: 1;
          padding: 11px 8px;
          border-radius: 8px;
          border: none;
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(.65rem, 1.5vw, .82rem);
          font-weight: 700;
          color: rgba(255,255,255,.5);
          background: transparent;
          cursor: pointer;
          transition: .25s;
          white-space: nowrap;
        }
        .toggle-btn.on-ticari { background: var(--gold); color: var(--navy); box-shadow: 0 4px 14px rgba(245,166,35,.4); }
        .toggle-btn.on-bireysel { background: var(--blue); color: #fff; box-shadow: 0 4px 14px rgba(37,99,235,.4); }

        .rol-row { display: flex; gap: 10px; margin-bottom: 16px; }
        .rol-btn {
          flex: 1; padding: 14px 10px;
          border-radius: 12px;
          border: 2px solid transparent;
          font-weight: 700; font-size: clamp(.8rem, 1.8vw, 1rem);
          cursor: pointer; transition: .2s;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          font-family: inherit;
        }
        .rol-btn small { font-size: .65rem; font-weight: 600; opacity: .8; }
        .rol-btn:not(.on) { background: rgba(255,255,255,.06); color: #fff; border-color: rgba(255,255,255,.1); }
        .rol-btn.on-alan { background: #fff; color: var(--navy); border-color: var(--blue); }
        .rol-btn.on-veren { background: var(--red); color: #fff; border-color: #ff6b52; }

        .arama-box {
          display: flex; background: #fff; padding: 5px 5px 5px 16px;
          border-radius: 12px; gap: 6px;
        }
        .arama-box input {
          flex: 1; border: none; font-family: inherit; font-size: .95rem;
          font-weight: 600; outline: none; background: transparent; color: var(--ink);
          min-width: 0;
        }
        .arama-btn {
          background: var(--navy); color: #fff;
          border: none; padding: 10px 24px;
          border-radius: 8px; font-weight: 700; font-size: .85rem;
          cursor: pointer; white-space: nowrap; font-family: inherit;
          transition: .2s;
        }
        .arama-btn:hover { background: var(--navy2); }

        .stats-bar {
          max-width: 1200px; margin: 32px auto 0;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .stat-item {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 16px;
          text-align: center;
          box-shadow: var(--shadow);
        }
        .stat-v { font-family: 'Unbounded', sans-serif; font-size: 1.4rem; font-weight: 900; color: var(--navy); }
        .stat-l { font-size: .72rem; color: var(--muted); font-weight: 600; margin-top: 3px; text-transform: uppercase; letter-spacing: .05em; }

        .kat-wrap {
          max-width: 1200px; margin: 28px auto 0;
          padding: 0 24px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }
        .kat-chip {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 10px 18px;
          display: flex; align-items: center; gap: 8px;
          cursor: pointer;
          transition: .18s;
          font-weight: 700; color: var(--mid); font-size: .82rem;
          white-space: nowrap;
        }
        .kat-chip:hover { border-color: var(--blue); color: var(--navy); }
        .kat-chip.on { background: var(--navy); border-color: var(--navy); color: #fff; }

        .vitrin-wrap {
          max-width: 1200px; margin: 28px auto 0;
          padding: 0 24px 80px;
        }
        .vitrin-head {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid var(--border);
          flex-wrap: wrap; gap: 12px;
        }
        .vitrin-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          font-weight: 800; color: var(--navy);
        }
        .vitrin-sub { font-size: .85rem; color: var(--mid); font-weight: 600; margin-top: 3px; }
        .ilan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 18px;
        }

        .kart {
          background: #fff;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: .22s;
          display: flex; flex-direction: column;
          cursor: pointer;
        }
        .kart:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); border-color: var(--blue); }
        .kart-img {
          width: 100%; height: 185px;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          display: flex; align-items: center; justify-content: center;
          font-size: 3rem; position: relative; overflow: hidden;
        }
        .kart-img img { width: 100%; height: 100%; object-fit: cover; }
        .kart-badges { position: absolute; top: 10px; left: 10px; display: flex; flex-direction: column; gap: 5px; }
        .badge {
          font-size: .62rem; font-weight: 800; padding: 3px 9px;
          border-radius: 7px; text-transform: uppercase;
          letter-spacing: .05em; box-shadow: 0 2px 8px rgba(0,0,0,.15);
        }
        .b-ticari { background: var(--gold); color: var(--navy); }
        .b-bireysel { background: var(--blue); color: #fff; }
        .b-talep { background: #fff; color: var(--navy); border: 1.5px solid var(--navy); }
        .b-hizmet { background: var(--red); color: #fff; }
        .b-yeni { background: var(--green); color: #fff; }

        .kart-body { padding: 15px; flex: 1; display: flex; flex-direction: column; }
        .kart-kat { font-size: .68rem; font-weight: 800; color: var(--blue); margin-bottom: 5px; text-transform: uppercase; letter-spacing: .06em; }
        .kart-baslik { font-weight: 800; font-size: 1rem; line-height: 1.35; margin-bottom: 10px; flex: 1; color: var(--ink); }
        .kart-meta { display: flex; gap: 10px; font-size: .72rem; color: var(--muted); margin-bottom: 14px; font-weight: 600; flex-wrap: wrap; }
        .kart-foot {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 12px; border-top: 1px solid var(--border);
        }
        .kart-butce { font-family: 'Unbounded', sans-serif; font-weight: 800; font-size: .95rem; color: var(--green); }
        .kart-btn {
          background: var(--navy); color: #fff;
          border: none; padding: 7px 14px;
          border-radius: 8px; font-size: .72rem; font-weight: 800;
          cursor: pointer; transition: .18s; font-family: inherit;
        }
        .kart-btn:hover { opacity: .88; transform: scale(1.04); }
        .kart-btn.red { background: var(--red); }

        .empty {
          text-align: center; padding: 60px 20px;
          background: #fff; border-radius: 20px;
          border: 2px dashed var(--border);
          grid-column: 1 / -1;
        }
        .empty-icon { font-size: 4rem; margin-bottom: 12px; }
        .empty-title { font-size: 1.3rem; font-weight: 800; color: var(--navy); margin-bottom: 6px; }
        .empty-sub { font-size: .9rem; color: var(--mid); font-weight: 600; margin-bottom: 20px; }

        .pagination {
          display: flex; justify-content: center; gap: 8px;
          margin-top: 32px; flex-wrap: wrap;
        }
        .page-btn {
          width: 38px; height: 38px; border-radius: 10px;
          border: 1.5px solid var(--border);
          background: #fff; color: var(--mid);
          font-family: inherit; font-size: .85rem; font-weight: 700;
          cursor: pointer; transition: .18s;
          display: flex; align-items: center; justify-content: center;
        }
        .page-btn:hover { border-color: var(--blue); color: var(--blue); }
        .page-btn.on { background: var(--navy); border-color: var(--navy); color: #fff; }

        .destek-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 500;
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--green);
          border: none; box-shadow: 0 6px 24px rgba(16,185,129,.45);
          color: #fff; font-size: 1.5rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: .22s;
          animation: pulse 3s ease-in-out infinite;
        }
        .destek-fab:hover { transform: scale(1.1); }
        @keyframes pulse {
          0%,100% { box-shadow: 0 6px 24px rgba(16,185,129,.45); }
          50% { box-shadow: 0 6px 32px rgba(16,185,129,.7), 0 0 0 8px rgba(16,185,129,.15); }
        }
        .destek-panel {
          position: fixed; bottom: 96px; right: 28px; z-index: 500;
          width: 320px; background: #fff;
          border-radius: 20px; border: 1.5px solid var(--border);
          box-shadow: 0 16px 48px rgba(0,0,0,.15);
          overflow: hidden; animation: slideUp .25s ease;
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .destek-head {
          background: var(--navy); padding: 16px 20px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .destek-head h4 { color: #fff; font-size: .95rem; font-weight: 700; }
        .destek-body { padding: 16px; }
        .destek-ta {
          width: 100%; padding: 12px; border: 1.5px solid var(--border);
          border-radius: 12px; font-family: inherit; font-size: .85rem;
          resize: none; height: 100px; outline: none;
        }
        .destek-ta:focus { border-color: var(--blue); }
        .destek-send {
          width: 100%; margin-top: 10px; padding: 12px;
          border-radius: 12px; background: var(--navy); border: none;
          color: #fff; font-family: inherit; font-size: .9rem;
          font-weight: 700; cursor: pointer; transition: .2s;
        }
        .destek-send:hover { background: var(--navy2); }

        .skeleton {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 12px;
        }
        @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }

        @media (max-width: 900px) {
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .hero { padding: 50px 16px 90px; }
          .kontrol { padding: 16px; border-radius: 18px; }
          .rol-row { flex-direction: column; }
          .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 0 16px; }
          .kat-wrap { padding: 0 16px; }
          .vitrin-wrap { padding: 0 16px 60px; }
          .ilan-grid { grid-template-columns: 1fr; }
          .nav-btn span { display: none; }
          .destek-panel { width: calc(100vw - 40px); right: 20px; }
        }
      `}} />

      {/* ── NAVBAR ── */}
      <nav className="nav">
        <a className="nav-logo" onClick={() => router.push("/")}>
          <div className="nav-logo-icon">S</div>
          Swap<span>Hubs</span>
        </a>
        <div className="nav-right">
          <button className="nav-btn" onClick={() => router.push("/ilanlar")}>
            🔍 <span>Keşfet</span>
          </button>
          {status === "authenticated" ? (
            <button className="nav-btn primary" onClick={() => router.push("/panel")}>
              👤 <span>Panelim</span>
            </button>
          ) : (
            <>
              <button className="nav-btn" onClick={() => router.push("/giris")}>
                Giriş Yap
              </button>
              <button className="nav-btn primary" onClick={() => router.push("/kayit")}>
                Üye Ol
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-badge">🌍 Global Hizmet & Ürün Merkezi</div>
        <h1>
          Türkiye'den <em>Dünyaya,</em><br />
          Dünyadan <em>Türkiye'ye</em>
        </h1>
        <p className="hero-sub">
          Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturuyoruz.
          İlan verin, teklif alın — tamamen ücretsiz.
        </p>

        <div className="kontrol">
          {/* BİREYSEL / TİCARİ */}
          <div className="toggle-row">
            <button
              className={`toggle-btn ${aktifTip === "bireysel" ? "on-bireysel" : ""}`}
              onClick={() => { setAktifTip("bireysel"); setAktifKat("Tümü"); }}
            >
              👤 BİREYSEL
            </button>
            <button
              className={`toggle-btn ${aktifTip === "ticari" ? "on-ticari" : ""}`}
              onClick={() => { setAktifTip("ticari"); setAktifKat("Tümü"); }}
            >
              🏭 TİCARİ & ENDÜSTRİYEL
            </button>
          </div>

          {/* ALAN / VEREN */}
          <div className="rol-row">
            <button
              className={`rol-btn ${aktifRol === "alan" ? "on-alan" : ""}`}
              onClick={() => setAktifRol("alan")}
            >
              🛒 {aktifTip === "ticari" ? "Tedarikçi / Üretici Arıyorum" : "Hizmet Almak İstiyorum"}
              <small>İlan verin, teklifler size gelsin</small>
            </button>
            <button
              className={`rol-btn ${aktifRol === "veren" ? "on-veren" : ""}`}
              onClick={() => setAktifRol("veren")}
            >
              💼 {aktifTip === "ticari" ? "Üretim / Kapasite Sunuyorum" : "Hizmet Vermek İstiyorum"}
              <small>Hizmetinizi sergileyin, müşteri bulun</small>
            </button>
          </div>

          {/* ARAMA */}
          <div className="arama-box">
            <input
              type="text"
              placeholder={
                aktifTip === "ticari"
                  ? "Örn: İzmir Fason Tekstil, Ankara Makine..."
                  : "Örn: Boya Ustası, İngilizce Dersi, Nakliye..."
              }
              value={aramaQ}
              onChange={e => setAramaQ(e.target.value)}
              onKeyDown={e => e.key === "Enter" && router.push(`/ilanlar?q=${aramaQ}&tip=${aktifTip}&rol=${aktifRol}`)}
            />
            <button
              className="arama-btn"
              onClick={() => router.push(`/ilanlar?q=${aramaQ}&tip=${aktifTip}&rol=${aktifRol}`)}
            >
              Ara & Listele
            </button>
          </div>
        </div>
      </header>

      {/* ── STATS ── */}
      <div className="stats-bar">
        {STATS.map(s => (
          <div key={s.l} className="stat-item">
            <div className="stat-v">{s.v}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── KATEGORİ ŞERİDİ ── */}
      <div className="kat-wrap">
        {kategoriler.map(k => (
          <div
            key={k.id}
            className={`kat-chip ${aktifKat === k.id ? "on" : ""}`}
            onClick={() => setAktifKat(k.id)}
          >
            <span>{k.icon}</span> {k.id === "Tümü" ? "Tüm Sektörler" : k.ad}
          </div>
        ))}
      </div>

      {/* ── VİTRİN ── */}
      <main className="vitrin-wrap">
        <div className="vitrin-head">
          <div>
            <h2 className="vitrin-title">
              {aktifTip === "ticari" ? "🏭 Ticari Pazar Yeri" : "👤 Bireysel İlanlar"}
            </h2>
            <p className="vitrin-sub">
              {filtreliIlanlar.length > 0
                ? `${filtreliIlanlar.length} ilan bulundu`
                : "Henüz ilan yok — ilk ilanı siz verin!"}
            </p>
          </div>
          <button
            className="nav-btn primary"
            style={{ borderRadius: "12px", padding: "10px 20px" }}
            onClick={() => router.push(`/ilan-ver?tip=${aktifTip}&rol=${aktifRol}`)}
          >
            ➕ {aktifRol === "alan" ? "Talep İlanı Oluştur" : "Hizmet İlanı Oluştur"}
          </button>
        </div>

        <div className="ilan-grid">
          {yukleniyor ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ borderRadius: 16, overflow: "hidden", background: "#fff", border: "1px solid var(--border)" }}>
                <div className="skeleton" style={{ height: 185 }} />
                <div style={{ padding: 15 }}>
                  <div className="skeleton" style={{ height: 12, width: "60%", marginBottom: 10 }} />
                  <div className="skeleton" style={{ height: 18, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: "40%" }} />
                </div>
              </div>
            ))
          ) : sayfaIlanlar.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📭</div>
              <p className="empty-title">Bu kriterlere uygun ilan bulunamadı</p>
              <p className="empty-sub">
                İlk ilanı siz verin — teklif almaya hemen başlayın!
              </p>
              <button
                className="nav-btn primary"
                style={{ borderRadius: 12, padding: "11px 28px", fontSize: ".9rem" }}
                onClick={() => router.push(`/ilan-ver?tip=${aktifTip}&rol=${aktifRol}`)}
              >
                Hemen İlan Ver
              </button>
            </div>
          ) : (
            sayfaIlanlar.map(ilan => (
              <div
                key={ilan._id}
                className="kart"
                onClick={() => router.push(`/ilan/${ilan._id}`)}
              >
                <div className="kart-img">
                  {gorsel(ilan) ? (
                    <img src={gorsel(ilan)!} alt={ilan.baslik} loading="lazy" />
                  ) : (
                    <span>
                      {ilan.sektorId === "turizm" ? "🏨"
                       : ilan.sektorId === "uretim" ? "🏭"
                       : ilan.sektorId === "giyim" ? "👗"
                       : ilan.sektorId === "lojistik" ? "🚢"
                       : ilan.sektorId === "gida" ? "🌾"
                       : ilan.tip === "ticari" ? "🏭" : "📋"}
                    </span>
                  )}
                  <div className="kart-badges">
                    <span className={`badge ${ilan.tip === "ticari" ? "b-ticari" : "b-bireysel"}`}>
                      {ilan.tip === "ticari" ? "TİCARİ" : "BİREYSEL"}
                    </span>
                    <span className={`badge ${ilan.rol === "alan" ? "b-talep" : "b-hizmet"}`}>
                      {ilan.rol === "alan" ? "🙋 TALEP" : "💼 HİZMET"}
                    </span>
                    {ilan.yapay === false && <span className="badge b-yeni">✓ GERÇEK</span>}
                  </div>
                </div>
                <div className="kart-body">
                  <div className="kart-kat">
                    {ilan.kategori || ilan.sektorId || "Genel"}
                  </div>
                  <div className="kart-baslik">{ilan.baslik}</div>
                  <div className="kart-meta">
                    <span>
                      📍 {ilan.ulke && ilan.ulke !== "Türkiye" ? `${ilan.ulke} · ` : ""}{ilan.sehir || "Global"}
                    </span>
                    <span>📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</span>
                    {(ilan.teklifSayisi || 0) > 0 && (
                      <span>💼 {ilan.teklifSayisi} teklif</span>
                    )}
                  </div>
                  <div className="kart-foot">
                    <div className="kart-butce">
                      {(ilan.butceMin || 0) > 0
                        ? `${fmt(ilan.butceMin!)} ${ilan.butceBirimi || "₺"}`
                        : "Teklif Al"}
                    </div>
                    <button
                      className={`kart-btn ${ilan.rol === "alan" ? "red" : ""}`}
                      onClick={e => { e.stopPropagation(); router.push(`/ilan/${ilan._id}`); }}
                    >
                      {ilan.rol === "alan" ? "Teklif Ver →" : "İncele →"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGİNASYON */}
        {toplamSayfa > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => setSayfa(p => Math.max(1, p - 1))} disabled={sayfa === 1}>‹</button>
            {Array.from({ length: toplamSayfa }, (_, i) => i + 1).map(p => (
              <button key={p} className={`page-btn ${p === sayfa ? "on" : ""}`} onClick={() => setSayfa(p)}>{p}</button>
            ))}
            <button className="page-btn" onClick={() => setSayfa(p => Math.min(toplamSayfa, p + 1))} disabled={sayfa === toplamSayfa}>›</button>
          </div>
        )}
      </main>

      {/* ── DESTEK FAB ── */}
      <button
        className="destek-fab"
        onClick={() => setDestekAcik(p => !p)}
        title="Canlı Destek"
      >
        {destekAcik ? "✕" : "💬"}
      </button>

      {destekAcik && (
        <div className="destek-panel">
          <div className="destek-head">
            <h4>💬 Canlı Destek Hattı</h4>
            <button onClick={() => setDestekAcik(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.6)", cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
          </div>
          <div className="destek-body">
            {destekGonderildi ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>✅</div>
                <p style={{ fontWeight: 700, color: "#059669" }}>Mesajınız alındı!</p>
                <p style={{ fontSize: ".85rem", color: "#64748b", marginTop: 4 }}>En kısa sürede dönüş yapacağız.</p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: ".82rem", color: "#64748b", marginBottom: 10, lineHeight: 1.5 }}>
                  Soru, öneri veya sorunlarınızı yazın — ekibimiz size özel yanıt verir.
                </p>
                <textarea
                  className="destek-ta"
                  placeholder="Mesajınızı yazın..."
                  value={destekMesaj}
                  onChange={e => setDestekMesaj(e.target.value)}
                />
                {session?.user?.email && (
                  <p style={{ fontSize: ".75rem", color: "#94a3b8", marginTop: 4 }}>
                    📧 {session.user.email} üzerinden yanıtlanacak
                  </p>
                )}
                <button className="destek-send" onClick={handleDestekGonder}>
                  Gönder →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
