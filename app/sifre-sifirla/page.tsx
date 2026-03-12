'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SifreSifirlaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [sifre, setSifre] = useState('');
  const [sifre2, setSifre2] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [sonuc, setSonuc] = useState('');
  const [hata, setHata] = useState('');

  const sifirla = async () => {
    if (!sifre || !sifre2) { setHata('Her iki alanı da doldurun.'); return; }
    if (sifre.length < 6) { setHata('Şifre en az 6 karakter olmalı.'); return; }
    if (sifre !== sifre2) { setHata('Şifreler eşleşmiyor.'); return; }
    setYukleniyor(true); setHata('');
    try {
      const res = await fetch('/api/sifre-sifirla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, sifre }),
      });
      const d = await res.json();
      if (res.ok) {
        setSonuc('✅ Şifreniz başarıyla güncellendi!');
        setTimeout(() => router.push('/giris'), 2000);
      } else setHata(d.error || 'Bir hata oluştu.');
    } catch { setHata('Bir hata oluştu.'); }
    setYukleniyor(false);
  };

  const inp = { width: '100%', padding: '12px 14px', borderRadius: '11px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontFamily: 'inherit', outline: 'none', color: '#0f172a' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');`}</style>
      <div style={{ background: 'white', borderRadius: '24px', padding: '36px 32px', width: '100%', maxWidth: '400px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div onClick={() => router.push('/')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px' }}>🌐</span>
            <span style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'Playfair Display, serif', color: '#0f172a' }}>HizmetAra</span>
          </div>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Yeni Şifre Belirle</h1>
        </div>

        {!token ? (
          <div style={{ padding: '16px', borderRadius: '12px', background: '#fef2f2', border: '1.5px solid #fecaca', color: '#dc2626', fontSize: '13px', textAlign: 'center' }}>
            Geçersiz veya süresi dolmuş link.
          </div>
        ) : sonuc ? (
          <div style={{ padding: '16px', borderRadius: '12px', background: '#f0fdf4', border: '1.5px solid #bbf7d0', color: '#059669', fontSize: '13px', textAlign: 'center' }}>
            {sonuc}<br /><span style={{ fontSize: '11px' }}>Giriş sayfasına yönlendiriliyorsunuz...</span>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <input type="password" placeholder="Yeni şifre (en az 6 karakter)" value={sifre} onChange={e => setSifre(e.target.value)} style={inp} />
              <input type="password" placeholder="Şifreyi tekrar girin" value={sifre2} onChange={e => setSifre2(e.target.value)} onKeyDown={e => e.key === 'Enter' && sifirla()} style={inp} />
            </div>
            {hata && <div style={{ padding: '10px 14px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', marginBottom: '14px' }}>{hata}</div>}
            <button onClick={sifirla} disabled={yukleniyor}
              style={{ width: '100%', padding: '13px', borderRadius: '12px', background: yukleniyor ? '#94a3b8' : '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '14px', fontWeight: '700', cursor: yukleniyor ? 'not-allowed' : 'pointer' }}>
              {yukleniyor ? 'Güncelleniyor...' : '🔒 Şifremi Güncelle'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function SifreSifirlaPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Yükleniyor...</div>}>
      <SifreSifirlaForm />
    </Suspense>
  );
}
