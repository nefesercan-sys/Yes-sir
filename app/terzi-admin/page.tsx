'use client';

import { useState, useEffect } from 'react';

const YESIL = '#2d8c6e';

type Kayit = { telefon: string; otpKod: string; otpSonGecerlilik: string };

export default function TerziAdminPage() {
  const [secret, setSecret] = useState('');
  const [girisYapildi, setGirisYapildi] = useState(false);
  const [kayitlar, setKayitlar] = useState<Kayit[]>([]);
  const [hata, setHata] = useState('');

  const getir = async (s: string) => {
    const res = await fetch(`/api/terzi/admin/bekleyen-kodlar?secret=${encodeURIComponent(s)}`);
    if (!res.ok) { setHata('Parola hatalı'); setGirisYapildi(false); return; }
    setKayitlar(await res.json());
    setHata('');
    setGirisYapildi(true);
  };

  useEffect(() => {
    if (!girisYapildi) return;
    const interval = setInterval(() => getir(secret), 8000);
    return () => clearInterval(interval);
  }, [girisYapildi, secret]);

  const kalanSaniye = (bitis: string) => Math.max(0, Math.round((new Date(bitis).getTime() - Date.now()) / 1000));

  const whatsappLinki = (telefon: string, kod: string) =>
    `https://wa.me/${telefon.replace('+', '')}?text=${encodeURIComponent(`SwapHubs Terzi doğrulama kodunuz: ${kod}`)}`;

  if (!girisYapildi) {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f7faf9', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ width: '100%', maxWidth: 380, background: '#fff', padding: 24, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>🔐 Bekleyen Kodlar (Personel)</h1>
          <input type="password" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Yönetici parolası"
            style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 15, marginBottom: 12 }} />
          {hata && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{hata}</p>}
          <button onClick={() => getir(secret)}
            style={{ width: '100%', padding: 14, background: YESIL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f7faf9', minHeight: '100dvh', padding: 20 }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>🔐 Bekleyen Doğrulama Kodları</h1>
          <a href="/terzi-admin/uyeler" style={{ fontSize: 12, fontWeight: 700, color: YESIL, textDecoration: 'none' }}>👥 Üyeler →</a>
        </div>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>Kod'a dokunup WhatsApp'tan kendi hattınızdan iletin. 8 saniyede bir otomatik yenilenir.</p>

        {kayitlar.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>Bekleyen kod yok.</p>}

        {kayitlar.map((k) => {
          const saniye = kalanSaniye(k.otpSonGecerlilik);
          if (saniye <= 0) return null;
          return (
            <div key={k.telefon} style={{ padding: 16, borderRadius: 14, border: '1px solid #eef2f0', marginBottom: 12, background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{k.telefon}</span>
                <span style={{ fontSize: 12, color: saniye < 60 ? '#dc2626' : '#94a3b8', fontWeight: 700 }}>{saniye}sn</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 4, color: YESIL, marginBottom: 12 }}>{k.otpKod}</div>
              <a href={whatsappLinki(k.telefon, k.otpKod)} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', padding: 12, borderRadius: 10, background: '#25D366', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                💬 WhatsApp'tan Gönder
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
