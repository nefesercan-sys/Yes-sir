import type { Metadata } from 'next';
import Link from 'next/link';

// ─── Sabitler ────────────────────────────────────────────────────────────────
const SITE_URL  = 'https://swaphubs.com/antalya-terzi-elbise-dikiki-tamiri-tadilati-utu-hizmeti';
const HOME      = 'https://swaphubs.com';
const TERZI_URL = 'https://swaphubs.com/terzi';
const PHONE     = '+90 531 898 64 18';
const PHONE_E   = '+905318986418';
const WA = (t: string) => `https://wa.me/${PHONE_E}?text=${encodeURIComponent(t)}`;
const TODAY = new Date().toISOString().split('T')[0];

// SEO için güncellenmiş mahalleler
const KONYAALTI_MAHALLELERI = [
  'Hurma', 'Uncalı', 'Sarısu', 'Liman', 'Çakırlar', 
  'Gürsu', 'Öğretmenevleri', 'Meltem', 'Konyaaltı Merkez'
];

// ─── JSON-LD (Google Arama Sonuçları İçin İşletme Kodu) ───────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore', 'DryCleaningOrLaundry'],
      '@id': `${TERZI_URL}#business`,
      name: 'Terzi Can Antalya - Eve Servis Terzi',
      alternateName: ['Online Tailor Antalya', 'Kapıya Gelen Terzi', 'Konyaaltı Eve Servis Terzi'],
      description: "Terzi çağır, terzin kapına gelsin! Konyaaltı, Hurma, Liman, Uncalı, Meltem bölgelerinde adresinizde ölçü alıyor, kıyafetlerinizi yapıp 24 saatte adresinize teslim ediyoruz.",
      url: TERZI_URL,
      telephone: PHONE_E,
      priceRange: '₺₺',
      image: [`${HOME}/og/terzi-can.jpg`],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı Merkez',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      areaServed: KONYAALTI_MAHALLELERI.map(name => ({ '@type': 'Place', name: `${name} Mahallesi, Antalya` })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '94'
      }
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: 'Antalya Online Terzi · Kapıya Gelen Terzi Servisi',
      description: "Siz yorulmayın, terziniz size gelsin! Adresten alım, adresinizde ölçü alma ve 24 saat içinde teslim. Konyaaltı, Hurma, Liman, Uncalı profesyonel terzi.",
      inLanguage: ['tr','en','ru'],
      dateModified: TODAY,
    }
  ],
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(HOME),
  title: 'Antalya Online Terzi · Eve Gelen Terzi Servisi & Tadilat',
  description: "Terzi çağır terzi gelsin! Hurma, Uncalı, Sarısu, Liman, Gürsu, Meltem'de kapıdan alıp 24 saatte teslim ediyoruz. Adresinizde ölçü alınır. Profesyonel ve hızlı hizmet.",
  keywords: [
    'Antalya online terzi', 'eve gelen terzi Antalya', 'Konyaaltı kapıya servis terzi', 
    'Hurma terzi', 'Uncalı terzi', 'Liman mahallesi terzi', 'Sarısu terzi', 'Çakırlar terzi',
    'Gürsu terzi', 'Öğretmenevleri terzi', 'Meltem terzi', 'adrese teslim terzi',
    'paça kısaltma 150 TL', 'fermuar değişimi Antalya'
  ],
  alternates: { canonical: SITE_URL },
};

// ─── Veriler ──────────────────────────────────────────────────────────────────
// Yeni İstenen Fiyat Listesi
const FIYATLAR = [
  { hizmet: 'Paça Kısaltma',            fiyat: '₺150', sure: 'Aynı gün' },
  { hizmet: 'Pantolon Paçası',          fiyat: '₺150', sure: 'Aynı gün' },
  { hizmet: 'Bel Daraltma',             fiyat: '₺150', sure: '24 saat' },
  { hizmet: 'Etek Kısaltma',            fiyat: '₺150', sure: 'Aynı gün' },
  { hizmet: 'Elbise Boyu Kısaltma',     fiyat: '₺150', sure: 'Aynı gün' },
  { hizmet: 'Elbise Tamiri',            fiyat: '₺150', sure: '24 saat' },
  { hizmet: 'Gömlek Tamiri',            fiyat: '₺150', sure: '24 saat' },
  { hizmet: 'T-shirt Tamiri',           fiyat: '₺100', sure: 'Aynı gün' },
  { hizmet: 'Fermuar Değişimi / Tamiri',fiyat: '₺200', sure: 'Aynı gün' },
  { hizmet: 'Ceket Tamiri',             fiyat: '₺200', sure: '24 saat' },
  { hizmet: 'Mont Tamiri',              fiyat: '₺200', sure: '24 saat' },
  { hizmet: 'Abiye Tamiri',             fiyat: '₺400', sure: '48 saat' },
  { hizmet: 'Elbise Dikimi',            fiyat: '₺800+', sure: '3-5 gün' },
];

