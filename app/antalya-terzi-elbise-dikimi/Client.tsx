// app/antalya-terzi-elbise-dikimi/Client.tsx
'use client'

import { useEffect, useState } from 'react'

const PHONE_DISPLAY = '+90 531 898 64 18'
const PHONE_E164 = '+905318986418'
const WA = (msg: string) => `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(msg)}`

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
      'Kumaşınızı getirin veya atölye kataloğumuzdan seçin - size tam oturan, prova destekli dikim. Günlük, davetiye ve özel gün kıyafetleri için.',
    image: '/images/elbise-dikimi/red-dress.jpg',
    imageAlt: 'Özel dikim hayal telası elbise, deniz manzarası önünde',
    priceList: [
      { name: "Günlük Elbise (Özel Ölçü)", price: "800 TL'den başlar", note: "3-5 iş günü" },
      { name: "Davetiye / Abiye Elbise", price: "1.500 TL'den başlar", note: "Model detay" },
      { name: "Tulum / Takım Elbise", price: "1.200 TL'den başlar", note: "4-6 iş günü" },
      { name: "Gelinlik Dikimi", price: "Fiyat Teklifi", note: "Atölyede görüşme" },
    ],
  },
  {
    id: 'tadilat',
    eyebrow: 'Tam Oturan',
    title: 'Tadilat & Daraltma',
    description:
      'Mevcut kıyafetinizi vücudunuza tam oturtun. Bel, göğüs ve sırt daraltma; askı ve kol ayarı - her tadilat el işçiliğiyle tamamlanır.',
    image: '/images/elbise-dikimi/atelier-dress.jpg',
    imageAlt: 'Atölyede prova edilen bağcıklı beyaz keten elbise',
    priceList: [
      { name: "Bel daraltma", price: "180 TL'den başlar" },
      { name: "Göğüs / sırt daraltma", price: "220 TL'den başlar" },
      { name: "Askı kısaltma / ayar", price: "90 TL'den başlar" },
      { name: "Genel elbise tadilatı", price: "200 TL'den başlar", note: "İnceleme sonrası netleşir" },
    ],
  },
  {
    id: 'onarim',
    eyebrow: 'Hızlı Çözüm',
    title: 'Paça, Fermuar & Onarım',
    description:
      'Günlük giyimde en sık ihtiyaç duyduğunuz işlemler. Randevulu çalışarak çoğu işlem aynı gün veya ertesi gün teslim edilir.',
    image: '/images/elbise-dikimi/jumpsuit-tailor.jpg',
    imageAlt: 'Siyah keten tulum giyen kadın, liman manzarası önünde',
    priceList: [
      { name: "Paça kısaltma (pantolon/etek)", price: "150 TL'den başlar", note: "Aynı gün" },
      { name: "Fermuar değişimi", price: "120 TL'den başlar" },
      { name: "Yırtmaç / dikiş onarımı", price: "80 TL'den başlar" },
      { name: "Düğme, kopça, ilik tamiri", price: "40 TL/adet'ten başlar" },
    ],
  },
  {
    id: 'utu',
    eyebrow: 'Kusursuz Görünüm',
    title: 'Ütü & Son Bakım',
    description:
      'Özel günler ve iş kıyafetleri için profesyonel ütü ve buharlama. Kıyafetiniz teslim aldığınız gün giyime hazır olur.',
    image: '/images/elbise-dikimi/wrap-dress-stone.jpg',
    imageAlt: 'Taş duvar önünde keten model bej/taş elbise',
    priceList: [
      { name: "Elbise / Günlük Ceket", price: "60 TL/adet'ten başlar" },
      { name: "Takım Elbise (Alt/Üst)", price: "120 TL/adet'ten başlar" },
      { name: "Gelinlik / Abiye buharlama", price: "300 TL'den başlar" },
      { name: "Toplu ütü (5+ parça)", price: "Adet bazlı indirim" },
    ],
  },
]

