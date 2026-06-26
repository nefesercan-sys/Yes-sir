// app/antalya-terzi-elbise-dikimi/client.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

const PHONE_DISPLAY = '+90 531 898 64 18'
const PHONE_WA = '905318986418'
const waLink = (msg: string) =>
  `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(msg)}`

type ServiceRow = { name: string; price: string; note?: string }
type ServiceGroup = {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  rows: ServiceRow[]
}

const GROUPS: ServiceGroup[] = [
  {
    id: 'dikim',
    eyebrow: 'Özel Ölçü',
    title: 'Elbise Dikimi',
    description:
      'Kumaşınızı getirin veya atölye kataloğumuzdan seçin — ölçünüze özel, prova destekli dikim. Günlük, davetiye ve özel gün kıyafetleri için.',
    image: '/images/elbise-dikimi/sea-dress.jpg',
    imageAlt: 'Özel dikim beyaz keten elbise, deniz manzarası önünde',
    rows: [
      { name: 'Günlük elbise (özel ölçü)', price: '800 TL\'den', note: '3-5 iş günü' },
      { name: 'Davetiye / abiye dikimi', price: '1.400 TL\'den', note: 'Prova dahil' },
      { name: 'Tulum / takım dikimi', price: '1.100 TL\'den', note: '4-6 iş günü' },
      { name: 'Gelinlik dikimi', price: 'Fiyat teklifi', note: 'Atölyede görüşme' },
    ],
  },
  {
    id: 'tadilat',
    eyebrow: 'Tam Oturum',
    title: 'Tadilat & Daraltma',
    description:
      'Mevcut kıyafetiniz vücudunuza tam otursun. Bel, göğüs ve sırt daraltma; askı ve kol ayarı — her tadilat el işçiliğiyle tamamlanır.',
    image: '/images/elbise-dikimi/atelier-dress.jpg',
    imageAlt: 'Atölyede prova edilen bağcıklı beyaz keten elbise',
    rows: [
      { name: 'Bel daraltma', price: '180 TL\'den' },
      { name: 'Göğüs / sırt daraltma', price: '220 TL\'den' },
      { name: 'Askı kısaltma / ayarı', price: '90 TL\'den' },
      { name: 'Genel elbise tadilatı', price: '200 TL\'den', note: 'İnceleme sonrası netleşir' },
    ],
  },
  {
    id: 'tamirat',
    eyebrow: 'Hızlı Çözüm',
    title: 'Paça, Fermuar & Tamirat',
    description:
      'Günlük giyimin en sık ihtiyaç duyduğu işler. Randevulu çalışırız; çoğu işlem aynı gün veya ertesi gün teslim edilir.',
    image: '/images/elbise-dikimi/jumpsuit-harbor.jpg',
    imageAlt: 'Beyaz keten tulum giyen kadın, liman manzarası önünde',
    rows: [
      { name: 'Paça kısaltma (pantolon/etek)', price: '150 TL\'den', note: 'Aynı gün' },
      { name: 'Fermuar değişimi', price: '120 TL\'den' },
      { name: 'Yırtık / söküğü onarımı', price: '90 TL\'den' },
      { name: 'Düğme, kopça, fitil tamiri', price: '60 TL\'den' },
    ],
  },
  {
    id: 'utu',
    eyebrow: 'Bitirme Hizmeti',
    title: 'Ütü & Son Bakım',
    description:
      'Özel günler ve iş kıyafetleri için profesyonel ütü ve buharlama. Kıyafetiniz teslim aldığınız gün giyime hazır olur.',
    image: '/images/elbise-dikimi/wrap-dress-stone.jpg',
    imageAlt: 'Taş duvar önünde sarma model beyaz elbise',
    rows: [
      { name: 'Elbise / gömlek ütüsü', price: '60 TL\'den' },
      { name: 'Takım elbise ütüsü', price: '120 TL\'den' },
      { name: 'Gelinlik / abiye buharlama', price: '250 TL\'den' },
      { name: 'Toplu ütü (5+ parça)', price: 'Adet bazlı indirim' },
    ],
  },
]

const TRUST_POINTS = [
  { label: 'Randevulu Çalışma', detail: 'Bekleme yok, zamanınız planlı' },
  { label: 'Şeffaf Fiyatlandırma', detail: 'Sürpriz ücret yok, önceden onay' },
  { label: 'Antalya Konyaaltı', detail: 'Kolay ulaşım, merkezi konum' },
  { label: '94 Değerlendirme · 4.9', detail: 'Doğrulanmış müşteri yorumları' },
]

