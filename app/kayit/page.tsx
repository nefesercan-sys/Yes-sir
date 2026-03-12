'use client';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

function KayitForm() {
  const router = useRouter();
  const [form, setForm] = useState({ ad: '', soyad: '', email: '', sifre: '', tip: 'hizmet_alan' });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  const kayitOl = async () => {
    if (!form.ad || !form.email || !form.sifre) { setHata('Ad, e-posta ve şifre zorunludur.'); return; }
    if (form.sifre.length < 6) { setHata('Şifre en az 6 karakter olmalı.'); return; }
    setYukleniyor(true); setHata('');
    try {
      const res = await fetch('/api/kayit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (!res.ok) { setHata(d.error || 'Kayıt başarısız.'); setYukleniyor(false); return; }
      const r = await signIn('credentials', { email: form.email, password: form.sifre, redirect: false });
      if (r?.ok) router.push('/panel');
      else router.push('/giris');
    } catch { setHata('Bir hata oluştu.'); }
    setYukleniyor(false);
  };

  const inp = { width: '100%', padding: '12px 14px', borderRadius: '11px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontFamily: 'inherit', outline: 'none', color: '#0f172a' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');`}</style>
      <div style={{ background: 'white', borderRadius: '24px', padding: '36px 32px', width: '100%', maxWidth: '420px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div onClick={() => router.push('/')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px' }}>🌐</span>
            <span style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'Playfair Display, serif', color: '#0f172a' }}>HizmetAra</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Hesap Oluştur</h1>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>Ücretsiz kayıt ol, hemen başla</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
          {[
            { v: 'hizmet_alan', l: '🛒 Hizmet Al', a: 'İlan ver, teklif al' },
            { v: 'hizmet_veren', l: '🔧 Hizmet Ver', a: 'Teklif ver, kazan' },
          ].map(t => (
            <button key={t.v} onClick={() => setForm(p => ({ ...p, tip: t.v }))}
              style={{ padding: '12px', borderRadius: '12px', border: `2px solid ${form.tip === t.v ? '#2563eb' : '#e2e8f0'}`, background: form.tip === t.v ? '#eff6ff' : 'white', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', transition: 'all 0.15s' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: form.tip === t.v ? '#2563eb' : '#0f172a' }}>{t.l}</p>
              <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{t.a}</p>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <input placeholder="Ad *" value={form.ad} onChange={e => setForm(p => ({ ...p, ad: e.target.value }))} style={inp} />
            <input placeholder="Soyad" value={form.soyad} onChange={e => setForm(p => ({ ...p, soyad: e.target.value }))} style={inp} />
          </div>
          <input type="email" placeholder="E-posta *" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inp} />
          <input type="password" placeholder="Şifre * (en az 6 karakter)" value={form.sifre} onChange={e => setForm(p => ({ ...p, sifre: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && kayitOl()} style={inp} />
        </div>

        {hata && <div style={{ padding: '10px 14px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', marginBottom: '14px' }}>{hata}</div>}

        <button onClick={kayitOl} disabled={yukleniyor}
          style={{ width: '100%', padding: '13px', borderRadius: '12px', background: yukleniyor ? '#94a3b8' : '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '14px', fontWeight: '700', cursor: yukleniyor ? 'not-allowed' : 'pointer', marginBottom: '16px' }}>
          {yukleniyor ? 'Kaydediliyor...' : '🚀 Kayıt Ol'}
        </button>

        <button onClick={() => signIn('google', { callbackUrl: '/panel' })}
          style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'white', border: '1.5px solid #e2e8f0', color: '#0f172a', fontFamily: 'inherit', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
          <img src="https://www.google.com/favicon.ico" alt="" style={{ width: '16px', height: '16px' }} />
          Google ile Devam Et
        </button>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          Zaten hesabın var mı?{' '}
          <span onClick={() => router.push('/giris')} style={{ color: '#2563eb', fontWeight: '700', cursor: 'pointer' }}>Giriş Yap</span>
        </div>
      </div>
    </div>
  );
}

export default function KayitPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Yükleniyor...</div>}>
      <KayitForm />
    </Suspense>
  );
}
