<!DOCTYPE html>
<html lang="tr" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SwapHubs Terzi | Online Terzi Hizmeti | Türkiye'nin Dijital Terzisi</title>
<meta name="description" content="SwapHubs Online Terzi - Türkiye'nin her köşesinden kişiye özel dikim, tasarım ve tekstil hizmeti. Ölçünüzü verin, hayalinizdeki kıyafet kapınıza gelsin.">
<meta name="keywords" content="online terzi, kişiye özel dikim, abiye dikim, takım elbise, online tailor Turkey, Maßschneiderei online, خياط أونلайн, онлайн портной">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Montserrat:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --gold: #C9A84C;
  --gold-light: #E8C97A;
  --dark: #0D0D0D;
  --charcoal: #1A1A1A;
  --cream: #FAF7F2;
  --warm-gray: #8A8278;
  --accent: #2E5D4B;
  --accent-light: #4A8A6F;
  --white: #FFFFFF;
  --border: rgba(201,168,76,0.25);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: 'Montserrat', sans-serif;
  background: var(--dark);
  color: var(--cream);
  overflow-x: hidden;
}

/* ── LANG SWITCHER ── */
.lang-bar {
  background: var(--charcoal);
  border-bottom: 1px solid var(--border);
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.lang-bar .logo-sm {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  color: var(--gold);
  letter-spacing: 2px;
}
.lang-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--warm-gray);
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 11px;
  font-family: 'Montserrat', sans-serif;
  margin-left: 6px;
  transition: all 0.3s;
  letter-spacing: 1px;
}
.lang-btn:hover, .lang-btn.active {
  background: var(--gold);
  color: var(--dark);
  border-color: var(--gold);
}
.lang-content { display: none; }
.lang-content.active { display: block; }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0D0D0D 0%, #1a1209 50%, #0D0D0D 100%);
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80') center/cover no-repeat;
  opacity: 0.18;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 40px 80px;
  position: relative;
  z-index: 2;
  align-items: center;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(201,168,76,0.15);
  border: 1px solid var(--gold);
  border-radius: 30px;
  padding: 6px 16px;
  font-size: 11px;
  color: var(--gold);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 28px;
  animation: fadeDown 1s ease both;
}
.hero-badge::before { content: '✦'; font-size: 10px; }

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(38px, 5vw, 72px);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 24px;
  animation: fadeUp 1s 0.2s ease both;
}
.hero-title .gold { color: var(--gold); font-style: italic; }
.hero-title .green { color: var(--accent-light); }

.hero-sub {
  font-size: 15px;
  line-height: 1.8;
  color: #b0ab9e;
  margin-bottom: 36px;
  max-width: 480px;
  animation: fadeUp 1s 0.4s ease both;
}
.hero-btns {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: fadeUp 1s 0.6s ease both;
}
.btn-gold {
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: var(--dark);
  padding: 14px 32px;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.3s, box-shadow 0.3s;
}
.btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(201,168,76,0.4); }
.btn-outline {
  background: transparent;
  color: var(--cream);
  padding: 14px 32px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s;
}
.btn-outline:hover { border-color: var(--gold); color: var(--gold); }

.hero-img-wrap {
  position: relative;
  animation: fadeLeft 1s 0.3s ease both;
}
.hero-img-wrap img {
  width: 100%;
  height: 560px;
  object-fit: cover;
  border-radius: 2px;
  filter: brightness(0.9) contrast(1.05);
}
.hero-img-wrap::before {
  content: '';
  position: absolute;
  inset: -12px -12px 12px 12px;
  border: 1px solid var(--gold);
  border-radius: 2px;
  z-index: -1;
  opacity: 0.5;
}
.hero-stat {
  position: absolute;
  bottom: -20px;
  left: -30px;
  background: var(--charcoal);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px 24px;
  text-align: center;
}
.hero-stat .num { font-family: 'Playfair Display', serif; font-size: 32px; color: var(--gold); }
.hero-stat .lbl { font-size: 10px; color: var(--warm-gray); letter-spacing: 1px; text-transform: uppercase; }

/* ── TRUST BAR ── */
.trust-bar {
  background: var(--charcoal);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #c0b9ae;
}
.trust-item .icon { color: var(--gold); font-size: 18px; }

/* ── SECTION COMMON ── */
.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 40px;
}
.sec-label {
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 16px;
}
.sec-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
}
.sec-desc {
  font-size: 15px;
  color: #9e9790;
  line-height: 1.9;
  max-width: 700px;
}

/* ── CATEGORIES GRID ── */
.cat-section { background: #111111; padding: 100px 0; }
.cat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 60px;
}
.cat-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  group: true;
  aspect-ratio: 3/4;
}
.cat-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease, filter 0.8s ease;
  filter: brightness(0.55) saturate(0.8);
}
.cat-card:hover img { transform: scale(1.08); filter: brightness(0.4) saturate(0.6); }
.cat-card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px 28px;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%);
  transition: background 0.5s;
}
.cat-tag {
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}
.cat-name {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.2;
}
.cat-desc {
  font-size: 12px;
  color: #c0b9ae;
  line-height: 1.7;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}
.cat-card:hover .cat-desc { max-height: 120px; }
.cat-kw {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}
.cat-card:hover .cat-kw { max-height: 60px; }
.kw-pill {
  font-size: 9px;
  letter-spacing: 1px;
  color: var(--gold);
  border: 1px solid rgba(201,168,76,0.4);
  border-radius: 20px;
  padding: 3px 10px;
  text-transform: uppercase;
}
.cat-btn {
  display: inline-block;
  margin-top: 16px;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--cream);
  text-decoration: none;
  border-bottom: 1px solid var(--gold);
  padding-bottom: 2px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}
.cat-card:hover .cat-btn { max-height: 40px; }

/* FEATURED CARD (wide) */
.cat-card.wide { grid-column: span 2; aspect-ratio: auto; min-height: 400px; }
.cat-card.tall { aspect-ratio: 2/3; }

/* ── PROCESS ── */
.process-section { padding: 100px 0; background: linear-gradient(180deg, #0D0D0D, #111111); }
.process-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  margin-top: 60px;
}
.step {
  background: var(--charcoal);
  padding: 40px 30px;
  border-top: 2px solid var(--border);
  transition: border-color 0.3s;
}
.step:hover { border-color: var(--gold); }
.step-num {
  font-family: 'Playfair Display', serif;
  font-size: 56px;
  color: rgba(201,168,76,0.2);
  line-height: 1;
  margin-bottom: 20px;
}
.step-icon { font-size: 28px; margin-bottom: 16px; }
.step-title { font-size: 16px; font-weight: 700; margin-bottom: 12px; color: var(--cream); }
.step-text { font-size: 13px; color: var(--warm-gray); line-height: 1.7; }

/* ── FABRICS ── */
.fabrics-section { background: #111; padding: 100px 0; }
.fabric-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 60px;
}
.fabric-card {
  border: 1px solid var(--border);
  padding: 28px 24px;
  transition: border-color 0.3s, transform 0.3s;
  cursor: pointer;
}
.fabric-card:hover { border-color: var(--gold); transform: translateY(-4px); }
.fabric-swatch {
  width: 100%;
  height: 120px;
  border-radius: 2px;
  margin-bottom: 20px;
  background-size: cover;
  background-position: center;
}
.fabric-name { font-family: 'Playfair Display', serif; font-size: 18px; margin-bottom: 8px; }
.fabric-detail { font-size: 11px; color: var(--warm-gray); line-height: 1.7; }
.fabric-price { font-size: 12px; color: var(--gold); margin-top: 12px; }

/* ── TESTIMONIALS ── */
.testi-section { padding: 100px 0; background: var(--dark); }
.testi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 60px;
}
.testi-card {
  background: var(--charcoal);
  border: 1px solid var(--border);
  padding: 36px 30px;
  position: relative;
}
.testi-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: 64px;
  color: var(--gold);
  opacity: 0.3;
  line-height: 0.5;
  margin-bottom: 16px;
}
.testi-text { font-size: 14px; color: #c0b9ae; line-height: 1.8; margin-bottom: 24px; font-style: italic; }
.testi-author { display: flex; align-items: center; gap: 14px; }
.testi-avatar {
  width: 46px; height: 46px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--gold);
}
.testi-name { font-size: 13px; font-weight: 700; }
.testi-loc { font-size: 11px; color: var(--warm-gray); }
.stars { color: var(--gold); font-size: 12px; margin-bottom: 4px; }

