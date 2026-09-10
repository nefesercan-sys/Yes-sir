// ============================================================
// SwapHubs — components/terzi/BolgeSayfasi.tsx
// Antalya ilçe sayfaları VE Türkiye illeri sayfaları için ortak
// şablon. Sunucu bileşeni — hızlı, taranabilir, JS'siz de çalışır.
// ============================================================

const YESIL = '#2d8c6e';
const PHONE = '+90 531 898 64 18';

function WA(msg: string) {
  return `https://wa.me/905318986418?text=${encodeURIComponent(msg)}`;
}

type Props = {
  tip: 'antalya-ilce' | 'il';
  lokasyonAdi: string;
  komsuLokasyonlar: { slug: string; ad: string }[];
  komsuHref: (slug: string) => string;
};

export default function BolgeSayfasi({ tip, lokasyonAdi, komsuLokasyonlar, komsuHref }: Props) {
  const antalyaIlcesi = tip === 'antalya-ilce';

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0f2f24, #14392b)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span style={{ display: 'inline-block', background: 'rgba(45,140,110,.25)', color: '#a7f3d0', fontSize: '.75rem', fontWeight: 700, padding: '.4rem .9rem', borderRadius: 20, marginBottom: '1.2rem' }}>
            🧵 {lokasyonAdi} Terzi & Kuru Temizleme
          </span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem' }}>
            {antalyaIlcesi
              ? `${lokasyonAdi} Terzi — Paça Kısaltma, Tadilat, Özel Dikim`
              : `${lokasyonAdi} Terzi — Online Teklif Al, Çevrendeki Terziler Teklif Versin`}
          </h1>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            {antalyaIlcesi
              ? `${lokasyonAdi} ve çevresine hizmet veren Terzi Can ile paça kısaltma, fermuar değişimi, bel daraltma, özel dikim ve kuru temizleme ihtiyaçların için hemen teklif al.`
              : `${lokasyonAdi}'de terzi mi arıyorsun? Hizmetini ve konumunu gir, ${lokasyonAdi}'deki terziler ve kuru temizlemeciler sana fiyat teklifi versin, en uygununu seç.`}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/terzi-talep" style={{ background: YESIL, color: '#fff', padding: '.9rem 1.8rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: '.95rem' }}>
              📝 Ücretsiz Teklif Al
            </a>
            {antalyaIlcesi && (
              <a href={WA(`Merhaba, ${lokasyonAdi} bölgesinde terzi hizmeti almak istiyorum.`)} target="_blank" rel="noopener noreferrer"
                style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,.4)', color: '#fff', padding: '.9rem 1.8rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: '.95rem' }}>
                💬 WhatsApp'tan Yaz
              </a>
            )}
          </div>
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section style={{ background: '#f7faf9', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '2rem' }}>Nasıl Çalışır?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
            {[
              { ic: '🧵', h: 'Hizmeti Seç', d: `${lokasyonAdi} içinde konumunu ve ihtiyacını gir.` },
              { ic: '📸', h: 'Fotoğraf Ekle', d: 'İstersen kıyafetin fotoğrafını ekle (opsiyonel).' },
              { ic: '💰', h: 'Teklif Al, Seç', d: `${lokasyonAdi}'deki terziler teklif versin, en uygununu seç.` },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,.04)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '.5rem' }}>{s.ic}</div>
                <h3 style={{ fontSize: '.95rem', fontWeight: 800, marginBottom: '.4rem' }}>{s.h}</h3>
                <p style={{ fontSize: '.8rem', color: '#64748b', margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HİZMETLER LİSTESİ */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.2rem', textAlign: 'center' }}>
          {lokasyonAdi} Terzi Hizmetleri
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', justifyContent: 'center' }}>
          {['Paça Kısaltma', 'Bel Daraltma', 'Etek Kısaltma', 'Fermuar Değişimi', 'Ceket Tamiri', 'Mont Tamiri',
            'Gömlek Tamiri', 'Elbise Tamiri', 'Abiye Tamiri', 'Özel Dikim', 'Ütü Hizmeti', 'Kuru Temizleme'].map(h => (
            <span key={h} style={{ background: '#eaf6f1', color: YESIL, fontSize: '.8rem', fontWeight: 600, padding: '.5rem 1rem', borderRadius: 20 }}>
              {h}
            </span>
          ))}
        </div>
      </section>

      {antalyaIlcesi && (
        <section style={{ background: '#f7faf9', padding: '3rem 1.5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '.8rem' }}>Terzi Can — {lokasyonAdi}'ye Hizmet Veriyor</h2>
            <p style={{ color: '#64748b', fontSize: '.9rem', marginBottom: '1.5rem' }}>
              Konyaaltı merkezli atölyemiz, araçlı terzi servisiyle {lokasyonAdi} dahil tüm Antalya ilçelerine hizmet veriyor. Yerinde ölçü alma, aynı gün teslim seçenekleri mevcut.
            </p>
            <a href={WA(`Merhaba, ${lokasyonAdi}'de terzi hizmeti hakkında bilgi almak istiyorum.`)} target="_blank" rel="noopener noreferrer"
              style={{ background: YESIL, color: '#fff', padding: '.8rem 1.6rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: '.9rem' }}>
              💬 {PHONE} — WhatsApp'tan Yaz
            </a>
          </div>
        </section>
      )}

      {/* KOMŞU BÖLGELER — iç linkleme */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center' }}>
          {antalyaIlcesi ? 'Diğer Antalya İlçeleri' : 'Diğer Şehirler'}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'center' }}>
          {komsuLokasyonlar.map(k => (
            <a key={k.slug} href={komsuHref(k.slug)} style={{ fontSize: '.8rem', color: '#475569', textDecoration: 'none', border: '1px solid #e2e8f0', padding: '.5rem 1rem', borderRadius: 20 }}>
              {k.ad}
            </a>
          ))}
        </div>
      </section>

      {/* KAPANIŞ CTA */}
      <section style={{ background: YESIL, padding: '3rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>
          {lokasyonAdi}'de Terzi Aramaya Şimdi Başla
        </h2>
        <a href="/terzi-talep" style={{ background: '#fff', color: YESIL, padding: '.9rem 1.8rem', borderRadius: 10, fontWeight: 800, textDecoration: 'none', fontSize: '.95rem', display: 'inline-block' }}>
          📝 Ücretsiz Teklif Al
        </a>
      </section>
    </div>
  );
}