// Orijinal Dikim Listesi (SEO için tutuldu)
const DIKIMLER = [
  { hizmet: 'Erkek Takım Elbise Dikimi',     fiyat: '₺2.500+', sure: '5–7 gün'   },
  { hizmet: 'Kadın Özel Elbise / Tunik',     fiyat: '₺800+',   sure: '3–5 gün'   },
  { hizmet: 'Abiye / Gece Elbisesi Tasarımı',fiyat: '₺1.200+', sure: '5–7 gün'   },
  { hizmet: 'Gelinlik Dikimi',               fiyat: '₺5.000+', sure: '14–21 gün' },
  { hizmet: 'Üniforma (Adet Başına)',        fiyat: 'Teklif',  sure: '7–14 gün'  },
];

// Orijinal Ütü/Kuru Temizleme Listesi (SEO için tutuldu)
const UTU_TEMIZLEME = [
  { hizmet: 'Gömlek Ütü',                      fiyat: '₺80',    sure: 'Aynı gün'  },
  { hizmet: 'Takım Elbise Buharlı Pres',       fiyat: '₺150',   sure: 'Aynı gün'  },
  { hizmet: 'Çamaşır Yıkama + Kurutma',        fiyat: '₺80/kg', sure: '24 saat'   },
  { hizmet: 'Takım Elbise Kuru Temizleme',     fiyat: '₺450',   sure: '48 saat'   },
  { hizmet: 'Mont / Kaban Kuru Temizleme',     fiyat: '₺500',   sure: '48 saat'   },
  { hizmet: 'Adresten Alım Teslim',            fiyat: 'ÜCRETSİZ', sure: '—'       },
];

// ─── Stil Sabitleri ──────────────────────────────────────────────────────────
const ALTIN   = '#B8975A';
const ALTIN2  = '#D4B07A';
const KOYU    = '#1C1814';
const KOYU2   = '#2E2820';
const BG      = '#FAF7F2';
const BG2     = '#F2EDE4';
const METIN   = '#3A3028';
const GRI     = '#7A6E62';
const SERIF   = 'Georgia,serif';
const SANS    = 'system-ui,sans-serif';

