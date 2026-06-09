'use client';
import { useState } from 'react';

const URUNLER = [
  { slug: 'sivas-yayla-bali-500g', ad: 'Sivas Yayla Balı 500g' },
  { slug: 'sivas-yayla-bali-1kg', ad: 'Sivas Yayla Balı 1kg' },
  { slug: 'kekik-bali-500g', ad: 'Dağ Kekiği Balı 500g' },
  { slug: 'mese-bali-500g', ad: 'Meşe Balı 500g' },
  { slug: 'cicek-poleni-250g', ad: 'Taze Çiçek Poleni 250g' },
  { slug: 'ham-propolis-50g', ad: 'Ham Propolis 50g' },
  { slug: 'karisik-koy-seti', ad: 'Karışık Köy Seti' },
  { slug: 'kusburnu-kuru-100g', ad: 'Kuşburnu Kuru 100g' },
  { slug: 'dag-kekigi-kuru-100g', ad: 'Dağ Kekiği Kuru 100g' },
];

const ADMIN_SIFRE = 'ArimBalim2024!';

export default function BalGorselYukle() {
  const [girisYapildi, setGirisYapildi] = useState(false);
  const [sifre, setSifre] = useState('');
  const [sifreHata, setSifreHata] = useState(false);
  const [durumlar, setDurumlar] = useState<Record<string, string>>({});
  const [yukleniyor, setYukleniyor] = useState<string | null>(null);

  function girisYap() {
    if (sifre === ADMIN_SIFRE) {
      setGirisYapildi(true);
      setSifreHata(false);
    } else {
      setSifreHata(true);
    }
  }

  async function yukle(slug: string, file: File) {
    setYukleniyor(slug);
    setDurumlar(d => ({ ...d, [slug]: '⏳ Yükleniyor...' }));
    try {
      const form = new FormData();
      form.append('slug', slug);
      form.append('file', file);
      form.append('secret', 'arimbalim2024');
      const res = await fetch('/api/bal/upload-gorsel', { method: 'POST', body: form });
      const data = await res.json();
      if (data.success) {
        setDurumlar(d => ({ ...d, [slug]: '✅ Yüklendi' }));
      } else {
        setDurumlar(d => ({ ...d, [slug]: `❌ Hata: ${data.error}` }));
      }
    } catch (err: any) {
      setDurumlar(d => ({ ...d, [slug]: `❌ ${err.message}` }));
    } finally {
      setYukleniyor(null);
    }
  }

  // Giriş ekranı
  if (!girisYapildi) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#FDF6E3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        padding: '2rem',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 20,
          padding: '2.5rem 2rem',
          boxShadow: '0 8px 32px rgba(28,15,0,.1)',
          width: '100%',
          maxWidth: 360,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🍯</div>
          <h1 style={{ fontFamily: 'serif', fontSize: '1.4rem', color: '#1C0F00', marginBottom: '0.3rem' }}>
            Admin Girişi
          </h1>
          <p style={{ color: '#7A6040', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Arım Balım Çiçeğim
          </p>
          <input
            type="password"
            placeholder="Şifre"
            value={sifre}
            onChange={e => setSifre(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && girisYap()}
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              borderRadius: 10,
              border: sifreHata ? '2px solid #e00' : '1.5px solid #E5E7EB',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          {sifreHata && (
            <p style={{ color: '#e00', fontSize: '0.8rem', marginBottom: '0.8rem' }}>
              ❌ Şifre yanlış
            </p>
          )}
          <button
            onClick={girisYap}
            style={{
              width: '100%',
              background: '#D4870A',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '0.9rem',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  // Admin paneli
  return (
    <div style={{ minHeight: '100vh', background: '#FDF6E3', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h1 style={{ fontFamily: 'serif', fontSize: '1.8rem', color: '#1C0F00' }}>
            🍯 Ürün Görselleri
          </h1>
          <button
            onClick={() => setGirisYapildi(false)}
            style={{ background: 'transparent', border: '1px solid #ccc', borderRadius: 8, padding: '0.3rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem', color: '#7A6040' }}
          >
            Çıkış
          </button>
        </div>
        <p style={{ color: '#7A6040', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Her ürün için fotoğraf seç — otomatik yüklenir.
        </p>

        {URUNLER.map(urun => (
          <div key={urun.slug} style={{
            background: '#fff',
            borderRadius: 12,
            padding: '1rem 1.2rem',
            marginBottom: '0.8rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: 150 }}>
              <div style={{ fontWeight: 700, color: '#1C0F00', fontSize: '0.9rem' }}>{urun.ad}</div>
              <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.2rem' }}>{urun.slug}</div>
            </div>
            <label style={{
              background: yukleniyor === urun.slug ? '#ccc' : '#D4870A',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: 999,
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: yukleniyor === urun.slug ? 'not-allowed' : 'pointer',
            }}>
              📷 Seç
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                disabled={yukleniyor === urun.slug}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) yukle(urun.slug, file);
                }}
              />
            </label>
            {durumlar[urun.slug] && (
              <div style={{ fontSize: '0.8rem', color: durumlar[urun.slug].startsWith('✅') ? '#3A6B35' : '#c00' }}>
                {durumlar[urun.slug]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
