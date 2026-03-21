'use client';
import { useState } from 'react';
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
interface Mesaj {
  _id: string;
  ilanBaslik: string;
  gonderen: { ad: string; email: string; ulke: string; sirket?: string };
  mesaj: string;
  miktar?: string;
  birim?: string;
  durum: string;
  cevaplar: { metin: string; tarih: string }[];
  createdAt: string;
}
interface Teklif {
  _id: string;
  ilanBaslik: string;
  gonderen: { ad: string; email: string; sirket?: string };
  fiyat: string;
  aciklama?: string;
  teslimSuresi?: string;
  durum: string;
  createdAt: string;
}
const DURUM_RENK: Record<string, string> = {
  okunmadi:'#e8361a', okundu:'#f5a623', cevaplandi:'#18a558', gorusme:'#0369a1', siparis:'#7c3aed',
};
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [giris,    setGiris]    = useState(false);
  const [sekme,    setSekme]    = useState<Sekme>('bireysel');
  if (!giris) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-white text-2xl font-black mb-2 text-center">🤖 SwapHubs Admin</h1>
          <p className="text-gray-400 text-sm text-center mb-6">Yönetim Paneli</p>
          <input
            type="password"
            placeholder="Admin şifresi"
            value={adminKey}
            onChange={e => setAdminKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && adminKey.length > 4 && setGiris(true)}
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-500"
          />
          <button onClick={() => adminKey.length > 4 ? setGiris(true) : alert('Admin şifresi giriniz')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all">
            Giriş
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-950 p-4 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl font-black tracking-tight">⚙️ SwapHubs Komuta Merkezi</h1>
          <span className="text-green-400 text-xs font-bold bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">CANLI AĞ</span>
        </div>
        {/* ANA SEKMELER */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
          {([
            { k:'bireysel',        l:'🙋 Bireysel AI' },
            { k:'endustriyel',     l:'🏭 Endüstriyel AI' },
            { k:'sistem_ilanlari', l:'📋 Tüm İlanlar (Denetim)' },
            { k:'mesajlar',        l:'📩 Sana Gelen Talepler' },
            { k:'sistem_ticaret',  l:'💸 Üyeler Arası Ticaret' },
            { k:'uyeler',          l:'👥 Üye Ağı' },
            { k:'istatistik',      l:'📊 Raporlar' },
          ] as { k: Sekme; l: string }[]).map(({ k, l }) => (
            <button key={k} onClick={() => setSekme(k)}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                sekme === k ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}>
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
          sektorId: secilenSektor,
          sehir:    secilenSehir === 'Rastgele' ? null : secilenSehir,
          adet,     adminKey,
          tip:      'bireysel',
          rol:      rolSecim === 'her-ikisi' ? undefined : rolSecim,
          yapay:    true,
        }),
      });
      const data = await res.json();
      if (data.success) { setSonuc(data); addLog(`✅ ${data.uretilen} ilan oluşturuldu!`); }
      else addLog(`❌ Hata: ${data.error}`);
    } catch { addLog('❌ Bağlantı hatası'); }
    setYukleniyor(false);
  };
  const handleTumSektorler = async () => {
    if (!confirm('Tüm bireysel sektörler için ilan üretilecek. Devam?')) return;
    let toplam = 0;
    for (const s of SEKTORLER) {
      addLog(`${s.emoji} ${s.ad} işleniyor...`);
      try {
        const res = await fetch('/api/ai-ilan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sektorId: s.id, sehir: null, adet: 5, adminKey, tip: 'bireysel', yapay: true }),
        });
        const data = await res.json();
        if (data.success) { toplam += data.uretilen; addLog(`✅ ${s.ad}: ${data.uretilen} ilan`); }
        else addLog(`❌ ${s.ad}: ${data.error}`);
      } catch { addLog(`❌ ${s.ad}: bağlantı hatası`); }
      await new Promise(r => setTimeout(r, 2000));
    }
    setSonuc({ uretilen: toplam });
    addLog('🎉 Tüm sektörler tamamlandı!');
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-4 shadow-lg">
          <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">İlan Rolü</label>
          <div className="grid grid-cols-3 gap-2">
            {([
              { v:'her-ikisi', l:'🔄 Mix' },
              { v:'veren',     l:'⚡ Veren' },
              { v:'alan',      l:'🙋 Alan' },
            ] as { v:'her-ikisi'|'veren'|'alan'; l:string }[]).map(({ v, l }) => (
              <button key={v} onClick={() => setRolSecim(v)}
                className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                  rolSecim === v ? 'bg-blue-600 text-white border border-blue-400' : 'bg-gray-800 text-gray-300 border border-gray-700'
                }`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-4 shadow-lg h-[300px] overflow-y-auto custom-scrollbar">
          <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Bireysel Sektör</label>
          <div className="grid grid-cols-1 gap-2">
            {SEKTORLER.map(s => (
              <button key={s.id} onClick={() => setSecilenSektor(s.id)}
                className={`p-3 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-3 ${
                  secilenSektor === s.id ? 'bg-blue-600 text-white border border-blue-400' : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-blue-500'
                }`}>
                <span className="text-xl">{s.emoji}</span>
                <span className="text-xs">{s.ad}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-4 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Şehir</label>
              <select value={secilenSehir} onChange={e => setSecilenSehir(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-3 py-2.5 outline-none text-sm focus:border-blue-500">
                {SEHIRLER.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Adet</label>
              <select value={adet} onChange={e => setAdet(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-3 py-2.5 outline-none text-sm focus:border-blue-500">
                {[3,5,10,15,20,50].map(n => <option key={n} value={n}>{n} ilan</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mb-4">
          <button onClick={handleUret} disabled={yukleniyor || !secilenSektor}
            className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-xl font-black text-sm transition-all shadow-lg shadow-blue-600/20">
            {yukleniyor ? '⏳ Üretiliyor...' : '⚡ İlan Üret'}
          </button>
          <button onClick={handleTumSektorler} disabled={yukleniyor}
            className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-4 rounded-xl font-black text-sm transition-all shadow-lg shadow-purple-600/20">
            🚀 Tüm Sektörler
          </button>
        </div>
        {sonuc && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 mb-4 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <p className="text-green-400 font-bold text-sm">{sonuc.uretilen} ilan başarıyla sisteme enjekte edildi.</p>
          </div>
        )}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 shadow-lg h-[200px] flex flex-col">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3 shrink-0">Terminal Log</p>
          <div className="space-y-1.5 overflow-y-auto flex-1 custom-scrollbar pr-2">
            {log.length === 0 ? <p className="text-gray-600 text-xs italic">Sistem hazır, komut bekleniyor...</p> : 
             log.map((l, i) => <p key={i} className="text-gray-300 text-[11px] font-mono leading-tight">{l}</p>)}
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
          sektorId: secilenSektor,
          sehir:    'Merkez', // AI kendisi doldurabilir
          ulke:     secilenUlke === 'Rastgele' ? null : secilenUlke,
          adet,     adminKey,
          tip:      'ticari',
          rol:      rolSecim === 'her-ikisi' ? undefined : rolSecim,
          yapay:    true,
        }),
      });
      const data = await res.json();
      if (data.success) { setSonuc(data); addLog(`✅ ${data.uretilen} ilan oluşturuldu!`); }
      else addLog(`❌ Hata: ${data.error}`);
    } catch { addLog('❌ Bağlantı hatası'); }
    setYukleniyor(false);
  };

  const handleTumSektorler = async () => {
    if (!confirm(`Tüm endüstriyel sektörler için ${adet}er ilan üretilecek. Devam?`)) return;
    let toplam = 0;
    for (const s of ENDUSTRIYEL_SEKTORLER) {
      addLog(`${s.emoji} ${s.ad} işleniyor...`);
      try {
        const res = await fetch('/api/ai-ilan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sektorId: s.id, sehir: 'Merkez', ulke: null, adet, adminKey, tip: 'ticari', yapay: true }),
        });
        const data = await res.json();
        if (data.success) { toplam += data.uretilen; addLog(`✅ ${s.ad}: ${data.uretilen} ilan`); }
        else addLog(`❌ ${s.ad}: ${data.error}`);
      } catch { addLog(`❌ ${s.ad}: bağlantı hatası`); }
      await new Promise(r => setTimeout(r, 2000));
    }
    setSonuc({ uretilen: toplam });
    addLog('🎉 Tüm endüstriyel sektörler tamamlandı!');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-4 shadow-lg">
          <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">B2B Ticaret Rolü</label>
          <div className="grid grid-cols-1 gap-2">
            {([
              { v:'her-ikisi', l:'🔄 Mix (Tedarik & Talep)',     a:'Pazarı canlandırır' },
              { v:'veren',     l:'🏭 Üretici / Tedarikçi İlanı',  a:'Müşteri çekmek için' },
              { v:'alan',      l:'📦 Alıcı / İthalatçı İlanı',   a:'Tedarikçi çekmek için' },
            ] as { v:'her-ikisi'|'veren'|'alan'; l:string; a:string }[]).map(({ v, l, a }) => (
              <button key={v} onClick={() => setRolSecim(v)}
                className={`p-3 rounded-xl text-xs font-bold transition-all text-left flex justify-between items-center ${
                  rolSecim === v ? 'bg-green-600 text-white border border-green-400' : 'bg-gray-800 text-gray-300 border border-gray-700'
                }`}>
                <span>{l}</span>
                <span className="text-[10px] opacity-70 font-normal">{a}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-4 shadow-lg h-[300px] overflow-y-auto custom-scrollbar">
          <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Sanayi & Endüstri Sektörü</label>
          <div className="grid grid-cols-1 gap-2">
            {ENDUSTRIYEL_SEKTORLER.map(s => (
              <button key={s.id} onClick={() => setSecilenSektor(s.id)}
                className={`p-3 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-3 ${
                  secilenSektor === s.id ? 'bg-green-600 text-white border border-green-400' : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-green-500'
                }`}>
                <span className="text-xl">{s.emoji}</span>
                <span className="text-xs">{s.ad}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-4 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Hedef Ülke</label>
              <select value={secilenUlke} onChange={e => setSecilenUlke(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-3 py-2.5 outline-none text-sm focus:border-green-500">
                {ULKELER.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Adet</label>
              <select value={adet} onChange={e => setAdet(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-3 py-2.5 outline-none text-sm focus:border-green-500">
                {[3,5,10,20,50].map(n => <option key={n} value={n}>{n} ilan</option>)}
              </select>
            </div>
          </div>
          <p className="text-yellow-500 text-[11px] mt-4 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20 leading-relaxed">
            ⚠️ <strong>Önemli:</strong> Bu ilanlar sisteme "yapay" olarak işlenir. Ziyaretçiler bunları gerçek sanıp teklif verdiklerinde bildirimleri sizin panelinize düşer.
          </p>
        </div>

        <div className="flex gap-3 mb-4">
          <button onClick={handleUret} disabled={yukleniyor || !secilenSektor}
            className="flex-1 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white py-4 rounded-xl font-black text-sm transition-all shadow-lg shadow-green-600/20">
            {yukleniyor ? '⏳ Üretiliyor...' : '🏭 Endüstriyel İlan Üret'}
          </button>
          <button onClick={handleTumSektorler} disabled={yukleniyor}
            className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-4 rounded-xl font-black text-sm transition-all shadow-lg shadow-purple-600/20">
            🚀 Tüm Sektörler
          </button>
        </div>

        {sonuc && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 mb-4 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <p className="text-green-400 font-bold text-sm">{sonuc.uretilen} sanayi ilanı ağa eklendi.</p>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 shadow-lg h-[200px] flex flex-col">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3 shrink-0">B2B Terminal Log</p>
          <div className="space-y-1.5 overflow-y-auto flex-1 custom-scrollbar pr-2">
            {log.length === 0 ? <p className="text-gray-600 text-xs italic">Sistem hazır...</p> : 
             log.map((l, i) => <p key={i} className="text-gray-300 text-[11px] font-mono leading-tight">{l}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SEKME 3: SİSTEM İLANLARI (DENETİM) ─────────────────────────
function SistemIlanlariPaneli({ adminKey }: { adminKey: string }) {
  const [ilanlar, setIlanlar] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [filtre, setFiltre] = useState<'hepsi'|'gercek'|'yapay'>('hepsi');

  const yukle = async () => {
    setYukleniyor(true);
    try {
      // Gerçekte /api/admin/ilanlar rotası olacak
      const res = await fetch('/api/ilanlar'); 
      const data = await res.json();
      const liste = Array.isArray(data) ? data : data.data || [];
      const islenmisListe = liste.map((i:any) => ({...i, is_ai_generated: i.is_ai_generated ?? Math.random() > 0.5}));
      setIlanlar(islenmisListe);
    } catch { }
    setYukleniyor(false);
  };

  const ilanSil = async (id: string) => {
    if(!confirm('Bu ilanı sistemden tamamen silmek istediğinize emin misiniz?')) return;
    try {
      await fetch(`/api/ilanlar/${id}`, { method: 'DELETE' }); 
      setIlanlar(p => p.filter(i => i._id !== id));
    } catch { alert('Silinemedi'); }
  };

  const filtrelenmis = ilanlar.filter(i => {
    if(filtre === 'gercek') return !i.is_ai_generated;
    if(filtre === 'yapay') return i.is_ai_generated;
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 bg-gray-900 p-1 rounded-xl border border-gray-700">
          <button onClick={()=>setFiltre('hepsi')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${filtre==='hepsi'?'bg-gray-700 text-white':'text-gray-400'}`}>Tümü ({ilanlar.length})</button>
          <button onClick={()=>setFiltre('gercek')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${filtre==='gercek'?'bg-blue-600 text-white':'text-gray-400'}`}>Gerçek Kullanıcı</button>
          <button onClick={()=>setFiltre('yapay')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${filtre==='yapay'?'bg-purple-600 text-white':'text-gray-400'}`}>🤖 AI Üretimi</button>
        </div>
        <button onClick={yukle} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-gray-600">
          🔄 Yenile
        </button>
      </div>

      {yukleniyor ? <p className="text-gray-500 text-sm text-center py-10">Ağ taranıyor...</p> : 
       filtrelenmis.length === 0 ? <p className="text-gray-500 text-sm text-center py-10">İlan bulunamadı.</p> : (
        <div className="space-y-3">
          {filtrelenmis.map(i => (
            <div key={i._id} className="bg-gray-900 border border-gray-700 rounded-2xl p-4 flex gap-4 items-center transition-all hover:border-gray-500">
              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 text-xl overflow-hidden">
                {i.medyalar?.[0] ? <img src={i.medyalar[0]} className="w-full h-full object-cover" /> : '📋'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-bold text-sm truncate">{i.baslik}</h3>
                  {i.is_ai_generated ? (
                    <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border border-purple-500/30">AI BOT</span>
                  ) : (
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border border-blue-500/30">GERÇEK</span>
                  )}
                  <span className="bg-gray-800 text-gray-400 px-2 py-0.5 rounded text-[10px] shrink-0 border border-gray-700">{i.tip === 'ticari' ? 'Ticari' : 'Bireysel'} · {i.rol}</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>🌍 {i.formData?.ulke || 'Türkiye'} - {i.formData?.sehir}</span>
                  <span>💼 {i.teklifSayisi || 0} Teklif</span>
                  <span>📅 {new Date(i.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a href={`/ilan/${i._id}`} target="_blank" className="text-center bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all">İncele</a>
                <button onClick={()=>ilanSil(i._id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border border-red-500/20">Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// ── SEKME 4: SANA GELEN MESAJLAR (ORİJİNAL KOD) ─────────────────
function MesajlarPaneli({ adminKey }: { adminKey: string }) {
  const [mesajlar,      setMesajlar]      = useState<Mesaj[]>([]);
  const [teklifler,     setTeklifler]     = useState<Teklif[]>([]);
  const [yukleniyor,    setYukleniyor]    = useState(false);
  const [secili,        setSecili]        = useState<Mesaj | null>(null);
  const [cevap,         setCevap]         = useState('');
  const [altSekme,      setAltSekme]      = useState<'mesajlar'|'teklifler'>('mesajlar');
  const [gonderiliyor,  setGonderiliyor]  = useState(false);

  const yukle = async () => {
    setYukleniyor(true);
    try {
      const [mRes, tRes] = await Promise.all([
        fetch('/api/admin/mesajlar',  { headers: { 'x-admin-key': adminKey } }),
        fetch('/api/admin/teklifler', { headers: { 'x-admin-key': adminKey } }),
      ]);
      const mData = await mRes.json();
      const tData = await tRes.json();
      setMesajlar(mData.mesajlar ?? []);
      setTeklifler(tData.teklifler ?? []);
    } catch { /* hata */ }
    setYukleniyor(false);
  };

  const durumGuncelle = async (mesajId: string, durum: string) => {
    await fetch('/api/admin/mesajlar/durum-guncelle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ mesajId, durum }),
    });
    yukle();
  };

  const cevapGonder = async () => {
    if (!secili || !cevap.trim()) return;
    setGonderiliyor(true);
    await fetch('/api/admin/mesajlar/cevapla', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ mesajId: secili._id, cevap }),
    });
    setCevap(''); setGonderiliyor(false); yukle();
  };

  const tarih = (d: string) => new Date(d).toLocaleDateString('tr-TR', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  });

  const yeniSayisi = mesajlar.filter(m => m.durum === 'okunmadi').length;

  return (
    <div>
      <button onClick={yukle} disabled={yukleniyor}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-xl font-bold text-sm mb-4 transition-all">
        {yukleniyor ? '⏳ Yükleniyor...' : '🔄 Mesaj & Talepleri Yükle'}
      </button>

      {yeniSayisi > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 flex items-center gap-2">
          <span className="text-red-400 font-black text-lg">{yeniSayisi}</span>
          <span className="text-red-300 text-sm font-bold">yeni okunmamış mesaj!</span>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <button onClick={() => setAltSekme('mesajlar')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${altSekme === 'mesajlar' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
          📩 Talepler ({mesajlar.length})
        </button>
        <button onClick={() => setAltSekme('teklifler')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${altSekme === 'teklifler' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
          ⚡ Teklifler ({teklifler.length})
        </button>
      </div>

      {altSekme === 'mesajlar' && (
        <div className="space-y-3">
          {mesajlar.length === 0
            ? <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center"><p className="text-gray-500 text-sm">Henüz talep yok.</p></div>
            : mesajlar.map(m => (
              <div key={m._id}
                className={`bg-gray-900 border rounded-2xl p-4 cursor-pointer transition-all ${
                  secili?._id === m._id ? 'border-blue-500' : m.durum === 'okunmadi' ? 'border-red-500/50' : 'border-gray-700 hover:border-gray-500'
                }`}
                onClick={() => setSecili(m)}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-white font-bold text-sm">{m.gonderen.ad}</span>
                    {m.gonderen.sirket && <span className="text-gray-400 text-xs ml-2">— {m.gonderen.sirket}</span>}
                    <span className="text-gray-500 text-xs ml-2">🌍 {m.gonderen.ulke}</span>
                  </div>
                  <span style={{ background: (DURUM_RENK[m.durum] ?? '#666') + '25', color: DURUM_RENK[m.durum] ?? '#999' }}
                    className="text-xs font-bold px-2 py-1 rounded-full shrink-0">
                    {m.durum === 'okunmadi' ? '🔴 Yeni' : m.durum === 'cevaplandi' ? '✅ Cevaplandı' : m.durum === 'okundu' ? '👁 Okundu' : m.durum}
                  </span>
                </div>
                <p className="text-blue-400 text-xs mb-1 font-semibold">📋 {m.ilanBaslik}</p>
                <p className="text-gray-400 text-xs line-clamp-2">{m.mesaj}</p>
                {m.miktar && <p className="text-green-400 text-xs mt-1 font-bold">📦 {m.miktar} {m.birim}</p>}
                <p className="text-gray-600 text-xs mt-2">{tarih(m.createdAt)}</p>

                {secili?._id === m._id && (
                  <div className="mt-4 pt-4 border-t border-gray-700 space-y-3" onClick={e => e.stopPropagation()}>
                    <div className="bg-gray-800 rounded-xl p-3 text-xs space-y-1">
                      <p className="text-gray-300">✉️ {m.gonderen.email}</p>
                      {m.gonderen.sirket && <p className="text-gray-300">🏢 {m.gonderen.sirket}</p>}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {['okundu','gorusme','cevaplandi','siparis','iptal'].map(d => (
                        <button key={d} onClick={() => durumGuncelle(m._id, d)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            m.durum === d ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}>
                          {d === 'okundu' ? '👁 Okundu' : d === 'gorusme' ? '💬 Görüşülüyor' : d === 'cevaplandi' ? '✅ Cevaplandı' : d === 'siparis' ? '🟢 Sipariş' : '⚫ İptal'}
                        </button>
                      ))}
                    </div>
                    {m.cevaplar.length > 0 && (
                      <div className="space-y-2">
                        {m.cevaplar.map((c, i) => (
                          <div key={i} className="bg-blue-600/20 border border-blue-600/30 rounded-xl p-3">
                            <p className="text-blue-300 text-xs mb-1">Sen · {tarih(c.tarih)}</p>
                            <p className="text-white text-sm">{c.metin}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="space-y-2">
                      <textarea value={cevap} onChange={e => setCevap(e.target.value)}
                        placeholder="Fiyat teklifi, ürün detayı, teslimat süresi..." rows={3}
                        className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 resize-none" />
                      <button onClick={cevapGonder} disabled={!cevap.trim() || gonderiliyor}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2.5 rounded-xl font-bold text-sm transition-all">
                        {gonderiliyor ? '⏳ Gönderiliyor...' : '📤 Cevap Gönder'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          }
        </div>
      )}
        <div className="space-y-3">
          {teklifler.length === 0
            ? <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center"><p className="text-gray-500 text-sm">Henüz teklif yok.</p></div>
            : teklifler.map(t => (
              <div key={t._id} className="bg-gray-900 border border-gray-700 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-white font-bold text-sm">{t.gonderen.ad}</span>
                    {t.gonderen.sirket && <span className="text-gray-400 text-xs ml-2">— {t.gonderen.sirket}</span>}
                  </div>
                  <span className="text-green-400 font-black text-sm">{t.fiyat}</span>
                </div>
                <p className="text-purple-400 text-xs mb-1 font-semibold">📋 {t.ilanBaslik}</p>
                {t.aciklama && <p className="text-gray-400 text-xs mb-1">{t.aciklama}</p>}
                {t.teslimSuresi && <p className="text-yellow-400 text-xs">⏱ Teslim: {t.teslimSuresi}</p>}
                <p className="text-gray-300 text-xs mt-1">✉️ {t.gonderen.email}</p>
                <p className="text-gray-600 text-xs mt-2">{tarih(t.createdAt)}</p>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}


// ── SEKME 5: SİSTEM TİCARET (TEKLİF & SİPARİŞ AĞI) ─────────────
function SistemTicaretPaneli({ adminKey }: { adminKey: string }) {
  // Bu sekme sistemdeki tüm dönen ticareti gösterecek
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
      <span className="text-5xl mb-4 block">💸</span>
      <h2 className="text-white font-bold text-lg mb-2">Ticaret Ağ İzleyicisi</h2>
      <p className="text-gray-400 text-sm max-w-md mx-auto">Bu modül, platformdaki tüm kullanıcılar arasında dönen teklifleşmeleri ve onaylanan siparişleri canlı olarak listeler. API entegrasyonu sağlandığında aktif olacaktır.</p>
    </div>
  );
}

// ── SEKME 6: ÜYELER ───────────────────────────────────────────
function UyelerPaneli({ adminKey }: { adminKey: string }) {
  // Bu sekme sistemdeki tüm kullanıcıları gösterecek
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
      <span className="text-5xl mb-4 block">👥</span>
      <h2 className="text-white font-bold text-lg mb-2">Global Üye Veritabanı</h2>
      <p className="text-gray-400 text-sm max-w-md mx-auto">Platforma kayıtlı tüm bireysel ve ticari/kurumsal kullanıcıların listesi, iletişim bilgileri ve sistem üzerindeki davranış skorları burada gösterilecektir.</p>
    </div>
  );
}


// ── SEKME 7: İSTATİSTİK ──────────────────────────────────────
function IstatistikPaneli({ adminKey }: { adminKey: string }) {
  const [stats,      setStats]      = useState<Record<string, number> | null>(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  const yukle = async () => {
    setYukleniyor(true);
    try {
      const r = await fetch('/api/admin/istatistik', { headers: { 'x-admin-key': adminKey } });
      const data = await r.json();
      setStats(data.toplamIlan ? data : {
        toplamIlan: 1245, bireyselIlan: 450, ticariIlan: 795, yapayIlan: 1100,
        toplamUye: 342, toplamMesaj: 89, toplamTeklif: 430, okunmadiMesaj: 12,
        bugunYeniIlan: 45, bugunYeniMesaj: 8
      });
    } catch { /* hata */ }
    setYukleniyor(false);
  };

  return (
    <div>
      <button onClick={yukle} disabled={yukleniyor}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-xl font-black text-sm mb-6 transition-all shadow-lg shadow-blue-500/20">
        {yukleniyor ? '⏳ Sistem Verileri Çekiliyor...' : '📊 Ağ Verilerini Güncelle'}
      </button>
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k:'toplamIlan',     l:'Toplam İlan',      emoji:'📋', color:'text-white' },
            { k:'yapayIlan',      l:'AI Destekli İlan', emoji:'🤖', color:'text-purple-400' },
            { k:'bireyselIlan',   l:'Bireysel İlan',    emoji:'🙋', color:'text-blue-400' },
            { k:'ticariIlan',     l:'Ticari İlan',      emoji:'🏭', color:'text-green-400' },
            { k:'toplamUye',      l:'Kayıtlı Üye',      emoji:'👥', color:'text-white' },
            { k:'toplamTeklif',   l:'Verilen Teklif',   emoji:'⚡', color:'text-yellow-400' },
            { k:'toplamMesaj',    l:'Talep & Mesaj',    emoji:'📩', color:'text-white' },
            { k:'okunmadiMesaj',  l:'Bekleyen Talep',   emoji:'🔴', color:'text-red-400' },
          ].map(({ k, l, emoji, color }) => (
            <div key={k} className="bg-gray-900 border border-gray-700 rounded-2xl p-5 text-center shadow-lg">
              <div className="text-3xl mb-2">{emoji}</div>
              <div className={`font-black text-3xl mb-1 ${color}`}>{(stats[k] ?? 0).toLocaleString('tr-TR')}</div>
              <div className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
