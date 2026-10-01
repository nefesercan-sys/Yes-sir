// app/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

// ─── Sabitler ────────────────────────────────────────────────────────────────
const SITE_URL  = 'https://swaphubs.com/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat'
const HOME      = 'https://swaphubs.com'
const TERZI_URL = 'https://swaphubs.com/terzi'
const PHONE     = '+90 531 898 64 18'
const PHONE_E   = '+905318986418'
const WA = (t: string) => `https://wa.me/${PHONE_E}?text=${encodeURIComponent(t)}`
const TODAY = new Date().toISOString().split('T')[0]

// ── DÜZELTME: Doğrulanmış tek GBP kaydı (CID: 16306058881247995687) ──
// Önceki sürümde farklı bir CID (1496201377277644027) kullanılıyordu.
// GBP ekran görüntüsünde bu kaydın "kopya profil" olarak işaretlendiği görüldü —
// aynı işletme için iki farklı CID kullanmak Google'ın güven skorunu düşürür.
const GBP_CID = '16306058881247995687'
const MAPS_CID_URL = `https://www.google.com/maps?cid=${GBP_CID}`
// TODO: Bu embed kodu eski/doğrulanmamış CID'e ait olabilir. Google Maps'te
// doğru işletmeyi bulup "Paylaş → Haritayı Yerleştir" ile yeni embed kodu alın.
const MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12763.2!2d30.7056!3d36.8841!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39339b5158cfb%3A0xeaaa1afa8df430c0!2sKonyaalt%C4%B1+Terzi!5e0!3m2!1str!2str!4v1'

