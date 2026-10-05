'use client';
// ============================================================
// components/GlobalSchema.tsx
// SwapHubs WebSite + Organization şeması YALNIZCA terzi / tekstil dışı sayfalarda basılır.
// Terzi sayfalarında Terzi Can kendi şemasını (LocalBusiness) taşır; SwapHubs arka planda kalır.
// usePathname sunucuda da çalışır, bu yüzden ham HTML'de doğru şema çıkar.
// ============================================================
import { usePathname } from 'next/navigation';

// Terzi / tekstil sayfa yolları (önek eşleşmesi). Yeni terzi sayfası eklerken buraya ekle.
const TERZI_PREFIXES = [
  '/terzi',                       // /terzi, /terzi/..., /terzi-cagir, /terzi-talep
  '/antalya-konyaalti-terzi',
  '/antalya-terzi',
  '/antalyada-terzi',
  '/tekstil-antalya',
  '/online-tailor-service',
  '/online-terzi-hizmeti',
  '/en/hotel-tailor-antalya',
  '/de/online-schneiderservice-antalya',
  '/de/schneider-service-hotel-antalya',
  '/ru/atelie-antalya',
  '/ru/vyezdnoy-portnoy-antalya',
];

function isTerziPath(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.toLowerCase();
  return TERZI_PREFIXES.some((x) => p === x || p.startsWith(x));
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
      image: { '@type': 'ImageObject', url: 'https://swaphubs.com/og/swaphubs-og.jpg' },
      description:
        'Ücretsiz ilan platformu; terzi, tekstil, üretici, tedarikçi ve hizmet sağlayıcıları alıcılarla buluşturur.',
      areaServed: ['TR', 'DE', 'AE', 'SA', 'US', 'GB', 'RU'],
      knowsAbout: [
        'Terzi ve Tadilat Hizmetleri',
        'Tekstil Tedarik',
        'Fason Üretim',
        'B2B Ticaret',
        'Hizmet ve Ürün Tedariği',
      ],
      subOrganization: { '@id': 'https://swaphubs.com/terzi#business' },
      sameAs: ['https://twitter.com/swaphubs', 'https://www.linkedin.com/company/swaphubs'],
    },
  ],
};

export default function GlobalSchema() {
  const pathname = usePathname();
  if (isTerziPath(pathname)) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
