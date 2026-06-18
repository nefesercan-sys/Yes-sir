import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://swaphubs.com/terzi/dikis-atolyesi-antalya';
const PARENT = 'https://swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Dikiş Atölyesi Antalya — Fason Üretim Kalıp Çıkarma 2026',
      description: "Antalya'da dikiş atölyesi. Kalıp çıkarma, numune dikimi, fason üretim, seri imalat. Markalar, butikler ve e-ticaret firmaları için tam üretim paketi.",
      provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: '+905318986418', '@id': `${PARENT}#business` },
      areaServed: { '@type': 'City', name: 'Antalya' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'SwapHubs', item:'https://www.swaphubs.com' },
        { '@type':'ListItem', position:2, name:'Antalya Terzi', item:PARENT },
        { '@type':'ListItem', position:3, name:'Dikiş Atölyesi Antalya', item:SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Dikiş atölyesi Antalya fiyatı?', acceptedAnswer:{'@type':'Answer', text:`Kalıp çıkarma, numune ve fason üretim fiyatları proje bazlı belirlenmektedir. WhatsApp: ${PHONE}`}},
        { '@type':'Question', name:'Fason üretim Antalya minimum adet?', acceptedAnswer:{'@type':'Answer', text:'Minimum 50 adet fason üretim yapılmaktadır. Numune ve prototip tek adet kabul edilmektedir.'}},
        { '@type':'Question', name:'Marka için kıyafet üretimi Antalya?', acceptedAnswer:{'@type':'Answer', text:`Evet! Markalar, butikler ve e-ticaret firmaları için kalıp + numune + seri üretim paketi sunulmaktadır. WhatsApp: ${PHONE}`}},
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: 'Dikiş Atölyesi Antalya · Fason Üretim · Kalıp Çıkarma · Seri İmalat 2026 | Terzi Can',
  description: "Antalya dikiş atölyesi: kalıp çıkarma, numune dikimi, fason üretim, seri imalat. Markalar, butikler, e-ticaret için tam paket. ☎ +90 531 898 64 18",
  keywords: [
    'dikiş atölyesi Antalya', 'fason üretim Antalya', 'kalıp çıkarma Antalya',
    'seri imalat kıyafet Antalya', 'numune dikimi Antalya', 'butik üretim Antalya',
    'marka kıyafet üretimi Antalya', 'tekstil üretimi Antalya', 'konfeksiyon Antalya',
    'sweatshirt üretimi Antalya', 'nakış atölyesi Antalya',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Dikiş Atölyesi Antalya · Fason Üretim · Kalıp · Seri İmalat',
    description: "Kalıp çıkarma, numune, fason üretim. Markalar için tam paket. ☎ +90 531 898 64 18",
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true },
};

const HIZMETLER = [
  { ic: '📐', baslik: 'Kalıp Çıkarma', aciklama: 'Tasarım dosyasından veya örnekten teknik kalıp çıkarma. Beden serisine göre gradaj (çoğaltma).' },
  { ic: '🧵', baslik: 'Numune Dikimi', aciklama: 'Prototip ve onay numunesi dikimi. Tek adet sipariş kabul edilir.' },
  { ic: '✂️', baslik: 'Fason Üretim', aciklama: 'Minimum 50 adet fason kıyafet üretimi. Kesim + dikim + overlok + ütü + paket.' },
  { ic: '🏭', baslik: 'Seri İmalat', aciklama: 'Büyük miktarlı seri üretim. Hız ve kalite garantisi.' },
  { ic: '🪡', baslik: 'Nakış & Baskı', aciklama: 'Logo nakışı, isim baskısı, serigrafi, dijital baskı hizmetleri.' },
  { ic: '📦', baslik: 'Paketleme', aciklama: 'Ütülü, etiketli ve ambalajlı teslim. E-ticaret için hazır paket.' },
];

