import type { Metadata } from 'next';
import ReviewsBlock from '@/components/ReviewsBlock';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import Link from 'next/link';
import { jsonLdString, faqPageSchema } from '@/lib/json-ld';

const SITE_URL = 'https://swaphubs.com/terzi/bayan-terzi-antalya';
const PARENT = 'https://swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';
const WA = (t: string) => `https://wa.me/905318986418?text=${encodeURIComponent(t)}`;

// SSS: görünür liste ve FAQPage şeması bu tek diziden beslenir.
const FAQ: [string, string][] = [
  ['Bayan terzi Antalya fiyatları 2026?', `Etek kısaltma ₺200, elbise daraltma ₺200, fermuar değişimi ₺300, abiye tamiri ve gelinlik tadilatı fotoğrafa veya işin detayına göre fiyatlanır. Elbise, abiye, bluz ve tulum dikimi fotoğrafa ve istediğiniz modele göre fiyatlanır. WhatsApp: ${PHONE}`],
  ['Gelinlik tadilatı Antalya kaç lira?', `Gelinlik tadilatı fiyatı fotoğrafa veya işin detayına göre belirlenir. Süre aynı gün veya işe göre 1–2 gündür. Kısaltma, daraltma, omuz düzeltme yapılır; gelinlik dikimi yapılmaz, yalnızca tadilat yapılır. Nisan–Ekim sezonunda önceden randevu alın. WhatsApp: ${PHONE}`],
  ['Abiye tamiri ne kadar sürer?', 'Abiye tamiri aynı gün teslim edilir. Tatildesiniz ve gala yemeğiniz bugünse acil iş olarak 1–2 saatte hazırlanabilir.'],
  ['Kadın elbise dikimi Antalya?', `Evet. Ölçüye özel elbise, bluz, etek, tulum ve abiye dikimi yapılır; fiyat fotoğrafa ve istediğiniz modele göre belirlenir, süre modele ve adede göre değişir. WhatsApp: ${PHONE}`],
  ['Büyük beden bayan kıyafeti dikimi var mı?', `Evet! Büyük beden kadın elbise, pantolon ve gömlek dikimi fotoğrafa ve istediğiniz modele göre netleşir. WhatsApp: ${PHONE}`],
  ['Bayan kıyafeti tadilatı otele geliyor mu?', `Evet! Eve ve otele alım-teslim yapıyoruz. WhatsApp: ${PHONE}`],
  ['Bebek ve çocuk elbisesi dikimi yapılıyor mu?', `Evet! Bebek elbisesi, çocuk kıyafeti ve okul kıyafeti dikimi yapılır; fiyat fotoğrafa ve istediğiniz modele göre belirlenir. WhatsApp: ${PHONE}`],
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Bayan Terzi Antalya — Kadın Elbise Dikimi Fiyatları 2026',
      description: "Antalya'da bayan terzi: etek kısaltma ₺200, fermuar ₺300, abiye ve gelinlik tadilatı fotoğrafa/işe göre. Kadın elbise dikimi fotoğrafa ve istediğiniz modele göre fiyatlanır. Eve ve otele alım-teslim.",
      provider: { '@type': 'ClothingStore', name: 'Terzi Can', telephone: '+905318986418', '@id': `${PARENT}#business` },
      areaServed: ['Antalya','Konyaaltı','Belek','Lara','Kemer'].map(name=>({'@type':'City',name})),
      offers: { '@type': 'AggregateOffer', lowPrice: '200', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'SwapHubs', item:'https://swaphubs.com' },
        { '@type':'ListItem', position:2, name:'Antalya Terzi', item:PARENT },
        { '@type':'ListItem', position:3, name:'Bayan Terzi Antalya', item:SITE_URL },
      ],
    },
    faqPageSchema(FAQ),
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),
  title: { absolute: 'Bayan Terzi Antalya · Elbise Tamiri, Tadilat | Terzi Can' },
  description: "Antalya bayan terzi: elbise tamiri, etek kısaltma ₺200, fermuar ₺300, abiye tamiri fotoğrafa göre. Eve servis. ☎ +90 531 898 64 18",
  keywords: [
    'bayan tamir tadilat Antalya', 'elbise tamiri ve tadilatı Antalya', 'elbise fermuar değişimi Antalya', 'yırtık elbise tamiri Antalya', 'bayan terzi Antalya', 'kadın terzi Antalya', 'kadın elbise dikimi Antalya',
    'gelinlik tadilatı Antalya', 'abiye tamiri Antalya', 'etek kısaltma Antalya',
    'bayan terzi fiyatları 2026', 'elbise daraltma Antalya', 'abiye dikimi Antalya',
    'büyük beden bayan terzi Antalya', 'women tailor Antalya', 'dress alteration Antalya',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Bayan Terzi Antalya · Kadın Elbise Dikimi · Gelinlik Tadilatı',
    description: "Elbise dikimi fotoğrafa ve istediğiniz modele göre. Gelinlik ve abiye tadilatı fotoğrafa göre. Eve gelen terzi. ☎ +90 531 898 64 18",
    url: SITE_URL, type: 'website',
  },
  robots: { index: true, follow: true },
};

