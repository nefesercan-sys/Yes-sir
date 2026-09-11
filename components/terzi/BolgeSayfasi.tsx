// ============================================================
// SwapHubs — components/terzi/BolgeSayfasi.tsx
// Antalya ilçe sayfaları VE Türkiye illeri sayfaları için ortak
// şablon. Sunucu bileşeni — hızlı, taranabilir, JS'siz de çalışır.
// ============================================================

import TerziMarketingBottomNav from './MarketingBottomNav';

const YESIL = '#2d8c6e';
const PHONE = '+90 531 898 64 18';

function WA(msg: string) {
  return `https://wa.me/905318986418?text=${encodeURIComponent(msg)}`;
}

type Props = {
  tip: 'antalya-ilce' | 'il';
  lokasyonAdi: string;
  url: string;
  komsuLokasyonlar: { slug: string; ad: string }[];
  komsuHref: (slug: string) => string;
};

export default function BolgeSayfasi({ tip, lokasyonAdi, url, komsuLokasyonlar, komsuHref }: Props) {
  const antalyaIlcesi = tip === 'antalya-ilce';

  // ── SSS — gerçek arama terimleriyle, yapay zeka motorlarının (ChatGPT,
  // Perplexity, Google AI Overview) referans alması için FAQPage şeması ──
  const sorular = antalyaIlcesi ? [
    { s: `${lokasyonAdi}'de terzi nasıl bulunur?`, c: `${lokasyonAdi} bölgesinde terzi bulmak için swaphubs.com/terzi-talep sayfasından ücretsiz talep oluşturabilir veya Terzi Can'a doğrudan WhatsApp'tan (${PHONE}) ulaşabilirsiniz.` },
    { s: `${lokasyonAdi} paça kısaltma fiyatı ne kadar 2026?`, c: `${lokasyonAdi} dahil tüm Antalya'da paça kısaltma ₺150'den başlıyor. Kesin fiyat kumaş ve modele göre değişebilir, WhatsApp'tan anında fiyat teklifi alabilirsiniz.` },
    { s: `${lokasyonAdi}'de aynı gün teslim terzi var mı?`, c: `Evet, Terzi Can birçok tadilat işini (paça kısaltma, fermuar değişimi, bel daraltma) aynı gün içinde tamamlayıp ${lokasyonAdi}'ye teslim edebiliyor.` },
    { s: `${lokasyonAdi}'ye eve veya otele gelen terzi hizmeti var mı?`, c: `Evet, araçlı terzi servisiyle ${lokasyonAdi} dahil tüm Antalya ilçelerine gidip yerinde ölçü alıyoruz.` },
    { s: `${lokasyonAdi}'de kuru temizleme fiyatları nedir?`, c: `${lokasyonAdi} bölgesinde kuru temizleme ₺300'den başlıyor, mont ve kaban için fiyat değişebilir. Otelden kurye alım seçeneği de mevcut.` },
  ] : [
    { s: `${lokasyonAdi}'de terzi nasıl bulunur?`, c: `${lokasyonAdi}'de terzi bulmak için swaphubs.com/terzi-talep sayfasından ihtiyacınızı ve konumunuzu girip ücretsiz talep oluşturun — ${lokasyonAdi}'deki terziler ve kuru temizlemeciler size fiyat teklifi versin.` },
    { s: `${lokasyonAdi}'de yakınımda terzi nasıl ararım?`, c: `SwapHubs Terzi uygulaması konumunuzu kullanarak ${lokasyonAdi} içinde size en yakın terzi ve kuru temizlemecileri bulup teklif almanızı sağlar.` },
    { s: `${lokasyonAdi} terzi telefon numarası nasıl bulunur?`, c: `Talep oluşturduğunuzda size teklif veren terzinin telefon numarası ve WhatsApp'ı doğrudan uygulama üzerinden paylaşılır, ekstra arama yapmanıza gerek kalmaz.` },
    { s: `${lokasyonAdi}'de online terzi teklifi almak ücretsiz mi?`, c: `Evet, SwapHubs Terzi'de talep oluşturmak ve teklif almak tamamen ücretsizdir.` },
    { s: `${lokasyonAdi}'de acil terzi veya aynı gün dikim mümkün mü?`, c: `Talep oluştururken "acil" veya "aynı gün" notunu ekleyebilirsiniz, ${lokasyonAdi}'deki terziler uygunluklarına göre teklif verir.` },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: 'https://swaphubs.com' },
          { '@type': 'ListItem', position: 2, name: 'Terzi', item: 'https://swaphubs.com/terzi' },
          ...(antalyaIlcesi ? [{ '@type': 'ListItem', position: 3, name: `${lokasyonAdi} Terzi`, item: url }]
            : [{ '@type': 'ListItem', position: 3, name: `${lokasyonAdi} Terzi`, item: url }]),
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: sorular.map(q => ({
          '@type': 'Question', name: q.s,
          acceptedAnswer: { '@type': 'Answer', text: q.c },
        })),
      },
    ],
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
              ? `${lokasyonAdi} ve çevresine hizmet veren Terzi Can ile paça kısaltma, fermuar değişimi, bel daraltma, özel dikim ve kuru temizleme ihtiyaçların için hemen teklif al. Yakınımda terzi arayanlar için aynı gün teslim, eve gelen terzi servisi mevcut.`
              : `${lokasyonAdi}'de terzi mi arıyorsun? "Yakınımda terzi" ya da "en yakın terzi ve kuru temizleme" aramak yerine, hizmetini ve konumunu gir — ${lokasyonAdi}'deki terziler ve dikim atölyeleri sana fiyat teklifi versin, en uygununu seç.`}
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

      {/* SSS — görünür + FAQPage şeması yukarıda tanımlı */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.2rem', textAlign: 'center' }}>Sıkça Sorulan Sorular</h2>
        {sorular.map((q, i) => (
          <details key={i} style={{ background: '#fff', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: 10, border: '1px solid #eef2f0' }}>
            <summary style={{ fontWeight: 700, fontSize: '.9rem', cursor: 'pointer', color: '#0f172a' }}>{q.s}</summary>
            <p style={{ fontSize: '.85rem', color: '#64748b', marginTop: '.6rem', lineHeight: 1.6 }}>{q.c}</p>
          </details>
        ))}
      </section>

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
      <TerziMarketingBottomNav />
    </div>
  );
}
