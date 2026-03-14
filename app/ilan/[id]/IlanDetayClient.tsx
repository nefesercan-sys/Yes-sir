'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import TeklifModal from '@/components/TeklifModal';
import TalepModal  from '@/components/TalepModal';

interface IlanDetay {
  _id:          string;
  baslik:       string;
  kategoriAd?:  string;
  sektorId:     string;
  tip:          'bireysel' | 'ticari';
  rol:          'alan' | 'veren';
  yapay?:       boolean;
  is_ai_generated?: boolean;
  sehir?:       string;
  ulke?:        string;
  butceMin:     number;
  butceMax:     number;
  butceBirimi?: string;
  resimUrl?:    string;
  medyalar?:    string[];
  teklifSayisi: number;
  ozellikler?:  string[];
  teslimat?:    string[];
  formData?: {
    sehir?:      string;
    aciklama?:   string;
    ozellikler?: string[];
  };
  seo?: {
    metaBaslik?:       string;
    metaAciklama?:     string;
    anahtarKelimeler?: string[];
    slug?:             string;
  };
  createdAt: string;
}

const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(n);

const SEKTOR_ADLARI: Record<string, string> = {
  turizm:'Turizm & Konaklama', seyahat:'Seyahat & Transfer', kiralama:'Kiralama',
  tamir:'Tamir & Bakım', usta:'Usta & İşçi', temizlik:'Temizlik Hizmetleri',
  uretim:'Üretim & Özel Sipariş', giyim:'Giyim & Tekstil', saglik:'Sağlık & Güzellik',
  egitim:'Eğitim & Danışmanlık', etkinlik:'Etkinlik & Düğün', mobilya:'Mobilya & Dekorasyon',
  tekstil:'Tekstil & Hazır Giyim', 'mermer-tas':'Mermer & Doğal Taş',
  'metal-celik':'Metal & Çelik', 'plastik-pvc':'Plastik & PVC',
  'ahsap-mob':'Ahşap & Mobilya', 'gida-tarim':'Gıda & Tarım Ürünleri',
  'insaat-malz':'İnşaat Malzemeleri', elektrik:'Elektrik & Enerji',
  makine:'Makine & Ekipman', lojistik:'Lojistik & Nakliyat',
  'kimya-boya':'Kimya & Boya', 'saglik-med':'Sağlık & Medikal',
};

function sektorEmoji(id: string): string {
  const map: Record<string, string> = {
    turizm:'🏨', seyahat:'✈️', kiralama:'🔑', tamir:'🔧', usta:'👷',
    temizlik:'🧹', uretim:'🏭', giyim:'👗', saglik:'💊', egitim:'📚',
    etkinlik:'🎊', mobilya:'🪑', tekstil:'👕', 'mermer-tas':'🪨',
    'metal-celik':'⚙️', 'plastik-pvc':'🧴', 'ahsap-mob':'🪵',
    'gida-tarim':'🌾', 'insaat-malz':'🏗️', elektrik:'⚡',
    makine:'🏭', lojistik:'🚢', 'kimya-boya':'🧪', 'saglik-med':'🏥',
  };
  return map[id] ?? '📋';
}

