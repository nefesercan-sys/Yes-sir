'use client';
import { useState, useEffect, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function GirisIcerik() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm]           = useState({ email: '', sifre: '' });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata]           = useState('');
  const [basari, setBasari]       = useState('');

  useEffect(() => {
    if (searchParams.get('kayit') === 'ok') {
      setBasari('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
    }
    if (searchParams.get('sifre') === 'ok') {
      setBasari('Şifreniz güncellendi. Giriş yapabilirsiniz.');
    }
  }, [searchParams]);

  const setF = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const girisYap = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata(''); setYukleniyor(true);
    const sonuc = await signIn('credentials', {
      email:    form.email,
      password: form.sifre,
      redirect: false,
    });
    setYukleniyor(false);
    if (sonuc?.ok) {
      const callbackUrl = searchParams.get('callbackUrl') ?? '/panel';
      router.push(callbackUrl);
    } else {
      setHata('E-posta veya şifre hatalı.');
    }
  };

  return (
    <div style={wrap}>
      <div style={kart}>
        <div style={logo}>
          <span style={logoBadge}>S</span>
          <span>Swap<span style={{ color: '#e8361a' }}>Hubs</span></span>
        </div>
        <h1 style={baslik}>Giriş Yap</h1>
        <p style={altyazi}>Hesabınıza giriş yapın</p>

        {basari && (
          <div style={{ background: '#edfaf3', border: '1px solid #a8eaca',
            color: '#0d6e3f', borderRadius: 10, padding: '10px 14px',
            fontSize: '.83rem', marginBottom: 14 }}>
            ✅ {basari}
          </div>
        )}
        {hata && <div style={hataKutu}>❌ {hata}</div>}

        <form onSubmit={girisYap} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={lbl}>E-posta</label>
            <input style={inp} type="email" required placeholder="email@domain.com"
              value={form.email} onChange={e => setF('email', e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Şifre</label>
            <input style={inp} type="password" required placeholder="Şifreniz"
              value={form.sifre} onChange={e => setF('sifre', e.target.value)} />
            <div style={{ textAlign: 'right', marginTop: 6 }}>
              <Link href="/sifre-sifirla"
                style={{ fontSize: '.75rem', color: '#e8361a', fontWeight: 600 }}>
                Şifremi Unuttum
              </Link>
            </div>
          </div>

          <button type="submit" disabled={yukleniyor} style={btnPrimary}>
            {yukleniyor ? '⏳ Giriş yapılıyor...' : '🔐 Giriş Yap'}
          </button>
        </form>

        <p style={altLink}>
          Hesabın yok mu?{' '}
          <Link href="/kayt" style={{ color: '#e8361a', fontWeight: 700 }}>Üye Ol</Link>
        </p>
      </div>
    </div>
  );
}

export default function GirisSayfasi() {
  return <Suspense><GirisIcerik /></Suspense>;
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
  background: '#e8361a', color: '#fff', width: 32, height: 32,
  borderRadius: 8, display: 'flex', alignItems: 'center',
  justifyContent: 'center', fontSize: '.9rem', fontWeight: 900, flexShrink: 0,
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
