// ==========================================
// 1. COMPONENT DIŞINA EKLENECEK SABİTLER
// (Sayfanın en üstüne, importların altına ekleyin)
// ==========================================

const HOW_IT_WORKS = [
  ['01', '📸', 'Fotoğraf & Ölçü Gönderin', "WhatsApp'tan kıyafet modelini ve ölçülerinizi gönderin. Tamamen ücretsiz."],
  ['02', '🎨', 'Tasarım & Kumaş Seçimi', 'Uzman terzimizle detayları belirleyin. Fiyatı onaylayın.'],
  ['03', '✂️', 'Dikime Başlıyoruz', 'Onayın ardından atölyemizde dikime başlıyoruz.'],
  ['04', '🚗', 'Teslimat', 'Antalya içi ücretsiz kurye, Türkiye geneline kargo.'],
] as const;

const WHY_US_FEATURES = [
  ['📐', 'Mükemmel Fit Garantisi', 'Her kıyafet ölçülerinize özel dikilir.'],
  ['⚡', 'Ekspres Teslimat', 'Tamir aynı gün, özel dikim 3–7 gün içinde.'],
  ['📱', 'Online Sipariş', "WhatsApp'tan verin, Türkiye geneli kargo."],
  ['🎨', 'Özgün Tasarım', 'Kendi tasarımınız ya da uzman ekibimiz.'],
  ['🏭', 'Seri İmalat Kapasitesi', 'Min. 50 adetten başlayan toplu üretim.'],
  ['💰', 'Şeffaf Fiyatlandırma', 'Gizli ücret yok, net fiyat peşin alın.'],
  ['🌍', 'Türkiye Geneli Kargo', 'Antalya dışından sipariş kargo ile.'],
  ['⭐', '4.9 / 5 · 112 Yorum', "Google'da en yüksek puanlı Antalya terzisi."],
] as const;

const FOOTER_KEYWORDS = [
  'Antalya Bay Terzi', 'Erkek Kıyafet Dikimi', 'Bayan Kıyafet Dikimi', 
  'Online Terzi Antalya', 'Ütü Hizmeti Antalya', 'Seri İmalat Antalya', 
  'Tailor Antalya', 'Портной Анталья', 'Schneider Antalya'
] as const;


