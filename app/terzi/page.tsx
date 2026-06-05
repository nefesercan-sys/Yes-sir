import type { Metadata } from 'next';
import TerziClient from './TerziClient';

const SITE_URL = 'https://www.swaphubs.com/terzi';
const PHONE = '+90 531 898 64 18';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': `${SITE_URL}#business`,
      name: 'Terzi Can',
      alternateName: [
        'Tailor Can', 'Портной Кан', 'Schneider Can',
        'Antalya Terzisi', 'Antalya Erkek Terzi', 'Antalya Bayan Terzi',
        'Antalya Üniforma Üretimi',
      ],
      description:
        "Antalya'nın en deneyimli terzisi. Paça kısaltma, fermuar değişimi, tadilat, tamir, daraltma, özel dikim, üniforma, nakış, fason imalat, kuru temizleme. Araçlı terzi servisi — adrese teslim.",
      url: SITE_URL,
      telephone: '+905318986418',
      priceRange: '₺₺',
      image: 'https://www.swaphubs.com/og/terzi-can.jpg',
      logo: 'https://www.swaphubs.com/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Konyaaltı',
        addressLocality: 'Antalya',
        addressRegion: 'Antalya',
        postalCode: '07070',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 36.8841,
        longitude: 30.7056,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '94',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Murat B.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody: 'Otelimiz için 45 kişilik personel üniforması diktirdik. Tasarım, kalıp ve seri üretim mükemmeldi. Zamanında teslim, nakış kalitesi harika!',
          datePublished: '2025-01-15',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Sarah M.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody: 'Amazing tailor in Antalya! Dress altered in 24 hours before my gala dinner. Perfect fit, very professional.',
          datePublished: '2025-05-10',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Наталья К.' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody: 'Отличный портной! Пошил свадебное платье за 5 дней. Говорят по-русски, доставили прямо в отель в Белеке!',
          datePublished: '2025-06-20',
        },
      ],
      areaServed: [
        'Antalya','Konyaaltı','Lara','Muratpaşa','Kepez','Döşemealtı',
        'Aksu','Serik','Belek','Kemer','Alanya','Manavgat','Side',
        'Kaş','Finike','Kumluca','Elmalı','Korkuteli',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Terzi Can Hizmetleri',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paça Kısaltma', description: 'Pantolon, kot, kumaş — tüm kıyafetlerde paça kısaltma. ₺150\'den başlar.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fermuar Değişimi', description: 'Pantolon, ceket, mont, elbise, sweatshirt fermuarı. ₺120\'den başlar.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elbise Daraltma & Tadilat', description: 'Her tür kıyafette beden küçültme ve tadilat. ₺200\'den başlar.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Özel Dikim', description: 'Ölçüye göre erkek, bayan, çocuk kıyafeti dikimi. ₺600\'den başlar.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Üniforma Üretimi', description: 'Otel, restoran, sağlık, okul ve spor üniforması üretimi.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kuru Temizleme', description: 'Otel alım-teslimat dahil kuru temizleme ve çamaşır yıkama. ₺300\'den başlar.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Nakış & Logo Baskı', description: 'Üniforma ve kıyafete logo nakışı, dijital baskı. ₺100\'den başlar.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Araçlı Terzi Servisi', description: 'Adrese alım ve teslimat dahil mobil terzi servisi — tüm Antalya.' } },
        ],
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}#webpage`,
      name: 'Terzi Can Antalya | Konyaaltı Terzi | Ütü · Dikim · Tamir · Tadilat',
      url: SITE_URL,
      isPartOf: { '@id': 'https://www.swaphubs.com#website' },
      about: { '@id': `${SITE_URL}#business` },
      description: "Antalya Konyaaltı'nda profesyonel terzi Can. Paça kısaltma, elbise tadilat, özel dikim, kuru temizleme, üniforma üretimi. 24–48 saat ekspres teslimat.",
      inLanguage: ['tr', 'en', 'de', 'ru'],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SwapHubs', item: 'https://www.swaphubs.com' },
        { '@type': 'ListItem', position: 2, name: 'Terzi Antalya', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: "Antalya'da paça kısaltma fiyatı ne kadar? 2025–2026",
          acceptedAnswer: { '@type': 'Answer', text: "Antalya'da paça kısaltma fiyatımız ₺150'den başlar. Kot paça ₺150, kumaş pantolon ₺175 civarı. Kesin fiyat için WhatsApp +90 531 898 64 18." },
        },
        {
          '@type': 'Question',
          name: 'Fermuar değişimi kaç lira? Mont, kot, pantolon fermuarı fiyatı?',
          acceptedAnswer: { '@type': 'Answer', text: "Pantolon ve kot fermuarı değişimi ₺120'den, mont fermuarı ₺300'den başlar. Aynı gün servis mümkündür. WhatsApp +90 531 898 64 18." },
        },
        {
          '@type': 'Question',
          name: 'Eve veya otele gelen terzi Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: "Evet, Terzi Can araçlı terzi servisiyle Antalya'nın tüm ilçelerine geliyor. WhatsApp +90 531 898 64 18." },
        },
        {
          '@type': 'Question',
          name: 'Mezuniyet abiyesi tamiri ve kısaltması Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, mezuniyet sezonunda (Mayıs–Haziran) abiye tamiri, kısaltma ve tadilatı ekspres 24 saatte yapıyoruz.' },
        },
        {
          '@type': 'Question',
          name: 'Düğün sezonu gelinlik tadilatı Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, Nisan–Ekim düğün sezonunda gelinlik tadilatı, kısaltma ve damatlık tadilatı yapıyoruz.' },
        },
        {
          '@type': 'Question',
          name: "Antalya'da otel ve restoran üniforması üretimi yapılıyor mu?",
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, otel personel üniforma, resepsiyon, aşçı, garson, meydancı, spa üniforma üretiyoruz. Tasarım + kalıp + seri imalat + nakış hepsi tek elden.' },
        },
        {
          '@type': 'Question',
          name: "Antalya'da sweatshirt ve eşofman dikimi yapılıyor mu?",
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, sweatshirt ve eşofman takımı dikimi, tadilat ve seri üretim yapıyoruz. Nakış ve baskı ile kişiselleştirme de mümkündür.' },
        },
        {
          '@type': 'Question',
          name: 'Kuru temizleme hizmeti veriyor musunuz?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet, kuru temizleme, çamaşır yıkama ve ütü hizmetleri de sunmaktayız. Otel ve adreslerden kurye ile alım yapılmaktadır.' },
        },
        {
          '@type': 'Question',
          name: 'Where can I find a tailor or uniform producer in Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: 'Terzi Can offers professional tailoring and uniform production in Antalya. WhatsApp: +90 531 898 64 18.' },
        },
        {
          '@type': 'Question',
          name: 'Do you speak English? Tailor in Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes! Tailor Can provides services in Turkish, English, German and Russian. Express alterations, dry cleaning, hotel pickup & delivery.' },
        },
        {
          '@type': 'Question',
          name: 'Где найти портного и производителя формы в Анталье?',
          acceptedAnswer: { '@type': 'Answer', text: 'Портной Кан — пошив одежды, производство формы, вышивка в Анталье. WhatsApp: +90 531 898 64 18.' },
        },
        {
          '@type': 'Question',
          name: 'Gibt es einen Schneider in Antalya?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ja! Schneider Can bietet mobilen Schneiderdienst in ganz Antalya. WhatsApp: +90 531 898 64 18.' },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swaphubs.com'),
  title: {
    default: 'Terzi Can Antalya | Konyaaltı Terzi | Paça Kısaltma · Tadilat · Üniforma · Kuru Temizleme',
    template: '%s | Terzi Can Antalya',
  },
  description:
    `Konyaaltı ve tüm Antalya ilçelerinde Terzi Can. Paça kısaltma ₺150, fermuar değişimi ₺120'den. Özel dikim, üniforma üretimi, kuru temizleme, eve gelen terzi servisi. 24–48 saat ekspres. TR · EN · DE · RU ☎ ${PHONE}`,
  keywords: [
    'Antalya Terzi','Terzi Antalya','Konyaaltı Terzi','Terzi Can','Tailor Can',
    'Paça Kısaltma Antalya','Paça Kısaltma Kaç Lira','Paça Kısaltma Fiyatı 2026',
    'Fermuar Değişimi Antalya','Fermuar Değişimi Kaç Lira','Mont Fermuarı',
    'Elbise Tadilat Antalya','Kıyafet Tamiri','Elbise Daraltma','Bel Alma',
    'Gelinlik Tadilat Antalya','Abiye Dikimi Antalya','Üniforma Dikimi Antalya',
    'Kuru Temizleme Antalya','Nakış Antalya','Sweatshirt Dikimi',
    'Eve Gelen Terzi Antalya','Otele Gelen Terzi','Araçlı Terzi Servisi',
    'Terzi Fiyatları 2026','Yakınımda Terzi',
    'Lara Terzi','Belek Terzi','Kemer Terzi','Alanya Terzi','Manavgat Terzi',
    'Tailor Antalya','Clothing Alterations Antalya','Dry Cleaning Antalya',
    'Mobile Tailor Antalya','Uniform Production Antalya',
    'Schneider Antalya','Uniformproduktion Antalya','Chemische Reinigung Antalya',
    'Портной Анталья','Химчистка Анталья','Пошив на заказ Анталья',
  ].join(', '),
  authors: [{ name: 'SwapHubs', url: 'https://www.swaphubs.com' }],
  openGraph: {
    title: 'Terzi Can | Tailor Can | Портной Кан | Schneider Can — Antalya',
    description: `Konyaaltı ve tüm Antalya'da Terzi Can. Paça kısaltma, tadilat, kuru temizleme, üniforma. ☎ ${PHONE}`,
    url: SITE_URL,
    siteName: 'SwapHubs — Terzi Can',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'de_DE', 'ru_RU'],
    type: 'website',
    images: [{ url: '/og/terzi-can.jpg', width: 1200, height: 630, alt: 'Terzi Can Antalya' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terzi Can Antalya | Konyaaltı · Tüm İlçeler',
    description: `Konyaaltı ve tüm Antalya ilçelerinde Terzi Can. TR · EN · DE · RU ☎ ${PHONE}`,
    images: ['/og/terzi-can.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function TerziPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TerziClient />
    </>
  );
}
