import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/bayan-terzi-antalya';
const PARENT_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Merhaba, kadın kıyafeti için terzi hizmeti almak istiyorum.')}`;
const TODAY = new Date().toISOString().split('T')[0];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Bayan Terzi Antalya — Kadın Elbise Dikimi ve Tadilatı',
      alternateName: ['Kadın Terzi Antalya', 'Kadın Elbise Dikimi Antalya', "Women's Tailor Antalya", 'Elbise Dikimi Antalya'],
      description: "Antalya bayan terzisi. Kadın elbise dikimi, bluz dikimi, etek kısaltma, elbise daraltma, abiye tamiri, gelinlik tadilatı, büyük beden bayan kıyafeti. Özel ölçü.",
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
      name: 'Bayan Terzi Antalya · Kadın Elbise Dikimi · Abiye Tamiri · Gelinlik Tadilatı · Terzi Can',
      url: SITE_URL,
      description: "Antalya bayan terzisi. Kadın elbise dikimi ₺600, etek kısaltma ₺150, abiye tamiri ₺350, gelinlik tadilatı ₺500. Büyük beden, bebek elbisesi. Eve-otele servis. ☎ " + PHONE,
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
        { '@type': 'ListItem', position: 3, name: 'Bayan Terzi Antalya', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Bayan terzi Antalya — kadın elbise dikimi fiyatı?',
          acceptedAnswer: { '@type': 'Answer', text: `Kadın elbise dikimi ₺600'den, bluz dikimi ₺400'den, etek dikimi ₺350'den başlar. WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Abiye tamiri ve kısaltma Antalya fiyatı?',
          acceptedAnswer: { '@type': 'Answer', text: `Abiye tamiri ₺350'den, abiye kısaltma ₺200'den başlar. Mezuniyet ve düğün sezonunda ekspres 24 saatte yapılır. WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Gelinlik tadilatı Antalya fiyatı?',
          acceptedAnswer: { '@type': 'Answer', text: `Gelinlik tadilatı ₺500'den başlar. Daraltma, kısaltma, omuz düzeltme. Nisan–Ekim düğün sezonunda ekspres randevu. WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Büyük beden bayan kıyafeti dikimi yapıyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet. Büyük beden elbise, pantolon, gömlek dikimi yapıyoruz. Beden seti çıkarma ve özel kalıp hizmeti mevcuttur.' },
        },
        {
          '@type': 'Question',
          name: 'Etek kısaltma Antalya fiyatı?',
          acceptedAnswer: { '@type': 'Answer', text: `Etek kısaltma ₺150'den başlar. Düz etek, A-line, midi, maxi etek kısaltma yapılır. Aynı gün teslim mümkündür. WhatsApp: ${PHONE}` },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Bayan Terzi Antalya · Kadın Elbise Dikimi · Abiye Tamiri · Gelinlik Tadilatı · Terzi Can',
  description: "Antalya bayan terzisi. Kadın elbise dikimi ₺600, etek kısaltma ₺150, abiye tamiri ₺350, gelinlik tadilatı ₺500. Büyük beden, bebek elbisesi. Eve-otele gelen terzi. ☎ " + PHONE,
  keywords: ['bayan terzi Antalya','kadın terzi Antalya','kadın elbise dikimi Antalya','etek kısaltma Antalya','abiye tamiri Antalya','gelinlik tadilatı Antalya','elbise daraltma Antalya','büyük beden bayan dikimi','bluz dikimi Antalya'],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Bayan Terzi Antalya · Elbise Dikimi · Abiye · Gelinlik · Terzi Can',
    description: "Antalya bayan terzisi. Elbise ₺600, abiye tamiri ₺350, gelinlik tadilatı ₺500. ☎ " + PHONE,
    url: SITE_URL,
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function BayanTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: 'system-ui,sans-serif', background: '#0d0c0a', color: '#f5f0e8', minHeight: '100vh' }}>

        <nav style={{ padding: '1rem 1.5rem', fontSize: '.75rem', color: '#7a7268' }}>
          <Link href="/" style={{ color: '#c9a96e', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#c9a96e', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}
          <span>Bayan Terzi Antalya</span>
        </nav>

        <section style={{ padding: '3rem 1.5rem 2.5rem', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ fontSize: '.7rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>
            👗 Bayan Terzi · Kadın Kıyafet Uzmanı
          </div>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.2rem' }}>
            Bayan Terzi Antalya<br />
            <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Kadın Elbise Dikimi & Tadilatı</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#ede7d9', lineHeight: 1.8, maxWidth: '640px', marginBottom: '2rem' }}>
            Antalya'nın deneyimli <strong>bayan terzisi</strong> Terzi Can. Kadın elbise dikimi, bluz dikimi, etek dikimi ve kısaltma, elbise daraltma, abiye tamiri, gelinlik tadilatı, nişan elbisesi, büyük beden bayan kıyafeti, bebek ve çocuk kıyafeti dikimi.
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

        <section style={{ background: '#1a1814', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#c9a96e', marginBottom: '1.5rem' }}>
              Bayan Terzi Fiyatları 2025–2026
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
                  ['Etek / Paça Kısaltma', '₺150+', 'Aynı gün'],
                  ['Elbise Daraltma', '₺200+', '48 saat'],
                  ['Abiye Tamiri ve Kısaltma', '₺350+', '48 saat'],
                  ['Gelinlik Tadilatı', '₺500+', '3–5 gün'],
                  ['Nişan Elbisesi Tadilatı', '₺300+', '48 saat'],
                  ['Kadın Elbise Dikimi', '₺600+', '3–7 gün'],
                  ['Bluz Dikimi', '₺400+', '3–5 gün'],
                  ['Etek Dikimi', '₺350+', '3–5 gün'],
                  ['Büyük Beden Elbise Dikimi', '₺700+', '5–7 gün'],
                  ['Bebek / Çocuk Elbisesi Dikimi', '₺200+', '3–5 gün'],
                  ['Fermuar Değişimi', '₺120+', 'Aynı gün'],
                  ['Yırtık Onarımı', '₺100+', 'Aynı gün'],
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

        <section style={{ padding: '3.5rem 1.5rem', maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', marginBottom: '1.2rem' }}>
            Antalya Bayan Terzisi — Kadın Kıyafet Hizmetleri
          </h2>
          <div style={{ fontSize: '.92rem', color: '#ede7d9', lineHeight: 1.9 }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Terzi Can</strong>, Antalya'nın deneyimli <strong>bayan terzisi</strong> olarak kadın kıyafetinin her alanında hizmet vermektedir. <strong>Kadın elbise dikimi</strong>, <strong>abiye tamiri</strong>, <strong>gelinlik tadilatı</strong>, etek kısaltma ve büyük beden bayan kıyafeti dikimi yapılmaktadır.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Gelinlik tadilatı</strong> için Nisan–Ekim düğün sezonunda ekspres randevu mevcuttur. <strong>Abiye tamiri</strong> ve kısaltma, mezuniyet sezonunda (Mayıs–Haziran) 24 saat içinde teslim edilebilmektedir.
            </p>
            <p>
              <strong>Eve gelen bayan terzi</strong> servisimizle Konyaaltı, Lara, Belek, Kemer ve tüm Antalya'ya geliyoruz. Otel odanıza kadar ölçü alıp kıyafetinizi teslim ediyoruz.
            </p>
          </div>

          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', margin: '2.5rem 0 1rem', color: '#c9a96e' }}>
            Tüm Bayan Terzi Hizmetleri
          </h3>
          <ul style={{ fontSize: '.9rem', color: '#ede7d9', lineHeight: 2.1, paddingLeft: '1.2rem' }}>
            {[
              'Kadın elbise dikimi (özel ölçü, her model)',
              'Bluz ve üst giyim dikimi',
              'Etek dikimi (düz, A-line, midi, maxi, mini)',
              'Etek kısaltma ve paça kısaltma',
              'Elbise daraltma ve genişletme',
              'Abiye tamiri, kısaltma ve tadilatı',
              'Gelinlik dikimi ve gelinlik tadilatı',
              'Nişan elbisesi dikimi ve tadilatı',
              'Kına kıyafeti dikimi',
              'Büyük beden bayan kıyafeti dikimi',
              'Bebek elbisesi ve çocuk kıyafeti dikimi',
              'Fermuar değişimi ve yırtık onarımı',
            ].map((item, i) => (
              <li key={i}>✓ {item}</li>
            ))}
          </ul>
        </section>

        <section style={{ background: '#1a1814', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', marginBottom: '2rem' }}>
              Bayan Terzi — Sık Sorulan Sorular
            </h2>
            {[
              ['Kadın elbise dikimi Antalya fiyatı?', "Kadın elbise dikimi ₺600'den, bluz dikimi ₺400'den, etek dikimi ₺350'den başlar. Kendi kumaşınızla veya stoğumuzdan dikilir. WhatsApp: " + PHONE],
              ['Abiye tamiri ve kısaltma Antalya?', "Abiye tamiri ₺350'den, kısaltma ₺200'den başlar. Mezuniyet ve düğün sezonunda 24 saat ekspres. WhatsApp: " + PHONE],
              ['Gelinlik tadilatı kaç lira?', "Gelinlik tadilatı ₺500'den başlar. Daraltma, kısaltma, omuz düzeltme dahil. Nisan–Ekim düğün sezonunda ekspres randevu. WhatsApp: " + PHONE],
              ['Büyük beden elbise dikimi yapıyor musunuz?', 'Evet. Büyük beden elbise, etek, bluz dikimi yapıyoruz. Özel kalıp ve beden seti çıkarma hizmeti mevcuttur.'],
              ['Bebek ve çocuk kıyafeti dikimi yapılıyor mu?', 'Evet. Bebek elbisesi, çocuk kıyafeti, okul kostümü dikiyoruz. Anne grupları için toplu sipariş indirimi.'],
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

        <section style={{ padding: '3.5rem 1.5rem', textAlign: 'center', background: '#252320' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', marginBottom: '1rem' }}>Bayan Terzi Randevusu Al</h2>
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
                ['Bay Terzi Antalya', '/terzi/bay-terzi-antalya'],
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