// ==========================================
// 2. RETURN İÇİ JSX KODU
// (Kaldığınız yerden / {/* SERVİSLER */} satırından itibaren değiştirin)
// ==========================================

      {/* SERVİSLER */}
      <section id="services" className="osvc-sec" aria-labelledby="svc-h">
        <div className="osvc-header">
          <span className="oeyebrow">✦ Tüm Hizmetlerimiz</span>
          <h2 className="oh2" id="svc-h">Ne Yapıyoruz?</h2>
          <p className="osh-sub">Erkek &amp; bayan kıyafet dikiminden online terziye, ütü hizmetinden seri imalata.</p>
          <div className="odivider" />
        </div>
        <div className="osvc-grid">
          {SERVICES.map((s) => (
            <article 
              key={s.id} 
              id={s.id} 
              className={`oscard ${visible.has(s.id) ? 'oscard-visible' : ''}`}
              style={visible.has(s.id) ? { opacity: 1, transform: 'none' } : {}}
              data-ani
            >
              <img src={s.img} alt={`${s.title} — SwapHubs Online Tailor Antalya`} className="oscard-img" loading="lazy" width={800} height={420} />
              <div className="oscard-ov" aria-hidden="true" />
              <div className="oscard-top">
                {s.badge && <span className="oscard-badge" style={{ background: s.badgeColor, color: '#fff' }}>{s.badge}</span>}
                <span className="oscard-icon" aria-hidden="true">{s.icon}</span>
              </div>
              <div className="oscard-body">
                <h3 className="oscard-title">{s.title}</h3>
                <div className="oscard-sub">{s.sub}</div>
                <p className="oscard-desc">{s.desc}</p>
                <div className="oscard-feats">
                  {s.feats.map(f => <span key={f} className="oscard-feat">{f}</span>)}
                </div>
                <div className="oscard-foot">
                  <div>
                    <span className="oscard-pv">{s.price}</span>
                    <span className="oscard-pn">{s.note}</span>
                    <span className="oscard-pt">⏱ {s.time}</span>
                  </div>
                  <a href={WA(s.waMsg)} target="_blank" rel="noopener noreferrer"
                    className="obtn obtn-wa" style={{ fontSize: '.7rem', padding: '.6rem 1rem' }}>
                    Sipariş Ver
                  </a>
                </div>
              </div>
              <div className="oscard-line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section className="osec" style={{ background: 'var(--ink3)' }} aria-labelledby="how-h">
        <div className="octr">
          <div style={{ textAlign: 'center' }}>
            <span className="oeyebrow">📱 Online Sipariş</span>
            <h2 className="oh2" id="how-h">Nasıl Çalışır?</h2>
            <p className="osh-sub" style={{ margin: '.9rem auto 0' }}>WhatsApp&apos;tan sipariş verin, Türkiye&apos;nin her yerine teslim edelim.</p>
            <div className="odivider" style={{ margin: '1.2rem auto 0' }} />
          </div>
          <div className="ohow-grid">
            {HOW_IT_WORKS.map(([n, ic, t, d]) => (
              <div key={n} className="ohow-card" data-ani>
                <div className="ohow-n">{n}</div>
                <div className="ohow-icon" aria-hidden="true">{ic}</div>
                <h3 className="ohow-t">{t}</h3>
                <p className="ohow-d">{d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href={WA('Merhaba, online terzi siparişi vermek istiyorum.')} target="_blank" rel="noopener noreferrer" className="obtn obtn-wa">
              💬 Hemen Başla — WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* NEDEN BİZ */}
      <section className="osec" style={{ background: 'var(--ink)' }} aria-labelledby="why-h">
        <div className="octr">
          <span className="oeyebrow">✦ Neden SwapHubs?</span>
          <h2 className="oh2" id="why-h">Neden Bizi Seçmelisiniz?</h2>
          <div className="odivider" />
          <div className="owhy-grid">
            {WHY_US_FEATURES.map(([ic, t, d]) => (
              <div key={t} className="owhy-card" data-ani>
                <div className="owhy-ic" aria-hidden="true">{ic}</div>
                <div className="owhy-t">{t}</div>
                <p className="owhy-d">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FİYATLAR */}
      <section id="prices" className="osec" style={{ background: 'var(--ink2)' }} aria-labelledby="prices-h">
        <div className="octr">
          <span className="oeyebrow">₺ Şeffaf Fiyatlar</span>
          <h2 className="oh2" id="prices-h">Terzi Fiyatları 2026</h2>
          <p className="osh-sub">Başlangıç fiyatları. Kesin teklif için WhatsApp&apos;tan fotoğraf gönderin.</p>
          <div className="odivider" />
          <div className="optabs" role="tablist" style={{ marginTop: '2rem' }}>
            {PRICE_TABLE.map((c, i) => (
              <button key={c.cat} className={`optab${priceTab === i ? ' on' : ''}`}
                onClick={() => setPriceTab(i)} role="tab" aria-selected={priceTab === i}>
                {c.cat}
              </button>
            ))}
          </div>
          <div className="optable-wrap" data-ani>
            <table className="optable" aria-label={PRICE_TABLE[priceTab].cat}>
              <caption className="osr-only">{PRICE_TABLE[priceTab].cat} Fiyat Listesi</caption>
              <thead>
                <tr>
                  <th scope="col">Hizmet</th>
                  <th scope="col">Başlangıç Fiyatı</th>
                  <th scope="col">Süre</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_TABLE[priceTab].rows.map(([s, p, t]) => (
                  <tr key={s}><td>{s}</td><td>{p}</td><td>{t}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href={WA('Merhaba, fiyat teklifi almak istiyorum.')} target="_blank" rel="noopener noreferrer" className="obtn obtn-gold">
              📲 Ücretsiz Teklif Al
            </a>
          </div>
        </div>
      </section>

      {/* YORUMLAR */}
      <section id="reviews" className="osec" style={{ background: 'var(--ink3)' }} aria-labelledby="rev-h">
        <div className="octr">
          <div style={{ textAlign: 'center' }}>
            <span className="oeyebrow">⭐ 4.9 / 5 · 112 Değerlendirme</span>
            <h2 className="oh2" id="rev-h">Müşterilerimiz Ne Diyor?</h2>
            <div className="odivider" style={{ margin: '1.2rem auto 0' }} />
          </div>
          <div className="orev-grid">
            {REVIEWS.map(r => (
              <article key={r.name} className="orcard" data-ani>
                <div className="orstars" aria-label={`${r.stars} yıldız`}>{'★'.repeat(r.stars)}</div>
                <p className="ortxt">{r.text}</p>
                <div><span className="orauth-name">{r.name}</span>{' '}<span className="orauth-info">— {r.city} · {r.date}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="octa-sec" aria-label="Sipariş ver">
        <h2 className="octa-h">Kıyafetiniz Tam Ölçüye<br /><em>Dikildikten Sonra Kapınızda</em></h2>
        <p className="octa-sub">Online sipariş · WhatsApp ile anında iletişim · Türkiye geneli kargo</p>
        <div className="octa-btns">
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="obtn obtn-wa">💬 WhatsApp Sipariş Ver</a>
          <a href={WA('Merhaba, toplu sipariş hakkında bilgi almak istiyorum.')} target="_blank" rel="noopener noreferrer" className="obtn obtn-ghost">🏭 Toplu Sipariş</a>
        </div>
        <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '1.5rem' }}>
          Telefon: <a href="tel:+905318986418" style={{ color: 'var(--gold)', textDecoration: 'none' }}>+90 531 898 64 18</a>
        </p>
      </section>

      {/* FAQ — Google SSS Snippet JSON-LD Desteği ile */}
      <section id="faq" className="osec" style={{ background: 'var(--ink)' }} aria-labelledby="faq-h">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQS.map(([question, answer]) => ({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": answer
                }
              }))
            })
          }}
        />
        <div className="octr">
          <div style={{ textAlign: 'center' }}>
            <span className="oeyebrow">FAQ</span>
            <h2 className="oh2" id="faq-h">Sık Sorulan Sorular</h2>
            <div className="odivider" style={{ margin: '1.2rem auto 0' }} />
          </div>
          <div className="ofaq-list">
            {FAQS.map(([q, a], i) => (
              <details key={i} className="ofaq-item" open={i < 3}>
                <summary>{q}</summary>
                <div className="ofaq-ans">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE MAPS — İKİ PROFİL */}
      <section id="maps" className="osec" style={{ background: 'var(--ink2)' }} aria-labelledby="maps-h">
        <div className="octr">
          <span className="oeyebrow">📍 Konumlarımız</span>
          <h2 className="oh2" id="maps-h">Google Business Profillerimiz</h2>
          <p className="osh-sub">Konyaaltı / Antalya lokasyonlarımızda hizmetinizdeyiz.</p>
          <div className="odivider" />
          <div className="omaps-grid" data-ani>
            {/* Profil 1 */}
            <div className="omap-card">
              <iframe src={gbpEmbed1} width="100%" height="240" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="TERZİ Can - Konyaaltı — Hurma Mah." />
              <div className="omap-info">
                <div className="omap-name">TERZİ Can - Konyaaltı (Merkez)</div>
                <div className="omap-addr">📍 Hurma Mahallesi, 07130 Konyaaltı / Antalya</div>
                <div className="omap-btns">
                  <a href={gbpMaps1} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-maps">🗺️ Maps</a>
                  <a href={gbpShort1} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-route">📍 Yol Tarifi</a>
                  <a href="https://search.google.com/local/writereview?placeid=0x14c39311e6924c67:0x59547225251db8a0" target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-rev">⭐ Yorum Yap</a>
                </div>
              </div>
            </div>

            {/* Profil 2 */}
            <div className="omap-card">
              <iframe src={gbpEmbed2} width="100%" height="240" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="TERZİ Can - Şube 2" />
              <div className="omap-info">
                <div className="omap-name">TERZİ Can - Şube 2</div>
                <div className="omap-addr">📍 Antalya / Türkiye</div>
                <div className="omap-btns">
                  <a href={gbpMaps2} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-maps">🗺️ Maps</a>
                  <a href={gbpShort2} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-route">📍 Yol Tarifi</a>
                  <a href={gbpShort2} target="_blank" rel="noopener noreferrer" className="omap-btn omap-btn-rev">⭐ Yorum Yap</a>
                </div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: '.74rem', color: 'var(--muted)', marginTop: '1.2rem', textAlign: 'center' }}>
            Her iki profilimizde de yorum yazabilirsiniz — Google sıralamalarını doğrudan etkiler.
          </p>
        </div>
      </section>

      {/* ÇAPRAZ LİNK */}
      <section className="ocross-sec" aria-labelledby="cross-h">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="oeyebrow">SwapHubs Terzi Hizmetleri</span>
          <h2 id="cross-h" className="oh2" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)' }}>Antalya&apos;da mı Bulunuyorsunuz?</h2>
        </div>
        <div className="ocross-grid">
          <div className="ocross-card" style={{ background: 'var(--ink4)', border: '1px solid var(--gold)' }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.6rem' }}>🌐 Türkiye Geneli · Aktif Sayfa</div>
            <div style={{ fontFamily: 'var(--font-unbounded,"Georgia",serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--bone)', marginBottom: '.5rem' }}>Online Terzi Hizmeti</div>
            <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '.8rem' }}>81 ile kargo ile özel dikim, abiye, takım elbise, üniforma.</p>
            <span style={{ fontSize: '.68rem', color: 'var(--gold)', fontWeight: 600 }}>✓ Şu an bu sayfadasınız</span>
          </div>
          <a href="/terzi" className="ocross-card" style={{ background: 'var(--ink3)', border: '1px solid rgba(201,168,76,.15)' }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.6rem' }}>📍 Antalya & Çevresi</div>
            <div style={{ fontFamily: 'var(--font-unbounded,"Georgia",serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--bone)', marginBottom: '.5rem' }}>Antalya Terzi Can →</div>
            <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '.8rem' }}>Konyaaltı merkezli araçlı terzi servisi. Eve &amp; otele gelir, ölçü alır, teslim eder.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem' }}>
              {['✂️ Tadilat','👗 Dikim','🧺 Kuru Temizleme','🚗 Eve Gelen Terzi'].map(t => (
                <span key={t} style={{ fontSize: '.6rem', color: 'var(--gold)', border: '1px solid rgba(201,168,76,.2)', padding: '.18rem .5rem' }}>{t}</span>
              ))}
            </div>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ofooter">
        <div className="ofoot-brand">SwapHubs — Online Tailor Service | Antalya Terzi</div>
        <nav className="ofoot-links" aria-label="Footer">
          {[
            ['https://swaphubs.com','Ana Sayfa'],
            ['/terzi','Terzi Can Antalya'],
            ['#services','Hizmetler'],
            ['#prices','Fiyatlar'],
            ['#faq','SSS'],
            ['#maps','Konumlar']
          ].map(([h,l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <p className="ofoot-copy">
          © {new Date().getFullYear()} SwapHubs · Antalya Terzi &amp; Tekstil ·{' '}
          <a href="tel:+905318986418" style={{ color: 'rgba(201,168,76,.35)', textDecoration: 'none' }}>+90 531 898 64 18</a>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', justifyContent: 'center', marginTop: '1rem' }}>
          {FOOTER_KEYWORDS.map(k => (
            <span key={k} style={{ fontSize: '.58rem', color: 'rgba(201,168,76,.22)', border: '1px solid rgba(201,168,76,.07)', padding: '.18rem .55rem' }}>{k}</span>
          ))}
        </div>
      </footer>
