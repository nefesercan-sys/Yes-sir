// app/ru/atelie-antalya/client.tsx
'use client'

import { useEffect, useState } from 'react'

const PHONE_DISPLAY = '+90 531 898 64 18'
const PHONE_WA = '905318986418'
const waLink = (msg: string) => `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(msg)}`

type Props = {
  gmapsDirections: string
  gmapsPlaceLink: string
}

const SERVICES = [
  { icon: '🧵', title: 'Ремонт одежды', desc: 'Укорачивание и подгибка брюк, джинсов, юбок и платьев. Подгонка точно по фигуре.' },
  { icon: '⚡', title: 'Замена фурнитуры', desc: 'Замена молний, бегунков, пуговиц и заклёпок на куртках, джинсах и сумках.' },
  { icon: '✂️', title: 'Индивидуальный пошив', desc: 'Пошив одежды по вашим меркам — повседневные, вечерние и свадебные платья.' },
  { icon: '🧥', title: 'Кожа и плотные ткани', desc: 'Работаем с кожаными куртками, дублёнками, пальто и плотным деномом.' },
  { icon: '🏡', title: 'Домашний текстиль', desc: 'Пошив и подгонка штор, постельного белья, чехлов для подушек.' },
  { icon: '🚀', title: 'Срочный ремонт', desc: 'Нужно исправить вещь сегодня? Экспресс-ремонт в течение нескольких часов.' },
]

const STEPS = [
  { n: '1', title: 'Свяжитесь с нами', desc: 'Напишите в WhatsApp или позвоните. Опишите задачу — назовём цену и сроки.' },
  { n: '2', title: 'Принесите вещь', desc: 'Приезжайте в мастерскую в Коньяалты или согласуйте детали удалённо.' },
  { n: '3', title: 'Заберите готовое', desc: 'Работа выполняется строго в срок. Одежда будет сидеть идеально.' },
]

const FAQ_ITEMS = [
  { q: 'Где находится ателье?', a: 'Ателье Terzi Can находится в районе Коньяалты, квартал Хурма. Нажмите «Найти ателье на карте» для точного маршрута.' },
  { q: 'Как быстро выполняется ремонт?', a: 'Простые операции — укорачивание брюк, замена молнии — занимают от нескольких часов до одного дня. Срочный ремонт возможен день в день.' },
  { q: 'Говорите ли вы по-русски?', a: 'Да, вы можете оформить заказ и обсудить все детали на русском языке через WhatsApp — без переводчика.' },
  { q: 'Работаете ли вы с кожаными изделиями?', a: 'Да, у нас есть оборудование для кожаных курток, дублёнок, пальто и плотного денима.' },
]