// SEO için Konyaaltı mahalleleri
const KONYAALTI_MAHALLELERI = [
  'Hurma', 'Liman', 'Uncalı', 'Gürsu', 'Altınkum',
  'Arapsuyu', 'Öğretmenevleri', 'Sarısu', 'Pınarbaşı', 'Toros',
  'Siteler', 'Molla Yusuf', 'Çakırlar', 'Meltem', 'Göbi', 'Konyaaltı Merkez'
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore', 'DryCleaningOrLaundry'],
      '@id': `${TERZI_URL}#business`,
      // DÜZELTME: sitedeki ana sayfayla (antalyada-terzi-dikim-tamirat-utu-hizmetleri)
      // aynı resmi ad + alternateName kullanılıyor — NAP tutarlılığı için kritik
      name: 'TERZİ Tailor Atelie',
      alternateName: ['Terzi Can Konyaaltı', 'Tailor Can Antalya', 'Портной Кан Анталья', 'Schneider Can Antalya', 'Konyaaltı Terzi'],
      description: "Antalya Konyaaltı'nda profesyonel terzi, dikiş atölyesi ve kuru temizleme. Hurma, Liman, Uncalı, Gürsu, Sarısu, Çakırlar, Meltem, Göbi, Öğretmenevleri başta olmak üzere tüm Antalya'ya adrese servis. Kıyafet dikimi, paça kısaltma, fermuar değişimi.",
      url: TERZI_URL,
      telephone: PHONE_E,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [`${HOME}/og/terzi-can.jpg`],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sarısu, Hurma, Liman',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      hasMap: MAPS_CID_URL,
      sameAs: [MAPS_CID_URL],
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '09:00',
        closes: '23:30',
      }],
      contactPoint: [{
        '@type': 'ContactPoint',
        telephone: PHONE_E,
        contactType: 'customer service',
        availableLanguage: ['Turkish','English','Russian','German'],
      }],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Konyaaltı' },
        // DÜZELTME: mahalleler şema.org'da "City" değil "Place" olmalı —
        // bir mahalle bağımsız bir şehir değildir, bu ayrım Google'ın
        // coğrafi hiyerarşiyi doğru yorumlaması için önemlidir
        ...KONYAALTI_MAHALLELERI.map(name => ({ '@type': 'Place', name: `${name} Mahallesi, Konyaaltı` })),
        { '@type': 'AdministrativeArea', name: 'Antalya' },
      ],
      // DÜZELTME: gerçek GBP verisi 5.0 puan / 4 yorum. Önceki sürümdeki
      // "4.9 / 94 yorum" doğrulanmamış veriydi ve Google'ın yapılandırılmış
      // veri politikalarına aykırı risk taşıyordu.
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0', reviewCount: '4', bestRating: '5', worstRating: '1',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: 'Konyaaltı Terzi · Hurma, Liman, Uncalı, Sarısu, Çakırlar, Meltem Terzi Servisi · 2026',
      description: "Konyaaltı terzi hizmetleri. Hurma, Liman, Uncalı, Sarısu, Çakırlar, Meltem, Göbi, Öğretmenevleri mahallelerine eve teslim terzi, paça kısaltma, fermuar, ütü ve kuru temizleme. ☎ " + PHONE,
      inLanguage: ['tr','en','ru'],
      dateModified: TODAY,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME },
        { '@type': 'ListItem', position: 2, name: 'TERZİ Tailor Atelie', item: TERZI_URL },
        { '@type': 'ListItem', position: 3, name: 'Konyaaltı Terzi · Tadilat ve Kuru Temizleme', item: SITE_URL },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Antalya Konyaaltı Terzi Dikim ve Kuru Temizleme Hizmeti 2026',
      provider: { '@type': 'LocalBusiness', '@id': `${TERZI_URL}#business` },
      areaServed: { '@type': 'City', name: 'Antalya' },
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '80',
        highPrice: '5000',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Konyaaltı Hurma, Liman, Uncalı, Sarısu, Çakırlar, Meltem, Göbi mahallelerine eve servis var mı?', acceptedAnswer: { '@type': 'Answer', text: `Evet! TERZİ Tailor Atelie olarak Konyaaltı'nın tüm mahallelerine — Hurma, Liman, Uncalı, Sarısu, Gürsu, Çakırlar, Meltem, Göbi, Öğretmenevleri dahil — kapıdan alım ve teslimat yapıyoruz. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Adrese gelen terzi servisi nasıl çalışır?', acceptedAnswer: { '@type': 'Answer', text: `Randevu alın, terzimiz adresinize gelir, ölçü alır veya kıyafetlerinizi teslim alır. En geç 24 saat içinde işlem tamamlanır ve adresinize teslim edilir. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Antalya paça kısaltma fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Paça kısaltma ₺150'den başlar. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Antalya fermuar değişimi fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Fermuar değişimi ₺200'den başlar. Aynı gün teslim. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Tailor in Antalya Konyaalti — English service?', acceptedAnswer: { '@type': 'Answer', text: `Yes! We offer English-speaking tailoring, alterations, dry cleaning and hotel pickup in Konyaalti, Lara, and Belek. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Портной в Анталье Коньяалты — есть ли услуга по-русски?', acceptedAnswer: { '@type': 'Answer', text: `Да! Говорим по-русски. Подгонка, пошив, химчистка, доставка в отель. WhatsApp: ${PHONE}` } },
      ],
    },
  ],
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(HOME),
  title: 'Konyaaltı Terzi · Elbise dikimi, tadilatı, Tamiri, Ütü yapımı, Hurma, Liman, Uncalı, Sarısu, Çakırlar, Meltem, Özel Terzi Servisi 2026',
  description: "Antalya Konyaaltı'nda profesyonel terzi. Hurma, Liman, Uncalı, Gürsu, Sarısu, Çakırlar, Meltem, Ozel Terzi, adrese gelen terzi servisi. Paça, fermuar, dikim, elbise tadilatı, ütü, kuru temizleme. Terziniz kapınıza gelsin! ☎ " + PHONE,
  keywords: [
    'Konyaaltı terzi', 'Hurma mahallesi terzi', 'Liman mahallesi terzi', 'Uncalı terzi',
    'Gürsu terzi', 'Sarısu terzi', 'Çakırlar terzi', 'Meltem mahallesi terzi', 'Özel terzi',
    'Öğretmenevleri terzi', 'Arapsuyu terzi', 'Konyaaltı kuru temizleme',
    'adrese gelen terzi Konyaaltı', 'eve gelen terzi Antalya', 'terzi çağır terzi gelsin',
    'paça kısaltma Antalya', 'fermuar değişimi Antalya', 'bel daraltma Antalya',
    'elbise dikimi Antalya', 'tailor Konyaalti', 'портной Коньяалты', 'Schneider Antalya'
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { 'x-default': SITE_URL },
  },
  openGraph: {
    title: 'Konyaaltı Terzi · Adrese Gelen Terzi Servisi · Hurma, Liman, Uncalı, Gürsu, Sarısu, Çakırlar',
    description: "Terziniz kapınıza gelsin! Konyaaltı'nın tüm mahallelerine adrese gelen terzi ve kuru temizleme hizmeti. ☎ " + PHONE,
    url: SITE_URL,
    type: 'website',
    locale: 'tr_TR',
    images: [{ url: '/og/terzi-can.jpg', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056',
    ICBM: '36.8841, 30.7056',
  },
}

// ─── Fiyat Listesi (gerçek fermuar değişimi fiyatı doğrulandı: 200 TL) ───────
const FIYAT_LISTESI = [
  { hizmet: 'Paça Kısaltma',            fiyat: '₺150',  sure: 'Aynı gün' },
  { hizmet: 'Pantolon Paçası',           fiyat: '₺150',  sure: 'Aynı gün' },
  { hizmet: 'Bel Daraltma',              fiyat: '₺150',  sure: '24 saat'  },
  { hizmet: 'Etek Kısaltma',             fiyat: '₺150',  sure: 'Aynı gün' },
  { hizmet: 'Elbise Boyunu Kısaltma',    fiyat: '₺150',  sure: 'Aynı gün' },
  { hizmet: 'Elbise Tamiri',             fiyat: '₺150',  sure: 'Aynı gün' },
  { hizmet: 'Gömlek Tamiri',             fiyat: '₺150',  sure: 'Aynı gün' },
  { hizmet: 'T-Shirt Tamiri',            fiyat: '₺100',  sure: 'Aynı gün' },
  { hizmet: 'Fermuar Değişimi',          fiyat: '₺200',  sure: 'Aynı gün' },
  { hizmet: 'Fermuar Tamiri',            fiyat: '₺200',  sure: 'Aynı gün' },
  { hizmet: 'Ceket Tamiri',              fiyat: '₺200',  sure: '24 saat'  },
  { hizmet: 'Mont Tamiri',               fiyat: '₺200',  sure: '24 saat'  },
  { hizmet: 'Abiye Tamiri',              fiyat: '₺400',  sure: '24–48 sa' },
  { hizmet: 'Elbise Dikimi',             fiyat: '₺800+', sure: '3–5 gün'  },
]

const DIKIMLER = [
  { hizmet: 'Erkek Takım Elbise',     fiyat: '₺2.500+', sure: '5–7 gün'   },
  { hizmet: 'Kadın Elbise / Tunik',   fiyat: '₺800+',   sure: '3–5 gün'   },
  { hizmet: 'Abiye / Gece Elbisesi',  fiyat: '₺1.200+', sure: '5–7 gün'   },
  { hizmet: 'Gelinlik Dikimi',        fiyat: '₺5.000+', sure: '14–21 gün' },
  { hizmet: 'Gömlek / Bluz',          fiyat: '₺400+',   sure: '3–5 gün'   },
  { hizmet: 'Pantolon / Etek',        fiyat: '₺350+',   sure: '3–5 gün'   },
  { hizmet: 'Üniforma (adet başına)', fiyat: 'Teklif',  sure: '7–14 gün'  },
]

const UTU_TEMIZLEME = [
  { hizmet: 'Gömlek Ütü',                      fiyat: '₺80',    sure: '2–6 saat'  },
  { hizmet: 'Takım Elbise Buharlı Pres',       fiyat: '₺150',   sure: '2–6 saat'  },
  { hizmet: 'Abiye Buharlama',                 fiyat: '₺120',   sure: '2–6 saat'  },
  { hizmet: 'Çamaşır Yıkama + Kurutma',        fiyat: '₺80/kg', sure: '24 saat'   },
  { hizmet: 'Elbise Kuru Temizleme',           fiyat: '₺300',   sure: '24–48 saat'},
  { hizmet: 'Takım Elbise Kuru Temizleme',     fiyat: '₺450',   sure: '48 saat'   },
  { hizmet: 'Mont Kuru Temizleme',             fiyat: '₺500',   sure: '48 saat'   },
  { hizmet: 'Abiye / Gelinlik Kuru Temizleme', fiyat: '₺600+',  sure: '48–72 sa'  },
  { hizmet: 'Konyaaltı Otel/Ev Alım Teslim',  fiyat: 'ÜCRETSİZ', sure: '—'       },
]

// ─── Stil sabitleri ──────────────────────────────────────────────────────────
const ALTIN   = '#B8975A'
const ALTIN2  = '#D4B07A'
const KOYU    = '#1C1814'
const KOYU2   = '#2E2820'
const BG      = '#FAF7F2'
const BG2     = '#F2EDE4'
const METIN   = '#3A3028'
const GRI     = '#7A6E62'
const SERIF   = 'Georgia,serif'
const SANS    = 'system-ui,sans-serif'

const SERVIS_ADIMLARI = [
  { numara: '01', baslik: 'Arayın veya Yazın', aciklama: 'Telefon veya WhatsApp ile randevu alın. Konyaaltı içi tüm mahalleler için ücretsiz servis.' },
  { numara: '02', baslik: 'Terzi Kapınıza Gelir', aciklama: 'Profesyonel terzimiz adresinize gelir, ölçünüzü alır veya tadilat için kıyafetlerinizi teslim alır.' },
  { numara: '03', baslik: 'En Geç 24 Saatte Hazır', aciklama: 'Tadilat ve onarım işlemleri en geç 24 saat içinde tamamlanır. Dikim işleri için süre hizmet türüne göre değişir.' },
  { numara: '04', baslik: 'Adresinize Teslim', aciklama: 'Hazır olan kıyafetleriniz tekrar adresinize getirilir.' },
]

export default function AntalyaTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: SANS, background: BG, color: METIN, minHeight: '100vh' }}>

        <nav style={{ padding: '.8rem 1.5rem', fontSize: '.72rem', color: GRI, background: BG2, borderBottom: `1px solid rgba(184,151,90,.12)` }}>
          <Link href="/" style={{ color: ALTIN, textDecoration: 'none' }}>SwapHubs</Link>
          {' › '}
          <Link href="/terzi" style={{ color: ALTIN, textDecoration: 'none' }}>TERZİ Tailor Atelie</Link>
          {' › '}
          <span>Konyaaltı Terzi · Tadilat · Ütü · Kuru Temizleme</span>
        </nav>

        <section style={{
          background: `linear-gradient(135deg, ${KOYU} 0%, ${KOYU2} 60%, #3A2E20 100%)`,
          padding: '5rem 1.5rem 4.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${ALTIN}, transparent)` }} />

          <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.65rem', letterSpacing: '.35em', textTransform: 'uppercase', color: ALTIN2, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '.8rem' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: ALTIN }} />
              Konyaaltı · Antalya · Terzi & Tekstil Atölyesi
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: ALTIN }} />
            </div>

            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5.5vw,3.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.08, marginBottom: '1.4rem', letterSpacing: '-.01em' }}>
              Konyaaltı Terzi
              <br />
              <span style={{ color: ALTIN2, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)' }}>
                Hurma · Liman · Uncalı · Sarısu · Çakırlar · Meltem · Göbi
              </span>
            </h1>

            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.78)', lineHeight: 1.9, maxWidth: '650px', marginBottom: '2rem' }}>
              <strong style={{ color: '#fff' }}>TERZİ Tailor Atelie</strong> — Konyaaltı merkezli profesyonel dikiş atölyesi.
              Paça kısaltma, fermuar değişimi, bel daraltma, elbise dikimi, kuru temizleme için
              <strong style={{ color: ALTIN2 }}> Hurma, Liman, Sarısu, Uncalı, Gürsu, Çakırlar, Meltem, Göbi ve Öğretmenevleri </strong>
              mahallelerine <strong style={{ color: ALTIN2 }}>ücretsiz kapıdan alım ve teslimat</strong> yapıyoruz.
            </p>

            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[['🇹🇷','Türkçe'],['🇬🇧','English'],['🇷🇺','Русский'],['🇩🇪','Deutsch']].map(([f,l]) => (
                <span key={l} style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.55)', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', padding: '.28rem .8rem', borderRadius: '2px' }}>
                  {f} {l}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={WA('Merhaba, Konyaaltı içi adrese gelen terzi servisi için bilgi almak istiyorum.')}
                target="_blank" rel="noopener noreferrer"
                style={{ background: ALTIN, color: '#fff', padding: '1rem 2.2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.1em', textTransform: 'uppercase', border: `1px solid ${ALTIN}` }}>
                💬 Terzi Çağır — WhatsApp
              </a>
              <a href={`tel:${PHONE_E}`}
                style={{ border: '1px solid rgba(255,255,255,.25)', color: '#fff', padding: '1rem 1.8rem', textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.05em' }}>
                📞 {PHONE}
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: '1px', background: 'rgba(255,255,255,.06)', marginTop: '3rem', maxWidth: '700px' }}>
              {[['⭐ 5.0','4 Google Yorum'],['Kuryeli','Adrese Servis'],['Max 24 Sa','Aynı Gün Teslim'],['Tüm Konyaaltı','Adrese Servis']].map(([t,d]) => (
                <div key={t} style={{ background: 'rgba(255,255,255,.03)', padding: '1.2rem 1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontSize: '1.05rem', color: ALTIN2, marginBottom: '.3rem', fontWeight: 700 }}>{t}</div>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{
          background: `linear-gradient(135deg, #1a3a2a 0%, #0f2018 100%)`,
          padding: '5rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${ALTIN}, transparent)` }} />
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(184,151,90,.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(184,151,90,.05) 0%, transparent 50%)`,
          }} />

          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ fontSize: '.65rem', letterSpacing: '.4em', textTransform: 'uppercase', color: ALTIN, marginBottom: '1rem' }}>
                — Özel Hizmet —
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem,4.5vw,3rem)', color: '#fff', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
                Terzi Çağır,{' '}
                <span style={{ color: ALTIN2, fontStyle: 'italic' }}>Terzi Gelsin</span>
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,.7)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.8 }}>
                Siz yorulmayın — terzimiz adresinize gelsin. Konyaaltı'nın tüm mahallelerinde
                profesyonel, tecrübeli ve hızlı terzi hizmeti kapınızda.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: 'rgba(184,151,90,.15)', marginBottom: '3rem' }}>
              {SERVIS_ADIMLARI.map(({ numara, baslik, aciklama }) => (
                <div key={numara} style={{ background: 'rgba(255,255,255,.04)', padding: '2rem 1.5rem', position: 'relative' }}>
                  <div style={{
                    fontFamily: SERIF, fontSize: '2.5rem', fontWeight: 700,
                    color: 'rgba(184,151,90,.25)', lineHeight: 1, marginBottom: '.8rem',
                    letterSpacing: '-.02em'
                  }}>{numara}</div>
                  <div style={{ fontSize: '.92rem', color: '#fff', fontWeight: 600, marginBottom: '.5rem' }}>{baslik}</div>
                  <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.7 }}>{aciklama}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(184,151,90,.1)',
              border: `1px solid rgba(184,151,90,.3)`,
              padding: '2rem 2.5rem',
              display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem'
            }}>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: '1.3rem', color: '#fff', marginBottom: '.4rem', fontWeight: 600 }}>
                  Adresinizde Ölçü Alım + En Geç 24 Saatte Teslim
                </div>
                <div style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.6 }}>
                  Hurma · Liman · Uncalı · Sarısu · Gürsu · Çakırlar · Meltem · Göbi · Öğretmenevleri · Konyaaltı Merkez
                </div>
              </div>
              <a href={WA('Merhaba, adresime terzi servisi istiyorum. Bilgi alabilir miyim?')}
                target="_blank" rel="noopener noreferrer"
                style={{
                  background: ALTIN, color: '#fff', padding: '.9rem 2rem',
                  fontWeight: 700, textDecoration: 'none', fontSize: '.82rem',
                  letterSpacing: '.1em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                  display: 'inline-block'
                }}>
                📍 Terzi Çağır
              </a>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '3rem 1.5rem', borderBottom: `1px solid ${BG2}` }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.4rem', color: KOYU, marginBottom: '1rem' }}>
              📍 Konyaaltı İçi Ücretsiz Moto Kurye Servis Bölgelerimiz
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.6rem' }}>
              {KONYAALTI_MAHALLELERI.map(mahalle => (
                <span key={mahalle} style={{ background: BG2, color: GRI, padding: '.4rem .8rem', borderRadius: '20px', fontSize: '.8rem', fontWeight: 500, border: `1px solid rgba(184,151,90,.2)` }}>
                  {mahalle} Terzi
                </span>
              ))}
            </div>
            <p style={{ fontSize: '.8rem', color: GRI, marginTop: '1rem', fontStyle: 'italic' }}>
              * Belirtilen mahallelerden vereceğiniz tadilat ve kuru temizleme siparişleri kapınızdan teslim alınır, adresinize teslim edilir.
            </p>
          </div>
        </section>

        <section id="fiyatlar" style={{ background: BG, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.5rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: ALTIN }}>Terzi Fiyat Listesi · 2026</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.9rem', color: KOYU, marginBottom: '.4rem' }}>
              Tadilat, Tamir & Onarım Fiyatları
            </h2>
            <p style={{ color: GRI, fontSize: '.88rem', marginBottom: '2rem' }}>
              Paça kısaltma, fermuar değişimi, bel daraltma, elbise tamiri ve diğer terzilik işleri. Tüm fiyatlara adrese servis dahildir.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 20px rgba(28,24,20,.06)' }}>
              <thead>
                <tr style={{ background: KOYU, borderBottom: `2px solid ${ALTIN}` }}>
                  {['Hizmet', 'Fiyat', 'Süre'].map((h, i) => (
                    <th key={h} style={{ padding: '.85rem 1.1rem', textAlign: i === 0 ? 'left' : 'right', fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN2, fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIYAT_LISTESI.map(({ hizmet, fiyat, sure }, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid rgba(60,40,20,.06)`, background: i % 2 ? `rgba(184,151,90,.025)` : '#fff' }}>
                    <td style={{ padding: '.88rem 1.1rem', fontSize: '.88rem', fontWeight: 500, color: METIN }}>{hizmet}</td>
                    <td style={{ padding: '.88rem 1.1rem', textAlign: 'right', fontSize: '1rem', color: ALTIN, fontWeight: 700 }}>{fiyat}</td>
                    <td style={{ padding: '.88rem 1.1rem', textAlign: 'right', fontSize: '.75rem', color: sure === 'Aynı gün' ? '#22c55e' : GRI, fontWeight: sure === 'Aynı gün' ? 600 : 400 }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '1.2rem', padding: '1rem 1.2rem', background: 'rgba(184,151,90,.07)', border: `1px solid rgba(184,151,90,.2)`, display: 'flex', alignItems: 'center', gap: '.8rem' }}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <p style={{ fontSize: '.78rem', color: GRI, margin: 0, lineHeight: 1.6 }}>
                Fiyatlar başlangıç fiyatı olup işin kapsamına göre değişebilir.
                Kesin fiyat için <a href={WA('Merhaba, fiyat bilgisi almak istiyorum.')} target="_blank" rel="noopener noreferrer" style={{ color: ALTIN, textDecoration: 'none', fontWeight: 600 }}>WhatsApp'tan</a> ulaşabilirsiniz. Adrese servis ücretsizdir.
              </p>
            </div>
          </div>
        </section>

        <section id="dikimler" style={{ background: BG2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.5rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: ALTIN }}>Özel Dikim · 2026</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.9rem', color: KOYU, marginBottom: '.4rem' }}>
              Kıyafet Dikimi Fiyatları
            </h2>
            <p style={{ color: GRI, fontSize: '.88rem', marginBottom: '2rem' }}>
              Takım elbise, elbise, abiye, gelinlik, gömlek, pantolon — ölçüye özel dikim. Konyaaltı ve Antalya geneli adrese servis.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1px', background: 'rgba(184,151,90,.1)' }}>
              {DIKIMLER.map(({ hizmet, fiyat, sure }) => (
                <div key={hizmet} style={{ background: '#fff', padding: '1.6rem 1.4rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${ALTIN}, transparent)` }} />
                  <div style={{ fontFamily: SERIF, fontSize: '1.05rem', color: KOYU, fontWeight: 600, marginBottom: '.5rem' }}>{hizmet}</div>
                  <div style={{ fontSize: '1.3rem', color: ALTIN, fontWeight: 700, fontFamily: SERIF, marginBottom: '.3rem' }}>{fiyat}</div>
                  <div style={{ fontSize: '.72rem', color: GRI, letterSpacing: '.08em' }}>⏱ {sure}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kuru-temizleme" style={{ background: '#fff', padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.5rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: ALTIN }}>Ütü & Temizleme · 2026</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.9rem', color: KOYU, marginBottom: '.4rem' }}>
              Ütü & Kuru Temizleme Fiyatları
            </h2>
            <p style={{ color: GRI, fontSize: '.88rem', marginBottom: '2rem' }}>
              Hurma, Liman, Uncalı, Sarısu, Çakırlar, Meltem, Göbi dahil tüm Konyaaltı mahallelerine alım + teslimat. 24 saat ekspres.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 20px rgba(28,24,20,.06)' }}>
              <thead>
                <tr style={{ background: KOYU, borderBottom: `2px solid ${ALTIN}` }}>
                  {['Hizmet', 'Fiyat', 'Süre'].map((h, i) => (
                    <th key={h} style={{ padding: '.85rem 1.1rem', textAlign: i === 0 ? 'left' : 'right', fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN2, fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {UTU_TEMIZLEME.map(({ hizmet, fiyat, sure }, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid rgba(60,40,20,.06)`, background: i % 2 ? `rgba(184,151,90,.025)` : '#fff' }}>
                    <td style={{ padding: '.88rem 1.1rem', fontSize: '.88rem', fontWeight: 500 }}>{hizmet}</td>
                    <td style={{ padding: '.88rem 1.1rem', textAlign: 'right', color: fiyat === 'ÜCRETSİZ' ? '#22c55e' : ALTIN, fontWeight: 700 }}>{fiyat}</td>
                    <td style={{ padding: '.88rem 1.1rem', textAlign: 'right', fontSize: '.75rem', color: GRI }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ background: BG2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.5rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: ALTIN }}>Tüm Hizmetler</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.9rem', color: KOYU, marginBottom: '2rem' }}>
              TERZİ Tailor Atelie Hizmet Alanları
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '1px', background: 'rgba(184,151,90,.1)' }}>
              {[
                { ic:'✂️', baslik:'Tadilat & Onarım', text:'Paça kısaltma, fermuar değişimi, bel daraltma, kol kısaltma, yırtık onarımı, astar değişimi. Aynı gün teslim.', href:'/terzi/paca-kisaltma-antalya', fiyat:'₺100\'den' },
                { ic:'🧵', baslik:'Kıyafet Dikimi', text:'Erkek takım elbise, kadın elbise, abiye, gelinlik, gömlek, pantolon, üniforma — ölçüye özel dikim.', href:'/terzi/bayan-terzi-antalya', fiyat:'₺350\'den' },
                { ic:'💨', baslik:'Ütü & Buharlı Pres', text:'Endüstriyel buharlı pres ile gömlek, takım elbise, abiye ütüleme. Evden alım + teslimat.', href:'/terzi/kuru-temizleme-antalya', fiyat:'₺80\'den' },
                { ic:'🧺', baslik:'Kuru Temizleme', text:'Hassas kumaşlar için kuru temizleme. Elbise, abiye, gelinlik, mont. 24–48 saat ekspres. Servis imkanı.', href:'/terzi/kuru-temizleme-antalya', fiyat:'₺300\'den' },
                { ic:'🏭', baslik:'Üniforma & Seri İmalat', text:'Otel, restoran, okul, sağlık sektörü üniforması. Kalıp + nakış + seri üretim. Min 10 adet.', href:'/terzi/uniforma-uretimi-antalya', fiyat:'Teklif' },
                { ic:'🚗', baslik:'Adrese Terzi Servisi', text:'Terziniz kapınıza gelir! Hurma, Liman, Uncalı, Sarısu, Çakırlar, Meltem, Göbi, Gürsu dahil tüm Konyaaltı. Ücretsiz alım + teslimat.', href:'/terzi/eve-gelen-terzi-antalya', fiyat:'Ücretsiz' },
              ].map(({ ic, baslik, text, href, fiyat }) => (
                <div key={baslik} style={{ background: '#fff', padding: '2rem 1.6rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: ALTIN }} />
                  <div style={{ fontSize: '1.8rem', marginBottom: '.8rem' }}>{ic}</div>
                  <h3 style={{ fontFamily: SERIF, fontSize: '1.1rem', color: KOYU, marginBottom: '.5rem', fontWeight: 600 }}>{baslik}</h3>
                  <p style={{ fontSize: '.8rem', color: GRI, lineHeight: 1.75, marginBottom: '1rem' }}>{text}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '.78rem', color: ALTIN, fontWeight: 700 }}>{fiyat} başlar</span>
                    <Link href={href} style={{ fontSize: '.72rem', color: ALTIN, textDecoration: 'none', borderBottom: `1px solid ${ALTIN}`, paddingBottom: '1px' }}>Detay →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: KOYU, padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.8rem', color: '#fff', marginBottom: '.5rem' }}>
              Tüm Antalya'nın Her İlçesine <span style={{ color: ALTIN2, fontStyle: 'italic' }}>Adrese Servis</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.85rem', marginBottom: '2rem' }}>
              Konyaaltı'ndaki mahalle servislerimize ek olarak, diğer Antalya ilçelerine de servisimiz vardır.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: '1px', background: 'rgba(255,255,255,.05)' }}>
              {['Muratpaşa','Kepez','Lara','Belek','Kemer','Alanya','Manavgat','Side','Serik','Aksu','Döşemealtı'].map(b => (
                <div key={b} style={{ background: 'rgba(255,255,255,.03)', padding: '.8rem 1rem', fontSize: '.8rem', color: 'rgba(255,255,255,.6)', textAlign: 'center' }}>
                  📍 {b}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: BG2, padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.8rem', color: KOYU, marginBottom: '1.5rem' }}>
              Tailor in Antalya <span style={{ color: ALTIN, fontStyle: 'italic' }}>· English · Русский · Deutsch</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1rem' }}>
              <div style={{ background: '#fff', padding: '1.6rem', borderLeft: `3px solid ${ALTIN}` }}>
                <div style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN, marginBottom: '.6rem' }}>🇬🇧 English</div>
                <p style={{ fontSize: '.85rem', color: GRI, lineHeight: 1.8 }}>
                  <strong style={{ color: METIN }}>TERZİ Tailor Atelie</strong> is a professional tailor in Konyaalti offering
                  alterations, dress making, dry cleaning and hotel pickup. English-speaking service. WhatsApp: <strong>{PHONE}</strong>
                </p>
              </div>
              <div style={{ background: '#fff', padding: '1.6rem', borderLeft: `3px solid ${ALTIN}` }}>
                <div style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN, marginBottom: '.6rem' }}>🇷🇺 Русский</div>
                <p style={{ fontSize: '.85rem', color: GRI, lineHeight: 1.8 }}>
                  Профессиональный портной в районе Коньяалты.
                  Подгонка одежды, пошив, химчистка. WhatsApp: <strong>{PHONE}</strong>
                </p>
              </div>
              <div style={{ background: '#fff', padding: '1.6rem', borderLeft: `3px solid ${ALTIN}` }}>
                <div style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: ALTIN, marginBottom: '.6rem' }}>🇩🇪 Deutsch</div>
                <p style={{ fontSize: '.85rem', color: GRI, lineHeight: 1.8 }}>
                  In Konyaalti bietet Änderungsschneiderei,
                  Maßschneiderei, Textilreinigung und Abholservice. WhatsApp: <strong>{PHONE}</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="konum" style={{ background: BG, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.5rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: ALTIN }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: ALTIN }}>Google Harita · Konum</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: '1.9rem', color: KOYU, marginBottom: '.4rem' }}>
              TERZİ Tailor Atelie — Konyaaltı Konumu
            </h2>
            <p style={{ color: GRI, fontSize: '.88rem', marginBottom: '2rem' }}>
              Konyaaltı Sarısu / Hurma / Liman bölgesinde. Google Maps'te <strong style={{ color: METIN }}>"TERZİ Tailor Atelie"</strong> aratarak bize ulaşabilirsiniz.
            </p>

            <div style={{ position: 'relative', width: '100%', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 4px 30px rgba(28,24,20,.1)', border: `1px solid rgba(184,151,90,.2)` }}>
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="380"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TERZİ Tailor Atelie — Google Harita"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <a
                href={MAPS_CID_URL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                  background: '#4285F4', color: '#fff',
                  padding: '.85rem 1.6rem', fontWeight: 600,
                  textDecoration: 'none', fontSize: '.82rem',
                  letterSpacing: '.06em',
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Google Maps'te Gör
              </a>
              <a
                href={MAPS_CID_URL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                  background: '#34A853', color: '#fff',
                  padding: '.85rem 1.6rem', fontWeight: 600,
                  textDecoration: 'none', fontSize: '.82rem',
                  letterSpacing: '.06em',
                }}>
                🗺️ Yol Tarifi Al
              </a>
              {/*
                TODO: Aşağıdaki "Yorum Yaz" linkindeki placeid, doğrulanmamış eski
                CID'e ait olabilir. Google Business Profile uygulamasından
                "Daha fazla yorum alın" bölümünde size özel doğru linki kopyalayıp
                buraya yapıştırın — yanlış placeid, yorumları başka bir işletmeye
                gönderebilir.
              */}
              <a
                href={MAPS_CID_URL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                  border: `1px solid ${ALTIN}`, color: ALTIN,
                  padding: '.85rem 1.6rem', fontWeight: 600,
                  textDecoration: 'none', fontSize: '.82rem',
                  letterSpacing: '.06em', background: 'transparent',
                }}>
                ⭐ Yorum Yaz
              </a>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: 'rgba(184,151,90,.1)' }}>
              {[
                { icon: '📍', label: 'Adres', value: 'Sarısu, Hurma, Liman, Konyaaltı / Antalya' },
                { icon: '🕐', label: 'Çalışma Saatleri', value: 'Her gün 09:00 – 23:30' },
                { icon: '⭐', label: 'Google Puanı', value: '5.0 / 5 · 4 Yorum' },
                { icon: '📞', label: 'Telefon', value: PHONE },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ background: '#fff', padding: '1.1rem 1.2rem' }}>
                  <div style={{ fontSize: '.65rem', color: GRI, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '.3rem' }}>{icon} {label}</div>
                  <div style={{ fontSize: '.85rem', color: METIN, fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: ALTIN, padding: '3rem 1.5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.4rem,3.5vw,2rem)', color: '#fff', marginBottom: '.6rem', fontWeight: 700 }}>
              Terziniz Kapınıza Gelsin!
            </h2>
            <p style={{ color: 'rgba(255,255,255,.85)', fontSize: '.9rem', marginBottom: '1.8rem', lineHeight: 1.7 }}>
              Hurma, Liman, Uncalı, Sarısu, Çakırlar, Meltem, Göbi, Gürsu, Öğretmenevleri ve tüm Konyaaltı mahallelerine
              <strong> ücretsiz adrese gelen terzi servisi</strong>. Hemen arayın veya WhatsApp'tan yazın.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href={WA('Merhaba, adresime terzi servisi istiyorum.')}
                target="_blank" rel="noopener noreferrer"
                style={{ background: '#fff', color: ALTIN, padding: '.9rem 2rem', fontWeight: 700, textDecoration: 'none', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                💬 WhatsApp ile Yaz
              </a>
              <a href={`tel:${PHONE_E}`}
                style={{ border: '2px solid #fff', color: '#fff', padding: '.9rem 1.8rem', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600 }}>
                📞 Hemen Ara
              </a>
            </div>
          </div>
        </section>

        <footer style={{ textAlign: 'center', padding: '3rem 1.5rem', background: KOYU2, color: 'rgba(255,255,255,.5)', fontSize: '.75rem', borderTop: `1px solid rgba(255,255,255,.05)` }}>
          <p style={{ marginBottom: '.5rem' }}>© {new Date().getFullYear()} TERZİ Tailor Atelie · Konyaaltı. Tüm hakları saklıdır.</p>
          <p style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.3)', marginBottom: '.5rem' }}>
            Hurma Terzi · Liman Terzi · Uncalı Terzi · Sarısu Terzi · Çakırlar Terzi · Meltem Terzi · Göbi Terzi · Gürsu Kuru Temizleme · Öğretmenevleri Terzi · Konyaaltı Terzi Atölyesi
          </p>
          <p style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.2)' }}>
            <a href={MAPS_CID_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,.25)', textDecoration: 'none' }}>
              Google Business · TERZİ Tailor Atelie — Terzi Dikim Tamir Tadilat
            </a>
          </p>
        </footer>

      </main>
    </>
  )
}
