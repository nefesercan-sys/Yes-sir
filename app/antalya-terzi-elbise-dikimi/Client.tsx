// app/antalya-terzi-elbise-dikimi/Client.tsx
'use client'

import { useEffect, useState } from 'react'

const PHONE_DISPLAY = '+90 531 898 64 18'
const PHONE_E164 = '+905318986418'
const WA = (msg: string) => `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(msg)}`

// Unsplash — telif hakkı serbest (Unsplash Lisansı)
const IMGS = {
  dikim:   'https://images.unsplash.com/photo-1594938298603-c8148c4b4f0e?w=900&q=85&auto=format&fit=crop',
  tadilat: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=900&q=85&auto=format&fit=crop',
  onarim:  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=85&auto=format&fit=crop',
  utu:     'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=900&q=85&auto=format&fit=crop',
}

type ServiceItem = { name: string; price: string; note?: string }
type ServiceGroup = {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  priceList?: ServiceItem[]
}

const SERVICES: ServiceGroup[] = [
  {
    id: 'diger',
    eyebrow: 'Özel Ölçü',
    title: 'Elbise Dikimi',
    description:
      'Kumaşınızı getirin veya atölye kataloğumuzdan seçin — size tam oturan, prova destekli dikim. Günlük, davetiye ve özel gün kıyafetleri için.',
    image: IMGS.dikim,
    imageAlt: 'Özel elbise dikimi — Terzi Can Antalya',
    priceList: [
      { name: 'Günlük Elbise (Özel Ölçü)', price: "800 TL'den başlar", note: '3–5 iş günü' },
      { name: 'Davetiye / Abiye Elbise',   price: "1.500 TL'den başlar", note: 'Model detayına göre' },
      { name: 'Tulum / Takım Elbise',      price: "1.200 TL'den başlar", note: '4–6 iş günü' },
      { name: 'Gelinlik Dikimi',           price: 'Fiyat Teklifi', note: 'Atölyede görüşme' },
    ],
  },
  {
    id: 'tadilat',
    eyebrow: 'Tam Oturan',
    title: 'Tadilat & Daraltma',
    description:
      'Mevcut kıyafetinizi vücudunuza tam oturtun. Bel, göğüs ve sırt daraltma; askı ve kol ayarı — her tadilat el işçiliğiyle tamamlanır.',
    image: IMGS.tadilat,
    imageAlt: 'Elbise tadilat daraltma — Terzi Can Antalya',
    priceList: [
      { name: 'Bel daraltma',              price: "180 TL'den başlar" },
      { name: 'Göğüs / sırt daraltma',    price: "220 TL'den başlar" },
      { name: 'Askı kısaltma / ayar',      price: "90 TL'den başlar" },
      { name: 'Genel elbise tadilatı',     price: "200 TL'den başlar", note: 'İnceleme sonrası netleşir' },
    ],
  },
  {
    id: 'onarim',
    eyebrow: 'Hızlı Çözüm',
    title: 'Paça, Fermuar & Onarım',
    description:
      'Günlük giyimde en sık ihtiyaç duyduğunuz işlemler. Randevulu çalışarak çoğu işlem aynı gün veya ertesi gün teslim edilir.',
    image: IMGS.onarim,
    imageAlt: 'Paça kısaltma fermuar onarım — Terzi Can Antalya',
    priceList: [
      { name: 'Paça kısaltma (pantolon/etek)', price: "150 TL'den başlar", note: 'Aynı gün' },
      { name: 'Fermuar değişimi',              price: "120 TL'den başlar" },
      { name: 'Yırtmaç / dikiş onarımı',      price: "80 TL'den başlar" },
      { name: 'Düğme, kopça, ilik tamiri',     price: "40 TL/adet'ten başlar" },
    ],
  },
  {
    id: 'utu',
    eyebrow: 'Kusursuz Görünüm',
    title: 'Ütü & Son Bakım',
    description:
      'Özel günler ve iş kıyafetleri için profesyonel ütü ve buharlama. Kıyafetiniz teslim aldığınız gün giyime hazır olur.',
    image: IMGS.utu,
    imageAlt: 'Profesyonel ütü buharlama — Terzi Can Antalya',
    priceList: [
      { name: 'Elbise / Günlük Ceket',        price: "60 TL/adet'ten başlar" },
      { name: 'Takım Elbise (Alt/Üst)',        price: "120 TL/adet'ten başlar" },
      { name: 'Gelinlik / Abiye buharlama',   price: "300 TL'den başlar" },
      { name: 'Toplu ütü (5+ parça)',          price: 'Adet bazlı indirim' },
    ],
  },
]