// ─── Bileşen ────────────────────────────────────────────────────────────────
export default function OnlineTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: SANS, background: BG, color: METIN, minHeight: '100vh' }}>

        {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.72rem', color: GRI, background: BG2, borderBottom: `1px solid rgba(184,151,90,.12)` }}>
          <Link href="/" style={{ color: ALTIN, textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: ALTIN, textDecoration: 'none' }}>Terzi Can Antalya</Link>
          {' › '}
          <span>Antalya Online Terzi Servisi · Kapıya Gelen Terzi</span>
        </nav>

        {/* ── HERO (TERZİ ÇAĞIR TERZİ GELSİN) ─────────────────────────────── */}
        <section style={{
          background: `linear-gradient(135deg, ${KOYU} 0%, ${KOYU2} 60%, #3A2E20 100%)`,
          padding: '5rem 1.5rem 4.5rem',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${ALTIN}, transparent)` }} />
          
          <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'inline-block', background: ALTIN, color: '#fff', padding: '.4rem 1.2rem', borderRadius: '30px', fontSize: '.8rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              🚗 Yeni Nesil Hizmet
            </div>
            
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Terzi Çağır, <span style={{ color: ALTIN2, fontStyle: 'italic' }}>Terzi Gelsin!</span>
            </h1>
            
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,.85)', lineHeight: 1.8, maxWidth: '750px', margin: '0 auto 2.5rem' }}>
              Siz yorulmayın! Profesyonel, tecrübeli ve hızlı terzi ekibimiz kapınıza gelsin. 
              <strong> Adresinizde üzerinizde ölçü alıyor</strong>, kıyafetlerinizi tamir veya tadilat için teslim alıyor ve 
              <strong> en geç 24 saat içinde </strong> evinize teslim ediyoruz. Güvenli, rahat ve zahmetsiz.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, adrese terzi çağırmak istiyorum. Konumumu iletiyorum.')}
                target="_blank" rel="noopener noreferrer"
                style={{ background: ALTIN, color: '#fff', padding: '1rem 2.2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.9rem', letterSpacing: '.05em', borderRadius: '4px' }}>
                📍 Konum Gönder - Terzi Çağır
              </a>
              <a href={`tel:${PHONE_E}`}
                style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '1rem 2.2rem', textDecoration: 'none', fontSize: '.9rem', fontWeight: 600, borderRadius: '4px' }}>
                📞 {PHONE}
              </a>
            </div>

            {/* Orijinal istatistik çubuğu */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', marginTop: '3.5rem', maxWidth: '700px', margin: '3.5rem auto 0' }}>
              {[['⭐ 4.9','94 Google Yorum'],['10+ Yıl','Deneyim'],['24 Saatte','Teslimat'],['Tüm Konyaaltı','Adrese Servis']].map(([t,d]) => (
                <div key={t} style={{ background: 'rgba(255,255,255,.03)', padding: '1.2rem 1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontSize: '1.05rem', color: ALTIN2, marginBottom: '.3rem', fontWeight: 700 }}>{t}</div>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HİZMET BÖLGELERİ ───────────────────────────────────────────── */}
        <section style={{ background: '#fff', padding: '3rem 1.5rem', borderBottom: `1px solid ${BG2}` }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.6rem', color: KOYU, marginBottom: '1.2rem' }}>
              📍 Yakınınızdaki Profesyonel Terzi Servisi
            </h2>
            <p style={{ fontSize: '.9rem', color: GRI, marginBottom: '1.5rem' }}>
              Özellikle aşağıdaki mahallelere gün içinde çok hızlı (VIP) moto-kurye terzi servisimiz bulunmaktadır:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.6rem' }}>
              {KONYAALTI_MAHALLELERI.map(mahalle => (
                <span key={mahalle} style={{ background: BG2, color: KOYU, padding: '.5rem 1rem', borderRadius: '20px', fontSize: '.9rem', fontWeight: 600, border: `1px solid rgba(184,151,90,.3)` }}>
                  ✅ {mahalle}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── NASIL ÇALIŞIR? ─────────────────────────────────────────────── */}
        <section style={{ background: BG, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
              <span style={{ fontSize: '.75rem', letterSpacing: '.3em', textTransform: 'uppercase', color: ALTIN, fontWeight: 700 }}>Kolay ve Hızlı</span>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: '2.2rem', color: KOYU, textAlign: 'center', marginBottom: '3.5rem' }}>
              Süreç Nasıl İşliyor?
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2rem' }}>
              {[
                { step: '1', title: 'İletişime Geçin', desc: 'WhatsApp üzerinden bize ulaşıp konumunuzu ve yaptırmak istediğiniz işlemi (paça, fermuar, dikim) belirtin.' },
                { step: '2', title: 'Kapınıza Gelelim', desc: 'Uzman terzimiz belirlediğiniz saatte adresinize gelip üzerinizde profesyonel ölçü alsın.' },
                { step: '3', title: 'Atölye İşlemi', desc: 'Kıyafetiniz profesyonel atölyemizde özenle, kaliteli işçilik ve makinelerle tamir edilsin veya dikilsin.' },
                { step: '4', title: '24 Saatte Teslim', desc: 'İşlemi biten kıyafetiniz en geç 24 saat içinde ütülenmiş olarak tekrar kapınıza teslim edilsin.' },
              ].map((item) => (
                <div key={item.step} style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,.04)', position: 'relative', textAlign: 'center' }}>
                  <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', background: ALTIN, color: '#fff', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold', fontSize: '1.4rem', boxShadow: `0 4px 10px rgba(184,151,90,.4)` }}>
                    {item.step}
                  </div>
                  <h3 style={{ fontFamily: SERIF, fontSize: '1.3rem', color: KOYU, marginBottom: '1rem', marginTop: '1rem', fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ fontSize: '.9rem', color: GRI, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FİYAT TABLOSU (Kullanıcının Yeni Listesi) ────────────────────── */}
        <section id="tadilatlar" style={{ background: '#fff', padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '2rem', color: KOYU, textAlign: 'center', marginBottom: '.5rem' }}>
              Temel Tadilat & Onarım Fiyatları
            </h2>
            <p style={{ color: GRI, textAlign: 'center', marginBottom: '2.5rem', fontSize: '.9rem' }}>
              Belirtilen fiyatlara işçilik dahildir. Adresten alım ve teslimat hizmetimiz minimum sepet tutarında ücretsizdir.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 20px rgba(0,0,0,.05)', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: KOYU, color: '#fff' }}>
                  <th style={{ padding: '1.2rem 1.5rem', textAlign: 'left', fontWeight: 600, letterSpacing: '.1em', fontSize: '.85rem', textTransform: 'uppercase' }}>Yapılan İşlem</th>
                  <th style={{ padding: '1.2rem 1.5rem', textAlign: 'right', fontWeight: 600, letterSpacing: '.1em', fontSize: '.85rem', textTransform: 'uppercase' }}>Süre</th>
                  <th style={{ padding: '1.2rem 1.5rem', textAlign: 'right', fontWeight: 600, letterSpacing: '.1em', fontSize: '.85rem', textTransform: 'uppercase', color: ALTIN2 }}>Ücret</th>
                </tr>
              </thead>
              <tbody>
                {FIYATLAR.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fafafa', transition: 'background .2s' }}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '.95rem', color: METIN, fontWeight: 500 }}>{item.hizmet}</td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '.85rem', color: item.sure === 'Aynı gün' ? '#22c55e' : GRI, fontWeight: item.sure === 'Aynı gün' ? 600 : 400 }}>{item.sure}</td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '1.1rem', color: ALTIN, fontWeight: 700 }}>{item.fiyat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── ÖZEL DİKİM & KURU TEMİZLEME (Orijinal Tablolar SEO için Korundu) ── */}
        <section style={{ background: BG2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(350px,1fr))', gap: '2rem' }}>
            
            {/* Dikimler */}
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,.03)' }}>
              <h3 style={{ fontFamily: SERIF, fontSize: '1.4rem', color: KOYU, marginBottom: '1.5rem', borderBottom: `2px solid ${ALTIN}`, paddingBottom: '.5rem', display: 'inline-block' }}>Özel Dikim Hizmetleri</h3>
              {DIKIMLER.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '.8rem 0', borderBottom: i !== DIKIMLER.length-1 ? '1px dashed #e0e0e0' : 'none' }}>
                  <span style={{ fontSize: '.9rem', color: METIN }}>{item.hizmet}</span>
                  <span style={{ fontSize: '1rem', color: ALTIN, fontWeight: 600 }}>{item.fiyat}</span>
                </div>
              ))}
            </div>

            {/* Ütü & Temizleme */}
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,.03)' }}>
              <h3 style={{ fontFamily: SERIF, fontSize: '1.4rem', color: KOYU, marginBottom: '1.5rem', borderBottom: `2px solid ${ALTIN}`, paddingBottom: '.5rem', display: 'inline-block' }}>Ütü & Kuru Temizleme</h3>
              {UTU_TEMIZLEME.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '.8rem 0', borderBottom: i !== UTU_TEMIZLEME.length-1 ? '1px dashed #e0e0e0' : 'none' }}>
                  <span style={{ fontSize: '.9rem', color: METIN }}>{item.hizmet}</span>
                  <span style={{ fontSize: '1rem', color: item.fiyat === 'ÜCRETSİZ' ? '#22c55e' : ALTIN, fontWeight: 600 }}>{item.fiyat}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── HİZMET KARTLARI (Orijinal zengin tasarım) ────────────────────── */}
        <section style={{ background: BG, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '2rem', color: KOYU, marginBottom: '2rem', textAlign: 'center' }}>
              Diğer Profesyonel Hizmetlerimiz
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '1px', background: 'rgba(184,151,90,.1)' }}>
              {[
                { ic:'✂️', baslik:'Tadilat & Onarım', text:'Paça kısaltma, fermuar değişimi, bel daraltma. Adresinizde ölçü alınarak yapılır.', href:'/terzi/paca-kisaltma-antalya' },
                { ic:'🧵', baslik:'Özel Kıyafet Dikimi', text:'Erkek takım elbise, abiye, gömlek, pantolon — tam ölçünüze özel tasarım dikim.', href:'/terzi/bayan-terzi-antalya' },
                { ic:'💨', baslik:'Ütü & Buharlı Pres', text:'Gömlek, takım elbise, abiyeleriniz evinizden alınır, pres ütü yapılıp askıda teslim edilir.', href:'/terzi/kuru-temizleme-antalya' },
                { ic:'🏭', baslik:'Üniforma & İmalat', text:'Otel, restoran, sağlık sektörü personeli için toptan üniforma ve iş elbisesi dikimi.', href:'/terzi/uniforma-uretimi-antalya' },
              ].map(({ ic, baslik, text, href }) => (
                <div key={baslik} style={{ background: '#fff', padding: '2rem 1.6rem', position: 'relative', transition: 'transform .2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='translateY(0)'}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: ALTIN }} />
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{ic}</div>
                  <h3 style={{ fontFamily: SERIF, fontSize: '1.15rem', color: KOYU, marginBottom: '.6rem', fontWeight: 600 }}>{baslik}</h3>
                  <p style={{ fontSize: '.85rem', color: GRI, lineHeight: 1.7, marginBottom: '1.2rem' }}>{text}</p>
                  <Link href={href} style={{ fontSize: '.8rem', color: ALTIN, textDecoration: 'none', fontWeight: 600 }}>İncele →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GOOGLE İŞLETME & HARİTA ALANI ────────────────────────────────── */}
        <section style={{ background: '#fff', padding: '4.5rem 1.5rem', borderTop: `1px solid ${BG2}` }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '2rem', color: KOYU, textAlign: 'center', marginBottom: '1rem' }}>
              Atölyemiz ve Müşteri Yorumları
            </h2>
            <p style={{ color: GRI, textAlign: 'center', marginBottom: '2.5rem' }}>
              Hizmet kalitemizi Google Haritalar profilimizdeki gerçek müşteri yorumlarından inceleyebilirsiniz.
            </p>
            
            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,.08)', background: '#fafafa', border: `1px solid ${BG2}` }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.140889228495!2d30.638410215291!3d36.861718979935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c391dbefb22bf9%3A0x33e5c70757db6192!2sKonyaalt%C4%B1%2C%20Antalya!5e0!3m2!1str!2str!4v1690000000000!5m2!1str!2str"
                width="100%"
                height="350"
                style={{ border: 0, display: 'block' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Terzi Can Google İşletme Konumu"
              ></iframe>
              
              <div style={{ padding: '1.5rem 2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', background: '#fff' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: KOYU, marginBottom: '.4rem', fontWeight: 700, fontFamily: SERIF }}>Terzi Can — Konyaaltı & Antalya</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.9rem', color: GRI }}>
                    <span style={{ color: '#FABB05', fontSize: '1.2rem', letterSpacing: '2px' }}>★★★★★</span> 
                    <span style={{ fontWeight: 500 }}>4.9 (94 Google Değerlendirmesi)</span>
                  </div>
                </div>
                <a href="https://maps.google.com/?q=Terzi+Can+Antalya" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#4285F4', color: '#fff', padding: '.8rem 1.8rem', borderRadius: '6px', textDecoration: 'none', fontSize: '.9rem', fontWeight: 600, boxShadow: '0 2px 8px rgba(66, 133, 244, .3)' }}>
                  Google'da İncele / Yorum Yaz
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── BÖLGELER (Orijinal Koddan Eklendi) ──────────────────────────── */}
        <section style={{ background: KOYU, padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.8rem', color: '#fff', marginBottom: '.5rem' }}>
              Tüm Antalya'nın Her İlçesine <span style={{ color: ALTIN2, fontStyle: 'italic' }}>Adrese Servis</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.85rem', marginBottom: '2rem' }}>
              Konyaaltı'ndaki mahalle servislerimize ek olarak, diğer Antalya ilçelerine de toplu işlerde servisimiz vardır.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: '1px', background: 'rgba(255,255,255,.05)' }}>
              {['Muratpaşa','Kepez','Lara','Belek','Kemer','Alanya','Manavgat','Side','Serik','Aksu','Döşemealtı'].map(b => (
                <div key={b} style={{ background: 'rgba(255,255,255,.03)', padding: '.8rem 1rem', fontSize: '.85rem', color: 'rgba(255,255,255,.7)', textAlign: 'center' }}>
                  📍 {b}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ÇOK DİLLİ BÖLÜM (Orijinal Koddan Eklendi) ────────────────────── */}
        <section style={{ background: BG2, padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.8rem', color: KOYU, marginBottom: '1.5rem' }}>
              Tailor in Antalya <span style={{ color: ALTIN, fontStyle: 'italic' }}>· English · Русский · Deutsch</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
              <div style={{ background: '#fff', padding: '1.8rem', borderLeft: `3px solid ${ALTIN}`, borderRadius: '0 8px 8px 0', boxShadow: '0 2px 10px rgba(0,0,0,.02)' }}>
                <div style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN, marginBottom: '.8rem', fontWeight: 600 }}>🇬🇧 English</div>
                <p style={{ fontSize: '.85rem', color: GRI, lineHeight: 1.8 }}>
                  <strong style={{ color: METIN }}>Tailor Can</strong> offers professional tailor to door services in Konyaalti.
                  We take your measurements at your home, hotel or office and deliver in 24 hours. WhatsApp: <strong>{PHONE}</strong>
                </p>
              </div>
              <div style={{ background: '#fff', padding: '1.8rem', borderLeft: `3px solid ${ALTIN}`, borderRadius: '0 8px 8px 0', boxShadow: '0 2px 10px rgba(0,0,0,.02)' }}>
                <div style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN, marginBottom: '.8rem', fontWeight: 600 }}>🇷🇺 Русский</div>
                <p style={{ fontSize: '.85rem', color: GRI, lineHeight: 1.8 }}>
                  <strong style={{ color: METIN }}>Портной Кан</strong> — услуги портного с выездом на дом в Коньяалты.
                  Снимаем мерки у вас дома и доставляем готовую одежду за 24 часа. WhatsApp: <strong>{PHONE}</strong>
                </p>
              </div>
              <div style={{ background: '#fff', padding: '1.8rem', borderLeft: `3px solid ${ALTIN}`, borderRadius: '0 8px 8px 0', boxShadow: '0 2px 10px rgba(0,0,0,.02)' }}>
                <div style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN, marginBottom: '.8rem', fontWeight: 600 }}>🇩🇪 Deutsch</div>
                <p style={{ fontSize: '.85rem', color: GRI, lineHeight: 1.8 }}>
                  <strong style={{ color: METIN }}>Schneider Can</strong> in Antalya bietet mobilen Schneiderservice.
                  Wir nehmen bei Ihnen zu Hause Maß und liefern innerhalb von 24 Stunden. WhatsApp: <strong>{PHONE}</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: KOYU2, color: 'rgba(255,255,255,.5)', fontSize: '.8rem', borderTop: `1px solid rgba(255,255,255,.05)` }}>
          <p style={{ marginBottom: '.8rem', fontSize: '.9rem', color: 'rgba(255,255,255,.8)' }}>© {new Date().getFullYear()} Terzi Can Antalya. Tüm hakları saklıdır.</p>
          <p style={{ color: 'rgba(255,255,255,.4)', lineHeight: 1.6 }}>
            Online Terzi · Eve Gelen Terzi · Antalya Kuru Temizleme Servisi <br/>
            Hurma Terzi · Liman Terzi · Uncalı Terzi · Gürsu Terzi · Konyaaltı Terzi Atölyesi
          </p>
        </footer>

      </main>
    </>
  );
}