const FIYATLAR = [
  ['Etek / Pantolon Kısaltma', '₺200', 'Aynı gün'],
  ['Elbise Daraltma / Beden Küçültme', '₺200', 'Aynı gün'],
  ['Kol Kısaltma (Elbise/Bluz)', '₺200', 'Aynı gün'],
  ['Invisible Fermuar Değişimi', '₺300', 'Aynı gün'],
  ['Bluz Dikimi', 'Fotoğrafa ve istediğiniz modele göre', 'Modele ve adede göre'],
  ['Kadın Elbise Dikimi', 'Fotoğrafa ve istediğiniz modele göre', 'Modele ve adede göre'],
  ['Tulum Dikimi', 'Fotoğrafa ve istediğiniz modele göre', 'Modele ve adede göre'],
  ['Abiye Tamiri / Kısaltma', 'Fotoğrafa göre', 'Aynı gün / 1–2 gün'],
  ['Abiye Dikimi', 'Fotoğrafa ve istediğiniz modele göre', 'Modele ve adede göre'],
  ['Gelinlik Tadilatı (dikimi yapılmaz)', 'Fotoğrafa göre', 'Aynı gün / 1–2 gün'],
  ['Büyük Beden Elbise Dikimi', 'Fotoğrafa ve istediğiniz modele göre', 'Modele ve adede göre'],
  ['Araçlı Servis', 'WhatsApp\'ta netleşir', '—'],
];

