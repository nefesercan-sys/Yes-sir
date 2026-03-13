"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface Ilan {
  _id: string;
  baslik: string;
  kategori: string;
  tip: "bireysel" | "ticari";
  rol: "alan" | "veren";
  sehir: string;
  ulke?: string;
  butceMin: number;
  butceMax: number;
  butceBirimi?: string;
  resimUrl?: string;
  medyalar?: string[];
  createdAt: string;
}

// 🌍 DİNAMİK KATEGORİ SİSTEMİ (Seçime Göre Değişir)
const KATEGORILER = {
  bireysel: [
    { ad: "Tadilat & Usta", ikon: "🔧" },
    { ad: "Temizlik", ikon: "🧹" },
    { ad: "Nakliyat", ikon: "📦" },
    { ad: "Eğitim & Ders", ikon: "📚" },
    { ad: "Sağlık & Güzellik", ikon: "💅" },
    { ad: "2. El & Takas", ikon: "♻️" },
    { ad: "Evcil Hayvan", ikon: "🐾" },
    { ad: "Araç & Vasıta", ikon: "🚗" },
  ],
  ticari: [
    { ad: "Fason & OEM Üretim", ikon: "🏭" },
    { ad: "Otel & Turizm", ikon: "🏨" },
    { ad: "Lojistik & Gümrük", ikon: "🚢" },
    { ad: "Tekstil & Giyim", ikon: "👗" },
    { ad: "Endüstriyel Makine", ikon: "⚙️" },
    { ad: "Toptan Gıda & Tarım", ikon: "🌾" },
    { ad: "Bilişim & Yazılım", ikon: "💻" },
    { ad: "Kurumsal Danışmanlık", ikon: "📊" },
  ]
};

