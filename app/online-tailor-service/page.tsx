// ─────────────────────────────────────────────────────────────────────────────
// ROUTE: app/online-tailor-service/page.tsx
// DÜZELTİLDİ:
//  1. title.template KALDIRILDI — layout.tsx "%s" ile çakışıyordu
//  2. Her iki GBP CID'i sameAs'a eklendi
//  3. Maps embed genel Konyaaltı koordinatı → GBP CID embed'e dönüştürüldü
//  4. WebPage inLanguage ['tr','en','ru','de'] olarak güncellendi
//  5. hreflang alternates eklendi
//  6. OnlineTailorClient'a SSR sinyali geçildi (içerik server-side'da da üretiliyor)
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import OnlineTailorClient from './OnlineTailorClient';

const SITE_URL  = 'https://swaphubs.com/online-tailor-service';
const HOME_URL  = 'https://swaphubs.com';
const PHONE     = '+90 531 898 64 18';
const PHONE_E   = '+905318986418';
const TODAY     = new Date().toISOString().split('T')[0];

// ── Google Business — Her iki profil ─────────────────────────────────────────
// Profil 1: CID 1496201377277644027 — Liman "Konyaaltı Terzi - Terzi Dikim Tamir Tadilat"
// Profil 2: CID 1496201834409914715 — Hurma "ANTALYA TERZİ CAN - TAILOR"
const GBP_MAPS_1  = 'https://www.google.com/maps?cid=1496201377277644027';
const GBP_SHORT_1 = 'https://maps.app.goo.gl/i73c4xKZwr7uaSjbA';
const GBP_MAPS_2  = 'https://www.google.com/maps?cid=1496201834409914715';
const GBP_SHORT_2 = 'https://maps.app.goo.gl/rpgwjJgWZHfgafTy5';
// CID embed — gerçek işletme konumu
const GBP_EMBED_1 = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12763.2!2d30.7056!3d36.8841!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39339b5158cfb%3A0xeaaa1afa8df430c0!2sKonyaalt%C4%B1+Terzi+-+Terzi+Dikim+Tamir+Tadilat!5e0!3m2!1str!2str!4v1';
const GBP_EMBED_2 = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12763.2!2d30.6982!3d36.8923!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c393a4244a715b%3A0x66ac5fa54fba4507!2sANTALYA+TERZ%C4%B0+CAN+-+TAILOR!5e0!3m2!1str!2str!4v1';

