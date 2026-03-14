'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SEKTORLER = [
  { id:'turizm',   ad:'Turizm & Konaklama',    emoji:'🏨' },
  { id:'seyahat',  ad:'Seyahat & Transfer',     emoji:'✈️' },
  { id:'kiralama', ad:'Kiralama',               emoji:'🔑' },
  { id:'tamir',    ad:'Tamir & Bakım',          emoji:'🔧' },
  { id:'usta',     ad:'Usta & İşçi',            emoji:'👷' },
  { id:'temizlik', ad:'Temizlik Hizmetleri',    emoji:'🧹' },
  { id:'uretim',   ad:'Üretim & Özel Sipariş', emoji:'🏭' },
  { id:'giyim',    ad:'Giyim & Tekstil',        emoji:'👗' },
  { id:'saglik',   ad:'Sağlık & Güzellik',      emoji:'💊' },
  { id:'egitim',   ad:'Eğitim & Danışmanlık',   emoji:'📚' },
  { id:'etkinlik', ad:'Etkinlik & Düğün',       emoji:'🎊' },
  { id:'mobilya',  ad:'Mobilya & Dekorasyon',   emoji:'🪑' },
];

const ENDUSTRIYEL_SEKTORLER = [
  { id:'tekstil',     ad:'Tekstil & Hazır Giyim',  emoji:'👕' },
  { id:'mermer-tas',  ad:'Mermer & Doğal Taş',     emoji:'🪨' },
  { id:'metal-celik', ad:'Metal & Çelik',          emoji:'⚙️' },
  { id:'plastik-pvc', ad:'Plastik & PVC',          emoji:'🧴' },
  { id:'ahsap-mob',   ad:'Ahşap & Mobilya',        emoji:'🪵' },
  { id:'gida-tarim',  ad:'Gıda & Tarım',           emoji:'🌾' },
  { id:'insaat-malz', ad:'İnşaat Malzemeleri',     emoji:'🏗️' },
  { id:'elektrik',    ad:'Elektrik & Enerji',      emoji:'⚡' },
  { id:'makine',      ad:'Makine & Ekipman',       emoji:'🏭' },
  { id:'lojistik',    ad:'Lojistik',               emoji:'🚢' },
  { id:'kimya-boya',  ad:'Kimya & Boya',           emoji:'🧪' },
  { id:'saglik-med',  ad:'Sağlık & Medikal',       emoji:'🏥' },
];

const SEHIRLER = ['İstanbul','Ankara','İzmir','Bursa','Antalya','Adana','Konya','Gaziantep','Mersin','Kayseri','Rastgele'];
const ULKELER  = ['Türkiye','Almanya','ABD','İngiltere','Fransa','Hollanda','BAE','Suudi Arabistan','Mısır','Nijerya','Hindistan','Rastgele'];

