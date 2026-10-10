// app/tekstil-antalya/page.tsx
// DÜZELTME (2026-09-30): Bu URL'de önceden site sahibine ait olmayan/placeholder
// "Maya Tekstil" markasıyla çalışan, gerçek kişisel veri toplayan bir sipariş formu
// vardı. Kaldırılıp, terzihizmeti.com.tr/anavera-tekstil ile AYNI markayı (Anavera
// Tekstil) taşıyan, SwapHubs pazaryeri bağlamına uygun, özgün bir tanıtım sayfasıyla
// değiştirildi. İçerik terzihizmeti.com.tr'deki tam sayfayla BİREBİR AYNI DEĞİL
// (yinelenen içerik riskini önlemek için) — SwapHubs'a özgü, daha kısa bir profil
// sayfası; asıl kapsamlı site için çapraz link veriyor. Gerçek fotoğraf olmadığından
// stok/sahte görsel kullanılmadı, temiz SVG ikonlarla tasarlandı.

import type { Metadata } from 'next';
import SpeakableSchema from '@/components/SpeakableSchema';

const BASE_URL   = 'https://swaphubs.com';
const PAGE_URL   = `${BASE_URL}/tekstil-antalya`;
const MAIN_SITE  = 'https://terzihizmeti.com.tr/anavera-tekstil';
const SISTER_URL = `${BASE_URL}/terzi`;
const PHONE      = '+90 531 898 64 18';
const PHONE_E    = '+905318986418';
const WA = (t: string) => `https://wa.me/${PHONE_E}?text=${encodeURIComponent(t)}`;
const WA_DEFAULT = WA('Merhaba, Anavera Tekstil seri imalat ve numune çalışması hakkında bilgi almak istiyorum.');

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { absolute: 'Anavera Tekstil Antalya | Seri İmalat, Numune & İhracat' },
  description:
    'Antalya merkezli tekstil üreticisi Anavera Tekstil: numune çalışması, seri imalat, ' +
    'erkek/kadın/çocuk tekstili üretimi ve ihracat. Sipariş sınırı yok, OEM/fason üretim proje bazında teklif edilir. ☎ ' + PHONE,
  keywords: [
    'Antalya tekstil üreticisi', 'seri imalat Antalya', 'numune çalışması tekstil',
    'model tasarım dikim atölyesi', 'fason üretim Antalya', 'tekstil ihracat Antalya',
    'toptan giyim üreticisi Antalya', 'erkek kadın çocuk tekstili imalatı', 'OEM üretim Antalya',
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    title: 'Anavera Tekstil Antalya — Seri İmalat, Numune & İhracat',
    description: 'Numune çalışmasından seri üretime, erkek/kadın/çocuk tekstili imalatı ve ihracat.',
    url: PAGE_URL, siteName: 'Terzi Can Antalya', locale: 'tr_TR', type: 'website',
    images: [{ url: `${BASE_URL}/og/swaphubs-og.jpg`, width: 1200, height: 630, alt: 'Anavera Tekstil Antalya' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ClothingStore'],
      '@id': `${PAGE_URL}#business`,
      name: 'Anavera Tekstil',
      description: 'Antalya merkezli tekstil tasarım, üretim ve ihracat şirketi. Numune geliştirme, seri imalat ve erkek/kadın/çocuk tekstili üretimi.',
      url: PAGE_URL,
      telephone: PHONE_E,
      address: { '@type': 'PostalAddress', addressLocality: 'Antalya', addressCountry: 'TR' },
      areaServed: ['TR', 'European Union', 'Russia'],
      // Aynı markanın asıl/kapsamlı sitesine doğru referans — kendine değil.
      sameAs: [MAIN_SITE, `https://wa.me/${PHONE_E}`],
      knowsLanguage: ['tr', 'en', 'de', 'ru'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Tekstil Üretim Hizmetleri',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Numune Geliştirme', description: 'Tasarım veya referans ürüne göre numune/prototip hazırlama.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Seri İmalat', description: 'Erkek, kadın ve çocuk tekstili için yüksek kapasiteli seri üretim.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'İhracat & Fason Üretim', description: 'AB ve Rusya\'ya ihracat, özel marka (private label) üretim.' } },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Anavera Tekstil', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Minimum sipariş adediniz nedir?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sabit bir minimum sipariş şartı koymuyoruz; numune, az adetli ve yüksek adetli işler proje bazında teklif edilir. Numune ve prototip için tek adet de kabul edilir.' } },
        { '@type': 'Question', name: 'Numune süreci nasıl işliyor?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tasarımınıza veya referans ürününüze göre numune hazırlanır, onayınızdan sonra seri üretime geçilir.' } },
        { '@type': 'Question', name: 'Yurt dışına ihracat yapıyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, Avrupa Birliği ülkelerine ve Rusya\'ya düzenli ihracat yapıyoruz, ihracat evrak desteği sağlıyoruz.' } },
        { '@type': 'Question', name: 'Erkek, kadın ve çocuk tekstili aynı siparişte üretilebilir mi?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, kategoriler için ayrı üretim hatlarımız var; numune onayından sonra tek bir karma siparişte birleştirebiliyoruz.' } },
      ],
    },
  ],
};

