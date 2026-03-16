import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import Analytics from "@/components/analytics/analytics";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://swaphubs.com"),
  title: {
    template: "%s | SwapHubs - Güvenli Takas Platformu",
    default: "SwapHubs | Türkiye'nin En Büyük Ürün & Hizmet Takas Platformu",
  },
  description:
    "Nakit harcamadan ticaret yapın. SwapHubs ile ürün ve hizmetlerinizi güvenle takas edebileceğiniz modern ticaret platformu.",
  keywords: ["takas", "swap", "takas sitesi", "hizmet takası", "güvenli ticaret"],
  authors: [{ name: "SwapHubs", url: "https://swaphubs.com" }],
  creator: "SwapHubs Team",
  publisher: "SwapHubs",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://swaphubs.com",
    title: "SwapHubs | Ürün ve Hizmet Takas Platformu",
    description:
      "Para yerine ürünlerinizi kullanarak ticaret yapabileceğiniz yeni nesil platform.",
    siteName: "SwapHubs",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "SwapHubs Takas Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SwapHubs | Takasın Yeni Adresi",
    description:
      "Ürün ve hizmetlerinizi kullanarak ticaret yapabileceğiniz modern platform.",
    images: ["/og-image.webp"],
    creator: "@swaphubs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SwapHubs",
    url: "https://swaphubs.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://swaphubs.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SwapHubs",
    url: "https://swaphubs.com",
    logo: "https://swaphubs.com/logo.webp",
    sameAs: [
      "https://twitter.com/swaphubs",
      "https://instagram.com/swaphubs",
      "https://linkedin.com/company/swaphubs",
    ],
  };

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>

        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

      </head>

      <body
        className={`${inter.variable} font-sans min-h-screen bg-background antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
