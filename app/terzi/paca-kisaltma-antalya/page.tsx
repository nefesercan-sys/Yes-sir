import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/paca-kisaltma-antalya';
const PARENT_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Merhaba, paça kısaltma hizmeti için fiyat almak istiyorum.')}`;
const TODAY = new Date().toISOString().split('T')[0];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Paça Kısaltma Antalya — Pantolon Kısaltma',
      alternateName: ['Pantolon Kısaltma Antalya', 'Paça Kısaltma Fiyatı Antalya', 'Trouser Hemming Antalya'],
      description: "Antalya'da paça kısaltma ve pantolon kısaltma hizmeti. Kot paça ₺150, kumaş pantolon ₺175. Bay ve bayan. Aynı gün ve 24 saat ekspres. Eve ve otele gelen terzi servisi.",
      provider: {
        '@type': 'ClothingStore',
        '@id': `${PARENT_URL}#business`,
        name: 'Terzi Can',
        telephone: PHONE_E164,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Konyaaltı',
          addressRegion: 'Antalya',
          addressCountry: 'TR',
        },
      },
      areaServed: { '@type': 'City', name: 'Antalya' },
      offers: {
        '@type': 'Offer',
        price: '150',
        priceCurrency: 'TRY',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '150',
          maxPrice: '250',
          priceCurrency: 'TRY',
        },
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Paça Kısaltma Antalya · Pantolon Kısaltma ₺150 · Aynı Gün · Terzi Can',
      url: SITE_URL,
      description: "Antalya'da paça kısaltma ve pantolon kısaltma. Kot paça ₺150, kumaş pantolon ₺175. Bay & bayan. Aynı gün teslim. Eve ve otele gelen terzi servisi. ☎ " + PHONE,
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
        { '@type': 'ListItem', position: 3, name: 'Paça Kısaltma Antalya', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya paça kısaltma fiyatı ne kadar? 2025-2026',
          acceptedAnswer: { '@type': 'Answer', text: `Antalya'da paça kısaltma fiyatımız kot pantolon için ₺150, kumaş pantolon için ₺175'ten başlar. Etek kısaltma ₺150'den başlar. WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Paça kısaltma aynı gün yapılır mı?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, paça kısaltma genellikle aynı gün veya 24 saat içinde teslim edilir. Ekspres servis için WhatsApp üzerinden iletişime geçin.' },
        },
        {
          '@type': 'Question',
          name: 'Eve gelen terzi paça kısaltma yapıyor mu?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet! Araçlı terzi servisimizle tüm Antalya'ya gelip paça kısaltma yapıyoruz. Otel, ev, işyeri — fark etmez. WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Pantolon kısaltma ile paça kısaltma aynı şey mi?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, pantolon kısaltma ve paça kısaltma aynı işlemdir. Pantolonun bacak uzunluğunu kısaltma işlemidir. Aynı fiyat geçerlidir.' },
        },
        {
          '@type': 'Question',
          name: 'Etek kısaltma fiyatı Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: `Etek kısaltma ₺150'den başlar. Fiyat, etkinin modeline ve uzunluğuna göre değişir. Fotoğraf gönderin, hemen fiyat verelim. WhatsApp: ${PHONE}` },
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'Paça Kısaltma Nasıl Yapılır? — Terzi Can Antalya',
      totalTime: 'PT30M',
      step: [
        { '@type': 'HowToStep', name: 'Fotoğraf Gönderin', text: `Pantolonun fotoğrafını ve ne kadar kısaltmak istediğinizi WhatsApp ${PHONE} üzerinden bildirin.` },
        { '@type': 'HowToStep', name: 'Fiyat Alın', text: '30 dakika içinde kesin fiyat ve randevu saati bildirilir.' },
        { '@type': 'HowToStep', name: 'Teslim Edin veya Bizi Çağırın', text: 'Atölyemize getirin ya da araçlı terzi servisimizden yararlanın — adresinize gelelim.' },
        { '@type': 'HowToStep', name: 'Teslim Alın', text: 'Aynı gün veya 24 saat içinde eksiksiz teslim.' },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Paça Kısaltma Antalya · Pantolon Kısaltma ₺150 · Aynı Gün Teslim · Terzi Can',
  description: "Antalya'da paça kısaltma ve pantolon kısaltma hizmeti. Kot paça ₺150, kumaş pantolon ₺175, etek kısaltma ₺150. Bay & bayan. Aynı gün ekspres. Eve-otele gelen terzi. ☎ " + PHONE,
  keywords: ['paça kısaltma Antalya','pantolon kısaltma Antalya','paça kısaltma fiyatı 2026','etek kısaltma Antalya','kot paça kısaltma','paça kısaltma aynı gün','Konyaaltı paça kısaltma','eve gelen terzi paça kısaltma'],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Paça Kısaltma Antalya ₺150 · Pantolon Kısaltma · Aynı Gün · Terzi Can',
    description: "Antalya paça kısaltma ₺150'den. Bay & bayan. Aynı gün teslim. Eve-otele servis. ☎ " + PHONE,
    url: SITE_URL,
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function PacaKisaltmaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: 'system-ui,sans-serif', background: '#0d0c0a', color: '#f5f0e8', minHeight: '100vh' }}>

        {/* BREADCRUMB */}
        <nav style={{ padding: '1rem 1.5rem', fontSize: '.75rem', color: '#7a7268' }} aria-label="Breadcrumb">
          <Link href="/" style={{ color: '#c9a96e', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: '#c9a96e', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}
          <span>Paça Kısaltma Antalya</span>
        </nav>

        {/* HERO */}
        <section style={{ padding: '3rem 1.5rem 2.5rem', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ fontSize: '.7rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>
            ✦ Terzi Can · Konyaaltı, Antalya
          </div>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.2rem' }}>
            Paça Kısaltma Antalya<br />
            <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>₺150'den Başlar</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#ede7d9', lineHeight: 1.8, maxWidth: '620px', marginBottom: '2rem' }}>
            Antalya'da <strong>paça kısaltma</strong> ve <strong>pantolon kısaltma</strong> hizmeti. Kot paça ₺150, kumaş pantolon ₺175, etek kısaltma ₺150'den başlar. Bay ve bayan. Aynı gün veya 24 saat içinde teslim. Eve ve otele gelen terzi servisi.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#c9a96e', color: '#0d0c0a', padding: '.9rem 1.8rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              💬 WhatsApp'tan Fiyat Al
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
              Paça Kısaltma Fiyatları 2025–2026
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(201,169,110,.2)' }}>
                  <th style={{ textAlign: 'left', padding: '.7rem', fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#c9a96e' }}>Kıyafet Türü</th>
                  <th style={{ textAlign: 'right', padding: '.7rem', fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#c9a96e' }}>Fiyat</th>
                  <th style={{ textAlign: 'right', padding: '.7rem', fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#c9a96e' }}>Süre</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Kot Pantolon Paça Kısaltma', '₺150', 'Aynı gün'],
                  ['Kumaş Pantolon Paça Kısaltma', '₺175', '24 saat'],
                  ['Etek Kısaltma', '₺150+', '24 saat'],
                  ['Tayt / Spor Pantolon Kısaltma', '₺120+', 'Aynı gün'],
                  ['Takım Elbise Pantolonu Kısaltma', '₺200+', '24 saat'],
                  ['Abiye / Elbise Paça Kısaltma', '₺200+', '48 saat'],
                ].map(([tip, fiyat, sure], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.04)', background: i % 2 ? 'rgba(201,169,110,.02)' : 'transparent' }}>
                    <td style={{ padding: '.85rem .7rem', fontSize: '.9rem', color: '#ede7d9' }}>{tip}</td>
                    <td style={{ padding: '.85rem .7rem', fontSize: '.9rem', color: '#c9a96e', fontWeight: 600, textAlign: 'right' }}>{fiyat}</td>
                    <td style={{ padding: '.85rem .7rem', fontSize: '.8rem', color: '#7a7268', textAlign: 'right' }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: '.8rem', color: '#7a7268', marginTop: '1rem' }}>* Başlangıç fiyatlarıdır. Kesin fiyat için fotoğraf gönderin, 30 dk içinde cevap verilir.</p>
          </div>
        </section>

        {/* AÇIKLAMA İÇERİĞİ */}
        <section style={{ padding: '3.5rem 1.5rem', maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', marginBottom: '1.2rem' }}>
            Antalya'da Paça Kısaltma ve Pantolon Kısaltma Hizmeti
          </h2>
          <div style={{ fontSize: '.92rem', color: '#ede7d9', lineHeight: 1.9 }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Terzi Can</strong> olarak Antalya Konyaaltı merkezimizden tüm Antalya ilçelerine <strong>paça kısaltma</strong> ve <strong>pantolon kısaltma</strong> hizmeti veriyoruz. Bay ve bayan tüm kıyafetler için profesyonel kısaltma işlemi yapıyoruz.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Kot paça kısaltma</strong> ₺150'den başlarken <strong>kumaş pantolon kısaltma</strong> ₺175'ten başlar. <strong>Etek kısaltma</strong>, abiye paça kısaltma ve takım elbise pantolonu kısaltma da hizmetlerimiz arasındadır.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Aynı gün paça kısaltma</strong> imkânımızla tatil programınızı bozmadan kıyafetinizi teslim ediyoruz. Otelde kalan turistler için <strong>otele gelen terzi</strong> servisimiz mevcuttur — Lara, Belek, Kemer, Alanya dahil tüm Antalya'ya araçlı servis.
            </p>
            <p>
              Ölçü almak için iki yöntem kullanıyoruz: kıyafetin yanında en fazla giymek istediğiniz ayakkabıyla durup iğnelemek, ya da WhatsApp üzerinden gönderdiğiniz fotoğrafla ön ölçü alıp randevu planlamak.
            </p>
          </div>

          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', margin: '2.5rem 0 1rem', color: '#c9a96e' }}>
            Hangi Kıyafetlerin Paçası Kısaltılır?
          </h3>
          <ul style={{ fontSize: '.9rem', color: '#ede7d9', lineHeight: 2, paddingLeft: '1.2rem' }}>
            {['Kot pantolon ve jean paça kısaltma','Kumaş pantolon ve klasik pantolon kısaltma','Takım elbise pantolonu kısaltma','Etek kısaltma (düz, A-line, midi, maxi)','Tayt ve spor pantolon kısaltma','Abiye ve gece elbisesi paça kısaltma','Çocuk ve bebek pantolon kısaltma','Büyük beden pantolon kısaltma'].map((item, i) => (
              <li key={i}>✓ {item}</li>
            ))}
          </ul>

          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', margin: '2.5rem 0 1rem', color: '#c9a96e' }}>
            Hizmet Verdiğimiz Antalya İlçeleri
          </h3>
          <p style={{ fontSize: '.88rem', color: '#7a7268', lineHeight: 2 }}>
            Konyaaltı · Muratpaşa · Kepez · Lara · Belek · Kemer · Alanya · Manavgat · Side · Serik · Döşemealtı · Kaş · Finike ve tüm Antalya ilçeleri
          </p>
        </section>

        {/* FAQ */}
        <section style={{ background: '#1a1814', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', marginBottom: '2rem' }}>
              Paça Kısaltma — Sık Sorulan Sorular
            </h2>
            {[
              ['Antalya paça kısaltma fiyatı ne kadar? 2025–2026', "Kot paça kısaltma ₺150, kumaş pantolon ₺175, etek kısaltma ₺150'den başlar. Kesin fiyat için WhatsApp'tan fotoğraf gönderin, 30 dk içinde yanıt verilir."],
              ['Paça kısaltma aynı gün yapılır mı?', 'Evet. Sabah getirdiğiniz pantolonu öğleden sonra teslim alabilirsiniz. Tatilde olsanız bile ekspres servis sağlıyoruz.'],
              ['Eve veya otele gelen terzi paça kısaltma yapıyor mu?', "Evet! Konyaaltı, Lara, Belek, Kemer, Alanya dahil tüm Antalya'ya araçlı terzi servisimizle geliyoruz. WhatsApp: " + PHONE],
              ['Pantolon kısaltma ile paça kısaltma arasındaki fark nedir?', 'Aynı işlemin iki farklı adıdır. Pantolonun paça (bacak ucu) kısmı kısaltılır. Fiyat ve işlem aynıdır.'],
              ['Hem bay hem bayan pantolon kısaltma yapıyor musunuz?', 'Evet. Erkek pantolonu, kadın pantolonu, çocuk pantolonu ve büyük beden pantolon kısaltma yapıyoruz.'],
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
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', marginBottom: '1rem' }}>
            Hemen Fiyat Alın
          </h2>
          <p style={{ color: '#7a7268', marginBottom: '2rem', fontSize: '.9rem' }}>
            WhatsApp'tan fotoğraf gönderin — 30 dakika içinde fiyat ve randevu bilgisi verelim.
          </p>
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
          <p style={{ marginTop: '1.5rem', fontSize: '.8rem', color: '#7a7268' }}>
            ⭐ 4.9 / 5 · 94 Google Değerlendirmesi · 09:00–19:00 Pzt–Cmt
          </p>
        </section>

        {/* İLGİLİ SAYFALAR */}
        <section style={{ padding: '2.5rem 1.5rem', background: '#0d0c0a' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1.2rem' }}>İlgili Hizmetler</p>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
              {[
                ['Fermuar Değişimi', '/terzi'],
                ['Bay Terzi Antalya', '/terzi/bay-terzi-antalya'],
                ['Bayan Terzi Antalya', '/terzi/bayan-terzi-antalya'],
                ['Dikiş Atölyesi', '/terzi/dikis-atolyesi-antalya'],
                ['Üniforma Üretimi', '/terzi/uniforma-uretimi-antalya'],
                ['Kuru Temizleme', '/terzi/kuru-temizleme-antalya'],
                ['← Tüm Hizmetler', '/terzi'],
              ].map(([label, href], i) => (
                <Link key={i} href={href}
                  style={{ border: '1px solid rgba(201,169,110,.15)', color: '#c9a96e', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px' }}>
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
