// app/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat/page.tsx
import type { Metadata } from 'next'
import ReviewsBlock from '@/components/ReviewsBlock';
import { reviewSchema } from '@/lib/reviews';
import SpeakableSchema from '@/components/SpeakableSchema';
import QuickActionBanner from '@/components/QuickActionBanner';
import Link from 'next/link'
import { jsonLdString } from '@/lib/json-ld';

// ─── Sabitler ────────────────────────────────────────────────────────────────
const SITE_URL  = 'https://swaphubs.com/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat'
const HOME      = 'https://swaphubs.com'
const TERZI_URL = 'https://swaphubs.com/terzi'
const PHONE     = '+90 531 898 64 18'
const PHONE_E   = '+905318986418'
const WA = (t: string) => `https://wa.me/${PHONE_E}?text=${encodeURIComponent(t)}`
const TODAY = new Date().toISOString().split('T')[0]

// ── DÜZELTME: Doğrulanmış tek GBP kaydı (cid=6436895271281342624) ──
// Önceki sürümde farklı bir CID (1496201377277644027) kullanılıyordu.
// GBP ekran görüntüsünde bu kaydın "kopya profil" olarak işaretlendiği görüldü —
// aynı işletme için iki farklı CID kullanmak Google'ın güven skorunu düşürür.
const MAPS_CID_URL = 'https://www.google.com/maps?cid=6436895271281342624'
// Embed, MAPS_CID_URL ile aynı işletmeye (swaphubs profili) ait ftid kullanır.
const MAPS_EMBED = 'https://www.google.com/maps?q=TERZ%C4%B0+Can+Antalya+Tailor+Service%2C+Hurma%2C+07130+Konyaalt%C4%B1%2FAntalya&ftid=0x14c39311e6924c67:0x59547225251db8a0&z=17&output=embed'

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
      ...reviewSchema(),
      '@id': `${TERZI_URL}#business`,
      // DÜZELTME: sitedeki ana sayfayla (antalyada-terzi-dikim-tamirat-utu-hizmetleri)
      // aynı resmi ad + alternateName kullanılıyor — NAP tutarlılığı için kritik
      name: 'TERZİ Tailor Atelie',
      alternateName: ['Terzi Can Konyaaltı', 'Tailor Can Antalya', 'Портной Кан Анталья', 'Schneider Can Antalya', 'Konyaaltı Terzi'],
      description: "Antalya Konyaaltı'nda profesyonel terzi, dikiş atölyesi ve kuru temizleme. Hurma, Liman, Uncalı, Gürsu, Sarısu, Çakırlar, Meltem, Göbi, Öğretmenevleri başta olmak üzere Konyaaltı ve çevresi'ya adrese servis. Kıyafet dikimi, paça kısaltma, fermuar değişimi.",
      url: TERZI_URL,
      telephone: PHONE_E,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: [`${HOME}/og/terzi-can.jpg`],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hurma Mahallesi',
        addressLocality: 'Konyaaltı',
        addressRegion: 'Antalya',
        postalCode: '07130',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.857466, longitude: 30.596987 },
      hasMap: MAPS_CID_URL,
      sameAs: [MAPS_CID_URL],
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '08:00',
        closes: '23:00',
      }],
      contactPoint: [{
        '@type': 'ContactPoint',
        telephone: PHONE_E,
        contactType: 'customer service',
        availableLanguage: ['Turkish','English','Russian','German','Polish','Ukrainian','Dutch','French','Spanish','Arabic'],
      }],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Konyaaltı' },
        // DÜZELTME: mahalleler şema.org'da "City" değil "Place" olmalı —
        // bir mahalle bağımsız bir şehir değildir, bu ayrım Google'ın
        // coğrafi hiyerarşiyi doğru yorumlaması için önemlidir
        ...KONYAALTI_MAHALLELERI.map(name => ({ '@type': 'Place', name: `${name} Mahallesi, Konyaaltı` })),
        { '@type': 'AdministrativeArea', name: 'Antalya' },
      ],
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
        { '@type': 'Question', name: 'Adrese gelen terzi servisi nasıl çalışır?', acceptedAnswer: { '@type': 'Answer', text: `Randevu alın, terzimiz adresinize gelir, ölçü alır veya kıyafetlerinizi teslim alır. Tadilat ertesi gün, acil işler 1–2 saatte tamamlanıp adresinize teslim edilir. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Antalya paça kısaltma fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Paça kısaltma ₺200'den başlar. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Antalya fermuar değişimi fiyatı 2026?', acceptedAnswer: { '@type': 'Answer', text: `Fermuar değişimi ₺300'den başlar. Ertesi gün teslim; acilse 1–2 saat. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Tailor in Antalya Konyaalti — English service?', acceptedAnswer: { '@type': 'Answer', text: `Yes! We offer English-speaking tailoring, alterations, dry cleaning and hotel pickup in Konyaalti, Lara, and Belek. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Портной в Анталье Коньяалты — есть ли услуга по-русски?', acceptedAnswer: { '@type': 'Answer', text: `Да! Говорим по-русски. Подгонка, пошив, химчистка, доставка в отель. WhatsApp: ${PHONE}` } },
      ],
    },
  ],
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(HOME),
  title: { absolute: 'Konyaaltı Terzi · Tamir, Dikim, Ütü, Servis | Terzi Can' },
  description: "Konyaaltı terzi: Hurma, Liman, Uncalı, Sarısu, Gürsu. Paça, fermuar, dikim, tadilat, ütü; adrese gelen terzi. Her gün 08:00–23:00. ☎ " + PHONE,
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
    'geo.position': '36.857466;30.596987',
    ICBM: '36.857466, 30.596987',
  },
}

// ─── Fiyat Listesi (gerçek fermuar değişimi fiyatı doğrulandı: 300 TL) ───────
const FIYAT_LISTESI = [
  { hizmet: 'Paça Kısaltma',            fiyat: '₺200',  sure: 'Ertesi gün' },
  { hizmet: 'Pantolon Paçası',           fiyat: '₺200',  sure: 'Ertesi gün' },
  { hizmet: 'Bel Daraltma',              fiyat: '₺200',  sure: 'Ertesi gün'  },
  { hizmet: 'Etek Kısaltma',             fiyat: '₺200',  sure: 'Ertesi gün' },
  { hizmet: 'Elbise Boyunu Kısaltma',    fiyat: '₺200',  sure: 'Ertesi gün' },
  { hizmet: 'T-Shirt Tamiri',            fiyat: 'Fotoğrafa göre',  sure: 'Ertesi gün' },
  { hizmet: 'Fermuar Değişimi',          fiyat: '₺300',  sure: 'Ertesi gün' },
  { hizmet: 'Fermuar Tamiri',            fiyat: '₺300',  sure: 'Ertesi gün' },
  { hizmet: 'Ceket Tamiri',              fiyat: '₺200',  sure: 'Ertesi gün'  },
  { hizmet: 'Mont Tamiri',               fiyat: '₺200',  sure: 'Ertesi gün'  },
  { hizmet: 'Abiye Tamiri',              fiyat: '₺800',  sure: 'Ertesi gün' },
  { hizmet: 'Elbise Dikimi',             fiyat: '₺800+', sure: 'Modele göre'  },
]

const DIKIMLER = [
  { hizmet: 'Kadın Elbise / Tunik',   fiyat: '₺800+',   sure: 'Modele göre'   },
  { hizmet: 'Abiye / Gece Elbisesi',  fiyat: 'Fotoğrafa göre', sure: 'Modele ve adede göre'   },
  { hizmet: 'Pantolon / Etek',        fiyat: 'Fotoğrafa göre',   sure: 'Modele göre'   },
  { hizmet: 'Üniforma (adet başına)', fiyat: 'Teklif',  sure: '7–14 gün'  },
]

const UTU_TEMIZLEME = [
  { hizmet: 'Gömlek Ütü',                      fiyat: 'Fotoğrafa göre',    sure: '2–6 saat'  },
  { hizmet: 'Abiye Buharlama',                 fiyat: 'Fotoğrafa göre',   sure: '2–6 saat'  },
  { hizmet: 'Çamaşır Yıkama + Kurutma',        fiyat: 'Fotoğrafa göre', sure: '1–2 gün'   },
  { hizmet: 'Elbise Kuru Temizleme',           fiyat: 'Fotoğrafa göre',   sure: '24–48 saat'},
  { hizmet: 'Takım Elbise Kuru Temizleme',     fiyat: 'Fotoğrafa göre',   sure: '48 saat'   },
  { hizmet: 'Mont Kuru Temizleme',             fiyat: 'Fotoğrafa göre',   sure: '48 saat'   },
  { hizmet: 'Abiye / Gelinlik Kuru Temizleme', fiyat: 'Fotoğrafa göre',  sure: '48–72 sa'  },
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
  { numara: '03', baslik: 'Genellikle Ertesi Gün Hazır', aciklama: 'Tadilat ve onarım ertesi gün teslim edilir, acil işler 1–2 saatte hazırlanır. Özel dikimde süre modele ve adede göre belirlenir.' },
  { numara: '04', baslik: 'Adresinize Teslim', aciklama: 'Hazır olan kıyafetleriniz tekrar adresinize getirilir.' },
]

export default function AntalyaTerziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <main style={{ fontFamily: SANS, background: BG, color: METIN, minHeight: '100vh' }}>

        <SpeakableSchema path="/antalya-terzi-dikim-utu-kuru-temizleme-tekstil-imalat" />
        <QuickActionBanner lang="tr" />
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
              {[['Google Haritalar','İşletme Profili'],['Kuryeli','Adrese Servis'],['1–2 Saat','Acil Tadilat'],['Tüm Konyaaltı','Adrese Servis']].map(([t,d]) => (
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
                  Adresinizde Ölçü Alım + Genellikle Ertesi Gün Teslim
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
                    <td style={{ padding: '.88rem 1.1rem', textAlign: 'right', fontSize: '.75rem', color: sure === 'Ertesi gün' ? '#22c55e' : GRI, fontWeight: sure === 'Ertesi gün' ? 600 : 400 }}>{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '1.2rem', padding: '1rem 1.2rem', background: 'rgba(184,151,90,.07)', border: `1px solid rgba(184,151,90,.2)`, display: 'flex', alignItems: 'center', gap: '.8rem' }}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <p style={{ fontSize: '.78rem', color: GRI, margin: 0, lineHeight: 1.6 }}>
                Fiyatlar başlangıç fiyatı olup işin kapsamına göre değişebilir.
                Kesin fiyat için <a href={WA('Merhaba, fiyat bilgisi almak istiyorum.')} target="_blank" rel="noopener noreferrer" style={{ color: ALTIN, textDecoration: 'none', fontWeight: 600 }}>WhatsApp'tan</a> ulaşabilirsiniz. Adrese servis Eve ve otele servis ücretsiz.
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
              Takım elbise, elbise, abiye, gelinlik, gömlek, pantolon — ölçüye özel dikim. Konyaaltı ve yakın bölgeler adrese servis.
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
              Hurma, Liman, Uncalı, Sarısu ve Çakırlar dahil Konyaaltı mahallelerine alım + teslimat; Meltem ve Muratpaşa'ya da hizmet verilir.
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
                { ic:'✂️', baslik:'Tadilat & Onarım', text:'Paça kısaltma, fermuar değişimi, bel daraltma, kol kısaltma, yırtık onarımı, astar değişimi. Ertesi gün teslim; acilse 1–2 saat.', href:'/terzi/paca-kisaltma-antalya', fiyat:'₺200\'den' },
                { ic:'🧵', baslik:'Kıyafet Dikimi', text:'Erkek takım elbise, kadın elbise, abiye, gelinlik, gömlek, pantolon, üniforma — ölçüye özel dikim.', href:'/terzi/bayan-terzi-antalya', fiyat:'₺350\'den' },
                { ic:'💨', baslik:'Ütü & Buharlı Pres', text:'Endüstriyel buharlı pres ile gömlek, takım elbise, abiye ütüleme. Evden alım + teslimat.', href:'/terzi/kuru-temizleme-antalya', fiyat:'₺80\'den' },
                { ic:'🧺', baslik:'Kuru Temizleme', text:'Hassas kumaşlar için kuru temizleme. Elbise, abiye, gelinlik, mont. 24–48 saat ekspres. Servis imkanı.', href:'/terzi/kuru-temizleme-antalya', fiyat:'₺300\'den' },
                { ic:'🏭', baslik:'Üniforma & Seri İmalat', text:'Otel, restoran, okul, sağlık sektörü üniforması. Kalıp + nakış + seri üretim.', href:'/terzi/uniforma-uretimi-antalya', fiyat:'Teklif' },
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
              Konyaaltı ve Yakın Bölgelere <span style={{ color: ALTIN2, fontStyle: 'italic' }}>Adrese Servis</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.85rem', marginBottom: '2rem' }}>
              Konyaaltı'ndaki mahalle servislerimize ek olarak, diğer Antalya ilçelerine de servisimiz vardır.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: '1px', background: 'rgba(255,255,255,.05)' }}>
              {['Muratpaşa','Kepez','Lara','Belek','Kemer','Side','Serik','Aksu','Döşemealtı'].map(b => (
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
                { icon: '📍', label: 'Adres', value: 'Hurma Mahallesi, Konyaaltı / Antalya' },
                { icon: '🕐', label: 'Çalışma Saatleri', value: 'Her gün 08:00–23:00' },
                { icon: '🗺️', label: 'Google Profili', value: 'Google Haritalar\'da görüntüleyin' },
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
              <strong> ücretsiz adrese gelen terzi servisi</strong> (otellere servis her bölgede ücretsiz). Hemen arayın veya WhatsApp'tan yazın.
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

      <ReviewsBlock lang="tr" />
    </main>
    </>
  )
}
