"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Ilan {
  _id: string;
  baslik: string;
  kategori: string;
  tip: "bireysel" | "ticari";
  rol: "alan" | "veren";
  sehir: string;
  butceMin: number;
  butceMax: number;
  resimUrl?: string;
  createdAt: string;
}

export default function AnaSayfa() {
  // 🚨 SİBER ZIRH: Vercel çökmesin diye güvenli bağlantı
  const sessionData = useSession() || {};
  const session = sessionData.data;
  const status = sessionData.status || "loading";
  
  const router = useRouter();
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [aramaQ, setAramaQ] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    // Son ilanları çekiyoruz
    fetch("/api/ilanlar?limit=8")
      .then(res => res.json())
      .then(data => {
        setIlanlar(data.ilanlar || []);
        setYukleniyor(false);
      })
      .catch(() => setYukleniyor(false));
  }, []);

  const handleArama = (e: React.FormEvent) => {
    e.preventDefault();
    if(aramaQ) router.push(`/ilanlar?q=${encodeURIComponent(aramaQ)}`);
  };

  const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(n);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Unbounded:wght@700;900&display=swap');
        :root{--ink:#080811;--cream:#f7f5f0;--red:#e8361a;--gold:#f5a623;
          --navy:#0d1b3e;--mid:#4a4860;--border:#e4e1db;--green:#18a558}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:var(--cream);color:var(--ink)}
        a{text-decoration:none;color:inherit}

        /* NAVBAR */
        .topbar { background: var(--navy); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; gap: 12px; position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .logo-box { font-family: 'Unbounded', sans-serif; font-weight: 900; color: #fff; font-size: 1.3rem; display: flex; align-items: center; gap: 8px; cursor:pointer;}
        .logo-box .icon { background: var(--red); width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: #fff; font-weight: 900; }
        .nav-links { display: flex; gap: 12px; align-items: center; }
        .btn-outline { background: rgba(255,255,255,.1); border: 1.5px solid rgba(255,255,255,.2); color: #fff; padding: 10px 20px; border-radius: 40px; font-size: .85rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { background: rgba(255,255,255,.2); }
        .btn-primary { background: var(--red); color: #fff; padding: 10px 24px; border-radius: 40px; font-size: .85rem; font-weight: 800; cursor: pointer; border: none; transition: background 0.2s; box-shadow: 0 4px 12px rgba(232, 54, 26, 0.3); }
        .btn-primary:hover { background: #c42d14; transform: translateY(-1px); }

        /* HERO BÖLÜMÜ */
        .hero { background: linear-gradient(135deg, var(--navy) 0%, #1a2d5a 100%); padding: 90px 24px 110px; text-align: center; color: white; position: relative; }
        .hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 40px; background: var(--cream); border-top-left-radius: 40px; border-top-right-radius: 40px; }
        .hero h1 { font-family: 'Unbounded', sans-serif; font-size: clamp(2rem, 5vw, 3.8rem); font-weight: 900; line-height: 1.15; margin-bottom: 20px; letter-spacing: -0.02em; }
        .hero h1 span { color: var(--gold); }
        .hero p { font-size: 1.15rem; color: rgba(255,255,255,0.75); max-width: 650px; margin: 0 auto 36px; font-weight: 500; }
        .search-box { max-width: 650px; margin: 0 auto; display: flex; background: white; padding: 8px; border-radius: 50px; box-shadow: 0 12px 32px rgba(0,0,0,0.25); }
        .search-box input { flex: 1; border: none; outline: none; padding: 14px 24px; font-size: 1rem; font-family: inherit; border-radius: 50px; color: var(--ink); font-weight: 600; }
        .search-box button { background: var(--red); color: white; border: none; padding: 0 32px; border-radius: 40px; font-weight: 800; font-size: 1rem; cursor: pointer; transition: 0.2s; }
        .search-box button:hover { background: #c42d14; }

        /* KATEGORİLER */
        .cats { max-width: 1100px; margin: -30px auto 40px; padding: 0 24px; display: flex; gap: 14px; overflow-x: auto; position: relative; z-index: 10; scrollbar-width: none; }
        .cats::-webkit-scrollbar { display: none; }
        .cat-card { background: white; border: 1.5px solid var(--border); border-radius: 18px; padding: 18px 24px; display: flex; align-items: center; gap: 14px; flex-shrink: 0; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
        .cat-card:hover { border-color: var(--navy); transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .cat-icon { font-size: 1.8rem; }
        .cat-name { font-weight: 800; font-size: .95rem; color: var(--ink); }

        /* VİTRİN */
        .vitrin { max-width: 1100px; margin: 0 auto; padding: 20px 24px 80px; }
        .section-title { font-family: 'Unbounded', sans-serif; font-weight: 900; font-size: 1.8rem; margin-bottom: 28px; color: var(--ink); display: flex; justify-content: space-between; align-items: flex-end; }
        .section-link { font-size: .9rem; color: var(--red); font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em; }
        .section-link:hover { text-decoration: underline; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }

        /* İLAN KARTI */
        .ilan-kart{background:#fff;border-radius:20px;border:1.5px solid var(--border); overflow:hidden;transition:transform .2s,box-shadow .2s;display:flex;flex-direction:column; cursor: pointer;}
        .ilan-kart:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,.08); border-color: var(--navy);}
        .ilan-resim{width:100%;height:200px;object-fit:cover;background:#e8e6e0; display:flex;align-items:center;justify-content:center;font-size:3.5rem; position:relative;flex-shrink:0}
        .ilan-resim img{width:100%;height:100%;object-fit:cover}
        .ilan-tip-badge{position:absolute;top:12px;left:12px;font-size:.7rem; font-weight:800;padding:4px 12px;border-radius:20px;letter-spacing:.04em; box-shadow: 0 4px 10px rgba(0,0,0,0.2);}
        .badge-alan{background:rgba(13,27,62,.9);color:#fff}
        .badge-veren{background:rgba(232,54,26,.95);color:#fff}
        .badge-tr{position:absolute;bottom:12px;left:12px;background:rgba(245,166,35,.95); color:#080811;font-size:.7rem;font-weight:800;padding:4px 12px;border-radius:20px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);}
        .ilan-body{padding:20px;flex:1;display:flex;flex-direction:column}
        .ilan-kat{display:inline-flex;align-items:center;gap:5px;font-size:.7rem; font-weight:800;letter-spacing:.06em;text-transform:uppercase; color:var(--red);background:rgba(232,54,26,.08); padding:4px 12px;border-radius:20px;margin-bottom:10px;width:fit-content}
        .ilan-baslik{font-weight:800;font-size:1.05rem;line-height:1.4;margin-bottom:10px;flex:1; color: var(--ink);}
        .ilan-meta{display:flex;gap:12px;font-size:.8rem;color:var(--mid); margin-bottom:16px;flex-wrap:wrap; font-weight: 600;}
        .ilan-footer{display:flex;align-items:center;justify-content:space-between; padding-top:16px;border-top:1.5px solid var(--border)}
        .ilan-butce{font-family:'Unbounded',sans-serif;font-weight:900;font-size:1rem; color: var(--navy);}
        .ilan-btn-incele { background: var(--navy); color: #fff; border: none; padding: 10px 20px; border-radius: 40px; font-size: .8rem; font-weight: 800; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 10px rgba(13,27,62,.2); }
        .ilan-btn-incele:hover { background: #1a2d5a; transform: translateY(-2px); }

        @media(max-width: 768px) {
          .nav-links span { display: none; }
          .hero { padding: 60px 20px 80px; }
          .search-box { flex-direction: column; background: transparent; box-shadow: none; gap: 10px; }
          .search-box input { border-radius: 12px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .search-box button { border-radius: 12px; padding: 16px; }
          .section-title { font-size: 1.4rem; flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="topbar">
        <div className="logo-box" onClick={() => router.push('/')}>
          <div className="icon">S</div>
          Swap<span style={{color: 'var(--red)'}}>Hubs</span>
        </div>
        <div className="nav-links">
          <button className="btn-outline" onClick={() => router.push('/ilanlar')}>🔍 <span>Keşfet</span></button>
          {status === 'authenticated' ? (
            <button className="btn-outline" onClick={() => router.push('/panel')}>👤 <span>Panelim</span></button>
          ) : (
            <button className="btn-outline" onClick={() => router.push('/giris')}>Giriş Yap</button>
          )}
          <button className="btn-primary" onClick={() => router.push('/ilan-ver')}>➕ İlan Ver</button>
        </div>
      </nav>

      {/* HERO BÖLÜMÜ */}
      <header className="hero">
        <h1>Hizmet Al. Hizmet Ver.<br/><span>Güvenle Takasla.</span></h1>
        <p>Türkiye'nin yeni nesil bireysel ve ticari hizmet platformu. Aradığın ustayı bul, tesisini tanıt veya emeğini takasla.</p>
        <form className="search-box" onSubmit={handleArama}>
          <input 
            type="text" 
            placeholder="Ne aramıştınız? (Örn: Web Tasarım, Usta, Temizlik...)" 
            value={aramaQ}
            onChange={(e) => setAramaQ(e.target.value)}
          />
          <button type="submit">Hemen Bul</button>
        </form>
      </header>

      {/* KATEGORİ ŞERİDİ */}
      <div className="cats">
        {[
          { id: "Emlak", icon: "🏠" }, { id: "Vasıta", icon: "🚗" }, 
          { id: "Temizlik", icon: "🧹" }, { id: "Turizm", icon: "🏨" },
          { id: "Tamir & Bakım", icon: "🔧" }, { id: "Teknoloji", icon: "💻" },
          { id: "Moda", icon: "👕" }, { id: "2. El Eşya", icon: "♻️" }
        ].map(k => (
          <div key={k.id} className="cat-card" onClick={() => router.push(`/ilanlar?kategori=${encodeURIComponent(k.id)}`)}>
            <div className="cat-icon">{k.icon}</div>
            <div className="cat-name">{k.id}</div>
          </div>
        ))}
      </div>

      {/* VİTRİN */}
      <main className="vitrin">
        <div className="section-title">
          <span>🔥 Vitrin İlanları</span>
          <span className="section-link" onClick={() => router.push('/ilanlar')}>Tüm İlanları Gör →</span>
        </div>
        
        {yukleniyor ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--mid)' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>⏳</h2>
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Vitrin hazırlanıyor...</p>
          </div>
        ) : ilanlar.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '24px', border: '2px dashed var(--border)' }}>
            <h2 style={{ fontSize: '4rem', marginBottom: '16px' }}>📭</h2>
            <p style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1.2rem', marginBottom: '8px' }}>Henüz vitrinde ilan yok.</p>
            <p style={{ color: 'var(--mid)', marginBottom: '24px', fontWeight: 500 }}>Vitrindeki yerini almak için ilk ilanı sen ver!</p>
            <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }} onClick={() => router.push('/ilan-ver')}>Hemen İlan Ver</button>
          </div>
        ) : (
          <div className="grid">
            {ilanlar.map((ilan) => (
              <div key={ilan._id} className="ilan-kart" onClick={() => router.push(`/ilan/${ilan._id}`)}>
                <div className="ilan-resim">
                  {ilan.resimUrl ? (
                    <img src={ilan.resimUrl} alt={ilan.baslik} />
                  ) : (
                    <span>{ilan.tip === "ticari" ? "🏭" : "📋"}</span>
                  )}
                  <span className={`ilan-tip-badge ${ilan.rol === "alan" ? "badge-alan" : "badge-veren"}`}>
                    {ilan.rol === "alan" ? "🙋 Hizmet Al" : "⚡ Hizmet Ver"}
                  </span>
                  {ilan.tip === "ticari" && <span className="badge-tr">🇹🇷 TR Üretimi</span>}
                </div>

                <div className="ilan-body">
                  <div className="ilan-kat">{ilan.kategori || "Genel"}</div>
                  <div className="ilan-baslik">{ilan.baslik}</div>
                  <div className="ilan-meta">
                    <span>📍 {ilan.sehir || "Türkiye Geneli"}</span>
                    <span>📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</span>
                  </div>
                  <div className="ilan-footer">
                    <div className="ilan-butce">
                      {ilan.butceMin > 0 ? `₺${fmt(ilan.butceMin)}–${fmt(ilan.butceMax)}` : 'Bütçe Açık'}
                    </div>
                    <button className="ilan-btn-incele">İncele →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
