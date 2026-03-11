'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SEKTOR_MAP } from '@/lib/sektorler';

interface Props { ilan: any; teklifler: any[]; }

export default function IlanDetayClient({ ilan, teklifler: baslangicTeklifler }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teklifler, setTeklifler] = useState(baslangicTeklifler);
  const [teklifModal, setTeklifModal] = useState(false);
  const [secimModal, setSecimModal] = useState<any>(null);
  const [teklifForm, setTeklifForm] = useState({ fiyat: '', doviz: '₺', aciklama: '', hizmetDetay: '' });
  const [gonderiyor, setGonderiyor] = useState(false);
  const [yeniIlan, setYeniIlan] = useState(searchParams.get('yeni') === '1');
  const [aktifResim, setAktifResim] = useState(0);

  const sektor = SEKTOR_MAP[ilan.sektorId];
  const ilanSahibiMi = session?.user?.email === ilan.sahibi?.email;

  const handleTeklifVer = async () => {
    if (!session) {
      router.push(`/uye-ol?redirect=/ilan/${ilan._id}&tip=hizmet_veren`);
      return;
    }
    if (!teklifForm.fiyat) { alert('Fiyat zorunlu'); return; }
    setGonderiyor(true);

    const res = await fetch('/api/teklifler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ilanId: ilan._id,
        teklifFiyat: Number(teklifForm.fiyat),
        doviz: teklifForm.doviz,
        aciklama: teklifForm.aciklama,
        hizmetDetay: teklifForm.hizmetDetay,
      }),
    });
    const data = await res.json();

    if (data.success) {
      alert(`✅ Teklif gönderildi!\nTeklif ücreti: ${data.teklifUcreti} ₺`);
      setTeklifModal(false);
      const guncel = await fetch(`/api/teklifler?ilanId=${ilan._id}`);
      setTeklifler(await guncel.json());
    } else {
      alert(data.error);
    }
    setGonderiyor(false);
  };

  const handleTeklifKabul = async (teklifId: string) => {
    if (!session) { router.push('/uye-ol'); return; }
    if (!confirm('Bu teklifi kabul edip rezervasyon başlatmak istiyor musunuz?')) return;

    const res = await fetch(`/api/teklifler/${teklifId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'kabul_et', ilanId: ilan._id }),
    });
    const data = await res.json();
    if (data.success) {
      alert('✅ Teklif kabul edildi! Ön rezervasyon başladı.');
      router.push(`/panel?tab=rezervasyonlar`);
    } else {
      alert(data.error);
    }
  };

  const formVeriGoster = () => {
    if (!ilan.formData) return null;
    const alanlar = sektor?.hizmetAlanFormu || [];
    return alanlar.filter(a => ilan.formData[a.key]).map(a => {
      let deger = ilan.formData[a.key];
      if (Array.isArray(deger)) deger = deger.join(', ');
      if (a.tip === 'daterange') {
        deger = `${ilan.formData[a.key + '_bas'] || ''} — ${ilan.formData[a.key + '_bit'] || ''}`;
      }
      if (a.tip === 'range') {
        deger = `${ilan.formData[a.key + 'Min'] || 0} — ${ilan.formData[a.key + 'Max'] || 0} ${a.birim}`;
      }
      return { label: a.label, deger };
    }).filter(d => d.deger);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', paddingBottom: '80px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; }
        .grid-detay { display: grid; grid-template-columns: 1fr 360px; gap: 24px; max-width: 1060px; margin: 0 auto; padding: 24px; }
        @media(max-width:860px) { .grid-detay { grid-template-columns: 1fr; } }
        .card { background: white; border-radius: 18px; border: 1.5px solid #e2e8f0; padding: 18px; margin-bottom: 14px; }
        .teklif-satir { background: white; border-radius: 14px; border: 1.5px solid #e2e8f0; padding: 14px 16px; display: flex; align-items: center; gap: 12px; margin-bottom: 8px; transition: all 0.15s; }
        .teklif-satir:hover { border-color: #2563eb; box-shadow: 0 4px 12px rgba(37,99,235,0.1); }
      `}</style>

      {/* Yeni İlan Bildirimi */}
      {yeniIlan && (
        <div style={{ position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: '#059669', color: 'white', padding: '13px 22px', borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          🎉 İlanınız yayınlandı! Teklifler gelmeye başlayacak.
          <button onClick={() => setYeniIlan(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '3px 8px', borderRadius: '6px', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {/* Nav */}
      <div style={{ background: '#0f172a', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button onClick={() => router.push('/')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>← Geri</button>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {sektor?.icon} {sektor?.ad} · {ilan.baslik}
        </span>
        {!ilanSahibiMi && (
          <button onClick={() => setTeklifModal(true)}
            style={{ background: '#f59e0b', border: 'none', color: '#0f172a', padding: '7px 14px', borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
            💼 Teklif Ver
          </button>
        )}
      </div>

      <div className="grid-detay">
        {/* SOL */}
        <div>
          {/* Medya */}
          {ilan.medyalar?.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ borderRadius: '18px', overflow: 'hidden', aspectRatio: '16/9', background: '#f1f5f9', marginBottom: '8px' }}>
                {ilan.medyalar[aktifResim]?.includes('.mp4') ? (
                  <video src={ilan.medyalar[aktifResim]} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={ilan.medyalar[aktifResim]} alt={ilan.baslik} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              {ilan.medyalar.length > 1 && (
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
                  {ilan.medyalar.map((m: string, i: number) => (
                    <div key={i} onClick={() => setAktifResim(i)}
                      style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${aktifResim === i ? '#2563eb' : '#e2e8f0'}`, flexShrink: 0 }}>
                      <img src={m} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* İlan Bilgileri Tablosu */}
          <div className="card">
            <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>İlan Detayları</h2>
            <div>
              {(formVeriGoster() || []).map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f1f5f9', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', flexShrink: 0 }}>{d.label}</span>
                  <span style={{ fontSize: '13px', color: '#0f172a', fontWeight: '600', textAlign: 'right' }}>{d.deger}</span>
                </div>
              ))}
              {ilan.formData?.aciklama && (
                <div style={{ paddingTop: '12px' }}>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px' }}>AÇIKLAMA</p>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{ilan.formData.aciklama}</p>
                </div>
              )}
            </div>
          </div>

          {/* Teklif Listesi (İlan sahibi için) */}
          {ilanSahibiMi && (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif' }}>
                  💼 Gelen Teklifler ({teklifler.length})
                </h2>
                <button onClick={async () => {
                  const res = await fetch(`/api/ilanlar/${ilan._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ teklifeAcik: !ilan.teklifeAcik }),
                  });
                }}
                  style={{ padding: '6px 12px', borderRadius: '8px', background: ilan.teklifeAcik ? '#fef9c3' : '#eaf5ee', border: 'none', color: ilan.teklifeAcik ? '#854d0e' : '#1a7a4a', fontFamily: 'inherit', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>
                  {ilan.teklifeAcik ? '🟡 Teklif Açık' : '🟢 Teklif Kapalı'}
                </button>
              </div>

              {teklifler.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', background: '#f8fafc', borderRadius: '12px' }}>
                  <p style={{ fontSize: '28px', marginBottom: '8px' }}>⏳</p>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>Henüz teklif gelmedi</p>
                </div>
              ) : teklifler.map((t: any, i: number) => (
                <div key={t._id} className="teklif-satir">
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: i === 0 ? '#f59e0b' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: i === 0 ? 'white' : '#94a3b8', flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{t.teklifci?.ad}</p>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{t.aciklama?.slice(0, 60)}{t.aciklama?.length > 60 ? '...' : ''}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '18px', fontWeight: '800', color: i === 0 ? '#059669' : '#0f172a' }}>
                      {Number(t.teklifFiyat).toLocaleString()} {t.doviz}
                    </p>
                    <button onClick={() => setSecimModal(t)}
                      style={{ padding: '6px 12px', borderRadius: '8px', background: '#2563eb', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '11px', fontWeight: '600', cursor: 'pointer', marginTop: '4px' }}>
                      İncele & Kabul Et
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SAĞ - Özet & CTA */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '70px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span style={{ padding: '4px 10px', borderRadius: '8px', background: sektor?.renk + '15' || '#eff6ff', fontSize: '11px', fontWeight: '700', color: sektor?.renk || '#2563eb' }}>
                {sektor?.icon} {sektor?.ad}
              </span>
              <span style={{ padding: '4px 10px', borderRadius: '8px', background: '#f1f5f9', fontSize: '11px', color: '#64748b' }}>
                {ilan.teklifSayisi || 0} teklif
              </span>
            </div>

            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', lineHeight: '1.3', marginBottom: '12px', fontFamily: 'Playfair Display, serif' }}>
              {ilan.baslik}
            </h1>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>Bütçe:</span>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
                {ilan.butceMin > 0 ? `${ilan.butceMin.toLocaleString()} ${ilan.butceBirimi}` : 'Müzakere'}
              </span>
              {ilan.butceMax > 0 && <span style={{ fontSize: '16px', color: '#94a3b8' }}>— {ilan.butceMax.toLocaleString()}</span>}
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {ilan.formData?.sehir && <span style={{ padding: '4px 8px', borderRadius: '6px', background: '#f1f5f9', fontSize: '11px', color: '#64748b' }}>📍 {ilan.formData.sehir}</span>}
              {ilan.formData?.altKategori && <span style={{ padding: '4px 8px', borderRadius: '6px', background: '#f1f5f9', fontSize: '11px', color: '#64748b' }}>{ilan.formData.altKategori}</span>}
              <span style={{ padding: '4px 8px', borderRadius: '6px', background: ilan.teklifeAcik ? '#ecfdf5' : '#fef2f2', fontSize: '11px', color: ilan.teklifeAcik ? '#059669' : '#dc2626' }}>
                {ilan.teklifeAcik ? '🟢 Teklif Açık' : '🔴 Teklif Kapalı'}
              </span>
            </div>

            {!ilanSahibiMi && ilan.teklifeAcik && (
              <button onClick={() => session ? setTeklifModal(true) : router.push(`/uye-ol?redirect=/ilan/${ilan._id}&tip=hizmet_veren`)}
                style={{ width: '100%', padding: '14px', borderRadius: '14px', background: '#f59e0b', border: 'none', color: '#0f172a', fontFamily: 'inherit', fontSize: '14px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 16px rgba(245,158,11,0.3)', marginBottom: '10px' }}>
                💼 Teklif Ver
              </button>
            )}

            {!session && (
              <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>
                Teklif vermek için{' '}
                <span onClick={() => router.push('/uye-ol?tip=hizmet_veren')} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}>üye olun</span>
              </p>
            )}

            {/* İlan gizlilik notu */}
            {ilan.gizliAd && (
              <div style={{ marginTop: '12px', padding: '10px 14px', background: '#fffbeb', borderRadius: '10px', border: '1px solid #fde68a' }}>
                <p style={{ fontSize: '11px', color: '#92400e' }}>
                  🔒 İlan sahibinin bilgileri gizli. Teklif verdikten sonra görüntülenecek.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TEKLİF VER MODALİ */}
      {teklifModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setTeklifModal(false)}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '28px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif' }}>💼 Teklif Ver</h2>
              <button onClick={() => setTeklifModal(false)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1.5px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>✕</button>
            </div>

            {/* İlan özeti */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px', marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>{ilan.baslik}</p>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Bütçe: {ilan.butceMin > 0 ? `${ilan.butceMin.toLocaleString()} — ${ilan.butceMax.toLocaleString()} ${ilan.butceBirimi}` : 'Müzakere'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Teklif Fiyatı *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select value={teklifForm.doviz} onChange={e => setTeklifForm(p => ({ ...p, doviz: e.target.value }))}
                    style={{ width: '80px', padding: '11px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontFamily: 'inherit' }}>
                    <option>₺</option>
                    <option>$</option>
                    <option>€</option>
                  </select>
                  <input type="number" value={teklifForm.fiyat} onChange={e => setTeklifForm(p => ({ ...p, fiyat: e.target.value }))}
                    placeholder="0" style={{ flex: 1, padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontFamily: 'inherit' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Hizmet Detayı</label>
                <textarea value={teklifForm.hizmetDetay} onChange={e => setTeklifForm(p => ({ ...p, hizmetDetay: e.target.value }))}
                  placeholder="Bu fiyata neler dahil? Detaylı açıklayın..."
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '13px', fontFamily: 'inherit', height: '90px', resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Ek Açıklama</label>
                <textarea value={teklifForm.aciklama} onChange={e => setTeklifForm(p => ({ ...p, aciklama: e.target.value }))}
                  placeholder="Özel notlar, sorularınız..."
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '13px', fontFamily: 'inherit', height: '70px', resize: 'vertical' }} />
              </div>

              {/* Teklif ücreti bilgi */}
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px' }}>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#92400e', marginBottom: '4px' }}>💰 Teklif Ücreti</p>
                <p style={{ fontSize: '11px', color: '#78350f', lineHeight: '1.5' }}>
                  Bütçenin %1'i kadar teklif ücreti alınır (min 10₺). Bu ücret sisteminizden otomatik düşülür. Teklif kabul edilirse ücret hizmet bedelinden mahsup edilir.
                </p>
              </div>

              <button onClick={handleTeklifVer} disabled={gonderiyor || !teklifForm.fiyat}
                style={{ padding: '14px', borderRadius: '12px', background: !teklifForm.fiyat ? '#e2e8f0' : '#f59e0b', border: 'none', color: !teklifForm.fiyat ? '#94a3b8' : '#0f172a', fontFamily: 'inherit', fontSize: '14px', fontWeight: '800', cursor: !teklifForm.fiyat ? 'not-allowed' : 'pointer' }}>
                {gonderiyor ? '⏳ Gönderiliyor...' : '💼 Teklifi Gönder'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEKLİF İNCELE MODALİ */}
      {secimModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setSecimModal(null)}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '28px', width: '100%', maxWidth: '440px' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', fontFamily: 'Playfair Display, serif' }}>Teklif Detayı</h2>
              <button onClick={() => setSecimModal(null)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1.5px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{secimModal.teklifci?.ad}</p>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>{secimModal.teklifci?.email}</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: '#059669', marginBottom: '8px' }}>
                {Number(secimModal.teklifFiyat).toLocaleString()} {secimModal.doviz}
              </p>
              {secimModal.hizmetDetay && (
                <div style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '4px' }}>HİZMET DETAYI</p>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>{secimModal.hizmetDetay}</p>
                </div>
              )}
              {secimModal.aciklama && (
                <div>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '4px' }}>AÇIKLAMA</p>
                  <p style={{ fontSize: '13px', color: '#475569' }}>{secimModal.aciklama}</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setSecimModal(null)}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#f1f5f9', border: 'none', color: '#475569', fontFamily: 'inherit', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                İptal
              </button>
              <button onClick={() => handleTeklifKabul(secimModal._id)}
                style={{ flex: 2, padding: '12px', borderRadius: '12px', background: '#059669', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                ✅ Teklifi Kabul Et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