function IlanDetayIcerik({ id }: { id: string }) {
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const action        = searchParams.get('action');

  const [ilan,           setIlan]           = useState<IlanDetay | null>(null);
  const [benzerIlanlar,  setBenzerIlanlar]  = useState<IlanDetay[]>([]);
  const [yukleniyor,     setYukleniyor]     = useState(true);
  const [teklifModal,    setTeklifModal]    = useState(action === 'teklif');
  const [talepModal,     setTalepModal]     = useState(action === 'talep');

  useEffect(() => {
    // 1. Ana İlanı Çek
    fetch(`/api/ilanlar/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.ilan) {
          setIlan(d.ilan);
          // 2. İlan başarıyla yüklendiğinde, aynı sektöre ait benzer ilanları çek (SEO & UX için)
          fetch(`/api/ilanlar?sektor=${d.ilan.sektorId}&limit=10`)
            .then(res => res.json())
            .then(data => {
              const liste = data.ilanlar || data.data || data || [];
              // Şu an içinde bulunduğumuz ilanı (kendisini) listeden çıkarıp ilk 8 tanesini al
              setBenzerIlanlar(liste.filter((i: IlanDetay) => i._id !== id).slice(0, 8));
            });
        }
      })
      .catch(() => {})
      .finally(() => setYukleniyor(false));
  }, [id]);

  if (yukleniyor) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
      height:'70vh', fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#aaa', gap:10 }}>
      <span style={{ fontSize:'1.4rem' }}>⏳</span> Yükleniyor...
    </div>
  );

  if (!ilan) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', height:'70vh',
      fontFamily:"'Plus Jakarta Sans',sans-serif", gap:14 }}>
      <span style={{ fontSize:'3rem' }}>🔍</span>
      <h2 style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:900, fontSize:'1.2rem' }}>
        İlan bulunamadı
      </h2>
      <p style={{ color:'#6b6984', fontSize:'.88rem' }}>Bu ilan kaldırılmış veya mevcut değil.</p>
      <button onClick={() => router.push('/ilanlar')}
        style={{ background:'#e8361a', color:'#fff', border:'none', padding:'10px 24px',
          borderRadius:40, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
        İlanlara Dön
      </button>
    </div>
  );

  const sehir      = ilan.formData?.sehir ?? ilan.sehir ?? '';
  const aciklama   = ilan.formData?.aciklama ?? '';
  const ozellikler = [
    ...(ilan.ozellikler ?? []),
    ...(ilan.formData?.ozellikler ?? []),
  ].filter((v, i, a) => a.indexOf(v) === i);
  const sektorAd = ilan.kategoriAd ?? SEKTOR_ADLARI[ilan.sektorId] ?? ilan.sektorId;
  const birim    = ilan.butceBirimi ?? '₺';
  
  // AI ilanlarında bazen resimUrl, bazen medyalar dizisi kullanıldığı için ikisini de kontrol ediyoruz
  const ilanResmi = ilan.resimUrl || ilan.medyalar?.[0] || null;

  const handleSohbetBaslat = () => {
    router.push(`/panel?tab=mesajlar&yeniSohbet=${ilan._id}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Unbounded:wght@700;900&display=swap');
        :root{--ink:#080811;--cream:#f7f5f0;--red:#e8361a;--gold:#f5a623;
          --navy:#0d1b3e;--mid:#4a4860;--border:#e4e1db;--green:#18a558; --blue:#2563eb}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:var(--cream);color:var(--ink)}
        .topbar{background:var(--navy);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px; position: sticky; top: 0; z-index: 100;}
        .topbar-logo{font-family:'Unbounded',sans-serif;font-weight:900;color:#fff;font-size:1rem;display:flex;align-items:center;gap:8px; cursor: pointer;}
        .logo-icon{background:var(--red);width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:.8rem;color:#fff;font-weight:900;flex-shrink:0}
        .topbar-logo span{color:var(--red)}
        .topbar-geri{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#fff;padding:7px 16px;border-radius:40px;font-size:.78rem;font-weight:600;cursor:pointer;font-family:inherit; transition: 0.2s;}
        .topbar-geri:hover{background:rgba(255,255,255,.2)}
        .hero-bar{background:linear-gradient(135deg,var(--navy),#1a2d5a);padding:32px 24px 28px}
        .breadcrumb{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:14px}
        .bc{font-size:.7rem;color:rgba(255,255,255,.45);font-weight:600;cursor:pointer}
        .bc:hover{color:rgba(255,255,255,.7)}
        .bc-sep{font-size:.6rem;color:rgba(255,255,255,.2)}
        .bc-aktif{color:var(--gold)!important;cursor:default!important}
        .hero-baslik{font-family:'Unbounded',sans-serif;font-weight:900;font-size:clamp(1.3rem,2.5vw,1.9rem);color:#fff;letter-spacing:-.03em;line-height:1.2;margin-bottom:10px;max-width:800px}
        .hero-meta{display:flex;gap:14px;flex-wrap:wrap;font-size:.78rem;color:rgba(255,255,255,.6)}
        .badge{display:inline-flex;align-items:center;gap:5px;font-size:.64rem;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:.04em}
        .badge-alan{background:rgba(13,27,62,.9);color:#fff}
        .badge-veren{background:rgba(232,54,26,.9);color:#fff}
        .badge-ticari{background:rgba(0,105,161,.85);color:#fff}
        .badge-tr{background:rgba(232,54,26,.9);color:#fff}
        .badge-yapay{background:rgba(124,58,237,.9);color:#fff}
        .detay-wrap{max-width:1060px;margin:0 auto;padding:36px 24px 80px}
        .detay-grid{display:grid;grid-template-columns:1fr 350px;gap:28px;align-items:start}
        .detay-resim{width:100%;height:320px;border-radius:18px;overflow:hidden;background:linear-gradient(135deg,#e8e6e0,#d4d1ca);display:flex;align-items:center;justify-content:center;font-size:5rem;margin-bottom:28px;position:relative}
        .detay-resim img{width:100%;height:100%;object-fit:cover}
        .resim-badges{position:absolute;top:12px;left:12px;display:flex;gap:6px;flex-wrap:wrap}
        .detay-kat-satir{display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap}
        .detay-kat{font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--red);background:rgba(232,54,26,.08);padding:3px 12px;border-radius:20px}
        .detay-aciklama{font-size:.92rem;line-height:1.85;color:#333;margin-bottom:28px}
        .ozellikler-baslik{font-family:'Unbounded',sans-serif;font-weight:800;font-size:.85rem;margin-bottom:12px;color:var(--navy)}
        .ozellikler{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}
        .ozellik{background:#fff;border:1.5px solid var(--border);border-radius:20px;padding:5px 14px;font-size:.75rem;font-weight:600;color:var(--mid)}
        .teslimat-bolum{background:#fff;border:1.5px solid var(--border);border-radius:14px;padding:18px 20px;margin-bottom:24px}
        .teslimat-baslik{font-weight:700;font-size:.82rem;color:var(--navy);margin-bottom:8px}
        .teslimat-item{font-size:.82rem;color:var(--mid);padding:3px 0}
        .seo-keywords{display:none}
        .sidebar{background:#fff;border-radius:20px;border:1.5px solid var(--border);padding:24px;position:sticky;top:90px;overflow:hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.03)}
        .sidebar-header{background:linear-gradient(135deg,var(--navy),#1a2d5a);margin:-24px -24px 20px;padding:24px;border-radius:18px 18px 0 0}
        .sidebar-fiyat{font-family:'Unbounded',sans-serif;font-weight:900;font-size:1.7rem;color:#fff;line-height:1}
        .sidebar-fiyat-lbl{font-size:.68rem;color:rgba(255,255,255,.6);margin-top:5px;font-weight:600}
        .sidebar-btn{width:100%;border:none;padding:14px;border-radius:14px;font-weight:800;font-size:.9rem;cursor:pointer;font-family:inherit;margin-bottom:10px;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1)}
        .sidebar-btn:hover{transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15)}
        .btn-teklif{background:var(--gold);color:var(--navy)}
        .btn-talep{background:var(--navy);color:#fff}
        .btn-mesaj{background:var(--blue);color:#fff}
        .teklif-sayisi-chip{display:flex;align-items:center;justify-content:center;gap:6px;background:rgba(24,165,88,.1);color:var(--green);font-size:.75rem;font-weight:700;padding:7px 14px;border-radius:10px;margin-bottom:16px; border: 1px solid rgba(24,165,88,.2)}
        .sidebar-bilgi{font-size:.72rem;color:var(--mid);text-align:center;line-height:1.7;padding-top:16px;border-top:1px solid var(--border);margin-top:8px}
        .sidebar-detay{font-size:.75rem;color:var(--mid);margin-bottom:18px;display:flex;flex-direction:column;gap:6px}
        .sidebar-detay-item{display:flex;align-items:flex-start;gap:8px;padding:6px 0;border-bottom:1px solid #f5f3ef}
        .sidebar-detay-item:last-child{border-bottom:none}
        .sidebar-detay-deger{font-weight:700;color:var(--ink);font-size:.78rem}

        /* BENZER İLANLAR (YATAY KAYDIRMA / SLIDER CSS) */
        .benzer-ilanlar-section { margin-top: 40px; padding-top: 40px; border-top: 1.5px dashed var(--border); }
        .benzer-ilanlar-baslik { font-family: 'Unbounded', sans-serif; font-size: 1.2rem; font-weight: 800; color: var(--navy); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        .benzer-slider { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 20px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .benzer-slider::-webkit-scrollbar { display: none; }
        .benzer-kart { min-width: 260px; max-width: 260px; background: #fff; border: 1px solid var(--border); border-radius: 16px; flex-shrink: 0; scroll-snap-align: start; overflow: hidden; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; display: flex; flex-direction: column;}
        .benzer-kart:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0,0,0,0.06); border-color: #cbd5e1; }
        .benzer-kart-resim { height: 150px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 3rem; overflow: hidden; position: relative;}
        .benzer-kart-resim img { width: 100%; height: 100%; object-fit: cover; }
        .benzer-kart-icerik { padding: 16px; display: flex; flex-direction: column; flex: 1; }
        .benzer-kart-tip { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--navy); background: #f1f5f9; padding: 4px 8px; border-radius: 6px; display: inline-block; margin-bottom: 8px; align-self: flex-start; }
        .benzer-kart-baslik { font-size: 0.9rem; font-weight: 700; color: var(--ink); line-height: 1.4; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .benzer-kart-alt { display: flex; justify-content: space-between; align-items: center; margin-top: auto; border-top: 1px solid #f1f5f9; padding-top: 12px;}
        .benzer-kart-fiyat { font-weight: 800; color: var(--green); font-size: 0.95rem; }
        .benzer-kart-lokasyon { font-size: 0.7rem; color: var(--mid); font-weight: 600; display: flex; align-items: center; gap: 4px; }

        @media(max-width:800px){.detay-grid{grid-template-columns:1fr}.sidebar{position:static}.detay-resim{height:220px}}
      `}</style>

      <div className="topbar">
        <div className="topbar-logo" onClick={() => router.push('/')}>
          <div className="logo-icon">S</div>
          Swap<span>Hubs</span>
        </div>
        <button className="topbar-geri" onClick={() => router.back()}>← Geri</button>
      </div>

      <div className="hero-bar">
        <div className="breadcrumb">
          <span className="bc" onClick={() => router.push('/')}>Ana Sayfa</span>
          <span className="bc-sep">›</span>
          <span className="bc" onClick={() => router.push('/ilanlar')}>İlanlar</span>
          <span className="bc-sep">›</span>
          <span className="bc" onClick={() => router.push(`/ilanlar?tip=${ilan.tip}`)}>
            {ilan.tip === 'ticari' ? 'Ticari' : 'Bireysel'}
          </span>
          <span className="bc-sep">›</span>
          <span className="bc bc-aktif">{sektorAd}</span>
        </div>
        <h1 className="hero-baslik">{ilan.baslik}</h1>
        <div className="hero-meta">
          <span>📍 {ilan.ulke && ilan.ulke !== 'Türkiye' ? `${ilan.ulke} / ` : ''}{sehir}</span>
          <span>📅 {new Date(ilan.createdAt).toLocaleDateString('tr-TR', { day:'2-digit', month:'long', year:'numeric' })}</span>
          {ilan.teklifSayisi > 0 && <span>💼 {ilan.teklifSayisi} Teklif & Sipariş</span>}
          {ilan.rol === 'alan'  && <span>🙋 Hizmet / Ürün Talep Ediliyor</span>}
          {ilan.rol === 'veren' && <span>⚡ Hizmet / Ürün Satışta</span>}
        </div>
      </div>

      <div className="detay-wrap">
        <div className="detay-grid">
          <div>
            <div className="detay-resim">
              {ilanResmi
                ? <img src={ilanResmi} alt={ilan.baslik} />
                : <span>{sektorEmoji(ilan.sektorId)}</span>
              }
              <div className="resim-badges">
                <span className={`badge ${ilan.rol === 'alan' ? 'badge-alan' : 'badge-veren'}`}>
                  {ilan.rol === 'alan' ? '🙋 Talep İlanı' : '⚡ Satış / Hizmet İlanı'}
                </span>
                {ilan.tip === 'ticari' && <span className="badge badge-ticari">🏭 Ticari (B2B)</span>}
                {ilan.tip === 'ticari' && <span className="badge badge-tr">🇹🇷 TR Üretimi</span>}
                {(ilan.yapay || ilan.is_ai_generated) && <span className="badge badge-yapay">Örnek İlan</span>}
              </div>
            </div>

            <div className="detay-kat-satir">
              <span className="detay-kat">{sektorEmoji(ilan.sektorId)} {sektorAd}</span>
            </div>

            {aciklama && <p className="detay-aciklama">{aciklama}</p>}

            {ozellikler.length > 0 && (
              <>
                <div className="ozellikler-baslik">✅ Özellikler & Detaylar</div>
                <div className="ozellikler">
                  {ozellikler.map((o, i) => (
                    <span key={i} className="ozellik">✓ {o}</span>
                  ))}
                </div>
              </>
            )}

            {ilan.tip === 'ticari' && ilan.teslimat && ilan.teslimat.length > 0 && (
              <div className="teslimat-bolum">
                <div className="teslimat-baslik">🚢 Teslimat & Lojistik</div>
                {ilan.teslimat.map((t, i) => (
                  <div key={i} className="teslimat-item">• {t}</div>
                ))}
              </div>
            )}

            {ilan.seo?.anahtarKelimeler && ilan.seo.anahtarKelimeler.length > 0 && (
              <div className="seo-keywords" aria-hidden="true">
                {ilan.seo.anahtarKelimeler.join(', ')}
              </div>
            )}
          </div>

          {/* SİDEBAR - AKSİYON PANELI */}
          <div className="sidebar">
            <div className="sidebar-header">
              <div className="sidebar-fiyat">
                {birim}{fmt(ilan.butceMin)} {ilan.butceMax > ilan.butceMin ? `– ${birim}${fmt(ilan.butceMax)}` : ''}
              </div>
              <div className="sidebar-fiyat-lbl">
                {ilan.rol === 'alan' ? 'Tahmini ayrılan bütçe' : 'Talep edilen satış fiyatı'}
              </div>
            </div>

            {ilan.teklifSayisi > 0 && (
              <div className="teklif-sayisi-chip">
                🔥 Bu ilana {ilan.teklifSayisi} teklif/sipariş geldi
              </div>
            )}

            {/* MANTIK: Eğer ilan "alan" rolündeyse (yani müşteri bir şey arıyorsa), ziyaretçi ona "Teklif Verir" */}
            {ilan.rol === 'alan' && (
              <button className="sidebar-btn btn-teklif" onClick={() => setTeklifModal(true)}>
                ⚡ Kendi Teklifini Sun
              </button>
            )}
            
            {/* MANTIK: Eğer ilan "veren" rolündeyse (yani satıcı hizmet/ürün satıyorsa), ziyaretçi "Sipariş Geçer" veya ondan özel teklif ister */}
            {ilan.rol === 'veren' && (
              <button className="sidebar-btn btn-talep" onClick={() => setTalepModal(true)}>
                🛍️ {ilan.tip === 'ticari' ? 'Toptan Fiyat / Teklif İste' : 'Hemen Sipariş Ver'}
              </button>
            )}

            <button className="sidebar-btn btn-mesaj" onClick={handleSohbetBaslat}>
              💬 İlan Sahibiyle Mesajlaş
            </button>

            <div className="sidebar-detay">
              {[
                { ikon:'📍', lbl:'Lokasyon', deger:`${ilan.ulke && ilan.ulke !== 'Türkiye' ? ilan.ulke + ' / ' : ''}${sehir || 'Türkiye'}` },
                { ikon:'🏷️', lbl:'Sektör', deger:sektorAd },
                { ikon:'📋', lbl:'İlan Modeli', deger:`${ilan.tip === 'ticari' ? 'Ticari / B2B' : 'Bireysel'} · ${ilan.rol === 'alan' ? 'Talep (Alıcı)' : 'Satış (Tedarikçi)'}` },
                { ikon:'📅', lbl:'Yayınlanma', deger:new Date(ilan.createdAt).toLocaleDateString('tr-TR') },
                ...(ilan.teslimat?.[0] ? [{ ikon:'🚢', lbl:'Teslimat', deger:ilan.teslimat[0] }] : []),
              ].map(({ ikon, lbl, deger }) => (
                <div key={lbl} className="sidebar-detay-item">
                  <span style={{ width:16 }}>{ikon}</span>
                  <div>
                    <div style={{ fontSize:'.68rem', color:'#aaa', marginBottom:2 }}>{lbl}</div>
                    <div className="sidebar-detay-deger">{deger}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-bilgi">
              🔒 Tüm mesajlaşmalar uçtan uca şifrelidir.<br />
              {ilan.rol === 'veren' && ilan.tip === 'ticari'
                ? 'Talebiniz tedarikçiye anında iletilir ve panelinize düşer.'
                : 'En iyi teklifi seçme hakkı ilan sahibindedir.'}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BENZER İLANLAR (YATAY SLIDER / SEO INTERNAL LINKING)           */}
        {/* ============================================================== */}
        {benzerIlanlar.length > 0 && (
          <div className="benzer-ilanlar-section">
            <h3 className="benzer-ilanlar-baslik">
              <span>{sektorEmoji(ilan.sektorId)}</span> Sektördeki Benzer İlanlar
            </h3>
            <div className="benzer-slider">
              {benzerIlanlar.map((bIlan) => {
                const bResim = bIlan.resimUrl || bIlan.medyalar?.[0] || null;
                const bSehir = bIlan.formData?.sehir ?? bIlan.sehir ?? '';
                const bBirim = bIlan.butceBirimi ?? '₺';
                
                return (
                  <div key={bIlan._id} className="benzer-kart" onClick={() => router.push(`/ilan/${bIlan._id}`)}>
                    <div className="benzer-kart-resim">
                      {bResim ? <img src={bResim} alt={bIlan.baslik} loading="lazy" /> : sektorEmoji(bIlan.sektorId)}
                    </div>
                    <div className="benzer-kart-icerik">
                      <span className="benzer-kart-tip">{bIlan.tip === 'ticari' ? '🏭 Ticari' : '👤 Bireysel'} · {bIlan.rol === 'alan' ? 'Talep' : 'Hizmet'}</span>
                      <h4 className="benzer-kart-baslik">{bIlan.baslik}</h4>
                      <div className="benzer-kart-alt">
                        <span className="benzer-kart-fiyat">
                          {bIlan.butceMin > 0 ? `${bBirim}${fmt(bIlan.butceMin)}` : 'Teklife Açık'}
                        </span>
                        <span className="benzer-kart-lokasyon">
                          📍 {bIlan.ulke && bIlan.ulke !== 'Türkiye' ? bIlan.ulke : (bSehir || 'Türkiye')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {teklifModal && (
        <TeklifModal ilanId={ilan._id} ilanBaslik={ilan.baslik}
          ilanTip={ilan.tip} onKapat={() => setTeklifModal(false)} />
      )}
      {talepModal && (
        <TalepModal ilanId={ilan._id} ilanBaslik={ilan.baslik}
          ilanTip={ilan.tip} onKapat={() => setTalepModal(false)} />
      )}
    </>
  );
}

export default function IlanDetaySayfaClient({ id }: { id: string }) {
  return (
    <Suspense fallback={
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
        height:'70vh', fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#aaa' }}>
        ⏳ Yükleniyor...
      </div>
    }>
      <IlanDetayIcerik id={id} />
    </Suspense>
  );
}
