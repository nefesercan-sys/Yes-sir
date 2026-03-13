'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter }           from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Ilan {
  _id: string;
  baslik: string;
  kategoriAd?: string;
  sektorId: string;
  tip?: string;
  rol?: string;
  butceMin: number;
  butceMax: number;
  teklifSayisi: number;
  durum: string;
  createdAt: string;
}
interface Teklif {
  _id: string;
  ilanBaslik: string;
  fiyat: string;
  durum: string;
  createdAt: string;
}
interface Mesaj {
  _id: string;
  ilanBaslik: string;
  gonderen: { ad: string; email: string };
  mesaj: string;
  durum: string;
  cevaplar: { metin: string; tarih: string }[];
  createdAt: string;
}

type Sekme = 'ilanlar' | 'teklifler' | 'mesajlar' | 'profil';
const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(n);
const tarih = (d: string) => new Date(d).toLocaleDateString('tr-TR',
  { day: '2-digit', month: 'short', year: 'numeric' });

export default function PanelSayfasi() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sekme, setSekme]         = useState<Sekme>('ilanlar');
  const [ilanlar,  setIlanlar]    = useState<Ilan[]>([]);
  const [teklifler,setTeklifler]  = useState<Teklif[]>([]);
  const [mesajlar, setMesajlar]   = useState<Mesaj[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/giris?callbackUrl=/');
  }, [status, router]);

  const yukleIlanlar = useCallback(async () => {
    setYukleniyor(true);
    const r = await fetch('/api/ilanlar?kendi=true');
    const d = await r.json();
    setIlanlar(Array.isArray(d) ? d : []);
    setYukleniyor(false);
  }, []);

  const yukleTeklifler = useCallback(async () => {
    setYukleniyor(true);
    const r = await fetch('/api/teklif/benim');
    const d = await r.json();
    setTeklifler(d.teklifler ?? []);
    setYukleniyor(false);
  }, []);

  const yukleMesajlar = useCallback(async () => {
    setYukleniyor(true);
    const r = await fetch('/api/mesaj/benim');
    const d = await r.json();
    setMesajlar(d.mesajlar ?? []);
    setYukleniyor(false);
  }, []);

  useEffect(() => {
    if (status !== 'authenticated') return;
    if (sekme === 'ilanlar')   yukleIlanlar();
    if (sekme === 'teklifler') yukleTeklifler();
    if (sekme === 'mesajlar')  yukleMesajlar();
  }, [sekme, status, yukleIlanlar, yukleTeklifler, yukleMesajlar]);

  const ilanSil = async (id: string) => {
    if (!confirm('Bu ilanı silmek istediğinizden emin misiniz?')) return;
    await fetch(`/api/ilanlar/${id}`, { method: 'DELETE' });
    yukleIlanlar();
  };

  if (status === 'loading') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontFamily: 'inherit', color: '#aaa' }}>
      ⏳ Yükleniyor...
    </div>
  );

  if (!session) return null;

  const user = session.user!;
  const okunmadiMesaj = mesajlar.filter(m => m.durum === 'okunmadi').length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Unbounded:wght@700;900&display=swap');
        :root{--ink:#080811;--cream:#f7f5f0;--red:#e8361a;--gold:#f5a623;
          --navy:#0d1b3e;--mid:#4a4860;--border:#e4e1db;--green:#18a558}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;
          background:var(--cream);color:var(--ink)}
        a{text-decoration:none;color:inherit}
      `}</style>

      {/* TOPBAR */}
      <div style={{ background: '#0d1b3e', padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <Link href="/" style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 900,
          color: '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ background: '#e8361a', width: 26, height: 26, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '.75rem', color: '#fff', fontWeight: 900 }}>S</span>
          Swap<span style={{ color: '#e8361a' }}>Hubs</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user.image
            ? <img src={user.image} alt="" style={{ width: 32, height: 32,
                borderRadius: '50%', objectFit: 'cover' }} />
            : <div style={{ width: 32, height: 32, borderRadius: '50%',
                background: '#e8361a', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#fff', fontWeight: 700,
                fontSize: '.9rem' }}>
                {user.name?.[0]?.toUpperCase() ?? 'U'}
              </div>
          }
          <button onClick={() => signOut({ callbackUrl: '/' })}
            style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)',
              color: '#fff', padding: '6px 14px', borderRadius: 40,
              fontSize: '.75rem', fontWeight: 600, cursor: 'pointer' }}>
            Çıkış
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>

        {/* Kullanıcı karşılama */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '24px 28px',
          marginBottom: 24, border: '1.5px solid #e4e1db',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 900,
              fontSize: '1.2rem', marginBottom: 4 }}>
              👋 Merhaba, {user.name?.split(' ')[0]}!
            </h1>
            <p style={{ fontSize: '.82rem', color: '#6b6984' }}>{user.email}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/ilan-ver"
              style={{ background: '#e8361a', color: '#fff', padding: '10px 22px',
                borderRadius: 40, fontWeight: 700, fontSize: '.85rem',
                display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              ➕ İlan Ver
            </Link>
            <Link href="/ilanlar"
              style={{ background: '#f2f1ef', color: '#080811', padding: '10px 18px',
                borderRadius: 40, fontWeight: 600, fontSize: '.82rem',
                display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              🔍 İlanları Gör
            </Link>
          </div>
        </div>

        {/* Sekme menüsü (ÇAKIŞAN CSS TEMİZLENDİ) */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {([
            { k: 'ilanlar',   l: '📋 İlanlarım',   badge: ilanlar.length },
            { k: 'teklifler', l: '⚡ Tekliflerim',  badge: teklifler.length },
            { k: 'mesajlar',  l: '💬 Mesajlarım',   badge: okunmadiMesaj, badgeRenk: '#e8361a' },
            { k: 'profil',    l: '👤 Profil' },
          ] as { k: Sekme; l: string; badge?: number; badgeRenk?: string }[]).map(({ k, l, badge, badgeRenk }) => (
            <button key={k} onClick={() => setSekme(k)}
              style={{
                padding: '10px 20px', 
                borderRadius: 40, 
                fontSize: '.85rem',
                fontWeight: 700, 
                cursor: 'pointer', 
                fontFamily: 'inherit',
                background: sekme === k ? '#0d1b3e' : '#fff',
                color: sekme === k ? '#fff' : '#4a4860',
                boxShadow: sekme === k ? '0 4px 14px rgba(13,27,62,.2)' : 'none',
                border: sekme === k ? 'none' : '1.5px solid #e4e1db',
                position: 'relative', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 6
              }}>
              {l}
              {badge !== undefined && badge > 0 && (
                <span style={{ background: badgeRenk ?? '#f5a623', color: '#fff',
                  fontSize: '.62rem', fontWeight: 700, padding: '1px 6px',
                  borderRadius: 20, minWidth: 18, textAlign: 'center' }}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── İLANLARIM ── */}
        {sekme === 'ilanlar' && (
          <div>
            {yukleniyor ? (
              <BosSekme ikon="⏳" mesaj="Yükleniyor..." />
            ) : ilanlar.length === 0 ? (
              <BosSekme ikon="📭" mesaj="Henüz ilanınız yok."
                buton={{ href: '/ilan-ver', etiket: '➕ İlk İlanını Ver' }} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {ilanlar.map(ilan => (
                  <div key={ilan._id} style={{ background: '#fff', borderRadius: 16,
                    border: '1.5px solid #e4e1db', padding: '18px 20px',
                    display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ background: ilan.tip === 'ticari' ? '#edf7ff' : '#fff5f3',
                          color: ilan.tip === 'ticari' ? '#0369a1' : '#e8361a',
                          fontSize: '.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                          {ilan.tip === 'ticari' ? '🏭 Ticari' : '🙋 Bireysel'}
                        </span>
                        <span style={{ background: ilan.durum === 'aktif' ? '#edfaf3' : '#f2f1ef',
                          color: ilan.durum === 'aktif' ? '#18a558' : '#aaa',
                          fontSize: '.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                          {ilan.durum === 'aktif' ? '● Yayında' : '● Pasif'}
                        </span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '.92rem',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ilan.baslik}
                      </div>
                      <div style={{ fontSize: '.75rem', color: '#6b6984', marginTop: 4,
                        display: 'flex', gap: 12 }}>
                        <span>💬 {ilan.teklifSayisi} teklif</span>
                        <span>📅 {tarih(ilan.createdAt)}</span>
                        <span>₺{fmt(ilan.butceMin)}–{fmt(ilan.butceMax)}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <Link href={`/ilan/${ilan._id}`}
                        style={{ background: '#f2f1ef', color: '#080811', padding: '8px 16px',
                          borderRadius: 40, fontSize: '.75rem', fontWeight: 700 }}>
                        Görüntüle
                      </Link>
                      <button onClick={() => ilanSil(ilan._id)}
                        style={{ background: '#fff3f0', color: '#e8361a', border: 'none',
                          padding: '8px 14px', borderRadius: 40, fontSize: '.75rem',
                          fontWeight: 700, cursor: 'pointer' }}>
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TEKLİFLERİM ── */}
        {sekme === 'teklifler' && (
          <div>
            {yukleniyor ? (
              <BosSekme ikon="⏳" mesaj="Yükleniyor..." />
            ) : teklifler.length === 0 ? (
              <BosSekme ikon="⚡" mesaj="Henüz teklif vermediniz."
                buton={{ href: '/ilanlar', etiket: '🔍 İlanları İncele' }} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {teklifler.map(t => (
                  <div key={t._id} style={{ background: '#fff', borderRadius: 16,
                    border: '1.5px solid #e4e1db', padding: '18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{t.ilanBaslik}</div>
                      <span style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800,
                        fontSize: '.9rem', color: '#18a558', flexShrink: 0 }}>
                        {t.fiyat}
                      </span>
                    </div>
                    <div style={{ fontSize: '.75rem', color: '#6b6984', display: 'flex', gap: 12 }}>
                      <span style={{ background: t.durum === 'kabul' ? '#edfaf3' :
                        t.durum === 'red' ? '#fff3f0' : '#f2f1ef',
                        color: t.durum === 'kabul' ? '#18a558' :
                          t.durum === 'red' ? '#e8361a' : '#6b6984',
                        padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>
                        {t.durum === 'kabul' ? '✅ Kabul Edildi'
                          : t.durum === 'red' ? '❌ Reddedildi'
                          : '⏳ Bekliyor'}
                      </span>
                      <span>📅 {tarih(t.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── MESAJLARIM ── */}
        {sekme === 'mesajlar' && (
          <div>
            {yukleniyor ? (
              <BosSekme ikon="⏳" mesaj="Yükleniyor..." />
            ) : mesajlar.length === 0 ? (
              <BosSekme ikon="💬" mesaj="Henüz mesajınız yok." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mesajlar.map(m => (
                  <div key={m._id} style={{ background: '#fff', borderRadius: 16,
                    border: `1.5px solid ${m.durum === 'okunmadi' ? '#f5c4bc' : '#e4e1db'}`,
                    padding: '18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '.88rem', marginBottom: 3 }}>
                          {m.ilanBaslik}
                        </div>
                        <div style={{ fontSize: '.75rem', color: '#6b6984' }}>
                          {m.gonderen.ad} · {tarih(m.createdAt)}
                        </div>
                      </div>
                      {m.durum === 'okunmadi' && (
                        <span style={{ background: '#e8361a', color: '#fff',
                          fontSize: '.62rem', fontWeight: 700, padding: '2px 8px',
                          borderRadius: 20, flexShrink: 0 }}>Yeni</span>
                      )}
                    </div>
                    <p style={{ fontSize: '.83rem', color: '#4a4860', lineHeight: 1.6 }}>
                      {m.mesaj}
                    </p>
                    {m.cevaplar.length > 0 && (
                      <div style={{ marginTop: 10, background: '#f7f5f0', borderRadius: 10,
                        padding: '10px 14px', fontSize: '.8rem', color: '#0d1b3e' }}>
                        <strong>Cevap:</strong> {m.cevaplar[m.cevaplar.length - 1].metin}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PROFİL ── */}
        {sekme === 'profil' && (
          <ProfilSekme user={user} />
        )}
      </div>
    </>
  );
}

// ── Profil Sekmesi ────────────────────────────────────────────
function ProfilSekme({ user }: { user: { name?: string | null; email?: string | null; image?: string | null } }) {
  const [form, setForm]           = useState({ ad: user.name ?? '', email: user.email ?? '' });
  const [sifre, setSifre]         = useState({ eski: '', yeni: '', tekrar: '' });
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [mesaj, setMesaj]         = useState('');

  const profilGuncelle = async (e: React.FormEvent) => {
    e.preventDefault();
    setKaydediliyor(true);
    const r = await fetch('/api/kullanici/profil-guncelle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ad: form.ad }),
    });
    setMesaj(r.ok ? '✅ Profil güncellendi.' : '❌ Hata oluştu.');
    setKaydediliyor(false);
  };

  const sifreGuncelleProfil = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sifre.yeni !== sifre.tekrar) { setMesaj('❌ Yeni şifreler eşleşmiyor.'); return; }
    if (sifre.yeni.length < 6)       { setMesaj('❌ Şifre en az 6 karakter olmalı.'); return; }
    setKaydediliyor(true);
    const r = await fetch('/api/kullanici/sifre-degistir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eskiSifre: sifre.eski, yeniSifre: sifre.yeni }),
    });
    const d = await r.json();
    setMesaj(r.ok ? '✅ Şifre güncellendi.' : `❌ ${d.error ?? 'Hata'}`);
    if (r.ok) setSifre({ eski: '', yeni: '', tekrar: '' });
    setKaydediliyor(false);
  };

  const inp: React.CSSProperties = {
    width: '100%', border: '1.5px solid #e4e1db', borderRadius: 10,
    padding: '11px 14px', fontSize: '.9rem', fontFamily: 'inherit',
    outline: 'none', color: '#080811', background: '#faf9f7', boxSizing: 'border-box',
  };
  const lbl: React.CSSProperties = {
    display: 'block', fontSize: '.73rem', fontWeight: 700, color: '#6b6984', marginBottom: 5,
  };
  const kart: React.CSSProperties = {
    background: '#fff', borderRadius: 16, border: '1.5px solid #e4e1db', padding: '24px 24px',
    marginBottom: 16,
  };

  return (
    <div>
      {mesaj && (
        <div style={{ background: mesaj.startsWith('✅') ? '#edfaf3' : '#fff3f0',
          border: `1px solid ${mesaj.startsWith('✅') ? '#a8eaca' : '#f5c4bc'}`,
          color: mesaj.startsWith('✅') ? '#0d6e3f' : '#c0200a',
          borderRadius: 10, padding: '10px 14px', fontSize: '.83rem', marginBottom: 16 }}>
          {mesaj}
        </div>
      )}

      {/* Profil Bilgileri */}
      <div style={kart}>
        <h3 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800,
          fontSize: '.95rem', marginBottom: 18 }}>👤 Profil Bilgileri</h3>
        <form onSubmit={profilGuncelle} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={lbl}>Ad Soyad</label>
            <input style={inp} value={form.ad}
              onChange={e => setForm(p => ({ ...p, ad: e.target.value }))} />
          </div>
          <div>
            <label style={lbl}>E-posta (değiştirilemez)</label>
            <input style={{ ...inp, opacity: .6 }} value={form.email} disabled />
          </div>
          <button type="submit" disabled={kaydediliyor}
            style={{ background: '#0d1b3e', color: '#fff', border: 'none', padding: '12px',
              borderRadius: 40, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {kaydediliyor ? '⏳...' : '💾 Kaydet'}
          </button>
        </form>
      </div>

      {/* Şifre Değiştir */}
      <div style={kart}>
        <h3 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800,
          fontSize: '.95rem', marginBottom: 18 }}>🔐 Şifre Değiştir</h3>
        <form onSubmit={sifreGuncelleProfil}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={lbl}>Mevcut Şifre</label>
            <input style={inp} type="password" value={sifre.eski} placeholder="Mevcut şifreniz"
              onChange={e => setSifre(p => ({ ...p, eski: e.target.value }))} />
          </div>
          <div>
            <label style={lbl}>Yeni Şifre</label>
            <input style={inp} type="password" value={sifre.yeni} placeholder="En az 6 karakter"
              onChange={e => setSifre(p => ({ ...p, yeni: e.target.value }))} />
          </div>
          <div>
            <label style={lbl}>Yeni Şifre Tekrar</label>
            <input style={inp} type="password" value={sifre.tekrar} placeholder="Tekrar girin"
              onChange={e => setSifre(p => ({ ...p, tekrar: e.target.value }))} />
          </div>
          <button type="submit" disabled={kaydediliyor}
            style={{ background: '#e8361a', color: '#fff', border: 'none', padding: '12px',
              borderRadius: 40, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {kaydediliyor ? '⏳...' : '🔐 Şifreyi Güncelle'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Yardımcı bileşen ──────────────────────────────────────────
function BosSekme({ ikon, mesaj, buton }: {
  ikon: string; mesaj: string; buton?: { href: string; etiket: string };
}) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e4e1db',
      padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{ikon}</div>
      <p style={{ color: '#6b6984', fontSize: '.9rem', marginBottom: buton ? 20 : 0 }}>{mesaj}</p>
      {buton && (
        <Link href={buton.href}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#e8361a', color: '#fff', padding: '10px 24px',
            borderRadius: 40, fontWeight: 700, fontSize: '.85rem' }}>
          {buton.etiket}
        </Link>
      )}
    </div>
  );
}
