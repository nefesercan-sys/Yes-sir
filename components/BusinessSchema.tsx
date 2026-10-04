// ============================================================
// components/BusinessSchema.tsx — merkezi JSON-LD (server component)
// Kullanım:
//   <BusinessSchema path="/terzi/paca-kisaltma" name="Paça Kısaltma Antalya"
//     description="..." lang="tr" lastModified="2026-10-04"
//     breadcrumbs={[{name:'Terzi',path:'/terzi'},{name:'Paça Kısaltma',path:'/terzi/paca-kisaltma'}]}
//     faq={[{q:'...',a:'...'}]} service={{name:'Paça Kısaltma', price:'150'}} />
// Puan/yorum: varsayılan YOK. Sadece gerçek yorumlar `reviews` ile verilirse eklenir
// (en az 1 gerçek yorum; puan verilen yorumlardan hesaplanır, uydurma sayı yok).
// ============================================================
import { BUSINESS, SITE_URL } from '@/lib/business';

type Crumb = { name: string; path: string };
type Faq = { q: string; a: string };
type Review = { author: string; rating: number; text: string; date?: string };

type Props = {
  path: string;
  name: string;
  description: string;
  lang?: 'tr' | 'en' | 'ru' | 'de' | ('tr' | 'en' | 'ru' | 'de')[];
  lastModified?: string;
  breadcrumbs?: Crumb[];
  faq?: Faq[];
  service?: { name: string; price?: string; description?: string };
  extra?: Record<string, unknown>[];
  businessDescription?: string;
  alternateNames?: string[];
  areaServed?: string[];
  catalog?: { name: string; items: { name: string; price: string }[] };
  reviews?: Review[]; // SADECE gerçek, doğrulanabilir yorumlar
};

export default function BusinessSchema({
  path, name, description, lang = 'tr', lastModified, breadcrumbs, faq, service, extra = [], reviews,
  businessDescription, alternateNames = [], areaServed, catalog,
}: Props) {
  const url = `${SITE_URL}${path}`;
  const b = BUSINESS;

  const business: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'ClothingStore'],
    '@id': b.id,
    name: b.name,
    alternateName: [...b.alternateName, ...alternateNames],
    description: businessDescription ?? description,
    hasMap: b.sameAs[0],
    url: `${SITE_URL}/terzi`,
    telephone: b.phone,
    image: b.image,
    priceRange: b.priceRange,
    currenciesAccepted: b.currencies,
    paymentAccepted: b.payments,
    knowsLanguage: b.languages,
    address: { '@type': 'PostalAddress', ...b.address },
    geo: { '@type': 'GeoCoordinates', ...b.geo },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: b.hours.days, opens: b.hours.opens, closes: b.hours.closes,
    }],
    sameAs: b.sameAs,
  };

  if (areaServed?.length) business.areaServed = areaServed.map(n => ({ '@type': 'City', name: n }));
  if (catalog) {
    business.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: catalog.name,
      itemListElement: catalog.items.map(i => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: i.name },
        price: i.price,
        priceCurrency: 'TRY',
      })),
    };
  }

  const real = (reviews ?? []).filter(r => r.author && r.text && r.rating >= 1 && r.rating <= 5);
  if (real.length > 0) {
    const avg = real.reduce((s, r) => s + r.rating, 0) / real.length;
    business.review = real.map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
      reviewBody: r.text,
      ...(r.date ? { datePublished: r.date } : {}),
    }));
    business.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: String(real.length),
      bestRating: '5',
    };
  }

  const graph: Record<string, unknown>[] = [
    business,
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url, name, description, inLanguage: lang,
      ...(lastModified ? { dateModified: lastModified } : {}),
      about: { '@id': b.id },
      isPartOf: { '@type': 'WebSite', name: 'SwapHubs', url: SITE_URL },
    },
  ];

  if (breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((c, i) => ({
        '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE_URL}${c.path}`,
      })),
    });
  }
  if (service) {
    graph.push({
      '@type': 'Service',
      name: service.name,
      description: service.description ?? description,
      provider: { '@id': b.id },
      areaServed: { '@type': 'City', name: 'Antalya' },
      ...(service.price
        ? { offers: { '@type': 'Offer', price: service.price, priceCurrency: 'TRY' } }
        : {}),
    });
  }
  if (faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map(f => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  graph.push(...extra);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
