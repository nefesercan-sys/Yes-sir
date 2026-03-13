import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://swaphubs.com'),
  title: {
    default: "SwapHubs — Türkiye'nin Hizmet ve Ticaret İlan Merkezi",
    template: '%s | SwapHubs',
  },
  description:
    "SwapHubs — Türkiye'de bireysel hizmet ilanları ve endüstriyel ticaret platformu. " +
    'Tamir, temizlik, turizm, tekstil, mermer, metal, gıda ve daha fazlası. ' +
    'İlan ver, teklif al, dünyayla ticaret yap.',
  keywords: [
    'hizmet ilanları','ilan ver','teklif al','tamir ustası','temizlik hizmeti',
    'tekstil ihracat','mermer ihracat','türkiye üretim','toptan alım',
    'service listings turkey','wholesale turkey','export turkey',
    'turkish marble export','textile manufacturer turkey',
    'hizmet al','hizmet ver','türkiye ticaret','ihracat platformu',
    'SwapHubs','swaphubs.com',
  ],
  authors:   [{ name: 'SwapHubs', url: 'https://swaphubs.com' }],
  creator:   'SwapHubs',
  publisher: 'SwapHubs',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type:            'website',
    locale:          'tr_TR',
    alternateLocale: ['en_US'],
    url:             'https://swaphubs.com',
    siteName:        'SwapHubs',
    title:           'SwapHubs — Türkiye Hizmet & Ticaret Platformu',
    description:
      "Bireysel hizmetlerden endüstriyel üretime — Türkiye'nin en kapsamlı ilan ve ticaret merkezi.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SwapHubs' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'SwapHubs — Hizmet Al, Ver, Ticaret Yap',
    description: "Türkiye'den dünyaya hizmet ve ticaret platformu.",
    images:      ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://swaphubs.com',
    languages: { 'tr': 'https://swaphubs.com', 'en': 'https://swaphubs.com/en' },
  },
  verification: {
    google: 'GOOGLE_SEARCH_CONSOLE_TOKEN_BURAYA',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'Organization',
            name:        'SwapHubs',
            url:         'https://swaphubs.com',
            logo:        'https://swaphubs.com/logo.png',
            description: 'Türkiye hizmet ve endüstriyel ticaret platformu',
            contactPoint: {
              '@type':            'ContactPoint',
              contactType:        'customer service',
              availableLanguage:  ['Turkish', 'English'],
            },
            sameAs: [
              'https://www.instagram.com/swaphubs',
              'https://www.linkedin.com/company/swaphubs',
            ],
          })}}
        />
        {/* JSON-LD — WebSite / Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'WebSite',
            name:        'SwapHubs',
            url:         'https://swaphubs.com',
            potentialAction: {
              '@type':       'SearchAction',
              target:        'https://swaphubs.com/ilanlar?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          })}}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