/* ── CTA ── */
.cta-section {
  background: linear-gradient(135deg, var(--accent) 0%, #1d3d2e 100%);
  padding: 100px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-section::before {
  content: '✦';
  position: absolute;
  font-size: 300px;
  color: rgba(255,255,255,0.03);
  top: -50px; right: -50px;
}
.cta-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 5vw, 64px);
  margin-bottom: 24px;
  line-height: 1.2;
}
.cta-sub { font-size: 16px; color: rgba(255,255,255,0.75); margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
.cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

/* ── WHATSAPP ── */
.wa-float {
  position: fixed;
  bottom: 30px; right: 30px;
  background: #25D366;
  color: white;
  width: 60px; height: 60px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
  box-shadow: 0 8px 30px rgba(37,211,102,0.5);
  z-index: 9999;
  text-decoration: none;
  transition: transform 0.3s;
}
.wa-float:hover { transform: scale(1.1); }

/* ── FOOTER ── */
footer {
  background: #080808;
  border-top: 1px solid var(--border);
  padding: 60px 40px 30px;
}
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; max-width: 1200px; margin: 0 auto 40px; }
.footer-logo { font-family: 'Playfair Display', serif; font-size: 28px; color: var(--gold); margin-bottom: 16px; }
.footer-desc { font-size: 13px; color: var(--warm-gray); line-height: 1.8; }
.footer-h { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--cream); margin-bottom: 20px; }
.footer-links { list-style: none; }
.footer-links li { margin-bottom: 10px; }
.footer-links a { font-size: 13px; color: var(--warm-gray); text-decoration: none; transition: color 0.3s; }
.footer-links a:hover { color: var(--gold); }
.footer-bottom { border-top: 1px solid var(--border); padding-top: 24px; text-align: center; font-size: 11px; color: var(--warm-gray); max-width: 1200px; margin: 0 auto; }

/* ── SLOGAN MARQUEE ── */
.marquee-section {
  background: var(--gold);
  padding: 14px 0;
  overflow: hidden;
  white-space: nowrap;
}
.marquee-inner {
  display: inline-block;
  animation: marquee 30s linear infinite;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--dark);
}
.marquee-inner span { margin: 0 30px; }
.marquee-inner .sep { opacity: 0.4; }

@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeLeft { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }

/* ── RTL FOR ARABIC ── */
[dir="rtl"] { font-family: 'Montserrat', sans-serif; }
[dir="rtl"] .hero-grid { direction: rtl; }
[dir="rtl"] .hero-img-wrap::before { right: -12px; left: 12px; }
[dir="rtl"] .hero-stat { right: -30px; left: auto; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; }
  .hero-img-wrap { display: none; }
  .cat-grid { grid-template-columns: 1fr 1fr; }
  .cat-card.wide { grid-column: span 2; }
  .steps { grid-template-columns: 1fr 1fr; }
  .fabric-grid { grid-template-columns: 1fr 1fr; }
  .testi-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .cat-grid { grid-template-columns: 1fr; }
  .cat-card.wide { grid-column: span 1; }
  .steps { grid-template-columns: 1fr; }
  .fabric-grid { grid-template-columns: 1fr; }
  .trust-bar { gap: 20px; }
  .hero-btns { flex-direction: column; }
  .footer-grid { grid-template-columns: 1fr; }
  .section, .process-inner { padding-left: 20px; padding-right: 20px; }
}
</style>
</head>
<body>

<!-- LANG BAR -->
<div class="lang-bar">
  <span class="logo-sm">SwapHubs ✦ Terzi</span>
  <div>
    <button class="lang-btn active" onclick="setLang('tr')">TR</button>
    <button class="lang-btn" onclick="setLang('en')">EN</button>
    <button class="lang-btn" onclick="setLang('de')">DE</button>
    <button class="lang-btn" onclick="setLang('ar')">عر</button>
    <button class="lang-btn" onclick="setLang('ru')">РУ</button>
  </div>
</div>

<!-- MARQUEE -->
<div class="marquee-section">
  <div class="marquee-inner">
    <span>TERZİNİZ BİR TIK YAKININDA</span><span class="sep">✦</span>
    <span>YOUR TAILOR IS ONE CLICK AWAY</span><span class="sep">✦</span>
    <span>IHR SCHNEIDER IST NUR EINEN KLICK ENTFERNT</span><span class="sep">✦</span>
    <span>خياطك على بُعد نقرة واحدة</span><span class="sep">✦</span>
    <span>ВАШ ПОРТНОЙ В ОДНОМ КЛИКЕ</span><span class="sep">✦</span>
    <span>TERZİNİZ BİR TIK YAKININDA</span><span class="sep">✦</span>
    <span>YOUR TAILOR IS ONE CLICK AWAY</span><span class="sep">✦</span>
    <span>IHR SCHNEIDER IST NUR EINEN KLICK ENTFERNT</span><span class="sep">✦</span>
    <span>خياطك على بُعد نقرة واحدة</span><span class="sep">✦</span>
    <span>ВАШ ПОРТНОЙ В ОДНОМ КЛИКЕ</span><span class="sep">✦</span>
  </div>
</div>