export default function AnaSayfa() {
  // 🚨 Vercel Build Koruması
  const sessionData = useSession() || {};
  const session = sessionData.data;
  const status = sessionData.status || "loading";
  
  const router = useRouter();
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  // 🎛️ PLATFORMUN KALBİ: ANA ŞALTERLER
  const [niyet, setNiyet] = useState<"almak" | "vermek">("almak");
  const [kimlik, setKimlik] = useState<"bireysel" | "ticari">("bireysel");
  const [seciliKat, setSeciliKat] = useState<string>("");

  useEffect(() => {
    fetch("/api/ilanlar")
      .then(res => res.json())
      .then(data => {
        setIlanlar(data.ilanlar || data.data || []);
        setYukleniyor(false);
      })
      .catch(() => setYukleniyor(false));
  }, []);

  // 🧠 ZEKİ FİLTRE MOTORU
  const gosterilenIlanlar = useMemo(() => {
    return ilanlar.filter(ilan => {
      // NİYET MANTIĞI:
      // Eğer ziyaretçi "Hizmet Almak" istiyorsa, "Hizmet Veren" ilanlarını görmeli.
      // Eğer ziyaretçi "Hizmet Vermek" istiyorsa, "Hizmet Alan" (Talep) ilanlarını görmeli.
      const rolUyumu = niyet === "almak" ? ilan.rol === "veren" : ilan.rol === "alan";
      
      // KİMLİK MANTIĞI: Bireyselse bireysel, Ticariyse ticari
      const kimlikUyumu = ilan.tip === kimlik;
      
      // KATEGORİ MANTIĞI
      const katUyumu = seciliKat === "" || ilan.kategori === seciliKat;

      return rolUyumu && kimlikUyumu && katUyumu;
    });
  }, [ilanlar, niyet, kimlik, seciliKat]);

  // Kimlik değiştiğinde kategoriyi sıfırla
  useEffect(() => { setSeciliKat(""); }, [kimlik]);

  const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(n || 0);

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
        .topbar { background: var(--navy); padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .logo-box { font-family: 'Unbounded', sans-serif; font-weight: 900; color: #fff; font-size: 1.3rem; display: flex; align-items: center; gap: 8px; cursor:pointer;}
        .logo-box .icon { background: var(--red); width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: .8rem; color: #fff; }
        .nav-links { display: flex; gap: 10px; align-items: center; }
        .btn-outline { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); color: #fff; padding: 8px 18px; border-radius: 40px; font-size: .8rem; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .btn-outline:hover { background: rgba(255,255,255,.2); }
        .btn-primary { background: var(--red); color: #fff; padding: 8px 20px; border-radius: 40px; font-size: .8rem; font-weight: 800; cursor: pointer; border: none; transition: 0.2s; }

        /* HERO & SLOGAN */
        .hero { text-align: center; padding: 50px 20px 30px; }
        .hero h1 { font-family: 'Unbounded', sans-serif; color: var(--navy); font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; line-height: 1.1; margin-bottom: 12px; }
        .hero h1 span { color: var(--red); }
        .hero p { color: var(--mid); font-size: 1.1rem; max-width: 600px; margin: 0 auto; font-weight: 500; }

        /* KONTROL ŞALTERLERİ */
        .controls-wrapper { max-width: 800px; margin: 0 auto 30px; padding: 0 20px; }
        
        .toggle-row { display: flex; gap: 10px; margin-bottom: 14px; background: white; padding: 8px; border-radius: 20px; border: 1.5px solid var(--border); box-shadow: 0 8px 24px rgba(0,0,0,0.04); }
        .toggle-btn { flex: 1; padding: 14px; border-radius: 14px; border: none; font-size: 1rem; font-weight: 800; cursor: pointer; transition: 0.2s; display: flex; flex-direction: column; align-items: center; gap: 4px; font-family: inherit; }
        .toggle-btn span { font-size: .75rem; font-weight: 600; opacity: 0.8; }
        
        /* Niyet (Al/Ver) Renkleri */
        .niyet-btn { background: transparent; color: var(--mid); }
        .niyet-btn.active.almak { background: var(--navy); color: white; box-shadow: 0 4px 12px rgba(13,27,62,0.3); }
        .niyet-btn.active.vermek { background: var(--red); color: white; box-shadow: 0 4px 12px rgba(232,54,26,0.3); }

        /* Kimlik (Bireysel/Ticari) Renkleri */
        .kimlik-row { display: flex; gap: 10px; justify-content: center; }
        .kimlik-btn { padding: 10px 24px; border-radius: 40px; font-weight: 800; font-size: .85rem; cursor: pointer; border: 2px solid var(--border); background: white; color: var(--mid); transition: 0.2s; }
        .kimlik-btn.active.bireysel { border-color: var(--blue); color: var(--blue); background: #eff6ff; }
        .kimlik-btn.active.ticari { border-color: var(--gold); color: #b45309; background: #fffbeb; }

        /* KATEGORİLER */
        .cats-scroll { display: flex; gap: 12px; overflow-x: auto; padding: 10px 20px 20px; max-width: 1200px; margin: 0 auto; scrollbar-width: none; }
        .cats-scroll::-webkit-scrollbar { display: none; }
        .cat-card { background: white; border: 1.5px solid var(--border); border-radius: 16px; padding: 14px 20px; display: flex; align-items: center; gap: 10px; flex-shrink: 0; cursor: pointer; transition: 0.2s; font-weight: 700; color: var(--mid); font-size: .85rem; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .cat-card:hover { border-color: var(--navy); color: var(--navy); transform: translateY(-2px); }
        .cat-card.active { background: var(--navy); border-color: var(--navy); color: white; }

        /* VİTRİN GRID */
        .vitrin { max-width: 1200px; margin: 0 auto; padding: 0 20px 80px; }
        .vitrin-baslik { font-family: 'Unbounded', sans-serif; font-size: 1.4rem; font-weight: 800; color: var(--navy); margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;}
        
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        
        .ilan-kart { background: white; border-radius: 18px; border: 1.5px solid var(--border); overflow: hidden; transition: 0.2s; cursor: pointer; display: flex; flex-direction: column; }
        .ilan-kart:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); border-color: var(--navy); }
        .ilan-resim { height: 180px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 3rem; position: relative; }
        .ilan-resim img { width: 100%; height: 100%; object-fit: cover; }
        
        /* ROZETLER */
        .badge { position: absolute; top: 12px; left: 12px; font-size: .65rem; font-weight: 800; padding: 5px 12px; border-radius: 8px; letter-spacing: .05em; text-transform: uppercase; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
        .badge-hizmet { background: var(--navy); color: white; }
        .badge-talep { background: white; color: var(--red); border: 2px solid var(--red); }
        .badge-kimlik { position: absolute; bottom: 12px; left: 12px; font-size: .65rem; font-weight: 800; padding: 4px 10px; border-radius: 8px; background: rgba(0,0,0,0.7); color: white; backdrop-filter: blur(4px);}

        .ilan-body { padding: 18px; flex: 1; display: flex; flex-direction: column; }
        .ilan-kat { font-size: .7rem; font-weight: 800; color: var(--mid); margin-bottom: 6px; text-transform: uppercase; }
        .ilan-baslik { font-weight: 800; font-size: 1.05rem; line-height: 1.3; color: var(--ink); margin-bottom: 12px; flex: 1; }
        .ilan-meta { display: flex; gap: 12px; font-size: .75rem; color: var(--mid); font-weight: 600; margin-bottom: 16px; }
        
        .ilan-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--border); }
        .ilan-butce { font-family: 'Unbounded', sans-serif; font-weight: 800; font-size: 1.05rem; color: var(--green); }
        .btn-aksiyon { background: var(--red); color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; font-size: .75rem; cursor: pointer; transition: 0.2s; }
        .btn-aksiyon:hover { background: #c42d14; }

        .bos-durum { text-align: center; padding: 60px 20px; background: white; border-radius: 20px; border: 2px dashed var(--border); }
        
        @media(max-width: 600px) {
          .nav-links span { display: none; }
          .toggle-row { flex-direction: column; }
          .hero { padding: 30px 16px 20px; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="topbar">
        <div className="logo-box" onClick={() => router.push('/')}>
          <div className="icon">S</div>
          Swap<span>Hubs</span>
        </div>
        <div className="nav-links">
          {status === 'authenticated' ? (
            <button className="btn-outline" onClick={() => router.push('/panel')}>👤 <span>Panelim</span></button>
          ) : (
            <button className="btn-outline" onClick={() => router.push('/giris')}>Giriş Yap</button>
          )}
          <button className="btn-primary" onClick={() => router.push('/ilan-ver')}>➕ İlan Ver</button>
        </div>
      </nav>

      {/* HERO & SLOGAN */}
      <header className="hero">
        <h1>Hizmet Al. Hizmet Ver.<br/><span>Güvenle Ticaret Yap.</span></h1>
        <p>Türkiye'nin yeni nesil bireysel ve ticari pazar yeri. Seçiminizi yapın ve küresel ağa katılın.</p>
      </header>

      {/* KONTROL ŞALTERLERİ (PLATFORMUN KALBİ) */}
      <div className="controls-wrapper">
        
        {/* NİYET ŞALTERİ */}
        <div className="toggle-row">
          <button 
            className={`toggle-btn niyet-btn ${niyet === 'almak' ? 'active almak' : ''}`}
            onClick={() => setNiyet('almak')}
          >
            🛒 Hizmet veya Ürün Satın Alacağım
            <span>(Satıcıların / Üreticilerin ilanlarını listele)</span>
          </button>
          <button 
            className={`toggle-btn niyet-btn ${niyet === 'vermek' ? 'active vermek' : ''}`}
            onClick={() => setNiyet('vermek')}
          >
            💼 Hizmet veya Ürün Satacağım
            <span>(İş arayanların / Müşterilerin taleplerini listele)</span>
          </button>
        </div>

        {/* KİMLİK ŞALTERİ */}
        <div className="kimlik-row">
          <button 
            className={`kimlik-btn ${kimlik === 'bireysel' ? 'active bireysel' : ''}`}
            onClick={() => setKimlik('bireysel')}
          >
            👤 BİREYSEL KULLANICI
          </button>
          <button 
            className={`kimlik-btn ${kimlik === 'ticari' ? 'active ticari' : ''}`}
            onClick={() => setKimlik('ticari')}
          >
            🏭 TİCARİ & ENDÜSTRİYEL
          </button>
        </div>

      </div>

      {/* DİNAMİK KATEGORİ ŞERİDİ */}
      <div className="cats-scroll">
        <div 
          className={`cat-card ${seciliKat === "" ? 'active' : ''}`} 
          onClick={() => setSeciliKat("")}
        >
          <span>🌐</span> Tümü
        </div>
        {KATEGORILER[kimlik].map(k => (
          <div 
            key={k.ad} 
            className={`cat-card ${seciliKat === k.ad ? 'active' : ''}`} 
            onClick={() => setSeciliKat(k.ad)}
          >
            <span>{k.ikon}</span> {k.ad}
          </div>
        ))}
      </div>

      {/* VİTRİN GRID */}
      <main className="vitrin">
        <div className="vitrin-baslik">
          {niyet === "almak" ? "Hizmet Verenler & Üreticiler" : "Gelen Talepler & İş Fırsatları"}
          <span style={{fontSize:'.9rem', color:'var(--mid)', fontWeight:600}}>{gosterilenIlanlar.length} sonuç bulundu</span>
        </div>

        {yukleniyor ? (
          <div className="bos-durum">
            <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>⏳</h2>
            <p style={{ fontWeight: 700, fontSize: '1.2rem', color:'var(--navy)' }}>Pazar yeri yükleniyor...</p>
          </div>
        ) : gosterilenIlanlar.length === 0 ? (
          <div className="bos-durum">
            <h2 style={{ fontSize: '4rem', marginBottom: '16px' }}>📭</h2>
            <p style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '8px' }}>Bu kriterlere uygun ilan bulunamadı.</p>
            <p style={{ color: 'var(--mid)', marginBottom: '24px', fontWeight: 600 }}>
              AI Motoru ile sahte ilanlar oluşturarak bu kategoriyi doldurabilir veya kendi ilanınızı verebilirsiniz.
            </p>
            <div style={{display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap'}}>
              <button className="btn-primary" onClick={() => router.push(`/ilan-ver?tip=${kimlik}&rol=${niyet === 'almak' ? 'alan' : 'veren'}`)}>İlk İlanı Sen Ver</button>
              {status === 'authenticated' && (
                <button className="btn-outline" style={{background:'var(--navy)', borderColor:'var(--navy)'}} onClick={() => router.push('/panel?tab=ai_ilan')}>🤖 AI ile İlan Üret</button>
              )}
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
                  <span className={`badge ${ilan.rol === 'veren' ? 'badge-hizmet' : 'badge-talep'}`}>
                    {ilan.rol === 'veren' ? '💼 HİZMET/ÜRETİM YAPIYOR' : '🙋 TALEP/İŞ VERİYOR'}
                  </span>
                  <span className="badge-kimlik">
                    {ilan.tip === 'ticari' ? '🏭 TİCARİ' : '👤 BİREYSEL'}
                  </span>
                </div>

                <div className="ilan-body">
                  <div className="ilan-kat">{ilan.kategori || "Genel Kategori"}</div>
                  <div className="ilan-baslik">{ilan.baslik}</div>
                  <div className="ilan-meta">
                    <span>📍 {ilan.ulke && ilan.ulke !== 'Türkiye' ? `${ilan.ulke} - ` : ''}{ilan.sehir || "Global"}</span>
                    <span>📅 {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}</span>
                  </div>
                  <div className="ilan-footer">
                    <div className="ilan-butce">
                      {ilan.butceMin > 0 ? `${fmt(ilan.butceMin)} ${ilan.butceBirimi || '₺'}` : 'Bütçe Açık'}
                    </div>
                    <button className="btn-aksiyon">
                      {niyet === 'almak' ? 'Sipariş/Teklif İste →' : 'Teklif Ver →'}
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
