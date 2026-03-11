'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GirisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/panel';
  const [form, setForm] = useState({ email: '', sifre: '' });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  const handleGiris = async () => {
    if (!form.email || !form.sifre) { setHata('E-posta ve şifre zorunlu'); return; }
    setYukleniyor(true); setHata('');
    const r = await signIn('credentials', { email: form.email, password: form.sifre, redirect: false });
    if (r?.ok) router.push(redirect);
    else setHata('E-posta veya şifre hatalı');
    setYukleniyor(false);
  };

  const inp = {
    width: '100%', padding: '13px 16px', borderRadius: '12px',
    border: '1.5px solid #e2e8f0', fontSize: '15px',
    fontFamily: 'Inter, sans-serif', outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:wght@700&display=swap'); * { box-sizing: border-box; } input:focus { border-color: #2563eb !important; }`}</style>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🌐</div>
          <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', fontFamily: 'Playfair Display, serif' }}>HizmetAra</h1>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '20px', textAlign: 'center' }}>Giriş Yap</h2>

          {hata && <div style={{ padding: '11px 14px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', marginBottom: '14px' }}>⚠️ {hata}</div>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="E-posta adresiniz" style={inp} />
            <input type="password" value={form.sifre} onChange={e => setForm(p => ({ ...p, sifre: e.target.value }))} placeholder="Şifreniz"
              onKeyDown={e => e.key === 'Enter' && handleGiris()} style={inp} />
          </div>

          <button onClick={handleGiris} disabled={yukleniyor}
            style={{ width: '100%', padding: '14px', borderRadius: '14px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px' }}>
            {yukleniyor ? '⏳ Giriş Yapılıyor...' : 'Giriş Yap →'}
          </button>

          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <div style={{ height: '1px', background: '#e2e8f0' }} />
            <span style={{ position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 12px', color: '#94a3b8', fontSize: '12px' }}>veya</span>
          </div>

          <button onClick={() => signIn('google', { callbackUrl: redirect })}
            style={{ width: '100%', padding: '13px', borderRadius: '14px', background: 'white', border: '1.5px solid #e2e8f0', color: '#0f172a', fontFamily: 'inherit', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <img src="https://www.google.com/favicon.ico" alt="G" style={{ width: '18px' }} />
            Google ile Giriş Yap
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
            Hesabınız yok mu?{' '}
            <span onClick={() => router.push('/uye-ol')} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}>Üye Ol</span>
          </p>
        </div>
      </div>
    </div>
  );
}