<!-- ═══════════ TURKISH ═══════════ -->
<div id="lang-tr" class="lang-content active">

  <!-- HERO -->
  <section class="hero">
    <div class="hero-grid">
      <div class="hero-text">
        <div class="hero-badge">Yeni Nesil Dijital Terzi · Türkiye Geneli</div>
        <h1 class="hero-title">
          Hayalinizdeki Kıyafet<br>
          <span class="gold">Sadece Size Özel</span><br>
          <span class="green">Kapınıza Gelsin</span>
        </h1>
        <p class="hero-sub">
          Türkiye'nin her köşesinde, evinizin konforundan ayrılmadan — ölçünüzü verin, biz tasarlayalım, biçelim, dikelim. Abiye'den takım elbiseye, üniformadan gece davet kıyafetine; her ihtiyacınız için kişiye özel çözüm.
        </p>
        <div class="hero-btns">
          <a href="https://wa.me/90XXXXXXXXXX" class="btn-gold">📐 Ölçü Gönder & Sipariş Ver</a>
          <a href="#kategoriler" class="btn-outline">Koleksiyonu İncele →</a>
        </div>
      </div>
      <div class="hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=85" alt="Online Terzi Model">
        <div class="hero-stat">
          <div class="num">4.800+</div>
          <div class="lbl">Mutlu Müşteri</div>
        </div>
      </div>
    </div>
  </section>

  <!-- TRUST -->
  <div class="trust-bar">
    <div class="trust-item"><span class="icon">✓</span> Türkiye Geneli Teslimat</div>
    <div class="trust-item"><span class="icon">✓</span> %100 Kişiye Özel Dikim</div>
    <div class="trust-item"><span class="icon">✓</span> Ücretsiz Revizyon</div>
    <div class="trust-item"><span class="icon">✓</span> 4 Dilde Hizmet</div>
    <div class="trust-item"><span class="icon">✓</span> Premium Kumaş Garantisi</div>
  </div>

  <!-- CATEGORIES -->
  <section class="cat-section" id="kategoriler">
    <div class="section" style="padding-bottom:0">
      <div class="sec-label">Koleksiyonlarımız</div>
      <h2 class="sec-title">Her Stiliniz İçin<br>Özel Tasarım</h2>
      <p class="sec-desc">Abiyeden takım elbiseye, spor giyimden üniformaya kadar tüm giyim kategorilerinde kişiye özel dikim ve tasarım hizmeti sunuyoruz.</p>
    </div>
    <div style="max-width:1200px;margin:0 auto;padding:40px 40px 0">
    <div class="cat-grid">

      <!-- ABİYE -->
      <div class="cat-card tall">
        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80" alt="Abiye Modeli">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Özel Tasarım</div>
          <div class="cat-name">Abiye & Gece Kıyafetleri</div>
          <div class="cat-desc">Düğün, nişan, mezuniyet, balo ve tüm özel geceleriniz için sizin bedeninize, stilinize, hayalinize özel abiye tasarımları. Dantel, organza, ipek ve kadife kumaş seçenekleri.</div>
          <div class="cat-kw">
            <span class="kw-pill">Düğün Abiyesi</span>
            <span class="kw-pill">Mezuniyet Elbisesi</span>
            <span class="kw-pill">Balık Abiye</span>
            <span class="kw-pill">Prenses Elbise</span>
          </div>
          <a href="#" class="cat-btn">Tasarım İste →</a>
        </div>
      </div>

      <!-- TAKIM ELBİSE -->
      <div class="cat-card wide" style="aspect-ratio:auto;min-height:380px">
        <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80" alt="Takım Elbise">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ İş & Prestij</div>
          <div class="cat-name">Takım Elbise & İş Kıyafeti</div>
          <div class="cat-desc">Erkek ve kadın takım elbise, blazer, smokin, setre takım. Kumaş seçiminden kesim detaylarına kadar tamamen size özel. Yurt içi ve uluslararası iş toplantıları için mükemmel görünüm.</div>
          <div class="cat-kw">
            <span class="kw-pill">Erkek Takım</span>
            <span class="kw-pill">Kadın Blazer</span>
            <span class="kw-pill">Smokin</span>
            <span class="kw-pill">İş Kıyafeti</span>
          </div>
          <a href="#" class="cat-btn">Ölçü Gönder →</a>
        </div>
      </div>

      <!-- SPOR GİYİM -->
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80" alt="Spor Giyim">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Aktif Yaşam</div>
          <div class="cat-name">Spor & Aktif Giyim</div>
          <div class="cat-desc">Kişiye özel spor kıyafetleri, eşofman takımları, spor formalar ve aktif yaşam kıyafetleri. Yüksek performans kumaşlarıyla rahat hareket.</div>
          <div class="cat-kw">
            <span class="kw-pill">Forma</span>
            <span class="kw-pill">Eşofman</span>
            <span class="kw-pill">Spor Set</span>
          </div>
          <a href="#" class="cat-btn">Keşfet →</a>
        </div>
      </div>

      <!-- ÜNİFORMA -->
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80" alt="Üniforma">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Kurumsal</div>
          <div class="cat-name">Üniforma & Kurumsal Giyim</div>
          <div class="cat-desc">Oteller, restoranlar, hastaneler, okullar ve işletmeler için logolu, markaya özel üniforma üretimi. Minimum sipariş esnekliği.</div>
          <div class="cat-kw">
            <span class="kw-pill">Otel Üniforma</span>
            <span class="kw-pill">Okul Kıyafeti</span>
            <span class="kw-pill">Kurumsal Set</span>
          </div>
          <a href="#" class="cat-btn">Teklif Al →</a>
        </div>
      </div>

      <!-- GECE DAVET -->
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" alt="Gece Davet">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Özel Gece</div>
          <div class="cat-name">Gece & Davet Kıyafetleri</div>
          <div class="cat-desc">Kokteyl elbiseleri, gala geceleri, resmi davranışlar ve özel davetler için şık ve modern tasarımlar. Payetli, kadife ve saten seçenekleri.</div>
          <div class="cat-kw">
            <span class="kw-pill">Kokteyl Elbise</span>
            <span class="kw-pill">Gala Kıyafeti</span>
            <span class="kw-pill">Davet Elbisesi</span>
          </div>
          <a href="#" class="cat-btn">Sipariş Ver →</a>
        </div>
      </div>

      <!-- GÜNLÜK GİYİM -->
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1485231183945-fffde7f9b68b?w=600&q=80" alt="Günlük Giyim">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Her Gün</div>
          <div class="cat-name">Günlük & Casual Giyim</div>
          <div class="cat-desc">Günlük yaşamın konforunu kişiye özel kesimlerle buluşturan koleksiyon. Elbiseler, bluzlar, pantolonlar ve kombinler.</div>
          <div class="cat-kw">
            <span class="kw-pill">Günlük Elbise</span>
            <span class="kw-pill">Keten Pantolon</span>
            <span class="kw-pill">Casual Set</span>
          </div>
          <a href="#" class="cat-btn">İncele →</a>
        </div>
      </div>

    </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="process-section">
    <div class="process-inner">
      <div class="sec-label">Nasıl Çalışır</div>
      <h2 class="sec-title">4 Adımda<br>Hayalinizdeki Kıyafet</h2>
      <div class="steps">
        <div class="step">
          <div class="step-num">01</div>
          <div class="step-icon">📐</div>
          <div class="step-title">Ölçünüzü Gönderin</div>
          <div class="step-text">WhatsApp veya web formu üzerinden vücut ölçülerinizi, model tercihlerinizi ve varsa referans görselleri paylaşın.</div>
        </div>
        <div class="step">
          <div class="step-num">02</div>
          <div class="step-icon">🎨</div>
          <div class="step-title">Tasarım & Kumaş Seçimi</div>
          <div class="step-text">Uzman tasarımcılarımız size özel model önerileri sunar. Premium kumaş koleksiyonumuzdan seçim yapın.</div>
        </div>
        <div class="step">
          <div class="step-num">03</div>
          <div class="step-icon">✂️</div>
          <div class="step-title">Kişiye Özel Dikim</div>
          <div class="step-text">Usta terzilerimiz sadece sizin bedeninize özel kalıp çıkarır ve titizlikle diker. Her dikiş mükemmeliyetle yapılır.</div>
        </div>
        <div class="step">
          <div class="step-num">04</div>
          <div class="step-icon">🚚</div>
          <div class="step-title">Kapınıza Teslimat</div>
          <div class="step-text">Türkiye'nin her iline hızlı ve güvenli teslimat. Beğenmezseniz ücretsiz revizyon garantisi.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FABRICS -->
  <section class="fabrics-section">
    <div class="section">
      <div class="sec-label">Kumaş Koleksiyonu</div>
      <h2 class="sec-title">Premium Kumaşlar,<br>Sonsuz Kombinler</h2>
      <div class="fabric-grid">
        <div class="fabric-card">
          <div class="fabric-swatch" style="background:linear-gradient(135deg,#2d1b69,#9b59b6)"></div>
          <div class="fabric-name">İpek Saten</div>
          <div class="fabric-detail">Abiye ve gece kıyafetleri için ideal. Pürüzsüz dokusu ve ışıltısıyla şıklığı zirvede tutar.</div>
          <div class="fabric-price">✦ Premium Koleksiyon</div>
        </div>
        <div class="fabric-card">
          <div class="fabric-swatch" style="background:linear-gradient(135deg,#1a3a2a,#2e8b57)"></div>
          <div class="fabric-name">Yün & Kaşmir</div>
          <div class="fabric-detail">Takım elbise ve kış kıyafetleri için kaliteli yün ve kaşmir karışımları. Sıcaklık ve zarifliği bir arada sunar.</div>
          <div class="fabric-price">✦ Lüks Koleksiyon</div>
        </div>
        <div class="fabric-card">
          <div class="fabric-swatch" style="background:linear-gradient(135deg,#c9a84c,#f5dfa5)"></div>
          <div class="fabric-name">Dantel & Organza</div>
          <div class="fabric-detail">Gelinlik ve abiye için vazgeçilmez. Fransız danteli, İtalyan organzası ve Türk brügürleri.</div>
          <div class="fabric-price">✦ Atölye Koleksiyonu</div>
        </div>
        <div class="fabric-card">
          <div class="fabric-swatch" style="background:linear-gradient(135deg,#3a2a1a,#8b6347)"></div>
          <div class="fabric-name">Keten & Pamuk</div>
          <div class="fabric-detail">Günlük ve spor giyim için nefes alan, doğal dokulu kumaşlar. Her mevsim konfor.</div>
          <div class="fabric-price">✦ Doğal Koleksiyon</div>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="testi-section">
    <div class="section">
      <div class="sec-label">Müşteri Yorumları</div>
      <h2 class="sec-title">Onlar Anlatsın</h2>
      <div class="testi-grid">
        <div class="testi-card">
          <div class="testi-quote">"</div>
          <div class="stars">★★★★★</div>
          <div class="testi-text">İstanbul'dan ölçülerimi WhatsApp üzerinden gönderdim. 10 gün sonra nişan elbisem kapımdaydı. Tam bedenime oturdu, hiç böyle bir hizmet görmedim!</div>
          <div class="testi-author">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80" alt="Müşteri" class="testi-avatar">
            <div>
              <div class="testi-name">Ayşe K.</div>
              <div class="testi-loc">İstanbul</div>
            </div>
          </div>
        </div>
        <div class="testi-card">
          <div class="testi-quote">"</div>
          <div class="stars">★★★★★</div>
          <div class="testi-text">Şirketimiz için 50 kişilik üniforma siparişi verdik. Kalite mükemmeldi, teslim süresi çok hızlıydı. Kesinlikle tekrar çalışacağız.</div>
          <div class="testi-author">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Müşteri" class="testi-avatar">
            <div>
              <div class="testi-name">Mehmet Y.</div>
              <div class="testi-loc">Ankara</div>
            </div>
          </div>
        </div>
        <div class="testi-card">
          <div class="testi-quote">"</div>
          <div class="stars">★★★★★</div>
          <div class="testi-text">Düğünüm için hem gelinlik hem damatlık yaptırdık. Fiyat/kalite oranı inanılmazdı. Tüm misafirlerimiz beğendi.</div>
          <div class="testi-author">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="Müşteri" class="testi-avatar">
            <div>
              <div class="testi-name">Zeynep & Ali</div>
              <div class="testi-loc">İzmir</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <div class="sec-label" style="color:rgba(255,255,255,0.6)">Hemen Başlayın</div>
    <h2 class="cta-title">Hayalinizdeki Kıyafeti<br>Şimdi Tasarlayın</h2>
    <p class="cta-sub">Türkiye'nin neresinde olursanız olun — ölçülerinizi verin, biz gerisini halledelim. Terziniz artık bir tık uzağınızda.</p>
    <div class="cta-btns">
      <a href="https://wa.me/90XXXXXXXXXX" class="btn-gold">💬 WhatsApp'tan Yazın</a>
      <a href="#" class="btn-outline" style="border-color:rgba(255,255,255,0.4);color:#fff">📧 E-posta Gönderin</a>
    </div>
  </section>

