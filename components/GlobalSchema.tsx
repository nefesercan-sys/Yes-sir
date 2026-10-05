'use client';

import { usePathname } from 'next/navigation';

export default function GlobalSchema() {
  const pathname = usePathname();

  // Terzi sayfalarında SwapHubs genel şemasını devre dışı bırakır
  if (pathname && (pathname.includes('terzi') || pathname.includes('antalya-konyaalti-terzi'))) {
    return null;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://swaphubs.com/#website',
        url: 'https://swaphubs.com',
        name: 'SwapHubs',
        description: "Türkiye'nin küresel B2B ve bireysel hizmet & ürün platformu",
        inLanguage: ['tr', 'en', 'ru', 'de'],
        publisher: { '@id': 'https://swaphubs.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://swaphubs.com/ilanlar?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://swaphubs.com/#organization',
        name: 'SwapHubs',
        url: 'https://swaphubs.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://swaphubs.com/og/logo.png',
          width: '512',
          height: '512',
        },
        image: {
          '@type': 'ImageObject',
          url: 'https://swaphubs.com/og/swaphubs-og.jpg',
        },
        description:
          'Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturan B2B platformu.',
        areaServed: ['TR', 'DE', 'AE', 'SA', 'US', 'GB', 'RU'],
        subOrganization: { '@id': 'https://swaphubs.com/terzi#business' },
        sameAs: [
          'https://twitter.com/swaphubs',
          'https://www.linkedin.com/company/swaphubs',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
