'use client';

import { useState, useEffect, useRef } from 'react';
import { TerziBottomNav, SekmeId } from '@/components/terzi/BottomNav';

const YESIL = '#2d8c6e';

const HIZMETLER = [
  'Paça Kısaltma', 'Bel Daraltma', 'Etek Kısaltma', 'Fermuar Değişimi',
  'Fermuar Tamiri', 'Ceket Tamiri', 'Mont Tamiri', 'Gömlek Tamiri',
  'T-Shirt Tamiri', 'Elbise Tamiri', 'Abiye Tamiri', 'Özel Dikim',
  'Ütü Hizmeti', 'Kuru Temizleme',
];

type Giris = 'giris' | 'kayit-telefon' | 'kayit-otp' | 'sifre-belirle';
type Medya = { url: string; tip: 'resim' | 'video' };

export default function TerziTalepPage() {
  // ── Giriş ──
  const [oturumHazir, setOturumHazir] = useState(false);
  const [giris, setGiris] = useState<Giris | null>('giris');
  const [telefon, setTelefon] = useState('+90');
  const [kod, setKod] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreTekrar, setSifreTekrar] = useState('');
  const [hata, setHata] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);

  // ── App shell ──
  const [sekme, setSekme] = useState<SekmeId>('ana');
  const [okunmamisMesaj, setOkunmamisMesaj] = useState(0);
  const [acikTalepSayisi, setAcikTalepSayisi] = useState(0);

  // ── Talep formu ──
  const [asama, setAsama] = useState<'form' | 'gonderiliyor' | 'basarili'>('form');
  const [secilenler, setSecilenler] = useState<string[]>([]);
  const [adet, setAdet] = useState(1);
  const [aciklama, setAciklama] = useState('');
  const [konum, setKonum] = useState<{ lat: number; lng: number } | null>(null);
  const [konumHata, setKonumHata] = useState('');
  const [medyalar, setMedyalar] = useState<Medya[]>([]);
  const [medyaYukleniyor, setMedyaYukleniyor] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── İlanlar sekmesi ──
  const [taleplerim, setTaleplerim] = useState<any[]>([]);
  const [seciliTalep, setSeciliTalep] = useState<any>(null);
  const [teklifler, setTeklifler] = useState<any[]>([]);

  // ── Mesajlar sekmesi ──
  const [bildirimler, setBildirimler] = useState<any[]>([]);

  // ── Profil sekmesi ──
  const [profil, setProfil] = useState<any>(null);
  const [profilAdInput, setProfilAdInput] = useState('');

  // ── Şifre ile giriş ──
  const sifreIleGiris = async () => {
    setHata('');
    if (!/^\+90\d{10}$/.test(telefon)) { setHata('Telefon numarasını +90XXXXXXXXXX formatında girin'); return; }
    if (!sifre) { setHata('Şifrenizi girin'); return; }
    setYukleniyor(true);
    const res = await fetch('/api/terzi/giris', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefon, sifre }),
    });
    const data = await res.json();
    setYukleniyor(false);
    if (!res.ok) {
      if (data.sifreYok) {
        setHata('Bu numara için önce telefon doğrulaması yapıp şifre oluşturmanız gerekiyor.');
        setGiris('kayit-telefon');
        return;
      }
      setHata(data.error || 'Hata oluştu');
      return;
    }
    setSifre('');
    setGiris(null);
    yenile();
  };

  // ── OTP gönder (kayıt / şifremi unuttum) ──
  const otpGonder = async () => {
    setHata('');
    if (!/^\+90\d{10}$/.test(telefon)) { setHata('Telefon numarasını +90XXXXXXXXXX formatında girin'); return; }
    setYukleniyor(true);
    const res = await fetch('/api/terzi/otp-gonder', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefon }),
    });
    const data = await res.json();
    setYukleniyor(false);
    if (!res.ok) { setHata(data.error || 'Hata oluştu'); return; }
    setGiris('kayit-otp');
  };

  // ── OTP doğrula → şifre belirleme adımına geç ──
  const otpDogrula = async () => {
    setHata('');
    setYukleniyor(true);
    const res = await fetch('/api/terzi/otp-dogrula', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefon, kod }),
    });
    const data = await res.json();
    setYukleniyor(false);
    if (!res.ok) { setHata(data.error || 'Kod hatalı'); return; }
    setKod('');
    setGiris('sifre-belirle');
  };

  // ── Yeni şifre belirle (kayıt veya şifremi unuttum sonrası) ──
  const sifreBelirle = async () => {
    setHata('');
    if (sifre.length < 6) { setHata('Şifre en az 6 karakter olmalı'); return; }
    if (sifre !== sifreTekrar) { setHata('Şifreler eşleşmiyor'); return; }
    setYukleniyor(true);
    const res = await fetch('/api/terzi/sifre-belirle', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sifre }),
    });
    const data = await res.json();
    setYukleniyor(false);
    if (!res.ok) { setHata(data.error || 'Hata oluştu'); return; }
    setSifre(''); setSifreTekrar('');
    setGiris(null);
    yenile();
  };

  const cikisYap = async () => {
    await fetch('/api/terzi/cikis', { method: 'POST' });
    setGiris('giris');
    setTelefon('+90'); setKod(''); setSifre(''); setSifreTekrar('');
    setSekme('ana');
  };

  // ── Genel yenileme ──
  const yenile = () => {
    talepleriGetir();
    bildirimleriGetir();
    profiliGetir();
  };

  useEffect(() => {
    if (giris === null) yenile();
  }, [giris]);

  // Sayfa yüklenince mevcut oturumu (cookie'yi) sessizce kontrol et —
  // geçerliyse tekrar telefon/kod istemeden doğrudan uygulamaya al.
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/terzi/profil');
      setGiris(res.ok ? null : 'giris');
      setOturumHazir(true);
    })();
  }, []);

  const hizmetSec = (h: string) => {
    setSecilenler(prev => prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h]);
  };

  const konumAl = () => {
    setKonumHata('');
    if (!navigator.geolocation) { setKonumHata('Cihazınız konum desteklemiyor'); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => setKonum({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setKonumHata('Konum alınamadı, izin verdiğinizden emin olun'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const medyaSec = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dosyalar = Array.from(e.target.files || []);
    if (dosyalar.length === 0) return;
    setMedyaYukleniyor(true);
    for (const dosya of dosyalar) {
      const fd = new FormData();
      fd.append('file', dosya);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (res.ok) setMedyalar(prev => [...prev, { url: data.url, tip: data.tip === 'video' ? 'video' : 'resim' }]);
      } catch { /* tek dosya başarısız olursa sessizce geç */ }
    }
    setMedyaYukleniyor(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const medyaSil = (url: string) => setMedyalar(prev => prev.filter(m => m.url !== url));

  const talepGonder = async () => {
    setHata('');
    if (secilenler.length === 0) { setHata('En az bir hizmet seçin'); return; }
    if (!konum) { setHata('Konumunuzu paylaşın'); return; }

    setAsama('gonderiliyor');
    const res = await fetch('/api/terzi/ilanlar', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hizmetler: secilenler, adet, aciklama,
        lat: konum.lat, lng: konum.lng,
        medyalar: medyalar.map(m => m.url),
      }),
    });
    const data = await res.json();
    if (!res.ok) { setHata(data.error || 'Talep gönderilemedi'); setAsama('form'); return; }
    setAsama('basarili');
    setSecilenler([]); setAdet(1); setAciklama(''); setMedyalar([]); setKonum(null);
    talepleriGetir();
  };

  const talepleriGetir = async () => {
    const res = await fetch('/api/terzi/ilanlar?kendi=true');
    if (res.ok) {
      const veri = await res.json();
      setTaleplerim(veri);
      setAcikTalepSayisi(veri.filter((t: any) => t.durum === 'aktif' && (t.teklifSayisi || 0) > 0).length);
    }
  };

  const bildirimleriGetir = async () => {
    const res = await fetch('/api/terzi/bildirimler');
    if (res.ok) {
      const veri = await res.json();
      setBildirimler(veri);
      setOkunmamisMesaj(veri.filter((b: any) => !b.okundu).length);
    }
  };

  const profiliGetir = async () => {
    const res = await fetch('/api/terzi/profil');
    if (res.ok) {
      const veri = await res.json();
      setProfil(veri);
      setProfilAdInput(veri?.ad || '');
    }
  };

  const profilKaydet = async () => {
    await fetch('/api/terzi/profil', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ad: profilAdInput }),
    });
    profiliGetir();
  };

  const teklifleriGetir = async (talep: any) => {
    setSeciliTalep(talep);
    const res = await fetch(`/api/terzi/teklifler?ilanId=${talep._id}`);
    if (res.ok) setTeklifler(await res.json());
  };

  const teklifAksiyon = async (teklifId: string, aksiyon: 'kabul_et' | 'reddet') => {
    await fetch(`/api/terzi/teklifler/${teklifId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aksiyon }),
    });
    if (seciliTalep) teklifleriGetir(seciliTalep);
    talepleriGetir();
  };

  const sekmeGecis = (s: SekmeId) => {
    setSekme(s);
    setSeciliTalep(null);
    if (s === 'ana') setAsama('form');
  };

  // ── GİRİŞ EKRANLARI ──
  // ── OTURUM KONTROL EDİLİYOR (sayfa ilk açıldığında kısa an) ──
  if (!oturumHazir) {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f7faf9', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#94a3b8', fontSize: 14 }}>Yükleniyor...</div>
      </div>
    );
  }

  if (giris === 'giris' || giris === 'kayit-telefon' || giris === 'kayit-otp' || giris === 'sifre-belirle') {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f7faf9', minHeight: '100dvh' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100dvh', background: '#fff', boxShadow: '0 0 24px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #eef2f0', fontWeight: 800, fontSize: 18, color: '#0f172a' }}>🧵 Terzi Talebi</div>
          <div style={{ padding: 20, flex: 1 }}>

            {giris === 'giris' && (
              <div>
                <p style={{ color: '#475569', fontSize: 14, marginBottom: 20 }}>Telefon numaran ve şifrenle giriş yap.</p>
                <input value={telefon} onChange={e => setTelefon(e.target.value)} placeholder="+905XXXXXXXXX"
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 16, marginBottom: 10 }} />
                <input value={sifre} onChange={e => setSifre(e.target.value)} type="password" placeholder="Şifre"
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 16 }} />
                {hata && <p style={{ color: '#dc2626', fontSize: 13, marginTop: 8 }}>{hata}</p>}
                <button onClick={sifreIleGiris} disabled={yukleniyor}
                  style={{ width: '100%', marginTop: 16, padding: 15, background: YESIL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
                  {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </button>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                  <button onClick={() => { setHata(''); setGiris('kayit-telefon'); }} style={{ border: 'none', background: 'none', color: YESIL, fontWeight: 700, fontSize: 13, padding: 0 }}>Hesabın yok mu? Kayıt Ol</button>
                  <button onClick={() => { setHata(''); setGiris('kayit-telefon'); }} style={{ border: 'none', background: 'none', color: '#94a3b8', fontWeight: 700, fontSize: 13, padding: 0 }}>Şifremi Unuttum</button>
                </div>
              </div>
            )}

            {giris === 'kayit-telefon' && (
              <div>
                <button onClick={() => { setHata(''); setGiris('giris'); }} style={{ border: 'none', background: 'none', color: YESIL, fontWeight: 700, fontSize: 13, marginBottom: 14, padding: 0 }}>← Giriş ekranına dön</button>
                <p style={{ color: '#475569', fontSize: 14, marginBottom: 20 }}>
                  Telefon numaranı gir, sana WhatsApp'tan bir doğrulama kodu gönderelim.
                </p>
                <input value={telefon} onChange={e => setTelefon(e.target.value)} placeholder="+905XXXXXXXXX"
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 16 }} />
                {hata && <p style={{ color: '#dc2626', fontSize: 13, marginTop: 8 }}>{hata}</p>}
                <button onClick={otpGonder} disabled={yukleniyor}
                  style={{ width: '100%', marginTop: 16, padding: 15, background: YESIL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
                  {yukleniyor ? 'Gönderiliyor...' : 'Kod Gönder'}
                </button>
              </div>
            )}

            {giris === 'kayit-otp' && (
              <div>
                <p style={{ color: '#475569', fontSize: 14, marginBottom: 20 }}>{telefon} numarasına WhatsApp'tan gönderilen 6 haneli kodu gir.</p>
                <input value={kod} onChange={e => setKod(e.target.value)} placeholder="123456" maxLength={6}
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 20, letterSpacing: 6, textAlign: 'center' }} />
                {hata && <p style={{ color: '#dc2626', fontSize: 13, marginTop: 8 }}>{hata}</p>}
                <button onClick={otpDogrula} disabled={yukleniyor}
                  style={{ width: '100%', marginTop: 16, padding: 15, background: YESIL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
                  {yukleniyor ? 'Doğrulanıyor...' : 'Doğrula ve Devam Et'}
                </button>
              </div>
            )}

            {giris === 'sifre-belirle' && (
              <div>
                <p style={{ color: '#475569', fontSize: 14, marginBottom: 20 }}>Numaranı doğruladık. Şimdi hesabın için bir şifre belirle.</p>
                <input value={sifre} onChange={e => setSifre(e.target.value)} type="password" placeholder="Yeni şifre (en az 6 karakter)"
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 16, marginBottom: 10 }} />
                <input value={sifreTekrar} onChange={e => setSifreTekrar(e.target.value)} type="password" placeholder="Şifre (tekrar)"
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 16 }} />
                {hata && <p style={{ color: '#dc2626', fontSize: 13, marginTop: 8 }}>{hata}</p>}
                <button onClick={sifreBelirle} disabled={yukleniyor}
                  style={{ width: '100%', marginTop: 16, padding: 15, background: YESIL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
                  {yukleniyor ? 'Kaydediliyor...' : 'Şifreyi Kaydet ve Devam Et'}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  // ── UYGULAMA KABUĞU (Yandex Go tarzı: üst bar + içerik + alt sekme çubuğu) ──
  const basliklar: Record<SekmeId, string> = { ana: 'Terzi Talebi', ilanlar: 'İlanlarım', mesajlar: 'Mesajlar', profil: 'Profil' };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f7faf9', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100dvh', background: '#fff', boxShadow: '0 0 24px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column' }}>

        <div style={{ padding: '16px 20px', borderBottom: '1px solid #eef2f0', fontWeight: 800, fontSize: 18, color: '#0f172a', flexShrink: 0 }}>
          {basliklar[sekme]}
        </div>

        <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>

          {/* ── ANA: TALEP FORMU ── */}
          {sekme === 'ana' && asama === 'form' && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>1. Hizmet Seç</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {HIZMETLER.map(h => (
                  <button key={h} onClick={() => hizmetSec(h)}
                    style={{
                      padding: '9px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      border: secilenler.includes(h) ? `1.5px solid ${YESIL}` : '1.5px solid #dbe5e0',
                      background: secilenler.includes(h) ? '#eaf6f1' : '#fff',
                      color: secilenler.includes(h) ? YESIL : '#475569',
                    }}>
                    {h}
                  </button>
                ))}
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>2. Adet</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <button onClick={() => setAdet(a => Math.max(1, a - 1))} style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid #dbe5e0', background: '#fff', fontSize: 18 }}>-</button>
                <span style={{ fontSize: 18, fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{adet}</span>
                <button onClick={() => setAdet(a => a + 1)} style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid #dbe5e0', background: '#fff', fontSize: 18 }}>+</button>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>3. Konum</h3>
              <button onClick={konumAl}
                style={{
                  width: '100%', padding: 14, borderRadius: 10, marginBottom: 4, fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  border: konum ? `1.5px solid ${YESIL}` : '1.5px solid #dbe5e0',
                  background: konum ? '#eaf6f1' : '#fff', color: konum ? YESIL : '#475569',
                }}>
                {konum ? `📍 Konum alındı (${konum.lat.toFixed(4)}, ${konum.lng.toFixed(4)})` : '📍 Konumumu Paylaş'}
              </button>
              {konumHata && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 16 }}>{konumHata}</p>}
              <div style={{ marginBottom: 20 }} />

              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>4. Fotoğraf / Video Ekle <span style={{ fontWeight: 400, color: '#94a3b8' }}>(opsiyonel)</span></h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {medyalar.map(m => (
                  <div key={m.url} style={{ position: 'relative', width: 78, height: 78, borderRadius: 10, overflow: 'hidden', background: '#f1f5f9' }}>
                    {m.tip === 'video'
                      ? <video src={m.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                      : <img src={m.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />}
                    <button onClick={() => medyaSil(m.url)}
                      style={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,.6)', color: '#fff', fontSize: 12, lineHeight: '20px' }}>✕</button>
                  </div>
                ))}
                <label style={{
                  width: 78, height: 78, borderRadius: 10, border: `2px dashed ${YESIL}`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', color: YESIL, fontSize: 24, cursor: 'pointer', fontWeight: 700,
                }}>
                  {medyaYukleniyor ? '…' : '+'}
                  <input ref={fileRef} type="file" accept="image/*,video/*" capture="environment" multiple hidden onChange={medyaSec} />
                </label>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>5. Not <span style={{ fontWeight: 400, color: '#94a3b8' }}>(opsiyonel)</span></h3>
              <textarea value={aciklama} onChange={e => setAciklama(e.target.value)} placeholder="Örn: Kot pantolon 5cm kısaltılacak"
                style={{ width: '100%', minHeight: 70, padding: 12, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 14, marginBottom: 20, fontFamily: 'inherit' }} />

              {hata && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{hata}</p>}

              <button onClick={talepGonder}
                style={{ width: '100%', padding: 16, background: YESIL, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16 }}>
                Teklif İste
              </button>
            </div>
          )}

          {sekme === 'ana' && asama === 'gonderiliyor' && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#475569' }}>Talebiniz gönderiliyor...</div>
          )}

          {sekme === 'ana' && asama === 'basarili' && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Talebiniz Oluşturuldu!</h3>
              <p style={{ color: '#475569', fontSize: 14, marginBottom: 24 }}>Çevredeki terziler talebinizi görecek. Teklif geldiğinde bildirim alacaksınız.</p>
              <button onClick={() => sekmeGecis('ilanlar')}
                style={{ width: '100%', padding: 15, background: YESIL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
                İlanlarımı Gör
              </button>
            </div>
          )}

          {/* ── İLANLAR ── */}
          {sekme === 'ilanlar' && !seciliTalep && (
            <div>
              {taleplerim.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>Henüz talebiniz yok. "{basliklar.ana}" sekmesinden yeni talep oluşturabilirsiniz.</p>}
              {taleplerim.map(t => (
                <button key={t._id} onClick={() => teklifleriGetir(t)}
                  style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 12, border: '1px solid #eef2f0', marginBottom: 10, background: '#fff' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{t.baslik}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                    {t.durum === 'aktif' ? '🟢 Açık' : '⚪ Kapalı'} · {t.teklifSayisi || 0} teklif
                  </div>
                </button>
              ))}
            </div>
          )}

          {sekme === 'ilanlar' && seciliTalep && (
            <div>
              <button onClick={() => setSeciliTalep(null)} style={{ border: 'none', background: 'none', color: YESIL, fontWeight: 700, fontSize: 13, marginBottom: 14, padding: 0 }}>← Geri</button>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 14 }}>{seciliTalep.baslik}</h3>
              {teklifler.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14 }}>Henüz teklif yok.</p>}
              {teklifler.map((t: any) => (
                <div key={t._id} style={{ padding: 14, borderRadius: 12, border: t.durum === 'kabul_edildi' ? `1.5px solid ${YESIL}` : '1px solid #eef2f0', marginBottom: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 18, color: YESIL }}>{t.teklifFiyat?.toLocaleString('tr-TR')} ₺</div>
                  {t.mesaj && <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>{t.mesaj}</div>}
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                    {t.durum === 'bekliyor' ? '🟡 Bekliyor' : t.durum === 'kabul_edildi' ? '🟢 Kabul edildi' : '⚪ Reddedildi'}
                  </div>
                  {t.durum === 'bekliyor' && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      <button onClick={() => teklifAksiyon(t._id, 'kabul_et')}
                        style={{ flex: 1, padding: 10, borderRadius: 8, border: 'none', background: YESIL, color: '#fff', fontWeight: 700, fontSize: 13 }}>Kabul Et</button>
                      <button onClick={() => teklifAksiyon(t._id, 'reddet')}
                        style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #dbe5e0', background: '#fff', color: '#475569', fontWeight: 700, fontSize: 13 }}>Reddet</button>
                    </div>
                  )}
                  {t.durum === 'kabul_edildi' && t.teklifVeren?.telefon && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #eef2f0' }}>
                      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>Terziyle iletişime geç:</div>
                      <div style={{ display: 'flex', gap: 8, marginBottom: t.location ? 10 : 0 }}>
                        <a href={`https://wa.me/${t.teklifVeren.telefon.replace('+', '')}`} target="_blank" rel="noopener noreferrer"
                          style={{ flex: 1, textAlign: 'center', padding: 10, borderRadius: 8, background: '#25D366', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                          💬 WhatsApp
                        </a>
                        <a href={`tel:${t.teklifVeren.telefon}`}
                          style={{ flex: 1, textAlign: 'center', padding: 10, borderRadius: 8, border: `1px solid ${YESIL}`, color: YESIL, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                          📞 Ara
                        </a>
                      </div>
                      {t.location?.coordinates && (
                        <iframe
                          title="Terzi konumu"
                          src={`https://www.google.com/maps?q=${t.location.coordinates[1]},${t.location.coordinates[0]}&z=15&output=embed`}
                          style={{ width: '100%', height: 160, border: 'none', borderRadius: 10 }}
                          loading="lazy"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── MESAJLAR ── */}
          {sekme === 'mesajlar' && (
            <div>
              {bildirimler.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>Henüz mesajınız yok.</p>}
              {bildirimler.map((b: any) => (
                <button key={b._id} onClick={() => {
                    const talep = taleplerim.find((t: any) => t._id === b.ilanId);
                    if (talep) { setSekme('ilanlar'); teklifleriGetir(talep); }
                  }}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: 14, borderRadius: 12, border: '1px solid #eef2f0', marginBottom: 10, background: b.okundu ? '#fff' : '#eaf6f1' }}>
                  <div style={{ fontSize: 14, color: '#0f172a' }}>{b.mesaj}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{new Date(b.tarih).toLocaleString('tr-TR')}</div>
                </button>
              ))}
            </div>
          )}

          {/* ── PROFİL ── */}
          {sekme === 'profil' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#eaf6f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>👤</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>{profil?.ad || 'İsimsiz Kullanıcı'}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>{profil?.telefon || telefon}</div>
                </div>
              </div>

              <label style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Ad Soyad</label>
              <input value={profilAdInput} onChange={e => setProfilAdInput(e.target.value)} placeholder="Adınızı girin"
                style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 15, margin: '8px 0 14px' }} />
              <button onClick={profilKaydet}
                style={{ width: '100%', padding: 14, background: YESIL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, marginBottom: 24 }}>
                Kaydet
              </button>

              <a href="/terzi-panel" style={{ display: 'block', textAlign: 'center', padding: 14, borderRadius: 10, border: `1.5px solid ${YESIL}`, color: YESIL, fontWeight: 700, fontSize: 14, marginBottom: 12, textDecoration: 'none' }}>
                🔧 Terzi misin? İş bulmaya başla
              </a>

              <button onClick={cikisYap}
                style={{ width: '100%', padding: 14, background: '#fff', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
                Çıkış Yap
              </button>
            </div>
          )}

        </div>

        <TerziBottomNav
          aktif={sekme}
          setAktif={sekmeGecis}
          anaLabel="Talep Ver"
          anaIcon="📷"
          rozet={{ mesajlar: okunmamisMesaj, ilanlar: acikTalepSayisi }}
        />
      </div>
    </div>
  );
}