</div><!-- /lang-tr -->


<!-- ═══════════ ENGLISH ═══════════ -->
<div id="lang-en" class="lang-content">

  <section class="hero">
    <div class="hero-grid">
      <div class="hero-text">
        <div class="hero-badge">Next-Gen Online Tailor · All Across Turkey</div>
        <h1 class="hero-title">
          Your Dream Outfit,<br>
          <span class="gold">Made Exclusively</span><br>
          <span class="green">For You</span>
        </h1>
        <p class="hero-sub">
          Custom tailoring from anywhere in Turkey — share your measurements, choose your style, and receive your perfect garment at your door. Evening gowns, suits, uniforms, sportswear and more.
        </p>
        <div class="hero-btns">
          <a href="https://wa.me/90XXXXXXXXXX" class="btn-gold">📐 Send Measurements & Order</a>
          <a href="#en-cats" class="btn-outline">Explore Collections →</a>
        </div>
      </div>
      <div class="hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=85" alt="Online Tailor Model">
        <div class="hero-stat">
          <div class="num">4,800+</div>
          <div class="lbl">Happy Clients</div>
        </div>
      </div>
    </div>
  </section>

  <div class="trust-bar">
    <div class="trust-item"><span class="icon">✓</span> Nationwide Delivery Across Turkey</div>
    <div class="trust-item"><span class="icon">✓</span> 100% Custom-Made</div>
    <div class="trust-item"><span class="icon">✓</span> Free Revision Guarantee</div>
    <div class="trust-item"><span class="icon">✓</span> Service in 4 Languages</div>
    <div class="trust-item"><span class="icon">✓</span> Premium Fabric Quality</div>
  </div>

  <section class="cat-section" id="en-cats">
    <div class="section" style="padding-bottom:0">
      <div class="sec-label">Our Collections</div>
      <h2 class="sec-title">Custom Design<br>For Every Style</h2>
      <p class="sec-desc">From evening gowns to business suits, sportswear to uniforms — bespoke tailoring and design for every occasion, delivered to your door.</p>
    </div>
    <div style="max-width:1200px;margin:0 auto;padding:40px 40px 0">
    <div class="cat-grid">
      <div class="cat-card tall">
        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80" alt="Evening Gown">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Bespoke Design</div>
          <div class="cat-name">Evening Gowns & Formal</div>
          <div class="cat-desc">Weddings, engagements, galas, proms and all your special evenings — gowns crafted exclusively to your body, style and vision. Lace, organza, silk and velvet options.</div>
          <div class="cat-kw"><span class="kw-pill">Wedding Gown</span><span class="kw-pill">Prom Dress</span><span class="kw-pill">Mermaid Gown</span></div>
          <a href="#" class="cat-btn">Request Design →</a>
        </div>
      </div>
      <div class="cat-card wide" style="aspect-ratio:auto;min-height:380px">
        <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80" alt="Suit">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Business & Prestige</div>
          <div class="cat-name">Suits & Business Attire</div>
          <div class="cat-desc">Men's and women's custom suits, blazers, tuxedos and setre sets. From fabric selection to fine details — entirely tailored to you. Perfect for domestic and international business meetings.</div>
          <div class="cat-kw"><span class="kw-pill">Men's Suit</span><span class="kw-pill">Women's Blazer</span><span class="kw-pill">Tuxedo</span></div>
          <a href="#" class="cat-btn">Send Measurements →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80" alt="Sportswear">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Active Life</div>
          <div class="cat-name">Sportswear & Activewear</div>
          <div class="cat-desc">Custom sports outfits, tracksuits, jerseys and activewear. High-performance fabrics for comfort and movement.</div>
          <div class="cat-kw"><span class="kw-pill">Jersey</span><span class="kw-pill">Tracksuit</span><span class="kw-pill">Sport Set</span></div>
          <a href="#" class="cat-btn">Explore →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80" alt="Uniform">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Corporate</div>
          <div class="cat-name">Uniforms & Corporate Wear</div>
          <div class="cat-desc">Custom branded uniforms for hotels, restaurants, hospitals, schools and businesses. Flexible minimum order quantities.</div>
          <div class="cat-kw"><span class="kw-pill">Hotel Uniform</span><span class="kw-pill">School Wear</span><span class="kw-pill">Corporate Set</span></div>
          <a href="#" class="cat-btn">Get a Quote →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" alt="Party Dress">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Night Out</div>
          <div class="cat-name">Cocktail & Party Dresses</div>
          <div class="cat-desc">Cocktail dresses, gala nights, formal invitations and special events. Sequin, velvet and satin options crafted to perfection.</div>
          <div class="cat-kw"><span class="kw-pill">Cocktail Dress</span><span class="kw-pill">Gala Outfit</span><span class="kw-pill">Party Wear</span></div>
          <a href="#" class="cat-btn">Order Now →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1485231183945-fffde7f9b68b?w=600&q=80" alt="Casual">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Everyday</div>
          <div class="cat-name">Casual & Everyday Wear</div>
          <div class="cat-desc">Everyday comfort meets custom fit. Dresses, blouses, trousers and complete outfits tailored just for you.</div>
          <div class="cat-kw"><span class="kw-pill">Day Dress</span><span class="kw-pill">Linen Pants</span><span class="kw-pill">Casual Set</span></div>
          <a href="#" class="cat-btn">Browse →</a>
        </div>
      </div>
    </div>
    </div>
  </section>

  <section class="process-section">
    <div class="process-inner">
      <div class="sec-label">How It Works</div>
      <h2 class="sec-title">Your Dream Outfit<br>in 4 Steps</h2>
      <div class="steps">
        <div class="step"><div class="step-num">01</div><div class="step-icon">📐</div><div class="step-title">Send Your Measurements</div><div class="step-text">Share your body measurements, style preferences and reference images via WhatsApp or our web form.</div></div>
        <div class="step"><div class="step-num">02</div><div class="step-icon">🎨</div><div class="step-title">Design & Fabric Selection</div><div class="step-text">Our expert designers present custom model suggestions. Choose from our premium fabric collection.</div></div>
        <div class="step"><div class="step-num">03</div><div class="step-icon">✂️</div><div class="step-title">Bespoke Tailoring</div><div class="step-text">Our master tailors create a pattern exclusively for your body and stitch every detail with precision.</div></div>
        <div class="step"><div class="step-num">04</div><div class="step-icon">🚚</div><div class="step-title">Delivered to Your Door</div><div class="step-text">Fast and secure delivery anywhere in Turkey. Free revision guarantee if you're not fully satisfied.</div></div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="sec-label" style="color:rgba(255,255,255,0.6)">Get Started Now</div>
    <h2 class="cta-title">Design Your Dream<br>Outfit Today</h2>
    <p class="cta-sub">Wherever you are in Turkey — send your measurements, and we'll handle the rest. Your tailor is just one click away.</p>
    <div class="cta-btns">
      <a href="https://wa.me/90XXXXXXXXXX" class="btn-gold">💬 Message on WhatsApp</a>
      <a href="#" class="btn-outline" style="border-color:rgba(255,255,255,0.4);color:#fff">📧 Send an Email</a>
    </div>
  </section>
