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
    alternateLocale: ["en_US", "ru_RU"],
    type: "website",
    images: [
      {
        url: "https://swaphubs.com/og/terzi-can.jpg",
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
    images: ["https://swaphubs.com/og/terzi-can.jpg"],
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

  // Alternates nesnesi otomatik olarak <link rel="alternate" ... /> etiketlerini oluşturur.
  alternates: {
    canonical: "https://swaphubs.com",
    languages: {
      "tr": "https://swaphubs.com",
      "en": "https://swaphubs.com/online-tailor-service",
      "ru": "https://swaphubs.com/ru/atelie-antalya-online",
      "x-default": "https://swaphubs.com",
    },
  },

  // Verification nesnesi meta etiketlerini otomatik oluşturur.
  verification: {
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
      inLanguage: ["tr", "en", "ru"],
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
        url: "https://swaphubs.com/og/logo.png",
        width: 512,
        height: 512,
      },
      image: "https://swaphubs.com/og/terzi-can.jpg",
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
        {/* Sadece Cloudinary ve Unsplash için dış ortam preconnect sinyalleri bırakıldı */}
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

        {/* Global JSON-LD: WebSite + Organization */}
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
