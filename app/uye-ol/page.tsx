'use client';
import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

// 🚨 SİBER DÜZELTME: Tüm üyelik mantığı ayrı bir bileşene alındı
function UyeOlIcerik() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tip = searchParams.get('tip') || 'hizmet_alan';
  const redirect = searchParams.get('redirect') || '/panel';

  const [mod, setMod] = useState<'secim' | 'form'>('secim');
  const [uyeTip, setUyeTip] = useState(tip);
  const [form, setForm] = useState({ ad: '', soyad: '', email: '', sifre: '', telefon: '', sehir: '', firmaAd: '' });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  const handleKayit = async () => {
    if (!form.ad || !form.email || !form.sifre) { setHata('Ad, e-posta ve şifre zorunlu'); return; }
    if (form.sifre.length < 6) { setHata('Şifre en az 6 karakter olmalı'); return; }
    setYukleniyor(true); setHata('');

    const res = await fetch('/api/kayit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, tip: uyeTip }),
    });
    const data = await res.json();

    if (res.ok) {
      const r = await signIn('credentials', { email: form.email, password: form.sifre, redirect: false });
      if (r?.ok) router.push(uyeTip === 'otel' ? '/otel-profil' : redirect);
      else setHata('Kayıt başarılı ama giriş yapılamadı');
    } else {
      setHata(data.error || 'Kayıt başarısız');
    }
    setYukleniyor(false);
  };

  const inp = {
    width: '100%', padding: '12px 14px', borderRadius: '12px',
    border: '1.5px solid #e2e8f0', fontSize: '14px',
    fontFamily: 'Inter, sans-serif', outline: 'none',
  };

  return (
    <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>

      {/* ADIM 1: Üye Tipi Seçimi */}
      {mod === 'secim' && (
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '6px', textAlign: 'center' }}>
            Nasıl Kaydolmak İstiyorsunuz?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', marginBottom: '24px' }}>
            Hesap tipinize göre farklı özellikler sunulur
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {[
              {
                tip: 'hizmet_alan',
                icon: '🛍️',
                baslik: 'Hizmet Alan',
                aciklama: 'İlan verin, teklif alın, en iyi hizmeti seçin',
                renk: '#2563eb',
              },
              {
                tip: 'hizmet_veren',
                icon: '💼',
                baslik: 'Hizmet Veren / Usta',
                aciklama: 'İlanlara teklif verin, müşteri bulun',
                renk: '#059669',
              },
              {
                tip: 'otel',
                icon: '🏨',
                baslik: 'Otel / Tesis',
                aciklama: 'Turizm ilanlarına teklif verin, tesis profilinizi oluşturun',
                renk: '#7c3aed',
              },
              {
                tip: 'firma',
                icon: '🏭',
                baslik: 'Firma / Üretici',
                aciklama: 'Üretim ve toplu sipariş ilanlarına teklif verin',
                renk: '#d97706',
              },
            ].map(t => (
              <div key={t.tip} className={`tip-kart ${uyeTip === t.tip ? 'aktif' : ''}`}
                onClick={() => setUyeTip(t.tip)}
                style={{ borderColor: uyeTip === t.tip ? t.renk : '#e2e8f0', background: uyeTip === t.tip ? t.renk + '10' : 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}>
                  <span style={{ fontSize: '28px', flexShrink: 0 }}>{t.icon}</span>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '3px' }}>{t.baslik}</p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{t.aciklama}</p>
                  </div>
                  {uyeTip === t.tip && <span style={{ marginLeft: 'auto', color: t.renk, fontSize: '20px', flexShrink: 0 }}>✓</span>}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setMod('form')}
            style={{ width: '100%', padding: '14px', borderRadius: '14px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px' }}>
            Devam Et →
          </button>

          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <div style={{ height: '1px', background: '#e2e8f0' }} />
            <span style={{ position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 12px', color: '#94a3b8', fontSize: '12px' }}>veya</span>
          </div>

          <button onClick={() => signIn('google', { callbackUrl: redirect })}
            style={{ width: '100%', padding: '13px', borderRadius: '14px', background: 'white', border: '1.5px solid #e2e8f0', color: '#0f172a', fontFamily: 'inherit', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <img src="https://www.google.com/favicon.ico" alt="G" style={{ width: '18px' }} />
            Google ile Kayıt Ol
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', marginTop: '16px' }}>
            Zaten üye misiniz?{' '}
            <span onClick={() => router.push('/giris')} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}>Giriş Yap</span>
          </p>
        </div>
      )}

      {/* ADIM 2: Kayıt Formu */}
      {mod === 'form' && (
        <div>
          <button onClick={() => setMod('secim')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'inherit' }}>
            ← Geri
          </button>

          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '4px' }}>
            {uyeTip === 'otel' ? '🏨 Otel / Tesis Kaydı' :
              uyeTip === 'firma' ? '🏭 Firma Kaydı' :
                uyeTip === 'hizmet_veren' ? '💼 Hizmet Veren Kaydı' :
                  '🛍️ Üye Kaydı'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '20px' }}>Tüm alanları eksiksiz doldurun</p>

          {hata && (
            <div style={{ padding: '12px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', marginBottom: '14px' }}>
              ⚠️ {hata}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Ad *</label>
                <input value={form.ad} onChange={e => setForm(p => ({ ...p, ad: e.target.value }))} placeholder="Adınız" style={inp} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Soyad</label>
                <input value={form.soyad} onChange={e => setForm(p => ({ ...p, soyad: e.target.value }))} placeholder="Soyadınız" style={inp} />
              </div>
            </div>

            {(uyeTip === 'otel' || uyeTip === 'firma') && (
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>
                  {uyeTip === 'otel' ? 'Tesis Adı *' : 'Firma Adı *'}
                </label>
                <input value={form.firmaAd} onChange={e => setForm(p => ({ ...p, firmaAd: e.target.value }))} placeholder={uyeTip === 'otel' ? 'Otelinizin adı' : 'Firma adı'} style={inp} />
              </div>
            )}

            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>E-posta *</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="ornek@email.com" style={inp} />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Şifre *</label>
              <input type="password" value={form.sifre} onChange={e => setForm(p => ({ ...p, sifre: e.target.value }))} placeholder="En az 6 karakter" style={inp} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Telefon</label>
                <input value={form.telefon} onChange={e => setForm(p => ({ ...p, telefon: e.target.value }))} placeholder="05xx..." style={inp} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Şehir</label>
                <input value={form.sehir} onChange={e => setForm(p => ({ ...p, sehir: e.target.value }))} placeholder="İstanbul" style={inp} />
              </div>
            </div>

            <button onClick={handleKayit} disabled={yukleniyor}
              style={{ width: '100%', padding: '14px', borderRadius: '14px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '4px' }}>
              {yukleniyor ? '⏳ Kayıt Yapılıyor...' : '✅ Kaydol'}
            </button>

            <div style={{ position: 'relative' }}>
              <div style={{ height: '1px', background: '#e2e8f0' }} />
              <span style={{ position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 12px', color: '#94a3b8', fontSize: '12px' }}>veya</span>
            </div>

            <button onClick={() => signIn('google', { callbackUrl: redirect })}
              style={{ width: '100%', padding: '13px', borderRadius: '14px', background: 'white', border: '1.5px solid #e2e8f0', color: '#0f172a', fontFamily: 'inherit', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <img src="https://www.google.com/favicon.ico" alt="G" style={{ width: '16px' }} />
              Google ile Kayıt Ol
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 🚨 VERCEL İÇİN SİBER KALKAN (SUSPENSE) EKLENDİ
export default function UyeOlPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; }
        input:focus { border-color: #2563eb !important; outline: none; }
        .tip-kart { background: white; border-radius: 20px; padding: 28px 24px; cursor: pointer; text-align: center; border: 2.5px solid #e2e8f0; transition: all 0.2s; }
        .tip-kart:hover { border-color: #2563eb; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,0.15); }
        .tip-kart.aktif { border-color: #2563eb; background: #eff6ff; }
      `}</style>

      <div style={{ width: '100%', maxWidth: '520px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🌐</div>
          <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', fontFamily: 'Playfair Display, serif' }}>HizmetAra</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Dünya çapında hizmet ilan havuzu</p>
        </div>

        <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>Siber Kalkan Yükleniyor...</div>}>
          <UyeOlIcerik />
        </Suspense>

      </div>
    </div>
  );
}