</div><!-- /lang-en -->


<!-- ═══════════ DEUTSCH ═══════════ -->
<div id="lang-de" class="lang-content">

  <section class="hero">
    <div class="hero-grid">
      <div class="hero-text">
        <div class="hero-badge">Nächste Generation Online-Schneider · Ganz Türkei</div>
        <h1 class="hero-title">
          Ihr Traumoutfit,<br>
          <span class="gold">Exklusiv</span><br>
          <span class="green">Für Sie Gefertigt</span>
        </h1>
        <p class="hero-sub">
          Maßgeschneiderte Kleidung aus der ganzen Türkei — senden Sie Ihre Maße, wählen Sie Ihren Stil und erhalten Sie Ihr perfektes Kleidungsstück direkt an Ihre Tür. Abendkleider, Anzüge, Uniformen, Sportbekleidung und mehr.
        </p>
        <div class="hero-btns">
          <a href="https://wa.me/90XXXXXXXXXX" class="btn-gold">📐 Maße senden & Bestellen</a>
          <a href="#de-cats" class="btn-outline">Kollektionen ansehen →</a>
        </div>
      </div>
      <div class="hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=85" alt="Online Schneider Model">
        <div class="hero-stat"><div class="num">4.800+</div><div class="lbl">Zufriedene Kunden</div></div>
      </div>
    </div>
  </section>

  <div class="trust-bar">
    <div class="trust-item"><span class="icon">✓</span> Lieferung in die ganze Türkei</div>
    <div class="trust-item"><span class="icon">✓</span> 100% Maßanfertigung</div>
    <div class="trust-item"><span class="icon">✓</span> Kostenlose Überarbeitung</div>
    <div class="trust-item"><span class="icon">✓</span> Service in 4 Sprachen</div>
    <div class="trust-item"><span class="icon">✓</span> Premium-Stoffqualität</div>
  </div>

  <section class="cat-section" id="de-cats">
    <div class="section" style="padding-bottom:0">
      <div class="sec-label">Unsere Kollektionen</div>
      <h2 class="sec-title">Maßgeschneidertes Design<br>Für Jeden Stil</h2>
      <p class="sec-desc">Von Abendkleidern bis zu Business-Anzügen, Sportbekleidung bis Uniformen — Maßschneiderei und Design für jeden Anlass, geliefert zu Ihrer Tür.</p>
    </div>
    <div style="max-width:1200px;margin:0 auto;padding:40px 40px 0">
    <div class="cat-grid">
      <div class="cat-card tall">
        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80" alt="Abendkleid">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Maßanfertigung</div>
          <div class="cat-name">Abendkleider & Festmode</div>
          <div class="cat-desc">Hochzeiten, Verlobungen, Galas, Bälle und alle Ihre besonderen Abende — Kleider, die exklusiv auf Ihren Körper, Stil und Ihre Vision zugeschnitten sind.</div>
          <div class="cat-kw"><span class="kw-pill">Hochzeitskleid</span><span class="kw-pill">Ballkleid</span><span class="kw-pill">Abendkleid</span></div>
          <a href="#" class="cat-btn">Design anfragen →</a>
        </div>
      </div>
      <div class="cat-card wide" style="aspect-ratio:auto;min-height:380px">
        <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80" alt="Anzug">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Business & Prestige</div>
          <div class="cat-name">Anzüge & Business-Kleidung</div>
          <div class="cat-desc">Maßgeschneiderte Herren- und Damenanzüge, Blazer, Smokings und Sets. Von der Stoffauswahl bis zu feinen Details — vollständig auf Sie zugeschnitten.</div>
          <div class="cat-kw"><span class="kw-pill">Herrenanzug</span><span class="kw-pill">Damen-Blazer</span><span class="kw-pill">Smoking</span></div>
          <a href="#" class="cat-btn">Maße senden →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80" alt="Sportbekleidung">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Aktives Leben</div>
          <div class="cat-name">Sport- & Aktivbekleidung</div>
          <div class="cat-desc">Maßgeschneiderte Sportoutfits, Trainingsanzüge, Trikots. Hochleistungsstoffe für Komfort und Beweglichkeit.</div>
          <div class="cat-kw"><span class="kw-pill">Trikot</span><span class="kw-pill">Trainingsanzug</span></div>
          <a href="#" class="cat-btn">Entdecken →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80" alt="Uniform">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Korporativ</div>
          <div class="cat-name">Uniformen & Firmenkleidung</div>
          <div class="cat-desc">Individuelle Marken-Uniformen für Hotels, Restaurants, Krankenhäuser und Unternehmen. Flexible Mindestbestellmengen.</div>
          <div class="cat-kw"><span class="kw-pill">Hotel-Uniform</span><span class="kw-pill">Schulkleidung</span></div>
          <a href="#" class="cat-btn">Angebot anfragen →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" alt="Partykleid">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Abend & Gala</div>
          <div class="cat-name">Cocktail- & Partykleider</div>
          <div class="cat-desc">Cocktailkleider, Gala-Abende, formelle Einladungen. Pailletten-, Samt- und Satin-Optionen perfekt ausgeführt.</div>
          <div class="cat-kw"><span class="kw-pill">Cocktailkleid</span><span class="kw-pill">Gala-Outfit</span></div>
          <a href="#" class="cat-btn">Jetzt bestellen →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1485231183945-fffde7f9b68b?w=600&q=80" alt="Alltagsmode">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Alltag</div>
          <div class="cat-name">Casual & Alltagsmode</div>
          <div class="cat-desc">Alltäglicher Komfort trifft maßgeschneiderte Passform. Kleider, Blusen, Hosen — nur für Sie gemacht.</div>
          <div class="cat-kw"><span class="kw-pill">Tageskleid</span><span class="kw-pill">Leinenhose</span></div>
          <a href="#" class="cat-btn">Ansehen →</a>
        </div>
      </div>
    </div>
    </div>
  </section>

  <section class="process-section">
    <div class="process-inner">
      <div class="sec-label">Wie Es Funktioniert</div>
      <h2 class="sec-title">Ihr Traumoutfit<br>in 4 Schritten</h2>
      <div class="steps">
        <div class="step"><div class="step-num">01</div><div class="step-icon">📐</div><div class="step-title">Maße senden</div><div class="step-text">Senden Sie Ihre Körpermaße, Stilpräferenzen und Referenzbilder per WhatsApp oder unserem Webformular.</div></div>
        <div class="step"><div class="step-num">02</div><div class="step-icon">🎨</div><div class="step-title">Design & Stoffwahl</div><div class="step-text">Unsere Experten präsentieren individuelle Modellvorschläge. Wählen Sie aus unserer Premium-Stoffkollektion.</div></div>
        <div class="step"><div class="step-num">03</div><div class="step-icon">✂️</div><div class="step-title">Maßanfertigung</div><div class="step-text">Unsere Meisterschneider erstellen ein Schnittmuster exklusiv für Ihren Körper und nähen jedes Detail mit Präzision.</div></div>
        <div class="step"><div class="step-num">04</div><div class="step-icon">🚚</div><div class="step-title">Lieferung zu Ihnen</div><div class="step-text">Schnelle und sichere Lieferung in die gesamte Türkei. Kostenlose Überarbeitungsgarantie.</div></div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <h2 class="cta-title">Gestalten Sie Ihr<br>Traumoutfit Heute</h2>
    <p class="cta-sub">Egal wo Sie in der Türkei sind — senden Sie Ihre Maße, wir erledigen den Rest. Ihr Schneider ist nur einen Klick entfernt.</p>
    <div class="cta-btns">
      <a href="https://wa.me/90XXXXXXXXXX" class="btn-gold">💬 WhatsApp Nachricht</a>
      <a href="#" class="btn-outline" style="border-color:rgba(255,255,255,0.4);color:#fff">📧 E-Mail senden</a>
    </div>
  </section>
