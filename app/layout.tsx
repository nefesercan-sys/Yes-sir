import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";
import BottomNav from "@/components/BottomNav";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-unbounded",
});

export const viewport: Viewport = {
  themeColor: "#B8975A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── SEO FIX LOG ──────────────────────────────────────────────────────────────
// FIX 1: title.template "%s | SwapHubs" → "%s" — her alt sayfa kendi tam title'ını tanımlıyor.
// FIX 2: og-image.svg → og-image.jpg — sosyal medya SVG önizleme göstermiyor.
// FIX 3: keywords dizisi layout'tan kaldırıldı — her sayfa kendi keywords'ünü tanımlıyor.
// FIX 4: Organization.logo → logo.png (512×512), og-image ayrı "image" alanında.
// FIX 5: google verification placeholder — gerçek kodu aşağıya yapıştırın.
// FIX 6 (YENİ): hreflang dil alternantları eklendi — tr/en/ru sayfaları birbirine
//         işaret ediyor artık. Daha önce sadece canonical vardı, hreflang yoktu.
//         Bu, Google'a "bu sayfaların aynı içeriğin farklı dil versiyonları olduğunu"
//         söyler ve doğru dildeki kullanıcıya doğru sayfayı gösterir.
// FIX 7 (YENİ): locale "tr_TR" idi, alternateLocale eklendi (en_US, ru_RU) — OG dil sinyali.
// FIX 8 (YENİ): areaServed/knowsAbout içine Rusça hizmet anahtar kelimeleri eklendi.
// ──────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://swaphubs.com"),
  title: {
    template: "%s",
    default: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
  },
  description:
    "Türkiye'nin üretici & tedarikçi platformu. 20+ sektörde ücretsiz ilan verin, teklif alın. Tekstil, gıda, lojistik, fason ve daha fazlası. Üretici, tedarikçi ve alıcıları buluşturuyoruz.",

  authors: [{ name: "SwapHubs", url: "https://swaphubs.com" }],
  creator: "SwapHubs",
  publisher: "SwapHubs",
  category: "business",

  openGraph: {
    title: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
    description:
      "20+ sektörde ücretsiz ilan verin. Tedarikçi, üretici ve alıcıları buluşturan Türkiye'nin B2B platformu.",
    url: "https://swaphubs.com",
    siteName: "SwapHubs",
    locale: "tr_TR",
    // FIX 7: alternateLocale eklendi — İngilizce ve Rusça sayfalar artık global OG sinyali veriyor
    alternateLocale: ["en_US", "ru_RU"],
    type: "website",
    images: [
      {
        url: "https://swaphubs.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SwapHubs — Küresel Hizmet & Ürün Platformu",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SwapHubs — Türkiye'den Dünyaya Hizmet & Ürün Platformu",
    description: "20+ sektörde ücretsiz ilan verin, teklif alın.",
    site: "@swaphubs",
    images: ["https://swaphubs.com/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // FIX 6: hreflang dil alternantları — ana site seviyesinde tr/en/ru sinyali
  alternates: {
    canonical: "https://swaphubs.com",
    languages: {
      "tr": "https://swaphubs.com",
      "en": "https://swaphubs.com/online-tailor-service",
      "ru": "https://swaphubs.com/ru/atelie-antalya-online",
      "x-default": "https://swaphubs.com",
    },
  },

  verification: {
    // ⚠️ BURAYA YAPIŞTIRINIZ:
    // Google Search Console → Mülk → HTML etiketi → content="..." değerini kopyalayın
    google: "BURAYA_GOOGLE_SEARCH_CONSOLE_KODUNU_YAZ",
    yandex: "4c73ee1911a4b197",
    other: { "msvalidate.01": "EE22134B7D1B55A44BA700154371D5C3" },
  },
  manifest: "/manifest.json",
};

// ─── JSON-LD: WebSite + Organization ─────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://swaphubs.com/#website",
      url: "https://swaphubs.com",
      name: "SwapHubs",
      description: "Türkiye'nin küresel B2B ve bireysel hizmet & ürün platformu",
      // FIX 6: tek dil yerine site genelinde desteklenen diller belirtildi
      inLanguage: ["tr-TR", "en-US", "ru-RU"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://swaphubs.com/ilanlar?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://swaphubs.com/#organization",
      name: "SwapHubs",
      url: "https://swaphubs.com",
      logo: {
        "@type": "ImageObject",
        url: "https://swaphubs.com/logo.png",
        width: 512,
        height: 512,
      },
      image: "https://swaphubs.com/og-image.jpg",
      description:
        "Üretici, tedarikçi, hizmet sağlayıcı ve alıcıları tek platformda buluşturan B2B platformu.",
      areaServed: ["TR", "DE", "AE", "SA", "US", "GB", "RU"],
      knowsAbout: [
        "B2B Ticaret",
        "Tekstil Tedarik",
        "Makine Ekipman",
        "Turizm",
        "İnşaat Malzemeleri",
        "Lojistik",
        "Temizlik",
        "Fason Üretim",
        "Terzilik ve Tadilat",
        // FIX 8: Rusça hizmet alanları eklendi
        "Ремонт и пошив одежды",
      ],
      sameAs: [
        "https://twitter.com/swaphubs",
        "https://www.linkedin.com/company/swaphubs",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${jakarta.variable} ${unbounded.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* Bing ve Yandex verification — Next.js verification API dışında kalıyor */}
        <meta name="msvalidate.01" content="EE22134B7D1B55A44BA700154371D5C3" />
        <meta name="yandex-verification" content="4c73ee1911a4b197" />

        {/* FIX 6: hreflang link tagleri — bazı tarayıcılar/crawler'lar
            alternates.languages metadata'sını değil, doğrudan <link> tagini okur.
            İkisi birlikte en sağlam sinyali verir. */}
        <link rel="alternate" hrefLang="tr" href="https://swaphubs.com" />
        <link rel="alternate" hrefLang="en" href="https://swaphubs.com/online-tailor-service" />
        <link rel="alternate" hrefLang="ru" href="https://swaphubs.com/ru/atelie-antalya-online" />
        <link rel="alternate" hrefLang="x-default" href="https://swaphubs.com" />

        {/* Global JSON-LD: WebSite + Organization — tüm sayfalarda geçerli */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={jakarta.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <main>{children}</main>
            <BottomNav />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