export default function TekstilAntalyaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SpeakableSchema path="/tekstil-antalya" />
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#F8FAFC', color: '#0F172A' }}>

        {/* HEADER */}
        <header style={{ backgroundColor: '#0F172A', borderBottom: '2px solid #C9A227' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href={BASE_URL} style={{ color: '#fff', fontWeight: 800, textDecoration: 'none', fontSize: '1.1rem' }}>SwapHubs</a>
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#C9A227', color: '#0F172A', padding: '.55rem 1.1rem', borderRadius: 6, fontWeight: 700, fontSize: '.85rem', textDecoration: 'none' }}>WhatsApp</a>
          </div>
        </header>

        <nav aria-label="Breadcrumb" style={{ maxWidth: 1100, margin: '0 auto', padding: '.9rem 1.5rem 0', fontSize: '.8rem', color: '#64748B' }}>
          <a href={BASE_URL} style={{ color: '#64748B' }}>SwapHubs</a> <span>›</span> <strong style={{ color: '#0F172A' }}> Anavera Tekstil</strong>
        </nav>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#fff', padding: '3.5rem 1.5rem' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: 'rgba(201,162,39,.15)', border: '1px solid rgba(201,162,39,.5)', color: '#FDE047', padding: '.35rem .9rem', borderRadius: 30, fontSize: '.78rem', fontWeight: 600, marginBottom: '1.2rem' }}>
              SwapHubs'ta Öne Çıkan Üretici
            </span>
            <h1 style={{ fontSize: 'clamp(1.9rem,4.5vw,2.8rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
              Anavera Tekstil — <span style={{ color: '#E4C664' }}>Numuneden Seri Üretime & İhracata</span>
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Antalya merkezli, erkek/kadın/çocuk tekstili üretimi ve AB/Rusya'ya ihracat yapan Anavera Tekstil,
              SwapHubs pazaryerinde öne çıkan üreticilerden biridir.
            </p>
            <div style={{ display: 'flex', gap: '.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', padding: '.85rem 1.6rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>💬 WhatsApp'tan Teklif Al</a>
              <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,.08)', color: '#fff', border: '1px solid rgba(255,255,255,.25)', padding: '.85rem 1.6rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>Tüm Detaylar İçin Siteyi Ziyaret Et ↗</a>
            </div>
          </div>
        </section>

        {/* SÜREÇ (ikon tabanlı, gerçek fotoğraf yok) */}
        <section style={{ padding: '4rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '2.5rem' }}>Numune Çalışmasından Üretim Takibine</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { n: '01', t: 'Numune Geliştirme', d: 'Tasarımınıza veya referans ürününüze göre numune hazırlanır.' },
              { n: '02', t: 'Numune Onayı', d: 'Kumaş, kalıp ve dikiş detayları netleşir, onayınızla devam edilir.' },
              { n: '03', t: 'Seri İmalat', d: 'Erkek, kadın ve çocuk tekstili için yüksek kapasiteli üretim.' },
              { n: '04', t: 'İhracat & Takip', d: 'AB/Rusya\'ya gümrük evraklı ihracat, üretim raporlamasıyla.' },
            ].map((s) => (
              <div key={s.n} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '1.5rem' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F1E7CE' }}>{s.n}</div>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 800, margin: '.4rem 0' }}>{s.t}</h3>
                <p style={{ fontSize: '.88rem', color: '#64748B', lineHeight: 1.55 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* KATEGORİLER (ikon) */}
        <section style={{ padding: '3rem 1.5rem', background: '#fff', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '2rem' }}>Üretim Kategorileri</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
              {['Erkek Giyim', 'Kadın Giyim', 'Çocuk Giyimi', 'Kurumsal / Üniforma'].map((cat) => (
                <div key={cat} style={{ textAlign: 'center', padding: '1.5rem 1rem', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0F172A" strokeWidth="1.6" style={{ margin: '0 auto .6rem' }}>
                    <path d="M12 6l-5 4v20h22V10l-5-4" /><path d="M12 6l6 5 6-5" />
                  </svg>
                  <div style={{ fontWeight: 700, fontSize: '.92rem' }}>{cat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '4rem 1.5rem', maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '2rem' }}>Sık Sorulan Sorular</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              ['Minimum sipariş adediniz nedir?', 'Sabit bir minimum sipariş şartı koymuyoruz; numune, az adetli ve yüksek adetli işler proje bazında teklif edilir. Numune ve prototip için tek adet de kabul edilir.'],
              ['Numune süreci nasıl işliyor?', 'Tasarımınıza veya referans ürününüze göre numune hazırlanır, onayınızdan sonra seri üretime geçilir.'],
              ["Yurt dışına ihracat yapıyor musunuz?", "Evet, Avrupa Birliği ülkelerine ve Rusya'ya düzenli ihracat yapıyoruz, gerekli gümrük evraklarını hazırlıyoruz."],
              ['Erkek, kadın ve çocuk tekstili aynı siparişte üretilebilir mi?', 'Evet, numune onayından sonra tek bir karma siparişte birleştirebiliyoruz.'],
            ].map(([q, a]) => (
              <details key={q} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.1rem 1.3rem' }}>
                <summary style={{ fontWeight: 700, cursor: 'pointer' }}>{q}</summary>
                <p style={{ marginTop: '.7rem', color: '#475569', fontSize: '.92rem', lineHeight: 1.6 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ÇAPRAZ LİNK: KARDEŞ HİZMET */}
        <section style={{ padding: '3rem 1.5rem', background: '#0F172A', color: '#fff', textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', marginBottom: '.8rem' }}>Bireysel terzilik/tadilat mı arıyorsunuz?</p>
          <a href={SISTER_URL} style={{ color: '#E4C664', fontWeight: 700, textDecoration: 'none' }}>Terzi Can — Antalya Terzi Hizmeti'ni ziyaret edin →</a>
        </section>

        <footer style={{ padding: '2rem 1.5rem', textAlign: 'center', fontSize: '.8rem', color: '#94A3B8', background: '#020617' }}>
          © {new Date().getFullYear()} Anavera Tekstil · SwapHubs üzerinde öne çıkan üretici profili ·{' '}
          <a href={MAIN_SITE} style={{ color: '#94A3B8' }}>terzihizmeti.com.tr/anavera-tekstil</a>
        </footer>
      </div>
    </>
  );
} 