</div><!-- /lang-de -->


<!-- ═══════════ ARABIC ═══════════ -->
<div id="lang-ar" class="lang-content" dir="rtl">

  <section class="hero" style="direction:rtl">
    <div class="hero-grid" style="direction:rtl">
      <div class="hero-text">
        <div class="hero-badge">خياط رقمي من الجيل الجديد · في جميع أنحاء تركيا</div>
        <h1 class="hero-title">
          ملابسك الحلم،<br>
          <span class="gold">مصنوعة حصرياً</span><br>
          <span class="green">لك أنت</span>
        </h1>
        <p class="hero-sub">
          خياطة مخصصة من أي مكان في تركيا — أرسل قياساتك، اختر أسلوبك، واستلم ملابسك المثالية على بابك. فساتين سهرة، بدلات، زي موحد، ملابس رياضية والمزيد.
        </p>
        <div class="hero-btns">
          <a href="https://wa.me/90XXXXXXXXXX" class="btn-gold">📐 أرسل القياسات واطلب الآن</a>
          <a href="#ar-cats" class="btn-outline">استكشف المجموعات ←</a>
        </div>
      </div>
      <div class="hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=85" alt="خياط أونلاين">
        <div class="hero-stat" style="right:-30px;left:auto"><div class="num">4,800+</div><div class="lbl">عميل سعيد</div></div>
      </div>
    </div>
  </section>

  <div class="trust-bar">
    <div class="trust-item"><span class="icon">✓</span> توصيل لجميع أنحاء تركيا</div>
    <div class="trust-item"><span class="icon">✓</span> خياطة مخصصة 100%</div>
    <div class="trust-item"><span class="icon">✓</span> ضمان تعديل مجاني</div>
    <div class="trust-item"><span class="icon">✓</span> خدمة بـ4 لغات</div>
    <div class="trust-item"><span class="icon">✓</span> أقمشة ممتازة</div>
  </div>

  <section class="cat-section" id="ar-cats">
    <div class="section" style="padding-bottom:0;direction:rtl">
      <div class="sec-label">مجموعاتنا</div>
      <h2 class="sec-title">تصميم مخصص<br>لكل أسلوب</h2>
      <p class="sec-desc">من فساتين السهرة إلى البدلات، من الملابس الرياضية إلى الأزياء الموحدة — خياطة وتصميم فريد لكل مناسبة، يوصل إلى بابك.</p>
    </div>
    <div style="max-width:1200px;margin:0 auto;padding:40px 40px 0;direction:rtl">
    <div class="cat-grid">
      <div class="cat-card tall">
        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80" alt="فستان سهرة">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ تصميم حصري</div>
          <div class="cat-name">فساتين السهرة والمناسبات</div>
          <div class="cat-desc">حفلات الزفاف والخطوبة والتخرج والحفلات الراقصة — فساتين مصممة حصرياً لجسمك وأسلوبك وحلمك. خيارات من الدانتيل والأورغانزا والحرير.</div>
          <div class="cat-kw"><span class="kw-pill">فستان زفاف</span><span class="kw-pill">فستان خطوبة</span><span class="kw-pill">فستان تخرج</span></div>
          <a href="#" class="cat-btn">اطلب التصميم ←</a>
        </div>
      </div>
      <div class="cat-card wide" style="aspect-ratio:auto;min-height:380px">
        <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80" alt="بدلة">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ الأعمال والمكانة</div>
          <div class="cat-name">البدلات والملابس الرسمية</div>
          <div class="cat-desc">بدلات رجالية ونسائية مخصصة، جاكيتات، سموكنغ وطقم كامل. من اختيار القماش إلى التفاصيل الدقيقة — مصمم بالكامل لك.</div>
          <div class="cat-kw"><span class="kw-pill">بدلة رجالية</span><span class="kw-pill">جاكيت نسائي</span><span class="kw-pill">سموكنغ</span></div>
          <a href="#" class="cat-btn">أرسل القياسات ←</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80" alt="ملابس رياضية">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ الحياة النشطة</div>
          <div class="cat-name">الملابس الرياضية</div>
          <div class="cat-desc">ملابس رياضية مخصصة وبدلات التدريب والزي الرياضي. أقمشة عالية الأداء للراحة والحركة.</div>
          <div class="cat-kw"><span class="kw-pill">زي رياضي</span><span class="kw-pill">طقم رياضي</span></div>
          <a href="#" class="cat-btn">استكشف ←</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80" alt="زي موحد">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ مؤسسي</div>
          <div class="cat-name">الأزياء الموحدة والملابس المؤسسية</div>
          <div class="cat-desc">أزياء موحدة مخصصة للفنادق والمطاعم والمستشفيات والمدارس والشركات. كميات طلب مرنة.</div>
          <div class="cat-kw"><span class="kw-pill">زي الفندق</span><span class="kw-pill">الزي المدرسي</span></div>
          <a href="#" class="cat-btn">احصل على عرض ←</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" alt="فستان حفلة">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ السهرات</div>
          <div class="cat-name">فساتين الكوكتيل والحفلات</div>
          <div class="cat-desc">فساتين كوكتيل وليالي الغالا والدعوات الرسمية. خيارات من الترتر والمخمل والساتان.</div>
          <div class="cat-kw"><span class="kw-pill">فستان كوكتيل</span><span class="kw-pill">ملابس الغالا</span></div>
          <a href="#" class="cat-btn">اطلب الآن ←</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1485231183945-fffde7f9b68b?w=600&q=80" alt="ملابس يومية">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ اليومي</div>
          <div class="cat-name">الملابس اليومية والكاجوال</div>
          <div class="cat-desc">الراحة اليومية مع قصة مخصصة. فساتين وقمصان وبنطلونات — مصممة لك فقط.</div>
          <div class="cat-kw"><span class="kw-pill">فستان يومي</span><span class="kw-pill">بنطلون كتان</span></div>
          <a href="#" class="cat-btn">تصفح ←</a>
        </div>
      </div>
    </div>
    </div>
  </section>

  <section class="process-section">
    <div class="process-inner" style="direction:rtl">
      <div class="sec-label">كيف يعمل</div>
      <h2 class="sec-title">ملابسك الحلم<br>في 4 خطوات</h2>
      <div class="steps">
        <div class="step"><div class="step-num">01</div><div class="step-icon">📐</div><div class="step-title">أرسل قياساتك</div><div class="step-text">شارك قياسات جسمك وتفضيلاتك وصور مرجعية عبر واتساب أو نموذج الويب.</div></div>
        <div class="step"><div class="step-num">02</div><div class="step-icon">🎨</div><div class="step-title">التصميم واختيار القماش</div><div class="step-text">يقدم مصمموك المحترفون اقتراحات نماذج مخصصة. اختر من مجموعة أقمشتنا الممتازة.</div></div>
        <div class="step"><div class="step-num">03</div><div class="step-icon">✂️</div><div class="step-title">الخياطة المخصصة</div><div class="step-text">يصنع خياطونا الماهرون نمطاً حصرياً لجسمك ويخيطون كل تفصيل بدقة.</div></div>
        <div class="step"><div class="step-num">04</div><div class="step-icon">🚚</div><div class="step-title">التوصيل إلى بابك</div><div class="step-text">توصيل سريع وآمن في جميع أنحاء تركيا. ضمان تعديل مجاني إذا لم تكن راضياً.</div></div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <h2 class="cta-title">صمم ملابسك الحلم<br>اليوم</h2>
    <p class="cta-sub">أينما كنت في تركيا — أرسل قياساتك ونحن نتكفل بالباقي. خياطك على بُعد نقرة واحدة.</p>
    <div class="cta-btns">
      <a href="https://wa.me/90XXXXXXXXXX" class="btn-gold">💬 راسلنا على واتساب</a>
      <a href="#" class="btn-outline" style="border-color:rgba(255,255,255,0.4);color:#fff">📧 أرسل بريداً إلكترونياً</a>
    </div>
  </section>