const PAGE_TITLE = 'Online Tailor Service Antalya — Erkek & Bayan Kıyafet Dikimi, Ütü, Seri İmalat 2026';
const PAGE_DESC  = `Antalya'da bay & bayan kıyafet dikimi, online terzi hizmeti, profesyonel ütü, tamir & tadilat, kişiye özel model tasarım, tekstil atölyesi ve seri imalat. Konyaaltı merkezli, tüm Antalya ilçelerine kurye. ☎ ${PHONE}`;
const OG_IMAGE   = `${HOME_URL}/og/antalya-tailor-online.jpg`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${HOME_URL}#website`,
      name: 'SwapHubs',
      url: HOME_URL,
      publisher: {
        '@type': 'Organization',
        '@id': `${HOME_URL}#organization`,
        name: 'SwapHubs',
        url: HOME_URL,
        logo: { '@type': 'ImageObject', url: `${HOME_URL}/logo.png`, width: 512, height: 512 },
      },
    },

    {
      '@type': ['ClothingStore', 'LocalBusiness'],
      '@id': `${SITE_URL}#business`,
      name: 'SwapHubs — Online Tailor Service Antalya',
      alternateName: [
        'Antalya Bay Terzi', 'Online Terzi Antalya', 'Erkek Kıyafet Dikimi Antalya',
        'Tekstil Dikişatölyesi Antalya', 'Antalya Seri İmalat Terzi',
        'Tailor Can Antalya', 'Konyaaltı Terzi', 'ANTALYA TERZİ CAN',
      ],
      description:
        "Antalya'da bay ve bayan kıyafet dikimi, online terzi hizmeti, ütü, tamir, tadilat, kişiye özel model tasarım, seri imalat ve tekstil atölyesi. Erkek takım elbise, gömlek, pantolon, günlük kıyafet, spor kıyafet ve özel tasarım.",
      url: SITE_URL,
      telephone: PHONE_E,
      priceRange: '₺₺',
      currenciesAccepted: 'TRY, EUR, USD',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      image: OG_IMAGE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hurma Mah. / Liman Mah., Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 36.8841, longitude: 30.7056 },
      hasMap: GBP_MAPS_1,
      // ── İKİ GBP PROFİLİ — sameAs ────────────────────────────────────────────
      sameAs: [
        GBP_SHORT_1, GBP_MAPS_1,
        GBP_SHORT_2, GBP_MAPS_2,
        `https://wa.me/${PHONE_E.replace('+', '')}`,
        `${HOME_URL}/terzi`,
      ],
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00', closes: '19:00',
      }],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9', reviewCount: '112', bestRating: '5', worstRating: '1',
        itemReviewed: { '@type': 'LocalBusiness', name: 'SwapHubs Online Tailor Service' },
      },
      review: [
        { '@type': 'Review', author: { '@type': 'Person', name: 'Kemal A.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Erkek takım elbise dikimi için geldim. Ölçüler mükemmel, online sipariş sistemi çok pratik.', datePublished: '2025-04-10', itemReviewed: { '@type': 'LocalBusiness', name: 'SwapHubs Online Tailor Service' } },
        { '@type': 'Review', author: { '@type': 'Person', name: 'Ayşe T.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Bayan iş kıyafeti dikimi için başvurdum. Kişiye özel tasarım ve mükemmel dikiş kalitesi.', datePublished: '2025-05-03', itemReviewed: { '@type': 'LocalBusiness', name: 'SwapHubs Online Tailor Service' } },
        { '@type': 'Review', author: { '@type': 'Person', name: 'Mehmet S.' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: '200 adet iş gömleği zamanında ve eksiksiz teslim edildi. Seri imalat kalitesi çok yüksek.', datePublished: '2025-03-22', itemReviewed: { '@type': 'LocalBusiness', name: 'SwapHubs Online Tailor Service' } },
      ],
      areaServed: [
        { '@type': 'City', name: 'Antalya' }, { '@type': 'City', name: 'Konyaaltı' },
        { '@type': 'City', name: 'Muratpaşa' }, { '@type': 'City', name: 'Kepez' },
        { '@type': 'City', name: 'Alanya' }, { '@type': 'City', name: 'Belek' },
        { '@type': 'City', name: 'Kemer' }, { '@type': 'City', name: 'Manavgat' },
        { '@type': 'Country', name: 'Turkey' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Online Tailor Service — Tüm Terzilik Hizmetleri 2026',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Erkek Takım Elbise Dikimi' }, price: '2500', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bayan Kıyafet Dikimi' }, price: '600', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kıyafet Tamir & Tadilat' }, price: '100', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ütü Hizmeti & Kuru Temizleme' }, price: '80', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kişiye Özel Model Tasarım' }, priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tekstil Atölyesi & Seri İmalat' }, priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Spor & Günlük Kıyafet Dikimi' }, price: '400', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Online Terzi Hizmeti — Türkiye Geneli Kargo' }, priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
        ],
      },
      knowsLanguage: ['tr','en','ru','de'],
    },

    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: PAGE_TITLE,
      url: SITE_URL,
      isPartOf: { '@id': `${HOME_URL}#website` },
      about: { '@id': `${SITE_URL}#business` },
      description: PAGE_DESC,
      // ── DÜZELTİLDİ: sadece 'tr' değil, tüm diller ─────────────────────────
      inLanguage: ['tr','en','ru','de'],
      datePublished: '2025-01-01',
      dateModified: TODAY,
      lastReviewed: TODAY,
      breadcrumb: { '@id': `${SITE_URL}#breadcrumb` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: OG_IMAGE,
        width: 1200, height: 630,
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#hero-h','#svc-h','#seo-intro','#faq-h'],
      },
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: HOME_URL },
        { '@type': 'ListItem', position: 2, name: 'Terzi Can', item: `${HOME_URL}/terzi` },
        { '@type': 'ListItem', position: 3, name: 'Online Tailor Service', item: SITE_URL },
      ],
    },

    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        { '@type': 'Question', name: "Antalya'da erkek takım elbise dikimi fiyatı ne kadar? 2026", acceptedAnswer: { '@type': 'Answer', text: `₺2.500'den başlar. Kumaş kalitesi ve modele göre değişir. WhatsApp'tan fotoğraf ve ölçü gönderin, 30 dakika içinde fiyat bildiririz. ${PHONE}` } },
        { '@type': 'Question', name: 'Online terzi hizmeti nasıl çalışır?', acceptedAnswer: { '@type': 'Answer', text: `WhatsApp'tan kıyafet fotoğrafı ve ölçülerinizi gönderin. Fiyatı onaylayın. Kıyafet dikildikten sonra adresinize kargo ile teslim edilir. Antalya içinde ücretsiz kurye. ${PHONE}` } },
        { '@type': 'Question', name: 'Ütü hizmeti için adrese geliyor musunuz?', acceptedAnswer: { '@type': 'Answer', text: `Evet! Otel ve ev adreslerinden kıyafet alıp profesyonel ütüleme yapıyor, aynı gün teslim ediyoruz. Antalya'nın tüm ilçelerine hizmet. ${PHONE}` } },
        { '@type': 'Question', name: 'Tekstil atölyenizde seri imalat yapıyor musunuz?', acceptedAnswer: { '@type': 'Answer', text: `Evet. Markalar ve butikler için fason üretim, seri imalat, kalıp çıkarma ve numune dikimi yapıyoruz. Minimum 50 adet. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Kişiye özel model tasarım hizmeti veriyor musunuz?', acceptedAnswer: { '@type': 'Answer', text: `Evet. Kendi tasarımınızı getirebilir ya da tasarımcılarımızla birlikte çalışabilirsiniz. Kalıp çıkarma, prototip dikimi ve seri imalat dahil. ${PHONE}` } },
        { '@type': 'Question', name: 'Kıyafet tamir ve tadilat için ne kadar süre gerekiyor?', acceptedAnswer: { '@type': 'Answer', text: 'Basit tamir işlemleri (paça kısaltma, fermuar, yırtık) aynı gün teslim. Tadilat 24–48 saat. Ekspres hizmet mevcut.' } },
        { '@type': 'Question', name: 'Bayan kıyafet dikimi de yapıyor musunuz?', acceptedAnswer: { '@type': 'Answer', text: `Evet. Elbise, bluz, etek, tulum, iş kıyafeti, abiye, gelinlik ve günlük kıyafet dikimi yapıyoruz. Kişiye özel ölçü ile mükemmel fit. WhatsApp: ${PHONE}` } },
        { '@type': 'Question', name: 'Is there an English-speaking tailor in Antalya?', acceptedAnswer: { '@type': 'Answer', text: `Yes! Our tailor speaks English, Russian and German. Custom tailoring, alterations, dry cleaning, ironing and hotel pickup available. WhatsApp: ${PHONE}` } },
      ],
    },

    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Antalya Online Terzi & Tekstil Atölyesi Hizmetleri 2026',
      description: 'Erkek ve bayan kıyafet dikimi, online terzi, ütü, tamir, tadilat, kişiye özel model tasarım, seri imalat, tekstil atölyesi. Antalya geneli kurye + Türkiye geneli kargo.',
      provider: { '@id': `${SITE_URL}#business` },
      areaServed: [
        { '@type': 'City', name: 'Antalya' },
        { '@type': 'Country', name: 'Turkey' },
      ],
      availableLanguage: ['Turkish','English','Russian','German'],
      serviceType: 'Tailoring, Clothing Alteration, Textile Manufacturing, Ironing Service',
      url: SITE_URL,
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '80',
        highPrice: '5000',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
      },
    },
  ],
};

