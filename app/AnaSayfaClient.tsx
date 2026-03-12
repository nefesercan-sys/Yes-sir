'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { SEKTORLER } from '@/lib/sektorler';

interface Props {
  ilanlar: any[];
  istatistik: { toplamIlan: number; toplamUye: number; toplamTeklif: number };
}

export default function AnaSayfaClient({ ilanlar, istatistik }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [aktifSektor, setAktifSektor] = useState('');
  const [aramaQuery, setAramaQuery] = useState('');
  const [sehirFiltre, setSehirFiltre] = useState('');
  const [menuAcik, setMenuAcik] = useState(false);

  const filtrelenmisIlanlar = useMemo(() => {
    let liste = [...ilanlar];
    if (aktifSektor) liste = liste.filter(i => i.sektorId === aktifSektor);
    if (aramaQuery) liste = liste.filter(i =>
      (i.baslik || '').toLowerCase().includes(aramaQuery.toLowerCase()) ||
      (i.aciklama || '').toLowerCase().includes(aramaQuery.toLowerCase())
    );
    if (sehirFiltre) liste = liste.filter(i =>
      (i.formData?.sehir || '').toLowerCase().includes(sehirFiltre.toLowerCase())
    );
    return liste;
  }, [ilanlar, aktifSektor, aramaQuery, sehirFiltre]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', paddingBottom: '72px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ilan-card { background: white; border-radius: 16px; border: 1.5px solid #e2e8f0; overflow: hidden; transition: all 0.2s; cursor: pointer; }
        .ilan-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); border-color: rgba(37,99,235,0.3); }
        .sektor-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 16px; border-radius: 14px; border: 1.5px solid #e2e8f0; background: white; cursor: pointer; transition: all 0.15s; min-width: 90px; }
        .sektor-btn:hover, .sektor-btn.aktif { border-color: #2563eb; background: #eff6ff; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .badge { padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; }
        .nav-link { color: rgba(255,255,255,0.75); text-decoration: none; font-size: 13px; font-weight: 500; padding: 6px 12px; border-radius: 8px; transition: all 0.15s; cursor: pointer; background: none; border: none; font-family: inherit; }
        .nav-link:hover { color: white; background: rgba(255,255,255,0.1); }
        .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1.5px solid #e2e8f0; display: flex; z-index: 200; box-shadow: 0 -4px 20px rgba(0,0,0,0.08); }
        .bnav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 10px 4px; border: none; background: none; cursor: pointer; font-family: inherit; color: #94a3b8; font-size: 9px; font-weight: 600; transition: color 0.15s; }
        .bnav-btn:hover { color: #2563eb; }
        .dropdown { position: absolute; top: 48px; right: 0; background: white; border-radius: 14px; border: 1.5px solid #e2e8f0; box-shadow: 0 8px 32px rgba(0,0,0,0.12); min-width: 180px; overflow: hidden; z-index: 300; }
        .dropdown-item { display: block; width: 100%; padding: 11px 16px; border: none; background: none; text-align: left; font-family: inherit; font-size: 13px; color: #0f172a; cursor: pointer; transition: background 0.1s; }
        .dropdown-item:hover { background: #f8fafc; }
        @media (min-width: 768px) { .bottom-nav { display: none; } }
      `}</style>

      {/* ── ÜST NAVBAR ── */}
      <nav style={{ background: '#0f172a', padding: '0 20px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>
        <div onClick={() => router.push('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px' }}>🌐</span>
          <span style={{ color: 'white', fontSize: '17px', fontWeight: '800', fontFamily: 'Playfair Display, serif' }}>HizmetAra</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button className="nav-link" onClick={() => router.push('/')}>Ana Sayfa</button>
          <button className="nav-link" onClick={() => router.push('/ilan-ver')}>İlan Ver</button>
          <button className="nav-link" onClick={() => router.push('/ilanlar')}>İlanlar</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
          {session ? (
            <>
              <button onClick={() => router.push('/panel?tab=bildirimler')}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                🔔
              </button>
              <div style={{ position: 'relative' }}>
                <img
                  src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'U')}&background=2563eb&color=fff`}
                  alt=""
                  onClick={() => setMenuAcik(!menuAcik)}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(245,158,11,0.6)', cursor: 'pointer', objectFit: 'cover' }}
                />
                {menuAcik && (
                  <div className="dropdown">
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                      <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{session.user?.name}</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user?.email}</p>
                    </div>
                    <button className="dropdown-item" onClick={() => { router.push('/panel'); setMenuAcik(false); }}>📊 Panelim</button>
                    <button className="dropdown-item" onClick={() => { router.push('/panel?tab=ilanlarim'); setMenuAcik(false); }}>📋 İlanlarım</button>
                    <button className="dropdown-item" onClick={() => { router.push('/panel?tab=tekliflerim'); setMenuAcik(false); }}>💼 Tekliflerim</button>
                    <button className="dropdown-item" onClick={() => { router.push('/ilan-ver'); setMenuAcik(false); }}>⚡ İlan Ver</button>
                    <div style={{ borderTop: '1px solid #f1f5f9' }}>
                      <button className="dropdown-item" onClick={() => { signOut({ callbackUrl: '/' }); setMenuAcik(false); }} style={{ color: '#dc2626' }}>🚪 Çıkış Yap</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => router.push('/giris')}
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '7px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', fontFamily: 'inherit' }}>
                Giriş
              </button>
              <button onClick={() => router.push('/kayit')}
                style={{ background: '#f59e0b', border: 'none', color: '#0f172a', padding: '7px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', fontFamily: 'inherit' }}>
                Kayıt Ol
              </button>
            </>
          )}
        </div>
      </nav>

      {menuAcik && <div onClick={() => setMenuAcik(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />}

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)', padding: '48px 24px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(37,99,235,0.08)' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '999px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', marginBottom: '16px' }}>
            <span style={{ color: '#f59e0b', fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em' }}>🌍 DÜNYA ÇAPINDA İLAN HAVUZU</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '800', fontFamily: 'Playfair Display, serif', marginBottom: '16px', lineHeight: '1.2' }}>
            Hizmet Al. Hizmet Ver.<br />
            <span style={{ color: '#f59e0b' }}>Doğrudan Buluşun.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', marginBottom: '32px', maxWidth: '560px', margin: '0 auto 32px' }}>
            Turizm'den tamire, temizlikten üretime — 12 sektörde binlerce ilan. İlan ver, teklif al, en iyi fiyatı seç.
          </p>
          <div style={{ background: 'white', borderRadius: '16px', padding: '8px', display: 'flex', gap: '8px', maxWidth: '640px', margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <input value={aramaQuery} onChange={e => setAramaQuery(e.target.value)}
              placeholder="Ne arıyorsunuz? Otel, tamir, temizlik..."
              style={{ flex: 1, padding: '10px 16px', border: 'none', outline: 'none', fontSize: '14px', fontFamily: 'inherit', borderRadius: '10px' }} />
            <input value={sehirFiltre} onChange={e => setSehirFiltre(e.target.value)}
              placeholder="Şehir"
              style={{ width: '120px', padding: '10px 12px', border: 'none', outline: 'none', fontSize: '14px', fontFamily: 'inherit', borderLeft: '1px solid #e2e8f0' }} />
            <button style={{ padding: '10px 20px', borderRadius: '10px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontWeight: '700', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              🔍 Ara
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '32px' }}>
            {[
              { v: istatistik.toplamIlan.toLocaleString() + '+', l: 'Aktif İlan' },
              { v: istatistik.toplamUye.toLocaleString() + '+', l: 'Üye' },
              { v: istatistik.toplamTeklif.toLocaleString() + '+', l: 'Teklif' },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <p style={{ color: '#f59e0b', fontSize: '22px', fontWeight: '800' }}>{s.v}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Sektör Filtreleri */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
          <button onClick={() => setAktifSektor('')} className={`sektor-btn ${!aktifSektor ? 'aktif' : ''}`}>
            <span style={{ fontSize: '22px' }}>🌐</span>
            <span style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a' }}>Tümü</span>
          </button>
          {SEKTORLER.map(s => (
            <button key={s.id} onClick={() => setAktifSektor(aktifSektor === s.id ? '' : s.id)}
              className={`sektor-btn ${aktifSektor === s.id ? 'aktif' : ''}`}
              style={{ borderColor: aktifSektor === s.id ? s.renk : '#e2e8f0', background: aktifSektor === s.id ? s.renk + '15' : 'white' }}>
              <span style={{ fontSize: aktifSektor === s.id ? '24px' : '20px' }}>{s.icon}</span>
              <span style={{ fontSize: '9px', fontWeight: '700', color: aktifSektor === s.id ? s.renk : '#475569', whiteSpace: 'nowrap' }}>{s.ad.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif' }}>
              {aktifSektor ? SEKTORLER.find(s => s.id === aktifSektor)?.icon + ' ' + SEKTORLER.find(s => s.id === aktifSektor)?.ad : '🔥 Son İlanlar'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>{filtrelenmisIlanlar.length} ilan</p>
          </div>
          <button onClick={() => router.push('/ilan-ver')}
            style={{ padding: '11px 22px', borderRadius: '12px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' }}>
            ⚡ İlan Ver
          </button>
        </div>

        {filtrelenmisIlanlar.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px', background: 'white', borderRadius: '20px', border: '1.5px dashed #e2e8f0' }}>
            <p style={{ fontSize: '40px', marginBottom: '12px' }}>📭</p>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>Bu kategoride ilan yok</p>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>İlk ilanı siz verin!</p>
            <button onClick={() => router.push('/ilan-ver')}
              style={{ padding: '11px 28px', borderRadius: '12px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
              İlan Ver
            </button>
          </div>
        ) : (
          <div className="grid-4">
            {filtrelenmisIlanlar.map(ilan => {
              const sektor = SEKTORLER.find(s => s.id === ilan.sektorId);
              return (
                <div key={ilan._id} className="ilan-card" onClick={() => router.push(`/ilan/${ilan._id}`)}>
                  <div style={{ height: '180px', background: sektor ? sektor.renk + '15' : '#f0f4f8', position: 'relative', overflow: 'hidden' }}>
                    {ilan.medyalar?.[0] ? (
                      <img src={ilan.medyalar[0]} alt={ilan.baslik} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                        {sektor?.icon || '📋'}
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      <span className="badge" style={{ background: sektor?.renk || '#2563eb', color: 'white' }}>{sektor?.icon} {sektor?.ad}</span>
                    </div>
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                      <span className="badge" style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}>{ilan.teklifSayisi || 0} teklif</span>
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px 16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                      {ilan.baslik}
                    </h3>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      {ilan.formData?.sehir && (
                        <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px' }}>📍 {ilan.formData.sehir}</span>
                      )}
                      {ilan.formData?.altKategori && (
                        <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px' }}>{ilan.formData.altKategori}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '11px', color: '#94a3b8' }}>Tahmini Bütçe</p>
                        <p style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                          {ilan.butceMin ? `${ilan.butceMin.toLocaleString()} ${ilan.butceBirimi}` : 'Müzakere'}
                          {ilan.butceMax ? ` — ${ilan.butceMax.toLocaleString()}` : ''}
                        </p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); router.push(`/ilan/${ilan._id}`); }}
                        style={{ padding: '8px 16px', borderRadius: '10px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                        Teklif Ver →
                      </button>
                    </div>
                    <p style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '8px' }}>
                      {new Date(ilan.createdAt).toLocaleDateString('tr-TR')} · Teklif süresi: {ilan.teklifeBitis ? new Date(ilan.teklifeBitis).toLocaleDateString('tr-TR') : 'Açık'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Sektör Grid */}
        <div style={{ marginTop: '48px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '6px', textAlign: 'center' }}>Tüm Sektörler</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>Her sektörde hizmet al veya ver</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {SEKTORLER.map(s => (
              <div key={s.id} onClick={() => { setAktifSektor(s.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ background: 'white', borderRadius: '16px', border: '1.5px solid #e2e8f0', padding: '20px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = s.renk; (e.currentTarget as HTMLElement).style.background = s.renk + '08'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.background = 'white'; }}>
                <p style={{ fontSize: '32px', marginBottom: '8px' }}>{s.icon}</p>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{s.ad}</p>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{s.altKategoriler?.length || 0} alt kategori</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ background: '#0f172a', padding: '48px 24px', textAlign: 'center', marginTop: '32px' }}>
        <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '700', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>İlan vermeye başlayın</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '24px' }}>Üye olmadan ilan verin, teklifler gelsin</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/ilan-ver')}
            style={{ padding: '13px 32px', borderRadius: '14px', background: '#f59e0b', border: 'none', color: '#0f172a', fontFamily: 'inherit', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}>
            ⚡ Ücretsiz İlan Ver
          </button>
          <button onClick={() => router.push('/kayit')}
            style={{ padding: '13px 32px', borderRadius: '14px', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'inherit', fontWeight: '600', fontSize: '15px', cursor: 'pointer' }}>
            Hizmet Veren Olarak Kaydol
          </button>
        </div>
      </div>

      {/* ── MOBİL ALT MENÜ ── */}
      <div className="bottom-nav">
        <button className="bnav-btn" onClick={() => router.push('/')}>
          <span style={{ fontSize: '20px' }}>🏠</span>
          Ana Sayfa
        </button>
        <button className="bnav-btn" onClick={() => router.push('/ilanlar')}>
          <span style={{ fontSize: '20px' }}>🔍</span>
          Keşfet
        </button>
        <button className="bnav-btn" onClick={() => router.push('/ilan-ver')}>
          <span style={{ background: '#2563eb', borderRadius: '14px', padding: '6px 14px', fontSize: '18px', display: 'block', marginBottom: '2px', color: 'white' }}>⚡</span>
          İlan Ver
        </button>
        {session ? (
          <button className="bnav-btn" onClick={() => router.push('/panel?tab=bildirimler')}>
            <span style={{ fontSize: '20px' }}>🔔</span>
            Bildirim
          </button>
        ) : (
          <button className="bnav-btn" onClick={() => router.push('/giris')}>
            <span style={{ fontSize: '20px' }}>🔑</span>
            Giriş
          </button>
        )}
        {session ? (
          <button className="bnav-btn" onClick={() => router.push('/panel')}>
            <img src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'U')}&background=2563eb&color=fff`}
              alt="" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', marginBottom: '2px' }} />
            Profilim
          </button>
        ) : (
          <button className="bnav-btn" onClick={() => router.push('/kayit')}>
            <span style={{ fontSize: '20px' }}>👤</span>
            Kayıt Ol
          </button>
        )}
      </div>
    </div>
  );
}