export default function BayanTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <main style={{ fontFamily: "'Jost',system-ui,sans-serif", background: '#FAF7F2', color: '#3A3028', minHeight: '100vh' }}>

        <SpeakableSchema path="/terzi/bayan-terzi-antalya" />
        <QuickActionBanner lang="tr" service="bayan" />

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.75rem', color: '#6B5F53', background: '#F2EDE4', borderBottom: '1px solid rgba(184,151,90,.12)' }}>
          <Link href="/" style={{ color: '#B8975A', textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}<Link href="/terzi" style={{ color: '#B8975A', textDecoration: 'none' }}>Antalya Terzi</Link>
          {' › '}<span>Bayan Terzi Antalya</span>
        </nav>

        <section style={{ background: 'linear-gradient(135deg,#1C1814,#2E2820)', padding: '4rem 1.5rem 3.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: "url('/gorseller/bel-daraltma-manken.webp') center/cover", opacity: .1 }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D4B07A', marginBottom: '1rem' }}>
              👗 Terzi Can · Antalya · Bayan Terzi Uzmanı
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Bayan Terzi Antalya<br />
              <span style={{ color: '#D4B07A', fontStyle: 'italic' }}>Elbise Dikimi · Gelinlik Tadilatı · Abiye 2026</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px', marginBottom: '1.5rem' }}>
              Etek kısaltma <strong style={{ color: '#D4B07A' }}>₺200</strong> ·
              Elbise dikimi <strong style={{ color: '#D4B07A' }}>fotoğrafa ve modele göre</strong> ·
              Gelinlik tadilatı <strong style={{ color: '#D4B07A' }}>fotoğrafa göre</strong> ·
              <strong style={{ color: '#fff' }}> Eve ve otele gelen terzi servisi</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', maxWidth: '700px', marginBottom: '1.5rem' }}>
              {[
                ['Etek Kısaltma','₺200'],
                ['Elbise Dikimi','Fotoğrafa göre'],
                ['Abiye Tamiri','Fotoğrafa göre'],
                ['Gelinlik Tadilat','Fotoğrafa göre'],
                ['Abiye Dikimi','Fotoğrafa göre'],
              ].map(([n,p])=>(
                <div key={n} style={{ background: 'rgba(255,255,255,.04)', padding: '.9rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)', marginBottom: '.2rem' }}>{n}</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.2rem', color: '#D4B07A', fontWeight: 700 }}>{p}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, kadın kıyafeti için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
                style={{ background: '#B8975A', color: '#1C1814', padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                💬 Fotoğraf Gönder → Fiyat Al
              </a>
              <a href="tel:+905318986418" style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '.9rem 1.6rem', textDecoration: 'none', fontSize: '.85rem' }}>
                📞 {PHONE}
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.9rem', color: '#1C1814', marginBottom: '.5rem' }}>Bayan Terzi Fiyat Listesi 2026</h2>
            <p style={{ color: '#6B5F53', fontSize: '.88rem', marginBottom: '1.8rem' }}>Başlangıç fiyatları — kesin fiyat için WhatsApp'tan fotoğraf gönderin</p>
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
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '1rem' }}>Bayan Terzi Hizmetleri Hakkında</h2>
            <div style={{ fontSize: '.9rem', color: '#5A4E42', lineHeight: 1.95 }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Kadın elbise dikimi</strong> en kişisel terzilik hizmetlerinden biridir. Terzi Can olarak
                Antalya'da bluzdan tuluma, günlük elbiseden abiyeye kadar her tür kadın kıyafetini ölçüye göre dikiyoruz.
                <strong> Kadın elbise dikiminde fiyat fotoğrafa ve istediğiniz modele göre</strong> belirlenir; süre model ve adede göre değişir.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Gelinlik tadilatı</strong> özel dikkat gerektiren bir işlemdir. Kısaltma, daraltma,
                omuz ayarı ve süsleme ekleme yapılmaktadır; gelinlik dikimi yapılmaz, yalnızca tadilat yapılır. Nisan–Ekim düğün sezonunda önceden randevu almanızı öneririz.
                Gelinlik tadilatı fiyatı <strong>fotoğrafa veya işin detayına göre</strong> belirlenir.
              </p>
              <p>
                <strong>Abiye tamiri ve kısaltmada</strong> taş ve süslemeler korunarak işlem yapılmaktadır.
                Tadilat aynı gün teslim edilir, acil işler 1–2 saatte hazırlanır. Turistler için otelden, eve de alım ve teslim yapılır.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: '#1C1814', marginBottom: '2rem' }}>Bayan Terzi SSS</h2>
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
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', color: '#1C1814', marginBottom: '.7rem' }}>Bayan Kıyafet Fiyatı Öğrenin</h2>
          <p style={{ color: '#1C1814', marginBottom: '1.8rem', fontSize: '.92rem' }}>Fotoğraf gönderin — hızlı fiyat · Otellere servis</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA('Merhaba, kadın kıyafeti için fiyat almak istiyorum.')} target="_blank" rel="noopener noreferrer"
              style={{ background: '#15803d', color: '#fff', padding: '1rem 2.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              💬 WhatsApp
            </a>
            <a href="tel:+905318986418" style={{ background: 'rgba(255,255,255,.35)', color: '#1C1814', border: '1px solid rgba(28,24,20,.5)', padding: '1rem 2rem', textDecoration: 'none', fontSize: '.92rem', borderRadius: '4px' }}>
              📞 {PHONE}
            </a>
          </div>
        </section>

        <section style={{ padding: '2rem 1.5rem', background: '#F2EDE4' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#B8975A', marginBottom: '1rem' }}>Diğer Hizmetler</p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {[['Bay Terzi Antalya','/terzi/bay-terzi-antalya'],['Paça Kısaltma','/terzi/paca-kisaltma-antalya'],['← Tüm Hizmetler','/terzi']].map(([l,h])=>(
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
