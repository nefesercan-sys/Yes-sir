'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function KayitSayfasi() {
  const router = useRouter();
  const [form, setForm] = useState({ ad: '', email: '', sifre: '', sifre2: '' });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  const setF = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const kayitOl = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata('');
    if (form.sifre !== form.sifre2) { setHata('Şifreler eşleşmiyor.'); return; }
    if (form.sifre.length < 6)      { setHata('Şifre en az 6 karakter olmalı.'); return; }

    setYukleniyor(true);
    try {
      const r = await fetch('/api/auth/kayit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad: form.ad, email: form.email, sifre: form.sifre }),
      });
      const d = await r.json();
      if (!r.ok) { setHata(d.error ?? 'Kayıt başarısız.'); return; }
      router.push('/giris?kayit=ok');
    } catch {
      setHata('Bağlantı hatası.');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={wrap}>
      <div style={kart}>
        <div style={logo}>
          <span style={logoBadge}>S</span>
          <span>Swap<span style={{ color: '#e8361a' }}>Hubs</span></span>
        </div>
        <h1 style={baslik}>Üye Ol</h1>
        <p style={altyazi}>Ücretsiz hesap oluştur, ilan ver veya teklif al</p>

        {hata && <div style={hataKutu}>{hata}</div>}

        <form onSubmit={kayitOl} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={lbl}>Ad Soyad</label>
            <input style={inp} required placeholder="Adınız Soyadınız"
              value={form.ad} onChange={e => setF('ad', e.target.value)} />
          </div>
          <div>
            <label style={lbl}>E-posta</label>
            <input style={inp} type="email" required placeholder="email@domain.com"
              value={form.email} onChange={e => setF('email', e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Şifre</label>
            <input style={inp} type="password" required placeholder="En az 6 karakter"
              value={form.sifre} onChange={e => setF('sifre', e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Şifre Tekrar</label>
            <input style={inp} type="password" required placeholder="Şifrenizi tekrar girin"
              value={form.sifre2} onChange={e => setF('sifre2', e.target.value)} />
          </div>

          <button type="submit" disabled={yukleniyor} style={btnPrimary}>
            {yukleniyor ? '⏳ Kaydediliyor...' : '🚀 Üye Ol — Ücretsiz'}
          </button>
        </form>

        <p style={altLink}>
          Zaten üye misin?{' '}
          <Link href="/giris" style={{ color: '#e8361a', fontWeight: 700 }}>Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}

// ── Stiller ───────────────────────────────────────────────────
const wrap: React.CSSProperties = {
  minHeight: '100vh', background: 'linear-gradient(135deg,#0d1b3e 0%,#1a2d5a 60%,#0a1628 100%)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
};
const kart: React.CSSProperties = {
  background: '#fff', borderRadius: 24, padding: '40px 36px',
  width: '100%', maxWidth: 420, boxShadow: '0 24px 64px rgba(0,0,0,.25)',
};
const logo: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24,
  fontFamily: "'Unbounded',sans-serif", fontWeight: 900, fontSize: '1.1rem',
};
const logoBadge: React.CSSProperties = {
  background: '#e8361a', color: '#fff', width: 32, height: 32,
  borderRadius: 8, display: 'flex', alignItems: 'center',
  justifyContent: 'center', fontSize: '.9rem', fontWeight: 900,
  flexShrink: 0,
};
const baslik: React.CSSProperties = {
  fontFamily: "'Unbounded',sans-serif", fontWeight: 900,
  fontSize: '1.5rem', marginBottom: 6, letterSpacing: '-.02em',
};
const altyazi: React.CSSProperties = {
  color: '#6b6984', fontSize: '.85rem', marginBottom: 24, lineHeight: 1.5,
};
const hataKutu: React.CSSProperties = {
  background: '#fff3f0', border: '1px solid #f5c4bc', color: '#c0200a',
  borderRadius: 10, padding: '10px 14px', fontSize: '.83rem', marginBottom: 14,
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: '.73rem', fontWeight: 700,
  color: '#6b6984', marginBottom: 5,
};
const inp: React.CSSProperties = {
  width: '100%', border: '1.5px solid #e4e1db', borderRadius: 10,
  padding: '11px 14px', fontSize: '.9rem', fontFamily: 'inherit',
  outline: 'none', color: '#080811', background: '#faf9f7',
  boxSizing: 'border-box',
};
const btnPrimary: React.CSSProperties = {
  width: '100%', background: '#e8361a', color: '#fff', border: 'none',
  padding: '14px', borderRadius: 40, fontWeight: 700, fontSize: '.95rem',
  cursor: 'pointer', fontFamily: 'inherit', marginTop: 4, transition: 'background .2s',
};
const altLink: React.CSSProperties = {
  textAlign: 'center', fontSize: '.83rem', color: '#6b6984', marginTop: 20,
};