type Sekme = 'bireysel' | 'endustriyel' | 'sistem_ilanlari' | 'mesajlar' | 'sistem_ticaret' | 'uyeler' | 'istatistik';

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [giris,    setGiris]    = useState(false);
  const [sekme,    setSekme]    = useState<Sekme>('bireysel');
  const router = useRouter();

  return (
    <div className="admin-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        
        .admin-wrapper {
          min-height: 100vh;
          background-color: #020617;
          color: #f8fafc;
          font-family: 'Inter', sans-serif;
          padding: 20px;
          box-sizing: border-box;
        }
        
        * { box-sizing: border-box; }
        
        /* GİRİŞ EKRANI */
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
        }
        .login-box {
          background-color: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          text-align: center;
        }
        .login-title { font-size: 24px; font-weight: 900; margin-bottom: 8px; color: #fff; }
        .login-sub { color: #94a3b8; font-size: 14px; margin-bottom: 24px; }
        
        /* GENEL BİLEŞENLER */
        .adm-input {
          width: 100%;
          background: #1e293b;
          border: 1px solid #334155;
          color: white;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 14px;
          outline: none;
          font-family: inherit;
          transition: 0.2s;
        }
        .adm-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); }
        
        .adm-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          border: none;
          font-family: inherit;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .adm-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-blue { background: #2563eb; color: white; }
        .btn-blue:hover:not(:disabled) { background: #1d4ed8; }
        .btn-green { background: #16a34a; color: white; }
        .btn-green:hover:not(:disabled) { background: #15803d; }
        .btn-purple { background: #9333ea; color: white; }
        .btn-purple:hover:not(:disabled) { background: #7e22ce; }
        
        /* ANA PANEL LAYOUT */
        .panel-container { max-width: 1000px; margin: 0 auto; padding-bottom: 60px; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .panel-title { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; }
        .live-badge { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; }
        
        /* SEKMELER (TABS) */
        .tabs-container { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 24px; }
        .tabs-container::-webkit-scrollbar { height: 4px; }
        .tabs-container::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .tab-btn { padding: 10px 16px; border-radius: 12px; font-weight: 700; font-size: 13px; white-space: nowrap; cursor: pointer; border: none; font-family: inherit; transition: 0.2s; }
        .tab-btn.active { background: #2563eb; color: white; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3); }
        .tab-btn.inactive { background: #0f172a; color: #94a3b8; border: 1px solid #1e293b; }
        .tab-btn.inactive:hover { color: white; background: #1e293b; }
        
        /* KARTLAR & GRİDLER */
        .card { background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 20px; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .card-title { color: #94a3b8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; display: block; }
        
        .grid-2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .grid-3 { display: grid; grid-template-columns: 1fr; gap: 8px; }
        .grid-4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        @media(min-width: 768px) {
          .grid-2 { grid-template-columns: 1fr 1fr; }
          .grid-3 { grid-template-columns: repeat(3, 1fr); }
          .grid-4 { grid-template-columns: repeat(4, 1fr); }
        }
        
        /* SEÇİM BUTONLARI */
        .select-btn { padding: 12px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; border: 1px solid #1e293b; font-family: inherit; transition: 0.15s; display: flex; align-items: center; gap: 10px; text-align: left; }
        .select-btn.active-blue { background: #2563eb; color: white; border-color: #3b82f6; }
        .select-btn.active-green { background: #16a34a; color: white; border-color: #22c55e; }
        .select-btn.inactive { background: #1e293b; color: #cbd5e1; }
        .select-btn.inactive:hover { border-color: #475569; }
        
        /* TERMİNAL LOG */
        .terminal { background: #020617; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; height: 200px; overflow-y: auto; display: flex; flex-direction: column; }
        .terminal-log { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #cbd5e1; margin-bottom: 6px; line-height: 1.4; }
        .terminal::-webkit-scrollbar { width: 6px; }
        .terminal::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        
        .stat-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 20px; text-align: center; }
        .stat-icon { font-size: 32px; margin-bottom: 8px; }
        .stat-value { font-size: 28px; font-weight: 900; margin-bottom: 4px; }
        .stat-label { color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; }
      `}</style>

      {!giris ? (
        <div className="login-container">
          <div className="login-box">
            <h1 className="login-title">🤖 SwapHubs Admin</h1>
            <p className="login-sub">Siber Komuta Merkezi</p>
            <input
              type="password"
              placeholder="Admin şifresini girin..."
              value={adminKey}
              onChange={e => setAdminKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && adminKey.length > 4 && setGiris(true)}
              className="adm-input"
              style={{ marginBottom: '16px' }}
            />
            <button 
              onClick={() => adminKey.length > 4 ? setGiris(true) : alert('Geçersiz şifre')}
              className="adm-btn btn-blue"
            >
              Sisteme Giriş Yap
            </button>
            <button 
              onClick={() => router.push("/")}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '12px', marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      ) : (
        <div className="panel-container">
          <div className="panel-header">
            <h1 className="panel-title">⚙️ SwapHubs Komuta Merkezi</h1>
            <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
               <span className="live-badge">CANLI AĞ</span>
               <button onClick={() => router.push("/")} style={{ background: '#1e293b', border: 'none', color: 'white', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Siteye Git</button>
            </div>
          </div>

          <div className="tabs-container">
            {([
              { k:'bireysel',        l:'🙋 Bireysel AI' },
              { k:'endustriyel',     l:'🏭 Endüstriyel AI' },
              { k:'sistem_ilanlari', l:'📋 İlan Denetimi' },
              { k:'mesajlar',        l:'📩 Sistem Talepleri' },
              { k:'sistem_ticaret',  l:'💸 Ticaret Ağı' },
              { k:'uyeler',          l:'👥 Üyeler' },
              { k:'istatistik',      l:'📊 Raporlar' },
            ] as { k: Sekme; l: string }[]).map(({ k, l }) => (
              <button 
                key={k} 
                onClick={() => setSekme(k)}
                className={`tab-btn ${sekme === k ? 'active' : 'inactive'}`}
              >
                {l}
              </button>
            ))}
          </div>

          {sekme === 'bireysel'        && <BireyselIlanUretici    adminKey={adminKey} />}
          {sekme === 'endustriyel'     && <EndustriyelIlanUretici adminKey={adminKey} />}
          {sekme === 'sistem_ilanlari' && <SistemIlanlariPaneli   adminKey={adminKey} />}
          {sekme === 'mesajlar'        && <MesajlarPaneli         adminKey={adminKey} />}
          {sekme === 'sistem_ticaret'  && <SistemTicaretPaneli    adminKey={adminKey} />}
          {sekme === 'uyeler'          && <UyelerPaneli           adminKey={adminKey} />}
          {sekme === 'istatistik'      && <IstatistikPaneli       adminKey={adminKey} />}
        </div>
      )}
    </div>
  );
}

// ── SEKME 1: BİREYSEL AI ────────────────────────────────────────
function BireyselIlanUretici({ adminKey }: { adminKey: string }) {
  const [secilenSektor, setSecilenSektor] = useState('');
  const [secilenSehir,  setSecilenSehir]  = useState('Rastgele');
  const [adet,          setAdet]          = useState(5);
  const [rolSecim,      setRolSecim]      = useState<'her-ikisi'|'veren'|'alan'>('her-ikisi');
  const [yukleniyor,    setYukleniyor]    = useState(false);
  const [sonuc,         setSonuc]         = useState<{ uretilen: number } | null>(null);
  const [log,           setLog]           = useState<string[]>([]);

  const addLog = (msg: string) => setLog(p => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...p]);

  const handleUret = async () => {
    if (!secilenSektor) return alert('Sektör seçiniz');
    setYukleniyor(true); setSonuc(null);
    addLog(`${secilenSektor} → ${rolSecim} için ${adet} ilan üretiliyor...`);
    try {
      const res = await fetch('/api/ai-ilan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sektorId: secilenSektor, sehir: secilenSehir === 'Rastgele' ? null : secilenSehir,
          adet, adminKey, tip: 'bireysel', rol: rolSecim === 'her-ikisi' ? undefined : rolSecim, yapay: true,
        }),
      });
      const data = await res.json();
      if (data.success) { setSonuc(data); addLog(`✅ ${data.uretilen} ilan oluşturuldu!`); }
      else addLog(`❌ Hata: ${data.error}`);
    } catch { addLog('❌ Bağlantı hatası'); }
    setYukleniyor(false);
  };

  return (
    <div className="grid-2">
      <div>
        <div className="card">
          <span className="card-title">İlan Rolü</span>
          <div className="grid-3">
            {([
              { v:'her-ikisi', l:'🔄 Mix' }, { v:'veren', l:'⚡ Veren' }, { v:'alan', l:'🙋 Alan' },
            ] as { v:'her-ikisi'|'veren'|'alan'; l:string }[]).map(({ v, l }) => (
              <button key={v} onClick={() => setRolSecim(v)} className={`select-btn ${rolSecim === v ? 'active-blue' : 'inactive'}`} style={{justifyContent: 'center'}}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ height: '300px', overflowY: 'auto' }}>
          <span className="card-title">Bireysel Sektör</span>
          <div className="grid-2" style={{ gridTemplateColumns: '1fr' }}>
            {SEKTORLER.map(s => (
              <button key={s.id} onClick={() => setSecilenSektor(s.id)} className={`select-btn ${secilenSektor === s.id ? 'active-blue' : 'inactive'}`}>
                <span style={{fontSize: '18px'}}>{s.emoji}</span> <span>{s.ad}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="card">
          <div className="grid-2">
            <div>
              <span className="card-title">Şehir</span>
              <select value={secilenSehir} onChange={e => setSecilenSehir(e.target.value)} className="adm-input">
                {SEHIRLER.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <span className="card-title">Adet</span>
              <select value={adet} onChange={e => setAdet(Number(e.target.value))} className="adm-input">
                {[3,5,10,15,20,50].map(n => <option key={n} value={n}>{n} ilan</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <button onClick={handleUret} disabled={yukleniyor || !secilenSektor} className="adm-btn btn-blue">
            {yukleniyor ? '⏳ Üretiliyor...' : '⚡ İlan Üret'}
          </button>
          <button disabled={yukleniyor} className="adm-btn btn-purple">🚀 Tüm Sektörler</button>
        </div>

        {sonuc && (
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '16px', borderRadius: '12px', color: '#4ade80', fontWeight: 'bold', marginBottom: '16px' }}>
            ✅ {sonuc.uretilen} ilan başarıyla sisteme enjekte edildi.
          </div>
        )}

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: '#1e293b', borderBottom: '1px solid #334155' }}>
            <span className="card-title" style={{ margin: 0 }}>Terminal Log</span>
          </div>
          <div className="terminal">
            {log.length === 0 ? <span style={{color: '#64748b', fontStyle: 'italic'}}>Sistem hazır...</span> : 
             log.map((l, i) => <div key={i} className="terminal-log">{l}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SEKME 2: ENDÜSTRİYEL AI ─────────────────────────────────────
function EndustriyelIlanUretici({ adminKey }: { adminKey: string }) {
  const [secilenSektor, setSecilenSektor] = useState('');
  const [secilenUlke,   setSecilenUlke]   = useState('Rastgele');
  const [adet,          setAdet]          = useState(5);
  const [rolSecim,      setRolSecim]      = useState<'her-ikisi'|'veren'|'alan'>('her-ikisi');
  const [yukleniyor,    setYukleniyor]    = useState(false);
  const [sonuc,         setSonuc]         = useState<{ uretilen: number } | null>(null);
  const [log,           setLog]           = useState<string[]>([]);

  const addLog = (msg: string) => setLog(p => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...p]);

  const handleUret = async () => {
    if (!secilenSektor) return alert('Sektör seçiniz');
    setYukleniyor(true); setSonuc(null);
    addLog(`${secilenSektor} → ${rolSecim} için ${adet} endüstriyel ilan üretiliyor...`);
    try {
      const res = await fetch('/api/ai-ilan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sektorId: secilenSektor, sehir: 'Merkez', ulke: secilenUlke === 'Rastgele' ? null : secilenUlke,
          adet, adminKey, tip: 'ticari', rol: rolSecim === 'her-ikisi' ? undefined : rolSecim, yapay: true,
        }),
      });
      const data = await res.json();
      if (data.success) { setSonuc(data); addLog(`✅ ${data.uretilen} ilan oluşturuldu!`); }
      else addLog(`❌ Hata: ${data.error}`);
    } catch { addLog('❌ Bağlantı hatası'); }
    setYukleniyor(false);
  };

  return (
    <div className="grid-2">
      <div>
        <div className="card">
          <span className="card-title">B2B Ticaret Rolü</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {([
              { v:'her-ikisi', l:'🔄 Mix (Tedarik & Talep)' },
              { v:'veren',     l:'🏭 Üretici / Tedarikçi İlanı' },
              { v:'alan',      l:'📦 Alıcı / İthalatçı İlanı' },
            ] as { v:'her-ikisi'|'veren'|'alan'; l:string }[]).map(({ v, l }) => (
              <button key={v} onClick={() => setRolSecim(v)} className={`select-btn ${rolSecim === v ? 'active-green' : 'inactive'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ height: '300px', overflowY: 'auto' }}>
          <span className="card-title">Sanayi & Endüstri Sektörü</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ENDUSTRIYEL_SEKTORLER.map(s => (
              <button key={s.id} onClick={() => setSecilenSektor(s.id)} className={`select-btn ${secilenSektor === s.id ? 'active-green' : 'inactive'}`}>
                <span style={{fontSize: '18px'}}>{s.emoji}</span> <span>{s.ad}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="card">
          <div className="grid-2">
            <div>
              <span className="card-title">Hedef Ülke</span>
              <select value={secilenUlke} onChange={e => setSecilenUlke(e.target.value)} className="adm-input">
                {ULKELER.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <span className="card-title">Adet</span>
              <select value={adet} onChange={e => setAdet(Number(e.target.value))} className="adm-input">
                {[3,5,10,20,50].map(n => <option key={n} value={n}>{n} ilan</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginTop: '16px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '12px', borderRadius: '8px', color: '#fbbf24', fontSize: '12px' }}>
            ⚠️ <strong>Önemli:</strong> Ziyaretçiler bu ilanlara teklif verdiklerinde bildirimler panele düşer.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <button onClick={handleUret} disabled={yukleniyor || !secilenSektor} className="adm-btn btn-green">
            {yukleniyor ? '⏳ Üretiliyor...' : '🏭 Endüstriyel İlan Üret'}
          </button>
          <button disabled={yukleniyor} className="adm-btn btn-purple">🚀 Tüm Sektörler</button>
        </div>

        {sonuc && (
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '16px', borderRadius: '12px', color: '#4ade80', fontWeight: 'bold', marginBottom: '16px' }}>
            ✅ {sonuc.uretilen} sanayi ilanı ağa eklendi.
          </div>
        )}

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: '#1e293b', borderBottom: '1px solid #334155' }}>
            <span className="card-title" style={{ margin: 0 }}>B2B Terminal Log</span>
          </div>
          <div className="terminal">
            {log.length === 0 ? <span style={{color: '#64748b', fontStyle: 'italic'}}>Sistem hazır...</span> : 
             log.map((l, i) => <div key={i} className="terminal-log">{l}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DİĞER SEKMELER (MOCK GÖRÜNÜM) ─────────────────────────
function SistemIlanlariPaneli({ adminKey }: { adminKey: string }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <span style={{ fontSize: '48px', display: 'block', margin: '0 auto 16px' }}>📋</span>
      <h2 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>İlan Denetim Merkezi</h2>
      <p style={{ color: '#94a3b8', fontSize: '14px' }}>Sistemdeki tüm gerçek ve yapay ilanları buradan inceleyip silebilirsiniz.</p>
    </div>
  );
}

function MesajlarPaneli({ adminKey }: { adminKey: string }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <span style={{ fontSize: '48px', display: 'block', margin: '0 auto 16px' }}>📩</span>
      <h2 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Sistem Talepleri</h2>
      <p style={{ color: '#94a3b8', fontSize: '14px' }}>Yapay ilanlara gelen tüm teklifler ve mesajlar buraya düşecektir.</p>
    </div>
  );
}

function SistemTicaretPaneli({ adminKey }: { adminKey: string }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <span style={{ fontSize: '48px', display: 'block', margin: '0 auto 16px' }}>💸</span>
      <h2 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Canlı Ticaret Ağı</h2>
      <p style={{ color: '#94a3b8', fontSize: '14px' }}>Kullanıcılar arası gerçekleşen sipariş ve teklifleşme verilerini izleyin.</p>
    </div>
  );
}

function UyelerPaneli({ adminKey }: { adminKey: string }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <span style={{ fontSize: '48px', display: 'block', margin: '0 auto 16px' }}>👥</span>
      <h2 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Üye Veritabanı</h2>
      <p style={{ color: '#94a3b8', fontSize: '14px' }}>Sisteme kayıtlı kullanıcıları ve firmaları denetleyin.</p>
    </div>
  );
}

function IstatistikPaneli({ adminKey }: { adminKey: string }) {
  const stats = {
    toplamIlan: 1245, bireyselIlan: 450, ticariIlan: 795, yapayIlan: 1100,
    toplamUye: 342, toplamMesaj: 89, toplamTeklif: 430, okunmadiMesaj: 12,
  };

  return (
    <div>
      <button className="adm-btn btn-blue" style={{ marginBottom: '24px' }}>📊 Ağ Verilerini Güncelle</button>
      <div className="grid-4">
        {[
          { k:'toplamIlan',     l:'Toplam İlan',      emoji:'📋', c:'#f8fafc' },
          { k:'yapayIlan',      l:'AI İlan',          emoji:'🤖', c:'#c084fc' },
          { k:'bireyselIlan',   l:'Bireysel İlan',    emoji:'🙋', c:'#60a5fa' },
          { k:'ticariIlan',     l:'Ticari İlan',      emoji:'🏭', c:'#4ade80' },
          { k:'toplamUye',      l:'Kayıtlı Üye',      emoji:'👥', c:'#f8fafc' },
          { k:'toplamTeklif',   l:'Verilen Teklif',   emoji:'⚡', c:'#fcd34d' },
          { k:'toplamMesaj',    l:'Talep & Mesaj',    emoji:'📩', c:'#f8fafc' },
          { k:'okunmadiMesaj',  l:'Bekleyen Talep',   emoji:'🔴', c:'#f87171' },
        ].map(({ k, l, emoji, c }) => (
          <div key={k} className="stat-card">
            <div className="stat-icon">{emoji}</div>
            <div className="stat-value" style={{ color: c }}>{(stats[k as keyof typeof stats] ?? 0).toLocaleString('tr-TR')}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
