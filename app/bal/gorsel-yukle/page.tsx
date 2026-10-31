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

export default function BalGorselYukle() {
  // Yetki TAMAMEN sunucuda: yönetici olarak giriş yapmış oturum VEYA ADMIN_API_KEY gerekir.
  // Anahtar yalnızca bellekte tutulur (depolanmaz, URL'ye yazılmaz); istek başlığında (x-admin-key) gönderilir.
  const [adminAnahtar, setAdminAnahtar] = useState('');
  const [durumlar, setDurumlar] = useState<Record<string, string>>({});
  const [yukleniyor, setYukleniyor] = useState<string | null>(null);

  async function yukle(slug: string, file: File) {
    setYukleniyor(slug);
    setDurumlar(d => ({ ...d, [slug]: '⏳ Yükleniyor...' }));
    try {
      const form = new FormData();
      form.append('slug', slug);
      form.append('file', file);
      const headers: Record<string, string> = {};
      if (adminAnahtar) headers['x-admin-key'] = adminAnahtar;
      const res = await fetch('/api/bal/upload-gorsel', { method: 'POST', body: form, headers });
      const data = await res.json().catch(() => ({}));
      if (data.success) {
        setDurumlar(d => ({ ...d, [slug]: '✅ Yüklendi' }));
      } else if (res.status === 401) {
        setDurumlar(d => ({ ...d, [slug]: '❌ Yetkisiz: yönetici hesabıyla giriş yapın veya admin anahtarını girin' }));
      } else {
        setDurumlar(d => ({ ...d, [slug]: `❌ Hata: ${data.error || 'Yükleme başarısız'}` }));
      }
    } catch (err: any) {
      setDurumlar(d => ({ ...d, [slug]: `❌ ${err.message}` }));
    } finally {
      setYukleniyor(null);
    }
  }

  // Admin paneli
  return (
    <div style={{ minHeight: '100vh', background: '#FDF6E3', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h1 style={{ fontFamily: 'serif', fontSize: '1.8rem', color: '#1C0F00' }}>
            🍯 Ürün Görselleri
          </h1>
        </div>
        <p style={{ color: '#7A6040', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Her ürün için fotoğraf seç — otomatik yüklenir. Yönetici hesabıyla giriş yaptıysanız anahtar gerekmez.
        </p>
        <input
          type="password"
          autoComplete="off"
          placeholder="Admin anahtarı (isteğe bağlı)"
          value={adminAnahtar}
          onChange={e => setAdminAnahtar(e.target.value)}
          style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: '0.9rem', marginBottom: '1.5rem', boxSizing: 'border-box' }}
        />

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
