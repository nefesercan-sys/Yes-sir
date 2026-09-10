'use client';

import { useState, useEffect } from 'react';

const YESIL = '#2d8c6e';

type Uye = {
  _id: string; telefon: string; ad: string | null; isProvider: boolean;
  dogrulandi: boolean; sifreVarMi: boolean; createdAt: string;
  ilanSayisi: number; teklifSayisi: number;
};

export default function TerziAdminUyelerPage() {
  const [secret, setSecret] = useState('');
  const [girisYapildi, setGirisYapildi] = useState(false);
  const [hata, setHata] = useState('');
  const [uyeler, setUyeler] = useState<Uye[]>([]);
  const [aramaMetni, setAramaMetni] = useState('');
  const [filtre, setFiltre] = useState<'hepsi' | 'musteri' | 'terzi'>('hepsi');

  const [seciliUye, setSeciliUye] = useState<Uye | null>(null);
  const [detay, setDetay] = useState<{ ilanlar: any[]; teklifler: any[] } | null>(null);

  const uyeleriGetir = async (s: string) => {
    const res = await fetch(`/api/terzi/admin/uyeler?secret=${encodeURIComponent(s)}`);
    if (!res.ok) { setHata('Parola hatalı'); setGirisYapildi(false); return; }
    setUyeler(await res.json());
    setHata('');
    setGirisYapildi(true);
  };

  const detayGetir = async (uye: Uye) => {
    setSeciliUye(uye);
    setDetay(null);
    const res = await fetch(`/api/terzi/admin/uye-detay?secret=${encodeURIComponent(secret)}&userId=${uye._id}`);
    if (res.ok) {
      const veri = await res.json();
      setDetay({ ilanlar: veri.ilanlar, teklifler: veri.teklifler });
    }
  };

  const filtrelenmis = uyeler.filter(u => {
    if (filtre === 'musteri' && u.isProvider) return false;
    if (filtre === 'terzi' && !u.isProvider) return false;
    if (aramaMetni && !u.telefon.includes(aramaMetni) && !(u.ad || '').toLowerCase().includes(aramaMetni.toLowerCase())) return false;
    return true;
  });

  if (!girisYapildi) {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f7faf9', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ width: '100%', maxWidth: 380, background: '#fff', padding: 24, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>👥 Üyeler (Personel)</h1>
          <input type="password" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Yönetici parolası"
            style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 15, marginBottom: 12 }} />
          {hata && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{hata}</p>}
          <button onClick={() => uyeleriGetir(secret)}
            style={{ width: '100%', padding: 14, background: YESIL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  // ── ÜYE DETAYI ──
  if (seciliUye) {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f7faf9', minHeight: '100dvh', padding: 20 }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <button onClick={() => { setSeciliUye(null); setDetay(null); }} style={{ border: 'none', background: 'none', color: YESIL, fontWeight: 700, fontSize: 13, marginBottom: 16, padding: 0 }}>← Üye Listesine Dön</button>

          <div style={{ background: '#fff', borderRadius: 14, padding: 18, marginBottom: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#0f172a' }}>{seciliUye.ad || 'İsimsiz Kullanıcı'}</div>
            <div style={{ fontSize: 14, color: '#475569', marginTop: 2 }}>{seciliUye.telefon}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: seciliUye.isProvider ? '#eaf6f1' : '#eff6ff', color: seciliUye.isProvider ? YESIL : '#2563eb' }}>
                {seciliUye.isProvider ? '🔧 Terzi' : '🧵 Müşteri'}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: seciliUye.sifreVarMi ? '#eaf6f1' : '#fef3c7', color: seciliUye.sifreVarMi ? YESIL : '#b45309' }}>
                {seciliUye.sifreVarMi ? '🔒 Şifre kurulu' : '⚠️ Şifre yok'}
              </span>
              <a href={`https://wa.me/${seciliUye.telefon.replace('+', '')}`} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: '#25D366', color: '#fff', textDecoration: 'none' }}>
                💬 WhatsApp
              </a>
            </div>
          </div>

          {!detay && <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center' }}>Yükleniyor...</p>}

          {detay && (
            <>
              {!seciliUye.isProvider && (
                <>
                  <h2 style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>İlanları ({detay.ilanlar.length})</h2>
                  {detay.ilanlar.length === 0 && <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>Henüz ilan vermemiş.</p>}
                  {detay.ilanlar.map((i: any) => (
                    <div key={i._id} style={{ background: '#fff', borderRadius: 12, padding: 14, marginBottom: 10 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{i.baslik}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                        {i.durum === 'aktif' ? '🟢 Açık' : '⚪ Kapalı'} · {i.teklifSayisi || 0} teklif · {new Date(i.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {seciliUye.isProvider && (
                <>
                  <h2 style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>Verdiği Teklifler ({detay.teklifler.length})</h2>
                  {detay.teklifler.length === 0 && <p style={{ color: '#94a3b8', fontSize: 13 }}>Henüz teklif vermemiş.</p>}
                  {detay.teklifler.map((t: any) => (
                    <div key={t._id} style={{ background: '#fff', borderRadius: 12, padding: 14, marginBottom: 10 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{t.ilanBaslik}</div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: YESIL, marginTop: 2 }}>{t.teklifFiyat?.toLocaleString('tr-TR')} ₺</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                        {t.durum === 'bekliyor' ? '🟡 Bekliyor' : t.durum === 'kabul_edildi' ? '🟢 Kabul edildi' : '⚪ Reddedildi'} · {new Date(t.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // ── ÜYE LİSTESİ ──
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f7faf9', minHeight: '100dvh', padding: 20 }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>👥 Üyeler</h1>
        <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>{uyeler.length} kayıtlı kullanıcı</p>

        <input value={aramaMetni} onChange={e => setAramaMetni(e.target.value)} placeholder="Telefon veya isimle ara..."
          style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #dbe5e0', fontSize: 14, marginBottom: 10 }} />

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {[['hepsi', 'Hepsi'], ['musteri', '🧵 Müşteriler'], ['terzi', '🔧 Terziler']].map(([v, label]) => (
            <button key={v} onClick={() => setFiltre(v as any)}
              style={{
                padding: '6px 14px', borderRadius: 16, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                border: filtre === v ? `1.5px solid ${YESIL}` : '1px solid #dbe5e0',
                background: filtre === v ? '#eaf6f1' : '#fff', color: filtre === v ? YESIL : '#94a3b8',
              }}>{label}</button>
          ))}
        </div>

        {filtrelenmis.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>Sonuç bulunamadı.</p>}

        {filtrelenmis.map(u => (
          <button key={u._id} onClick={() => detayGetir(u)}
            style={{ display: 'block', width: '100%', textAlign: 'left', background: '#fff', borderRadius: 12, padding: 14, marginBottom: 8, border: '1px solid #eef2f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{u.ad || u.telefon}</div>
                {u.ad && <div style={{ fontSize: 12, color: '#94a3b8' }}>{u.telefon}</div>}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 10, background: u.isProvider ? '#eaf6f1' : '#eff6ff', color: u.isProvider ? YESIL : '#2563eb' }}>
                {u.isProvider ? 'Terzi' : 'Müşteri'}
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6 }}>
              {u.isProvider ? `${u.teklifSayisi} teklif verdi` : `${u.ilanSayisi} ilan verdi`} · {new Date(u.createdAt).toLocaleDateString('tr-TR')}
              {!u.sifreVarMi && <span style={{ color: '#b45309' }}> · şifre kurulmamış</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
