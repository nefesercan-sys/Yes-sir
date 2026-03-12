'use client';
import { useState } from 'react';

const SEKTORLER = [
  { id: 'turizm', ad: 'Turizm & Konaklama', emoji: '🏨' },
  { id: 'seyahat', ad: 'Seyahat & Transfer', emoji: '✈️' },
  { id: 'kiralama', ad: 'Kiralama', emoji: '🔑' },
  { id: 'tamir', ad: 'Tamir & Bakım', emoji: '🔧' },
  { id: 'usta', ad: 'Usta & İşçi', emoji: '👷' },
  { id: 'temizlik', ad: 'Temizlik Hizmetleri', emoji: '🧹' },
  { id: 'uretim', ad: 'Üretim & Özel Sipariş', emoji: '🏭' },
  { id: 'giyim', ad: 'Giyim & Tekstil', emoji: '👗' },
  { id: 'saglik', ad: 'Sağlık & Güzellik', emoji: '💊' },
  { id: 'egitim', ad: 'Eğitim & Danışmanlık', emoji: '📚' },
  { id: 'etkinlik', ad: 'Etkinlik & Düğün', emoji: '🎊' },
  { id: 'mobilya', ad: 'Mobilya & Dekorasyon', emoji: '🪑' },
];

const SEHIRLER = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri', 'Rastgele'];

export default function AdminAiIlanPage() {
  const [adminKey, setAdminKey] = useState('');
  const [giris, setGiris] = useState(false);
  const [secilenSektor, setSecilenSektor] = useState('');
  const [secilenSehir, setSecilenSehir] = useState('Rastgele');
  const [adet, setAdet] = useState(5);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [sonuc, setSonuc] = useState<any>(null);
  const [log, setLog] = useState<string[]>([]);

  const handleGiris = () => {
    if (adminKey.length > 4) setGiris(true);
    else alert('Admin şifresi giriniz');
  };

  const addLog = (msg: string) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const handleUret = async () => {
    if (!secilenSektor) return alert('Sektör seçiniz');
    setYukleniyor(true);
    setSonuc(null);
    addLog(`${secilenSektor} için ${adet} ilan üretiliyor...`);
    try {
      const res = await fetch('/api/ai-ilan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sektorId: secilenSektor,
          sehir: secilenSehir === 'Rastgele' ? null : secilenSehir,
          adet,
          adminKey,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSonuc(data);
        addLog(`✅ ${data.uretilen} ilan oluşturuldu!`);
      } else {
        addLog(`❌ Hata: ${data.error}`);
      }
    } catch {
      addLog('❌ Bağlantı hatası');
    }
    setYukleniyor(false);
  };

  const handleTumSektorler = async () => {
    if (!confirm('Tüm sektörler için 5er ilan üretilecek. Devam?')) return;
    for (const sektor of SEKTORLER) {
      addLog(`${sektor.emoji} ${sektor.ad} işleniyor...`);
      try {
        const res = await fetch('/api/ai-ilan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sektorId: sektor.id, sehir: null, adet: 5, adminKey }),
        });
        const data = await res.json();
        if (data.success) addLog(`✅ ${sektor.ad}: ${data.uretilen} ilan`);
        else addLog(`❌ ${sektor.ad}: ${data.error}`);
      } catch {
        addLog(`❌ ${sektor.ad}: bağlantı hatası`);
      }
      await new Promise(r => setTimeout(r, 2000));
    }
    addLog('🎉 Tüm sektörler tamamlandı!');
  };

  if (!giris) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-white text-2xl font-black mb-2 text-center">🤖 AI Admin</h1>
          <p className="text-gray-400 text-sm text-center mb-6">Yes-Sir AI İlan Üretici</p>
          <input
            type="password"
            placeholder="Admin şifresi"
            value={adminKey}
            onChange={e => setAdminKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGiris()}
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-500"
          />
          <button onClick={handleGiris} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all">
            Giriş
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl font-black">🤖 AI İlan Üretici</h1>
          <span className="text-green-400 text-xs font-bold bg-green-400/10 px-3 py-1 rounded-full">CANLI</span>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-4">
          <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3 block">Sektör Seç</label>
          <div className="grid grid-cols-2 gap-2">
            {SEKTORLER.map(s => (
              <button
                key={s.id}
                onClick={() => setSecilenSektor(s.id)}
                className={`p-3 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-2 ${
                  secilenSektor === s.id
                    ? 'bg-blue-600 text-white border border-blue-400'
                    : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-blue-500'
                }`}
              >
                <span>{s.emoji}</span>
                <span className="text-xs leading-tight">{s.ad}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 block">Şehir</label>
              <select
                value={secilenSehir}
                onChange={e => setSecilenSehir(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 text-sm"
              >
                {SEHIRLER.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 block">Adet</label>
              <select
                value={adet}
                onChange={e => setAdet(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 text-sm"
              >
                {[3, 5, 10, 15, 20].map(n => <option key={n} value={n}>{n} ilan</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={handleUret}
            disabled={yukleniyor || !secilenSektor}
            className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-xl font-black transition-all text-sm"
          >
            {yukleniyor ? '⏳ Üretiliyor...' : '⚡ İlan Üret'}
          </button>
          <button
            onClick={handleTumSektorler}
            disabled={yukleniyor}
            className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-4 rounded-xl font-black transition-all text-sm"
          >
            🚀 Tüm Sektörler
          </button>
        </div>

        {sonuc && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 mb-4">
            <p className="text-green-400 font-black text-lg">✅ {sonuc.uretilen} ilan oluşturuldu!</p>
            <p className="text-gray-400 text-xs mt-1">Sitede hemen görünmeye başladı</p>
          </div>
        )}

        {log.length > 0 && (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">İşlem Logu</p>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {log.map((l, i) => (
                <p key={i} className="text-gray-300 text-xs font-mono">{l}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