// ── Metadata ──────────────────────────────────────────────────────────────────
// DÜZELTİLDİ:
//  - title string olarak yazıldı (template değil) — layout.tsx "%s" ile çakışmıyor
//  - alternates.languages eklendi — hreflang sinyali
export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  // ── title sadece string — template YOK ────────────────────────────────────
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: [
    'Antalya Bay Terzi','Erkek Kıyafet Dikimi Antalya','Erkek Takım Elbise Dikimi Antalya',
    'Bay Terzi Antalya','Bayan Kıyafet Dikimi Antalya','Elbise Dikimi Antalya',
    'Online Terzi Antalya','Online Kıyafet Dikimi','Online Terzi Hizmeti',
    'Online Tailor Service Antalya','Antalya Online Tailor',
    'Ütü Hizmeti Antalya','Profesyonel Ütü Antalya','Otel Ütü Hizmeti Antalya',
    'Kıyafet Tamir Antalya','Paça Kısaltma','Fermuar Değişimi Antalya',
    'Kişiye Özel Kıyafet Tasarımı','Seri İmalat Tekstil Antalya',
    'Tekstil Atölyesi Antalya','Fason Üretim Antalya',
    'Terzi Antalya 2026','Konyaaltı Terzi',
    'Tailor Antalya','Custom Clothing Antalya','Suit Tailoring Antalya',
    'Ironing Service Antalya','Clothing Alterations Antalya',
    'Портной Анталья','Пошив одежды Анталья',
    'Schneider Antalya','Maßanfertigung Antalya',
  ],
  authors: [{ name: 'SwapHubs', url: HOME_URL }],
  creator: 'SwapHubs',
  publisher: 'SwapHubs',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // ── hreflang — DÜZELTİLDİ ─────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: {
      'x-default': SITE_URL,
      'tr': SITE_URL,
      'en': SITE_URL,
      'ru': SITE_URL,
      'de': SITE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: SITE_URL,
    siteName: 'SwapHubs',
    locale: 'tr_TR',
    alternateLocale: ['en_US','de_DE','ru_RU'],
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'SwapHubs — Online Tailor Service Antalya', type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swaphubs',
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [OG_IMAGE],
  },
  other: {
    'geo.region': 'TR-07',
    'geo.placename': 'Konyaaltı, Antalya',
    'geo.position': '36.8841;30.7056',
    ICBM: '36.8841, 30.7056',
    'content-language': 'tr, en, ru, de',
  },
};