export default function AtelieClient({ gmapsDirections, gmapsPlaceLink }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="page" lang="ru">
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
          --maps-blue: #1A73E8;
          --wa-green: #25D366;
          --font-display: 'Fraunces', Georgia, serif;
          --font-body: 'Inter', system-ui, -apple-system, sans-serif;
        }
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .page { background: var(--linen); color: var(--ink); font-family: var(--font-body); line-height: 1.6; -webkit-font-smoothing: antialiased; }

        /* ── NAV ── */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 60; display: flex; align-items: center; justify-content: space-between; padding: 20px 28px; transition: background .35s, padding .35s, box-shadow .35s; }
        .nav.scrolled { background: rgba(250,246,240,.94); backdrop-filter: blur(10px); padding: 13px 28px; box-shadow: 0 1px 0 rgba(28,43,41,.08); }
        .nav-mark { font-family: var(--font-display); font-size: 1.1rem; font-weight: 500; color: var(--ink); text-decoration: none; }

        /* ── HERO ── */
        .hero { position: relative; padding: 130px 28px 0; background: linear-gradient(160deg, var(--near-black), var(--ink) 65%); overflow: hidden; }
        .hero-inner { max-width: 900px; margin: 0 auto; text-align: center; padding-bottom: 64px; position: relative; z-index: 2; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(184,137,104,.12); border: 1px solid rgba(184,137,104,.35); color: var(--champagne); font-size: .72rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 7px 16px; border-radius: 20px; margin-bottom: 24px; }
        .hero-title { font-family: var(--font-display); font-weight: 400; font-size: clamp(1.9rem, 5vw, 3.2rem); line-height: 1.12; color: var(--linen); margin: 0 0 18px; }
        .hero-sub { font-size: 1rem; color: rgba(250,246,240,.78); max-width: 580px; margin: 0 auto 36px; }

        /* ── STICKY ACTION BAR ── */
        .actionbar-wrap { position: relative; z-index: 5; max-width: 880px; margin: 0 auto; padding: 0 20px; transform: translateY(38px); }
        .actionbar { background: #fff; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,.28); padding: 14px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .action-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; padding: 16px 12px; border-radius: 8px; text-decoration: none; transition: transform .15s, opacity .15s; text-align: center; }
        .action-btn:hover { transform: translateY(-2px); }
        .action-btn:active { transform: scale(.97); }
        .action-btn-main { font-size: .94rem; font-weight: 700; color: #fff; }
        .action-btn-sub { font-size: .68rem; opacity: .85; color: #fff; }
        .action-wa { background: var(--wa-green); }
        .action-maps { background: #DB4437; }
        .action-call { background: var(--near-black); }

        /* ── TRUST STRIP (below action bar) ── */
        .trust { background: var(--linen-deep); padding: 90px 28px 50px; }
        .trust-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; text-align: center; }
        .trust-item-label { font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
        .trust-item-detail { font-size: .76rem; color: var(--ink-soft); }

        /* ── SERVICES GRID ── */
        .services { max-width: 1080px; margin: 0 auto; padding: 90px 28px 30px; }
        .section-head { text-align: center; max-width: 600px; margin: 0 auto 50px; }
        .section-eyebrow { font-size: .76rem; letter-spacing: .14em; text-transform: uppercase; color: var(--bronze-deep); font-weight: 600; margin-bottom: 14px; }
        .section-title { font-family: var(--font-display); font-size: clamp(1.7rem, 3.6vw, 2.3rem); font-weight: 500; margin: 0 0 12px; line-height: 1.15; }
        .section-sub { font-size: .94rem; color: var(--ink-soft); }
        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(28,43,41,.08); }
        .svc-card { background: #fff; padding: 32px 26px; }
        .svc-icon { width: 42px; height: 42px; background: var(--linen-deep); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin-bottom: 18px; }
        .svc-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; margin: 0 0 8px; color: var(--ink); }
        .svc-desc { font-size: .85rem; color: var(--ink-soft); line-height: 1.6; }

        /* ── PRICES ── */
        .groups { max-width: 920px; margin: 0 auto; padding: 90px 28px 30px; }
        .group { background: #fff; border: 1px solid rgba(28,43,41,.08); margin-bottom: 24px; padding: 30px 32px; }
        .group-title { font-family: var(--font-display); font-size: 1.3rem; font-weight: 500; margin: 0 0 18px; }
        .price-list { border-top: 1px solid rgba(28,43,41,.1); }
        .price-row { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; padding: 13px 0; border-bottom: 1px solid rgba(28,43,41,.07); }
        .price-row:last-child { border-bottom: none; }
        .price-name { font-size: .92rem; color: var(--ink); font-weight: 500; }
        .price-note { display: block; font-size: .74rem; color: var(--sage); margin-top: 2px; }
        .price-value { font-weight: 600; font-size: .92rem; color: var(--bronze-deep); white-space: nowrap; }

        /* ── STEPS ── */
        .steps-section { background: var(--ink); padding: 90px 28px; }
        .steps-section .section-eyebrow { color: var(--bronze); }
        .steps-section .section-title { color: var(--linen); }
        .steps-section .section-sub { color: rgba(250,246,240,.6); }
        .steps-grid { max-width: 900px; margin: 50px auto 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; }
        .step-card { text-align: center; }
        .step-num { width: 44px; height: 44px; background: var(--bronze); color: var(--near-black); font-weight: 800; font-family: var(--font-display); font-size: 1.2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
        .step-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; color: var(--linen); margin: 0 0 10px; }
        .step-desc { font-size: .85rem; color: rgba(250,246,240,.62); line-height: 1.6; }

        /* ── FAQ ── */
        .faq { max-width: 720px; margin: 0 auto; padding: 90px 28px; }
        .faq-item { border-bottom: 1px solid rgba(28,43,41,.12); padding: 20px 0; }
        .faq-q { font-family: var(--font-display); font-size: 1.02rem; font-weight: 500; margin: 0 0 8px; }
        .faq-a { font-size: .9rem; color: var(--ink-soft); margin: 0; }

        /* ── LOCATION (dual card, koyu sol + harita sağ) ── */
        .location { background: var(--linen-deep); padding: 90px 28px; }
        .location-card { max-width: 1000px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 40px rgba(28,43,41,.08); display: grid; grid-template-columns: 5fr 7fr; }
        .location-info { background: var(--near-black); color: var(--linen); padding: 44px 38px; display: flex; flex-direction: column; justify-content: space-between; }
        .location-brand { font-family: var(--font-display); font-size: 1.6rem; font-weight: 600; color: var(--bronze); margin-bottom: 4px; }
        .location-brand-sub { font-size: .74rem; color: rgba(250,246,240,.5); margin-bottom: 28px; }
        .location-row { font-size: .88rem; color: rgba(250,246,240,.82); margin-bottom: 14px; line-height: 1.6; }
        .location-row strong { color: var(--linen); }
        .location-link { display: inline-flex; align-items: center; gap: 6px; color: var(--bronze); text-decoration: none; font-weight: 600; font-size: .88rem; margin-top: 20px; }
        .map-click { position: relative; min-height: 280px; background: linear-gradient(135deg, #e3ede4, #d3e2d6); display: flex; flex-direction: column; align-items: center; justify-content: center; text-decoration: none; padding: 24px; text-align: center; transition: filter .2s; }
        .map-click:hover { filter: brightness(.97); }
        .map-pin-circle { width: 52px; height: 52px; background: #DB4437; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 14px; box-shadow: 0 6px 18px rgba(219,68,55,.35); }
        .map-click-title { font-weight: 700; font-size: 1rem; color: var(--ink); margin-bottom: 6px; }
        .map-click-sub { font-size: .78rem; color: var(--ink-soft); max-width: 280px; }

        /* ── CTA ── */
        .cta { background: var(--near-black); color: var(--linen); padding: 90px 28px; text-align: center; }
        .cta-inner { max-width: 580px; margin: 0 auto; }
        .cta h2 { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 400; margin: 0 0 16px; }
        .cta p { color: rgba(250,246,240,.7); margin-bottom: 28px; }
        .btn-primary { display: inline-flex; align-items: center; gap: 9px; background: var(--bronze); color: var(--near-black); font-weight: 600; font-size: .9rem; padding: 14px 26px; border-radius: 6px; text-decoration: none; }

        .footer { padding: 30px 28px; text-align: center; font-size: .76rem; color: var(--sage); background: var(--near-black); border-top: 1px solid rgba(250,246,240,.08); }

        @media (max-width: 860px) {
          .actionbar { grid-template-columns: 1fr; }
          .trust-grid { grid-template-columns: repeat(2,1fr); gap: 24px; }
          .svc-grid { grid-template-columns: 1fr 1fr; }
          .steps-grid { grid-template-columns: 1fr; gap: 28px; }
          .location-card { grid-template-columns: 1fr; }
        }
        @media (max-width: 540px) {
          .hero-title { font-size: clamp(1.7rem, 7vw, 2.2rem); }
          .svc-grid { grid-template-columns: 1fr; }
        }
        a:focus-visible, button:focus-visible { outline: 2px solid var(--bronze); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Главная навигация">
        <a className="nav-mark" href="/terzi">Terzi Can</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-badge">✨ Профессиональное ателье в Коньяалты</span>
          <h1 className="hero-title">
            Качественный ремонт и пошив одежды в Анталии
          </h1>
          <p className="hero-sub">
            Мастерская <strong style={{ color: 'var(--champagne)' }}>Terzi Can</strong> предлагает
            быструю подгонку по фигуре, замену фурнитуры и индивидуальный
            пошив. Говорим по-русски — напишите нам прямо сейчас.
          </p>
        </div>

        {/* Sticky aksiyon çubuğu — yeni belgenin güçlü UX deseni */}
        <div className="actionbar-wrap">
          <div className="actionbar">
            <a
              className="action-btn action-wa"
              href={waLink('Здравствуйте! Хочу узнать об услугах ателье (ремонт/пошив).')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="action-btn-main">Написать в WhatsApp</span>
              <span className="action-btn-sub">Быстрый ответ и расчёт цены</span>
            </a>
            <a
              className="action-btn action-maps"
              href={gmapsDirections}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="action-btn-main">Открыть карту</span>
              <span className="action-btn-sub">Маршрут к Terzi Can</span>
            </a>
            <a className="action-btn action-call" href={`tel:+${PHONE_WA}`}>
              <span className="action-btn-main">Позвонить мастеру</span>
              <span className="action-btn-sub">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust" aria-label="Преимущества">
        <div className="trust-grid">
          <div>
            <div className="trust-item-label">Говорим по-русски</div>
            <div className="trust-item-detail">Без языкового барьера</div>
          </div>
          <div>
            <div className="trust-item-label">4.9 · 94 отзыва</div>
            <div className="trust-item-detail">Подтверждённые отзывы</div>
          </div>
          <div>
            <div className="trust-item-label">Срочный ремонт</div>
            <div className="trust-item-detail">Возможен день в день</div>
          </div>
          <div>
            <div className="trust-item-label">Коньяалты, Хурма</div>
            <div className="trust-item-detail">Рядом с пляжем</div>
          </div>
        </div>
      </section>

      {/* SERVICES — yeni belgenin 6 hizmet kartı yapısı */}
      <section className="services" aria-label="Услуги">
        <div className="section-head">
          <p className="section-eyebrow">Что мы предлагаем</p>
          <h2 className="section-title">Какие услуги мы предоставляем?</h2>
          <p className="section-sub">Широкий спектр швейных услуг для мужской, женской и детской одежды.</p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <article className="svc-card" key={s.title}>
              <div className="svc-icon" aria-hidden="true">{s.icon}</div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PRICES */}
      <section className="groups" id="prices" aria-label="Цены">
        <div className="section-head">
          <p className="section-eyebrow">Прозрачные цены</p>
          <h2 className="section-title">Цены на услуги</h2>
        </div>
        <article className="group">
          <h3 className="group-title">Ремонт и подгонка</h3>
          <div className="price-list">
            <div className="price-row"><span className="price-name">Укорачивание брюк / юбки<span className="price-note">в тот же день</span></span><span className="price-value">150 ₺</span></div>
            <div className="price-row"><span className="price-name">Замена молнии (брюки/куртка)</span><span className="price-value">от 120 ₺</span></div>
            <div className="price-row"><span className="price-name">Заужение по фигуре</span><span className="price-value">от 180 ₺</span></div>
            <div className="price-row"><span className="price-name">Ремонт кожаных изделий</span><span className="price-value">от 300 ₺</span></div>
            <div className="price-row"><span className="price-name">Ремонт разрыва / штопка</span><span className="price-value">от 90 ₺</span></div>
          </div>
        </article>
        <article className="group">
          <h3 className="group-title">Пошив и уход</h3>
          <div className="price-list">
            <div className="price-row"><span className="price-name">Повседневное платье (по меркам)<span className="price-note">3–5 дней</span></span><span className="price-value">от 800 ₺</span></div>
            <div className="price-row"><span className="price-name">Вечернее платье</span><span className="price-value">от 1400 ₺</span></div>
            <div className="price-row"><span className="price-name">Глажка / отпаривание</span><span className="price-value">от 60 ₺</span></div>
            <div className="price-row"><span className="price-name">Химчистка (за единицу)</span><span className="price-value">от 250 ₺</span></div>
          </div>
        </article>
      </section>

      {/* STEPS — yeni belgenin 3 adımlı akışı */}
      <section className="steps-section" aria-label="Как это работает">
        <div className="section-head">
          <p className="section-eyebrow">Как это работает</p>
          <h2 className="section-title">3 простых шага</h2>
          <p className="section-sub">Всего 3 шага для идеального вида вашей одежды.</p>
        </div>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div className="step-card" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" aria-label="Частые вопросы">
        <div className="section-head" style={{ marginBottom: 36 }}>
          <p className="section-eyebrow">Вопросы</p>
          <h2 className="section-title">Часто задаваемые вопросы</h2>
        </div>
        {FAQ_ITEMS.map((item) => (
          <div className="faq-item" key={item.q}>
            <h3 className="faq-q">{item.q}</h3>
            <p className="faq-a">{item.a}</p>
          </div>
        ))}
      </section>

      {/* LOCATION — yeni belgenin ikili kart yapısı (koyu sol panel + tıklanabilir harita) */}
      <section className="location" aria-label="Местоположение">
        <div className="section-head">
          <p className="section-eyebrow">Адрес</p>
          <h2 className="section-title">Найдите нас в Коньяалты</h2>
        </div>
        <div className="location-card">
          <div className="location-info">
            <div>
              <div className="location-brand">Terzi Can</div>
              <div className="location-brand-sub">Партнёр платформы SwapHubs</div>
              <div className="location-row"><strong>📍 Адрес:</strong> Hurma Mahallesi, Konyaaltı, Antalya</div>
              <div className="location-row"><strong>⏰ Режим работы:</strong> Пн–Сб, 09:00–19:00</div>
              <div className="location-row"><strong>📞 Телефон:</strong> {PHONE_DISPLAY}</div>
            </div>
            <a className="location-link" href={gmapsDirections} target="_blank" rel="noopener noreferrer">
              Открыть в Google Maps →
            </a>
          </div>
          <a
            className="map-click"
            href={gmapsPlaceLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Открыть точную геопозицию ателье в Google Maps"
          >
            <div className="map-pin-circle" aria-hidden="true">📍</div>
            <div className="map-click-title">Нажмите для просмотра карты</div>
            <div className="map-click-sub">Вы будете перенаправлены на точную геопозицию мастерской в Google Maps</div>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" aria-label="Связаться">
        <div className="cta-inner">
          <h2>Ваша одежда будет готова точно в срок</h2>
          <p>Напишите в WhatsApp, пришлите фото — узнайте цену за несколько минут.</p>
          <a className="btn-primary" href={waLink('Здравствуйте, хочу записаться на услугу ателье.')}>
            {PHONE_DISPLAY} — Написать в WhatsApp
          </a>
        </div>
      </section>

      <footer className="footer">
        Ателье Terzi Can · Коньяалты, Анталия · {PHONE_DISPLAY}
      </footer>
    </main>
  )
}
