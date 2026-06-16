import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/dikis-atolyesi-antalya';
const PARENT_URL = 'https://swaphubs.com/terzi';
const HOME_URL = 'https://swaphubs.com';
const PHONE = '+90 531 898 64 18';
const PHONE_E164 = '+905318986418';
const WA_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Merhaba, dikiş atölyesi ve fason üretim için teklif almak istiyorum.')}`;
const TODAY = new Date().toISOString().split('T')[0];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Dikiş Atölyesi Antalya — Fason Üretim, Kalıp, Seri İmalat',
      alternateName: ['Fason Üretim Antalya', 'Seri İmalat Antalya', 'Kalıp Çıkarma Antalya', 'Konfeksiyon Antalya'],
      description: "Antalya dikiş atölyesi. Kalıp çıkarma, fason üretim, seri imalat, numune dikimi, prototip üretimi. Markalar, butikler ve e-ticaret firmaları için tam üretim paketi.",
      provider: {
        '@type': 'ClothingStore',
        '@id': `${PARENT_URL}#business`,
        name: 'Terzi Can',
        telephone: PHONE_E164,
      },
      areaServed: { '@type': 'City', name: 'Antalya' },
      offers: { '@type': 'Offer', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Dikiş Atölyesi Antalya · Fason Üretim · Kalıp · Seri İmalat · Terzi Can',
      url: SITE_URL,
      description: "Antalya dikiş atölyesi. Kalıp çıkarma, fason üretim, seri imalat, numune dikimi. Markalar ve e-ticaret için tam üretim paketi. Nakış, logo baskı. ☎ " + PHONE,
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
        { '@type': 'ListItem', position: 3, name: 'Dikiş Atölyesi Antalya', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Antalya dikiş atölyesi fason üretim fiyatı?',
          acceptedAnswer: { '@type': 'Answer', text: `Fason üretim fiyatı adet, model ve kumaşa göre değişir. Numune üretimi ve teklif için WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Kalıp çıkarma ve model tasarımı yapıyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet. Kalıp çıkarma, gradaj, model tasarımı ve teknik çizim hizmetleri mevcuttur. Kendi tasarımınızı getirebilir ya da bizim tasarımcımızla çalışabilirsiniz.' },
        },
        {
          '@type': 'Question',
          name: 'Minimum kaç adet siparişten fason üretim yapılır?',
          acceptedAnswer: { '@type': 'Answer', text: `Minimum adet ürüne göre değişir. Küçük seriler ve numune üretimi için WhatsApp: ${PHONE}` },
        },
        {
          '@type': 'Question',
          name: 'Sweatshirt ve eşofman seri üretimi yapıyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: `Evet. Sweatshirt, eşofman, kapüşonlu, polo yaka seri üretimi yapıyoruz. Nakış ve baskı da dahildir. WhatsApp: ${PHONE}` },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: 'Dikiş Atölyesi Antalya · Fason Üretim · Kalıp · Seri İmalat · Terzi Can',
  description: "Antalya dikiş atölyesi. Kalıp çıkarma, fason üretim, seri imalat, numune dikimi, prototip. Markalar, butikler, e-ticaret için tam üretim paketi. Nakış, baskı. ☎ " + PHONE,
  keywords: ['dikiş atölyesi Antalya','fason üretim Antalya','kalıp çıkarma Antalya','seri imalat Antalya','numune dikimi Antalya','konfeksiyon Antalya','sweatshirt seri üretim','eşofman dikimi Antalya','nakış Antalya'],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Dikiş Atölyesi Antalya · Fason Üretim · Seri İmalat · Terzi Can',
    description: "Antalya dikiş atölyesi. Fason üretim, kalıp, seri imalat. Markalar için tam paket. ☎ " + PHONE,
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function DikisAtolye() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: 'system-ui,sans-serif', background: '#0d0c0a', color: '#f5f0e8', minHeight: '100vh' }}>
        <nav style={{ padding: '1rem 1.5rem', fontSize: '.75rem', color: '#7a7268' }}>
          <Link href="/" style={{ color: '#c9a96e', textDecoration: 'none' }}>SwapHubs</Link>{' › '}
          <Link href="/terzi" style={{ color: '#c9a96e', textDecoration: 'none' }}>Antalya Terzi</Link>{' › '}
          <span>Dikiş Atölyesi Antalya</span>
        </nav>

        <section style={{ padding: '3rem 1.5rem 2.5rem', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ fontSize: '.7rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>🏭 Dikiş Atölyesi · Fason & Seri Üretim</div>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.2rem' }}>
            Dikiş Atölyesi Antalya<br />
            <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Fason Üretim & Seri İmalat</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#ede7d9', lineHeight: 1.8, maxWidth: '640px', marginBottom: '2rem' }}>
            Antalya'da <strong>dikiş atölyesi</strong> hizmetleri. Kalıp çıkarma, model tasarımı, kesim, dikim, ütü ve paketleme. Numune dikimi, prototip üretimi, <strong>fason üretim</strong> ve <strong>seri imalat</strong>. Markalar, butikler ve e-ticaret firmaları için tam üretim paketi.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#c9a96e', color: '#0d0c0a', padding: '.9rem 1.8rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              💬 Teklif Al
            </a>
            <a href={`tel:${PHONE_E164}`}
              style={{ border: '1px solid rgba(201,169,110,.3)', color: '#f5f0e8', padding: '.9rem 1.8rem', textDecoration: 'none', fontSize: '.85rem' }}>
              📞 {PHONE}
            </a>
          </div>
        </section>

        <section style={{ background: '#1a1814', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#c9a96e', marginBottom: '1.5rem' }}>Atölye Hizmetleri</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
              {[
                ['📐', 'Kalıp & Tasarım', 'Kalıp çıkarma, gradaj, model tasarımı, teknik çizim. Kendi tasarımınız veya bizim ekibimizle.'],
                ['✂️', 'Numune & Prototip', 'Ürününüzün ilk örneğini ve prototipini üretiyoruz. Onay sonrası seri üretime geçilir.'],
                ['🏭', 'Seri İmalat', 'Kesim, dikim, ütü, paketleme. Kalite kontrol dahil. Küçük serilerden büyük hacimlere.'],
                ['🪡', 'Nakış & Baskı', 'Logo nakışı, isim nakışı, dijital baskı, serigrafi. Sweatshirt ve tekstil ürünleri için.'],
                ['👕', 'Sweatshirt & Eşofman', 'Sweatshirt, eşofman, kapüşonlu, polo yaka seri üretimi. Nakış ve baskıyla kişiselleştirme.'],
                ['📦', 'Tam Paket', 'Tasarım → kalıp → üretim → etiket → paketleme. Markalar için anahtar teslim çözüm.'],
              ].map(([ic, title, desc], i) => (
                <div key={i} style={{ background: 'rgba(201,169,110,.04)', border: '1px solid rgba(201,169,110,.1)', borderRadius: '6px', padding: '1.4rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '.6rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#c9a96e', marginBottom: '.5rem' }}>{title}</div>
                  <div style={{ fontSize: '.82rem', color: '#ede7d9', lineHeight: 1.7 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '3.5rem 1.5rem', maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', marginBottom: '1.2rem' }}>Antalya Dikiş Atölyesi</h2>
          <div style={{ fontSize: '.92rem', color: '#ede7d9', lineHeight: 1.9 }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Terzi Can dikiş atölyesi</strong> olarak Antalya'da faaliyet gösteren markalar, butikler ve e-ticaret firmalarına <strong>fason üretim</strong> ve <strong>seri imalat</strong> hizmeti veriyoruz. Kalıp çıarmadan pakete kadar tüm üretim sürecini tek elden yönetiyoruz.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Sweatshirt seri üretimi</strong>, <strong>eşofman dikimi</strong>, polo yaka ve kapüşonlu üretimi uzmanlık alanlarımız arasındadır. Logo nakışı ve baskı ile kişiselleştirme de atölyemizde yapılmaktadır.
            </p>
            <p>
              Kendi tasarımınızı getirebilir ya da tasarım ekibimizle birlikte çalışabilirsiniz. Numune onayı sonrası seri üretime geçilir, kalite kontrol dahildir.
            </p>
          </div>
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', margin: '2.5rem 0 1rem', color: '#c9a96e' }}>Üretim Süreci</h3>
          <ol style={{ fontSize: '.9rem', color: '#ede7d9', lineHeight: 2.2, paddingLeft: '1.4rem' }}>
            {['Fikir ve tasarım görüşmesi','Kalıp çıkarma ve gradaj','Numune / prototip üretimi','Müşteri onayı','Seri imalat (kesim, dikim, ütü)','Kalite kontrol','Etiketleme ve paketleme','Teslimat'].map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </section>

        <section style={{ background: '#1a1814', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.7rem', marginBottom: '2rem' }}>Dikiş Atölyesi — Sık Sorulan Sorular</h2>
            {[
              ['Minimum kaç adet siparişten fason üretim yapılır?', 'Minimum adet ürüne ve modele göre değişir. Tek numune ve küçük seriler de kabul edilmektedir. WhatsApp üzerinden görüşelim.'],
              ['Kalıp çıkarma ve model tasarımı hizmeti var mı?', 'Evet. Kalıp çıkarma, gradaj, model tasarımı ve teknik çizim yapılmaktadır. Kendi tasarımınızla veya ekibimizle çalışabilirsiniz.'],
              ['Sweatshirt seri üretimi fiyatı nedir?', 'Fiyat adet, kumaş ve baskı/nakış tercihine göre değişir. Teklif için fotoğraf ve adet bilgisiyle WhatsApp: ' + PHONE],
              ['Nakış ve logo baskı da yapılıyor mu?', 'Evet. Logo nakışı, isim nakışı, dijital baskı, serigrafi yapılmaktadır. Tüm tekstil ürünlerine uygulanır.'],
              ['Üretim ne kadar sürer?', 'Numune üretimi 3–7 gün, seri üretim adete ve modele göre değişmektedir. İlk görüşmede kesin süre bildirilir.'],
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
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', marginBottom: '1rem' }}>Üretim Teklifi Alın</h2>
          <p style={{ color: '#7a7268', marginBottom: '2rem', fontSize: '.9rem' }}>Ürün, adet ve kumaş bilgisiyle WhatsApp yazın — hızlıca teklif hazırlayalım.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.9rem', borderRadius: '4px' }}>
              💬 WhatsApp ile Teklif Al
            </a>
            <a href={`tel:${PHONE_E164}`}
              style={{ border: '1px solid rgba(201,169,110,.3)', color: '#f5f0e8', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.9rem', borderRadius: '4px' }}>
              📞 Ara
            </a>
          </div>
        </section>

        <section style={{ padding: '2.5rem 1.5rem', background: '#0d0c0a' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1.2rem' }}>İlgili Hizmetler</p>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
              {[
                ['Bay Terzi Antalya', '/terzi/bay-terzi-antalya'],
                ['Bayan Terzi Antalya', '/terzi/bayan-terzi-antalya'],
                ['Üniforma Üretimi', '/terzi/uniforma-uretimi-antalya'],
                ['Paça Kısaltma', '/terzi/paca-kisaltma-antalya'],
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
