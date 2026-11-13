import type { Metadata } from 'next';
import ReviewsBlock from '@/components/ReviewsBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import Link from 'next/link';
import { jsonLdString, faqPageSchema } from '@/lib/json-ld';

const SITE_URL = 'https://swaphubs.com/terzi/bay-terzi-antalya';
const PARENT = 'https://swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;

// SSS: görünür liste ve FAQPage şeması bu tek diziden beslenir.
const FAQ: [string, string][] = [
  ['Bay terzi Antalya fiyatları 2026?', `Pantolon kısaltma ve bel daraltma ₺200'den, fermuar değişimi ₺300'den başlar. Takım elbise, gömlek, blazer ve smoking dikiminde fiyat fotoğrafa ve istediğiniz modele göre belirlenir; fotoğraf gönderin, fiyatı söyleyelim. WhatsApp: ${PHONE}`],
  ['Erkek takım elbise dikimi Antalya?', `Evet! Ölçüye özel erkek takım elbise dikimi yapılır; fiyat fotoğrafa ve istediğiniz modele göre belirlenir, süre modele ve adede göre değişir. Kumaş seçimi, kalıp çıkarma ve dikim tek elden. WhatsApp: ${PHONE}`],
  ['Damatlık dikimi Antalya fiyatı?', `Damatlık (takım elbise) dikiminde fiyat sabit değildir; fotoğrafa ve istediğiniz modele göre belirlenir. Özel kumaş ve aksesuar seçimi yapılabilir. Düğün sezonunda (Nisan–Ekim) önce randevu alın. WhatsApp: ${PHONE}`],
  ['Erkek gömlek dikimi Antalya kaç lira?', `Erkek gömlek dikiminde fiyat fotoğrafa ve istediğiniz modele göre belirlenir; ölçüye göre kişiselleştirme mevcuttur. Fotoğraf gönderin, fiyatı söyleyelim. WhatsApp: ${PHONE}`],
  ['Erkek kıyafet tadilatı Antalya?', 'Evet. Pantolon kısaltma, ceket tadilatı, ceket kol kısaltma, bel alma, fermuar değişimi. Aynı gün teslim; acilse 1–2 saat.'],
  ['Erkek kıyafet tadilatı otele geliyor mu?', `Evet! Eve ve otele alım-teslim yapıyoruz. WhatsApp: ${PHONE}`],
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Bay Terzi Antalya — Erkek Takım Elbise Dikimi Fiyatları 2026',
      description: "Antalya'da bay terzi: pantolon kısaltma ₺200, fermuar ₺300. Erkek takım elbise, gömlek, smoking ve damatlık dikimi fotoğrafa ve istediğiniz modele göre fiyatlanır. Eve ve otele alım-teslim.",
      provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: '+905318986418', '@id': `${PARENT}#business` },
      areaServed: ['Antalya','Konyaaltı','Belek','Lara','Kemer'].map(name=>({'@type':'City',name})),
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '200',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'SwapHubs', item:'https://swaphubs.com' },
        { '@type':'ListItem', position:2, name:'Antalya Terzi', item:PARENT },
        { '@type':'ListItem', position:3, name:'Bay Terzi Antalya', item:SITE_URL },
      ],
    },
    faqPageSchema(FAQ),
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),
  title: { absolute: 'Bay Terzi Antalya · Tamir, Tadilat · +90 531 898 64 18' },
  description: "Terziye sor: +90 531 898 64 18 · Antalya bay terzi: pantolon paça kısaltma ₺200, fermuar değişimi, söküğü dikme, takım elbise ve gömlek dikimi. Eve servis.",
  keywords: [
    'erkek tamir tadilat Antalya', 'erkek pantolon fermuar değişimi Antalya', 'erkek söküğü dikme Antalya', 'bay terzi Antalya', 'erkek terzi Antalya', 'erkek takım elbise dikimi Antalya',
    'damatlık dikimi Antalya', 'smoking dikimi Antalya', 'erkek gömlek dikimi Antalya',
    'pantolon kısaltma Antalya', 'erkek ceket tadilatı Antalya', 'bay terzi fiyatları 2026',
    'erkek kıyafet tadilatı Antalya', 'takım elbise dikimi Antalya fiyatı',
    'men tailor Antalya', 'bespoke suit Antalya',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Bay Terzi Antalya · Erkek Takım Elbise · Pantolon Kısaltma',
    description: "Terziye sor: +90 531 898 64 18 · Pantolon kısaltma ₺200'den; takım elbise dikimi fotoğrafa ve istediğiniz modele göre. Eve gelen terzi. Konyaaltı ve çevresi.",
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
};