function StitchDivider() {
  return (
    <div className="stitch-divider" aria-hidden="true">
      <svg width="100%" height="14" viewBox="0 0 600 14" preserveAspectRatio="none">
        <line x1="0" y1="7" x2="600" y2="7" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 8" />
      </svg>
    </div>
  )
}

export default function ElbiseDikimiClient() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="page">
      <style>{`
        :root {
          --linen: #FAF6F0;
          --linen-deep: #F0E9DD;
          --ink: #1C2B29;
          --ink-soft: #3A4744;
          --bronze: #B08968;
          --bronze-deep: #8C6B4F;
          --sage: #7A8B7F;
          --champagne: #D4C4A8;
          --near-black: #0F1B1A;
          --font-display: 'Fraunces', Georgia, serif;
          --font-body: 'Inter', system-ui, -apple-system, sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .page {
          background: var(--linen);
          color: var(--ink);
          font-family: var(--font-body);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        /* ---------- NAV ---------- */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 28px;
          transition: background 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease;
        }
        .nav.scrolled {
          background: rgba(250, 246, 240, 0.92);
          backdrop-filter: blur(10px);
          padding: 14px 28px;
          box-shadow: 0 1px 0 rgba(28, 43, 41, 0.08);
        }
        .nav-mark {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--ink);
          text-decoration: none;
        }
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--ink);
          color: var(--linen);
          font-size: 0.82rem;
          font-weight: 500;
          padding: 10px 18px;
          border-radius: 2px;
          text-decoration: none;
          transition: background 0.25s ease;
        }
        .nav-cta:hover { background: var(--near-black); }

        /* ---------- HERO ---------- */
        .hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
        }
        .hero-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(15, 27, 26, 0.05) 0%,
            rgba(15, 27, 26, 0.15) 55%,
            rgba(15, 27, 26, 0.78) 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0 28px 64px;
          color: var(--linen);
        }
        .hero-inner { max-width: 1180px; margin: 0 auto; }
        .hero-eyebrow {
          font-size: 0.78rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--champagne);
          margin-bottom: 18px;
          font-weight: 500;
        }
        .hero-title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(2.4rem, 6vw, 4.6rem);
          line-height: 1.04;
          letter-spacing: -0.01em;
          max-width: 820px;
          margin: 0 0 22px;
        }
        .hero-title em {
          font-style: italic;
          font-weight: 300;
          color: var(--champagne);
        }
        .hero-sub {
          font-size: 1.02rem;
          max-width: 480px;
          color: rgba(250, 246, 240, 0.86);
          margin-bottom: 32px;
        }
        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--bronze);
          color: var(--near-black);
          font-weight: 600;
          font-size: 0.92rem;
          padding: 14px 26px;
          border-radius: 2px;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .btn-primary:hover { background: var(--champagne); transform: translateY(-1px); }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(250, 246, 240, 0.45);
          color: var(--linen);
          font-weight: 500;
          font-size: 0.92rem;
          padding: 14px 26px;
          border-radius: 2px;
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .btn-secondary:hover { border-color: var(--linen); background: rgba(250,246,240,0.08); }

        /* ---------- STITCH DIVIDER ---------- */
        .stitch-divider {
          color: var(--bronze);
          opacity: 0.55;
          width: 100%;
          padding: 0 28px;
          max-width: 1180px;
          margin: 0 auto;
        }

        /* ---------- TRUST STRIP ---------- */
        .trust {
          background: var(--ink);
          color: var(--linen);
          padding: 30px 28px;
        }
        .trust-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .trust-item .trust-label {
          font-family: var(--font-display);
          font-size: 1.02rem;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .trust-item .trust-detail {
          font-size: 0.82rem;
          color: rgba(250, 246, 240, 0.66);
        }

        /* ---------- INTRO ---------- */
        .intro {
          max-width: 760px;
          margin: 0 auto;
          padding: 96px 28px 56px;
          text-align: center;
        }
        .intro-eyebrow {
          font-size: 0.78rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--bronze-deep);
          font-weight: 600;
          margin-bottom: 18px;
        }
        .intro-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 500;
          margin: 0 0 20px;
          line-height: 1.15;
        }
        .intro-text {
          font-size: 1.02rem;
          color: var(--ink-soft);
        }

        /* ---------- SERVICE GROUPS ---------- */
        .groups { max-width: 1180px; margin: 0 auto; padding: 0 28px 40px; }
        .group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin-bottom: 64px;
          background: #fff;
          border: 1px solid rgba(28, 43, 41, 0.08);
        }
        .group:nth-child(even) .group-media { order: 2; }
        .group-media {
          position: relative;
          min-height: 480px;
        }
        .group-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .group-body {
          padding: 52px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .group-eyebrow {
          font-size: 0.74rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--sage);
          font-weight: 600;
          margin-bottom: 14px;
        }
        .group-title {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 3vw, 2.1rem);
          font-weight: 500;
          margin: 0 0 14px;
          color: var(--ink);
        }
        .group-desc {
          font-size: 0.95rem;
          color: var(--ink-soft);
          margin-bottom: 28px;
          max-width: 420px;
        }
        .price-list { border-top: 1px solid rgba(28,43,41,0.1); }
        .price-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(28,43,41,0.08);
        }
        .price-row:last-child { border-bottom: none; }
        .price-name {
          font-size: 0.92rem;
          color: var(--ink);
          font-weight: 500;
        }
        .price-note {
          display: block;
          font-size: 0.76rem;
          color: var(--sage);
          margin-top: 2px;
          font-weight: 400;
        }
        .price-value {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--bronze-deep);
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }

        /* ---------- PROCESS ---------- */
        .process {
          background: var(--linen-deep);
          padding: 88px 28px;
        }
        .process-inner { max-width: 1180px; margin: 0 auto; }
        .process-head { text-align: center; max-width: 600px; margin: 0 auto 56px; }
        .process-head .intro-eyebrow { margin-bottom: 14px; }
        .process-head h2 {
          font-family: var(--font-display);
          font-size: clamp(1.7rem, 3.4vw, 2.3rem);
          font-weight: 500;
        }
        .process-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .process-step { position: relative; padding-top: 28px; }
        .process-step::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 36px; height: 1.5px;
          background: var(--bronze);
        }
        .step-label {
          font-size: 0.74rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--bronze-deep);
          font-weight: 600;
          margin-bottom: 10px;
        }
        .step-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .step-desc { font-size: 0.86rem; color: var(--ink-soft); }

        /* ---------- FAQ ---------- */
        .faq { max-width: 760px; margin: 0 auto; padding: 96px 28px; }
        .faq-head { text-align: center; margin-bottom: 48px; }
        .faq-head h2 {
          font-family: var(--font-display);
          font-size: clamp(1.7rem, 3.4vw, 2.3rem);
          font-weight: 500;
        }
        .faq-item {
          border-bottom: 1px solid rgba(28,43,41,0.12);
          padding: 22px 0;
        }
        .faq-q {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 500;
          margin: 0 0 10px;
        }
        .faq-a { font-size: 0.92rem; color: var(--ink-soft); margin: 0; }

        /* ---------- LOCATION / MAP ---------- */
        .location {
          background: var(--ink);
          color: var(--linen);
          padding: 88px 28px;
        }
        .location-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .location-info {}
        .location-eyebrow {
          font-size: 0.74rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--bronze);
          font-weight: 600;
          margin-bottom: 18px;
          display: block;
        }
        .location-title {
          font-family: var(--font-display);
          font-size: clamp(1.7rem, 3vw, 2.3rem);
          font-weight: 500;
          margin: 0 0 28px;
          line-height: 1.15;
        }
        .location-rows { display: flex; flex-direction: column; gap: 0; }
        .location-row {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 16px 0;
          border-bottom: 1px solid rgba(250,246,240,0.08);
        }
        .location-row:last-child { border-bottom: none; }
        .location-row-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .location-row-label {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--bronze);
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }
        .location-row-val {
          font-size: 0.92rem;
          color: rgba(250,246,240,0.88);
          line-height: 1.5;
        }
        .location-row-val a {
          color: rgba(250,246,240,0.88);
          text-decoration: none;
          transition: color 0.2s;
        }
        .location-row-val a:hover { color: var(--bronze); }
        .location-btns {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 28px;
        }
        .btn-map {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--bronze);
          color: var(--near-black);
          font-weight: 600;
          font-size: 0.88rem;
          padding: 13px 22px;
          border-radius: 2px;
          text-decoration: none;
          transition: background 0.25s, transform 0.2s;
          width: fit-content;
        }
        .btn-map:hover { background: var(--champagne); transform: translateY(-1px); }
        .btn-wa-loc {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #25D366;
          color: #fff;
          font-weight: 600;
          font-size: 0.88rem;
          padding: 13px 22px;
          border-radius: 2px;
          text-decoration: none;
          transition: background 0.25s, transform 0.2s;
          width: fit-content;
        }
        .btn-wa-loc:hover { background: #1eba56; transform: translateY(-1px); }

        /* MAP EMBED */
        .map-wrap {
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
          border: 1px solid rgba(250,246,240,0.08);
          height: 420px;
        }
        .map-wrap iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }
        /* Map placeholder shown before iframe loads */
        .map-placeholder {
          width: 100%;
          height: 100%;
          background: rgba(250,246,240,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: rgba(250,246,240,0.4);
          font-size: 0.85rem;
          font-family: var(--font-body);
        }

        /* ---------- CTA ---------- */
        .cta {
          background: var(--near-black);
          color: var(--linen);
          padding: 96px 28px;
          text-align: center;
        }
        .cta-inner { max-width: 600px; margin: 0 auto; }
        .cta h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.5vw, 2.8rem);
          font-weight: 400;
          margin: 0 0 18px;
        }
        .cta p { color: rgba(250,246,240,0.7); margin-bottom: 32px; font-size: 1rem; }
        .cta .btn-primary { margin: 0 auto; }

        /* ---------- FOOTER ---------- */
        .footer {
          padding: 32px 28px;
          text-align: center;
          font-size: 0.78rem;
          color: var(--sage);
          background: var(--near-black);
          border-top: 1px solid rgba(250,246,240,0.08);
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .footer-links a {
          color: rgba(250,246,240,0.3);
          text-decoration: none;
          font-size: 0.72rem;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--bronze); }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 860px) {
          .trust-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
          .group { grid-template-columns: 1fr; }
          .group:nth-child(even) .group-media { order: 0; }
          .group-media { min-height: 320px; }
          .group-body { padding: 36px 28px; }
          .process-steps { grid-template-columns: repeat(2, 1fr); }
          .location-inner { grid-template-columns: 1fr; gap: 40px; }
          .map-wrap { height: 300px; }
        }
        @media (max-width: 540px) {
          .hero-title { font-size: clamp(2rem, 9vw, 2.8rem); }
          .process-steps { grid-template-columns: 1fr; }
        }

        /* ---------- REDUCED MOTION / FOCUS ---------- */
        a:focus-visible, button:focus-visible {
          outline: 2px solid var(--bronze);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Ana navigasyon">
        <a className="nav-mark" href="/terzi">Terzi Can</a>
        <a className="nav-cta" href={waLink('Merhaba, elbise dikimi/tadilat için bilgi almak istiyorum.')}>
          WhatsApp&apos;tan Yazın
        </a>
      </nav>

      {/* HERO */}
      <div className="hero" ref={heroRef}>
        <img
          className="hero-img"
          src="/images/elbise-dikimi/hero-couple.jpg"
          alt="Antalya'da özel dikim beyaz keten kıyafetler giyen çift"
          width={1600}
          height={1067}
        />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-inner">
            <p className="hero-eyebrow">Antalya · Konyaaltı Atölyesi</p>
            <h1 className="hero-title">
              Elbiseniz tam size göre <em>dikilsin</em>, tam size göre otursun
            </h1>
            <p className="hero-sub">
              Elbise dikimi, tamirat, tadilat ve ütü — randevulu, şeffaf
              fiyatlı, profesyonel atölye hizmeti.
            </p>
            <div className="hero-actions">
              <a
                className="btn-primary"
                href={waLink('Merhaba, elbise dikimi/tadilat için randevu almak istiyorum.')}
              >
                Randevu Al
              </a>
              <a className="btn-secondary" href="#fiyatlar">
                Fiyat Listesini Gör
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST STRIP */}
      <section className="trust" aria-label="Güven noktaları">
        <div className="trust-grid">
          {TRUST_POINTS.map((t) => (
            <div className="trust-item" key={t.label}>
              <div className="trust-label">{t.label}</div>
              <div className="trust-detail">{t.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="intro">
        <p className="intro-eyebrow">Atölye Hakkında</p>
        <h2 className="intro-title">Her dikiş, ölçünüze sadık kalır</h2>
        <p className="intro-text">
          Terzi Can atölyesi, Antalya Konyaaltı&apos;da elbise dikimi ve
          kıyafet tadilatı üzerine uzmanlaşmıştır. Günlük giyimden özel gün
          kıyafetlerine kadar her parça, prova ve el işçiliğiyle tamamlanır.
          Fiyatlarımız net, randevularımız zamanında.
        </p>
      </section>

      <StitchDivider />

      {/* SERVICE GROUPS */}
      <section className="groups" id="fiyatlar" aria-labelledby="fiyatlar-h">
        <h2 id="fiyatlar-h" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
          Hizmetler ve Fiyatlar
        </h2>
        {GROUPS.map((group) => (
          <article className="group" key={group.id} id={group.id}>
            <div className="group-media">
              <img src={group.image} alt={group.imageAlt} loading="lazy" width={600} height={480} />
            </div>
            <div className="group-body">
              <p className="group-eyebrow">{group.eyebrow}</p>
              <h2 className="group-title">{group.title}</h2>
              <p className="group-desc">{group.description}</p>
              <div className="price-list">
                {group.rows.map((row) => (
                  <div className="price-row" key={row.name}>
                    <span className="price-name">
                      {row.name}
                      {row.note && <span className="price-note">{row.note}</span>}
                    </span>
                    <span className="price-value">{row.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* PROCESS */}
      <section className="process" aria-labelledby="process-h">
        <div className="process-inner">
          <div className="process-head">
            <p className="intro-eyebrow">Nasıl Çalışır</p>
            <h2 id="process-h">Randevudan teslime dört adım</h2>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <p className="step-label">Adım 1</p>
              <h3 className="step-title">WhatsApp&apos;tan Yazın</h3>
              <p className="step-desc">İhtiyacınızı ve kıyafetin fotoğrafını gönderin, ön fiyat alın.</p>
            </div>
            <div className="process-step">
              <p className="step-label">Adım 2</p>
              <h3 className="step-title">Randevu Belirleyin</h3>
              <p className="step-desc">Size uygun saatte atölyeye gelin, ölçü ve detayları netleştirelim.</p>
            </div>
            <div className="process-step">
              <p className="step-label">Adım 3</p>
              <h3 className="step-title">Dikim & Prova</h3>
              <p className="step-desc">Gerekirse ara prova ile kıyafetiniz tam ölçünüze işlenir.</p>
            </div>
            <div className="process-step">
              <p className="step-label">Adım 4</p>
              <h3 className="step-title">Teslim Alın</h3>
              <p className="step-desc">Ütülenmiş, giyime hazır kıyafetinizi teslim alın.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" aria-labelledby="faq-h">
        <div className="faq-head">
          <h2 id="faq-h">Sıkça Sorulan Sorular</h2>
        </div>
        <div className="faq-item">
          <h3 className="faq-q">Antalya&apos;da elbise dikimi ne kadar sürer?</h3>
          <p className="faq-a">
            Standart elbise dikimi 3-5 iş günü içinde tamamlanır. Acil
            siparişlerde aynı gün veya ertesi gün teslim mümkündür, lütfen
            randevu sırasında belirtin.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="faq-q">Paça kısaltma fiyatı ne kadar?</h3>
          <p className="faq-a">
            Paça kısaltma 150 TL&apos;den başlar. Kumaş tipine ve dikim
            şekline göre fiyat değişebilir. Kesin fiyat için WhatsApp&apos;tan
            fotoğraf gönderebilirsiniz.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="faq-q">Gelinlik tadilatı yapıyor musunuz?</h3>
          <p className="faq-a">
            Evet, gelinlik ve abiye tadilatında uzmanız. Bel daraltma, etek
            kısaltma, askı ayarı ve fermuar değişimi dahil tüm özel gün
            kıyafetlerine hizmet veriyoruz.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="faq-q">Randevu almadan gelebilir miyim?</h3>
          <p className="faq-a">
            Atölyemize randevusuz da uğrayabilirsiniz, ancak yoğun saatlerde
            bekleme süresini azaltmak için WhatsApp&apos;tan önceden randevu
            almanızı öneririz.
          </p>
        </div>
      </section>

      {/* ── KONUM & HARİTA ─────────────────────────────────────────────────── */}
      <section
        className="location"
        id="konum"
        aria-labelledby="location-h"
      >
        <div className="location-inner">

          {/* Sol — iletişim bilgileri */}
          <div className="location-info">
            <span className="location-eyebrow">Atölye Konumu</span>
            <h2 className="location-title" id="location-h">
              Konyaaltı, Antalya&apos;da<br />bizi bulun
            </h2>

            <div className="location-rows">
              <div className="location-row">
                <span className="location-row-icon" aria-hidden="true">📍</span>
                <div>
                  <span className="location-row-label">Adres</span>
                  <span className="location-row-val">
                    Hurma Mahallesi, Konyaaltı<br />Antalya, 07130
                  </span>
                </div>
              </div>

              <div className="location-row">
                <span className="location-row-icon" aria-hidden="true">📞</span>
                <div>
                  <span className="location-row-label">Telefon & WhatsApp</span>
                  <span className="location-row-val">
                    <a href={`tel:+${PHONE_WA}`}>{PHONE_DISPLAY}</a>
                  </span>
                </div>
              </div>

              <div className="location-row">
                <span className="location-row-icon" aria-hidden="true">🕐</span>
                <div>
                  <span className="location-row-label">Çalışma Saatleri</span>
                  <span className="location-row-val">
                    Pazartesi – Cumartesi<br />09:00 – 19:00
                  </span>
                </div>
              </div>

              <div className="location-row">
                <span className="location-row-icon" aria-hidden="true">🏘️</span>
                <div>
                  <span className="location-row-label">Hizmet Bölgeleri</span>
                  <span className="location-row-val">
                    Hurma · Liman · Uncalı · Gürsu<br />
                    Sarısu · Arapsuyu · Altınkum<br />
                    ve tüm Konyaaltı mahalleleri
                  </span>
                </div>
              </div>
            </div>

            <div className="location-btns">
              <a
                href="https://maps.app.goo.gl/CNZghczJNRQX3mLM9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-map"
                aria-label="Google Maps'te Terzi Can konumunu aç"
              >
                📍 Google Maps&apos;te Aç
              </a>
              <a
                href={waLink('Merhaba, atölyenize gelmek istiyorum. Adres tarifi alabilir miyim?')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-loc"
                aria-label="WhatsApp'tan yol tarifi iste"
              >
                💬 Yol Tarifi İste
              </a>
            </div>
          </div>

          {/* Sağ — Google Maps embed */}
          <div
            className="map-wrap"
            role="region"
            aria-label="Terzi Can Konyaaltı konum haritası"
          >
            {/*
              Terzi Can — Hurma Mahallesi, Konyaaltı, Antalya
              Place ID: ChIJZ0ySzpExwxQRoLgdJSJyVFk
              Google Maps Share: https://maps.app.goo.gl/CNZghczJNRQX3mLM9
            */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.8!2d30.6930!3d36.8851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39311e6924c67%3A0x59547225251db8a0!2sTERZ%C4%B0%20Can!5e0!3m2!1str!2str!4v1720000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Terzi Can Konyaaltı Antalya — Google Haritalar"
              aria-label="Terzi Can atölye konumu — Hurma Mahallesi, Konyaaltı, Antalya"
            />
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta" aria-label="İletişime geç">
        <div className="cta-inner">
          <h2>Kıyafetiniz hazır, randevunuz bir mesaj uzağınızda</h2>
          <p>WhatsApp&apos;tan yazın, fotoğraf gönderin, ön fiyatı hemen öğrenin.</p>
          <a
            className="btn-primary"
            href={waLink('Merhaba, elbise dikimi/tadilat için randevu almak istiyorum.')}
          >
            {PHONE_DISPLAY} — WhatsApp&apos;tan Yazın
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>Terzi Can Atölyesi · Konyaaltı, Antalya · {PHONE_DISPLAY}</div>
        <nav className="footer-links" aria-label="Footer bağlantılar">
          <a href="/terzi">Terzi Can Ana Sayfa</a>
          <a href="/online-terzi-hizmeti">Online Terzi Hizmeti</a>
          <a href="/antalya-bay-tailor-online-terzi-utu-hizmeti">Bay Tailor</a>
          <a href="https://maps.app.goo.gl/CNZghczJNRQX3mLM9" target="_blank" rel="noopener noreferrer">
            Google Haritalar
          </a>
        </nav>
      </footer>

    </main>
  )
}
