"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { TICARI_SEKTORLER, BIREYSEL_SEKTORLER } from "@/lib/sektorler";

interface Ilan {
  _id: string;
  baslik: string;
  tip: "ticari" | "bireysel";
  rol: "alan" | "veren";
  sektorId?: string;
  kategori?: string;
  sehir?: string;
  ulke?: string;
  butceMin?: number;
  butceBirimi?: string;
  resimUrl?: string;
  medyalar?: string[];
  teklifSayisi?: number;
  createdAt: string;
  yapay?: boolean;
}

const STATS = [
  { v: "12K+", l: "Aktif İlan" },
  { v: "8K+", l: "Üye" },
  { v: "50+", l: "Ülke" },
  { v: "₺0", l: "İlan Ücreti" },
];

const BOTTOM_NAV = [
  { icon: "🏠", label: "Ana Sayfa", href: "/" },
  { icon: "🔍", label: "Keşfet", href: "/ilanlar" },
  { icon: "➕", label: "İlan Ver", href: "/ilan-ver", primary: true },
  { icon: "💬", label: "Mesajlar", href: "/mesajlar" },
  { icon: "👤", label: "Profilim", href: "/panel" },
];

interface Props {
  initialIlanlar: any[];
  ilkGorsel?: string | null;
}

export default function AnaSayfaClient({ initialIlanlar, ilkGorsel }: Props) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const locale = "tr";

  const [ilanlar, setIlanlar] = useState<Ilan[]>(initialIlanlar);
  const [yukleniyor] = useState(false);
  const [aktifTip, setAktifTip] = useState<"ticari" | "bireysel">("ticari");
  const [aktifRol, setAktifRol] = useState<"alan" | "veren">("alan");
  const [aktifKat, setAktifKat] = useState("Tümü");
  const [aramaQ, setAramaQ] = useState("");
  const [sayfa, setSayfa] = useState(1);
  const SAYFA_BOYUTU = 12;

  const [destekAcik, setDestekAcik] = useState(false);
  const [destekMesaj, setDestekMesaj] = useState("");
  const [destekGonderildi, setDestekGonderildi] = useState(false);

  useEffect(() => {
    if (initialIlanlar.length === 0) {
      const veriCek = async () => {
        try {
          const res = await fetch("/api/ilanlar?limit=100");
          if (res.ok) {
            const data = await res.json();
            const liste = data.ilanlar || data || [];
            if (liste.length > 0) setIlanlar(liste);
          }
        } catch {}
      };
      veriCek();
    }
  }, [initialIlanlar.length]);

  const kategoriler = useMemo(() => {
    const liste = aktifTip === "ticari" ? TICARI_SEKTORLER : BIREYSEL_SEKTORLER;
    const tumKategori = {
      id: "Tümü", ad: "Tüm Sektörler", icon: "🌐",
      tip: "both", renk: "#0f172a", altKategoriler: [],
      butceBirimi: "TL", hizmetAlanFormu: [], hizmetVerenFormu: []
    } as any;
    return [tumKategori, ...liste];
  }, [aktifTip]);

  const filtreliIlanlar = useMemo(() => {
    return ilanlar.filter(i => {
      if (i.tip !== aktifTip) return false;
      if (i.rol !== aktifRol) return false;
      if (aktifKat !== "Tümü" && i.sektorId !== aktifKat) return false;
      if (aramaQ.trim()) {
        const q = aramaQ.toLowerCase();
        return (
          i.baslik?.toLowerCase().includes(q) ||
          i.kategori?.toLowerCase().includes(q) ||
          i.sehir?.toLowerCase().includes(q) ||
          i.ulke?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [ilanlar, aktifTip, aktifRol, aktifKat, aramaQ]);

  useEffect(() => {
    setSayfa(1);
    setAktifKat("Tümü");
  }, [aktifTip, aktifRol]);

  useEffect(() => {
    setSayfa(1);
  }, [filtreliIlanlar.length]);

  const toplamSayfa = Math.ceil(filtreliIlanlar.length / SAYFA_BOYUTU);
  const fmt = (n: number) => new Intl.NumberFormat(locale).format(n || 0);

  const gorsel = (i: Ilan): string | null => {
    const url = i.resimUrl || i.medyalar?.[0] || null;
    if (!url) return null;
    if (url.includes("res.cloudinary.com")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto:eco,w_400,h_185,c_fill/");
    }
    if (url.includes("unsplash.com")) {
      return `${url.split("?")[0]}?auto=format&fit=crop&w=400&q=60`;
    }
    return url;
  };

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
    setTimeout(() => {
      setDestekAcik(false);
      setDestekGonderildi(false);
      setDestekMesaj("");
    }, 3000);
  };

  const sayfaIlanlar = filtreliIlanlar.slice((sayfa - 1) * SAYFA_BOYUTU, sayfa * SAYFA_BOYUTU);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --navy: #0d1b3e; --navy2: #1e3a8a; --red: #e8361a; --red2: #c42d15;
          --gold: #f5a623; --green: #10b981; --blue: #2563eb;
          --ink: #0f172a; --mid: #475569; --muted: #94a3b8; --border: #e2e8f0;
          --cream: #f8fafc; --radius: 16px;
          --shadow: 0 4px 24px rgba(0,0,0,.08);
          --shadow-hover: 0 12px 32px rgba(0,0,0,.14);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--cream); color: var(--ink); -webkit-font-smoothing: antialiased; }
        .nav { background: var(--navy); padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 200; box-shadow: 0 2px 20px rgba(0,0,0,.2); }
        .nav-logo { font-family: 'Unbounded', sans-serif; font-weight: 900; font-size: 1.15rem; color: #fff; display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; text-decoration: none; }
        .nav-logo-icon { background: var(--red); width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: .95rem; flex-shrink: 0; }
        .nav-logo span { color: var(--gold); }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .nav-btn { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15); color: #fff; padding: 8px 18px; border-radius: 40px; font-size: .8rem; font-weight: 700; cursor: pointer; transition: .2s; font-family: inherit; white-space: nowrap; }
        .nav-btn:hover { background: rgba(255,255,255,.2); }
        .nav-btn.primary { background: var(--red); border-color: var(--red); }
        .nav-btn.primary:hover { background: var(--red2); }
        .hero { background: linear-gradient(160deg, var(--navy) 0%, var(--navy2) 60%, #1e40af 100%); padding: 70px 24px 110px; text-align: center; position: relative; overflow: hidden; }
        .hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: var(--cream); border-radius: 60px 60px 0 0; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(245,166,35,.15); border: 1px solid rgba(245,166,35,.3); color: var(--gold); padding: 6px 16px; border-radius: 99px; font-size: .78rem; font-weight: 700; margin-bottom: 20px; }
        .hero h1 { font-family: 'Unbounded', sans-serif; color: #fff; font-size: clamp(1.6rem, 4vw, 2.8rem); font-weight: 900; line-height: 1.2; margin-bottom: 14px; position: relative; z-index: 1; }
        .hero h1 em { color: var(--gold); font-style: normal; }
        .hero-sub { color: rgba(255,255,255,.75); font-size: clamp(.9rem, 2vw, 1.1rem); max-width: 680px; margin: 0 auto 36px; line-height: 1.7; position: relative; z-index: 1; }
        .kontrol { max-width: 820px; margin: 0 auto; background: rgba(255,255,255,.1); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,.2); border-radius: 24px; padding: 24px; position: relative; z-index: 2; }
        .toggle-row { display: flex; background: rgba(0,0,0,.25); border-radius: 12px; padding: 5px; margin-bottom: 16px; gap: 4px; }
        .toggle-btn { flex: 1; padding: 11px 8px; border-radius: 8px; border: none; font-family: 'Unbounded', sans-serif; font-size: clamp(.65rem, 1.5vw, .82rem); font-weight: 700; color: rgba(255,255,255,.5); background: transparent; cursor: pointer; transition: .25s; white-space: nowrap; }
        .toggle-btn.on-ticari { background: var(--gold); color: var(--navy); }
        .toggle-btn.on-bireysel { background: var(--blue); color: #fff; }
        .rol-row { display: flex; gap: 10px; margin-bottom: 16px; }
        .rol-btn { flex: 1; padding: 14px 10px; border-radius: 12px; border: 2px solid transparent; font-weight: 700; font-size: clamp(.8rem, 1.8vw, 1rem); cursor: pointer; transition: .2s; display: flex; flex-direction: column; align-items: center; gap: 4px; font-family: inherit; }
        .rol-btn small { font-size: .65rem; font-weight: 600; opacity: .8; }
        .rol-btn:not(.on-alan):not(.on-veren) { background: rgba(255,255,255,.06); color: #fff; border-color: rgba(255,255,255,.1); }
        .rol-btn.on-alan { background: #fff; color: var(--navy); border-color: var(--blue); }
        .rol-btn.on-veren { background: var(--red); color: #fff; border-color: #ff6b52; }
        .arama-box { display: flex; background: #fff; padding: 5px 5px 5px 16px; border-radius: 12px; gap: 6px; }
        .arama-box input { flex: 1; border: none; font-family: inherit; font-size: .95rem; font-weight: 600; outline: none; background: transparent; color: var(--ink); min-width: 0; }
        .arama-btn { background: var(--navy); color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 700; font-size: .85rem; cursor: pointer; white-space: nowrap; font-family: inherit; transition: .2s; }
        .arama-btn:hover { background: var(--navy2); }
        .stats-bar { max-width: 1200px; margin: 32px auto 0; padding: 0 24px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .stat-item { background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 16px; text-align: center; }
        .stat-v { font-family: 'Unbounded', sans-serif; font-size: 1.4rem; font-weight: 900; color: var(--navy); }
        .stat-l { font-size: .72rem; color: var(--muted); font-weight: 600; margin-top: 3px; text-transform: uppercase; }
        .kat-wrap { max-width: 1200px; margin: 28px auto 0; padding: 0 24px; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .kat-chip { background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 10px 18px; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: .18s; font-weight: 700; color: var(--mid); font-size: .82rem; white-space: nowrap; }
        .kat-chip:hover { border-color: var(--blue); color: var(--navy); }
        .kat-chip.on { background: var(--navy); border-color: var(--navy); color: #fff; }
        .vitrin-wrap { max-width: 1200px; margin: 28px auto 0; padding: 0 24px 100px; }
        .vitrin-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid var(--border); flex-wrap: wrap; gap: 12px; }
        .vitrin-title { font-family: 'Unbounded', sans-serif; font-size: clamp(1.1rem, 2.5vw, 1.5rem); font-weight: 800; color: var(--navy); }
        .vitrin-sub { font-size: .85rem; color: var(--mid); font-weight: 600; margin-top: 3px; }
        .ilan-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 18px; }
        .kart { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); overflow: hidden; transition: .22s; display: flex; flex-direction: column; cursor: pointer; }
        .kart:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); border-color: var(--blue); }
        .kart-img { width: 100%; height: 185px; background: linear-gradient(135deg, #f1f5f9, #e2e8f0); display: flex; align-items: center; justify-content: center; font-size: 3rem; position: relative; overflow: hidden; }
        .kart-img img { width: 100%; height: 100%; object-fit: cover; }
        .kart-badges { position: absolute; top: 10px; left: 10px; display: flex; flex-direction: column; gap: 5px; }
        .badge { font-size: .62rem; font-weight: 800; padding: 3px 9px; border-radius: 7px; text-transform: uppercase; }
        .b-ticari { background: var(--gold); color: var(--navy); }
        .b-bireysel { background: var(--blue); color: #fff; }
        .b-talep { background: #fff; color: var(--navy); border: 1.5px solid var(--navy); }
        .b-hizmet { background: var(--red); color: #fff; }
        .b-yeni { background: var(--green); color: #fff; }
        .kart-body { padding: 15px; flex: 1; display: flex; flex-direction: column; }
        .kart-kat { font-size: .68rem; font-weight: 800; color: var(--blue); margin-bottom: 5px; text-transform: uppercase; }
        .kart-baslik { font-weight: 800; font-size: 1rem; line-height: 1.35; margin-bottom: 10px; flex: 1; color: var(--ink); }
        .kart-meta { display: flex; gap: 10px; font-size: .72rem; color: var(--muted); margin-bottom: 14px; font-weight: 600; flex-wrap: wrap; }
        .kart-foot { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--border); }
        .kart-butce { font-family: 'Unbounded', sans-serif; font-weight: 800; font-size: .95rem; color: var(--green); }
        .kart-btn { background: var(--navy); color: #fff; border: none; padding: 7px 14px; border-radius: 8px; font-size: .72rem; font-weight: 800; cursor: pointer; transition: .18s; font-family: inherit; }
        .kart-btn:hover { opacity: .88; }
        .kart-btn.red { background: var(--red); }
        .empty { text-align: center; padding: 60px 20px; background: #fff; border-radius: 20px; border: 2px dashed var(--border); grid-column: 1 / -1; }
        .empty-icon { font-size: 4rem; margin-bottom: 12px; }
        .empty-title { font-size: 1.3rem; font-weight: 800; color: var(--navy); margin-bottom: 6px; }
        .empty-sub { font-size: .9rem; color: var(--mid); font-weight: 600; margin-bottom: 20px; }
        .pagination { display: flex; justify-content: center; gap: 8px; margin-top: 32px; flex-wrap: wrap; }
        .page-btn { width: 38px; height: 38px; border-radius: 10px; border: 1.5px solid var(--border); background: #fff; color: var(--mid); font-family: inherit; font-size: .85rem; font-weight: 700; cursor: pointer; transition: .18s; display: flex; align-items: center; justify-content: center; }
        .page-btn:hover { border-color: var(--blue); color: var(--blue); }
        .page-btn.on { background: var(--navy); border-color: var(--navy); color: #fff; }
        .destek-fab { position: fixed; bottom: 90px; right: 20px; z-index: 300; width: 52px; height: 52px; border-radius: 50%; background: var(--green); border: none; color: #fff; font-size: 1.4rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .destek-panel { position: fixed; bottom: 154px; right: 20px; z-index: 300; width: 320px; background: #fff; border-radius: 20px; border: 1.5px solid var(--border); box-shadow: 0 16px 48px rgba(0,0,0,.15); overflow: hidden; }
        .destek-head { background: var(--navy); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
        .destek-head h4 { color: #fff; font-size: .95rem; font-weight: 700; }
        .destek-body { padding: 16px; }
        .destek-ta { width: 100%; padding: 12px; border: 1.5px solid var(--border); border-radius: 12px; font-family: inherit; font-size: .85rem; resize: none; height: 100px; outline: none; }
        .destek-send { width: 100%; margin-top: 10px; padding: 12px; border-radius: 12px; background: var(--navy); border: none; color: #fff; font-family: inherit; font-size: .9rem; font-weight: 700; cursor: pointer; }
        .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 64px; background: var(--navy); display: flex; align-items: stretch; z-index: 400; box-shadow: 0 -4px 20px rgba(0,0,0,.25); }
        .bottom-nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; cursor: pointer; border: none; background: transparent; color: rgba(255,255,255,.5); font-family: inherit; font-size: .62rem; font-weight: 700; transition: .18s; position: relative; padding: 0; text-transform: uppercase; }
        .bottom-nav-item:hover { color: rgba(255,255,255,.85); }
        .bottom-nav-icon { font-size: 1.25rem; line-height: 1; }
        .bottom-nav-primary { background: var(--red) !important; color: #fff !important; margin: 8px 6px; border-radius: 12px !important; height: calc(100% - 16px); }
        @media (min-width: 768px) { .bottom-nav { display: none; } }
        @media (max-width: 900px) { .stats-bar { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) {
          .hero { padding: 50px 16px 90px; }
          .kontrol { padding: 16px; border-radius: 18px; }
          .rol-row { flex-direction: column; }
          .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 0 16px; }
          .kat-wrap { padding: 0 16px; }
          .vitrin-wrap { padding: 0 16px 100px; }
          .ilan-grid { grid-template-columns: 1fr; }
          .nav-btn span { display: none; }
          .destek-panel { width: calc(100vw - 40px); }
        }
      `}} />

      <nav className="nav">
        <a className="nav-logo" onClick={() => router.push("/")}>
          <div className="nav-logo-icon">🔄</div>
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
              <button className="nav-btn" onClick={() => router.push("/giris")}>Giriş Yap</button>
              <button className="nav-btn primary" onClick={() => router.push("/kayit")}>Üye Ol</button>
            </>
          )}
        </div>
      </nav>

      <header className="hero">
        <div className="hero-badge">🌍 Global Hizmet &amp; Ürün Merkezi</div>
        <h1>Türkiye&apos;den <em>Dünyaya,</em><br />Dünyadan <em>Türkiye&apos;ye</em></h1>
        <p className="hero-sub">
          Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturuyoruz.
          İlan verin, teklif alın — tamamen ücretsiz.
        </p>
        <div className="kontrol">
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
              🏭 TİCARİ
            </button>
          </div>
          <div className="rol-row">
            <button
              className={`rol-btn ${aktifRol === "alan" ? "on-alan" : ""}`}
              onClick={() => setAktifRol("alan")}
            >
              🛒 {aktifTip === "ticari" ? "Tedarikçi Arıyorum" : "Hizmet Almak İstiyorum"}
              <small>İlan verin, teklifler size gelsin</small>
            </button>
            <button
              className={`rol-btn ${aktifRol === "veren" ? "on-veren" : ""}`}
              onClick={() => setAktifRol("veren")}
            >
              💼 {aktifTip === "ticari" ? "Üretim Sunuyorum" : "Hizmet Vermek İstiyorum"}
              <small>Hizmetinizi sergileyin, müşteri bulun</small>
            </button>
          </div>
          <div className="arama-box">
            <input
              type="text"
              placeholder={aktifTip === "ticari" ? "Örn: İzmir Fason Tekstil..." : "Örn: Boya Ustası..."}
              value={aramaQ}
              onChange={e => setAramaQ(e.target.value)}
              onKeyDown={e => e.key === "Enter" && router.push(`/ilanlar?q=${aramaQ}&tip=${aktifTip}&rol=${aktifRol}`)}
            />
            <button
              className="arama-btn"
              onClick={() => router.push(`/ilanlar?q=${aramaQ}&tip=${aktifTip}&rol=${aktifRol}`)}
            >
              Ara &amp; Listele
            </button>
          </div>
        </div>
      </header>

      <div className="stats-bar">
        {STATS.map(s => (
          <div key={s.l} className="stat-item">
            <div className="stat-v">{s.v}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>

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
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px 0", color: "var(--mid)", fontWeight: 700 }}>
              Yükleniyor...
            </div>
          ) : sayfaIlanlar.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📭</div>
              <p className="empty-title">Bu kriterlere uygun ilan bulunamadı</p>
              <p className="empty-sub">İlk ilanı siz verin — teklif almaya hemen başlayın!</p>
              <button
                className="nav-btn primary"
                style={{ borderRadius: 12, padding: "11px 28px", fontSize: ".9rem" }}
                onClick={() => router.push(`/ilan-ver?tip=${aktifTip}&rol=${aktifRol}`)}
              >
                Hemen İlan Ver
              </button>
            </div>
          ) : (
            sayfaIlanlar.map((ilan, idx) => {
              const gorselUrl = gorsel(ilan);
              const oncelikli = idx < 4;
              return (
                <div
                  key={ilan._id}
                  className="kart"
                  onClick={() => router.push(`/ilan/${ilan._id}`)}
                >
                  <div className="kart-img">
                    {gorselUrl ? (
                      <div style={{ position: "relative", width: "100%", height: 185 }}>
                        <Image
                          src={gorselUrl}
                          alt={ilan.baslik}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          priority={oncelikli}
                          style={{ objectFit: "cover" }}
                          onError={(e) => {
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) parent.style.display = "none";
                          }}
                        />
                      </div>
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
                    <div className="kart-kat">{ilan.kategori || ilan.sektorId || "Genel"}</div>
                    <div className="kart-baslik">{ilan.baslik}</div>
                    <div className="kart-meta">
                      <span>📍 {ilan.ulke && ilan.ulke !== "Türkiye" ? `${ilan.ulke} · ` : ""}{ilan.sehir || "Global"}</span>
                      <span>📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</span>
                      {(ilan.teklifSayisi || 0) > 0 && <span>💼 {ilan.teklifSayisi} teklif</span>}
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
              );
            })
          )}
        </div>

        {toplamSayfa > 1 && (
          <div className="pagination">
            {Array.from({ length: toplamSayfa }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                className={`page-btn ${p === sayfa ? "on" : ""}`}
                onClick={() => { setSayfa(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </main>

      <button className="destek-fab" onClick={() => setDestekAcik(v => !v)}>💬</button>

      {destekAcik && (
        <div className="destek-panel">
          <div className="destek-head">
            <h4>💬 Canlı Destek Hattı</h4>
            <button
              onClick={() => setDestekAcik(false)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,.6)", cursor: "pointer", fontSize: "1.1rem" }}
            >✕</button>
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
                    📧 {session.user.email}
                  </p>
                )}
                <button className="destek-send" onClick={handleDestekGonder}>Gönder →</button>
              </>
            )}
          </div>
        </div>
      )}

      <nav className="bottom-nav" aria-label="Alt navigasyon">
        {BOTTOM_NAV.map(item => (
          <button
            key={item.href}
            className={`bottom-nav-item ${item.primary ? "bottom-nav-primary" : ""}`}
            onClick={() => {
              if (item.href === "/ilan-ver") {
                router.push(`/ilan-ver?tip=${aktifTip}&rol=${aktifRol}`);
              } else if (item.href === "/panel" && status !== "authenticated") {
                router.push("/giris");
              } else {
                router.push(item.href);
              }
            }}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
}
