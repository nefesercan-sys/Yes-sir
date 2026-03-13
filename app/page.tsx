"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface Ilan {
  _id: string;
  baslik: string;
  kategori: string;
  tip: "bireysel" | "ticari"; // Bireysel mi Kurumsal mı?
  rol: "alan" | "veren";      // Hizmet/Ürün Alan mı, Veren/Üreten mi?
  sehir: string;
  ulke?: string;
  butceMin: number;
  butceMax: number;
  butceBirimi?: string;
  resimUrl?: string;
  medyalar?: string[];
  createdAt: string;
}

// 🌍 DİNAMİK KATEGORİ SİSTEMİ
const KATEGORILER = {
  bireysel: [
    { id: "Tümü", icon: "🌐" },
    { id: "Tadilat & Usta", icon: "🔧" },
    { id: "Temizlik", icon: "🧹" },
    { id: "Nakliyat", icon: "📦" },
    { id: "Eğitim & Özel Ders", icon: "📚" },
    { id: "Sağlık & Güzellik", icon: "💅" },
    { id: "2. El & Takas", icon: "♻️" },
    { id: "Evcil Hayvan", icon: "🐾" },
  ],
  ticari: [
    { id: "Tümü", icon: "🌐" },
    { id: "Fason & OEM Üretim", icon: "🏭" },
    { id: "Otel & Turizm", icon: "🏨" },
    { id: "Tekstil & Konfeksiyon", icon: "👗" },
    { id: "Makine & Endüstri", icon: "⚙️" },
    { id: "Gıda & Tarım İhracatı", icon: "🌾" },
    { id: "Lojistik & Gümrük", icon: "🚢" },
    { id: "Bilişim & Yazılım", icon: "💻" },
  ]
};