export default function DikisAtölyesiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: "'Jost',system-ui,sans-serif", background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#7A6E62', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}<Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}<span>Dikiş Atölyesi Antalya</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4rem 1.5rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=70') center/cover", opacity: .1 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              🏭 Terzi Can · Antalya · Dikiş Atölyesi
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Dikiş Atölyesi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Fason Üretim · Kalıp · Seri İmalat 2026</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '620px', marginBottom: '1.5rem' }}>
              Markalar, butikler ve e-ticaret firmaları için <strong style={{ color: '#fff' }}>kalıp çıkarma, numune dikimi,
              fason üretim ve seri imalat</strong> hizmetleri. Minimum 50 adet. Nakış ve paketleme dahil.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, fason üretim için teklif almak istiyorum. Ürün: ')} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#fff', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                🏭 Fason Teklifi Al
              </a>
              <a href="tel:+905318986418" style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '.9rem 1.6rem', textDecoration: 'none', fontSize: '.85rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Atölye Hizmetleri</h2>
            <p style={{ color: '#7A6E62', fontSize: '.88rem', marginBottom: '2rem' }}>Üretimin her aşamasında yanınızdayız</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
              {HIZMETLER.map(({ ic, baslik, aciklama }) => (
                <div key={baslik} style={{ background: '#F2EDE4', border: '1px solid rgba(184,151,90,.15)', borderLeft: '3px solid #B8975A', padding: '1.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '.6rem' }}>{ic}</div>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.05rem', color: '#1C1814', marginBottom: '.5rem', fontWeight: 600 }}>{baslik}</h3>
                  <p style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>Kimler İçin?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem' }}>
              {[
                ['🏪','Butik & Markalar','Kendi koleksiyonunu ürettirmek isteyen tasarımcı ve markalar'],
                ['🛍️','E-Ticaret Firmaları','Amazon, Trendyol, Hepsiburada satıcıları için ürün üretimi'],
                ['🏋️','Spor Kulüpleri','Forma, antrenman kıyafeti, takım üniforması üretimi'],
                ['🏨','Kurumsal Firmalar','Otel, restoran, AVM, fabrika iş elbisesi üretimi'],
              ].map(([ic,t,d])=>(
                <div key={t as string} style={{ background: '#fff', padding: '1.4rem', borderTop: '2px solid rgba(184,151,90,.3)' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '.6rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#1C1814', marginBottom: '.4rem', fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: '.78rem', color: '#7A6E62', lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Dikiş Atölyesi SSS</h2>
            {[
              ['Fason üretim Antalya minimum adet nedir?', 'Minimum 50 adet fason üretim yapılmaktadır. Numune ve prototip tek adet kabul edilir.'],
              ['Kalıp çıkarma hizmeti var mı?', `Evet! Tasarım dosyası veya referans üründen teknik kalıp çıkarma yapılmaktadır. WhatsApp: ${PHONE}`],
              ['Sweatshirt ve eşofman üretimi yapılıyor mu?', `Evet! Sweatshirt, eşofman, polo yaka, kapüşonlu üretimi yapılmaktadır. Nakış ve baskı dahil. WhatsApp: ${PHONE}`],
              ['E-ticaret için ürün üretimi yapılıyor mu?', `Evet! Trendyol, Amazon, Hepsiburada satıcıları için kıyafet üretimi yapılmaktadır. WhatsApp: ${PHONE}`],
              ['Teslimat süresi ne kadar?', 'Numune onayından sonra seri imalat 15–30 iş günüdür. Büyük siparişler için proje planı yapılır.'],
            ].map(([q,a],i)=>(
              <details key={i} style={{ borderBottom: '1px solid rgba(184,151,90,.1)', padding: '.8rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.92rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#B8975A' }}>+</span>
                </summary>
                <p style={{ marginTop: '.7rem', fontSize: '.84rem', color: '#7A6E62', lineHeight: 1.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ background: '#B8975A', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#fff', marginBottom: '.7rem' }}>Fason Üretim Teklifi Alın</h2>
          <p style={{ color: 'rgba(255,255,255,.9)', marginBottom: '1.8rem', fontSize: '.92rem' }}>
            Ürün ve adet bilgisini gönderin — 24 saat içinde fiyat teklifi
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, fason üretim için teklif almak istiyorum. Ürün ve adet: ')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp — Teklif İste
            </a>
            <a href="tel:+905318986418" style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
        </section>

        <section style={{ padding: '2rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>Diğer Hizmetler</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[['Üniforma Üretimi','/terzi/uniforma-uretimi-antalya'],['Bay Terzi','/terzi/bay-terzi-antalya'],['Bayan Terzi','/terzi/bayan-terzi-antalya'],['← Tüm Hizmetler','/terzi']].map(([l,h])=>(
                <Link key={l} href={h} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>{l}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