const FAST_FACTS = [
  { label: 'Randevulu Çalışma', detail: 'Bekleme yok, zamanınız size ait' },
  { label: 'Şeffaf Fiyatlandırma', detail: 'Sürpriz ücret yok, önceden onay' },
  { label: 'Kalite Garantisi', detail: 'Atölye işçiliği, dikiş garantisi' },
  { label: 'Ön Değerlendirme (WP)', detail: 'Uygulamadan fotoğraf gönderin' },
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
        .nav-link:hover {
          text-decoration: underline;
        }

        /* Hero */
        .hero {
          background: linear-gradient(135deg, var(--ink) 0%, var(--ink-light) 70%, #3A2E20 100%);
          padding: 5rem 1.5rem 4.5rem;
          color: #fff;
        }
        .hero-container {
          max-width: 960px;
          margin: 0 auto;
        }
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
        .hero-eyebrow-line {
          width: 30px;
          height: 1px;
          background: var(--bronze);
        }
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
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.8;
          max-width: 680px;
          margin-bottom: 2.5rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
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
        .btn-primary:hover {
          background: var(--bronze-deep);
        }
        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          padding: 1rem 1.8rem;
          text-decoration: none;
          font-size: 0.85rem;
          border-radius: 4px;
          transition: border-color 0.2s;
        }
        .btn-secondary:hover {
          border-color: #fff;
        }

        /* Hızlı Bilgiler / Fact Grid */
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
        .fact-item {
          text-align: center;
        }
        .fact-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 0.5rem;
          font-family: var(--font-display);
        }
        .fact-detail {
          font-size: 0.8rem;
          color: var(--stone);
          line-height: 1.4;
        }

        /* Servisler / Hizmet Grupları */
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
        .service-group:nth-child(even) {
          direction: rtl;
        }
        .service-group:nth-child(even) > * {
          direction: ltr;
        }
        .service-image-wrapper {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          aspect-ratio: 4/5;
        }
        .service-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .service-content-, .service-content {
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

        /* Fiyat Listesi Tablosu */
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
        .price-name {
          font-weight: 500;
          color: var(--ink-light);
        }
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

        /* Süreç / Adımlar */
        .process-section {
          background: var(--ink);
          color: #fff;
          padding: 5rem 1.5rem;
        }
        .process-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .process-title-area {
          text-align: center;
          margin-bottom: 3rem;
        }
        .process-title {
          font-family: var(--font-display);
          font-size: 2.2rem;
          color: var(--champagne-dark);
          margin-bottom: 0.5rem;
        }
        .process-desc-top {
          color: var(--stone-light);
          font-size: 0.9rem;
        }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2.5rem;
        }
        .process-step {
          position: relative;
        }
        .step-num {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: var(--bronze);
          line-height: 1;
          margin-bottom: 0.8rem;
        }
        .step-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .step-desc {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }

        /* FAQ - SSS Alanı */
        .faq-section {
          padding: 5rem 1.5rem;
          background: #fff;
        }
        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
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
        .q-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.6rem;
        }
        .a-text {
          font-size: 0.95rem;
          color: var(--stone);
          line-height: 1.7;
        }

        /* CTA Alt Banner */
        .cta-banner {
          background: var(--bronze-deep);
          color: #fff;
          padding: 4rem 1.5rem;
          text-align: center;
        }
        .cta-inner {
          max-width: 750px;
          margin: 0 auto;
        }
        .cta-heading {
          font-family: var(--font-display);
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
        .cta-txt {
          font-size: 0.95rem;
          opacity: 0.9;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
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
        .btn-cta:hover {
          background: #fff;
          color: var(--bronze-deep);
        }

        /* Footer */
        .footer {
          background: #111;
          padding: 3rem 1.5rem;
          text-align: center;
          color: rgba(255,255,255,0.4);
          font-size: 0.8rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-links {
          margin-top: 0.5rem;
          color: rgba(255,255,255,0.2);
        }

        /* Mobil Optimizasyon */
        @media (max-width: 768px) {
          .service-group {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .service-group:nth-child(even) {
            direction: ltr;
          }
          .hero-title {
            font-size: 2.3rem;
          }
          .hero-title span {
            font-size: 1.6rem;
          }
        }
      `}</style>

      {/* Üst Yol (Breadcrumb) */}
      <nav className="nav">
        <a href="/" className="nav-link">SwapHubs</a>
        <span>›</span>
        <span style={{ color: 'var(--ink)' }}>Antalya Elbise Dikimi & Tadilat</span>
      </nav>

      {/* Ana Giriş (Hero) */}
      <header className="hero">
        <div className="hero-container">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            Terzi Can · Kişiye Özel Tasarım & Onarım
          </div>
          <h1 className="hero-title">
            Antalya Elbise Dikimi
            <span>& Profesyonel Tadilat Atölyesi</span>
          </h1>
          <p className="hero-desc">
            Konyaaltı'ndaki atölyemizde abiye, gelinlik ve günlük elbise dikimi hizmeti sunuyoruz. 
            Paça kısaltma, fermuar değişimi ve daraltma gibi tüm tadilat işleriniz özenle tamamlanır.
          </p>
          <div className="hero-actions">
            <a href={WA('Merhaba, Antalya elbise dikimi ve tadilatı için bilgi almak istiyorum.')}
               target="_blank" 
               rel="noopener noreferrer" 
               className="btn-primary">
              💬 WhatsApp'tan Randevu Al
            </a>
            <a href={`tel:${PHONE_E164}`} className="btn-secondary">
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      {/* Hızlı Bilgi Grid */}
      <section className="fact-section">
        <div className="fact-grid">
          {FAST_FACTS.map((f, i) => (
            <article className="fact-item" key={i}>
              <h3 className="fact-label">{f.label}</h3>
              <p className="fact-detail">{f.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Hizmet Grupları ve Fiyat Listeleri */}
      <section className="services-section">
        {SERVICES.map((srv) => (
          <article className="service-group" key={srv.id}>
            <div className="service-image-wrapper">
              <img src={srv.image} alt={srv.imageAlt} className="service-img" />
            </div>
            <div className="service-content">
              <div className="service-eyebrow">{srv.eyebrow}</div>
              <h2 className="service-title">{srv.title}</h2>
              <p className="service-desc">{srv.description}</p>
              
              {srv.priceList && srv.priceList.length > 0 && (
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
            </div>
          </article>
        ))}
      </section>

      {/* Süreç / Adım Alanı */}
      <section className="process-section">
        <div className="process-container">
          <div className="process-title-area">
            <h2 className="process-title">Nasıl Çalışıyoruz?</h2>
            <p className="process-desc-top">Dikiş ve tadilat süreciniz 4 adımda kusursuzca tamamlanır.</p>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-num">01</div>
              <h3 className="step-title">İletişim & Ön Değerlendirme</h3>
              <p className="step-desc">WhatsApp üzerinden kıyafetinizin görselini ve talebinizi paylaşın, fiyat ve süre bilgisi verelim.</p>
            </div>
            <div className="process-step">
              <div className="step-num">02</div>
              <h3 className="step-title">Randevu & Prova</h3>
              <p className="step-desc">Atölyemize uğrayıp üzerinize göre prova yapabiliriz veya kurye ile adresten teslimat sağlayabiliriz.</p>
            </div>
            <div className="process-step">
              <div className="step-num">03</div>
              <h3 className="step-title">Kusursuz İşçilik</h3>
              <p className="step-desc">Terzi Can güvencesiyle dikişiniz orijinal standartlara uygun olarak atölyemizde tamamlanır.</p>
            </div>
            <div className="process-step">
              <div className="step-num">04</div>
              <h3 className="step-title">Teslimat</h3>
              <p className="step-desc">İşlemi biten kıyafetinizi teslim alabilir veya adresinize kurye ile gönderilmesini sağlayabilirsiniz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SSS Alanı */}
      <section className="faq-section">
        <div className="faq-container">
          <header className="faq-header">
            <h2 className="faq-title">Sıkça Sorulan Sorular</h2>
            <p style={{ color: 'var(--stone)' }}>Merak ettiğiniz tüm detaylar</p>
          </header>
          
          <article className="faq-item">
            <h3 className="q-text">Antalya'da abiye veya elbise dikimi ne kadar sürer?</h3>
            <p className="a-text">Özel ölçü elbise ve kişiye özel abiye dikimleri modelin yapısına göre ortalama 3 ile 5 iş günü arasında sürmektedir.</p>
          </article>

          <article className="faq-item">
            <h3 className="q-text">Paça kısaltma ve fermuar değişimi ücreti nedir?</h3>
            <p className="a-text">Pantolon paça kısaltma ücreti 150 TL'den başlamaktadır. Fermuar ve diğer tadilatlar kumaşın yapısına göre netleşir.</p>
          </article>

          <article className="faq-item">
            <h3 className="q-text">Gelinlik ve abiye daraltma yapıyor musunuz?</h3>
            <p className="a-text">Evet, tüm özel gün kıyafetlerinin hassas tadilatlarını, bel daraltma ve boy ayarlarını profesyonel atölyemizde gerçekleştiriyoruz.</p>
          </article>
        </div>
      </section>

      {/* CTA Alt Bilgi */}
      <div className="cta-banner">
        <div className="cta-inner">
          <h2 className="cta-heading">Kıyafetlerinizi Tam Vücudunuza Göre Oturtalım</h2>
          <p className="cta-txt">
            Profesyonel dikiş, onarım, paça, fermuar ve ütü ihtiyaçlarınız için atölyemize uğrayabilir ya da destek alabilirsiniz.
          </p>
          <a href={WA('Merhaba, randevu almak istiyorum.')} target="_blank" rel="noopener noreferrer" className="btn-cta">
            Mesaj Gönder
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Terzi Can - Antalya Elbise Dikimi ve Terzilik Hizmetleri.</p>
        <p className="footer-links">Konyaaltı Terzi · Elbise Tamiratı · Paça Kısaltma · Fermuar Onarım Atölyesi</p>
      </footer>
    </div>
  )
}