export default function AnaSayfa() {
  const sessionData = useSession() || {};
  const session = sessionData.data;
  const status = sessionData.status || "loading";
  const router = useRouter();

  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aramaQ, setAramaQ] = useState("");

  // 🎛️ ANA ŞALTERLER (Platformun Kalbi)
  const [aktifTip, setAktifTip] = useState<"bireysel" | "ticari">("ticari");
  const [aktifRol, setAktifRol] = useState<"alan" | "veren">("alan");
  const [aktifKategori, setAktifKategori] = useState("Tümü");

  useEffect(() => {
    fetch("/api/ilanlar") // Tüm ilanları çekiyoruz, filtrelemeyi ekranda yapacağız
      .then(res => res.json())
      .then(data => {
        setIlanlar(data.ilanlar || data.data || []);
        setYukleniyor(false);
      })
      .catch(() => setYukleniyor(false));
  }, []);

  // 🧠 ANLIK VİTRİN FİLTRESİ
  const gosterilenIlanlar = useMemo(() => {
    return ilanlar.filter(ilan => {
      const tipUyusuyor = ilan.tip === aktifTip;
      const rolUyusuyor = ilan.rol === aktifRol;
      const katUyusuyor = aktifKategori === "Tümü" || ilan.kategori === aktifKategori;
      const aramaUyusuyor = !aramaQ || ilan.baslik.toLowerCase().includes(aramaQ.toLowerCase()) || ilan.sehir?.toLowerCase().includes(aramaQ.toLowerCase());
      return tipUyusuyor && rolUyusuyor && katUyusuyor && aramaUyusuyor;
    });
  }, [ilanlar, aktifTip, aktifRol, aktifKategori, aramaQ]);

  const handleArama = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(n || 0);

  // Görsel bulucu
  const getGorsel = (ilan: Ilan) => {
    if (ilan.resimUrl) return ilan.resimUrl;
    if (ilan.medyalar && ilan.medyalar.length > 0) return ilan.medyalar[0];
    return null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Unbounded:wght@700;900&display=swap');
        :root{--ink:#080811;--cream:#f8fafc;--red:#e8361a;--gold:#f5a623;--navy:#0d1b3e;--mid:#475569;--border:#e2e8f0;--green:#10b981;--blue:#2563eb;}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:var(--cream);color:var(--ink)}
        
        /* NAVBAR */
        .topbar { background: var(--navy); padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; gap: 12px; position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .logo-box { font-family: 'Unbounded', sans-serif; font-weight: 900; color: #fff; font-size: 1.2rem; display: flex; align-items: center; gap: 8px; cursor:pointer;}
        .logo-box .icon { background: var(--red); width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: .8rem; color: #fff; }
        .nav-links { display: flex; gap: 10px; align-items: center; }
        .btn-outline { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); color: #fff; padding: 8px 18px; border-radius: 40px; font-size: .8rem; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .btn-outline:hover { background: rgba(255,255,255,.2); }
        .btn-primary { background: var(--red); color: #fff; padding: 8px 20px; border-radius: 40px; font-size: .8rem; font-weight: 800; cursor: pointer; border: none; transition: 0.2s; }
        
        /* MEGA HERO & KONTROL PANELİ */
        .hero { background: linear-gradient(135deg, var(--navy) 0%, #1e3a8a 100%); padding: 60px 20px 100px; text-align: center; position: relative; }
        .hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 50px; background: var(--cream); border-top-left-radius: 50px; border-top-right-radius: 50px; }
        .hero h1 { font-family: 'Unbounded', sans-serif; color: white; font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; line-height: 1.2; margin-bottom: 12px; }
        .hero p { color: rgba(255,255,255,0.8); font-size: 1.1rem; max-width: 700px; margin: 0 auto 30px; }

        /* ŞALTERLER (TOGGLES) */
        .master-controls { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 24px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .toggle-group { display: flex; background: rgba(0,0,0,0.2); border-radius: 12px; padding: 6px; margin-bottom: 20px; }
        .toggle-btn { flex: 1; padding: 12px; border-radius: 8px; border: none; font-family: 'Unbounded', sans-serif; font-size: .9rem; font-weight: 700; color: rgba(255,255,255,0.6); background: transparent; cursor: pointer; transition: 0.3s; }
        .toggle-btn.active.ticari { background: var(--gold); color: var(--navy); box-shadow: 0 4px 12px rgba(245,166,35,0.4); }
        .toggle-btn.active.bireysel { background: var(--blue); color: white; box-shadow: 0 4px 12px rgba(37,99,235,0.4); }
        
        .sub-toggle { display: flex; gap: 10px; margin-bottom: 20px; }
        .sub-btn { flex: 1; padding: 14px; border-radius: 12px; border: 2px solid transparent; font-weight: 800; font-size: 1rem; cursor: pointer; transition: 0.2s; display:flex; flex-direction:column; align-items:center; gap:4px;}
        .sub-btn span { font-size: .7rem; font-weight: 600; opacity: 0.8; }
        .sub-btn:not(.active) { background: rgba(255,255,255,0.05); color: white; border-color: rgba(255,255,255,0.1); }
        .sub-btn.active.alan { background: white; color: var(--navy); border-color: var(--blue); box-shadow: 0 0 20px rgba(255,255,255,0.2); }
        .sub-btn.active.veren { background: var(--red); color: white; border-color: #ff6b52; box-shadow: 0 0 20px rgba(232,54,26,0.4); }

        .search-box { display: flex; background: white; padding: 6px; border-radius: 12px; }
        .search-box input { flex: 1; border: none; padding: 12px 16px; font-size: .95rem; font-family: inherit; font-weight: 600; outline: none; background: transparent;}
        .search-box button { background: var(--navy); color: white; border: none; padding: 0 24px; border-radius: 8px; font-weight: 700; cursor: pointer; }

        /* KATEGORİ ŞERİDİ */
        .cats { max-width: 1200px; margin: 0 auto 40px; padding: 0 24px; display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none; position: relative; z-index: 10;}
        .cats::-webkit-scrollbar { display: none; }
        .cat-card { background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 12px 20px; display: flex; align-items: center; gap: 10px; flex-shrink: 0; cursor: pointer; transition: 0.2s; font-weight: 700; color: var(--mid); font-size: .85rem; }
        .cat-card:hover { border-color: var(--blue); color: var(--navy); }
        .cat-card.active { background: var(--navy); border-color: var(--navy); color: white; }

        /* VİTRİN */
        .vitrin { max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }
        .vitrin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; border-bottom: 2px solid var(--border); padding-bottom: 16px;}
        .vitrin-title { font-family: 'Unbounded', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--navy); }
        .vitrin-subtitle { font-size: .9rem; color: var(--mid); font-weight: 600; }
        
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }

        /* KART TASARIMI */
        .ilan-kart{background:#fff;border-radius:16px;border:1px solid var(--border); overflow:hidden;transition:0.2s;display:flex;flex-direction:column; cursor: pointer;}
        .ilan-kart:hover{transform:translateY(-4px);box-shadow:0 12px 24px rgba(0,0,0,.06); border-color: var(--blue);}
        .ilan-resim{width:100%;height:180px;background:#f1f5f9; display:flex;align-items:center;justify-content:center;font-size:3rem; position:relative;}
        .ilan-resim img{width:100%;height:100%;object-fit:cover}
        
        /* ROZETLER */
        .badges { position: absolute; top: 12px; left: 12px; display: flex; flex-direction: column; gap: 6px; }
        .badge { font-size: .65rem; font-weight: 800; padding: 4px 10px; border-radius: 8px; letter-spacing: .05em; text-transform: uppercase; box-shadow: 0 4px 10px rgba(0,0,0,0.15);}
        .b-ticari { background: var(--gold); color: var(--navy); }
        .b-bireysel { background: var(--blue); color: white; }
        .b-talep { background: white; color: var(--navy); border: 2px solid var(--navy); }
        .b-hizmet { background: var(--red); color: white; }

        .ilan-body{padding:16px;flex:1;display:flex;flex-direction:column}
        .ilan-kat{font-size:.7rem; font-weight:800; color:var(--blue); margin-bottom:6px; text-transform: uppercase;}
        .ilan-baslik{font-weight:800;font-size:1.1rem;line-height:1.3;margin-bottom:12px;flex:1; color: var(--ink);}
        .ilan-meta{display:flex;gap:12px;font-size:.75rem;color:var(--mid); margin-bottom:16px; font-weight: 600;}
        
        .ilan-footer{display:flex;align-items:center;justify-content:space-between; padding-top:16px;border-top:1px solid var(--border)}
        .ilan-butce{font-family:'Unbounded',sans-serif;font-weight:800;font-size:1.1rem; color: var(--green);}
        .ilan-btn { background: var(--navy); color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-size: .75rem; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .ilan-btn.teklif-ver { background: var(--red); }
        .ilan-btn:hover { opacity: 0.9; transform: scale(1.05); }

        .empty-state { text-align: center; padding: 60px 20px; background: white; border-radius: 24px; border: 2px dashed var(--border); }

        @media(max-width: 768px) {
          .nav-links span { display: none; }
          .hero h1 { font-size: 1.5rem; }
          .sub-toggle { flex-direction: column; gap: 8px;}
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="topbar">
        <div className="logo-box" onClick={() => router.push('/')}>
          <div className="icon">S</div>
          Swap<span>Hubs</span>
        </div>
        <div className="nav-links">
          <button className="btn-outline" onClick={() => router.push('/ilanlar')}>🔍 <span>Keşfet</span></button>
          {status === 'authenticated' ? (
            <button className="btn-outline" onClick={() => router.push('/panel')}>👤 <span>Panelim</span></button>
          ) : (
            <button className="btn-outline" onClick={() => router.push('/giris')}>Giriş Yap</button>
          )}
        </div>
      </nav>

      {/* MEGA HERO & KONTROL PANELİ */}
      <header className="hero">
        <h1>Global Hizmet & Üretim Ağı</h1>
        <p>Aradığınız fason üreticiyi bulun, otelinize müşteri çekin veya evinize usta çağırın. Tüm dünya SwapHubs'ta buluşuyor.</p>
        
        <div className="master-controls">
          {/* 1. ŞALTER: Bireysel mi Ticari mi? */}
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${aktifTip === 'bireysel' ? 'active bireysel' : ''}`}
              onClick={() => { setAktifTip('bireysel'); setAktifKategori('Tümü'); }}
            >
              👤 BİREYSEL MÜŞTERİ
            </button>
            <button 
              className={`toggle-btn ${aktifTip === 'ticari' ? 'active ticari' : ''}`}
              onClick={() => { setAktifTip('ticari'); setAktifKategori('Tümü'); }}
            >
              🏭 TİCARİ & ENDÜSTRİYEL
            </button>
          </div>

          {/* 2. ŞALTER: Alıyor mu Veriyor mu? */}
          <div className="sub-toggle">
            <button 
              className={`sub-btn alan ${aktifRol === 'alan' ? 'active' : ''}`}
              onClick={() => setAktifRol('alan')}
            >
              🛒 {aktifTip === 'ticari' ? 'Tedarikçi / Üretici Arıyorum' : 'Hizmet Almak İstiyorum'}
              <span>(İlan verin, teklifler size gelsin)</span>
            </button>
            <button 
              className={`sub-btn veren ${aktifRol === 'veren' ? 'active' : ''}`}
              onClick={() => setAktifRol('veren')}
            >
              💼 {aktifTip === 'ticari' ? 'Üretim / Kapasite Sunuyorum' : 'Hizmet Vermek İstiyorum'}
              <span>(Hizmetinizi sergileyin, müşteri bulalım)</span>
            </button>
          </div>

          <form className="search-box" onSubmit={handleArama}>
            <input 
              type="text" 
              placeholder={aktifTip === 'ticari' ? "Örn: İzmir Fason Tekstil, Antalya Otel..." : "Örn: Boya Ustası, İngilizce Dersi..."}
              value={aramaQ}
              onChange={(e) => setAramaQ(e.target.value)}
            />
            <button type="submit">Listele</button>
          </form>
        </div>
      </header>

      {/* DİNAMİK KATEGORİ ŞERİDİ */}
      <div className="cats">
        {KATEGORILER[aktifTip].map(k => (
          <div 
            key={k.id} 
            className={`cat-card ${aktifKategori === k.id ? 'active' : ''}`} 
            onClick={() => setAktifKategori(k.id)}
          >
            <span>{k.icon}</span> {k.id}
          </div>
        ))}
      </div>

      {/* VİTRİN */}
      <main className="vitrin">
        <div className="vitrin-header">
          <div>
            <h2 className="vitrin-title">
              {aktifTip === 'ticari' ? '🏭 Ticari Pazar Yeri' : '👤 Bireysel İlanlar'}
            </h2>
            <p className="vitrin-subtitle">
              {aktifRol === 'alan' ? 'Gelen talepleri inceleyin ve teklif verin.' : 'Sunulan hizmetleri inceleyin ve satın alın.'}
            </p>
          </div>
          <button className="btn-primary" onClick={() => router.push(`/ilan-ver?tip=${aktifTip}&rol=${aktifRol}`)}>
            {aktifRol === 'alan' ? '➕ Talep İlanı Oluştur' : '➕ Hizmet İlanı Oluştur'}
          </button>
        </div>
        
        {yukleniyor ? (
          <div className="empty-state">
            <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>⏳</h2>
            <p style={{ fontWeight: 700, fontSize: '1.2rem', color:'var(--navy)' }}>Küresel Pazar Yeri Yükleniyor...</p>
          </div>
        ) : gosterilenIlanlar.length === 0 ? (
          <div className="empty-state">
            <h2 style={{ fontSize: '4rem', marginBottom: '16px' }}>📭</h2>
            <p style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '8px' }}>Bu kriterlere uygun ilan bulunamadı.</p>
            <p style={{ color: 'var(--mid)', marginBottom: '24px', fontWeight: 600 }}>
              AI Motorunu kullanarak bu kategoriyi doldurabilir veya ilk ilanı siz verebilirsiniz!
            </p>
            <div style={{display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap'}}>
              <button className="btn-primary" onClick={() => router.push(`/ilan-ver?tip=${aktifTip}&rol=${aktifRol}`)}>Hemen İlan Ver</button>
              <button className="btn-outline" style={{background:'var(--navy)'}} onClick={() => router.push('/panel?tab=ai_ilan')}>🤖 AI ile Doldur</button>
            </div>
          </div>
        ) : (
          <div className="grid">
            {gosterilenIlanlar.map((ilan) => (
              <div key={ilan._id} className="ilan-kart" onClick={() => router.push(`/ilan/${ilan._id}`)}>
                <div className="ilan-resim">
                  {getGorsel(ilan) ? (
                    <img src={getGorsel(ilan)!} alt={ilan.baslik} />
                  ) : (
                    <span>{ilan.tip === "ticari" ? "🏭" : "📋"}</span>
                  )}
                  
                  {/* ROZET SİSTEMİ */}
                  <div className="badges">
                    <span className={`badge ${ilan.tip === 'ticari' ? 'b-ticari' : 'b-bireysel'}`}>
                      {ilan.tip === 'ticari' ? 'KURUMSAL / TİCARİ' : 'BİREYSEL'}
                    </span>
                    <span className={`badge ${ilan.rol === 'alan' ? 'b-talep' : 'b-hizmet'}`}>
                      {ilan.rol === 'alan' ? '🙋 İŞ YAPTIRACAK (TALEP)' : '💼 HİZMET/ÜRETİM YAPIYOR'}
                    </span>
                  </div>
                </div>

                <div className="ilan-body">
                  <div className="ilan-kat">{ilan.kategori || "Genel"}</div>
                  <div className="ilan-baslik">{ilan.baslik}</div>
                  <div className="ilan-meta">
                    <span>📍 {ilan.ulke && ilan.ulke !== 'Türkiye' ? `${ilan.ulke} - ` : ''}{ilan.sehir || "Global"}</span>
                    <span>📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</span>
                  </div>
                  <div className="ilan-footer">
                    <div className="ilan-butce">
                      {ilan.butceMin > 0 ? `${fmt(ilan.butceMin)} - ${fmt(ilan.butceMax)} ${ilan.butceBirimi || '₺'}` : 'Bütçe Açık'}
                    </div>
                    <button className={`ilan-btn ${ilan.rol === 'alan' ? 'teklif-ver' : ''}`}>
                      {ilan.rol === 'alan' ? 'Teklif Ver →' : 'Teklif İste →'}
                    </button>
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
