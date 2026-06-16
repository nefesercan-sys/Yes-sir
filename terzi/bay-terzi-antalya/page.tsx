import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/bay-terzi-antalya';
const PARENT_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Merhaba, erkek kıyafeti için terzi hizmeti almak istiyorum.')}`;
const TODAY = new Date().toISOString().split('T')[0];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Bay Terzi Antalya — Erkek Kıyafet Dikimi ve Tadilatı',
      alternateName: ['Erkek Terzi Antalya', 'Erkek Takım Elbise Dikimi Antalya', "Men's Tailor Antalya"],
      description: "Antalya bay terzisi. Erkek takım elbise dikimi, erkek pantolon kısaltma, erkek gömlek dikimi, ceket tadilatı, kol kısaltma, blazer dikimi, smoking, damatlık. Özel ölçü erkek kıyafeti.",
      provider: {
        '@type': 'ClothingStore',
        '@id': `${PARENT_URL}#business`,
        name: 'Terzi Can',
        telephone: PHONE_E164,
      },
      areaServed: { '@type': 'City', name: 'Antalya' },
      offers: {
        '@type': 'Offer',
        price: '150',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Bay Terzi Antalya · Erkek Takım Elbise Dikimi · Pantolon Kısaltma · Terzi Can',
      url: SITE_URL,
      description: "Antalya bay terzisi Terzi Can. Erkek takım elbise dikimi ₺2500, erkek pantolon kısaltma ₺150, gömlek dikimi, ceket tadilatı. Özel ölçü erkek kıyafeti. ☎ " + PHONE,
      inLanguage: 'tr',
      dateModified: TODAY,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME_URL },
        { '@type': 'ListItem', position: 2, name: 'Antalya Terzi', item: PARENT_URL },
        { '@type': 'ListItem', position: 3, name: 'Bay Terzi Antalya', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Bay terzi Antalya — erkek takım elbise dikimi fiyatı?',
          acceptedAnswer: { '@type': 'Answer', text: `Erkek takım elbise dikimi ₺2500'den başlar. Tek parça ceket veya pantolon tadilatı ₺150'den başlar. WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Erkek pantolon kısaltma Antalya kaç lira?',
          acceptedAnswer: { '@type': 'Answer', text: `Erkek pantolon kısaltma ₺150'den başlar. Kot pantolon ₺150, kumaş pantolon ₺175. Aynı gün teslim. WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Erkek gömlek dikimi Antalya fiyatı?',
          acceptedAnswer: { '@type': 'Answer', text: `Erkek gömlek dikimi ₺400'den başlar. Özel ölçü, kendi kumaşınızla veya stoğumuzdan. WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Damatlık dikimi ve tadilatı Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet. Damatlık dikimi ve tadilatı yapıyoruz. Düğün sezonunda (Nisan–Ekim) ekspres randevu için WhatsApp: ${PHONE}` },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Bay Terzi Antalya · Erkek Takım Elbise Dikimi · Pantolon Kısaltma · Terzi Can',
  description: "Antalya bay terzisi. Erkek takım elbise dikimi ₺2500, pantolon kısaltma ₺150, gömlek dikimi ₺400, ceket tadilatı, blazer, smoking, damatlık. Özel ölçü erkek kıyafeti. Eve-otele servis. ☎ " + PHONE,
  keywords: ['bay terzi Antalya','erkek terzi Antalya','erkek takım elbise dikimi Antalya','erkek pantolon kısaltma','erkek gömlek dikimi Antalya','ceket tadilatı Antalya','blazer dikimi Antalya','damatlık dikimi Antalya','smoking dikimi Antalya'],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Bay Terzi Antalya · Erkek Takım Elbise · Gömlek Dikimi · Terzi Can',
    description: "Antalya bay terzisi. Takım elbise ₺2500, pantolon kısaltma ₺150, gömlek ₺400. ☎ " + PHONE,
    url: SITE_URL,
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function BayTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: 'system-ui,sans-serif', background: '#0d0c0a', color: '#f5f0e8', minHeight: '100vh' }}>

        <nav style={{ padding: '1rem 1.5rem', fontSize: '.75rem', color: '#7a7268' }}>
          <Link href="/" style={{ color: '#c9a96e', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#c9a96e', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}
          <span>Bay Terzi Antalya</span>
        </nav>

        <section style={{ padding: '3rem 1.5rem 2.5rem', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ fontSize: '.7rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>
            👔 Bay Terzi · Erkek Kıyafet Uzmanı
          </div>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.2rem' }}>
            Bay Terzi Antalya<br />
            <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Erkek Kıyafet Dikimi & Tadilatı</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#ede7d9', lineHeight: 1.8, maxWidth: '640px', marginBottom: '2rem' }}>
            Antalya'nın deneyimli <strong>bay terzisi</strong> Terzi Can. Erkek takım elbise dikimi, erkek pantolon kısaltma, erkek gömlek dikimi, ceket ve kol tadilatı, blazer dikimi, smoking ve damatlık dikimi. Özel ölçü erkek kıyafeti için profesyonel hizmet.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#c9a96e', color: '#0d0c0a', padding: '.9rem 1.8rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              💬 Fiyat Al
            </a>
            <a href={`tel:${PHONE_E164}`}
              style={{ border: '1px solid rgba(201,169,110,.3)', color: '#f5f0e8', padding: '.9rem 1.8rem', textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              📞 {PHONE}
            </a>
          </div>
        </section>

        {/* FİYAT TABLOSU */}
        <section style={{ background: '#1a1814', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#c9a96e', marginBottom: '1.5rem' }}>
              Bay Terzi Fiyatları 2025–2026
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(201,169,110,.2)' }}>
                  <th style={{ textAlign: 'left', padding: '.7rem', fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#c9a96e' }}>Hizmet</th>
                  <th style={{ textAlign: 'right', padding: '.7rem', fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#c9a96e' }}>Fiyat</th>
                  <th style={{ textAlign: 'right', padding: '.7rem', fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#c9a96e' }}>Süre</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Erkek Pantolon / Paça Kısaltma', '₺150+', 'Aynı gün'],
                  ['Fermuar Değişimi (Pantolon)', '₺120+', 'Aynı gün'],
                  ['Kol Kısaltma (Ceket / Blazer)', '₺200+', '48 saat'],
                  ['Ceket / Blazer Daraltma', '₺200+', '48 saat'],
                  ['Erkek Gömlek Dikimi', '₺400+', '3–5 gün'],
                  ['Erkek Takım Elbise Dikimi', '₺2.500+', '5–7 gün'],
                  ['Blazer Dikimi', '₺1.500+', '5–7 gün'],
                  ['Damatlık Dikimi', '₺3.000+', '7–10 gün'],
                  ['Smoking Dikimi', '₺3.500+', '7–10 gün'],
                  ['Yırtık Onarımı / Düğme Dikimi', '₺100+', 'Aynı gün'],
                ].map(([hizmet, fiyat, sure], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.04)', background: i % 2 ? 'rgba(201,169,110,.02)' : 'transparent' }}>
                    <td style={{ padding: '.85rem .7rem', fontSize: '.9rem', color: '#ede7d9' }}>{hizmet}</td>
                    <td style={{ padding: '.85rem .7rem', fontSize: '.9rem', color: '#c9a96e', fontWeight: 600, textAlign: 'right' }}>{fiyat}</td>
                    <td style={{ padding: '.85rem .7rem', fontSize: '.8rem', color: '#7a7268', textAlign: 'right' }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* İÇERİK */}
        <section style={{ padding: '3.5rem 1.5rem', maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', marginBottom: '1.2rem' }}>
            Antalya Bay Terzisi — Erkek Kıyafet Hizmetleri
          </h2>
          <div style={{ fontSize: '.92rem', color: '#ede7d9', lineHeight: 1.9 }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Terzi Can</strong>, Antalya'nın deneyimli <strong>bay terzisi</strong> olarak erkek kıyafetinin her alanında hizmet vermektedir. <strong>Erkek takım elbise dikimi</strong>'nden <strong>erkek pantolon kısaltma</strong>'ya, <strong>erkek gömlek dikimi</strong>'nden ceket ve blazer tadilatına kadar tüm erkek kıyafet işleri yapılmaktadır.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Özel ölçü erkek takım elbise</strong> dikimi ₺2500'den başlamakta olup müşterimizin ölçüsü alınarak, seçilen kumaşla mükemmel fit sağlanmaktadır. İş toplantıları, davetler ve düğünler için <strong>damatlık dikimi</strong> ve <strong>smoking dikimi</strong> de hizmetlerimiz arasındadır.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Tatildeyken veya iş seyahatindeyken kıyafet tadilatı gerektiğinde <strong>otele gelen bay terzi</strong> servisimizle Belek, Lara, Kemer ve tüm Antalya'ya geliyoruz.
            </p>
          </div>

          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', margin: '2.5rem 0 1rem', color: '#c9a96e' }}>
            Tüm Erkek Kıyafet Hizmetleri
          </h3>
          <ul style={{ fontSize: '.9rem', color: '#ede7d9', lineHeight: 2.1, paddingLeft: '1.2rem' }}>
            {[
              'Erkek takım elbise dikimi (özel ölçü)',
              'Erkek pantolon kısaltma ve paça kısaltma',
              'Erkek gömlek dikimi (Oxford, poplin, flannel)',
              'Ceket ve blazer tadilatı (daraltma, kısaltma)',
              'Kol kısaltma (ceket, blazer, gömlek)',
              'Fermuar değişimi (pantolon, ceket)',
              'Damatlık dikimi ve tadilatı',
              'Smoking dikimi ve tadilatı',
              'Yırtık onarımı ve yama',
              'Düğme dikimi ve değişimi',
              'Astar değişimi ve tamiri',
              'Erkek mont ve kaban tadilatı',
            ].map((item, i) => (
              <li key={i}>✓ {item}</li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section style={{ background: '#1a1814', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', marginBottom: '2rem' }}>
              Bay Terzi — Sık Sorulan Sorular
            </h2>
            {[
              ['Bay terzi Antalya — erkek takım elbise dikimi fiyatı?', "Erkek takım elbise dikimi ₺2500'den başlar. Kesin fiyat için ölçü alımı gereklidir. Fotoğraf gönderin, hızlıca dönüş yapalım. WhatsApp: " + PHONE],
              ['Erkek pantolon kısaltma kaç lira?', 'Kot pantolon ₺150, kumaş pantolon ₺175\'ten başlar. Aynı gün teslim mümkündür.'],
              ['Damatlık ve smoking dikimi yapıyor musunuz?', 'Evet. Düğün sezonunda (Nisan–Ekim) ekspres randevu. Damatlık ₺3000, smoking ₺3500\'den başlar.'],
              ['Erkek kıyafeti için otele veya eve geliyor musunuz?', "Evet! Tüm Antalya'ya araçlı bay terzi servisimizle geliyoruz. Belek, Lara, Kemer, Alanya dahil. WhatsApp: " + PHONE],
              ['Erkek gömlek dikimi süresi ne kadar?', 'Erkek gömlek dikimi 3–5 gün içinde tamamlanır. Ekspres işlem için önceden bilgilendirin.'],
            ].map(([q, a], i) => (
              <details key={i} style={{ borderBottom: '1px solid rgba(201,169,110,.08)', padding: '1rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.95rem', fontWeight: 500, color: '#f5f0e8', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#c9a96e' }}>+</span>
                </summary>
                <p style={{ marginTop: '.8rem', fontSize: '.85rem', color: '#7a7268', lineHeight: 1.8 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '3.5rem 1.5rem', textAlign: 'center', background: '#252320' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', marginBottom: '1rem' }}>Bay Terzi Randevusu Al</h2>
          <p style={{ color: '#7a7268', marginBottom: '2rem', fontSize: '.9rem' }}>Fotoğraf gönderin — 30 dk içinde fiyat ve randevu</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.9rem', borderRadius: '4px' }}>
              💬 WhatsApp ile Yaz
            </a>
            <a href={`tel:${PHONE_E164}`}
              style={{ border: '1px solid rgba(201,169,110,.3)', color: '#f5f0e8', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.9rem', borderRadius: '4px' }}>
              📞 Hemen Ara
            </a>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '.8rem', color: '#7a7268' }}>⭐ 4.9 / 5 · 94 Google Değerlendirmesi · 09:00–19:00 Pzt–Cmt</p>
        </section>

        <section style={{ padding: '2.5rem 1.5rem', background: '#0d0c0a' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1.2rem' }}>İlgili Hizmetler</p>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
              {[
                ['Paça Kısaltma', '/terzi/paca-kisaltma-antalya'],
                ['Bayan Terzi Antalya', '/terzi/bayan-terzi-antalya'],
                ['Dikiş Atölyesi', '/terzi/dikis-atolyesi-antalya'],
                ['Üniforma Üretimi', '/terzi/uniforma-uretimi-antalya'],
                ['Kuru Temizleme', '/terzi/kuru-temizleme-antalya'],
                ['← Tüm Hizmetler', '/terzi'],
              ].map(([label, href], i) => (
                <Link key={i} href={href} style={{ border: '1px solid rgba(201,169,110,.15)', color: '#c9a96e', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