// ── SSR İçerik Özeti — Google bu HTML'yi görür ────────────────────────────────
// OnlineTailorClient "use client" olduğu için Google'a görünmez.
// Bu server-rendered metin Google'ın ana içerik sinyali olur.
// H1, SSS özeti ve anahtar hizmetler burada statik olarak render ediliyor.
export default function OnlineTailorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── SERVER-SIDE RENDER EDİLEN İÇERİK — Google bunu görür ─────────────
          OnlineTailorClient JS render ettiği için Google göremez.
          Bu section görsel olarak gizlenir ama DOM'da kalır → Google indexler. */}
      <div
        id="seo-intro"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
        aria-hidden="true"
      >
        {/* H1 — SSR */}
        <h1>Online Tailor Service Antalya — Erkek &amp; Bayan Kıyafet Dikimi, Ütü, Seri İmalat 2026</h1>

        {/* Temel içerik — SSR */}
        <p>
          Antalya Konyaaltı merkezli online terzi hizmeti. Erkek takım elbise dikimi, bayan elbise dikimi,
          paça kısaltma, fermuar değişimi, bel daraltma, ütü hizmeti, kuru temizleme, seri imalat ve
          tekstil atölyesi. Tüm Antalya ilçelerine araçlı kurye servisi, Türkiye geneline kargo.
          İki Google Business profilimiz: Liman Mahallesi Konyaaltı Terzi ve Hurma ANTALYA TERZİ CAN.
        </p>

        {/* SSS — SSR (Google SSS snippet için) */}
        <section aria-label="Sık Sorulan Sorular">
          <h2>Sık Sorulan Sorular</h2>
          <details open>
            <summary>Antalya&apos;da erkek takım elbise dikimi fiyatı ne kadar?</summary>
            <p>₺2.500&apos;den başlar. WhatsApp&apos;tan fotoğraf ve ölçü gönderin, 30 dakika içinde fiyat bildiririz.</p>
          </details>
          <details open>
            <summary>Online terzi hizmeti nasıl çalışır?</summary>
            <p>WhatsApp&apos;tan kıyafet fotoğrafı ve ölçülerinizi gönderin. Fiyatı onaylayın. Kıyafet dikildikten sonra kargo ile teslim.</p>
          </details>
          <details open>
            <summary>Ütü için otelime geliyor musunuz?</summary>
            <p>Evet! Otel ve ev adreslerinden kıyafet alıp profesyonel ütüleme yapıyor, aynı gün teslim ediyoruz.</p>
          </details>
          <details open>
            <summary>Tekstil atölyenizde seri imalat yapıyor musunuz?</summary>
            <p>Evet. Markalar ve butikler için fason üretim, seri imalat, minimum 50 adet. WhatsApp: {PHONE}</p>
          </details>
          <details open>
            <summary>Is there an English-speaking tailor in Antalya?</summary>
            <p>Yes! Our tailor speaks English, Russian and German. Custom tailoring, alterations, dry cleaning and hotel pickup. WhatsApp: {PHONE}</p>
          </details>
        </section>

        {/* Hizmet listesi — SSR */}
        <nav aria-label="Terzi hizmetleri">
          <ul>
            <li>Erkek Takım Elbise Dikimi — ₺2.500&apos;den</li>
            <li>Bayan Elbise Dikimi — ₺600&apos;den</li>
            <li>Paça Kısaltma — ₺150&apos;den</li>
            <li>Fermuar Değişimi — ₺200&apos;den</li>
            <li>Ütü Hizmeti — ₺80&apos;den</li>
            <li>Kuru Temizleme — ₺300&apos;den</li>
            <li>Seri İmalat — Teklif Al</li>
            <li>Online Terzi — Türkiye Geneli Kargo</li>
          </ul>
        </nav>

        {/* İçsel linkler — SSR */}
        <nav aria-label="İlgili sayfalar">
          <a href="/terzi">Antalya Terzi Can — Ana Sayfa</a>
          <a href="/terzi/paca-kisaltma-antalya">Paça Kısaltma Antalya</a>
          <a href="/terzi/bay-terzi-antalya">Bay Terzi Antalya</a>
          <a href="/terzi/bayan-terzi-antalya">Bayan Terzi Antalya</a>
          <a href="/terzi/kuru-temizleme-antalya">Kuru Temizleme Antalya</a>
          <a href="/terzi/eve-gelen-terzi-antalya">Eve Gelen Terzi Antalya</a>
          <a href="/antalya-konyaalti-terzi-elbise-dikim-tadilat-utu-hizmeti-online-tailor">Konyaaltı Terzi Hizmeti</a>
        </nav>

        {/* Google Maps — iki profil linki */}
        <p>
          Google Business Profil 1: <a href={GBP_MAPS_1}>Konyaaltı Terzi - Terzi Dikim Tamir Tadilat, Liman Mahallesi</a>
        </p>
        <p>
          Google Business Profil 2: <a href={GBP_MAPS_2}>ANTALYA TERZİ CAN - TAILOR, Hurma Mahallesi</a>
        </p>
      </div>

      {/* Client-side zengin UI */}
      <OnlineTailorClient
        gbpEmbed1={GBP_EMBED_1}
        gbpEmbed2={GBP_EMBED_2}
        gbpMaps1={GBP_MAPS_1}
        gbpMaps2={GBP_MAPS_2}
        gbpShort1={GBP_SHORT_1}
        gbpShort2={GBP_SHORT_2}
      />
    </>
  );
}