</div><!-- /lang-ar -->


<!-- ═══════════ RUSSIAN ═══════════ -->
<div id="lang-ru" class="lang-content">

  <section class="hero">
    <div class="hero-grid">
      <div class="hero-text">
        <div class="hero-badge">Портной нового поколения · По всей Турции</div>
        <h1 class="hero-title">
          Ваш Наряд Мечты,<br>
          <span class="gold">Созданный</span><br>
          <span class="green">Исключительно Для Вас</span>
        </h1>
        <p class="hero-sub">
          Пошив на заказ из любой точки Турции — отправьте ваши мерки, выберите стиль и получите идеальную одежду прямо к вашей двери. Вечерние платья, костюмы, форма, спортивная одежда и многое другое.
        </p>
        <div class="hero-btns">
          <a href="https://wa.me/90XXXXXXXXXX" class="btn-gold">📐 Отправить мерки и заказать</a>
          <a href="#ru-cats" class="btn-outline">Просмотреть коллекции →</a>
        </div>
      </div>
      <div class="hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=85" alt="Онлайн портной модель">
        <div class="hero-stat"><div class="num">4 800+</div><div class="lbl">Довольных клиентов</div></div>
      </div>
    </div>
  </section>

  <div class="trust-bar">
    <div class="trust-item"><span class="icon">✓</span> Доставка по всей Турции</div>
    <div class="trust-item"><span class="icon">✓</span> 100% индивидуальный пошив</div>
    <div class="trust-item"><span class="icon">✓</span> Бесплатные исправления</div>
    <div class="trust-item"><span class="icon">✓</span> Обслуживание на 4 языках</div>
    <div class="trust-item"><span class="icon">✓</span> Премиальные ткани</div>
  </div>

  <section class="cat-section" id="ru-cats">
    <div class="section" style="padding-bottom:0">
      <div class="sec-label">Наши коллекции</div>
      <h2 class="sec-title">Индивидуальный дизайн<br>Для каждого стиля</h2>
      <p class="sec-desc">От вечерних платьев до деловых костюмов, от спортивной одежды до форменной — пошив на заказ для любого случая с доставкой к вашей двери.</p>
    </div>
    <div style="max-width:1200px;margin:0 auto;padding:40px 40px 0">
    <div class="cat-grid">
      <div class="cat-card tall">
        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80" alt="Вечернее платье">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Эксклюзивный дизайн</div>
          <div class="cat-name">Вечерние платья & Торжества</div>
          <div class="cat-desc">Свадьбы, помолвки, выпускные и все особые вечера — платья, созданные исключительно для вашей фигуры, стиля и мечты. Кружево, органза, шёлк и бархат.</div>
          <div class="cat-kw"><span class="kw-pill">Свадебное платье</span><span class="kw-pill">Выпускное платье</span><span class="kw-pill">Вечернее</span></div>
          <a href="#" class="cat-btn">Запросить дизайн →</a>
        </div>
      </div>
      <div class="cat-card wide" style="aspect-ratio:auto;min-height:380px">
        <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80" alt="Костюм">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Бизнес & Престиж</div>
          <div class="cat-name">Костюмы & Деловая одежда</div>
          <div class="cat-desc">Мужские и женские костюмы на заказ, пиджаки, смокинги и комплекты. От выбора ткани до мельчайших деталей — полностью подобрано под вас.</div>
          <div class="cat-kw"><span class="kw-pill">Мужской костюм</span><span class="kw-pill">Женский пиджак</span><span class="kw-pill">Смокинг</span></div>
          <a href="#" class="cat-btn">Отправить мерки →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80" alt="Спортивная одежда">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Активная жизнь</div>
          <div class="cat-name">Спортивная одежда</div>
          <div class="cat-desc">Индивидуальные спортивные костюмы, форма и активная одежда. Высокоэффективные ткани для комфорта и движения.</div>
          <div class="cat-kw"><span class="kw-pill">Форма</span><span class="kw-pill">Спортивный костюм</span></div>
          <a href="#" class="cat-btn">Подробнее →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80" alt="Форма">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Корпоративный</div>
          <div class="cat-name">Форменная & Корпоративная одежда</div>
          <div class="cat-desc">Индивидуальные брендированные форменные костюмы для гостиниц, ресторанов, больниц и компаний. Гибкие минимальные объёмы заказа.</div>
          <div class="cat-kw"><span class="kw-pill">Форма для отеля</span><span class="kw-pill">Школьная форма</span></div>
          <a href="#" class="cat-btn">Получить предложение →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" alt="Коктейльное платье">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Вечер & Гала</div>
          <div class="cat-name">Коктейльные & Праздничные платья</div>
          <div class="cat-desc">Коктейльные платья, гала-вечера, официальные приглашения и торжественные мероприятия. Пайетки, бархат и атлас.</div>
          <div class="cat-kw"><span class="kw-pill">Коктейльное</span><span class="kw-pill">Гала-наряд</span></div>
          <a href="#" class="cat-btn">Заказать →</a>
        </div>
      </div>
      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1485231183945-fffde7f9b68b?w=600&q=80" alt="Повседневная одежда">
        <div class="cat-card-overlay">
          <div class="cat-tag">✦ Ежедневно</div>
          <div class="cat-name">Повседневная & Casual одежда</div>
          <div class="cat-desc">Ежедневный комфорт в сочетании с индивидуальной посадкой. Платья, блузки, брюки — созданы только для вас.</div>
          <div class="cat-kw"><span class="kw-pill">Дневное платье</span><span class="kw-pill">Льняные брюки</span></div>
          <a href="#" class="cat-btn">Смотреть →</a>
        </div>
      </div>
    </div>
    </div>
  </section>

  <section class="process-section">
    <div class="process-inner">
      <div class="sec-label">Как это работает</div>
      <h2 class="sec-title">Наряд мечты<br>за 4 шага</h2>
      <div class="steps">
        <div class="step"><div class="step-num">01</div><div class="step-icon">📐</div><div class="step-title">Отправьте мерки</div><div class="step-text">Поделитесь мерками тела, предпочтениями стиля и референсными изображениями через WhatsApp или веб-форму.</div></div>
        <div class="step"><div class="step-num">02</div><div class="step-icon">🎨</div><div class="step-title">Дизайн & Выбор ткани</div><div class="step-text">Наши эксперты-дизайнеры предложат индивидуальные модели. Выберите из нашей коллекции премиальных тканей.</div></div>
        <div class="step"><div class="step-num">03</div><div class="step-icon">✂️</div><div class="step-title">Индивидуальный пошив</div><div class="step-text">Наши мастера-портные создадут выкройку специально для вашей фигуры и сошьют каждую деталь с точностью.</div></div>
        <div class="step"><div class="step-num">04</div><div class="step-icon">🚚</div><div class="step-title">Доставка к вам</div><div class="step-text">Быстрая и надёжная доставка по всей Турции. Бесплатная гарантия исправлений.</div></div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <h2 class="cta-title">Создайте свой<br>Наряд мечты сегодня</h2>
    <p class="cta-sub">Где бы вы ни находились в Турции — отправьте мерки, и мы позаботимся об остальном. Ваш портной в одном клике.</p>
    <div class="cta-btns">
      <a href="https://wa.me/90XXXXXXXXXX" class="btn-gold">💬 Написать в WhatsApp</a>
      <a href="#" class="btn-outline" style="border-color:rgba(255,255,255,0.4);color:#fff">📧 Отправить email</a>
    </div>
  </section>
