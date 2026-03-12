'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SifremiUnuttumPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [sonuc, setSonuc] = useState('');
  const [hata, setHata] = useState('');

  const gonder = async () => {
    if (!email) { setHata('E-posta adresi zorunludur.'); return; }
    setYukleniyor(true); setHata(''); setSonuc('');
    try {
      const res = await fetch('/api/sifremi-unuttum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const d = await res.json();
      if (res.ok) setSonuc('✅ Şifre sıfırlama linki e-posta adresinize gönderildi. Spam klasörünü de kontrol edin.');
      else setHata(d.error || 'Bir hata oluştu.');
    } catch { setHata('Bir hata oluştu.'); }
    setYukleniyor(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');`}</style>
      <div style={{ background: 'white', borderRadius: '24px', padding: '36px 32px', width: '100%', maxWidth: '400px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div onClick={() => router.push('/')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px' }}>🌐</span>
            <span style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'Playfair Display, serif', color: '#0f172a' }}>HizmetAra</span>
          </div>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔑</div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Şifremi Unuttum</h1>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>E-posta adresinize sıfırlama linki gönderilecek</p>
        </div>

        {sonuc ? (
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f0fdf4', border: '1.5px solid #bbf7d0', color: '#059669', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
            {sonuc}
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && gonder()}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '11px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontFamily: 'inherit', outline: 'none', color: '#0f172a', marginBottom: '12px' }}
            />
            {hata && <div style={{ padding: '10px 14px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{hata}</div>}
            <button onClick={gonder} disabled={yukleniyor}
              style={{ width: '100%', padding: '13px', borderRadius: '12px', background: yukleniyor ? '#94a3b8' : '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '14px', fontWeight: '700', cursor: yukleniyor ? 'not-allowed' : 'pointer', marginBottom: '16px' }}>
              {yukleniyor ? 'Gönderiliyor...' : '📧 Sıfırlama Linki Gönder'}
            </button>
          </>
        )}

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          <span onClick={() => router.push('/giris')} style={{ color: '#2563eb', fontWeight: '700', cursor: 'pointer' }}>← Giriş Sayfasına Dön</span>
        </div>
      </div>
    </div>
  );
}
