'use client';
// ============================================================
// components/GlobalSchema.tsx
// SwapHubs WebSite + Organization şeması YALNIZCA terzi / tekstil dışı sayfalarda basılır.
// Terzi sayfalarında Terzi Can kendi şemasını (LocalBusiness) taşır; SwapHubs arka planda kalır.
// usePathname sunucuda da çalışır, bu yüzden ham HTML'de doğru şema çıkar.
// ============================================================
import { usePathname } from 'next/navigation';
import { jsonLdString } from '@/lib/json-ld';

// Terzi / tekstil sayfa yolları (önek eşleşmesi). Yeni terzi sayfası eklerken buraya ekle.
const TERZI_PREFIXES = [
  '/terzi',                       // /terzi, /terzi/..., /terzi-cagir, /terzi-talep
  '/antalya-konyaalti-terzi',
  '/antalya-terzi',
  '/antalyada-terzi',
  '/tekstil-antalya',
  '/dogal-keten-pamuk-giyim',
  '/en/linen-clothing-custom-made-antalya',
  '/ru/lnyanaya-odezhda-poshiv-antalya',
  '/de/leinenkleidung-massanfertigung-antalya',
  '/en/textile-manufacturer-antalya',
  '/ru/tekstilnoe-proizvodstvo-antalya',
  '/de/textilhersteller-antalya',
  '/promosyon-tekstil-bez-canta-antalya',
  '/en/promotional-textiles-tote-bags-antalya',
  '/ru/reklamnyy-tekstil-sumki-antalya',
  '/de/werbetextilien-stoffbeutel-antalya',
  '/online-tailor-service',
  '/online-terzi-hizmeti',
  '/en/hotel-tailor-antalya',
  '/de/online-schneiderservice-antalya',
  '/de/schneider-service-hotel-antalya',
  '/ru/atelie-antalya',
  '/ru/vyezdnoy-portnoy-antalya',
  '/en/tailor-antalya',
  '/en/tailor-services',
  '/de/schneider-antalya',
  '/de/schneider-leistungen',
  '/ru/portnoy-antalya',
  '/ru/uslugi-portnogo',
  '/tatilde-acil-kiyafet-tamiri-antalya',
  '/en/urgent-clothing-repair-antalya',
  '/ru/srochnyy-remont-odezhdy-antalya',
  '/de/dringende-kleiderreparatur-antalya',
  '/otele-gelen-terzi-nasil-calisir',
  '/en/how-hotel-tailor-works-antalya',
  '/ru/kak-rabotaet-vyezdnoy-portnoy-antalya',
  '/de/so-funktioniert-hotel-schneider-antalya',
  '/tatilde-abiye-takim-tadilati-antalya',
  '/en/event-outfit-alteration-antalya',
  '/ru/podgonka-naryada-dlya-sobytiya-antalya',
  '/de/festkleidung-aendern-antalya',
  '/en/contact-tailor-antalya',
  '/ru/kontakty-portnoy-antalya',
  '/de/kontakt-schneider-antalya',
];

// Ek turist dilleri (tek sayfa; tam eşleşme)
const INTL_PATHS = [
  '/es/arreglos-de-ropa-en-vacaciones-antalya', '/fr/retouches-vetements-vacances-antalya', '/pl/przerobki-ubran-na-wakacjach-antalya',
  '/uk/pidhonka-odyahu-u-vidpustci-antaliya', '/nl/kleding-laten-vermaken-op-vakantie-antalya', '/ar/tadil-malabis-fi-el-ijaza-antalya',
];

export function isTerziPath(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.toLowerCase();
  if (INTL_PATHS.includes(p.replace(/\/$/, ''))) return true;
  if (/^\/(es|fr|pl|uk|nl|ar)\/(guia-servicios-telas-sastreria-antalya|guide-services-tissus-couture-antalya|przewodnik-uslugi-tkaniny-krawiec-antalya|putivnyk-poslugy-tkanyny-kravets-antaliya|gids-diensten-stoffen-kleermaker-antalya|dalil-khadamat-aqmisha-khayyat-antalya)$/.test(p)) return true;
  if (/^\/(es|fr|pl|uk|nl|ar)\/(textil-promocional-bolsas-de-tela-antalya|textile-promotionnel-sacs-en-tissu-antalya|tekstylia-reklamowe-torby-materialowe-antalya|reklamnyi-tekstyl-tkanynovi-sumky-antaliya|promotiekleding-stoffen-tassen-antalya|mansujat-tarwijiya-haqaib-qumash-antalya)$/.test(p)) return true;
  if (/^\/(es|fr|pl|uk|nl|ar)\/(sastre-hoteles|couturier-hotels|krawiec-hotele|kravets-hoteli|kleermaker-hotels|khayyat-fanadiq)-[a-z]+$/.test(p)) return true;
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
      image: { '@type': 'ImageObject', url: 'https://swaphubs.com/swaphubs-og.jpg' },
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
      dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
    />
  );
}
