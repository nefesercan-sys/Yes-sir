'use client';

import React, { useState } from 'react';

const WA_NUMBER = "905000000000";
const waLink = (msg: string): string =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// SVG with explicit width/height — never relies on Tailwind
const WaIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const S = {
  // colors
  emerald: '#059669',
  emeraldDark: '#047857',
  emeraldLight: '#d1fae5',
  emeraldBg: '#ecfdf5',
  wa: '#25D366',
  waDark: '#1fae53',
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  slate50: '#f8fafc',
  white: '#ffffff',
  amber100: '#fef3c7',
  amber800: '#92400e',
};

export default function OnlineTerziClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Siparişimi vermek için mağazaya gitmem gerekiyor mu?", a: "Hayır! Tüm süreç online yürür. Ölçülerinizi alır, modelinizi seçer ve WhatsApp üzerinden iletirsiniz. Ürününüz kapınıza teslim edilir." },
    { q: "Ölçülerim tam oturmadıysa ne yapabilirim?", a: "Tam uyum garantimiz kapsamında ücretsiz revizyon imkânı sunuyoruz. Ürünü iade eder, revize edilmiş halini teslim alırsınız." },
    { q: "Teslimat süresi ne kadar?", a: "Sipariş onayından sonra ortalama 7-10 iş günü içinde ürününüz hazır olur. Kargo süresiyle birlikte toplam 10-14 iş günü içinde elinizde olur." },
    { q: "Hangi kumaşlar kullanılıyor?", a: "Yalnızca %100 organik müslin ve keten kumaş kullanıyoruz. Tüm boyalar OEKO-TEX sertifikalı, kimyasal içermiyor." },
  ];

  const collections = [
    { title: "Kadın Modelleri", tag: "Özel Dikim", tagBg: S.emeraldLight, tagColor: S.emeraldDark, desc: "Rahat kesim müslin elbiseler, keten palazzo pantolonlar ve yazlık bluzlar.", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop", msg: "Kadın müslin/keten modelleri hakkında bilgi almak istiyorum." },
    { title: "Erkek Modelleri", tag: null, tagBg: '', tagColor: '', desc: "Terletmeyen %100 keten gömlekler, rahat kesim şortlar ve tam bedeninize oturan ceketler.", img: "https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=600&auto=format&fit=crop", msg: "Erkek keten modelleri hakkında bilgi almak istiyorum." },
    { title: "Bebek & Çocuk", tag: "Antialerjik", tagBg: S.amber100, tagColor: S.amber800, desc: "Hassas ciltler için kimyasal içermeyen, organik boyalı yumuşacık müslin tulum ve takımlar.", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop", msg: "Bebek müslin kıyafetleri hakkında bilgi almak istiyorum." },
    { title: "Anne – Bebek", tag: null, tagBg: '', tagColor: '', desc: "Özel günler ve dış çekimler için birebir aynı kumaştan uyumlu set tasarımları.", img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop", msg: "Anne-bebek kombinleri hakkında bilgi almak istiyorum." },
  ];

  const corporate = [
    { icon: "🏨", title: "Otel & Restoran", desc: "Şef ceketleri, barista önlükleri, resepsiyon takımları. Kurumsal kimliğinize uyumlu toptan üretim.", msg: "Otel/Restoran kurumsal üniforma fason üretimi için fiyat almak istiyorum." },
    { icon: "🩺", title: "Medikal Scrubs", desc: "Hastane ve klinikler için terletmeyen, konforlu doktor/hemşire formaları. Alpaka ve likralı seçenekler.", msg: "Medikal scrubs üretimi için toptan fiyat almak istiyorum." },
    { icon: "✂️", title: "Markalara Fason", desc: "Kendi markanız için modelistlik, kesim, dikim, ütü ve etiketleme süreçleri butik kalitesinde.", msg: "Markam için fason üretim detayları görüşmek istiyorum." },
  ];

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Georgia, serif', color: S.slate800, backgroundColor: S.white, margin: 0, padding: 0 }}>

      {/* TRUST BAR */}
      <div style={{ backgroundColor: S.emeraldDark, color: S.white, fontSize: 12, fontWeight: 600, padding: '10px 16px', textAlign: 'center', letterSpacing: '0.03em' }}>
        ✨ %100 Organik Kumaş Garantisi &nbsp;|&nbsp; Antalya'dan Tüm Türkiye'ye Hızlı Teslimat &nbsp;|&nbsp; Ücretsiz Revizyon
      </div>

      {/* NAVBAR */}
      <header style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)', zIndex: 50, borderBottom: `1px solid ${S.slate200}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <a href="https://swaphubs.com/online-terzi-hizmeti" style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: S.slate900, textDecoration: 'none', flexShrink: 0 }}>
            SwapHubs <span style={{ fontWeight: 300, color: S.emerald }}>Terzi</span>
          </a>
          <a
            href={waLink("Merhaba, sipariş vermek istiyorum.")}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: S.emerald, color: S.white, padding: '10px 18px', borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(5,150,105,0.3)' }}
          >
            <WaIcon size={18} />
            Siparişe Başla
          </a>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${S.slate50} 0%, ${S.emeraldBg} 100%)`, padding: '64px 16px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 48 }}>
          <div style={{ flex: '1 1 320px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, backgroundColor: S.emeraldLight, color: S.emeraldDark, fontWeight: 700, fontSize: 12, marginBottom: 20, border: `1px solid ${S.emerald}33` }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: S.emerald, display: 'inline-block' }}></span>
              Yeni Nesil Dijital Terzi
            </div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900, color: S.slate900, margin: '0 0 20px', lineHeight: 1.2 }}>
              Tam Ölçünüze Göre{' '}
              <span style={{ color: S.emerald }}>Kusursuz Tasarımlar</span>
            </h1>
            <p style={{ fontSize: 16, color: S.slate600, marginBottom: 32, lineHeight: 1.7, maxWidth: 520 }}>
              Evinizin konforundan ayrılmadan, kendi ölçülerinize birebir uyan organik müslin ve keten kıyafetlere sahip olun. İnceleyin, ölçünüzü alın ve WhatsApp'tan siparişinizi tamamlayın.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
              <a href="#koleksiyonlar" style={{ backgroundColor: S.slate900, color: S.white, padding: '14px 28px', borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>
                Koleksiyonu Keşfet
              </a>
              <a href="#olcu-rehberi" style={{ backgroundColor: S.white, color: S.slate900, padding: '14px 28px', borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: `2px solid ${S.slate200}`, display: 'inline-block' }}>
                📏 Ölçü Rehberi
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 14, color: S.slate500 }}>
              {['Tam Uyum Garantisi', '%100 Organik Kumaş', 'Ücretsiz Revizyon'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: S.emerald, fontWeight: 700, fontSize: 16 }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', height: 420, background: `linear-gradient(135deg, ${S.emeraldLight}, ${S.slate200})` }}>
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
                alt="Tekstil atölyesi"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: -16, left: -8, backgroundColor: S.white, padding: '12px 16px', borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${S.slate100}` }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: S.emeraldLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.emerald, fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✓</div>
              <div>
                <div style={{ fontWeight: 700, color: S.slate900, fontSize: 13 }}>Tam Uyum Garantisi</div>
                <div style={{ fontSize: 11, color: S.slate500 }}>Ücretsiz revizyon imkânı</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KOLEKSİYONLAR */}
      <section id="koleksiyonlar" style={{ padding: '80px 16px', backgroundColor: S.slate50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: S.slate900, margin: '0 0 12px' }}>Müslin & Keten Koleksiyonu</h2>
            <p style={{ color: S.slate500, maxWidth: 480, margin: '0 auto', fontSize: 15 }}>Cildinize nefes aldıran, tamamen doğal kumaşlardan size özel dikilen tasarımlar.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {collections.map((item, i) => (
              <div key={i} style={{ backgroundColor: S.white, borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: `1px solid ${S.slate100}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 240, backgroundColor: S.slate100 }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { const t = e.currentTarget as HTMLImageElement; (t.parentNode as HTMLElement).style.background = `linear-gradient(135deg, ${S.emeraldLight}, ${S.slate200})`; t.style.display = 'none'; }}
                  />
                  {item.tag && (
                    <div style={{ position: 'absolute', top: 10, left: 10, backgroundColor: item.tagBg, color: item.tagColor, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>
                      {item.tag}
                    </div>
                  )}
                </div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: S.slate900, margin: '0 0 8px' }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: S.slate500, lineHeight: 1.6, flexGrow: 1, margin: '0 0 16px' }}>{item.desc}</p>
                  <a href={waLink(item.msg)} target="_blank" rel="noopener noreferrer" style={{ display: 'block', backgroundColor: S.slate100, color: S.slate800, textAlign: 'center', padding: '10px', borderRadius: 12, fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                    İncele & Sipariş Ver
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÖLÇÜ REHBERİ */}
      <section id="olcu-rehberi" style={{ padding: '80px 16px', backgroundColor: S.white, borderTop: `1px solid ${S.slate100}`, borderBottom: `1px solid ${S.slate100}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ backgroundColor: S.emeraldBg, borderRadius: 32, padding: 'clamp(24px, 5vw, 56px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 48, border: `1px solid ${S.emerald}22` }}>
            <div style={{ flex: '1 1 300px' }}>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 900, color: S.slate900, margin: '0 0 16px' }}>Ölçünü Al, Siparişini Ver</h2>
              <p style={{ color: S.slate600, marginBottom: 28, lineHeight: 1.7, fontSize: 15 }}>
                Kusursuz bir kalıp için sadece 3 basit adım. Evdeki mezuranızla ölçülerinizi alın ve WhatsApp'tan bize iletin.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { n: '1', title: 'Göğüs & Omuz', desc: 'Mezurayı göğsünüzün en geniş yerinden ve omuz hizasından çok sıkmadan ölçün.' },
                  { n: '2', title: 'Bel & Basen', desc: 'Belinizin en ince noktasını ve baseninizin en geniş kısmını belirleyin.' },
                  { n: '3', title: 'Boy & İletişim', desc: 'İstediğiniz etek/pantolon boyunu seçin ve ölçüleri WhatsApp\'tan gönderin.' },
                ].map(s => (
                  <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, backgroundColor: S.white, padding: 16, borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.05)', border: `1px solid ${S.slate100}` }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: S.emeraldLight, color: S.emeraldDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{s.n}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: S.slate900, marginBottom: 4, fontSize: 15 }}>{s.title}</div>
                      <div style={{ fontSize: 13, color: S.slate500, lineHeight: 1.5 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={waLink("Merhaba, ölçülerimi aldım. Özel dikim siparişi vermek istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10, backgroundColor: S.wa, color: S.white, padding: '14px 24px', borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}
              >
                <WaIcon size={20} />
                WhatsApp'tan Ölçüleri Gönder
              </a>
            </div>
            <div style={{ flex: '1 1 280px' }}>
              <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', height: 380, background: `linear-gradient(135deg, ${S.emeraldLight}, ${S.slate200})` }}>
                <img
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop"
                  alt="Ölçü alma rehberi"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KURUMSAL */}
      <section id="kurumsal" style={{ padding: '80px 16px', backgroundColor: S.slate50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: S.emerald, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, display: 'block', marginBottom: 8 }}>B2B Atölye Çözümleri</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 900, color: S.slate900, margin: '0 0 12px' }}>Kurumsal Tekstil & Fason İmalat</h2>
          <p style={{ color: S.slate500, maxWidth: 520, margin: '0 auto 48px', fontSize: 15 }}>İşletmeniz için yüksek kaliteli, logo nakışlı ve dayanıklı üniforma üretim hizmeti.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, textAlign: 'left' }}>
            {corporate.map((item, i) => (
              <div key={i} style={{ backgroundColor: S.white, padding: 32, borderRadius: 20, border: `1px solid ${S.slate200}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: S.slate900, margin: '0 0 10px' }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: S.slate500, lineHeight: 1.6, flexGrow: 1, margin: '0 0 20px' }}>{item.desc}</p>
                <a href={waLink(item.msg)} target="_blank" rel="noopener noreferrer" style={{ color: S.emerald, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Teklif İste →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section id="sss" style={{ padding: '80px 16px', backgroundColor: S.white, borderTop: `1px solid ${S.slate100}` }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, color: S.slate900, margin: '0 0 10px' }}>Sık Sorulan Sorular</h2>
            <p style={{ color: S.slate500, fontSize: 15 }}>Merak ettikleriniz için hızlı yanıtlar.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ border: `1px solid ${S.slate200}`, borderRadius: 16, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: S.white, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 15, color: S.slate900 }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: S.emerald, fontWeight: 700, fontSize: 20, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 12 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 16px', fontSize: 14, color: S.slate600, lineHeight: 1.6, backgroundColor: S.slate50, borderTop: `1px solid ${S.slate100}` }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: S.slate900, padding: '56px 16px 28px', borderTop: `1px solid ${S.slate800}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: S.white, fontWeight: 700, marginBottom: 12 }}>
                SwapHubs <span style={{ color: '#34d399', fontStyle: 'italic', fontWeight: 300 }}>Terzi</span>
              </div>
              <p style={{ color: S.slate400, fontSize: 13, lineHeight: 1.7 }}>Dijital altyapımızla geleneksel terzilik sanatını evinize getiriyoruz.</p>
            </div>
            <div>
              <div style={{ color: S.white, fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Hızlı Bağlantılar</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['#koleksiyonlar', 'Müslin & Keten Koleksiyonu'], ['#olcu-rehberi', 'Ölçü Alma Rehberi'], ['#kurumsal', 'Kurumsal Tekstil'], ['#sss', 'Sık Sorulan Sorular']].map(([href, label]) => (
                  <a key={href} href={href} style={{ color: S.slate400, fontSize: 13, textDecoration: 'none' }}>{label}</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: S.white, fontWeight: 700, marginBottom: 16, fontSize: 14 }}>İletişim</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                <span style={{ color: S.white, fontWeight: 600 }}>📞 +90 500 000 00 00</span>
                <span style={{ color: S.slate400 }}>✉️ tekstil@swaphubs.com</span>
                <span style={{ color: S.slate400 }}>📍 Antalya, Türkiye</span>
                <span style={{ color: S.slate500, fontSize: 11 }}>Tüm illere kargo mevcuttur.</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${S.slate800}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 11, color: S.slate500 }}>
            <span>© 2026 SwapHubs E-Terzi Platformu. Tüm Hakları Saklıdır.</span>
            <span>Antalya'dan 🇹🇷 Türkiye'ye</span>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={waLink("Merhaba, e-terzi hizmeti hakkında bilgi almak istiyorum.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişim"
        style={{ position: 'fixed', bottom: 20, right: 20, backgroundColor: S.wa, color: S.white, width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.45)', zIndex: 999, textDecoration: 'none' }}
      >
        <WaIcon size={28} />
      </a>

    </div>
  );
}