const FAST_FACTS = [
  { label: 'Randevulu Çalışma',        detail: 'Bekleme yok, zamanınız size ait' },
  { label: 'Şeffaf Fiyatlandırma',     detail: 'Sürpriz ücret yok, önceden onay' },
  { label: 'Kalite Garantisi',         detail: 'Atölye işçiliği, dikiş garantisi' },
  { label: 'Ön Değerlendirme (WP)',    detail: 'Uygulamadan fotoğraf gönderin' },
]

export default function ElbiseDikimiClient() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="elbise-dikimi-wrapper">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        :root {
          --champagne: #F4E8D9;
          --champagne-dark: #E6D2B5;
          --bronze: #C89F70;
          --bronze-deep: #A67C52;
          --ink: #1C1A1A;
          --ink-light: #2A2828;
          --stone: #8C8A88;
          --stone-light: #B5B3B0;
          --bg-light: #FDFCFB;
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }

        .elbise-dikimi-wrapper * {
          box-sizing: border-box;
        }

        .elbise-dikimi-wrapper {
          font-family: var(--font-body);
          background-color: var(--bg-light);
          color: var(--ink);
          min-height: 100vh;
        }

        /* Navigasyon */
        .nav {
          padding: 0.8rem 1.5rem;
          font-size: 0.85rem;
          background: var(--champagne);
          color: var(--stone);
          border-bottom: 1px solid var(--champagne-dark);
          display: flex;
          gap: 0.5rem;
        }
        .nav-link {
          color: var(--bronze-deep);
          text-decoration: none;
          font-weight: 500;
        }
        .nav-link:hover { text-decoration: underline; }

        /* Hero */
        .hero {
          background: linear-gradient(135deg, var(--ink) 0%, var(--ink-light) 70%, #3A2E20 100%);
          padding: 5rem 1.5rem 4.5rem;
          color: #fff;
        }
        .hero-container { max-width: 960px; margin: 0 auto; }
        .hero-eyebrow {
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--champagne-dark);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hero-eyebrow-line { width: 30px; height: 1px; background: var(--bronze); }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .hero-title span {
          color: var(--champagne-dark);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.4rem, 4vw, 2.3rem);
          display: block;
          margin-top: 0.5rem;
        }
        .hero-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.8;
          max-width: 680px;
          margin-bottom: 2.5rem;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary {
          background: var(--bronze);
          color: #fff;
          padding: 1rem 2rem;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: var(--bronze-deep); }
        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          padding: 1rem 1.8rem;
          text-decoration: none;
          font-size: 0.85rem;
          border-radius: 4px;
          transition: border-color 0.2s;
        }
        .btn-secondary:hover { border-color: #fff; }

        /* Hızlı Bilgiler */
        .fact-section {
          background: #fff;
          padding: 4rem 1.5rem;
          border-bottom: 1px solid var(--champagne);
        }
        .fact-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        .fact-item { text-align: center; }
        .fact-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 0.5rem;
          font-family: var(--font-display);
        }
        .fact-detail { font-size: 0.8rem; color: var(--stone); line-height: 1.4; }

        /* Hizmet Grupları */
        .services-section {
          padding: 5rem 1.5rem;
          background: var(--bg-light);
        }
        .service-group {
          max-width: 960px;
          margin: 0 auto 6rem;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          align-items: center;
        }
        .service-group:nth-child(even) { direction: rtl; }
        .service-group:nth-child(even) > * { direction: ltr; }
        .service-image-wrapper {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          aspect-ratio: 4/5;
        }
        .service-img {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .service-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .service-eyebrow {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--bronze-deep);
          margin-bottom: 0.8rem;
          font-weight: 600;
        }
        .service-title {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--ink);
          margin-bottom: 1rem;
        }
        .service-desc {
          font-size: 0.95rem;
          color: var(--stone);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        /* Fiyat Listesi */
        .price-list {
          border-top: 1px solid var(--champagne-dark);
          padding-top: 1.5rem;
        }
        .price-item {
          display: flex;
          justify-content: space-between;
          padding: 0.8rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.03);
          font-size: 0.9rem;
        }
        .price-name { font-weight: 500; color: var(--ink-light); }
        .price-val {
          font-weight: 700;
          color: var(--bronze-deep);
          white-space: nowrap;
          margin-left: 1rem;
        }
        .price-note {
          display: block;
          font-size: 0.75rem;
          color: var(--stone);
          margin-top: 0.2rem;
        }

        /* Süreç */
        .process-section {
          background: var(--ink);
          color: #fff;
          padding: 5rem 1.5rem;
        }
        .process-container { max-width: 900px; margin: 0 auto; }
        .process-title-area { text-align: center; margin-bottom: 3rem; }
        .process-title {
          font-family: var(--font-display);
          font-size: 2.2rem;
          color: var(--champagne-dark);
          margin-bottom: 0.5rem;
        }
        .process-desc-top { color: var(--stone-light); font-size: 0.9rem; }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2.5rem;
        }
        .process-step { position: relative; }
        .step-num {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: var(--bronze);
          line-height: 1;
          margin-bottom: 0.8rem;
        }
        .step-title { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; }
        .step-desc { font-size: 0.85rem; color: rgba(255,255,255,0.6); line-height: 1.6; }

        /* FAQ */
        .faq-section { padding: 5rem 1.5rem; background: #fff; }
        .faq-container { max-width: 800px; margin: 0 auto; }
        .faq-header { text-align: center; margin-bottom: 3.5rem; }
        .faq-title {
          font-family: var(--font-display);
          font-size: 2.2rem;
          color: var(--ink);
          margin-bottom: 0.5rem;
        }
        .faq-item {
          border-bottom: 1px solid var(--champagne);
          padding-bottom: 1.8rem;
          margin-bottom: 1.8rem;
        }
        .q-text { font-size: 1.1rem; font-weight: 600; color: var(--ink); margin-bottom: 0.6rem; }
        .a-text { font-size: 0.95rem; color: var(--stone); line-height: 1.7; }

        /* CTA */
        .cta-banner {
          background: var(--bronze-deep);
          color: #fff;
          padding: 4rem 1.5rem;
          text-align: center;
        }
        .cta-inner { max-width: 750px; margin: 0 auto; }
        .cta-heading {
          font-family: var(--font-display);
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
        .cta-txt { font-size: 0.95rem; opacity: 0.9; line-height: 1.7; margin-bottom: 2rem; }
        .btn-cta {
          display: inline-block;
          border: 2px solid #fff;
          color: #fff;
          padding: 0.9rem 2.5rem;
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 4px;
          transition: background 0.2s, color 0.2s;
        }
        .btn-cta:hover { background: #fff; color: var(--bronze-deep); }

        /* Footer */
        .footer {
          background: #111;
          padding: 3rem 1.5rem;
          text-align: center;
          color: rgba(255,255,255,0.4);
          font-size: 0.8rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-links { margin-top: 0.5rem; color: rgba(255,255,255,0.2); }

        /* Mobil */
        @media (max-width: 768px) {
          .service-group { grid-template-columns: 1fr; gap: 2rem; }
          .service-group:nth-child(even) { direction: ltr; }
          .hero-title { font-size: 2.3rem; }
          .hero-title span { font-size: 1.6rem; }
        }
      `}</style>

      {/* Breadcrumb */}
      <nav className="nav" aria-label="Sayfa yolu">
        <a href="/" className="nav-link">SwapHubs</a>
        <span>›</span>
        <a href="/terzi" className="nav-link">Terzi Can Antalya</a>
        <span>›</span>
        <span style={{ color: 'var(--ink)' }}>Antalya Elbise Dikimi &amp; Tadilat</span>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-container">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            Terzi Can · Kişiye Özel Tasarım &amp; Onarım
          </div>
          <h1 className="hero-title">
            Antalya Elbise Dikimi
            <span>&amp; Profesyonel Tadilat Atölyesi</span>
          </h1>
          <p className="hero-desc">
            Konyaaltı&apos;ndaki atölyemizde abiye, gelinlik ve günlük elbise dikimi hizmeti sunuyoruz.
            Paça kısaltma, fermuar değişimi ve daraltma gibi tüm tadilat işleriniz özenle tamamlanır.
          </p>
          <div className="hero-actions">
            <a
              href={WA('Merhaba, Antalya elbise dikimi ve tadilatı için bilgi almak istiyorum.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              💬 WhatsApp&apos;tan Randevu Al
            </a>
            <a href={`tel:${PHONE_E164}`} className="btn-secondary">
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      {/* Hızlı Bilgi Grid */}
      <section className="fact-section" aria-label="Neden Terzi Can?">
        <div className="fact-grid">
          {FAST_FACTS.map((f, i) => (
            <article className="fact-item" key={i}>
              <h3 className="fact-label">{f.label}</h3>
              <p className="fact-detail">{f.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Hizmet Grupları */}
      <section className="services-section" id="hizmetler" aria-labelledby="svc-h">
        <h2 id="svc-h" style={{ display: 'none' }}>Elbise Dikimi ve Tadilat Hizmetleri</h2>
        {SERVICES.map((srv, i) => (
          <article className="service-group" key={srv.id} id={srv.id}>
            <div className="service-image-wrapper">
              <img
                src={srv.image}
                alt={srv.imageAlt}
                className="service-img"
                loading={i < 2 ? 'eager' : 'lazy'}
                width={900}
                height={1125}
              />
            </div>
            <div className="service-content">
              <div className="service-eyebrow">{srv.eyebrow}</div>
              <h2 className="service-title">{srv.title}</h2>
              <p className="service-desc">{srv.description}</p>
              {srv.priceList && (
                <div className="price-list">
                  {srv.priceList.map((item, idx) => (
                    <div className="price-item" key={idx}>
                      <span className="price-name">
                        {item.name}
                        {item.note && <span className="price-note">{item.note}</span>}
                      </span>
                      <span className="price-val">{item.price}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ marginTop: '1.5rem' }}>
                <a
                  href={WA(`Merhaba, ${srv.title} hakkında bilgi ve fiyat almak istiyorum.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: '0.78rem' }}
                >
                  💬 Fiyat Al
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Süreç */}
      <section className="process-section" id="nasil-calisir" aria-labelledby="process-h">
        <div className="process-container">
          <div className="process-title-area">
            <h2 className="process-title" id="process-h">Nasıl Çalışıyoruz?</h2>
            <p className="process-desc-top">Dikiş ve tadilat süreciniz 4 adımda kusursuzca tamamlanır.</p>
          </div>
          <div className="process-grid">
            {[
              ['01', 'İletişim & Ön Değerlendirme', "WhatsApp üzerinden kıyafetinizin görselini ve talebinizi paylaşın, fiyat ve süre bilgisi verelim."],
              ['02', 'Randevu & Prova', 'Atölyemize uğrayıp üzerinize göre prova yapabiliriz veya kurye ile adresten teslimat sağlayabiliriz.'],
              ['03', 'Kusursuz İşçilik', 'Terzi Can güvencesiyle dikişiniz orijinal standartlara uygun olarak atölyemizde tamamlanır.'],
              ['04', 'Teslimat', 'İşlemi biten kıyafetinizi teslim alabilir veya adresinize kurye ile gönderilmesini sağlayabilirsiniz.'],
            ].map(([num, title, desc]) => (
              <div className="process-step" key={num}>
                <div className="step-num">{num}</div>
                <h3 className="step-title">{title}</h3>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="sss" aria-labelledby="faq-h">
        <div className="faq-container">
          <header className="faq-header">
            <h2 className="faq-title" id="faq-h">Sıkça Sorulan Sorular</h2>
            <p style={{ color: 'var(--stone)' }}>Merak ettiğiniz tüm detaylar</p>
          </header>
          {([
            [
              "Antalya'da abiye veya elbise dikimi ne kadar sürer?",
              "Özel ölçü elbise ve kişiye özel abiye dikimleri modelin yapısına göre ortalama 3 ile 5 iş günü arasında sürmektedir.",
            ],
            [
              'Paça kısaltma ve fermuar değişimi ücreti nedir?',
              "Pantolon paça kısaltma ücreti 150 TL'den başlamaktadır. Fermuar ve diğer tadilatlar kumaşın yapısına göre netleşir.",
            ],
            [
              'Gelinlik ve abiye daraltma yapıyor musunuz?',
              'Evet, tüm özel gün kıyafetlerinin hassas tadilatlarını, bel daraltma ve boy ayarlarını profesyonel atölyemizde gerçekleştiriyoruz.',
            ],
          ] as [string, string][]).map(([q, a], i) => (
            <article className="faq-item" key={i}>
              <h3 className="q-text">{q}</h3>
              <p className="a-text">{a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <div className="cta-inner">
          <h2 className="cta-heading">Kıyafetlerinizi Tam Vücudunuza Göre Oturtalım</h2>
          <p className="cta-txt">
            Profesyonel dikiş, onarım, paça, fermuar ve ütü ihtiyaçlarınız için atölyemize uğrayabilir
            ya da WhatsApp&apos;tan destek alabilirsiniz.
          </p>
          <a
            href={WA('Merhaba, randevu almak istiyorum.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
          >
            Mesaj Gönder
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Terzi Can — Antalya Elbise Dikimi ve Terzilik Hizmetleri.</p>
        <p className="footer-links">Konyaaltı Terzi · Elbise Tamiratı · Paça Kısaltma · Fermuar Onarım Atölyesi</p>
      </footer>
    </div>
  )
}