</div><!-- /lang-ru -->


<!-- FOOTER (always visible) -->
<footer>
  <div class="footer-grid">
    <div>
      <div class="footer-logo">SwapHubs ✦</div>
      <p class="footer-desc">Türkiye'nin yeni nesil online terzi ve tekstil hizmet platformu. 4 dilde hizmet, Türkiye geneli teslimat, kişiye özel tasarım ve dikim.</p>
    </div>
    <div>
      <div class="footer-h">Kategoriler</div>
      <ul class="footer-links">
        <li><a href="#">Abiye & Gece Kıyafeti</a></li>
        <li><a href="#">Takım Elbise</a></li>
        <li><a href="#">Spor Giyim</a></li>
        <li><a href="#">Üniforma</a></li>
        <li><a href="#">Gece Davet</a></li>
        <li><a href="#">Günlük Giyim</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-h">Hizmetler</div>
      <ul class="footer-links">
        <li><a href="#">Ölçü Rehberi</a></li>
        <li><a href="#">Kumaş Koleksiyonu</a></li>
        <li><a href="#">Toplu Sipariş</a></li>
        <li><a href="#">Kurumsal Çözümler</a></li>
        <li><a href="#">Revizyon Politikası</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-h">İletişim</div>
      <ul class="footer-links">
        <li><a href="#">📱 WhatsApp</a></li>
        <li><a href="#">📧 E-posta</a></li>
        <li><a href="#">🌐 swaphubs.com</a></li>
        <li><a href="#">📸 Instagram</a></li>
        <li><a href="#">🎵 TikTok</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    © 2024 SwapHubs Terzi · Online Terzi Hizmeti · Türkiye Geneli · 4 Dilde Hizmet<br>
    online terzi · custom tailor turkey · maßschneiderei online · خياط أونلاين · онлайн портной турция
  </div>
</footer>

<!-- WhatsApp Float -->
<a href="https://wa.me/90XXXXXXXXXX" class="wa-float" title="WhatsApp ile Yazın">💬</a>

<script>
function setLang(lang) {
  document.querySelectorAll('.lang-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.lang-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('lang-' + lang).classList.add('active');
  document.querySelector(`button[onclick="setLang('${lang}')"]`).classList.add('active');

  // RTL for Arabic
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.step, .fabric-card, .testi-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
</script>
</body>
</html>
