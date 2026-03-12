'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

type Tab = 'ozet' | 'ilanlarim' | 'tekliflerim' | 'rezervasyonlar' | 'bildirimler' | 'profil' | 'ayarlar' | 'ai_ilan';

const DURUM_STILLER: Record<string, { bg: string; c: string }> = {
  aktif:             { bg: '#ecfdf5', c: '#059669' },
  on_rezervasyon:    { bg: '#eff6ff', c: '#2563eb' },
  tamamlandi:        { bg: '#f0fdf4', c: '#16a34a' },
  iptal:             { bg: '#fef2f2', c: '#dc2626' },
  bekliyor:          { bg: '#fffbeb', c: '#d97706' },
  kabul_edildi:      { bg: '#eff6ff', c: '#2563eb' },
  reddedildi:        { bg: '#f1f5f9', c: '#64748b' },
  gonullu_kapali:    { bg: '#f1f5f9', c: '#64748b' },
};

function PanelIcerik() {
  // 🚨 SİBER ZIRH 1: 'status' değişkenini ekledik (loading, authenticated, unauthenticated)
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [aktifTab, setAktifTab] = useState<Tab>((searchParams.get('tab') as Tab) || 'ozet');
  const [ilanlar, setIlanlar] = useState<any[]>([]);
  const [teklifler, setTeklifler] = useState<any[]>([]);
  const [rezervasyonlar, setRezervasyonlar] = useState<any[]>([]);
  const [bildirimler, setBildirimler] = useState<any[]>([]);
  const [profil, setProfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    aktifIlan: 0, bekleyenTeklif: 0,
    aktifRezv: 0, okunmamisBildirim: 0,
    toplamTeklif: 0, kabul: 0,
  });
  
  const [aiSektor, setAiSektor] = useState('turizm');
  const [aiSehir, setAiSehir] = useState('İstanbul');
  const [aiAdet, setAiAdet] = useState(5);
  const [aiYukleniyor, setAiYukleniyor] = useState(false);
  const [aiSonuc, setAiSonuc] = useState('');

  useEffect(() => {
    // 🚨 SİBER ZIRH 2: Sayfa yenilendiğinde kimlik okunuyorsa bekle, işlem yapma!
    if (status === 'loading') return;
    
    // Okuma bitti ve kimlik yoksa (çıkış yapılmışsa) o zaman giriş sayfasına at
    if (status === 'unauthenticated') { 
      router.push('/giris?redirect=/panel'); 
      return; 
    }
    
    // Kimlik onaylandıysa verileri yükle
    if (session) yukle();
  }, [session, status, router]);

  const yukle = async () => {
    setLoading(true);
    try {
      const [ilanRes, teklifRes, rezvRes, bilRes] = await Promise.all([
        fetch('/api/ilanlar?kendi=true'),
        fetch('/api/teklifler?kendi=true'),
        fetch('/api/rezervasyonlar'),
        fetch('/api/bildirimler'),
      ]);
      const [ilanD, teklifD, rezvD, bilD] = await Promise.all([
        ilanRes.json(), teklifRes.json(), rezvRes.json(), bilRes.json(),
      ]);
      const iL = Array.isArray(ilanD) ? ilanD : ilanD.data || [];
      const tL = Array.isArray(teklifD) ? teklifD : [];
      const rL = Array.isArray(rezvD) ? rezvD : [];
      const bL = Array.isArray(bilD) ? bilD : [];
      setIlanlar(iL); setTeklifler(tL); setRezervasyonlar(rL); setBildirimler(bL);
      setStats({
        aktifIlan: iL.filter((i: any) => i.durum === 'aktif').length,
        bekleyenTeklif: tL.filter((t: any) => t.durum === 'bekliyor').length,
        aktifRezv: rL.filter((r: any) => r.durum === 'on_rezervasyon').length,
        okunmamisBildirim: bL.filter((b: any) => !b.okundu).length,
        toplamTeklif: tL.length,
        kabul: tL.filter((t: any) => t.durum === 'kabul_edildi').length,
      });
      const u = await fetch('/api/otel-profil');
      if (u.ok) { const d = await u.json(); if (d.otelAdi) setProfil(d); }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const bildirimOku = async (id: string) => {
    await fetch('/api/bildirimler', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setBildirimler(p => p.map(b => b._id === id ? { ...b, okundu: true } : b));
    setStats(p => ({ ...p, okunmamisBildirim: Math.max(0, p.okunmamisBildirim - 1) }));
  };

  const tumunuOku = async () => {
    await Promise.all(bildirimler.filter(b => !b.okundu).map(b =>
      fetch('/api/bildirimler', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: b._id }) })
    ));
    setBildirimler(p => p.map(b => ({ ...b, okundu: true })));
    setStats(p => ({ ...p, okunmamisBildirim: 0 }));
  };

  const aiIlanOlustur = async () => {
    setAiYukleniyor(true);
    setAiSonuc('');
    try {
      const res = await fetch('/api/ai-ilan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sektorId: aiSektor,
          sehir: aiSehir,
          adet: aiAdet,
          adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiSonuc(`✅ ${data.uretilen} ilan başarıyla oluşturuldu!`);
        yukle();
      } else {
        setAiSonuc('❌ Hata: ' + data.error);
      }
    } catch (e: any) {
      setAiSonuc('❌ ' + e.message);
    }
    setAiYukleniyor(false);
  };

  // 🚨 SİBER ZIRH 3: Kimlik kontrolü bitene kadar bekletme ekranı göster
  if (status === 'loading') {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Siber Kimlik Doğrulanıyor... ⏳</div>;
  }
  
  if (!session) return null;

  const tabs: { key: Tab; label: string; icon: string; badge?: number }[] = [
    { key: 'ozet', label: 'Özet', icon: '📊' },
    { key: 'ilanlarim', label: 'İlanlarım', icon: '📋', badge: stats.aktifIlan },
    { key: 'tekliflerim', label: 'Tekliflerim', icon: '💼', badge: stats.bekleyenTeklif },
    { key: 'rezervasyonlar', label: 'Rezervasyonlar', icon: '📅', badge: stats.aktifRezv },
    { key: 'bildirimler', label: 'Bildirimler', icon: '🔔', badge: stats.okunmamisBildirim },
    { key: 'profil', label: 'Profil', icon: '🏨' },
    { key: 'ayarlar', label: 'Ayarlar', icon: '⚙️' },
    { key: 'ai_ilan', label: 'AI İlan', icon: '🤖' },
  ];

  return (
    <>
      <div style={{ background: '#0f172a', padding: '11px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => router.push('/')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>← Ana Sayfa</button>
          <span style={{ color: 'white', fontSize: '16px', fontWeight: '700', fontFamily: 'Playfair Display, serif' }}>🌐 HizmetAra Panel</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {stats.okunmamisBildirim > 0 && (
            <div style={{ background: '#dc2626', color: 'white', borderRadius: '999px', padding: '2px 7px', fontSize: '11px', fontWeight: '700' }}>🔔 {stats.okunmamisBildirim}</div>
          )}
          <img src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'U')}&background=1e3a5f&color=f59e0b`} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid rgba(245,158,11,0.4)' }} />
          <button onClick={() => signOut()} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.6)', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontFamily: 'inherit' }}>Çıkış</button>
        </div>
      </div>

      <div className="panel-layout">
        <div className="sidebar">
          <div className="mobile-hide" style={{ marginBottom: '18px', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
            <img src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'U')}&background=1e3a5f&color=f59e0b`} alt="" style={{ width: '42px', height: '42px', borderRadius: '50%', marginBottom: '7px', display: 'block' }} />
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{session.user?.name}</p>
            <p style={{ fontSize: '10px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user?.email}</p>
            {profil && <div style={{ marginTop: '6px', padding: '3px 8px', borderRadius: '6px', background: '#ede9fe', color: '#7c3aed', fontSize: '10px', fontWeight: '700', display: 'inline-block' }}>🏨 {profil.otelAdi}</div>}
          </div>
          
          <div className="tab-container">
            {tabs.map(t => (
              <button key={t.key} className={`tab-btn ${aktifTab === t.key ? 'a' : ''}`} onClick={() => setAktifTab(t.key)}>
                <span>{t.icon}</span><span>{t.label}</span>
                {t.badge ? <span className="bdg">{t.badge}</span> : null}
              </button>
            ))}
          </div>

          <div className="mobile-hide" style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #e2e8f0' }}>
            <button onClick={() => router.push('/ilan-ver')} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: '#f59e0b', border: 'none', color: '#0f172a', fontFamily: 'inherit', fontSize: '12px', fontWeight: '700', cursor: 'pointer', marginBottom: '8px' }}>⚡ Yeni İlan Ver</button>
            {!profil && (
              <button onClick={() => router.push('/otel-profil')} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: '#7c3aed', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>🏨 Tesis Profili Oluştur</button>
            )}
          </div>
        </div>

        <div className="main">
          {aktifTab === 'ozet' && (
            <div>
              <p className="sttl">Hoş geldiniz, {session.user?.name?.split(' ')[0]} 👋</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                {[
                  { l: 'Aktif İlan', v: stats.aktifIlan, i: '📋', c: '#2563eb' },
                  { l: 'Bekleyen Teklif', v: stats.bekleyenTeklif, i: '💼', c: '#d97706' },
                  { l: 'Aktif Rezerv.', v: stats.aktifRezv, i: '📅', c: '#7c3aed' },
                  { l: 'Toplam Teklif', v: stats.toplamTeklif, i: '📊', c: '#059669' },
                ].map(s => (
                  <div key={s.l} className="stat-card">
                    <p style={{ fontSize: '22px', marginBottom: '6px' }}>{s.i}</p>
                    <p style={{ fontSize: '28px', fontWeight: '800', color: s.c }}>{s.v}</p>
                    <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>{s.l}</p>
                  </div>
                ))}
              </div>
              {!profil && (
                <div style={{ padding: '16px', borderRadius: '14px', background: '#fef9c3', border: '1px solid #fde68a', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '24px' }}>⚠️</span>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#92400e', marginBottom: '3px' }}>Tesis Profili Eksik!</p>
                    <p style={{ fontSize: '12px', color: '#78350f' }}>Turizm ilanlarına teklif verebilmek için tesis profilinizi tamamlayın.</p>
                  </div>
                  <button onClick={() => router.push('/otel-profil')} style={{ marginLeft: 'auto', padding: '8px 14px', borderRadius: '8px', background: '#f59e0b', border: 'none', color: '#0f172a', fontFamily: 'inherit', fontSize: '12px', fontWeight: '700', cursor: 'pointer', flexShrink: 0 }}>Tamamla →</button>
                </div>
              )}
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>Son İlanlarım</p>
              {loading ? <p style={{ color: '#94a3b8', fontSize: '13px' }}>Yükleniyor...</p> :
                ilanlar.slice(0, 3).length === 0 ? (
                  <div className="empty">
                    <p style={{ fontSize: '32px', marginBottom: '8px' }}>📋</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Henüz ilanınız yok</p>
                    <button onClick={() => router.push('/ilan-ver')} style={{ marginTop: '12px', padding: '9px 20px', borderRadius: '10px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>İlan Ver</button>
                  </div>
                ) : ilanlar.slice(0, 3).map(i => (
                  <div key={i._id} className="row" style={{ cursor: 'pointer' }} onClick={() => router.push(`/ilan/${i._id}`)}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#f1f5f9', overflow: 'hidden', flexShrink: 0 }}>
                      {i.medyalar?.[0] ? <img src={i.medyalar[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📋</div>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i.baslik}</p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>{i.teklifSayisi || 0} teklif · {new Date(i.createdAt).toLocaleDateString('tr-TR')}</p>
                    </div>
                    <span className="dur" style={{ background: DURUM_STILLER[i.durum]?.bg || '#f1f5f9', color: DURUM_STILLER[i.durum]?.c || '#64748b' }}>{i.durum}</span>
                  </div>
                ))}
            </div>
          )}

          {aktifTab === 'ilanlarim' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <p className="sttl" style={{ marginBottom: 0 }}>İlanlarım ({ilanlar.length})</p>
                <button onClick={() => router.push('/ilan-ver')} style={{ padding: '8px 16px', borderRadius: '10px', background: '#0f172a', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>+ Yeni İlan</button>
              </div>
              {loading ? <p style={{ color: '#94a3b8' }}>Yükleniyor...</p> :
                ilanlar.length === 0 ? (
                  <div className="empty">
                    <p style={{ fontSize: '32px', marginBottom: '8px' }}>📋</p>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>İlan yok</p>
                    <button onClick={() => router.push('/ilan-ver')} style={{ padding: '10px 24px', borderRadius: '10px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>İlan Ver</button>
                  </div>
                ) : ilanlar.map(i => (
                  <div key={i._id} className="row">
                    <div style={{ width: '64px', height: '64px', borderRadius: '10px', background: '#f1f5f9', overflow: 'hidden', flexShrink: 0 }}>
                      {i.medyalar?.[0] ? <img src={i.medyalar[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📋</div>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '3px' }}>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{i.baslik}</p>
                        <span className="dur" style={{ background: DURUM_STILLER[i.durum]?.bg || '#f1f5f9', color: DURUM_STILLER[i.durum]?.c || '#64748b', flexShrink: 0 }}>{i.durum}</span>
                      </div>
                      <p style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{i.butceMin > 0 ? `${i.butceMin.toLocaleString()} ${i.butceBirimi}` : 'Bütçe açık'}</p>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>
                        <span>💼 {i.teklifSayisi || 0} teklif</span>
                        <span>👁 {i.goruntulenme || 0} görüntülenme</span>
                        <span>📅 {new Date(i.createdAt).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <button onClick={() => router.push(`/ilan/${i._id}`)} style={{ padding: '5px 10px', borderRadius: '7px', background: '#f1f5f9', border: 'none', color: '#475569', fontFamily: 'inherit', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Teklifleri Gör</button>
                        <button onClick={async () => { await fetch(`/api/ilanlar/${i._id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ teklifeAcik: !i.teklifeAcik }) }); yukle(); }} style={{ padding: '5px 10px', borderRadius: '7px', background: i.teklifeAcik ? '#fef9c3' : '#ecfdf5', border: 'none', color: i.teklifeAcik ? '#92400e' : '#059669', fontFamily: 'inherit', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>{i.teklifeAcik ? '🟡 Kapat' : '🟢 Aç'}</button>
                        <button onClick={async () => { if (!confirm('İlanı silmek istediğinize emin misiniz?')) return; await fetch(`/api/ilanlar/${i._id}`, { method: 'DELETE' }); yukle(); }} style={{ padding: '5px 10px', borderRadius: '7px', background: '#fef2f2', border: 'none', color: '#dc2626', fontFamily: 'inherit', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Sil</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {aktifTab === 'tekliflerim' && (
            <div>
              <p className="sttl">Verdiğim Teklifler ({teklifler.length})</p>
              {loading ? <p style={{ color: '#94a3b8' }}>Yükleniyor...</p> :
                teklifler.length === 0 ? (
                  <div className="empty">
                    <p style={{ fontSize: '32px', marginBottom: '8px' }}>💼</p>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>Henüz teklif vermemişsiniz</p>
                    <button onClick={() => router.push('/')} style={{ padding: '10px 24px', borderRadius: '10px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>İlanlara Bak</button>
                  </div>
                ) : teklifler.map(t => (
                  <div key={t._id} className="row">
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>💼</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.ilanBaslik || 'İlan'}</p>
                      <p style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', marginBottom: '3px' }}>{Number(t.teklifFiyat).toLocaleString()} {t.doviz}</p>
                      {t.aciklama && <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{t.aciklama.slice(0, 60)}...</p>}
                      <p style={{ fontSize: '10px', color: '#94a3b8' }}>{new Date(t.olusturuldu).toLocaleDateString('tr-TR')}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <span className="dur" style={{ background: DURUM_STILLER[t.durum]?.bg || '#f1f5f9', color: DURUM_STILLER[t.durum]?.c || '#64748b' }}>{t.durum}</span>
                      <button onClick={() => router.push(`/ilan/${t.ilanId}`)} style={{ padding: '5px 10px', borderRadius: '7px', background: '#eff6ff', border: 'none', color: '#2563eb', fontFamily: 'inherit', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>İlana Git</button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {aktifTab === 'rezervasyonlar' && (
            <div>
              <p className="sttl">Rezervasyonlar ({rezervasyonlar.length})</p>
              {loading ? <p style={{ color: '#94a3b8' }}>Yükleniyor...</p> :
                rezervasyonlar.length === 0 ? (
                  <div className="empty">
                    <p style={{ fontSize: '32px', marginBottom: '8px' }}>📅</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Rezervasyon yok</p>
                  </div>
                ) : rezervasyonlar.map(r => (
                  <div key={r._id} className="row">
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>📅</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', marginBottom: '2px' }}>{r.musteri?.email === session.user?.email ? `Hizmet Alan: ${r.hizmetVeren?.ad}` : `Müşteri: ${r.musteri?.ad}`}</p>
                      <p style={{ fontSize: '17px', fontWeight: '800', color: '#059669', marginBottom: '3px' }}>{Number(r.fiyat).toLocaleString()} {r.doviz}</p>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#94a3b8', flexWrap: 'wrap' }}>
                        <span>Sektör: {r.sektorId}</span>
                        <span>{new Date(r.olusturuldu).toLocaleDateString('tr-TR')}</span>
                        {r.formData?.tatilTarihi_bas && <span>🗓 {r.formData.tatilTarihi_bas}</span>}
                      </div>
                    </div>
                    <span className="dur" style={{ background: DURUM_STILLER[r.durum]?.bg || '#f1f5f9', color: DURUM_STILLER[r.durum]?.c || '#64748b' }}>{r.durum}</span>
                  </div>
                ))}
            </div>
          )}

          {aktifTab === 'bildirimler' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <p className="sttl" style={{ marginBottom: 0 }}>Bildirimler</p>
                {bildirimler.some(b => !b.okundu) && (
                  <button onClick={tumunuOku} style={{ padding: '7px 14px', borderRadius: '8px', background: '#f1f5f9', border: 'none', color: '#475569', fontFamily: 'inherit', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Tümünü Okundu İşaretle</button>
                )}
              </div>
              {loading ? <p style={{ color: '#94a3b8' }}>Yükleniyor...</p> :
                bildirimler.length === 0 ? (
                  <div className="empty">
                    <p style={{ fontSize: '32px', marginBottom: '8px' }}>🔔</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Bildirim yok</p>
                  </div>
                ) : bildirimler.map(b => (
                  <div key={b._id} onClick={() => !b.okundu && bildirimOku(b._id)} style={{ background: b.okundu ? 'white' : '#eff6ff', border: `1.5px solid ${b.okundu ? '#e2e8f0' : '#bfdbfe'}`, borderRadius: '12px', padding: '14px 16px', marginBottom: '8px', cursor: b.okundu ? 'default' : 'pointer', transition: 'all 0.15s' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '20px', flexShrink: 0 }}>{b.tip === 'yeni_teklif' ? '💼' : b.tip === 'teklif_kabul' ? '🎉' : b.tip === 'yeni_siparis' ? '🛍️' : '🔔'}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', color: '#0f172a', fontWeight: b.okundu ? '400' : '600', lineHeight: '1.5' }}>{b.mesaj}</p>
                        <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>{new Date(b.tarih).toLocaleString('tr-TR')}</p>
                        {b.ilanId && (
                          <button onClick={e => { e.stopPropagation(); router.push(`/ilan/${b.ilanId}`); }} style={{ marginTop: '6px', padding: '4px 10px', borderRadius: '6px', background: '#0f172a', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '10px', fontWeight: '600', cursor: 'pointer' }}>İlana Git →</button>
                        )}
                      </div>
                      {!b.okundu && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb', flexShrink: 0, marginTop: '4px' }} />}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {aktifTab === 'profil' && (
            <div>
              <p className="sttl">Tesis Profili</p>
              {profil ? (
                <div>
                  <div className="card" style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '14px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🏨</div>
                      <div>
                        <p style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif' }}>{profil.otelAdi}</p>
                        <p style={{ fontSize: '13px', color: '#64748b' }}>{profil.yildiz} · {profil.sehir}, {profil.ulke}</p>
                        <p style={{ fontSize: '12px', color: profil.onaylandi ? '#059669' : '#d97706', fontWeight: '600', marginTop: '2px' }}>{profil.onaylandi ? '✅ Profil Onaylı' : '⏳ Onay Bekliyor'}</p>
                      </div>
                    </div>
                    {[
                      { l: 'Paketler', v: profil.paketler?.join(', ') },
                      { l: 'Oda Tipleri', v: profil.odaTipleri?.join(', ') },
                      { l: 'Havuz & Plaj', v: profil.havuzPlaj?.join(', ') },
                      { l: 'Yemek Seçenekleri', v: profil.yemekSecenekleri?.join(', ') },
                      { l: 'İçecek Seçenekleri', v: profil.icecekSecenekleri?.join(', ') },
                      { l: 'Aktiviteler', v: [...(profil.eglencel || []), ...(profil.suSporlari || []), ...(profil.karaAktivite || [])].join(', ') },
                      { l: 'Fiyat Aralığı', v: profil.fiyatMin ? `$${profil.fiyatMin} — $${profil.fiyatMax}` : null },
                    ].filter(d => d.v).map(d => (
                      <div key={d.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#94a3b8', flexShrink: 0 }}>{d.l}</span>
                        <span style={{ fontSize: '12px', color: '#475569', textAlign: 'right' }}>{d.v}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => router.push('/otel-profil')} style={{ padding: '11px 24px', borderRadius: '12px', background: '#7c3aed', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>✏️ Profili Güncelle</button>
                </div>
              ) : (
                <div className="empty">
                  <p style={{ fontSize: '32px', marginBottom: '8px' }}>🏨</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '6px' }}>Tesis profiliniz yok</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>Turizm ilanlarına teklif vermek için önce tesis profilinizi oluşturun.</p>
                  <button onClick={() => router.push('/otel-profil')} style={{ padding: '11px 28px', borderRadius: '12px', background: '#7c3aed', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>🏨 Tesis Profili Oluştur</button>
                </div>
              )}
            </div>
          )}

          {aktifTab === 'ayarlar' && (
            <div>
              <p className="sttl">Hesap Ayarları</p>
              <div className="card" style={{ marginBottom: '14px' }}>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Profil Bilgileri</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { l: 'Ad Soyad', k: 'name', v: session.user?.name || '', t: 'text' },
                    { l: 'E-posta (değiştirilemez)', k: 'email', v: session.user?.email || '', t: 'email', d: true },
                  ].map(f => (
                    <div key={f.k}>
                      <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>{f.l}</label>
                      <input type={f.t} defaultValue={f.v} disabled={f.d} style={{ width: '100%', padding: '11px 14px', borderRadius: '11px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontFamily: 'inherit', background: f.d ? '#f8fafc' : 'white', color: f.d ? '#94a3b8' : '#0f172a' }} />
                    </div>
                  ))}
                  <button style={{ padding: '11px', borderRadius: '11px', background: '#0f172a', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Kaydet</button>
                </div>
              </div>
              <div className="card" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#dc2626', marginBottom: '10px' }}>Hesap İşlemleri</p>
                <button onClick={() => signOut({ callbackUrl: '/' })} style={{ padding: '10px 20px', borderRadius: '10px', background: '#dc2626', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Çıkış Yap</button>
              </div>
            </div>
          )}

          {aktifTab === 'ai_ilan' && (
            <div>
              <p className="sttl">🤖 AI İlan Oluşturucu</p>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px', lineHeight: '1.6' }}>
                Claude AI ile otomatik yapay ilanlar oluştur. Bu ilanlar sitede gerçek ilan gibi görünür, teklif alabilir ama iletişim başlamaz.
              </p>
              <div className="card" style={{ marginBottom: '16px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Sektör</label>
                  <select value={aiSektor} onChange={e => setAiSektor(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: '11px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontFamily: 'inherit', background: 'white', color: '#0f172a' }}>
                    <option value="turizm">🏨 Turizm & Konaklama</option>
                    <option value="seyahat">✈️ Seyahat & Transfer</option>
                    <option value="kiralama">🔑 Kiralama</option>
                    <option value="tamir">🔧 Tamir & Bakım</option>
                    <option value="usta">👷 Usta & İşçi</option>
                    <option value="temizlik">🧹 Temizlik Hizmetleri</option>
                    <option value="uretim">🏭 Üretim & Özel Sipariş</option>
                    <option value="giyim">👗 Giyim & Tekstil</option>
                    <option value="saglik">💊 Sağlık & Güzellik</option>
                    <option value="egitim">📚 Eğitim & Danışmanlık</option>
                    <option value="etkinlik">🎊 Etkinlik & Düğün</option>
                    <option value="mobilya">🪑 Mobilya & Dekorasyon</option>
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Şehir</label>
                  <select value={aiSehir} onChange={e => setAiSehir(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: '11px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontFamily: 'inherit', background: 'white', color: '#0f172a' }}>
                    {['İstanbul','Ankara','İzmir','Bursa','Antalya','Adana','Konya','Gaziantep','Mersin','Kayseri'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Kaç ilan? <span style={{ color: '#7c3aed', fontSize: '16px' }}>{aiAdet}</span>
                  </label>
                  <input type="range" min={1} max={20} value={aiAdet} onChange={e => setAiAdet(Number(e.target.value))} style={{ width: '100%', accentColor: '#7c3aed' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
                    <span>1</span><span>20</span>
                  </div>
                </div>
                <button onClick={aiIlanOlustur} disabled={aiYukleniyor} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: aiYukleniyor ? '#94a3b8' : '#7c3aed', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '14px', fontWeight: '700', cursor: aiYukleniyor ? 'not-allowed' : 'pointer' }}>
                  {aiYukleniyor ? '⏳ Claude AI çalışıyor...' : '🤖 AI ile İlan Oluştur ve Yayınla'}
                </button>
              </div>
              {aiSonuc && (
                <div style={{ padding: '14px 16px', borderRadius: '12px', background: aiSonuc.includes('❌') ? '#fef2f2' : '#f0fdf4', border: `1.5px solid ${aiSonuc.includes('❌') ? '#fecaca' : '#bbf7d0'}`, fontSize: '14px', fontWeight: '600', color: aiSonuc.includes('❌') ? '#dc2626' : '#059669' }}>
                  {aiSonuc}
                </div>
              )}
              <div style={{ marginTop: '16px', padding: '14px 16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>ℹ️ Nasıl çalışır?</p>
                <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.7' }}>
                  • Yapay ilanlar gerçek ilan gibi sitede görünür<br />
                  • Hizmet verenler ücretsiz teklif verebilir<br />
                  • Teklif "beklemede" kalır, iletişim başlamaz<br />
                  • Platform dolgunluğu ve SEO için idealdir
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default function PanelPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .panel-layout { display: grid; grid-template-columns: 230px 1fr; min-height: calc(100vh - 56px); }
        .sidebar { background: white; border-right: 1px solid #e2e8f0; padding: 18px 12px; position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto; }
        .main { padding: 24px 20px; max-width: 960px; }
        .card { background: white; border-radius: 18px; border: 1.5px solid #e2e8f0; padding: 18px; }
        .stat-card { background: white; border-radius: 16px; border: 1.5px solid #e2e8f0; padding: 16px; }
        .row { background: white; border-radius: 14px; border: 1.5px solid #e2e8f0; padding: 14px 16px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px; transition: box-shadow 0.15s; }
        .row:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .tab-btn { width: 100%; display: flex; align-items: center; gap: 9px; padding: 9px 11px; border-radius: 10px; border: none; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; text-align: left; margin-bottom: 2px; transition: all 0.12s; }
        .tab-btn.a { background: #0f172a; color: white; font-weight: 700; }
        .tab-btn:not(.a) { background: transparent; color: #475569; }
        .tab-btn:not(.a):hover { background: #f1f5f9; }
        .bdg { background: #f59e0b; color: #0f172a; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 999px; margin-left: auto; }
        .dur { padding: 3px 9px; border-radius: 999px; font-size: 10px; font-weight: 700; display: inline-block; white-space: nowrap; }
        .sttl { font-size: 18px; font-weight: 700; color: #0f172a; font-family: 'Playfair Display', serif; margin-bottom: 16px; }
        .empty { text-align: center; padding: 48px; background: white; border-radius: 20px; border: 1.5px dashed #e2e8f0; }
        
        @media(max-width: 768px) {
          .panel-layout { display: flex; flex-direction: column; }
          .sidebar { position: static; height: auto; display: block; overflow-x: hidden; padding: 0; border-right: none; border-bottom: 1px solid #e2e8f0; }
          .mobile-hide { display: none !important; }
          .tab-container { display: flex; overflow-x: auto; padding: 12px 16px; gap: 8px; background: white; white-space: nowrap; -webkit-overflow-scrolling: touch; }
          .tab-container::-webkit-scrollbar { display: none; }
          .tab-btn { width: auto; margin-bottom: 0; flex-shrink: 0; padding: 8px 14px; }
          .main { padding: 16px; }
        }
      `}</style>
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#64748b' }}>
          Siber Panel Yükleniyor...
        </div>
      }>
        <PanelIcerik />
      </Suspense>
    </div>
  );
}
