'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SEKTORLER, FormAlan, Sektor } from '@/lib/sektorler';
// 🚨 SİBER SİLAHIMIZI İÇERİ ALIYORUZ!
import MedyaYukleyici from '@/components/MedyaYukleyici'; 

export default function IlanVerPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [adim, setAdim] = useState(1);
  const [seciliSektor, setSeciliSektor] = useState<Sektor | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [medyalar, setMedyalar] = useState<{ url: string; tip: 'resim' | 'video' }[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  const setField = (key: string, val: any) => setFormData(p => ({ ...p, [key]: val }));

  const toggleMulti = (key: string, val: string) => {
    const mevcut: string[] = formData[key] || [];
    setField(key, mevcut.includes(val) ? mevcut.filter(v => v !== val) : [...mevcut, val]);
  };

  // 🚨 Buluttan gelen linki yakalayıp ilana ekleyen siber fonksiyon
  const handleMedyaYuklendi = (url: string) => {
    // URL'nin sonuna bakarak video mu resim mi olduğunu anlıyoruz
    const isVideo = url.match(/\.(mp4|webm|ogg|mov)$/i);
    setMedyalar(p => [...p, { url, tip: isVideo ? 'video' : 'resim' }]);
  };

  const handleYayinla = async () => {
    if (!seciliSektor) return;
    const zorunlular = seciliSektor.hizmetAlanFormu.filter(f => f.zorunlu);
    for (const f of zorunlular) {
      if (!formData[f.key]) { setHata(`${f.label} zorunludur`); return; }
    }
    setYukleniyor(true);
    setHata('');

    const baslik = formData.baslik || `${seciliSektor.ad} - ${formData.altKategori || ''} - ${formData.sehir || ''}`;

    const res = await fetch('/api/ilanlar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sektorId: seciliSektor.id,
        baslik,
        formData,
        medyalar: medyalar.map(m => m.url), // Sadece URL'leri veritabanına gönderiyoruz
        butceMin: Number(formData.butceMin) || 0,
        butceMax: Number(formData.butceMax) || 0,
        butceBirimi: seciliSektor.butceBirimi,
        gizliAd: !session,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      if (!session) {
        router.push(`/ilan/${data.id}?yeni=1&gizli=1`);
      } else {
        router.push(`/ilan/${data.id}?yeni=1`);
      }
    } else {
      setHata(data.error || 'Hata oluştu');
    }
    setYukleniyor(false);
  };

  const inp = {
    width: '100%', padding: '11px 14px', borderRadius: '11px',
    border: '1.5px solid #e2e8f0', fontSize: '14px',
    fontFamily: 'Inter, sans-serif', outline: 'none', background: 'white',
  };

  const renderAlan = (alan: FormAlan) => {
    switch (alan.tip) {
      case 'text':
      case 'number':
        return (
          <input type={alan.tip} value={formData[alan.key] || ''}
            onChange={e => setField(alan.key, e.target.value)}
            placeholder={alan.placeholder} style={inp} />
        );
      case 'date':
        return <input type="date" value={formData[alan.key] || ''} onChange={e => setField(alan.key, e.target.value)} style={inp} />;
      case 'daterange':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <input type="date" placeholder="Başlangıç" value={formData[alan.key + '_bas'] || ''} onChange={e => setField(alan.key + '_bas', e.target.value)} style={inp} />
            <input type="date" placeholder="Bitiş" value={formData[alan.key + '_bit'] || ''} onChange={e => setField(alan.key + '_bit', e.target.value)} style={inp} />
          </div>
        );
      case 'textarea':
        return (
          <textarea value={formData[alan.key] || ''} onChange={e => setField(alan.key, e.target.value)}
            placeholder={alan.placeholder} rows={4}
            style={{ ...inp, height: '100px', resize: 'vertical' }} />
        );
      case 'select':
        return (
          <select value={formData[alan.key] || ''} onChange={e => setField(alan.key, e.target.value)} style={inp}>
            <option value="">Seçin</option>
            {alan.secenekler?.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        );
      case 'multiselect':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {alan.secenekler?.map(s => {
              const secili = (formData[alan.key] || []).includes(s);
              return (
                <button key={s} type="button" onClick={() => toggleMulti(alan.key, s)}
                  style={{ padding: '7px 12px', borderRadius: '8px', border: `1.5px solid ${secili ? '#2563eb' : '#e2e8f0'}`, background: secili ? '#2563eb' : 'white', color: secili ? 'white' : '#475569', fontFamily: 'inherit', fontSize: '12px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.12s' }}>
                  {secili ? '✓ ' : ''}{s}
                </button>
              );
            })}
          </div>
        );
      case 'range':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '13px' }}>{alan.birim}</span>
              <input type="number" placeholder="Min" value={formData[alan.key + 'Min'] || ''} onChange={e => setField(alan.key + 'Min', e.target.value)}
                style={{ ...inp, paddingLeft: alan.birim === '$' ? '28px' : '14px' }} />
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '13px' }}>{alan.birim}</span>
              <input type="number" placeholder="Maks" value={formData[alan.key + 'Max'] || ''} onChange={e => setField(alan.key + 'Max', e.target.value)}
                style={{ ...inp, paddingLeft: alan.birim === '$' ? '28px' : '14px' }} />
            </div>
          </div>
        );
      case 'toggle':
        return (
          <div onClick={() => setField(alan.key, !formData[alan.key])}
            style={{ width: '48px', height: '26px', borderRadius: '13px', background: formData[alan.key] ? '#2563eb' : '#e2e8f0', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: formData[alan.key] ? '24px' : '2px', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
          </div>
        );
      default:
        return null;
    }
  };

  const gruplar = seciliSektor ? seciliSektor.hizmetAlanFormu.reduce((acc, alan) => {
    const g = alan.grup || 'Genel';
    if (!acc[g]) acc[g] = [];
    acc[g].push(alan);
    return acc;
  }, {} as Record<string, FormAlan[]>) : {};

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', paddingBottom: '80px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; }
        input, select, textarea { font-family: Inter, sans-serif; }
        input:focus, select:focus, textarea:focus { border-color: #2563eb !important; }
      `}</style>

      {/* Header */}
      <div style={{ background: '#0f172a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => adim > 1 ? setAdim(p => p - 1) : router.push('/')}
          style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '10px', cursor: 'pointer', fontSize: '16px' }}>←</button>
        <div style={{ flex: 1 }}>
          <h1 style={{ color: 'white', fontSize: '16px', fontWeight: '700', fontFamily: 'Playfair Display, serif' }}>İlan Ver</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
            Adım {adim} / {seciliSektor ? 3 : 1} {seciliSektor ? `· ${seciliSektor.icon} ${seciliSektor.ad}` : ''}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[1, 2, 3].map(a => (
            <div key={a} style={{ width: '28px', height: '4px', borderRadius: '2px', background: a <= adim ? '#f59e0b' : 'rgba(255,255,255,0.15)', transition: 'background 0.2s' }} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '20px 16px' }}>
        {hata && (
          <div style={{ padding: '12px 16px', borderRadius: '12px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', marginBottom: '14px' }}>
            ⚠️ {hata}
          </div>
        )}

        {/* ── ADIM 1: SEKTÖR SEÇ ── */}
        {adim === 1 && (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '6px' }}>Hangi Sektörde?</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>İlanınız hangi sektörde olduğunu seçin. Forma o sektöre özel alanlar gelir.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
              {SEKTORLER.map(s => (
                <div key={s.id}
                  onClick={() => { setSeciliSektor(s); setFormData({}); setAdim(2); }}
                  style={{ background: 'white', borderRadius: '16px', border: `2px solid ${seciliSektor?.id === s.id ? s.renk : '#e2e8f0'}`, padding: '18px 14px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                  <p style={{ fontSize: '32px', marginBottom: '8px' }}>{s.icon}</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{s.ad}</p>
                  <p style={{ fontSize: '10px', color: '#94a3b8' }}>{s.altKategoriler?.length || 0} alt kategori</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ADIM 2: FORM ── */}
        {adim === 2 && seciliSektor && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: seciliSektor.renk + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                {seciliSektor.icon}
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif' }}>{seciliSektor.ad}</h2>
                <p style={{ color: '#94a3b8', fontSize: '12px' }}>Talebinizi detaylı doldurun</p>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', border: '1.5px solid #e2e8f0', padding: '18px', marginBottom: '14px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>İlan Başlığı</label>
              <input value={formData.baslik || ''} onChange={e => setField('baslik', e.target.value)}
                placeholder="Kısa ve açıklayıcı bir başlık yazın"
                style={inp} />
            </div>

            {Object.entries(gruplar).map(([grupAdi, alanlar]) => (
              <div key={grupAdi} style={{ background: 'white', borderRadius: '16px', border: '1.5px solid #e2e8f0', padding: '18px', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: seciliSektor.renk, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px', paddingBottom: '8px', borderBottom: `2px solid ${seciliSektor.renk}20` }}>
                  {grupAdi}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {alanlar.map(alan => (
                    <div key={alan.key}>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                        {alan.label}
                        {alan.zorunlu && <span style={{ color: '#dc2626', fontSize: '13px' }}>*</span>}
                        {alan.birim && alan.tip !== 'range' && <span style={{ color: '#94a3b8', fontWeight: '400' }}>({alan.birim})</span>}
                      </label>
                      {renderAlan(alan)}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button onClick={() => setAdim(3)}
              style={{ width: '100%', padding: '14px', borderRadius: '14px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              Devam Et → Medya Ekle
            </button>
          </div>
        )}

        {/* ── ADIM 3: MEDYA + YAYINLA ── */}
        {adim === 3 && seciliSektor && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '4px' }}>📸 Fotoğraf & Video</h2>
            <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '16px' }}>Görsel eklemek ilanınızın teklif alma oranını 3x artırır. 100MB'a kadar video yükleyebilirsiniz!</p>

            {/* Yüklenen Medyaların Izgarası */}
            {medyalar.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
                {medyalar.map((m, i) => (
                  <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', background: '#f1f5f9', border: `2px solid ${i === 0 ? '#f59e0b' : '#e2e8f0'}` }}>
                    {m.tip === 'video' ? (
                      <video src={m.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={m.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                    <button onClick={() => setMedyalar(p => p.filter((_, j) => j !== i))}
                      style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', background: '#dc2626', border: 'none', color: 'white', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                  </div>
                ))}
              </div>
            )}

            {/* 🚨 SİBER SİLAHIMIZ BURADA ÇALIŞIYOR */}
            <div style={{ marginBottom: '24px' }}>
              <MedyaYukleyici onYuklendi={handleMedyaYuklendi} />
            </div>

            {/* Üye değilse bilgi kutusu */}
            {!session && (
              <div style={{ padding: '14px', borderRadius: '12px', background: '#fffbeb', border: '1px solid #fde68a', marginBottom: '14px' }}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#92400e', marginBottom: '4px' }}>ℹ️ Üye Olmadan İlan Veriyorsunuz</p>
                <p style={{ fontSize: '11px', color: '#78350f', lineHeight: '1.5' }}>İlanınız yayınlanacak. Teklif kabul etmek istediğinizde üye olmanız istenecek. Ad, soyad ve mesaj bilgileriniz teklif verenler için gizli tutulacak.</p>
              </div>
            )}

            <button onClick={handleYayinla} disabled={yukleniyor}
              style={{ width: '100%', padding: '15px', borderRadius: '14px', background: '#f59e0b', border: 'none', color: '#0f172a', fontFamily: 'inherit', fontSize: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 16px rgba(245,158,11,0.35)' }}>
              {yukleniyor ? '⏳ İlan Yayınlanıyor...' : '⚡ İlanı Yayınla — Teklifler Gelsin'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
