'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function SifreSifirlaIcerik() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const token        = searchParams.get('token');

  // Adım 1 — E-posta gir
  const [email,       setEmail]       = useState('');
  const [gonderildi,  setGonderildi]  = useState(false);
  const [yukleniyor,  setYukleniyor]  = useState(false);
  const [hata,        setHata]        = useState('');

  // Adım 2 — Yeni şifre gir (token varsa)
  const [yeniSifre,   setYeniSifre]   = useState('');
  const [yeniSifre2,  setYeniSifre2]  = useState('');

  const emailGonder = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata(''); setYukleniyor(true);
    try {
      const r = await fetch('/api/auth/sifre-sifirla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const d = await r.json();
      if (!r.ok) { setHata(d.error ?? 'Hata'); return; }
      setGonderildi(true);
    } catch { setHata('Bağlantı hatası.'); }
    finally  { setYukleniyor(false); }
  };

  const sifreGuncelle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (yeniSifre !== yeniSifre2) { setHata('Şifreler eşleşmiyor.'); return; }
    if (yeniSifre.length < 6)     { setHata('En az 6 karakter.'); return; }
    setHata(''); setYukleniyor(true);
    try {
      const r = await fetch('/api/auth/sifre-guncelle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, sifre: yeniSifre }),
      });
      const d = await r.json();
      if (!r.ok) { setHata(d.error ?? 'Hata'); return; }
      router.push('/giris?sifre=ok');
    } catch { setHata('Bağlantı hatası.'); }
    finally  { setYukleniyor(false); }
  };

  return (
    <div style={wrap}>
      <div style={kart}>
        <div style={logo}>
          <span style={logoBadge}>S</span>
          <span>Swap<span style={{ color: '#e8361a' }}>Hubs</span></span>
        </div>

        {/* ADIM 2 — Yeni şifre (token var) */}
        {token ? (
          <>
            <h1 style={baslik}>Yeni Şifre</h1>
            <p style={altyazi}>Yeni şifrenizi belirleyin</p>
            {hata && <div style={hataKutu}>❌ {hata}</div>}
            <form onSubmit={sifreGuncelle}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={lbl}>Yeni Şifre</label>
                <input style={inp} type="password" required placeholder="En az 6 karakter"
                  value={yeniSifre} onChange={e => setYeniSifre(e.target.value)} />
              </div>
              <div>
                <label style={lbl}>Yeni Şifre Tekrar</label>
                <input style={inp} type="password" required placeholder="Tekrar girin"
                  value={yeniSifre2} onChange={e => setYeniSifre2(e.target.value)} />
              </div>
              <button type="submit" disabled={yukleniyor} style={btnPrimary}>
                {yukleniyor ? '⏳...' : '🔐 Şifreyi Güncelle'}
              </button>
            </form>
          </>
        ) : gonderildi ? (
          /* ADIM 1 TAMAMLANDI */
          <>
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>📧</div>
              <h1 style={{ ...baslik, fontSize: '1.2rem' }}>E-posta Gönderildi</h1>
              <p style={{ ...altyazi, marginBottom: 24 }}>
                <strong>{email}</strong> adresine şifre sıfırlama bağlantısı gönderildi.
                Gelen kutunuzu kontrol edin.
              </p>
              <Link href="/giris" style={{ color: '#e8361a', fontWeight: 700, fontSize: '.88rem' }}>
                ← Giriş Sayfasına Dön
              </Link>
            </div>
          </>
        ) : (
          /* ADIM 1 — E-posta gir */
          <>
            <h1 style={baslik}>Şifremi Unuttum</h1>
            <p style={altyazi}>
              E-posta adresinizi girin, şifre sıfırlama bağlantısı gönderelim.
            </p>
            {hata && <div style={hataKutu}>❌ {hata}</div>}
            <form onSubmit={emailGonder}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={lbl}>E-posta</label>
                <input style={inp} type="email" required placeholder="email@domain.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button type="submit" disabled={yukleniyor} style={btnPrimary}>
                {yukleniyor ? '⏳ Gönderiliyor...' : '📧 Sıfırlama Bağlantısı Gönder'}
              </button>
            </form>
            <p style={altLink}>
              <Link href="/giris" style={{ color: '#e8361a', fontWeight: 700 }}>
                ← Giriş Yap
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function SifreSifrala() {
  return <Suspense><SifreSifirlaIcerik /></Suspense>;
}

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
  background: '#e8361a', color: '#fff', width: 32, height: 32, borderRadius: 8,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '.9rem', fontWeight: 900, flexShrink: 0,
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
  display: 'block', fontSize: '.73rem', fontWeight: 700, color: '#6b6984', marginBottom: 5,
};
const inp: React.CSSProperties = {
  width: '100%', border: '1.5px solid #e4e1db', borderRadius: 10,
  padding: '11px 14px', fontSize: '.9rem', fontFamily: 'inherit',
  outline: 'none', color: '#080811', background: '#faf9f7', boxSizing: 'border-box',
};
const btnPrimary: React.CSSProperties = {
  width: '100%', background: '#e8361a', color: '#fff', border: 'none',
  padding: '14px', borderRadius: 40, fontWeight: 700, fontSize: '.95rem',
  cursor: 'pointer', fontFamily: 'inherit', marginTop: 4,
};
const altLink: React.CSSProperties = {
  textAlign: 'center', fontSize: '.83rem', color: '#6b6984', marginTop: 20,
};
