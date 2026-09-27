import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/app/components/theme-provider";
import BottomNav from "@/components/BottomNav";
import LocaleHtmlLang from "@/app/components/LocaleHtmlLang";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jakarta",
});

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-unbounded",
});

const SITE_URL = "https://terzihizmeti.com.tr";

export const viewport: Viewport = {
  themeColor: "#B8975A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Terzi Can Antalya",
    default: "Konyaaltı Terzi Can | Express Paça, Fermuar & Ölçü Alımı",
  },
  description:
    "Antalya Konyaaltı, Hurma ve Liman bölgesinde profesyonel terzi hizmeti. Pantolon paçası, fermuar değişimi, özel dikim, gelinlik tadilatı ve otellere özel servis.",

  authors: [{ name: "Terzi Can", url: SITE_URL }],
  creator: "Terzi Can",
  publisher: "Terzi Can",
  category: "local business",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Konyaaltı Terzi Can | Express Paça, Fermuar & Ölçü Alımı",
    description:
      "Antalya Konyaaltı'nda profesyonel giyim tadilatı, paça kısaltma, fermuar değişimi, özel dikim ve otele/adrese teslimat hizmeti.",
    url: SITE_URL,
    siteName: "Terzi Can - Terzi Hizmeti Antalya",
    locale: "tr_TR",
    alternateLocale: ["en_US", "ru_RU", "de_DE"],
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og/terzican-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Terzi Can — Antalya Konyaaltı Terzi Hizmetleri",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Konyaaltı Terzi Can | Express Paça & Tadilat Hizmeti",
    description: "Antalya'da profesyonel terzi, özel dikim ve otel servisi.",
    images: [`${SITE_URL}/og/terzican-og.jpg`],
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

  alternates: {
    canonical: SITE_URL,
    languages: {
      tr: SITE_URL,
      "x-default": SITE_URL,
    },
  },

  verification: {
    yandex: "4c73ee1911a4b197",
    other: { "msvalidate.01": "EE22134B7D1B55A44BA700154371D5C3" },
  },
  manifest: "/manifest.json",
};

// ─── JSON-LD: WebSite + LocalBusiness (Terzi Can) ───────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Terzi Can - Terzi Hizmeti Antalya",
      description: "Antalya Konyaaltı terzi, elbise tadilatı, paça kısaltma ve özel dikim hizmeti",
      inLanguage: ["tr", "en", "ru", "de"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": ["LocalBusiness", "ClothingStore"],
      "@id": `${SITE_URL}/#business`,
      name: "Terzi Can - Terzi Hizmeti Antalya",
      url: SITE_URL,
      telephone: "+905318986418",
      image: `${SITE_URL}/og/terzican-og.jpg`,
      description:
        "Antalya Konyaaltı'nda giyim tadilatı, paça kısaltma, fermuar değişimi, abiye/gelinlik tadilatı, özel dikim ve otellere mobil terzi servisi.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Konyaaltı",
        addressRegion: "Antalya",
        addressCountry: "TR",
      },
      areaServed: ["Antalya", "Konyaaltı", "Hurma", "Liman", "Sarısu", "Lara", "Kemer", "Belek"],
      knowsAbout: [
        "Terzilik Hizmetleri",
        "Paça Kısaltma",
        "Fermuar Değişimi",
        "Gelinlik Tadilatı",
        "Abiye Tadilatı",
        "Özel Dikim",
        "Otele Gelen Terzi",
        "Üniforma İmalatı",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+905318986418",
        contactType: "customer service",
        areaServed: ["TR", "DE", "RU", "EN"],
        availableLanguage: ["Turkish", "English", "Russian", "German"],
      },
      sameAs: [
        SITE_URL,
        "https://wa.me/905318986418",
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
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <LocaleHtmlLang />
            <main>{children}</main>
            <BottomNav />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