const FIYATLAR = [
  ['Pantolon / Paça Kısaltma', '₺200', 'Aynı gün'],
  ['Pantolon Bel Daraltma', '₺200', 'Aynı gün'],
  ['Ceket Kol Kısaltma', '₺200', 'Aynı gün'],
  ['Ceket Beden Küçültme', 'Fotoğrafa göre', 'Aynı gün'],
  ['Erkek Pantolon Dikimi', 'Fotoğrafa ve istediğiniz modele göre', 'Modele ve adede göre'],
  ['Damatlık / Takım Elbise Dikimi', 'Fotoğrafa ve istediğiniz modele göre', 'Modele ve adede göre'],
  ['Araçlı Servis', 'WhatsApp\'ta netleşir', '—'],
];

const s = { fontFamily: "'Jost',system-ui,sans-serif" as const };

export default function BayTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <main style={{ ...s, background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <SpeakableSchema path="/terzi/bay-terzi-antalya" />
        <QuickActionBanner lang="tr" service="bay" />

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#6B5F53', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}<Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}<span>Bay Terzi Antalya</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4rem 1.5rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('/gorseller/kalip-ve-makas.webp') center/cover", opacity: .1 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              👔 Terzi Can · Antalya · Bay Terzi Uzmanı
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Bay Terzi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Erkek Takım Elbise · Gömlek · Pantolon 2026</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              Pantolon kısaltma <strong style={{ color: '#D4B07A' }}>₺200</strong> ·
              <strong style={{ color: '#fff' }}> Eve ve otele gelen terzi servisi</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', maxWidth: '700px', marginBottom: '1.5rem' }}>
              {[['Pantolon Kısaltma','₺200'],].map(([n,p])=>(
                <div key={n} style={{ background: 'rgba(255,255,255,.04)', padding: '.9rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.5)', marginBottom: '.2rem' }}>{n}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.2rem', color: '#D4B07A', fontWeight: 700 }}>{p}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, erkek kıyafeti için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#1C1814', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                💬 Fotoğraf Gönder → Fiyat Al
              </a>
              <a href="tel:+905318986418" style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '.9rem 1.6rem', textDecoration: 'none', fontSize: '.85rem' }}>
                <span className="ico-tel" aria-hidden="true" /> {PHONE}
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Bay Terzi Fiyat Listesi 2026</h2>
            <p style={{ color: '#6B5F53', fontSize: '.88rem', marginBottom: '1.8rem' }}>Başlangıç fiyatları — kesin fiyat için WhatsApp'tan yazın</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(184,151,90,.2)' }}>
                  {['Hizmet', 'Fiyat', 'Süre'].map(h=>(
                    <th key={h} style={{ padding: '.7rem .8rem', textAlign: h==='Hizmet'?'left':'center', fontSize: '.68rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIYATLAR.map(([tip,fiyat,sure],i)=>(
                  <tr key={i} style={{ borderBottom: '1px solid rgba(60,40,20,.06)', background: i%2?'rgba(184,151,90,.025)':'#fff' }}>
                    <td style={{ padding: '.9rem .8rem', fontSize: '.88rem' }}>{tip}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: '#8A6E3E', fontWeight: 700 }}>{fiyat}</td>
                    <td style={{ padding: '.9rem .8rem', textAlign: 'center', color: '#6B5F53', fontSize: '.8rem' }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>Antalya'da Erkek Terzisi — Neden Terzi Can?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
              {[
                ['👔','Takım Elbise Uzmanı','Ölçüye özel erkek takım elbise, blazer, smoking ve damatlık dikimi.'],
                ['✂️','Tadilat & Tamir','Pantolon kısaltma, ceket kol kısaltma, bel alma, fermuar değişimi.'],
                ['🚗','Eve Gelen Terzi','Araçlı servisimizle adresinize geliyoruz. Otel, ev, iş yeri.'],
                ['🌍','İngilizce Hizmet','Yabancı uyruklu müşteriler için İngilizce, Rusça, Almanca hizmet.'],
              ].map(([ic,t,d])=>(
                <div key={t as string} style={{ background: '#fff', padding: '1.4rem', borderTop: '2px solid rgba(184,151,90,.3)' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '.6rem' }}>{ic}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', color: '#1C1814', marginBottom: '.4rem', fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: '.78rem', color: '#6B5F53', lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>Erkek Terzi Hizmetleri Hakkında</h2>
            <div style={{ fontSize: '.9rem', color: '#5A4E42', lineHeight: 1.95 }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Erkek takım elbise dikimi</strong> en özel giyim yatırımlarından biridir. Terzi Can olarak
                Antalya'da <strong>ölçüye özel erkek takım elbise dikimi</strong> yapıyoruz; fiyat kumaş ve modele göre belirlenir.
                İtalyan, İngiliz veya klasik Türk kesimi seçenekleriyle müşteriye özel kalıp çıkarılmaktadır.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Smoking ve damatlık dikiminde</strong> kumaş seçiminden aksesuar koordinasyonuna kadar
                komple danışmanlık sunulmaktadır. Siyah veya renkli smoking, tek veya çift sıra düğme seçenekleri mevcuttur.
              </p>
              <p>
                <strong>Erkek pantolon tadilat ve kısaltmada</strong> paça kısaltma, bel daraltma, ağ dikimi
                ve fermuar değişimi yapılmaktadır. Tüm işlemler aynı gün teslim edilir; acil işler 1–2 saatte tamamlanır.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: '#F2EDE4', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Bay Terzi SSS</h2>
            {FAQ.map(([q,a],i)=>(
              <details key={i} style={{ borderBottom: '1px solid rgba(184,151,90,.1)', padding: '.8rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '.92rem', fontWeight: 500, color: '#1C1814', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#B8975A' }}>+</span>
                </summary>
                <p style={{ marginTop: '.7rem', fontSize: '.84rem', color: '#6B5F53', lineHeight: 1.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ background: '#B8975A', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#1C1814', marginBottom: '.7rem' }}>Erkek Kıyafet Fiyatı Öğrenin</h2>
          <p style={{ color: '#1C1814', marginBottom: '1.8rem', fontSize: '.92rem' }}>Fotoğraf gönderin — hızlı fiyat · Otellere servis</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, erkek kıyafeti için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#15803d', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp
            </a>
            <a href="tel:+905318986418" style={{ background: 'rgba(255,255,255,.35)', color: '#1C1814', border: '1px solid rgba(28,24,20,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              <span className="ico-tel" aria-hidden="true" /> {PHONE}
            </a>
          </div>
        </section>

        <section style={{ padding: '2rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>Diğer Hizmetler</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[['Bayan Terzi Antalya','/terzi/bayan-terzi-antalya'],['Paça Kısaltma','/terzi/paca-kisaltma-antalya'],['Fermuar Değişimi','/terzi/fermuar-degisimi-antalya'],['← Tüm Hizmetler','/terzi']].map(([l,h])=>(
                <Link key={l} href={h} style={{ border: '1px solid rgba(184,151,90,.25)', color: '#8A6E3E', padding: '.4rem .9rem', textDecoration: 'none', fontSize: '.78rem', borderRadius: '2px', background: '#fff' }}>{l}</Link>
              ))}
            </div>
          </div>
        </section>
      <ReviewsBlock lang="tr" schema />
    </main>
    </>
  );
}
