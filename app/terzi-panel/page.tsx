'use client';

import { useState, useEffect } from 'react';
import { TerziBottomNav, SekmeId } from '@/components/terzi/BottomNav';

const YESIL = '#2d8c6e';

function mesafeKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type Giris = 'giris' | 'kayit-telefon' | 'kayit-otp' | 'sifre-belirle';

export default function TerziPanelPage() {
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
  const [bekleyenTeklifSayisi, setBekleyenTeklifSayisi] = useState(0);

  // ── İş bul ──
  const [konum, setKonum] = useState<{ lat: number; lng: number } | null>(null);
  const [konumHata, setKonumHata] = useState('');
  const [yariCap, setYariCap] = useState(15);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [seciliTalep, setSeciliTalep] = useState<any>(null);
  const [fiyat, setFiyat] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [gonderildi, setGonderildi] = useState(false);

  // ── Tekliflerim ──
  const [tekliflerim, setTekliflerim] = useState<any[]>([]);

  // ── Mesajlar ──
  const [bildirimler, setBildirimler] = useState<any[]>([]);

  // ── Profil ──
  const [profil, setProfil] = useState<any>(null);
  const [profilAdInput, setProfilAdInput] = useState('');
  const [profilYariCapInput, setProfilYariCapInput] = useState(15);

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
    konumAl();
    yenile();
  };

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

  const otpDogrula = async () => {
    setHata('');
    setYukleniyor(true);
    const res = await fetch('/api/terzi/otp-dogrula', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefon, kod, isProvider: true }),
    });
    const data = await res.json();
    setYukleniyor(false);
    if (!res.ok) { setHata(data.error || 'Kod hatalı'); return; }
    setKod('');
    setGiris('sifre-belirle');
  };

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
    konumAl();
    yenile();
  };

  const cikisYap = async () => {
    await fetch('/api/terzi/cikis', { method: 'POST' });
    setGiris('giris');
    setTelefon('+90'); setKod(''); setSifre(''); setSifreTekrar('');
    setSekme('ana');
  };

  const yenile = () => {
    tekliflerimiGetir();
    bildirimleriGetir();
    profiliGetir();
  };

  useEffect(() => { if (giris === null) { yenile(); konumAl(); } }, [giris]);

  // Sayfa yüklenince mevcut oturumu (cookie'yi) sessizce kontrol et —
  // geçerliyse tekrar telefon/kod istemeden doğrudan uygulamaya al.
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/terzi/profil');
      setGiris(res.ok ? null : 'giris');
      setOturumHazir(true);
    })();
  }, []);

  const konumAl = () => {
    setKonumHata('');
    if (!navigator.geolocation) { setKonumHata('Cihazınız konum desteklemiyor'); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => setKonum({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setKonumHata('Konum alınamadı, izin verdiğinizden emin olun'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const talepleriGetir = async () => {
    if (!konum) return;
    const res = await fetch(`/api/terzi/ilanlar?lat=${konum.lat}&lng=${konum.lng}&radius=${yariCap}`);
    if (res.ok) setTalepler(await res.json());
  };

  useEffect(() => { if (konum) talepleriGetir(); }, [konum, yariCap]);

  const teklifVer = async () => {
    if (!fiyat || Number(fiyat) <= 0) { setHata('Geçerli bir fiyat girin'); return; }
    setHata('');
    setYukleniyor(true);
    const res = await fetch('/api/terzi/teklifler', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ilanId: seciliTalep._id, fiyat: Number(fiyat), mesaj, lat: konum?.lat, lng: konum?.lng }),
    });
    const data = await res.json();
    setYukleniyor(false);
    if (!res.ok) { setHata(data.error || 'Teklif gönderilemedi'); return; }
    setGonderildi(true);
    tekliflerimiGetir();
  };

  const talebeGit = (t: any) => { setSeciliTalep(t); setFiyat(''); setMesaj(''); setHata(''); setGonderildi(false); };

  const tekliflerimiGetir = async () => {
    const res = await fetch('/api/terzi/teklifler?kendi=true');
    if (res.ok) {
      const veri = await res.json();
      setTekliflerim(veri);
      setBekleyenTeklifSayisi(veri.filter((t: any) => t.durum === 'bekliyor').length);
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
      setProfilYariCapInput(veri?.serviceRadiusKm || 15);
    }
  };

  const profilKaydet = async () => {
    await fetch('/api/terzi/profil', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ad: profilAdInput, serviceRadiusKm: profilYariCapInput }),
    });
    profiliGetir();
  };

  const sekmeGecis = (s: SekmeId) => {
    setSekme(s);
    setSeciliTalep(null);
    if (s === 'ana' && !konum) konumAl();
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
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #eef2f0', fontWeight: 800, fontSize: 18, color: '#0f172a' }}>🔧 Terzi Paneli</div>
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

  const basliklar: Record<SekmeId, string> = { ana: 'İş Bul', ilanlar: 'Tekliflerim', mesajlar: 'Mesajlar', profil: 'Profil' };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f7faf9', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100dvh', background: '#fff', boxShadow: '0 0 24px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column' }}>

        <div style={{ padding: '16px 20px', borderBottom: '1px solid #eef2f0', fontWeight: 800, fontSize: 18, color: '#0f172a', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{basliklar[sekme]}</span>
          {sekme === 'ana' && konum && (
            <button onClick={talepleriGetir} style={{ border: 'none', background: '#eef7f3', color: YESIL, fontWeight: 700, fontSize: 12, padding: '6px 12px', borderRadius: 20 }}>↻ Yenile</button>
          )}
        </div>

        <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>

          {/* ── ANA: İŞ BUL ── */}
          {sekme === 'ana' && !seciliTalep && (
            <div>
              {!konum && (
                <button onClick={konumAl} style={{ width: '100%', padding: 14, borderRadius: 10, border: `1.5px solid ${YESIL}`, background: '#eaf6f1', color: YESIL, fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
                  📍 Konumumu Paylaş
                </button>
              )}
              {konumHata && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{konumHata}</p>}

              {konum && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>Yarıçap:</span>
                  {[5, 15, 30, 50].map(r => (
                    <button key={r} onClick={() => setYariCap(r)}
                      style={{
                        padding: '6px 12px', borderRadius: 16, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        border: yariCap === r ? `1.5px solid ${YESIL}` : '1px solid #dbe5e0',
                        background: yariCap === r ? '#eaf6f1' : '#fff', color: yariCap === r ? YESIL : '#94a3b8',
                      }}>{r} km</button>
                  ))}
                </div>
              )}

              {konum && talepler.length === 0 && (
                <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>Bu yarıçapta açık talep bulunamadı.</p>
              )}

              {talepler.map(t => {
                const km = konum ? mesafeKm(konum.lat, konum.lng, t.location.coordinates[1], t.location.coordinates[0]) : null;
                return (
                  <button key={t._id} onClick={() => talebeGit(t)}
                    style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 12, border: '1px solid #eef2f0', marginBottom: 10, background: '#fff' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{t.baslik}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                      {km !== null && `📍 ${km.toFixed(1)} km`} · Adet: {t.adet} · {t.teklifSayisi || 0} teklif
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {sekme === 'ana' && seciliTalep && (
            <div>
              <button onClick={() => setSeciliTalep(null)} style={{ border: 'none', background: 'none', color: YESIL, fontWeight: 700, fontSize: 13, marginBottom: 14, padding: 0 }}>← Geri</button>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{seciliTalep.baslik}</h3>
              {seciliTalep.kategori === 'kuru-temizleme' && Array.isArray(seciliTalep.urunler) ? (
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Hizmet: {seciliTalep.hizmetTuru}</div>
                  {seciliTalep.urunler.map((u: any, i: number) => (
                    <div key={i} style={{ fontSize: 13, color: '#475569' }}>• {u.adet} adet {u.ad}</div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 13, color: '#475569', marginBottom: 4 }}>Adet: {seciliTalep.adet}</div>
              )}
              {seciliTalep.aciklama && <div style={{ fontSize: 13, color: '#475569', marginBottom: 12 }}>Not: {seciliTalep.aciklama}</div>}

              {Array.isArray(seciliTalep.medyalar) && seciliTalep.medyalar.length > 0 && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {seciliTalep.medyalar.map((url: string, i: number) => (
                    <img key={i} src={url} style={{ width: 78, height: 78, borderRadius: 10, objectFit: 'cover' }} alt="" />
                  ))}
                </div>
              )}

              {seciliTalep.location?.coordinates && (
                <iframe
                  title="Talep konumu"
                  src={`https://www.google.com/maps?q=${seciliTalep.location.coordinates[1]},${seciliTalep.location.coordinates[0]}&z=14&output=embed`}
                  style={{ width: '100%', height: 160, border: 'none', borderRadius: 10, marginBottom: 16 }}
                  loading="lazy"
                />
              )}

              {gonderildi ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
                  <p style={{ color: '#475569', fontSize: 14 }}>Teklifiniz gönderildi. Müşteri onayladığında bildirim alacaksınız.</p>
                  <button onClick={() => sekmeGecis('ilanlar')} style={{ marginTop: 16, width: '100%', padding: 14, background: YESIL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700 }}>Tekliflerimi Gör</button>
                </div>
              ) : (
                <>
                  <label style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Fiyat Teklifiniz (₺)</label>
                  <input value={fiyat} onChange={e => setFiyat(e.target.value)} type="number" placeholder="Örn: 200"
                    style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 16, margin: '8px 0 14px' }} />
                  <label style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Mesaj (opsiyonel)</label>
                  <textarea value={mesaj} onChange={e => setMesaj(e.target.value)} placeholder="Örn: Bugün 15:00'te teslim alabilirim"
                    style={{ width: '100%', minHeight: 70, padding: 12, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 14, margin: '8px 0 18px', fontFamily: 'inherit' }} />
                  {hata && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{hata}</p>}
                  <button onClick={teklifVer} disabled={yukleniyor}
                    style={{ width: '100%', padding: 16, background: YESIL, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16 }}>
                    {yukleniyor ? 'Gönderiliyor...' : 'Teklif Ver'}
                  </button>
                </>
              )}
            </div>
          )}

          {/* ── TEKLİFLERİM ── */}
          {sekme === 'ilanlar' && (
            <div>
              {tekliflerim.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>Henüz teklif vermediniz.</p>}
              {tekliflerim.map((t: any) => (
                <div key={t._id} style={{ padding: 14, borderRadius: 12, border: t.durum === 'kabul_edildi' ? `1.5px solid ${YESIL}` : '1px solid #eef2f0', marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{t.ilanBaslik}</div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: YESIL, marginTop: 4 }}>{t.teklifFiyat?.toLocaleString('tr-TR')} ₺</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                    {t.durum === 'bekliyor' ? '🟡 Bekliyor' : t.durum === 'kabul_edildi' ? '🟢 Kabul Edildi' : '⚪ Reddedildi'}
                  </div>
                  {t.durum === 'kabul_edildi' && t.ilanSahibi?.telefon && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #eef2f0' }}>
                      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>Müşteriyle iletişime geç:</div>
                      <div style={{ display: 'flex', gap: 8, marginBottom: t.ilanKonum ? 10 : 0 }}>
                        <a href={`https://wa.me/${t.ilanSahibi.telefon.replace('+', '')}`} target="_blank" rel="noopener noreferrer"
                          style={{ flex: 1, textAlign: 'center', padding: 10, borderRadius: 8, background: '#25D366', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                          💬 WhatsApp
                        </a>
                        <a href={`tel:${t.ilanSahibi.telefon}`}
                          style={{ flex: 1, textAlign: 'center', padding: 10, borderRadius: 8, border: `1px solid ${YESIL}`, color: YESIL, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                          📞 Ara
                        </a>
                      </div>
                      {t.ilanKonum?.coordinates && (
                        <iframe
                          title="Müşteri konumu"
                          src={`https://www.google.com/maps?q=${t.ilanKonum.coordinates[1]},${t.ilanKonum.coordinates[0]}&z=15&output=embed`}
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
                <button key={b._id} onClick={() => setSekme('ilanlar')}
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
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#eaf6f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🔧</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>{profil?.ad || 'İsimsiz Terzi'}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>{profil?.telefon || telefon}</div>
                </div>
              </div>

              <label style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Ad Soyad / İşletme Adı</label>
              <input value={profilAdInput} onChange={e => setProfilAdInput(e.target.value)} placeholder="Adınızı girin"
                style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 15, margin: '8px 0 14px' }} />

              <label style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Varsayılan Hizmet Yarıçapı (km)</label>
              <input value={profilYariCapInput} onChange={e => setProfilYariCapInput(Number(e.target.value))} type="number"
                style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 15, margin: '8px 0 14px' }} />

              <button onClick={profilKaydet}
                style={{ width: '100%', padding: 14, background: YESIL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, marginBottom: 24 }}>
                Kaydet
              </button>

              <a href="/terzi-talep" style={{ display: 'block', textAlign: 'center', padding: 14, borderRadius: 10, border: `1.5px solid ${YESIL}`, color: YESIL, fontWeight: 700, fontSize: 14, marginBottom: 12, textDecoration: 'none' }}>
                🧵 Talep de oluşturmak istiyorum
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
          anaLabel="İş Bul"
          anaIcon="🧭"
          rozet={{ mesajlar: okunmamisMesaj, ilanlar: bekleyenTeklifSayisi }}
        />
      </div>
    </div>
  );
}
