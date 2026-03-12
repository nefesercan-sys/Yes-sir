'use client';
import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

function GirisForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/panel';
  const [form, setForm] = useState({ email: '', sifre: '' });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  const handleGiris = async () => {
    if (!form.email || !form.sifre) { setHata('E-posta ve şifre zorunludur.'); return; }
    setYukleniyor(true); setHata('');
    const r = await signIn('credentials', { email: form.email, password: form.sifre, redirect: false });
    if (r?.ok) router.push(redirect);
    else { setHata('E-posta veya şifre hatalı.'); setYukleniyor(false); }
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
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Giriş Yap</h1>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>Hesabınıza giriş yapın</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '8px' }}>
          <input type="email" placeholder="E-posta" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inp} />
          <input type="password" placeholder="Şifre" value={form.sifre} onChange={e => setForm(p => ({ ...p, sifre: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && handleGiris()} style={inp} />
        </div>

        <div style={{ textAlign: 'right', marginBottom: '16px' }}>
          <span onClick={() => router.push('/sifremi-unuttum')} style={{ fontSize: '12px', color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}>
            Şifremi Unuttum
          </span>
        </div>

        {hata && <div style={{ padding: '10px 14px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', marginBottom: '14px' }}>{hata}</div>}

        <button onClick={handleGiris} disabled={yukleniyor}
          style={{ width: '100%', padding: '13px', borderRadius: '12px', background: yukleniyor ? '#94a3b8' : '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '14px', fontWeight: '700', cursor: yukleniyor ? 'not-allowed' : 'pointer', marginBottom: '16px' }}>
          {yukleniyor ? 'Giriş yapılıyor...' : '🚀 Giriş Yap'}
        </button>

        <button onClick={() => signIn('google', { callbackUrl: redirect })}
          style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'white', border: '1.5px solid #e2e8f0', color: '#0f172a', fontFamily: 'inherit', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
          <img src="https://www.google.com/favicon.ico" alt="" style={{ width: '16px', height: '16px' }} />
          Google ile Giriş Yap
        </button>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          Hesabın yok mu?{' '}
          <span onClick={() => router.push('/kayit')} style={{ color: '#2563eb', fontWeight: '700', cursor: 'pointer' }}>Kayıt Ol</span>
        </div>
      </div>
    </div>
  );
}

export default function GirisPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', fontFamily: 'Inter, sans-serif' }}>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Yükleniyor...</div>}>
        <GirisForm />
      </Suspense>
    </div>
  );
}
