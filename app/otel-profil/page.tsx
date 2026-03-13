'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SEKTORLER } from '@/lib/sektorler';

const otelSektor = SEKTORLER.find(s => s.id === 'turizm')!;

export default function OtelProfilPage() {
  // 🚨 SİBER ZIRH: Vercel build esnasında çökmemesi için data nesnesini güvenli çektik
  const sessionData = useSession() || {};
  const session = sessionData.data;
  const status = sessionData.status || "loading";
  
  const router = useRouter();
  const [adim, setAdim] = useState(1);
  const [form, setForm] = useState<Record<string, any>>({});
  const [medyalar, setMedyalar] = useState<string[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/giris?redirect=/otel-profil');
    }
  }, [status, router]);

  const setField = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));
  const toggleMulti = (k: string, v: string) => {
    const arr: string[] = form[k] || [];
    setField(k, arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  };

  const uploadDosya = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) setMedyalar(p => [...p, data.url]);
    }
    e.target.value = '';
  };

  const handleKaydet = async () => {
    if (!form.otelAdi || !form.yildiz || !form.ulke || !form.sehir) {
      setHata('Tesis adı, yıldız, ülke ve şehir zorunlu'); return;
    }
    setYukleniyor(true); setHata('');

    const res = await fetch('/api/otel-profil', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, medyalar, email: session?.user?.email }),
    });
    const data = await res.json();

    if (data.success) {
      router.push('/panel?tab=profil&otel=1');
    } else {
      setHata(data.error || 'Kayıt başarısız');
    }
    setYukleniyor(false);
  };

  const inp = {
    width: '100%', padding: '11px 14px', borderRadius: '11px',
    border: '1.5px solid #e2e8f0', fontSize: '14px',
    fontFamily: 'Inter, sans-serif', outline: 'none', background: 'white',
  };
  const lbl = { fontSize: '11px', fontWeight: '700' as const, color: '#64748b', textTransform: 'uppercase' as const, display: 'block', marginBottom: '5px', letterSpacing: '0.07em' };
  const card = { background: 'white', borderRadius: '18px', border: '1.5px solid #e2e8f0', padding: '20px', marginBottom: '14px' };

  const MultiBtn = ({ k, v }: { k: string; v: string }) => {
    const secili = (form[k] || []).includes(v);
    return (
      <button type="button" onClick={() => toggleMulti(k, v)}
        style={{ padding: '7px 12px', borderRadius: '8px', border: `1.5px solid ${secili ? '#7c3aed' : '#e2e8f0'}`, background: secili ? '#7c3aed' : 'white', color: secili ? 'white' : '#475569', fontFamily: 'inherit', fontSize: '12px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.12s' }}>
        {secili ? '✓ ' : ''}{v}
      </button>
    );
  };

  // 🚨 SİBER ZIRH: Eğer yükleniyorsa veya session yoksa ekranı patlatma, beklet
  if (status === "loading" || !session) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', paddingBottom: '80px' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap'); * { box-sizing: border-box; } input:focus, select:focus, textarea:focus { border-color: #7c3aed !important; }`}</style>

      {/* Header */}
      <div style={{ background: '#4c1d95', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => router.back()} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', width: '34px', height: '34px', borderRadius: '9px', cursor: 'pointer', fontSize: '15px' }}>←</button>
        <div style={{ flex: 1 }}>
          <h1 style={{ color: 'white', fontSize: '16px', fontWeight: '700', fontFamily: 'Playfair Display, serif' }}>🏨 Tesis Profili Oluştur</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>Adım {adim}/4</p>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[1,2,3,4].map(a => (
            <div key={a} style={{ width: '24px', height: '4px', borderRadius: '2px', background: a <= adim ? '#f59e0b' : 'rgba(255,255,255,0.2)', transition: 'background 0.2s' }} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '20px 16px' }}>
        {hata && <div style={{ padding: '12px 14px', borderRadius: '11px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', marginBottom: '14px' }}>⚠️ {hata}</div>}

        {/* ── ADIM 1: Temel Bilgiler ── */}
        {adim === 1 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>🏨 Tesis Temel Bilgileri</h2>

            <div style={card}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                <div>
                  <label style={lbl}>Tesis Adı *</label>
                  <input value={form.otelAdi || ''} onChange={e => setField('otelAdi', e.target.value)} placeholder="Grand Hotel İstanbul" style={inp} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={lbl}>Yıldız *</label>
                    <select value={form.yildiz || ''} onChange={e => setField('yildiz', e.target.value)} style={inp}>
                      <option value="">Seçin</option>
                      {['1 Yıldız', '2 Yıldız', '3 Yıldız', '4 Yıldız', '5 Yıldız', 'Butik Otel', 'Apart', 'Pansiyon', 'Villa'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Tesis Tipi</label>
                    <select value={form.testisTipi || ''} onChange={e => setField('tesisTipi', e.target.value)} style={inp}>
                      <option value="">Seçin</option>
                      {['Otel', 'Resort', 'Butik Otel', 'Apart Otel', 'Pansiyon', 'Villa', 'Bungalov', 'Tatil Köyü', 'Kamp'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={lbl}>Ülke *</label>
                    <select value={form.ulke || ''} onChange={e => setField('ulke', e.target.value)} style={inp}>
                      <option value="">Seçin</option>
                      {['Türkiye', 'İspanya', 'İtalya', 'Yunanistan', 'Mısır', 'Tayland', 'Maldivler', 'Dubai/BAE', 'Portekiz', 'Fransa', 'Hırvatistan', 'Diğer'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Şehir / Bölge *</label>
                    <input value={form.sehir || ''} onChange={e => setField('sehir', e.target.value)} placeholder="Antalya / Kemer" style={inp} />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Tam Adres</label>
                  <textarea value={form.adres || ''} onChange={e => setField('adres', e.target.value)} placeholder="Cadde, Semt, Posta Kodu" rows={3}
                    style={{ ...inp, height: '80px', resize: 'vertical' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={lbl}>Web Sitesi</label>
                    <input value={form.website || ''} onChange={e => setField('website', e.target.value)} placeholder="https://..." style={inp} />
                  </div>
                  <div>
                    <label style={lbl}>Telefon</label>
                    <input value={form.telefon || ''} onChange={e => setField('telefon', e.target.value)} placeholder="+90..." style={inp} />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Toplam Oda Sayısı</label>
                  <input type="number" value={form.odaSayisi || ''} onChange={e => setField('odaSayisi', e.target.value)} placeholder="150" style={inp} />
                </div>
              </div>
            </div>

            <button onClick={() => {
              if (!form.otelAdi || !form.yildiz || !form.ulke || !form.sehir) { setHata('Zorunlu alanları doldurun'); return; }
              setHata(''); setAdim(2);
            }} style={{ width: '100%', padding: '14px', borderRadius: '14px', background: '#7c3aed', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              Devam →
            </button>
          </div>
        )}

        {/* ── ADIM 2: Oda & Paketler ── */}
        {adim === 2 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>🛏️ Oda Tipleri & Paketler</h2>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Oda Tipleri</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {['Standart Oda', 'Superior Oda', 'Deluxe Oda', 'Deniz Manzaralı', 'Suit', 'Junior Suit', 'King Suit', 'Aile Odası', 'Bungalov', 'Villa', 'Kral Dairesi', 'Honeymoon Suit'].map(v => <MultiBtn key={v} k="odaTipleri" v={v} />)}
              </div>
            </div>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Sunulan Paketler</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {['RO (Sadece Oda)', 'BB (Oda + Kahvaltı)', 'HB (Yarım Pansiyon)', 'FB (Tam Pansiyon)', 'AI (Her Şey Dahil)', 'UAI (Ultra Her Şey Dahil)'].map(v => <MultiBtn key={v} k="paketler" v={v} />)}
              </div>
            </div>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Yemek Seçenekleri</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '12px' }}>
                {['Açık Büfe Kahvaltı', 'A la Carte', 'Türk Mutfağı', 'Akdeniz Mutfağı', 'İtalyan', 'Uzak Doğu', 'Kebap & Izgara', 'Meze & Balık', 'Fast Food', 'Canlı Pişirme', 'Vejetaryen Menü', 'Helal Gıda', 'Glütensiz Seçenek', 'Çocuk Menüsü'].map(v => <MultiBtn key={v} k="yemekSecenekleri" v={v} />)}
              </div>
            </div>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>İçecek Seçenekleri</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {['Alkolsüz İçecekler', 'Yerel Alkol (Bira & Şarap)', 'Tam Açık Büfe Alkol', 'Premium Alkol', 'İthal Viski & Konyak', 'Kokteyl Barı', 'Canlı Bar', 'Pool Bar', 'Sahil Barı'].map(v => <MultiBtn key={v} k="icecekSecenekleri" v={v} />)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setAdim(1)} style={{ padding: '14px 20px', borderRadius: '14px', background: 'white', border: '1.5px solid #e2e8f0', color: '#475569', fontFamily: 'inherit', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>← Geri</button>
              <button onClick={() => setAdim(3)} style={{ flex: 1, padding: '14px', borderRadius: '14px', background: '#7c3aed', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Devam →</button>
            </div>
          </div>
        )}

        {/* ── ADIM 3: Aktiviteler & Olanaklar ── */}
        {adim === 3 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>🎯 Aktiviteler & Olanaklar</h2>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Havuz & Plaj</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {['Kapalı Havuz', 'Açık Havuz', 'Isıtmalı Havuz', 'Çocuk Havuzu', 'Özel Havuz (Suit)', 'Sonsuzluk Havuzu', 'Sahile Sıfır', 'Sahile Yürüme Mesafesi', 'Özel Plaj', 'Halka Açık Plaj', 'Sandy Plaj', 'Kayalık Plaj'].map(v => <MultiBtn key={v} k="havuzPlaj" v={v} />)}
              </div>
            </div>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Eğlence & Animasyon</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {['Sabah Jimnastiği', 'Gün Boyu Animasyon', 'Çocuk Animasyonu', 'Gece Şovu', 'Disko / Gece Kulübü', 'Canlı Müzik', 'Karaoke', 'Sinema', 'Tiyatro', 'Folklor Gösterisi', 'Ateş Gösterisi'].map(v => <MultiBtn key={v} k="eglencel" v={v} />)}
              </div>
            </div>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Su Sporları & Aktiviteler</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {['Yüzme Dersleri', 'Dalış (Scuba)', 'Snorkel', 'Sörf', 'Kayak', 'Parasailing', 'Jet-Ski', 'Kano', 'Yelkenli', 'Banana Boat', 'Aquapark', 'Rafting', 'Kitesurf'].map(v => <MultiBtn key={v} k="suSporlari" v={v} />)}
              </div>
            </div>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Kara Sporları & Wellness</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {['Tenis', 'Mini Golf', 'Golf (Yakınında)', 'Fitness Merkezi', 'Yoga', 'Pilates', 'Spa & Hamam', 'Masaj', 'Sauna', 'Bisiklet', 'At Binme', 'Doğa Yürüyüşü', 'Çocuk Kulübü'].map(v => <MultiBtn key={v} k="karaAktivite" v={v} />)}
              </div>
            </div>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Tesis Olanakları</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {['Ücretsiz Wi-Fi', 'Klima', 'Otopark', 'Vale Parking', 'Havalimanı Transferi', 'Tur Masası', 'Kiralık Araç', 'Bebek Karyolası', 'Engelli Erişimi', '24 Saat Resepsiyon', 'Kasa / Emanet', 'Çamaşırhane', 'Kurutma', 'Ütü Servisi', 'Balayı Paketi', 'VIP Karşılama'].map(v => <MultiBtn key={v} k="olanaklar" v={v} />)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setAdim(2)} style={{ padding: '14px 20px', borderRadius: '14px', background: 'white', border: '1.5px solid #e2e8f0', color: '#475569', fontFamily: 'inherit', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>← Geri</button>
              <button onClick={() => setAdim(4)} style={{ flex: 1, padding: '14px', borderRadius: '14px', background: '#7c3aed', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Devam →</button>
            </div>
          </div>
        )}

        {/* ── ADIM 4: Fiyat & Medya ── */}
        {adim === 4 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>💰 Fiyat & Görseller</h2>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Fiyat Aralığı (Gecelik, Kişi Başı)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={lbl}>Minimum ($ USD)</label>
                  <input type="number" value={form.fiyatMin || ''} onChange={e => setField('fiyatMin', e.target.value)} placeholder="50" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Maksimum ($ USD)</label>
                  <input type="number" value={form.fiyatMax || ''} onChange={e => setField('fiyatMax', e.target.value)} placeholder="500" style={inp} />
                </div>
              </div>
              <div>
                <label style={lbl}>Sezon Bilgisi</label>
                <textarea value={form.sezonBilgisi || ''} onChange={e => setField('sezonBilgisi', e.target.value)}
                  placeholder="Yüksek sezon: Haziran-Eylül. Düşük sezon: Kasım-Mart..."
                  style={{ ...inp, height: '70px', resize: 'vertical' }} />
              </div>
            </div>

            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Tesis Açıklaması</h3>
              <textarea value={form.aciklama || ''} onChange={e => setField('aciklama', e.target.value)}
                placeholder="Tesisinizi kısaca tanıtın. Neden tercih edilmeli?"
                rows={5} style={{ ...inp, height: '120px', resize: 'vertical' }} />
            </div>

            {/* Fotoğraf Yükleme */}
            <div style={card}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Tesis Fotoğrafları</h3>

              {medyalar.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
                  {medyalar.map((url, i) => (
                    <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: '10px', overflow: 'hidden', border: `2px solid ${i === 0 ? '#f59e0b' : '#e2e8f0'}` }}>
                      <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {i === 0 && <div style={{ position: 'absolute', top: '3px', left: '3px', background: '#f59e0b', color: '#0f172a', fontSize: '8px', fontWeight: '700', padding: '2px 5px', borderRadius: '4px' }}>KAPAK</div>}
                      <button onClick={() => setMedyalar(p => p.filter((_, j) => j !== i))}
                        style={{ position: 'absolute', top: '3px', right: '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#dc2626', border: 'none', color: 'white', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                    </div>
                  ))}
                </div>
              )}

              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px', border: '2px dashed #e2e8f0', background: '#f8fafc', cursor: 'pointer' }}>
                <span style={{ fontSize: '24px' }}>📷</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Fotoğraf Yükle</p>
                  <p style={{ fontSize: '11px', color: '#94a3b8' }}>Birden fazla seçebilirsiniz</p>
                </div>
                <input type="file" accept="image/*,video/*" multiple onChange={uploadDosya} style={{ display: 'none' }} />
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setAdim(3)} style={{ padding: '14px 20px', borderRadius: '14px', background: 'white', border: '1.5px solid #e2e8f0', color: '#475569', fontFamily: 'inherit', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>← Geri</button>
              <button onClick={handleKaydet} disabled={yukleniyor}
                style={{ flex: 1, padding: '14px', borderRadius: '14px', background: '#f59e0b', border: 'none', color: '#0f172a', fontFamily: 'inherit', fontSize: '14px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 16px rgba(245,158,11,0.3)' }}>
                {yukleniyor ? '⏳ Kaydediliyor...' : '✅ Tesis Profilini Kaydet'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
